'use strict';
// ===================== Antwerp diamond heist · 3D sets =====================
function ahTex(){if(TX.ahok)return;TX.ahok=1;
  TX.bark=TX.bark||cvTex(256,512,(x,w,h)=>{x.fillStyle='#4a4038';x.fillRect(0,0,w,h);x.strokeStyle='rgba(20,14,8,0.55)';x.lineWidth=4;for(let i=0;i<14;i++){x.beginPath();const xx=i*20;x.moveTo(xx,0);x.bezierCurveTo(xx+8,h*0.3,xx-8,h*0.6,xx+4,h);x.stroke();}speck(x,w,h,400,['rgba(110,120,90,0.35)','rgba(200,200,190,0.15)'],3);},{repeat:1});
  // wall of steel safe-deposit boxes: mixed sizes, brushed steel, numbered brass plates, twin keyholes
  TX.boxes=cvTex(1024,1024,(x,w,h)=>{x.fillStyle='#3a3e46';x.fillRect(0,0,w,h);const rows=[90,90,120,120,150,90,120,90,154];let y=0;let n=1;
    rows.forEach((rh,r)=>{const cw=r%3===2?170:128;let xx=0;while(xx<w){const bw=Math.min(cw,w-xx);const g=x.createLinearGradient(xx,y,xx+bw,y+rh);g.addColorStop(0,'#c9ced6');g.addColorStop(0.5,'#a9afb9');g.addColorStop(1,'#8e95a0');x.fillStyle=g;x.fillRect(xx+4,y+4,bw-8,rh-8);
      x.strokeStyle='rgba(255,255,255,0.18)';x.lineWidth=1;for(let k=0;k<10;k++){x.beginPath();x.moveTo(xx+6,y+8+k*(rh-16)/10);x.lineTo(xx+bw-6,y+8+k*(rh-16)/10);x.stroke();}
      x.strokeStyle='#2a2e36';x.lineWidth=3;x.strokeRect(xx+4,y+4,bw-8,rh-8);x.strokeStyle='rgba(255,255,255,0.45)';x.lineWidth=2;x.beginPath();x.moveTo(xx+6,y+rh-6);x.lineTo(xx+6,y+6);x.lineTo(xx+bw-6,y+6);x.stroke();
      // brass number plate + two keyholes + small handle
      const cx=xx+bw/2,cy=y+rh/2;x.fillStyle='#c8a050';x.fillRect(cx-20,y+12,40,14);x.fillStyle='#4a3a1a';x.font='bold 11px sans-serif';x.textAlign='center';x.fillText(String(n++),cx,y+23);
      for(const dx of [-16,16]){x.fillStyle='#d8c070';x.beginPath();x.arc(cx+dx,cy+6,8,0,TAU);x.fill();x.fillStyle='#1a1a1a';x.beginPath();x.arc(cx+dx,cy+4,2.6,0,TAU);x.fill();x.fillRect(cx+dx-1.2,cy+4,2.4,7);}
      x.fillStyle='#5a606a';x.fillRect(cx-14,y+rh-24,28,6);xx+=bw;}
      y+=rh;});},{repeat:1});
  TX.vfloor=cvTex(512,512,(x,w,h)=>{for(let r=0;r<4;r++)for(let c=0;c<4;c++){x.fillStyle=`hsl(35,8%,${58+hash(r*4+c)*8}%)`;x.fillRect(c*128,r*128,128,128);x.strokeStyle='rgba(40,36,30,0.6)';x.lineWidth=3;x.strokeRect(c*128,r*128,128,128);}
    speck(x,w,h,700,['rgba(255,255,255,0.18)','rgba(60,50,40,0.12)'],2);},{repeat:1});
  TX.concrete=cvTex(512,512,(x,w,h)=>{x.fillStyle='#a6a29a';x.fillRect(0,0,w,h);speck(x,w,h,2200,['rgba(70,66,60,0.25)','rgba(255,255,255,0.18)'],2);x.strokeStyle='rgba(60,56,50,0.35)';x.lineWidth=2;for(let i=0;i<4;i++){x.beginPath();x.moveTo(0,i*128);x.lineTo(w,i*128);x.stroke();}},{repeat:1});
  TX.paint=cvTex(512,512,(x,w,h)=>{x.fillStyle='#d8d2c0';x.fillRect(0,0,w,h*0.55);x.fillStyle='#5a6a62';x.fillRect(0,h*0.55,w,h*0.45);x.fillStyle='#3a4640';x.fillRect(0,h*0.55,w,10);speck(x,w,h,900,['rgba(90,80,70,0.12)','rgba(255,255,255,0.12)'],2);},{repeat:1});
  TX.lino=cvTex(256,256,(x,w,h)=>{x.fillStyle='#6a665e';x.fillRect(0,0,w,h);for(let r=0;r<4;r++)for(let c=0;c<4;c++){x.fillStyle=(r+c)%2?'#76726a':'#625e56';x.fillRect(c*64,r*64,64,64);}speck(x,w,h,400,['rgba(255,255,255,0.1)'],2);},{repeat:1});
  TX.parquet=cvTex(512,512,(x,w,h)=>{for(let r=0;r<16;r++)for(let c=0;c<4;c++){const o=(r%2)*64;x.fillStyle=['#8a5a34','#7a4e2c','#94623a','#6e4428'][(r+c)%4];x.fillRect(c*128+o-64,r*32,128,32);x.strokeStyle='rgba(30,16,8,0.5)';x.lineWidth=2;x.strokeRect(c*128+o-64,r*32,128,32);}},{repeat:1});
  TX.wallp=cvTex(512,512,(x,w,h)=>{x.fillStyle='#e6dcc4';x.fillRect(0,0,w,h);x.strokeStyle='rgba(160,140,100,0.25)';x.lineWidth=6;for(let i=0;i<w;i+=40){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();}speck(x,w,h,500,['rgba(140,120,90,0.15)'],2);},{repeat:1});
  // Antwerp rooftops seen from the office window
  TX.roofs=cvTex(1024,512,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#8fb4e0');g.addColorStop(1,'#d8e4ee');x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle='#9aa4b4';x.fillRect(560,40,46,300);x.beginPath();x.moveTo(552,44);x.lineTo(583,-60);x.lineTo(614,44);x.fill();for(let k=0;k<5;k++){x.fillStyle='#7a8494';x.fillRect(566,80+k*50,34,20);}
    for(let i=0;i<14;i++){const bx=i*78-20,bh=170+hash(i)*120,bw=82;x.fillStyle=['#a8644a','#c89a70','#8a7060','#b8a088','#9a5a44'][i%5];x.beginPath();x.moveTo(bx,h);x.lineTo(bx,h-bh);for(let s=0;s<4;s++){x.lineTo(bx+s*bw/8,h-bh-s*18);x.lineTo(bx+(s+1)*bw/8,h-bh-s*18);}x.lineTo(bx+bw/2,h-bh-80);for(let s=3;s>=0;s--){x.lineTo(bx+bw-(s+1)*bw/8,h-bh-s*18);x.lineTo(bx+bw-s*bw/8,h-bh-s*18);}x.lineTo(bx+bw,h);x.fill();
      x.fillStyle='rgba(40,50,70,0.6)';for(let r=0;r<3;r++)for(let c=0;c<3;c++)x.fillRect(bx+12+c*24,h-bh+20+r*50,12,26);}},{});
  // facades
  TX.dcFacade=cvTex(512,1024,(x,w,h)=>{x.fillStyle='#6e6c68';x.fillRect(0,0,w,h);for(let r=0;r<9;r++){x.fillStyle='#3a3c42';x.fillRect(0,40+r*108,w,52);x.fillStyle='rgba(120,150,190,0.8)';for(let c=0;c<6;c++){x.fillRect(10+c*84,46+r*108,72,40);}x.fillStyle='rgba(255,255,255,0.35)';for(let c=0;c<6;c++)x.fillRect(12+c*84,48+r*108,20,8);}
    speck(x,w,h,1200,['rgba(50,50,50,0.15)','rgba(255,255,255,0.12)'],2);},{repeat:1});
  TX.brick=cvTex(512,512,(x,w,h)=>{x.fillStyle='#7a3e2e';x.fillRect(0,0,w,h);for(let r=0;r<32;r++)for(let c=0;c<9;c++){const o=(r%2)*28;x.fillStyle=`hsl(${12+hash(r*9+c)*10},${40+hash(c+r)*15}%,${30+hash(r+c*3)*12}%)`;x.fillRect(c*58+o-28+2,r*16+2,54,12);}},{repeat:1});
  TX.cobble=cvTex(512,512,(x,w,h)=>{x.fillStyle='#3e3c3a';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let c=0;c<12;c++){const o=(r%2)*22;x.fillStyle=`hsl(30,6%,${34+hash(r*12+c)*16}%)`;x.beginPath();x.ellipse(c*44+o,r*32+16,19,13,0,0,TAU);x.fill();}},{repeat:1});
  TX.asphalt=cvTex(512,512,(x,w,h)=>{x.fillStyle='#3a3a3e';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(255,255,255,0.08)','rgba(0,0,0,0.2)'],2);},{repeat:1});
  TX.grassW=cvTex(512,512,(x,w,h)=>{x.fillStyle='#5a6238';x.fillRect(0,0,w,h);speck(x,w,h,2600,['rgba(150,140,80,0.35)','rgba(40,50,20,0.35)','rgba(120,90,50,0.3)'],3);},{repeat:1});
  TX.leaves=cvTex(512,512,(x,w,h)=>{x.fillStyle='#4a3a26';x.fillRect(0,0,w,h);for(let i=0;i<1200;i++){x.save();x.translate(hash(i*1.3)*w,hash(i*2.7)*h);x.rotate(hash(i*5.1)*TAU);x.fillStyle=['#8a5a2a','#6a4a22','#a0682e','#5a4a2a','#7a6a3a'][i%5];x.beginPath();x.ellipse(0,0,9,5,0,0,TAU);x.fill();x.restore();}},{repeat:1});
}
// round vault door (3D): thick disc, bolt ring, spoked wheel, dial; hinged on its left edge, angle a (0 = shut)
function vaultDoor3(g,cx,cy,cz,R,a){const M0=M4.chain(M4.T(cx-R,cy,cz),M4.RY(-a),M4.T(R,0,0));
  G.cyl(g,M4.chain(M0,M4.RX(Math.PI/2),M4.S(R,0.45,R),M4.T(0,-0.5,0)),'#b8bcc4',{seg:40});
  G.cyl(g,M4.chain(M0,M4.T(0,0,0.24),M4.RX(Math.PI/2),M4.S(R*0.86,0.04,R*0.86)),'#9aa0aa',{seg:40});
  for(let i=0;i<16;i++){const t=i/16*TAU;G.cyl(g,M4.chain(M0,M4.T(Math.cos(t)*R*0.93,Math.sin(t)*R*0.93,0.2),M4.RX(Math.PI/2),M4.S(0.05,0.08,0.05)),'#d8dce4',{seg:10});}
  G.cyl(g,M4.chain(M0,M4.T(0,0,0.27),M4.RX(Math.PI/2),M4.S(0.12,0.12,0.12)),'#5a606a',{seg:14});
  for(let i=0;i<4;i++){const t=i/4*TAU+0.4;G.box(g,M4.chain(M0,M4.T(0,0,0.36),M4.RZ(t),M4.S(0.05,R*0.62,0.05)),'#3a3e46',{base:1});G.sphere(g,M4.chain(M0,M4.T(-Math.sin(t)*R*0.62,Math.cos(t)*R*0.62,0.36),M4.S(0.06)),'#3a3e46');}
  G.cyl(g,M4.chain(M0,M4.T(R*0.5,R*0.4,0.27),M4.RX(Math.PI/2),M4.S(0.16,0.06,0.16)),'#2a2c32',{seg:24});G.cyl(g,M4.chain(M0,M4.T(R*0.5,R*0.4,0.33),M4.RX(Math.PI/2),M4.S(0.1,0.05,0.1)),'#d8d0b0',{seg:20});
  // locking bars sticking out of the door edge
  for(let i=0;i<6;i++){const t=i/6*TAU;G.cyl(g,M4.chain(M0,M4.T(Math.cos(t)*R,Math.sin(t)*R,0),M4.RZ(t-Math.PI/2),M4.S(0.06,0.18,0.06)),'#d0d4dc',{seg:8});}}
function doorFrame3(g,cx,cy,cz,R){for(let i=0;i<28;i++){const t=i/28*TAU;G.box(g,M4.chain(M4.T(cx+Math.cos(t)*(R+0.12),cy+Math.sin(t)*(R+0.12),cz),M4.RZ(t),M4.S(0.26,0.3,0.6)),'#7a7e86',{shade:1});}}

// ---------- the vault: walls of boxes, polished tiles, strip lights, steel table; open round door on the right ----------
function buildVault(o={}){texInit();ahTex();const g=new Geo(),lg=new Geo(),D=[];const H=2.8;
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1),M4.S(8,1,7)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.vfloor,col:[1,1,1],spec:1.2,rim:0});
  const ce=new Geo();G.box(ce,M4.chain(M4.T(0,H,-1),M4.S(8,0.1,7)),[1,1,1],{base:1});D.push({mesh:mesh(ce),M:M4.id(),col:[0.62,0.62,0.6],rim:0,noShadow:1});
  // box walls: back (z=-4), left (x=-3.6); right wall carries the door
  D.push({mesh:VPL(7.2,H),M:M4.chain(M4.T(0,H/2,-3.98)),tex:TX.boxes,col:[1,1,1],spec:1,rim:0,noShadow:1});
  D.push({mesh:VPL(5.6,H),M:M4.chain(M4.T(-3.58,H/2,-1.2),M4.RY(Math.PI/2)),tex:TX.boxes,col:[0.95,0.95,0.97],spec:1,rim:0,noShadow:1});
  const rw=new Geo();G.box(rw,M4.chain(M4.T(3.62,0,-1.2),M4.S(0.2,H,5.6)),[1,1,1],{base:1});D.push({mesh:mesh(rw),M:M4.id(),tex:TX.concrete,col:[0.85,0.85,0.88],rim:0,noShadow:1});
  // skirting + steel trims
  BX(g,[0,0,-3.9],[7.2,0.12,0.06],'#2a2e36');BX(g,[-3.5,0,-1.2],[0.06,0.12,5.6],'#2a2e36');BX(g,[0,H-0.14,-3.9],[7.2,0.14,0.06],'#2a2e36');
  // fluorescent strips
  for(const z of [-3.0,-1.4,0.2])for(const x of [-1.6,1.6])BX(lg,[x,H-0.06,z],[1.4,0.05,0.18],'#ffffff');
  // steel table (centre) + a heat/motion sensor in the far corner + the light sensor on the ceiling
  BX(g,[0,0.82,-1.6],[1.8,0.05,0.9],'#9aa0aa');for(const [x,z] of [[-0.82,-1.98],[0.82,-1.98],[-0.82,-1.22],[0.82,-1.22]])BX(g,[x,0,z],[0.05,0.82,0.05],'#6a707a');
  BX(g,[-3.4,2.45,-3.8],[0.22,0.16,0.14],'#e8e8e4',{ry:0.6});G.sphere(g,M4.chain(M4.T(-3.33,2.48,-3.7),M4.S(0.07)),'#2a2a2e');
  BX(g,[0.3,H-0.08,-2.4],[0.18,0.06,0.18],'#e8e8e4');
  // the round door, swung open into the room, with its frame in the right wall
  doorFrame3(g,3.52,1.15,1.0,1.0);vaultDoor3(g,3.26,1.15,1.0+0.0,1.0,o.door??1.6);
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,1],emis:[1.6,1.6,1.5],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.8});
  return {D,pts:[[0,2.5,-1.4,6,[1.4,1.45,1.5]],[0,2.5,0.6,5,[1.0,1.05,1.1]]]};}

