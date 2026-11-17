'use strict';
// ===================== Hiroo Onoda: Lubang jungle, camp, farm, beach =====================
function jgTex(){TX.litter=TX.litter||cvTex(512,512,(x,w,h)=>{x.fillStyle='#4a3a22';x.fillRect(0,0,w,h);for(let i=0;i<900;i++){x.save();x.translate(hash(i*1.3)*w,hash(i*2.7)*h);x.rotate(hash(i*5.1)*TAU);x.fillStyle=['#6a5a2a','#5a4a1e','#7a6a34','#3a4a1e','#4a5a24'][i%5];x.beginPath();x.ellipse(0,0,10+hash(i)*14,4+hash(i*3)*5,0,0,TAU);x.fill();x.restore();}},{repeat:1});
  TX.bark=TX.bark||cvTex(256,512,(x,w,h)=>{x.fillStyle='#4a3a2a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(20,14,8,0.6)';x.lineWidth=4;for(let i=0;i<14;i++){x.beginPath();const xx=i*20;x.moveTo(xx,0);x.bezierCurveTo(xx+8,h*0.3,xx-8,h*0.6,xx+4,h);x.stroke();}speck(x,w,h,400,['rgba(90,110,50,0.4)','rgba(0,0,0,0.2)'],3);},{repeat:1});
  TX.sand=TX.sand||cvTex(512,512,(x,w,h)=>{x.fillStyle='#d8b880';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(255,240,200,0.35)','rgba(140,100,60,0.25)'],2);},{repeat:1});
  TX.sea=TX.sea||cvTex(512,512,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a4a7a');g.addColorStop(1,'#3a7aa0');x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,220,180,0.35)';x.lineWidth=3;for(let i=0;i<60;i++){const y=hash(i*3)*h,xx=hash(i*7)*w;x.beginPath();x.moveTo(xx,y);x.lineTo(xx+20+hash(i)*40,y);x.stroke();}},{repeat:1});
  TX.thatch=TX.thatch||cvTex(256,256,(x,w,h)=>{x.fillStyle='#a8884a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(80,60,30,0.6)';x.lineWidth=2;for(let i=0;i<120;i++){const xx=hash(i)*w,yy=hash(i*3)*h;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx+3,yy+30);x.stroke();}},{repeat:1});
  TX.rice=TX.rice||cvTex(256,256,(x,w,h)=>{x.fillStyle='#5a7a2a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(160,200,80,0.6)';x.lineWidth=2;for(let i=0;i<500;i++){const xx=hash(i)*w,yy=hash(i*3)*h;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx+(hash(i*5)-0.5)*6,yy-12);x.stroke();}},{repeat:1});}
function tree(tr,lv,x,z,h,r,k){G.cyl(tr,M4.chain(M4.T(x,0,z),M4.S(r,h,r)),[1,1,1],{seg:9});for(let i=0;i<5;i++)G.sphere(lv,M4.chain(M4.T(x+(hash(k*7+i)-0.5)*2.6,h-0.3+hash(k*3+i)*1.4,z+(hash(k*5+i)-0.5)*2.2),M4.S(1.1+hash(k+i)*0.8,0.7+hash(k*2+i)*0.4,1.1+hash(k*9+i)*0.7)),[1,1,1]);}
function fern(fg,x,z,s,k){for(let i=0;i<9;i++){const a=i/9*TAU+hash(k)*2,tl=0.8+hash(k*3+i)*0.5;G.sphere(fg,M4.chain(M4.T(x,0.05,z),M4.RY(a),M4.RZ(tl),M4.T(0,0.55*s,0),M4.S(0.04*s,0.6*s,0.17*s)),[1,1,1]);}}
function buildJungle(o={}){texInit();jgTex();const g=new Geo(),D=[];
  const gr=new Geo();G.plane(gr,M4.S(50,1,50),[1,1,1],{uv:12});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.litter,col:[0.9,0.95,0.85],rim:0});
  const tr=new Geo(),lv=new Geo(),lv2=new Geo(),fg=new Geo(),vn=new Geo();let k=0;
  // trees around a clearing (radius ~2.6), denser and taller further out; leave a gap toward the camera (+z)
  for(let ring=0;ring<4;ring++){const R=3.0+ring*2.4,n=10+ring*5;for(let i=0;i<n;i++){const a=i/n*TAU+ring*0.4+hash(i*3+ring)*0.3;const x=Math.cos(a)*R,z=Math.sin(a)*R-1.0;if(z>1.2&&Math.abs(x)<2.8+ring*1.2)continue;
    tree(tr,ring%2?lv:lv2,x,z,4.5+ring*1.5+hash(k)*2,0.16+hash(k*3)*0.12+ring*0.03,k);k++;}}
  // big background canopy wall
  for(let i=0;i<30;i++){const x=-22+i*1.5,z=-14-hash(i)*3;G.sphere(lv,M4.chain(M4.T(x,3+hash(i*2)*6,z),M4.S(2.5,3,2)),[1,1,1]);}
  // undergrowth ferns + bushes ringing the clearing
  for(let i=0;i<34;i++){const a=hash(i*1.7)*TAU,R=2.4+hash(i*2.3)*4;const x=Math.cos(a)*R,z=Math.sin(a)*R-1.0;if(z>0.6&&Math.abs(x)<3.2)continue;fern(fg,x,z,0.9+hash(i)*0.8,i);}
  for(const [x,z,s] of [[-2.6,1.4,1.0],[2.8,1.6,1.0],[-3.0,-0.6,0.9],[3.0,-1.6,1.0],[-1.4,-3.4,1.0],[1.6,-3.6,0.9]])for(let j=0;j<4;j++)G.sphere(lv2,M4.chain(M4.T(x+(hash(j*3+x)-0.5)*0.8*s,0.25+hash(j+z)*0.3,z+(hash(j*5+z)-0.5)*0.6*s),M4.S(0.45*s,0.38*s,0.42*s)),[1,1,1]);
  // mid-height leaf clusters on trunks for layered depth
  for(let i=0;i<26;i++){const a=hash(i*4.1)*TAU,R=3.6+hash(i*1.9)*5;G.sphere(lv,M4.chain(M4.T(Math.cos(a)*R,1.6+hash(i*2.2)*2.2,Math.sin(a)*R-1.6),M4.S(0.7+hash(i)*0.5,0.4,0.6+hash(i*3)*0.4)),[1,1,1]);}
  // hanging vines
  for(let i=0;i<14;i++){const x=-4+hash(i*4)*8,z=-4+hash(i*6)*4;G.cyl(vn,M4.chain(M4.T(x,2.6+hash(i)*1.5,z),M4.S(0.02,3.5,0.02)),[1,1,1],{seg:5});}
  // rocks + fallen log
  for(const [x,z,s] of [[-1.6,-1.8,0.4],[1.9,0.3,0.3],[-0.6,-3.6,0.55]])G.sphere(g,M4.chain(M4.T(x,0.1,z),M4.S(s*1.3,s*0.8,s)),'#6a6a5e');
  G.cyl(g,M4.chain(M4.T(-1.4,0.18,0.6),M4.RZ(Math.PI/2),M4.RY(0.3),M4.S(0.18,1.8,0.18)),'#4a3a28',{seg:10});
  D.push({mesh:mesh(tr),M:M4.id(),tex:TX.bark,col:[0.9,0.85,0.8],rim:0.15});D.push({mesh:mesh(lv),M:M4.id(),col:[0.22,0.42,0.2],rim:0.25,spec:0.2});D.push({mesh:mesh(lv2),M:M4.id(),col:[0.3,0.52,0.22],rim:0.25,spec:0.2});
  D.push({mesh:mesh(fg),M:M4.id(),col:[0.28,0.55,0.24],rim:0.3});D.push({mesh:mesh(vn),M:M4.id(),col:[0.26,0.36,0.18],rim:0});
  const pts=[];
  if(o.camp){// tent (A-frame) + campfire with glowing embers
    const tn=new Geo();for(const sd of [-1,1])G.box(tn,M4.chain(M4.T(1.7+sd*0.62,0,-1.4),M4.RZ(sd*0.66),M4.S(0.04,1.0,1.6)),[1,1,1],{base:1});D.push({mesh:mesh(tn),M:M4.id(),col:[0.85,0.45,0.2],rim:0.2});
    for(const a of [0,1.1,2.2])G.cyl(g,M4.chain(M4.T(0,0.06,-0.6),M4.RY(a),M4.RZ(Math.PI/2),M4.S(0.06,0.7,0.06),M4.T(0,-0.5,0)),'#3a2a1a',{seg:8});
    for(let i=0;i<8;i++){const a=i/8*TAU;G.sphere(g,M4.chain(M4.T(Math.cos(a)*0.42,0.05,-0.6+Math.sin(a)*0.42),M4.S(0.1,0.07,0.1)),'#5a5a52');}
    const fl=new Geo();G.lathe(fl,M4.chain(M4.T(0,0.06,-0.6),M4.S(1)),'#ffffff',[[0.2,0],[0.16,0.18],[0.08,0.4],[0.001,0.56]],{seg:10});D.push({mesh:mesh(fl),M:M4.id(),col:[1,0.6,0.2],emis:[3.2,1.5,0.3],rim:0,noShadow:1});
    BX(g,[2.6,0,-0.4],[0.35,0.5,0.25],'#3a5a8a');pts.push([0,0.5,-0.6,4.5,[3.2,1.6,0.5]]);}
  if(o.farm){// nipa hut on stilts + rice paddy + lantern
    const rf=new Geo();G.plane(rf,M4.chain(M4.T(-0.5,0.02,-0.2),M4.S(3.5,1,2.6)),[1,1,1]);D.push({mesh:mesh(rf),M:M4.id(),tex:TX.rice,col:[0.9,1,0.85],rim:0});
    for(const [x,z] of [[1.1,-2.2],[2.7,-2.2],[1.1,-3.4],[2.7,-3.4]])BX(g,[x,0,z],[0.1,0.9,0.1],'#5a4228');BX(g,[1.9,0.9,-2.8],[1.8,0.08,1.4],'#7a5a34');BX(g,[1.9,0.98,-2.8],[1.7,1.0,1.3],'#a8884a');
    const th=new Geo();for(const sd of [-1,1])G.box(th,M4.chain(M4.T(1.9,1.98,-2.8+sd*0.0),M4.RX(sd*0.75),M4.T(0,0,sd*0.0),M4.S(2.1,0.06,1.2)),[1,1,1],{base:1});D.push({mesh:mesh(th),M:M4.id(),tex:TX.thatch,col:[1,1,1],rim:0.2});
    BX(g,[1.6,0.98,-2.14],[0.5,0.7,0.02],'#2a1a0e');const ln=new Geo();G.sphere(ln,M4.chain(M4.T(2.55,1.55,-2.1),M4.S(0.09,0.12,0.09)),[1,1,1]);D.push({mesh:mesh(ln),M:M4.id(),col:[1,0.8,0.4],emis:[3,2,0.8],rim:0,noShadow:1});
    G.cyl(g,M4.chain(M4.T(0.4,0,-1.7),M4.S(0.25,0.5,0.25)),'#8a6a40',{seg:12});G.cyl(g,M4.chain(M4.T(0.0,0,-1.5),M4.S(0.2,0.4,0.2)),'#c8a870',{seg:12});pts.push([2.55,1.5,-2.0,4.0,[2.6,1.7,0.6]]);}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts};}
