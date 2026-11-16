import numpy as np,json,sys
from PIL import Image
meta={}
for n in ['car_side','truck_side_l','car_front','truck_front']+[f'floppy_{k}' for k in range(9)]:
  a=np.asarray(Image.open(f'veh/raw_{n}.png').convert('RGB')).astype(float)
  r,g,b=a[...,0],a[...,1],a[...,2]
  d=g-np.maximum(r,b)
  key=np.percentile(g[d>60],90)
  bgm=d>45
  fg=np.clip(1-(d-12)/33,0,1)   # 1 = solid, 0 = key
  shadow=np.clip(((key*0.93)-g)/(key*0.6),0,1)*0.85
  alpha=np.where(bgm,shadow,fg)
  out=a.copy()
  # despill
  mx=np.maximum(r,b);out[...,1]=np.where(g>mx,mx+(g-mx)*0.15,g)
  out[bgm]=0
  rgba=np.dstack([out,alpha*255]).clip(0,255).astype(np.uint8)
  solid=fg>0.9
  ys,xs=np.where(solid & ~bgm)
  x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max()
  pad=60;X0=max(0,x0-pad);X1=min(1079,x1+pad);Y0=max(0,y0-10);Y1=min(1919,y1+70)
  Image.fromarray(rgba[Y0:Y1,X0:X1]).save(f'veh/{n}.png')
  meta[n]={'w':int(X1-X0),'h':int(Y1-Y0),'sx0':int(x0-X0),'sx1':int(x1-X0),'gy':int(y1-Y0),'top':int(y0-Y0)}
  if n=='car_front':
    A=alpha[Y0:Y1,X0:X1];hy0,hy1=None,None;xs0,xs1=[],[]
    for yy in range(int(y0-Y0)+5,int((y0-Y0)+(y1-y0)*0.6)):
      row=A[yy];sol=np.where(row>0.5)[0]
      if len(sol)<2: continue
      inner=np.where(row[sol.min():sol.max()]<0.1)[0]
      if len(inner)>50:
        if hy0 is None: hy0=yy
        hy1=yy;xs0.append(sol.min()+inner.min());xs1.append(sol.min()+inner.max())
    meta[n]['hole']=[int(np.median(xs0)),int(hy0),int(np.median(xs1)),int(hy1)]
  print(n,meta[n])
open('veh/meta.js','w').write('const VMETA='+json.dumps(meta)+';')
import base64
with open('veh/data.js','w') as f:
  f.write('const VDATA={'+','.join(f"{n}:'data:image/png;base64,"+base64.b64encode(open(f'veh/{n}.png','rb').read()).decode()+"'" for n in meta)+'};')
