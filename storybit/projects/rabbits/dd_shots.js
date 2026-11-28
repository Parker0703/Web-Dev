// ===== shots =====
SH={};
const ZT=()=>A(14)+0.05; // stranger's zero
function heroSec(t){const K=[[0,63*YR],[A(34)-0.01,63*YR],[A(34),720],[A(34)+0.9,719],[A(40),660],[A(40)+0.6,659],[A(41),600],[A(49),420],[WT(54,6),395]];if(t>=WT(54,6))return rollSec(395,63*YR+2*86400,(t-WT(54,6))/1.2)+(t-WT(54,6));for(let i=1;i<K.length;i++)if(t<K[i][0]){const [a,va]=K[i-1],[b,vb]=K[i];return lerp(va,vb,clamp((t-a)/(b-a)));}return 420;}
function momSec(t){return t<A(58)?42*YR+3*MO+9*DY+5*3600-t:720-(t-A(59))*0.9;}
const crowdKinds=['x1','x2','x3','x4','man2','woman4','friend','stranger'];
// ---------- 0 · HOOK: a crosswalk full of people; countdowns blink on over every head ----------
SH.hook=function(c,t){const z=lerp(1.0,1.12,inv(0,WT(0,10),t));const cam=scam(lerp(-60,60,inv(0,WT(0,10),t)),z,1150);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  cityStreet(c,t,cam,{mood:'day',cw:0,light:0,world:c2=>{
    // three depth lanes on the crossing; far lane smaller; people spaced out within a lane; drawn far -> near
    const lanes=[[GY+70,1.05,1],[GY+200,1.2,-1],[GY+340,1.38,1]];const P=[];
    lanes.forEach(([y,s,d],li)=>{for(let k=0;k<3;k++){const i=li*3+k;const sp=(li===1?1.15:1)*48;const x=((k*620+li*210+t*sp*d+3600)%1860)-930;P.push([x,y,s,d,i]);}});
    P.sort((a,b)=>a[1]-b[1]);
    for(const [x,y,s,d,i] of P)fig2(c2,{x,y,s,f:d,t,kind:crowdKinds[i%8],view:'side',walk:1,ph:t*4.6+i*1.3,eyes:'open',mouth:'flat',castLen:0.5});
    for(const [x,y,s,d,i] of P){const yrs=[42,11,67,0.00002,23,5,51,0.3,74][i];deathTimer(c2,x,HEAD(y,s)-30*s,yrs*YR-t,{s:0.5*s,age:t-(WT(0,4)+i*0.12),t});}}});
  vignette(c,0.45);};
// ---------- 1 · over the shoulder: one stranger, one countdown ----------
SH.look=function(c,t){const q=inv(WT(0,10),B(2),t),z=lerp(1.0,1.18,eio(q))+(t>WT(2,3)?eio(inv(WT(2,3),B(2),t))*0.35:0);L2={dx:-1,rim:'#ffe0b0',amb:'#5a6070'};
  c.save();c.translate(560,900);c.scale(z,z);c.translate(-560,-900);
  dof(c,3,d=>{cityStreet(d,t,scam(200,2.2,1500),{mood:'day',cw:-900});});
  // bus-stop shelter edge
  c.fillStyle='rgba(200,220,235,0.35)';c.fillRect(760,420,320,1300);c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(760,420,320,1300);c.fillStyle='#2a2e34';c.fillRect(740,400,360,40);
  fig2(c,{x:600,y:2400,s:4.0,f:-1,t,kind:'x2',view:'front',eyes:t>WT(2,6)?'half':'open',brow:'flat',mouth:'flat',look:[-1,0],castLen:0});
  const ty=HEAD(2400,4.0)-110;deathTimer(c,600,ty,47*YR+5*MO+12*DY+9*3600+33*60-t*1,{s:1.5,age:t-WT(1,1),t});
  chip(c,WT(1,6),t,'AGE: 34',300,ty+360,'#9fd8ff',{end:B(2)});strike(c,WT(1,8),t,190,ty+360,410,ty+360);
  chip(c,WT(2,0),t,'BORN MAY 9',830,ty+520,'#9fd8ff',{end:B(2)});strike(c,WT(2,2),t,690,ty+520,970,ty+520);
  c.restore();
  dof(c,4,d=>{HERO({c:d,x:150,y:2900,s:5.5,f:1,t,back:1});});vignette(c,0.45);};
// ---------- 2 · 60 seconds… "you'd wish you were blind" ----------
SH.blind=function(c,t){const q=inv(A(3),B(3),t),cover=eio(inv(WT(3,11),WT(3,14),t));L2={dx:1,rim:'#ff7a50',amb:'#2a2a48'};
  dof(c,5,d=>{cityStreet(d,t,scam(0,1.6,1400),{mood:'night',cw:9000});for(let i=0;i<14;i++){const x=hash(i)*W,y=300+hash(i*3)*1200;deathTimer(d,x,y,(hash(i*5)*60+0.01)*YR*(i%3?1:0.0000004),{s:0.6+hash(i)*0.4,t});}});
  c.fillStyle='rgba(10,10,30,0.25)';c.fillRect(0,0,W,H);const z=lerp(1,1.12,q);c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);
  HERO({c,x:540,y:2650,s:5.6,f:1,t,view:'front',eyes:cover>0.5?'closed':(t>WT(3,8)?'wide':'open'),brow:t>WT(3,8)?'worried':'flat',mouth:cover>0.5?'frown':'flat',hf:cover>0?[lerp(14,-6,cover),lerp(92,-62,cover)]:undefined,hb:cover>0?[lerp(-10,6,cover),lerp(94,-62,cover)]:undefined});c.restore();
  vignette(c,0.6);};
// ---------- 3 · on the couch with Mom ----------
SH.couch=function(c,t){const turn=t>A(6);const z=t<WT(6,3)?lerp(1,1.06,inv(A(4),A(6),t)):lerp(1.06,1.75,eio(inv(WT(6,3),B(6),t)));L2={dx:-1,rim:'#ffd8a0',amb:'#4a4058'};
  c.save();c.translate(330,800);c.scale(z,z);c.translate(-330,-800);livingRoom(c,t);couch(c,540,1720,920,'back');
  fig2(c,{x:330,y:1720,s:2.25,f:1,t,kind:'mom',view:'front',eyes:'happy',brow:'flat',mouth:'smile',hf:[16,60],hb:[-16,60]});
  HERO({c,x:740,y:1720,s:2.25,f:-1,t,view:turn?undefined:'front',eyes:turn?'wide':'half',brow:turn?'up':'flat',mouth:turn?'o':'flat',propF:turn?null:pPhone(1)});
  couch(c,540,1720,920,'front');
  // TV glow on them
  c.save();c.globalCompositeOperation='lighter';c.fillStyle=`rgba(90,140,255,${0.08+Math.sin(t*9)*0.03})`;c.fillRect(0,600,W,1300);c.restore();
  deathTimer(c,330,HEAD(1720,2.25)-30,momSec(t),{s:0.95,age:t-WT(6,0)-0.15,t});
  c.restore();vignette(c,0.45);};
// ---------- 4 · best friend at the café ----------
SH.friend=function(c,t){const q=inv(A(7),B(8),t);L2={dx:-1,rim:'#ffe0b0',amb:'#5a5060'};
  dof(c,2.5,d=>{cityStreet(d,t,scam(-600+q*40,2.0,1820),{mood:'day',cw:9000});});
  c.save();const z=lerp(1.0,1.1,eio(q));c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);
  fig2(c,{x:540,y:2250,s:3.6,f:1,t,kind:'friend',view:'front',eyes:'happy',brow:'up',mouth:'smile',tilt:Math.sin(t*9)*0.05,hf:[30,10]});
  // café table + cup
  c.fillStyle='#e8e4dc';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.ellipse(540,1680,420,70,0,0,TAU);c.fill();c.stroke();c.fillStyle='#3a3a3a';c.fillRect(520,1690,40,400);
  c.fillStyle='#f4f0e8';c.fillRect(640,1560,90,100);c.strokeRect(640,1560,90,100);c.fillStyle='#6a4024';c.beginPath();c.ellipse(685,1562,44,10,0,0,TAU);c.fill();c.beginPath();c.arc(740,1600,22,-1.2,1.2);c.lineWidth=8;c.stroke();
  for(let i=0;i<3;i++){c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=5;c.beginPath();c.moveTo(670+i*14,1540);c.quadraticCurveTo(660+i*14+Math.sin(t*3+i)*12,1500,675+i*14,1460);c.stroke();}
  deathTimer(c,540,HEAD(2250,3.6)-60,11*YR+2*MO+4*DY+8*3600-t,{s:1.25,age:t-A(8),t});c.restore();vignette(c,0.4);};
// ---------- 5 · the stranger on the crosswalk: 18 seconds ----------
function strangerSec(t){return t<A(10)?18:18*clamp((ZT()-t)/(ZT()-A(10)));}
SH.stranger=function(c,t){const q=inv(A(9),A(11),t);const cam=scam(lerp(-100,60,q),lerp(1.05,1.25,eio(q)),1000);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  cityStreet(c,t,cam,{mood:'day',cw:0,light:2,world:c2=>{const sx=lerp(-220,-40,q);
    fig2(c2,{x:sx,y:GY+230,s:1.5,f:1,t,kind:'stranger',view:'side',walk:1,ph:t*5,eyes:'half',mouth:'flat',propF:pPhone(1),hf:[24,30],castLen:0.5});
    deathTimer(c2,sx,HEAD(GY+230,1.5)-40,strangerSec(t),{s:0.75,age:t-A(10),t});
    fig2(c2,{x:260,y:GY+640,s:2.1,f:-1,t,kind:'hero',view:'side',eyes:t>A(10)?'wide':'open',brow:t>A(10)?'up':'flat',mouth:t>A(10)?'o':'flat',castLen:0.4});}});
  vignette(c,0.4);};
