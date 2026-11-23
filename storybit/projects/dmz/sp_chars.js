'use strict';
// ===================== Sleep paralysis · cast + creatures + graphics =====================
// "you": grey-blue t-shirt, messy dark-brown hair, thick brows, light stubble
KIND2.him=Object.assign(mkK({coat:'#4e5a6e',trim:'#c8d0dc',skin:SK[1],pants:'#2e3444'}),{robe:false,long:false,hair4:'swoop',hair:'#3a2618',browW:1.3,stubble:1});
KIND2.you=KIND2.him;
const NIGHT=c=>{tint(c,'rgba(28,34,90,0.6)','multiply');tint(c,'rgba(40,10,40,0.18)','screen');vign(c,0.85);grain(c,T,0.07);};
// ---------- the shadow figure (tall, ragged smoke edges, faint pale eyes) ----------
function shadowMan(c,x,y,h,k,t,o={}){if(k<=0)return;c.save();c.translate(x,y);const s=h/600;c.globalAlpha=clamp(k);
  const g=c.createRadialGradient(0,-300*s,40*s,0,-300*s,420*s);g.addColorStop(0,'rgba(20,10,40,0.55)');g.addColorStop(1,'rgba(20,10,40,0)');c.fillStyle=g;c.fillRect(-500*s,-800*s,1000*s,1000*s);
  c.fillStyle='rgba(4,3,10,0.96)';c.beginPath();
  const P=[];const N=60;for(let i=0;i<=N;i++){const u=i/N,a=u*TAU;let rx,ry;// silhouette: head + shoulders + long body tapering to smoke
    const yy=-600*s+u*0;}
  // head
  c.ellipse(0,-540*s,52*s,66*s,0,0,TAU);c.fill();
  // body: shoulders → long tapering robe, ragged hem
  c.beginPath();c.moveTo(-40*s,-480*s);c.quadraticCurveTo(-120*s,-470*s,-130*s,-400*s);c.lineTo(-150*s,-120*s);
  for(let i=0;i<=12;i++){const xx=-150*s+i*25*s,yy=(hash(i*3)*40+Math.sin(t*3+i)*12)*s;c.lineTo(xx,yy);}
  c.lineTo(150*s,-120*s);c.lineTo(130*s,-400*s);c.quadraticCurveTo(120*s,-470*s,40*s,-480*s);c.closePath();c.fill();
  // long arms + fingers
  c.strokeStyle='rgba(4,3,10,0.96)';c.lineCap='round';for(const sd of [-1,1]){c.lineWidth=26*s;c.beginPath();c.moveTo(sd*120*s,-420*s);c.quadraticCurveTo(sd*190*s,-260*s,sd*170*s,-80*s+(o.reach||0)*sd*0);c.stroke();
    c.lineWidth=7*s;for(let f=0;f<4;f++){c.beginPath();c.moveTo(sd*170*s,-80*s);c.quadraticCurveTo(sd*(178+f*6)*s,-40*s,sd*(165+f*10)*s,(-10+f*4)*s);c.stroke();}}
  // smoke wisps
  for(let i=0;i<14;i++){const p=((t*0.4+hash(i))%1);c.fillStyle=`rgba(10,6,24,${0.35*(1-p)})`;c.beginPath();c.arc((hash(i*3)-0.5)*300*s,(-560+hash(i*5)*600)*s-p*120*s,(20+p*50)*s,0,TAU);c.fill();}
  if(o.eyes){const e=o.eyes;for(const sd of [-1,1]){const gg=c.createRadialGradient(sd*20*s,-548*s,0,sd*20*s,-548*s,26*s);gg.addColorStop(0,`rgba(255,240,230,${e})`);gg.addColorStop(0.3,`rgba(255,120,100,${0.6*e})`);gg.addColorStop(1,'rgba(255,60,60,0)');c.fillStyle=gg;c.beginPath();c.arc(sd*20*s,-548*s,26*s,0,TAU);c.fill();}}
  if(o.face){const f=o.face;c.strokeStyle=`rgba(230,210,220,${0.55*f})`;c.lineWidth=4*s;c.beginPath();c.moveTo(-24*s,-500*s);c.quadraticCurveTo(0,-480*s+Math.sin(t*5)*4*s,24*s,-500*s);c.stroke();}
  c.restore();}
// ---------- the crouching "hag" on the chest ----------
function hag(c,x,y,h,k,t,o={}){if(k<=0)return;c.save();c.translate(x,y);const s=h/300;c.globalAlpha=clamp(k);c.fillStyle='rgba(6,4,12,0.95)';
  // hunched back + hood
  c.beginPath();c.moveTo(-120*s,0);c.quadraticCurveTo(-140*s,-160*s,-40*s,-230*s);c.quadraticCurveTo(30*s,-280*s,90*s,-220*s);c.quadraticCurveTo(130*s,-170*s,110*s,-110*s);c.quadraticCurveTo(140*s,-60*s,120*s,0);c.closePath();c.fill();
  // hood opening with eyes
  c.fillStyle='rgba(0,0,0,1)';c.beginPath();c.ellipse(70*s,-190*s,34*s,40*s,0.3,0,TAU);c.fill();
  for(const dx of [-10,14]){const gg=c.createRadialGradient((70+dx)*s,-192*s,0,(70+dx)*s,-192*s,12*s);gg.addColorStop(0,`rgba(255,235,220,${o.eyes??0.9})`);gg.addColorStop(1,'rgba(255,80,60,0)');c.fillStyle=gg;c.beginPath();c.arc((70+dx)*s,-192*s,12*s,0,TAU);c.fill();}
  // bony arms reaching down onto the chest
  c.strokeStyle='rgba(6,4,12,0.95)';c.lineCap='round';c.lineWidth=16*s;for(const [ax,ay,bx,by] of [[40,-140,90,-20],[-20,-130,10,-10]]){c.beginPath();c.moveTo(ax*s,ay*s);c.quadraticCurveTo((ax+bx)/2*s+30*s,(ay+by)/2*s,bx*s,by*s);c.stroke();c.lineWidth=5*s;for(let f=0;f<4;f++){c.beginPath();c.moveTo(bx*s,by*s);c.lineTo((bx-12+f*8)*s,(by+18)*s);c.stroke();}c.lineWidth=16*s;}
  for(let i=0;i<10;i++){const p=((t*0.35+hash(i))%1);c.fillStyle=`rgba(10,6,24,${0.3*(1-p)})`;c.beginPath();c.arc((hash(i*3)-0.5)*240*s,(-200+hash(i*5)*200)*s-p*80*s,(16+p*36)*s,0,TAU);c.fill();}
  c.restore();}
