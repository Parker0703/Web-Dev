'use strict';
// ===================== Randy Gardner: 11 days awake · Style 5 =====================
// ---------- icons / graphics ----------
function dayChip(c,x,y,n,k=1,o={}){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(o.rot??-0.05);c.fillStyle='#fbf6ea';c.strokeStyle=OL;c.lineWidth=6;rr(c,-80,-80,160,170,16);c.fill();c.stroke();
  c.fillStyle='#d63a2a';rr(c,-80,-80,160,48,16);c.fill();c.fillRect(-80,-50,160,18);c.stroke();for(const sd of [-1,1]){c.fillStyle='#3a3a42';c.beginPath();c.arc(sd*40,-80,9,0,TAU);c.fill();}
  txt(c,'DAY',0,-54,26,'#fff',{stroke:false,ls:4});txt(c,String(n),0,30,96,'#1a1a22',{stroke:false});c.restore();}
function clockIco(c,x,y,r,h,m,k=1,o={}){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle=o.fill||'#fbf6ea';c.strokeStyle=OL;c.lineWidth=r*0.08;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();
  for(let i=0;i<12;i++){const a=i/12*TAU;c.lineWidth=r*0.05;c.beginPath();c.moveTo(Math.cos(a)*r*0.78,Math.sin(a)*r*0.78);c.lineTo(Math.cos(a)*r*0.9,Math.sin(a)*r*0.9);c.stroke();}
  c.lineCap='round';const ah=(h%12+m/60)/12*TAU-Math.PI/2,am=m/60*TAU-Math.PI/2;c.lineWidth=r*0.1;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(ah)*r*0.5,Math.sin(ah)*r*0.5);c.stroke();c.lineWidth=r*0.06;c.strokeStyle='#d63a2a';c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(am)*r*0.75,Math.sin(am)*r*0.75);c.stroke();
  c.fillStyle=OL;c.beginPath();c.arc(0,0,r*0.08,0,TAU);c.fill();c.restore();}
function battery(c,x,y,s,v,t){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(16,16,28,0.9)';c.strokeStyle='#fff';c.lineWidth=10;rr(c,-120,-60,230,120,18);c.fill();c.stroke();c.fillStyle='#fff';rr(c,112,-24,20,48,6);c.fill();
  const col=v>0.5?'#3ad28a':v>0.2?'#ffd060':'#ff3b30';const blink=v<0.2?(Math.sin(t*14)>0?1:0.35):1;c.globalAlpha=blink;c.fillStyle=col;rr(c,-104,-44,Math.max(14,198*v),88,10);c.fill();c.restore();}
function zzz(c,x,y,t,s=1,a=1){if(a<=0)return;for(let i=0;i<3;i++){const p=((t*0.7+i/3)%1);c.save();c.globalAlpha=a*Math.sin(p*Math.PI);c.translate(x+p*90*s+Math.sin(t*3+i)*10*s,y-p*170*s);c.rotate(-0.2);txt(c,'z',0,0,(40+p*50)*s,'#cfe0ff',{sw:8*s});c.restore();}}
function notes(c,x,y,t,s=1,a=1){for(let i=0;i<4;i++){const p=((t*0.6+i/4)%1);c.save();c.globalAlpha=a*Math.sin(p*Math.PI);c.translate(x+Math.sin(p*6+i)*50*s+(i-1.5)*40*s,y-p*260*s);c.rotate(Math.sin(t*4+i)*0.3);c.fillStyle=['#ffd060','#ff7aa8','#8ad8ff','#a8ff8a'][i];c.strokeStyle=OL;c.lineWidth=4*s;
  c.beginPath();c.ellipse(0,0,16*s,12*s,-0.4,0,TAU);c.fill();c.stroke();c.fillRect(12*s,-60*s,6*s,60*s);c.strokeRect(12*s,-60*s,6*s,60*s);if(i%2){c.beginPath();c.moveTo(18*s,-60*s);c.quadraticCurveTo(40*s,-50*s,34*s,-28*s);c.stroke();}c.restore();}}
function trophy(c,x,y,s,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.fillStyle='#ffd040';c.strokeStyle=OL;c.lineWidth=7;c.beginPath();c.moveTo(-70,-90);c.lineTo(70,-90);c.quadraticCurveTo(70,20,0,30);c.quadraticCurveTo(-70,20,-70,-90);c.closePath();c.fill();c.stroke();
  for(const sd of [-1,1]){c.beginPath();c.arc(sd*72,-50,30,sd>0?-1.6:1.6-Math.PI,sd>0?1.6:Math.PI+1.6-Math.PI*2+Math.PI*2,sd<0);c.stroke();}
  c.fillRect(-14,30,28,40);c.strokeRect(-14,30,28,40);c.fillStyle='#8a5a2a';rr(c,-60,70,120,36,6);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.5)';c.beginPath();c.ellipse(-34,-60,10,30,0.2,0,TAU);c.fill();
  c.fillStyle='#fff';star(c,0,-40,26);c.restore();}
function star(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r*0.45:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}c.closePath();c.fill();}
function coin(c,x,y,r,ph){const sx=Math.cos(ph);c.save();c.translate(x,y);c.scale(Math.max(0.08,Math.abs(sx)),1);c.fillStyle=sx>0?'#e8c050':'#c89a30';c.strokeStyle=OL;c.lineWidth=4/Math.max(0.2,Math.abs(sx));c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();
  c.strokeStyle='rgba(120,80,10,0.6)';c.lineWidth=3;c.beginPath();c.arc(0,0,r*0.72,0,TAU);c.stroke();c.restore();}
function thought(c,x,y,w,h,k,ax,ay,draw){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<10;i++){const a=i/10*TAU;c.moveTo(Math.cos(a)*w*0.42+w*0.16,Math.sin(a)*h*0.4);c.arc(Math.cos(a)*w*0.38,Math.sin(a)*h*0.36,Math.min(w,h)*0.22,0,TAU);}c.fill();c.stroke();
  c.beginPath();c.ellipse(0,0,w*0.42,h*0.4,0,0,TAU);c.fill();for(let i=0;i<2;i++){const px=lerp(0,ax-x,0.62+i*0.2),py=lerp(h*0.4,ay-y,0.5+i*0.25);c.beginPath();c.arc(px,py,16-i*6,0,TAU);c.fill();c.stroke();}if(draw)draw(c);c.restore();}
