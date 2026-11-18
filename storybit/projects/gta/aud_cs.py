import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(21)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=115.4;N=int((END+1)*SR)
sfx=np.zeros(N);mus=np.zeros(N);amb=np.zeros(N)
T=lambda d:np.arange(int(d*SR))/SR
def norm(x):return x/(np.max(np.abs(x))+1e-9)
def put(t,x,g,tg):
    i=int(t*SR);n=min(len(x),len(tg)-i)
    if n>0 and i>=0:tg[i:i+n]+=x[:n]*g
def bp(x,lo,hi,o=2):b,a=sg.butter(o,[lo/(SR/2),hi/(SR/2)],'band');return sg.lfilter(b,a,x)
def lp(x,f):b,a=sg.butter(2,f/(SR/2));return sg.lfilter(b,a,x)
def hp(x,f):b,a=sg.butter(2,f/(SR/2),'high');return sg.lfilter(b,a,x)
G=0.8
def chime(f,d=1.2):t=T(d);return norm((np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*2.01*t))*np.exp(-t*3)*np.minimum(1,t/0.004))
def sparkle(d=0.9):
    x=np.zeros(int(d*SR))
    for i in range(10):c=chime(2000+rng.random()*3000,0.4);o=int(rng.random()*(d-0.4)*SR);x[o:o+len(c)]+=c*0.4
    return norm(x)
def whoosh(d=0.45):
    n=int(d*SR);x=rng.standard_normal(n);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):p=s/n;f=300*(10**p);out[s:s+bl]=bp(x[s:s+bl],max(80,f*0.6),min(f*1.6,18000),1)
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def thud(f=70,d=0.5):t=T(d);return norm(np.sin(2*np.pi*(f+90*np.exp(-t*30))*t)*np.exp(-t*9)+0.3*lp(rng.standard_normal(len(t)),400)*np.exp(-t*20))
def clank(d=0.9):t=T(d);x=sum(np.sin(2*np.pi*f*t)*np.exp(-t*k) for f,k in [(310,5),(737,7),(1210,9),(1830,12)]);return norm(x+0.4*hp(rng.standard_normal(len(t)),3000)*np.exp(-t*40))
def chomp():t=T(0.25);return norm(bp(rng.standard_normal(len(t)),300,3000)*np.exp(-t*18)*(1+np.sin(2*np.pi*30*t)))
def tick():t=T(0.04);return norm(np.sin(2*np.pi*2400*t)*np.exp(-t*110))
def blip(f=900):t=T(0.1);return norm(np.sin(2*np.pi*f*t)*np.exp(-t*30))
def flash():t=T(0.35);return norm(hp(rng.standard_normal(len(t)),2000)*np.exp(-t*25)+0.5*np.sin(2*np.pi*(3000-2000*t)*t)*np.exp(-t*10))
def creak(d=1.6):t=T(d);f=60+30*np.sin(t*2)+rng.standard_normal(len(t))*3;ph=2*np.pi*np.cumsum(f)/SR;return norm(bp(np.sign(np.sin(ph)),200,1800)*np.sin(np.pi*t/d)**0.6)
def rumble(d=2.0):t=T(d);return norm(lp(rng.standard_normal(len(t)),120)*np.sin(np.pi*t/d))
def scratch():t=T(0.5);f=800+600*np.sin(2*np.pi*3*t);return norm(bp(rng.standard_normal(len(t)),300,3000)*np.abs(np.sin(2*np.pi*6*t))+0.4*np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-t*2)
def siren(d=1.6):t=T(d);f=700+250*np.sign(np.sin(2*np.pi*1.5*t));return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/d))
def flick():t=T(0.3);return norm(hp(rng.standard_normal(len(t)),2500)*np.exp(-t*40)+0.5*bp(rng.standard_normal(len(t)),500,2000)*np.exp(-np.maximum(0,t-0.08)*6)*(t>0.08))
def engine(d=1.8):t=T(d);f=50+40*t/d;return norm((np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*0.4+lp(rng.standard_normal(len(t)),300))*np.minimum(1,t/0.2)*np.minimum(1,(d-t)/0.5))
def paper():t=T(0.3);return norm(bp(rng.standard_normal(len(t)),2000,7000)*np.abs(np.sin(2*np.pi*14*t))*np.exp(-t*6))
def gasp():t=T(0.5);return norm(bp(rng.standard_normal(len(t)),600,2500)*np.sin(np.pi*t/0.5))
def sting():t=T(1.8);x=sum(np.sin(2*np.pi*f*t) for f in [196,233,277,330]);return norm(x*np.exp(-t*2)+0.6*np.sin(2*np.pi*(45+50*np.exp(-t*8))*t)*np.exp(-t*2.5))
def whistle(t0,notes):
    for i,f in enumerate(notes):t=T(0.24);put(t0+i*0.26,norm(np.sin(2*np.pi*f*t*(1+0.01*np.sin(t*30)))*np.sin(np.pi*t/0.24)),0.25*G,sfx)
