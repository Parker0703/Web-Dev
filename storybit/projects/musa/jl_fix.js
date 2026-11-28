// ===== Lynch fixes: real lying patient, IV blood, 3D-projected vehicles (Humvee, truck, ambulance), crash + checkpoint =====
// ---------- tiny solid renderer: convex parts projected with the plate camera, painter-sorted ----------
const SOL={};
SOL.hex=(c)=>{const r=parseInt(c.slice(1),16);return [(r>>16)&255,(r>>8)&255,r&255];};
SOL.rot=(v,P)=>{let [x,y,z]=v;if(P.roll){const a=Math.cos(P.roll),b=Math.sin(P.roll);[y,z]=[y*a-z*b,y*b+z*a];}
  if(P.pitch){const a=Math.cos(P.pitch),b=Math.sin(P.pitch);[x,y]=[x*a-y*b,x*b+y*a];}
  if(P.yaw){const a=Math.cos(P.yaw),b=Math.sin(P.yaw);[x,z]=[x*a+z*b,-x*b+z*a];}return [x,y,z];};
// box-like hexahedron from 8 verts: 0..3 = z0 side (x0y0,x1y0,x1y1,x0y1), 4..7 = z1 side
SOL.HF=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
function box8(x0,x1,y0,y1,z0,z1){return [[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]];}
function P_box(x0,x1,y0,y1,z0,z1,col,o={}){return Object.assign({v:box8(x0,x1,y0,y1,z0,z1),f:SOL.HF,col},o);}
function P_hex(v,col,o={}){return Object.assign({v,f:SOL.HF,col},o);}
function P_poly(v,col,o={}){return Object.assign({v,f:[v.map((_,i)=>i)],col,bias:0.25},o);}
function P_disc(cx,cy,z,r,col,o={}){const n=o.n||14,v=[];for(let i=0;i<n;i++){const a=i/n*TAU+(o.a0||0);v.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r,z]);}return P_poly(v,col,o);}
// draw parts at pose P {p:[x,y,z],yaw,pitch,roll,cy,ground}; light {L,amb,dif,tint}
function solid(c,parts,P,lt){const cy=P.cy||0.9;let W3=parts.map(pt=>pt.v.map(v=>{const r=SOL.rot([v[0],v[1]-cy,v[2]],P);return [r[0]+P.p[0],r[1]+P.p[1]+cy,r[2]+P.p[2]];}));
  if(P.ground!==false){let mn=1e9;W3.forEach(a=>a.forEach(v=>{if(v[1]<mn)mn=v[1];}));if(mn<0)W3=W3.map(a=>a.map(v=>[v[0],v[1]-mn,v[2]]));}
  const ctr=[P.p[0],P.p[1]+cy,P.p[2]],s0=pp(ctr).s,lw=clamp(2.6*s0,1.2,6);
  // ground shadow
  if(P.shadow!==false){const fp=[];W3.forEach(a=>a.forEach(v=>fp.push(v)));let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;fp.forEach(v=>{x0=Math.min(x0,v[0]);x1=Math.max(x1,v[0]);z0=Math.min(z0,v[2]);z1=Math.max(z1,v[2]);});
    const sh=[[x0,0.02,z0],[x1,0.02,z0],[x1,0.02,z1],[x0,0.02,z1]].map(v=>pp([v[0]+(lt.sx||0.4),v[1],v[2]+(lt.sz||0.3)]));c.save();c.fillStyle=`rgba(10,8,6,${lt.shA??0.35})`;c.filter=`blur(${Math.max(2,6*s0)}px)`;c.beginPath();sh.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fill();c.restore();}
  const F=[];parts.forEach((pt,k)=>{const wv=W3[k],pc=[0,0,0];wv.forEach(v=>{pc[0]+=v[0]/wv.length;pc[1]+=v[1]/wv.length;pc[2]+=v[2]/wv.length;});
    for(const fi of pt.f){const vs=fi.map(i=>wv[i]),P2=vs.map(v=>pp(v));if(P2.some(q=>q.w<=0.05))continue;const a=vs[0],b=vs[1],d=vs[2];const u1=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],u2=[d[0]-a[0],d[1]-a[1],d[2]-a[2]];
      let n=[u1[1]*u2[2]-u1[2]*u2[1],u1[2]*u2[0]-u1[0]*u2[2],u1[0]*u2[1]-u1[1]*u2[0]];const nl=Math.hypot(...n)||1;n=n.map(x=>x/nl);
      const fc=[0,0,0];vs.forEach(v=>{fc[0]+=v[0]/vs.length;fc[1]+=v[1]/vs.length;fc[2]+=v[2]/vs.length;});const ref=fi.length===4&&pt.f.length===6?pc:ctr;
      if((fc[0]-ref[0])*n[0]+(fc[1]-ref[1])*n[1]+(fc[2]-ref[2])*n[2]<0)n=n.map(x=>-x);
      const w=P2.reduce((s,q)=>s+q.w,0)/P2.length-(pt.bias||0);F.push({P2,n,w,pt});}});
  F.sort((a,b)=>b.w-a.w);const L=lt.L;const ll=Math.hypot(...L);
  c.save();c.lineJoin='round';for(const f of F){const pt=f.pt;let col;if(pt.emis)col=pt.col;else{const ndl=Math.max(0,(f.n[0]*L[0]+f.n[1]*L[1]+f.n[2]*L[2])/ll);const k=lt.amb+lt.dif*ndl;const rgb=SOL.hex(pt.col),ti=lt.tint||[1,1,1];
      col=`rgb(${rgb.map((x,i)=>Math.min(255,Math.round(x*k*ti[i]))).join(',')})`;}
    c.beginPath();f.P2.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fillStyle=col;c.fill();if(pt.line!==false){c.strokeStyle=OL;c.lineWidth=lw*(pt.lw||1);c.stroke();}}
  c.restore();return {W3,s0,ctr,world:(v)=>{const r=SOL.rot([v[0],v[1]-cy,v[2]],P);return [r[0]+P.p[0],r[1]+P.p[1]+cy,r[2]+P.p[2]];}};}
