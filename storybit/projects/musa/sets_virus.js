'use strict';
// ===================== Virus in the book · 3D sets: medieval library/scriptorium, Eurasian steppe =====================
// ---------- library + scriptorium: stone walls, tall shelves of old books, arched window, writing desk, candles ----------
function buildLibrary(){texInit();const g=new Geo(),D=[];
  TX.stone=TX.stone||cvTex(512,512,(x,w,h)=>{x.fillStyle='#6a5e50';x.fillRect(0,0,w,h);for(let r=0;r<10;r++)for(let k=0;k<5;k++){const ox=(r%2)*51,v=hash(r*7+k);x.fillStyle=`rgb(${120+v*30|0},${108+v*26|0},${92+v*22|0})`;x.fillRect(k*102+ox-51+3,r*51.2+3,96,45);}speck(x,w,h,1600,['rgba(0,0,0,0.18)','rgba(255,240,220,0.06)'],2);},{repeat:1});
  TX.oak=TX.oak||cvTex(512,512,(x,w,h)=>{x.fillStyle='#5a3a22';x.fillRect(0,0,w,h);for(let i=0;i<60;i++){x.strokeStyle=`rgba(${30+hash(i)*30|0},18,8,0.35)`;x.lineWidth=2;x.beginPath();const y=i*9;x.moveTo(0,y);x.bezierCurveTo(w*0.3,y+6*Math.sin(i),w*0.6,y-6,w,y+3);x.stroke();}},{repeat:1});
  TX.books=TX.books||cvTex(512,512,(x,w,h)=>{x.fillStyle='#2a1a10';x.fillRect(0,0,w,h);const cols=['#7a2a1e','#3a4a2a','#5a3a1e','#2a3a5a','#8a6a2a','#4a2a3a','#6a4a2a'];
    for(let r=0;r<4;r++){let bx=4;while(bx<w-10){const bw=14+hash(bx+r*91)*22,bh=96+hash(bx*3+r)*24;x.fillStyle=cols[Math.floor(hash(bx*7+r)*cols.length)];x.fillRect(bx,r*128+124-bh,bw,bh);x.fillStyle='rgba(230,190,110,0.55)';x.fillRect(bx+2,r*128+124-bh+14,bw-4,3);x.fillRect(bx+2,r*128+124-28,bw-4,3);x.strokeStyle='rgba(0,0,0,0.5)';x.lineWidth=2;x.strokeRect(bx,r*128+124-bh,bw,bh);bx+=bw+1;}
      x.fillStyle='#4a2e18';x.fillRect(0,r*128+124,w,6);}},{repeat:1});
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-1.5),M4.S(12,1,12)),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.stone,col:[0.62,0.56,0.5],spec:0.5,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-5),M4.S(12,5,0.2)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-4.5,0,-1),M4.S(0.2,5,10)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(4.5,0,-1),M4.S(0.2,5,10)),[1,1,1],{base:1});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.stone,col:[1,1,1],rim:0,noShadow:1});
  // arched window (back wall centre) with moonlight glass + stone arches
  const wn=new Geo();G.box(wn,M4.chain(M4.T(0,1.6,-4.89),M4.S(1.3,2.0,0.02)),[1,1,1],{base:1});G.cyl(wn,M4.chain(M4.T(0,3.6,-4.89),M4.RX(Math.PI/2),M4.S(0.65,0.02,0.65)),[1,1,1],{seg:24});D.push({mesh:mesh(wn),M:M4.id(),col:[0.3,0.38,0.6],emis:[0.22,0.3,0.55],rim:0,noShadow:1});
  for(const x of [-0.7,0.7])BX(g,[x,1.5,-4.85],[0.12,2.15,0.12],'#8a7e6e');BX(g,[0,1.5,-4.85],[1.5,0.12,0.14],'#8a7e6e');BX(g,[0,2.6,-4.85],[0.06,2.0,0.06],'#3a3028');
  // tall bookshelves on both side walls and flanking the window
  const sh=new Geo();for(const [x,z,ry,wid] of [[-4.2,-1.0,Math.PI/2,6],[4.2,-1.0,-Math.PI/2,6],[-2.6,-4.7,0,2.6],[2.6,-4.7,0,2.6]]){BX(g,[x,0,z],[ry?0.5:wid,3.6,ry?wid:0.5],'#3a2414');G.plane(sh,M4.chain(M4.T(x+(ry?-Math.sign(x)*0.26:0),1.8,z+(ry?0:0.26)),M4.RY(ry||0),M4.RX(Math.PI/2),M4.S(wid-0.2,1,3.4)),[1,1,1],{uv:1});}
  D.push({mesh:mesh(sh),M:M4.id(),tex:TX.books,col:[1,1,1],rim:0,noShadow:1});
  // writing desk (slanted top), stool, lectern, candles
  const dk=new Geo();G.box(dk,M4.chain(M4.T(0,0,-1.2),M4.S(1.4,0.78,0.7)),[1,1,1],{base:1});G.box(dk,M4.chain(M4.T(0,0.82,-1.2),M4.RX(-0.25),M4.S(1.4,0.06,0.72)),[1,1,1],{base:1});D.push({mesh:mesh(dk),M:M4.id(),tex:TX.oak,col:[1,1,1],rim:0.2});
  G.cyl(g,M4.chain(M4.T(0,0,-0.45),M4.S(0.22,0.5,0.22)),'#4a2e18',{seg:12});
  BX(g,[2.0,0,-2.6],[0.12,1.1,0.12],'#4a2e18');BX(g,[2.0,1.1,-2.6],[0.7,0.06,0.5],'#5a3a22',{rx:-0.4});BX(g,[2.0,0,-2.6],[0.6,0.06,0.6],'#4a2e18');
  const cd=new Geo(),fl2=new Geo();for(const [x,y,z] of [[0.55,0.9,-1.42],[-0.6,0.9,-1.42],[2.25,1.18,-2.7],[-3.0,0,-3.6]]){G.cyl(cd,M4.chain(M4.T(x,y,z),M4.S(0.035,0.22,0.035)),'#f2ead6',{seg:10});G.sphere(fl2,M4.chain(M4.T(x,y+0.27,z),M4.S(0.02,0.045,0.02)),'#ffffff');}
  D.push({mesh:mesh(cd),M:M4.id(),col:[1,1,1],rim:0.2});D.push({mesh:mesh(fl2),M:M4.id(),col:[1,0.8,0.4],emis:[3.5,2.2,0.8],rim:0,noShadow:1});
  // open book on the desk + stack of manuscripts
  BX(g,[0,0.88,-1.15],[0.62,0.04,0.42],'#efe2c0',{rx:-0.25});BX(g,[0,0.9,-1.15],[0.02,0.05,0.42],'#7a5a3a',{rx:-0.25});for(let i=0;i<4;i++)BX(g,[-0.45,0.88+i*0.06,-1.4],[0.3,0.05,0.22],['#7a2a1e','#3a4a2a','#5a3a1e','#2a3a5a'][i],{ry:0.1*i});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.4});
  return {D,pts:[[0.55,1.2,-1.42,3.5,[2.6,1.5,0.5]],[-0.6,1.2,-1.42,3.0,[2.4,1.4,0.5]],[2.25,1.45,-2.7,3.0,[2.2,1.3,0.5]],[0,2.4,-4.4,4,[0.4,0.5,0.9]]]};}
