import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(21)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=70.6;N=int((END+1)*SR)
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
def punch(f=70):t=T(0.45);return norm(np.sin(2*np.pi*(f+120*np.exp(-t*40))*t)*np.exp(-t*12)+0.8*bp(rng.standard_normal(len(t)),300,4000)*np.exp(-t*45))
def jab():t=T(0.2);return norm(bp(rng.standard_normal(len(t)),400,5000)*np.exp(-t*50)+0.4*np.sin(2*np.pi*140*t)*np.exp(-t*30))
def bell():t=T(2.2);return norm(sum(np.sin(2*np.pi*f*t)*np.exp(-t*k) for f,k in [(880,1.5),(1320,2),(2210,3),(3120,4)]))
def crowdRoar(d=1.6):t=T(d);return norm(bp(rng.standard_normal(len(t)),300,2500)*np.sin(np.pi*t/d)**0.7)
def drum(f=90):t=T(0.35);return norm(np.sin(2*np.pi*(f+60*np.exp(-t*25))*t)*np.exp(-t*10)+0.2*bp(rng.standard_normal(len(t)),200,1500)*np.exp(-t*30))
def zap(d=0.6):t=T(d);return norm(np.sign(np.sin(2*np.pi*(800+600*np.sin(t*40))*t))*np.exp(-t*4)*0.5+bp(rng.standard_normal(len(t)),2000,8000)*np.exp(-t*6))
def powerdown():t=T(1.0);f=600*np.exp(-t*3)+40;return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*1.5))
def thump():t=T(0.6);return norm(lp(rng.standard_normal(len(t)),200)*np.exp(-t*10)+np.sin(2*np.pi*(55+40*np.exp(-t*20))*t)*np.exp(-t*6))
# ---- music: driving fight beat, 120 bpm, minor bass
bpm=120;beat=60/bpm;t=np.arange(N)/SR
bass=[55,55,65.4,49,55,55,73.4,61.7]
for kb in range(int(END/beat)):
    tb=kb*beat
    if tb>END-2.5:continue
    put(tb,pluck(bass[kb%8],0.35),0.9,mus)
    if kb%2==0:put(tb,drum(70),0.5,mus)
    if kb%4==2:put(tb,norm(hp(rng.standard_normal(int(0.12*SR)),1500)*np.exp(-T(0.12)*30)),0.35,mus)
    put(tb+beat/2,norm(hp(rng.standard_normal(int(0.04*SR)),7000)*np.exp(-T(0.04)*90)),0.15,mus)
dr=lp(sum(np.sin(2*np.pi*f*t+rng.random()*6) for f in [55,82.4,110]),500);mus+=norm(dr)*0.2
# music drops out for the impact moments
for a,b in [(27.5,28.9),(52.0,53.0)]:
    i0,i1=int(a*SR),int(b*SR);mus[i0:i1]*=0.08
mus*=np.clip((END-t)/2.0,0,1)
# ---- ambience: arena crowd murmur (quieter in the X-ray sections)
cr=bp(rng.standard_normal(N),250,2200)*(0.7+0.3*np.sin(2*np.pi*t/5.3));env=np.ones(N)
for a,b in [(11.4,22.1),(30.7,52.0)]:env[int(a*SR):int(b*SR)]=0.25
amb+=norm(cr*lp(env,5))*0.35
# ---- SFX
put(0.0,bell(),0.5*G,sfx)
put(0.95,jab(),0.8*G,sfx);put(1.6,whoosh(0.6),0.3*G,sfx);put(2.55,thump(),0.7*G,sfx)
put(3.1,blip(1200),0.4*G,sfx)
for i in range(8):put(4.8+i*0.09,tick(),0.3*G,sfx)
put(wt('nothing',5.3),scratch(),0.5*G,sfx)
put(6.94,crowdRoar(2.0),0.5*G,sfx);put(6.94,bell(),0.35*G,sfx)
put(11.5,whoosh(0.8),0.4*G,sfx);put(wt('floats',14.3),sparkle(1.0),0.3*G,sfx)
for i in range(4):put(16.2+i*0.11,blip(400+i*60),0.25*G,sfx)
put(wt('jaw',18.3),chime(880,0.8),0.4*G,sfx);put(wt('pivot',20.6),blip(700),0.45*G,sfx);put(wt('pivot',20.6)+0.4,whoosh(0.5),0.4*G,sfx)
tH=wt('forehead',22.9)+0.12;put(tH,punch(90),0.8*G,sfx)
put(25.93,whoosh(1.4),0.35*G,sfx)
put(27.55,punch(60),1.0*G,sfx);put(27.6,crowdRoar(1.4),0.4*G,sfx);put(27.55+1.35+0.35,punch(70),0.85*G,sfx);put(29.3,crowdRoar(1.5),0.55*G,sfx)
for i in range(2):put(30.9+i*2.1,whoosh(0.4),0.5*G,sfx)
put(wt('twists',35.9),creak(1.0),0.35*G,sfx)
put(wt('stretches',37.3),creak(1.4),0.3*G,sfx);put(wt('brainstem',41.3),chime(660,1.2),0.45*G,sfx)
put(42.9,blip(900),0.4*G,sfx);put(wt('awake',46.0),chime(1318,0.8),0.35*G,sfx)
put(wt('misfire',48.4),zap(1.4),0.6*G,sfx);put(wt('silent',51.2)-0.3,powerdown(),0.6*G,sfx)
put(52.1,thump(),0.8*G,sfx);put(wt('less',53.3)+0.2,tick(),0.5*G,sfx)
put(55.0,thud(60,0.6),0.6*G,sfx);put(56.0,thump(),0.9*G,sfx);put(56.4,crowdRoar(1.8),0.6*G,sfx)
put(wt('rule',60.6),blip(800),0.45*G,sfx)
put(61.88+0.85,jab(),0.7*G,sfx)
put(63.79+0.9,punch(90),0.8*G,sfx);put(wt('hardest',65.6)+0.45,punch(55),1.0*G,sfx);put(wt('hardest',65.6)+0.5,crowdRoar(1.6),0.6*G,sfx)
put(67.2,sparkle(1.4),0.45*G,sfx);put(68.4,bell(),0.4*G,sfx)
def w(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
w('sfx.wav',norm(sfx)*0.9);w('music.wav',norm(mus)*0.7);w('amb.wav',norm(amb)*0.5);print('ok')