const LT_DAY={L:[-0.4,0.62,0.5],amb:0.62,dif:0.55,tint:[1.04,1,0.94],sx:0.5,sz:-0.4,shA:0.4};
const LT_NIGHT={L:[0.3,0.7,0.5],amb:0.34,dif:0.3,tint:[0.78,0.86,1.12],sx:0.3,sz:0.3,shA:0.45};
// ---------- vehicles (local: x forward, y up, z side; meters) ----------
function humveeParts(o={}){const cr=o.cr||0,tan='#c8b48a',tanD='#a8946a',dk='#2a2a24',gl='#33414c';
  const X=(x,y)=>x>1.0?x-cr*(x-1.0)*0.55:x,Y=(x,y)=>x>1.6?y+cr*0.3*Math.sin((x-1.6)*4):y;const H=(v)=>v.map(([x,y,z])=>[X(x,y),Y(x,y),z*(x>1.6?1-cr*0.08:1)]);
  const P=[];P.push(P_hex(H(box8(-2.35,2.35,0.5,1.15,-1.08,1.08)),tan));
  P.push(P_hex(H([[0.75,1.15,-1.02],[2.35,1.15,-1.02],[2.35,1.22,-1.02],[0.75,1.36,-1.02],[0.75,1.15,1.02],[2.35,1.15,1.02],[2.35,1.22,1.02],[0.75,1.36,1.02]]),tan));
  P.push(P_hex([[-1.1,1.15,-1.0],[0.75,1.15,-1.0],[0.5,1.92,-0.96],[-1.1,1.92,-0.96],[-1.1,1.15,1.0],[0.75,1.15,1.0],[0.5,1.92,0.96],[-1.1,1.92,0.96]],tan));
  P.push(P_box(-2.35,-1.1,1.15,1.72,-1.0,1.0,tanD));
  for(const sz of [-1,1]){const z=sz*1.012;P.push(P_poly([[-0.1,1.36,z],[0.58,1.36,z],[0.46,1.82,z],[-0.1,1.82,z]],gl));P.push(P_poly([[-1.0,1.36,z],[-0.25,1.36,z],[-0.25,1.82,z],[-1.0,1.82,z]],gl));
    P.push(P_poly([[-1.08,1.18,z],[0.72,1.18,z]].concat([[0.72,1.2,z],[-1.08,1.2,z]]),dk,{lw:0.6}));}
  P.push(P_poly([[0.74,1.3,-0.9],[0.74,1.3,0.9],[0.52,1.86,0.86],[0.52,1.86,-0.86]].map(([x,y,z])=>[x+0.012,y,z]),gl));
  P.push(P_poly(H([[2.36,0.62,-0.72],[2.36,0.62,0.72],[2.36,1.1,0.72],[2.36,1.1,-0.72]]),dk));
  for(const sz of [-1,1])P.push(P_poly(H([[2.37,0.86,sz*0.8],[2.37,0.86,sz*0.98],[2.37,1.04,sz*0.98],[2.37,1.04,sz*0.8]]),'#fff4c8',{emis:1,lw:0.5}));
  P.push(P_hex(H(box8(2.3,2.55,0.42,0.66,-1.12,1.12)),dk));
  P.push(P_box(-0.65,0.1,1.92,2.12,-0.5,0.5,tanD));P.push(P_box(0.1,1.2,2.0,2.06,-0.04,0.04,dk));
  for(const [wx,sz] of [[1.55,-1],[1.55,1],[-1.55,-1],[-1.55,1]]){const z=sz*1.13;P.push(P_disc(wx,0.46,z,0.46,'#1a1a1a',{bias:0.4,a0:o.spin||0}));P.push(P_disc(wx,0.46,z+sz*0.01,0.2,'#6a6a5a',{bias:0.45,n:6,a0:o.spin||0,lw:0.6}));}
  return P;}
function truckParts(){const P=[],wh='#d8d2c4',dk='#2a2824',red='#8a3a2a';P.push(P_box(-6,4.6,1.25,3.9,-1.25,1.25,wh));P.push(P_box(-6,4.6,0.95,1.25,-1.0,1.0,dk));
  for(const sz of [-1,1]){const z=sz*1.255;P.push(P_poly([[-5.6,1.5,z],[4.2,1.5,z],[4.2,1.7,z],[-5.6,1.7,z]],'#3a6a8a',{lw:0.6}));for(const wx of [-5.0,-3.9])P.push(P_disc(wx,0.5,sz*1.12,0.5,'#1a1a1a',{bias:0.4}));}
  P.push(P_poly([[-6.01,1.3,-1.2],[-6.01,1.3,1.2],[-6.01,3.85,1.2],[-6.01,3.85,-1.2]],'#c8c2b4'));P.push(P_poly([[-6.02,1.3,-0.01],[-6.02,1.3,0.01],[-6.02,3.85,0.01],[-6.02,3.85,-0.01]],dk));
  P.push(P_box(5.0,7.6,0.6,1.4,-1.2,1.2,red));P.push(P_hex([[5.0,1.4,-1.2],[7.6,1.4,-1.2],[7.2,3.0,-1.15],[5.0,3.0,-1.15],[5.0,1.4,1.2],[7.6,1.4,1.2],[7.2,3.0,1.15],[5.0,3.0,1.15]],red));
  for(const sz of [-1,1]){P.push(P_poly([[6.2,2.0,sz*1.205],[7.3,2.0,sz*1.205],[7.15,2.8,sz*1.17],[6.2,2.8,sz*1.17]],'#33414c'));for(const wx of [5.6,7.0])P.push(P_disc(wx,0.5,sz*1.15,0.5,'#1a1a1a',{bias:0.4}));}
  P.push(P_box(4.6,5.0,0.9,1.2,-0.5,0.5,dk));return P;}
