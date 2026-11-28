'use strict';
// ===================== 47 RONIN · 3D sets (Style 4 engine, ink outlines) =====================
const VPL=(w,h)=>{const g=new Geo();G.plane(g,M4.chain(M4.RX(Math.PI/2),M4.S(w,1,h)),[1,1,1]);return mesh(g);}; // vertical plane facing +z, v=0 at top
function cvTex(w,h,fn,o){const cv=mkCanvas(w,h),x=cv.getContext('2d');fn(x,w,h);return canvasTex(cv,o||{});}
function speck(x,w,h,n,cols,r=2){for(let i=0;i<n;i++){x.fillStyle=cols[i%cols.length];x.globalAlpha=0.25+hash(i*1.7)*0.4;x.beginPath();x.arc(hash(i*3.1)*w,hash(i*7.3)*h,r*(0.5+hash(i)),0,TAU);x.fill();}x.globalAlpha=1;}
const BX=(g,p,s,col,o)=>G.box(g,M4.chain(M4.T(p[0],p[1],p[2]),o&&o.ry?M4.RY(o.ry):M4.id(),o&&o.rz?M4.RZ(o.rz):M4.id(),o&&o.rx?M4.RX(o.rx):M4.id(),M4.S(s[0],s[1],s[2])),col,{base:1});
// ---------- shared textures ----------
const TX={};
function texInit(){if(TX.ok)return;TX.ok=1;
  TX.tatami=cvTex(256,512,(x,w,h)=>{x.fillStyle='#c9b77a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(110,92,46,0.35)';x.lineWidth=2;for(let y=0;y<h;y+=5){x.beginPath();x.moveTo(0,y);x.lineTo(w,y+2);x.stroke();}x.fillStyle='#1e2a52';x.fillRect(0,0,18,h);x.fillRect(w-18,0,18,h);x.fillStyle='rgba(255,240,200,0.5)';for(let y=10;y<h;y+=26){x.fillRect(5,y,8,3);x.fillRect(w-13,y,8,3);}},{repeat:1});
  TX.pine=cvTex(512,1024,(x,w,h)=>{const gr=x.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#e8c060');gr.addColorStop(0.5,'#f4d880');gr.addColorStop(1,'#d8a848');x.fillStyle=gr;x.fillRect(0,0,w,h);
    for(let i=0;i<70;i++){x.fillStyle=`rgba(255,240,180,${0.15+hash(i)*0.2})`;x.fillRect(hash(i*3)*w,hash(i*5)*h,40+hash(i*7)*60,40+hash(i*9)*60);} // gold-leaf squares
    x.strokeStyle='rgba(170,120,40,0.35)';x.lineWidth=1;for(let i=0;i<14;i++){x.beginPath();x.moveTo(0,i*76);x.lineTo(w,i*76);x.stroke();x.beginPath();x.moveTo(i*76,0);x.lineTo(i*76,h);x.stroke();}
    // pine trunk + branches + needle clumps
    x.strokeStyle='#4a3020';x.lineCap='round';x.lineWidth=34;x.beginPath();x.moveTo(140,h);x.bezierCurveTo(110,760,260,620,200,430);x.bezierCurveTo(160,330,300,260,330,180);x.stroke();
    x.lineWidth=16;for(const [a,b,c2,d] of [[200,520,380,470],[210,420,60,360],[300,250,470,220],[250,330,90,250]]){x.beginPath();x.moveTo(a,b);x.quadraticCurveTo((a+c2)/2,b-50,c2,d);x.stroke();}
    x.strokeStyle='rgba(30,20,10,0.5)';x.lineWidth=3;for(let i=0;i<40;i++){x.beginPath();const yy=h-hash(i)*700;x.moveTo(120+hash(i*2)*60,yy);x.lineTo(140+hash(i*2)*60,yy-10);x.stroke();}
    for(const [cx,cy,r] of [[390,450,90],[60,340,80],[470,200,80],[90,230,70],[330,160,70],[250,300,60]]){for(let k=0;k<26;k++){const a=hash(k*3+cx)*TAU,d=hash(k*5+cy)*r;x.fillStyle=['#2e5a2a','#3e7034','#244a22'][k%3];x.beginPath();x.ellipse(cx+Math.cos(a)*d,cy+Math.sin(a)*d*0.5,34,14,0,0,TAU);x.fill();}}
    x.strokeStyle='#2a1a10';x.lineWidth=10;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#2a1a10';x.beginPath();x.ellipse(w-60,h/2,10,22,0,0,TAU);x.fill();x.fillStyle='#c8a050';x.beginPath();x.ellipse(w-60,h/2,6,16,0,0,TAU);x.fill();},{});
  TX.paper=cvTex(256,512,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#fff4dc');gr.addColorStop(1,'#efd6a6');x.fillStyle=gr;x.fillRect(0,0,w,h);speck(x,w,h,200,['rgba(200,170,120,0.3)'],2);
    x.strokeStyle='#3a2414';x.lineWidth=8;for(let k=1;k<4;k++){x.beginPath();x.moveTo(k*w/4,0);x.lineTo(k*w/4,h);x.stroke();}for(let k=1;k<8;k++){x.beginPath();x.moveTo(0,k*h/8);x.lineTo(w,k*h/8);x.stroke();}x.lineWidth=16;x.strokeRect(0,0,w,h);},{});
  TX.plaster=cvTex(512,256,(x,w,h)=>{x.fillStyle='#f0ebe0';x.fillRect(0,0,w,h);speck(x,w,h,900,['rgba(150,140,120,0.15)','rgba(255,255,255,0.4)'],3);},{repeat:1});
  TX.stone=cvTex(512,512,(x,w,h)=>{x.fillStyle='#7c7870';x.fillRect(0,0,w,h);let y=0;let r=0;while(y<h){const bh=40+hash(r)*40;let xx=-hash(r*3)*60;while(xx<w){const bw=60+hash(xx+r*9)*90;x.fillStyle=`hsl(35,${6+hash(xx*2+r)*8}%,${40+hash(xx+r*5)*18}%)`;x.fillRect(xx+3,y+3,bw-6,bh-6);x.fillStyle='rgba(255,255,255,0.12)';x.fillRect(xx+3,y+3,bw-6,6);xx+=bw;}y+=bh;r++;}speck(x,w,h,700,['rgba(30,30,30,0.3)'],2);},{repeat:1});
  TX.planks=cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=['#8a5c34','#7a4e2c','#94643a','#6e4628'][i%4];x.fillRect(i*64,0,64,h);x.strokeStyle='rgba(30,16,8,0.6)';x.lineWidth=3;x.strokeRect(i*64,0,64,h);x.strokeStyle='rgba(40,20,10,0.25)';x.lineWidth=1.5;for(let k=0;k<6;k++){x.beginPath();x.moveTo(i*64+8+k*9,0);x.bezierCurveTo(i*64+4+k*9,h*0.3,i*64+14+k*9,h*0.6,i*64+8+k*9,h);x.stroke();}}},{repeat:1});
  TX.paving=cvTex(512,512,(x,w,h)=>{x.fillStyle='#4a4846';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const ox=(r%2)*64;x.fillStyle=`hsl(30,5%,${32+hash(r*7+c)*14}%)`;x.fillRect(c*128+ox+4,r*64+4,120,56);}speck(x,w,h,500,['rgba(255,255,255,0.08)'],3);},{repeat:1});
  TX.snow=cvTex(512,512,(x,w,h)=>{x.fillStyle='#e6ecf6';x.fillRect(0,0,w,h);for(let i=0;i<220;i++){x.fillStyle=`rgba(${150+hash(i)*40},${165+hash(i)*40},${210},0.18)`;x.beginPath();x.ellipse(hash(i*3)*w,hash(i*5)*h,20+hash(i*7)*50,8+hash(i*9)*16,hash(i)*3,0,TAU);x.fill();}speck(x,w,h,900,['rgba(255,255,255,0.9)'],1.4);},{repeat:1});
  TX.lattice=cvTex(512,512,(x,w,h)=>{x.fillStyle='#1a120c';x.fillRect(0,0,w,h);const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(255,170,80,0.55)');gr.addColorStop(1,'rgba(255,130,50,0.25)');x.fillStyle=gr;x.fillRect(0,0,w,h);for(let i=0;i<w;i+=16){x.fillStyle='#4a2e1a';x.fillRect(i,0,11,h);x.fillStyle='rgba(255,200,140,0.18)';x.fillRect(i,0,2,h);}x.fillStyle='#3a2414';x.fillRect(0,0,w,20);x.fillRect(0,h-20,w,20);x.fillRect(0,h*0.5-6,w,12);},{});
  TX.noren=cvTex(256,256,(x,w,h)=>{x.fillStyle='#22306a';x.fillRect(0,0,w,h);x.strokeStyle='#f4efe4';x.lineWidth=12;x.beginPath();x.arc(w/2,h*0.42,46,0,TAU);x.stroke();x.beginPath();x.moveTo(w/2-30,h*0.42);x.lineTo(w/2+30,h*0.42);x.moveTo(w/2,h*0.42-30);x.lineTo(w/2,h*0.42+30);x.stroke();x.fillStyle='rgba(0,0,0,0.35)';for(let k=1;k<4;k++)x.fillRect(k*w/4-3,0,6,h);},{});
  TX.straw=cvTex(256,256,(x,w,h)=>{x.fillStyle='#b8984e';x.fillRect(0,0,w,h);x.strokeStyle='rgba(90,66,26,0.5)';x.lineWidth=2;for(let i=0;i<120;i++){const yy=hash(i)*h;x.beginPath();x.moveTo(0,yy);x.lineTo(w,yy+(hash(i*3)-0.5)*14);x.stroke();}x.fillStyle='#5a4220';x.fillRect(0,h*0.2,w,10);x.fillRect(0,h*0.75,w,10);},{repeat:1});
  TX.quilt=cvTex(512,512,(x,w,h)=>{x.fillStyle='#7a2a3a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,220,180,0.4)';x.lineWidth=5;for(let i=0;i<20;i++){const cx=hash(i*3)*w,cy=hash(i*5)*h;x.beginPath();x.arc(cx,cy,26,0,TAU);x.stroke();x.beginPath();x.arc(cx,cy,12,0,TAU);x.stroke();}x.fillStyle='#e8dcc4';x.fillRect(0,0,w,60);},{});
  TX.water=cvTex(512,512,(x,w,h)=>{x.fillStyle='#2e4a52';x.fillRect(0,0,w,h);for(let i=0;i<300;i++){x.fillStyle=`rgba(${200},${230},${240},${0.05+hash(i)*0.15})`;x.fillRect(hash(i*3)*w,hash(i*5)*h,30+hash(i*7)*80,2);}},{repeat:1});
  TX.crest=cvTex(256,256,(x,w,h)=>{x.fillStyle='rgba(0,0,0,0)';x.clearRect(0,0,w,h);x.fillStyle='#f4efe4';x.beginPath();x.arc(w/2,h/2,110,0,TAU);x.fill();x.fillStyle='#20203a';x.beginPath();x.arc(w/2,h/2,96,0,TAU);x.fill();x.fillStyle='#f4efe4';for(let k=0;k<3;k++){const a=k/3*TAU-Math.PI/2;x.beginPath();x.ellipse(w/2+Math.cos(a)*40,h/2+Math.sin(a)*40,30,44,a+Math.PI/2,0,TAU);x.fill();}},{});
}
// ---------- shared building pieces ----------
function tileRoof(g,cx,y,cz,w,d,o={}){const col=o.col||'#2a3248',pitch=o.pitch??0.45,ov=o.ov??0.6;const hd=d/2+ov;
  for(const sd of [-1,1]){const M=M4.chain(M4.T(cx,y,cz),M4.RX(sd*pitch));G.box(g,M4.chain(M,M4.T(0,0,sd*hd/2),M4.S(w+ov*2,0.16,hd)),col,{base:1});
    const n=Math.floor((w+ov*2)/0.32);for(let i=0;i<n;i++)G.cyl(g,M4.chain(M,M4.T(-w/2-ov+0.16+i*0.32,0.17,0),M4.RX(sd*Math.PI/2),M4.S(0.1,hd,0.1)),i%2?o.col2||'#34405e':col,{seg:6,caps:0});
    if(o.snow)G.box(g,M4.chain(M,M4.T(0,0.24,sd*hd/2),M4.S(w+ov*2,0.12,hd*0.98)),'#eef2fa',{base:1});}
  G.box(g,M4.chain(M4.T(cx,y+Math.sin(pitch)*0.05,cz),M4.S(w+ov*2+0.2,0.34,0.36)),o.ridge||'#1c2236',{base:1});if(o.snow)G.box(g,M4.chain(M4.T(cx,y+0.34,cz),M4.S(w+ov*2+0.2,0.1,0.42)),'#f2f5fb',{base:1});}
function wallRun(g,x0,x1,z,h,o={}){const len=x1-x0,cx=(x0+x1)/2;BX(g,[cx,0,z],[len,0.7,0.5],o.base||'#3a3430');BX(g,[cx,0.7,z],[len,h-0.7,0.42],o.wall||'#ece6da');
  for(let x=x0+0.9;x<x1;x+=1.8)BX(g,[x,0.7,z+0.22],[0.12,h-0.7,0.04],'#4a3a2a');
  BX(g,[cx,h,z],[len+0.2,0.12,0.8],'#2a3046');tileRoof(g,cx,h+0.12,z,len,0.4,{pitch:0.5,ov:0.3,snow:o.snow});}
function pine(g,x,z,s=1,sd=1){G.cyl(g,M4.chain(M4.T(x,0,z),M4.RZ(0.1*Math.sin(sd)),M4.S(0.18*s,3.2*s,0.18*s)),'#4e3424',{seg:8,rt:0.7});
  for(let k=0;k<6;k++){const a=hash(sd*9+k)*TAU,h=(1.8+k*0.36)*s,r=(1.0-k*0.08)*s;const px=x+Math.cos(a)*r*0.9,pz=z+Math.sin(a)*r*0.5;G.cyl(g,M4.chain(M4.T(x,h-0.2,z),M4.RZ(-Math.cos(a)*1.1),M4.RX(Math.sin(a)*0.6),M4.S(0.06*s,r,0.06*s)),'#4e3424',{seg:5});
    G.blob(g,M4.chain(M4.T(px,h,pz),M4.S(0.75*s*(1-k*0.06),0.26*s,0.55*s)),['#2a4a28','#345a2e','#223e20'][k%3],{seed:sd*7+k,j:0.25,su:9,sv:4});}}
function lanternStone(g,x,z,s=1){BX(g,[x,0,z],[0.42*s,0.12*s,0.42*s],'#8a8680');G.cyl(g,M4.chain(M4.T(x,0.12*s,z),M4.S(0.1*s,0.8*s,0.1*s)),'#8a8680',{seg:10});BX(g,[x,0.92*s,z],[0.42*s,0.08*s,0.42*s],'#8a8680');BX(g,[x,1.0*s,z],[0.32*s,0.32*s,0.32*s],'#9a968e');BX(g,[x,1.32*s,z],[0.6*s,0.1*s,0.6*s],'#7a7670');G.cyl(g,M4.chain(M4.T(x,1.42*s,z),M4.S(0.2*s,0.16*s,0.2*s)),'#7a7670',{seg:10,rt:0.1});}
function andon(g,lg,x,z){BX(g,[x,0,z],[0.36,0.06,0.36],'#2a1a10');for(const dx of [-0.16,0.16])for(const dz of [-0.16,0.16])BX(g,[x+dx,0,z+dz],[0.04,0.95,0.04],'#2a1a10');BX(lg,[x,0.25,z],[0.3,0.62,0.3],'#ffffff');}
function chochin(lg,cap,x,y,z,s=1){G.lathe(lg,M4.chain(M4.T(x,y,z),M4.S(s)),'#ffffff',[[0.001,0],[0.15,0.02],[0.24,0.16],[0.26,0.32],[0.24,0.48],[0.15,0.62],[0.001,0.64]],{seg:16});
  G.cyl(cap,M4.chain(M4.T(x,y-0.03*s,z),M4.S(0.16*s,0.05*s,0.16*s)),'#1a1a1a',{seg:12});G.cyl(cap,M4.chain(M4.T(x,y+0.62*s,z),M4.S(0.16*s,0.05*s,0.16*s)),'#1a1a1a',{seg:12});for(let k=0;k<5;k++)G.cyl(cap,M4.chain(M4.T(x,y+(0.08+k*0.11)*s,z),M4.S((0.235+Math.sin((k+0.5)/5*Math.PI)*0.03)*s,0.008,(0.235+Math.sin((k+0.5)/5*Math.PI)*0.03)*s)),'#5a2a14',{seg:16,caps:0});}
// ---------- SET builders: each returns {draws:[...], pts:[...] , lightKey}
function buildCastleExt(){texInit();const g=new Geo(),lg=new Geo(),D=[];
  // grass bank foreground + moat water
  D.push({mesh:planeMeshT(60,20,6),M:M4.T(0,0,6),tex:cvTex(256,256,(x,w,h)=>{x.fillStyle='#5f7a3a';x.fillRect(0,0,w,h);speck(x,w,h,600,['#7a9448','#4a6430','#8aa45a'],3);},{repeat:1}),col:[1,1,1],rim:0});
  D.push({mesh:planeMeshT(90,26,8),M:M4.T(0,-1.2,-8),tex:TX.water,col:[0.9,1,1],emis:[0.05,0.08,0.1],spec:2,rim:0,noShadow:1});
  BX(g,[0,-1.4,-3.6],[90,1.5,1.2],'#6a6458');
  // massive sloped stone wall + white plaster wall + roof
    D.push({mesh:(()=>{const q=new Geo();G.box(q,M4.chain(M4.T(0,-1.3,-21),M4.RX(-0.16),M4.S(70,9.5,3)),[1,1,1],{base:1,uvs:[9,1.3]});return mesh(q);})(),M:M4.id(),tex:TX.stone,col:[1,1,1],rim:0.1});
  BX(g,[0,7.6,-22.6],[70,2.2,0.6],'#efe9dc');for(let x=-34;x<35;x+=2.2)BX(g,[x,8.2,-22.25],[0.5,0.3,0.06],'#2a2622');tileRoof(g,0,9.8,-22.6,70,0.6,{pitch:0.5,ov:0.4});
  // corner turret (yagura) + distant keep (tenshu)
  const tower=(x,z,base,tiers,w0)=>{let y=base,w=w0;for(let i=0;i<tiers;i++){const h=2.6;BX(g,[x,y,z],[w,h,w*0.8],'#f2ede2');for(let k=-1;k<=1;k++)BX(g,[x+k*w*0.28,y+h*0.45,z+w*0.4+0.01],[w*0.1,h*0.3,0.05],'#20242a');BX(g,[x,y,z],[w+0.05,0.3,w*0.8+0.05],'#2a2a30');tileRoof(g,x,y+h+0.15,z,w,w*0.8,{pitch:0.55,ov:0.8,col:'#3c4256',col2:'#465070'});
    if(i===tiers-1){BX(g,[x-w*0.3,y+h+0.7,z],[0.3,0.7,0.2],'#d8b040');BX(g,[x+w*0.3,y+h+0.7,z],[0.3,0.7,0.2],'#d8b040');}y+=h+0.9;w*=0.78;}};
  tower(-22,-23,8.0,2,7);tower(2,-46,9.5,5,13);
  for(const [x,z,s] of [[-30,0.5,1.4],[-18,2,1.1],[22,1.5,1.3],[30,3,1.0],[12,-24.5,1.0],[-6,-24.5,0.9]])pine(g,x,z,s,x);
  // cherry blossoms on the bank (April 1701)
  for(const [x,z] of [[-12,-1],[14,-0.5]]){G.cyl(g,M4.chain(M4.T(x,0,z),M4.RZ(0.12),M4.S(0.22,2.6,0.22)),'#4a3026',{seg:8});for(let k=0;k<10;k++)G.blob(g,M4.chain(M4.T(x+(hash(k+x)-0.5)*3.4,2.6+hash(k*3+x)*1.6,z+(hash(k*7)-0.5)*2.2),M4.S(0.9+hash(k)*0.5,0.7,0.8)),['#f4b8cc','#f8cad8','#eaa0b8'][k%3],{seed:k+x,j:0.2});}
  for(let i=0;i<30;i++)G.blob(g,M4.chain(M4.T(-60+i*4.2,3,-120),M4.S(5,6+hash(i)*5,3)),'#7a8aa0',{seed:i,j:0.15});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});return {D,pts:[]};}
