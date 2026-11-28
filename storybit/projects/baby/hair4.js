// ===== hair4: lock-based 2.5D hair renderer =====
// A hairstyle is a list of LOCKS. Each lock = cubic Bézier spine (root→tip, in head-radius units, authored front-facing)
// + width profile (w0 at root → w1 at tip) + layer (0 = under/back of skull cap, 1 = mid, 2 = front/fringe).
// Render: (1) silhouette outline pass over all locks, (2) outer rim pass, (3) per lock in layer order:
// contact shadow on what's beneath, cross-section gradient (shadow→mid→lit), root occlusion, groove strands,
// curved specular following the spine, secondary glint, thin separation edge. Behind-head locks use the same renderer.
const HL={L:(x0,y0,c1x,c1y,c2x,c2y,x1,y1,w0,w1,layer=1)=>({p:[x0,y0,c1x,c1y,c2x,c2y,x1,y1],w0,w1,layer})};
function hb(p,u){const v=1-u;return [v*v*v*p[0]+3*v*v*u*p[2]+3*v*u*u*p[4]+u*u*u*p[6],v*v*v*p[1]+3*v*v*u*p[3]+3*v*u*u*p[5]+u*u*u*p[7]];}
function lockGeom(lk,R){const N=18,P=[],T=[];for(let i=0;i<=N;i++){const u=i/N;P.push(hb(lk.p,u));}
  for(let i=0;i<=N;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(N,i+1)];let tx=b[0]-a[0],ty=b[1]-a[1];const l=Math.hypot(tx,ty)||1;T.push([tx/l,ty/l]);}
  const Wf=u=>lerp(lk.w0,lk.w1,Math.pow(u,0.85))*(u<0.08?0.75+u*3.1:1);
  const Lp=[],Rp=[];for(let i=0;i<=N;i++){const u=i/N,w=Wf(u)*R/2,n=[-T[i][1],T[i][0]];Lp.push([(P[i][0])*R+n[0]*w,(P[i][1])*R+n[1]*w]);Rp.push([(P[i][0])*R-n[0]*w,(P[i][1])*R-n[1]*w]);}
  return {P:P.map(q=>[q[0]*R,q[1]*R]),T,Lp,Rp,Wf,N};}
function lockPath(c,g){const {Lp,Rp,P,T,N}=g;c.beginPath();c.moveTo(Lp[0][0],Lp[0][1]);for(let i=1;i<N;i++){const mx=(Lp[i][0]+Lp[i+1][0])/2,my=(Lp[i][1]+Lp[i+1][1])/2;c.quadraticCurveTo(Lp[i][0],Lp[i][1],mx,my);}
  const tip=P[N],tt=T[N],wt=Math.hypot(Lp[N][0]-Rp[N][0],Lp[N][1]-Rp[N][1]);c.quadraticCurveTo(tip[0]+tt[0]*wt*0.9,tip[1]+tt[1]*wt*0.9,Rp[N][0],Rp[N][1]);
  for(let i=N-1;i>0;i--){const mx=(Rp[i][0]+Rp[i-1][0])/2,my=(Rp[i][1]+Rp[i-1][1])/2;c.quadraticCurveTo(Rp[i][0],Rp[i][1],mx,my);}
  const r0=P[0],t0=T[0];c.quadraticCurveTo(r0[0]-t0[0]*Math.hypot(Lp[0][0]-Rp[0][0],Lp[0][1]-Rp[0][1])*0.5,r0[1]-t0[1]*Math.hypot(Lp[0][0]-Rp[0][0],Lp[0][1]-Rp[0][1])*0.5,Lp[0][0],Lp[0][1]);c.closePath();}
function strokeAlong(c,g,off,u0,u1){const {P,T,N,Wf}=g;c.beginPath();let first=true;for(let i=Math.round(u0*N);i<=Math.round(u1*N);i++){const n=[-T[i][1],T[i][0]],w=Wf(i/N);const x=P[i][0]+n[0]*off*w*g.R/2,y=P[i][1]+n[1]*off*w*g.R/2;first?c.moveTo(x,y):c.lineTo(x,y);first=false;}c.stroke();}
function renderLocks(c,locks,R,s,col,o={}){if(!locks.length)return;const Lx=(L2.dx||1)*0.6,Ly=-0.8;const geoms=locks.map(l=>({...lockGeom(l,R),R,layer:l.layer,l}));geoms.sort((a,b)=>a.layer-b.layer);
  const dark=shd2(col,-0.62),deep=shd2(col,-0.4),lit=shd2(col,0.22),spec=o.spec||'rgba(255,246,228,';
  // 1) silhouette ink: every lock stroked thick, fills will hide the inner strokes
  c.save();c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5.5*s;for(const g of geoms){lockPath(c,g);c.stroke();}
  // 2) outer rim on the back-lit side
  c.strokeStyle=L2.rim||'#ffb35a';c.globalAlpha=0.55;c.lineWidth=3*s;for(const g of geoms){c.save();c.translate(-Lx*2.6*s,-1.6*s);lockPath(c,g);c.stroke();c.restore();}c.globalAlpha=1;
  c.strokeStyle=K2;c.lineWidth=4*s;for(const g of geoms){lockPath(c,g);c.stroke();}
  // 3) locks
  for(const g of geoms){const {P,T,N}=g,mi=Math.round(N*0.45),n=[-T[mi][1],T[mi][0]],w=g.Wf(0.45)*R/2;
    if(g.layer>0&&!o.noShadow){c.save();c.translate(-Lx*0.05*R,0.06*R);lockPath(c,g);c.fillStyle='rgba(10,6,10,0.28)';c.fill();c.restore();}
    const litSide=Math.sign(n[0]*Lx+n[1]*Ly)||1;const m=P[mi];const gr=c.createLinearGradient(m[0]-n[0]*w*litSide,m[1]-n[1]*w*litSide,m[0]+n[0]*w*litSide,m[1]+n[1]*w*litSide);
    gr.addColorStop(0,deep);gr.addColorStop(0.3,shd2(col,-0.2));gr.addColorStop(0.65,col);gr.addColorStop(1,lit);lockPath(c,g);c.fillStyle=gr;c.fill();
    c.save();lockPath(c,g);c.clip();
    const a=P[0],b=P[N];const og=c.createLinearGradient(a[0],a[1],b[0],b[1]);og.addColorStop(0,'rgba(8,4,8,0.42)');og.addColorStop(0.35,'rgba(8,4,8,0)');og.addColorStop(0.85,'rgba(8,4,8,0)');og.addColorStop(1,'rgba(8,4,8,0.18)');c.fillStyle=og;c.fillRect(-3*R,-3*R,6*R,6*R);
    c.lineCap='round';c.strokeStyle=shd2(col,-0.5);c.globalAlpha=0.32;c.lineWidth=1.1*s;strokeAlong(c,g,-0.35*litSide,0.05,0.88);strokeAlong(c,g,0.1*litSide,0.12,0.8);
    c.globalAlpha=1;const ln=Math.hypot(Lx,Ly),lx=Lx/ln,ly=Ly/ln,sc=o.sheenR||1.0;
    {let best=-1,ks=[];for(let i=0;i<=N;i++){const p=P[i],d=Math.hypot(p[0],p[1])/R,dir=Math.max(0,(p[0]*lx+p[1]*ly)/(d*R+1e-6));ks.push(Math.exp(-Math.pow((d-0.92*sc)/0.22,2))*(0.25+0.75*dir));}
      let u0=-1,u1=-1,km=0;ks.forEach((k,i)=>{if(k>0.12){if(u0<0)u0=i;u1=i;km=Math.max(km,k);}});
      if(u0>=0&&u1>u0){const a0=u0/N,a1=u1/N;c.lineCap='round';c.lineJoin='round';
        c.strokeStyle=spec+(0.2*km).toFixed(3)+')';c.lineWidth=g.Wf((a0+a1)/2)*R*0.42;strokeAlong(c,g,0.18*litSide,a0,a1);
        c.strokeStyle=spec+(0.55*km).toFixed(3)+')';c.lineWidth=g.Wf((a0+a1)/2)*R*0.13;strokeAlong(c,g,0.32*litSide,a0+(a1-a0)*0.15,a1-(a1-a0)*0.2);}}
    c.strokeStyle=spec+'0.35)';c.lineWidth=Math.max(1,g.Wf(0.75)*R*0.06);strokeAlong(c,g,0.35*litSide,0.7,0.78);c.restore();
    c.strokeStyle=shd2(col,-0.7);c.lineWidth=1.3*s;c.globalAlpha=0.32;lockPath(c,g);c.stroke();c.globalAlpha=1;}
  c.restore();}
