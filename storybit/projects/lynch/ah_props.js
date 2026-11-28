'use strict';
// ===================== Antwerp heist · props (2D, ink-outlined, style 5) =====================
const OLW=k=>Math.max(2,5*k);
// ---------- THE SANDWICH: crusty baguette, salami, butter, lettuce — half eaten, with a real bite ----------
// x,y = centre of the sandwich, L = length in px (sandwich spans L wide, ~0.36L tall), rot radians, o.bite 0..1 (how much is eaten)
function sandwich(c,x,y,L,rot=0,o={}){const k=L/600,bite=o.bite??1,t=o.t??T;c.save();c.translate(x,y);c.rotate(rot);if(o.flip)c.scale(-1,1);c.lineJoin='round';c.lineCap='round';
  const hw=L/2;
  // soft contact shadow
  if(!o.noShadow){const sg=c.createRadialGradient(0,96*k,10*k,0,96*k,hw*1.05);sg.addColorStop(0,'rgba(0,0,0,0.45)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.beginPath();c.ellipse(0,96*k,hw*1.05,40*k,0,0,TAU);c.fill();}
  // bites taken out of the right end: overlapping circles (bigger as more is eaten)
  const sh=(1-bite)*260*k;const bites=bite>0?[[hw+30*k+sh,-34*k,150*k],[hw-96*k+sh,74*k,84*k]]:[];
  const notOthers=(i)=>{bites.forEach((b,j)=>{if(j!==i){c.beginPath();c.rect(-hw-200*k,-300*k,L+400*k,600*k);c.moveTo(b[0]+b[2],b[1]);c.arc(b[0],b[1],b[2],0,TAU,true);c.clip('evenodd');}});};
  const silh=()=>{c.beginPath();c.moveTo(-hw,30*k);c.bezierCurveTo(-hw-14*k,-40*k,-hw+30*k,-96*k,-hw+110*k,-100*k);c.bezierCurveTo(-120*k,-112*k,160*k,-112*k,hw-60*k,-98*k);c.bezierCurveTo(hw+10*k,-90*k,hw+16*k,-20*k,hw,30*k);
    c.bezierCurveTo(hw+4*k,76*k,hw-40*k,92*k,hw-90*k,92*k);c.lineTo(-hw+80*k,92*k);c.bezierCurveTo(-hw+20*k,92*k,-hw-6*k,72*k,-hw,30*k);c.closePath();};
  // clip everything to "sandwich minus bites"
  c.save();for(const [bx,by,br] of bites){c.beginPath();c.rect(-hw-200*k,-300*k,L+400*k,600*k);c.moveTo(bx+br,by);c.arc(bx,by,br,0,TAU,true);c.clip('evenodd');}
  // --- bottom roll (flat, paler crust)
  c.beginPath();c.moveTo(-hw+4*k,40*k);c.bezierCurveTo(-hw-4*k,80*k,-hw+40*k,94*k,-hw+90*k,94*k);c.lineTo(hw-90*k,94*k);c.bezierCurveTo(hw-30*k,94*k,hw+6*k,78*k,hw-2*k,40*k);c.closePath();
  let g=c.createLinearGradient(0,30*k,0,96*k);g.addColorStop(0,'#e8b46a');g.addColorStop(1,'#a8642a');c.fillStyle=g;c.fill();c.strokeStyle=OL;c.lineWidth=OLW(k);c.stroke();
  // crumb interior strip of bottom roll
  c.fillStyle='#f6e2b4';c.beginPath();c.moveTo(-hw+2*k,34*k);c.lineTo(hw-2*k,34*k);c.lineTo(hw-6*k,50*k);c.quadraticCurveTo(0,58*k,-hw+6*k,50*k);c.closePath();c.fill();
  // --- butter smear
  c.fillStyle='#fff0a0';c.beginPath();c.moveTo(-hw+8*k,28*k);for(let i=0;i<=24;i++){const xx=-hw+8*k+i*(L-16*k)/24;c.lineTo(xx,30*k+Math.sin(i*1.7)*3*k);}c.lineTo(hw-8*k,38*k);c.lineTo(-hw+8*k,38*k);c.closePath();c.fill();
  // --- salami: overlapping slices folded in, round edges peeking out, marbled
  const sal=(sx,sy,r,a)=>{c.save();c.translate(sx,sy);c.rotate(a);c.scale(1,0.42);const sg2=c.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);sg2.addColorStop(0,'#d8505a');sg2.addColorStop(0.7,'#b02a3a');sg2.addColorStop(1,'#7a1626');c.fillStyle=sg2;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
    c.fillStyle='rgba(255,236,226,0.9)';for(let i=0;i<14;i++){const aa=hash(i*3.1+sx)*TAU,dd=hash(i*7.7+sy)*r*0.82;c.beginPath();c.ellipse(Math.cos(aa)*dd,Math.sin(aa)*dd,(2.2+hash(i)*3)*k,(1.6+hash(i*2)*2)*k,aa,0,TAU);c.fill();}
    c.fillStyle='#2a1418';for(let i=0;i<4;i++){const aa=hash(i*9.1+sx)*TAU,dd=hash(i*3.3+sy)*r*0.7;c.beginPath();c.arc(Math.cos(aa)*dd,Math.sin(aa)*dd,1.8*k,0,TAU);c.fill();}
    c.strokeStyle='#5a0e1a';c.lineWidth=OLW(k)*1.6;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();c.strokeStyle='rgba(255,200,200,0.5)';c.lineWidth=2.5*k*2;c.beginPath();c.arc(0,0,r*0.86,Math.PI*1.1,Math.PI*1.6);c.stroke();c.restore();};
  for(let i=0;i<7;i++){const sx=-hw+60*k+i*(L-110*k)/6,wob=Math.sin(i*2.1)*6*k;sal(sx,22*k+wob,62*k,(hash(i)-0.5)*0.3);}
  // --- lettuce frill above the salami
  c.fillStyle='#7cc24a';c.strokeStyle='#3a6a22';c.lineWidth=OLW(k)*0.7;c.beginPath();c.moveTo(-hw+4*k,4*k);for(let i=0;i<=40;i++){const xx=-hw+4*k+i*(L-8*k)/40;c.lineTo(xx,(i%2?-8:6)*k+Math.sin(i*0.9)*5*k);}c.lineTo(hw-4*k,16*k);c.lineTo(-hw+4*k,16*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(220,255,180,0.7)';c.lineWidth=2*k;for(let i=0;i<10;i++){const xx=-hw+30*k+i*L/11;c.beginPath();c.moveTo(xx,10*k);c.lineTo(xx+8*k,-2*k);c.stroke();}
  // --- top crust: domed baguette with diagonal scores (grigne), flour dusting, sheen
  c.beginPath();c.moveTo(-hw+2*k,8*k);c.bezierCurveTo(-hw-10*k,-50*k,-hw+40*k,-100*k,-hw+120*k,-102*k);c.bezierCurveTo(-100*k,-114*k,140*k,-114*k,hw-80*k,-102*k);c.bezierCurveTo(hw-6*k,-96*k,hw+12*k,-40*k,hw-2*k,8*k);c.quadraticCurveTo(0,18*k,-hw+2*k,8*k);c.closePath();
  g=c.createLinearGradient(0,-112*k,0,12*k);g.addColorStop(0,'#c47a32');g.addColorStop(0.45,'#dc9a4a');g.addColorStop(1,'#b8702e');c.fillStyle=g;c.fill();c.strokeStyle=OL;c.lineWidth=OLW(k);c.stroke();
  for(let i=0;i<5;i++){const sx=-hw+90*k+i*(L-160*k)/4;c.save();c.translate(sx,-62*k);c.rotate(-0.55);
    c.fillStyle='#f0c888';c.beginPath();c.ellipse(0,0,46*k,11*k,0,0,TAU);c.fill();c.fillStyle='#8a4a1a';c.beginPath();c.ellipse(0,-5*k,46*k,6*k,0,0,Math.PI);c.fill();
    c.strokeStyle='#6a3612';c.lineWidth=OLW(k)*0.8;c.beginPath();c.ellipse(0,0,46*k,11*k,0,Math.PI*1.05,Math.PI*1.95);c.stroke();c.restore();}
  c.fillStyle='rgba(255,250,240,0.55)';for(let i=0;i<70;i++){const xx=-hw+30*k+hash(i*3.7)*(L-60*k),yy=-100*k+hash(i*5.3)*40*k;c.beginPath();c.arc(xx,yy,(1+hash(i)*2.2)*k,0,TAU);c.fill();}
  c.strokeStyle='rgba(255,240,210,0.6)';c.lineWidth=7*k;c.beginPath();c.moveTo(-hw+70*k,-92*k);c.quadraticCurveTo(-60*k,-106*k,60*k,-104*k);c.stroke();
  c.fillStyle='rgba(90,40,10,0.25)';for(let i=0;i<40;i++){const xx=-hw+20*k+hash(i*8.1)*(L-40*k),yy=-60*k+hash(i*2.9)*60*k;c.beginPath();c.arc(xx,yy,1.6*k,0,TAU);c.fill();}
  c.restore();// end bite clip
  // --- the bitten face: crumb, salami and lettuce cross-section along each bite edge, then tooth scallops
  if(bites.length){c.save();silh();c.clip();
    bites.forEach(([bx,by,br],bi)=>{c.save();notOthers(bi);c.beginPath();c.arc(bx,by,br+30*k,0,TAU);c.arc(bx,by,br,0,TAU,true);c.clip('evenodd');
      // layered by height: crust top, crumb, lettuce, salami, butter, crumb, crust bottom
      const band=(y0,y1,col)=>{c.fillStyle=col;c.fillRect(bx-br-20*k,y0,2*br+40*k,y1-y0);};
      band(-130*k,-96*k,'#b8702e');band(-96*k,-6*k,'#f8e6bc');band(-6*k,12*k,'#7cc24a');band(12*k,36*k,'#c03040');band(36*k,40*k,'#fff0a0');band(40*k,80*k,'#f6e2b4');band(80*k,130*k,'#a8642a');
      c.fillStyle='rgba(120,70,30,0.35)';for(let i=0;i<30;i++){const a=hash(i*7.7+by)*TAU,rr=br+6*k+hash(i*1.3)*22*k;c.beginPath();c.arc(bx+Math.cos(a)*rr,by+Math.sin(a)*rr,(1.5+hash(i)*2.5)*k,0,TAU);c.fill();}
      c.fillStyle='rgba(200,160,100,0.45)';for(let i=0;i<40;i++){const a=hash(i*4.3+bx)*TAU,rr=br+hash(i*2.1)*28*k;c.beginPath();c.ellipse(bx+Math.cos(a)*rr,by+Math.sin(a)*rr,(2+hash(i)*3)*k,(1.5+hash(i*3)*2)*k,a,0,TAU);c.fill();}
      c.restore();});
    // tooth scallops on the bite rims
    c.strokeStyle=OL;c.lineWidth=OLW(k);bites.forEach(([bx,by,br],bi)=>{c.save();notOthers(bi);c.beginPath();const n=Math.round(br/(19*k));let first=true;for(let i=0;i<=n*2;i++){const a=i/(n*2)*TAU;const r=br+(i%2?0:9*k);const px=bx+Math.cos(a)*r,py=by+Math.sin(a)*r;if(first){c.moveTo(px,py);first=false;}else c.lineTo(px,py);}c.stroke();c.restore();});
    c.restore();
    // crumbs falling / scattered
    c.fillStyle='#e8c07a';c.strokeStyle='rgba(120,70,30,0.8)';c.lineWidth=1.5*k;for(let i=0;i<12;i++){const xx=hw-150*k+hash(i*3.9)*170*k,yy=96*k+hash(i*6.1)*22*k;c.beginPath();c.ellipse(xx,yy,(3+hash(i)*5)*k,(2+hash(i*2)*3)*k,hash(i)*3,0,TAU);c.fill();c.stroke();}}
  // outline of the whole remaining silhouette (outer edges only; the bites already have rims)
  c.save();for(const [bx,by,br] of bites){c.beginPath();c.rect(-hw-200*k,-300*k,L+400*k,600*k);c.moveTo(bx+br+6*k,by);c.arc(bx,by,br+6*k,0,TAU,true);c.clip('evenodd');}silh();c.strokeStyle=OL;c.lineWidth=OLW(k)*1.3;c.stroke();c.restore();
  // a hero glint
  if(o.glint){const gl=(t*0.6)%1;c.save();silh();c.clip();c.globalCompositeOperation='lighter';const gx=-hw+gl*L*1.4;const g3=c.createLinearGradient(gx-60*k,0,gx+60*k,0);g3.addColorStop(0,'rgba(255,240,200,0)');g3.addColorStop(0.5,'rgba(255,240,200,0.18)');g3.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g3;c.fillRect(gx-60*k,-130*k,120*k,260*k);c.restore();}
  c.restore();}

// ---------- brilliant-cut diamond (side view) with sparkle ----------
function diamond(c,x,y,r,t=T,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';const k=r/40;
  const top=-r*0.42,gird=-r*0.08,bot=r*0.9;const tw=r*0.55;
  const facets=[[[-r,gird],[-tw,top],[-tw*0.35,gird]],[[-tw,top],[0,top],[-tw*0.35,gird]],[[0,top],[tw,top],[tw*0.35,gird]],[[tw,top],[r,gird],[tw*0.35,gird]],[[-tw*0.35,gird],[0,top],[tw*0.35,gird]],
    [[-r,gird],[-tw*0.35,gird],[0,bot]],[[-tw*0.35,gird],[tw*0.35,gird],[0,bot]],[[tw*0.35,gird],[r,gird],[0,bot]]];
  const cols=o.tint?[o.tint]:['#e8f6ff','#bfe4ff','#ffffff','#a8d4f4','#dff2ff','#8cc4ec','#c8e8ff','#74aedc'];
  facets.forEach((f,i)=>{c.fillStyle=cols[i%cols.length];c.beginPath();c.moveTo(...f[0]);c.lineTo(...f[1]);c.lineTo(...f[2]);c.closePath();c.fill();});
  c.strokeStyle='rgba(60,110,160,0.55)';c.lineWidth=Math.max(1,1.6*k);facets.forEach(f=>{c.beginPath();c.moveTo(...f[0]);c.lineTo(...f[1]);c.lineTo(...f[2]);c.closePath();c.stroke();});
  c.strokeStyle=OL;c.lineWidth=Math.max(1.5,3.5*k);c.beginPath();c.moveTo(-r,gird);c.lineTo(-tw,top);c.lineTo(tw,top);c.lineTo(r,gird);c.lineTo(0,bot);c.closePath();c.stroke();
  // twinkle
  const tw2=Math.max(0,Math.sin(t*3+(o.seed||0)*2.3));if(tw2>0.6||o.spark){const a=o.spark||((tw2-0.6)/0.4);c.globalCompositeOperation='lighter';c.fillStyle=`rgba(255,255,255,${a})`;const sx=-r*0.3,sy=top+r*0.1,L=r*0.9*a;
    c.beginPath();c.moveTo(sx,sy-L);c.lineTo(sx+L*0.12,sy);c.lineTo(sx,sy+L);c.lineTo(sx-L*0.12,sy);c.closePath();c.fill();c.beginPath();c.moveTo(sx-L,sy);c.lineTo(sx,sy+L*0.12);c.lineTo(sx+L,sy);c.lineTo(sx,sy-L*0.12);c.closePath();c.fill();}
  c.restore();}
function diamondPile(c,x,y,w,t=T,n=26){for(let i=0;i<n;i++){const row=Math.floor(Math.sqrt(i));const px=x+(hash(i*3.3)-0.5)*w*(1-row*0.12),py=y-row*w*0.07+hash(i*1.7)*w*0.04;diamond(c,px,py,w*(0.07+hash(i*5.1)*0.05),t,{seed:i,rot:(hash(i)-0.5)*0.8});}}
function goldBar(c,x,y,w,o={}){const h=w*0.32,k=w/200;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  c.fillStyle='#b8861c';c.beginPath();c.moveTo(-w/2,h/2);c.lineTo(w/2,h/2);c.lineTo(w/2-w*0.12,-h/2);c.lineTo(-w/2+w*0.12,-h/2);c.closePath();c.fill();c.stroke();
  const g=c.createLinearGradient(0,-h/2-h*0.5,0,-h/2);g.addColorStop(0,'#fff0a0');g.addColorStop(1,'#e8b830');c.fillStyle=g;c.beginPath();c.moveTo(-w/2+w*0.12,-h/2);c.lineTo(w/2-w*0.12,-h/2);c.lineTo(w/2-w*0.2,-h/2-h*0.45);c.lineTo(-w/2+w*0.2,-h/2-h*0.45);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(-w*0.25,-h*0.85,w*0.3,h*0.08);c.restore();}
function cashStack(c,x,y,w,o={}){const k=w/200,h=w*0.42;c.save();c.translate(x,y);c.lineJoin='round';for(let i=0;i<5;i++){c.fillStyle=i%2?'#7aa86a':'#8ab87a';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.6;c.fillRect(-w/2,-i*h*0.16,w,h*0.16);c.strokeRect(-w/2,-i*h*0.16,w,h*0.16);}
  const ty=-4*h*0.16;c.fillStyle='#9ac88a';c.fillRect(-w/2,ty-h*0.5,w,h*0.5);c.strokeStyle=OL;c.lineWidth=OLW(k);c.strokeRect(-w/2,ty-h*0.5,w,h*0.5);c.strokeStyle='#4a7a3a';c.lineWidth=2*k;c.strokeRect(-w/2+8*k,ty-h*0.5+8*k,w-16*k,h*0.5-16*k);
  c.fillStyle='#4a7a3a';c.beginPath();c.arc(0,ty-h*0.25,h*0.14,0,TAU);c.fill();c.fillStyle='#f4e8c0';c.fillRect(-w*0.08,ty-h*0.6,w*0.16,h*0.75);c.strokeStyle=OL;c.lineWidth=OLW(k)*0.6;c.strokeRect(-w*0.08,ty-h*0.6,w*0.16,h*0.75);c.restore();}
// loot duffel bag; fill 0..1 bulges it; o.strain makes it sag
function lootBag(c,x,y,w,fill=1,o={}){const k=w/200,h=w*(0.45+fill*0.2);c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  const g=c.createLinearGradient(0,-h,0,0);g.addColorStop(0,'#3a3e4a');g.addColorStop(1,'#1e2028');c.fillStyle=g;c.beginPath();c.moveTo(-w/2,0);c.bezierCurveTo(-w*0.56,-h*0.6,-w*0.4,-h,0,-h);c.bezierCurveTo(w*0.4,-h,w*0.56,-h*0.6,w/2,0);c.quadraticCurveTo(0,h*0.12*(o.sag||1),-w/2,0);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#8a8e98';c.lineWidth=3*k;c.beginPath();c.moveTo(-w*0.36,-h*0.86);c.quadraticCurveTo(0,-h*1.04,w*0.36,-h*0.86);c.stroke();c.fillStyle='#c8ccd4';c.fillRect(w*0.3,-h*0.92,10*k,16*k);
  c.strokeStyle=OL;c.lineWidth=OLW(k)*1.6;c.beginPath();c.moveTo(-w*0.22,-h*0.9);c.quadraticCurveTo(0,-h*1.5,w*0.22,-h*0.9);c.stroke();c.strokeStyle='#3a3e4a';c.lineWidth=OLW(k)*0.9;c.stroke();
  if(o.peek){diamond(c,-w*0.1,-h*0.95,w*0.07,T,{seed:3});goldBar(c,w*0.12,-h*0.92,w*0.22);}
  c.restore();}
// hairspray can
function sprayCan(c,x,y,h,rot=0,o={}){const k=h/200,w=h*0.34;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  const g=c.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#c83a6a');g.addColorStop(0.35,'#f07aa0');g.addColorStop(1,'#a02a52');c.fillStyle=g;rr(c,-w/2,-h*0.75,w,h*0.75,w*0.12);c.fill();c.stroke();
  c.fillStyle='#f4f0f4';c.fillRect(-w/2+2*k,-h*0.55,w-4*k,h*0.2);c.fillStyle='#c83a6a';for(let i=0;i<3;i++){c.beginPath();c.arc(-w*0.2+i*w*0.2,-h*0.45,w*0.06,0,TAU);c.fill();}
  c.fillStyle='#d8dce4';c.beginPath();c.moveTo(-w/2,-h*0.75);c.quadraticCurveTo(0,-h*0.9,w/2,-h*0.75);c.closePath();c.fill();c.stroke();c.fillStyle='#f4f4f8';rr(c,-w*0.18,-h*0.98,w*0.36,h*0.12,4*k);c.fill();c.stroke();
  c.fillStyle='#2a2a2e';c.beginPath();c.arc(w*0.18,-h*0.93,3*k,0,TAU);c.fill();c.restore();}
function sprayMist(c,x,y,dir,k,t,amt=1){if(amt<=0)return;c.save();c.globalAlpha=0.55*amt;for(let i=0;i<26;i++){const u=((t*2.2+hash(i)*1)%1);const d=u*260*k;const a=dir+(hash(i*3)-0.5)*0.5*u;c.fillStyle=`rgba(240,236,255,${(1-u)*0.6})`;c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,(4+u*26)*k,0,TAU);c.fill();}c.restore();}
// passive infrared heat sensor (wall-mounted dome)
function heatSensor(c,x,y,s,o={}){const k=s/100;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  c.fillStyle='#ecebe6';rr(c,-50*k,-40*k,100*k,70*k,14*k);c.fill();c.stroke();const fog=o.fog||0;
  c.fillStyle='#2a2a32';c.beginPath();c.ellipse(0,8*k,36*k,22*k,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=2*k;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*9*k,-12*k);c.lineTo(i*9*k,28*k);c.stroke();}
  const on=o.on??1;if(on>0){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(28*k,-26*k,0,28*k,-26*k,22*k);g.addColorStop(0,`rgba(255,60,50,${on})`);g.addColorStop(1,'rgba(255,60,50,0)');c.fillStyle=g;c.beginPath();c.arc(28*k,-26*k,22*k,0,TAU);c.fill();c.globalCompositeOperation='source-over';}
  c.fillStyle=on>0?'#ff4a3a':'#5a2a2a';c.beginPath();c.arc(28*k,-26*k,5*k,0,TAU);c.fill();
  if(fog>0){c.fillStyle=`rgba(236,232,244,${0.85*fog})`;c.beginPath();for(let i=0;i<14;i++){const a=i/14*TAU,r=(30+hash(i*3)*12)*k;c.lineTo(Math.cos(a)*r*1.2,8*k+Math.sin(a)*r*0.75);}c.closePath();c.fill();
    c.fillStyle=`rgba(255,255,255,${0.6*fog})`;for(let i=0;i<9;i++){c.beginPath();c.arc((hash(i)-0.5)*50*k,8*k+(hash(i*2)-0.5)*26*k,(3+hash(i*5)*4)*k,0,TAU);c.fill();}}
  c.restore();}