function planeMeshT(w,d,u){const g=new Geo();G.plane(g,M4.S(w,1,d),[1,1,1],{uv:u});return mesh(g);}
// Matsu no Ōrōka — the Pine Corridor
function buildHall(){texInit();const g=new Geo(),lg=new Geo(),D=[];const L=46,X=2.4;
  // tatami floor rows
  const tg=new Geo();for(let z=4;z>-L;z-=1.8)for(const x of [-1.2,1.2])G.plane(tg,M4.chain(M4.T(x,0.01,z-0.9),M4.RY(Math.PI/2),M4.S(1.8,1,2.4)),[1,1,1]);
  D.push({mesh:mesh(tg),M:M4.id(),tex:TX.tatami,col:[1,1,1],rim:0});
  // painted pine fusuma panels on both walls
  const pg=new Geo();for(let z=4;z>-L;z-=1.6)for(const sd of [-1,1]){G.box(pg,M4.chain(M4.T(sd*X,0.1,z-0.8),M4.S(0.06,2.5,1.56)),[1,1,1],{base:1});}
  D.push({mesh:mesh(pg),M:M4.id(),tex:TX.pine,col:[1,1,1],rim:0.05,spec:0.3});
  for(let z=4;z>-L;z-=1.6)for(const sd of [-1,1]){BX(g,[sd*X,0,z],[0.14,2.75,0.1],'#2a1a10');}
  for(const sd of [-1,1]){BX(g,[sd*X,0,4-L/2],[0.16,0.12,L+2],'#2a1a10');BX(g,[sd*X,2.6,4-L/2],[0.18,0.16,L+2],'#2a1a10');
    // carved transom (ranma) band with gold
    BX(g,[sd*X,2.76,4-L/2],[0.1,0.6,L+2],'#5a3820');for(let z=4;z>-L;z-=0.5)BX(g,[sd*(X-0.06),2.82,z],[0.04,0.48,0.18],'#c8a048');BX(g,[sd*X,3.36,4-L/2],[0.2,0.14,L+2],'#2a1a10');}
  // coffered ceiling
  BX(g,[0,3.5,4-L/2],[X*2+0.4,0.1,L+2],'#3a2414');for(let z=4;z>-L;z-=1.2){BX(g,[0,3.38,z],[X*2,0.12,0.1],'#1e120a');}for(const x of [-1.2,0,1.2])BX(g,[x,3.38,4-L/2],[0.1,0.12,L+2],'#1e120a');
  const cg=new Geo();for(let z=4-0.6;z>-L;z-=1.2)for(const x of [-0.6,0.6,-1.8,1.8])G.box(cg,M4.chain(M4.T(x,3.46,z),M4.S(1.08,0.03,1.08)),'#c89a48',{base:1});D.push({mesh:mesh(cg),M:M4.id(),col:[1,1,1],spec:1,rim:0});
  // floor lamps
  const pts=[];for(let z=0;z>-L;z-=6)for(const sd of [-1,1]){andon(g,lg,sd*1.85,z-sd*1.5);pts.push([sd*1.85,0.6,z-sd*1.5,4,[1.1,0.7,0.32]]);}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});D.push({mesh:mesh(lg),M:M4.id(),tex:TX.paper,col:[1,0.95,0.8],emis:[1.2,0.8,0.35],rim:0,noShadow:1});
  return {D,pts};}
