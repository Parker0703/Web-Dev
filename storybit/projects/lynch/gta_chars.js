'use strict';
// ===================== GTA 6 leak · cast + props (StoryBit C) =====================
Object.assign(KIND2,{
  hacker:Object.assign(mkK({coat:'#2c3240',trim:'#454e64',skin:SK[2],pants:'#3a4a66'}),{robe:false,long:false,hair4:'swoop',hair:'#3a2418',legW:1.55,browW:1.1}),
  ukcop:Object.assign(mkK({coat:'#161a2a',trim:'#e8ecf4',skin:SK[1],pants:'#161a2a'}),{robe:false,long:false,hair4:'crew',hair:'#3a2a1c',hat2:'police',hatCol:'#121626',belt:1,legW:1.55,browW:1.3}),
  ukcop2:Object.assign(mkK({coat:'#161a2a',trim:'#e8ecf4',skin:SK[3],pants:'#161a2a'}),{robe:false,long:false,hair4:'crew',hair:'#c8a050',hat2:'police',hatCol:'#121626',belt:1,legW:1.55,mst:'brush',mstCol:'#b08840'}),
  dev1:Object.assign(mkK({coat:'#5a3a6a',trim:'#f0e8f4',skin:SK[1],pants:'#3a4258'}),{robe:false,long:false,hair4:'part',hair:'#2a1c16',glasses:1,legW:1.55,fb:'short',fbCol:'#2a1c16'}),
  dev2:Object.assign(mkK({coat:'#3a6a5a',trim:'#e8f4f0',skin:SK[3],pants:'#4a4a58'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#a8542c',fem:1,legW:1.5}),
  judge:Object.assign(mkK({coat:'#121216',trim:'#ffffff',skin:SK[0],pants:'#121216'}),{robe:false,long:true,hair4:'cloud',hair:'#f2f0ea',old:1,legW:1.55,browCol:'#9a9890',glasses:1}),
  doctor:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:SK[2],pants:'#3a5a7a'}),{robe:false,long:true,hair4:'crew',hair:'#1c1a1e',legW:1.55,tie:'#2a5a7a',browW:1.2}),
  nurse:Object.assign(mkK({coat:'#5aa0a8',trim:'#e8f4f4',skin:SK[1],pants:'#5aa0a8'}),{robe:false,long:false,hair4:'crew',hair:'#2a2420',legW:1.55}),
});
// ---------- props ----------
function laptop(c,x,y,s,open=1,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;
  c.fillStyle='#8a9098';rr(c,-90*s,-8*s,180*s,16*s,5*s);c.fill();c.stroke();
  if(open>0){c.save();c.scale(1,open);c.fillStyle='#4a5058';rr(c,-84*s,-120*s,168*s,112*s,8*s);c.fill();c.stroke();c.fillStyle=o.scr||'#1a2a4a';rr(c,-74*s,-112*s,148*s,96*s,4*s);c.fill();if(o.glow){c.fillStyle='rgba(90,255,140,0.8)';for(let i=0;i<7;i++)c.fillRect(-66*s,(-104+i*12)*s,(40+hash(i+Math.floor(T*6))*90)*s,4*s);}c.restore();}
  c.restore();}
function evidenceBag(c,x,y,s,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='rgba(220,235,245,0.35)';c.strokeStyle=K2;c.lineWidth=5*s;rr(c,-110*s,-70*s,220*s,140*s,10*s);c.fill();c.stroke();
  laptop(c,0,40*s,0.9*s,0,{});c.fillStyle='#4a5058';rr(c,-76*s,-40*s,152*s,70*s,6*s);c.fill();c.stroke();
  c.fillStyle='#d82a2a';c.fillRect(-110*s,-70*s,220*s,30*s);c.strokeRect(-110*s,-70*s,220*s,30*s);txt(c,'EVIDENCE',0,-55*s,20*s,'#fff',{stroke:false,ls:3});
  c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(-100*s,-30*s,10*s,90*s);c.restore();}
