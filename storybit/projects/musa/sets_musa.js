'use strict';
// ===================== Mansa Musa, 1324 · desert route, Cairo walls + skyline, the souk, Timbuktu mosque, Al-Umari's study =====================
function shdM(h,k){const n=parseInt(h.slice(1),16);const f=v=>Math.max(0,Math.min(255,Math.round(v*(1+k))));return '#'+[n>>16,(n>>8)&255,n&255].map(v=>f(v).toString(16).padStart(2,'0')).join('');}
function sandTex(){return TX.sand2=TX.sand2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#d6ab72';x.fillRect(0,0,w,h);speck(x,w,h,4000,['rgba(150,100,50,0.25)','rgba(255,236,200,0.3)'],2);
  x.strokeStyle='rgba(140,96,50,0.18)';x.lineWidth=2;for(let i=0;i<46;i++){x.beginPath();const y0=i*11+hash(i)*6;for(let k=0;k<=32;k++){const px=k*16,py=y0+Math.sin(k*0.7+i)*4;k?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}},{repeat:1});}
function mudTex(){return TX.mud=TX.mud||cvTex(512,512,(x,w,h)=>{x.fillStyle='#b67a4a';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(90,50,20,0.3)','rgba(240,200,150,0.25)'],3);
  for(let i=0;i<60;i++){x.fillStyle=`rgba(${hash(i)>0.5?'80,44,20':'230,190,140'},0.12)`;x.fillRect(hash(i*3)*w,0,3+hash(i*5)*10,h);}},{repeat:1});}
function stoneTex(){return TX.lime=TX.lime||cvTex(512,512,(x,w,h)=>{x.fillStyle='#d8c29a';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(120,100,70,0.25)','rgba(255,245,220,0.25)'],2);
  x.strokeStyle='rgba(110,90,60,0.45)';x.lineWidth=2;for(let r=0;r<16;r++){x.beginPath();x.moveTo(0,r*32);x.lineTo(w,r*32);x.stroke();for(let k=0;k<8;k++){const xx=(k*64+(r%2)*32)%w;x.beginPath();x.moveTo(xx,r*32);x.lineTo(xx,r*32+32);x.stroke();}}},{repeat:1});}
function stripeTex(a,b){const k='str'+a+b;return TX[k]=TX[k]||cvTex(128,128,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?a:b;x.fillRect(i*16,0,16,h);}speck(x,w,h,300,['rgba(0,0,0,0.15)'],2);},{});}
function dirtTex(){return TX.dirt3=TX.dirt3||cvTex(512,512,(x,w,h)=>{x.fillStyle='#a8865c';x.fillRect(0,0,w,h);speck(x,w,h,4000,['rgba(70,50,30,0.3)','rgba(230,210,170,0.25)'],2);},{repeat:1});}
const TEXD=(g,tex,o={})=>({mesh:mesh(g),M:M4.id(),tex,col:o.col||[1,1,1],rim:o.rim??0.25,spec:o.spec??0.3});
// ---- architecture helpers
function palm(g,x,y,z,h,seed=0){const lean=(hash(seed*3.1)-0.5)*0.25;G.cyl(g,M4.chain(M4.T(x,y,z),M4.RZ(-lean),M4.S(0.26,h,0.26)),'#6e5034',{seg:10,rt:0.7});for(let k=1;k<10;k++){const y0=k*h/10;G.cyl(g,M4.chain(M4.T(x+lean*y0,y+y0,z),M4.S(0.25-k*0.007,0.08,0.25-k*0.007)),'#5a3e26',{seg:10});}
  const tx=x+lean*h,ty=y+h;for(let k=0;k<11;k++){const a=k/11*TAU+seed,dr=0.35+hash(seed+k)*0.4;let px=tx,py=ty,pz=z;for(let s=0;s<4;s++){const L=0.9;const nx=px+Math.cos(a)*L,ny=py+0.35-s*dr*0.45,nz=pz+Math.sin(a)*L;
      G.sphere(g,M4.chain(M4.T((px+nx)/2,(py+ny)/2,(pz+nz)/2),M4.RY(-a),M4.RZ(Math.atan2(ny-py,L)),M4.S(0.55,0.06,0.34-s*0.05)),['#4a6a2a','#557832','#3e5c24'][(k+s)%3],{su:8,sv:4});px=nx;py=ny;pz=nz;}}
  for(let k=0;k<5;k++)G.sphere(g,M4.chain(M4.T(tx+Math.cos(k*1.3)*0.25,ty-0.3,z+Math.sin(k*1.3)*0.25),M4.S(0.14,0.2,0.14)),'#c8781e',{su:6,sv:4});}
