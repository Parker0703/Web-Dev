// ===================== DMZ sets v2 — cinematic detail: terrain, vegetation, real structures, war room, carrier =====================
function fbm2(x,z){let v=0,a=1,f=1;for(let i=0;i<4;i++){v+=a*(Math.sin(x*0.021*f+i*1.7)*Math.cos(z*0.017*f-i*2.3)+Math.sin((x+z)*0.013*f+i));a*=0.5;f*=2.03;}return v;}
function terrainMesh(D,o){const g=new Geo(),S=o.size,cs=o.cell,n=Math.round(S/cs),x0=o.cx-S/2,z0=o.cz-S/2;const H=o.h;
  const N=(x,z)=>{const e=0.5;const dx=H(x+e,z)-H(x-e,z),dz=H(x,z+e)-H(x,z-e);const v=[-dx,2*e,-dz];const l=Math.hypot(...v);return [v[0]/l,v[1]/l,v[2]/l];};
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const xa=x0+i*cs,xb=xa+cs,za=z0+j*cs,zb=za+cs;const P=[[xa,za],[xb,za],[xb,zb],[xa,zb]].map(([x,z])=>[[x,H(x,z),z],N(x,z),[x*o.uv,z*o.uv]]);
    g.quad(VI,VNI,C(o.col(xa+cs/2,za+cs/2)),P[0],P[3],P[2],P[1]);}
  D.push({mesh:mesh(g),M:M4.id(),tex:o.tex,col:[1,1,1],rim:0,spec:o.spec??0.15});return g;}
