// ===== camera views: front / side profile / back + long hair + bed, brain props =====
function longHair2(c,hc,s,f,o,K,HR){if(!K.longHair||o.back&&false)return;const R=HR*s;c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);
  const col=K.hair||'#4a2418',g=c.createLinearGradient(-R,0,R,0);g.addColorStop(L2.dx>0?0:1,shd2(col,-0.35));g.addColorStop(L2.dx>0?1:0,shd2(col,0.18));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;
  const bx=o.view==='side'?-f*R*0.35:0,wd=o.view==='side'?R*1.05:R*1.28;
  c.beginPath();c.moveTo(bx-wd,-R*0.2);c.quadraticCurveTo(bx-wd*1.15,-R*1.3,bx,-R*1.22);c.quadraticCurveTo(bx+wd*1.15,-R*1.3,bx+wd,-R*0.2);c.quadraticCurveTo(bx+wd*1.12,R*1.1,bx+wd*0.8,R*1.75);c.lineTo(bx-wd*0.8,R*1.75);c.quadraticCurveTo(bx-wd*1.12,R*1.1,bx-wd,-R*0.2);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,220,190,0.18)';c.lineWidth=2*s;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(bx+i*R*0.3,-R*0.9);c.quadraticCurveTo(bx+i*R*0.42,R*0.4,bx+i*R*0.35,R*1.6);c.stroke();}c.restore();}
function hairCap(c,R,s,f,o,K){const col=K.hair||'#3a2a20';c.save();c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.clip();const g=c.createLinearGradient(0,-R,0,0);g.addColorStop(0,shd2(col,0.15));g.addColorStop(1,shd2(col,-0.2));c.fillStyle=g;
  if(o.view==='front'){c.beginPath();c.moveTo(-R*1.1,-R*0.1);c.quadraticCurveTo(-R*0.9,-R*0.55,-R*0.3,-R*0.5);c.quadraticCurveTo(0,-R*0.7,R*0.35,-R*0.48);c.quadraticCurveTo(R*0.95,-R*0.55,R*1.1,-R*0.1);c.lineTo(R*1.1,-R*1.2);c.lineTo(-R*1.1,-R*1.2);c.closePath();c.fill();}
  else if(o.view==='side'){c.beginPath();c.moveTo(f*R*0.55,-R*1.2);c.quadraticCurveTo(f*R*0.62,-R*0.62,f*R*0.25,-R*0.58);c.quadraticCurveTo(-f*R*0.1,-R*0.4,-f*R*0.05,R*0.05);c.quadraticCurveTo(-f*R*0.3,R*0.5,-f*R*0.6,R*0.62);c.lineTo(-f*R*1.2,R*0.62);c.lineTo(-f*R*1.2,-R*1.2);c.closePath();c.fill();}
  c.fillStyle='rgba(255,235,210,0.22)';c.beginPath();c.ellipse(L2.dx*R*0.3,-R*0.82,R*0.4,R*0.1,-0.25*L2.dx,0,TAU);c.fill();c.restore();}