LIGHT5.candle={sunDir:[0.1,0.6,0.8],sunCol:[0.25,0.28,0.45],sky:[0.14,0.12,0.12],gnd:[0.08,0.06,0.05],fog:[0.06,0.05,0.05],fogD:0.04,fogH:0,skyTop:[0.02,0.02,0.04],skyHor:[0.05,0.05,0.08],skyBot:[0.03,0.02,0.02],cloud:0,stars:0,sunSize:3000,sunGlow:[0.3,0.3,0.5],
  post:{bloom:0.8,thr:0.75,sat:1.15,expo:1.08,lift:[0.02,0.01,0.0],gain:[1.08,0.98,0.88],vig:1.35,ink:1}};
// ---------- Eurasian steppe at golden hour: endless grass, low hills, a Bronze Age dig pit with a sheep skull ----------
function buildSteppe(){texInit();const g=new Geo(),D=[];
  TX.steppe=TX.steppe||cvTex(512,512,(x,w,h)=>{x.fillStyle='#a8a058';x.fillRect(0,0,w,h);for(let i=0;i<5000;i++){x.strokeStyle=['rgba(120,110,50,0.5)','rgba(200,190,110,0.5)','rgba(90,100,50,0.4)'][i%3];x.lineWidth=1.5;const px=hash(i*1.3)*w,py=hash(i*2.7)*h;x.beginPath();x.moveTo(px,py);x.lineTo(px+(hash(i)-0.5)*6,py-8-hash(i*5)*8);x.stroke();}},{repeat:1});
  TX.dirt2=TX.dirt2||cvTex(256,256,(x,w,h)=>{x.fillStyle='#7a5a3a';x.fillRect(0,0,w,h);speck(x,w,h,900,['rgba(0,0,0,0.2)','rgba(255,220,180,0.1)'],3);},{repeat:1});
  const gr=new Geo();G.plane(gr,M4.chain(M4.S(160,1,160)),[1,1,1],{uv:40});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.steppe,col:[1,1,1],rim:0});
  const hl=new Geo();for(let i=0;i<9;i++){const a=-1.2+i*0.3,r=55+hash(i)*20;G.sphere(hl,M4.chain(M4.T(Math.sin(a)*r,-6,-Math.cos(a)*r),M4.S(18+hash(i*3)*14,9+hash(i*5)*5,12)),'#8a8a58',{su:16,sv:10});}D.push({mesh:mesh(hl),M:M4.id(),col:[1,1,1],rim:0});
  // dig pit: a dark square trench with string grid + tools, sheep skull with teeth in the soil
  const pit=new Geo();G.box(pit,M4.chain(M4.T(0,-0.01,-1),M4.S(2.2,0.02,1.6)),[1,1,1],{base:1});D.push({mesh:mesh(pit),M:M4.id(),tex:TX.dirt2,col:[0.9,0.85,0.8],rim:0});
  for(const [x,z] of [[-1.1,-1.8],[1.1,-1.8],[-1.1,-0.2],[1.1,-0.2]])BX(g,[x,0,z],[0.04,0.35,0.04],'#d8c090');
  BX(g,[0,0.3,-1.8],[2.2,0.008,0.008],'#f0e8e0');BX(g,[0,0.3,-0.2],[2.2,0.008,0.008],'#f0e8e0');BX(g,[-1.1,0.3,-1],[0.008,0.008,1.6],'#f0e8e0');BX(g,[1.1,0.3,-1],[0.008,0.008,1.6],'#f0e8e0');
  BX(g,[0.8,0,-0.5],[0.05,0.03,0.4],'#8a6a40',{ry:0.6});BX(g,[-0.7,0,-1.4],[0.3,0.12,0.2],'#3a6aa8');
  // a few yurt-like tents far away
  for(const [x,z] of [[-14,-26],[-10,-30],[16,-34]]){G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(1.6,1.4,1.6)),'#e8dcc4',{seg:18});G.lathe(g,M4.chain(M4.T(x,1.4,z)),'#c8b894',[[0.001,0.8],[1.7,0],[0.001,0]],{seg:18});}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3});
  return {D,pts:[]};}
