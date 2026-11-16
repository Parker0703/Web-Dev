import re,json,numpy as np
SYL={'42':3,'3':1,'11':3,'18':2,'6':1,'54':3,'79':3,'30':2,'12':1,'10':1,'8':1,'7':2,'80':2,'63':3,'everyone':3,'countdown':2,'eventually':5,'interfere':3,'electricity':5,'dangerous':3,'pavement':2,'goodbye':2,'construction':3,'scheduled':2,'inherits':3,'defeating':3,'birthday':2,'stranger':2,'seconds':2,'minutes':2,'someone':2,'terrified':3,'realize':3,'process':2,'whose':1,'chosen':2,'happen':2,'protect':2,'promise':2,'mirror':2,'answers':2,'60':2,'1945.':7,'august':2,'tsutomu':3,'yamaguchi':4,'engineer':3,'nagasaki':4,'hiroshima':4,'business':2,'shipyard':2,'parachute':3,'brighter':2,'kilometers':4,'eardrums':2,'blinded':2,'air-raid':2,'airraid':2,'shelter':2,'bandaged':2,'impossible':4,'believe':2,'exactly':3,'exact':2,'atomic':3,'survives':3,'sixty-four':3,'sixtyfour':3,'officially':4,'recognized':3,'surviving':3,'2010,':4,'ninety-three.':3,'ninetythree':3,'luckiest':3,'unluckiest':4,'history.':3,'history':3,'window':2,'second':2,'another':3}
def syl(w):
  k=re.sub(r'[^a-z0-9-]','',w.lower())
  if k in SYL: return SYL[k]
  n=len(re.findall(r'[aeiouy]+',k.replace('-',' ')))
  if k.endswith('e') and n>1 and not k.endswith('le'): n-=1
  return max(1,n)
W=open('script.txt').read().split()
S=np.array([syl(w) for w in W],float)
R=[tuple(map(float,l.split()[:2])) for l in open('runs.txt')]
tot=sum(b-a for a,b in R);r=tot/S.sum()
cs=np.concatenate([[0],np.cumsum(S)])
nW,nR=len(W),len(R);INF=1e9
D=np.full((nR+1,nW+1),INF);P=np.zeros((nR+1,nW+1),int);D[0,0]=0
punct=lambda w:bool(re.search(r'[,.…?!]$',w))
for i in range(1,nR+1):
  d=R[i-1][1]-R[i-1][0]
  for j in range(1,nW+1):
    best=INF;bk=0
    for k in range(max(0,j-25),j):
      if D[i-1,k]>=INF:continue
      sy=cs[j]-cs[k];c=(d-sy*r)**2/max(d,0.3)+(0 if punct(W[j-1]) else 0.35)
      if D[i-1,k]+c<best:best=D[i-1,k]+c;bk=k
    D[i,j]=best;P[i,j]=bk
j=nW;segs=[]
for i in range(nR,0,-1):k=P[i,j];segs.append(' '.join(W[k:j]));j=k
segs=segs[::-1]
for (a,b),s in zip(R,segs):print(f'{a:6.2f}-{b:6.2f} | {s}')
json.dump(segs,open('phr.json','w'))
