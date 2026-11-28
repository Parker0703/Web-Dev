import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(7)
Lw=json.load(open('words.json'))
A=lambda i:Lw[i]['a'];B=lambda i:Lw[i]['b'];WT=lambda i,k:Lw[i]['w'][min(k,len(Lw[i]['w'])-1)]['t']
END=103.4;N=int(END*SR)+SR
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
import json
def clash(d=0.5):
    q=np.arange(int(d*SR))/SR;x=sum(np.sin(2*np.pi*f*q)*np.exp(-q*(9+i*3)) for i,f in enumerate([2100,3170,4350,5600,7200]));return norm(x*np.minimum(1,q/0.001)+hp(nz(d),3000)*np.exp(-q*40)*0.8)
def wood(d=0.7):
    q=np.arange(int(d*SR))/SR;return norm(lp(nz(d),900)*np.exp(-q*9)+np.sin(2*np.pi*(110-50*q)*q)*np.exp(-q*12)*1.4+bp(nz(d),1500,5000)*np.exp(-q*22)*0.6)
def taiko(g=1.0,f=70):
    q=np.arange(int(0.7*SR))/SR;return norm(np.sin(2*np.pi*(f+60*np.exp(-q*30))*q)*np.exp(-q*6)+lp(nz(0.7),400)*np.exp(-q*30)*0.5)*g
def koto(f,d=1.6):
    q=np.arange(int(d*SR))/SR;return (np.sin(2*np.pi*f*q)+0.45*np.sin(2*np.pi*2*f*q)+0.2*np.sin(2*np.pi*3*f*q))*np.exp(-q*3.2)*np.minimum(1,q/0.002)
def flute(f,d):
    q=np.arange(int(d*SR))/SR;v=1+0.006*np.sin(2*np.pi*5*q);return (np.sin(2*np.pi*f*v*q)+0.25*np.sin(2*np.pi*2*f*v*q)+bp(nz(d),f*0.9,f*1.2)*0.25)*np.minimum(1,q/0.12)*np.minimum(1,(d-q)/0.25)
def windy(d):return norm(lp(nz(d),500)*(0.6+0.4*np.sin(np.arange(int(d*SR))/SR*0.7)))
def laugh():
    out=np.zeros(int(1.0*SR))
    for k in range(5):q=np.arange(int(0.12*SR))/SR;x=np.sin(2*np.pi*(220+30*(k%2))*q)*(1+0.5*np.sin(2*np.pi*660*q))*np.sin(np.pi*q/0.12);i=int(k*0.17*SR);out[i:i+len(x)]+=x
    return norm(out)