// ---------- dream wisps leaking from the head ----------
function dreamWisps(c,x,y,t,k,s=1){if(k<=0)return;c.save();for(let i=0;i<9;i++){const p=((t*0.25+i/9)%1);const a=-Math.PI/2+(hash(i)-0.5)*2.2;const d=p*620*s*k;const px=x+Math.cos(a)*d+Math.sin(t*2+i)*30*s,py=y+Math.sin(a)*d*0.6;
  c.fillStyle=`rgba(${120+hash(i)*60|0},70,${170+hash(i*3)*60|0},${0.42*(1-p)*k})`;c.beginPath();c.arc(px,py,(30+p*80)*s,0,TAU);c.fill();
  if(i%3===0&&p>0.3){c.fillStyle=`rgba(255,230,240,${0.7*(1-p)*k})`;for(const sd of [-1,1]){c.beginPath();c.ellipse(px+sd*12*s,py-6*s,5*s,7*s,0,0,TAU);c.fill();}}}c.restore();}
// ---------- brain + muscle switch lever ----------
function lever(c,x,y,s,on,t){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';panel(c,-120,-170,240,340,{r:30,fill:'rgba(16,16,30,0.94)'});
  c.fillStyle='#2a2e3a';c.strokeStyle=OL;c.lineWidth=6;rr(c,-34,-120,68,240,30);c.fill();c.stroke();
  const a=lerp(0.75,-0.75,on);c.save();c.rotate(a);c.fillStyle='#8a8e98';c.lineWidth=6;rr(c,-10,-130,20,130,8);c.fill();c.stroke();c.fillStyle=on>0.5?'#40c060':'#e03a2a';c.beginPath();c.arc(0,-135,30,0,TAU);c.fill();c.stroke();c.restore();
  c.fillStyle='#40c060';c.beginPath();c.arc(0,-145,0,0,TAU);c.fill();
  // muscle icon (flexed arm) top, zzz bottom
  c.save();c.translate(0,-140);c.fillStyle=on>0.5?'#ff8a6a':'#5a5e6a';c.restore();c.restore();}
function flexIco(c,x,y,r,on){c.save();c.translate(x,y);c.fillStyle=on?'#f6c8a8':'#5a5e6a';c.strokeStyle=OL;c.lineWidth=r*0.08;c.beginPath();c.moveTo(-r*0.8,r*0.4);c.quadraticCurveTo(-r*0.6,-r*0.1,-r*0.1,-r*0.2);c.quadraticCurveTo(r*0.1,-r*0.9,r*0.5,-r*0.6);c.quadraticCurveTo(r*0.8,-r*0.3,r*0.5,0);c.quadraticCurveTo(r*0.3,r*0.5,-r*0.2,r*0.5);c.closePath();c.fill();c.stroke();c.restore();}
// ---------- parchment panel for the history beats ----------
function parchment(c,x,y,w,h,k,draw){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(-0.02);const g=c.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'#e8d6aa');g.addColorStop(0.5,'#d8c08a');g.addColorStop(1,'#bfa26a');c.fillStyle=g;c.strokeStyle='#4a3420';c.lineWidth=6;
  c.beginPath();c.moveTo(-w/2,-h/2);for(let i=0;i<=10;i++)c.lineTo(-w/2+i*w/10,-h/2+(hash(i)-0.5)*14);for(let i=0;i<=10;i++)c.lineTo(w/2+(hash(i*3)-0.5)*14,-h/2+i*h/10);for(let i=0;i<=10;i++)c.lineTo(w/2-i*w/10,h/2+(hash(i*5)-0.5)*14);for(let i=0;i<=10;i++)c.lineTo(-w/2+(hash(i*7)-0.5)*14,h/2-i*h/10);c.closePath();c.fill();c.stroke();
  c.save();c.clip();c.fillStyle='rgba(120,80,30,0.15)';for(let i=0;i<40;i++){c.beginPath();c.arc((hash(i)-0.5)*w,(hash(i*3)-0.5)*h,10+hash(i*5)*40,0,TAU);c.fill();}draw(c);c.restore();c.restore();}
function inkSleeper(c,x,y,s,col='#2a1a10'){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=5;c.lineCap='round';c.lineJoin='round';
  c.beginPath();c.moveTo(-170,40);c.lineTo(170,40);c.lineTo(170,70);c.lineTo(-170,70);c.closePath();c.stroke();c.beginPath();c.arc(-120,10,26,0,TAU);c.stroke();
  c.beginPath();c.moveTo(-95,20);c.quadraticCurveTo(0,-10,150,30);c.stroke();for(let i=0;i<5;i++){c.beginPath();c.moveTo(-60+i*40,14);c.quadraticCurveTo(-40+i*40,30,-20+i*40,36);c.stroke();}c.restore();}
// ---------- original "painting": a sleeper on a couch, a small demon crouched on her chest ----------
function painting(c,x,y,w,h,t,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);
  // gilded frame
  const fg=c.createLinearGradient(-w/2,-h/2,w/2,h/2);fg.addColorStop(0,'#f2cf6a');fg.addColorStop(0.5,'#a8741e');fg.addColorStop(1,'#e8be58');c.fillStyle=fg;c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-w/2-46,-h/2-46,w+92,h+92);c.strokeRect(-w/2-46,-h/2-46,w+92,h+92);
  c.strokeStyle='rgba(90,50,10,0.7)';c.lineWidth=4;c.strokeRect(-w/2-26,-h/2-26,w+52,h+52);
  c.save();c.beginPath();c.rect(-w/2,-h/2,w,h);c.clip();
  const bg=c.createRadialGradient(-w*0.1,0,20,0,0,w);bg.addColorStop(0,'#5a3424');bg.addColorStop(1,'#120806');c.fillStyle=bg;c.fillRect(-w/2,-h/2,w,h);
  // red curtain
  c.fillStyle='#6a1414';c.beginPath();c.moveTo(w/2,-h/2);c.quadraticCurveTo(w*0.15,-h*0.1,w*0.3,h/2);c.lineTo(w/2,h/2);c.closePath();c.fill();
  // couch + draped sleeper (white gown)
  c.fillStyle='#3a2216';c.fillRect(-w*0.45,h*0.12,w*0.9,h*0.3);c.fillStyle='#efe6d6';c.strokeStyle='#2a1a10';c.lineWidth=3;
  c.beginPath();c.moveTo(-w*0.42,h*0.12);c.quadraticCurveTo(-w*0.1,-h*0.02,w*0.3,h*0.1);c.quadraticCurveTo(w*0.36,h*0.2,w*0.25,h*0.24);c.lineTo(-w*0.42,h*0.24);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8c8a8';c.beginPath();c.arc(-w*0.36,h*0.06,w*0.06,0,TAU);c.fill();c.stroke();c.fillStyle='#8a4a1a';c.beginPath();c.arc(-w*0.39,h*0.08,w*0.065,1.2,4.4);c.fill();
  c.strokeStyle='#efe6d6';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(-w*0.3,h*0.12);c.quadraticCurveTo(-w*0.38,h*0.32,-w*0.44,h*0.42);c.stroke();
  // small demon crouched on the chest
  c.fillStyle='#2a2018';c.beginPath();c.ellipse(-w*0.12,-h*0.02,w*0.08,h*0.1,0.2,0,TAU);c.fill();c.beginPath();c.arc(-w*0.06,-h*0.12,w*0.05,0,TAU);c.fill();
  for(const sd of [-1,1]){c.beginPath();c.moveTo(-w*0.06+sd*w*0.03,-h*0.15);c.lineTo(-w*0.06+sd*w*0.05,-h*0.22);c.lineTo(-w*0.06+sd*w*0.01,-h*0.16);c.fill();}
  c.fillStyle='#ffcf5a';for(const sd of [-1,1]){c.beginPath();c.arc(-w*0.06+sd*w*0.017,-h*0.12,w*0.008,0,TAU);c.fill();}
  // varnish glow + cracks
  c.fillStyle='rgba(255,220,150,0.08)';c.fillRect(-w/2,-h/2,w,h);c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=1;for(let i=0;i<30;i++){c.beginPath();c.moveTo((hash(i)-0.5)*w,(hash(i*3)-0.5)*h);c.lineTo((hash(i)-0.5)*w+20,(hash(i*3)-0.5)*h+12);c.stroke();}
  c.restore();c.restore();}
