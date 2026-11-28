'use strict';
// ===================== Baby memories · 3D sets: nursery, neuroscience lab, rainy alley =====================
function bbBal(g,p,r,col){G.sphere(g,M4.chain(M4.T(p[0],p[1],p[2]),M4.S(r,r*1.18,r)),col,{su:20,sv:14});}
// ---------- nursery: first birthday ----------
function buildNursery(){texInit();const g=new Geo(),D=[];
  TX.nwall=TX.nwall||cvTex(512,512,(x,w,h)=>{x.fillStyle='#e9d6c4';x.fillRect(0,0,w,h);speck(x,w,h,500,['rgba(255,255,255,0.18)','rgba(120,90,70,0.06)'],3);
    for(let i=0;i<10;i++)for(let j=0;j<10;j++){if((i+j)%2)continue;const cx=i*52+26+(j%2)*10,cy=j*52+26;x.fillStyle=(i*3+j)%3?'rgba(246,200,120,0.55)':'rgba(150,190,210,0.5)';x.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,r=k%2?4:10;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);}x.fill();}},{repeat:1});
  TX.nwood=TX.nwood||cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=['#d8b088','#cca47c','#e0ba92','#c89c72'][i%4];x.fillRect(0,i*64,w,64);x.strokeStyle='rgba(90,60,30,0.45)';x.lineWidth=3;x.beginPath();x.moveTo(0,i*64);x.lineTo(w,i*64);x.stroke();
    x.strokeStyle='rgba(110,70,36,0.16)';x.lineWidth=2;for(let k=0;k<5;k++){const y=i*64+8+k*11;x.beginPath();x.moveTo(0,y);x.bezierCurveTo(w*0.3,y+5*Math.sin(i+k),w*0.6,y-5,w,y+3);x.stroke();}const ox=(i%3)*170;x.strokeStyle='rgba(90,60,30,0.45)';x.lineWidth=3;x.beginPath();x.moveTo(ox+90,i*64);x.lineTo(ox+90,i*64+64);x.stroke();}},{repeat:1});
  TX.nrug=TX.nrug||cvTex(512,512,(x,w,h)=>{x.fillStyle='#9fc2c8';x.fillRect(0,0,w,h);for(let r=230;r>0;r-=34){x.strokeStyle=r%68?'#f4ece0':'#7aa6ae';x.lineWidth=12;x.beginPath();x.arc(w/2,h/2,r,0,TAU);x.stroke();}speck(x,w,h,700,['rgba(255,255,255,0.15)','rgba(0,40,60,0.08)'],2);},{});
  TX.bunt=TX.bunt||cvTex(1024,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='#e9d6c4';x.fillRect(0,0,w,h);x.strokeStyle='#6a5040';x.lineWidth=4;x.beginPath();x.moveTo(0,14);x.quadraticCurveTo(w/2,44,w,14);x.stroke();
    const cols=['#e85a5a','#f2b84a','#5ab0d8','#7cc47a','#f08ab0'];for(let i=0;i<12;i++){const x0=i*85+10,y0=14+Math.sin((i+0.5)/12*Math.PI)*30;x.fillStyle=cols[i%5];x.beginPath();x.moveTo(x0,y0);x.lineTo(x0+66,y0);x.lineTo(x0+33,y0+70);x.closePath();x.fill();x.strokeStyle='#4a3428';x.lineWidth=3;x.stroke();}},{});
  // floor + rug
  const fl=new Geo();G.plane(fl,M4.chain(M4.S(9,1,9)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.nwood,col:[1,0.95,0.9],spec:0.7,rim:0});
  const rg=new Geo();G.cyl(rg,M4.chain(M4.T(0,0,-0.4),M4.S(1.5,0.015,1.5)),[1,1,1],{seg:48});D.push({mesh:mesh(rg),M:M4.id(),tex:TX.nrug,col:[0.72,0.85,0.9],rim:0});
  // walls: back z=-2.4 (window gap on the left), left x=-3, right x=3
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0.55,0,-2.4),M4.S(4.9,3,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-2.65,0,-2.4),M4.S(0.7,3,0.1)),[1,1,1],{base:1});
  G.box(wg,M4.chain(M4.T(-1.55,0,-2.4),M4.S(1.6,0.8,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-1.55,2.35,-2.4),M4.S(1.6,0.65,0.1)),[1,1,1],{base:1});
  G.box(wg,M4.chain(M4.T(-3,0,0),M4.S(0.1,3,6)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3,0,0),M4.S(0.1,3,6)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.nwall,col:[1,1,1],rim:0,noShadow:1});
  // wainscot + skirting
  BX(g,[0,0,-2.33],[6,0.9,0.04],'#f6f0e6');BX(g,[0,0.88,-2.31],[6,0.05,0.07],'#ffffff');BX(g,[-2.93,0,0],[0.04,0.9,6],'#f6f0e6');BX(g,[-2.91,0.88,0],[0.07,0.05,6],'#ffffff');
  // window: glowing glass, white frame, cross bars, sheer curtains
  const gl2=new Geo();G.box(gl2,M4.chain(M4.T(-1.55,0.8,-2.42),M4.S(1.6,1.55,0.02)),[1,1,1],{base:1});D.push({mesh:mesh(gl2),M:M4.id(),col:[0.95,0.9,0.75],emis:[1.5,1.3,0.95],rim:0,noShadow:1});
  for(const xx of [-2.35,-1.55,-0.75])BX(g,[xx,0.78,-2.36],[0.07,1.6,0.06],'#ffffff');for(const yy of [0.78,1.55,2.33])BX(g,[-1.55,yy,-2.36],[1.66,0.07,0.06],'#ffffff');BX(g,[-1.55,0.74,-2.28],[1.8,0.05,0.2],'#ffffff');
  const cg=new Geo();for(const [x0,dir] of [[-2.55,1],[-0.55,-1]])for(let k=0;k<5;k++)G.cyl(cg,M4.chain(M4.T(x0+dir*k*0.07,0.3,-2.25),M4.S(0.055,2.25,0.055)),[1,1,1],{seg:10});D.push({mesh:mesh(cg),M:M4.id(),col:[0.98,0.86,0.82],rim:0.2});
  BX(g,[-1.55,2.56,-2.25],[2.4,0.04,0.04],'#c8a878');
  // bunting along the back wall
  const bg=new Geo();G.plane(bg,M4.chain(M4.T(1.25,2.3,-2.34),M4.RX(Math.PI/2),M4.S(2.4,1,0.32)),[1,1,1]);D.push({mesh:mesh(bg),M:M4.id(),tex:TX.bunt,col:[1,1,1],rim:0,noShadow:1});
  // crib (back right): legs, base, mattress, slats, rails
  const cx=1.45,cz=-1.85;for(const [x,z] of [[-0.68,-0.34],[0.68,-0.34],[-0.68,0.34],[0.68,0.34]])BX(g,[cx+x,0,cz+z],[0.07,1.05,0.07],'#f8f6f2');
  BX(g,[cx,0.22,cz],[1.36,0.1,0.68],'#f2eee8');const mt=new Geo();G.box(mt,M4.chain(M4.T(cx,0.32,cz),M4.S(1.3,0.13,0.62)),[1,1,1],{base:1});D.push({mesh:mesh(mt),M:M4.id(),col:[0.75,0.86,0.92],rim:0.2});
  for(const z of [-0.34,0.34])BX(g,[cx,0.95,cz+z],[1.4,0.06,0.06],'#f8f6f2');for(const x of [-0.68,0.68])BX(g,[cx+x,0.95,cz],[0.06,0.06,0.74],'#f8f6f2');
  for(let i=0;i<14;i++){const x=cx-0.6+i*0.093;G.cyl(g,M4.chain(M4.T(x,0.3,cz+0.34),M4.S(0.022,0.66,0.022)),'#f8f6f2',{seg:8});G.cyl(g,M4.chain(M4.T(x,0.3,cz-0.34),M4.S(0.022,0.66,0.022)),'#f8f6f2',{seg:8});}
  for(let i=0;i<6;i++){const z=cz-0.28+i*0.112;G.cyl(g,M4.chain(M4.T(cx+0.68,0.3,z),M4.S(0.022,0.66,0.022)),'#f8f6f2',{seg:8});}
  // teddy in the crib
  const tb='#b07a4a';G.sphere(g,M4.chain(M4.T(cx-0.35,0.52,cz-0.1),M4.S(0.13,0.15,0.11)),tb);G.sphere(g,M4.chain(M4.T(cx-0.35,0.73,cz-0.1),M4.S(0.1,0.1,0.1)),tb);
  for(const s of [-1,1])G.sphere(g,M4.chain(M4.T(cx-0.35+s*0.07,0.81,cz-0.1),M4.S(0.04,0.04,0.03)),tb);G.sphere(g,M4.chain(M4.T(cx-0.35,0.71,cz-0.01),M4.S(0.045,0.035,0.03)),'#e8d0b0');
  // mobile above the crib: arm + hanging stars/moon
  BX(g,[cx+0.66,0.95,cz],[0.03,0.75,0.03],'#f8f6f2');BX(g,[cx+0.34,1.68,cz],[0.66,0.025,0.025],'#f8f6f2');
  const mg=new Geo();[[-0.25,1.45,'#f2c84a'],[0.0,1.38,'#9ad0e8'],[0.25,1.47,'#f08ab0'],[0.1,1.52,'#ffffff']].forEach(([x,y,col],i)=>{G.cyl(g,M4.chain(M4.T(cx+x,y,cz),M4.S(0.004,1.68-y,0.004)),'#d8d0c8',{seg:4});G.sphere(mg,M4.chain(M4.T(cx+x,y,cz),M4.S(0.06,0.06,0.03)),col);});
  D.push({mesh:mesh(mg),M:M4.id(),col:[1,1,1],emis:[0.25,0.22,0.15],rim:0.3});
  // dresser + lamp + books, left wall shelf with toys
  BX(g,[-2.45,0,-1.2],[0.9,0.85,0.55],'#f2ece2',{ry:Math.PI/2});for(const y of [0.18,0.45,0.72])BX(g,[-2.18,y,-1.2],[0.01,0.02,0.5],'#c8a878');
  G.cyl(g,M4.chain(M4.T(-2.5,0.85,-1.45),M4.S(0.07,0.3,0.07)),'#e0c8a0',{seg:12});const lg=new Geo();G.lathe(lg,M4.chain(M4.T(-2.5,1.12,-1.45)),'#ffffff',[[0.001,0.25],[0.11,0.25],[0.17,0.0],[0.001,0.0]],{seg:20});D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.92,0.8],emis:[1.3,0.9,0.5],rim:0,noShadow:1});
  BX(g,[-2.5,0.85,-0.95],[0.25,0.18,0.12],'#5ab0d8');BX(g,[-2.5,0.85,-0.82],[0.25,0.22,0.1],'#e85a5a');BX(g,[-2.5,0.85,-0.7],[0.25,0.16,0.1],'#f2b84a');
  BX(g,[-2.82,1.5,-0.3],[0.3,0.04,1.4],'#f2ece2');[['#7cc47a',-0.75],['#f2b84a',-0.45],['#e85a5a',-0.15],['#5ab0d8',0.15]].forEach(([col,z],i)=>{if(i%2)BX(g,[-2.82,1.54,-0.3+z],[0.16,0.16,0.16],col,{ry:0.3});else G.sphere(g,M4.chain(M4.T(-2.82,1.62,-0.3+z),M4.S(0.08,0.08,0.08)),col);});
  // toys on the rug: blocks, stacking rings, ball
  [['#e85a5a',0.75,-0.95,0.2],['#5ab0d8',0.95,-0.85,-0.3],['#f2b84a',0.85,-1.15,0.6],['#7cc47a',0.86,-0.95,0.1,0.11]].forEach(([col,x,z,ry,y])=>BX(g,[x,y||0,z],[0.11,0.11,0.11],col,{ry}));
  G.cyl(g,M4.chain(M4.T(-0.95,0,-1.05),M4.S(0.1,0.04,0.1)),'#e85a5a',{seg:20});['#f2b84a','#7cc47a','#5ab0d8','#9a7ad8'].forEach((col,i)=>G.cyl(g,M4.chain(M4.T(-0.95,0.04+i*0.045,-1.05),M4.S(0.09-i*0.012,0.045,0.09-i*0.012)),col,{seg:20}));G.cyl(g,M4.chain(M4.T(-0.95,0.04,-1.05),M4.S(0.015,0.28,0.015)),'#f6f0e6',{seg:8});
  G.sphere(g,M4.chain(M4.T(1.15,0.12,-0.2),M4.S(0.12,0.12,0.12)),'#f08ab0');
  // balloons tied by the crib
  const bl=new Geo();[[0.55,1.75,-2.0,'#e85a5a'],[0.8,1.95,-1.95,'#f2b84a'],[0.35,2.0,-2.05,'#5ab0d8'],[0.62,2.2,-2.1,'#f08ab0'],[0.95,1.65,-2.05,'#7cc47a']].forEach(([x,y,z,col])=>{bbBal(bl,[x,y,z],0.17,col);G.cyl(g,M4.chain(M4.T(x,0.97,z),M4.S(0.004,y-1.0,0.004)),'#f6f0e6',{seg:4});});
  D.push({mesh:mesh(bl),M:M4.id(),col:[1,1,1],spec:1.4,rim:0.35});
  // armchair right front (for mom)
  BX(g,[2.2,0,-0.6],[0.9,0.42,0.85],'#9fb8c8',{ry:-0.5});BX(g,[2.42,0.42,-0.42],[0.25,0.6,0.9],'#9fb8c8',{ry:-0.5});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[[-2.5,1.25,-1.4,3.2,[2.2,1.4,0.6]],[-1.55,1.4,-1.8,4.5,[1.4,1.2,0.9]],[1.4,2.4,0.5,5,[0.9,0.8,0.7]]]};}
