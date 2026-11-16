// ===== style 2 · character upgrade: sleeves/trousers, lapels, face planes, back view, cut-off, layered light pass =====
(function(){let src=fig2.toString().replace("HR=27;","HR=40.1;").replace("y:nk.y+up.y*(HR+6)*s};","y:nk.y+up.y*(HR-2)*s};").replace("x:nk.x+up.x*(HR+6)*s+","x:nk.x+up.x*(HR-2)*s+").replace("  // torso (white tube)","  neck2(c,nk,hc,s,K,o);\n  // torso (white tube)");
  const rep=(a,b)=>{if(!src.includes(a))throw new Error('patch miss: '+a.slice(0,40));src=src.replace(a,b);};
  rep("limb2(c,shB,AB.e,AB.h,10,shd(K.limb,-0.18),s);fist2(c,AB.h,s,shd(K.limb,-0.18));","if(o.cut!=null){c.save();c.beginPath();c.rect(-1e5,-1e5,2e5,1e5+o.cut);c.clip();}limb2(c,shB,AB.e,AB.h,K.coat?14:10,shd(K.coat||K.limb,-0.25),s);cuff2(c,AB,s,K);fist2(c,AB.h,s,shd(K.limb,-0.18));if(o.propB)o.propB(c,AB.h,s,f,t);");
  rep("limb2(c,hip,LB.e,LB.h,12,shd(K.limb,-0.18),s)","limb2(c,hip,LB.e,LB.h,K.coat?15:12,shd(K.pants||(K.coat?shd2(K.coat,-0.18):K.limb),-0.2),s)");
  rep("limb2(c,hip,LF.e,LF.h,12,K.limb,s)","limb2(c,hip,LF.e,LF.h,K.coat?15:12,K.pants||(K.coat?shd2(K.coat,-0.18):K.limb),s)");
  rep("if(K.vest){","if(K.coat&&!o.back&&!K.robe&&!K.skirtL)lapels2(c,s,f,K,TOR);if(K.robe&&!o.back)robe2(c,s,f,K,TOR);if(K.vest&&!o.back){");
  rep("if(K.buttons){","if(K.buttons&&!o.back){");
  rep("  // front arm\n","  if(o.cut!=null)c.restore();\n  // front arm\n");
  rep("limb2(c,shF,AF.e,AF.h,10,K.limb,s);","limb2(c,shF,AF.e,AF.h,K.coat?14:10,K.coat||K.limb,s);cuff2(c,AF,s,K);");
  rep("  head2(c,hc,s,f,o,K,t,lean,HR);","  longHair2(c,hc,s,f,o,K,HR);head2(c,hc,s,f,o,K,t,lean,HR);");
  rep("  if(o.ghost){","  if(o.headOnly){const hc={x:o.x,y:o.y};longHair2(c,hc,s,f,o,K,HR);head2(c,hc,s,f,o,K,t,0,HR);return {hip:hc,hc,hf:hc,hb:hc};}\n  if(o.ghost){");
  (0,eval)('fig2='+src);})();
