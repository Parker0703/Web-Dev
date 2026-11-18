'use strict';
// ===================== Knockout · shots (Style 5) =====================
SHOTS.length=0;SEQ.length=0;
const V={};const VSEQ=[];
function headWho(c,kind,x,y,s,o){o=Object.assign({},o);if(!o.rot)o.rot=1e-4;const oy=headOff(kind,o)*s;return who(c,kind,[0,0,0],Object.assign({},o,{abs:{x,y:y-oy,s}}));}
function darkBG(c,t,col='10,12,30',o){richBG(c,t,col,o||{});}
const MPX=p=>164*p.s;
function blurBG(c,px,dark=0.25){if(px>0){c.save();c.setTransform(1,0,0,1,0,0);c.filter=`blur(${px*SS}px)`;c.drawImage(c.canvas,0,0);c.restore();}if(dark){c.fillStyle=`rgba(0,0,0,${dark})`;c.fillRect(0,0,W,H);}}
const F3=(e='dot',b='flat',m='flat',o={})=>X(e,b,m,Object.assign({view:'3q'},o));
const FF=(e='dot',b='flat',m='flat',o={})=>X(e,b,m,Object.assign({view:'front'},o));
function iconCross(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#e8342a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.22;c.lineCap='round';c.beginPath();c.moveTo(-r*0.4,-r*0.4);c.lineTo(r*0.4,r*0.4);c.moveTo(r*0.4,-r*0.4);c.lineTo(-r*0.4,r*0.4);c.stroke();c.restore();}
function iconCheck(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#3ad06a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.22;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-r*0.42,0);c.lineTo(-r*0.1,r*0.32);c.lineTo(r*0.45,-r*0.36);c.stroke();c.restore();}
const sg=(t,a,b)=>clamp((t-a)/(b-a));
// ---------------- ring helpers ----------------
const MAT=1.0;
// front ropes (z=0) drawn AFTER the fighters, only for cameras outside the ring
function koRopesFront(c){const RC=['#d8202a','#f4f4f4','#2048c8'],RH=[1.45,1.1,0.78];c.save();c.lineCap='round';
  for(let i=0;i<3;i++){const y=MAT+RH[i]*0.95,a=pp([-3.2,y,0]),b=pp([3.2,y,0]),w=0.06*MPX(a);c.strokeStyle=OL;c.lineWidth=w+6;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.strokeStyle=RC[i];c.lineWidth=w;c.stroke();c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=w*0.3;c.beginPath();c.moveTo(a.x,a.y-w*0.25);c.lineTo(b.x,b.y-w*0.25);c.stroke();}
  for(const x of [-1.07,1.07]){const a=pp([x,MAT+0.6,0]),b=pp([x,MAT+1.45,0]);c.strokeStyle=OL;c.lineWidth=0.07*MPX(a)+5;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.strokeStyle='#f4f4f4';c.lineWidth=0.07*MPX(a);c.stroke();}
  c.restore();}
// shoulder of a figure drawn at ground point p (plate px), scale s, crouch, lean, facing f
const shoulder=(p,s,cr=0,ln=0,f=1)=>{const hy=p.y-116*s+cr*s;return {x:p.x+Math.sin(ln*f)*84*s,y:hy-Math.cos(ln*f)*84*s};};
const toH=(sh,s,m)=>[(m.x-sh.x)/s,(m.y-sh.y)/s];
// guard: both gloves up in front of the chest (never over the face)
const GUARD=(f)=>({hf:[f*36,22],hb:[f*20,30]});
// boxer on the mat at world x,z: returns {r,p,s,sh}
function boxer(c,kind,x,z,f,face,o={}){const p0=pp([x,MAT,z]);const s=p0.s*(o.sc||1);const p={x:p0.x+(o.dx||0)*s,y:p0.y,s};
  const bob=o.still?0:Math.abs(Math.sin((T+(o.seed||0))*5.2))*3;const cr=(o.crouch??6)+bob,ln=o.lean??0.06;const g=GUARD(f);
  const r=who(c,kind,[0,0,0],Object.assign({},face,{abs:{x:p.x,y:p.y,s},f,rot:o.rot||1e-4,crouch:cr,lean:ln,stance:o.stance??24,hf:o.hf||g.hf,hb:o.hb||g.hb,tilt:o.tilt||0,headX:o.headX||0,seed:o.seed||0}));
  return {r,p,s,sh:shoulder(p,s,cr,ln,f),cr,ln};}
// chin tip of a drawn figure (head centre hc, facing f)
const chinOf=(r,s,f)=>({x:r.hc.x+f*20*s,y:r.hc.y+40*s});
const browOf=(r,s,f)=>({x:r.hc.x+f*30*s,y:r.hc.y-14*s});
// punch path: rest → (small pull back) → snap out to the target → hold → retract. returns 0..1 extension (1 = on target)
function punchK(t,t0,tHit,hold=0.08,back=0.28){if(t<t0)return 0;if(t<tHit){const u=(t-t0)/(tHit-t0);return u<0.25?-0.15*EZ.smooth(u/0.25):lerp(-0.15,1,EZ.in((u-0.25)/0.75));}if(t<tHit+hold)return 1;return 1-EZ.io(clamp((t-tHit-hold)/back));}
// impact FX: burst star + radial streaks + sweat spray (world-anchored at x,y in current transform, scale m = px per metre)
function impact(c,x,y,m,p,seed=0){if(p<0||p>1)return;c.save();c.translate(x,y);const k=EZ.out(clamp(p/0.35)),fade=1-clamp((p-0.25)/0.75);
  c.globalAlpha=fade;c.fillStyle='#fff6c8';c.strokeStyle=OL;c.lineWidth=0.012*m;c.beginPath();for(let i=0;i<16;i++){const a=i/16*TAU,r=(i%2?0.07:0.17)*m*k*(0.8+hash(i+seed)*0.4);c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.9)';c.lineWidth=0.012*m;c.lineCap='round';for(let i=0;i<12;i++){const a=i/12*TAU+0.13,r0=0.2*m*k,r1=(0.3+hash(i*3+seed)*0.2)*m*k;c.beginPath();c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);c.lineTo(Math.cos(a)*r1,Math.sin(a)*r1);c.stroke();}
  // sweat droplets fly off away from the glove (to +x)
  for(let i=0;i<18;i++){const a=-0.9+hash(i*7+seed)*1.8,sp=(0.25+hash(i*5)*0.55)*m,d=sp*EZ.out(p),g=0.6*m*p*p;c.fillStyle='rgba(200,230,255,0.95)';c.strokeStyle='rgba(40,60,90,0.6)';c.lineWidth=1.5;c.beginPath();c.ellipse(Math.cos(a)*d,Math.sin(a)*d+g,(0.008+hash(i)*0.01)*m,(0.005+hash(i)*0.006)*m,a,0,TAU);c.fill();c.stroke();}
  c.restore();}
function speedLines(c,a,b,m,k){if(k<=0)return;c.save();c.globalAlpha=k*0.8;c.strokeStyle='rgba(255,255,255,0.85)';c.lineCap='round';const ang=Math.atan2(b.y-a.y,b.x-a.x);for(let i=-2;i<=2;i++){const ox=-Math.sin(ang)*i*0.03*m,oy=Math.cos(ang)*i*0.03*m;c.lineWidth=(0.006+0.004*(2-Math.abs(i)))*m;c.beginPath();c.moveTo(a.x+ox,a.y+oy);c.lineTo(lerp(a.x,b.x,0.85)+ox,lerp(a.y,b.y,0.85)+oy);c.stroke();}c.restore();}
// dizzy stars orbiting a head
function dizzy(c,x,y,r,t,k=1){if(k<=0)return;c.save();c.globalAlpha=k;for(let i=0;i<5;i++){const a=t*3+i/5*TAU,px=x+Math.cos(a)*r,py=y+Math.sin(a)*r*0.3;c.fillStyle='#ffe066';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();for(let j=0;j<10;j++){const rr=j%2?r*0.07:r*0.16,b=-Math.PI/2+j*Math.PI/5+t*2;c.lineTo(px+Math.cos(b)*rr,py+Math.sin(b)*rr);}c.closePath();c.fill();c.stroke();}c.restore();}
// ---------------- X-ray / anatomy graphics ----------------
function xrayBG(c,t){c.fillStyle='#02070d';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,900,80,540,900,1100);g.addColorStop(0,'rgba(40,90,130,0.55)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(120,200,255,0.06)';c.lineWidth=2;for(let x=0;x<W;x+=60){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}for(let y=0;y<H;y+=60){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}}
// top view skull + brain (for the spin): skull angle a, brain angle b
function skullTop(c,x,y,s,a,b,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';
  // brain (drawn first, inside)
  c.save();c.rotate(b);const tw=o.twist||0;
  for(const sd of [-1,1]){c.save();c.beginPath();c.ellipse(sd*58,0,92,150,sd*tw*0.25,0,TAU);const gg=c.createRadialGradient(sd*40,-40,10,sd*58,0,170);gg.addColorStop(0,'#ffc6d6');gg.addColorStop(1,'#d86a8a');c.fillStyle=gg;c.fill();c.strokeStyle='#7a2a44';c.lineWidth=5;c.stroke();c.clip();
    c.strokeStyle='rgba(122,42,68,0.7)';c.lineWidth=4;for(let i=0;i<9;i++){const yy=-130+i*32;c.beginPath();c.moveTo(sd*10,yy);for(let k=0;k<6;k++){const xx=sd*(10+k*28),wv=Math.sin(i*1.7+k*2.1)*12+tw*sd*k*6*Math.sin(i);c.quadraticCurveTo(xx+sd*14,yy+wv+10,xx+sd*28,yy+wv);}c.stroke();}c.restore();}
  if(tw>0){c.strokeStyle=`rgba(255,80,80,${Math.min(1,tw)})`;c.lineWidth=5;for(let i=0;i<4;i++){c.beginPath();c.arc(0,0,40+i*30,-1.2+i*0.3,0.4+i*0.3);c.stroke();}}
  c.restore();
  // fluid gap
  c.save();c.rotate(a);c.strokeStyle='rgba(120,200,255,0.35)';c.lineWidth=14;c.beginPath();c.ellipse(0,0,172,192,0,0,TAU);c.stroke();
  // skull (top view): oval cranium with the nose/face at the top
  c.shadowColor='rgba(200,235,255,0.9)';c.shadowBlur=18;c.strokeStyle='rgba(215,240,255,0.95)';c.lineWidth=12;c.beginPath();c.ellipse(0,0,188,212,0,0,TAU);c.stroke();c.shadowBlur=0;
  c.fillStyle='rgba(215,240,255,0.12)';c.beginPath();c.moveTo(-60,-200);c.quadraticCurveTo(0,-290,60,-200);c.closePath();c.fill();c.strokeStyle='rgba(215,240,255,0.8)';c.lineWidth=6;c.stroke();
  for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*196,-10,14,34,0,0,TAU);c.stroke();}
  c.strokeStyle='rgba(215,240,255,0.4)';c.lineWidth=3;c.beginPath();c.moveTo(0,-212);c.lineTo(0,212);c.stroke();c.beginPath();c.moveTo(-170,-90);c.quadraticCurveTo(0,-120,170,-90);c.stroke();
  c.restore();c.restore();}
