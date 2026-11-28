import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=75.2;N=int(END*SR)+SR
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
def creak(d=0.8):t=tt(d);f=120+60*np.sin(2*np.pi*3*t);return norm(bp(np.sin(2*np.pi*np.cumsum(f)/SR)*(0.6+0.4*np.sign(np.sin(2*np.pi*35*t))),150,900)*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.2))
def page(d=0.35):t=tt(d);return norm(bp(nz(d),1500,7000)*np.exp(-t*12)*(1-np.exp(-t*120)))
import json,re
LS=json.loads(re.search(r'const L=(\[.*?\]);const END',open('data.js').read(),re.S).group(1));WS=[w for l in LS for w in l['w']]
def TW(word,near):
    return W(word,near)
def W(word,near):
    c=[w['t'] for w in WS if re.sub(r"[^a-z0-9'-]","",w['x'].lower().replace(',','')).startswith(word)];return min(c,key=lambda q:abs(q-near))
LA=lambda i:LS[i]['a']
def hash(n):
    s=np.sin(n*127.1+311.7)*43758.5453;return s-np.floor(s)
def thump(d=0.12):t=tt(d);return norm(np.sin(2*np.pi*(140*np.exp(-t*30)+60)*t)*np.exp(-t*35))
def squeak(d=0.18,f=1800):t=tt(d);ff=f*(1+0.4*np.sin(np.pi*t/d));return norm(np.sin(2*np.pi*np.cumsum(ff)/SR)*np.sin(np.pi*t/d))
def scratch(d=0.5):t=tt(d);return norm(bp(nz(d),600,4000)*np.abs(np.sin(2*np.pi*(14-10*t/d)*t))*np.exp(-t*2))
def swish(d=0.25):return whoosh(d,800,5000)
def drum(d=0.18):t=tt(d);return norm(bp(nz(d),150,2500)*np.exp(-t*28)+np.sin(2*np.pi*190*t)*np.exp(-t*30)*0.6)
def crowd(d,base,n,g,seed):
    for k in range(n):put(base+hash(k*3.1+seed)*d,thump(0.1),g*(0.5+0.5*hash(k*7+seed)))
def carrot_crunch(d=0.25):t=tt(d);return norm(hp(nz(d),2500)*(np.floor(t*40)%2)*np.exp(-t*9))
def wheels(d):t=tt(d);return norm(lp(nz(d),300)*(0.6+0.4*np.sin(2*np.pi*6*t))*np.minimum(1,t/0.2)*np.minimum(1,(d-t)/0.3))
def shot(d=0.09):t=tt(d);return norm(bp(nz(d),400,6000)*np.exp(-t*60)+np.sin(2*np.pi*90*t)*np.exp(-t*45)*0.9)
def burst(t0,dur,g=0.5,rate=9.5):
    n=int(dur*rate)
    for k in range(n):put(t0+k/rate+rng.random()*0.01,shot(),g*(0.85+0.15*rng.random()))
def crack(d=0.25):t=tt(d);return norm(bp(nz(d),1500,8000)*np.exp(-t*40)+np.sin(2*np.pi*300*t)*np.exp(-t*30)*0.3)
def ping(f=2400,d=0.4):t=tt(d);ff=f*(1-0.3*t/d);return norm(np.sin(2*np.pi*np.cumsum(ff)/SR)*np.exp(-t*8))
def engine(d,base=55):t=tt(d);f=base+6*np.sin(2*np.pi*0.7*t);x=sum(np.sign(np.sin(2*np.pi*np.cumsum(f*k)/SR))/k for k in (1,2,3));return norm(lp(x,600)*np.minimum(1,t/0.3)*np.minimum(1,(d-t)/0.4))
def drum(d=0.5):t=tt(d);return norm(np.sin(2*np.pi*(70+10*np.sin(2*np.pi*8*t))*t)*np.exp(-t*5)*(0.6+0.4*np.sin(2*np.pi*14*t)))
def scratch(d=0.5):t=tt(d);return norm(bp(nz(d),600,4000)*np.abs(np.sin(2*np.pi*(14-10*t/d)*t))*np.exp(-t*2))
def steps(t0,dur,n,g,seed):
    for k in range(n):put(t0+hash(k*3.1+seed)*dur,thump(0.1),g*(0.5+0.5*hash(k*7+seed)))
