'use strict';
// ===================== Space without a suit · space backdrops + explainer graphics =====================
const LSPACE={dx:1,rim:'#fff6e8',amb:'#33456e',key:'rgba(255,225,190,'};
// ---------- Earth (cached disk) ----------
let _EC=null;
function earthCache(){if(_EC)return _EC;const N=1600,R=780,cv=mk(N,N),x=cv.getContext('2d');x.translate(N/2,N/2);
  x.save();x.beginPath();x.arc(0,0,R,0,TAU);x.clip();
  let g=x.createRadialGradient(-R*0.25,-R*0.3,R*0.1,0,0,R);g.addColorStop(0,'#2a7ad0');g.addColorStop(0.6,'#1556a8');g.addColorStop(1,'#0a2c66');x.fillStyle=g;x.fillRect(-R,-R,2*R,2*R);
  // continents: fractal coastlines, shallow-water halo, terrain tones, mountain ridges
  for(let cI=0;cI<7;cI++){const cx=(hash(cI*11)-0.5)*R*1.6,cy=(hash(cI*13)-0.5)*R*1.3,sz=R*(0.1+hash(cI*17)*0.2),ph=hash(cI*19)*TAU;
    const coast=(sc)=>{x.beginPath();for(let k=0;k<=240;k++){const a=k/240*TAU;let r=1;for(let h=1;h<=16;h++)r+=Math.sin(a*h+ph*h+hash(cI*31+h)*6)*(h<3?0.3/h:0.09/Math.pow(h,0.55));r*=sz*sc;const px=cx+Math.cos(a)*r*1.35,py=cy+Math.sin(a)*r;k?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();};
    x.fillStyle='rgba(80,190,220,0.45)';coast(1.12);x.fill();x.strokeStyle='rgba(20,40,40,0.55)';x.lineWidth=2.5;coast(1);x.stroke();
    x.save();coast(1);x.clip();let lg=x.createLinearGradient(cx-sz,cy-sz,cx+sz,cy+sz);lg.addColorStop(0,'#5a8a3e');lg.addColorStop(0.5,'#7a9248');lg.addColorStop(0.8,'#b09a62');lg.addColorStop(1,'#c4a46a');x.fillStyle=lg;x.fillRect(cx-sz*2,cy-sz*2,sz*4,sz*4);
    for(let i=0;i<500;i++){x.fillStyle=['rgba(60,100,50,0.35)','rgba(180,150,100,0.35)','rgba(90,120,60,0.3)','rgba(220,200,150,0.25)'][i%4];x.beginPath();x.arc(cx+(hash(cI*7+i)-0.5)*sz*2.8,cy+(hash(cI*9+i*3)-0.5)*sz*2.2,1+hash(i*5)*5,0,TAU);x.fill();}
    x.strokeStyle='rgba(120,90,60,0.5)';x.lineWidth=2;for(let m=0;m<3;m++){x.beginPath();for(let k=0;k<12;k++){const px=cx+(hash(cI*41+m)-0.5)*sz+k*sz*0.09,py=cy+(hash(cI*43+m)-0.5)*sz+Math.sin(k*1.7+m)*sz*0.08;k?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}
    x.restore();}
  // cloud clusters: soft overlapping puffs in bands, drawn on their own layer then blurred once
  {const cl=mk(N,N),y2=cl.getContext('2d');y2.translate(N/2,N/2);for(let i=0;i<3200;i++){const yy=(hash(i*2.3)-0.5)*2*R,band=Math.sin(yy/R*6+1.3)+Math.sin((hash(i*5.1)-0.5)*9+yy/R*3)*0.5;if(band<-0.2&&hash(i*7)<0.8)continue;const xx=(hash(i*5.1)-0.5)*2*R,n=3+Math.floor(hash(i*11)*7),sz=2.5+Math.pow(hash(i*13),2)*11;
    for(let j=0;j<n;j++){y2.fillStyle=`rgba(255,255,255,${0.18+hash(i*3+j)*0.4})`;y2.beginPath();y2.ellipse(xx+(hash(i*17+j)-0.5)*sz*5,yy+(hash(i*19+j)-0.5)*sz*0.9,sz*(0.7+hash(i*23+j)*0.8),sz*(0.3+hash(i*29+j)*0.3),band*0.25,0,TAU);y2.fill();}}
   x.drawImage(cl,-N/2,-N/2);}
  // sphere shading: limb darkening + night side + atmospheric haze at the edge
  g=x.createRadialGradient(-R*0.35,-R*0.35,R*0.2,0,0,R);g.addColorStop(0,'rgba(255,255,255,0.08)');g.addColorStop(0.7,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,10,40,0.55)');x.fillStyle=g;x.fillRect(-R,-R,2*R,2*R);
  g=x.createLinearGradient(-R,0,R,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(0.62,'rgba(0,0,0,0)');g.addColorStop(0.82,'rgba(2,6,20,0.75)');g.addColorStop(1,'rgba(2,4,14,0.95)');x.fillStyle=g;x.fillRect(-R,-R,2*R,2*R);
  // city lights on the night side
  for(let i=0;i<500;i++){const xx=R*(0.62+hash(i*3)*0.38),yy=(hash(i*7)-0.5)*1.6*R;if(xx*xx+yy*yy>R*R*0.96)continue;x.fillStyle=`rgba(255,210,120,${0.3+hash(i)*0.6})`;x.beginPath();x.arc(xx,yy,1+hash(i*5)*2,0,TAU);x.fill();}
  g=x.createRadialGradient(0,0,R*0.9,0,0,R);g.addColorStop(0,'rgba(120,190,255,0)');g.addColorStop(1,'rgba(150,210,255,0.55)');x.fillStyle=g;x.fillRect(-R,-R,2*R,2*R);
  x.restore();_EC=cv;return cv;}
function earth(c,x,y,R,t,o={}){const cv=earthCache();c.save();if(o.lighten)c.globalCompositeOperation='lighten';c.translate(x,y);c.rotate((o.rot||0)+t*0.004);
  // atmosphere glow outside the disk
  const g=c.createRadialGradient(0,0,R*0.985,0,0,R*1.07);g.addColorStop(0,'rgba(170,220,255,0.95)');g.addColorStop(0.25,'rgba(90,160,255,0.55)');g.addColorStop(1,'rgba(40,90,220,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,R*1.07,0,TAU);c.arc(0,0,R*0.97,0,TAU,true);c.fill('evenodd');
  c.drawImage(cv,-R*800/780,-R*800/780,R*1600/780,R*1600/780);c.strokeStyle='#0a0c14';c.lineWidth=Math.max(4,R*0.006);c.beginPath();c.arc(0,0,R,0,TAU);c.stroke();c.strokeStyle='rgba(190,230,255,0.9)';c.lineWidth=Math.max(2,R*0.003);c.beginPath();c.arc(0,0,R*0.992,Math.PI*1.05,Math.PI*1.95);c.stroke();c.restore();}
// ---------- star field ----------
function starfield(c,t,o={}){c.fillStyle='#01020a';c.fillRect(-60,-60,W+120,H+120);const n=o.n||520,dx=(o.dx||0),dy=(o.dy||0);
  for(let i=0;i<n;i++){const d=0.3+hash(i*2.7)*0.7;const x=((hash(i*3.7)*1300+dx*d+t*(o.vx||0)*d)%1300+1300)%1300-110,y=((hash(i*9.1)*2100+dy*d+t*(o.vy||0)*d)%2100+2100)%2100-90;const r=hash(i*1.3)<0.93?0.8+d*1.4:2+d*2.2;const tw=0.6+0.4*Math.sin(t*3+i);
    c.fillStyle=`rgba(${230+hash(i*4)*25|0},${232+hash(i*5)*23|0},255,${(0.35+d*0.6)*tw})`;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();if(r>2.6){c.strokeStyle=`rgba(220,230,255,${0.35*tw})`;c.lineWidth=1.2;seg(c,x-r*3,y,x+r*3,y);seg(c,x,y-r*3,x,y+r*3);}}
  // faint milky way band
  const g=c.createLinearGradient(0,200,W,1300);g.addColorStop(0,'rgba(120,110,180,0)');g.addColorStop(0.5,'rgba(140,130,200,0.12)');g.addColorStop(1,'rgba(120,110,180,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}
function spaceBG(c,t,o={}){starfield(c,t,o);if(o.earth===true)earth(c,o.ex??540,o.ey??2700,o.er??1500,t,{rot:o.erot||0.3});L2=Object.assign({},LSPACE);
  if(o.sun){const g=c.createRadialGradient(o.sun[0],o.sun[1],0,o.sun[0],o.sun[1],380);g.addColorStop(0,'rgba(255,255,245,0.95)');g.addColorStop(0.08,'rgba(255,250,230,0.6)');g.addColorStop(1,'rgba(255,240,200,0)');c.save();c.globalCompositeOperation='lighter';c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}}
// ---------- icons ----------
function stopwatch(c,x,y,r,sec,o={}){const k=o.k??1;if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.lineJoin='round';
  c.fillStyle='#d8dce4';c.strokeStyle=OL;c.lineWidth=r*0.07;rr(c,-r*0.16,-r*1.32,r*0.32,r*0.24,r*0.05);c.fill();c.stroke();c.save();c.rotate(0.7);rr(c,-r*0.1,-r*1.18,r*0.2,r*0.18,r*0.04);c.fill();c.stroke();c.restore();
  c.fillStyle='#1a1c26';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.fillStyle='#f4f2ec';c.beginPath();c.arc(0,0,r*0.84,0,TAU);c.fill();
  const max=o.max||15,fr=Math.min(1,sec/max);c.fillStyle=o.col||(fr>0.66?'rgba(230,50,40,0.85)':'rgba(255,160,40,0.8)');c.beginPath();c.moveTo(0,0);c.arc(0,0,r*0.84,-Math.PI/2,-Math.PI/2+fr*TAU);c.closePath();c.fill();
  c.strokeStyle='#1a1c26';c.lineWidth=r*0.03;for(let i=0;i<12;i++){const a=i/12*TAU;seg(c,Math.cos(a)*r*0.72,Math.sin(a)*r*0.72,Math.cos(a)*r*0.82,Math.sin(a)*r*0.82);}
  const a=-Math.PI/2+fr*TAU;c.lineWidth=r*0.06;c.lineCap='round';seg(c,0,0,Math.cos(a)*r*0.7,Math.sin(a)*r*0.7);c.fillStyle='#1a1c26';c.beginPath();c.arc(0,0,r*0.08,0,TAU);c.fill();
  txt(c,String(Math.floor(sec))+'s',0,r*1.42,r*0.46,'#fff',{sw:r*0.08});c.restore();}
function boomIco(c,x,y,r,t){c.save();c.translate(x,y);c.rotate(Math.sin(t*6)*0.05);c.fillStyle='#ffb020';c.strokeStyle=OL;c.lineWidth=r*0.07;c.beginPath();for(let i=0;i<18;i++){const a=i/18*TAU,rr2=i%2?r*0.55:r;c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2);}c.closePath();c.fill();c.stroke();
  c.fillStyle='#ff5a2a';c.beginPath();for(let i=0;i<18;i++){const a=i/18*TAU+0.17,rr2=i%2?r*0.3:r*0.62;c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2);}c.closePath();c.fill();c.fillStyle='#fff6c0';c.beginPath();c.arc(0,0,r*0.2,0,TAU);c.fill();c.restore();}
function crossOut(c,x,y,r,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.strokeStyle=OL;c.lineWidth=r*0.28;c.lineCap='round';seg(c,-r*0.7,-r*0.7,r*0.7,r*0.7);seg(c,r*0.7,-r*0.7,-r*0.7,r*0.7);c.strokeStyle='#ff3b30';c.lineWidth=r*0.17;seg(c,-r*0.7,-r*0.7,r*0.7,r*0.7);seg(c,r*0.7,-r*0.7,-r*0.7,r*0.7);c.restore();}
function iceCube(c,x,y,r){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=r*0.06;c.fillStyle='#bfe6ff';c.beginPath();c.moveTo(-r*0.7,-r*0.3);c.lineTo(0,-r*0.7);c.lineTo(r*0.7,-r*0.3);c.lineTo(r*0.7,r*0.45);c.lineTo(0,r*0.85);c.lineTo(-r*0.7,r*0.45);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e6f6ff';c.beginPath();c.moveTo(-r*0.7,-r*0.3);c.lineTo(0,-r*0.7);c.lineTo(r*0.7,-r*0.3);c.lineTo(0,r*0.1);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(0,r*0.1);c.lineTo(0,r*0.85);c.stroke();
  c.fillStyle='rgba(255,255,255,0.8)';c.beginPath();c.ellipse(-r*0.3,r*0.1,r*0.08,r*0.25,0.2,0,TAU);c.fill();c.restore();}
function balloonPop(c,x,y,r,t){c.save();c.translate(x,y);c.strokeStyle=OL;c.lineWidth=r*0.06;c.fillStyle='#e8545a';c.beginPath();c.ellipse(0,-r*0.1,r*0.6,r*0.72,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-r*0.08,r*0.62);c.lineTo(r*0.08,r*0.62);c.lineTo(0,r*0.72);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(0,r*0.72);c.quadraticCurveTo(r*0.2,r*0.95,0,r*1.15);c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.ellipse(-r*0.25,-r*0.4,r*0.1,r*0.2,0.4,0,TAU);c.fill();
  c.strokeStyle='#ffd040';c.lineWidth=r*0.07;c.lineCap='round';for(let i=0;i<6;i++){const a=i/6*TAU+0.3;seg(c,Math.cos(a)*r*0.85,Math.sin(a)*r*0.95-r*0.1,Math.cos(a)*r*1.1,Math.sin(a)*r*1.2-r*0.1);}c.restore();}
function arrowFlow(c,x0,y0,x1,y1,t,col='rgba(200,230,255,',n=5,w=12){const L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0);c.save();c.translate(x0,y0);c.rotate(a);for(let i=0;i<n;i++){const p=((t*1.2+i/n)%1);const xx=p*L;c.globalAlpha=Math.sin(p*Math.PI);c.strokeStyle=col+'0.9)';c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(xx-60,-26);c.lineTo(xx,0);c.lineTo(xx-60,26);c.stroke();}c.restore();}
// ---------- X-ray chest: ribs, spine, trachea + bronchial tree, lungs that inflate and tear ----------
function chestXray(c,x,y,s,t,o={}){const ex=o.exp||0,tr=o.tear||0,out=o.out||0;c.save();c.translate(x,y);c.scale(s,s);c.lineCap='round';c.lineJoin='round';
  const glow=(col,b)=>{c.shadowColor=col;c.shadowBlur=b;};
  // body silhouette (soft tissue)
  c.fillStyle='rgba(110,170,230,0.10)';c.strokeStyle='rgba(150,200,255,0.5)';c.lineWidth=5;c.beginPath();c.moveTo(-70,-520);c.quadraticCurveTo(-80,-430,-160,-400);c.quadraticCurveTo(-330,-380,-350,-260);c.lineTo(-330,420);c.quadraticCurveTo(0,470,330,420);c.lineTo(350,-260);c.quadraticCurveTo(330,-380,160,-400);c.quadraticCurveTo(80,-430,70,-520);c.closePath();c.fill();c.stroke();
  // lungs (behind ribs): two lobed shapes, scale with expansion
  const lk=1+ex*0.32;for(const sd of [-1,1]){c.save();c.translate(sd*95,-60);c.scale(lk*(1+ex*0.08),lk);
    const lp=()=>{c.beginPath();c.moveTo(sd*-10,-250);c.bezierCurveTo(sd*80,-260,sd*190,-120,sd*200,60);c.bezierCurveTo(sd*205,200,sd*170,300,sd*120,320);c.bezierCurveTo(sd*60,330,sd*-10,300,sd*-30,240);c.bezierCurveTo(sd*(sd>0?-10:-50),150,sd*-40,40,sd*-30,-80);c.closePath();};
    const lg=c.createRadialGradient(sd*80,0,20,sd*80,0,320);lg.addColorStop(0,`rgba(${120+ex*120|0},${170-ex*60|0},${255-ex*120|0},0.40)`);lg.addColorStop(1,'rgba(80,140,220,0.12)');c.fillStyle=lg;lp();c.fill();glow('rgba(140,200,255,0.9)',18);c.strokeStyle='rgba(190,225,255,0.9)';c.lineWidth=5/lk;c.stroke();c.shadowBlur=0;
    // lobe fissures
    c.strokeStyle='rgba(190,225,255,0.45)';c.lineWidth=3;c.beginPath();c.moveTo(sd*190,-20);c.quadraticCurveTo(sd*100,40,sd*10,170);c.stroke();if(sd>0){c.beginPath();c.moveTo(sd*200,90);c.quadraticCurveTo(sd*130,110,sd*70,100);c.stroke();}
    // bronchial tree inside
    c.save();lp();c.clip();c.strokeStyle='rgba(210,235,255,0.55)';const br=(x0,y0,a,L,w,d)=>{if(d>5)return;const x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L;c.lineWidth=w;seg(c,x0,y0,x1,y1);br(x1,y1,a-0.45+hash(d*3+x0)*0.2,L*0.72,w*0.7,d+1);br(x1,y1,a+0.42-hash(d*5+y0)*0.2,L*0.72,w*0.7,d+1);};
    br(sd*-20,-180,sd>0?0.9:Math.PI-0.9,90,9,0);br(sd*-20,-120,sd>0?1.3:Math.PI-1.3,110,8,1);
    // tears
    if(tr>0){c.strokeStyle=`rgba(255,70,60,${tr})`;glow('rgba(255,60,40,1)',20);c.lineWidth=7/lk;for(let k=0;k<3;k++){const bx=sd*(60+k*45),by=-120+k*140;c.beginPath();c.moveTo(bx,by);for(let j=1;j<6;j++)c.lineTo(bx+sd*j*12*tr+(hash(k*9+j)-0.5)*26,by+j*18*tr);c.stroke();
      c.fillStyle=`rgba(255,80,60,${0.5*tr})`;c.beginPath();c.arc(bx,by,26*tr,0,TAU);c.fill();}c.shadowBlur=0;}
    c.restore();c.restore();}
  // trachea + main bronchi
  glow('rgba(140,200,255,0.8)',10);c.strokeStyle='rgba(200,230,255,0.75)';c.lineWidth=26;seg(c,0,-500,0,-250);c.lineWidth=18;c.beginPath();c.moveTo(0,-250);c.quadraticCurveTo(-30,-220,-80,-190);c.stroke();c.beginPath();c.moveTo(0,-250);c.quadraticCurveTo(30,-220,80,-190);c.stroke();
  c.strokeStyle='rgba(20,40,70,0.7)';c.lineWidth=12;seg(c,0,-500,0,-255);for(let i=0;i<9;i++){c.strokeStyle='rgba(220,240,255,0.6)';c.lineWidth=4;seg(c,-13,-490+i*26,13,-490+i*26);}
  // spine
  for(let i=0;i<14;i++){const yy=-470+i*64;c.fillStyle='rgba(225,240,255,0.55)';c.strokeStyle='rgba(235,248,255,0.95)';c.lineWidth=3;rr(c,-24,yy,48,48,10);c.fill();c.stroke();c.fillStyle='rgba(225,240,255,0.35)';c.fillRect(-6,yy+48,12,16);}
  // clavicles + sternum
  c.strokeStyle='rgba(240,250,255,0.95)';c.lineWidth=20;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*30,-400);c.quadraticCurveTo(sd*150,-430,sd*280,-390);c.stroke();}
  c.fillStyle='rgba(230,245,255,0.6)';c.beginPath();c.moveTo(-26,-390);c.lineTo(26,-390);c.lineTo(20,-60);c.lineTo(0,-20);c.lineTo(-20,-60);c.closePath();c.fill();c.lineWidth=4;c.stroke();
  // ribs: 10 pairs; pushed outward as lungs grow
  for(let i=0;i<10;i++){const yy=-360+i*56,wid=(170+i*14)*(1+ex*0.12),dr=30+i*6;for(const sd of [-1,1]){c.strokeStyle='rgba(240,250,255,0.9)';c.lineWidth=13-i*0.4;glow('rgba(160,210,255,0.8)',8);
    c.beginPath();c.moveTo(sd*26,yy);c.bezierCurveTo(sd*wid*0.7,yy-40,sd*(wid+40),yy+dr*0.4,sd*wid*0.95,yy+dr+30);c.stroke();c.shadowBlur=0;c.strokeStyle='rgba(20,40,70,0.55)';c.lineWidth=3;c.stroke();}}
  // exhale vapour leaving the mouth area
  if(out>0){for(let i=0;i<8;i++){const p=((t*0.8+i/8)%1);c.fillStyle=`rgba(220,240,255,${0.5*(1-p)*out})`;c.beginPath();c.arc((hash(i)-0.5)*60,-520-p*240,20+p*50,0,TAU);c.fill();}}
  c.restore();}
// ---------- thermometer + pressure gauge + boiling glass ----------
function thermo(c,x,y,s,v,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=7;c.fillStyle='#f4f6fa';rr(c,-28,-300,56,320,28);c.fill();c.stroke();c.beginPath();c.arc(0,40,52,0,TAU);c.fill();c.stroke();
  c.fillStyle='#e8352a';c.beginPath();c.arc(0,40,38,0,TAU);c.fill();const h=lerp(20,280,v);rr(c,-14,10-h,28,h+20,14);c.fill();c.fillStyle='rgba(255,255,255,0.6)';c.fillRect(-8,-280,6,250);
  c.strokeStyle=OL;c.lineWidth=4;for(let i=0;i<8;i++)seg(c,28,-260+i*34,i%2?44:54,-260+i*34);txt(c,o.label||'37°C',0,140,62,'#fff',{sw:10});c.restore();}
function gauge(c,x,y,r,v,o={}){c.save();c.translate(x,y);c.lineJoin='round';c.fillStyle='#22262e';c.strokeStyle=OL;c.lineWidth=r*0.06;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.fillStyle='#f4f0e4';c.beginPath();c.arc(0,0,r*0.86,0,TAU);c.fill();
  const A0=Math.PI*0.75,A1=Math.PI*2.25;c.lineWidth=r*0.1;c.strokeStyle='#e03a2a';c.beginPath();c.arc(0,0,r*0.68,A0,A0+(A1-A0)*0.18);c.stroke();c.strokeStyle='#40b060';c.beginPath();c.arc(0,0,r*0.68,A0+(A1-A0)*0.62,A1);c.stroke();
  c.strokeStyle='#1a1c22';c.lineWidth=r*0.03;for(let i=0;i<=10;i++){const a=A0+(A1-A0)*i/10;seg(c,Math.cos(a)*r*0.74,Math.sin(a)*r*0.74,Math.cos(a)*r*0.84,Math.sin(a)*r*0.84);}
  const a=A0+(A1-A0)*clamp(v);c.strokeStyle='#c01818';c.lineWidth=r*0.06;c.lineCap='round';seg(c,0,0,Math.cos(a)*r*0.72,Math.sin(a)*r*0.72);c.fillStyle='#1a1c22';c.beginPath();c.arc(0,0,r*0.1,0,TAU);c.fill();
  if(o.icon==='air'){c.fillStyle='rgba(60,120,220,0.8)';for(let i=0;i<6;i++){c.beginPath();c.arc(-r*0.25+(i%3)*r*0.25,r*0.32+Math.floor(i/3)*r*0.18,r*0.06,0,TAU);c.fill();}}
  c.restore();}
function boilGlass(c,x,y,s,k,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';
  c.fillStyle='rgba(120,190,255,0.55)';c.beginPath();c.moveTo(-100,-110+(o.low||0));c.lineTo(100,-110+(o.low||0));c.lineTo(84,150);c.lineTo(-84,150);c.closePath();c.fill();
  for(let i=0;i<26*k;i++){const p=((t*(1.2+hash(i)*1.4)+hash(i*3))%1);const bx=(hash(i*5)-0.5)*150,by=140-p*250;c.fillStyle='rgba(255,255,255,0.75)';c.strokeStyle='rgba(30,60,110,0.7)';c.lineWidth=2;c.beginPath();c.arc(bx,by,(4+hash(i*7)*9)*(0.5+p),0,TAU);c.fill();c.stroke();}
  if(k>0.5){for(let i=0;i<5;i++){const p=((t*0.7+i/5)%1);c.fillStyle=`rgba(240,248,255,${0.5*(1-p)*k})`;c.beginPath();c.arc((hash(i)-0.5)*120,-130-p*200,24+p*40,0,TAU);c.fill();}}
  c.strokeStyle=OL;c.lineWidth=7;c.beginPath();c.moveTo(-110,-170);c.lineTo(-86,160);c.lineTo(86,160);c.lineTo(110,-170);c.stroke();c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=6;seg(c,-80,-140,-64,120);c.restore();}
function flameIco(c,x,y,r,t){c.save();c.translate(x,y);c.fillStyle='#ff7a20';c.strokeStyle=OL;c.lineWidth=r*0.07;c.beginPath();c.moveTo(0,-r);c.bezierCurveTo(r*0.6,-r*0.3,r*0.8,r*0.3,r*0.5,r*0.7);c.quadraticCurveTo(0,r*1.0,-r*0.5,r*0.7);c.bezierCurveTo(-r*0.8,r*0.3,-r*0.2,-r*0.2,0,-r);c.fill();c.stroke();c.fillStyle='#ffd060';c.beginPath();c.moveTo(0,-r*0.2);c.bezierCurveTo(r*0.35,r*0.2,r*0.35,r*0.55,0,r*0.7);c.bezierCurveTo(-r*0.35,r*0.55,-r*0.3,r*0.2,0,-r*0.2);c.fill();c.restore();}
// ---------- skin cross-section: epidermis / dermis / fat / muscle, gas bubbles forming, stretching dome ----------
function skinBlock(c,x,y,s,t,o={}){const b=o.bub||0,st=o.st||0;c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';const Wd=760,dome=st*170;
  const top=(xx)=>-220-dome*Math.max(0,1-Math.pow(xx/(Wd/2),2));
  const layer=(y0f,y1,fill)=>{c.fillStyle=fill;c.beginPath();for(let xx=-Wd/2;xx<=Wd/2;xx+=20)c.lineTo(xx,y0f(xx));for(let xx=Wd/2;xx>=-Wd/2;xx-=20)c.lineTo(xx,typeof y1==='function'?y1(xx):y1);c.closePath();c.fill();};
  // muscle
  layer(()=>140,320,'#b4404a');c.strokeStyle='rgba(90,20,30,0.5)';c.lineWidth=3;for(let i=0;i<14;i++)seg(c,-Wd/2,160+i*12,Wd/2,160+i*12+4);
  // fat
  layer(xx=>top(xx)*0.15+40-dome*0.2,140,'#f2d27a');for(let i=0;i<46;i++){const fx=(hash(i)-0.5)*Wd*0.95,fy=60+hash(i*3)*70;c.fillStyle='#f8e2a0';c.strokeStyle='rgba(170,130,50,0.7)';c.lineWidth=2.5;c.beginPath();c.ellipse(fx,fy,26,18,0,0,TAU);c.fill();c.stroke();}
  // dermis
  layer(xx=>top(xx)+26,xx=>top(xx)*0.15+40-dome*0.2,'#f0a8a0');c.strokeStyle='rgba(200,40,60,0.75)';c.lineWidth=5;c.beginPath();for(let xx=-Wd/2;xx<=Wd/2;xx+=20)c.lineTo(xx,top(xx)*0.55+12+Math.sin(xx*0.03)*14);c.stroke();
  c.strokeStyle='rgba(60,80,200,0.6)';c.beginPath();for(let xx=-Wd/2;xx<=Wd/2;xx+=20)c.lineTo(xx,top(xx)*0.45+30+Math.sin(xx*0.025+1)*12);c.stroke();
  for(let i=0;i<5;i++){const hx=-300+i*150;c.strokeStyle='#4a2a1a';c.lineWidth=4;seg(c,hx,top(hx)-40,hx+6,top(hx)+90);c.fillStyle='#e88a80';c.beginPath();c.ellipse(hx+6,top(hx)+90,12,18,0,0,TAU);c.fill();}
  // epidermis
  layer(xx=>top(xx),xx=>top(xx)+26,'#f6d2b4');c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let xx=-Wd/2;xx<=Wd/2;xx+=20)c.lineTo(xx,top(xx));c.stroke();
  // gas bubbles in the tissue
  for(let i=0;i<22;i++){const g0=hash(i*7);if(g0>b)continue;const bx=(hash(i)-0.5)*Wd*0.9,by=lerp(top(bx)+40,120,hash(i*3)),r=(10+hash(i*5)*28)*Math.min(1,(b-g0)*3);c.fillStyle='rgba(235,248,255,0.85)';c.strokeStyle='rgba(30,50,90,0.9)';c.lineWidth=3;c.beginPath();c.arc(bx,by,r,0,TAU);c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(bx-r*0.3,by-r*0.35,r*0.25,0,TAU);c.fill();}
  // block frame (cut faces)
  c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-Wd/2,top(-Wd/2));c.lineTo(-Wd/2,320);c.lineTo(Wd/2,320);c.lineTo(Wd/2,top(Wd/2));c.stroke();
  c.restore();}