function ambParts(o={}){const P=[],wh='#f2f2ec',dk='#2a2a26',gl='#33414c',red='#c8201a';const fl=o.flash||0;
  P.push(P_box(-2.7,0.9,0.6,2.65,-1.08,1.08,wh));P.push(P_box(0.9,2.55,0.55,1.35,-1.0,1.0,wh));
  P.push(P_hex([[0.9,1.35,-1.0],[2.55,1.35,-1.0],[1.95,2.2,-0.96],[0.9,2.2,-0.96],[0.9,1.35,1.0],[2.55,1.35,1.0],[1.95,2.2,0.96],[0.9,2.2,0.96]],wh));
  P.push(P_poly([[2.5,1.42,-0.9],[2.5,1.42,0.9],[1.97,2.14,0.86],[1.97,2.14,-0.86]].map(([x,y,z])=>[x+0.02,y,z]),gl));
  for(const sz of [-1,1]){const z=sz*1.085;P.push(P_poly([[-2.68,1.15,z],[0.88,1.15,z],[0.88,1.4,z],[-2.68,1.4,z]],red,{lw:0.5}));P.push(P_poly([[1.05,1.45,sz*1.005],[1.9,1.45,sz*1.005],[1.9,2.08,sz*0.975],[1.05,2.08,sz*0.975]],gl));
    const cr=[];for(let i=0;i<=16;i++){const a=-1.25*Math.PI/2+i/16*1.25*Math.PI;cr.push([-0.9+Math.cos(a+Math.PI)*0.42,1.95+Math.sin(a+Math.PI)*0.42,z]);}for(let i=16;i>=0;i--){const a=-1.25*Math.PI/2+i/16*1.25*Math.PI;cr.push([-0.9+0.14+Math.cos(a+Math.PI)*0.34,1.95+Math.sin(a+Math.PI)*0.34,z]);}
    P.push(P_poly(cr,red,{lw:0.5,bias:0.3}));}
  P.push(P_poly([[-2.71,0.7,-1.0],[-2.71,0.7,1.0],[-2.71,2.6,1.0],[-2.71,2.6,-1.0]],'#e6e6de'));P.push(P_poly([[-2.72,0.7,-0.01],[-2.72,0.7,0.01],[-2.72,2.6,0.01],[-2.72,2.6,-0.01]],dk));
  for(const sz of [-1,1]){P.push(P_poly([[-2.73,1.0,sz*0.8],[-2.73,1.0,sz*1.0],[-2.73,1.3,sz*1.0],[-2.73,1.3,sz*0.8]],o.brake?'#ff3a2a':'#a82a20',{emis:1,lw:0.5}));
    P.push(P_poly([[2.57,0.85,sz*0.62],[2.57,0.85,sz*0.88],[2.57,1.08,sz*0.88],[2.57,1.08,sz*0.62]],'#fffbe0',{emis:1,lw:0.5}));}
  P.push(P_poly([[2.57,0.62,-0.5],[2.57,0.62,0.5],[2.57,0.8,0.5],[2.57,0.8,-0.5]],dk));
  P.push(P_box(1.0,1.6,2.2,2.36,-0.62,-0.02,fl?'#ff3a2a':'#7a2020',{emis:fl?1:0}));P.push(P_box(1.0,1.6,2.2,2.36,0.02,0.62,fl?'#5a1a1a':'#ff4a3a',{emis:fl?0:1}));
  for(const [wx,sz] of [[1.75,-1],[1.75,1],[-1.75,-1],[-1.75,1]]){const z=sz*1.1;P.push(P_disc(wx,0.42,z,0.42,'#1a1a1a',{bias:0.4,a0:o.spin||0}));P.push(P_disc(wx,0.42,z+sz*0.01,0.18,'#8a8a84',{bias:0.45,n:6,a0:o.spin||0,lw:0.6}));}
  return P;}
// headlight cone on the ground + glow; P pose, n = 1 forward
function headBeam(c,P,len=16,a=0.22){const wv=(v)=>{const r=SOL.rot([v[0],v[1]-(P.cy||0.9),v[2]],P);return pp([r[0]+P.p[0],r[1]+P.p[1]+(P.cy||0.9),r[2]+P.p[2]]);};
  const A=wv([2.6,0.05,-0.9]),B=wv([2.6,0.05,0.9]),C=wv([2.6+len,0.05,4]),D=wv([2.6+len,0.05,-4]);if([A,B,C,D].some(q=>q.w<=0.05))return;
  c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient((A.x+B.x)/2,(A.y+B.y)/2,(C.x+D.x)/2,(C.y+D.y)/2);g.addColorStop(0,`rgba(255,240,190,${a})`);g.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=g;c.filter='blur(6px)';
  c.beginPath();c.moveTo(A.x,A.y);c.lineTo(B.x,B.y);c.lineTo(C.x,C.y);c.lineTo(D.x,D.y);c.closePath();c.fill();c.filter='none';
  for(const sz of [-1,1]){const q=wv([2.6,0.96,sz*0.75]);const r=60*q.s;const g2=c.createRadialGradient(q.x,q.y,0,q.x,q.y,r);g2.addColorStop(0,'rgba(255,250,220,0.9)');g2.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=g2;c.beginPath();c.arc(q.x,q.y,r,0,TAU);c.fill();}c.restore();}
