// ---------- stick figures ----------
const U={hr:26,neck:6,torso:92,ua:50,fa:48,th:60,sh:60};
function ik(ax,ay,bx,by,l1,l2,score){
  let dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy);const mx=l1+l2-0.5;
  if(d>mx){bx=ax+dx/d*mx;by=ay+dy/d*mx;dx=bx-ax;dy=by-ay;d=mx;}
  d=Math.max(d,Math.abs(l1-l2)+1);
  const a=Math.atan2(dy,dx),th=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));
  const e1={x:ax+Math.cos(a+th)*l1,y:ay+Math.sin(a+th)*l1},e2={x:ax+Math.cos(a-th)*l1,y:ay+Math.sin(a-th)*l1};
  return {e:score(e1)>=score(e2)?e1:e2,h:{x:bx,y:by}};
}
const COL={bobby:'#1d2a48',chief:'#1a2440',town:'#4a3a2c',woman:'#5a2232',journo:'#5b4630',hist:'#3a5a44',editor:'#e8e2d0',cam:'#4b4f58',news:'#5a4a38'};
function limb(c,pts,w,s){
  c.lineCap='round';c.lineJoin='round';
  c.strokeStyle='#0b0b0d';c.lineWidth=(w+8)*s;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.stroke();
  c.strokeStyle='#f6f4ee';c.lineWidth=w*s;c.stroke();
}
function ghostLimb(c,pts,w,s,col){c.lineCap='round';c.strokeStyle=col;c.lineWidth=(w+6)*s;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.stroke();}
// o: x,y(ground),s,f,t,run,ph,lean,hf,hb (hand targets rel shoulder, units),ff,fb feet (rel hip x, abs y offset), eyes,brow,mouth,look,sweat,kind,propF,propB,ghost
function fig(c,o){
  const s=o.s||1,f=o.f||1,t=o.t??0,run=o.run||0,ph=o.ph||0;
  const br=Math.sin(t*2.8+(o.seed||0)*3);
  const bob=run?-Math.abs(Math.sin(ph))*14*run:br*1.2;
  const lean=(o.lean||0)*f+run*0.22*f;
  const hip={x:o.x,y:o.y-(U.th+U.sh-4)*s+bob*s+(o.crouch||0)*s+(o.jump||0)*-s};
  const up={x:Math.sin(lean),y:-Math.cos(lean)};
  const neck={x:hip.x+up.x*U.torso*s,y:hip.y+up.y*U.torso*s+br*0.8*s};
  const hc={x:neck.x+up.x*(U.neck+U.hr)*s+(o.headX||0)*s*f,y:neck.y+up.y*(U.neck+U.hr)*s};
  const sh={x:neck.x-up.x*10*s,y:neck.y-up.y*10*s};
  // feet
  let ffp,fbp;const gy=o.y+(o.jump?-o.jump*s:0);
  if(run>0){const sw=p=>({x:hip.x+Math.sin(p)*52*s*run*f+8*f*s,y:gy-Math.max(0,Math.cos(p))*34*s*run});ffp=sw(ph);fbp=sw(ph+Math.PI);}
  else{const st=(o.stance??20)*s;ffp={x:hip.x+st*f+(o.ff||0)*s*f,y:gy-(o.ffy||0)*s};fbp={x:hip.x-st*f*0.8+(o.fb||0)*s*f,y:gy-(o.fby||0)*s};}
  const kneeS=p=>p.x*f;
  const LF=ik(hip.x,hip.y,ffp.x,ffp.y,U.th*s,U.sh*s,kneeS),LB=ik(hip.x,hip.y,fbp.x,fbp.y,U.th*s,U.sh*s,kneeS);
  // hands
  let hf=o.hf,hb=o.hb;
  if(!hf){if(run>0){hf=[Math.sin(ph+Math.PI)*42*f+10*f,62];hb=[Math.sin(ph)*42*f+10*f,62];}else{hf=[14*f+Math.sin(t*2.8)*2,92];hb=[-10*f,94];}}
  if(!hb)hb=[-10*f,94];
  const elS=p=>p.y*1.0-p.x*f*0.6;
  const AF=ik(sh.x,sh.y,sh.x+hf[0]*s,sh.y+hf[1]*s,U.ua*s,U.fa*s,elS),AB=ik(sh.x,sh.y,sh.x+hb[0]*s,sh.y+hb[1]*s,U.ua*s,U.fa*s,elS);
  if(o.ghost){
    const g=o.ghost;ghostLimb(c,[sh,AB.e,AB.h],7,s,g);ghostLimb(c,[hip,LB.e,LB.h],8,s,g);ghostLimb(c,[hip,LF.e,LF.h],8,s,g);ghostLimb(c,[hip,neck],9,s,g);ghostLimb(c,[sh,AF.e,AF.h],7,s,g);
    c.fillStyle=g;c.beginPath();c.arc(hc.x,hc.y,(U.hr+4)*s,0,TAU);c.fill();return;
  }
  const K=o.kind;
  // back arm
  limb(c,[sh,AB.e,AB.h],7,s);fist(c,AB.h,s);
  if(o.propB)o.propB(c,AB.h,s,f);
  // legs
  limb(c,[hip,LB.e,LB.h],8,s);foot(c,LB.h,s,f,K);
  limb(c,[hip,LF.e,LF.h],8,s);foot(c,LF.h,s,f,K);
  // torso
  limb(c,[hip,neck],9,s);
  // clothes
  c.save();c.translate(hip.x,hip.y);c.rotate(lean);
  if(K==='woman'){ // skirt + shawl body
    c.fillStyle=COL.woman;c.strokeStyle='#0b0b0d';c.lineWidth=5*s;
    c.beginPath();c.moveTo(-20*s,-50*s);c.lineTo(20*s,-50*s);c.lineTo(42*s,72*s);c.quadraticCurveTo(0,80*s,-42*s,72*s);c.closePath();c.fill();c.stroke();
    c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.moveTo(4*s,-40*s);c.lineTo(42*s,72*s);c.lineTo(22*s,76*s);c.fill();
  }
  if(K&&K!=='woman'&&K!=='plain'){
    const col=COL[K];const long=K==='bobby'||K==='chief';
    c.fillStyle=col;c.strokeStyle='#0b0b0d';c.lineWidth=5*s;
    c.beginPath();c.moveTo(-24*s,-U.torso*s+10*s);c.lineTo(24*s,-U.torso*s+10*s);c.lineTo(27*s,(long?30:6)*s);c.lineTo(-27*s,(long?30:6)*s);c.closePath();c.fill();c.stroke();
    c.fillStyle='rgba(255,255,255,0.08)';c.fillRect(-20*s,-U.torso*s+14*s,10*s,(U.torso+(long?12:-10))*s);
    if(long){c.fillStyle='#c9a04a';for(let i=0;i<4;i++){c.beginPath();c.arc(4*s*f,(-70+i*20)*s,3.4*s,0,TAU);c.fill();}
      c.fillStyle='#111';c.fillRect(-26*s,-6*s,52*s,8*s);c.fillStyle='#bfa050';c.fillRect(-5*s,-6*s,10*s,8*s);}
    if(K==='chief'){c.fillStyle='#d8b450';c.fillRect(-30*s,-U.torso*s+8*s,14*s,7*s);c.fillRect(16*s,-U.torso*s+8*s,14*s,7*s);
      const mc=['#c33','#36c','#cc3'];for(let i=0;i<3;i++){c.fillStyle=mc[i];c.fillRect((-16+i*9)*s*f-4*s,-62*s,7*s,10*s);c.fillStyle='#e8c860';c.beginPath();c.arc((-16+i*9)*s*f-0.5*s,-48*s,3.5*s,0,TAU);c.fill();}}
    if(K==='editor'){c.fillStyle='#7a2a2a';c.fillRect(-14*s,-80*s,6*s,70*s);c.fillRect(8*s,-80*s,6*s,70*s);}
    if(K==='cam'){c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=2*s;for(let i=-20;i<=20;i+=10){seg(c,i*s,-U.torso*s+12*s,i*s,4*s);}}
    if(K==='town'||K==='news'){c.fillStyle='#6b5a42';c.fillRect(-12*s*f-4*s,-60*s,9*s,9*s);}
  }
  c.restore();
  // head
  c.save();c.translate(hc.x,hc.y);c.rotate(lean*0.5);
  const R=U.hr*s;
  if(K==='woman'){c.fillStyle=COL.woman;c.strokeStyle='#0b0b0d';c.lineWidth=5*s;c.beginPath();c.arc(0,-2*s,R+9*s,Math.PI*0.9,Math.PI*2.1);c.lineTo(R+12*s,R+18*s);c.lineTo(-R-12*s,R+18*s);c.closePath();c.fill();c.stroke();}
  c.fillStyle='#f6f4ee';c.strokeStyle='#0b0b0d';c.lineWidth=5*s;c.beginPath();c.arc(0,0,R,0,TAU);c.fill();c.stroke();
  if(o.red){c.fillStyle=`rgba(230,40,30,${o.red*0.55})`;c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.fill();}
  face(c,o,s,f,R,t);
  hat(c,K,s,f,R,o);
  c.restore();
  // front arm on top
  limb(c,[sh,AF.e,AF.h],7,s);
  if(o.propF)o.propF(c,AF.h,s,f);
  fist(c,AF.h,s);
  return {hip,neck,hc,sh,hf:AF.h,hb:AB.h};
}
function fist(c,p,s){c.fillStyle='#f6f4ee';c.strokeStyle='#0b0b0d';c.lineWidth=4*s;c.beginPath();c.arc(p.x,p.y,8.5*s,0,TAU);c.fill();c.stroke();}
function foot(c,p,s,f,K){c.fillStyle=K&&K!=='plain'?'#121212':'#f6f4ee';c.strokeStyle='#0b0b0d';c.lineWidth=4*s;c.beginPath();c.ellipse(p.x+7*s*f,p.y-4*s,14*s,7*s,0,0,TAU);c.fill();c.stroke();}
function face(c,o,s,f,R,t){
  const fx=f*8*s;const lk=o.look||[0,0];
  const ex=[fx-10*s,fx+10*s],ey=-4*s;
  const E=o.eyes||'open';const blink=(o.blink!==false)&&((t*1.0+(o.seed||0)*0.37)%3.3)<0.1;
  c.fillStyle='#0b0b0d';c.strokeStyle='#0b0b0d';
  for(let i=0;i<2;i++){const x=ex[i],y=ey;
    if(blink&&E!=='wide'&&E!=='spiral'){c.lineWidth=3*s;seg(c,x-5*s,y,x+5*s,y);continue;}
    if(E==='open'){c.beginPath();c.ellipse(x+lk[0]*s,y+lk[1]*s,3.8*s,5.6*s,0,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x+lk[0]*s+1.2*s,y+lk[1]*s-2*s,1.3*s,0,TAU);c.fill();c.fillStyle='#0b0b0d';}
    else if(E==='wide'){c.fillStyle='#fff';c.lineWidth=2.6*s;c.beginPath();c.arc(x,y,8*s,0,TAU);c.fill();c.stroke();c.fillStyle='#0b0b0d';c.beginPath();c.arc(x+lk[0]*s*1.4,y+lk[1]*s,2.8*s,0,TAU);c.fill();}
    else if(E==='half'){c.lineWidth=3*s;c.beginPath();c.ellipse(x,y+1*s,4.5*s,3*s,0,0,Math.PI);c.fill();seg(c,x-6*s,y,x+6*s,y);}
    else if(E==='squeeze'){c.lineWidth=3.4*s;const d=i?-1:1;c.beginPath();c.moveTo(x-5*s*d,y-5*s);c.lineTo(x+4*s*d,y);c.lineTo(x-5*s*d,y+5*s);c.stroke();}
    else if(E==='spiral'){c.lineWidth=2.2*s;c.beginPath();for(let a=0;a<4*Math.PI;a+=0.3){const r=a*0.65*s;c.lineTo(x+Math.cos(a+t*8)*r,y+Math.sin(a+t*8)*r);}c.stroke();}
    else if(E==='angry'){c.beginPath();c.ellipse(x+lk[0]*s,y+1*s,3.8*s,4.4*s,0,0,TAU);c.fill();}
  }
  const Bw=o.brow||'flat';c.lineWidth=3.4*s;c.lineCap='round';
  for(let i=0;i<2;i++){const x=ex[i],y=ey-11*s,d=i===0?-1:1;
    if(Bw==='flat')seg(c,x-5*s,y,x+5*s,y);
    else if(Bw==='up'){c.beginPath();c.arc(x,y+3*s,6*s,Math.PI*1.15,Math.PI*1.85);c.stroke();}
    else if(Bw==='angry')seg(c,x-6*s*d*-1,y-3*s,x+6*s*d*-1,y+3*s);
    else if(Bw==='worried')seg(c,x-6*s*d*-1,y+3*s,x+6*s*d*-1,y-3*s);
  }
  const M=o.mouth||'flat',mx=fx*0.75,my=12*s;c.lineWidth=3.4*s;
  if(M==='flat')seg(c,mx-6*s,my,mx+6*s,my);
  else if(M==='smile'){c.beginPath();c.arc(mx,my-5*s,8*s,0.2*Math.PI,0.8*Math.PI);c.stroke();}
  else if(M==='frown'){c.beginPath();c.arc(mx,my+7*s,7*s,1.2*Math.PI,1.8*Math.PI);c.stroke();}
  else if(M==='o'){c.beginPath();c.ellipse(mx,my+1*s,4*s,5.5*s,0,0,TAU);c.fill();}
  else if(M==='scream'){c.beginPath();c.ellipse(mx,my+2*s,7*s,10*s,0,0,TAU);c.fill();c.fillStyle='#c4404a';c.beginPath();c.ellipse(mx,my+7*s,4*s,3*s,0,0,TAU);c.fill();}
  else if(M==='grin'){c.fillStyle='#0b0b0d';c.beginPath();c.moveTo(mx-10*s,my-2*s);c.lineTo(mx+10*s,my-2*s);c.quadraticCurveTo(mx+9*s,my+10*s,mx,my+10*s);c.quadraticCurveTo(mx-9*s,my+10*s,mx-10*s,my-2*s);c.fill();c.fillStyle='#fff';c.fillRect(mx-8*s,my-1*s,16*s,3.5*s);}
  else if(M==='smirk'){c.beginPath();c.moveTo(mx-7*s,my+1*s);c.quadraticCurveTo(mx+2*s,my+4*s,mx+8*s*f,my-4*s);c.stroke();}
  else if(M==='teeth'){c.fillStyle='#fff';c.strokeStyle='#0b0b0d';c.lineWidth=2.4*s;rr(c,mx-9*s,my-4*s,18*s,9*s,2*s);c.fill();c.stroke();seg(c,mx-9*s,my+0.5*s,mx+9*s,my+0.5*s);}
  if(o.sweat){const st=(t*1.4)%1;c.fillStyle='#8fd0ff';c.strokeStyle='#0b0b0d';c.lineWidth=2*s;
    const sx=-f*(R+2*s),sy=-12*s+st*20*s;c.beginPath();c.moveTo(sx,sy-9*s);c.quadraticCurveTo(sx+6*s,sy+2*s,sx,sy+5*s);c.quadraticCurveTo(sx-6*s,sy+2*s,sx,sy-9*s);c.fill();c.stroke();
    if(o.sweat>1){const sy2=-20*s+((st+0.5)%1)*20*s,sx2=f*(R-4*s);c.beginPath();c.moveTo(sx2,sy2-8*s);c.quadraticCurveTo(sx2+5*s,sy2+2*s,sx2,sy2+4*s);c.quadraticCurveTo(sx2-5*s,sy2+2*s,sx2,sy2-8*s);c.fill();c.stroke();}}
  if(o.strain){c.strokeStyle='#0b0b0d';c.lineWidth=2.5*s;for(let i=0;i<3;i++){const a=-0.9+i*0.4;seg(c,Math.cos(a)*(R+6*s)*-f,Math.sin(a)*(R+6*s),Math.cos(a)*(R+16*s)*-f,Math.sin(a)*(R+16*s));}}
  if(o.glasses){c.strokeStyle='#0b0b0d';c.lineWidth=2.4*s;c.beginPath();c.arc(ex[0],ey,7*s,0,TAU);c.stroke();c.beginPath();c.arc(ex[1],ey,7*s,0,TAU);c.stroke();seg(c,ex[0]+7*s,ey,ex[1]-7*s,ey);}
  if(o.stache||o.kind==='bobby'||o.kind==='chief'){c.fillStyle=o.kind==='chief'?'#d9d4c8':'#1a1210';c.strokeStyle='#0b0b0d';c.lineWidth=2*s;const k=o.kind==='chief'?1.4:1;
    c.beginPath();c.moveTo(mx,my-6*s);c.quadraticCurveTo(mx-8*s*k,my-9*s,mx-14*s*k,my-2*s);c.quadraticCurveTo(mx-8*s*k,my-3*s,mx,my-3*s);c.quadraticCurveTo(mx+8*s*k,my-3*s,mx+14*s*k,my-2*s);c.quadraticCurveTo(mx+8*s*k,my-9*s,mx,my-6*s);c.fill();c.stroke();}
}
function hat(c,K,s,f,R,o){
  c.strokeStyle='#0b0b0d';c.lineWidth=4*s;
  if(K==='bobby'&&!o.noHat){ // custodian helmet
    c.fillStyle=COL.bobby;c.beginPath();c.moveTo(-R-4*s,-R*0.25);c.quadraticCurveTo(-R-2*s,-R*1.9,0,-R*2.05);c.quadraticCurveTo(R+2*s,-R*1.9,R+4*s,-R*0.25);c.closePath();c.fill();c.stroke();
    c.fillStyle='#24345a';c.fillRect(-R-8*s,-R*0.4,2*R+16*s,7*s);c.strokeRect(-R-8*s,-R*0.4,2*R+16*s,7*s);
    c.fillStyle='#d6dce6';c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?5*s:10*s;c.lineTo(f*4*s+Math.cos(a)*r,-R*1.05+Math.sin(a)*r);}c.closePath();c.fill();
    c.fillStyle='#24345a';c.beginPath();c.arc(0,-R*2.02,5*s,0,TAU);c.fill();
  }
  if(K==='chief'){c.fillStyle='#141c33';c.beginPath();c.ellipse(0,-R*0.95,R+10*s,R*0.55,0,Math.PI,TAU);c.fill();c.stroke();
    c.fillStyle='#d8b450';c.fillRect(-R-2*s,-R*0.95,2*R+4*s,9*s);c.fillStyle='#0b0b0d';c.beginPath();c.ellipse(f*12*s,-R*0.58,R*0.8,6*s,0,0,TAU);c.fill();
    c.fillStyle='#e8c860';c.beginPath();c.arc(f*2*s,-R*1.15,6*s,0,TAU);c.fill();}
  if(K==='town'||K==='news'){c.fillStyle='#4b4a44';c.beginPath();c.ellipse(f*4*s,-R*0.62,R+6*s,R*0.6,0,Math.PI*0.95,TAU*1.02);c.fill();c.stroke();c.beginPath();c.ellipse(f*(R*0.6),-R*0.5,R*0.7,5*s,0,0,TAU);c.fill();c.stroke();}
  if(K==='journo'||K==='cam'){c.fillStyle='#16130f';c.beginPath();c.ellipse(0,-R*0.72,R+12*s,6*s,0,0,TAU);c.fill();c.beginPath();c.arc(0,-R*0.78,R*0.8,Math.PI,TAU);c.fill();c.fillStyle='#5a2a1a';c.fillRect(-R*0.8,-R*0.92,R*1.6,5*s);}
  if(K==='editor'){c.fillStyle='rgba(40,140,90,0.85)';c.beginPath();c.moveTo(-R,-R*0.55);c.lineTo(R,-R*0.55);c.lineTo(R+f*16*s,-R*0.3);c.lineTo(-R+f*16*s,-R*0.3);c.closePath();c.fill();c.stroke();}
  if(K==='hist'){c.fillStyle='#6b5a4a';c.beginPath();c.arc(-f*R*0.5,-R*0.55,R*0.55,Math.PI,TAU);c.fill();}
}
// ---------- the Ripper ----------
function ripper(c,o){
  const s=o.s||1,f=o.f||1,t=o.t??0,a=o.a??1;if(a<=0.01)return;
  c.save();c.globalAlpha*=a;
  const col=o.col||'#050506',rim=o.rim||'rgba(150,30,35,0.7)';
  const ph=o.ph||0,walk=o.walk||0,br=Math.sin(t*2.2)*2*s;
  const hipY=o.y-118*s;
  const fl=p=>({x:o.x+Math.sin(p)*38*s*walk+6*s*f,y:o.y-Math.max(0,Math.cos(p))*16*s*walk});
  const F1=fl(ph),F2=fl(ph+Math.PI);
  c.lineCap='round';c.strokeStyle=col;c.lineWidth=15*s;
  for(const F of [F2,F1]){const kx=(o.x+F.x)/2+10*s*f,ky=(hipY+F.y)/2;c.beginPath();c.moveTo(o.x,hipY);c.lineTo(kx,ky);c.lineTo(F.x,F.y-6*s);c.stroke();
    c.fillStyle=col;c.beginPath();c.ellipse(F.x+8*s*f,F.y-6*s,17*s,8*s,0,0,TAU);c.fill();}
  const flap=Math.sin(t*3.1)*8*s+(o.flap||0)*s;
  const shY=o.y-252*s+br;
  // long coat
  c.fillStyle=col;c.beginPath();
  c.moveTo(o.x-30*s,shY);c.lineTo(o.x+30*s,shY);c.lineTo(o.x+52*s+flap*0.5,o.y-70*s);c.quadraticCurveTo(o.x,o.y-58*s,o.x-56*s-flap,o.y-66*s);c.closePath();c.fill();
  c.strokeStyle=rim;c.lineWidth=3*s;c.stroke();
  // cape
  c.beginPath();c.moveTo(o.x-26*s,shY-6*s);c.quadraticCurveTo(o.x-80*s-flap,shY+50*s,o.x-74*s-flap,shY+96*s);c.lineTo(o.x+74*s-flap*0.4,shY+92*s);c.quadraticCurveTo(o.x+80*s,shY+40*s,o.x+26*s,shY-6*s);c.closePath();c.fill();c.stroke();
  // bag
  if(o.bag!==false){const bx=o.x+66*s*f,by=o.y-112*s+Math.sin(ph)*4*s*walk;c.fillStyle='#120807';c.beginPath();rr(c,bx-26*s,by,52*s,38*s,8*s);c.fill();c.strokeStyle=rim;c.lineWidth=2.5*s;c.stroke();
    c.strokeStyle=col;c.lineWidth=5*s;c.beginPath();c.arc(bx,by,12*s,Math.PI,TAU);c.stroke();c.lineWidth=7*s;seg(c,o.x+40*s*f,shY+80*s,bx,by-8*s);}
  // head & hat
  const hy=shY-32*s;
  c.fillStyle=col;c.beginPath();c.arc(o.x+4*s*f,hy,25*s,0,TAU);c.fill();
  c.fillRect(o.x-12*s,hy+10*s,24*s,30*s);
  c.beginPath();c.ellipse(o.x+4*s*f,hy-20*s,60*s,10*s,0,0,TAU);c.fill();c.strokeStyle=rim;c.lineWidth=2.5*s;c.stroke();
  c.fillStyle=col;c.beginPath();c.moveTo(o.x-28*s,hy-22*s);c.lineTo(o.x-31*s,hy-92*s);c.lineTo(o.x+39*s,hy-92*s);c.lineTo(o.x+36*s,hy-22*s);c.closePath();c.fill();c.stroke();
  c.fillStyle='#2a0a0c';c.fillRect(o.x-29*s,hy-38*s,66*s,9*s);
  // eye glint
  const gl=o.glint??0.5;
  if(gl>0){c.save();c.globalCompositeOperation='lighter';
    for(let i=0;i<2;i++){const ex=o.x+f*(6+i*16)*s,ey=hy+2*s;
      c.fillStyle=`rgba(255,240,200,${gl})`;c.beginPath();c.arc(ex,ey,3.2*s,0,TAU);c.fill();
      if(gl>0.6){const L2=(14+gl*26)*s;c.fillStyle=`rgba(255,230,180,${(gl-0.6)*2})`;c.beginPath();c.moveTo(ex-L2,ey);c.lineTo(ex,ey-2.5*s);c.lineTo(ex+L2,ey);c.lineTo(ex,ey+2.5*s);c.closePath();c.fill();
        c.beginPath();c.moveTo(ex,ey-L2*0.6);c.lineTo(ex+2*s,ey);c.lineTo(ex,ey+L2*0.6);c.lineTo(ex-2*s,ey);c.closePath();c.fill();}}
    c.restore();}
  c.restore();
}
// ---------- props (drawn at a hand) ----------
function pLantern(on=1,sw=0){return (c,h,s,f)=>{
  c.save();c.translate(h.x,h.y);c.rotate(sw);
  c.strokeStyle='#0b0b0d';c.lineWidth=3*s;seg(c,0,0,0,18*s);
  c.fillStyle='#1a1a16';c.fillRect(-15*s,18*s,30*s,6*s);c.fillRect(-15*s,62*s,30*s,7*s);
  c.fillStyle=`rgba(255,${lerp(90,210,on)},${lerp(40,110,on)},${0.4+0.6*on})`;c.fillRect(-12*s,24*s,24*s,38*s);
  c.strokeStyle='#1a1a16';c.lineWidth=3*s;c.strokeRect(-12*s,24*s,24*s,38*s);seg(c,0,24*s,0,62*s);
  c.restore();
  const g=c.createRadialGradient(h.x,h.y+42*s,0,h.x,h.y+42*s,260*s);
  c.save();c.globalCompositeOperation='lighter';g.addColorStop(0,`rgba(255,200,110,${0.45*on})`);g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(h.x-260*s,h.y-220*s,520*s,520*s);c.restore();
};}
function pClub(ang=-0.9){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(ang*f);c.fillStyle='#5a3a1e';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.beginPath();c.moveTo(-4*s,10*s);c.lineTo(4*s,10*s);c.lineTo(8*s,-70*s);c.lineTo(-8*s,-70*s);c.closePath();c.fill();c.stroke();c.restore();};}
function pWhistle(blow=0){return (c,h,s,f)=>{c.fillStyle='#d0d4da';c.strokeStyle='#0b0b0d';c.lineWidth=2.5*s;rr(c,h.x-4*s,h.y-18*s,22*s*f,11*s,4*s);c.fill();c.stroke();}}
function pPaper(w=60,hh=80,txt=''){return (c,h,s,f)=>{c.save();c.translate(h.x+f*10*s,h.y-hh*0.6*s);c.rotate(-0.15*f);c.drawImage(SPR.paper,0,0,500,600,-w/2*s,-hh/2*s,w*s,hh*s);c.strokeStyle='#3a2a1a';c.lineWidth=2*s;c.strokeRect(-w/2*s,-hh/2*s,w*s,hh*s);
  c.strokeStyle='rgba(60,40,20,0.5)';for(let i=0;i<5;i++)seg(c,-w/2*s+8*s,(-hh/2+14+i*12)*s,w/2*s-8*s,(-hh/2+14+i*12)*s);c.restore();}}
