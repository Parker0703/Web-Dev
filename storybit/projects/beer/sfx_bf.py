import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=72.5;N=int(END*SR)+SR
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
def glug(d=0.6):t=tt(d);f=120+60*np.sin(2*np.pi*3*t);return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4)*(0.6+0.4*np.sign(np.sin(2*np.pi*9*t))))
def squelch(d=0.35):t=tt(d);return norm(lp(nz(d),900)*np.exp(-t*10)*(0.5+0.5*np.sin(2*np.pi*14*t)))
def splat(d=0.25):t=tt(d);return norm(lp(nz(d),1500)*np.exp(-t*25)+np.sin(2*np.pi*80*t)*np.exp(-t*30)*0.5)
def creak2(d=1.4):t=tt(d);f=90+40*np.sin(2*np.pi*1.3*t);return norm(bp(np.sin(2*np.pi*np.cumsum(f)/SR)*(0.6+0.4*np.sign(np.sin(2*np.pi*25*t))),100,900)*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.3))

def roar(d):t=tt(d);return norm((lp(nz(d),500,2)*0.9+bp(nz(d),700,3500)*0.5*(0.6+0.4*np.sin(2*np.pi*3.3*t)))*np.minimum(1,t/0.15)*np.minimum(1,(d-t)/0.4))
def pourS(d):t=tt(d);return norm(bp(nz(d),400,2600)*(0.7+0.3*np.sin(2*np.pi*7*t))*np.minimum(1,t/0.2)*np.minimum(1,(d-t)/0.3))
def bell(f=220,d=3.0):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,1.2),(2.0,0.5,1.8),(2.76,0.35,2.4),(5.4,0.15,4)]))
def gavel(d=0.3):t=tt(d);return norm(np.sin(2*np.pi*(260*np.exp(-t*20)+120)*t)*np.exp(-t*25)+lp(nz(d),2500)*np.exp(-t*60)*0.5)
def metal(d=1.2):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*t)*np.exp(-t*k) for f,g,k in [(420,1,3),(1130,0.6,5),(2210,0.4,8),(3460,0.2,12)])+hp(nz(d),3000)*np.exp(-t*80)*0.6)
# opening: roar over the roofs, curtains splash down
put(0.0,boom(1.6,60,28),0.6);put(0.0,roar(1.6),0.55);put(0.8,pourS(0.8),0.4);put(1.1,splash(0.7),0.5)
put(LA(1),roar(4.1),0.7)
for k in range(9):put(LA(1)+0.2+k*0.42,splash(0.5),0.3)
for k in range(4):put(LA(1)+0.6+k*0.8,thunk(0.3),0.25)
put(LA(2),bell(196,2.0),0.35)
put(LA(3),whoosh(0.8,300,1500),0.2);put(LA(3)+0.6,wheels(1.6),0.25)
put(LA(4),creak2(1.6),0.4);put(W('twenty-two',11.8)-0.1,pop(700),0.3)
for k in range(10):put(W('held',13.4)+k*0.2,thump(0.1),0.25)
put(W('three',14.0),chime(660,1.0),0.15)
put(LA(5),creak2(2.4),0.45);put(LA(5)+0.5,metal(0.8),0.12)
put(LA(6),slam(),0.4)
put(W('snapped',21.6)-0.08,crack(0.3),0.8);put(W('snapped',21.6)-0.05,metal(1.4),0.6);put(W('snapped',21.6)+0.45,clink(900,0.6),0.4);put(W('snapped',21.6)+0.7,clink(700,0.5),0.3)
for k in range(5):put(LA(8)+0.2+k*0.25,scratch(0.25),0.12)
for k in range(12):put(LA(9)+k*0.08,tick(),0.3)
put(W('exploded',26.9)-0.6,creak2(0.6),0.5);put(W('exploded',26.9)-0.05,boom(1.8,55,22),1.0);put(W('exploded',26.9),crack(0.3),0.7);put(W('exploded',26.9)+0.1,roar(1.4),0.7)
put(W('smashed',28.9)-0.05,boom(1.4,65,28),0.85);put(W('smashed',28.9),crack(0.3),0.6);put(W('smashed',28.9)+0.1,roar(1.8),0.6)
put(W('another',31.1)-0.1,boom(1.2,70,30),0.8);put(W('another',31.1),crack(0.25),0.5)
put(LA(12),creak2(1.6),0.5)
for k in range(5):put(LA(12)+0.3+k*0.25,squelch(0.3),0.3)
put(W('burst',33.9)-0.05,boom(1.6,55,25),0.9);put(W('burst',33.9),roar(2.2),0.75)
for k in range(10):put(W('burst',33.9)+0.1+k*0.1,thunk(0.2),0.3)
put(LA(13),roar(3.1),0.7)
for k in range(6):put(LA(13)+0.2+k*0.45,splash(0.5),0.3)
put(LA(14),roar(2.3),0.35)
put(W('crushed',41.6)-0.1,boom(1.2,70,30),0.7)
for k in range(12):put(W('crushed',41.6)+k*0.09,thunk(0.2),0.35)
put(W('flooded',42.7),pourS(3.0),0.5);for_=None
put(LA(16),bell(147,2.5),0.2)
put(LA(18),pourS(1.9),0.6);put(LA(18)+0.4,glug(1.2),0.4)
for k in range(6):put(LA(19)+k*0.45,scratch(0.4),0.25)
put(LA(20),blip(400,0.25),0.2);put(LA(21),thunk(0.3),0.3);put(W('accident',59.4),gavel(),0.8)
put(LA(23),pop(500,0.2),0.3)
for k in range(10):put(W('gave',62.4)+0.3+k*0.12,clink(2400+k*90,0.3),0.25)
put(LA(25),bell(196,2.0),0.3)
for k in range(14):put(W('refund',68.45)+k*0.09,clink(2600+k*70,0.3),0.25)
put(W('refund',68.45),gavel(),0.5)
# --- music: tense Georgian strings (low drone + pulsing ostinato), somber at the wake, sly pizzicato at the end ---
hz=lambda m:440*2**((m-69)/12)
def string(f,d):t=tt(d);x=sum(np.sin(2*np.pi*f*k*t+0.08*np.sin(2*np.pi*5.5*t))/k**1.3 for k in range(1,7));return lp(x,2200)*np.minimum(1,t/0.25)*np.minimum(1,(d-t)/0.3)
def pizz(f,d=0.35):t=tt(d);return norm(sum(np.sin(2*np.pi*f*k*t)/k**1.5 for k in range(1,6))*np.exp(-t*9))
def kick(d=0.25):t=tt(d);return norm(np.sin(2*np.pi*(120*np.exp(-t*20)+45)*t)*np.exp(-t*12))
prog=[[50,57,62],[46,53,58],[48,55,60],[45,52,57]]
def pulse(t0,t1,g,bpm=112,drive=True):
    beat=60/bpm;t=t0;i=0
    while t<t1-0.05:
        ch=prog[(i//8)%4]
        if i%8==0:put(t,string(hz(ch[0]-12),beat*8),0.06*g,mus);put(t,string(hz(ch[2]),beat*8),0.03*g,mus)
        put(t,pizz(hz(ch[(i%3)]),0.2),0.05*g,mus)
        if drive and i%4==0:put(t,kick(),0.09*g,mus)
        t+=beat/2;i+=1
pulse(0,LA(3),1.1);pulse(LA(3),LA(9),0.7,drive=False);pulse(LA(9),LA(16),1.2);pulse(LA(16),LA(20),0.5,drive=False);pulse(LA(20),LA(25),0.7,bpm=96,drive=False);pulse(LA(25),END,0.6,bpm=96,drive=False)
fadeN=int(1.7*SR);e=int((END-1.75)*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/(np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
