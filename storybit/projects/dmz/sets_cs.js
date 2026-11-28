'use strict';
// ===================== Ching Shih · 3D sets =====================
function csTex(){if(TX.csok)return;TX.csok=1;
  TX.sea=cvTex(512,512,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a5a78');g.addColorStop(1,'#1e4a66');x.fillStyle=g;x.fillRect(0,0,w,h);
    for(let i=0;i<900;i++){x.fillStyle=`rgba(${200+hash(i)*50},${230},${245},${0.04+hash(i*3)*0.1})`;const yy=hash(i*5)*h,xx=hash(i*7)*w,l=6+hash(i*9)*22;x.beginPath();x.ellipse(xx,yy,l,1.6,0,0,TAU);x.fill();}
    for(let i=0;i<300;i++){x.fillStyle='rgba(10,30,50,0.18)';x.beginPath();x.ellipse(hash(i*11)*w,hash(i*13)*h,10+hash(i)*30,2.5,0,0,TAU);x.fill();}},{repeat:1});
  TX.deck=cvTex(512,512,(x,w,h)=>{for(let i=0;i<10;i++){x.fillStyle=['#8a6038','#7a5230','#94683e','#6e4828'][i%4];x.fillRect(0,i*51,w,51);x.strokeStyle='rgba(30,16,8,0.7)';x.lineWidth=3;x.beginPath();x.moveTo(0,i*51);x.lineTo(w,i*51);x.stroke();
    for(let k=0;k<3;k++){const xx=hash(i*3+k)*w;x.beginPath();x.moveTo(xx,i*51);x.lineTo(xx,i*51+51);x.stroke();x.fillStyle='#2a1a10';x.beginPath();x.arc(xx+6,i*51+12,2.5,0,TAU);x.arc(xx+6,i*51+38,2.5,0,TAU);x.fill();}
    x.strokeStyle='rgba(40,22,10,0.2)';x.lineWidth=2;for(let k=0;k<5;k++){x.beginPath();const yy=i*51+8+k*9;x.moveTo(0,yy);x.bezierCurveTo(w*0.3,yy+4*Math.sin(i+k),w*0.7,yy-4,w,yy+2);x.stroke();}}},{repeat:1});
  TX.sail=cvTex(512,512,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'#a8281e');g.addColorStop(0.5,'#c83a2a');g.addColorStop(1,'#9a2218');x.fillStyle=g;x.fillRect(0,0,w,h);
    x.strokeStyle='rgba(60,10,6,0.35)';x.lineWidth=2;for(let i=0;i<40;i++){x.beginPath();x.moveTo(hash(i)*w,0);x.lineTo(hash(i*3)*w,h);x.stroke();}
    for(let i=1;i<7;i++){x.fillStyle='#3a2416';x.fillRect(0,i*h/7-6,w,12);x.fillStyle='rgba(255,220,180,0.25)';x.fillRect(0,i*h/7-6,w,3);}
    x.strokeStyle='#3a2416';x.lineWidth=10;x.strokeRect(0,0,w,h);},{});
  TX.redwood=cvTex(256,512,(x,w,h)=>{x.fillStyle='#9a2a22';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,10,8,0.35)';x.lineWidth=3;for(let i=0;i<20;i++){x.beginPath();x.moveTo(hash(i)*w,0);x.lineTo(hash(i)*w+(hash(i*3)-0.5)*20,h);x.stroke();}x.fillStyle='rgba(240,200,120,0.4)';x.fillRect(0,0,w,14);x.fillRect(0,h-14,w,14);},{repeat:1});
  TX.lattice=TX.lattice; TX.whitewall=cvTex(512,512,(x,w,h)=>{x.fillStyle='#e8dcc4';x.fillRect(0,0,w,h);speck(x,w,h,900,['rgba(150,130,100,0.2)','rgba(255,255,255,0.3)'],3);x.fillStyle='#5a4a3a';x.fillRect(0,h-60,w,60);},{repeat:1});
  TX.tilefloor=cvTex(512,512,(x,w,h)=>{for(let r=0;r<8;r++)for(let c=0;c<8;c++){x.fillStyle=`hsl(25,${12+hash(r*8+c)*8}%,${30+hash(r+c*8)*10}%)`;x.fillRect(c*64,r*64,64,64);x.strokeStyle='rgba(0,0,0,0.4)';x.lineWidth=2;x.strokeRect(c*64,r*64,64,64);}},{repeat:1});
  TX.rug2=cvTex(512,512,(x,w,h)=>{x.fillStyle='#8a1e22';x.fillRect(0,0,w,h);x.strokeStyle='#e8c060';x.lineWidth=14;x.strokeRect(24,24,w-48,h-48);x.lineWidth=4;x.strokeRect(54,54,w-108,h-108);x.beginPath();x.arc(w/2,h/2,110,0,TAU);x.stroke();x.beginPath();x.arc(w/2,h/2,70,0,TAU);x.stroke();},{});
  TX.sand=cvTex(512,512,(x,w,h)=>{x.fillStyle='#b89a6a';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(255,240,200,0.35)','rgba(140,100,60,0.25)'],2);},{repeat:1});
  TX.plasterW=cvTex(512,256,(x,w,h)=>{x.fillStyle='#d8ccb0';x.fillRect(0,0,w,h);speck(x,w,h,800,['rgba(120,100,70,0.2)'],3);x.fillStyle='#4a3a2e';x.fillRect(0,0,w,18);},{repeat:1});
}
// curved Chinese roof: two sloping planes with upturned corner ridges
function cnRoof(g,cx,y,cz,w,d,col,ridge){for(const sd of [-1,1]){G.box(g,M4.chain(M4.T(cx,y,cz),M4.RX(sd*0.5),M4.T(0,0,sd*d*0.3),M4.S(w+0.6,0.12,d*0.62)),col,{base:1});}
  G.box(g,M4.chain(M4.T(cx,y+0.08,cz),M4.S(w+0.8,0.22,0.24)),ridge||'#2a2a2e',{base:1});for(const sx of [-1,1])G.box(g,M4.chain(M4.T(cx+sx*(w/2+0.35),y+0.1,cz),M4.RZ(-sx*0.6),M4.S(0.5,0.12,0.2)),ridge||'#2a2a2e',{base:1});}
function cnHouse(g,x,z,w,d,h,wall,roof){BX(g,[x,0,z],[w,h,d],wall);BX(g,[x,0,z+d/2+0.01],[0.8,1.9,0.02],'#3a2416');for(const sx of [-1,1])BX(g,[x+sx*w*0.3,1.0,z+d/2+0.01],[0.5,0.5,0.02],'#6a4a2a');BX(g,[x,h-0.2,z],[w+0.1,0.2,d+0.1],'#3a2a20');tileRoof(g,x,h,z,w,d,{col:roof,col2:shd5(roof),pitch:0.5,ov:0.45});}
function shd5(h){const n=parseInt(h.slice(1),16);const f=v=>Math.max(0,Math.min(255,Math.round(v*1.18)));return '#'+[f(n>>16),f((n>>8)&255),f(n&255)].map(v=>v.toString(16).padStart(2,'0')).join('');}
// ---------- open sea (ships are drawn on the water plane) ----------
function buildSea(){texInit();csTex();const D=[];const sea=new Geo();G.plane(sea,M4.chain(M4.T(0,0,-200),M4.S(1200,1,800)),[1,1,1],{uv:220});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea,col:[1,1,1],spec:0.9,rim:0,noShadow:1});
  // distant islands
  const g=new Geo();for(const [x,z,s] of [[-160,-420,40],[120,-460,55],[260,-380,30],[-320,-360,25]])G.blob(g,M4.chain(M4.T(x,-2,z),M4.S(s*2.2,s*0.5,s)),'#4a5a4a',{seed:x,j:0.25,su:10,sv:6});D.push({mesh:mesh(g),M:M4.id(),col:[0.85,0.9,0.95],rim:0.1});
  return {D,pts:[]};}