// ---------- heat: air molecules carry heat away vs vacuum keeps it ----------
function heatPanel(c,x,y,s,t,air,k=1){c.save();c.translate(x,y);c.scale(s*k,s*k);panel(c,-210,-300,420,600,{r:36,fill:air?'rgba(60,110,160,0.55)':'rgba(6,8,20,0.9)'});
  // body icon
  c.fillStyle='#f6d2b4';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,-90,48,0,TAU);c.fill();c.stroke();rr(c,-50,-36,100,170,40);c.fill();c.stroke();
  // heat aura
  const hg=c.createRadialGradient(0,0,40,0,0,air?140:190);hg.addColorStop(0,'rgba(255,140,60,0.0)');hg.addColorStop(0.5,`rgba(255,140,60,${air?0.18:0.45})`);hg.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=hg;c.fillRect(-210,-300,420,600);
  if(air){for(let i=0;i<26;i++){const a=hash(i)*TAU,sp=0.4+hash(i*3)*0.6,d=((t*sp*120+hash(i*5)*260)%260)+60;const mx=Math.cos(a)*d*0.75,my=Math.sin(a)*d;const hot=d<120;c.fillStyle=hot?'#ff8a3a':'#7ac0ff';c.strokeStyle=OL;c.lineWidth=2.5;c.beginPath();c.arc(mx,my,11,0,TAU);c.fill();c.stroke();
      if(hot){c.strokeStyle='rgba(255,140,60,0.7)';c.lineWidth=3;seg(c,mx,my,mx-Math.cos(a)*24,my-Math.sin(a)*24);}}}
  else{c.strokeStyle='rgba(255,170,90,0.7)';c.lineWidth=5;for(let i=0;i<3;i++){const p=((t*0.5+i/3)%1);c.globalAlpha=1-p;c.beginPath();c.arc(0,0,70+p*80,0,TAU);c.stroke();}c.globalAlpha=1;}
  c.restore();}