S=lambda t,x,g:put(t,x,g)
# --- hook
S(0.0,laugh(),0.12);S(0.5,bloop(),0.12);S(0.95,bloop(),0.1);S(1.3,whoosh(0.3,600,1500),0.2);S(1.57,step(1.6),0.6);S(1.57,bonk(),0.3);S(1.62,clank(),0.2)
S(1.96,whoosh(0.2,1500,7000),0.4);S(2.06,slam(),0.5);S(2.06,taiko(1),0.6);S(2.32,shing(),0.4);S(2.34,whoosh(0.4,800,5000),0.3);S(2.6,taiko(0.8),0.4)
for k in range(5):S(3.45+k*0.17,step(0.9),0.16)
S(4.29,slam(),0.45);S(4.29,boom(1.0,80,35),0.45);S(4.29,taiko(1),0.6);S(4.33,shing(),0.25);S(4.9,whoosh(0.4,2000,600,False),0.15)
for k in range(12):S(5.78+k*0.095,tick(),0.18)
S(6.95,taiko(1),0.6);S(6.95,slam(),0.3);S(8.5,whoosh(0.5,300,1800),0.18);S(8.9,shing(),0.3);S(9.0,taiko(1),0.5);S(9.25,taiko(0.8),0.4);S(9.6,gong(3.0),0.22)
for k in range(9):S(11.0+k*0.13,step(1.0),0.2)
S(11.0,whoosh(1.2,300,2500),0.25)
# --- castle
S(12.6,gong(3.0),0.2);S(12.9,slam(),0.25)
for k in range(5):S(14.6+k*0.36,step(0.5),0.12)
S(15.9,pop(),0.2);S(17.2,laugh(),0.10);S(18.9,flashpop(),0.2);S(19.1,slide(0.3),0.2);S(20.0,pop(),0.2)
S(20.95,shing(),0.4);S(20.9,riser(0.8),0.25);S(21.97,whoosh(0.3,1500,6000),0.4);S(21.97,slam(),0.5);S(21.99,rip(),0.3);S(22.0,boom(1.2,90,30),0.5)
S(23.3,sting(1.8,55),0.3);S(23.45,slam(),0.4);S(23.4,clank(),0.3)
for k in range(5):S(25.1+k*0.38,step(0.8),0.14)
S(26.45,slam(),0.5);S(26.45,boom(1.0,70,30),0.4)
S(27.2,bell(4.0,196),0.22);S(27.2,windy(3.4),0.10)
for k in range(5):S(30.8+k*0.36,step(0.5),0.12)
S(31.9,pop(),0.2)
# --- the fall
S(32.9,sting(2.0,49),0.22);S(35.5,slam(),0.35);S(36.3,slam(),0.35);S(36.3,knock(),0.3);S(37.1,slam(),0.35);S(37.5,chime(1760,0.5),0.2)
S(37.9,windy(2.2),0.12);S(38.9,slam(),0.3)
S(41.3,heart(),0.3);S(42.2,heart(),0.3)
for k in range(8):S(43.6+k*0.09,step(0.9),0.16)
S(44.5,slam(),0.35);S(45.3,chime(1320,0.8),0.15);S(47.4,whoosh(0.5,400,1800),0.15);S(48.4,bloop(),0.12)
S(49.4,pop(),0.2);S(52.2,laugh(),0.12);S(53.4,laugh(),0.12);S(53.0,chime(1568,0.5),0.12);S(54.2,chime(1760,0.5),0.12)
S(55.3,bonk(),0.25);S(57.0,sting(1.2,61),0.18);S(58.5,slide(0.6),0.12)
# --- the night
S(59.95,windy(7.5),0.22);S(60.1,slam(),0.25);S(60.0,bell(4,147),0.2)
for k in range(10):S(61.9+k*0.26,step(0.7),0.13)
S(64.7,taiko(1),0.5);S(65.5,taiko(0.8),0.4);S(66.0,taiko(1),0.5);S(66.35,taiko(1),0.55);S(66.6,taiko(1),0.6);S(66.8,taiko(1),0.6);S(66.95,taiko(1),0.65);S(67.1,taiko(1),0.7);S(66.0,riser(1.3),0.3)
# --- the raid
S(67.5,whoosh(0.3,300,1500),0.3);S(67.77,wood(),0.9);S(67.77,boom(1.2,80,30),0.6);S(68.1,wood(0.9),0.7);S(68.12,slam(),0.5)
S(68.8,whoosh(0.5,500,3000),0.35);S(69.42,step(1.3),0.4);S(69.5,whoosh(0.6,400,5000),0.45);S(69.55,shing(),0.3)
S(70.15,clash(0.7),0.9);S(70.15,slam(),0.5);S(70.45,clash(0.4),0.5);S(70.93,whoosh(0.25,2000,7000),0.5);S(70.93,clash(0.5),0.7);S(70.95,boom(1.0,90,35),0.6);S(71.3,step(1.4),0.4)
for k in range(6):S(70.8+k*0.22,clash(0.25),0.22)
for k in range(5):S(71.35+k*0.14,step(0.9),0.2)
S(71.92,whoosh(0.25,1500,6000),0.45);S(71.94,clash(0.4),0.6);S(72.0,rip(),0.5);S(72.05,wood(0.5),0.4)
S(72.9,sting(1.6,55),0.2);S(74.0,hiss(0.8),0.08);S(74.8,creak(1.2),0.3);S(75.2,heart(),0.4);S(76.0,heart(),0.4);S(76.6,slam(),0.5);S(76.6,boom(1.2,70,30),0.5)
# --- after
S(77.7,windy(4.5),0.16);S(77.8,bell(4,131),0.22)
for k in range(7):S(77.9+k*0.34,step(0.6),0.1)
S(80.3,clank(),0.15);S(80.5,clank(),0.12);S(82.0,gong(3.5),0.2);S(84.9,bell(3.5,196),0.2)
S(86.2,chime(1047,2.0),0.14);S(86.5,slam(),0.2);S(89.4,match(),0.15);S(91.3,bell(4,147),0.2);S(92.1,slam(),0.3)
# --- music: sparse koto + shakuhachi, taiko pulse in the raid
mus=np.zeros(N);t=np.arange(N)/SR
D=[62,65,67,69,72,74,77,79];hz=lambda m:440*2**((m-69)/12)
def section(t0,t1,bpm,pat,g,oct=0):
    b=60/bpm;i=0;x=t0
    while x<t1:
        m=pat[i%len(pat)]
        if m is not None:put(x,koto(hz(D[m]+oct)),g,mus)
        x+=b;i+=1
section(0,2.0,150,[0,2,4,2,5,4,2,0],0.10,12)
section(3.4,12.4,84,[0,None,4,None,2,None,5,4],0.11)
section(12.6,20.5,96,[4,5,4,2,0,None,2,None],0.10,12)
section(23.3,33,60,[0,None,2,None,1,None,0,None],0.10)
section(33,49,72,[0,None,1,None,0,None,2,1],0.10)
section(49.3,58,132,[0,2,4,5,4,2,5,7],0.09,12)
section(59.95,67.2,60,[0,None,None,1,None,None,0,None],0.12)
section(77.7,94.5,66,[0,None,2,None,4,None,2,1],0.11)
for t0,m,d in [(27.2,69,3.0),(33.0,65,2.2),(60.2,62,3.2),(63.6,65,3.0),(77.9,69,3.5),(82.2,67,2.6),(86.3,74,3.5),(90.0,72,3.5)]:put(t0,flute(hz(m),d),0.07,mus)
for k,x in enumerate(np.arange(20.6,23.2,0.3)):put(x,taiko(1,60),0.35,mus)
for k,x in enumerate(np.arange(67.35,72.9,0.214)):put(x,taiko(1,62 if k%4 else 50),0.42 if k%2==0 else 0.26,mus)
for x in np.arange(67.35,72.9,0.107):put(x,norm(hp(nz(0.05),5000))*0.5,0.05,mus)
dr=np.sin(2*np.pi*36.7*t)*0.5+np.sin(2*np.pi*73.4*t)*0.25;env_=np.zeros(N);
for a,b,g in [(20.6,27,0.10),(59.9,77.6,0.12),(74.8,77.6,0.1)]:env_+=g*np.clip((t-a)/1.0,0,1)*np.clip((b-t)/1.0,0,1)
mus+=dr*env_
mus*=np.clip((94.6-t)/1.2,0,1)
put(0,windy(12.5),0.05,amb);put(59.9,windy(18),0.08,amb);put(77.6,windy(17),0.05,amb)
wf.write('sfx.wav',SR,(np.clip(bus*0.5,-1,1)*32767).astype(np.int16));wf.write('amb.wav',SR,(np.clip(amb,-1,1)*32767).astype(np.int16));wf.write('music.wav',SR,(np.clip(mus*0.6,-1,1)*32767).astype(np.int16))
