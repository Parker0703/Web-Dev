'use strict';
function rr2(x,a,b,w,h){x.beginPath();x.moveTo(a+6,b);x.arcTo(a+w,b,a+w,b+h,6);x.arcTo(a+w,b+h,a,b+h,6);x.arcTo(a,b+h,a,b,6);x.arcTo(a,b,a+w,b,6);x.fill();}
// ===================== Randy Gardner 1963: wood-panel den + night football stadium =====================
function buildDen(){texInit();const g=new Geo(),lg=new Geo(),D=[];
  TX.panelW=TX.panelW||cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=['#7a4e2e','#6e4428','#84563a','#744a2c'][i%4];x.fillRect(i*64,0,64,h);x.strokeStyle='rgba(40,22,10,0.7)';x.lineWidth=4;x.beginPath();x.moveTo(i*64,0);x.lineTo(i*64,h);x.stroke();
    x.strokeStyle='rgba(50,28,12,0.25)';x.lineWidth=2;for(let k=0;k<5;k++){x.beginPath();const xx=i*64+8+k*11;x.moveTo(xx,0);x.bezierCurveTo(xx+5*Math.sin(i+k),h*0.3,xx-5,h*0.6,xx+3,h);x.stroke();}}},{repeat:1});
  TX.shag=TX.shag||cvTex(512,512,(x,w,h)=>{x.fillStyle='#c8782e';x.fillRect(0,0,w,h);speck(x,w,h,4000,['rgba(255,200,120,0.35)','rgba(120,50,10,0.3)','rgba(230,150,60,0.4)'],3);},{repeat:1});
  TX.wood3=TX.wood3||cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=['#a8784a','#9a6c40','#b08250'][i%3];x.fillRect(0,i*64,w,64);x.strokeStyle='rgba(60,34,16,0.5)';x.lineWidth=3;x.beginPath();x.moveTo(0,i*64);x.lineTo(w,i*64);x.stroke();}},{repeat:1});
  TX.cal=TX.cal||cvTex(256,320,(x,w,h)=>{x.fillStyle='#f6f0e0';x.fillRect(0,0,w,h);x.fillStyle='#c83a2a';x.fillRect(0,0,w,70);x.fillStyle='#fff';x.font='bold 40px sans-serif';x.textAlign='center';x.fillText('DEC 1963',w/2,50);x.fillStyle='#2a2a2a';x.font='bold 22px sans-serif';
    for(let r=0;r<5;r++)for(let c=0;c<7;c++){const n=r*7+c+1;if(n>31)continue;x.fillText(String(n),20+c*36,110+r*44);}});
  TX.board=TX.board||cvTex(512,256,(x,w,h)=>{x.fillStyle='#f4f0e4';x.fillRect(0,0,w,h);x.fillStyle='#2a4a9a';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText('HOW LONG CAN',w/2,46);x.fillText('WE STAY AWAKE?',w/2,82);
    x.strokeStyle='#c83a2a';x.lineWidth=5;x.beginPath();x.moveTo(60,220);x.lineTo(60,110);x.moveTo(60,220);x.lineTo(460,220);x.stroke();x.strokeStyle='#2a8a4a';x.beginPath();x.moveTo(60,130);for(let i=0;i<=10;i++)x.lineTo(60+i*40,130+Math.pow(i/10,1.6)*80);x.stroke();
    x.fillStyle='#e8c040';x.beginPath();x.arc(w-60,140,26,0,TAU);x.fill();x.fillStyle='#2a2a2a';x.font='bold 18px sans-serif';x.fillText('Zzz?',w-60,146);});
  TX.pinTop=TX.pinTop||cvTex(256,512,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#1a2a6a');gr.addColorStop(1,'#6a1a5a');x.fillStyle=gr;x.fillRect(0,0,w,h);
    for(const [cx,cy,r,col] of [[80,140,28,'#ffd040'],[176,140,28,'#ff5a3a'],[128,220,28,'#3ad0ff']]){x.fillStyle=col;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();x.strokeStyle='#fff';x.lineWidth=4;x.stroke();}
    x.strokeStyle='#ffd040';x.lineWidth=6;x.beginPath();x.moveTo(40,420);x.lineTo(110,470);x.moveTo(216,420);x.lineTo(146,470);x.stroke();for(let i=0;i<10;i++){x.fillStyle=i%2?'#ff5a3a':'#ffd040';x.beginPath();x.arc(30+i*22,300+Math.sin(i)*20,6,0,TAU);x.fill();}});
  TX.pinBack=TX.pinBack||cvTex(384,256,(x,w,h)=>{const gr=x.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#ff3a6a');gr.addColorStop(1,'#ffb030');x.fillStyle=gr;x.fillRect(0,0,w,h);x.fillStyle='#1a1240';x.fillRect(20,150,w-40,80);x.fillStyle='#ffe060';x.font='bold 64px sans-serif';x.textAlign='center';x.fillText('SPACE',w/2,70);x.fillText('ACE',w/2,130);
    x.fillStyle='#ff6040';x.font='bold 48px monospace';x.fillText('004810',w/2,208);for(let i=0;i<12;i++){x.fillStyle='#fff8c0';x.beginPath();x.arc(14+i*32,10,6,0,TAU);x.fill();x.beginPath();x.arc(14+i*32,h-8,6,0,TAU);x.fill();}});
  const fl=new Geo();G.plane(fl,M4.S(10,1,10),[1,1,1],{uv:6});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.wood3,col:[0.9,0.86,0.82],spec:0.8,rim:0});
  const rg=new Geo();G.plane(rg,M4.chain(M4.T(-0.3,0.012,-0.7),M4.S(3.6,1,2.6)),[1,1,1]);D.push({mesh:mesh(rg),M:M4.id(),tex:TX.shag,col:[1,1,1],rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.4),M4.S(10,3.0,0.1)),[1,1,1],{base:1,uvs:[5,1.5]});G.box(wg,M4.chain(M4.T(-3.2,0,0),M4.S(0.1,3,8)),[1,1,1],{base:1,uvs:[4,1.5]});G.box(wg,M4.chain(M4.T(3.2,0,0),M4.S(0.1,3,8)),[1,1,1],{base:1,uvs:[4,1.5]});G.box(wg,M4.chain(M4.T(0,0,3.8),M4.S(10,3,0.1)),[1,1,1],{base:1,uvs:[5,1.5]});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.panelW,col:[1,1,1],rim:0,noShadow:1});
  BX(g,[0,0,-2.33],[10,0.12,0.04],'#3e2414');BX(g,[0,2.86,-2.33],[10,0.14,0.04],'#3e2414');
  // window (back wall, left) with night outside + curtains
  const gl=new Geo();G.box(gl,M4.chain(M4.T(-1.9,1.0,-2.34),M4.S(1.2,1.1,0.02)),[1,1,1],{base:1});D.push({mesh:mesh(gl),M:M4.id(),col:[0.2,0.28,0.6],emis:[0.16,0.22,0.55],rim:0,noShadow:1});
  for(const y of [0.98,1.53,2.08])BX(g,[-1.9,y,-2.31],[1.28,0.05,0.05],'#e8e0cc');for(const x of [-2.52,-1.9,-1.28])BX(g,[x,0.98,-2.31],[0.05,1.15,0.05],'#e8e0cc');
  const cg=new Geo();for(const [x0,dir] of [[-2.7,1],[-1.1,-1]])for(let k=0;k<4;k++)G.cyl(cg,M4.chain(M4.T(x0+dir*k*0.08,0.6,-2.26),M4.S(0.06,1.75,0.06)),[1,1,1],{seg:10});D.push({mesh:mesh(cg),M:M4.id(),col:[0.86,0.6,0.2],rim:0.15});
  // sofa (mustard) against back wall
  const sf=new Geo();/*sofa*/G.box(sf,M4.chain(M4.T(0.1,0.12,-1.85),M4.S(2.2,0.34,0.8)),[1,1,1],{base:1});G.box(sf,M4.chain(M4.T(0.1,0.46,-2.17),M4.S(2.2,0.5,0.2)),[1,1,1],{base:1});
  for(const x of [-0.95,1.15])G.box(sf,M4.chain(M4.T(x,0.12,-1.85),M4.S(0.2,0.55,0.8)),[1,1,1],{base:1});for(const x of [-0.42,0.62])G.box(sf,M4.chain(M4.T(x,0.46,-1.78),M4.S(0.98,0.08,0.66)),[1,1,1],{base:1});
  D.push({mesh:mesh(sf),M:M4.id(),col:[0.72,0.5,0.2],rim:0.2,spec:0.3});for(const [x,z] of [[-1,-1.5],[1.2,-1.5],[-1,-2.2],[1.2,-2.2]])BX(g,[x,0,z],[0.06,0.12,0.06],'#2a1a0e');
  const pw=new Geo();G.sphere(pw,M4.chain(M4.T(-0.75,0.68,-2.0),M4.RZ(0.3),M4.S(0.2,0.18,0.08)),[1,1,1]);D.push({mesh:mesh(pw),M:M4.id(),col:[0.3,0.55,0.5],rim:0.2});
  // coffee table (kidney-ish) + bowl + bottles
  BX(g,[0.1,0.36,-0.75],[1.2,0.05,0.55],'#5a3a22');for(const [x,z] of [[-0.42,-0.95],[0.62,-0.95],[-0.42,-0.55],[0.62,-0.55]])BX(g,[x,0,z],[0.04,0.36,0.04],'#2a1a0e');
  for(const x of [0.4,0.5])G.cyl(g,M4.chain(M4.T(x,0.41,-0.7),M4.S(0.035,0.2,0.035)),'#3a2014',{seg:10});G.cyl(g,M4.chain(M4.T(-0.2,0.41,-0.75),M4.S(0.16,0.06,0.16)),'#d84a2a',{seg:16,rt:1.4});
  // card table (right) with science-fair trifold
  BX(g,[1.75,0.72,-0.95],[1.1,0.04,0.7],'#2a5a4a');for(const [x,z] of [[1.25,-1.25],[2.25,-1.25],[1.25,-0.65],[2.25,-0.65]])BX(g,[x,0,z],[0.03,0.72,0.03],'#1a1a1a');
  const bd=new Geo();G.plane(bd,M4.chain(M4.T(1.75,1.02,-1.2),M4.RX(Math.PI/2),M4.S(0.8,1,0.42)),[1,1,1]);D.push({mesh:mesh(bd),M:M4.id(),tex:TX.board,col:[1,1,1],emis:[0.12,0.12,0.12],rim:0});
  BX(g,[1.75,0.76,-1.22],[0.82,0.5,0.02],'#d8d0c0');for(const sd of [-1,1])G.box(g,M4.chain(M4.T(1.75+sd*0.5,0.76,-1.15),M4.RY(-sd*0.7),M4.S(0.22,0.5,0.02)),'#3a5ab0',{base:1});
  // pinball machine (right wall), legs, sloped playfield, backbox
  const px=2.55,pz=0.2;for(const [dx,dz] of [[-0.25,-0.5],[0.25,-0.5],[-0.25,0.5],[0.25,0.5]])BX(g,[px+dx,0,pz+dz],[0.05,0.72,0.05],'#c8c8cc');
  const pc=new Geo();G.box(pc,M4.chain(M4.T(px,0.72,pz),M4.RX(0.07),M4.S(0.62,0.28,1.2)),[1,1,1],{base:1});D.push({mesh:mesh(pc),M:M4.id(),col:[0.85,0.2,0.3],rim:0.25,spec:0.6});
  const pt=new Geo();G.plane(pt,M4.chain(M4.T(px,1.04,pz),M4.RX(0.07),M4.RY(Math.PI/2),M4.S(1.1,1,0.56)),[1,1,1]);D.push({mesh:mesh(pt),M:M4.id(),tex:TX.pinTop,col:[1,1,1],emis:[0.55,0.55,0.55],rim:0,noShadow:1});
  BX(g,[px,1.0,pz-0.55],[0.62,0.7,0.14],'#1a1240');const pb=new Geo();G.plane(pb,M4.chain(M4.T(px-0.315,1.36,pz-0.55),M4.RZ(Math.PI/2),M4.RX(Math.PI/2),M4.S(0.58,1,0.12)),[1,1,1]);
  const pb2=new Geo();G.plane(pb2,M4.chain(M4.T(px-0.32,1.38,pz-0.55),M4.RY(-Math.PI/2),M4.RX(Math.PI/2),M4.S(0.0001,1,0.0001)),[1,1,1]);
  const bk=new Geo();G.plane(bk,M4.chain(M4.T(px,1.38,pz-0.47),M4.RX(Math.PI/2),M4.S(0.56,1,0.4)),[1,1,1]);
  // backbox faces the room (toward -x): plane on the box's -x side
  const bx2=new Geo();G.plane(bx2,M4.chain(M4.T(px-0.32,1.36,pz-0.55),M4.RZ(Math.PI/2),M4.RY(Math.PI/2),M4.S(0.6,1,0.12)),[1,1,1]);
  D.push({mesh:mesh(bk),M:M4.id(),tex:TX.pinBack,col:[1,1,1],emis:[0.9,0.9,0.9],rim:0,noShadow:1});
  // left wall: TV console, radio cabinet, mini hoop, framed pennant
  BX(g,[-2.75,0,-1.2],[0.6,0.7,1.1],'#6a4024');BX(g,[-2.45,0.12,-1.2],[0.01,0.4,0.9],'#3a2210');BX(g,[-2.75,0.7,-1.2],[0.55,0.5,0.7],'#3a3a3e');const tv=new Geo();G.box(tv,M4.chain(M4.T(-2.47,0.76,-1.25),M4.S(0.02,0.38,0.5)),[1,1,1],{base:1});D.push({mesh:mesh(tv),M:M4.id(),col:[0.3,0.42,0.42],emis:[0.12,0.2,0.2],spec:1,rim:0});
  for(const z of [-0.88,-0.98])G.cyl(g,M4.chain(M4.T(-2.46,1.0,z),M4.RZ(Math.PI/2),M4.S(0.025,0.02,0.025)),'#c8b070',{seg:10});G.cyl(g,M4.chain(M4.T(-2.75,1.2,-1.35),M4.RZ(0.5),M4.S(0.01,0.3,0.01)),'#c8c8c8',{seg:6});G.cyl(g,M4.chain(M4.T(-2.75,1.2,-1.1),M4.RZ(-0.5),M4.S(0.01,0.3,0.01)),'#c8c8c8',{seg:6});
  BX(g,[-2.9,0,0.9],[0.5,0.85,0.9],'#7a4a2a');BX(g,[-2.9,0.85,0.9],[0.46,0.24,0.6],'#c8a868');for(const z of [0.75,0.95,1.1])G.cyl(g,M4.chain(M4.T(-2.66,0.96,z),M4.RZ(Math.PI/2),M4.S(0.03,0.02,0.03)),'#3a2a1a',{seg:10});
  BX(g,[-3.13,1.9,0.1],[0.04,0.45,0.6],'#f4f4f4');const hp=new Geo();G.lathe(hp,M4.chain(M4.T(-2.92,2.0,0.1),M4.S(1)),'#ffffff',[[0.16,0],[0.17,0.0],[0.17,0.02],[0.16,0.02]],{seg:24});D.push({mesh:mesh(hp),M:M4.id(),col:[0.95,0.4,0.15],rim:0.2});
  const nt=new Geo();for(let i=0;i<10;i++){const a=i/10*TAU;G.cyl(nt,M4.chain(M4.T(-2.92+Math.cos(a)*0.15,1.78,0.1+Math.sin(a)*0.15),M4.S(0.006,0.22,0.006)),[1,1,1],{seg:4});}D.push({mesh:mesh(nt),M:M4.id(),col:[1,1,1],rim:0.3});
  // wall calendar + clock on the back wall (right of sofa), pennant
  const cl=new Geo();G.plane(cl,M4.chain(M4.T(1.6,1.75,-2.33),M4.RX(Math.PI/2),M4.S(0.4,1,0.5)),[1,1,1]);D.push({mesh:mesh(cl),M:M4.id(),tex:TX.cal,col:[1,1,1],emis:[0.15,0.15,0.15],rim:0});
  const ck=new Geo();G.cyl(ck,M4.chain(M4.T(0.1,2.25,-2.33),M4.RX(Math.PI/2),M4.S(0.22,0.04,0.22)),[1,1,1],{seg:28});D.push({mesh:mesh(ck),M:M4.id(),col:[0.96,0.94,0.88],rim:0.1});BX(g,[0.1,2.25,-2.37],[0.5,0.5,0.02],'#c89a3a');
  BX(g,[0.1,2.25,-2.3],[0.02,0.16,0.01],'#1a1a1a');BX(g,[0.12,2.27,-2.3],[0.12,0.02,0.01],'#1a1a1a');
  // floor lamp (left of sofa)
  G.cyl(g,M4.chain(M4.T(-1.45,0,-2.0),M4.S(0.18,0.03,0.18)),'#2a2a2a',{seg:16});G.cyl(g,M4.chain(M4.T(-1.45,0,-2.0),M4.S(0.02,1.55,0.02)),'#c8a050',{seg:8});G.lathe(lg,M4.chain(M4.T(-1.45,1.5,-2.0),M4.S(1)),'#ffffff',[[0.001,0.34],[0.16,0.34],[0.24,0.0],[0.001,0.0]],{seg:20});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.92,0.7],emis:[1.6,1.1,0.55],rim:0,noShadow:1});
  // ceiling light
  const cb=new Geo();G.sphere(cb,M4.chain(M4.T(0.3,2.9,-0.3),M4.S(0.3,0.08,0.3)),[1,1,1]);D.push({mesh:mesh(cb),M:M4.id(),col:[1,0.96,0.85],emis:[1.4,1.25,0.95],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});
  return {D,pts:[[-1.45,1.6,-1.9,4.0,[2.4,1.5,0.65]],[0.3,2.6,-0.3,5.0,[1.2,1.05,0.8]],[2.4,1.4,0.1,2.2,[1.0,0.4,0.8]]]};}
