'use strict';
// ===================== Great Molasses Flood · 3D set: Boston North End, Commercial Street, 1919 =====================
// street along x; far side tenements at z=-8; elevated railway over the street; the 50-ft molasses tank behind the warehouses at (-14,0,-22)
function buildNorthEnd(){texInit();const g=new Geo(),D=[];
  TX.cob2=TX.cob2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#5a544c';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let k=0;k<12;k++){const ox=(r%2)*21,v=hash(r*12+k);x.fillStyle=`rgb(${100+v*40|0},${94+v*34|0},${86+v*28|0})`;x.beginPath();x.ellipse(k*43+ox+(hash(r*5+k)-0.5)*6,r*32+16,18+hash(k*3+r)*4,12+hash(r*7+k)*3,(hash(r+k*9)-0.5)*0.4,0,TAU);x.fill();x.fillStyle='rgba(255,250,235,0.15)';x.beginPath();x.ellipse(k*43+ox-5,r*32+11,8,4,0,0,TAU);x.fill();}},{repeat:1});
  TX.brick2=TX.brick2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#5a3a30';x.fillRect(0,0,w,h);for(let r=0;r<22;r++)for(let k=0;k<9;k++){const ox=(r%2)*30,v=hash(r*9+k);x.fillStyle=`rgb(${140+v*40|0},${70+v*20|0},${54+v*16|0})`;x.fillRect(k*60+ox-30+2,r*23.3+2,56,19);}speck(x,w,h,900,['rgba(0,0,0,0.22)','rgba(255,220,200,0.06)'],2);},{repeat:1});
  TX.tank=TX.tank||cvTex(1024,512,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#6a5446');gr.addColorStop(1,'#4a3a30');x.fillStyle=gr;x.fillRect(0,0,w,h);
    for(let r=1;r<7;r++){const y=r*h/7;x.fillStyle='rgba(20,14,10,0.6)';x.fillRect(0,y-2,w,4);x.fillStyle='rgba(30,22,16,0.9)';for(let k=0;k<w;k+=10){x.beginPath();x.arc(k,y-7,2.4,0,TAU);x.arc(k+5,y+7,2.4,0,TAU);x.fill();}}
    for(let k=0;k<w;k+=128){x.fillStyle='rgba(20,14,10,0.55)';x.fillRect(k,0,3,h);}
    for(let i=0;i<26;i++){const px=hash(i*3.1)*w,py=hash(i*5.7)*h*0.9;const gg=x.createLinearGradient(px,py,px,py+60+hash(i)*140);gg.addColorStop(0,'rgba(60,30,10,0.75)');gg.addColorStop(1,'rgba(60,30,10,0)');x.fillStyle=gg;x.fillRect(px-3,py,6+hash(i*2)*6,60+hash(i)*140);}},{repeat:0});
  const st=new Geo();G.plane(st,M4.chain(M4.T(0,0,0),M4.S(120,1,60)),[1,1,1],{uv:70});D.push({mesh:mesh(st),M:M4.id(),tex:TX.cob2,col:[1,1,1],spec:0.6,rim:0});
  for(const z of [-6.0,6.5])BX(g,[0,0,z],[120,0.16,2.6],'#8a8278');
  // far-side tenements: 4-5 storeys, brick, sash windows, shopfronts with awnings, cornices
  const bz=-7.6;const fa=new Geo();let x0=-10;let bi=0;while(x0<50){const wdt=7+hash(bi*3.1)*5,ht=11+hash(bi*1.7)*6;G.box(fa,M4.chain(M4.T(x0+wdt/2,0,bz),M4.S(wdt-0.15,ht,0.6)),[1,1,1],{base:1});
    BX(g,[x0+wdt/2,ht,bz+0.15],[wdt,0.45,0.9],'#4a3a30');const nf=Math.floor((ht-3.5)/2.6);
    for(let f=0;f<nf;f++)for(let k=0;k<Math.floor(wdt/1.7);k++){const wx=x0+0.9+k*1.7,wy=4+f*2.6;BX(g,[wx,wy,bz+0.31],[0.85,1.4,0.04],'#1e2028');BX(g,[wx,wy+1.4,bz+0.34],[1.0,0.12,0.1],'#d8d0c0');BX(g,[wx,wy-0.06,bz+0.34],[1.0,0.1,0.12],'#d8d0c0');BX(g,[wx,wy+0.66,bz+0.33],[0.85,0.05,0.02],'#e8e0d0');}
    BX(g,[x0+wdt/2,0,bz+0.32],[wdt*0.8,2.8,0.04],'#2a3a34');BX(g,[x0+wdt/2-wdt*0.25,0,bz+0.35],[1.0,2.3,0.04],'#5a3a24');BX(g,[x0+wdt/2+wdt*0.15,0.8,bz+0.34],[wdt*0.35,1.6,0.03],'#c8d8e0');
    BX(g,[x0+wdt/2,2.9,bz+0.9],[wdt*0.85,0.06,1.4],bi%3===0?'#7a2a2a':bi%3===1?'#2a5a3a':'#d8c8a0',{rx:-0.3});
    x0+=wdt;bi++;}
  D.push({mesh:mesh(fa),M:M4.id(),tex:TX.brick2,col:[1,1,1],rim:0});
  // elevated railway: two riveted box girders over the street on lattice steel columns with cross-beams
  const el=new Geo(),EC='#3e4a44';for(const z of [-1.5,1.5]){BX(el,[24,5.6,z],[72,0.9,0.4],EC);BX(el,[24,6.5,z],[72,0.08,0.7],'#2a3430');for(let x=-11;x<=59;x+=1.2)BX(el,[x,5.62,z+(z<0?-0.21:0.21)],[0.06,0.86,0.02],'#2e3a34');}
  BX(el,[24,6.6,0],[72,0.2,3.6],'#2a2420');for(let x=-11;x<=59;x+=0.7)BX(el,[x,6.8,0],[0.18,0.08,3.4],'#4a3a2a');for(const z of [-0.6,0.6])BX(el,[24,6.88,z],[72,0.06,0.08],'#8a8a86');
  for(let x=-8;x<=56;x+=8){for(const z of [-3.0,3.0]){BX(el,[x,0,z],[0.36,5.6,0.36],EC);for(let y=0.4;y<5.4;y+=0.9)BX(el,[x,y,z],[0.38,0.06,0.38],'#2e3a34');}BX(el,[x,5.2,0],[0.3,0.5,6.3],EC);
    for(const s of [-1,1])BX(el,[x+s*0.9,4.6,-3],[0.12,1.6,0.12],EC,{rz:s*0.6});}
  D.push({mesh:mesh(el),M:M4.id(),col:[1,1,1],spec:1.0,rim:0.35});
  // low warehouses between street and tank
  for(const [x,z,w,h] of [[-30,10,12,6],[-48,-6,10,8],[-14,-30,14,6]])BX(g,[x,0,z],[w,h,6],'#6a5040');
  // THE TANK: 15 m tall, 27 m wide, riveted steel plates, brown paint over leaks, shallow conical roof, catwalk + ladder
  const tk=new Geo();G.cyl(tk,M4.chain(M4.T(-30,0,-10),M4.S(13.5,15,13.5)),[1,1,1],{seg:56});D.push({mesh:mesh(tk),M:M4.id(),tex:TX.tank,col:[1,1,1],spec:1.0,rim:0.35});
  G.lathe(g,M4.chain(M4.T(-30,15,-10)),'#4a3a30',[[0.001,2.0],[13.7,0.0],[13.7,-0.2],[0.001,-0.2]],{seg:56});
  for(let y=0.5;y<15;y+=0.6)BX(g,[-30+13.6*Math.cos(0.5),y,-10+13.6*Math.sin(0.5)],[0.5,0.06,0.06],'#2a2420',{ry:-0.5});
  // the Old North Church steeple in the distance, harbour cranes, a lamp post or two
  BX(g,[18,0,-46],[4,12,4],'#a8584a');BX(g,[18,12,-46],[3,4,3],'#e8e4dc');G.lathe(g,M4.chain(M4.T(18,16,-46)),'#e8e4dc',[[0.001,7],[1.6,0],[0.001,0]],{seg:8});
  for(const lx of [-9,7,23]){G.cyl(g,M4.chain(M4.T(lx,0.16,-4.9),M4.S(0.07,3.4,0.07)),'#1a1c20',{seg:10});G.sphere(g,M4.chain(M4.T(lx,3.7,-4.9),M4.S(0.22,0.3,0.22)),'#e8e0c0');}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.8});
  return {D,pts:[]};}
