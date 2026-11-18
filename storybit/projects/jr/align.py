import numpy as np, scipy.io.wavfile as w, scipy.signal as sg, json, re
P=["In 1888,","one man filled the streets of London with terror…","and to this day,","nobody knows who he was.",
"Give me 60 seconds, and I'll show you how he vanished without a trace.",
"It's autumn in Whitechapel.","The poorest corner of London.","Fog so thick you can't see your own hand.","Gas lamps flickering over every alley.",
"And then…","the bodies start turning up.",
"In about ten weeks,","five women are murdered.","Mary Ann.","Annie.","Elizabeth.","Catherine.","Mary Jane.",
"The city panics.","Neighbours start night patrols.","Police flood the streets and question over two thousand people.","And they get…","nothing.",
"Then a letter arrives.","Written in red ink.","Mocking the police.","And it's signed…","Jack the Ripper.",
"Now London has a name for its monster.","But here's the twist…","a lot of historians think he never wrote it.","A journalist did.",
"Weeks later,","a man opens a small box.","Inside…","half a human kidney.","And a letter that begins with two words…","From Hell.",
"Then comes the worst night.","He strikes twice, under an hour apart.","Police are everywhere…","and somehow,","he still slips away.",
"Near one scene, they find a message chalked on a wall.","A real clue.","And the police chief…","has it wiped off before anyone can photograph it.",
"Then,","after November…","the murders just stop.","He's gone.",
"No face.","No arrest.","Not even his real name.","So…","who was he?","Follow for more."]
R=[l.split() for l in open('runs.txt').read().strip().split('\n')]
R=[(float(a),float(b)) for a,b,_,_ in R]
assert len(P)==len(R),(len(P),len(R))
SYL={'1888':7,'60':3}
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
for o in out[:6]+out[19:21]: print(o['line'],[ (q['x'],q['t']) for q in o['w']])