function phone(c,x,y,s,rot=0,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#16181e';c.strokeStyle=K2;c.lineWidth=5*s;rr(c,-34*s,-64*s,68*s,128*s,12*s);c.fill();c.stroke();
  const g=c.createLinearGradient(0,-58*s,0,58*s);g.addColorStop(0,o.c1||'#2a5ad8');g.addColorStop(1,o.c2||'#6a2ad8');c.fillStyle=g;rr(c,-28*s,-56*s,56*s,112*s,8*s);c.fill();
  if(o.code){c.fillStyle='rgba(120,255,160,0.85)';for(let i=0;i<9;i++)c.fillRect(-22*s,(-48+i*11)*s,(14+hash(i+Math.floor(T*8))*30)*s,3.5*s);}
  if(o.glow){c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(0,0,0,0,0,160*s);gg.addColorStop(0,'rgba(90,140,255,0.35)');gg.addColorStop(1,'rgba(90,140,255,0)');c.fillStyle=gg;c.fillRect(-160*s,-160*s,320*s,320*s);}
  c.restore();}
function fireStick(c,x,y,s,rot=0,led=0){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;
  c.fillStyle='#c8ccd4';rr(c,96*s,-14*s,40*s,28*s,4*s);c.fill();c.stroke();c.fillStyle='#2a2c30';for(let i=0;i<5;i++)c.fillRect((104+i*6)*s,-6*s,3*s,12*s);
  const g=c.createLinearGradient(0,-20*s,0,20*s);g.addColorStop(0,'#3a3c44');g.addColorStop(1,'#0e0f12');c.fillStyle=g;rr(c,-96*s,-24*s,196*s,48*s,20*s);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.2)';rr(c,-86*s,-18*s,170*s,8*s,4*s);c.fill();txt(c,'fire tv',-10*s,4*s,22*s,'#e8e8ee',{stroke:false,w:700});
  if(led>0){glowAt(c,-78*s,12*s,40*s,'255,170,60',0.8*led);c.fillStyle='#ffb040';c.beginPath();c.arc(-78*s,12*s,4*s,0,TAU);c.fill();}
  c.restore();}
function gtaBox(c,x,y,s,rot=0,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';const w=200*s,h=250*s;
  c.fillStyle='rgba(0,0,0,0.35)';rr(c,-w/2+12*s,-h/2+16*s,w,h,10*s);c.fill();
  c.fillStyle='#1846a8';c.strokeStyle=K2;c.lineWidth=6*s;rr(c,-w/2,-h/2,w,h,10*s);c.fill();c.stroke();
  c.save();rr(c,-w/2+10*s,-h/2+34*s,w-20*s,h-44*s,4*s);c.clip();c.translate(-w/2+10*s,-h/2+34*s);vcArt(c,w-20*s,h-44*s);c.restore();
  c.fillStyle='#ffffff';txt(c,'PS5',-w/2+30*s,-h/2+17*s,18*s,'#fff',{stroke:false,w:900});
  c.save();c.translate(0,-h/2+90*s);txt(c,'GRAND THEFT',0,-16*s,24*s,'#fff6e8',{sw:6*s,sc:'#120a1c'});txt(c,'AUTO',0,10*s,24*s,'#fff6e8',{sw:6*s,sc:'#120a1c'});txt(c,'VI',0,56*s,64*s,'#ff5aa8',{sw:10*s,sc:'#120a1c'});c.restore();
  c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.moveTo(-w/2+14*s,-h/2+40*s);c.lineTo(-w/2+50*s,-h/2+40*s);c.lineTo(-w/2+14*s,h/2-20*s);c.closePath();c.fill();
  if(o.crack){c.strokeStyle='#ffffff';c.lineWidth=4*s;c.beginPath();c.moveTo(-20*s,-h/2);c.lineTo(10*s,-40*s);c.lineTo(-14*s,10*s);c.lineTo(20*s,60*s);c.lineTo(0,h/2);c.stroke();}
  c.restore();}