# ---- music: sneaky heist groove (walking bass + muted pizzicato + hi-hat), key of D minor, 100 bpm
bpm=100;beat=60/bpm;t=np.arange(N)/SR
def pluck(f,d=0.22):tt=T(d);return np.sin(2*np.pi*f*tt)*np.exp(-tt*16)+0.3*np.sin(2*np.pi*2*f*tt)*np.exp(-tt*24)
def gong(f=110,d=3.0):t=T(d);x=sum(np.sin(2*np.pi*f*m*t+np.sin(2*np.pi*f*0.5*t)*m)*np.exp(-t*k) for m,k in [(1,0.9),(1.47,1.4),(2.09,2),(2.76,2.6),(3.9,3.5)]);return norm(x*np.minimum(1,t/0.01))
def cannon():t=T(1.2);return norm(lp(rng.standard_normal(len(t)),300)*np.exp(-t*4)+np.sin(2*np.pi*(40+80*np.exp(-t*20))*t)*np.exp(-t*3))
def splash():t=T(0.8);return norm(bp(rng.standard_normal(len(t)),400,5000)*np.exp(-t*5)*np.minimum(1,t/0.02))
def drum(f=90):t=T(0.35);return norm(np.sin(2*np.pi*(f+60*np.exp(-t*25))*t)*np.exp(-t*10)+0.2*bp(rng.standard_normal(len(t)),200,1500)*np.exp(-t*30))
def coins(n=12,d=0.7):
    x=np.zeros(int(d*SR))
    for i in range(n):c=chime(2500+rng.random()*2500,0.15);o=int(rng.random()*(d-0.15)*SR);x[o:o+len(c)]+=c*0.5
    return norm(x)
def step():t=T(0.12);return norm(lp(rng.standard_normal(len(t)),900)*np.exp(-t*40))
def cloth():t=T(0.4);return norm(bp(rng.standard_normal(len(t)),1500,6000)*np.sin(np.pi*t/0.4))
# ---- music: pentatonic (D major pentatonic) plucked melody over a drone + frame drum pulse, 84 bpm
bpm=84;beat=60/bpm;t=np.arange(N)/SR
scale=[293.7,329.6,370.0,440.0,493.9,587.3,659.3]
mel=[0,2,3,4,3,2,0,1, 2,4,5,4,3,2,1,0]
for kb in range(int(END/beat)):
    tb=kb*beat
    if tb>END-2.5:continue
    put(tb,pluck(scale[mel[kb%16]],0.5),0.32,mus)
    if kb%2==0:put(tb,pluck(scale[mel[kb%16]]/2,0.7),0.25,mus)
    if kb%4==0:put(tb,drum(80),0.35,mus)
    if kb%4==2:put(tb,drum(110),0.2,mus)
dr=lp(sum(np.sin(2*np.pi*f*t+rng.random()*6) for f in [73.4,110,146.8]),500);mus+=norm(dr)*0.22
for a,b in [(wt('peace',87.3)-0.1,wt('and',88.3))]:
    i0,i1=int(a*SR),int(b*SR);mus[i0:i1]*=0.1
