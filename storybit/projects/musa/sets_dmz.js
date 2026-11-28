// ===================== Korean DMZ 1976: Joint Security Area, the poplar site by the Bridge of No Return, the sea =====================
function grassTex(){return TX.kgrass=TX.kgrass||cvTex(512,512,(x,w,h)=>{x.fillStyle='#4e7a2e';x.fillRect(0,0,w,h);speck(x,w,h,4000,['rgba(40,70,20,0.45)','rgba(160,190,90,0.35)','rgba(90,110,50,0.4)'],2);},{repeat:1});}
function hills(g,R,n,col,seed=0){for(let i=0;i<n;i++){const a=hash(i*1.7+seed)*Math.PI-Math.PI*0.5-Math.PI/2,r=R+hash(i*3.1+seed)*R*0.5;const x=Math.cos(a)*r,z=Math.sin(a)*r,s=12+hash(i*5.3+seed)*18;
  G.sphere(g,M4.chain(M4.T(x,-s*0.45,z),M4.S(s*1.6,s,s*1.3)),col[i%col.length],{su:14,sv:8});}}
function forest(g,x0,x1,z0,z1,n,seed=0){for(let i=0;i<n;i++){const x=lerp(x0,x1,hash(i*2.3+seed)),z=lerp(z0,z1,hash(i*4.1+seed)),h=4+hash(i*6.7+seed)*4;G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.25,h*0.5,0.25)),'#4a3a28',{seg:6});
  G.sphere(g,M4.chain(M4.T(x,h*0.6,z),M4.S(1.8+hash(i)*1.2,h*0.45,1.8+hash(i*3)*1.2)),['#3e6a2a','#4a7a30','#355a24'][i%3],{su:10,sv:7});}}
// ---- the Joint Security Area: blue conference huts straddling the concrete demarcation line ----
function buildJSA(){texInit();const g=new Geo(),D=[];
  TX.gravel=TX.gravel||cvTex(512,512,(x,w,h)=>{x.fillStyle='#a8a498';x.fillRect(0,0,w,h);speck(x,w,h,5000,['rgba(0,0,0,0.25)','rgba(255,255,255,0.25)'],1.5);},{repeat:1});
  const gr=new Geo();G.plane(gr,M4.S(240,1,240),[1,1,1],{uv:50});D.push({mesh:mesh(gr),M:M4.id(),tex:grassTex(),col:[1,1,1],rim:0});
  const pl=new Geo();G.plane(pl,M4.chain(M4.T(0,0.01,0),M4.S(60,1,44)),[1,1,1],{uv:16});D.push({mesh:mesh(pl),M:M4.id(),tex:TX.gravel,col:[1,1,1],rim:0});
  // the concrete Military Demarcation Line slab
  BX(g,[0,0,0],[60,0.12,0.5],'#e8e4dc');
  // huts: blue (UN) and grey-silver, each straddling the line
  const hut=(x,col)=>{BX(g,[x,0,0],[5,3.0,10],col);BX(g,[x,3.0,0],[5.3,0.25,10.3],'#f2f2f2');BX(g,[x,3.25,0],[3.6,0.5,10.3],'#e8e8e8');
    for(const sz of [-1,1])for(let k=0;k<4;k++)BX(g,[x+sz*2.52,1.2,-3.6+k*2.4],[0.06,1.1,1.2],'#2a3a4a');for(const zz of [-5.02,5.02])BX(g,[x,0,zz],[1.2,2.2,0.06],'#e8e8e8');};
  hut(-30,'#a8aeb4');hut(-15,'#4a8ad0');hut(0,'#4a8ad0');hut(15,'#4a8ad0');hut(30,'#a8aeb4');
  // north: Panmungak, a grey stone hall with columns + steps; south: a pagoda-roofed pavilion
  BX(g,[0,0,-30],[34,4,10],'#9a9a96');BX(g,[0,4,-30],[30,4,9],'#a8a8a2');BX(g,[0,8,-30],[22,3.6,8],'#b0b0aa');BX(g,[0,11.6,-30],[23,0.5,8.6],'#7a7a76');
  for(let i=-7;i<=7;i++)BX(g,[i*2,0,-24.8],[0.6,4,0.6],'#c8c8c2');for(let k=0;k<5;k++)BX(g,[0,0,-24.5+k*0.5],[14,0.4*(5-k),0.5],'#b8b8b0');
  const wn=new Geo();for(let f=0;f<3;f++)for(let k=-6;k<=6;k++)BX(wn,[k*2.1,1.2+f*3.8,-24.9],[1.1,1.8,0.08],'#1a2028');D.push({mesh:mesh(wn),M:M4.id(),col:[1,1,1],rim:0});
  BX(g,[0,0,26],[14,1,8],'#9a8a78');BX(g,[0,1,26],[12,4,6],'#d8d0c0');G.lathe(g,M4.chain(M4.T(0,5,26),M4.S(1,1,0.6)),'#3a4a4a',[[0.001,3.2],[6,0.6],[9,0],[0.001,0]],{seg:4});
  // flag poles, guard posts, distant hills + forest
  for(const [x,z] of [[-20,-26],[20,-26],[-22,22],[22,22]])G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.1,9,0.1)),'#d8d8d8',{seg:6});
  forest(g,-60,60,-70,-40,60,1);forest(g,-70,-30,-20,40,30,2);forest(g,30,70,-20,40,30,3);hills(g,120,30,['#3a5a3a','#4a6a44','#5a7a5a'],1);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.5});return {D,pts:[]};}
