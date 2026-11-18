'use strict';
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

// ===================== MOTION LAYER for Ching Shih (test — not merged into Style 5) =====================
{
const hS=k=>{let h=0;for(const ch of k)h=(h*31+ch.charCodeAt(0))%997;return h/997*9;};
// irregular blinks: one every ~2.4–4.6 s, 0.11 s long, phase per character
const blinkAt=(t,h)=>{const P=3.5,u=t+h*2.7,k=Math.floor(u/P),b=k*P+hash(k*7.3+h)*1.6;return u>=b&&u<b+0.11;};
// idle life for every standing / still character: breathing sway, head drift, irregular blinks
// gesture with anticipation + overshoot settle (0 → 1)
const G=(t,t0,act=0.35)=>EZ.out(clamp((t-t0)/act));
const RE=(k,fn)=>{fn.t0=V[k].t0;V[k]=fn;};
// screen-space hand target → hf/hb units (relative to the shoulder of a figure standing at p)
const handTo=(p,m,cr=0,ln=0,f=1)=>{const hipY=p.y-116*p.s+cr*p.s,sh={x:p.x+Math.sin(ln*f)*84*p.s,y:hipY-Math.cos(ln*f)*84*p.s};return [(m.x-sh.x)/p.s,(m.y-sh.y)/p.s];};
// ---- seated figure on a real seat (world): hips on the cushion, feet planted, robe drapes over the seat edge
function seated(c,kind,seat,f,face,o={}){const Sp=pp([seat.x,0,seat.z]),top=pp([seat.x,seat.h,seat.z]),s=Sp.s;const cr=116-(Sp.y-top.y)/s+3+(o.dcr||0);
  const ln=o.lean||0,hipY=Sp.y-116*s+cr*s;const F=pp([seat.x+f*(o.reach??0.2),0,seat.z+0.03]),B2=pp([seat.x+f*((o.reach??0.2)-0.06),0,seat.z-0.05]);
  const ff=[(F.x-Sp.x)/(s*f),(F.y-hipY)/s],fb=[(B2.x-Sp.x)/(s*f),(B2.y-hipY)/s];const KN=ik2(Sp.x,hipY,F.x,F.y,60*s,60*s,p=>p.x*f).e;
  const a=ln*f,vx=KN.x-Sp.x,vy=KN.y-hipY;const kneeL={x:vx*Math.cos(a)+vy*Math.sin(a),y:-vx*Math.sin(a)+vy*Math.cos(a)},gL=(Sp.y-hipY)*Math.cos(a);
  const sh={x:Sp.x+Math.sin(a)*84*s,y:hipY-Math.cos(a)*84*s};const kn=[(KN.x-sh.x)/s,(KN.y-12*s-sh.y)/s];
  return who(c,kind,[0,0,0],Object.assign({},face,{abs:{x:Sp.x,y:Sp.y,s},f,ff,fb,crouch:cr,lean:ln,hf:o.hf||kn,hb:o.hb||[kn[0]-12,kn[1]+4],seat:1,kneeL,gL,seatL:(top.y-hipY)*Math.cos(a),seatR:(seat.r||0.2)*164*s*0.95,rot:1e-4,seed:o.seed||0},o.extra||{}));}
window.seated=seated;

// ================= shot upgrades =================
// 4 · offer: the governor lifts the scroll — small dip, rise, overshoot, settle
RE('offer',(c,t,u,d)=>{const t0=V.offer.t0;cam(c,'yamen_close',{z:K3(u,d,1.25,1.35),y:950,x:560});const p=pp([0.15,0,-4.4]);const k=G(t,t0+0.18,0.45);
  const r=who(c,'gov',[0,0,0],Object.assign(F3('dot','up','smile'),{abs:p,f:1,rot:1e-4,hf:[lerp(14,56,k),lerp(90,30,k)],hb:[lerp(-10,40,k),lerp(92,36,k)],lean:-0.04*clamp(k)}));
  if(r){const sx=(r.hf.x+r.hb.x)/2+20*p.s,sy=(r.hf.y+r.hb.y)/2;scroll(c,sx,sy-40*p.s,90*p.s,clamp((t-t0-0.35)/0.6),{seal:ON(t,t0+0.95,0.3)});}c.restore();cine(c,t,{v:0.5});});
// 9 · ask: Zheng offers the bangle (anticipation, reach, overshoot); she reacts a beat later (eyes lead, lean back)
RE('ask',(c,t,u,d)=>{const t0=V.ask.t0;cam(c,'canton',{z:K3(u,d,3.15,3.25),y:1030,x:480});const a=pp([-0.55,0,-0.6]),b=pp([0.35,0,-0.6]);const k=G(t,t0+0.15,0.4);const rx=G(t,t0+0.5,0.35,0.08,0.1);
  who(c,'chingY',[0,0,0],Object.assign(F3(t<t0+0.45?'dot':'wide','up',t<t0+0.5?'flat':'o',{look:t<t0+0.4?0.2:0.6}),{abs:a,f:1,rot:1e-4,}));
  const r=who(c,'zheng',[0,0,0],Object.assign(F3('happy','up','smile'),{abs:b,f:-1,rot:1e-4,hf:[lerp(14,60,k),lerp(90,30,k)]}));
  if(r){const m=MPX(b);c.strokeStyle='#4ac88a';c.lineWidth=0.04*m;c.beginPath();c.ellipse(r.hf.x-0.08*m,r.hf.y-0.04*m,0.07*m,0.05*m,0,0,TAU);c.stroke();c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=0.012*m;c.beginPath();c.ellipse(r.hf.x-0.08*m,r.hf.y-0.04*m,0.06*m,0.04*m,0,3.6,5);c.stroke();}
  c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});});