// ---------- style generators (front-facing authoring, x>0 = character's facing side) ----------
const HG={
  dome(n,o={}){const r=1.05+(o.vol||0),cy=-(1.0+(o.vol||0)*0.6),a0=o.a0??Math.PI*0.94,a1=o.a1??Math.PI*2.06,out=[];
    for(let i=0;i<n;i++){const a=lerp(a0,a1,i/(n-1))+(hash(i*7+(o.seed||0))-0.5)*0.06,rt=r+(o.tipR||0);const ex=Math.cos(a)*rt,ey=Math.sin(a)*rt+(o.drop||0)*Math.max(0,Math.sin(a)+0.2);const am=(a-Math.PI*1.5);
      const c1=[Math.cos(-Math.PI/2+am*0.38)*r*1.12,Math.sin(-Math.PI/2+am*0.38)*r*1.12],c2=[Math.cos(-Math.PI/2+am*0.8)*r*1.1,Math.sin(-Math.PI/2+am*0.8)*r*1.1];
      out.push(HL.L((hash(i)-0.5)*0.12,cy,c1[0],c1[1],c2[0],c2[1],ex,ey,o.w0||0.62,o.w1||0.06,o.layer??0));}return out;},
  hairline(n,y,span,o={}){const out=[];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0.5,x=lerp(-span,span,u)+(o.sweep||0);const rx=x*0.35+(o.part||0);
    out.push(HL.L(rx,-1.02-(o.vol||0),rx+(x-rx)*0.4,-1.05-(o.vol||0),x*1.05+(o.sweep||0)*0.5,lerp(-0.95,y,0.6),x+(o.sweep||0)*0.6+(hash(i*3)-0.5)*0.05,y+(hash(i)-0.5)*(o.jag||0.06),o.w0||0.46,o.w1??0.03,o.layer??2));}return out;},
  curls(ring,n,a0,a1,o={}){const out=[];for(let i=0;i<n;i++){const a=lerp(a0,a1,i/(n-1))+(hash(i*5+ring)-0.5)*0.1,r=ring;const x=Math.cos(a)*r,y=Math.sin(a)*r+(o.dy||0),d=o.dir||1,sz=o.sz||0.32;
    out.push(HL.L(x-Math.cos(a)*0.12,y-Math.sin(a)*0.12,x+Math.cos(a+d*1.2)*sz,y+Math.sin(a+d*1.2)*sz,x+Math.cos(a+d*2.6)*sz*1.1,y+Math.sin(a+d*2.6)*sz*1.1,x+Math.cos(a+d*3.4)*sz*0.6,y+Math.sin(a+d*3.4)*sz*0.6,o.w0||0.3,o.w1||0.08,o.layer??1));}return out;},
  curtain(side,n,len,o={}){const out=[];for(let i=0;i<n;i++){const u=i/(Math.max(1,n-1)),x0=side*lerp(0.35,1.0,u),wv=o.wave||0;
    out.push(HL.L(x0,-0.95+u*0.4,side*(1.12+u*0.08+wv*0.25),-0.2+u*0.2,side*(1.0+u*0.1-wv*0.3),len*0.65,side*(0.95+u*0.12+wv*0.22),len+(hash(i)-0.5)*0.12,o.w0||0.45,o.w1??0.1,o.layer??1));}return out;},
};
const HSTYLES={
  fringe:K=>[...HG.dome(9,{vol:0.04}),...HG.hairline(6,-0.28,0.78,{sweep:0.08,vol:0.04})],
  sidepart:K=>{const L=[...HG.dome(9,{vol:0.05})];for(let i=0;i<6;i++){const y=-0.98+i*0.02;L.push(HL.L(-0.38,y,0.0,-1.28+i*0.06,0.75,-1.05+i*0.1,1.02,-0.35+i*0.08,0.5,0.14,2));}
    for(let i=0;i<3;i++)L.push(HL.L(-0.42,-0.95,-0.7,-1.0+i*0.05,-0.95,-0.7+i*0.1,-1.04,-0.2+i*0.12,0.4,0.12,2));return L;},
  quiff:K=>{const L=[...HG.dome(9,{vol:-0.02,w0:0.4})];for(let i=0;i<6;i++){const x=lerp(-0.55,0.6,i/5);L.push(HL.L(x,-0.55,x*0.8+0.05,-1.35,x*0.6-0.35,-1.7,x*0.5-0.6,-1.22,0.5,0.16,2));}return L;},
  buzz:K=>[...HG.dome(15,{vol:-0.06,w0:0.3,w1:0.1,tipR:-0.04,a0:Math.PI*1.0,a1:Math.PI*2.0}),...HG.hairline(9,-0.55,0.8,{w0:0.24,w1:0.1,vol:-0.06,jag:0.02})],
  curly:K=>[...HG.dome(8,{vol:0.12,w0:0.55}),...HG.curls(1.1,11,Math.PI*0.95,Math.PI*2.05,{dir:1,sz:0.3,layer:1}),...HG.curls(0.82,8,Math.PI*1.1,Math.PI*1.9,{dir:-1,sz:0.28,layer:2}),...HG.curls(0.62,6,Math.PI*0.15,Math.PI*0.85,{dy:-0.95,dir:1,sz:0.22,layer:2})],
  slick:K=>{const L=[...HG.dome(9,{vol:0.0,w0:0.45})];for(let i=0;i<7;i++){const x=lerp(-0.75,0.75,i/6);L.push(HL.L(x,-0.6,x*1.05,-0.95,x*0.7-0.1,-1.2,x*0.35-0.25,-1.08,0.44,0.14,2));}return L;},
  messy:K=>[...HG.dome(10,{vol:0.1,w0:0.5,seed:3}),...HG.hairline(7,-0.32,0.82,{sweep:-0.05,vol:0.1,jag:0.18}),HL.L(0.1,-1.1,0.3,-1.5,0.5,-1.45,0.62,-1.3,0.3,0.06,2),HL.L(-0.2,-1.08,-0.4,-1.45,-0.6,-1.4,-0.75,-1.25,0.28,0.06,2)],
  spiky:K=>{const L=[...HG.dome(9,{vol:0.05})];for(let i=0;i<7;i++){const a=Math.PI*(1.12+i*0.13),x=Math.cos(a),y=Math.sin(a);L.push(HL.L(x*0.3,-0.75+y*0.2,x*0.9,y*0.95-0.1,x*1.25,y*1.2-0.15,x*1.45,y*1.42-0.2,0.5,0.0,1));}return [...L,...HG.hairline(5,-0.32,0.7,{jag:0.12})];},
  long:K=>[...HG.dome(8,{vol:0.06}),...HG.curtain(1,4,0.55,{layer:2}),...HG.curtain(-1,4,0.55,{layer:2})],
  wavy:K=>[...HG.dome(8,{vol:0.12}),...HG.curtain(1,4,0.6,{layer:2,wave:0.5}),...HG.curtain(-1,4,0.6,{layer:2,wave:0.5})],
  bob:K=>[...HG.dome(9,{vol:0.08}),...HG.hairline(7,-0.24,0.74,{jag:0.01,w1:0.3}),...HG.curtain(1,2,0.6,{layer:1,w1:0.4}),...HG.curtain(-1,2,0.6,{layer:1,w1:0.4})],
  ponytail:K=>{const L=[...HG.dome(8,{vol:0.0,w0:0.45})];for(let i=0;i<6;i++){const x=lerp(-0.7,0.7,i/5);L.push(HL.L(x,-0.6,x*1.05,-0.95,x*0.6,-1.15,x*0.2,-1.08,0.42,0.14,2));}return L;},
  bun:K=>HSTYLES.ponytail(K),
  afro:K=>[...HG.curls(1.3,14,Math.PI*0.9,Math.PI*2.1,{dy:-0.15,sz:0.36,w0:0.36,layer:0}),...HG.curls(1.0,10,Math.PI*1.0,Math.PI*2.0,{dy:-0.2,dir:-1,sz:0.32,layer:1}),...HG.curls(0.6,6,Math.PI*1.1,Math.PI*1.9,{dy:-0.3,sz:0.3,layer:2})],
};
// behind-the-head geometry (long lengths, ponytail, bun)
const HBACK={
  long:(K,vw)=>{const out=[];for(let i=0;i<9;i++){const x=lerp(-1.2,1.2,i/8);out.push(HL.L(x*0.6,-0.9,x*1.15,-0.2,x*1.12,0.9,x*0.95+(hash(i)-0.5)*0.15,1.85+(hash(i*3)-0.5)*0.15,0.62,0.22,0));}return out;},
  wavy:(K,vw)=>{const out=[];for(let i=0;i<9;i++){const x=lerp(-1.3,1.3,i/8),sg=Math.sign(x)||1;out.push(HL.L(x*0.6,-0.9,x*1.45+sg*0.25,0.2,x*0.85-sg*0.3,1.05,x*1.2+sg*0.2,1.9,0.66,0.14,0));}return out;},
  bob:(K,vw)=>{const out=[];for(let i=0;i<7;i++){const x=lerp(-1.15,1.15,i/6);out.push(HL.L(x*0.5,-0.95,x*1.2,-0.4,x*1.18,0.3,x*1.05,0.72,0.7,0.5,0));}return out;},
  ponytail:(K,vw,t)=>{const tx=vw==='front'?0.0:-1.0,ty=vw==='front'?-1.15:-0.4,sw=Math.sin((t||0)*3)*0.08,out=[];
    for(let i=0;i<5;i++){const d=(i-2)*0.06;out.push(HL.L(tx+d,ty,tx-0.35+d+sw,ty+0.5,tx-0.2+d*2+sw,ty+1.1,tx-0.1+d*3+sw*1.5,ty+1.75-Math.abs(i-2)*0.1,0.32,0.04,0));}return out;},
  bun:(K,vw)=>{const bx=vw==='front'?0:-0.45,by=vw==='front'?-1.25:-1.08,out=[];for(let i=0;i<6;i++){const a=i/6*TAU;out.push(HL.L(bx+Math.cos(a)*0.08,by+Math.sin(a)*0.08,bx+Math.cos(a+0.9)*0.45,by+Math.sin(a+0.9)*0.45,bx+Math.cos(a+2.0)*0.42,by+Math.sin(a+2.0)*0.42,bx+Math.cos(a+2.8)*0.2,by+Math.sin(a+2.8)*0.2,0.32,0.1,0));}return out;},
};
HBACK.curly=HBACK.afro=null;
function styleName(K){return K.hairStyle||(K.longHair?'long':'fringe');}
function backView(name){ // seen from behind: style-specific back geometry
  if(name==='curly'||name==='afro'){const big=name==='afro';return [...HG.dome(8,{vol:big?0.25:0.1,w0:0.6}),...HG.curls(big?1.25:1.05,big?14:11,Math.PI*0.9,Math.PI*2.1,{sz:0.32,layer:1}),...HG.curls(big?0.95:0.75,9,Math.PI*0.95,Math.PI*2.05,{dir:-1,sz:0.3,layer:2,dy:0.15})];}
  const sh=name==='buzz'?0.32:name==='spiky'||name==='messy'?0.5:0.62,w=name==='buzz'?0.36:0.56;const out=[];for(let i=0;i<11;i++){const x=lerp(-1.05,1.05,i/10);out.push(HL.L(x*0.1,-1.05,x*0.9,-1.15,x*1.15,-0.2,x*0.95,sh-Math.abs(x)*0.3,w,0.08,i%2?1:0));}
  if(name==='spiky'){for(let i=0;i<6;i++){const a=Math.PI*(1.1+i*0.16);out.push(HL.L(Math.cos(a)*0.3,-0.7,Math.cos(a)*0.9,Math.sin(a)*0.95-0.1,Math.cos(a)*1.25,Math.sin(a)*1.2-0.15,Math.cos(a)*1.45,Math.sin(a)*1.4-0.2,0.5,0.0,2));}}
  return out;}