function grass2Tex(){return TX.kgrass2=TX.kgrass2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#8a9a6a';x.fillRect(0,0,w,h);for(let i=0;i<14000;i++){const v=hash(i*1.3);x.fillStyle=v<0.3?'rgba(40,60,20,0.5)':v<0.6?'rgba(150,170,100,0.45)':v<0.85?'rgba(90,110,50,0.5)':'rgba(190,180,120,0.4)';x.fillRect(hash(i*2.1)*w,hash(i*3.7)*h,1.5+hash(i)*2,3+hash(i*5)*5);}},{repeat:1});}
function tuft(g,x,y,z,h,col){for(let k=0;k<3;k++){const a=k/3*Math.PI+hash(x*3+z)*2;G.cyl(g,M4.chain(M4.T(x+Math.cos(a)*0.08,y,z+Math.sin(a)*0.08),M4.RZ(Math.cos(a)*0.25),M4.RX(Math.sin(a)*0.25),M4.S(0.05,h,0.05)),col,{seg:4,rt:0.0});}}
function leafTree(g,x,y,z,h,seed){G.cyl(g,M4.chain(M4.T(x,y,z),M4.S(0.18+h*0.015,h*0.55,0.18+h*0.015)),'#4a3a2a',{seg:7,rt:0.6});const R=h*0.32;
  for(let k=0;k<34;k++){const a=hash(seed+k*1.7)*TAU,e=(hash(seed*3+k)-0.25)*1.7,r=R*(0.3+0.75*hash(seed*7+k));const q=R*(0.22+0.16*hash(seed*5+k));G.sphere(g,M4.chain(M4.T(x+Math.cos(a)*Math.cos(e)*r,y+h*0.62+Math.sin(e)*r*0.85,z+Math.sin(a)*Math.cos(e)*r),M4.S(q*1.1,q*0.85,q*1.1)),['#2a4418','#34501e','#3e5c24','#264016','#48662a'][k%5],{su:8,sv:6});}}
function pine(g,x,y,z,h){G.cyl(g,M4.chain(M4.T(x,y,z),M4.S(0.18,h*0.3,0.18)),'#3e2e20',{seg:6});for(let k=0;k<4;k++){const s=(1-k*0.22)*h*0.22;G.cyl(g,M4.chain(M4.T(x,y+h*0.22+k*h*0.18,z),M4.S(s,h*0.32,s)),['#1e3a22','#24422a','#2a4a2e','#1a3420'][k],{seg:9,rt:0});}}
function ridges(g,R,n,seed,cols){for(let i=0;i<n;i++){const a=Math.PI*(0.95+hash(i*1.3+seed)*1.1)+0.0,r=R*(1+hash(i*2.7+seed)*0.6);const x=Math.cos(a)*r,z=Math.sin(a)*r,s=30+hash(i*3.3+seed)*40;
  G.sphere(g,M4.chain(M4.T(x,-s*0.55,z),M4.S(s*2.2,s,s*1.6)),cols[i%cols.length],{su:16,sv:10});}}
// ---------------- the poplar site, v2 ----------------
function buildTreeSite2(){texInit();const D=[],g=new Geo(),veg=new Geo(),tf=new Geo();
  const H=(x,z)=>{const r=Math.hypot(x,z*1.2);const f=clamp((r-22)/60);return f*f*(5+fbm2(x,z)*2.4)+ (x>31&&x<45?-1.6*clamp(1-Math.abs(x-38)/7):0);};
  terrainMesh(D,{size:320,cell:4,cx:0,cz:0,h:H,uv:0.08,tex:grass2Tex(),col:(x,z)=>{const v=fbm2(x*3,z*3);return v>0.8?'#b8b08a':v<-0.9?'#8a9a6a':'#a8b88a';}});
  // dirt road following the ground, with two worn wheel tracks
  TX.dirt2=TX.dirt2||cvTex(256,512,(x,w,h)=>{x.fillStyle='#9a8662';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(60,40,20,0.35)','rgba(220,200,160,0.3)'],2);x.fillStyle='rgba(70,52,30,0.35)';x.fillRect(w*0.2,0,w*0.12,h);x.fillRect(w*0.68,0,w*0.12,h);},{repeat:1});
  const rd=new Geo();for(let i=0;i<120;i++){const za=-90+i*1.5,zb=za+1.5;const xa=Math.sin(za*0.03)*6+8,xb=Math.sin(zb*0.03)*6+8;const P=[[xa-2.4,za],[xa+2.4,za],[xb+2.4,zb],[xb-2.4,zb]].map(([x,z],k)=>[[x,H(x,z)+0.04,z],[0,1,0],[k===1||k===2?1:0,i*0.25+(k>=2?0.25:0)]]);rd.quad(VI,VNI,C('#ffffff'),P[0],P[3],P[2],P[1]);}
  D.push({mesh:mesh(rd),M:M4.id(),tex:TX.dirt2,col:[1,1,1],rim:0,spec:0.1});
  // river + Bridge of No Return (concrete deck, low rails, lamp posts)
  const rv=new Geo();G.plane(rv,M4.chain(M4.T(38,-1.1,0),M4.S(12,1,320)),[1,1,1],{uv:1});D.push({mesh:mesh(rv),M:M4.id(),col:[0.28,0.36,0.38],spec:3.0,rim:0.2});
  BX(g,[38,0.9,-8],[20,0.6,4.4],'#bab4a6');for(const s of [-1,1]){BX(g,[38,1.5,-8+s*2.1],[20,0.5,0.2],'#c8c2b4');for(let k=0;k<5;k++){BX(g,[29.5+k*4.2,1.5,-8+s*2.1],[0.12,3.4,0.12],'#7a7a74');BX(g,[29.5+k*4.2,4.9,-8+s*1.9],[0.5,0.15,0.5],'#e8e8d8');}}
  for(const x of [31,38,45])BX(g,[x,-1.4,-8],[1.2,2.4,3.6],'#9a948a');
  // UNC Checkpoint 3: concrete guard post with sandbag ring, a raised observation tower behind it
  BX(g,[16,H(16,8),8],[3.4,2.7,3.4],'#c2baa8');BX(g,[16,H(16,8)+2.7,8],[3.9,0.28,3.9],'#6e6c64');for(const [dx,dz] of [[1.71,0],[-1.71,0],[0,1.71]])BX(g,[16+dx,H(16,8)+1.2,8+dz],[dx?0.05:1.2,0.8,dz?0.05:1.2],'#1a2028');
  for(let k=0;k<16;k++){const a=k/16*TAU;BX(g,[16+Math.cos(a)*2.9,H(16,8),8+Math.sin(a)*2.9],[1.1,0.85,0.55],'#a28e64',{ry:-a});}
  for(const [dx,dz] of [[-1,-1],[1,-1],[-1,1],[1,1]])BX(g,[21+dx*1.2,H(21,12),12+dz*1.2],[0.18,7,0.18],'#7a6a52');BX(g,[21,H(21,12)+7,12],[3.2,2.2,3.2],'#b8b0a0');BX(g,[21,H(21,12)+9.2,12],[3.6,0.3,3.6],'#5a5a52');
  // KPA guard posts north of the road (tiled roofs)
  for(const [x,z] of [[-14,-18],[24,-24]]){const y=H(x,z);BX(g,[x,y,z],[4,2.8,3.2],'#a8a490');G.lathe(g,M4.chain(M4.T(x,y+2.8,z),M4.S(1.25,1,1)),'#3e4a42',[[0.001,1.3],[2.4,0.2],[2.8,0],[0.001,0]],{seg:4});BX(g,[x,y+1.3,z+1.62],[1.2,1,0.06],'#1a2028');}
  // power poles + wires along the road
  for(let i=0;i<9;i++){const z=-80+i*18,x=Math.sin(z*0.03)*6+13;const y=H(x,z);BX(g,[x,y,z],[0.22,8.5,0.22],'#5a4632');BX(g,[x,y+8,z],[2.2,0.14,0.14],'#5a4632');}
  // vegetation: broadleaf trees, pines, tufts of tall grass
  for(let i=0;i<150;i++){const a=hash(i*1.9)*TAU,r=28+hash(i*3.1)*120;const x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x-38)<9||(Math.abs(x-(Math.sin(z*0.03)*6+8))<6))continue;const y=H(x,z)-0.2,h=6+hash(i*5.3)*8;
    if(hash(i*7.1)>0.7)pine(veg,x,y,z,h*1.3);else leafTree(veg,x,y,z,h,i*13);}
  for(let i=0;i<0;i++){const x=(hash(i*1.31)-0.5)*90,z=(hash(i*2.77)-0.5)*90;if(Math.hypot(x,z)<3||Math.abs(x-(Math.sin(z*0.03)*6+8))<3)continue;tuft(tf,x,H(x,z),z,0.35+hash(i*4.1)*0.45,['#6a7a3a','#8a9448','#5a6a30'][i%3]);}
  ridges(veg,260,26,3,['#4a6050','#56705a','#3e5444']);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.4});D.push({mesh:mesh(veg),M:M4.id(),col:[1,1,1],rim:0.35,spec:0.2,sss:0.3});D.push({mesh:mesh(tf),M:M4.id(),col:[1,1,1],rim:0.2,spec:0.1});
  return {D,pts:[]};}
