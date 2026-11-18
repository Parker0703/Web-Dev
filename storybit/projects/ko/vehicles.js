// ===== VEHICLE LIBRARY — side views authored in METRES, facing +x. m = px per metre (176*s matches fig2 scale s) =====
// shared: thick outline, layered paint shading (sky reflection top, base, shadow lower, bounce), glass reflections, detailed wheels
const VLW=0.034; // outline width in metres (~6px at s=1)
function vPaint(c,path,col,b,o={}){c.save();path();c.fillStyle=col;c.fill();c.clip();
  const g=c.createLinearGradient(0,b.y0,0,b.y1);g.addColorStop(0,'rgba(255,255,255,'+(o.top??0.32)+')');g.addColorStop(o.mid??0.38,'rgba(255,255,255,0.04)');g.addColorStop((o.mid??0.38)+0.04,'rgba(0,0,0,0.06)');g.addColorStop(0.86,'rgba(0,0,0,'+(o.low??0.3)+')');g.addColorStop(1,'rgba(40,40,70,0.18)');c.fillStyle=g;c.fillRect(b.x0-1,b.y0-1,b.x1-b.x0+2,b.y1-b.y0+2);
  const hx=c.createLinearGradient(b.x0,0,b.x1,0);hx.addColorStop(0,'rgba(0,0,0,0.18)');hx.addColorStop(0.35,'rgba(0,0,0,0)');hx.addColorStop(0.7,'rgba(255,255,255,0.06)');hx.addColorStop(1,'rgba(0,0,0,0.12)');c.fillStyle=hx;c.fillRect(b.x0-1,b.y0-1,b.x1-b.x0+2,b.y1-b.y0+2);
  c.restore();}
function vLine(c,pts,w,col){c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();}
function vGlass(c,path,b,o={}){c.save();path();const g=c.createLinearGradient(0,b.y0,0,b.y1);g.addColorStop(0,o.top||'#9fc4dc');g.addColorStop(0.45,o.mid||'#3c5a72');g.addColorStop(1,o.bot||'#1a2632');c.fillStyle=g;c.fill();c.clip();
  if(o.inside)o.inside();
  c.fillStyle='rgba(255,255,255,0.22)';const w=b.x1-b.x0,h=b.y1-b.y0;[[0.12,0.16],[0.34,0.06],[0.62,0.2]].forEach(([u,ww])=>{c.beginPath();c.moveTo(b.x0+w*u,b.y1+0.1);c.lineTo(b.x0+w*(u+ww),b.y1+0.1);c.lineTo(b.x0+w*(u+ww)+h*0.7,b.y0-0.1);c.lineTo(b.x0+w*u+h*0.7,b.y0-0.1);c.fill();});
  c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(b.x0,b.y0,w,h*0.07);c.restore();c.save();path();c.strokeStyle=K2;c.lineWidth=VLW*0.8;c.stroke();c.restore();}
