'use strict';
// ===== Detailed anatomy: lateral brain + lateral skull radiograph (facing right: front of the head = +x) =====
// ---------- shared curve helpers ----------
function _qb(a,b,c2,n=24){const o=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;o.push([u*u*a[0]+2*u*t*b[0]+t*t*c2[0],u*u*a[1]+2*u*t*b[1]+t*t*c2[1]]);}return o;}
function _poly(c,P){c.beginPath();P.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();}
function _smooth(c,P){c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length-1;i++){const mx=(P[i][0]+P[i+1][0])/2,my=(P[i][1]+P[i+1][1])/2;c.quadraticCurveTo(P[i][0],P[i][1],mx,my);}const L=P[P.length-1];c.lineTo(L[0],L[1]);}
// a meandering fold along a base polyline, with little side branches
function _sulcus(base,seed,amp=7,n=34,br=3){const P=[];const tot=[];let L=0;for(let i=1;i<base.length;i++){L+=Math.hypot(base[i][0]-base[i-1][0],base[i][1]-base[i-1][1]);tot.push(L);}
  const at=d=>{let i=0;while(i<tot.length-1&&tot[i]<d)i++;const d0=i?tot[i-1]:0,k=(d-d0)/((tot[i]-d0)||1);const a=base[i],b=base[i+1];return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,b[0]-a[0],b[1]-a[1]];};
  for(let i=0;i<=n;i++){const [x,y,dx,dy]=at(L*i/n);const l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;const w=amp*(Math.sin(i*0.55+seed)*0.7+Math.sin(i*1.3+seed*1.7)*0.3)*Math.sin(Math.PI*i/n)**0.3;P.push([x+nx*w,y+ny*w]);}
  const B=[];for(let k=0;k<br;k++){const i=2+Math.floor(hash(seed*7.1+k*3.3)*(n-4));const [x,y]=P[i],[x2,y2]=P[i+1];const dx=x2-x,dy=y2-y,l=Math.hypot(dx,dy)||1;const sd=hash(seed+k*5.7)>0.5?1:-1,len=10+hash(seed*2+k)*18;
    B.push([[x,y],[x-dy/l*sd*len*0.5+dx/l*4,y+dx/l*sd*len*0.5+dy/l*4],[x-dy/l*sd*len+dx/l*len*0.3,y+dx/l*sd*len+dy/l*len*0.3]]);}
  return {P,B};}
function _drawFold(c,f,col,lw=1){const all=[f.P,...f.B];c.save();c.lineCap='round';c.lineJoin='round';
  c.save();c.translate(2.5,3.5);c.strokeStyle=shd(col,-0.4);c.globalAlpha=0.4;c.lineWidth=14*lw;for(const P of all){_smooth(c,P);c.stroke();}c.restore();
  c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=7*lw;c.save();c.translate(-3.2,-3.6);for(const P of all){_smooth(c,P);c.stroke();}c.restore();
  c.strokeStyle=shd(col,-0.6);c.lineWidth=4.2*lw;for(const P of all){_smooth(c,P);c.stroke();}c.restore();}
// ---------- brain geometry (units ≈ 440 wide) ----------
const BR={};
BR.out=()=>{const o=[];const seg=(a,b,c2)=>o.push(..._qb(a,b,c2,18).slice(1));o.push([-212,0]);
  seg([-212,0],[-215,-120],[-110,-165]);seg([-110,-165],[0,-200],[110,-170]);seg([110,-170],[215,-120],[226,-10]);seg([226,-10],[232,40],[195,58]);
  seg([195,58],[150,62],[128,70]);seg([128,70],[132,104],[96,118]);seg([96,118],[10,150],[-90,128]);seg([-90,128],[-200,96],[-212,0]);return o;};
BR.LF=_qb([150,82],[40,14],[-92,18]);
BR.LFpt=k=>BR.LF[Math.round(k*(BR.LF.length-1))];
BR.CS=()=>{if(BR._cs)return BR._cs;const b=_qb([-30,-215],[20,-80],BR.LFpt(0.5),20);BR._cs=b.map(([x,y],i)=>[x+Math.sin(i*1.1)*7*Math.sin(Math.PI*i/20),y]);return BR._cs;};
BR.POS=_qb([-118,-215],[-150,-60],[-176,110]).map(([x,y],i)=>[x+Math.sin(i*1.3)*5,y]);
BR.regions=()=>{const CS=BR.CS(),LF=BR.LF,POS=BR.POS,lfA=LF.slice(0,Math.round(0.5*(LF.length-1))+1),lfB=LF.slice(Math.round(0.5*(LF.length-1)));
  return {frontal:[...CS,...lfA.slice().reverse(),[400,82],[400,-400],[-18,-400]],
    parietal:[...CS,...lfB,[-153,18],...POS.slice(0,13).reverse(),[-112,-400],[-18,-400]],
    temporal:[...LF,[-153,18],[-168,110],[-178,400],[400,400],[400,82]],
    occipital:[...POS,[-168,400],[-400,400],[-400,-400],[-112,-400]]};};
BR.col={frontal:'#ee9cb0',parietal:'#eebc84',temporal:'#aed49a',occipital:'#9cc8de'};
BR.folds={frontal:[[[30,-160],[110,-150],[200,-96]],[[40,-80],[130,-64],[212,-28]],[[14,-196],[36,-90],[56,20]],[[120,-170],[150,-140],[160,-112]],[[100,20],[150,26],[196,44]],[[150,-118],[176,-80],[160,-56]],[[80,-120],[96,-96],[80,-60]],[[70,-14],[110,-10],[140,6]]],
  parietal:[[[-46,-190],[-18,-80],[2,30]],[[-30,-100],[-70,-120],[-108,-104]],[[-40,-30],[-62,-60],[-96,-44]],[[-70,-170],[-84,-148],[-96,-176]],[[-100,-10],[-118,-46],[-130,-6]]],
  temporal:[[[132,92],[20,60],[-112,48]],[[112,122],[0,100],[-120,88]],[[60,110],[0,130],[-60,118]],[[-20,76],[-60,70],[-100,66]]],
  occipital:[[[-158,-110],[-190,-60],[-206,-18]],[[-152,24],[-180,30],[-204,52]],[[-178,-64],[-172,-20],[-170,28]],[[-200,80],[-180,90],[-160,94]]]};

