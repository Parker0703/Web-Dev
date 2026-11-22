'use strict';
// ===================== Rabbits video · art upgrade: eyes, uniforms, bicorne views, rabbits, carrots, rooms, buildings =====================
// ---------- shared helpers ----------
function fuzzPath(c,cx,cy,rx,ry,n,amp,rot=0,a0=0,a1=TAU){c.save();c.translate(cx,cy);c.rotate(rot);c.beginPath();const st=(a1-a0)/n;
  c.moveTo(Math.cos(a0)*rx,Math.sin(a0)*ry);for(let i=0;i<n;i++){const am=a0+(i+0.5)*st,ae=a0+(i+1)*st;c.quadraticCurveTo(Math.cos(am)*rx*(1+amp),Math.sin(am)*ry*(1+amp),Math.cos(ae)*rx,Math.sin(ae)*ry);}c.restore();}
const lightG=(c,x0,y0,x1,y1,a,b)=>{const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,a);g.addColorStop(1,b);return g;};
// ---------- 1. eyes: white, coloured iris, pupil, two catch-lights, lash line ----------
function eyeB(c,x,y,s,o){const w=o.w*s,h=o.h*s,ir=o.ir*s,lk=o.lk||[0,0];c.save();
  const sg=c.createLinearGradient(0,y-h,0,y+h);sg.addColorStop(0,'#cfcac2');sg.addColorStop(0.35,'#ffffff');sg.addColorStop(1,'#f0ece6');
  c.beginPath();c.ellipse(x,y,w,h,0,0,TAU);c.fillStyle=sg;c.fill();c.save();c.clip();
  const ix=x+lk[0]*1.6*s,iy=y+lk[1]*1.6*s+0.8*s;
  if(!o.tiny){const ig=c.createRadialGradient(ix,iy+ir*0.4,ir*0.1,ix,iy,ir);ig.addColorStop(0,o.ic2||'#a8784a');ig.addColorStop(0.7,o.ic||'#5a3a22');ig.addColorStop(1,'#1a0e08');c.fillStyle=ig;c.beginPath();c.arc(ix,iy,ir,0,TAU);c.fill();}
  c.fillStyle=K2;c.beginPath();c.arc(ix,iy,o.tiny?ir:ir*0.5,0,TAU);c.fill();
  c.fillStyle='#fff';c.beginPath();c.arc(ix-L2.dx*-0.35*ir+0.1*ir,iy-ir*0.42,Math.max(1.1*s,ir*0.3),0,TAU);c.fill();
  c.globalAlpha=0.8;c.beginPath();c.arc(ix-0.35*ir,iy+ir*0.38,Math.max(0.6*s,ir*0.14),0,TAU);c.fill();c.globalAlpha=1;
  if(o.lid){c.fillStyle='#bdb9b2';c.beginPath();c.moveTo(x-w-2*s,y-h-2*s);c.lineTo(x+w+2*s,y-h-2*s);c.lineTo(x+w+2*s,y-h+o.lid[1]*h*2);c.lineTo(x-w-2*s,y-h+o.lid[0]*h*2);c.closePath();c.fill();
    c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.moveTo(x-w,y-h+o.lid[0]*h*2);c.lineTo(x+w,y-h+o.lid[1]*h*2);c.stroke();}
  c.restore();c.strokeStyle=K2;c.lineWidth=1.5*s;c.beginPath();c.ellipse(x,y,w,h,0,0,TAU);c.stroke();
  c.lineWidth=3.2*s;c.lineCap='round';c.beginPath();c.ellipse(x,y,w,h,0,Math.PI*1.08,Math.PI*1.92);c.stroke();// lash line
  c.restore();}
{const _fM=face2;face2=function(c,o,s,f,R,t){const E=o.eyes;if(E==='dot'||E==='focus'||E==null)o={...o,eyes:E==='focus'?'half':'open'};const MM={grin:'smile',grit:'teeth',shout:'scream'};if(MM[o.mouth])o={...o,mouth:MM[o.mouth]};return _fM(c,o,s,f,R,t);};}
// ---------- 2. uniforms: piping, shiny buttons, bullion epaulettes, gold embroidery ----------
Object.assign(KIND2.napoleon,{hem:'#c02828'});['berthier','memoir','marshal'].forEach(k=>{if(KIND2[k]){KIND2[k].hem='#d8b040';KIND2[k].embroid=1;}});
function gbtn(c,x,y,r){const g=c.createRadialGradient(x+L2.dx*r*0.4,y-r*0.4,0,x,y,r);g.addColorStop(0,'#fffbe0');g.addColorStop(0.45,'#e8c048');g.addColorStop(1,'#7a5a10');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.strokeStyle='rgba(40,25,0,0.7)';c.lineWidth=r*0.35;c.stroke();}
{const _rT3=romanTorso;romanTorso=function(c,K,s,f,t,TOR){_rT3(c,K,s,f,t,TOR);if(K.uniform!=='nap')return;const top=-TOR*s;
  // red piping on the lapel edges, shadow under the plastron
  c.strokeStyle='#d03030';c.lineWidth=2.2*s;c.beginPath();c.moveTo(-15.5*s,top+6*s);c.lineTo(-13.5*s,-4*s);c.moveTo(15.5*s,top+6*s);c.lineTo(13.5*s,-4*s);c.stroke();
  c.fillStyle='rgba(0,0,0,0.12)';c.beginPath();c.moveTo(-10*s,top+8*s);c.lineTo(-2*s,top+8*s);c.lineTo(-2*s,-6*s);c.lineTo(-9*s,-6*s);c.closePath();if(L2.dx<0)c.fill();
  for(let i=0;i<5;i++){gbtn(c,-8*s,top+14*s+i*9*s,2.5*s);gbtn(c,8*s,top+14*s+i*9*s,2.5*s);}
  if(K.embroid){c.strokeStyle='#e8c048';c.lineWidth=2.4*s;c.beginPath();c.moveTo(-14*s,top+6*s);c.lineTo(-12*s,-6*s);c.moveTo(14*s,top+6*s);c.lineTo(12*s,-6*s);c.stroke();c.fillStyle='#e8c048';for(const sd of [-1,1])for(let i=0;i<6;i++){const yy=top+12*s+i*9*s;c.save();c.translate(sd*17*s,yy);c.rotate(sd*0.7);c.beginPath();c.ellipse(0,0,3.6*s,1.5*s,0,0,TAU);c.fill();c.restore();}
    c.fillStyle='#e8c048';c.fillRect(-27*s,-12*s,54*s,4*s);}
  // collar: stand-up, red with gold edge
  c.fillStyle='#c02828';c.beginPath();c.moveTo(-17*s,top+6*s);c.quadraticCurveTo(0,top-2*s,17*s,top+6*s);c.lineTo(15*s,top-3*s);c.quadraticCurveTo(0,top-9*s,-15*s,top-3*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=2*s;c.stroke();
  c.strokeStyle=K.embroid?'#e8c048':'#f4f2ec';c.lineWidth=1.6*s;c.beginPath();c.moveTo(-15*s,top-2*s);c.quadraticCurveTo(0,top-8*s,15*s,top-2*s);c.stroke();
  // bullion epaulettes
  for(const sx of [-1,1]){const ex=sx*23*s,ey=top+6*s;for(let k=0;k<7;k++){const fxp=ex+sx*(-9+k*3.2)*s,len=(12+Math.sin(k*1.7)*1.5)*s,sw=Math.sin(t*2.6+k)*0.6*s;
      const g=c.createLinearGradient(fxp-1.6*s,0,fxp+1.6*s,0);g.addColorStop(0,'#8a6410');g.addColorStop(0.5,'#ffe48a');g.addColorStop(1,'#8a6410');c.strokeStyle=g;c.lineWidth=2.6*s;c.lineCap='round';c.beginPath();c.moveTo(fxp,ey+3*s);c.lineTo(fxp+sw,ey+3*s+len);c.stroke();}
    const g=c.createRadialGradient(ex+L2.dx*4*s,ey-3*s,0,ex,ey,12*s);g.addColorStop(0,'#fff2b0');g.addColorStop(0.5,'#e0b030');g.addColorStop(1,'#8a6410');c.fillStyle=g;c.beginPath();c.ellipse(ex,ey,12*s,6.5*s,sx*0.3,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=2*s;c.stroke();
    c.strokeStyle='rgba(120,80,10,0.8)';c.lineWidth=1.2*s;c.beginPath();c.ellipse(ex,ey,7*s,3.4*s,sx*0.3,0,TAU);c.stroke();}
  // Légion d'honneur: red ribbon + white enamel star with gold centre
  if(!K.embroid){c.save();c.translate(-18*s,top+22*s);c.fillStyle='#c02828';c.fillRect(-2.5*s,-7*s,5*s,7*s);c.fillStyle='#f8f6f0';c.strokeStyle=K2;c.lineWidth=1*s;c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?2*s:5*s;c.lineTo(Math.cos(a)*r,Math.sin(a)*r+3*s);}c.closePath();c.fill();c.stroke();gbtn(c,0,3*s,1.6*s);c.restore();}
};}
// ---------- 3. bicorne: felt shading, binding, gold loop, and a proper SIDE view ----------
let __OV=null;{const _f3=fig2;fig2=function(c,o){const p=__OV;__OV=o;const r=_f3(c,o);__OV=p;return r;};}
{const _h3=hat2b;hat2b=function(c,h,s,f,R,t){if(h!=='bicorne'&&h!=='bicorneF')return _h3(c,h,s,f,R,t);
  const side=__OV&&__OV.view!=='front'&&!__OV.back;let wide=(h==='bicorne')!==side;// Napoleon "en bataille": wide from the front, tall crescent from the side
  c.save();c.lineJoin='round';const felt=(x0,x1)=>{const g=c.createLinearGradient(x0,-R*2,x1,-R*0.4);g.addColorStop(0,'#3a3a46');g.addColorStop(0.5,'#18181f');g.addColorStop(1,'#050508');return g;};
  if(wide){// back flap peeks above the front one
    c.fillStyle='#0a0a10';c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-R*1.5,-R*0.5);c.quadraticCurveTo(-R*0.9,-R*1.9,0,-R*1.72);c.quadraticCurveTo(R*0.9,-R*1.9,R*1.5,-R*0.5);c.closePath();c.fill();c.stroke();
    c.fillStyle=felt(-R,R*0.6);c.beginPath();c.moveTo(-R*1.6,-R*0.42);c.quadraticCurveTo(-R*0.9,-R*1.72,0,-R*1.52);c.quadraticCurveTo(R*0.9,-R*1.72,R*1.6,-R*0.42);c.quadraticCurveTo(R*0.6,-R*0.86,0,-R*0.8);c.quadraticCurveTo(-R*0.6,-R*0.86,-R*1.6,-R*0.42);c.closePath();c.fill();c.stroke();
    c.save();c.clip();c.strokeStyle='rgba(255,255,255,0.10)';c.lineWidth=R*0.12;c.beginPath();c.moveTo(-R*1.3,-R*0.62);c.quadraticCurveTo(-R*0.8,-R*1.45,-R*0.1,-R*1.38);c.stroke();c.restore();
    c.strokeStyle='#26262e';c.lineWidth=3.2*s;c.beginPath();c.moveTo(-R*1.52,-R*0.47);c.quadraticCurveTo(-R*0.9,-R*1.64,0,-R*1.45);c.quadraticCurveTo(R*0.9,-R*1.64,R*1.52,-R*0.47);c.stroke();// silk binding
    if(h==='bicorneF'||true){c.strokeStyle='#d8b040';c.lineWidth=2.2*s;c.beginPath();c.moveTo(-R*1.45,-R*0.47);c.quadraticCurveTo(-R*0.6,-R*0.92,0,-R*0.86);c.quadraticCurveTo(R*0.6,-R*0.92,R*1.45,-R*0.47);c.stroke();}
    var ck=[h==='bicorne'?-R*0.62:0,h==='bicorne'?-R*1.08:-R*1.12];}
  else{const sh=side?f*R*0.12:0;// tall crescent seen end-on; back flap shows behind, offset away from the facing side
    c.fillStyle='#0a0a10';c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-R*0.95-sh,-R*0.55);c.quadraticCurveTo(-R*0.78-sh,-R*1.95,-sh,-R*2.0);c.quadraticCurveTo(R*0.78-sh,-R*1.95,R*0.95-sh,-R*0.55);c.closePath();c.fill();c.stroke();
    c.fillStyle=felt(-R*0.8,R*0.8);c.beginPath();c.moveTo(-R*1.0+sh,-R*0.5);c.quadraticCurveTo(-R*0.76+sh,-R*1.88,sh,-R*1.92);c.quadraticCurveTo(R*0.76+sh,-R*1.88,R*1.0+sh,-R*0.5);c.quadraticCurveTo(sh,-R*0.82,-R*1.0+sh,-R*0.5);c.closePath();c.fill();c.stroke();
    c.save();c.clip();c.strokeStyle='rgba(255,255,255,0.11)';c.lineWidth=R*0.12;c.beginPath();c.moveTo(-R*0.7+sh,-R*0.7);c.quadraticCurveTo(-R*0.55+sh,-R*1.6,sh,-R*1.72);c.stroke();c.restore();
    c.strokeStyle='#26262e';c.lineWidth=3.2*s;c.beginPath();c.moveTo(-R*0.92+sh,-R*0.56);c.quadraticCurveTo(-R*0.7+sh,-R*1.8,sh,-R*1.84);c.quadraticCurveTo(R*0.7+sh,-R*1.8,R*0.92+sh,-R*0.56);c.stroke();
    c.strokeStyle='#d8b040';c.lineWidth=2.2*s;c.beginPath();c.moveTo(-R*0.86+sh,-R*0.6);c.quadraticCurveTo(sh,-R*0.9,R*0.86+sh,-R*0.6);c.stroke();
    var ck=[sh+(side?f*R*0.38:0),-R*1.2];}
  // gold loop (ganse) + cockade with pleats
  c.strokeStyle='#e8c048';c.lineWidth=3*s;c.beginPath();c.moveTo(ck[0],ck[1]+R*0.24);c.lineTo(ck[0],ck[1]+R*0.62);c.stroke();gbtn(c,ck[0],ck[1]+R*0.62,2.4*s);
  const cr=side&&!wide?0.8:1;for(const [r,col] of [[0.24,'#2a4ab8'],[0.16,'#ffffff'],[0.08,'#d02a2a']]){c.fillStyle=col;c.beginPath();c.ellipse(ck[0],ck[1],R*r*cr,R*r,0,0,TAU);c.fill();}
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=1*s;for(let i=0;i<12;i++){const a=i*TAU/12;c.beginPath();c.moveTo(ck[0]+Math.cos(a)*R*0.1*cr,ck[1]+Math.sin(a)*R*0.1);c.lineTo(ck[0]+Math.cos(a)*R*0.23*cr,ck[1]+Math.sin(a)*R*0.23);c.stroke();}
  c.strokeStyle=K2;c.lineWidth=2*s;c.beginPath();c.ellipse(ck[0],ck[1],R*0.24*cr,R*0.24,0,0,TAU);c.stroke();
  c.restore();};}
