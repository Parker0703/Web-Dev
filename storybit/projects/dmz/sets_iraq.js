'use strict';
// ===================== Jessica Lynch · 3D sets: Nasiriyah road, hospital (ext night + ward), Congress hearing room =====================
function buildIqRoad(o={}){texInit();const g=new Geo(),D=[];
  TX.sand=TX.sand||cvTex(512,512,(x,w,h)=>{x.fillStyle='#b89060';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(120,90,50,0.35)','rgba(255,240,200,0.3)'],2);},{repeat:1});
  TX.asph=TX.asph||cvTex(512,512,(x,w,h)=>{x.fillStyle='#4a4644';x.fillRect(0,0,w,h);speck(x,w,h,2500,['rgba(0,0,0,0.3)','rgba(255,255,255,0.08)'],2);x.fillStyle='rgba(200,170,120,0.25)';for(let i=0;i<30;i++)x.fillRect(hash(i)*w,hash(i*3)*h,40+hash(i*5)*80,6);},{repeat:1});
  const gr=new Geo();G.plane(gr,M4.S(200,1,200),[1,1,1],{uv:60});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.sand,col:[1,1,1],rim:0});
  const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.01,0),M4.S(200,1,7)),[1,1,1],{uv:30});D.push({mesh:mesh(rd),M:M4.id(),tex:TX.asph,col:[1,1,1],spec:0.5,rim:0});
  for(let x=-90;x<90;x+=6)BX(g,[x,0.012,0],[3,0.005,0.15],'#e8e0c8');
  // low mud-brick houses with flat roofs, parapets, dark windows; a minaret; date palms; power poles
  for(let i=0;i<34;i++){const x=-60+i*5+hash(i)*2,z=(i%2?-1:1)*(7+hash(i*3)*4),w=4+hash(i*5)*3,h=3+hash(i*7)*3.5;if(o.skip&&o.skip(x,z))continue;BX(g,[x,0,z],[w,h,4],['#c8b088','#b8a078','#d8c098'][i%3]);BX(g,[x,h,z],[w+0.2,0.35,4.2],'#a89068');
    for(let k=0;k<2;k++)BX(g,[x-w/4+k*w/2,h*0.55,z+(z>0?-2.02:2.02)],[0.7,0.9,0.05],'#2a2420');}
  G.cyl(g,M4.chain(M4.T(30,0,-24),M4.S(1.2,16,1.2)),'#d8c8a8',{seg:12});G.lathe(g,M4.chain(M4.T(30,16,-24)),'#4a8a7a',[[0.001,3],[1.6,0.6],[1.4,0],[0.001,0]],{seg:12});
  for(let i=0;i<26;i++){const x=-90+hash(i*2.2)*180,z=(hash(i*4.4)>0.5?1:-1)*(5+hash(i*6.6)*20),h=6+hash(i)*4;if(o.skip&&o.skip(x,z))continue;G.cyl(g,M4.chain(M4.T(x,0,z),M4.RZ((hash(i*9)-0.5)*0.2),M4.S(0.22,h,0.22)),'#7a5a3a',{seg:8});
    for(let k=0;k<8;k++){const a=k/8*TAU;G.sphere(g,M4.chain(M4.T(x+Math.cos(a)*1.3,h-0.2,z+Math.sin(a)*1.3),M4.RY(-a),M4.RZ(0.6),M4.S(1.6,0.12,0.4)),'#5a7a3a',{su:10,sv:6});}}
  for(let x=-80;x<80;x+=14){if(o.skip&&o.skip(x,4.6))continue;G.cyl(g,M4.chain(M4.T(x,0,4.6),M4.S(0.12,7,0.12)),'#5a4a3a',{seg:6});BX(g,[x,6.6,4.6],[1.8,0.1,0.1],'#5a4a3a');}
  // the wrecked convoy: burnt trucks, a flipped Humvee, debris
  const tr=(x,z,ry,col,burnt,flip)=>{const M0=M4.chain(M4.T(x,flip?1.1:0,z),M4.RY(ry),M4.RZ(flip?2.6:0));const B=(p,s,c)=>G.box(g,M4.chain(M0,M4.T(...p),M4.S(...s)),c,{base:1});
    B([0,0.45,0],[4.6,1.2,2.2],burnt?'#3a3634':col);B([1.4,1.65,0],[1.6,0.9,2.0],burnt?'#2a2624':col);B([-0.8,1.65,0],[2.8,0.2,2.1],'#2a2a26');
    for(const [wx,wz] of [[1.5,1.1],[1.5,-1.1],[-1.4,1.1],[-1.4,-1.1]])G.cyl(g,M4.chain(M0,M4.T(wx,0.5,wz),M4.RX(Math.PI/2),M4.S(0.5,0.35,0.5),M4.T(0,-0.5,0)),'#141414',{seg:16});};
  if(!o.clean){tr(-6,0.8,0.15,'#8a7a5a',1,0);tr(5,-1.6,-0.4,'#c8b088',0,1);tr(14,1.2,0.6,'#6a6a58',1,0);tr(-16,-1.8,-0.1,'#8a7a5a',1,0);
  for(let i=0;i<30;i++)BX(g,[-20+hash(i)*40,0,(hash(i*3)-0.5)*8],[0.15+hash(i*5)*0.3,0.05,0.1+hash(i*7)*0.2],'#2a2622',{ry:hash(i*9)*3});}
  if(o.check){G.cyl(g,M4.chain(M4.T(11,0,-6),M4.S(0.12,6,0.12)),'#5a5a5a',{seg:6});BX(g,[11,6,-6],[0.8,0.4,0.5],'#e8e8d8');}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.6});return {D,pts:[]};}