// Kyoto night street + open teahouse room
function buildStreet(){texInit();const g=new Geo(),lg=new Geo(),cap=new Geo(),D=[];
  D.push({mesh:planeMeshT(12,80,10),M:M4.T(0,0,-20),tex:TX.paving,col:[1,1,1],spec:1.2,rim:0});
  const pts=[];const lat=new Geo(),nor=new Geo();
  for(const sd of [-1,1])for(let i=0;i<9;i++){const z=6-i*6.2,x=sd*4.2;const w=5.8;
    BX(g,[x+sd*1.2,0,z],[2.6,0.25,w],'#3a3430');BX(g,[x+sd*1.6,0.25,z],[2.4,6.2,w],'#3a2a20');
    // lattice ground floor (lit from inside)
    G.box(lat,M4.chain(M4.T(x-sd*0.05,0.25,z),M4.S(0.08,2.4,w-0.6)),[1,1,1],{base:1});
    BX(g,[x,2.65,z],[0.3,0.25,w],'#2a1a10');// eave beam
    // noren at the door
    if(i%2===0)G.box(nor,M4.chain(M4.T(x-sd*0.12,1.7,z+w*0.25),M4.S(0.03,0.85,1.4)),[1,1,1],{base:1});
    // projecting lower roof + upper floor with clay slit window
    G.box(g,M4.chain(M4.T(x-sd*0.6,2.95,z),M4.RZ(sd*0.35),M4.S(1.6,0.12,w+0.1)),'#2a2e3c',{base:1});
    BX(g,[x+sd*0.6,3.2,z],[0.2,2.2,w],'#e6dccb');for(let k=0;k<7;k++)BX(g,[x+sd*0.48,3.7,z-w*0.35+k*w*0.11],[0.06,1.0,0.12],'#3a2a20');
    G.box(g,M4.chain(M4.T(x,5.5,z),M4.RZ(sd*0.45),M4.S(2.6,0.14,w+0.1)),'#262a36',{base:1});
    // red lanterns under the eaves
    if(i%2===1||i<3){const lx=x-sd*0.75,lz=z+w*0.3;chochin(lg,cap,lx,2.0,lz,0.85);if(pts.length<10)pts.push([lx,2.3,lz,4.2,[1.4,0.55,0.25]]);}}
  D.push({mesh:mesh(lat),M:M4.id(),tex:TX.lattice,col:[1,1,1],emis:[1.1,0.62,0.26],rim:0});
  D.push({mesh:mesh(nor),M:M4.id(),tex:TX.noren,col:[1,1,1],rim:0,cull:false});
  // open teahouse room (right side, front): raised tatami, low table, sake, paper lamp
  const tg=new Geo();G.plane(tg,M4.chain(M4.T(2.6,0.55,1.0),M4.S(2.8,1,3.6)),[1,1,1]);D.push({mesh:mesh(tg),M:M4.id(),tex:TX.tatami,col:[1,1,1],rim:0});
  BX(g,[2.6,0,1.0],[2.9,0.55,3.7],'#5a3820');BX(g,[2.7,0.55,1.0],[1.0,0.28,0.7],'#3a1e10');andon(g,lg,3.6,-0.4);pts.unshift([3.6,0.8,-0.4,5,[1.3,0.8,0.35]]);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.55,0.35],emis:[1.5,0.55,0.2],rim:0,noShadow:1});D.push({mesh:mesh(cap),M:M4.id(),col:[1,1,1],rim:0,noShadow:1});
  // willow
  const wg=new Geo();G.cyl(wg,M4.chain(M4.T(-2.6,0,-9),M4.RZ(0.08),M4.S(0.16,3.4,0.16)),'#3a2a20',{seg:8});for(let k=0;k<26;k++){const a=k/26*TAU;G.cyl(wg,M4.chain(M4.T(-2.6+Math.cos(a)*0.7,3.6,-9+Math.sin(a)*0.6),M4.RX(Math.PI),M4.S(0.03,1.6+hash(k)*1.2,0.03)),'#4a7a3a',{seg:4,caps:0});}
  D.push({mesh:mesh(wg),M:M4.id(),col:[1,1,1],rim:0.2});
  return {D,pts};}
// Kira's mansion: wall + great gate + courtyard + main hall (variant: snow)
function buildMansion(snow){texInit();const g=new Geo(),lg=new Geo(),cap=new Geo(),D=[];const sn=!!snow;
  D.push({mesh:planeMeshT(80,80,12),M:M4.T(0,0,-10),tex:sn?TX.snow:TX.paving,col:sn?[0.7,0.74,0.86]:[1,1,1],rim:0,spec:sn?0.2:0.6});
  // compound wall with the main gate at x=0, z=-6
  wallRun(g,-30,-2.6,-6,3.2,{snow:sn});wallRun(g,2.6,30,-6,3.2,{snow:sn});
  for(const sd of [-1,1]){BX(g,[sd*2.3,0,-6],[0.6,3.8,0.6],'#3a2416');BX(g,[sd*1.1,0,-6.6],[0.3,3.0,0.3],'#3a2416');}
  BX(g,[0,3.8,-6],[5.4,0.45,0.7],'#2a180c');tileRoof(g,0,4.35,-6,5.6,1.6,{pitch:0.5,ov:0.7,snow:sn});
  const dg=new Geo();for(const sd of [-1,1])G.box(dg,M4.chain(M4.T(sd*1.0,0,-6),M4.S(2.0,3.7,0.18)),[1,1,1],{base:1});D.push({mesh:mesh(dg),M:M4.id(),tex:TX.planks,col:[0.7,0.62,0.55],rim:0.1});
  for(const sd of [-1,1])for(let k=0;k<4;k++)for(let j=0;j<3;j++)G.sphere(g,M4.chain(M4.T(sd*(0.4+j*0.6),0.6+k*0.85,-5.89),M4.S(0.05)),'#1e1e22',{su:8,sv:6});
  // inner courtyard: main hall facing the gate
  const zH=-20;BX(g,[0,0,zH],[16,0.7,6],'#3a2a20');const sg=new Geo();for(let i=0;i<10;i++)G.box(sg,M4.chain(M4.T(-6.75+i*1.5,0.7,zH+2.7),M4.S(1.42,2.6,0.05)),[1,1,1],{base:1});D.push({mesh:mesh(sg),M:M4.id(),tex:TX.paper,col:[1,1,1],emis:sn?[0.9,0.6,0.28]:[0.2,0.16,0.1],rim:0});
  for(let i=0;i<=10;i++)BX(g,[-7.5+i*1.5,0.7,zH+2.8],[0.18,2.8,0.18],'#2a1a10');BX(g,[0,3.4,zH+2.8],[16,0.3,0.3],'#2a1a10');BX(g,[0,0.7,zH+3.4],[16,0.1,1.2],'#7a5232');tileRoof(g,0,4.4,zH,17,6,{pitch:0.42,ov:1.2,snow:sn});
  for(const [x,z] of [[-5,-11],[5,-11],[-8,-16],[8,-16]])lanternStone(g,x,z);
  pine(g,-10,-13,1.3,3);pine(g,11,-12,1.1,5);pine(g,-11,-3,1.2,7);pine(g,12,-2,1.0,9);
  // well + racks
  G.cyl(g,M4.chain(M4.T(7,0,-9),M4.S(0.8,0.8,0.8)),'#7a7670',{seg:16});G.cyl(g,M4.chain(M4.T(7,0.79,-9),M4.S(0.7,0.02,0.7)),'#203040',{seg:16});for(const sd of [-1,1])BX(g,[7+sd*0.75,0,-9],[0.12,2.2,0.12],'#3a2a20');BX(g,[7,2.2,-9],[1.8,0.14,0.2],'#3a2a20');
  if(sn){for(let i=0;i<40;i++)G.blob(g,M4.chain(M4.T((hash(i)-0.5)*40,0,-6-hash(i*3)*14+(i%2?8:0)),M4.S(0.6+hash(i*5),0.18,0.5+hash(i*7))),'#f0f4fa',{seed:i,j:0.2});}
  // gate lanterns + hall lanterns
  const pts=[];for(const sd of [-1,1]){chochin(lg,cap,sd*1.7,2.6,-5.3,0.9);pts.push([sd*1.7,2.9,-5.1,5.5,[1.5,0.7,0.3]]);}
  for(const x of [-5,5])pts.push([x,1.2,-11,3.5,[1.3,0.7,0.3]]);for(const x of [-4.5,0,4.5]){chochin(lg,cap,x,2.5,zH+3.3,0.8);pts.push([x,2.8,zH+3.6,6,[1.5,0.8,0.32]]);}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.92,0.75],emis:[1.4,0.9,0.4],rim:0,noShadow:1});D.push({mesh:mesh(cap),M:M4.id(),col:[1,1,1],rim:0,noShadow:1});
  return {D,pts};}
