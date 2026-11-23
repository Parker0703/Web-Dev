// ===== pro graphics: cleaner brain, glass panels, gauges, charts, pills; layered hair =====
const _hairLayer1=hairLayer;
hairLayer=function(c,R,s,f,o,K){const col=K.hair||'#3a2a20',vw=o.back?'back':(o.view||'3q');
  // 1) under-layer: darker mass a little wider/lower, gives the hair thickness
  c.save();c.fillStyle=shd2(col,-0.45);c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();
  if(vw==='front'||vw==='back'){c.moveTo(-R*1.12,R*(vw==='back'?0.35:0.15));c.quadraticCurveTo(-R*1.3,-R*1.32,0,-R*1.22);c.quadraticCurveTo(R*1.3,-R*1.32,R*1.12,R*(vw==='back'?0.35:0.15));c.quadraticCurveTo(R*1.0,-R*0.1,R*0.8,-R*0.3);c.lineTo(-R*0.8,-R*0.3);c.quadraticCurveTo(-R*1.0,-R*0.1,-R*1.12,R*0.15);}
  else{c.moveTo(-f*R*1.14,R*0.4);c.quadraticCurveTo(-f*R*1.34,-R*1.3,f*R*0.1,-R*1.22);c.quadraticCurveTo(f*R*1.2,-R*1.15,f*R*1.04,-R*0.3);c.lineTo(-f*R*0.6,-R*0.3);c.quadraticCurveTo(-f*R*0.75,R*0.2,-f*R*0.7,R*0.4);c.closePath();}
  c.fill();c.stroke();c.restore();
  // 2) main layer
  _hairLayer1(c,R,s,f,o,K);
  if(vw==='back')return;
  // 3) swept front locks layered over the fringe (pointed tips, varied lengths, soft outlines)
  const dir=vw==='front'?1:f;const L=vw==='side'?[[0.38,0.66],[0.08,0.58]]:[[-0.78,0.56],[-0.4,0.66],[0.0,0.62],[0.4,0.68],[0.78,0.54]];
  c.save();c.beginPath();c.arc(0,-R*0.12,R*1.16,0,TAU);c.clip();
  L.forEach(([lx,len],i)=>{const x0=(vw==='front'?lx:lx*f)*R,top=-R*1.25,tipY=-R*(1.15-len*1.4),sw=dir*R*0.1,w=R*0.27;
    const g2=c.createLinearGradient(0,top,0,tipY);g2.addColorStop(0,shd2(col,0.12));g2.addColorStop(0.7,col);g2.addColorStop(1,shd2(col,-0.2));c.fillStyle=g2;c.strokeStyle=shd2(col,-0.6);c.lineWidth=2.4*s;c.lineJoin='round';
    c.beginPath();c.moveTo(x0-w,top);c.bezierCurveTo(x0-w*1.05,top+R*0.3,x0-w*0.55+sw,tipY-R*0.2,x0-w*0.35+sw,tipY-R*0.04);c.quadraticCurveTo(x0+sw,tipY+R*0.1,x0+w*0.35+sw,tipY-R*0.04);c.bezierCurveTo(x0+w*0.6+sw,tipY-R*0.2,x0+w*1.05,top+R*0.3,x0+w,top);c.closePath();c.fill();
    c.beginPath();c.moveTo(x0-w*1.02,top+R*0.25);c.bezierCurveTo(x0-w*1.05,top+R*0.4,x0-w*0.55+sw,tipY-R*0.2,x0-w*0.35+sw,tipY-R*0.04);c.quadraticCurveTo(x0+sw,tipY+R*0.1,x0+w*0.35+sw,tipY-R*0.04);c.bezierCurveTo(x0+w*0.6+sw,tipY-R*0.2,x0+w*1.05,top+R*0.4,x0+w*1.02,top+R*0.25);c.stroke();
    c.fillStyle='rgba(0,0,0,0.18)';c.beginPath();c.ellipse(x0+sw-dir*w*0.35,(top+tipY)/2+R*0.1,w*0.25,(tipY-top)*0.35,0,0,TAU);c.fill();
    c.strokeStyle='rgba(255,240,220,0.38)';c.lineWidth=2.2*s;c.lineCap='round';c.beginPath();c.moveTo(x0+dir*w*0.15,top+R*0.12);c.quadraticCurveTo(x0+sw*0.6+dir*w*0.2,(top+tipY)/2,x0+sw+dir*w*0.1,tipY-R*0.1);c.stroke();});c.restore();
  // 4) glossy highlight band
  c.save();c.globalAlpha=0.55;c.strokeStyle='#fff6e8';c.lineWidth=3*s;c.lineCap='round';c.beginPath();c.arc(L2.dx*R*0.1,-R*0.1,R*0.98,L2.dx>0?-1.95:-2.35,L2.dx>0?-1.25:-1.65);c.stroke();c.restore();};
