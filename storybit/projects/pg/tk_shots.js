'use strict';
// ===================== Why you can't tickle yourself · Style 5 =====================
// ---------- props / graphics ----------
function robotArm(c,B,Tg,s,o={}){// two-link IK arm from base B to target Tg (screen space), foam tip
  const L1=150*s,L2=140*s;const dx=Tg.x-B.x,dy=Tg.y-B.y;let d=Math.hypot(dx,dy);d=Math.min(d,L1+L2-1);const a=Math.atan2(dy,dx);const k=Math.acos(clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1));const a1=a-k*(o.flip?-1:1);
  const E={x:B.x+Math.cos(a1)*L1,y:B.y+Math.sin(a1)*L1};const P={x:B.x+Math.cos(a)*d,y:B.y+Math.sin(a)*d};
  c.save();c.lineCap='round';c.lineJoin='round';const seg=(p,q,w)=>{c.strokeStyle=OL;c.lineWidth=w+7;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke();const g2=c.createLinearGradient(p.x,p.y-w,p.x,p.y+w);g2.addColorStop(0,'#ffc070');g2.addColorStop(0.5,'#f08a2a');g2.addColorStop(1,'#a84e14');c.strokeStyle=g2;c.lineWidth=w;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke();c.strokeStyle='rgba(255,255,255,0.45)';c.lineWidth=w*0.18;c.beginPath();c.moveTo(p.x,p.y-w*0.25);c.lineTo(q.x,q.y-w*0.25);c.stroke();};
  seg(B,E,36*s);seg(E,P,28*s);for(const [p,r] of [[B,30*s],[E,24*s]]){c.fillStyle='#4a5058';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(p.x,p.y,r,0,TAU);c.fill();c.stroke();c.fillStyle='#c8ccd2';c.beginPath();c.arc(p.x,p.y,r*0.4,0,TAU);c.fill();}
  // foam tip
  c.fillStyle='#ffe066';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.ellipse(P.x,P.y,22*s,16*s,a,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.ellipse(P.x-6*s,P.y-6*s,7*s,4*s,a,0,TAU);c.fill();c.restore();return P;}
function meter(c,x,y,val,o={}){c.save();c.translate(x,y);const k=o.k??1;c.scale(k,k);panel(c,-250,-70,500,140,{r:40,fill:'rgba(16,16,28,0.9)'});txt(c,o.label||'TICKLE',-150,0,36,'#fff',{stroke:false,ls:4});c.fillStyle='rgba(255,255,255,0.12)';rr(c,-60,-18,280,36,18);c.fill();
  const g2=c.createLinearGradient(-60,0,220,0);g2.addColorStop(0,'#ffd060');g2.addColorStop(1,'#ff3b6a');c.fillStyle=g2;rr(c,-60,-18,Math.max(36,280*clamp(val)),36,18);c.fill();txt(c,Math.round(val*100)+'%',160,-46,30,'#ffd060',{stroke:false});c.restore();}
function brainFace(c,x,y,r,o={}){brainIcon(c,x,y,r,{col:o.col||'#f6a6bf'});c.save();c.translate(x-r*0.12,y-r*0.12);const e=o.eyes||'dot';c.fillStyle=OL;c.strokeStyle=OL;c.lineCap='round';c.lineWidth=r*0.06;
  for(const sd of [-1,1]){const ex=sd*r*0.28;if(e==='dot'){c.beginPath();c.ellipse(ex,0,r*0.07,r*0.1,0,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(ex-r*0.02,-r*0.04,r*0.025,0,TAU);c.fill();c.fillStyle=OL;}
    else if(e==='wide'){c.fillStyle='#fff';c.beginPath();c.arc(ex,0,r*0.13,0,TAU);c.fill();c.stroke();c.fillStyle=OL;c.beginPath();c.arc(ex,0,r*0.05,0,TAU);c.fill();}
    else if(e==='half'){c.beginPath();c.moveTo(ex-r*0.09,0);c.lineTo(ex+r*0.09,0);c.stroke();c.beginPath();c.arc(ex,0,r*0.06,0,Math.PI);c.fill();}
    else if(e==='happy'){c.beginPath();c.arc(ex,r*0.04,r*0.08,Math.PI*1.1,Math.PI*1.9);c.stroke();}
    if(o.brow){c.beginPath();c.moveTo(ex-sd*r*0.12,-r*(o.brow==='angry'?0.2:0.16));c.lineTo(ex+sd*r*0.1,-r*(o.brow==='angry'?0.12:0.2));c.stroke();}}
  const m=o.mouth||'smile';c.beginPath();if(m==='smile')c.arc(0,r*0.18,r*0.12,0.2,Math.PI-0.2);else if(m==='o'){c.fillStyle='#6a1a24';c.ellipse(0,r*0.24,r*0.07,r*0.09,0,0,TAU);c.fill();}else if(m==='flat'){c.moveTo(-r*0.09,r*0.22);c.lineTo(r*0.09,r*0.22);}else if(m==='smirk'){c.moveTo(-r*0.1,r*0.24);c.quadraticCurveTo(r*0.02,r*0.26,r*0.12,r*0.16);}c.stroke();
  c.fillStyle='rgba(255,90,120,0.4)';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*r*0.42,r*0.14,r*0.08,r*0.05,0,0,TAU);c.fill();}c.restore();}