// ---------- the basement corridor that ends in the vault door ----------
function buildCorr(a){texInit();ahTex();const g=new Geo(),lg=new Geo(),D=[];const H=2.7,W2=1.4,Z1=-8;
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-3),M4.S(2*W2,1,14)),[1,1,1],{uv:6});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.lino,col:[0.95,0.95,0.95],spec:0.8,rim:0});
  for(const sd of [-1,1]){D.push({mesh:VPL(14,H),M:M4.chain(M4.T(sd*W2,H/2,-3),M4.RY(-sd*Math.PI/2)),tex:TX.paint,col:[1,1,1],rim:0,noShadow:1});}
  const ce=new Geo();G.box(ce,M4.chain(M4.T(0,H,-3),M4.S(2*W2,0.1,14)),[1,1,1],{base:1});D.push({mesh:mesh(ce),M:M4.id(),col:[0.55,0.55,0.52],rim:0,noShadow:1});
  // pipes and cable trays along the ceiling
  for(const [x,r,col] of [[-0.9,0.07,'#8a6a4a'],[-0.65,0.05,'#6a7a8a'],[0.95,0.09,'#7a7e86']])G.cyl(g,M4.chain(M4.T(x,H-0.25,-10),M4.RX(Math.PI/2),M4.S(r,14,r)),col,{seg:10});
  BX(g,[0.5,H-0.16,-3],[0.4,0.04,14],'#5a5e66');
  // end wall + steel frame + the door (angle a)
  const ew=new Geo();G.box(ew,M4.chain(M4.T(0,0,Z1-0.1),M4.S(2*W2,H,0.2)),[1,1,1],{base:1});D.push({mesh:mesh(ew),M:M4.id(),tex:TX.concrete,col:[0.9,0.9,0.92],rim:0});
  doorFrame3(g,0,1.2,Z1+0.25,1.0);
  if(a>0.05){// the dark vault beyond, glowing
    const bk=new Geo();G.cyl(bk,M4.chain(M4.T(0,1.2,Z1-0.05),M4.RX(Math.PI/2),M4.S(1.0,0.1,1.0)),[1,1,1],{seg:36});D.push({mesh:mesh(bk),M:M4.id(),tex:TX.boxes,col:[1,1,1],emis:[0.55,0.58,0.62],rim:0,noShadow:1});}
  vaultDoor3(g,0,1.2,Z1+0.5,1.0,a);
  for(let i=0;i<4;i++)BX(lg,[0,H-0.06,-1-i*2.2],[0.18,0.05,1.0],'#ffffff');
  // sensor boxes on the walls by the door
  BX(g,[-1.25,2.3,Z1+0.6],[0.16,0.18,0.12],'#e8e8e4');G.sphere(g,M4.chain(M4.T(-1.2,2.32,Z1+0.68),M4.S(0.05)),'#c82a2a');
  BX(g,[1.3,1.0,Z1+0.5],[0.08,0.4,0.3],'#9aa0aa');
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,1],emis:[1.2,1.2,1.1],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.7});
  return {D,pts:[[0,2.4,-2,5,[1.0,1.0,0.95]],[0,2.4,-6.5,5,[1.1,1.1,1.05]]]};}

