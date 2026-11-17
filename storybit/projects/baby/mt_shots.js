'use strict';
// ===================== MOTION TEST (not part of Style 5) =====================
// One continuous shot in the yamen hall: walk in → stop → turn → glance back → sit → idle →
// reach → pick up → unroll → read (eye saccades) → reaction take → smirk → roll up → stand.
// Same characters, plate, outlines, colours. Only the motion is new.
window.NOCAP=true;
// who() without the auto blink: blinks are placed by hand (on head turns and between beats)
(0,eval)('who='+who.toString().replace('if(!o.back){','if(!o.back&&!o.noBlink){'));
// seated drape: when CUR.seat>0 the kimono hem morphs from hanging (standing) to draped over the lap and shins
{const _prevRobe=robe2;robe2=function(c,s,f,K,TOR){const u=CUR.seat||0;if(!(u>0)||!CUR.kneeL)return _prevRobe(c,s,f,K,TOR);_robe2(c,s,f,K,TOR);
  const HK=K.long?1.72:1,k=CUR.kneeL,gL=CUR.gL;if(CUR.seatL==null){CUR.seatL=8*s;CUR.seatR=40*s;}const L=(a,b)=>[lerp(a[0],b[0],u),lerp(a[1],b[1],u)];
  const hang=[[-29*f,-4],[29*f,-4],[34*f,22*HK],[38*f,36*HK],[40*f,46*HK],[0,52*HK],[-40*f,46*HK],[-36*f,24*HK]].map(q=>[q[0]*s,q[1]*s]);
  const drape=[[-29*f*s,-4*s],[29*f*s,-4*s],[k.x+6*f*s,k.y-17*s],[k.x+19*f*s,k.y+4*s],[k.x+17*f*s,gL-14*s],[CUR.seatR*0.82*f,gL-8*s],[CUR.seatR*0.92*f,CUR.seatL+10*s],[-30*f*s,CUR.seatL+3*s]];
  const P=hang.map((q,i)=>L(q,drape[i]));
  c.save();c.lineJoin='round';const g=c.createLinearGradient(-40*s,0,40*s,0);g.addColorStop(L2.dx>0?1:0,shd(K.hakama||K.coat,0.18));g.addColorStop(0.5,K.hakama||K.coat);g.addColorStop(L2.dx>0?0:1,shd(K.hakama||K.coat,-0.35));
  c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(P[0][0],P[0][1]);c.lineTo(P[1][0],P[1][1]);
  for(let i=1;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];c.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2);}c.closePath();c.fill();c.stroke();
  // hem trim along the bottom edge
  c.strokeStyle=K.trim;c.lineWidth=6*s;c.lineCap='round';c.beginPath();c.moveTo(P[6][0]*0.96+P[5][0]*0.04,P[6][1]-3*s);c.quadraticCurveTo(P[5][0],P[5][1]-3*s,P[4][0],P[4][1]-3*s);c.stroke();
  // folds: over the knee and falling down the shin
  c.strokeStyle='rgba(20,10,30,0.35)';c.lineWidth=2*s;for(const w of [0.3,0.6]){c.beginPath();c.moveTo(lerp(P[1][0],P[2][0],w),lerp(P[1][1],P[2][1],w)+6*s);c.quadraticCurveTo(lerp(P[7][0],P[3][0],w),lerp(P[7][1],P[3][1],w),lerp(P[6][0],P[4][0],w*0.9+0.1),lerp(P[6][1],P[4][1],w)-10*s);c.stroke();}
  // front trim panel follows the lap
  if(!CUR.back){c.fillStyle=K.trim;c.strokeStyle=K2;c.lineWidth=2*s;const tx=lerp(0,k.x*0.5,u),ty=lerp(48*s,k.y-4*s,u);c.beginPath();c.moveTo(-3*s,-4*s);c.lineTo(3*s,-4*s);c.lineTo(tx+4*s,ty);c.lineTo(tx-4*s,ty+4*s);c.closePath();c.fill();c.stroke();}
  c.restore();c.save();c.strokeStyle=K2;c.fillStyle=K.sash||'#c89a2a';c.lineWidth=2.4*s;c.beginPath();c.ellipse(-f*24*s,-22*s,7*s,5*s,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-f*24*s,-18*s);c.lineTo(-f*30*s,-2*s);c.lineTo(-f*22*s,-3*s);c.closePath();c.fill();c.stroke();c.restore();};}
{
const MT_LEN=14.0;
const sm=EZ.smooth, io=EZ.io;
const sg=(t,a,b)=>clamp((t-a)/(b-a));
// a value that springs from a to b starting at t0 (overshoot + settle = follow-through)
const spr=(t,t0,a,b,k=9,z=0.42,dur=0.5)=>t<t0?a:lerp(a,b,EZ.spring((t-t0)/dur*1.2,k,z));
// keyed track with smooth in/out between keys: [[t,v],...]
function trk(t,K,ez=io){if(t<=K[0][0])return K[0][1];for(let i=0;i<K.length-1;i++){const [a,va]=K[i],[b,vb]=K[i+1];if(t<=b)return lerp(va,vb,ez((t-a)/(b-a)));}return K[K.length-1][1];}
// blink schedule: short (0.11 s) closures, some on head turns
const BLINKS=[1.2,3.62,4.02,5.55,6.25,8.15,10.18,11.45,12.55];
const blinking=t=>BLINKS.some(b=>t>=b&&t<b+0.11);

// ---------- props, anchored in the set ----------
const ST={x:-0.66,z:-1.14,h:0.46,r:0.2};const SEAT={x:-0.66,z:-1.14};let SQ=0;         // drum stool
const TB={x:0.01,z:-1.3,h:0.58,w:0.42,d:0.36};   // small tea table
const A={x:-0.34,z:-1.04};const P0W={x:-0.36,z:-4.3};const BODY_R=0.12;// leg/robe footprint radius                         // where she stops (in front of the stool)
function stool(c,hipX){const top0=pp([ST.x,ST.h,ST.z]),top={x:top0.x,y:top0.y+SQ*3.2*top0.s,s:top0.s},bot=pp([ST.x,0,ST.z]);const R=ST.r*164*top.s;
  const ry=Math.abs(pp([ST.x,ST.h,ST.z+ST.r]).y-pp([ST.x,ST.h,ST.z-ST.r]).y)/2,ryb=Math.abs(pp([ST.x,0,ST.z+ST.r]).y-pp([ST.x,0,ST.z-ST.r]).y)/2;
  c.save();c.lineJoin='round';
  c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(bot.x,bot.y+2,R*1.25,ryb*1.3,0,0,TAU);c.fill();
  // barrel body
  const g=c.createLinearGradient(bot.x-R,0,bot.x+R,0);g.addColorStop(0,'#3a160c');g.addColorStop(0.35,'#7a3420');g.addColorStop(0.6,'#6a2c1a');g.addColorStop(1,'#2a1008');
  c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=4.5*top.s;c.beginPath();c.moveTo(top.x-R,top.y);c.bezierCurveTo(top.x-R*1.12,lerp(top.y,bot.y,0.35),bot.x-R*1.12,lerp(top.y,bot.y,0.65),bot.x-R*0.92,bot.y);
  c.ellipse(bot.x,bot.y,R*0.92,ryb,0,Math.PI,0,true);c.bezierCurveTo(bot.x+R*1.12,lerp(top.y,bot.y,0.65),top.x+R*1.12,lerp(top.y,bot.y,0.35),top.x+R,top.y);c.closePath();c.fill();c.stroke();
  // gold bands + studs
  for(const k of [0.12,0.88]){const y=lerp(top.y,bot.y,k),w=R*(k<0.5?1.04:1.0);c.strokeStyle='#d8a840';c.lineWidth=5*top.s;c.beginPath();c.ellipse(top.x,y,w,ry*(1-k*0.1),0,0.1,Math.PI-0.1);c.stroke();
    c.fillStyle='#f4d070';for(let i=0;i<7;i++){const a=0.25+i*0.44;c.beginPath();c.arc(top.x+Math.cos(a)*w,y+Math.sin(a)*ry*0.9,2.6*top.s,0,TAU);c.fill();}}
  // carved oval window
  c.fillStyle='#24100a';c.beginPath();c.ellipse(top.x-R*0.1,lerp(top.y,bot.y,0.5),R*0.32,R*0.22,0,0,TAU);c.fill();c.strokeStyle='#d8a840';c.lineWidth=2.5*top.s;c.stroke();
  // seat top (cushion)
  c.fillStyle='#8a3a22';c.strokeStyle=OL;c.lineWidth=4.5*top.s;c.beginPath();c.ellipse(top.x,top.y,R,ry,0,0,TAU);c.fill();c.stroke();
  c.fillStyle='#b8342a';c.beginPath();c.ellipse(top.x,top.y-2*top.s,R*0.8*(1+SQ*0.03),ry*0.72,0,0,TAU);c.fill();c.strokeStyle='#e8c060';c.lineWidth=2*top.s;c.stroke();
  if(hipX!=null){const g2=c.createRadialGradient(hipX,top.y,0,hipX,top.y,R*0.75);g2.addColorStop(0,'rgba(30,8,4,0.55)');g2.addColorStop(1,'rgba(30,8,4,0)');c.fillStyle=g2;c.beginPath();c.ellipse(hipX,top.y,R*0.8,ry*0.8,0,0,TAU);c.fill();}
  c.restore();}
function teaTable(c){const P=(dx,y,dz)=>pp([TB.x+dx,y,TB.z+dz]);const w=TB.w/2,d=TB.d/2,h=TB.h;
  c.save();c.lineJoin='round';c.lineCap='round';const s=P(0,h,0).s;
  // shadow on the floor
  c.fillStyle='rgba(0,0,0,0.3)';const f0=[P(-w,0,-d),P(w,0,-d),P(w,0,d),P(-w,0,d)];c.beginPath();f0.forEach((p,i)=>i?c.lineTo(p.x+6,p.y+3):c.moveTo(p.x+6,p.y+3));c.closePath();c.fill();
  // legs (back two first)
  for(const [lx,lz] of [[-w+0.03,-d+0.03],[w-0.03,-d+0.03],[-w+0.03,d-0.03],[w-0.03,d-0.03]]){const a=P(lx,h-0.06,lz),b=P(lx,0,lz);c.strokeStyle=OL;c.lineWidth=13*s;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();
    c.strokeStyle='#4a1e12';c.lineWidth=8*s;c.stroke();}
  // apron + top
  const t0=[P(-w,h,-d),P(w,h,-d),P(w,h,d),P(-w,h,d)],t1=[P(-w,h-0.07,d),P(w,h-0.07,d)];
  c.fillStyle='#3e180e';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(t0[3].x,t0[3].y);c.lineTo(t0[2].x,t0[2].y);c.lineTo(t1[1].x,t1[1].y);c.lineTo(t1[0].x,t1[0].y);c.closePath();c.fill();c.stroke();
  const rs=P(w,h-0.07,-d);c.fillStyle='#30120a';c.beginPath();c.moveTo(t0[2].x,t0[2].y);c.lineTo(t0[1].x,t0[1].y);c.lineTo(rs.x,rs.y);c.lineTo(t1[1].x,t1[1].y);c.closePath();c.fill();c.stroke();
  const g=c.createLinearGradient(t0[0].x,t0[0].y,t0[2].x,t0[2].y);g.addColorStop(0,'#6a2c18');g.addColorStop(1,'#4a1e10');c.fillStyle=g;c.beginPath();t0.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,220,160,0.25)';c.lineWidth=2*s;c.beginPath();c.moveTo(t0[3].x+4,t0[3].y-2);c.lineTo(t0[2].x-4,t0[2].y-2);c.stroke();
  // teapot + cup on the far half (world-anchored)
  const tp=P(0.1,h,-0.06),tc=P(-0.14,h,-0.1);teapot(c,tp.x,tp.y,tp.s*0.55);cup(c,tc.x,tc.y,tc.s*0.6);
  c.restore();}
