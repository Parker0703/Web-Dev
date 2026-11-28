// ===== GHOST ARMY — cast, helmets, WWII vehicles (real + inflatable), sets =====
Object.assign(KIND2,{
  gi1:{coat:'#5e5a3a',limb:'#ecebe6',hat:'m1',hair:'#3a2a1a',hairStyle:'buzz',pants:'#4a4630'},
  gi2:{coat:'#5a5838',limb:'#ecebe6',hat:'m1',hair:'#6a4a24',hairStyle:'buzz',pants:'#484430'},
  gi3:{coat:'#625e3e',limb:'#ecebe6',hat:'none',hair:'#2a1c12',hairStyle:'sidepart',pants:'#4a4630'},  // artist, bare-headed
  gi4:{coat:'#5e5a3a',limb:'#ecebe6',hat:'none',hair:'#8a5a2a',hairStyle:'quiff',pants:'#4a4630'},     // sound engineer
  gi5:{coat:'#5a5838',limb:'#ecebe6',hat:'none',hair:'#1a1612',hairStyle:'slick',pants:'#484430'},     // radio operator
  ger1:{coat:'#5a6258',limb:'#ecebe6',hat:'stahl',hair:'#3a3020',hairStyle:'buzz',pants:'#4a5048'},
  ger2:{coat:'#5a6258',limb:'#ecebe6',hat:'none',hair:'#c8a060',hairStyle:'sidepart',pants:'#4a5048'}, // radio listener
  gerOff:{coat:'#4e564c',limb:'#ecebe6',hat:'peak',hair:'#2a2420',hairStyle:'slick',pants:'#40463e'},
});
// ---------- helmets & caps drawn on top of the face ----------
const _face2G=face2;
face2=function(c,o,s,f,R,t){_face2G(c,o,s,f,R,t);const K=KIND2[o.kind]||{};const h=K.hat;if(h!=='m1'&&h!=='stahl'&&h!=='peak')return;
  const side=o.view==='side',back=o.back;c.save();c.lineJoin='round';
  if(h==='m1'||h==='stahl'){c.translate(0,-R*(h==='m1'?0.3:0.34));const col=h==='m1'?'#5a5a34':'#5a6050';const g=c.createRadialGradient(L2.dx*R*0.4,-R*1.15,R*0.1,0,-R*0.6,R*1.4);g.addColorStop(0,shd2(col,0.35));g.addColorStop(0.55,col);g.addColorStop(1,shd2(col,-0.35));
    c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4.5*s;c.beginPath();
    if(h==='m1'){const rx=R*1.12,cy=-R*0.18;c.moveTo(-rx-6*s,cy+R*0.06);c.bezierCurveTo(-rx,-R*1.45,rx,-R*1.45,rx+6*s,cy+R*0.06);c.quadraticCurveTo(0,cy+R*0.2,-rx-6*s,cy+R*0.06);}
    else{const fl=side?1:0;c.moveTo(-R*1.08-(side?f*0:0),R*0.05);c.lineTo(-R*1.0,-R*0.3);c.bezierCurveTo(-R*1.05,-R*1.4,R*1.05,-R*1.4,R*1.0,-R*0.3);c.lineTo(R*1.08,R*0.05);c.quadraticCurveTo(R*1.15,R*0.25,R*0.9,R*0.2);c.lineTo(R*0.9,-R*0.1);c.lineTo(-R*0.9,-R*0.1);c.lineTo(-R*0.9,R*0.2);c.quadraticCurveTo(-R*1.15,R*0.25,-R*1.08,R*0.05);
      if(side){c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-f*R*1.0,-R*0.35);c.quadraticCurveTo(-f*R*1.3,R*0.1,-f*R*1.05,R*0.4);c.lineTo(-f*R*0.7,R*0.05);}}
    c.closePath();c.fill();c.stroke();
    c.save();c.clip();c.fillStyle='rgba(255,255,255,0.22)';c.beginPath();c.ellipse(L2.dx*R*0.35,-R*0.95,R*0.35,R*0.16,-0.3,0,TAU);c.fill();
    if(h==='m1'){c.strokeStyle='rgba(30,30,10,0.35)';c.lineWidth=1.6*s;for(let i=-4;i<5;i++){c.beginPath();c.moveTo(i*R*0.25,-R*1.3);c.lineTo(i*R*0.25+R*0.4,0);c.stroke();c.beginPath();c.moveTo(i*R*0.25,-R*1.3);c.lineTo(i*R*0.25-R*0.4,0);c.stroke();}}c.restore();
    if(h==='m1'&&!back){c.strokeStyle='#3a3420';c.lineWidth=3*s;c.beginPath();c.moveTo(-R*0.98,R*0.0);c.quadraticCurveTo(-R*0.85,R*1.0,0,R*1.25);c.stroke();}}
  else{ // officer's peaked cap
    c.fillStyle='#4e564c';c.strokeStyle=K2;c.lineWidth=4.5*s;c.beginPath();c.moveTo(-R*0.95,-R*0.5);c.bezierCurveTo(-R*1.3,-R*1.4,R*1.3,-R*1.4,R*0.95,-R*0.5);c.closePath();c.fill();c.stroke();
    c.fillStyle='#2a2e28';c.fillRect(-R*0.95,-R*0.62,R*1.9,R*0.2);c.strokeRect(-R*0.95,-R*0.62,R*1.9,R*0.2);c.fillStyle='#1a1a1a';c.beginPath();c.moveTo(-R*0.7,-R*0.44);c.quadraticCurveTo(0,-R*0.2+(side?0:0),R*0.7,-R*0.44);c.lineTo(R*0.5,-R*0.5);c.lineTo(-R*0.5,-R*0.5);c.fill();c.stroke();
    c.fillStyle='#c8c0a0';c.beginPath();c.arc(0,-R*0.85,R*0.09,0,TAU);c.fill();}
  c.restore();};