// ---------- blood vessel with red cells losing oxygen ----------
function vessel(c,x,y,s,t,ox){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';
  const vg=c.createLinearGradient(0,-130,0,130);vg.addColorStop(0,'#a8303a');vg.addColorStop(0.15,'#e8a4a0');vg.addColorStop(0.85,'#e8a4a0');vg.addColorStop(1,'#a8303a');c.fillStyle=vg;c.strokeStyle=OL;c.lineWidth=7;rr(c,-520,-130,1040,260,30);c.fill();c.stroke();
  c.fillStyle='rgba(120,20,30,0.25)';c.fillRect(-520,-130,1040,30);
  const red=[mixC('#4a3a8a','#e02a2a',ox),mixC('#2a1e5a','#9a1418',ox)];
  for(let i=0;i<16;i++){const px=((hash(i)*1040+t*180*(0.8+hash(i*3)*0.4))%1080)-540,py=(hash(i*5)-0.5)*160,rot=t*(hash(i*7)-0.5)*2+i;c.save();c.translate(px,py);c.rotate(rot);c.fillStyle=red[0];c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.ellipse(0,0,46,30,0,0,TAU);c.fill();c.stroke();c.fillStyle=red[1];c.beginPath();c.ellipse(0,0,22,13,0,0,TAU);c.fill();
    if(ox>0.2&&hash(i*9)<ox){c.fillStyle='#7ac8ff';c.strokeStyle=OL;c.lineWidth=2.5;for(const [a,b] of [[30,-26],[38,-10]]){c.beginPath();c.arc(a,b,9,0,TAU);c.fill();c.stroke();}}c.restore();}
  c.restore();}