function flashBulbs(c,t,n=10,a=1){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const ph=(t*1.3+hash(i*3.7))%1;if(ph>0.08)continue;const x=hash(i*5.1)*1080,y=760+hash(i*2.9)*500;const k=1-ph/0.08;glow(c,x,y,120*k,'255,255,240',0.9*k*a);c.fillStyle=`rgba(255,255,255,${k*a})`;star(c,x,y,26*k);}c.restore();}
function confetti(c,t,t0,n=50){if(t<t0)return;const p=t-t0;c.save();for(let i=0;i<n;i++){const x=hash(i)*1180-50+Math.sin(p*2+i)*40,y=-60+((p*(260+hash(i*3)*300)+hash(i*7)*400)%2100);c.save();c.translate(x,y);c.rotate(p*4+i);c.fillStyle=['#ffd040','#5aa8e8','#fff','#ff5a5a'][i%4];c.fillRect(-9,-5,18,10);c.restore();}c.restore();}
function spotCone(c,x,y,w,a){c.save();c.globalCompositeOperation='lighter';const g2=c.createLinearGradient(x,0,x,y);g2.addColorStop(0,`rgba(255,250,220,${0.0})`);g2.addColorStop(1,`rgba(255,250,220,${0.28*a})`);c.fillStyle=g2;c.beginPath();c.moveTo(x-60,0);c.lineTo(x+60,0);c.lineTo(x+w,y);c.lineTo(x-w,y);c.closePath();c.fill();
  const g3=c.createRadialGradient(x,y,0,x,y,w);g3.addColorStop(0,`rgba(255,250,220,${0.35*a})`);g3.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=g3;c.save();c.scale(1,0.25);c.beginPath();c.arc(x,y*4,w,0,TAU);c.fill();c.restore();c.restore();}
function palm(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#8a5a2a';c.lineWidth=22;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(30,-140,10,-280);c.stroke();c.fillStyle='#2f9a5a';c.strokeStyle=OL;c.lineWidth=5;
  for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*0.55;c.save();c.translate(10,-280);c.rotate(a+Math.PI/2);c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(60,-30,140,20);c.quadraticCurveTo(60,0,0,0);c.fill();c.stroke();c.restore();}c.restore();}
function silhouetteBig(c,x,y,s,a){c.save();c.globalAlpha=a;c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(90,168,232,0.25)';c.strokeStyle='rgba(140,200,255,0.9)';c.lineWidth=6;c.setLineDash([16,12]);c.beginPath();c.arc(0,-330,46,0,TAU);c.moveTo(-150,-250);c.quadraticCurveTo(0,-290,150,-250);c.lineTo(120,-60);c.lineTo(60,-40);c.lineTo(70,120);c.lineTo(20,120);c.lineTo(0,-10);c.lineTo(-20,120);c.lineTo(-70,120);c.lineTo(-60,-40);c.lineTo(-120,-60);c.closePath();c.fill();c.stroke();c.setLineDash([]);c.restore();}
function vsArrows(c,x1,y1,x2,y2,a){c.save();c.globalAlpha=a;c.strokeStyle='#ffd060';c.lineWidth=6;c.setLineDash([10,10]);c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);c.restore();}
function bigX(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.lineCap='round';c.strokeStyle=OL;c.lineWidth=r*0.42;c.beginPath();c.moveTo(-r,-r);c.lineTo(r,r);c.moveTo(r,-r);c.lineTo(-r,r);c.stroke();c.strokeStyle='#ff3b30';c.lineWidth=r*0.28;c.stroke();c.restore();}
function tangle(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#1a1a22';c.lineWidth=7;c.lineCap='round';c.beginPath();for(let i=0;i<=60;i++){const a=i/60*TAU*3;const q=i/60;c.lineTo(-110+q*220+Math.cos(a+t*2)*26,Math.sin(a*1.3+t*2)*30);}c.stroke();c.restore();}
function stormCloud(c,x,y,s,t){c.save();c.translate(x,y+Math.sin(t*3)*6);c.scale(s,s);c.fillStyle='#4a4e62';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(const [a,b,r] of [[-70,10,46],[-20,-20,60],[40,-6,52],[80,14,38],[0,20,50]])c.moveTo(a+r,b),c.arc(a,b,r,0,TAU);c.fill();c.stroke();c.fillStyle='#4a4e62';c.fillRect(-100,10,190,40);
  if(Math.sin(t*5)>0.3){c.fillStyle='#ffd040';c.beginPath();c.moveTo(0,40);c.lineTo(-24,100);c.lineTo(0,96);c.lineTo(-14,150);c.lineTo(30,80);c.lineTo(6,84);c.lineTo(20,40);c.closePath();c.fill();c.stroke();}
  c.strokeStyle='rgba(150,180,255,0.8)';c.lineWidth=4;for(let i=0;i<5;i++){const yy=((t*300+i*40)%90);c.beginPath();c.moveTo(-70+i*35,50+yy);c.lineTo(-76+i*35,64+yy);c.stroke();}c.restore();}
function eyeIco(c,x,y,r,open){c.save();c.translate(x,y);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=r*0.1;c.beginPath();c.moveTo(-r,0);c.quadraticCurveTo(0,-r*open*1.1,r,0);c.quadraticCurveTo(0,r*open*1.1,-r,0);c.closePath();c.fill();c.stroke();
  if(open>0.2){c.save();c.clip();c.fillStyle='#3a6ab0';c.beginPath();c.arc(0,0,r*0.45,0,TAU);c.fill();c.fillStyle=OL;c.beginPath();c.arc(0,0,r*0.22,0,TAU);c.fill();c.restore();}else{c.beginPath();c.moveTo(-r,0);c.quadraticCurveTo(0,r*0.4,r,0);c.stroke();for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*r*0.35,r*0.22);c.lineTo(i*r*0.4,r*0.42);c.stroke();}}c.restore();}