// 10 · cond: finger up with a snap + head tilt
RE('cond',(c,t,u,d)=>{const tc=wt('on',29.0);cam(c,'canton',{z:3.6,y:1020,x:420});const a=pp([-0.55,0,-0.6]);const k=G(t,tc,0.3,0.12,0.2);
  who(c,'chingY',[0,0,0],Object.assign(F3(t<tc?'happy':'half','flat',t<tc?'smile':'smirk',{look:t<tc-0.1?0.6:0.3}),{abs:a,f:1,rot:1e-4,hf:[lerp(14,50,k),lerp(90,-34,k)]}));c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});});
// 16 · takes: she WALKS forward onto the stern (feet planted), pirates bow one after another
RE('takes',(c,t,u,d)=>{const t0=V.takes.t0,tk=wt('takes',47.3);cam(c,'deck_fwd',{z:K3(u,d,1.15,1.28),y:900,x:540});
  const A0=pp([0,1.4,-7.6]),A1=pp([0,1.4,-7.0]);walkerZ(c,'ching',t,A0,A1,t0,0.9,FF('half','down','flat'),{rate:1.6,acc:0.3});
  [['pirA',-0.8,-1.0,1],['pirB',0.75,-1.2,-1],['pirC',-0.1,-0.4,1]].forEach(([k,x,z,f],i)=>{const bw=ON(t,tk,0.4);who(c,k,[0,0,0],Object.assign(F3(bw>0.3?'closed':'dot','up',bw>0.3?'flat':'o'),{abs:pp([x,0,z]),f,rot:1e-4,lean:bw*0.5,hf:[24,60],hb:[20,62],seed:i}));});
  c.restore();cine(c,t,{v:0.5});});
