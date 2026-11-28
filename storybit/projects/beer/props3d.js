'use strict';
// ===== Caesar: 3D props (s4 engine), rendered once to keyed sprites =====
const STEEL='#c9ced8',BRONZE='#b48a3c',GOLD='#e0b040',WOOD='#5a3620',CREAM='#ece0c2',PURP='#5a1e6e';
function push(D,geo,o={}){D.push({mesh:mesh(geo),M:M4.id(),col:[1,1,1],spec:o.spec??1,rim:o.rim??0.3,emis:o.emis});}
// blade along +x from x0 to tip; w(u) half-height profile, thickness th
function blade(g,x0,x1,wf,th,col){const secs=[];const N=22;for(let i=0;i<=N;i++){const u=i/N;const x=x0+(x1-x0)*u;const w=Math.max(0.012,wf(u));secs.push([x,-w,w,th*(1-u*0.6),1]);}vLoft(g,secs,col,1.35,24);}
function buildPugio(D){const bl=new Geo(),br=new Geo(),gr=new Geo(),fu=new Geo();
  blade(bl,0,2.3,u=>u<0.25?0.3-u*0.24:u<0.55?0.24+(u-0.25)*0.2:0.3*(1-(u-0.55)/0.45)**0.8,0.055,STEEL);
  vBox(fu,[1.05,0,0],[1.9,0.04,0.075],'#8e96a4');// midrib
  vBox(br,[-0.04,0,0],[0.14,0.78,0.2],BRONZE);vBox(br,[-0.04,0,0],[0.2,0.6,0.24],'#d4aa55');
  vLoft(gr,[[-0.1,-0.12,0.12,0.12,1],[-0.35,-0.15,0.15,0.14,1],[-0.5,-0.21,0.21,0.18,1],[-0.65,-0.15,0.15,0.14,1],[-0.92,-0.12,0.12,0.12,1]],WOOD,2,24);
  vCylX(br,[-0.5,0,0],0.215,0.08,BRONZE,24);
  const pm=M4.chain(M4.T(-1.02,0,0),M4.S(0.14,0.3,0.3));G.sphere(br,pm,BRONZE,{});
  for(const x of [-0.3,-0.7])G.sphere(br,M4.chain(M4.T(x,0,0.16),M4.S(0.04,0.04,0.04)),'#f0d070',{su:8,sv:6});
  push(D,bl,{spec:2.2,rim:0.5});push(D,fu,{spec:1.6});push(D,br,{spec:1.6,rim:0.4});push(D,gr,{spec:0.5,rim:0.2});}
function buildGladius(D){const bl=new Geo(),br=new Geo(),gr=new Geo();
  blade(bl,0,4.4,u=>u<0.82?0.24-u*0.03:0.215*(1-(u-0.82)/0.18),0.05,STEEL);vBox(bl,[1.8,0,0],[3.4,0.035,0.06],'#9aa2ae');
  vLoft(br,[[0.02,-0.36,0.36,0.22,1],[-0.12,-0.4,0.4,0.26,1],[-0.26,-0.36,0.36,0.22,1]],'#7a5030',2,28);
  vLoft(gr,[[-0.26,-0.12,0.12,0.12,1],[-0.4,-0.14,0.14,0.13,1],[-0.55,-0.12,0.12,0.12,1],[-0.7,-0.14,0.14,0.13,1],[-0.86,-0.12,0.12,0.12,1]],'#d8ccb0',2,24);
  G.sphere(br,M4.chain(M4.T(-1.0,0,0),M4.S(0.2,0.24,0.24)),'#7a5030',{});G.sphere(br,M4.chain(M4.T(-1.17,0,0),M4.S(0.05,0.07,0.07)),GOLD,{su:8,sv:6});
  push(D,bl,{spec:2.2,rim:0.5});push(D,br,{spec:0.8});push(D,gr,{spec:0.5});}
// open scroll: sheet in x-y plane facing +z, rolled ends top & bottom
function buildScroll(D,o={}){const p=new Geo(),w=new Geo();const hw=1.5,hh=1.9;
  const P=[];for(let j=0;j<=12;j++){const y=-hh+j/12*2*hh;const r=[];for(let k=0;k<=16;k++){const x=-hw+k/16*2*hw;r.push([x,y,Math.sin(k/16*Math.PI)*0.12-0.04*Math.cos(j/12*TAU)]);}P.push(r);}vGrid(p,P,CREAM,false);
  for(const y of [-hh-0.18,hh+0.18]){vCylX(p,[0,y,0.05],0.22,2*hw+0.04,'#e2d4b0',28);vCylX(w,[0,y,0.05],0.09,2*hw+0.6,WOOD,16);for(const s of [-1,1])G.sphere(w,M4.chain(M4.T(s*(hw+0.36),y,0.05),M4.S(0.13,0.13,0.13)),GOLD,{});}
  push(D,p,{spec:0.25,rim:0.15});push(D,w,{spec:1.2});}
