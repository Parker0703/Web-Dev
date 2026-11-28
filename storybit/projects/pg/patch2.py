p='rn_shots.js';s=open(p).read()
i=s.index("// ---------- HOOK ----------");j=s.index("// ---------- 1701 ----------")
new=open('opening.js').read()
s=s[:i]+new+s[j:]
def R(a,b):
    global s
    assert a in s,a[:70]; s=s.replace(a,b)
R("cam(c,'hall_asano',{z:lerp(1.0,1.26,eo(u/d)),y:840,r:lerp(0,-0.05,k)});\n  const r=who(c,'asano',[0.6,0,-6],","cam(c,'hall_asano',{z:lerp(1.0,1.12,eo(u/d)),x:600,y:1000,r:lerp(0,-0.04,k)});\n  const r=who(c,'asano',[0.95,0,-4.5],")
R("who(c,'kira',[-0.55-rec*0.3,0,-6]","who(c,'kira',[-0.3-rec*0.3,0,-6]");R("who(c,'asano',[lerp(1.3,0.3,k),0,-6]","who(c,'asano',[lerp(1.5,0.62,k),0,-6]")
R("['roninA',[-1.3,0,1.2],X('dot','angry','flat',{f:1,blur:2","['roninA',[-2.2,0,-1.6],X('dot','angry','flat',{f:1");R("['roninC',[1.35,0,1.0],X('dot','angry','flat',{f:-1,blur:2","['roninC',[0.9,0,-1.8],X('dot','angry','flat',{f:-1")
R("const r=who(c,'oishi',[0,0,2.6],X('dot','angry',u>1.2?'shout':'flat',{f:1,view:'front',hf:[40,K3(u-0.9,0.4,60,-96)],hb:[-26,70]}));","const r=who(c,'oishi',[-0.7,0,-0.4],X('dot','angry',u>1.2?'shout':'flat',{f:1,view:'front',hf:[40,lerp(60,-100,back(clamp((u-0.9)/0.3)))],hb:[-26,70]}));")
R("cam(c,'snow_oishi',{z:K3(u,d,1.16,1.04),x:540,y:900});","cam(c,'snow_oishi',{z:K3(u,d,1.2,1.06),x:540,y:1040});")
R("['roninC',[-0.6,0,-2.2],X('dot','angry','flat',{f:1,...RUN(u,12,2),hf:[26,20],propF:spear(0.5)})]","['roninC',[0.25,0,-3.3],X('dot','angry','shout',{f:1,...RUN(u,12,2),...two(1,0.3)})]")
R("['roninA',[-0.9,0,-7.2-u*1.2],X('dot','angry','shout',{f:1,view:'front',...RUN(u,13),hf:[40,-60],hb:[60,-70],propF:mallet(0.3)})]","['roninA',[-0.7,0,-7.2-u*1.2],X('dot','angry','shout',{f:1,view:'front',...RUN(u,13),...two(1,0.5)})]")
R("['roninB',[1.2,0,-6.6-u*1.4],","['roninB',[-0.2,0,-6.7-u*0.9],")
R("return [x0,3.6+Math.sin(q*Math.PI)*0.45-q*q*3.6,-6.2-q*1.2];","return [x0,3.45+Math.sin(q*Math.PI)*0.25-q*q*2.6,-6.2-q*0.8];")
R("if(p2>0)who(c,'roninB',arc(p2,-8.9),X('dot','angry','shout',{f:1,crouch:p2<1?30:0,lean:0.3,rot:p2<1?p2*0.5:0,stance:p2<1?30:22,...two(1,-0.4,40,-50)}));","if(p2>0)who(c,'roninB',arc(p2,-9.1),X('dot','angry','shout',{f:1,crouch:40,lean:0.3,rot:clamp(p2)*0.5,stance:30,...two(1,1.5,44,30)}));")
R("const r=who(c,'roninC',arc(p1,-7.4),X('dot','angry','shout',{f:1,crouch:p1<1?34:lerp(40,0,clamp((p1-1)*3)),lean:0.3,rot:p1<1?p1*0.6:0,stance:p1<1?30:26,...two(1,p1<1?-0.5:1.0,44,p1<1?-56:4)}));","const r=who(c,'roninC',arc(p1,-8.0),X('dot','angry','shout',{f:1,crouch:40,lean:0.3,rot:clamp(p1)*0.6,stance:30,...two(1,1.4,44,30)}));")
R("if(r&&p1<1)slash(c,r.hf.x,r.hf.y,220,-2.8,-0.6,u/0.5);","")
R("const p1=u/0.62,p2=(u-0.22)/0.62;","const p1=(u-0.12)/0.62,p2=(u-0.3)/0.62;")
R("const k=eo(u/0.6),x=lerp(-7.6,-11.4,k);\n  who(c,'captain',[0,0,-13.6],","const k=eo(u/0.6),x=lerp(-10.5,-12.35,k);\n  who(c,'captain',[0,0,-13.35],")
R("who(c,'oishi',[0,0,x+i*0.75*(1-k*0.6)],","who(c,'oishi',[0,0,x+i*0.42*(1-k*0.6)],")
R("cam(c,'f_dash',{z:1.12,x:K3(u,d,440,640),y:940});","cam(c,'f_dash',{z:1.06,x:K3(u,d,500,600),y:1000});")
R("['castleG',[1.05,0,-6.2],X('dot','angry','frown',{f:-1,lean:0.12,hf:[-54,10],hb:[-40,30]})],['castleG',[-0.45,0,-6.2],X('dot','angry','frown',{f:1,lean:0.12,hf:[54,10],hb:[40,30]})],","['castleG',[lerp(2.6,1.05,k),0,-6.2],X('dot','angry','frown',{f:-1,lean:0.12,...(k<0.98?RUN(u,14):{}),hf:[-54,10],hb:[-40,30]})],['castleG',[lerp(-2.0,-0.45,k),0,-6.2],X('dot','angry','frown',{f:1,lean:0.12,...(k<0.98?RUN(u,14,2):{}),hf:[54,10],hb:[40,30]})],")
R("who(c,'asanoW',[0.4,0,1.6],X('closed','flat','flat',{f:1,view:'front',...KN,","who(c,'asanoW',[0.4,0,1.6],X('closed','flat','flat',{f:1,view:'front',...KN,tilt:K3(u,d,0,0.22),lean:K3(u,d,0,0.06),")
R("const k=r*5+i,pos=[-2.4+i*1.2+r*0.3,0,-16.3+r*1.3];L.push([k===12?'oishi':RA[k%10],pos,{f:1,seed:k,...KN,lean:0.12,tilt:0.2,","const k=r*5+i,pos=[-2.4+i*1.2+r*0.3,0,-16.3+r*1.3],dn=u>0.15+(2-r)*0.22+i*0.04;L.push([k===12?'oishi':RA[k%10],pos,{f:1,seed:k,...(dn?KN:{}),lean:dn?0.12:0,tilt:dn?0.2:0,")
R("cast(c,[['retA',[-1.5,0,0.3],X('wide','worried','o',{f:1,hf:[30,-40],hb:[-20,60]})]","const fl=-Math.sin(clamp(u/0.3)*Math.PI)*26;\n  cast(c,[['retA',[-1.5,0,0.3],X('wide','worried','o',{f:1,dy:fl,hf:[30,-40],hb:[-20,60]})]")
R("['retB',[1.9,0,0.2],X('wide','worried','frown',{f:-1,sweat:1})]","['retB',[1.9,0,0.2],X('wide','worried','frown',{f:-1,sweat:1,dy:fl*0.7})]")
open(p,'w').write(s)
p='cast5.js';s=open(p).read()
a="const SK=['#f6e6d2','#f2dcc4','#eed2b4','#f8ead8'];";assert a in s;s=s.replace(a,"const SK=['#fdf7f1','#fbf3ec','#f9efe6','#fffaf5'];");open(p,'w').write(s)
p='style5.js';s=open(p).read()
for a,b in [("rgba(170,96,110,0.42)","rgba(170,110,130,0.26)"),("rgba(176,104,128,0.30)","rgba(170,120,150,0.20)"),("rgba(120,60,90,0.22)","rgba(120,80,120,0.14)"),("rgba(150,84,104,0.24)","rgba(150,100,125,0.15)"),("rgba(110,60,80,0.38)","rgba(110,70,100,0.26)"),("rgba(255,150,140,0.10)","rgba(255,170,170,0.06)")]:
    assert a in s,a; s=s.replace(a,b)
