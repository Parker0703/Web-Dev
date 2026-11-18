import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(7)
Lw=json.load(open('words.json'))
A=lambda i:Lw[i]['a'];B=lambda i:Lw[i]['b'];WT=lambda i,k:Lw[i]['w'][min(k,len(Lw[i]['w'])-1)]['t']
END=100.9;N=int(END*SR)+SR
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
# ---------- events ----------
E=[]
def ev(t,x,g):E.append((t,x,g))
ev(0.0,bell(5.0),0.45);ev(0.07,whoosh(0.5,250,4000),0.6);ev(0.3,whoosh(0.9,200,1200,False),0.35);ev(0.35,stampS(),0.4)
for i in range(3):
    t0=1.75+i*0.6
    for k in range(10):ev(t0+k*0.15,step(),0.28)
    ev(t0+0.4,whoosh(0.5,300,2500),0.35)
for k,tt in enumerate(np.linspace(2.15,4.4,8)):ev(tt,slam(),0.42)
ev(4.05,shing(),0.4);ev(5.1,sputter(1.2),0.35);ev(5.92,whoosh(0.4,2000,300,False),0.4)
ev(6.32,boom(),0.9);ev(6.32,thunder(3.0),0.6)
ev(A(4),whoosh(0.4,300,3000),0.5);ev(WT(4,2),boom(1.0,120,45),0.75);ev(WT(4,2),stampS(),0.4)
for k in range(8):ev(A(4)+0.2+k*0.32,wetstep(),0.25)
ev(WT(4,10),sting(2.4),0.45);ev(WT(4,10)+0.1,whoosh(1.4,150,700),0.35)
ev(A(5),whoosh(1.6,150,900),0.45);ev(WT(5,3),whoosh(0.35,400,2500),0.35);ev(WT(5,3)+0.1,stampS(),0.3)
ev(A(6),whoosh(0.45,300,3500),0.55);ev(A(6)+1.0,lp(nz(0.3),900)*np.exp(-np.arange(int(0.3*SR))/SR*12),0.15)
ev(A(7),whoosh(2.8,100,500),0.55)
ev(A(8),sputter(1.0),0.3);ev(A(8)+1.05,riser(WT(8,4)+0.25-A(8)-1.05),0.55);ev(WT(8,4)+0.25,boom(1.2,110,40),0.9);ev(WT(8,4)+0.25,slam(0.5),0.6)
for k in range(4):ev(A(9)+0.05+k*0.33,step(),0.3)
ev(WT(10,1),sting(2.0,61.7),0.55);ev(WT(10,3),heart(),0.9);ev(WT(10,4),heart(),0.9)
for tt in [A(11)+0.2,A(11)+0.5,WT(11,3)+0.05]:ev(tt,rip(),0.5)
ev(WT(11,3),pop(),0.4);ev(A(12)+0.3,whoosh(0.35,400,2000),0.3)
for i in range(5):ev(A(13+i),match(),0.5);ev(A(13+i)+0.15,chime(990+i*110,2.0),0.16)
for k in range(4):ev(A(18)+0.15+k*0.28+0.1,slam(),0.5)
for i in range(4):
    for k in range(8):ev(A(18)+i*0.25+k*0.15,step(),0.18)
for k in range(6):ev(A(19)+k*0.34,step(1.5),0.32)
for i in range(5):ev(A(20)+i*0.12,whoosh(0.35,400,3000),0.3)
for i in range(4):ev(A(20)+0.3+i*0.22,whistle(0.55),0.22)
for k in range(4):ev(WT(20,5)+k*0.6,knock(),0.3)
for tt in np.arange(WT(20,5),B(20),0.07):ev(tt,tick(),0.07)
ev(A(22),stampS(),0.7);ev(A(22),boom(0.8,80,40),0.4)
ev(A(23)+0.1,slide(0.7),0.55);ev(A(23)+0.7,whoosh(0.35,400,2000),0.3)
ev(A(24),scratch(A(25)+0.1-A(24)),0.3);ev(A(25),stampS(),0.4);ev(A(25)+0.05,pop(),0.4);ev(A(25)+0.1,hiss(1.0),0.2)
ev(A(26)+0.1,scratch(0.7),0.25);ev(A(26)+0.3,heart(),0.7)
ev(A(27),fire(1.8),0.55);ev(A(27),boom(1.2,100,40),0.75)
for i in range(9):ev(A(28)+i*0.28,whoosh(0.5,500,2500),0.25)
ev(A(28),boom(0.6,90,50),0.4)
ev(A(29),alarm(1.2),0.25);ev(A(29),sting(1.8,82.4),0.5)
ev(A(30)+0.2,slam(0.25),0.3);ev(WT(30,7),whoosh(0.25,1500,5000),0.45);ev(WT(30,7)+0.15,whoosh(0.25,1500,5000),0.45)
ev(A(31),whoosh(0.35,300,4000),0.55);ev(A(31)+0.3,hiss(0.4),0.25);ev(A(31)+0.35,chime(1760,1.0),0.2)
ev(A(32),whoosh(0.35,400,2000),0.3);ev(A(32)+0.1,slide(0.5),0.4)
ev(A(33)+0.6,creak(A(34)-A(33)-0.5),0.35);ev(A(34),pop(),0.5);ev(A(34)+0.05,whoosh(0.4,200,1500),0.3)
ev(A(35),sting(2.2,69.3),0.55);ev(A(35),whoosh(0.3,300,3000),0.45);ev(A(35)+0.05,clank()*0.3,0.3)
ev(A(36),slide(0.7),0.35);ev(A(36)+0.7,scratch(1.6),0.18)
ev(A(37),boom(1.4,95,35),0.85);ev(A(37),scratch(0.6),0.3);ev(A(37),thunder(2.4),0.35)
ev(A(38)+0.1,thunder(3.2),0.7);ev(A(38)+1.3,thunder(2.2),0.4);ev(A(38)+0.4,whoosh(0.35,400,2000),0.25)
rn=lp(hp(nz(A(43)-A(38)+0.5),800),6000);rn*=np.minimum(1,np.arange(len(rn))/SR/0.6)*np.minimum(1,(len(rn)/SR-np.arange(len(rn))/SR)/0.6);put(A(38),norm(rn),0.09,amb)
ev(WT(39,1),stampS(),0.5);ev(WT(39,2),stampS(),0.5)
for tt in np.arange(WT(39,4),A(40),0.09):ev(tt,tick(),0.18)
for i in range(4):ev(A(40)+0.1+i*0.3,whistle(0.5),0.2)
for i in range(6):
    for k in range(9):ev(A(40)+i*0.15+k*0.15,wetstep(),0.12)