function potato(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#c8955a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-70,0);c.bezierCurveTo(-74,-50,-10,-56,30,-44);c.bezierCurveTo(80,-30,84,30,40,46);c.bezierCurveTo(0,60,-66,52,-70,0);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(120,70,30,0.5)';for(const [a,b] of [[-30,-10],[10,10],[40,-12],[-12,26]]){c.beginPath();c.ellipse(a,b,6,4,0,0,TAU);c.fill();}c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-30,-30,20,8,-0.3,0,TAU);c.fill();
  c.fillStyle=OL;for(const sd of [-1,1]){c.beginPath();c.arc(sd*16,-6,5,0,TAU);c.fill();}c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(-10,14);c.lineTo(10,14);c.stroke();c.restore();}
function stamp(c,t0,t,text,x,y,o={}){if(t<t0)return;const k=popK(t,t0,0.25);c.save();c.translate(x,y);c.scale(lerp(1.6,1,clamp((t-t0)/0.15))*k,lerp(1.6,1,clamp((t-t0)/0.15))*k);c.rotate(o.rot??-0.08);c.strokeStyle=o.col||'#ff3b30';c.lineWidth=10;c.font=`900 ${o.size||80}px "Inter Display"`;const w=c.measureText(text).width+60;rr(c,-w/2,-(o.size||80)*0.75,w,(o.size||80)*1.5,14);c.stroke();txt(c,text,0,4,o.size||80,o.col||'#ff3b30',{stroke:false,ls:6});c.restore();}
function dial(c,x,y,r,v,o={}){c.save();c.translate(x,y);panel(c,-r-40,-r-40,2*r+80,2*r+120,{r:40,fill:'rgba(16,16,28,0.9)'});c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=22;c.lineCap='round';c.beginPath();c.arc(0,0,r,Math.PI*0.75,Math.PI*2.25);c.stroke();
  const g2=c.createLinearGradient(-r,0,r,0);g2.addColorStop(0,'#8ab4ff');g2.addColorStop(1,'#ff3b6a');c.strokeStyle=g2;c.beginPath();c.arc(0,0,r,Math.PI*0.75,Math.PI*0.75+Math.PI*1.5*clamp(v/300));c.stroke();
  const a=Math.PI*0.75+Math.PI*1.5*clamp(v/300);c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*r*0.8,Math.sin(a)*r*0.8);c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,0,14,0,TAU);c.fill();
  txt(c,'DELAY',0,r*0.55,30,'#c8ccd8',{stroke:false,ls:4});txt(c,Math.round(v)+' ms',0,r+50,52,'#ffd060',{stroke:false});c.restore();}
function wiggleLines(c,x,y,t,s=1,col='rgba(255,220,120,0.95)'){c.save();c.strokeStyle=col;c.lineWidth=5*s;c.lineCap='round';for(let i=0;i<4;i++){const a=i/4*TAU+t*3;const r1=60*s,r2=90*s+Math.sin(t*20+i)*8*s;c.beginPath();c.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);c.lineTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2);c.stroke();}c.restore();}
function noSign(c,x,y,r,draw){c.save();c.translate(x,y);c.fillStyle='rgba(16,16,28,0.9)';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();if(draw)draw(c,r);c.strokeStyle='#ff3b30';c.lineWidth=r*0.14;c.beginPath();c.arc(0,0,r*0.9,0,TAU);c.stroke();c.beginPath();c.moveTo(-r*0.64,-r*0.64);c.lineTo(r*0.64,r*0.64);c.stroke();c.restore();}
function check(c,x,y,r,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#2fbf74';c.strokeStyle=OL;c.lineWidth=r*0.1;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.2;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-r*0.45,0);c.lineTo(-r*0.1,r*0.35);c.lineTo(r*0.5,-r*0.35);c.stroke();c.restore();}
function speaker(c,x,y,r,muted,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(16,16,28,0.9)';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(-r*0.5,-r*0.18);c.lineTo(-r*0.25,-r*0.18);c.lineTo(r*0.05,-r*0.45);c.lineTo(r*0.05,r*0.45);c.lineTo(-r*0.25,r*0.18);c.lineTo(-r*0.5,r*0.18);c.closePath();c.fill();
  c.strokeStyle=muted?'#ff3b30':'#fff';c.lineWidth=r*0.1;c.lineCap='round';if(muted){c.beginPath();c.moveTo(r*0.22,-r*0.22);c.lineTo(r*0.55,r*0.22);c.moveTo(r*0.55,-r*0.22);c.lineTo(r*0.22,r*0.22);c.stroke();}else{for(const q of [0.3,0.5]){c.beginPath();c.arc(r*0.05,0,r*q,-0.7,0.7);c.stroke();}}c.restore();}
function feather(c,r){c.save();c.rotate(-0.6);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=r*0.05;c.beginPath();c.moveTo(0,r*0.6);c.quadraticCurveTo(r*0.4,0,0,-r*0.6);c.quadraticCurveTo(-r*0.4,0,0,r*0.6);c.fill();c.stroke();c.beginPath();c.moveTo(0,r*0.7);c.lineTo(0,-r*0.5);c.stroke();c.restore();}
function exclaim(c,x,y,s,t){for(let i=0;i<2;i++){c.save();c.translate(x+(i-0.5)*44*s,y-Math.abs(Math.sin(t*14+i))*10*s);c.rotate((i-0.5)*0.3);txt(c,'!',0,0,90*s,'#ff3b30',{sw:16*s});c.restore();}}
function laughLines(c,x,y,s,t){c.save();c.strokeStyle='rgba(255,210,90,0.95)';c.lineWidth=7*s;c.lineCap='round';for(const sd of [-1,1])for(let i=0;i<3;i++){const a=(sd>0?-0.5:Math.PI+0.5)+(i-1)*0.42*sd,r1=115*s,r2=150*s+Math.sin(t*22+i)*10*s;c.beginPath();c.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);c.lineTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2);c.stroke();}c.restore();}
function starBurst(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#ffd060';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<16;i++){const a=i/16*TAU,rr2=i%2?r*0.5:r;c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2);}c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,0,r*0.25,0,TAU);c.fill();c.restore();}
function pin(c,x,y,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#ff3b30';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,-70,50,Math.PI*0.85,Math.PI*2.15);c.lineTo(0,0);c.closePath();c.fill();c.stroke();
  // little clock tower inside the pin
  c.fillStyle='#f4e8c8';c.fillRect(-14,-104,28,52);c.strokeRect(-14,-104,28,52);c.beginPath();c.moveTo(-16,-104);c.lineTo(0,-124);c.lineTo(16,-104);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,-86,9,0,TAU);c.fill();c.stroke();c.restore();}