// ---------- the deck of a pirate junk ----------
function buildDeck(){texInit();csTex();const g=new Geo(),lg=new Geo(),D=[];
  const sea=new Geo();G.plane(sea,M4.chain(M4.T(0,-1.6,-100),M4.S(800,1,600)),[1,1,1],{uv:150});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea,col:[1,1,1],spec:2,rim:0,noShadow:1});
  const dk=new Geo();G.box(dk,M4.chain(M4.T(0,-0.3,-2),M4.S(6.4,0.3,16)),[1,1,1],{base:1,uvs:[3,6]});D.push({mesh:mesh(dk),M:M4.id(),tex:TX.deck,col:[1,1,1],spec:0.6,rim:0});
  // hull sides / bulwarks with rails
  for(const sd of [-1,1]){BX(g,[sd*3.2,-1.6,-2],[0.2,2.4,16],'#5a3a22');BX(g,[sd*3.2,0.8,-2],[0.32,0.12,16],'#3a2416');for(let i=0;i<14;i++)BX(g,[sd*3.15,0,-9+i*1.1],[0.1,0.8,0.1],'#3a2416');}
  // raised stern castle at the back with steps and a carved rail
  BX(g,[0,0,-8.2],[6.4,1.4,3.6],'#6a4428');BX(g,[0,1.4,-8.2],[6.5,0.12,3.7],'#3a2416');for(let i=0;i<12;i++)BX(g,[-2.9+i*0.53,1.52,-6.45],[0.08,0.6,0.08],'#9a2a22');BX(g,[0,2.1,-6.45],[6.4,0.1,0.12],'#9a2a22');
  for(let s=0;s<5;s++)BX(g,[2.2,s*0.28,-6.2+s*0.3],[1.2,0.06,0.3],'#4a2c18');
  // main mast, yard, battened red sail (3D plane), rigging
  G.cyl(g,M4.chain(M4.T(0,0,-3.2),M4.S(0.22,13,0.22)),'#4a2c18',{seg:12,rt:0.75});
  D.push({mesh:VPL(5.6,8.4),M:M4.chain(M4.T(0.2,7.6,-3.0),M4.RY(0.12)),tex:TX.sail,col:[1,1,1],rim:0.2,noShadow:1});
  G.cyl(g,M4.chain(M4.T(-0.2,3.2,-2.95),M4.RZ(Math.PI/2),M4.RY(0.12),M4.S(0.08,6.0,0.08),M4.T(0,-0.5,0)),'#3a2416',{seg:8});
  G.cyl(g,M4.chain(M4.T(-0.2,11.8,-2.95),M4.RZ(Math.PI/2),M4.RY(0.12),M4.S(0.08,6.0,0.08),M4.T(0,-0.5,0)),'#3a2416',{seg:8});
  for(const [x0,y0,z0,x1,y1,z1] of [[3.1,0.8,-1,0,12,-3.2],[-3.1,0.8,-1,0,12,-3.2],[3.1,0.8,-5,0,12,-3.2],[-3.1,0.8,-5,0,12,-3.2]]){const dx=x1-x0,dy=y1-y0,dz=z1-z0,L=Math.hypot(dx,dy,dz);
    const M=M4.chain(M4.T(x0,y0,z0),M4.RY(Math.atan2(dx,dz)),M4.RX(Math.acos(dy/L)),M4.S(0.025,L,0.025));G.cyl(g,M,'#2a1a10',{seg:5});}
  // cannons on the deck sides, barrels, coiled rope, lantern posts
  for(const sd of [-1,1])for(const z of [-0.5,2.5,5.0]){BX(g,[sd*2.7,0,z],[0.5,0.25,0.7],'#3a2416');G.cyl(g,M4.chain(M4.T(sd*2.7,0.38,z),M4.RZ(sd*Math.PI/2),M4.S(0.14,1.0,0.14),M4.T(0,-0.3,0)),'#2a2a2e',{seg:12,rt:0.85});}
  for(const [x,z] of [[-2.2,1.2],[-1.8,1.9],[2.0,-5.5]]){G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.3,0.75,0.3)),'#7a5432',{seg:14});for(const y of [0.15,0.6])G.cyl(g,M4.chain(M4.T(x,y,z),M4.S(0.31,0.05,0.31)),'#2a2a2e',{seg:14});}
  G.cyl(g,M4.chain(M4.T(1.6,0,3.6),M4.S(0.45,0.15,0.45)),'#c8a868',{seg:16});
  for(const x of [-3.0,3.0]){G.cyl(g,M4.chain(M4.T(x,1.5,-6.45),M4.S(0.04,1.2,0.04)),'#2a1a10',{seg:6});G.lathe(lg,M4.chain(M4.T(x,2.5,-6.45),M4.S(1)),'#ffffff',[[0.001,0],[0.14,0.03],[0.2,0.18],[0.14,0.34],[0.001,0.36]],{seg:14});}
  // stern flag pole with a red flag
  G.cyl(g,M4.chain(M4.T(0,1.4,-9.6),M4.S(0.06,5,0.06)),'#2a1a10',{seg:6});D.push({mesh:VPL(1.6,1.0),M:M4.chain(M4.T(0.8,5.8,-9.6)),col:[0.85,0.15,0.12],rim:0.2,noShadow:1});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.7,0.4],emis:[1.4,0.6,0.25],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.5});
  return {D,pts:[[-3,2.6,-6.3,4,[1.8,1.0,0.5]],[3,2.6,-6.3,4,[1.8,1.0,0.5]]]};}
