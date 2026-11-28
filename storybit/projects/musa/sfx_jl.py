import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=122.17;N=int(END*SR)+SR
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
def heli(d):t=tt(d);return norm(lp(nz(d),400)*(0.5+0.5*np.sign(np.sin(2*np.pi*11*t)))*np.minimum(1,t/0.4)*np.minimum(1,(d-t)/0.4))
def tvstatic(d=0.3):t=tt(d);return norm(bp(nz(d),2000,8000)*np.exp(-t*6))
def typew(d=0.06):t=tt(d);return norm(bp(nz(d),2000,6000)*np.exp(-t*80))
def siren(d):t=tt(d);f=700+250*np.sign(np.sin(2*np.pi*1.4*t));return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*0.6*np.minimum(1,t/0.2)*np.minimum(1,(d-t)/0.3))
put(0.0,tvstatic(0.4),0.4);put(0.05,heli(LA(2)-0.2),0.35)
put(LA(2),scratch(0.6),0.5);put(LA(2)+0.1,crack(0.4),0.4)
put(LA(3)+0.4,pop(600),0.3)
for k in range(3):put(LA(4)+0.6+k*0.9,blip(900,0.1),0.2)
put(LA(5),page(0.3),0.35);put(LA(6)+0.2,whoosh(0.8,400,2000),0.25)
burst(LA(7)+0.1,2.0,0.35);put(LA(7)+0.2,boom(1.2,70,30),0.5)
put(LA(8),chime(392,2.2),0.2);put(LA(9),boom(0.8,60,30),0.4);put(LA(9)+0.4,clink(1800,0.3),0.2)
put(LA(10),thunk(0.4),0.35)
put(LA(11),heli(2.6),0.45);burst(LA(11)+0.8,0.6,0.2);put(LA(12),heli(3.3),0.35)
put(LA(13),page(0.4),0.3);put(LA(14),chime(784,1.4),0.3)
for k in range(4):put(LA(15)+k*0.5,typew(),0.25)
put(LA(17),boom(1.0,80,35),0.4);burst(LA(17)+0.1,0.8,0.25)
for k in range(4):put(LA(18)+k*0.22,whoosh(0.35,800,3000),0.2)
put(W('movie',52.5)+0.4,slam(),0.5);put(LA(19),chime(523,1.6),0.25)
put(LA(20),scratch(0.6),0.6)
put(LA(21)+0.3,thunk(0.2),0.4);put(LA(22)+0.1,clink(2200,0.2),0.4);put(LA(22)+0.25,slam(),0.5)
put(LA(23)+0.3,blip(300,0.25),0.35);put(LA(24)+0.3,blip(300,0.25),0.35)
put(LA(25)+0.6,boom(1.0,80,35),0.5);put(LA(25)+0.6,crack(0.3),0.4)
put(LA(26)+0.2,blip(500,0.2),0.25);put(LA(27),whoosh(1.0,1500,300,False),0.2)
put(W('ambulance',78),siren(2.0),0.25);burst(LA(29)+0.3,0.8,0.3)
put(LA(30),slam(),0.6);put(LA(31)+0.4,chime(330,1.5),0.2)
put(LA(32),tvstatic(0.4),0.3)
for k in range(10):put(LA(33)+k*0.12,typew(),0.2)
put(LA(35),chime(659,1.6),0.2);put(LA(37),chime(392,2.4),0.2)
put(LA(39),page(0.3),0.3);put(LA(41)+0.4,thunk(0.3),0.3);put(LA(42)+0.1,chime(784,1.6),0.25);put(LA(43),chime(523,2.6),0.2)
# --- music: cheeky military march ---
BPM=84;beat=60/BPM;hz=lambda m:440*2**((m-69)/12)
def pizz(f,d=0.35):t=tt(d);return norm(sum(np.sin(2*np.pi*f*k*t)/k**1.5 for k in range(1,6))*np.exp(-t*9))
def fife(f,d):t=tt(d);x=np.sin(2*np.pi*f*t+0.15*np.sin(2*np.pi*6*t))+0.2*np.sin(2*np.pi*2*f*t);return x*np.minimum(1,t/0.02)*np.minimum(1,(d-t)/0.05)
def snare(d=0.15):t=tt(d);return norm(bp(nz(d),1500,8000)*np.exp(-t*30)+np.sin(2*np.pi*200*t)*np.exp(-t*40)*0.4)
def kick(d=0.25):t=tt(d);return norm(np.sin(2*np.pi*(120*np.exp(-t*20)+45)*t)*np.exp(-t*12))
prog=[[45,52,57],[41,48,57],[43,50,55],[40,47,55]]
mel=[69,71,72,74,72,71,69,64, 65,69,72,69,65,64,62,60, 64,65,67,69,71,72,71,67, 69,67,65,64,62,64,65,64]
def march(t0,t1,g=1.0,melody=True,drums=True):
    t=t0;i=0
    while t<t1-0.05:
        b=i%4;ch=prog[(i//4)%4]
        put(t,pizz(hz(ch[0]-12 if b%2==0 else ch[1]-12)),0.14*g,mus)
        if b in (1,3):put(t,pizz(hz(ch[2]),0.25),0.05*g,mus)
        if drums:
            if b==0:put(t,kick(),0.15*g,mus)
            put(t+beat/2,snare(0.08),0.04*g,mus)
            if b in (1,3):put(t,snare(),0.09*g,mus)
        if melody:
            for h in range(2):put(t+h*beat/2,fife(hz(mel[(i*2+h)%len(mel)]+12),beat/2*0.9),0.035*g,mus)
        t+=beat;i+=1
march(0.0,LA(3),0.7,melody=False);march(LA(3),LA(7),0.6,drums=False);march(LA(7),LA(13),0.9,melody=False);march(LA(13),LA(20),1.0);march(LA(20),LA(34),0.8,melody=False);march(LA(34),END,0.6,drums=False)
fadeN=int(1.7*SR);e=int((END-1.75)*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