mus*=np.clip((END-t)/2.0,0,1)
# ---- ambience: sea wash
wash=lp(rng.standard_normal(N),500)*(0.6+0.4*np.sin(2*np.pi*t/6.5));amb+=norm(wash)*0.3
# ---- SFX
put(0.05,gong(98,3),0.6*G,sfx);put(wt('navy',2.0),whoosh(0.5),0.5*G,sfx)
put(wt('woman',3.9),sparkle(0.9),0.45*G,sfx)
for i in range(3):put(wt('beat',5.2)+i*0.22,cannon(),0.5*G,sfx)
put(wt('offer',6.6)+0.2,paper(),0.5*G,sfx);put(wt('offer',6.6)+0.9,thud(90,0.3),0.3*G,sfx)
put(wt('everything',9.2),coins(16,0.9),0.5*G,sfx);put(wt('everything',9.2),sting(),0.45*G,sfx)
put(wt('powerful',15.6),gong(130,2.5),0.4*G,sfx)
put(wt('canton',17.5),whoosh(0.6),0.4*G,sfx);put(wt('1801',18.8),drum(70),0.5*G,sfx)
put(wt('eye',22.4),sparkle(0.8),0.4*G,sfx)
put(wt('marry',26.6),chime(1318,1.0),0.45*G,sfx);put(wt('condition',29.4),blip(800),0.4*G,sfx)
put(wt('half',30.5),whoosh(0.5),0.5*G,sfx);put(wt('half',30.5)+0.4,coins(10,0.6),0.4*G,sfx);put(wt('share',33.0),whoosh(0.4),0.4*G,sfx)
put(wt('red',35.4),gong(110,2.5),0.45*G,sfx)
for i in range(6):put(wt('hundreds',37.1)+i*0.3,splash(),0.25*G,sfx)
put(wt('thousand',39.4),sting(),0.45*G,sfx)
put(wt('dies',41.6),gong(73,3.5),0.5*G,sfx)
for i in range(5):put(wt('tear',44.7)+i*0.18,thud(140,0.15),0.3*G,sfx)
for i in range(2):put(wt('instead',46.4)+0.1+i*0.3,step(),0.4*G,sfx)
put(wt('takes',47.3),gong(98,2.5),0.55*G,sfx)
put(wt('code',49.8),paper(),0.5*G,sfx)
for w,a in [('beheaded',51.9),('death',54.3),('ears',57.4)]:put(wt(w,a),thud(70,0.5),0.6*G,sfx);put(wt(w,a),whoosh(0.3),0.4*G,sfx)
put(wt('1,800',59.5),drum(70),0.5*G,sfx);put(wt('80,000',62.0),drum(70),0.5*G,sfx)
put(wt('raids',65.0),whoosh(0.5),0.5*G,sfx)
for i in range(4):put(wt('raids',65.0)+0.2+i*0.25,step(),0.35*G,sfx)
put(wt('protection',67.9),coins(6,0.5),0.45*G,sfx)
put(wt('british',69.8),whoosh(0.6),0.4*G,sfx);put(wt('safe',70.6),cannon(),0.4*G,sfx)
for i in range(3):put(wt('fleet',72.4)+i*0.5,drum(90),0.35*G,sfx)
for i in range(3):put(wt('beats',74.4)+i*0.2,cannon(),0.5*G,sfx)
for i in range(3):put(wt('switch',77.6)+i*0.25,flick(),0.35*G,sfx)
for i in range(2):put(wt('portuguese',80.4)+0.2+i*0.12,cloth(),0.3*G,sfx)
put(wt('british',81.4)+0.6,cloth(),0.3*G,sfx)
put(wt('work',83.4),thud(60,0.6),0.5*G,sfx)
put(wt('1810',84.5),drum(70),0.5*G,sfx);put(wt('peace',87.3),chime(880,1.5),0.5*G,sfx)
put(wt('messenger',89.5),scratch(),0.5*G,sfx)
for i in range(8):put(wt('walks',90.9)+i*0.38,step(),0.3*G,sfx)
put(wt('unarmed',92.8),blip(700),0.4*G,sfx)
for w,a in [('pardoned',97.5),('loot',98.6),('husband',99.3)]:put(wt(w,a),blip(900),0.45*G,sfx);put(wt(w,a)+0.3,chime(1046,0.6),0.35*G,sfx)
put(wt('china',102.9)+0.38,thud(80,0.4),0.8*G,sfx);put(wt('yes',103.6),chime(1318,1.2),0.5*G,sfx)
put(wt('rich',105.0),coins(14,0.8),0.5*G,sfx);put(wt('69',107.6),sparkle(1.0),0.5*G,sfx)
put(wt('bed',109.7),chime(659,2.0),0.3*G,sfx)
put(wt('most',110.8),gong(98,3.0),0.5*G,sfx);put(wt('caught',113.2),sting(),0.6*G,sfx)
def w(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
w('sfx.wav',norm(sfx)*0.9);w('music.wav',norm(mus)*0.7);w('amb.wav',norm(amb)*0.5);print('ok')