function personIco(c,x,y,r,col){c.save();c.fillStyle=col;c.beginPath();c.arc(x,y-r*0.95,r*0.45,0,TAU);c.fill();c.beginPath();c.moveTo(x-r*0.7,y+r*0.9);c.quadraticCurveTo(x-r*0.75,y-r*0.35,x,y-r*0.38);c.quadraticCurveTo(x+r*0.75,y-r*0.35,x+r*0.7,y+r*0.9);c.closePath();c.fill();c.restore();}
function robotIco(c,x,y,r){c.save();c.translate(x,y);c.strokeStyle='#f08a2a';c.lineWidth=r*0.22;c.lineCap='round';c.beginPath();c.moveTo(-r*0.6,r*0.6);c.lineTo(-r*0.1,-r*0.2);c.lineTo(r*0.6,0);c.stroke();c.fillStyle='#ffe066';c.beginPath();c.arc(r*0.65,0,r*0.2,0,TAU);c.fill();c.fillStyle='#4a5058';c.beginPath();c.arc(-r*0.1,-r*0.2,r*0.16,0,TAU);c.fill();c.restore();}
// full-body tickle reaction: eyes flick between ^^ and >< , huge laugh, head bobs, shoulders shake, knees buckle, tears at high intensity
function tickled(t,k=1,f=1){const b=Math.sin(t*18),b2=Math.sin(t*11+1);const sq=Math.sin(t*7)>0.1;
  return {eyes:sq?'squeeze':'happy',brow:'up',mouth:'laugh',tilt:b*0.09*k,lean:b2*0.07*k,crouch:(10+12*Math.abs(b2))*k,dy:-Math.abs(Math.sin(t*9))*10*k,blushK:1.4+0.5*k,tear:k>0.6,cry:k>0.85,sweat:k>0.5?1:0};}
function shrugPose(t,k){return {hf:[lerp(3,44,k),lerp(40,52,k)],hb:[lerp(-3,-44,k),lerp(40,52,k)],tilt:0.08*k};}
const LTAB={dx:1,rim:'#eaf2ff',amb:'#5a6474',key:'rgba(255,245,230,'};
// ---------- lab: participant at the bench (front view). Front (right-hand) arm holds the stick, left hand lies palm-up for the robot ----------
function labFront(c,t,o={}){const top=pp([0,0.77,-0.15]);const st=o.stick||{x:0,y:0};
  if(o.sci!==false)who(c,'sci',[0.95,0,1.2],X(o.se||'dot',o.sb||'flat',o.sm||'smile',{f:-1,view:'front',...(o.so||{})}));
  c.save();c.beginPath();c.rect(-200,-200,W+400,top.y+200);c.clip();const r=who(c,'hero',[0,0,0.32],X(o.he||'dot',o.hb2||'flat',o.hm||'flat',{view:'front',crouch:30,hf:[-2+st.x*0.25,62+st.y*0.25],hb:[2,64],...(o.ho||{})}));c.restore();
  if(r){const h=r.hf;const bx=h.x-st.x*0.4,by=h.y+80;c.save();c.fillStyle='#2a2e34';c.strokeStyle=OL;c.lineWidth=4;rr(c,bx-40,by-10,80,26,6);c.fill();c.stroke();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=12;c.beginPath();c.moveTo(bx,by);c.lineTo(h.x,h.y+6);c.stroke();c.strokeStyle='#d8d8de';c.lineWidth=6;c.beginPath();c.moveTo(bx,by);c.lineTo(h.x,h.y+6);c.stroke();c.restore();fist2(c,h,r.s,KIND2.hero.coat);}
  return r;}
// ================= SHOTS =================
const S={};
S.robot=(c,t,u,d)=>{const t0=S.robot.t0,tc=wt('creepy',t0),ty=wt("can't",t0);const cr=t>tc-0.15;cam(c,'tl_front',{z:cr?K3(t-tc,1.2,1.06,1.2):K3(u,d,1.03,1.08),y:940});
  const wig={x:Math.sin(t*9)*22,y:Math.cos(t*13)*12};const r=labFront(c,t,{he:t>ty?'half':'dot',hm:t>ty?'flat':'smile',ho:{tilt:t>ty?0.06:0},se:cr?'sly':'dot',sb:cr?'smug':'flat',sm:cr?'smirk':'smile',stick:wig});
  if(r){const B=pp([0.62,0.86,-0.32]);robotArm(c,B,{x:r.hb.x+wig.x*0.9,y:r.hb.y-16+wig.y*0.9},B.s/3.4,{flip:1});}
  c.restore();if(!cr)meter(c,540,1700,0.06+0.03*Math.sin(t*9),{k:popK(t,t0+0.4)});grade(c,{tint:cr?'rgba(120,60,200,0.35)':null,v:cr?0.6:0.35});};