// replaces previous hair layers
hairLayer=function(c,R,s,f,o,K){const name=styleName(K),col=K.hair||'#3a2a20',vw=o.back?'back':(o.view||'3q');const gen=HSTYLES[name]||HSTYLES.fringe;
  if(vw==='back'){renderLocks(c,backView(name),R,s,col);const bk=HBACK[name];if(bk&&name!=='bob')renderLocks(c,bk(K,'front',o.t).map(l=>({...l,layer:2})),R,s,col,{noShadow:0});return;}
  if(!['quiff','slick','ponytail','bun','buzz'].includes(name))hairlineAO(c,R,s,-R*0.4);else hairlineAO(c,R,s,-R*0.66);
  c.save();if(vw==='side'){c.translate(-f*R*0.2,0);c.scale(f*0.86,1);}else if(vw==='3q'){c.translate(-f*R*0.06,0);c.scale(f*0.96,1);}
  let locks=gen(K);if(vw==='side'){locks=locks.filter(l=>{const tx=l.p[6],ty=l.p[7];return !(tx>0.55&&ty>-0.5)&&!(l.layer===2&&tx<-0.5);}).map(l=>l.layer===2?{...l,p:l.p.map((v,i)=>i===7?Math.min(v,-0.42):v)}:l);}
  renderLocks(c,locks,R,s,col);c.restore();};
