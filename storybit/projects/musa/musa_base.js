'use strict';
const XD={};
const GOLD_C='#ffd23f';
const TW=(w,n=0)=>{const k=w.toLowerCase().replace(/[^a-z0-9]/g,'');let i=0;for(const l of L)for(const q of l.w){if(q.x.toLowerCase().replace(/[^a-z0-9]/g,'')===k){if(i===n)return q.t;i++;}}console.error('TW miss',w);return 0;};
KEY.clear();['RICH','GOLD','CHEAPER','1324','MANSA','MUSA','MECCA','CAIRO','WEALTH','THOUSANDS','CAMELS','AWAY','EVERYONE','FLOODED','VALUABLE','RUMOR','AL-UMARI','FALLEN','YEARS','CONQUER','RICHEST','DROPPED','ECONOMY','MONEY'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
// ---- face safety: only names that style C actually draws (a wrong name = a blank face) ----
const EYES=new Set(['closed','dot','drunk','focus','glare','half','happy','rage','sad','shock','sleep','sly','squeeze','wide']),BROWS=new Set(['angry','flat','furious','sad','smug','up','worried']),
  MOUTHS=new Set(['drool','drunk','flat','frown','grin','grit','o','sad','shout','smile','smirk','sneer','teeth','wobble','yell']);
const EMAP2={open:'dot',angry:'glare',worried:'sad'};
function F(e,b,m,o){if(!EYES.has(e))console.warn('eye name fixed:',e);e=EYES.has(e)?e:(EMAP2[e]||'dot');b=BROWS.has(b)?b:'flat';m=MOUTHS.has(m)?m:'flat';return BF(e,b,m,o);}
const dzSh=(t,a)=>({ox:Math.sin(t*31)*a,oy:Math.cos(t*27)*a});
function dzYear(c,s,k,y=430){if(k<=0)return;c.save();c.translate(540,y);const sc=lerp(1.7,1,eo(k));c.scale(sc,sc);c.globalAlpha=clamp(k*2);txt(c,s,0,0,170,'#ffd23f',{sw:22,ls:6});c.restore();}
function dzCounter(c,x,y,k,val,label,col='#ffd23f'){if(k<=0)return;c.save();c.translate(x,y);const s=back(clamp(k));c.scale(s,s);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-300,-100,600,200,30);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,val,0,20,110,'#fff',{sw:12});c.font='800 30px "Inter Display"';c.letterSpacing='6px';c.fillStyle=col;c.textAlign='center';c.fillText(label,0,80);c.restore();}
const T0P=[0,0,0];
// redraw part of the plate (an object in front) over characters: polygon of world points, clipped re-paint of the plate image
function plateOcc(c,id,poly){const P=poly.map(pp);c.save();c.beginPath();P.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
// cinematic grade: lifted teal shadows, warm highlights, soft bloom on brights, gentle vignette, grain
function cgrade(c,t,o={}){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=o.tint||'rgba(40,90,110,0.35)';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='overlay';const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,o.top||'rgba(255,190,120,0.16)');g.addColorStop(1,o.bot||'rgba(30,60,80,0.22)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  if(o.flare){const [fx,fy]=o.flare;c.save();c.globalCompositeOperation='lighter';const r=c.createRadialGradient(fx,fy,0,fx,fy,520);r.addColorStop(0,'rgba(255,220,160,0.55)');r.addColorStop(0.3,'rgba(255,170,90,0.18)');r.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=r;c.fillRect(0,0,W,H);
    c.fillStyle='rgba(255,200,140,0.10)';c.fillRect(0,fy-6,W,12);for(let i=1;i<4;i++){const px=fx+(540-fx)*i*0.55,py=fy+(960-fy)*i*0.55;c.fillStyle=`rgba(255,200,150,${0.08})`;c.beginPath();c.arc(px,py,40+i*30,0,TAU);c.fill();}c.restore();}
  lens(c,t,{v:o.v??0.55});}