function vWheel(c,x,y,r,o={}){c.save();c.translate(x,y);const sp=(o.rot||0);
  c.fillStyle='#141418';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
  const g=c.createRadialGradient(-r*0.3,-r*0.35,r*0.1,0,0,r);g.addColorStop(0,'#3a3a42');g.addColorStop(0.7,'#1c1c22');g.addColorStop(1,'#0c0c0e');c.fillStyle=g;c.beginPath();c.arc(0,0,r*0.96,0,TAU);c.fill();
  c.strokeStyle='rgba(255,255,255,0.08)';c.lineWidth=r*0.03;c.beginPath();c.arc(0,0,r*0.84,0,TAU);c.stroke(); // sidewall bead
  c.strokeStyle='rgba(255,255,255,0.16)';c.lineWidth=r*0.05;c.beginPath();c.arc(0,0,r*0.9,Math.PI*1.1,Math.PI*1.55);c.stroke(); // sidewall sheen
  const rr2=r*(o.rim??0.62);const rg=c.createLinearGradient(0,-rr2,0,rr2);rg.addColorStop(0,o.rimTop||'#e8ecf0');rg.addColorStop(0.5,o.rimCol||'#9aa2ac');rg.addColorStop(1,'#4a5058');c.fillStyle=rg;c.beginPath();c.arc(0,0,rr2,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();
  if(o.steel){c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.arc(0,0,rr2*0.78,0,TAU);c.fill();c.fillStyle=rg;c.beginPath();c.arc(0,0,rr2*0.7,0,TAU);c.fill();for(let i=0;i<8;i++){const a=sp+i*TAU/8;c.fillStyle='#2a2e34';c.beginPath();c.arc(Math.cos(a)*rr2*0.5,Math.sin(a)*rr2*0.5,rr2*0.08,0,TAU);c.fill();}}
  else{c.fillStyle='#2a2e36';c.beginPath();c.arc(0,0,rr2*0.86,0,TAU);c.fill();const n=o.spokes||5;for(let i=0;i<n;i++){const a=sp+i*TAU/n;c.save();c.rotate(a);const sg=c.createLinearGradient(0,-rr2*0.1,0,rr2*0.1);sg.addColorStop(0,'#f2f4f6');sg.addColorStop(1,'#7a828c');c.fillStyle=sg;c.beginPath();c.moveTo(rr2*0.2,-rr2*0.12);c.lineTo(rr2*0.86,-rr2*0.2);c.lineTo(rr2*0.86,rr2*0.2);c.lineTo(rr2*0.2,rr2*0.12);c.closePath();c.fill();c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=VLW*0.25;c.stroke();c.restore();}
    c.strokeStyle=rg;c.lineWidth=rr2*0.12;c.beginPath();c.arc(0,0,rr2*0.9,0,TAU);c.stroke();}
  // brake disc glimpse + hub + lug nuts
  c.fillStyle='#c8ccd2';c.beginPath();c.arc(0,0,rr2*0.26,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.35;c.stroke();for(let i=0;i<5;i++){const a=sp+i*TAU/5+0.6;c.fillStyle='#50565e';c.beginPath();c.arc(Math.cos(a)*rr2*0.16,Math.sin(a)*rr2*0.16,rr2*0.035,0,TAU);c.fill();}
  c.fillStyle='rgba(255,255,255,0.5)';c.beginPath();c.arc(-rr2*0.07,-rr2*0.08,rr2*0.07,0,TAU);c.fill();
  c.strokeStyle=K2;c.lineWidth=VLW;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();c.restore();}
function vWell(c,x,y,r){c.fillStyle='#0a0a0c';c.beginPath();c.arc(x,y,r,Math.PI,TAU);c.lineTo(x+r,y+0.05);c.lineTo(x-r,y+0.05);c.fill();}
function vShadow(c,x0,x1,y,h=0.12){const g=c.createRadialGradient((x0+x1)/2,y,0,(x0+x1)/2,y,(x1-x0)/2);g.addColorStop(0,'rgba(0,0,0,0.5)');g.addColorStop(0.75,'rgba(0,0,0,0.25)');g.addColorStop(1,'rgba(0,0,0,0)');c.save();c.scale(1,h/((x1-x0)/2));c.fillStyle=g;c.beginPath();c.arc((x0+x1)/2,y*((x1-x0)/2)/h,(x1-x0)/2,0,TAU);c.fill();c.restore();}
function vLamp(c,path,col,glow){c.save();path();c.fillStyle=col;c.fill();c.clip();c.fillStyle='rgba(255,255,255,0.55)';path();c.globalCompositeOperation='source-atop';c.restore();c.save();path();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();c.restore();
  if(glow){c.save();path();c.shadowColor=glow;c.shadowBlur=0.4*40;c.fillStyle=glow;c.globalAlpha=0.35;c.fill();c.restore();}}
function vBegin(c,x,y,m,f){c.save();c.translate(x,y);c.scale(m*(f||1),m);c.lineJoin='round';c.lineCap='round';}

// ---------- SEDAN (4.7 m) ----------
function car(c,x,y,m,o={}){const col=o.col||'#a8323a',f=o.f||1,rot=(o.roll||0);vBegin(c,x,y,m,f);
  vShadow(c,-2.5,2.5,0,0.14);
  const WF=1.42,WR=-1.42,Rw=0.34,AR=0.43;vWell(c,WF,-Rw,AR);vWell(c,WR,-Rw,AR);
  const body=()=>{c.beginPath();c.moveTo(-2.32,-0.3);c.lineTo(WR-AR-0.02,-0.3);c.arc(WR,-Rw,AR,Math.PI,TAU);c.lineTo(WF-AR,-0.3);c.arc(WF,-Rw,AR,Math.PI,TAU);c.lineTo(2.3,-0.3);
    c.bezierCurveTo(2.38,-0.42,2.4,-0.6,2.34,-0.7);c.bezierCurveTo(2.25,-0.8,1.9,-0.86,1.0,-0.93);c.bezierCurveTo(0.75,-1.05,0.45,-1.32,0.25,-1.4);c.bezierCurveTo(0.0,-1.47,-0.75,-1.47,-1.0,-1.42);
    c.bezierCurveTo(-1.3,-1.33,-1.6,-1.08,-1.85,-0.98);c.bezierCurveTo(-2.1,-0.96,-2.3,-0.95,-2.36,-0.85);c.bezierCurveTo(-2.42,-0.7,-2.42,-0.45,-2.32,-0.3);c.closePath();};
  vPaint(c,body,col,{x0:-2.4,x1:2.4,y0:-1.47,y1:-0.3},{top:0.3,mid:0.42,low:0.34});
  // greenhouse
  const gl=()=>{c.beginPath();c.moveTo(0.88,-0.97);c.bezierCurveTo(0.68,-1.08,0.42,-1.3,0.22,-1.35);c.bezierCurveTo(-0.1,-1.4,-0.72,-1.4,-0.95,-1.36);c.bezierCurveTo(-1.25,-1.27,-1.5,-1.08,-1.66,-0.99);c.closePath();};
  vGlass(c,gl,{x0:-1.66,x1:0.88,y0:-1.4,y1:-0.97},{inside:o.inside});
  c.fillStyle=shd2(col,-0.55);c.beginPath();c.moveTo(-0.22,-1.39);c.lineTo(-0.12,-1.39);c.lineTo(-0.12,-0.97);c.lineTo(-0.24,-0.97);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke(); // B pillar
  c.fillStyle='#16181c';c.fillRect(-1.68,-1.0,2.58,0.05); // window trim
  // shoulder crease: highlight above, shadow below
  vLine(c,[[2.25,-0.74],[0.9,-0.84],[-1.0,-0.86],[-2.3,-0.84]],0.05,'rgba(255,255,255,0.35)');vLine(c,[[2.25,-0.7],[0.9,-0.8],[-1.0,-0.82],[-2.3,-0.8]],0.025,'rgba(0,0,0,0.35)');
  // lower body crease + rocker
  vLine(c,[[WF-AR-0.05,-0.42],[WR+AR+0.05,-0.42]],0.03,'rgba(0,0,0,0.3)');c.fillStyle='rgba(10,10,14,0.55)';c.beginPath();c.moveTo(WR+AR+0.02,-0.3);c.lineTo(WF-AR-0.02,-0.3);c.lineTo(WF-AR-0.04,-0.36);c.lineTo(WR+AR+0.04,-0.36);c.fill();
  // door shut lines
  c.strokeStyle='rgba(0,0,0,0.55)';c.lineWidth=0.018;c.beginPath();c.moveTo(0.92,-0.95);c.bezierCurveTo(0.97,-0.7,0.95,-0.45,0.9,-0.33);c.moveTo(-0.18,-0.96);c.lineTo(-0.16,-0.32);c.moveTo(-1.6,-0.97);c.bezierCurveTo(-1.45,-0.8,-1.0,-0.7,-0.98,-0.33);c.stroke();
  // handles
  [[0.58,-0.86],[-0.5,-0.86]].forEach(([hx,hy])=>{c.fillStyle='#d8dce2';rr(c,hx-0.13,hy-0.025,0.24,0.05,0.025);c.fill();c.strokeStyle=K2;c.lineWidth=0.012;c.stroke();c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(hx-0.11,hy+0.03,0.2,0.015);});
  // mirror
  c.fillStyle=col;c.beginPath();c.moveTo(0.72,-1.0);c.lineTo(0.95,-1.0);c.bezierCurveTo(1.02,-1.02,1.02,-1.14,0.92,-1.15);c.lineTo(0.78,-1.14);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0.8,-1.13,0.12,0.02);
  // headlight + DRL, taillight
  vLamp(c,()=>{c.beginPath();c.moveTo(2.36,-0.68);c.bezierCurveTo(2.2,-0.74,2.0,-0.76,1.86,-0.76);c.lineTo(1.92,-0.68);c.bezierCurveTo(2.1,-0.66,2.25,-0.62,2.38,-0.6);c.closePath();},o.lights?'#fff8d8':'#e4ecf2',o.lights?'#fff0b0':0);
  vLine(c,[[1.95,-0.7],[2.3,-0.65]],0.015,'rgba(255,255,255,0.9)');
  vLamp(c,()=>{c.beginPath();c.moveTo(-2.38,-0.86);c.lineTo(-2.08,-0.92);c.lineTo(-2.06,-0.82);c.lineTo(-2.4,-0.76);c.closePath();},o.brake?'#ff3030':'#b0202a',o.brake?'#ff2020':0);
  // bumpers / grille / fuel cap / antenna
  c.fillStyle='#1c1e22';c.beginPath();c.moveTo(2.3,-0.3);c.bezierCurveTo(2.38,-0.38,2.4,-0.46,2.39,-0.5);c.lineTo(2.2,-0.5);c.lineTo(2.18,-0.3);c.fill();c.fillStyle='#1c1e22';c.beginPath();c.moveTo(-2.32,-0.3);c.bezierCurveTo(-2.4,-0.36,-2.41,-0.44,-2.4,-0.48);c.lineTo(-2.18,-0.48);c.lineTo(-2.16,-0.3);c.fill();
  c.strokeStyle='rgba(0,0,0,0.45)';c.lineWidth=0.014;c.beginPath();c.arc(-1.75,-0.82,0.07,0,TAU);c.stroke();
  // wheel-arch inner shadow on paint
  [WF,WR].forEach(wx=>{c.save();body();c.clip();c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=0.06;c.beginPath();c.arc(wx,-Rw,AR+0.03,Math.PI,TAU);c.stroke();c.restore();});
  // rim light along roof + outline
  c.save();body();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  vLine(c,[[0.3,-1.38],[-0.2,-1.43],[-0.95,-1.39]],0.022,'rgba(255,230,200,0.6)');vLine(c,[[2.2,-0.79],[1.2,-0.89]],0.02,'rgba(255,255,255,0.5)');
  vWheel(c,WF,-Rw,Rw,{rot:rot});vWheel(c,WR,-Rw,Rw,{rot:rot});
  c.restore();}

// ---------- PANEL VAN (5.2 m) ----------
function van(c,x,y,m,o={}){const col=o.col||'#e8e6e0',f=o.f||1,rot=o.roll||0;vBegin(c,x,y,m,f);vShadow(c,-2.7,2.7,0,0.15);
  const WF=1.75,WR=-1.65,Rw=0.36,AR=0.45;vWell(c,WF,-Rw,AR);vWell(c,WR,-Rw,AR);
  const body=()=>{c.beginPath();c.moveTo(-2.6,-0.32);c.lineTo(WR-AR,-0.32);c.arc(WR,-Rw,AR,Math.PI,TAU);c.lineTo(WF-AR,-0.32);c.arc(WF,-Rw,AR,Math.PI,TAU);c.lineTo(2.55,-0.32);
    c.bezierCurveTo(2.64,-0.45,2.66,-0.75,2.6,-0.85);c.bezierCurveTo(2.5,-0.95,2.3,-1.0,1.95,-1.05);c.bezierCurveTo(1.75,-1.35,1.55,-1.75,1.35,-2.0);c.bezierCurveTo(1.25,-2.08,1.1,-2.1,0.9,-2.1);
    c.lineTo(-2.45,-2.1);c.quadraticCurveTo(-2.62,-2.1,-2.63,-1.95);c.lineTo(-2.64,-0.45);c.quadraticCurveTo(-2.64,-0.32,-2.6,-0.32);c.closePath();};
  vPaint(c,body,col,{x0:-2.65,x1:2.66,y0:-2.1,y1:-0.32},{top:0.25,mid:0.3,low:0.32});
  // livery stripe
  if(o.stripe!==0){c.save();body();c.clip();c.fillStyle=o.stripe||'#2a5a9a';c.fillRect(-2.7,-1.12,5.4,0.12);c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(-2.7,-1.12,5.4,0.025);c.restore();}
  // cab glass + side windows
  vGlass(c,()=>{c.beginPath();c.moveTo(1.9,-1.1);c.bezierCurveTo(1.72,-1.4,1.55,-1.72,1.35,-1.92);c.lineTo(0.8,-1.92);c.lineTo(0.8,-1.15);c.closePath();},{x0:0.8,x1:1.9,y0:-1.92,y1:-1.1},{inside:o.inside});
  vGlass(c,()=>{c.beginPath();rr(c,-0.6,-1.9,1.15,0.62,0.06);},{x0:-0.6,x1:0.55,y0:-1.9,y1:-1.28});
  vGlass(c,()=>{c.beginPath();rr(c,-2.5,-1.9,0.55,0.62,0.06);},{x0:-2.5,x1:-1.95,y0:-1.9,y1:-1.28});
  // door seams, sliding door track, handles, step
  c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=0.018;c.beginPath();c.moveTo(0.74,-1.95);c.lineTo(0.74,-0.36);c.moveTo(0.62,-2.0);c.lineTo(0.62,-0.36);c.moveTo(-0.72,-2.0);c.lineTo(-0.72,-0.36);c.moveTo(-2.3,-2.02);c.lineTo(-2.3,-0.4);c.stroke();
  c.fillStyle='#2a2c30';c.fillRect(-0.72,-1.98,1.34,0.03);vLine(c,[[-2.6,-1.98],[-0.72,-1.98]],0.02,'rgba(0,0,0,0.4)');
  [[0.95,-1.04],[0.45,-1.0]].forEach(([hx,hy])=>{c.fillStyle='#1a1c20';rr(c,hx-0.1,hy-0.025,0.2,0.05,0.02);c.fill();});
  c.fillStyle='#1c1e22';c.fillRect(-0.7,-0.4,1.3,0.08);
  // ribbed panel highlights
  for(let i=0;i<3;i++){vLine(c,[[-2.2,-0.6-i*0.18],[-0.8,-0.6-i*0.18]],0.012,'rgba(0,0,0,0.12)');}
  // mirror on arm
  c.strokeStyle=K2;c.lineWidth=0.03;c.beginPath();c.moveTo(1.8,-1.25);c.lineTo(2.02,-1.32);c.stroke();c.fillStyle='#1c1e22';rr(c,1.98,-1.55,0.1,0.3,0.03);c.fill();
  vLamp(c,()=>{c.beginPath();c.moveTo(2.6,-0.85);c.lineTo(2.35,-0.92);c.lineTo(2.33,-0.78);c.lineTo(2.62,-0.72);c.closePath();},o.lights?'#fff8d8':'#e4ecf2',o.lights?'#fff0b0':0);
  vLamp(c,()=>{c.beginPath();rr(c,-2.66,-1.2,0.08,0.4,0.03);},'#b0202a',0);
  c.fillStyle='#1c1e22';c.fillRect(2.4,-0.6,0.2,0.28);c.fillRect(-2.66,-0.55,0.18,0.23);
  c.save();body();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();vLine(c,[[0.9,-2.08],[-2.4,-2.08]],0.02,'rgba(255,240,220,0.7)');
  vWheel(c,WF,-Rw,Rw,{rot,steel:1});vWheel(c,WR,-Rw,Rw,{rot,steel:1});c.restore();}

// ---------- CITY BUS (11.5 m) ----------
function bus(c,x,y,m,o={}){const col=o.col||'#e0b030',f=o.f||1,rot=o.roll||0;vBegin(c,x,y,m,f);vShadow(c,-6,6,0,0.2);
  const WF=4.0,WR=-3.2,Rw=0.5,AR=0.62;vWell(c,WF,-Rw,AR);vWell(c,WR,-Rw,AR);
  const body=()=>{c.beginPath();c.moveTo(-5.7,-0.35);c.lineTo(WR-AR,-0.35);c.arc(WR,-Rw,AR,Math.PI,TAU);c.lineTo(WF-AR,-0.35);c.arc(WF,-Rw,AR,Math.PI,TAU);c.lineTo(5.65,-0.35);c.quadraticCurveTo(5.78,-0.35,5.78,-0.6);
    c.lineTo(5.8,-2.6);c.quadraticCurveTo(5.78,-3.0,5.45,-3.05);c.lineTo(-5.45,-3.05);c.quadraticCurveTo(-5.75,-3.03,-5.76,-2.75);c.lineTo(-5.78,-0.6);c.quadraticCurveTo(-5.78,-0.35,-5.7,-0.35);c.closePath();};
  vPaint(c,body,col,{x0:-5.8,x1:5.8,y0:-3.05,y1:-0.35},{top:0.22,mid:0.25,low:0.3});
  c.save();body();c.clip();c.fillStyle=o.skirt||'#2a3440';c.fillRect(-6,-1.0,12,0.66);c.fillStyle=o.band||'#c03028';c.fillRect(-6,-1.12,12,0.1);c.fillStyle='rgba(255,255,255,0.3)';c.fillRect(-6,-1.12,12,0.02);c.restore();
  // window band (black glass band) with frames + passengers
  const wy0=-2.62,wy1=-1.62;c.fillStyle='#14181e';rr(c,-5.55,wy0-0.05,9.6,wy1-wy0+0.1,0.08);c.fill();
  for(let i=0;i<6;i++){const x0=-5.45+i*1.58;vGlass(c,()=>{c.beginPath();rr(c,x0,wy0,1.46,wy1-wy0,0.07);},{x0,x1:x0+1.46,y0:wy0,y1:wy1},{top:'#8ab4cc',mid:'#36506a',bot:'#18222c',inside:o.pax?()=>{for(let k=0;k<2;k++){const px=x0+0.35+k*0.75,ph=(i*7+k*3)%5;c.fillStyle='rgba(10,14,20,0.55)';c.beginPath();c.arc(px,wy1-0.48-ph*0.02,0.17,0,TAU);c.fill();c.fillRect(px-0.22,wy1-0.32,0.44,0.4);}}:null});
    c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(x0+0.05,wy0+0.42,1.36,0.025);}
  // front door (glass panels) + mid door
  const door=(dx)=>{c.fillStyle='#20262e';rr(c,dx,-2.72,1.2,2.3,0.05);c.fill();for(let k=0;k<2;k++)vGlass(c,()=>{c.beginPath();rr(c,dx+0.07+k*0.56,-2.62,0.5,2.12,0.04);},{x0:dx+0.07+k*0.56,x1:dx+0.57+k*0.56,y0:-2.62,y1:-0.5});
    c.fillStyle='#c8ccd2';c.fillRect(dx+0.58,-2.65,0.04,2.2);c.strokeStyle=K2;c.lineWidth=VLW*0.6;rr(c,dx,-2.72,1.2,2.3,0.05);c.stroke();};
  door(4.4);door(-0.3);
  // windscreen at front (side sliver) + destination sign
  vGlass(c,()=>{c.beginPath();c.moveTo(5.62,-2.72);c.lineTo(5.78,-2.6);c.lineTo(5.8,-1.25);c.lineTo(5.62,-1.25);c.closePath();},{x0:5.62,x1:5.8,y0:-2.72,y1:-1.25});
  c.fillStyle='#0c0c0e';rr(c,4.4,-2.98,1.25,0.22,0.04);c.fill();c.fillStyle='#ffa630';for(let i=0;i<9;i++)c.fillRect(4.5+i*0.12,-2.92,0.07,0.1);
  // roof AC pod
  c.fillStyle=shd2(col,-0.05);rr(c,-2.0,-3.32,3.2,0.3,0.12);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.8;c.stroke();for(let i=0;i<7;i++){c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-1.8+i*0.42,-3.24,0.26,0.05);}
  // panel seams, rivets, vent grille rear, fuel flap
  c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=0.02;for(const sx of [-2.35,1.0,3.3]){c.beginPath();c.moveTo(sx,-1.55);c.lineTo(sx,-0.4);c.stroke();}
  c.fillStyle='#1a1e24';rr(c,-5.5,-1.5,0.9,0.36,0.04);c.fill();for(let i=0;i<5;i++){c.fillStyle='rgba(255,255,255,0.15)';c.fillRect(-5.45,-1.45+i*0.065,0.8,0.02);}
  // mirror arm front
  c.strokeStyle=K2;c.lineWidth=0.04;c.beginPath();c.moveTo(5.75,-2.4);c.quadraticCurveTo(6.1,-2.6,6.05,-2.25);c.stroke();c.fillStyle='#1c1e22';rr(c,5.98,-2.3,0.12,0.45,0.04);c.fill();
  vLamp(c,()=>{c.beginPath();rr(c,5.62,-0.95,0.18,0.22,0.04);},o.lights?'#fff8d8':'#e4ecf2',o.lights?'#fff0b0':0);
  vLamp(c,()=>{c.beginPath();rr(c,-5.8,-1.05,0.1,0.4,0.03);},'#b0202a',0);
  c.fillStyle='#16181c';c.fillRect(5.6,-0.6,0.22,0.25);c.fillRect(-5.82,-0.6,0.2,0.25);
  c.save();body();c.strokeStyle=K2;c.lineWidth=VLW*1.2;c.stroke();c.restore();vLine(c,[[5.3,-3.02],[-5.3,-3.02]],0.03,'rgba(255,240,210,0.7)');
  vWheel(c,WF,-Rw,Rw,{rot,steel:1,rim:0.55});vWheel(c,WR,-Rw,Rw,{rot,steel:1,rim:0.55});c.restore();}