// rotation arrow (arc) around a point
function rotArrow(c,x,y,r,a0,a1,col='#ffd24a',w=14,k=1){if(k<=0)return;const a=lerp(a0,a1,k);c.save();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=w+8;c.beginPath();c.arc(x,y,r,a0,a);c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();
  const hx=x+Math.cos(a)*r,hy=y+Math.sin(a)*r,d=a1>a0?1:-1,ta=a+d*Math.PI/2;c.translate(hx,hy);c.rotate(ta);c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(w*1.6,0);c.lineTo(-w*0.6,-w*1.3);c.lineTo(-w*0.6,w*1.3);c.closePath();c.fill();c.stroke();c.restore();}
function straightArrow(c,x0,y0,x1,y1,col='#ffd24a',w=16,k=1){if(k<=0)return;const x=lerp(x0,x1,k),y=lerp(y0,y1,k);c.save();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=w+8;c.beginPath();c.moveTo(x0,y0);c.lineTo(x,y);c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();
  c.translate(x,y);c.rotate(Math.atan2(y1-y0,x1-x0));c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(w*1.7,0);c.lineTo(-w*0.5,-w*1.4);c.lineTo(-w*0.5,w*1.4);c.closePath();c.fill();c.stroke();c.restore();}
// egg cut in half: shell, white, yolk (yolk offset dx,dy lagging)
function eggCut(c,x,y,s,ang,ydx,ydy){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineJoin='round';
  const shell=()=>{c.beginPath();c.moveTo(0,-170);c.bezierCurveTo(105,-170,140,20,130,80);c.bezierCurveTo(118,160,60,190,0,190);c.bezierCurveTo(-60,190,-118,160,-130,80);c.bezierCurveTo(-140,20,-105,-170,0,-170);c.closePath();};
  shell();c.fillStyle='#f6ead8';c.fill();c.strokeStyle=OL;c.lineWidth=8;c.stroke();
  c.save();c.scale(0.9,0.9);shell();c.restore();const g=c.createRadialGradient(-20,-40,10,0,20,180);g.addColorStop(0,'rgba(255,255,255,0.95)');g.addColorStop(1,'rgba(225,235,240,0.9)');c.fillStyle=g;c.fill();c.strokeStyle='rgba(160,170,180,0.6)';c.lineWidth=3;c.stroke();
  const yg=c.createRadialGradient(ydx-22,40+ydy-26,6,ydx,40+ydy,74);yg.addColorStop(0,'#ffe27a');yg.addColorStop(1,'#f0a020');c.fillStyle=yg;c.strokeStyle='#a86a10';c.lineWidth=5;c.beginPath();c.ellipse(ydx,40+ydy,72,66,0,0,TAU);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.7)';c.beginPath();c.ellipse(ydx-24,16+ydy,16,9,-0.4,0,TAU);c.fill();
  // jagged shell rim
  c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<=16;i++){const xx=-128+i*16,yy=-60+(i%2?-12:12);i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.stroke();
  c.restore();}