// ---------- 6 · you can't process it… the truck rounds the corner ----------
SH.process=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#4a5060'};const q=inv(A(11),WT(11,8),t);
  dof(c,4,d=>{cityStreet(d,t,scam(0,1.4,1300),{mood:'day',cw:0});});const z=lerp(1.0,1.22,eio(q));c.save();c.translate(540,1150);c.scale(z,z);c.translate(-540,-1150);
  HERO({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:'wide',brow:'up',mouth:'o',sweat:1,look:[-1.5,0]});c.restore();
  deathTimer(c,300,520,strangerSec(t),{s:1.0,age:9,t,alpha:0.85});vignette(c,0.5);};
SH.corner=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#4a5060'};const q=inv(WT(11,8),B(12),t);
  sky2(c,'day');// low angle at the corner: buildings, road vanishing, truck turning in
  c.fillStyle='#8a8e96';c.beginPath();c.moveTo(0,0);c.lineTo(330,0);c.lineTo(420,1150);c.lineTo(0,1500);c.fill();c.fillStyle='#a87a5a';c.beginPath();c.moveTo(W,0);c.lineTo(760,0);c.lineTo(680,1150);c.lineTo(W,1500);c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();
  for(let r=0;r<8;r++){c.fillStyle='#2a3442';c.beginPath();c.moveTo(60,80+r*140);c.lineTo(250,90+r*138);c.lineTo(255,180+r*136);c.lineTo(60,200+r*140);c.fill();c.beginPath();c.moveTo(1020,80+r*140);c.lineTo(820,90+r*138);c.lineTo(815,180+r*136);c.lineTo(1020,200+r*140);c.fill();}
  const rg=c.createLinearGradient(0,1150,0,H);rg.addColorStop(0,'#5a5e66');rg.addColorStop(1,'#2a2c30');c.fillStyle=rg;c.beginPath();c.moveTo(420,1150);c.lineTo(680,1150);c.lineTo(W+400,H);c.lineTo(-400,H);c.fill();
  c.fillStyle='#e8d070';for(let i=0;i<6;i++){const p=i/6,y=lerp(1160,H,p*p),w=lerp(4,40,p*p);c.fillRect(540-w/2,y,w,lerp(20,160,p*p));}
  const s=lerp(60,330,Math.pow(eio(q),1.6));truckFront(c,540+lerp(-160,0,eio(q)),lerp(1170,1700,Math.pow(eio(q),1.6)),s,{});
  FX.speed=0.6;FX.speedDir=0;vignette(c,0.5);};
// ---------- 7 · you scream · he turns ----------
SH.scream=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#4a5060'};
  if(t<WT(13,2)){dof(c,4,d=>{cityStreet(d,t,scam(300,1.5,1300),{mood:'day',cw:0});});const k=inv(A(13),A(13)+0.25,t);
    HERO({c,x:540,y:2650,s:5.6,f:1,t:t,view:'front',eyes:'wide',brow:'angry',mouth:'scream',hf:[lerp(14,95,k),lerp(92,-55,k)],lean:0.05});
    ring(c,540,1100,200+inv(A(13),WT(13,2),t)*700,0.4,'rgba(255,255,255,',10);}
  else{const k=eio(inv(WT(13,2),WT(13,2)+0.4,t)),glare=inv(WT(13,2),B(13)+0.3,t);dof(c,3,d=>{cityStreet(d,t,scam(0,1.6,1250),{mood:'day',cw:0});});
    fig2(c,{x:540,y:2500,s:4.6,f:-1,t,kind:'stranger',view:k>0.5?'front':'side',eyes:'wide',brow:'up',mouth:'o',propF:pPhone(1),hf:[24,30]});
    deathTimer(c,540,HEAD(2500,4.6)-70,strangerSec(t),{s:1.4,age:9,t});
    c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(-80,1000,0,-80,1000,900+glare*900);g.addColorStop(0,`rgba(255,250,220,${0.4+glare*0.6})`);g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
  vignette(c,0.45);};
// ---------- 8 · ZERO ----------
SH.zero=function(c,t){const p=t-A(14);c.fillStyle='#000';c.fillRect(0,0,W,H);if(p<0.5){c.save();c.globalAlpha=1-p*1.4;c.fillStyle='#fff8e0';c.fillRect(0,0,W,H);c.restore();}
  const sc=lerp(3.2,2.6,eo(clamp(p/0.6)));deathTimer(c,540,960,0,{s:sc,age:9,t,zeroAge:p,col:'#ff3b30'});
  for(let i=0;i<5;i++){const yy=hash(Math.floor(t*30)+i)*H;c.fillStyle='rgba(255,40,30,0.25)';c.fillRect(0,yy,W,6+hash(i)*20);}
  if(p>0.45){c.fillStyle=`rgba(0,0,0,${clamp((p-0.45)/0.25)})`;c.fillRect(0,0,W,H);}};
// ---------- 9 · aftermath (no gore): stopped truck, dropped phone, a frozen crowd ----------
SH.after=function(c,t){const q=inv(A(15),A(16),t);L2={dx:-1,rim:'#d0d8e0',amb:'#3a3e48'};const cam=scam(lerp(80,0,q),lerp(1.2,1.1,q),1000);
  cityStreet(c,t,cam,{mood:'grey',cw:0,world:c2=>{c2.strokeStyle='rgba(10,10,10,0.6)';c2.lineWidth=14;for(const yy of [GY+330,GY+400]){c2.beginPath();c2.moveTo(-900,yy);c2.lineTo(-200,yy+6);c2.stroke();}
    truck(c2,200,GY+400,165,{roll:0});
    for(let i=0;i<5;i++)fig2(c2,{x:-900+i*120,y:GY-30,s:1.0,f:1,t,kind:crowdKinds[i],view:'front',eyes:'wide',brow:'worried',mouth:'o'});
    c2.save();c2.translate(-420,GY+300);c2.rotate(0.4);c2.fillStyle='#1a1c22';c2.strokeStyle=K2;c2.lineWidth=4;rr(c2,-30,-55,60,110,10);c2.fill();c2.stroke();c2.strokeStyle='rgba(255,255,255,0.7)';c2.lineWidth=2;c2.beginPath();c2.moveTo(-20,-40);c2.lineTo(5,-5);c2.lineTo(-10,20);c2.moveTo(5,-5);c2.lineTo(22,10);c2.stroke();c2.restore();
    fig2(c2,{x:-80,y:GY+780,s:2.6,f:1,t,kind:'hero',back:1});}});
  c.fillStyle='rgba(30,40,60,0.25)';c.fillRect(0,0,W,H);vignette(c,0.55);};
// ---------- 10 · days of terror ----------
SH.days=function(c,t){const q=inv(A(16),B(16),t),up=t>WT(16,9);L2={dx:1,rim:'#6a8aff',amb:'#1a1a30'};const z=lerp(1,1.15,eio(q));
  c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);bedroom2(c,t,{clock:['2:14','3:52','4:07'][Math.min(2,Math.floor(q*3))]});
  // wall calendar flipping
  c.fillStyle='#f4f0e8';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(170,420,230,260);c.strokeRect(170,420,230,260);c.fillStyle='#c83a32';c.fillRect(170,420,230,60);txt(c,'DAY',285,452,34,'#fff',{stroke:false,ls:6});txt(c,String(1+Math.min(3,Math.floor(q*4))),285,590,120,'#1a1a1a',{stroke:false});
  fig2(c,{x:540,y:1700,s:2.6,f:1,t,kind:'hero',view:'front',crouch:70,eyes:up?'open':'half',brow:'worried',mouth:'frown',look:up?[2,-1]:[0,1],hf:[22,10],hb:[-22,10],sweat:1});
  c.fillStyle='#3a5a8a';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.moveTo(300,1560);c.quadraticCurveTo(540,1480,780,1560);c.lineTo(820,1760);c.lineTo(260,1760);c.closePath();c.fill();c.stroke();
  c.restore();c.fillStyle='rgba(20,30,70,0.25)';c.fillRect(0,0,W,H);vignette(c,0.6);};