function pPen(red=true){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(-0.6*f);c.fillStyle='#c8a040';c.strokeStyle='#0b0b0d';c.lineWidth=2*s;c.fillRect(-4*s,-50*s,8*s,50*s);c.strokeRect(-4*s,-50*s,8*s,50*s);c.fillStyle=red?'#e01a1a':'#222';c.beginPath();c.moveTo(-4*s,-50*s);c.lineTo(4*s,-50*s);c.lineTo(0,-66*s);c.closePath();c.fill();c.stroke();c.restore();}}
function pBook(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*14*s,h.y-14*s);c.rotate(0.2*f);c.fillStyle='#7a2a20';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.fillRect(-20*s,-28*s,40*s,52*s);c.strokeRect(-20*s,-28*s,40*s,52*s);c.fillStyle='#e9dcc0';c.fillRect(-16*s,-24*s,4*s,44*s);c.restore();}}
function pSponge(){return (c,h,s,f)=>{c.fillStyle='#d8c060';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;rr(c,h.x-18*s,h.y-14*s,36*s,26*s,6*s);c.fill();c.stroke();c.fillStyle='rgba(120,90,20,0.5)';for(let i=0;i<5;i++){c.beginPath();c.arc(h.x-10*s+i*5*s,h.y-4*s+(i%2)*6*s,2*s,0,TAU);c.fill();}}}
function pMag(){return (c,h,s,f)=>{c.strokeStyle='#0b0b0d';c.lineWidth=6*s;seg(c,h.x,h.y,h.x+f*20*s,h.y-26*s);c.fillStyle='rgba(200,230,255,0.35)';c.lineWidth=5*s;c.strokeStyle='#8a6a2a';c.beginPath();c.arc(h.x+f*32*s,h.y-42*s,18*s,0,TAU);c.fill();c.stroke();}}
function pNotebook(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*16*s,h.y-20*s);c.fillStyle='#e9e2cc';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.fillRect(-18*s,-24*s,36*s,46*s);c.strokeRect(-18*s,-24*s,36*s,46*s);c.fillStyle='#2a2a2a';c.fillRect(-18*s,-28*s,36*s,6*s);c.restore();}}
function pNews(txt='RIPPER'){return (c,h,s,f)=>{c.save();c.translate(h.x+f*6*s,h.y-40*s);c.rotate(0.1*f);c.fillStyle='#e8e1cc';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.fillRect(-36*s,-46*s,72*s,92*s);c.strokeRect(-36*s,-46*s,72*s,92*s);
  c.fillStyle='#111';c.font=`900 ${11*s}px Inter Display`;c.textAlign='center';c.fillText('EXTRA!',0,-30*s);c.fillStyle='#a01010';c.font=`900 ${10*s}px Inter Display`;c.fillText(txt,0,-14*s);c.fillStyle='rgba(0,0,0,0.4)';for(let i=0;i<5;i++)c.fillRect(-28*s,(-4+i*9)*s,56*s,4*s);c.restore();}}