// ---------- Leo's office inside the diamond centre ----------
function buildOffice(){texInit();ahTex();const g=new Geo(),lg=new Geo(),D=[];const H=2.8;
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1),M4.S(7,1,7)),[1,1,1],{uv:3});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.parquet,col:[1,1,1],spec:0.8,rim:0});
  D.push({mesh:VPL(7,H),M:M4.chain(M4.T(0,H/2,-3.2)),tex:TX.wallp,col:[1,1,1],rim:0,noShadow:1});
  D.push({mesh:VPL(6,H),M:M4.chain(M4.T(-3.0,H/2,-0.5),M4.RY(Math.PI/2)),tex:TX.wallp,col:[0.95,0.95,0.95],rim:0,noShadow:1});
  // big window in the back wall with Antwerp beyond
  D.push({mesh:VPL(2.4,1.4),M:M4.chain(M4.T(1.1,1.65,-3.18)),tex:TX.roofs,col:[1,1,1],emis:[0.7,0.72,0.75],rim:0,noShadow:1});
  for(const x of [-0.1,1.1,2.3])BX(g,[x,0.95,-3.15],[0.07,1.4,0.06],'#f4f0e8');for(const y of [0.92,1.62,2.34])BX(g,[1.1,y,-3.15],[2.5,0.07,0.06],'#f4f0e8');BX(g,[1.1,0.86,-3.05],[2.6,0.06,0.2],'#f4f0e8');
  // desk with green lamp, phone, ledger, a velvet tray of diamonds, loupe
  BX(g,[-0.3,0,-1.6],[1.9,0.78,0.85],'#5a3420');BX(g,[-0.3,0.78,-1.6],[2.0,0.05,0.92],'#6e4228');
  const gl=new Geo();G.cyl(gl,M4.chain(M4.T(-1.0,0.83,-1.85),M4.S(0.05,0.36,0.05)),'#c8a050',{seg:8});G.cyl(gl,M4.chain(M4.T(-1.0,1.18,-1.75),M4.RX(Math.PI/2),M4.S(0.12,0.4,0.08),M4.T(0,-0.5,0)),'#2a7a4a',{seg:16});D.push({mesh:mesh(gl),M:M4.id(),col:[1,1,1],rim:0.2,spec:1});
  BX(lg,[-1.0,1.12,-1.75],[0.3,0.02,0.16],'#ffffff');
  BX(g,[0.5,0.83,-1.85],[0.24,0.08,0.2],'#1a1a1e');BX(g,[0.5,0.91,-1.85],[0.26,0.04,0.08],'#1a1a1e');
  BX(g,[-0.2,0.83,-1.5],[0.5,0.03,0.36],'#7a2a2a');BX(g,[-0.2,0.86,-1.5],[0.48,0.01,0.34],'#f2ecd8');
  BX(g,[0.25,0.83,-1.4],[0.34,0.03,0.24],'#1a2a5a');
  // leather chair, filing cabinet, small office safe, coat stand, framed certificate, plant
  BX(g,[-0.3,0,-2.5],[0.6,0.48,0.6],'#3a2018');BX(g,[-0.3,0.48,-2.78],[0.6,0.8,0.12],'#3a2018');
  BX(g,[-2.6,0,-2.7],[0.6,1.3,0.6],'#7a8088');for(const y of [0.25,0.68,1.1])BX(g,[-2.6,y,-2.39],[0.3,0.04,0.02],'#2a2a2e');
  BX(g,[2.5,0,-2.6],[0.7,0.8,0.6],'#3a3e46');G.cyl(g,M4.chain(M4.T(2.5,0.42,-2.29),M4.RX(Math.PI/2),M4.S(0.1,0.04,0.1)),'#c8c8c8',{seg:16});
  G.cyl(g,M4.chain(M4.T(-2.6,0,-1.0),M4.S(0.03,1.8,0.03)),'#3a2418',{seg:8});G.sphere(g,M4.chain(M4.T(-2.55,1.62,-1.0),M4.S(0.18,0.26,0.12)),'#4a4a52');
  BX(g,[-1.0,1.6,-3.17],[0.6,0.45,0.03],'#c8a050');BX(g,[-1.0,1.63,-3.15],[0.5,0.36,0.01],'#f4ecd4');
  G.cyl(g,M4.chain(M4.T(2.6,0,-1.2),M4.S(0.2,0.4,0.2)),'#b86a44',{seg:14,rt:0.8});for(let i=0;i<8;i++)G.box(g,M4.chain(M4.T(2.6,0.4,-1.2),M4.RY(i*0.8),M4.RZ(0.4+hash(i)*0.3),M4.S(0.07,0.7,0.02)),'#3e7a44',{base:1});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,1],emis:[1.6,1.3,0.8],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});
  return {D,pts:[[-1.0,1.0,-1.6,2.5,[1.6,1.2,0.7]]]};}

