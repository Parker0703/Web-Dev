'use strict';
// ===================== Sleeping next to your partner · Style 5 =====================
// scene → graphic → scene → graphic … every cut on a line start, every action on its word time
const X=(e,b,m,o)=>Object.assign({eyes:e,brow:b,mouth:m},o||{});
const K3=(u,d,a,b)=>lerp(a,b,eio(clamp(u/d)));
const ON=(t,t0,d=0.3)=>eio(clamp((t-t0)/d));
// word times (from the voice)
const W_=(()=>{const o=[];for(const l of L)for(const w of l.w)o.push(w);return o;})();
const wt=(word,after=0)=>{const w=W_.find(q=>q.t>=after-0.01&&q.x.toLowerCase().replace(/[^a-z0-9'-]/g,'').startsWith(word));return w?w.t:after;};
// ---------- head-anchored figures ----------
const _HOFF={};const _scr=mk(64,64).getContext('2d');
function headOff(kind,o){const key=kind+(o.view||'');if(_HOFF[key]!=null)return _HOFF[key];CUR=Object.assign({t:0},o);const r=fig2(_scr,{kind,x:0,y:0,s:1,t:0,f:1,...o,eyes:'dot'});return _HOFF[key]=r?r.hc.y:-300;}
function headAt(c,kind,pos,o={}){const p=pp(pos);const oy=headOff(kind,o)*p.s*(o.sc||1);return who(c,kind,pos,Object.assign({},o,{dy:(o.dy||0)-oy}));}
// lying on the side (side camera): head at pos, body runs toward dirPos
function lieAt(c,kind,pos,dirPos,o={}){const a=pp(pos),b=pp(dirPos);const th=Math.atan2(-(b.x-a.x),b.y-a.y);const s=a.s*(o.sc||1);const oy=headOff(kind,o)*s;
  c.save();c.translate(a.x+(o.dx||0),a.y+(o.dy||0));c.rotate(th);CUR=Object.assign({t:T},o);const q={kind,x:0,y:-oy,s,t:T,f:1,...o};const r=fig2(c,q);
  const out={r,th,ox:a.x+(o.dx||0),oy:a.y+(o.dy||0),s};c.restore();return out;}
const toW=(L,p)=>({x:L.ox+Math.cos(L.th)*p.x-Math.sin(L.th)*p.y,y:L.oy+Math.sin(L.th)*p.x+Math.cos(L.th)*p.y});
// ---------- duvet (2D, from projected 3D corners) ----------
const DUV={top:'#f3d9c2',mid:'#e2b89c',dk:'#a67a66',band:'#fbf6ec',pat:'rgba(255,250,240,0.6)'};
function star5(c,x,y,r,i){c.save();c.translate(x,y);c.rotate(i);c.beginPath();if(i%3===0){c.arc(0,0,r,0.6,5.6);c.arc(r*0.45,0,r*0.75,5.3,0.95,true);}else for(let k=0;k<10;k++){const a=k*Math.PI/5,rr2=k%2?r*0.42:r;c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2);}c.closePath();c.fill();c.restore();}
function duvet(c,o={}){const z0=o.z0??-1.25,z1=0.14,y=0.62+(o.lift||0),sx=o.sx||0,xl=-0.97+sx,xr=0.97+sx,br=o.br??1;
  const P=(x,yy,z)=>pp([x,yy,z]);const A=P(xl,y,z0),B=P(xr,y,z0),Cc=P(xr+0.03,y,z1),D=P(xl-0.03,y,z1),E=P(xr+0.05,0.3,z1+0.05),F=P(xl-0.05,0.3,z1+0.05),G=P(xr+0.05,0.3,z0+0.05);
  c.save();c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;
  // side face (seen from the side camera)
  if(CP.eye[0]>1.5){c.beginPath();c.moveTo(B.x,B.y);c.lineTo(Cc.x,Cc.y);c.quadraticCurveTo(E.x+8,(Cc.y+E.y)/2,E.x,E.y);c.lineTo(G.x,G.y);c.closePath();const gs=c.createLinearGradient(0,B.y,0,G.y);gs.addColorStop(0,DUV.mid);gs.addColorStop(1,DUV.dk);c.fillStyle=gs;c.fill();c.stroke();}
  const hum=(u)=>{let h=0;for(const b of (o.bumps||[])){const d=(lerp(xl,xr,u)-b[0]-sx)/0.28;h+=Math.exp(-d*d)*(b[1]||1);}return h;};
  c.beginPath();c.moveTo(A.x,A.y);const n=16;for(let i=1;i<=n;i++){const u=i/n;c.lineTo(lerp(A.x,B.x,u),lerp(A.y,B.y,u)-hum(u)*14*A.s/2.6+Math.sin(u*TAU*2+T*1.3)*2.5*br);}
  c.lineTo(Cc.x,Cc.y);c.quadraticCurveTo(E.x+10,(Cc.y+E.y)/2,E.x,E.y);c.quadraticCurveTo((E.x+F.x)/2,E.y+16,F.x,F.y);c.quadraticCurveTo(F.x-10,(D.y+F.y)/2,D.x,D.y);c.closePath();
  const gr=c.createLinearGradient(0,A.y,0,Math.max(F.y,A.y+10));gr.addColorStop(0,DUV.top);gr.addColorStop(0.55,DUV.mid);gr.addColorStop(1,DUV.dk);c.fillStyle=gr;c.fill();
  c.save();c.clip();c.fillStyle=DUV.pat;for(let i=0;i<70;i++){const u=hash(i*3.1),v=hash(i*7.7);const Q=P(lerp(xl,xr,u),y,lerp(z0,z1,v));star5(c,Q.x,Q.y,Q.s*4.2,i);}
  for(const b of (o.bumps||[])){const Q=P(b[0]+sx,y,lerp(z0,z1,0.3));const g2=c.createRadialGradient(Q.x-30*Q.s,Q.y-40*Q.s,0,Q.x,Q.y,240*Q.s);g2.addColorStop(0,'rgba(255,245,225,0.35)');g2.addColorStop(1,'rgba(255,245,225,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);}
  c.strokeStyle='rgba(120,70,50,0.32)';c.lineWidth=4;for(let k=0;k<6;k++){const u=0.1+k*0.16;const Q=P(lerp(xl,xr,u)+Math.sin(k*2)*0.05,y,lerp(z0,z1,0.3)),R2=P(lerp(xl,xr,u+0.05),y,lerp(z0,z1,0.95));c.beginPath();c.moveTo(Q.x,Q.y);c.quadraticCurveTo(Q.x+26,(Q.y+R2.y)/2,R2.x,R2.y);c.stroke();}
  const mg=c.createLinearGradient(0,0,W,0);mg.addColorStop(0,'rgba(60,50,120,0.18)');mg.addColorStop(1,'rgba(170,190,255,0.16)');c.fillStyle=mg;c.fillRect(0,0,W,H);c.restore();
  c.stroke();
  // fold-over sheet band
  const A2=P(xl,y+0.005,z0+0.17),B2=P(xr,y+0.005,z0+0.17);c.beginPath();c.moveTo(A.x,A.y);for(let i=1;i<=n;i++){const u=i/n;c.lineTo(lerp(A.x,B.x,u),lerp(A.y,B.y,u)-hum(u)*14*A.s/2.6+Math.sin(u*TAU*2+T*1.3)*2.5*br);}
  c.lineTo(B2.x,B2.y);for(let i=n-1;i>=0;i--){const u=i/n;c.lineTo(lerp(A2.x,B2.x,u),lerp(A2.y,B2.y,u)-hum(u)*10*A.s/2.6);}c.closePath();c.fillStyle=DUV.band;c.fill();c.stroke();
  c.strokeStyle='rgba(150,140,190,0.55)';c.lineWidth=3;c.beginPath();c.moveTo(lerp(A.x,A2.x,0.55),lerp(A.y,A2.y,0.55));c.lineTo(lerp(B.x,B2.x,0.55),lerp(B.y,B2.y,0.55));c.stroke();
  c.restore();return {A,B,F,E};}
// ---------- grading / fx ----------
function nightGrade(c,o={}){c.save();c.globalCompositeOperation='lighter';for(const L of [[-1.5,0.95,-1.95],[1.34,0.95,-1.95]].map(pp)){if(L.w<0.2)continue;const r=420+L.s*260;const g2=c.createRadialGradient(L.x,L.y,0,L.x,L.y,r);g2.addColorStop(0,'rgba(255,170,90,0.24)');g2.addColorStop(1,'rgba(255,150,80,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);}c.restore();
  if(o.tint)tint(c,o.tint,'soft-light');tint(c,'rgba(40,40,120,0.16)','multiply');vign(c,o.v??0.42);}
function motes(c,t,n=26){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const d=hash(i*2.3),x=(hash(i)*1080+Math.sin(t*0.3+i)*40),y=((hash(i*5)*2000-t*(10+d*20))%2000+2000)%2000;c.fillStyle=`rgba(200,210,255,${0.1+0.22*(0.5+0.5*Math.sin(t*2+i))})`;c.beginPath();c.arc(x,y,1.5+d*3,0,TAU);c.fill();}c.restore();}
function zzz(c,x,y,t,s=1,col='#e6ecff'){for(let i=0;i<3;i++){const p=((t*0.55+i/3)%1);c.save();c.globalAlpha=Math.sin(p*Math.PI)*0.95;c.translate(x+p*70*s+Math.sin(p*6+i)*10*s,y-p*170*s);c.rotate(-0.2);txt(c,'Z',0,0,(32+p*28)*s,col,{sw:7*s});c.restore();}}
function heart(c,x,y,r,col='#ff5a7a'){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=r*0.16;c.beginPath();c.moveTo(0,r*0.9);c.bezierCurveTo(-r*1.5,-r*0.1,-r*0.7,-r*1.2,0,-r*0.45);c.bezierCurveTo(r*0.7,-r*1.2,r*1.5,-r*0.1,0,r*0.9);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.7)';c.beginPath();c.ellipse(-r*0.42,-r*0.35,r*0.2,r*0.12,-0.6,0,TAU);c.fill();c.restore();}
function hearts(c,x,y,t,t0,n=5,s=1){const p=t-t0;if(p<0)return;for(let i=0;i<n;i++){const q=p-i*0.12;if(q<0||q>1.6)continue;const k=q/1.6;c.save();c.globalAlpha=1-k*k;heart(c,x+(hash(i*3)-0.5)*220*s+Math.sin(q*5+i)*14*s,y-k*360*s,(16+hash(i)*16)*s*(q<0.15?back(q/0.15):1));c.restore();}}
function glow(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(x,y,0,x,y,r);g2.addColorStop(0,`rgba(${col},${a})`);g2.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2);c.restore();}
function droolDrop(c,r,amt,f=1){if(!r||amt<=0)return;const R=47*r.s*0.55,x=r.hc.x+f*47*r.s*0.1,y=r.hc.y+47*r.s*0.44;c.save();c.fillStyle='rgba(190,225,255,0.92)';c.strokeStyle='rgba(60,90,140,0.9)';c.lineWidth=2.5*r.s;const L2_=amt*R*0.55;
  c.beginPath();c.moveTo(x-R*0.035,y);c.quadraticCurveTo(x-R*0.05,y+L2_*0.7,x-R*0.08,y+L2_);c.arc(x,y+L2_,R*0.08,Math.PI,0,true);c.quadraticCurveTo(x+R*0.05,y+L2_*0.7,x+R*0.035,y);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.9)';c.beginPath();c.arc(x-R*0.025,y+L2_-R*0.02,R*0.025,0,TAU);c.fill();c.restore();}
function wetSpot(c,x,y,r,a){if(a<=0)return;c.save();c.globalAlpha=a;c.fillStyle='rgba(120,150,200,0.45)';c.beginPath();c.ellipse(x,y,r,r*0.4,0,0,TAU);c.fill();c.restore();}
function bubbleDream(c,x,y,r,k,from,draw){if(k<=0)return;c.save();for(let i=0;i<3;i++){const u=(i+1)/4;c.fillStyle='rgba(250,250,255,0.95)';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.arc(lerp(from.x,x,u),lerp(from.y,y+r*0.8,u),(8+i*8)*clamp(k*3-i),0,TAU);c.fill();c.stroke();}
  const kk=back(clamp(k*1.4));c.translate(x,y);c.scale(kk,kk);const cl=()=>{c.beginPath();for(let i=0;i<9;i++){const a=i/9*TAU;c.moveTo(Math.cos(a)*r*0.78+r*0.26,Math.sin(a)*r*0.6);c.arc(Math.cos(a)*r*0.78,Math.sin(a)*r*0.6,r*0.26,0,TAU);}c.ellipse(0,0,r*0.8,r*0.62,0,0,TAU);};
  c.strokeStyle=OL;c.lineWidth=10;cl();c.stroke();c.fillStyle='#fbfaff';cl();c.fill();c.save();c.beginPath();c.ellipse(0,0,r*0.82,r*0.64,0,0,TAU);c.clip();draw(c,r);c.restore();c.restore();}
function pizza(c,x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#f6c64a';c.beginPath();c.moveTo(0,-70);c.lineTo(48,50);c.quadraticCurveTo(0,64,-48,50);c.closePath();c.fill();c.stroke();
  c.fillStyle='#d98a3a';c.beginPath();c.moveTo(-50,48);c.quadraticCurveTo(0,66,50,48);c.lineTo(54,60);c.quadraticCurveTo(0,80,-54,60);c.closePath();c.fill();c.stroke();for(const [a,b] of [[-8,-10],[14,16],[-18,30],[8,40]]){c.fillStyle='#c8322a';c.beginPath();c.arc(a,b,9,0,TAU);c.fill();c.stroke();}c.restore();}
function beach(c,r){const g2=c.createLinearGradient(0,-r,0,r);g2.addColorStop(0,'#7cc8f0');g2.addColorStop(0.55,'#c8ecff');g2.addColorStop(0.56,'#3aa0c8');g2.addColorStop(0.75,'#3aa0c8');g2.addColorStop(0.76,'#f4dca0');c.fillStyle=g2;c.fillRect(-r,-r,2*r,2*r);
  c.fillStyle='#ffd34a';c.beginPath();c.arc(r*0.35,-r*0.25,r*0.16,0,TAU);c.fill();c.strokeStyle='#6a4a2a';c.lineWidth=r*0.06;c.beginPath();c.moveTo(-r*0.4,r*0.55);c.quadraticCurveTo(-r*0.3,r*0.1,-r*0.2,-r*0.1);c.stroke();
  c.fillStyle='#3a9a4a';for(const a of [-2.6,-1.9,-1.2,-0.5])c.beginPath(),c.ellipse(-r*0.2+Math.cos(a)*r*0.16,-r*0.1+Math.sin(a)*r*0.08,r*0.18,r*0.05,a,0,TAU),c.fill();}
// ---------- graphic-explanation stage ----------
function gfxBG(c,t,o={}){c.save();c.filter='blur(16px) brightness(0.42) saturate(1.2)';c.drawImage(IMG[o.plate||'room_wide'],-80,-80,W+160,H+160);c.restore();
  const g2=c.createLinearGradient(0,0,0,H);g2.addColorStop(0,'rgba(18,16,48,0.72)');g2.addColorStop(1,'rgba(30,14,44,0.82)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  c.save();for(let i=0;i<60;i++){const a=0.25+0.5*(0.5+0.5*Math.sin(t*2+i*1.7));c.fillStyle=`rgba(220,225,255,${a*0.6})`;c.beginPath();c.arc(hash(i*3)*W,hash(i*7)*H,1+hash(i)*2.4,0,TAU);c.fill();}c.restore();motes(c,t,18);}
function panel(c,x,y,w,h,o={}){c.save();c.shadowColor='rgba(0,0,0,0.45)';c.shadowBlur=40;c.shadowOffsetY=14;c.fillStyle=o.fill||'rgba(26,24,56,0.92)';rr(c,x,y,w,h,o.r||44);c.fill();c.restore();
  c.save();c.strokeStyle=o.edge||'rgba(170,180,255,0.35)';c.lineWidth=4;rr(c,x,y,w,h,o.r||44);c.stroke();const hl=c.createLinearGradient(0,y,0,y+h*0.4);hl.addColorStop(0,'rgba(255,255,255,0.08)');hl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=hl;rr(c,x,y,w,h,o.r||44);c.fill();
  if(o.title){c.fillStyle=o.tc||'#ffd36a';c.font='900 44px "Inter Display"';c.letterSpacing='6px';c.textAlign='center';c.textBaseline='middle';c.fillText(o.title,x+w/2,y+70);c.letterSpacing='0px';c.fillStyle='rgba(255,255,255,0.14)';c.fillRect(x+60,y+118,w-120,3);}c.restore();}
function popK(t,t0,d=0.35){return t<t0?0:back(clamp((t-t0)/d));}
function brainIcon(c,x,y,r,o={}){c.save();c.translate(x,y);if(o.rot)c.rotate(o.rot);const col=o.col||'#f6a6bf';c.lineJoin='round';c.lineCap='round';
  const out=()=>{c.beginPath();c.moveTo(-0.95*r,0.05*r);c.bezierCurveTo(-1.0*r,-0.55*r,-0.55*r,-0.92*r,-0.05*r,-0.9*r);c.bezierCurveTo(0.45*r,-0.92*r,0.95*r,-0.62*r,0.98*r,-0.1*r);c.bezierCurveTo(1.0*r,0.25*r,0.85*r,0.45*r,0.6*r,0.46*r);
    c.bezierCurveTo(0.45*r,0.48*r,0.3*r,0.42*r,0.2*r,0.46*r);c.bezierCurveTo(0.05*r,0.62*r,-0.2*r,0.66*r,-0.42*r,0.58*r);c.bezierCurveTo(-0.7*r,0.5*r,-0.9*r,0.38*r,-0.95*r,0.05*r);c.closePath();};
  const cb=()=>{c.beginPath();c.ellipse(0.56*r,0.56*r,0.34*r,0.2*r,0.15,0,TAU);};
  c.strokeStyle=OL;c.lineWidth=r*0.06;c.fillStyle=shd(col,-0.22);c.beginPath();c.moveTo(0.22*r,0.5*r);c.quadraticCurveTo(0.3*r,0.8*r,0.24*r,1.02*r);c.lineTo(0.42*r,1.02*r);c.quadraticCurveTo(0.44*r,0.78*r,0.42*r,0.55*r);c.closePath();c.fill();c.stroke();
  const gc=c.createLinearGradient(0,0.4*r,0,0.8*r);gc.addColorStop(0,shd(col,-0.05));gc.addColorStop(1,shd(col,-0.3));c.fillStyle=gc;cb();c.fill();c.stroke();c.save();cb();c.clip();c.strokeStyle=shd(col,-0.4);c.lineWidth=r*0.025;for(let i=0;i<6;i++){c.beginPath();c.ellipse(0.56*r,0.5*r+i*0.06*r,0.36*r,0.06*r,0.15,0.2,Math.PI-0.2);c.stroke();}c.restore();
  const g2=c.createRadialGradient(-r*0.35,-r*0.55,r*0.05,0,0,r*1.15);g2.addColorStop(0,shd(col,0.32));g2.addColorStop(0.55,col);g2.addColorStop(1,shd(col,-0.28));c.fillStyle=g2;out();c.fill();
  c.save();out();c.clip();c.strokeStyle=shd(col,-0.33);c.lineWidth=r*0.032;
  for(let row=0;row<9;row++){const yy=-0.82+row*0.17;c.beginPath();for(let i=0;i<=60;i++){const u=i/60,xx=-1+u*2;const w=Math.sin(u*38+row*1.7)*0.05+Math.sin(u*13+row)*0.03;const py=(yy+w+Math.sin(u*Math.PI)*0.04)*r;i?c.lineTo(xx*r,py):c.moveTo(xx*r,py);}c.stroke();}
  c.strokeStyle=shd(col,-0.45);c.lineWidth=r*0.05;c.beginPath();c.moveTo(-0.62*r,0.28*r);c.bezierCurveTo(-0.3*r,0.12*r,0.0*r,0.12*r,0.42*r,0.02*r);c.stroke();c.beginPath();c.moveTo(0.02*r,-0.9*r);c.bezierCurveTo(-0.05*r,-0.6*r,0.05*r,-0.3*r,-0.08*r,0.0*r);c.stroke();
  c.fillStyle='rgba(110,30,70,0.22)';c.beginPath();c.ellipse(0.2*r,0.45*r,1.1*r,0.38*r,0,0,TAU);c.fill();c.fillStyle='rgba(255,255,255,0.2)';c.beginPath();c.ellipse(-0.35*r,-0.5*r,0.55*r,0.25*r,-0.3,0,TAU);c.fill();c.restore();
  c.strokeStyle=OL;c.lineWidth=r*0.06;out();c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.ellipse(-0.42*r,-0.6*r,0.22*r,0.07*r,-0.45,0,TAU);c.fill();c.restore();}
function waveLine(c,x,y,w,amp,fr,ph,col,lw=8,o={}){c.save();c.lineCap='round';c.lineJoin='round';for(const [lw2,a] of [[lw*3.2,0.18],[lw,1]]){c.strokeStyle=col.replace('A',a);c.lineWidth=lw2;c.beginPath();for(let i=0;i<=120;i++){const u=i/120;const ch=o.chop?(Math.sin(u*97+ph*3)*0.6*o.chop+(hash(Math.floor(u*24)+Math.floor(ph))-0.5)*o.chop*1.4):0;const yy=y+Math.sin(u*TAU*fr+ph)*amp*(1+ch);i?c.lineTo(x+u*w,yy):c.moveTo(x+u*w,yy);}c.stroke();}c.restore();}
function chip(c,t0,t,text,x,y,o={}){tag(c,t0,t,text,x,y,o);}
function phone(c,x,y,sc,o={}){c.save();c.translate(x,y);c.scale(sc,sc);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=8;c.fillStyle=o.case||'#2d4f86';rr(c,-120,-230,240,460,40);c.fill();c.stroke();c.fillStyle='#0d0f20';rr(c,-104,-212,208,424,28);c.fill();
  const g2=c.createLinearGradient(0,-212,0,212);g2.addColorStop(0,'#1a1e48');g2.addColorStop(1,'#2a1a40');c.fillStyle=g2;rr(c,-98,-206,196,412,24);c.fill();c.fillStyle='#000';rr(c,-30,-200,60,14,7);c.fill();
  if(o.draw)o.draw(c);c.fillStyle='rgba(255,255,255,0.08)';c.beginPath();c.moveTo(-98,-206);c.lineTo(40,-206);c.lineTo(-98,40);c.closePath();c.fill();c.restore();}
function wifi(c,x,y,r,p,col='#7ad7ff'){c.save();c.lineCap='round';for(let i=0;i<3;i++){const on=clamp(p*3-i);c.strokeStyle=col;c.globalAlpha=0.25+0.75*on;c.lineWidth=r*0.16;c.beginPath();c.arc(x,y,r*(0.35+i*0.33),-Math.PI*0.75,-Math.PI*0.25);c.stroke();}c.globalAlpha=1;c.fillStyle=col;c.beginPath();c.arc(x,y,r*0.1,0,TAU);c.fill();c.restore();}
function shirtIcon(c,x,y,s,rot=0,col='#2d4f86'){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=7;const g2=c.createLinearGradient(-110,0,110,0);g2.addColorStop(0,shd(col,0.2));g2.addColorStop(0.6,col);g2.addColorStop(1,shd(col,-0.3));c.fillStyle=g2;
  c.beginPath();c.moveTo(-40,-100);c.quadraticCurveTo(0,-76,40,-100);c.lineTo(110,-62);c.lineTo(84,-8);c.lineTo(62,-20);c.lineTo(62,100);c.quadraticCurveTo(0,110,-62,100);c.lineTo(-62,-20);c.lineTo(-84,-8);c.lineTo(-110,-62);c.closePath();c.fill();c.stroke();
  c.fillStyle='#f2efe6';c.beginPath();c.moveTo(-40,-100);c.quadraticCurveTo(0,-62,40,-100);c.quadraticCurveTo(0,-80,-40,-100);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=4;c.beginPath();c.moveTo(-30,-10);c.quadraticCurveTo(-10,30,-34,80);c.moveTo(24,0);c.quadraticCurveTo(40,40,20,90);c.stroke();
  c.fillStyle='#f2efe6';for(const yy of [-40,0,40,80]){c.beginPath();c.arc(0,yy-10,6,0,TAU);c.fill();}c.restore();}
function scent(c,x,y,t,a=0.6,dir=1,len=260){c.save();c.lineCap='round';for(let i=0;i<3;i++){const ph=t*2+i*2;c.strokeStyle=`rgba(255,205,235,${a*(0.6+0.4*Math.sin(ph))})`;c.lineWidth=7-i*1.5;c.beginPath();for(let k=0;k<=20;k++){const u=k/20;const xx=x+dir*u*len,yy=y-u*60-i*22+Math.sin(u*8+ph)*16;k?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.stroke();}
  for(let i=0;i<4;i++){const p=((t*0.5+i/4)%1);c.globalAlpha=Math.sin(p*Math.PI)*a;heart(c,x+dir*p*len,y-40-p*90+Math.sin(p*9+i)*14,9,'#ff9ac0');}c.restore();}
function bigWord(c,s,x,y,size,col,k){if(k<=0)return;c.save();c.translate(x,y);const sc=lerp(1.6,1,eo(clamp(k)));c.scale(sc,sc);c.globalAlpha=clamp(k*3);txt(c,s,0,0,size,col,{sw:size*0.2,ls:6});c.restore();}
function fist(c,p,s,K){fist2(c,p,s,K.limb);}
// ---------- the couple in bed, seen from the foot (front) ----------
function coupleFront(c,o={}){const hy=o.hy??0.9,hz=-1.74;const D=pp([0,0.3,0.25]);c.save();c.beginPath();c.rect(-200,-200,W+400,D.y+200);c.clip();
  const A=o.him!==false?headAt(c,'him',[o.hx??-0.43,hy+(o.hdy||0),hz],X('sleep','flat','smile',{view:'front',tilt:-0.1,...(o.ho||{})})):null;
  const B=o.her!==false?headAt(c,'her',[o.rx??0.45,hy+(o.rdy||0),hz],X('sleep','flat','smile',{view:'front',tilt:0.1,...(o.ro||{})})):null;c.restore();
  const d=duvet(c,{z0:o.z0??-1.42,bumps:[[o.hx??-0.43,o.hb??1],[o.rx??0.45,o.rb??0.9]],br:1});return {A,B,d};}
// ---------- the couple from above ----------
function coupleTop(c,o={}){const top=[-1.0,0.62,-2.0],bot=[1.0,0.62,0.2];const T1=pp([-0.95,0.62,-2.0]),T2=pp([0.95,0.62,0.18]);c.save();c.beginPath();c.rect(Math.min(T1.x,T2.x)-40,-400,Math.abs(T2.x-T1.x)+80,T2.y+400);c.clip();
  const scF=(x,k)=>{const ph=pp([x,0.72,-1.72]),pf=pp([x,0.62,-0.3]);return (pf.y-ph.y)/(-headOff(k,{view:'front'})*ph.s);};
  const dr=()=>[o.him!==false?headAt(c,'him',[o.hx??-0.43,0.72,-1.72],X('sleep','flat','smile',{view:'front',sc:scF(o.hx??-0.43,'him'),...(o.ho||{})})):null,
    o.her!==false?headAt(c,'her',[o.rx??0.45,0.72,-1.72],X('sleep','flat','smile',{view:'front',sc:scF(o.rx??0.45,'her'),...(o.ro||{})})):null];
  let [A,B]=dr();c.restore();
  let d=null;if(o.duv!==false){const z0=o.z0??-1.3;d=duvet(c,{z0,sx:o.sx||0,bumps:o.bumps||[[o.hx??-0.43,1],[o.rx??0.45,0.9]],br:1});
    const ey=Math.min(d.A.y,d.B.y)-4;c.save();c.beginPath();c.rect(-400,-400,W+800,ey+400);c.clip();[A,B]=dr();c.restore();}
  if(o.after)o.after(A,B);return {A,B,d};}
function soloHug(c,o){const pos=[0.05,0.9,-1.74];const fo=X(o.eyes,o.brow||'up',o.mouth,{view:'front',tilt:o.tilt||0,blushK:o.blushK||1.3,hf:[-44,14],hb:[44,14],f:1});
  let R=headAt(c,'her',pos,fo);const d=duvet(c,{z0:-1.38,bumps:[[0.05,1.2]],br:1});const ey=Math.min(d.A.y,d.B.y)-4;c.save();c.beginPath();c.rect(-400,-400,W+800,ey+400);c.clip();R=headAt(c,'her',pos,fo);c.restore();
  const mx=(R.hf.x+R.hb.x)/2,my=(R.hf.y+R.hb.y)/2;shirtIcon(c,mx,my-4*R.s,0.36*R.s,0.08);fist2(c,R.hf,R.s,KIND2.her.limb);fist2(c,R.hb,R.s,KIND2.her.limb);
  // his empty pillow side
  return {R,mx,my};}
// ================= SHOTS =================
const SH5={};
// S · couple asleep (wide), slow push
SH5.hook=(c,t,u)=>{cam(c,'bed_front',{z:K3(u,1.5,1.06,1.2),y:900});const R=coupleFront(c,{});const a=pp([-0.43,0.9,-1.74]);zzz(c,a.x+40,a.y-140,t,1.1);c.restore();motes(c,t);nightGrade(c);};
// S · from above: she reaches over and touches him, both smile
SH5.touch=(c,t,u)=>{const t0=SH5.touch.t0;cam(c,'bed_top',{z:K3(u,2.6,1.2,1.32),y:K3(u,2.6,700,660)});const reach=ON(t,t0+0.25,0.7),sm=t>wt('more',t0)-0.05;
  const R=coupleTop(c,{ro:{f:-1,eyes:sm?'happy':'sleep',mouth:sm?'grin':'smile',blushK:1+reach*0.6,hf:[lerp(14,-150,reach),lerp(92,-26,reach)],hb:[10,92]},ho:{eyes:sm?'happy':'sleep',mouth:sm?'smile':'flat',blushK:sm?1.6:1,tilt:sm?0.08:0}});
  if(R.A){const tb=wt('body',t0);hearts(c,(R.A.hc.x+R.B.hc.x)/2,R.A.hc.y-60,t,tb-0.2,7,1.3);if(t>tb-0.2)glow(c,(R.A.hc.x+R.B.hc.x)/2,R.A.hc.y+80,520,'255,150,190',0.22*ON(t,tb-0.2,0.4));}c.restore();motes(c,t);nightGrade(c);};
// G · brain sleeps differently: alone vs together
SH5.g_brain=(c,t,u)=>{const t0=SH5.g_brain.t0;gfxBG(c,t);const k1=popK(t,t0+0.05),k2=popK(t,wt('literally',t0)),hi=ON(t,wt('differently',t0),0.25);
  panel(c,90,430,900,1080,{title:'YOUR BRAIN AT NIGHT'});
  for(const [k,x,lab,col,smooth] of [[k1,315,'ALONE','#8ab4ff',0],[k2,765,'TOGETHER','#ff8ab0',1]]){if(k<=0)continue;c.save();c.translate(x,900);c.scale(k,k);
    if(smooth&&hi>0){glow(c,0,-20,330,'255,140,190',0.35*hi);ring(c,0,-20,200+hi*90,(1-hi)*0.8,'rgba(255,170,210,',10);}
    brainIcon(c,0,-30,150,{col:smooth?'#f7a3c2':'#c8b6e8'});txt(c,lab,0,230,52,col,{sw:10,ls:6});
    waveLine(c,-170,360,340,smooth?26:22,smooth?2:5,t*(smooth?3:7),smooth?'rgba(255,140,190,A)':'rgba(140,180,255,A)',7,{chop:smooth?0:0.9});c.restore();}
  if(k2>0){c.save();c.globalAlpha=k2;txt(c,'VS',540,880,60,'#fff',{sw:12});c.restore();}
  if(hi>0){c.save();c.translate(765,1400);c.scale(back(hi),back(hi));c.fillStyle='#ff4f86';rr(c,-190,-44,380,88,44);c.fill();txt(c,'DIFFERENT',0,2,46,'#fff',{stroke:false,ls:6});c.restore();}};
// S · drooling on the pillow (close)
SH5.drool=(c,t,u,d)=>{const t0=SH5.drool.t0;const tb=wt('both',t0),td=wt('drooling',t0);const pan=ON(t,tb-0.15,0.5);
  cam(c,'bed_front',{z:K3(u,d,1.75,1.9),x:lerp(400,680,pan),y:880,r:-0.02});
  const R=coupleFront(c,{ho:{eyes:'sleep',mouth:'drool',tilt:-0.16},ro:{eyes:'sleep',mouth:t>td?'drool':'smile',tilt:0.16}});
  const sn=0.5+0.5*Math.sin(t*2.4);if(R.A){droolDrop(c,R.A,0.35+K3(t-t0,3,0,0.6)+sn*0.12);wetSpot(c,R.A.hc.x+40,R.A.hc.y+130*R.A.s/2.6,90,K3(t-t0,3.5,0.2,1));}
  if(R.B&&t>td){droolDrop(c,R.B,K3(t-td,0.8,0,0.7)+sn*0.1,-1);wetSpot(c,R.B.hc.x-30,R.B.hc.y+130*R.B.s/2.6,80,K3(t-td,1.2,0,1));}
  const a=R.A?R.A.hc:{x:300,y:600};zzz(c,a.x+120,a.y-200,t,1.3);c.restore();if(t>td-0.05)label(c,td-0.05,t,'DROOL ALERT',1640,{size:84,col:'#9fe0ff',rot:-0.05});motes(c,t);nightGrade(c);};
// G · REM +10%
SH5.g_rem=(c,t,u)=>{const t0=SH5.g_rem.t0;gfxBG(c,t);panel(c,90,430,900,1120,{title:'REM SLEEP'});const ta=wt('share',t0),tt=wt('ten',t0),tr=wt('rem',t0);
  const base=1250,hA=560*ON(t,t0+0.15,0.6),hB=616*ON(t,tt-0.1,0.7);
  for(const [x,h,lab,col,ic] of [[330,hA,'ALONE','#8ab4ff',0],[750,hB,'TOGETHER','#ff7aa8',1]]){c.save();const g2=c.createLinearGradient(0,base-h,0,base);g2.addColorStop(0,shd(col,0.3));g2.addColorStop(1,shd(col,-0.25));c.fillStyle=g2;c.strokeStyle=OL;c.lineWidth=6;rr(c,x-110,base-h,220,Math.max(h,1),28);c.fill();c.stroke();
    c.fillStyle='rgba(255,255,255,0.25)';rr(c,x-90,base-h+14,30,Math.max(h-28,0),15);c.fill();txt(c,lab,x,base+70,46,col,{sw:9,ls:5});
    const ii=ON(t,ic?tt:t0+0.3,0.4);if(ii>0){c.globalAlpha=ii;if(ic){heart(c,x-30,base+150,24);heart(c,x+30,base+150,24,'#ff9ac0');}else{c.fillStyle='#c8d4ff';c.beginPath();c.arc(x,base+150,26,0,TAU);c.fill();}}c.restore();}
  c.strokeStyle='rgba(255,255,255,0.2)';c.setLineDash([14,14]);c.lineWidth=4;c.beginPath();c.moveTo(200,base-560);c.lineTo(880,base-560);c.stroke();c.setLineDash([]);
  const kb=popK(t,wt('percent',t0));if(kb>0){c.save();c.translate(800,base-616-60);c.scale(kb,kb);c.rotate(-0.08);c.fillStyle='#ffd36a';c.strokeStyle=OL;c.lineWidth=7;rr(c,-150,-62,300,124,62);c.fill();c.stroke();txt(c,'+10%',0,4,78,'#2a1a10',{stroke:false});c.restore();}
  if(t>tr-0.05){const k=popK(t,tr-0.05);c.save();c.translate(540,600);c.scale(k,k);c.restore();}};
// S · dream stage: bubbles over the sleepers
SH5.dream=(c,t,u)=>{const t0=SH5.dream.t0;cam(c,'bed_front',{z:1.18,y:860});const R=coupleFront(c,{});const k=clamp((t-wt('dream',t0)+0.1)/0.5);
  if(R.A)bubbleDream(c,300,470,210,k,{x:R.A.hc.x,y:R.A.hc.y-60},(q,r)=>{const g2=q.createLinearGradient(0,-r,0,r);g2.addColorStop(0,'#2a2460');g2.addColorStop(1,'#5a3a8a');q.fillStyle=g2;q.fillRect(-r,-r,2*r,2*r);for(let i=0;i<20;i++){q.fillStyle='#fff';q.fillRect((hash(i)-0.5)*2*r,(hash(i*3)-0.5)*2*r,3,3);}pizza(q,Math.sin(t*2)*30,Math.cos(t*1.6)*16,0.9,t*0.8);});
  if(R.B)bubbleDream(c,790,430,210,clamp(k*1.2-0.2),{x:R.B.hc.x,y:R.B.hc.y-60},(q,r)=>beach(q,r));
  c.restore();if(k>0)label(c,wt('stage',t0),t,'DREAM STAGE',1640,{size:96,col:'#c8b6ff'});motes(c,t);nightGrade(c);};
// G · the brain cleans up: memories, feelings, junk
SH5.g_clean=(c,t,u,d)=>{const t0=SH5.g_clean.t0;gfxBG(c,t,{plate:'bed_front'});const tc=wt('cleaning',t0),tm=wt('sorts',t0),tf=wt('deals',t0),tj=wt('throws',t0),tk=wt('junk',t0);
  const z=lerp(1,1.05,u);c.save();c.translate(540,760);c.scale(z,z);glow(c,0,0,560,'255,140,200',0.18+0.08*Math.sin(t*3));brainIcon(c,-30,-40,250,{col:'#f6a6bf'});c.restore();
  panel(c,140,1700,800,120,{r:60});txt(c,t>tj?'TAKING OUT THE JUNK':t>tf?'CALMING FEELINGS':t>tm?'SORTING MEMORIES':'NIGHT CLEAN-UP',540,1762,46,'#ffd36a',{stroke:false,ls:5});
  // sparkle sweep at "cleaning"
  if(t>tc-0.05&&t<tm+0.2){const p=clamp((t-tc+0.05)/0.9);for(let i=0;i<14;i++){const a=hash(i)*TAU,dd=120+hash(i*3)*300;const x=540+Math.cos(a)*dd*p,y=740+Math.sin(a)*dd*0.7*p;c.save();c.globalAlpha=1-p;c.fillStyle='#fffbe0';star5(c,x,y,16,1);c.restore();}}
  // memories: photo cards fly into a filing drawer
  const mk2=ON(t,tm-0.1,0.3);if(mk2>0){const dx=200,dy=1400;c.save();c.globalAlpha=t>tf+0.3?1-ON(t,tf+0.3,0.3)*0.6:1;c.translate(dx,dy);c.scale(mk2,mk2);c.fillStyle='#a8784e';c.strokeStyle=OL;c.lineWidth=6;rr(c,-140,-90,280,180,18);c.fill();c.stroke();c.fillStyle='#c8946a';rr(c,-120,-70,240,60,10);c.fill();c.stroke();rr(c,-120,10,240,60,10);c.fill();c.stroke();c.fillStyle='#ffe2a0';rr(c,-40,-48,80,16,8);c.fill();txt(c,'MEMORIES',0,130,40,'#fff',{sw:8,ls:4});c.restore();
    for(let i=0;i<4;i++){const q=clamp((t-tm-i*0.22)/0.55);if(q<=0||q>=1)continue;const x=lerp(520+(i-1.5)*90,dx,eio(q)),y=lerp(760,dy-40,eio(q))-Math.sin(q*Math.PI)*120;c.save();c.translate(x,y);c.rotate((1-q)*(i-1.5)*0.5);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-46,-54,92,108);c.strokeRect(-46,-54,92,108);c.fillStyle=['#7cc8f0','#f6c64a','#ff8ab0','#8adf9a'][i];c.fillRect(-36,-44,72,64);c.restore();}}
  // feelings: storm cloud calms into a smiling cloud
  if(t>tf-0.1){const q=ON(t,tf+0.35,0.6),k=popK(t,tf-0.1);const x=540,y=1380;c.save();c.globalAlpha=t>tj+0.25?1-ON(t,tj+0.25,0.3)*0.6:1;c.translate(x,y);c.scale(k*lerp(1.1,0.8,q),k*lerp(1.1,0.8,q));const col=q<0.5?'#6a6a8a':'#f4f6ff';c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=6;
    c.beginPath();for(const [a,b,r] of [[-60,0,60],[0,-30,75],[65,0,58],[0,20,60]]){c.moveTo(a+r,b);c.arc(a,b,r,0,TAU);}c.fill();c.beginPath();for(const [a,b,r] of [[-60,0,60],[0,-30,75],[65,0,58],[0,20,60]]){c.moveTo(a+r,b);c.arc(a,b,r,0,TAU);}c.stroke();c.fillStyle=col;for(const [a,b,r] of [[-60,0,57],[0,-30,72],[65,0,55],[0,20,57]]){c.beginPath();c.arc(a,b,r,0,TAU);c.fill();}
    c.fillStyle=OL;c.strokeStyle=OL;c.lineWidth=6;c.lineCap='round';if(q<0.5){for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*44,-24);c.lineTo(sd*14,-12);c.stroke();c.beginPath();c.arc(sd*28,0,8,0,TAU);c.fill();}c.beginPath();c.arc(0,40,18,Math.PI*1.1,Math.PI*1.9);c.stroke();
      c.strokeStyle='#ffd34a';c.lineWidth=10;c.beginPath();c.moveTo(-10,70);c.lineTo(-30,120);c.lineTo(0,115);c.lineTo(-20,165);c.stroke();}
    else{for(const sd of [-1,1]){c.beginPath();c.arc(sd*28,-4,12,Math.PI*1.1,Math.PI*1.9);c.stroke();}c.beginPath();c.arc(0,18,20,0.2,Math.PI-0.2);c.stroke();c.fillStyle='rgba(255,120,150,0.5)';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*52,18,14,8,0,0,TAU);c.fill();}}c.restore();txt(c,'FEELINGS',x,y+150,40,'#fff',{sw:8,ls:4});}
  // junk: crumpled paper, sock, notification fly out into a bin
  if(t>tj-0.1){const bx=880,by=1420,lid=t>tk+0.75?ON(t,tk+0.75,0.12):0;const kb=popK(t,tj-0.1);c.save();c.translate(bx,by);c.scale(kb,kb);c.fillStyle='#5a6070';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-80,-80);c.lineTo(80,-80);c.lineTo(64,90);c.lineTo(-64,90);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,0.2)';c.lineWidth=5;for(const xx of [-36,0,36]){c.beginPath();c.moveTo(xx,-60);c.lineTo(xx*0.85,74);c.stroke();}c.save();c.translate(-90,-80);c.rotate(lerp(-0.8,0,lid));c.fillStyle='#6a7080';c.strokeStyle=OL;c.lineWidth=6;rr(c,0,-18,180,22,8);c.fill();c.stroke();c.restore();txt(c,'JUNK',0,140,40,'#fff',{sw:8,ls:4});c.restore();
    const items=[(q)=>{q.fillStyle='#f4f2ea';q.beginPath();for(let k=0;k<9;k++){const a=k/9*TAU,r=k%2?26:36;q.lineTo(Math.cos(a)*r,Math.sin(a)*r);}q.closePath();q.fill();q.stroke();},(q)=>{q.fillStyle='#d84a4a';q.beginPath();q.moveTo(-14,-34);q.lineTo(14,-34);q.lineTo(14,10);q.quadraticCurveTo(40,14,38,30);q.lineTo(-14,30);q.closePath();q.fill();q.stroke();q.fillStyle='#fff';q.fillRect(-14,-34,28,10);},(q)=>{q.fillStyle='#ffffff';rr(q,-44,-26,88,52,12);q.fill();q.stroke();q.fillStyle='#ff3b30';q.beginPath();q.arc(36,-22,12,0,TAU);q.fill();q.fillStyle='#8a8a9a';q.fillRect(-32,-10,50,6);q.fillRect(-32,4,36,6);}];
    for(let i=0;i<3;i++){const q=clamp((t-tj-0.05-i*0.25)/0.6);if(q<=0||q>=1)continue;const x=lerp(560,bx,eio(q)),y=lerp(760,by-80,q)-Math.sin(q*Math.PI)*260;c.save();c.translate(x,y);c.rotate(q*6);c.strokeStyle=OL;c.lineWidth=5;items[i](c);c.restore();}}};
// S · smoother: he stirs, she pats him, he relaxes; fewer wake-ups / longer stretches
SH5.smooth=(c,t,u,d)=>{const t0=SH5.smooth.t0;const ts=wt('smoother',t0),tf=wt('fewer',t0),tl=wt('longer',t0);cam(c,'bed_top',{z:K3(u,d,1.22,1.3),y:680});
  const stir=t<ts-0.15?Math.sin(t*16)*0.06:0,pat=ON(t,t0+0.25,0.35)*(1-ON(t,ts+0.6,0.4));const tap=Math.abs(Math.sin(t*9))*pat;
  const R=coupleTop(c,{ho:{eyes:t<ts-0.15?'squeeze':'sleep',brow:t<ts-0.15?'worried':'flat',mouth:t<ts-0.15?'wobble':'smile',tilt:stir,blushK:t>ts?1.4:1},ro:{f:-1,eyes:'sleep',mouth:'smile',hf:[lerp(14,-150,pat),lerp(92,40-tap*14,pat)]}});
  if(R.A&&t>ts-0.1)ring(c,R.A.hc.x,R.A.hc.y,120+(t-ts)*500,clamp(1-(t-ts)*1.5)*0.6,'rgba(200,220,255,',8);c.restore();
  chip(c,tf,t,'WAKE-UPS  ↓',540,1500,{col:'#8ab4ff'});chip(c,tl,t,'LONGER STRETCHES  ↑',540,1620,{col:'#ff8ab0'});motes(c,t);nightGrade(c);};
// G · a movie with no ads
SH5.g_movie=(c,t,u)=>{const t0=SH5.g_movie.t0;gfxBG(c,t);const ta=wt('ads',t0),tn=wt('no',t0);panel(c,70,560,940,760,{r:36,fill:'rgba(10,10,20,0.95)'});
  c.save();rr(c,100,590,880,560,22);c.clip();const g2=c.createLinearGradient(0,590,0,1150);g2.addColorStop(0,'#2a2460');g2.addColorStop(1,'#6a3a8a');c.fillStyle=g2;c.fillRect(100,590,880,560);for(let i=0;i<40;i++){c.fillStyle='#fff';c.fillRect(100+hash(i)*880,590+hash(i*3)*560,3,3);}
  pizza(c,540+Math.sin(t*1.5)*120,870+Math.cos(t*1.2)*40,1.4,t*0.6);c.restore();
  c.fillStyle='rgba(255,255,255,0.2)';rr(c,130,1200,820,14,7);c.fill();c.fillStyle='#ff4f6a';rr(c,130,1200,820*clamp((t-t0)/2+0.3),14,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(130+820*clamp((t-t0)/2+0.3),1207,16,0,TAU);c.fill();
  txt(c,'▶  DREAM.mp4',300,1262,34,'#fff',{stroke:false});txt(c,'REM',880,1262,34,'#ffd36a',{stroke:false});
  const ka=popK(t,t0+0.25),gone=ON(t,tn+0.05,0.3);if(gone<1&&ka>0){c.save();c.translate(lerp(720,1300,gone),720);c.scale(ka,ka);c.rotate(gone*0.6);c.fillStyle='#ffd34a';c.strokeStyle=OL;c.lineWidth=6;rr(c,-180,-70,360,140,20);c.fill();c.stroke();txt(c,'AD  0:30',-30,0,48,'#2a1a10',{stroke:false});c.fillStyle='#2a1a10';rr(c,96,-34,64,64,12);c.fill();txt(c,'✕',128,2,40,'#ffd34a',{stroke:false});c.restore();}
  if(t>tn)label(c,tn,t,'NO ADS',1500,{size:110,col:'#ff4f6a'});};
// S · the weird part: dutch push-in, both heads turn in sync
SH5.weird=(c,t,u,d)=>{const t0=SH5.weird.t0;const tw=wt('weird',t0);const turn=ON(t,tw-0.1,0.35);cam(c,'bed_front',{z:K3(u,d,1.5,1.75),y:860,r:K3(u,d,0,-0.06)});
  const R=coupleFront(c,{ho:{eyes:'sleep',mouth:'flat',tilt:-0.1+turn*0.3,look:0},ro:{eyes:'sleep',mouth:'flat',tilt:0.1-turn*0.3}});
  c.restore();if(t>tw-0.1){for(let i=0;i<3;i++){const k=popK(t,tw-0.1+i*0.12);c.save();c.translate(260+i*280,520-i*40);c.scale(k,k);txt(c,'?',0,0,120,'#c8b6ff',{sw:20});c.restore();}}
  nightGrade(c,{tint:'rgba(120,60,200,0.35)',v:0.6});};
// G · brainwaves sync
SH5.g_sync=(c,t,u)=>{const t0=SH5.g_sync.t0;gfxBG(c,t);const ts=wt('sync',t0);const s=ON(t,t0+0.2,ts-t0-0.2);panel(c,90,430,900,1120,{title:'BRAINWAVES'});
  brainIcon(c,250,720,90,{col:'#9fbcff'});brainIcon(c,830,720,90,{col:'#ff9ac0',rot:0});txt(c,'HIM',250,860,40,'#9fbcff',{sw:8,ls:4});txt(c,'HER',830,860,40,'#ff9ac0',{sw:8,ls:4});
  waveLine(c,170,1020,740,60,3,t*3,'rgba(140,180,255,A)',8);waveLine(c,170,1020+lerp(130,0,s),740,60,3,t*3+lerp(2.4,0,s),'rgba(255,140,190,A)',8);
  const m=lerp(0.35,1,s);c.fillStyle='rgba(255,255,255,0.12)';rr(c,170,1300,740,46,23);c.fill();const g2=c.createLinearGradient(170,0,910,0);g2.addColorStop(0,'#8ab4ff');g2.addColorStop(1,'#ff7aa8');c.fillStyle=g2;rr(c,170,1300,740*m,46,23);c.fill();
  txt(c,'SYNC '+Math.round(m*100)+'%',540,1410,52,'#fff',{sw:10,ls:5});if(t>ts){ring(c,540,1020,100+(t-ts)*700,clamp(1-(t-ts)*1.4),'rgba(255,220,240,',12);label(c,ts,t,'IN SYNC',1660,{size:100,col:'#ffd36a'});}};
// S · one drops into deep sleep, the other follows
SH5.deep=(c,t,u,d)=>{const t0=SH5.deep.t0;const td=wt('drops',t0),tf=wt('follows',t0),to=wt('other',t0);const a=ON(t,td-0.05,0.6),b=ON(t,to,0.8);cam(c,'bed_front',{z:K3(u,d,1.12,1.22),y:900});
  const R=coupleFront(c,{hdy:-0.05*a,rdy:-0.05*b,hb:1-0.3*a,rb:0.9-0.3*b,ho:{eyes:'sleep',mouth:a>0.5?'o':'smile',tilt:-0.1},ro:{eyes:'sleep',mouth:b>0.5?'o':'smile',tilt:0.1}});
  if(R.A&&a>0){glow(c,R.A.hc.x,R.A.hc.y+60,360,'90,130,255',0.4*a);for(let i=0;i<3;i++){const p=((t*0.8+i/3)%1);c.save();c.globalAlpha=a*Math.sin(p*Math.PI);txt(c,'▼',R.A.hc.x,R.A.hc.y-260+p*160,60,'#8ab4ff',{sw:8});c.restore();}}
  if(R.B&&b>0){glow(c,R.B.hc.x,R.B.hc.y+60,360,'90,130,255',0.4*b);for(let i=0;i<3;i++){const p=((t*0.8+i/3)%1);c.save();c.globalAlpha=b*Math.sin(p*Math.PI);txt(c,'▼',R.B.hc.x,R.B.hc.y-260+p*160,60,'#8ab4ff',{sw:8});c.restore();}}
  c.restore();chip(c,td,t,'DEEP SLEEP',540,1540,{col:'#5a8aff'});if(t>tf-0.1)chip(c,tf-0.1,t,'…AND SHE FOLLOWS',540,1660,{col:'#ff8ab0'});motes(c,t);nightGrade(c,{tint:a>0?`rgba(60,90,220,${0.25*a})`:null});};
// G · two phones on the same Wi-Fi
SH5.g_wifi=(c,t,u)=>{const t0=SH5.g_wifi.t0;gfxBG(c,t);const tw=wt('wi-fi',t0);const k1=popK(t,t0+0.05),k2=popK(t,wt('phones',t0));const pulse=0.5+0.5*Math.sin(t*5);
  const scr=(col)=>(q)=>{wifi(q,0,-60,110,(t*1.2)%1,col);waveLine(q,-80,90,160,22,2,t*4,col==='#7ad7ff'?'rgba(122,215,255,A)':'rgba(255,140,190,A)',5);q.fillStyle='rgba(255,255,255,0.8)';q.font='800 26px "Inter Display"';q.textAlign='center';q.fillText('SLEEP MODE',0,170);};
  if(k1>0)phone(c,300,1020,k1*1.25,{case:'#2d4f86',draw:scr('#7ad7ff')});if(k2>0)phone(c,780,1020,k2*1.25,{case:'#e98aa6',draw:scr('#ff9ac0')});
  if(t>tw-0.1){const k=popK(t,tw-0.1);c.save();c.translate(540,500);c.scale(k,k);glow(c,0,0,260,'120,215,255',0.4);wifi(c,0,60,190,1,'#ffffff');c.restore();ring(c,540,520,80+(t-tw)*600,clamp(1-(t-tw)*1.5)*0.6,'rgba(170,230,255,',10);}
  c.strokeStyle=`rgba(200,230,255,${0.3+0.4*pulse})`;c.setLineDash([16,16]);c.lineWidth=6;c.beginPath();c.moveTo(430,1020);c.lineTo(650,1020);c.stroke();c.setLineDash([]);};
// S · the closer the couple, the better the sync (from above: they scoot together, she hugs him)
SH5.closer=(c,t,u,d)=>{const t0=SH5.closer.t0;const tc=wt('closer',t0),tb=wt('better',t0);const m=ON(t,tc,0.9);cam(c,'bed_top',{z:K3(u,d,1.2,1.32),y:680});
  const R=coupleTop(c,{hx:lerp(-0.43,-0.26,m),rx:lerp(0.45,0.2,m),ho:{eyes:'sleep',mouth:t>tb?'grin':'smile',blushK:1+m*0.7,tilt:m*0.12},ro:{f:-1,eyes:'sleep',mouth:'smile',blushK:1+m*0.7,tilt:-m*0.18,hf:[lerp(14,-110,m),lerp(92,40,m)]}});
  if(R.A)hearts(c,(R.A.hc.x+R.B.hc.x)/2,R.A.hc.y-40,t,tb-0.1,7,1.2);c.restore();const v=Math.round(lerp(62,98,ON(t,tc,tb-tc)));c.save();c.translate(540,1560);panel(c,-300,-70,600,140,{r:70});const g2=c.createLinearGradient(-240,0,240,0);g2.addColorStop(0,'#8ab4ff');g2.addColorStop(1,'#ff7aa8');c.fillStyle='rgba(255,255,255,0.12)';rr(c,-240,-14,480,28,14);c.fill();c.fillStyle=g2;rr(c,-240,-14,480*v/100,28,14);c.fill();txt(c,'SYNC '+v+'%',0,-38,30,'#fff',{stroke:false,ls:4});c.restore();
  motes(c,t);nightGrade(c);};
// S · even weirder: he's gone, his shirt lies on his pillow; she eyes it
SH5.weirder=(c,t,u,d)=>{const t0=SH5.weirder.t0;cam(c,'bed_front',{z:K3(u,d,1.15,1.3),x:600,y:880,r:-0.05});const R=coupleFront(c,{him:false,hb:0,ro:{eyes:t>t0+0.5?'sly':'half',brow:'up',mouth:'smirk',tilt:-0.08,look:-1}});
  const p=pp([-0.43,0.82,-1.7]);shirtIcon(c,p.x,p.y,0.95*p.s/2.6,-0.15);c.restore();nightGrade(c,{tint:'rgba(120,60,200,0.3)',v:0.55});};
// S · she hugs his shirt and sniffs it (side view, lying on her side)
SH5.sniff=(c,t,u,d)=>{const t0=SH5.sniff.t0;const tn=wt('nine',t0),tm=wt('minutes',t0),tg=wt('night',t0);cam(c,'bed_front',{z:K3(u,d,1.85,2.0),x:560,y:860});const sn=0.5+0.5*Math.sin(t*3.2);
  const H=soloHug(c,{eyes:'happy',mouth:'smile',blushK:1.5+sn*0.4,tilt:Math.sin(t*1.4)*0.05});scent(c,H.mx+40,H.my-10,t,0.75,1,230);scent(c,H.mx-40,H.my-10,t+1,0.6,-1,200);c.restore();
  if(t>tn-0.05){const k=popK(t,tn-0.05);c.save();c.translate(830,1500);c.scale(k,k);panel(c,-190,-110,380,220,{r:50});c.strokeStyle='#ffd36a';c.lineWidth=10;c.beginPath();c.arc(-100,0,58,0,TAU);c.stroke();c.lineCap='round';c.beginPath();c.moveTo(-100,0);c.lineTo(-100,-40);c.moveTo(-100,0);c.lineTo(-100+Math.cos(t*3)*34,Math.sin(t*3)*34);c.stroke();txt(c,'+9',50,-10,88,'#ffd36a',{stroke:false});txt(c,'MIN',50,60,36,'#fff',{stroke:false,ls:5});c.restore();}
  if(t>tg-0.1){const k=popK(t,tg-0.1);c.save();c.translate(830,1690);c.scale(k,k);txt(c,'EVERY NIGHT',0,0,44,'#c8b6ff',{sw:9,ls:4});c.restore();}motes(c,t);nightGrade(c);};
// G · as much as melatonin pills (balance scale)
SH5.g_mela=(c,t,u)=>{const t0=SH5.g_mela.t0;gfxBG(c,t);const tp=wt('pills',t0),tme=wt('melatonin',t0);const lv=ON(t,tp-0.1,0.5);const ang=lerp(0.22,0,lv)+Math.sin(t*3)*0.03*(1-lv);
  panel(c,90,470,900,1040,{title:'SAME EFFECT?'});c.save();c.translate(540,880);c.strokeStyle=OL;c.lineWidth=8;c.fillStyle='#c8a050';c.beginPath();c.moveTo(-70,520);c.lineTo(70,520);c.lineTo(20,0);c.lineTo(-20,0);c.closePath();c.fill();c.stroke();
  c.rotate(ang);c.fillStyle='#e0b860';rr(c,-330,-14,660,28,14);c.fill();c.stroke();for(const sd of [-1,1]){c.save();c.translate(sd*300,0);c.rotate(-ang);c.strokeStyle='rgba(230,200,120,0.9)';c.lineWidth=5;c.beginPath();c.moveTo(0,0);c.lineTo(-110,200);c.moveTo(0,0);c.lineTo(110,200);c.stroke();c.fillStyle='#d8b05a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.ellipse(0,200,140,30,0,0,TAU);c.fill();c.stroke();
    if(sd<0){const k=popK(t,tme-0.1);if(k>0){c.save();c.translate(0,180);c.scale(k,k);c.fillStyle='#c8761e';c.strokeStyle=OL;c.lineWidth=6;rr(c,-56,-150,112,150,20);c.fill();c.stroke();c.fillStyle='#f4f2ea';rr(c,-62,-196,124,52,12);c.fill();c.stroke();c.fillStyle='#fff';c.fillRect(-50,-110,100,60);c.strokeRect(-50,-110,100,60);c.fillStyle='#2a1a10';c.font='900 16px "Inter Display"';c.textAlign='center';c.fillText('MELATONIN',0,-74);c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(-46,-140,14,120);c.restore();}}
    else{shirtIcon(c,0,120,0.62,0);}c.restore();}c.restore();
  if(t>tp-0.1){const k=popK(t,tp-0.1);c.save();c.translate(540,1380);c.scale(k,k);c.fillStyle='#ffd36a';c.strokeStyle=OL;c.lineWidth=7;rr(c,-90,-60,180,120,40);c.fill();c.stroke();txt(c,'=',0,4,110,'#2a1a10',{stroke:false});c.restore();}};
// G · From. A. Shirt.
SH5.g_shirt=(c,t,u)=>{const t0=SH5.g_shirt.t0;gfxBG(c,t);const ws=[wt('from',t0),wt('a',t0+0.1),wt('shirt',t0+0.2)];const n=ws.filter(q=>t>=q-0.03).length;const lp=t-ws[Math.max(0,n-1)];
  const z=[1,1.25,1.55,1.9][n]*(1+Math.max(0,0.14-lp)*0.9);glow(c,540,980,600,'255,150,190',0.25);shirtIcon(c,540,1000,2.2*z/1.6,Math.sin(t*2)*0.04);
  const words=['FROM.','A.','SHIRT.'];for(let i=0;i<n;i++)bigWord(c,words[i],540,560+i*0,i===n-1?150:0,i===2?'#ff4f6a':'#fff',(t-ws[i])/0.15);
  if(n>0&&lp<0.1)flash(c,(0.1-lp)*2.5);};
// S · it works even when you don't notice the smell
SH5.notice=(c,t,u,d)=>{const t0=SH5.notice.t0;const tn=wt('notice',t0),tsm=wt('smell',t0);cam(c,'bed_front',{z:K3(u,d,1.9,2.05),x:560,y:860});
  const H=soloHug(c,{eyes:'sleep',brow:'flat',mouth:'smile',blushK:1.2});scent(c,H.mx,H.my-20,t,0.25,1,180);zzz(c,H.R.hc.x+90,H.R.hc.y-200,t,1.2);c.restore();
  if(t>tn-0.1){const k=popK(t,tn-0.1);c.save();c.translate(540,1480);c.scale(k,k);panel(c,-300,-80,600,160,{r:60});txt(c,'NOTICED IT?',-60,0,50,'#fff',{stroke:false,ls:4});c.fillStyle='#ff4f6a';c.beginPath();c.arc(210,0,44,0,TAU);c.fill();txt(c,'✕',210,3,50,'#fff',{stroke:false});c.restore();}
  if(t>tsm-0.05){const k=popK(t,tsm-0.05);c.save();c.translate(540,1680);c.scale(k,k);panel(c,-300,-80,600,160,{r:60});txt(c,'STILL WORKS',-60,0,50,'#fff',{stroke:false,ls:4});c.fillStyle='#3ad28a';c.beginPath();c.arc(210,0,44,0,TAU);c.fill();txt(c,'✓',210,3,50,'#fff',{stroke:false});c.restore();}motes(c,t);nightGrade(c);};
// S · they steal the blanket (from above)
SH5.steal=(c,t,u,d)=>{const t0=SH5.steal.t0;const ts=wt('steal',t0),tb=wt('blanket',t0);const p=ON(t,ts-0.05,0.7);cam(c,'bed_top',{z:1.24,y:690});const shiv=p>0.5?Math.sin(t*40)*4:0;
  const R=coupleTop(c,{sx:-0.3*p,z0:-1.3,bumps:[[-0.43,1+p*1.5],[0.45,0.9*(1-p)]],ho:{eyes:'sleep',mouth:p>0.5?'smirk':'smile',blushK:1.3,tilt:p*0.1},ro:{f:-1,dx:shiv,eyes:p>0.5?'squeeze':'sleep',brow:p>0.5?'worried':'flat',mouth:p>0.5?'wobble':'smile'}});
  if(R.B&&p>0.5){c.save();c.strokeStyle='rgba(170,210,255,0.9)';c.lineWidth=6;c.lineCap='round';for(let i=0;i<4;i++){const a=-0.5+i*0.35;c.beginPath();c.moveTo(R.B.hc.x+Math.cos(a)*170,R.B.hc.y+Math.sin(a)*170);c.lineTo(R.B.hc.x+Math.cos(a)*220,R.B.hc.y+Math.sin(a)*220);c.stroke();}c.restore();}c.restore();if(p>0.5)label(c,tb,t,'BRRR!',1560,{size:110,col:'#9fe0ff',x:760});
  motes(c,t);nightGrade(c,{tint:p>0.5?'rgba(90,140,255,0.2)':null});};
// S · they kick you in their sleep
SH5.kick=(c,t,u,d)=>{const t0=SH5.kick.t0;const tk=wt('kick',t0);const k=ON(t,tk-0.12,0.14),hit=t>tk+0.02;cam(c,'bed_top',{z:1.24,y:690,sx:hit&&t<tk+0.35?Math.sin(t*90)*14:0});
  const fx=lerp(-0.25,0.28,k);const R=coupleTop(c,{sx:-0.3,z0:-1.3,bumps:[[-0.43,2.2],[fx,k>0?1.6:0],[0.45,0.6]],ho:{eyes:'sleep',mouth:'smirk',blushK:1.3},ro:{f:-1,eyes:hit?'shock':'squeeze',brow:'worried',mouth:hit?'o':'wobble',dx:hit?K3(t-tk,0.2,30,8):0,sweat:hit?2:0}});
  if(hit){const P=pp([0.36,0.66,-1.1]);sparks(c,P.x,P.y,(t-tk)/0.5,16,2,'255,230,170');ring(c,P.x,P.y,60+(t-tk)*500,clamp(1-(t-tk)*2),'rgba(255,240,200,',10);}c.restore();if(hit)label(c,tk+0.02,t,'OOF!',560,{size:130,col:'#ffd36a',x:700,rot:0.1});motes(c,t);nightGrade(c);};
// S · but your brain still sleeps better next to them: cuddle, she touches his cheek, both happy
SH5.better=(c,t,u,d)=>{const t0=SH5.better.t0;const tb=wt('better',t0),tn=wt('next',t0);const m=ON(t,t0+0.1,0.8),touch=ON(t,wt('brain',t0),0.6);cam(c,'bed_top',{z:K3(t-t0,4,1.2,1.34),y:K3(t-t0,4,700,650)});
  const R=coupleTop(c,{hx:lerp(-0.43,-0.24,m),rx:lerp(0.45,0.18,m),ho:{eyes:t>tb?'happy':'sleep',mouth:t>tb?'grin':'smile',blushK:1+m,tilt:m*0.14},ro:{f:-1,eyes:t>tb?'happy':'sleep',mouth:'grin',blushK:1+m,tilt:-m*0.16,hf:[lerp(14,-120,touch),lerp(92,-24,touch)]}});
  if(R.A){const cx=(R.A.hc.x+R.B.hc.x)/2;if(t>tb-0.1){glow(c,cx,R.A.hc.y+60,600,'255,150,190',0.3*ON(t,tb-0.1,0.4));hearts(c,cx,R.A.hc.y-40,t,tb-0.1,9,1.4);}if(t>tn)hearts(c,cx,R.A.hc.y-60,t,tn+0.3,7,1.1);}c.restore();motes(c,t);nightGrade(c);};
SH5.end=(c,t,u,d)=>{SH5.better(c,t,u+5,d);};
// ---------- timeline: scene → graphic → scene … ----------
const SEQ=[['hook',0],['touch',wt('might')-0.06],['g_brain',wt('your',4)],['drool',wt('give')],['g_rem',wt('when',11.9)],['dream',wt("that's",15.6)],['g_clean',wt("it's",16.8)],
  ['smooth',wt('and',23.5)],['g_movie',wt('like',27.8)],['weird',wt('now',29.6)],['g_sync',wt('your',31.2)],['deep',wt('one',33.4)],['g_wifi',wt('like',36.8)],['closer',wt('and',39)],
  ['weirder',wt('it',42.2)],['sniff',wt('just',43.7)],['g_mela',wt('about',48.5)],['g_shirt',wt('from',52.3)-0.04],['notice',wt('and',53.5)],['steal',wt('so',56.2)],['kick',wt('they',58.1)],['better',wt('but',59.7)]];
SEQ.forEach(([k,t0])=>{SH5[k].t0=t0;});SH5.better.t0=SEQ[SEQ.length-1][1];
const SHOTS=SEQ.map(([k,t0])=>[t0,(c,t,u,d)=>SH5[k](c,t,u,d)]);
SHOTS.push([200,(c,t,u,d)=>{T=61.9;SH5.better(c,61.9,3,4);T=200;txt(c,'SLEEPING NEXT TO',540,330,104,'#fff',{sw:24,ls:3});txt(c,'YOUR PARTNER',540,460,124,'#fff',{sw:26,ls:3});txt(c,'CHANGES',540,1450,140,'#ff2b2b',{sw:28,ls:4});txt(c,'YOUR BRAIN',540,1600,140,'#ff2b2b',{sw:28,ls:4});}]);
SHOTS.push([300,(c,t,u,d)=>{cam(c,'room_wide',{z:1.0});c.restore();}]);
