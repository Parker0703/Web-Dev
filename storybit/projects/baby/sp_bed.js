'use strict';
// ---------- duvet (2D, from projected 3D corners) ----------
const DUV={top:'#7a86a8',mid:'#5a6488',dk:'#34395a',band:'#9aa4c2',pat:'rgba(200,210,240,0.35)'};
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
