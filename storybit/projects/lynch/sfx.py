import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(7)
Lw=json.load(open('words.json'))
A=lambda i:Lw[i]['a'];B=lambda i:Lw[i]['b'];WT=lambda i,k:Lw[i]['w'][min(k,len(Lw[i]['w'])-1)]['t']
END=96.2;N=int(END*SR)+SR
bus=np.zeros(N);amb=np.zeros(N)
def env(n,a=0.005,d=None,k=6):
    t=np.arange(n)/SR;e=np.minimum(1,t/max(a,1e-4))
    if d: e*=np.exp(-k*t/d)
    return e
def bp(x,lo,hi,o=2):
    b,a=sg.butter(o,[lo/(SR/2),min(hi/(SR/2),0.99)],'band');return sg.lfilter(b,a,x)
def lp(x,f,o=2):b,a=sg.butter(o,f/(SR/2));return sg.lfilter(b,a,x)
def hp(x,f,o=2):b,a=sg.butter(o,f/(SR/2),'high');return sg.lfilter(b,a,x)
def nz(d):return rng.standard_normal(int(d*SR))
def put(t,x,g=1.0,tgt=None):
    tgt=bus if tgt is None else tgt;i=int(t*SR)
    if i<0: x=x[-i:];i=0
    n=min(len(x),len(tgt)-i)
    if n>0: tgt[i:i+n]+=x[:n]*g
def norm(x):m=np.max(np.abs(x))+1e-9;return x/m
def whoosh(d=0.5,lo=300,hi=3000,up=True):
    n=int(d*SR);x=nz(d);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):
        p=s/n;f=lo*(hi/lo)**(p if up else 1-p);out[s:s+bl]=bp(x[s:s+bl+0],max(60,f*0.6),f*1.4,1)[:len(out[s:s+bl])]
    e=np.sin(np.pi*np.linspace(0,1,n))**1.5;return norm(out*e)
def boom(d=1.4,f0=90,f1=35):
    n=int(d*SR);t=np.arange(n)/SR;f=f1+(f0-f1)*np.exp(-t*6);ph=2*np.pi*np.cumsum(f)/SR
    x=np.sin(ph)*np.exp(-t*3.2)+lp(nz(d),400)*np.exp(-t*14)*0.6;return norm(x)
def thunder(d=3.0):
    t=np.arange(int(d*SR))/SR;crack=hp(nz(d),1500)*np.exp(-t*18)
    rum=lp(nz(d),180,3)*(np.exp(-t*1.1))*(0.6+0.4*np.abs(np.sin(t*7+np.sin(t*3)*2)));return norm(crack*0.7+norm(rum)*1.2)
def slam(d=0.35):
    t=np.arange(int(d*SR))/SR;return norm(lp(nz(d),1800)*np.exp(-t*30)+np.sin(2*np.pi*75*t)*np.exp(-t*14)*1.4)
def stampS():
    d=0.5;t=np.arange(int(d*SR))/SR;return norm(np.sin(2*np.pi*(60+80*np.exp(-t*30))*t)*np.exp(-t*9)*1.5+hp(nz(d),2000)*np.exp(-t*60)*0.5)
def heart():
    d=0.6;t=np.arange(int(d*SR))/SR;x=np.zeros(len(t))
    for o,g in [(0,1),(0.2,0.7)]:
        tt=np.clip(t-o,0,None);x+=g*np.sin(2*np.pi*48*tt)*np.exp(-tt*16)*(t>=o)
    return norm(lp(x,200))
def whistle(d=0.6):
    t=np.arange(int(d*SR))/SR;roll=0.5+0.5*np.sign(np.sin(2*np.pi*28*t));f=2850+80*np.sin(2*np.pi*28*t)
    x=np.sin(2*np.pi*np.cumsum(f)/SR)*(0.55+0.45*roll)+0.15*bp(nz(d),2500,3500)
    e=np.minimum(1,t/0.02)*np.minimum(1,(d-t)/0.08);return norm(x*e)