function lightBar(c,P,t){const wv=(v)=>{const r=SOL.rot([v[0],v[1]-(P.cy||0.9),v[2]],P);return pp([r[0]+P.p[0],r[1]+P.p[1]+(P.cy||0.9),r[2]+P.p[2]]);};
  const on=Math.floor(t*6)%2;const q=wv([1.3,2.3,on?-0.32:0.32]);if(q.w<=0.05)return;c.save();c.globalCompositeOperation='lighter';const r=110*q.s;const g=c.createRadialGradient(q.x,q.y,0,q.x,q.y,r);g.addColorStop(0,'rgba(255,90,70,0.85)');g.addColorStop(1,'rgba(255,40,30,0)');c.fillStyle=g;c.beginPath();c.arc(q.x,q.y,r,0,TAU);c.fill();c.restore();}
// ---------- lying Jessica ----------
// feet at (fx,fy), body along angle (rot = -PI/2 → head to the left). Pillow under head, blanket over the body, face visible.
function lyingJess(c,fx,fy,s,o={}){const rot=o.rot??-Math.PI/2;c.save();c.translate(fx,fy);c.rotate(rot);c.lineJoin='round';
  if(o.pillow!==false){c.fillStyle='#f4f2ea';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.roundRect(-74*s,-330*s,148*s,92*s,34*s);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.12)';c.lineWidth=3*s;c.beginPath();c.moveTo(-60*s,-300*s);c.quadraticCurveTo(0,-290*s,60*s,-305*s);c.stroke();}
  c.restore();
  who(c,o.kind||'jessG',[0,0,0],BF(o.eyes||'dot',o.brow||'worried',o.mouth||'flat',{seed:5,abs:{x:fx,y:fy,s},rot,noOutline:o.noOutline}));
  c.save();c.translate(fx,fy);c.rotate(rot);c.lineJoin='round';const bc=o.blanket||'#7a8a6a';
  // blanket: from the shins up to the chest, slightly wider than the body, soft folds
  c.fillStyle=bc;c.strokeStyle=OL;c.lineWidth=4.5*s;c.beginPath();c.moveTo(-60*s,-18*s);c.quadraticCurveTo(-72*s,-110*s,-70*s,-196*s);c.quadraticCurveTo(0,-206*s,70*s,-196*s);c.quadraticCurveTo(74*s,-110*s,62*s,-18*s);c.quadraticCurveTo(0,-8*s,-60*s,-18*s);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.14)';c.beginPath();c.moveTo(-60*s,-190*s);c.quadraticCurveTo(-10*s,-200*s,20*s,-194*s);c.lineTo(10*s,-40*s);c.quadraticCurveTo(-40*s,-34*s,-62*s,-40*s);c.closePath();c.fill();
  c.strokeStyle='rgba(0,0,0,0.22)';c.lineWidth=3*s;for(const k of [0,1,2]){c.beginPath();c.moveTo((-50+k*45)*s,-180*s);c.quadraticCurveTo((-40+k*45)*s,-110*s,(-46+k*45)*s,-40*s);c.stroke();}
  c.fillStyle='#f4f2ea';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(-72*s,-196*s);c.quadraticCurveTo(0,-210*s,72*s,-196*s);c.lineTo(70*s,-176*s);c.quadraticCurveTo(0,-188*s,-70*s,-176*s);c.closePath();c.fill();c.stroke();
  c.restore();}