longHair2=function(c,hc,s,f,o,K,HR){const name=styleName(K),bk=HBACK[name];if(!bk||o.back)return;const R=HR*s,col=shd2(K.hair||'#4a2418',-0.12),vw=o.view||'3q';
  c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);if(vw==='side'){c.translate(-f*R*0.35,0);c.scale(f*0.8,1);}else if(vw==='3q'){c.translate(-f*R*0.12,0);c.scale(f,1);}
  renderLocks(c,bk(K,vw,o.t),R,s,col,{noShadow:1});c.restore();};
// ===== solid hair sheets (long lengths, curtains, bob back, ponytail): one mass with grooves + sheen, not separate strands =====
function hairSheet(c,R,s,col,path,o={}){const Lx=(L2.dx||1);c.save();c.lineJoin='round';
  path();c.strokeStyle=K2;c.lineWidth=5.5*s;c.stroke();
  c.save();c.translate(-Lx*2.4*s,-1.4*s);path();c.strokeStyle=L2.rim||'#ffb35a';c.globalAlpha=0.5;c.lineWidth=3*s;c.stroke();c.restore();
  path();c.strokeStyle=K2;c.lineWidth=4*s;c.stroke();
  const x0=o.x0??-1.3*R,x1=o.x1??1.3*R,y0=o.y0??-1.2*R,y1=o.y1??1.9*R;
  const gh=c.createLinearGradient(Lx>0?x0:x1,0,Lx>0?x1:x0,0);gh.addColorStop(0,shd2(col,-0.45));gh.addColorStop(0.35,shd2(col,-0.12));gh.addColorStop(0.7,col);gh.addColorStop(1,shd2(col,0.2));path();c.fillStyle=gh;c.fill();
  c.save();path();c.clip();
  const gv=c.createLinearGradient(0,y0,0,y1);gv.addColorStop(0,'rgba(8,4,8,0.35)');gv.addColorStop(0.25,'rgba(8,4,8,0)');gv.addColorStop(0.8,'rgba(8,4,8,0.05)');gv.addColorStop(1,'rgba(8,4,8,0.3)');c.fillStyle=gv;c.fillRect(x0-R,y0-R,x1-x0+2*R,y1-y0+2*R);
  // large soft folds (broad shadow/light bands following the flow) — gives volume without splitting into strands
  const flow=o.flow||((u,k)=>[lerp(x0,x1,k)+Math.sin(u*Math.PI*(o.wave?2:0.6)+k*3)*R*(o.wave?0.12:0.04),lerp(y0,y1,u)]);
  for(let k=0;k<7;k++){const kk=(k+0.5)/7;c.strokeStyle=k%2?'rgba(0,0,0,0.13)':'rgba(255,240,220,0.07)';c.lineWidth=R*0.22;c.lineCap='round';c.beginPath();for(let i=0;i<=20;i++){const p=flow(i/20,kk);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}c.stroke();}
  // fine strand grooves
  c.strokeStyle=shd2(col,-0.5);c.globalAlpha=0.35;c.lineWidth=1.2*s;for(let k=0;k<16;k++){const kk=(k+0.3+hash(k)*0.4)/16;c.beginPath();for(let i=1;i<=19;i++){const p=flow(i/20,kk);i>1?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}c.stroke();}
  c.strokeStyle='rgba(255,240,220,0.5)';c.globalAlpha=0.25;for(let k=0;k<10;k++){const kk=(k+0.6)/10;c.beginPath();for(let i=2;i<=14;i++){const p=flow(i/20,kk);c.lineTo(p[0]+1.5*s,p[1]);}c.stroke();}c.globalAlpha=1;
  // coherent sheen band
  const sr=o.sheenR??0.98;for(const [w,a] of [[R*0.28,0.14],[R*0.1,0.45]]){c.lineWidth=w;c.lineCap='round';const n=16;for(let k=0;k<n;k++){const a0=lerp(-2.75,-0.4,k/n),a1=lerp(-2.75,-0.4,(k+1)/n),lit=Math.max(0,Math.cos(((a0+a1)/2)-(Lx>0?-0.9:-2.25)));c.strokeStyle=`rgba(255,246,228,${(a*(0.25+0.75*lit)).toFixed(3)})`;c.beginPath();c.arc(0,-0.12*R,R*sr,a0,a1+0.02);c.stroke();}}
  c.restore();c.restore();}