function shd2(hex,k){const m=shd(hex,k).match(/\d+/g).map(Number);return '#'+m.map(v=>v.toString(16).padStart(2,'0')).join('');}
function cuff2(c,A,s,K){if(!K.coat)return;const dx=A.h.x-A.e.x,dy=A.h.y-A.e.y,d=Math.hypot(dx,dy)||1;const x=A.h.x-dx/d*12*s,y=A.h.y-dy/d*12*s;c.fillStyle='#ecebe6';c.strokeStyle=K2;c.lineWidth=2.5*s;c.beginPath();c.ellipse(x,y,7.5*s,5*s,Math.atan2(dy,dx)+Math.PI/2,0,TAU);c.fill();c.stroke();}
function lapels2(c,s,f,K,TOR){const top=-TOR*s+8*s,col=shd2(K.coat,-0.28);
  c.fillStyle='#ecebe6';c.strokeStyle=K2;c.lineWidth=2.5*s;c.beginPath();c.moveTo(-10*s,top);c.lineTo(10*s,top);c.lineTo(f*2*s,top+24*s);c.closePath();c.fill();c.stroke();
  c.fillStyle=col;for(const d of [-1,1]){c.beginPath();c.moveTo(d*11*s,top);c.lineTo(d*21*s,top+4*s);c.lineTo(d*14*s,top+22*s);c.lineTo(d*3*s,top+44*s);c.closePath();c.fill();c.stroke();}
  if(K.tie){c.fillStyle=K.tie;c.beginPath();c.moveTo(f*1*s-3*s,top+6*s);c.lineTo(f*1*s+3*s,top+6*s);c.lineTo(f*2*s+5*s,top+34*s);c.lineTo(f*2*s,top+40*s);c.lineTo(f*2*s-5*s,top+34*s);c.closePath();c.fill();c.lineWidth=1.8*s;c.stroke();}
  c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(-f*20*s,-30*s,14*s*-f,2.5*s);
  c.fillStyle='rgba(0,0,0,0.28)';c.beginPath();c.ellipse(f*3*s,top+3*s,16*s,6*s,0,0,TAU);c.fill();
  c.save();c.setLineDash([2.2*s,2.2*s]);c.strokeStyle='rgba(255,240,220,0.22)';c.lineWidth=1*s;for(const d of [-1,1]){c.beginPath();c.moveTo(d*19*s,top+6*s);c.lineTo(d*13*s,top+22*s);c.lineTo(d*5*s,top+40*s);c.stroke();}c.restore();
  if(!K.buttons){for(let i=0;i<2;i++){const by=top+52*s+i*18*s;c.fillStyle=shd2(K.coat,-0.5);c.beginPath();c.arc(f*3*s,by,2.6*s,0,TAU);c.fill();c.fillStyle='rgba(255,240,220,0.35)';c.beginPath();c.arc(f*3*s+L2.dx*0.8*s,by-0.8*s,0.9*s,0,TAU);c.fill();}
    c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=1.6*s;seg(c,-f*8*s,top+30*s,-f*20*s,top+30*s);}
  c.save();c.globalCompositeOperation='source-atop';c.strokeStyle='rgba(255,255,255,0.035)';c.lineWidth=0.8*s;for(let i=-20;i<20;i++)seg(c,i*3*s,top,i*3*s+40*s,top+130*s);c.strokeStyle='rgba(0,0,0,0.05)';for(let i=-20;i<20;i++)seg(c,i*3*s+1.5*s,top,i*3*s+41.5*s,top+130*s);c.restore();}