const hh=(t,a=4)=>({ox:Math.sin(t*1.3)*a+Math.sin(t*3.1)*a*0.4,oy:Math.cos(t*1.1)*a*0.7});
// draw a mixed list of actors far→near ({pos,draw})
function depth(L){L.filter(Boolean).map(a=>({a,w:pp(a.pos).w})).sort((p,q)=>q.w-p.w).forEach(x=>x.a.draw());}
const A_=(pos,draw)=>({pos,draw});
function regrade(c,f){c.save();c.setTransform(1,0,0,1,0,0);c.filter=f;c.drawImage(c.canvas,0,0);c.restore();}
function motes(c,t,x0,y0,x1,y1,n=40,a=0.5){c.save();c.globalCompositeOperation='screen';for(let i=0;i<n;i++){const k=hash(i*1.7),x=lerp(x0,x1,hash(i*2.3))+Math.sin(t*0.4+i)*30,y=lerp(y0,y1,(hash(i*3.1)+t*0.02*(0.5+k))%1);c.fillStyle=`rgba(255,240,210,${a*(0.3+0.7*hash(i*5))})`;c.beginPath();c.arc(x,y,1.5+k*3.5,0,TAU);c.fill();}c.restore();}
function beam(c,P,a=0.18,col='255,236,200'){c.save();c.globalCompositeOperation='screen';c.filter='blur(30px)';const g=c.createLinearGradient(P[0][0],P[0][1],P[2][0],P[2][1]);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.restore();}
function fgGrass(c,t,y=1880,n=26,blur=14){c.save();c.filter=`blur(${blur}px)`;for(let i=0;i<n;i++){const x=hash(i*4.1)*1180-50,h=160+hash(i*2.2)*260,w=10+hash(i*6)*16,sw=Math.sin(t*1.1+i)*18;c.fillStyle=i%3?'#3c4a26':'#55602e';c.beginPath();c.moveTo(x-w,y);c.quadraticCurveTo(x+sw*0.5,y-h*0.6,x+sw,y-h);c.quadraticCurveTo(x+sw*0.5+w*0.3,y-h*0.5,x+w,y);c.fill();}c.restore();}
function boxOcc(c,id,a,b){const P=[];for(const x of [a[0],b[0]])for(const y of [a[1],b[1]])for(const z of [a[2],b[2]]){const q=pp([x,y,z]);P.push([q.x,q.y]);}P.sort((p,q)=>p[0]-q[0]||p[1]-q[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];
  for(const p of P){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}for(const p of P.slice().reverse()){while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p);}const H_=lo.slice(0,-1).concat(up.slice(0,-1));
  c.save();c.beginPath();H_.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
// ground pick: plate pixel (x,y) → world point on the plane y=h (inverse of pp)
function inv4(m){const a=m,r=new Array(16);const b00=a[0]*a[5]-a[1]*a[4],b01=a[0]*a[6]-a[2]*a[4],b02=a[0]*a[7]-a[3]*a[4],b03=a[1]*a[6]-a[2]*a[5],b04=a[1]*a[7]-a[3]*a[5],b05=a[2]*a[7]-a[3]*a[6],b06=a[8]*a[13]-a[9]*a[12],b07=a[8]*a[14]-a[10]*a[12],b08=a[8]*a[15]-a[11]*a[12],b09=a[9]*a[14]-a[10]*a[13],b10=a[9]*a[15]-a[11]*a[13],b11=a[10]*a[15]-a[11]*a[14];
  const det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06,id=1/det;
  r[0]=(a[5]*b11-a[6]*b10+a[7]*b09)*id;r[1]=(a[2]*b10-a[1]*b11-a[3]*b09)*id;r[2]=(a[13]*b05-a[14]*b04+a[15]*b03)*id;r[3]=(a[10]*b04-a[9]*b05-a[11]*b03)*id;r[4]=(a[6]*b08-a[4]*b11-a[7]*b07)*id;r[5]=(a[0]*b11-a[2]*b08+a[3]*b07)*id;r[6]=(a[14]*b02-a[12]*b05-a[15]*b01)*id;r[7]=(a[8]*b05-a[10]*b02+a[11]*b01)*id;
  r[8]=(a[4]*b10-a[5]*b08+a[7]*b06)*id;r[9]=(a[1]*b08-a[0]*b10-a[3]*b06)*id;r[10]=(a[12]*b04-a[13]*b02+a[15]*b00)*id;r[11]=(a[9]*b02-a[8]*b04-a[11]*b00)*id;r[12]=(a[5]*b07-a[4]*b09-a[6]*b06)*id;r[13]=(a[0]*b09-a[1]*b07+a[2]*b06)*id;r[14]=(a[13]*b01-a[12]*b03-a[14]*b00)*id;r[15]=(a[8]*b03-a[9]*b01+a[10]*b00)*id;return r;}
function gp(sx,sy,h=0){const m=inv4(CP.vp);const nx=sx/W*2-1,ny=1-sy/H*2;const U=(z)=>{const x=m[0]*nx+m[4]*ny+m[8]*z+m[12],y=m[1]*nx+m[5]*ny+m[9]*z+m[13],zz=m[2]*nx+m[6]*ny+m[10]*z+m[14],w=m[3]*nx+m[7]*ny+m[11]*z+m[15];return [x/w,y/w,zz/w];};
  const a=U(-1),b=U(1);const t=(h-a[1])/(b[1]-a[1]);return [a[0]+(b[0]-a[0])*t,h,a[2]+(b[2]-a[2])*t];}