// 25 · join: captured sailors switch — crouch, pop up with overshoot, staggered
RE('join',(c,t,u,d)=>{const t0=V.join.t0,tj=wt('switch',77.6);cam(c,'deck_fwd',{z:1.3,y:980,x:540});
  who(c,'ching',[0,0,0],Object.assign(FF('half','flat','smirk'),{abs:pp([0,1.4,-7.2]),f:1,rot:1e-4,hf:[46,40]}));
  [[-0.95,-0.9],[0.0,-0.4],[0.95,-0.9]].forEach(([x,z],i)=>{const sw=G(t,tj+i*0.25,0.35,0.1,0.15);const on=sw>0.5;const kind=on?'qsailR':'qsail';const P=pp([x,0,z]);
    const r=who(c,kind,[0,0,0],Object.assign(X(on?'happy':'wide',on?'flat':'worried',on?'smile':'o',{view:on?'front':'3q',look:0}),{abs:P,f:x<0?1:-1,rot:1e-4,crouch:lerp(30,0,sw),lean:lerp(0.3,0,sw),hf:on?[16,88]:[18,98],hb:on?[-12,90]:[-10,98],seed:i}));
    if(r)puff(c,r.hc.x,r.hc.y-20*P.s,tj+i*0.25,t,60*P.s,'255,255,255');});
  c.restore();cine(c,t,{v:0.5});});
// 27 · help: real handshakes — hands meet at one point and pump; the official turns (eyes first) from one to the other
RE('help',(c,t,u,d)=>{const t0=V.help.t0,tb=wt('british',81.4);cam(c,'yamen',{z:K3(u,d,1.35,1.42),y:1060,x:540});
  const Q=pp([0,0,-3.2]),Pp=pp([-0.9,0,-3.0]),Bp=pp([0.9,0,-3.0]);const fq=t<tb?-1:1;
  const shake=()=>0;
  const mP=pp([-0.45,1.0,-3.1]),mB=pp([0.45,1.0,-3.1]);const reachP=clamp(G(t,t0+0.1,0.35))*(t<tb-0.25?1:1-EZ.io(clamp((t-(tb-0.25))/0.25))),reachB=clamp(G(t,tb+0.2,0.35));
  const rest=[14,92];const mixH=(r,h)=>[lerp(rest[0],h[0],r),lerp(rest[1],h[1],r)];
  const hP={x:mP.x,y:mP.y+shake(t,t0+0.5)*Q.s},hB={x:mB.x,y:mB.y+shake(t,tb+0.6)*Q.s};
  const qHand=t<tb?mixH(reachP,handTo(Q,hP)):mixH(reachB,handTo(Q,hB));
  who(c,'portu',[0,0,0],Object.assign(F3('dot','flat','smile',{look:0.3}),{abs:Pp,f:1,rot:1e-4,hf:mixH(reachP,handTo(Pp,hP))}));
  who(c,'qing',[0,0,0],Object.assign(F3('dot','up','smile',{look:0.3}),{abs:Q,f:fq,rot:1e-4,hf:[qHand[0]*1,qHand[1]]}));
  who(c,'brit',[0,0,0],Object.assign(F3('dot','flat','smile',{look:-0.3}),{abs:Bp,f:-1,rot:1e-4,hf:mixH(reachB,handTo(Bp,hB))}));c.restore();cine(c,t,{v:0.5});});
// 33 · terms: she raises one hand with anticipation
RE('terms',(c,t,u,d)=>{const t0=V.terms.t0;cam(c,'yamen',{z:1.6,y:1020,x:560});who(c,'gov',[0,0,0],Object.assign(F3('dot','worried','flat',{look:-0.3}),{abs:pp([0.6,0.35,-5.6]),f:-1,rot:1e-4}));
  const k=G(t,t0+0.15,0.35);who(c,'ching',[0,0,0],Object.assign(F3('half','flat','smirk'),{abs:pp([-0.4,0,-3.4]),f:1,rot:1e-4,hf:[lerp(14,40,k),lerp(92,-10,k)]}));c.restore();cine(c,t,{v:0.5});});