def bell(d=4.5,f=180):
    t=np.arange(int(d*SR))/SR;x=sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(0.5,0.6,0.7),(1,1,0.9),(1.19,0.6,1.3),(1.5,0.4,1.6),(2.0,0.35,2),(2.74,0.25,2.6),(3.76,0.12,3.5)])
    return norm(x*np.minimum(1,t/0.004))
def gong(d=4.0):return norm(bell(d,95)+0.6*boom(d,70,40)[:int(d*SR)])
def chime(f=1320,d=1.5):t=np.arange(int(d*SR))/SR;return norm((np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.01*t))*np.exp(-t*3))
def match():
    a=hp(nz(0.18),2500)*np.exp(-np.arange(int(0.18*SR))/SR*14);b=whoosh(0.5,200,900)*0.5;return norm(np.concatenate([a,b]))
def rip():
    d=0.35;t=np.arange(int(d*SR))/SR;x=hp(nz(d),1200)*(rng.random(len(t))>0.6)*np.minimum(1,t/0.02)*np.exp(-t*5);return norm(lp(x,6000))
def slide(d=0.6):return norm(bp(nz(d),400,2500)*np.sin(np.pi*np.linspace(0,1,int(d*SR))))
def scratch(d=1.5):
    t=np.arange(int(d*SR))/SR;m=0.5+0.5*np.sin(2*np.pi*9*t+np.sin(2*np.pi*3.1*t)*2);return norm(bp(nz(d),2500,7000)*m*np.minimum(1,t/0.05)*np.minimum(1,(d-t)/0.1))
def fire(d=1.6):
    t=np.arange(int(d*SR))/SR;cr=(rng.random(len(t))>0.9985)*rng.standard_normal(len(t))*4;cr=hp(cr,1500)
    return norm(lp(nz(d),900)*np.exp(-t*1.5)+cr*np.exp(-t*1.2)+whoosh(d,150,1500)*0.8)
def tick():t=np.arange(int(0.03*SR))/SR;return norm(np.sin(2*np.pi*2200*t)*np.exp(-t*200))
def knock():
    d=0.6;x=np.zeros(int(d*SR))
    for o in [0,0.17,0.32]:
        tt=np.arange(int(0.12*SR))/SR;k=np.sin(2*np.pi*190*tt)*np.exp(-tt*45)+lp(nz(0.12),2500)*np.exp(-tt*80)*0.5;i=int(o*SR);x[i:i+len(k)]+=k
    return norm(x)
def bonk():
    d=0.7;t=np.arange(int(d*SR))/SR;f=150+500*np.exp(-t*12);x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5)
    f2=300+60*np.sin(2*np.pi*14*t);x+=0.4*np.sin(2*np.pi*np.cumsum(f2)/SR)*np.exp(-t*4)*(t>0.08);return norm(x)
def bloop():t=np.arange(int(0.25*SR))/SR;f=300+900*t/0.25;return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*14))
def flashpop():
    d=1.0;t=np.arange(int(d*SR))/SR;return norm(lp(nz(d),3000)*np.exp(-t*25)*1.5+np.sin(2*np.pi*np.cumsum(5000-3000*t)/SR)*np.exp(-t*4)*0.15+boom(d,120,50)*0.6)
def scrub(d=1.4):
    t=np.arange(int(d*SR))/SR;m=np.abs(np.sin(2*np.pi*8*t));return norm(bp(nz(d),800,3500)*m)
def clank():
    d=0.8;t=np.arange(int(d*SR))/SR;x=sum(np.sin(2*np.pi*f*t)*np.exp(-t*k) for f,k in [(1250,7),(1870,9),(2630,11),(3400,14)]);x+=lp(nz(d),4000)*np.exp(-t*50)
    x2=np.roll(x,int(0.09*SR))*0.6;return norm(x+x2)
def step(heavy=1):
    d=0.18;t=np.arange(int(d*SR))/SR;return norm(lp(nz(d),700)*np.exp(-t*40)+np.sin(2*np.pi*70*t)*np.exp(-t*30)*heavy)