function ear2(c,x,y,R,s,f){c.save();c.fillStyle='#e2ded6';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.ellipse(x,y,R*0.19,R*0.29,f*0.12,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(120,90,90,0.38)';c.beginPath();c.ellipse(x+f*1*s,y-1*s,R*0.1,R*0.17,f*0.12,0,TAU);c.fill();c.restore();}
function profileFace(c,o,s,f,R,t){const K=KIND2[o.kind]||{};const E=o.eyes||'open',Mo=o.mouth||'flat',Bw=o.brow||'flat';
  c.save();c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.clip();c.fillStyle='rgba(50,40,60,0.2)';c.beginPath();c.ellipse(-f*R*0.7,R*0.1,R*0.7,R*1.2,0,0,TAU);c.fill();c.fillStyle='rgba(235,140,120,0.16)';c.beginPath();c.ellipse(f*R*0.42,R*0.28,R*0.2,R*0.12,0,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.ellipse(L2.dx*R*0.4,-R*0.5,R*0.22,R*0.12,0,0,TAU);c.fill();c.restore();
  
    // nose silhouette breaking the outline, shaded underside
  const nx=f*R*0.94;c.fillStyle='#e9e6df';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.moveTo(nx-f*2*s,-6*s);c.quadraticCurveTo(nx+f*9*s,3*s,nx+f*4*s,7*s);c.lineTo(nx-f*3*s,8*s);c.fill();
  c.beginPath();c.moveTo(nx-f*1*s,-5*s);c.quadraticCurveTo(nx+f*9*s,3*s,nx+f*4*s,7*s);c.lineTo(nx-f*1*s,8*s);c.stroke();c.fillStyle='rgba(70,50,60,0.35)';c.beginPath();c.ellipse(nx+f*1*s,8.5*s,5*s,1.6*s,0,0,TAU);c.fill();
  // eye
  const ex=f*R*0.5,ey=-5*s;c.fillStyle=K2;c.strokeStyle=K2;c.lineCap='round';
  if(E==='closed'||E==='half'&&false){c.lineWidth=3*s;c.beginPath();c.arc(ex,ey,4.5*s,0.15*Math.PI,0.85*Math.PI);c.stroke();}
  else if(E==='happy'){c.lineWidth=3.4*s;c.beginPath();c.arc(ex,ey+2*s,4.8*s,Math.PI*1.15,Math.PI*1.85);c.stroke();}
  else if(!['wide','shock','joy'].includes(E)){c.save();if(E==='sly'||E==='half'){c.beginPath();c.rect(ex-6*s,ey-0.5*s,12*s,9*s);c.clip();}c.fillStyle=K2;c.beginPath();c.ellipse(ex+f*0.5*s,ey,3.4*s,4.6*s,0,0,TAU);c.fill();c.restore();if(E==='sly'||E==='half'){c.lineWidth=2.6*s;seg(c,ex-4.5*s,ey-1*s,ex+4.5*s,ey-1*s);}else{c.fillStyle='#fff';c.beginPath();c.arc(ex+f*1.6*s,ey-1.6*s,1*s,0,TAU);c.fill();}}
  else{const big=E==='wide'||E==='shock';c.fillStyle='#fff';c.lineWidth=2*s;c.beginPath();c.ellipse(ex,ey,(big?4.6:3.8)*s,(big?7:6.2)*s,0,0,TAU);c.fill();c.stroke();c.fillStyle=K2;c.beginPath();c.arc(ex+f*1.4*s,ey+0.5*s,(big?2:2.6)*s,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(ex+f*2*s,ey-1*s,0.9*s,0,TAU);c.fill();
    if(E==='sly'||E==='half'){c.fillStyle=K2;c.beginPath();c.ellipse(ex,ey-3*s,4.4*s,3.6*s,0,Math.PI,TAU);c.fill();}
    c.lineWidth=2.8*s;c.beginPath();c.ellipse(ex,ey,4*s,6.4*s,0,Math.PI*1.1,Math.PI*1.9);c.stroke();}
  // brow
  c.lineWidth=3.8*s;const by=ey-10*s;if(Bw==='angry')seg(c,ex-f*5*s,by-3*s,ex+f*4*s,by+2*s);else if(Bw==='worried')seg(c,ex-f*5*s,by+2*s,ex+f*4*s,by-2*s);else if(Bw==='up'){c.beginPath();c.arc(ex,by+3*s,5.5*s,Math.PI*1.2,Math.PI*1.8);c.stroke();}else seg(c,ex-f*5*s,by,ex+f*4*s,by);
  // mouth near the front edge
  const mx=f*R*0.68,my=15*s;c.lineWidth=3.4*s;
  if(Mo==='o'||Mo==='scream'||Mo==='shout'){c.fillStyle=K2;c.beginPath();c.ellipse(mx+f*1*s,my+1*s,3*s,(Mo==='o'?4:6)*s,0,0,TAU);c.fill();}
  else if(Mo==='smile'||Mo==='teeth'){c.beginPath();c.moveTo(mx-f*5*s,my-1*s);c.quadraticCurveTo(mx,my+4*s,mx+f*5*s,my-2*s);c.stroke();}
  else if(Mo==='frown'){c.beginPath();c.moveTo(mx-f*5*s,my+2*s);c.quadraticCurveTo(mx,my-3*s,mx+f*5*s,my+2*s);c.stroke();}
  else if(Mo==='smirk'){c.beginPath();c.moveTo(mx-f*4*s,my+1*s);c.quadraticCurveTo(mx+f*1*s,my+2*s,mx+f*5*s,my-3*s);c.stroke();}
  else seg(c,mx-f*4*s,my,mx+f*5*s,my);
  c.fillStyle='rgba(80,55,60,0.22)';c.beginPath();c.ellipse(mx,my+5*s,4*s,1.8*s,0,0,TAU);c.fill();
  if(o.stache){c.fillStyle='#1a1210';c.beginPath();c.ellipse(mx+f*2*s,my-5*s,6*s,2.6*s,f*-0.2,0,TAU);c.fill();}
  if(o.sweat){c.fillStyle='#a8dcff';c.strokeStyle=K2;c.lineWidth=1.8*s;const sx=-f*R*0.2,sy=-R*0.6+((t*1.4)%1)*R*0.5;c.beginPath();c.moveTo(sx,sy-8*s);c.quadraticCurveTo(sx+5*s,sy+2*s,sx,sy+4*s);c.quadraticCurveTo(sx-5*s,sy+2*s,sx,sy-8*s);c.fill();c.stroke();}
}
const _face2v=face2;
face2=function(c,o,s,f,R,t){const K=KIND2[o.kind]||{};
  if(o.view==='side'&&!o.back){profileFace(c,o,s,f,R,t);if(K.hat==='none'||!K.hat)hairLayer(c,R,s,f,o,K);return;}
  if(o.view==='front'&&!o.back){c.save();c.translate(-f*7*s,0);_face2v(c,{...o},s,f,R,t);c.restore();if(K.hat==='none'||!K.hat)hairLayer(c,R,s,f,o,K);return;}
  _face2v(c,o,s,f,R,t);if(K.hat==='none'||!K.hat)hairLayer(c,R,s,f,o,K);};
// ---- props ----
function brain(c,x,y,r,t,o={}){c.save();c.translate(x,y);const col=o.col||'#f0a0b4';const g=c.createRadialGradient(-r*0.3,-r*0.4,r*0.1,0,0,r*1.2);g.addColorStop(0,shd2(col,0.4));g.addColorStop(0.6,col);g.addColorStop(1,shd2(col,-0.35));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=r*0.05;
  const L=[[-0.55,-0.1,0.5],[-0.15,-0.4,0.55],[0.35,-0.35,0.52],[0.65,0.05,0.42],[-0.45,0.3,0.42],[0.1,0.25,0.5],[0.5,0.38,0.35]];c.beginPath();for(const [a,b,q] of L){c.moveTo(a*r+q*r,b*r);c.arc(a*r,b*r,q*r,0,TAU);}c.fill();c.stroke();
  c.fillStyle=g;for(const [a,b,q] of L){c.beginPath();c.arc(a*r,b*r,q*r-r*0.03,0,TAU);c.fill();}
  c.strokeStyle=shd2(col,-0.35);c.lineWidth=r*0.035;c.lineCap='round';for(let i=0;i<14;i++){const a=hash(i)*TAU,d=hash(i*3)*r*0.6;const px=Math.cos(a)*d*1.3,py=Math.sin(a)*d*0.8;c.beginPath();c.moveTo(px,py);c.quadraticCurveTo(px+r*0.12,py-r*0.1,px+r*0.2,py+r*0.05);c.stroke();}
  c.strokeStyle=shd2(col,-0.45);c.lineWidth=r*0.04;c.beginPath();c.moveTo(0,-r*0.8);c.quadraticCurveTo(r*0.05,0,-r*0.05,r*0.7);c.stroke();
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-r*0.35,-r*0.55,r*0.25,r*0.1,-0.4,0,TAU);c.fill();c.restore();}
// front-view bed seen from the foot; returns head anchor positions
function bedFront(c,t,cx,yh,o={}){const b=o.bounce||0,sh=Math.sin(t*22)*b;c.save();c.translate(sh*6,0);
  const hg=c.createLinearGradient(0,yh-470,0,yh+40);hg.addColorStop(0,'#5a3a24');hg.addColorStop(1,'#2a1a10');c.fillStyle=hg;c.strokeStyle=K2;c.lineWidth=8;rr(c,cx-490,yh-470+Math.abs(sh)*-10,980,540,46);c.fill();c.stroke();
  c.fillStyle='rgba(255,220,170,0.12)';rr(c,cx-460,yh-440,920,46,22);c.fill();
  for(const d of [-1,1]){c.fillStyle='#e8e4dc';c.strokeStyle=K2;c.lineWidth=6;rr(c,cx+d*220-170,yh-80+Math.abs(sh)*4,340,150,60);c.fill();c.stroke();c.fillStyle='rgba(0,0,0,0.12)';rr(c,cx+d*220-150,yh+20,300,40,20);c.fill();}
  c.restore();return {L:{x:cx-220+sh*6,y:yh},R:{x:cx+220+sh*6,y:yh}};}
function blanketFront(c,t,cx,yt,o={}){const b=o.bounce||0,sh=Math.sin(t*22)*b,cover=o.cover||0;c.save();c.translate(sh*6,0);
  const top=yt-cover*190;const g=c.createLinearGradient(0,top,0,H);g.addColorStop(0,o.col||'#8a3a4a');g.addColorStop(1,shd2(o.col||'#8a3a4a',-0.5));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=8;
  c.beginPath();c.moveTo(cx-560,H+50);c.lineTo(cx-540,top+60);for(let i=0;i<=8;i++){const x=cx-540+i*135,lump=(i===2||i===6)?(-cover*120-Math.abs(Math.sin(t*22+i))*b*70):0;c.quadraticCurveTo(x-60,top+lump+(i%2?14:-6),x,top+lump*0.6+Math.sin(t*22+i*1.7)*b*26);}
  c.lineTo(cx+560,H+50);c.closePath();c.fill();c.stroke();
  c.fillStyle='#ecebe6';c.fillRect(cx-560,top+40,1120,34);c.strokeRect(cx-560,top+40,1120,34);
  c.strokeStyle='rgba(0,0,0,0.22)';c.lineWidth=5;for(let i=0;i<6;i++){c.beginPath();c.moveTo(cx-420+i*170,top+120);c.quadraticCurveTo(cx-380+i*170+sh*20,top+400,cx-440+i*170,H);c.stroke();}
  c.fillStyle='rgba(255,220,200,0.08)';c.fillRect(cx-560,top+80,1120,60);c.restore();}
function bedroomBG(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1a2e');g.addColorStop(1,'#0c0c16');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='rgba(255,255,255,0.025)';for(let x=0;x<W;x+=90)c.fillRect(x,0,3,H);
  if(o.win!==false){const wx=o.wx??700,wy=o.wy??240;c.fillStyle='#0a0a14';c.fillRect(wx-14,wy-14,288,388);const sg=c.createLinearGradient(0,wy,0,wy+360);sg.addColorStop(0,'#1a2a50');sg.addColorStop(1,'#3a4a78');c.fillStyle=sg;c.fillRect(wx,wy,260,360);c.fillStyle='#f6f0d0';c.beginPath();c.arc(wx+180,wy+90,40,0,TAU);c.fill();c.fillStyle='#3a4a78';c.beginPath();c.arc(wx+196,wy+80,36,0,TAU);c.fill();
    for(let i=0;i<8;i++){c.fillStyle='#fff';c.fillRect(wx+20+hash(i)*220,wy+20+hash(i*3)*300,3,3);}c.fillStyle='#0a0a14';c.fillRect(wx+123,wy,14,360);c.fillRect(wx,wy+170,260,12);
    c.fillStyle='rgba(140,170,230,0.07)';c.beginPath();c.moveTo(wx,wy);c.lineTo(wx+260,wy);c.lineTo(wx-200,H);c.lineTo(wx-600,H);c.fill();}
  if(o.frame!==false){const tilt=o.frameTilt||0;c.save();c.translate(o.fx??260,o.fy??420);c.rotate(tilt);c.fillStyle='#3a2a1a';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-90,-70,180,140);c.strokeRect(-90,-70,180,140);c.fillStyle='#d8b878';c.fillRect(-70,-50,140,100);c.fillStyle='#e88a6a';c.beginPath();c.arc(-20,-5,22,0,TAU);c.arc(25,-5,22,0,TAU);c.fill();c.restore();}}
function nightLamp(c,x,y,on,t,wob=0){c.save();c.translate(x,y);c.rotate(Math.sin(t*25)*wob*0.08);c.fillStyle='#3a2a1a';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-70,0,140,24);c.strokeRect(-70,0,140,24);c.fillStyle='#2a2a2a';c.fillRect(-8,-110,16,110);
  c.fillStyle=on?'#ffd890':'#6a5a40';c.beginPath();c.moveTo(-70,-110);c.lineTo(70,-110);c.lineTo(45,-200);c.lineTo(-45,-200);c.closePath();c.fill();c.stroke();c.restore();
  if(on){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-150,0,x,y-150,520);g.addColorStop(0,'rgba(255,200,120,0.35)');g.addColorStop(1,'rgba(255,180,100,0)');c.fillStyle=g;c.fillRect(x-520,y-670,1040,1040);c.restore();}}