// ---- the poplar site: open grass by a dirt road, UNC Checkpoint 3, KPA posts, the Bridge of No Return over the river, wooded hills ----
function buildTreeSite(){texInit();const g=new Geo(),D=[];
  const gr=new Geo();G.plane(gr,M4.S(300,1,300),[1,1,1],{uv:70});D.push({mesh:mesh(gr),M:M4.id(),tex:grassTex(),col:[1,1,1],rim:0});
  TX.dirt=TX.dirt||cvTex(512,512,(x,w,h)=>{x.fillStyle='#9a8460';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(60,40,20,0.35)','rgba(220,200,160,0.3)'],2);},{repeat:1});
  const rd=new Geo();for(let i=0;i<90;i++){const z0=-60+i*1.4,x=Math.sin(z0*0.03)*6+8;G.plane(rd,M4.chain(M4.T(x,0.015+i*0.0001,z0),M4.RY(-Math.cos(z0*0.03)*0.18),M4.S(5,1,2.4)),[1,1,1],{uv:1});}D.push({mesh:mesh(rd),M:M4.id(),tex:TX.dirt,col:[1,1,1],rim:0});
  // river + Bridge of No Return
  const rv=new Geo();G.plane(rv,M4.chain(M4.T(38,0.03,0),M4.S(14,1,300)),[1,1,1],{uv:1});D.push({mesh:mesh(rv),M:M4.id(),col:[0.35,0.45,0.48],spec:2.5,rim:0});
  BX(g,[38,1.6,-8],[18,0.5,4],'#c8c4b8');for(const sz of [-1,1])BX(g,[38,2.1,-8+sz*1.9],[18,0.8,0.15],'#d8d4c8');for(const x of [32,38,44])BX(g,[x,0,-8],[0.8,1.6,3],'#a8a498');
  // UNC Checkpoint 3: small concrete post with sandbags + a white sign; observation post on a rise to the south
  BX(g,[16,0,8],[3.2,2.6,3.2],'#c8c0b0');BX(g,[16,2.6,8],[3.6,0.3,3.6],'#7a7a72');for(let k=0;k<12;k++){const a=k/12*TAU;BX(g,[16+Math.cos(a)*2.6,0,8+Math.sin(a)*2.6],[1.2,0.9,0.6],'#a8946a',{ry:-a});}
  BX(g,[16,2.9,8],[1.6,0.8,0.1],'#f4f4f4');
  G.sphere(g,M4.chain(M4.T(-40,-6,40),M4.S(26,12,20)),'#5a7a44',{su:14,sv:8});BX(g,[-36,5,34],[4,3,4],'#b8b0a0');BX(g,[-36,8,34],[4.6,0.3,4.6],'#6a6a62');
  // KPA guard posts across the road (north side)
  for(const [x,z] of [[-14,-16],[24,-22]]){BX(g,[x,0,z],[3.6,2.8,3],'#8a8a74');BX(g,[x,2.8,z],[4,0.3,3.4],'#5a5a4a');BX(g,[x,1.4,z+1.52],[1,0.9,0.06],'#1a2028');}
  forest(g,-80,80,-90,-40,90,4);forest(g,-90,-40,-30,60,40,5);forest(g,50,90,-40,60,40,6);hills(g,140,34,['#3e5e3a','#4a6a40','#567650'],2);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.5});return {D,pts:[]};}
