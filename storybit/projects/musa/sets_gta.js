'use strict';
// ===================== GTA 6 leak · 3D sets: hotel room + corridor, Rockstar studio, courtroom, secure hospital =====================
function txTex(w,h,bg,lines,o={}){return cvTex(w,h,(x,W2,H2)=>{if(bg){x.fillStyle=bg;x.fillRect(0,0,W2,H2);}x.textAlign='center';x.textBaseline='middle';for(const [s,y,sz,col,wt] of lines){x.font=`${wt||900} ${sz}px "Inter Display", sans-serif`;x.fillStyle=col;x.fillText(s,W2/2,y);}if(o.fn)o.fn(x,W2,H2);},{});}
function vcArt(x,w,h){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a1650');g.addColorStop(0.45,'#e84a8a');g.addColorStop(0.75,'#ffb060');g.addColorStop(1,'#1a2a50');x.fillStyle=g;x.fillRect(0,0,w,h);
  x.fillStyle='#fff2c8';x.beginPath();x.arc(w*0.5,h*0.62,h*0.18,0,TAU);x.fill();x.fillStyle='#1a0e2a';for(let i=0;i<14;i++){const bx=i*w/14,bh=h*(0.12+hash(i*3)*0.22);x.fillRect(bx,h*0.78-bh,w/14-4,bh);}x.fillRect(0,h*0.78,w,h*0.22);
  const palm=(px,py,s)=>{x.strokeStyle='#120a1c';x.lineWidth=7*s;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+10*s,py-80*s,px-6*s,py-160*s);x.stroke();x.fillStyle='#120a1c';for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*0.55;x.beginPath();x.ellipse(px-6*s+Math.cos(a)*40*s,py-160*s+Math.sin(a)*24*s+14*s,46*s,9*s,a,0,TAU);x.fill();}};palm(w*0.12,h,h/300);palm(w*0.88,h,h/280);}