function minaret(g,x,y,z,h,col='#dcc8a2'){const d=col,dk='#b8a47e';BX(g,[x,y,z],[3.2,h*0.34,3.2],d);BX(g,[x,y+h*0.34,z],[3.8,0.35,3.8],dk);
  G.cyl(g,M4.chain(M4.T(x,y+h*0.34,z),M4.S(1.45,h*0.3,1.45)),d,{seg:8});G.cyl(g,M4.chain(M4.T(x,y+h*0.64,z),M4.S(2.05,0.3,2.05)),dk,{seg:8});for(let k=0;k<16;k++){const a=k/16*TAU;BX(g,[x+Math.cos(a)*1.95,y+h*0.64+0.3,z+Math.sin(a)*1.95],[0.12,0.7,0.12],dk);}
  G.cyl(g,M4.chain(M4.T(x,y+h*0.64,z),M4.S(1.1,h*0.2,1.1)),d,{seg:16});G.cyl(g,M4.chain(M4.T(x,y+h*0.84,z),M4.S(1.6,0.25,1.6)),dk,{seg:16});
  for(let k=0;k<8;k++){const a=k/8*TAU;G.cyl(g,M4.chain(M4.T(x+Math.cos(a)*0.75,y+h*0.84,z+Math.sin(a)*0.75),M4.S(0.1,h*0.07,0.1)),d,{seg:6});}
  G.lathe(g,M4.chain(M4.T(x,y+h*0.91,z)),d,[[0.001,h*0.09],[0.4,h*0.07],[0.9,h*0.035],[0.95,0.2],[0.9,0]],{seg:16});G.cyl(g,M4.chain(M4.T(x,y+h,z),M4.S(0.06,1.2,0.06)),'#8a7a52',{seg:6});
  G.sphere(g,M4.chain(M4.T(x,y+h+0.9,z),M4.S(0.16,0.16,0.16)),'#c8a040',{su:8,sv:6});
  for(let k=0;k<4;k++)BX(g,[x+[1.61,-1.61,0,0][k],y+h*0.2,z+[0,0,1.61,-1.61][k]],[k<2?0.06:0.5,1.1,k<2?0.5:0.06],'#2a2018');}
function domeOn(g,x,y,z,r,col='#d8c49c'){G.cyl(g,M4.chain(M4.T(x,y,z),M4.S(r*1.02,r*0.55,r*1.02)),col,{seg:20});G.lathe(g,M4.chain(M4.T(x,y+r*0.55,z)),col,[[0.001,r*1.15],[r*0.35,r*1.0],[r*0.75,r*0.7],[r*0.98,r*0.28],[r,0]],{seg:22});
  G.cyl(g,M4.chain(M4.T(x,y+r*1.7,z),M4.S(0.05,0.9,0.05)),'#8a7a52',{seg:6});}
function house(g,x,y,z,w,d,h,col,o={}){BX(g,[x,y,z],[w,h,d],col);BX(g,[x,y+h,z],[w+0.15,0.3,d+0.15],shdM(col,-0.08));
  if(o.win!==false){const fz=z+d/2+0.01,n=Math.max(1,Math.floor(w/2.6));for(let i=0;i<n;i++){const wx=x-w/2+(i+0.5)*w/n;for(let f=1;f<h/3.2;f++){if(hash(x+i*7+f*3)>0.75)continue;BX(g,[wx,y+f*3.1-0.4,fz],[0.7,1.1,0.06],'#2a1e16');}}
    if(o.mash&&h>6)BX(g,[x+(hash(x)-0.5)*w*0.4,y+h*0.55,z+d/2+0.45],[1.6,1.8,0.9],'#6a4426');}}