// ---------- the diamond district street: the Antwerp Diamond Centre + old step-gabled houses, cathedral spire ----------
function buildDStreet(){texInit();ahTex();const g=new Geo(),lg=new Geo(),D=[];
  const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0,2),M4.S(30,1,16)),[1,1,1],{uv:8});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.cobble,col:[1,1,1],spec:0.6,rim:0});
  const sw=new Geo();G.box(sw,M4.chain(M4.T(0,0,-1.6),M4.S(30,0.14,2.4)),[1,1,1],{base:1});D.push({mesh:mesh(sw),M:M4.id(),tex:TX.paving||TX.concrete,col:[0.9,0.9,0.9],rim:0});
  // diamond centre: modern grey block with ribbon windows, recessed glass entrance, steps
  const dc=new Geo();G.box(dc,M4.chain(M4.T(0,0,-5.8),M4.S(9,14,6)),[1,1,1],{base:1,uvs:[2,3]});D.push({mesh:mesh(dc),M:M4.id(),tex:TX.dcFacade,col:[1,1,1],rim:0.1,spec:0.4});
  BX(g,[0,0,-2.75],[3.2,3.0,0.1],'#2a2c32');const gls=new Geo();G.box(gls,M4.chain(M4.T(0,0.2,-2.7),M4.S(2.8,2.5,0.04)),[1,1,1],{base:1});D.push({mesh:mesh(gls),M:M4.id(),col:[0.5,0.6,0.7],emis:[0.35,0.32,0.25],spec:1.6,rim:0.2});
  BX(g,[0,0.2,-2.66],[0.06,2.5,0.04],'#1a1a1e');BX(g,[0,2.7,-2.5],[3.6,0.18,0.6],'#3a3c42');for(const s of [0,1])BX(g,[0,s*0.1,-2.3+s*0.25],[3.6-s*0.3,0.1,0.5],'#8a8680');
  // security camera + bollards
  BX(g,[1.9,2.5,-2.55],[0.3,0.12,0.14],'#e8e8e4',{ry:-0.4});for(const x of [-2.6,-1.8,1.8,2.6])G.cyl(g,M4.chain(M4.T(x,0.14,-0.8),M4.S(0.1,0.8,0.1)),'#2a2c30',{seg:10});
  // old houses either side with stepped gables
  const hs=new Geo();const houses=[[-8.2,3.2,9],[-11.6,3.4,10.5],[8.2,3.2,9.6],[11.6,3.4,8.6]];for(const [x,w,h] of houses){G.box(hs,M4.chain(M4.T(x,0,-5.2),M4.S(w,h,5)),[1,1,1],{base:1,uvs:[1.5,2]});
    for(let s=0;s<4;s++)G.box(hs,M4.chain(M4.T(x,h+s*0.5,-2.75),M4.S(w-s*0.8,0.5,0.3)),[1,1,1],{base:1});}D.push({mesh:mesh(hs),M:M4.id(),tex:TX.brick,col:[1,1,1],rim:0.12});
  const hw=new Geo();for(const [x,w,h] of houses)for(let r=0;r<3;r++)for(let c=-1;c<=1;c++)G.box(hw,M4.chain(M4.T(x+c*w*0.28,1.3+r*2.4,-2.69),M4.S(0.6,1.3,0.04)),[1,1,1],{base:1});D.push({mesh:mesh(hw),M:M4.id(),col:[0.4,0.48,0.58],emis:[0.42,0.34,0.2],spec:1.2,rim:0.2});
  // cathedral spire in the distance
  G.box(g,M4.chain(M4.T(-4,0,-30),M4.S(3,22,3)),'#9a9a96',{base:1});G.lathe(g,M4.chain(M4.T(-4,22,-30),M4.S(1)),'#8a8a86',[[1.6,0],[1.2,3],[0.8,6],[0.001,11]],{seg:8});
  // street lamps
  for(const x of [-4.6,4.6]){G.cyl(g,M4.chain(M4.T(x,0,-0.6),M4.S(0.07,3.6,0.07)),'#1a1a1e',{seg:8});BX(g,[x,3.6,-0.6],[0.3,0.12,0.3],'#1a1a1e');BX(lg,[x,3.42,-0.6],[0.22,0.18,0.22],'#ffffff');}
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,1],emis:[2.2,1.8,1.1],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12,spec:0.5});
  return {D,pts:[[-4.6,3.3,-0.4,7,[2.2,1.7,0.9]],[4.6,3.3,-0.4,7,[2.2,1.7,0.9]],[0,1.4,-2.2,4,[1.4,1.2,0.8]]]};}