// heavy two-part vault key (long shaft with a 3D bit)
function vaultKey(c,x,y,L,rot=0,o={}){const k=L/400;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  const gm=(a,b)=>{const g=c.createLinearGradient(0,a,0,b);g.addColorStop(0,'#fff2b0');g.addColorStop(0.5,'#d8a838');g.addColorStop(1,'#9a6a18');return g;};
  // bow: ring with cut-outs
  c.fillStyle=gm(-60*k,60*k);c.beginPath();c.arc(-L/2+60*k,0,60*k,0,TAU);c.arc(-L/2+60*k,0,26*k,0,TAU,true);c.fill('evenodd');c.stroke();c.beginPath();c.arc(-L/2+60*k,0,26*k,0,TAU);c.stroke();
  for(let i=0;i<6;i++){const a=i/6*TAU;c.fillStyle='#9a6a18';c.beginPath();c.arc(-L/2+60*k+Math.cos(a)*43*k,Math.sin(a)*43*k,6*k,0,TAU);c.fill();}
  // shaft with collar
  c.fillStyle=gm(-12*k,12*k);rr(c,-L/2+116*k,-12*k,L-170*k,24*k,6*k);c.fill();c.stroke();c.fillStyle=gm(-20*k,20*k);rr(c,-L/2+120*k,-20*k,22*k,40*k,4*k);c.fill();c.stroke();
  // bit: stepped wards
  c.fillStyle=gm(0,70*k);c.beginPath();c.moveTo(L/2-90*k,10*k);c.lineTo(L/2-90*k,70*k);c.lineTo(L/2-70*k,70*k);c.lineTo(L/2-70*k,48*k);c.lineTo(L/2-50*k,48*k);c.lineTo(L/2-50*k,62*k);c.lineTo(L/2-30*k,62*k);c.lineTo(L/2-30*k,36*k);c.lineTo(L/2-14*k,36*k);c.lineTo(L/2-14*k,10*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=3*k;c.beginPath();c.moveTo(-L/2+130*k,-6*k);c.lineTo(L/2-70*k,-6*k);c.stroke();
  if(o.glow){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,0,0,0,0,L*0.6);g.addColorStop(0,`rgba(255,220,120,${0.25*o.glow})`);g.addColorStop(1,'rgba(255,220,120,0)');c.fillStyle=g;c.fillRect(-L*0.6,-L*0.6,L*1.2,L*1.2);}
  c.restore();}
