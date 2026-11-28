import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=107.69;N=int(END*SR)+SR
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
# --- SFX keyed to the voice ---
put(0.0,drum(),0.5);put(0.3,drum(),0.4);put(W('defeated',2.0),slam(),0.5);put(W('kings',2.5),clink(2200),0.3)
put(W('europe',4.3)-0.4,whoosh(0.8,300,2500),0.35)
put(LA(1),boom(1.4,80,30),0.5);put(W('retreat',6.5),whoosh(0.6,1500,300,False),0.3)
put(W('thousand',8.2),pop(500),0.35);crowd(2.0,W('rabbits',8.5),40,0.1,1)
put(W('60',9.5)-0.04,slam(),0.9)
put(W('bullied',11.0),squeak(),0.35);put(W('fluffy',12.0),pop(900),0.3)
put(LA(4),boom(1.0,90,40),0.4);put(W('1807',20.0),chime(784,1.0),0.25)
put(W('diplomatic',22.2),shimmer(1.2,900),0.25);put(23.4,pat(),0.2);put(23.8,pat(),0.2);put(W('berthier',26.0),pop(450,0.2),0.35)
put(W('special',28.5),chime(1046,0.8),0.3)
put(W('rabbit',30.0),pop(700),0.4);put(W('hunt',30.6),slam(),0.35)
for k in range(12):put(LA(7)+0.4+k*0.18,thunk(0.2),0.18)
put(W('1000',33.5),chime(1318,0.6),0.25)
put(W('simple',36.2),pop(600),0.25);put(W('mistake',39.5),glitch(0.5),0.45);put(W('mistake',39.5),boom(0.8,70,35),0.35)
put(W('domesticated',41.0),pop(800),0.3);put(W('wild',42.8),blip(500,0.2),0.35)
for k in range(4):put(W('opened',45.5)+k*0.08,creak(0.5),0.2)
put(W('run',47.0),whoosh(0.6,400,3000),0.3)
put(LA(12),scratch(0.5),0.45);put(W('opposite',49.3),boom(1.0,80,35),0.45)
put(LA(13),rumble(2.6),0.4);crowd(3.0,LA(13),70,0.12,2)
put(LA(14)-0.1,blip(1200,0.12),0.3);put(LA(14)+0.1,chime(880,0.6),0.25)
put(W('fed',57.0),carrot_crunch(),0.3);put(W('fed',57.0)+0.3,carrot_crunch(),0.25)
put(W('lunch',65.5),chime(1568,0.5),0.3);put(W('lunch',65.5)+0.1,pop(1000),0.3)
for k in range(10):put(LA(18)+0.2+k*0.28,swish(),0.18)
crowd(3.0,LA(19),50,0.1,3);crowd(5.0,LA(20),80,0.1,4);put(LA(20)+0.5,squeak(0.25,1400),0.25)
put(LA(21),boom(1.2,70,30),0.5);put(LA(21)+0.2,shimmer(1.0,500),0.2)
put(LA(22)-0.43,slam(),0.8);put(LA(22)-0.45,thunk(),0.5);put(LA(21)+1.3,thunk(0.2),0.25);put(LA(21)+1.7,thunk(0.2),0.25);put(LA(22),blip(400,0.3),0.2);put(W('retreating',83.0)-0.2,wheels(3.2),0.35);crowd(3.0,W('retreating',83.0),50,0.1,5)
put(LA(23),scratch(0.6),0.6)
for k in range(5):put(LA(24)+0.6+k*0.4,page(0.3),0.2)
put(W('decades',91.5),whoosh(0.8,2000,300,False),0.3)
put(W('confirm',94.0),pop(500,0.2),0.3)
put(LA(26),boom(1.0,70,30),0.35)
for w,n in [('britain',100.5),('russia',101.2),('austria',102.0)]:put(W(w,n),thump(0.15),0.4)
put(W('lunch',103.8),slam(),0.7);put(W('lunch',103.8)+0.05,chime(1046,1.6),0.35);put(104.6,carrot_crunch(),0.3);put(105.2,carrot_crunch(),0.25)
# --- music: cheeky military march (snare, pizzicato bass, fife melody), playful ---
BPM=112;beat=60/BPM;hz=lambda m:440*2**((m-69)/12)
def pizz(f,d=0.35):t=tt(d);return norm(sum(np.sin(2*np.pi*f*k*t)/k**1.5 for k in range(1,6))*np.exp(-t*9))
def fife(f,d):t=tt(d);x=np.sin(2*np.pi*f*t+0.15*np.sin(2*np.pi*6*t))+0.2*np.sin(2*np.pi*2*f*t);return x*np.minimum(1,t/0.02)*np.minimum(1,(d-t)/0.05)
def snare(d=0.15):t=tt(d);return norm(bp(nz(d),1500,8000)*np.exp(-t*30)+np.sin(2*np.pi*200*t)*np.exp(-t*40)*0.4)
def kick(d=0.25):t=tt(d);return norm(np.sin(2*np.pi*(120*np.exp(-t*20)+45)*t)*np.exp(-t*12))
prog=[[48,55,64],[43,55,62],[45,52,60],[41,53,60]]
mel=[67,69,71,72,71,69,67,64, 65,67,69,67,65,64,62,59, 64,65,67,69,67,65,64,60, 62,64,65,64,62,60,59,55]
def march(t0,t1,g=1.0,melody=True,drums=True):
    t=t0;i=0
    while t<t1-0.05:
        b=i%4;bar=i//4;ch=prog[bar%4]
        put(t,pizz(hz(ch[0]-12 if b%2==0 else ch[1]-12)),0.14*g,mus)
        if b in (1,3):put(t,pizz(hz(ch[2]),0.25),0.05*g,mus)
        if drums:
            if b==0:put(t,kick(),0.15*g,mus)
            put(t+beat/2,snare(0.08),0.04*g,mus)
            if b in (1,3):put(t,snare(),0.09*g,mus)
        if melody:
            for h in range(2):
                n=mel[(i*2+h)%len(mel)];put(t+h*beat/2,fife(hz(n+12),beat/2*0.9),0.035*g,mus)
        t+=beat;i+=1
march(0.0,9.6,0.9,melody=False)
march(9.6,48.0,1.0)
march(48.0,55.5,1.2)
march(55.5,77.7,1.0)
march(77.7,86.6,1.15)
march(86.6,98.4,0.7,drums=False)
march(98.4,107.69,1.0)
fadeN=int(1.7*SR);e=int(105.99*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