// ---------- forest by the E19 motorway: bare winter woods, leaf litter, guard rail, asphalt ----------
function buildForest(){texInit();ahTex();const g=new Geo(),D=[];
  const gr=new Geo();G.plane(gr,M4.S(60,1,60),[1,1,1],{uv:14});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.leaves,col:[0.95,0.92,0.88],rim:0});
  const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.02,6.5),M4.S(60,1,6)),[1,1,1],{uv:10});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.asphalt,col:[1,1,1],spec:0.5,rim:0});
  const vg=new Geo();G.plane(vg,M4.chain(M4.T(0,0.015,3.0),M4.S(60,1,1.8)),[1,1,1],{uv:10});D.push({mesh:mesh(vg),M:M4.id(),tex:TX.grassW,col:[1,1,1],rim:0});
  for(let i=0;i<30;i++)BX(g,[-30+i*2,0.021,6.5],[1.0,0.004,0.12],'#e8e4d8');BX(g,[0,0.021,3.7],[60,0.004,0.1],'#e8e4d8');
  // guard rail
  for(let i=0;i<24;i++)BX(g,[-24+i*2,0,3.95],[0.08,0.6,0.08],'#8a8e96');BX(g,[0,0.42,4.0],[50,0.24,0.04],'#b8bcc4');
  // bare trees: trunks with forking branches; a few pines
  const tr=new Geo(),br=new Geo(),pn=new Geo();let k=0;
  for(let i=0;i<70;i++){const x=-16+hash(i*1.3)*32,z=-1-hash(i*2.9)*14;if(Math.abs(x)<1.6&&z>-3.5)continue;const h=5+hash(i*5)*4,r=0.12+hash(i*7)*0.12;
    if(i%6===0){pine(pn,x,z,1.1+hash(i)*0.4,i);continue;}
    G.cyl(tr,M4.chain(M4.T(x,0,z),M4.RZ((hash(i)-0.5)*0.1),M4.S(r,h,r)),[1,1,1],{seg:8,rt:0.5});
    for(let b=0;b<5;b++){const y=h*(0.45+b*0.1),a=hash(i*9+b)*TAU;G.cyl(br,M4.chain(M4.T(x,y,z),M4.RY(a),M4.RZ(0.7+hash(b+i)*0.4),M4.S(r*0.35,1.6-b*0.15,r*0.35)),[1,1,1],{seg:5,rt:0.3});
      for(let t2=0;t2<2;t2++)G.cyl(br,M4.chain(M4.T(x,y,z),M4.RY(a),M4.RZ(0.7+hash(b+i)*0.4),M4.T(0,1.0-t2*0.4,0),M4.RZ((t2?1:-1)*0.6),M4.S(r*0.18,0.8,r*0.18)),[1,1,1],{seg:4,rt:0.2});}k++;}
  // undergrowth: brambles + dead bracken mounds
  const ug=new Geo();for(let i=0;i<40;i++){const x=-12+hash(i*3.3)*24,z=-0.5-hash(i*4.1)*9;if(Math.abs(x)<1.2&&z>-2.5)continue;G.blob(ug,M4.chain(M4.T(x,0.1,z),M4.S(0.5+hash(i)*0.5,0.3+hash(i*2)*0.25,0.4+hash(i*5)*0.4)),[1,1,1],{seed:i,j:0.3,su:9,sv:5});}
  D.push({mesh:mesh(tr),M:M4.id(),tex:TX.bark,col:[0.75,0.72,0.7],rim:0.18});D.push({mesh:mesh(br),M:M4.id(),col:[0.3,0.26,0.24],rim:0.15});
  D.push({mesh:mesh(pn),M:M4.id(),col:[1,1,1],rim:0.18});D.push({mesh:mesh(ug),M:M4.id(),col:[0.45,0.34,0.22],rim:0.2});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.6});return {D,pts:[]};}