// ---------- Canton waterfront: pier, lantern-lit shophouses, the Pearl River ----------
function buildCanton(){texInit();csTex();const g=new Geo(),lg=new Geo(),D=[];
  const sea=new Geo();G.plane(sea,M4.chain(M4.T(0,-0.6,10),M4.S(300,1,60)),[1,1,1],{uv:60});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea,col:[0.95,0.9,0.85],spec:2.2,rim:0,noShadow:1});
  const pr=new Geo();G.box(pr,M4.chain(M4.T(0,-0.15,-1.5),M4.S(40,0.15,5)),[1,1,1],{base:1,uvs:[12,2]});D.push({mesh:mesh(pr),M:M4.id(),tex:TX.deck,col:[0.9,0.85,0.8],rim:0});
  for(let i=0;i<20;i++)G.cyl(g,M4.chain(M4.T(-19+i*2,-1.6,1.0),M4.S(0.12,1.6,0.12)),'#3a2416',{seg:8});
  // shophouses along the quay
  const hs=new Geo();for(let i=0;i<9;i++){const x=-12+i*3.1,h=3.2+hash(i)*1.6;cnHouse(hs,x,-5.6,2.9,3.2,h,['#d8ccb0','#c8b89a','#e0d4bc'][i%3],['#3a4a3a','#4a3a30','#2e3a4a'][i%3]);}D.push({mesh:mesh(hs),M:M4.id(),col:[1,1,1],rim:0.12});
  // hanging lanterns along the eaves
  for(let i=0;i<18;i++)G.lathe(lg,M4.chain(M4.T(-13+i*1.55,2.4+hash(i)*0.3,-3.85),M4.S(0.8)),'#ffffff',[[0.001,0],[0.16,0.04],[0.22,0.2],[0.16,0.38],[0.001,0.42]],{seg:12});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.5,0.3],emis:[1.8,0.6,0.25],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  const pts=[];for(let i=0;i<6;i++)pts.push([-12+i*5,2.6,-3.6,5,[1.6,0.8,0.4]]);return {D,pts};}
