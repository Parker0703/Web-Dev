import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=108.6;N=int((END+1)*SR)
bus=np.zeros(N);mus=np.zeros(N);amb=np.zeros(N)
def lp(x,f,o=2):b,a=sg.butter(o,f/(SR/2));return sg.lfilter(b,a,x)
def hp(x,f,o=2):b,a=sg.butter(o,f/(SR/2),'high');return sg.lfilter(b,a,x)
def bp(x,lo,hi,o=2):b,a=sg.butter(o,[lo/(SR/2),hi/(SR/2)],'band');return sg.lfilter(b,a,x)
def nz(d):return rng.standard_normal(int(d*SR))
def norm(x):return x/(np.max(np.abs(x))+1e-9)
def put(t,x,g=1.0,tgt=None):
    tgt=bus if tgt is None else tgt;i=int(t*SR)
    if i<0:x=x[-i:];i=0
    n=min(len(x),len(tgt)-i)
    if n>0:tgt[i:i+n]+=x[:n]*g
T=lambda d:np.arange(int(d*SR))/SR
def pluck(f,d=1.2,b=1.0):t=T(d);return (np.sin(2*np.pi*f*t)+0.35*np.sin(4*np.pi*f*t)+0.12*np.sin(6*np.pi*f*t)*b)*np.exp(-t*4.5)*np.minimum(1,t/0.003)
def bell(f,d=1.6):t=T(d);return (np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*3)+0.25*np.sin(2*np.pi*f*5.4*t)*np.exp(-t*6))*np.exp(-t*2.6)*np.minimum(1,t/0.002)
def pad(f,d):t=T(d);x=sum(np.sin(2*np.pi*f*k*t+rng.random()*6)/k**1.4 for k in (1,2,3))+0.5*np.sin(2*np.pi*f*1.006*t);e=np.minimum(1,t/0.8)*np.minimum(1,(d-t)/0.8);return lp(x,1400)*e
def whoosh(d=0.4,lo=400,hi=3500):n=int(d*SR);x=nz(d);out=np.zeros(n);bl=1024
    # (filled below)
def whoosh(d=0.4,lo=400,hi=3500):
    n=int(d*SR);x=nz(d);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):
        p=s/n;f=lo*(hi/lo)**p;seg=x[s:s+bl];out[s:s+len(seg)]=bp(seg,max(80,f*0.6),min(f*1.4,20000),1)
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def pop(f=900,d=0.12):t=T(d);return norm(np.sin(2*np.pi*(f+f*1.5*np.exp(-t*60))*t)*np.exp(-t*40))
def sparkle(d=0.9):
    x=np.zeros(int(d*SR))
    for i in range(10):
        b=bell(2000+rng.random()*2500,0.4)*0.4;o=int(rng.random()*(d-0.4)*SR);x[o:o+len(b)]+=b
    return norm(x)
def thud(d=0.35):t=T(d);return norm(np.sin(2*np.pi*(55+90*np.exp(-t*25))*t)*np.exp(-t*12)+lp(nz(d),900)*np.exp(-t*30)*0.6)
def boing(d=0.6):t=T(d);f=180+120*np.sin(t*40)*np.exp(-t*5);return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4))
def snore(d=1.4):t=T(d);x=lp(nz(d),300)*(0.5+0.5*np.sin(2*np.pi*28*t))*np.sin(np.pi*t/d)**2;return norm(x)
def drip():t=T(0.25);return norm(np.sin(2*np.pi*(700+900*t*4)*t)*np.exp(-t*25))
def shiver(d=0.8):t=T(d);return norm(bp(nz(d),2000,6000)*(0.5+0.5*np.sin(2*np.pi*22*t))*np.sin(np.pi*t/d))
def sniff(d=0.35):t=T(d);return norm(bp(nz(d),1500,5000)*np.sin(np.pi*t/d)**2)
def ding():return norm(bell(1318,1.4)+bell(1975,1.4)*0.5)
def stamp():t=T(0.4);return norm(np.sin(2*np.pi*(70+60*np.exp(-t*30))*t)*np.exp(-t*10)+hp(nz(0.4),2500)*np.exp(-t*50)*0.4)
def sting():x=np.zeros(int(1.6*SR))
def eerie(d=1.6):t=T(d);return norm(sum(np.sin(2*np.pi*f*t+np.sin(t*5)*2) for f in (311,466,622))*np.sin(np.pi*t/d))# ---- music: tense score — low drone, pulse, ticking clock, heartbeat that speeds up
def drone(f,d):t=T(d);x=np.sin(2*np.pi*f*t)+0.6*np.sin(2*np.pi*f*1.5*t+np.sin(t*0.7))+0.3*np.sin(2*np.pi*f*2.01*t);return lp(x,700)*np.minimum(1,t/2)*np.minimum(1,(d-t)/2)
put(0,drone(55,END+0.5),0.18,mus);put(0,drone(82.4,END+0.5),0.07,mus)
for k in np.arange(0,END,1.0):put(k,pop(2600,0.03),0.05,mus)
def hb():t=T(0.5);x=np.zeros(len(t))
def hbeat():
    t=T(0.55);x=np.sin(2*np.pi*50*t)*np.exp(-t*18);x2=np.sin(2*np.pi*46*np.clip(t-0.18,0,None))*np.exp(-np.clip(t-0.18,0,None)*18)*(t>0.18);return norm(x+0.7*x2)