function buildBeach(){texInit();jgTex();const g=new Geo(),D=[];
  const sd=new Geo();G.plane(sd,M4.chain(M4.T(0,0,4),M4.S(40,1,16)),[1,1,1],{uv:8});D.push({mesh:mesh(sd),M:M4.id(),tex:TX.sand,col:[1,0.95,0.9],spec:0.3,rim:0});
  const se=new Geo();G.plane(se,M4.chain(M4.T(0,-0.02,-26),M4.S(120,1,52)),[1,1,1],{uv:10});D.push({mesh:mesh(se),M:M4.id(),tex:TX.sea,col:[0.9,0.9,1],emis:[0.15,0.12,0.12],spec:1.4,rim:0});
  const fm=new Geo();for(let i=0;i<3;i++)G.box(fm,M4.chain(M4.T(0,0.005,-3.9-i*0.9),M4.S(60,0.01,0.12)),[1,1,1],{base:1});D.push({mesh:mesh(fm),M:M4.id(),col:[1,1,1],emis:[0.6,0.55,0.5],rim:0,noShadow:1});
  // landing boat at the waterline
  const bt=new Geo();G.box(bt,M4.chain(M4.T(-1.6,0,-5.2),M4.RY(0.3),M4.S(1.4,0.6,2.6)),[1,1,1],{base:1});G.box(bt,M4.chain(M4.T(-1.6+Math.sin(0.3)*1.3,0,-5.2+Math.cos(0.3)*1.3),M4.RY(0.3),M4.RX(-0.35),M4.S(1.4,0.65,0.25)),[1,1,1],{base:1});D.push({mesh:mesh(bt),M:M4.id(),col:[0.4,0.42,0.36],rim:0.25,spec:0.4});
  
  // palms: segmented curved trunks + fronds
  const tr=new Geo(),lv=new Geo();for(const [x,z,lean,h,k] of [[1.6,-0.4,0.3,5,1],[2.4,-2.6,-0.2,6,2],[-2.0,0.4,-0.35,5.5,3],[-3.0,-2.4,0.2,6.5,4]]){let px=x,py=0;for(let i=0;i<8;i++){G.cyl(tr,M4.chain(M4.T(px,py,z),M4.RZ(-lean*(i/8)),M4.S(0.16-i*0.008,h/8+0.05,0.16-i*0.008)),[1,1,1],{seg:8});px+=Math.sin(lean*(i/8))*h/8;py+=Math.cos(lean*(i/8))*h/8;}
    for(let j=0;j<8;j++){const a=j/8*TAU;G.box(lv,M4.chain(M4.T(px,py,z),M4.RY(a),M4.RZ(-0.5-hash(k*j)*0.3),M4.S(2.2,0.04,0.42),M4.T(0.5,0,0)),[1,1,1],{base:1});}}
  D.push({mesh:mesh(tr),M:M4.id(),tex:TX.bark,col:[0.9,0.8,0.65],rim:0.2});D.push({mesh:mesh(lv),M:M4.id(),col:[0.22,0.45,0.2],rim:0.3});
  // jungle wall behind (behind camera side, +z far) and on the flanks
  const jw=new Geo();for(let i=0;i<20;i++){G.sphere(jw,M4.chain(M4.T(-14+i*1.5,1.5+hash(i)*2,10+hash(i*3)*2),M4.S(1.8,2.6,1.6)),[1,1,1]);for(const s of [-1,1])G.sphere(jw,M4.chain(M4.T(s*(9+hash(i*5)*2),1.5+hash(i*7)*2,8-i*0.6),M4.S(1.6,2.4,1.4)),[1,1,1]);}D.push({mesh:mesh(jw),M:M4.id(),col:[0.22,0.4,0.2],rim:0.2});
  for(const [x,z,s] of [[1.5,-2.2,0.3],[-2.6,-1.2,0.4],[2.6,2.0,0.5]])G.sphere(g,M4.chain(M4.T(x,0.08,z),M4.S(s*1.4,s*0.7,s)),'#6a645a');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[]};}