// ---------- the governor-general's hall (yamen) ----------
function buildYamen(){texInit();csTex();const g=new Geo(),lg=new Geo(),D=[];
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-2),M4.S(12,1,12)),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.tilefloor,col:[1,1,1],spec:0.9,rim:0});
  const rg=new Geo();G.plane(rg,M4.chain(M4.T(0,0.01,-2.2),M4.S(2.6,1,7)),[1,1,1]);D.push({mesh:mesh(rg),M:M4.id(),tex:TX.rug2,col:[1,1,1],rim:0});
  D.push({mesh:VPL(12,5),M:M4.chain(M4.T(0,2.5,-7.4)),tex:TX.whitewall,col:[0.95,0.92,0.88],rim:0,noShadow:1});
  for(const sd of [-1,1])D.push({mesh:VPL(12,5),M:M4.chain(M4.T(sd*5.4,2.5,-2),M4.RY(-sd*Math.PI/2)),tex:TX.whitewall,col:[0.9,0.88,0.84],rim:0,noShadow:1});
  // red lacquered pillars + beams
  const pl=new Geo();for(const x of [-3.4,-1.6,1.6,3.4])for(const z of [-6.2,-3.0,0.2])G.cyl(pl,M4.chain(M4.T(x,0,z),M4.S(0.22,4.6,0.22)),[1,1,1],{seg:14});D.push({mesh:mesh(pl),M:M4.id(),tex:TX.redwood,col:[1,1,1],rim:0.2,spec:0.8});
  for(const z of [-6.2,-3.0,0.2])BX(g,[0,4.4,z],[8,0.36,0.36],'#3a5a4a');
  // dais, desk, carved chair, folding screen with a painted landscape
  BX(g,[0,0,-6.0],[4.4,0.35,1.8],'#5a2a1a');BX(g,[0,0.35,-5.6],[2.4,0.8,0.8],'#6a2e1c');BX(g,[0,1.15,-5.6],[2.5,0.06,0.9],'#4a1e12');
  BX(g,[0,0.35,-6.5],[1.0,0.55,0.8],'#4a1e12');BX(g,[0,0.9,-6.85],[1.0,1.3,0.12],'#4a1e12');
  for(let i=0;i<4;i++)BX(g,[-1.65+i*1.1,0,-7.25],[1.05,2.6,0.08],i%2?'#d8c8a0':'#e0d0a8');
  // incense burner, scroll banners, lanterns
  G.cyl(g,M4.chain(M4.T(-1.8,0,-4.2),M4.S(0.3,0.6,0.3)),'#6a5a3a',{seg:16});for(const x of [-2.6,2.6])BX(g,[x,1.2,-7.32],[0.7,2.6,0.03],'#e8dcc0');
  for(const x of [-3.4,3.4])for(const z of [-3.0,0.2])G.lathe(lg,M4.chain(M4.T(x,3.2,z+0.4),M4.S(1)),'#ffffff',[[0.001,0],[0.18,0.05],[0.26,0.24],[0.18,0.44],[0.001,0.48]],{seg:14});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.5,0.3],emis:[1.8,0.7,0.3],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.6});
  return {D,pts:[[0,3.6,-3,7,[1.6,1.1,0.7]],[0,3,0,6,[1.2,0.9,0.6]]]};}