// ---------- forest clearing beside the E19: camera stands in the woods looking OUT at the motorway ----------
function buildForest2(){texInit();ahTex();const g=new Geo(),D=[];
  const gr=new Geo();G.plane(gr,M4.chain(M4.T(0,0,0),M4.S(80,1,60)),[1,1,1],{uv:18});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.leaves,col:[0.95,0.92,0.88],rim:0});
  // grass verge, the hard shoulder and two carriageways (road runs along x, far behind the clearing)
  const vg=new Geo();G.plane(vg,M4.chain(M4.T(0,0.01,5.4),M4.S(80,1,2.2)),[1,1,1],{uv:12});D.push({mesh:mesh(vg),M:M4.id(),tex:TX.grassW,col:[1,1,1],rim:0});
  const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.02,10.0),M4.S(80,1,7.0)),[1,1,1],{uv:12});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.asphalt,col:[1.5,1.5,1.55],spec:0.8,rim:0});
  BX(g,[0,0.025,6.75],[80,0.004,0.12],'#e8e4d8');for(let i=0;i<40;i++)BX(g,[-40+i*2,0.025,10.0],[1.0,0.004,0.12],'#e8e4d8');BX(g,[0,0.025,13.3],[80,0.004,0.12],'#e8e4d8');
  // guard rail along the verge
  for(let i=0;i<40;i++)BX(g,[-40+i*2,0,6.4],[0.08,0.62,0.08],'#8a8e96');BX(g,[0,0.42,6.42],[80,0.24,0.05],'#b8bcc4');
  // far side: more woods beyond the motorway
  const tr=new Geo(),br=new Geo(),pn=new Geo(),ug=new Geo();
  const bare=(x,z,i)=>{const h=5+hash(i*5)*4,r=0.12+hash(i*7)*0.12;G.cyl(tr,M4.chain(M4.T(x,0,z),M4.RZ((hash(i)-0.5)*0.1),M4.S(r,h,r)),[1,1,1],{seg:8,rt:0.5});
    for(let b=0;b<5;b++){const y=h*(0.45+b*0.1),a=hash(i*9+b)*TAU;G.cyl(br,M4.chain(M4.T(x,y,z),M4.RY(a),M4.RZ(0.7+hash(b+i)*0.4),M4.S(r*0.35,1.6-b*0.15,r*0.35)),[1,1,1],{seg:5,rt:0.3});
      for(let t2=0;t2<2;t2++)G.cyl(br,M4.chain(M4.T(x,y,z),M4.RY(a),M4.RZ(0.7+hash(b+i)*0.4),M4.T(0,1.0-t2*0.4,0),M4.RZ((t2?1:-1)*0.6),M4.S(r*0.18,0.8,r*0.18)),[1,1,1],{seg:4,rt:0.2});}};
  let k=0;for(let i=0;i<60;i++){const x=-24+hash(i*1.7)*48,z=15+hash(i*3.1)*10;(i%5===0)?pine(pn,x,z,1.2,i):bare(x,z,i);}
  // the woods around the camera: trees framing both sides of the clearing, none in the middle
  for(let i=0;i<120;i++){const x=-9+hash(i*2.3+5)*18,z=-6+hash(i*4.7+1)*9.5;if(Math.abs(x)<2.1)continue;if(z>3.4||z<-2.6)continue;bare(x,z,i+200);}
  // framing trunks at the edges of the shot, near and mid distance
  for(const [x,z] of [[-1.55,-0.6],[1.45,-0.2],[-1.75,1.6],[1.7,2.2],[-1.35,3.3],[1.25,3.6],[-2.0,0.6],[2.1,1.0]])bare(x,z,k++ +300);
  // undergrowth, dead bracken, a fallen log
  for(let i=0;i<46;i++){const x=-10+hash(i*3.3)*20,z=-2.5+hash(i*4.1)*6;if(Math.abs(x)<2.2)continue;G.blob(ug,M4.chain(M4.T(x,0.1,z),M4.S(0.5+hash(i)*0.5,0.3+hash(i*2)*0.25,0.4+hash(i*5)*0.4)),[1,1,1],{seed:i,j:0.3,su:9,sv:5});}
  G.cyl(g,M4.chain(M4.T(-2.6,0.16,1.6),M4.RZ(Math.PI/2),M4.RY(0.4),M4.S(0.17,2.0,0.17)),'#5a4632',{seg:10});
  D.push({mesh:mesh(tr),M:M4.id(),tex:TX.bark,col:[0.75,0.72,0.7],rim:0.18});D.push({mesh:mesh(br),M:M4.id(),col:[0.3,0.26,0.24],rim:0.15});
  D.push({mesh:mesh(pn),M:M4.id(),col:[1,1,1],rim:0.18});D.push({mesh:mesh(ug),M:M4.id(),col:[0.45,0.34,0.22],rim:0.2});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.6});return {D,pts:[]};}
