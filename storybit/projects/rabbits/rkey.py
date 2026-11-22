import numpy as np,json,glob,base64,os,io
from PIL import Image
K=0.7;meta={};data={};gy={}
def key(f):
  a=np.asarray(Image.open(f).convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  d=g-np.maximum(r,b);fg=np.clip(1-(d-12)/33,0,1);bg=d>45;alpha=np.where(bg,0,fg)
  out=a.copy();mx=np.maximum(r,b);out[...,1]=np.where(g>mx,mx+(g-mx)*0.15,g);out[bg]=0;return out,alpha
for f in sorted(glob.glob('rprops/raw_rb_*_sit_*.png')):
  out,al=key(f);ys,xs=np.where(al>0.5);gy[f.split('_')[-1][:-4]]=ys.max()-4
for f in sorted(glob.glob('rprops/raw_rb_*.png')):
  n=os.path.basename(f)[4:-4];vw=n.split('_')[-1];out,al=key(f)
  ys,xs=np.where(al>0.5);x0,x1,y0,y1=xs.min()-4,xs.max()+4,ys.min()-4,max(ys.max()+4,gy[vw]+4)
  from PIL import ImageFilter
  am=Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(0.8));ol=np.asarray(am).astype(float)/255
  fa=al+ol*(1-al);oc=np.array([11,11,13],float);comp=(out*al[...,None]+oc*(ol*(1-al))[...,None])/np.maximum(fa,1e-4)[...,None]
  x0-=4;y0-=4;x1+=4;y1+=4
  im=Image.fromarray(np.dstack([comp,fa*255]).clip(0,255).astype(np.uint8)[y0:y1,x0:x1])
  w,h=int(im.width*K),int(im.height*K);im=im.resize((w,h),Image.LANCZOS)
  buf=io.BytesIO();im.save(buf,'WEBP',quality=90);data[n]='data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode()
  meta[n]={'w':w,'h':h,'ax':round((540-x0)*K,1),'ay':round((gy[vw]-y0)*K,1)}
open('rprops/rmeta.js','w').write('const RMETA='+json.dumps(meta)+';const RDATA='+json.dumps(data)+';')
print(len(meta),gy,os.path.getsize('rprops/rmeta.js'))