function acacia(g,x,y,z,h,seed){G.cyl(g,M4.chain(M4.T(x,y,z),M4.RZ(0.15),M4.S(0.18,h*0.7,0.18)),'#5a4430',{seg:7});for(let k=0;k<16;k++){const a=hash(seed+k)*TAU,r=hash(seed*3+k)*h*0.55;G.sphere(g,M4.chain(M4.T(x+Math.cos(a)*r+h*0.1,y+h*0.72+hash(k+seed*5)*0.4,z+Math.sin(a)*r),M4.S(h*0.22,h*0.06,h*0.22)),['#5a6a2a','#4a5c22','#66742e'][k%3],{su:8,sv:5});}}
// ---------------- desert route: dunes, rock outcrops, the caravan track along x ----------------
function buildDesert(){texInit();const D=[],g=new Geo();
  const H=(x,z)=>{const fl=clamp((Math.abs(z)-7)/26);const v=fbm2(x*1.3,z*1.3);const crest=Math.pow(Math.abs(Math.sin(x*0.035+z*0.018+v*0.6)),2.2);return fl*(crest*(7+fl*12)+v*2.2)+0.15*Math.sin(x*0.08);};
  terrainMesh(D,{size:420,cell:3,cx:0,cz:0,h:H,uv:0.06,tex:sandTex(),col:(x,z)=>{const y=H(x,z);return y>5?'#f4dcb0':y>2.5?'#ead0a2':'#e0c494';}});
  ridges(g,240,22,11,['#a8704a','#b87e52','#9a643e']);
  for(let i=0;i<12;i++){const x=-150+hash(i*3.7)*300,z=(hash(i*5.1)>0.5?1:-1)*(30+hash(i*2.3)*80);acacia(g,x,H(x,z),z,3+hash(i)*2.5,i*7);}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.2});return {D,pts:[]};}