// ---------- hotel room (night): TV on the back wall, bed facing it, window + door on the front wall ----------
function buildHotel(){texInit();const g=new Geo(),D=[];
  TX.hcarpet=TX.hcarpet||cvTex(512,512,(x,w,h)=>{x.fillStyle='#4a3a4a';x.fillRect(0,0,w,h);for(let i=0;i<8;i++)for(let j=0;j<8;j++){x.fillStyle=(i+j)%2?'rgba(120,90,60,0.35)':'rgba(30,20,40,0.3)';x.beginPath();x.arc(i*64+32,j*64+32,18,0,TAU);x.fill();}speck(x,w,h,1500,['rgba(255,255,255,0.05)','rgba(0,0,0,0.15)'],2);},{repeat:1});
  TX.hwall=TX.hwall||cvTex(512,512,(x,w,h)=>{x.fillStyle='#c8b8a0';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=32){x.fillStyle=i%64?'rgba(255,255,255,0.05)':'rgba(90,70,50,0.07)';x.fillRect(i,0,16,h);}speck(x,w,h,400,['rgba(0,0,0,0.05)'],2);},{repeat:1});
  TX.city=TX.city||cvTex(512,512,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#0a1028');gr.addColorStop(1,'#2a2a4a');x.fillStyle=gr;x.fillRect(0,0,w,h);for(let i=0;i<22;i++){const bx=hash(i)*w,bw=30+hash(i*3)*60,bh=150+hash(i*5)*300;x.fillStyle='#10142a';x.fillRect(bx,h-bh,bw,bh);for(let k=0;k<40;k++){if(hash(i*40+k)<0.55)continue;x.fillStyle='rgba(255,210,140,0.85)';x.fillRect(bx+4+(k%4)*(bw/4-2),h-bh+10+Math.floor(k/4)*16,5,7);}}},{});
  TX.tvscr=TX.tvscr||cvTex(512,288,(x,w,h)=>{const gr=x.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#1a3a8a');gr.addColorStop(1,'#3a1a6a');x.fillStyle=gr;x.fillRect(0,0,w,h);x.fillStyle='rgba(255,255,255,0.85)';x.font='900 40px "Inter Display", sans-serif';x.textAlign='center';x.fillText('HOME',w/2,60);for(let i=0;i<5;i++){x.fillStyle=['#e85a5a','#5ab0d8','#f2c84a','#7cc47a','#c87af0'][i];x.fillRect(40+i*92,110,80,110);}},{});
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,0.2),M4.S(7,1,7)),[1,1,1],{uv:3});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.hcarpet,col:[1,1,1],rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.5),M4.S(6,2.8,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-3,0,0.2),M4.S(0.1,2.8,5.6)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3,0,0.2),M4.S(0.1,2.8,5.6)),[1,1,1],{base:1});
  G.box(wg,M4.chain(M4.T(-1.9,0,3.0),M4.S(2.2,2.8,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(1.9,0,3.0),M4.S(2.2,2.8,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,0,3.0),M4.S(1.6,0.7,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,2.3,3.0),M4.S(1.6,0.5,0.1)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.hwall,col:[1,1,1],rim:0,noShadow:1});
  // city window (front wall) + curtains
  const cw=new Geo();G.plane(cw,M4.chain(M4.T(0,1.5,3.02),M4.RX(-Math.PI/2),M4.S(1.6,1,1.6)),[1,1,1]);D.push({mesh:mesh(cw),M:M4.id(),tex:TX.city,col:[1,1,1],emis:[0.7,0.7,0.8],rim:0,noShadow:1});
  for(const x0 of [-0.95,0.95])for(let k=0;k<4;k++)G.cyl(g,M4.chain(M4.T(x0+(x0<0?k:-k)*0.08,0,2.88),M4.S(0.06,2.6,0.06)),'#6a2a34',{seg:10});
  // dresser + flat TV on the back wall (screen glow), lamp, minibar
  BX(g,[0.6,0,-2.2],[1.8,0.75,0.5],'#5a3a24');BX(g,[0.6,0.75,-2.2],[1.86,0.04,0.54],'#3a2414');
  BX(g,[0.6,1.0,-2.42],[1.3,0.78,0.06],'#0a0a0e');const tv=new Geo();G.plane(tv,M4.chain(M4.T(0.6,1.39,-2.385),M4.RX(Math.PI/2),M4.S(1.2,1,0.68)),[1,1,1]);D.push({mesh:mesh(tv),M:M4.id(),tex:TX.tvscr,col:[1,1,1],emis:[1.2,1.2,1.3],rim:0,noShadow:1});
  G.cyl(g,M4.chain(M4.T(-0.1,0.79,-2.25),M4.S(0.08,0.3,0.08)),'#c8a868',{seg:12});const lg=new Geo();G.lathe(lg,M4.chain(M4.T(-0.1,1.05,-2.25)),'#ffffff',[[0.001,0.24],[0.1,0.24],[0.16,0],[0.001,0]],{seg:18});D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.9,0.7],emis:[1.4,0.9,0.45],rim:0,noShadow:1});
  // bed (headboard on the left wall), foot end faces the room centre
  BX(g,[-1.6,0,0.3],[2.0,0.45,1.7],'#3a2a20');const bd=new Geo();G.box(bd,M4.chain(M4.T(-1.6,0.45,0.3),M4.S(1.95,0.18,1.65)),[1,1,1],{base:1});D.push({mesh:mesh(bd),M:M4.id(),col:[0.92,0.92,0.95],rim:0.2});
  BX(g,[-2.9,0,0.3],[0.12,1.25,1.8],'#5a3a24');const pl=new Geo();for(const z of [-0.1,0.7])G.sphere(pl,M4.chain(M4.T(-2.45,0.72,z),M4.S(0.2,0.12,0.34)),'#ffffff');D.push({mesh:mesh(pl),M:M4.id(),col:[1,1,1],rim:0.3});
  BX(g,[-1.0,0.63,0.3],[0.7,0.02,1.66],'#7a2a3a');
  // armchair + small desk
  BX(g,[2.2,0,1.6],[0.8,0.45,0.8],'#3a5a6a');BX(g,[2.55,0.45,1.6],[0.12,0.5,0.8],'#3a5a6a');BX(g,[2.2,0,-0.6],[0.8,0.72,0.5],'#5a3a24');
  // door on the front-right
  BX(g,[2.0,0,2.92],[0.9,2.1,0.06],'#4a2e1c');BX(g,[1.7,1.0,2.86],[0.05,0.05,0.08],'#d8c080');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.15,spec:0.6});
  return {D,pts:[[0.6,1.35,-1.9,3.6,[0.6,0.8,2.2]],[-0.1,1.1,-2.0,3.0,[2.2,1.4,0.6]],[0,1.6,2.6,3.5,[0.5,0.55,0.9]]]};}