function buildIqHosp(){texInit();const g=new Geo(),D=[];
  TX.conc=TX.conc||cvTex(512,512,(x,w,h)=>{x.fillStyle='#b8b0a0';x.fillRect(0,0,w,h);speck(x,w,h,2000,['rgba(0,0,0,0.15)','rgba(255,255,255,0.1)'],2);for(let i=0;i<8;i++){x.fillStyle='rgba(90,80,70,0.25)';x.fillRect(0,i*64,w,3);}},{repeat:1});
  const gr=new Geo();G.plane(gr,M4.S(200,1,200),[1,1,1],{uv:60});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.sand||TX.conc,col:[0.8,0.78,0.72],rim:0});
  // 4-storey hospital block with window grid, entrance canopy, red crescent sign, wall + gate, palms
  const hb=new Geo();G.box(hb,M4.chain(M4.T(0,0,-12),M4.S(40,14,12)),[1,1,1],{base:1});D.push({mesh:mesh(hb),M:M4.id(),tex:TX.conc,col:[1,1,1],rim:0});
  const wn=new Geo();for(let f=0;f<4;f++)for(let k=0;k<16;k++)G.box(wn,M4.chain(M4.T(-18.5+k*2.45,1.4+f*3.2,-5.97),M4.S(1.3,1.6,0.05)),[1,1,1],{base:1});
  D.push({mesh:mesh(wn),M:M4.id(),col:[0.9,0.85,0.6],emis:[0.55,0.5,0.32],rim:0,noShadow:1});
  BX(g,[0,0,-5.2],[8,0.3,3],'#9a9488');BX(g,[0,3.2,-4.6],[9,0.3,4],'#8a8478');for(const x of [-4,4])BX(g,[x,0,-3],[0.3,3.2,0.3],'#a8a090');
  BX(g,[0,3.6,-2.7],[3.2,1.1,0.15],'#f4f4f4');BX(g,[0,3.75,-2.6],[0.9,0.8,0.05],'#c8201a');
  for(const x of [-30,30]){BX(g,[x>0?19:-19,0,6],[22,2.4,0.4],'#c8b898');}BX(g,[-4.5,0,6],[0.6,3,0.6],'#a89878');BX(g,[4.5,0,6],[0.6,3,0.6],'#a89878');
  for(let i=0;i<10;i++){const x=-28+i*6+hash(i)*2,z=8+hash(i*3)*6,h=7+hash(i)*3;G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.22,h,0.22)),'#5a4a3a',{seg:8});for(let k=0;k<8;k++){const a=k/8*TAU;G.sphere(g,M4.chain(M4.T(x+Math.cos(a)*1.3,h-0.2,z+Math.sin(a)*1.3),M4.RY(-a),M4.RZ(0.6),M4.S(1.6,0.12,0.4)),'#3a5a2a',{su:10,sv:6});}}
  const lp=new Geo();for(const x of [-12,12])G.sphere(lp,M4.chain(M4.T(x,5,-5.6),M4.S(0.3,0.3,0.3)),'#fff');D.push({mesh:mesh(lp),M:M4.id(),col:[1,0.9,0.6],emis:[3,2.4,1.2],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.6});return {D,pts:[[-12,5,-5,9,[2.2,1.8,1.0]],[12,5,-5,9,[2.2,1.8,1.0]],[0,3,-3.5,6,[1.5,1.3,0.8]]]};}
