'use strict';
// ===================== Knockout · boxing arena (3D) =====================
// ring: mat top at y=1.0, inner square x -3.2..3.2, z -6.4..0 (centre z -3.2). The FRONT ropes (z=0) are NOT baked:
// they are drawn in 2D after the fighters (koRopesFront) so they are always correctly in front of them.
function koTex(){if(TX.kook)return;TX.kook=1;
  TX.mat=cvTex(1024,1024,(x,w,h)=>{x.fillStyle='#e9e6de';x.fillRect(0,0,w,h);speck(x,w,h,2500,['rgba(120,110,100,0.18)','rgba(255,255,255,0.4)'],3);
    // scuffs + faint stains
    for(let i=0;i<40;i++){x.fillStyle=`rgba(90,80,70,${0.04+hash(i)*0.05})`;x.beginPath();x.ellipse(hash(i*3)*w,hash(i*5)*h,30+hash(i*7)*90,10+hash(i*9)*30,hash(i)*3,0,TAU);x.fill();}
    // centre logo: red ring + gold star
    x.strokeStyle='#c8202a';x.lineWidth=34;x.beginPath();x.arc(w/2,h/2,190,0,TAU);x.stroke();x.strokeStyle='#1e3a8a';x.lineWidth=12;x.beginPath();x.arc(w/2,h/2,150,0,TAU);x.stroke();
    x.fillStyle='#e8b830';x.beginPath();for(let i=0;i<10;i++){const r=i%2?50:115,a=-Math.PI/2+i*Math.PI/5;x.lineTo(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r);}x.closePath();x.fill();
    // corner tint
    x.fillStyle='rgba(200,30,40,0.25)';x.beginPath();x.moveTo(0,0);x.lineTo(160,0);x.lineTo(0,160);x.fill();x.fillStyle='rgba(30,60,170,0.25)';x.beginPath();x.moveTo(w,h);x.lineTo(w-160,h);x.lineTo(w,h-160);x.fill();
    x.strokeStyle='rgba(0,0,0,0.25)';x.lineWidth=8;x.strokeRect(4,4,w-8,h-8);},{});
  TX.skirt=cvTex(1024,128,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#1c2c66');g.addColorStop(1,'#0e1638');x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle='#c8202a';x.fillRect(0,18,w,16);x.fillStyle='#e8b830';x.fillRect(0,38,w,5);
    for(let i=0;i<6;i++){x.fillStyle='#e8b830';x.beginPath();const cx=90+i*170,cy=82;for(let k=0;k<10;k++){const r=k%2?8:20,a=-Math.PI/2+k*Math.PI/5;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);}x.closePath();x.fill();}},{repeat:1});
  TX.arenaFloor=cvTex(512,512,(x,w,h)=>{x.fillStyle='#16161c';x.fillRect(0,0,w,h);speck(x,w,h,900,['rgba(255,255,255,0.05)','rgba(0,0,0,0.3)'],3);},{repeat:1});
}
function buildRing(){texInit();koTex();const g=new Geo(),lg=new Geo(),cr=new Geo(),D=[];
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-6),M4.S(60,1,60)),[1,1,1],{uv:12});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.arenaFloor,col:[1,1,1],rim:0});
  // platform + skirt
  const sk=new Geo();G.box(sk,M4.chain(M4.T(0,0,-3.2),M4.S(7.4,0.98,7.4)),[1,1,1],{base:1,uvs:[4,1]});D.push({mesh:mesh(sk),M:M4.id(),tex:TX.skirt,col:[1,1,1],rim:0.1});
  const mt=new Geo();G.plane(mt,M4.chain(M4.T(0,1.0,-3.2),M4.S(7.2,1,7.2)),[1,1,1]);D.push({mesh:mesh(mt),M:M4.id(),tex:TX.mat,col:[1,1,1],spec:0.4,rim:0});
  // apron edge trim + steps
  BX(g,[0,0.98,0.5],[7.5,0.04,0.12],'#e8b830');BX(g,[0,0.98,-6.9],[7.5,0.04,0.12],'#e8b830');
  for(let i=0;i<3;i++)BX(g,[-4.1,0,-0.6-i*0.0],[0.6,0.3+i*0.3,0.8-i*0.2],'#3a3a44');
  // corner posts + pads (red NE, blue SW, neutral white)
  const posts=[[-3.2,-6.4,'#c8202a'],[3.2,-6.4,'#f2f2f2'],[3.2,0,'#1e48c0'],[-3.2,0,'#f2f2f2']];
  for(const [x,z,col] of posts){G.cyl(g,M4.chain(M4.T(x,0.98,z),M4.S(0.09,1.55,0.09)),'#c8ccd4',{seg:12});BX(g,[x,1.38,z],[0.28,1.05,0.28],col);G.cyl(g,M4.chain(M4.T(x,2.5,z),M4.S(0.12,0.06,0.12)),'#8a8e96',{seg:12});}
  // ropes: back, left, right sides (front side is drawn in 2D). red top / white / blue bottom
  const RC=['#d8202a','#f4f4f4','#2048c8'],RH=[1.45,1.1,0.78];
  for(let i=0;i<3;i++){const y=1.0+RH[i]*0.95;BX(g,[0,y,-6.4],[6.4,0.06,0.06],RC[i]);for(const sx of [-1,1])BX(g,[sx*3.2,y,-3.2],[0.06,0.06,6.4],RC[i]);}
  // rope ties (vertical straps) on the sides
  for(const sx of [-1,1])for(const z of [-2.1,-4.3])BX(g,[sx*3.2,1.62,z],[0.07,1.35,0.07],'#f4f4f4');for(const x of [-1.07,1.07])BX(g,[x,1.62,-6.4],[0.07,1.35,0.07],'#f4f4f4');
  // ringside: judges' tables + press row
  for(const [x,z,ry] of [[0,-8.2,0],[-5.2,-3.2,Math.PI/2],[5.2,-3.2,Math.PI/2]]){BX(g,[x,0,z],[ry?0.9:3.6,0.78,ry?3.6:0.9],'#26262e',{ry:0});BX(g,[x,0.78,z],[ry?1.0:3.8,0.05,ry?3.8:1.0],'#3a3a46');}
  // tiered stands on three sides, filled with a crowd
  const tiers=6;for(let k=0;k<tiers;k++){const y=k*0.55,d=10+k*1.1;BX(cr,[0,0,-3.2-d],[30,y+0.55,1.1],'#24242c');for(const sx of [-1,1])BX(cr,[sx*(d),0,-3.2],[1.1,y+0.55,30],'#24242c');}
  D.push({mesh:mesh(cr),M:M4.id(),col:[1,1,1],rim:0.05});
  const pp2=new Geo();const tops=['#8a2a2a','#2a4a8a','#d8d8d8','#3a6a3a','#c8a040','#5a3a6a','#2a2a2a','#a85a2a'],skins=['#f2d2b8','#d8a882','#9a6a48','#5a3a26'];
  let n=0;for(let k=0;k<tiers;k++){const y=k*0.55+0.55,d=10+k*1.1;
    const seat=(x,z,i)=>{const s=0.85+hash(i)*0.25;G.box(pp2,M4.chain(M4.T(x,y,z),M4.S(0.42*s,0.6*s,0.3)),tops[i%tops.length],{base:1});G.sphere(pp2,M4.chain(M4.T(x,y+0.6*s+0.13,z),M4.S(0.15,0.17,0.15)),skins[(i*7)%4],{su:8,sv:6});};
    for(let x=-13;x<=13;x+=0.62){n++;if(hash(n*1.3)<0.12)continue;seat(x+(hash(n)-0.5)*0.15,-3.2-d,n);}
    for(const sx of [-1,1])for(let z=-14;z<=6;z+=0.62){n++;if(hash(n*1.7)<0.12)continue;seat(sx*d,z+(hash(n)-0.5)*0.15,n);}}
  D.push({mesh:mesh(pp2),M:M4.id(),col:[0.7,0.7,0.75],rim:0.15});
  // lighting rig over the ring: square truss + 8 big lamps (emissive)
  for(const [a,b,c2,d2] of [[-3.6,-6.8,3.6,-6.8],[-3.6,0.4,3.6,0.4]])BX(g,[0,6.6,a===-3.6?b:0],[7.4,0.25,0.25],'#2a2a30');
  BX(g,[-3.6,6.6,-3.2],[0.25,0.25,7.4],'#2a2a30');BX(g,[3.6,6.6,-3.2],[0.25,0.25,7.4],'#2a2a30');
  for(const x of [-2.4,-0.8,0.8,2.4])for(const z of [-6.8,0.4]){G.cyl(g,M4.chain(M4.T(x,6.1,z),M4.S(0.28,0.5,0.28)),'#1a1a1e',{seg:12});G.cyl(lg,M4.chain(M4.T(x,6.08,z),M4.S(0.24,0.03,0.24)),'#ffffff',{seg:12});}
  // hanging scoreboard cube
  BX(g,[0,7.4,-3.2],[2.4,1.4,2.4],'#18181e');for(const z of [-2.0,-4.4])BX(lg,[0,7.6,z],[2.0,1.0,0.02],'#ffffff');
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.95,0.85],emis:[2.4,2.3,2.1],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14,spec:0.6});
  return {D,pts:[[0,5.5,-3.2,9,[2.2,2.1,2.0]],[-2.5,5,-1,6,[1.0,0.95,0.9]],[2.5,5,-5,6,[1.0,0.95,0.9]]]};}