function buildRolled(D){const p=new Geo(),s=new Geo();vCylX(p,[0,0,0],0.32,2.6,'#e6d8b6',32);vCylX(p,[1.3,0,0],0.2,0.02,'#c8b890',24);
  vCylX(s,[0.0,0,0],0.335,0.22,'#8a1a1a',32);vCylZ(s,[0.0,0,0.36],0.2,0.1,'#b02020',24);vBox(s,[0.05,-0.42,0.3],[0.12,0.4,0.03],'#8a1a1a');
  push(D,p,{spec:0.3,rim:0.2});push(D,s,{spec:1.4});}
function buildGoblet(D){const g=new Geo();G.lathe(g,M4.id(),GOLD,[[0.0,0],[0.55,0.02],[0.5,0.1],[0.12,0.3],[0.08,0.9],[0.16,1.05],[0.5,1.25],[0.62,1.8],[0.6,1.85],[0.54,1.84]],{seg:40});
  const wine=new Geo();G.cyl(wine,M4.chain(M4.T(0,1.7,0),M4.S(0.54,0.02,0.54)),'#5a0a18',{seg:32});push(D,g,{spec:2,rim:0.5});push(D,wine,{spec:1.5});}
function buildTorch(D){const w=new Geo(),cl=new Geo();G.cyl(w,M4.chain(M4.T(0,-2.4,0),M4.S(0.1,2.6,0.1)),WOOD,{seg:16,rt:1.3,rb:0.8});
  G.cyl(cl,M4.chain(M4.T(0,0,0),M4.S(0.2,0.7,0.2)),'#3a2a1c',{seg:18,rt:1.15,rb:1});for(let k=0;k<3;k++)G.cyl(cl,M4.chain(M4.T(0,0.08+k*0.22,0),M4.S(0.235,0.05,0.235)),'#6a5030',{seg:18});
  push(D,w,{spec:0.4});push(D,cl,{spec:0.3});}
// sella curulis: gold folding X-stool with a purple cushion (seat height ~1.0)
function buildSella(D){const g=new Geo(),cu=new Geo();
  for(const z of [-0.55,0.55]){vBeam(g,[-0.7,0,z],[0.7,0.95,z],0.09,GOLD);vBeam(g,[0.7,0,z],[-0.7,0.95,z],0.09,GOLD);G.sphere(g,M4.chain(M4.T(0,0.48,z*1.05),M4.S(0.1,0.1,0.06)),'#f6d878',{});
    for(const x of [-0.75,0.75])G.sphere(g,M4.chain(M4.T(x,0.02,z),M4.S(0.09,0.06,0.09)),GOLD,{});}
  for(const x of [-0.72,0.72])vBeam(g,[x,0.97,-0.6],[x,0.97,0.6],0.08,GOLD);vBeam(g,[-0.75,0.02,-0.55],[-0.75,0.02,0.55],0.06,GOLD);vBeam(g,[0.75,0.02,-0.55],[0.75,0.02,0.55],0.06,GOLD);
  vLoft(cu,[[-0.78,0.99,1.16,0.62,0.6],[0,0.99,1.2,0.64,0.6],[0.78,0.99,1.16,0.62,0.6]],PURP,3,32);
  vBox(cu,[0,1.0,0.64],[1.5,0.06,0.03],'#d8b040');
  push(D,g,{spec:2,rim:0.5});push(D,cu,{spec:0.4});}
