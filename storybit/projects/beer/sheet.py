import json,sys
from PIL import Image,ImageDraw,ImageFont
m=json.load(open('mids.json'));cols=6;w,h=270,480
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
for part in range(0,len(m),18):
  ch=m[part:part+18];rows=(len(ch)+cols-1)//cols;sh=Image.new('RGB',(w*cols,(h+30)*rows),'#111');d=ImageDraw.Draw(sh)
  for i,(n,tt) in enumerate(ch):
    try:im=Image.open(f'st/{tt:.2f}.jpg').resize((w,h))
    except Exception:continue
    x,y=(i%cols)*w,(i//cols)*(h+30);sh.paste(im,(x,y+30));d.text((x+6,y+4),f'{part+i+1}. {n} {tt:.1f}s',fill='#fff',font=f)
  sh.save(f'sb_{part//18+1}.jpg',quality=85)
