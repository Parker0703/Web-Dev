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
