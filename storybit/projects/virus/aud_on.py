import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(5)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=73.2;N=int((END+1)*SR)
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
cut=lambda w,a=0:wt(w,a)
cuts=[cut('give',7),cut('1944'),cut('never',19.5),cut('a',24.3),cut('leaflets'),cut('onoda',30),cut('so',33),cut('raiding'),cut('locals'),cut('one',40),cut("he's",44),cut('then',45),cut('he',52),cut('but',53.4),cut('so',56.4),cut('commander',57.5),cut('onoda',62),cut('his',64.8),cut('29',67)]
for c0 in cuts:put(c0-0.15,whoosh(0.4),0.12*G,sfx)
# hook: deep boom on 29, ticking year roll, paper flutter
put(0.0,boom(3.0,42),0.45*G,sfx);put(cut('29')-0.05,taiko(60),0.5*G,sfx)
for k in range(12):put(cut('29')+k*0.13,tick(),0.12*G,sfx)
put(cut('every')-0.1,flutter(2.0),0.15*G,sfx)
put(cut('60')-0.05,stampS(),0.4*G,sfx);put(cut('trapped')-0.05,taiko(80),0.35*G,sfx);put(cut('29',11.5)-0.05,taiko(60),0.4*G,sfx)
# beach: waves + footsteps on sand
put(cut('1944')-0.2,waves(6.2),0.25,amb)
for k in range(9):put(cut('1944')+0.4+k*0.6,step(),0.12*G,sfx)
# orders: three hits
for w,a in [('never',19.5),('never',20.8),('hold',22)]:put(cut(w,a)-0.05,taiko(70),0.4*G,sfx)
put(cut('japan')-0.1,boom(2.0,40),0.35*G,sfx)
put(cut('leaflets')-0.2,flutter(3.4),0.25*G,sfx);put(cut('trick')-0.1,crumple(0.5),0.4*G,sfx);put(cut('trick')+0.35,whoosh(0.3),0.15*G,sfx)
# jungle day ambience under 1944-1945 jungle shots
for a,b in [(cut('never',19.5),cut('a',24.3)),(cut('leaflets'),cut('so',33)),(cut('commander',57.5),cut('29',67)+6)]:
    put(a,insects(b-a),0.05,amb)
    for k in range(int((b-a)/1.3)):put(a+0.4+k*1.3,bird(2200+400*(k%3)),0.06,amb)
# rain: fighting / hiding / alone
put(cut('so',33)-0.2,rainA(cut('raiding')-cut('so',33)+0.4),0.28,amb);put(cut("he's",44)-0.2,rainA(1.6),0.25,amb)
put(cut('so',33),click(),0.35*G,sfx)
for k in range(6):put(cut('raiding')+k*0.24,step(),0.1*G,sfx)
# cost: heartbeat, slow
for k in range(4):put(cut('locals')+0.2+k*0.75,beat(),0.3*G,sfx)
for w in ['one','die','give']:put(cut(w,40)+0.2,chime(392,1.4),0.1*G,sfx)
put(cut('1972'),chime(262,2.0),0.15*G,sfx)
# camp: fire crackle; panda/yeti pops; he finds him: hit + click
put(cut('then',45)-0.1,fire(cut('so',56.4)-cut('then',45)+0.2),0.22,amb)
for w in ['panda','yeti']:put(cut(w)-0.08,pop(800,0.1),0.25*G,sfx)
put(cut('onoda',51)-0.08,pop(600,0.1),0.25*G,sfx);put(cut('he',52)-0.05,taiko(55),0.5*G,sfx);put(cut('he',52)+0.05,click(),0.4*G,sfx)
put(cut('not',55)-0.05,taiko(75),0.3*G,sfx)
put(cut('so',56.4)-0.1,planeS(1.6),0.3*G,sfx)
put(cut('relieved')-0.1,chime(523,2.5),0.18*G,sfx);put(cut('relieved')-0.05,chime(659,2.5),0.14*G,sfx)
put(cut('salutes')-0.05,step(),0.3*G,sfx);put(cut('sword')-0.1,shing(),0.25*G,sfx)
put(cut('rifle')-0.05,click(),0.4*G,sfx);put(cut('perfectly')-0.05,sparkle(0.8),0.2*G,sfx)
put(cut('29',67)-0.05,boom(3.5,38),0.4*G,sfx)
put(0,rainA(2.3),0.3,amb);put(0.72,taiko(90),0.3*G,sfx)
for k in range(6):put(cut('29')+0.1+k*0.28,crumple(0.25),0.12*G,sfx)
put(cut('stop')-0.1,step(),0.2*G,sfx);put(cut('stop')+0.4,step(),0.2*G,sfx)
put(cut('29',67)+0.9,chime(392,2.5),0.15*G,sfx);put(cut('to',68.5),flutter(3.0),0.08*G,sfx)
tl0=cut('world')+0.55
for k in range(6):put(tl0+k*0.42,whoosh(0.35),0.1*G,sfx)
put(tl0,wobbleS(1.5),0.08*G,sfx)
put(cut('and',4)+0.6,pop(1400,0.06),0.2*G,sfx);put(cut('every')-0.45,whoosh(0.25),0.15*G,sfx);put(cut('every'),chime(523,1.4),0.12*G,sfx)
put(cut('leaflets')-0.1,planeS(1.8),0.3*G,sfx)
put(cut('japan')-0.3,bp(rng.standard_normal(int(2.4*SR)),200,1500)*0.6,0.2,amb)
# ---------- score: low strings drone + slow piano motif, swelling at the end ----------
def piano(f,d=2.2):t=T(d);return (np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2*t)*np.exp(-t*3)+0.15*np.sin(2*np.pi*f*3*t)*np.exp(-t*5))*np.exp(-t*1.6)*np.minimum(1,t/0.004)
put(0,droneP(END,55),0.25,mus);put(0,droneP(END,82.4),0.12,mus)
mot=[220,261.6,329.6,293.7,220,196,220,246.9];b=60/72;t=0.6;i=0
while t<END-1:
    f=mot[i%8]*(0.5 if (i//8)%2 else 1);put(t,piano(f),0.16 if t<cut('commander',57.5) else 0.22,mus)
    if i%4==0:put(t,piano(f/2,3),0.1,mus)
    t+=b;i+=1
fo=np.clip((END-np.arange(N)/SR)/1.6,0,1);mus*=fo;amb*=fo
def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',sfx);wr('music.wav',norm(mus)*0.5);wr('amb.wav',norm(amb)*0.35);print('ok')
