'use strict';
// ===================== STYLE 4 · sets =====================
const WOOD='#a8743e',WOOD_D='#6a4426',WOOD_L='#c8945a',TILE='#2e3a5c',PAPER='#f6e8c8';
function noiseTex(w,h,base,spots,o={}){const cv=mkCanvas(w,h),g=cv.getContext('2d');g.fillStyle=base;g.fillRect(0,0,w,h);for(let i=0;i<(o.n||3000);i++){const [col,a,r]=spots[i%spots.length];g.fillStyle=col;g.globalAlpha=a*(0.4+hash(i*3)*0.6);g.beginPath();g.ellipse(hash(i)*w,hash(i*7)*h,r*(0.5+hash(i*5)),r*(0.4+hash(i*9)*0.6),hash(i)*3,0,TAU);g.fill();}g.globalAlpha=1;o.post&&o.post(g);return canvasTex(cv,{repeat:1});}
function planeMesh(w,d,uvRep){const g=new Geo();G.plane(g,M4.S(w,1,d),[1,1,1],{uv:uvRep});return mesh(g);}
// ---------- the sword-polisher's courtyard ----------
function buildCourtyard(){const S={static:[],tex:[]};const g=new Geo();
  const B=(p,s,col,o)=>G.box(g,M4.chain(M4.T(p[0],p[1],p[2]),o?.ry?M4.RY(o.ry):M4.id(),o?.rz?M4.RZ(o.rz):M4.id(),o?.rx?M4.RX(o.rx):M4.id(),M4.S(s[0],s[1],s[2])),col,{base:1});
  // ===== building: raised engawa deck + posts + shoji wall + tiled roof (back, z≈-5)
  const z0=-5.2,dw=14;B([0,0,z0],[dw,0.55,3.6],WOOD_D);
  for(let i=0;i<56;i++){const x=-dw/2+0.125+i*0.25;B([x,0.55,z0],[0.235,0.05,3.6],[WOOD,WOOD_L,'#b07c44'][i%3]);} // planks
  B([0,0.02,z0+1.86],[dw+0.2,0.5,0.14],WOOD_D);for(let i=0;i<8;i++)B([-6.5+i*1.85,0,z0+1.7],[0.22,0.55,0.22],'#4a2e1a');
  for(let i=0;i<6;i++){const x=-6.6+i*2.64;B([x,0.6,z0+1.55],[0.24,3.3,0.24],WOOD_D);B([x,0.6,z0-1.6],[0.24,3.3,0.24],WOOD_D);}
  B([0,3.85,z0+1.55],[dw+0.6,0.3,0.3],WOOD_D);B([0,3.85,z0-1.6],[dw+0.6,0.3,0.3],WOOD_D);
  for(let i=0;i<18;i++)B([-dw/2+0.4+i*0.78,4.1,z0],[0.12,0.14,4.6],'#5a3820'); // rafters
  // roof slab + tile rows + ridge
  const roofM=(x,y,z)=>M4.chain(M4.T(x,y,z),M4.RX(0.42));
  G.box(g,M4.chain(roofM(0,4.55,z0+0.4),M4.S(dw+1.6,0.18,4.6)),TILE,{base:1});
  for(let i=0;i<46;i++){G.cyl(g,M4.chain(roofM(-dw/2-0.5+i*0.33,4.74,z0+0.4),M4.T(0,0,2.25),M4.RX(-Math.PI/2),M4.S(0.11,4.5,0.11)),i%2?'#34426a':'#28324e',{seg:8,caps:0});}
  G.box(g,M4.chain(M4.T(0,5.45,z0-1.4),M4.S(dw+1.8,0.35,0.5)),'#1e2640',{base:1});
  // shoji back wall: lit paper panels + dark lattice
  S.shojiZ=z0-1.5;for(let i=0;i<12;i++){const x=-6.4+i*1.16;if(i===4||i===5)continue;
    for(let r=1;r<4;r++)B([x,0.6+r*0.82,S.shojiZ+0.05],[1.12,0.05,0.06],'#3a2414');for(let k=1;k<3;k++)B([x-0.56+k*0.373,0.6,S.shojiZ+0.05],[0.05,3.25,0.06],'#3a2414');B([x-0.56,0.6,S.shojiZ+0.05],[0.08,3.25,0.08],'#2a180c');}
  B([-1.24,0.6,S.shojiZ-0.4],[2.3,3.2,0.1],'#1a1210');// open doorway (dark interior)
  // indigo noren curtain over doorway
  for(let k=0;k<3;k++)B([-1.98+k*0.74,2.6,S.shojiZ+0.12],[0.7,1.0,0.03],'#2a3a78');
  // ===== props on the deck
  // tatami + cushion + whetstones + water bucket + sword rack
  S.tatami={p:[1.6,0.61,z0+0.4],s:[2.4,1.2]};
  G.box(g,M4.chain(M4.T(1.6,0.6,z0+0.6),M4.S(0.85,0.12,0.85)),'#4a3c8a',{base:1});G.box(g,M4.chain(M4.T(1.6,0.72,z0+0.6),M4.S(0.75,0.05,0.75)),'#5a4ca0',{base:1});
  for(let i=0;i<4;i++)G.box(g,M4.chain(M4.T(2.5+i*0.24,0.6,z0+1.25),M4.S(0.2,0.07+i*0.01,0.5)),['#d8d0c0','#c0b8a8','#e8e0d0','#8a8a92'][i],{base:1});
  B([2.9,0.6,z0+1.0],[1.0,0.32,0.5],WOOD_L); // low workbench
  const bucket=(x,y,z,s)=>{G.lathe(g,M4.chain(M4.T(x,y,z),M4.S(s)),'#8a5a30',[[0.001,0],[0.26,0],[0.27,0.02],[0.3,0.5],[0.29,0.52],[0.001,0.52]],{seg:20});G.cyl(g,M4.chain(M4.T(x,y+0.1*s,z),M4.S(0.28*s,0.05*s,0.28*s)),'#3a3a40',{seg:20,caps:0});G.cyl(g,M4.chain(M4.T(x,y+0.4*s,z),M4.S(0.3*s,0.05*s,0.3*s)),'#3a3a40',{seg:20,caps:0});G.cyl(g,M4.chain(M4.T(x,y+0.47*s,z),M4.S(0.27*s,0.01,0.27*s)),'#4a90b8',{seg:20});};
  bucket(0.6,0.6,z0+1.1,1);bucket(-5.6,0,-1.6,0.9);bucket(4.8,0,-2.0,0.8);
  // sword rack on deck
  B([4.6,0.6,z0+0.2],[1.2,0.06,0.3],'#2a1a10');for(const x of [4.1,5.1])B([x,0.6,z0+0.2],[0.07,0.9,0.3],'#2a1a10');
  for(let k=0;k<3;k++){G.box(g,M4.chain(M4.T(4.6,0.85+k*0.22,z0+0.2),M4.RZ(0.04),M4.S(1.4,0.04,0.05)),k===1?'#a8b0bc':'#1a1a22',{base:1});}
  // ===== courtyard ground details
  // rocks (zen garden)
  for(const [x,z,s,sd] of [[-3.6,1.2,0.6,1],[-2.9,1.6,0.35,2],[-4.3,0.8,0.28,3],[3.8,2.8,0.5,4],[4.4,3.2,0.3,5]])G.blob(g,M4.chain(M4.T(x,0.15*s,z),M4.S(s,s*0.8,s)),'#7e7a76',{seed:sd,j:0.22});
  // shrubs & bamboo & blossom tree
  for(let i=0;i<14;i++){const side=i%2?1:-1,x=side*(6.2+hash(i)*1.5),z=-3+i*0.9;G.blob(g,M4.chain(M4.T(x,0.45,z),M4.S(0.7+hash(i*3)*0.4,0.6,0.7)),['#3a6a2e','#2e5a28','#4a7a34'][i%3],{seed:i+20,j:0.2});}
  for(let i=0;i<9;i++){const x=6.8+hash(i)*1.6,z=-4.6+hash(i*3)*2.2,h=5+hash(i*5)*2.5;G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.07,h,0.07)),'#7aa04a',{seg:8,caps:0});for(let k=1;k<h/0.6;k++)G.cyl(g,M4.chain(M4.T(x,k*0.6,z),M4.S(0.085,0.04,0.085)),'#5a8034',{seg:8});
    for(let k=0;k<5;k++)G.blob(g,M4.chain(M4.T(x+(hash(i*9+k)-0.5)*0.8,h-0.4-k*0.5,z+(hash(i+k)-0.5)*0.6),M4.S(0.35,0.12,0.18)),'#5a9a3a',{seed:i*5+k,su:6,sv:3});}
  G.cyl(g,M4.chain(M4.T(-6.4,0,-1.5),M4.RZ(0.08),M4.S(0.16,2.6,0.16)),'#5a3a2a',{seg:10});for(let k=0;k<9;k++)G.blob(g,M4.chain(M4.T(-6.4+(hash(k)-0.5)*2.2,2.5+hash(k*3)*1.2,-1.5+(hash(k*7)-0.5)*1.8),M4.S(0.6+hash(k)*0.3)),['#f0a8c8','#e890b8','#f8c0d8'][k%3],{seed:k+60,j:0.2});
  // stone lantern
  const sl=(x,z)=>{B([x,0,z],[0.36,0.12,0.36],'#8a8680');G.cyl(g,M4.chain(M4.T(x,0.12,z),M4.S(0.09,0.7,0.09)),'#8a8680',{seg:10});B([x,0.82,z],[0.36,0.08,0.36],'#8a8680');B([x,0.9,z],[0.3,0.3,0.3],'#9a968e');B([x,1.2,z],[0.5,0.08,0.5],'#7a7670');G.cyl(g,M4.chain(M4.T(x,1.28,z),M4.S(0.2,0.14,0.2)),'#7a7670',{seg:10,rt:0.1});};
  sl(-4.8,-1.0);sl(3.2,4.2);S.stoneLanterns=[[-4.8,1.05,-1.0],[3.2,1.05,4.2]];
  // low bamboo fence on the sides
  for(const sd of [-1,1])for(let i=0;i<20;i++){const z=-2.6+i*0.55;G.cyl(g,M4.chain(M4.T(sd*7.4,0,z),M4.S(0.05,1.0+hash(i)*0.1,0.05)),'#b8a050',{seg:6});}
  // distant hills + far trees
  for(let i=0;i<9;i++)G.blob(g,M4.chain(M4.T(-40+i*10,-6,-60-hash(i)*10),M4.S(9+hash(i*3)*6,8+hash(i*5)*6,6)),'#4a6a5a',{seed:i+90,j:0.12});
  for(let i=0;i<30;i++){const x=-30+i*2.1,z=-16-hash(i)*6;G.blob(g,M4.chain(M4.T(x,1.8,z),M4.S(1.4,2.4+hash(i*3),1.4)),['#2e5a34','#3a6a3a'][i%2],{seed:i+120,j:0.15});}
  S.static.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  {const g=new Geo();
  // stepping stones path
  for(let i=0;i<9;i++){const x=0.4+Math.sin(i*0.7)*0.6,z=z0+2.4+i*0.8;G.sphere(g,M4.chain(M4.T(x,0,z),M4.RY(i*0.9),M4.S(0.42,0.09,0.34)),i%2?'#8e8a82':'#9a958c');}
  // moss patches
  for(let i=0;i<26;i++){const x=(hash(i*3)-0.5)*14,z=-2.6+hash(i*7)*12;if(Math.abs(x-0.6)<1&&z<4)continue;G.blob(g,M4.chain(M4.T(x,0.0,z),M4.S(0.35+hash(i)*0.4,0.05,0.3+hash(i*5)*0.3)),['#5a7a32','#4a6a2a','#6a8a3a'][i%3],{seed:i,j:0.15,su:8,sv:3});}
  // scattered petals & leaves
  for(let i=0;i<420;i++){const x=(hash(i*1.3)-0.5)*14,z=-3+hash(i*2.1)*12,a=hash(i)*TAU;const col=['#f4b0c8','#e88aa8','#8ab04a','#d8a040','#f8d0e0'][i%5];G.box(g,M4.chain(M4.T(x,0.005,z),M4.RY(a),M4.S(0.045,0.003,0.03)),col,{base:1});}
  S.static.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0,noShadow:1});}
  // ===== textured pieces
  S.groundTex=noiseTex(512,512,'#c8a272',[['#b08a5c',0.35,6],['#dcb88a',0.3,5],['#8a7058',0.25,2],['#e8cca0',0.2,3]],{n:2600});
  S.ground=planeMesh(80,80,26);
  // raked gravel garden texture
  const zc=mkCanvas(1024,1024),zg=zc.getContext('2d');zg.fillStyle='#d8d0c0';zg.fillRect(0,0,1024,1024);zg.strokeStyle='rgba(120,110,95,0.5)';zg.lineWidth=5;for(let r=40;r<720;r+=26){zg.beginPath();zg.arc(380,420,r,0,TAU);zg.stroke();}
  for(let i=0;i<5000;i++){zg.fillStyle=`rgba(${hash(i)>0.5?90:255},${hash(i)>0.5?85:250},${hash(i)>0.5?80:240},0.35)`;zg.fillRect(hash(i*3)*1024,hash(i*7)*1024,2,2);}
  S.zenTex=canvasTex(zc);S.zen=planeMesh(5.5,5.5,1);
  // tatami
  const tc=mkCanvas(512,256),tg=tc.getContext('2d');tg.fillStyle='#c8b878';tg.fillRect(0,0,512,256);tg.strokeStyle='rgba(120,100,50,0.35)';tg.lineWidth=2;for(let y=0;y<256;y+=5){tg.beginPath();tg.moveTo(0,y);tg.lineTo(512,y);tg.stroke();}tg.fillStyle='#2a3a6a';tg.fillRect(0,0,512,22);tg.fillRect(0,234,512,22);
  S.tatTex=canvasTex(tc);S.tat=planeMesh(1,1,1);
  // shoji paper panels (glowing)
  const pc=mkCanvas(256,512),pg=pc.getContext('2d');const pgr=pg.createLinearGradient(0,0,0,512);pgr.addColorStop(0,'#fff4dc');pgr.addColorStop(1,'#f0d8a8');pg.fillStyle=pgr;pg.fillRect(0,0,256,512);for(let i=0;i<300;i++){pg.fillStyle='rgba(200,170,120,0.08)';pg.fillRect(hash(i)*256,hash(i*3)*512,3,8);}
  S.paperTex=canvasTex(pc);const pgeo=new Geo();for(let i=0;i<12;i++){if(i===4||i===5)continue;const x=-6.4+i*1.16;G.box(pgeo,M4.chain(M4.T(x,0.6,S.shojiZ),M4.S(1.1,3.25,0.03)),[1,1,1],{base:1});}S.paper=mesh(pgeo);
  // hanging paper lanterns (emissive)
  const lgeo=new Geo();S.lanterns=[];for(const [x,z] of [[-4.2,-3.3],[1.0,-3.3],[5.4,-3.3]]){G.lathe(lgeo,M4.T(x,2.9,z),'#ffffff',[[0.001,0],[0.16,0.02],[0.26,0.18],[0.28,0.34],[0.26,0.5],[0.16,0.66],[0.001,0.68]],{seg:20});S.lanterns.push([x,3.24,z]);}
  S.lantern=mesh(lgeo);const lcap=new Geo();for(const [x,z] of [[-4.2,-3.3],[1.0,-3.3],[5.4,-3.3]]){G.cyl(lcap,M4.chain(M4.T(x,2.86,z),M4.S(0.17,0.06,0.17)),'#1a1a1a',{seg:14});G.cyl(lcap,M4.chain(M4.T(x,3.56,z),M4.S(0.17,0.06,0.17)),'#1a1a1a',{seg:14});G.cyl(lcap,M4.chain(M4.T(x,3.62,z),M4.S(0.012,0.5,0.012)),'#1a1a1a',{seg:6});
    for(let k=0;k<6;k++)G.cyl(lcap,M4.chain(M4.T(x,2.92+k*0.11,z),M4.S(0.255+Math.sin((k+0.5)/6*Math.PI)*0.03,0.008,0.255+Math.sin((k+0.5)/6*Math.PI)*0.03)),'#8a4a1a',{seg:20,caps:0});}S.lcap=mesh(lcap);
  return S;}