// ---------- 4. rabbits: fluffy, big glossy eyes, and always alive (breathing, blinking, nose wiggle, ear twitches, hops) ----------
const RCOL2={white:['#ffffff','#cfd3de','#f6a8b8','#ffffff'],grey:['#b4b8c2','#7a7e8a','#f0a8b4','#dcdfe6'],brown:['#b98a5c','#7a5636','#e8a898','#ecd8c0'],spot:['#ffffff','#cfd3de','#f6a8b8','#ffffff']};
function rEye(c,x,y,rx,ry,s,blink,look){if(blink){c.strokeStyle=K2;c.lineWidth=3*s;c.lineCap='round';c.beginPath();c.arc(x,y-ry*0.3,rx*1.05,Math.PI*0.15,Math.PI*0.85);c.stroke();return;}
  const g=c.createRadialGradient(x,y+ry*0.45,0,x,y,ry*1.1);g.addColorStop(0,'#7a4a34');g.addColorStop(0.55,'#2a140e');g.addColorStop(1,'#0a0606');c.fillStyle=g;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();
  c.fillStyle='#fff';c.beginPath();c.ellipse(x-rx*0.3+look,y-ry*0.38,rx*0.42,ry*0.34,-0.4,0,TAU);c.fill();c.globalAlpha=0.85;c.beginPath();c.arc(x+rx*0.35+look,y+ry*0.4,rx*0.18,0,TAU);c.fill();c.globalAlpha=1;
  c.strokeStyle=K2;c.lineWidth=2*s;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.stroke();}
function rEar(c,x,y,rot,s,P,len,dark,curl=0){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=dark?P[1]:lightG(c,-12*s,0,12*s,0,P[0],P[1]);
  c.beginPath();c.moveTo(-10*s,0);c.bezierCurveTo(-17*s,-len*0.5*s,-12*s+curl*s,-len*s,curl*s,-len*s);c.bezierCurveTo(12*s+curl*s,-len*s,15*s,-len*0.5*s,10*s,0);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=4.6*s;c.stroke();
  const ig=c.createLinearGradient(0,0,0,-len*s);ig.addColorStop(0,'rgba(246,168,184,0.3)');ig.addColorStop(0.4,P[2]);ig.addColorStop(1,shd(P[2],-0.15));c.fillStyle=ig;c.beginPath();c.moveTo(-4*s,-4*s);c.bezierCurveTo(-9*s,-len*0.5*s,-6*s+curl*s,-len*0.88*s,curl*0.8*s,-len*0.9*s);c.bezierCurveTo(6*s+curl*s,-len*0.88*s,8*s,-len*0.5*s,4*s,-4*s);c.closePath();c.fill();
  c.strokeStyle='rgba(200,90,110,0.35)';c.lineWidth=1.4*s;c.beginPath();c.moveTo(0,-8*s);c.quadraticCurveTo(-1*s,-len*0.5*s,curl*0.6*s,-len*0.8*s);c.stroke();c.restore();}