function rgBG(c,t,o={}){gfxBG(c,t,{plate:o.plate||'den_wide'});}
const TIRED=t=>clamp((t-4)/60*0.9+0.15);
const BOARD=[[1.2,2.3,0,0.765,-1.32,-0.58],[1.33,2.17,0.74,1.28,-1.26,-1.17]];
const SOFA=[[-1.05,1.25,0,0.62,-2.27,-1.45]],CT=[[-0.5,0.7,0.0,0.41,-1.05,-0.45]];
function bedSit(c,kind,o){const base=Object.assign({kn:1,crouch:46,view:'front'},o);const tk=o.tuck||0;let dyT=0;const pil=pp([0,0.74,-1.76]);
  if(tk>0){const rs=who(_scr,kind,[0.0,0.42,-1.6],Object.assign({},base,{tuck:0}));if(rs)dyT=tk*(pil.y+8-rs.hc.y);
    c.save();c.globalAlpha=Math.min(1,tk*2);c.fillStyle='#f4f2fa';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(pil.x,pil.y+10,190*pil.s/3,62*pil.s/3,0,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(150,140,190,0.35)';c.beginPath();c.ellipse(pil.x,pil.y+30,150*pil.s/3,30*pil.s/3,0,0,TAU);c.fill();c.restore();}
  const r=who(c,kind,[0.0,0.42,-1.6],Object.assign({},base,{dy:(o.dy||0)+dyT}));const P=(x,z,y=0.7)=>pp([x,y,z]);const zt=-1.62;
  const PT=(x)=>{const q=pp([x,0.86,zt]);if(tk>0&&r)q.y=lerp(q.y,r.hc.y+82*r.s,tk);return q;};
  c.save();c.lineJoin='round';const a=PT(-0.95),b=PT(0.95),cc=P(0.97,0.2,0.5),d=P(-0.97,0.2,0.5),e=P(0.97,0.2,0.18),f=P(-0.97,0.2,0.18);
  const edge=()=>{c.moveTo(a.x,a.y);for(let i=1;i<=8;i++){const q=PT(lerp(-0.95,0.95,i/8));c.quadraticCurveTo(q.x-(b.x-a.x)/16,q.y-14,q.x,q.y);}};
  c.fillStyle='#5a6ab8';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();edge();c.lineTo(cc.x,cc.y);c.lineTo(e.x,e.y);c.lineTo(f.x,f.y);c.lineTo(d.x,d.y);c.closePath();c.fill();c.stroke();
  if(tk>0.5&&r){c.fillStyle="rgba(30,30,80,0.12)";c.beginPath();c.ellipse(r.hc.x,r.hc.y+300*r.s/3,190*r.s/3,300*r.s/3,0,0,TAU);c.fill();c.fillStyle='rgba(255,255,255,0.1)';c.beginPath();c.ellipse(r.hc.x-30,r.hc.y+200*r.s/3,90*r.s/3,220*r.s/3,0,0,TAU);c.fill();}
  c.fillStyle='rgba(255,255,255,0.14)';for(let i=0;i<5;i++){const q=P(-0.7+i*0.35,-0.5);c.beginPath();c.ellipse(q.x,q.y,60,16,0,0,TAU);c.fill();}
  const b2y=(x)=>{const q=PT(x);return q.y+22;};c.fillStyle='#e8ecf8';c.beginPath();edge();c.lineTo(b.x,b2y(0.95));c.lineTo(a.x,b2y(-0.95));c.closePath();c.fill();c.stroke();c.restore();
  if(r&&o.handsOver&&tk<=0){fist2(c,r.hf,r.s,KIND2[kind].coat);fist2(c,r.hb,r.s,KIND2[kind].coat);}return r;}
// ================= SHOTS =================
const S={};
// hook: on the couch, eyes wide, day calendar flips 1 → 11, clock spins
S.hook=(c,t,u,d)=>{cam(c,'den_sofa',{z:K3(u,d,1.04,1.14),y:K3(u,d,1000,960)});const n=1+Math.floor(clamp((t-1.6)/2.6)*10);const tw=Math.sin(t*23)>0.85;
  const r=sitAt(c,'randy',[0.1,0,-1.62],X(tw?'shock':'wide','up',n>6?'wobble':'flat',{view:'front',hf:[18,78],hb:[-18,78],bags:clamp((n-1)/10),sweat:n>7?1:0,tilt:Math.sin(t*2)*0.03}));occ(c,CT);c.restore();
  dayChip(c,850,1560,n,popK(t,0.4)*(1+0.12*Math.max(0,Math.sin((t-1.6)*TAU/0.26))*(t>1.6&&t<4.2)));const hh=t*3.2;clockIco(c,230,1560,110,Math.floor(hh)%12,(hh%1)*60,popK(t,0.6));grade(c,{v:0.4});};
// day 4 delusion: stadium, jersey, helmet, crowd flashes
S.star=(c,t,u,d)=>{const t0=S.star.t0,tc=wt('convinced',t0),tf=wt('football',t0);cam(c,'st_hero',{z:K3(u,d,1.05,1.14),y:1000});spotCone(c,540,1500,330,1);flashBulbs(c,t,14);const up=ON(t,tc-0.2,0.35);
  const r=who(c,'jersey',[0,0,2.0],X(t>tf?'happy':'focus',t>tf?'up':'flat',t>tf?'grin':'smirk',{view:'front',hf:[lerp(3,30,up),lerp(40,-118,up)],hb:[-6,lerp(40,58,up)],tilt:-0.05*up,blushK:1,stance:16}));
  if(r){helmet(c,r);jerseyNum(c,r);football(c,r.hf.x+6,r.hf.y-30,r.s/3.4*1.25,-0.5+Math.sin(t*3)*0.1);if(t>tf-0.1)starBurst(c,r.hf.x+80,r.hf.y-120,50,popK(t,tf-0.1)*clamp(1-(t-tf)));}
  c.restore();confetti(c,t,tf-0.1);dayChip(c,170,1660,4,popK(t,wt('day',t0)-0.05));grade(c,{tint:'rgba(80,140,255,0.15)',v:0.4});};
// record scratch: back in the den — friends deadpan
S.scratch=(c,t,u,d)=>{const t0=S.scratch.t0,tw=wt("wasn't",t0);cam(c,'den_table',{z:K3(u,d,1.06,1.1),y:1000,sx:t<t0+0.15?Math.sin(t*90)*14:0});
  who(c,'bruce',[1.85,0,-1.75],X('half','flat','flat',{f:-1,view:'front',hf:[3,40],hb:[-3,40]}));occ(c,BOARD);cast(c,[['joe',[2.2,0,-0.25],X('half','up','flat',{f:-1,view:'3q',hf:[-10,84],hb:[16,84],sweat:t>tw?1:0})]]);
  const r=who(c,'randy',[0.85,0,-0.45],X('happy','up','grin',{f:1,view:'3q',hf:[24,-118],hb:[-20,40],bags:0.45,tilt:-0.06}));if(r){football(c,r.hf.x+4,r.hf.y-28,r.s/3.4*1.25,-0.5);}c.restore();
  if(t>tw-0.05){const k=popK(t,tw-0.05);c.save();c.translate(1000,760);c.scale(k,k);txt(c,'?',0,0,120,'#ffd060',{sw:18});c.restore();}grade(c,{v:0.38});};
// what happens to a brain that never sleeps
S.brain=(c,t,u,d)=>{const t0=S.brain.t0,tn=wt('never',t0);rgBG(c,t);const k=popK(t,t0+0.9);const dr=t>tn-0.1;
  brainFace(c,520,1000,360*k,{eyes:dr?'half':'dot',mouth:dr?'flat':'smile',brow:dr?'angry':null});const v=t<t0+1?1:lerp(1,0.08,ON(t,t0+1,tn-t0-0.6));battery(c,540,1560,1.4*popK(t,t0+1.1),v,t);
  noSign(c,830,760,90*popK(t,tn-0.05),(q,R)=>{txt(q,'Zz',0,6,R*0.9,'#cfe0ff',{stroke:false});});};
// San Diego 1963 postcard
S.sd=(c,t,u,d)=>{const t0=S.sd.t0,ty=wt('1963',t0);rgBG(c,t);const k=popK(t,t0+0.05);c.save();c.translate(540,900);c.scale(k,k);c.rotate(-0.04);
  c.fillStyle='#fbf3e0';c.strokeStyle=OL;c.lineWidth=8;rr(c,-400,-300,800,600,24);c.fill();c.stroke();c.save();rr(c,-370,-270,740,540,14);c.clip();const g2=c.createLinearGradient(0,-270,0,270);g2.addColorStop(0,'#ff9a5a');g2.addColorStop(0.55,'#ffd08a');g2.addColorStop(0.56,'#3a8ad8');g2.addColorStop(1,'#2a5ab0');c.fillStyle=g2;c.fillRect(-370,-270,740,540);
  c.fillStyle='#fff3c0';c.beginPath();c.arc(120,10,90,Math.PI,0);c.fill();c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=6;for(let i=0;i<4;i++){c.beginPath();for(let x=-370;x<=370;x+=20)c.lineTo(x,80+i*45+Math.sin(x*0.04+t*3+i)*8);c.stroke();}
  palm(c,-230,270,1.0);palm(c,-120,270,0.7);c.fillStyle='#e8c890';c.beginPath();c.moveTo(-370,270);c.quadraticCurveTo(-200,180,0,270);c.fill();c.restore();txt(c,'SAN DIEGO',0,-200,86,'#fff',{sw:16,ls:6});c.restore();
  const k2=popK(t,ty-0.05);c.save();c.translate(800,1330);c.scale(k2,k2);c.rotate(0.08);c.fillStyle='#fbf6ea';c.strokeStyle=OL;c.lineWidth=6;rr(c,-150,-90,300,180,14);c.fill();c.stroke();c.fillStyle='#d63a2a';rr(c,-150,-90,300,44,14);c.fill();txt(c,'1963',0,22,96,'#1a1a22',{stroke:false});c.restore();};
// three friends, science fair, trophy dream
S.friends=(c,t,u,d)=>{const t0=S.friends.t0,tw=wt('win',t0),tsf=wt('science',t0);cam(c,'den_table',{z:K3(u,d,1.04,1.1),y:1000});
  who(c,'bruce',[1.85,0,-1.75],X('dot','flat',t>tw?'grin':'smile',{f:1,view:'front',hf:t>tw?[30,-100]:[3,40],hb:t>tw?[-30,-100]:[-3,40]}));occ(c,BOARD);cast(c,[['randy',[0.85,0,-0.45],X('dot','up','grin',{f:1,view:'3q',hf:[40,30],hb:[-6,52],bags:0})],['joe',[2.2,0,-0.25],X(t>tw?'happy':'dot','up',t>tw?'grin':'smile',{f:-1,view:'3q',hf:t>tw?[-10,-110]:[-10,84],hb:[16,84]})]]);c.restore();
  if(t>tsf-0.1){const g=0.5+0.5*Math.sin(t*5);glow(c,640,1040,220,'255,230,140',0.25*g*ON(t,tsf-0.1,0.3));}
  thought(c,700,520,300,220,popK(t,tw-0.1),900,720,(q)=>{trophy(q,0,10,0.75);});grade(c,{v:0.36});};
// the plan: one of three stays awake as long as possible
S.plan=(c,t,u,d)=>{const t0=S.plan.t0,to=wt('one',t0),ts=wt('stays',t0),tl=wt('long',t0);rgBG(c,t,{plate:'den_table'});const sel=t>to-0.05;
  const cols=['#b8482e','#3a8a5a','#6a4ab0'];for(let i=0;i<3;i++){const k=popK(t,t0+0.1+i*0.12);const x=260+i*280,y=700;const dim=sel&&i!==1;c.save();c.globalAlpha=dim?0.35:1;personIco(c,x,y,110*k*(sel&&i===1?1.15:1),cols[i]);c.restore();}
  if(sel){const k=popK(t,to-0.05);ring(c,540,620,170*k,0.9,'rgba(255,208,96,',10);}
  if(t>ts-0.05){const k=popK(t,ts-0.05);c.save();c.translate(540,1060);c.scale(k,k);panel(c,-230,-110,460,220,{r:40});eyeIco(c,-90,0,80,1);txt(c,'∞',100,6,150,'#ffd060',{stroke:false});c.restore();}
  if(t>tl-0.1){const p=ON(t,tl-0.1,ts+3.4-tl);c.save();c.translate(540,1400);panel(c,-400,-70,800,140,{r:40});clockIco(c,-320,0,48,Math.floor(p*30)%12,(p*720)%60);c.fillStyle='rgba(255,255,255,0.12)';rr(c,-240,-22,600,44,22);c.fill();const g2=c.createLinearGradient(-240,0,360,0);g2.addColorStop(0,'#3ad28a');g2.addColorStop(1,'#ff3b6a');c.fillStyle=g2;rr(c,-240,-22,Math.max(44,600*p),44,22);c.fill();c.restore();}};
// coin flip: Bruce flips, Randy loses
S.coin=(c,t,u,d)=>{const t0=S.coin.t0,tc=wt('coin',t0),tr=wt('randy',t0),tl=wt('lost',t0);cam(c,'den_wide',{z:K3(u,d,1.04,1.1),x:560,y:1000});const lost=t>tl-0.15;const p=clamp((t-tc+0.5)/1.25);
  const R=[['randy',[-0.6,0,-0.3],X(lost?'sad':(p>0&&p<1?'focus':'dot'),lost?'worried':'up',lost?'wobble':'flat',{f:1,view:'3q',hf:[10,lost?86:62],hb:[-6,lost?88:64],crouch:lost?14:0,bags:0,gloom:lost?1:0,sweat:p>0&&!lost?1:0})],
    ['bruce',[0.15,0,-0.4],X(lost?'happy':'dot',lost?'up':'flat',lost?'grin':'smile',{f:-1,view:'3q',hf:p<0.12?[-30,lerp(24,-10,ON(t,tc-0.6,0.15))]:lost?[-50,-60]:[-24,30],hb:[-6,lost?40:60]})],
    ['joe',[0.9,0,-0.4],X(lost?'happy':'focus','up',lost?'laugh':'o',{f:-1,view:'3q',hf:lost?[-40,10]:[-14,80],hb:lost?[10,30]:[14,80]})]];const out=cast(c,R);const B=out[1];
  if(B){const sx=B.hf.x,sy=B.hf.y-20;if(p>0&&p<1){const y=sy-Math.sin(p*Math.PI)*620;coin(c,lerp(sx,sx-60,p),y,26,p*40);}else if(p>=1){const L0=out[0];if(L0)coin(c,(L0.hf.x+sx)/2,sy+40,26,0);}}
  c.restore();grade(c,{v:0.4});};
// day 2: feeling a mystery object with eyes shut; day 3: grumpy storm cloud + tangled tongue twister
S.days=(c,t,u,d)=>{const t0=S.days.t0,t3=wt('day',t0+3),tt=wt('tongue',t0),ti=wt('impossible',t0),tto=wt('touching',t0);const d3=t>t3-0.1;cam(c,'den_sofa',{z:d3?K3(t-t3,4,1.12,1.18):K3(u,8,1.06,1.12),y:d3?900:980});
  const feel=Math.sin(t*6)*6;const r=sitAt(c,'randy',[0.1,0,-1.62],d3?X('glare','angry',t>tt-0.05?'wobble':'frown',{view:'front',hf:[22,40],hb:[-22,40],vein:1,bags:0.5,tilt:Math.sin(t*1.5)*0.03}):X(t>tto-0.1?'squeeze':'closed','worried','flat',{view:'front',hf:[-30+feel,44],hb:[30-feel,46],bags:0.35,tilt:0.08}));occ(c,CT);
  if(r&&!d3){c.save();c.translate((r.hf.x+r.hb.x)/2,(r.hf.y+r.hb.y)/2-12);c.rotate(Math.sin(t*2)*0.1);c.fillStyle='#ffd040';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,70*r.s/3.4,52*r.s/3.4,0,0,TAU);c.fill();c.stroke();c.beginPath();c.arc(26*r.s/3.4,-36*r.s/3.4,22*r.s/3.4,0,TAU);c.fill();c.stroke();c.fillStyle='#ff8a2a';c.beginPath();c.moveTo(44*r.s/3.4,-36*r.s/3.4);c.lineTo(62*r.s/3.4,-30*r.s/3.4);c.lineTo(44*r.s/3.4,-26*r.s/3.4);c.fill();c.restore();fist2(c,r.hf,r.s,KIND2.randy.coat);
    for(let i=0;i<3;i++){const k=popK(t,t0+0.8+i*0.25);c.save();c.translate(r.hc.x+(i-1)*120,r.hc.y-200-Math.abs(i-1)*-30);c.scale(k,k);txt(c,'?',0,Math.sin(t*4+i)*8,90,'#ffd060',{sw:16});c.restore();}}
  if(r&&d3){stormCloud(c,r.hc.x,r.hc.y-250*r.s/3.4,r.s/3.4*1.3,t);if(t>tt-0.05){const k=popK(t,tt-0.05);c.save();c.translate(800,1180);c.scale(k*1.5,k*1.5);speech(c,0,0,'          ',{size:80,tail:-1});tangle(c,0,-4,0.9,t);c.restore();bigX(c,800,1180,100,popK(t,ti-0.05));}}
  c.restore();dayChip(c,180,1640,d3?3:2,popK(t,d3?t3-0.05:t0));grade(c,{v:0.4,tint:d3?'rgba(60,70,120,0.18)':null});};
// Paul Lowe: running the field in the jersey
S.lowe=(c,t,u,d)=>{const t0=S.lowe.t0,tp=wt('paul',t0),tc=wt('chargers',t0);cam(c,'st_hero',{z:K3(u,d,1.04,1.1),y:1000});flashBulbs(c,t,16);const run=ON(t,t0+0.3,tc-t0-0.6);const posed=t>tc-0.3;
  const x=posed?0.1:lerp(-0.6,0.1,run);const r=who(c,'jersey',[x,0,2.0],X(posed?'happy':'focus',posed?'up':'flat',posed?'grin':'grit',posed?{view:'front',hf:[30,-118],hb:[-40,-110],tilt:-0.05,blushK:1}:{f:1,view:'3q',run:1,ph:t*11,lean:0.14,hf:[30,10],hb:[-20,30]}));
  if(r){helmet(c,r,{tilt:posed?0:0.1});if(posed)jerseyNum(c,r);football(c,r.hf.x+(posed?4:10),r.hf.y-(posed?28:4),r.s/3.4*1.25,posed?-0.5:0.2);}c.restore();
  if(t>tp-0.1){const k=popK(t,tp-0.1);c.save();c.translate(860,1680);c.scale(k*0.7,k*0.7);panel(c,-210,-120,420,240,{r:40,fill:'rgba(20,40,90,0.9)'});c.fillStyle='#5aa8e8';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-80,-80);c.lineTo(80,-80);c.lineTo(100,-40);c.lineTo(70,-30);c.lineTo(60,90);c.lineTo(-60,90);c.lineTo(-70,-30);c.lineTo(-100,-40);c.closePath();c.fill();c.stroke();txt(c,'23',0,14,90,'#fff',{sw:10});c.restore();}
  confetti(c,t,tc-0.2,60);dayChip(c,170,1660,4,popK(t,t0));grade(c,{tint:'rgba(80,140,255,0.15)',v:0.4});};