LIGHT5.nursery={sunDir:[-0.45,0.55,-0.7],sunCol:[1.8,1.5,1.05],sky:[0.6,0.56,0.55],gnd:[0.42,0.34,0.28],fog:[0.85,0.78,0.7],fogD:0.004,fogH:0,skyTop:[0.6,0.75,0.95],skyHor:[1.0,0.92,0.8],skyBot:[0.6,0.5,0.4],cloud:0.2,stars:0,sunSize:900,sunGlow:[1,0.9,0.7],
  post:{bloom:0.45,thr:0.95,sat:1.15,expo:0.94,lift:[0.02,0.01,0.0],gain:[1.05,1.0,0.94],vig:1.05,ink:1}};
// ---------- modern neuroscience lab (night) ----------
function buildMLab(){texInit();const g=new Geo(),D=[];
  TX.epoxy=TX.epoxy||cvTex(512,512,(x,w,h)=>{x.fillStyle='#3a4250';x.fillRect(0,0,w,h);speck(x,w,h,1400,['rgba(255,255,255,0.08)','rgba(0,0,0,0.15)'],2);x.strokeStyle='rgba(0,0,0,0.25)';x.lineWidth=3;for(let i=0;i<=w;i+=128){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke();}},{repeat:1});
  TX.panel=TX.panel||cvTex(512,512,(x,w,h)=>{x.fillStyle='#253042';x.fillRect(0,0,w,h);for(let i=0;i<4;i++){x.strokeStyle='rgba(120,160,200,0.25)';x.lineWidth=4;x.strokeRect(i*128+6,6,116,w-12);}speck(x,w,h,300,['rgba(255,255,255,0.05)'],2);},{repeat:1});
  TX.scan=TX.scan||cvTex(512,384,(x,w,h)=>{x.fillStyle='#04121e';x.fillRect(0,0,w,h);const cx=w*0.36,cy=h*0.5;
    x.strokeStyle='#6ad8ff';x.lineWidth=3;x.beginPath();x.ellipse(cx,cy,120,140,0,0,TAU);x.stroke();x.fillStyle='rgba(60,140,200,0.35)';x.beginPath();x.ellipse(cx,cy,112,132,0,0,TAU);x.fill();
    x.strokeStyle='rgba(150,220,255,0.6)';x.lineWidth=2;for(let i=0;i<18;i++){x.beginPath();const a=i/18*TAU;x.moveTo(cx+Math.cos(a)*40,cy+Math.sin(a)*50);x.quadraticCurveTo(cx+Math.cos(a+0.4)*100,cy+Math.sin(a+0.4)*110,cx+Math.cos(a+0.2)*110,cy+Math.sin(a+0.2)*125);x.stroke();}
    x.fillStyle='#ffb43a';x.beginPath();x.ellipse(cx+18,cy+30,26,14,0.4,0,TAU);x.fill();x.fillStyle='#ff5a3a';x.beginPath();x.ellipse(cx+22,cy+30,12,7,0.4,0,TAU);x.fill();
    x.strokeStyle='#3affb0';x.lineWidth=3;x.beginPath();for(let i=0;i<180;i++){const xx=w*0.68+i*0.85,yy=h*0.3+Math.sin(i*0.35)*12*(i%40<6?3:1);i?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.stroke();
    x.strokeStyle='#ff6ad0';x.beginPath();for(let i=0;i<180;i++){const xx=w*0.68+i*0.85,yy=h*0.6+(i%30<3?-30:0)+Math.sin(i*0.9)*3;i?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.stroke();
    x.fillStyle='rgba(106,216,255,0.8)';for(let i=0;i<6;i++)x.fillRect(w*0.68,h*0.78+i*10,40+hash(i)*100,5);},{});
  TX.neur=TX.neur||cvTex(512,384,(x,w,h)=>{x.fillStyle='#050a18';x.fillRect(0,0,w,h);for(let i=0;i<40;i++){const px=hash(i*3)*w,py=hash(i*5)*h;x.strokeStyle=i%5?'rgba(80,200,255,0.55)':'rgba(255,120,220,0.7)';x.lineWidth=2;for(let k=0;k<4;k++){x.beginPath();x.moveTo(px,py);const a=hash(i*7+k)*TAU;x.quadraticCurveTo(px+Math.cos(a)*30,py+Math.sin(a)*30,px+Math.cos(a+0.5)*60,py+Math.sin(a+0.5)*60);x.stroke();}
    x.fillStyle=i%5?'#7ae0ff':'#ff8ae0';x.beginPath();x.arc(px,py,4+hash(i)*4,0,TAU);x.fill();}},{});
  const fl=new Geo();G.plane(fl,M4.chain(M4.S(10,1,10)),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.epoxy,col:[0.9,0.95,1],spec:1.6,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.8),M4.S(9,3.2,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-3.4,0,0),M4.S(0.1,3.2,7)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.4,0,0),M4.S(0.1,3.2,7)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.panel,col:[1,1,1],rim:0,noShadow:1});
  // ceiling light strips
  const ls=new Geo();for(const z of [-2.0,-0.6,0.8])G.box(ls,M4.chain(M4.T(0,3.0,z),M4.S(2.6,0.04,0.12)),[1,1,1],{base:1});D.push({mesh:mesh(ls),M:M4.id(),col:[0.9,0.95,1],emis:[1.2,1.4,1.6],rim:0,noShadow:1});
  // monitor wall on the back
  const sc=new Geo();G.plane(sc,M4.chain(M4.T(-0.95,1.7,-2.73),M4.RX(Math.PI/2),M4.S(1.6,1,1.2)),[1,1,1]);D.push({mesh:mesh(sc),M:M4.id(),tex:TX.scan,col:[1,1,1],emis:[1.1,1.1,1.1],rim:0,noShadow:1});
  const sn=new Geo();G.plane(sn,M4.chain(M4.T(0.85,1.7,-2.73),M4.RX(Math.PI/2),M4.S(1.6,1,1.2)),[1,1,1]);D.push({mesh:mesh(sn),M:M4.id(),tex:TX.neur,col:[1,1,1],emis:[1.1,1.1,1.1],rim:0,noShadow:1});
  for(const x of [-0.95,0.85]){BX(g,[x,1.08,-2.76],[1.7,0.06,0.04],'#11161e');BX(g,[x,2.28,-2.76],[1.7,0.06,0.04],'#11161e');BX(g,[x-0.83,1.08,-2.76],[0.05,1.26,0.04],'#11161e');BX(g,[x+0.83,1.08,-2.76],[0.05,1.26,0.04],'#11161e');}
  // back counter with equipment
  BX(g,[0,0,-2.4],[6,0.9,0.7],'#d8dde4');BX(g,[0,0.9,-2.4],[6.1,0.05,0.75],'#eef2f6');
  G.cyl(g,M4.chain(M4.T(-2.2,0.95,-2.45),M4.S(0.14,0.06,0.14)),'#1a1e26',{seg:16});G.cyl(g,M4.chain(M4.T(-2.2,1.0,-2.5),M4.S(0.035,0.45,0.035)),'#2a303a',{seg:10});BX(g,[-2.2,1.35,-2.5],[0.22,0.16,0.3],'#e8ecf0',{rx:0.3});G.cyl(g,M4.chain(M4.T(-2.2,1.2,-2.38),M4.S(0.04,0.18,0.04)),'#1a1e26',{seg:10});
  for(let i=0;i<8;i++)G.cyl(g,M4.chain(M4.T(2.0+(i%4)*0.12,0.95,-2.35-Math.floor(i/4)*0.12),M4.S(0.04,0.16,0.04)),['#e85a5a','#5ab0d8','#f2b84a','#7cc47a'][i%4],{seg:10,rt:0.7});
  // cage rack on the left wall: stacked clear cages with blue lids
  BX(g,[-3.0,0,-0.6],[0.6,2.0,2.2],'#1c2430');const cgL=new Geo();for(let r=0;r<4;r++)for(let k=0;k<3;k++){const y=0.12+r*0.47,z=-1.3+k*0.7;
    for(const [dy,dz] of [[0,-0.3],[0,0.3],[0.3,-0.3],[0.3,0.3]])BX(g,[-2.73,y+dy,z+dz],[0.42,0.02,0.02],'#c8d4e0');for(const dz of [-0.3,0.3])BX(g,[-2.53,y,z+dz],[0.02,0.3,0.02],'#c8d4e0');
    BX(cgL,[-2.73,y+0.3,z],[0.44,0.05,0.62],'#3a7ad8');BX(g,[-2.73,y,z],[0.42,0.03,0.6],'#e8e0cc');}
  D.push({mesh:mesh(cgL),M:M4.id(),col:[1,1,1],emis:[0.05,0.15,0.4],rim:0.3});
  // centre island bench
  BX(g,[0,0,-0.6],[2.2,0.88,0.95],'#2a3442');BX(g,[0,0.88,-0.6],[2.3,0.05,1.05],'#a8b2c0');for(const x of [-0.75,0,0.75])BX(g,[x,0.3,-0.11],[0.6,0.01,0.02],'#9aa4b4');
  // open-field arena: white floor, clear acrylic walls shown by their edges
  const af=new Geo();G.box(af,M4.chain(M4.T(0,0.93,-0.6),M4.S(0.8,0.012,0.6)),[1,1,1],{base:1});D.push({mesh:mesh(af),M:M4.id(),col:[0.36,0.4,0.48],rim:0.1});
  const ae=new Geo();for(const [x,z] of [[-0.4,-0.3],[0.4,-0.3],[-0.4,0.3],[0.4,0.3]])BX(ae,[x,0.93,-0.6+z],[0.02,0.32,0.02],'#d8f0ff');for(const z of [-0.3,0.3])BX(ae,[0,1.24,-0.6+z],[0.82,0.015,0.015],'#d8f0ff');for(const x of [-0.4,0.4])BX(ae,[x,1.24,-0.6],[0.015,0.015,0.62],'#d8f0ff');
  D.push({mesh:mesh(ae),M:M4.id(),col:[1,1,1],emis:[0.3,0.5,0.7],rim:0.4});
  // optogenetics: laser box with blue LED + boom arm over the arena
  BX(g,[0.85,0.93,-0.85],[0.3,0.16,0.26],'#1a1e26');const led=new Geo();BX(led,[0.85,1.0,-0.715],[0.06,0.03,0.01],'#3a8aff');G.sphere(led,M4.chain(M4.T(0.0,1.62,-0.6),M4.S(0.03,0.03,0.03)),'#3a8aff');D.push({mesh:mesh(led),M:M4.id(),col:[0.4,0.6,1],emis:[0.8,1.4,3.5],rim:0,noShadow:1});
  BX(g,[0.95,0.93,-1.05],[0.04,0.8,0.04],'#8a94a4');BX(g,[0.48,1.68,-0.6],[0.98,0.03,0.03],'#8a94a4',{ry:0.42});G.cyl(g,M4.chain(M4.T(0.0,1.58,-0.6),M4.S(0.035,0.1,0.035)),'#c8d0dc',{seg:10});
  // desk monitor on the island
  BX(g,[-0.75,0.93,-0.95],[0.12,0.04,0.12],'#1a1e26');BX(g,[-0.75,0.97,-0.97],[0.03,0.2,0.03],'#1a1e26');BX(g,[-0.75,1.15,-0.98],[0.56,0.34,0.03],'#11161e');
  const dm=new Geo();G.plane(dm,M4.chain(M4.T(-0.75,1.32,-0.96),M4.RX(Math.PI/2),M4.S(0.5,1,0.29)),[1,1,1]);D.push({mesh:mesh(dm),M:M4.id(),tex:TX.neur,col:[1,1,1],emis:[1.2,1.2,1.2],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.25,spec:0.8});
  return {D,pts:[[0,1.62,-0.6,1.2,[0.2,0.35,1.0]],[-0.95,1.7,-2.3,3.5,[0.5,1.0,1.5]],[0.85,1.7,-2.3,3.5,[1.2,0.6,1.4]],[0,2.9,-0.6,4,[0.6,0.7,0.85]]]};}