// ---------- WOODEN ROWBOAT (4.2 m), lapstrake planking. y = waterline. part:'back' (interior, draw before riders) | 'front' ----------
function rowboat2(c,x,y,m,part,o={}){const f=o.f||1,wood=o.wood||'#8a5a32',paint=o.paint||null;vBegin(c,x,y,m,f);
  const sheer=u=>{const xx=-2.0+u*4.15;const yy=-0.55-0.28*Math.pow(Math.abs(u-0.45)/0.55,2.2)-(u>0.9?(u-0.9)*1.6:0);return [xx,yy];};
  const keel=u=>{const xx=-1.86+u*3.86;const yy=0.32-0.36*Math.pow(Math.abs(u-0.42)/0.58,2.0);return [xx,Math.min(yy,0.32)];};
  const hull=()=>{c.beginPath();for(let i=0;i<=30;i++){const [a,b]=sheer(i/30);i?c.lineTo(a,b):c.moveTo(a,b);}c.lineTo(2.1,-0.55);c.bezierCurveTo(2.0,-0.2,1.95,0.0,1.95,0.05);for(let i=30;i>=0;i--){const [a,b]=keel(i/30);c.lineTo(a,b);}c.lineTo(-2.0,-0.18);c.closePath();};
  if(part==='back'){ // far-side interior: inner planks + ribs + thwarts seen above near gunwale
    c.fillStyle=shd2(wood,-0.45);c.beginPath();for(let i=0;i<=30;i++){const [a,b]=sheer(i/30);i?c.lineTo(a,b-0.16+0.05*Math.sin(i/30*Math.PI)):c.moveTo(a,b-0.16);}for(let i=30;i>=0;i--){const [a,b]=sheer(i/30);c.lineTo(a,b+0.02);}c.fill();
    c.strokeStyle=shd2(wood,-0.6);c.lineWidth=0.02;for(let i=1;i<10;i++){const [a,b]=sheer(i/10);c.beginPath();c.moveTo(a,b-0.15);c.lineTo(a,b);c.stroke();}
    c.fillStyle=shd2(wood,0.1);c.strokeStyle=K2;c.lineWidth=VLW*0.7;[[0.3,0.12],[0.62,0.1]].forEach(([u,w])=>{const [a,b]=sheer(u);c.beginPath();c.rect(a-w*2,b-0.13,w*4,0.08);c.fill();c.stroke();});
    c.restore();return;}
  // water-dark under the hull
  vPaint(c,hull,paint||wood,{x0:-2.1,x1:2.15,y0:-0.85,y1:0.32},{top:0.18,mid:0.3,low:0.4});
  // lapstrake planks: 4 strakes, each with a shadow lap line + highlight edge + grain
  c.save();hull();c.clip();for(let k=1;k<=4;k++){const t=k/5;c.beginPath();for(let i=0;i<=30;i++){const u=i/30,[a1,b1]=sheer(u),[a2,b2]=keel(Math.min(1,Math.max(0,(a1+1.86)/3.86)));const yy=b1+(Math.max(b2,b1)-b1)*t;i?c.lineTo(a1,yy):c.moveTo(a1,yy);}
    c.strokeStyle='rgba(0,0,0,0.45)';c.lineWidth=0.03;c.stroke();c.save();c.translate(0,0.025);c.strokeStyle='rgba(255,230,190,0.22)';c.lineWidth=0.015;c.stroke();c.restore();}
  for(let i=0;i<26;i++){const u=(i*0.37)%1,[a,b]=sheer(u);c.strokeStyle='rgba(40,20,10,0.18)';c.lineWidth=0.008;c.beginPath();c.moveTo(a,b+0.08+(i%5)*0.07);c.lineTo(a+0.35,b+0.085+(i%5)*0.07);c.stroke();}
  // waterline: submerged part tinted
  c.fillStyle=o.water||'rgba(20,50,70,0.55)';c.fillRect(-2.3,0,4.6,0.5);c.restore();
  // gunwale rail + stem + transom
  c.save();c.lineWidth=0.09;c.strokeStyle=shd2(wood,0.18);c.beginPath();for(let i=0;i<=30;i++){const [a,b]=sheer(i/30);i?c.lineTo(a,b+0.02):c.moveTo(a,b+0.02);}c.stroke();
  c.lineWidth=0.025;c.strokeStyle='rgba(255,235,200,0.5)';c.beginPath();for(let i=0;i<=30;i++){const [a,b]=sheer(i/30);i?c.lineTo(a,b-0.01):c.moveTo(a,b-0.01);}c.stroke();c.restore();
  c.fillStyle=shd2(wood,-0.25);c.beginPath();c.moveTo(-2.0,-0.58);c.lineTo(-2.08,-0.6);c.lineTo(-2.06,-0.16);c.lineTo(-1.98,-0.18);c.fill();
  c.strokeStyle=shd2(wood,-0.3);c.lineWidth=0.06;c.beginPath();c.moveTo(2.12,-0.6);c.bezierCurveTo(2.02,-0.2,1.98,0.0,1.95,0.06);c.stroke();
  c.save();hull();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  // oarlocks + oars
  if(o.oars!==0){const ph=o.ph||0,sw=Math.sin(ph)*0.35;[[0.15]].forEach(([u])=>{const [a,b]=sheer(u+0.3);c.strokeStyle='#5a5e66';c.lineWidth=0.035;c.beginPath();c.moveTo(a-0.06,b-0.1);c.quadraticCurveTo(a,b+0.02,a+0.06,b-0.1);c.stroke();
    const bx=a+sw*1.4-0.9,by=0.08;c.strokeStyle=K2;c.lineWidth=0.075;c.beginPath();c.moveTo(a+0.5-sw*0.3,b-0.35);c.lineTo(bx,by);c.stroke();c.strokeStyle=shd2(wood,0.25);c.lineWidth=0.045;c.beginPath();c.moveTo(a+0.5-sw*0.3,b-0.35);c.lineTo(bx,by);c.stroke();
    c.save();c.translate(bx,by);c.rotate(Math.atan2(by-(b-0.35),bx-(a+0.5-sw*0.3)));c.fillStyle=shd2(wood,0.15);c.strokeStyle=K2;c.lineWidth=VLW*0.7;c.beginPath();c.ellipse(0.12,0,0.3,0.075,0,0,TAU);c.fill();c.stroke();c.restore();});}
  c.restore();}