LIGHT5.winterDay={sunDir:[-0.5,0.5,0.55],sunCol:[1.45,1.25,1.0],sky:[0.52,0.58,0.74],gnd:[0.42,0.4,0.36],fog:[0.82,0.86,0.94],fogD:0.006,fogH:0,skyTop:[0.32,0.5,0.86],skyHor:[0.88,0.9,0.94],skyBot:[0.7,0.7,0.72],cloud:0.5,stars:0,sunSize:900,sunGlow:[1.0,0.9,0.7],
  post:{bloom:0.2,thr:1.2,sat:1.12,expo:1.0,lift:[0,0,0.02],gain:[1,0.98,0.96],vig:0.9,ink:1}};
{const _gm=getSet;getSet=function(k){if(k==='northend')return SETS.northend||(SETS.northend=buildNorthEnd());return _gm(k);};}
PL.length=0;
PL.push(
 ['ne_wide','northend','winterDay',[16,1.7,6],[-22,6.5,-4],56],
 ['ne_street','northend','winterDay',[20,1.6,0.6],[-20,3.5,-3],46],
 ['ne_tank','northend','winterDay',[-4,1.6,16],[-30,9.5,-10],62],
 ['ne_flood','northend','winterDay',[5,2.6,9.5],[-4,0.9,-0.6],38],
 ['ne_low','northend','winterDay',[14,0.5,4.5],[-10,2.2,-2],40],
);
