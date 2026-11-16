'use strict';
// ===================== STYLE 4 · characters (A = 3D model, B = 2D cut-out) =====================
const OL='#151318';
const CAST={
  kenji:{skin:'#f6efe2',robe:'#e0368e',robe2:'#f07ab8',trim:'#f0c040',sash:null,pattern:'diamond',hair:'pomp',hairCol:'#17141a'},
  master:{skin:'#f4ece0',robe:'#2c3f8c',robe2:'#3c52a8',trim:'#7aa0e8',sash:'#e0702a',pattern:'none',hair:'cloud',hairCol:'#f2f0ec',band:1,beard:1,old:1},
};
// ---------- shared face drawing (used on the 2D head and on the 3D head texture) ----------
function drawFace(g,x,y,s,P,K){g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=OL;g.fillStyle=OL;const ex=44*s,ey=-6*s;
  const eyes=P.eyes||'dot',brow=P.brow||'flat',mouth=P.mouth||'flat';
  if(K.old){g.strokeStyle='rgba(120,90,70,0.55)';g.lineWidth=4*s;for(const k of [-1,0,1]){g.beginPath();g.moveTo(x-34*s,y-62*s+k*10*s);g.quadraticCurveTo(x,y-68*s+k*10*s,x+34*s,y-62*s+k*10*s);g.stroke();}
    for(const sd of [-1,1]){g.beginPath();g.moveTo(x+sd*70*s,y+10*s);g.quadraticCurveTo(x+sd*76*s,y+30*s,x+sd*64*s,y+48*s);g.stroke();}g.strokeStyle=OL;}
  if(P.blush!==0){g.fillStyle='rgba(240,120,140,0.42)';for(const sd of [-1,1]){g.beginPath();g.ellipse(x+sd*74*s,y+30*s,20*s,10*s,0,0,TAU);g.fill();}g.fillStyle=OL;}
  for(const sd of [-1,1]){const cx=x+sd*ex,cy=y+ey;g.lineWidth=7*s;
    if(eyes==='dot'){g.beginPath();g.ellipse(cx,cy,9*s,13*s,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,0.8)';g.beginPath();g.arc(cx-3*s,cy-5*s,2.6*s,0,TAU);g.fill();g.fillStyle=OL;}
    else if(eyes==='half'){g.save();g.beginPath();g.rect(cx-30*s,cy-2*s,60*s,40*s);g.clip();g.beginPath();g.ellipse(cx+sd*2*s,cy+4*s,10*s,12*s,0,0,TAU);g.fill();g.restore();g.lineWidth=8*s;g.beginPath();g.moveTo(cx-20*s,cy-3*s);g.lineTo(cx+20*s,cy-3*s);g.stroke();}
    else if(eyes==='wide'){g.fillStyle='#fff';g.beginPath();g.ellipse(cx,cy,25*s,27*s,0,0,TAU);g.fill();g.stroke();g.fillStyle=OL;g.beginPath();g.arc(cx+(P.look||0)*6*s,cy+2*s,8.5*s,0,TAU);g.fill();}
    else if(eyes==='happy'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy+8*s,15*s,Math.PI*1.12,Math.PI*1.88);g.stroke();}
    else if(eyes==='closed'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy-6*s,14*s,Math.PI*0.15,Math.PI*0.85);g.stroke();}
    else if(eyes==='squeeze'){g.lineWidth=8*s;g.beginPath();g.moveTo(cx-sd*14*s,cy-12*s);g.lineTo(cx+sd*10*s,cy);g.lineTo(cx-sd*14*s,cy+12*s);g.stroke();}
    // brows (thick, expressive)
    g.lineWidth=(brow==='angry'?13:10)*s;const by=cy-34*s;g.beginPath();
    if(brow==='flat'){g.moveTo(cx-16*s,by);g.lineTo(cx+16*s,by);}
    else if(brow==='angry'){g.moveTo(cx+sd*20*s,by-10*s);g.lineTo(cx-sd*16*s,by+8*s);}
    else if(brow==='up'){g.moveTo(cx-18*s,by-6*s);g.quadraticCurveTo(cx,by-20*s,cx+18*s,by-6*s);}
    else if(brow==='worried'){g.moveTo(cx-sd*16*s,by-10*s);g.lineTo(cx+sd*18*s,by+4*s);}
    else if(brow==='smug'){g.moveTo(cx-18*s,by+4*s);g.lineTo(cx+18*s,by+(sd>0?-4:4)*s);}
    if(brow!=='none')g.stroke();}
  const my=y+52*s;g.lineWidth=7*s;
  if(mouth==='flat'){g.beginPath();g.moveTo(x-16*s,my);g.lineTo(x+16*s,my);g.stroke();}
  else if(mouth==='smile'){g.beginPath();g.arc(x,my-14*s,22*s,0.25*Math.PI,0.75*Math.PI);g.stroke();}
  else if(mouth==='smirk'){g.beginPath();g.moveTo(x-16*s,my+2*s);g.quadraticCurveTo(x+6*s,my+8*s,x+20*s,my-6*s);g.stroke();}
  else if(mouth==='frown'){g.beginPath();g.arc(x,my+16*s,18*s,1.2*Math.PI,1.8*Math.PI);g.stroke();}
  else if(mouth==='o'){g.fillStyle='#5a1822';g.beginPath();g.ellipse(x,my,11*s,14*s,0,0,TAU);g.fill();g.stroke();}
  else if(mouth==='grin'||mouth==='shout'){const w=mouth==='shout'?34:30,h=mouth==='shout'?38:24;g.fillStyle='#5a1822';g.beginPath();g.moveTo(x-w*s,my-8*s);g.quadraticCurveTo(x,my-14*s,x+w*s,my-8*s);g.quadraticCurveTo(x+w*0.8*s,my+h*s,x,my+h*s);g.quadraticCurveTo(x-w*0.8*s,my+h*s,x-w*s,my-8*s);g.fill();
    g.save();g.clip();g.fillStyle='#fff';g.fillRect(x-w*s,my-16*s,2*w*s,13*s);g.fillStyle='#e85a6a';g.beginPath();g.ellipse(x,my+h*s,w*0.6*s,12*s,0,0,TAU);g.fill();g.restore();g.stroke();}
  else if(mouth==='teeth'){g.fillStyle='#fff';g.beginPath();g.roundRect(x-30*s,my-14*s,60*s,26*s,8*s);g.fill();g.stroke();g.lineWidth=4*s;for(const k of [-15,0,15]){g.beginPath();g.moveTo(x+k*s,my-14*s);g.lineTo(x+k*s,my+12*s);g.stroke();}g.beginPath();g.moveTo(x-30*s,my-1*s);g.lineTo(x+30*s,my-1*s);g.stroke();}
  if(P.sweat){g.fillStyle='#8fd0ff';g.lineWidth=4*s;const sx=x+88*s,sy=y-70*s;g.beginPath();g.moveTo(sx,sy-22*s);g.quadraticCurveTo(sx+16*s,sy+4*s,sx,sy+8*s);g.quadraticCurveTo(sx-16*s,sy+4*s,sx,sy-22*s);g.fill();g.stroke();}
  g.restore();}