// ---------- 11 · the notebook: always right ----------
SH.notes=function(c,t){const q=inv(A(17),B(17),t);c.fillStyle='#2a1e16';c.fillRect(0,0,W,H);c.fillStyle='#4a3424';for(let i=0;i<12;i++)c.fillRect(0,i*170,W,6);
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(700,500,0,700,500,1200);g.addColorStop(0,'rgba(255,210,140,0.35)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  c.save();c.translate(540,1000);c.rotate(-0.06);c.scale(lerp(1,1.1,q),lerp(1,1.1,q));c.fillStyle='#f4efe2';c.strokeStyle=K2;c.lineWidth=7;c.fillRect(-420,-560,840,1120);c.strokeRect(-420,-560,840,1120);c.strokeStyle='rgba(80,120,200,0.35)';c.lineWidth=3;for(let i=0;i<14;i++){c.beginPath();c.moveTo(-400,-440+i*72);c.lineTo(400,-440+i*72);c.stroke();}c.strokeStyle='rgba(220,60,60,0.5)';c.beginPath();c.moveTo(-300,-560);c.lineTo(-300,560);c.stroke();
  const rows=[['MAN, BLUE CAP','3:42 PM'],['CYCLIST','9:15 AM'],['OLD LADY, 4B','6:02 PM'],['TAXI DRIVER','11:48 PM'],['NEIGHBOUR','7:30 AM']];
  rows.forEach(([a,b],i)=>{const t0=A(17)-0.6+i*0.35;if(t<t0)return;c.save();c.globalAlpha=clamp((t-t0)/0.2);txt(c,a,-280,-410+i*144,40,'#1a2a5a',{al:'left',stroke:false,w:700});txt(c,b,250,-410+i*144,40,'#1a2a5a',{stroke:false,w:700});c.restore();
    const ck=clamp((t-t0-0.2)/0.2);if(ck>0){c.strokeStyle='#d0201f';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(340,-420+i*144);c.lineTo(340+18*ck,-400+i*144);if(ck>0.5)c.lineTo(340+18+40*(ck-0.5)*2,-450+i*144-10*(ck-0.5));c.stroke();}});
  c.restore();
  // both hands: one holds the page, one writes
  const pi=Math.min(4,Math.floor((t-A(17)+0.6)/0.35));const px=300+Math.sin(t*16)*20,py=560+pi*140;
  bigHand(c,170,1250,1.3,0.3,{thumb:1});
  c.save();c.translate(px,py);c.rotate(-0.5);c.fillStyle='#2a3a6a';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-14,-10,28,320);c.strokeRect(-14,-10,28,320);c.fillStyle='#e8d070';c.beginPath();c.moveTo(-14,-10);c.lineTo(0,-50);c.lineTo(14,-10);c.fill();c.stroke();c.restore();bigHand(c,px+120,py+200,1.2,-0.5);
  vignette(c,0.55);};
// ---------- 12 · so you start using them ----------
SH.using=function(c,t){const q=inv(A(18),A(19),t);const hx=lerp(-300,200,q);const cam=scam(hx+120,1.35,1050);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  cityStreet(c,t,cam,{mood:'day',cw:9000,world:c2=>{for(let i=0;i<4;i++){const x=-500+i*360;fig2(c2,{x,y:GY-20,s:1.3,f:i%2?1:-1,t,kind:crowdKinds[i+2],view:'side',walk:1,ph:t*4+i,eyes:'open',mouth:'flat'});deathTimer(c2,x,HEAD(GY-20,1.3)-30,[33,8,61,19][i]*YR-t,{s:0.5,age:9,t});}
    HERO({c:c2,x:hx,y:GY+600,s:2.2,f:1,t,view:'side',walk:1,ph:t*5.5,eyes:'open',brow:'angry',mouth:'flat',castLen:0.6});}});vignette(c,0.4);};
// ---------- 13 · the burning building ----------
const FIRE_T=()=>WT(19,1)+0.9;
SH.fire=function(c,t){const q=inv(A(19),B(19),t);const cam=scam(lerp(-420,-340,q),0.95,1380);L2={dx:1,rim:'#ff9a50',amb:'#4a2a20'};
  burningBuilding(c,t,cam,{world:c2=>{const g=t>FIRE_T();const wx=g?lerp(-260,-420,eo(inv(FIRE_T(),FIRE_T()+0.5,t))):lerp(-1000,-260,inv(A(19),FIRE_T(),t));
    fig2(c2,{x:wx,y:GY+320,s:2.4,f:1,t,kind:'woman4',view:'side',run:g?0:1,ph:t*9,eyes:g?'wide':'open',brow:'worried',mouth:'o',tear:1,lean:g?-0.25:0.1,hf:g?[-60,10]:undefined});
    deathTimer(c2,wx,HEAD(GY+320,2.4)-50,6-clamp((t-A(19))/(FIRE_T()-A(19)))*1.4,{s:1.1,age:t-A(19)-0.2,t});
    const hx=g?wx-140:lerp(900,-120,inv(A(19)+0.3,FIRE_T(),t));HERO({c:c2,x:hx,y:GY+330,s:2.4,f:-1,t,view:'side',run:g?0:1,ph:t*10,eyes:'open',brow:'angry',mouth:g?'shout':'flat',hf:g?[70,-10]:undefined,lean:g?0.2:0});}});
  vignette(c,0.5);};
SH.fire2=function(c,t){const q=inv(A(20),B(20),t),boom=t-WT(20,2);L2={dx:1,rim:'#ff9a50',amb:'#3a2420'};
  dof(c,3,d=>{burningBuilding(d,t,scam(0,1.1,1500),{});if(boom>0&&boom<1.5){d.save();d.globalCompositeOperation='lighter';const g=d.createRadialGradient(540,1300,0,540,1300,1200*eo(clamp(boom)));g.addColorStop(0,`rgba(255,220,120,${0.9*(1-boom/1.5)})`);g.addColorStop(1,'rgba(255,90,20,0)');d.fillStyle=g;d.fillRect(0,0,W,H);d.restore();}});
  const z=lerp(1,1.12,eio(q));c.save();c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);const saved=t>WT(20,6);
  fig2(c,{x:640,y:2500,s:4.4,f:-1,t,kind:'woman4',view:undefined,eyes:saved?'closed':'wide',brow:'worried',mouth:saved?'frown':'o',tear:1});
  HERO({c,x:250,y:2560,s:4.4,f:1,t,view:undefined,eyes:'open',brow:'worried',mouth:'flat',hf:[70,-10]});
  const sec=t<WT(20,3)?6-(t-A(20))*0.4:rollSec(5.5,54*YR+4*MO,(t-WT(20,3))/(WT(20,8)-WT(20,3)));deathTimer(c,640,HEAD(2500,4.4)-60,sec,{s:1.35,age:9,t});c.restore();
  for(let i=0;i<18;i++){const p=(t*0.7+hash(i))%1;c.fillStyle=`rgba(255,${160+hash(i)*80|0},60,${1-p})`;c.beginPath();c.arc(hash(i*3)*W,H-p*H,3+hash(i)*5,0,TAU);c.fill();}vignette(c,0.5);};
// ---------- 14 · construction site: the beam ----------
const SNAP=()=>A(21)+0.35,LAND=()=>WT(21,8)+0.2;
SH.beam=function(c,t){const q=inv(A(21),B(21),t);const cam=scam(lerp(60,140,q),1.12,1500);L2={dx:-1,rim:'#e0e8f0',amb:'#4a5060'};
  constructionSite(c,t,cam,{world:c2=>{const kx=-120;const fall=t>SNAP()?clamp((t-SNAP())/(LAND()-SNAP())):0;const by=lerp(GY-1500,GY-100,fall*fall),rot=t>SNAP()?0.12*fall:Math.sin(t*1.5)*0.03;
    c2.strokeStyle='#2a2a2a';c2.lineWidth=5;c2.beginPath();c2.moveTo(kx,GY-1800);c2.lineTo(kx,t>SNAP()?GY-1500-fall*200:by-40);c2.stroke();if(t>SNAP()&&t<SNAP()+0.5){ring(c2,kx,GY-1520,40+(t-SNAP())*300,0.6,'rgba(255,255,255,',6);}
    const pulled=t>WT(21,5);const dive=eo(inv(WT(21,4),WT(21,6),t));
    fig2(c2,{x:pulled?lerp(kx,kx+520,dive):kx,y:GY+60-(pulled?Math.sin(dive*Math.PI)*120:0),s:1.15,f:-1,t,kind:'kid',view:t>SNAP()?'front':'side',eyes:t>SNAP()?'wide':'happy',brow:t>SNAP()?'up':'flat',mouth:t>SNAP()?'o':'smile',look:[0,-2]});
    if(!pulled){c2.fillStyle='#e84a3a';c2.strokeStyle=K2;c2.lineWidth=4;c2.beginPath();c2.arc(kx-80,GY+40,26,0,TAU);c2.fill();c2.stroke();}
    deathTimer(c2,pulled?lerp(kx,kx+520,dive):kx,HEAD(GY+60,1.15)-40,3-clamp((t-A(21))/(LAND()-A(21)))*2.2,{s:0.75,age:t-A(21)-0.1,t});
    const hx=lerp(900,kx+60,inv(A(21)+0.2,WT(21,4),t));HERO({c:c2,x:pulled?lerp(kx+60,kx+600,dive):hx,y:GY+80-(pulled?Math.sin(dive*Math.PI)*140:0),s:2.0,f:-1,t,view:'side',run:pulled?0:1,ph:t*10,eyes:'open',brow:'angry',mouth:'shout',lean:pulled?-0.6*dive:0.2});
    if(t<LAND()+0.05)ibeam(c2,kx,by,900,rot);else{ibeam(c2,kx,GY-30,900,0.04);dustBurst2(c2,kx,GY,t-LAND());}}});
  vignette(c,0.45);};
SH.beam2=function(c,t){L2={dx:-1,rim:'#e0e8f0',amb:'#4a5060'};dof(c,3,d=>{constructionSite(d,t,scam(-100,1.2,1500),{world:c2=>{ibeam(c2,-200,GY-30,900,0.04);}});});
  c.fillStyle='rgba(200,190,170,0.25)';c.fillRect(0,0,W,H);const p=t-A(22);
  HERO({c,x:380,y:2300,s:3.8,f:1,t,view:undefined,crouch:60,eyes:'open',brow:'worried',mouth:'o',hf:[60,20],hb:[50,30],sweat:1});
  fig2(c,{x:680,y:2220,s:2.5,f:-1,t,kind:'kid',view:'front',eyes:'open',brow:'worried',mouth:'frown',tear:1});
  deathTimer(c,680,HEAD(2220,2.5)-60,rollSec(1.2,79*YR+6*MO,(t-WT(22,3))/(WT(22,8)-WT(22,3))),{s:1.2,age:9,t});
  for(let i=0;i<10;i++){c.fillStyle=`rgba(190,180,160,${0.35*(1-((p*0.3+hash(i))%1))})`;c.beginPath();c.arc(hash(i)*W,1600-((p*60+hash(i*2)*800)%900),80+hash(i)*80,0,TAU);c.fill();}vignette(c,0.45);};