S.title=(c,t,u,d)=>{const t0=S.title.t0;gfxBG(c,t,{plate:'br_wide'});const k=popK(t,t0+0.4);if(k>0){c.save();c.translate(540,560);c.scale(k,k);txt(c,'WHY CAN\'T YOU',0,-60,92,'#fff',{sw:20,ls:5});txt(c,'TICKLE YOURSELF?',0,60,100,'#ffd060',{sw:22,ls:5});c.restore();}
  const kb=popK(t,t0+1.2);if(kb>0){brainFace(c,540,1120,230*kb,{eyes:'half',mouth:'smirk',brow:'angry'});c.save();c.translate(840,960);c.rotate(Math.sin(t*6)*0.3);c.scale(kb,kb);feather(c,150);c.restore();noSign(c,240,1380,90*kb,(q,r)=>{q.save();q.scale(0.7,0.7);feather(q,r);q.restore();});}};
// S · try it: ribs → armpits → feet → nothing → poking a potato
S.self=(c,t,u,d)=>{const t0=S.self.t0,tr=wt('ribs',t0),ta=wt('armpits',t0),tf=wt('feet',t0),tn=wt('nothing',t0),tp=wt('potato',t0);cam(c,'br_wide',{z:K3(u,d,1.12,1.18),x:420,y:1040});const pk=Math.sin(t*16)*5;
  let pose={hf:[3+pk,40],hb:[-3-pk,40]};
  if(t>ta-0.05)pose={hf:[-46+pk,6],hb:[-6,-76]};
  if(t>tf-0.05)pose={hf:[18,112+pk],hb:[-24,60],crouch:22,ff:[52,66],lean:0.12};
  if(t>tn-0.1&&t<tp-0.35)pose=shrugPose(t,ON(t,tn-0.1,0.25));
  if(t>tp-0.35)pose={hf:[-40+Math.abs(pk)*3,52],hb:[34,54]};
  const bored=t>tn-0.1;const trying=t<tn-0.1;
  const r=who(c,'hero',[0.05,0,0.5],X(bored?'half':(Math.sin(t*3)>0?'focus':'dot'),bored?'flat':'up',bored?(t>tp-0.35?'smirk':'flat'):'grit',{view:'front',...pose,tilt:(pose.tilt||0)+(trying?Math.sin(t*5)*0.04:0)}));
  if(t>tp-0.35&&r){potato(c,r.hb.x-10*r.s/3,r.hb.y-6*r.s/3,popK(t,tp-0.35)*r.s*0.3);fist2(c,r.hb,r.s,KIND2.hero.coat);}
  if(r&&t<tn-0.1&&t>tr-0.1)wiggleLines(c,t<ta?r.hf.x:t<tf?r.hf.x:r.hf.x,r.hf.y,t,r.s/3.4);c.restore();
  meter(c,540,1720,bored?0:0.04,{k:popK(t,tr-0.1)});if(bored)noSign(c,860,1430,80,(q,R)=>{q.save();q.scale(0.6,0.6);feather(q,R);q.restore();});grade(c,{v:0.32});};
S.freak=(c,t,u,d)=>{const t0=S.freak.t0,tc=wt('control',t0);gfxBG(c,t,{plate:'br_wide'});const k=popK(t,t0+0.1);const on=t>tc-0.1;
  brainFace(c,500,900,300*k,{eyes:on?'half':'dot',brow:on?'angry':null,mouth:on?'flat':'smile'});
  if(on){const kk=popK(t,tc-0.1);c.save();c.translate(830,1100);c.rotate(0.15);c.scale(kk,kk);c.fillStyle='#a8784e';c.strokeStyle=OL;c.lineWidth=6;rr(c,-90,-120,180,240,14);c.fill();c.stroke();c.fillStyle='#fff';rr(c,-74,-96,148,200,6);c.fill();c.fillStyle='#c8c8cc';rr(c,-30,-132,60,26,6);c.fill();c.stroke();
    for(let i=0;i<4;i++){const ck=clamp((t-tc-0.1-i*0.2)/0.15);c.strokeStyle='#3ad28a';c.lineWidth=6;c.globalAlpha=ck;c.beginPath();c.moveTo(-60,-60+i*44);c.lineTo(-48,-48+i*44);c.lineTo(-30,-72+i*44);c.stroke();c.globalAlpha=1;c.fillStyle='#8a8a9a';c.fillRect(-16,-64+i*44,70,8);}c.restore();
    // control-room headset
    c.save();c.strokeStyle=OL;c.lineWidth=12;c.beginPath();c.arc(470,860,250*k,Math.PI*1.15,Math.PI*1.85);c.stroke();c.fillStyle='#3a3e48';c.beginPath();c.ellipse(255,960,40,60,0,0,TAU);c.fill();c.stroke();c.lineWidth=8;c.beginPath();c.moveTo(255,1010);c.quadraticCurveTo(300,1120,400,1110);c.stroke();c.fillStyle='#3a3e48';c.beginPath();c.arc(410,1108,16,0,TAU);c.fill();c.restore();}};