// gyri: labyrinth from the zero-contour of a warped wave field (marching squares, cached)
BR.f=(x,y)=>{const X=x+11*Math.sin(0.045*y+1.1)+6*Math.sin(0.09*y),Y=y+11*Math.sin(0.05*x+0.4)+6*Math.sin(0.1*x+2);
  return Math.sin(0.12*X+0.7*Math.sin(0.05*Y))*Math.cos(0.105*Y+0.6*Math.sin(0.06*X))+0.55*Math.sin(0.085*X+0.07*Y+1.3)+0.45*Math.cos(0.06*X-0.125*Y+2.2)+0.25*Math.sin(0.16*X-0.05*Y);};
BR.iso=(lv)=>{BR._iso=BR._iso||{};if(BR._iso[lv])return BR._iso[lv];const st=4,x0=-240,y0=-215,nx=122,ny=96,F=[];for(let j=0;j<=ny;j++){F.push([]);for(let i=0;i<=nx;i++)F[j].push(BR.f(x0+i*st,y0+j*st)-lv);}
  const p=new Path2D();const ip=(ax,ay,av,bx,by,bv)=>{const k=av/(av-bv);return [ax+(bx-ax)*k,ay+(by-ay)*k];};
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const x=x0+i*st,y=y0+j*st,a=F[j][i],b=F[j][i+1],c2=F[j+1][i+1],d=F[j+1][i];const E=[];
    if((a>0)!==(b>0))E.push(ip(x,y,a,x+st,y,b));if((b>0)!==(c2>0))E.push(ip(x+st,y,b,x+st,y+st,c2));if((c2>0)!==(d>0))E.push(ip(x+st,y+st,c2,x,y+st,d));if((d>0)!==(a>0))E.push(ip(x,y+st,d,x,y,a));
    for(let k=0;k+1<E.length;k+=2){p.moveTo(E[k][0],E[k][1]);p.lineTo(E[k+1][0],E[k+1][1]);}}
  return BR._iso[lv]=p;};
function _gyri(c,lw=1){const g0=BR.iso(0),cA=BR.iso(0.85),cB=BR.iso(-0.85);c.save();c.lineCap='round';c.lineJoin='round';
  c.strokeStyle='rgba(255,255,255,0.1)';c.lineWidth=8*lw;c.stroke(cA);c.stroke(cB);
  c.save();c.translate(2.4,3.2);c.strokeStyle='rgba(70,10,30,0.26)';c.lineWidth=10*lw;c.stroke(g0);c.restore();
  c.save();c.translate(-2.2,-2.8);c.strokeStyle='rgba(255,255,255,0.42)';c.lineWidth=5.5*lw;c.stroke(g0);c.restore();
  c.strokeStyle='rgba(80,18,40,0.78)';c.lineWidth=3.4*lw;c.stroke(g0);c.restore();}
