// ===== "What if you could see when everyone would die" — cast, timer HUD, environments =====
Object.assign(KIND2,{
  hero:{coat:'#2f4f63',limb:'#ecebe6',hat:'none',hair:'#2a1c14',hairStyle:'quiff',pants:'#2a2f3a'},
  mom:{coat:'#9a5a6a',limb:'#ecebe6',hat:'none',hair:'#6a5246',hairStyle:'bun',pants:'#4a3a44',skirt:'#5e4252'},
  friend:{coat:'#d08a2a',limb:'#ecebe6',hat:'none',hair:'#6a3a1a',hairStyle:'quiff',pants:'#3a3a4a'},
  stranger:{coat:'#4a4a58',limb:'#ecebe6',hat:'none',hair:'#141418',hairStyle:'slick',pants:'#2a2a34'},
  woman4:{coat:'#7a3a3a',limb:'#ecebe6',hat:'none',hair:'#3a2018',hairStyle:'ponytail',pants:'#3a2a2a'},
  kid:{coat:'#e0a030',limb:'#ecebe6',hat:'none',hair:'#4a2a18',hairStyle:'fringe',pants:'#3a5a8a'},
  man2:{coat:'#5a6a4a',limb:'#ecebe6',hat:'none',hair:'#8a8a8a',hairStyle:'sidepart',pants:'#3a3a32'},
  boy:{coat:'#3a8ac8',limb:'#ecebe6',hat:'none',hair:'#1a1410',hairStyle:'curly',pants:'#3a3a4a'},
  x1:{coat:'#6a7a8a',limb:'#ecebe6',hat:'none',hair:'#3a2a1a',hairStyle:'sidepart',pants:'#2a2a32'},
  x2:{coat:'#a86a4a',limb:'#ecebe6',hat:'none',hair:'#1a1a1a',hairStyle:'ponytail',pants:'#3a3040'},
  x3:{coat:'#4a6a5a',limb:'#ecebe6',hat:'none',hair:'#b08a50',hairStyle:'wavy',pants:'#3a3a3a'},
  x4:{coat:'#3a3a5a',limb:'#ecebe6',hat:'none',hair:'#2a2420',hairStyle:'buzz',pants:'#2a2a2a'},
});
const HERO=o=>fig2(o.c,{kind:'hero',...o}),HEAD=(y,s)=>y-318*s;
// ---------- the floating countdown ----------
const YR=365.25*86400,MO=YR/12,DY=86400;
function fmtT(sec){sec=Math.max(0,sec);if(sec>=YR){const y=Math.floor(sec/YR),m=Math.floor((sec-y*YR)/MO),d=Math.floor((sec-y*YR-m*MO)/DY),r=sec%DY;return [`${y}Y ${String(m).padStart(2,'0')}M`,`${String(d).padStart(2,'0')}D ${hms(r)}`];}
  if(sec>=DY){const d=Math.floor(sec/DY);return [`${d}D ${hms(sec%DY).slice(0,5)}`,''];}
  if(sec>=3600)return [hms(sec),''];if(sec>=60)return [hms(sec),''];return ['00:'+String(Math.floor(sec)).padStart(2,'0')+'.'+String(Math.floor((sec%1)*100)).padStart(2,'0'),''];}
function hms(r){const h=Math.floor(r/3600),m=Math.floor(r%3600/60),s=Math.floor(r%60);return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':');}
const tCol=sec=>sec>=YR?(sec>=20*YR?'#7ee8a8':'#9fd8ff'):sec>=3600?'#ffc24a':'#ff3b30';
function monoText(c,s,x,y,size,col){c.font=`800 ${size}px "Inter Display"`;c.textAlign='center';c.textBaseline='middle';const cw=size*0.62,n=s.length;let w=0;const ws=[...s].map(ch=>/[0-9]/.test(ch)?cw:(ch===' '?cw*0.45:c.measureText(ch).width+size*0.04));w=ws.reduce((a,b)=>a+b,0);let xx=x-w/2;
  [...s].forEach((ch,i)=>{c.lineJoin='round';c.strokeStyle='rgba(0,0,0,0.9)';c.lineWidth=size*0.14;c.strokeText(ch,xx+ws[i]/2,y);c.fillStyle=col;c.fillText(ch,xx+ws[i]/2,y);xx+=ws[i];});return w;}
function deathTimer(c,x,y,sec,o={}){const sc=o.s||1,age=o.age??9,t=o.t||0;if(age<0)return;const [l1,l2]=fmtT(sec),col=o.col||tCol(sec);const urgent=sec<60&&sec>0;
  const pop=back(clamp(age/0.35));const gl=age<0.4?(hash(Math.floor(age*40))-0.5)*30:0;
  c.save();c.translate(x+gl*sc,y+Math.sin(t*2.2+x)*4*sc);c.scale(sc*pop,sc*pop);if(o.alpha!=null)c.globalAlpha*=o.alpha;
  const big=l2?54:64;c.font=`800 ${big}px "Inter Display"`;const w=Math.max(l1.length*big*0.6,l2?l2.length*28*0.62:0)+80,h=l2?118:96;
  // glow + glass pill
  c.save();c.shadowColor=col;c.shadowBlur=urgent?40+Math.sin(t*14)*16:26;c.fillStyle='rgba(8,10,16,0.78)';rr(c,-w/2,-h/2,w,h,h/2.4);c.fill();c.restore();
  const g=c.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(255,255,255,0.16)');g.addColorStop(0.5,'rgba(255,255,255,0)');c.fillStyle=g;rr(c,-w/2,-h/2,w,h,h/2.4);c.fill();
  c.strokeStyle=col;c.lineWidth=4;rr(c,-w/2,-h/2,w,h,h/2.4);c.stroke();c.globalAlpha*=0.35;c.lineWidth=12;rr(c,-w/2-5,-h/2-5,w+10,h+10,h/2.2);c.stroke();c.globalAlpha/=0.35;
  // scanlines
  c.save();rr(c,-w/2,-h/2,w,h,h/2.4);c.clip();c.fillStyle='rgba(255,255,255,0.04)';for(let i=-h/2;i<h/2;i+=6)c.fillRect(-w/2,i,w,2);c.restore();
  monoText(c,l1,0,l2?-16:2,big,'#ffffff');c.save();c.globalAlpha*=0.5;c.globalCompositeOperation='lighter';monoText(c,l1,0,l2?-16:2,big,col);c.restore();
  if(l2)monoText(c,l2,0,32,28,col);
  // tether to the head
  c.strokeStyle=col;c.globalAlpha*=0.5;c.lineWidth=3;c.setLineDash([6,8]);c.beginPath();c.moveTo(0,h/2+6);c.lineTo(0,h/2+40);c.stroke();c.setLineDash([]);
  c.restore();
  if(sec<=0&&o.zeroAge!=null&&o.zeroAge<0.6){ring(c,x,y,60*sc+o.zeroAge*700*sc,(1-o.zeroAge/0.6)*0.8,'rgba(255,40,30,',14);}}