// ---------------- Cairo from outside the walls: gate towers, crenellated wall, domes, minarets, palms, the citadel, pyramids far off ----------------
function buildCairo(o={}){texInit();const D=[],g=new Geo(),st=new Geo(),sd=new Geo();
  G.plane(sd,M4.S(600,1,600),[1,1,1],{uv:120});D.push(TEXD(sd,sandTex(),{rim:0,spec:0.15,col:[0.82,0.74,0.62]}));
  const rd=new Geo();G.plane(rd,M4.chain(M4.T(0,0.02,30),M4.S(9,1,110)),[1,1,1],{uv:12});D.push(TEXD(rd,dirtTex(),{rim:0,spec:0.1}));
  const WZ=-24;// city wall with crenellations, two drum towers flanking the gate
  for(const [x0,x1] of [[-110,-8],[8,110]]){BX(st,[(x0+x1)/2,0,WZ],[x1-x0,10,3],'#d6be94');for(let x=x0+0.8;x<x1;x+=1.8)BX(g,[x,10,WZ+1.2],[0.9,1.1,0.6],'#cdb690');for(let x=x0+12;x<x1;x+=24){G.cyl(st,M4.chain(M4.T(x,0,WZ+1.2),M4.S(3.4,12.5,3.4)),'#d6be94',{seg:20});}}
  for(const s of [-1,1]){G.cyl(st,M4.chain(M4.T(s*6.5,0,WZ+1.5),M4.S(4.4,16,4.4)),'#d6be94',{seg:24});for(let k=0;k<14;k++){const a=k/14*TAU;BX(g,[s*6.5+Math.cos(a)*4.1,16,WZ+1.5+Math.sin(a)*4.1],[0.9,1.2,0.6],'#cdb690',{ry:-a});}
    for(let f=0;f<3;f++)BX(g,[s*6.5,4+f*4,WZ+5.85],[0.35,1.4,0.1],'#1e1610');for(let b=0;b<7;b++)G.cyl(g,M4.chain(M4.T(s*6.5,2+b*2,WZ+1.5),M4.S(4.43,0.5,4.43)),b%2?'#a8583a':'#c89a6a',{seg:24});}
  for(let b=0;b<4;b++)BX(g,[0,1.5+b*2.6,WZ+1.62],[9.1,0.45,0.08],b%2?'#a8583a':'#bc8a5a');
  BX(st,[0,0,WZ],[9,9,3.2],'#d6be94');BX(st,[0,9,WZ],[9,3,3.2],'#d6be94');// gate block
  BX(g,[0,0,WZ+1.62],[4.2,6.4,0.1],'#18120c');G.cyl(g,M4.chain(M4.T(0,6.4,WZ+1.6),M4.RX(Math.PI/2),M4.S(2.1,0.12,2.1)),'#18120c',{seg:20});
  BX(g,[0,0,WZ+1.7],[5.4,0.2,0.2],'#a89068');G.cyl(g,M4.chain(M4.T(0,6.4,WZ+1.7),M4.RX(Math.PI/2),M4.S(2.7,0.14,2.7)),'#b8a078',{seg:20});
  for(let k=0;k<7;k++)BX(g,[-3+k,8.6,WZ+1.7],[0.5,0.5,0.15],k%2?'#a8402a':'#e8dcc0');
  D.push({mesh:mesh(st),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.35});
  // the city behind: dense flat-roofed houses, domes, minarets of many heights
  const cols=['#d8c29a','#cfb58a','#e0cca6','#c4a87c','#d4b890'];
  for(let i=0;i<220;i++){const x=-110+hash(i*1.7)*220,z=WZ-6-hash(i*2.9)*120;const w=5+hash(i*3.3)*7,dd=5+hash(i*4.4)*6,h=6+hash(i*5.5)*9+(Math.abs(x)<30?3:0);house(g,x,0,z,w,dd,h,cols[i%5],{mash:1});}
  for(const [x,z,r] of [[-26,-48,5],[18,-60,6.5],[-58,-80,7],[44,-44,4.5],[2,-96,8],[-12,-70,4],[72,-70,5]])domeOn(g,x,12+r*0.3,z,r,'#e0ccA4'.toLowerCase());
  for(const [x,z,h] of [[-14,-40,34],[24,-52,40],[-40,-66,30],[52,-58,36],[8,-88,44],[-70,-92,32],[-30,-110,38],[34,-100,30],[86,-84,34]])minaret(g,x,0,z,h);
  // citadel on its ridge (right), sandy hills behind
  G.sphere(g,M4.chain(M4.T(95,-6,-130),M4.S(60,22,30)),'#b8946a',{su:20,sv:10});BX(g,[95,12,-128],[40,10,20],'#cdb690');for(let x=78;x<114;x+=8)G.cyl(g,M4.chain(M4.T(x,12,-118),M4.S(2.6,13,2.6)),'#cdb690',{seg:14});
  // pyramids of Giza on the far western horizon (scaled into fog range)
  for(const [x,z,s] of [[-190,-200,40],[-150,-215,36],[-122,-226,20]]){G.lathe(g,M4.chain(M4.T(x,0,z),M4.RY(0.3)),'#d4b484',[[0.001,s],[s*0.98,0]],{seg:4});}
  ridges(g,300,18,5,['#c09a6a','#b48c5c','#a88050']);
  // outside the walls: date palms along the road, a well, a few tents
  if(!o.noPalms)for(let i=0;i<26;i++){const x=(i%2?1:-1)*(7+hash(i*3)*14)+(hash(i)-0.5)*4,z=WZ+8+i*3.4+hash(i*7)*2;palm(g,x,0,z,6+hash(i*5)*4,i);}
  if(!o.noPalms)for(let i=0;i<14;i++){const x=-80+hash(i*9.3)*60*(i%2?1:-1)+(i%2?60:0),z=WZ+14+hash(i*6.1)*40;if(Math.abs(x)<14)continue;palm(g,x,0,z,7+hash(i*2)*4,i+40);}
  G.cyl(g,M4.chain(M4.T(14,0,0),M4.S(1.4,0.9,1.4)),'#b8a078',{seg:16});
  for(let i=0;i<5;i++){const x=-40-i*9,z=10+hash(i)*10;G.lathe(g,M4.chain(M4.T(x,0,z)),i%2?'#e8e0d0':'#8a5a3a',[[0.001,2.6],[2.4,0.4],[2.6,0]],{seg:6});}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.35});return {D,pts:[]};}
