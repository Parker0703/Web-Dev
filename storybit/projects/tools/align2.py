"""Forced-style caption aligner without ASR.
1) syllable nuclei from a speech-band energy envelope, 2) pauses, 3) DP alignment of script syllables to nuclei with
punctuation<->pause agreement, 4) word starts snapped to the energy onset before the first nucleus (or hiss onset for s/f/z/ch/sh).
usage: python3 align2.py voice.wav script.txt out.json [--report]"""
import sys,re,json,numpy as np,scipy.io.wavfile as wf,scipy.signal as sg
wav,scr,outp=sys.argv[1:4];REPORT='--report' in sys.argv
sr,x=wf.read(wav);x=x.astype(float);x=x if x.ndim==1 else x.mean(1);x/=np.max(np.abs(x))+1e-9
H=int(sr*0.005)  # 5 ms frames
def env(lo,hi):
    b,a=sg.butter(4,[lo/(sr/2),hi/(sr/2)],'band');y=sg.filtfilt(b,a,x);e=np.sqrt(np.convolve(y**2,np.ones(H*4)/(H*4),'same'))[::H];return e
E=env(300,3200);Eh=env(4000,min(9000,sr/2-100))
E=sg.savgol_filter(E,9,2);E=np.maximum(E,0)
fl=np.percentile(E,8);pk=np.percentile(E,97);En=np.clip((E-fl)/(pk-fl+1e-9),0,None)
dt=H/sr
# pauses: >=110 ms below 6% level
low=En<0.06;pauses=[];i=0
while i<len(low):
    if low[i]:
        j=i
        while j<len(low) and low[j]:j+=1
        if (j-i)*dt>=0.11:pauses.append((i*dt,j*dt))
        i=j
    else:i+=1
# syllable nuclei: peaks with prominence
pkx,props=sg.find_peaks(En,prominence=0.07,distance=int(0.075/dt),height=0.1)
nuc=pkx*dt;prom=props['prominences']
# ---- script syllables
txt=open(scr).read().replace('…','... ').replace('—',' , ')
toks=re.findall(r"[A-Za-z0-9'’\-]+[\"”]?|[.,!?;:]+",txt)
OVR={'60':2,'1961':5,'450':6,'65':4,'40':2,'26':4,'10':1,'100':3}
def sylc(w):
    w0=w.lower().strip("\"”'’").replace('’',"'")
    if w0 in OVR:return OVR[w0]
    if w0.isdigit():return max(1,len(w0))
    w1=re.sub(r"'s$|'re$|'ll$|'ve$|'d$|n't$","",w0);w1=re.sub(r"[^a-z]","",w1)
    if not w1:return 1
    v=re.findall(r"[aeiouy]+",w1);n=len(v)
    if w1.endswith('e') and not w1.endswith(('le','ee','ye')) and n>1:n-=1
    if w1.endswith(('ed',)) and not w1.endswith(('ted','ded')) and n>1:n-=1
    if re.search(r"[^aeiou]le$",w1) and n<1:n=1
    for pat in ['ia','io','iu','ua','uo','eo']:
        n+=len(re.findall(pat,w1))*0  # keep simple
    return max(1,n)
words=[];punct_after=[]
for tk in toks:
    if re.match(r"[.,!?;:]+$",tk):
        if words:punct_after[-1]=max(punct_after[-1],2 if any(c in tk for c in '.!?') else 1)
    else:words.append(tk);punct_after.append(0)
syl=[];owner=[]
for wi,w in enumerate(words):
    for k in range(sylc(w)):syl.append(wi);owner.append(k)
S=len(syl);M=len(nuc)
def gap_has_pause(a,b):
    for p0,p1 in pauses:
        if p0>=a and p1<=b:return p1-p0
    return 0.0
