'use strict';
// ===================== Phineas Gage 1848: railroad cut, road, inn room, Andes road, museum =====================
function pgTex(){TX.gravel=TX.gravel||cvTex(512,512,(x,w,h)=>{x.fillStyle='#8a7a62';x.fillRect(0,0,w,h);speck(x,w,h,5000,['rgba(60,50,40,0.5)','rgba(200,190,170,0.5)','rgba(120,100,80,0.5)'],3);},{repeat:1});
  TX.grass=TX.grass||cvTex(512,512,(x,w,h)=>{x.fillStyle='#6a8a3a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(150,190,80,0.6)';x.lineWidth=2;for(let i=0;i<1500;i++){const a=hash(i)*w,b=hash(i*3)*h;x.beginPath();x.moveTo(a,b);x.lineTo(a+(hash(i*5)-0.5)*5,b-10);x.stroke();}},{repeat:1});
  TX.granite=TX.granite||cvTex(512,512,(x,w,h)=>{x.fillStyle='#8e8a84';x.fillRect(0,0,w,h);speck(x,w,h,6000,['rgba(40,38,36,0.35)','rgba(230,225,215,0.35)','rgba(150,130,110,0.3)'],2);x.strokeStyle='rgba(50,46,42,0.35)';x.lineWidth=2;for(let i=0;i<10;i++){x.beginPath();x.moveTo(0,hash(i)*h);x.lineTo(w,hash(i)*h+(hash(i*3)-0.5)*40);x.stroke();}},{repeat:1});
  TX.planks=TX.planks||cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=['#8a6440','#7a5636','#946c46'][i%3];x.fillRect(i*64,0,64,h);x.strokeStyle='rgba(40,24,10,0.7)';x.lineWidth=4;x.beginPath();x.moveTo(i*64,0);x.lineTo(i*64,h);x.stroke();x.strokeStyle='rgba(50,30,14,0.3)';x.lineWidth=2;for(let k=0;k<4;k++){x.beginPath();x.moveTo(i*64+10+k*12,0);x.bezierCurveTo(i*64+14+k*12,h*0.4,i*64+6+k*12,h*0.7,i*64+12+k*12,h);x.stroke();}}},{repeat:1});
  TX.dirt=TX.dirt||cvTex(512,512,(x,w,h)=>{x.fillStyle='#a8865a';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(80,60,40,0.4)','rgba(220,190,140,0.4)'],3);x.strokeStyle='rgba(90,64,40,0.35)';x.lineWidth=6;for(const y of [0.38,0.62]){x.beginPath();x.moveTo(0,y*h);x.lineTo(w,y*h+8);x.stroke();}},{repeat:1});
  TX.mus=TX.mus||cvTex(512,512,(x,w,h)=>{x.fillStyle='#2a2430';x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,0.05)';x.lineWidth=2;for(let i=0;i<8;i++){x.beginPath();x.moveTo(i*64,0);x.lineTo(i*64,h);x.stroke();}},{repeat:1});}
function pine(tr,lv,x,z,h,k){G.cyl(tr,M4.chain(M4.T(x,0,z),M4.S(0.12,h*0.4,0.12)),[1,1,1],{seg:8});for(let i=0;i<3;i++)G.lathe(lv,M4.chain(M4.T(x,h*0.3+i*h*0.22,z),M4.S(1)),[1,1,1],[[0.001,h*0.36],[h*0.2*(1-i*0.22),0.0],[0.001,0.0]],{seg:10});}
function buildRail(o={}){texInit();pgTex();const g=new Geo(),D=[];
  const gr=new Geo();G.plane(gr,M4.S(80,1,80),[1,1,1],{uv:16});D.push({mesh:mesh(gr),M:M4.id(),tex:o.andes?TX.dirt:TX.grass,col:o.andes?[0.95,0.85,0.75]:[0.78,0.82,0.7],rim:0});
  if(!o.andes){// railbed: gravel strip, ties, rails running along x
    const bd=new Geo();G.plane(bd,M4.chain(M4.T(0,0.01,-0.8),M4.S(60,1,2.2)),[1,1,1],{uv:1});D.push({mesh:mesh(bd),M:M4.id(),tex:TX.gravel,col:[1,1,1],rim:0});
    for(let i=-30;i<30;i++)BX(g,[i*0.6,0.02,-0.8],[0.16,0.08,1.5],'#5a4430');for(const z of [-1.35,-0.25])BX(g,[0,0.1,z],[60,0.07,0.07],'#5a5e66');
    // the rock cut: granite walls behind, a boulder with the drill hole at the work spot
    const rk=new Geo(),rk2=new Geo();for(let i=0;i<40;i++){const x=-16+i*0.85+hash(i)*0.5,h=1.0+hash(i*5)*1.6;G.sphere(i%3?rk:rk2,M4.chain(M4.T(x,h*0.7+hash(i*2)*0.6,-3.3-hash(i*3)*1.0),M4.RY(hash(i*7)*3),M4.RZ((hash(i*9)-0.5)*0.5),M4.S(0.9+hash(i*2)*0.6,h,0.9)),[1,1,1],{su:7,sv:5});}
    for(let i=0;i<18;i++){const x=-12+i*1.4+hash(i*13)*0.6;G.sphere(rk2,M4.chain(M4.T(x,0.12,-2.2-hash(i*17)*0.6),M4.RY(hash(i*19)*3),M4.S(0.3+hash(i)*0.35,0.18+hash(i*3)*0.15,0.3)),[1,1,1],{su:6,sv:4});}
    G.sphere(rk,M4.chain(M4.T(0.9,0.28,0.6),M4.RY(0.4),M4.S(0.85,0.42,0.65)),[1,1,1],{su:9,sv:6});G.sphere(rk2,M4.chain(M4.T(-2.2,0.18,1.2),M4.RY(0.7),M4.S(0.5,0.3,0.45)),[1,1,1],{su:7,sv:5});
    D.push({mesh:mesh(rk2),M:M4.id(),tex:TX.granite,col:[0.78,0.76,0.74],rim:0.2});
    D.push({mesh:mesh(rk),M:M4.id(),tex:TX.granite,col:[1,0.98,0.95],rim:0.2});
    G.cyl(g,M4.chain(M4.T(0.9,0.69,0.6),M4.S(0.05,0.02,0.05)),'#1a1612',{seg:10});
    // powder kegs, wheelbarrow, shovels, a tool tent
    for(const [x,z] of [[2.2,0.9],[2.55,0.6]]){G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.22,0.5,0.22)),'#7a5230',{seg:14});for(const y of [0.08,0.42])G.cyl(g,M4.chain(M4.T(x,y,z),M4.S(0.23,0.04,0.23)),'#3a3a40',{seg:14});}
    BX(g,[-1.6,0.25,0.4],[0.9,0.25,0.55],'#6a4a2a');G.cyl(g,M4.chain(M4.T(-2.1,0.18,0.4),M4.RZ(Math.PI/2),M4.S(0.18,0.06,0.18)),'#3a2a1a',{seg:14});
    const tn=new Geo();for(const sd of [-1,1])G.box(tn,M4.chain(M4.T(-4.2+sd*0.8,0,-1.9),M4.RZ(sd*0.62),M4.S(0.04,1.4,2.0)),[1,1,1],{base:1});D.push({mesh:mesh(tn),M:M4.id(),col:[0.92,0.88,0.78],rim:0.2});}
  // trees + hills (or Andes peaks)
  const tr=new Geo(),lv=new Geo();for(let i=0;i<22;i++){const x=-18+i*1.7+hash(i)*0.8,z=o.andes?-6-hash(i*3)*4:-6-hash(i*3)*5;if(!o.andes||i%3===0)pine(tr,lv,x,z,3+hash(i*7)*2.5,i);}
  
  D.push({mesh:mesh(tr),M:M4.id(),col:[0.36,0.26,0.18],rim:0.1});D.push({mesh:mesh(lv),M:M4.id(),col:o.andes?[0.36,0.42,0.24]:[0.2,0.4,0.24],rim:0.2});
  const hl=new Geo();if(o.andes){for(let i=0;i<9;i++)G.lathe(hl,M4.chain(M4.T(-36+i*9,0,-40-hash(i)*10),M4.S(1)),[1,1,1],[[0.001,14+hash(i*3)*10],[9+hash(i)*4,0],[0.001,0]],{seg:11});D.push({mesh:mesh(hl),M:M4.id(),col:[0.45,0.34,0.46],rim:0.3});
    const sn=new Geo();for(let i=0;i<9;i++){const H2=14+hash(i*3)*10,R2=9+hash(i)*4;G.lathe(sn,M4.chain(M4.T(-36+i*9,H2*0.72,-40-hash(i)*10+0.1),M4.S(1)),[1,1,1],[[0.001,H2*0.28+0.05],[R2*0.29,0],[0.001,0]],{seg:11});}D.push({mesh:mesh(sn),M:M4.id(),col:[1,0.96,0.96],emis:[0.2,0.15,0.15],rim:0});}
  else{for(let i=0;i<8;i++)G.sphere(hl,M4.chain(M4.T(-30+i*9,-2,-24-hash(i)*6),M4.S(8,6+hash(i*2)*3,5)),[1,1,1]);D.push({mesh:mesh(hl),M:M4.id(),col:[0.3,0.48,0.3],rim:0.2});}
  if(o.andes){const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.01,-0.6),M4.S(70,1,2.4)),[1,1,1],{uv:1});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.dirt,col:[1,0.95,0.9],rim:0});for(let i=0;i<14;i++)G.sphere(g,M4.chain(M4.T(-12+i*1.9+hash(i)*0.6,0.15,1.2+hash(i*3)*2),M4.S(0.3+hash(i)*0.3,0.2,0.3)),'#8a7a6a');}
  else{const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.012,3.2),M4.S(70,1,2.0)),[1,1,1],{uv:1});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.dirt,col:[1,0.95,0.9],rim:0});}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[]};}
