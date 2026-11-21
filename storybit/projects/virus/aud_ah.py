import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(21)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=137.0;N=int((END+1)*SR)
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
bassline=[73.4,73.4,87.3,82.4,73.4,73.4,98.0,92.5];piz=[293.7,349.2,440,349.2,293.7,261.6,293.7,392.0]
tEnd=wt('which',130.6)
for k in range(int(END/beat)):
    tb=k*beat
    if tb<9.8 or tb>tEnd+3: continue
    put(tb,pluck(bassline[k%8],0.4)*1.0,0.9,mus)
    if k%2==1:put(tb,pluck(piz[(k//2)%8]),0.35,mus)
    hh=hp(rng.standard_normal(int(0.05*SR)),6000)*np.exp(-T(0.05)*80);put(tb+beat/2,hh,0.12,mus)
# tension drone under the quiet bits, swells at the reveal
dr=lp(sum(np.sin(2*np.pi*f*t+rng.random()*6) for f in [36.7,55,73.4]),400);mus+=norm(dr)*0.25
# stops for "Almost." and the final twist hit
for a,b in [(wt('almost',95.5)-0.05,wt('one',96.5)),(wt('the',122.9),wt('10',124.6))]:
    i0,i1=int(a*SR),int(b*SR);mus[i0:i1]*=0.05
mus*=np.clip((END-t)/1.5,0,1)
# ---- ambience: vault hum / night / forest
room=lp(rng.standard_normal(N),250)*0.4;amb+=norm(room)*0.25
# ---- SFX
put(0.0,sparkle(1.4),0.5*G,sfx);put(wt('vanished',2.8),whoosh(0.5),0.6*G,sfx);put(wt('vanished',2.8)+0.05,sparkle(),0.5*G,sfx)
put(wt('vault',3.7),rumble(1.8),0.6*G,sfx);put(wt('break',4.9),clank(),0.35*G,sfx)
tl=wt('fell',7.0);put(tl-0.5,whoosh(0.5),0.5*G,sfx);put(tl,thud(80,0.6),0.85*G,sfx);put(wt('half-eaten',8.4),chomp(),0.9*G,sfx);put(wt('sandwich',9.1),sting(),0.5*G,sfx)
for i in range(6):put(wt('give',9.8)+i*0.55,thud(55,0.25),0.25*G,sfx)
put(wt('lunch',13.9),chomp(),0.7*G,sfx);put(wt('lunch',13.9)+0.3,chomp(),0.6*G,sfx);put(wt('ruined',14.5),gasp(),0.4*G,sfx)
put(wt('belgium',16.4)-0.1,whoosh(0.4),0.5*G,sfx);put(wt('capital',18.0),sparkle(1.2),0.6*G,sfx)
put(wt('two',19.7),whoosh(0.8),0.5*G,sfx);put(wt('ten',21.9),sparkle(1.0),0.45*G,sfx)
for w,a in [('heat',23.8),('radar',24.7),('seismic',25.2),('magnetic',26.4),('lock',28.0)]:put(wt(w,a),blip(700),0.5*G,sfx);put(wt(w,a),whoosh(0.3),0.3*G,sfx)
for i in range(30):put(wt('100',28.6)+i*0.04,tick(),0.25*G,sfx)
for i in range(4):put(wt('nobody',31.9)+0.2+i*0.5,thud(110,0.15),0.25*G,sfx)
put(wt('leonardo',37.2),sting(),0.4*G,sfx)
put(wt('he',39.7)+1.5,thud(120,0.3),0.5*G,sfx)
put(wt('trader',43.3),sparkle(0.8),0.6*G,sfx)
put(wt('he',44.1)+0.6,creak(0.6),0.4*G,sfx)
for i in range(10):put(wt('for',48.4)+0.2+i*0.18,paper(),0.3*G,sfx)
put(wt('february',53.8),whoosh(0.4),0.5*G,sfx);put(wt('2003',54.5),thud(90,0.3),0.5*G,sfx)
for i in range(4):put(wt("it's",57.0)-0.25+i*0.15,tick(),0.6*G,sfx)
put(wt("it's",57.0)+0.35,clank(0.6),0.4*G,sfx)
put(wt('sprays',60.3),hp(rng.standard_normal(int(1.6*SR)),1500)*np.sin(np.pi*T(1.6)/1.6)*0.6,0.5*G,sfx);put(wt('blind',62.8),blip(300),0.5*G,sfx)
for i in range(5):put(wt('at',63.5)+i*0.42,thud(140,0.12),0.2*G,sfx)
put(wt('tape',65.2),bp(rng.standard_normal(int(0.9*SR)),800,5000)*np.sin(np.pi*T(0.9)/0.9),0.4*G,sfx)
put(wt('plate',69.4)-0.5,whoosh(0.6),0.4*G,sfx);put(wt('trick',70.3),chime(880),0.4*G,sfx)
put(wt('giant',72.5),rumble(1.4),0.6*G,sfx)
put(wt('key',74.9)-0.6,sparkle(1.0),0.5*G,sfx);put(wt('and,',75.0),blip(1200),0.3*G,sfx)
for i in range(8):put(wt('and,',75.0)+0.3+i*0.4,tick(),0.3*G,sfx)
put(wt('the',79.5),creak(1.8),0.7*G,sfx);put(wt('swings',80.1),rumble(1.6),0.5*G,sfx)
for i in range(10):put(wt('one',81.3)+0.3+i*0.42,clank(0.4),0.35*G,sfx)
put(wt('diamonds',86.1),sparkle(),0.6*G,sfx);put(wt('gold',87.0),clank(0.6),0.5*G,sfx);put(wt('cash',87.4),paper(),0.6*G,sfx)
put(wt('bags',88.6)+1.6,thud(60,0.6),0.7*G,sfx)
put(wt('perfect',94.0)-0.4,engine(1.8),0.5*G,sfx)
put(wt('almost',95.5),scratch(),0.8*G,sfx)
put(wt('burn',98.1)+0.25,flick(),0.6*G,sfx)
for i in range(3):put(wt('he',99.4)+i*0.25,thud(150,0.12),0.2*G,sfx)
put(wt('dumped',100.4)+0.1,whoosh(0.6),0.6*G,sfx);put(wt('dumped',100.4)+0.9,thud(70,0.4),0.5*G,sfx);put(wt('he',99.4),engine(1.6),0.25*G,sfx)
put(wt('finds',105.0),gasp(),0.4*G,sfx)
for w,a in [('receipts',106.1),('diamond',107.2),('a',108.5)]:put(wt(w,a),flash(),0.5*G,sfx)
put(wt('and',110.3),sting(),0.7*G,sfx);put(wt('sandwich',112.0),flash(),0.6*G,sfx)
put(wt('police',112.6),siren(1.8),0.35*G,sfx)
for i in range(4):put(wt('police',112.6)+1.0+i*0.2,paper(),0.3*G,sfx)
put(wt('and',115.0),blip(600),0.4*G,sfx);put(wt('dna',115.3),sparkle(1.2),0.45*G,sfx);put(wt('points',116.4)+1.0,chime(1046),0.5*G,sfx)
whistle(wt('five',117.8)+0.5,[784,880,988,784,659,784])
put(wt('the',122.9)+0.45,sting(),0.7*G,sfx);put(wt('the',122.9)+0.45,gasp(),0.4*G,sfx)
put(wt('10',124.6)+0.3,clank(1.2),0.8*G,sfx)
put(wt('but',126.5),whoosh(0.7),0.5*G,sfx);put(wt('but',126.5)+0.2,sparkle(1.0),0.4*G,sfx)
put(wt('which',130.6)+0.6,whoosh(1.2),0.4*G,sfx);put(wt('100',132.4),sparkle(1.4),0.6*G,sfx);put(wt('hidden',134.8),sting(),0.6*G,sfx)
def w(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
w('sfx.wav',norm(sfx)*0.9);w('music.wav',norm(mus)*0.7);w('amb.wav',norm(amb)*0.5);print('ok')
