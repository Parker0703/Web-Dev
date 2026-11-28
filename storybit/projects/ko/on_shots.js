window.OUTLINE=2.6;
'use strict';
// ===================== Hiroo Onoda · cinematic Style 5 =====================
// ---------- atmosphere ----------
function rainFx(c,t,a=1,n=160){c.save();c.strokeStyle=`rgba(200,220,235,${0.35*a})`;c.lineWidth=2;c.lineCap='round';for(let i=0;i<n;i++){const sp=1600+hash(i*3)*900,x=(hash(i)*1300-100+t*120)%1300-100,y=((hash(i*7)*2200+t*sp)%2200)-140,l=40+hash(i*5)*50;c.beginPath();c.moveTo(x,y);c.lineTo(x-l*0.12,y+l);c.stroke();}c.restore();}
function mist(c,t,y=1300,a=0.35,col='220,235,225'){c.save();for(let i=0;i<6;i++){const x=((i*260+t*(14+i*5))%1600)-260,yy=y+Math.sin(t*0.3+i)*40+i*30;const g=c.createRadialGradient(x,yy,0,x,yy,420);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(x-420,yy-420,840,840);}c.restore();}
function grain(c,t,a=0.06){c.save();for(let i=0;i<260;i++){const x=hash(i*1.3+Math.floor(t*24))*W,y=hash(i*2.9+Math.floor(t*24)*1.7)*H;c.fillStyle=i%2?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a*1.4})`;c.fillRect(x,y,2,2);}c.restore();}
function bars(c,k=1){if(k<=0)return;c.save();c.fillStyle='#000';c.fillRect(0,H-130*k,W,130*k);c.restore();}
function cine(c,t,o={}){grade(c,{v:o.v??0.55,tint:o.tint,dark:o.dark});grain(c,t);bars(c,o.bars??1);}
function emberFx(c,t,x,y,n=14){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const p=((t*0.6+hash(i*3))%1);const px=x+Math.sin(p*7+i)*40+(hash(i)-0.5)*60,py=y-p*320;c.fillStyle=`rgba(255,${150+hash(i)*80|0},60,${(1-p)*0.9})`;c.beginPath();c.arc(px,py,3+hash(i*5)*3,0,TAU);c.fill();}c.restore();}
function fireGlow(c,x,y,r,t,a=1){const f=0.85+0.15*Math.sin(t*17)*Math.sin(t*7.3);glow(c,x,y,r*f,'255,150,60',0.55*a);glow(c,x,y,r*0.45*f,'255,220,140',0.6*a);}
function leaflet(c,x,y,s,rot,flip=1){doc(c,x,y,s*1.05,rot,{w:62*flip>0?62:62,h:80,lw:3.5});}
function silo(c,draw,b=0.28){c.save();c.filter=`brightness(${b}) saturate(0.6)`;draw();c.restore();}
// ---------- icons ----------
function flagW(c,x,y,s,t,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.strokeStyle='#8a6a40';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(-90,140);c.lineTo(-90,-140);c.stroke();c.fillStyle='#fbfbf6';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-90,-130);
  for(let i=0;i<=10;i++){const u=i/10;c.lineTo(-90+u*200,-130+Math.sin(u*5+t*5)*14*u);}for(let i=10;i>=0;i--){const u=i/10;c.lineTo(-90+u*200,-20+Math.sin(u*5+t*5+0.6)*14*u);}c.closePath();c.fill();c.stroke();c.restore();}
function scroll(c,x,y,s,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.fillStyle='#f4e8c8';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-80,-100,160,200);c.strokeRect(-80,-100,160,200);for(const yy of [-100,100]){c.fillStyle='#8a5a2a';c.beginPath();c.ellipse(0,yy,96,16,0,0,TAU);c.fill();c.stroke();}
  c.fillStyle='rgba(30,20,10,0.75)';for(let i=0;i<6;i++)c.fillRect(-50+i*18,-70,8,140-(i%3)*30);c.fillStyle='#c83a2a';c.fillRect(30,40,26,26);c.restore();}
function heartShield(c,x,y,s,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.fillStyle='#3a6ab0';c.strokeStyle=OL;c.lineWidth=7;c.beginPath();c.moveTo(0,-100);c.lineTo(85,-70);c.quadraticCurveTo(85,40,0,100);c.quadraticCurveTo(-85,40,-85,-70);c.closePath();c.fill();c.stroke();
  c.fillStyle='#ff5a6a';c.beginPath();c.moveTo(0,40);c.bezierCurveTo(-60,-6,-30,-60,0,-26);c.bezierCurveTo(30,-60,60,-6,0,40);c.fill();c.stroke();c.restore();}
function holdIco(c,x,y,s,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.fillStyle='#d8a040';c.strokeStyle=OL;c.lineWidth=7;rr(c,-70,-40,140,110,30);c.fill();c.stroke();for(let i=0;i<4;i++){rr(c,-70+i*35,-80,35,60,14);c.fill();c.stroke();}c.restore();}
function capIco(c,x,y,r,col='#6e6c44'){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=r*0.08;c.beginPath();c.moveTo(-r,r*0.2);c.bezierCurveTo(-r,-r*0.9,r,-r*0.9,r,r*0.2);c.closePath();c.fill();c.stroke();c.fillStyle=shd(col,-0.3);c.beginPath();c.ellipse(0,r*0.2,r*1.0,r*0.2,0,0,Math.PI);c.fill();c.stroke();c.fillStyle='#ffd040';star(c,0,-r*0.3,r*0.18);c.restore();}
function soldierIco(c,x,y,r,col,a=1){c.save();c.globalAlpha=a;personIco(c,x,y,r,col);capIco(c,x,y-r*1.25,r*0.5,'#6e6c44');c.restore();}
function pandaIco(c,x,y,r){c.save();c.translate(x,y);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=r*0.07;for(const sd of [-1,1]){c.fillStyle=OL;c.beginPath();c.arc(sd*r*0.62,-r*0.62,r*0.3,0,TAU);c.fill();}c.fillStyle='#fff';c.beginPath();c.arc(0,0,r*0.85,0,TAU);c.fill();c.stroke();
  c.fillStyle=OL;for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*r*0.32,-r*0.08,r*0.18,r*0.24,sd*0.5,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(sd*r*0.3,-r*0.12,r*0.06,0,TAU);c.fill();c.fillStyle=OL;}c.beginPath();c.ellipse(0,r*0.22,r*0.12,r*0.08,0,0,TAU);c.fill();c.restore();}
function yetiIco(c,x,y,r){c.save();c.translate(x,y);c.fillStyle='#e8eef8';c.strokeStyle=OL;c.lineWidth=r*0.07;c.beginPath();for(let i=0;i<18;i++){const a=i/18*TAU,q=r*(i%2?0.8:0.95);c.lineTo(Math.cos(a)*q,Math.sin(a)*q*1.05);}c.closePath();c.fill();c.stroke();c.fillStyle='#8ab0d8';c.beginPath();c.ellipse(0,r*0.05,r*0.5,r*0.42,0,0,TAU);c.fill();
  c.fillStyle=OL;for(const sd of [-1,1]){c.beginPath();c.arc(sd*r*0.2,-r*0.05,r*0.07,0,TAU);c.fill();}c.fillStyle='#fff';c.beginPath();c.moveTo(-r*0.18,r*0.22);c.lineTo(-r*0.1,r*0.34);c.lineTo(-r*0.02,r*0.22);c.moveTo(r*0.02,r*0.22);c.lineTo(r*0.1,r*0.34);c.lineTo(r*0.18,r*0.22);c.fill();c.restore();}
function lantern(c,x,y,s,on){c.save();c.translate(x,y);c.scale(s,s);if(on>0){glow(c,0,0,220,'255,190,90',0.5*on);}c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(0,-90);c.lineTo(0,-60);c.stroke();c.fillStyle='#3a3a42';rr(c,-40,-60,80,14,4);c.fill();c.stroke();c.fillStyle=`rgba(255,${180+60*on|0},${90+40*on|0},${0.25+0.75*on})`;rr(c,-34,-46,68,90,10);c.fill();c.stroke();c.fillStyle='#3a3a42';rr(c,-40,44,80,14,4);c.fill();c.stroke();c.restore();}
function islands(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#4a8a4a';c.strokeStyle='#d8e8c8';c.lineWidth=4;
  const blob=(pts)=>{c.beginPath();pts.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath();c.fill();c.stroke();};
  blob([[0,-320],[60,-300],[90,-200],[70,-120],[120,-60],[60,-20],[0,-80],[-30,-200]]);blob([[40,60],[150,40],[200,120],[180,240],[90,260],[60,160]]);blob([[-140,40],[-60,20],[-80,90],[-150,120]]);blob([[-40,140],[20,120],[40,200],[-20,230]]);
  blob([[-110,-40],[-80,-50],[-70,-28],[-100,-20]]);c.restore();}
function plane(c,x,y,s,a){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);c.fillStyle='#e8ecf2';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,60,12,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-6,0);c.lineTo(-24,-56);c.lineTo(8,-56);c.lineTo(20,0);c.lineTo(8,56);c.lineTo(-24,56);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-50,0);c.lineTo(-62,-22);c.lineTo(-50,-22);c.lineTo(-40,0);c.lineTo(-50,22);c.lineTo(-62,22);c.closePath();c.fill();c.stroke();c.restore();}
function yearRoll(c,t,t0,t1,x,y,size=150){const v=Math.round(lerp(1945,1974,ON(t,t0,t1-t0)));const k=popK(t,t0-0.15);if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);panel(c,-250,-110,500,220,{r:40,fill:'rgba(10,12,10,0.82)'});txt(c,String(v),0,8,size,v>=1974?'#ff3b30':'#fff',{sw:14});c.restore();}
function hands(c,r,K){if(!r)return;fist2(c,r.hf,r.s,K.coat);fist2(c,r.hb,r.s,K.coat);}
const ONO=(old)=>old?'onodaOld':'onoda';
function soldier(c,pos,o={}){const k=o.kind||'onoda',K=KIND2[k];const r=who(c,k,pos,o);if(!r)return r;if(K.ragged)ragged(c,r);
  if(o.gun){rifle(c,r.hb,r.hf,r.s/3.4*2.0,r.s*(o.glen||145));hands(c,r,K);}return r;}
function chip(c,x,y,text,k=1,o={}){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.font='900 64px "Inter Display"';const w=c.measureText(text).width+70;panel(c,-w/2,-55,w,110,{r:24,fill:o.fill||'rgba(10,12,10,0.82)'});txt(c,text,0,4,64,o.col||'#ffd060',{stroke:false,ls:6});c.restore();}
function thought(c,x,y,w,h,k,ax,ay,draw){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<10;i++){const a=i/10*TAU;c.moveTo(Math.cos(a)*w*0.42+w*0.16,Math.sin(a)*h*0.4);c.arc(Math.cos(a)*w*0.38,Math.sin(a)*h*0.36,Math.min(w,h)*0.22,0,TAU);}c.fill();c.stroke();
  c.beginPath();c.ellipse(0,0,w*0.42,h*0.4,0,0,TAU);c.fill();for(let i=0;i<2;i++){const px=lerp(0,ax-x,0.62+i*0.2),py=lerp(h*0.4,ay-y,0.5+i*0.25);c.beginPath();c.arc(px,py,16-i*6,0,TAU);c.fill();c.stroke();}if(draw)draw(c);c.restore();}
function mpin(c,x,y,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#ff3b30';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,-70,46,Math.PI*0.85,Math.PI*2.15);c.lineTo(0,0);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,-72,18,0,TAU);c.fill();c.stroke();c.restore();}
function logSeat(c,pos){const a=pp([pos[0]-0.32,0.2,pos[2]+0.02]),b=pp([pos[0]+0.32,0.2,pos[2]+0.02]),s=a.s;c.save();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=58*s/2.7;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.strokeStyle='#6a4a2c';c.lineWidth=48*s/2.7;c.stroke();c.strokeStyle='rgba(255,220,170,0.25)';c.lineWidth=8*s/2.7;c.beginPath();c.moveTo(a.x,a.y-12*s/2.7);c.lineTo(b.x,b.y-12*s/2.7);c.stroke();c.fillStyle='#a8845a';c.beginPath();c.ellipse(b.x,b.y,10*s/2.7,24*s/2.7,0,0,TAU);c.fill();c.restore();}
function salutePalm(c,r,f){const R=47*r.s;const tx=r.hc.x+f*R*0.95,ty=r.hc.y-R*0.42;const a=Math.atan2(ty-r.hf.y,tx-r.hf.x);c.save();c.translate(r.hf.x,r.hf.y);c.rotate(a);c.fillStyle=KIND2[Object.keys(KIND2).find(k=>0)]?'#fff':SK[1];c.fillStyle=SK[1];c.strokeStyle=OL;c.lineWidth=4*r.s/3.4;const L=Math.hypot(tx-r.hf.x,ty-r.hf.y);rr(c,-6*r.s/3.4,-12*r.s/3.4,L+8*r.s/3.4,24*r.s/3.4,10*r.s/3.4);c.fill();c.stroke();c.restore();}
// ================= SHOTS =================
const S={};
// hook: dawn mist, a lone soldier silhouette in god rays; year counter rolls 1945 → 1974; a leaflet drifts past
S.hook=(c,t,u,d)=>{const tw=wt('world'),t29=wt('29'),ta=wt('and',4),tg=wt('given'),tev=wt('every'),tst=wt('stop');
  if(t<tw+0.55){// 1 · extreme close-up in the rain: his eyes snap open
    const p=t/(tw+0.55);cam(c,'jg_rain',{z:lerp(3.1,2.7,p),x:550,y:K3(t,1.8,700,720)});const op=t>0.75;
    const r=soldier(c,[0,0,0.3],X(op?'glare':'closed',op?'angry':'flat','flat',{kind:'onodaOld',view:'front',hf:[12,93],hb:[-12,93],dy:op&&t<0.95?-6:0}));c.restore();
    if(r){for(let i=0;i<6;i++){const q=((t*1.4+i/6)%1);const x=r.hc.x-90+i*36+Math.sin(i*3)*8,y=r.hc.y-40+q*q*900;c.save();c.globalAlpha=1-q;c.fillStyle='rgba(210,230,245,0.9)';c.beginPath();c.ellipse(x,y,4,9,0,0,TAU);c.fill();c.restore();}}
    rainFx(c,t,1,200);cine(c,t,{v:0.75,tint:'rgba(30,50,90,0.25)'});if(t<0.5)flash(c,1-t/0.5,'#000');return;}
  if(t<ta){// 2 · TIME-LAPSE: he stands guard, frozen, while 29 years race past — days and nights flicker, storms come and go, the jungle grows over him, he ages
    const t1=tw+0.55,p=clamp((t-t1)/(ta-t1));const cyc=(t-t1)*3.2,day=0.5+0.5*Math.cos(cyc*TAU);
    cam(c,'jg_dawn',{z:lerp(1.3,1.18,p),x:540,y:1000});
    const sx=lerp(-100,1180,(cyc%1));const sy=300-Math.sin((cyc%1)*Math.PI)*220;glow(c,sx,sy,day>0.5?260:160,day>0.5?'255,230,160':'190,210,255',0.55);
    if(day>0.45)godrays(c,sx,sy-40,0.25*day,'255,230,180');
    const old=p>0.5;soldier(c,[0,0,0.2],X('glare','angry','flat',{kind:old?'onodaOld':'onoda',f:1,view:'3q',gun:'port',hf:[30,20],hb:[-8,64]}));
    // creeping vines grow up the frame edges as the years pass
    c.save();c.lineCap='round';for(let v=0;v<6;v++){const side=v%2?1:-1,x0=side<0?40+v*20:1040-v*20,L=p*(700+hash(v)*500);c.strokeStyle='#2f5a2a';c.lineWidth=10;c.beginPath();c.moveTo(x0,1920);for(let y=0;y<L;y+=20){c.lineTo(x0+Math.sin(y*0.02+v)*40*side,1920-y);}c.stroke();
      for(let y=60;y<L;y+=90){const lx=x0+Math.sin(y*0.02+v)*40*side,ly=1920-y;c.fillStyle=y%180?'#4a8a3a':'#3a7a30';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.ellipse(lx+side*-22,ly,26,11,side*0.6,0,TAU);c.fill();c.stroke();}}c.restore();
    // leaf storm + passing rain bands
    for(let i=0;i<34;i++){const q=((t*1.6+hash(i*3))%1);const x=hash(i*7)*1300-100+q*300,y=-60+q*2050;c.save();c.translate(x,y);c.rotate(q*14+i);c.fillStyle=['#8aa23a','#b8a040','#6a8a2a','#c8783a'][i%4];c.strokeStyle=OL;c.lineWidth=2;c.beginPath();c.ellipse(0,0,15,6,0,0,TAU);c.fill();c.stroke();c.restore();}
    if(Math.sin(cyc*1.7)>0.3)rainFx(c,t,0.9,140);
    mist(c,t,1400,0.25);c.restore();
    tint(c,`rgba(20,30,90,${(1-day)*0.55})`,'multiply');if(Math.abs(p-0.5)<0.02)flash(c,0.6,'#fff');
    tearCal(c,t,t29,wt('ended')+0.2,860,640);cine(c,t,{v:0.6});return;}
  if(t<tev-0.05){// 3a · a leaflet floats down onto his rifle barrel; a finger flicks it away
    const tA=ta;cam(c,'jg_day',{z:2.6,x:520,y:1150});c.restore();c.save();c.filter='blur(6px)';c.globalAlpha=0.0;c.restore();
    tint(c,'rgba(0,0,0,0.12)','multiply');const B={x:-80,y:1330},Gp={x:380,y:1260};const ang=Math.atan2(Gp.y-B.y,Gp.x-B.x);
    c.save();for(const [hx,hy,bx] of [[380,1262,560],[120,1300,60]]){c.fillStyle=KIND2.onodaOld.coat;c.strokeStyle=OL;c.lineWidth=8;c.beginPath();c.moveTo(bx-70,1960);c.quadraticCurveTo(bx-60,1500,hx-46,hy+20);c.lineTo(hx+46,hy+30);c.quadraticCurveTo(bx+60,1520,bx+70,1960);c.closePath();c.fill();c.stroke();c.fillStyle=shd(KIND2.onodaOld.coat,-0.25);c.beginPath();c.ellipse(hx,hy+40,50,20,0,0,TAU);c.fill();c.stroke();}c.restore();rifle(c,B,Gp,3.4,1400);fist2(c,{x:380,y:1262},7.5,KIND2.onodaOld.limb);fist2(c,{x:120,y:1300},7.5,KIND2.onodaOld.limb);
    const land=ON(t,tA,0.75),flick=ON(t,tev-0.45,0.25);const lx=lerp(840,720,land)+flick*500,ly=lerp(160,1110,land)-flick*600;doc(c,lx,ly,1.7,lerp(0.6,-0.08,land)+flick*3,{w:70,h:90});
    if(flick>0){c.save();c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=6;c.lineCap='round';for(let i=0;i<3;i++){c.beginPath();c.moveTo(640+i*24,1080-i*18);c.lineTo(700+i*40,1040-i*40);c.stroke();}c.restore();}
    cine(c,t,{v:0.6});return;}
  if(t<tst-0.15){// 3b · a letter and a family photo pinned to a tree; he stares, jaw tight
    cam(c,'jg_day',{z:K3(t-tev,0.9,1.9,2.02),x:640,y:820});const r=soldier(c,[0.55,0,-0.3],X(t>tev+0.4?'glare':'sad',t>tev+0.4?'angry':'worried','flat',{kind:'onodaOld',f:-1,view:'3q',hf:[-12,93],hb:[12,93]}));c.restore();
    c.save();const tx=150;const g2=c.createLinearGradient(tx-120,0,tx+120,0);g2.addColorStop(0,'#3a2a1a');g2.addColorStop(0.5,'#6a4a2c');g2.addColorStop(1,'#2a1c10');c.fillStyle=g2;c.strokeStyle=OL;c.lineWidth=8;c.fillRect(tx-120,-20,240,1960);c.strokeRect(tx-120,-20,240,1960);
    c.strokeStyle='rgba(20,12,6,0.5)';c.lineWidth=4;for(let i=0;i<7;i++){c.beginPath();c.moveTo(tx-100+i*30,0);c.bezierCurveTo(tx-90+i*30,600,tx-110+i*30,1200,tx-95+i*30,1920);c.stroke();}c.restore();
    doc(c,190,800,2.1,-0.06,{w:90,h:120});c.save();c.translate(270,1060);c.rotate(0.08);c.fillStyle='#f4efe4';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-110,-80,220,160);c.strokeRect(-110,-80,220,160);c.fillStyle='#8a8478';c.fillRect(-92,-62,184,124);
    for(const [x,r2] of [[-46,26],[0,30],[46,24]]){personIco(c,x,22,r2,'#4a463e');}c.restore();for(const [x,y] of [[190,690],[270,985]]){c.fillStyle='#8a8a90';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.arc(x,y,9,0,TAU);c.fill();c.stroke();}
    cine(c,t,{v:0.6,tint:'rgba(255,220,170,0.08)'});return;}
  // 3c · he turns his back and walks into the mist
  const t2=tst-0.15;cam(c,'jg_dawn',{z:K3(t-t2,7.53-t2,1.16,1.24),x:540,y:1020});godrays(c,600,-80,0.26,'255,235,190');const wk=ON(t,t2,1.2);
  soldier(c,[0,0,lerp(0.4,-0.6,wk)],X('dot','flat','flat',{kind:'onodaOld',back:1,view:'back',...WK(t,3.4),hf:[12,93],hb:[-12,93]}));
  mist(c,t,1350,0.32+0.2*wk);c.restore();cine(c,t,{v:0.55});};
function tearCal(c,t,t0,t1,x,y){if(t<t0-0.2)return;const k=popK(t,t0-0.2);const p=ON(t,t0,t1-t0);const yr=1945+Math.floor(p*29);c.save();c.translate(x,y);c.scale(k,k);
  c.fillStyle='#2a2a30';c.strokeStyle=OL;c.lineWidth=6;rr(c,-130,-150,260,40,10);c.fill();c.stroke();c.fillStyle='#fbf6ea';rr(c,-120,-112,240,230,10);c.fill();c.stroke();c.fillStyle='#c8281e';c.fillRect(-120,-112,240,44);txt(c,'YEAR',0,-88,30,'#fff',{stroke:false,ls:6});
  txt(c,String(yr),0,20,88,yr>=1974?'#c8281e':'#1a1a22',{stroke:false});
  for(let i=0;i<4;i++){const q=((p*29)%1+i*0.25)%1;if(p>=1)break;c.save();c.translate(q*260,-40-q*q*320);c.rotate(q*2.5+i);c.globalAlpha=1-q;c.fillStyle='#fbf6ea';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-60,-50,120,100);c.strokeRect(-60,-50,120,100);c.restore();}c.restore();}

// map: Lubang pin, the order, the jungle trap, 29 years
const PH={luzon:[[120.6,18.5],[121.2,18.6],[122.2,18.5],[122.3,17.2],[122.5,16.2],[121.6,15.8],[121.6,14.8],[122.0,14.2],[122.8,14.0],[123.3,13.8],[124.0,13.6],[124.2,12.6],[123.8,12.9],[123.3,13.0],[122.6,13.4],[121.8,13.9],[121.0,13.7],[120.6,14.2],[120.4,14.8],[119.9,15.4],[119.8,16.3],[120.3,16.6],[120.4,17.6]],
 mindoro:[[120.4,13.5],[121.2,13.4],[121.5,12.6],[121.2,12.2],[120.8,12.4],[120.3,12.9]],lubang:[[120.0,13.9],[120.28,13.84],[120.22,13.74],[119.98,13.78]],panay:[[121.9,11.9],[122.6,11.6],[123.1,11.2],[122.6,10.5],[122.0,10.5],[121.9,11.3]],
 negros:[[122.9,10.9],[123.5,10.8],[123.3,9.8],[123.1,9.1],[122.5,9.5],[122.8,10.3]],cebu:[[123.9,11.2],[124.1,10.6],[123.6,9.6],[123.4,9.9],[123.8,10.6]],samar:[[124.3,12.6],[125.5,12.5],[125.7,11.3],[125.0,11.0],[124.4,11.6]],
 leyte:[[124.3,11.5],[125.0,11.3],[125.2,10.2],[124.7,10.0],[124.3,10.9]],bohol:[[123.8,10.1],[124.5,10.1],[124.4,9.6],[123.8,9.7]],masbate:[[123.2,12.5],[123.9,12.3],[123.6,11.9],[123.2,12.1]],
 mindanao:[[122.0,7.9],[123.0,8.6],[124.0,8.6],[125.0,9.0],[125.5,9.8],[126.3,9.3],[126.5,7.5],[126.0,6.4],[125.4,5.6],[124.5,6.2],[124.0,7.0],[123.4,7.8],[122.8,7.3],[122.1,6.9]],
 palawan:[[117.2,8.4],[117.8,9.0],[118.8,10.0],[119.6,11.2],[119.4,11.4],[118.6,10.4],[117.6,9.4],[117.1,8.6]]};
const MX=(lo)=>(lo-116.5)*95,MY=(la)=>(19.5-la)*95;
function parchment(c){const g2=c.createRadialGradient(540,960,200,540,960,1200);g2.addColorStop(0,'#efe0bc');g2.addColorStop(1,'#b89a68');c.fillStyle=g2;c.fillRect(0,0,W,H);c.save();for(let i=0;i<900;i++){c.fillStyle=`rgba(${100+hash(i)*60|0},${70+hash(i*2)*40|0},30,${0.05+hash(i*3)*0.08})`;c.beginPath();c.arc(hash(i*5.1)*W,hash(i*7.3)*H,2+hash(i)*14,0,TAU);c.fill();}c.restore();}
function drawPH(c,t){c.save();c.lineJoin='round';
  // sea contour lines
  for(const [nm,P] of Object.entries(PH)){for(let k=3;k>=1;k--){c.strokeStyle=`rgba(60,110,150,${0.12*k})`;c.lineWidth=8+k*14;c.beginPath();P.forEach(([a,b],i)=>i?c.lineTo(MX(a),MY(b)):c.moveTo(MX(a),MY(b)));c.closePath();c.stroke();}}
  for(const [nm,P] of Object.entries(PH)){const g2=c.createLinearGradient(0,0,0,1400);g2.addColorStop(0,'#b8b070');g2.addColorStop(1,'#8aa060');c.fillStyle=g2;c.strokeStyle='#4a3a20';c.lineWidth=nm==='lubang'?3:4;c.beginPath();P.forEach(([a,b],i)=>i?c.lineTo(MX(a),MY(b)):c.moveTo(MX(a),MY(b)));c.closePath();c.fill();c.stroke();
    // forest hatching
    c.save();c.clip();c.strokeStyle='rgba(50,80,30,0.45)';c.lineWidth=2;for(let i=0;i<60;i++){const x=MX(P[0][0])-200+hash(i*3+nm.length)*700,y=MY(P[0][1])-100+hash(i*5+nm.length)*700;c.beginPath();c.moveTo(x-8,y+6);c.lineTo(x,y-8);c.lineTo(x+8,y+6);c.stroke();}c.restore();}
  c.restore();}
function compass(c,x,y,r){c.save();c.translate(x,y);c.strokeStyle='#4a3a20';c.lineWidth=3;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();c.beginPath();c.arc(0,0,r*0.8,0,TAU);c.stroke();for(let i=0;i<8;i++){const a=i/8*TAU-Math.PI/2,L=i%2?r*0.55:r*1.05;c.fillStyle=i%2?'#c8b080':(i===0?'#a82a1e':'#4a3a20');c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a-0.18)*r*0.25,Math.sin(a-0.18)*r*0.25);c.lineTo(Math.cos(a)*L,Math.sin(a)*L);c.lineTo(Math.cos(a+0.18)*r*0.25,Math.sin(a+0.18)*r*0.25);c.closePath();c.fill();c.stroke();}
  txt(c,'N',0,-r*1.32,40,'#4a3a20',{stroke:false});c.restore();}
S.map=(c,t,u,d)=>{const t0=S.map.t0,to=wt('one',t0),ttr=wt('trapped',t0),tj=wt('jungle',t0),t29=wt('29',t0);parchment(c);
  const lx=MX(120.13),ly=MY(13.82);const zk=ON(t,to-0.4,1.6);const sc=lerp(0.92,3.2,zk),cx=lerp(MX(122),lx,zk),cy=lerp(MY(12.3),ly,zk);
  c.save();c.translate(540,980);c.scale(sc,sc);c.translate(-cx,-cy);
  c.strokeStyle='rgba(74,58,32,0.25)';c.lineWidth=2/sc*1.6;for(let i=0;i<=12;i++){c.beginPath();c.moveTo(MX(116+i),MY(20));c.lineTo(MX(116+i),MY(4));c.stroke();}for(let j=0;j<=16;j++){c.beginPath();c.moveTo(MX(116),MY(4+j));c.lineTo(MX(128),MY(4+j));c.stroke();}
  drawPH(c,t);
  // route from Japan (off the top)
  const rp=ON(t,t0+0.3,1.6);c.save();c.strokeStyle='#a82a1e';c.lineWidth=5/sc*1.3;c.setLineDash([16/sc,12/sc]);c.beginPath();const sx0=MX(124.5),sy0=MY(21.5);c.moveTo(sx0,sy0);const qx=MX(122.5),qy=MY(17.5);const n=40;for(let i=1;i<=n*rp;i++){const u2=i/n,q=1-u2;c.lineTo(q*q*sx0+2*q*u2*qx+u2*u2*lx,q*q*sy0+2*q*u2*qy+u2*u2*ly);}c.stroke();c.setLineDash([]);c.restore();
  if(t>to-0.2){const k=popK(t,to-0.2);c.save();c.translate(lx,ly);c.scale(1/sc,1/sc);c.strokeStyle='#a82a1e';c.lineWidth=7;c.beginPath();for(let i=0;i<=40;i++){const a=i/40*TAU*1.08;const rr2=(70+Math.sin(i*1.7)*6)*k;c.lineTo(Math.cos(a)*rr2*1.3,Math.sin(a)*rr2);}c.stroke();
    txt(c,'LUBANG',0,-110,40,'#4a3a20',{stroke:false,ls:6});c.restore();}
  c.restore();
  compass(c,900,1520,90);c.save();c.fillStyle='#4a3a20';c.font='italic 900 38px serif';c.textAlign='left';c.globalAlpha=0.8;c.fillText('PHILIPPINE ISLANDS · 1944',80,520);c.restore();
  // jungle closes in around the frame
  if(t>tj-0.2){const g=ON(t,tj-0.2,1.0);c.save();for(let i=0;i<46;i++){const a=i/46*TAU,R=lerp(1300,780,g)+hash(i)*120;const x=540+Math.cos(a)*R*0.75,y=960+Math.sin(a)*R;c.save();c.translate(x,y);c.rotate(a+Math.PI/2+(hash(i*3)-0.5));c.fillStyle=['#2f6a2a','#3a7a30','#24521f'][i%3];c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,70+hash(i*2)*50,200+hash(i*4)*80,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=3;c.beginPath();c.moveTo(0,-180);c.lineTo(0,180);c.stroke();c.restore();}c.restore();}
  if(t>t29-0.05){const k=popK(t,t29-0.05,0.2);c.save();c.translate(560,1260);c.rotate(-0.12);c.scale(lerp(1.6,1,clamp((t-t29)/0.15))*k,lerp(1.6,1,clamp((t-t29)/0.15))*k);c.strokeStyle='#b8261c';c.lineWidth=12;rr(c,-260,-90,520,180,18);c.stroke();txt(c,'29 YEARS',0,6,108,'#b8261c',{stroke:false,ls:8});c.restore();}
  vign(c,0.55);grain(c,t,0.05);};
// 1944 beach landing at dusk
S.beach=(c,t,u,d)=>{const t0=S.beach.t0,tl=wt('lieutenant',t0),tp=wt('philippine',t0);cam(c,'beach',{z:K3(u,d,1.06,1.16),y:K3(u,d,1060,1000)});const wk=ON(t,t0+0.3,d-0.6);
  const r=soldier(c,[lerp(-1.1,-0.35,wk),0,lerp(-1.6,2.2,wk)],X(t>tl?'focus':'dot','flat','flat',{f:1,view:'3q',...WK(t,5.2),gun:'port',hf:[30,20],hb:[-8,92]}));c.restore();
  chip(c,220,1640,'1944',popK(t,t0));if(t>tp-0.1){const k=popK(t,tp-0.1);c.save();c.translate(870,1600);c.scale(k*0.36,k*0.36);panel(c,-300,-380,600,760,{r:60,fill:'rgba(10,20,30,0.85)'});islands(c,0,0,1);mpin(c,-110,-34,1);c.restore();}
  cine(c,t,{v:0.5,tint:'rgba(255,140,80,0.15)'});};
// the orders: commander hands him the paper; icons for each order; he salutes on "hold out"
S.orders=(c,t,u,d)=>{const t0=S.orders.t0,td=wt('never',t0+1),th=wt('hold',t0);
  if(t<td-0.05){// low angle on the commander: "Never surrender."
    cam(c,'jg_low',{z:K3(t-t0,td-t0,1.3,1.42),x:600,y:K3(t-t0,td-t0,760,740)});godrays(c,700,-80,0.3,'255,235,190');const talk=Math.sin(t*16)>0;
    soldier(c,[0.25,0,0.6],X('glare','angry',talk?'o':'flat',{kind:'cmdr',f:-1,view:'3q',hf:[-30,40],hb:[12,93]}));c.restore();
    noSign(c,880,1640,80*popK(t,t0+0.1),(q,R)=>{q.save();q.scale(0.32,0.32);flagW(q,20,40,1,t);q.restore();});cine(c,t,{v:0.6});return;}
  if(t<th-0.05){// extreme close-up: Onoda's eyes harden — "Never die."
    cam(c,'jg_day',{z:K3(t-td,th-td,2.9,3.05),x:K3(t-td,th-td,330,340),y:720});godrays(c,300,-80,0.25,'255,235,190');
    soldier(c,[-0.4,0,-0.2],X('glare','angry','grit',{f:1,view:'front',hf:[12,93],hb:[-12,93]}));c.restore();
    noSign(c,880,1600,80*popK(t,td),(q,R)=>{txt(q,'☠',0,8,R*1.1,'#e8e8e8',{stroke:false});});cine(c,t,{v:0.7});return;}
  // "Hold out, no matter what." — he salutes; light breaks through
  cam(c,'jg_day',{z:K3(t-th,2.2,1.2,1.1),y:1000});godrays(c,520,-80,0.34,'255,240,200');
  soldier(c,[0.65,0,-0.3],X('dot','flat','smile',{kind:'cmdr',f:-1,view:'3q',hf:[-12,92],hb:[12,92]}));
  const O=soldier(c,[-0.4,0,-0.2],X('focus','angry','grit',{f:1,view:'3q',hf:[44,-66],hb:[-8,93],tilt:-0.03}));if(O)salutePalm(c,O,1);c.restore();
  holdIco(c,880,1620,0.7,popK(t,th));cine(c,t,{v:0.5});};
// Japan surrenders: white flag over 1945
function clothFlag(c,x,y,w,h,t,k=1){c.save();c.translate(x,y);c.scale(k,k);c.lineCap='round';c.strokeStyle=OL;c.lineWidth=26;c.beginPath();c.moveTo(0,-60);c.lineTo(0,h+520);c.stroke();c.strokeStyle='#9a7a4a';c.lineWidth=16;c.stroke();c.fillStyle='#c8a830';c.beginPath();c.arc(0,-66,14,0,TAU);c.fill();c.lineWidth=4;c.strokeStyle=OL;c.stroke();
  const N=30;const top=[],bot=[];for(let i=0;i<=N;i++){const u=i/N,wv=Math.sin(u*5-t*4)*48*u+Math.sin(u*9-t*6)*14*u;top.push([u*w,wv]);bot.push([u*w,h+wv*1.1+u*14]);}
  for(let i=0;i<N;i++){const sl=Math.cos((i/N)*5-t*4);const sh=Math.round(212+sl*42);c.fillStyle=`rgb(${sh},${sh},${sh-6})`;c.beginPath();c.moveTo(...top[i]);c.lineTo(...top[i+1]);c.lineTo(...bot[i+1]);c.lineTo(...bot[i]);c.closePath();c.fill();}
  c.strokeStyle=OL;c.lineWidth=6;c.beginPath();top.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));for(let i=N;i>=0;i--)c.lineTo(...bot[i]);c.closePath();c.stroke();c.restore();}
S.surr=(c,t,u,d)=>{const t0=S.surr.t0,tj=wt('japan',t0);cam(c,'jg_low',{z:K3(u,d,1.15,1.28),x:540,y:K3(u,d,700,620)});c.restore();c.save();c.filter='blur(3px)';c.restore();
  godrays(c,820,-60,0.4,'255,235,200');tint(c,'rgba(255,200,140,0.18)','soft-light');clothFlag(c,300,520,520,300,t,lerp(0.9,1.0,ON(t,tj-0.3,1.5)));
  chip(c,540,1640,'AUGUST 1945',popK(t,t0+0.1),{col:'#fff'});cine(c,t,{v:0.55});};
// leaflets rain through the canopy; he catches one
S.leaf=(c,t,u,d)=>{const t0=S.leaf.t0,to=wt('over',t0);let r=null;cam(c,'jg_low',{z:K3(u,d,1.1,1.2),x:560,y:K3(u,d,860,820)});godrays(c,640,-80,0.3,'255,235,190');const catchK=ON(t,to-0.6,0.4);
  // a plane crosses overhead and spills its cargo
  const pp2=clamp((t-t0)/1.6);if(pp2<1){silo(c,()=>plane(c,lerp(1300,-200,pp2),lerp(260,180,pp2),2.6,Math.PI),0.25);}
  r=soldier(c,[0.25,0,0.6],X(t>to-0.4?'focus':'wide','up','o',{f:-1,view:'3q',gun:t<to-0.6?'port':null,glen:120,hf:t<to-0.6?[-30,20]:[lerp(-30,-60,catchK),lerp(20,-14,catchK)],hb:[8,64],tilt:-0.1}));let hs=null;if(r){const m=c.getTransform();hs={x:(m.a*r.hc.x+m.c*r.hc.y+m.e)/SS,y:(m.b*r.hc.x+m.d*r.hc.y+m.f)/SS};}c.restore();
  for(let i=0;i<26;i++){const st=t0+0.2+hash(i*9)*1.4;if(t<st)continue;const p=((t-st)*(0.22+hash(i*3)*0.12))%1;const x=hash(i*2)*1080+Math.sin(p*8+i)*90,y=lerp(200,2000,p);if(hs&&Math.hypot(x-hs.x,(y-hs.y)*0.8)<430)continue;doc(c,x,y,0.75+hash(i)*0.7,p*8*(hash(i*5)-0.5)*3,{w:62,h:80,lw:3});}
  if(r&&catchK>0.95)doc(c,r.hf.x-40,r.hf.y-30,1.6,0.2,{w:62,h:80});mist(c,t,1500,0.2);cine(c,t,{v:0.5});};
// reads it… calls it a trick: crumples and tosses
S.read=(c,t,u,d)=>{const t0=S.read.t0,tt=wt('trick',t0);cam(c,'jg_day',{z:K3(u,d,2.5,2.65),x:330,y:K3(u,d,800,780)});const cr=ON(t,tt-0.12,0.35);const toss=t>tt+0.4;
  const r=soldier(c,[-0.4,0,-0.2],X(t>tt-0.3?'glare':'focus',t>tt-0.3?'angry':'flat',t>tt-0.3?'sneer':'flat',{f:1,view:'front',hf:[12,93],hb:[-12,93],look:t<tt-0.3?Math.sin(t*3)*0.3:0}));c.restore();
  // the leaflet fills the lower frame (in his hands), then crumples and is tossed
  const px=540,py=1730;if(!toss){if(cr<1){doc(c,px,py-cr*200,lerp(4.2,0.9,cr),Math.sin(t*1.5)*0.03+cr*1.2,{w:110,h:130,lw:3});}else{c.fillStyle='#e8e2d0';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<12;i++){const a=i/12*TAU,q=80+hash(i)*30;c.lineTo(px+Math.cos(a)*q,py-150+Math.sin(a)*q);}c.closePath();c.fill();c.stroke();}
    for(const sd of [-1,1])fist2(c,{x:px+sd*lerp(290,90,cr),y:py+lerp(140,-120,cr)},7,KIND2.onoda.limb);}
  else{const p=clamp((t-tt-0.4)/0.5);c.fillStyle='#e8e2d0';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(px+p*700,py-200-Math.sin(p*Math.PI)*300+p*400,80*(1-p*0.5),0,TAU);c.fill();c.stroke();}
  cine(c,t,{v:0.6});};
// keeps fighting, hiding: crouched in the rain, mist rising
S.fight=(c,t,u,d)=>{const t0=S.fight.t0,th=wt('hiding',t0);cam(c,'jg_rain',{z:K3(u,d,1.06,1.16),x:K3(u,d,540,600),y:1000});const hide=t>th-0.1;
  soldier(c,[0,0,0.3],X('glare','angry','grit',{f:1,view:'3q',crouch:hide?56:34,gun:'aim',hf:[60,8],hb:[22,40],lean:0.1,sweat:1}));c.restore();mist(c,t,1400,hide?0.45:0.25,'200,215,220');rainFx(c,t,1);cine(c,t,{v:0.6});};
// raiding farms at night: sneaking past the hut with a rice sack
S.raid=(c,t,u,d)=>{const t0=S.raid.t0;cam(c,'farm',{z:K3(u,d,1.04,1.1),y:1000});const wk=ON(t,t0,d);
  const r=soldier(c,[lerp(0.8,-0.2,wk),0,lerp(-0.6,-0.1,wk)],X('glare','angry','flat',{f:-1,view:'3q',...WK(t,4),crouch:30,hf:[-30,84],hb:[12,88]}));
  if(r){riceSack(c,r.hf.x-4,r.hf.y+50*r.s/3.4,r.s/3.4*1.05,Math.sin(t*8)*0.06);fist2(c,r.hf,r.s,KIND2.onoda.coat);}c.restore();cine(c,t,{v:0.65,tint:'rgba(40,60,140,0.2)'});};
// the cost: a lantern dims, 30 figures grey out (quiet, no violence)
S.cost=(c,t,u,d)=>{const t0=S.cost.t0,tk=wt('killed',t0),t3=wt('30',t0);gfxBG(c,t,{plate:'farm'});tint(c,'rgba(0,0,0,0.45)','multiply');const dim=ON(t,tk,1.6);lantern(c,540,620,1.4,1-dim*0.85);
  for(let i=0;i<30;i++){const k=popK(t,t3-0.2+i*0.03);if(k<=0)continue;const x=165+(i%10)*83,y=1140+Math.floor(i/10)*150;c.save();c.globalAlpha=lerp(1,0.35,ON(t,t3+0.4+i*0.03,0.5));personIco(c,x,y,34*k,'#c8c8d0');c.restore();}cine(c,t,{v:0.6,bars:0});};
// his men, one by one
S.men=(c,t,u,d)=>{const t0=S.men.t0,t72=wt('1972',t0);cam(c,'jg_dawn',{z:K3(u,d,1.35,1.55),x:540,y:K3(u,d,1080,1040)});godrays(c,540,-80,0.3,'255,170,100');
  const yrs=['1950','1954','1972'];const fade=[wt('one',t0)+0.4,wt('die',t0),wt('give',t0)+0.1];const ks=['onoda','akatsu','shimada','kozuka'];const xs=[-0.3,-0.9,0.3,0.9];
  [1,2,3,0].forEach(i=>{const gone=i>0?ON(t,fade[i-1],0.7):0;if(gone>=1)return;c.save();c.globalAlpha=1-gone;silo(c,()=>soldier(c,[xs[i],0,-0.6],X('dot','flat','flat',{kind:ks[i],view:'front',gun:i===0?'port':null,hf:i===0?[-22,24]:[12,93],hb:i===0?[24,64]:[-12,93]})),0.55);c.restore();
    if(i>0&&gone>0){const p=pp([xs[i],1.0,-0.6]);txt(c,yrs[i-1],p.x,pp([xs[i],0,-0.6]).y+60,46,'#ffb08a',{sw:8});}});
  mist(c,t,1420,0.35,'255,210,170');c.restore();tint(c,'rgba(255,120,60,0.22)','soft-light');if(t>t72-0.1)vign(c,0.3+0.4*ON(t,t72,1));cine(c,t,{v:0.6});};
// alone: night, rain, a man by a dying fire
S.alone=(c,t,u,d)=>{cam(c,'jg_night',{z:K3(u,d,1.1,1.16),y:1000});const fp=pp([0.75,0,0.6]);fireGlow(c,fp.x,fp.y-30,220,t,0.8);
  logSeat(c,[0.1,0,0.4]);sitAt(c,'onodaOld',[0.1,0,0.4],X('half','worried','flat',{view:'3q',f:1,hf:[50,58],hb:[30,60],bags:0.5}));const R=null;c.restore();
  c.save();c.fillStyle='#3a2a1a';c.fillRect(fp.x-40,fp.y-12,80,16);c.restore();emberFx(c,t,fp.x,fp.y-30,8);rainFx(c,t,0.7,120);cine(c,t,{v:0.7,tint:'rgba(40,60,150,0.2)'});};
// the traveler: campfire, three things he's looking for; then Onoda steps out of the dark
S.suz=(c,t,u,d)=>{const t0=S.suz.t0,tp=wt('panda',t0),ty=wt('yeti',t0),to=wt('onoda',t0+5);cam(c,'camp',{z:K3(u,d,1.06,1.14),x:460,y:1020});const fp=pp([0,0.3,-0.6]);fireGlow(c,fp.x,fp.y,320,t);
  logSeat(c,[0.6,0,-0.15]);const r=sitAt(c,'suzuki',[0.6,0,-0.15],X(t>to-0.1?'sly':'happy','up',t>to-0.1?'smirk':'grin',{view:'3q',f:-1,hf:[-60,30],hb:[-40,40]}));c.restore();emberFx(c,t,fp.x,fp.y);
  if(r){const bx=r.hc.x-180,by=r.hc.y-330;thought(c,bx,by,430,260,popK(t,tp-0.2),r.hc.x-40,r.hc.y-120,(q)=>{if(t>tp-0.1){q.save();q.scale(popK(t,tp-0.1),popK(t,tp-0.1));pandaIco(q,-130,0,58);q.restore();}if(t>ty-0.1){q.save();q.translate(0,0);q.scale(popK(t,ty-0.1),popK(t,ty-0.1));yetiIco(q,0,0,62);q.restore();}if(t>to-0.1){q.save();q.translate(130,10);q.scale(popK(t,to-0.1),popK(t,to-0.1));capIco(q,0,0,56);q.restore();}});}
  cine(c,t,{v:0.6});};
S.finds=(c,t,u,d)=>{const t0=S.finds.t0;cam(c,'camp',{z:K3(u,d,1.06,1.12),x:500,y:1000,sx:t<t0+0.12?Math.sin(t*90)*10:0});const fp=pp([0,0.3,-0.6]);fireGlow(c,fp.x,fp.y,320,t);const st=ON(t,t0,0.7);
  const L=soldier(c,[lerp(-0.95,-0.38,st),0,-1.2],X('glare','angry','grit',{kind:'onodaOld',f:1,view:'3q',gun:'aim',hf:[60,8],hb:[22,40],...(st<1?WK(t,4):{})}));
  logSeat(c,[0.6,0,-0.15]);const r=sitAt(c,'suzuki',[0.6,0,-0.15],X('shock','up','o',{view:'3q',f:-1,hf:[-64,-20],hb:[40,-30],sweat:1,dy:-Math.max(0,Math.sin((t-t0)*12))*10*clamp(1-(t-t0))}));c.restore();emberFx(c,t,fp.x,fp.y);if(r)exclaim(c,r.hc.x,r.hc.y-190*r.s/3.4,r.s/3.4,t);cine(c,t,{v:0.6});};
// won't quit without orders
S.quit=(c,t,u,d)=>{const t0=S.quit.t0,tn=wt('not',t0);cam(c,'camp',{z:K3(u,d,1.35,1.42),x:700,y:820});const fp=pp([0,0.3,-0.6]);fireGlow(c,fp.x,fp.y,320,t);
  const r=soldier(c,[1.0,0,-1.3],X('glare','angry','flat',{kind:'onodaOld',f:-1,view:'front',gun:'port',hf:[-22,24],hb:[24,64],tilt:t<tn?Math.sin(t*7)*0.07:0}));c.restore();
  if(t>tn-0.1){noSign(c,250,1500,100*popK(t,tn-0.1),(q,R)=>{scroll(q,0,0,0.45);});}cine(c,t,{v:0.6});};
// Japan flies in his old commander
S.fly=(c,t,u,d)=>{const t0=S.fly.t0;gfxBG(c,t,{plate:'jg_day'});c.save();c.translate(0,0);islands(c,620,1250,1.0);c.fillStyle='#4a8a4a';c.strokeStyle='#d8e8c8';c.lineWidth=4;c.beginPath();c.moveTo(780,300);c.lineTo(860,260);c.lineTo(900,330);c.lineTo(820,420);c.lineTo(760,400);c.closePath();c.fill();c.stroke();c.restore();
  const px=620-110,py=1250-34;mpin(c,px,py,1);const p=ON(t,t0+0.1,1.3);c.save();c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=6;c.setLineDash([16,12]);c.beginPath();c.moveTo(830,360);c.quadraticCurveTo(900,800,px,py-110);c.stroke();c.setLineDash([]);c.restore();
  const q=1-p,x=q*q*830+2*q*p*900+p*p*px,y=q*q*360+2*q*p*800+p*p*(py-110),dx=2*q*(900-830)+2*p*(px-900),dy=2*q*(800-360)+2*p*(py-110-800);plane(c,x,y,1.9,Math.atan2(dy,dx));cine(c,t,{v:0.45,bars:0});};
// relieved of duty: old commander reads; Onoda at attention; light breaks through
S.relieve=(c,t,u,d)=>{const t0=S.relieve.t0,tr=wt('relieved',t0);cam(c,'jg_day',{z:K3(u,d,1.06,1.16),y:1000});const lit=ON(t,tr-0.2,1.2);godrays(c,560,-80,0.12+0.25*lit,'255,240,200');
  const T2=who(c,'tani',[0.65,0,-0.3],X('dot','worried','flat',{f:-1,view:'3q',hf:[-50,24],hb:[-20,30]}));if(T2){doc(c,(T2.hf.x+T2.hb.x)/2-6,T2.hf.y-8,T2.s/3.4*1.25,0.04,{w:110,h:76,col:'#fbf6ea'});hands(c,T2,KIND2.tani);}
  soldier(c,[-0.4,0,-0.2],X(t>tr+0.2?'sad':'focus',t>tr?'worried':'angry',t>tr+0.2?'wobble':'flat',{kind:'onodaOld',f:1,view:'3q',hf:[8,93],hb:[-8,93],tear:t>tr+0.3,cry:t>tr+0.8}));c.restore();cine(c,t,{v:0.5,tint:lit>0?'rgba(255,220,160,0.12)':null});};
// salute, then the sword is handed over
S.sword=(c,t,u,d)=>{const t0=S.sword.t0,th=wt('hands',t0);cam(c,'jg_day',{z:K3(u,d,1.16,1.24),y:960});godrays(c,560,-80,0.3,'255,240,200');const give=t>th-0.15;const gk=ON(t,th-0.15,0.6);
  const T2=who(c,'tani',[0.65,0,-0.3],X('dot','worried',give?'smile':'flat',{f:-1,view:'3q',hf:give?[lerp(-20,-70,gk),46]:[-12,92],hb:give?[lerp(-6,-50,gk),50]:[12,92]}));
  const O=soldier(c,[-0.4,0,-0.2],X('sad','worried','flat',{kind:'onodaOld',f:1,view:'3q',hf:give?[lerp(20,70,gk),44]:[44,-66],hb:give?[lerp(10,56,gk),50]:[-8,93],tear:true}));if(O&&!give)salutePalm(c,O,1);
  if(O&&give){katana(c,(O.hf.x+(T2?T2.hf.x:O.hf.x+200))/2-20*O.s/3.4,O.hf.y-4,O.s/3.4*2.1,0);hands(c,O,KIND2.onodaOld);if(T2&&gk>0.9)hands(c,T2,KIND2.tani);}c.restore();cine(c,t,{v:0.5});};
// the rifle still works perfectly
S.rifle=(c,t,u,d)=>{const t0=S.rifle.t0,tp=wt('perfectly',t0);gfxBG(c,t,{plate:'jg_day'});const k=popK(t,t0+0.05);c.save();c.translate(560,960);c.rotate(-0.25);c.scale(k,k);rifle(c,{x:-330,y:0},{x:-80,y:0},3.0,2.6);
  const sh=((t-t0)*0.7)%1;c.globalCompositeOperation='lighter';const g2=c.createLinearGradient(-500+sh*1400,0,-380+sh*1400,0);g2.addColorStop(0,'rgba(255,255,255,0)');g2.addColorStop(0.5,'rgba(255,255,255,0.6)');g2.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g2;c.fillRect(-520,-50,1100,100);c.restore();
  check(c,540,1420,90,popK(t,tp-0.1));if(t>tp-0.1)starBurst(c,860,860,60,popK(t,tp-0.1)*clamp(1-(t-tp)));cine(c,t,{v:0.45,bars:0});};
// ending: he walks into the light; 29 years; fade to black
S.end=(c,t,u,d)=>{const t0=S.end.t0,tt=wt('to',t0+1.5);
  if(t<tt-0.1){// 1 · he takes off his cap and holds it to his chest; light falls on him
    const p=ON(t,t0+0.15,0.9);cam(c,'jg_day',{z:K3(t-t0,tt-t0,1.55,1.68),x:430,y:K3(t-t0,tt-t0,900,880)});godrays(c,520,-80,0.34,'255,240,200');
    const off=p>0.55;const r=soldier(c,[-0.4,0,-0.2],X(t>t0+1.0?'sad':'focus','worried',t>t0+1.0?'wobble':'flat',{kind:'onodaOld',f:1,view:'front',noCap:off,hf:off?[-16,40]:[lerp(12,30,p*1.8),lerp(93,-70,Math.min(1,p*1.8))],hb:off?[16,44]:[-12,93],tear:t>t0+1.1,cry:t>t0+1.4,tilt:off?0.06:0}));
    if(r&&off){const cx=(r.hf.x+r.hb.x)/2,cy=(r.hf.y+r.hb.y)/2-10;hands(c,r,KIND2.onodaOld);capIco(c,cx,cy,95*r.s/3.4,'#76704a');}c.restore();cine(c,t,{v:0.55,tint:'rgba(255,220,160,0.1)'});return;}
  // 2 · the empty clearing at dawn: his rifle planted in the ground, the cap hung on it; leaves drift; fade to black
  cam(c,'jg_dawn',{z:K3(t-tt,END-tt,1.32,1.12),y:1030});godrays(c,560,-80,0.36,'255,230,180');
  const g=pp([0,0,1.4]);const sc=g.s/2.6*1.5;rifle(c,{x:g.x+6*sc,y:g.y-330*sc},{x:g.x+2*sc,y:g.y-200*sc},sc*1.2,2.6);capIco(c,g.x+8*sc,g.y-360*sc,58*sc,'#76704a');
  c.fillStyle='rgba(40,30,20,0.35)';c.beginPath();c.ellipse(g.x,g.y+4,70*sc,14*sc,0,0,TAU);c.fill();
  for(let i=0;i<10;i++){const q=((t*0.12+hash(i*5))%1);const x=hash(i*2)*1100+Math.sin(q*6+i)*60,y=-40+q*1900;c.save();c.translate(x,y);c.rotate(q*9+i);c.fillStyle=['#7a9a3a','#a8a040','#5a8a3a'][i%3];c.strokeStyle=OL;c.lineWidth=2.5;c.beginPath();c.ellipse(0,0,16,7,0,0,TAU);c.fill();c.stroke();c.restore();}
  mist(c,t,1380,0.34);c.restore();chip(c,540,1680,'1945  →  1974',popK(t,tt+0.4)*(1-ON(t,END-2.0,0.6)),{col:'#fff'});cine(c,t,{v:0.6});flash(c,ON(t,END-1.5,1.4),'#000');};
// ---------- timeline ----------
const SEQ=[['hook',0],['map',wt('give',7)],['beach',wt('1944')],['orders',wt('never',19.5)],['surr',wt('a',24.3)],['leaf',wt('leaflets')],['read',wt('onoda',30)],['fight',wt('so',33)],['raid',wt('raiding')],['cost',wt('locals')],
  ['men',wt('one',40)],['alone',wt("he's",44)],['suz',wt('then',45)],['finds',wt('he',52)],['quit',wt('but',53.4)],['fly',wt('so',56.4)],['relieve',wt('commander',57.5)],['sword',wt('onoda',62)],['rifle',wt('his',64.8)],['end',wt('29',67)]];
SEQ.forEach(([k,t0])=>{S[k].t0=t0;});
const SHOTS=SEQ.map(([k,t0])=>[t0,(c,t,u,d)=>S[k](c,t,u,d)]);
SHOTS.push([200,(c,t,u,d)=>{T=3;cam(c,'jg_rain',{z:2.0,x:552,y:600});
  c.save();c.setTransform(SS,0,0,SS,0,0);c.fillStyle='rgba(8,6,12,0.6)';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,1100,60,540,1100,950);g.addColorStop(0,'rgba(255,120,40,0.95)');g.addColorStop(0.45,'rgba(200,40,20,0.55)');g.addColorStop(1,'rgba(20,0,0,0)');c.globalCompositeOperation='screen';c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';
  godrays(c,540,1100,0.22,'255,140,70');for(let i=0;i<16;i++){const x=60+hash(i*3)*960,y=560+hash(i*7)*1300;if(Math.hypot(x-540,(y-1100)*0.8)<420)continue;doc(c,x,y,0.8+hash(i)*0.6,(hash(i*5)-0.5)*2.4,{w:62,h:80,lw:3});}c.restore();
  soldier(c,[0,0,0.3],X('glare','angry','grit',{kind:'onodaOld',view:'front',hf:[12,93],hb:[-12,93]}));c.restore();
  rainFx(c,2.1,1,220);vign(c,0.55);grain(c,3);
  txt(c,'HE FOUGHT WWII',540,300,104,'#fff',{sw:24,ls:3});txt(c,'FOR 29 MORE YEARS',540,440,96,'#ff2b2b',{sw:24,ls:3});T=200;}]);
SHOTS.push([300,(c,t,u,d)=>{cam(c,'jg_day',{z:1.3,x:540,y:900});const ks=['onoda','onodaOld','cmdr','tani','suzuki'];ks.forEach((k,i)=>{const pos=[-0.95+i*0.48,0,-0.3];const r=who(c,k,pos,X(i%2?'focus':'dot',i===1?'worried':'flat','flat',{view:i<3?'front':'3q',f:1,hf:[12,93],hb:[-12,93]}));if(r&&KIND2[k].ragged)ragged(c,r);});c.restore();}]);