S.predict=(c,t,u,d)=>{const t0=S.predict.t0;gfxBG(c,t,{plate:'br_wide'});const tp=wt('predicts',t0);brainFace(c,540,560,180,{eyes:t>tp?'half':'dot',mouth:'smirk'});
  if(t>tp-0.05){c.save();c.globalAlpha=ON(t,tp-0.05,0.3);for(let i=0;i<3;i++){c.fillStyle='rgba(255,255,255,0.9)';c.beginPath();c.arc(540+i*30,780+i*36,10+i*5,0,TAU);c.fill();}c.restore();}
  const cards=[wt('finger',t0+3),wt('ribs',t0+3.5),wt('two',t0+4),wt('got',t0+4)];
  cards.forEach((tt,i)=>{const k=popK(t,tt-0.05);if(k<=0)return;const x=i%2?780:300,y=1080+Math.floor(i/2)*360;c.save();c.translate(x,y);c.scale(k,k);panel(c,-190,-150,380,300,{r:34,fill:i===3?'rgba(30,110,70,0.95)':'rgba(26,24,56,0.92)'});
    if(i===0){c.fillStyle='#fbf3ec';c.strokeStyle=OL;c.lineWidth=6;rr(c,-24,-100,48,130,24);c.fill();c.stroke();rr(c,-60,10,120,90,30);c.fill();c.stroke();}
    if(i===1){c.strokeStyle='#f4f0e6';c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(0,-100);c.lineTo(0,100);c.stroke();for(let k2=0;k2<4;k2++){c.beginPath();c.moveTo(-8,-70+k2*42);c.quadraticCurveTo(-110,-60+k2*42,-96,-20+k2*42);c.moveTo(8,-70+k2*42);c.quadraticCurveTo(110,-60+k2*42,96,-20+k2*42);c.stroke();}c.strokeStyle='#ffd060';c.lineWidth=6;c.setLineDash([10,8]);c.beginPath();c.arc(80,-6,30,0,TAU);c.stroke();c.setLineDash([]);}
    if(i===2){c.strokeStyle='#ffd060';c.lineWidth=12;c.beginPath();c.arc(0,0,90,0,TAU);c.stroke();c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(0,-60);c.moveTo(0,0);c.lineTo(46,22);c.stroke();txt(c,'2',0,140,0.01,'#fff');}
    if(i===3){c.strokeStyle='#fff';c.lineWidth=22;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-70,0);c.lineTo(-20,50);c.lineTo(80,-60);c.stroke();}
    c.restore();if(i<3&&t>tt+0.1){c.save();c.globalAlpha=0.7;c.fillStyle='#fff';c.translate(i===1?540:540,i===1?1260:y);c.rotate(i===1?2.3:0);c.beginPath();c.moveTo(-20,-18);c.lineTo(20,0);c.lineTo(-20,18);c.closePath();c.fill();c.restore();}});};
S.cereb=(c,t,u,d)=>{const t0=S.cereb.t0,tc=wt('cerebellum',t0),ts=wt('spoiler',t0),tb=wt('back',t0);gfxBG(c,t,{plate:'br_wide'});const z=lerp(1,1.08,u);const R=300;c.save();c.translate(520,860);c.scale(z,z);
  brainIcon(c,0,0,R,{col:'#f6a6bf'});if(t>tb-0.1){const g=0.5+0.5*Math.sin(t*6);const on=ON(t,tb-0.1,0.4);glow(c,0.56*R,0.56*R,240,'255,220,90',(0.35+0.25*g)*on);c.strokeStyle=`rgba(255,220,90,${on})`;c.lineWidth=10;c.beginPath();c.ellipse(0.56*R,0.56*R,0.42*R,0.27*R,0.15,0,TAU);c.stroke();
    // pointer arrow
    c.save();c.globalAlpha=on;c.translate(0.56*R+40,0.56*R+170+Math.sin(t*6)*10);c.fillStyle='#ffd060';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(0,-60);c.lineTo(40,0);c.lineTo(14,0);c.lineTo(14,60);c.lineTo(-14,60);c.lineTo(-14,0);c.lineTo(-40,0);c.closePath();c.fill();c.stroke();c.restore();}c.restore();
  if(t>ts-0.05){const k=popK(t,ts-0.05);c.save();c.translate(540,1560);c.scale(k,k);c.fillStyle='#ffd060';c.strokeStyle=OL;c.lineWidth=10;c.lineJoin='round';c.beginPath();c.moveTo(0,-150);c.lineTo(160,120);c.lineTo(-160,120);c.closePath();c.fill();c.stroke();txt(c,'!',0,40,180,'#1a1a1e',{stroke:false});c.restore();}};
// S · finger lands on the predicted spot → ✓ → brain shrugs → mute
S.match=(c,t,u,d)=>{const t0=S.match.t0,tl=wt('lands',t0),to=wt('oh',t0+4),tm=wt('mutes',t0);cam(c,'br_wide',{z:K3(u,d,1.12,1.18),x:420,y:1040});const land=ON(t,tl-0.3,0.3);
  const r=who(c,'hero',[0.05,0,0.5],X(t>tm?'half':(land>0.9?'happy':'focus'),'flat',t>tm?'flat':(land>0.9?'smile':'flat'),{view:'front',hf:[lerp(26,3,land),lerp(10,40,land)],hb:[8,88],tilt:land>0.9&&t<tm?Math.sin((t-tl)*10)*0.05*clamp(1-(t-tl)):0}));
  if(r&&land>0.95){check(c,r.hf.x+40*r.s/3,r.hf.y-30*r.s/3,30*r.s/3,popK(t,tl));}c.restore();
  // prediction map (bottom-right corner, clear of the body)
  const bx=830,by=1420,k=popK(t,t0+0.2);if(k>0){c.save();c.translate(bx,by);c.scale(k,k);c.fillStyle='rgba(20,30,60,0.92)';c.strokeStyle='#8ad8ff';c.lineWidth=6;c.beginPath();c.arc(0,0,170,0,TAU);c.fill();c.stroke();
    c.strokeStyle='rgba(140,220,255,0.6)';c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(0,-110);c.lineTo(0,110);c.stroke();for(let i=0;i<4;i++){c.beginPath();c.moveTo(-6,-70+i*40);c.quadraticCurveTo(-100,-60+i*40,-90,-24+i*40);c.moveTo(6,-70+i*40);c.quadraticCurveTo(100,-60+i*40,90,-24+i*40);c.stroke();}
    c.strokeStyle='#ffd060';c.lineWidth=6;c.setLineDash([10,8]);c.beginPath();c.arc(-70,-10,28,0,TAU);c.stroke();c.setLineDash([]);if(land>0.95)check(c,-70,-10,26);c.restore();
    brainFace(c,bx,by-250,70,{eyes:'dot',mouth:'smirk'});}
  if(t>to-0.05){brainFace(c,bx,by-250,70*popK(t,to-0.05,0.2),{eyes:'half',mouth:'flat'});}
  speaker(c,250,1420,90,t>tm,popK(t,tm-0.6));meter(c,540,1740,t>tm?lerp(0.6,0,ON(t,tm,0.5)):0.6,{label:'FEEL',k:popK(t,tl)});grade(c,{v:0.32});};