// ---------- M4 SHERMAN (5.9 m) side view, facing +x; o.fake: inflatable rubber; o.infl 0..1 inflation; o.wob: wobble ----------
const OD='#5a5a34';
function sherman(c,x,y,m,o={}){const f=o.f||1,fake=!!o.fake,infl=o.infl??1,t=o.t||0,rot=o.roll||0;vBegin(c,x,y,m,f);
  vShadow(c,-3.2,3.2,0,0.22);if(infl<1){c.scale(1,Math.max(0.04,infl));}
  if(o.wob){c.transform(1,0,Math.sin(t*2.3)*o.wob*0.06,1,0,0);}
  const col=o.col||OD,lw=fake?VLW*1.3:VLW;c.lineJoin='round';c.lineCap='round';
  // tracks (outer belt)
  const track=()=>{c.beginPath();c.moveTo(-2.3,0);c.lineTo(2.3,0);c.quadraticCurveTo(2.95,-0.1,2.9,-0.55);c.quadraticCurveTo(2.85,-0.95,2.4,-0.97);c.lineTo(-2.55,-0.92);c.quadraticCurveTo(-3.05,-0.85,-3.0,-0.45);c.quadraticCurveTo(-2.95,-0.05,-2.3,0);c.closePath();};
  c.fillStyle=fake?'#3a3a26':'#2a2a22';track();c.fill();
  if(!fake){c.save();track();c.clip();c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=0.03;for(let i=-40;i<40;i++){const xx=i*0.155+((rot*0.3)%0.155);c.beginPath();c.moveTo(xx,0.02);c.lineTo(xx,-0.14);c.moveTo(xx,-0.84);c.lineTo(xx,-1.0);c.stroke();}c.restore();}
  c.strokeStyle=K2;c.lineWidth=lw;track();c.stroke();
  // sprocket, idler, bogies
  const wheel=(wx,wy,r,teeth)=>{c.fillStyle=fake?shd2(col,-0.1):'#3a3a2a';c.beginPath();c.arc(wx,wy,r,0,TAU);c.fill();c.stroke();c.fillStyle=fake?shd2(col,0.1):'#4a4a32';c.beginPath();c.arc(wx,wy,r*0.6,0,TAU);c.fill();c.stroke();
    if(teeth&&!fake){c.fillStyle='#2a2a1e';for(let i=0;i<12;i++){const a=i*TAU/12+rot;c.beginPath();c.arc(wx+Math.cos(a)*r,wy+Math.sin(a)*r,0.035,0,TAU);c.fill();}}c.fillStyle='#2a2a1e';c.beginPath();c.arc(wx,wy,r*0.18,0,TAU);c.fill();};
  wheel(2.55,-0.5,0.32,1);wheel(-2.65,-0.45,0.29,0);
  for(const bx of [-1.65,-0.05,1.55]){c.fillStyle=fake?col:'#4a4a30';c.strokeStyle=K2;c.lineWidth=lw*0.8;rr(c,bx-0.42,-0.78,0.84,0.38,0.08);c.fill();c.stroke();
    if(!fake){c.strokeStyle='#2a2a1e';c.lineWidth=0.03;for(let k=0;k<4;k++){c.beginPath();c.arc(bx,-0.58,0.08+k*0.02,0,TAU);c.stroke();}}
    c.lineWidth=lw;c.strokeStyle=K2;wheel(bx-0.31,-0.27,0.25,0);wheel(bx+0.31,-0.27,0.25,0);c.fillStyle='#3a3a2a';c.beginPath();c.arc(bx+(bx>0?0.2:-0.2),-0.88,0.09,0,TAU);c.fill();c.stroke();}
  // hull
  const hull=()=>{c.beginPath();c.moveTo(-2.95,-1.0);c.lineTo(-2.95,-1.82);c.lineTo(1.45,-1.9);c.quadraticCurveTo(1.6,-1.9,1.7,-1.83);c.lineTo(2.95,-1.12);c.quadraticCurveTo(3.0,-1.05,2.9,-0.98);c.lineTo(2.6,-0.92);c.lineTo(-2.7,-0.92);c.closePath();};
  vPaint(c,hull,col,{x0:-3,x1:3,y0:-1.9,y1:-0.9},{top:fake?0.45:0.28,mid:0.4,low:0.3});
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=0.02;c.beginPath();c.moveTo(-2.9,-1.08);c.lineTo(2.7,-1.08);c.stroke();// sponson lip
  if(!fake){c.fillStyle='rgba(0,0,0,0.35)';for(let i=0;i<10;i++){c.beginPath();c.arc(-2.7+i*0.5,-1.75,0.025,0,TAU);c.fill();}
    // tools on sponson: shovel, axe, tow cable
    c.strokeStyle='#6a4a2a';c.lineWidth=0.05;c.beginPath();c.moveTo(-2.4,-1.3);c.lineTo(-1.3,-1.3);c.stroke();c.fillStyle='#4a4a3a';c.beginPath();c.moveTo(-1.3,-1.38);c.lineTo(-1.05,-1.36);c.lineTo(-1.05,-1.24);c.lineTo(-1.3,-1.22);c.fill();
    c.strokeStyle='#3a3628';c.lineWidth=0.045;c.beginPath();c.moveTo(-2.7,-1.55);c.bezierCurveTo(-1.5,-1.45,0.2,-1.5,1.2,-1.6);c.stroke();
    c.fillStyle='#2a2a1e';c.beginPath();c.arc(2.25,-1.45,0.09,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=0.02;c.stroke();// hull MG ball
    c.strokeStyle='#2a2a1e';c.lineWidth=0.04;c.beginPath();c.moveTo(2.25,-1.45);c.lineTo(2.55,-1.45);c.stroke();
    c.strokeStyle='#4a4a30';c.lineWidth=0.03;c.beginPath();c.arc(2.75,-1.18,0.11,Math.PI,TAU);c.stroke();// headlight guard
  }
  // white star
  c.save();c.translate(-0.55,-1.4);c.strokeStyle='rgba(240,240,230,0.9)';c.lineWidth=0.05;c.beginPath();c.arc(0,0,0.34,0,TAU);c.stroke();c.fillStyle='rgba(240,240,230,0.92)';c.beginPath();for(let i=0;i<10;i++){const r=i%2?0.13:0.3,a=-Math.PI/2+i*Math.PI/5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.restore();
  c.strokeStyle=K2;c.lineWidth=lw;hull();c.stroke();
  // turret
  const tur=()=>{c.beginPath();c.moveTo(-1.45,-1.9);c.bezierCurveTo(-1.6,-2.3,-1.25,-2.62,-0.6,-2.65);c.lineTo(0.55,-2.63);c.bezierCurveTo(0.95,-2.6,1.1,-2.4,1.1,-2.1);c.lineTo(1.0,-1.9);c.closePath();};
  vPaint(c,tur,col,{x0:-1.6,x1:1.1,y0:-2.65,y1:-1.9},{top:fake?0.5:0.32,mid:0.45,low:0.3});c.strokeStyle=K2;c.lineWidth=lw;tur();c.stroke();
  // mantlet + gun
  c.fillStyle=shd2(col,-0.1);rr(c,1.0,-2.42,0.28,0.48,0.1);c.fill();c.stroke();
  const gun=()=>{c.beginPath();c.moveTo(1.25,-2.24);c.lineTo(3.45,-2.22);c.lineTo(3.45,-2.1);c.lineTo(1.25,-2.08);c.closePath();};c.fillStyle=col;gun();c.fill();c.stroke();
  c.fillStyle=shd2(col,-0.2);rr(c,3.3,-2.26,0.2,0.2,0.04);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(1.3,-2.21,2.0,0.03);
  // cupola, hatch, .50 cal, antenna
  c.fillStyle=shd2(col,-0.05);rr(c,-0.9,-2.82,0.55,0.2,0.06);c.fill();c.stroke();if(!fake){c.strokeStyle='#2a2a1e';c.lineWidth=0.05;c.beginPath();c.moveTo(-0.55,-2.95);c.lineTo(0.35,-2.98);c.stroke();c.fillStyle='#2a2a1e';c.fillRect(-0.62,-3.02,0.18,0.12);
    c.strokeStyle='#3a3a2a';c.lineWidth=0.02;c.beginPath();c.moveTo(-1.2,-2.5);c.quadraticCurveTo(-1.5,-3.6+Math.sin(t*3)*0.05,-1.9,-4.4);c.stroke();}
  if(fake){ // rubber seams, sheen, wrinkles, valve
    c.strokeStyle='rgba(255,255,240,0.35)';c.lineWidth=0.025;c.beginPath();c.moveTo(-2.9,-1.45);c.lineTo(1.6,-1.5);c.moveTo(-1.4,-2.25);c.lineTo(1.05,-2.27);c.stroke();
    c.strokeStyle='rgba(255,255,255,0.45)';c.lineWidth=0.06;c.beginPath();c.moveTo(-2.7,-1.78);c.lineTo(1.3,-1.85);c.moveTo(-1.1,-2.55);c.quadraticCurveTo(0,-2.66,0.8,-2.55);c.stroke();
    c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=0.02;for(let i=0;i<8;i++){c.beginPath();c.moveTo(-2.6+i*0.6,-0.95);c.quadraticCurveTo(-2.5+i*0.6,-1.05,-2.45+i*0.6,-0.95);c.stroke();}
    c.fillStyle='#2a2a1e';c.beginPath();c.arc(-2.75,-1.2,0.05,0,TAU);c.fill();}
  c.restore();}
// stakes + ropes holding a dummy down
function tethers(c,x,y,m,f=1){c.save();c.translate(x,y);c.scale(m*f,m);c.strokeStyle='#c8b888';c.lineWidth=0.02;for(const [ax,ay,gx] of [[-2.6,-1.7,-3.4],[2.2,-1.6,3.3],[-0.4,-2.6,-1.2]]){c.beginPath();c.moveTo(ax,ay);c.lineTo(gx,0);c.stroke();c.fillStyle='#6a4a2a';c.fillRect(gx-0.03,-0.15,0.06,0.18);}c.restore();}
// ---------- M2 105 mm HOWITZER ----------
function howitzer(c,x,y,m,o={}){const f=o.f||1,fake=!!o.fake,infl=o.infl??1,col=o.col||OD;vBegin(c,x,y,m,f);vShadow(c,-3.4,1.8,0,0.15);if(infl<1)c.scale(1,Math.max(0.04,infl));if(o.wob)c.transform(1,0,Math.sin((o.t||0)*2.1)*o.wob*0.06,1,0,0);
  const lw=fake?VLW*1.3:VLW;c.lineJoin='round';c.lineCap='round';c.strokeStyle=K2;
  // split trail
  c.fillStyle=shd2(col,-0.1);c.beginPath();c.moveTo(-0.2,-0.7);c.lineTo(-3.3,-0.12);c.lineTo(-3.35,0);c.lineTo(-3.0,0);c.lineTo(-0.1,-0.5);c.closePath();c.fill();c.lineWidth=lw;c.stroke();c.fillStyle='#3a3a2a';c.beginPath();c.moveTo(-3.35,0);c.lineTo(-3.15,0.12);c.lineTo(-2.95,0);c.fill();c.stroke();
  // cradle + recoil + barrel (elevated)
  c.save();c.translate(0.1,-1.0);c.rotate(-0.2);c.fillStyle=col;rr(c,-1.0,-0.22,1.9,0.36,0.08);c.fill();c.stroke();c.fillStyle=col;c.beginPath();c.moveTo(0.8,-0.12);c.lineTo(2.9,-0.1);c.lineTo(2.9,0.04);c.lineTo(0.8,0.06);c.closePath();c.fill();c.stroke();c.fillStyle=shd2(col,-0.2);rr(c,2.8,-0.14,0.18,0.22,0.03);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.3)';c.fillRect(0.9,-0.08,1.8,0.03);c.restore();
  // shield
  const sh=()=>{c.beginPath();c.moveTo(0.35,-0.45);c.lineTo(0.5,-1.7);c.lineTo(0.75,-1.7);c.lineTo(0.62,-0.45);c.closePath();};vPaint(c,sh,col,{x0:0.3,x1:0.8,y0:-1.7,y1:-0.45});c.lineWidth=lw;sh();c.stroke();
  // wheel
  c.fillStyle='#1c1c18';c.beginPath();c.arc(0,-0.52,0.52,0,TAU);c.fill();c.stroke();c.fillStyle=fake?shd2(col,0.1):'#4a4a32';c.beginPath();c.arc(0,-0.52,0.3,0,TAU);c.fill();c.stroke();if(!fake){c.fillStyle='#2a2a1e';for(let i=0;i<6;i++){const a=i*TAU/6;c.beginPath();c.arc(Math.cos(a)*0.18,-0.52+Math.sin(a)*0.18,0.03,0,TAU);c.fill();}}
  if(fake){c.strokeStyle='rgba(255,255,255,0.45)';c.lineWidth=0.05;c.beginPath();c.moveTo(-0.7,-1.35);c.lineTo(1.0,-1.62);c.stroke();}
  c.restore();}
// ---------- P-47 style fighter (11 m) on the ground, tail-dragger ----------
function fighter(c,x,y,m,o={}){const f=o.f||1,fake=!!o.fake,infl=o.infl??1,col=o.col||'#6a6a46';vBegin(c,x,y,m,f);vShadow(c,-5,5,0,0.2);if(infl<1)c.scale(1,Math.max(0.04,infl));if(o.wob)c.transform(1,0,Math.sin((o.t||0)*2.0)*o.wob*0.05,1,0,0);
  const lw=fake?VLW*1.3:VLW;c.lineJoin='round';c.lineCap='round';c.strokeStyle=K2;c.save();c.translate(0,-1.9);c.rotate(-0.11); // ground attitude
  // fuselage
  const fus=()=>{c.beginPath();c.moveTo(4.7,-0.05);c.bezierCurveTo(4.7,-0.75,3.8,-0.95,2.5,-0.95);c.lineTo(0.2,-1.0);c.bezierCurveTo(-0.6,-1.4,-1.4,-1.35,-1.9,-0.95);c.lineTo(-5.2,-0.45);c.lineTo(-5.6,-1.6);c.lineTo(-5.95,-1.6);c.lineTo(-5.85,0.1);c.lineTo(-4.8,0.25);c.bezierCurveTo(-1,0.75,2.5,0.85,3.8,0.6);c.bezierCurveTo(4.5,0.45,4.7,0.3,4.7,-0.05);c.closePath();};
  vPaint(c,fus,col,{x0:-6,x1:4.8,y0:-1.6,y1:0.85},{top:fake?0.45:0.3,mid:0.4,low:0.35});c.lineWidth=lw;fus();c.stroke();
  // canopy
  vGlass(c,()=>{c.beginPath();c.moveTo(0.3,-0.98);c.bezierCurveTo(-0.3,-1.5,-1.3,-1.45,-1.8,-0.95);c.closePath();},{x0:-1.8,x1:0.3,y0:-1.45,y1:-0.95},{top:'#c8dce8',mid:'#5a7a90',bot:'#2a3a48'});
  // cowling ring + exhaust
  c.strokeStyle='rgba(0,0,0,0.4)';c.lineWidth=0.04;c.beginPath();c.moveTo(3.6,-0.92);c.quadraticCurveTo(3.4,0,3.6,0.65);c.stroke();c.fillStyle='#2a2a1e';rr(c,2.2,0.25,0.9,0.15,0.05);c.fill();
  // wing (seen edge-on, low) + star roundel
  c.fillStyle=shd2(col,-0.15);c.beginPath();c.moveTo(2.2,0.45);c.lineTo(-0.6,0.5);c.lineTo(-0.9,0.68);c.lineTo(2.4,0.65);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=lw;c.stroke();
  c.save();c.translate(-2.6,-0.15);c.fillStyle='#24345a';c.beginPath();c.arc(0,0,0.5,0,TAU);c.fill();c.fillStyle='#f0f0e8';c.fillRect(-0.95,-0.12,1.9,0.24);c.beginPath();for(let i=0;i<10;i++){const r=i%2?0.18:0.44,a=-Math.PI/2+i*Math.PI/5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.restore();
  // propeller
  c.fillStyle='#2a2a26';c.beginPath();c.ellipse(4.82,-0.05,0.18,0.3,0,0,TAU);c.fill();c.stroke();c.fillStyle='#1a1a18';for(const sgn of [-1,1]){c.beginPath();c.moveTo(4.9,-0.05);c.lineTo(5.0,-0.05+sgn*1.9);c.lineTo(5.15,-0.05+sgn*1.85);c.lineTo(5.0,-0.05);c.fill();c.fillStyle='#e8c020';c.fillRect(4.95,-0.05+sgn*1.75,0.18,sgn*0.15);c.fillStyle='#1a1a18';}
  if(fake){c.strokeStyle='rgba(255,255,255,0.45)';c.lineWidth=0.07;c.beginPath();c.moveTo(3.5,-0.85);c.lineTo(-0.2,-0.95);c.moveTo(-2.3,-0.8);c.lineTo(-5.0,-0.4);c.stroke();}
  c.restore();
  // landing gear
  c.strokeStyle=K2;c.lineWidth=0.09;c.beginPath();c.moveTo(2.0,-1.3);c.lineTo(2.2,-0.45);c.stroke();c.fillStyle='#1a1a18';c.beginPath();c.arc(2.2,-0.45,0.45,0,TAU);c.fill();c.lineWidth=lw;c.stroke();c.fillStyle='#5a5a46';c.beginPath();c.arc(2.2,-0.45,0.2,0,TAU);c.fill();
  c.fillStyle='#1a1a18';c.beginPath();c.arc(-5.5,-0.18,0.18,0,TAU);c.fill();c.stroke();
  c.restore();}
// ---------- M3 HALF-TRACK with sonic-deception loudspeakers ----------
function halfTrack(c,x,y,m,o={}){const f=o.f||1,col=o.col||OD,t=o.t||0;vBegin(c,x,y,m,f);vShadow(c,-3.4,3.4,0,0.2);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=VLW;
  // rear track unit
  const tr=()=>{c.beginPath();c.moveTo(-2.9,-0.15);c.quadraticCurveTo(-3.2,-0.45,-2.9,-0.78);c.lineTo(-0.5,-0.78);c.quadraticCurveTo(-0.2,-0.45,-0.5,-0.15);c.quadraticCurveTo(-1.7,0.02,-2.9,-0.15);c.closePath();};c.fillStyle='#22221c';tr();c.fill();c.stroke();
  for(const wx of [-2.45,-1.7,-0.95]){c.fillStyle='#3a3a2a';c.beginPath();c.arc(wx,-0.38,0.26,0,TAU);c.fill();c.stroke();c.fillStyle='#4a4a32';c.beginPath();c.arc(wx,-0.38,0.12,0,TAU);c.fill();}
  // body
  const bd=()=>{c.beginPath();c.moveTo(-3.1,-0.7);c.lineTo(-3.1,-1.85);c.lineTo(0.55,-1.85);c.lineTo(0.55,-2.25);c.lineTo(1.25,-2.25);c.lineTo(1.55,-1.6);c.lineTo(2.9,-1.45);c.quadraticCurveTo(3.1,-1.4,3.1,-1.15);c.lineTo(3.1,-0.8);c.lineTo(2.4,-0.75);c.arc(1.85,-0.48,0.55,-0.1,Math.PI+0.1,true);c.lineTo(-0.2,-0.7);c.closePath();};
  vPaint(c,bd,col,{x0:-3.1,x1:3.1,y0:-2.25,y1:-0.7},{top:0.3,mid:0.4,low:0.3});c.lineWidth=VLW;bd();c.stroke();
  vGlass(c,()=>{c.beginPath();c.moveTo(0.62,-2.2);c.lineTo(1.2,-2.2);c.lineTo(1.45,-1.68);c.lineTo(0.62,-1.68);c.closePath();},{x0:0.62,x1:1.45,y0:-2.2,y1:-1.68});
  c.fillStyle='rgba(0,0,0,0.3)';for(let i=0;i<6;i++)c.fillRect(2.9,-1.42+i*0.09,0.18,0.04); // radiator louvres
  c.save();c.translate(-1.3,-1.25);c.fillStyle='rgba(240,240,230,0.9)';c.beginPath();for(let i=0;i<10;i++){const r=i%2?0.1:0.24,a=-Math.PI/2+i*Math.PI/5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.restore();
  c.strokeStyle='#2a2a1e';c.lineWidth=0.06;c.beginPath();c.moveTo(3.1,-1.0);c.lineTo(3.35,-1.0);c.stroke(); // bumper
  // front wheel
  c.fillStyle='#1a1a16';c.beginPath();c.arc(1.85,-0.48,0.48,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=VLW;c.stroke();c.fillStyle='#4a4a32';c.beginPath();c.arc(1.85,-0.48,0.24,0,TAU);c.fill();c.stroke();
  // speaker array in the bed (big horn cluster)
  if(o.speakers!==0){c.fillStyle='#3a3a2e';rr(c,-2.9,-3.25,2.8,1.42,0.08);c.fill();c.stroke();for(let r=0;r<2;r++)for(let k=0;k<3;k++){const sx=-2.45+k*0.9,sy=-2.85+r*0.6;const g=c.createRadialGradient(sx,sy,0,sx,sy,0.28);g.addColorStop(0,'#0a0a0a');g.addColorStop(0.6,'#2a2a24');g.addColorStop(1,'#5a5a4a');c.fillStyle=g;c.beginPath();c.arc(sx,sy,0.27,0,TAU);c.fill();c.stroke();c.fillStyle='#8a8a7a';c.beginPath();c.arc(sx,sy,0.06,0,TAU);c.fill();}
    if(o.on){for(let i=0;i<4;i++){const k=((t*1.2+i/4)%1);c.strokeStyle=`rgba(255,240,200,${(1-k)*0.6})`;c.lineWidth=0.05;c.beginPath();c.arc(-1.5,-2.55,0.8+k*6,-Math.PI*0.35,Math.PI*0.35);c.stroke();}}}
  c.restore();}
// ---------- countryside (France 1944) ----------
function farmland(c,t,cam,o={}){const mood=o.mood||'day';sky2(c,mood==='dawn'?'dusk':mood);
  if(mood==='night'){c.fillStyle='#f0f0e0';c.beginPath();c.arc(820,300,50,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(820,300,0,820,300,300);g.addColorStop(0,'rgba(200,210,255,0.25)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();for(let i=0;i<60;i++){c.fillStyle='rgba(255,255,255,0.7)';c.fillRect(hash(i)*W,hash(i*3)*900,2,2);}}
  const dk=mood==='night'?0.35:(mood==='dawn'?0.8:1);const sh=(col)=>mood==='night'?shd2(col,-0.55):(mood==='dawn'?shd2(col,-0.2):col);
  world(c,par(cam,0.2),()=>{c.fillStyle=sh('#8a9ab0');c.beginPath();c.moveTo(-3000,GY-260);for(let x=-3000;x<=3000;x+=150)c.lineTo(x,GY-260-Math.sin(x*0.002)*80-hash(x)*30);c.lineTo(3000,GY);c.lineTo(-3000,GY);c.fill();});
  world(c,par(cam,0.45),()=>{c.fillStyle=sh('#6a8a5a');c.beginPath();c.moveTo(-3000,GY-160);for(let x=-3000;x<=3000;x+=120)c.lineTo(x,GY-160-Math.sin(x*0.003+1)*60);c.lineTo(3000,GY);c.lineTo(-3000,GY);c.fill();
    // village with church spire
    const vx=o.village??600;c.fillStyle=sh('#b8a890');for(let i=0;i<6;i++){c.fillRect(vx+i*70,GY-220-hash(i)*40,60,80);c.fillStyle=sh('#8a4a3a');c.beginPath();c.moveTo(vx+i*70-6,GY-220-hash(i)*40);c.lineTo(vx+i*70+30,GY-250-hash(i)*40);c.lineTo(vx+i*70+66,GY-220-hash(i)*40);c.fill();c.fillStyle=sh('#b8a890');}
    c.fillRect(vx+190,GY-330,40,160);c.fillStyle=sh('#5a5a6a');c.beginPath();c.moveTo(vx+185,GY-330);c.lineTo(vx+210,GY-420);c.lineTo(vx+235,GY-330);c.fill();
    for(let i=-20;i<20;i++){const tx=i*160+hash(i)*60;c.fillStyle=sh(['#3a5a2e','#4a6a34'][i&1]);c.beginPath();c.arc(tx,GY-150-hash(i*2)*30,40+hash(i)*25,0,TAU);c.fill();}});
  world(c,cam,()=>{const g=c.createLinearGradient(0,GY-80,0,GY+700);g.addColorStop(0,sh('#7a9a52'));g.addColorStop(1,sh('#5a7a3a'));c.fillStyle=g;c.fillRect(cam.x-4000,GY-80,8000,1600);
    // hedgerow
    for(let i=-30;i<30;i++){const hx=i*110;c.fillStyle=sh(['#3a5a2a','#2e4e24','#44683a'][(i+30)%3]);c.beginPath();c.arc(hx,GY-90,70+hash(i*5)*30,Math.PI,TAU);c.fill();}
    c.fillStyle=sh('#4a6a34');for(let i=0;i<220;i++){const gx=hash(i)*6000-3000,gy=GY-60+hash(i*3)*700;c.fillRect(gx,gy,3,-10-hash(i*5)*14);}
    if(o.tracks){c.strokeStyle='rgba(60,50,30,0.35)';c.lineWidth=26;for(const yy of [GY+180,GY+260]){c.beginPath();c.moveTo(-3000,yy);c.lineTo(3000,yy+20);c.stroke();}}
    if(o.world)o.world(c);});
  if(mood==='night'){c.fillStyle='rgba(10,20,50,0.35)';c.fillRect(0,0,W,H);}else if(mood==='dawn'){c.fillStyle='rgba(255,140,80,0.12)';c.fillRect(0,0,W,H);}}
function mist(c,t,y,a=0.35){for(let i=0;i<8;i++){const x=((i*260+t*20)%1600)-260;const g=c.createRadialGradient(x,y,0,x,y,300);g.addColorStop(0,`rgba(230,230,240,${a})`);g.addColorStop(1,'rgba(230,230,240,0)');c.fillStyle=g;c.fillRect(x-300,y-300,600,600);}}
// binocular POV mask
function binoMask(c,cx,cy,r){c.save();c.fillStyle='#000';c.beginPath();c.rect(0,0,W,H);c.arc(cx-r*0.55,cy,r,0,TAU,true);c.rect(0,0,0,0);c.fill('evenodd');c.restore();
  c.save();c.beginPath();c.rect(0,0,W,H);c.arc(cx-r*0.55,cy,r,0,TAU);c.arc(cx+r*0.55,cy,r,0,TAU);c.fillStyle='#000';c.fill('evenodd');c.restore();
  c.strokeStyle='rgba(0,0,0,0.6)';c.lineWidth=2;c.beginPath();c.moveTo(cx-40,cy);c.lineTo(cx+40,cy);c.moveTo(cx,cy-40);c.lineTo(cx,cy+40);c.stroke();}
// ---------- MAP (top-down) ----------
function warMap(c,x,y,w,h,o={}){c.save();c.translate(x,y);c.fillStyle='#e8dcc0';c.strokeStyle=K2;c.lineWidth=7;c.fillRect(0,0,w,h);c.strokeRect(0,0,w,h);
  c.save();c.beginPath();c.rect(0,0,w,h);c.clip();c.strokeStyle='rgba(120,100,70,0.18)';c.lineWidth=2;for(let i=0;i<w;i+=w/10){c.beginPath();c.moveTo(i,0);c.lineTo(i,h);c.stroke();}for(let i=0;i<h;i+=h/12){c.beginPath();c.moveTo(0,i);c.lineTo(w,i);c.stroke();}
  c.fillStyle='rgba(120,160,90,0.25)';for(let i=0;i<14;i++){c.beginPath();c.ellipse(hash(i)*w,hash(i*3)*h,40+hash(i*5)*80,30+hash(i*7)*50,hash(i)*3,0,TAU);c.fill();}
  // river
  c.strokeStyle='#5a8ac0';c.lineWidth=o.river?26:14;c.lineCap='round';c.beginPath();c.moveTo(w*0.62,-10);c.bezierCurveTo(w*0.5,h*0.25,w*0.75,h*0.45,w*0.6,h*0.65);c.bezierCurveTo(w*0.5,h*0.8,w*0.62,h*0.95,w*0.58,h+10);c.stroke();
  c.strokeStyle='rgba(120,90,60,0.6)';c.lineWidth=4;for(let i=0;i<5;i++){c.beginPath();c.moveTo(0,hash(i)*h);c.bezierCurveTo(w*0.3,hash(i*2)*h,w*0.6,hash(i*3)*h,w,hash(i*4)*h);c.stroke();}
  if(o.label)txt(c,o.label,w*0.66,h*0.08,30,'#2a4a7a',{stroke:false,ls:8,w:800});
  if(o.draw)o.draw(c,w,h);c.restore();c.restore();}
function unitBlock(c,x,y,lab,col,o={}){c.save();c.translate(x,y);c.globalAlpha*=o.alpha??1;c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-58,-34,124,76);c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=5;if(o.dash)c.setLineDash([12,8]);c.fillRect(-62,-40,124,76);c.strokeRect(-62,-40,124,76);c.setLineDash([]);
  c.strokeStyle='rgba(255,255,255,0.85)';c.lineWidth=5;c.beginPath();c.moveTo(-40,-20);c.lineTo(40,16);c.moveTo(40,-20);c.lineTo(-40,16);c.stroke();txt(c,lab,0,62,28,o.tc||'#1a1a1a',{stroke:false,w:900,ls:2});c.restore();}
function arrowPath(c,pts,p,col,o={}){if(p<=0)return;c.save();c.strokeStyle=col;c.lineWidth=o.w||22;c.lineCap='round';c.lineJoin='round';if(o.dash)c.setLineDash([30,22]);const n=Math.max(2,Math.floor(pts.length*p));c.beginPath();pts.slice(0,n).forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.stroke();c.setLineDash([]);
  const a=pts[n-1],b=pts[n-2];const an=Math.atan2(a[1]-b[1],a[0]-b[0]);c.fillStyle=col;c.translate(a[0],a[1]);c.rotate(an);c.beginPath();c.moveTo(36,0);c.lineTo(-20,-30);c.lineTo(-20,30);c.closePath();c.fill();c.restore();}
function curvePts(x0,y0,x1,y1,bend=0.2,n=30){const P=[];for(let i=0;i<=n;i++){const u=i/n;P.push([lerp(x0,x1,u)+Math.sin(u*Math.PI)*(y1-y0)*bend,lerp(y0,y1,u)-Math.sin(u*Math.PI)*(x1-x0)*bend]);}return P;}
// ---------- interiors ----------
function tentInterior(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#5a5a3a');g.addColorStop(1,'#2a2a1a');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=10;for(let i=-2;i<10;i++){c.beginPath();c.moveTo(540,-200);c.lineTo(i*140,1400);c.stroke();}
  c.fillStyle='#4a3a26';c.fillRect(0,1300,W,620);c.strokeStyle=K2;c.lineWidth=6;c.strokeRect(-5,1300,W+10,30);
  // hanging bulb
  c.strokeStyle='#1a1a1a';c.lineWidth=4;c.beginPath();c.moveTo(540,0);c.lineTo(540,230);c.stroke();c.fillStyle='#ffe8a0';c.beginPath();c.arc(540,250,26,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(540,250,0,540,250,900);lg.addColorStop(0,'rgba(255,220,140,0.45)');lg.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();}
function morseKey(c,x,y,sc,press){c.save();c.translate(x,y);c.scale(sc,sc);c.fillStyle='#2a2a2a';c.strokeStyle=K2;c.lineWidth=5;rr(c,-130,-20,260,40,8);c.fill();c.stroke();c.fillStyle='#b8a070';c.fillRect(-20,-70,40,50);c.strokeRect(-20,-70,40,50);c.save();c.translate(0,-70);c.rotate(press?0.08:0);c.fillStyle='#c8ccd0';c.fillRect(-10,-12,170,16);c.strokeRect(-10,-12,170,16);c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(160,-14,42,18,0,0,TAU);c.fill();c.stroke();c.restore();c.restore();}
function reelDeck(c,x,y,sc,t){c.save();c.translate(x,y);c.scale(sc,sc);c.fillStyle='#4a3a2a';c.strokeStyle=K2;c.lineWidth=6;rr(c,-260,-160,520,320,20);c.fill();c.stroke();for(const rx of [-130,130]){c.save();c.translate(rx,-30);c.rotate(t*3);c.fillStyle='#c8ccd0';c.beginPath();c.arc(0,0,100,0,TAU);c.fill();c.stroke();c.fillStyle='#5a3a2a';c.beginPath();c.arc(0,0,80,0,TAU);c.fill();c.fillStyle='#c8ccd0';for(let i=0;i<3;i++){c.beginPath();c.arc(Math.cos(i*2.1)*45,Math.sin(i*2.1)*45,18,0,TAU);c.fill();}c.restore();}
  c.strokeStyle='#3a2a1a';c.lineWidth=5;c.beginPath();c.moveTo(-130,50);c.lineTo(130,50);c.stroke();for(let i=0;i<4;i++){c.fillStyle='#1a1a1a';c.beginPath();c.arc(-150+i*100,120,16,0,TAU);c.fill();}c.restore();}
function easel(c,x,y,sc,draw){c.save();c.translate(x,y);c.scale(sc,sc);c.strokeStyle='#6a4a2a';c.lineWidth=14;c.beginPath();c.moveTo(-120,300);c.lineTo(0,-260);c.lineTo(120,300);c.moveTo(0,-260);c.lineTo(0,320);c.stroke();c.fillStyle='#f4efe2';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-170,-220,340,260);c.strokeRect(-170,-220,340,260);c.save();c.beginPath();c.rect(-170,-220,340,260);c.clip();draw&&draw(c);c.restore();c.fillStyle='#6a4a2a';c.fillRect(-180,40,360,18);c.restore();}
function stampMark(c,t0,t,lab,x,y,col='#c8201a',rot=-0.12,sz=64){const p=t-t0;if(p<0)return;const k=p<0.12?lerp(1.8,1,p/0.12):1;c.save();c.translate(x,y);c.rotate(rot);c.scale(k,k);c.globalAlpha=Math.min(1,p/0.06)*0.9;c.font=`900 ${sz}px "Inter Display"`;const w=c.measureText(lab).width+50;c.strokeStyle=col;c.lineWidth=8;rr(c,-w/2,-sz*0.75,w,sz*1.5,10);c.stroke();txt(c,lab,0,4,sz,col,{stroke:false,ls:6});c.restore();}
// ===================== DETAIL + LIGHTING UPGRADE =====================
// extra Sherman detail: periscopes, lifting rings, weld seams, mud, unit number, sun rim light
const _sherman0=sherman;
sherman=function(c,x,y,m,o={}){_sherman0(c,x,y,m,o);if(o.infl!=null&&o.infl<0.9)return;const f=o.f||1,fake=!!o.fake;vBegin(c,x,y,m,f);if(o.wob)c.transform(1,0,Math.sin((o.t||0)*2.3)*o.wob*0.06,1,0,0);
  // mud splash on lower hull + tracks
  c.save();c.beginPath();c.rect(-3.1,-1.3,6.2,1.35);c.clip();const mg=c.createLinearGradient(0,-1.3,0,0);mg.addColorStop(0,'rgba(90,70,40,0)');mg.addColorStop(1,'rgba(90,70,40,0.55)');c.fillStyle=mg;c.fillRect(-3.1,-1.3,6.2,1.35);
  for(let i=0;i<40;i++){c.fillStyle=`rgba(80,62,36,${0.25+hash(i)*0.3})`;c.beginPath();c.arc(-3+hash(i*3)*6,-1.1+hash(i*7)*0.3,0.03+hash(i)*0.06,0,TAU);c.fill();}c.restore();
  if(!fake){c.strokeStyle=K2;c.lineWidth=VLW*0.6;c.fillStyle='#3a3a2a';for(const px of [1.0,1.35])rr(c,px,-1.98,0.18,0.1,0.02),c.fill(),c.stroke();
    c.strokeStyle='rgba(255,255,230,0.18)';c.lineWidth=0.012;c.beginPath();c.moveTo(-2.9,-1.6);c.lineTo(1.5,-1.66);c.moveTo(-1.35,-2.05);c.lineTo(0.95,-2.07);c.stroke();
    c.fillStyle='#3a3a2a';for(const lx of [-2.5,0.9]){c.beginPath();c.arc(lx,-1.92,0.05,Math.PI,TAU);c.fill();}
    txt(c,o.num||'3',-2.35,-1.4,0.28,'rgba(240,240,230,0.85)',{stroke:false});}
  // sun rim along top edges (from light side)
  c.save();c.globalCompositeOperation='lighter';c.strokeStyle=L2.rim||'#ffd8a0';c.globalAlpha=0.5;c.lineWidth=0.04;c.beginPath();c.moveTo(-2.9,-1.84);c.lineTo(1.45,-1.92);c.lineTo(2.9,-1.1);c.moveTo(-1.5,-1.95);c.bezierCurveTo(-1.6,-2.32,-1.25,-2.64,-0.6,-2.67);c.lineTo(0.55,-2.65);c.stroke();c.restore();
  c.restore();};
// ---------- cinematic lighting helpers ----------
function sunGlow(c,x,y,col='255,200,140',r=700,a=0.55){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(0.25,`rgba(${col},${a*0.35})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
function godRays(c,x,y,col='255,220,170',a=0.12,n=9,len=2400,spread=1.1,rot=0.35){c.save();c.globalCompositeOperation='lighter';c.translate(x,y);for(let i=0;i<n;i++){const an=rot+(i/(n-1)-0.5)*spread,w=0.025+hash(i)*0.05;const g=c.createLinearGradient(0,0,Math.cos(an)*len,Math.sin(an)*len);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(an-w)*len,Math.sin(an-w)*len);c.lineTo(Math.cos(an+w)*len,Math.sin(an+w)*len);c.fill();}c.restore();}
function grade2(c,top,bot,a=0.25,mode='soft-light'){c.save();c.globalCompositeOperation=mode;const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);c.globalAlpha=a;c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
function lampPool(c,x,y,r,col='255,210,140',a=0.45){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);c.restore();}
function fgGrass(c,t,y,dens=60,col='#2e4a22',h=160){for(let i=0;i<dens;i++){const x=hash(i*11)*W*1.1-40,hh=h*(0.5+hash(i*3)*0.8),sw=Math.sin(t*1.6+i)*12;c.fillStyle=i%3?col:shd2(col,-0.2);c.beginPath();c.moveTo(x-10,y+20);c.quadraticCurveTo(x+sw*0.4,y-hh*0.5,x+sw,y-hh);c.quadraticCurveTo(x+sw*0.4+6,y-hh*0.5,x+12,y+20);c.fill();}}
// ---------- props scattered in camps ----------
function tent(c,x,y,s=1,col='#6a6a46'){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=K2;c.lineWidth=5;c.fillStyle=col;c.beginPath();c.moveTo(-160,0);c.lineTo(-40,-170);c.lineTo(160,-170);c.lineTo(220,0);c.closePath();c.fill();c.stroke();c.fillStyle=shd2(col,-0.25);c.beginPath();c.moveTo(-160,0);c.lineTo(-40,-170);c.lineTo(40,0);c.closePath();c.fill();c.stroke();c.fillStyle='#1a1a12';c.beginPath();c.moveTo(-60,0);c.lineTo(-40,-110);c.lineTo(-10,0);c.fill();
  c.strokeStyle='rgba(255,255,220,0.25)';c.lineWidth=3;c.beginPath();c.moveTo(-40,-168);c.lineTo(158,-168);c.stroke();c.strokeStyle='#c8b888';c.lineWidth=2;c.beginPath();c.moveTo(160,-170);c.lineTo(260,0);c.moveTo(-40,-170);c.lineTo(-220,0);c.stroke();c.restore();}
function crateStack(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=K2;c.lineWidth=4;[[-60,-60],[0,-60],[-30,-120]].forEach(([bx,by],i)=>{c.fillStyle=['#7a6a42','#6a5a38','#806e46'][i];c.fillRect(bx,by,60,60);c.strokeRect(bx,by,60,60);c.strokeStyle='rgba(0,0,0,0.3)';c.beginPath();c.moveTo(bx,by);c.lineTo(bx+60,by+60);c.stroke();c.strokeStyle=K2;c.fillStyle='rgba(255,255,255,0.15)';c.fillRect(bx,by,60,6);txt(c,'U.S.',bx+30,by+36,14,'rgba(240,240,220,0.7)',{stroke:false});});c.restore();}
function jerrycans(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);for(let i=0;i<3;i++){c.fillStyle='#5a5a34';c.strokeStyle=K2;c.lineWidth=4;rr(c,i*36,-70,32,70,4);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.3)';c.beginPath();c.moveTo(i*36+4,-50);c.lineTo(i*36+28,-20);c.moveTo(i*36+28,-50);c.lineTo(i*36+4,-20);c.stroke();c.fillStyle='#3a3a22';c.fillRect(i*36+8,-82,16,12);}c.restore();}
function sandbags(c,x,y,n=6,s=1){c.save();c.translate(x,y);c.scale(s,s);for(let r=0;r<3;r++)for(let k=0;k<n-r;k++){const bx=k*70+r*35,by=-r*34;c.fillStyle=['#a89870','#9a8a62','#b0a07a'][(k+r)%3];c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.ellipse(bx,by-18,38,20,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.2)';c.beginPath();c.moveTo(bx-20,by-26);c.lineTo(bx-20,by-10);c.stroke();}c.restore();}
function haystack(c,x,y,s=1,mood){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=mood==='night'?'#4a4430':'#c8a860';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(-90,0);c.quadraticCurveTo(-100,-130,0,-150);c.quadraticCurveTo(100,-130,90,0);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(120,90,30,0.4)';c.lineWidth=3;for(let i=0;i<10;i++){c.beginPath();c.moveTo(-70+i*15,-10);c.lineTo(-60+i*14,-110+Math.abs(i-5)*12);c.stroke();}c.restore();}
function fencePosts(c,x0,x1,y,s=1){c.strokeStyle=K2;c.lineWidth=4;for(let x=x0;x<x1;x+=150*s){c.fillStyle='#6a5034';c.fillRect(x-7*s,y-110*s,14*s,110*s);c.strokeRect(x-7*s,y-110*s,14*s,110*s);}c.strokeStyle='rgba(40,40,40,0.6)';c.lineWidth=2;for(const k of [0.35,0.7]){c.beginPath();c.moveTo(x0,y-110*s*k);for(let x=x0;x<x1;x+=150*s)c.quadraticCurveTo(x+75*s,y-110*s*k+10,x+150*s,y-110*s*k);c.stroke();}}
function poplars(c,x0,x1,y,s,col){for(let x=x0;x<x1;x+=90*s){c.fillStyle=shd2(col,(hash(x)-0.5)*0.2);c.beginPath();c.ellipse(x,y-150*s,26*s,150*s,0,0,TAU);c.fill();c.fillStyle='#3a2a1a';c.fillRect(x-3*s,y-20*s,6*s,20*s);}}
// richer countryside: haze per layer, poplar rows, furrowed fields, dirt road, fences, haystacks, camp props
farmland=function(c,t,cam,o={}){const mood=o.mood||'day',night=mood==='night',dawn=mood==='dawn';
  const SK={day:['#4a7ab0','#a8c8e0','#e8e0c8'],dawn:['#3a3a6a','#d88a6a','#f8d0a0'],night:['#06080f','#121a2e','#1e2436'],dusk:['#2a2a4a','#c86a4a','#f0b070']}[mood];const g=c.createLinearGradient(0,0,0,H*0.8);g.addColorStop(0,SK[0]);g.addColorStop(0.6,SK[1]);g.addColorStop(1,SK[2]);c.fillStyle=g;c.fillRect(0,0,W,H);
  const sun=o.sun||(dawn?[260,980]:[820,260]);
  if(night){for(let i=0;i<90;i++){c.fillStyle=`rgba(255,255,255,${0.3+hash(i)*0.6})`;c.fillRect(hash(i)*W,hash(i*3)*1000,2,2);}c.fillStyle='#f4f0e0';c.beginPath();c.arc(820,280,46,0,TAU);c.fill();c.fillStyle='rgba(0,0,0,0.08)';c.beginPath();c.arc(808,270,12,0,TAU);c.arc(835,295,8,0,TAU);c.fill();sunGlow(c,820,280,'190,205,255',500,0.3);}
  else{sunGlow(c,sun[0],sun[1],dawn?'255,170,110':'255,240,200',dawn?900:700,dawn?0.7:0.4);}
  // clouds
  for(let i=0;i<6;i++){const cx=((i*330+t*8)%1700)-300,cy=180+hash(i)*360;c.fillStyle=night?'rgba(60,70,100,0.35)':(dawn?'rgba(255,190,160,0.5)':'rgba(255,255,255,0.55)');for(let k=0;k<5;k++){c.beginPath();c.ellipse(cx+k*60,cy-Math.sin(k)*20,90,40,0,0,TAU);c.fill();}}
  const hz=(col,k)=>night?shd2(col,-0.6+k*0.1):(dawn?mixC(col,'#e8a888',0.55-k*0.15):mixC(col,'#c8d8e8',0.55-k*0.15));
  world(c,par(cam,0.15),()=>{c.fillStyle=hz('#6a7a8a',0);c.beginPath();c.moveTo(-3000,GY-300);for(let x=-3000;x<=3000;x+=120)c.lineTo(x,GY-300-Math.sin(x*0.0018)*110-hash(x)*30);c.lineTo(3000,GY);c.lineTo(-3000,GY);c.fill();});
  world(c,par(cam,0.35),()=>{c.fillStyle=hz('#5a7a4a',1);c.beginPath();c.moveTo(-3000,GY-190);for(let x=-3000;x<=3000;x+=100)c.lineTo(x,GY-190-Math.sin(x*0.003+1)*60);c.lineTo(3000,GY);c.lineTo(-3000,GY);c.fill();
    poplars(c,-2600,-1200,GY-150,0.7,hz('#3a5a2e',1));poplars(c,900,2400,GY-160,0.7,hz('#3a5a2e',1));
    const vx=o.village??-300;for(let i=0;i<7;i++){const hx=vx+i*80,hy=GY-200-hash(i)*20;c.fillStyle=hz('#c8b8a0',1);c.fillRect(hx,hy,70,70);c.fillStyle=hz('#9a4a3a',1);c.beginPath();c.moveTo(hx-6,hy);c.lineTo(hx+35,hy-34);c.lineTo(hx+76,hy);c.fill();c.fillStyle=night?'rgba(255,200,120,0.6)':hz('#3a3a4a',1);c.fillRect(hx+24,hy+24,14,18);}
    c.fillStyle=hz('#c8b8a0',1);c.fillRect(vx+250,GY-330,46,180);c.fillStyle=hz('#4a4a5a',1);c.beginPath();c.moveTo(vx+244,GY-330);c.lineTo(vx+273,GY-440);c.lineTo(vx+302,GY-330);c.fill();});
  world(c,par(cam,0.65),()=>{c.fillStyle=hz('#6a8a4a',2);c.fillRect(-4000,GY-140,8000,200);for(let i=-30;i<30;i++){const hx=i*120;c.fillStyle=hz(['#3a5a2a','#2e4e24','#44683a'][(i+30)%3],2);c.beginPath();c.arc(hx,GY-120,60+hash(i*5)*30,Math.PI,TAU);c.fill();}
    for(let i=-6;i<6;i++)haystack(c,i*520+200,GY-70,0.6,mood);});
  world(c,cam,()=>{const fg=c.createLinearGradient(0,GY-80,0,GY+900);fg.addColorStop(0,night?'#1e2a1a':(dawn?'#7a7a4a':'#7a9a4e'));fg.addColorStop(1,night?'#141c12':(dawn?'#4a5a30':'#4e6e30'));c.fillStyle=fg;c.fillRect(cam.x-4000,GY-80,8000,1800);
    c.strokeStyle=night?'rgba(0,0,0,0.25)':'rgba(70,60,30,0.18)';c.lineWidth=5;for(let i=0;i<14;i++){c.beginPath();c.moveTo(cam.x-4000,GY-60+i*i*6);c.lineTo(cam.x+4000,GY-60+i*i*6);c.stroke();} // furrows
    if(o.road){c.fillStyle=night?'#2a2620':'#9a8a62';c.beginPath();c.moveTo(cam.x-4000,GY+o.road);c.lineTo(cam.x+4000,GY+o.road);c.lineTo(cam.x+4000,GY+o.road+160);c.lineTo(cam.x-4000,GY+o.road+160);c.fill();c.strokeStyle='rgba(0,0,0,0.2)';c.lineWidth=8;for(const k of [40,110]){c.beginPath();c.moveTo(cam.x-4000,GY+o.road+k);c.lineTo(cam.x+4000,GY+o.road+k);c.stroke();}}
    if(o.fence)fencePosts(c,cam.x-2500,cam.x+2500,GY-40,1);
    c.fillStyle=night?'#22301c':'#56763a';for(let i=0;i<260;i++){const gx=cam.x-3000+hash(i)*6000,gy=GY-50+hash(i*3)*760;c.fillRect(gx,gy,3,-8-hash(i*5)*16);}
    if(o.tracks){c.strokeStyle='rgba(60,50,30,0.35)';c.lineWidth=30;for(const yy of [GY+200,GY+280]){c.beginPath();c.moveTo(cam.x-3000,yy);c.lineTo(cam.x+3000,yy+20);c.stroke();}}
    if(o.camp){tent(c,-900,GY-20,1.0);tent(c,-1300,GY+30,1.2,'#5e5e3e');crateStack(c,-560,GY+40,1.2);jerrycans(c,-480,GY+90,1.1);sandbags(c,700,GY+40,6,1.0);tent(c,1200,GY+10,1.1);}
    if(o.world)o.world(c);});
  if(o.mistY)mist(c,t,o.mistY,night?0.18:0.35);
  if(night){c.fillStyle='rgba(10,20,60,0.3)';c.fillRect(0,0,W,H);}else if(dawn){godRays(c,sun[0],sun[1],'255,190,130',0.1,9,2600,1.0,-0.2);grade2(c,'#ff9a60','#3a2a60',0.35);}else{godRays(c,sun[0],sun[1],'255,245,210',0.07,7,2400,1.2,1.9);}};
function mixC(a,b,k){const A=shd(a,0).match(/\d+/g).map(Number),B=shd(b,0).match(/\d+/g).map(Number);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('');}
// richer tent interior for the radio room
const _tent0=tentInterior;tentInterior=function(c,t,o={}){_tent0(c,t,o);
  // map pinned on canvas wall, clipboard, rifles leaning, crate table
  c.save();c.translate(170,560);c.rotate(-0.04);c.fillStyle='#e8dcc0';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(0,0,280,200);c.strokeRect(0,0,280,200);c.strokeStyle='#5a8ac0';c.lineWidth=6;c.beginPath();c.moveTo(170,0);c.bezierCurveTo(140,80,200,120,160,200);c.stroke();c.fillStyle='#c8201a';for(const [px,py] of [[60,60],[220,140],[110,150]]){c.beginPath();c.arc(px,py,8,0,TAU);c.fill();}c.restore();
  c.fillStyle='#e8e4d8';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(820,620,150,200);c.strokeRect(820,620,150,200);c.fillStyle='#6a4a2a';c.fillRect(860,606,70,20);for(let i=0;i<6;i++){c.fillStyle='rgba(40,40,40,0.5)';c.fillRect(840,660+i*24,110-hash(i)*40,5);}
  for(const rx of [60,95]){c.strokeStyle='#4a3420';c.lineWidth=14;c.beginPath();c.moveTo(rx,1300);c.lineTo(rx+40,820);c.stroke();c.strokeStyle='#2a2a2a';c.lineWidth=8;c.beginPath();c.moveTo(rx+30,950);c.lineTo(rx+46,760);c.stroke();}
  c.fillStyle='rgba(255,230,180,0.06)';for(let i=0;i<40;i++){const p=(t*0.05+hash(i))%1;c.beginPath();c.arc(hash(i*3)*W,1300-p*1100,2+hash(i)*2,0,TAU);c.fill();}};
// German HQ interior: plank walls, wall map, stove-pipe, lamp light
function germanHQ(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#4a3a2a');g.addColorStop(1,'#1e160e');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=4;for(let x=0;x<W;x+=90){c.beginPath();c.moveTo(x+hash(x)*10,0);c.lineTo(x,1300);c.stroke();}for(let i=0;i<30;i++){c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.ellipse(hash(i)*W,hash(i*3)*1300,6,10,0,0,TAU);c.fill();}
  // big wall map
  warMap(c,140,330,800,560,{label:'RHEIN',draw:o.mapDraw});c.fillStyle='#3a2a1a';c.fillRect(120,310,840,20);
  // window with night blue
  c.fillStyle='#1a2440';c.fillRect(-10,980,170,260);c.strokeStyle=K2;c.lineWidth=6;c.strokeRect(-10,980,170,260);c.fillStyle='rgba(180,200,255,0.4)';c.fillRect(75,980,5,260);
  c.fillStyle='#2a1e14';c.fillRect(0,1300,W,620);c.strokeStyle=K2;c.strokeRect(-5,1300,W+10,24);
  lampPool(c,540,1150,900,'255,190,110',0.35);}
