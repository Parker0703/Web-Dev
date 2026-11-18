'use strict';
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