function courtyardDraws(R,S,mood){for(const s of S.static)R.draws.push(s);
  R.draws.push({mesh:S.ground,M:M4.id(),tex:S.groundTex,at:0,col:[1,1,1],rim:0});
  R.draws.push({mesh:S.zen,M:M4.T(-3.4,0.012,1.4),tex:S.zenTex,at:0,col:[1,1,1],rim:0});
  R.draws.push({mesh:S.tat,M:M4.chain(M4.T(S.tatami.p[0],S.tatami.p[1],S.tatami.p[2]),M4.S(S.tatami.s[0],1,S.tatami.s[1])),tex:S.tatTex,at:0,col:[1,1,1],rim:0});
  const night=mood==='night';R.draws.push({mesh:S.paper,M:M4.id(),tex:S.paperTex,at:0,col:[1,1,1],emis:night?[1.05,0.72,0.36]:[0.42,0.32,0.18],rim:0,noShadow:0});
  R.draws.push({mesh:S.lantern,M:M4.id(),col:[1,0.92,0.6],emis:night?[1.6,1.05,0.42]:[0.9,0.62,0.25],rim:0,noShadow:1});R.draws.push({mesh:S.lcap,M:M4.id(),col:[1,1,1],rim:0,noShadow:1});
  R.pts=S.lanterns.map(p=>[p[0],p[1],p[2],night?7:4.5,night?[1.4,0.85,0.35]:[0.7,0.45,0.2]]).concat(S.stoneLanterns.map(p=>[p[0],p[1],p[2],night?3.5:1.6,night?[1.2,0.7,0.3]:[0.4,0.25,0.1]]));
  if(night)R.pts.push([-1.2,1.6,-6.2,5,[1.2,0.7,0.3]]);}