// water surface strip with ripples/reflection for boats (draw after boat)
function waterLine(c,x0,x1,y,m,t,o={}){c.save();c.translate(0,y);const g=c.createLinearGradient(0,0,0,m*0.6);g.addColorStop(0,o.top||'rgba(70,110,140,0.85)');g.addColorStop(1,o.bot||'rgba(20,40,60,0.95)');c.fillStyle=g;c.beginPath();c.moveTo(x0,0);
  for(let x=x0;x<=x1;x+=8)c.lineTo(x,Math.sin(x*0.02+t*2)*m*0.02);c.lineTo(x1,m*0.6);c.lineTo(x0,m*0.6);c.fill();
  c.strokeStyle='rgba(220,240,255,0.55)';c.lineWidth=Math.max(2,m*0.015);for(let i=0;i<14;i++){const xx=x0+((i*137+t*30)%(x1-x0)),yy=m*(0.05+(i%4)*0.1);c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+m*(0.3+(i%3)*0.15),yy);c.stroke();}c.restore();}

// ---------- FISHING BOAT (8.5 m) with wheelhouse. y = waterline ----------
function fishBoat(c,x,y,m,o={}){const f=o.f||1,hc=o.col||'#2a5a8a',top=o.top||'#e8e4da';vBegin(c,x,y,m,f);
  const hull=()=>{c.beginPath();c.moveTo(-4.0,-1.25);c.bezierCurveTo(-1.5,-1.2,1.5,-1.25,3.6,-1.75);c.lineTo(4.4,-1.95);c.bezierCurveTo(4.2,-1.0,3.9,-0.1,3.2,0.45);c.bezierCurveTo(1.0,0.75,-2.5,0.7,-3.7,0.5);c.lineTo(-4.05,-0.2);c.closePath();};
  vPaint(c,hull,hc,{x0:-4.1,x1:4.4,y0:-1.95,y1:0.75},{top:0.25,mid:0.35,low:0.35});
  c.save();hull();c.clip();c.fillStyle='#8a2a22';c.beginPath();c.moveTo(-4.2,0.1);c.bezierCurveTo(-1,0.12,2,0.05,4.5,-0.25);c.lineTo(4.5,1);c.lineTo(-4.2,1);c.fill(); // antifouling
  c.fillStyle=top;c.beginPath();c.moveTo(-4.2,-1.25);c.bezierCurveTo(-1.5,-1.2,1.5,-1.25,3.6,-1.75);c.lineTo(4.5,-1.97);c.lineTo(4.5,-1.6);c.bezierCurveTo(1.5,-0.98,-1.5,-0.98,-4.2,-1.02);c.fill(); // sheer strake
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=0.02;for(let k=0;k<3;k++){c.beginPath();c.moveTo(-4,-0.75+k*0.3);c.bezierCurveTo(-1,-0.75+k*0.3,2,-0.8+k*0.32,4.2,-1.3+k*0.4);c.stroke();}
  for(let i=0;i<7;i++){c.fillStyle='rgba(120,60,30,'+(0.12+0.05*(i%2))+')';c.fillRect(-3.5+i*1.05,-0.95+((i*3)%4)*0.08,0.04,0.5+((i*5)%3)*0.15);} // rust streaks
  c.fillStyle=o.water||'rgba(20,50,70,0.55)';c.fillRect(-4.5,0,9,1);c.restore();
  // rub rail
  c.strokeStyle='#2a2420';c.lineWidth=0.1;c.beginPath();c.moveTo(-4.0,-1.03);c.bezierCurveTo(-1.5,-0.98,1.5,-1.0,4.3,-1.6);c.stroke();c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=0.025;c.beginPath();c.moveTo(-4.0,-1.07);c.bezierCurveTo(-1.5,-1.02,1.5,-1.04,4.3,-1.64);c.stroke();
  c.save();hull();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  // tyre fenders
  for(const fx of [-2.6,-0.8,1.0]){c.fillStyle='#16161a';c.beginPath();c.ellipse(fx,-0.9,0.17,0.24,0,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();c.fillStyle='#3a3a42';c.beginPath();c.ellipse(fx,-0.9,0.07,0.1,0,0,TAU);c.fill();c.strokeStyle='#8a7a5a';c.lineWidth=0.02;c.beginPath();c.moveTo(fx,-1.14);c.lineTo(fx+0.05,-1.4);c.stroke();}
  // rail stanchions
  c.strokeStyle='#c8ccd2';c.lineWidth=0.03;for(let i=0;i<9;i++){const rx=-3.8+i*0.9,ry=-1.24-(rx>1?(rx-1)*0.17:0);c.beginPath();c.moveTo(rx,ry);c.lineTo(rx,ry-0.45);c.stroke();}
  c.beginPath();c.moveTo(-3.8,-1.69);c.bezierCurveTo(-1,-1.68,1.5,-1.72,3.6,-2.2);c.stroke();
  // wheelhouse
  const wh=()=>{c.beginPath();c.moveTo(-2.6,-1.22);c.lineTo(-2.55,-2.9);c.lineTo(0.3,-2.9);c.lineTo(0.75,-1.24);c.closePath();};vPaint(c,wh,top,{x0:-2.6,x1:0.75,y0:-2.9,y1:-1.22},{top:0.2,low:0.25});c.save();wh();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  vGlass(c,()=>{c.beginPath();c.moveTo(-2.35,-2.75);c.lineTo(-1.25,-2.75);c.lineTo(-1.25,-2.15);c.lineTo(-2.35,-2.15);c.closePath();},{x0:-2.35,x1:-1.25,y0:-2.75,y1:-2.15},{inside:o.inside});
  vGlass(c,()=>{c.beginPath();c.moveTo(-1.05,-2.75);c.lineTo(0.18,-2.75);c.lineTo(0.38,-2.15);c.lineTo(-1.05,-2.15);c.closePath();},{x0:-1.05,x1:0.38,y0:-2.75,y1:-2.15});
  c.fillStyle='#3a3e46';rr(c,-2.8,-3.08,3.35,0.2,0.05);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.8;c.stroke(); // roof overhang
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=0.02;c.strokeRect(-0.9,-2.05,0.6,0.8); // door
  // life ring
  c.lineWidth=0.11;c.strokeStyle='#e85a2a';c.beginPath();c.arc(-1.9,-1.7,0.22,0,TAU);c.stroke();c.strokeStyle='#f4f0e8';c.lineWidth=0.11;for(let i=0;i<4;i++){c.beginPath();c.arc(-1.9,-1.7,0.22,i*Math.PI/2,i*Math.PI/2+0.35);c.stroke();}c.strokeStyle=K2;c.lineWidth=0.015;c.beginPath();c.arc(-1.9,-1.7,0.28,0,TAU);c.arc(-1.9,-1.7,0.16,0,TAU);c.stroke();
  // mast, boom, rigging, antenna, exhaust
  c.fillStyle='#d8dce2';c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.fillRect(-1.25,-5.6,0.12,2.7);c.strokeRect(-1.25,-5.6,0.12,2.7);
  c.strokeStyle='#c0c4ca';c.lineWidth=0.06;c.beginPath();c.moveTo(-1.2,-4.3);c.lineTo(1.9,-2.0);c.stroke();
  c.strokeStyle='rgba(30,30,30,0.7)';c.lineWidth=0.014;c.beginPath();c.moveTo(-1.19,-5.55);c.lineTo(4.3,-2.0);c.moveTo(-1.19,-5.55);c.lineTo(-3.9,-1.3);c.moveTo(-1.19,-4.4);c.lineTo(1.9,-2.0);c.stroke();
  c.fillStyle='#ffd84a';c.beginPath();c.arc(-1.19,-5.68,0.07,0,TAU);c.fill();c.fillStyle='#2a2e34';c.fillRect(-0.1,-3.55,0.18,0.65);c.fillStyle='#14161a';c.fillRect(-0.12,-3.6,0.22,0.08);
  c.fillStyle='#1a1c20';c.fillRect(-2.2,-3.35,0.04,0.45);c.fillRect(-2.25,-3.38,0.5,0.04);
  // net pile on stern deck
  c.fillStyle='#3a6a5a';c.beginPath();c.moveTo(-3.8,-1.25);c.bezierCurveTo(-3.7,-1.65,-3.0,-1.7,-2.7,-1.25);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=0.01;for(let i=0;i<8;i++){c.beginPath();c.moveTo(-3.75+i*0.12,-1.3);c.lineTo(-3.6+i*0.1,-1.55);c.stroke();}
  c.restore();}
// rowboat v3: raked stem + transom, lapstrake following sheer, far gunwale converging at ends, oar pivoting in oarlock
rowboat2=function(c,x,y,m,part,o={}){const f=o.f||1,wood=o.wood||'#8a5a32';vBegin(c,x,y,m,f);
  const SX0=-2.0,SX1=2.12;const sheerY=xx=>{const u=(xx-SX0)/(SX1-SX0);return -0.5-0.13*Math.pow(1-u,2.2)*1.0-0.36*Math.pow(u,3.2);};
  const farY=xx=>{const u=(xx-SX0)/(SX1-SX0);return sheerY(xx)-0.16*Math.sin(Math.PI*Math.min(1,Math.max(0,u)));};
  const hull=()=>{c.beginPath();c.moveTo(SX0,sheerY(SX0));for(let i=1;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;c.lineTo(xx,sheerY(xx));}
    c.bezierCurveTo(2.0,-0.45,1.85,0.05,1.5,0.2);c.bezierCurveTo(0.6,0.32,-0.9,0.3,-1.72,0.14);c.lineTo(SX0,sheerY(SX0));c.closePath();};
  if(part==='back'){c.fillStyle=shd2(wood,-0.5);c.beginPath();c.moveTo(SX0,sheerY(SX0));for(let i=1;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;c.lineTo(xx,farY(xx));}for(let i=40;i>=0;i--){const xx=SX0+(SX1-SX0)*i/40;c.lineTo(xx,sheerY(xx));}c.fill();
    c.strokeStyle=shd2(wood,-0.7);c.lineWidth=0.025;for(let i=1;i<12;i++){const xx=SX0+(SX1-SX0)*i/12;c.beginPath();c.moveTo(xx,farY(xx)+0.02);c.lineTo(xx,sheerY(xx));c.stroke();} // ribs
    c.lineWidth=0.05;c.strokeStyle=shd2(wood,0.05);c.beginPath();for(let i=0;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;i?c.lineTo(xx,farY(xx)):c.moveTo(xx,farY(xx));}c.stroke(); // far gunwale
    c.fillStyle=shd2(wood,0.12);c.strokeStyle=K2;c.lineWidth=VLW*0.6;[-0.9,0.55].forEach(tx=>{c.beginPath();c.rect(tx-0.2,farY(tx)+0.03,0.4,sheerY(tx)-farY(tx)-0.03);c.fill();c.stroke();}); // thwarts
    c.restore();return;}
  vPaint(c,hull,wood,{x0:-2.05,x1:2.15,y0:-0.9,y1:0.32},{top:0.2,mid:0.3,low:0.42});
  c.save();hull();c.clip();for(let k=1;k<=5;k++){c.beginPath();for(let i=0;i<=40;i++){const xx=SX0+(SX1+0.1-SX0)*i/40,yy=sheerY(Math.min(xx,SX1))+k*0.13*(1-0.25*Math.pow((xx+0.2)/2.3,4));i?c.lineTo(xx,yy):c.moveTo(xx,yy);}
    c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=0.028;c.stroke();c.save();c.translate(0,0.022);c.strokeStyle='rgba(255,225,180,0.25)';c.lineWidth=0.014;c.stroke();c.restore();}
  for(let i=0;i<34;i++){const xx=-1.9+((i*0.618)%1)*3.7,yy=sheerY(xx)+0.05+(i%6)*0.11;c.strokeStyle='rgba(50,25,10,0.2)';c.lineWidth=0.008;c.beginPath();c.moveTo(xx,yy);c.quadraticCurveTo(xx+0.2,yy+0.01,xx+0.42,yy);c.stroke();}
  // rivets (clench nails) along laps
  c.fillStyle='rgba(30,20,10,0.5)';for(let k=1;k<=4;k++)for(let i=0;i<9;i++){const xx=-1.6+i*0.4,yy=sheerY(xx)+k*0.13*(1-0.25*Math.pow((xx+0.2)/2.3,4))-0.03;c.beginPath();c.arc(xx,yy,0.011,0,TAU);c.fill();}
  c.fillStyle=o.water||'rgba(20,50,70,0.6)';c.fillRect(-2.3,0,4.6,0.5);c.restore();
  // gunwale (rubbing strake) + stem post + transom edge
  c.lineCap='butt';c.lineWidth=0.085;c.strokeStyle=shd2(wood,0.15);c.beginPath();for(let i=0;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;i?c.lineTo(xx,sheerY(xx)+0.045):c.moveTo(xx,sheerY(xx)+0.045);}c.stroke();
  c.lineWidth=0.02;c.strokeStyle='rgba(255,235,200,0.55)';c.beginPath();for(let i=0;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;i?c.lineTo(xx,sheerY(xx)+0.012):c.moveTo(xx,sheerY(xx)+0.012);}c.stroke();
  c.strokeStyle='rgba(0,0,0,0.4)';c.lineWidth=0.012;c.beginPath();for(let i=0;i<=40;i++){const xx=SX0+(SX1-SX0)*i/40;i?c.lineTo(xx,sheerY(xx)+0.09):c.moveTo(xx,sheerY(xx)+0.09);}c.stroke();
  c.strokeStyle=shd2(wood,-0.35);c.lineWidth=0.07;c.lineCap='round';c.beginPath();c.moveTo(SX1-0.02,sheerY(SX1)+0.02);c.bezierCurveTo(2.0,-0.45,1.85,0.05,1.5,0.2);c.stroke();
  c.save();hull();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  // painter rope at bow
  c.strokeStyle='#c8b080';c.lineWidth=0.025;c.beginPath();c.moveTo(2.05,-0.7);c.quadraticCurveTo(2.25,-0.4,2.15,-0.1);c.stroke();
  // oarlock + oar pivoting through it
  if(o.oars!==0){const ph=o.ph||0,ox=o.oarX??0.05,oy=sheerY(ox);c.strokeStyle='#4a4e56';c.lineWidth=0.03;c.beginPath();c.moveTo(ox-0.07,oy-0.12);c.quadraticCurveTo(ox,oy+0.02,ox+0.07,oy-0.12);c.stroke();c.fillStyle='#4a4e56';c.fillRect(ox-0.015,oy-0.04,0.03,0.12);
    const ang=Math.PI*(o.oarDir===1?0.86:0.14)+Math.sin(ph)*0.22,len=2.6,hIn=0.75;const hx=ox-Math.cos(ang)*hIn,hy=oy-0.08-Math.sin(ang)*hIn*0.55,bx=ox+Math.cos(ang)*(len-hIn),by=oy-0.08+Math.sin(ang)*(len-hIn)*0.55;
    const tip=Math.max(by,0.02);c.lineCap='round';c.strokeStyle=K2;c.lineWidth=0.075;c.beginPath();c.moveTo(hx,hy);c.lineTo(bx,tip);c.stroke();c.strokeStyle=shd2(wood,0.3);c.lineWidth=0.045;c.beginPath();c.moveTo(hx,hy);c.lineTo(bx,tip);c.stroke();
    c.strokeStyle='rgba(255,240,210,0.5)';c.lineWidth=0.012;c.beginPath();c.moveTo(hx,hy-0.012);c.lineTo(bx,tip-0.012);c.stroke();
    c.save();c.translate(bx,tip);c.rotate(Math.atan2(tip-hy,bx-hx));c.fillStyle=shd2(wood,0.2);c.strokeStyle=K2;c.lineWidth=VLW*0.7;c.beginPath();c.moveTo(-0.15,-0.03);c.bezierCurveTo(0.05,-0.1,0.4,-0.09,0.48,0);c.bezierCurveTo(0.4,0.09,0.05,0.1,-0.15,0.03);c.closePath();c.fill();c.stroke();c.restore();
    o._hands=[hx,hy];}
  c.restore();};
// ---------- BOX TRUCK (7.6 m) side ----------
function truck(c,x,y,m,o={}){const col=o.col||'#c8382c',box=o.box||'#e6e2da',f=o.f||1,rot=o.roll||0;vBegin(c,x,y,m,f);vShadow(c,-4,4,0,0.2);
  const WF=2.55,WR1=-1.55,WR2=-2.75,Rw=0.52,AR=0.62;[WF,WR1,WR2].forEach(w=>vWell(c,w,-Rw,AR));
  // chassis rail
  c.fillStyle='#1a1c20';c.fillRect(-3.6,-0.95,7.0,0.22);
  // box
  const bx=()=>{c.beginPath();rr(c,-3.75,-3.6,5.3,2.7,0.06);};vPaint(c,bx,box,{x0:-3.75,x1:1.55,y0:-3.6,y1:-0.9},{top:0.2,mid:0.3,low:0.3});
  c.save();bx();c.clip();for(let i=0;i<12;i++){c.fillStyle='rgba(0,0,0,0.07)';c.fillRect(-3.7+i*0.44,-3.6,0.05,2.7);c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(-3.65+i*0.44,-3.6,0.02,2.7);}
  c.fillStyle=o.stripe||'#2a4a7a';c.fillRect(-3.8,-1.45,5.4,0.22);c.fillStyle='rgba(255,255,255,0.3)';c.fillRect(-3.8,-1.45,5.4,0.03);c.restore();
  c.save();bx();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();c.fillStyle='#9aa0a8';c.fillRect(-3.75,-3.62,5.3,0.07);c.fillRect(-3.75,-0.97,5.3,0.07);
  // side skirt + fuel tank + steps
  c.fillStyle='#2a2c30';rr(c,-0.85,-0.95,1.4,0.42,0.04);c.fill();c.fillStyle='#c8ccd2';rr(c,0.0,-0.85,0.9,0.32,0.12);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.stroke();c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0.08,-0.8,0.74,0.05);
  // cab
  const cab=()=>{c.beginPath();c.moveTo(1.7,-0.75);c.lineTo(1.7,-3.0);c.quadraticCurveTo(1.72,-3.18,1.9,-3.18);c.lineTo(2.55,-3.18);c.bezierCurveTo(2.75,-3.15,2.95,-2.5,3.1,-2.1);c.lineTo(3.7,-2.0);c.quadraticCurveTo(3.95,-1.95,3.98,-1.7);c.lineTo(4.0,-0.85);c.lineTo(WF+AR,-0.75);c.arc(WF,-Rw,AR,0,Math.PI,true);c.closePath();};
  vPaint(c,cab,col,{x0:1.7,x1:4.0,y0:-3.18,y1:-0.75},{top:0.3,mid:0.35,low:0.35});
  vGlass(c,()=>{c.beginPath();c.moveTo(1.95,-2.95);c.lineTo(2.5,-2.95);c.bezierCurveTo(2.65,-2.9,2.82,-2.45,2.92,-2.15);c.lineTo(1.95,-2.15);c.closePath();},{x0:1.95,x1:2.92,y0:-2.95,y1:-2.15},{inside:o.inside});
  c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=0.02;c.beginPath();c.moveTo(1.85,-3.05);c.lineTo(1.85,-1.0);c.lineTo(2.95,-1.0);c.lineTo(2.98,-2.1);c.stroke();
  c.fillStyle='#1a1c20';rr(c,2.1,-1.85,0.28,0.06,0.03);c.fill();c.fillStyle='#2a2c30';[[2.0,-0.92],[2.0,-0.62]].forEach(([sx,sy])=>{c.fillRect(sx,sy,0.55,0.07);});
  // hood vents, grille edge, bumper, lamps
  for(let i=0;i<4;i++){c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(3.2+i*0.16,-1.85,0.08,0.4);}
  c.fillStyle='#b8bcc2';c.fillRect(3.9,-1.95,0.12,1.0);c.fillStyle='#1a1c20';rr(c,3.85,-0.95,0.25,0.35,0.05);c.fill();
  vLamp(c,()=>{c.beginPath();rr(c,3.85,-1.55,0.18,0.24,0.05);},o.lights?'#fff6c8':'#e4ecf2',o.lights?'#fff0b0':0);
  c.fillStyle='#ff9a20';rr(c,3.6,-1.95,0.18,0.08,0.03);c.fill();
  // mirror + exhaust stack + horn
  c.strokeStyle=K2;c.lineWidth=0.04;c.beginPath();c.moveTo(2.7,-2.5);c.lineTo(3.05,-2.75);c.stroke();c.fillStyle='#1c1e22';rr(c,3.0,-3.05,0.12,0.5,0.04);c.fill();
  c.fillStyle='#8a8e96';c.fillRect(1.55,-3.7,0.1,2.8);c.fillStyle='#2a2c30';c.fillRect(1.53,-3.78,0.14,0.1);
  c.save();cab();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();vLine(c,[[1.9,-3.16],[2.55,-3.16]],0.025,'rgba(255,240,210,0.7)');
  // mudflaps
  c.fillStyle='#14161a';c.fillRect(-3.45,-0.75,0.08,0.6);
  vWheel(c,WF,-Rw,Rw,{rot,steel:1,rim:0.55});vWheel(c,WR1,-Rw,Rw,{rot,steel:1,rim:0.55});vWheel(c,WR2,-Rw,Rw,{rot,steel:1,rim:0.55});
  if(o.motion){c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=0.03;for(let i=0;i<9;i++){const yy=-0.4-i*0.37;c.beginPath();c.moveTo(-4-((i*0.7)%1.5),yy);c.lineTo(-5.4-((i*1.3)%2),yy);c.stroke();}}
  c.restore();}
