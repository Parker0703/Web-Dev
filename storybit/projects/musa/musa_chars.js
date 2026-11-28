'use strict';
// ===================== Mansa Musa 1324 · cast (StoryBit C) =====================
const GOLDR='#e2b13c';
Object.assign(KIND2,{
  musa:Object.assign(mkK({coat:GOLDR,trim:'#7a1a1e',skin:'#6a4530',pants:'#7a1a1e',sash:'#7a1a1e'}),{hair4:'crew',hair:'#1a1410',hat2:'crown',hatCol:'#f0c040',browW:1.4,browCol:'#1a1210',beardD:'#1a1410'}),
  att1:Object.assign(mkK({coat:'#f2ede2',trim:'#c89a3a',skin:'#5a3a26',pants:'#e8e2d4'}),{hair4:'crew',hair:'#141010',hat2:'kufi',hatCol:'#f4efe4',browW:1.3,browCol:'#141010'}),
  att2:Object.assign(mkK({coat:'#2e4a7a',trim:'#e0b040',skin:'#4a3020',pants:'#2a3a5a'}),{hair4:'crew',hair:'#141010',hat2:'kufi',hatCol:'#e0b040',browW:1.3,browCol:'#141010'}),
  att3:Object.assign(mkK({coat:'#f0e6d0',trim:'#3a6a8a',skin:'#704a32',pants:'#e0d8c4'}),{hair4:'crew',hair:'#141010',hat2:'turban',hatCol:'#f4efe4',browW:1.2,browCol:'#141010'}),
  emir:Object.assign(mkK({coat:'#2a4a7a',trim:'#e0b040',skin:'#d0a47a',pants:'#1e3256'}),{hair4:'crew',hair:'#2a1e14',hat2:'turban',hatCol:'#f6f2e8',hatJewel:'#c8201a',browW:1.5,beardD:'#2a1e14'}),
  merch:Object.assign(mkK({coat:'#8a4a24',trim:'#e8d4a0',skin:'#c4946a',pants:'#5a3a22'}),{hair4:'crew',hair:'#2a1e14',hat2:'turban',hatCol:'#e8d8b0',browW:1.4,beardD:'#2a1e14'}),
  merch2:Object.assign(mkK({coat:'#3a6a4a',trim:'#e8d8b0',skin:'#b88a5e',pants:'#2a4a34'}),{hair4:'crew',hair:'#1a1410',hat2:'turban',hatCol:'#c8402a',browW:1.4,beardD:'#1a1410'}),
  imam:Object.assign(mkK({coat:'#f2eee4',trim:'#4a6a3a',skin:'#c89a70',pants:'#e8e4d8'}),{hair4:'crew',hair:'#4a4440',hat2:'turban',hatCol:'#ffffff',browW:1.3,beardD:'#b8b4ac'}),
  umari:Object.assign(mkK({coat:'#3a4a5a',trim:'#d8c49a',skin:'#c8a07a',pants:'#2a3440'}),{hair4:'crew',hair:'#3a3430',hat2:'turban',hatCol:'#f0ece0',browW:1.3,beardD:'#6a625a'}),
  cai1:Object.assign(mkK({coat:'#a8643a',trim:'#e8d8b8',skin:'#c4946a',pants:'#6a4428'}),{hair4:'crew',hair:'#1a1410',hat2:'turban',hatCol:'#ece2cc',browW:1.2}),
  cai2:Object.assign(mkK({coat:'#5a6a8a',trim:'#e0d4b0',skin:'#b88660',pants:'#3a4660'}),{hair4:'crew',hair:'#1a1410',hat2:'kufi',hatCol:'#ece2cc',browW:1.2}),
  cai3:Object.assign(mkK({coat:'#7a2a2a',trim:'#e8c870',skin:'#d0a47a',pants:'#4a1a1a'}),{hair4:'crew',hair:'#2a1e14',hat2:'turban',hatCol:'#f0e8d8',browW:1.3,beardD:'#2a1e14'}),
  caiW:Object.assign(mkK({coat:'#2a2a3a',trim:'#c8a050',skin:'#c8986c',pants:'#2a2a3a'}),{hair4:'crew',hair:'#1a1410',hat2:'veil',hatCol:'#2a2a3a',fem:1,browW:0.9}),
  king:Object.assign(mkK({coat:'#5a5a62',trim:'#a8a8b0',skin:SK[1],pants:'#3a3a42'}),{hair4:'crew',hair:'#2a1e14',hat2:'helmK',hatCol:'#8a8a92',browW:1.5,beardD:'#2a1e14'}),
});
// turban (wrapped, with folds + optional jewel), kufi cap, gold crown, veil; short beard drawn along the jaw
{const _hd=hatDraw;hatDraw=function(c,K,R,f,v,s,lift=0){const T=K.hat2;if(!['turban','kufi','crown','veil','helmK'].includes(T))return _hd(c,K,R,f,v,s,lift);
  const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.translate(0,-lift*R);const off=v==='3q'?f*R*0.16:(v==='side'?f*R*0.22:0);const col=K.hatCol;c.strokeStyle=OL;c.lineWidth=lw;
  if(K.beardD&&!CUR.back){c.save();c.fillStyle=K.beardD;c.beginPath();c.moveTo(-R*0.6+off*0.4,R*0.5);c.quadraticCurveTo(-R*0.55+off*0.6,R*1.05,off*0.9,R*1.08);c.quadraticCurveTo(R*0.55+off*0.6,R*1.05,R*0.6+off*0.4,R*0.5);
    c.quadraticCurveTo(R*0.4+off,R*0.78,off,R*0.8);c.quadraticCurveTo(-R*0.4+off,R*0.78,-R*0.6+off*0.4,R*0.5);c.closePath();c.fill();c.lineWidth=lw*0.6;c.stroke();c.restore();c.strokeStyle=OL;c.lineWidth=lw;}
  if(T==='turban'){const g=c.createRadialGradient(off-R*0.4,-R*1.2,R*0.1,off,-R*0.8,R*1.5);g.addColorStop(0,shd(col,0.1));g.addColorStop(1,shd(col,-0.22));c.fillStyle=g;
    c.beginPath();c.moveTo(-R*1.14,-R*0.32);c.bezierCurveTo(-R*1.5,-R*1.95,R*1.5,-R*1.95,R*1.14,-R*0.32);c.quadraticCurveTo(off,-R*0.55,-R*1.14,-R*0.32);c.closePath();c.fill();c.stroke();
    c.strokeStyle=shd(col,-0.32);c.lineWidth=lw*0.6;for(let i=0;i<5;i++){const y=-R*(0.5+i*0.24);c.beginPath();c.moveTo(-R*(1.2-i*0.1),y+R*0.05);c.quadraticCurveTo(off+(i%2?R*0.45:-R*0.45),y-R*0.26,R*(1.2-i*0.1),y-R*0.08);c.stroke();}
    if(K.hatJewel){c.fillStyle=K.hatJewel;c.strokeStyle=OL;c.lineWidth=lw*0.6;c.beginPath();c.ellipse(off,-R*0.66,R*0.13,R*0.16,0,0,TAU);c.fill();c.stroke();c.fillStyle='#e0b040';c.beginPath();c.moveTo(off,-R*1.18);c.lineTo(off-R*0.06,-R*0.82);c.lineTo(off+R*0.06,-R*0.82);c.closePath();c.fill();}}
  else if(T==='kufi'){c.fillStyle=col;c.beginPath();c.moveTo(-R*0.98,-R*0.5);c.bezierCurveTo(-R*0.98,-R*1.28,R*0.98,-R*1.28,R*0.98,-R*0.5);c.quadraticCurveTo(off,-R*0.62,-R*0.98,-R*0.5);c.closePath();c.fill();c.stroke();
    c.strokeStyle=shd(col,-0.3);c.lineWidth=lw*0.5;for(let i=0;i<3;i++){c.beginPath();c.moveTo(-R*0.9,-R*(0.62+i*0.12));c.quadraticCurveTo(off,-R*(0.76+i*0.12),R*0.9,-R*(0.62+i*0.12));c.stroke();}}
  else if(T==='crown'){// gold crown over a dark wrap (Catalan Atlas look)
    const g=c.createLinearGradient(0,-R*1.6,0,-R*0.5);g.addColorStop(0,'#fff2a8');g.addColorStop(0.45,'#f0c040');g.addColorStop(1,'#a8721a');c.fillStyle=g;
    c.beginPath();c.moveTo(-R*0.96+off*0.3,-R*0.62);for(let i=0;i<=6;i++){const x=-R*0.96+i*R*0.32+off*0.5;c.lineTo(x,-R*(i%2?1.2:1.58));}c.lineTo(R*0.96+off*0.3,-R*0.62);c.quadraticCurveTo(off,-R*0.76,-R*0.96+off*0.3,-R*0.62);c.closePath();c.fill();c.stroke();
    for(let i=0;i<=6;i+=2){const x=-R*0.96+i*R*0.32+off*0.5;c.fillStyle='#fff6c0';c.beginPath();c.arc(x,-R*1.62,R*0.07,0,TAU);c.fill();c.stroke();}
    for(const [dx,cl] of [[-0.45,'#2a6ac8'],[0,'#c8201a'],[0.45,'#2a9a5a']]){c.fillStyle=cl;c.beginPath();c.ellipse(off+dx*R,-R*0.86,R*0.09,R*0.11,0,0,TAU);c.fill();c.lineWidth=lw*0.5;c.stroke();}
    c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=lw*0.6;c.beginPath();c.moveTo(-R*0.7+off,-R*0.72);c.lineTo(-R*0.7+off,-R*1.1);c.stroke();}
  else if(T==='veil'){c.fillStyle=col;c.beginPath();c.moveTo(-R*1.18,R*0.5);c.bezierCurveTo(-R*1.4,-R*1.5,R*1.4,-R*1.5,R*1.18,R*0.5);c.quadraticCurveTo(R*1.0,-R*0.6,off,-R*0.72);c.quadraticCurveTo(-R*1.0,-R*0.6,-R*1.18,R*0.5);c.closePath();c.fill();c.stroke();}
  else if(T==='helmK'){const g=c.createRadialGradient(off-R*0.35,-R*1.1,R*0.1,off,-R*0.6,R*1.35);g.addColorStop(0,'#d8d8e0');g.addColorStop(1,'#5a5a62');c.fillStyle=g;c.beginPath();c.moveTo(-R*1.05,-R*0.42);c.bezierCurveTo(-R*1.05,-R*1.3,-R*0.2,-R*1.75,off,-R*1.8);c.bezierCurveTo(R*0.2,-R*1.75,R*1.05,-R*1.3,R*1.05,-R*0.42);c.quadraticCurveTo(off,-R*0.6,-R*1.05,-R*0.42);c.closePath();c.fill();c.stroke();}
  c.restore();};}