// neuron network (nodes + links); fire 0..1 → all flash; dead 0..1 → dark
const NN=(()=>{const n=[];for(let i=0;i<46;i++)n.push([110+hash(i*3.3)*860,520+hash(i*7.7)*900]);const e=[];for(let i=0;i<n.length;i++)for(let j=i+1;j<n.length;j++){const d=Math.hypot(n[i][0]-n[j][0],n[i][1]-n[j][1]);if(d<190&&hash(i*31+j)<0.7)e.push([i,j]);}return {n,e};})();
function neurons(c,t,fire,dead){c.save();c.lineCap='round';for(const [i,j] of NN.e){const a=NN.n[i],b=NN.n[j];const pulse=dead>0.99?0:0.5+0.5*Math.sin(t*6+i+j);c.strokeStyle=`rgba(120,190,255,${(0.25+0.35*pulse)*(1-dead)})`;c.lineWidth=4;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
    if(fire>0&&dead<1&&hash(i*7+j+Math.floor(t*14))<0.5){c.strokeStyle=`rgba(255,255,220,${0.9*fire*(1-dead)})`;c.lineWidth=7;c.stroke();}}
  NN.n.forEach(([x,y],i)=>{const lit=dead>0.99?0.08:(fire>0?(hash(i+Math.floor(t*16))<0.6?1:0.4):0.6+0.4*Math.sin(t*3+i));const col=dead>0.5?`rgba(90,100,120,1)`:fire>0?'#fff8c0':'#7ac8ff';c.fillStyle=col;c.globalAlpha=Math.max(0.25,lit);c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.arc(x,y,16,0,TAU);c.fill();c.stroke();
    if(lit>0.9&&dead<0.5){const g=c.createRadialGradient(x,y,0,x,y,60);g.addColorStop(0,'rgba(255,250,200,0.6)');g.addColorStop(1,'rgba(255,250,200,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,60,0,TAU);c.fill();}c.globalAlpha=1;});c.restore();}
// the brain's "on switch": a big toggle (on 0..1)
function toggle(c,x,y,s,on){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.fillStyle='#1c2230';c.strokeStyle=OL;c.lineWidth=8;rr(c,-110,-190,220,380,40);c.fill();c.stroke();
  c.fillStyle=on>0.5?'#2ad46a':'#3a3f4a';rr(c,-70,-150,140,300,30);c.fill();c.stroke();if(on>0.5){const g=c.createRadialGradient(0,0,20,0,0,260);g.addColorStop(0,'rgba(80,255,140,0.35)');g.addColorStop(1,'rgba(80,255,140,0)');c.fillStyle=g;c.fillRect(-300,-300,600,600);}
  const ky=lerp(80,-80,on);c.fillStyle='#f4f4f4';rr(c,-60,ky-60,120,120,24);c.fill();c.stroke();c.fillStyle='rgba(0,0,0,0.15)';rr(c,-50,ky+10,100,40,16);c.fill();c.restore();}
function eyeIcon(c,x,y,r,open){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=7;c.fillStyle='#fff';c.beginPath();c.moveTo(-r,0);c.quadraticCurveTo(0,-r*0.9*open-2,r,0);c.quadraticCurveTo(0,r*0.9*open+2,-r,0);c.closePath();c.fill();c.stroke();
  if(open>0.15){c.fillStyle='#3a6ad8';c.beginPath();c.arc(0,0,r*0.36*open,0,TAU);c.fill();c.fillStyle=OL;c.beginPath();c.arc(0,0,r*0.18*open,0,TAU);c.fill();}c.restore();}
function stopwatch(c,x,y,r,a,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=8;c.fillStyle='#d8dce4';c.fillRect(-r*0.16,-r*1.28,r*0.32,r*0.22);c.strokeRect(-r*0.16,-r*1.28,r*0.32,r*0.22);
  c.fillStyle='#fbf8f0';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();for(let i=0;i<12;i++){const b=i/12*TAU;c.lineWidth=i%3?3:6;c.beginPath();c.moveTo(Math.cos(b)*r*0.8,Math.sin(b)*r*0.8);c.lineTo(Math.cos(b)*r*0.92,Math.sin(b)*r*0.92);c.stroke();}
  c.fillStyle='rgba(232,52,42,0.35)';c.beginPath();c.moveTo(0,0);c.arc(0,0,r*0.78,-Math.PI/2,-Math.PI/2+a);c.closePath();c.fill();c.strokeStyle='#e8342a';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-Math.PI/2+a)*r*0.75,Math.sin(-Math.PI/2+a)*r*0.75);c.stroke();c.fillStyle=OL;c.beginPath();c.arc(0,0,10,0,TAU);c.fill();c.restore();}
function flexArm(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=8;c.fillStyle='#fbf3ec';c.beginPath();c.moveTo(-150,60);c.quadraticCurveTo(-60,90,20,40);c.quadraticCurveTo(10,-40,-10,-90);c.quadraticCurveTo(40,-120,70,-90);c.quadraticCurveTo(90,0,60,70);c.quadraticCurveTo(-40,140,-150,120);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(-90,60);c.quadraticCurveTo(-40,-30,20,30);c.stroke();koGlove(c,{x:30,y:-110},3.2,'#d81f2a',-1.7);c.restore();}

// ================================ SHOTS ================================
const F_A={kind:'ace',x:-0.5,z:-5.0,f:1},F_D={kind:'duke',x:0.5,z:-5.25,f:-1,sc:1.24};
// camera aimed at a world point (plate coords from the plate's own projection)
function camOn(c,id,pt,z,dy=0,o={}){CP=PM[id];const q=pp(pt);cam(c,id,Object.assign({z,x:q.x,y:q.y+dy},o));}
const HEAD_D=[0.42,MAT+1.75,-5.25],MID=[0,MAT+1.05,-5.1];
// standard two-shot inside the ring; returns figures + draws them in depth order (Ace punches across, so Ace last)
function twoShot(c,t,o){const d=boxer(c,'duke',F_D.x+(o.dDx||0),F_D.z,-1,o.dFace||F3('glare','angry','grit'),Object.assign({sc:F_D.sc,seed:1.3},o.dO||{}));
  let a=null;if(!o.noAce){const ap=pp([F_A.x+(o.aDx||0),MAT,F_A.z]);const s=ap.s;const cr=6,ln=o.aLean||0.06;const sh=shoulder(ap,s,cr,ln,1);let hf=o.aHf||GUARD(1).hf;if(o.punch){const k=o.punch.k;const tgt=toH(sh,s,o.punch.target);hf=[lerp(GUARD(1).hf[0],tgt[0],clamp(k)),lerp(GUARD(1).hf[1],tgt[1],clamp(k))];if(k<0)hf=[GUARD(1).hf[0]+k*60,GUARD(1).hf[1]-k*10];}
    a=who(c,'ace',[0,0,0],Object.assign({},o.aFace||F3('half','angry','grit'),{abs:{x:ap.x,y:ap.y,s},f:1,rot:1e-4,crouch:cr,lean:ln,stance:28,hf,hb:o.aHb||GUARD(1).hb,seed:0.4}));a={r:a,sh,s,p:ap};}
  return {d,a};}
// 1 · "A light tap can knock out a heavyweight…" a small jab to the chin; the big man goes stiff and tips over
V.tap=(c,t,u,d)=>{const t0=V.tap.t0,tH=t0+0.95;
  if(t>=t0+1.95){camOn(c,'ring_top',[0.85,MAT,-5.2],K3(t-(t0+1.95),0.8,1.1,1.16));lieAt(c,'duke',[1.85,MAT,-5.25],[0.75,MAT,-5.25],Object.assign(X('closed','flat','o',{view:'front'}),{sc:F_D.sc,hf:[40,80],hb:[-40,80]}));
    boxer(c,'ace',-0.45,-5.0,1,F3('half','flat','smirk'),{seed:0.4,hf:[16,88],hb:[-10,90],lean:0});c.restore();cine(c,t,{v:0.5});return;}camOn(c,'ring_in',MID,K3(u,d,1.12,1.22));
  const fall=EZ.in(sg(t,tH+0.55,tH+1.9));const blank=t>tH+0.18;
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(blank?'closed':'glare',blank?'flat':'angry',blank?'o':'grit'),{sc:F_D.sc,seed:1.3,rot:1e-4+fall*0.55,still:blank,tilt:blank?0.12:0,hf:blank?[-14,80]:undefined,hb:blank?[-8,84]:undefined});
  const chin=chinOf(D.r,D.s,-1);const k=punchK(t,t0+0.55,tH,0.1,0.3);const ap=pp([F_A.x,MAT,F_A.z]);const sh=shoulder(ap,ap.s,6,0.06,1);const tg=toH(sh,ap.s,{x:chin.x-10*ap.s,y:chin.y});
  who(c,'ace',[0,0,0],Object.assign(F3('half','flat','smirk'),{abs:ap,f:1,rot:1e-4,crouch:6,lean:0.06+0.08*clamp(k),stance:28,hf:k>=0?[lerp(36,tg[0],k),lerp(22,tg[1],k)]:[36+k*40,22],hb:GUARD(1).hb}));
  if(t>tH)impact(c,chin.x,chin.y,MPX(ap)*0.6,(t-tH)/0.35,1);
  c.restore();cine(c,t,{v:0.5});};
// 2 · "…if it lands in the right spot." close on the jaw: a red target on the chin tip, the glove lines up
V.spot=(c,t,u,d)=>{const t0=V.spot.t0;camOn(c,'ring_in',HEAD_D,2.3,40);
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3('glare','angry','grit'),{sc:F_D.sc,seed:1.3});const chin=chinOf(D.r,D.s,-1);
  const ap=pp([F_A.x,MAT,F_A.z]);const sh=shoulder(ap,ap.s,6,0.06,1);const k=EZ.io(sg(t,t0+0.2,t0+0.9))*0.8;const tg=toH(sh,ap.s,{x:chin.x-26*ap.s,y:chin.y+4*ap.s});
  who(c,'ace',[0,0,0],Object.assign(F3('focus','angry','flat'),{abs:ap,f:1,rot:1e-4,crouch:6,lean:0.1,stance:28,hf:[lerp(36,tg[0],k),lerp(22,tg[1],k)],hb:GUARD(1).hb}));
  // target ring + arrow pointing at the chin from below (kept off the face)
  const M=c.getTransform();const q=popK(t,t0+0.35,0.3);const P={x:(M.a*chin.x+M.c*chin.y+M.e)/SS,y:(M.b*chin.x+M.d*chin.y+M.f)/SS};c.restore();
  if(q>0){c.save();c.translate(P.x,P.y+6);c.scale(q,q);c.strokeStyle='#ff3a2e';c.lineWidth=7;c.beginPath();c.arc(0,0,34+6*Math.sin(t*10),0,TAU);c.stroke();c.restore();straightArrow(c,P.x+40,P.y+230,P.x+12,P.y+60,'#ff3a2e',14,q);}
  cine(c,t,{v:0.5});};
function scr(c,p){return p;}
// 3 · "And it has nothing to do with power." a power meter maxes out … crossed out
V.power=(c,t,u,d)=>{const t0=V.power.t0,tn=wt('nothing',5.3);darkBG(c,t,'40,20,20',{c1:'255,90,60'});const k=popK(t,t0,0.35);
  hudCard(c,540,900,700,760,k,'255,120,90',(cc)=>{flexArm(cc,-60,-90,0.95);const fill=EZ.out(sg(t,t0+0.2,t0+1.0));for(let i=0;i<8;i++){const on=i<fill*8;cc.fillStyle=on?(i>5?'#ff3a2e':i>3?'#ffb02e':'#3ad06a'):'#2a2a34';cc.strokeStyle=OL;cc.lineWidth=5;cc.fillRect(-280+i*70,200,56,90);cc.strokeRect(-280+i*70,200,56,90);}},t);
  iconCross(c,840,560,90,popK(t,tn,0.3));cine(c,t,{v:0.5});};
// 4 · "Give me 60 seconds…" the arena: fighters circle under the lights
V.give=(c,t,u,d)=>{const t0=V.give.t0;cam(c,'ring_wide',{z:K3(u,d,1.2,1.7),y:K3(u,d,980,940),x:540});
  const a=Math.sin((t-t0)*0.9)*0.25;boxer(c,'duke',0.6+a,-3.6,-1,F3('glare','angry','grit'),{sc:1.24,seed:1.3});boxer(c,'ace',-0.6+a,-3.1,1,F3('half','angry','grit'),{seed:0.4});
  boxer(c,'ref',1.45,-5.5,-1,F3('dot','flat','flat'),{still:1,hf:[-16,90],hb:[12,92],lean:0});
  koRopesFront(c);c.restore();
  // lights flare from the rig
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const g=c.createRadialGradient(150+i*260,120,0,150+i*260,120,260);g.addColorStop(0,'rgba(255,250,230,0.25)');g.addColorStop(1,'rgba(255,250,230,0)');c.fillStyle=g;c.fillRect(0,0,W,700);}c.restore();
  cine(c,t,{v:0.6});};