// ---------- the brain ----------
// o: frontal (0..1 red heat), dim, damage (0..1 the torn track), lift (0..1 frontal lobe pulled away), paths (0..1 new pathways), xray (draw as ghost lines)
function brainSide(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';const OUT=BR.out(),R=BR.regions();const X=!!o.xray;
  if(X){c.globalCompositeOperation='lighter';c.strokeStyle='rgba(150,220,255,0.22)';c.lineWidth=3;_poly(c,OUT);c.stroke();
    c.save();_poly(c,OUT);c.clip();c.strokeStyle='rgba(150,220,255,0.13)';c.lineWidth=3;c.stroke(BR.iso(0));
      c.strokeStyle='rgba(150,220,255,0.22)';c.lineWidth=4;for(const P of [BR.CS(),BR.LF]){_smooth(c,P);c.stroke();}
      if(o.frontal>0){_poly(c,R.frontal);c.save();c.clip();const g=c.createRadialGradient(150,-80,10,150,-80,200);g.addColorStop(0,`rgba(255,80,60,${0.55*o.frontal})`);g.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=g;c.fillRect(-300,-300,600,600);c.restore();}
    c.restore();c.restore();return;}
  // brainstem + cerebellum sit behind
  c.strokeStyle=OL;c.lineWidth=7;const st=new Path2D();st.moveTo(-58,96);st.bezierCurveTo(-40,150,-44,200,-30,262);st.lineTo(6,262);st.bezierCurveTo(4,210,20,170,22,110);st.closePath();
  const sg2=c.createLinearGradient(-50,0,20,0);sg2.addColorStop(0,'#c87888');sg2.addColorStop(0.6,'#ec9cac');sg2.addColorStop(1,'#c87888');c.fillStyle=sg2;c.fill(st);c.stroke(st);
  c.save();c.clip(st);c.strokeStyle='rgba(120,40,60,0.35)';c.lineWidth=2.5;for(let i=0;i<9;i++){c.beginPath();c.moveTo(-60,120+i*15);c.quadraticCurveTo(-18,128+i*15,24,118+i*15);c.stroke();}c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.ellipse(-4,150,9,40,0.1,0,TAU);c.fill();c.restore();
  const cb=new Path2D();cb.ellipse(-128,118,92,56,0.12,0,TAU);const cg=c.createRadialGradient(-150,90,10,-128,118,100);cg.addColorStop(0,'#eaa2b6');cg.addColorStop(1,'#b86880');c.fillStyle=cg;c.fill(cb);c.save();c.clip(cb);
  for(let i=0;i<16;i++){const yy=70+i*7.5;c.strokeStyle='rgba(110,30,60,0.55)';c.lineWidth=2.4;c.beginPath();c.moveTo(-225,yy+12);c.bezierCurveTo(-170,yy-8+Math.sin(i)*3,-90,yy-4,-30,yy+20);c.stroke();c.strokeStyle='rgba(255,255,255,0.28)';c.lineWidth=1.4;c.beginPath();c.moveTo(-225,yy+9);c.bezierCurveTo(-170,yy-11+Math.sin(i)*3,-90,yy-7,-30,yy+17);c.stroke();}
  c.restore();c.strokeStyle=OL;c.lineWidth=7;c.stroke(cb);
  // cerebrum: lobes clipped to the outline
  const lift=o.lift||0;
  const drawLobe=(k)=>{const col=k==='frontal'&&o.frontal>0?mixC(BR.col[k],'#ff2a2a',0.75*o.frontal):BR.col[k];c.save();_poly(c,R[k]);c.clip();
    const g=c.createRadialGradient(-30,-130,20,0,0,260);g.addColorStop(0,shd(col,0.25));g.addColorStop(0.6,col);g.addColorStop(1,shd(col,-0.25));c.fillStyle=g;c.fillRect(-300,-300,600,600);
    c.restore();};
  c.save();_poly(c,OUT);c.clip();
  for(const k of ['occipital','temporal','parietal'])drawLobe(k);
  if(lift<1){c.save();if(lift>0){c.fillStyle='#2a0c14';_poly(c,R.frontal);c.fill();}c.restore();}
  if(lift===0){if(o.dim)c.globalAlpha=1-0.5*o.dim;drawLobe('frontal');c.globalAlpha=1;}
  if(lift>0){c.save();_poly(c,R.frontal);c.rect(-400,-400,800,800);c.clip('evenodd');_gyri(c);c.restore();}else _gyri(c);
  // main fissures, deep
  for(const P of [BR.LF,BR.CS(),BR.POS]){c.strokeStyle='rgba(60,10,30,0.4)';c.lineWidth=12;_smooth(c,P);c.stroke();c.strokeStyle='#5a1a2e';c.lineWidth=5;_smooth(c,P);c.stroke();c.strokeStyle='rgba(255,255,255,0.4)';c.lineWidth=2;c.save();c.translate(-2.5,-3);_smooth(c,P);c.stroke();c.restore();}
  // volume: rim shade + soft key light
  c.lineWidth=50;c.strokeStyle='rgba(40,0,20,0.3)';_poly(c,OUT);c.stroke();const bs=c.createLinearGradient(0,-200,0,150);bs.addColorStop(0,'rgba(0,0,0,0)');bs.addColorStop(0.55,'rgba(0,0,0,0)');bs.addColorStop(1,'rgba(40,0,30,0.35)');c.fillStyle=bs;c.fillRect(-260,-220,520,400);const sp=c.createRadialGradient(-40,-140,0,-40,-140,170);sp.addColorStop(0,'rgba(255,255,255,0.35)');sp.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=sp;c.fillRect(-260,-260,520,400);
  // the torn track through the frontal lobe
  if(o.damage>0){const A=[178,96],B=[86,-196],k=o.damage,E=[A[0]+(B[0]-A[0])*k,A[1]+(B[1]-A[1])*k];const dx=B[0]-A[0],dy=B[1]-A[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;
    const side=(sd,w)=>{const P=[];for(let i=0;i<=20;i++){const q=i/20,px=A[0]+(E[0]-A[0])*q,py=A[1]+(E[1]-A[1])*q,ww=w*(0.7+0.5*hash(i*3.1+sd))*(0.6+0.4*Math.sin(Math.PI*q));P.push([px+nx*ww*sd,py+ny*ww*sd]);}return P;};
    const L1=side(1,26),R1=side(-1,26);c.fillStyle='#8a1622';_poly(c,[...L1,...R1.reverse()]);c.fill();const L2=side(1,13),R2=side(-1,13);c.fillStyle='#3a060c';_poly(c,[...L2,...R2.reverse()]);c.fill();
    c.strokeStyle='rgba(255,140,140,0.5)';c.lineWidth=2;_smooth(c,side(1,26));c.stroke();
    c.fillStyle='#7a1018';for(let i=0;i<12;i++){const q=hash(i*2.2)*k,px=A[0]+dx*q+nx*(hash(i*5.1)-0.5)*90,py=A[1]+dy*q+ny*(hash(i*5.1)-0.5)*90;c.beginPath();c.arc(px,py,2+hash(i)*4,0,TAU);c.fill();}}
  // new pathways: glowing routes across the healthy cortex toward the damaged front, pulses running along them
  if(o.paths>0){const N=[[-180,-40],[-150,-120],[-90,-150],[-30,-120],[-60,-60],[-120,20],[-60,40],[0,70],[60,90],[-10,-10],[40,-150],[60,-60],[100,-100],[150,-40],[110,20],[180,-80]];
    const E2=[[0,1],[1,2],[2,3],[3,10],[1,4],[4,9],[0,5],[5,6],[6,7],[7,8],[8,14],[9,11],[3,4],[10,12],[11,12],[12,15],[11,13],[13,15],[14,13],[6,9],[9,3]];
    c.save();c.globalCompositeOperation='lighter';E2.forEach(([a,b],i)=>{const k=clamp(o.paths*1.6-i*0.04);if(k<=0)return;const P=N[a],Q=N[b],mx=(P[0]+Q[0])/2+(hash(i)-0.5)*40,my=(P[1]+Q[1])/2-20;
      c.strokeStyle='rgba(90,210,255,0.35)';c.lineWidth=10;c.beginPath();c.moveTo(P[0],P[1]);const q=_qb(P,[mx,my],Q,16).slice(0,Math.max(2,Math.round(16*k)+1));q.forEach(([x2,y2])=>c.lineTo(x2,y2));c.stroke();c.strokeStyle='rgba(210,250,255,0.95)';c.lineWidth=3.5;c.stroke();
      if(k>=1){const ph=((t*0.9+hash(i*3))%1);const pt=_qb(P,[mx,my],Q,40)[Math.floor(ph*40)];c.fillStyle='rgba(255,255,255,0.95)';c.beginPath();c.arc(pt[0],pt[1],6,0,TAU);c.fill();c.fillStyle='rgba(120,220,255,0.35)';c.beginPath();c.arc(pt[0],pt[1],16,0,TAU);c.fill();}});
    N.forEach(([x2,y2],i)=>{const k=clamp(o.paths*1.6-i*0.05);if(k<=0)return;c.fillStyle='rgba(120,230,255,0.4)';c.beginPath();c.arc(x2,y2,14*k,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x2,y2,5.5*k,0,TAU);c.fill();});c.restore();}
  c.restore();
  c.strokeStyle=OL;c.lineWidth=7;_poly(c,OUT);c.stroke();
  // frontal lobe lifted out of the brain (what the rod took)
  if(lift>0){c.save();c.translate(lift*150,-lift*170);c.rotate(lift*0.35);c.save();_poly(c,OUT);c.clip();drawLobe('frontal');_poly(c,R.frontal);c.clip();_gyri(c);c.restore();
    c.save();_poly(c,R.frontal);c.clip();c.strokeStyle=OL;c.lineWidth=7;_poly(c,OUT);c.stroke();c.restore();
    c.strokeStyle=OL;c.lineWidth=7;_smooth(c,BR.CS());c.stroke();_smooth(c,BR.LF.slice(0,Math.round(0.5*(BR.LF.length-1))+1));c.stroke();c.restore();}
  if(o.frontal>0&&!lift){c.save();c.globalCompositeOperation='lighter';_poly(c,R.frontal);c.clip();const g=c.createRadialGradient(140,-70,10,140,-70,190);g.addColorStop(0,`rgba(255,90,60,${0.45*o.frontal})`);g.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=g;c.fillRect(-300,-300,600,600);c.restore();}
  c.restore();}
function mixC(a,b,k){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('');}
// ---------- lateral skull radiograph ----------
const SKL={};
SKL.cran=()=>{const o=[];const seg=(a,b,c2)=>o.push(..._qb(a,b,c2,16).slice(1));o.push([176,-6]);
  seg([176,-6],[198,-90],[150,-168]);seg([150,-168],[90,-222],[0,-226]);seg([0,-226],[-120,-222],[-190,-150]);seg([-190,-150],[-232,-60],[-214,30]);seg([-214,30],[-200,84],[-150,104]);seg([-150,104],[-110,118],[-78,112]);
  seg([-78,112],[-70,150],[-62,148]);seg([-62,148],[-52,120],[-40,96]);seg([-40,96],[60,78],[130,74]);seg([130,74],[150,66],[176,-6]);return o;};
SKL.face=()=>{const o=[];const seg=(a,b,c2)=>o.push(..._qb(a,b,c2,10).slice(1));o.push([176,-6]);
  seg([176,-6],[190,10],[206,44]);seg([206,44],[188,62],[186,96]);seg([186,96],[200,100],[214,104]);seg([214,104],[208,122],[206,140]);seg([206,140],[160,150],[96,136]);seg([96,136],[70,110],[60,80]);return o;};
SKL.mand=()=>{const o=[];const seg=(a,b,c2)=>o.push(..._qb(a,b,c2,12).slice(1));o.push([-40,84]);
  seg([-40,84],[-52,150],[-36,210]);seg([-36,210],[-20,236],[30,230]);seg([30,230],[150,224],[190,232]);seg([190,232],[214,222],[206,184]);seg([206,184],[150,180],[96,182]);seg([96,182],[60,150],[46,96]);seg([46,96],[30,120],[8,130]);seg([8,130],[-10,110],[-20,84]);return o;};
function _teeth(c,up,a){const xs=up?[104,120,137,153,167,180,192,203]:[100,116,132,148,162,175,187,198];xs.forEach((x,i)=>{const w=i<3?15:i<5?12:10,y0=up?144:182,h=up?22:22,dir=up?1:-1;
  c.fillStyle=`rgba(235,250,255,${0.55*a})`;c.strokeStyle=`rgba(240,252,255,${0.9*a})`;c.lineWidth=2.5;c.beginPath();c.moveTo(x-w/2,y0);c.lineTo(x-w/2+1,y0+dir*h*0.9);c.quadraticCurveTo(x,y0+dir*(h+4),x+w/2-1,y0+dir*h*0.9);c.lineTo(x+w/2,y0);c.closePath();c.fill();c.stroke();
  c.strokeStyle=`rgba(200,235,255,${0.45*a})`;c.lineWidth=2;const rl=up?-26:26;c.beginPath();c.moveTo(x-w/2+2,y0);c.quadraticCurveTo(x-w/4,y0+rl*0.7,x-w/5,y0+rl);c.moveTo(x+w/2-2,y0);c.quadraticCurveTo(x+w/4,y0+rl*0.7,x+w/5,y0+rl);c.stroke();
  c.fillStyle=`rgba(255,255,255,${0.35*a})`;c.fillRect(x-w/2+2,y0+dir*(up?3:-19),w-4,4);});}
function _zig(c,P,amp=5,seed=1){c.beginPath();P.forEach(([x,y],i)=>{const w=(i%2?1:-1)*amp*(0.6+0.6*hash(i+seed));i?c.lineTo(x+w,y+w*0.6):c.moveTo(x,y);});c.stroke();}
// o: frontal (heat), hole (0..1 exit wound open), crack (0..1), a (visibility)
function xraySkull(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';const A=o.a??1;const BN=a=>`rgba(215,240,255,${a*A})`;
  const CR=SKL.cran(),FC=SKL.face(),MD=SKL.mand();
  // soft tissue: faint profile of the head and neck
  c.save();c.globalCompositeOperation='lighter';c.fillStyle=`rgba(120,180,230,${0.07*A})`;c.strokeStyle=`rgba(140,200,240,${0.25*A})`;c.lineWidth=3;c.beginPath();c.moveTo(-150,420);c.bezierCurveTo(-160,300,-250,180,-246,40);c.bezierCurveTo(-250,-120,-150,-252,0,-252);c.bezierCurveTo(130,-252,222,-170,214,-40);
  c.quadraticCurveTo(222,-8,232,30);c.lineTo(268,88);c.quadraticCurveTo(262,104,232,108);c.quadraticCurveTo(244,130,236,146);c.quadraticCurveTo(250,160,236,176);c.quadraticCurveTo(234,214,226,246);c.quadraticCurveTo(200,262,140,262);c.quadraticCurveTo(110,300,120,420);c.closePath();c.fill();c.stroke();
  c.beginPath();c.ellipse(-48,52,26,42,0.1,0,TAU);c.stroke();c.restore();
  c.save();c.globalCompositeOperation='lighter';
  // cervical spine C1–C4 with discs and spinous processes
  for(let i=0;i<4;i++){const vy=158+i*60,vx=-60+i*5;c.lineWidth=3;
    if(i===0){// atlas: slim anterior arch + ring + posterior tubercle
      c.fillStyle=BN(0.16);c.strokeStyle=BN(0.7);c.beginPath();c.ellipse(vx+30,vy-4,10,14,0,0,TAU);c.fill();c.stroke();c.beginPath();c.ellipse(vx-30,vy,40,13,0,0,TAU);c.stroke();c.beginPath();c.ellipse(vx-78,vy+2,14,10,0,0,TAU);c.fill();c.stroke();continue;}
    // body: concave waist, cortical rim, trabecular speckle
    const body=()=>{c.beginPath();c.moveTo(vx-26,vy-22);c.lineTo(vx+30,vy-24);c.quadraticCurveTo(vx+25,vy,vx+30,vy+22);c.lineTo(vx-26,vy+24);c.quadraticCurveTo(vx-21,vy,vx-26,vy-22);c.closePath();};
    body();c.fillStyle=BN(0.16);c.fill();c.save();body();c.clip();c.fillStyle=BN(0.22);for(let k=0;k<40;k++)c.fillRect(vx-26+hash(k*1.3+i)*56,vy-24+hash(k*2.7+i)*48,2,2);c.restore();c.strokeStyle=BN(0.8);body();c.stroke();
    if(i===1){c.beginPath();c.moveTo(vx-6,vy-22);c.quadraticCurveTo(vx-2,vy-58,vx+8,vy-52);c.quadraticCurveTo(vx+14,vy-36,vx+12,vy-22);c.fillStyle=BN(0.2);c.fill();c.stroke();}
    // pedicle, articular pillar, lamina and spinous process
    c.fillStyle=BN(0.14);c.beginPath();c.moveTo(vx-26,vy-12);c.lineTo(vx-44,vy-16);c.lineTo(vx-56,vy-24);c.lineTo(vx-62,vy-6);c.lineTo(vx-56,vy+16);c.lineTo(vx-44,vy+12);c.lineTo(vx-26,vy+8);c.closePath();c.fill();c.stroke();
    c.beginPath();c.moveTo(vx-58,vy-8);c.lineTo(vx-96,vy+(i===1?-2:4));c.quadraticCurveTo(vx-108,vy+14,vx-98,vy+24);c.lineTo(vx-58,vy+12);c.closePath();c.fill();c.stroke();
    // disc space to the next body
    if(i<3){c.fillStyle='rgba(0,0,0,0.5)';c.fillRect(vx-24,vy+25,56,9);}}
  c.strokeStyle=BN(0.5);c.lineWidth=3;c.beginPath();c.moveTo(-56,150);c.lineTo(-52,118);c.lineTo(-44,150);c.stroke();
  // cranium: outer table, inner table, diploë speckle between
  const inner=CR.map(([px,py])=>[px*0.93,(py+30)*0.93-30]);
  c.fillStyle=BN(0.1);_poly(c,CR);c.fill();
  c.save();_poly(c,CR);c.clip();c.fillStyle=BN(0.14);for(let i=0;i<520;i++){const a=hash(i*1.31)*TAU,r=200+hash(i*2.77)*40;const px=Math.cos(a)*r*1.02,py=Math.sin(a)*r*0.98-20;c.fillRect(px,py,2.4,2.4);}c.restore();
  c.save();_poly(c,inner);c.fillStyle='rgba(0,0,0,0)';c.restore();
  c.shadowColor=BN(0.9);c.shadowBlur=14;c.strokeStyle=BN(0.95);c.lineWidth=7;_poly(c,CR);c.stroke();c.shadowBlur=6;c.lineWidth=3.5;c.strokeStyle=BN(0.6);_smooth(c,inner.slice(1,inner.length-30));c.stroke();c.shadowBlur=0;
  // sutures: coronal, lambdoid, squamosal
  c.strokeStyle=BN(0.42);c.lineWidth=2.4;_zig(c,_qb([86,-210],[66,-120],[52,-40],22),4,2);_zig(c,_qb([-152,-176],[-196,-70],[-196,52],22),5,6);c.beginPath();c.moveTo(-104,40);c.bezierCurveTo(-90,-40,10,-50,40,30);c.stroke();
  // skull base: sella turcica, petrous ridge, clivus, mastoid air cells
  c.strokeStyle=BN(0.55);c.lineWidth=3;c.beginPath();c.moveTo(-10,24);c.quadraticCurveTo(10,52,30,24);c.stroke();c.beginPath();c.moveTo(-120,56);c.quadraticCurveTo(-60,20,0,46);c.stroke();c.beginPath();c.moveTo(20,40);c.lineTo(-20,104);c.stroke();
  c.fillStyle=BN(0.12);c.beginPath();c.moveTo(-120,56);c.quadraticCurveTo(-60,20,0,46);c.quadraticCurveTo(-40,70,-110,80);c.closePath();c.fill();
  for(let i=0;i<14;i++){c.strokeStyle=BN(0.35);c.lineWidth=1.6;c.beginPath();c.arc(-76+hash(i*3.3)*24-12,104+hash(i*4.7)*30,3+hash(i)*5,0,TAU);c.stroke();}
  c.fillStyle='rgba(0,0,0,0.6)';c.beginPath();c.ellipse(-44,62,13,11,0,0,TAU);c.fill();c.strokeStyle=BN(0.7);c.lineWidth=3;c.stroke();
  // face: nasal bone, aperture, maxilla, frontal sinus, orbit, zygoma + arch
  c.fillStyle=BN(0.12);_poly(c,FC);c.fill();c.shadowColor=BN(0.8);c.shadowBlur=10;c.strokeStyle=BN(0.85);c.lineWidth=5;_smooth(c,FC);c.stroke();c.shadowBlur=0;
  c.fillStyle='rgba(0,0,0,0.5)';c.beginPath();c.moveTo(200,50);c.quadraticCurveTo(184,70,186,96);c.quadraticCurveTo(160,88,152,62);c.closePath();c.fill();c.strokeStyle=BN(0.4);c.lineWidth=2;c.stroke();
  c.fillStyle='rgba(0,0,0,0.55)';c.strokeStyle=BN(0.6);c.lineWidth=2.5;for(const [px,py,r] of [[150,-34,12],[164,-44,9],[140,-46,8]]){c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();}
  c.fillStyle='rgba(0,0,0,0.55)';c.beginPath();c.ellipse(134,10,44,40,-0.1,0,TAU);c.fill();c.shadowColor=BN(0.8);c.shadowBlur=10;c.strokeStyle=BN(0.9);c.lineWidth=6;c.beginPath();c.arc(134,10,44,-1.9,1.5);c.stroke();c.lineWidth=3;c.strokeStyle=BN(0.45);c.beginPath();c.arc(134,10,44,1.5,4.38);c.stroke();c.shadowBlur=0;
  c.strokeStyle=BN(0.3);c.lineWidth=2;c.beginPath();c.moveTo(96,24);c.quadraticCurveTo(110,40,96,56);c.stroke();
  c.fillStyle=BN(0.24);c.strokeStyle=BN(0.85);c.lineWidth=4.5;c.beginPath();c.moveTo(170,52);c.quadraticCurveTo(150,84,104,82);c.lineTo(20,70);c.quadraticCurveTo(-20,66,-30,58);c.lineTo(-26,48);c.quadraticCurveTo(30,52,96,56);c.quadraticCurveTo(110,50,118,52);c.closePath();c.fill();c.stroke();
  c.fillStyle=BN(0.08);c.beginPath();c.ellipse(150,96,30,22,0,0,TAU);c.fill();c.strokeStyle=BN(0.3);c.lineWidth=2;c.stroke();
  // mandible + teeth
  c.fillStyle=BN(0.14);_poly(c,MD);c.fill();c.shadowColor=BN(0.8);c.shadowBlur=10;c.strokeStyle=BN(0.85);c.lineWidth=5;_poly(c,MD);c.stroke();c.shadowBlur=0;
  c.strokeStyle=BN(0.35);c.lineWidth=2;c.beginPath();c.moveTo(-20,150);c.quadraticCurveTo(60,200,180,206);c.stroke();c.fillStyle='rgba(0,0,0,0.5)';c.beginPath();c.arc(150,214,5,0,TAU);c.fill();
  _teeth(c,true,A);_teeth(c,false,A);
  c.strokeStyle=BN(0.5);c.lineWidth=3;c.beginPath();c.moveTo(70,250);c.quadraticCurveTo(100,240,120,252);c.stroke();
  c.restore();
  // the brain ghost inside the vault
  brainSide(c,-8,-70,0.86,t,{xray:1,frontal:o.frontal||0});
  // exit wound: torn hole in the frontal bone + cracks + bone fragments
  if(o.hole>0){const hx=78,hy=-218,k=o.hole;c.save();c.fillStyle='#02060c';c.beginPath();for(let i=0;i<14;i++){const a=i/14*TAU,r=(22+hash(i*3.7)*12)*k;c.lineTo(hx+Math.cos(a)*r*1.2,hy+Math.sin(a)*r*0.8);}c.closePath();c.fill();c.strokeStyle=BN(0.95);c.lineWidth=3;c.stroke();
    c.strokeStyle=BN(0.75*(o.crack??k));c.lineWidth=2.2;for(let i=0;i<6;i++){const a=Math.PI*(0.15+i*0.14),L=(40+hash(i*9)*60)*(o.crack??k);let px=hx+Math.cos(a)*24,py=hy+Math.sin(a)*16;c.beginPath();c.moveTo(px,py);for(let j=0;j<4;j++){px+=Math.cos(a+(hash(i*4+j)-0.5)*0.8)*L/4;py+=Math.sin(a+(hash(i*4+j)-0.5)*0.8)*L/4;c.lineTo(px,py);}c.stroke();}c.restore();}
  c.restore();return {cheek:{x:x+128*s,y:y+92*s},eye:{x:x+110*s,y:y+8*s},top:{x:x+78*s,y:y-218*s}};}
// ---------- shots using the new anatomy ----------
function _film(c,t,rev=1){c.fillStyle='#02070d';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(40,90,140,0.55)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.save();c.strokeStyle='rgba(90,170,230,0.07)';c.lineWidth=2;for(let i=0;i<=24;i++){c.beginPath();c.moveTo(0,i*80);c.lineTo(W,i*80);c.stroke();}for(let i=0;i<=14;i++){c.beginPath();c.moveTo(i*80,0);c.lineTo(i*80,H);c.stroke();}
  c.strokeStyle='rgba(170,220,255,0.55)';c.lineWidth=4;for(const [x,y,sx,sy] of [[60,200,1,1],[1020,200,-1,1],[60,1760,1,-1],[1020,1760,-1,-1]]){c.beginPath();c.moveTo(x,y+sy*70);c.lineTo(x,y);c.lineTo(x+sx*70,y);c.stroke();}
  c.fillStyle='rgba(170,220,255,0.5)';for(let i=0;i<=30;i++){const y=300+i*45;c.fillRect(30,y,i%5?12:24,3);}
  c.strokeStyle='rgba(220,240,255,0.8)';c.lineWidth=4;c.strokeRect(930,240,60,60);txt(c,'L',960,272,40,'rgba(230,245,255,0.9)',{stroke:false});c.restore();}
function _xrod(c,a,b,glow=1){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy);c.save();c.translate(a.x,a.y);c.rotate(Math.atan2(dy,dx));c.globalCompositeOperation='lighter';
  c.shadowColor='rgba(220,245,255,0.95)';c.shadowBlur=30*glow;const g=c.createLinearGradient(0,-16,0,16);g.addColorStop(0,'rgba(200,235,255,0.7)');g.addColorStop(0.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(200,235,255,0.7)');c.fillStyle=g;
  c.beginPath();c.moveTo(0,-14);c.lineTo(L*0.78,-14);c.lineTo(L,-2);c.lineTo(L,2);c.lineTo(L*0.78,14);c.lineTo(0,14);c.closePath();c.fill();c.shadowBlur=0;c.restore();}
{const o0=S.xray;S.xray=(c,t,u,d)=>{const t0=S.xray.t0,tc=wt('cheek',t0),te=wt('eye',t0),ts=wt('skull',t0);_film(c,t);
  const p=t<tc?0.12*ON(t,t0+0.3,tc-t0-0.3):t<te?0.12+0.33*ON(t,tc,te-tc):t<ts?0.45+0.4*ON(t,te,ts-te):0.85+0.6*ON(t,ts,0.5);const fr=ON(t,te,0.6);const hk=ON(t,ts-0.05,0.25);
  const sh=t>ts-0.05&&t<ts+0.4?(1-(t-ts)/0.45)*14:0;const Z=lerp(1.0,1.12,ON(t,t0,d));c.save();c.translate(540+nz(t*30,1)*sh,1000+nz(t*30,2)*sh);c.scale(Z,Z);c.translate(-540,-1000);
  const sx=505,sy=1010,sc=1.85;const rev=ON(t,t0,0.8);c.save();c.beginPath();c.rect(0,0,W,300+rev*1700);c.clip();
  const K2=xraySkull(c,sx,sy,sc,t,{frontal:fr,hole:hk,crack:ON(t,ts,0.6)});c.restore();
  const dir=(()=>{const dx=K2.top.x-K2.cheek.x,dy=K2.top.y-K2.cheek.y,l=Math.hypot(dx,dy);return {x:dx/l,y:dy/l};})();
  const A={x:K2.cheek.x-dir.x*620,y:K2.cheek.y-dir.y*620},B={x:K2.top.x+dir.x*520,y:K2.top.y+dir.y*520};const tip={x:lerp(A.x,B.x,p),y:lerp(A.y,B.y,p)};
  if(p>0.02){// the track it leaves behind lights red through the brain
    const tr0=K2.cheek,tl=clamp((Math.hypot(tip.x-tr0.x,tip.y-tr0.y))/Math.hypot(K2.top.x-tr0.x,K2.top.y-tr0.y));if((tip.y<tr0.y)){c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,70,50,0.35)';c.lineWidth=60;c.lineCap='round';c.beginPath();c.moveTo(tr0.x,tr0.y);c.lineTo(lerp(tr0.x,K2.top.x,Math.min(tl,1)),lerp(tr0.y,K2.top.y,Math.min(tl,1)));c.stroke();c.strokeStyle='rgba(255,140,110,0.6)';c.lineWidth=18;c.stroke();c.restore();}
    const tail={x:tip.x-dir.x*640,y:tip.y-dir.y*640};_xrod(c,tail,tip);}
  // bone fragments burst out of the exit
  if(t>ts-0.05){const q=t-ts+0.05;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const a=-Math.PI/2+(hash(i*2.1)-0.5)*1.5,v=300+hash(i*3.9)*500;const px=K2.top.x+Math.cos(a)*v*q,py=K2.top.y+Math.sin(a)*v*q+500*q*q;c.save();c.translate(px,py);c.rotate(q*8*(hash(i)-0.5));c.fillStyle=`rgba(220,240,255,${0.9*clamp(1-q/1.4)})`;c.beginPath();c.moveTo(-8,-5);c.lineTo(9,-7);c.lineTo(6,7);c.lineTo(-7,5);c.closePath();c.fill();c.restore();}c.restore();}
  for(const [tt,P2,n] of [[tc,K2.cheek,1],[te,K2.eye,2],[ts,K2.top,3]])if(t>tt-0.05){const k=popK(t,tt-0.05);ring(c,P2.x,P2.y,62*k,0.9,'rgba(255,90,70,',7);const lx=P2.x+(n===3?-170:170),ly=P2.y+(n===3?-40:30);c.save();c.globalAlpha=k;c.strokeStyle='rgba(255,120,100,0.9)';c.lineWidth=4;c.beginPath();c.moveTo(P2.x+(n===3?-62:62),P2.y);c.lineTo(lx,ly);c.stroke();c.fillStyle='#ff5a46';c.beginPath();c.arc(lx,ly,30,0,TAU);c.fill();txt(c,String(n),lx,ly+2,36,'#fff',{stroke:false});c.restore();}
  // scanner sweep
  if(rev<1){const yy=300+rev*1700;c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,yy-60,0,yy+6);g.addColorStop(0,'rgba(120,220,255,0)');g.addColorStop(1,'rgba(160,240,255,0.7)');c.fillStyle=g;c.fillRect(0,yy-60,W,66);c.restore();}
  c.restore();if(hk>0&&t<ts+0.15){c.fillStyle=`rgba(255,240,230,${0.35*(1-(t-ts+0.05)/0.2)})`;c.fillRect(0,0,W,H);}
  vign(c,0.55);grain(c,t,0.06);};S.xray.t0=o0.t0;}
{const o0=S.took;S.took=(c,t,u,d)=>{const t0=S.took.t0,tt=wt('took',t0);gfxBG(c,t,{plate:'rr_dusk'});tint(c,'rgba(10,10,30,0.6)','multiply');const k=popK(t,t0+0.8);
  c.save();c.translate(540,1060);c.scale(k*1.38,k*1.38);
  // glass head silhouette in profile
  c.fillStyle='rgba(30,40,70,0.55)';c.strokeStyle='rgba(170,210,255,0.75)';c.lineWidth=6;c.beginPath();c.moveTo(-170,420);c.bezierCurveTo(-180,300,-270,180,-266,40);c.bezierCurveTo(-270,-140,-160,-290,10,-290);c.bezierCurveTo(160,-290,262,-190,252,-40);c.quadraticCurveTo(262,-6,272,34);c.lineTo(312,96);c.quadraticCurveTo(304,114,272,118);c.quadraticCurveTo(286,142,276,160);c.quadraticCurveTo(290,176,274,192);c.quadraticCurveTo(272,236,262,268);c.quadraticCurveTo(232,288,160,288);c.quadraticCurveTo(128,330,138,420);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.08)';c.beginPath();c.ellipse(-120,-150,60,120,-0.5,0,TAU);c.fill();
  const lift=t>tt-0.1?ON(t,tt-0.1,0.9):0;brainSide(c,-6,-60,0.98,t,{frontal:t>tt-0.6?0.6+0.4*Math.sin(t*8):0,lift});
  if(lift>0){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const a=-0.9+hash(i)*0.8,r=lift*(120+hash(i*3)*160);c.fillStyle=`rgba(255,120,100,${0.7*(1-lift)})`;c.beginPath();c.arc(150+Math.cos(a)*r,-90+Math.sin(a)*r,4+hash(i*5)*5,0,TAU);c.fill();}c.restore();}
  c.restore();cine(c,t,{v:0.6,bars:0});};S.took.t0=o0.t0;}
{const o0=S.lobe;S.lobe=(c,t,u,d)=>{const t0=S.lobe.t0,tf=wt('frontal',t0),tc=wt('check',t0);gfxBG(c,t,{plate:'inn'});tint(c,'rgba(8,8,20,0.65)','multiply');const k=popK(t,t0+0.1);
  const rp=ON(t,t0+0.2,0.9);const ht=t>tf-0.1?0.5+0.5*Math.sin(t*7):0;
  c.save();c.translate(540,960);c.scale(k*1.9,k*1.9);brainSide(c,0,0,1,t,{frontal:ht,damage:rp});c.restore();
  // the rod lies along the track it tore
  const A0={x:540+178*1.9,y:960+96*1.9},B0={x:540+86*1.9,y:960-196*1.9},dx=B0.x-A0.x,dy=B0.y-A0.y;if(rp>0){c.save();c.globalAlpha=0.9;tampIron(c,{x:A0.x-dx*0.7,y:A0.y-dy*0.7},{x:lerp(A0.x,B0.x+dx*0.6,rp),y:lerp(A0.y,B0.y+dy*0.6,rp)},2.2);c.restore();}
  if(t>wt('keeps',t0)-0.1){const kk=popK(t,wt('keeps',t0)-0.1);c.save();c.translate(830,1560);c.scale(kk,kk);panel(c,-110,-110,220,220,{r:50,fill:'rgba(10,10,14,0.85)'});c.fillStyle='#d83a2a';c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();for(let i=0;i<8;i++){const a=i/8*TAU+Math.PI/8;c.lineTo(Math.cos(a)*70,Math.sin(a)*70);}c.closePath();c.fill();c.stroke();
    if(t>tc-0.1){c.strokeStyle='#1a1a22';c.lineWidth=8;c.beginPath();c.moveTo(-60,-50);c.lineTo(-10,0);c.lineTo(-30,20);c.lineTo(40,70);c.stroke();}c.restore();}
  cine(c,t,{v:0.6,bars:0});};S.lobe.t0=o0.t0;}
{const o0=S.adapt;S.adapt=(c,t,u,d)=>{const t0=S.adapt.t0,ta=wt('adapt',t0);gfxBG(c,t,{plate:'andes'});tint(c,'rgba(8,8,24,0.65)','multiply');
  c.save();c.translate(540,980);c.scale(1.9,1.9);brainSide(c,0,0,1,t,{dim:0.5,damage:1,paths:ON(t,t0+0.3,d-0.8)});c.restore();
  if(t>ta-0.1)check(c,540,1600,80,popK(t,ta-0.1));cine(c,t,{v:0.6,bars:0});};S.adapt.t0=o0.t0;}

function clockIco(c,x,y,r,h,m,k=1,o={}){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle=o.fill||'#fbf6ea';c.strokeStyle=OL;c.lineWidth=r*0.08;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();
  for(let i=0;i<12;i++){const a=i/12*TAU;c.lineWidth=r*0.05;c.beginPath();c.moveTo(Math.cos(a)*r*0.78,Math.sin(a)*r*0.78);c.lineTo(Math.cos(a)*r*0.9,Math.sin(a)*r*0.9);c.stroke();}
  c.lineCap='round';const ah=(h%12+m/60)/12*TAU-Math.PI/2,am=m/60*TAU-Math.PI/2;c.lineWidth=r*0.1;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(ah)*r*0.5,Math.sin(ah)*r*0.5);c.stroke();c.lineWidth=r*0.06;c.strokeStyle='#d63a2a';c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(am)*r*0.75,Math.sin(am)*r*0.75);c.stroke();
  c.fillStyle=OL;c.beginPath();c.arc(0,0,r*0.08,0,TAU);c.fill();c.restore();}
