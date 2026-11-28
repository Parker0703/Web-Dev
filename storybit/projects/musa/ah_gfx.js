'use strict';
// ===================== Antwerp heist · 2D graphics helpers =====================
// front/back-view walker (toward or away from camera): feet alternate under the hips, body bobs, scale grows with depth
function walkerZ(c,kind,t,A,B,t0,dur,face,o={}){const d=travel(t,t0,dur,1,o.acc??0.2);const x=lerp(A.x,B.x,d),y=lerp(A.y,B.y,d),s=lerp(A.s,B.s,d);
  const moving=(t>t0&&t<t0+dur)?1:0;const ph=(t-t0)*(o.rate||1.9)*Math.PI*2*moving+(o.ph0||0);const lift=(o.kind==='sneak'?34:16),bob=(o.kind==='sneak'?7:4);
  const la=Math.max(0,Math.sin(ph))*lift*moving,lb=Math.max(0,-Math.sin(ph))*lift*moving;const crouch=(o.kind==='sneak'?16:2)+bob*Math.abs(Math.cos(ph))*moving;const hipY=-116+crouch+Math.sin((T)*2.6)*1.4;
  const ff=[11,-la-hipY],fb=[-11,-lb-hipY];const sw=Math.sin(ph)*moving;
  const hf=o.kind==='sneak'?[22,46+sw*4]:[18+sw*3,86-Math.abs(sw)*6],hb=o.kind==='sneak'?[-18,48-sw*4]:[-16-sw*3,86-Math.abs(sw)*6];
  return who(c,kind,[0,0,0],Object.assign({},face,{abs:{x,y,s},f:1,ff,fb,hf:o.hfFix||hf,hb:o.hbFix||hb,crouch,lean:0,tilt:sw*0.035,rot:1e-4}));}
// flashlight cone from a point toward an angle
function torch(c,x,y,ang,len,k=1,col='255,244,210'){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,4,x,y,len);g.addColorStop(0,`rgba(${col},${0.42*k})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;
  c.beginPath();c.moveTo(x,y);c.arc(x,y,len,ang-0.22,ang+0.22);c.closePath();c.fill();c.restore();}
function vignDark(c,a=0.6){const g=c.createRadialGradient(540,960,300,540,960,1150);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=g;c.fillRect(0,0,W,H);}
function tint(c2,col,mode='soft-light'){c2.save();c2.globalCompositeOperation=mode;c2.fillStyle=col;c2.fillRect(0,0,W,H);c2.restore();}
// briefcase carried at a hand point
function briefcase(c,x,y,k=1){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4*k;c.fillStyle='#5a3220';rr(c,-34*k,8*k,68*k,48*k,6*k);c.fill();c.stroke();c.fillStyle='#3a2014';c.fillRect(-34*k,26*k,68*k,5*k);
  c.strokeStyle=OL;c.lineWidth=5*k;c.beginPath();c.moveTo(-12*k,8*k);c.quadraticCurveTo(0,-6*k,12*k,8*k);c.stroke();c.fillStyle='#d8b050';c.fillRect(-26*k,20*k,8*k,8*k);c.fillRect(18*k,20*k,8*k,8*k);c.restore();}
// open steel safe-deposit drawer, seen from slightly above, with contents callback
function drawer(c,x,y,w,fillFn){const k=w/600,h=w*0.42,d=w*0.3;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  // back wall of boxes behind
  // interior
  c.fillStyle='#4a505a';c.beginPath();c.moveTo(-w/2,-h/2);c.lineTo(w/2,-h/2);c.lineTo(w/2-d*0.4,-h/2-d);c.lineTo(-w/2+d*0.4,-h/2-d);c.closePath();c.fill();c.stroke();
  if(fillFn)fillFn(c,0,-h/2-d*0.35,w*0.8);
  // front face
  const g=c.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#dfe3ea');g.addColorStop(1,'#8e95a0');c.fillStyle=g;rr(c,-w/2,-h/2,w,h,10*k);c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=2*k;for(let i=0;i<14;i++){c.beginPath();c.moveTo(-w/2+10*k,-h/2+10*k+i*h/15);c.lineTo(w/2-10*k,-h/2+10*k+i*h/15);c.stroke();}
  c.fillStyle='#c8a050';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.6;rr(c,-60*k,-h/2+22*k,120*k,40*k,4*k);c.fill();c.stroke();c.fillStyle='#4a3a1a';c.font=`bold ${26*k}px sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('109',0,-h/2+42*k);
  for(const dx of [-70,70]){c.fillStyle='#d8c070';c.beginPath();c.arc(dx*k,h*0.12,20*k,0,TAU);c.fill();c.stroke();c.fillStyle='#1a1a1a';c.beginPath();c.arc(dx*k,h*0.1,6*k,0,TAU);c.fill();c.fillRect(dx*k-3*k,h*0.1,6*k,16*k);}
  c.fillStyle='#5a606a';rr(c,-70*k,h/2-50*k,140*k,18*k,6*k);c.fill();c.stroke();c.restore();}
// burst of sparkle stars
function sparkBurst(c,x,y,t0,t,R=200,n=14,col='255,255,255'){const u=(t-t0)/0.6;if(u<0||u>1)return;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const a=i/n*TAU+hash(i)*0.4,d=EZ.out(u)*R*(0.6+hash(i*3)*0.5),L=(1-u)*26;
  c.fillStyle=`rgba(${col},${1-u})`;const px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;c.beginPath();c.moveTo(px,py-L);c.lineTo(px+L*0.2,py);c.lineTo(px,py+L);c.lineTo(px-L*0.2,py);c.closePath();c.fill();c.beginPath();c.moveTo(px-L,py);c.lineTo(px,py+L*0.2);c.lineTo(px+L,py);c.lineTo(px,py-L*0.2);c.closePath();c.fill();}c.restore();}