// ---------- stretcher carry (night-vision footage) ----------
function carryOut(c,t,x,z,o={}){const ph=t*7;const R=[x-1.5,0,z],Fr=[x+1.5,0,z];
  const rr=who(c,'sf2',R,F('focus','angry','grit',{seed:4,walk:1,ph,f:1,hf:[46,40],hb:[30,44]}));const rf=who(c,'sf',Fr,F('focus','angry','grit',{seed:3,walk:1,ph:ph+Math.PI,f:1,hf:[-22,52],hb:[-40,48]}));
  if(!rr||!rf)return;const s=rr.s,a={x:(rr.hf.x+rr.hb.x)/2,y:(rr.hf.y+rr.hb.y)/2},b={x:(rf.hf.x+rf.hb.x)/2,y:(rf.hf.y+rf.hb.y)/2};const ang=Math.atan2(b.y-a.y,b.x-a.x),L2=Math.hypot(b.x-a.x,b.y-a.y);
  c.save();c.translate(a.x,a.y);c.rotate(ang);c.lineCap='round';c.lineJoin='round';
  // poles + canvas bed (sags a little)
  c.strokeStyle=OL;c.lineWidth=8*s;c.beginPath();c.moveTo(-14*s,0);c.lineTo(L2+14*s,0);c.stroke();c.strokeStyle='#7a7a68';c.lineWidth=4.5*s;c.stroke();
  c.fillStyle='#4e5e40';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(24*s,-6*s);c.lineTo(L2-24*s,-6*s);c.quadraticCurveTo(L2/2,14*s,24*s,-6*s);c.closePath();c.fill();c.stroke();
  for(const lx of [40*s,L2-40*s]){c.strokeStyle=OL;c.lineWidth=5*s;c.beginPath();c.moveTo(lx,0);c.lineTo(lx,22*s);c.stroke();}
  c.restore();
  // Jessica lying on it: fit her length between the carriers, head toward the rear carrier
  const sp=Math.min(s*0.8,(L2-70*s)/330),hx=a.x+Math.cos(ang)*(L2-50*s),hy=a.y+Math.sin(ang)*(L2-50*s)-44*sp;
  c.save();c.translate(hx,hy);c.restore();lyingJess(c,hx,hy,sp,{rot:-Math.PI/2+ang,eyes:'half',brow:'worried',mouth:'flat',blanket:'#6e7e5a'});
  c.save();c.translate(a.x,a.y);c.rotate(ang);c.lineCap='round';c.fillStyle='#4e5e40';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(24*s,-10*s);c.quadraticCurveTo(L2/2,4*s,L2-24*s,-10*s);c.lineTo(L2-24*s,2*s);c.quadraticCurveTo(L2/2,16*s,24*s,2*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle=OL;c.lineWidth=8*s;c.beginPath();c.moveTo(-14*s,0);c.lineTo(L2+14*s,0);c.stroke();c.strokeStyle='#7a7a68';c.lineWidth=4.5*s;c.stroke();c.restore();
  // carriers' fists close over the poles
  for(const h of [rr.hf,rf.hf]){c.save();c.fillStyle='#e8c8a8';c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.arc(h.x,h.y,9*s,0,TAU);c.fill();c.stroke();c.restore();}}
// ---------- hospital bed patient in the ward (seen from the foot of the bed) ----------
// bed at world (0,*,-1.8): mattress top y≈0.67, pillow z≈-2.55, blanket to z≈-0.78
function bedPatient(c,p0,o={}){const hp=pp([0,0.9,-2.5]),s=pp([0,0.7,-2.4]).s*0.8;const fy=hp.y+253*s;
  // pillow
  const pl=[[-0.4,0.7,-2.78],[0.4,0.7,-2.78],[0.4,1.08,-2.72],[-0.4,1.08,-2.72]].map(pp);c.save();c.fillStyle='#f6f4ee';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();
  c.moveTo(pl[0].x,pl[0].y);c.lineTo(pl[1].x,pl[1].y);c.quadraticCurveTo(pl[2].x+10*s,(pl[1].y+pl[2].y)/2,pl[2].x,pl[2].y-14*s);c.quadraticCurveTo((pl[2].x+pl[3].x)/2,pl[2].y-40*s,pl[3].x,pl[3].y-14*s);c.quadraticCurveTo(pl[3].x-10*s,(pl[0].y+pl[3].y)/2,pl[0].x,pl[0].y);c.closePath();c.fill();c.stroke();c.restore();
  // blanket edge across her chest (projected)
  const e0=pp([-0.52,0.78,-2.02]),e1=pp([0.52,0.78,-2.02]);const ey=Math.max(e0.y,e1.y)+10*s;
  c.save();c.beginPath();c.rect(0,0,W,ey+4*s);c.clip();who(c,'jessG',[0,0,0],BF(o.closed?'closed':(o.eyes||'dot'),o.brow||'worried',o.mouth||'flat',{seed:5,abs:{x:hp.x,y:fy,s},tilt:-0.04}));c.restore();
  // blanket: top surface over the body (mound), folded sheet edge, front drape
  const Q=(v)=>pp(v);const T0=[[-0.52,0.74,-2.06],[0.52,0.74,-2.06],[0.53,0.72,-0.78],[-0.53,0.72,-0.78]].map(Q),D0=[[-0.53,0.72,-0.78],[0.53,0.72,-0.78],[0.53,0.5,-0.74],[-0.53,0.5,-0.74]].map(Q);
  c.save();c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4.5*s;const bc=o.blanket||'#9ab8c8';
  c.fillStyle=shade(bc,-0.12);c.beginPath();D0.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fill();c.stroke();
  c.fillStyle=bc;c.beginPath();c.moveTo(T0[0].x,T0[0].y);const top=pp([0,0.8,-2.06]);c.quadraticCurveTo(top.x,top.y-10*s,T0[1].x,T0[1].y);c.lineTo(T0[2].x,T0[2].y);c.lineTo(T0[3].x,T0[3].y);c.closePath();c.fill();c.stroke();
  // body mound highlight + feet bumps
  const m0=pp([-0.2,0.82,-1.9]),m1=pp([0.2,0.82,-1.9]),m2=pp([0.22,0.8,-1.0]),m3=pp([-0.22,0.8,-1.0]);c.fillStyle='rgba(255,255,255,0.22)';c.beginPath();c.moveTo(m0.x,m0.y);c.lineTo(m1.x,m1.y);c.lineTo(m2.x,m2.y);c.lineTo(m3.x,m3.y);c.closePath();c.fill();
  for(const fx of [-0.12,0.12]){const q=pp([fx,0.82,-0.92]);c.fillStyle=shade(bc,0.08);c.beginPath();c.ellipse(q.x,q.y-10*s,30*s,22*s,0,Math.PI,TAU);c.fill();c.stroke();}
  c.strokeStyle='rgba(0,0,0,0.2)';c.lineWidth=3*s;for(const fx of [-0.3,0,0.3]){const q0=pp([fx,0.76,-2.0]),q1=pp([fx*1.1,0.74,-1.0]);c.beginPath();c.moveTo(q0.x,q0.y);c.quadraticCurveTo((q0.x+q1.x)/2+8*s,(q0.y+q1.y)/2,q1.x,q1.y);c.stroke();}
  // folded white sheet over the blanket edge
  const f0=pp([-0.53,0.78,-2.06]),f1=pp([0.53,0.78,-2.06]),f2=pp([0.53,0.76,-1.86]),f3=pp([-0.53,0.76,-1.86]);c.fillStyle='#f6f4ee';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(f0.x,f0.y);c.quadraticCurveTo(top.x,top.y-8*s,f1.x,f1.y);c.lineTo(f2.x,f2.y);c.quadraticCurveTo((f2.x+f3.x)/2,(f2.y+f3.y)/2-14*s,f3.x,f3.y);c.closePath();c.fill();c.stroke();
  // her right arm rests on top of the blanket (screen right, the IV side): gown sleeve + forearm + hand
  const sd=o.armL?-1:1,sh=pp([0.3*sd,0.8,-1.96]),el=pp([0.36*sd,0.78,-1.62]),hd=pp([0.28*sd,0.78,-1.3]);c.lineCap='round';
  c.strokeStyle=OL;c.lineWidth=30*s;c.beginPath();c.moveTo(sh.x,sh.y);c.lineTo(el.x,el.y);c.stroke();c.strokeStyle='#a8c4cc';c.lineWidth=22*s;c.stroke();
  c.strokeStyle=OL;c.lineWidth=24*s;c.beginPath();c.moveTo(el.x,el.y);c.lineTo(hd.x,hd.y);c.stroke();c.strokeStyle='#f2d4bc';c.lineWidth=16*s;c.stroke();
  c.fillStyle='#f2d4bc';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.ellipse(hd.x,hd.y+4*s,15*s,12*s,0.3,0,TAU);c.fill();c.stroke();
  c.restore();return {el,hd,s};}
function shade(hex,k){const r=SOL.hex(hex).map(x=>Math.max(0,Math.min(255,Math.round(k>0?x+(255-x)*k:x*(1+k)))));return `rgb(${r.join(',')})`;}
// IV stand with a blood bag, drip chamber and tube into the arm
function ivBlood(c,arm,t,o={}){const s=arm.s,X=o.x??0.82,base=pp([X,0,-2.3]),top=pp([X,1.95,-2.3]),hook=pp([X,1.9,-2.3]);c.save();c.lineCap='round';c.lineJoin='round';
  c.strokeStyle=OL;c.lineWidth=9*s;c.beginPath();c.moveTo(base.x,base.y);c.lineTo(top.x,top.y);c.stroke();c.strokeStyle='#b8c0c8';c.lineWidth=5*s;c.stroke();
  for(const d of [-1,1]){c.strokeStyle=OL;c.lineWidth=7*s;c.beginPath();c.moveTo(base.x,base.y);c.lineTo(base.x+d*40*s,base.y+10*s);c.stroke();c.strokeStyle='#b8c0c8';c.lineWidth=3.5*s;c.stroke();}
  c.strokeStyle=OL;c.lineWidth=6*s;c.beginPath();c.moveTo(hook.x-34*s,hook.y);c.lineTo(hook.x+34*s,hook.y);c.stroke();
  const bx=hook.x-(o.bagX||0)*s,by=hook.y+10*s,sw=Math.sin(t*2.2)*2*s;
  c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.moveTo(hook.x,hook.y);c.lineTo(bx,by);c.stroke();
  c.fillStyle='#a8141a';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.roundRect(bx-34*s+sw,by,68*s,92*s,14*s);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.roundRect(bx-24*s+sw,by+10*s,12*s,62*s,6*s);c.fill();
  c.fillStyle='#f4f0e4';c.fillRect(bx-16*s+sw,by+30*s,32*s,22*s);c.strokeRect(bx-16*s+sw,by+30*s,32*s,22*s);c.fillStyle='#a8141a';c.fillRect(bx-4*s+sw,by+33*s,8*s,16*s);c.fillRect(bx-8*s+sw,by+37*s,16*s,8*s);
  // drip chamber
  const dc={x:bx+sw,y:by+92*s};c.fillStyle='#e8f0f4';c.beginPath();c.roundRect(dc.x-8*s,dc.y+4*s,16*s,30*s,5*s);c.fill();c.stroke();const dr=(t*1.6)%1;c.fillStyle='#b8141a';c.beginPath();c.arc(dc.x,dc.y+8*s+dr*20*s,3.2*s,0,TAU);c.fill();
  // tube: drapes down and into the forearm (taped)
  const ex=arm.el.x*0.45+arm.hd.x*0.55,ey=arm.el.y*0.45+arm.hd.y*0.55;c.strokeStyle=OL;c.lineWidth=7*s;c.beginPath();c.moveTo(dc.x,dc.y+34*s);c.bezierCurveTo(dc.x+(o.x<0?-20:20)*s,dc.y+200*s,ex+(o.x<0?-80:80)*s,ey+40*s,ex,ey);c.stroke();c.strokeStyle='#a8141a';c.lineWidth=3.6*s;c.stroke();
  c.fillStyle='#f4f0e0';c.strokeStyle=OL;c.lineWidth=2.5*s;c.save();c.translate(ex,ey);c.rotate(Math.atan2(arm.hd.y-arm.el.y,arm.hd.x-arm.el.x));c.beginPath();c.roundRect(-14*s,-10*s,28*s,20*s,3*s);c.fill();c.stroke();c.restore();
  c.restore();return {bag:{x:bx,y:by+40*s}};}
XJ.prisoner=(c,t,u,d)=>{camAt(c,'iq_ward',[0,0.85,-2.0],1.9,{oy:140});bedPatient(c,null,{closed:1,blanket:'#9ab0b8'});c.restore();
  tagC(c,540,420,'TAKEN PRISONER',clamp(u/0.3),'#ff6a5a');lens(c,t);};
// ---------- doctors gave her their own blood ----------
XJ.doctors=(c,t,u,d)=>{const t0=wb('ambulance',78);if(t<t0-0.15){camAt(c,'iq_ward',[-0.55,1.0,-2.0],1.5+u*0.012,{oy:120});const arm=bedPatient(c,null,{eyes:'dot',brow:'worried',mouth:'flat',blanket:'#9ab0b8',armL:1});
    // the doctor stands beyond the IV stand and adjusts the bag with one hand; other arm relaxed
    const dpos=[-1.35,0,-2.2];const rc=reach(dpos,[-0.86,1.92,-2.3],{side:1});ivBlood(c,arm,t,{x:-0.8});const r=who(c,'iqdoc',dpos,F('focus','up','smile',{seed:11,f:1,hf:[rc[0],rc[1]]}));c.restore();
    tagC(c,540,420,'THEIR OWN BLOOD',clamp((t-wb('blood',75))/0.3),'#ff6a5a');lens(c,t);return;}
  // ambulance pulls out of the hospital gate and drives off into the night
  const k=clamp((t-t0+0.15)/1.1);camAt(c,'iq_hosp',[0.6,1.2,11],1.3,{oy:0});const x=lerp(0.6,4.4,k*k),P={p:[x,0,10.6],yaw:0.12,cy:0.9};
  headBeam(c,P,14,0.3);solid(c,ambParts({flash:Math.floor(t*6)%2,spin:-x/0.42}),P,LT_NIGHT);lightBar(c,P,t);c.restore();
  tagC(c,540,420,'AMBULANCE → U.S. LINES',clamp((t-t0)/0.3),'#ffd23f');lens(c,t);};
// ---------- the crash (RPG hit → slams a jackknifed truck → flips) ----------
XJ.crash=(c,t,u,d)=>{const ti=0.95;const sh=u>ti&&u<ti+0.7?(1-(u-ti)/0.7):0;const ox=Math.sin(t*61)*26*sh,oy=Math.cos(t*47)*20*sh;
  camAt(c,'iq_crash',[-11.5,1.3,0],1.15,{ox,oy:oy+260});const D0=-10;
  // truck jackknifed across the road
  const TP={p:[D0+5.6,0,-1.7],yaw:0.04,cy:2};solid(c,truckParts(),TP,LT_DAY);
  // humvee path
  let hx,yaw=0,pitch=0,roll=0,cr=0,hy=0,hz=0.3;const rpg=0.32;
  if(u<ti){const k=u/ti;hx=lerp(D0-12,D0-2.5,k);const sw=clamp((u-rpg)/(ti-rpg));hz=0.9-1.9*eio(sw);yaw=u>rpg?0.32*Math.sin(sw*Math.PI)+0.08*Math.sin((u-rpg)*30)*(1-sw):0;}
  else{const k=clamp((u-ti)/1.1);cr=clamp((u-ti)/0.12);hx=D0-2.5-0.5*eo(k);hz=-1.0+1.2*eo(k);pitch=-0.55*Math.sin(Math.min(k,0.5)*Math.PI);roll=1.75*eo(clamp((k-0.15)/0.7));yaw=0.25*eo(k);hy=0.4*Math.sin(Math.min(k,1)*Math.PI);}
  const HP={p:[hx,hy,hz],yaw,pitch,roll,cy:0.9};const hv=solid(c,humveeParts({cr,spin:-hx/0.46}),HP,LT_DAY);
  // RPG streak from a rooftop on the left + hit flash + smoke trail
  if(u>rpg-0.18&&u<rpg+0.05){const k=clamp((u-rpg+0.18)/0.18),A=pp([D0-3,4.6,-9]),B=pp([hx-0.6,1.2,hz-1]);const X=lerp(A.x,B.x,k),Y=lerp(A.y,B.y,k);c.save();c.strokeStyle='rgba(230,220,200,0.7)';c.lineWidth=10*A.s;c.lineCap='round';c.beginPath();c.moveTo(A.x,A.y);c.lineTo(X,Y);c.stroke();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,200,90,0.95)';c.beginPath();c.arc(X,Y,12*B.s,0,TAU);c.fill();c.restore();}
  if(u>rpg){const q=pp(hv.world([-0.5,1.3,-1.0]));const k=clamp((u-rpg)/0.25);if(k<1){c.save();c.globalCompositeOperation='lighter';const r=(80+220*k)*q.s;const g=c.createRadialGradient(q.x,q.y,0,q.x,q.y,r);g.addColorStop(0,`rgba(255,240,180,${1-k})`);g.addColorStop(0.5,`rgba(255,140,40,${0.8*(1-k)})`);g.addColorStop(1,'rgba(255,80,20,0)');c.fillStyle=g;c.beginPath();c.arc(q.x,q.y,r,0,TAU);c.fill();c.restore();}
    for(let i=0;i<8;i++){const a=clamp((u-rpg)*1.6-i*0.06);if(a<=0)continue;const pw=pp(hv.world([-1.8-i*0.5,1.5+i*0.12,-0.6]));c.save();c.globalAlpha=0.45*(1-a*0.5);c.fillStyle='#3a3430';c.beginPath();c.arc(pw.x,pw.y,(40+i*14)*pw.s*(0.6+a),0,TAU);c.fill();c.restore();}}
  // impact: flash, flying debris, dust cloud
  if(u>ti){const ip=pp([D0,1.2,-1.0]);const k=u-ti;if(k<0.2){c.save();c.globalCompositeOperation='lighter';const r=420*ip.s;const g=c.createRadialGradient(ip.x,ip.y,0,ip.x,ip.y,r);g.addColorStop(0,`rgba(255,250,220,${1-k/0.2})`);g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(ip.x-r,ip.y-r,2*r,2*r);c.restore();}
    for(let i=0;i<34;i++){const vx=(hash(i)-0.3)*8,vy=3+hash(i*3)*6,vz=(hash(i*5)-0.2)*7,tt=Math.min(k,1.4);const yy=1.0+vy*tt-4.9*tt*tt;if(yy<0)continue;const q=pp([D0-0.2+vx*tt,yy,-1.0+vz*tt]);const sz=(4+hash(i*7)*9)*q.s;
      c.save();c.translate(q.x,q.y);c.rotate(k*(8+i));c.fillStyle=i%4===0?'#bfe4f0':i%3?'#3a3630':'#c8b48a';c.strokeStyle=OL;c.lineWidth=1.5*q.s;c.fillRect(-sz,-sz*0.6,sz*2,sz*1.2);if(i%4)c.strokeRect(-sz,-sz*0.6,sz*2,sz*1.2);c.restore();}
    for(let i=0;i<10;i++){const a=clamp(k*1.3-i*0.05);if(a<=0)continue;const q=pp([D0-0.6+(hash(i)-0.5)*4*a,0.4+a*1.6*hash(i*2),-0.6+(hash(i*4)-0.3)*4*a]);c.save();c.globalAlpha=0.55*(1-a*0.6);c.fillStyle=i%2?'#c8a878':'#a88a60';c.beginPath();c.arc(q.x,q.y,(90+i*20)*q.s*(0.4+a),0,TAU);c.fill();c.restore();}}
  c.restore();tagC(c,540,420,'THE CRASH',clamp((u-0.05)/0.3));lens(c,t,{v:0.4});};
// ---------- checkpoint at night: the ambulance comes, U.S. troops open fire, it turns back ----------
function sandbags(c,x0,x1,z0,z1,h,lt){solid(c,[P_box(x0,x1,0,h,z0,z1,'#9a845a')],{p:[0,0,0],cy:0,ground:false,shadow:false},lt);
  // bag rows on the face toward the camera (x0 face)
  const rows=Math.round(h/0.22);c.save();c.strokeStyle=OL;for(let r=0;r<rows;r++){const y=(r+0.5)*h/rows,n=Math.round((z1-z0)/0.55);for(let i=0;i<n;i++){const z=z0+(i+0.5+(r%2?0.5:0))*(z1-z0)/n;if(z>z1-0.1)continue;const q=pp([x0-0.01,y,z]),q2=pp([x0-0.01,y,z+0.25]);
    const rw=Math.abs(q2.x-q.x)+6*q.s,rh=14*q.s;c.fillStyle=r%2?'#a8925e':'#b49c66';c.lineWidth=2*q.s;c.beginPath();c.ellipse(q.x,q.y,Math.max(rw,8*q.s),rh,0,0,TAU);c.fill();c.stroke();}}c.restore();}
function jersey(c,x,z0,z1,lt){solid(c,[P_hex([[x-0.35,0,z0],[x+0.35,0,z0],[x+0.12,0.82,z0],[x-0.12,0.82,z0],[x-0.35,0,z1],[x+0.35,0,z1],[x+0.12,0.82,z1],[x-0.12,0.82,z1]],'#b8b4a8')],{p:[0,0,0],cy:0,ground:false,shadow:false},lt);}
function soldierFire(c,pos,f,t,firing,seed,kind){const r=who(c,kind,pos,F('focus','angry','grit',{seed,f,hf:[90*f,-50],hb:[60*f,-36],lean:0.06*f}));if(!r)return;const s=r.s;
  c.save();c.translate(r.hf.x+15*s*f,r.hf.y+2*s);if(f<0)c.scale(-1,1);m16(c,0,0,0.29*s,-0.06);c.restore();if(firing)muzzleAt(c,r.hf.x+128*s*f,r.hf.y-6*s,1.4*s,t,seed);}
XJ.checkpoint=(c,t,u,d)=>{const fire=u>0.75&&u<2.1,sh=fire?0.5:0;camAt(c,'iq_check',[2,0.8,-0.3],1.04,{ox:Math.sin(t*41)*8*sh,oy:Math.cos(t*37)*6*sh+20});
  // ambulance: drives up the road toward the checkpoint, brakes when shots hit the road, turns around and leaves
  let x,z=0,yaw=0,brake=0;const t1=0.75,t2=1.55;z=0.7;if(u<t1){x=lerp(-6,-2.2,u/t1);}else if(u<t2){const k=(u-t1)/(t2-t1);x=-2.2+1.2*Math.sin(k*Math.PI/2);brake=1;}
  else{const k=clamp((u-t2)/1.9);yaw=Math.PI*eio(clamp(k*1.3));x=-1.0-Math.sin(yaw)*1.6-k*k*4;z=0.7-(1-Math.cos(yaw))*1.1;}
  const P={p:[x,0,z],yaw,cy:0.9};
  // barriers + sandbags (drawn in depth order: far → near is ambulance first, then checkpoint which is nearer the soldiers)
  jersey(c,3.8,-2.8,-0.6,LT_NIGHT);jersey(c,5.0,0.4,2.6,LT_NIGHT);
  // soldiers behind sandbag walls on both shoulders
  soldierFire(c,[6.6,0,-3.1],-1,t,fire,1,'gi1');sandbags(c,5.6,6.2,-4.0,-2.3,1.05,LT_NIGHT);
  soldierFire(c,[6.6,0,3.0],-1,t,fire,2,'gi2');sandbags(c,5.6,6.2,2.2,3.9,1.05,LT_NIGHT);
  headBeam(c,P,16,0.35);solid(c,ambParts({flash:Math.floor(t*6)%2,brake,spin:-x/0.42}),P,LT_NIGHT);lightBar(c,P,t);
  // tracer lines + sparks on the road in front of the ambulance
  if(fire){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const ph=(t*5+i*0.37)%1;const sz=i%2?-3.1:3.0;const A=pp([5.6,1.45,sz]),B=pp([x+2.8+hash(i)*2,0.1,z+(hash(i*3)-0.5)*2]);const X0=lerp(A.x,B.x,ph),Y0=lerp(A.y,B.y,ph),X1=lerp(A.x,B.x,Math.min(1,ph+0.12)),Y1=lerp(A.y,B.y,Math.min(1,ph+0.12));
      c.strokeStyle='rgba(255,210,120,0.9)';c.lineWidth=4*A.s;c.lineCap='round';c.beginPath();c.moveTo(X0,Y0);c.lineTo(X1,Y1);c.stroke();if(ph>0.85){c.fillStyle='rgba(255,230,160,0.9)';c.beginPath();c.arc(B.x,B.y,8*B.s,0,TAU);c.fill();}}c.restore();}
  c.restore();tagC(c,540,420,'U.S. CHECKPOINT',clamp(u/0.3),'#ff6a5a');lens(c,t,{v:0.5});};