tt=0.0
while tt<END:
    tension=1.0 if 58<tt<76 or tt>100 else 0.6 if tt>38 else 0.35
    put(tt,hbeat(),0.35*tension,mus);bpm=60+40*(1 if 58<tt<76 else 0)+20*(tt>100);tt+=60/bpm
fi=np.minimum(1,np.arange(N)/SR/1.5);fo=np.clip((END+0.3-np.arange(N)/SR)/1.5,0,1);mus*=fi*fo
amb+=lp(rng.standard_normal(N),180)*0.02;amb+=bp(rng.standard_normal(N),110,130)*0.01  # fluorescent hum
# ---- SFX
def zap(d=0.45):t=T(d);x=np.sign(np.sin(2*np.pi*(120+40*np.sin(t*90))*t))*0.6+bp(nz(d),1500,6000)*0.8;return norm(x*np.exp(-t*5)*np.minimum(1,t/0.005))
def click():t=T(0.06);return norm(hp(nz(0.06),1500)*np.exp(-t*120)+np.sin(2*np.pi*1800*t)*np.exp(-t*90))
def bang():t=T(0.4);return norm(lp(nz(0.4),500)*np.exp(-t*20)+np.sin(2*np.pi*70*t)*np.exp(-t*14))
def riser(d=1.5):t=T(d);return norm(bp(nz(d),300,4000)*(t/d)**2)
def boom(d=1.6):t=T(d);return norm(np.sin(2*np.pi*(40+60*np.exp(-t*8))*t)*np.exp(-t*2.5)+lp(nz(d),300)*np.exp(-t*6)*0.5)
cuts=[wt('and',5.6),wt('many',7.9),wt('give'),wt('in',16),wt('he',22.2),wt('participants',30),wt('whenever'),wt('but',48),wt('the',49.7),wt('as',58.2),wt('the',65.5),wt('but',71.4),wt('and',76.1),wt('out',78.7),wt('the',89),wt('but',93),wt('and',101.4)]
for c in cuts:put(c-0.15,whoosh(0.3),0.16)
put(wt('shocks')-0.1,click(),0.5);put(wt('shocks'),zap(),0.4)
put(wt('begged')-0.1,bang(),0.3)
for w in ['kept','going']:put(wt(w,8)-0.05,click(),0.5);put(wt(w,8),zap(0.3),0.3)
put(wt('60')-0.05,stamp(),0.5);put(wt('disturbing')-0.1,boom(),0.45)
for i in range(29):put(wt('give')+0.2+i*0.19,click(),0.12)
put(wt('milgram',17)-0.1,ding(),0.2);put(wt('authority',26)-0.1,stamp(),0.3)
put(wt('teacher',35)-0.1,pop(700),0.35);put(wt('learner',37)-0.1,pop(800),0.35)
put(wt('incorrectly'),pop(300,0.2),0.4);put(wt('shock',43),zap(),0.45);put(wt('mistake'),click(),0.4);put(wt('increased',46.5),click(),0.4);put(wt('increased',46.5)+0.35,click(),0.4)
put(wt('catch')-0.2,eerie(1.4),0.3)
put(wt('actor'),stamp(),0.45);put(wt('fake'),stamp(),0.45);put(wt('no',53),pop(500),0.3);put(wt('know',56)-0.3,eerie(1.2),0.2)
for i in range(6):put(58.3+i*0.95,click(),0.45);put(58.35+i*0.95,zap(0.25),0.22)
for i in range(3):put(wt('demanding')+i*0.35,bang(),0.35)
put(wt('stopped')-0.1,riser(0.4)[::-1],0.2)
put(wt('protested')-0.1,bang(),0.3);put(wt('calmly')-0.05,stamp(),0.3)
put(wt('and',76.1),riser(1.3),0.35);put(wt('result')-0.05,boom(),0.6)
for i in range(26):put(wt('26')+i*0.03,pop(900+i*20,0.06),0.08)
put(wt('450')-0.05,zap(0.6),0.5);put(wt('65')-0.08,boom(),0.6)
put(wt("didn't",89)-0.2,bang(),0.25)
for i in range(3):put(wt('under')+0.1+i*0.3,pop(600+i*150),0.3)
put(wt('further',99),riser(1.2),0.3)
put(wt('frightening')-0.2,eerie(2.0),0.25);put(wt('persuaded')-0.02,click(),0.6);put(wt('persuaded'),zap(0.8),0.55);put(wt('persuaded')+0.05,boom(),0.5)

def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',bus*0.9);wr('music.wav',norm(mus)*0.5);wr('amb.wav',amb)
print('ok')
