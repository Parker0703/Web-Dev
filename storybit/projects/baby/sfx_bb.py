import numpy as np, scipy.signal as sg, scipy.io.wavfile as wf
SR=44100;rng=np.random.default_rng(11);END=79.4;N=int(END*SR)+SR
bus=np.zeros(N);mus=np.zeros(N)
def nz(d):return rng.standard_normal(int(d*SR))
def tt(d):return np.arange(int(d*SR))/SR
def bp(x,lo,hi,o=2):b,a=sg.butter(o,[lo/(SR/2),min(hi/(SR/2),0.99)],'band');return sg.lfilter(b,a,x)
def lp(x,f,o=2):b,a=sg.butter(o,f/(SR/2));return sg.lfilter(b,a,x)
def hp(x,f,o=2):b,a=sg.butter(o,f/(SR/2),'high');return sg.lfilter(b,a,x)
def norm(x):return x/(np.max(np.abs(x))+1e-9)
def put(t,x,g=1.0,tgt=None):
    tgt=bus if tgt is None else tgt;i=int(t*SR);n=min(len(x),len(tgt)-i)
    if n>0:tgt[i:i+n]+=x[:n]*g
def whoosh(d=0.5,lo=300,hi=3000,up=True):
    x=nz(d);n=len(x);out=np.zeros(n);bl=1024
    for s in range(0,n,bl):
        p=s/n;f=lo*(hi/lo)**(p if up else 1-p);seg=bp(x[s:s+bl],max(60,f*0.6),f*1.4,1);out[s:s+len(seg)]=seg
    return norm(out*np.sin(np.pi*np.linspace(0,1,n))**1.5)
def boom(d=1.4,f0=90,f1=35):
    t=tt(d);f=f1+(f0-f1)*np.exp(-t*6);return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*3.2)+lp(nz(d),400)*np.exp(-t*14)*0.6)
def slam(d=0.35):t=tt(d);return norm(lp(nz(d),1800)*np.exp(-t*30)+np.sin(2*np.pi*75*t)*np.exp(-t*14)*1.4)
def pop(f=600,d=0.12):t=tt(d);return norm(np.sin(2*np.pi*(f+f*2*np.exp(-t*60))*t)*np.exp(-t*40))
def chime(f=880,d=1.6):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,3),(2.01,0.4,5),(3.0,0.25,7),(4.2,0.12,9)]))
def glitch(d=0.35):
    t=tt(d);sq=np.sign(np.sin(2*np.pi*(180+900*rng.random())*t));chop=(np.floor(t*60)%2)
    return norm((sq*0.5+bp(nz(d),800,5000)*0.8)*chop*np.exp(-t*4))
def blip(f=1200,d=0.09):t=tt(d);return norm(np.sign(np.sin(2*np.pi*f*t))*0.4*np.exp(-t*30))
def clink(f=2600,d=0.6):t=tt(d);return norm(sum(g*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r,g,k in [(1,1,9),(1.51,0.7,12),(2.32,0.5,16),(3.7,0.3,20)])+hp(nz(d),4000)*np.exp(-t*90)*0.4)
def thunk(d=0.3):t=tt(d);return norm(np.sin(2*np.pi*(110*np.exp(-t*8)+50)*t)*np.exp(-t*18)+lp(nz(d),900)*np.exp(-t*40)*0.5)
def pat(d=0.08):t=tt(d);return norm(lp(nz(d),700)*np.exp(-t*60))
def splash(d=0.7):t=tt(d);return norm(bp(nz(d),900,7000)*np.exp(-t*7)*(1-np.exp(-t*200)))
def zap(d=0.9):t=tt(d);f=600+1800*(1-np.exp(-t*5));return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*2.5)*0.6+np.sin(2*np.pi*np.cumsum(f*1.5)/SR)*np.exp(-t*3)*0.3)
def shimmer(d=1.6,f=1200):
    t=tt(d);x=np.zeros(len(t))
    for i in range(10):
        o=i*0.07;m=t>=o;x[m]+=np.sin(2*np.pi*f*(1+i*0.12)*(t[m]-o))*np.exp(-(t[m]-o)*5)
    return norm(x)