function tipsEdge(c,xa,xb,y,n,R,dep){for(let i=1;i<=n;i++){const xm=lerp(xa,xb,(i-0.5)/n),xe=lerp(xa,xb,i/n);c.quadraticCurveTo(xm,y+dep*R*(0.6+hash(i)*0.6),xe,y);}}
const SHEETS={
  backLong:(c,R,wv)=>{const w=wv?0.1:0;c.beginPath();c.moveTo(-1.16*R,-0.6*R);c.bezierCurveTo(-1.25*R,-1.35*R,1.25*R,-1.35*R,1.16*R,-0.6*R);
    c.bezierCurveTo((1.3+w)*R,0.2*R,(1.28-w)*R,0.95*R,(1.0+w)*R,1.7*R);c.quadraticCurveTo(0.75*R,1.98*R,0.4*R,1.9*R);c.quadraticCurveTo(0.2*R,2.02*R,0,1.96*R);c.quadraticCurveTo(-0.2*R,2.02*R,-0.4*R,1.9*R);c.quadraticCurveTo(-0.75*R,1.98*R,-(1.0+w)*R,1.7*R);
    c.bezierCurveTo(-(1.28-w)*R,0.95*R,-(1.3+w)*R,0.2*R,-1.16*R,-0.6*R);c.closePath();},
  backBob:(c,R)=>{c.beginPath();c.moveTo(-1.18*R,-0.4*R);c.bezierCurveTo(-1.32*R,-1.35*R,1.32*R,-1.35*R,1.18*R,-0.4*R);c.bezierCurveTo(1.28*R,0.3*R,1.22*R,0.6*R,1.08*R,0.74*R);c.quadraticCurveTo(0,0.84*R,-1.08*R,0.74*R);c.bezierCurveTo(-1.22*R,0.6*R,-1.28*R,0.3*R,-1.18*R,-0.4*R);c.closePath();},
  curtain:(c,R,side,wv,len)=>{c.beginPath();c.moveTo(side*0.02*R,-1.02*R);c.bezierCurveTo(side*0.8*R,-1.05*R,side*1.22*R,-0.6*R,side*(wv?1.25:1.16)*R,0.1*R);c.bezierCurveTo(side*(wv?1.0:1.12)*R,len*0.6*R,side*(wv?1.25:1.1)*R,len*0.85*R,side*1.02*R,len*R);
    c.quadraticCurveTo(side*0.9*R,(len-0.1)*R,side*0.84*R,(len-0.02)*R);c.bezierCurveTo(side*0.9*R,0.2*R,side*0.86*R,-0.5*R,side*0.02*R,-0.8*R);c.closePath();},
};
// long / wavy / bob: front = skull dome locks + two solid curtain sheets; behind = one solid sheet
HSTYLES.long=K=>[...HG.dome(8,{vol:0.06})];HSTYLES.wavy=K=>[...HG.dome(8,{vol:0.12})];
HSTYLES.bob=K=>[...HG.dome(9,{vol:0.08}),...HG.hairline(7,-0.24,0.74,{jag:0.01,w1:0.3})];
HBACK.long=HBACK.wavy=HBACK.bob=null;
HBACK.ponytail=(K,vw,t)=>{const tx=vw==='front'?0.0:-1.0,ty=vw==='front'?-1.15:-0.4,sw=Math.sin((t||0)*3)*0.08;return [HL.L(tx,ty,tx-0.42+sw,ty+0.5,tx-0.25+sw,ty+1.15,tx-0.12+sw*1.5,ty+1.8,0.62,0.05,0)];};
const _hairLayer4=hairLayer;
hairLayer=function(c,R,s,f,o,K){const name=styleName(K),col=K.hair||'#3a2a20',vw=o.back?'back':(o.view||'3q');
  if(vw==='back'&&['long','wavy','bob'].includes(name)){hairSheet(c,R,s,col,()=>name==='bob'?SHEETS.backBob(c,R):SHEETS.backLong(c,R,name==='wavy'),{wave:name==='wavy',y1:(name==='bob'?0.8:1.9)*R,sheenY:-0.55*R});return;}
  _hairLayer4(c,R,s,f,o,K);
  if((name==='long'||name==='wavy')&&vw!=='back'){c.save();if(vw==='side'){c.translate(-f*R*0.2,0);c.scale(f*0.86,1);}else if(vw==='3q'){c.translate(-f*R*0.06,0);c.scale(f*0.96,1);}
    const wv=name==='wavy',len=0.62;for(const sd of vw==='side'?[-1]:[-1,1])hairSheet(c,R,s,col,()=>SHEETS.curtain(c,R,sd,wv,len),{wave:wv,x0:sd<0?-1.25*R:0,x1:sd<0?0:1.25*R,y0:-1.05*R,y1:len*R,sheenY:-0.75*R});c.restore();}
  if(name==='bob'&&vw!=='back'){c.save();if(vw==='3q'){c.translate(-f*R*0.06,0);c.scale(f*0.96,1);}else if(vw==='side'){c.translate(-f*R*0.2,0);c.scale(f*0.86,1);}
    for(const sd of vw==='side'?[-1]:[-1,1])hairSheet(c,R,s,col,()=>SHEETS.curtain(c,R,sd,false,0.66),{x0:sd<0?-1.25*R:0,x1:sd<0?0:1.25*R,y0:-1.05*R,y1:0.66*R,sheenY:-0.75*R});c.restore();}};
const _longHair4=longHair2;
longHair2=function(c,hc,s,f,o,K,HR){const name=styleName(K);if(!['long','wavy','bob'].includes(name)||o.back)return _longHair4(c,hc,s,f,o,K,HR);
  const R=HR*s,col=shd2(K.hair||'#4a2418',-0.12),vw=o.view||'3q';c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);if(vw==='side'){c.translate(-f*R*0.35,0);c.scale(f*0.8,1);}else if(vw==='3q'){c.translate(-f*R*0.12,0);c.scale(f,1);}
  hairSheet(c,R,s,col,()=>name==='bob'?SHEETS.backBob(c,R):SHEETS.backLong(c,R,name==='wavy'),{wave:name==='wavy',y1:(name==='bob'?0.8:1.9)*R,sheenY:-0.6*R});c.restore();};
// ===== dedicated SIDE-VIEW hair (authored facing +x): solid sculpted base + locks, per reference =====
let SIDEBASE=(c,R,o={})=>{const hl=o.hl??-0.6,nape=o.nape??0.5,vol=o.vol??0;c.beginPath();c.moveTo(0.64*R,hl*R);c.bezierCurveTo(0.72*R,(-1.0-vol)*R,0.2*R,(-1.26-vol)*R,-0.35*R,(-1.22-vol)*R);
  c.bezierCurveTo(-1.0*R,(-1.12-vol)*R,-1.22*R,-0.5*R,-1.14*R,0.05*R);c.bezierCurveTo(-1.1*R,0.35*R,-0.95*R,nape*R,-0.72*R,nape*R);c.bezierCurveTo(-0.45*R,(nape-0.05)*R,-0.3*R,0.25*R,-0.2*R,-0.02*R);
  c.bezierCurveTo(-0.1*R,-0.25*R,0.25*R,(hl+0.22)*R,0.64*R,hl*R);c.closePath();};