// ---------- lighting moods ----------
LIGHT5.vaultCold={sunDir:[0.2,0.95,0.3],sunCol:[0.55,0.58,0.62],sky:[0.4,0.42,0.46],gnd:[0.3,0.3,0.32],fog:[0.2,0.22,0.26],fogD:0.01,fogH:0,skyTop:[0.2,0.2,0.22],skyHor:[0.2,0.2,0.22],skyBot:[0.1,0.1,0.1],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.45,thr:0.9,sat:1.0,expo:1.0,lift:[0.0,0.01,0.02],gain:[0.98,1.0,1.04],vig:1.25,ink:1}};
LIGHT5.vaultDark={sunDir:[0.2,0.95,0.3],sunCol:[0.12,0.14,0.22],sky:[0.08,0.09,0.14],gnd:[0.04,0.04,0.06],fog:[0.02,0.02,0.04],fogD:0.02,fogH:0,skyTop:[0,0,0],skyHor:[0,0,0],skyBot:[0,0,0],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.5,thr:0.8,sat:0.95,expo:0.9,lift:[0.0,0.0,0.03],gain:[0.92,0.98,1.1],vig:1.6,ink:1}};
LIGHT5.officeDay={sunDir:[0.4,0.6,0.7],sunCol:[1.2,1.05,0.85],sky:[0.5,0.48,0.44],gnd:[0.36,0.3,0.24],fog:[0.4,0.38,0.34],fogD:0.008,fogH:0,skyTop:[0.5,0.6,0.8],skyHor:[0.8,0.8,0.8],skyBot:[0.5,0.5,0.5],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.35,thr:1.0,sat:1.1,expo:1.02,lift:[0.01,0.0,0.0],gain:[1.05,1.0,0.94],vig:1.15,ink:1}};
LIGHT5.forestDawn={sunDir:[0.7,0.22,-0.6],sunCol:[1.3,0.95,0.7],sky:[0.5,0.5,0.56],gnd:[0.36,0.3,0.24],fog:[0.78,0.74,0.76],fogD:0.045,fogH:0,skyTop:[0.5,0.56,0.7],skyHor:[0.96,0.82,0.72],skyBot:[0.7,0.66,0.66],cloud:0.5,stars:0,sunSize:700,sunGlow:[1,0.8,0.6],
  post:{bloom:0.4,thr:0.95,sat:1.0,expo:1.04,lift:[0.02,0.02,0.04],gain:[1.02,0.98,0.96],vig:1.1,ink:1}};