function o2bar(c,x,y,s,v){c.save();c.translate(x,y);c.scale(s,s);panel(c,-300,-60,600,120,{r:30,fill:'rgba(10,12,24,0.92)'});c.fillStyle='#7ac8ff';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.arc(-235,0,34,0,TAU);c.fill();c.stroke();txt(c,'O₂',-235,2,34,'#0a1430',{stroke:false});
  c.fillStyle='rgba(255,255,255,0.12)';rr(c,-180,-22,440,44,22);c.fill();const col=v>0.5?'#40c060':v>0.25?'#f0c030':'#e03a2a';c.fillStyle=col;rr(c,-180,-22,440*clamp(v),44,22);c.fill();c.restore();}
// ---------- 90-second rescue ring ----------
function rescueRing(c,x,y,r,sec,o={}){const k=o.k??1;if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(10,12,24,0.88)';c.beginPath();c.arc(0,0,r*1.12,0,TAU);c.fill();
  c.lineWidth=r*0.16;c.strokeStyle='rgba(255,255,255,0.12)';c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();const f90=Math.min(sec,90)/120;c.strokeStyle='#40c060';c.lineCap='butt';c.beginPath();c.arc(0,0,r,-Math.PI/2,-Math.PI/2+f90*TAU);c.stroke();
  if(sec>90){c.strokeStyle='#e03a2a';c.beginPath();c.arc(0,0,r,-Math.PI/2+0.75*TAU,-Math.PI/2+Math.min(sec,120)/120*TAU);c.stroke();}
  c.strokeStyle='#fff';c.lineWidth=r*0.04;const a9=-Math.PI/2+0.75*TAU;seg(c,Math.cos(a9)*r*0.8,Math.sin(a9)*r*0.8,Math.cos(a9)*r*1.2,Math.sin(a9)*r*1.2);
  const m=Math.floor(sec/60),ss=Math.floor(sec%60);txt(c,`${m}:${String(ss).padStart(2,'0')}`,0,4,r*0.5,sec>90?'#ff5a4a':'#fff',{sw:r*0.06});c.restore();}