// Roman bed (lectus) seen from its foot: headrest at -x end, turned legs
function buildLectus(D){const w=new Geo(),m=new Geo(),cv=new Geo();
  vBox(w,[0,0.75,0],[4.2,0.16,1.9],'#6a4024');
  for(const x of [-1.95,1.95])for(const z of [-0.82,0.82])G.lathe(w,M4.chain(M4.T(x,0,z)),'#7a4a28',[[0.12,0],[0.16,0.1],[0.09,0.25],[0.15,0.4],[0.08,0.55],[0.13,0.68],[0.11,0.75]],{seg:20});
  vLoft(m,[[-2.05,0.82,1.18,0.9,0.7],[2.05,0.82,1.18,0.9,0.7]],'#f2ecde',4,36);
  vLoft(cv,[[-0.7,0.86,1.24,0.96,0.75],[0.4,0.86,1.27,0.97,0.75],[2.08,0.86,1.22,0.95,0.75]],'#6a1e5a',4,36);vBox(cv,[2.08,1.02,0],[0.04,0.08,1.9],'#d8b040');
  // headrest (fulcrum) — curved gilded arm at the head end
  const P=[];for(let j=0;j<=10;j++){const u=j/10;const x=-2.05-Math.sin(u*Math.PI*0.5)*0.35,y=1.1+u*0.85;const r=[];for(let k=0;k<=8;k++){const z=-0.9+k/8*1.8;r.push([x,y,z]);}P.push(r);}
  vGrid(w,P,'#8a5a30',false);for(const z of [-0.93,0.93]){const Q=[];for(let j=0;j<=10;j++){const u=j/10;Q.push([-2.05-Math.sin(u*Math.PI*0.5)*0.35,1.1+u*0.85,z]);}for(let j=0;j<10;j++)vBeam(w,Q[j],Q[j+1],0.09,GOLD);}
  vLoft(m,[[-1.95,1.12,1.5,0.62,0.6],[-1.4,1.12,1.45,0.6,0.6]],'#fbf6ea',3,28);// pillow
  push(D,w,{spec:1.1});push(D,m,{spec:0.3,rim:0.2});push(D,cv,{spec:0.5,rim:0.2});}
function buildCrown(D){const g=new Geo(),j=new Geo();G.lathe(g,M4.id(),GOLD,[[1.0,0],[1.04,0.05],[1.04,0.45],[1.0,0.5],[0.98,0.48],[0.98,0.02]],{seg:48});
  for(let i=0;i<8;i++){const a=i/8*TAU;const M=M4.chain(M4.T(Math.sin(a)*1.0,0.45,-Math.cos(a)*1.0),M4.S(0.14,0.55,0.14));G.cyl(g,M,GOLD,{seg:10,rt:0.05,rb:1});G.sphere(j,M4.chain(M4.T(Math.sin(a)*1.0,1.02,-Math.cos(a)*1.0),M4.S(0.08,0.08,0.08)),'#f8e090',{su:10,sv:8});
    G.sphere(j,M4.chain(M4.T(Math.sin(a+0.39)*1.045,0.24,-Math.cos(a+0.39)*1.045),M4.S(0.09,0.09,0.05)),i%2?'#c01828':'#1848c0',{su:10,sv:8});}
  push(D,g,{spec:2.2,rim:0.5});push(D,j,{spec:2.5});}
// laurel wreath (gold) — ring of leaf pairs
function buildLaurel(D){const g=new Geo();for(let i=0;i<26;i++){const a=-Math.PI*0.95+i/25*Math.PI*1.9;for(const s of [-1,1]){const M=M4.chain(M4.T(Math.sin(a),0.05*s,-Math.cos(a)),M4.RY(-a),M4.RZ(s*0.5),M4.RX(0.5),M4.S(0.06,0.2,0.025));G.sphere(g,M,'#d4a83a',{su:10,sv:6});}}
  push(D,g,{spec:2.2,rim:0.4});}
const PB={pugio:buildPugio,gladius:buildGladius,scroll:buildScroll,rolled:buildRolled,goblet:buildGoblet,torch:buildTorch,sella:buildSella,lectus:buildLectus,crown:buildCrown,laurel:buildLaurel};
// auto-fit camera: yaw/pitch around the prop's centre
function renderProp(b,o={}){if(!E.gl)glInit();const D=[];PB[b](D,o);
  const R0=M4.chain(M4.RZ(o.roll||0),M4.RY(o.yaw||0),M4.RX(o.pitch||0));for(const d of D)d.M=M4.chain(R0,d.M);
  const ctr=o.c||[0,0,0],rad=o.r||2.5,fov=18,dist=rad/Math.tan(fov*Math.PI/360)/(W/H)*1.05;const ev=o.eye||[0,0.0,1];
  const cam={eye:[ctr[0]+ev[0]*dist,ctr[1]+ev[1]*dist,ctr[2]+ev[2]*dist],target:ctr,fov,near:0.5,far:dist*3};
  const L=Object.assign({},VLIGHT,{sunDir:o.sun||[0.5,0.7,0.6],post:Object.assign({},VLIGHT.post,{sat:1.15})});
  renderScene({cam,light:L,draws:D,post:Object.assign({},L.post,{focus:dist,range:1000,maxR:0}),shadow:{c:ctr,size:rad*1.5}},0);return true;}