// ---------------- the souk: a narrow street of shops, awnings, cloth canopies, lanterns, goods ----------------
function buildSouk(){texInit();const D=[],g=new Geo(),aw=new Geo(),ss=new Geo();
  const gr=new Geo();G.plane(gr,M4.chain(M4.T(0,0,-20),M4.S(40,1,140)),[1,1,1],{uv:14});D.push(TEXD(gr,dirtTex(),{rim:0,spec:0.2}));
  const cols=['#d4b890','#c8a878','#dcc6a0','#bc9c70'];
  for(const s of [-1,1])for(let i=0;i<14;i++){const z=14-i*5.2,h=8+hash(i*3+s)*5,x=s*(3.4+2.5);const col=cols[(i+(s>0?1:0))%4];
    BX(g,[x,0,z],[5,h,5],col);BX(g,[x,h,z],[5.15,0.3,5.15],shdM(col,-0.1));
    BX(g,[s*3.38,0,z],[0.06,3.4,3.6],'#2a1c12');// dark shop opening
    G.cyl(g,M4.chain(M4.T(s*3.36,3.4,z),M4.RZ(Math.PI/2),M4.S(1.8,0.1,1.8)),'#2a1c12',{seg:16});
    BX(g,[s*3.0,0,z],[0.8,1.0,3.4],'#7a5434');BX(g,[s*2.95,1.0,z],[0.95,0.08,3.6],'#5a3c24');// counter
    for(let k=0;k<4;k++){const gz=z-1.3+k*0.85,gx=s*2.95,kind=Math.floor(hash(i*11+k+s*5)*4);
      if(kind===0)G.cyl(g,M4.chain(M4.T(gx,1.08,gz),M4.S(0.3,0.36,0.3)),['#c8401e','#e8a020','#7a8a2a','#a85a20'][k],{seg:12,rt:0.05});
      else if(kind===1)G.lathe(g,M4.chain(M4.T(gx,1.08,gz)),'#b8643a',[[0.001,0.55],[0.1,0.5],[0.08,0.42],[0.24,0.22],[0.14,0]],{seg:12});
      else if(kind===2){G.cyl(g,M4.chain(M4.T(gx,1.08,gz),M4.S(0.3,0.25,0.3)),'#b89860',{seg:12});G.sphere(g,M4.chain(M4.T(gx,1.33,gz),M4.S(0.27,0.1,0.27)),['#e8d8a0','#5a3a20','#e0b040'][k%3],{su:10,sv:6});}
      else BX(g,[gx,1.08,gz],[0.5,0.2,0.6],['#8a2a2a','#2a4a7a','#c8a040'][k%3]);}
    // slanted awning over the shop, striped cloth
    G.plane(aw,M4.chain(M4.T(s*2.6,3.9,z),M4.RZ(-s*0.42),M4.S(1.8,1,4.4)),[1,1,1],{uv:1});
    // upper floor: mashrabiya bay + small windows
    if(hash(i*7+s)>0.35){BX(g,[s*3.0,5.0,z],[0.9,2.2,2.2],'#5e3c22');for(let k=0;k<5;k++)BX(g,[s*2.54,5.2+k*0.4,z],[0.05,0.05,2.0],'#2a1a10');}
    BX(g,[s*3.38,h-2.4,z+1.6],[0.06,1.0,0.6],'#2a1e16');
    // hanging carpets on some shop fronts
    if(hash(i*13+s)>0.6)G.plane(ss,M4.chain(M4.T(s*3.3,2.0,z+1.95),M4.RZ(s*Math.PI/2),M4.S(1.8,1,1.0)),[1,1,1],{uv:1});}
  D.push(TEXD(aw,stripeTex('#b83a2a','#e8dcc0'),{rim:0.2,spec:0.2}));if(TX.rug)D.push(TEXD(ss,TX.rug,{rim:0.1,spec:0.1}));
  // cloth canopies across the street (light falls in slits between them)
  const cn=new Geo();for(let i=0;i<9;i++){const z=10-i*7.5;G.plane(cn,M4.chain(M4.T(0,8.2+hash(i)*0.6,z),M4.RX(0.08*(i%2?1:-1)),M4.S(7.4,1,4.4)),[1,1,1],{uv:1});}
  D.push(TEXD(cn,stripeTex('#d8c49a','#c8a070'),{rim:0.1,spec:0.1}));
  // lanterns
  const lt=new Geo();for(let i=0;i<10;i++){const z=12-i*6.8,x=(i%2?1:-1)*2.2;G.cyl(lt,M4.chain(M4.T(x,6.0,z),M4.S(0.16,0.4,0.16)),'#ffcf80',{seg:8});}D.push({mesh:mesh(lt),M:M4.id(),col:[1,1,1],emis:[1.4,1.0,0.5],rim:0,noShadow:1});
  // a minaret closing the street, far end
  minaret(g,0,0,-62,32);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.35});return {D,pts:[[0,5.6,4,10,[1.0,0.7,0.35]],[0,5.6,-14,10,[1.0,0.7,0.35]],[0,5.6,-30,10,[1.0,0.7,0.35]]]};}
