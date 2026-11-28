'use strict';
// ===== Style 5 modern hair, built the Style 4 way: smooth glossy sculpted volumes, hard cel shadow, crisp shine spots, no strand lines =====
function hairGrad(c,R,col){const g=c.createLinearGradient(0,-R*1.45,0,R*1.2);g.addColorStop(0,shd(col,0.28));g.addColorStop(0.35,col);g.addColorStop(1,shd(col,-0.42));return g;}
function shine(c,x,y,rx,ry,rot,a=0.9){c.fillStyle=`rgba(255,246,236,${a})`;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);c.fill();}
function celIn(c,shape,fn){c.save();shape();c.clip();fn();c.restore();}
const _hairS5=hairLayer;
hairLayer=function(c,R,s,f,o,K){
  const vf=o.view==='front'?0.3:1,ln=f*vf,col=K.hair||'#4a3020',dx=L2.dx||1;
  if(K.hair4==='swoop'){c.save();
    const cap=()=>{c.beginPath();c.moveTo(-R*1.05,R*0.02);c.bezierCurveTo(-R*1.12,-R*0.95,-R*0.55,-R*1.2,R*0.05,-R*1.18);c.bezierCurveTo(R*0.62,-R*1.18,R*1.12,-R*0.9,R*1.05,R*0.02);
      c.quadraticCurveTo(R*0.98,-R*0.36,R*0.78,-R*0.5);c.lineTo(-R*0.7,-R*0.52);c.quadraticCurveTo(-R*0.98,-R*0.36,-R*1.05,R*0.02);c.closePath();};
    // big swept fringe: one sculpted volume sweeping from the crown across the forehead, tip curling down at one side
    const fr=()=>{c.beginPath();c.moveTo(-R*0.95,-R*0.62);c.bezierCurveTo(-R*0.7,-R*1.35,R*0.6,-R*1.42,R*1.02,-R*0.7);c.bezierCurveTo(R*1.08,-R*0.5,R*0.98,-R*0.22,R*0.78,-R*0.12);
      c.bezierCurveTo(R*0.8,-R*0.36,R*0.6,-R*0.5,R*0.3,-R*0.46);c.bezierCurveTo(R*0.0,-R*0.42,-R*0.4,-R*0.5,-R*0.62,-R*0.42);c.bezierCurveTo(-R*0.8,-R*0.38,-R*0.95,-R*0.48,-R*0.95,-R*0.62);c.closePath();};
    const tuft=()=>{c.beginPath();c.moveTo(-R*0.35,-R*1.1);c.quadraticCurveTo(-R*0.3,-R*1.38,R*0.05,-R*1.36);c.quadraticCurveTo(-R*0.08,-R*1.24,R*0.0,-R*1.12);c.closePath();};
    const burn=sd=>()=>{c.beginPath();c.moveTo(sd*R*1.0,-R*0.3);c.quadraticCurveTo(sd*R*1.05,R*0.05,sd*R*0.9,R*0.16);c.lineTo(sd*R*0.82,R*0.02);c.quadraticCurveTo(sd*R*0.86,-R*0.14,sd*R*0.82,-R*0.36);c.closePath();};
    c.save();c.scale(ln<0?-1:1,1);const shp=[cap,fr,tuft,burn(-1),burn(1)];unionShapes(c,shp,s,hairGrad(c,R,col),4.5*s);
    celIn(c,cap,()=>{c.fillStyle='rgba(8,4,10,0.45)';c.beginPath();c.ellipse(-dx*R*0.75,-R*0.25,R*0.65,R*0.95,0,0,TAU);c.fill();});
    celIn(c,fr,()=>{c.fillStyle='rgba(8,4,10,0.42)';c.beginPath();c.ellipse(-R*0.1,-R*0.3,R*1.1,R*0.26,0.05,0,TAU);c.fill();c.fillStyle='rgba(255,220,190,0.14)';c.beginPath();c.ellipse(R*0.2,-R*1.1,R*0.8,R*0.28,0.1,0,TAU);c.fill();});
    c.strokeStyle='rgba(8,4,10,0.7)';c.lineWidth=2.4*s;c.lineCap='round';c.beginPath();c.moveTo(-R*0.55,-R*0.9);c.bezierCurveTo(-R*0.1,-R*1.18,R*0.5,-R*1.12,R*0.88,-R*0.62);c.stroke();
    c.beginPath();c.moveTo(R*0.1,-R*0.62);c.quadraticCurveTo(R*0.55,-R*0.72,R*0.82,-R*0.32);c.stroke();
    shine(c,R*0.0+dx*R*0.1,-R*1.08,R*0.24,R*0.06,-0.1);shine(c,R*0.55,-R*0.86,R*0.12,R*0.045,-0.7);shine(c,dx*R*0.82,-R*0.45,R*0.07,R*0.15,dx*0.4,0.5);
    c.restore();c.restore();return;}
  if(K.hair4==='longG'){c.save();
    // crown with a soft centre part, two curtain bangs framing the face
    const cap=()=>{c.beginPath();c.moveTo(-R*1.06,R*0.1);c.bezierCurveTo(-R*1.14,-R*0.95,-R*0.58,-R*1.22,0,-R*1.2);c.bezierCurveTo(R*0.58,-R*1.22,R*1.14,-R*0.95,R*1.06,R*0.1);
      c.quadraticCurveTo(R*0.98,-R*0.3,R*0.8,-R*0.5);c.lineTo(-R*0.8,-R*0.5);c.quadraticCurveTo(-R*0.98,-R*0.3,-R*1.06,R*0.1);c.closePath();};
    const bang=sd=>()=>{c.beginPath();c.moveTo(sd*R*0.04,-R*1.12);c.bezierCurveTo(sd*R*0.5,-R*1.05,sd*R*0.9,-R*0.7,sd*R*0.98,-R*0.1);c.bezierCurveTo(sd*R*1.0,R*0.3,sd*R*0.98,R*0.7,sd*R*1.06,R*1.05);
      c.bezierCurveTo(sd*R*0.92,R*0.8,sd*R*0.82,R*0.4,sd*R*0.8,R*0.0);c.bezierCurveTo(sd*R*0.76,-R*0.42,sd*R*0.5,-R*0.62,sd*R*0.04,-R*0.72);c.closePath();};
    const shp=[cap,bang(-1),bang(1)];unionShapes(c,shp,s,hairGrad(c,R,col),4.5*s);
    for(const sd of [-1,1])celIn(c,bang(sd),()=>{c.fillStyle=sd===-dx?'rgba(8,4,12,0.42)':'rgba(8,4,12,0.2)';c.beginPath();c.ellipse(sd*R*0.82,R*0.3,R*0.22,R*0.95,0,0,TAU);c.fill();});
    celIn(c,cap,()=>{c.fillStyle='rgba(8,4,12,0.3)';c.beginPath();c.ellipse(0,-R*0.45,R*0.85,R*0.22,0,0,TAU);c.fill();});
    c.strokeStyle='rgba(8,4,12,0.75)';c.lineWidth=2.6*s;c.lineCap='round';c.beginPath();c.moveTo(0,-R*1.18);c.quadraticCurveTo(R*0.02,-R*0.95,0,-R*0.74);c.stroke();
    for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*R*0.3,-R*0.9);c.quadraticCurveTo(sd*R*0.78,-R*0.6,sd*R*0.88,R*0.1);c.stroke();}
    // anime gloss halo across the crown
    for(const [x,w,r] of [[-0.5,0.13,0.55],[-0.18,0.15,0.18],[0.18,0.15,-0.18],[0.5,0.13,-0.55]])shine(c,x*R,-R*0.9+Math.abs(x)*R*0.25,w*R,R*0.045,r,0.85);
    shine(c,dx*R*0.92,R*0.35,R*0.05,R*0.2,0,0.45);
    c.restore();return;}
  if(K.hair4==='crew'||K.hair4==='part'||K.hair4==='bald'){c.save();const sd=K.hair4==='part'?1:0;
    const cap=K.hair4==='bald'?null:K.hair4==='crew'?()=>{c.beginPath();c.moveTo(-R*1.02,-R*0.05);c.bezierCurveTo(-R*1.06,-R*0.8,-R*0.75,-R*1.12,-R*0.3,-R*1.14);c.lineTo(R*0.3,-R*1.14);c.bezierCurveTo(R*0.75,-R*1.12,R*1.06,-R*0.8,R*1.02,-R*0.05);c.quadraticCurveTo(R*0.95,-R*0.45,R*0.75,-R*0.6);c.lineTo(-R*0.75,-R*0.6);c.quadraticCurveTo(-R*0.95,-R*0.45,-R*1.02,-R*0.05);c.closePath();}
      :()=>{c.beginPath();c.moveTo(-R*1.04,R*0.0);c.bezierCurveTo(-R*1.12,-R*0.9,-R*0.6,-R*1.24,R*0.05,-R*1.22);c.bezierCurveTo(R*0.7,-R*1.22,R*1.12,-R*0.9,R*1.04,R*0.0);c.quadraticCurveTo(R*0.96,-R*0.42,R*0.72,-R*0.62);c.bezierCurveTo(R*0.3,-R*0.72,-R*0.2,-R*0.82,-R*0.45,-R*0.62);c.quadraticCurveTo(-R*0.9,-R*0.5,-R*1.04,R*0.0);c.closePath();};
    const sides=sd2=>()=>{c.beginPath();c.moveTo(sd2*R*0.88,-R*0.62);c.bezierCurveTo(sd2*R*1.12,-R*0.5,sd2*R*1.1,-R*0.0,sd2*R*0.98,R*0.14);c.lineTo(sd2*R*0.86,R*0.0);c.quadraticCurveTo(sd2*R*0.86,-R*0.3,sd2*R*0.72,-R*0.5);c.closePath();};
    const shp=K.hair4==='bald'?[sides(-1),sides(1)]:[cap,sides(-1),sides(1)];unionShapes(c,shp,s,hairGrad(c,R,col),4.5*s);
    if(cap)celIn(c,cap,()=>{c.fillStyle='rgba(8,4,10,0.35)';c.beginPath();c.ellipse(-dx*R*0.8,-R*0.4,R*0.55,R*0.8,0,0,TAU);c.fill();});
    c.strokeStyle='rgba(8,4,10,0.65)';c.lineWidth=2.4*s;c.lineCap='round';if(K.hair4==='part'){c.beginPath();c.moveTo(-R*0.42,-R*0.66);c.quadraticCurveTo(-R*0.5,-R*0.95,-R*0.38,-R*1.18);c.stroke();c.beginPath();c.moveTo(-R*0.2,-R*0.72);c.bezierCurveTo(R*0.1,-R*1.1,R*0.6,-R*1.05,R*0.92,-R*0.5);c.stroke();}
    if(K.hair4==='crew'){for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*R*0.2,-R*1.12);c.lineTo(i*R*0.22,-R*0.95);c.stroke();}}
    if(K.hair4==='bald'){c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-dx*R*0.25,-R*0.78,R*0.3,R*0.1,-0.3,0,TAU);c.fill();}
    else{shine(c,R*0.0+dx*R*0.15,-R*1.05,R*0.26,R*0.055,-0.08);shine(c,R*0.55*dx,-R*0.85,R*0.1,R*0.04,-0.6*dx,0.8);}
    c.restore();return;}
  return _hairS5(c,R,s,f,o,K);};