// face planes under the features: eye sockets, nose, cheek/jaw core shadow, ear; back view hides the face
const _face2=face2;
face2=function(c,o,s,f,R,t){
  if(o.back){c.save();c.beginPath();c.arc(0,0,R,0,TAU);c.clip();const g=c.createLinearGradient(0,-R*0.2,0,R);g.addColorStop(0,'#4a3a2e');g.addColorStop(1,'#241a14');c.fillStyle=g;c.beginPath();c.moveTo(-R*1.1,R*0.25);c.quadraticCurveTo(-R*0.5,R*0.62,0,R*0.5);c.quadraticCurveTo(R*0.5,R*0.62,R*1.1,R*0.25);c.lineTo(R*1.1,-R*1.2);c.lineTo(-R*1.1,-R*1.2);c.closePath();c.fill();c.strokeStyle='rgba(255,220,180,0.07)';c.lineWidth=1.4*s;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*R*0.22,-R*0.6);c.quadraticCurveTo(i*R*0.26,R*0.1,i*R*0.2,R*0.42);c.stroke();}
    c.fillStyle='rgba(40,30,40,0.25)';c.beginPath();c.ellipse(0,R*0.95,R*0.7,R*0.3,0,0,TAU);c.fill();c.restore();return;}
  c.save();c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.clip();
  // shadow side core band (hard-edged layer) + softer second layer
  const sd=-L2.dx;c.fillStyle='rgba(60,50,70,0.16)';c.beginPath();c.ellipse(sd*R*0.62,R*0.1,R*0.72,R*1.2,0,0,TAU);c.fill();
  c.fillStyle='rgba(40,30,50,0.16)';c.beginPath();c.ellipse(sd*R*0.95,R*0.15,R*0.55,R*1.2,0,0,TAU);c.fill();
  // jaw/neck occlusion
  c.fillStyle='rgba(50,40,55,0.18)';c.beginPath();c.ellipse(f*R*0.1,R*1.05,R*0.95,R*0.42,0,0,TAU);c.fill();
  // eye sockets
  const fx=f*7*s;c.fillStyle='rgba(90,80,90,0.13)';for(const k of [-9.5,9.5]){c.beginPath();c.ellipse(fx+k*s,-4*s,8*s,7*s,0,0,TAU);c.fill();}
  // cheek warmth + key highlight
  
  c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.ellipse(L2.dx*R*0.42,-R*0.48,R*0.22,R*0.12,-0.5*L2.dx,0,TAU);c.fill();
  c.restore();
  const K0=KIND2[o.kind]||{};
  // sideburn / hairline under the hat
  if(K0.hat&&K0.hat!=='none'){c.save();c.beginPath();c.arc(0,0,R-2.5*s,0,TAU);c.clip();c.fillStyle=K0.hair||'#3a2a20';c.beginPath();c.moveTo(-f*R*0.55,-R*0.62);c.quadraticCurveTo(-f*R*0.62,-R*0.1,-f*R*0.5,R*0.12);c.lineTo(-f*R*1.05,R*0.12);c.lineTo(-f*R*1.05,-R*0.75);c.closePath();c.fill();
    // hat brim cast shadow across the brow
    if(K0.hat&&K0.hat!=='none'){c.fillStyle='rgba(30,22,30,0.22)';c.beginPath();c.ellipse(f*R*0.1,-R*0.78,R*1.2,R*0.3,0,0,TAU);c.fill();}
    c.restore();}
  // nose: shading only. side plane shadow, bridge highlight, tip highlight, cast shadow under the tip
  const nx=fx+f*2.5*s,ny=1*s;c.save();
  c.fillStyle='rgba(80,62,72,0.30)';c.beginPath();c.moveTo(nx-L2.dx*0.5*s,ny-9*s);c.quadraticCurveTo(nx-L2.dx*6*s,ny-1*s,nx-L2.dx*5*s,ny+4*s);c.quadraticCurveTo(nx-L2.dx*1*s,ny+6*s,nx,ny+4*s);c.quadraticCurveTo(nx-L2.dx*1.5*s,ny-2*s,nx-L2.dx*0.5*s,ny-9*s);c.fill();
  const ns=c.createRadialGradient(nx,ny+6*s,0,nx,ny+6*s,6*s);ns.addColorStop(0,'rgba(60,42,52,0.5)');ns.addColorStop(1,'rgba(60,42,52,0)');c.fillStyle=ns;c.beginPath();c.ellipse(nx,ny+6*s,6*s,2.6*s,0,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(nx+L2.dx*1.2*s,ny-4*s,1.1*s,3.4*s,0,0,TAU);c.fill();
  const nh=c.createRadialGradient(nx+L2.dx*1.2*s,ny+2*s,0,nx+L2.dx*1.2*s,ny+2*s,3*s);nh.addColorStop(0,'rgba(255,255,255,0.9)');nh.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=nh;c.beginPath();c.arc(nx+L2.dx*1.2*s,ny+2*s,3*s,0,TAU);c.fill();c.restore();
  const E0=o.eyes||'open';const DOT=['open','sly','half','angry'].includes(E0);
  _face2(c,DOT?{...o,eyes:'none'}:o,s,f,R,t);
  if(DOT)dotEyes(c,fx,-3*s,s,E0,o.look);
  if(o.eyes==='happy'){c.strokeStyle=K2;c.lineCap='round';c.lineWidth=3.6*s;for(const kx of [-9.5,9.5]){c.beginPath();c.arc(fx+kx*s,-1*s,5.6*s,Math.PI*1.12,Math.PI*1.88);c.stroke();}}
  // finishing pass: eyelid shade + crisp upper lid, lip shading under the mouth
  const E=o.eyes||'open';if(E==='wide'||E==='shock'||E==='joy'){for(const kx of [-9.5,9.5]){const ex2=fx+kx*s,ey2=-3*s;c.save();c.beginPath();c.ellipse(ex2,ey2,5.2*s,6.4*s,0,0,TAU);c.clip();c.fillStyle='rgba(60,50,70,0.28)';c.fillRect(ex2-6*s,ey2-7*s,12*s,4*s);c.restore();
    c.strokeStyle=K2;c.lineWidth=2.8*s;c.beginPath();c.ellipse(ex2,ey2,5.4*s,6.6*s,0,Math.PI*1.12,Math.PI*1.88);c.stroke();}}
  const mx2=fx*0.8,my2=(o.stache?15:12)*s;c.fillStyle='rgba(80,55,60,0.22)';c.beginPath();c.ellipse(mx2,my2+5*s,6*s,2.2*s,0,0,TAU);c.fill();
};
// ---------- layered light pass on every character ----------
const LYR={};
function lyr(k,w,h){let o=LYR[k];if(!o||o.width!==w||o.height!==h){o=document.createElement('canvas');o.width=w;o.height=h;LYR[k]=o;}return o;}
function hexA(h,a){const n=parseInt(h.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;}
const _fig2raw=fig2;
fig2=function(c,o){
  if(o.ghost||window.NOLIGHT)return _fig2raw(c,o);
  const cw=c.canvas.width,ch=c.canvas.height,m=c.getTransform(),s=o.s||1,sc=Math.hypot(m.a,m.b);
  if(s*sc<0.9)return _fig2raw(c,o);
  const P=(x,y)=>({x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f});const p0=P(o.x-360*s,o.y-440*s),p1=P(o.x+360*s,o.y+(o.headOnly?160:40)*s);
  const x0=Math.max(0,Math.floor(Math.min(p0.x,p1.x))),y0=Math.max(0,Math.floor(Math.min(p0.y,p1.y))),x1=Math.min(cw,Math.ceil(Math.max(p0.x,p1.x))),y1=Math.min(ch,Math.ceil(Math.max(p0.y,p1.y)));
  const bw=x1-x0,bh=y1-y0;if(bw<4||bh<4)return _fig2raw(c,o);
  const A=lyr('a',cw,ch),B=lyr('b',cw,ch),C=lyr('c',cw,ch);const a=A.getContext('2d'),b=B.getContext('2d'),r=C.getContext('2d');
  a.setTransform(1,0,0,1,0,0);a.globalCompositeOperation='source-over';a.globalAlpha=1;a.clearRect(x0,y0,bw,bh);a.setTransform(m);
  // contact/cast shadows stay on the scene
  const res=_fig2raw(a,{...o});a.setTransform(1,0,0,1,0,0);
  b.setTransform(1,0,0,1,0,0);b.globalCompositeOperation='source-over';b.clearRect(x0,y0,bw,bh);b.drawImage(A,x0,y0,bw,bh,x0,y0,bw,bh);
  const Ld=L2.dx||1,rim=L2.rim||'#ffb35a',amb=L2.amb||rim,k=s*sc;
  const band=(off,col,dy)=>{r.setTransform(1,0,0,1,0,0);r.globalCompositeOperation='source-over';r.clearRect(x0,y0,bw,bh);r.drawImage(B,x0,y0,bw,bh,x0,y0,bw,bh);r.globalCompositeOperation='source-in';r.fillStyle=col;r.fillRect(x0,y0,bw,bh);
    r.globalCompositeOperation='destination-out';r.drawImage(B,x0,y0,bw,bh,x0+Ld*off,y0+dy,bw,bh);};
  // 1 ambient tint
  a.globalCompositeOperation='source-atop';a.fillStyle=hexA(amb,0.10);a.fillRect(x0,y0,bw,bh);
  // 2 layered core shadows (hard-edged bands, away from the key)
  band(16*k,'rgba(30,20,44,0.22)',-4*k);a.globalCompositeOperation='source-atop';a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  band(7*k,'rgba(18,10,30,0.26)',-2*k);a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  // 3 key-side highlight band + specular edge
  band(-9*k,'rgba(255,236,205,0.16)',6*k);a.globalCompositeOperation='lighter';a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  // 4 vertical falloff: head bright, legs into shadow
  const hc=P(res.hc.x,res.hc.y),ft=P(o.x,o.y);a.globalCompositeOperation='source-atop';const v=a.createLinearGradient(0,hc.y-40*k,0,ft.y);v.addColorStop(0,'rgba(255,240,215,0.10)');v.addColorStop(0.5,'rgba(0,0,0,0)');v.addColorStop(0.85,'rgba(12,8,18,0.20)');v.addColorStop(1,hexA(amb,0.16));a.fillStyle=v;a.fillRect(x0,y0,bw,bh);
  // 5 rim light from behind on the shadow side
  band(-3.2*k,rim,-2.4*k);r.globalCompositeOperation='source-over';
  a.globalCompositeOperation='source-atop';a.globalAlpha=0.0;a.globalAlpha=1;
  const R2=lyr('r2',cw,ch),rr2=R2.getContext('2d');rr2.setTransform(1,0,0,1,0,0);rr2.globalCompositeOperation='source-over';rr2.clearRect(x0,y0,bw,bh);rr2.drawImage(B,x0,y0,bw,bh,x0,y0,bw,bh);rr2.globalCompositeOperation='source-in';rr2.fillStyle=rim;rr2.fillRect(x0,y0,bw,bh);rr2.globalCompositeOperation='destination-out';rr2.drawImage(B,x0,y0,bw,bh,x0+Ld*3.4*k,y0+2.2*k,bw,bh);
  a.globalCompositeOperation='lighter';a.globalAlpha=0.75;a.drawImage(R2,x0,y0,bw,bh,x0,y0,bw,bh);a.globalAlpha=1;
  // glow halo of the rim spilling outside the silhouette
  c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=0.14;c.filter=`blur(${Math.max(1,4*k)}px)`;c.globalCompositeOperation='lighter';c.drawImage(R2,x0,y0,bw,bh,x0-Ld*2*k,y0-1.5*k,bw,bh);c.restore();
  a.globalCompositeOperation='destination-in';a.drawImage(B,x0,y0,bw,bh,x0,y0,bw,bh);a.globalCompositeOperation='source-over';
  c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(A,x0,y0,bw,bh,x0,y0,bw,bh);c.restore();
  return res;};
// ---------- lenses: depth of field + foreground blur ----------
function dof(c,px,fn){if(px<=0.3){fn(c);return;}const cw=c.canvas.width,ch=c.canvas.height,m=c.getTransform();const D=lyr('dof'+(window.__dofN=(window.__dofN||0)+1)%3,cw,ch),d=D.getContext('2d');
  d.setTransform(1,0,0,1,0,0);d.globalCompositeOperation='source-over';d.globalAlpha=1;d.filter='none';d.clearRect(0,0,cw,ch);d.setTransform(m);const r=fn(d);
  c.save();c.setTransform(1,0,0,1,0,0);c.filter=`blur(${px*Math.hypot(m.a,m.b)}px)`;c.drawImage(D,0,0);c.restore();return r;}
function vignette(c,a=0.5){const g=c.createRadialGradient(W/2,H*0.45,H*0.25,W/2,H*0.5,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=g;c.fillRect(0,0,W,H);}
function bokeh(c,t,n=10,col='255,200,120',seed=0){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const x=hash(i*3+seed)*W,y=hash(i*7+seed)*H*0.7,r=30+hash(i*11+seed)*60;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},0.12)`);g.addColorStop(0.8,`rgba(${col},0.08)`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x+Math.sin(t*0.3+i)*10,y,r,0,TAU);c.fill();}c.restore();}

function neck2(c,nk,hc,s,K,o){const a={x:nk.x,y:nk.y+6*s},b={x:hc.x*0.35+nk.x*0.65,y:hc.y*0.35+nk.y*0.65};c.lineCap='round';
  c.strokeStyle=K2;c.lineWidth=24*s;seg(c,a.x,a.y,b.x,b.y);const g=c.createLinearGradient(a.x-9*s,0,a.x+9*s,0);g.addColorStop(L2.dx>0?1:0,'#f2f0ea');g.addColorStop(L2.dx>0?0:1,'#9e9a92');c.strokeStyle=g;c.lineWidth=17*s;seg(c,a.x,a.y,b.x,b.y);
  c.strokeStyle='rgba(50,40,55,0.35)';c.lineWidth=17*s;seg(c,b.x,b.y-1*s,b.x,b.y+5*s);}

function dotEyes(c,cx,cy,s,E,lk){lk=lk||[0,0];for(const kx of [-9.5,9.5]){const x=cx+kx*s+lk[0]*0.8*s,y=cy+lk[1]*0.8*s;c.save();
  if(E==='sly'||E==='half'){c.beginPath();c.rect(x-6*s,y-0.5*s,12*s,8*s);c.clip();}
  c.fillStyle=K2;c.beginPath();c.ellipse(x,y,3.6*s,4.8*s,0,0,TAU);c.fill();c.restore();
  if(E==='sly'||E==='half'){c.strokeStyle=K2;c.lineWidth=2.6*s;c.lineCap='round';seg(c,x-5*s,y-1*s,x+5*s,y-1*s);}
  else{c.fillStyle='#fff';c.beginPath();c.arc(x+1.2*s,y-1.8*s,1.1*s,0,TAU);c.fill();}}}