S.zero=(c,t,u,d)=>{const t0=S.zero.t0;gfxBG(c,t,{plate:'br_wide'});const ts=wt('surprise',t0)-0.25,tt=wt('tickle',t0)-0.1,tz=wt('zero',t0)-0.05;
  if(t>ts)noSign(c,540,560,150*popK(t,ts),(q,r)=>{txt(q,'!',0,10,r*1.4,'#ffd060',{stroke:false});});
  if(t>tt)noSign(c,300,1000,150*popK(t,tt),(q,r)=>feather(q,r*1.3));
  if(t>tz){noSign(c,780,1000,150*popK(t,tz),(q,r)=>{q.fillStyle='#ffd060';q.beginPath();q.arc(0,0,r*0.6,0,TAU);q.fill();q.strokeStyle=OL;q.lineWidth=r*0.07;q.beginPath();q.arc(0,r*0.05,r*0.35,0.3,Math.PI-0.3);q.stroke();q.fillStyle=OL;for(const sd of [-1,1]){q.beginPath();q.arc(sd*r*0.2,-r*0.15,r*0.07,0,TAU);q.fill();}});}
  meter(c,540,1460,0,{k:popK(t,t0+0.1)});};
// S · friend sneaks up → ??? → panic → laughing/squirming → kick → impact
S.friend=(c,t,u,d)=>{const t0=S.friend.t0,tbr=wt('brain',t0),tp=wt('panic',t0),tl=wt('laughing',t0),tq=wt('squirming',t0),tk=wt('kicking',t0),tfc=wt('face',t0);
  const hit=t>tfc-0.12;cam(c,'br_wide',{z:K3(u,d,1.12,1.18),x:540,y:1020,sx:hit&&t<tfc+0.3?Math.sin(t*90)*12:0});
  const tick=t>tp-0.05&&t<tk-0.05,laugh=t>tl-0.05&&t<tfc+0.6,sq=t>tq-0.05&&t<tk;const wk=ON(t,t0+0.2,tbr-t0+0.3);
  const fx=hit?lerp(0.55,0.68,ON(t,tfc-0.12,0.4)):lerp(1.6,0.55,wk);const kick=t>tk-0.1&&t<tfc+0.4?ON(t,tk-0.1,tfc-tk):0;
  const TK=tickled(t,laugh?(t>tq?1:0.7):0);const sneak=wk>0&&wk<1&&!hit;
  const heroX=tick&&!laugh?X('shock','up','o',{tilt:0,dy:-Math.max(0,Math.sin((t-tp)*10))*22,sweat:2}):laugh?X(TK.eyes,TK.brow,TK.mouth,{tilt:TK.tilt,lean:TK.lean,crouch:TK.crouch,dy:TK.dy,blushK:TK.blushK,tear:TK.tear,cry:TK.cry,sweat:TK.sweat}):X(t>tbr-0.05?'wide':'dot',t>tbr-0.05?'up':'flat',t>tbr-0.05?'o':'smile',{});
  const H=who(c,'hero',[0.05,0,0.42],Object.assign(heroX,{f:-1,view:'3q',dx:sq?Math.sin(t*30)*6:0,hf:tick||laugh?[-26+Math.sin(t*16)*12,24+Math.cos(t*13)*10]:[-12,86],hb:tick||laugh?[22+Math.sin(t*14)*12,28]:[10,88],...(kick>0?{fb:[lerp(-14,-80,kick),lerp(80,-30,kick)]}:{})}));
  const wf=Math.sin(t*26)*6;const F=who(c,'pal',[fx,0,0.12],X(hit?'drunk':'sly',hit?'worried':'smug',hit?'o':(tick||laugh?'grin':'smirk'),{f:-1,view:'3q',crouch:tick||hit||t>tk-0.3?55:sneak?18:0,...(sneak?WK(t,3.2):{}),dy:sneak?-Math.abs(Math.sin(t*3.2))*14:0,hf:sneak?[-40,-30+wf]:tick||laugh?[-84+wf,6]:[-20,20],hb:sneak?[-10,-34-wf]:tick||laugh?[-60-wf,14]:[10,30],tilt:hit?-0.25*Math.sin((t-tfc)*12)*clamp(1-(t-tfc)):0,lean:hit?0.25:0,sweat:hit?2:0}));
  if(t>tbr-0.05&&t<tp+0.1&&H){for(let i=0;i<3;i++){const k=popK(t,tbr-0.05+i*0.1);c.save();c.translate(H.hc.x-60+i*60,H.hc.y-220-i*20);c.scale(k,k);txt(c,'?',0,0,90,'#ffd060',{sw:16});c.restore();}}
  if(H&&t>tp-0.05&&t<tl-0.05)exclaim(c,H.hc.x+10,H.hc.y-190*H.s/3.4,H.s/3.4,t);if(H&&laugh)laughLines(c,H.hc.x,H.hc.y,H.s/3.4,t);if(tick&&H)wiggleLines(c,H.hip.x,H.hip.y-60*H.s/3,t,H.s/3);
  if(hit&&F){starBurst(c,F.hc.x-130*F.s/3,F.hc.y+20*F.s/3,55*F.s/3,popK(t,tfc-0.12,0.15)*clamp(1-(t-tfc-0.3)*2));ring(c,F.hc.x,F.hc.y,60+(t-tfc)*500,clamp(1-(t-tfc)*2),'rgba(255,240,200,',10);}
  c.restore();meter(c,540,1740,tick||laugh?0.95+0.05*Math.sin(t*20):0.05,{k:popK(t,tp-0.1)});grade(c,{v:0.32});};