LIGHT5.hotelNight={sunDir:[0.3,0.8,0.5],sunCol:[0.22,0.25,0.4],sky:[0.14,0.13,0.2],gnd:[0.08,0.06,0.08],fog:[0.05,0.05,0.09],fogD:0.02,fogH:0,skyTop:[0.02,0.02,0.06],skyHor:[0.06,0.06,0.12],skyBot:[0.03,0.03,0.05],cloud:0,stars:0,sunSize:3000,sunGlow:[0.3,0.3,0.5],
  post:{bloom:0.7,thr:0.8,sat:1.15,expo:1.05,lift:[0.01,0.0,0.04],gain:[1.04,0.98,1.06],vig:1.3,ink:1}};
// ---------- hotel corridor: long carpet, doors, wall sconces ----------
function buildCorridor(){texInit();buildHotel.tx||0;const g=new Geo(),D=[];if(!TX.hcarpet)buildHotel();
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-6),M4.S(2.4,1,20)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.hcarpet,col:[1,1,1],rim:0});
  const wg=new Geo();for(const x of [-1.2,1.2])G.box(wg,M4.chain(M4.T(x,0,-6),M4.S(0.1,2.7,20)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,0,-15.5),M4.S(2.5,2.7,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,2.7,-6),M4.S(2.5,0.08,20)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.hwall,col:[0.95,0.92,0.88],rim:0,noShadow:1});
  const sc=new Geo();for(let i=0;i<7;i++){const z=2-i*2.6;for(const sd of [-1,1]){BX(g,[sd*1.14,0,z-0.8],[0.06,2.1,0.9],'#4a2e1c');BX(g,[sd*1.1,1.5,z-0.8],[0.04,0.08,0.18],'#d8c080');if(i%2===0){G.sphere(sc,M4.chain(M4.T(sd*1.12,1.9,z+0.5),M4.S(0.07,0.12,0.07)),'#ffffff');}}}
  D.push({mesh:mesh(sc),M:M4.id(),col:[1,0.9,0.7],emis:[1.6,1.1,0.6],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.15});
  const pts=[];for(let i=0;i<6;i+=2)pts.push([0,1.9,2.5-i*2.6,3.2,[1.6,1.1,0.6]]);return {D,pts};}