// value rolls between two numbers on a log scale (slot-machine feel)
function rollSec(a,b,p){p=clamp(p);const e=eio(p);return Math.exp(lerp(Math.log(Math.max(a,0.01)),Math.log(Math.max(b,0.01)),e));}
// glowing word tags floating near people (not captions)
function chip(c,t0,t,lab,x,y,col='#ff3b30',o={}){if(window.COVER)return;const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.25)return;const a=t>end?1-(t-end)/0.25:1;const k=back(clamp(p/0.3));c.save();c.globalAlpha=a;c.translate(x,y);c.rotate(o.rot||0);c.scale(k,k);
  c.font=`900 ${o.size||46}px "Inter Display"`;c.letterSpacing='4px';const w=c.measureText(lab).width+70,h=(o.size||46)*1.7;c.fillStyle='rgba(8,10,14,0.88)';rr(c,-w/2,-h/2,w,h,16);c.fill();c.fillStyle=col;c.fillRect(-w/2,-h/2,12,h);c.letterSpacing='0px';txt(c,lab,6,2,o.size||46,o.tc||'#fff',{ls:4});c.restore();}
function strike(c,t0,t,x0,y0,x1,y1,col='#ff3b30'){const p=clamp((t-t0)/0.25);if(p<=0)return;c.save();c.strokeStyle=col;c.lineCap='round';c.lineWidth=14;c.beginPath();c.moveTo(x0,y0);c.lineTo(lerp(x0,x1,eo(p)),lerp(y0,y1,eo(p)));c.stroke();c.restore();}
function letterbox(c,a=1){c.fillStyle='#000';c.fillRect(0,0,W,110*a);c.fillRect(0,H-110*a,W,110*a);}
function lightRays(c,x,y,col,a,n=7,len=1600,spread=0.5){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const an=Math.PI/2+(i/(n-1)-0.5)*spread;const g=c.createLinearGradient(x,y,x+Math.cos(an)*len,y+Math.sin(an)*len);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(an-0.04)*len,y+Math.sin(an-0.04)*len);c.lineTo(x+Math.cos(an+0.04)*len,y+Math.sin(an+0.04)*len);c.fill();}c.restore();}
function dustMotes(c,t,n=24,col='255,240,210',a=0.5){for(let i=0;i<n;i++){const x=(hash(i)*W+t*12*(hash(i*2)-0.5)*4+W*4)%W,y=(hash(i*3)*H-t*(8+hash(i*5)*10)+H*8)%H;c.fillStyle=`rgba(${col},${a*(0.3+0.7*hash(i*7))})`;c.beginPath();c.arc(x,y,2+hash(i*9)*3,0,TAU);c.fill();}}
// ---------- props ----------
function pPhone(on=1,col='#1a1c22'){return (c,h,s,f,t)=>{c.save();c.translate(h.x+f*4*s,h.y-6*s);c.rotate(f*-0.15);c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=2.4*s;rr(c,-12*s,-24*s,24*s,46*s,5*s);c.fill();c.stroke();if(on){const g=c.createLinearGradient(0,-20*s,0,18*s);g.addColorStop(0,'#bfe0ff');g.addColorStop(1,'#5a8ac8');c.fillStyle=g;rr(c,-9.5*s,-20*s,19*s,38*s,3*s);c.fill();}c.restore();};}
function phoneBig(c,x,y,w,h,o={}){ // phone held in both hands, screen toward camera
  c.save();c.translate(x,y);c.rotate(o.rot||0);c.fillStyle='#16181e';c.strokeStyle=K2;c.lineWidth=7;rr(c,-w/2,-h/2,w,h,w*0.14);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.12)';rr(c,-w/2+6,-h/2+6,w-12,h*0.02+4,6);c.fill();
  const sw=w-36,sh=h-60;c.save();rr(c,-sw/2,-sh/2,sw,sh,w*0.09);c.clip();if(o.screen)o.screen(c,-sw/2,-sh/2,sw,sh);c.restore();c.fillStyle='#0a0a0c';rr(c,-w*0.12,-h/2+14,w*0.24,18,9);c.fill();c.restore();
  // fingers wrapped on both sides
  for(const sx of [-1,1])for(let i=0;i<(o.fingers??3);i++){c.fillStyle='#ecebe6';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.ellipse(x+sx*(w/2+4),y-h*0.05+i*h*0.15,22,30,0,0,TAU);c.fill();c.stroke();}
  c.fillStyle='#ecebe6';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.ellipse(x-w/2+40,y+h/2+6,44,30,-0.3,0,TAU);c.fill();c.stroke();c.beginPath();c.ellipse(x+w/2-40,y+h/2+6,44,30,0.3,0,TAU);c.fill();c.stroke();}
function hand(c,x,y,sc=1,rot=0,o={}){ // big close-up hand (mitten style with thumb), for inserts
  c.save();c.translate(x,y);c.rotate(rot);c.scale(sc,sc);c.fillStyle=o.col||'#ecebe6';c.strokeStyle=K2;c.lineWidth=6/sc*sc;
  c.beginPath();c.moveTo(-60,120);c.lineTo(-58,10);c.bezierCurveTo(-60,-60,60,-60,62,0);c.lineTo(62,120);c.closePath();c.fill();c.stroke();
  c.beginPath();c.ellipse(o.thumb?-70:70,10,22,40,o.thumb?0.5:-0.5,0,TAU);c.fill();c.stroke();
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=4;for(const k of [-22,4,30]){c.beginPath();c.moveTo(k,-34);c.lineTo(k,-8);c.stroke();}
  c.fillStyle=o.sleeve||'#2f4f63';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-72,110,144,200);c.strokeRect(-72,110,144,200);c.fillStyle='rgba(255,255,255,0.15)';c.fillRect(-72,110,144,14);c.restore();}