// S · the robot set-up: London; you move the stick, the robot copies onto your other hand
S.lab=(c,t,u,d)=>{const t0=S.lab.t0,tl=wt('london',t0),tm=wt('move',t0),tt=wt('tickles',t0);cam(c,'tl_front',{z:K3(u,d,1.03,1.08),y:940});
  const mv=t>tm-0.1;const wig=mv?{x:Math.sin((t-tm)*6)*26,y:Math.cos((t-tm)*9)*10}:{x:0,y:0};const r=labFront(c,t,{he:'dot',hm:'flat',se:'dot',sm:'smile',stick:wig});
  if(r){const B=pp([0.62,0.86,-0.32]);const rob=t>tt-0.15?wig:{x:-40,y:-80};robotArm(c,B,{x:r.hb.x+rob.x*0.9,y:r.hb.y-16+rob.y*0.9},B.s/3.4,{flip:1});
    if(mv){c.save();c.strokeStyle='rgba(255,208,96,0.9)';c.setLineDash([12,10]);c.lineWidth=5;c.beginPath();c.moveTo(r.hf.x,r.hf.y+60);c.quadraticCurveTo(540,r.hf.y+240,r.hb.x,r.hb.y+60);c.stroke();c.setLineDash([]);const a=((t-tm)*0.8)%1;const q=1-a;const px=q*q*r.hf.x+2*q*a*540+a*a*r.hb.x,py=q*q*(r.hf.y+60)+2*q*a*(r.hf.y+240)+a*a*(r.hb.y+60);c.fillStyle='#ffd060';c.beginPath();c.arc(px,py,12,0,TAU);c.fill();c.restore();}}
  c.restore();pin(c,860,1560,popK(t,tl-0.05));grade(c,{v:0.32});};
S.first=(c,t,u,d)=>{const t0=S.first.t0,tk=wt('knows',t0);gfxBG(c,t,{plate:'tl_wide'});dial(c,300,760,150,0);meter(c,540,1300,0.05,{k:popK(t,t0+0.3)});
  brainFace(c,780,760,170,{eyes:'half',mouth:'smirk'});if(t>tk-0.1){const k=popK(t,tk-0.1);personIco(c,880,560,70*k,'#8ab4ff');check(c,950,500,40,k);}};
S.delay=(c,t,u,d)=>{const t0=S.delay.t0,ta=wt('added',t0),tf=wt('fraction',t0);cam(c,'tl_wide',{z:K3(u,d,1.25,1.35),x:380,y:820});
  const r=who(c,'sci',[-1.5,0,-1.4],X('sly','smug','smirk',{f:1,view:'3q',hf:[46,30],hb:[-10,80]}));if(r){const a=t<ta?0:ON(t,ta,tf-ta+0.4)*2.4;c.save();c.translate(r.hf.x+14*r.s/3,r.hf.y+34*r.s/3);c.fillStyle='#3a4048';c.strokeStyle=OL;c.lineWidth=5;rr(c,-60*r.s/3,-10*r.s/3,120*r.s/3,60*r.s/3,8);c.fill();c.stroke();c.translate(0,0);c.rotate(a);c.fillStyle='#c8ccd2';c.beginPath();c.arc(0,0,20*r.s/3,0,TAU);c.fill();c.stroke();c.strokeStyle='#ff3b30';c.lineWidth=5;c.beginPath();c.moveTo(0,0);c.lineTo(0,-16*r.s/3);c.stroke();c.restore();fist2(c,r.hf,r.s,KIND2.sci.coat);}c.restore();
  const v=t<ta?0:lerp(0,200,ON(t,ta,tf-ta+0.4));dial(c,800,1380,120,v);grade(c,{v:0.34});};
S.tick=(c,t,u,d)=>{const t0=S.tick.t0,ts=wt('ticklish',t0),tlo=wt('longer',t0),tw=wt('worse',t0);const on=t>ts-0.2;const hard=t>tw-0.1;const surp=t>t0+0.1&&t<ts-0.2;cam(c,'tl_front',{z:K3(u,d,1.05,1.12),y:940,sx:hard?Math.sin(t*40)*4:0});
  const wig={x:Math.sin(t*9)*22,y:Math.cos(t*13)*12};const TK=tickled(t,on?(hard?1:0.65):0);
  const ho=on?{tilt:TK.tilt,lean:TK.lean*0.6,dy:TK.dy*0.6,blushK:TK.blushK,tear:TK.tear,cry:TK.cry,sweat:TK.sweat}:{dy:surp?-Math.max(0,Math.sin((t-t0)*8))*12:0,sweat:surp?1:0};
  const r=labFront(c,t,{he:on?TK.eyes:(surp?'wide':'dot'),hb2:'up',hm:on?TK.mouth:(surp?'o':'flat'),se:on?'happy':'dot',sb:'up',sm:on?'grin':'smile',so:on?{tilt:Math.sin(t*10)*0.05}:{},ho,stick:wig});
  if(r){const B=pp([0.62,0.86,-0.32]);robotArm(c,B,{x:r.hb.x+wig.x,y:r.hb.y-16+wig.y},B.s/3.4,{flip:1});if(on){wiggleLines(c,r.hb.x,r.hb.y-20,t,B.s/3.4);laughLines(c,r.hc.x,r.hc.y,r.s/3.4,t);}}
  c.restore();const v=t<tlo?200:lerp(200,300,ON(t,tlo,1.0));dial(c,850,1560,80,v);meter(c,330,1700,on?(hard?1:0.7):0.1,{k:0.75});grade(c,{v:0.32});};