// ---------- Rockstar studio (night): open-plan desks, monitors, wall screen with the GTA VI art, company sign ----------
function buildStudio(){texInit();const g=new Geo(),D=[];
  TX.sfloor=TX.sfloor||cvTex(512,512,(x,w,h)=>{x.fillStyle='#2a2c34';x.fillRect(0,0,w,h);speck(x,w,h,1600,['rgba(255,255,255,0.05)','rgba(0,0,0,0.2)'],2);x.strokeStyle='rgba(0,0,0,0.3)';x.lineWidth=3;for(let i=0;i<=w;i+=128){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke();}},{repeat:1});
  TX.swall=TX.swall||cvTex(512,512,(x,w,h)=>{x.fillStyle='#1c1e26';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=64){x.fillStyle='rgba(255,255,255,0.03)';x.fillRect(i,0,4,h);}},{repeat:1});
  TX.vc=TX.vc||cvTex(1024,576,(x,w,h)=>{vcArt(x,w,h);x.textAlign='center';x.font='900 92px "Inter Display", sans-serif';x.lineWidth=10;x.strokeStyle='#120a1c';x.strokeText('GRAND THEFT AUTO VI',w/2,h*0.2);x.fillStyle='#fff6e8';x.fillText('GRAND THEFT AUTO VI',w/2,h*0.2);},{});
  TX.sign=TX.sign||txTex(1024,200,'#111216',[['ROCKSTAR GAMES',104,120,'#f6c21a']]);
  TX.dev=TX.dev||cvTex(512,320,(x,w,h)=>{x.fillStyle='#14161e';x.fillRect(0,0,w,h);x.fillStyle='#22252e';x.fillRect(0,0,w,26);x.fillRect(0,26,90,h);x.fillRect(w-110,26,110,h);const g2=x.createLinearGradient(0,30,0,h);g2.addColorStop(0,'#e86a9a');g2.addColorStop(1,'#ffb060');x.fillStyle=g2;x.fillRect(96,32,w-212,h-40);x.fillStyle='#1a0e2a';for(let i=0;i<8;i++){const bh=40+hash(i)*90;x.fillRect(100+i*38,h-10-bh,32,bh);}
    x.fillStyle='rgba(255,255,255,0.4)';for(let i=0;i<10;i++)x.fillRect(8,40+i*26,70,8);for(let i=0;i<10;i++)x.fillRect(w-100,40+i*26,90,8);},{});
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1.5),M4.S(12,1,10)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.sfloor,col:[1,1,1],spec:1.0,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-5),M4.S(12,3.4,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-5,0,-1.5),M4.S(0.1,3.4,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(5,0,-1.5),M4.S(0.1,3.4,8)),[1,1,1],{base:1});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.swall,col:[1,1,1],rim:0,noShadow:1});
  const ws=new Geo();G.plane(ws,M4.chain(M4.T(0.4,1.85,-4.93),M4.RX(Math.PI/2),M4.S(3.6,1,2.0)),[1,1,1]);D.push({mesh:mesh(ws),M:M4.id(),tex:TX.vc,col:[1,1,1],emis:[1.15,1.15,1.15],rim:0,noShadow:1});
  BX(g,[0.4,0.82,-4.97],[3.8,2.1,0.04],'#0a0a0e');
  const sg=new Geo();G.plane(sg,M4.chain(M4.T(-3.3,2.6,-4.93),M4.RX(Math.PI/2),M4.S(2.4,1,0.47)),[1,1,1]);D.push({mesh:mesh(sg),M:M4.id(),tex:TX.sign,col:[1,1,1],emis:[0.9,0.9,0.9],rim:0,noShadow:1});
  // desk rows with twin monitors (glowing), chairs
  const scr=new Geo();for(let r=0;r<3;r++)for(let k=0;k<4;k++){const x=-3.3+k*2.0,z=-3.2+r*1.7;BX(g,[x,0,z],[1.6,0.74,0.75],'#3a3e48');BX(g,[x,0.74,z],[1.66,0.04,0.8],'#c8ccd4');
    for(const dx of [-0.38,0.38]){BX(g,[x+dx,0.78,z-0.2],[0.1,0.2,0.08],'#1a1c22');BX(g,[x+dx,0.95,z-0.24],[0.66,0.4,0.04],'#0e0f14');G.plane(scr,M4.chain(M4.T(x+dx,1.15,z-0.215),M4.RX(Math.PI/2),M4.S(0.6,1,0.34)),[1,1,1]);}
    G.cyl(g,M4.chain(M4.T(x,0,z+0.65),M4.S(0.04,0.42,0.04)),'#1a1c22',{seg:8});BX(g,[x,0.42,z+0.65],[0.5,0.08,0.5],'#22242c');BX(g,[x,0.5,z+0.88],[0.5,0.55,0.08],'#22242c');}
  D.push({mesh:mesh(scr),M:M4.id(),tex:TX.dev,col:[1,1,1],emis:[1.0,1.0,1.0],rim:0,noShadow:1});
  const ls=new Geo();for(const z of [-3.5,-1.8,-0.1])G.box(ls,M4.chain(M4.T(0,3.2,z),M4.S(8,0.04,0.1)),[1,1,1],{base:1});D.push({mesh:mesh(ls),M:M4.id(),col:[1,1,1],emis:[0.5,0.55,0.7],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.7});
  return {D,pts:[[0.4,1.8,-4.4,5,[1.6,0.7,0.9]],[-2,1.2,-2.5,3,[0.5,0.6,1.0]],[2,1.2,-0.8,3,[0.5,0.6,1.0]]]};}