LIGHT5.jgDawn={sunDir:[0.5,0.45,-0.6],sunCol:[1.3,1.05,0.7],sky:[0.4,0.5,0.45],gnd:[0.18,0.2,0.12],fog:[0.62,0.7,0.62],fogD:0.07,fogH:0,skyTop:[0.45,0.6,0.62],skyHor:[0.95,0.85,0.66],skyBot:[0.4,0.45,0.35],cloud:0.2,stars:0,sunSize:900,sunGlow:[1,0.85,0.6],
  post:{bloom:0.6,thr:0.85,sat:1.05,expo:1.0,lift:[0.02,0.03,0.02],gain:[1.02,1.0,0.94],vig:1.3,ink:1}};
LIGHT5.jgDay={sunDir:[0.3,0.85,0.3],sunCol:[1.3,1.25,1.0],sky:[0.4,0.52,0.4],gnd:[0.18,0.22,0.12],fog:[0.5,0.62,0.48],fogD:0.045,fogH:0,skyTop:[0.5,0.7,0.8],skyHor:[0.8,0.88,0.8],skyBot:[0.35,0.4,0.3],cloud:0.3,stars:0,sunSize:900,sunGlow:[1,0.95,0.8],
  post:{bloom:0.45,thr:0.9,sat:1.08,expo:1.0,lift:[0.01,0.02,0.01],gain:[1.0,1.02,0.96],vig:1.2,ink:1}};
