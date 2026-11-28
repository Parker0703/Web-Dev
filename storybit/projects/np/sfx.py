import numpy as np, json, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(7)
Lw=json.loads(open('data.js').read().split('const L=')[1].split(';const END')[0])
A=lambda i:Lw[i]['a'];B=lambda i:Lw[i]['b'];WT=lambda i,k:Lw[i]['w'][min(k,len(Lw[i]['w'])-1)]['t']
END=97.2;N=int(END*SR)+SR
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
def tw(word,n=0):
    k=0
    for l in Lw:
        for w in l['w']:
            if ''.join(ch for ch in w['x'].lower() if ch.isalnum())==word:
                if k==n:return w['t']
                k+=1
    raise Exception(word)
def blip8(f=660,d=0.09):t=np.arange(int(d*SR))/SR;return norm(np.sign(np.sin(2*np.pi*f*t))*np.exp(-t*25))
def hurt(t):ev(t,blip8(330,0.12),0.2);ev(t+0.06,blip8(220,0.14),0.2);ev(t,boom(0.5,120,60),0.3)
def gain8(t):[ev(t+k*0.07,blip8(523*2**(k*4/12),0.08),0.12) for k in range(3)]
def stab(t):ev(t,whoosh(0.18,800,4000),0.25);ev(t+0.12,boom(0.25,140,70),0.35)
def drum(t,g=0.5):ev(t,boom(0.9,70,40),g)
def saveS(t):ev(t,chime(1568,0.6),0.18);ev(t+0.08,chime(2093,0.6),0.14);ev(t,pop(),0.15)
def loadS(t):ev(t,whoosh(0.7,3000,250,False),0.35);ev(t,glitch(0.35),0.25);ev(t+0.1,roll(0.5),0.15)
def lifeS(t):ev(t,gong(),0.35);ev(t,whoosh(0.8,300,2500),0.2)