function rabbit(c,x,y,s,o={}){const f=o.f||1,t=o.t??T,sd=o.seed||0,P=RCOL2[o.col||'white'];let pose=o.pose||'sit';
  const r1=hash(sd*7.1+1),r2=hash(sd*3.3+2);const tt=t+r1*10;
  const blink=((tt*0.8)%3.1)<0.1;const nose=Math.sin(tt*22)*(Math.sin(tt*1.3)>0.2?1:0);
  const twA=Math.max(0,Math.sin(tt*1.7+r2*6)-0.85)*4,twB=Math.max(0,Math.sin(tt*1.3+r1*5)-0.85)*4;// sudden ear twitches
  const breath=Math.sin(tt*5)*0.025;
  let hop=0,air=0,squash=0;if(pose==='hop'||pose==='run'){const ph=(t*(o.spd||9)/Math.PI/2+sd*0.37)%1;air=Math.sin(Math.min(ph/0.7,1)*Math.PI);hop=air;squash=ph>0.7?Math.sin((ph-0.7)/0.3*Math.PI):0;}
  else if(pose==='front'||pose==='sit'){const ph=(tt*0.45)%1;if(ph<0.12){hop=Math.sin(ph/0.12*Math.PI)*0.45;}else if(ph<0.2)squash=Math.sin((ph-0.12)/0.08*Math.PI)*0.6;}// idle bunny bounce
  c.save();c.translate(x,y);c.lineJoin='round';c.lineCap='round';
  c.fillStyle=`rgba(0,0,0,${0.3-hop*0.12})`;c.beginPath();c.ellipse(0,2*s,48*s*(1-hop*0.3),9*s,0,0,TAU);c.fill();
  c.translate(0,-hop*42*s);c.scale(f*(1+squash*0.1-hop*0.04),1-squash*0.1+hop*0.06+breath);
  const OL=(w=4.6)=>{c.strokeStyle=K2;c.lineWidth=w*s;c.stroke();};const body=(x0,x1)=>{const g=c.createRadialGradient(x0+L2.dx*f*20*s,-70*s,6*s,x1,-30*s,90*s);g.addColorStop(0,P[0]);g.addColorStop(0.6,P[0]);g.addColorStop(1,P[1]);return g;};
  let head;
  if(pose==='front'){
    for(const k of [-1,1]){c.fillStyle=P[0];c.beginPath();c.ellipse(k*27*s,-5*s,19*s,9*s,k*0.1,0,TAU);c.fill();OL(4);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=1.4*s;for(const tx of [-6,0,6])seg(c,(k*27+tx+k*8)*s,-10*s,(k*27+tx+k*10)*s,-1*s);}
    fuzzPath(c,0,-40*s,45*s,40*s,14,0.05);c.fillStyle=body(-20*s,0);c.fill();OL();
    fuzzPath(c,0,-44*s,25*s,24*s,10,0.12,0,Math.PI*0.05,Math.PI*0.95);c.closePath();c.fillStyle=P[3];c.globalAlpha=0.9;c.fill();c.globalAlpha=1;
    fuzzPath(c,0,-50*s,22*s,20*s,9,0.16);c.fillStyle=P[3];c.globalAlpha=0.55;c.fill();c.globalAlpha=1;
    for(const k of [-1,1]){c.fillStyle=P[0];c.beginPath();c.ellipse(k*13*s,-14*s,9*s,12*s,0,0,TAU);c.fill();OL(3.6);}
    const hy=-96*s;const tilt=Math.sin(tt*0.9)*0.08;c.save();c.translate(0,hy);c.rotate(tilt);
    rEar(c,-15*s,-24*s,-0.22-twA*0.4+Math.sin(tt*9)*0.03*hop*4,s,P,54,0,-4);rEar(c,15*s,-24*s,0.22+twB*0.4,s,P,54,0,4);
    if(o.col==='spot'){/* patch on ear */}
    fuzzPath(c,0,0,40*s,34*s,16,0.06);const hg=c.createRadialGradient(L2.dx*f*-12*s,-14*s,4*s,0,4*s,48*s);hg.addColorStop(0,P[0]);hg.addColorStop(0.65,P[0]);hg.addColorStop(1,P[1]);c.fillStyle=hg;c.fill();OL();
    if(o.col==='spot'){c.save();fuzzPath(c,0,0,40*s,34*s,16,0.06);c.clip();c.fillStyle='#4a3a32';fuzzPath(c,-18*s,-8*s,16*s,14*s,8,0.15,0.3);c.fill();c.restore();}
    fuzzPath(c,0,10*s,18*s,12*s,8,0.12);c.fillStyle=P[3];c.globalAlpha=0.8;c.fill();c.globalAlpha=1;// muzzle
    for(const k of [-1,1])rEye(c,k*16*s,-4*s,8.2*s,9.6*s,s,blink,Math.sin(tt*0.6)*1.4*s);
    c.fillStyle='rgba(255,130,150,0.38)';for(const k of [-1,1]){c.beginPath();c.ellipse(k*26*s,10*s,7*s,4.4*s,0,0,TAU);c.fill();}
    const ny=6*s+nose*0.8*s;c.fillStyle='#f27c98';c.beginPath();c.moveTo(-6*s,ny);c.quadraticCurveTo(0,ny-3*s,6*s,ny);c.quadraticCurveTo(2*s,ny+6*s,0,ny+6*s);c.quadraticCurveTo(-2*s,ny+6*s,-6*s,ny);c.fill();c.strokeStyle=K2;c.lineWidth=1.8*s;c.stroke();
    c.lineWidth=2.4*s;c.beginPath();c.moveTo(0,ny+6*s);c.lineTo(0,ny+10*s);c.quadraticCurveTo(-4*s,ny+15*s,-8*s,ny+11*s);c.moveTo(0,ny+10*s);c.quadraticCurveTo(4*s,ny+15*s,8*s,ny+11*s);c.stroke();
    c.strokeStyle='rgba(30,30,36,0.55)';c.lineWidth=1.3*s;for(const k of [-1,1])for(const [yy,dy] of [[8,-5],[12,0],[16,5]]){c.beginPath();c.moveTo(k*14*s,(yy+nose*0.5)*s);c.quadraticCurveTo(k*30*s,(yy+dy*0.5)*s,k*44*s,(yy+dy)*s);c.stroke();}
    c.restore();head={x:x,y:y+(hy-hop*42*s)};}
  else{// side / 3-quarter, facing +x
    const st=1+air*0.22,eat=pose==='eat';
    fuzzPath(c,-48*s,-34*s,13*s,12*s,8,0.25);c.fillStyle=P[3];c.fill();OL(3.6);// cotton tail
    const back=air>0.3;// hind leg: tucked when sitting, kicked back mid-hop
    c.fillStyle=P[0];c.save();if(back){c.translate(-30*s,-12*s);c.rotate(0.5*air);c.beginPath();c.ellipse(-16*s,0,30*s,8*s,0,0,TAU);}else{c.beginPath();c.ellipse(-16*s,-5*s,30*s,9*s,0,0,TAU);}c.fill();OL(4);c.restore();
    fuzzPath(c,-4*s,-38*s,46*s*st,33*s,16,0.05,-0.12);c.fillStyle=body(-30*s,0);c.fill();OL();
    fuzzPath(c,-22*s,-30*s,24*s,22*s,10,0.06,0,Math.PI*0.6,Math.PI*1.6);c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=2.4*s;c.stroke();// haunch line
    fuzzPath(c,24*s,-32*s,14*s,18*s,8,0.14);c.fillStyle=P[3];c.globalAlpha=0.8;c.fill();c.globalAlpha=1;
    c.fillStyle=P[0];c.beginPath();if(air>0.3)c.ellipse((34+air*10)*s,-14*s,11*s,6*s,-0.4,0,TAU);else c.ellipse(26*s,-5*s,10*s,6.5*s,0,0,TAU);c.fill();OL(3.6);
    const chew=eat?Math.sin(t*16+sd)*0.06:0;const hx=(eat?38:30)*s,hy=(eat?-44:-66)*s,hr=eat?0.3:-0.05+Math.sin(tt*0.8)*0.05;
    c.save();c.translate(hx,hy);c.rotate(hr);
    const earBack=air*0.8;rEar(c,-8*s,-14*s,-0.55-earBack-twA*0.5,s,P,50,1,-6);rEar(c,4*s,-16*s,-0.2-earBack*0.8-twB*0.4,s,P,52,0,-4);
    fuzzPath(c,0,0,28*s,24*s,14,0.06);const hg=c.createRadialGradient(6*s,-10*s,3*s,0,2*s,36*s);hg.addColorStop(0,P[0]);hg.addColorStop(0.6,P[0]);hg.addColorStop(1,P[1]);c.fillStyle=hg;c.fill();OL();
    if(o.col==='spot'){c.save();fuzzPath(c,0,0,28*s,24*s,14,0.06);c.clip();c.fillStyle='#4a3a32';fuzzPath(c,-8*s,-6*s,16*s,14*s,8,0.15);c.fill();c.restore();}
    c.save();c.translate(20*s,8*s);c.scale(1,1+chew);fuzzPath(c,0,0,13*s,11*s,8,0.1);c.fillStyle=P[3];c.fill();c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=2*s;c.stroke();c.restore();
    c.fillStyle='rgba(255,130,150,0.35)';c.beginPath();c.ellipse(10*s,10*s,6*s,4*s,0,0,TAU);c.fill();
    rEye(c,10*s,-6*s,6.6*s,8*s,s,blink,1*s);
    const ny=2*s+nose*0.8*s;c.fillStyle='#f27c98';c.beginPath();c.ellipse(30*s,ny,4.4*s,3.4*s,0.3,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=1.6*s;c.stroke();
    c.strokeStyle='rgba(30,30,36,0.55)';c.lineWidth=1.3*s;for(const dy of [-4,0,4]){c.beginPath();c.moveTo(24*s,(8+nose*0.4)*s);c.quadraticCurveTo(38*s,(8+dy*0.5)*s,52*s,(9+dy)*s);c.stroke();}
    if(eat&&o.carrot!==0){c.save();c.translate(30*s,16*s);c.rotate(0.9+Math.sin(t*16)*0.06);carrot(c,0,0,0.55*s,t);c.restore();}
    c.restore();head={x:x+f*hx,y:y+hy-hop*42*s};}
  c.restore();return {head};}
// ---------- 5. carrot: tapered, ridged, feathery leaves that sway ----------
function carrot(c,x,y,s,t=(window.__ct||0)){c.save();c.translate(x,y);c.lineJoin='round';c.lineCap='round';
  for(const [a,l] of [[-0.55,46],[-0.18,58],[0.2,52],[0.55,40]]){c.save();c.rotate(a+Math.sin(t*3+a*5)*0.06);c.strokeStyle='#2e7a2a';c.lineWidth=3.2*s;c.beginPath();c.moveTo(0,-2*s);c.quadraticCurveTo(3*s,-l*0.5*s,0,-l*s);c.stroke();
    c.fillStyle='#4cae3c';c.strokeStyle='#1e4a18';c.lineWidth=1.4*s;for(let k=1;k<=5;k++){const yy=-l*s*k/5.4;for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*5*s,yy,5.5*s,2.6*s,sd*-0.7,0,TAU);c.fill();c.stroke();}}c.restore();}
  const g=c.createLinearGradient(-14*s,0,14*s,0);g.addColorStop(0,'#ffb060');g.addColorStop(0.45,'#ff8a24');g.addColorStop(1,'#c85a10');c.fillStyle=g;
  c.beginPath();c.moveTo(-13*s,0);c.bezierCurveTo(-13*s,24*s,-5*s,52*s,2*s,74*s);c.bezierCurveTo(6*s,52*s,14*s,24*s,13*s,0);c.quadraticCurveTo(0,-5*s,-13*s,0);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3.6*s;c.stroke();
  c.strokeStyle='rgba(150,60,5,0.55)';c.lineWidth=1.8*s;for(const [yy,w,sd] of [[12,9,-1],[22,8,1],[32,7,-1],[42,5,1],[52,4,-1]]){c.beginPath();c.moveTo(sd*w*s,yy*s);c.quadraticCurveTo(sd*w*0.3*s,(yy+3)*s,0,(yy+1)*s);c.stroke();}
  c.strokeStyle='rgba(255,230,190,0.6)';c.lineWidth=2.2*s;c.beginPath();c.moveTo(-8*s,6*s);c.quadraticCurveTo(-7*s,26*s,-2*s,44*s);c.stroke();
  c.fillStyle='#3a8a2e';c.beginPath();c.ellipse(0,-1*s,9*s,3.4*s,0,0,TAU);c.fill();c.restore();}