// tiny hidden camera with a blinking REC light
function spyCam(c,x,y,s,t=T,o={}){const k=s/100;c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  c.fillStyle='#2a2c34';rr(c,-50*k,-26*k,84*k,52*k,10*k);c.fill();c.stroke();c.fillStyle='#14161c';c.beginPath();c.arc(34*k,0,24*k,0,TAU);c.fill();c.stroke();
  const g=c.createRadialGradient(28*k,-6*k,0,34*k,0,20*k);g.addColorStop(0,'#8ac0ff');g.addColorStop(0.4,'#2a4a8a');g.addColorStop(1,'#0a0e1a');c.fillStyle=g;c.beginPath();c.arc(34*k,0,16*k,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.8)';c.beginPath();c.arc(29*k,-5*k,4*k,0,TAU);c.fill();
  if(Math.sin(t*6)>0){c.fillStyle='#ff2a2a';c.beginPath();c.arc(-36*k,-14*k,6*k,0,TAU);c.fill();c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(-36*k,-14*k,0,-36*k,-14*k,18*k);g2.addColorStop(0,'rgba(255,40,40,0.6)');g2.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=g2;c.beginPath();c.arc(-36*k,-14*k,18*k,0,TAU);c.fill();}
  c.restore();}
// combination dial (front view) — rotation a
function dial(c,x,y,r,a=0){const k=r/100;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  let g=c.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r*1.1);g.addColorStop(0,'#f0f2f6');g.addColorStop(1,'#7a808a');c.fillStyle=g;c.beginPath();c.arc(0,0,r*1.12,0,TAU);c.fill();c.stroke();
  c.rotate(a);g=c.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#3a3e46');g.addColorStop(1,'#14161a');c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();
  c.strokeStyle='#e8e8e4';for(let i=0;i<100;i++){const aa=i/100*TAU,l=i%10===0?16*k:(i%5===0?11*k:6*k);c.lineWidth=(i%10===0?3:1.4)*k;c.beginPath();c.moveTo(Math.cos(aa)*(r-4*k),Math.sin(aa)*(r-4*k));c.lineTo(Math.cos(aa)*(r-4*k-l),Math.sin(aa)*(r-4*k-l));c.stroke();}
  c.fillStyle='#e8e8e4';c.font=`bold ${15*k}px sans-serif`;c.textAlign='center';c.textBaseline='middle';for(let i=0;i<10;i++){const aa=i/10*TAU-Math.PI/2;c.fillText(String(i*10),Math.cos(aa)*(r-34*k),Math.sin(aa)*(r-34*k));}
  g=c.createRadialGradient(-10*k,-10*k,2*k,0,0,34*k);g.addColorStop(0,'#9aa0aa');g.addColorStop(1,'#3a3e46');c.fillStyle=g;c.beginPath();c.arc(0,0,30*k,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=OLW(k);c.stroke();
  c.rotate(-a);c.fillStyle='#d83a2a';c.beginPath();c.moveTo(0,-r*1.12);c.lineTo(-8*k,-r*1.12-16*k);c.lineTo(8*k,-r*1.12-16*k);c.closePath();c.fill();c.restore();}