// ---- the sea: an aircraft carrier offshore ----
function buildSea(){texInit();const g=new Geo(),D=[];
  TX.sea=TX.sea||cvTex(512,512,(x,w,h)=>{x.fillStyle='#2a4a6a';x.fillRect(0,0,w,h);for(let i=0;i<900;i++){x.fillStyle=`rgba(${hash(i)>0.5?'255,255,255':'10,30,50'},${0.12+hash(i*3)*0.15})`;x.fillRect(hash(i*1.3)*w,hash(i*2.7)*h,10+hash(i*5)*40,2);}},{repeat:1});
  const sea=new Geo();G.plane(sea,M4.S(800,1,800),[1,1,1],{uv:80});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea,col:[1,1,1],spec:2.2,rim:0});
  // carrier: hull, flight deck with angled section, island, jets parked
  BX(g,[0,0,0],[12,6,90],'#6a6e74');BX(g,[0,6,0],[22,0.5,96],'#4a4e54');BX(g,[-8,6,-12],[10,0.5,40],'#4a4e54',{ry:0.16});BX(g,[9,6.5,8],[4,8,12],'#7a7e84');BX(g,[9,14.5,8],[2,4,2],'#6a6e74');
  for(let i=0;i<8;i++){const z=-30+i*7,x=-5+(i%2)*3;BX(g,[x,6.5,z],[1.2,0.9,4],'#8a8e94');BX(g,[x,6.9,z+0.6],[5,0.15,1.6],'#8a8e94');}
  const ln=new Geo();BX(ln,[0,6.27,0],[0.3,0.02,90],'#e8e8e8');D.push({mesh:mesh(ln),M:M4.id(),col:[1,1,1],emis:[0.6,0.6,0.6],rim:0});
  G.sphere(g,M4.chain(M4.T(-400,-30,-500),M4.S(160,60,60)),'#5a6a7a',{su:14,sv:8});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.8});return {D,pts:[]};}
LIGHT5.korDay={sunDir:[-0.35,0.7,0.45],sunCol:[1.55,1.45,1.25],sky:[0.6,0.66,0.72],gnd:[0.4,0.45,0.3],fog:[0.75,0.82,0.9],fogD:0.0018,fogH:0,skyTop:[0.35,0.55,0.85],skyHor:[0.85,0.9,0.95],skyBot:[0.7,0.75,0.7],cloud:0.35,stars:0,sunSize:900,sunGlow:[1.0,0.95,0.8],
  post:{bloom:0.2,thr:1.2,sat:1.35,expo:0.92,lift:[0,0,0.01],gain:[1.0,1.0,0.96],vig:1.0,ink:1}};
LIGHT5.korDawn={sunDir:[0.7,0.25,0.4],sunCol:[1.7,1.1,0.7],sky:[0.45,0.45,0.55],gnd:[0.35,0.32,0.28],fog:[0.85,0.7,0.6],fogD:0.006,fogH:0,skyTop:[0.25,0.32,0.55],skyHor:[0.98,0.72,0.5],skyBot:[0.6,0.5,0.45],cloud:0.3,stars:0,sunSize:900,sunGlow:[1.4,0.9,0.5],
  post:{bloom:0.35,thr:1.0,sat:1.15,expo:1.0,lift:[0.01,0.0,0.0],gain:[1.06,0.98,0.9],vig:1.1,ink:1}};
LIGHT5.seaDay={sunDir:[-0.3,0.6,0.5],sunCol:[1.6,1.5,1.3],sky:[0.55,0.62,0.72],gnd:[0.3,0.4,0.5],fog:[0.75,0.82,0.9],fogD:0.0015,fogH:0,skyTop:[0.3,0.5,0.85],skyHor:[0.82,0.88,0.95],skyBot:[0.4,0.5,0.6],cloud:0.4,stars:0,sunSize:900,sunGlow:[1.0,0.95,0.8],
  post:{bloom:0.25,thr:1.1,sat:1.15,expo:0.95,lift:[0,0,0.01],gain:[1.0,1.0,1.02],vig:1.0,ink:1}};
{const _gd=getSet;getSet=function(k){const B={jsa:buildJSA,tsite:buildTreeSite,sea:buildSea};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gd(k);};}
PL.length=0;
PL.push(
 ['jsa_wide','jsa','korDay',[0,3.2,24],[0,2.2,-6],50],
 ['jsa_mdl','jsa','korDay',[6.5,1.7,9],[5.5,1.5,-2],40],
 ['jsa_face','jsa','korDay',[12.2,1.7,0.3],[4.0,1.45,0],44],
 ['ts_crew','tsite','korDay',[1.5,1.9,15],[-2.2,2.8,0],52],
 ['ts_base','tsite','korDay',[2.5,1.5,9],[0,1.6,0],46],
 ['jsa_air','jsa','korDay',[22,40,40],[0,0,-6],45],
 ['ts_wide','tsite','korDay',[20,5,28],[0,6,0],52],
 ['ts_low','tsite','korDay',[9,1.6,13],[0,2.2,0],46],
 ['ts_air','tsite','korDay',[26,52,40],[4,0,-2],45],
 ['ts_rev','tsite','korDay',[-10,2.2,-14],[2,2.6,4],46],
 ['ts_dawn','tsite','korDawn',[22,4,30],[0,6,0],52],
 ['ts_sky','tsite','korDay',[6,1.4,24],[0,22,-30],62],
 ['sea_wide','sea','seaDay',[90,22,120],[0,4,0],40],
);