// ---------- 15 · the man nearby: 30 years → 6 seconds ----------
const MAN_ZERO=()=>WT(26,1)+0.25;
SH.man=function(c,t){const rack=eio(inv(A(24)-0.3,A(24)+0.4,t)),drop=t>WT(25,3);L2={dx:-1,rim:'#e0e8f0',amb:'#4a5060'};
  const bgBlur=lerp(0,4,1-rack),fgBlur=lerp(0,5,rack);
  dof(c,bgBlur,d=>{constructionSite(d,t,scam(200,1.0,1550),{world:c2=>{ibeam(c2,-600,GY-30,900,0.04);
    fig2(c2,{x:300,y:GY+40,s:1.7,f:-1,t,kind:'man2',view:t>WT(25,3)?'front':undefined,eyes:drop?'wide':'open',brow:drop?'up':'flat',mouth:drop?'o':'flat',hf:drop?[20,-20]:undefined,sweat:drop?1:0});
    const sec=t<A(25)?30*YR+3*MO-t:(t<WT(25,3)?rollSec(30*YR,6,(t-A(25))/0.5):Math.max(0,6-(t-WT(25,3))*(6/(MAN_ZERO()-WT(25,3)))));deathTimer(c2,300,HEAD(GY+40,1.7)-50,sec,{s:0.95,age:t-A(24)+0.2,t});}});});
  dof(c,fgBlur,d=>{fig2(d,{x:250,y:2350,s:4.2,f:1,t,kind:'hero',view:undefined,crouch:60,eyes:'happy',brow:'flat',mouth:'smile',hf:[60,20]});fig2(d,{x:520,y:2300,s:2.6,f:-1,t,kind:'kid',view:undefined,eyes:'happy',mouth:'smile'});});
  if(t>WT(25,3)&&t<WT(25,3)+0.3){c.fillStyle='rgba(255,30,20,0.2)';c.fillRect(0,0,W,H);}vignette(c,0.5);};
SH.collapse=function(c,t){const q=inv(A(26),B(26),t);L2={dx:-1,rim:'#e0e8f0',amb:'#4a5060'};const slow=t-A(26);
  constructionSite(c,t,scam(250,1.05,1500),{world:c2=>{const fall=eo(inv(MAN_ZERO(),MAN_ZERO()+0.7,t));
    c2.save();c2.translate(150,GY+60);c2.rotate(fall*Math.PI/2*0.95);fig2(c2,{x:0,y:0,s:1.9,f:-1,t,kind:'man2',view:'side',eyes:fall>0.3?'closed':'wide',brow:'worried',mouth:'o',hf:[10,-30]});c2.restore();
    deathTimer(c2,150,HEAD(GY+60,1.9)-40,Math.max(0,MAN_ZERO()-t)*2,{s:1.0,age:9,t,zeroAge:t-MAN_ZERO(),alpha:1-clamp((t-MAN_ZERO()-0.6)/0.4)});
    HERO({c:c2,x:lerp(-750,-150,eo(q)),y:GY+80,s:2.0,f:1,t,view:'side',run:1,ph:slow*6,eyes:'wide',brow:'worried',mouth:'shout',hf:[80,-20],lean:0.2});}});
  c.fillStyle='rgba(40,50,70,0.2)';c.fillRect(0,0,W,H);vignette(c,0.55);};
// ---------- 16 · the evidence board: the pattern ----------
SH.board=function(c,t){const q=inv(A(27),B(28),t);const z=lerp(1,1.25,eio(q));c.save();c.translate(540,900);c.scale(z,z);c.translate(-540,-900);corkBoard(c,t);
  const face=(k,eyes,mouth)=>d=>{fig2(d,{x:0,y:20,s:1.55,f:1,t,kind:k,view:'front',headOnly:1,eyes,mouth});};
  const P=[[260,620,-0.06,face('woman4','happy','smile'),'SAVED','#2a8a4a'],[800,600,0.05,face('x4','closed','flat'),'DIED','#d0201f'],[260,1180,0.04,face('kid','happy','smile'),'SAVED','#2a8a4a'],[800,1160,-0.05,face('man2','closed','flat'),'DIED','#d0201f'],[540,900,0.02,face('stranger','closed','flat'),'#1 · 18 SEC','#1a1a1a']];
  const str=(a,b,t0)=>{const p=clamp((t-t0)/0.5);if(p<=0)return;c.strokeStyle='#d0201f';c.lineWidth=7;c.beginPath();c.moveTo(a[0],a[1]-100);c.quadraticCurveTo((a[0]+b[0])/2,(a[1]+b[1])/2-40,lerp(a[0],b[0],p),lerp(a[1]-100,b[1]-100,p));c.stroke();};
  P.forEach(p=>polaroid(c,p[0],p[1],p[2],p[3],p[4],p[5]));str(P[0],P[1],A(27)+0.4);str(P[2],P[3],A(27)+0.9);
  // the timer jumping along the string
  if(t>A(28)){for(const [a,b,o] of [[P[0],P[1],0],[P[2],P[3],0.5]]){const p=clamp((t-A(28)-o)/1.6);const x=lerp(a[0],b[0],eio(p)),y=lerp(a[1]-190,b[1]-190,eio(p))-Math.sin(p*Math.PI)*120;deathTimer(c,x,y,p<0.5?50*YR:6,{s:0.55,age:9,t,col:p<0.5?'#7ee8a8':'#ff3b30'});}}
  c.restore();fig2(c,{x:960,y:2700,s:4.2,f:-1,t,kind:'hero',back:1});vignette(c,0.6);};
// ---------- 17 · you've been choosing who dies ----------
SH.choose=function(c,t){const q=inv(A(29),B(30),t),reap=eio(inv(WT(30,2),WT(30,5),t));L2={dx:0,rim:'#ff3b30',amb:'#1a0a10'};
  c.fillStyle='#120c10';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,1900,0,540,1900,1500);g.addColorStop(0,'rgba(200,30,30,0.5)');g.addColorStop(1,'rgba(40,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  // the shadow on the wall becomes a reaper
  c.save();c.globalAlpha=0.55;c.fillStyle='#000';c.translate(540,900);c.scale(1.6,1.6);c.beginPath();c.arc(0,-260,120,0,TAU);c.fill();c.fillRect(-150,-150,300,700);if(reap>0){c.globalAlpha=0.6*reap;c.beginPath();c.moveTo(-170,-200);c.quadraticCurveTo(0,-480,170,-200);c.lineTo(200,560);c.lineTo(-200,560);c.closePath();c.fill();c.lineWidth=16;c.strokeStyle='#000';c.beginPath();c.moveTo(260,-420);c.lineTo(260,560);c.stroke();c.beginPath();c.moveTo(260,-420);c.quadraticCurveTo(0,-520,-180,-330);c.quadraticCurveTo(20,-420,260,-380);c.fill();}c.restore();
  const z=lerp(1,1.15,eio(q));c.save();c.translate(540,1400);c.scale(z,z);c.translate(-540,-1400);
  HERO({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:t>WT(30,2)?'wide':'half',brow:'worried',mouth:t>WT(30,2)?'o':'frown',look:[0,2],hf:[30,-20],hb:[-30,-20],sweat:1});c.restore();
  chip(c,WT(30,2),t,'CHOOSING WHO DIES',540,520,'#d0201f',{size:50});vignette(c,0.6);};
// ---------- 18 · the promise: blinds down ----------
SH.promise=function(c,t){const q=inv(A(31),B(32),t),close=eio(inv(A(32)-0.2,A(32)+0.8,t));L2={dx:1,rim:'#a0b0ff',amb:'#1a1a30'};
  bedroom2(c,t,{clock:'11:58'});c.fillStyle=`rgba(0,0,10,${close*0.55})`;c.fillRect(0,0,W,H);
  HERO({c,x:540,y:2400,s:4.6,f:1,t,view:'front',eyes:'closed',brow:'worried',mouth:'frown',hf:[20,-10],hb:[-20,-10]});
  if(t>WT(32,3)){c.fillStyle=`rgba(0,0,0,${clamp((t-WT(32,3))/0.4)})`;c.fillRect(0,0,W,H);}vignette(c,0.6);};
// ---------- 19 · morning; the mirror ----------
SH.wake=function(c,t){const q=inv(A(33),WT(33,6),t);L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};bedroom2(c,t,{mood:'morning',clock:'7:00'});
  fig2(c,{x:540,y:1640,s:2.6,f:1,t,kind:'hero',view:'front',crouch:40,eyes:q<0.4?'closed':'half',brow:'flat',mouth:q<0.4?'o':'flat',hf:q<0.6?[95,-80]:undefined,hb:q<0.6?[-95,-80]:undefined});
  c.fillStyle='#3a5a8a';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.moveTo(100,1460);c.lineTo(980,1460);c.lineTo(1010,1760);c.lineTo(70,1760);c.closePath();c.fill();c.stroke();if(t<A(33)+0.3){c.fillStyle=`rgba(255,255,255,${1-(t-A(33))/0.3})`;c.fillRect(0,0,W,H);}vignette(c,0.4);};