// 5–6 · "Your brain doesn't sit tight inside your skull. It floats in fluid…" X-ray: the brain bobs inside; fluid lights up
V.float=(c,t,u,d)=>{const tf=wt('floats',14.3);xrayBG(c,t);const bob=Math.sin(t*2.2)*10,bx=Math.sin(t*1.6)*8;
  const fl=EZ.out(sg(t,tf,tf+0.6));
  xraySkull(c,520,980,1.55,t,{bdx:bx,bdy:bob,brot:Math.sin(t*1.3)*0.03});
  if(fl>0){c.save();c.translate(520,980);c.scale(1.55,1.55);c.globalCompositeOperation='lighter';c.strokeStyle=`rgba(80,170,255,${0.55*fl})`;c.lineWidth=16;_poly(c,SKL.cran().map(([x,y])=>[x*0.9,(y+30)*0.9-30]));c.stroke();
    for(let i=0;i<14;i++){const a=hash(i)*TAU,r=190+hash(i*3)*10;c.fillStyle=`rgba(140,210,255,${0.5*fl})`;c.beginPath();c.arc(Math.cos(a+t*0.6)*r*0.95,Math.sin(a+t*0.6)*r*0.9-40,5,0,TAU);c.fill();}c.restore();}
  cine(c,t,{v:0.4,bars:1});};