// ---------- vignette-iris for "lights out" ----------
function iris(c,k,x=540,y=900){if(k<=0)return;c.save();const r=lerp(1400,0,eio(clamp(k)));c.fillStyle='#000';c.beginPath();c.rect(-50,-50,W+100,H+100);c.arc(x,y,Math.max(1,r),0,TAU,true);c.fill('evenodd');c.restore();}
// air-rush streaks toward a point
function windStreaks(c,t,x,y,a=1,n=40){c.save();for(let i=0;i<n;i++){const sx=hash(i)*W,sy=hash(i*3)*H,p=((t*1.6+hash(i*5))%1);const px=lerp(sx,x,p),py=lerp(sy,y,p);const dx=x-sx,dy=y-sy,L=Math.hypot(dx,dy)||1;c.strokeStyle=`rgba(255,255,255,${0.5*a*Math.sin(p*Math.PI)})`;c.lineWidth=3+hash(i*7)*5;c.lineCap='round';seg(c,px,py,px-dx/L*(60+hash(i)*120),py-dy/L*(60+hash(i)*120));}c.restore();}
// floating debris (clipboard, pen, cup, bolts)
function debris(c,x,y,s,rot,kind){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4;
  if(kind===0){c.fillStyle='#8a6a40';rr(c,-40,-55,80,110,6);c.fill();c.stroke();c.fillStyle='#f4f2ea';c.fillRect(-32,-44,64,92);c.fillStyle='#b8bcc4';rr(c,-16,-62,32,16,4);c.fill();c.stroke();c.strokeStyle='rgba(40,40,60,0.5)';c.lineWidth=2;for(let i=0;i<6;i++)seg(c,-24,-30+i*12,24,-30+i*12);}
  else if(kind===1){c.fillStyle='#2a5ad0';rr(c,-6,-50,12,100,5);c.fill();c.stroke();c.fillStyle='#e8e8e8';c.beginPath();c.moveTo(-6,50);c.lineTo(6,50);c.lineTo(0,64);c.closePath();c.fill();c.stroke();}
  else if(kind===2){c.fillStyle='#f0f0f0';c.beginPath();c.moveTo(-30,-36);c.lineTo(30,-36);c.lineTo(24,36);c.lineTo(-24,36);c.closePath();c.fill();c.stroke();c.fillStyle='#3a6ab0';c.fillRect(-27,-10,54,16);c.beginPath();c.arc(36,0,14,-1.2,1.2);c.stroke();}
  else{c.fillStyle='#a8acb4';c.beginPath();for(let i=0;i<6;i++){const a=i/6*TAU;c.lineTo(Math.cos(a)*14,Math.sin(a)*14);}c.closePath();c.fill();c.stroke();c.fillStyle='#4a4e58';c.beginPath();c.arc(0,0,5,0,TAU);c.fill();}
  c.restore();}