// ---------------- Timbuktu: the great mud mosque with toron beams, buttresses, conical tower ----------------
function buildMali(){texInit();const D=[],g=new Geo(),md=new Geo(),tw=new Geo();
  const sd=new Geo();G.plane(sd,M4.S(500,1,500),[1,1,1],{uv:100});D.push(TEXD(sd,sandTex(),{rim:0,spec:0.15,col:[0.82,0.72,0.6]}));
  BX(md,[0,0,-10],[60,7,12],'#b8784a');// long prayer-hall wall
  for(let x=-29;x<=29;x+=3.2){BX(md,[x,0,-3.85],[1.1,8.2,0.9],'#b8784a');G.lathe(md,M4.chain(M4.T(x,8.2,-3.85)),'#b8784a',[[0.001,1.1],[0.35,0.7],[0.5,0]],{seg:10});}
  for(let x=-28;x<=28;x+=1.6)for(const y of [2.5,5.2])G.cyl(g,M4.chain(M4.T(x,y,-3.4),M4.RX(Math.PI/2),M4.S(0.07,0.8,0.07)),'#6a4a2a',{seg:6});
  // main tower: tapered square, rounded edge buttresses, torons all over
  G.cyl(tw,M4.chain(M4.T(-8,0,-8),M4.RY(Math.PI/4),M4.S(6.4,17,6.4)),'#b8784a',{seg:4,rt:0.42});G.lathe(tw,M4.chain(M4.T(-8,17,-8)),'#b8784a',[[0.001,2.6],[1.2,1.4],[2.0,0]],{seg:12});
  for(let y=1.6;y<16;y+=1.5){const r=lerp(4.4,1.95,y/17);for(let k=-2;k<=2;k++)G.cyl(g,M4.chain(M4.T(-8+k*r*0.38,y,-8+r+0.2),M4.RX(Math.PI/2),M4.S(0.07,0.9,0.07)),'#6a4a2a',{seg:6});}
  for(const [x,h] of [[12,11],[24,9]]){G.cyl(tw,M4.chain(M4.T(x,0,-6),M4.RY(Math.PI/4),M4.S(3.4,h,3.4)),'#b8784a',{seg:4,rt:0.4});G.lathe(tw,M4.chain(M4.T(x,h,-6)),'#b8784a',[[0.001,1.6],[0.9,0]],{seg:10});
    for(let y=1.6;y<h;y+=1.5)G.cyl(g,M4.chain(M4.T(x,y,-6+lerp(2.3,1,y/h)+0.2),M4.RX(Math.PI/2),M4.S(0.06,0.8,0.06)),'#6a4a2a',{seg:6});}
  BX(g,[-8,0,-3.0],[1.6,2.8,0.1],'#2a1a10');G.cyl(g,M4.chain(M4.T(-8,2.8,-3.0),M4.RX(Math.PI/2),M4.S(0.8,0.1,0.8)),'#2a1a10',{seg:14});
  D.push({mesh:mesh(md),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.2});D.push({mesh:mesh(tw),M:M4.id(),col:[0.96,0.96,0.96],rim:0.3,spec:0.2});
  for(let i=0;i<16;i++){const x=-70+hash(i*2.1)*140,z=10+hash(i*3.7)*50;if(Math.abs(x)<16&&z<26)continue;i%3?acacia(g,x,0,z,4+hash(i)*3,i):palm(g,x,0,z,7+hash(i*4)*3,i);}
  for(let i=0;i<20;i++){const x=-80+hash(i*5.3)*160,z=-30-hash(i*1.3)*60;house(g,x,0,z,6+hash(i)*5,6,4+hash(i*2)*3,'#b07444',{win:false});}
  ridges(g,280,16,3,['#b88a5a','#a87a4c']);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.3});return {D,pts:[]};}