const LIGHTS={
  golden:{sunDir:[-0.75,0.42,0.5],sunCol:[1.45,1.0,0.62],sky:[0.42,0.46,0.62],gnd:[0.5,0.36,0.26],fog:[0.98,0.78,0.58],fogD:0.004,fogH:0,skyTop:[0.32,0.5,0.86],skyHor:[1.0,0.78,0.55],skyBot:[0.8,0.6,0.45],cloud:0.7,sunSize:600,
    post:{bloom:0.22,thr:1.2,sat:1.28,expo:1.0,lift:[0.0,0.0,0.02],gain:[1.02,0.97,0.9],vig:1.0}},
  night:{sunDir:[0.4,0.6,0.35],sunCol:[0.32,0.4,0.72],sky:[0.16,0.18,0.36],gnd:[0.12,0.1,0.16],fog:[0.12,0.13,0.28],fogD:0.008,fogH:0,skyTop:[0.04,0.06,0.18],skyHor:[0.22,0.2,0.42],skyBot:[0.1,0.1,0.2],cloud:0.25,stars:1,sunGlow:[0.6,0.65,0.9],sunSize:2000,
    post:{bloom:0.55,thr:0.85,sat:1.2,expo:1.08,lift:[0.03,0.02,0.07],gain:[0.98,0.95,1.02],vig:1.0}},
};