function teapot(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4;
  c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.ellipse(0,2,34,8,0,0,TAU);c.fill();
  c.fillStyle='#e8eef4';c.beginPath();c.moveTo(-30,-6);c.quadraticCurveTo(-36,-44,0,-46);c.quadraticCurveTo(36,-44,30,-6);c.quadraticCurveTo(0,4,-30,-6);c.fill();c.stroke();
  c.strokeStyle='#2a5aa8';c.lineWidth=3;c.beginPath();c.moveTo(-26,-26);c.quadraticCurveTo(0,-14,26,-26);c.stroke();c.beginPath();c.arc(0,-30,6,0,TAU);c.stroke();
  c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#e8eef4';c.beginPath();c.moveTo(28,-24);c.quadraticCurveTo(48,-30,52,-46);c.lineTo(46,-46);c.quadraticCurveTo(42,-32,28,-16);c.fill();c.stroke();
  c.beginPath();c.moveTo(-28,-32);c.bezierCurveTo(-52,-36,-52,-8,-28,-12);c.stroke();c.beginPath();c.ellipse(0,-46,14,4,0,0,TAU);c.fill();c.stroke();c.beginPath();c.arc(0,-52,5,0,TAU);c.fill();c.stroke();c.restore();}
function cup(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#e8eef4';c.beginPath();c.moveTo(-14,-22);c.lineTo(14,-22);c.lineTo(9,0);c.lineTo(-9,0);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#2a5aa8';c.lineWidth=2.5;c.beginPath();c.moveTo(-12,-15);c.lineTo(12,-15);c.stroke();c.restore();}
// horizontal hand-scroll held by two rollers; open 0 (rolled) … 1 (open).  L/R = roller centres (px)
function handScroll(c,L,R,s,open){const len=Math.hypot(R.x-L.x,R.y-L.y),a=Math.atan2(R.y-L.y,R.x-L.x);c.save();c.translate(L.x,L.y);c.rotate(a);c.lineJoin='round';
  const h=34*s;if(open>0.02){c.fillStyle='#f2e6c4';c.strokeStyle=OL;c.lineWidth=3.5*s;c.fillRect(0,-h/2,len,h);c.strokeRect(0,-h/2,len,h);
    c.fillStyle='rgba(60,40,20,0.75)';const cols=Math.floor(len/(9*s));for(let i=1;i<cols;i++)for(let j=0;j<4;j++){if(hash(i*7+j)<0.2)continue;c.fillRect(len-i*9*s,-h/2+7*s+j*9*s,4*s,6*s);}
    c.fillStyle='#c8201a';c.fillRect(len*0.12,h*0.08,9*s,9*s);}
  for(const x of [0,len]){const g=c.createLinearGradient(x-6*s,0,x+6*s,0);g.addColorStop(0,'#5a2a12');g.addColorStop(0.5,'#a8642e');g.addColorStop(1,'#5a2a12');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=3.5*s;rr(c,x-6*s,-h/2-8*s,12*s,h+16*s,5*s);c.fill();c.stroke();
    c.fillStyle='#e8c060';c.beginPath();c.arc(x,-h/2-10*s,4*s,0,TAU);c.arc(x,h/2+10*s,4*s,0,TAU);c.fill();}
  c.restore();}
// rolled scroll lying on the table (world-anchored)
function rolled(c,cx,cy,len,th,ang,s){c.save();c.translate(cx,cy);c.rotate(ang);const g=c.createLinearGradient(0,-th/2,0,th/2);g.addColorStop(0,'#fff6dc');g.addColorStop(0.6,'#e6d6aa');g.addColorStop(1,'#b8a47a');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=3.5*s;rr(c,-len/2,-th/2,len,th,th/2);c.fill();c.stroke();
  c.fillStyle='#c8201a';c.fillRect(-3*s,-th/2,6*s,th);c.fillStyle='#a8642e';for(const x of [-len/2,len/2]){c.beginPath();c.ellipse(x,0,4*s,th*0.42,0,0,TAU);c.fill();c.stroke();}c.restore();}
function scrollOnTable(c){const a=pp([TB.x-0.17,TB.h+0.03,TB.z+0.08]),b=pp([TB.x+0.13,TB.h+0.03,TB.z+0.1]);rolled(c,(a.x+b.x)/2,(a.y+b.y)/2,Math.hypot(b.x-a.x,b.y-a.y),16*a.s,Math.atan2(b.y-a.y,b.x-a.x),a.s);}

// ---------- the performance ----------
// key times
const K={walk0:0.35,walk1:3.25,turn:3.72,glance:4.02,sit0:4.3,sitC:4.95,sit1:5.3,lookT:6.2,reach0:6.45,grab:7.0,lift1:7.75,open0:7.9,open1:8.35,read0:8.4,take:9.55,smirk:10.25,roll0:10.75,roll1:11.25,lap:11.55,up0:11.9,up1:12.7};
function body(t){
  // where the hips are (world) and how the figure is posed, as smooth tracks
  const Ap=pp([A.x,0,A.z]),Sp=pp([SEAT.x,0,SEAT.z]);
  const out={f:1,face:null,ff:null,fb:null,hf:null,hb:null,crouch:0,lean:0,tilt:0,headX:0,gx:Ap.x,gy:Ap.y,s:Ap.s,mode:'stand'};
  // ---- 1 · walk toward camera (eased start/stop), last step plants, body carries forward then settles
  if(t<K.walk1+0.02){out.mode='walk';return out;}
  // 0 sitting amount (hip travels back + down), with feet kept where they planted
  const sitU=t<K.up0?io(sg(t,K.sit0,K.sitC)):1-io(sg(t,K.up0,K.up1-0.15));
  out.gx=lerp(Ap.x,Sp.x,sitU);out.gy=lerp(Ap.y,Sp.y,sitU);out.s=lerp(Ap.s,Sp.s,sitU);
  // crouch: dips under the seat line a touch on contact (weight lands), then settles
  const seatTop=pp([ST.x,ST.h,ST.z]);const CRs=116-(Sp.y-seatTop.y)/Sp.s+3;// hip sits just into the cushion
  SQ=0;if(t>K.sitC&&t<K.up0)SQ=Math.max(0,spr(t,K.sitC,1.6,0.6,10,0.38,0.5));else if(t>=K.up0)SQ=0.6*(1-sg(t,K.up0+0.3,K.up0+0.5));
  let cr=lerp(0,CRs,sitU)+SQ*3*sitU;
  // breathing / settling exhale once seated
  if(t>K.sit1&&t<K.up0)cr+=Math.max(0,Math.sin((t-K.sit1)*Math.PI/0.7))*2.2*(t<K.sit1+0.7?1:0);
  // arrival: momentum carries the torso forward then it rocks back (follow-through)
  let ln=t<K.turn?spr(t,K.walk1,0.09,0,8,0.4,0.55):0;
  // turn: weight dips during the pivot step
  if(t>K.turn-0.06&&t<K.turn+0.22)cr+=Math.sin(sg(t,K.turn-0.06,K.turn+0.22)*Math.PI)*6;
  // sit: lean forward as the hips go back (counterbalance), straighten after contact
  ln+=trk(t,[[K.sit0,0],[K.sit0+0.35,0.32],[K.sitC,0.26],[K.sit1,-0.03],[K.sit1+0.3,0.02]]);
  // idle sway while seated (never perfectly still)
  if(t>K.sit1&&t<K.up0)ln+=nz(t*0.7,2)*0.012;
  // reach: tiny lean back (anticipation), then lead with the body, return lags the hand
  ln+=trk(t,[[K.reach0,0],[K.reach0+0.12,-0.04],[K.grab-0.05,0.34],[K.grab+0.15,0.3],[K.lift1,0.02],[K.lift1+0.2,0]]);
  // reading: lean in a touch; take: thrown back, springs to rest; smirk: settles forward
  ln+=trk(t,[[K.read0,0],[K.read0+0.5,0.06],[K.take-0.1,0.07]]) * (t<K.take?1:0);
  if(t>=K.take-0.1&&t<K.up0){ln+=t<K.take?lerp(0.07,0.1,sg(t,K.take-0.1,K.take)):spr(t,K.take,-0.16,0.03,9,0.35,0.6);}
  // stand: lean far forward, push off the knees, rise, settle upright
  if(t>=K.up0)ln=trk(t,[[K.up0,0.03],[K.up0+0.3,0.38],[K.up0+0.55,0.3],[K.up1,-0.02],[K.up1+0.25,0.01],[K.up1+0.5,0]]);
  if(t>=K.up0)cr+=0; // crouch already follows sitU
  out.crouch=cr;out.lean=ln;
  // feet: planted at A the whole time (no sliding). turn = one stepping foot
  const s=out.s,f=1,hipY=out.gy-116*s+cr*s;const stepU=sg(t,K.turn-0.04,K.turn+0.16);
  const footF={x:Ap.x+lerp(6,16,sm(stepU))*Ap.s,y:Ap.y-Math.sin(stepU*Math.PI)*12*Ap.s},footB={x:Ap.x-10*Ap.s,y:Ap.y};
  out.ff=[(footF.x-out.gx)/(s*f),(footF.y-hipY)/s];out.fb=[(footB.x-out.gx)/(s*f),(footB.y-hipY)/s];
  // shoulder (to aim hands in screen space)
  const sh={x:out.gx+Math.sin(ln*f)*84*s,y:hipY-Math.cos(ln*f)*84*s};out.sh=sh;
  const H=(p)=>[(p.x-sh.x)/s,(p.y-sh.y)/s];
  const KN=ik2(out.gx,hipY,footF.x,footF.y,60*s,60*s,p=>p.x*f).e;const knee={x:KN.x,y:KN.y-12*s};// top of the knee (through the robe)
  {const a=ln*f,vx=KN.x-out.gx,vy=KN.y-hipY,gy=out.gy-hipY;out.kneeL={x:vx*Math.cos(a)+vy*Math.sin(a),y:-vx*Math.sin(a)+vy*Math.cos(a)};out.gL=gy*Math.cos(a)-(footF.x-out.gx)*Math.sin(a)*0.3;}
  out.seat=sitU;{const a=ln*f;out.seatL=(seatTop.y+SQ*3.2*Sp.s-hipY)*Math.cos(a);out.seatR=ST.r*164*Sp.s*0.95;}
  const lap={x:out.gx+30*s,y:hipY-4*s};
  // ---- hands
  let hf=[14,92],hb=[-10,94];
  if(t<K.sit0){// arms swing a little with the turn, settle
    hf=[14+Math.sin(sg(t,K.turn,K.turn+0.5)*Math.PI)*8,92];}
  else if(t<K.sitC){// arms come forward for balance
    const u=io(sg(t,K.sit0,K.sitC));hf=[lerp(14,46,u),lerp(92,62,u)];hb=[lerp(-10,30,u),lerp(94,66,u)];}
  else if(t<K.reach0){// land on the knees
    const u=io(sg(t,K.sitC,K.sit1+0.1));const kk=H(knee);hf=[lerp(46,kk[0],u),lerp(62,kk[1],u)];hb=[lerp(30,kk[0]-12,u),lerp(66,kk[1]+4,u)];}
  out.hf=hf;out.hb=hb;out.H=H;out.knee=knee;out.lap=lap;out.hipY=hipY;
  return out;}

function mtShot(c,t){
  T=t;
  // camera: slow push, follows the subject with lag; extra push on the reaction beat; eases back as she stands
  const lagT=Math.max(0,t-0.3);
  const fx=t<K.walk1?lerp(520,500,io(sg(lagT,K.walk0,K.walk1))):lerp(500,470,io(sg(lagT,K.sit0,K.sit1)));
  let z=trk(t,[[0,1.06],[K.walk1,1.3],[K.sit1,1.38],[K.read0,1.42],[K.take,1.5],[K.take+0.25,1.56],[K.up0,1.56],[MT_LEN,1.46]]);
  const fy=trk(t,[[0,1020],[K.walk1,1060],[K.sit1,1100],[K.take,1090],[K.up0,1090],[MT_LEN,1060]]);
  cam(c,'yamen',{z,x:fx,y:fy});
  const grabbed=t>=K.grab;
  const B=body(t);
  // her position on the floor (world) — walking: same eased travel the walker uses
  const wu=travel(t,K.walk0,K.walk1-K.walk0,1,0.28);const her=B.mode==='walk'?{x:lerp(P0W.x,A.x,wu),z:lerp(P0W.z,A.z,wu)}:{x:lerp(A.x,SEAT.x,B.seat),z:lerp(A.z,SEAT.z,B.seat)};
  const herZ=B.mode!=='walk'&&B.seat>0.02?Math.max(her.z,ST.z+0.01):her.z;
  // physical check: her footprint must never be inside a prop (unless she is seated on it)
  {const dS=Math.hypot(her.x-ST.x,her.z-ST.z)-(ST.r+BODY_R);const inT=Math.max(Math.abs(her.x-TB.x)-TB.w/2,Math.abs(her.z-TB.z)-TB.d/2)-BODY_R;window.MT_LOG=window.MT_LOG||[];
   if(dS<-0.005&&!(B.seat>0.02))MT_LOG.push(t.toFixed(2)+' stool '+dS.toFixed(3));if(inT<-0.005)MT_LOG.push(t.toFixed(2)+' table '+inT.toFixed(3));}
  // props drawn in depth order around her: farther ones first, nearer ones after the figure
  const props=[{z:TB.z,d:()=>{teaTable(c);if(!grabbed)scrollOnTable(c);}},{z:ST.z,d:()=>stool(c,B.mode==='walk'||B.seat<0.6?null:B.gx)}].sort((a,b)=>a.z-b.z);
  for(const q of props)if(q.z<herZ)q.d();
  // ---------------- faces ----------------
  let eyes='dot',brow='flat',mouth='flat',look=0,view='3q',tilt=0;
  if(t<K.walk1+0.05){view='front';look=trk(t,[[0,0.2],[1.5,-0.15],[2.6,0.1]],sm);}
  else if(t<K.turn){view='front';look=trk(t,[[K.walk1,0],[K.turn-0.18,0],[K.turn-0.05,0.85]]);} // eyes lead the turn
  else if(t<K.sit0){look=t<K.glance?0.3:trk(t,[[K.glance,0.3],[K.glance+0.08,-0.9]]);tilt=t<K.glance?0:-0.05*sm(sg(t,K.glance,K.glance+0.15));}
  else if(t<K.sit1){look=trk(t,[[K.sit0,-0.9],[K.sitC,-0.3],[K.sit1,0.1]]);tilt=trk(t,[[K.sit0,-0.05],[K.sit1,0]]);brow=t<K.sitC?'flat':'flat';}
  else if(t<K.reach0){look=t<K.lookT?trk(t,[[K.sit1,0.1],[K.sit1+0.5,-0.2],[K.sit1+0.55,-0.2],[5.9,-0.2],[5.95,0.25]]):trk(t,[[K.lookT,0.25],[K.lookT+0.07,0.9]]);tilt=t>K.lookT+0.1?0.05*sm(sg(t,K.lookT+0.1,K.lookT+0.35)):0;}
  else if(t<K.read0){look=0.85;tilt=0.05;eyes=t>K.lift1?'dot':'dot';}
  else if(t<K.take){// reading: saccades — quick jumps, short holds, a quick sweep back
    const r=(t-K.read0);const steps=[-0.5,-0.15,0.2,0.55,-0.5,-0.15,0.25,0.6];const i=Math.min(steps.length-1,Math.floor(r/0.14));const into=r-i*0.14;const prev=i?steps[i-1]:steps[0];look=lerp(prev,steps[i],clamp(into/0.035));
    eyes='dot';brow='flat';mouth='flat';tilt=0.07;}
  else if(t<K.smirk){eyes=t<K.take+0.05?'squeeze':'wide';brow='up';mouth=t<K.take+0.05?'flat':'o';look=0.2;tilt=spr(t,K.take,0.07,-0.04,9,0.4,0.5);}
  else if(t<K.up0){eyes='half';brow='smug';mouth='smirk';look=trk(t,[[K.smirk,0.2],[K.smirk+0.3,-0.35],[K.roll1,-0.35],[K.roll1+0.1,0.3]]);tilt=trk(t,[[K.smirk,-0.04],[K.smirk+0.5,0.06]]);}
  else{eyes='half';brow='smug';mouth='smirk';look=0.3;tilt=trk(t,[[K.up0,0.06],[K.up0+0.4,-0.02],[K.up1,0.03]]);}
  if(blinking(t))eyes='closed';
  const face=X(eyes,brow,mouth,{view,look,noBlink:1});
  // ---------------- figure ----------------
  if(B.mode==='walk'){
    const P0=pp([P0W.x,0,P0W.z]),P1=pp([A.x,0,A.z]);
    walkerZ(c,'ching',t,P0,P1,K.walk0,K.walk1-K.walk0,face,{rate:1.7,acc:0.28});
  }else{
    let hf=B.hf,hb=B.hb,propF=null,after=null;
    // reach → grab → lift → open → read → roll → lap
    const sP=(()=>{const a=pp([TB.x-0.17,TB.h+0.03,TB.z+0.08]),b=pp([TB.x+0.13,TB.h+0.03,TB.z+0.1]);return {x:(a.x+b.x)/2,y:(a.y+b.y)/2,len:Math.hypot(b.x-a.x,b.y-a.y),ang:Math.atan2(b.y-a.y,b.x-a.x),s:a.s};})();
    const S=B.s,chest={x:B.sh.x+50*S,y:B.sh.y+50*S};// in front of the chest, well below the chin
    if(t>=K.reach0&&t<K.grab){const u=io(sg(t,K.reach0+0.1,K.grab));const k0=B.H(B.knee);const tgt=B.H({x:sP.x+4*S,y:sP.y-4*S});
      // arc: rises over the knee, comes down onto the scroll
      const mid=[lerp(k0[0],tgt[0],0.5),Math.min(k0[1],tgt[1])-26];const q=(1-u)*(1-u),r2=2*u*(1-u),w=u*u;hf=[q*k0[0]+r2*mid[0]+w*tgt[0],q*k0[1]+r2*mid[1]+w*tgt[1]];}
    if(t>=K.grab){
      const press=t<K.grab+0.15?Math.sin(sg(t,K.grab,K.grab+0.15)*Math.PI)*4*S:0;// hand presses/closes on it
      const liftU=io(sg(t,K.grab+0.12,K.lift1));
      // carried up in an arc; the scroll turns upright on the way (weight swings it)
      let cx=lerp(sP.x+4*S,chest.x,liftU),cy=lerp(sP.y+press,chest.y,liftU)-Math.sin(liftU*Math.PI)*16*S;
      let ang=lerp(sP.ang,Math.PI/2,io(sg(t,K.grab+0.2,K.lift1+0.1)))+Math.sin(sg(t,K.lift1,K.lift1+0.5)*Math.PI*2)*0.06*(1-sg(t,K.lift1,K.lift1+0.5));
      const openU=t<K.roll0?io(sg(t,K.open0,K.open1)):1-io(sg(t,K.roll0,K.roll1));
      if(t>=K.take&&t<K.take+0.6)cy-=Math.sin(sg(t,K.take,K.take+0.6)*Math.PI)*Math.exp(-3*sg(t,K.take,K.take+0.6))*12*S;// jolts up with the take
      // laid across the lap after rolling up
      if(t>=K.roll1&&t<K.up0){const u=io(sg(t,K.roll1,K.lap));cx=lerp(cx,B.lap.x,u);cy=lerp(cy,B.lap.y-6*S,u);ang=lerp(ang,0.12,u);}
      // standing: picked up in the front hand, rides upright at her side
      if(t>=K.up0){const u=io(sg(t,K.up0+0.2,K.up0+0.6));const side={x:B.sh.x+14*S,y:B.sh.y+88*S};cx=lerp(B.lap.x,side.x,u);cy=lerp(B.lap.y-6*S,side.y,u);ang=lerp(0.12,Math.PI/2,u);}
      const half=openU*32*S;const L={x:cx-half,y:cy,s:S},R={x:cx+half,y:cy,s:S};
      // hands: front on the right roller / the roll; back hand joins after the lift
      hf=B.H(openU>0.02?{x:R.x,y:R.y+2*S}:{x:cx+Math.cos(ang)*6*S,y:cy+Math.sin(ang)*6*S+4*S});
      const join=io(sg(t,K.lift1-0.2,K.lift1+0.1))*(t<K.up0?1:1-io(sg(t,K.up0,K.up0+0.25)));
      const restB=t<K.up0?B.H({x:B.knee.x-14*S,y:B.knee.y+6*S}):[-10,94];
      const lt=B.H(openU>0.02?{x:L.x,y:L.y+2*S}:{x:cx-Math.cos(ang)*8*S-4*S,y:cy-Math.sin(ang)*8*S+8*S});hb=[lerp(restB[0],lt[0],join),lerp(restB[1],lt[1],join)];
      // stand: back hand pushes on the knee first
      if(t>=K.up0&&t<K.up0+0.5){const kk=B.H(B.knee);const u=sm(sg(t,K.up0,K.up0+0.15))*(1-sm(sg(t,K.up0+0.32,K.up0+0.5)));hb=[lerp(hb[0],kk[0]-10,u),lerp(hb[1],kk[1]+4,u)];
        if(t<K.up0+0.25){const u2=sm(sg(t,K.up0,K.up0+0.12));hf=[lerp(hf[0],kk[0]+6,u2),lerp(hf[1],kk[1]+2,u2)];}}
      after=()=>{if(openU>0.04)handScroll(c,L,R,S,openU);else rolled(c,cx,cy,49*S,14*S,ang,S);};
      // when laid on the lap with both hands off it, it must still be drawn (front hand rests on it) — propF covers it
    }
    // stand-up: front hand pushes too (when not holding)
    who(c,'ching',[0,0,0],Object.assign(face,{abs:{x:B.gx,y:B.gy,s:B.s},f:B.f,ff:B.ff,fb:B.fb,hf,hb,crouch:B.crouch,lean:B.lean,tilt:tilt,rot:1e-4,seed:3,seat:B.seat,kneeL:B.kneeL,gL:B.gL,seatL:B.seatL,seatR:B.seatR}));
    if(after)after();// held prop drawn over the body; the fingers wrap behind the rollers
  }
  for(const q of props)if(q.z>=herZ)q.d();
  c.restore();
  cine(c,t,{v:0.5,tint:'rgba(255,170,110,0.10)'});
  // fade out at the end
  if(t>MT_LEN-1.0){c.fillStyle=`rgba(0,0,0,${clamp((t-(MT_LEN-1.0))/1.0)})`;c.fillRect(0,0,W,H);}
}
SHOTS.length=0;SHOTS.push([0,(c,t)=>mtShot(c,t)]);
}