// garbage bag (black, tied)
function trashBag(c,x,y,w,o={}){const k=w/200,h=w*0.95;c.save();c.translate(x,y);c.rotate(o.rot||0);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  const g=c.createRadialGradient(-w*0.2,-h*0.6,w*0.05,0,-h*0.4,w*0.7);g.addColorStop(0,'#4a4e5a');g.addColorStop(1,'#121318');c.fillStyle=g;
  c.beginPath();c.moveTo(-w*0.12,-h*0.86);c.bezierCurveTo(-w*0.5,-h*0.7,-w*0.58,-h*0.1,-w*0.42,0);c.quadraticCurveTo(0,h*0.08,w*0.42,0);c.bezierCurveTo(w*0.58,-h*0.1,w*0.5,-h*0.7,w*0.12,-h*0.86);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(-w*0.12,-h*0.86);c.lineTo(-w*0.2,-h*1.06);c.lineTo(0,-h*0.94);c.lineTo(w*0.2,-h*1.06);c.lineTo(w*0.12,-h*0.86);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.22)';c.lineWidth=4*k;c.beginPath();c.moveTo(-w*0.3,-h*0.55);c.quadraticCurveTo(-w*0.36,-h*0.3,-w*0.28,-h*0.12);c.stroke();c.beginPath();c.moveTo(w*0.06,-h*0.7);c.quadraticCurveTo(w*0.14,-h*0.5,w*0.05,-h*0.3);c.stroke();
  c.restore();}