// ===== Cleopatra props =====
function buildCarpetRoll(D){const g=new Geo();const cols=['#8a1a22','#d8a830','#1f3c8a','#8a1a22','#e8d8b0','#8a1a22','#1f3c8a','#d8a830','#8a1a22'];
  const L=3.2;cols.forEach((col,i)=>vCylX(g,[-L/2+(i+0.5)*L/cols.length,0,0],0.42,L/cols.length+0.005,col,32));
  for(const sx of [-1,1]){vCylX(g,[sx*(L/2+0.01),0,0],0.36,0.02,'#5a0e14',32);vCylX(g,[sx*(L/2+0.0),0,0],0.12,0.05,'#2a0608',16);
    for(let k=0;k<12;k++){const a=k/12*TAU;vBeam(g,[sx*L/2,Math.sin(a)*0.38,Math.cos(a)*0.38],[sx*(L/2+0.18),Math.sin(a)*0.4,Math.cos(a)*0.4],0.035,'#e8d8b0');}}
  push(D,g,{spec:0.35,rim:0.25});}
function buildCarpetFlat(D){const g=new Geo();vBox(g,[0,0,0],[3.2,0.04,2.0],'#8a1a22');vBox(g,[0,0.01,0],[2.9,0.045,1.7],'#d8a830');vBox(g,[0,0.02,0],[2.7,0.05,1.5],'#7a1420');vBox(g,[0,0.03,0],[1.2,0.055,0.7],'#1f3c8a');vBox(g,[0,0.035,0],[0.5,0.06,0.3],'#d8a830');
  for(const sx of [-1,1])for(let k=0;k<14;k++)vBox(g,[sx*1.7,0,-0.95+k*0.146],[0.2,0.02,0.03],'#e8d8b0');push(D,g,{spec:0.3});}
function buildPearl(D){const g=new Geo();G.sphere(g,M4.S(1,1,1),'#f6f0ea',{su:40,sv:28});push(D,g,{spec:3,rim:0.7});}
function buildThrone(D){const g=new Geo(),b=new Geo(),cu=new Geo();
  vBox(g,[0,1.0,0],[1.6,0.16,1.3],GOLD);vBox(g,[0,2.0,-0.6],[1.6,2.0,0.14],GOLD);for(let k=0;k<6;k++)vBox(b,[0,1.3+k*0.3,-0.52],[1.4,0.12,0.04],k%2?'#1f4aa8':'#2ab0a0');
  for(const sx of [-1,1]){vBox(g,[sx*0.78,1.45,0],[0.12,0.12,1.25],GOLD);vBox(g,[sx*0.78,1.2,0.55],[0.12,0.5,0.12],GOLD);
    for(const z of [-0.55,0.55]){G.lathe(g,M4.T(sx*0.7,0,z),GOLD,[[0.14,0],[0.2,0.08],[0.12,0.3],[0.1,0.6],[0.13,0.9],[0.1,0.95]],{seg:18});}}
  vLoft(cu,[[-0.75,1.08,1.26,0.6,0.6],[0.75,1.08,1.26,0.6,0.6]],'#5a1e6e',3,28);
  G.sphere(g,M4.chain(M4.T(0,3.1,-0.6),M4.S(0.22,0.22,0.1)),'#c01828',{});push(D,g,{spec:2,rim:0.5});push(D,b,{spec:1.2});push(D,cu,{spec:0.4});}