// ---------------- Joint Security Area, v2 ----------------
function buildJSA2(){texInit();const D=[],g=new Geo(),veg=new Geo();
  TX.grav2=TX.grav2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#7e7a70';x.fillRect(0,0,w,h);speck(x,w,h,9000,['rgba(0,0,0,0.3)','rgba(255,255,255,0.3)','rgba(120,100,80,0.3)'],1.4);},{repeat:1});
  terrainMesh(D,{size:300,cell:6,cx:0,cz:0,h:(x,z)=>{const r=Math.hypot(x,z);const f=clamp((r-45)/80);return f*f*(6+fbm2(x,z)*3);},uv:0.08,tex:grass2Tex(),col:()=>'#a8b88a'});
  const pl=new Geo();G.plane(pl,M4.chain(M4.T(0,0.03,0),M4.S(80,1,56)),[1,1,1],{uv:24});D.push({mesh:mesh(pl),M:M4.id(),tex:TX.grav2,col:[1,1,1],rim:0,spec:0.2});
  BX(g,[0,0.03,0],[80,0.14,0.5],'#e8e4da');
  const hut=(x,col,roof)=>{BX(g,[x,0,0],[5.2,3.0,10.2],col);for(let k=0;k<11;k++)BX(g,[x,3.0,-5.0+k],[5.6,0.18,0.5],roof);BX(g,[x,3.2,0],[1.2,0.32,10.4],roof);
    for(const s of [-1,1]){for(let k=0;k<4;k++){BX(g,[x+s*2.62,1.15,-3.6+k*2.4],[0.06,1.15,1.35],'#f2f2f2');BX(g,[x+s*2.65,1.22,-3.6+k*2.4],[0.04,1.0,1.18],'#1e2a36');}BX(g,[x+s*2.7,0.9,4.2],[0.5,0.6,0.7],'#d8d8d4');}
    for(const zz of [-5.12,5.12]){BX(g,[x,0,zz],[1.3,2.3,0.06],'#f0f0ec');BX(g,[x,0,zz*1.04],[1.8,0.3,0.6],'#b8b4aa');}};
  hut(-30,'#9aa2aa','#8a9098');hut(-15,'#3a7cc8','#d8dce0');hut(0,'#3a7cc8','#d8dce0');hut(15,'#3a7cc8','#d8dce0');hut(30,'#9aa2aa','#8a9098');
  // Panmungak (north): stone hall, central tower, colonnade, broad steps
  BX(g,[0,0,-32],[40,4.2,11],'#8e8e88');BX(g,[0,4.2,-32],[36,4.0,10],'#9a9a94');BX(g,[0,8.2,-32],[16,4.2,9],'#a4a49e');BX(g,[0,12.4,-32],[17,0.6,9.6],'#6e6e6a');BX(g,[0,8.2,-32],[37,0.4,10.6],'#6e6e6a');
  for(let i=-8;i<=8;i++)BX(g,[i*2.2,0,-26.3],[0.7,4.2,0.7],'#c4c4be');for(let k=0;k<6;k++)BX(g,[0,0,-25.6+k*0.55],[18-k*0.4,0.42*(6-k),0.55],'#b4b4ac');
  const wn=new Geo();for(let f=0;f<2;f++)for(let k=-7;k<=7;k++)BX(wn,[k*2.3,1.2+f*4.1,-26.95],[1.2,2.0,0.08],'#141a22');for(let k=-3;k<=3;k++)BX(wn,[k*2.2,9.2,-27.45],[1.1,2.4,0.08],'#141a22');D.push({mesh:mesh(wn),M:M4.id(),col:[1,1,1],rim:0,spec:2});
  // guard booths, lamp posts, flagpoles, trees and hills
  for(const [x,z] of [[-22,8],[22,8],[-22,-12],[22,-12]]){BX(g,[x,0,z],[1.4,2.4,1.4],'#d8d4cc');BX(g,[x,2.4,z],[1.7,0.2,1.7],'#5a5a54');}
  for(const i of [-3,-2,2,3]){BX(g,[i*12,0,18],[0.14,6,0.14],'#4a4a48');BX(g,[i*12,6,18],[0.8,0.2,0.3],'#e8e8e0');}
  for(const [x,z] of [[-24,-40],[24,-40]])G.cyl(g,M4.chain(M4.T(x,0,z),M4.S(0.12,12,0.12)),'#d8d8d8',{seg:6});
  for(let i=0;i<70;i++){const a=hash(i*1.9)*TAU,r=48+hash(i*3.1)*90;const x=Math.cos(a)*r,z=Math.sin(a)*r;const h=6+hash(i*5.3)*8;if(hash(i*7)>0.6)pine(veg,x,0,z,h*1.3);else leafTree(veg,x,0,z,h,i*11);}
  ridges(veg,250,24,7,['#4a6050','#56705a','#3e5444']);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.5});D.push({mesh:mesh(veg),M:M4.id(),col:[1,1,1],rim:0.35,spec:0.2,sss:0.3});return {D,pts:[[0,6,18,14,[1.4,1.3,1.1]]]};}
