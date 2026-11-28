// ===== hair3d: per-character hairstyles with volumetric shading =====
// K.hairStyle: men  fringe | sidepart | quiff | buzz | curly | slick
//              women long | wavy | bob | ponytail | bun
const STYLE_OF=k=>k.hairStyle||(k.longHair?'long':'fringe');
function hairShade(c,R,s,col,draw,o={}){ // fill a hair shape with 3D shading
  const lx=L2.dx*R*0.35;const g=c.createRadialGradient(lx,-R*0.85,R*0.05,0,-R*0.2,R*1.7);g.addColorStop(0,shd2(col,0.55));g.addColorStop(0.28,shd2(col,0.2));g.addColorStop(0.62,col);g.addColorStop(1,shd2(col,-0.6));
  c.save();draw();c.fillStyle=g;c.fill();
  c.save();draw();c.clip();
  const ao=c.createLinearGradient(0,(o.aoY??-R*0.2)-R*0.35,0,(o.aoY??-R*0.2)+R*0.1);ao.addColorStop(0,'rgba(0,0,0,0)');ao.addColorStop(1,'rgba(0,0,0,0.5)');c.fillStyle=ao;c.fillRect(-R*2,-R*2,R*4,R*4);
  c.fillStyle='rgba(0,0,0,0.18)';c.beginPath();c.ellipse(-L2.dx*R*0.95,R*0.1,R*0.6,R*1.6,0,0,TAU);c.fill();
  // anisotropic specular band
  for(const [w,a] of [[R*0.26,0.12],[R*0.12,0.22],[R*0.05,0.6]]){c.strokeStyle=`rgba(255,248,235,${a})`;c.lineWidth=w;c.lineCap='round';c.beginPath();c.arc(L2.dx*R*0.05,-R*0.05,R*(o.specR||0.92),L2.dx>0?-2.0:-2.45,L2.dx>0?-0.7:-1.15);c.stroke();}
  c.strokeStyle='rgba(0,0,0,0.0)';c.lineWidth=1.6*s;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*R*0.22,-R*1.3);c.quadraticCurveTo(i*R*0.3,-R*0.6,i*R*0.26,R*0.4);c.stroke();}
  c.strokeStyle='rgba(255,240,220,0.10)';for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*R*0.22+R*0.07,-R*1.3);c.quadraticCurveTo(i*R*0.3+R*0.07,-R*0.6,i*R*0.26+R*0.07,R*0.4);c.stroke();}
  c.restore();
  draw();c.strokeStyle=K2;c.lineWidth=4*s;c.lineJoin='round';c.stroke();
  c.save();draw();c.clip();c.strokeStyle=L2.rim;c.globalAlpha=0.7;c.lineWidth=5*s;c.beginPath();c.arc(L2.dx*-R*0.06,0,R*1.18,L2.dx>0?-1.3:Math.PI+0.3,L2.dx>0?-0.3:Math.PI+1.3);c.stroke();c.restore();c.restore();}