// golden barge (nose +x): curved hull with papyrus-bundle prow/stern, pavilion, purple sails, silver oars
function buildBarge(D,o={}){const h=new Geo(),s=new Geo(),w=new Geo(),sv=new Geo(),p=new Geo();
  const secs=[];for(let i=0;i<=24;i++){const u=i/24,x=-7+u*14;const rise=Math.pow(Math.abs(u-0.5)*2,3)*2.2;secs.push([x,-0.3+rise*0.55,0.9+rise,1.15*(1-Math.pow(Math.abs(u-0.5)*2,4)*0.85)+0.08,0.95]);}vLoft(h,secs,GOLD,3.2,36);
  for(const sx of [-1,1]){const Q=[];for(let j=0;j<=8;j++){const a=j/8*Math.PI*1.1;Q.push([sx*(7.0+Math.sin(a)*0.6),3.1+(1-Math.cos(a))*0.7,0]);}for(let j=0;j<8;j++)vBeam(h,Q[j],Q[j+1],0.28,GOLD);
    G.sphere(h,M4.chain(M4.T(sx*7.0,4.6,0),M4.S(0.45,0.3,0.45)),'#2ab0a0',{});}
  for(let i=0;i<9;i++)vBox(p,[-5+i*1.25,0.5,1.12],[0.6,0.12,0.04],i%2?'#1f4aa8':'#c01828');
  // pavilion
  for(const x of [-3.6,-1.4])for(const z of [-0.8,0.8])vBeam(h,[x,1.0,z],[x,3.0,z],0.12,GOLD);vBox(s,[-2.5,3.1,0],[2.6,0.12,1.9],'#6a1a7a');vBox(p,[-2.5,3.2,0],[2.8,0.06,2.0],GOLD);
  // mast + yard + purple sail
  vBeam(w,[1.4,0.9,0],[1.4,8.6,0],0.22,'#7a4a24');vBeam(w,[-1.6,8.2,0],[4.4,8.2,0],0.14,'#7a4a24');vBeam(w,[-1.4,3.4,0],[4.2,3.4,0],0.12,'#7a4a24');
  const SP=[];for(let j=0;j<=10;j++){const v=j/10,y=8.15-v*4.7;const r=[];for(let k=0;k<=10;k++){const u=k/10;r.push([-1.5+u*5.8,y,0.12+Math.sin(u*Math.PI)*Math.sin(v*Math.PI)*0.7]);}SP.push(r);}vGrid(s,SP,'#6e1a86',false);
  for(let k=1;k<5;k++)vBeam(p,[-1.5+k*1.16,8.1,0.15],[-1.5+k*1.16,3.5,0.2+Math.sin(k/5*Math.PI)*0.6],0.04,GOLD);
  // silver oars on the near side
  for(let i=0;i<9;i++){const x=-4.6+i*1.1,a=(o.oar||0)+i*0.15;vBeam(sv,[x,1.1,1.0],[x+Math.sin(a)*0.9-1.0,-1.2,2.9],0.1,'#e4e8f0');vBox(sv,[x+Math.sin(a)*0.9-1.05,-1.25,2.95],[0.5,0.5,0.06],'#f0f4fa');}
  push(D,h,{spec:2.0,rim:0.5});push(D,s,{spec:0.5,rim:0.3});push(D,w,{spec:0.5});push(D,sv,{spec:2.5,rim:0.6});push(D,p,{spec:1.4});}
