'use strict';
const WK=(t,sp=7,o=0)=>({walk:1,ph:t*sp+o});
// ===================== The Milgram experiment · Style 5 =====================
function lbl(c,t0,t,text,y=1560,o={}){const p=t-t0;if(p<0||(o.end&&t>o.end))return;const k=back(clamp(p/0.22));c.save();c.translate(o.x||540,y);c.scale(k,k);c.rotate(o.rot??-0.03);txt(c,text,0,0,o.size||110,o.col||'#fff',{ls:6,sw:(o.size||110)*0.2});c.restore();}
function motes(c,t,n=22,col='230,235,220'){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const d=hash(i*2.3),x=(hash(i)*1080+Math.sin(t*0.3+i)*40),y=((hash(i*5)*2000-t*(8+d*14))%2000+2000)%2000;c.fillStyle=`rgba(${col},${0.08+0.18*(0.5+0.5*Math.sin(t*2+i))})`;c.beginPath();c.arc(x,y,1.5+d*2.5,0,TAU);c.fill();}c.restore();}
function grade(c,o={}){if(o.tint)tint(c,o.tint,o.mode||'soft-light');if(o.dark)tint(c,`rgba(10,8,14,${o.dark})`,'multiply');vign(c,o.v??0.45);}
// fluorescent flicker / overhead light
function flicker(t,k=1){const f=Math.sin(t*61)*Math.sin(t*17.3);return f>0.92?0.18*k:0;}
// ---------- seated figure: legs drawn as a bent seated pose ----------
const _HIP={};
function sitAt(c,kind,pos,o={}){const p=pp(pos);const s=p.s*(o.sc||1);const f=o.f||1;const cr=o.cr??56;
  const r=who(c,kind,pos,Object.assign({},o,{kn:1,crouch:cr,stance:6}));if(!r)return r;const K=KIND2[kind];
  // thighs forward + shins down to the floor (drawn in front, so it reads as sitting)
  const side=o.view==='side'||o.view==='3q';const fx=side?f:0.45*f;
  for(const [k,off] of [[0,-9],[1,9]]){const hx=r.hip.x+off*s*(side?0.3:1),hy=r.hip.y-4*s;const kx=hx+fx*44*s,ky=hy+(side?2:14)*s;const fy=p.y+(o.dy||0);const ax=kx+fx*4*s;
    c.save();c.lineCap='round';c.lineJoin='round';for(const [w,col] of [[25*s,K2],[19*s,K.pants||'#333']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(hx,hy);c.lineTo(kx,ky);c.lineTo(ax,fy-14*s);c.stroke();}
    c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=4*s;c.beginPath();c.moveTo(hx,hy-6*s);c.lineTo(kx,ky-6*s);c.stroke();c.restore();boot2(c,{x:ax,y:fy},s,f,K);}
  return r;}
function strap(c,p,s){if(!p)return;c.save();c.translate(p.x,p.y);c.fillStyle='#4a2e1a';c.strokeStyle=OL;c.lineWidth=3*s;rr(c,-20*s,-9*s,40*s,18*s,4*s);c.fill();c.stroke();c.fillStyle='#d8c070';rr(c,-5*s,-7*s,10*s,14*s,2*s);c.fill();c.stroke();c.restore();}
// ---------- shock generator (2D close graphic) ----------
function genIcon(c,x,y,sc,o={}){c.save();c.translate(x,y);c.scale(sc,sc);c.lineJoin='round';const lit=o.lit??-1;
  c.fillStyle='#4a4c52';c.strokeStyle=OL;c.lineWidth=7;rr(c,-470,-150,940,300,20);c.fill();c.stroke();const g2=c.createLinearGradient(0,-150,0,150);g2.addColorStop(0,'rgba(255,255,255,0.12)');g2.addColorStop(1,'rgba(0,0,0,0.25)');c.fillStyle=g2;rr(c,-470,-150,940,300,20);c.fill();
  c.fillStyle='#d8d4c8';rr(c,-440,-130,880,46,6);c.fill();c.fillStyle='#1a1a1e';c.font='900 30px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.fillText('SHOCK GENERATOR  ·  TYPE ZLB',0,-106);
  const labs=['SLIGHT','MODERATE','STRONG','VERY STRONG','INTENSE','EXTREME','DANGER','XXX'];
  for(let i=0;i<30;i++){const xx=-435+i*30;const on=i<=lit;c.fillStyle='#e8e4d8';c.font='800 10px "Inter Display"';c.fillText(String(15+i*15),xx,-66);
    c.fillStyle=i>=28?'#7a1a1a':'#1e2026';rr(c,xx-11,-54,22,52,4);c.fill();c.fillStyle='#c8c8cc';rr(c,xx-5,on?-28:-48,10,20,3);c.fill();
    c.fillStyle=on?(i>=20?'#ff4a2a':'#ffd060'):'#3a3a30';c.beginPath();c.arc(xx,16,7,0,TAU);c.fill();if(on){glow(c,xx,16,26,i>=20?'255,80,40':'255,210,90',0.6);}}
  for(let k=0;k<8;k++){const x0=-446+k*4*30,ww=k===7?2*30-2:4*30-6;c.fillStyle=k>=6?'#a82a20':'#d8d4c8';rr(c,x0,40,ww,30,4);c.fill();c.fillStyle=k>=6?'#fff':'#1a1a1e';c.font='900 12px "Inter Display"';c.fillText(labs[k],x0+ww/2,56);}
  c.fillStyle='#202226';c.beginPath();c.arc(-380,110,24,0,TAU);c.fill();c.strokeStyle='#d8d4c8';c.lineWidth=3;c.stroke();if(lit>=0){glow(c,-380,110,40,'255,90,60',0.7);}
  c.fillStyle='#d8d4c8';rr(c,250,92,180,40,6);c.fill();c.fillStyle='#1a1a1e';c.font='900 16px "Inter Display"';c.fillText('VOLTAGE ENERGIZER',340,113);c.restore();}
function bolt(c,x1,y1,x2,y2,t,a=1,col='150,210,255'){if(a<=0)return;c.save();c.globalCompositeOperation='lighter';c.lineCap='round';c.lineJoin='round';const n=12;
  for(const [w,al] of [[22,0.18],[9,0.5],[3.5,1]]){c.strokeStyle=`rgba(${col},${al*a})`;c.lineWidth=w;c.beginPath();for(let i=0;i<=n;i++){const u=i/n,j=(i>0&&i<n)?(hash(i*7+Math.floor(t*24))-0.5)*70:0;const x=lerp(x1,x2,u)+j*(y2-y1)/Math.hypot(x2-x1,y2-y1+1e-3),y=lerp(y1,y2,u)-j*(x2-x1)/Math.hypot(x2-x1,y2-y1+1e-3);i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}c.restore();}
function voltChip(c,v,x,y,o={}){c.save();c.translate(x,y);const k=o.k??1;c.scale(k,k);const danger=v>=330;c.fillStyle=danger?'rgba(150,20,20,0.92)':'rgba(20,20,26,0.88)';c.strokeStyle=danger?'#ff6a4a':'#ffd060';c.lineWidth=5;rr(c,-170,-60,340,120,26);c.fill();c.stroke();
  txt(c,v+' V',0,4,74,danger?'#fff':'#ffd060',{stroke:false});c.restore();}
function speech(c,x,y,text,o={}){const k=o.k??1;if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(o.rot||0);c.font=`900 ${o.size||54}px "Inter Display"`;const w=c.measureText(text).width+70,h=(o.size||54)*1.7;
  c.fillStyle=o.fill||'#fff';c.strokeStyle=OL;c.lineWidth=7;c.beginPath();if(o.jag){for(let i=0;i<24;i++){const a=i/24*TAU,r=(i%2?0.8:1.05);c.lineTo(Math.cos(a)*w*0.62*r,Math.sin(a)*h*0.8*r);}c.closePath();}else{rr(c,-w/2,-h/2,w,h,h/2);}c.fill();c.stroke();
  if(!o.jag){c.beginPath();const tx=o.tail||-1;c.moveTo(tx*w*0.18,h/2-4);c.lineTo(tx*w*0.3,h/2+34);c.lineTo(tx*w*0.05,h/2-4);c.closePath();c.fill();c.stroke();c.fillRect(tx*w*0.2-14,h/2-12,40,10);}
  txt(c,text,0,3,o.size||54,o.col||'#1a1a1e',{stroke:false});c.restore();}
function personIcon(c,x,y,r,col){c.save();c.fillStyle=col;c.beginPath();c.arc(x,y-r*0.95,r*0.45,0,TAU);c.fill();c.beginPath();c.moveTo(x-r*0.7,y+r*0.9);c.quadraticCurveTo(x-r*0.75,y-r*0.35,x,y-r*0.38);c.quadraticCurveTo(x+r*0.75,y-r*0.35,x+r*0.7,y+r*0.9);c.closePath();c.fill();c.restore();}
function slip(c,x,y,text,k,rot=0){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(rot);c.fillStyle='#fbf8ee';c.strokeStyle=OL;c.lineWidth=5;rr(c,-130,-44,260,88,6);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.12)';c.lineWidth=2;c.beginPath();c.moveTo(-110,28);c.lineTo(110,28);c.stroke();txt(c,text,0,2,44,'#1a1a2a',{stroke:false,ls:5});c.restore();}
function hat(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#3a3a42';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,70,18,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-46,0);c.lineTo(-40,-60);c.quadraticCurveTo(0,-74,40,-60);c.lineTo(46,0);c.closePath();c.fill();c.stroke();c.fillStyle='#6a2a2a';c.fillRect(-44,-16,88,12);c.restore();}
// foreground matte: re-draw parts of the plate (table top, generator) over figures standing behind them
function hull(P){P=P.slice().sort((a,b)=>a.x-b.x||a.y-b.y);const cr=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);const lo=[],up=[];for(const p of P){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}for(const p of P.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p);}return lo.slice(0,-1).concat(up.slice(0,-1));}
function occ(c,boxes){const id=Object.keys(PM).find(k=>PM[k]===CP);c.save();c.beginPath();for(const [x0,x1,y0,y1,z0,z1] of boxes){const P=[];for(const x of [x0,x1])for(const y of [y0,y1])for(const z of [z0,z1])P.push(pp([x,y,z]));const h=hull(P);h.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();}c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
const TABLE=[[-0.92,0.92,0.74,0.79,-0.45,0.45],[-0.64,0.64,0.79,1.13,-0.33,0.13],[0.69,0.87,0.79,0.99,-0.04,0.14]];
// ================= SHOTS =================