def wetstep():d=0.25;t=np.arange(int(d*SR))/SR;return norm(np.pad(step(),(0,len(t)-int(0.18*SR)))+bp(nz(d),1500,5000)*np.exp(-t*18)*0.6)
def sting(d=2.2,root=73.4):
    t=np.arange(int(d*SR))/SR;x=np.zeros(len(t))
    for r in [1,1.059,1.5,2,2.12,3]:
        f=root*r;x+=sg.sawtooth(2*np.pi*f*t*(1+0.002*np.sin(2*np.pi*5*t)))
    x=lp(x,1800);return norm(x*np.minimum(1,t/0.01)*np.exp(-t*1.6))
def shing():
    d=1.2;t=np.arange(int(d*SR))/SR;x=sum(np.sin(2*np.pi*f*t)*np.exp(-t*3) for f in [3520,4700,6100]);return norm(x*np.minimum(1,t/0.003)+hp(nz(d),6000)*np.exp(-t*20)*0.3)
def alarm(d=1.2):
    t=np.arange(int(d*SR))/SR;f=np.where((t*4)%1<0.5,880,660);return norm(sg.square(2*np.pi*np.cumsum(f)/SR/(2*np.pi)*2*np.pi*0+2*np.pi*np.cumsum(f)/SR)*0.3*np.minimum(1,(d-t)/0.1)) if False else norm(lp(sg.square(2*np.pi*np.cumsum(f)/SR),3000)*np.minimum(1,(d-t)/0.1))
def sputter(d=1.2):
    t=np.arange(int(d*SR))/SR;g=(np.floor(t*16)%3!=0).astype(float);return norm(lp(nz(d),500)*g+hp(nz(d),3000)*0.2*g)
def hiss(d=0.8):t=np.arange(int(d*SR))/SR;return norm(hp(nz(d),3000)*np.minimum(1,t/0.05)*np.exp(-t*3))
def pop():t=np.arange(int(0.12*SR))/SR;return norm(np.sin(2*np.pi*(600-300*t/0.12)*t)*np.exp(-t*35))
def creak(d=1.0):
    t=np.arange(int(d*SR))/SR;f=180+60*np.sin(2*np.pi*1.3*t);imp=(rng.random(len(t))>0.995).astype(float)
    x=sg.lfilter([1],[1,-1.95*np.cos(2*np.pi*400/SR),0.97],imp*np.sin(2*np.pi*np.cumsum(f)/SR+0)) ;x=bp(sg.sawtooth(2*np.pi*np.cumsum(f)/SR),300,1800)*(0.4+0.6*np.abs(np.sin(2*np.pi*3*t)))
    return norm(x*np.sin(np.pi*t/d))
def riser(d=1.0):return norm(whoosh(d,200,4000)*np.linspace(0.2,1,int(d*SR)))


def horn(d=1.0):
    t=np.arange(int(d*SR))/SR;x=sum(np.sign(np.sin(2*np.pi*f*t))*g for f,g in [(311,1),(370,0.8)]);return norm(lp(x,2500)*np.minimum(1,t/0.02)*np.minimum(1,(d-t)/0.05))
def engine(d=2.0,up=1):
    t=np.arange(int(d*SR))/SR;f=55+40*(t/d if up else 1-t/d);x=np.sin(2*np.pi*np.cumsum(f)/SR)+0.5*np.sign(np.sin(2*np.pi*np.cumsum(f*2)/SR))*0.3+lp(nz(d),500)*0.6
    return norm(lp(x,900)*np.sin(np.pi*np.linspace(0,1,len(t)))**0.7)
def beep(f=1760,d=0.08):t=np.arange(int(d*SR))/SR;return np.sin(2*np.pi*f*t)*np.minimum(1,t/0.003)*np.minimum(1,(d-t)/0.01)
def glitch(d=0.25):x=nz(d);x=np.round(x*3)/3*np.sign(np.sin(np.arange(len(x))/SR*2*np.pi*60));return norm(bp(x,800,6000))
def roll(d=1.2):
    out=np.zeros(int(d*SR));tt=0.0;k=0
    while tt<d-0.05:put_i=int(tt*SR);b=beep(1200+k*40,0.03);out[put_i:put_i+len(b)]+=b[:len(out)-put_i];k+=1;tt+=0.025+0.12*(tt/d)**2
    return norm(out)
