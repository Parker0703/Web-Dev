import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(5)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=86.3;N=int((END+1)*SR)
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
cuts=[wt('give'),wt('go'),wt("here's"),wt('every',20.5),wt("that's",26),wt('so',33.5),wt('no',41),wt('but',43.3),wt('now',51.7),wt('at',60.2),wt('but',63.7),wt('and',67.4),wt('same',72),wt('so',75.6),wt('which',80.5)]
for c in cuts:put(c-0.15,whoosh(0.32),0.16*G,sfx)
# hook: robot servo hum + creepy chime; he is bored
for k in range(0,8):put(0.2+k*0.95,servo(0.5),0.08*G,sfx)
say(wt("can't")+0.1,[(0.32,170,140,'m')],0.35)
put(wt('creepy')-0.1,chime(311,1.6),0.25*G,sfx);put(wt('creepy')-0.05,chime(370,1.6),0.2*G,sfx)
say(wt('creepy')+0.1,[(0.22,330,360,'m'),(0.3,380,300,'m')],0.3,SCI)   # sci "hm-hmm"
put(wt('60')-0.05,stampS(),0.4*G,sfx)
# self-tickle: effort grunts, bored "mm", shrug "meh", potato poke
say(wt('ribs')-0.05,[(0.12,240,260,'e'),(0.12,250,270,'e')],0.35);say(wt('armpits'),[(0.18,230,250,'u')],0.35);say(wt('feet'),[(0.16,260,240,'o')],0.35)
say(wt('nothing')+0.15,[(0.45,190,120,'m',{'vd':0.07,'vib':6})],0.45)   # deflated "mmmh"
for k in range(3):put(wt('potato')+0.05+k*0.12,pop(500,0.08),0.25*G,sfx)
say(wt('potato')+0.45,[(0.2,220,240,'e'),(0.28,240,180,'e')],0.35)      # "meh"
# brain: control freak "hmph", checklist ticks, prediction blips
say(wt('control'),[(0.3,280,220,'m')],0.35,BRAIN)
for k in range(4):put(wt('freak')+0.1+k*0.2,tick(),0.3*G,sfx)
for w,a in [('finger',3),('ribs',3.5),('two',4),('got',4)]:put(wt(w,20+a)-0.05,pop(700+100*a,0.08),0.3*G,sfx)
say(wt('got',24)+0.2,[(0.18,300,340,'o'),(0.25,360,320,'o')],0.35,BRAIN)  # "uh-huh"
put(wt('back',27)-0.1,sparkle(0.8),0.25*G,sfx);put(wt('spoiler'),chime(880,1.0),0.3*G,sfx);put(wt('spoiler')+0.12,chime(660,1.0),0.3*G,sfx)
# match: soft ding, bored "oh"
put(wt('lands'),chime(1320,1.0),0.3*G,sfx);say(wt('oh',37)+0.05,[(0.3,240,190,'o',{'vd':0.06})],0.35,BRAIN);put(wt('mutes'),pop(300,0.15),0.3*G,sfx)
say(wt('no',41),[(0.25,200,170,'o')],0.25);put(wt('zero'),wobbleS(0.6),0.2*G,sfx)
# friend: sneaky giggle, "???" rising, panic yelp, big laughs, kick, bonk + dizzy
giggle(wt('sneaks')-0.1,4,PAL,0.35)
say(wt('brain',45),[(0.14,220,260,'m'),(0.14,240,290,'m'),(0.22,260,360,'m')],0.4)
say(wt('panic')-0.05,[(0.12,300,420,'e',{'vd':0.02}),(0.18,420,520,'i',{'vd':0.02})],0.55)
laugh(wt('laughing')-0.05,6,0.55);laugh(wt('squirming')+0.1,6,0.5,rate=0.12,hi=1.1)
put(wt('accidentally'),whoosh(0.25),0.2*G,sfx);put(wt('face',51)-0.12,bonk(),0.5*G,sfx);say(wt('face',51)+0.05,[(0.4,300,170,'o',{'vib':11,'vd':0.09})],0.45,PAL);put(wt('face',51)+0.1,wobbleS(0.7),0.2*G,sfx)
# lab: servo whirr while the robot copies, pin pop
put(wt('london')-0.05,pop(900),0.3*G,sfx)
for k in range(5):put(wt('move',55)+k*0.9,servo(0.6),0.12*G,sfx)
say(wt('nothing',61),[(0.35,180,150,'m')],0.3)
put(wt('knows'),chime(1320,0.8),0.25*G,sfx)
# delay knob ticks, sci "hm-hm", then laughs grow
for k in range(6):put(wt('added')+k*0.12,tick(),0.3*G,sfx)
say(wt('fraction')+0.1,[(0.18,330,360,'m'),(0.26,370,300,'m')],0.3,SCI)
say(wt('suddenly')-0.05,[(0.18,260,420,'o',{'vd':0.03})],0.45)
laugh(wt('ticklish')-0.1,6,0.5,rate=0.13);laugh(wt('longer'),7,0.5,rate=0.12,hi=1.08);laugh(wt('worse')-0.05,9,0.55,rate=0.105,hi=1.18)
say(wt('ticklish')+0.3,[(0.2,330,300,'i'),(0.25,320,280,'i')],0.25,SCI)    # sci giggles along
# late: brain confused warble
say(wt('wait')-0.05,[(0.18,300,420,'a',{'vd':0.08,'vib':10}),(0.3,420,360,'o',{'vd':0.08,'vib':10})],0.45,BRAIN)
put(wt('guessing')-0.1,sparkle(1.0),0.25*G,sfx)
# ending: bored poke, shrug "meh", cocky "heh-heh"
say(wt('never',83)+0.2,[(0.22,220,240,'e'),(0.3,240,170,'e')],0.35)
say(wt('you',85.5)+0.05,[(0.13,260,300,'e',{'vd':0.02}),(0.2,300,250,'e',{'vd':0.02})],0.45)
put(wt('you',85.5)+0.05,chime(990,1.0),0.2*G,sfx)
# ---------- music: playful pizzicato/marimba loop, quiet ----------
def mar(f,d=0.5):t=T(d);return (np.sin(2*np.pi*f*t)+0.25*np.sin(2*np.pi*f*4*t)*np.exp(-t*20))*np.exp(-t*8)*np.minimum(1,t/0.003)
bpm=112;b=60/bpm;scale=[261.6,293.7,329.6,392.0,440.0];prog=[0,3,4,2]
i=0;t=0.0
while t<END:
    root=scale[prog[(i//8)%4]]
    pat=[1,0,1,1,0,1,0,1]
    if pat[i%8]:put(t,mar(root*(2 if i%4==3 else 1)*(1.5 if i%8==5 else 1),0.4),0.12,mus)
    if i%4==0:put(t,mar(root/2,0.6),0.16,mus)
    t+=b/2;i+=1
fo=np.clip((END+0.3-np.arange(N)/SR)/1.5,0,1);mus*=fo
def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',sfx+vox*0.9);wr('music.wav',norm(mus)*0.45);wr('amb.wav',np.zeros(N));wr('voxonly.wav',norm(vox)*0.8)
print('ok')
