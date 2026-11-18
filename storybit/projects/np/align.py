import numpy as np, scipy.io.wavfile as w, scipy.signal as sg, json, re
P=json.load(open("phr.json"))
R=[l.split() for l in open('runs.txt').read().strip().split('\n')]
R=[(float(a),float(b)) for a,b,_,_ in R]
assert len(P)==len(R),(len(P),len(R))
SYL={'42':3,'3':1,'11':3,'18':2,'6':1,'54':3,'79':3,'30':2,'12':1,'10':1,'8':1,'7':2,'80':2,'63':3,'everyone':3,'countdown':2,'eventually':5,'interfere':3,'electricity':5,'dangerous':3,'pavement':2,'goodbye':2,'construction':3,'scheduled':2,'inherits':3,'defeating':3,'birthday':2,'stranger':2,'seconds':2,'minutes':2,'someone':2,'terrified':3,'realize':3,'process':2,'whose':1,'chosen':2,'happen':2,'protect':2,'promise':2,'mirror':2,'answers':2,'60':2,'1945.':7,'august':2,'tsutomu':3,'yamaguchi':4,'engineer':3,'nagasaki':4,'hiroshima':4,'business':2,'shipyard':2,'parachute':3,'brighter':2,'kilometers':4,'eardrums':2,'blinded':2,'air-raid':2,'airraid':2,'shelter':2,'bandaged':2,'impossible':4,'believe':2,'exactly':3,'exact':2,'atomic':3,'survives':3,'sixty-four':3,'sixtyfour':3,'officially':4,'recognized':3,'surviving':3,'2010,':4,'ninety-three.':3,'ninetythree':3,'luckiest':3,'unluckiest':4,'history.':3,'history':3,'window':2,'second':2,'another':3}
def syl(wd):
  k=re.sub(r'[^a-z0-9]','',wd.lower())
  if k in SYL: return SYL[k]
  n=len(re.findall(r'[aeiouy]+',k))
  if k.endswith('e') and n>1 and not k.endswith('le'): n-=1
  return max(1,n)
sr,x=w.read('voice22.wav'); x=x.astype(float)/32768
hop=int(sr*0.005)
f,t,Z=sg.stft(x,sr,nperseg=512,noverlap=512-hop)
M=np.abs(Z)
band=M[(f>=150)&(f<=900)].sum(0); band=np.log(band+1e-6)
hf=M[f>=3500].sum(0); lf=M[(f>200)&(f<2000)].sum(0)+1e-6
hiss=np.log(hf+1e-6)
tt=t
def idx(s): return int(np.clip(round(s/(tt[1]-tt[0])),0,len(tt)-1))
out=[]
for line,(a,b) in zip(P,R):
  ws=line.split(); sy=np.array([syl(x) for x in ws],float)
  cum=np.concatenate([[0],np.cumsum(sy)])/sy.sum()
  starts=[a]
  # DP over candidate boundaries: choose times near expected minimizing band energy
  dur=b-a
  cand=[]
  for k in range(1,len(ws)):
    e=a+cum[k]*dur
    lo=max(a+0.1,e-0.22); hi=min(b-0.08,e+0.22)
    ts=np.arange(lo,hi,0.01) if hi>lo else np.array([e])
    cand.append((e,ts))
  # DP
  prev=[(0.0,a,[])]
  for e,ts in cand:
    nxt=[]
    for tcand in ts:
      best=None
      for c,pt,path in prev:
        if tcand-pt<0.12: continue
        cost=c+band[idx(tcand)]*1.0+((tcand-e)/0.12)**2*0.6
        if best is None or cost<best[0]: best=(cost,tcand,path+[tcand])
      if best: nxt.append(best)
    if not nxt: nxt=[(c,max(pt+0.12,e),path+[max(pt+0.12,e)]) for c,pt,path in prev][:1]
    nxt.sort(key=lambda z:z[0]); prev=nxt[:40]
  bnds=min(prev,key=lambda z:z[0])[2]
  starts+=bnds
  # hiss snap
  for k,wd in enumerate(ws):
    k2=re.sub(r'[^a-z]','',wd.lower())
    if k>0 and re.match(r'^(s|f|z|ch|sh|c[ei])',k2):
      s0=starts[k]; seg=np.arange(max(starts[k-1]+0.12,s0-0.12),min(s0+0.06,b),0.005)
      if len(seg):
        hv=np.array([hiss[idx(q)] for q in seg]); th=hv.min()+0.6*(hv.max()-hv.min())
        on=seg[np.argmax(hv>=th)]
        starts[k]=on
  ends=starts[1:]+[b]
  out.append({'line':line,'a':a,'b':b,'w':[{'t':round(s,3),'e':round(e,3),'x':wd} for s,e,wd in zip(starts,ends,ws)]})
json.dump(out,open('words.json','w'),indent=0)
for o in out[:3]: print(o['line'],[ (q['x'],q['t']) for q in o['w']])