ev(0.0,lp(nz(9),900)*0.3,0.2)
for k in range(4):drum(0.3+k*0.6,0.25)
ev(A(2),chime(1047,1.0),0.15);ev(A(2),pop(),0.15)
ev(A(3),gong(),0.2)
ev(WT(4,3)-0.05,boom(1.4,70,30),0.45);hurt(WT(4,3)+0.1)
ev(A(5),riser(0.6),0.15);ev(A(5)+0.25,chime(1568,1.0),0.15);ev(A(5)+0.3,whoosh(0.6,400,3000),0.15)
ev(A(6),whoosh(0.5),0.15)
ev(WT(8,0),stampS(),0.15);ev(WT(8,5),pop(),0.15)
ev(WT(8,7),whoosh(0.4,300,3000),0.2);saveS(WT(8,7)+0.1)
ev(A(9),chime(1319,1.0),0.15);ev(A(10),stampS(),0.2);ev(A(11),gong(),0.2)
for k in range(8):ev(A(11)+k*0.4,step(1),0.08)
ev(A(12),chime(1047,1.2),0.18);gain8(A(12))
lifeS(A(13))
ev(A(14)+0.4,whoosh(0.5),0.12)
for k in range(10):drum(A(15)+k*0.4,0.3 if k%2 else 0.4)
for k in range(6):ev(WT(15,6)+k*0.08,blip8(660,0.06),0.05)
ev(A(16),sting(1.2),0.1);ev(A(18),fire(2.5),0.35)
ev(A(19),lp(nz(3.0),1200)*0.8,0.3);ev(A(19),whoosh(2.0,800,300,False),0.2)
for k in range(5):ev(A(20)+k*0.3,blip8(330,0.06),0.05)
ev(A(21),boom(2.0,50,22),0.4);ev(A(21),blip8(220,0.3),0.2);ev(A(21)+0.1,blip8(165,0.4),0.2)
ev(A(22),riser(0.6),0.15);ev(A(22)+0.25,chime(1568,1.0),0.15);ev(A(23),stampS(),0.15)
ev(A(24),whoosh(0.4),0.12);ev(WT(24,3),stampS(),0.2)
for k in range(5):ev(A(25)+0.3+k*0.3,pop(),0.12)
ev(A(26),sting(1.0),0.12)
for k in [0.1,0.5]:ev(A(27)+k,boom(1.0,80,35),0.35)
hurt(A(28)+0.15);ev(A(29),lp(nz(2.0),500)*0.5,0.1)
ev(A(30),riser(0.6),0.15);ev(A(30)+0.25,chime(1568,1.0),0.15);ev(tw('now'),boom(1.6,50,22),0.35)
ev(A(31),gong(),0.25);ev(A(31),lp(nz(4),3000)*0.5,0.15)
ev(A(32),lp(nz(4.0),3000)*0.6,0.14)
for k in range(10):ev(WT(32,9)+k*0.12,clank()*0.15,0.04)
for k in range(8):drum(A(33)+k*0.45,0.3)
ev(A(34),sting(1.2),0.12)
for t0 in [WT(35,2),WT(35,2)+0.6,WT(35,5)]:ev(t0,boom(1.2,80,35),0.4)
for k in range(8):ev(A(35)+0.3+k*0.3,step(1),0.1)
ev(WT(36,3),slam(),0.3);ev(WT(36,3),whoosh(0.6),0.2)
ev(WT(37,1)-0.1,gong(),0.35);gain8(WT(37,1))
ev(A(38),sting(1.0),0.1)
for k in range(7):ev(WT(39,4)-0.6+k*0.22,stampS(),0.15)
for k in range(8):drum(A(40)+k*0.35,0.25)
ev(A(41),riser(0.6),0.15);ev(A(41)+0.25,chime(1568,1.0),0.15)
ev(A(42),blip8(440,0.1),0.15);ev(A(42)+0.6,blip8(660,0.1),0.15);ev(A(42)+0.62,pop(),0.12)
ev(A(44),chime(784,2.0),0.1);ev(A(45),chime(988,2.0),0.1)
ev(WT(46,5),stampS(),0.2);ev(WT(47,5),pop(),0.2);ev(WT(47,5),chime(523,2.0),0.12)
for t,x,g in E:put(t,x,g)
w=lp(nz(END+1),300,2);put(0,norm(w)*0.5,0.03,amb)
# music: dark Roman epic — drone, war drums, D minor plucks + low horn swells
mus=np.zeros(N);t=np.arange(N)/SR
dr=np.sin(2*np.pi*36.7*t)+0.6*np.sin(2*np.pi*55*t)+0.3*np.sin(2*np.pi*73.4*t*1.002);dr*=0.6+0.4*np.sin(2*np.pi*0.07*t);mus+=lp(dr,240)*0.24
bpm=72;beat=60/bpm
for i,b0 in enumerate(np.arange(0,END,beat)):
    q=np.arange(int(0.5*SR))/SR;k=np.sin(2*np.pi*(42+40*np.exp(-q*25))*q)*np.exp(-q*8);put(b0,k,0.24 if i%4==0 else 0.12,mus)
    if i%4==3:put(b0+beat*0.5,k,0.1,mus)
def pluck(f,d=1.2):q=np.arange(int(d*SR))/SR;return (np.sin(2*np.pi*f*q)+0.4*np.sin(2*np.pi*2*f*q)+0.15*np.sin(2*np.pi*3*f*q))*np.exp(-q*3.5)*np.minimum(1,q/0.003)
mel=[62,65,69,70,69,65,64,62, 62,65,69,72,70,69,67,65];i=0
for b0 in np.arange(0,END,beat*2):put(b0,pluck(440*2**((mel[i%16]-69)/12)),0.08,mus);i+=1
def horn(f,d=4.0):q=np.arange(int(d*SR))/SR;x=sg.sawtooth(2*np.pi*f*q)+sg.sawtooth(2*np.pi*f*1.005*q);return lp(x,700)*np.sin(np.pi*q/d)
for b0,f in [(A(3),73.4),(A(11),87.3),(A(15),69.3),(A(31),65.4),(A(35),73.4),(A(37),87.3)]:put(b0,horn(f),0.06,mus)
mus+=np.roll(mus,int(0.3*SR))*0.22
g=np.ones(N);g*=np.minimum(1,t/0.8);g*=np.clip((END-t)/1.5,0,1)
for a,b,k in [(A(21)-0.1,A(22),0.35),(A(42)-0.1,A(43),0.4),(A(46),END,0.6)]:g[(t>a)&(t<b)]*=k
mus*=g
wf.write('sfx.wav',SR,(np.clip(bus*0.5,-1,1)*32767).astype(np.int16))
wf.write('amb.wav',SR,(np.clip(amb,-1,1)*32767).astype(np.int16))
wf.write('music.wav',SR,(np.clip(mus*0.6,-1,1)*32767).astype(np.int16))
print('ok',len(E))
