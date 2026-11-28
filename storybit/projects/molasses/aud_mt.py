import numpy as np,wave
SR=44100;D=14.0;n=int(SR*D);out=np.zeros(n);rng=np.random.default_rng(3)
def add(t,x,g=1.0):
    i=int(t*SR);j=min(n,i+len(x));out[i:j]+=x[:j-i]*g
def env(L,a=0.003,d=0.08):
    t=np.arange(int(L*SR))/SR;return np.minimum(1,t/a)*np.exp(-t/d)
def lp(x,k):
    y=np.convolve(x,np.ones(k)/k,'same');return y
def step(soft=1.0):
    L=0.18;x=rng.standard_normal(int(L*SR));x=lp(x,18)*env(L,0.002,0.03)
    t=np.arange(len(x))/SR;x+=np.sin(2*np.pi*90*t)*env(L,0.002,0.04)*0.6;return x*soft
def rustle(L,k=6):
    x=rng.standard_normal(int(L*SR));x=x-lp(x,k);a=np.abs(lp(rng.standard_normal(len(x)),900));a/=a.max();return x*a*np.sin(np.linspace(0,np.pi,len(x)))
def creak(L=0.35,f0=160):
    t=np.arange(int(L*SR))/SR;f=f0+40*np.sin(2*np.pi*3*t);ph=2*np.cumsum(np.pi*f)/SR;x=np.sign(np.sin(ph))*0.3+np.sin(ph*2.01)*0.3
    return lp(x,6)*np.sin(np.linspace(0,np.pi,len(x)))**2
# room tone
out+=lp(rng.standard_normal(n),60)*0.04
k=0;t=0.35+0.147
while t<3.25: add(t,step(0.55+0.1*(k%2)));k+=1;t+=0.294
add(3.25,step(0.45));add(3.86,step(0.35))
add(4.45,rustle(0.6,4),0.25)            # robe as she lowers
add(4.93,step(0.6));add(4.95,creak(0.3,140),0.18)   # weight lands on the stool
add(6.6,rustle(0.4,4),0.18)             # sleeve on the reach
add(7.0,rustle(0.12,3),0.3)             # grab
add(7.9,rustle(0.5,3),0.35)             # unroll
add(9.55,rustle(0.15,3),0.35)           # take jolt
add(10.75,rustle(0.5,3),0.3)            # roll up
add(11.9,rustle(0.6,4),0.25);add(12.0,creak(0.25,170),0.12);add(12.62,step(0.5))
out/=np.abs(out).max();out*=0.5
w=wave.open('mt_sfx.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes());w.close()