// inner rooms: veranda corridor + bedroom with futon (night)
function buildRooms(){texInit();const g=new Geo(),lg=new Geo(),D=[];
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,-10),M4.RY(Math.PI/2),M4.S(30,1,2.4)),[1,1,1],{uv:6});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.planks,col:[0.9,0.85,0.8],spec:0.8,rim:0});
  // shoji row on the left (x=-1.2), some open
  const sg=new Geo();for(let i=0;i<14;i++){const z=4-i*1.8;if(i===3||i===4||i===8)continue;G.box(sg,M4.chain(M4.T(-1.2,0,z),M4.S(0.05,2.5,1.76)),[1,1,1],{base:1});}D.push({mesh:mesh(sg),M:M4.id(),tex:TX.paper,col:[1,1,1],emis:[0.55,0.36,0.16],rim:0});
  for(let i=0;i<=14;i++)BX(g,[-1.2,0,4.9-i*1.8],[0.14,2.7,0.14],'#2a1a10');BX(g,[-1.2,2.5,-9],[0.2,0.25,30],'#2a1a10');BX(g,[0,2.95,-9],[3.4,0.1,30],'#3a2414');
  // right side opens to the snowy garden: posts + rail
  for(let i=0;i<=10;i++)BX(g,[1.2,0,4-i*2.8],[0.16,2.95,0.16],'#2a1a10');BX(g,[1.2,0.55,-9],[0.08,0.08,30],'#2a1a10');
  const sn=new Geo();G.plane(sn,M4.chain(M4.T(8,-0.4,-9),M4.S(13,1,40)),[1,1,1],{uv:4});D.push({mesh:mesh(sn),M:M4.id(),tex:TX.snow,col:[0.85,0.9,1],rim:0});
  pine(g,5,-6,1.0,2);pine(g,6.5,-14,1.2,4);lanternStone(g,4,-2,0.9);
  // bedroom behind the open panels (x<-1.2): tatami, futon, lamp, screen
  const tg=new Geo();for(let i=0;i<3;i++)G.plane(tg,M4.chain(M4.T(-2.3-i*0.0,0.02,-2.3-i*1.8),M4.S(2.0,1,1.8)),[1,1,1]);D.push({mesh:mesh(tg),M:M4.id(),tex:TX.tatami,col:[1,1,1],rim:0});
  BX(g,[-4.4,0,-4.5],[0.1,2.7,7],'#5a4a3a');
  const fg=new Geo();G.box(fg,M4.chain(M4.T(-2.6,0.02,-4.6),M4.RY(0.08),M4.S(1.3,0.16,2.0)),[1,1,1],{base:1});G.box(fg,M4.chain(M4.T(-2.5,0.18,-4.9),M4.RY(0.2),M4.RZ(0.06),M4.S(1.25,0.14,1.4)),[1,1,1],{base:1});D.push({mesh:mesh(fg),M:M4.id(),tex:TX.quilt,col:[0.62,0.55,0.58],rim:0.1});
  BX(g,[-2.6,0.02,-3.75],[0.5,0.14,0.28],'#e8dcc4');andon(g,lg,-3.6,-3.2);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});D.push({mesh:mesh(lg),M:M4.id(),tex:TX.paper,col:[1,0.95,0.8],emis:[1.3,0.8,0.32],rim:0,noShadow:1});
  return {D,pts:[[-3.6,0.6,-3.2,4.5,[1.4,0.85,0.35]],[-2,1.8,-1,4,[1,0.6,0.25]],[-2,1.8,-9,4,[1,0.6,0.25]],[0,2.2,2,4,[0.8,0.5,0.25]]]};}
// charcoal shed
function buildShed(){texInit();const g=new Geo(),D=[];
  D.push({mesh:planeMeshT(8,8,2),M:M4.T(0,0,-2),tex:cvTex(256,256,(x,w,h)=>{x.fillStyle='#3a3028';x.fillRect(0,0,w,h);speck(x,w,h,800,['#2a2220','#4a3e34','#1a1614'],3);},{repeat:1}),col:[1,1,1],rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-4.5),M4.S(6,3,0.1)),[1,1,1],{base:1});for(const sd of [-1,1])G.box(wg,M4.chain(M4.T(sd*3,0,-2),M4.S(0.1,3,5)),[1,1,1],{base:1});D.push({mesh:mesh(wg),M:M4.id(),tex:TX.planks,col:[0.55,0.45,0.38],rim:0});
  BX(g,[0,3,-2],[6.2,0.12,5.2],'#2a1e16');for(let i=0;i<6;i++)BX(g,[-2.5+i,2.85,-2],[0.14,0.16,5.2],'#3a2a1e');
  // straw charcoal bags piled in the back corner
  const bg=new Geo();const bag=(x,y,z,r)=>G.cyl(bg,M4.chain(M4.T(x,y,z),M4.RZ(Math.PI/2),M4.RY(r),M4.T(0,-0.32,0),M4.S(0.26,0.64,0.26)),[1,1,1],{seg:14});
  for(const [x,y,z,r] of [[-2.2,0.26,-3.9,0],[-1.6,0.26,-3.95,0.1],[-1.0,0.26,-3.9,-0.1],[-0.4,0.26,-4,0],[0.2,0.26,-3.95,0.05],[-1.9,0.74,-3.95,0.05],[-1.3,0.74,-3.95,0],[-0.7,0.74,-4.0,-0.05],[-1.6,1.2,-4,0.1],[-1.0,1.2,-4,0],[1.6,0.26,-3.6,0.4],[2.2,0.26,-2.6,1.2]])bag(x,y,z,r);
  D.push({mesh:mesh(bg),M:M4.id(),tex:TX.straw,col:[1,1,1],rim:0.1});
  for(let i=0;i<14;i++)G.cyl(g,M4.chain(M4.T(2.3,0.12+(i%4)*0.2,-1+Math.floor(i/4)*0.25),M4.RX(Math.PI/2),M4.S(0.09,1.2,0.09)),'#6a4a2a',{seg:6});
  for(let i=0;i<24;i++)G.sphere(g,M4.chain(M4.T(-2.5+hash(i)*2,0.04,-3.2+hash(i*3)*0.6),M4.S(0.08+hash(i*5)*0.06)),'#141212',{su:6,sv:4});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[[0.4,1.6,0.6,6,[1.6,0.9,0.4]],[-1,2.2,-2,3,[0.25,0.3,0.6]]]};}