// ---------- a coastal fishing village ----------
function buildVillage(){texInit();csTex();const g=new Geo(),D=[];
  const sea=new Geo();G.plane(sea,M4.chain(M4.T(0,-0.3,40),M4.S(400,1,60)),[1,1,1],{uv:80});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea,col:[1,1,1],spec:2,rim:0,noShadow:1});
  const sd=new Geo();G.plane(sd,M4.chain(M4.T(0,0,0),M4.S(200,1,40)),[1,1,1],{uv:30});D.push({mesh:mesh(sd),M:M4.id(),tex:TX.sand,col:[0.8,0.75,0.68],rim:0});
  const hs=new Geo();for(let i=0;i<8;i++){const x=-11+i*3.2+hash(i)*0.8,z=-7-hash(i*3)*3;cnHouse(hs,x,z,2.6,2.6,2.4+hash(i*2)*0.6,['#d0c0a0','#c4b090','#d8c8a8'][i%3],['#5a4a3a','#4a5a4a','#6a4a3a'][i%3]);}D.push({mesh:mesh(hs),M:M4.id(),col:[1,1,1],rim:0.12});
  // palms / banana plants, drying racks with nets
  for(const [x,z] of [[-6,-3],[5,-4],[9,-2],[-10,-2.5]]){G.cyl(g,M4.chain(M4.T(x,0,z),M4.RZ(0.15),M4.S(0.14,4,0.14)),'#6a5a3a',{seg:8,rt:0.7});for(let k=0;k<7;k++){const a=k/7*TAU;G.box(g,M4.chain(M4.T(x+0.6,4,z),M4.RY(a),M4.RZ(0.7),M4.S(0.25,1.8,0.04)),'#3a7a3a',{base:1});}}
  for(const x of [-2,1.2]){BX(g,[x,0,-1.6],[0.08,1.6,0.08],'#5a3a22');BX(g,[x+1.6,0,-1.6],[0.08,1.6,0.08],'#5a3a22');BX(g,[x+0.8,1.5,-1.6],[1.7,0.06,0.06],'#5a3a22');BX(g,[x+0.8,0.6,-1.6],[1.6,0.9,0.02],'#8a8a6a');}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[]};}