LIGHT5.mlab={sunDir:[0.4,0.85,0.35],sunCol:[0.55,0.62,0.78],sky:[0.16,0.2,0.3],gnd:[0.08,0.1,0.14],fog:[0.05,0.08,0.14],fogD:0.02,fogH:0,skyTop:[0.04,0.06,0.12],skyHor:[0.08,0.1,0.18],skyBot:[0.04,0.05,0.08],cloud:0,stars:0,sunSize:3000,sunGlow:[0.4,0.5,0.8],
  post:{bloom:0.55,thr:0.95,sat:1.2,expo:0.9,lift:[0.0,0.02,0.05],gain:[0.95,1.02,1.1],vig:1.2,ink:1}};
// ---------- rainy old-town alley at night (the lost key) ----------
function buildAlley(){texInit();const g=new Geo(),D=[];
  TX.wet=TX.wet||cvTex(1024,1024,(x,w,h)=>{x.fillStyle='#22252c';x.fillRect(0,0,w,h);speck(x,w,h,4000,['rgba(255,255,255,0.06)','rgba(0,0,0,0.25)'],2);
    for(let i=0;i<40;i++){const px=hash(i*3.3)*w,py=hash(i*5.1)*h,r=20+hash(i*7)*60;const gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,'rgba(10,12,18,0.7)');gr.addColorStop(0.75,'rgba(14,16,24,0.6)');gr.addColorStop(1,'rgba(90,110,150,0)');x.fillStyle=gr;x.beginPath();x.ellipse(px,py,r,r*0.6,hash(i)*3,0,TAU);x.fill();}},{repeat:1});
  TX.cob=TX.cob||cvTex(512,512,(x,w,h)=>{x.fillStyle='#1c1e24';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let k=0;k<12;k++){const ox=(r%2)*21;x.fillStyle=`rgb(${60+hash(r*12+k)*30|0},${62+hash(r*12+k)*28|0},${72+hash(r*12+k)*30|0})`;x.beginPath();x.ellipse(k*43+ox,r*32+16,19,13,0,0,TAU);x.fill();x.fillStyle='rgba(180,200,240,0.18)';x.beginPath();x.ellipse(k*43+ox-5,r*32+11,8,4,0,0,TAU);x.fill();}},{repeat:1});
  TX.brick=TX.brick||cvTex(512,512,(x,w,h)=>{x.fillStyle='#2e1e1c';x.fillRect(0,0,w,h);for(let r=0;r<22;r++)for(let k=0;k<9;k++){const ox=(r%2)*30;const v=hash(r*9+k);x.fillStyle=`rgb(${110+v*50|0},${52+v*22|0},${42+v*16|0})`;x.fillRect(k*60+ox-30+2,r*23.3+2,56,19);}speck(x,w,h,900,['rgba(0,0,0,0.25)','rgba(255,220,200,0.06)'],2);},{repeat:1});
  // street (wet asphalt) + gutter + raised cobbled pavement
  const st=new Geo();G.plane(st,M4.chain(M4.T(0,0,2.5),M4.S(14,1,6)),[1,1,1],{uv:3});D.push({mesh:mesh(st),M:M4.id(),tex:TX.wet,col:[0.9,0.95,1.05],spec:2.4,rim:0});
  BX(g,[0,0,-1.6],[14,0.14,2.2],'#34363e');const pv=new Geo();G.plane(pv,M4.chain(M4.T(0,0.142,-1.6),M4.S(14,1,2.2)),[1,1,1],{uv:4});D.push({mesh:mesh(pv),M:M4.id(),tex:TX.cob,col:[1,1,1],spec:1.8,rim:0});
  BX(g,[0,0,-0.52],[14,0.15,0.12],'#6a6c74');
  // storm drain: dark pit + iron grate bars in the gutter
  const pit=new Geo();G.box(pit,M4.chain(M4.T(0,-0.002,-0.3),M4.S(0.62,0.004,0.32)),[1,1,1],{base:1});D.push({mesh:mesh(pit),M:M4.id(),col:[0.0,0.0,0.0],rim:0,noShadow:1});
  const gr=new Geo();BX(gr,[0,0,-0.46],[0.66,0.016,0.035],'#3a3c42');BX(gr,[0,0,-0.14],[0.66,0.016,0.035],'#3a3c42');for(let i=0;i<9;i++)BX(gr,[-0.3+i*0.075,0,-0.3],[0.028,0.018,0.32],'#4a4c54');
  D.push({mesh:mesh(gr),M:M4.id(),col:[1,1,1],spec:2.2,rim:0.4});
  // building facade: brick, warm windows, door with awning
  const fa=new Geo();G.box(fa,M4.chain(M4.T(0,0,-2.75),M4.S(14,6,0.2)),[1,1,1],{base:1});D.push({mesh:mesh(fa),M:M4.id(),tex:TX.brick,col:[1,1,1],rim:0,noShadow:1});
  const wn=new Geo();for(const [x,y] of [[-3.4,1.2],[-1.6,1.2],[1.9,1.2],[3.7,1.2],[-3.4,3.2],[-1.6,3.2],[0.2,3.2],[1.9,3.2],[3.7,3.2]]){G.box(wn,M4.chain(M4.T(x,y,-2.64),M4.S(0.9,1.3,0.02)),[1,1,1],{base:1});BX(g,[x,y-0.08,-2.6],[1.1,0.08,0.18],'#5a5048');BX(g,[x,y+0.6,-2.62],[0.05,1.3,0.04],'#1a1410',{});BX(g,[x,y,-2.62],[0.05,1.3,0.04],'#1a1410');BX(g,[x,y+0.62,-2.62],[0.9,0.05,0.04],'#1a1410');}
  D.push({mesh:mesh(wn),M:M4.id(),col:[1,0.8,0.5],emis:[1.6,1.0,0.45],rim:0,noShadow:1});
  BX(g,[0.2,0,-2.62],[1.0,2.1,0.06],'#3a2418');BX(g,[0.2,0,-2.5],[1.4,0.15,0.4],'#5a5a60');BX(g,[0.2,2.25,-2.4],[1.6,0.06,0.7],'#7a2a2a',{rx:-0.25});
  // cast-iron lamppost with a warm lantern
  const lx=1.35,lz=-1.0;G.cyl(g,M4.chain(M4.T(lx,0.14,lz),M4.S(0.11,0.3,0.11)),'#1a1c20',{seg:14});G.cyl(g,M4.chain(M4.T(lx,0.44,lz),M4.S(0.05,2.6,0.05)),'#1a1c20',{seg:12});
  G.lathe(g,M4.chain(M4.T(lx,3.05,lz)),'#1a1c20',[[0.001,0.42],[0.16,0.36],[0.2,0.3],[0.001,0.3]],{seg:6});G.lathe(g,M4.chain(M4.T(lx,2.98,lz)),'#1a1c20',[[0.001,0.1],[0.12,0.06],[0.13,0.0],[0.001,0.0]],{seg:6});
  const lt=new Geo();G.lathe(lt,M4.chain(M4.T(lx,3.0,lz)),'#ffffff',[[0.001,0.32],[0.17,0.3],[0.12,0.04],[0.001,0.04]],{seg:6});D.push({mesh:mesh(lt),M:M4.id(),col:[1,0.85,0.55],emis:[3.2,2.0,0.8],rim:0,noShadow:1});
  // bins, steps, distant second lamp
  G.cyl(g,M4.chain(M4.T(-2.4,0.14,-1.9),M4.S(0.28,0.8,0.28)),'#2a4a3a',{seg:16});G.cyl(g,M4.chain(M4.T(-2.4,0.94,-1.9),M4.S(0.3,0.06,0.3)),'#1e3a2c',{seg:16});
  G.cyl(g,M4.chain(M4.T(-5.2,0.14,-1.2),M4.S(0.05,2.6,0.05)),'#1a1c20',{seg:10});const l2=new Geo();G.sphere(l2,M4.chain(M4.T(-5.2,2.85,-1.2),M4.S(0.16,0.2,0.16)),'#ffffff');D.push({mesh:mesh(l2),M:M4.id(),col:[1,0.85,0.55],emis:[3,1.9,0.8],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:1.2});
  return {D,pts:[[lx,2.8,lz,5.5,[3.0,1.9,0.8]],[-5.2,2.7,-1.2,5,[2.4,1.5,0.7]],[-1.6,1.8,-2.3,2.5,[1.2,0.7,0.3]],[1.9,1.8,-2.3,2.5,[1.2,0.7,0.3]]]};}