LIGHT5.steppeGold={sunDir:[-0.7,0.25,-0.5],sunCol:[1.8,1.3,0.8],sky:[0.6,0.55,0.5],gnd:[0.45,0.38,0.25],fog:[0.9,0.75,0.55],fogD:0.004,fogH:0,skyTop:[0.35,0.45,0.75],skyHor:[1.1,0.85,0.6],skyBot:[0.8,0.6,0.4],cloud:0.6,stars:0,sunSize:700,sunGlow:[1.2,0.9,0.6],
  post:{bloom:0.55,thr:0.9,sat:1.3,expo:0.95,lift:[0.0,0.0,0.02],gain:[1.08,0.98,0.86],vig:1.2,ink:1}};
{const _gv=getSet;getSet=function(k){const B={library:buildLibrary,steppe:buildSteppe};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gv(k);};}
PL.length=0;
PL.push(
 ['lb_wide','library','candle',[0.3,1.7,3.6],[0,1.4,-3.0],52],
 ['lb_desk','library','candle',[0.25,1.6,0.3],[0,0.9,-1.2],48],
 ['lb_shelf','library','candle',[1.4,1.6,1.2],[-4.0,1.6,-1.5],44],
 ['ml_wide','mlab','mlab',[1.9,1.75,2.4],[0,1.0,-0.8],46],
 ['ml_arena','mlab','mlab',[0.9,1.35,1.1],[0,1.02,-0.6],30],
 ['st_wide','steppe','steppeGold',[0.5,1.6,5.0],[0,0.6,-4],52],
 ['st_open','steppe','steppeGold',[0.0,1.3,-3.0],[0.0,0.5,-14],50],
 ['st_dig','steppe','steppeGold',[0.9,1.4,1.7],[0.0,0.1,-1.0],42],
);