function buildInn(){texInit();pgTex();const g=new Geo(),D=[];const fl=new Geo();G.plane(fl,M4.S(10,1,10),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.planks,col:[0.85,0.8,0.75],rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.4),M4.S(10,3,0.1)),[1,1,1],{base:1,uvs:[5,1.5]});G.box(wg,M4.chain(M4.T(-3,0,0),M4.S(0.1,3,8)),[1,1,1],{base:1,uvs:[4,1.5]});G.box(wg,M4.chain(M4.T(3,0,0),M4.S(0.1,3,8)),[1,1,1],{base:1,uvs:[4,1.5]});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.planks,col:[1,0.95,0.9],rim:0,noShadow:1});
  const wn=new Geo();G.box(wn,M4.chain(M4.T(1.2,1.0,-2.34),M4.S(1.1,1.0,0.02)),[1,1,1],{base:1});D.push({mesh:mesh(wn),M:M4.id(),col:[1,0.92,0.75],emis:[1.4,1.2,0.9],rim:0,noShadow:1});for(const x of [0.65,1.2,1.75])BX(g,[x,1.0,-2.31],[0.06,1.0,0.05],'#4a3420');BX(g,[1.2,1.48,-2.31],[1.15,0.06,0.05],'#4a3420');
  BX(g,[-1.4,0,-1.7],[1.0,0.45,1.9],'#6a4a2c');BX(g,[-1.4,0.45,-1.7],[0.95,0.12,1.85],'#e8e2d4');BX(g,[-1.4,0.45,-2.45],[1.0,0.9,0.1],'#5a3c22');const pl=new Geo();G.sphere(pl,M4.chain(M4.T(-1.4,0.66,-2.3),M4.S(0.36,0.1,0.18)),[1,1,1]);D.push({mesh:mesh(pl),M:M4.id(),col:[0.98,0.97,0.94],rim:0.2});
  BX(g,[-1.4,0.58,-1.2],[0.98,0.06,1.0],'#a83a2a');
  BX(g,[1.4,0,-1.1],[0.9,0.72,0.6],'#7a5632');BX(g,[1.4,0.72,-1.1],[1.0,0.04,0.7],'#8a6440');G.cyl(g,M4.chain(M4.T(1.6,0.76,-1.2),M4.S(0.06,0.14,0.06)),'#e8e0c8',{seg:10});
  const lp=new Geo();G.sphere(lp,M4.chain(M4.T(1.6,0.95,-1.2),M4.S(0.05,0.07,0.05)),[1,1,1]);D.push({mesh:mesh(lp),M:M4.id(),col:[1,0.8,0.4],emis:[3,2,0.8],rim:0,noShadow:1});
  BX(g,[0.6,0,-0.4],[0.45,0.45,0.45],'#6a4a2c');BX(g,[0.6,0.45,-0.6],[0.45,0.6,0.06],'#5a3c22');
  BX(g,[-2.94,0,0.4],[0.06,2.1,0.95],'#5a3c22');G.sphere(g,M4.chain(M4.T(-2.88,1.0,0.75),M4.S(0.04)),'#c8a830');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[[1.6,1.0,-1.1,3.5,[2.4,1.6,0.6]]]};}