function buildStadium(){texInit();const g=new Geo(),D=[],lg=new Geo();
  TX.field=TX.field||cvTex(512,1024,(x,w,h)=>{for(let i=0;i<16;i++){x.fillStyle=i%2?'#3a8a3e':'#43984a';x.fillRect(0,i*64,w,64);}x.strokeStyle='rgba(255,255,255,0.92)';x.lineWidth=8;for(let i=0;i<=16;i+=2){x.beginPath();x.moveTo(0,i*64);x.lineTo(w,i*64);x.stroke();}
    x.lineWidth=5;for(let i=0;i<16;i++)for(const xx of [w*0.36,w*0.64]){x.beginPath();x.moveTo(xx-10,i*64+32);x.lineTo(xx+10,i*64+32);x.stroke();}x.strokeRect(6,0,w-12,h);speck(x,w,h,2500,['rgba(255,255,255,0.06)','rgba(0,40,0,0.12)'],2);},{repeat:1});
  TX.crowd=TX.crowd||cvTex(1024,512,(x,w,h)=>{x.fillStyle='#1a1c2a';x.fillRect(0,0,w,h);const cols=['#3a5ab8','#ffd040','#f4f4f4','#2a8ad8','#ffd040','#3a5ab8','#f4f4f4','#ffb020','#4a7ae8'];
    for(let r=0;r<8;r++)for(let c=0;c<24;c++){const xx=c*43+20+(r%2)*20,yy=r*64+30;x.fillStyle='#f0c8a0';x.beginPath();x.arc(xx,yy-10,11,0,TAU);x.fill();x.fillStyle=cols[Math.floor(hash(r*91+c*7)*cols.length)];rr2(x,xx-17,yy+2,34,26);}
    x.fillStyle='rgba(0,0,0,0.35)';for(let r=0;r<8;r++)x.fillRect(0,r*64+58,w,6);},{repeat:1});
  const fd=new Geo();G.plane(fd,M4.S(30,1,60),[1,1,1],{uv:1});D.push({mesh:mesh(fd),M:M4.id(),tex:TX.field,col:[0.95,1,0.95],spec:0.4,rim:0});
  // stands: stepped tiers behind + both sides
  const sd=new Geo();for(let k=0;k<8;k++){G.box(sd,M4.chain(M4.T(0,k*1.1,-17-k*1.6),M4.S(60,1.1,1.6)),[1,1,1],{base:1,uvs:[12,1]});for(const s of [-1,1])G.box(sd,M4.chain(M4.T(s*(16+k*1.6),k*1.1,0),M4.S(1.6,1.1,60)),[1,1,1],{base:1,uvs:[1,12]});}
  D.push({mesh:mesh(sd),M:M4.id(),tex:TX.crowd,col:[0.9,0.9,0.95],rim:0,noShadow:1});
  BX(g,[0,0,-16.3],[60,1.0,0.3],'#1a3a8a');for(const s of [-1,1])BX(g,[s*15.3,0,0],[0.3,1.0,60],'#1a3a8a');
  // goalpost (yellow) behind the hero
  const gp=new Geo();G.cyl(gp,M4.chain(M4.T(0,0,-13),M4.S(0.12,3.0,0.12)),[1,1,1],{seg:10});G.box(gp,M4.chain(M4.T(0,3.0,-13),M4.S(5.6,0.16,0.16)),[1,1,1],{base:1});for(const x of [-2.8,2.8])G.cyl(gp,M4.chain(M4.T(x,3.0,-13),M4.S(0.1,5.0,0.1)),[1,1,1],{seg:10});
  D.push({mesh:mesh(gp),M:M4.id(),col:[1,0.85,0.15],rim:0.4,spec:0.8});
  // floodlight towers
  for(const [x,z] of [[-18,-20],[18,-20],[-18,10],[18,10]]){BX(g,[x,0,z],[0.5,22,0.5],'#5a5a66');const bank=new Geo();for(let i=0;i<3;i++)for(let j=0;j<4;j++)G.sphere(bank,M4.chain(M4.T(x+(j-1.5)*0.9,22+i*0.9,z+(z<0?1:-1)*0.3),M4.S(0.4)),[1,1,1]);D.push({mesh:mesh(bank),M:M4.id(),col:[1,1,1],emis:[6,6,5.5],rim:0,noShadow:1});}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.15});return {D,pts:[]};}