// he's not: skinny kid vs the real football player silhouette
S.skinny=(c,t,u,d)=>{const t0=S.skinny.t0,ts=wt('skinny',t0);cam(c,'den_wide',{z:K3(u,d,1.06,1.12),x:500,y:1000,sx:t<t0+0.15?Math.sin(t*90)*14:0});
  const p=pp([0.15,0,-0.4]);if(t>ts-0.1)silhouetteBig(c,p.x,p.y+10,p.s*0.95,ON(t,ts-0.1,0.3));const r=who(c,'randy',[0.15,0,-0.4],X(t>ts?'sad':'shock',t>ts?'worried':'up',t>ts?'wobble':'o',{f:1,view:'front',hf:[3,40],hb:[-3,40],bags:0.55,crouch:t>ts?8:0,sweat:1}));
  c.restore();grade(c,{v:0.4});};
// friends keep him awake: pinball, basketball, loud music
S.keep=(c,t,u,d)=>{const t0=S.keep.t0,tb=wt('basketball',t0),tp=wt('pinball',t0),tm=wt('music',t0);cam(c,'den_pin',{z:K3(u,d,1.04,1.1),y:1000});const bb=t>tb-0.15;
  const dr=Math.abs(Math.sin(t*6.5));const flip=Math.sin(t*9)>0;
  const L=cast(c,[['randy',[1.9,0,0.55],X(flip?'focus':'half','flat','grit',{f:1,view:'3q',hf:[52,52],hb:[40,56],lean:0.12,bags:0.6})],['joe',[0.95,0,0.45],X('dot','up','grin',{f:1,view:'3q',hf:bb?[30,lerp(40,70,dr)]:[10,80],hb:[-10,80],dy:bb?-dr*6:0})]]);
  const J=L[1];if(J&&bb){const by=lerp(J.hf.y+20,pp([0.95,0,0.45]).y-14,dr);c.save();c.fillStyle='#e8742a';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();const br=56*J.s/3.4;c.arc(J.hf.x+16,by,br,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(J.hf.x+16-br,by);c.lineTo(J.hf.x+16+br,by);c.moveTo(J.hf.x+16,by-br);c.lineTo(J.hf.x+16,by+br);c.stroke();c.restore();}
  const R0=L[0];if(R0&&t>tp-0.15){const g=0.5+0.5*Math.sin(t*12);glow(c,R0.hf.x+120,R0.hf.y-80,200,'255,90,200',0.35*g);sparks(c,R0.hf.x+120,R0.hf.y-40,((t-tp)*1.6)%1,10,Math.floor((t-tp)*1.6));}c.restore();
  if(t>tm-0.2){notes(c,540,1300,t,1.2,ON(t,tm-0.2,0.3));speaker(c,180,1580,80,false,popK(t,tm-0.2));}grade(c,{v:0.36});};
// a Stanford sleep scientist shows up to watch
S.dement=(c,t,u,d)=>{const t0=S.dement.t0,ts=wt('stanford',t0),tw=wt('watch',t0);cam(c,'den_wide',{z:K3(u,d,1.04,1.1),x:540,y:1000});const wk=ON(t,t0+0.1,1.6);const arrived=wk>=1;
  const Dm=who(c,'dement',[lerp(-1.4,-0.45,wk),0,-0.25],X('dot','up','smile',arrived?{f:1,view:'3q',hf:[40,36],hb:[-6,40]}:{f:1,view:'3q',...WK(t,6),hf:[30,40],hb:[-20,50]}));
  if(Dm){c.save();c.translate(Dm.hf.x+8,Dm.hf.y-20);c.rotate(-0.15);c.fillStyle='#a8784e';c.strokeStyle=OL;c.lineWidth=4;rr(c,-34*Dm.s/3,-46*Dm.s/3,68*Dm.s/3,92*Dm.s/3,6);c.fill();c.stroke();c.fillStyle='#fff';rr(c,-28*Dm.s/3,-38*Dm.s/3,56*Dm.s/3,78*Dm.s/3,4);c.fill();for(let i=0;i<4;i++){c.fillStyle='#8a8a9a';c.fillRect(-20*Dm.s/3,(-26+i*16)*Dm.s/3,40*Dm.s/3,4);}c.restore();fist2(c,Dm.hf,Dm.s,KIND2.dement.coat);}
  const r=who(c,'randy',[0.55,0,-0.45],X(t>tw-0.2?'half':'drunk','worried',t>tw-0.2?'smile':'o',{f:-1,view:'3q',hf:t>tw-0.2?[-30,-90+Math.sin(t*8)*10]:[-6,84],hb:[10,84],bags:0.7,tilt:-0.06}));c.restore();
  if(t>ts-0.1){const k=popK(t,ts-0.1);c.save();c.translate(230,1580);c.scale(k,k);panel(c,-130,-130,260,260,{r:40});brainIcon(c,0,10,80,{col:'#f6a6bf'});zzz(c,40,-30,t,0.6);c.restore();}grade(c,{v:0.38});};
// day 11: counting down by sevens, gets to 65 and loses the thread
S.count=(c,t,u,d)=>{const t0=S.count.t0,ta=wt('asked',t0),t100=wt('100',t0),ts=wt('sevens',t0),t65=wt('65',t0),tst=wt('stopped',t0),tf=wt('forgot',t0);cam(c,'den_sofa',{z:K3(u,d,1.06,1.16),y:960});
  const lostT=t>tst-0.1;const r=sitAt(c,'randy',[0.1,0,-1.62],X(lostT?(t>tf?'drunk':'dot'):'half',lostT?'worried':'flat',lostT?'o':'flat',{view:'front',hf:[18,78],hb:[-18,78],bags:1,sweat:lostT?1:0,tilt:lostT?Math.sin(t*1.2)*0.06:0.02}));occ(c,CT);c.restore();
  const NUM=['100','93','86','79','72','65'];const tt=[t100,ts-0.35,ts,lerp(ts,t65,0.33),lerp(ts,t65,0.66),t65];
  NUM.forEach((n,i)=>{const k=popK(t,tt[i]-0.05);if(k<=0)return;const fade=lostT?clamp(1-(t-tst)/0.6):1;const x=150+i*156,y=1520+(i%2)*80;c.save();c.globalAlpha=fade*(i===5?1:0.85);c.translate(x,y);c.scale(k,k);txt(c,n,0,0,i===5?110:84,i===5?'#ffd060':'#fff',{sw:16});c.restore();if(i<5&&t>tt[i+1]-0.05&&fade>0){c.save();c.globalAlpha=fade*0.7;txt(c,'−7',x+78,y-60,40,'#ff8a8a',{sw:8});c.restore();}});
  if(r&&lostT){const k=popK(t,tst-0.1);c.save();c.translate(r.hc.x+250,r.hc.y-150);c.scale(k,k);thought(c,0,0,220,170,1,-160,110,(q)=>{txt(q,'?',0,0,120,'#1a1a22',{stroke:false});});c.restore();
    if(t>tf-0.1){c.save();c.translate(r.hc.x-250,r.hc.y-140);c.rotate(t*6);c.strokeStyle='#fff';c.lineWidth=12;c.lineCap='round';for(let i=0;i<8;i++){c.globalAlpha=(i+1)/8*popK(t,tf-0.1);c.beginPath();c.moveTo(Math.cos(i/8*TAU)*26,Math.sin(i/8*TAU)*26);c.lineTo(Math.cos(i/8*TAU)*50,Math.sin(i/8*TAU)*50);c.stroke();}c.restore();}}
  dayChip(c,900,1500-(lostT?0:0),11,popK(t,t0)*(1-ON(t,t100-0.3,0.3)));if(t>ta-0.1){Dsmall(c,t);}grade(c,{v:0.42});};
function Dsmall(c,t){}
// 264 hours — world record
S.record=(c,t,u,d)=>{const t0=S.record.t0,th=wt('hours',t0),tw=wt('world',t0);rgBG(c,t);const v=Math.round(lerp(0,264,ON(t,t0+0.05,th-t0+0.1)));const k=popK(t,t0);
  c.save();c.translate(540,760);c.scale(k,k);panel(c,-380,-170,760,340,{r:50});clockIco(c,-230,0,110,Math.floor(t*6)%12,(t*360)%60);txt(c,String(v),110,-10,170,'#ffd060',{sw:20});txt(c,'HOURS',110,110,52,'#fff',{stroke:false,ls:8});c.restore();
  const kt=popK(t,tw-0.1);if(kt>0){glow(c,540,1360,320,'255,210,90',0.35*kt);trophy(c,540,1370,1.6,kt);for(let i=0;i<8;i++){const a=i/8*TAU+t;c.fillStyle='#ffd060';star(c,540+Math.cos(a)*300*kt,1340+Math.sin(a)*240*kt,20);}}};
// collapse on the couch, sleeps almost 15 hours
S.sleep=(c,t,u,d)=>{const t0=S.sleep.t0,ts=wt('slept',t0);cam(c,'den_sofa',{z:K3(u,d,1.08,1.16),y:1000});const fall=ON(t,ts-0.5,0.6);
  if(fall<1){const r=sitAt(c,'randy',[0.1,0,-1.62],X(t>ts-0.6?'sleep':'drunk','worried','o',{view:'front',hf:[18,78],hb:[-18,78],bags:1,tilt:fall*0.6,lean:fall*0.3,dx:-fall*60}));}
  else{const a=pp([0.75,0.62,-1.75]),b=pp([-0.6,0.62,-1.75]);lieAt(c,'randy',[0.75,0.6,-1.75],[-0.6,0.6,-1.75],X('sleep','flat','drool',{view:'front',hf:[-20,40],hb:[20,46],bags:0.8,kn:0}));}
  occ(c,CT);const zp=pp([0.75,1.0,-1.75]);c.restore();if(fall>=1)zzz(c,zp.x,zp.y-60,t,1.3);const h=lerp(0,15,ON(t,ts+0.2,1.6));clockIco(c,880,1560,110,Math.floor(h)%12,(h%1)*60,popK(t,ts));
  if(t>ts+0.2){txt(c,Math.round(h)+'h',880,1720,64,'#ffd060',{sw:12});}grade(c,{v:0.45,tint:'rgba(40,40,120,0.25)'});};
// creepy part: microsleeps on a brainwave line
S.micro=(c,t,u,d)=>{const t0=S.micro.t0,tm=wt('microsleeps',t0),tsn=wt('sneaking',t0);rgBG(c,t);tint(c,'rgba(70,20,110,0.45)','multiply');const k=popK(t,t0+0.1);
  const blink=t>tsn-0.2&&((t*1.3)%1)<0.16;brainFace(c,540,640,200*k,{eyes:blink?'half':'dot',mouth:t>t0+0.6?'smirk':'flat',brow:'angry'});
  c.save();c.translate(0,1260);panel(c,60,-200,960,400,{r:40,fill:'rgba(10,8,24,0.9)'});c.beginPath();c.rect(90,-190,900,380);c.clip();c.lineWidth=7;c.lineJoin='round';
  const off=t*260;for(let pass=0;pass<2;pass++){c.strokeStyle=pass?'#8ad8ff':'rgba(138,216,255,0.25)';c.lineWidth=pass?6:18;c.beginPath();for(let x=90;x<=990;x+=4){const X0=x+off;const seg=Math.floor(X0/300);const ms=t>tm-0.3&&hash(seg*3.1)>0.45&&(X0%300)>180&&(X0%300)<260;
    const y=ms?Math.sin(X0*0.02)*60:Math.sin(X0*0.09)*40+Math.sin(X0*0.23)*24*hash(Math.floor(X0/7));x===90?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();}
  if(t>tm-0.3){const al=ON(t,tm-0.3,0.3);for(let sg=Math.floor((90+off)/300)-1;sg<=Math.floor((990+off)/300)+1;sg++){if(hash(sg*3.1)<=0.45)continue;const x=sg*300+220-off;if(x<60||x>1020)continue;c.globalAlpha=al;c.fillStyle='rgba(255,90,140,0.28)';c.fillRect(x-40,-190,80,380);eyeIco(c,x,-120,34,0.05);c.globalAlpha=1;}}c.restore();};
// tiny naps at the pinball machine: eyes snap shut, head drops, jerks awake
S.naps=(c,t,u,d)=>{const t0=S.naps.t0;cam(c,'den_pin',{z:K3(u,d,1.04,1.09),x:600,y:1000});const q=(t-t0)%1.9;const nap=q>0.9&&q<1.35;const jerk=q>1.35&&q<1.55;
  const r=who(c,'randy',[1.9,0,0.55],X(nap?'closed':jerk?'shock':'half',jerk?'up':'flat',nap?'o':jerk?'o':'flat',{f:1,view:'3q',hf:[52,nap?70:52],hb:[40,nap?72:56],lean:nap?0.22:0.12,tilt:nap?0.22:jerk?-0.08:0,dy:jerk?-10:0,bags:0.9,sweat:jerk?1:0}));
  if(r&&nap){zzz(c,r.hc.x+60,r.hc.y-80,t,0.8);}if(r&&jerk)exclaim(c,r.hc.x,r.hc.y-200*r.s/3.4,r.s/3.4,t);c.restore();
  const k=popK(t,t0+0.1);c.save();c.translate(200,1600);c.scale(k,k);panel(c,-130,-90,260,180,{r:36});eyeIco(c,0,0,80,nap?0.05:1);c.restore();grade(c,{v:0.38});};
// proving it's harmless: thumbs up for the press
S.prove=(c,t,u,d)=>{const t0=S.prove.t0,th=wt('harmless',t0);cam(c,'den_wide',{z:K3(u,d,1.06,1.12),x:540,y:1000});flashBulbs(c,t*1.4,12,0.8);
  const r=who(c,'randy',[0.15,0,-0.4],X('happy','up','grin',{f:1,view:'front',hf:[52,-6],hb:[-3,40],bags:0.6,tilt:-0.05}));
  if(r){c.save();c.translate(r.hf.x,r.hf.y-16*r.s/3);c.fillStyle=KIND2.randy.skin;c.strokeStyle=OL;c.lineWidth=4;rr(c,-6*r.s/3,-30*r.s/3,12*r.s/3,26*r.s/3,6);c.fill();c.stroke();c.restore();}c.restore();
  check(c,850,1500,80,popK(t,th-0.1));grade(c,{v:0.36});};
// decades later: older Randy can't sleep
S.later=(c,t,u,d)=>{const t0=S.later.t0,tb=wt('barely',t0);cam(c,'bed_front',{z:K3(u,d,1.04,1.1),y:1000});
  const r=bedSit(c,'oldr',X('wide','worried','flat',{hf:[14,72],hb:[-14,72],bags:1,handsOver:1,tilt:Math.sin(t*0.9)*0.03}));c.restore();
  clockIco(c,880,1640,100,3,Math.floor((t-t0)*8)%60,popK(t,t0+0.2),{fill:'#e8f0ff'});if(t>tb-0.1)noSign(c,200,1640,90*popK(t,tb-0.1),(q,R)=>{txt(q,'Zz',0,6,R*0.9,'#cfe0ff',{stroke:false});});grade(c,{v:0.5,tint:'rgba(40,50,140,0.2)'});};
// ending: modern kid, phone glow, "just one more episode"… remember Randy
S.end=(c,t,u,d)=>{const t0=S.end.t0,tj=wt('just',t0),tr=wt('remember',t0);cam(c,'bed_front',{z:K3(t-t0,5,1.04,1.1),y:1000});const rem=t>tr-0.1;const off=t>tr+0.7;const tk=ON(t,tr+0.7,0.8);const asleep=t>tr+1.3;
  const r=bedSit(c,'oldr',X(asleep?'sleep':off?'half':rem?'wide':'half',rem?'up':'flat',asleep?'smile':rem&&!off?'o':off?'flat':'smirk',{hf:off?[14,72]:[-20,30],hb:off?[-14,72]:[20,32],bags:0.9,handsOver:off?1:0,tilt:asleep?0.1+Math.sin(t*0.8)*0.02:0,tuck:tk}));
  if(r&&!off){const px=(r.hf.x+r.hb.x)/2,py=(r.hf.y+r.hb.y)/2-20;glow(c,px,py-120,260,'140,200,255',0.4);c.save();c.translate(px,py);c.fillStyle='#1a1a22';c.strokeStyle=OL;c.lineWidth=4;rr(c,-30*r.s/3,-50*r.s/3,60*r.s/3,96*r.s/3,8);c.fill();c.stroke();c.fillStyle='#8ac8ff';rr(c,-24*r.s/3,-42*r.s/3,48*r.s/3,80*r.s/3,4);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(-8,-10);c.lineTo(12,0);c.lineTo(-8,10);c.closePath();c.fill();c.restore();}
  if(r&&t>tj-0.1&&!rem){const k=popK(t,tj-0.1);c.save();c.translate(r.hc.x+240,r.hc.y-200);c.scale(k,k);panel(c,-120,-70,240,140,{r:30});for(let i=0;i<3;i++){c.fillStyle=i<2?'#ff3b30':'#ffd060';rr(c,-90+i*64,-36,52,72,8);c.fill();}c.restore();}
  if(asleep)zzz(c,r?r.hc.x+60:600,r?r.hc.y-80:700,t,1.1,ON(t,tr+1.3,0.4));c.restore();grade(c,{v:0.5,tint:'rgba(40,50,140,0.2)',dark:0.5*ON(t,tr+1.3,1.5)});flash(c,ON(t,END-1.4,1.3),'#000');};
// ---------- timeline ----------
const SEQ=[['hook',0],['star',wt('by')],['scratch',wt('he',8.6)],['brain',wt('give')],['sd',wt('san')],['friends',wt('randy',17)],['plan',wt('the',21)],['coin',wt('they',26.5)],['days',wt('day',29)],
  ['lowe',wt('day',37.5)],['skinny',wt("he's",43.5)],['keep',wt('his',46.5)],['dement',wt('a',50.5)],['count',wt('day',53.5)],['record',wt('264',62.5)],['sleep',wt('then',66.3)],['micro',wt('the',69.3)],['naps',wt('tiny',74.5)],
  ['prove',wt('he',78.5)],['later',wt('decades',81)],['end',wt('so',84)]];
SEQ.forEach(([k,t0])=>{S[k].t0=t0;});
const SHOTS=SEQ.map(([k,t0])=>[t0,(c,t,u,d)=>S[k](c,t,u,d)]);
SHOTS.push([200,(c,t,u,d)=>{T=40;S.lowe(c,42.9,4,6);T=200;txt(c,"HE DIDN'T SLEEP",540,330,104,'#fff',{sw:24,ls:4});txt(c,'FOR 11 DAYS',540,470,128,'#ff2b2b',{sw:26,ls:4});}]);