LIGHT5.studio={sunDir:[0.3,0.8,0.5],sunCol:[0.3,0.32,0.45],sky:[0.16,0.16,0.22],gnd:[0.08,0.08,0.1],fog:[0.06,0.06,0.1],fogD:0.02,fogH:0,skyTop:[0.02,0.02,0.05],skyHor:[0.06,0.06,0.1],skyBot:[0.03,0.03,0.05],cloud:0,stars:0,sunSize:3000,sunGlow:[0.3,0.3,0.4],
  post:{bloom:0.7,thr:0.8,sat:1.2,expo:1.05,lift:[0.01,0.0,0.04],gain:[1.05,0.98,1.04],vig:1.25,ink:1}};
// ---------- courtroom: raised judge's bench with a crest, wood panels, glass dock ----------
function buildCourt(){texInit();const g=new Geo(),D=[];
  TX.panelW=TX.panelW||cvTex(512,512,(x,w,h)=>{x.fillStyle='#6a4428';x.fillRect(0,0,w,h);for(let i=0;i<4;i++)for(let j=0;j<4;j++){x.strokeStyle='rgba(40,24,12,0.6)';x.lineWidth=6;x.strokeRect(i*128+12,j*128+12,104,104);x.strokeStyle='rgba(255,220,180,0.12)';x.lineWidth=3;x.strokeRect(i*128+18,j*128+18,92,92);}},{repeat:1});
  TX.crest=TX.crest||cvTex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='#6a4428';x.fillRect(0,0,w,h);x.fillStyle='#d8b050';x.strokeStyle='#3a2410';x.lineWidth=6;x.beginPath();x.moveTo(w*0.3,h*0.2);x.lineTo(w*0.7,h*0.2);x.lineTo(w*0.7,h*0.55);x.quadraticCurveTo(w*0.5,h*0.85,w*0.3,h*0.55);x.closePath();x.fill();x.stroke();x.fillStyle='#8a2a2a';x.fillRect(w*0.36,h*0.28,w*0.28,h*0.12);x.fillStyle='#2a3a7a';x.fillRect(w*0.36,h*0.42,w*0.28,h*0.1);x.beginPath();x.arc(w*0.5,h*0.12,w*0.08,0,TAU);x.fillStyle='#d8b050';x.fill();x.stroke();},{});
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1),M4.S(10,1,9)),[1,1,1],{uv:3});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.hcarpet||TX.panelW,col:[0.5,0.25,0.25],rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-4),M4.S(10,4,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-4.5,0,-1),M4.S(0.1,4,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(4.5,0,-1),M4.S(0.1,4,8)),[1,1,1],{base:1});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.panelW,col:[1,1,1],rim:0,noShadow:1});
  const cr=new Geo();G.plane(cr,M4.chain(M4.T(0,3.0,-3.93),M4.RX(Math.PI/2),M4.S(1.0,1,1.0)),[1,1,1]);D.push({mesh:mesh(cr),M:M4.id(),tex:TX.crest,col:[1,1,1],emis:[0.2,0.2,0.2],rim:0,noShadow:1});
  // judge's bench (raised), clerk desk, benches, dock with glass edges
  BX(g,[0,0,-3.2],[4,0.5,1.2],'#5a3820');BX(g,[0,0.5,-2.7],[4,0.9,0.2],'#6a4428');BX(g,[0,1.4,-2.75],[4.1,0.06,0.35],'#3a2410');BX(g,[0,0.5,-3.6],[1.0,1.6,0.15],'#4a2a1a');
  BX(g,[0,0,-1.9],[2.4,0.85,0.6],'#6a4428');for(const z of [1.0,1.9])for(const x of [-2.4,2.4]){BX(g,[x,0,z],[2.6,0.45,0.5],'#5a3820');BX(g,[x,0.45,z+0.22],[2.6,0.5,0.08],'#5a3820');}
  BX(g,[3.0,0,-0.6],[1.5,0.9,1.6],'#5a3820');const gl=new Geo();for(const [x,z] of [[2.25,-1.4],[3.75,-1.4],[2.25,0.2],[3.75,0.2]])BX(gl,[x,0.9,z],[0.04,1.0,0.04],'#c8e0f0');BX(gl,[3.0,1.9,-1.4],[1.5,0.03,0.03],'#c8e0f0');BX(gl,[2.25,1.9,-0.6],[0.03,0.03,1.6],'#c8e0f0');D.push({mesh:mesh(gl),M:M4.id(),col:[1,1,1],emis:[0.15,0.2,0.25],rim:0.4});
  // pendant lights
  const lp=new Geo();for(const x of [-2.5,0,2.5])G.sphere(lp,M4.chain(M4.T(x,3.3,-1),M4.S(0.18,0.12,0.18)),'#ffffff');D.push({mesh:mesh(lp),M:M4.id(),col:[1,0.9,0.7],emis:[1.6,1.2,0.7],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.6});
  return {D,pts:[[0,3.0,-1,6,[1.4,1.1,0.7]],[-2.5,3.0,-1,4,[1.0,0.8,0.5]],[2.5,3.0,-1,4,[1.0,0.8,0.5]]]};}