// 35 · yes: the stamp — wind up, slam, a beat of weight, lift; the camera feels the hit
RE('yes',(c,t,u,d)=>{const t0=V.yes.t0;const hit=t0+0.35;
  cam(c,'yamen_close',{z:1.35,y:1000});const p=pp([0,0.35,-6.1]);
  const hy=t<hit?(t<t0+0.22?lerp(56,20,EZ.io(clamp((t-t0)/0.22))):lerp(20,76,EZ.in(clamp((t-t0-0.22)/0.16)))):(t<hit+0.3?76:lerp(76,50,EZ.io(clamp((t-hit-0.3)/0.4))));
  who(c,'gov',[0,0,0],Object.assign(FF(t>hit&&t<hit+0.4?'squeeze':'dot','flat','smile'),{abs:p,f:1,rot:1e-4,hf:[34,hy],hb:[-16,82],lean:t<hit?-0.04*clamp((t-t0)/0.22):0.04*(1-clamp((t-hit)/0.4))}));
  const q=[[-0.45,-5.35],[0.45,-5.35],[0.45,-5.85],[-0.45,-5.85]].map(([x,z])=>pp([x,1.18,z]));c.fillStyle='#f2e6c4';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();q.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(60,40,20,0.6)';for(let i=0;i<5;i++){const a=pp([-0.3,1.18,-5.45-i*0.07]),b=pp([0.1,1.18,-5.45-i*0.07]);c.fillRect(a.x,a.y-2,b.x-a.x,3);}
  if(t>hit){const sp=pp([0.25,1.18,-5.55]);c.fillStyle='#c8201a';c.fillRect(sp.x-14,sp.y-10,28,20);}
  c.restore();if(t>hit&&t<hit+0.12){c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(0,0,W,H);}iconCheck(c,880,520,80,popK(t,hit+0.15,0.3));cine(c,t,{v:0.5});});
