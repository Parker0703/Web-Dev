import re,json,numpy as np
SYL={'60':2,'8':1,'1781':6,'paralysis':5,'percent':2,'newfoundland':3,'kanashibari':5,'centuries':3,'everything':3,'happening':3,'sometimes':2,'awake':2,'asleep':2,'usually':4,'couple':2,'minutes':2,'stress':1,'little':2,'likely':2,'finger':2,'focus':2,'demon':2,'demons':2,'painter':2,'crouched':1,'sleeping':2,'woman\'s':2,'shallow':2,'breathing':2,'center':2,'threat':1,'shadow':2,'figure':2,'switches':2,'muscles':2,'dreams':1,'nothing':2,'1848':5,'13':2,'60':2,'phineas':3,'gage':1,'vermont':2,'railroad':2,'foreman':2,'careful':2,'polite':2,'everyone':3,'trusts':1,'packing':2,'blasting':2,'powder':2,'iron':2,'rockets':2,'cheek':1,'skull':1,'minutes':2,'talking':2,'rides':1,'ox':1,'doctor':2,'arrives':2,'reportedly':4,'business':2,'enough':2,'survives':2,'something':2,'impatient':3,'swearing':2,'nonstop':2,'friends':1,'frontal':2,'lobe':1,'twist':1,'stagecoaches':4,'chile':2,'scientists':3,'slowly':2,'learned':1,'adapt':2,'today':2,'harvard':2,'accident':3,'changed':1,'understand':3,'survived':2,'people':2,'brain':1,'pound':1,'29':4,'1944':5,'1972':5,'30':2,'60':2,'ii':1,'hiroo':3,'onoda':3,'lieutenant':3,'philippine':3,'island':2,'surrender':3,'surrenders':3,'japan':2,'leaflets':2,'mountains':2,'raiding':2,'locals':2,'people':2,'alone':2,'traveler':3,'jungle':2,'panda':2,'yeti':2,'orders':2,'commander':3,'sentence':2,'relieved':2,'duty':2,'salutes':2,'perfectly':3,'loyalty':3,'already':3,'ended':2,'soldier':2,'every':2,'chance':1,'trapped':1,'around':2,'over':2,'later':2,'trick':1,'fighting':2,'hiding':2,'looking':2,'finds':1,'quit':1,'without':2,'rifle':2,'works':1,'sword':1,'1963':5,'11':3,'4':1,'60':2,'2':1,'3':1,'100':3,'65':4,'264':7,'15':2,'diego':3,'gardner':2,'science':2,'humanly':3,'objects':2,'touching':2,'grumpy':2,'twisters':3,'impossible':4,'lowe':1,'chargers':2,'skinny':2,'basketball':3,'pinball':2,'music':2,'stanford':2,'scientist':3,'scientists':3,'sevens':2,'stopped':1,'record':2,'almost':2,'creepy':2,'secretly':3,'sneaking':2,'microsleeps':3,'noticed':2,'harmless':2,'decades':2,'barely':2,'episode':3,'remember':3,'randy':2,'teenager':3,'convinced':2,'football':2,'happens':2,'possible':3,'every':2,'60':2,'scientists':3,'tickle':2,'robot':2,'figure':2,'yourself':2,'creepy':2,'armpits':2,'potato':3,'nothing':2,'control':2,'every':2,'secretly':3,'predicts':2,'happen':2,'finger':2,'seconds':2,'little':2,'called':1,'cerebellum':5,'basically':4,'spoiler':3,'alert':2,'exactly':3,'predicted':3,'surprise':2,'zero':2,'sneaks':1,'panic':2,'laughing':2,'squirming':2,'accidentally':5,'london':2,'other':2,'delay':2,'fraction':2,'second':2,'suddenly':3,'ticklish':2,'longer':2,'guessing':2,'which':1,'person':2,'never':2,'move':1,'whole':1,'mutes':1,'friend':1,'brain':1,'world':1}
SYL.update({'100':3,'60':2,'2003':4,'109':4,'189':6,'10':1,'notarbartolo':5,'antwerp':2,'belgium':2,'aluminum':4,'seismic':2,'combinations':4,'salami':3,'envelopes':3,'videotape':4,'hairspray':2,'february':4,'landowner':3,'diamonds':3,'diamond':3,'security':4,'century':3,'every':2,'everything':3,'possible':3,'leonardo':4,'office':2,'inside':2,'building':2,'trader':2,'deposit':3,'guards':1,'quiet':2,'weekend':2,'afternoon':3,'blind':1,'homemade':2,'magnetic':3,'giant':2,'camera':3,'already':3,'filmed':1,'swings':1,'barely':2,'perfect':2,'crime':1,'almost':2,'panicked':2,'highway':2,'receipts':2,'police':2,'follow':2,'straight':1,'later':2,'nothing':2,'happened':2,'waiting':2,'prison':2,'craziest':3,'hidden':2,'somewhere':2,'means':1})
SYL.update({'1801':6,'1807':6,'1810':5,'1,800':4,'80,000':4,'69':4,'60':2,'zheng':1,'yi':1,'canton':2,'china':2,'emperor':3,'navy':2,'pirate':2,'pirates':2,'woman':2,'offer':2,'everything':3,'seconds':2,'brothel':2,'floating':2,'powerful':3,'history':3,'captain':2,'condition':3,'fleet':1,'hundreds':2,'thousand':2,'expects':2,'instead':2,'disobey':3,'beheaded':3,'female':2,'captive':2,'desert':2,'commands':2,'coastal':2,'villages':3,'fishing':2,'protection':3,'british':2,'sailors':2,'captures':2,'portuguese':3,'peace':1,'messenger':3,'governors':3,'unarmed':2,'children':2,'pardoned':2,'husband':2,'hunting':2,'retires':2,'gambling':2,'caught':1,'never':2,'every':2,'women':2,'office':2,'herself':2,'something':2})
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