// ---------------- war room: dark briefing room, a glowing Korea map table, wall maps ----------------
function koreaTex(){return TX.kmap=TX.kmap||cvTex(1024,1024,(x,w,h)=>{x.fillStyle='#102236';x.fillRect(0,0,w,h);x.strokeStyle='rgba(120,180,220,0.18)';x.lineWidth=2;for(let i=0;i<=32;i++){x.beginPath();x.moveTo(i*32,0);x.lineTo(i*32,h);x.stroke();x.beginPath();x.moveTo(0,i*32);x.lineTo(w,i*32);x.stroke();}
  const LL=[[124.3,39.8],[124.4,40.1],[125.5,40.6],[126.5,41.5],[127.5,41.6],[128.2,41.4],[129.0,42.0],[129.7,42.4],[130.7,42.3],[129.9,41.8],[129.6,41.2],[129.2,40.7],[128.6,40.2],[127.9,39.9],[127.5,39.6],[127.4,39.2],[127.9,38.9],[128.3,38.6],[128.6,38.2],[128.9,37.8],[129.4,37.0],[129.4,36.0],[129.4,35.5],[129.1,35.1],[128.6,34.9],[127.8,34.7],[127.0,34.5],[126.4,34.8],[126.3,35.5],[126.6,36.2],[126.2,36.8],[126.6,37.3],[126.2,37.7],[125.7,38.0],[125.1,37.9],[125.4,38.6],[125.2,39.4],[124.7,39.6]];
  const P=([lo,la])=>[(lo-123.0)*118+60,(43.2-la)*105+60];x.fillStyle='#2e4a3a';x.beginPath();LL.forEach((q,i)=>{const p=P(q);i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]);});x.closePath();x.fill();x.save();x.clip();
  for(let i=0;i<4000;i++){const px=hash(i*1.3)*w,py=hash(i*2.9)*h;x.fillStyle=`rgba(${hash(i)>0.5?'90,130,90':'40,70,50'},0.35)`;x.beginPath();x.arc(px,py,2+hash(i*5)*6,0,TAU);x.fill();}
  const dm=[[126.3,37.75],[126.68,37.96],[127.3,38.25],[128.35,38.62]].map(P);x.fillStyle='rgba(200,60,40,0.22)';x.beginPath();x.moveTo(0,0);x.lineTo(w,0);x.lineTo(w,dm[3][1]);dm.slice().reverse().forEach(p=>x.lineTo(p[0],p[1]));x.lineTo(0,dm[0][1]);x.closePath();x.fill();x.restore();
  x.strokeStyle='#9ac8a8';x.lineWidth=3;x.beginPath();LL.forEach((q,i)=>{const p=P(q);i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]);});x.closePath();x.stroke();
  x.strokeStyle='#ff5a3a';x.lineWidth=8;x.beginPath();dm.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.fillStyle='rgba(255,255,255,0.8)';x.font='bold 30px sans-serif';x.fillText('NORTH KOREA',360,330);x.fillText('SOUTH KOREA',420,690);x.fillText('DMZ',700,470);},{});}