function gavel(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#7a4a24';rr(c,-8*s,0,16*s,150*s,6*s);c.fill();c.stroke();c.fillStyle='#5a3418';rr(c,-60*s,-30*s,120*s,46*s,14*s);c.fill();c.stroke();c.fillStyle='#d8b050';c.fillRect(-46*s,-30*s,10*s,46*s);c.fillRect(36*s,-30*s,10*s,46*s);c.restore();}
function clipboard(c,x,y,s,rot,fn){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#8a5a30';rr(c,-70*s,-90*s,140*s,180*s,10*s);c.fill();c.stroke();c.fillStyle='#fbf8f0';c.fillRect(-58*s,-74*s,116*s,156*s);c.strokeRect(-58*s,-74*s,116*s,156*s);
  c.fillStyle='#b8bcc4';rr(c,-30*s,-98*s,60*s,26*s,6*s);c.fill();c.stroke();if(fn)fn(c,s);c.restore();}
function cash(c,x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='#7ac46a';c.strokeStyle=K2;c.lineWidth=4*s;rr(c,-60*s,-28*s,120*s,56*s,4*s);c.fill();c.stroke();c.strokeStyle='#3a7a3a';c.lineWidth=3*s;c.beginPath();c.arc(0,0,16*s,0,TAU);c.stroke();txt(c,'$',0,2*s,22*s,'#2a5a2a',{stroke:false});c.restore();}
function unionJack(c,x,y,w,k=1){if(k<=0)return;const h=w*0.5;c.save();c.translate(x,y);c.scale(k,k);c.beginPath();c.rect(-w/2,-h/2,w,h);c.save();c.clip();c.fillStyle='#1a2a6c';c.fillRect(-w/2,-h/2,w,h);
  c.strokeStyle='#fff';c.lineWidth=h*0.2;c.beginPath();c.moveTo(-w/2,-h/2);c.lineTo(w/2,h/2);c.moveTo(w/2,-h/2);c.lineTo(-w/2,h/2);c.stroke();c.strokeStyle='#c8102e';c.lineWidth=h*0.07;c.stroke();
  c.strokeStyle='#fff';c.lineWidth=h*0.33;c.beginPath();c.moveTo(0,-h/2);c.lineTo(0,h/2);c.moveTo(-w/2,0);c.lineTo(w/2,0);c.stroke();c.strokeStyle='#c8102e';c.lineWidth=h*0.2;c.stroke();c.restore();
  c.strokeStyle=K2;c.lineWidth=6;c.stroke();c.restore();}
function copLights(c,t,a=1){const ph=Math.floor(t*6)%2;c.save();c.globalCompositeOperation='lighter';for(const [x,col,on] of [[-100,'255,40,40',ph],[W+100,'40,90,255',1-ph]]){const g=c.createRadialGradient(x,700,0,x,700,900);g.addColorStop(0,`rgba(${col},${0.55*a*(on?1:0.25)})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(0,0,W,H);}c.restore();}
// map content onto a quad in the plate (3 world corners: top-left, top-right, bottom-left), drawn in a unit box w×h
function onQuad(c,tl,tr,bl,w,h,fn){const A=pp(tl),B=pp(tr),C=pp(bl);c.save();c.transform((B.x-A.x)/w,(B.y-A.y)/w,(C.x-A.x)/h,(C.y-A.y)/h,A.x,A.y);c.beginPath();c.rect(0,0,w,h);c.clip();fn(c,w,h);c.restore();}
// solid occluder from plate geometry (redraw furniture in front of a character)
function occluder(c,pts,col,o={}){const P=pts.map(p=>pp(p));c.save();c.beginPath();P.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();c.fillStyle=col;c.fill();if(o.line!==false){c.strokeStyle=K2;c.lineWidth=o.lw||5;c.stroke();}c.restore();}
function chatPanel(c,x,y,w,h,k,msgs,t){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(18,20,28,0.94)';c.strokeStyle=K2;c.lineWidth=6;rr(c,-w/2,-h/2,w,h,22);c.fill();c.stroke();
  c.fillStyle='#3a1a4a';rr(c,-w/2,-h/2,w,70,22);c.fill();c.fillRect(-w/2,-h/2+40,w,30);txt(c,'# general',-w/2+30,-h/2+36,30,'#fff',{stroke:false,al:'left'});txt(c,'ROCKSTAR GAMES',w/2-30,-h/2+36,24,'#f6c21a',{stroke:false,al:'right',ls:2});
  let yy=-h/2+120;for(const [who,txt2,col,kk] of msgs){if(kk<=0)continue;c.save();c.globalAlpha=Math.min(1,kk);c.fillStyle=col;c.beginPath();c.arc(-w/2+50,yy+14,22,0,TAU);c.fill();txt(c,who,-w/2+86,yy+10,32,col,{stroke:false,al:'left'});
    c.font='800 46px "Inter Display"';c.fillStyle='#ffffff';c.textAlign='left';c.textBaseline='middle';const words=txt2.split(' ');let line='',ly=yy+64;for(const wd of words){if(c.measureText(line+wd).width>w-140){c.fillText(line,-w/2+86,ly);line='';ly+=58;}line+=wd+' ';}c.fillText(line,-w/2+86,ly);yy=ly+70;c.restore();}
  c.restore();}

function vcArt(x,w,h){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a1650');g.addColorStop(0.45,'#e84a8a');g.addColorStop(0.75,'#ffb060');g.addColorStop(1,'#1a2a50');x.fillStyle=g;x.fillRect(0,0,w,h);
  x.fillStyle='#fff2c8';x.beginPath();x.arc(w*0.5,h*0.62,h*0.18,0,TAU);x.fill();x.fillStyle='#1a0e2a';for(let i=0;i<14;i++){const bx=i*w/14,bh=h*(0.12+hash(i*3)*0.22);x.fillRect(bx,h*0.78-bh,w/14-4,bh);}x.fillRect(0,h*0.78,w,h*0.22);
  const palm=(px,py,s)=>{x.strokeStyle='#120a1c';x.lineWidth=7*s;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+10*s,py-80*s,px-6*s,py-160*s);x.stroke();x.fillStyle='#120a1c';for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*0.55;x.beginPath();x.ellipse(px-6*s+Math.cos(a)*40*s,py-160*s+Math.sin(a)*24*s+14*s,46*s,9*s,a,0,TAU);x.fill();}};palm(w*0.12,h,h/300);palm(w*0.88,h,h/280);}
// ---------- high-security display: pedestal + glass case + laser emitters + cameras + beacons ----------
function secCam(c,x,y,s,ang,t,ph){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#d8dce4';rr(c,-14*s,-50*s,28*s,40*s,4*s);c.fill();c.stroke();
  c.rotate(ang);c.fillStyle='#e8ecf2';rr(c,-20*s,-26*s,110*s,46*s,10*s);c.fill();c.stroke();c.fillStyle='#2a2e38';rr(c,82*s,-22*s,22*s,38*s,6*s);c.fill();c.stroke();c.fillStyle='#0a0c12';c.beginPath();c.arc(96*s,-3*s,11*s,0,TAU);c.fill();
  const on=((t*2+ph)%1)<0.5;c.fillStyle=on?'#ff2a2a':'#5a1a1a';c.beginPath();c.arc(8*s,-12*s,6*s,0,TAU);c.fill();if(on)glowAt(c,8*s,-12*s,26*s,'255,40,40',0.8);
  c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(100*s,0,520*s,0);g.addColorStop(0,'rgba(255,60,60,0.22)');g.addColorStop(1,'rgba(255,60,60,0)');c.fillStyle=g;c.beginPath();c.moveTo(100*s,-3*s);c.lineTo(520*s,-90*s);c.lineTo(520*s,84*s);c.closePath();c.fill();c.restore();c.restore();}
function beacon(c,x,y,s,t){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#3a3c44';rr(c,-26*s,0,52*s,16*s,4*s);c.fill();c.stroke();c.fillStyle='#d8201a';c.beginPath();c.moveTo(-20*s,0);c.lineTo(-16*s,-40*s);c.quadraticCurveTo(0,-54*s,16*s,-40*s);c.lineTo(20*s,0);c.closePath();c.fill();c.stroke();
  const a=t*7;c.save();c.globalCompositeOperation='lighter';for(const k of [0,Math.PI]){const g=c.createLinearGradient(0,-24*s,Math.cos(a+k)*600*s,-24*s+Math.sin(a+k)*160*s);g.addColorStop(0,'rgba(255,50,40,0.55)');g.addColorStop(1,'rgba(255,50,40,0)');c.fillStyle=g;c.beginPath();c.moveTo(0,-24*s);c.lineTo(Math.cos(a+k-0.18)*600*s,-24*s+Math.sin(a+k-0.18)*160*s);c.lineTo(Math.cos(a+k+0.18)*600*s,-24*s+Math.sin(a+k+0.18)*160*s);c.closePath();c.fill();}c.restore();glowAt(c,0,-24*s,60*s,'255,60,40',0.6);c.restore();}
function securityDisplay(c,x,y,s,t,o={}){// x,y = floor point of the pedestal centre; s = scale
  // laser emitter posts
  const PX=[x-330*s,x+330*s];for(const px of PX){c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(px,y+4*s,40*s,10*s,0,0,TAU);c.fill();c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;const g=c.createLinearGradient(px-22*s,0,px+22*s,0);g.addColorStop(0,'#2a2c34');g.addColorStop(0.5,'#5a5e6a');g.addColorStop(1,'#1e2028');c.fillStyle=g;rr(c,px-22*s,y-520*s,44*s,520*s,10*s);c.fill();c.stroke();
    for(let i=0;i<7;i++){c.fillStyle='#ff2a2a';c.beginPath();c.arc(px,y-(60+i*66)*s,6*s,0,TAU);c.fill();}}
  // pedestal
  c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(x,y+4*s,170*s,30*s,0,0,TAU);c.fill();
  const pg=c.createLinearGradient(x-120*s,0,x+120*s,0);pg.addColorStop(0,'#1a1c22');pg.addColorStop(0.45,'#4a4e5a');pg.addColorStop(1,'#14161c');c.fillStyle=pg;c.beginPath();c.moveTo(x-140*s,y);c.lineTo(x-110*s,y-230*s);c.lineTo(x+110*s,y-230*s);c.lineTo(x+140*s,y);c.closePath();c.fill();c.stroke();
  c.fillStyle='#5a5e6a';rr(c,x-150*s,y-262*s,300*s,34*s,6*s);c.fill();c.stroke();
  // keypad on the pedestal
  c.fillStyle='#0e1016';rr(c,x-40*s,y-190*s,80*s,90*s,8*s);c.fill();c.stroke();for(let i=0;i<9;i++){c.fillStyle=i===4&&((t*3)%1<0.5)?'#ff3a3a':'#3a6a8a';c.fillRect(x+(-28+(i%3)*20)*s,y+(-178+Math.floor(i/3)*20)*s,14*s,14*s);}
  // the box inside a glass case
  gtaBox(c,x,y-262*s-150*s,s*0.95,0,{});
  c.save();c.globalAlpha=0.9;c.strokeStyle='rgba(200,235,255,0.9)';c.lineWidth=5*s;c.fillStyle='rgba(170,220,255,0.12)';c.beginPath();c.rect(x-135*s,y-262*s-320*s,270*s,320*s);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.moveTo(x-120*s,y-570*s);c.lineTo(x-80*s,y-570*s);c.lineTo(x-125*s,y-300*s);c.lineTo(x-130*s,y-300*s);c.closePath();c.fill();c.restore();
  // laser grid: emitter to emitter, criss-crossing, gently sweeping; dust makes them glow
  c.save();c.globalCompositeOperation='lighter';c.lineCap='round';for(let i=0;i<7;i++){const y1=y-(60+i*66)*s,y2=y-(60+((i*3+Math.floor(t*0.8))%7)*66)*s+Math.sin(t*2+i)*14*s;for(const [w2,a] of [[14*s,0.18],[6*s,0.35],[2.2*s,1]]){c.strokeStyle=`rgba(255,40,40,${a})`;c.lineWidth=w2;c.beginPath();c.moveTo(PX[0],y1);c.lineTo(PX[1],y2);c.stroke();}}
  for(let i=0;i<40;i++){const px=PX[0]+hash(i*3.1)*(PX[1]-PX[0]),py=y-hash(i*5.7)*480*s+Math.sin(t+i)*6*s;c.fillStyle=`rgba(255,140,140,${0.3+0.3*Math.sin(t*3+i)})`;c.beginPath();c.arc(px,py,2*s,0,TAU);c.fill();}c.restore();}
// a cloth flag on a pole: strips with a travelling wave + fold shading
function flagWave(c,px,py,poleH,w,t,k,draw){const h=w*0.5,top=py-poleH,fy=top+lerp(poleH-h-20,10,EZ.out(k));
  c.save();c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6;const pg=c.createLinearGradient(px-8,0,px+8,0);pg.addColorStop(0,'#c8ccd4');pg.addColorStop(1,'#5a5e6a');c.fillStyle=pg;rr(c,px-8,top-14,16,poleH+14,6);c.fill();c.stroke();c.fillStyle='#f0c860';c.beginPath();c.arc(px,top-18,14,0,TAU);c.fill();c.stroke();
  const F=lyr('flag',Math.ceil(w),Math.ceil(h));F.width=Math.ceil(w);F.height=Math.ceil(h);const f=F.getContext('2d');f.setTransform(1,0,0,1,0,0);f.clearRect(0,0,w,h);f.translate(w/2,h/2);draw(f,w);
  const N=48;for(let i=0;i<N;i++){const u=i/N,sx=u*w,amp=(6+u*26),dy=Math.sin(u*7-t*6)*amp,dx=-Math.abs(Math.sin(u*7-t*6))*u*6,sl=Math.cos(u*7-t*6);
    c.drawImage(F,sx,0,w/N+1,h,px+8+sx+dx,fy+dy,w/N+1,h);c.fillStyle=sl>0?`rgba(255,255,255,${0.12*sl})`:`rgba(0,0,20,${-0.28*sl})`;c.fillRect(px+8+sx+dx,fy+dy,w/N+1,h);}
  // outline top & bottom edges + free end
  c.strokeStyle=K2;c.lineWidth=5;for(const yy of [0,h]){c.beginPath();for(let i=0;i<=N;i++){const u=i/N,dy=Math.sin(u*7-t*6)*(6+u*26),dx=-Math.abs(Math.sin(u*7-t*6))*u*6;const X=px+8+u*w+dx,Y=fy+yy+dy;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();}
  const ue=1,dye=Math.sin(7-t*6)*32,dxe=-Math.abs(Math.sin(7-t*6))*6;c.beginPath();c.moveTo(px+8+w+dxe,fy+dye);c.lineTo(px+8+w+dxe,fy+h+dye);c.stroke();
  c.strokeStyle='#e8e8ee';c.lineWidth=3;seg(c,px,top,px+8,fy);seg(c,px,top+40,px+8,fy+h);c.restore();}
function jackDraw(f,w){const h=w*0.5;f.fillStyle='#1a2a6c';f.fillRect(-w/2,-h/2,w,h);f.strokeStyle='#fff';f.lineWidth=h*0.2;f.beginPath();f.moveTo(-w/2,-h/2);f.lineTo(w/2,h/2);f.moveTo(w/2,-h/2);f.lineTo(-w/2,h/2);f.stroke();f.strokeStyle='#c8102e';f.lineWidth=h*0.07;f.stroke();f.strokeStyle='#fff';f.lineWidth=h*0.33;f.beginPath();f.moveTo(0,-h/2);f.lineTo(0,h/2);f.moveTo(-w/2,0);f.lineTo(w/2,0);f.stroke();f.strokeStyle='#c8102e';f.lineWidth=h*0.2;f.stroke();}
