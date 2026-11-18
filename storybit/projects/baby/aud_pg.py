import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(5)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=73.6;N=int((END+1)*SR)
sfx=np.zeros(N);vox=np.zeros(N);mus=np.zeros(N)
T=lambda d:np.arange(int(d*SR))/SR
def norm(x):return x/(np.max(np.abs(x))+1e-9)
def put(t,x,g,tg):
    i=int(t*SR);n=min(len(x),len(tg)-i)
    if n>0 and i>=0:tg[i:i+n]+=x[:n]*g
def bp(x,lo,hi,o=2):b,a=sg.butter(o,[lo/(SR/2),hi/(SR/2)],'band');return sg.lfilter(b,a,x)
def lp(x,f):b,a=sg.butter(2,f/(SR/2));return sg.lfilter(b,a,x)
# ---------- cartoon voice: harmonic glottal source + vowel formants, pitch glide + vibrato wobble ----------
VOW={'a':(800,1250,2600),'e':(450,2000,2700),'i':(320,2400,3000),'o':(500,850,2500),'u':(350,700,2300),'m':(280,1100,2400)}
def reson(x,f,bw):r=np.exp(-np.pi*bw/SR);th=2*np.pi*f/SR;b=[1-r];a=[1,-2*r*np.cos(th),r*r];return sg.lfilter(b,a,x)
def syl(d,f0a,f0b,v='a',vib=7.5,vd=0.05,br=0.05,att=0.015,rel=0.08):
    t=T(d);u=t/d;f=f0a*(f0b/f0a)**u;f=f*(1+vd*np.sin(2*np.pi*vib*t)*np.minimum(1,t/0.06))
    ph=2*np.pi*np.cumsum(f)/SR;src=np.zeros_like(t)
    for k in range(1,26):
        m=(k*f<9000);src+=m*np.sin(k*ph)/k**1.1
    src+=rng.standard_normal(len(t))*br
    F=VOW[v];y=sum(reson(src,F[i],80+40*i)*(1.0,0.7,0.35)[i] for i in range(3))
    if v=='m':y=lp(y,900)
    env=np.minimum(1,t/att)*np.minimum(1,(d-t)/rel)*(1+0.18*np.sin(2*np.pi*vib*t+1))
    return norm(y*env)
def say(t,parts,g=0.5,pitch=1.0,gap=0.03):
    for p in parts:
        d,a,b,v=p[:4];kw=p[4] if len(p)>4 else {}
        put(t,syl(d,a*pitch,b*pitch,v,**kw),g,vox);t+=d+gap
    return t
# character voices (pitch multipliers)
HERO,PAL,SCI,BRAIN=1.0,0.82,1.35,1.75
def laugh(t,n=5,g=0.5,pitch=HERO,rate=0.13,hi=1.0):
    for i in range(n):
        f=(330+40*np.sin(i*1.7))*hi;put(t+i*rate,syl(rate*0.8,f*pitch,f*pitch*0.78,'a',vib=9,vd=0.04,br=0.12,rel=0.04),g*(1-0.04*i),vox)
def giggle(t,n=4,pitch=PAL,g=0.4):
    for i in range(n):put(t+i*0.11,syl(0.08,(300+30*(i%2))*pitch,260*pitch,'i',vib=10,vd=0.03,br=0.1,rel=0.03),g,vox)
# ---------- SFX (20% quieter than before) ----------
def whoosh(d=0.35):
    n=int(d*SR);x=rng.standard_normal(n);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):
        p=s/n;f=400*(8**p);out[s:s+bl]=bp(x[s:s+bl],max(80,f*0.6),min(f*1.5,18000),1)
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def chime(f,d=1.2):t=T(d);return norm((np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*2*t)*np.exp(-t*4))*np.exp(-t*2.2)*np.minimum(1,t/0.004))
def pop(f=800,d=0.1):t=T(d);return norm(np.sin(2*np.pi*(f+f*1.4*np.exp(-t*60))*t)*np.exp(-t*38))
def boing(d=0.5):t=T(d);fr=200+140*np.sin(t*38)*np.exp(-t*5);return norm(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*4))
def bonk():t=T(0.3);return norm(np.sin(2*np.pi*(140+300*np.exp(-t*30))*t)*np.exp(-t*14)+0.4*bp(rng.standard_normal(len(t)),800,3000)*np.exp(-t*40))
def servo(d=0.6):t=T(d);return norm(np.sign(np.sin(2*np.pi*(90+30*np.sin(t*12))*t))*0.3*np.sin(np.pi*t/d)+bp(rng.standard_normal(len(t)),1500,4000)*0.15*np.sin(np.pi*t/d))
def tick():t=T(0.04);return norm(np.sin(2*np.pi*2600*t)*np.exp(-t*120))
def stampS():t=T(0.3);return norm(np.sin(2*np.pi*(90+80*np.exp(-t*30))*t)*np.exp(-t*12))
def sparkle(d=0.8):
    x=np.zeros(int(d*SR))
    for i in range(8):c=chime(1800+rng.random()*2400,0.4);o=int(rng.random()*(d-0.4)*SR);x[o:o+len(c)]+=c*0.4
    return norm(x)