// Sengaku-ji graves
function buildGrave(snow){texInit();const g=new Geo(),D=[];const sn=!!snow;
  D.push({mesh:planeMeshT(60,60,10),M:M4.T(0,0,-10),tex:sn?TX.snow:TX.paving,col:[1,1,1],rim:0});
  // terraced rows of small stone grave markers
  const st=new Geo();let n=0;for(let r=0;r<4;r++)for(let c=0;c<12;c++){const x=-6.6+c*1.2,z=-2-r*1.6,y=r*0.32;if(n>=48)break;n++;
    G.box(st,M4.chain(M4.T(x,y,z),M4.S(0.62,0.16,0.62)),'#8a8680',{base:1});G.box(st,M4.chain(M4.T(x,y+0.16,z),M4.S(0.38,0.95-(c%3)*0.06,0.38)),'#a09c94',{base:1});G.box(st,M4.chain(M4.T(x,y+1.08,z),M4.S(0.44,0.08,0.44)),'#7a766e',{base:1});
    if(sn)G.box(st,M4.chain(M4.T(x,y+1.16,z),M4.S(0.42,0.06,0.42)),'#f2f5fb',{base:1});
    G.box(st,M4.chain(M4.T(x,y,z+0.42),M4.S(0.26,0.18,0.12)),'#6a665e',{base:1});}
  D.push({mesh:mesh(st),M:M4.id(),col:[1,1,1],rim:0.12,spec:0.4});
  for(let r=0;r<4;r++)BX(g,[0,r*0.32-0.32,-2-r*1.6],[15.2,0.32,1.6],'#6a645a');
  // stone fence + master's grave larger at the centre-back
  for(let i=0;i<16;i++)BX(g,[-7.5+i,0,-8.8],[0.26,1.2,0.26],'#8a8680');BX(g,[0,1.0,-8.8],[16,0.14,0.2],'#8a8680');
  BX(g,[0,1.28,-8.0],[1.2,0.3,1.0],'#7a766e');BX(g,[0,1.58,-8.0],[0.7,1.5,0.6],'#9a968e');BX(g,[0,3.08,-8.0],[0.9,0.14,0.8],'#6a665e');
  // temple gate behind + trees
  for(const sd of [-1,1])BX(g,[sd*2.2,0,-15],[0.5,4.2,0.5],'#5a2a1a');BX(g,[0,4.2,-15],[6,0.4,0.8],'#3a1a10');tileRoof(g,0,4.6,-15,6.2,2,{pitch:0.5,ov:0.9,snow:sn});
  pine(g,-9,-10,1.4,1);pine(g,9,-9,1.2,2);pine(g,-11,-3,1.0,3);pine(g,11,-2,1.1,4);
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[]};}
// ---------- lighting moods ----------
const LIGHT5={
  morning:{sunDir:[-0.55,0.55,0.62],sunCol:[1.35,1.12,0.9],sky:[0.5,0.56,0.72],gnd:[0.42,0.4,0.32],fog:[0.86,0.86,0.9],fogD:0.008,fogH:0,skyTop:[0.34,0.56,0.9],skyHor:[0.9,0.86,0.82],skyBot:[0.7,0.7,0.7],cloud:0.6,sunSize:900,
    post:{bloom:0.22,thr:1.2,sat:1.18,expo:1.02,lift:[0.0,0.0,0.02],gain:[1.0,0.98,0.95],vig:0.9,ink:1}},
  hall:{sunDir:[0.3,0.9,0.3],sunCol:[0.55,0.45,0.3],sky:[0.5,0.38,0.24],gnd:[0.36,0.26,0.16],fog:[0.32,0.2,0.1],fogD:0.03,fogH:0,skyTop:[0.2,0.1,0.05],skyHor:[0.3,0.18,0.08],skyBot:[0.2,0.1,0.05],cloud:0,sunSize:3000,
    post:{bloom:0.45,thr:0.95,sat:1.15,expo:1.1,lift:[0.02,0.01,0.02],gain:[1.04,0.96,0.86],vig:1.1,ink:1}},
  golden:LIGHTS.golden,
  dusk:{sunDir:[0.8,0.18,-0.5],sunCol:[1.5,0.75,0.45],sky:[0.4,0.36,0.52],gnd:[0.4,0.28,0.24],fog:[0.9,0.6,0.5],fogD:0.012,fogH:0,skyTop:[0.3,0.32,0.6],skyHor:[1.0,0.6,0.42],skyBot:[0.6,0.4,0.36],cloud:0.8,sunSize:500,
    post:{bloom:0.35,thr:1.0,sat:1.15,expo:1.05,lift:[0.02,0.0,0.04],gain:[1.02,0.94,0.9],vig:1.0,ink:1}},
  streetNight:{sunDir:[0.3,0.7,0.4],sunCol:[0.22,0.28,0.55],sky:[0.14,0.14,0.3],gnd:[0.12,0.08,0.1],fog:[0.1,0.08,0.16],fogD:0.02,fogH:0,skyTop:[0.03,0.04,0.14],skyHor:[0.18,0.12,0.28],skyBot:[0.08,0.06,0.12],cloud:0.2,stars:1,sunSize:3000,sunGlow:[0.5,0.55,0.8],
    post:{bloom:0.85,thr:0.7,sat:1.2,expo:1.12,lift:[0.02,0.01,0.05],gain:[1.05,0.95,0.98],vig:1.15,ink:1}},
  day:{sunDir:[-0.6,0.62,0.48],sunCol:[1.4,1.2,0.98],sky:[0.5,0.56,0.72],gnd:[0.44,0.4,0.34],fog:[0.82,0.86,0.92],fogD:0.008,fogH:0,skyTop:[0.3,0.52,0.9],skyHor:[0.86,0.88,0.92],skyBot:[0.7,0.7,0.7],cloud:0.6,sunSize:900,
    post:{bloom:0.2,thr:1.2,sat:1.15,expo:1.0,lift:[0,0,0.02],gain:[1,0.98,0.96],vig:0.9,ink:1}},
  snowNight:{sunDir:[-0.35,0.75,0.45],sunCol:[0.42,0.5,0.85],sky:[0.22,0.26,0.46],gnd:[0.3,0.34,0.5],fog:[0.16,0.18,0.32],fogD:0.022,fogH:0,skyTop:[0.04,0.06,0.16],skyHor:[0.2,0.22,0.38],skyBot:[0.2,0.22,0.36],cloud:0.5,stars:0,sunGlow:[0.7,0.75,0.95],sunSize:2000,
    post:{bloom:0.7,thr:0.8,sat:1.12,expo:1.12,lift:[0.02,0.02,0.06],gain:[0.96,0.98,1.06],vig:1.15,ink:1}},
  shed:{sunDir:[0.1,0.3,1.0],sunCol:[0.25,0.3,0.6],sky:[0.08,0.08,0.14],gnd:[0.08,0.06,0.06],fog:[0.04,0.04,0.08],fogD:0.04,fogH:0,skyTop:[0.02,0.02,0.05],skyHor:[0.06,0.06,0.12],skyBot:[0.02,0.02,0.04],cloud:0,sunSize:3000,
    post:{bloom:0.8,thr:0.7,sat:1.15,expo:1.25,lift:[0.02,0.01,0.04],gain:[1.06,0.96,0.9],vig:1.3,ink:1}},
  dawnSnow:{sunDir:[0.7,0.28,0.6],sunCol:[1.3,0.85,0.7],sky:[0.5,0.52,0.7],gnd:[0.5,0.5,0.6],fog:[0.86,0.78,0.82],fogD:0.012,fogH:0,skyTop:[0.4,0.48,0.75],skyHor:[1.0,0.78,0.68],skyBot:[0.8,0.78,0.85],cloud:0.7,sunSize:600,
    post:{bloom:0.35,thr:1.0,sat:1.08,expo:1.05,lift:[0.02,0.02,0.05],gain:[1.02,0.98,0.98],vig:1.0,ink:1}},
};
const SETS={};
function getSet(k){if(SETS[k])return SETS[k];const f={castle:buildCastleExt,hall:buildHall,court:()=>{const S=buildCourtyard();return {court:S};},street:buildStreet,mansion:()=>buildMansion(0),mansionSnow:()=>buildMansion(1),rooms:buildRooms,shed:buildShed,grave:()=>buildGrave(0),graveSnow:()=>buildGrave(1)}[k];return SETS[k]=f();}
// ---------- modern bedroom (co-sleeping video) ----------
function buildBedroom(){texInit();const g=new Geo(),lg=new Geo(),D=[];
  TX.wood2=TX.wood2||cvTex(512,512,(x,w,h)=>{for(let i=0;i<6;i++){x.fillStyle=['#b88a5e','#a87c52','#c29468','#9e7048'][i%4];x.fillRect(0,i*86,w,86);x.strokeStyle='rgba(60,36,18,0.55)';x.lineWidth=3;x.beginPath();x.moveTo(0,i*86);x.lineTo(w,i*86);x.stroke();
    x.strokeStyle='rgba(80,50,26,0.22)';x.lineWidth=2;for(let k=0;k<7;k++){x.beginPath();const y=i*86+8+k*11;x.moveTo(0,y);x.bezierCurveTo(w*0.3,y+6*Math.sin(i+k),w*0.6,y-6,w,y+3);x.stroke();}const ox=(i%2)*256;x.strokeStyle='rgba(60,36,18,0.5)';x.lineWidth=3;x.beginPath();x.moveTo(ox+120,i*86);x.lineTo(ox+120,i*86+86);x.stroke();}},{repeat:1});
  TX.wall2=TX.wall2||cvTex(512,512,(x,w,h)=>{x.fillStyle='#8fa3c4';x.fillRect(0,0,w,h);speck(x,w,h,600,['rgba(255,255,255,0.12)','rgba(40,50,80,0.08)'],3);x.strokeStyle='rgba(255,255,255,0.09)';x.lineWidth=14;for(let i=0;i<w;i+=64){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();}},{repeat:1});
  TX.rug=TX.rug||cvTex(512,512,(x,w,h)=>{x.fillStyle='#d9cbb4';x.fillRect(0,0,w,h);x.strokeStyle='#b0563e';x.lineWidth=16;x.strokeRect(26,26,w-52,h-52);x.strokeStyle='#3e4a6a';x.lineWidth=6;x.strokeRect(52,52,w-104,h-104);for(let i=0;i<9;i++)for(let j=0;j<9;j++){if((i+j)%2)continue;x.fillStyle=(i*j)%3?'rgba(176,86,62,0.5)':'rgba(62,74,106,0.45)';x.save();x.translate(80+i*44,80+j*44);x.rotate(Math.PI/4);x.fillRect(-9,-9,18,18);x.restore();}speck(x,w,h,900,['rgba(255,255,255,0.2)','rgba(90,70,50,0.12)'],2);},{});
  TX.sheet=TX.sheet||cvTex(256,256,(x,w,h)=>{x.fillStyle='#f2efe8';x.fillRect(0,0,w,h);speck(x,w,h,300,['rgba(180,170,160,0.15)'],2);},{repeat:1});
  TX.art=TX.art||cvTex(512,320,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#283a6a');gr.addColorStop(0.6,'#c8708a');gr.addColorStop(1,'#f0b080');x.fillStyle=gr;x.fillRect(0,0,w,h);x.fillStyle='#fff3d8';x.beginPath();x.arc(w*0.7,h*0.32,34,0,TAU);x.fill();
    for(const [c,y0,a] of [['#3a3060',0.62,60],['#2a2448',0.74,40],['#1a1834',0.86,30]]){x.fillStyle=c;x.beginPath();x.moveTo(0,h);for(let i=0;i<=20;i++)x.lineTo(i*w/20,h*y0-Math.abs(Math.sin(i*0.9+a))*a);x.lineTo(w,h);x.fill();}},{});
  // floor + rug
  const fl=new Geo();G.plane(fl,M4.chain(M4.T(0,0,0),M4.S(8,1,10)),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.wood2,col:[0.95,0.9,0.86],spec:0.9,rim:0});
  const rg=new Geo();G.plane(rg,M4.chain(M4.T(0,0.012,-0.6),M4.S(3.4,1,3.0)),[1,1,1]);D.push({mesh:mesh(rg),M:M4.id(),tex:TX.rug,col:[1,1,1],rim:0});
  // walls (no shadow so moonlight reaches the bed)
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.35),M4.S(8,3.0,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-3.3,0,-0.5),M4.S(0.1,3.0,6)),[1,1,1],{base:1});
  G.box(wg,M4.chain(M4.T(3.3,0,-1.9),M4.S(0.1,3.0,0.9)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.3,0,1.2),M4.S(0.1,3.0,2.4)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.3,0,-0.6),M4.S(0.1,0.85,1.7)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.3,2.45,-0.6),M4.S(0.1,0.55,1.7)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.wall2,col:[1,1,1],rim:0,noShadow:1});
  BX(g,[0,0,-2.29],[8,0.14,0.04],'#f4f0e8');BX(g,[-3.25,0,-0.5],[0.04,0.14,6],'#f4f0e8');
  // window (right wall): frame, moonlit glass, curtains
  const glg=new Geo();G.box(glg,M4.chain(M4.T(3.32,0.85,-0.6),M4.S(0.02,1.6,1.7)),[1,1,1],{base:1});D.push({mesh:mesh(glg),M:M4.id(),col:[0.55,0.66,0.95],emis:[0.5,0.62,1.0],rim:0,noShadow:1});
  for(const z of [-1.45,-0.6,0.25])BX(g,[3.26,0.85,z],[0.08,1.6,0.06],'#f4f0e8');for(const y of [0.82,1.62,2.42])BX(g,[3.26,y,-0.6],[0.08,0.06,1.76],'#f4f0e8');
  const cg=new Geo();for(const [z0,dir] of [[-1.62,1],[0.42,-1]])for(let k=0;k<5;k++)G.cyl(cg,M4.chain(M4.T(3.12,0.05,z0+dir*k*0.09),M4.S(0.07,2.62,0.07)),[1,1,1],{seg:10});
  D.push({mesh:mesh(cg),M:M4.id(),col:[0.62,0.26,0.3],rim:0.15});BX(g,[3.12,2.68,-0.6],[0.04,0.04,2.6],'#2a2a30');
  // bed: frame, legs, upholstered headboard, mattress, sheet, pillows, folded throw
  BX(g,[0,0.12,-0.95],[1.9,0.26,2.24],'#6e4a32');for(const [x,z] of [[-0.88,-2.0],[0.88,-2.0],[-0.88,0.1],[0.88,0.1]])BX(g,[x,0,z],[0.1,0.14,0.1],'#3e2818');
  const hb=new Geo();G.box(hb,M4.chain(M4.T(0,0.3,-2.12),M4.S(2.0,1.1,0.12)),[1,1,1],{base:1});for(let i=0;i<5;i++)G.box(hb,M4.chain(M4.T(-0.8+i*0.4,0.42,-2.05),M4.S(0.36,0.92,0.06)),[1,1,1],{base:1});
  D.push({mesh:mesh(hb),M:M4.id(),col:[0.36,0.3,0.46],rim:0.2,spec:0.3});
  const mt=new Geo();G.box(mt,M4.chain(M4.T(0,0.38,-0.95),M4.S(1.84,0.2,2.16)),[1,1,1],{base:1});D.push({mesh:mesh(mt),M:M4.id(),tex:TX.sheet,col:[0.86,0.85,0.9],rim:0.15});
  const pg=new Geo();for(const x of [-0.45,0.45]){G.sphere(pg,M4.chain(M4.T(x,0.665,-1.78),M4.S(0.36,0.1,0.21)),[1,1,1]);}
  D.push({mesh:mesh(pg),M:M4.id(),col:[0.97,0.96,0.98],rim:0.25});
  // nightstands + lamps + books + phones
  for(const sd of [-1,1]){const x=sd*1.42;BX(g,[x,0,-1.95],[0.55,0.55,0.42],'#8a6244');BX(g,[x,0.24,-1.735],[0.46,0.02,0.01],'#3e2818');BX(g,[x+0.0,0.36,-1.73],[0.08,0.02,0.02],'#d8c8a0');
    G.cyl(g,M4.chain(M4.T(x-0.08,0.55,-2.0),M4.S(0.07,0.32,0.07)),'#c8b090',{seg:12});G.lathe(lg,M4.chain(M4.T(x-0.08,0.82,-2.0),M4.S(1)),'#ffffff',[[0.001,0.28],[0.1,0.28],[0.17,0.02],[0.001,0.02]],{seg:20});
    BX(g,[x+0.12,0.55,-1.88],[0.2,0.05,0.26],sd<0?'#a83c3c':'#3c5a8a');BX(g,[x+0.12,0.6,-1.88],[0.18,0.04,0.24],'#e8d8b0');BX(g,[x+0.15,0.64,-1.86],[0.08,0.012,0.15],'#16161c');}
  D.push({mesh:mesh(lg),M:M4.id(),col:[1,0.92,0.75],emis:[1.4,0.95,0.5],rim:0,noShadow:1});
  // framed art above bed, plant, wardrobe
  BX(g,[0,1.72,-2.28],[1.3,0.8,0.04],'#2a2018');const ag=new Geo();G.plane(ag,M4.chain(M4.T(0,2.12,-2.255),M4.RX(Math.PI/2),M4.S(1.2,1,0.7)),[1,1,1]);D.push({mesh:mesh(ag),M:M4.id(),tex:TX.art,col:[1,1,1],emis:[0.25,0.2,0.2],rim:0,noShadow:1});
  G.cyl(g,M4.chain(M4.T(-2.6,0,-1.8),M4.S(0.22,0.5,0.22)),'#c8714e',{seg:14,rt:0.8});for(let i=0;i<9;i++){const a=i*0.7;G.box(g,M4.chain(M4.T(-2.6,0.5,-1.8),M4.RY(a),M4.RZ(0.35+hash(i)*0.3),M4.S(0.07,0.75+hash(i*3)*0.3,0.02)),'#3e7a44',{base:1});}
  BX(g,[-2.9,0,0.2],[0.7,2.2,1.4],'#a07650');BX(g,[-2.54,0.2,0.2],[0.01,1.8,0.02],'#3e2818');for(const z of [0.0,0.4])BX(g,[-2.53,1.1,z],[0.03,0.2,0.03],'#d8c090');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[[-1.5,1.0,-1.85,3.4,[2.6,1.5,0.6]],[1.34,1.0,-1.85,3.4,[2.6,1.5,0.6]],[2.6,1.6,-0.6,4,[0.3,0.4,0.85]]]};}