// ---------- robe pattern ----------
function robeFill(g,K,x0,y0,w,h){g.fillStyle=K.robe;g.fillRect(x0,y0,w,h);if(K.pattern==='diamond'){g.fillStyle=K.robe2;for(let r=0;r<h/34;r++)for(let k=0;k<w/34+1;k++){const px=x0+k*34+(r%2)*17,py=y0+r*34;g.beginPath();g.moveTo(px,py-7);g.lineTo(px+6,py);g.lineTo(px,py+7);g.lineTo(px-6,py);g.fill();}}}
// ======================= B · 2D CUT-OUT =======================
const CH2D={};
function char2DCanvas(id){return CH2D[id]||(CH2D[id]={cv:mkCanvas(512,1024),tex:null});}
function drawChar2D(g,K,P,t){g.clearRect(0,0,512,1024);g.lineCap='round';g.lineJoin='round';const cx=256,bob=Math.sin(t*3.1+(P.ph||0))*5*(P.idle??1),foot=1000;
  const bTop=470+bob,bBot=748+bob,hy=bTop-92;
  // legs + feet
  const lp=P.walk?Math.sin(t*8):0;g.strokeStyle=OL;g.lineWidth=12;for(const sd of [-1,1]){const kx=cx+sd*44,ky=bBot-24;const fx=cx+sd*60+sd*lp*30*sd,fy=foot-14-(P.walk&&sd*lp>0?24*Math.abs(lp):0);g.beginPath();g.moveTo(kx,ky);g.quadraticCurveTo(kx+sd*6,(ky+fy)/2,fx,fy);g.stroke();
    g.fillStyle=OL;g.beginPath();g.ellipse(fx+sd*16,fy+6,28,13,0,0,TAU);g.fill();}
  // body (egg)
  const body=()=>{g.beginPath();g.moveTo(cx,bTop-6);g.bezierCurveTo(cx+86,bTop-6,cx+136,bTop+120,cx+132,bTop+190);g.bezierCurveTo(cx+128,bBot-8,cx+70,bBot+6,cx,bBot+6);g.bezierCurveTo(cx-70,bBot+6,cx-128,bBot-8,cx-132,bTop+190);g.bezierCurveTo(cx-136,bTop+120,cx-86,bTop-6,cx,bTop-6);g.closePath();};
  g.save();body();g.clip();robeFill(g,K,cx-150,bTop-20,300,bBot-bTop+40);
  if(K.sash){g.fillStyle=K.sash;g.fillRect(cx-150,bTop+178,300,30);g.fillStyle='rgba(0,0,0,0.18)';g.fillRect(cx-150,bTop+202,300,6);}
  g.strokeStyle=K.trim;g.lineWidth=9;g.beginPath();g.moveTo(cx-40,bTop);g.quadraticCurveTo(cx-6,bTop+70,cx+12,bTop+150);g.lineTo(cx+12,bBot+10);g.moveTo(cx+40,bTop);g.quadraticCurveTo(cx+20,bTop+80,cx+12,bTop+150);g.stroke();
  g.fillStyle='#f4f0e6';g.beginPath();g.moveTo(cx-26,bTop);g.quadraticCurveTo(cx,bTop+60,cx+12,bTop+126);g.quadraticCurveTo(cx+18,bTop+60,cx+28,bTop);g.fill();
  const sg=g.createLinearGradient(cx-130,0,cx+130,0);sg.addColorStop(0,'rgba(255,255,255,0.10)');sg.addColorStop(0.45,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,0,0,0.22)');g.fillStyle=sg;g.fillRect(cx-150,bTop-20,300,bBot-bTop+40);
  const vg=g.createLinearGradient(0,bTop,0,bBot);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,0.16)');g.fillStyle=vg;g.fillRect(cx-150,bTop,300,bBot-bTop+20);g.restore();
  g.strokeStyle=OL;g.lineWidth=10;body();g.stroke();
  // arms (thin lines, round hands); angle a: 0 = down, 90 = straight out, 160 = up
  const arm=(sd,A)=>{const a=(A?.a??12)*Math.PI/180,L=150;const sx=cx+sd*112,sy=bTop+120;const hx=sx+sd*Math.sin(a)*L,hy=sy+Math.cos(a)*L;const bx=(sx+hx)/2+sd*(A?.bend??18),by=(sy+hy)/2-(A?.bend??18)*0.3;
    g.strokeStyle=OL;g.lineWidth=11;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(bx,by,hx,hy);g.stroke();g.fillStyle=OL;g.beginPath();g.arc(hx,hy,15,0,TAU);g.fill();return [hx,hy];};
  const hr=arm(1,P.armR),hl=arm(-1,P.armL);
  if(P.prop==='katana')drawKatana2D(g,hr[0],hr[1],P.propAng??-1.2);
  // head
  const head=()=>{g.beginPath();g.ellipse(cx,hy,122,128,0,0,TAU);};
  if(K.hair==='cloud')cloudHair2D(g,cx,hy,'back');
  g.fillStyle=K.skin;head();g.fill();g.save();head();g.clip();const hg=g.createRadialGradient(cx-40,hy-50,20,cx,hy,140);hg.addColorStop(0,'rgba(255,255,255,0.25)');hg.addColorStop(0.7,'rgba(0,0,0,0)');hg.addColorStop(1,'rgba(90,50,40,0.18)');g.fillStyle=hg;g.fillRect(cx-140,hy-140,280,280);g.restore();
  g.strokeStyle=OL;g.lineWidth=10;head();g.stroke();
  if(P.back){if(K.hair==='cloud'){for(let r=0;r<4;r++)for(let k=0;k<5;k++){const x=cx-90+k*60+(r%2)*30,y=hy-70+r*55;if(((x-cx)/120)**2+((y-hy)/125)**2<1)puff(g,x,y,54);}}
    else{g.fillStyle='#18151b';g.save();head();g.clip();g.fillRect(cx-140,hy-140,280,215);g.restore();}}
  else{drawFace(g,cx,hy+14,1,P,K);
  if(K.beard)beard2D(g,cx,hy+92);}
  if(K.hair==='pomp')pomp2D(g,cx,hy);if(K.hair==='cloud'){cloudHair2D(g,cx,hy,'front');if(K.band)band2D(g,cx,hy);}}
