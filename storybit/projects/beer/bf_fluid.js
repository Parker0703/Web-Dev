'use strict';
// ===================== Beer as a real liquid: translucent amber, reflections, flowing ripples, foam streaks, whitewater, spray =====================
// colour of beer by depth: thin = bright gold (light passes through), deep = dark brown
const LQ={thin:'#f2b950',mid:'#c87e22',deep:'#5a300c',foam:'#f6ecd2',foamS:'#d8c49a',hi:'rgba(255,236,170,',dk:'rgba(70,34,6,'};
// mirror what is already drawn above the surface line into the liquid (rippled, fading) — device-pixel strips
function liqReflect(c,t,x0,x1,ys,yb,a=0.32){const m=c.getTransform(),cv=c.canvas;const sy=Math.round(m.d*ys+m.f),ey=Math.min(cv.height,Math.round(m.d*yb+m.f));if(ey<=sy+4||sy<=2)return;
  const sx0=Math.max(0,Math.round(m.a*x0+m.e)),sx1=Math.min(cv.width,Math.round(m.a*x1+m.e));if(sx1<=sx0)return;const hgt=Math.min(sy,ey-sy);
  const T=lyr('refl',cv.width,cv.height),tc=T.getContext('2d');tc.setTransform(1,0,0,1,0,0);tc.clearRect(0,0,sx1-sx0,hgt);tc.drawImage(cv,sx0,sy-hgt,sx1-sx0,hgt,0,0,sx1-sx0,hgt);
  c.save();c.setTransform(1,0,0,1,0,0);const st=Math.max(2,Math.round(3*m.d));for(let y=0;y<hgt;y+=st){const fade=1-y/hgt;c.globalAlpha=a*fade*fade;const off=Math.sin((sy+y)*0.045/m.d+t*5)*(2+y*0.03)*m.d;c.drawImage(T,0,hgt-y-st,sx1-sx0,st,sx0+off,sy+y,sx1-sx0,st);}c.restore();}