const SIDESTYLE={
  fringe:{base:{hl:-0.5},locks:()=>{const L=[];for(let i=0;i<6;i++){const u=i/5;L.push(HL.L(-0.1-u*0.4,-1.12+u*0.08,0.4-u*0.3,-1.15+u*0.1,0.72-u*0.2,-0.8+u*0.15,0.74-u*0.32,-0.38+u*0.08,0.5,0.04,2));}for(let i=0;i<6;i++){const a=Math.PI*(1.05+i*0.11);L.push(HL.L(-0.2,-1.1,Math.cos(a)*0.9-0.1,Math.sin(a)*1.1-0.1,Math.cos(a)*1.15-0.05,Math.sin(a)*0.8+0.1,Math.cos(a)*1.0-0.1,Math.sin(a)*0.5+0.45,0.6,0.08,1));}return L;}},
  sidepart:{base:{hl:-0.6},locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6;L.push(HL.L(0.5-u*0.15,-0.95+u*0.05,0.2-u*0.2,-1.3+u*0.15,-0.5-u*0.3,-1.15+u*0.2,-1.0-u*0.1,-0.3+u*0.55,0.55,0.08,1));}L.push(HL.L(0.3,-1.05,0.7,-1.05,0.85,-0.7,0.7,-0.45,0.45,0.05,2));return L;}},
  quiff:{base:{hl:-0.6,vol:-0.04},locks:()=>{const L=[];for(let i=0;i<6;i++){const u=i/5;L.push(HL.L(0.6-u*0.25,-0.62-u*0.1,0.75-u*0.2,-1.3-u*0.05,0.2-u*0.2,-1.62+u*0.12,-0.3-u*0.3,-1.3+u*0.15,0.5,0.08,2));}for(let i=0;i<5;i++){const a=Math.PI*(1.1+i*0.12);L.push(HL.L(-0.2,-1.05,Math.cos(a)*0.95,Math.sin(a)*1.05,Math.cos(a)*1.15,Math.sin(a)*0.7+0.1,Math.cos(a)*1.0-0.1,Math.sin(a)*0.45+0.4,0.55,0.08,1));}return L;}},
  buzz:{base:{hl:-0.58,vol:-0.1,nape:0.32},locks:()=>{const L=[];for(let i=0;i<14;i++){const a=Math.PI*(0.98+i*0.085);L.push(HL.L(Math.cos(a)*0.55,Math.sin(a)*0.55-0.2,Math.cos(a)*0.85,Math.sin(a)*0.88-0.15,Math.cos(a)*1.0,Math.sin(a)*0.98-0.1,Math.cos(a)*1.03,Math.sin(a)*1.02-0.05,0.26,0.08,1));}return L;}},
  curly:{base:{hl:-0.55,vol:0.08},locks:()=>[...HG.curls(1.08,12,Math.PI*0.95,Math.PI*1.95,{sz:0.3,layer:1}),...HG.curls(0.8,8,Math.PI*1.0,Math.PI*1.85,{dir:-1,sz:0.27,layer:2}),...HG.curls(0.55,4,Math.PI*1.25,Math.PI*1.75,{dy:-0.35,sz:0.22,layer:2})]},
  afro:{base:{hl:-0.55,vol:0.25,nape:0.6},locks:()=>[...HG.curls(1.3,14,Math.PI*0.85,Math.PI*2.0,{dy:-0.15,sz:0.36,layer:1}),...HG.curls(0.95,9,Math.PI*0.95,Math.PI*1.9,{dy:-0.2,dir:-1,sz:0.32,layer:2})]},
  slick:{base:{hl:-0.62},locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6;L.push(HL.L(0.6-u*0.05,-0.62-u*0.42,0.2,-1.2+u*0.1,-0.6,-1.1+u*0.3,-1.05+u*0.05,-0.4+u*0.75,0.5,0.1,1));}return L;}},
  messy:{base:{hl:-0.5,vol:0.08},locks:()=>{const L=SIDESTYLE.fringe.locks();L.push(HL.L(-0.1,-1.15,0.1,-1.5,0.35,-1.5,0.45,-1.35,0.3,0.04,2),HL.L(-0.5,-1.1,-0.7,-1.45,-0.95,-1.35,-1.1,-1.15,0.3,0.04,2));return L;}},
  spiky:{base:{hl:-0.5},locks:()=>{const L=[];for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*0.13);L.push(HL.L(Math.cos(a)*0.3-0.1,-0.7,Math.cos(a)*0.9,Math.sin(a)*0.95-0.1,Math.cos(a)*1.25,Math.sin(a)*1.2-0.15,Math.cos(a)*1.5,Math.sin(a)*1.45-0.2,0.5,0.0,1));}return L;}},
  long:{base:{hl:-0.62,nape:0.45},locks:()=>{const L=[];for(let i=0;i<5;i++){const u=i/4;L.push(HL.L(0.45-u*0.2,-1.0,0.0-u*0.3,-1.25+u*0.1,-0.7-u*0.3,-0.9+u*0.2,-1.05-u*0.05,-0.1+u*0.4,0.6,0.12,1));}L.push(HL.L(0.5,-0.95,0.75,-0.7,0.6,-0.3,0.35,0.05,0.42,0.05,2));return L;}},
  bob:{base:{hl:-0.45,nape:0.7},locks:()=>{const L=[];for(let i=0;i<4;i++){const u=i/3;L.push(HL.L(0.2-u*0.2,-1.15,0.6-u*0.2,-1.05,0.75-u*0.15,-0.6,0.76-u*0.12,-0.3,0.42,0.3,2));}return L;}},
  ponytail:{base:{hl:-0.62},tie:[-1.08,-0.42],locks:()=>SIDESTYLE.slick.locks().map(l=>({...l,p:[l.p[0],l.p[1],l.p[2],l.p[3],l.p[4]*0.9,l.p[5],-1.05,-0.42]}))},
  bun:{base:{hl:-0.62},tie:[-0.62,-1.2],locks:()=>SIDESTYLE.slick.locks().map(l=>({...l,p:[l.p[0],l.p[1],l.p[2],l.p[3],-0.4,-1.2,-0.62,-1.15]}))},
};
SIDESTYLE.wavy=SIDESTYLE.long;
function drawSideHair(c,R,s,f,o,K){const name=styleName(K),st=SIDESTYLE[name]||SIDESTYLE.fringe,col=K.hair||'#3a2a20';c.save();c.scale(f,1);
  hairSheet(c,R,s,col,()=>SIDEBASE(c,R,st.base||{}),{x0:-1.2*R,x1:0.8*R,y0:-1.3*R,y1:0.6*R,sheenR:0.95});
  renderLocks(c,st.locks(),R,s,col);
  if(st.tie){c.fillStyle='#2a1a1a';c.strokeStyle=K2;c.lineWidth=2.5*s;c.beginPath();c.ellipse(st.tie[0]*R,st.tie[1]*R,0.12*R,0.15*R,0.3,0,TAU);c.fill();c.stroke();}
  c.restore();}
const _hairLayerS=hairLayer;
hairLayer=function(c,R,s,f,o,K){if((o.view==='side')&&!o.back){drawSideHair(c,R,s,f,o,K);return;}_hairLayerS(c,R,s,f,o,K);};
// side-view behind-head layers: ponytail tail, bun, long/wavy/bob mass
const _longHairS=longHair2;
longHair2=function(c,hc,s,f,o,K,HR){if(o.view!=='side'||o.back)return _longHairS(c,hc,s,f,o,K,HR);const name=styleName(K),R=HR*s,col=shd2(K.hair||'#4a2418',-0.1);
  c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);c.scale(f,1);
  if(name==='long'||name==='wavy'){const wv=name==='wavy';hairSheet(c,R,s,col,()=>{c.beginPath();c.moveTo(-0.2*R,-1.1*R);c.bezierCurveTo(-1.0*R,-1.1*R,-1.3*R,-0.4*R,(wv?-1.35:-1.22)*R,0.4*R);c.bezierCurveTo((wv?-1.05:-1.2)*R,1.1*R,(wv?-1.4:-1.1)*R,1.5*R,-1.0*R,1.85*R);tipsEdge(c,-1.0*R,-0.15*R,1.8*R,3,R,0.14);c.bezierCurveTo((wv?0.05:-0.1)*R,1.2*R,-0.2*R,0.6*R,-0.1*R,0.2*R);c.lineTo(-0.2*R,-1.1*R);c.closePath();},{wave:wv,x0:-1.4*R,x1:0,y0:-1.1*R,y1:1.9*R,sheenR:0.9});}
  else if(name==='bob'){hairSheet(c,R,s,col,()=>{c.beginPath();c.moveTo(0.3*R,-1.1*R);c.bezierCurveTo(-0.8*R,-1.3*R,-1.35*R,-0.6*R,-1.22*R,0.2*R);c.bezierCurveTo(-1.18*R,0.55*R,-1.0*R,0.72*R,-0.8*R,0.78*R);c.lineTo(0.15*R,0.72*R);c.bezierCurveTo(0.2*R,0.3*R,0.1*R,-0.2*R,0.3*R,-1.1*R);c.closePath();},{x0:-1.3*R,x1:0.3*R,y0:-1.2*R,y1:0.8*R});}
  else if(name==='ponytail'){const sw=Math.sin((o.t||0)*3)*0.08;renderLocks(c,[HL.L(-1.05,-0.42,-1.6+sw,-0.2,-1.45+sw,0.6,-1.25+sw*1.5,1.25,0.6,0.04,0),HL.L(-1.08,-0.45,-1.4+sw,0.0,-1.55+sw,0.4,-1.5+sw,0.9,0.4,0.03,0)],R,s,col,{noShadow:1});}
  else if(name==='bun'){renderLocks(c,HBACK.bun(K,'front').map(l=>({...l,p:l.p.map((v,i)=>i%2===0?v-0.62:v+0.05)})),R,s,col,{noShadow:1});}
  c.restore();};