// ---------- gambling house (warm lantern light, tables) ----------
function buildGamble(){texInit();csTex();const g=new Geo(),lg=new Geo(),D=[];
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-2),M4.S(12,1,12)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.deck,col:[0.9,0.8,0.75],rim:0});
  D.push({mesh:VPL(12,4.5),M:M4.chain(M4.T(0,2.25,-6.5)),tex:TX.plasterW,col:[0.9,0.82,0.7],rim:0,noShadow:1});for(const sd of [-1,1])D.push({mesh:VPL(12,4.5),M:M4.chain(M4.T(sd*5,2.25,-1),M4.RY(-sd*Math.PI/2)),tex:TX.plasterW,col:[0.85,0.78,0.66],rim:0,noShadow:1});
  const pl=new Geo();for(const x of [-3.5,3.5])for(const z of [-5,-1.5])G.cyl(pl,M4.chain(M4.T(x,0,z),M4.S(0.18,4.5,0.18)),[1,1,1],{seg:12});D.push({mesh:mesh(pl),M:M4.id(),tex:TX.redwood,col:[1,1,1],rim:0.2});
  for(const [x,z] of [[-1.8,-3.4],[1.8,-3.0],[0,-1.2]]){BX(g,[x,0,z],[1.6,0.75,1.0],'#5a2e1a');BX(g,[x,0.75,z],[1.7,0.05,1.1],'#2a5a3a');for(const [dx,dz] of [[-1.1,0],[1.1,0]])BX(g,[x+dx,0,z+dz],[0.4,0.45,0.4],'#4a2414');}
  for(let i=0;i<6;i++)G.lathe(lg,M4.chain(M4.T(-3+i*1.2,3.1+hash(i)*0.3,-3+hash(i*3)*2),M4.S(1)),'#ffffff',[[0.001,0],[0.18,0.05],[0.25,0.22],[0.18,0.42],[0.001,0.46]],{seg:12});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.5,0.3],emis:[2.0,0.7,0.3],rim:0,noShadow:1});D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});
  return {D,pts:[[0,3,-2.5,7,[2.0,1.1,0.55]],[-2,2.6,-3.5,4,[1.6,0.8,0.4]],[2,2.6,-3,4,[1.6,0.8,0.4]]]};}