def ring_(d=2.4):
    t=np.arange(int(d*SR))/SR;g=((t%1.2)<0.8).astype(float);x=(np.sin(2*np.pi*880*t)+np.sin(2*np.pi*1320*t))*(0.5+0.5*np.sign(np.sin(2*np.pi*16*t)))*g;return norm(x*0.7)
def crackle(d=3.0):
    x=lp(nz(d),2500)*0.3;n=len(x)
    for k in range(int(d*40)):i=rng.integers(0,n-400);x[i:i+300]+=hp(nz(300/SR),2000)*np.exp(-np.arange(300)/40)*rng.uniform(0.5,1.5)
    return norm(x+lp(nz(d),150)*0.8)
E=[]
def ev(t,x,g):E.append((t,x,g))
def wind(d):return norm(lp(nz(d),500)*(0.6+0.4*np.sin(np.arange(int(d*SR))/SR*0.7)))
def pumpS():d=0.35;q=np.arange(int(d*SR))/SR;return norm(bp(nz(d),300,2500)*np.exp(-q*8)*np.sin(np.pi*q/d))
def squeak():d=0.3;q=np.arange(int(d*SR))/SR;return norm(np.sin(2*np.pi*(900+400*np.sin(q*30))*q)*np.exp(-q*8))
def morse(pat,dot=0.07,f=700):
    out=[]
    for v in pat:n=int((dot*3 if v else dot)*SR);q=np.arange(n)/SR;out.append(np.sin(2*np.pi*f*q)*np.minimum(1,q/0.004)*np.minimum(1,(n/SR-q)/0.004));out.append(np.zeros(int(dot*SR)))
    return norm(np.concatenate(out))
def rumble(d):q=np.arange(int(d*SR))/SR;return norm(lp(nz(d),120,3)+0.5*np.sin(2*np.pi*35*q)*(0.6+0.4*np.sin(q*9)))
def march(d,bpm=110):
    out=np.zeros(int(d*SR))
    for k in np.arange(0,d-0.2,60/bpm):i=int(k*SR);x=lp(nz(0.15),900)*np.exp(-np.arange(int(0.15*SR))/SR*30);out[i:i+len(x)]+=x[:len(out)-i]
    return norm(out)
def typeS():d=0.06;q=np.arange(int(d*SR))/SR;return norm(hp(nz(d),1500)*np.exp(-q*80)+np.sin(2*np.pi*180*q)*np.exp(-q*60)*0.5)
ev(0,wind(12),0.18);ev(0.0,lp(rumble(8),400),0.25)
ev(WT(1,8),whoosh(0.6,300,1500),0.3);ev(WT(1,9),squeak(),0.3);ev(WT(1,9)+0.2,bloop(),0.25)
ev(A(2),whoosh(0.5,600,200,False),0.2);ev(WT(2,8),slide(),0.15)
for k in range(10):ev(WT(2,18)-0.2+k*0.11,pumpS(),0.15)
ev(WT(2,21),morse([1,0,1,1,0,0,1,0,1,1,1,0],0.06),0.25)
ev(A(3),whoosh(0.6,200,900),0.2);ev(A(3)+0.4,stampS(),0.5);ev(WT(3,13),stampS(),0.7);ev(WT(3,13),boom(1.2,80,35),0.35)
ev(WT(4,4)+0.4,rip(),0.25)
ev(WT(5,6),slide(),0.2);ev(WT(5,11),slide(),0.2)
for k,tt in enumerate([WT(6,2),WT(6,4),WT(6,7)]):
    for r in range(8):ev(tt-0.2+r*0.1,pumpS(),0.12)
    ev(tt+0.7,squeak(),0.25);ev(tt+0.7,pop(),0.2)