function pomp2D(g,cx,hy){g.fillStyle='#18151b';g.strokeStyle=OL;g.lineWidth=10;g.beginPath();g.moveTo(cx-120,hy-30);g.bezierCurveTo(cx-130,hy-140,cx-20,hy-178,cx+60,hy-170);g.bezierCurveTo(cx+150,hy-166,cx+176,hy-110,cx+140,hy-70);g.bezierCurveTo(cx+128,hy-96,cx+100,hy-108,cx+60,hy-100);
  g.bezierCurveTo(cx+10,hy-92,cx-60,hy-96,cx-90,hy-70);g.quadraticCurveTo(cx-108,hy-50,cx-120,hy-30);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(255,255,255,0.55)';g.lineWidth=9;g.beginPath();g.moveTo(cx-60,hy-130);g.quadraticCurveTo(cx+10,hy-160,cx+90,hy-145);g.stroke();g.strokeStyle='rgba(255,255,255,0.25)';g.lineWidth=5;g.beginPath();g.moveTo(cx-80,hy-104);g.quadraticCurveTo(cx-20,hy-128,cx+40,hy-122);g.stroke();}
function puff(g,x,y,r){g.fillStyle='#f4f2ee';g.strokeStyle=OL;g.lineWidth=8;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(120,110,110,0.55)';g.lineWidth=4;g.beginPath();g.arc(x+r*0.1,y+r*0.15,r*0.45,Math.PI*1.1,Math.PI*2.2);g.stroke();}
function cloudHair2D(g,cx,hy,layer){const P=layer==='back'?[[-118,-40,44],[118,-40,44],[-100,-100,44],[100,-100,44],[-50,-132,46],[50,-132,46],[0,-140,44]]:[[-124,10,40],[124,10,40],[-128,-40,38],[128,-40,38]];for(const [dx,dy,r] of P)puff(g,cx+dx,hy+dy,r);}
function band2D(g,cx,hy){g.fillStyle='#f6f4ef';g.strokeStyle=OL;g.lineWidth=8;g.beginPath();g.moveTo(cx-118,hy-70);g.quadraticCurveTo(cx,hy-104,cx+118,hy-70);g.lineTo(cx+114,hy-40);g.quadraticCurveTo(cx,hy-74,cx-114,hy-40);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#5070b8';g.lineWidth=5;g.beginPath();g.moveTo(cx-110,hy-56);g.quadraticCurveTo(cx,hy-88,cx+110,hy-56);g.stroke();g.fillStyle='#f6f4ef';g.strokeStyle=OL;g.lineWidth=7;g.beginPath();g.ellipse(cx-120,hy-62,20,14,-0.5,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(cx-130,hy-60);g.lineTo(cx-176,hy-82);g.lineTo(cx-168,hy-48);g.closePath();g.fill();g.stroke();}
function beard2D(g,cx,y){for(const [dx,dy,r] of [[-30,0,28],[30,0,28],[0,14,32],[0,46,26]])puff(g,cx+dx,y+dy,r);}
function drawKatana2D(g,x,y,a){g.save();g.translate(x,y);g.rotate(a);g.lineCap='butt';g.fillStyle='#1a1a22';g.strokeStyle=OL;g.lineWidth=5;g.fillRect(-12,-70,24,90);g.strokeRect(-12,-70,24,90);g.fillStyle='#e0c060';g.beginPath();g.ellipse(0,-74,30,10,0,0,TAU);g.fill();g.stroke();
  const bg=g.createLinearGradient(-8,0,8,0);bg.addColorStop(0,'#c8d0dc');bg.addColorStop(0.5,'#ffffff');bg.addColorStop(1,'#8a96a6');g.fillStyle=bg;g.beginPath();g.moveTo(-9,-80);g.quadraticCurveTo(-14,-260,6,-400);g.lineTo(10,-380);g.quadraticCurveTo(4,-250,9,-80);g.closePath();g.fill();g.stroke();g.restore();}
// billboard draw for B (faces camera around Y, slight tilt toward a high camera; shadow quad faces the sun)
let QUAD=null;function quadMesh(){if(QUAD)return QUAD;const g=new Geo();const n=[0,0,1];g.quad(M4.id(),M4.id(),[1,1,1],[[-0.5,0,0],n,[0,1]],[[0.5,0,0],n,[1,1]],[[0.5,1,0],n,[1,0]],[[-0.5,1,0],n,[0,0]]);return QUAD=mesh(g);}
function addChar2D(R,id,K,pos,P,t,o={}){const c=char2DCanvas(id);drawChar2D(c.cv.getContext('2d'),K,P,t);c.tex=canvasTex(c.cv,{t:c.tex});const h=o.h||1.82,w=h*0.5;
  const cam=R.cam.eye,yaw=Math.atan2(cam[0]-pos[0],cam[2]-pos[2]);const dxz=Math.hypot(cam[0]-pos[0],cam[2]-pos[2]);const pitch=Math.atan2(cam[1]-pos[1]-0.9,dxz);
  const M=M4.chain(M4.T(pos[0],pos[1],pos[2]),M4.RY(yaw),M4.RX(-clamp(pitch,0,1.2)*0.75),M4.S(w,h,1));const sd=R.light.sunDir;const sy=Math.atan2(sd[0],sd[2]);
  R.draws.push({mesh:quadMesh(),M,shM:M4.chain(M4.T(pos[0],pos[1],pos[2]),M4.RY(sy+Math.PI/2*0),M4.S(w,h,1)),tex:c.tex,at:0.5,sprite:1,col:[1,1,1],cull:false,rim:0,shOff:w*0.55});}
let DISC=null;function contactShadow(R,pos,r){if(!DISC){const g=new Geo();const s=24;for(let i=0;i<s;i++){const a0=i/s*TAU,a1=(i+1)/s*TAU;g.tri(M4.id(),M4.id(),[1,1,1],[[0,0,0],[0,1,0],[0.5,0.5]],[[Math.sin(a1),0,-Math.cos(a1)],[0,1,0],[0.5,0.5]],[[Math.sin(a0),0,-Math.cos(a0)],[0,1,0],[0.5,0.5]]);}DISC=mesh(g);}
  if(!E.blobTex){const cv=mkCanvas(64,64),g=cv.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);E.blobTex=canvasTex(cv);}
  R.draws.push({mesh:DISC,M:M4.chain(M4.T(pos[0],pos[1]+0.012,pos[2]),M4.S(r,1,r*0.8)),col:[0.18,0.14,0.14],unlit:1,noShadow:1,at:0,cull:false,rim:0,dark:1});}
// ======================= A · 3D MODEL =======================
const MESH={};
const BODYPR=[[0,0.001],[0.006,0.25],[0.035,0.315],[0.1,0.31],[0.19,0.29],[0.27,0.258],[0.33,0.258],[0.41,0.284],[0.48,0.282],[0.54,0.258],[0.59,0.215],[0.625,0.15],[0.645,0.08],[0.652,0.001]];
function unitMeshes(){if(MESH.sph)return;let g;
  g=new Geo();G.sphere(g,M4.id(),[1,1,1],{su:40,sv:28});MESH.sph=mesh(g);
  g=new Geo();G.sphere(g,M4.id(),[1,1,1],{su:14,sv:10});MESH.sphLo=mesh(g);
  g=new Geo();G.cyl(g,M4.id(),[1,1,1],{seg:12});MESH.cyl=mesh(g);
  g=new Geo();G.lathe(g,M4.id(),[1,1,1],BODYPR.map(([y,r])=>[r,y]),{seg:48});MESH.egg=mesh(g);
  // sculpted 2.5D head: fuller cheeks, tapered jaw/chin, flatter face plane, slightly flat crown (keeps sphere UVs for the face texture)
  g=new Geo();const su=56,sv=40;const HP=(u,v)=>{const th=u*TAU,ph=v*Math.PI;let x=Math.sin(ph)*Math.sin(th),y=Math.cos(ph),z=-Math.sin(ph)*Math.cos(th);
      const ch=Math.exp(-(((y+0.25)/0.32)**2));x*=1+0.1*ch;z*=1+0.04*ch;const jaw=clamp((-y-0.45)/0.55,0,1);x*=1-0.28*jaw*jaw;z*=1-0.12*jaw;y-=0.06*jaw;
      if(z>0)z*=0.86+0.14*(1-Math.abs(x));if(y>0.6)y=0.6+(y-0.6)*0.7;return [x,y*0.97,z];};
    const HN=(u,v)=>{const e=1e-3;const a=HP(u,v),b=HP(u+e,v),c=HP(u,Math.min(v+e,1));let n=V.norm(V.cross(V.sub(c,a),V.sub(b,a)));if(!isFinite(n[0])||V.len(n)<0.5)n=V.norm(a);if(V.dot(n,a)<0)n=V.sc(n,-1);return n;};
    for(let i=0;i<su;i++)for(let k=0;k<sv;k++){const u0=i/su,u1=(i+1)/su,v0=k/sv,v1=(k+1)/sv;const vv=(u,v)=>[HP(u,v),HN(u,Math.min(Math.max(v,0.002),0.998)),[u,v]];g.quad(M4.id(),M4.id(),[1,1,1],vv(u0,v0),vv(u1,v0),vv(u1,v1),vv(u0,v1));}
  MESH.head=mesh(g);
  g=new Geo();G.cyl(g,M4.id(),[1,1,1],{seg:36,caps:0});MESH.band=mesh(g);
  g=new Geo();G.cyl(g,M4.id(),[1,1,1],{seg:20,caps:0,rb:0.06,rt:0.085});MESH.sleeve=mesh(g);}
const TEXC={};
function faceTex(K,P,key){const k=key+'|'+[P.eyes,P.brow,P.mouth,P.sweat,P.look].join(',');if(TEXC[k])return TEXC[k];const cv=mkCanvas(1024,512),g=cv.getContext('2d');g.fillStyle=K.skin;g.fillRect(0,0,1024,512);
  const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(120,70,60,0.10)');g.fillStyle=gr;g.fillRect(0,0,1024,512);
  g.save();g.translate(512,268);g.scale(1.25,1.25);drawFace(g,0,0,1,P,K);g.restore();return TEXC[k]=canvasTex(cv,{wrapS:E.gl.REPEAT});}
function robeTex(K,key){if(TEXC['r'+key])return TEXC['r'+key];const cv=mkCanvas(1024,512),g=cv.getContext('2d');robeFill(g,K,0,0,1024,512);
  if(K.sash){g.fillStyle=K.sash;g.fillRect(0,300,1024,46);g.fillStyle='rgba(0,0,0,0.2)';g.fillRect(0,338,1024,8);}
  g.strokeStyle=K.trim;g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(512-70,0);g.quadraticCurveTo(505,110,524,230);g.lineTo(524,512);g.moveTo(512+70,0);g.quadraticCurveTo(540,120,524,230);g.stroke();
  g.fillStyle='#f4f0e6';g.beginPath();g.moveTo(512-48,0);g.quadraticCurveTo(512,100,522,200);g.quadraticCurveTo(530,100,512+50,0);g.fill();
  g.strokeStyle='rgba(30,10,40,0.28)';g.lineWidth=5;g.lineCap='round';for(const [x0,sd] of [[300,-1],[380,-1],[680,1],[760,1],[120,1],[900,-1]]){g.beginPath();g.moveTo(x0,360);g.quadraticCurveTo(x0+sd*14,430,x0+sd*6,505);g.stroke();}
  g.strokeStyle='rgba(30,10,40,0.22)';g.lineWidth=4;for(const x0 of [440,610]){g.beginPath();g.moveTo(x0,40);g.quadraticCurveTo(x0+(x0<512?-18:18),120,x0+(x0<512?-6:6),200);g.stroke();}
  return TEXC['r'+key]=canvasTex(cv,{wrapS:E.gl.REPEAT});}
// pose → 3D parts
function addChar3D(R,id,K,pos,P,t,o={}){unitMeshes();const ry=o.ry||0,s=o.s||1;const bob=Math.sin(t*3.1+(P.ph||0))*0.012*(P.idle??1);
  const Mroot=M4.chain(M4.T(pos[0],pos[1],pos[2]),M4.RY(ry),M4.S(s,s,s));const W2=(p)=>M4.xp(Mroot,p);
  const BLACK=[0.09,0.08,0.1],OUT=7;const RC=C(K.robe),TR=C(K.trim);
  const push=(mesh,Ml,d)=>R.draws.push(Object.assign({mesh,M:M4.mul(Mroot,Ml),rim:0.5,toon:1},d));
  // legs
  const lp=P.walk?Math.sin(t*8):0;for(const sd of [-1,1]){const hip=[sd*0.1,0.66+bob,0],ft=[sd*0.14,0.06+(P.walk&&sd*lp>0?0.08*Math.abs(lp):0),sd*lp*0.16];push(MESH.cyl,M4.seg(hip,ft,0.028),{col:BLACK,spec:0.3,outline:4});
    push(MESH.sphLo,M4.chain(M4.T(ft[0]+sd*0.03,0.045,ft[2]+0.05),M4.RY(sd*0.3),M4.S(0.075,0.05,0.11)),{col:BLACK,spec:0.8,outline:4.5});}
  // body (egg) with robe texture
  push(MESH.egg,M4.chain(M4.T(0,0.55+bob,0),M4.S(1,1.02,0.86)),{col:[1,1,1],tex:robeTex(K,id),at:0,rim:0.45,outline:OUT});
  const egR=y=>{const pr=BODYPR;for(let i=1;i<pr.length;i++)if(y<=pr[i][0]){const f=(y-pr[i-1][0])/(pr[i][0]-pr[i-1][0]);return lerp(pr[i-1][1],pr[i][1],f);}return 0.05;};
  push(MESH.band,M4.chain(M4.T(0,0.55+bob+0.012,0),M4.S(egR(0.04)*1.02,0.045,egR(0.04)*0.88)),{col:TR,outline:4,cull:false,spec:0.3});
  const oy=0.55+bob+0.3,orr=egR(0.3)*1.03;const OB=K.sash?C(K.sash):C(K.trim).map(v=>v*0.55);
  push(MESH.band,M4.chain(M4.T(0,oy-0.03,0),M4.S(orr,0.1,orr*0.88)),{col:OB,outline:4,cull:false,spec:0.2});
  push(MESH.band,M4.chain(M4.T(0,oy+0.015,0),M4.S(orr*1.004,0.012,orr*0.884)),{col:[0.95,0.85,0.45],cull:false,spec:0.8});
  for(const sd of [-1,1])push(MESH.sph,M4.chain(M4.T(sd*0.075+0.12,oy+0.03,-orr*0.84),M4.RZ(sd*0.6),M4.S(0.075,0.045,0.03)),{col:OB,outline:4});
  push(MESH.sph,M4.chain(M4.T(0.12,oy+0.02,-orr*0.86),M4.S(0.03,0.035,0.03)),{col:OB,outline:4});
  for(const sd of [-1,1])push(MESH.cyl,M4.chain(M4.T(0.12+sd*0.03,oy-0.14,-orr*0.84),M4.RZ(sd*0.15),M4.S(0.022,0.16,0.012)),{col:OB,outline:4});
  push(MESH.band,M4.chain(M4.T(0,0.55+bob+0.6,0.0),M4.RX(0.1),M4.S(0.2,0.045,0.175)),{col:TR,outline:4,cull:false});
  // arms
  const hands=[];for(const sd of [-1,1]){const A=sd>0?P.armR:P.armL;const a=(A?.a??12)*Math.PI/180,f=A?.f??0.12;const sh=[sd*0.25,1.05+bob,0.0];const L=0.4;const hd=[sh[0]+sd*Math.sin(a)*L,sh[1]-Math.cos(a)*L,f*L];
    const el=[(sh[0]+hd[0])/2+sd*0.05,(sh[1]+hd[1])/2+0.02,(sh[2]+hd[2])/2+0.03];
    {const dir=V.norm(V.sub(el,sh)),s0=V.add(sh,V.sc(dir,-0.05)),s1=V.add(sh,V.sc(dir,0.13));push(MESH.sleeve,M4.seg(s0,s1,1),{col:RC.map(v=>v*1.04),outline:5,cull:false});push(MESH.band,M4.mul(M4.seg(V.add(s1,V.sc(dir,-0.022)),s1,1),M4.S(0.082,1,0.082)),{col:TR,outline:4,cull:false});}push(MESH.cyl,M4.seg(sh,el,0.024),{col:BLACK,outline:4});push(MESH.cyl,M4.seg(el,hd,0.024),{col:BLACK,outline:4});push(MESH.sphLo,M4.chain(M4.T(el[0],el[1],el[2]),M4.S(0.022)),{col:BLACK});
    push(MESH.sphLo,M4.chain(M4.T(hd[0],hd[1],hd[2]),M4.S(0.055)),{col:BLACK,spec:0.6,outline:4.5});hands.push(hd);}
  // head (face texture), sits on the body
  const hc=[0,1.5+bob,0],hr=0.345;const hM=M4.chain(M4.T(hc[0],hc[1],hc[2]),M4.RY(P.headTurn||0),M4.RZ(P.tilt||0),M4.S(hr,hr*1.02,hr));
  push(MESH.sph,hM,{col:[1,1,1],tex:faceTex(K,P,id),at:0,rim:0.5,outline:OUT,sss:0.05,tthr:-0.3,shTint:[0.86,0.74,0.82]});
  const HM=(Ml)=>M4.mul(hM,Ml);
  if(K.hair==='pomp'){const hcol=C(K.hairCol);push(MESH.sph,HM(M4.chain(M4.T(0,0.42,-0.1),M4.RX(-0.25),M4.S(1.06,0.62,1.02))),{col:hcol,spec:2.2,outline:OUT,rim:0.6});
    push(MESH.sph,HM(M4.chain(M4.T(0.18,0.78,0.5),M4.RZ(-0.35),M4.RX(0.5),M4.S(0.62,0.34,0.4))),{col:hcol,spec:2.2,outline:OUT,rim:0.6});}
  if(K.hair==='cloud'){const wc=[0.95,0.94,0.92];for(const [x,y,z,r] of [[-0.9,0.0,-0.15,0.36],[0.9,0.0,-0.15,0.36],[-0.82,0.42,-0.3,0.36],[0.82,0.42,-0.3,0.36],[-0.45,0.8,-0.35,0.38],[0.45,0.8,-0.35,0.38],[0,0.9,-0.45,0.4],[0,0.55,-0.85,0.42],[-0.6,-0.3,-0.4,0.3],[0.6,-0.3,-0.4,0.3]])push(MESH.sphLo,HM(M4.chain(M4.T(x,y,z),M4.S(r))),{col:wc,outline:OUT*0.75,rim:0.45,shTint:[0.66,0.68,0.9]});
    if(K.band)push(MESH.band,HM(M4.chain(M4.T(0,0.5,0),M4.RX(-0.12),M4.S(1.035,0.2,1.035))),{col:[0.96,0.95,0.92],outline:OUT*0.6,cull:false,shTint:[0.7,0.72,0.9]});}
  if(K.beard){const bc=[0.95,0.94,0.92],bo={col:bc,outline:OUT*0.6,shTint:[0.66,0.68,0.9]};push(MESH.sph,HM(M4.chain(M4.T(0,-0.8,0.62),M4.RX(0.3),M4.S(0.26,0.2,0.16))),bo);push(MESH.sph,HM(M4.chain(M4.T(0,-1.02,0.5),M4.RX(0.45),M4.S(0.13,0.2,0.1))),bo);}
  if(P.prop==='katana')katana3D(R,M4.mul(Mroot,M4.T(hands[1][0],hands[1][1],hands[1][2])),P.propAng3??0.35,P.propRoll);
  return {head:W2(hc)};}
function katanaMeshes(){if(MESH.blade)return;
  const g=new Geo(),N=36,Lb=0.92,sori=0.03;const sec=(sv)=>{const s=sv;let w=0.04*(1-0.2*s);if(s>0.9)w*=Math.sqrt(Math.max(0,(1-s)/0.1))*0.85+0.15*(1-s)/0.1;const t=0.0065*(1-0.35*s);
    const zc=sori*s*s;const hw=w*(0.3+0.07*Math.sin(s*46)+0.04*Math.sin(s*97));const zb=-w/2,ze=w/2,zs=zb+w*0.32,zh=ze-hw;const k=(zh-zs)/(ze-zs);
    return {y:s*Lb,zc,P:[[0,zb],[-t,zs],[-t*(1-k),zh],[0,ze],[t*(1-k),zh],[t,zs]]};};
  const cols=['#3e4656','#7d8aa0','#f6f9ff','#f6f9ff','#7d8aa0','#3e4656'];
  for(let i=0;i<N;i++){const A=sec(i/N),B=sec((i+1)/N);for(let k=0;k<6;k++){const k2=(k+1)%6;const p=(S,j)=>[S.P[j][0],S.y,S.P[j][1]+S.zc];
    const a=p(A,k),b=p(A,k2),c=p(B,k2),d=p(B,k);const mx=(A.P[k][0]+A.P[k2][0])/2,mz=(A.P[k][1]+A.P[k2][1])/2;const ex=A.P[k2][0]-A.P[k][0],ez=A.P[k2][1]-A.P[k][1];let n=[ez,0,-ex];if(n[0]*mx+n[2]*mz<0)n=[-ez,0,ex];n=V.norm(n);
    g.quad(M4.id(),M4.id(),C(cols[k]),[a,n],[b,n],[c,n],[d,n]);}}
  MESH.blade=mesh(g);
  const cv=mkCanvas(128,512),x=cv.getContext('2d');x.fillStyle='#ece6d4';x.fillRect(0,0,128,512);x.fillStyle='rgba(180,170,150,0.5)';for(let i=0;i<300;i++){x.beginPath();x.arc(hash(i)*128,hash(i*3)*512,1.6,0,TAU);x.fill();}
  x.strokeStyle='#1c1a2e';x.lineWidth=22;for(let k=-2;k<10;k++){x.beginPath();x.moveTo(0,k*64);x.lineTo(128,k*64+64);x.stroke();x.beginPath();x.moveTo(128,k*64);x.lineTo(0,k*64+64);x.stroke();}
  x.strokeStyle='rgba(255,255,255,0.18)';x.lineWidth=4;for(let k=-2;k<10;k++){x.beginPath();x.moveTo(0,k*64-6);x.lineTo(128,k*64+58);x.stroke();}
  E.itoTex=canvasTex(cv,{repeat:1});}
function katana3D(R,Mh,ang,roll){unitMeshes();katanaMeshes();const M=M4.chain(Mh,M4.RX(-ang),M4.RY(roll||0));const T=1,GOLD=[0.95,0.74,0.32],IRON=[0.16,0.15,0.17];
  const d=(mesh,Ml,o)=>R.draws.push(Object.assign({mesh,M:M4.mul(M,Ml),toon:T,rim:0.5},o));
  d(MESH.cyl,M4.chain(M4.T(0,-0.17,0),M4.S(0.021,0.27,0.027)),{col:[1,1,1],tex:E.itoTex,at:0,outline:4,spec:0.3});
  d(MESH.cyl,M4.chain(M4.T(0,-0.19,0),M4.S(0.024,0.025,0.03)),{col:IRON,spec:1.5,outline:4});
  d(MESH.sphLo,M4.chain(M4.T(0.021,-0.05,0),M4.S(0.006,0.02,0.01)),{col:GOLD,spec:2});
  d(MESH.cyl,M4.chain(M4.T(0,0.09,0),M4.S(0.025,0.012,0.031)),{col:GOLD,spec:2,outline:4});
  d(MESH.cyl,M4.chain(M4.T(0,0.102,0),M4.S(0.062,0.012,0.074)),{col:IRON,spec:1.2,outline:4});
  d(MESH.band,M4.chain(M4.T(0,0.102,0),M4.S(0.063,0.012,0.075)),{col:GOLD,spec:2,cull:false});
  d(MESH.cyl,M4.chain(M4.T(0,0.114,0),M4.S(0.009,0.03,0.02)),{col:GOLD,spec:2.5,outline:1.8});
  d(MESH.blade,M4.T(0,0.114,0),{col:[0.92,0.95,1.02],spec:4,rim:1.0,outline:4,shTint:[0.55,0.62,0.85],tthr:0.0,toon:0.55});}