function battery(c,x,y,s,v){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=OL;c.lineWidth=8;c.fillStyle='#1a1c24';rr(c,-90,-50,170,100,16);c.fill();c.stroke();c.fillRect(80,-20,18,40);const col=v>0.5?'#40c060':v>0.25?'#f0c030':'#e03a2a';c.fillStyle=col;rr(c,-78,-38,146*clamp(v),76,10);c.fill();c.restore();}
function stressMeter(c,x,y,r,v,t){gauge(c,x,y,r,clamp(v+Math.sin(t*14)*0.02));}
if(typeof zzz==='undefined'){window.zzz=function(c,x,y,t,s=1,a=1){c.save();c.globalAlpha=a;for(let i=0;i<3;i++){const p=((t*0.5+i/3)%1);c.save();c.translate(x+p*60*s,y-p*120*s);c.globalAlpha=a*Math.sin(p*Math.PI);txt(c,'Z',0,0,(40+i*14)*s,'#cfe0ff',{sw:8*s});c.restore();}c.restore();};}
if(typeof eyeIco==='undefined'){window.eyeIco=function(c,x,y,r,open){c.save();c.translate(x,y);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=r*0.1;c.beginPath();c.moveTo(-r,0);c.quadraticCurveTo(0,-r*0.9,r,0);c.quadraticCurveTo(0,r*0.9,-r,0);c.fill();c.stroke();c.fillStyle=OL;c.beginPath();c.arc(0,0,r*0.35,0,TAU);c.fill();c.restore();};}
// ===================== the demon (detailed, creepy): gaunt body, long skull, sunken glowing eyes, needle-tooth grin, claws, rotting shroud =====================
function demon(c,x,y,h,k,t,o={}){if(k<=0)return;const pose=o.pose||'stand';c.save();c.translate(x,y);const s=h/600;c.scale(s,s);c.globalAlpha=clamp(k);c.lineJoin='round';c.lineCap='round';
  const SKIN='#1c1822',SK2='#2c2634',RIM='rgba(150,170,255,0.75)',INK='#05040a',tw=Math.sin(t*1.7)*0.04+(o.twitch?Math.sin(t*37)*0.03*o.twitch:0);
  // cold aura
  const au=c.createRadialGradient(0,-360,40,0,-360,520);au.addColorStop(0,'rgba(60,20,70,0.35)');au.addColorStop(1,'rgba(60,20,70,0)');c.fillStyle=au;c.fillRect(-600,-900,1200,1100);
  const limb=(pts,w,col)=>{c.strokeStyle=INK;c.lineWidth=w+8;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();c.strokeStyle=RIM;c.lineWidth=2.5;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0]+w*0.3,p[1]):c.moveTo(p[0]+w*0.3,p[1]));c.stroke();};
  const claw=(px,py,ang,len=60)=>{c.save();c.translate(px,py);c.rotate(ang);for(let f=0;f<4;f++){const a=(f-1.5)*0.22;c.strokeStyle=INK;c.lineWidth=10;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(Math.sin(a)*len*0.5+8,len*0.45,Math.sin(a)*len*0.9,len);c.stroke();c.strokeStyle=SK2;c.lineWidth=5;c.stroke();
      c.fillStyle='#cfc8bc';c.beginPath();c.moveTo(Math.sin(a)*len*0.9-4,len);c.lineTo(Math.sin(a)*len*0.9+4,len);c.lineTo(Math.sin(a)*len*1.0,len+22);c.closePath();c.fill();}c.restore();};
  const head=(hx,hy,rot)=>{c.save();c.translate(hx,hy);c.rotate(rot);
    // elongated skull
    c.fillStyle=SKIN;c.strokeStyle=INK;c.lineWidth=7;c.beginPath();c.moveTo(0,-120);c.bezierCurveTo(62,-118,74,-40,58,10);c.bezierCurveTo(48,50,26,78,0,84);c.bezierCurveTo(-26,78,-48,50,-58,10);c.bezierCurveTo(-74,-40,-62,-118,0,-120);c.closePath();c.fill();c.stroke();
    c.strokeStyle=RIM;c.lineWidth=3;c.beginPath();c.moveTo(40,-104);c.bezierCurveTo(66,-70,66,-10,52,20);c.stroke();
    // cheekbones + temple hollows
    c.strokeStyle='rgba(0,0,0,0.7)';c.lineWidth=4;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*50,-6);c.quadraticCurveTo(sd*30,14,sd*12,8);c.stroke();c.beginPath();c.moveTo(sd*44,-70);c.quadraticCurveTo(sd*56,-40,sd*48,-20);c.stroke();}
    // sunken sockets with pinprick glowing eyes
    for(const sd of [-1,1]){c.fillStyle=INK;c.beginPath();c.ellipse(sd*24,-34,19,26,sd*0.25,0,TAU);c.fill();
      const e=o.eyes??1;const gg=c.createRadialGradient(sd*24,-30,0,sd*24,-30,30);gg.addColorStop(0,`rgba(255,250,235,${e})`);gg.addColorStop(0.18,`rgba(255,200,170,${e})`);gg.addColorStop(0.45,`rgba(230,40,40,${0.6*e})`);gg.addColorStop(1,'rgba(200,0,0,0)');c.fillStyle=gg;c.beginPath();c.arc(sd*24,-30,30,0,TAU);c.fill();}
    // needle-tooth grin
    const gr=o.grin??1;c.fillStyle='#0a0408';c.beginPath();c.moveTo(-42,34);c.quadraticCurveTo(0,58+gr*14,42,34);c.quadraticCurveTo(0,44+gr*30,-42,34);c.fill();
    c.fillStyle='#d8d2c4';for(let i=0;i<11;i++){const u=i/10,tx=lerp(-38,38,u),ty=34+Math.sin(u*Math.PI)*(12+gr*12);c.beginPath();c.moveTo(tx-3,ty);c.lineTo(tx+3,ty);c.lineTo(tx,ty+11+hash(i)*6);c.closePath();c.fill();c.beginPath();c.moveTo(tx-3,ty+(10+gr*18));c.lineTo(tx+3,ty+(10+gr*18));c.lineTo(tx,ty+(1+gr*12)-hash(i*3)*4);c.closePath();c.fill();}
    // thin wisps of hair
    c.strokeStyle='rgba(20,18,26,0.9)';c.lineWidth=3;for(let i=0;i<9;i++){const hx2=-46+i*11;c.beginPath();c.moveTo(hx2,-108+Math.abs(hx2)*0.2);c.quadraticCurveTo(hx2+Math.sin(t*2+i)*12,-40,hx2+(hash(i)-0.5)*40,40+hash(i*3)*80);c.stroke();}
    c.restore();};
  if(pose==='stand'){
    // rotting shroud behind
    c.fillStyle='#0c0a12';c.beginPath();c.moveTo(-90,-470);c.quadraticCurveTo(-170,-300,-160,-60);for(let i=0;i<=10;i++){c.lineTo(-160+i*32,(hash(i*5)*60+Math.sin(t*2.2+i)*14));}c.quadraticCurveTo(170,-300,90,-470);c.closePath();c.fill();
    c.strokeStyle='rgba(90,90,140,0.25)';c.lineWidth=3;for(let i=0;i<6;i++){c.beginPath();c.moveTo(-60+i*24,-440);c.quadraticCurveTo(-90+i*36,-200,-110+i*44,0);c.stroke();}
    // legs (bony, bent)
    limb([[-26,-170],[-40,-80],[-30,0]],22,SKIN);limb([[26,-170],[44,-84],[36,0]],22,SKIN);
    // emaciated torso with ribs
    c.fillStyle=SKIN;c.strokeStyle=INK;c.lineWidth=7;c.beginPath();c.moveTo(-70,-440);c.quadraticCurveTo(-82,-300,-40,-170);c.lineTo(40,-170);c.quadraticCurveTo(82,-300,70,-440);c.quadraticCurveTo(0,-470,-70,-440);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(0,0,0,0.65)';c.lineWidth=4;for(let i=0;i<6;i++){const yy=-400+i*30;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*6,yy);c.quadraticCurveTo(sd*40,yy-8,sd*62,yy+14);c.stroke();}}
    c.strokeStyle=RIM;c.lineWidth=3;c.beginPath();c.moveTo(66,-430);c.quadraticCurveTo(76,-300,38,-176);c.stroke();
    // arms hanging too long, claws near the knees
    const sw=Math.sin(t*1.3)*6;limb([[-66,-430],[-110,-300],[-118,-160+sw]],18,SKIN);limb([[66,-430],[112,-300],[122,-150-sw]],18,SKIN);claw(-118,-160+sw,0.15,70);claw(122,-150-sw,-0.15,70);
    head(0,-540,-0.12+tw);
  }else{// crouched on a chest: knees up, hands planted, head low and forward
    c.fillStyle='#0c0a12';c.beginPath();c.moveTo(-150,-170);c.quadraticCurveTo(-210,-60,-190,10);for(let i=0;i<=8;i++)c.lineTo(-190+i*45,10+hash(i*7)*24+Math.sin(t*2+i)*6);c.quadraticCurveTo(200,-90,140,-190);c.closePath();c.fill();
    limb([[-60,-120],[-130,-170],[-120,-10]],22,SKIN);limb([[60,-120],[130,-176],[124,-10]],22,SKIN);
    c.fillStyle=SKIN;c.strokeStyle=INK;c.lineWidth=7;c.beginPath();c.ellipse(0,-150,92,70,0,0,TAU);c.fill();c.stroke();
    c.strokeStyle='rgba(0,0,0,0.6)';c.lineWidth=4;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*22,-210);c.quadraticCurveTo(i*26,-150,i*22,-96);c.stroke();}
    limb([[-70,-180],[-90,-80],[-60,-6]],17,SKIN);limb([[70,-180],[94,-80],[66,-6]],17,SKIN);claw(-60,-6,0.1,46);claw(66,-6,-0.1,46);
    head(0,-250,0.18+tw);}
  // creeping smoke at the base
  for(let i=0;i<12;i++){const p=((t*0.3+hash(i))%1);c.fillStyle=`rgba(14,8,26,${0.45*(1-p)})`;c.beginPath();c.arc((hash(i*3)-0.5)*360,-p*160+10,30+p*60,0,TAU);c.fill();}
  c.restore();}
