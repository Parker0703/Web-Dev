import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=79.0;N=int(END*SR)+SR
bus=np.zeros(N);mus=np.zeros(N)
def nz(d):return rng.standard_normal(int(d*SR))
def tt(d):return np.arange(int(d*SR))/SR
def bp(x,lo,hi,o=2):b,a=sg.butter(o,[lo/(SR/2),min(hi/(SR/2),0.99)],'band');return sg.lfilter(b,a,x)
def lp(x,f,o=2):b,a=sg.butter(o,f/(SR/2));return sg.lfilter(b,a,x)
def hp(x,f,o=2):b,a=sg.butter(o,f/(SR/2),'high');return sg.lfilter(b,a,x)
def norm(x):return x/(np.max(np.abs(x))+1e-9)
def put(t,x,g=1.0,tgt=None):
    tgt=bus if tgt is None else tgt;i=int(t*SR);n=min(len(x),len(tgt)-i)
    if n>0:tgt[i:i+n]+=x[:n]*g
def whoosh(d=0.5,lo=300,hi=3000,up=True):
    x=nz(d);n=len(x);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):
        p=s/n;f=lo*(hi/lo)**(p if up else 1-p);seg=bp(x[s:s+bl],max(60,f*0.6),f*1.4,1);out[s:s+len(seg)]=seg
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def boom(d=1.4,f0=90,f1=35):
    t=tt(d);f=f1+(f0-f1)*np.exp(-t*6);return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*3.2)+lp(nz(d),400)*np.exp(-t*14)*0.6)
def slam(d=0.35):t=tt(d);return norm(lp(nz(d),1800)*np.exp(-t*30)+np.sin(2*np.pi*75*t)*np.exp(-t*14)*1.4)
def pop(f=600,d=0.12):t=tt(d);return norm(np.sin(2*np.pi*(f+f*2*np.exp(-t*60))*t)*np.exp(-t*40))
def chime(f=880,d=1.6):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,3),(2.01,0.4,5),(3.0,0.25,7),(4.2,0.12,9)]))
def glitch(d=0.35):
    t=tt(d);sq=np.sign(np.sin(2*np.pi*(180+900*rng.random())*t));chop=(np.floor(t*60)%2)
    return norm((sq*0.5+bp(nz(d),800,5000)*0.8)*chop*np.exp(-t*4))
def blip(f=1200,d=0.09):t=tt(d);return norm(np.sign(np.sin(2*np.pi*f*t))*0.4*np.exp(-t*30))
def clink(f=2600,d=0.6):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,9),(1.51,0.7,12),(2.32,0.5,16),(3.7,0.3,20)])+hp(nz(d),4000)*np.exp(-t*90)*0.4)
def thunk(d=0.3):t=tt(d);return norm(np.sin(2*np.pi*(110*np.exp(-t*8)+50)*t)*np.exp(-t*18)+lp(nz(d),900)*np.exp(-t*40)*0.5)
def pat(d=0.08):t=tt(d);return norm(lp(nz(d),700)*np.exp(-t*60))
def splash(d=0.7):t=tt(d);return norm(bp(nz(d),900,7000)*np.exp(-t*7)*(1-np.exp(-t*200)))
def zap(d=0.9):t=tt(d);f=600+1800*(1-np.exp(-t*5));return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*2.5)*0.6+np.sin(2*np.pi*np.cumsum(f*1.5)/SR)*np.exp(-t*3)*0.3)
def shimmer(d=1.6,f=1200):
    t=tt(d);x=np.zeros(len(t))
    for i in range(10):
        o=i*0.07;m=t>=o;x[m]+=np.sin(2*np.pi*f*(1+i*0.12)*(t[m]-o))*np.exp(-(t[m]-o)*5)
    return norm(x)
def rumble(d=1.6):t=tt(d);return norm(lp(nz(d),160,3)*(0.6+0.4*np.sin(2*np.pi*9*t))*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.4))
# ---------------- SFX keyed to the voice ----------------
import json,re
LS=json.load(open('words.json'));WS=[w for l in LS for w in l['w']]
def W(word,near):
    c=[w['t'] for w in WS if re.sub(r"[^a-z0-9'-]","",w['x'].lower()).startswith(word)];return min(c,key=lambda q:abs(q-near))
LA=lambda i:LS[i]['a']
def siren(d=1.2):t=tt(d);f=900+300*np.sign(np.sin(2*np.pi*2.5*t));return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.3))
def typing(d=1.0):
    x=np.zeros(int(d*SR))
    for k in range(int(d*14)):i=int((k/14+rng.random()*0.03)*SR);c2=hp(nz(0.02),2500)*np.exp(-tt(0.02)*300);x[i:i+len(c2)]+=c2[:len(x)-i]
    return norm(x)
def alarm(d=0.8):t=tt(d);return norm(np.sign(np.sin(2*np.pi*(700+200*np.sign(np.sin(2*np.pi*6*t)))*t))*0.5*np.minimum(1,(d-t)/0.2))
def tick():return blip(2200,0.04)
def gavelS():t=tt(0.5);return norm(lp(nz(0.5),1200)*np.exp(-t*40)+np.sin(2*np.pi*140*t)*np.exp(-t*25))
def doorslam():
    x=boom(1.0,70,30).copy();th=thunk();x[:len(th)]+=th*0.6;return norm(x)