ev(WT(6,9),whoosh(2.0,150,700),0.3)
ev(A(7),wind(3),0.25);ev(A(8),boom(0.8,70,40),0.3);ev(A(8),hp(nz(1.5),2000)*0.3,0.15)
ev(A(9),morse([1,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1],0.07,650),0.3);ev(WT(9,9),morse([1,0,0,1,1,0,1,0,0,0,1,1],0.07,820),0.25);ev(WT(9,9)+1.6,chime(1319,1.0),0.25)
ev(WT(10,3),hiss(0.6),0.25);ev(WT(10,8),rumble(2.2),0.5);ev(WT(10,10),march(1.8),0.35);ev(WT(10,13),engine(2.0,1),0.4)
ev(A(11),rumble(4.3),0.35);ev(A(11),march(4.0,100),0.15)
ev(A(12),morse([1,0,1,0,0,1,1],0.06,750),0.2)
for k in range(16):ev(WT(12,2)+k*0.09,typeS(),0.2)
ev(WT(12,7)+0.6,stampS(),0.4)
ev(A(13),rumble(5.0),0.3);ev(A(13),wind(5),0.15)
ev(A(14),whoosh(0.8,200,900),0.2);ev(WT(14,3),scrub(),0.15);ev(WT(14,6),whoosh(0.5,500,1500),0.2);ev(WT(14,15),whoosh(1.2,150,800),0.3)
ev(A(15),boom(1.0,60,30),0.3)
for k,tt in enumerate([WT(16,4),WT(16,5),WT(16,6),WT(16,9)]):ev(tt,pop(),0.3)
ev(A(17),whoosh(0.5,300,1200),0.2);ev(A(18),clank(),0.3);ev(WT(18,5),whoosh(0.4,800,2000),0.2)
for k in range(8):ev(A(19)+k*0.25,scratch(),0.1)
ev(WT(19,4),chime(988,1.6),0.3)
ev(WT(20,12),whoosh(2.0,1500,200,False),0.3);ev(A(21),hiss(1.5),0.2)
for t,x,g in E:put(t,x,g)
w=lp(nz(END+1),300,2);put(0,norm(w)*0.5,0.03,amb)
mus=np.zeros(N);t=np.arange(N)/SR
dr=np.sin(2*np.pi*41.2*t)+0.6*np.sin(2*np.pi*61.7*t)+0.3*np.sin(2*np.pi*82.4*t*1.002);dr*=0.6+0.4*np.sin(2*np.pi*0.09*t);mus+=lp(dr,260)*0.22
bpm=84;beat=60/bpm
for b0 in np.arange(0,END,beat/2):put(b0,tick(),0.06,mus)
for b0 in np.arange(0,END,beat):
    q=np.arange(int(0.4*SR))/SR;k=np.sin(2*np.pi*(48+30*np.exp(-q*30))*q)*np.exp(-q*10);put(b0,k,0.22,mus)
def pluck(f,d=1.0):q=np.arange(int(d*SR))/SR;return (np.sin(2*np.pi*f*q)+0.35*np.sin(2*np.pi*2*f*q))*np.exp(-q*4)*np.minimum(1,q/0.003)
mel=[50,53,57,58,57,53,50,48, 50,53,57,60,58,57,55,53];i=0
for b0 in np.arange(0,END,beat*2):put(b0,pluck(440*2**((mel[i%16]-69)/12)),0.09,mus);i+=1
mus+=np.roll(mus,int(0.33*SR))*0.25
g=np.ones(N);g*=np.minimum(1,t/0.8);g*=np.clip((END-t)/1.5,0,1);g[(t>A(15))&(t<A(16))]*=0.4;mus*=g
wf.write('sfx.wav',SR,(np.clip(bus*0.5,-1,1)*32767).astype(np.int16))
wf.write('amb.wav',SR,(np.clip(amb,-1,1)*32767).astype(np.int16))
wf.write('music.wav',SR,(np.clip(mus*0.6,-1,1)*32767).astype(np.int16))
print('ok',len(E))
