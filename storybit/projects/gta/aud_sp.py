import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=109.0;N=int((END+1)*SR)
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
# ---- sounds
def beat():t=T(0.5);a=np.sin(2*np.pi*(55+30*np.exp(-t*25))*t)*np.exp(-t*14);b=np.sin(2*np.pi*(50+25*np.exp(-t*25))*t)*np.exp(-np.maximum(0,t-0.16)*14)*(t>0.16);return norm(a+0.8*b)
def sting(d=2.5):
    t=T(d);x=np.zeros_like(t)
    for f in [233,247,349,370,466]:x+=np.sin(2*np.pi*f*t*(1+0.003*np.sin(t*7)))*(0.6+0.4*rng.random())
    x=x*np.minimum(1,t/0.01)*np.exp(-t*1.4)+hp(rng.standard_normal(len(t)),2500)*np.exp(-t*5)*0.4
    return norm(x+0.8*np.sin(2*np.pi*(40+40*np.exp(-t*8))*t)*np.exp(-t*2))
def boom(d=2.0):t=T(d);return norm(np.sin(2*np.pi*(35+60*np.exp(-t*6))*t)*np.exp(-t*1.6)+lp(rng.standard_normal(len(t)),200)*np.exp(-t*3)*0.5)
def whisper(d=1.6):
    t=T(d);n=rng.standard_normal(len(t));env=np.abs(np.sin(2*np.pi*(3+rng.random()*2)*t))**2*np.sin(np.pi*t/d)
    y=sum(bp(n,f,f*1.25) for f in [900,1600,2800])
    return norm(y*env)
def creak(d=1.2):
    t=T(d);f=70+40*np.sin(t*3)+rng.standard_normal(len(t))*4;ph=2*np.pi*np.cumsum(f)/SR;x=np.sign(np.sin(ph))*0.5
    return norm(bp(x,300,2200)*np.sin(np.pi*t/d)**0.7)
def riser(d=2.0):
    t=T(d);n=rng.standard_normal(len(t));out=np.zeros_like(t);bl=2048
    for s in range(0,len(t),bl):p=s/len(t);out[s:s+bl]=bp(n[s:s+bl],200+2000*p,400+5000*p,1)
    return norm(out*(t/d)**2)
