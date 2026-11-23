import numpy as np,json,glob,base64,os,io,math
from PIL import Image,ImageFilter
# key the green-screen renders → ink-outlined RGBA sprites with the model origin as anchor + pixels-per-unit
meta={}
def key(f):
  a=np.asarray(Image.open(f).convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  if 'poplar' in f:
    d=np.minimum(r,b)-g;fg=np.clip(1-(d-12)/33,0,1);bg=d>45;alpha=np.where(bg,0,fg);out=a.copy();out[bg]=0;return out,alpha
  d=g-np.maximum(r,b);fg=np.clip(1-(d-12)/33,0,1);bg=d>45;alpha=np.where(bg,0,fg)
  out=a.copy();mx=np.maximum(r,b);out[...,1]=np.where(g>mx,mx+(g-mx)*0.15,g);out[bg]=0;return out,alpha
def proj(cm,P):
  c=np.array(cm['c'],float);az,el=cm['az'],cm['el'];ev=np.array([math.cos(el)*math.cos(az),math.sin(el),math.cos(el)*math.sin(az)])
  fv=math.tan(math.radians(9));dist=cm['r']/fv/(1080/1920)*1.05;E=c+ev*dist;F=(c-E)/np.linalg.norm(c-E);R=np.cross(F,[0,1,0]);R/=np.linalg.norm(R);U=np.cross(R,F);d=np.array(P,float)-E
  x,y,z=d@R,d@U,d@F;fp=960/fv;return 540+x/z*fp,960-y/z*fp,fp/z
for f in sorted(glob.glob('vh/raw_*.png')):
  n=os.path.basename(f)[4:-4];cm=json.load(open(f'vh/cam_{n}.json'));out,al=key(f)
  if al.max()<0.5:continue
  ox,oy,ppu=proj(cm,[0,0,0]);ys,xs=np.where(al>0.5)
  am=Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(0.7));ol=np.asarray(am).astype(float)/255
  fa=al+ol*(1-al);oc=np.array([14,13,16],float);comp=(out*al[...,None]+oc*(ol*(1-al))[...,None])/np.maximum(fa,1e-4)[...,None]
  x0=max(0,xs.min()-8);y0=max(0,ys.min()-8);x1=min(1080,xs.max()+8);y1=min(1920,ys.max()+8)
  im=Image.fromarray(np.dstack([comp,fa*255]).clip(0,255).astype(np.uint8)[y0:y1,x0:x1])
  KK=min(1.0,760/max(im.width,im.height));w,h=max(1,int(im.width*KK)),max(1,int(im.height*KK));im=im.resize((w,h),Image.LANCZOS)
  buf=io.BytesIO();im.save(buf,'WEBP',quality=88)
  meta[n]={'w':w,'h':h,'ax':round((ox-x0)*KK,1),'ay':round((oy-y0)*KK,1),'ppu':round(ppu*KK,3),'src':'data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode()}
open('vh/vmeta.js','w').write('const VM='+json.dumps(meta)+';')
print(len(meta),os.path.getsize('vh/vmeta.js')//1024,'KB')
