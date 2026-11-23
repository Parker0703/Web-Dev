import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=71.0;N=int(END*SR)+SR
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
def creak(d=0.8):t=tt(d);f=120+60*np.sin(2*np.pi*3*t);return norm(bp(np.sin(2*np.pi*np.cumsum(f)/SR)*(0.6+0.4*np.sign(np.sin(2*np.pi*35*t))),150,900)*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.2))
def page(d=0.35):t=tt(d);return norm(bp(nz(d),1500,7000)*np.exp(-t*12)*(1-np.exp(-t*120)))
def bleat(d=0.7):t=tt(d);f=420+40*np.sin(2*np.pi*7*t);x=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,6))*(0.7+0.3*np.sin(2*np.pi*22*t));return norm(lp(x,2500)*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.25))
def scrape(d=0.4):t=tt(d);return norm(bp(nz(d),800,3500)*(0.5+0.5*np.abs(np.sin(2*np.pi*6*t)))*np.minimum(1,(d-t)/0.1))
def scanner(d=1.0):t=tt(d);return norm(np.sin(2*np.pi*(600+400*t)*t)*0.4*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.2)+bp(nz(d),2000,6000)*0.1)
put(0.0,boom(1.4,90,32),0.7);put(0.35,creak(0.8),0.35);put(0.9,page(),0.4)
put(W('virus',2.1),shimmer(1.4,900),0.35);put(W('book',4.5),chime(660,1.2),0.2)
put(W('60',5.6)-0.04,slam(),0.9);put(LA(1)+0.4,whoosh(0.8,300,2000),0.2)
put(LA(2),page(),0.3)
for k in range(6):put(LA(2)+0.3+k*0.22,scrape(0.12),0.1)
put(LA(3)+0.3,whoosh(0.7,200,1200),0.25)
put(LA(4)+0.2,thunk(),0.35)
for w,n in [('britain',16.3),('france',16.8),('austria',17.5)]:put(W(w,n),pop(600),0.35)
put(LA(5),scanner(1.4),0.25)
put(W('spots',20.8),chime(1318,0.8),0.25);put(W('damage',21.8),chime(1568,0.8),0.25)
put(LA(7),whoosh(0.6,400,3000),0.3);put(W('different',24.4),glitch(0.5),0.4);put(W('different',24.4),blip(900,0.15),0.3)
put(LA(8),boom(1.2,70,30),0.55);put(W('sheeppox',26.7),shimmer(1.2,700),0.3)
put(LA(9)+0.2,bleat(),0.3);put(LA(9)+1.0,bleat(0.6),0.2)
put(LA(10)+0.2,pop(450),0.3);put(W('human',32.4),chime(1046,0.9),0.3)
put(W('book',35.1)-0.1,pop(380,0.2),0.4)
put(LA(12)+0.4,bleat(0.9),0.18)
put(W('landed',38.9),shimmer(1.2,1100),0.25)
put(LA(14)+0.05,pop(500),0.25)
put(LA(15),boom(1.4,80,30),0.6);put(LA(15),whoosh(0.9,150,1500),0.25)
for k in range(8):put(LA(16)+0.2+k*0.3,pop(700+k*60),0.15)
put(W('3500',49.8)-0.5,whoosh(1.0,2000,300,False),0.3);put(W('years',50.9),chime(784,1.0),0.25)
for k in range(5):put(LA(18)+0.1+k*0.32,scrape(0.25),0.3)
put(W('teeth',54.0),shimmer(1.4,1000),0.3)
put(LA(19)+0.2,pop(380,0.2),0.35)
put(W('animal',60.4)-0.4,whoosh(0.8,300,2500),0.3);put(W('animal',60.4),chime(523,1.6),0.3)
for k in range(6):put(LA(21)+k*0.18,page(0.3),0.25)
put(LA(22)+0.4,chime(392,2.2),0.25)
# ---------------- music: mysterious candle-lit strings + music box, warm resolve at the end ----------------
BPM=72;beat=60/BPM
def bowed(f,d):t=tt(d);x=sum(np.sin(2*np.pi*f*k*t+0.2*np.sin(2*np.pi*5*t))/k**1.3 for k in range(1,6));return lp(x,1800)*np.minimum(1,t/0.4)*np.minimum(1,(d-t)/0.5)
def mbox(f,d=1.4):t=tt(d);return (np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*3.01*t))*np.exp(-t*3.5)
hz=lambda m:440*2**((m-69)/12)
dark=[[50,57,62],[46,53,58],[48,55,60],[45,52,57]]
warm=[[50,57,62,66],[43,50,55,59],[48,55,60,64],[45,52,57,61]]
def section(t0,t1,prog,g=1.0,box=True,low=True):
    bar=4*beat;t=t0;i=0
    while t<t1-0.2:
        ch=prog[i%len(prog)];d=min(bar,t1-t)
        for m in ch:put(t,bowed(hz(m),d+0.4),0.035*g,mus)
        if low:put(t,bowed(hz(ch[0]-12),d+0.4),0.06*g,mus)
        if box:
            for k in range(8):
                tk=t+k*beat/2
                if tk<t1-0.05 and hash(i*8+k)>0.3:put(tk,mbox(hz(ch[[0,2,1,2,0,1,2,1][k]]+24)),0.05*g,mus)
        t+=bar;i+=1
def hash(n):
    s=np.sin(n*127.1+311.7)*43758.5453;return s-np.floor(s)
section(0.0,5.3,dark,0.9,box=False)
section(5.3,25.9,dark,1.0)
section(25.9,43.6,dark,1.0)
section(43.6,58.9,dark,1.1)
section(58.9,71.0,warm,1.0)
fadeN=int(1.8*SR);e=int(69.1*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