# DP over (syllable i, nucleus j): match, skip nucleus (extra), merge syllable onto previous nucleus (missing)
INF=1e18;D=np.full((S+1,M+1),INF);B=np.zeros((S+1,M+1),dtype=np.int8)
D[0,:]=np.arange(M+1)*0.6
for i in range(1,S+1):
    for j in range(1,M+1):
        # match syllable i-1 to nucleus j-1
        c=D[i-1,j-1]
        if i>=2 and j>=2:
            gp=gap_has_pause(nuc[j-2],nuc[j-1]);boundary=syl[i-1]!=syl[i-2];pa=punct_after[syl[i-2]] if boundary else 0
            if pa and gp:c-=0.8*min(gp,0.5)/0.5*pa
            elif pa and not gp:c+=0.35*pa
            elif gp and not boundary:c+=1.2
            elif gp and boundary and not pa:c+=0.15
        best=c;bb=0
        cs=D[i,j-1]+0.6+ (0.6 if prom[j-1]>0.3 else 0)   # skip nucleus j-1 (spurious peak)
        if cs<best:best,bb=cs,1
        cm=D[i-1,j]+0.75                                  # syllable merged into nucleus j-1
        if cm<best:best,bb=cm,2
        D[i,j]=best;B[i,j]=bb
j=int(np.argmin(D[S,:]+ (M-np.arange(M+1))*0.6));i=S;asg=[None]*S
while i>0 and j>0:
    b=B[i,j]
    if b==0:asg[i-1]=j-1;i-=1;j-=1
    elif b==1:j-=1
    else:asg[i-1]=j-1;i-=1
for k in range(S):
    if asg[k] is None:asg[k]=asg[k-1] if k else 0
# word start: onset before first nucleus of the word
FR=lambda t:int(round(t/dt))
starts=[];conf=[]
for wi,w in enumerate(words):
    ks=[k for k in range(S) if syl[k]==wi];n0=asg[ks[0]];tn=nuc[n0]
    prev=nuc[n0-1] if n0>0 else max(0,tn-0.4);lo=FR(max(prev,tn-0.45));hi=FR(tn)
    seg=En[lo:hi+1];pkv=En[FR(tn)]
    # walk back from the nucleus until energy drops below 25% of its peak or hits the valley
    k=hi
    while k>lo and En[k]>0.25*pkv:k-=1
    vmin=lo+int(np.argmin(seg)) if len(seg) else hi
    t0=max(k,vmin)*dt
    w0=w.lower().strip("\"”'’")
    if re.match(r"(s|f|z|ch|sh|th|h|x)",w0):
        eh=Eh[FR(max(0,t0-0.25)):FR(tn)];
        if len(eh):
            thr=0.35*eh.max();idx=np.argmax(eh>thr);t0=min(t0,max(0,t0-0.25)+idx*dt)
    starts.append(t0);conf.append(sum(1 for q in ks if True))
# enforce monotonic + min spacing 0.08
for k in range(1,len(starts)):
    if starts[k]<starts[k-1]+0.08:starts[k]=starts[k-1]+0.08
# group into caption lines by the original script lines
lines=[l.strip() for l in open(scr).read().split('\n') if l.strip()];out=[];wi=0
for l in lines:
    n=len(re.findall(r"[A-Za-z0-9'’\-]+",l.replace('…',' ').replace('—',' ')));ws=[]
    for k in range(n):
        if wi>=len(words):break
        ws.append({'x':words[wi],'t':round(starts[wi],3)});wi+=1
    if ws:out.append({'a':ws[0]['t'],'b':round((starts[wi] if wi<len(starts) else len(En)*dt)-0.05,3),'w':ws})
json.dump(out,open(outp,'w'))
# report: nuclei vs syllables, words whose start sits inside a long pause or far from an onset
print(f'syllables {S}  nuclei {M}  pauses {len(pauses)}')
if REPORT:
    bad=[]
    for wi,w in enumerate(words):
        t=starts[wi];e=En[FR(t):FR(t+0.12)].max() if FR(t+0.12)<len(En) else 0
        if e<0.12:bad.append((w,round(t,2)))
    print('low-energy starts:',bad[:30])