// moonlight shaft + dust in it
function moonShaft(c,t,x0=820){c.save();c.globalCompositeOperation='screen';const g=c.createLinearGradient(x0,0,x0-500,1920);g.addColorStop(0,'rgba(140,160,255,0.22)');g.addColorStop(1,'rgba(140,160,255,0.02)');c.fillStyle=g;c.beginPath();c.moveTo(x0-60,0);c.lineTo(x0+260,0);c.lineTo(x0-200,1920);c.lineTo(x0-560,1920);c.closePath();c.fill();
  for(let i=0;i<40;i++){const p=((t*0.05+hash(i))%1);const yy=p*1920,xx=x0-60+hash(i*3)*300-yy*0.27;c.fillStyle=`rgba(200,210,255,${0.35*Math.sin(p*Math.PI)})`;c.beginPath();c.arc(xx,yy,1.5+hash(i*5)*2.5,0,TAU);c.fill();}c.restore();}
function flick(t){return 0.85+0.15*Math.sin(t*23)*Math.sin(t*7.3);}
// ===================== reference-matched demons =====================
// 1) the hooded watcher: a tall solid-black shroud that swallows the light, two tiny pale eyes, soft blurry edges
function hooded(c,x,y,h,k,t,o={}){if(k<=0)return;c.save();c.translate(x,y);const s=h/600;c.scale(s,s);const sway=Math.sin(t*0.9)*4,tilt=Math.sin(t*0.37)*0.06+0.05;
  const B=(o.blur??5)/Math.max(0.4,s);c.globalAlpha=clamp(k);
  // smoke bleeding off the edges
  c.filter=`blur(${B*3}px)`;c.fillStyle='rgba(0,0,0,0.55)';for(let i=0;i<9;i++){const a=i/8,px=lerp(-230,230,a)+Math.sin(t*0.8+i)*20,py=-60-((t*40+i*90)%380);c.beginPath();c.ellipse(px*(1-Math.abs(py)/900),py,40,60,0,0,TAU);c.fill();}
  c.filter=`blur(${B}px)`;
  // shroud: hunched shoulders, hood pitched forward, ragged hem dissolving into tatters
  c.save();c.translate(0,-300);c.rotate(tilt*0.3);c.translate(0,300);
  c.beginPath();c.moveTo(-6+sway,-600);c.bezierCurveTo(78+sway,-604,104+sway,-520,96+sway,-468);c.bezierCurveTo(168,-462,196,-392,202,-300);c.bezierCurveTo(212,-180,226,-60,236,-10);
  for(let i=0;i<=22;i++){const xx=236-i*472/22,dep=(i%2?60+hash(i*7)*90:0)+Math.sin(t*1.7+i*1.3)*10;c.lineTo(xx,dep-10);}
  c.bezierCurveTo(-226,-60,-212,-180,-202,-300);c.bezierCurveTo(-196,-392,-168,-462,-96+sway,-468);c.bezierCurveTo(-104+sway,-520,-78+sway,-604,-6+sway,-600);c.closePath();
  const g=c.createLinearGradient(0,-600,0,120);g.addColorStop(0,'rgba(4,4,8,0.98)');g.addColorStop(0.8,'rgba(2,2,5,0.97)');g.addColorStop(1,'rgba(2,2,5,0.2)');c.fillStyle=g;c.fill();
  // torn strips hanging from the sleeves
  c.strokeStyle='rgba(3,3,6,0.95)';c.lineCap='round';for(const sd of [-1,1])for(let i=0;i<5;i++){c.lineWidth=10-i;const bx=sd*(150+i*12);c.beginPath();c.moveTo(bx,-300);c.quadraticCurveTo(bx+sd*14+Math.sin(t*1.4+i)*8,-200,bx+sd*(8+i*6)+Math.sin(t*1.9+i)*12,-110-hash(i*sd+9)*70);c.stroke();}
  // folds + moonlit rim
  c.filter=`blur(${B*1.6}px)`;c.strokeStyle='rgba(70,80,120,0.0)';c.lineWidth=14;for(const fx of [-110,-45,20,85,140]){c.beginPath();c.moveTo(fx*0.55+sway,-440);c.quadraticCurveTo(fx,-220,fx*1.1,-10);c.stroke();}
  c.strokeStyle='rgba(130,150,210,0.16)';c.lineWidth=5;c.beginPath();c.moveTo(-6+sway,-598);c.bezierCurveTo(78+sway,-602,104+sway,-520,96+sway,-468);c.bezierCurveTo(168,-462,196,-392,200,-300);c.stroke();
  c.restore();
  // hood opening, head tilted: void, then a barely-there gaunt face and pinprick eyes
  c.save();c.translate(sway,-525);c.rotate(tilt);c.filter=`blur(${B*0.6}px)`;
  const hg=c.createRadialGradient(0,0,10,0,0,60);hg.addColorStop(0,'#000');hg.addColorStop(1,'rgba(0,0,0,0.9)');c.fillStyle=hg;c.beginPath();c.ellipse(0,0,48,58,0,0,TAU);c.fill();
  c.filter=`blur(${B*0.8}px)`;c.fillStyle='rgba(150,155,175,0.07)';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*22,8,9,16,sd*0.3,0,TAU);c.fill();}
  
  c.filter='none';const e=(o.eyes??1)*(0.85+0.15*Math.sin(t*7.3)*Math.sin(t*3.1));if(e>0){const jit=Math.sin(t*23)*0.6;for(const sd of [-1,1]){const ex=sd*15+jit,ey=-7;
    const rr=c.createRadialGradient(ex,ey,0,ex,ey,22);rr.addColorStop(0,`rgba(255,80,70,${0.25*e})`);rr.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=rr;c.beginPath();c.arc(ex,ey,22,0,TAU);c.fill();
    const gg=c.createRadialGradient(ex,ey,0,ex,ey,12);gg.addColorStop(0,`rgba(255,255,255,${e})`);gg.addColorStop(0.35,`rgba(230,235,255,${0.85*e})`);gg.addColorStop(1,'rgba(200,210,255,0)');c.fillStyle=gg;c.beginPath();c.arc(ex,ey,12,0,TAU);c.fill();}}
  c.restore();c.restore();}