SH.mirror=function(c,t){const q=inv(WT(33,6),B(34),t),frz=t>WT(34,2);L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};const z=lerp(1,1.3,eio(inv(A(34),B(34),t)));
  c.save();c.translate(560,700);c.scale(z,z);c.translate(-560,-700);bathroom(c,t);
  mirrorFrame(c,220,220,680,1040,()=>{c.fillStyle='#b8c4c8';c.fillRect(220,220,680,1040);fig2(c,{x:560,y:2050,s:4.4,f:-1,t,kind:'hero',view:'front',eyes:frz?'wide':'half',brow:frz?'up':'flat',mouth:frz?'o':'flat',hf:frz?[30,60]:[60,-30]});
    deathTimer(c,560,HEAD(2050,4.4)-20,heroSec(t),{s:1.2,age:t-A(34),t});});c.restore();
  // toothbrush falls
  if(frz){const p=t-WT(34,2);c.save();c.translate(700,lerp(1300,1900,clamp(p*p*2)));c.rotate(p*6);c.fillStyle='#ff6a5a';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-8,-100,16,200);c.strokeRect(-8,-100,16,200);c.restore();}
  dof(c,4,d=>{HERO({c:d,x:100,y:2800,s:5.6,f:1,t,back:1});});vignette(c,0.5);};
// ---------- 20 · checks: window, door, power ----------
SH.check=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};const s1=WT(36,0),s2=WT(36,2),s3=WT(36,4);
  if(t<s1){ // window latch close-up
    const p=eio(inv(A(35),A(35)+0.5,t));c.fillStyle='#e8ecf0';c.fillRect(0,0,W,H);c.fillStyle='#9ac0e0';c.fillRect(120,200,840,1400);c.fillStyle='#f4f4f2';c.strokeStyle=K2;c.lineWidth=10;c.fillRect(80,860,920,90);c.strokeRect(80,860,920,90);c.strokeRect(120,200,840,1400);
    c.save();c.translate(540,905);c.rotate(lerp(-1.3,0,p));c.fillStyle='#c8ccd2';c.fillRect(-20,-20,180,40);c.strokeRect(-20,-20,180,40);c.restore();c.fillStyle='#c8ccd2';c.beginPath();c.arc(540,905,34,0,TAU);c.fill();c.stroke();bigHand(c,620+lerp(-120,0,p)*Math.cos(0),1050,1.4,-0.2);}
  else if(t<s2){ // deadbolt
    const p=eio(inv(s1,s1+0.4,t));c.fillStyle='#6a4a30';c.fillRect(0,0,W,H);c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=6;for(let i=0;i<8;i++){c.beginPath();c.moveTo(i*150,0);c.lineTo(i*150+40,H);c.stroke();}
    c.fillStyle='#c8ccd2';c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.arc(540,900,140,0,TAU);c.fill();c.stroke();c.save();c.translate(540,900);c.rotate(lerp(0,Math.PI/2,p));c.fillStyle='#a8acb2';rr(c,-110,-30,220,60,30);c.fill();c.stroke();c.restore();bigHand(c,540+Math.cos(lerp(0,Math.PI/2,p))*110,900+Math.sin(lerp(0,Math.PI/2,p))*110+150,1.4,lerp(0,0.5,p));
    c.fillStyle='#8a8e96';c.fillRect(0,860,380,80);c.strokeRect(-10,860,390,80);}
  else if(t<s3){ // plug pulled from the wall
    const p=eio(inv(s2,s2+0.5,t));c.fillStyle='#e8e0d0';c.fillRect(0,0,W,H);c.fillStyle='#f8f6f0';c.strokeStyle=K2;c.lineWidth=8;rr(c,340,700,400,520,30);c.fill();c.stroke();for(const yy of [830,1080]){c.fillStyle='#2a2a2a';c.fillRect(490,yy-30,18,60);c.fillRect(572,yy-30,18,60);}
    const px=lerp(540,540,p),py=lerp(1080,1500,p);c.fillStyle='#1a1a1e';rr(c,px-80,py-60,160,140,20);c.fill();c.stroke();c.strokeStyle='#1a1a1e';c.lineWidth=26;c.beginPath();c.moveTo(px,py+80);c.quadraticCurveTo(px+200,py+400,px+100,H+100);c.stroke();bigHand(c,px+30,py+180,1.4,0);
    if(p>0.6){for(let i=0;i<6;i++){c.strokeStyle='rgba(255,220,80,0.7)';c.lineWidth=5;const a=i*1.05;c.beginPath();c.moveTo(540+Math.cos(a)*60,1080+Math.sin(a)*60);c.lineTo(540+Math.cos(a)*110,1080+Math.sin(a)*110);c.stroke();}}}
  else { // nothing seems dangerous
    const q=inv(s3,B(36),t);livingRoom(c,t);couch(c,540,1720,920,'back');couch(c,540,1720,920,'front');
    HERO({c,x:540,y:2000,s:3.0,f:1,t,view:'front',eyes:'open',brow:'worried',mouth:'flat',look:[Math.sin(t*3)*2,0],hf:[30,40],hb:[-30,40]});deathTimer(c,540,HEAD(2000,3.0)-50,heroSec(t),{s:1.05,age:9,t});}
  vignette(c,0.45);};
// ---------- 21 · calling Mom (split screen) ----------
SH.call=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};const ans=t>A(38);
  c.save();c.beginPath();c.rect(0,0,W,960);c.clip();livingRoom(c,t);fig2(c,{x:540,y:1560,s:4.0,f:1,t,kind:'hero',view:'front',eyes:t>A(39)?'closed':'open',brow:'worried',mouth:t>A(39)?'frown':'o',tear:t>A(39)?1:0,hf:[66,-46],propF:pPhone(1)});deathTimer(c,540,HEAD(1560,4.0)+10,heroSec(t),{s:0.9,age:9,t});c.restore();
  c.save();c.beginPath();c.rect(0,960,W,960);c.clip();kitchen(c,0,960,W,960);if(!ans){c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(0,960,W,960);}
  fig2(c,{x:540,y:2520,s:4.0,f:-1,t,kind:'mom',view:'front',eyes:ans?'happy':'open',brow:'flat',mouth:ans?'smile':'flat',hf:[-66,-46],propF:pPhone(1,'#c8a0b0')});deathTimer(c,540,HEAD(2520,4.0)+10,momSec(t),{s:0.9,age:9,t});c.restore();
  c.fillStyle='#0b0b0d';c.fillRect(0,950,W,20);if(!ans){const k=(t*3)%1;ring(c,540,1400,80+k*300,1-k,'rgba(255,255,255,',8);}vignette(c,0.35);};
// ---------- 22 · 11 minutes… 10… goodbye ----------
SH.tick=function(c,t){if(t<A(42)){c.fillStyle='#0a0a0e';c.fillRect(0,0,W,H);const k=t<A(41)?inv(A(40),A(40)+0.3,t):inv(A(41),A(41)+0.2,t);deathTimer(c,540,960,heroSec(t),{s:lerp(3.4,3.0,eo(k)),age:9,t,col:'#ff3b30'});dustMotes(c,t,30,'255,80,60',0.4);vignette(c,0.6);return;}
  L2={dx:-1,rim:'#ffb090',amb:'#3a3040'};livingRoom(c,t);c.fillStyle='rgba(20,10,30,0.35)';c.fillRect(0,0,W,H);const z=lerp(1,1.15,inv(A(42),A(43),t));c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);
  fig2(c,{x:540,y:2700,s:5.6,f:1,t,kind:'hero',view:'front',eyes:'closed',brow:'worried',mouth:'smile',tear:1,hf:[66,-46],propF:pPhone(1)});c.restore();vignette(c,0.55);};
// ---------- 23 · a child screaming outside ----------
SH.hear=function(c,t){const q=inv(A(43),B(43),t),turn=t>WT(43,4);L2={dx:1,rim:'#fff0c8',amb:'#3a3040'};livingRoom(c,t);c.fillStyle='rgba(20,10,30,0.25)';c.fillRect(0,0,W,H);
  HERO({c,x:430,y:2650,s:5.4,f:turn?1:-1,t,view:turn?'side':'front',eyes:'wide',brow:'up',mouth:'o',hf:turn?[20,60]:[66,-46],propF:pPhone(1)});
  if(turn){for(let i=0;i<3;i++){const k=((t-WT(43,4))*1.5+i/3)%1;c.strokeStyle=`rgba(255,255,255,${(1-k)*0.8})`;c.lineWidth=10;c.beginPath();c.arc(1150,800,120+k*400,Math.PI*0.75,Math.PI*1.25);c.stroke();}}
  vignette(c,0.5);};
// ---------- 24 · the boy trapped in the road ----------
SH.boy=function(c,t){const q=inv(A(44),A(47),t),close=t>A(45);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  const cam=close?scam(-60,lerp(2.2,2.5,inv(A(45),A(47),t)),1250):scam(lerp(-200,-100,q),0.95,1100);
  cityStreet(c,t,cam,{mood:'day',cw:9000,world:c2=>{bicycle(c2,-20,GY+250,200,{rot:-1.45,f:1});
    fig2(c2,{x:-60,y:GY+250,s:1.0,f:1,t,kind:'boy',view:'front',crouch:50,eyes:'closed',brow:'worried',mouth:'scream',tear:1,hf:[30,40],hb:[-30,20]});
    deathTimer(c2,-60,HEAD(GY+250,1.0)-30,t<A(46)?8:8-(t-A(46))*1.2,{s:close?0.42:0.7,age:t-WT(46,0)-0.1,t});
    if(!close){fig2(c2,{x:600,y:GY-20,s:1.2,f:-1,t,kind:'x3',view:'front',eyes:'wide',brow:'up',mouth:'o'});}}});
  vignette(c,0.45);};