// ---------- BOX TRUCK front-on (coming at camera) ----------
function truckFront(c,x,y,m,o={}){vBegin(c,x,y,m,1);const col=o.col||'#c8382c';vShadow(c,-1.4,1.4,0,0.18);
  // tyres
  [-0.95,0.95].forEach(wx=>{c.fillStyle='#121216';rr(c,wx-0.17,-1.05,0.34,1.05,0.1);c.fill();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.fillStyle='rgba(255,255,255,0.08)';c.fillRect(wx-0.12,-0.95,0.05,0.85);});
  // box behind
  const bx=()=>{c.beginPath();rr(c,-1.25,-3.6,2.5,1.0,0.05);};vPaint(c,bx,o.box||'#e6e2da',{x0:-1.25,x1:1.25,y0:-3.6,y1:-2.6});c.save();bx();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();
  // cab
  const cab=()=>{c.beginPath();c.moveTo(-1.15,-0.55);c.lineTo(-1.18,-2.85);c.quadraticCurveTo(-1.15,-3.2,-0.8,-3.2);c.lineTo(0.8,-3.2);c.quadraticCurveTo(1.15,-3.2,1.18,-2.85);c.lineTo(1.15,-0.55);c.closePath();};
  vPaint(c,cab,col,{x0:-1.2,x1:1.2,y0:-3.2,y1:-0.55},{top:0.3,mid:0.38,low:0.35});
  vGlass(c,()=>{c.beginPath();rr(c,-1.0,-3.05,2.0,0.95,0.08);},{x0:-1,x1:1,y0:-3.05,y1:-2.1},{inside:o.inside});
  c.fillStyle='#1c1e22';c.fillRect(-0.02,-3.05,0.04,0.95);
  // grille
  c.fillStyle='#1a1c20';rr(c,-0.62,-1.95,1.24,0.95,0.06);c.fill();c.strokeStyle='#b8bcc2';c.lineWidth=0.04;rr(c,-0.62,-1.95,1.24,0.95,0.06);c.stroke();for(let i=1;i<7;i++){c.strokeStyle='rgba(200,205,210,0.6)';c.lineWidth=0.02;c.beginPath();c.moveTo(-0.58,-1.95+i*0.135);c.lineTo(0.58,-1.95+i*0.135);c.stroke();}
  // headlights (blazing)
  [-0.88,0.88].forEach(hx=>{c.fillStyle='#fff8dc';rr(c,hx-0.2,-1.8,0.4,0.28,0.06);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.7;c.stroke();if(o.lights!==0){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(hx,-1.66,0,hx,-1.66,1.4);g.addColorStop(0,'rgba(255,250,220,0.9)');g.addColorStop(0.3,'rgba(255,230,170,0.3)');g.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=g;c.fillRect(hx-1.5,-3.2,3,3);c.restore();}});
  // bumper, plate, mirrors
  c.fillStyle='#b8bcc2';rr(c,-1.25,-0.9,2.5,0.32,0.06);c.fill();c.strokeStyle=K2;c.lineWidth=VLW*0.8;c.stroke();c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(-1.2,-0.86,2.4,0.05);
  c.fillStyle='#f0ece0';rr(c,-0.25,-0.85,0.5,0.2,0.03);c.fill();
  [-1,1].forEach(s=>{c.strokeStyle=K2;c.lineWidth=0.05;c.beginPath();c.moveTo(s*1.15,-2.4);c.lineTo(s*1.5,-2.7);c.stroke();c.fillStyle='#1c1e22';rr(c,s*1.5-0.08,-3.0,0.16,0.55,0.05);c.fill();});
  c.save();cab();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.restore();c.restore();}