def tick(d=0.03):t=tt(d);return norm(np.sin(2*np.pi*2000*t)*np.exp(-t*200))
# --- SFX keyed to the voice ---
def glug(d=0.6):t=tt(d);f=120+60*np.sin(2*np.pi*3*t);return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4)*(0.6+0.4*np.sign(np.sin(2*np.pi*9*t))))
def squelch(d=0.35):t=tt(d);return norm(lp(nz(d),900)*np.exp(-t*10)*(0.5+0.5*np.sin(2*np.pi*14*t)))
def splat(d=0.25):t=tt(d);return norm(lp(nz(d),1500)*np.exp(-t*25)+np.sin(2*np.pi*80*t)*np.exp(-t*30)*0.5)
def creak2(d=1.4):t=tt(d);f=90+40*np.sin(2*np.pi*1.3*t);return norm(bp(np.sin(2*np.pi*np.cumsum(f)/SR)*(0.6+0.4*np.sign(np.sin(2*np.pi*25*t))),100,900)*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.3))


def roar(d):t=tt(d);return norm((lp(nz(d),500,2)*0.9+bp(nz(d),700,3500)*0.5*(0.6+0.4*np.sin(2*np.pi*3.3*t)))*np.minimum(1,t/0.15)*np.minimum(1,(d-t)/0.4))
def jetroar(d):t=tt(d);return norm((lp(nz(d),300,2)+bp(nz(d),200,1200)*0.6)*np.sin(np.pi*t/d)**1.2)
def chop(d,rate=7.5):t=tt(d);env=np.abs(np.sin(np.pi*rate*t))**6;return norm(lp(nz(d),220,2)*env*np.minimum(1,t/0.2)*np.minimum(1,(d-t)/0.3))
def saw(d,f=95):t=tt(d);ff=f*(1+0.06*np.sin(2*np.pi*7*t));x=np.cumsum(ff)/SR;return norm((2*(x%1)-1)*0.6+bp(nz(d),1500,6000)*0.25)*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.1)
def beep(f=880,d=0.18):t=tt(d);return norm(np.sign(np.sin(2*np.pi*f*t))*0.5*np.minimum(1,(d-t)/0.03))
def typer(n,t0,g):
    for k in range(n):put(t0+k*0.07+rng.random()*0.02,tick(0.02),g)
def rewind(d=1.2):t=tt(d);f=900*np.exp(-t*2.2)+80;return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*0.5+bp(nz(d),2000,6000)*0.3)*np.minimum(1,(d-t)/0.2)
def crackT(d=0.6):t=tt(d);return norm(bp(nz(d),600,6000)*np.exp(-t*7)*(np.floor(t*90)%2*0.6+0.4))

def coins(t0,dur,n,g,seed=1,f0=2200):
    for k in range(n):put(t0+hash(k*1.7+seed)*dur,clink(f0+hash(k*3+seed)*1800,0.4),g*(0.4+0.6*hash(k*5+seed)))