// foreground blanket for the POV shots (his own legs under the covers)
function povBlanket(c,t){c.save();const g=c.createLinearGradient(0,1250,0,1920);g.addColorStop(0,'#3a4058');g.addColorStop(1,'#151826');c.fillStyle=g;c.beginPath();c.moveTo(-40,1920);c.lineTo(-40,1420);c.bezierCurveTo(160,1300,340,1330,460,1400);c.bezierCurveTo(560,1320,760,1300,1120,1380);c.lineTo(1120,1920);c.closePath();c.fill();
  c.strokeStyle='rgba(150,165,220,0.25)';c.lineWidth=5;for(const [a,b,cc,d] of [[80,1500,300,1440],[600,1480,860,1430],[200,1700,520,1600],[700,1700,980,1620]]){c.beginPath();c.moveTo(a,b);c.quadraticCurveTo((a+cc)/2,b-50,cc,d);c.stroke();}
  c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(470,1430,90,30,0,0,TAU);c.fill();c.restore();}
// 2) the creature over the bed (side view): huge, gaunt, arched over him, long hanging hair, face inches above his, bony arms planted around him, backlit
function overBed(c,hx,hy,S,k,t,o={}){if(k<=0)return;c.save();c.globalAlpha=clamp(k);const fx=o.flip?-1:1,br=Math.sin(t*1.1)*5,dn=(o.lower||0)*40;const BODY='#14121c',RIM='rgba(225,232,255,0.8)';
  // local units: his face is at (0,0); +x runs along his body (toward the feet), -y is up
  const P=(x,y)=>[hx+x*S*fx,hy+(y+br*0.3)*S];c.lineJoin='round';c.lineCap='round';
  const limb=(pts,w)=>{c.strokeStyle=BODY;c.lineWidth=w*S;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...P(...p)):c.moveTo(...P(...p)));c.stroke();c.strokeStyle=RIM;c.lineWidth=2.2*S;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...P(p[0],p[1]-w*0.45)):c.moveTo(...P(p[0],p[1]-w*0.45)));c.stroke();
    const kn=pts[1];c.fillStyle=BODY;c.beginPath();c.arc(...P(...kn),w*0.75*S,0,TAU);c.fill();};
  const hand=(x,y,dir)=>{for(let f=0;f<4;f++){const ax=x+(f-1.5)*12;c.strokeStyle=BODY;c.lineWidth=7*S;c.beginPath();c.moveTo(...P(x,y));c.quadraticCurveTo(...P(ax+dir*8,y+10),...P(ax+dir*14,y+30));c.stroke();c.fillStyle='#cfc8bc';const tip=P(ax+dir*14,y+30);c.beginPath();c.arc(tip[0],tip[1],2.6*S,0,TAU);c.fill();}};
  c.filter=`blur(${o.blur??1}px)`;
  // hind legs: knees high above, feet on the bed beyond his knees
  limb([[330,-150],[430,-520],[540,40]],30);limb([[300,-140],[360,-470],[470,50]],26);
  // arched back: hips high over his legs, spine curving down to the shoulders above his chest
  c.fillStyle=BODY;c.beginPath();c.moveTo(...P(390,-330));c.bezierCurveTo(...P(320,-560),...P(120,-560),...P(40,-330+dn));c.bezierCurveTo(...P(20,-280+dn),...P(60,-240+dn),...P(110,-250+dn));c.bezierCurveTo(...P(200,-300),...P(300,-260),...P(390,-330));c.closePath();c.fill();
  c.strokeStyle=RIM;c.lineWidth=2.6*S;c.beginPath();c.moveTo(...P(392,-344));c.bezierCurveTo(...P(320,-574),...P(120,-574),...P(36,-344+dn));c.stroke();
  c.strokeStyle='rgba(210,220,250,0.3)';c.lineWidth=1.8*S;for(let i=0;i<7;i++){const u=i/6,q=P(lerp(330,90,u),lerp(-470,-420,u)-Math.sin(u*Math.PI)*50);c.beginPath();c.arc(q[0],q[1],7*S,Math.PI,TAU);c.stroke();}
  // long arms planted either side of his head and chest
  limb([[70,-300+dn],[-60,-260],[-120,-20]],18);hand(-120,-20,-1);limb([[130,-290+dn],[190,-170],[170,-10]],17);hand(170,-10,1);
  // neck + head hanging down over his face, a head-height above it
  limb([[60,-300+dn],[20,-230+dn]],22);
  const Hx=10,Hy=-175+dn;const HH=P(Hx,Hy);c.fillStyle=BODY;c.beginPath();c.ellipse(HH[0],HH[1],42*S,55*S,0.15*fx,0,TAU);c.fill();
  // long stringy hair hanging down beside (not over) his face
  for(let i=0;i<24;i++){const u=i/23,sx=Hx+lerp(-46,46,u),len=70+hash(i*3)*80;const side=sx<Hx?-1:1;c.strokeStyle=BODY;c.lineWidth=(3+hash(i)*4)*S;c.beginPath();c.moveTo(...P(sx,Hy-40));
    c.bezierCurveTo(...P(sx+side*10+Math.sin(t*1.3+i)*4,Hy+10),...P(sx+side*(20+hash(i*7)*20),Hy+50),...P(sx+side*(30+hash(i*5)*30),Hy-40+len));c.stroke();}
  c.strokeStyle='rgba(220,228,255,0.35)';c.lineWidth=1.6*S;for(let i=0;i<7;i++){const sx=Hx+30+i*3;c.beginPath();c.moveTo(...P(sx,Hy-40));c.quadraticCurveTo(...P(sx+20,Hy+20),...P(sx+30+hash(i)*20,Hy+40+hash(i*3)*40));c.stroke();}
  c.filter='none';
  // pale eyes staring straight down at him, thin wet grin
  const e=o.eyes??1;for(const d2 of [-12,14]){const E=P(Hx+d2,Hy+12);c.fillStyle=`rgba(238,240,248,${e})`;c.beginPath();c.ellipse(E[0],E[1],8*S,6*S,0,0,TAU);c.fill();c.fillStyle='#000';c.beginPath();c.arc(E[0],E[1]+1.5*S,2.8*S,0,TAU);c.fill();}
  const M=P(Hx,Hy+36);c.strokeStyle=`rgba(200,190,200,${0.8*e})`;c.lineWidth=2*S;c.beginPath();c.moveTo(M[0]-16*S,M[1]);c.quadraticCurveTo(M[0],M[1]+8*S,M[0]+16*S,M[1]);c.stroke();
  c.restore();}