function receipt(c,x,y,w,rot=0){const k=w/100,h=w*1.6;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#f6f4ee';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.7;c.beginPath();c.moveTo(-w/2,-h/2);c.lineTo(w/2,-h/2);for(let i=0;i<=8;i++)c.lineTo(w/2-i*w/8,h/2-(i%2?6*k:0));c.closePath();c.fill();c.stroke();
  c.fillStyle='#8a8a90';for(let i=0;i<9;i++)c.fillRect(-w*0.38,-h*0.38+i*h*0.08,w*(0.4+hash(i*3)*0.35),3*k);c.fillStyle='#3a3a40';c.fillRect(-w*0.38,h*0.34,w*0.76,4*k);c.restore();}
function envelope(c,x,y,w,rot=0,o={}){const k=w/200,h=w*0.62;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#f0e6cc';c.strokeStyle=OL;c.lineWidth=OLW(k);rr(c,-w/2,-h/2,w,h,6*k);c.fill();c.stroke();
  c.strokeStyle='rgba(120,100,60,0.6)';c.lineWidth=3*k;c.beginPath();c.moveTo(-w/2,-h/2);c.lineTo(0,h*0.08);c.lineTo(w/2,-h/2);c.stroke();
  // diamond-centre logo: little blue diamond
  diamond(c,-w*0.32,h*0.22,w*0.07,0,{tint:'#3a6ab8'});c.fillStyle='#3a6ab8';c.fillRect(-w*0.22,h*0.18,w*0.3,4*k);c.fillRect(-w*0.22,h*0.26,w*0.2,4*k);c.restore();}
function vhsTape(c,x,y,w,rot=0){const k=w/200,h=w*0.56;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#1c1c22';c.strokeStyle=OL;c.lineWidth=OLW(k);rr(c,-w/2,-h/2,w,h,8*k);c.fill();c.stroke();
  c.fillStyle='#f2f0e8';c.fillRect(-w*0.36,-h*0.42,w*0.72,h*0.26);c.fillStyle='#d83a2a';c.fillRect(-w*0.36,-h*0.42,w*0.72,h*0.06);
  c.fillStyle='#3a3a44';rr(c,-w*0.32,-h*0.04,w*0.64,h*0.32,6*k);c.fill();for(const sd of [-1,1]){c.fillStyle='#e8e8e4';c.beginPath();c.arc(sd*w*0.18,h*0.12,h*0.12,0,TAU);c.fill();c.fillStyle='#1c1c22';c.beginPath();c.arc(sd*w*0.18,h*0.12,h*0.05,0,TAU);c.fill();}
  c.fillStyle='#4a3a2a';c.beginPath();c.arc(-w*0.18,h*0.12,h*0.1,0,TAU);c.fill();c.restore();}