LIGHT5.jgRain={sunDir:[0.2,0.8,0.4],sunCol:[0.55,0.62,0.62],sky:[0.25,0.3,0.32],gnd:[0.1,0.12,0.1],fog:[0.32,0.38,0.4],fogD:0.08,fogH:0,skyTop:[0.25,0.3,0.34],skyHor:[0.4,0.45,0.46],skyBot:[0.2,0.22,0.22],cloud:0.9,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.3,thr:1.0,sat:0.85,expo:0.95,lift:[0.0,0.02,0.03],gain:[0.96,1.0,1.04],vig:1.4,ink:1}};
LIGHT5.jgNight={sunDir:[-0.4,0.7,0.5],sunCol:[0.35,0.45,0.8],sky:[0.06,0.08,0.16],gnd:[0.03,0.04,0.05],fog:[0.06,0.08,0.14],fogD:0.06,fogH:0,skyTop:[0.02,0.03,0.08],skyHor:[0.08,0.1,0.18],skyBot:[0.02,0.02,0.04],cloud:0,stars:1,sunSize:3000,sunGlow:[0.5,0.6,0.9],
  post:{bloom:0.7,thr:0.8,sat:1.1,expo:1.05,lift:[0.0,0.01,0.04],gain:[1.0,0.98,1.06],vig:1.5,ink:1}};