def rumble(d=1.6):t=tt(d);return norm(lp(nz(d),160,3)*(0.6+0.4*np.sin(2*np.pi*9*t))*np.minimum(1,t/0.1)*np.minimum(1,(d-t)/0.4))
# ---------------- SFX keyed to the voice ----------------
put(0.0,boom(1.6,110,32),0.9);put(0.0,whoosh(0.6,200,4000),0.5)
put(0.67,glitch(0.4),0.45)
for t0 in [1.67,1.77,2.16]:put(t0,glitch(0.3),0.35)
put(3.92,thunk(),0.8);put(3.95,boom(1.0,70,30),0.5)
put(5.45,slam(),0.9);put(5.45,whoosh(0.35,400,2500),0.35)
put(8.6,whoosh(0.8,500,5000),0.4);put(9.0,shimmer(1.0,1600),0.18)
put(10.3,pop(700),0.4);put(10.4,chime(1046,1.4),0.25)
for i,t0 in enumerate([11.9,12.15,12.4]):put(t0,pat(),0.5)
put(12.94,chime(1318,1.2),0.25)
put(13.76,whoosh(0.9,3000,200,False),0.5);put(13.8,boom(1.2,60,28),0.45)
put(14.85,blip(1500),0.3);put(15.1,blip(1800),0.25)
for i in range(5):put(17.65+i*0.12,pop(500+i*90),0.3)
put(20.05,pop(380,0.2),0.4)
put(22.5,chime(1568,1.0),0.3);put(21.4,shimmer(1.0,1400),0.15)
for i in range(6):put(23.7+i*0.38,chime(1760+i*110,0.8),0.12)
put(26.35,whoosh(1.2,200,1200),0.3);put(29.19,shimmer(1.6,1000),0.3);put(30.93,chime(784,1.4),0.25)
for i in range(2):put(32.5+i*0.22,blip(900,0.15),0.35)
put(32.55,boom(0.9,90,40),0.4)
for t0 in [33.7,34.4,35.1]:put(t0,clink(900,0.4),0.25)
put(36.0,whoosh(2.6,300,6000),0.3)
for i in range(9):put(40.8+i*0.09,pop(800+i*60),0.22)
put(43.97,shimmer(0.8,1600),0.15);put(45.13,glitch(0.6),0.45)
put(47.1,rumble(2.4),0.45)
put(50.5,pop(450),0.3);put(53.55,whoosh(0.4,300,1500),0.3);put(53.85,thunk(),0.6);put(54.3,pop(300,0.2),0.35)
put(55.5,pop(650),0.3)
for i in range(6):put(57.4+i*0.14,whoosh(0.35,2500,600,False),0.15)
put(59.2,shimmer(1.4,900),0.2)
for i in range(4):put(61.51+i*0.18,blip(1300+i*200,0.1),0.3)
put(66.2,whoosh(0.5,600,3000),0.35);put(67.42,pop(420,0.2),0.4)
put(68.49,boom(1.6,80,30),0.6);put(68.5,whoosh(1.0,150,1500),0.25)
put(71.65,zap(),0.4);put(71.9,shimmer(1.8,1300),0.3)
put(74.7,shimmer(1.6,700),0.25)
put(76.82,whoosh(0.35,800,4000),0.35);put(77.17,clink(2600),0.55);put(77.17,splash(),0.35);put(77.62,clink(3100,0.4),0.35)
put(78.2,clink(1800,0.9),0.25);put(78.25,boom(1.4,55,25),0.35)
# ---------------- music: gentle music-box lullaby, darker in the brain section, warm at the end ----------------
BPM=84;beat=60/BPM
def pluck(f,d=1.2):t=tt(d);return np.sin(2*np.pi*f*t)*np.exp(-t*3.2)+0.3*np.sin(2*np.pi*f*2*t)*np.exp(-t*6)+0.12*np.sin(2*np.pi*f*3.01*t)*np.exp(-t*9)
def pad(fs,d):t=tt(d);x=sum(np.sin(2*np.pi*f*t+np.sin(2*np.pi*0.3*t)*0.3)+0.5*np.sin(2*np.pi*f*1.003*t) for f in fs);return lp(x,1200)*np.minimum(1,t/0.6)*np.minimum(1,(d-t)/0.6)
def bass(f,d):t=tt(d);return np.sin(2*np.pi*f*t)*np.exp(-t*2.2)
hz=lambda m:440*2**((m-69)/12)
# chord progressions (midi roots)
warm=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]      # Am F C G
dark=[[57,60,64],[56,60,63],[53,57,60],[52,56,59]]      # Am Ab F E
def section(t0,t1,prog,mel,g=1.0,arp=True):
    bar=4*beat;t=t0;i=0
    while t<t1-0.2:
        ch=prog[i%len(prog)];d=min(bar,t1-t)
        put(t,pad([hz(m) for m in ch],d+0.6),0.05*g,mus);put(t,bass(hz(ch[0]-12),d),0.22*g,mus)
        if arp:
            for k in range(8):
                tk=t+k*beat/2
                if tk<t1-0.1:m=ch[[0,1,2,1,0,2,1,2][k]]+12+(12 if mel and k in (3,7) else 0);put(tk,pluck(hz(m),1.0),0.10*g,mus)
        t+=bar;i+=1
section(0.0,4.9,dark,False,0.9,arp=False)
section(4.9,14.7,warm,True,1.0)
section(14.7,31.7,warm,True,0.85)
section(31.7,50.2,dark,True,0.9)
section(50.2,68.4,warm,True,0.8)
section(68.4,74.6,dark,False,0.9,arp=False)
section(74.6,79.4,warm,True,0.75)
# soft kick pulse in the busy middle
for k in range(int((50.2-31.7)/beat)):put(31.7+k*beat,lp(boom(0.4,70,40),300),0.08,mus)
fadeN=int(1.3*SR);e=int(78.1*SR);mus[e:e+fadeN]*=np.linspace(1,0,fadeN);mus[e+fadeN:]=0
for nm,x in [('sfx.wav',bus),('music.wav',mus)]:
    x=x/ (np.max(np.abs(x))+1e-9)*0.8;wf.write(nm,SR,(x*32767).astype(np.int16))
print('ok')
