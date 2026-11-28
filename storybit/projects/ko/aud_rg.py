import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(5)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=91.8;N=int((END+1)*SR)
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
G=0.8  # sound effects 20% lower
def crowd(d=3.0,sw=1.0):t=T(d);x=bp(rng.standard_normal(len(t)),300,3000,2);env=np.minimum(1,t/0.4)*np.minimum(1,(d-t)/0.8)*(0.7+0.3*np.sin(2*np.pi*0.7*t));return norm(x*env)
def scratch():t=T(0.45);f=900*np.exp(-t*5)+150;y=bp(rng.standard_normal(len(t)),200,3000)*0.5+np.sin(2*np.pi*np.cumsum(f)/SR)*0.6;return norm(y*np.exp(-t*4))
def ting(f=2400):t=T(0.6);return norm((np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t))*np.exp(-t*7))
def thump():t=T(0.25);return norm(np.sin(2*np.pi*(70+120*np.exp(-t*40))*t)*np.exp(-t*16))
def bell(f=1500):t=T(0.35);return norm(np.sign(np.sin(2*np.pi*f*t))*0.3*np.exp(-t*12)+np.sin(2*np.pi*f*1.5*t)*np.exp(-t*10))
def snore(d=1.4):t=T(d);x=lp(rng.standard_normal(len(t)),500)*(np.sin(2*np.pi*90*t)*0.5+0.5);return norm(x*np.sin(np.pi*t/d)**2)
def drone(d=5):t=T(d);return norm((np.sin(2*np.pi*55*t)+0.6*np.sin(2*np.pi*58.3*t)+0.3*np.sin(2*np.pi*110.5*t))*np.minimum(1,t/1)*np.minimum(1,(d-t)/1))
def blip():t=T(0.18);return norm(np.sin(2*np.pi*(1800-1400*t/0.18)*t)*np.exp(-t*10))
def flashS():t=T(0.2);return norm(bp(rng.standard_normal(len(t)),2000,8000)*np.exp(-t*30)+np.sin(2*np.pi*3200*t)*np.exp(-t*25)*0.3)
def wobbleS(d=0.6):t=T(d);fr=500+200*np.sin(t*40);return norm(np.sin(2*np.pi*np.cumsum(fr*np.exp(-t*1.5))/SR)*np.exp(-t*3))
def tickS():t=T(0.04);return norm(np.sin(2*np.pi*2600*t)*np.exp(-t*120))
cuts=[wt('by'),wt('he',8.6),wt('give'),wt('san'),wt('randy',17),wt('the',21),wt('they',26.5),wt('day',29),wt('day',37.5),wt("he's",43.5),wt('his',46.5),wt('a',50.5),wt('day',53.5),wt('264',62.5),wt('then',66.3),wt('the',69.3),wt('tiny',74.5),wt('he',78.5),wt('decades',81),wt('so',84)]
for c in cuts:put(c-0.15,whoosh(0.32),0.16*G,sfx)
# hook: clock ticking faster, calendar flips
for k in range(14):put(0.3+k*0.3,tickS(),0.22*G,sfx)
for k in range(10):put(1.6+k*0.26,pop(600+k*40,0.07),0.18*G,sfx)
# stadium cheers + flashes
put(wt('by')-0.1,crowd(3.8),0.32*G,sfx);put(wt('football')-0.05,chime(1320,1.0),0.22*G,sfx)
for k in range(6):put(wt('by')+0.3+k*0.55,flashS(),0.12*G,sfx)
put(wt('he',8.6)-0.08,scratch(),0.5*G,sfx);put(wt('team'),wobbleS(0.5),0.2*G,sfx)
put(wt('60')-0.05,stampS(),0.4*G,sfx);put(wt('never',13)-0.05,wobbleS(0.7),0.2*G,sfx)
put(wt('san')+0.05,chime(880,1.0),0.2*G,sfx);put(wt('1963',15.5),pop(800),0.3*G,sfx)
put(wt('win')-0.05,sparkle(0.8),0.25*G,sfx)
put(wt('one',21.5),pop(700),0.3*G,sfx);put(wt('stays'),chime(990,0.8),0.2*G,sfx)
put(wt('flipped')-0.1,ting(2600),0.35*G,sfx);put(wt('coin')+0.65,ting(2200),0.3*G,sfx);put(wt('lost')-0.05,wobbleS(0.8),0.3*G,sfx)
laugh(wt('lost')+0.1,5,0.45,PAL)
put(wt('day',29)-0.02,pop(700),0.25*G,sfx);put(wt('day',33.5)-0.02,pop(700),0.25*G,sfx);put(wt('grumpy')-0.05,thump(),0.3*G,sfx)
put(wt('impossible')-0.05,bonk(),0.35*G,sfx)
put(wt('day',37.5)-0.1,crowd(6.0),0.3*G,sfx)
for k in range(8):put(wt('day',37.5)+0.4+k*0.7,flashS(),0.1*G,sfx)
put(wt('chargers')-0.1,chime(1320,1.0),0.22*G,sfx)
put(wt("he's",43.5)-0.08,scratch(),0.5*G,sfx);put(wt('skinny')-0.05,wobbleS(0.6),0.25*G,sfx)
tb=wt('basketball')
for k in range(9):put(tb-0.15+k*0.483,thump(),0.3*G,sfx)
tp=wt('pinball')
for k in range(7):put(tp-0.1+k*0.32,bell(1400+200*(k%3)),0.12*G,sfx)
put(wt('stanford')-0.1,chime(990,0.8),0.2*G,sfx)
put(wt('day',53.5)-0.02,pop(700),0.25*G,sfx)
for w,a in [('100',55),('sevens',56),('65',57.5)]:put(wt(w,a)-0.05,pop(600,0.08),0.3*G,sfx)
put(wt('stopped')-0.05,wobbleS(0.9),0.25*G,sfx)
put(wt('264')-0.05,stampS(),0.35*G,sfx)
for k in range(12):put(wt('264')+k*0.12,tickS(),0.15*G,sfx)
put(wt('world')-0.05,sparkle(1.0),0.3*G,sfx);put(wt('world'),chime(1320,1.2),0.25*G,sfx)
put(wt('slept')-0.4,thump(),0.35*G,sfx);put(wt('slept')+0.4,snore(1.4),0.25*G,sfx);put(wt('slept')+1.9,snore(1.4),0.2*G,sfx)
put(wt('creepy')-0.2,drone(5.4),0.35*G,sfx);put(wt('creepy')-0.05,chime(311,1.6),0.2*G,sfx)
for k in range(5):put(wt('microsleeps')-0.25+k*0.85,blip(),0.2*G,sfx)
for k in range(2):put(wt('tiny')+0.9+k*1.9-0.4,blip(),0.15*G,sfx)
put(wt('harmless')-0.05,chime(1320,1.0),0.25*G,sfx)
for k in range(4):put(wt('he',78.5)+0.2+k*0.6,flashS(),0.1*G,sfx)
put(wt('decades')-0.1,chime(330,1.6),0.2*G,sfx)
for k in range(8):put(wt('decades')+k*0.5,tickS(),0.18*G,sfx)
put(wt('just',85)-0.1,pop(900),0.25*G,sfx);put(wt('remember')-0.1,sparkle(0.9),0.25*G,sfx);put(wt('remember')+1.2,chime(660,1.6),0.18*G,sfx)
# ---------- music: light 60s jazzy walk; darker under the creepy part ----------
def mar(f,d=0.5):t=T(d);return (np.sin(2*np.pi*f*t)+0.25*np.sin(2*np.pi*f*4*t)*np.exp(-t*20))*np.exp(-t*8)*np.minimum(1,t/0.003)
def bass(f,d=0.35):t=T(d);return (np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*2*t))*np.exp(-t*5)*np.minimum(1,t/0.01)
bpm=118;b=60/bpm;roots=[220.0,293.7,246.9,329.6];walk=[0,2,4,5]
tc0,tc1=wt('creepy')-0.2,wt('he',78.5)
i=0;t=0.0
while t<END:
    dark=tc0<=t<tc1;r=roots[(i//8)%4]*(0.84 if dark else 1)
    put(t,bass(r/2*(2**(walk[i%4]/12))),0.2,mus)
    if not dark:
        if i%2==1:put(t,mar(r*2*(1.5 if i%8==3 else 1.26 if i%8==5 else 1),0.35),0.1,mus)
    else:
        if i%4==0:put(t,mar(r*2*1.19,0.9),0.1,mus)
    t+=b;i+=1
fo=np.clip((END-np.arange(N)/SR)/1.5,0,1);mus*=fo
def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',sfx+vox*0.9);wr('music.wav',norm(mus)*0.45);wr('amb.wav',np.zeros(N));print('ok')