def down(d=0.9):t=tt(d);f=900*np.exp(-t*3)+90;return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*1.5)*0.6+bp(nz(d),400,2000)*0.3*np.exp(-t*3))
def bell(f=1400,d=0.5):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,7),(2.7,0.5,10),(5.1,0.25,14)]))
def whisper(d=0.6):t=tt(d);return norm(bp(nz(d),2500,7000)*(0.5+0.5*np.sin(2*np.pi*6*t))*np.sin(np.pi*t/d))
def gasp(d=0.5):t=tt(d);return norm(bp(nz(d),400,2500)*np.sin(np.pi*t/d)**2)
def fire(d):t=tt(d);x=lp(nz(d),900)*0.5;k=rng.random(len(t))<0.0009;x+=np.convolve(k.astype(float),np.exp(-np.arange(400)/40),'same')*hp(nz(d),2000);return norm(x*np.minimum(1,t/0.3)*np.minimum(1,(d-t)/0.3))
def stampS(d=0.4):return slam(d)
# hook: gold rain + shimmer
put(0.05,shimmer(2.2,1500),0.35);coins(0.2,2.6,26,0.22,1)
put(W('cheaper',3.4)-0.05,down(0.9),0.45);put(W('made',2.8)-0.1,whoosh(0.4),0.25)
for k,tt0 in enumerate([LA(1)+0.6,LA(1)+1.6]):put(tt0,pop(700+k*200),0.2)
put(W('1324',9.3)-0.05,boom(1.2,85,35),0.65);put(W('1324',9.3)-0.05,slam(),0.45)
put(LA(3)-0.1,whoosh(0.5,300,2500),0.3);put(W('mali',11.1),chime(523,1.4),0.25);put(W('traveled',13.4),whoosh(1.2,200,1800),0.3);put(W('mecca',13.9),ping(1800),0.3)
put(LA(4)-0.1,whoosh(0.6,250,2200),0.35);put(W('legendary',17.0),shimmer(1.8,1300),0.35)
for k in range(14):put(LA(5)+k*0.42,bell(1300+(k%3)*180,0.4),0.12)
steps(LA(5),6.0,30,0.12,4)
put(LA(6)-0.1,boom(1.4,70,30),0.45);put(LA(6)+0.3,gasp(0.6),0.25)
coins(LA(7),1.8,16,0.25,2)
for t0 in [LA(8)-0.05,W('merchants',30.6)-0.05,W('religious',31.3)-0.05]:put(t0,whoosh(0.3,600,4000),0.3);put(t0+0.35,clink(2600,0.6),0.4)
coins(LA(9),1.7,18,0.22,3)
coins(LA(10),4.0,90,0.18,5);put(LA(10)+1.6,rumble(2.4),0.35);put(W('flooded',36.8),slam(),0.6);put(W('flooded',36.8),boom(1.0,70,30),0.4)
put(LA(11)+0.1,down(1.2),0.5);put(W('less',40.5),thunk(),0.45)
put(LA(12),whisper(0.7),0.35);put(LA(12)+0.8,whisper(0.6),0.3);put(W('rumor',43.8),scratch(0.4),0.4)
put(LA(13)-0.1,page(0.35),0.4)
for k in range(10):put(LA(13)+0.6+k*0.7,scratch(0.5),0.12)
put(W('fallen',49.2),down(1.1),0.4);typer(16,W('remained',51.3),0.18)
put(LA(14)-0.05,boom(1.6,60,28),0.45);put(LA(14),chime(392,1.6),0.2)
put(LA(15)-0.1,drum(0.5),0.6);put(LA(15)+0.5,drum(0.5),0.5);put(LA(15)+1.0,drum(0.5),0.6);put(LA(15),fire(3.4),0.35);put(W('conquer',56.5),ping(3000,0.5),0.3);put(LA(15)+0.2,roar(2.8),0.3)
put(LA(16)-0.1,shimmer(2.0,1200),0.3);steps(LA(16),3.4,12,0.12,7);put(W('richest',60.9),chime(659,1.4),0.22)
coins(LA(17),3.0,60,0.2,8);put(W('value',64.8),down(1.0),0.5)
put(W('conquer',66.8)+0.1,slam(),0.55)
put(LA(19),chime(523,2.2),0.2)
for k in range(10):put(LA(19)+k*0.5,bell(1200+(k%2)*200,0.45),0.1)
# --- music: Sahel + Cairo colour — drone, oud-like plucks in a Hijaz mode, frame-drum pattern; rises for the flood, darkens for the siege ---
hz=lambda m:440*2**((m-69)/12)
def oud(f,d=0.5):t=tt(d);return norm(sum(np.sin(2*np.pi*f*k*t+0.3*np.sin(2*np.pi*f*0.5*t))*np.exp(-t*(5+k*2))/k for k in range(1,7)))
def drone(f,d):t=tt(d);x=sum(np.sin(2*np.pi*f*k*t+0.05*np.sin(2*np.pi*0.3*t))/k**1.6 for k in range(1,8));return lp(x,1400)*np.minimum(1,t/0.6)*np.minimum(1,(d-t)/0.6)
def dum(d=0.35):t=tt(d);return norm(np.sin(2*np.pi*(95*np.exp(-t*12)+55)*t)*np.exp(-t*9))
def tek(d=0.1):t=tt(d);return norm(bp(nz(d),2000,7000)*np.exp(-t*50)+np.sin(2*np.pi*420*t)*np.exp(-t*60)*0.4)
HJ=[50,51,54,55,57,58,60,62]  # D hijaz
def groove(t0,t1,g,bpm=100,dr=True,mel=True,root=50,seed=0):
    beat=60/bpm;t=t0;i=0
    while t<t1-0.05:
        if i%16==0:put(t,drone(hz(root-12),beat*8.2),0.07*g,mus);put(t,drone(hz(root-5),beat*8.2),0.035*g,mus)
        if dr:
            if i%8 in (0,3):put(t,dum(),0.11*g,mus)
            if i%8 in (2,5,6):put(t,tek(),0.05*g,mus)
        if mel and (i%2==0 or hash(i+seed)>0.7):n=HJ[int(abs(np.sin(i*0.7+seed))*8)%8]+(12 if hash(i*3+seed)>0.8 else 0);put(t,oud(hz(n),0.45),0.05*g,mus)
        t+=beat/2;i+=1
groove(0,LA(2),1.0,bpm=104);groove(LA(2),LA(6),0.9,bpm=96,seed=2);groove(LA(6),LA(11),1.15,bpm=112,seed=4);groove(LA(11),LA(14),0.6,bpm=80,dr=False,seed=6)
groove(LA(14),LA(16),0.9,bpm=118,mel=False,root=45,seed=8);groove(LA(16),LA(19),1.0,bpm=104,seed=10);groove(LA(19),END,0.7,bpm=90,dr=False,seed=12)
fadeN=int(1.7*SR);e=int((END-1.75)*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