// glass panel card
function panel(c,x,y,w,h,o={}){c.save();c.shadowColor='rgba(0,0,0,0.45)';c.shadowBlur=40;c.shadowOffsetY=16;const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,o.c0||'rgba(30,34,46,0.92)');g.addColorStop(1,o.c1||'rgba(14,16,24,0.92)');c.fillStyle=g;rr(c,x,y,w,h,o.r||36);c.fill();c.restore();
  c.save();c.strokeStyle='rgba(255,255,255,0.14)';c.lineWidth=3;rr(c,x+1.5,y+1.5,w-3,h-3,o.r||36);c.stroke();const hl=c.createLinearGradient(0,y,0,y+h*0.4);hl.addColorStop(0,'rgba(255,255,255,0.08)');hl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=hl;rr(c,x,y,w,h*0.4,o.r||36);c.fill();c.restore();}
function label(c,s,x,y,size,col='#fff',w=800,ls=3){c.save();c.font=`${w} ${size}px "Inter Display"`;c.letterSpacing=ls+'px';c.textAlign='center';c.textBaseline='middle';c.fillStyle=col;c.fillText(s,x,y);c.restore();}
// cleaner brain: one smooth silhouette, even gyri, depth shading, rim light, stem
brain=function(c,x,y,r,t,o={}){c.save();c.translate(x,y);const col=o.col||'#f2a6b8';
  const path=()=>{c.beginPath();c.moveTo(-r*0.95,r*0.1);c.bezierCurveTo(-r*1.05,-r*0.55,-r*0.6,-r*0.95,-r*0.05,-r*0.88);c.bezierCurveTo(r*0.45,-r*1.0,r*1.05,-r*0.7,r*1.0,-r*0.1);c.bezierCurveTo(r*1.08,r*0.35,r*0.75,r*0.62,r*0.35,r*0.6);c.bezierCurveTo(r*0.1,r*0.7,-r*0.2,r*0.62,-r*0.45,r*0.6);c.bezierCurveTo(-r*0.85,r*0.58,-r*0.98,r*0.4,-r*0.95,r*0.1);c.closePath();};
  // stem + cerebellum
  c.fillStyle=shd2(col,-0.25);c.strokeStyle=K2;c.lineWidth=r*0.035;c.beginPath();c.ellipse(r*0.38,r*0.62,r*0.32,r*0.2,0.15,0,TAU);c.fill();c.stroke();c.beginPath();rr(c,r*0.08,r*0.55,r*0.18,r*0.42,r*0.08);c.fill();c.stroke();
  c.save();c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=r*0.15;c.shadowOffsetY=r*0.06;const g=c.createRadialGradient(-r*0.35,-r*0.45,r*0.1,0,0,r*1.15);g.addColorStop(0,shd2(col,0.45));g.addColorStop(0.55,col);g.addColorStop(1,shd2(col,-0.4));c.fillStyle=g;path();c.fill();c.restore();
  c.save();path();c.clip();c.strokeStyle=shd2(col,-0.32);c.lineWidth=r*0.045;c.lineCap='round';c.lineJoin='round';
  const gy=(dx,dy,col,lw)=>{c.strokeStyle=col;c.lineWidth=lw;for(let k=0;k<34;k++){const px=(-0.9+((k*0.37)%1)*1.8)*r+dx,py=(-0.75+Math.floor(k/6)/5.6*1.3)*r+dy+(hash(k)-0.5)*r*0.12,a=hash(k*7)*Math.PI,L=r*(0.16+hash(k*3)*0.12);
    c.beginPath();c.moveTo(px-Math.cos(a)*L,py-Math.sin(a)*L);c.bezierCurveTo(px-Math.cos(a)*L*0.2+Math.sin(a)*L*0.6,py-Math.sin(a)*L*0.2-Math.cos(a)*L*0.6,px+Math.cos(a)*L*0.2-Math.sin(a)*L*0.6,py+Math.sin(a)*L*0.2+Math.cos(a)*L*0.6,px+Math.cos(a)*L,py+Math.sin(a)*L);c.stroke();}};
  gy(r*0.012,r*0.02,'rgba(255,255,255,0.35)',r*0.03);gy(0,0,shd2(col,-0.3),r*0.045);
  const sh=c.createLinearGradient(0,-r,0,r*0.7);sh.addColorStop(0,'rgba(255,255,255,0)');sh.addColorStop(1,'rgba(60,10,30,0.35)');c.fillStyle=sh;c.fillRect(-r*1.2,-r,r*2.4,r*1.8);c.restore();
  c.strokeStyle=shd2(col,-0.5);c.lineWidth=r*0.05;c.beginPath();c.moveTo(-r*0.05,-r*0.86);c.bezierCurveTo(r*0.08,-r*0.4,-r*0.1,r*0.1,r*0.02,r*0.55);c.stroke();
  c.strokeStyle=K2;c.lineWidth=r*0.045;path();c.stroke();
  c.save();c.globalCompositeOperation='lighter';c.strokeStyle=o.rim||'rgba(255,200,230,0.55)';c.lineWidth=r*0.03;c.beginPath();c.arc(-r*0.05,-r*0.05,r*0.78,-2.9,-1.7);c.stroke();c.restore();
  c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.ellipse(-r*0.45,-r*0.55,r*0.22,r*0.08,-0.5,0,TAU);c.fill();c.restore();};
