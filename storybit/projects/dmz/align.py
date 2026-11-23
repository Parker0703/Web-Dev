import numpy as np, scipy.io.wavfile as w, scipy.signal as sg, json, re
P=json.load(open("phr.json"))
R=[l.split() for l in open('runs.txt').read().strip().split('\n')]
R=[(float(a),float(b)) for a,b,_,_ in R]
assert len(P)==len(R),(len(P),len(R))
SYL={'60':2,'8':1,'1781':6,'paralysis':5,'percent':2,'newfoundland':3,'kanashibari':5,'centuries':3,'happening':3,'sometimes':2,'awake':2,'asleep':2,'usually':4,'couple':2,'minutes':2,'little':2,'likely':2,'finger':2,'focus':2,'demon':2,'demons':2,'painter':2,'crouched':1,'sleeping':2,'womans':2,'shallow':2,'breathing':2,'center':2,'shadow':2,'figure':2,'switches':2,'muscles':2,'nothing':2,'heres':1,'youre':1,'doesnt':2,'cant':1,'dont':1,'theres':1,'brains':1,'ill':1,'its':1}
SYL.update({'100':3,'60':2,'2003':4,'109':4,'189':6,'10':1,'notarbartolo':5,'antwerp':2,'belgium':2,'aluminum':4,'seismic':2,'combinations':4,'salami':3,'envelopes':3,'videotape':4,'hairspray':2,'february':4,'landowner':3,'diamonds':3,'diamond':3,'security':4,'century':3,'every':2,'possible':3,'leonardo':4,'quiet':2,'camera':3,'already':3,'craziest':3,'ill':1,'its':1,'theyre':1,'heres':1})
SYL.update({'1801':6,'1807':6,'1810':5,'1,800':4,'80,000':4,'69':4,'60':2,'zheng':1,'yi':1,'canton':2,'china':2,'emperor':3,'navy':2,'pirate':2,'pirates':2,'woman':2,'offer':2,'everything':3,'seconds':2,'brothel':2,'floating':2,'powerful':3,'history':3,'captain':2,'condition':3,'fleet':1,'hundreds':2,'thousand':2,'expects':2,'instead':2,'disobey':3,'beheaded':3,'female':2,'captive':2,'desert':2,'commands':2,'coastal':2,'villages':3,'fishing':2,'protection':3,'british':2,'sailors':2,'captures':2,'portuguese':3,'peace':1,'messenger':3,'governors':3,'unarmed':2,'children':2,'pardoned':2,'husband':2,'hunting':2,'retires':2,'gambling':2,'caught':1,'never':2,'every':2,'women':2,'office':2,'herself':2,'something':2})
SYL.update({'heavyweight':3,'knockout':2,'fluid':2,'forehead':2,'mostly':2,'brainstem':2,'neurons':2,'misfire':3,'silent':2,'buckle':2,'boxer':2,'dangerous':3,'hardest':2,'lever':2,'pivot':2,'fibers':2,'system':2,'awake':2,'inside':2,'second':2,'seconds':2,'someone':2,'around':2,'floating':2,'behind':2,'stretches':2,'stretch':1,'twist':1,'twists':1,'lights':1,'knees':1,'yolk':1,'60':2,'nothing':2,'power':2,'really':2,'doesnt':2,'brains':1,'every':2,'because':2})
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