// ---------- gold props ----------
function coin(c,x,y,r,rot=0,flip=1){c.save();c.translate(x,y);c.rotate(rot);c.scale(1,Math.max(0.12,Math.abs(flip)));const g=c.createRadialGradient(-r*0.3,-r*0.4,r*0.1,0,0,r*1.1);g.addColorStop(0,'#fff6b8');g.addColorStop(0.45,'#f2c844');g.addColorStop(1,'#a8701a');c.fillStyle=g;c.strokeStyle='#5a3a08';c.lineWidth=Math.max(1,r*0.12);
  c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(120,80,10,0.6)';c.lineWidth=Math.max(1,r*0.08);c.beginPath();c.arc(0,0,r*0.72,0,TAU);c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.ellipse(-r*0.35,-r*0.4,r*0.3,r*0.14,-0.6,0,TAU);c.fill();c.restore();}
function goldPile(c,x,y,w,h,seed=0){c.save();const g=c.createRadialGradient(x-w*0.2,y-h*0.8,4,x,y-h*0.3,w*0.7);g.addColorStop(0,'#fff0a0');g.addColorStop(0.5,'#e8b430');g.addColorStop(1,'#8a5a10');c.fillStyle=g;c.strokeStyle='#4a3008';c.lineWidth=4;
  c.beginPath();c.moveTo(x-w/2,y);c.quadraticCurveTo(x-w*0.25,y-h*1.1,x,y-h);c.quadraticCurveTo(x+w*0.25,y-h*1.1,x+w/2,y);c.closePath();c.fill();c.stroke();
  for(let i=0;i<Math.round(w/9);i++){const u=hash(i*1.7+seed),px=x-w/2+u*w,top=y-h*(1-Math.pow(2*u-1,2))*0.95;coin(c,px,top+hash(i*3+seed)*h*0.6,6+hash(i*5+seed)*7,hash(i*7)*3,0.35+hash(i*9)*0.4);}
  c.fillStyle='rgba(255,255,220,0.5)';for(let i=0;i<8;i++){c.beginPath();c.arc(x-w*0.3+hash(i+seed)*w*0.6,y-h*(0.3+hash(i*2+seed)*0.6),2+hash(i*3)*3,0,TAU);c.fill();}c.restore();}
// falling coins (screen space), dense at top, with motion blur streaks
function coinRain(c,t,n,o={}){const x0=o.x0??-40,x1=o.x1??1120,sp=o.sp??900,r0=o.r||14;for(let i=0;i<n;i++){const k=hash(i*1.31),x=x0+(x1-x0)*hash(i*2.17)+Math.sin(t*2+i)*20,y=((hash(i*3.7)*2400+t*sp*(0.7+k*0.6))%2400)-200;
    const r=r0*(0.6+k*0.8);c.save();c.globalAlpha=0.25;c.strokeStyle='#f8d060';c.lineWidth=r*0.6;c.beginPath();c.moveTo(x,y-r*3);c.lineTo(x,y);c.stroke();c.restore();coin(c,x,y,r,t*3+i,Math.cos(t*6+i*1.7));}}
function goldBag(c,x,y,s,open=true){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';const g=c.createRadialGradient(-20,-50,5,0,-30,90);g.addColorStop(0,'#a8784a');g.addColorStop(1,'#5a3a1e');c.fillStyle=g;c.strokeStyle='#1a120a';c.lineWidth=5;
  c.beginPath();c.moveTo(-28,-84);c.quadraticCurveTo(-70,-40,-56,0);c.quadraticCurveTo(0,18,56,0);c.quadraticCurveTo(70,-40,28,-84);c.closePath();c.fill();c.stroke();c.fillStyle='#c89a3a';c.fillRect(-30,-90,60,12);c.strokeRect(-30,-90,60,12);
  if(open){goldPile(c,0,-88,70,30,3);}c.restore();}