Object.assign(PB,{carpet_roll:buildCarpetRoll,carpet_flat:buildCarpetFlat,pearl:buildPearl,throne:buildThrone,barge:buildBarge});
// ===== v2: royal barge with on-deck throne, Roman/Egyptian war galleys (whole + burning) =====
function hullLoft(g,L,H,B,col,o={}){const secs=[];const N=30;for(let i=0;i<=N;i++){const u=i/N,x=-L/2+u*L;const e=Math.abs(u-0.5)*2;const rise=Math.pow(e,o.rp||3)*(o.rise||1.6);const w=B*(1-Math.pow(e,o.wp||3.5)*0.9)+0.06;secs.push([x,-H*0.5+rise*0.4*(o.keelUp??1),H*0.5+rise,w,0.92]);}vLoft(g,secs,col,o.n||3.4,40);}
function buildBarge2(D){const h=new Geo(),blue=new Geo(),red=new Geo(),gold=new Geo(),pur=new Geo(),sv=new Geo(),wd=new Geo();
  hullLoft(h,15,1.6,1.7,'#e0b040',{rise:2.0});
  // painted bands along the hull: lapis + carnelian stripes, gold rail
  for(const [y,col,g] of [[0.25,'#1f4aa8',blue],[0.05,'#c03020',red],[-0.15,'#1f4aa8',blue]])for(const sz of [-1,1])vBox(g,[0,y,sz*1.73],[11.5,0.1,0.04],col);
  for(const sz of [-1,1]){vBox(gold,[0,0.82,sz*1.62],[12,0.08,0.08],'#ffd860');for(let i=0;i<24;i++)vBeam(gold,[-5.8+i*0.5,0.82,sz*1.62],[-5.8+i*0.5,1.25,sz*1.62],0.04,'#ffd860');vBox(gold,[0,1.25,sz*1.62],[12,0.06,0.06],'#ffd860');}
  vBox(wd,[0,0.78,0],[13,0.06,3.2],'#8a5a30');// deck
  // papyrus-bundle prow and stern curling upward, lotus finials
  for(const sx of [-1,1]){const Q=[];for(let j=0;j<=12;j++){const a=j/12*Math.PI*1.05;Q.push([sx*(7.2+Math.sin(a)*0.8),1.6+(1-Math.cos(a))*1.6,0]);}for(let j=0;j<12;j++)vBeam(h,Q[j],Q[j+1],0.42-j*0.018,'#e0b040');
    for(let k=0;k<6;k++){const a=k/6*TAU;G.cyl(gold,M4.chain(M4.T(sx*7.2+Math.sin(Math.PI*1.05)*0.8*sx,4.7,0),M4.RZ(Math.cos(a)*0.5),M4.RX(Math.sin(a)*0.5),M4.S(0.14,0.7,0.14)),'#ffd860',{seg:8,rt:0.4,rb:1});}
    G.sphere(blue,M4.chain(M4.T(sx*7.2+Math.sin(Math.PI*1.05)*0.8*sx,4.75,0),M4.S(0.3,0.22,0.3)),'#2ab0a0',{});}
  // pavilion: back + side columns, purple canopy with gold fringe; throne on a dais
  for(const [x,z] of [[-4.6,-1.2],[-1.6,-1.2],[-4.6,1.2],[-1.6,1.2]])G.lathe(gold,M4.T(x,0.8,z),'#ffd860',[[0.14,0],[0.1,0.2],[0.09,2.6],[0.16,2.8],[0.2,2.95]],{seg:14});
  vLoft(pur,[[-4.9,3.75,4.05,1.5,0.5],[-3.1,3.75,4.35,1.5,0.5],[-1.3,3.75,4.05,1.5,0.5]],'#5c1a78',3,32);for(let i=0;i<14;i++)vBox(gold,[-4.8+i*0.27,3.7,1.48],[0.12,0.16,0.04],'#ffd860');
  vBox(gold,[-3.1,0.95,0],[1.6,0.3,1.6],'#d8a830');vBox(pur,[-3.1,1.12,0],[1.5,0.06,1.5],'#5c1a78');
  vBox(gold,[-3.4,1.7,0],[0.14,1.4,1.0],'#e8b838');for(let k=0;k<4;k++)vBox(blue,[-3.32,1.3+k*0.28,0],[0.04,0.1,0.9],k%2?'#1f4aa8':'#2ab0a0');
  // mast, yard, boom, big purple sail with gold trim, rigging
  vBeam(wd,[1.6,0.8,0],[1.6,10.4,0],0.26,'#7a4a24');vBeam(wd,[-1.6,9.9,0],[4.8,9.9,0],0.16,'#7a4a24');vBeam(wd,[-1.4,4.4,0],[4.6,4.4,0],0.14,'#7a4a24');
  const SP=[];for(let j=0;j<=12;j++){const v=j/12,y=9.85-v*5.3;const r=[];for(let k=0;k<=12;k++){const u=k/12;r.push([-1.5+u*6.2,y,0.14+Math.sin(u*Math.PI)*Math.sin(v*Math.PI)*0.9]);}SP.push(r);}vGrid(pur,SP,'#6a1f8a',false);
  for(let k=0;k<=6;k++){const u=k/6;vBeam(gold,[-1.5+u*6.2,9.85,0.15],[-1.5+u*6.2,4.55,0.2+Math.sin(u*Math.PI)*0.5],0.035,'#ffd860');}
  for(const z of [-1.6,1.6]){vBeam(sv,[1.6,10.3,0],[-6.6,1.2,z],0.03,'#d8c8a0');vBeam(sv,[1.6,10.3,0],[7.0,1.2,z],0.03,'#d8c8a0');}
  G.sphere(gold,M4.chain(M4.T(1.6,10.6,0),M4.S(0.22,0.22,0.22)),'#ffd860',{});vBox(red,[2.2,10.9,0],[1.0,0.45,0.03],'#c03020');
  // silver oars, both banks visible on the near side
  for(let i=0;i<10;i++){const x=-4.8+i*1.05;vBeam(sv,[x,0.9,1.7],[x-0.9,-1.3,3.6],0.09,'#eef2f8');vBox(sv,[x-0.95,-1.36,3.65],[0.5,0.5,0.06],'#ffffff');}
  push(D,h,{spec:2.2,rim:0.5});push(D,gold,{spec:2.4,rim:0.5});push(D,blue,{spec:1.2});push(D,red,{spec:1.2});push(D,pur,{spec:0.5,rim:0.35});push(D,sv,{spec:2.6,rim:0.6});push(D,wd,{spec:0.4});}