function buildWarRoom(){texInit();const D=[],g=new Geo();
  TX.wfloor=TX.wfloor||cvTex(256,256,(x,w,h)=>{x.fillStyle='#2a2a30';x.fillRect(0,0,w,h);speck(x,w,h,1500,['rgba(0,0,0,0.3)','rgba(255,255,255,0.05)'],2);},{repeat:1});
  const fl=new Geo();G.plane(fl,M4.S(30,1,30),[1,1,1],{uv:10});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.wfloor,col:[1,1,1],rim:0,spec:0.8});
  BX(g,[0,0,-9],[30,6,0.3],'#2e3440');BX(g,[-12,0,0],[0.3,6,30],'#2e3440');BX(g,[12,0,0],[0.3,6,30],'#2e3440');BX(g,[0,6,0],[30,0.2,30],'#1a1c22');
  for(let i=-2;i<=2;i++)BX(g,[i*5.6,1.6,-8.8],[5.0,3.4,0.1],'#1c2a38');
  BX(g,[0,0,0],[6.4,0.92,3.6],'#3a3026');BX(g,[0,0.92,0],[6.6,0.08,3.8],'#2a2018');
  const mp=new Geo();G.plane(mp,M4.chain(M4.T(0,1.005,0),M4.S(6.0,1,3.4)),[1,1,1],{uv:1});D.push({mesh:mesh(mp),M:M4.id(),tex:koreaTex(),col:[1,1,1],emis:[0.55,0.55,0.55],rim:0,spec:0.6});
  for(const [x,z] of [[-2.6,2.6],[0,2.7],[2.6,2.6],[-2.6,-2.6],[2.6,-2.6]]){BX(g,[x,0,z],[0.6,0.5,0.6],'#2a2a2a');BX(g,[x,0.5,z+(z>0?0.3:-0.3)],[0.6,0.7,0.08],'#2a2a2a');}
  BX(g,[8,0,-6],[2.4,0.8,1],'#3a3026');BX(g,[8.6,0.8,-6],[0.3,0.16,0.2],'#b81a1a');
  const lt=new Geo();for(const x of [-1.6,1.6])G.sphere(lt,M4.chain(M4.T(x,4.2,0),M4.S(0.5,0.18,0.5)),'#fff');D.push({mesh:mesh(lt),M:M4.id(),col:[1,1,1],emis:[1.2,1.1,0.9],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.3,spec:0.5});return {D,pts:[[-1.6,4,0,7,[1.6,1.45,1.2]],[1.6,4,0,7,[1.6,1.45,1.2]]]};}
