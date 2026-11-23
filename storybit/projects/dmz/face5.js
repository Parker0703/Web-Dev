'use strict';
// ===== Style 5 faces v2: anime-expressive, still simple =====
// eyes: dot, half, wide, happy, closed, squeeze, glare, rage, shock, sad, drunk, sly, focus, sleep
// brows: flat, angry, up, worried, smug, furious, sad, none
// mouths: flat, smile, smirk, frown, o, grin, shout, teeth, grit, yell, sad, sneer, drunk, wobble, drool
// extras: sweat, tear, cry, vein, gloom, shock(lines), blushK
function drawFace4(g,x,y,s,P,K){g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=OL;g.fillStyle=OL;const ex=44*s,ey=-6*s;
  const eyes=P.eyes||'dot',brow=P.brow||'flat',mouth=P.mouth||'flat',T5=(typeof T!=='undefined'?T:0);const lk=Array.isArray(P.look)?P.look[0]:(P.look||0);
  if(K.old){g.strokeStyle='rgba(150,110,110,0.5)';g.lineWidth=3.6*s;for(const k of [-1,0,1]){g.beginPath();g.moveTo(x-30*s,y-64*s+k*9*s);g.quadraticCurveTo(x,y-70*s+k*9*s,x+30*s,y-64*s+k*9*s);g.stroke();}
    for(const sd of [-1,1]){g.beginPath();g.moveTo(x+sd*68*s,y+12*s);g.quadraticCurveTo(x+sd*74*s,y+30*s,x+sd*62*s,y+46*s);g.stroke();}g.strokeStyle=OL;}
  // gloom: dark shade over the upper face (serious / dread)
  if(P.gloom){g.save();const gg=g.createLinearGradient(0,y-110*s,0,y+10*s);gg.addColorStop(0,'rgba(40,30,70,0.55)');gg.addColorStop(1,'rgba(40,30,70,0)');g.fillStyle=gg;g.beginPath();g.ellipse(x,y-40*s,120*s,80*s,0,0,TAU);g.fill();
    g.strokeStyle='rgba(40,30,70,0.6)';g.lineWidth=3*s;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(x+k*16*s,y-100*s);g.lineTo(x+k*16*s,y-62*s+Math.abs(k)*6*s);g.stroke();}g.restore();}
  const bl=P.blushK??0;if(bl){g.fillStyle=`rgba(245,120,150,${0.38*bl})`;for(const sd of [-1,1]){g.beginPath();g.ellipse(x+sd*72*s,y+28*s,22*s,11*s,0,0,TAU);g.fill();}
    if(bl>1.2){g.strokeStyle='rgba(220,80,110,0.7)';g.lineWidth=3*s;for(const sd of [-1,1])for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(x+sd*(64+k*12)*s,y+22*s);g.lineTo(x+sd*(60+k*12)*s,y+34*s);g.stroke();}}g.fillStyle=OL;g.strokeStyle=OL;}
  const pupil=(cx,cy,r,dx=0,dy=0)=>{g.fillStyle=OL;g.beginPath();g.arc(cx+dx,cy+dy,r,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(cx+dx-r*0.35,cy+dy-r*0.4,r*0.32,0,TAU);g.fill();g.fillStyle=OL;};
  for(const sd of [-1,1]){const cx=x+sd*ex,cy=y+ey;g.lineWidth=7*s;g.strokeStyle=OL;
    if(eyes==='dot'){g.beginPath();g.ellipse(cx+lk*4*s,cy,9.5*s,14*s,0,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(cx+lk*4*s-3*s,cy-5*s,3*s,0,TAU);g.fill();g.fillStyle=OL;}
    else if(eyes==='half'||eyes==='sly'){g.save();g.beginPath();g.rect(cx-30*s,cy-2*s,60*s,40*s);g.clip();g.beginPath();g.ellipse(cx+(eyes==='sly'?-sd*0+8:sd*2)*s,cy+4*s,10*s,12*s,0,0,TAU);g.fill();g.restore();g.lineWidth=8*s;g.beginPath();g.moveTo(cx-20*s,cy-3*s+(eyes==='sly'?sd*3*s:0));g.lineTo(cx+20*s,cy-3*s-(eyes==='sly'?sd*3*s:0));g.stroke();}
    else if(eyes==='wide'||eyes==='shock'){const sh=eyes==='shock'?Math.sin(T5*60+sd)*1.6*s:0;g.fillStyle='#fff';g.beginPath();g.ellipse(cx+sh,cy,25*s,28*s,0,0,TAU);g.fill();g.stroke();if(eyes==='shock'){g.beginPath();g.arc(cx+sh,cy,4.5*s,0,TAU);g.fillStyle=OL;g.fill();}else pupil(cx,cy+2*s,9*s,lk*7*s);}
    else if(eyes==='glare'||eyes==='focus'||eyes==='rage'){ // sharp anime eyes: angled upper lid, white + pupil
      const h=eyes==='rage'?22:eyes==='focus'?13:16;g.save();g.beginPath();g.moveTo(cx-sd*24*s,cy-(eyes==='rage'?4:2)*s);g.lineTo(cx+sd*22*s,cy-h*s);g.quadraticCurveTo(cx+sd*26*s,cy+14*s,cx,cy+15*s);g.quadraticCurveTo(cx-sd*22*s,cy+12*s,cx-sd*24*s,cy-(eyes==='rage'?4:2)*s);g.closePath();
      g.fillStyle='#fff';g.fill();g.clip();if(eyes==='rage'){g.fillStyle=OL;g.beginPath();g.arc(cx-sd*2*s,cy+3*s,4.5*s,0,TAU);g.fill();}else pupil(cx-sd*3*s+lk*5*s,cy+4*s,9.5*s);g.restore();
      g.lineWidth=8.5*s;g.beginPath();g.moveTo(cx-sd*26*s,cy-(eyes==='rage'?4:2)*s);g.lineTo(cx+sd*24*s,cy-h*s);g.stroke();g.lineWidth=3*s;g.beginPath();g.moveTo(cx-sd*18*s,cy+15*s);g.quadraticCurveTo(cx,cy+18*s,cx+sd*18*s,cy+13*s);g.stroke();}
    else if(eyes==='sad'){g.fillStyle='#fff';g.beginPath();g.ellipse(cx,cy+2*s,20*s,22*s,0,0,TAU);g.fill();g.stroke();pupil(cx,cy+6*s,9*s);g.fillStyle='rgba(120,150,210,0.35)';g.beginPath();g.ellipse(cx,cy+14*s,16*s,7*s,0,0,TAU);g.fill();g.fillStyle=OL;
      g.lineWidth=7*s;g.beginPath();g.moveTo(cx-sd*22*s,cy-14*s);g.lineTo(cx+sd*20*s,cy-4*s);g.stroke();}
    else if(eyes==='happy'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy+8*s,15*s,Math.PI*1.12,Math.PI*1.88);g.stroke();}
    else if(eyes==='drunk'){g.lineWidth=4.5*s;g.beginPath();for(let a=0;a<4.4*Math.PI;a+=0.2){const r=(3+a/(4.4*Math.PI)*15)*s;const xx=cx+Math.cos(a+T5*3*sd)*r,yy=cy+2*s+Math.sin(a+T5*3*sd)*r;a?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}
    else if(eyes==='closed'||eyes==='sleep'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy-6*s,14*s,Math.PI*0.15,Math.PI*0.85);g.stroke();if(eyes==='closed'){g.lineWidth=3*s;g.beginPath();g.moveTo(cx+sd*12*s,cy+1*s);g.lineTo(cx+sd*18*s,cy+5*s);g.stroke();}}
    else if(eyes==='squeeze'){g.lineWidth=8*s;g.beginPath();g.moveTo(cx-sd*14*s,cy-12*s);g.lineTo(cx+sd*10*s,cy);g.lineTo(cx-sd*14*s,cy+12*s);g.stroke();}
    // brows
    g.lineWidth=(brow==='angry'||brow==='furious'?13:11)*s*(K.browW||1);g.fillStyle=OL;g.strokeStyle=K.browCol||OL;const by=cy-(36+(K.browY||0))*s;g.save();g.translate(cx,by);g.scale(K.browL||1,1);g.translate(-cx,-by);g.beginPath();
    if(brow==='flat'){g.moveTo(cx-17*s,by);g.lineTo(cx+17*s,by);}
    else if(brow==='angry'){g.moveTo(cx+sd*22*s,by-10*s);g.lineTo(cx-sd*18*s,by+10*s);}
    else if(brow==='furious'){g.moveTo(cx+sd*24*s,by-16*s);g.quadraticCurveTo(cx+sd*2*s,by-4*s,cx-sd*20*s,by+16*s);}
    else if(brow==='up'){g.moveTo(cx-19*s,by-6*s);g.quadraticCurveTo(cx,by-22*s,cx+19*s,by-6*s);}
    else if(brow==='worried'||brow==='sad'){g.moveTo(cx-sd*18*s,by-12*s);g.quadraticCurveTo(cx+sd*2*s,by-2*s,cx+sd*20*s,by+6*s);}
    else if(brow==='smug'){g.moveTo(cx-19*s,by+(sd>0?-2:6)*s);g.quadraticCurveTo(cx,by+(sd>0?-12:2)*s,cx+19*s,by+(sd>0?-6:6)*s);}
    if(brow!=='none')g.stroke();g.restore();g.strokeStyle=OL;}
  if(brow==='furious'||P.furrow){g.lineWidth=3.4*s;for(const k of [-5,5]){g.beginPath();g.moveTo(x+k*s,y-44*s);g.lineTo(x+k*1.3*s,y-30*s);g.stroke();}}
  // mouth
  const my=y+50*s;g.lineWidth=7*s;g.strokeStyle=OL;const red='#6a1a26',tongue='#e8606e';
  const fillMouth=(path,h,teethTop=true,teethBot=false)=>{g.fillStyle=red;path();g.fill();g.save();path();g.clip();g.fillStyle='#fff';if(teethTop)g.fillRect(x-60*s,my-40*s,120*s,40*s+(h<0?h:0)*s);if(teethBot)g.fillRect(x-60*s,my+(h-9)*s,120*s,30*s);g.fillStyle=tongue;if(!teethBot){g.beginPath();g.ellipse(x,my+h*s,24*s,12*s,0,0,TAU);g.fill();}g.restore();path();g.stroke();};
  if(mouth==='flat'){g.beginPath();g.moveTo(x-15*s,my);g.lineTo(x+15*s,my);g.stroke();}
  else if(mouth==='smile'){g.beginPath();g.arc(x,my-14*s,22*s,0.25*Math.PI,0.75*Math.PI);g.stroke();}
  else if(mouth==='smirk'||mouth==='sneer'){g.beginPath();g.moveTo(x-18*s,my+3*s);g.quadraticCurveTo(x+4*s,my+8*s,x+22*s,my-8*s);g.stroke();if(mouth==='sneer'){g.lineWidth=3*s;g.beginPath();g.moveTo(x+22*s,my-8*s);g.lineTo(x+26*s,my-16*s);g.stroke();}}
  else if(mouth==='frown'){g.beginPath();g.arc(x,my+16*s,18*s,1.2*Math.PI,1.8*Math.PI);g.stroke();}
  else if(mouth==='sad'||mouth==='wobble'){g.beginPath();g.moveTo(x-20*s,my+6*s);for(let k=0;k<=8;k++){const xx=x-20*s+k*5*s,yy=my+(mouth==='wobble'?Math.sin(k*1.6+T5*20)*3:0)*s-Math.sin(k/8*Math.PI)*8*s;g.lineTo(xx,yy);}g.stroke();}
  else if(mouth==='o'){g.fillStyle=red;g.beginPath();g.ellipse(x,my,11*s,14*s,0,0,TAU);g.fill();g.stroke();}
  else if(mouth==='drool'){g.fillStyle=red;g.beginPath();g.ellipse(x,my,10*s,8*s,0,0,TAU);g.fill();g.stroke();g.fillStyle='#bfe6ff';g.strokeStyle='rgba(20,20,30,0.6)';g.lineWidth=2.4*s;const dl=8+((T5*1.5)%1)*14;g.beginPath();g.moveTo(x+6*s,my+4*s);g.quadraticCurveTo(x+10*s,my+dl*s,x+6*s,my+(dl+6)*s);g.quadraticCurveTo(x+2*s,my+dl*s,x+4*s,my+4*s);g.fill();g.stroke();}
  else if(mouth==='grin'||mouth==='drunk'){const w=30,h=24,tilt=mouth==='drunk'?8:0;fillMouth(()=>{g.beginPath();g.moveTo(x-w*s,my-8*s+tilt*s);g.quadraticCurveTo(x,my-12*s,x+w*s,my-8*s-tilt*s);g.quadraticCurveTo(x+w*0.8*s,my+h*s,x,my+h*s);g.quadraticCurveTo(x-w*0.8*s,my+h*s,x-w*s,my-8*s+tilt*s);g.closePath();},h);}
  else if(mouth==='shout'||mouth==='yell'){const w=mouth==='yell'?40:34,h=mouth==='yell'?48:38;fillMouth(()=>{g.beginPath();g.moveTo(x-w*s,my-10*s);g.lineTo(x+w*s,my-10*s);g.quadraticCurveTo(x+w*0.7*s,my+h*s,x,my+h*s);g.quadraticCurveTo(x-w*0.7*s,my+h*s,x-w*s,my-10*s);g.closePath();},h);}
  else if(mouth==='teeth'||mouth==='grit'){const w=mouth==='grit'?32:28;g.fillStyle='#fff';g.beginPath();g.moveTo(x-w*s,my-10*s);g.quadraticCurveTo(x,my-16*s,x+w*s,my-10*s);g.quadraticCurveTo(x+w*1.05*s,my+2*s,x+w*s,my+12*s);g.quadraticCurveTo(x,my+(mouth==='grit'?8:16)*s,x-w*s,my+12*s);g.quadraticCurveTo(x-w*1.05*s,my+2*s,x-w*s,my-10*s);g.closePath();g.fill();g.stroke();
    g.lineWidth=3*s;g.beginPath();g.moveTo(x-w*0.95*s,my+1*s);g.quadraticCurveTo(x,my-2*s,x+w*0.95*s,my+1*s);g.stroke();for(const k of [-0.45,0,0.45]){g.beginPath();g.moveTo(x+k*w*s,my-12*s);g.lineTo(x+k*w*s,my+11*s);g.stroke();}}
  // extras
  if(P.vein){const vx=x+(P.f||1)*60*s,vy=y-70*s,pk=1+Math.sin(T5*14)*0.12;g.save();g.translate(vx,vy);g.scale(pk,pk);g.strokeStyle='#d0202a';g.lineWidth=5*s;for(let k=0;k<4;k++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(5*s,14*s);g.quadraticCurveTo(5*s,5*s,14*s,5*s);g.stroke();}g.restore();}
  if(P.tear||P.cry){g.fillStyle='#9fdcff';g.strokeStyle='rgba(30,60,110,0.7)';g.lineWidth=2.6*s;for(const sd of (P.cry?[-1,1]:[1])){const tx=x+sd*ex+sd*6*s,ty=y+ey+16*s;if(P.cry){const st=g.createLinearGradient(0,ty,0,ty+90*s);st.addColorStop(0,'rgba(160,220,255,0.9)');st.addColorStop(1,'rgba(160,220,255,0)');g.fillStyle=st;g.fillRect(tx-6*s,ty,12*s,90*s);g.fillStyle='#9fdcff';}
      const dy=P.cry?0:((T5*0.8)%1)*40*s;g.beginPath();g.moveTo(tx,ty+dy);g.quadraticCurveTo(tx+9*s,ty+dy+16*s,tx,ty+dy+20*s);g.quadraticCurveTo(tx-9*s,ty+dy+16*s,tx,ty+dy);g.fill();g.stroke();}}
  if(P.sweat){g.fillStyle='#9fdcff';g.strokeStyle=OL;g.lineWidth=4*s;const sx=x+88*s,sy=y-66*s+((T5*0.9)%1)*20*s;g.beginPath();g.moveTo(sx,sy-22*s);g.quadraticCurveTo(sx+16*s,sy+4*s,sx,sy+8*s);g.quadraticCurveTo(sx-16*s,sy+4*s,sx,sy-22*s);g.fill();g.stroke();
    if(P.sweat>1){const sx2=x-86*s,sy2=y-40*s+((T5*1.1+0.4)%1)*20*s;g.beginPath();g.moveTo(sx2,sy2-16*s);g.quadraticCurveTo(sx2+12*s,sy2+3*s,sx2,sy2+6*s);g.quadraticCurveTo(sx2-12*s,sy2+3*s,sx2,sy2-16*s);g.fill();g.stroke();}}
  if(P.shockL){g.lineWidth=5*s;for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*0.38;g.beginPath();g.moveTo(x+Math.cos(a)*140*s,y-30*s+Math.sin(a)*120*s);g.lineTo(x+Math.cos(a)*172*s,y-30*s+Math.sin(a)*150*s);g.stroke();}}
  g.restore();}