put(0.0,boom(1.6,110,32),0.8);put(0.0,siren(1.6),0.18)
put(W('laptop',1.4),thunk(),0.5)
put(W('biggest',3.1),whoosh(0.5,300,3000),0.3);put(W('tv',5.5),blip(1600,0.15),0.3);put(W('with',4.7),typing(1.2),0.3)
put(W('60',6.9)-0.04,slam(),0.9);put(LA(2)+0.2,alarm(0.9),0.12)
put(LA(3)+0.6,doorslam(),0.6)
put(LA(4)-0.05,whoosh(0.4,500,2500),0.3);put(LA(4)+0.05,thunk(),0.5)
put(LA(5),whoosh(0.8,200,1500),0.25)
for i in range(3):put(W('most',16.1)+0.15+i*0.18,clink(1200,0.4),0.35)
put(W('british',18.9)-0.3,whoosh(0.9,300,1200),0.2)
for i in range(3):put(W('hacking',21.7)+i*0.25,glitch(0.3),0.3)
put(LA(8)+0.3,thunk(),0.7)
put(LA(9),pat(),0.2)
put(W('stick',31.8),clink(1800,0.3),0.4);put(W('stick',31.8)+0.05,blip(2400,0.12),0.3)
put(LA(11),whoosh(0.3,600,3000),0.25);put(LA(12),typing(1.0),0.35)
put(LA(13)+0.1,typing(1.6),0.3);put(W('chat',39.9)-0.3,chime(1318,1.0),0.3)
put(W('message',41.8)-0.1,alarm(0.8),0.25)
put(LA(15),pop(500),0.3)
for k in range(10):put(W('24',43.7)+k*0.3,tick(),0.25)
put(W('leak',45.2),glitch(0.7),0.4)
for i in range(18):put(W('90',48.1)-0.2+i*0.1,pop(700+i*30),0.12)
for i in range(5):put(LA(18)+0.1+i*0.11,thunk(),0.15)
put(W('5',57.2)-0.6,whoosh(1.2,300,4000),0.3);put(W('dollars',58.2)+0.2,chime(1046,1.0),0.25)
for k in range(12):put(LA(20)+k*0.14,tick(),0.2)
put(LA(21),boom(1.6,80,30),0.6);put(LA(21),whoosh(1.0,150,1500),0.25)
put(W('unfit',63.7),pop(300,0.2),0.4)
put(W('found',66.6),gavelS(),0.8);put(W('found',66.6)+0.6,gavelS(),0.5)
put(W('hacking',69.6)-0.6,pop(600),0.3)
for k in range(6):put(LA(25)+k*0.5,pat(),0.25)
put(W('hospital',71.7),doorslam(),0.5)
put(LA(26),glitch(0.5),0.2);put(W('date',73.5),thunk(),0.4)
for i in range(6):put(LA(27)+0.3+i*0.35,boom(0.6,200,90),0.12);put(LA(27)+0.35,shimmer(1.6,1200),0.25)
# ---------------- music: dark synth thriller pulse, opens up into a bright synthwave end ----------------
BPM=96;beat=60/BPM
def saw(f,d,dec=4):t=tt(d);x=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,8));return lp(x,1400)*np.exp(-t*dec)
def pad(fs,d):t=tt(d);x=sum(np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*1.004*t) for f in fs);return lp(x,900)*np.minimum(1,t/0.5)*np.minimum(1,(d-t)/0.5)
hz=lambda m:440*2**((m-69)/12)
dark=[[45,52,57],[41,48,53],[43,50,55],[40,47,52]]
bright=[[45,52,57,60],[41,48,53,57],[48,55,60,64],[43,50,55,59]]
def section(t0,t1,prog,g=1.0,pulse=True,arp=False):
    bar=4*beat;t=t0;i=0
    while t<t1-0.2:
        ch=prog[i%len(prog)];d=min(bar,t1-t)
        put(t,pad([hz(m) for m in ch],d+0.5),0.05*g,mus)
        if pulse:
            for k in range(8):
                tk=t+k*beat/2
                if tk<t1-0.05:put(tk,saw(hz(ch[0]-12),0.3,9),0.12*g,mus)
            for k in range(4):
                tk=t+k*beat
                if tk<t1-0.05:put(tk,lp(boom(0.35,80,45),400),0.12*g,mus)
        if arp:
            for k in range(8):
                tk=t+k*beat/2
                if tk<t1-0.05:put(tk,saw(hz(ch[k%len(ch)]+12),0.4,8),0.06*g,mus)
        t+=bar;i+=1
section(0.0,6.7,dark,0.9,pulse=False)
section(6.7,29.8,dark,1.0)
section(29.8,47.1,dark,1.1,arp=True)
section(47.1,61.0,dark,1.0,arp=True)
section(61.0,74.3,dark,0.8,pulse=False)
section(74.3,79.0,bright,1.0,arp=True)
fadeN=int(1.2*SR);e=int(77.6*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