// 7 · "…like a yolk inside an egg." the egg is shaken; the yolk lags behind the shell
V.egg=(c,t,u,d)=>{const t0=V.egg.t0;darkBG(c,t,'40,30,10',{c1:'255,200,90'});const sh=Math.sin((t-t0)*9)*EZ.out(sg(t,t0+0.4,t0+0.7))*(1-sg(t,t0+1.3,t0+1.5));
  const lag=Math.sin((t-t0)*9-1.1)*EZ.out(sg(t,t0+0.5,t0+0.8))*(1-sg(t,t0+1.35,t0+1.6));
  eggCut(c,540+sh*60,960,2.7,sh*0.12,-lag*34,Math.abs(lag)*6);cine(c,t,{v:0.5});};
// 8–9 · "Now look at your jaw. It's a long lever, and the pivot is your neck." X-ray: the jaw glows, lever + pivot + rotation arc
V.lever=(c,t,u,d)=>{const t0=V.lever.t0,tl=wt('lever',19.6),tp=wt('pivot',20.6);xrayBG(c,t);const S=1.45,X0=470,Y0=900;
  xraySkull(c,X0,Y0,S,t,{jawGlow:EZ.out(sg(t,t0+0.2,t0+0.6))});
  const pv={x:X0-40*S,y:Y0+100*S},ch={x:X0+212*S,y:Y0+228*S};const kl=EZ.out(sg(t,tl,tl+0.5));
  if(kl>0){c.save();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=22;c.beginPath();c.moveTo(pv.x,pv.y);c.lineTo(lerp(pv.x,ch.x,kl),lerp(pv.y,ch.y,kl));c.stroke();c.strokeStyle='#ffd24a';c.lineWidth=12;c.stroke();c.restore();}
  const kp=popK(t,tp,0.3);if(kp>0){c.save();c.translate(pv.x,pv.y);c.scale(kp,kp);c.fillStyle='#ff3a2e';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,22,0,TAU);c.fill();c.stroke();c.restore();}
  rotArrow(c,pv.x,pv.y,Math.hypot(ch.x-pv.x,ch.y-pv.y)+40,0.55,1.1,'#ffd24a',14,EZ.out(sg(t,tp+0.4,tp+1.0)));
  cine(c,t,{v:0.4});};