// ---------- CITY STREET (side-on, depth: far sidewalk / road / near sidewalk) ----------
const RD0=GY,RD1=GY+430,NS=GY+430; // road from GY to GY+430, near sidewalk below
function sky2(c,mood){const M={day:['#5a8ac0','#a8c8e0','#e8e4d8'],dusk:['#2a2a4a','#c86a4a','#f0b070'],grey:['#5a6270','#9aa2aa','#c8c8c4'],night:['#0a0c18','#1a2034','#2a2c3a'],morning:['#7aa8d8','#d8e4ec','#f4e8d0']}[mood||'day'];const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,M[0]);g.addColorStop(0.55,M[1]);g.addColorStop(1,M[2]);c.fillStyle=g;c.fillRect(0,0,W,H);}
const SHOPS=['CAFE','BAKERY','BOOKS','PHARMACY','FLOWERS','DINER','HARDWARE','LAUNDRY','NOODLES','MARKET'];
function building(c,x,w,h,i,night){const bc=['#b86a4a','#c8b49a','#8a8e96','#a87a5a','#d0c4b0','#6a7a8a'][i%6];const y0=GY-60-h;c.strokeStyle=K2;c.lineWidth=6;
  const g=c.createLinearGradient(x,0,x+w,0);g.addColorStop(0,shd2(bc,-0.12));g.addColorStop(0.5,bc);g.addColorStop(1,shd2(bc,-0.2));c.fillStyle=g;c.fillRect(x,y0,w,h);
  if(i%6===0||i%6===3){c.fillStyle='rgba(0,0,0,0.08)';for(let yy=y0+10;yy<GY-60;yy+=22)for(let xx=x+((yy/22)%2?0:20);xx<x+w;xx+=40)c.fillRect(xx,yy,38,2);} // brick courses
  c.fillStyle=shd2(bc,-0.3);c.fillRect(x-10,y0-26,w+20,30);c.strokeRect(x-10,y0-26,w+20,30);c.fillStyle='rgba(255,255,255,0.2)';c.fillRect(x-10,y0-26,w+20,6); // cornice
  const cols=Math.max(2,Math.floor(w/120)),rows=Math.floor((h-300)/150);for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){const wx=x+(w/cols)*(k+0.5)-34,wy=y0+40+r*150;const lit=night&&hash(i*31+r*7+k)>0.45;
    c.fillStyle=lit?'#ffd88a':'#2a3442';c.fillRect(wx,wy,68,96);if(!lit){const gg=c.createLinearGradient(wx,wy,wx+68,wy+96);gg.addColorStop(0,'rgba(180,210,240,0.5)');gg.addColorStop(0.5,'rgba(180,210,240,0.05)');gg.addColorStop(1,'rgba(180,210,240,0.25)');c.fillStyle=gg;c.fillRect(wx,wy,68,96);}
    c.fillStyle=lit?'rgba(120,70,30,0.5)':'rgba(0,0,0,0.3)';c.fillRect(wx+31,wy,6,96);c.fillRect(wx,wy+44,68,5);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(wx,wy,68,96);c.fillStyle=shd2(bc,0.15);c.fillRect(wx-8,wy+96,84,10);c.strokeRect(wx-8,wy+96,84,10);
    if(hash(i*13+r*3+k)>0.8){c.fillStyle='#c8ccd0';c.fillRect(wx+8,wy+70,52,26);c.strokeRect(wx+8,wy+70,52,26);}} // AC units
  // shopfront
  const sy=GY-60-230;c.fillStyle='#2a2e36';c.fillRect(x+10,sy,w-20,230);c.strokeRect(x+10,sy,w-20,230);
  const gg=c.createLinearGradient(0,sy+40,0,GY-60);gg.addColorStop(0,night?'#ffe0a0':'#c8dcea');gg.addColorStop(1,night?'#c88a40':'#6a8aa8');c.fillStyle=gg;c.fillRect(x+30,sy+60,w-150,160);c.strokeRect(x+30,sy+60,w-150,160);
  c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.moveTo(x+50,GY-70);c.lineTo(x+110,GY-70);c.lineTo(x+170,sy+60);c.lineTo(x+110,sy+60);c.fill();
  c.fillStyle='#4a3a2a';c.fillRect(x+w-110,sy+50,80,180);c.strokeRect(x+w-110,sy+50,80,180);c.fillStyle='#d8c070';c.beginPath();c.arc(x+w-46,sy+145,5,0,TAU);c.fill();
  const ac=['#c83a32','#2a6a4a','#2a4a8a','#d89a2a'][i%4];c.fillStyle=ac;c.beginPath();c.moveTo(x+4,sy+4);c.lineTo(x+w-4,sy+4);c.lineTo(x+w+14,sy+64);c.lineTo(x-14,sy+64);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.85)';for(let k=0;k<Math.floor(w/60);k++){c.beginPath();c.moveTo(x+10+k*60,sy+4);c.lineTo(x+40+k*60,sy+4);c.lineTo(x+40+k*60+8,sy+64);c.lineTo(x+10+k*60-6,sy+64);c.fill();}
  c.fillStyle='#14161c';c.fillRect(x+w*0.18,sy-60,w*0.64,52);c.strokeRect(x+w*0.18,sy-60,w*0.64,52);txt(c,SHOPS[(i+20)%SHOPS.length],x+w/2,sy-33,32,night?'#ffd060':'#f0ece0',{stroke:false,ls:6});
  c.strokeStyle=K2;c.lineWidth=6;c.strokeRect(x,y0,w,h);}