function hairlineAO(c,R,s,y){c.save();c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.clip();const g=c.createLinearGradient(0,y,0,y+R*0.28);g.addColorStop(0,'rgba(30,20,30,0.35)');g.addColorStop(1,'rgba(30,20,30,0)');c.fillStyle=g;c.fillRect(-R,y,2*R,R*0.3);c.restore();}
// front geometry is authored facing right (+x); views mirror/shift it
function viewXf(c,R,f,vw){if(vw==='front')return;if(vw==='side'){c.translate(-f*R*0.26,0);c.scale(f*0.82,1);}else{c.translate(-f*R*0.07,0);c.scale(f*0.95,1);}}
const HAIR={
  fringe:{path:(c,R)=>{c.moveTo(-R*1.08,R*0.12);c.bezierCurveTo(-R*1.3,-R*1.35,R*1.3,-R*1.35,R*1.08,R*0.0);c.bezierCurveTo(R*0.9,-R*0.2,R*0.7,-R*0.36,R*0.5,-R*0.22);c.bezierCurveTo(R*0.3,-R*0.42,R*0.1,-R*0.3,-R*0.1,-R*0.2);c.bezierCurveTo(-R*0.35,-R*0.4,-R*0.6,-R*0.3,-R*0.75,-R*0.18);c.bezierCurveTo(-R*0.9,-R*0.1,-R*0.95,R*0.05,-R*1.08,R*0.12);c.closePath();}},
  sidepart:{path:(c,R)=>{c.moveTo(-R*1.08,R*0.15);c.bezierCurveTo(-R*1.28,-R*1.3,R*1.2,-R*1.38,R*1.08,-R*0.05);c.bezierCurveTo(R*0.95,-R*0.35,R*0.5,-R*0.55,R*0.05,-R*0.5);c.bezierCurveTo(-R*0.4,-R*0.45,-R*0.75,-R*0.25,-R*0.88,-R*0.05);c.quadraticCurveTo(-R*0.95,R*0.1,-R*1.08,R*0.15);c.closePath();},
    detail:(c,R,s)=>{c.strokeStyle='rgba(0,0,0,0.45)';c.lineWidth=2.4*s;c.beginPath();c.moveTo(-R*0.35,-R*1.08);c.quadraticCurveTo(-R*0.3,-R*0.8,-R*0.42,-R*0.6);c.stroke();}},
  quiff:{path:(c,R)=>{c.moveTo(-R*1.05,R*0.0);c.bezierCurveTo(-R*1.2,-R*1.1,-R*0.4,-R*1.25,R*0.0,-R*1.28);c.bezierCurveTo(R*0.4,-R*1.62,R*1.15,-R*1.45,R*0.95,-R*0.95);c.bezierCurveTo(R*0.85,-R*0.65,R*0.55,-R*0.62,R*0.3,-R*0.6);c.bezierCurveTo(-R*0.2,-R*0.6,-R*0.7,-R*0.5,-R*0.92,-R*0.2);c.quadraticCurveTo(-R*0.98,-R*0.05,-R*1.05,R*0.0);c.closePath();},specR:1.05},
  buzz:{path:(c,R)=>{c.moveTo(-R*1.02,-R*0.1);c.bezierCurveTo(-R*1.12,-R*1.22,R*1.12,-R*1.22,R*1.02,-R*0.1);c.bezierCurveTo(R*0.8,-R*0.45,R*0.4,-R*0.55,0,-R*0.55);c.bezierCurveTo(-R*0.4,-R*0.55,-R*0.8,-R*0.45,-R*1.02,-R*0.1);c.closePath();},flat:1},
  curly:{path:(c,R)=>{const n=11;c.moveTo(-R*1.1,R*0.15);for(let i=0;i<=n;i++){const a=Math.PI*(1.05+i/n*0.9),r=R*1.18;const x=Math.cos(a)*r,y=Math.sin(a)*r-R*0.1;c.quadraticCurveTo(Math.cos(a-0.07)*r*1.12,Math.sin(a-0.07)*r*1.12-R*0.1,x,y);}
    c.quadraticCurveTo(R*1.05,-R*0.1,R*1.1,R*0.15);for(let i=0;i<6;i++){const x=R*0.9-i*R*0.36;c.quadraticCurveTo(x-R*0.06,-R*0.18,x-R*0.18,-R*0.32);c.quadraticCurveTo(x-R*0.3,-R*0.16,x-R*0.36,-R*0.3);}c.quadraticCurveTo(-R*1.05,-R*0.05,-R*1.1,R*0.15);c.closePath();},
    detail:(c,R,s,col)=>{c.strokeStyle=shd2(col,-0.45);c.lineWidth=2.2*s;for(let i=0;i<14;i++){const x=(hash(i)-0.5)*R*1.7,y=-R*0.55-hash(i*3)*R*0.6;c.beginPath();c.arc(x,y,R*0.1,0.4,Math.PI*1.6);c.stroke();}}},
  slick:{path:(c,R)=>{c.moveTo(-R*1.06,R*0.05);c.bezierCurveTo(-R*1.2,-R*1.3,R*1.25,-R*1.32,R*1.0,-R*0.4);c.bezierCurveTo(R*0.8,-R*0.62,R*0.35,-R*0.68,0,-R*0.66);c.bezierCurveTo(-R*0.5,-R*0.62,-R*0.85,-R*0.4,-R*0.95,-R*0.15);c.quadraticCurveTo(-R*1.0,0,-R*1.06,R*0.05);c.closePath();},
    detail:(c,R,s)=>{c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=2*s;for(let i=0;i<5;i++){c.beginPath();c.moveTo(R*(0.7-i*0.3),-R*0.68);c.quadraticCurveTo(R*(0.5-i*0.32),-R*1.05,R*(0.0-i*0.3),-R*1.2);c.stroke();}}},
  long:{path:(c,R)=>{c.moveTo(-R*1.1,R*0.2);c.bezierCurveTo(-R*1.3,-R*1.35,R*1.3,-R*1.35,R*1.1,R*0.2);c.bezierCurveTo(R*1.02,-R*0.1,R*0.8,-R*0.45,R*0.45,-R*0.5);c.bezierCurveTo(R*0.25,-R*0.55,R*0.1,-R*0.66,R*0.03,-R*0.78);
    c.bezierCurveTo(-R*0.1,-R*0.6,-R*0.35,-R*0.48,-R*0.6,-R*0.42);c.bezierCurveTo(-R*0.85,-R*0.35,-R*1.0,-R*0.1,-R*1.1,R*0.2);c.closePath();},
    detail:(c,R,s)=>{c.strokeStyle='rgba(0,0,0,0.4)';c.lineWidth=2.4*s;c.beginPath();c.moveTo(R*0.03,-R*0.8);c.lineTo(R*0.05,-R*1.15);c.stroke();}},
  wavy:{same:'long'},
  bob:{path:(c,R)=>{c.moveTo(-R*1.14,R*0.45);c.bezierCurveTo(-R*1.32,-R*1.3,R*1.32,-R*1.3,R*1.14,R*0.45);c.quadraticCurveTo(R*1.0,R*0.55,R*0.92,R*0.35);c.bezierCurveTo(R*0.9,-R*0.1,R*0.8,-R*0.3,R*0.6,-R*0.3);
    for(let i=0;i<4;i++){const x=R*0.6-i*R*0.3;c.quadraticCurveTo(x-R*0.15,-R*0.24,x-R*0.3,-R*0.3);}c.bezierCurveTo(-R*0.8,-R*0.3,-R*0.9,-R*0.1,-R*0.92,R*0.35);c.quadraticCurveTo(-R*1.0,R*0.55,-R*1.14,R*0.45);c.closePath();}},
  ponytail:{same:'slick',specR:0.95},
  bun:{same:'slick'},
};
function styleOf(k){const st=HAIR[STYLE_OF(k)]||HAIR.fringe;return st.same?{...HAIR[st.same],...st,detail:st.detail||HAIR[st.same].detail}:st;}
// front layer (replaces earlier hair layers)
hairLayer=function(c,R,s,f,o,K){const name=STYLE_OF(K),st=styleOf(K),col=K.hair||'#3a2a20',vw=o.back?'back':(o.view||'3q');
  if(vw==='back'){hairShade(c,R,s,col,()=>{c.beginPath();c.moveTo(-R*1.1,R*0.25);c.bezierCurveTo(-R*1.3,-R*1.35,R*1.3,-R*1.35,R*1.1,R*0.25);c.quadraticCurveTo(R*0.7,R*(name==='buzz'?0.35:0.75),0,R*(name==='buzz'?0.4:0.72));c.quadraticCurveTo(-R*0.7,R*(name==='buzz'?0.35:0.75),-R*1.1,R*0.25);c.closePath();},{aoY:R*0.6});return;}
  // back mass: in 3/4 and side views the hair must wrap the crown and the whole back of the head down to the nape
  if(vw!=='front'){const nape=name==='buzz'?0.35:name==='bob'?0.7:0.58;c.save();viewXf(c,R,f,vw==='side'?'3q':vw);hairShade(c,R,s,col,()=>{c.beginPath();c.moveTo(R*0.35,-R*1.0);c.bezierCurveTo(-R*0.3,-R*1.35,-R*1.32,-R*0.9,-R*1.16,-R*0.1);
    c.bezierCurveTo(-R*1.1,R*0.35,-R*0.9,R*(nape+0.05),-R*0.62,R*nape);c.bezierCurveTo(-R*0.4,R*(nape-0.05),-R*0.3,R*0.25,-R*0.32,R*0.0);c.bezierCurveTo(-R*0.3,-R*0.35,R*0.0,-R*0.6,R*0.35,-R*0.62);c.closePath();},{aoY:R*0.5});c.restore();}
  hairlineAO(c,R,s,name==='quiff'||name==='slick'||name==='buzz'||name==='ponytail'||name==='bun'?-R*0.62:-R*0.32);
  c.save();viewXf(c,R,f,vw);hairShade(c,R,s,col,()=>{c.beginPath();st.path(c,R);},{specR:st.specR,aoY:-R*0.35});if(st.detail){c.save();c.beginPath();st.path(c,R);c.clip();st.detail(c,R,s,col);c.restore();}c.restore();};