def wobbleS(d=0.7):t=T(d);fr=500+200*np.sin(t*20);return norm(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*2.5))
G=0.8
def wobbleS(d=0.6):t=T(d);fr=500+200*np.sin(t*40);return norm(np.sin(2*np.pi*np.cumsum(fr*np.exp(-t*1.5))/SR)*np.exp(-t*3))
def boom(d=2.0,f=48):t=T(d);return norm((np.sin(2*np.pi*f*t*(1+0.3*np.exp(-t*8)))+0.3*bp(rng.standard_normal(len(t)),40,200))*np.exp(-t*2.2)*np.minimum(1,t/0.005))
def taiko(f=70):t=T(0.8);return norm((np.sin(2*np.pi*(f+60*np.exp(-t*25))*t)+0.25*bp(rng.standard_normal(len(t)),100,900)*np.exp(-t*30))*np.exp(-t*6))
def crumple(d=0.5):t=T(d);x=bp(rng.standard_normal(len(t)),1500,7000)*(rng.random(len(t))>0.97);x=lp(x,6000)+bp(rng.standard_normal(len(t)),2000,6000)*0.15;return norm(x*np.sin(np.pi*t/d))
def flutter(d=1.5):t=T(d);return norm(bp(rng.standard_normal(len(t)),800,4000)*(0.5+0.5*np.sin(2*np.pi*14*t))*np.sin(np.pi*t/d))
def step():t=T(0.12);return norm(bp(rng.standard_normal(len(t)),200,1800)*np.exp(-t*40))
def shing():t=T(1.2);return norm((np.sin(2*np.pi*2900*t)+0.6*np.sin(2*np.pi*4370*t)+0.3*bp(rng.standard_normal(len(t)),4000,9000)*np.exp(-t*20))*np.exp(-t*3))
def click():t=T(0.08);return norm(bp(rng.standard_normal(len(t)),2000,6000)*np.exp(-t*80)+np.sin(2*np.pi*1800*t)*np.exp(-t*90))
def heart():x=np.zeros(int(0.8*SR));put0=lambda o:None
def beat():t=T(0.25);return norm(np.sin(2*np.pi*(55+30*np.exp(-t*30))*t)*np.exp(-t*14))
def droneP(d,f=55):t=T(d);return norm((np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*1.5*t)+0.3*np.sin(2*np.pi*f*2.01*t))*np.minimum(1,t/1.5)*np.minimum(1,(d-t)/1.5))
def rainA(d):t=T(d);return norm(lp(bp(rng.standard_normal(len(t)),400,8000),5000)*np.minimum(1,t/0.5)*np.minimum(1,(d-t)/0.5))
def insects(d):t=T(d);x=np.sin(2*np.pi*4200*t)*(0.5+0.5*np.sign(np.sin(2*np.pi*22*t)))*(0.6+0.4*np.sin(2*np.pi*0.3*t));return norm(x*np.minimum(1,t/0.5)*np.minimum(1,(d-t)/0.5))
def bird(f=2600):t=T(0.35);return norm(np.sin(2*np.pi*np.cumsum(f+900*np.sin(2*np.pi*9*t))/SR)*np.sin(np.pi*t/0.35)**2)
def crackle(d):x=np.zeros(int(d*SR))
for_crackle=None
def fire(d):n=int(d*SR);x=lp(rng.standard_normal(n),900)*0.3;pops=(rng.random(n)>0.9992).astype(float);x+=bp(np.convolve(pops,np.exp(-np.arange(300)/40),'same')*rng.standard_normal(n),1500,6000);return norm(x)
def planeS(d=1.6):t=T(d);return norm((np.sign(np.sin(2*np.pi*95*t))*0.3+bp(rng.standard_normal(len(t)),200,1200))*np.sin(np.pi*t/d))
def waves(d):t=T(d);return norm(lp(rng.standard_normal(len(t)),700)*(0.5+0.5*np.sin(2*np.pi*0.18*t)**2))