LIGHT5.court={sunDir:[0.3,0.85,0.4],sunCol:[1.0,0.85,0.65],sky:[0.4,0.34,0.28],gnd:[0.2,0.14,0.1],fog:[0.3,0.24,0.2],fogD:0.01,fogH:0,skyTop:[0.2,0.18,0.15],skyHor:[0.4,0.34,0.28],skyBot:[0.2,0.16,0.12],cloud:0,stars:0,sunSize:3000,sunGlow:[0.8,0.6,0.4],
  post:{bloom:0.5,thr:0.9,sat:1.1,expo:1.0,lift:[0.02,0.01,0.0],gain:[1.06,0.98,0.9],vig:1.2,ink:1}};
// ---------- secure hospital corridor: white walls, locked doors with small windows, keypads ----------
function buildHosp(){texInit();const g=new Geo(),D=[];
  TX.hfl=TX.hfl||cvTex(512,512,(x,w,h)=>{x.fillStyle='#a8b4b8';x.fillRect(0,0,w,h);for(let i=0;i<8;i++)for(let j=0;j<8;j++){x.fillStyle=(i+j)%2?'#b4c0c4':'#9eaaae';x.fillRect(i*64,j*64,64,64);}speck(x,w,h,800,['rgba(255,255,255,0.1)','rgba(0,0,0,0.08)'],2);},{repeat:1});
  TX.hw=TX.hw||cvTex(512,512,(x,w,h)=>{x.fillStyle='#e8ecec';x.fillRect(0,0,w,h);x.fillStyle='#5a9a9a';x.fillRect(0,h*0.62,w,h*0.04);x.fillStyle='#c8d4d4';x.fillRect(0,h*0.66,w,h*0.34);},{repeat:1});
  TX.secure=TX.secure||txTex(512,128,'#2a5a6a',[['SECURE UNIT',66,64,'#ffffff']]);
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-6),M4.S(3,1,20)),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.hfl,col:[1,1,1],spec:1.4,rim:0});
  const wg=new Geo();for(const x of [-1.5,1.5])G.box(wg,M4.chain(M4.T(x,0,-6),M4.S(0.1,2.8,20)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,0,-15),M4.S(3,2.8,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,2.8,-6),M4.S(3,0.08,20)),[1,1,1],{base:1});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.hw,col:[1,1,1],rim:0,noShadow:1});
  const sg=new Geo();G.plane(sg,M4.chain(M4.T(0,2.3,-14.9),M4.RX(Math.PI/2),M4.S(1.6,1,0.4)),[1,1,1]);D.push({mesh:mesh(sg),M:M4.id(),tex:TX.secure,col:[1,1,1],emis:[0.6,0.6,0.6],rim:0,noShadow:1});
  const wn=new Geo(),kp=new Geo();for(let i=0;i<6;i++){const z=1-i*2.8;for(const sd of [-1,1]){BX(g,[sd*1.44,0,z],[0.06,2.15,1.0],'#d8dcdc');BX(g,[sd*1.42,0,z],[0.03,2.15,0.04],'#7a8a8a');G.box(wn,M4.chain(M4.T(sd*1.4,1.35,z+0.2),M4.S(0.02,0.35,0.14)),[1,1,1],{base:1});BX(kp,[sd*1.4,1.1,z-0.68],[0.04,0.16,0.1],'#2a3a3a');}}
  D.push({mesh:mesh(wn),M:M4.id(),col:[0.6,0.75,0.8],emis:[0.3,0.4,0.45],rim:0,noShadow:1});D.push({mesh:mesh(kp),M:M4.id(),col:[1,1,1],emis:[0.2,0.6,0.3],rim:0});
  const ls=new Geo();for(let i=0;i<8;i++)G.box(ls,M4.chain(M4.T(0,2.75,1.5-i*2.2),M4.S(0.6,0.04,1.2)),[1,1,1],{base:1});D.push({mesh:mesh(ls),M:M4.id(),col:[1,1,1],emis:[1.4,1.5,1.5],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.8});
  const pts=[];for(let i=0;i<4;i++)pts.push([0,2.5,1.5-i*3.3,4,[1.0,1.1,1.1]]);return {D,pts};}
