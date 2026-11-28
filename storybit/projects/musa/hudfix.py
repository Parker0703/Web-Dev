import re
s=open('hud.js').read()
s=re.sub(r"const T_SLAM=[^;]*;","const T_SLAM=7.21,T_END=71.66;",s)
s=re.sub(r"const KEY=new Set\(\[.*?\]\);","const KEY=new Set(['IRON','ROD','BRAIN','DIED','60','TOOK','1848','PHINEAS','GAGE','CAREFUL','POLITE','TRUSTS','BLASTING','POWDER','13-POUND','SPARK','CHEEK','EYE','SKULL','TALKING','OX','DOCTOR','BUSINESS','SURVIVES','OFF','GONE','RUDE','IMPATIENT','SWEARING','NONSTOP','FRONTAL','LOBE','CHECK','TWIST','STAGECOACHES','CHILE','ADAPT','HARVARD','ACCIDENT','CHANGED']);",s,flags=re.S)
open('hud.js','w').write(s)