// ---------------- Al-Umari's study: arches, shelves of manuscripts, a low desk, oil lamp, window light ----------------
function buildStudy(){texInit();const D=[],g=new Geo(),wl=new Geo();
  const fl=new Geo();G.plane(fl,M4.S(14,1,14),[1,1,1],{uv:4});D.push(TEXD(fl,TX.planks||dirtTex(),{rim:0,spec:0.4,col:[0.7,0.62,0.55]}));
  if(TX.rug){const rg=new Geo();G.plane(rg,M4.chain(M4.T(0,0.01,0.6),M4.S(4.2,1,3.0)),[1,1,1],{uv:1});D.push(TEXD(rg,TX.rug,{rim:0,spec:0.1}));}
  BX(wl,[0,0,-4],[14,6,0.3],'#c4a47e');BX(wl,[-5,0,0],[0.3,6,14],'#c4a47e');BX(wl,[5,0,0],[0.3,6,14],'#c4a47e');BX(g,[0,6,0],[14,0.3,14],'#4a3424');
  for(let x=-5;x<=5;x+=1.6)BX(g,[x,5.7,0],[0.25,0.3,14],'#5a3e28');
  D.push({mesh:mesh(wl),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.2});
  // arched niche shelves with books + scroll cases (back wall)
  for(const nx of [-2.6,2.6]){BX(g,[nx,0.6,-3.82],[1.9,3.0,0.06],'#2a1c12');G.cyl(g,M4.chain(M4.T(nx,3.6,-3.82),M4.RX(Math.PI/2),M4.S(0.95,0.06,0.95)),'#2a1c12',{seg:18});
    for(let sh=0;sh<4;sh++){BX(g,[nx,0.6+sh*0.75,-3.7],[1.9,0.06,0.4],'#6a4a2e');for(let k=0;k<9;k++){const bh=0.4+hash(nx+sh*5+k)*0.22;BX(g,[nx-0.85+k*0.2,0.66+sh*0.75,-3.7],[0.16,bh,0.3],['#7a2a22','#2a3a5a','#5a4a2a','#3a5a3a','#8a6a3a'][(k+sh)%5]);}}}
  // window with bright daylight (right wall)
  BX(g,[4.83,1.6,-0.6],[0.05,2.4,1.6],'#fff8e8');G.cyl(g,M4.chain(M4.T(4.83,4.0,-0.6),M4.RZ(Math.PI/2),M4.S(0.8,0.05,0.8)),'#fff8e8',{seg:16});
  // low writing desk, cushion, manuscripts, inkwell, lamp
  BX(g,[0,0,0.3],[1.8,0.42,0.9],'#5a3a22');BX(g,[0,0.42,0.3],[1.95,0.06,1.0],'#6a4628');BX(g,[0,0,1.4],[1.4,0.22,0.9],'#7a2a2a');
  BX(g,[0.25,0.48,0.25],[0.7,0.02,0.5],'#efe2c4');BX(g,[-0.55,0.48,0.2],[0.45,0.12,0.6],'#e4d4b0');G.cyl(g,M4.chain(M4.T(0.75,0.48,0.05),M4.S(0.07,0.1,0.07)),'#1a1a22',{seg:10});
  const lp=new Geo();G.lathe(g,M4.chain(M4.T(-0.75,0.48,-0.05)),'#b8862a',[[0.001,0.14],[0.12,0.1],[0.09,0.02],[0.05,0]],{seg:12});G.sphere(lp,M4.chain(M4.T(-0.62,0.66,-0.05),M4.S(0.035,0.07,0.035)),'#ffffff',{su:8,sv:6});
  D.push({mesh:mesh(lp),M:M4.id(),col:[1,1,1],emis:[2.4,1.6,0.6],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.4});return {D,pts:[[-0.62,0.9,-0.05,5,[1.6,1.0,0.45]],[3.8,3,-0.6,7,[0.8,0.78,0.72]]]};}
// ---------------- lights ----------------
LIGHT5.desertGold={sunDir:[0.8,0.22,0.3],sunCol:[1.8,1.18,0.66],sky:[0.52,0.48,0.5],gnd:[0.5,0.38,0.26],fog:[0.98,0.82,0.6],fogD:0.0011,fogH:0,skyTop:[0.22,0.34,0.62],skyHor:[1.0,0.7,0.4],skyBot:[0.8,0.6,0.42],cloud:0.3,stars:0,sunSize:700,sunGlow:[1.6,1.0,0.5],
  post:{bloom:0.35,thr:1.0,sat:1.35,expo:0.9,lift:[0.02,0.01,0.0],gain:[1.08,0.96,0.82],vig:1.2,ink:1}};
LIGHT5.cairoDay={sunDir:[-0.5,0.62,0.45],sunCol:[1.5,1.3,1.0],sky:[0.6,0.6,0.62],gnd:[0.55,0.45,0.32],fog:[0.92,0.86,0.74],fogD:0.0016,fogH:0,skyTop:[0.32,0.52,0.82],skyHor:[0.95,0.88,0.75],skyBot:[0.8,0.7,0.55],cloud:0.25,stars:0,sunSize:900,sunGlow:[1.2,1.0,0.7],
  post:{bloom:0.25,thr:1.1,sat:1.25,expo:0.85,lift:[0.01,0.01,0.0],gain:[1.05,1.0,0.92],vig:1.1,ink:1}};