function buildWard(){texInit();const g=new Geo(),D=[];
  TX.tile=TX.tile||cvTex(512,512,(x,w,h)=>{x.fillStyle='#d8d4c8';x.fillRect(0,0,w,h);x.strokeStyle='rgba(90,90,80,0.35)';x.lineWidth=3;for(let i=0;i<=8;i++){x.beginPath();x.moveTo(i*64,0);x.lineTo(i*64,h);x.moveTo(0,i*64);x.lineTo(w,i*64);x.stroke();}speck(x,w,h,800,['rgba(0,0,0,0.1)'],2);},{repeat:1});
  const fl=new Geo();G.plane(fl,M4.S(14,1,12),[1,1,1],{uv:8});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.tile,col:[1,1,1],spec:1.2,rim:0});
  BX(g,[0,0,-4],[14,3.4,0.2],'#a8c0b8');BX(g,[0,0,-3.9],[14,1.1,0.05],'#7a9a90');BX(g,[-6.5,0,0],[0.2,3.4,12],'#a8c0b8');BX(g,[6.5,0,0],[0.2,3.4,12],'#a8c0b8');BX(g,[0,3.4,0],[14,0.1,12],'#d8d8d0');
  BX(g,[3.2,1.0,-3.88],[1.8,1.4,0.05],'#1a2030');BX(g,[3.2,1.6,-3.86],[1.9,0.08,0.06],'#e8e8e0');
  const bed=(x,z)=>{BX(g,[x,0.55,z],[1.0,0.12,2.1],'#e8ece8');BX(g,[x,0.45,z],[1.05,0.08,2.15],'#8a9aa0');for(const [bx,bz] of [[-0.48,-1],[0.48,-1],[-0.48,1],[0.48,1]])BX(g,[x+bx,0,z+bz],[0.05,0.5,0.05],'#8a9aa0');BX(g,[x,0.5,z-1.05],[1.05,0.6,0.05],'#8a9aa0');
    BX(g,[x,0.68,z-0.75],[0.6,0.12,0.35],'#f8f8f4');BX(g,[x,0.62,z+0.3],[1.02,0.08,1.4],'#a8c8d8');};
  bed(-3,-1.8);bed(0,-1.8);bed(3,0.6);
  G.cyl(g,M4.chain(M4.T(1.0,0,-2.4),M4.S(0.02,1.9,0.02)),'#9aa0a8',{seg:6});BX(g,[1.0,1.85,-2.4],[0.18,0.25,0.08],'#e8f0f4');
  const lt=new Geo();for(const z of [-2,1.5])BX(lt,[0,3.32,z],[2.4,0.06,0.3],'#fff');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.8});return {D,pts:[[0,3.1,-2,6,[1.6,1.7,1.6]],[0,3.1,1.5,6,[1.6,1.7,1.6]]]};}
function buildHearing(){texInit();const g=new Geo(),D=[];
  TX.carpet=TX.carpet||cvTex(256,256,(x,w,h)=>{x.fillStyle='#3a4a6a';x.fillRect(0,0,w,h);speck(x,w,h,1200,['rgba(0,0,0,0.2)','rgba(255,255,255,0.05)'],2);},{repeat:1});
  const fl=new Geo();G.plane(fl,M4.S(30,1,30),[1,1,1],{uv:12});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.carpet,col:[1,1,1],rim:0});
  BX(g,[0,0,-8],[24,7,0.3],'#c8b89a');for(let i=-5;i<=5;i++)BX(g,[i*2.2,0,-7.8],[0.5,7,0.2],'#d8c8aa');BX(g,[0,6.2,-7.7],[24,0.4,0.3],'#a8946e');
  // the curved dais of committee members + the witness table with microphones, nameplate
  for(let i=-6;i<=6;i++){const a=i*0.09;BX(g,[Math.sin(a)*14,0,-5+(1-Math.cos(a))*14],[2.4,1.4,0.6],'#5a3a22',{ry:-a});BX(g,[Math.sin(a)*14,1.4,-5+(1-Math.cos(a))*14],[2.5,0.08,0.9],'#7a5230',{ry:-a});}
  BX(g,[0,0,1.6],[3.6,0.78,1.0],'#6a4426');BX(g,[0,0.78,1.6],[3.8,0.05,1.1],'#3a5a3a');BX(g,[0,0.83,1.35],[0.6,0.12,0.04],'#f4f0e0');
  for(const x of [-0.5,0.5]){G.cyl(g,M4.chain(M4.T(x,0.83,1.4),M4.S(0.05,0.28,0.05)),'#1a1a1a',{seg:8});G.sphere(g,M4.chain(M4.T(x,1.13,1.45),M4.S(0.04,0.06,0.04)),'#1a1a1a');}
  // US flag on a pole
  BX(g,[-9,0,-7],[0.08,4.5,0.08],'#c8a040');
  const lt=new Geo();for(let i=-2;i<=2;i++)G.sphere(lt,M4.chain(M4.T(i*4,6.6,-3),M4.S(0.3,0.15,0.3)),'#fff');D.push({mesh:mesh(lt),M:M4.id(),col:[1,1,1],emis:[2.4,2.2,1.8],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.8});return {D,pts:[[0,6,-3,10,[1.6,1.5,1.3]]]};}