LIGHT5.beachDusk={sunDir:[0.1,0.12,-1.0],sunCol:[1.6,0.9,0.5],sky:[0.5,0.42,0.55],gnd:[0.3,0.22,0.16],fog:[0.85,0.6,0.5],fogD:0.012,fogH:0,skyTop:[0.25,0.25,0.55],skyHor:[1.2,0.62,0.36],skyBot:[0.6,0.4,0.36],cloud:0.6,stars:0,sunSize:500,sunGlow:[1.2,0.6,0.3],
  post:{bloom:0.7,thr:0.8,sat:1.15,expo:1.0,lift:[0.02,0.0,0.04],gain:[1.05,0.98,0.92],vig:1.3,ink:1}};
{const _gs5=getSet;getSet=function(k){if(k==='jungle')return SETS.jungle||(SETS.jungle=buildJungle());if(k==='camp')return SETS.camp||(SETS.camp=buildJungle({camp:1}));if(k==='farm')return SETS.farm||(SETS.farm=buildJungle({farm:1}));if(k==='beach')return SETS.beach||(SETS.beach=buildBeach());return _gs5(k);};}
PL.push(
 ['jg_dawn','jungle','jgDawn',[0.0,1.5,5.2],[0,1.5,-3],50],
 ['jg_low','jungle','jgDawn',[0.4,0.45,3.4],[0,1.9,-1.5],50],
 ['jg_day','jungle','jgDay',[0.6,1.45,3.6],[0,1.1,-1.0],54],
 ['jg_rain','jungle','jgRain',[-0.6,1.35,3.6],[0.2,1.0,-1.0],54],
 ['jg_night','jungle','jgNight',[0.3,1.5,4.2],[0,1.0,-1.0],54],
 ['camp','camp','jgNight',[-0.4,1.4,3.4],[0.6,0.8,-1.0],56],
 ['farm','farm','jgNight',[-0.3,1.45,3.4],[1.1,0.9,-1.8],56],
 ['jg_top','jungle','jgDawn',[0.0,9.0,9.0],[0,0.0,-2.0],50],
 ['beach','beach','beachDusk',[0.2,1.6,7.0],[-0.4,1.4,-3.0],56]);