LIGHT5.forestNight={sunDir:[0.3,0.6,0.5],sunCol:[0.2,0.26,0.5],sky:[0.1,0.12,0.22],gnd:[0.06,0.06,0.08],fog:[0.08,0.08,0.14],fogD:0.04,fogH:0,skyTop:[0.02,0.03,0.08],skyHor:[0.1,0.1,0.2],skyBot:[0.04,0.04,0.06],cloud:0.3,stars:1,sunSize:3000,sunGlow:[0.4,0.45,0.7],
  post:{bloom:0.6,thr:0.8,sat:1.05,expo:1.1,lift:[0.0,0.0,0.04],gain:[0.95,0.98,1.08],vig:1.3,ink:1}};
{const _gs=getSet;getSet=function(k){
  if(k==='vault')return SETS.vault||(SETS.vault=buildVault());
  if(k.startsWith('corr')){const a=+k.slice(4)||0;return SETS[k]||(SETS[k]=buildCorr(a/100));}
  if(k==='office')return SETS.office||(SETS.office=buildOffice());
  if(k==='dstreet')return SETS.dstreet||(SETS.dstreet=buildDStreet());
  if(k==='forest')return SETS.forest||(SETS.forest=buildForest());
  if(k==='forest2')return SETS.forest2||(SETS.forest2=buildForest2());
  return _gs(k);};}
PL.length=0;
PL.push(
 ['v_wide','vault','vaultCold',[0.6,1.7,3.2],[-0.6,1.2,-2.6],56],
 ['v_wall','vault','vaultCold',[-0.4,1.4,0.2],[-0.8,1.3,-4.0],60],
 ['v_door','vault','vaultCold',[-1.4,1.5,1.6],[3.2,1.1,0.4],52],
 ['v_dark','vault','vaultDark',[0.6,1.7,3.2],[-0.6,1.2,-2.6],56],
 ['v_corner','vault','vaultCold',[0.8,1.2,-0.6],[-3.4,2.3,-3.7],50],
 ['c_door0','corr0','vaultCold',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_door25','corr25','vaultCold',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_door60','corr60','vaultCold',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_door100','corr100','vaultCold',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_door160','corr160','vaultCold',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_low','corr0','vaultCold',[0.3,0.35,-4.2],[0,1.6,-8],62],
 ['c_dark','corr0','vaultDark',[0,1.5,1.2],[0,1.25,-8],46],
 ['c_darklow','corr0','vaultDark',[0.3,0.35,-4.2],[0,1.6,-8],62],
 ['o_wide','office','officeDay',[1.6,1.6,2.4],[-0.6,1.0,-2.2],52],
 ['o_desk','office','officeDay',[0.2,1.35,0.2],[-0.3,0.95,-2.4],48],
 ['s_day','dstreet','day',[-2.5,1.6,14],[0,5.0,-3],62],
 ['s_night','dstreet','streetNight',[-2.5,1.6,14],[0,5.0,-3],62],
 ['s_door','dstreet','day',[1.2,1.5,4.2],[0,1.5,-2.6],46],
 ['f_dawn','forest','forestDawn',[0.0,1.6,9.5],[0,1.2,-2],50],
 ['f_night','forest','forestNight',[0.0,1.6,9.5],[0,1.2,-2],50],
 ['f_floor','forest','forestDawn',[0.0,1.2,1.8],[0,0.1,-1.2],50],
 ['g_night','forest2','forestNight',[0.0,2.3,-4.6],[0,1.0,6.0],54],
 ['g_dawn','forest2','forestDawn',[0.0,2.3,-4.6],[0,1.0,6.0],54],
 ['g_floor','forest2','forestDawn',[0.3,1.45,-1.2],[0.3,0.0,1.0],52]);