// gauge: arc band green→red, ticks, glossy needle
function gaugePro(c,x,y,r,v,t){panel(c,x-r-60,y-r-80,2*r+120,2*r+260,{r:60});c.save();c.translate(x,y);const a0=Math.PI*0.75,a1=Math.PI*2.25;
  c.lineCap='butt';for(let i=0;i<60;i++){const u=i/60,a=a0+u*(a1-a0),a2=a0+(i+0.85)/60*(a1-a0);c.strokeStyle=`hsl(${130-u*130},75%,${48}%)`;c.lineWidth=46;c.beginPath();c.arc(0,0,r*0.82,a,a2);c.stroke();}
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=46;c.beginPath();c.arc(0,0,r*0.82,a0+(v/100)*(a1-a0),a1);c.stroke();
  for(let i=0;i<=20;i++){const a=a0+i/20*(a1-a0);c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=i%5?3:7;const r0=r*(i%5?0.62:0.58);seg(c,Math.cos(a)*r0,Math.sin(a)*r0,Math.cos(a)*r*0.68,Math.sin(a)*r*0.68);if(i%5===0)label(c,String(i*5),Math.cos(a)*r*0.46,Math.sin(a)*r*0.46,34,'rgba(255,255,255,0.75)',700,0);}
  const a=a0+(v/100)*(a1-a0);c.save();c.shadowColor='rgba(0,0,0,0.6)';c.shadowBlur=20;c.rotate(a);c.fillStyle='#ff3b30';c.beginPath();c.moveTo(-30,-12);c.lineTo(r*0.8,0);c.lineTo(-30,12);c.closePath();c.fill();c.restore();
  const hg=c.createRadialGradient(-8,-8,2,0,0,40);hg.addColorStop(0,'#ffffff');hg.addColorStop(1,'#7a7f8a');c.fillStyle=hg;c.beginPath();c.arc(0,0,38,0,TAU);c.fill();c.restore();
  label(c,String(Math.round(v)),x,y+r*0.62,120,'#fff',900,2);label(c,'BRAIN ACTIVITY',x,y+r*0.62+90,30,'rgba(255,255,255,0.6)',800,8);}