// ---------- her bedroom (canopy bed, lattice window) ----------
function buildBedCN(){texInit();csTex();const g=new Geo(),lg=new Geo(),D=[];
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1.5),M4.S(8,1,8)),[1,1,1],{uv:3});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.deck,col:[0.85,0.75,0.7],rim:0});
  D.push({mesh:VPL(8,3.6),M:M4.chain(M4.T(0,1.8,-4.2)),tex:TX.plasterW,col:[0.92,0.86,0.78],rim:0,noShadow:1});
  // canopy bed: frame posts, roof, curtains, mattress, quilt, pillow
  for(const [x,z] of [[-1.1,-3.9],[1.1,-3.9],[-1.1,-1.8],[1.1,-1.8]])BX(g,[x,0,z],[0.12,2.4,0.12],'#5a2a1a');BX(g,[0,2.4,-2.85],[2.5,0.16,2.3],'#4a1e12');
  BX(g,[0,0,-2.85],[2.3,0.45,2.2],'#6a2e1c');BX(g,[0,0.45,-2.85],[2.2,0.16,2.1],'#e8dcc8');BX(g,[0,0.61,-2.6],[2.1,0.14,1.4],'#a8342a');BX(g,[0,0.61,-3.6],[0.8,0.16,0.4],'#e8d8b8');
  for(const sd of [-1,1])BX(g,[sd*1.08,0.7,-2.85],[0.04,1.7,2.2],'#c8a050');
  // lattice window with warm light, lamp
  BX(lg,[2.4,1.5,-4.15],[1.2,1.2,0.03],'#ffffff');for(let i=0;i<5;i++){BX(g,[1.8+i*0.3,1.5,-4.1],[0.04,1.2,0.04],'#3a2416');BX(g,[2.4,0.9+i*0.3,-4.1],[1.2,0.04,0.04],'#3a2416');}
  BX(g,[-2.2,0,-3.6],[0.6,0.7,0.5],'#5a2a1a');G.lathe(lg,M4.chain(M4.T(-2.2,0.7,-3.6),M4.S(1)),'#ffffff',[[0.001,0],[0.12,0.03],[0.16,0.18],[0.12,0.32],[0.001,0.34]],{seg:12});
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.8,0.5],emis:[1.4,1.0,0.6],rim:0,noShadow:1});D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});
  return {D,pts:[[-2.2,1.2,-3.4,4,[1.6,1.0,0.5]],[2.4,1.6,-3.6,4,[1.4,1.1,0.8]]]};}
// ---------- lighting ----------
LIGHT5.seaDay={sunDir:[-0.5,0.55,-0.65],sunCol:[1.4,1.25,1.05],sky:[0.5,0.6,0.72],gnd:[0.3,0.4,0.45],fog:[0.72,0.8,0.86],fogD:0.004,fogH:0,skyTop:[0.25,0.45,0.8],skyHor:[0.82,0.86,0.9],skyBot:[0.5,0.6,0.7],cloud:0.7,stars:0,sunSize:900,sunGlow:[1,0.95,0.8],
  post:{bloom:0.35,thr:1.0,sat:1.12,expo:1.02,lift:[0,0.01,0.02],gain:[1.02,1,0.98],vig:1.05,ink:1}};
LIGHT5.seaDusk={sunDir:[0.3,0.12,-0.95],sunCol:[1.6,0.8,0.45],sky:[0.5,0.4,0.45],gnd:[0.3,0.25,0.3],fog:[0.85,0.6,0.5],fogD:0.005,fogH:0,skyTop:[0.25,0.25,0.5],skyHor:[1.0,0.6,0.4],skyBot:[0.5,0.4,0.45],cloud:0.8,stars:0,sunSize:500,sunGlow:[1,0.7,0.45],
  post:{bloom:0.45,thr:0.95,sat:1.15,expo:1.04,lift:[0.02,0,0.03],gain:[1.04,0.95,0.9],vig:1.1,ink:1}};