// ---------------- the sea: USS Midway, escort, swell ----------------
function buildSea2(){texInit();const D=[],g=new Geo(),dk=new Geo();
  TX.sea2=TX.sea2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#22405a';x.fillRect(0,0,w,h);for(let i=0;i<2500;i++){x.fillStyle=`rgba(${hash(i)>0.6?'220,235,245':'8,24,40'},${0.1+hash(i*3)*0.18})`;x.fillRect(hash(i*1.3)*w,hash(i*2.7)*h,8+hash(i*5)*36,2);}},{repeat:1});
  const sea=new Geo();G.plane(sea,M4.S(1600,1,1600),[1,1,1],{uv:140});D.push({mesh:mesh(sea),M:M4.id(),tex:TX.sea2,col:[1,1,1],spec:2.6,rim:0});
  // hull with flared bow, flight deck with angled section, island + mast, elevators, deck lines, parked aircraft
  const HG='#5e646c';BX(g,[-10,-6,0],[250,18,38],HG);for(let k=0;k<6;k++)BX(g,[115+k*6,-6+k*1.2,0],[8,18-k*1.2,38-k*6],HG);BX(g,[-10,9,0],[270,3,52],'#565c64');
  for(let k=0;k<30;k++)BX(dk,[-120+k*8,6,19.2],[1.2,1.4,0.2],'#22262a');for(let k=0;k<30;k++)BX(dk,[-120+k*8,6,-19.2],[1.2,1.4,0.2],'#22262a');
  BX(dk,[0,12,0],[300,0.8,64],'#4a4e54');BX(dk,[-40,12,-36],[150,0.8,28],'#4a4e54',{ry:0.16});
  BX(g,[20,12.8,26],[34,10,8],'#6e747c');BX(g,[24,22.8,26],[20,5,7],'#6a7078');BX(dk,[30,24.6,22.4],[10,1.4,0.2],'#141a22');BX(g,[12,22.8,26],[6,9,6],'#4a4e54');BX(g,[22,27.8,26],[1.2,18,1.2],'#4a4e54');BX(g,[22,40,26],[10,0.4,0.4],'#4a4e54');G.sphere(g,M4.chain(M4.T(26,34,26),M4.S(3,0.6,3)),'#5a5e64',{su:12,sv:6});
  const ln=new Geo();BX(ln,[0,12.42,0],[290,0.04,0.6],'#e8e8e0');BX(ln,[-40,12.42,-36],[140,0.04,0.6],'#e8d850',{ry:0.16});for(let i=0;i<10;i++)BX(ln,[100-i*22,12.42,-20],[10,0.04,0.4],'#e8e8e0');D.push({mesh:mesh(ln),M:M4.S(0.4,0.4,0.4),col:[1,1,1],emis:[0.4,0.4,0.4],rim:0});
  for(let i=0;i<14;i++){const x=-110+i*13,z=18+(i%2)*6;BX(g,[x,12.8,z],[2,1.4,10],'#8a9098',{ry:0.3});BX(g,[x+0.5,13.4,z],[7,0.25,3],'#8a9098',{ry:0.3});}
  vLoft(g,[[460,-4,6,1,0.8],[440,-4,7,5,1],[360,-4,7,5,1],[340,-3,7,4,1]].map(([x,yb,yt,hw,tq])=>[x-120,yb,yt,hw,tq]),'#6a6e74',4,20);BX(g,[290,7,-160],[18,8,7],'#7a7e84');
  D.push({mesh:mesh(g),M:M4.S(0.4,0.4,0.4),col:[1,1,1],rim:0.3,spec:0.8});D.push({mesh:mesh(dk),M:M4.S(0.4,0.4,0.4),col:[1,1,1],rim:0.2,spec:0.6});for(const d of D)if(d.mesh&&d.tex===undefined&&d.M===undefined)d.M=M4.id();return {D,pts:[]};}