function puff(c,x,y,t0,t,R=120,col='220,220,230'){const u=(t-t0)/0.7;if(u<0||u>1)return;c.save();for(let i=0;i<9;i++){const a=i/9*TAU,d=EZ.out(u)*R;c.fillStyle=`rgba(${col},${0.7*(1-u)})`;c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d*0.7,(30+u*40)*R/120,0,TAU);c.fill();}c.restore();}
// Antwerp skyline (2D): the cathedral spire, step-gabled guild houses, the Scheldt
function antwerpSky(c,t,k=1){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2e4c94');g.addColorStop(0.45,'#c88aa0');g.addColorStop(0.62,'#f4b884');g.addColorStop(1,'#d88a6a');c.fillStyle=g;c.fillRect(0,0,W,H);
  // sun + glow + soft clouds lit from below
  const sx=800,sy=760;const sg=c.createRadialGradient(sx,sy,40,sx,sy,520);sg.addColorStop(0,'rgba(255,236,190,0.75)');sg.addColorStop(1,'rgba(255,220,160,0)');c.fillStyle=sg;c.fillRect(0,0,W,1400);c.fillStyle='#fff3d6';c.beginPath();c.arc(sx,sy,62,0,TAU);c.fill();
  for(let i=0;i<6;i++){const cx=((i*230+t*12)%1500)-200,cy=200+i*80;const cg=c.createLinearGradient(0,cy-30,0,cy+30);cg.addColorStop(0,'rgba(255,240,235,0.55)');cg.addColorStop(1,'rgba(255,190,150,0.35)');c.fillStyle=cg;for(const [dx,dy,rx,ry] of [[0,0,150,28],[-80,10,90,20],[90,8,110,22],[30,-14,80,22]]){c.beginPath();c.ellipse(cx+dx,cy+dy,rx,ry,0,0,TAU);c.fill();}}
  c.lineJoin='round';
  // far layer: hazy rooftops and towers (atmospheric perspective)
  c.fillStyle='rgba(150,110,140,0.55)';c.beginPath();c.moveTo(0,1300);let x=0;let i=0;while(x<W){const w=60+hash(i*9)*50,h=80+hash(i*4)*120;c.lineTo(x,1300-h);c.lineTo(x+w/2,1300-h-40);c.lineTo(x+w,1300-h);x+=w;i++;}c.lineTo(W,1300);c.lineTo(W,1400);c.lineTo(0,1400);c.closePath();c.fill();
  c.fillStyle='rgba(140,100,130,0.6)';for(const [tx,th] of [[120,330],[930,280]]){c.fillRect(tx-16,1300-th,32,th);c.beginPath();c.moveTo(tx-22,1300-th);c.lineTo(tx,1300-th-90);c.lineTo(tx+22,1300-th);c.fill();}
  // ---- the cathedral (Our Lady), shaded stone, buttresses, tracery, clock, crockets on the spire
  const cx=400,by=1330;const stone=(x0,x1)=>{const q=c.createLinearGradient(x0,0,x1,0);q.addColorStop(0,'#c2a8a8');q.addColorStop(0.55,'#9a8290');q.addColorStop(1,'#6a5668');return q;};
  c.strokeStyle=OL;c.lineWidth=5;c.fillStyle=stone(cx-90,cx+90);c.beginPath();c.moveTo(cx-90,by);c.lineTo(cx-90,by-520);c.lineTo(cx-66,by-560);c.lineTo(cx-56,by-760);c.lineTo(cx-38,by-800);c.lineTo(cx-28,by-960);c.lineTo(cx,by-1100);c.lineTo(cx+28,by-960);c.lineTo(cx+38,by-800);c.lineTo(cx+56,by-760);c.lineTo(cx+66,by-560);c.lineTo(cx+90,by-520);c.lineTo(cx+90,by);c.closePath();c.fill();c.stroke();
  // buttress lines + stage bands
  c.strokeStyle='rgba(60,40,60,0.45)';c.lineWidth=3;for(const bx of [-60,-30,30,60]){c.beginPath();c.moveTo(cx+bx,by);c.lineTo(cx+bx*0.6,by-760);c.stroke();}
  c.fillStyle='rgba(255,230,210,0.5)';for(const yy of [520,760,800,960]){const w=yy>900?30:(yy>780?40:(yy>600?58:92));c.fillRect(cx-w,by-yy-6,w*2,8);}
  // pointed tracery windows, lit warm
  for(let r=0;r<4;r++){const wy=by-140-r*130,ww=r<2?22:16;for(const dx of r<2?[-36,0,36]:[-18,18]){c.fillStyle='#3a2a40';c.beginPath();c.moveTo(cx+dx-ww/2,wy);c.lineTo(cx+dx-ww/2,wy-60);c.quadraticCurveTo(cx+dx,wy-86,cx+dx+ww/2,wy-60);c.lineTo(cx+dx+ww/2,wy);c.closePath();c.fill();c.fillStyle='rgba(255,200,120,0.55)';c.fillRect(cx+dx-ww/2+4,wy-50,ww-8,46);}}
  c.fillStyle='#f4e4b8';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.arc(cx,by-640,24,0,TAU);c.fill();c.stroke();c.strokeStyle='#2a1a1a';c.lineWidth=3;c.beginPath();c.moveTo(cx,by-640);c.lineTo(cx,by-657);c.moveTo(cx,by-640);c.lineTo(cx+12,by-640);c.stroke();
  c.fillStyle='rgba(255,236,200,0.85)';for(let q=0;q<9;q++){const yy=by-800-q*32,ww=30-q*2.6;c.beginPath();c.arc(cx-ww,yy,4,0,TAU);c.arc(cx+ww,yy,4,0,TAU);c.fill();}
  c.fillStyle='#e8c860';c.beginPath();c.moveTo(cx,by-1100);c.lineTo(cx-6,by-1130);c.lineTo(cx,by-1150);c.lineTo(cx+6,by-1130);c.closePath();c.fill();
  // sun rim on the right edge of the spire
  c.strokeStyle='rgba(255,220,170,0.8)';c.lineWidth=4;c.beginPath();c.moveTo(cx+90,by-520);c.lineTo(cx+66,by-560);c.lineTo(cx+56,by-760);c.lineTo(cx+38,by-800);c.lineTo(cx+28,by-960);c.lineTo(cx,by-1100);c.stroke();
  // nave roof behind
  c.fillStyle='#6a5a72';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(cx+90,by-380);c.lineTo(cx+220,by-500);c.lineTo(cx+350,by-380);c.lineTo(cx+350,by);c.lineTo(cx+90,by);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(40,30,50,0.35)';c.beginPath();c.moveTo(cx+220,by-500);c.lineTo(cx+350,by-380);c.lineTo(cx+350,by);c.lineTo(cx+220,by);c.closePath();c.fill();
  // ---- guild houses: brick fronts with shading, stone-capped stepped gables, framed windows, shutters, doors, chimneys
  const cols=['#b85a42','#d8a070','#8a5a4a','#c88a5a','#6a7a8a','#a8684a','#d0b080','#7a4a3a'];x=-30;i=0;
  while(x<W+40){const w=104+hash(i)*40,h=330+hash(i*3)*170;const col=cols[i%cols.length];const top=by+260-h;
    const path=()=>{c.beginPath();c.moveTo(x,H);c.lineTo(x,top);for(let s=0;s<4;s++){c.lineTo(x+s*w/8,top-s*26);c.lineTo(x+(s+1)*w/8,top-s*26);}c.lineTo(x+w/2,top-124);for(let s=3;s>=0;s--){c.lineTo(x+w-(s+1)*w/8,top-s*26);c.lineTo(x+w-s*w/8,top-s*26);}c.lineTo(x+w,H);c.closePath();};
    // side wall peeking out (depth) on every other house
    if(i%2){c.fillStyle=shd(col,-0.35);c.beginPath();c.moveTo(x+w,top+10);c.lineTo(x+w+18,top+26);c.lineTo(x+w+18,H);c.lineTo(x+w,H);c.closePath();c.fill();}
    path();const fg=c.createLinearGradient(x,top-124,x+w,H);fg.addColorStop(0,shd(col,0.18));fg.addColorStop(0.6,col);fg.addColorStop(1,shd(col,-0.3));c.fillStyle=fg;c.fill();
    // brick courses
    c.save();path();c.clip();c.strokeStyle='rgba(60,25,15,0.18)';c.lineWidth=2;for(let yy=top-120;yy<H;yy+=14){c.beginPath();c.moveTo(x,yy);c.lineTo(x+w,yy);c.stroke();}
    // shadow from the neighbour + sun wash from the right
    const sh=c.createLinearGradient(x,0,x+w,0);sh.addColorStop(0,'rgba(30,10,30,0.28)');sh.addColorStop(0.3,'rgba(30,10,30,0)');sh.addColorStop(1,'rgba(255,210,150,0.18)');c.fillStyle=sh;c.fillRect(x,top-130,w,H);c.restore();
    c.strokeStyle=OL;c.lineWidth=5;path();c.stroke();
    // stone coping on the steps
    c.strokeStyle='#efe0c8';c.lineWidth=5;c.beginPath();c.moveTo(x,top);for(let s=0;s<4;s++){c.lineTo(x+s*w/8,top-s*26);c.lineTo(x+(s+1)*w/8,top-s*26);}c.lineTo(x+w/2,top-124);for(let s=3;s>=0;s--){c.lineTo(x+w-(s+1)*w/8,top-s*26);c.lineTo(x+w-s*w/8,top-s*26);}c.stroke();
    // round attic window
    c.fillStyle='#2a2030';c.beginPath();c.arc(x+w/2,top-60,12,0,TAU);c.fill();c.strokeStyle='#efe0c8';c.lineWidth=4;c.stroke();
    // cornice bands
    c.fillStyle='rgba(240,225,200,0.75)';for(let r=0;r<4;r++)c.fillRect(x+4,top+16+r*84,w-8,6);
    // windows: stone frame, sill, mullion cross, lit or dark, shutters on some
    for(let r=0;r<4;r++)for(let q=0;q<2;q++){const wx=x+w*0.18+q*w*0.38,wy=top+34+r*84,ww=w*0.24,wh=52;const lit=hash(i*7+r*3+q)>0.4;
      c.fillStyle='#efe0c8';c.fillRect(wx-4,wy-4,ww+8,wh+8);
      const wg=c.createLinearGradient(0,wy,0,wy+wh);if(lit){wg.addColorStop(0,'#ffe6a8');wg.addColorStop(1,'#f0a860');}else{wg.addColorStop(0,'#4a5a7a');wg.addColorStop(1,'#2a3048');}c.fillStyle=wg;c.fillRect(wx,wy,ww,wh);
      c.strokeStyle='#3a2a20';c.lineWidth=2.5;c.beginPath();c.moveTo(wx+ww/2,wy);c.lineTo(wx+ww/2,wy+wh);c.moveTo(wx,wy+wh*0.4);c.lineTo(wx+ww,wy+wh*0.4);c.stroke();
      if(!lit){c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(wx+3,wy+3,ww*0.3,6);}
      c.fillStyle='#d8c8a8';c.fillRect(wx-6,wy+wh+2,ww+12,6);
      if(hash(i*13+r)>0.65){c.fillStyle=['#2a5a3a','#6a2a2a','#2a3a6a'][i%3];c.fillRect(wx-ww*0.42,wy,ww*0.36,wh);c.fillRect(wx+ww+ww*0.06,wy,ww*0.36,wh);}
      if(lit){c.save();c.globalCompositeOperation='lighter';const lg2=c.createRadialGradient(wx+ww/2,wy+wh/2,2,wx+ww/2,wy+wh/2,ww*1.2);lg2.addColorStop(0,'rgba(255,200,120,0.25)');lg2.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=lg2;c.fillRect(wx-ww,wy-ww,ww*3,wh+ww*2);c.restore();}}
    // shop door + awning on the ground floor
    const dy=top+34+4*84;if(dy<H-60){c.fillStyle='#3a2418';c.beginPath();c.moveTo(x+w*0.36,H);c.lineTo(x+w*0.36,dy+20);c.quadraticCurveTo(x+w*0.5,dy-6,x+w*0.64,dy+20);c.lineTo(x+w*0.64,H);c.closePath();c.fill();c.strokeStyle=OL;c.lineWidth=4;c.stroke();
      if(i%3===0){c.fillStyle=['#c83a3a','#2a6a4a','#e8c050'][i%3===0?(i/3)%3|0:0];c.beginPath();c.moveTo(x+6,dy-10);c.lineTo(x+w-6,dy-10);c.lineTo(x+w+4,dy+24);c.lineTo(x-4,dy+24);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.6)';for(let q=0;q<5;q++)c.fillRect(x+q*w/5+4,dy-8,w/10,30);}}
    // chimney
    if(hash(i*5)>0.5){c.fillStyle=shd(col,-0.2);c.strokeStyle=OL;c.lineWidth=4;c.fillRect(x+w*0.7,top-100,18,50);c.strokeRect(x+w*0.7,top-100,18,50);c.fillStyle='rgba(240,235,235,0.35)';c.beginPath();c.arc(x+w*0.7+9+Math.sin(t+i)*6,top-120-((t*20+i*13)%40),10,0,TAU);c.fill();}
    x+=w;i++;}
  // the Scheldt, reflecting the warm sky, with ripples and a little boat
  const rg=c.createLinearGradient(0,1660,0,H);rg.addColorStop(0,'#c88a8a');rg.addColorStop(0.3,'#6a6a9a');rg.addColorStop(1,'#2a3456');c.fillStyle=rg;c.fillRect(0,1660,W,H-1660);c.fillStyle='#4a3a3a';c.fillRect(0,1652,W,10);
  c.save();c.globalCompositeOperation='lighter';const rf=c.createLinearGradient(sx-60,0,sx+60,0);rf.addColorStop(0,'rgba(255,220,160,0)');rf.addColorStop(0.5,'rgba(255,220,160,0.4)');rf.addColorStop(1,'rgba(255,220,160,0)');c.fillStyle=rf;c.fillRect(sx-60,1662,120,H-1662);c.restore();
  c.strokeStyle='rgba(255,230,200,0.55)';c.lineWidth=3;for(let q=0;q<16;q++){const yy=1680+q*16,xx=((hash(q)*W+t*30*(q%2?1:-1))%W+W)%W;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+50+hash(q*3)*80,yy);c.stroke();}
  const bx=((t*40)%1400)-200;c.fillStyle='#2a2028';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(bx-60,1712);c.lineTo(bx+60,1712);c.lineTo(bx+44,1734);c.lineTo(bx-44,1734);c.closePath();c.fill();c.stroke();c.fillRect(bx-10,1690,20,22);}