LIGHT5.rainNight={sunDir:[-0.3,0.8,0.5],sunCol:[0.3,0.38,0.62],sky:[0.1,0.12,0.22],gnd:[0.05,0.05,0.08],fog:[0.07,0.09,0.16],fogD:0.06,fogH:0,skyTop:[0.02,0.03,0.08],skyHor:[0.1,0.12,0.22],skyBot:[0.03,0.03,0.06],cloud:0.4,stars:0,sunSize:3000,sunGlow:[0.3,0.35,0.6],
  post:{bloom:0.9,thr:0.75,sat:1.2,expo:1.05,lift:[0.0,0.01,0.05],gain:[1.06,0.98,1.05],vig:1.3,ink:1}};
{const _gb=getSet;getSet=function(k){const B={nursery:buildNursery,mlab:buildMLab,alley:buildAlley};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gb(k);};}
PL.length=0;
PL.push(
 ['nu_wide','nursery','nursery',[0.7,1.3,3.9],[0.2,0.8,-1.2],46],
 ['nu_low','nursery','nursery',[0.1,0.75,2.4],[0.4,0.6,-1.4],40],
 ['ml_wide','mlab','mlab',[1.9,1.75,2.4],[0,1.0,-0.8],46],
 ['ml_arena','mlab','mlab',[0.9,1.35,1.1],[0,1.02,-0.6],30],
 ['al_wide','alley','rainNight',[-2.2,1.5,4.2],[0.4,1.0,-1.2],46],
 ['al_drain','alley','rainNight',[1.0,0.6,1.4],[0,0.05,-0.35],30],
);