amb=np.zeros(N)
def hoof(f=1.0):t=T(0.09);return norm(bp(rng.standard_normal(len(t)),300*f,1600*f)*np.exp(-t*60)+np.sin(2*np.pi*120*f*t)*np.exp(-t*50)*0.6)
def creak(d=0.5):t=T(d);fr=180+60*np.sin(t*9);return norm(np.sign(np.sin(2*np.pi*np.cumsum(fr)/SR))*0.25*np.sin(np.pi*t/d)*(rng.random(len(t))>0.4))
def moo():t=T(1.1);f=110*(1-0.2*t);return norm(syl(1.1,110,85,'o',vib=4,vd=0.02,br=0.2)*0.8)
def clink():t=T(0.5);return norm((np.sin(2*np.pi*1800*t)+0.6*np.sin(2*np.pi*2730*t)+0.3*np.sin(2*np.pi*4100*t))*np.exp(-t*9))
def scratch(d=0.3):t=T(d);return norm(bp(rng.standard_normal(len(t)),2000,7000)*np.sin(np.pi*t/d)*(0.6+0.4*np.sin(2*np.pi*40*t)))
def hum(d):t=T(d);return norm((np.sin(2*np.pi*60*t)+0.3*np.sin(2*np.pi*120*t))*np.minimum(1,t/0.3)*np.minimum(1,(d-t)/0.3))
def sweep(d=0.8):t=T(d);return norm(np.sin(2*np.pi*np.cumsum(400+1600*t/d)/SR)*np.sin(np.pi*t/d)*0.6+bp(rng.standard_normal(len(t)),2000,6000)*0.2*np.sin(np.pi*t/d))
def wind(d):t=T(d);return norm(lp(bp(rng.standard_normal(len(t)),150,1200),900)*(0.6+0.4*np.sin(2*np.pi*0.2*t))*np.minimum(1,t/0.8)*np.minimum(1,(d-t)/0.8))
def thud():t=T(0.4);return norm(np.sin(2*np.pi*(60+50*np.exp(-t*30))*t)*np.exp(-t*10)+0.3*bp(rng.standard_normal(len(t)),100,600)*np.exp(-t*25))
cut=lambda w,a=0:wt(w,a)
cuts=[cut('but',3.5),cut('give'),cut('vermont'),cut('phineas'),cut("he's",18.8),cut('one',23.4),cut('the',24.7),cut('minutes'),cut('when',35),cut('he',40),cut('the',42.8),cut('his',48.4),cut('the',51.4),cut('but',56.3),cut('scientists'),cut('today')]
for c0 in cuts:put(c0-0.15,whoosh(0.4),0.12*G,sfx)
# hook: rod whoosh + skull thud, then low boom on "died"
for k in range(3):put(0.05+k*0.14,clink(),0.12*G,sfx)
put(0.36,shing(),0.2*G,sfx);put(0.5,boom(3.0,40),0.65*G,sfx);put(0.5,crumple(0.6),0.3*G,sfx)
put(1.2,whoosh(0.9),0.3*G,sfx);put(1.55,thud(),0.45*G,sfx);put(1.62,crumple(0.4),0.3*G,sfx);put(1.9,boom(1.6,60),0.25*G,sfx)
put(2.2,whoosh(0.6),0.2*G,sfx);put(2.85,thud(),0.5*G,sfx);put(2.87,crumple(0.3),0.2*G,sfx)
put(cut('died')-0.05,taiko(55),0.45*G,sfx);put(cut('60')-0.05,stampS(),0.4*G,sfx);put(cut('took')-0.1,whoosh(0.5),0.2*G,sfx);put(cut('took')+0.1,crumple(0.4),0.2*G,sfx)
# railroad: wind, picks, birds
a,b=cut('vermont'),cut('one',23.4)
put(a-0.2,wind(b-a+0.4),0.18,amb)
for k in range(int((b-a)/1.1)):put(a+0.3+k*1.1,clink(),0.07*G,sfx)
for k in range(4):put(a+1+k*2.3,bird(2400+300*(k%2)),0.06,amb)
put(cut('1848')-0.05,pop(900,0.08),0.2*G,sfx)
for w in ['careful','polite','trusts']:put(cut(w,15)-0.05,pop(1100,0.07),0.15*G,sfx)
put(cut('packing')+0.1,scratch(0.6),0.15*G,sfx)
for k in range(4):put(cut('rock',20)+k*0.35,clink(),0.12*G,sfx)
# one spark: tiny tick, silence, BOOM
put(cut('spark')-0.05,shing(),0.2*G,sfx);put(cut('spark')+0.25,boom(3.0,40),0.6*G,sfx)
# x-ray: scan sweep, rod whoosh, impact hits on cheek / eye / skull
put(cut('the',24.7)-0.05,sweep(0.9),0.15*G,sfx);put(cut('the',24.7),hum(cut('minutes')-cut('the',24.7)),0.08,amb)
put(cut('rockets')-0.2,whoosh(0.7),0.3*G,sfx)
for w in ['cheek','eye','skull']:put(cut(w,25)-0.05,thud(),0.35*G,sfx)
put(cut('skull',25)-0.02,crumple(0.4),0.25*G,sfx)
# ox cart: hooves slow + wooden creak + moo
a,b=cut('minutes'),cut('when',35)
put(a,wind(b-a),0.12,amb)
for k in range(int((b-a)/0.55)):put(a+0.2+k*0.55,hoof(0.8),0.1*G,sfx)
put(a+0.1,creak(b-a-0.2),0.06*G,sfx);put(cut('ox')-0.1,moo(),0.18*G,sfx)
# doctor at the inn: door, footsteps, comedic pop on "business"
for k in range(5):put(cut('when',35)+0.1+k*0.32,step(),0.15*G,sfx)
put(cut("here's",37)-0.05,pop(700,0.1),0.2*G,sfx);put(cut('business')-0.05,boing(0.5),0.15*G,sfx)
# something's off: low drone hit
put(cut('off',41)-0.1,boom(2.2,38),0.35*G,sfx)
put(cut('gone')-0.05,taiko(65),0.3*G,sfx)
for w in ['rude','impatient','swearing']:put(cut(w)-0.05,bonk(),0.18*G,sfx)
for k in range(6):put(cut('swearing')+0.1+k*0.16,pop(500+k*90,0.06),0.12*G,sfx)
put(cut('no',48.4)-0.05,taiko(70),0.3*G,sfx)
# frontal lobe: wet tear + brake
put(cut('torn')-0.05,crumple(0.5),0.3*G,sfx);put(cut('frontal')-0.05,thud(),0.25*G,sfx);put(cut('check')-0.05,stampS(),0.35*G,sfx)
# twist: chime, stagecoach gallop through Andes wind
put(cut('twist')-0.05,chime(523,1.6),0.15*G,sfx);put(cut('twist')+0.05,chime(659,1.6),0.12*G,sfx)
a,b=cut('years',57),cut('scientists')
put(a-0.2,wind(b-a+0.4),0.22,amb)
for k in range(int((b-a)/0.13)):put(a+k*0.13,hoof(1.0+0.15*(k%4==0)),0.09*G,sfx)
put(a,creak(b-a),0.05*G,sfx)
# adapt: sparkles as pathways light
for k in range(5):put(cut('scientists')+0.4+k*0.5,sparkle(0.6),0.1*G,sfx)
put(cut('adapt')-0.05,chime(784,1.8),0.15*G,sfx)
# museum: room tone, single footsteps, low bell
put(cut('today')-0.1,hum(END-cut('today')),0.06,amb);put(cut('today')-0.05,chime(196,3.0),0.15*G,sfx)
for k in range(3):put(cut('today')+0.3+k*0.6,step(),0.08*G,sfx)
put(cut('harvard')-0.05,chime(262,2.5),0.12*G,sfx);put(cut('one',68)-0.05,boom(3.0,40),0.3*G,sfx)
# ---------- score: low drone + slow piano, 1848 feel; builds through the middle ----------
def piano(f,d=2.2):t=T(d);return (np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2*t)*np.exp(-t*3)+0.15*np.sin(2*np.pi*f*3*t)*np.exp(-t*5))*np.exp(-t*1.6)*np.minimum(1,t/0.004)
put(0,droneP(END,55),0.25,mus);put(0,droneP(END,73.4),0.1,mus)
mot=[220,261.6,329.6,293.7,246.9,220,196,246.9];bt=60/76;t=0.6;i=0
sp=cut('spark')
while t<END-1:
    if not (sp-0.3<t<sp+1.4):
        f=mot[i%8]*(0.5 if (i//8)%2 else 1);put(t,piano(f),0.15 if t<cut('but',56.3) else 0.2,mus)
        if i%4==0:put(t,piano(f/2,3),0.1,mus)
    t+=bt;i+=1
fo=np.clip((END-np.arange(N)/SR)/1.6,0,1);mus*=fo;amb*=fo
def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',sfx);wr('music.wav',norm(mus)*0.5);wr('amb.wav',norm(amb)*0.35);print('ok')
