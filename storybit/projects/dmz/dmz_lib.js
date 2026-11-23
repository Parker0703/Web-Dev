'use strict';
// ===================== DMZ 1976 · props: the poplar, helicopters, B-52, M35 truck, chainsaw, axe =====================
// ---- the poplar: ~30 m tall broad tree. Drawn in 2D at its projected base so it can be trimmed, cut and felled ----
const POP=(()=>{const L=[];// limbs: [x0,y0,x1,y1,w] in metres (y up), clumps: [x,y,r,shade,limbIndex]
  const limbs=[[0,0,0,11,1.3],[0,3.4,-4.8,5.2,0.32],[0,10,-5,20,0.6],[0,10,0.5,24,0.65],[0,10,5.5,19,0.6],[-5,20,-8,25,0.3],[0.5,24,-2,29,0.3],[0.5,24,3,28.5,0.3],[5.5,19,9,23,0.3],[-2,14,-7,15,0.25],[2,13,7,13.5,0.25]];
  const C=[];const add=(x,y,r,l)=>C.push([x,y,r,hash(C.length*3.7),l]);
  limbs.forEach((L,li)=>{if(li===0)return;const [x0,y0,x1,y1,w]=L;const n=li===1?4:7;for(let k=0;k<n;k++){const u=0.35+0.65*k/(n-1);add(lerp(x0,x1,u)+(hash(li*9+k)-0.5)*2.4,lerp(y0,y1,u)+(hash(li*7+k*3)-0.3)*2.2,(li===1?1.2:1.4)+hash(li+k*5)*0.8,li);}});
  for(let k=0;k<60;k++){const a=hash(k*4.1)*Math.PI*1.1-0.05,r=3+hash(k*2.9)*7.5;add(Math.cos(a)*r*1.1,17+Math.sin(a)*r*1.15,1.4+hash(k*1.3)*1.0,99);}
  return {limbs,C};})();