LIGHT5.bedNight={sunDir:[0.85,0.5,0.25],sunCol:[0.6,0.72,1.25],sky:[0.09,0.1,0.22],gnd:[0.08,0.06,0.1],fog:[0.12,0.1,0.2],fogD:0.01,fogH:0,skyTop:[0.04,0.05,0.14],skyHor:[0.14,0.14,0.3],skyBot:[0.08,0.06,0.12],cloud:0,stars:0,sunSize:3000,sunGlow:[0.6,0.66,0.95],
  post:{bloom:0.32,thr:1.0,sat:1.25,expo:0.82,lift:[0.0,0.0,0.03],gain:[1.04,0.96,1.04],vig:1.25,ink:1}};
{const _gs=getSet;getSet=function(k){if(k==='bedroom'){return SETS.bedroom||(SETS.bedroom=buildBedroom());}return _gs(k);};}
// ---------- Milgram 1961: lab, learner room, Yale ----------
function genTex(){return TX.gen||(TX.gen=cvTex(1024,320,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#5c5f66');g.addColorStop(1,'#3e4046');x.fillStyle=g;x.fillRect(0,0,w,h);
  x.fillStyle='#d8d4c8';x.fillRect(30,24,w-60,46);x.fillStyle='#1a1a1e';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText('SHOCK GENERATOR  TYPE ZLB',w/2,58);
  const labs=['SLIGHT','MODERATE','STRONG','VERY STRONG','INTENSE','EXTREME','DANGER','XXX'];
  for(let i=0;i<30;i++){const xx=46+i*31.4;x.fillStyle='#e8e4d8';x.font='bold 11px sans-serif';x.fillText(String(15+i*15),xx,108);x.fillStyle=i>=28?'#7a1a1a':'#20232a';x.fillRect(xx-10,120,20,46);x.fillStyle='#c8c8cc';x.fillRect(xx-4,128,8,24);x.fillStyle=i>=20?'#ff5a3a':'#ffd060';x.beginPath();x.arc(xx,186,6,0,7);x.fill();}
  for(let k=0;k<8;k++){const x0=46+k*4*31.4-10,ww=k===7?2*31.4:4*31.4-6;x.fillStyle=k>=6?'#a82a20':'#d8d4c8';x.fillRect(x0,212,ww,30);x.fillStyle=k>=6?'#fff':'#1a1a1e';x.font='bold 13px sans-serif';x.fillText(labs[k],x0+ww/2,232);}
  x.fillStyle='#202226';x.beginPath();x.arc(150,282,24,0,7);x.fill();x.strokeStyle='#d8d4c8';x.lineWidth=3;x.stroke();x.fillStyle='#d8d4c8';x.fillRect(820,262,160,42);x.fillStyle='#1a1a1e';x.font='bold 18px sans-serif';x.fillText('VOLTAGE ENERGIZER',900,290);}));}