SH.truck2=function(c,t){const q=inv(A(47),B(47),t);L2={dx:-1,rim:'#fff0c8',amb:'#4a5060'};sky2(c,'day');
  c.fillStyle='#7a8a9a';for(let i=0;i<8;i++){const h=600+hash(i)*500;c.fillRect(i*140-20,1150-h,130,h);}const rg=c.createLinearGradient(0,1150,0,H);rg.addColorStop(0,'#5a5e66');rg.addColorStop(1,'#2a2c30');c.fillStyle=rg;c.fillRect(0,1150,W,H);
  c.fillStyle='rgba(240,240,236,0.9)';for(let k=0;k<6;k++){const p=k/6;c.fillRect(0,lerp(1170,H,p*p),W,lerp(6,60,p*p));}
  const s=lerp(120,380,Math.pow(eio(q),1.4));truckFront(c,540,lerp(1180,1560,eio(q)),s,{});FX.speed=0.7;
  fig2(c,{x:540,y:2300,s:3.0,f:1,t,kind:'boy',back:1,crouch:50});
  deathTimer(c,540,HEAD(2300,3.0)+60,Math.max(0.1,6-(t-A(47))*1.4),{s:1.2,age:9,t});vignette(c,0.5);};
// ---------- 25 · your own countdown: 7 minutes ----------
SH.own=function(c,t){L2={dx:-1,rim:'#ffb090',amb:'#3a3040'};livingRoom(c,t);c.fillStyle='rgba(20,10,30,0.3)';c.fillRect(0,0,W,H);
  const z=lerp(1,1.2,eio(inv(A(48),B(49),t)));c.save();c.translate(540,800);c.scale(z,z);c.translate(-540,-800);
  HERO({c,x:540,y:2800,s:5.6,f:1,t,view:'front',eyes:'wide',brow:'worried',mouth:'flat',look:[0,-3]});deathTimer(c,540,HEAD(2800,5.6)-60,heroSec(t),{s:1.6,age:9,t});c.restore();vignette(c,0.55);};
SH.cost=function(c,t){L2={dx:0,rim:'#ff6a50',amb:'#2a2030'};c.fillStyle='#14101a';c.fillRect(0,0,W,H);
  const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(80,140,255,0.25)');g.addColorStop(0.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(255,60,40,0.3)');c.fillStyle=g;c.fillRect(0,0,W,H);
  HERO({c,x:540,y:2800,s:5.8,f:1,t,view:'front',eyes:'half',brow:'worried',mouth:'frown',sweat:1});
  chip(c,A(50)+0.2,t,'HIS LIFE',260,520,'#9fd8ff',{size:40});deathTimer(c,260,650,Math.max(0.1,4.6-(t-A(50))*0.5),{s:0.9,age:t-A(50)-0.2,t});
  chip(c,A(50)+0.5,t,'YOUR LIFE',820,520,'#ff3b30',{size:40});deathTimer(c,820,650,heroSec(t),{s:0.9,age:t-A(50)-0.5,t});vignette(c,0.6);};
// ---------- 26 · you run anyway ----------
SH.run=function(c,t){const q=inv(A(51),B(51),t);const hx=lerp(-400,500,q);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  cityStreet(c,t,scam(hx+40,1.5,1350),{mood:'day',cw:9000,world:c2=>{HERO({c:c2,x:hx,y:GY-20,s:1.9,f:1,t,view:'side',run:1,ph:t*13,eyes:'open',brow:'angry',mouth:'shout',castLen:0.5});deathTimer(c2,hx-30,HEAD(GY-20,1.9)-30,heroSec(t),{s:0.75,age:9,t});}});FX.speed=0.5;FX.speedDir=0;vignette(c,0.45);};
// ---------- 27 · slow motion: grab · throw ----------
SH.save=function(c,t){const q=inv(A(52),B(52),t);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};const slow=eio(q);
  cityStreet(c,t*0.3,scam(-40,1.4,1100),{mood:'day',cw:9000,world:c2=>{const thr=t>WT(52,5);
    const hx=lerp(500,0,clamp(slow*1.6)),hy=GY+250-Math.sin(clamp((slow-0.35)/0.65)*Math.PI)*120;
    if(!thr){bicycle(c2,-20,GY+250,200,{rot:-1.45});fig2(c2,{x:-60,y:GY+250,s:1.0,f:1,t,kind:'boy',view:'front',crouch:50,eyes:'wide',brow:'up',mouth:'o',tear:1});}
    else{const p=clamp((t-WT(52,5))/0.9);bicycle(c2,-20,GY+250,200,{rot:-1.45});c2.save();c2.translate(lerp(-40,500,eo(p)),lerp(GY+200,GY+560,p)-Math.sin(p*Math.PI)*260);c2.rotate(p*3);fig2(c2,{x:0,y:0,s:1.0,f:1,t,kind:'boy',view:'side',eyes:'closed',mouth:'o'});c2.restore();}
    HERO({c:c2,x:thr?lerp(0,420,eo(clamp((t-WT(52,5))/0.9))):hx,y:hy,s:1.55,f:-1,t,view:'side',run:0,eyes:'open',brow:'angry',mouth:'shout',lean:-0.9,hf:[90,10],hb:[80,30]});
    truck(c2,lerp(-2600,-1500,slow),GY+400,160,{lights:1,motion:1,roll:t*4});}});
  c.fillStyle='rgba(255,240,220,0.08)';c.fillRect(0,0,W,H);vignette(c,0.5);};
SH.miss=function(c,t){const p=inv(A(53)-0.35,B(53)+0.1,t);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  cityStreet(c,t,scam(250,1.35,1050),{mood:'day',cw:9000,world:c2=>{fig2(c2,{x:420,y:RD1+170,s:1.6,f:-1,t,kind:'hero',view:'side',crouch:90,eyes:'closed',brow:'worried',mouth:'o',hf:[60,30],hb:[50,40],lean:-0.2});fig2(c2,{x:520,y:RD1+150,s:1.0,f:-1,t,kind:'boy',view:'front',eyes:'closed',mouth:'o'});
    truck(c2,lerp(-1900,2700,p),GY+330,170,{lights:1,motion:1,roll:t*20});}});
  for(let i=0;i<10;i++){c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=4;const y=900+hash(i)*800;c.beginPath();c.moveTo(0,y);c.lineTo(W,y+Math.sin(i)*20);c.stroke();}FX.speed=0.8;vignette(c,0.5);};
// ---------- 28 · 80 years · 63 years ----------
SH.roll=function(c,t){L2={dx:-1,rim:'#ffe0b0',amb:'#5a6070'};dof(c,3,d=>{cityStreet(d,t,scam(300,2.0,1400),{mood:'day',cw:9000});});
  HERO({c,x:330,y:2350,s:3.9,f:1,t,view:undefined,crouch:70,eyes:t>WT(54,10)?'wide':'open',brow:'up',mouth:t>WT(54,10)?'o':'flat',hf:[60,20]});
  fig2(c,{x:720,y:2250,s:2.5,f:-1,t,kind:'boy',view:'front',eyes:'open',brow:'flat',mouth:'o'});
  deathTimer(c,720,HEAD(2250,2.5)-60,rollSec(2,80*YR+1*MO,(t-WT(54,2))/1.4),{s:1.0,age:t-A(54),t});deathTimer(c,330,HEAD(2350,3.9)-60,heroSec(t),{s:1.0,age:9,t});vignette(c,0.4);};
// ---------- 29 · beaten the system ----------
SH.laugh=function(c,t){const q=inv(A(55),B(55),t);L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};sky2(c,'day');lightRays(c,700,-100,'255,245,210',0.2,8,2200,0.9);
  dof(c,2,d=>{for(let i=0;i<6;i++){const x=80+i*190;fig2(d,{x,y:1600,s:1.9,f:i<3?1:-1,t,kind:crowdKinds[i],view:'front',eyes:'happy',mouth:'smile',hf:[Math.sin(t*12+i)*10,-40+Math.sin(t*12+i)*20],hb:[-Math.sin(t*12+i)*10,-40+Math.cos(t*12+i)*20]});}});
  c.fillStyle='#9a968e';c.fillRect(0,1650,W,300);
  HERO({c,x:540,y:2650,s:5.4,f:1,t,view:'front',eyes:'happy',brow:'up',mouth:'smile',tilt:Math.sin(t*10)*0.06});fig2(c,{x:820,y:2500,s:3.3,f:-1,t,kind:'boy',view:'front',eyes:'happy',mouth:'smile'});
  deathTimer(c,540,HEAD(2650,5.4)-60,heroSec(t),{s:1.4,age:9,t});vignette(c,0.35);};
// ---------- 30 · the phone rings: MOM ----------
function momScreen(t,showTimer){return (c,x,y,w,h)=>{kitchen(c,x,y,w,h);fig2(c,{x:x+w/2,y:y+h*0.6+640,s:2.6,f:1,t,kind:'mom',view:'front',eyes:'happy',brow:'flat',mouth:'smile',hf:t>A(66)?[85,-75+Math.sin(t*8)*20]:undefined});
  if(showTimer)deathTimer(c,x+w/2,y+h*0.6+640-318*2.6+20,momSec(t),{s:0.8,age:t-A(59),t});c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(x,y,w,90);txt(c,'MOM',x+w/2,y+48,40,'#fff',{stroke:false,ls:6});}}