// ---------- 6. the Empire salon: damask silk, pilasters, cornice, arched windows, crystal chandelier, parquet ----------
function salon(c,t,v={},o={}){const GY=o.GY||1500,N=o.night;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,N?'#0e2219':'#173a29');g.addColorStop(1,N?'#1c3a2b':'#2f6247');c.fillStyle=g;c.fillRect(-1600,-600,4300,GY+600);
  // damask: rows of tiny gold bees + diamonds
  c.fillStyle=N?'rgba(216,176,64,0.10)':'rgba(230,190,80,0.16)';for(let j=0;j<16;j++)for(let i=-8;i<18;i++){const x=i*90+(j%2)*45,y=140+j*70;if(y>GY-420)continue;c.beginPath();c.ellipse(x,y,5,8,0,0,TAU);c.fill();c.beginPath();c.ellipse(x-7,y-5,6,3.4,0.5,0,TAU);c.ellipse(x+7,y-5,6,3.4,-0.5,0,TAU);c.fill();}
  // gilded wall panels between pilasters
  for(let i=-3;i<6;i++){const x=i*400+20;c.strokeStyle='#c8a038';c.lineWidth=6;c.strokeRect(x+70,170,260,GY-640);c.strokeStyle='rgba(255,230,150,0.35)';c.lineWidth=2;c.strokeRect(x+84,184,232,GY-668);
    for(const [cx,cy] of [[x+70,170],[x+330,170],[x+70,GY-470],[x+330,GY-470]]){c.fillStyle='#d8b040';c.beginPath();c.arc(cx,cy,9,0,TAU);c.fill();}}
  // pilasters (cream with gilded capitals) + candle sconces
  for(let i=-3;i<7;i++){const x=i*400+20;const pg=c.createLinearGradient(x-34,0,x+34,0);pg.addColorStop(0,'#cfc6ae');pg.addColorStop(0.4,'#f4ecd6');pg.addColorStop(1,'#a89e86');c.fillStyle=pg;c.fillRect(x-34,110,68,GY-500);
    c.strokeStyle='rgba(120,100,60,0.5)';c.lineWidth=3;for(const k of [-16,0,16])seg(c,x+k,170,x+k,GY-420);c.fillStyle='#d8b040';c.fillRect(x-46,110,92,34);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(x-46,110,92,34);
    c.fillStyle='#d8b040';c.beginPath();c.ellipse(x-24,154,14,10,0,0,TAU);c.ellipse(x+24,154,14,10,0,0,TAU);c.fill();
    if(i%2===0){const sy=560;c.strokeStyle='#d8b040';c.lineWidth=5;c.beginPath();c.moveTo(x,sy);c.quadraticCurveTo(x+60,sy+40,x+60,sy-20);c.moveTo(x,sy);c.quadraticCurveTo(x-60,sy+40,x-60,sy-20);c.stroke();
      for(const k of [-60,60]){c.fillStyle='#fff8e8';c.fillRect(x+k-6,sy-62,12,42);const fl=1+Math.sin(t*14+k+i)*0.12;c.fillStyle='#ffd070';c.beginPath();c.ellipse(x+k,sy-72,6,12*fl,0,0,TAU);c.fill();
        c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(x+k,sy-72,0,x+k,sy-72,160);lg.addColorStop(0,`rgba(255,200,110,${N?0.5:0.25})`);lg.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=lg;c.fillRect(x+k-160,sy-232,320,320);c.restore();}}}
  // cornice with dentils
  const cg=c.createLinearGradient(0,40,0,120);cg.addColorStop(0,'#f6eed8');cg.addColorStop(1,'#b8ac8c');c.fillStyle=cg;c.fillRect(-1600,30,4300,90);c.fillStyle='#d8b040';c.fillRect(-1600,112,4300,10);
  c.fillStyle='rgba(90,70,40,0.45)';for(let x=-1600;x<2700;x+=34)c.fillRect(x,78,18,22);
  // dado with raised panels and a gilded rail
  const dg=c.createLinearGradient(0,GY-420,0,GY-100);dg.addColorStop(0,'#e8dcc0');dg.addColorStop(1,'#b8a888');c.fillStyle=dg;c.fillRect(-1600,GY-420,4300,320);
  c.fillStyle='#d8b040';c.fillRect(-1600,GY-432,4300,16);c.strokeStyle='rgba(110,90,50,0.55)';c.lineWidth=4;for(let i=-6;i<12;i++)c.strokeRect(i*200+30,GY-380,150,240);
  // N crest in a laurel wreath under an imperial crown
  c.save();c.translate(540,400);const rg=c.createRadialGradient(0,0,10,0,0,170);rg.addColorStop(0,'#a01c2c');rg.addColorStop(1,'#5a0c16');c.fillStyle=rg;c.beginPath();c.arc(0,0,150,0,TAU);c.fill();c.strokeStyle='#d8b040';c.lineWidth=10;c.stroke();
  for(const sd of [-1,1])for(let k=0;k<11;k++){const a=Math.PI/2+sd*(0.35+k*0.21);c.save();c.translate(Math.cos(a)*118,Math.sin(a)*118);c.rotate(a+sd*1.2);c.fillStyle=k%2?'#e8c048':'#c89a28';c.beginPath();c.ellipse(0,0,8,20,0,0,TAU);c.fill();c.restore();}
  c.fillStyle='#f0c850';c.font='900 150px "Inter Display",serif';c.textAlign='center';c.textBaseline='middle';c.strokeStyle='#5a3a08';c.lineWidth=6;c.strokeText('N',0,10);c.fillText('N',0,10);
  c.translate(0,-190);c.fillStyle='#e8c048';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.moveTo(-60,30);c.lineTo(-70,-20);c.lineTo(-30,0);c.lineTo(0,-40);c.lineTo(30,0);c.lineTo(70,-20);c.lineTo(60,30);c.closePath();c.fill();c.stroke();c.fillStyle='#c02828';c.fillRect(-58,18,116,14);c.restore();
  // arched windows with mullions, drapes with folds and gold tie-backs
  for(const x of [-80,1160]){const wg=c.createLinearGradient(0,140,0,760);if(N){wg.addColorStop(0,'#08102a');wg.addColorStop(1,'#1a2850');}else{wg.addColorStop(0,'#9ccaf0');wg.addColorStop(1,'#e8f4ff');}
    c.beginPath();c.moveTo(x-120,780);c.lineTo(x-120,260);c.arc(x,260,120,Math.PI,0);c.lineTo(x+120,780);c.closePath();c.fillStyle=wg;c.fill();c.strokeStyle='#f2ead4';c.lineWidth=16;c.stroke();c.strokeStyle=K2;c.lineWidth=4;c.stroke();
    if(N){c.fillStyle='#f4f0d8';c.beginPath();c.arc(x+40,300,30,0,TAU);c.fill();}
    c.strokeStyle='#f2ead4';c.lineWidth=8;for(const k of [-40,40])seg(c,x+k,170,x+k,780);for(const yy of [300,440,600])seg(c,x-120,yy,x+120,yy);
    if(!N){c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,240,200,0.08)';c.beginPath();c.moveTo(x-120,200);c.lineTo(x+120,200);c.lineTo(x+620*(x<540?1:-1)+120,GY+400);c.lineTo(x+620*(x<540?1:-1)-200,GY+400);c.closePath();c.fill();c.restore();}
    for(const sd of [-1,1]){const dx=x+sd*150;const dgr=c.createLinearGradient(dx-60,0,dx+60,0);for(let k=0;k<=6;k++)dgr.addColorStop(k/6,k%2?'#a01c2c':'#5a0a16');c.fillStyle=dgr;
      c.beginPath();c.moveTo(dx-55,90);c.lineTo(dx+55,90);c.quadraticCurveTo(dx+20,520,dx+sd*-10+40,560);c.quadraticCurveTo(dx+70,800,dx+60,GY-100);c.lineTo(dx-60,GY-100);c.quadraticCurveTo(dx-70,800,dx-40,560);c.quadraticCurveTo(dx-20,520,dx-55,90);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=4;c.stroke();
      c.strokeStyle='#e8c048';c.lineWidth=8;seg(c,dx-36,560,dx+36,560);c.fillStyle='#e8c048';c.beginPath();c.arc(dx+30,575,10,0,TAU);c.fill();}
    c.fillStyle='#8a1424';c.beginPath();c.moveTo(x-220,80);c.quadraticCurveTo(x,220,x+220,80);c.closePath();c.fill();c.strokeStyle='#e8c048';c.lineWidth=6;c.beginPath();c.moveTo(x-220,84);c.quadraticCurveTo(x,214,x+220,84);c.stroke();}
  // crystal chandelier
  if(!o.noChand){const ch=540,cy=40;c.strokeStyle='#d8b040';c.lineWidth=5;seg(c,ch,-300,ch,cy);c.lineWidth=4;
    for(const [ry,rw,n] of [[cy+20,180,7],[cy-30,110,5]]){c.beginPath();c.ellipse(ch,ry,rw,22,0,0,Math.PI);c.stroke();for(let k=0;k<n;k++){const a=k/(n-1)*Math.PI,px=ch-Math.cos(a)*rw,py=ry+Math.sin(a)*22;
      c.fillStyle='rgba(220,240,255,0.85)';for(let d=1;d<=3;d++){c.beginPath();c.moveTo(px,py+d*14-6);c.lineTo(px+4,py+d*14);c.lineTo(px,py+d*14+8);c.lineTo(px-4,py+d*14);c.closePath();c.fill();}
      c.fillStyle='#fff8e8';c.fillRect(px-4,py-26,8,24);const fl=1+Math.sin(t*15+k*2)*0.15;c.fillStyle='#ffd070';c.beginPath();c.ellipse(px,py-32,4.5,9*fl,0,0,TAU);c.fill();}}
    c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(ch,cy,0,ch,cy,520);lg.addColorStop(0,`rgba(255,210,130,${N?0.55:0.32})`);lg.addColorStop(1,'rgba(255,210,130,0)');c.fillStyle=lg;c.fillRect(ch-520,cy-520,1040,1040);c.restore();}
  // parquet: perspective boards + alternating tone + window reflections
  const fg=c.createLinearGradient(0,GY-100,0,2400);fg.addColorStop(0,N?'#3a2410':'#6a4420');fg.addColorStop(1,N?'#6a4424':'#b8844e');c.fillStyle=fg;c.fillRect(-1600,GY-100,4300,1400);
  for(let i=-14;i<=14;i++){c.fillStyle=i%2?'rgba(255,220,170,0.06)':'rgba(40,20,5,0.08)';c.beginPath();c.moveTo(540+i*50,GY-100);c.lineTo(540+(i+1)*50,GY-100);c.lineTo(540+(i+1)*240,2400);c.lineTo(540+i*240,2400);c.closePath();c.fill();
    c.strokeStyle='rgba(20,10,4,0.35)';c.lineWidth=2.5;seg(c,540+i*50,GY-100,540+i*240,2400);}
  c.strokeStyle='rgba(20,10,4,0.22)';c.lineWidth=2;for(let k=1;k<14;k++){const yy=GY-100+Math.pow(k/14,1.6)*1400;for(let i=-14;i<=14;i++){if((i+k)%2)continue;const p=(yy-(GY-100))/2500;const x0=540+i*(50+190*p);seg(c,x0,yy,x0+50+190*p,yy);}}
  c.save();c.globalCompositeOperation='lighter';for(const x of [-80,1160]){const rgr=c.createLinearGradient(0,GY-100,0,GY+500);rgr.addColorStop(0,N?'rgba(120,150,220,0.12)':'rgba(255,240,210,0.22)');rgr.addColorStop(1,'rgba(255,240,210,0)');c.fillStyle=rgr;c.fillRect(x-110,GY-100,220,600);}c.restore();
  // rug: crimson with a gold border and rosettes
  c.save();c.translate(540,GY+260);c.fillStyle='#7a1220';c.beginPath();c.ellipse(0,0,500,118,0,0,TAU);c.fill();c.strokeStyle='#d8b040';c.lineWidth=10;c.beginPath();c.ellipse(0,0,470,104,0,0,TAU);c.stroke();c.lineWidth=3;c.beginPath();c.ellipse(0,0,440,92,0,0,TAU);c.stroke();
  c.fillStyle='rgba(232,192,72,0.55)';for(let k=0;k<20;k++){const a=k/20*TAU;c.beginPath();c.ellipse(Math.cos(a)*455,Math.sin(a)*98,9,4,0,0,TAU);c.fill();}c.beginPath();c.ellipse(0,0,120,30,0,0,TAU);c.strokeStyle='rgba(232,192,72,0.6)';c.lineWidth=4;c.stroke();c.restore();
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// ---------- 7. the Tilsit raft: log deck, two classical pavilions with N and A monograms, waving flags ----------
function raft(c,x,y,s,t){c.save();c.translate(x,y+Math.sin(t*1.5)*4*s);c.lineJoin='round';c.strokeStyle=K2;
  c.fillStyle='rgba(20,30,50,0.35)';c.beginPath();c.ellipse(0,64*s,460*s,26*s,0,0,TAU);c.fill();
  for(let i=-8;i<=8;i++){const lx=i*50*s;const lg=c.createLinearGradient(0,0,0,56*s);lg.addColorStop(0,'#b07a40');lg.addColorStop(1,'#5a3618');c.fillStyle=lg;rr(c,lx-25*s,0,50*s,56*s,10*s);c.fill();c.lineWidth=3*s;c.stroke();
    c.fillStyle='#d8a870';c.beginPath();c.ellipse(lx,50*s,18*s,8*s,0,0,TAU);c.fill();c.lineWidth=2*s;c.stroke();c.strokeStyle='rgba(90,50,20,0.7)';c.beginPath();c.ellipse(lx,50*s,9*s,4*s,0,0,TAU);c.stroke();c.strokeStyle=K2;}
  c.fillStyle='#c89a60';c.fillRect(-430*s,-6*s,860*s,12*s);c.lineWidth=4*s;c.strokeRect(-430*s,-6*s,860*s,12*s);
  for(const [px,mono,fl] of [[-200,'N',['#2a4ab8','#ffffff','#d02a2a']],[200,'A',['#ffffff','#2a5a3a','#d8b040']]]){c.save();c.translate(px*s,0);
    const wg=c.createLinearGradient(-150*s,0,150*s,0);wg.addColorStop(0,'#fffaf0');wg.addColorStop(1,'#d8ceb6');c.fillStyle=wg;c.fillRect(-150*s,-320*s,300*s,314*s);c.lineWidth=5*s;c.strokeRect(-150*s,-320*s,300*s,314*s);
    for(const k of [-130,-70,70,130]){const cg=c.createLinearGradient((k-12)*s,0,(k+12)*s,0);cg.addColorStop(0,'#f8f4e8');cg.addColorStop(1,'#bab096');c.fillStyle=cg;c.fillRect((k-12)*s,-310*s,24*s,304*s);c.lineWidth=2.5*s;c.strokeRect((k-12)*s,-310*s,24*s,304*s);}
    c.fillStyle='#2a1a10';rr(c,-48*s,-230*s,96*s,224*s,48*s);c.fill();for(const sd of [-1,1]){c.fillStyle='#a01c2c';c.beginPath();c.moveTo(sd*48*s,-230*s);c.quadraticCurveTo(sd*10*s,-150*s,sd*40*s,-6*s);c.lineTo(sd*54*s,-6*s);c.lineTo(sd*54*s,-230*s);c.closePath();c.fill();c.lineWidth=2.5*s;c.stroke();}
    c.fillStyle='#ece4d0';c.fillRect(-165*s,-345*s,330*s,28*s);c.lineWidth=4*s;c.strokeRect(-165*s,-345*s,330*s,28*s);
    c.fillStyle='#f4eedc';c.beginPath();c.moveTo(-175*s,-345*s);c.lineTo(0,-440*s);c.lineTo(175*s,-345*s);c.closePath();c.fill();c.lineWidth=5*s;c.stroke();
    c.strokeStyle='#d8b040';c.lineWidth=4*s;c.beginPath();c.arc(0,-380*s,26*s,Math.PI*0.7,Math.PI*2.3);c.stroke();c.fillStyle='#c8a030';c.font=`900 ${38*s}px serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(mono,0,-378*s);
    c.strokeStyle=K2;c.lineWidth=4*s;seg(c,0,-440*s,0,-560*s);const wave=k=>Math.sin(t*6+k*0.8)*7*s;fl.forEach((col,i)=>{c.fillStyle=col;c.beginPath();c.moveTo(i*24*s,-558*s+wave(i));c.lineTo((i+1)*24*s,-558*s+wave(i+1));c.lineTo((i+1)*24*s,-508*s+wave(i+1));c.lineTo(i*24*s,-508*s+wave(i));c.closePath();c.fill();});
    c.lineWidth=3*s;c.beginPath();c.moveTo(0,-558*s+wave(0));for(let i=1;i<=3;i++)c.lineTo(i*24*s,-558*s+wave(i));for(let i=3;i>=0;i--)c.lineTo(i*24*s,-508*s+wave(i));c.closePath();c.stroke();
    c.restore();}
  
  c.restore();}
// ---------- 8. country cottage: thatched roof, timber frame, glowing windows, chimney smoke, fence, hutch ----------
function cottage(c,x,y,s,t){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;
  c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.ellipse(0,4*s,300*s,24*s,0,0,TAU);c.fill();
  c.fillStyle='#8a7a6a';c.fillRect(70*s,-330*s,44*s,120*s);c.lineWidth=4*s;c.strokeRect(70*s,-330*s,44*s,120*s);
  for(let i=0;i<5;i++){const p=(t*0.35+i/5)%1;c.fillStyle=`rgba(230,230,235,${0.55*(1-p)})`;c.beginPath();c.arc(92*s+Math.sin(p*6+i)*20*s+p*60*s,-340*s-p*260*s,(14+p*40)*s,0,TAU);c.fill();}
  const wg=c.createLinearGradient(-240*s,0,240*s,0);wg.addColorStop(0,'#f4ead4');wg.addColorStop(1,'#cbbd9c');c.fillStyle=wg;c.fillRect(-240*s,-200*s,480*s,200*s);c.lineWidth=5*s;c.strokeRect(-240*s,-200*s,480*s,200*s);
  c.strokeStyle='#5a3a1e';c.lineWidth=12*s;for(const k of [-240,-80,80,240])seg(c,k*s,-200*s,k*s,0);seg(c,-240*s,-100*s,240*s,-100*s);c.lineWidth=9*s;seg(c,-240*s,-200*s,-80*s,-100*s);seg(c,240*s,-200*s,80*s,-100*s);c.strokeStyle=K2;
  c.fillStyle='#6a4426';rr(c,-30*s,-140*s,60*s,140*s,6*s);c.fill();c.lineWidth=4*s;c.stroke();c.fillStyle='#d8b040';c.beginPath();c.arc(18*s,-70*s,4*s,0,TAU);c.fill();
  for(const k of [-160,160]){const gl=c.createLinearGradient(0,-170*s,0,-110*s);gl.addColorStop(0,'#ffe4a0');gl.addColorStop(1,'#ffb050');c.fillStyle=gl;c.fillRect((k-34)*s,-170*s,68*s,58*s);c.lineWidth=4*s;c.strokeRect((k-34)*s,-170*s,68*s,58*s);c.strokeStyle='#5a3a1e';c.lineWidth=4*s;seg(c,k*s,-170*s,k*s,-112*s);seg(c,(k-34)*s,-141*s,(k+34)*s,-141*s);c.strokeStyle=K2;
    c.fillStyle='#5a7a3a';c.fillRect((k-40)*s,-112*s,80*s,14*s);c.fillStyle='#e04a5a';for(let i=0;i<4;i++){c.beginPath();c.arc((k-28+i*18)*s,-114*s,5*s,0,TAU);c.fill();}}
  const rg=c.createLinearGradient(0,-380*s,0,-190*s);rg.addColorStop(0,'#d8b468');rg.addColorStop(1,'#9a7434');c.fillStyle=rg;c.beginPath();c.moveTo(-290*s,-180*s);c.quadraticCurveTo(-200*s,-330*s,-60*s,-380*s);c.quadraticCurveTo(0,-392*s,60*s,-380*s);c.quadraticCurveTo(200*s,-330*s,290*s,-180*s);c.quadraticCurveTo(0,-168*s,-290*s,-180*s);c.closePath();c.fill();c.lineWidth=5*s;c.stroke();
  c.save();c.clip();c.strokeStyle='rgba(110,80,30,0.55)';c.lineWidth=2.4*s;for(let i=0;i<40;i++){const xx=(-290+i*15)*s;seg(c,xx,-180*s,xx*0.25,-390*s);}c.strokeStyle='rgba(255,240,190,0.35)';for(const yy of [-240,-300])seg(c,-300*s,yy*s,300*s,yy*s);c.restore();
  c.fillStyle='#b8925a';c.beginPath();c.moveTo(-290*s,-180*s);c.quadraticCurveTo(0,-160*s,290*s,-180*s);c.lineTo(290*s,-172*s);c.quadraticCurveTo(0,-150*s,-290*s,-172*s);c.fill();
  c.fillStyle='#e8dcc0';c.lineWidth=3*s;for(let i=0;i<9;i++){const fx=(-460+i*28)*s;c.fillRect(fx-5*s,-70*s,10*s,74*s);c.strokeRect(fx-5*s,-70*s,10*s,74*s);}c.fillRect(-470*s,-54*s,240*s,9*s);c.strokeRect(-470*s,-54*s,240*s,9*s);c.fillRect(-470*s,-26*s,240*s,9*s);c.strokeRect(-470*s,-26*s,240*s,9*s);
  c.fillStyle='#a8743a';c.fillRect(270*s,-90*s,150*s,90*s);c.lineWidth=4*s;c.strokeRect(270*s,-90*s,150*s,90*s);c.strokeStyle='#4a3a2a';c.lineWidth=3*s;for(let i=1;i<7;i++)seg(c,(270+i*21)*s,-84*s,(270+i*21)*s,-6*s);c.fillStyle='#7a4a22';c.fillRect(262*s,-104*s,166*s,16*s);
  c.restore();}
// ---------- 4b. 3D rabbits: pre-rendered sprites (rb3d.js → rprops/rmeta.js), animated in 2D ----------
const RIMG={};
function rabbit(c,x,y,s,o={}){const f=o.f||1,t=o.t??0,sd=o.seed||0,col=o.col||'white',pose=o.pose||'sit';
  const r1=hash(sd*7.1+1),tt=t+r1*10;let name,sq=0,lift=0;
  const twitch=((tt*0.55)%1)<0.16;
  if(pose==='hop'||pose==='run'){const ph=(t*(o.spd||9)/(Math.PI*2)+sd*0.37)%1;name=`rb_${col}_hop${Math.floor(ph*4)}_${o.view||'side'}`;}
  else if(pose==='eat'){name=`rb_${col}_eat_side`;sq=Math.sin(t*16+sd)*0.02;}
  else{const ph=(tt*0.45)%1;if(ph<0.12)lift=Math.sin(ph/0.12*Math.PI)*0.45;else if(ph<0.2)sq=-Math.sin((ph-0.12)/0.08*Math.PI)*0.08;
    name=`rb_${col}_${twitch?'sit2':'sit'}_${pose==='front'?'front':'q3'}`;}
  const m=RMETA[name],im=RIMG[name];if(!m||!im)return {head:{x,y:y-120*s}};
  const k=s*172/RMETA.rb_white_sit_front.h,br=Math.sin(tt*5)*0.015;
  c.save();c.fillStyle=`rgba(0,0,0,${0.3-lift*0.15})`;c.beginPath();c.ellipse(x,y+2*s,(pose==='front'?50:62)*s*(1-lift*0.3),10*s,0,0,TAU);c.fill();
  c.translate(x,y-lift*40*s);c.scale(f*k*(1-sq*0.6),k*(1+sq+br));c.drawImage(im,-m.ax,-m.ay,m.w,m.h);c.restore();
  if(pose==='eat'&&o.carrot!==0){c.save();c.translate(x+f*100*s,y-40*s);c.scale(f,1);c.rotate(1.0+Math.sin(t*16)*0.06);carrot(c,0,0,0.6*s,t);c.restore();}
  return {head:{x:x+(pose==='front'?0:f*55*s),y:y-(pose==='front'?118:100)*s-lift*40*s}};}
// ---------- 9. living environment: treeline, wildflowers, swaying grass, birds, butterflies, pollen / dust motes ----------
function tree(c,x,y,h,col,t,sd){c.save();c.translate(x,y);c.rotate(Math.sin(t*1.3+sd)*0.015);c.fillStyle=shd(col,-0.45);c.fillRect(-h*0.05,-h*0.35,h*0.1,h*0.36);
  for(const [dx,dy,r,k] of [[0,-0.62,0.32,0],[-0.22,-0.48,0.24,-0.12],[0.22,-0.5,0.25,-0.08],[0,-0.82,0.22,0.1]]){c.fillStyle=shd(col,k);c.beginPath();c.arc(dx*h,dy*h,r*h,0,TAU);c.fill();}
  c.fillStyle='rgba(255,240,190,0.18)';c.beginPath();c.arc(L2.dx*0.1*h,-0.78*h,0.16*h,0,TAU);c.fill();c.restore();}
function flower(c,x,y,s,col,t,sd){const sw=Math.sin(t*2.2+sd*3)*0.12;c.save();c.translate(x,y);c.rotate(sw);c.strokeStyle='#3a6a2a';c.lineWidth=2.2*s;seg(c,0,0,0,-22*s);
  c.fillStyle=col;for(let i=0;i<5;i++){const a=i/5*TAU;c.beginPath();c.ellipse(Math.cos(a)*5*s,-22*s+Math.sin(a)*5*s,4*s,3*s,a,0,TAU);c.fill();}c.fillStyle='#ffd23a';c.beginPath();c.arc(0,-22*s,2.6*s,0,TAU);c.fill();c.restore();}
function tuft(c,x,y,s,t,sd,col){c.save();c.translate(x,y);c.strokeStyle=col;c.lineWidth=2.6*s;c.lineCap='round';const w=Math.sin(t*2+x*0.01)*6*s;
  for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*3*s,0);c.quadraticCurveTo(i*5*s+w*0.4,-12*s,i*7*s+w,-(20+hash(sd+i)*12)*s);c.stroke();}c.restore();}
function bird(c,x,y,s,t,sd){const fl=Math.sin(t*9+sd*5);c.strokeStyle='rgba(30,30,40,0.75)';c.lineWidth=3*s;c.lineCap='round';c.beginPath();c.moveTo(x-14*s,y-fl*6*s);c.quadraticCurveTo(x-6*s,y-6*s,x,y);c.quadraticCurveTo(x+6*s,y-6*s,x+14*s,y-fl*6*s);c.stroke();}
function butterfly(c,x,y,s,t,sd,col){const fl=Math.abs(Math.sin(t*14+sd));c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle='rgba(20,20,20,0.6)';c.lineWidth=1.2*s;
  for(const k of [-1,1]){c.beginPath();c.ellipse(k*7*s*fl,-3*s,7*s*fl+1,6*s,k*0.4,0,TAU);c.fill();c.stroke();c.beginPath();c.ellipse(k*5*s*fl,4*s,5*s*fl+1,4*s,-k*0.4,0,TAU);c.fill();}c.fillStyle='#222';c.fillRect(-1*s,-6*s,2*s,12*s);c.restore();}
function motes(c,t,n,col,seed=0){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const u=hash(i*1.7+seed),v=hash(i*3.1+seed),sp=0.3+hash(i*5.3)*0.7;
  const x=((u*1200+t*14*sp+Math.sin(t*0.8+i)*30)%1200)-60,y=((v*2000-t*22*sp)%2000+2000)%2000-40,r=1.5+hash(i*7)*3.5,a=0.25+0.35*Math.sin(t*2+i);
  if(a<=0)continue;const g=c.createRadialGradient(x,y,0,x,y,r*3);g.addColorStop(0,col.replace('A',a.toFixed(2)));g.addColorStop(1,col.replace('A','0'));c.fillStyle=g;c.beginPath();c.arc(x,y,r*3,0,TAU);c.fill();}c.restore();}
{const _fld=field;field=function(c,t,v={},o={}){const sky=o.sky||'sun',day=sky==='sun'||sky==='dawn',dusk=sky==='dusk',w=o.world;
  _fld(c,t,v,{...o,world:(c2,GY)=>{if(o.env!==0&&(day||dusk)){
      const tc=dusk?'#4a3a40':'#4a6a34';for(let i=0;i<26;i++){const x=-900+i*130+hash(i*2.3)*80;tree(c2,x,GY-150+hash(i*4.1)*30,90+hash(i*1.9)*90,tc,t,i);}
      for(let i=0;i<7;i++){const p=((t*0.04+hash(i*3.3))%1);bird(c2,-600+p*2400,GY-900+hash(i*5.7)*350+Math.sin(t+i)*20,0.9+hash(i)*0.6,t,i);}
      const fc=dusk?['#e8a0b8','#f0d080','#ffffff']:['#ffffff','#ffd23a','#e86a8a','#a8b8ff'];
      for(let i=0;i<70;i++){const d=hash(i*1.3),x=-700+hash(i*2.9)*2500,y=GY-60+Math.pow(d,1.4)*1300,s=0.6+d*1.4;if(i%3===0)tuft(c2,x,y,s,t,i,dusk?'#5a4a3a':'#3e6a2a');else flower(c2,x,y,s,fc[i%fc.length],t,i);}
      if(day)for(let i=0;i<4;i++){const p=t*0.5+i*1.7;butterfly(c2,200+i*230+Math.sin(p)*120,GY+250+Math.sin(p*1.7)*90+i*60,1.2,t,i,['#ffd23a','#ffffff','#ff9a3a','#a8c8ff'][i]);}}
    if(w)w(c2,GY);}});
  if(o.env!==0&&(day||dusk))motes(c,t,26,dusk?'rgba(255,190,120,A)':'rgba(255,250,210,A)',3);};}
{const _sal=salon;salon=function(c,t,v={},o={}){_sal(c,t,v,o);motes(c,t,30,o.night?'rgba(255,200,130,A)':'rgba(255,245,215,A)',7);};}
{const _rv=river;river=function(c,t,v={},o={}){const w=o.world;_rv(c,t,v,{...o,world:(c2,GY)=>{for(let i=0;i<6;i++){const p=((t*0.05+hash(i*3.3))%1);bird(c2,-500+p*2200,GY-700+hash(i*5.7)*300,1+hash(i)*0.5,t,i);}if(w)w(c2,GY);}});motes(c,t,18,'rgba(255,220,170,A)',5);};}
// ---------- 10. rabbit crate: 2.5D wooden box (front, top, side), planks + grain, iron bars, latch, straw, a rabbit inside ----------
function plank(c,x,y,w,h,col,s,sd){const g=c.createLinearGradient(x,y,x,y+h);g.addColorStop(0,shd(col,0.12));g.addColorStop(1,shd(col,-0.12));c.fillStyle=g;c.fillRect(x,y,w,h);
  c.strokeStyle='rgba(60,30,10,0.35)';c.lineWidth=1.2*s;for(let i=1;i<3;i++){const yy=y+h*i/3+Math.sin(sd+i)*1.5*s;c.beginPath();c.moveTo(x+2*s,yy);c.quadraticCurveTo(x+w*0.5,yy+Math.sin(sd*3+i)*3*s,x+w-2*s,yy);c.stroke();}
  c.fillStyle='rgba(50,25,8,0.5)';c.beginPath();c.ellipse(x+w*(0.2+hash(sd)*0.6),y+h*0.5,2.4*s,1.4*s,0,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=2.6*s;c.strokeRect(x,y,w,h);}
function cage(c,x,y,s,open=0,o={}){const t=o.t??0,sd=o.seed??Math.round(x*7+y),W2=86*s,Hf=112*s,dx=38*s,dy=-28*s,wood='#b07a42',col=o.col||['white','grey','brown','spot'][Math.abs(sd)%4];
  c.save();c.translate(x,y);c.lineJoin='round';
  c.fillStyle='rgba(0,0,0,0.32)';c.beginPath();c.moveTo(-W2-6*s,0);c.lineTo(W2+6*s,0);c.lineTo(W2+dx+16*s,dy*0.4);c.lineTo(-W2+dx,dy*0.4);c.closePath();c.fill();
  // interior: dark back, straw floor, the rabbit
  c.fillStyle='#24160c';c.fillRect(-W2+12*s,-Hf+12*s,2*W2-24*s,Hf-24*s);
  c.save();c.beginPath();c.rect(-W2+12*s,-Hf+12*s,2*W2-24*s,Hf-24*s);c.clip();
  const lg=c.createLinearGradient(0,-Hf,0,0);lg.addColorStop(0,'rgba(0,0,0,0.55)');lg.addColorStop(1,'rgba(0,0,0,0)');
  if(open<0.9||o.keep){const peek=open>0?Math.min(1,open*1.5):0;rabbit(c,(hash(sd)-0.5)*30*s,-14*s+peek*0*s,0.52*s,{pose:'front',t,col,seed:sd});}
  c.fillStyle=lg;c.fillRect(-W2,-Hf,2*W2,Hf*0.5);
  c.strokeStyle='#e8c060';c.lineWidth=2*s;for(let i=0;i<26;i++){const sx=-W2+14*s+hash(sd+i*1.3)*(2*W2-28*s),sy=-14*s-hash(i*2.7+sd)*8*s;c.beginPath();c.moveTo(sx,sy);c.lineTo(sx+(hash(i*5.1)-0.5)*26*s,sy+6*s);c.stroke();}
  c.restore();
  // side face (right) with slats and gaps
  c.save();c.beginPath();c.moveTo(W2,-Hf);c.lineTo(W2+dx,-Hf+dy);c.lineTo(W2+dx,dy);c.lineTo(W2,0);c.closePath();c.fillStyle='#1a1008';c.fill();c.clip();
  for(let i=0;i<4;i++){const y0=-Hf+i*Hf/4+3*s;c.fillStyle=shd(wood,-0.32);c.beginPath();c.moveTo(W2,y0);c.lineTo(W2+dx,y0+dy);c.lineTo(W2+dx,y0+dy+Hf/4-7*s);c.lineTo(W2,y0+Hf/4-7*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=2*s;c.stroke();}c.restore();
  c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(W2,-Hf);c.lineTo(W2+dx,-Hf+dy);c.lineTo(W2+dx,dy);c.lineTo(W2,0);c.stroke();
  // top face: planks running back
  c.save();c.beginPath();c.moveTo(-W2,-Hf);c.lineTo(W2,-Hf);c.lineTo(W2+dx,-Hf+dy);c.lineTo(-W2+dx,-Hf+dy);c.closePath();c.fillStyle=shd(wood,0.18);c.fill();c.clip();
  c.strokeStyle='rgba(60,30,10,0.55)';c.lineWidth=2*s;for(let i=1;i<6;i++){const xx=-W2+i*2*W2/6;seg(c,xx,-Hf,xx+dx,-Hf+dy);}c.restore();c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-W2,-Hf);c.lineTo(W2,-Hf);c.lineTo(W2+dx,-Hf+dy);c.lineTo(-W2+dx,-Hf+dy);c.closePath();c.stroke();
  // rope handle on top
  c.strokeStyle='#c8a870';c.lineWidth=4*s;c.beginPath();c.moveTo(-20*s+dx*0.5,-Hf+dy*0.5);c.quadraticCurveTo(dx*0.5,-Hf+dy*0.5-26*s,20*s+dx*0.5,-Hf+dy*0.5);c.stroke();
  // front frame planks + corner posts + brand
  plank(c,-W2,-Hf,2*W2,14*s,wood,s,sd+1);plank(c,-W2,-14*s,2*W2,14*s,wood,s,sd+2);
  for(const px of [-W2,W2-14*s]){const g=c.createLinearGradient(px,0,px+14*s,0);g.addColorStop(0,shd(wood,0.2));g.addColorStop(1,shd(wood,-0.2));c.fillStyle=g;c.fillRect(px,-Hf,14*s,Hf);c.strokeStyle=K2;c.lineWidth=2.6*s;c.strokeRect(px,-Hf,14*s,Hf);
    for(const ny of [-Hf+7*s,-7*s]){c.fillStyle='#3a3a40';c.beginPath();c.arc(px+7*s,ny,2.2*s,0,TAU);c.fill();}}
  c.fillStyle='rgba(40,20,8,0.7)';c.font=`900 ${11*s}px serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('★ N ★',0,-7*s);
  // iron bar door: hinged at the top, swings up and out when opened
  const barG=xx=>{const g=c.createLinearGradient(xx-2.5*s,0,xx+2.5*s,0);g.addColorStop(0,'#4a4e56');g.addColorStop(0.5,'#d8dce4');g.addColorStop(1,'#4a4e56');return g;};
  c.save();c.translate(0,-Hf+14*s);c.scale(1,Math.cos(open*Math.PI*0.62));const bh=Hf-28*s;
  for(let i=0;i<8;i++){const xx=-W2+24*s+i*(2*W2-48*s)/7;c.strokeStyle=K2;c.lineWidth=6.5*s;seg(c,xx,0,xx,bh);c.strokeStyle=barG(xx);c.lineWidth=4*s;seg(c,xx,0,xx,bh);}
  c.strokeStyle=K2;c.lineWidth=6.5*s;seg(c,-W2+16*s,bh*0.5,W2-16*s,bh*0.5);c.strokeStyle='#a0a4ac';c.lineWidth=4*s;seg(c,-W2+16*s,bh*0.5,W2-16*s,bh*0.5);
  c.fillStyle='#c8a040';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(-8*s,bh-14*s,16*s,14*s);c.strokeRect(-8*s,bh-14*s,16*s,14*s);c.restore();
  c.restore();}
// ---------- 11. perspective + depth: one ground rule for everyone, actors sorted with the crowd, nobody passes through anybody ----------
// persp: char scale S(y)=k*(y-yH) on world ground row y. A rabbit is ~0.42 of a character's scale.
const PSP=(GY,yRef,sRef)=>({yH:GY-90,k:sRef/(yRef-GY+90)});
const pS=(P,y)=>Math.max(0.05,P.k*(y-P.yH));
// actor: {x,y,rx(px),draw()} ; block: {x0,x1,y0,y1}
function swarm(c,t,o){const n=o.n||40,res=[],P=o.persp,A=o.actors||[],B=o.blocks||[];
  for(let i=0;i<n;i++){const u=hash(i*3.7+(o.seed||0)),v=hash(i*5.3+(o.seed||0));let x=lerp(o.x0,o.x1,u),y=lerp(o.y0,o.y1,v);if(o.flow){const r=o.flow(x,y,i,t);if(!r)continue;({x,y}=r);}
    for(const a of A){const ry=a.ry||a.rx*0.32,dx=(x-a.x)/a.rx,dy=(y-a.y)/ry,d=Math.hypot(dx,dy);if(d<1){const k=d<1e-3?1:1/d;x=a.x+dx*k*a.rx;y=a.y+dy*k*ry;}}
    for(const b of B){if(x>b.x0&&x<b.x1&&y>b.y0&&y<b.y1){const dt=y-b.y0,db=b.y1-y;y=dt<db?b.y0-2:b.y1+2;}}
    res.push({y,x,i});}
  for(const a of A)res.push({y:a.y,a});for(const b of B)if(b.draw)res.push({y:b.y1,a:b});
  res.sort((p,q)=>p.y-q.y);const cols=['white','white','grey','spot','brown','white'];
  for(const r of res){if(r.a){r.a.draw();continue;}const k=P?pS(P,r.y)*0.42*(o.big||1):lerp(o.s0,o.s1,(r.y-o.y0)/Math.max(1,o.y1-o.y0));
    const pose=typeof o.pose==='function'?o.pose(r.i,r.x,r.y):(o.pose||'front');const f=typeof o.f==='function'?o.f(r.i,r.x,r.y):(o.f??(hash(r.i)>0.5?1:-1));
    rabbit(c,r.x,r.y,k,{pose,f,t,seed:r.i,col:cols[r.i%cols.length],spd:o.spd});}}
// ---------- 12. the coach + horses (3D sprites), with model-space → screen helper for doors/windows ----------
function cProj(cm,P){const ev=cm.eye.map(v=>v/Math.hypot(...cm.eye)),fv=Math.tan(9*Math.PI/180),dist=cm.r/fv/(1080/1920)*1.05,E=cm.c.map((v,i)=>v+ev[i]*dist);
  const F=cm.c.map((v,i)=>v-E[i]),fl=Math.hypot(...F);F.forEach((v,i)=>F[i]=v/fl);let R=[F[1]*0-F[2]*1,F[2]*0-F[0]*0,F[0]*1-F[1]*0];const rl=Math.hypot(...R);R=R.map(v=>v/rl);
  const U=[R[1]*F[2]-R[2]*F[1],R[2]*F[0]-R[0]*F[2],R[0]*F[1]-R[1]*F[0]];const d=P.map((v,i)=>v-E[i]);const x=d[0]*R[0]+d[1]*R[1]+d[2]*R[2],y=d[0]*U[0]+d[1]*U[1]+d[2]*U[2],z=d[0]*F[0]+d[1]*F[1]+d[2]*F[2];const fp=960/fv;return [540+x/z*fp,960-y/z*fp];}
const CO_CAM={side:{c:[0.85,1.45,0],r:2.75,eye:[0,0.12,1]},q3:{c:[0.85,1.45,0],r:2.75,eye:[0.55,0.16,0.82]}};
function spr(c,name,x,y,ppu,f=1){const m=RMETA[name],im=RIMG[name];if(!m||!im)return;const k=ppu/m.ppu;c.save();c.translate(x,y);c.scale(f*k,k);c.drawImage(im,-m.ax,-m.ay,m.w,m.h);c.restore();}
function coach(c,x,y,ppu,t,o={}){const vw=o.view||'side',mv=o.moving?1:0,f=o.f||1;const bob=mv?Math.sin(t*17)*0.025*ppu:0;
  const o0=cProj(CO_CAM[vw],[0,0,0]),m0=RMETA[`co_${vw}_w0`],k=ppu/m0.ppu;const pt=(X,Y,Z)=>{const p=cProj(CO_CAM[vw],[X,Y,Z]);return {x:x+f*(p[0]-o0[0])*k,y:y+(p[1]-o0[1])*k+bob};};
  c.save();c.fillStyle='rgba(0,0,0,0.32)';c.beginPath();c.ellipse(x+f*(o.horses===false?0:1.9)*ppu,y+0.05*ppu,(o.horses===false?2.0:4.2)*ppu,0.22*ppu,0,0,TAU);c.fill();c.restore();
  if(mv)for(let i=0;i<10;i++){const p=((t*2.2+i/10)%1);c.fillStyle=`rgba(200,170,130,${0.35*(1-p)})`;c.beginPath();c.arc(x-f*(1.4+p*2.6)*ppu,y-(0.1+p*0.5)*ppu+Math.sin(i*7)*0.1*ppu,(0.15+p*0.5)*ppu,0,TAU);c.fill();}
  const hn=`ho_${vw}_${mv?'g'+(Math.floor(t*10)%4):'stand'}`,cn=`co_${vw}_${o.door!=null?(o.door>0.7?'open':o.door>0.2?'half':'w0'):'w'+(mv?Math.floor(t*14)%4:0)}`;
  const hb=mv?Math.sin(t*20)*0.03*ppu:0;
  if(o.horses!==false&&vw==='side')spr(c,hn,x,y+hb,ppu,f);
  spr(c,cn,x,y+bob,ppu,f);
  if(o.horses!==false&&vw!=='side')spr(c,hn,x,y+hb,ppu,f);
  return {pt,door:{a:pt(-0.36,2.45,0.72),b:pt(0.36,1.05,0.72)},win:{a:pt(-0.23,2.32,0.76),b:pt(0.23,1.88,0.76)},step:pt(0,0.95,0.9)};}
// face in the coach window
function inWindow(c,w,t,o){const x0=Math.min(w.a.x,w.b.x),x1=Math.max(w.a.x,w.b.x),y0=Math.min(w.a.y,w.b.y),y1=Math.max(w.a.y,w.b.y),wd=x1-x0;
  c.save();c.beginPath();c.rect(x0,y0,wd,y1-y0);c.clip();c.fillStyle='#1a1418';c.fillRect(x0,y0,wd,y1-y0);
  NAP({c,x:(x0+x1)/2+(o.dx||0)*wd,y:y1+wd*1.45,s:wd/62,f:o.f||1,t,eyes:o.eyes||'wide',brow:o.brow||'worried',mouth:o.mouth||'o',hf:[10,92],hb:[-10,92]});
  const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(180,210,255,0.28)');g.addColorStop(0.4,'rgba(180,210,255,0.05)');g.addColorStop(1,'rgba(180,210,255,0.18)');c.fillStyle=g;c.fillRect(x0,y0,wd,y1-y0);c.restore();}
// steam puffs from a head
function steam(c,x,y,s,t){for(let i=0;i<8;i++){const p=((t*1.5+i/8)%1);for(const d of [-1,1]){c.fillStyle=`rgba(240,240,240,${0.6*(1-p)})`;c.beginPath();c.arc(x+d*(34+p*40)*s,y-p*80*s,(5+p*12)*s,0,TAU);c.fill();}}}