function zzz(c,x,y,t,s=1){for(let i=0;i<3;i++){const p=((t*0.7+i/3)%1);c.save();c.globalAlpha=Math.sin(p*Math.PI);txt(c,'Z',x+p*90*s+i*10,y-p*160*s,(40+i*14)*s,'#fff',{sw:8*s});c.restore();}}
function snoreBubble(c,x,y,t,s=1){const r=(22+Math.max(0,Math.sin(t*3))*30)*s;c.save();c.fillStyle='rgba(200,230,255,0.55)';c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=3*s;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.8)';c.beginPath();c.arc(x-r*0.35,y-r*0.35,r*0.18,0,TAU);c.fill();c.restore();}

// hair as its own layer sitting on top of the head: volume past the outline, fringe tufts, highlight band
function hairLayer(c,R,s,f,o,K){const col=K.hair||'#3a2a20',vw=o.back?'back':(o.view||'3q');c.save();
  const g=c.createLinearGradient(0,-R*1.25,0,R*0.3);g.addColorStop(0,shd2(col,0.22));g.addColorStop(0.6,col);g.addColorStop(1,shd2(col,-0.35));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4.2*s;c.lineJoin='round';
  const T=R*1.14;c.beginPath();
  if(vw==='front'){c.moveTo(-R*1.06,R*0.05);c.quadraticCurveTo(-R*1.2,-T*0.9,0,-T);c.quadraticCurveTo(R*1.2,-T*0.9,R*1.06,R*0.05);c.quadraticCurveTo(R*0.92,-R*0.35,R*0.72,-R*0.42);
    for(let i=0;i<5;i++){const x0=R*0.72-i*R*0.36,x1=x0-R*0.36;c.quadraticCurveTo(x0-R*0.1,-R*0.2+(i%2)*R*0.06,x0-R*0.18,-R*0.5);c.quadraticCurveTo(x1+R*0.08,-R*0.38,x1,-R*0.44);}
    c.quadraticCurveTo(-R*0.92,-R*0.35,-R*1.06,R*0.05);}
  else if(vw==='side'){c.moveTo(f*R*0.62,-R*0.62);c.quadraticCurveTo(f*R*0.9,-T*0.85,f*R*0.1,-T);c.quadraticCurveTo(-f*R*1.25,-T*0.85,-f*R*1.1,R*0.25);c.quadraticCurveTo(-f*R*0.9,R*0.62,-f*R*0.45,R*0.55);c.quadraticCurveTo(-f*R*0.2,R*0.15,-f*R*0.12,-R*0.15);
    c.quadraticCurveTo(f*R*0.05,-R*0.5,f*R*0.3,-R*0.45);c.quadraticCurveTo(f*R*0.45,-R*0.62,f*R*0.62,-R*0.62);}
  else if(vw==='back'){c.moveTo(-R*1.08,R*0.2);c.quadraticCurveTo(-R*1.22,-T*0.9,0,-T);c.quadraticCurveTo(R*1.22,-T*0.9,R*1.08,R*0.2);c.quadraticCurveTo(R*0.75,R*0.72,0,R*0.7);c.quadraticCurveTo(-R*0.75,R*0.72,-R*1.08,R*0.2);}
  else{c.moveTo(-f*R*1.08,R*0.25);c.quadraticCurveTo(-f*R*1.24,-T*0.9,f*R*0.05,-T);c.quadraticCurveTo(f*R*1.15,-T*0.85,f*R*1.02,-R*0.2);c.quadraticCurveTo(f*R*0.8,-R*0.42,f*R*0.55,-R*0.4);
    c.quadraticCurveTo(f*R*0.4,-R*0.22,f*R*0.22,-R*0.48);c.quadraticCurveTo(f*R*0.02,-R*0.3,-f*R*0.18,-R*0.52);c.quadraticCurveTo(-f*R*0.4,-R*0.35,-f*R*0.55,-R*0.5);c.quadraticCurveTo(-f*R*0.7,-R*0.1,-f*R*0.72,R*0.18);c.quadraticCurveTo(-f*R*0.9,R*0.32,-f*R*1.08,R*0.25);}
  c.closePath();c.fill();c.stroke();
  c.save();c.clip();c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(-L2.dx*R*0.75,0,R*0.6,R*1.3,0,0,TAU);c.fill();
  c.strokeStyle='rgba(255,235,210,0.45)';c.lineWidth=5*s;c.lineCap='round';c.beginPath();c.arc(L2.dx*R*0.05,-R*0.05,R*0.85,L2.dx>0?-2.1:-2.4,L2.dx>0?-0.7:-1.0);c.stroke();
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2*s;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*R*0.3,-T*0.95);c.quadraticCurveTo(i*R*0.42,-R*0.6,i*R*0.36,-R*0.2);c.stroke();}c.restore();
  c.strokeStyle=L2.rim;c.lineWidth=2.6*s;c.globalAlpha=0.7;c.beginPath();c.arc(0,-R*0.1,T*0.98,L2.dx>0?-1.4:Math.PI+0.2,L2.dx>0?-0.2:Math.PI+1.4);c.stroke();c.restore();}