SH.ring=function(c,t){L2={dx:0,rim:'#9fd8ff',amb:'#2a2a38'};c.fillStyle='#1a1c24';c.fillRect(0,0,W,H);dof(c,5,d=>{cityStreet(d,t,scam(0,1.4,1300),{mood:'dusk',cw:9000});});c.fillStyle='rgba(10,10,20,0.4)';c.fillRect(0,0,W,H);
  const vib=t<A(57)?Math.sin(t*80)*6:0;
  phoneBig(c,540+vib,1100,520,1000,{rot:0.03,screen:(c,x,y,w,h)=>{const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#2a3a5a');g.addColorStop(1,'#0e1420');c.fillStyle=g;c.fillRect(x,y,w,h);
    c.save();c.beginPath();c.arc(0,-150,110,0,TAU);c.clip();c.fillStyle='#d8c4a0';c.fillRect(-120,-260,240,240);fig2(c,{x:0,y:-132,s:1.25,f:1,t,kind:'mom',view:'front',headOnly:1,eyes:'happy',mouth:'smile'});c.restore();c.strokeStyle='#fff';c.lineWidth=5;c.beginPath();c.arc(0,-150,110,0,TAU);c.stroke();
    txt(c,'MOM',0,20,70,'#fff',{stroke:false,ls:8});txt(c,'incoming video call',0,90,30,'#a8b8d0',{stroke:false,w:600});
    for(const [bx,col] of [[-130,'#ff3b30'],[130,'#34c759']]){c.fillStyle=col;c.beginPath();c.arc(bx,330,58,0,TAU);c.fill();}
    if(t<A(57)){const k=(t*2)%1;c.strokeStyle=`rgba(255,255,255,${1-k})`;c.lineWidth=4;c.beginPath();c.arc(0,-150,110+k*80,0,TAU);c.stroke();}}});vignette(c,0.5);};
SH.momTimer=function(c,t){const q=inv(A(58),B(59),t);L2={dx:0,rim:'#9fd8ff',amb:'#2a2a38'};c.fillStyle='#14161c';c.fillRect(0,0,W,H);
  const z=lerp(1,1.45,eio(q));c.save();c.translate(540,820);c.scale(z,z);c.translate(-540,-820);phoneBig(c,540,1100,560,1080,{screen:momScreen(t,t>A(59))});c.restore();
  if(t>A(59)&&t<A(59)+0.25){c.fillStyle='rgba(255,40,30,0.25)';c.fillRect(0,0,W,H);}vignette(c,0.55);};
// ---------- 31 · understanding (dolly-zoom) ----------
SH.understand=function(c,t){const q=eio(inv(A(60),B(60),t));L2={dx:-1,rim:'#9fd8ff',amb:'#2a2a38'};c.save();c.translate(540,960);c.scale(lerp(1.5,0.95,q),lerp(1.5,0.95,q));c.translate(-540,-960);cityStreet(c,t,scam(0,1.4,1300),{mood:'dusk',cw:9000});c.restore();
  c.fillStyle=`rgba(20,20,40,${0.2+q*0.35})`;c.fillRect(0,0,W,H);HERO({c,x:540,y:2750,s:5.7,f:1,t,view:'front',eyes:'wide',brow:'worried',mouth:'o',sweat:1});vignette(c,0.6);};