// backlit window glow behind the creature
function windowGlow(c,x,y,w,h,a=1){c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(x,y,20,x,y,Math.max(w,h));g.addColorStop(0,`rgba(225,232,255,${0.55*a})`);g.addColorStop(0.4,`rgba(150,170,230,${0.25*a})`);g.addColorStop(1,'rgba(80,90,150,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle=`rgba(235,240,255,${0.35*a})`;c.fillRect(x-w/2,y-h/2,w,h);c.strokeStyle=`rgba(20,22,40,${0.8*a})`;c.lineWidth=10;c.strokeRect(x-w/2,y-h/2,w,h);c.beginPath();c.moveTo(x,y-h/2);c.lineTo(x,y+h/2);c.moveTo(x-w/2,y);c.lineTo(x+w/2,y);c.stroke();c.restore();}
// him lying in bed seen from the side, head on the pillow, duvet up to the chest
function lyingSide(c,ho){const head=pp([0,0.86,-1.62]),foot=pp([0,0.86,0.1]);const L=lieAt(c,'him',[0,0.86,-1.62],[0,0.86,0.1],Object.assign({air:1,hf:[10,93],hb:[-10,93]},ho));
  // duvet over the body
  const a=pp([0,0.86,-1.25]),b=pp([0,0.86,0.15]);c.save();const g=c.createLinearGradient(0,a.y-60,0,a.y+120);g.addColorStop(0,'#6a7496');g.addColorStop(1,'#2e3350');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=5;
  c.beginPath();c.moveTo(a.x,a.y+30);c.quadraticCurveTo(a.x-40,a.y-70,(a.x+b.x)/2,a.y-55);c.quadraticCurveTo(b.x+80,a.y-40,b.x-60,a.y-20);c.lineTo(b.x-60,a.y+140);c.lineTo(a.x,a.y+140);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(160,175,230,0.3)';c.lineWidth=4;for(let i=1;i<4;i++){const xx=lerp(a.x,b.x,i/4);c.beginPath();c.moveTo(xx,a.y-50);c.quadraticCurveTo(xx-20,a.y+20,xx+10,a.y+120);c.stroke();}c.restore();
  return {head,L};}

function chestBG(c,t){c.save();const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#141526');g.addColorStop(1,'#0a0a14');c.fillStyle=g;c.fillRect(0,0,1080,1920);
  // window behind (top-left), curtains, moonlight
  const wx=90,wy=170,ww=420,wh=560;const wg=c.createLinearGradient(wx,wy,wx,wy+wh);wg.addColorStop(0,'#aebbe6');wg.addColorStop(1,'#5c6894');c.fillStyle=wg;c.fillRect(wx,wy,ww,wh);
  c.fillStyle='#181a2c';c.fillRect(wx+ww/2-7,wy,14,wh);c.fillRect(wx,wy+wh*0.48,ww,14);c.strokeStyle='#22253a';c.lineWidth=22;c.strokeRect(wx,wy,ww,wh);
  c.fillStyle='rgba(255,255,255,0.8)';for(let i=0;i<10;i++){c.beginPath();c.arc(wx+30+hash(i)*360,wy+20+hash(i*3)*240,1.6,0,TAU);c.fill();}
  for(const [cx,dir] of [[wx-30,1],[wx+ww+30,-1]]){c.fillStyle='#1b1c30';c.beginPath();c.moveTo(cx-70*dir,wy-60);c.lineTo(cx+60*dir,wy-60);for(let k=0;k<=6;k++)c.lineTo(cx+(60-k*6)*dir+Math.sin(t*0.6+k)*6,wy-60+k*(wh+180)/6);c.lineTo(cx-70*dir,wy+wh+120);c.closePath();c.fill();}
  const lg=c.createRadialGradient(wx+ww/2,wy+wh/2,40,wx+ww/2,wy+wh/2,700);lg.addColorStop(0,'rgba(150,170,230,0.35)');lg.addColorStop(1,'rgba(150,170,230,0)');c.fillStyle=lg;c.fillRect(0,0,1080,1400);
  // headboard + pillow + mattress
  c.fillStyle='#24192a';c.fillRect(-20,900,90,700);c.fillStyle='#1a1220';c.fillRect(60,900,14,700);
  const pg=c.createLinearGradient(0,1180,0,1380);pg.addColorStop(0,'#a8acc4');pg.addColorStop(1,'#5a5f7c');c.fillStyle=pg;c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(70,1380);c.bezierCurveTo(50,1250,110,1200,280,1215);c.bezierCurveTo(470,1210,560,1240,560,1380);c.closePath();c.fill();c.stroke();
  const mg=c.createLinearGradient(0,1280,0,1920);mg.addColorStop(0,'#3c4160');mg.addColorStop(0.15,'#22263a');mg.addColorStop(1,'#0c0d16');c.fillStyle=mg;c.fillRect(70,1370,1100,700);c.restore();}
function chestScene(c,t,o={}){chestBG(c,t);const press=o.press||0,sh=o.shake||0;c.save();if(sh)c.translate(Math.sin(t*90)*sh*14,Math.cos(t*77)*sh*10);
  // him: lying on his back, head on the pillow (left), seen side-on, face to the ceiling
  const hx=270,hy=1100,s=3.6;const ho=Object.assign({view:'side'},o.ho||{});const oy=headOff('him',ho)*s;
  c.save();c.translate(hx,hy+press*6);c.rotate(-Math.PI/2);CUR=Object.assign({t:T},ho);fig2(c,{kind:'him',x:0,y:-oy,s,t:T,f:1,air:1,...ho});c.restore();
  // duvet up to his collarbone; dents where the hands press
  c.save();const dy=press*16,Y=o.duvY||945,X0=o.duvX||440;const g=c.createLinearGradient(0,Y,0,Y+420);g.addColorStop(0,'#5e6890');g.addColorStop(1,'#262a44');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=6;
  c.beginPath();c.moveTo(X0-20,1500);c.bezierCurveTo(X0-40,Y+200,X0-20,Y+40,X0+30,Y+10);c.bezierCurveTo(X0+130,Y-10+dy*0.6,X0+250,Y+6+dy,X0+380,Y+4+dy);c.bezierCurveTo(X0+480,Y+dy*0.5,X0+520,Y-6,X0+600,Y-40);c.lineTo(1120,Y-60);c.lineTo(1120,1500);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(170,185,240,0.25)';c.lineWidth=5;for(const xx of [X0+90,X0+300,X0+500]){c.beginPath();c.moveTo(xx,Y+40+dy);c.quadraticCurveTo(xx-40,Y+180,xx+20,Y+400);c.stroke();}
  c.fillStyle='rgba(0,0,0,0.35)';for(const xx of [X0+170,X0+350]){c.beginPath();c.ellipse(xx,Y+14+dy,80,18,0,0,TAU);c.fill();}c.restore();c.restore();
  if((o.k??1)>0)chestDemon(c,t,o);NIGHT(c);}
function chestDemon(c,t,o={}){const k=clamp(o.k??1),press=o.press||0;c.save();c.globalAlpha=k;c.lineCap='round';c.lineJoin='round';
  const drop=(1-k)*-220+press*18+Math.sin(t*1.1)*4;const tw=(Math.floor(t*1.3)%4===0&&(t*1.3)%1<0.12)?0.12:0;   // occasional head twitch
  const SKIN='#a9a59e',DARK='#07060a';
  // arms reaching down out of the dark above, hands spread on his chest
  const hY=(o.duvY||945)+6+press*14;
  const arm=(sx,sy,ex,ey,hx,far)=>{const g=c.createLinearGradient(0,sy,0,hY);g.addColorStop(0,'rgba(7,6,10,1)');g.addColorStop(0.7,far?'#141317':'#1d1b21');g.addColorStop(1,far?'#3a383c':'#55524f');
    c.strokeStyle=g;c.lineWidth=far?13:16;c.filter='blur(1.2px)';c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(ex,ey,hx,hY-34);c.stroke();c.strokeStyle='rgba(170,180,220,0.35)';c.lineWidth=1.6;c.beginPath();c.moveTo(sx-8,sy);c.quadraticCurveTo(ex-8,ey,hx-7,hY-34);c.stroke();c.filter='none';
    // elbow knob
    c.fillStyle=far?'#141317':'#1d1b21';c.beginPath();c.arc(ex*0.5+sx*0.25+hx*0.25,ey*0.5+sy*0.25+(hY-34)*0.25,far?10:12,0,TAU);c.fill();
    // hand: thin palm, five long jointed fingers splayed over the duvet, black claws digging in
    const col=far?'#5b5958':'#8f8b85';c.fillStyle=col;c.beginPath();c.ellipse(hx,hY-26,22,14,0,0,TAU);c.fill();
    for(let f=0;f<5;f++){const sp=(f-2)*17,len=f===0?48:(f===2?92:80),bx=hx+sp*0.5,by=hY-24;const k1=[bx+sp*0.7,by+8],k2=[bx+sp*1.15,by+len*0.55],tip=[bx+sp*1.3,by+len*0.9];
      c.strokeStyle=col;c.lineWidth=f===0?8:6.5;c.beginPath();c.moveTo(bx,by);c.lineTo(...k1);c.lineTo(...k2);c.lineTo(...tip);c.stroke();
      c.fillStyle=far?'#6a6865':'#a8a49d';for(const q of [k1,k2]){c.beginPath();c.arc(q[0],q[1],4.6,0,TAU);c.fill();}
      c.strokeStyle='#050407';c.lineWidth=4;c.beginPath();c.moveTo(...tip);c.quadraticCurveTo(tip[0]+sp*0.1,tip[1]+10,tip[0]-2,tip[1]+20);c.stroke();}
    c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(hx,hY+14,70,12,0,0,TAU);c.fill();};
  // the body: a huge dark mass looming over the bed, hunched shoulders lost in shadow
  c.save();c.translate(0,drop*0.7);c.filter='blur(5px)';const mg=c.createLinearGradient(300,800,800,200);mg.addColorStop(0,'rgba(22,20,26,0.97)');mg.addColorStop(1,'rgba(5,4,8,0.98)');c.fillStyle=mg;
  c.beginPath();c.moveTo(330,820);c.bezierCurveTo(380,640,470,470,560,330);c.bezierCurveTo(600,200,640,80,660,-20);c.lineTo(1200,-20);c.lineTo(1200,640);c.bezierCurveTo(1000,700,820,640,700,690);c.bezierCurveTo(560,760,460,840,330,820);c.closePath();c.fill();
  c.filter='blur(1.5px)';c.strokeStyle='rgba(175,188,235,0.45)';c.lineWidth=3;c.beginPath();c.moveTo(345,790);c.bezierCurveTo(390,630,475,470,562,335);c.bezierCurveTo(602,205,640,85,658,-20);c.stroke();
  c.strokeStyle='rgba(175,188,235,0.18)';c.lineWidth=2;for(let i=0;i<5;i++){const y0=400+i*45;c.beginPath();c.moveTo(560-i*25,y0);c.quadraticCurveTo(650-i*20,y0+30,720-i*10,y0+20);c.stroke();}
  c.filter='none';c.restore();
  c.save();c.translate(0,drop*0.5);arm(980,300,900,700,690,1);arm(820,280,760,720,540,0);c.restore();
  // neck rising out of frame into darkness
  c.save();c.translate(0,drop);const g=c.createLinearGradient(330,820,600,300);g.addColorStop(0,'#3a383e');g.addColorStop(1,'rgba(7,6,10,1)');
  // hair: long, black, wet strands falling from the crown down past his head (never across his face)
  const HX=300,HY=790;for(let i=0;i<46;i++){const u=i/45,ang=lerp(2.2,4.2,u),rx=HX+Math.cos(ang)*92,ry=HY+Math.sin(ang)*92,len=220+hash(i*7)*260,sw=Math.sin(t*1.1+i*0.6)*7;
    c.strokeStyle=i%6?DARK:'#1d1b22';c.lineWidth=2+hash(i)*4.5;c.beginPath();c.moveTo(rx,ry);c.bezierCurveTo(rx-30,ry+60,Math.min(rx-50,170)+sw,ry+len*0.5,Math.min(rx-40-hash(i*3)*80,150)+sw,ry+len);c.stroke();}
  // head: long gaunt face, crown pointing up-left, face turned toward us and down at him
  c.translate(HX,HY);c.rotate(-1.05+tw+Math.sin(t*0.5)*0.03);
  // back-of-head hair mass
  c.fillStyle=DARK;c.beginPath();c.ellipse(0,-30,98,120,0,0,TAU);c.fill();
  // face
  const fg=c.createRadialGradient(-10,-20,10,0,0,130);fg.addColorStop(0,'#aaa69d');fg.addColorStop(0.55,'#7e7a74');fg.addColorStop(1,'#2a272b');c.fillStyle=fg;
  c.beginPath();c.moveTo(0,-118);c.bezierCurveTo(70,-118,82,-40,74,10);c.bezierCurveTo(66,70,34,128,0,132);c.bezierCurveTo(-34,128,-66,70,-74,10);c.bezierCurveTo(-82,-40,-70,-118,0,-118);c.fill();
  // hair curtains down both sides of the face
  c.fillStyle=DARK;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*20,-120);c.bezierCurveTo(sd*90,-110,sd*96,0,sd*86,140);c.lineTo(sd*70,150);c.bezierCurveTo(sd*72,40,sd*66,-60,sd*30,-104);c.closePath();c.fill();}
  // sunken cheeks + brow ridge shadows
  c.fillStyle='rgba(30,26,30,0.45)';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*44,40,14,34,sd*0.2,0,TAU);c.fill();}
  c.strokeStyle='rgba(40,34,38,0.5)';c.lineWidth=1.6;for(const [x1,y1,x2,y2] of [[-30,-92,-14,-70],[24,-98,10,-74],[-8,-104,4,-86]]){c.beginPath();c.moveTo(x1,y1);c.lineTo((x1+x2)/2+3,(y1+y2)/2);c.lineTo(x2,y2);c.stroke();}
  // hollow eye sockets with tiny burning pupils
  const e=o.eyes??1;for(const sd of [-1,1]){c.fillStyle='#000';c.beginPath();c.ellipse(sd*30,-28,24,30,sd*-0.25,0,TAU);c.fill();
    c.strokeStyle='rgba(20,15,18,0.6)';c.lineWidth=6;c.beginPath();c.ellipse(sd*30,-22,28,36,sd*-0.25,0.2,Math.PI-0.2);c.stroke();
    if(e>0){const px=sd*26,py=-22;const rr=c.createRadialGradient(px,py,0,px,py,16);rr.addColorStop(0,`rgba(255,70,60,${0.45*e})`);rr.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=rr;c.beginPath();c.arc(px,py,16,0,TAU);c.fill();c.fillStyle=`rgba(255,255,255,${e})`;c.beginPath();c.arc(px,py,3.6,0,TAU);c.fill();}}
  // no nose, just two slits
  c.fillStyle='#1a1418';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*6,22,2.5,7,sd*0.3,0,TAU);c.fill();}
  // ear-to-ear grin full of needle teeth
  const gw=58+(o.grin??1)*8;c.fillStyle='#0a0507';c.beginPath();c.moveTo(-gw,50);c.quadraticCurveTo(0,108,gw,50);c.quadraticCurveTo(0,80,-gw,50);c.fill();
  c.strokeStyle='rgba(30,22,26,0.7)';c.lineWidth=1.8;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*gw,50);c.quadraticCurveTo(sd*(gw+10),40,sd*(gw+14),24);c.stroke();}
  c.strokeStyle='#d9d2c0';c.lineWidth=2;for(let i=0;i<=16;i++){const u=i/16,x=lerp(-gw+8,gw-8,u),yt=50+Math.sin(u*Math.PI)*28*0.62+2,yb=50+Math.sin(u*Math.PI)*58*0.95-2;c.beginPath();c.moveTo(x,yt);c.lineTo(x+1,yt+9+hash(i)*5);c.stroke();c.beginPath();c.moveTo(x,yb);c.lineTo(x-1,yb-8-hash(i*3)*5);c.stroke();}
  c.restore();
  // cold rim light from the window + darkness eating the edges
  c.restore();}