// ===== SIDE v2: hair hugs skull, hairline stays above brow (eye at x.5,y-.13R; brow -.37R) =====
SIDEBASE=(c,R,o={})=>{const v=o.vol??0,nape=o.nape??0.58,fx=o.fx??0.8,fy=o.fy??-0.64;c.beginPath();
  c.moveTo(fx*R,fy*R);c.bezierCurveTo((fx+0.08)*R,(-1.02-v)*R,0.35*R,(-1.2-v)*R,-0.15*R,(-1.18-v)*R);
  c.bezierCurveTo((-0.8-v*0.5)*R,(-1.12-v)*R,(-1.16-v)*R,-0.6*R,(-1.12-v*0.6)*R,0.0);
  c.bezierCurveTo((-1.08-v*0.4)*R,0.32*R,-0.98*R,nape*R,-0.78*R,nape*R);
  c.bezierCurveTo(-0.52*R,(nape-0.02)*R,-0.32*R,0.28*R,-0.16*R,0.1*R); // nape -> behind ear, soft
  c.bezierCurveTo(-0.06*R,0.0,0.05*R,0.04*R,0.1*R,0.2*R);c.lineTo(0.18*R,0.17*R); // sideburn tip
  c.bezierCurveTo(0.17*R,-0.05*R,0.18*R,-0.3*R,0.32*R,-0.46*R); // sideburn front -> temple
  c.bezierCurveTo(0.48*R,-0.58*R,0.64*R,-0.6*R,fx*R,fy*R);c.closePath();};
const backFlow=(n,o={})=>{const L=[],a0=o.a0??0.8,a1=o.a1??1.15,ln=o.ln??1,cr=o.cr??[-0.1,-1.12];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0,a=Math.PI*(a0+(a1-a0)*u),r=(o.r??1.06),ex=Math.cos(a)*r,ey=Math.sin(a)*r*ln;
  const am=Math.PI*(1.5+(a/Math.PI-1.5)*0.5),cx=Math.cos(am)*1.18,cy=Math.sin(am)*1.18;L.push(HL.L(cr[0]+u*0.15,cr[1]+u*0.05,cx,cy,(cx+ex)/2*1.08,(cy+ey)/2*1.05,ex,ey,o.w0??0.55,o.w1??0.1,o.layer??1));}return L;};
const fwdSweep=(n,o={})=>{const L=[];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0;const ex=(o.ex??0.84)-u*(o.spread??0.28),ey=(o.ey??-0.64)-u*0.18;
  L.push(HL.L(-0.35+u*0.2,-1.08-u*0.06,0.15+u*0.1,(-1.32+u*0.05)-(o.lift??0),ex+0.12,ey-0.32-(o.lift??0)*0.5,ex,ey,o.w0??0.5,o.w1??0.05,2));}return L;};
SIDESTYLE.fringe={base:{vol:0.04},locks:()=>[...backFlow(6),...fwdSweep(6)]};
SIDESTYLE.messy={base:{vol:0.08},locks:()=>{const L=[...backFlow(6,{w1:0.06}),...fwdSweep(5,{spread:0.35})];L.push(HL.L(-0.2,-1.15,-0.1,-1.42,0.15,-1.45,0.28,-1.36,0.28,0.02,2),HL.L(-0.6,-1.05,-0.75,-1.35,-0.98,-1.3,-1.1,-1.12,0.28,0.02,2),HL.L(-0.95,-0.4,-1.2,-0.2,-1.22,0.05,-1.1,0.22,0.3,0.03,2));return L;}};
SIDESTYLE.quiff={base:{vol:0.02},locks:()=>{const L=backFlow(6,{a0:0.82});for(let i=0;i<5;i++){const u=i/4;L.push(HL.L(-0.45+u*0.15,-1.0-u*0.05,-0.05,-1.48+u*0.04,0.75-u*0.1,-1.58+u*0.08,0.98-u*0.08,-1.08+u*0.12,0.55,0.07,2));}L.push(HL.L(0.7,-0.68,0.95,-0.8,1.02,-0.98,0.96,-1.1,0.35,0.05,2));return L;}};
SIDESTYLE.sidepart={base:{vol:0.06},locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6,a=Math.PI*(0.85+u*0.32);L.push(HL.L(0.78-u*0.12,-0.68-u*0.1,0.72-u*0.3,-1.32,-0.2-u*0.4,-1.38+u*0.15,Math.cos(a)*1.08,Math.sin(a)*1.08,0.55,0.1,1+(i<3?1:0)));}L.push(HL.L(0.8,-0.66,0.98,-0.98,0.6,-1.38,0.1,-1.36,0.45,0.08,2));return L;}};
SIDESTYLE.slick={base:{vol:-0.02},locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6,a=Math.PI*(0.82+u*0.34);L.push(HL.L(0.8-u*0.1,-0.66-u*0.08,0.6-u*0.25,-1.24,-0.3-u*0.4,-1.26+u*0.15,Math.cos(a)*1.06,Math.sin(a)*1.06,0.5,0.12,1));}return L;}};
SIDESTYLE.buzz={base:{vol:-0.1,nape:0.42,fx:0.74,fy:-0.62},stipple:1,locks:()=>[]};
SIDESTYLE.curly={base:{vol:0.12},locks:()=>[...HG.curls(1.1,12,Math.PI*0.92,Math.PI*1.78,{sz:0.3,layer:1}),...HG.curls(0.82,8,Math.PI*1.0,Math.PI*1.72,{dir:-1,sz:0.27,layer:2}),...HG.curls(0.55,4,Math.PI*1.25,Math.PI*1.7,{dy:-0.35,sz:0.22,layer:2})]};
SIDESTYLE.afro={base:{vol:0.3,nape:0.62},locks:()=>[...HG.curls(1.32,15,Math.PI*0.85,Math.PI*1.8,{dy:-0.15,sz:0.36,layer:1}),...HG.curls(0.98,9,Math.PI*0.95,Math.PI*1.75,{dy:-0.2,dir:-1,sz:0.32,layer:2})]};
SIDESTYLE.spiky={base:{vol:0.04},locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6,a=Math.PI*(1.72-u*0.62);const sx=Math.cos(a)*0.92,sy=Math.sin(a)*0.98;const ln=0.42+0.18*Math.sin(u*Math.PI);
  const ex=sx-0.55-u*0.15,ey=sy-ln*(1-u)*0.9+u*0.25;L.push(HL.L(sx+0.25,sy+0.15,sx,sy-0.25,(sx+ex)/2,(sy+ey)/2-0.12,ex,ey,0.62,0.0,1+(i%2)));}return L;}};