// Belgian flag pin
function flagPin(c,x,y,k,pop){if(pop<=0)return;c.save();c.translate(x,y);c.scale(pop,pop);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5*k;c.fillStyle='#e8e8e4';c.fillRect(-3*k,-180*k,6*k,180*k);c.strokeRect(-3*k,-180*k,6*k,180*k);
  const wv=Math.sin(T*5)*6*k;for(const [i,col] of [[0,'#1a1a1a'],[1,'#f2c418'],[2,'#e8342a']]){c.fillStyle=col;c.beginPath();c.moveTo(3*k+i*40*k,-180*k+wv*i*0.3);c.lineTo(3*k+(i+1)*40*k,-180*k+wv*(i+1)*0.3);c.lineTo(3*k+(i+1)*40*k,-100*k+wv*(i+1)*0.3);c.lineTo(3*k+i*40*k,-100*k+wv*i*0.3);c.closePath();c.fill();}
  c.strokeRect(3*k,-180*k,120*k,80*k);c.restore();}
// building cross-section: ground floor + 2 basements, vault at the bottom; ten shield rings
function crossSection(c,t,o={}){c.fillStyle='#14161e';c.fillRect(0,0,W,H);const gy=o.gy??720;
  // sky + street level
  const sk=c.createLinearGradient(0,0,0,gy);sk.addColorStop(0,'#4a6aa8');sk.addColorStop(1,'#a8c0dc');c.fillStyle=sk;c.fillRect(0,0,W,gy);
  c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#8c8a84';c.fillRect(160,gy-620,760,620);c.strokeRect(160,gy-620,760,620);c.fillStyle='rgba(120,150,190,0.9)';for(let r=0;r<5;r++)for(let q=0;q<6;q++)c.fillRect(196+q*120,gy-590+r*110,88,60);
  c.fillStyle='#2a2c32';c.fillRect(480,gy-150,120,150);
  // earth
  const eg=c.createLinearGradient(0,gy,0,H);eg.addColorStop(0,'#6a4a32');eg.addColorStop(1,'#2a1a12');c.fillStyle=eg;c.fillRect(0,gy,W,H-gy);speckles(c,0,gy,W,H-gy,140,'rgba(255,220,180,0.12)');
  // two basement floors
  for(let f=0;f<2;f++){const y=gy+40+f*360;c.fillStyle=f?'#3a3e48':'#4a4e58';c.fillRect(160,y,760,300);c.strokeRect(160,y,760,300);c.fillStyle='#6a6e78';c.fillRect(160,y+300,760,20);
    if(!f){c.fillStyle='#8a8e98';for(let q=0;q<5;q++)c.fillRect(200+q*150,y+120,90,180);}}
  // stairs
  c.strokeStyle='#9aa0aa';c.lineWidth=6;for(let s=0;s<8;s++){c.beginPath();c.moveTo(180+s*16,gy+40+s*36);c.lineTo(196+s*16,gy+40+s*36);c.stroke();}
  // the vault room
  const vy=gy+400,vx=540;c.fillStyle='#c8ccd4';c.fillRect(220,vy+10,640,280);c.strokeStyle=OL;c.lineWidth=5;c.strokeRect(220,vy+10,640,280);
  c.fillStyle='#9aa0aa';for(let r=0;r<4;r++)for(let q=0;q<9;q++){c.fillRect(246+q*68,vy+30+r*62,60,54);}
  return {vx,vy:vy+150};}