for k in range(3):ev(A(41)-0.1+k*0.15,wetstep(),0.25)
ev(A(41)+0.42,bonk(),0.55);ev(A(41)+0.42,slam(0.3),0.4)
ev(A(42)+0.1,bloop(),0.35);ev(A(42)+0.5,bloop(),0.2);ev(WT(42,2),alarm(1.0),0.22);ev(WT(42,2),whoosh(0.5,2000,300,False),0.35)
ev(A(43)+0.3,shing(),0.25);ev(A(44),chime(1480,1.2),0.25);ev(A(44),pop(),0.3)
for k in range(4):ev(A(45)+k*0.2,step(1.6),0.35)
ev(WT(46,1),scrub(WT(46,6)-WT(46,1)),0.32)
for k in range(6):ev(WT(46,5)+k*0.13,step(),0.25)
ev(WT(46,7)+0.1,flashpop(),0.6);ev(WT(46,7)+0.3,sting(1.6,77.8),0.35)
for k in range(8):ev(A(47)+k*0.45,step(),0.2)
ev(A(48),whoosh(0.35,400,2000),0.3)
for tt in [A(49),A(49)+0.45,A(49)+0.9,A(49)+1.4,A(50)]:ev(tt,whoosh(0.35,1200,250,False),0.35);ev(tt,pop(),0.15)
ev(A(50),boom(1.6,60,30),0.45)
ev(WT(51,1),stampS(),0.55);ev(WT(52,0)+0.25,clank(),0.5);ev(A(53)+0.3,scratch(0.45),0.35)
ev(WT(53,4)+0.05,slam(0.4),0.6);ev(WT(53,4)+0.23,stampS(),0.8);ev(WT(53,4)+0.23,gong(4.0),0.55)
ev(A(54),whoosh(1.0,150,800),0.35);ev(WT(55,0),boom(1.2,100,40),0.7);ev(B(56),pop(),0.35)
# shot cut whooshes
for t0 in [A(9),A(11),A(18),A(23),A(32),A(43),A(47),A(51)]:ev(t0,whoosh(0.3,500,3000),0.18)
for t,x,g in E:put(t,x,g)
# wind beds
w=lp(nz(END+1),400,2);w=norm(w)*(0.5+0.5*np.sin(np.arange(len(w))/SR*0.7))
tt=np.arange(len(w))/SR;wm=0.25+0.75*((tt>13)&(tt<23.3))+0.3*((tt>88.9)&(tt<93.9))
put(0,w*wm,0.06,amb)
# ---------- music ----------
mus=np.zeros(N);t=np.arange(N)/SR
dr=np.sin(2*np.pi*36.7*t)+0.6*np.sin(2*np.pi*55*t)+0.3*np.sin(2*np.pi*73.4*t*1.001)
dr*=0.6+0.4*np.sin(2*np.pi*0.11*t)
mus+=lp(dr,300)*0.22
bpm=66;beat=60/bpm
for b0 in np.arange(0.0,END,beat):
    tt=np.arange(int(0.6*SR))/SR;k=np.sin(2*np.pi*(45+30*np.exp(-tt*25))*tt)*np.exp(-tt*9)
    put(b0,k,0.28,mus);put(b0+0.22,k*0.6,0.28,mus)
mel=[74,77,81,76,74,72,69,70, 74,77,82,81,77,76,74,73]
def pluck(f,d=1.6):
    tt=np.arange(int(d*SR))/SR;x=(np.sin(2*np.pi*f*tt)+0.35*np.sin(2*np.pi*2*f*tt)+0.12*np.sin(2*np.pi*3*f*tt*1.003))*np.exp(-tt*3.2);return x*np.minimum(1,tt/0.003)
step8=beat/2;i=0
for b0 in np.arange(0.0,END,step8*2):
    m=mel[i%len(mel)];i+=1
    put(b0,pluck(440*2**((m-69)/12)),0.10,mus)
# echo on plucks
mus+=np.roll(mus,int(0.33*SR))*0.25
# music dynamics: dip during silent cut, swell at end, fade out
g=np.ones(N);g[(t>B(10)-0.1)&(t<A(11))]=0.3;g*=np.minimum(1,t/1.0);g*=np.clip((END-t)/1.2,0,1)
mus*=g
wf.write('sfx.wav',SR,(np.clip(bus*0.5,-1,1)*32767).astype(np.int16))
wf.write('amb.wav',SR,(np.clip(amb,-1,1)*32767).astype(np.int16))
wf.write('music.wav',SR,(np.clip(mus*0.6,-1,1)*32767).astype(np.int16))
print('ok',len(E),np.abs(bus).max(),np.abs(mus).max())