S.late=(c,t,u,d)=>{const t0=S.late.t0,tw=wt('wait',t0+2),tl=wt('late',t0);gfxBG(c,t,{plate:'tl_wide'});panel(c,90,400,900,560,{r:40});
  const lane=(y,ico,col,off)=>{ico();c.fillStyle='rgba(255,255,255,0.1)';rr(c,330,y-22,600,44,22);c.fill();const x=380+off+((t*160)%400);c.fillStyle=col;rr(c,x,y-22,90,44,22);c.fill();};
  const off=lerp(0,90,ON(t,tl-0.3,0.5));lane(560,()=>{c.save();c.translate(220,560);c.fillStyle='#fbf3ec';c.strokeStyle=OL;c.lineWidth=5;rr(c,-14,-50,28,64,14);c.fill();c.stroke();rr(c,-34,4,68,48,20);c.fill();c.stroke();c.restore();},'#8ab4ff',0);
  lane(760,()=>robotIco(c,220,760,60),'#ff8a5a',off);if(off>10){c.strokeStyle='#ffd060';c.lineWidth=5;c.setLineDash([8,8]);c.beginPath();c.moveTo(470,860);c.lineTo(470+off,860);c.stroke();c.setLineDash([]);c.save();c.translate(470+off/2,900);c.strokeStyle='#ffd060';c.lineWidth=6;c.beginPath();c.arc(0,0,22,0,TAU);c.stroke();c.beginPath();c.moveTo(0,0);c.lineTo(0,-14);c.moveTo(0,0);c.lineTo(10,6);c.stroke();c.restore();}
  brainFace(c,540,1360,210,{eyes:t>tw-0.1?'wide':'dot',mouth:t>tw-0.1?'o':'smile'});if(t>tw-0.1){const k=popK(t,tw-0.1);c.save();c.translate(800,1120);c.scale(k,k);c.rotate(0.12);txt(c,'?!',0,0,170,'#ffd060',{sw:26});c.restore();}};
S.guess=(c,t,u,d)=>{const t0=S.guess.t0;gfxBG(c,t,{plate:'br_wide'});brainFace(c,540,960,240,{eyes:'dot',mouth:'smile'});
  const icons=['⚽','☕','🚪','🎵','👟','💬','🍎','📱'];icons.forEach((ic,i)=>{const k=popK(t,t0+0.3+i*0.25);if(k<=0)return;const a=i/icons.length*TAU+t*0.6,R=360;const x=540+Math.cos(a)*R,y=960+Math.sin(a)*R*0.9;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(255,255,255,0.95)';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(0,0,64,0,TAU);c.fill();c.stroke();c.font='64px "Noto Color Emoji",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(ic,0,4);c.restore();c.save();c.globalAlpha=0.35*k;c.strokeStyle='#ffd060';c.lineWidth=4;c.setLineDash([8,10]);c.beginPath();c.moveTo(540+Math.cos(a)*250,960+Math.sin(a)*225);c.lineTo(x-Math.cos(a)*70,y-Math.sin(a)*63);c.stroke();c.restore();});};
// S · the only person who can never tickle you… is you (he points at himself and grins)
S.end=(c,t,u,d)=>{const t0=S.end.t0,ty=wt('is',t0+3),tn=wt('never',t0);cam(c,'br_wide',{z:K3(t-t0,5,1.12,1.22),x:420,y:K3(t-t0,5,1040,1000)});const pt=t>ty-0.1;const pk=Math.sin(t*16)*5;
  const r=who(c,'hero',[0.05,0,0.5],X(pt?'sly':'half',pt?'up':'flat',pt?'grin':(t>tn?'smirk':'flat'),{view:'front',...(pt?{hf:[-34,-2],hb:[8,88]}:t>tn-0.1?shrugPose(t,ON(t,tn-0.1,0.3)):{hf:[3+pk,40],hb:[-3-pk,40]}),tilt:pt?0.06+Math.sin((t-ty)*8)*0.03:0}));c.restore();
  if(t>tn-0.1&&!pt)meter(c,540,1740,0,{k:popK(t,tn-0.1)});grade(c,{v:0.32});};
// ---------- timeline ----------
const SEQ=[['robot',0],['title',wt('give')],['self',wt('go')],['freak',wt("here's")],['predict',wt('every',20.5)],['cereb',wt("that's",26)],['match',wt('so',33.5)],['zero',wt('no',41)],['friend',wt('but',43.3)],
  ['lab',wt('now',51.7)],['first',wt('at',60.2)],['delay',wt('but',63.7)],['tick',wt('and',67.4)],['late',wt('same',72)],['guess',wt('so',75.6)],['end',wt('which',80.5)]];
SEQ.forEach(([k,t0])=>{S[k].t0=t0;});
const SHOTS=SEQ.map(([k,t0])=>[t0,(c,t,u,d)=>S[k](c,t,u,d)]);
SHOTS.push([200,(c,t,u,d)=>{T=69;S.tick(c,71.5,0.8,4.5);T=200;txt(c,'WHY YOU CAN\'T',540,300,110,'#fff',{sw:24,ls:4});txt(c,'TICKLE YOURSELF',540,440,112,'#ff2b2b',{sw:24,ls:4});}]);
