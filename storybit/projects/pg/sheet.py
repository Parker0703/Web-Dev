import sys
from PIL import Image
fs=sys.argv[2:];out=sys.argv[1]
ims=[Image.open(f).resize((405,720)) for f in fs]
n=len(ims);cols=min(4,n);rows=(n+cols-1)//cols
S=Image.new('RGB',(cols*405,rows*720))
for i,im in enumerate(ims):S.paste(im,((i%cols)*405,(i//cols)*720))
S.save(out,quality=85)