// 36 · retire: she stands BEHIND the gaming table (table hides her legs), coins ON the table top, two regulars SEATED on the stools
RE('retire',(c,t,u,d)=>{const t0=V.retire.t0,t69=wt('69',107.6);cam(c,'gamble',{z:K3(u,d,1.04,1.1),y:1060,x:540});
  // her: clipped at the table's far top edge (she is behind it)
  const far=pp([0,0.8,-1.75]),Pq=pp([0.05,0,-2.15]);const laugh=t>t69?Math.abs(Math.sin((t-t69)*11))*3*Math.exp(-(t-t69)*1.5):0;
  // a coin flipped up from her hand and caught again
  const fl=clamp((t-(t0+0.6))/0.8);const hand={x:Pq.x+46*Pq.s,y:Pq.y-150*Pq.s};
  const cheer=G(t,t69+0.1,0.35);
  c.save();c.beginPath();c.rect(0,0,W,far.y);c.clip();
  seated(c,'pirA',{x:-0.85,z:-2.25,h:0.46,r:0.2},1,F3(t>t69?'happy':'dot','up',t>t69?'grin':'o'),{seed:1,lean:0.04,reach:0.16,hf:t>t69?[lerp(30,34,cheer),lerp(60,-20,cheer)]:undefined});
  who(c,'chingOld',[0,0,0],Object.assign(FF(t>t69?'happy':'dot','flat',t>t69?'grin':'smile'),{abs:Pq,f:1,rot:1e-4,hf:[34,40]}));c.restore();
  // coins piled ON the table top
  const tp=pp([0,0.8,-1.2]);coinsPile(c,tp.x,tp.y,150*tp.s,t,24);
  // regulars on the plate's stools, facing the table
  seated(c,'fisher',{x:1.1,z:-1.2,h:0.45,r:0.2},-1,F3(t>t69?'happy':'dot','up',t>t69?'smile':'o'),{seed:2,lean:0.05,reach:0.14});
  c.restore();
  const k=popK(t,t69,0.35);if(k>0){c.save();c.translate(540,520);c.scale(k,k);c.font='900 170px Montserrat, sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=28;c.strokeText('69',0,0);c.fillStyle='#ffd24a';c.fillText('69',0,0);c.restore();}cine(c,t,{v:0.55});});
// 37 · bed: the quilt rises and falls with slow breathing
RE('bed',(c,t,u,d)=>{cam(c,'bedcn',{z:K3(u,d,1.25,1.35),y:820,x:600});const br=0;
  const pil=pp([0,0.78,-3.55]);c.save();c.beginPath();c.rect(0,0,W,pil.y+18*pil.s);c.clip();headWho(c,'chingOld',pil.x,pil.y-22,pil.s*1.05,FF('closed','flat','smile'));c.restore();
  const q=[[-0.75,-3.25],[0.75,-3.25],[0.8,-1.85],[-0.8,-1.85]].map(([x,z])=>pp([x,0.8,z]));const g=c.createLinearGradient(q[0].x,q[0].y,q[2].x,q[2].y);g.addColorStop(0,'#c8443a');g.addColorStop(1,'#8a2a22');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=5;
  c.beginPath();c.moveTo(q[0].x,q[0].y);c.quadraticCurveTo((q[0].x+q[1].x)/2,(q[0].y+q[1].y)/2-30-br,q[1].x,q[1].y);c.lineTo(q[2].x,q[2].y);c.lineTo(q[3].x,q[3].y);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(240,200,120,0.6)';c.lineWidth=4;c.beginPath();c.moveTo(q[0].x,q[0].y+6);c.quadraticCurveTo((q[0].x+q[1].x)/2,(q[0].y+q[1].y)/2-24-br,q[1].x,q[1].y+6);c.stroke();
  c.restore();cine(c,t,{v:0.6});});

// ---- an official seated in the carved chair BEHIND the yamen desk: the desk top hides everything below its far edge
function deskSeat(c,kind,x,face,o={}){const G0=pp([x,0.35,-6.42]);const cr=116-(0.93-0.35)*164;const far=pp([x,1.21,-6.05]);
  c.save();c.beginPath();c.rect(-2000,-2000,6000,far.y+2000);c.clip();
  const r=who(c,kind,[0,0,0],Object.assign({},face,{abs:G0,f:o.f||1,rot:1e-4,crouch:cr,hf:o.hf||[10,60],hb:o.hb||[-8,62],lean:o.lean||0,seed:o.seed||0}));c.restore();return r;}
// 1 · emp: the emperor, seated behind his desk, points — the order goes out
RE('emp',(c,t,u,d)=>{const t0=V.emp.t0,tn=wt('navy',2.0);
  if(t<tn+0.15){cam(c,'yamen_close',{z:K3(u,d,1.2,1.3),y:920});const pt=G(t,t0+0.6,0.35);
    deskSeat(c,'emperor',0,FF('dot','down','frown'),{hf:[lerp(14,74,pt),lerp(70,-4,pt)]});c.restore();}
  else{seaShot(c,t,'sea_wide',{z:K3(u,d,1.0,1.08),y:940},[[-40,-420,'navy'],[30,-330,'navy'],[-12,-200,'navy'],[60,-560,'navy'],[-90,-640,'navy']]);}
  cine(c,t,{v:0.5});});
RE('think',(c,t,u,d)=>{cam(c,'yamen_close',{z:1.3,y:920});deskSeat(c,'emperor',0,FF('half','worried','flat',{look:-0.3}),{});c.restore();yearCard(c,t,wt('1810',84.5),'1810',540,520);cine(c,t,{v:0.5});});
// promise / meet: the people are ON the flower boat's deck
RE('promise',(c,t,u,d)=>{const tb=wt('became',14.4);
  if(t<tb){cam(c,'canton',{z:K3(u,d,1.25,1.4),y:1100,x:420});seaSurface(c,t,{z0:12,z1:2,glitter:0,n:40});const p=pp([-2,-0.6,3.0]);
    flowerBoat(c,p.x,p.y,12*MPX(p),{t,deck:(cc,k)=>{who(cc,'chingY',[0,0,0],Object.assign(F3('dot','flat','flat',{look:0.3}),{abs:{x:-40*k,y:-80*k,s:p.s},f:1,rot:1e-4}));}});c.restore();}
  else{cam(c,'deck_fwd',{z:K3(u,d,1.2,1.3),y:1000,x:520});const p=pp([-0.2,0,-0.6]);who(c,'ching',[0,0,0],Object.assign(FF('half','flat','smirk'),{abs:p,f:1,rot:1e-4,hf:[20,60],hb:[-18,88]}));c.restore();}
  cine(c,t,{v:0.5});});
RE('meet',(c,t,u,d)=>{const t0=V.meet.t0,tz=wt('pirate',24.1);cam(c,'canton',{z:2.4,y:1040,x:t<tz?420:460});
  const bp=pp([-2,-0.6,3.0]);flowerBoat(c,bp.x,bp.y,12*MPX(bp),{t,deck:(cc,k)=>{
    who(cc,'chingY',[0,0,0],Object.assign(F3(t>tz+0.4?'half':'dot','flat',t>tz+0.4?'smirk':'flat',{look:t>tz?0.8:0.2}),{abs:{x:-20*k,y:-80*k,s:bp.s},f:1,rot:1e-4}));
    const wk=G(t,tz+0.1,0.3);who(cc,'zheng',[0,0,0],Object.assign(F3('dot','up',t>tz+0.3?'smile':'flat',{look:-0.8}),{abs:{x:70*k,y:-80*k,s:bp.s},f:-1,rot:1e-4}));}});
  c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});});
// walkin: the governor sits behind his desk and recoils as she walks in
{const _wi=V.walkin;RE('walkin',(c,t,u,d)=>{const t0=V.walkin.t0;cam(c,'yamen',{z:K3(u,d,1.15,1.22),y:1080,x:540});const rx=G(t,t0+1.4,0.4);
  deskSeat(c,'gov',0.3,F3(t<t0+1.3?'dot':'wide','up',t<t0+1.3?'flat':'o',{look:-0.6}),{f:-1});
  const group=[['womB',-1.2,-2.7,-0.3,-4.1,0.5],['kid',-0.3,-2.3,0.45,-3.7,0.3],['womA',-1.65,-2.0,-0.85,-3.5,0.2],['ching',-1.0,-1.5,-0.2,-3.0,0]];
  group.map((g,i)=>({g,i,z:lerp(g[2],g[4],clamp((t-(t0+g[5]*0.6))/3.0))})).sort((a,b)=>a.z-b.z).forEach(({g:[k,ax,az,bx,bz,dl],i})=>{const A=pp([ax,0,az]),B=pp([bx,0,bz]);const sc=k==='kid'?0.62:1;
    walker(c,k,t,{x:A.x,y:A.y,s:A.s*sc},{x:B.x,y:B.y,s:B.s*sc},t0+dl*0.6,3.0,F3(k==='ching'?'half':'dot','flat','flat'),{kind:'walk',stride:k==='kid'?0.7:0.9,seed:i});});
  c.restore();const tu=wt('unarmed',92.8);if(t>tu)iconCross(c,190,420,70,popK(t,tu,0.3));if(t>tu){c.save();c.translate(190,420);c.rotate(-0.6);c.fillStyle='#d8dce4';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-6,-60,12,90);c.strokeRect(-6,-60,12,90);c.fillStyle='#5a2a1a';c.fillRect(-10,30,20,30);c.restore();}
  cine(c,t,{v:0.5});});}
