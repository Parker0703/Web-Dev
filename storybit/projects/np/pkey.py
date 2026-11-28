import numpy as np,json,glob,base64,os
from PIL import Image
meta={}
for f in sorted(glob.glob('props/raw_*.png')):
  n=os.path.basename(f)[4:-4]
  a=np.asarray(Image.open(f).convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  d=g-np.maximum(r,b);fg=np.clip(1-(d-12)/33,0,1);bg=d>45;alpha=np.where(bg,0,fg)
  out=a.copy();mx=np.maximum(r,b);out[...,1]=np.where(g>mx,mx+(g-mx)*0.15,g);out[bg]=0
  ys,xs=np.where(alpha>0.5);x0,x1,y0,y1=xs.min()-6,xs.max()+6,ys.min()-6,ys.max()+6
  im=Image.fromarray(np.dstack([out,alpha*255]).clip(0,255).astype(np.uint8)[y0:y1,x0:x1])
  im.save(f'props/{n}.png');meta[n]={'w':int(x1-x0),'h':int(y1-y0)};print(n,meta[n])
open('props/pmeta.js','w').write('const PMETA='+json.dumps(meta)+';const PDATA={'+','.join(f"{n}:'data:image/png;base64,"+base64.b64encode(open(f'props/{n}.png','rb').read()).decode()+"'" for n in meta)+'};')