function buildMuseum(){texInit();pgTex();const g=new Geo(),D=[];const fl=new Geo();G.plane(fl,M4.S(12,1,12),[1,1,1],{uv:4});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.planks,col:[0.35,0.3,0.32],spec:1.2,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.6),M4.S(12,4,0.1)),[1,1,1],{base:1,uvs:[6,2]});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.mus,col:[1,1,1],rim:0,noShadow:1});
  BX(g,[0,0,-0.8],[1.0,0.95,0.8],'#1c1a22');BX(g,[0,0.95,-0.8],[1.06,0.05,0.86],'#c8a860');for(const x of [-3,3]){BX(g,[x,0,-2.2],[0.9,0.8,0.6],'#1c1a22');}
  const fr=new Geo();for(const x of [-2.6,2.6]){G.box(fr,M4.chain(M4.T(x,1.4,-2.53),M4.S(1.1,1.4,0.04)),[1,1,1],{base:1});}D.push({mesh:mesh(fr),M:M4.id(),col:[0.5,0.4,0.25],emis:[0.08,0.06,0.03],rim:0.2});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[[0,3.0,-0.8,3.0,[3,2.7,2.2]]]};}
LIGHT5.gold={sunDir:[0.7,0.35,0.4],sunCol:[1.6,1.15,0.7],sky:[0.5,0.5,0.6],gnd:[0.3,0.25,0.18],fog:[0.95,0.8,0.62],fogD:0.012,fogH:0,skyTop:[0.35,0.5,0.75],skyHor:[1.2,0.85,0.55],skyBot:[0.5,0.42,0.35],cloud:0.5,stars:0,sunSize:700,sunGlow:[1.2,0.8,0.45],
  post:{bloom:0.6,thr:0.8,sat:1.1,expo:1.0,lift:[0.02,0.01,0.02],gain:[1.05,1.0,0.92],vig:1.2,ink:1}};