SIDESTYLE.long={base:{vol:0.05,nape:0.45},locks:()=>{const L=[];for(let i=0;i<6;i++){const u=i/5,a=Math.PI*(0.82+u*0.3);L.push(HL.L(0.8-u*0.15,-0.66-u*0.12,0.55-u*0.3,-1.34,-0.4-u*0.35,-1.3+u*0.2,Math.cos(a)*1.12,Math.sin(a)*1.12,0.6,0.15,1+(i<2?1:0)));}return L;}};
SIDESTYLE.wavy=SIDESTYLE.long;
SIDESTYLE.bob={base:{vol:0.08,nape:0.5},locks:()=>{const L=backFlow(4,{a0:0.85,a1:1.1,layer:1});for(let i=0;i<5;i++){const u=i/4;L.push(HL.L(-0.3+u*0.1,-1.12,0.35+u*0.05,-1.3,0.88-u*0.05,-1.0,0.88-u*0.16,-0.6+u*0.03,0.45,0.32,2));}return L;}};
SIDESTYLE.ponytail={base:{vol:-0.02},tie:[-1.06,-0.5],locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6;L.push(HL.L(0.8-u*0.1,-0.66-u*0.1,0.5-u*0.3,-1.28+u*0.02,-0.5-u*0.2,-1.15+u*0.25,-1.0,-0.52+u*0.04,0.5,0.14,1));}return L;}};
SIDESTYLE.bun={base:{vol:-0.02},tie:[-0.66,-1.12],locks:()=>{const L=[];for(let i=0;i<7;i++){const u=i/6,a=Math.PI*(0.78+u*0.4);L.push(HL.L(i<4?0.8-u*0.15:Math.cos(a)*1.02,i<4?-0.66-u*0.1:Math.sin(a)*1.02,i<4?0.4:-1.15,i<4?-1.25:-0.6,i<4?-0.2:-0.95,i<4?-1.25:-1.0,-0.66,-1.1,0.5,0.14,1));}return L;}};
drawSideHair=function(c,R,s,f,o,K){const name=styleName(K),st=SIDESTYLE[name]||SIDESTYLE.fringe,col=K.hair||'#3a2a20';c.save();c.scale(f,1);
  hairSheet(c,R,s,col,()=>SIDEBASE(c,R,st.base||{}),{x0:-1.2*R,x1:0.9*R,y0:-1.3*R,y1:0.6*R,sheenR:0.95});
  if(st.stipple){c.save();SIDEBASE(c,R,st.base);c.clip();let sd=7;const rnd=()=>((sd=(sd*9301+49297)%233280)/233280);c.lineCap='round';
    for(let i=0;i<420;i++){const a=Math.PI*(0.7+rnd()*1.35),r=(0.55+rnd()*0.6)*R,x=Math.cos(a)*r,y=Math.sin(a)*r;const t=Math.atan2(y,x)+Math.PI*0.5;
      c.strokeStyle=rnd()<0.55?shd2(col,-0.35):shd2(col,0.25);c.globalAlpha=0.55;c.lineWidth=1.6*s;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(t)*3.2*s,y+Math.sin(t)*3.2*s);c.stroke();}
    c.globalAlpha=1;c.restore();}
  renderLocks(c,st.locks(),R,s,col);
  if(st.tie){c.fillStyle='#3a2226';c.strokeStyle=K2;c.lineWidth=2.5*s;c.beginPath();c.ellipse(st.tie[0]*R,st.tie[1]*R,0.11*R,0.14*R,0.3,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.ellipse((st.tie[0]-0.02)*R,(st.tie[1]-0.05)*R,0.05*R,0.04*R,0,0,TAU);c.fill();}
  c.restore();};
// side panel locks: flow from crown down over the side to the under-edge (sideburn->nape)
const sideFlow=(n,o={})=>{const L=[],E=[[0.13,0.12],[-0.08,0.06],[-0.3,0.24],[-0.52,0.46],[-0.78,0.52]];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0,k=u*(E.length-1),j=Math.min(E.length-2,Math.floor(k)),fr=k-j;
  const ex=E[j][0]+(E[j+1][0]-E[j][0])*fr,ey=E[j][1]+(E[j+1][1]-E[j][1])*fr;const sx=0.15-u*0.75,sy=-1.1+u*0.12;L.push(HL.L(sx,sy,sx-0.1,sy+0.45,ex+0.02,ey-0.45,ex,ey,o.w0??0.5,o.w1??0.14,o.layer??1));}return L;};
const pullBack=(n,tx,ty)=>{const L=[];for(let i=0;i<n;i++){const u=i/(n-1);const sx=0.15-u*0.5,sy=0.12+u*0.2;L.push(HL.L(sx,sy,sx-0.2,sy-0.35,tx+0.35,ty+0.25,tx,ty,0.5,0.14,0));}return L;};
['fringe','quiff','messy'].forEach(k=>{const f0=SIDESTYLE[k].locks;SIDESTYLE[k].locks=()=>[...sideFlow(6,{layer:0}),...f0()];});
{const f0=SIDESTYLE.spiky.locks;SIDESTYLE.spiky.locks=()=>[...sideFlow(5,{layer:0,w1:0.06}),...f0()];}
{const f0=SIDESTYLE.ponytail.locks;SIDESTYLE.ponytail.locks=()=>[...pullBack(5,-1.04,-0.5),...f0()];}
{const f0=SIDESTYLE.bun.locks;SIDESTYLE.bun.locks=()=>[...pullBack(5,-0.66,-1.1),...f0()];}
{const f0=SIDESTYLE.sidepart.locks;SIDESTYLE.sidepart.locks=()=>[...sideFlow(5,{layer:0}),...f0()];}
{const pb=(n,tx,ty)=>{const L=[];const S=[[0.3,-0.48],[0.17,-0.15],[0.13,0.14],[-0.12,0.08],[-0.4,0.3]];for(let i=0;i<n;i++){const u=i/(n-1),[sx,sy]=S[i];const ex=tx+0.05-u*0.08,ey=ty-0.06+u*0.14;
  L.push(HL.L(sx,sy,sx-0.25,sy-0.18-(1-u)*0.1,(sx+ex)/2-0.05,(sy+ey)/2-0.2,ex,ey,0.42,0.12,1));}return L;};
 SIDESTYLE.ponytail.locks=()=>[...pb(5,-1.04,-0.5),...SIDESTYLE.slick.locks().map(l=>({...l,p:[l.p[0],l.p[1],l.p[2],l.p[3],l.p[4],l.p[5],-1.0,-0.52],layer:2}))];
 SIDESTYLE.bun.locks=()=>[...pb(5,-0.66,-1.1),...SIDESTYLE.slick.locks().map(l=>({...l,p:[l.p[0],l.p[1],l.p[2],l.p[3],-0.3,-1.25,-0.64,-1.12],layer:2}))];
 const f0=SIDESTYLE.spiky.locks;SIDESTYLE.spiky.locks=()=>f0().map(l=>l.layer===0?{...l,w1:0.16}:l);}