LIGHT5.hosp={sunDir:[0.2,0.9,0.3],sunCol:[0.7,0.78,0.8],sky:[0.5,0.56,0.58],gnd:[0.3,0.34,0.36],fog:[0.6,0.66,0.68],fogD:0.03,fogH:0,skyTop:[0.5,0.56,0.58],skyHor:[0.6,0.66,0.68],skyBot:[0.4,0.44,0.46],cloud:0,stars:0,sunSize:3000,sunGlow:[0.6,0.66,0.7],
  post:{bloom:0.45,thr:0.95,sat:0.95,expo:1.0,lift:[0.0,0.02,0.03],gain:[0.96,1.02,1.04],vig:1.2,ink:1}};
{const _gg=getSet;getSet=function(k){const B={hotel:buildHotel,corridor:buildCorridor,studio:buildStudio,court:buildCourt,hosp:buildHosp};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gg(k);};}
PL.length=0;
PL.push(
 ['ht_wide','hotel','hotelNight',[2.3,1.75,2.7],[-0.3,0.85,-1.7],56],
 ['ht_tvpov','hotel','hotelNight',[0.45,1.15,-2.3],[-1.2,0.8,-0.3],62],
 ['ht_ots','hotel','hotelNight',[-0.9,1.3,1.6],[0.6,1.2,-2.3],40],
 ['co_door','corridor','hotelNight',[0.3,1.5,3.6],[0,1.2,-8],46],
 ['st_wide','studio','studio',[3.6,1.9,3.0],[-0.5,1.2,-3.0],50],
 ['st_screen','studio','studio',[0.4,1.4,-0.6],[0.4,1.8,-4.9],44],
 ['ct_wide','court','court',[0.3,1.7,4.6],[0,1.4,-2.5],48],
 ['ct_dock','court','court',[1.2,1.5,2.0],[3.0,1.2,-0.6],40],
 ['hp_hall','hosp','hosp',[0.2,1.5,3.5],[0,1.2,-10],44],
 ['v_wide','vault','vaultCold',[0.4,1.6,2.6],[-0.2,1.2,-3.0],52],
 ['s_night','dstreet','streetNight',[-2.5,1.6,14],[0,5.0,-3],62],
);