// clean bar chart on a panel
function barsPro(c,x,y,w,h,q,rows,t){panel(c,x,y,w,h,{r:44});label(c,'WHO FALLS ASLEEP FIRST?',x+w/2,y+80,40,'rgba(255,255,255,0.9)',900,4);
  const bx=x+90,by=y+h-170,bh=h-360;c.strokeStyle='rgba(255,255,255,0.1)';c.lineWidth=2;for(let i=0;i<=4;i++){const yy=by-i*bh/4;seg(c,bx,yy,x+w-90,yy);label(c,(i*25)+'%',bx-40,yy,24,'rgba(255,255,255,0.45)',700,0);}
  const n=rows.length,cw=(w-180)/n;rows.forEach(([lab,val,col],i)=>{const cx=bx+cw*(i+0.5),bwid=cw*0.5,hh=bh*val/100*q;const g=c.createLinearGradient(0,by-hh,0,by);g.addColorStop(0,shd2(col,0.25));g.addColorStop(1,shd2(col,-0.2));c.save();c.shadowColor=col;c.shadowBlur=30;c.fillStyle=g;rr(c,cx-bwid/2,by-hh,bwid,hh,Math.min(18,hh/2));c.fill();c.restore();
    c.fillStyle='rgba(255,255,255,0.22)';rr(c,cx-bwid/2+10,by-hh+8,bwid*0.18,Math.max(0,hh-16),8);c.fill();
    label(c,Math.round(val*q)+'%',cx,by-hh-46,58,'#fff',900,1);
    c.fillStyle=col;rr(c,cx-90,by+40,180,60,30);c.fill();label(c,lab,cx,by+71,30,'#fff',900,4);});}
// neat check pill
tag=function(c,t0,t,lab,x,y,col='#34c759'){const p=t-t0;if(p<0)return;const k=back(clamp(p/0.3));c.save();c.translate(x,y);c.scale(k,k);c.font='800 42px "Inter Display"';c.letterSpacing='3px';const w=c.measureText(lab).width+120;
  c.shadowColor='rgba(0,0,0,0.45)';c.shadowBlur=24;c.shadowOffsetY=8;c.fillStyle='rgba(16,18,26,0.9)';rr(c,-w/2,-40,w,80,40);c.fill();c.shadowColor='transparent';c.strokeStyle='rgba(255,255,255,0.14)';c.lineWidth=2;rr(c,-w/2,-40,w,80,40);c.stroke();
  c.fillStyle=col;c.beginPath();c.arc(-w/2+40,0,24,0,TAU);c.fill();c.strokeStyle='#fff';c.lineWidth=6;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-w/2+29,1);c.lineTo(-w/2+37,9);c.lineTo(-w/2+52,-8);c.stroke();
  c.fillStyle='#fff';c.textAlign='left';c.textBaseline='middle';c.fillText(lab,-w/2+78,2);c.restore();};
// couple icon: two neat person glyphs
function coupleIcon(c,x,y,sc){for(const [dx,col] of [[-14,'#ff6a8a'],[14,'#4a8ad8']]){c.fillStyle=col;c.beginPath();c.arc(x+dx*sc,y-14*sc,9*sc,0,TAU);c.fill();rr(c,x+dx*sc-11*sc,y-2*sc,22*sc,24*sc,10*sc);c.fill();}}