// behind-head layer: long hair, ponytail, bun, bob back, curly volume
longHair2=function(c,hc,s,f,o,K,HR){const name=STYLE_OF(K);if(!['long','wavy','bob','ponytail','bun'].includes(name))return;const R=HR*s,col=K.hair||'#4a2418',vw=o.back?'back':(o.view||'3q');
  c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);const bx=vw==='side'?-f*R*0.4:vw==='3q'?-f*R*0.12:0;const back=shd2(col,-0.3);
  const fillS=(fn)=>{c.save();c.beginPath();fn();const g=c.createLinearGradient(-R*1.3,0,R*1.3,0);g.addColorStop(L2.dx>0?0:1,shd2(back,-0.4));g.addColorStop(L2.dx>0?1:0,shd2(back,0.15));c.fillStyle=g;c.fill();c.strokeStyle=K2;c.lineWidth=4*s;c.stroke();
    c.clip();c.strokeStyle='rgba(255,230,210,0.14)';c.lineWidth=2.2*s;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(bx+i*R*0.26,-R*0.6);c.quadraticCurveTo(bx+i*R*0.34+(name==='wavy'?Math.sin(i)*R*0.2:0),R*0.6,bx+i*R*0.3,R*1.9);c.stroke();}c.restore();};
  if(name==='long'||name==='wavy'){const wd=vw==='side'?R*1.05:R*1.3,wv=name==='wavy';fillS(()=>{c.moveTo(bx-wd,-R*0.3);c.quadraticCurveTo(bx-wd*1.12,-R*1.35,bx,-R*1.25);c.quadraticCurveTo(bx+wd*1.12,-R*1.35,bx+wd,-R*0.3);
      if(wv){for(let i=0;i<4;i++)c.quadraticCurveTo(bx+wd*(1.15-(i%2)*0.2),-R*0.1+i*R*0.5,bx+wd*(1.02-(i%2)*0.1),R*0.15+i*R*0.5);}else c.quadraticCurveTo(bx+wd*1.12,R*1.1,bx+wd*0.82,R*1.85);
      c.quadraticCurveTo(bx,R*2.0,bx-wd*0.82,R*1.85);if(wv){for(let i=3;i>=0;i--)c.quadraticCurveTo(bx-wd*(1.15-(i%2)*0.2),R*0.15+i*R*0.5,bx-wd*(1.02-(i%2)*0.1),-R*0.1+i*R*0.5);}else c.quadraticCurveTo(bx-wd*1.12,R*1.1,bx-wd,-R*0.3);c.closePath();});}
  else if(name==='bob'){fillS(()=>{c.moveTo(bx-R*1.2,-R*0.2);c.quadraticCurveTo(bx-R*1.3,-R*1.3,bx,-R*1.25);c.quadraticCurveTo(bx+R*1.3,-R*1.3,bx+R*1.2,-R*0.2);c.quadraticCurveTo(bx+R*1.25,R*0.65,bx+R*0.95,R*0.75);c.lineTo(bx-R*0.95,R*0.75);c.quadraticCurveTo(bx-R*1.25,R*0.65,bx-R*1.2,-R*0.2);c.closePath();});}
  else if(name==='ponytail'){const tx=vw==='front'?R*0.95:-f*R*1.05,ty=-R*0.35,sway=Math.sin((o.t||0)*3)*R*0.06;fillS(()=>{c.moveTo(tx-R*0.18,ty-R*0.15);c.quadraticCurveTo(tx+(vw==='front'?R*0.5:-f*R*0.6)+sway,ty+R*0.5,tx+(vw==='front'?R*0.25:-f*R*0.35)+sway,ty+R*1.6);c.quadraticCurveTo(tx+(vw==='front'?R*0.05:-f*R*0.1),ty+R*0.9,tx+R*0.1,ty+R*0.05);c.closePath();});
    c.fillStyle='#c83a5a';c.strokeStyle=K2;c.lineWidth=2.5*s;c.beginPath();c.ellipse(tx,ty-R*0.05,R*0.12,R*0.1,0,0,TAU);c.fill();c.stroke();}
  else if(name==='bun'){const bxx=vw==='front'?0:-f*R*0.45,by=vw==='front'?-R*1.2:-R*1.05;fillS(()=>{c.arc(bxx,by,R*0.42,0,TAU);});c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2*s;c.beginPath();c.arc(bxx,by,R*0.25,0.3,4.2);c.stroke();}
  c.restore();};