LIGHT5.desertDay={sunDir:[-0.4,0.62,0.5],sunCol:[1.7,1.45,1.1],sky:[0.6,0.6,0.62],gnd:[0.55,0.45,0.32],fog:[0.92,0.82,0.66],fogD:0.0025,fogH:0,skyTop:[0.45,0.6,0.85],skyHor:[0.98,0.9,0.75],skyBot:[0.8,0.7,0.55],cloud:0.2,stars:0,sunSize:900,sunGlow:[1.2,1.0,0.7],
  post:{bloom:0.2,thr:1.2,sat:1.3,expo:0.92,lift:[0,0,0],gain:[1.06,0.98,0.86],vig:1.0,ink:1}};
LIGHT5.iqNight={sunDir:[0.3,0.7,0.5],sunCol:[0.25,0.3,0.5],sky:[0.12,0.13,0.22],gnd:[0.1,0.08,0.08],fog:[0.08,0.08,0.14],fogD:0.02,fogH:0,skyTop:[0.02,0.03,0.08],skyHor:[0.12,0.12,0.22],skyBot:[0.04,0.04,0.06],cloud:0.3,stars:1,sunSize:3000,sunGlow:[0.3,0.3,0.5],
  post:{bloom:0.8,thr:0.75,sat:1.1,expo:1.1,lift:[0.01,0.01,0.04],gain:[1.02,0.98,1.02],vig:1.3,ink:1}};
LIGHT5.ward={sunDir:[0.2,0.9,0.3],sunCol:[0.6,0.62,0.6],sky:[0.5,0.55,0.55],gnd:[0.3,0.32,0.3],fog:[0.3,0.32,0.3],fogD:0.01,fogH:0,skyTop:[0.5,0.55,0.55],skyHor:[0.5,0.55,0.55],skyBot:[0.4,0.4,0.4],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.4,thr:1.0,sat:0.95,expo:1.05,lift:[0,0.02,0.02],gain:[0.96,1.02,1.0],vig:1.1,ink:1}};
LIGHT5.hearing={sunDir:[0.2,0.9,0.4],sunCol:[0.9,0.85,0.75],sky:[0.5,0.48,0.45],gnd:[0.3,0.28,0.26],fog:[0.4,0.38,0.35],fogD:0.005,fogH:0,skyTop:[0.5,0.48,0.45],skyHor:[0.5,0.48,0.45],skyBot:[0.4,0.38,0.35],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.35,thr:1.0,sat:1.05,expo:1.05,lift:[0.01,0.01,0.02],gain:[1.02,1.0,0.96],vig:1.1,ink:1}};
{const _gi=getSet;getSet=function(k){const B={iqroadC:()=>buildIqRoad({clean:1,skip:(x,z)=>z>0&&x>-40&&x<20}),iqcheck:()=>buildIqRoad({clean:1,check:1,skip:(x,z)=>z>0&&x>-24&&x<14}),iqroad:buildIqRoad,iqhosp:buildIqHosp,ward:buildWard,hearing:buildHearing};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gi(k);};}
PL.length=0;
PL.push(
 ['iq_road','iqroad','desertDay',[14,2.4,4.2],[-8,1.4,-0.5],50],
 ['iq_roadLow','iqroad','desertDay',[4,1.2,4.4],[-8,1.2,0],44],
 ['iq_crash','iqroadC','desertDay',[-13,3.2,16],[-12,1.0,0],54],
 ['iq_check','iqcheck','iqNight',[-13,5.8,4.5],[5,0.6,-0.3],40],
 ['iq_hosp','iqhosp','iqNight',[8,2.2,22],[0,4,-8],52],
 ['iq_ward','ward','ward',[2.2,1.7,5.2],[-0.6,0.8,-1.5],50],
 ['cg_hear','hearing','hearing',[0,1.6,6.5],[0,1.2,1.2],44],
 ['cg_dais','hearing','hearing',[0.5,1.5,3.4],[0,1.4,-5],52],
);