// ---------- KID BICYCLE (1.4 m) side ----------
function bicycle(c,x,y,m,o={}){vBegin(c,x,y,m,o.f||1);if(o.rot)c.rotate(o.rot);const col=o.col||'#2a8ac8',R=0.27;
  const wheel=(wx)=>{c.strokeStyle='#16161a';c.lineWidth=0.06;c.beginPath();c.arc(wx,-R,R,0,TAU);c.stroke();c.strokeStyle='#b8bcc2';c.lineWidth=0.02;c.beginPath();c.arc(wx,-R,R-0.04,0,TAU);c.stroke();c.lineWidth=0.006;for(let i=0;i<14;i++){const a=i*TAU/14;c.beginPath();c.moveTo(wx,-R);c.lineTo(wx+Math.cos(a)*(R-0.04),-R+Math.sin(a)*(R-0.04));c.stroke();}c.fillStyle='#8a8e96';c.beginPath();c.arc(wx,-R,0.03,0,TAU);c.fill();};
  wheel(-0.48);wheel(0.48);const BB=[-0.05,-0.22],ST=[-0.18,-0.7],HT=[0.36,-0.68];
  c.lineCap='round';const tube=(a,b,w)=>{c.strokeStyle=K2;c.lineWidth=w+0.025;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();};
  tube([-0.48,-R],BB,0.03);tube([-0.48,-R],ST,0.03);tube(BB,ST,0.045);tube(BB,HT,0.045);tube(ST,HT,0.04);tube(HT,[0.48,-R],0.035);
  c.fillStyle='#1a1a1e';rr(c,-0.3,-0.78,0.25,0.07,0.03);c.fill();tube([0.36,-0.68],[0.3,-0.86],0.03);c.strokeStyle='#1a1a1e';c.lineWidth=0.04;c.beginPath();c.moveTo(0.22,-0.88);c.lineTo(0.42,-0.86);c.stroke();
  c.strokeStyle='#8a8e96';c.lineWidth=0.02;c.beginPath();c.arc(BB[0],BB[1],0.08,0,TAU);c.stroke();c.strokeStyle='#2a2a2e';c.lineWidth=0.012;c.beginPath();c.moveTo(BB[0],BB[1]-0.08);c.lineTo(-0.48,-R-0.04);c.moveTo(BB[0],BB[1]+0.08);c.lineTo(-0.48,-R+0.04);c.stroke();
  c.restore();}