function buildGalley(D,o={}){const burn=o.burn;const h=new Geo(),dk=new Geo(),br=new Geo(),sl=new Geo(),sh=new Geo(),em=new Geo();
  const WOOD=burn?'#2a1a12':'#6a4024',DARK=burn?'#120a08':'#3a2414';
  hullLoft(h,14,1.8,1.6,WOOD,{rise:1.3,rp:2.6});for(const sz of [-1,1]){vBox(dk,[0,0.6,sz*1.66],[11.5,0.12,0.04],DARK);vBox(dk,[0,0.95,sz*1.6],[12,0.1,0.1],DARK);}
  vBox(dk,[0,0.92,0],[12,0.06,3.0],burn?'#1a100a':'#7a5030');
  // bronze ram at the bow, curled stern (aphlaston), deck tower
  vLoft(br,[[7.0,-0.9,-0.3,0.3,1],[8.2,-0.75,-0.45,0.12,1]],burn?'#4a3418':'#b08a3c',2,20);
  {const Q=[];for(let j=0;j<=10;j++){const a=j/10*Math.PI;Q.push([-7.0-Math.sin(a)*0.9,1.4+(1-Math.cos(a))*1.2,0]);}for(let j=0;j<10;j++)vBeam(h,Q[j],Q[j+1],0.32-j*0.015,WOOD);}
  vBox(h,[4.3,1.5,0],[1.6,1.1,2.4],WOOD);vBox(dk,[4.3,2.1,0],[1.8,0.12,2.6],DARK);
  // shields along the rail
  for(let i=0;i<10;i++)for(const sz of [1]){vCylZ(sh,[-4.6+i*0.9,1.25,sz*1.72],0.32,0.06,burn?(i%3?'#3a1a10':'#5a2a14'):(i%2?'#a81c1c':'#d8a830'),20);}
  // mast + square sail (whole or torn) ; broken mast when burning
  if(!burn){vBeam(dk,[0.6,0.9,0],[0.6,9.2,0],0.24,'#5a3418');vBeam(dk,[-2.6,8.8,0],[3.8,8.8,0],0.15,'#5a3418');
    const SP=[];for(let j=0;j<=10;j++){const v=j/10,y=8.75-v*4.4;const r=[];for(let k=0;k<=10;k++){const u=k/10;r.push([-2.5+u*6.2,y,0.14+Math.sin(u*Math.PI)*Math.sin(v*Math.PI)*0.8]);}SP.push(r);}vGrid(sl,SP,'#e8dcc0',false);
    for(let k=0;k<3;k++)vBox(sl,[0.6,7.6-k*1.3,0.3+0.6],[6,0.25,0.02],'#a81c1c');}
  else{vBeam(dk,[0.6,0.9,0],[1.2,5.6,0],0.24,'#1a0e08');vBeam(dk,[1.2,5.6,0],[3.6,4.0,0.6],0.2,'#1a0e08');
    const SP=[];for(let j=0;j<=6;j++){const v=j/6,y=5.4-v*2.8;const r=[];for(let k=0;k<=6;k++){const u=k/6;r.push([-1.0+u*2.6+v*0.6,y-u*0.8,0.3+Math.sin(u*Math.PI)*0.4]);}SP.push(r);}vGrid(sl,SP,'#3a2a20',false);
    // glowing embers / burning planks (emissive) where the flames sit
    for(const [x,y] of [[-4.5,1.2],[-2.0,1.1],[0.8,1.2],[3.6,2.2],[5.6,1.0]]){vBox(em,[x,y,1.0],[1.1,0.14,1.6],'#ff7a20');}
    vBox(em,[-1.0,0.5,1.68],[3.0,0.12,0.03],'#ff9a30');vBox(em,[2.5,0.3,1.68],[1.6,0.1,0.03],'#ff6a20');}
  // oars
  for(let i=0;i<11;i++){const x=-5+i*0.95;const a=burn?(hash(i)-0.5)*0.8:0;vBeam(dk,[x,0.6,1.66],[x-0.6+a,-1.4,3.5],0.08,burn?'#1a0e08':'#8a6a40');}
  push(D,h,{spec:0.4,rim:0.25});push(D,dk,{spec:0.3});push(D,br,{spec:1.8,rim:0.4});push(D,sl,{spec:0.3,rim:0.2});push(D,sh,{spec:1.2});
  if(burn)D.push({mesh:mesh(em),M:M4.id(),col:[1,1,1],emis:[1.6,0.7,0.2],noShadow:true});}