// ---------- Earth composited only into the black sky of an orbit plate (mask built from the plate) ----------
const MASK={};let _EL=null;
function skyMaskOf(id){if(MASK[id])return MASK[id];const cv=mk(W,H),x=cv.getContext('2d');x.drawImage(IMG[id],0,0,W,H);const d=x.getImageData(0,0,W,H),p=d.data;
  for(let i=0;i<p.length;i+=4){const m=Math.max(p[i],p[i+1],p[i+2]);const a=m<10?255:m>26?0:Math.round(255*(26-m)/16);p[i]=p[i+1]=p[i+2]=255;p[i+3]=a;}x.putImageData(d,0,0);return MASK[id]=cv;}
function earthBehind(c,id,co,ex,ey,R,t,rot=0.3){if(!_EL)_EL=mk(Math.round(W*SS),Math.round(H*SS));const L=_EL.getContext('2d');L.setTransform(1,0,0,1,0,0);L.globalCompositeOperation='source-over';L.clearRect(0,0,_EL.width,_EL.height);L.setTransform(SS,0,0,SS,0,0);
  starfield(L,t,{n:420});earth(L,ex,ey,R,t,{rot});const keep=IMG[id];IMG[id]=skyMaskOf(id);L.globalCompositeOperation='destination-in';cam(L,id,co);L.restore();IMG[id]=keep;L.globalCompositeOperation='source-over';
  c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(_EL,0,0);c.restore();}