function speckles(c,x,y,w,h,n,col){c.fillStyle=col;for(let i=0;i<n;i++){c.beginPath();c.arc(x+hash(i*3.1)*w,y+hash(i*5.7)*h,1.5+hash(i)*3,0,TAU);c.fill();}}
function shieldRings(c,x,y,n,t,t0,R0=200){for(let i=0;i<n;i++){const k=popK(t,t0+i*0.07,0.3);if(k<=0)continue;const r=R0+i*26;c.save();c.globalAlpha=0.85*Math.min(1,k);c.strokeStyle=i%2?'rgba(90,200,255,0.9)':'rgba(140,230,255,0.9)';c.lineWidth=7;c.setLineDash([30,10]);c.lineDashOffset=(i%2?1:-1)*t*40;
  c.beginPath();c.ellipse(x,y,r*k,r*0.62*k,0,0,TAU);c.stroke();c.restore();}}
// icon card (rounded panel with a drawing)
function card(c,x,y,w,h,k,fn){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);panel(c,-w/2,-h/2,w,h,{r:40,fill:'rgba(14,18,30,0.94)'});c.strokeStyle='rgba(140,200,255,0.5)';c.lineWidth=4;rr(c,-w/2+10,-h/2+10,w-20,h-20,32);c.stroke();fn(c);c.restore();}
function radarIco(c,R,t){c.strokeStyle='rgba(90,255,150,0.6)';c.lineWidth=4;for(let i=1;i<=3;i++){c.beginPath();c.arc(0,0,R*i/3,0,TAU);c.stroke();}c.beginPath();c.moveTo(-R,0);c.lineTo(R,0);c.moveTo(0,-R);c.lineTo(0,R);c.stroke();
  const a=t*3;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<20;i++){c.fillStyle=`rgba(90,255,150,${0.35*(1-i/20)})`;c.beginPath();c.moveTo(0,0);c.arc(0,0,R,a-i*0.05-0.05,a-i*0.05);c.closePath();c.fill();}c.restore();
  c.fillStyle='#8aff9a';const bl=Math.max(0,Math.sin(t*3-1.2));c.globalAlpha=bl;c.beginPath();c.arc(R*0.4,-R*0.3,10,0,TAU);c.fill();c.globalAlpha=1;}
function seismoIco(c,R,t,amp=1){c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=2;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(-R*1.3,i*R*0.25);c.lineTo(R*1.3,i*R*0.25);c.stroke();}
  c.strokeStyle='#ffb04a';c.lineWidth=5;c.beginPath();for(let i=0;i<=120;i++){const x=-R*1.3+i*R*2.6/120;const q=i/120;const sp=Math.exp(-Math.pow((q-((t*0.4)%1))*7,2));c.lineTo(x,Math.sin(i*1.3+t*20)*R*0.5*sp*amp+Math.sin(i*0.4)*3);}c.stroke();
  c.fillStyle='#2a2c34';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(R*1.3,-R*0.9);c.lineTo(R*1.3+40,-R*0.9);c.lineTo(R*1.3+40,R*0.9);c.lineTo(R*1.3,R*0.9);c.closePath();c.fill();c.stroke();}
function magnetIco(c,R,t,plate=0){for(const sd of [-1,1]){c.fillStyle=sd<0?'#d83a3a':'#3a6ad8';c.strokeStyle=OL;c.lineWidth=5;rr(c,sd*R*0.9-(sd<0?R*0.5:0),-R*0.5,R*0.5,R,10);c.fill();c.stroke();}
  c.save();c.strokeStyle='rgba(140,200,255,0.85)';c.lineWidth=4;c.setLineDash([16,10]);c.lineDashOffset=-t*60;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(-R*0.4,i*R*0.12);c.bezierCurveTo(-R*0.1,i*R*0.32,R*0.1,i*R*0.32,R*0.4,i*R*0.12);c.stroke();}c.restore();
  if(plate>0){c.save();c.globalAlpha=Math.min(1,plate);const g=c.createLinearGradient(-R*0.3,0,R*0.3,0);g.addColorStop(0,'#e8ecf2');g.addColorStop(0.5,'#a8b0bc');g.addColorStop(1,'#d8dce4');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=4;
    c.beginPath();c.moveTo(-R*0.36,-R*0.62+(1-plate)*-200);c.lineTo(R*0.34,-R*0.6+(1-plate)*-200);c.lineTo(R*0.36,R*0.6+(1-plate)*-200);c.lineTo(-R*0.33,R*0.62+(1-plate)*-200);c.closePath();c.fill();c.stroke();c.restore();}}
// combination digits rolling
function rollDigits(c,x,y,sz,t,t0,final='100,000,000'){const u=clamp((t-t0)/1.2);c.save();c.textAlign='center';c.textBaseline='middle';c.font=`900 ${sz}px Montserrat, sans-serif`;
  let s='';for(let i=0;i<final.length;i++){const ch=final[i];if(ch===','){s+=',';continue;}s+=(u>=1||u*final.length>i*1.0+hash(i)*3)?ch:String(Math.floor(hash(i*7+Math.floor(t*30))*10));}
  c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=sz*0.18;c.strokeText(s,x,y);c.fillStyle='#ffd24a';c.fillText(s,x,y);c.restore();}