// 10 · "Hit someone in the forehead, and the head mostly moves straight back." jab to the forehead; head pushed straight back
V.fore=(c,t,u,d)=>{const t0=V.fore.t0,tH=wt('forehead',22.9)+0.12;camOn(c,'ring_in',MID,1.3,-60);
  const kb=t>tH?Math.sin(clamp((t-tH)/0.5)*Math.PI)*(1-clamp((t-tH-0.5)/0.4)):0;
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(t>tH&&t<tH+0.7?'squeeze':'glare','angry','grit'),{sc:F_D.sc,seed:1.3,headX:-14*kb,lean:0.06-0.12*kb});
  const brow=browOf(D.r,D.s,-1);const k=punchK(t,tH-0.3,tH,0.12,0.3);const ap=pp([F_A.x,MAT,F_A.z]);const sh=shoulder(ap,ap.s,6,0.06+0.1*clamp(k),1);const tg=toH(sh,ap.s,{x:brow.x-14*ap.s,y:brow.y});
  who(c,'ace',[0,0,0],Object.assign(F3('half','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:6,lean:0.06+0.1*clamp(k),stance:28,hf:k>=0?[lerp(36,tg[0],k),lerp(22,tg[1],k)]:[36+k*40,22],hb:GUARD(1).hb}));
  if(t>tH)impact(c,brow.x,brow.y,MPX(ap)*0.45,(t-tH)/0.3,4);
  c.restore();const ka=EZ.out(sg(t,wt('straight',24.6),wt('straight',24.6)+0.4));if(ka>0)straightArrow(c,620,420,900,420,'#ffd24a',18,ka);
  cine(c,t,{v:0.5});};
// 11 · "But hit the tip of the chin…" slow motion: the hook curls in toward the chin… freeze
V.chin=(c,t,u,d)=>{const t0=V.chin.t0;camOn(c,'ring_in',HEAD_D,2.1,60);
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3('dot','flat','flat',{look:0.4}),{sc:F_D.sc,still:1});const chin=chinOf(D.r,D.s,-1);
  const ap=pp([F_A.x,MAT,F_A.z]);const ln=0.16;const sh=shoulder(ap,ap.s,8,ln,1);const k=EZ.io(sg(t,t0,t0+1.3))*0.9;
  // hook: the glove swings wide (from the side) and curls inward on an arc
  const tgt={x:chin.x-8*ap.s,y:chin.y+2*ap.s},wide={x:sh.x+30*ap.s,y:sh.y-20*ap.s};const qx=(1-k)*(1-k)*(sh.x+36*ap.s)+2*k*(1-k)*wide.x+k*k*tgt.x,qy=(1-k)*(1-k)*(sh.y+22*ap.s)+2*k*(1-k)*wide.y+k*k*tgt.y;
  who(c,'ace',[0,0,0],Object.assign(F3('focus','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:8,lean:ln,stance:30,hf:toH(sh,ap.s,{x:qx,y:qy}),hb:GUARD(1).hb}));
  speedLines(c,{x:qx-120*ap.s,y:qy+30*ap.s},{x:qx-20*ap.s,y:qy},MPX(ap),k*0.8);c.restore();
  // slow-mo frame lines
  c.save();c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=6;c.strokeRect(40,180,W-80,H-420);c.restore();cine(c,t,{v:0.6,tint:'rgba(120,160,255,0.12)'});};
// 12 · "…and the whole head snaps around in a split second." impact on the chin, slow-mo, then the real-speed snap
V.snap=(c,t,u,d)=>{const t0=V.snap.t0,tR=t0+1.35;
  if(t<tR){// slow-motion impact close-up (0.25x)
    const tt=t0+(t-t0)*0.25;const kI=sg(tt,t0,t0+0.06);camOn(c,'ring_in',HEAD_D,2.1,60);
    const sn=EZ.out(sg(tt,t0+0.03,t0+0.3));const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(sn>0.3?'shock':'dot',sn>0.3?'up':'flat','o',{look:0.4}),{sc:F_D.sc,still:1,tilt:0.5*sn,headX:10*sn});
    const chin=chinOf(D.r,D.s,-1);const ap=pp([F_A.x,MAT,F_A.z]);const ln=0.18;const sh=shoulder(ap,ap.s,8,ln,1);const follow=EZ.out(sg(tt,t0+0.02,t0+0.3));
    const tgt={x:chin.x-8*ap.s+follow*24*ap.s,y:chin.y+2*ap.s-follow*6*ap.s};
    who(c,'ace',[0,0,0],Object.assign(F3('focus','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:8,lean:ln,stance:30,hf:toH(sh,ap.s,tgt),hb:GUARD(1).hb}));
    impact(c,chin.x,chin.y,MPX(ap)*0.7,(t-t0)/1.2,7);
    // the jaw shock ripple
    c.save();c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=3;for(let i=0;i<3;i++){const r=(10+i*14+(t-t0)*40)*ap.s;c.globalAlpha=Math.max(0,1-(t-t0)*0.9);c.beginPath();c.arc(chin.x,chin.y,r,-1.2,1.0);c.stroke();}c.restore();
    c.restore();c.save();c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=6;c.strokeRect(40,180,W-80,H-420);c.restore();cine(c,t,{v:0.6,tint:'rgba(120,160,255,0.12)'});return;}
  // real speed, medium shot: the head whips around
  const tH=tR+0.35;camOn(c,'ring_in',MID,1.3,-60);const sn=t>tH?EZ.spring(sg(t,tH,tH+0.7)*1.3,10,0.35):0;
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(t>tH?'shock':'glare',t>tH?'up':'angry',t>tH?'o':'grit'),{sc:F_D.sc,seed:1.3,still:t>tH,tilt:0.55*sn,headX:12*sn,lean:0.06-0.08*sn});
  const chin=chinOf(D.r,D.s,-1);const k=punchK(t,tH-0.28,tH,0.1,0.35);const ap=pp([F_A.x,MAT,F_A.z]);const sh=shoulder(ap,ap.s,8,0.06+0.14*clamp(k),1);const tg=toH(sh,ap.s,{x:chin.x-10*ap.s,y:chin.y});
  who(c,'ace',[0,0,0],Object.assign(F3('half','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:8,lean:0.06+0.14*clamp(k),stance:28,hf:k>=0?[lerp(36,tg[0],k),lerp(22,tg[1],k)]:[36+k*40,22],hb:GUARD(1).hb}));
  if(t>tH)impact(c,chin.x,chin.y,MPX(ap)*0.55,(t-tH)/0.35,9);c.restore();
  if(t>tH)rotArrow(c,700,520,90,-2.6,-0.6,'#ffd24a',14,EZ.out(sg(t,tH+0.1,tH+0.5)));cine(c,t,{v:0.5});};
// 13 · "The skull spins. The brain, floating inside, lags behind." top-view X-ray: skull snaps round, brain follows late
V.spin=(c,t,u,d)=>{const t0=V.spin.t0,tl=wt('lags',34.2);xrayBG(c,t);
  const cyc=(t-t0)%2.1;const a=EZ.out(clamp(cyc/0.35))*0.9-0.45;const b=-0.45+0.9*EZ.spring(clamp((cyc-0.18)/0.9),7,0.45);
  skullTop(c,540,980,1.7,a,Math.min(b,a+0.6),{twist:Math.max(0,a-b)*1.6});
  rotArrow(c,540,980,430,-2.2,-1.2,'#ffd24a',14,EZ.out(clamp(cyc/0.35)));
  if(t>tl){const k=popK(t,tl,0.3);c.save();c.globalAlpha=Math.min(1,k);c.strokeStyle='#ff6a5a';c.lineWidth=8;c.setLineDash([18,14]);c.beginPath();c.arc(540,980,300,-0.6,0.6);c.stroke();c.restore();}
  cine(c,t,{v:0.4});};
// 14 · "So it twists." the brain twists — strain lines
V.twist=(c,t,u,d)=>{const t0=V.twist.t0;xrayBG(c,t);const tw=EZ.out(sg(t,t0+0.1,t0+0.5));skullTop(c,540,980,1.7,0.45,0.45-0.5*tw,{twist:1.2*tw});cine(c,t,{v:0.4});};
// 15 · "That twist stretches the nerve fibers deep in the brain… right where it joins the brainstem." side brain: fibres stretch, brainstem lights
V.fibers=(c,t,u,d)=>{const t0=V.fibers.t0,ts=wt('stretches',37.3),tb=wt('brainstem',41.3);xrayBG(c,t);const S=2.1,X0=560,Y0=860;
  const st=EZ.out(sg(t,ts,ts+0.8));brainSide(c,X0,Y0,S,t,{xray:1});
  // brainstem (stalk down from the brain)
  const glow=EZ.out(sg(t,tb-0.1,tb+0.4));c.save();c.lineCap='round';c.strokeStyle=glow>0?`rgba(255,${Math.round(220-120*glow)},90,${0.5+0.5*glow})`:'rgba(150,220,255,0.5)';c.shadowColor='rgba(255,160,80,1)';c.shadowBlur=30*glow;c.lineWidth=60;c.beginPath();c.moveTo(X0-20*S,Y0+40*S);c.quadraticCurveTo(X0-30*S,Y0+110*S,X0-50*S,Y0+190*S);c.stroke();c.restore();
  // nerve fibres from the cortex down to the brainstem: wavy → stretched taut and red
  c.save();c.lineCap='round';for(let i=0;i<9;i++){const sx=X0+(-150+i*42)*S,sy=Y0+(-70+Math.abs(i-4)*12)*S,ex=X0-24*S,ey=Y0+40*S;c.strokeStyle=st>0?`rgba(255,${Math.round(200-160*st)},${Math.round(200-160*st)},0.9)`:'rgba(160,230,255,0.8)';c.lineWidth=7-3*st;c.beginPath();c.moveTo(sx,sy);
    for(let k=1;k<=8;k++){const u=k/8;const x=lerp(sx,ex,u),y=lerp(sy,ey,u)+Math.sin(u*Math.PI*4+i)*14*S*(1-st)*Math.sin(u*Math.PI);c.lineTo(x,y);}c.stroke();}c.restore();
  if(st>0){c.save();c.strokeStyle=`rgba(255,90,80,${st})`;c.lineWidth=10;for(const sd of [-1,1])straightArrow(c,X0+sd*120,Y0-300,X0+sd*260,Y0-300,'#ff6a5a',14,st);c.restore();}
  cine(c,t,{v:0.4});};
// 16–17 · "And that's where your brain's on switch lives. The system that keeps you awake." the switch + an open eye
V.switch=(c,t,u,d)=>{const t0=V.switch.t0,ta=wt('awake',46.0);xrayBG(c,t);const k=popK(t,t0,0.35);
  hudCard(c,540,900,640,820,k,'90,255,150',(cc)=>{toggle(cc,0,-30,1.2,EZ.out(sg(t,t0+0.4,t0+0.8)));},t);
  const ke=popK(t,ta,0.35);if(ke>0){c.save();c.translate(540,1450);c.scale(ke,ke);eyeIcon(c,0,0,110,1);c.restore();}
  cine(c,t,{v:0.4});};
// 18–19 · "Stretch it too fast, and those neurons misfire all at once… then go silent." the network flashes, then dies
V.misfire=(c,t,u,d)=>{const t0=V.misfire.t0,tm=wt('misfire',48.4),ts=wt('silent',51.2);xrayBG(c,t);const fire=t>tm?1:0;const dead=EZ.io(sg(t,ts-0.3,ts+0.3));
  if(fire&&dead<0.5&&hash(Math.floor(t*20))<0.3){c.fillStyle='rgba(255,255,230,0.12)';c.fillRect(0,0,W,H);}neurons(c,t,fire,dead);
  if(dead>0.5){c.save();c.translate(540,420);toggle(c,0,0,0.5,0);c.restore();}cine(c,t,{v:0.5});};
// 20–21 · "Lights out. In less than a second." the arena lights cut; Duke's eyes go blank; a stopwatch barely moves
V.lights=(c,t,u,d)=>{const t0=V.lights.t0,tl=wt('less',53.3);camOn(c,'ring_in',[0.5,MAT+1.2,-5.25],1.45,0);
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(t>t0+0.25?'closed':'shock','flat','o'),{sc:F_D.sc,still:1,tilt:0.2,hf:[-14,80],hb:[-8,84]});c.restore();
  const off=t<t0+0.6?(t>t0+0.12?0.85:0):0.85-0.45*EZ.out(sg(t,t0+0.6,t0+1.0));c.fillStyle=`rgba(0,0,0,${off})`;c.fillRect(0,0,W,H);
  const ks=popK(t,tl,0.3);stopwatch(c,250,420,110,EZ.out(sg(t,tl+0.2,tl+0.9))*TAU*0.08,ks);cine(c,t,{v:0.5});};
// 22 · "That's why the knees buckle." knees fold, body sinks and tips back
V.buckle=(c,t,u,d)=>{const t0=V.buckle.t0;camOn(c,'ring_in',[0.0,MAT+0.85,-5.25],1.12);const b=EZ.in(sg(t,t0+0.15,t0+1.2));
  boxer(c,'duke',-0.1,F_D.z,-1,F3('closed','flat','o'),{sc:F_D.sc,still:1,crouch:6+70*b,lean:-0.15*b,tilt:0.25,stance:24+10*b,hf:[-14+20*b,80-30*b],hb:[-8+30*b,84-40*b],rot:1e-4+0.35*EZ.in(sg(t,t0+0.8,t0+1.4))});
  c.restore();cine(c,t,{v:0.5});};
// 23 · "That's why the arms lock up in the air." flat on the mat, both arms stiff in the air; Ace backs off to the corner
V.fence=(c,t,u,d)=>{const t0=V.fence.t0;camOn(c,'ring_in',[0.3,MAT+0.7,-5.9],1.04);
  const L=lieAt(c,'duke',[0.75,MAT,-6.0],[-0.25,MAT,-6.0],Object.assign(X('closed','flat','o',{view:'front'}),{sc:F_D.sc,hf:[-150,6],hb:[-150,18],ff:[16,112],fb:[-16,112],tilt:0}));
  c.restore();cine(c,t,{v:0.5});};
// 24 · "And that's why every boxer learns one rule first…" the corner: coach + young boxer on his stool
V.coach=(c,t,u,d)=>{const t0=V.coach.t0,tr=wt('rule',60.6);cam(c,'ring_corner',{z:1.35,y:930,x:540});
  const st={x:-2.75,z:-5.95,h:0.5};const Sp=pp([st.x,MAT,st.z]),top=pp([st.x,MAT+st.h,st.z]);
  // corner stool (on the mat)
  c.save();const R=0.2*MPX(top);c.fillStyle='#2a2a30';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(top.x-R*0.9,top.y,R*1.8,Sp.y-top.y);c.strokeRect(top.x-R*0.9,top.y,R*1.8,Sp.y-top.y);c.fillStyle='#3a3a44';c.beginPath();c.ellipse(top.x,top.y,R,R*0.3,0,0,TAU);c.fill();c.stroke();c.restore();
  const s=Sp.s,cr=116-(Sp.y-top.y)/s+3;const F=pp([st.x+0.3,MAT,st.z+0.05]);
  who(c,'rook',[0,0,0],Object.assign(F3('wide','up','flat',{look:0.5}),{abs:{x:Sp.x,y:Sp.y,s},f:1,rot:1e-4,crouch:cr,lean:0.05,ff:[(F.x-Sp.x)/s,(F.y-(Sp.y-116*s+cr*s))/s],fb:[(F.x-Sp.x)/s-14,(F.y-(Sp.y-116*s+cr*s))/s],hf:[36,52],hb:[24,56]}));
  const k=EZ.out(sg(t,tr-0.15,tr+0.25));const cp=pp([-1.7,MAT,-6.2]);
  who(c,'coach',[0,0,0],Object.assign(F3('glare','angry','frown',{look:-0.5}),{abs:cp,f:-1,rot:1e-4,lean:0.08,hf:[lerp(-16,-40,k),lerp(80,-30,k)],hb:[-10,84]}));
  c.restore();cine(c,t,{v:0.5});};
// 25 · "…keep your chin down." chin tucked behind the gloves: the same hook glances off the top of the head
V.tuck=(c,t,u,d)=>{const t0=V.tuck.t0,tH=t0+0.85;camOn(c,'ring_in',MID,1.3,-60);const tk=EZ.out(sg(t,t0,t0+0.35));
  const R=boxer(c,'rook',F_D.x,F_D.z,-1,F3(t>tH+0.3?'half':'focus','angry',t>tH+0.3?'smirk':'grit'),{seed:1.1,crouch:6+10*tk,lean:0.06+0.18*tk,hf:[lerp(-36,-22,tk),lerp(22,2,tk)],hb:[lerp(-20,-12,tk),lerp(30,10,tk)]});
  const top={x:R.r.hc.x-22*R.s,y:R.r.hc.y-34*R.s};const k=punchK(t,tH-0.28,tH,0.08,0.3);const ap=pp([F_A.x,MAT,F_A.z]);const sh=shoulder(ap,ap.s,8,0.06+0.12*clamp(k),1);const tg=toH(sh,ap.s,top);
  who(c,'ace',[0,0,0],Object.assign(F3('half','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:8,lean:0.06+0.12*clamp(k),stance:28,hf:k>=0?[lerp(36,tg[0],k),lerp(22,tg[1],k)]:[36+k*40,22],hb:GUARD(1).hb}));
  c.restore();iconCheck(c,540,330,80,popK(t,tH+0.35,0.3));cine(c,t,{v:0.5});};
// 26 · "Because the most dangerous punch isn't the hardest one." a huge haymaker to the forehead: nothing; a small hook to the chin: lights out
V.danger=(c,t,u,d)=>{const t0=V.danger.t0,tH1=t0+0.9,tH2=wt('hardest',65.6)+0.45;camOn(c,'ring_in',MID,1.25,-40);
  const sn=t>tH2?EZ.spring(sg(t,tH2,tH2+0.7)*1.3,10,0.35):0;const kb=t>tH1&&t<tH2?Math.sin(clamp((t-tH1)/0.5)*Math.PI)*(1-clamp((t-tH1-0.5)/0.4)):0;
  const D=boxer(c,'duke',F_D.x,F_D.z,-1,F3(t>tH2?'shock':'glare',t>tH2?'up':'angry',t>tH2?'o':'grit'),{sc:F_D.sc,seed:1.3,still:t>tH2,tilt:0.55*sn,headX:12*sn-12*kb});
  const brow=browOf(D.r,D.s,-1),chin=chinOf(D.r,D.s,-1);const ap=pp([F_A.x,MAT,F_A.z]);
  let k,tgt,ln;if(t<tH2-0.3){k=punchK(t,t0+0.2,tH1,0.15,0.4);tgt=brow;ln=0.06+0.2*clamp(k);}else{k=punchK(t,tH2-0.22,tH2,0.1,0.3);tgt=chin;ln=0.06+0.08*clamp(k);}
  const sh=shoulder(ap,ap.s,8,ln,1);const tg=toH(sh,ap.s,{x:tgt.x-10*ap.s,y:tgt.y});
  // the haymaker winds up big (arm swings far back and up)
  const hf=k>=0?[lerp(36,tg[0],k),lerp(22,tg[1],k)]:(t<tH2-0.3?[36+k*160,22+k*120]:[36+k*40,22]);
  who(c,'ace',[0,0,0],Object.assign(F3('half','angry','grit'),{abs:ap,f:1,rot:1e-4,crouch:8,lean:ln,stance:28,hf,hb:GUARD(1).hb}));
  if(t>tH1&&t<tH2)impact(c,brow.x,brow.y,MPX(ap)*0.6,(t-tH1)/0.35,3);if(t>tH2)impact(c,chin.x,chin.y,MPX(ap)*0.45,(t-tH2)/0.35,5);
  c.restore();iconCross(c,540,330,70,t<tH2?popK(t,tH1+0.3,0.3):0);iconCheck(c,540,330,70,popK(t,tH2+0.3,0.3));cine(c,t,{v:0.5});};
// 27 · "It's the one that makes your head spin." down on the mat, stars circling; the camera rises out over the ring
V.spinEnd=(c,t,u,d)=>{const t0=V.spinEnd.t0;cam(c,'ring_wide',{z:K3(u,d,1.5,1.2),y:K3(u,d,980,960),x:560});
  const L=lieAt(c,'duke',[0.7,MAT,-3.8],[-0.3,MAT,-3.8],Object.assign(X('closed','flat','o',{view:'front'}),{sc:F_D.sc,hf:[30,70],hb:[-30,70]}));
  const head=pp([0.7,MAT+0.15,-3.8]);dizzy(c,head.x,head.y-0.25*MPX(head),0.35*MPX(head),t,1);
  boxer(c,'ace',-1.2,-4.4,1,F3('happy','up','grin'),{seed:0.4,hf:[40,-104],hb:[-24,-104],lean:-0.04});
  boxer(c,'ref',1.9,-4.9,-1,F3('dot','up','o'),{still:1,hf:[-46,10],hb:[12,92],lean:0.1});
  koRopesFront(c);c.restore();cine(c,t,{v:0.6});};

VSEQ.push(['tap',0],['spot',wt('if',2.78)],['power',wt('and',4.59)],['give',wt('give',6.94)],['float',wt('your',11.45)],['egg',wt('like',15.77)],['lever',wt('now',17.64)],['fore',wt('hit',22.13)],['chin',wt('but',25.93)],['snap',wt('and',27.55)],
  ['spin',wt('the',30.74)],['twist',wt('so',35.31)],['fibers',wt('that',36.82)],['switch',wt('and',42.37)],['misfire',wt('stretch',46.98)],['lights',wt('lights',52.09)],['buckle',wt("that's",54.74)],['fence',wt("that's",56.37)],['coach',wt('and',58.44)],['tuck',wt('keep',61.88)],['danger',wt('because',63.79)],['spinEnd',wt("it's",67.11)]);
VSEQ.forEach(([k,t0])=>{V[k].t0=t0;});
VSEQ.forEach(([k,t0])=>SHOTS.push([t0,(c,t,u,d)=>V[k](c,t,u,d)]));
SHOTS.sort((a,b)=>a[0]-b[0]);
SHOTS.push([200,(c,t)=>{T=27.9;V.snap(c,27.9,27.9-V.snap.t0,3);T=200;txt(c,'WHY A CHIN PUNCH',540,300,92,'#fff',{sw:22,ls:3});txt(c,'SWITCHES YOU OFF',540,420,92,'#ff2b2b',{sw:22,ls:3});}]);
