'use strict';
// ===================== Great Molasses Flood · cast + molasses fx (StoryBit C) =====================
Object.assign(KIND2,{
  dock:Object.assign(mkK({coat:'#5a6a7a',trim:'#e8e0cc',skin:SK[1],pants:'#3a3a40'}),{robe:false,long:false,hair4:'crew',hair:'#3a2418',hat2:'flatcap',hatCol:'#4a4a50',mst:'walrus',mstCol:'#4a3020',browW:1.3}),
  dock2:Object.assign(mkK({coat:'#8a5a3a',trim:'#f0e6d0',skin:SK[3],pants:'#3a3630'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'flatcap',hatCol:'#6a5a44',browW:1.2}),
  boy:Object.assign(mkK({coat:'#2a4a7a',trim:'#f4ecd8',skin:SK[2],pants:'#4a3a2a'}),{robe:false,long:false,hair4:'swoop',hair:'#5a3a22',hat2:'flatcap',hatCol:'#7a6a50'}),
  girl:Object.assign(mkK({coat:'#a83a3a',trim:'#f8eee0',skin:SK[0],pants:'#5a3a3a'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#8a5a2a',fem:1}),
  sailor:Object.assign(mkK({coat:'#1c2a4a',trim:'#f4f6f8',skin:SK[1],pants:'#1c2a4a'}),{robe:false,long:false,hair4:'crew',hair:'#2a1c14',hat2:'beanie',hatCol:'#f4f4f4',browW:1.2}),
  boss:Object.assign(mkK({coat:'#2a2a30',trim:'#f4f0e8',skin:SK[1],pants:'#2a2a30'}),{robe:false,long:true,hair4:'part',hair:'#4a3a2a',hat2:'bowler',hatCol:'#1a1a1e',mst:'brush',mstCol:'#4a3020',browW:1.2}),
});
const ML='#3a1c0c',ML2='#5a2e12',MLH='#c8803a';
// molasses surface lying on the street, from world x=xa..xb, z=za..zb, at height d (with glossy highlights + slow ripples)
function molassesSheet(c,t,xa,xb,za,zb,d,o={}){const P=[[xa,d,za],[xb,d,za],[xb,d,zb],[xa,d,zb]].map(p=>pp(p));c.save();c.beginPath();P.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();
  const yT=Math.min(...P.map(p=>p.y)),yB=Math.max(...P.map(p=>p.y));const g=c.createLinearGradient(0,yT,0,yB);g.addColorStop(0,'#2a1208');g.addColorStop(0.5,ML);g.addColorStop(1,ML2);c.fillStyle=g;c.fill();c.clip();
  c.globalCompositeOperation='lighter';for(let i=0;i<34;i++){const u=hash(i*3.1),v=hash(i*5.3);const q=pp([lerp(xa,xb,u)+Math.sin(t*0.6+i)*0.2,d,lerp(za,zb,v)]);c.fillStyle=`rgba(255,170,90,${0.08+0.08*Math.sin(t*1.3+i)})`;c.beginPath();c.ellipse(q.x,q.y,(30+hash(i)*90)*q.s,(4+hash(i*2)*7)*q.s,0,0,TAU);c.fill();}
  const rg=c.createLinearGradient(0,yT,0,yB);rg.addColorStop(0,'rgba(200,220,255,0.28)');rg.addColorStop(0.25,'rgba(200,220,255,0.06)');rg.addColorStop(1,'rgba(200,220,255,0)');c.fillStyle=rg;c.fillRect(-2000,yT,6000,yB-yT);
  for(let i=0;i<14;i++){const u=hash(i*7.1),v=hash(i*9.3);const q=pp([lerp(xa,xb,u),d,lerp(za,zb,v)]);const ph=(t*0.35+hash(i*2))%1;c.strokeStyle=`rgba(255,180,110,${0.18*(1-ph)})`;c.lineWidth=2.5;c.beginPath();c.ellipse(q.x,q.y,(20+ph*120)*q.s,(4+ph*22)*q.s,0,0,TAU);c.stroke();}
  for(let i=0;i<24;i++){const u=hash(i*11.1),v=hash(i*13.3);const q=pp([lerp(xa,xb,u),d,lerp(za,zb,v)]);c.fillStyle='rgba(20,8,2,0.5)';c.beginPath();c.ellipse(q.x,q.y,(40+hash(i)*60)*q.s,(8+hash(i*3)*8)*q.s,0,0,TAU);c.fill();}
  c.restore();
  if(o.edge!==false){c.save();c.strokeStyle='rgba(255,190,120,0.35)';c.lineWidth=3;c.beginPath();c.moveTo(P[0].x,P[0].y);c.lineTo(P[1].x,P[1].y);c.stroke();c.restore();}}
// the wave: a wall of molasses across the street at world x=fx (travelling +x), height h (m), crest curling forward, splashes, debris
function molassesWave(c,t,fx,h,o={}){const za=o.za??-7,zb=o.zb??7,N=40;const top=[],bot=[];
  for(let i=0;i<=N;i++){const z=lerp(za,zb,i/N);const hh=h*(0.86+0.14*Math.sin(z*0.9+t*3)+0.06*Math.sin(z*2.7-t*5));top.push(pp([fx+0.2*Math.sin(z+t*2),hh,z]));bot.push(pp([fx+0.9,0,z]));}
  // body
  c.save();c.beginPath();top.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));for(let i=N;i>=0;i--)c.lineTo(bot[i].x,bot[i].y);c.closePath();
  const yT=Math.min(...top.map(p=>p.y)),yB=Math.max(...bot.map(p=>p.y));const g=c.createLinearGradient(0,yT,0,yB);g.addColorStop(0,'#7a3c14');g.addColorStop(0.15,'#4a220c');g.addColorStop(0.7,'#2a1206');g.addColorStop(1,'#1a0a04');c.fillStyle=g;c.fill();
  c.save();c.clip();c.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const z=lerp(za,zb,hash(i*1.7)),yy=hash(i*2.9);const a=pp([fx+0.5,h*(0.15+yy*0.75),z]);const len=(60+hash(i*3)*160)*a.s;
      c.strokeStyle=`rgba(255,160,80,${0.10+0.12*hash(i*5)})`;c.lineWidth=(6+hash(i)*14)*a.s;c.lineCap='round';c.beginPath();c.moveTo(a.x,a.y);c.quadraticCurveTo(a.x+20*a.s,a.y+len*0.5,a.x+(hash(i*7)-0.5)*40*a.s,a.y+len+((t*120)%40)*a.s);c.stroke();}
    c.fillStyle='rgba(255,210,150,0.10)';c.fillRect(-2000,yT,6000,(yB-yT)*0.08);c.restore();
  c.strokeStyle='#120602';c.lineWidth=7;c.lineJoin='round';c.beginPath();top.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();c.restore();
  // curling crest lip + spray blobs
  c.save();for(let i=0;i<N;i+=1){const p=top[i],q=top[i+1]||top[i];const curl=(18+10*Math.sin(i+t*4))*p.s;c.fillStyle=i%2?'#6a3412':'#5a2a0e';c.beginPath();c.ellipse(p.x,p.y+curl*0.3,Math.abs(q.x-p.x)*0.8+curl,curl*0.8,0,0,TAU);c.fill();}
  c.strokeStyle='rgba(255,180,110,0.5)';c.lineWidth=4;c.beginPath();top.forEach((p,i)=>i?c.lineTo(p.x,p.y-6*p.s):c.moveTo(p.x,p.y-6*p.s));c.stroke();
  for(let i=0;i<46;i++){const z=lerp(za,zb,hash(i*4.1)),ph=(t*1.6+hash(i*2.3))%1;const b=pp([fx+1.2+ph*2.4,h*(0.95+ph*0.5)-ph*ph*h*1.2,z]);if(b.w<=0)continue;const r=(10+hash(i)*28)*b.s*(1-ph*0.4);
    c.fillStyle=ph<0.5?'#4a220c':'#3a1a0a';c.strokeStyle='#120602';c.lineWidth=3;c.beginPath();c.ellipse(b.x,b.y,r,r*1.15,0,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,190,120,0.55)';c.beginPath();c.ellipse(b.x-r*0.3,b.y-r*0.35,r*0.25,r*0.18,-0.5,0,TAU);c.fill();}
  c.restore();
  if(o.debris)for(let i=0;i<8;i++){const z=lerp(za,zb,hash(i*6.1)),ph=(t*0.9+hash(i))%1;const b=pp([fx+0.8,h*(0.5+0.5*Math.sin(ph*Math.PI)),z]);c.save();c.translate(b.x,b.y);c.rotate(t*3+i);c.fillStyle=['#8a6a44','#5a5a60','#6a4a2a'][i%3];c.strokeStyle='#120602';c.lineWidth=3;c.fillRect(-40*b.s,-8*b.s,80*b.s,16*b.s);c.strokeRect(-40*b.s,-8*b.s,80*b.s,16*b.s);c.restore();}}
// a person sunk to depth d (m): only the part above the molasses line shows; a glossy ring + drips where the body meets the surface. surf = surface height (m)
function stuck(c,kind,pos,d,o={}){const surf=o.surf??d;const g=pp([pos[0],surf,pos[2]]);const sh=Math.max(0,d);
  c.save();c.beginPath();c.rect(-3000,-3000,8000,g.y+3000+2*g.s);c.clip();const r=who(c,kind,[pos[0],surf-d,pos[2]],o);c.restore();
  const wR=(44+(o.wide||0))*g.s;c.save();c.fillStyle=ML;c.strokeStyle='#120602';c.lineWidth=3;c.beginPath();c.ellipse(g.x,g.y+2*g.s,wR*1.25,wR*0.32,0,0,TAU);c.fill();
  c.beginPath();c.ellipse(g.x,g.y+2*g.s,wR*1.25,wR*0.32,0,Math.PI*1.08,Math.PI*1.92);c.stroke();c.fillStyle='rgba(255,170,90,0.35)';c.beginPath();c.ellipse(g.x-wR*0.4,g.y-2*g.s,wR*0.5,wR*0.08,0,0,TAU);c.fill();
  for(let i=0;i<3;i++){const ph=(T*0.5+i/3+pos[0])%1;c.strokeStyle=`rgba(90,46,18,${0.6*(1-ph)})`;c.lineWidth=3;c.beginPath();c.ellipse(g.x,g.y+2*g.s,wR*(1.3+ph*0.8),wR*(0.33+ph*0.2),0,0,TAU);c.stroke();}c.restore();
  if(r&&o.drip!==false)for(const h of [r.hf,r.hb]){if(!h||h.y>g.y)continue;c.fillStyle=ML2;c.beginPath();c.ellipse(h.x,h.y+6*g.s,10*g.s,14*g.s,0,0,TAU);c.fill();const dl=((T*0.7+h.x*0.013)%1);c.globalAlpha=1-dl;c.beginPath();c.ellipse(h.x,h.y+22*g.s+dl*50*g.s,3.5*g.s,6*g.s,0,0,TAU);c.fill();c.globalAlpha=1;}
  // coat streaked with molasses
  return r;}