function poplar(c,base,Hm,t,o={}){// base: projected ground point {x,y}, Hm: pixels per metre
  const u=Hm,trim=o.trim||0,cut=o.cut||0,fall=o.fall||0;c.save();c.translate(base.x,base.y);c.lineJoin='round';c.lineCap='round';
  // contact shadow
  c.fillStyle='rgba(20,30,10,0.35)';c.beginPath();c.ellipse(4*u,2,(fall>0?6:10)*u,1.4*u,0,0,TAU);c.fill();
  if(o.stump){stumpDraw(c,u,o.stumpH??6);c.restore();return;}
  c.rotate(fall*(o.fallDir??1));const sw=Math.sin(t*1.1)*0.006*(1-fall);
  const P=(x,y)=>[x*u+y*u*sw*y*0.04,-y*u];
  // limbs (bark), trimmed limbs end in pale cut stubs
  const gone=(l)=>trim>0&&(l===1)&&trim>0.5;
  POP.limbs.forEach((L,i)=>{const [x0,y0,x1,y1,w]=L;const g2=gone(i);const ex=g2?lerp(x0,x1,0.25):x1,ey=g2?lerp(y0,y1,0.25):y1;const a=P(x0,y0),b=P(ex,ey);
    c.lineCap=i===0?'butt':'round';c.strokeStyle=OL;c.lineWidth=(w*u)+6;seg(c,a[0],a[1],b[0],b[1]);c.strokeStyle='#6e5e4a';c.lineWidth=w*u;seg(c,a[0],a[1],b[0],b[1]);c.lineCap='round';
    if(i===0){c.fillStyle='#6e5e4a';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.moveTo(-1.15*u,0);c.quadraticCurveTo(-0.66*u,-0.3*u,-0.62*u,-1.2*u);c.lineTo(0.62*u,-1.2*u);c.quadraticCurveTo(0.66*u,-0.3*u,1.15*u,0);c.quadraticCurveTo(0,0.12*u,-1.15*u,0);c.closePath();c.fill();c.stroke();}if(i===0)c.lineCap='butt';c.strokeStyle='rgba(255,240,210,0.18)';c.lineWidth=w*u*0.3;seg(c,a[0]-w*u*0.25,a[1],b[0]-w*u*0.25,b[1]);c.lineCap='round';
    if(g2){c.fillStyle='#e8d8b0';c.strokeStyle=OL;c.lineWidth=2;c.beginPath();c.ellipse(b[0],b[1],w*u*0.5,w*u*0.3,Math.atan2(b[1]-a[1],b[0]-a[0])+Math.PI/2,0,TAU);c.fill();c.stroke();}});
  // bark texture on the trunk
  c.strokeStyle='rgba(40,30,20,0.4)';c.lineWidth=2;for(let i=0;i<7;i++){const x=(-0.5+i*0.16)*u;c.beginPath();c.moveTo(x,-0.2*u);for(let y=1;y<11;y+=1.5)c.lineTo(x+Math.sin(y+i)*0.06*u,-y*u);c.stroke();}
  // foliage clumps: outline pass, then shaded fill, highlight on the sun side
  const vis=POP.C.filter(q=>!gone(q[4]));const wob=(i)=>Math.sin(t*1.7+i)*0.15*u*(1-fall);
  const scallop=(cx,cy,R,sd,pad)=>{c.beginPath();const n=Math.max(9,Math.round(R/9));for(let k=0;k<=n;k++){const a=k/n*TAU,a2=(k+0.5)/n*TAU,rr=R*(0.92+0.1*hash(sd+k));const px=cx+Math.cos(a)*(rr+pad),py=cy+Math.sin(a)*(rr+pad);if(k===0)c.moveTo(px,py);else c.quadraticCurveTo(cx+Math.cos(a2-Math.PI/n)*(R*1.12+pad),cy+Math.sin(a2-Math.PI/n)*(R*1.12+pad),px,py);}c.closePath();};
  for(const [x,y,r,h,l] of vis){const p=P(x,y);c.fillStyle=OL;scallop(p[0]+wob(x),p[1],r*u,h*50,4);c.fill();}
  for(const [x,y,r,h,l] of vis){const p=P(x,y),cx=p[0]+wob(x),cy=p[1],R=r*u;const g=c.createRadialGradient(cx-R*0.35,cy-R*0.4,R*0.1,cx,cy,R);g.addColorStop(0,['#8ab04a','#7aa040','#94b854'][Math.floor(h*3)]);g.addColorStop(1,['#3e6424','#355a1e','#466e2a'][Math.floor(h*3)]);c.fillStyle=g;scallop(cx,cy,R,h*50,0);c.fill();
    // leaf detail: small leaf dabs, light on the sun side, dark underneath
    const n=Math.min(46,Math.max(8,Math.round(R/6)));for(let k=0;k<n;k++){const a=hash(h*31+k*1.7)*TAU,rr=Math.sqrt(hash(h*17+k*2.3))*R*0.85,lx=cx+Math.cos(a)*rr,ly=cy+Math.sin(a)*rr,lit=(lx-cx)*-0.6+(ly-cy)*-0.8>0;
      c.fillStyle=lit?'rgba(190,220,120,0.5)':'rgba(25,45,12,0.35)';c.save();c.translate(lx,ly);c.rotate(a+Math.sin(t*2+k)*0.2*(1-fall));c.beginPath();c.ellipse(0,0,Math.max(2,R*0.09),Math.max(1.2,R*0.045),0,0,TAU);c.fill();c.restore();}}
  for(const [x,y,r,h] of vis){const p=P(x,y);c.fillStyle='rgba(30,50,15,0.0)';for(let k=0;k<0;k++){const a=h*7+k*1.3;c.beginPath();c.arc(p[0]+wob(x)+Math.cos(a)*r*u*0.5,p[1]+Math.sin(a)*r*u*0.45,r*u*0.16,0,TAU);c.fill();}}
  // the chainsaw cut: a notch in the trunk with pale wood + sawdust
  if(cut>0){const y=-1.0*u,d=cut*1.1*u;c.fillStyle='#e8d8b0';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.moveTo(-0.65*u,y-0.25*u);c.lineTo(-0.65*u+d,y);c.lineTo(-0.65*u,y+0.2*u);c.closePath();c.fill();c.stroke();}
  c.restore();}