function streetLamp(c,x,night){c.fillStyle='#2a2e34';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(x-10,GY-560,20,540);c.strokeRect(x-10,GY-560,20,540);c.fillRect(x-22,GY-40,44,30);c.strokeRect(x-22,GY-40,44,30);c.beginPath();c.moveTo(x,GY-555);c.quadraticCurveTo(x,GY-600,x+70,GY-600);c.lineWidth=12;c.strokeStyle='#2a2e34';c.stroke();
  c.fillStyle='#3a3e44';c.beginPath();c.moveTo(x+45,GY-605);c.lineTo(x+115,GY-605);c.lineTo(x+105,GY-580);c.lineTo(x+55,GY-580);c.fill();c.strokeStyle=K2;c.lineWidth=4;c.stroke();if(night){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x+80,GY-570,0,x+80,GY-570,260);g.addColorStop(0,'rgba(255,220,150,0.6)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(x-200,GY-830,560,560);c.restore();}}
function tree(c,x,s=1){c.fillStyle='#4a3424';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(x-12*s,GY-260*s,24*s,250*s);c.strokeRect(x-12*s,GY-260*s,24*s,250*s);[[0,-360,120],[-80,-300,90],[80,-300,95],[-40,-420,80],[50,-410,85]].forEach(([dx,dy,r],k)=>{c.fillStyle=['#3a6a3a','#4a7a42','#2e5a32'][k%3];c.beginPath();c.arc(x+dx*s,GY+dy*s,r*s,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,255,220,0.18)';c.beginPath();c.arc(x+dx*s-r*0.3*s,GY+dy*s-r*0.3*s,r*0.45*s,0,TAU);c.fill();});c.fillStyle='#6a6660';c.fillRect(x-50*s,GY-20,100*s,20);c.strokeRect(x-50*s,GY-20,100*s,20);}
function trafficLight(c,x,y,state){c.fillStyle='#2a2e34';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(x-9,y-520,18,520);c.strokeRect(x-9,y-520,18,520);c.fillStyle='#1a1c20';rr(c,x-34,y-700,68,190,14);c.fill();c.stroke();
  ['#ff3b30','#ffcc00','#34c759'].forEach((col,k)=>{const on=state===k;c.fillStyle=on?col:'#3a3a3a';c.beginPath();c.arc(x,y-668+k*60,22,0,TAU);c.fill();if(on){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-668+k*60,0,x,y-668+k*60,90);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=0.5;c.fillStyle=g;c.fillRect(x-90,y-758+k*60,180,180);c.restore();}});}
function hydrant(c,x,y){c.fillStyle='#c83a2a';c.strokeStyle=K2;c.lineWidth=4;rr(c,x-18,y-80,36,80,8);c.fill();c.stroke();c.beginPath();c.arc(x,y-80,18,Math.PI,TAU);c.fill();c.stroke();c.fillRect(x-30,y-58,60,16);c.strokeRect(x-30,y-58,60,16);c.fillStyle='rgba(255,255,255,0.3)';c.fillRect(x-12,y-76,6,66);}
function cityStreet(c,t,cam,o={}){const night=o.mood==='night'||o.mood==='dusk';sky2(c,o.mood);
  world(c,par(cam,0.25),()=>{for(let i=-8;i<10;i++){const h=500+hash(i*5)*700,x=i*240;c.fillStyle=night?'#1a2030':'#7a8ca0';c.fillRect(x,GY-60-h,220,h+60);c.fillStyle=night?'rgba(255,210,120,0.6)':'rgba(220,235,250,0.35)';for(let r=0;r<h/50;r++)for(let k=0;k<5;k++)if(hash(i*17+r*5+k)>(night?0.6:0.5))c.fillRect(x+16+k*40,GY-40-h+r*50,22,28);}});
  world(c,par(cam,0.55),()=>{for(let i=-7;i<9;i++){c.fillStyle=night?'#262c3c':'#9aa8b8';const h=420+hash(i*9)*360;c.fillRect(i*300,GY-60-h,280,h);}});
  world(c,cam,()=>{for(let i=-5;i<7;i++){const w=420+hash(i*3)*120;building(c,i*560-40,w,820+hash(i*7)*420,i+7,night);}
    // far sidewalk
    c.fillStyle='#a8a49c';c.fillRect(cam.x-3000,GY-60,6000,60);c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=3;for(let x=-3000;x<3000;x+=140){c.beginPath();c.moveTo(x,GY-60);c.lineTo(x-20,GY);c.stroke();}
    for(let i=-4;i<6;i++){streetLamp(c,i*700+150,night);if(i%2===0)tree(c,i*700+500,0.9);}hydrant(c,-180,GY-8);
    // road
    const rg=c.createLinearGradient(0,GY,0,RD1);rg.addColorStop(0,night?'#24262c':'#4a4e56');rg.addColorStop(1,night?'#1a1c20':'#3a3e44');c.fillStyle=rg;c.fillRect(cam.x-3000,GY,6000,RD1-GY);
    c.fillStyle='#8a8a86';c.fillRect(cam.x-3000,GY,6000,12);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(cam.x-3000,GY+12,6000,10);
    c.fillStyle='rgba(255,255,255,0.05)';for(let i=0;i<60;i++)c.fillRect(hash(i)*5000-2500,GY+30+hash(i*3)*380,40+hash(i*5)*100,3);
    c.fillStyle='#e8d070';for(let x=-3000;x<3000;x+=260)if(x<(o.cw??400)-200||x>(o.cw??400)+200)c.fillRect(x,GY+200,140,10);
    // crosswalk
    const cx=o.cw??400;c.fillStyle='rgba(240,240,236,0.92)';for(let k=0;k<7;k++)c.fillRect(cx-150,GY+40+k*56,300,30);
    // near curb + sidewalk
    c.fillStyle='#9a9690';c.fillRect(cam.x-3000,RD1,6000,26);c.fillStyle='rgba(255,255,255,0.3)';c.fillRect(cam.x-3000,RD1,6000,5);const sg=c.createLinearGradient(0,RD1+26,0,RD1+600);sg.addColorStop(0,'#b8b4ac');sg.addColorStop(1,'#8a8680');c.fillStyle=sg;c.fillRect(cam.x-3000,RD1+26,6000,800);
    c.strokeStyle='rgba(0,0,0,0.15)';c.lineWidth=3;for(let x=-3000;x<3000;x+=220){c.beginPath();c.moveTo(x,RD1+26);c.lineTo(x-80,RD1+600);c.stroke();}
    if(o.light!=null)trafficLight(c,cx+230,GY-60,o.light);
    if(o.world)o.world(c);});
  if(night){c.fillStyle='rgba(20,20,60,0.18)';c.fillRect(0,0,W,H);}}
// ---------- LIVING ROOM (front) ----------
function livingRoom(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#d8c4a4');g.addColorStop(1,'#b89c78');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(120,90,60,0.12)';c.lineWidth=14;for(let x=40;x<W;x+=80){c.beginPath();c.moveTo(x,0);c.lineTo(x,1500);c.stroke();} // wallpaper stripes
  c.fillStyle='#8a6a48';c.fillRect(0,1080,W,24);c.strokeStyle=K2;c.lineWidth=5;c.strokeRect(-5,1080,W+10,24); // dado rail
  // window with curtains + evening city
  const wx=640,wy=260;c.fillStyle='#2a3a5a';c.fillRect(wx,wy,340,480);const sg=c.createLinearGradient(0,wy,0,wy+480);sg.addColorStop(0,'#3a4a7a');sg.addColorStop(1,'#d88a5a');c.fillStyle=sg;c.fillRect(wx,wy,340,480);c.fillStyle='#2a2a3a';for(let i=0;i<6;i++)c.fillRect(wx+i*60,wy+300-hash(i)*140,52,200+hash(i)*140);c.fillStyle='#ffd88a';for(let i=0;i<20;i++)c.fillRect(wx+hash(i)*320,wy+260+hash(i*2)*200,8,10);
  c.fillStyle='#f0e8d8';c.fillRect(wx+166,wy,8,480);c.fillRect(wx,wy+236,340,8);c.strokeRect(wx,wy,340,480);c.fillStyle='#e8e0d0';c.fillRect(wx-20,wy+480,380,22);c.strokeRect(wx-20,wy+480,380,22);
  [[wx-90,1],[wx+340-30,-1]].forEach(([cx,d])=>{c.fillStyle='#8a2e3a';c.beginPath();c.moveTo(cx,wy-40);c.lineTo(cx+120,wy-40);c.quadraticCurveTo(cx+60+d*20,wy+300,cx+110,wy+620);c.lineTo(cx,wy+620);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=4;for(const k of [30,60,90]){c.beginPath();c.moveTo(cx+k,wy-30);c.quadraticCurveTo(cx+k-10,wy+300,cx+k,wy+610);c.stroke();}c.strokeStyle=K2;c.lineWidth=5;});
  c.fillStyle='#3a2a1a';c.fillRect(wx-120,wy-52,580,16);
  // framed photos
  [[110,330,170,210],[320,380,130,160]].forEach(([x,y,w,h],k)=>{c.fillStyle='#5a3a22';c.fillRect(x,y,w,h);c.strokeRect(x,y,w,h);c.fillStyle=['#8ab0c8','#c8a080'][k];c.fillRect(x+16,y+16,w-32,h-32);c.fillStyle='rgba(40,30,30,0.5)';c.beginPath();c.arc(x+w/2-15,y+h*0.45,18,0,TAU);c.arc(x+w/2+20,y+h*0.5,14,0,TAU);c.fill();});
  // floor lamp
  c.fillStyle='#2a2a2a';c.fillRect(70,700,12,800);c.fillStyle='#f0e0b0';c.beginPath();c.moveTo(20,560);c.lineTo(130,560);c.lineTo(150,700);c.lineTo(0,700);c.closePath();c.fill();c.stroke();c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(76,640,0,76,640,420);lg.addColorStop(0,'rgba(255,220,150,0.45)');lg.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=lg;c.fillRect(0,200,600,900);c.restore();
  // floor + rug
  const fg=c.createLinearGradient(0,1500,0,H);fg.addColorStop(0,'#6a4a30');fg.addColorStop(1,'#4a3220');c.fillStyle=fg;c.fillRect(0,1500,W,420);c.strokeStyle='rgba(0,0,0,0.2)';c.lineWidth=3;for(let i=0;i<10;i++){c.beginPath();c.moveTo(i*140-200,H);c.lineTo(i*90+80,1500);c.stroke();}
  c.fillStyle='#7a3a3a';c.beginPath();c.ellipse(540,1760,520,120,0,0,TAU);c.fill();c.strokeStyle='#c8a060';c.lineWidth=8;c.beginPath();c.ellipse(540,1760,470,100,0,0,TAU);c.stroke();}
function couch(c,x,y,w,part,col='#4a6a7a'){ // y = floor line; part 'back' or 'front'
  c.strokeStyle=K2;c.lineWidth=6;if(part==='back'){c.fillStyle=shd2(col,-0.1);rr(c,x-w/2,y-560,w,330,40);c.fill();c.stroke();for(let k=0;k<3;k++){const cw=(w-80)/3;c.fillStyle=col;rr(c,x-w/2+40+k*cw+6,y-520,cw-12,250,30);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.15)';rr(c,x-w/2+40+k*cw+20,y-505,cw-40,30,14);c.fill();}return;}
  c.fillStyle=col;rr(c,x-w/2+30,y-300,w-60,120,24);c.fill();c.stroke();c.fillStyle=shd2(col,-0.25);rr(c,x-w/2+20,y-190,w-40,150,20);c.fill();c.stroke();
  [-1,1].forEach(sd=>{c.fillStyle=shd2(col,-0.05);rr(c,x+sd*(w/2-50)-55,y-400,110,370,36);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.18)';rr(c,x+sd*(w/2-50)-40,y-390,80,24,12);c.fill();});
  c.fillStyle=shd2(col,-0.4);rr(c,x-w/2+20,y-60,w-40,60,10);c.fill();c.stroke();c.fillStyle='#2a1a10';c.fillRect(x-w/2+40,y-6,24,10);c.fillRect(x+w/2-64,y-6,24,10);c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=4;c.beginPath();c.moveTo(x,y-300);c.lineTo(x,y-185);c.stroke();}
// ---------- BEDROOM (front) ----------
function bedroom2(c,t,o={}){const morning=o.mood==='morning';const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,morning?'#c8d0d8':'#20263a');g.addColorStop(1,morning?'#a8a8b0':'#12141e');c.fillStyle=g;c.fillRect(0,0,W,H);
  const wx=600,wy=300;c.fillStyle=morning?'#e8f0f8':'#1a2440';c.fillRect(wx,wy,360,440);if(!morning){c.fillStyle='rgba(255,220,140,0.6)';for(let i=0;i<24;i++)c.fillRect(wx+hash(i)*340,wy+200+hash(i*4)*220,10,12);}
  c.fillStyle=morning?'#f4ece0':'#8a96aa';for(let i=0;i<12;i++){c.fillRect(wx,wy+i*37,360,22);}c.strokeStyle=K2;c.lineWidth=6;c.strokeRect(wx,wy,360,440);
  if(morning){lightRays(c,wx+180,wy+100,'255,240,200',0.18,6,1400,0.6);}
  c.fillStyle='#3a3a44';c.fillRect(0,1460,W,460);c.fillStyle=morning?'#8a7a6a':'#2a2630';c.fillRect(0,1500,W,420);
  // bed (front-on): headboard, mattress, duvet
  c.fillStyle='#5a3a24';rr(c,120,1000,840,380,30);c.fill();c.stroke();c.fillStyle='#6a4a30';rr(c,150,1030,780,320,20);c.fill();c.stroke();
  c.fillStyle='#f0ece4';rr(c,170,1260,340,110,40);c.fill();c.stroke();rr(c,570,1260,340,110,40);c.fill();c.stroke();
  c.fillStyle=o.duvet||'#3a5a8a';c.beginPath();c.moveTo(100,1360);c.lineTo(980,1360);c.lineTo(1010,1760);c.lineTo(70,1760);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.2)';c.lineWidth=5;for(const k of [300,540,780]){c.beginPath();c.moveTo(k,1380);c.quadraticCurveTo(k+20,1560,k-10,1740);c.stroke();}
  // nightstand + alarm clock
  c.fillStyle='#5a3a24';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-20,1300,150,300);c.strokeRect(-20,1300,150,300);c.fillStyle='#1a1a1e';rr(c,10,1220,100,80,14);c.fill();c.stroke();txt(c,o.clock||'7:00',60,1260,30,'#ff4a3a',{stroke:false});
  if(!morning){c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(60,1260,0,60,1260,300);lg.addColorStop(0,'rgba(255,60,40,0.25)');lg.addColorStop(1,'rgba(255,60,40,0)');c.fillStyle=lg;c.fillRect(-300,900,700,700);c.restore();}}
// ---------- BATHROOM MIRROR (over-the-shoulder) ----------
function bathroom(c,t,o={}){c.fillStyle='#d8dcd8';c.fillRect(0,0,W,H);c.strokeStyle='rgba(0,0,0,0.12)';c.lineWidth=3;for(let x=0;x<W;x+=90){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}for(let y=0;y<H;y+=90){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}
  c.fillStyle='#e8ece8';c.fillRect(0,1400,W,520);c.fillStyle='#b8bcb8';c.fillRect(0,1400,W,30);c.strokeStyle=K2;c.lineWidth=6;c.strokeRect(-5,1400,W+10,30);
  // sink + faucet
  c.fillStyle='#f4f4f2';c.beginPath();c.ellipse(540,1460,260,60,0,0,TAU);c.fill();c.stroke();c.fillStyle='#c8ccd0';c.beginPath();c.ellipse(540,1460,200,38,0,0,TAU);c.fill();c.fillStyle='#d0d4d8';c.fillRect(520,1340,40,90);c.strokeRect(520,1340,40,90);c.beginPath();c.moveTo(540,1350);c.quadraticCurveTo(540,1310,600,1320);c.lineTo(600,1350);c.lineWidth=18;c.strokeStyle='#b0b4b8';c.stroke();
  // toothbrush cup
  c.fillStyle='#8ac8d0';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(800,1310,70,100);c.strokeRect(800,1310,70,100);c.fillStyle='#ff6a5a';c.fillRect(815,1240,10,80);c.fillStyle='#4a9a6a';c.fillRect(845,1250,10,70);}
function mirrorFrame(c,x,y,w,h,inner){c.save();c.fillStyle='#3a4a5a';rr(c,x,y,w,h,24);c.fill();c.clip();const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#c8d4dc');g.addColorStop(1,'#8a9aa6');c.fillStyle=g;c.fillRect(x,y,w,h);inner&&inner();c.fillStyle='rgba(255,255,255,0.18)';c.beginPath();c.moveTo(x+60,y);c.lineTo(x+180,y);c.lineTo(x+40,y+h);c.lineTo(x-80,y+h);c.fill();c.restore();c.strokeStyle='#b8a070';c.lineWidth=22;rr(c,x,y,w,h,24);c.stroke();c.strokeStyle=K2;c.lineWidth=5;rr(c,x-11,y-11,w+22,h+22,30);c.stroke();}
// ---------- KITCHEN (mom on video call) ----------
function kitchen(c,x,y,w,h){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#f0e4c8');g.addColorStop(1,'#d8c4a0');c.fillStyle=g;c.fillRect(x,y,w,h);c.strokeStyle=K2;c.lineWidth=5;
  // window with plant + morning light
  const wx=x+w*0.36,wy=y+h*0.1,ww=w*0.28,wh=h*0.28;c.fillStyle='#bfe0f4';c.fillRect(wx,wy,ww,wh);c.fillStyle='#e8f4ec';c.fillRect(wx,wy+wh*0.6,ww,wh*0.4);c.fillStyle='#f4f0e6';c.fillRect(wx+ww/2-4,wy,8,wh);c.strokeRect(wx,wy,ww,wh);
  c.fillStyle='#c86a3a';c.fillRect(wx+ww*0.65,wy+wh-50,46,50);c.strokeRect(wx+ww*0.65,wy+wh-50,46,50);c.fillStyle='#4a8a4a';for(let k=0;k<5;k++){c.beginPath();c.ellipse(wx+ww*0.65+23+(k-2)*14,wy+wh-70-Math.abs(k-2)*-6,10,26,(k-2)*0.4,0,TAU);c.fill();}
  // upper cabinets with handles
  for(const [cx,cw] of [[x+10,w*0.33],[x+w*0.67,w*0.32]]){for(let k=0;k<2;k++){const dx=cx+k*cw/2;c.fillStyle='#8aa8a0';c.fillRect(dx+6,y+h*0.06,cw/2-12,h*0.3);c.strokeRect(dx+6,y+h*0.06,cw/2-12,h*0.3);c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(dx+20,y+h*0.08,cw/2-40,h*0.26);c.fillStyle='#d8c070';c.fillRect(dx+(k?16:cw/2-28),y+h*0.28,8,30);}}
  // tiles
  c.fillStyle='rgba(255,255,255,0.5)';for(let r=0;r<4;r++)for(let k=0;k<16;k++){if(k*w/16+x>wx-10&&k*w/16+x<wx+ww&&r<2)continue;c.fillRect(x+k*w/16+2,y+h*0.42+r*26,w/16-4,22);}
  // counter + items: kettle, fruit bowl, knife block
  c.fillStyle='#c8c0b0';c.fillRect(x,y+h*0.58,w,h*0.05);c.strokeRect(x-5,y+h*0.58,w+10,h*0.05);c.fillStyle='#7a5a3a';c.fillRect(x,y+h*0.63,w,h*0.37);
  for(let k=0;k<4;k++){c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=4;c.strokeRect(x+k*w/4+10,y+h*0.66,w/4-20,h*0.3);}c.strokeStyle=K2;c.lineWidth=5;
  c.fillStyle='#d8dce2';c.beginPath();c.moveTo(x+w*0.1,y+h*0.58);c.lineTo(x+w*0.12,y+h*0.48);c.lineTo(x+w*0.22,y+h*0.48);c.lineTo(x+w*0.24,y+h*0.58);c.fill();c.stroke();c.fillStyle='#2a2a2e';c.fillRect(x+w*0.15,y+h*0.45,w*0.04,h*0.03);
  c.fillStyle='#e8e4dc';c.beginPath();c.ellipse(x+w*0.84,y+h*0.565,70,22,0,0,Math.PI);c.fill();c.stroke();[['#e84a3a',-30],['#f0c030',0],['#7ab040',28]].forEach(([col,dx])=>{c.fillStyle=col;c.beginPath();c.arc(x+w*0.84+dx,y+h*0.55,20,0,TAU);c.fill();c.stroke();});
  c.fillStyle='rgba(255,244,208,0.3)';c.beginPath();c.moveTo(wx,wy+wh);c.lineTo(wx+ww,wy+wh);c.lineTo(wx+ww+160,y+h);c.lineTo(wx-160,y+h);c.fill();c.restore();}
// ---------- BURNING BUILDING ----------
function fireTongue(c,x,y,h,w,t,k){c.save();c.translate(x,y);const fl=Math.sin(t*12+k*3)*0.12+Math.sin(t*19+k)*0.08;[['#ff5a1a',1],['#ffa020',0.72],['#fff0a0',0.42]].forEach(([col,sc])=>{c.fillStyle=col;c.beginPath();c.moveTo(-w*sc,0);c.bezierCurveTo(-w*sc,-h*sc*0.5,-w*sc*0.2+fl*w,-h*sc*0.7,fl*w*2,-h*sc*(1+fl));c.bezierCurveTo(w*sc*0.3+fl*w,-h*sc*0.6,w*sc,-h*sc*0.4,w*sc,0);c.closePath();c.fill();});c.restore();}
function smoke(c,t,x,y,n=10,s=1,a=0.6){for(let i=0;i<n;i++){const p=((t*0.25+hash(i))%1),r=(60+p*220)*s;c.fillStyle=`rgba(40,36,40,${a*(1-p)})`;c.beginPath();c.arc(x+Math.sin(i*2+t)*40*s+p*80*s*(hash(i*3)-0.3),y-p*900*s,r,0,TAU);c.fill();}}
function burningBuilding(c,t,cam,o={}){sky2(c,'dusk');c.fillStyle='rgba(255,90,30,0.15)';c.fillRect(0,0,W,H);
  world(c,cam,()=>{const x=-420,w=840,h=1100,y0=GY-60-h;c.strokeStyle=K2;c.lineWidth=6;c.fillStyle='#8a5a46';c.fillRect(x,y0,w,h);c.fillStyle='rgba(0,0,0,0.12)';for(let yy=y0+10;yy<GY-60;yy+=22)for(let xx=x+((yy/22)%2?0:20);xx<x+w;xx+=40)c.fillRect(xx,yy,38,2);
    c.fillStyle='#4a2e24';c.fillRect(x-14,y0-30,w+28,34);c.strokeRect(x-14,y0-30,w+28,34);
    for(let r=0;r<5;r++)for(let k=0;k<4;k++){const wx=x+60+k*200,wy=y0+60+r*190;const burn=hash(r*4+k)>0.35;c.fillStyle=burn?'#ff8a2a':'#2a2a30';c.fillRect(wx,wy,120,130);if(burn){const gg=c.createRadialGradient(wx+60,wy+80,0,wx+60,wy+80,100);gg.addColorStop(0,'#fff0a0');gg.addColorStop(1,'#ff5a1a');c.fillStyle=gg;c.fillRect(wx,wy,120,130);fireTongue(c,wx+60,wy+20,140+hash(r+k)*60,40,t,r*4+k);c.fillStyle='rgba(20,15,15,0.5)';c.fillRect(wx,wy-30,120,30);}
      c.strokeStyle=K2;c.lineWidth=5;c.strokeRect(wx,wy,120,130);c.fillStyle='#5a3a2e';c.fillRect(wx-10,wy+130,140,12);}
    // door + doorway fire
    c.fillStyle='#ff7a20';c.fillRect(-90,GY-300,180,240);fireTongue(c,0,GY-60,260,70,t,99);c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(-90,GY-300,180,240);c.fillStyle='#3a2a24';c.fillRect(-110,GY-320,220,24);c.strokeRect(-110,GY-320,220,24);
    smoke(c,t,0,y0+80,12,1.6,0.7);smoke(c,t+3,-250,y0+300,8,1.1,0.5);
    c.fillStyle='#8a8680';c.fillRect(cam.x-3000,GY-60,6000,1000);c.fillStyle='rgba(255,120,40,0.25)';c.fillRect(-600,GY-60,1200,200);
    for(let i=0;i<30;i++){const p=(t*0.6+hash(i))%1;c.fillStyle=`rgba(255,${180+hash(i)*60|0},80,${1-p})`;c.beginPath();c.arc(-300+hash(i*3)*600+Math.sin(t*3+i)*30,GY-200-p*900,3+hash(i)*4,0,TAU);c.fill();}
    if(o.world)o.world(c);});
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(W/2,H*0.55,0,W/2,H*0.55,1100);g.addColorStop(0,'rgba(255,110,40,0.28)');g.addColorStop(1,'rgba(255,80,20,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
// ---------- CONSTRUCTION SITE ----------
function ibeam(c,x,y,len,rot,col='#c86a1a'){c.save();c.translate(x,y);c.rotate(rot);c.strokeStyle=K2;c.lineWidth=6;c.fillStyle=col;c.fillRect(-len/2,-34,len,68);c.strokeRect(-len/2,-34,len,68);c.fillStyle=shd2(col,-0.3);c.fillRect(-len/2,-10,len,20);c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(-len/2,-34,len,8);for(let i=0;i<Math.floor(len/60);i++){c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.arc(-len/2+30+i*60,-22,4,0,TAU);c.arc(-len/2+30+i*60,22,4,0,TAU);c.fill();}c.restore();}
function constructionSite(c,t,cam,o={}){sky2(c,'grey');
  world(c,par(cam,0.4),()=>{c.fillStyle='#8a929c';for(let i=-6;i<8;i++){const h=400+hash(i)*500;c.fillRect(i*260,GY-60-h,240,h);}});
  world(c,cam,()=>{c.strokeStyle=K2;c.lineWidth=6;
    // building frame under construction (steel grid + concrete slabs)
    for(let fl=0;fl<6;fl++){const yy=GY-60-fl*200;c.fillStyle='#9a9a96';c.fillRect(-900,yy-24,1300,24);c.strokeRect(-900,yy-24,1300,24);}
    for(let k=0;k<6;k++){const xx=-880+k*250;c.fillStyle='#7a7e86';c.fillRect(xx,GY-1260,30,1200);c.strokeRect(xx,GY-1260,30,1200);}
    c.strokeStyle='rgba(60,60,70,0.7)';c.lineWidth=5;for(let k=0;k<5;k++)for(let fl=0;fl<5;fl++){const xx=-865+k*250,yy=GY-84-fl*200;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+250,yy-176);c.stroke();}
    // scaffolding + safety netting
    c.fillStyle='rgba(60,140,90,0.35)';c.fillRect(-960,GY-1260,80,1200);c.strokeStyle='#c8a030';c.lineWidth=8;for(let fl=0;fl<7;fl++){c.beginPath();c.moveTo(-970,GY-60-fl*180);c.lineTo(-870,GY-60-fl*180);c.stroke();}
    // tower crane
    c.strokeStyle='#e8b020';c.lineWidth=10;const cx=600;for(let i=0;i<14;i++){c.beginPath();c.moveTo(cx-30,GY-60-i*130);c.lineTo(cx+30,GY-60-(i+1)*130);c.moveTo(cx+30,GY-60-i*130);c.lineTo(cx-30,GY-60-(i+1)*130);c.stroke();}c.lineWidth=14;c.beginPath();c.moveTo(cx-30,GY-60);c.lineTo(cx-30,GY-1880);c.moveTo(cx+30,GY-60);c.lineTo(cx+30,GY-1880);c.stroke();
    c.lineWidth=12;c.beginPath();c.moveTo(cx-400,GY-1880);c.lineTo(cx+1400,GY-1880);c.moveTo(cx-400,GY-1800);c.lineTo(cx+1400,GY-1800);c.stroke();c.lineWidth=6;for(let i=0;i<18;i++){c.beginPath();c.moveTo(cx-400+i*100,GY-1800);c.lineTo(cx-350+i*100,GY-1880);c.stroke();}
    c.fillStyle='#e8b020';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(cx-80,GY-1960,160,80);c.strokeRect(cx-80,GY-1960,160,80);
    // fence, cones, barrels, warning sign
    c.fillStyle='#d8d4cc';c.fillRect(cam.x-3000,GY-60,6000,1000);c.fillStyle='#b8a888';c.fillRect(-1000,GY-60,1500,1000);
    for(let i=-6;i<6;i++){const xx=i*220+300;if(xx>-950&&xx<500)continue;c.strokeStyle='#8a8e96';c.lineWidth=5;c.strokeRect(xx,GY-280,210,220);c.strokeStyle='rgba(120,120,130,0.5)';c.lineWidth=2;for(let k=0;k<10;k++){c.beginPath();c.moveTo(xx+k*21,GY-280);c.lineTo(xx+k*21+40,GY-60);c.stroke();}}
    [[-700,1],[-200,0],[260,1]].forEach(([xx])=>{c.fillStyle='#ff6a1a';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(xx-30,GY-50);c.lineTo(xx,GY-150);c.lineTo(xx+30,GY-50);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.fillRect(xx-17,GY-110,34,14);c.fillStyle='#2a2a2a';c.fillRect(xx-40,GY-60,80,12);});
    c.fillStyle='#ffcc00';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(-500,GY-330);c.lineTo(-420,GY-450);c.lineTo(-340,GY-330);c.closePath();c.fill();c.stroke();txt(c,'!',-420,GY-370,70,'#1a1a1a',{stroke:false});c.fillStyle='#4a4a4a';c.fillRect(-425,GY-330,10,270);
    if(o.world)o.world(c);});}
// ---------- EVIDENCE BOARD ----------
function corkBoard(c,t,o={}){c.fillStyle='#1a1614';c.fillRect(0,0,W,H);const bx=60,by=380,bw=960,bh=1100;c.fillStyle='#b88a5a';c.fillRect(bx,by,bw,bh);for(let i=0;i<400;i++){c.fillStyle=`rgba(${hash(i)>0.5?90:200},60,30,0.15)`;c.fillRect(bx+hash(i)*bw,by+hash(i*3)*bh,4,4);}c.strokeStyle='#4a2e1a';c.lineWidth=26;c.strokeRect(bx,by,bw,bh);
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,700,0,540,700,900);g.addColorStop(0,'rgba(255,220,160,0.25)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
function polaroid(c,x,y,rot,draw,label,col='#1a1a1a'){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-92,-102,196,236);c.fillStyle='#f4f0e8';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-100,-110,200,240);c.strokeRect(-100,-110,200,240);c.fillStyle='#7a8a9a';c.fillRect(-84,-94,168,168);c.save();c.beginPath();c.rect(-84,-94,168,168);c.clip();draw&&draw(c);c.restore();txt(c,label,0,102,26,col,{stroke:false,w:800,font:'"Inter Display"'});c.fillStyle='#d0201f';c.beginPath();c.arc(0,-104,10,0,TAU);c.fill();c.restore();}