// ---------- 32 · death doesn't pick a time — it picks a person ----------
SH.who=function(c,t){const q=inv(A(61),B(61),t);c.fillStyle='#08080c';c.fillRect(0,0,W,H);L2={dx:0,rim:'#ff5a40',amb:'#1a1a24'};
  const ks=['x1','x3','mom','x4','x2'];const sx=lerp(-0.4,2.0,clamp(inv(A(61),WT(61,12),t)))*1,spot=t<WT(61,12)?100+Math.sin(t*2.4)*380:lerp(100+Math.sin(WT(61,12)*2.4)*380,0,eio(inv(WT(61,12),WT(61,14),t)));
  const spX=540+spot;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(spX,1500,0,spX,1500,320);g.addColorStop(0,'rgba(255,240,220,0.4)');g.addColorStop(1,'rgba(255,240,220,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.beginPath();c.moveTo(spX-40,-100);c.lineTo(spX+40,-100);c.lineTo(spX+260,1650);c.lineTo(spX-260,1650);c.fillStyle='rgba(255,240,220,0.08)';c.fill();c.restore();
  ks.forEach((k,i)=>{const x=140+i*200;const lit=Math.abs(x-spX)<130;fig2(c,{x,y:1650,s:1.7,f:1,t,kind:k,view:'front',eyes:lit?'open':'closed',mouth:'flat',ghost:lit?null:null});if(!lit){c.fillStyle='rgba(8,8,12,0.55)';c.fillRect(x-100,1000,200,700);}
    deathTimer(c,x,HEAD(1650,1.7)-40,k==='mom'&&t>WT(61,13)?momSec(t):[41,17,42,8,55][i]*YR-t,{s:0.5,age:t-A(61)-i*0.1,t,col:k==='mom'&&t>WT(61,13)?'#ff3b30':undefined});});
  if(t<WT(61,9)){chip(c,A(61)+0.3,t,'NOT WHEN…',540,520,'#9fd8ff',{size:54,end:WT(61,9)-0.1});}else chip(c,WT(61,9),t,'…WHO',540,520,'#ff3b30',{size:70});vignette(c,0.6);};
// ---------- 33 · passing it on ----------
SH.pass=function(c,t){const q=inv(A(62),B(62),t);c.fillStyle='#0c0c12';c.fillRect(0,0,W,H);L2={dx:0,rim:'#ff5a40',amb:'#1a1a24'};
  const g=c.createRadialGradient(540,1300,0,540,1300,900);g.addColorStop(0,'rgba(120,40,40,0.4)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  HERO({c,x:300,y:2250,s:3.6,f:1,t,view:'front',eyes:'wide',brow:'worried',mouth:'o',look:[2,0]});fig2(c,{x:790,y:2250,s:3.6,f:-1,t,kind:'mom',view:'front',eyes:'happy',mouth:'smile'});
  const p=eio(inv(WT(62,4),WT(62,10),t));const hy=HEAD(2250,3.6)-60;
  if(p<1){const x=lerp(300,790,p),y=hy-Math.sin(p*Math.PI)*300;for(let i=1;i<8;i++){const pp=Math.max(0,p-i*0.03);c.fillStyle=`rgba(255,40,30,${0.3-i*0.035})`;c.beginPath();c.arc(lerp(300,790,pp),hy-Math.sin(pp*Math.PI)*300,30-i*2,0,TAU);c.fill();}deathTimer(c,x,y,720,{s:0.9,age:9,t,col:'#ff3b30'});}
  if(p>=1)deathTimer(c,790,hy,momSec(t),{s:0.9,age:9,t});deathTimer(c,300,hy,p<0.5?63*YR:63*YR+t,{s:0.9,age:t-WT(62,5),t,col:'#7ee8a8'});
  deathTimer(c,790,hy,42*YR,{s:0.9,age:9,t,alpha:1-clamp(p*3)});vignette(c,0.55);};
// ---------- 34 · staring at the phone ----------
SH.stare=function(c,t){L2={dx:0,rim:'#9fd8ff',amb:'#1a1a2a'};dof(c,4,d=>{cityStreet(d,t,scam(-200,1.5,1300),{mood:'dusk',cw:9000});});c.fillStyle='rgba(10,10,30,0.45)';c.fillRect(0,0,W,H);
  const z=lerp(1,1.1,inv(A(63),B(63),t));c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);HERO({c,x:540,y:2600,s:5.2,f:1,t,view:'front',eyes:'half',brow:'worried',mouth:'frown',look:[0,3],hf:[16,10],hb:[-16,10]});
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1700,0,540,1700,700);g.addColorStop(0,'rgba(150,200,255,0.45)');g.addColorStop(1,'rgba(120,180,255,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  c.fillStyle='#16181e';c.strokeStyle=K2;c.lineWidth=6;rr(c,470,1640,140,240,18);c.fill();c.stroke();c.fillStyle='#8ab8e8';rr(c,482,1656,116,208,10);c.fill();c.restore();vignette(c,0.6);};
// ---------- 35 · 63 years / 12 minutes (split) ----------
SH.split=function(c,t){L2={dx:-1,rim:'#9fd8ff',amb:'#2a2a38'};
  c.save();c.beginPath();c.rect(0,0,W,960);c.clip();c.fillStyle='#14161e';c.fillRect(0,0,W,960);dof(c,4,d=>{cityStreet(d,t,scam(0,1.5,1100),{mood:'dusk',cw:9000});});HERO({c,x:540,y:1560,s:4.0,f:1,t,view:'front',eyes:'half',brow:'worried',mouth:'frown'});deathTimer(c,540,HEAD(1560,4.0)+40,heroSec(t),{s:1.1,age:t-A(64),t});c.restore();
  c.save();c.beginPath();c.rect(0,960,W,960);c.clip();kitchen(c,0,960,W,960);fig2(c,{x:540,y:2520,s:4.0,f:1,t,kind:'mom',view:'front',eyes:'happy',mouth:'smile'});deathTimer(c,540,HEAD(2520,4.0)+40,momSec(t),{s:1.1,age:t-A(65),t});c.restore();
  c.fillStyle='#0b0b0d';c.fillRect(0,950,W,20);vignette(c,0.4);};
// ---------- 36 · someone you love ----------
SH.love=function(c,t){const q=inv(A(66),B(67),t);L2={dx:0,rim:'#9fd8ff',amb:'#2a2a38'};c.fillStyle='#14161c';c.fillRect(0,0,W,H);const z=lerp(1.15,1.0,eio(q));c.save();c.translate(540,1000);c.scale(z,z);c.translate(-540,-1000);
  phoneBig(c,540,1050,600,1150,{screen:momScreen(t,1)});c.restore();
  // a tear lands on the screen
  const td=t-WT(67,6);if(td>0){const y=lerp(-50,1200,clamp(td/0.6));c.fillStyle='rgba(170,215,255,0.85)';c.beginPath();c.ellipse(620,y,20,30,0,0,TAU);c.fill();if(td>0.6){c.strokeStyle=`rgba(200,230,255,${1-clamp((td-0.6)/0.8)})`;c.lineWidth=5;c.beginPath();c.ellipse(620,1200,30+(td-0.6)*120,12+(td-0.6)*40,0,0,TAU);c.stroke();}}
  vignette(c,0.55);};
// ---------- 37 · alone ----------
SH.alone=function(c,t){const q=inv(A(68),B(69),t);const cam=scam(lerp(0,60,q),lerp(1.0,1.2,eio(q)),1250);L2={dx:1,rim:'#ffb080',amb:'#2a2a40'};
  cityStreet(c,t,cam,{mood:'dusk',cw:9000,world:c2=>{for(let i=0;i<5;i++){const d=i%2?1:-1,x=((i*300+t*60*d+3000)%1800)-900;fig2(c2,{x,y:GY-10,s:1.3,f:d,t,kind:crowdKinds[i],view:'side',walk:1,ph:t*4+i,eyes:'open',mouth:'flat'});deathTimer(c2,x,HEAD(GY-10,1.3)-30,[33,8,61,19,44][i]*YR-t,{s:0.45,age:9,t,alpha:0.7});}
    HERO({c:c2,x:0,y:GY+640,s:2.4,f:1,t,back:1,propF:pPhone(1)});}});
  c.fillStyle='rgba(30,20,60,0.2)';c.fillRect(0,0,W,H);vignette(c,0.55);};
// ---------- 38 · would you? (looks at us) ----------
SH.question=function(c,t){const q=inv(A(70),B(70),t);L2={dx:1,rim:'#ffb080',amb:'#2a2a40'};
  dof(c,5,d=>{cityStreet(d,t,scam(0,1.5,1300),{mood:'dusk',cw:9000});for(let i=0;i<10;i++)deathTimer(d,hash(i)*W,500+hash(i*3)*800,hash(i*5)*60*YR,{s:0.5,t});});c.fillStyle='rgba(20,10,40,0.3)';c.fillRect(0,0,W,H);
  const z=lerp(1,1.15,eio(q));c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);HERO({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:'open',brow:'worried',mouth:'flat'});c.restore();
  deathTimer(c,540,HEAD(2700,5.6*z)+40,momSec(t),{s:0.9,age:9,t,alpha:0.85});vignette(c,0.55);};
// ---------- 39 · follow ----------
SH.end=function(c,t){c.fillStyle='#08080c';c.fillRect(0,0,W,H);const p=t-A(71);deathTimer(c,540,860,momSec(t),{s:2.0,age:p,t});dustMotes(c,t,30,'255,80,60',0.35);vignette(c,0.6);};
// big close-up hand used in inserts
function bigHand(c,x,y,sc,rot,o){hand(c,x,y,sc,rot,o);}

SHOTS=[[0,'hook'],[WT(0,10),'look'],[A(3),'blind'],[A(4),'couch'],[A(7),'friend'],[A(9),'stranger'],[A(11),'process'],[WT(11,8),'corner'],[A(13),'scream'],[A(14),'zero'],[A(15),'after'],[A(16),'days'],[A(17),'notes'],[A(18),'using'],[A(19),'fire'],[A(20),'fire2'],[A(21),'beam'],[A(22),'beam2'],[WT(22,9),'man'],[A(26),'collapse'],[A(27),'board'],[A(29),'choose'],[A(31),'promise'],[A(33),'wake'],[WT(33,6),'mirror'],[A(35),'check'],[A(37),'call'],[A(40),'tick'],[A(43),'hear'],[A(44),'boy'],[A(47),'truck2'],[A(48),'own'],[A(50),'cost'],[A(51),'run'],[A(52),'save'],[A(53),'miss'],[A(54),'roll'],[A(55),'laugh'],[A(56),'ring'],[A(58),'momTimer'],[A(60),'understand'],[A(61),'who'],[A(62),'pass'],[A(63),'stare'],[A(64),'split'],[A(66),'love'],[A(68),'alone'],[A(70),'question'],[A(71),'end']];
IMPACTS=[[WT(0,9),10,0.3],[A(6)+0.15,8,0.25],[A(10),10,0.3],[WT(11,10),12,0.4],[A(13),16,0.4],[A(14),26,0.6,'#ff3b30',0.6],[A(15),18,0.5],[FIRE_T(),14,0.4],[WT(20,2),22,0.6,'#ffb060',0.5],[LAND(),24,0.6],[WT(25,3),12,0.4,'#ff3b30',0.3],[MAN_ZERO()+0.6,14,0.4],[WT(30,2),10,0.4],[A(34),14,0.4,'#ff3b30',0.3],[WT(34,2),8,0.3],[A(41),10,0.3],[A(46),10,0.3,'#ff3b30',0.3],[A(51),12,0.3],[WT(52,5),16,0.4],[A(53),26,0.6,'#ffffff',0.5],[A(59),16,0.5,'#ff3b30',0.4],[WT(61,13),12,0.4],[WT(62,10),12,0.4]];
// --- redesigned: the boy trapped under his bike ---
function boyDown(c2,t,o={}){fig2(c2,{x:-60,y:GY+250,s:1.15,f:1,t,kind:'boy',view:'front',crouch:80,eyes:o.eyes||'closed',brow:'worried',mouth:o.mouth||'scream',tear:1,hf:[34,20],hb:[-40,-10]});bicycle(c2,10,GY+262,210,{rot:-0.28,f:-1,col:'#2a8ac8'});}
SH.boy=function(c,t){const close=t>A(45);L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};
  const cam=close?scam(-60,lerp(2.1,2.45,eio(inv(A(45),A(47),t))),1300):scam(lerp(-140,-80,inv(A(44),A(45),t)),1.25,1150);
  cityStreet(c,t,cam,{mood:'day',cw:9000,world:c2=>{boyDown(c2,t);
    deathTimer(c2,-60,HEAD(GY+250,1.15)+40,t<A(46)?8:8-(t-A(46))*1.2,{s:close?0.42:0.6,age:t-WT(46,0)-0.1,t});
    if(!close){fig2(c2,{x:520,y:GY-20,s:1.3,f:-1,t,kind:'x3',view:'front',eyes:'wide',brow:'up',mouth:'o',hf:[-70,-30]});}}});
  vignette(c,0.45);};
SH.save=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};const g1=WT(52,1)+0.25,th=WT(52,5);
  cityStreet(c,t*0.3,scam(160,1.1,1150),{mood:'day',cw:9000,world:c2=>{
    truck(c2,lerp(-1500,-560,eio(inv(A(52),B(52)+0.3,t))),GY+330,160,{lights:1,motion:1,roll:t*4});
    bicycle(c2,10,GY+262,210,{rot:-0.28-(t>g1?0.5:0),f:-1});
    if(t<g1){const p=eio(inv(A(52),g1,t));const hx=lerp(560,60,p);
      fig2(c2,{x:-60,y:GY+250,s:1.15,f:1,t,kind:'boy',view:'front',crouch:80,eyes:'wide',brow:'up',mouth:'o',tear:1,hf:[34,-40],hb:[-40,-10]});
      HERO({c:c2,x:hx,y:GY+300,s:1.6,f:-1,t,view:'side',run:1,ph:t*9,eyes:'open',brow:'angry',mouth:'shout',lean:0.5,hf:[100,10]});}
    else{const p=clamp((t-g1)/(th-g1+0.9));const hx=lerp(20,200,eo(p)),hy=lerp(GY+300,RD1+90,eo(p));
      const bt=clamp((t-th)/0.8);const bx=t<th?hx+70:lerp(hx+70,400,eo(bt)),by=t<th?hy-150:lerp(hy-150,RD1+140,bt)-Math.sin(bt*Math.PI)*160;
      HERO({c:c2,x:hx,y:hy,s:1.6,f:1,t,view:'side',run:t<th?1:0,ph:t*9,eyes:'open',brow:'angry',mouth:'shout',lean:t<th?0.5:0.8,hf:[110,-20],hb:[100,0]});
      c2.save();c2.translate(bx,by-160);c2.rotate(t<th?0.3:0.3+bt*1.2);fig2(c2,{x:0,y:160,s:1.15,f:1,t,kind:'boy',view:'side',eyes:'closed',brow:'worried',mouth:'o',crouch:40});c2.restore();}}});
  c.fillStyle='rgba(255,240,220,0.08)';c.fillRect(0,0,W,H);vignette(c,0.5);};
// truck2: the boy's back while the truck bears down (bike beside him)