LIGHT5.noon={sunDir:[0.3,0.85,0.4],sunCol:[1.4,1.35,1.2],sky:[0.5,0.6,0.7],gnd:[0.3,0.3,0.22],fog:[0.75,0.82,0.9],fogD:0.01,fogH:0,skyTop:[0.35,0.55,0.85],skyHor:[0.85,0.9,0.95],skyBot:[0.5,0.5,0.45],cloud:0.5,stars:0,sunSize:900,sunGlow:[1,1,0.9],
  post:{bloom:0.4,thr:0.9,sat:1.08,expo:1.0,lift:[0.01,0.01,0.02],gain:[1.02,1.0,0.97],vig:1.1,ink:1}};
LIGHT5.duskR={sunDir:[-0.8,0.12,-0.5],sunCol:[1.5,0.6,0.35],sky:[0.4,0.3,0.45],gnd:[0.25,0.15,0.12],fog:[0.7,0.4,0.4],fogD:0.012,fogH:0,skyTop:[0.15,0.15,0.4],skyHor:[1.2,0.5,0.3],skyBot:[0.4,0.25,0.3],cloud:0.6,stars:0,sunSize:500,sunGlow:[1.3,0.5,0.3],
  post:{bloom:0.7,thr:0.8,sat:1.15,expo:1.0,lift:[0.03,0.0,0.05],gain:[1.05,0.95,0.92],vig:1.35,ink:1}};
LIGHT5.innDay={sunDir:[0.3,0.9,0.4],sunCol:[0.6,0.55,0.45],sky:[0.4,0.36,0.32],gnd:[0.2,0.15,0.1],fog:[0.3,0.24,0.18],fogD:0.01,fogH:0,skyTop:[0.3,0.3,0.3],skyHor:[0.3,0.3,0.3],skyBot:[0.2,0.2,0.2],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.5,thr:0.85,sat:1.05,expo:1.05,lift:[0.02,0.01,0.0],gain:[1.06,1.0,0.9],vig:1.3,ink:1}};
LIGHT5.museum={sunDir:[0.0,1.0,0.1],sunCol:[0.25,0.24,0.28],sky:[0.1,0.1,0.14],gnd:[0.05,0.05,0.06],fog:[0.05,0.05,0.07],fogD:0.01,fogH:0,skyTop:[0.05,0.05,0.06],skyHor:[0.05,0.05,0.06],skyBot:[0.03,0.03,0.04],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.7,thr:0.75,sat:1.0,expo:1.05,lift:[0.01,0.01,0.03],gain:[1.04,1.0,0.96],vig:1.6,ink:1}};
{const _gs6=getSet;getSet=function(k){if(k==='rail')return SETS.rail||(SETS.rail=buildRail());if(k==='andes')return SETS.andes||(SETS.andes=buildRail({andes:1}));if(k==='inn')return SETS.inn||(SETS.inn=buildInn());if(k==='museum')return SETS.museum||(SETS.museum=buildMuseum());return _gs6(k);};}
PL.push(
 ['rr_wide','rail','gold',[2.4,1.7,6.0],[0.2,0.9,-0.8],50],
 ['rr_rock','rail','gold',[0.2,1.3,3.0],[0.8,0.7,0.4],50],
 ['rr_low','rail','gold',[0.6,0.35,3.4],[0.6,2.4,-0.6],56],
 ['rr_dusk','rail','duskR',[2.4,1.7,6.0],[0.2,0.9,-0.8],50],
 ['road','rail','noon',[0.0,1.5,8.2],[0,0.9,3.0],52],
 ['inn','inn','innDay',[0.2,1.45,3.0],[-0.2,0.8,-1.2],56],
 ['andes','andes','duskR',[0.0,1.6,7.0],[0,1.4,-0.6],52],
 ['museum','museum','museum',[0.0,1.35,2.6],[0,1.05,-0.8],50]);