Object.assign(PB,{barge2:buildBarge2,galley:buildGalley,galley_burn:(D)=>buildGalley(D,{burn:1})});
// ===== Napoleonic props =====
function buildMusket(D){const w=new Geo(),st=new Geo(),br=new Geo();
  vLoft(w,[[-2.6,-0.42,0.06,0.09,1],[-2.0,-0.2,0.06,0.08,1],[-1.6,-0.08,0.06,0.07,1],[-1.2,-0.08,0.1,0.08,1],[2.4,-0.05,0.08,0.07,1]],'#7a4a24',2,20);
  vCylX(st,[0.6,0.12,0],0.05,6.0,'#8a929c',16);vCylX(st,[3.62,0.12,0],0.055,0.12,'#8a929c',16);
  vLoft(st,[[3.7,0.15,0.2,0.012,1],[5.2,0.17,0.19,0.01,1]],'#d8dee6',2,8);vBeam(st,[3.65,0.12,0],[3.7,0.17,0],0.03,'#d8dee6');
  for(const x of [0.4,1.4,2.3])vCylX(br,[x,0.06,0],0.11,0.08,'#d8b040',16);vBox(st,[-1.1,0.16,0.08],[0.4,0.14,0.05],'#5a5a62');vBeam(st,[-1.25,0.2,0.1],[-1.1,0.36,0.1],0.03,'#5a5a62');
  vLoft(br,[[-2.65,-0.44,0.08,0.1,1],[-2.55,-0.44,0.08,0.1,1]],'#d8b040',2,16);
  push(D,w,{spec:0.6});push(D,st,{spec:2.2,rim:0.5});push(D,br,{spec:2});}
function wheelGeo(g,c0,r,col){const N=14;for(let i=0;i<N;i++){const a=i/N*TAU,b=(i+1)/N*TAU;vBeam(g,[c0[0]+Math.cos(a)*r,c0[1]+Math.sin(a)*r,c0[2]],[c0[0]+Math.cos(b)*r,c0[1]+Math.sin(b)*r,c0[2]],0.09,col);}
  for(let i=0;i<10;i++){const a=i/10*TAU;vBeam(g,c0,[c0[0]+Math.cos(a)*r*0.95,c0[1]+Math.sin(a)*r*0.95,c0[2]],0.045,col);}vCylZ(g,c0,0.16,0.3,'#3a2a1a',16);}
function buildCannon(D){const b=new Geo(),w=new Geo(),ir=new Geo();
  G.lathe(b,M4.chain(M4.T(-0.4,1.25,0),M4.RZ(-Math.PI/2+0.08)),'#b08a3c',[[0.0,0],[0.32,0.05],[0.36,0.25],[0.33,0.6],[0.3,1.4],[0.26,2.2],[0.3,2.3],[0.26,2.4],[0.22,2.42]],{seg:28});
  G.sphere(b,M4.chain(M4.T(-0.45,1.24,0),M4.S(0.14,0.14,0.14)),'#b08a3c',{});
  for(const z of [-0.32,0.32]){vLoft(w,[[-2.4,0.05,0.25,0.06,1],[-0.6,0.8,1.15,0.06,1],[0.4,0.85,1.2,0.06,1]],'#4a5a3a',2,8);w.__z=z;}
  // carriage cheeks (olive), trail on the ground
  for(const z of [-0.3,0.3]){vBox(w,[-0.2,1.0,z],[1.4,0.36,0.08],'#5a6a3a');vBeam(w,[-0.6,0.9,z],[-2.6,0.1,z*0.6],0.12,'#5a6a3a');}
  vBeam(w,[-0.1,0.95,-0.4],[-0.1,0.95,0.4],0.08,'#2a2a2a');
  for(const z of [-0.62,0.62])wheelGeo(ir,[-0.1,0.95,z],0.95,'#5a4028');
  push(D,b,{spec:2.2,rim:0.5});push(D,w,{spec:0.4});push(D,ir,{spec:0.5});}
function buildTelescope(D){const g=new Geo();G.lathe(g,M4.RZ(-Math.PI/2),'#c89a3a',[[0.0,0],[0.12,0.02],[0.12,0.9],[0.1,0.92],[0.1,1.6],[0.085,1.62],[0.085,2.2],[0.1,2.22],[0.1,2.3],[0.0,2.3]],{seg:24});
  const k=new Geo();vCylX(k,[0.45,0,0],0.125,0.5,'#3a2a1a',24);push(D,g,{spec:2.4,rim:0.5});push(D,k,{spec:0.5});}
Object.assign(PB,{musket:buildMusket,cannon:buildCannon,telescope:buildTelescope});