function buildLab(){texInit();const g=new Geo(),D=[];genTex();
  TX.block=TX.block||cvTex(512,512,(x,w,h)=>{x.fillStyle='#b8c4ae';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const ox=(r%2)*64;x.strokeStyle='rgba(60,70,55,0.45)';x.lineWidth=4;x.strokeRect(c*128+ox-64,r*64,128,64);}speck(x,w,h,900,['rgba(255,255,255,0.12)','rgba(40,50,35,0.12)'],2);},{repeat:1});
  TX.lino=TX.lino||cvTex(512,512,(x,w,h)=>{for(let i=0;i<8;i++)for(let j=0;j<8;j++){x.fillStyle=(i+j)%2?'#8a8070':'#a89c88';x.fillRect(i*64,j*64,64,64);}speck(x,w,h,900,['rgba(255,255,255,0.1)','rgba(0,0,0,0.1)'],2);},{repeat:1});
  const fl=new Geo();G.plane(fl,M4.chain(M4.S(10,1,10)),[1,1,1],{uv:6});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.lino,col:[0.95,0.95,0.9],spec:0.6,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.6),M4.S(10,3.2,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-3.4,0,0),M4.S(0.1,3.2,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.4,0,0),M4.S(0.1,3.2,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,0,3.6),M4.S(10,3.2,0.1)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.block,col:[1,1,1],rim:0,noShadow:1});
  // door to the learner's room (back wall, left)
  BX(g,[-2.0,0,-2.54],[1.0,2.15,0.06],'#6a5038');BX(g,[-2.0,0,-2.56],[1.12,2.22,0.03],'#3a3028');BX(g,[-1.62,1.0,-2.5],[0.06,0.06,0.06],'#c8b070');
  BX(g,[1.2,1.3,-2.55],[1.3,0.9,0.04],'#2a2a2e');BX(g,[-0.4,1.1,3.54],[1.6,1.0,0.04],'#2a2a2e');BX(g,[-0.4,1.14,3.52],[1.5,0.9,0.02],'#d8d0b8');BX(g,[1.6,0,3.54],[1.0,2.15,0.06],'#6a5038');BX(g,[1.2,1.32,-2.53],[1.2,0.8,0.02],'#ece8d8');// notice board
  // table with the shock generator
  BX(g,[0,0.74,0],[1.8,0.05,0.85],'#6e5038');for(const [x,z] of [[-0.85,-0.38],[0.85,-0.38],[-0.85,0.38],[0.85,0.38]])BX(g,[x,0,z],[0.06,0.74,0.06],'#4a3424');
  BX(g,[0,0.79,-0.1],[1.25,0.34,0.42],'#4a4c52');const gp=new Geo();G.plane(gp,M4.chain(M4.T(0,0.96,0.115),M4.RX(Math.PI/2),M4.S(1.22,1,0.31)),[1,1,1]);D.push({mesh:mesh(gp),M:M4.id(),tex:TX.gen,col:[1,1,1],rim:0,emis:[0.12,0.12,0.12]});
  BX(g,[0.78,0.79,0.05],[0.16,0.2,0.16],'#5a5040');BX(g,[0.78,0.99,0.05],[0.04,0.08,0.04],'#202020');// microphone
  // teacher chair
  BX(g,[0,0.45,0.85],[0.48,0.05,0.46],'#5a4030');BX(g,[0,0.45,1.06],[0.48,0.5,0.05],'#5a4030');for(const [x,z] of [[-0.2,0.66],[0.2,0.66],[-0.2,1.04],[0.2,1.04]])BX(g,[x,0,z],[0.04,0.45,0.04],'#3a2a20');
  // experimenter desk + chair (behind, right)
  BX(g,[2.1,0.72,-1.4],[1.3,0.05,0.7],'#7a5a40');BX(g,[2.1,0,-1.4],[1.24,0.72,0.64],'#6a4a34');BX(g,[2.0,0.77,-1.45],[0.32,0.02,0.24],'#f0ece0');BX(g,[2.4,0.77,-1.3],[0.2,0.06,0.28],'#2a2a2e');
  // filing cabinet, clock, ceiling lights
  BX(g,[-3.0,0,-1.6],[0.6,1.35,0.6],'#7a8478');for(const y of [0.3,0.72,1.12])BX(g,[-2.69,y,-1.6],[0.02,0.06,0.22],'#c8c8c0');
  const cl=new Geo();G.cyl(cl,M4.chain(M4.T(0.0,2.35,-2.54),M4.RX(Math.PI/2),M4.S(0.2,0.05,0.2)),[1,1,1],{seg:24});D.push({mesh:mesh(cl),M:M4.id(),col:[0.95,0.95,0.92],rim:0.1});
  const lg=new Geo();for(const x of [-1.2,1.2])G.box(lg,M4.chain(M4.T(x,3.0,-0.6),M4.S(0.3,0.04,1.4)),[1,1,1],{base:1});D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,0.95],emis:[1.6,1.65,1.5],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[[-1.2,2.7,-0.6,4.5,[1.1,1.15,1.0]],[1.2,2.7,-0.6,4.5,[1.1,1.15,1.0]]]};}
function buildLRoom(){texInit();const g=new Geo(),D=[];
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-1.8),M4.S(8,3.0,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-2.4,0,0),M4.S(0.1,3,6)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(2.4,0,0),M4.S(0.1,3,6)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.block||buildLab()&&TX.block,col:[0.86,0.86,0.82],rim:0,noShadow:1});
  const fl=new Geo();G.plane(fl,M4.S(8,1,8),[1,1,1],{uv:5});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.lino,col:[0.85,0.85,0.8],rim:0});
  // wooden chair with arm straps (the learner sits at x=0,z=-0.6)
  BX(g,[0,0.46,-0.6],[0.56,0.06,0.5],'#7a5434');BX(g,[0,0.46,-0.86],[0.56,0.62,0.06],'#7a5434');for(const sd of [-1,1]){BX(g,[sd*0.3,0.62,-0.6],[0.07,0.05,0.52],'#6a4a2c');BX(g,[sd*0.3,0.46,-0.36],[0.06,0.18,0.06],'#6a4a2c');}
  for(const [x,z] of [[-0.24,-0.38],[0.24,-0.38],[-0.24,-0.82],[0.24,-0.82]])BX(g,[x,0,z],[0.05,0.46,0.05],'#5a3c22');
  // answer box with four lights, small table, wall cable box
  BX(g,[0.75,0,-0.5],[0.5,0.7,0.45],'#6a5a48');BX(g,[0.75,0.7,-0.5],[0.36,0.12,0.24],'#3a3c42');
  const lb=new Geo();for(let i=0;i<4;i++)G.sphere(lb,M4.chain(M4.T(0.63+i*0.08,0.84,-0.4),M4.S(0.022)),[1,1,1]);D.push({mesh:mesh(lb),M:M4.id(),col:[1,0.9,0.6],emis:[1.4,1.0,0.4],rim:0,noShadow:1});
  BX(g,[-0.9,1.0,-1.74],[0.3,0.4,0.1],'#4a4c52');BX(g,[-0.9,0.0,-1.74],[0.04,1.0,0.04],'#1a1a1a');
  const bl=new Geo();G.sphere(bl,M4.chain(M4.T(0,2.55,-0.6),M4.S(0.09)),[1,1,1]);D.push({mesh:mesh(bl),M:M4.id(),col:[1,0.95,0.8],emis:[2,1.8,1.2],rim:0,noShadow:1});
  BX(g,[0,2.6,-0.6],[0.01,0.4,0.01],'#111');
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});
  return {D,pts:[[0,2.4,-0.6,3.4,[1.4,1.25,0.9]]]};}
