"""Caption aligner v3: pause-split runs (runs.txt + phr.json from galign) give reliable phrase anchors;
inside each run, script syllables are matched to detected syllable nuclei (local DP), and each word starts at the
energy valley/onset before its first nucleus (hiss onset for s/f/z/sh/ch words).  Writes words.json (same format)."""
import numpy as np, scipy.io.wavfile as wf, scipy.signal as sg, json, re, sys
P=json.load(open("phr.json"));R=[l.split() for l in open('runs.txt').read().strip().split('\n')];R=[(float(a),float(b)) for a,b,*_ in R]
assert len(P)==len(R)
OVR={'1848':5,'13':2,'phineas':3,'reportedly':4,'stagecoaches':4,'impatient':3,'29':4,'1944':5,'1972':5,'30':2,'ii':1,'hiroo':3,'onoda':3,'lieutenant':3,'philippine':3,'yeti':2,'loyalty':3,'perfectly':3,'traveler':3,'relieved':2,'already':3,'1963':5,'100':3,'264':7,'15':2,'65':4,'4':1,'2':1,'3':1,'diego':3,'humanly':3,'impossible':4,'twisters':3,'basketball':3,'microsleeps':3,'episode':3,'teenager':3,'60':2,'47':4,'1961':5,'1964':5,'450':6,'65':4,'40':2,'26':4,'11':3,'17':3,'264':6,'cerebellum':5,'every':2,'everything':3,'everyone':3,'business':2,'different':3,'favorite':3,'interesting':3,'camera':3,'family':3,'chocolate':3,'evening':2,'real':1,'really':2,'idea':3,'science':2,'scientists':3,'scientist':3,'being':2,'quiet':2,'area':3,'video':3,'radio':3,'piano':3,'create':2,'created':3,'poem':2,'lion':2,'diet':2,'riot':2,'violent':3,'naturally':4,'actually':4,'usually':4,'basically':4,'accidentally':5,'experiment':4,'experimenter':5,'psychology':4,'psychologist':4}
def syl(wd):
    k=re.sub(r"[^a-z0-9']","",wd.lower()).replace("'s","").replace("n't","nt").replace("'","")
    if k in OVR:return OVR[k]
    if k.isdigit():return max(1,len(k))
    n=len(re.findall(r'[aeiouy]+',k))
    if k.endswith('e') and n>1 and not k.endswith(('le','ee')):n-=1
    if k.endswith('ed') and n>1 and not k.endswith(('ted','ded')):n-=1
    if k.endswith('es') and n>1 and not re.search(r'(ses|zes|ces|ges|shes|ches|xes)$',k):n-=1
    return max(1,n)
wav=sys.argv[1] if len(sys.argv)>1 else 'voice22.wav'
sr,x=wf.read(wav);x=x.astype(float);x=x if x.ndim==1 else x.mean(1);x/=np.max(np.abs(x))+1e-9
H=int(sr*0.005);dt=H/sr
def env(lo,hi):b,a=sg.butter(4,[lo/(sr/2),hi/(sr/2)],'band');y=sg.filtfilt(b,a,x);return np.sqrt(np.convolve(y**2,np.ones(H*5)/(H*5),'same'))[::H]
E=sg.savgol_filter(env(300,3200),11,2);E=np.maximum(E,0);Eh=env(3500,min(9000,sr/2-200))
fl=np.percentile(E,8);pk=np.percentile(E,97);En=np.clip((E-fl)/(pk-fl+1e-9),0,None)
hiss=np.log(Eh+1e-6)
FR=lambda t:int(np.clip(round(t/dt),0,len(En)-1))
out=[];rep=[]
for line,(a,b) in zip(P,R):
    ws=line.split();sy=[syl(w) for w in ws];S=sum(sy);own=[i for i,n in enumerate(sy) for _ in range(n)]
    i0,i1=FR(a),FR(b);seg=En[i0:i1+1]
    pks,pr=sg.find_peaks(seg,prominence=0.05,distance=int(0.07/dt),height=0.08);nuc=(pks+i0)*dt;prom=pr['prominences'];M=len(nuc)
    if M==0:nuc=np.array([(a+b)/2]);prom=np.array([1.0]);M=1
    # local DP: syllables -> nuclei, monotone; skip nucleus / merge syllable penalties; keep proportional timing as weak prior
    INF=1e9;D=np.full((S+1,M+1),INF);Bk=np.zeros((S+1,M+1),np.int8);D[0,0]=0
    for j in range(1,M+1):D[0,j]=D[0,j-1]+0.5+0.6*prom[j-1];Bk[0,j]=1
    for i in range(1,S+1):
        for j in range(0,M+1):
            best=INF;bb=0
            if j>=1:
                exp=a+(i-0.5)/S*(b-a);c=D[i-1,j-1]+0.25*((nuc[j-1]-exp)/max(0.25,(b-a)*0.25))**2
                if c<best:best,bb=c,0
                c=D[i,j-1]+0.45+0.6*prom[j-1]
                if c<best:best,bb=c,1
            if i>=1 and j>=1:
                c=D[i-1,j]+0.7
                if c<best:best,bb=c,2
            D[i,j]=best;Bk[i,j]=bb
    i,j=S,M;asg=[None]*S
    while i>0:
        bb=Bk[i,j]
        if bb==0:asg[i-1]=j-1;i-=1;j-=1
        elif bb==1:j-=1
        else:asg[i-1]=max(0,j-1);i-=1
    for k in range(S):
        if asg[k] is None:asg[k]=asg[k-1] if k else 0
    first=[asg[own.index(w)] for w in range(len(ws))];last=[asg[len(own)-1-own[::-1].index(w)] for w in range(len(ws))]
    starts=[a]
    for w in range(1,len(ws)):
        n0=first[w];np_=last[w-1]
        if n0<=np_:  # merged: fall back to proportional split between neighbours
            t=a+sum(sy[:w])/S*(b-a)
        else:
            lo,hi=FR(nuc[np_]),FR(nuc[n0]);v=lo+int(np.argmin(En[lo:hi+1]));pkv=En[hi]
            k=hi
            while k>v and En[k]>0.3*pkv:k-=1
            t=k*dt
        k2=re.sub(r'[^a-z]','',ws[w].lower())
        if re.match(r'^(s|f|z|ch|sh|c[ei]|th)',k2):
            lo2=max(starts[-1]+0.1,t-0.15);g=np.arange(lo2,min(t+0.08,b),dt)
            if len(g):
                hv=np.array([hiss[FR(q)] for q in g]);th=hv.min()+0.6*(hv.max()-hv.min());t=min(t,g[np.argmax(hv>=th)])
        t=max(t,starts[-1]+0.1);starts.append(min(t,b-0.06))
    ends=starts[1:]+[b]
    out.append({'line':line,'a':a,'b':b,'w':[{'t':round(s,3),'e':round(e,3),'x':w} for s,e,w in zip(starts,ends,ws)]})
    rep.append((line[:40],S,M))
json.dump(out,open('words.json','w'),indent=0)
for r in rep:
    flag='  <-- check' if abs(r[1]-r[2])>max(2,0.35*r[1]) else ''
    print(f'{r[1]:3d} syl {r[2]:3d} nuc  {r[0]}{flag}')