LIGHT5.cairoDusk={sunDir:[-0.85,0.12,0.25],sunCol:[2.1,1.1,0.55],sky:[0.42,0.34,0.42],gnd:[0.4,0.28,0.2],fog:[0.9,0.6,0.42],fogD:0.0024,fogH:0,skyTop:[0.2,0.22,0.42],skyHor:[1.0,0.6,0.32],skyBot:[0.6,0.4,0.3],cloud:0.4,stars:0,sunSize:700,sunGlow:[1.8,0.9,0.4],
  post:{bloom:0.45,thr:0.9,sat:1.2,expo:1.0,lift:[0.02,0.0,0.02],gain:[1.1,0.95,0.82],vig:1.25,ink:1}};
LIGHT5.soukDay={sunDir:[0.25,0.92,-0.2],sunCol:[1.9,1.6,1.15],sky:[0.42,0.38,0.34],gnd:[0.42,0.32,0.22],fog:[0.75,0.6,0.42],fogD:0.008,fogH:0,skyTop:[0.4,0.55,0.8],skyHor:[0.95,0.85,0.7],skyBot:[0.6,0.5,0.4],cloud:0.2,stars:0,sunSize:900,sunGlow:[1.0,0.8,0.5],
  post:{bloom:0.45,thr:0.95,sat:1.18,expo:1.1,lift:[0.02,0.012,0.0],gain:[1.08,0.98,0.86],vig:1.2,ink:1}};
LIGHT5.maliDay={sunDir:[-0.45,0.55,0.6],sunCol:[1.45,1.15,0.82],sky:[0.6,0.56,0.54],gnd:[0.55,0.4,0.28],fog:[0.95,0.82,0.65],fogD:0.0018,fogH:0,skyTop:[0.35,0.5,0.78],skyHor:[0.98,0.86,0.68],skyBot:[0.8,0.62,0.45],cloud:0.3,stars:0,sunSize:900,sunGlow:[1.3,1.0,0.6],
  post:{bloom:0.25,thr:1.1,sat:1.3,expo:0.82,lift:[0.01,0.0,0.0],gain:[1.06,0.98,0.9],vig:1.1,ink:1}};
LIGHT5.study={sunDir:[1,0.35,-0.1],sunCol:[1.2,1.05,0.85],sky:[0.22,0.18,0.15],gnd:[0.12,0.09,0.07],fog:[0.1,0.08,0.06],fogD:0.01,fogH:0,skyTop:[0.1,0.08,0.06],skyHor:[0.1,0.08,0.06],skyBot:[0.06,0.05,0.04],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.6,thr:0.8,sat:1.1,expo:1.5,lift:[0.03,0.02,0.01],gain:[1.1,0.98,0.85],vig:1.3,ink:1}};
{const _gm=getSet;getSet=function(k){const B={desert:buildDesert,cairo:buildCairo,cairo2:()=>buildCairo({noPalms:1}),souk:buildSouk,mali:buildMali,study:buildStudy};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _gm(k);};}
PL.push(
 ['de_wide','desert','desertGold',[20,3.2,26],[-10,2.2,0],46],['de_low','desert','desertGold',[8,0.9,9],[-6,1.8,0],44],['de_air','desert','desertGold',[40,30,50],[-20,0,0],46],
 ['ca_wide','cairo','cairoDay',[2.5,2.6,44],[0,6.5,-24],50],['ca_siege','cairo','cairoDusk',[-13,1.6,12],[0,6.5,-24],50],['ca_gate','cairo','cairoDay',[3,1.5,6],[0,3.2,-24],50],['ca_dusk','cairo','cairoDusk',[-26,8,36],[0,9,-40],46],['ca_think','cairo2','cairoDusk',[-22,5,30],[0,11,-40],44],
 ['sk_st','souk','soukDay',[0.6,1.45,14.5],[0,0.95,0],48],['sk_rev','souk','soukDay',[-0.5,1.6,-8],[0,1.9,8],46],
 ['ml_wide','mali','maliDay',[8,1.6,22],[-4,4.2,-6],48],
 ['su_wide','study','study',[2.6,1.5,4.4],[0,0.6,0],46],['su_close','study','study',[0.9,1.1,1.8],[0,0.5,0.2],38],
);