function buildYale(){texInit();const g=new Geo(),D=[];
  TX.ystone=TX.ystone||cvTex(512,512,(x,w,h)=>{x.fillStyle='#9a7a64';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let c=0;c<6;c++){const ox=(r%2)*42;x.fillStyle=['#a8866c','#94725c','#b0907a','#8a6a56'][(r*3+c)%4];x.fillRect(c*86+ox-43+2,r*32+2,82,28);}speck(x,w,h,1400,['rgba(255,255,255,0.1)','rgba(30,20,10,0.15)'],2);},{repeat:1});
  TX.grass=TX.grass||cvTex(256,256,(x,w,h)=>{x.fillStyle='#5a7a3a';x.fillRect(0,0,w,h);speck(x,w,h,1500,['rgba(140,180,80,0.3)','rgba(30,50,20,0.3)'],2);},{repeat:1});
  const gr=new Geo();G.plane(gr,M4.S(40,1,40),[1,1,1],{uv:10});D.push({mesh:mesh(gr),M:M4.id(),tex:TX.grass,col:[1,1,1],rim:0});
  const pth=new Geo();G.plane(pth,M4.chain(M4.T(0,0.01,2),M4.S(2.4,1,14)),[1,1,1],{uv:3});D.push({mesh:mesh(pth),M:M4.id(),tex:TX.lino||cvTex(8,8,(x)=>{x.fillStyle='#bbb';x.fillRect(0,0,8,8);}),col:[0.85,0.82,0.78],rim:0});
  // stone hall: main block, tower, buttresses, gothic arched windows, entrance arch, roof
  const st=new Geo();G.box(st,M4.chain(M4.T(0,0,-4),M4.S(14,7,3)),[1,1,1],{base:1,uvs:[7,4]});G.box(st,M4.chain(M4.T(0,0,-3.2),M4.S(3.4,11,3)),[1,1,1],{base:1,uvs:[2,6]});for(const x of [-6.5,-4.5,-2.3,2.3,4.5,6.5])G.box(st,M4.chain(M4.T(x,0,-2.4),M4.S(0.5,6.5,0.4)),[1,1,1],{base:1,uvs:[0.4,4]});
  D.push({mesh:mesh(st),M:M4.id(),tex:TX.ystone,col:[1,1,1],rim:0.15});
  const win=new Geo();for(const x of [-5.5,-3.4,3.4,5.5])for(const y of [1.2,4.0]){G.box(win,M4.chain(M4.T(x,y,-2.48),M4.S(1.0,1.8,0.05)),[1,1,1],{base:1});G.cyl(win,M4.chain(M4.T(x,y+1.8,-2.48),M4.RX(Math.PI/2),M4.S(0.5,0.05,0.5)),[1,1,1],{seg:16});}
  for(const y of [5.0,7.6])G.box(win,M4.chain(M4.T(0,y,-1.68),M4.S(1.2,1.8,0.05)),[1,1,1],{base:1});D.push({mesh:mesh(win),M:M4.id(),col:[0.35,0.42,0.5],emis:[0.25,0.22,0.12],spec:1,rim:0.2});
  BX(g,[0,0,-1.68],[1.6,2.6,0.06],'#3a2a20');BX(g,[0,0,-1.6],[2.2,3.2,0.05],'#8a6a56');for(const s of [0,1,2])BX(g,[0,s*0.14,-1.3+s*0.3],[3.0-s*0.2,0.14,0.6],'#a8a090');
  BX(g,[-7,7,-4],[14,0.3,3.2],'#6a5a50');for(let i=0;i<7;i++)BX(g,[-1.7+i*0.55,11,-3.2],[0.28,0.6,3.0],'#8a6a56');
  // trees and lamp posts
  const tr=new Geo(),lv=new Geo();for(const [x,z] of [[-5,1],[5.5,0.5],[-7.5,-0.5]]){G.cyl(tr,M4.chain(M4.T(x,0,z),M4.S(0.22,2.6,0.22)),[1,1,1],{seg:8});for(let k=0;k<6;k++)G.sphere(lv,M4.chain(M4.T(x+(hash(k+x)-0.5)*1.6,3.0+hash(k*2+z)*1.2,z+(hash(k*3)-0.5)*1.4),M4.S(1.0+hash(k)*0.4)),[1,1,1]);}
  D.push({mesh:mesh(tr),M:M4.id(),col:[0.36,0.26,0.18],rim:0.1});D.push({mesh:mesh(lv),M:M4.id(),col:[0.42,0.56,0.26],rim:0.2});
  for(const x of [-1.8,1.8]){BX(g,[x,0,1.5],[0.08,2.6,0.08],'#1e1e22');BX(g,[x,2.6,1.5],[0.24,0.3,0.24],'#2a2a2e');}
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.12});return {D,pts:[]};}
LIGHT5.labCold={sunDir:[0.3,0.9,0.4],sunCol:[0.5,0.52,0.5],sky:[0.42,0.45,0.42],gnd:[0.3,0.28,0.24],fog:[0.3,0.32,0.3],fogD:0.008,fogH:0,skyTop:[0.3,0.32,0.3],skyHor:[0.3,0.32,0.3],skyBot:[0.2,0.2,0.2],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.3,thr:1.0,sat:1.0,expo:0.95,lift:[0.0,0.01,0.01],gain:[1.0,1.02,0.98],vig:1.2,ink:1}};
LIGHT5.lroom={sunDir:[0.2,0.95,0.3],sunCol:[0.25,0.22,0.18],sky:[0.16,0.15,0.14],gnd:[0.1,0.09,0.08],fog:[0.1,0.09,0.08],fogD:0.01,fogH:0,skyTop:[0.1,0.1,0.1],skyHor:[0.1,0.1,0.1],skyBot:[0.05,0.05,0.05],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.5,thr:0.9,sat:1.05,expo:1.0,lift:[0.0,0.0,0.0],gain:[1.05,1.0,0.94],vig:1.4,ink:1}};
LIGHT5.yaleDay={sunDir:[-0.6,0.6,0.55],sunCol:[1.5,1.32,1.05],sky:[0.4,0.48,0.62],gnd:[0.26,0.26,0.18],fog:[0.6,0.66,0.74],fogD:0.012,fogH:0,skyTop:[0.32,0.5,0.82],skyHor:[0.72,0.8,0.88],skyBot:[0.5,0.55,0.5],cloud:0.5,stars:0,sunSize:900,sunGlow:[1,0.9,0.7],
  post:{bloom:0.4,thr:0.95,sat:1.12,expo:1.0,lift:[0.0,0.0,0.01],gain:[1.03,1.0,0.96],vig:1.1,ink:1}};
{const _gs2=getSet;getSet=function(k){if(k==='lab')return SETS.lab||(SETS.lab=buildLab());if(k==='lroom'){if(!SETS.lab)SETS.lab=buildLab();return SETS.lroom||(SETS.lroom=buildLRoom());}if(k==='yale')return SETS.yale||(SETS.yale=buildYale());return _gs2(k);};}
// ---------- 1999 London lab with the tickle robot ----------
function buildTLab(){texInit();const g=new Geo(),D=[];
  TX.panel=TX.panel||cvTex(512,512,(x,w,h)=>{x.fillStyle='#e6e8ea';x.fillRect(0,0,w,h);x.strokeStyle='rgba(120,130,140,0.35)';x.lineWidth=4;for(let i=0;i<=4;i++){x.beginPath();x.moveTo(i*128,0);x.lineTo(i*128,h);x.stroke();}x.beginPath();x.moveTo(0,256);x.lineTo(w,256);x.stroke();speck(x,w,h,500,['rgba(0,0,0,0.05)'],2);},{repeat:1});
  TX.vinyl=TX.vinyl||cvTex(512,512,(x,w,h)=>{x.fillStyle='#9aa4ae';x.fillRect(0,0,w,h);speck(x,w,h,2500,['rgba(255,255,255,0.15)','rgba(30,40,50,0.15)'],2);},{repeat:1});
  TX.scope=TX.scope||cvTex(256,192,(x,w,h)=>{x.fillStyle='#0a1a14';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,255,160,0.25)';x.lineWidth=1;for(let i=0;i<w;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();}for(let i=0;i<h;i+=32){x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke();}x.strokeStyle='#4dffa8';x.lineWidth=3;x.beginPath();for(let i=0;i<w;i++){const y=h/2+Math.sin(i*0.12)*30*Math.sin(i*0.02);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();});
  const fl=new Geo();G.plane(fl,M4.S(10,1,10),[1,1,1],{uv:6});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.vinyl,col:[1,1,1],spec:0.7,rim:0});
  const wg=new Geo();G.box(wg,M4.chain(M4.T(0,0,-2.4),M4.S(10,3.2,0.1)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(-3.2,0,0),M4.S(0.1,3.2,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(3.2,0,0),M4.S(0.1,3.2,8)),[1,1,1],{base:1});G.box(wg,M4.chain(M4.T(0,0,3.6),M4.S(10,3.2,0.1)),[1,1,1],{base:1});
  D.push({mesh:mesh(wg),M:M4.id(),tex:TX.panel,col:[1,1,1],rim:0,noShadow:1});
  // lab bench, participant chair, robot arm on a base, the stick handle (left side)
  BX(g,[0,0.74,-0.6],[2.2,0.06,0.9],'#f2f2f0');BX(g,[0,0,-0.6],[2.1,0.74,0.84],'#b8c0c8');BX(g,[0,0.3,-0.17],[2.1,0.02,0.01],'#8a929a');
  BX(g,[0.55,0.8,-0.75],[0.3,0.08,0.3],'#3a4048');
  BX(g,[-0.55,0.8,-0.6],[0.22,0.06,0.22],'#2a2e34');G.cyl(g,M4.chain(M4.T(-0.55,0.86,-0.6),M4.S(0.02,0.22,0.02)),'#c8c8cc',{seg:10});G.sphere(g,M4.chain(M4.T(-0.55,1.1,-0.6),M4.S(0.04)),'#d83a3a');
  // monitors with signal traces, keyboard, cables, shelf with boxes, poster
  for(const [x,y] of [[-1.5,1.05],[1.6,1.05]]){BX(g,[x,0.77,-1.0],[0.5,0.04,0.3],'#2a2a2e');BX(g,[x,0.81,-1.0],[0.08,0.2,0.08],'#2a2a2e');BX(g,[x,1.0,-1.0],[0.62,0.42,0.06],'#1a1c20');const sc=new Geo();G.plane(sc,M4.chain(M4.T(x,1.21,-0.965),M4.RX(Math.PI/2),M4.S(0.56,1,0.36)),[1,1,1]);D.push({mesh:mesh(sc),M:M4.id(),tex:TX.scope,col:[1,1,1],emis:[0.9,0.9,0.9],rim:0,noShadow:1});}
  BX(g,[-1.0,0.77,-0.4],[0.5,0.03,0.18],'#3a3a40');for(const y of [1.6,2.1])BX(g,[-2.2,y,-2.3],[1.6,0.04,0.25],'#b0b8c0');for(let i=0;i<6;i++)BX(g,[-2.8+i*0.24,1.64,-2.3],[0.2,0.3,0.2],['#c8a070','#7a9ac8','#e0e0e0','#c86a5a','#8ac87a','#d8c070'][i]);
  BX(g,[1.4,1.4,-2.34],[1.0,0.7,0.02],'#f4f0e0');BX(g,[1.4,1.4,-2.33],[0.9,0.6,0.01],'#5a7ab8');
  TX.wb=TX.wb||cvTex(512,256,(x,w,h)=>{x.fillStyle='#f8f8f6';x.fillRect(0,0,w,h);x.strokeStyle='#2a4ab8';x.lineWidth=4;x.font='bold 34px sans-serif';x.fillStyle='#2a4ab8';x.fillText('SELF vs EXTERNAL',30,50);x.beginPath();x.moveTo(40,200);x.lineTo(470,200);x.moveTo(40,200);x.lineTo(40,80);x.stroke();
    x.strokeStyle='#c83a3a';x.beginPath();x.moveTo(40,190);for(let i=0;i<=8;i++)x.lineTo(40+i*54,190-i*i*1.6);x.stroke();x.fillStyle='#c83a3a';x.font='bold 22px sans-serif';x.fillText('delay (ms) →',300,235);x.fillText('tickle',50,100);});
  BX(g,[0.3,0.9,3.53],[2.2,1.2,0.04],'#c8ccd0');const wb=new Geo();G.plane(wb,M4.chain(M4.T(0.3,1.5,3.5),M4.RZ(Math.PI),M4.RX(-Math.PI/2),M4.S(2.1,1,1.1)),[1,1,1]);D.push({mesh:mesh(wb),M:M4.id(),tex:TX.wb,col:[1,1,1],emis:[0.15,0.15,0.15],rim:0,noShadow:1});
  BX(g,[1.8,0,3.52],[1.0,2.15,0.06],'#7a8a9a');BX(g,[1.4,1.0,3.47],[0.06,0.06,0.06],'#c8c8c8');BX(g,[2.7,0,3.2],[0.8,1.9,0.6],'#d8dce0');for(const y of [0.6,1.2])BX(g,[2.7,y,2.88],[0.7,0.02,0.02],'#9aa4ae');
  // stool for the participant
  BX(g,[0,0.5,0.3],[0.42,0.06,0.42],'#3a4a6a');G.cyl(g,M4.chain(M4.T(0,0,0.3),M4.S(0.04,0.5,0.04)),'#8a8a90',{seg:10});G.cyl(g,M4.chain(M4.T(0,0,0.3),M4.S(0.24,0.03,0.24)),'#5a5a60',{seg:16});
  const lg=new Geo();for(const x of [-1.3,1.3])G.box(lg,M4.chain(M4.T(x,3.05,-0.4),M4.S(0.3,0.04,1.6)),[1,1,1],{base:1});D.push({mesh:mesh(lg),M:M4.id(),col:[1,1,1],emis:[1.8,1.8,1.75],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.14});return {D,pts:[[-1.3,2.8,-0.4,4.5,[1.1,1.1,1.1]],[1.3,2.8,-0.4,4.5,[1.1,1.1,1.1]]]};}
LIGHT5.labWhite={sunDir:[0.3,0.9,0.4],sunCol:[0.55,0.55,0.55],sky:[0.5,0.52,0.56],gnd:[0.32,0.32,0.34],fog:[0.6,0.62,0.66],fogD:0.006,fogH:0,skyTop:[0.5,0.5,0.5],skyHor:[0.5,0.5,0.5],skyBot:[0.3,0.3,0.3],cloud:0,stars:0,sunSize:3000,sunGlow:[0,0,0],
  post:{bloom:0.35,thr:1.0,sat:1.08,expo:1.0,lift:[0.0,0.01,0.02],gain:[1.0,1.0,1.02],vig:1.1,ink:1}};
LIGHT5.bedDay={sunDir:[0.85,0.5,0.25],sunCol:[1.7,1.45,1.1],sky:[0.42,0.46,0.6],gnd:[0.3,0.26,0.24],fog:[0.6,0.6,0.7],fogD:0.004,fogH:0,skyTop:[0.5,0.7,0.95],skyHor:[0.8,0.85,0.95],skyBot:[0.5,0.45,0.4],cloud:0.3,stars:0,sunSize:900,sunGlow:[1,0.9,0.7],
  post:{bloom:0.45,thr:0.95,sat:1.15,expo:1.0,lift:[0.0,0.0,0.01],gain:[1.04,1.0,0.96],vig:1.0,ink:1}};
{const _gs3=getSet;getSet=function(k){if(k==='tlab')return SETS.tlab||(SETS.tlab=buildTLab());return _gs3(k);};}