RE('terms',(c,t,u,d)=>{const t0=V.terms.t0;cam(c,'yamen',{z:1.6,y:1020,x:560});deskSeat(c,'gov',0.6,F3('dot','worried','flat',{look:-0.3}),{f:-1});
  const k=G(t,t0+0.15,0.35);who(c,'ching',[0,0,0],Object.assign(F3('half','flat','smirk'),{abs:pp([-0.4,0,-3.4]),f:1,rot:1e-4,hf:[lerp(14,40,k),lerp(92,-10,k)]}));c.restore();cine(c,t,{v:0.5});});
// yes: seated governor; his stamping arm reaches over the desk top onto the scroll (drawn after the desk so it is in front of it)
RE('yes',(c,t,u,d)=>{const t0=V.yes.t0;const hit=t0+0.35;
  cam(c,'yamen_close',{z:1.35,y:1000});
  const q=[[-0.45,-5.35],[0.45,-5.35],[0.45,-5.85],[-0.45,-5.85]].map(([x,z])=>pp([x,1.21,z]));c.fillStyle='#f2e6c4';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();q.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(60,40,20,0.6)';for(let i=0;i<5;i++){const a=pp([-0.3,1.21,-5.45-i*0.07]),b=pp([0.1,1.21,-5.45-i*0.07]);c.fillRect(a.x,a.y-2,b.x-a.x,3);}
  const sp=pp([0.3,1.21,-5.6]);if(t>hit){c.fillStyle='#c8201a';c.save();c.translate(sp.x,sp.y);c.scale(1,0.45);c.fillRect(-16,-16,32,32);c.restore();}
  // hand path: rest → wind up high → slam onto the scroll → hold → lift
  const G0=pp([0,0.35,-6.42]),s=G0.s,cr=116-(0.93-0.35)*164,hipY=G0.y-116*s+cr*s,shp={x:G0.x,y:hipY-84*s};
  const ph=clamp((t-t0)/0.7);const dn=ph<0.5?EZ.in(ph*2):1-EZ.out((ph-0.5)*2)*0.4;
  const hand={x:sp.x,y:sp.y-14*s-(1-dn)*50*s};const hf=[(hand.x-shp.x)/s,(hand.y-shp.y)/s];
  const face=FF('dot','flat','smile'),ln=0;
  deskSeat(c,'gov',0,face,{hf,lean:ln});
  // second pass: only the forearm/hand where it crosses in front of the desk top (right of the torso, inside the top surface)
  const tq=[[-1.25,-5.15],[1.25,-5.15],[1.25,-6.05],[-1.25,-6.05]].map(([x,z])=>pp([x,1.21,z]));
  c.save();c.beginPath();tq.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.clip();c.beginPath();c.rect(G0.x+30*s,-2000,4000,6000);c.clip();
  who(c,'gov',[0,0,0],Object.assign({},face,{abs:G0,f:1,rot:1e-4,crouch:cr,hf,hb:[-8,62],lean:ln,seed:0}));c.restore();
  // the seal block in his fist
  c.fillStyle='#6a2a18';c.strokeStyle=OL;c.lineWidth=3*s;c.fillRect(hand.x-9*s,hand.y+6*s,18*s,12*s);c.strokeRect(hand.x-9*s,hand.y+6*s,18*s,12*s);c.fillStyle='#c8201a';c.fillRect(hand.x-9*s,hand.y+16*s,18*s,4*s);
  c.restore();if(t>hit&&t<hit+0.12){c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(0,0,W,H);}iconCheck(c,880,520,80,popK(t,hit+0.15,0.3));cine(c,t,{v:0.5});});
}
// thumbnail (200): Ching Shih on her stern at dusk, fleet behind — white + red centred title
SHOTS.push([200,(c,t)=>{T=4.4;V.woman(c,4.4,0.6,1.3);T=200;txt(c,'THE PIRATE WHO',540,300,96,'#fff',{sw:22,ls:3});txt(c,"BEAT CHINA'S NAVY",540,420,84,'#ff2b2b',{sw:22,ls:2});}]);