function stumpDraw(c,u,h){c.fillStyle=OL;c.fillRect(-0.75*u,-h*u-3,1.5*u,h*u+3);const g=c.createLinearGradient(-0.7*u,0,0.7*u,0);g.addColorStop(0,'#4a3e30');g.addColorStop(0.35,'#7e6c56');g.addColorStop(1,'#3e3428');c.fillStyle=g;c.fillRect(-0.68*u,-h*u,1.36*u,h*u);
  c.fillStyle='#e0cfa6';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.ellipse(0,-h*u,0.7*u,0.22*u,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(120,90,50,0.6)';c.lineWidth=1.5;for(let r=1;r<5;r++){c.beginPath();c.ellipse(0,-h*u,0.15*u*r,0.05*u*r,0,0,TAU);c.stroke();}}
// ---- helicopters (side view, f = facing) ----
function huey(c,x,y,s,t,f=1,o={}){c.save();c.translate(x,y);c.scale(f*s,s);c.lineJoin='round';const ol='#4a5236';c.strokeStyle=OL;c.lineWidth=5;
  c.fillStyle=ol;c.beginPath();c.moveTo(-330,-40);c.lineTo(-90,-60);c.lineTo(-60,-110);c.lineTo(120,-118);c.quadraticCurveTo(220,-110,236,-40);c.quadraticCurveTo(230,10,150,14);c.lineTo(-70,14);c.lineTo(-330,-20);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(-320,-36);c.lineTo(-360,-110);c.lineTo(-330,-110);c.lineTo(-290,-36);c.closePath();c.fill();c.stroke();
  c.fillStyle='#8ab0c8';c.beginPath();c.moveTo(140,-104);c.quadraticCurveTo(210,-96,224,-44);c.lineTo(150,-44);c.closePath();c.fill();c.stroke();c.fillStyle='#2a3020';c.fillRect(20,-96,70,56);c.strokeRect(20,-96,70,56);c.fillRect(-60,-96,60,56);c.strokeRect(-60,-96,60,56);
  c.fillStyle='#3a4228';c.fillRect(-60,-140,150,24);c.strokeRect(-60,-140,150,24);c.save();c.scale(f,1);c.fillStyle='#f2f2f2';c.font='700 22px "Inter Display"';c.textAlign='center';c.fillText('U.S. ARMY',f*-190,-30);c.restore();
  c.strokeStyle=OL;c.lineWidth=6;seg(c,-40,14,-40,40);seg(c,130,14,130,40);seg(c,-90,42,200,42);c.strokeStyle='#2a2a2a';c.lineWidth=3;seg(c,-90,42,200,42);
  // tail rotor + main rotor blur, two blades flicking
  c.save();c.translate(-345,-100);c.globalAlpha=0.45;c.fillStyle='#2a2a2a';c.beginPath();c.ellipse(0,0,10,46,0,0,TAU);c.fill();c.restore();
  c.save();c.globalAlpha=0.28;c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(15,-150,420,16,0,0,TAU);c.fill();c.restore();const ph=(t*14)%1;c.strokeStyle='#1a1a1a';c.lineWidth=6;seg(c,15-420*Math.cos(ph*Math.PI),-150,15+420*Math.cos(ph*Math.PI),-150);seg(c,15,-150,15,-140);c.restore();}
function cobra(c,x,y,s,t,f=1){c.save();c.translate(x,y);c.scale(f*s,s);c.lineJoin='round';const ol='#3e4630';c.strokeStyle=OL;c.lineWidth=5;
  c.fillStyle=ol;c.beginPath();c.moveTo(-360,-50);c.lineTo(-60,-40);c.lineTo(-20,-90);c.lineTo(150,-80);c.quadraticCurveTo(230,-60,240,-30);c.lineTo(200,-14);c.lineTo(-60,-14);c.lineTo(-360,-34);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(-350,-48);c.lineTo(-390,-120);c.lineTo(-360,-120);c.lineTo(-320,-46);c.closePath();c.fill();c.stroke();
  c.fillStyle='#8ab0c8';c.beginPath();c.moveTo(40,-84);c.quadraticCurveTo(150,-110,214,-52);c.lineTo(60,-52);c.closePath();c.fill();c.stroke();seg(c,120,-90,120,-52);
  c.fillStyle='#2a2e24';c.fillRect(-30,-24,140,16);c.strokeRect(-30,-24,140,16);for(const k of [0,1]){c.fillStyle='#3a3a34';c.beginPath();c.roundRect(-20+k*80,-8,60,22,10);c.fill();c.stroke();}
  c.fillStyle='#1a1a1a';c.beginPath();c.arc(200,-8,14,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=5;seg(c,200,-8,250,-4);
  c.save();c.globalAlpha=0.28;c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(0,-110,400,14,0,0,TAU);c.fill();c.restore();const ph=(t*15)%1;c.strokeStyle='#1a1a1a';c.lineWidth=6;seg(c,-400*Math.cos(ph*Math.PI),-110,400*Math.cos(ph*Math.PI),-110);seg(c,0,-110,0,-88);
  c.save();c.translate(-375,-110);c.globalAlpha=0.45;c.fillStyle='#2a2a2a';c.beginPath();c.ellipse(0,0,8,40,0,0,TAU);c.fill();c.restore();c.restore();}
// ---- B-52 in plan view (seen from below), heading ang ----
function b52(c,x,y,s,ang=0,o={}){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;const col=o.col||'#8a9098';
  if(o.trail){c.save();c.strokeStyle='rgba(255,255,255,0.45)';c.lineCap='round';for(const wx of [-220,-140,140,220]){c.lineWidth=14;seg(c,wx,40,wx,1400);}c.restore();}
  c.fillStyle=col;c.beginPath();c.moveTo(0,-330);c.quadraticCurveTo(26,-300,24,-200);c.lineTo(24,240);c.lineTo(0,300);c.lineTo(-24,240);c.lineTo(-24,-200);c.quadraticCurveTo(-26,-300,0,-330);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(24,-80);c.lineTo(370,60);c.lineTo(370,90);c.lineTo(24,20);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-24,-80);c.lineTo(-370,60);c.lineTo(-370,90);c.lineTo(-24,20);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(20,210);c.lineTo(120,270);c.lineTo(120,290);c.lineTo(16,260);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-20,210);c.lineTo(-120,270);c.lineTo(-120,290);c.lineTo(-16,260);c.closePath();c.fill();c.stroke();
  c.fillStyle='#5a6068';for(const wx of [-220,-140,140,220]){c.beginPath();c.roundRect(wx-16,-40+Math.abs(wx)*0.42-70,32,80,8);c.fill();c.stroke();}c.restore();}
// ---- M35 "deuce and a half" truck (3D projected solid) ----
function m35Parts(o={}){const P=[],ol='#4a5236',dk='#22261a',can='#5a6240';P.push(P_box(-3.4,1.2,0.9,1.35,-1.1,1.1,dk));P.push(P_box(-3.4,0.9,1.35,2.05,-1.2,1.2,ol));
  if(!o.open)P.push(P_hex([[-3.4,2.05,-1.2],[0.9,2.05,-1.2],[0.9,3.3,-1.15],[-3.4,3.3,-1.15],[-3.4,2.05,1.2],[0.9,2.05,1.2],[0.9,3.3,1.15],[-3.4,3.3,1.15]],can));
  P.push(P_box(1.2,2.7,0.95,2.6,-1.05,1.05,ol));P.push(P_box(2.7,3.7,0.95,1.75,-0.9,0.9,ol));P.push(P_poly([[2.71,2.0,-0.9],[2.71,2.0,0.9],[2.71,2.5,0.9],[2.71,2.5,-0.9]],'#33414c'));
  for(const sz of [-1,1]){P.push(P_poly([[1.5,1.8,sz*1.06],[2.5,1.8,sz*1.06],[2.5,2.5,sz*1.06],[1.5,2.5,sz*1.06]],'#33414c'));for(const wx of [3.1,-1.2,-2.6]){P.push(P_disc(wx,0.55,sz*1.12,0.55,'#1a1a1a',{bias:0.4,a0:o.spin||0}));P.push(P_disc(wx,0.55,sz*1.13,0.22,'#4a4a3a',{bias:0.45,n:6,a0:o.spin||0,lw:0.6}));}
    if(!o.open)P.push(P_poly([[-1.5,2.4,sz*1.205],[-0.2,2.4,sz*1.205],[-0.2,2.9,sz*1.18],[-1.5,2.9,sz*1.18]],'#e8e8e0',{lw:0.4}));}
  return P;}
// ---- hand props ----
function chainsaw(c,x,y,s,ang,t,on=true){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4;const v=on?Math.sin(t*90)*1.5:0;c.translate(v,0);
  c.fillStyle='#c8c8c4';c.beginPath();c.roundRect(30,-10,150,20,10);c.fill();c.stroke();c.strokeStyle='#3a3a3a';c.lineWidth=2;c.setLineDash([6,5]);c.lineDashOffset=on?-t*400:0;c.beginPath();c.roundRect(32,-9,146,18,9);c.stroke();c.setLineDash([]);
  c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#e07a1a';c.beginPath();c.roundRect(-70,-34,104,62,14);c.fill();c.stroke();c.fillStyle='#3a3a3a';c.beginPath();c.roundRect(-90,-46,40,18,6);c.fill();c.stroke();c.beginPath();c.roundRect(-40,-50,40,14,6);c.fill();c.stroke();c.restore();}
function axe(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineCap='round';c.strokeStyle=OL;c.lineWidth=12;seg(c,0,40,0,-150);c.strokeStyle='#a87a4a';c.lineWidth=7;seg(c,0,40,0,-150);
  c.fillStyle='#8a8e94';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(-6,-150);c.lineTo(46,-170);c.quadraticCurveTo(56,-140,46,-112);c.lineTo(-6,-128);c.closePath();c.fill();c.stroke();c.fillStyle='#d8dce0';c.beginPath();c.moveTo(40,-166);c.quadraticCurveTo(50,-140,40,-116);c.lineTo(46,-112);c.quadraticCurveTo(56,-140,46,-170);c.closePath();c.fill();c.restore();}
function sawdust(c,t,x,y,s,dir=1,a=1){for(let i=0;i<18;i++){const ph=(t*2.4+hash(i*1.7))%1;const px=x+dir*ph*(80+hash(i)*120)*s,py=y-ph*60*s+ph*ph*160*s;c.fillStyle=`rgba(240,220,170,${a*(1-ph)})`;c.fillRect(px,py,(3+hash(i*3)*4)*s,(3+hash(i*5)*4)*s);}}