open(p,'w').write(s)
p='main5.js';s=open(p).read()
a="if(o.blur){c.save();c.filter=`blur(${o.blur}px)`;}"
assert a in s
s=s.replace(a,"const sd5=(o.seed||0)*1.7+pos[0]*2.3+pos[2];if(!o.back){const bl=(T*0.31+hash(sd5)*3)%1;if(bl>0.955&&(q.eyes==='dot'||q.eyes==='half'||q.eyes==='open'||!q.eyes))q.eyes='closed';if(!q.walk&&!q.run&&!o.rot){q.tilt=(q.tilt||0)+Math.sin(T*1.25+sd5)*0.022;q.lean=(q.lean||0)+Math.sin(T*0.9+sd5*1.3)*0.012;}}\n  "+a)
a="let z=o.z||1;const r=o.r||0;if(r)z=Math.max(z,1+Math.abs(r)*2.4);const fx=clamp(o.x??540,540/z,1080-540/z),fy=clamp(o.y??960,960/z,1920-960/z);"
assert a in s
s=s.replace(a,"let z=Math.max(o.z||1,1.03);const r=o.r||0;if(r)z=Math.max(z,1.03+Math.abs(r)*2.4);const fx=clamp(o.x??540,552/z,1080-552/z),fy=clamp(o.y??960,972/z,1920-972/z);o=Object.assign({},o,{sx:(o.sx||0)+nz(T*0.9,1)*6,sy:(o.sy||0)+nz(T*0.8,4)*5});")
open(p,'w').write(s)
print('ok')