def tick():t=T(0.05);return norm(np.sin(2*np.pi*2200*t)*np.exp(-t*110))
def rustle(d=0.6):t=T(d);return norm(bp(rng.standard_normal(len(t)),1500,6000)*np.abs(np.sin(2*np.pi*9*t))*np.sin(np.pi*t/d))
def chime(f,d=1.5):t=T(d);return norm((np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*2.01*t))*np.exp(-t*2.5)*np.minimum(1,t/0.005))
def blip(f=700):t=T(0.12);return norm(np.sin(2*np.pi*f*t)*np.exp(-t*35))
def zap():t=T(0.25);return norm(np.sin(2*np.pi*(1200*np.exp(-t*12)+200)*t)*np.exp(-t*12))
def bird(f=3200):t=T(0.18);fr=f+900*np.sin(2*np.pi*14*t);return norm(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.sin(np.pi*t/0.18))
# ---- music: dark drone pad + slow pulse, swells on reveals, resolves to a soft major at the end
t=np.arange(N)/SR;tE=wt('just',104.4)
dr=np.zeros(N)
for f,a in [(55,1),(55.4,0.8),(82.4,0.5),(110.2,0.3),(116.5,0.25)]:dr+=a*np.sin(2*np.pi*f*t+rng.random()*6)
dr=lp(dr,500)*(0.7+0.3*np.sin(2*np.pi*0.07*t))
shim=lp(hp(rng.standard_normal(N),3000),7000)*0.08*(0.5+0.5*np.sin(2*np.pi*0.11*t))
mus+=norm(dr)*0.55+shim
fade=np.clip((tE-t)/1.5,0,1);mus*=fade
pad=np.zeros(N)
for f in [261.6,329.6,392.0,523.3]:pad+=np.sin(2*np.pi*f*t)
mus+=norm(pad)*0.22*np.clip((t-tE)/1.5,0,1)*np.clip((END-t)/1.5,0,1)
# ---- ambience: room tone + distant wind + clock tick through the night scenes
room=lp(rng.standard_normal(N),300)*0.5+lp(bp(rng.standard_normal(N),200,900),600)*0.3*(0.5+0.5*np.sin(2*np.pi*0.05*t+1))
amb+=norm(room)*0.35*fade
for s in np.arange(0.2,tE,1.0):put(s,tick(),0.10,amb)
# ---- SFX
tS=wt('standing');put(tS-0.1,sting(),0.9*G,sfx);put(tS+0.2,whisper(),0.35*G,sfx)
put(wt('give',7.7)-0.2,boom(),0.7*G,sfx)
put(wt('try',12.0),whisper(1.2),0.25*G,sfx)
put(wt('nothing',15.5),boom(1.5),0.6*G,sfx)
# heartbeat: from "Then you feel it" through the weight, speeding up
hb0=wt('then',20.7);hb1=wt('this',27.3);s=hb0;r=0.95
while s<hb1:put(s,beat(),0.75*G,sfx);r=max(0.42,r*0.93);s+=r
put(wt('a',22.3)-0.3,sting(2.8),0.95*G,sfx)
put(wt('pressing',22.5),creak(),0.45*G,sfx);put(wt('harder',25.6),creak(0.8),0.55*G,sfx);put(wt('harder',25.6),boom(1.2),0.55*G,sfx)
put(wt('this',27.3),whisper(2.0),0.3*G,sfx)
for i in range(8):put(wt('8',29.9)+0.05+i*0.06,blip(900+i*40),0.25*G,sfx)
put(wt("here's",32.9),zap(),0.4*G,sfx);put(wt('switches',33.5),zap(),0.4*G,sfx);put(wt('punch',36.5),boom(0.6),0.5*G,sfx)
put(wt('but',39.9),riser(1.4),0.35*G,sfx)
put(wt('leaks',48.5),whisper(2.2),0.4*G,sfx)
for i in range(4):put(wt('scans',54.0)+i*0.55,blip(520),0.3*G,sfx)
put(wt('builds',59.0)-1.6,riser(1.8),0.45*G,sfx);put(wt('face',63),sting(),0.95*G,sfx);put(wt('face',63)+0.3,whisper(),0.35*G,sfx)
put(wt('something',70.1)-0.2,sting(2.5),0.85*G,sfx);put(wt('something',70.1),creak(),0.45*G,sfx)
for k in ['for','in','in','in']:pass
put(wt('for',72.6),rustle(),0.5*G,sfx);put(wt('in',75.2),rustle(),0.45*G,sfx);put(wt('in',77.9),rustle(),0.45*G,sfx);put(wt('in',80.1),boom(1.4),0.45*G,sfx)
put(wt('it',85.6),tick(),0.4*G,sfx)
put(wt('can',89.7),chime(523),0.4*G,sfx)
put(wt('stress',91.3),blip(400),0.35*G,sfx);put(wt('too',92.0),blip(450),0.35*G,sfx);put(wt('sleeping',93.0),blip(500),0.35*G,sfx)
put(wt('one',99.0),blip(800),0.35*G,sfx);put(wt('toe',100.5),blip(900),0.35*G,sfx)
put(wt('no',102.2),whisper(1.8),0.3*G,sfx)
for i,f in enumerate([3200,3600,2900,3400]):put(tE+0.6+i*0.35,bird(f),0.18*G,sfx)
def w(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
w('sfx.wav',norm(sfx)*0.9);w('music.wav',norm(mus)*0.8);w('amb.wav',norm(amb)*0.6)
print('ok',hb0,hb1,tE)