// back mass for long hair (behind the head, falls past the shoulders)
const _longS5=longHair2;
longHair2=function(c,hc,s,f,o,K,HR){if(K.hair4!=='longG')return _longS5(c,hc,s,f,o,K,HR);const R=HR*s,col=shd(K.hair||'#3a2230',-0.12),dx=L2.dx||1;c.save();c.translate(hc.x,hc.y);c.rotate((o.tilt||0)*f);
  const sw=Math.sin((CUR.t||0)*1.6)*R*0.03;const back=()=>{c.beginPath();c.moveTo(-R*1.0,-R*0.6);c.bezierCurveTo(-R*1.3,-R*0.1,-R*1.26,R*0.9,-R*1.2+sw,R*1.38);c.quadraticCurveTo(-R*0.95,R*1.5,-R*0.7,R*1.3);
    c.lineTo(R*0.7,R*1.3);c.quadraticCurveTo(R*0.95,R*1.5,R*1.2+sw,R*1.38);c.bezierCurveTo(R*1.26,R*0.9,R*1.3,-R*0.1,R*1.0,-R*0.6);c.closePath();};
  unionShapes(c,[back],s,hairGrad(c,R,col),4.5*s);celIn(c,back,()=>{c.fillStyle='rgba(8,4,12,0.45)';c.beginPath();c.ellipse(-dx*R*1.0,R*0.9,R*0.45,R*1.4,0,0,TAU);c.fill();c.fillStyle='rgba(8,4,12,0.3)';c.fillRect(-R*1.4,R*1.1,R*2.8,R*0.6);});
  shine(c,dx*R*1.08,R*0.55,R*0.05,R*0.25,dx*0.1,0.45);c.restore();};