// surface of standing / flowing beer from ys (far edge) down to yb (near). o.flow px/s (sideways drift), o.dir
function floodSurf(c,t,x0,x1,ys,yb,o={}){const fl=o.flow??120,dir=o.dir??1,wy=x=>ys+Math.sin(x*0.018+t*4*dir)*5+Math.sin(x*0.006-t*2.2)*7;c.save();
  // body: thin bright edge where it meets the far wall, dark deep near camera
  const g=c.createLinearGradient(0,ys,0,yb);g.addColorStop(0,o.top||LQ.thin);g.addColorStop(0.12,LQ.mid);g.addColorStop(0.7,shd(LQ.mid,-0.35));g.addColorStop(1,LQ.deep);
  c.beginPath();c.moveTo(x0,yb);for(let x=x0;x<=x1;x+=16)c.lineTo(x,wy(x));c.lineTo(x1,yb);c.closePath();c.globalAlpha=o.a??0.94;c.fillStyle=g;c.fill();c.globalAlpha=1;
  if(o.refl!==false)liqReflect(c,t,x0,x1,ys+4,yb,o.refl??0.3);
  c.save();c.beginPath();c.moveTo(x0,yb);for(let x=x0;x<=x1;x+=16)c.lineTo(x,wy(x));c.lineTo(x1,yb);c.closePath();c.clip();
  // perspective ripple rows: bright crest + dark trough, scrolling with the flow, bigger toward camera
  const N=o.rows||34;for(let r=0;r<N;r++){const d=Math.pow((r+0.5)/N,1.7),y=ys+d*(yb-ys),sc=0.25+d*2.4,len=40*sc;const n=Math.ceil((x1-x0)/(len*2.2))+2;
    for(let i=0;i<n;i++){const ph=hash(r*31+i*7.7);const x=x0+(((i*len*2.2+ph*len*2+t*fl*(0.4+d)*dir)%(x1-x0+len*4))+(x1-x0+len*4))%(x1-x0+len*4)-len*2;const yy=y+Math.sin(t*3+i+r)*3*sc;
      c.strokeStyle=LQ.hi+(0.18+0.25*(1-d))+')';c.lineWidth=Math.max(1,2.2*sc);c.beginPath();c.moveTo(x-len*0.5,yy);c.quadraticCurveTo(x,yy-5*sc,x+len*0.5,yy);c.stroke();
      c.strokeStyle=LQ.dk+(0.22+0.2*d)+')';c.lineWidth=Math.max(1,2.6*sc);c.beginPath();c.moveTo(x-len*0.4+len*0.3,yy+6*sc);c.quadraticCurveTo(x+len*0.3,yy+9*sc,x+len*0.7,yy+5*sc);c.stroke();}}
  // foam streaks drawn out along the flow + floating clumps
  const F=o.foam??1;for(let i=0;i<70*F;i++){const d=Math.pow(hash(i*2.71),1.3),y=ys+8+d*(yb-ys-8),sc=0.3+d*2.2;const span=x1-x0+600;const x=x0-300+(((hash(i*1.3)*span+t*fl*(0.5+d)*dir)%span)+span)%span;
    const L=(60+hash(i*5)*140)*sc;c.fillStyle=`rgba(246,236,210,${0.35+0.3*hash(i*9)})`;c.beginPath();c.ellipse(x,y,L*0.5,(2+hash(i)*3)*sc,0,0,TAU);c.fill();
    if(i%3===0){for(let k=0;k<5;k++){c.fillStyle=k%2?LQ.foamS:LQ.foam;c.beginPath();c.arc(x+(k-2)*7*sc,y-2*sc+Math.sin(k*2+t*3)*1.5*sc,(3+hash(i+k)*4)*sc,0,TAU);c.fill();}}}
  // glints twinkling on the surface
  c.globalCompositeOperation='lighter';for(let i=0;i<40;i++){const d=hash(i*4.4),y=ys+d*(yb-ys)*0.8,x=x0+hash(i*6.6)*(x1-x0),tw=Math.max(0,Math.sin(t*6+i*2.3));if(tw<0.6)continue;c.fillStyle=`rgba(255,240,200,${(tw-0.6)*1.6})`;c.beginPath();c.ellipse(x,y,(6+d*14)*tw,1.6+d*2,0,0,TAU);c.fill();}
  c.restore();
  // waterline: thin foam fringe + ink line
  c.strokeStyle='rgba(246,236,210,0.85)';c.lineWidth=5;c.beginPath();for(let x=x0;x<=x1;x+=16){const y=wy(x)+2;x===x0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  c.strokeStyle=K2;c.lineWidth=3;c.beginPath();for(let x=x0;x<=x1;x+=16){const y=wy(x)-1;x===x0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();c.restore();}
// churning whitewater clump (shaded bubbles)
function whitewater(c,t,x,y,r,sd=0,a=1){c.save();c.globalAlpha=a;for(let k=0;k<7;k++){const ang=hash(sd*3+k)*TAU+t*(2+hash(k+sd))*(k%2?1:-1),rr=r*(0.25+0.55*hash(k*2+sd));const px=x+Math.cos(ang)*r*0.55,py=y+Math.sin(ang)*r*0.35;
    c.fillStyle=LQ.foamS;c.beginPath();c.arc(px,py+rr*0.18,rr,0,TAU);c.fill();c.fillStyle=LQ.foam;c.beginPath();c.arc(px-rr*0.12,py-rr*0.05,rr*0.86,0,TAU);c.fill();}c.restore();}
// droplets with motion streaks
function spray(c,t,x,y,n,spread,height,dir,sd=0,a=1){for(let i=0;i<n;i++){const ph=(t*1.3+hash(i*3.1+sd))%1;const vx=dir*(0.3+hash(i*5.3+sd))*spread,vy=-(0.5+hash(i*7.1+sd))*height;
  const px=x+vx*ph,py=y+vy*ph+height*1.6*ph*ph,qx=x+vx*(ph-0.05),qy=y+vy*(ph-0.05)+height*1.6*(ph-0.05)*(ph-0.05);const r=(3+hash(i)*7)*(1-ph*0.6);
  c.strokeStyle=`rgba(232,170,80,${0.7*(1-ph)*a})`;c.lineWidth=r*0.9;c.lineCap='round';seg(c,qx,qy,px,py);c.fillStyle=i%3?`rgba(246,236,210,${0.9*(1-ph)*a})`:`rgba(220,150,60,${0.9*(1-ph)*a})`;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();}}
// splash ring where something hits the liquid / stands in a current
function splash(c,t,x,y,s,a=1,sd=0){c.save();c.globalAlpha=a;for(let k=0;k<3;k++){const ph=(t*1.8+k/3+hash(sd))%1;c.strokeStyle=`rgba(246,236,210,${0.7*(1-ph)})`;c.lineWidth=3*s;c.beginPath();c.ellipse(x,y,(20+ph*90)*s,(5+ph*18)*s,0,0,TAU);c.stroke();}
  spray(c,t,x,y-4*s,10,90*s,140*s,1,sd);spray(c,t,x,y-4*s,10,90*s,140*s,-1,sd+5);whitewater(c,t,x,y,26*s,sd);c.restore();}
// a body standing in flowing beer: foam bow upstream, V-wake downstream (dir = flow direction)
function legWake(c,t,x,y,s,dir=1,sd=0){c.save();whitewater(c,t,x-dir*24*s,y,22*s,sd);for(let k=0;k<2;k++){const sgn=k?1:-1;c.strokeStyle='rgba(246,236,210,0.7)';c.lineWidth=4*s;c.beginPath();c.moveTo(x-dir*10*s,y+sgn*4*s);c.quadraticCurveTo(x+dir*60*s,y+sgn*16*s,x+dir*140*s,y+sgn*30*s);c.stroke();}
  c.fillStyle='rgba(246,236,210,0.5)';c.beginPath();c.ellipse(x,y,46*s,9*s,0,0,TAU);c.fill();c.restore();}
// falling stream of beer (pouring through a window / grating / over an edge) with a splash at the bottom
function pour(c,t,x,y0,y1,w,o={}){c.save();const wob=(yy,k)=>Math.sin(yy*0.02-t*12+k)*w*0.025+Math.sin(yy*0.07-t*20+k*2)*w*0.012;const g=c.createLinearGradient(x-w/2,0,x+w/2,0);g.addColorStop(0,shd(LQ.mid,-0.2));g.addColorStop(0.35,LQ.thin);g.addColorStop(1,shd(LQ.mid,-0.35));
  c.fillStyle=g;c.globalAlpha=o.a??0.92;c.beginPath();for(let yy=y0;yy<=y1;yy+=12){const sp=1+(yy-y0)/(y1-y0)*(o.spread??0.35);c.lineTo(x-w/2*sp+wob(yy,0),yy);}for(let yy=y1;yy>=y0;yy-=12){const sp=1+(yy-y0)/(y1-y0)*(o.spread??0.35);c.lineTo(x+w/2*sp+wob(yy,2),yy);}c.closePath();c.fill();c.globalAlpha=1;
  c.save();c.clip();for(let i=0;i<8;i++){const ph=(t*2.4+i/8)%1,yy=y0+ph*(y1-y0),xx=x+(hash(i)-0.5)*w*0.7;c.strokeStyle=LQ.hi+'0.55)';c.lineWidth=3;seg(c,xx,yy,xx+wob(yy,1),yy+60);}c.restore();
  c.strokeStyle=K2;c.lineWidth=3;c.beginPath();for(let yy=y0;yy<=y1;yy+=12){const sp=1+(yy-y0)/(y1-y0)*(o.spread??0.35);c.lineTo(x-w/2*sp+wob(yy,0),yy);}c.stroke();c.beginPath();for(let yy=y0;yy<=y1;yy+=12){const sp=1+(yy-y0)/(y1-y0)*(o.spread??0.35);c.lineTo(x+w/2*sp+wob(yy,2),yy);}c.stroke();
  const wr=Math.min(w*0.9,70);for(let i=0;i<5;i++)whitewater(c,t,x+(i-2)*w*0.28,y1+Math.sin(t*6+i)*6,wr*(0.6+0.4*hash(i)),(o.sd||0)+i,0.9);spray(c,t,x,y1,12,w*1.6,Math.min(w*1.4,220),1,o.sd||0);spray(c,t,x,y1,12,w*1.6,Math.min(w*1.4,220),-1,(o.sd||0)+3);c.restore();}
// side-travelling surge (a tumbling bore of beer, like flood footage): front at xF moving dir, ground yb, height h
function sideWave(c,t,xF,yb,h,dir=1,o={}){const xFar=o.xFar??(xF-dir*2600),ys=yb-h*(o.tail??0.5);c.save();c.lineJoin='round';
  const chop=x=>Math.sin(x*0.02+t*6)*h*0.02+Math.sin(x*0.051-t*9)*h*0.01;
  const body=()=>{c.beginPath();c.moveTo(xFar,ys);for(let k=0;k<=24;k++){const u=k/24,x=lerp(xFar,xF-dir*h*0.55,u);c.lineTo(x,ys-Math.pow(u,2.5)*h*0.3+chop(x));}
    c.bezierCurveTo(xF-dir*h*0.4,yb-h*0.9,xF-dir*h*0.25,yb-h*1.02,xF-dir*h*0.08,yb-h*0.95);c.bezierCurveTo(xF+dir*h*0.06,yb-h*0.88,xF+dir*h*0.14,yb-h*0.62,xF+dir*h*0.13,yb-h*0.35);
    c.bezierCurveTo(xF+dir*h*0.13,yb-h*0.15,xF+dir*h*0.2,yb-h*0.03,xF+dir*h*0.3,yb+10);c.lineTo(xF+dir*h*0.3,yb+900);c.lineTo(xFar,yb+900);c.closePath();};
  const g=c.createLinearGradient(0,yb-h,0,yb);g.addColorStop(0,LQ.thin);g.addColorStop(0.3,LQ.mid);g.addColorStop(1,LQ.deep);body();c.globalAlpha=0.96;c.fillStyle=g;c.fill();c.globalAlpha=1;
  c.save();body();c.clip();
  // back-light glow through the thin upper front
  const gl=c.createRadialGradient(xF,yb-h*0.8,0,xF,yb-h*0.8,h*0.55);gl.addColorStop(0,'rgba(255,215,130,0.5)');gl.addColorStop(1,'rgba(255,190,90,0)');c.fillStyle=gl;c.fillRect(xF-h,yb-h*1.4,h*2,h*1.2);
  // flow streaks pulled down the face, dark troughs, foam lace
  for(let i=0;i<40;i++){const ph=(t*(1.1+hash(i)*0.8)+hash(i*2.3))%1,x=xF-dir*(hash(i*4.1)*h*1.4-h*0.05),y0=yb-h*(0.5+0.45*hash(i*6.7))+ph*h*0.2,len=h*(0.15+0.3*hash(i*8.9));
    c.strokeStyle=(i%3===0?LQ.dk+'0.25)':LQ.hi+(0.12+0.28*hash(i*3)*(1-ph*0.5))+')');c.lineWidth=2+hash(i*5)*8;c.beginPath();c.moveTo(x,y0);c.bezierCurveTo(x+dir*len*0.12,y0+len*0.3,x-dir*len*0.08,y0+len*0.7,x+dir*len*0.06,y0+len);c.stroke();}
  for(let i=0;i<30;i++){const x=xF-dir*(hash(i*3.3)*h*1.3),y=yb-h*(0.45+0.45*hash(i*1.9))+Math.sin(t*3+i)*6;c.strokeStyle='rgba(246,236,210,0.4)';c.lineWidth=2.5;c.beginPath();c.ellipse(x,y,h*(0.025+0.04*hash(i)),h*0.01,hash(i*7)*0.6,0,TAU);c.stroke();}
  c.restore();body();c.strokeStyle=K2;c.lineWidth=5;c.stroke();
  // tumbling whitewater over the crest and down the front face (dense at top, breaking up lower)
  for(let i=0;i<60;i++){const u=hash(i*1.7),v=Math.pow(hash(i*2.9),1.6);const ang=lerp(-2.6,0.2,u);
    const x=xF-dir*h*0.05+dir*Math.cos(ang)*h*0.2*(0.6+v)+Math.sin(t*5+i)*h*0.01,y=yb-h*0.65+Math.sin(ang)*h*0.33+v*h*0.55*(u>0.6?1:0.2)+((t*0.6+hash(i))%1)*h*0.05;
    if(y>yb-10)continue;whitewater(c,t,x,y,h*(0.02+0.035*(1-v)*hash(i*5)),i,0.9-v*0.4);}
  for(let i=0;i<22;i++){const u=i/21,x=lerp(xF-dir*h*0.9,xF-dir*h*0.2,u),y=ys-Math.pow(1-u*0.0,1)*0-Math.pow(lerp(0.75,1,u),2.5)*h*0.3+chop(x)-h*0.02;whitewater(c,t,x,y,h*(0.012+0.015*hash(i)),40+i,0.75);}
  // foam boiling at the toe + skidding along the ground
  for(let i=0;i<14;i++){const x=xF+dir*h*(0.12+i*0.02+0.015*Math.sin(t*7+i)),y=yb-h*(0.06-i*0.004)+Math.sin(t*9+i)*4;whitewater(c,t,x,y,h*(0.02+0.025*hash(i*3)),60+i,0.9);}
  for(let i=0;i<8;i++){const u=i/7;c.fillStyle=`rgba(246,236,210,${0.7*(1-u)})`;c.beginPath();c.ellipse(xF+dir*h*(0.3+u*0.35),yb+12+Math.sin(t*9+i)*3,h*0.035*(1-u*0.5),h*0.008,0,0,TAU);c.fill();}
  // spray plume thrown up and forward
  spray(c,t,xF,yb-h*0.95,26,h*0.7,h*0.5,dir,1);spray(c,t,xF+dir*h*0.15,yb-h*0.1,16,h*0.6,h*0.3,dir,9);
  if(o.debris)for(let i=0;i<o.debris;i++){const x=xF-dir*(h*0.4+hash(i*4)*h*1.5),y=ys-10+hash(i*2)*h*0.25+Math.sin(t*3+i)*8;stave(c,x,y,h*0.0016,t*2+i);}
  c.restore();}
// a wall of beer coming at the camera
function wallWave(c,t,yTop,yb,o={}){c.save();const wy=x=>yTop+Math.sin(x*0.006+t*3)*40+Math.sin(x*0.017-t*5)*16;const body=()=>{c.beginPath();c.moveTo(-1500,yb);for(let x=-1500;x<=2600;x+=30)c.lineTo(x,wy(x));c.lineTo(2600,yb);c.closePath();};
  const g=c.createLinearGradient(0,yTop,0,yb);g.addColorStop(0,LQ.thin);g.addColorStop(0.3,LQ.mid);g.addColorStop(1,LQ.deep);body();c.globalAlpha=0.95;c.fillStyle=g;c.fill();c.globalAlpha=1;
  c.save();body();c.clip();for(let i=0;i<34;i++){const x=-1400+i*120+Math.sin(t*2+i)*20,ph=(t*1.5+hash(i))%1;c.strokeStyle=LQ.hi+(0.4*(1-ph*0.6))+')';c.lineWidth=6+hash(i)*8;c.beginPath();c.moveTo(x,wy(x)+40+ph*120);c.quadraticCurveTo(x+40,(yTop+yb)/2,x-20,yb);c.stroke();}
  for(let i=0;i<8;i++){const y=yTop+120+i*(yb-yTop)/9+Math.sin(t*3+i)*10;c.strokeStyle=LQ.dk+'0.22)';c.lineWidth=6;c.beginPath();for(let x=-1500;x<=2600;x+=60)c.lineTo(x,y+Math.sin(x*0.01+t*4+i)*14);c.stroke();}c.restore();
  body();c.strokeStyle=K2;c.lineWidth=5;c.stroke();for(let i=0;i<46;i++){const x=-1400+i*90;whitewater(c,t,x,wy(x)+10,30+hash(i)*30,i);}
  spray(c,t,540,yTop-20,50,1600,400,1,2);spray(c,t,540,yTop-20,50,1600,400,-1,7);
  if(o.debris)for(let i=0;i<o.debris;i++)stave(c,-600+hash(i*3.3)*2200,yTop+80+hash(i*1.1)*(yb-yTop-200),0.9+hash(i)*0.8,t*1.5+i*2);c.restore();}
// a sheet of beer spilling over an edge (rooftop / parapet / sill): translucent curtain with a glassy lip, streaky face,
// a ragged lower edge breaking into fingers and drops, whitewater where it lands. k 0..1 how far it has fallen.
function curtain(c,t,x0,x1,yTop,yBot,k,o={}){if(k<=0)return;const yb=lerp(yTop,yBot,k),w=x1-x0,sd=o.sd||0;c.save();
  const edge=x=>yb-(1-k)*0+Math.sin(x*0.045+t*9+sd)*14+Math.sin(x*0.13-t*13)*8-(hash(Math.floor(x/26)+sd)>0.6?0:30*k);
  const path=()=>{c.beginPath();c.moveTo(x0,yTop);for(let x=x0;x<=x1;x+=10)c.lineTo(x,yTop-6+Math.sin(x*0.03+t*5)*3);for(let x=x1;x>=x0;x-=10)c.lineTo(x,edge(x));c.closePath();};
  const g=c.createLinearGradient(0,yTop,0,yb);g.addColorStop(0,LQ.thin);g.addColorStop(0.5,'rgba(200,126,34,0.85)');g.addColorStop(1,'rgba(200,126,34,0.6)');path();c.globalAlpha=o.a??0.82;c.fillStyle=g;c.fill();c.globalAlpha=1;
  c.save();path();c.clip();for(let i=0;i<w/18;i++){const x=x0+hash(i*3.3+sd)*w,ph=(t*(1.6+hash(i)*0.8)+hash(i*7+sd))%1;c.strokeStyle=(i%4===0?LQ.dk+'0.25)':LQ.hi+(0.2+0.35*hash(i*5))+')');c.lineWidth=2+hash(i*9)*5;seg(c,x,yTop+ph*(yb-yTop)*0.6,x+Math.sin(i)*4,yTop+ph*(yb-yTop)*0.6+(yb-yTop)*0.3);}
    c.fillStyle='rgba(255,240,190,0.35)';c.fillRect(x0,yTop-6,w,16);c.restore();
  c.strokeStyle=K2;c.lineWidth=3;c.beginPath();for(let x=x0;x<=x1;x+=10)c.lineTo(x,yTop-6+Math.sin(x*0.03+t*5)*3);c.stroke();
  // fingers + drops breaking off the lower edge
  for(let i=0;i<w/30;i++){const x=x0+(i+0.5)*30+Math.sin(i*3+sd)*8,ph=(t*1.8+hash(i*1.7+sd))%1;const y=edge(x)+ph*Math.max(60,(yBot-yb)*0.6+60);c.fillStyle=`rgba(210,140,50,${0.85*(1-ph*0.5)})`;c.beginPath();c.ellipse(x,y,4+hash(i)*5,9+hash(i)*10,0,0,TAU);c.fill();}
  // whitewater + spray on the lip, landing foam once it reaches the ground
  for(let x=x0+20;x<x1;x+=46)whitewater(c,t,x,yTop-4,14+hash(x)*10,Math.floor(x)+sd,0.85);
  if(k>=0.98){for(let x=x0+10;x<x1;x+=40)whitewater(c,t,x,yBot+Math.sin(t*7+x)*5,26+hash(x*1.3)*22,Math.floor(x*0.7),0.95);spray(c,t,(x0+x1)/2,yBot,16,w*0.6,180,1,sd);spray(c,t,(x0+x1)/2,yBot,16,w*0.6,180,-1,sd+4);}
  c.restore();}