LIGHT5.arena={sunDir:[0.18,0.95,0.3],sunCol:[1.25,1.2,1.12],sky:[0.16,0.16,0.22],gnd:[0.12,0.12,0.16],fog:[0.04,0.04,0.08],fogD:0.045,fogH:0,skyTop:[0.02,0.02,0.05],skyHor:[0.05,0.05,0.1],skyBot:[0.02,0.02,0.04],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.7,thr:0.8,sat:1.15,expo:1.1,lift:[0.0,0.0,0.02],gain:[1.05,1.0,0.98],vig:1.45,ink:1}};
{const _gs=getSet;getSet=function(k){if(k==='ring')return SETS.ring||(SETS.ring=buildRing());return _gs(k);};}
PL.length=0;
PL.push(
 ['ring_wide','ring','arena',[0.4,3.1,7.0],[0,1.7,-3.2],50],
 ['ring_in','ring','arena',[0.6,2.15,-0.5],[0,1.85,-4.4],46],
 ['ring_low','ring','arena',[0.9,1.4,-0.9],[0,2.15,-4.4],52],
 ['ring_corner','ring','arena',[2.0,2.2,-1.2],[-1.6,1.7,-5.2],48],
 ['ring_top','ring','arena',[0.9,5.7,0.3],[0.6,1.0,-5.0],52]);