LIGHT5.denNight={sunDir:[0.3,0.9,0.5],sunCol:[0.3,0.26,0.22],sky:[0.2,0.16,0.14],gnd:[0.12,0.09,0.07],fog:[0.12,0.09,0.08],fogD:0.008,fogH:0,skyTop:[0.1,0.1,0.14],skyHor:[0.1,0.1,0.14],skyBot:[0.05,0.05,0.05],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.45,thr:0.9,sat:0.98,expo:1.0,lift:[0.01,0.01,0.03],gain:[1.03,1.0,0.95],vig:1.2,ink:1}};
LIGHT5.stadium={sunDir:[0.2,0.85,0.5],sunCol:[1.5,1.5,1.45],sky:[0.25,0.3,0.5],gnd:[0.2,0.3,0.2],fog:[0.06,0.07,0.16],fogD:0.004,fogH:0,skyTop:[0.02,0.03,0.1],skyHor:[0.14,0.16,0.34],skyBot:[0.05,0.05,0.1],cloud:0,stars:1,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.8,thr:0.85,sat:1.2,expo:1.05,lift:[0.0,0.0,0.03],gain:[1.0,1.0,1.04],vig:1.3,ink:1}};
{const _gs4=getSet;getSet=function(k){if(k==='den')return SETS.den||(SETS.den=buildDen());if(k==='stadium')return SETS.stadium||(SETS.stadium=buildStadium());return _gs4(k);};}
PL.push(
 ['den_wide','den','denNight',[1.0,1.55,3.4],[0.0,0.9,-1.0],60],
 ['den_sofa','den','denNight',[0.1,1.3,2.9],[0.1,0.8,-1.6],50],
 ['den_table','den','denNight',[0.3,1.5,3.4],[1.5,0.9,-1.0],60],
 ['den_pin','den','denNight',[-0.4,1.5,3.4],[1.9,0.9,0.0],58],
 ['st_hero','stadium','stadium',[0.0,0.7,6.0],[0,2.0,-4],50],
 ['st_wide','stadium','stadium',[3.0,2.2,10],[0,1.0,-6],52]);
