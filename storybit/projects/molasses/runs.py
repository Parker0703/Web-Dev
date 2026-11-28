import numpy as np, scipy.io.wavfile as w
sr,x=w.read('voice16.wav'); x=x.astype(float)/32768
hop=160; win=400
n=(len(x)-win)//hop
rms=np.array([np.sqrt(np.mean(x[i*hop:i*hop+win]**2)) for i in range(n)])
db=20*np.log10(rms+1e-9)
thr=db.max()-38
v=db>thr
# runs, merging gaps < 0.18s
runs=[];i=0
while i<n:
  if v[i]:
    j=i
    while j<n and v[j]: j+=1
    runs.append([i,j]); i=j
  else: i+=1
m=[]
for r in runs:
  if m and (r[0]-m[-1][1])*0.01<0.16: m[-1][1]=r[1]
  else: m.append(r)
m=[r for r in m if (r[1]-r[0])>4]
for a,b in m:
  gap=''
  print(f"{a*0.01:7.2f} {b*0.01:7.2f} dur {(b-a)*0.01:5.2f}")
np.save('db.npy',db)