LIGHT5.seaClear={sunDir:[-0.3,0.6,0.5],sunCol:[1.6,1.5,1.3],sky:[0.55,0.62,0.72],gnd:[0.3,0.4,0.5],fog:[0.75,0.82,0.9],fogD:0.0005,fogH:0,skyTop:[0.3,0.5,0.85],skyHor:[0.82,0.88,0.95],skyBot:[0.4,0.5,0.6],cloud:0.45,stars:0,sunSize:900,sunGlow:[1.0,0.95,0.8],post:{bloom:0.25,thr:1.1,sat:1.15,expo:0.95,lift:[0,0,0.01],gain:[1.0,1.0,1.02],vig:1.0,ink:1}};
LIGHT5.warroom={sunDir:[0.2,0.9,0.3],sunCol:[0.45,0.45,0.5],sky:[0.22,0.24,0.3],gnd:[0.08,0.08,0.1],fog:[0.08,0.09,0.12],fogD:0.02,fogH:0,skyTop:[0.06,0.06,0.08],skyHor:[0.06,0.06,0.08],skyBot:[0.04,0.04,0.05],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.6,thr:0.8,sat:1.05,expo:1.7,lift:[0.03,0.035,0.05],gain:[1.04,1.0,0.96],vig:1.2,ink:1}};
LIGHT5.korGold={sunDir:[0.75,0.32,0.35],sunCol:[1.9,1.35,0.85],sky:[0.5,0.48,0.55],gnd:[0.36,0.3,0.22],fog:[0.9,0.78,0.62],fogD:0.0014,fogH:0,skyTop:[0.3,0.4,0.65],skyHor:[1.0,0.78,0.52],skyBot:[0.7,0.55,0.42],cloud:0.45,stars:0,sunSize:700,sunGlow:[1.5,1.0,0.55],
  post:{bloom:0.35,thr:1.0,sat:1.2,expo:1.0,lift:[0.01,0.0,0.01],gain:[1.08,0.98,0.88],vig:1.15,ink:1}};
{const _g2=getSet;getSet=function(k){const B={tsite2:buildTreeSite2,jsa2:buildJSA2,wroom:buildWarRoom,sea2:buildSea2};if(B[k])return SETS[k]||(SETS[k]=B[k]());return _g2(k);};}
PL.push(
 ['t2_wide','tsite2','korDay',[22,6,30],[0,7,0],50],['t2_low','tsite2','korDay',[10,1.5,14],[0,3,0],46],['t2_crew','tsite2','korDay',[1.5,1.9,15],[-2.2,2.8,0],52],['t2_base','tsite2','korDay',[2.5,1.5,9],[0,1.6,0],46],
 ['t2_air','tsite2','korDay',[30,58,46],[4,0,-2],45],['t2_rev','tsite2','korDay',[-10,2.0,-14],[2,2.6,4],46],['t2_dawn','tsite2','korGold',[24,4.5,32],[0,7,0],50],['t2_sky','tsite2','korDay',[6,1.4,24],[0,22,-30],62],
 ['t2_road','tsite2','korGold',[14,2.2,-4],[6,1.6,30],48],['t2_road2','tsite2','korGold',[7.0,2.4,-8],[12.5,1.8,40],46],['t2_hill','tsite2','korDay',[-30,14,46],[2,6,0],40],
 ['j2_wide','jsa2','korDay',[0,3.2,26],[0,2.4,-8],50],['j2_face','jsa2','korDay',[12.2,1.7,0.3],[4.0,1.45,0],44],['j2_air','jsa2','korDay',[30,48,50],[0,0,-8],45],
 ['wr_wide','wroom','warroom',[0,3.4,7.5],[0,1.0,0],46],['wr_map','wroom','warroom',[0,5.4,1.6],[0,1.0,0],50],['wr_low','wroom','warroom',[3.6,1.3,4.4],[-0.4,1.4,0],40],
 ['s2_wide','sea2','seaClear',[90,18,105],[0,4,0],40],['s2_low','sea2','seaClear',[62,3.6,74],[0,5.5,0],38],
 ['s2_sky','sea2','seaClear',[80,2.4,104],[0,36,0],60],
 ['s2_top','sea2','seaClear',[0,700,10],[0,0,0],60],
);
