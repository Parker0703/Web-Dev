'use strict';
const OL='#151318';
function drawFace4(g,x,y,s,P,K){g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=OL;g.fillStyle=OL;const ex=44*s,ey=-6*s;
  const eyes=P.eyes||'dot',brow=P.brow||'flat',mouth=P.mouth||'flat';
  if(K.old){g.strokeStyle='rgba(120,90,70,0.55)';g.lineWidth=4*s;for(const k of [-1,0,1]){g.beginPath();g.moveTo(x-34*s,y-62*s+k*10*s);g.quadraticCurveTo(x,y-68*s+k*10*s,x+34*s,y-62*s+k*10*s);g.stroke();}
    for(const sd of [-1,1]){g.beginPath();g.moveTo(x+sd*70*s,y+10*s);g.quadraticCurveTo(x+sd*76*s,y+30*s,x+sd*64*s,y+48*s);g.stroke();}g.strokeStyle=OL;}
  if(P.blush!==0){g.fillStyle='rgba(240,120,140,0.42)';for(const sd of [-1,1]){g.beginPath();g.ellipse(x+sd*74*s,y+30*s,20*s,10*s,0,0,TAU);g.fill();}g.fillStyle=OL;}
  for(const sd of [-1,1]){const cx=x+sd*ex,cy=y+ey;g.lineWidth=7*s;
    if(eyes==='dot'){g.beginPath();g.ellipse(cx,cy,9*s,13*s,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,0.8)';g.beginPath();g.arc(cx-3*s,cy-5*s,2.6*s,0,TAU);g.fill();g.fillStyle=OL;}
    else if(eyes==='half'){g.save();g.beginPath();g.rect(cx-30*s,cy-2*s,60*s,40*s);g.clip();g.beginPath();g.ellipse(cx+sd*2*s,cy+4*s,10*s,12*s,0,0,TAU);g.fill();g.restore();g.lineWidth=8*s;g.beginPath();g.moveTo(cx-20*s,cy-3*s);g.lineTo(cx+20*s,cy-3*s);g.stroke();}
    else if(eyes==='wide'){g.fillStyle='#fff';g.beginPath();g.ellipse(cx,cy,25*s,27*s,0,0,TAU);g.fill();g.stroke();g.fillStyle=OL;g.beginPath();g.arc(cx+(P.look||0)*6*s,cy+2*s,8.5*s,0,TAU);g.fill();}
    else if(eyes==='happy'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy+8*s,15*s,Math.PI*1.12,Math.PI*1.88);g.stroke();}
    else if(eyes==='closed'){g.lineWidth=8*s;g.beginPath();g.arc(cx,cy-6*s,14*s,Math.PI*0.15,Math.PI*0.85);g.stroke();}
    else if(eyes==='squeeze'){g.lineWidth=8*s;g.beginPath();g.moveTo(cx-sd*14*s,cy-12*s);g.lineTo(cx+sd*10*s,cy);g.lineTo(cx-sd*14*s,cy+12*s);g.stroke();}
    // brows (thick, expressive)
    g.lineWidth=(brow==='angry'?13:10)*s;const by=cy-34*s;g.beginPath();
    if(brow==='flat'){g.moveTo(cx-16*s,by);g.lineTo(cx+16*s,by);}
    else if(brow==='angry'){g.moveTo(cx+sd*20*s,by-10*s);g.lineTo(cx-sd*16*s,by+8*s);}
    else if(brow==='up'){g.moveTo(cx-18*s,by-6*s);g.quadraticCurveTo(cx,by-20*s,cx+18*s,by-6*s);}
    else if(brow==='worried'){g.moveTo(cx-sd*16*s,by-10*s);g.lineTo(cx+sd*18*s,by+4*s);}
    else if(brow==='smug'){g.moveTo(cx-18*s,by+4*s);g.lineTo(cx+18*s,by+(sd>0?-4:4)*s);}
    if(brow!=='none')g.stroke();}
  const my=y+52*s;g.lineWidth=7*s;
  if(mouth==='flat'){g.beginPath();g.moveTo(x-16*s,my);g.lineTo(x+16*s,my);g.stroke();}
  else if(mouth==='smile'){g.beginPath();g.arc(x,my-14*s,22*s,0.25*Math.PI,0.75*Math.PI);g.stroke();}
  else if(mouth==='smirk'){g.beginPath();g.moveTo(x-16*s,my+2*s);g.quadraticCurveTo(x+6*s,my+8*s,x+20*s,my-6*s);g.stroke();}
  else if(mouth==='frown'){g.beginPath();g.arc(x,my+16*s,18*s,1.2*Math.PI,1.8*Math.PI);g.stroke();}
  else if(mouth==='o'){g.fillStyle='#5a1822';g.beginPath();g.ellipse(x,my,11*s,14*s,0,0,TAU);g.fill();g.stroke();}
  else if(mouth==='grin'||mouth==='shout'){const w=mouth==='shout'?34:30,h=mouth==='shout'?38:24;g.fillStyle='#5a1822';g.beginPath();g.moveTo(x-w*s,my-8*s);g.quadraticCurveTo(x,my-14*s,x+w*s,my-8*s);g.quadraticCurveTo(x+w*0.8*s,my+h*s,x,my+h*s);g.quadraticCurveTo(x-w*0.8*s,my+h*s,x-w*s,my-8*s);g.fill();
    g.save();g.clip();g.fillStyle='#fff';g.fillRect(x-w*s,my-16*s,2*w*s,13*s);g.fillStyle='#e85a6a';g.beginPath();g.ellipse(x,my+h*s,w*0.6*s,12*s,0,0,TAU);g.fill();g.restore();g.stroke();}
  else if(mouth==='teeth'){g.fillStyle='#fff';g.beginPath();g.roundRect(x-30*s,my-14*s,60*s,26*s,8*s);g.fill();g.stroke();g.lineWidth=4*s;for(const k of [-15,0,15]){g.beginPath();g.moveTo(x+k*s,my-14*s);g.lineTo(x+k*s,my+12*s);g.stroke();}g.beginPath();g.moveTo(x-30*s,my-1*s);g.lineTo(x+30*s,my-1*s);g.stroke();}
  if(P.sweat){g.fillStyle='#8fd0ff';g.lineWidth=4*s;const sx=x+88*s,sy=y-70*s;g.beginPath();g.moveTo(sx,sy-22*s);g.quadraticCurveTo(sx+16*s,sy+4*s,sx,sy+8*s);g.quadraticCurveTo(sx-16*s,sy+4*s,sx,sy-22*s);g.fill();g.stroke();}
  g.restore();}
// ---------- robe pattern ----------
