// ===== style_2 characters: style_1 white stick figures upgraded to 2.5D =====
const K2='#0b0b0d';
let L2={dx:1,rim:'#ffb35a',key:'rgba(255,190,110,'}; // scene light: dir + rim colour
function shd(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;if(k<0){r*=1+k;g*=1+k;b*=1+k;}else{r+=(255-r)*k;g+=(255-g)*k;b+=(255-b)*k;}return `rgb(${r|0},${g|0},${b|0})`;}
function ik2(ax,ay,bx,by,l1,l2,score){let dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy);const mx=l1+l2-0.5;if(d>mx){bx=ax+dx/d*mx;by=ay+dy/d*mx;dx=bx-ax;dy=by-ay;d=mx;}d=Math.max(d,Math.abs(l1-l2)+1);
  const a=Math.atan2(dy,dx),th=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));const e1={x:ax+Math.cos(a+th)*l1,y:ay+Math.sin(a+th)*l1},e2={x:ax+Math.cos(a-th)*l1,y:ay+Math.sin(a-th)*l1};return {e:score(e1)>=score(e2)?e1:e2,h:{x:bx,y:by}};}
// rounded tube limb through a-e-b with lit side, core shadow, rim light
function limb2(c,a,e,b,w,col,s){
  const cx=2*e.x-(a.x+b.x)/2,cy=2*e.y-(a.y+b.y)/2;
  const P=(ox,oy)=>{c.beginPath();c.moveTo(a.x+ox,a.y+oy);c.quadraticCurveTo(cx+ox,cy+oy,b.x+ox,b.y+oy);};
  c.lineCap='round';c.lineJoin='round';
  P(0,0);c.strokeStyle=K2;c.lineWidth=(w+8)*s;c.stroke();
  P(0,0);c.strokeStyle=shd(col,-0.38);c.lineWidth=w*s;c.stroke();
  P(L2.dx*w*0.16*s,-w*0.06*s);c.strokeStyle=col;c.lineWidth=w*0.66*s;c.stroke();
  P(L2.dx*w*0.26*s,-w*0.1*s);c.strokeStyle=shd(col,0.55);c.lineWidth=w*0.2*s;c.stroke();
  P(L2.dx*w*0.42*s,0);c.strokeStyle=L2.rim;c.lineWidth=2.4*s;c.globalAlpha=0.9;c.stroke();c.globalAlpha=1;
}
function shapeShade(c,x0,x1,col,s){const g=c.createLinearGradient(L2.dx>0?x0:x1,0,L2.dx>0?x1:x0,0);g.addColorStop(0,shd(col,-0.5));g.addColorStop(0.55,col);g.addColorStop(0.85,shd(col,0.22));g.addColorStop(1,shd(col,0.05));return g;}
function rim2(c,s,w=4){c.save();c.clip();c.strokeStyle=L2.rim;c.lineWidth=w*s;c.globalAlpha=0.85;c.translate(-L2.dx*3*s,2*s);c.stroke();c.restore();}
const KIND2={
  bobby:{coat:'#1f2c4c',limb:'#ecebe6',hat:'helmet',stache:true,buttons:true,belt:true,long:true},
  woman:{coat:'#6a2638',limb:'#ecebe6',hat:'shawl',skirt:'#4e1c2c'},
  town:{coat:'#5a4630',limb:'#ecebe6',hat:'cap',vest:'#7a6040',stubble:true},
  plain:{coat:null,limb:'#f2f0ea',hat:'none'},
};
// o: x,y,s,f,t,kind,run,walk,ph,hf,hb,lean,crouch,eyes,brow,mouth,look,sweat,tear,propF,castLen,ghost
function fig2(c,o){
  const s=o.s||1,f=o.f||1,t=o.t??0,K=KIND2[o.kind]||KIND2.plain;
  const run=o.run||0,walk=o.walk||0,ph=o.ph||0,mv=Math.max(run,walk);
  const br=Math.sin(t*2.6+(o.seed||0)*3);
  const bob=mv?-Math.abs(Math.sin(ph))*(run?14:6):br*1.4;
  const lean=(o.lean||0)*f+run*0.24*f;
  const TH=60,SH=60,TOR=96,UA=50,FA=48,HR=27;
  const hip={x:o.x,y:o.y-(TH+SH-4)*s+bob*s+(o.crouch||0)*s};
  const up={x:Math.sin(lean),y:-Math.cos(lean)};
  const nk={x:hip.x+up.x*TOR*s,y:hip.y+up.y*TOR*s+br*0.8*s};
  const sh={x:hip.x+up.x*(TOR-12)*s,y:hip.y+up.y*(TOR-12)*s};
  const hc={x:nk.x+up.x*(HR+6)*s+(o.headX||0)*s*f,y:nk.y+up.y*(HR+6)*s};
  let FF,FB;
  if(mv){const amp=run?56:32,lift=run?36:16;const sw=p=>({x:hip.x+Math.sin(p)*amp*s*f+8*f*s,y:o.y-Math.max(0,Math.cos(p))*lift*s});FF=sw(ph);FB=sw(ph+Math.PI);}
  else{const st=(o.stance??20)*s;FF={x:hip.x+st*f,y:o.y};FB={x:hip.x-st*f*0.8,y:o.y};}
  const kn=p=>p.x*f;const LF=ik2(hip.x,hip.y,FF.x,FF.y,TH*s,SH*s,kn),LB=ik2(hip.x,hip.y,FB.x,FB.y,TH*s,SH*s,kn);
  let hf=o.hf,hb=o.hb;
  if(!hf){if(mv){const a=run?44:30;hf=[Math.sin(ph+Math.PI)*a*f+10*f,run?62:86];hb=[Math.sin(ph)*a*f+10*f,run?62:88];}else{hf=[14*f+Math.sin(t*2.6)*2,92];hb=[-10*f,94];}}
  if(!hb)hb=[-10*f,94];
  const el=p=>p.y-p.x*f*0.6;
  const fr=(o.view==='front'&&!o.back)?1:0;const ax={x:Math.cos(lean),y:Math.sin(lean)};const shF={x:sh.x+ax.x*f*25*s*fr,y:sh.y+ax.y*f*21*s*fr+4*s*fr},shB={x:sh.x-ax.x*f*25*s*fr,y:sh.y-ax.y*f*21*s*fr+4*s*fr};
  if(fr){if(!o.hf)hf=mv?[hf[0]+f*8,hf[1]]:[f*38,90+Math.sin(t*2.6)*2];if(!o.hb)hb=mv?[hb[0]-f*6,hb[1]]:[-f*38,92];}
  const elF=fr?(p=>(p.x-sh.x)*f+p.y*0.2):el,elB=fr?(p=>-(p.x-sh.x)*f+p.y*0.2):el;const AF=ik2(shF.x,shF.y,sh.x+hf[0]*s,sh.y+hf[1]*s,UA*s,FA*s,elF),AB=ik2(shB.x,shB.y,sh.x+hb[0]*s,sh.y+hb[1]*s,UA*s,FA*s,elB);
  if(o.ghost){c.save();c.globalAlpha*=o.ga||0.22;c.strokeStyle=o.ghost;c.lineCap='round';c.lineWidth=15*s;for(const q of [[hip,LF.e,LF.h],[hip,LB.e,LB.h],[sh,AB.e,AB.h],[sh,AF.e,AF.h],[hip,nk,nk]]){c.beginPath();c.moveTo(q[0].x,q[0].y);c.lineTo(q[1].x,q[1].y);c.lineTo(q[2].x,q[2].y);c.stroke();}c.fillStyle=o.ghost;c.beginPath();c.arc(hc.x,hc.y,(HR+4)*s,0,TAU);c.fill();c.restore();return;}
  // cast shadow (long, away from the light) + contact shadow
  if(o.castLen){c.save();c.translate(o.x,o.y);c.transform(1,0,-L2.dx*o.castLen,0.28,0,0);c.fillStyle='rgba(0,0,0,0.32)';rr(c,-16*s,-260*s,32*s,260*s,16*s);c.fill();c.beginPath();c.arc(0,-280*s,28*s,0,TAU);c.fill();c.restore();}
  c.fillStyle='rgba(0,0,0,0.42)';c.beginPath();c.ellipse(o.x,o.y+2*s,62*s,12*s,0,0,TAU);c.fill();
  // back arm, legs
  if(!o.noArms){limb2(c,shB,AB.e,AB.h,10,shd(K.limb,-0.18),s);fist2(c,AB.h,s,shd(K.limb,-0.18));}
  limb2(c,hip,LB.e,LB.h,12,shd(K.limb,-0.18),s);boot2(c,LB.h,s,f,K);
  limb2(c,hip,LF.e,LF.h,12,K.limb,s);boot2(c,LF.h,s,f,K);
  // torso (white tube) + clothing wrapped round it
  c.save();c.translate(hip.x,hip.y);c.rotate(lean);
  const SL=K.skirtL||74;if(K.skirt){c.beginPath();c.moveTo(-20*s,-46*s);c.lineTo(20*s,-46*s);c.quadraticCurveTo(40*s,30*s,(46+Math.sin(t*3)*2)*s,SL*s);c.quadraticCurveTo(0,(SL+8)*s,-46*s,SL*s);c.quadraticCurveTo(-40*s,30*s,-20*s,-46*s);c.closePath();c.fillStyle=shapeShade(c,-46*s,46*s,K.skirt,s);c.fill();c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();rim2(c,s);
    c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=3*s;for(const k of [-26,-6,14,32])seg(c,k*0.35*s,-30*s,k*s,(SL-2)*s);if(K.hem){c.strokeStyle=K.hem;c.lineWidth=6*s;c.beginPath();c.moveTo(-44*s,(SL-4)*s);c.quadraticCurveTo(0,(SL+4)*s,(44+Math.sin(t*3)*2)*s,(SL-4)*s);c.stroke();}}
  const tw=30;
  if(!K.coat){rr(c,-tw/2*s,-TOR*s,tw*s,(TOR+6)*s,15*s);c.fillStyle=shapeShade(c,-tw/2*s,tw/2*s,K.limb,s);c.fill();c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();rim2(c,s);}
  else{const L=K.long?34:6;c.beginPath();c.moveTo(-23*s,-TOR*s+8*s);c.quadraticCurveTo(0,-TOR*s,23*s,-TOR*s+8*s);c.lineTo(27*s,L*s);c.quadraticCurveTo(0,(L+6)*s,-27*s,L*s);c.closePath();
    c.fillStyle=shapeShade(c,-27*s,27*s,K.coat,s);c.fill();c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();rim2(c,s,5);
    c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=2.6*s;c.beginPath();c.moveTo(-14*s,-60*s);c.quadraticCurveTo(-8*s,-40*s,-16*s,-18*s);c.stroke();c.beginPath();c.moveTo(12*s,-70*s);c.quadraticCurveTo(18*s,-50*s,10*s,-30*s);c.stroke();
    if(K.vest){c.fillStyle=shapeShade(c,-10*s,10*s,K.vest,s);c.fillRect(-8*s+f*3*s,-TOR*s+16*s,16*s,(TOR-14)*s);}
    if(K.buttons){for(let i=0;i<4;i++){const by=(-74+i*20)*s,bx=4*s*f;const g=c.createRadialGradient(bx+L2.dx*1.5*s,by-1.5*s,0,bx,by,4*s);g.addColorStop(0,'#fff6c8');g.addColorStop(1,'#a07a20');c.fillStyle=g;c.beginPath();c.arc(bx,by,3.8*s,0,TAU);c.fill();}}
    if(window.romanTorso)romanTorso(c,K,s,f,t,TOR);
    if(K.belt){c.fillStyle='#111';c.fillRect(-27*s,-8*s,54*s,9*s);const g=c.createLinearGradient(-6*s,0,6*s,0);g.addColorStop(0,'#8a6a20');g.addColorStop(1,'#f0d070');c.fillStyle=g;c.fillRect(-6*s,-8*s,12*s,9*s);}
  }
  c.restore();
  // head
  head2(c,hc,s,f,o,K,t,lean,HR);
  // front arm
  if(!o.noArms){limb2(c,shF,AF.e,AF.h,10,K.limb,s);if(o.propF)o.propF(c,AF.h,s,f,t);fist2(c,AF.h,s,K.limb);}
  return {hip,hc,hf:AF.h,hb:AB.h};
}
function fist2(c,p,s,col){const g=c.createRadialGradient(p.x+L2.dx*3*s,p.y-3*s,1,p.x,p.y,10*s);g.addColorStop(0,shd(col,0.5));g.addColorStop(1,shd(col,-0.35));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.arc(p.x,p.y,9*s,0,TAU);c.fill();c.stroke();}
function boot2(c,p,s,f,K){const g=c.createLinearGradient(0,p.y-12*s,0,p.y);g.addColorStop(0,'#3a3634');g.addColorStop(1,'#0e0c0c');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=3.5*s;c.beginPath();c.ellipse(p.x+f*8*s,p.y-5*s,16*s,8*s,0,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,230,200,0.35)';c.beginPath();c.ellipse(p.x+f*8*s+L2.dx*5*s,p.y-9*s,6*s,2*s,0,0,TAU);c.fill();}
function head2(c,hc,s,f,o,K,t,lean,HR){
  const R=HR*s;c.save();c.translate(hc.x,hc.y);c.rotate(lean*0.5+(o.tilt||0)*f);
  if(K.hat==='shawl'){c.beginPath();c.arc(0,-2*s,R+10*s,Math.PI*0.88,Math.PI*2.12);c.lineTo(R+14*s,R+22*s);c.lineTo(-R-14*s,R+22*s);c.closePath();c.fillStyle=shapeShade(c,-R-14*s,R+14*s,K.coat,s);c.fill();c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();rim2(c,s);}
  // sphere shading
  const g=c.createRadialGradient(L2.dx*R*0.38,-R*0.42,R*0.08,0,0,R*1.1);g.addColorStop(0,'#ffffff');g.addColorStop(0.5,'#e6e4de');g.addColorStop(0.85,'#a9a6a0');g.addColorStop(1,'#7c7974');
  c.beginPath();c.arc(0,0,R,0,TAU);c.fillStyle=g;c.fill();
  if(o.blush){c.fillStyle='rgba(230,90,80,0.25)';c.beginPath();c.ellipse(f*R*0.45,R*0.3,R*0.22,R*0.12,0,0,TAU);c.fill();}
  if(K.stubble){c.save();c.beginPath();c.arc(0,0,R,0,TAU);c.clip();c.fillStyle='rgba(60,50,45,0.22)';c.beginPath();c.ellipse(f*R*0.25,R*0.62,R*0.75,R*0.42,0,0,TAU);c.fill();c.restore();}
  c.strokeStyle=K2;c.lineWidth=5*s;c.beginPath();c.arc(0,0,R,0,TAU);c.stroke();
  c.strokeStyle=L2.rim;c.lineWidth=3.2*s;c.globalAlpha=0.9;c.beginPath();const a0=L2.dx>0?-1.15:Math.PI-0.55,a1=L2.dx>0?0.55:Math.PI+1.15;c.arc(0,0,R-3.5*s,a0,a1);c.stroke();c.globalAlpha=1;
  // hat brim shadow over the eyes
  if(K.hat==='helmet'||K.hat==='cap'){c.save();c.beginPath();c.arc(0,0,R,0,TAU);c.clip();c.fillStyle='rgba(0,0,0,0.22)';c.fillRect(-R,-R,2*R,R*0.62);c.restore();}
  face2(c,o,s,f,R,t);
  hat2b(c,K.hat,s,f,R,t);
  c.restore();
}
function face2(c,o,s,f,R,t){
  const fx=f*7*s,lk=o.look||[0,0];const ex=[fx-9.5*s,fx+9.5*s],ey=-3*s;const E=o.eyes||'open';
  const blink=((t+(o.seed||0)*0.37)%3.3)<0.09&&!['wide','shock','closed'].includes(E);
  c.fillStyle=K2;c.strokeStyle=K2;c.lineCap='round';
  for(let i=0;i<2;i++){const x=ex[i],y=ey,d=i?1:-1;
    if(blink){c.lineWidth=3*s;seg(c,x-5*s,y,x+5*s,y);continue;}
    if(E==='open'||E==='sly'){c.fillStyle='#fff';c.beginPath();c.ellipse(x,y,5.2*s,6.4*s,0,0,TAU);c.fill();c.lineWidth=2*s;c.stroke();c.fillStyle=K2;c.beginPath();c.arc(x+lk[0]*1.6*s,y+lk[1]*1.6*s+0.5*s,3.2*s,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x+lk[0]*1.6*s+1.2*s,y+lk[1]*1.6*s-1*s,1.1*s,0,TAU);c.fill();
      if(E==='sly'){c.fillStyle=K2;c.beginPath();c.ellipse(x,y-4.5*s,6.4*s,4.2*s,0,Math.PI,TAU);c.fill();}}
    else if(E==='wide'||E==='shock'){c.fillStyle='#fff';c.lineWidth=2.4*s;c.beginPath();c.arc(x,y,7.6*s,0,TAU);c.fill();c.stroke();c.fillStyle=K2;c.beginPath();c.arc(x+lk[0]*1.2*s,y+lk[1]*1.2*s,E==='shock'?1.8*s:3*s,0,TAU);c.fill();}
    else if(E==='angry'){c.fillStyle='#fff';c.beginPath();c.ellipse(x,y+1*s,5.4*s,5*s,0,0,TAU);c.fill();c.lineWidth=2*s;c.stroke();c.fillStyle=K2;c.beginPath();c.arc(x+lk[0]*1.4*s,y+1.5*s,3*s,0,TAU);c.fill();c.beginPath();c.moveTo(x-7*s,y-6*s*(d*f>0?0.2:1.4));c.lineTo(x+7*s,y-6*s*(d*f>0?1.4:0.2));c.lineTo(x+7*s,y-8*s);c.lineTo(x-7*s,y-8*s);c.fill();}
    else if(E==='closed'){c.lineWidth=3*s;c.beginPath();c.arc(x,y-1*s,5*s,Math.PI*0.15,Math.PI*0.85);c.stroke();}
    else if(E==='squeeze'){c.lineWidth=3.2*s;c.beginPath();c.moveTo(x-5*s*d,y-5*s);c.lineTo(x+4*s*d,y);c.lineTo(x-5*s*d,y+5*s);c.stroke();}
  }
  const Bw=o.brow||'flat';c.lineWidth=3.8*s;
  for(let i=0;i<2;i++){const x=ex[i],y=ey-11*s,d=i?1:-1;
    if(Bw==='flat')seg(c,x-5.5*s,y,x+5.5*s,y);
    else if(Bw==='up'){c.beginPath();c.arc(x,y+3*s,6.5*s,Math.PI*1.2,Math.PI*1.8);c.stroke();}
    else if(Bw==='angry')seg(c,x-6*s*-d,y-3*s,x+6*s*-d,y+3.5*s);
    else if(Bw==='worried')seg(c,x-6*s*-d,y+3.5*s,x+6*s*-d,y-3*s);
    else if(Bw==='sly'){if(i===(f>0?1:0)){c.beginPath();c.arc(x,y+3*s,6.5*s,Math.PI*1.2,Math.PI*1.8);c.stroke();}else seg(c,x-6*s,y+2*s,x+6*s,y+3*s);}}
  const M=o.mouth||'flat',mx=fx*0.8,my=(o.stache||o.kind==='bobby'?15:12)*s;c.lineWidth=4.2*s;
  if(M==='flat')seg(c,mx-6*s,my,mx+6*s,my);
  else if(M==='smile'){c.beginPath();c.arc(mx,my-5*s,8*s,0.2*Math.PI,0.8*Math.PI);c.stroke();}
  else if(M==='frown'){c.beginPath();c.arc(mx,my+7*s,7*s,1.2*Math.PI,1.8*Math.PI);c.stroke();}
  else if(M==='o'){c.beginPath();c.ellipse(mx,my+1*s,4*s,5.5*s,0,0,TAU);c.fill();}
  else if(M==='scream'){c.beginPath();c.ellipse(mx,my+3*s,7.5*s,10*s,0,0,TAU);c.fill();c.fillStyle='#c4404a';c.beginPath();c.ellipse(mx,my+8*s,4.5*s,3*s,0,0,TAU);c.fill();c.fillStyle='#fff';c.fillRect(mx-5*s,my-6*s,10*s,2.6*s);}
  else if(M==='teeth'){c.fillStyle='#fff';c.lineWidth=2.4*s;rr(c,mx-9*s,my-4*s,18*s,9*s,2*s);c.fill();c.stroke();seg(c,mx-9*s,my+0.5*s,mx+9*s,my+0.5*s);for(const k of [-4,0,4])seg(c,mx+k*s,my-4*s,mx+k*s,my+5*s);}
  else if(M==='smirk'){c.beginPath();c.moveTo(mx-7*s,my+1*s);c.quadraticCurveTo(mx+2*s,my+4*s,mx+8*s*f,my-4*s);c.stroke();}
  else if(M==='wobble'){c.beginPath();for(let k=0;k<=6;k++){const x=mx-8*s+k*16*s/6;c.lineTo(x,my+Math.sin(k*2+t*20)*1.5*s);}c.stroke();}
  else if(M==='gulp'){c.beginPath();c.ellipse(mx,my+1*s,3*s,2.4*s,0,0,TAU);c.fill();}
  if(o.stache||o.kind==='bobby'){c.save();c.translate(0,-3*s);c.fillStyle='#1a1210';c.beginPath();c.moveTo(mx,my-6*s);c.quadraticCurveTo(mx-8*s,my-9*s,mx-14*s,my-2*s);c.quadraticCurveTo(mx-8*s,my-3*s,mx,my-3*s);c.quadraticCurveTo(mx+8*s,my-3*s,mx+14*s,my-2*s);c.quadraticCurveTo(mx+8*s,my-9*s,mx,my-6*s);c.fill();c.fillStyle='rgba(255,220,180,0.3)';c.fillRect(mx-6*s+L2.dx*3*s,my-7*s,5*s,1.2*s);c.restore();}
  if(o.sweat){const st=(t*1.4)%1;c.fillStyle='#a8dcff';c.strokeStyle=K2;c.lineWidth=1.8*s;const sx=-f*(R+1*s),sy=-10*s+st*18*s;c.beginPath();c.moveTo(sx,sy-9*s);c.quadraticCurveTo(sx+6*s,sy+2*s,sx,sy+5*s);c.quadraticCurveTo(sx-6*s,sy+2*s,sx,sy-9*s);c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(sx-1.5*s,sy-1*s,1.4*s,0,TAU);c.fill();}
  if(o.tear){const st=(t*0.9)%1;c.fillStyle='#a8dcff';c.beginPath();c.ellipse(ex[0]-1*s,ey+7*s+st*16*s,2.4*s,3.6*s,0,0,TAU);c.fill();c.strokeStyle='rgba(168,220,255,0.7)';c.lineWidth=2*s;seg(c,ex[0]-1*s,ey+6*s,ex[0]-1*s,ey+6*s+st*16*s);}
}
function hat2b(c,h,s,f,R,t){
  if(h==='helmet'){const g=c.createRadialGradient(L2.dx*R*0.35,-R*1.4,R*0.1,0,-R*1.0,R*1.3);g.addColorStop(0,'#5a6c98');g.addColorStop(0.5,'#1f2c4c');g.addColorStop(1,'#0c1222');
    c.beginPath();c.moveTo(-R-4*s,-R*0.25);c.quadraticCurveTo(-R-2*s,-R*1.9,0,-R*2.05);c.quadraticCurveTo(R+2*s,-R*1.9,R+4*s,-R*0.25);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle=K2;c.lineWidth=4.5*s;c.stroke();rim2(c,s,4);
    c.fillStyle='#16203a';c.fillRect(-R-8*s,-R*0.4,2*R+16*s,7*s);c.strokeRect(-R-8*s,-R*0.4,2*R+16*s,7*s);
    const sg=c.createRadialGradient(f*4*s+L2.dx*2*s,-R*1.08,0,f*4*s,-R*1.05,11*s);sg.addColorStop(0,'#ffffff');sg.addColorStop(1,'#8a92a8');c.fillStyle=sg;c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?5*s:10.5*s;c.lineTo(f*4*s+Math.cos(a)*r,-R*1.05+Math.sin(a)*r);}c.closePath();c.fill();
    c.fillStyle='#16203a';c.beginPath();c.arc(0,-R*2.02,5*s,0,TAU);c.fill();}
  if(h==='cap'){const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(L2.dx>0?0:1,'#2e2a24');g.addColorStop(L2.dx>0?1:0,'#7a7266');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;
    c.beginPath();c.ellipse(f*4*s,-R*0.62,R+6*s,R*0.6,0,Math.PI*0.95,TAU*1.02);c.fill();c.stroke();c.beginPath();c.ellipse(f*R*0.6,-R*0.5,R*0.72,R*0.17,0,0,TAU);c.fill();c.stroke();}
}
// the Ripper, upgraded: coat folds, rim light from lamp, layered cape
function ripper2(c,o){
  const s=o.s||1,f=o.f||1,t=o.t??0,a=o.a??1;if(a<=0.01)return;c.save();c.globalAlpha*=a;
  const col='#060607',rim=L2.rim,walk=o.walk||0,ph=o.ph||0;const hipY=o.y-118*s;
  c.fillStyle='rgba(0,0,0,0.45)';c.beginPath();c.ellipse(o.x,o.y+2*s,80*s,14*s,0,0,TAU);c.fill();
  const fl=p=>({x:o.x+Math.sin(p)*38*s*walk+6*s*f,y:o.y-Math.max(0,Math.cos(p))*16*s*walk});
  for(const F of [fl(ph+Math.PI),fl(ph)]){c.strokeStyle=col;c.lineWidth=15*s;c.lineCap='round';c.beginPath();c.moveTo(o.x,hipY);c.quadraticCurveTo((o.x+F.x)/2+12*s*f,(hipY+F.y)/2,F.x,F.y-6*s);c.stroke();c.strokeStyle=rim;c.lineWidth=2*s;c.globalAlpha=0.6*a;c.beginPath();c.moveTo(o.x+L2.dx*7*s,hipY);c.quadraticCurveTo((o.x+F.x)/2+12*s*f+L2.dx*7*s,(hipY+F.y)/2,F.x+L2.dx*7*s,F.y-6*s);c.stroke();c.globalAlpha=a;
    c.fillStyle='#0c0c0e';c.beginPath();c.ellipse(F.x+8*s*f,F.y-6*s,17*s,8*s,0,0,TAU);c.fill();c.fillStyle='rgba(255,200,150,0.3)';c.beginPath();c.ellipse(F.x+8*s*f+L2.dx*6*s,F.y-10*s,6*s,2*s,0,0,TAU);c.fill();}
  const flap=Math.sin(t*3.1)*8*s,shY=o.y-252*s+Math.sin(t*2.2)*2*s;
  const coat=()=>{c.beginPath();c.moveTo(o.x-30*s,shY);c.lineTo(o.x+30*s,shY);c.lineTo(o.x+54*s+flap*0.5,o.y-70*s);c.quadraticCurveTo(o.x,o.y-56*s,o.x-58*s-flap,o.y-66*s);c.closePath();};
  coat();const g=c.createLinearGradient(o.x-60*s*L2.dx,0,o.x+60*s*L2.dx,0);g.addColorStop(0,'#030304');g.addColorStop(0.7,'#141418');g.addColorStop(1,'#26262c');c.fillStyle=g;c.fill();
  c.save();coat();c.clip();c.strokeStyle='rgba(255,255,255,0.07)';c.lineWidth=4*s;for(const k of [-30,-10,12,32]){c.beginPath();c.moveTo(o.x+k*0.4*s,shY+90*s);c.quadraticCurveTo(o.x+k*0.8*s+flap*0.3,o.y-120*s,o.x+k*s,o.y-66*s);c.stroke();}c.restore();
  coat();c.strokeStyle=rim;c.lineWidth=3*s;c.save();c.clip();c.translate(-L2.dx*4*s,0);coat();c.stroke();c.restore();
  const cape=()=>{c.beginPath();c.moveTo(o.x-26*s,shY-6*s);c.quadraticCurveTo(o.x-80*s-flap,shY+50*s,o.x-76*s-flap,shY+98*s);c.quadraticCurveTo(o.x,shY+110*s,o.x+76*s-flap*0.4,shY+94*s);c.quadraticCurveTo(o.x+80*s,shY+40*s,o.x+26*s,shY-6*s);c.closePath();};
  cape();const g2=c.createLinearGradient(o.x-80*s*L2.dx,0,o.x+80*s*L2.dx,0);g2.addColorStop(0,'#020203');g2.addColorStop(0.75,'#18181c');g2.addColorStop(1,'#2c2c32');c.fillStyle=g2;c.fill();
  c.save();cape();c.clip();c.translate(-L2.dx*4*s,0);cape();c.strokeStyle=rim;c.lineWidth=3*s;c.stroke();c.restore();
  const hy=shY-32*s;c.fillStyle='#08080a';c.beginPath();c.arc(o.x+4*s*f,hy,25*s,0,TAU);c.fill();c.fillRect(o.x-12*s,hy+10*s,24*s,30*s);
  c.strokeStyle=rim;c.lineWidth=2.4*s;c.beginPath();c.arc(o.x+4*s*f,hy,23*s,L2.dx>0?-0.9:Math.PI-0.5,L2.dx>0?0.5:Math.PI+0.9);c.stroke();
  const hg=c.createLinearGradient(o.x-40*s*L2.dx,0,o.x+40*s*L2.dx,0);hg.addColorStop(0,'#040405');hg.addColorStop(1,'#2a2a30');
  c.fillStyle=hg;c.beginPath();c.ellipse(o.x+4*s*f,hy-20*s,60*s,10*s,0,0,TAU);c.fill();c.beginPath();c.moveTo(o.x-28*s,hy-22*s);c.lineTo(o.x-31*s,hy-92*s);c.lineTo(o.x+39*s,hy-92*s);c.lineTo(o.x+36*s,hy-22*s);c.closePath();c.fill();
  c.strokeStyle=rim;c.lineWidth=2.4*s;seg(c,L2.dx>0?o.x+37*s:o.x-29*s,hy-90*s,L2.dx>0?o.x+35*s:o.x-27*s,hy-24*s);
  c.fillStyle='#3a0a0e';c.fillRect(o.x-29*s,hy-38*s,66*s,9*s);
  const gl=o.glint??0.6;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<2;i++){const ex=o.x+f*(6+i*16)*s,ey=hy+2*s;c.fillStyle=`rgba(255,240,200,${gl})`;c.beginPath();c.arc(ex,ey,3.2*s,0,TAU);c.fill();
    if(gl>0.6){const Lg=(14+gl*26)*s;c.fillStyle=`rgba(255,230,180,${(gl-0.6)*2})`;c.beginPath();c.moveTo(ex-Lg,ey);c.lineTo(ex,ey-2.5*s);c.lineTo(ex+Lg,ey);c.lineTo(ex,ey+2.5*s);c.closePath();c.fill();}}c.restore();
  c.restore();
}
function lanternProp(on=1,sw=0){return (c,h,s)=>{c.save();c.translate(h.x,h.y);c.rotate(sw);c.strokeStyle=K2;c.lineWidth=3*s;seg(c,0,0,0,18*s);c.fillStyle='#1a1a16';c.fillRect(-15*s,18*s,30*s,6*s);c.fillRect(-15*s,62*s,30*s,7*s);
  const g=c.createLinearGradient(0,24*s,0,62*s);g.addColorStop(0,'#fff2c0');g.addColorStop(1,'#ffb050');c.fillStyle=g;c.fillRect(-12*s,24*s,24*s,38*s);c.strokeStyle='#1a1a16';c.lineWidth=3*s;c.strokeRect(-12*s,24*s,24*s,38*s);c.restore();
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(h.x,h.y+42*s,0,h.x,h.y+42*s,240*s);gg.addColorStop(0,'rgba(255,200,110,0.45)');gg.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=gg;c.fillRect(h.x-240*s,h.y-200*s,480*s,480*s);c.restore();};}
