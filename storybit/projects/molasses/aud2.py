import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11)
Lw=json.load(open('words.json'));W=[w for l in Lw for w in l['w']]
def wt(word,after=0):
    for w in W:
        if w['t']>=after-0.01 and ''.join(ch for ch in w['x'].lower() if ch.isalnum() or ch in "'-").startswith(word):return w['t']
    return after
END=63.9;N=int((END+1)*SR)
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
def eerie(d=1.6):t=T(d);return norm(sum(np.sin(2*np.pi*f*t+np.sin(t*5)*2) for f in (311,466,622))*np.sin(np.pi*t/d))
# ---- music: soft lullaby — pad chords + music-box melody, 76 bpm
bpm=76;beat=60/bpm;prog=[(261.6,[0,4,7,11]),(220.0,[0,3,7,10]),(174.6,[0,4,7,11]),(196.0,[0,4,7,10])]
t=0;bar=0
while t<END+0.5:
    root,iv=prog[bar%4];d=beat*4
    for k in iv[:3]:put(t,pad(root*2**(k/12)/2,d+0.6),0.08,mus)
    put(t,pluck(root/2,2.5),0.18,mus)
    mel=[iv[(bar*3+i)%4]+12 for i in range(8)]
    for i,k in enumerate(mel):
        if (i+bar)%3==2:continue
        put(t+i*beat/2,bell(root*2**(k/12)*2,1.2),0.06,mus)
    t+=d;bar+=1
# fades
fi=np.minimum(1,np.arange(N)/SR/1.0);fo=np.clip((END+0.6-np.arange(N)/SR)/1.2,0,1);mus*=fi*fo
# ---- ambience: soft room tone + clock tick
amb+=lp(rng.standard_normal(N),500)*0.012
for k in np.arange(0.5,END,1.0):put(k,pop(3200,0.03),0.012,amb)
# ---- SFX on the action
cuts=[wt('might'),wt('your',4),wt('give'),wt('when',11.9),wt("that's",15.6),wt("it's",16.8),wt('and',23.5),wt('like',27.8),wt('now',29.6),wt('your',31.2),wt('one',33.4),wt('like',36.8),wt('and',39),wt('it',42.2),wt('just',43.7),wt('about',48.5),wt('from',52.3),wt('and',53.5),wt('so',56.2),wt('they',58.1),wt('but',59.7)]
for c in cuts:put(c-0.18,whoosh(0.36),0.22)
put(0.3,snore(1.6),0.18);put(2.0,snore(1.6),0.15)
put(wt('might')+0.5,sparkle(0.8),0.25);put(wt('body')-0.2,ding(),0.25)
put(wt('your',4)+0.05,pop(700),0.35);put(wt('literally')+0.0,pop(900),0.35);put(wt('differently'),ding(),0.3)
put(wt('60')-0.05,stamp(),0.5)
for k in range(3):put(wt('drooling')+0.1+k*0.45,drip(),0.3)
put(wt('give')+0.4,snore(1.4),0.2)
put(wt('when',11.9)+0.15,pop(600),0.3);put(wt('ten')-0.1,pop(800),0.3);put(wt('percent'),ding(),0.4)
put(wt('dream'),sparkle(1.0),0.35)
put(wt('cleaning'),sparkle(1.0),0.4)
for k in range(4):put(wt('sorts')+0.25+k*0.22,pop(1100+k*120,0.08),0.25)
put(wt('deals')+0.35,boing(0.5),0.2);put(wt('throws')+0.1,whoosh(0.3,800,4000),0.25);put(wt('junk')+0.75,thud(),0.45)
put(wt('smoother'),sparkle(0.7),0.25);put(wt('fewer'),pop(700),0.3);put(wt('longer'),pop(900),0.3)
put(wt('like',27.8)+0.25,pop(500),0.35);put(wt('no',28.5),stamp(),0.45)
put(wt('weird')-0.1,eerie(1.4),0.25)
put(wt('sync')-0.05,ding(),0.4)
put(wt('drops'),whoosh(0.8,1500,200),0.25);put(wt('follows'),whoosh(0.8,1500,200),0.22)
put(wt('phones'),pop(800),0.3);put(wt('wi-fi')-0.1,bell(2093,1.0),0.35)
put(wt('better',40),sparkle(0.9),0.3)
put(wt('weirder')-0.1,eerie(1.2),0.2)
for k in range(3):put(wt('smelling')+k*0.8,sniff(),0.35)
put(wt('nine'),ding(),0.4);put(wt('melatonin'),pop(700),0.3);put(wt('pills'),ding(),0.35)
for w in ['from','a','shirt']:put(wt(w,52.3)-0.02,stamp(),0.45)
put(wt('notice'),stamp(),0.3);put(wt('smell',55),ding(),0.3)
put(wt('steal'),whoosh(0.5,300,1500),0.35);put(wt('blanket')+0.1,shiver(0.9),0.3)
put(wt('kick')-0.02,thud(),0.6);put(wt('kick')+0.02,boing(0.6),0.25)
put(wt('better',60)-0.1,sparkle(1.2),0.35);put(wt('follow'),ding(),0.3)
def wr(n,x):wf.write(n,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
wr('sfx.wav',bus*0.9);wr('music.wav',norm(mus)*0.5);wr('amb.wav',amb)
print('ok')