// desk calendar page
function calPage(c,x,y,w,month,day,k=1,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;c.fillStyle='#f6f2ea';rr(c,-w/2,-w*0.6,w,w*1.2,20);c.fill();c.stroke();
  c.fillStyle='#d83a2a';c.beginPath();c.moveTo(-w/2+20,-w*0.6);c.lineTo(w/2-20,-w*0.6);c.quadraticCurveTo(w/2,-w*0.6,w/2,-w*0.6+20);c.lineTo(w/2,-w*0.3);c.lineTo(-w/2,-w*0.3);c.lineTo(-w/2,-w*0.6+20);c.quadraticCurveTo(-w/2,-w*0.6,-w/2+20,-w*0.6);c.closePath();c.fill();c.stroke();
  for(const sd of [-1,1]){c.fillStyle='#3a3a40';c.beginPath();c.arc(sd*w*0.25,-w*0.6,12,0,TAU);c.fill();}
  c.fillStyle='#fff';c.font=`900 ${w*0.13}px Montserrat, sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(month,0,-w*0.45);
  c.fillStyle='#1e1e24';c.font=`900 ${w*0.44}px Montserrat, sans-serif`;c.fillText(String(day),0,w*0.08);if(o.year){c.font=`800 ${w*0.12}px Montserrat, sans-serif`;c.fillStyle='#6a6a70';c.fillText(o.year,0,w*0.44);}
  if(o.circle){c.strokeStyle='#e8342a';c.lineWidth=10;c.beginPath();const u=clamp(o.circle);c.ellipse(0,w*0.08,w*0.34,w*0.26,-0.2,-1.6,-1.6+u*TAU*1.05);c.stroke();}
  c.restore();}
// wristwatch close-up
function watchFace(c,x,y,R,t,hh=11.9,mm=59,o={}){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=8;
  c.fillStyle='#2a2420';rr(c,-R*0.6,-R*2.2,R*1.2,R*4.4,30);c.fill();c.stroke();
  let g=c.createRadialGradient(-R*0.3,-R*0.3,R*0.2,0,0,R*1.15);g.addColorStop(0,'#fff6c8');g.addColorStop(1,'#a87a20');c.fillStyle=g;c.beginPath();c.arc(0,0,R*1.15,0,TAU);c.fill();c.stroke();
  c.fillStyle='#f8f6f0';c.beginPath();c.arc(0,0,R,0,TAU);c.fill();c.stroke();for(let i=0;i<12;i++){const a=i/12*TAU;c.strokeStyle='#2a2a30';c.lineWidth=i%3?4:8;c.beginPath();c.moveTo(Math.sin(a)*R*0.82,-Math.cos(a)*R*0.82);c.lineTo(Math.sin(a)*R*0.94,-Math.cos(a)*R*0.94);c.stroke();}
  const sec=o.sec??((t*1)%60);const ha=(hh%12+mm/60)/12*TAU,ma=mm/60*TAU,sa=sec/60*TAU;c.lineCap='round';c.strokeStyle='#1a1a1e';c.lineWidth=12;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ha)*R*0.5,-Math.cos(ha)*R*0.5);c.stroke();c.lineWidth=8;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ma)*R*0.78,-Math.cos(ma)*R*0.78);c.stroke();
  c.strokeStyle='#d83a2a';c.lineWidth=4;c.beginPath();c.moveTo(-Math.sin(sa)*R*0.15,Math.cos(sa)*R*0.15);c.lineTo(Math.sin(sa)*R*0.86,-Math.cos(sa)*R*0.86);c.stroke();c.fillStyle='#1a1a1e';c.beginPath();c.arc(0,0,10,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-R*0.35,-R*0.45,R*0.35,R*0.16,-0.6,0,TAU);c.fill();c.restore();}
// side-view car (getaway hatchback / police)
function car(c,x,y,w,o={}){const k=w/600;c.save();c.translate(x,y-26*k);if(o.f===-1)c.scale(-1,1);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);const col=o.col||'#3a4a6a';const bob=Math.sin((o.t??T)*18)*2*k*(o.moving??1);c.translate(0,bob);
  c.fillStyle=col;c.beginPath();c.moveTo(-w/2,-40*k);c.lineTo(-w/2+10*k,-100*k);c.lineTo(-w*0.24,-112*k);c.lineTo(-w*0.12,-190*k);c.lineTo(w*0.2,-190*k);c.lineTo(w*0.34,-114*k);c.lineTo(w/2-10*k,-104*k);c.lineTo(w/2,-40*k);c.quadraticCurveTo(w/2,-20*k,w/2-20*k,-20*k);c.lineTo(-w/2+20*k,-20*k);c.quadraticCurveTo(-w/2,-20*k,-w/2,-40*k);c.closePath();c.fill();c.stroke();
  if(o.police){c.fillStyle='#f4f4f4';c.fillRect(-w/2+8*k,-86*k,w-16*k,30*k);c.fillStyle='#2a5ad8';c.fillRect(-w/2+8*k,-70*k,w-16*k,10*k);c.strokeRect(-w/2+8*k,-86*k,w-16*k,30*k);
    const bl=Math.sin((o.t??T)*14)>0;c.fillStyle=bl?'#3a7aff':'#ff3a3a';rr(c,-30*k,-212*k,60*k,22*k,6*k);c.fill();c.stroke();c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,-200*k,0,0,-200*k,200*k);g.addColorStop(0,bl?'rgba(60,120,255,0.5)':'rgba(255,60,60,0.5)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(-220*k,-400*k,440*k,400*k);c.restore();}
  c.fillStyle='rgba(150,190,230,0.85)';c.beginPath();c.moveTo(-w*0.2,-118*k);c.lineTo(-w*0.1,-180*k);c.lineTo(w*0.04,-180*k);c.lineTo(w*0.04,-118*k);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(w*0.08,-118*k);c.lineTo(w*0.08,-180*k);c.lineTo(w*0.18,-180*k);c.lineTo(w*0.3,-118*k);c.closePath();c.fill();c.stroke();
  if(o.inside)o.inside(c,k);
  c.fillStyle='#ffe8a0';rr(c,w/2-24*k,-90*k,18*k,18*k,4*k);c.fill();c.fillStyle='#d83a2a';rr(c,-w/2+4*k,-92*k,14*k,18*k,4*k);c.fill();
  if(o.beams){c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(w/2,0,w/2+500*k,0);g.addColorStop(0,'rgba(255,240,190,0.5)');g.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=g;c.beginPath();c.moveTo(w/2-10*k,-84*k);c.lineTo(w/2+500*k,-160*k);c.lineTo(w/2+500*k,20*k);c.closePath();c.fill();c.restore();}
  const sp=(o.t??T)*(o.wheel??10);for(const wx of [-w*0.3,w*0.3]){c.fillStyle='#16161a';c.beginPath();c.arc(wx,-20*k,46*k,0,TAU);c.fill();c.stroke();c.fillStyle='#9aa0aa';c.beginPath();c.arc(wx,-20*k,22*k,0,TAU);c.fill();c.strokeStyle='#4a4e56';c.lineWidth=4*k;for(let i=0;i<5;i++){const a=sp+i/5*TAU;c.beginPath();c.moveTo(wx,-20*k);c.lineTo(wx+Math.cos(a)*20*k,-20*k+Math.sin(a)*20*k);c.stroke();}c.strokeStyle=OL;c.lineWidth=OLW(k);}
  c.restore();}
// cork evidence board with polaroids (portrait callbacks), pins, red strings
function polaroid(c,x,y,w,rot,drawFn,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=20;c.shadowOffsetY=8;c.fillStyle='#f8f6f0';c.fillRect(-w/2,-w*0.6,w,w*1.2);c.shadowColor='transparent';
  c.save();c.beginPath();c.rect(-w*0.42,-w*0.52,w*0.84,w*0.84);c.clip();c.fillStyle=o.bg||'#8a9ab0';c.fillRect(-w/2,-w*0.6,w,w);drawFn(c,0,-w*0.1,w);c.restore();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2;c.strokeRect(-w*0.42,-w*0.52,w*0.84,w*0.84);
  if(o.mark){c.strokeStyle='#e8342a';c.lineWidth=10;c.beginPath();c.ellipse(0,-w*0.1,w*0.46,w*0.48,0,-1.6,-1.6+clamp(o.mark)*TAU*1.05);c.stroke();}
  c.fillStyle='#d83a2a';c.beginPath();c.arc(0,-w*0.56,12,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=3;c.stroke();c.restore();}
function corkBG(c){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#a87a4a');g.addColorStop(1,'#8a5e34');c.fillStyle=g;c.fillRect(0,0,W,H);speckles(c,0,0,W,H,900,'rgba(70,40,20,0.35)');speckles(c,0,0,W,H,500,'rgba(255,220,170,0.2)');}
function redString(c,a,b,u){if(u<=0)return;const ex=lerp(a.x,b.x,u),ey=lerp(a.y,b.y,u)+Math.sin(u*Math.PI)*30;c.save();c.strokeStyle='#d8282a';c.lineWidth=5;c.beginPath();c.moveTo(a.x,a.y);c.quadraticCurveTo((a.x+ex)/2,(a.y+ey)/2+40*u,ex,ey);c.stroke();c.restore();}
// DNA double helix rising
function dnaHelix(c,x,y,h,t,k=1){c.save();c.translate(x,y);for(let i=0;i<28;i++){const v=i/27;if(v>k)break;const yy=-v*h,a=v*TAU*2.2+t*3;const x1=Math.sin(a)*60,x2=Math.sin(a+Math.PI)*60;const z1=Math.cos(a);
  c.strokeStyle='rgba(200,230,255,0.6)';c.lineWidth=4;c.beginPath();c.moveTo(x1,yy);c.lineTo(x2,yy);c.stroke();for(const [xx,zz,col] of [[x1,z1,'#5ad0ff'],[x2,-z1,'#ff6aa0']]){c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.arc(xx,yy,9+zz*3,0,TAU);c.fill();c.stroke();}}c.restore();}
// prison bars + cell wall with tally marks
function prisonCell(c,t,barsX,tally){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#5a5e66');g.addColorStop(1,'#2a2c32');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let r=0;r<20;r++)for(let q=0;q<6;q++){c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=3;c.strokeRect(q*190-(r%2)*95,r*100,190,100);}
  c.fillStyle='#1a1c22';c.fillRect(0,1480,W,440);
  // small high window
  c.fillStyle='#a8c4e8';c.fillRect(760,300,180,130);c.strokeStyle='#2a2c32';c.lineWidth=10;c.strokeRect(760,300,180,130);for(let i=1;i<4;i++){c.beginPath();c.moveTo(760+i*45,300);c.lineTo(760+i*45,430);c.stroke();}
  c.save();c.globalCompositeOperation='lighter';const lg=c.createLinearGradient(850,430,600,1500);lg.addColorStop(0,'rgba(200,220,255,0.25)');lg.addColorStop(1,'rgba(200,220,255,0)');c.fillStyle=lg;c.beginPath();c.moveTo(760,430);c.lineTo(940,430);c.lineTo(820,1500);c.lineTo(420,1500);c.closePath();c.fill();c.restore();
  if(tally>0){c.strokeStyle='rgba(240,240,230,0.8)';c.lineWidth=7;c.lineCap='round';for(let i=0;i<Math.floor(tally);i++){const grp=Math.floor(i/5),j=i%5;const bx=120+grp*150,by=560;if(j<4){c.beginPath();c.moveTo(bx+j*24,by);c.lineTo(bx+j*24+4,by+110);c.stroke();}else{c.beginPath();c.moveTo(bx-14,by+80);c.lineTo(bx+90,by+20);c.stroke();}}}}
function barsFront(c,t,slide){c.save();const off=(1-slide)*W;c.translate(off,0);for(let i=0;i<7;i++){const x=90+i*150;const g=c.createLinearGradient(x-22,0,x+22,0);g.addColorStop(0,'#2a2c32');g.addColorStop(0.4,'#8a8e98');g.addColorStop(1,'#1a1c22');c.fillStyle=g;c.fillRect(x-20,0,40,H);c.strokeStyle=OL;c.lineWidth=5;c.strokeRect(x-20,-10,40,H+20);}
  for(const y of [260,1660]){const g=c.createLinearGradient(0,y-24,0,y+24);g.addColorStop(0,'#2a2c32');g.addColorStop(0.4,'#8a8e98');g.addColorStop(1,'#1a1c22');c.fillStyle=g;c.fillRect(0,y-22,W,44);c.strokeRect(-10,y-22,W+20,44);}c.restore();}
function qMark(c,x,y,sz,a=1,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha=a;c.font=`900 ${sz}px Montserrat, sans-serif`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=sz*0.16;c.strokeText('?',0,0);c.fillStyle='#ffd24a';c.fillText('?',0,0);c.restore();}
// ===================== richer looks =====================
// god rays from a point
function godRays(c,x,y,col,a,t,n=12,len=1600){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const ang=i/n*TAU+t*0.08+hash(i)*0.3,w=0.05+hash(i*3)*0.07;const g=c.createRadialGradient(x,y,0,x,y,len);g.addColorStop(0,`rgba(${col},${a*(0.5+hash(i*5)*0.5)})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(x,y);c.arc(x,y,len,ang-w,ang+w);c.closePath();c.fill();}c.restore();}
// out-of-focus bokeh circles
function bokeh(c,t,n,col,seed=0){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const s=i+seed*31;const x=(hash(s*1.3)*W+Math.sin(t*0.3+s)*30),y=(hash(s*2.9)*H+((t*12*(0.5+hash(s)))%H))%H;const r=18+hash(s*4.1)*60;const g=c.createRadialGradient(x,y,r*0.6,x,y,r);g.addColorStop(0,`rgba(${col},${0.05+hash(s*7)*0.07})`);g.addColorStop(0.92,`rgba(${col},${0.08+hash(s*7)*0.08})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}c.restore();}
// rich backdrop: deep gradient, two soft coloured light pools, bokeh, faint rays
function richBG(c,t,col='10,12,30',o={}){const [r,g,b]=col.split(',').map(Number);const gr=c.createLinearGradient(0,0,0,H);gr.addColorStop(0,`rgb(${Math.round(r*0.5)},${Math.round(g*0.5)},${Math.round(b*0.6)+8})`);gr.addColorStop(1,'#030308');c.fillStyle=gr;c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';for(const [x,y,R,cc,a] of [[220+Math.sin(t*0.3)*40,420,700,o.c1||'90,140,255',0.22],[880+Math.cos(t*0.25)*40,1450,760,o.c2||`${Math.min(255,r*4)},${Math.min(255,g*3)},${Math.min(255,b*2)}`,0.2]]){const q=c.createRadialGradient(x,y,10,x,y,R);q.addColorStop(0,`rgba(${cc},${a})`);q.addColorStop(1,`rgba(${cc},0)`);c.fillStyle=q;c.fillRect(0,0,W,H);}c.restore();
  if(o.rays!==0)godRays(c,540,-200,o.rayCol||'200,220,255',0.05,t,9,2300);bokeh(c,t,o.bok??16,o.bokCol||'180,200,255');motes(c,t,24,'200,210,255');}
// glowing HUD panel
function hudCard(c,x,y,w,h,k,col,fn,t=T){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);
  c.save();c.shadowColor=`rgba(${col},0.55)`;c.shadowBlur=60;c.fillStyle='rgba(8,12,24,0.88)';rr(c,-w/2,-h/2,w,h,36);c.fill();c.restore();
  const g=c.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,`rgba(${col},0.16)`);g.addColorStop(1,`rgba(${col},0.02)`);c.fillStyle=g;rr(c,-w/2,-h/2,w,h,36);c.fill();
  c.save();rr(c,-w/2,-h/2,w,h,36);c.clip();c.fillStyle='rgba(255,255,255,0.025)';for(let i=-h/2;i<h/2;i+=6)c.fillRect(-w/2,i,w,2);const sy=-h/2+((t*260)%(h+200))-100;const sg=c.createLinearGradient(0,sy-60,0,sy+60);sg.addColorStop(0,`rgba(${col},0)`);sg.addColorStop(0.5,`rgba(${col},0.12)`);sg.addColorStop(1,`rgba(${col},0)`);c.fillStyle=sg;c.fillRect(-w/2,sy-60,w,120);c.restore();
  c.strokeStyle=`rgba(${col},0.9)`;c.lineWidth=4;rr(c,-w/2,-h/2,w,h,36);c.stroke();c.strokeStyle=`rgba(${col},0.35)`;c.lineWidth=2;rr(c,-w/2+14,-h/2+14,w-28,h-28,26);c.stroke();
  // corner brackets
  c.strokeStyle=`rgba(${col},1)`;c.lineWidth=8;c.lineCap='round';for(const [sx,sy2] of [[-1,-1],[1,-1],[-1,1],[1,1]]){c.beginPath();c.moveTo(sx*(w/2-8),sy2*(h/2-60));c.lineTo(sx*(w/2-8),sy2*(h/2-8));c.lineTo(sx*(w/2-60),sy2*(h/2-8));c.stroke();}
  c.save();rr(c,-w/2+6,-h/2+6,w-12,h-12,30);c.clip();fn(c);c.restore();c.restore();}
// a lit desk surface (wood) with a warm lamp pool
function deskBG(c,t){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a2416');g.addColorStop(1,'#1a0e08');c.fillStyle=g;c.fillRect(0,0,W,H);c.strokeStyle='rgba(20,10,4,0.4)';c.lineWidth=3;for(let i=0;i<40;i++){c.beginPath();const y=i*50+Math.sin(i)*10;c.moveTo(0,y);c.bezierCurveTo(300,y+20*Math.sin(i*1.7),700,y-20,W,y+10);c.stroke();}
  c.save();c.globalCompositeOperation='lighter';const q=c.createRadialGradient(560,820,40,560,820,900);q.addColorStop(0,'rgba(255,200,130,0.4)');q.addColorStop(1,'rgba(255,200,130,0)');c.fillStyle=q;c.fillRect(0,0,W,H);c.restore();bokeh(c,t,10,'255,210,150',3);}
// yellow evidence marker tent with a number
function evMarker(c,x,y,n,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.lineJoin='round';c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(0,6,60,12,0,0,TAU);c.fill();
  c.fillStyle='#f2c418';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(-50,0);c.lineTo(-30,-90);c.lineTo(30,-90);c.lineTo(50,0);c.closePath();c.fill();c.stroke();c.fillStyle='#c89a10';c.beginPath();c.moveTo(30,-90);c.lineTo(50,0);c.lineTo(60,-4);c.lineTo(40,-88);c.closePath();c.fill();c.stroke();
  c.fillStyle='#1a1a1e';c.font='900 52px Montserrat, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(String(n),0,-42);c.restore();}
// camera flash pop
function flashPop(c,t0,t,a=0.7){const q=(t-t0)/0.25;if(q<0||q>1)return;c.save();c.fillStyle=`rgba(255,255,255,${a*(1-q)})`;c.fillRect(0,0,W,H);c.restore();}
// glowing neon DNA with particles
function dnaNeon(c,x,y,h,t,k=1){c.save();c.translate(x,y);c.globalCompositeOperation='lighter';for(let i=0;i<40;i++){const v=i/39;if(v>k)break;const yy=-v*h,a=v*TAU*2.6+t*2.5;const x1=Math.sin(a)*80,x2=-x1,z=Math.cos(a);
  const lg=c.createLinearGradient(x1,yy,x2,yy);lg.addColorStop(0,'rgba(90,220,255,0.5)');lg.addColorStop(1,'rgba(255,90,180,0.5)');c.strokeStyle=lg;c.lineWidth=4;c.beginPath();c.moveTo(x1,yy);c.lineTo(x2,yy);c.stroke();
  for(const [xx,zz,col] of [[x1,z,'90,220,255'],[x2,-z,'255,90,180']]){const r=10+zz*4;const g=c.createRadialGradient(xx,yy,0,xx,yy,r*3);g.addColorStop(0,`rgba(${col},0.95)`);g.addColorStop(0.35,`rgba(${col},0.45)`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(xx,yy,r*3,0,TAU);c.fill();}}
  for(let i=0;i<30;i++){const q=((t*0.5+hash(i))%1);if(q>k)continue;c.fillStyle=`rgba(180,240,255,${0.6*(1-q)})`;c.beginPath();c.arc((hash(i*3)-0.5)*240,-q*h,2+hash(i*5)*3,0,TAU);c.fill();}c.restore();}
// forensic lab backdrop: dark teal, grid floor, UV glow
function labBG(c,t){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#06121e');g.addColorStop(1,'#020408');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.save();c.strokeStyle='rgba(90,200,255,0.12)';c.lineWidth=2;for(let i=0;i<=20;i++){const x=i*W/20;c.beginPath();c.moveTo(540+(x-540)*0.3,1150);c.lineTo(x*1.6-W*0.3,H);c.stroke();}for(let j=0;j<12;j++){const y=1150+Math.pow(j/11,1.8)*770;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}c.restore();
  c.save();c.globalCompositeOperation='lighter';const q=c.createRadialGradient(540,1300,40,540,1300,800);q.addColorStop(0,'rgba(140,90,255,0.28)');q.addColorStop(1,'rgba(140,90,255,0)');c.fillStyle=q;c.fillRect(0,0,W,H);c.restore();bokeh(c,t,7,'120,200,255',7);}
// ===================== detailed side-view sedan (early-2000s hatch/saloon) =====================
// x,y = ground contact centre, w = length px; o.f=-1 faces left; o.front/o.rear(c,win) draw occupants seen through the glass
function car2(c,x,y,w,o={}){const k=w/600,t=o.t??T,col=o.col||'#2e3e5e';c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.lineJoin='round';c.lineCap='round';
  const bob=(o.moving?Math.sin(t*17)*1.2*k:0);
  // ground shadow
  c.fillStyle='rgba(0,0,0,0.45)';c.beginPath();c.ellipse(0,0,w*0.5,16*k,0,0,TAU);c.fill();
  c.translate(0,bob);
  // body silhouette
  const body=()=>{c.beginPath();c.moveTo(-292*k,-62*k);c.quadraticCurveTo(-300*k,-104*k,-270*k,-118*k);c.lineTo(-190*k,-128*k);c.quadraticCurveTo(-150*k,-196*k,-96*k,-204*k);c.lineTo(78*k,-204*k);c.quadraticCurveTo(122*k,-200*k,168*k,-140*k);c.lineTo(262*k,-128*k);c.quadraticCurveTo(298*k,-120*k,300*k,-86*k);c.lineTo(298*k,-54*k);c.quadraticCurveTo(296*k,-36*k,276*k,-34*k);c.lineTo(-276*k,-34*k);c.quadraticCurveTo(-294*k,-38*k,-292*k,-62*k);c.closePath();};
  // windows (glass areas)
  const winF=(nb)=>{if(!nb)c.beginPath();c.moveTo(-8*k,-134*k);c.lineTo(-8*k,-194*k);c.lineTo(72*k,-194*k);c.quadraticCurveTo(108*k,-190*k,146*k,-136*k);c.closePath();};
  const winR=(nb)=>{if(!nb)c.beginPath();c.moveTo(-170*k,-134*k);c.quadraticCurveTo(-138*k,-188*k,-96*k,-194*k);c.lineTo(-24*k,-194*k);c.lineTo(-24*k,-134*k);c.closePath();};
  // 1) interior behind the glass: dark cabin, seat backs, occupants, steering wheel
  c.save();winF();winR(1);c.clip();c.fillStyle='#1a1c24';c.fillRect(-200*k,-210*k,380*k,90*k);
  for(const sx of [-60,96]){c.fillStyle='#2e2a30';rr(c,(sx-30)*k,-178*k,26*k,60*k,8*k);c.fill();rr(c,(sx-34)*k,-196*k,20*k,22*k,6*k);c.fill();}
  if(o.rear)o.rear(c,{x:-96*k,y:-134*k,k});if(o.front)o.front(c,{x:58*k,y:-134*k,k});
  c.strokeStyle='#14141a';c.lineWidth=7*k;c.beginPath();c.ellipse(116*k,-150*k,10*k,24*k,0.3,0,TAU);c.stroke();c.lineWidth=5*k;c.beginPath();c.moveTo(116*k,-150*k);c.lineTo(140*k,-132*k);c.stroke();
  // glass tint + reflections on top of the people (they are inside)
  c.fillStyle='rgba(120,150,190,0.22)';c.fillRect(-200*k,-210*k,380*k,90*k);c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,255,255,0.22)';c.lineWidth=10*k;for(const sx of [-150,-60,20,100]){c.beginPath();c.moveTo(sx*k,-130*k);c.lineTo((sx+40)*k,-200*k);c.stroke();}c.restore();
  c.restore();
  // 2) body panels with the glass cut out
  c.save();body();winF(1);winR(1);c.clip('evenodd');
  const g=c.createLinearGradient(0,-204*k,0,-34*k);g.addColorStop(0,shd(col,0.25));g.addColorStop(0.35,shd(col,0.05));g.addColorStop(0.55,shd(col,0.2));g.addColorStop(0.6,shd(col,-0.05));g.addColorStop(1,shd(col,-0.4));c.fillStyle=g;c.fillRect(-310*k,-215*k,620*k,190*k);
  // shoulder-line highlight + lower sill shadow
  c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=4*k;c.beginPath();c.moveTo(-262*k,-112*k);c.lineTo(262*k,-118*k);c.stroke();c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(-300*k,-56*k,600*k,22*k);
  c.restore();
  c.strokeStyle=OL;c.lineWidth=OLW(k);body();c.stroke();
  // pillars + window frames, chrome trim
  c.fillStyle='#16161c';c.fillRect(-24*k,-196*k,16*k,64*k);c.strokeStyle='#c8ccd4';c.lineWidth=3*k;winF();c.stroke();winR();c.stroke();c.strokeStyle=OL;c.lineWidth=OLW(k)*0.8;winF();c.stroke();winR();c.stroke();
  // door seams, handles, side mirror, rubbing strip
  c.strokeStyle='rgba(0,0,0,0.55)';c.lineWidth=2.5*k;for(const dx of [-24,150]){c.beginPath();c.moveTo(dx*k,-132*k);c.lineTo((dx-6)*k,-42*k);c.stroke();}c.beginPath();c.moveTo(-178*k,-130*k);c.lineTo(-184*k,-46*k);c.stroke();
  c.fillStyle='#c8ccd4';for(const hx of [-60,104]){rr(c,hx*k,-116*k,26*k,7*k,3*k);c.fill();}
  c.fillStyle=shd(col,-0.1);c.strokeStyle=OL;c.lineWidth=3*k;c.beginPath();c.moveTo(150*k,-140*k);c.lineTo(172*k,-150*k);c.lineTo(176*k,-132*k);c.lineTo(152*k,-128*k);c.closePath();c.fill();c.stroke();
  c.fillStyle='#22222a';c.fillRect(-270*k,-80*k,540*k,9*k);
  // bumpers, lights, plate
  c.fillStyle='#26262c';rr(c,268*k,-74*k,32*k,30*k,6*k);c.fill();rr(c,-300*k,-74*k,32*k,30*k,6*k);c.fill();
  const lit=o.lights??1;c.fillStyle=lit?'#fff4c0':'#d8d8c8';c.strokeStyle=OL;c.lineWidth=3*k;c.beginPath();c.moveTo(258*k,-120*k);c.lineTo(290*k,-114*k);c.lineTo(292*k,-96*k);c.lineTo(262*k,-98*k);c.closePath();c.fill();c.stroke();
  c.fillStyle=lit?'#ff3a2a':'#8a2a2a';c.beginPath();c.moveTo(-262*k,-116*k);c.lineTo(-290*k,-110*k);c.lineTo(-292*k,-90*k);c.lineTo(-264*k,-94*k);c.closePath();c.fill();c.stroke();
  if(o.hazard&&Math.sin(t*9)>0){c.save();c.globalCompositeOperation='lighter';for(const hx of [-278,276]){const hg=c.createRadialGradient(hx*k,-102*k,1,hx*k,-102*k,60*k);hg.addColorStop(0,'rgba(255,170,40,0.9)');hg.addColorStop(1,'rgba(255,170,40,0)');c.fillStyle=hg;c.fillRect((hx-60)*k,-162*k,120*k,120*k);}c.restore();}
  if(o.beams){c.save();c.globalCompositeOperation='lighter';const bg=c.createLinearGradient(290*k,0,800*k,0);bg.addColorStop(0,'rgba(255,240,190,0.45)');bg.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=bg;c.beginPath();c.moveTo(286*k,-112*k);c.lineTo(820*k,-170*k);c.lineTo(820*k,10*k);c.closePath();c.fill();c.restore();}
  // wheels: arches, tyres with tread, alloy rims with 5 spokes, hub highlight
  const rot=(o.wheel??0)*t;for(const wx of [-182,182]){c.fillStyle='#0c0c10';c.beginPath();c.arc(wx*k,-38*k,58*k,Math.PI,TAU);c.fill();
    c.fillStyle='#18181c';c.beginPath();c.arc(wx*k,-38*k,48*k,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=OLW(k);c.stroke();
    c.strokeStyle='#2a2a30';c.lineWidth=3*k;for(let i=0;i<16;i++){const a=rot+i/16*TAU;c.beginPath();c.moveTo(wx*k+Math.cos(a)*42*k,-38*k+Math.sin(a)*42*k);c.lineTo(wx*k+Math.cos(a)*48*k,-38*k+Math.sin(a)*48*k);c.stroke();}
    const rg=c.createRadialGradient((wx-8)*k,-46*k,2*k,wx*k,-38*k,32*k);rg.addColorStop(0,'#f2f4f8');rg.addColorStop(1,'#8a909a');c.fillStyle=rg;c.beginPath();c.arc(wx*k,-38*k,31*k,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=3*k;c.stroke();
    c.fillStyle='#4a4e58';for(let i=0;i<5;i++){const a=rot+i/5*TAU;c.save();c.translate(wx*k,-38*k);c.rotate(a);c.beginPath();c.moveTo(-5*k,-8*k);c.lineTo(5*k,-8*k);c.lineTo(9*k,-27*k);c.lineTo(-9*k,-27*k);c.closePath();c.fill();c.restore();}
    c.fillStyle='#d8dce4';c.beginPath();c.arc(wx*k,-38*k,8*k,0,TAU);c.fill();c.stroke();}
  c.restore();}
// a seated passenger seen through a side window: torso + shoulders + head, sized to the window (callback for car2)
function seated(kind,face){return (c,win)=>{const k=win.k;c.save();c.translate(win.x,win.y);
  const s=0.6*k;who(c,kind,[0,0,0],Object.assign({},face,{abs:{x:0,y:192*s,s},f:1,air:1,rot:1e-4,hf:[34,40],hb:[24,44],ff:[30,-10],fb:[24,-10]}));c.restore();};}