LIGHT5.seaStorm={sunDir:[0.2,0.5,-0.8],sunCol:[0.7,0.72,0.8],sky:[0.32,0.34,0.38],gnd:[0.2,0.22,0.25],fog:[0.4,0.42,0.46],fogD:0.008,fogH:0,skyTop:[0.18,0.2,0.25],skyHor:[0.45,0.47,0.5],skyBot:[0.3,0.3,0.32],cloud:1,stars:0,sunSize:3000,sunGlow:[0.4,0.4,0.45],
  post:{bloom:0.3,thr:1.0,sat:0.9,expo:1.0,lift:[0.01,0.01,0.02],gain:[0.96,0.98,1.02],vig:1.2,ink:1}};
LIGHT5.cantonEve={sunDir:[0.5,0.2,-0.8],sunCol:[1.5,0.85,0.5],sky:[0.45,0.38,0.45],gnd:[0.3,0.24,0.22],fog:[0.7,0.5,0.45],fogD:0.012,fogH:0,skyTop:[0.22,0.22,0.48],skyHor:[1.0,0.6,0.42],skyBot:[0.5,0.4,0.4],cloud:0.6,stars:0,sunSize:600,sunGlow:[1,0.7,0.45],
  post:{bloom:0.55,thr:0.9,sat:1.15,expo:1.04,lift:[0.02,0,0.03],gain:[1.05,0.96,0.9],vig:1.1,ink:1}};
LIGHT5.hall={sunDir:[0.3,0.9,0.3],sunCol:[0.55,0.48,0.38],sky:[0.45,0.38,0.3],gnd:[0.3,0.24,0.18],fog:[0.3,0.22,0.15],fogD:0.02,fogH:0,skyTop:[0.2,0.15,0.1],skyHor:[0.3,0.22,0.15],skyBot:[0.2,0.15,0.1],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.45,thr:0.95,sat:1.12,expo:1.08,lift:[0.02,0.01,0.01],gain:[1.05,0.98,0.9],vig:1.15,ink:1}};
LIGHT5.lampWarm={sunDir:[0.3,0.9,0.3],sunCol:[0.4,0.3,0.22],sky:[0.3,0.22,0.16],gnd:[0.2,0.14,0.1],fog:[0.2,0.12,0.08],fogD:0.02,fogH:0,skyTop:[0.1,0.08,0.06],skyHor:[0.15,0.1,0.08],skyBot:[0.1,0.06,0.04],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.6,thr:0.85,sat:1.15,expo:1.12,lift:[0.02,0.01,0.0],gain:[1.08,0.96,0.85],vig:1.3,ink:1}};
{const _gs=getSet;getSet=function(k){const B={sea:buildSea,deck:buildDeck,canton:buildCanton,yamen:buildYamen,village:buildVillage,gamble:buildGamble,bedcn:buildBedCN};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gs(k);};}
PL.length=0;
PL.push(
 ['sea_wide','sea','seaDay',[0,6,30],[0,2,-40],52],
 ['sea_low','sea','seaDay',[0,1.6,20],[0,2.4,-40],50],
 ['sea_dusk','sea','seaDusk',[0,5,30],[0,2,-40],52],
 ['sea_storm','sea','seaStorm',[0,5,30],[0,2,-40],52],
 ['deck_fwd','deck','seaDay',[0.6,1.7,6.5],[-0.2,1.9,-6],52],
 ['deck_stern','deck','seaDusk',[0.4,1.8,4.5],[0,1.8,-8],50],
 ['canton','canton','cantonEve',[1.5,2.2,26],[0,1.4,-3],46],
 ['yamen','yamen','hall',[0.3,1.7,5.0],[0,1.3,-6],50],
 ['yamen_close','yamen','hall',[0.2,1.55,1.4],[0,1.2,-6],46],
 ['village','village','seaDay',[1.0,1.7,9],[0,1.6,-6],52],
 ['gamble','gamble','lampWarm',[0.5,1.7,4.6],[0,1.0,-4],52],
 ['bedcn','bedcn','lampWarm',[1.6,1.6,2.0],[-0.3,0.7,-3],50]);
