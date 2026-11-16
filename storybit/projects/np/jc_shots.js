'use strict';
// ===== "What if Julius Caesar had three lives?" — Style 3, lens-aware shots =====
SH={};
KEY.clear();['THREE','LIVES?','DIE.','LIFE','ONE.','TWO.','THREE.','KNIFE.','DEAD.','EVERYTHING.','HOME.','PANIC.','MISTAKE.','SAFE.','COLLAPSING.','ROME.','IMPORTANT.','ANYONE.','ARRESTS','NEVER','SURVIVES.','MONARCHY.','IRONY.','REPUBLIC.','ANYWAY.','HIMSELF.','FOURTH.','BRUTUS','23'].forEach(k=>KEY.add(k));
const GOLD_C='#ffc94a',RED_C='#ff3b30',GRN_C='#4ade80';
const S=(kind,o)=>fig2(o.c,{kind,view:'front',...o});
const F0=(c,t,t0,d=0.3)=>{const a=1-clamp((t-t0)/d);if(a>0){c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);}};
const pushZ=(t,t0,t1,z0,z1)=>lerp(z0,z1,eio(inv(t0,t1,t)));
function sepia(c,a=0.75){c.save();c.globalCompositeOperation='color';c.globalAlpha=a;c.fillStyle='#a07840';c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(255,226,180,0.5)';c.fillRect(0,0,W,H);c.restore();}
function redTint(c,a){c.save();c.globalCompositeOperation='multiply';c.fillStyle=`rgba(255,${120-a*80|0},${110-a*80|0},${a})`;c.fillRect(0,0,W,H);c.restore();}
// a dark sleeved arm reaching in from off-frame holding a dagger (silhouette)
function creepKnife(c,x0,y0,x1,y1,rot,a=1,o={}){if(a<=0)return;c.save();c.globalAlpha*=a;c.lineCap='round';c.strokeStyle='#0c0a0c';c.lineWidth=70;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();
  c.strokeStyle=o.sleeve||'#2a2226';c.lineWidth=54;c.stroke();prop(c,'pugio_side',x1,y1,o.len||300,rot,{glint:o.glint});c.fillStyle='#1a1416';c.beginPath();c.arc(x1,y1,34,0,TAU);c.fill();c.restore();}
// figure lying / rotating about its hip (ang 0 = upright, -π/2 = lying with head to the left)
function pivotFig(c,kind,x,y,s,ang,o={}){const hy=y-116*s;c.save();c.translate(x,hy);c.rotate(ang);c.translate(-x,-hy);const r=S(kind,{c,x,y,s,...o});c.restore();return r;}
function blood(c,x,y,r,seed=0,a=0.9){c.save();c.fillStyle=`rgba(120,8,14,${a})`;for(let i=0;i<6;i++){c.beginPath();c.ellipse(x+(hash(i+seed)-0.5)*r,y+(hash(i*3+seed)-0.5)*r*0.6,r*(0.25+hash(i*5+seed)*0.3),r*(0.15+hash(i*7+seed)*0.2),hash(i)*3,0,TAU);c.fill();}c.restore();}
// stone tablet with carved lines
function tablet(c,x,y,w,h,lines,t,k=1){c.save();c.translate(x,y);c.scale(0.85+0.15*k,0.85+0.15*k);c.globalAlpha=k;c.fillStyle='rgba(0,0,0,0.4)';rr(c,-w/2+14,-h/2+18,w,h,18);c.fill();
  c.fillStyle=marbleG(c,-w/2,w/2,'#d8ccb4',-0.35);rr(c,-w/2,-h/2,w,h,18);c.fill();c.strokeStyle=K2;c.lineWidth=7;c.stroke();c.strokeStyle='rgba(90,60,30,0.5)';c.lineWidth=4;rr(c,-w/2+22,-h/2+22,w-44,h-44,10);c.stroke();
  lines.forEach(([s,sz,col,a],i)=>{if(a<=0)return;c.globalAlpha=k*Math.min(1,a);c.font=`900 ${sz}px "Inter Display",Arial`;c.textAlign='center';c.textBaseline='middle';c.letterSpacing=sz*0.12+'px';const y0=-h/2+h*(i+1)/(lines.length+1);
    c.fillStyle='rgba(255,255,255,0.35)';c.fillText(s,2,y0+3);c.fillStyle=col||'#4a2a14';c.fillText(s,0,y0);});c.restore();}
// game stat bar
function statBar(c,x,y,w,lab,v,col,o={}){c.save();c.translate(x,y);c.fillStyle='rgba(8,8,12,0.82)';rr(c,-w/2-24,-70,w+48,140,24);c.fill();c.strokeStyle=col;c.lineWidth=4;c.stroke();
  c.font='900 34px "Inter Display",Arial';c.letterSpacing='6px';c.textAlign='left';c.textBaseline='middle';c.fillStyle='#fff';c.fillText(lab,-w/2,-30);c.textAlign='right';c.fillStyle=col;c.fillText(Math.round(v*100)+'%',w/2,-30);
  c.fillStyle='rgba(255,255,255,0.12)';rr(c,-w/2,8,w,34,17);c.fill();c.fillStyle=col;c.shadowColor=col;c.shadowBlur=20;rr(c,-w/2,8,Math.max(34,w*v),34,17);c.fill();c.shadowBlur=0;
  if(o.crack){c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=3;c.beginPath();c.moveTo(w*0.1,0);c.lineTo(w*0.14,20);c.lineTo(w*0.08,40);c.lineTo(w*0.16,60);c.stroke();}c.restore();}
// gold eagle standard (aquila)
function aquila(c,x,y,s,t){c.save();c.translate(x,y);c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#6a4024';c.fillRect(-5*s,0,10*s,520*s);c.strokeRect(-5*s,0,10*s,520*s);
  const g=c.createLinearGradient(-60*s,0,60*s,0);g.addColorStop(0,'#8a6010');g.addColorStop(0.5,'#ffe08a');g.addColorStop(1,'#a87818');c.fillStyle=g;
  c.beginPath();c.moveTo(0,-10*s);c.lineTo(-70*s,-70*s+Math.sin(t*2)*4*s);c.lineTo(-50*s,-20*s);c.lineTo(-20*s,-12*s);c.lineTo(0,-50*s);c.lineTo(20*s,-12*s);c.lineTo(50*s,-20*s);c.lineTo(70*s,-70*s+Math.sin(t*2)*4*s);c.closePath();c.fill();c.stroke();
  c.beginPath();c.arc(0,-56*s,12*s,0,TAU);c.fill();c.stroke();c.fillRect(-30*s,-6*s,60*s,14*s);c.strokeRect(-30*s,-6*s,60*s,14*s);
  c.fillStyle='#a81c24';rr(c,-44*s,40*s,88*s,110*s,4*s);c.fill();c.stroke();c.fillStyle='#f0c858';c.font=`900 ${26*s}px "Inter Display",Arial`;c.textAlign='center';c.fillText('SPQR',0,100*s);c.restore();}
// medallion portrait (head + shoulders of a kind) in a gold ring
function medal(c,x,y,r,kind,t,o={}){c.save();c.translate(x,y);c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.arc(8,12,r+14,0,TAU);c.fill();
  const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#ffe8a0');g.addColorStop(0.5,'#c8961e');g.addColorStop(1,'#6a4a0a');c.fillStyle=g;c.beginPath();c.arc(0,0,r+14,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();
  c.beginPath();c.arc(0,0,r,0,TAU);c.fillStyle=o.bg||'#3a2a2a';c.fill();c.save();c.clip();S(kind,{c,x:0,y:-r*0.12+255*(r/90*1.55),s:r/90*1.55,t,eyes:o.eyes||'open',brow:o.brow||'flat',mouth:o.mouth||'flat',hf:[20,94],hb:[-20,94]});c.restore();
  c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();if(o.label)txt(c,o.label,0,r+50,34,'#fff');c.restore();}
// dream frame: soft cloudy oval mask
function dreamFrame(c,t,k){c.save();c.globalAlpha=k;const g=c.createRadialGradient(540,1050,380,540,1050,820);g.addColorStop(0,'rgba(30,6,10,0)');g.addColorStop(1,'rgba(30,6,10,1)');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<30;i++){const a=i/30*TAU+t*0.1,r=600+Math.sin(t*1.5+i)*30;c.fillStyle='rgba(40,10,16,0.6)';c.beginPath();c.arc(540+Math.cos(a)*r*0.75,1050+Math.sin(a)*r,90,0,TAU);c.fill();}c.restore();}
function calSlate(c,t,t0,top,big,sub,col='#ff5a4a'){const k=back(clamp((t-t0)/0.35));tablet(c,540,1080,760,560,[[top,46,'#4a2a14',1],[big,120,col,clamp((t-t0-0.15)/0.2)],[sub,40,'#4a2a14',clamp((t-t0-0.3)/0.2)]],t,k);}
const SENATORS=['senator','senator2','senator3','cassius'];

// ---------------- 0 · HOOK: three lives, knives creeping in ----------------
SH.hook=function(c,t){L2={dx:1,rim:'#ffcf8a',amb:'#3a2418'};const z=pushZ(t,0,A(1),1.0,1.1);
  senate(c,t,{x:540,y:1180,z,mm:85},{mood:'day',world:(c2,GY)=>{CAESAR({c:c2,x:540,y:2200,s:3.6,f:1,t,view:'front',eyes:t>WT(0,2)?'sly':'open',brow:'flat',mouth:'smirk',hf:[30,92],hb:[-26,92]});}});
  redTint(c,0.25+0.25*inv(1,A(1),t));
  const k=eo(inv(0.6,A(1)-0.2,t));creepKnife(c,-200,1500,lerp(-60,150,k),lerp(1600,1360,k),-0.9,k,{glint:t});creepKnife(c,W+200,1700,lerp(W+60,930,k),lerp(1800,1500,k),Math.PI+0.7,k,{glint:t+0.4});creepKnife(c,-200,1950,lerp(-80,120,k),lerp(2000,1820,k),-0.4,k*0.9);
  const n=t<WT(0,5)?0:t<WT(0,5)+0.25?1:t<WT(0,5)+0.5?2:3;if(n>0)livesHUD(c,t,n,{y:560,r:44,gain:WT(0,5)+(n-1)*0.25});
  vignette(c,0.55);};
// 1 · March 15, 44 BC
SH.date=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#3a2a30'};forum(c,t,{x:540,y:pushZ(t,A(1),A(3),900,960),z:0.82,mm:24},{world:(c2,GY)=>{for(let i=0;i<6;i++)S(SENATORS[i%4],{c:c2,x:-60+i*240,y:GY+120+(i%2)*60,s:1.05,f:i%2?-1:1,t,walk:1,ph:t*6+i,back:true});}});
  c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(0,0,W,H);calSlate(c,t,A(1),'IDES OF MARCH','MARCH 15',t>A(2)?'44 BC':'');vignette(c,0.5);F0(c,t,A(1),0.25);};
// 2 · most powerful man in Rome — on the temple steps, crowd below, power stat
SH.power=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2a30'};const z=pushZ(t,A(3),A(4),0.9,1.0);
  forum(c,t,{x:540,y:1080,z,mm:35},{world:(c2,GY)=>{const up=eo(inv(WT(3,4),WT(3,6),t));
    CAESAR({c:c2,x:540,y:GY-260,s:1.9,f:1,t,view:'front',eyes:'happy',brow:'up',mouth:'smile',hf:[lerp(40,72,up),lerp(90,-40,up)],hb:[lerp(-30,-72,up),lerp(90,-40,up)]});
    for(let i=0;i<9;i++){const x=-80+i*155,y=GY+380+(i%2)*90;S(SENATORS[i%4],{c:c2,x,y,s:1.7,f:1,t,back:true,hf:[40,-60+Math.sin(t*8+i)*14],hb:[-40,-60+Math.cos(t*8+i)*14]});}}});
  statBar(c,540,1640,640,'POWER',lerp(0.2,1,eo(inv(WT(3,4),B(3),t))),GOLD_C);chip(c,WT(3,6),t,'MAX LEVEL',540,1490,GOLD_C,{size:40});vignette(c,0.45);};
// 3 · warned — reads "BEWARE THE IDES OF MARCH" on a real scroll, smirks
SH.warned=function(c,t){L2={dx:-1,rim:'#ffcf8a',amb:'#2a2030'};villa(c,t,{x:540,y:1000,z:1.0,mm:135},{world:(c2,GY)=>{
    const r=CAESAR({c:c2,x:540,y:2210,s:4.4,f:1,t,view:'front',eyes:t>WT(4,9)?'sly':'open',brow:t>WT(4,9)?'up':'flat',mouth:t>WT(4,9)?'smirk':'flat',hf:[34,58],hb:[-36,58],look:[0,1],propF:(c3,h,s)=>{prop(c3,'scroll_open',h.x-26*s,h.y-12*s,120*s,0);
      c3.save();c3.translate(h.x-26*s,h.y-14*s);c3.fillStyle='#3a1a0a';c3.textAlign='center';c3.font=`900 ${11*s}px "Inter Display"`;c3.fillText('BEWARE',0,-22*s);c3.fillText('THE IDES',0,-6*s);c3.fillText('OF MARCH',0,10*s);c3.fillStyle='#a81c1c';c3.fillText('✦',0,28*s);c3.restore();}});}});
  if(t>WT(4,9)){c.save();c.globalAlpha=0.35*(1-clamp((t-WT(4,9))/0.5));c.fillStyle=RED_C;c.fillRect(0,0,W,H);c.restore();}vignette(c,0.55);};
// 4 · but what if he had three lives — hearts drop in over him
SH.three=function(c,t){L2={dx:1,rim:'#ffd38a',amb:'#2a2030'};c.fillStyle='#120c10';c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(540,900,0,540,900,900);gg.addColorStop(0,'rgba(255,190,90,0.35)');gg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();dustMotes(c,t,40,'255,220,160',0.5);
  CAESAR({c,x:540,y:2120,s:3.8,f:1,t,view:'front',eyes:'open',brow:'up',mouth:'flat',look:[0,-1],hf:[30,92],hb:[-26,92]});
  const t0=WT(5,4);for(let i=0;i<3;i++){const q=t-t0-i*0.22;if(q<0)continue;const k=back(clamp(q/0.35));heart(c,540+(i-1)*190,700-30*Math.sin(t*2+i),62*k,true);}
  if(t>t0+0.8)glowTxt(c,'× 3 LIVES',540,880,70,GOLD_C,{ls:8});vignette(c,0.5);};
SH.life1=function(c,t){lifeCard(c,t,A(6),1);};
// 5 · fortune teller points at Caesar in the dawn street
SH.seer=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#3a2a38'};street(c,t,{x:540,y:1020,z:1.0,mm:50},{dawn:1,world:(c2,GY)=>{
    const wx=lerp(980,820,inv(A(7),B(7),t));CAESAR({c:c2,x:wx,y:GY+220,s:1.75,f:-1,t,walk:1,ph:t*6,eyes:'open',brow:'flat',mouth:'flat'});
    SEER({c:c2,x:250,y:GY+560,s:2.9,f:1,t,eyes:'wide',brow:'angry',mouth:'o',hf:[86,-14],hb:[-30,90],lean:0.06});}});
  bubble(c,WT(7,2),t,360,680,170,'',(c2)=>{txt(c2,'BEWARE',0,-40,46,'#fff');txt(c2,'THE IDES',0,10,46,'#fff');txt(c2,'OF MARCH!',0,60,46,RED_C);},{tail:[300,1010]});vignette(c,0.5);};
// 6 · Calpurnia begs him (kneeling, reaching), then her dream: his statue bleeding
SH.calp=function(c,t){L2={dx:-1,rim:'#ffb070',amb:'#2a1a28'};villa(c,t,{x:540,y:1040,z:1.05,mm:85},{night:1,lampX:930,world:(c2,GY)=>{
    CAESAR({c:c2,x:690,y:GY+300,s:2.3,f:-1,t,eyes:'half',brow:'flat',mouth:'flat',hf:[-46,60],hb:[30,92]});
    CALP({c:c2,x:330,y:GY+330,s:2.2,f:1,t,crouch:60,lean:0.18,eyes:'open',brow:'worried',mouth:'frown',tear:1,hf:[84,-6],hb:[70,8]});}});vignette(c,0.55);};
SH.dream=function(c,t){L2={dx:1,rim:'#ff7a6a',amb:'#2a0a10'};const q=inv(TW('after'),A(9),t);c.fillStyle='#1a0608';c.fillRect(0,0,W,H);
  c.save();c.translate(540,1050);const z=lerp(1.0,1.12,eio(q));c.scale(z,z);c.translate(-540,-1050);dof(c,0,c2=>statue(c2,540,1420,1.6,t,{blood:eo(clamp(q*1.4))}));c.restore();
  redTint(c,0.4);dreamFrame(c,t,1);txt(c,'HER DREAM',540,560,46,'rgba(255,200,200,0.85)',{ls:10});vignette(c,0.6);F0(c,t,TW('after'),0.25);};
// 7 · ignores them both — waves it off, walks out into the light
SH.ignore=function(c,t){L2={dx:1,rim:'#ffe2b0',amb:'#3a2420'};const q=inv(A(9),B(9)+0.4,t);villa(c,t,{x:540,y:1040,z:1.0,mm:50},{winX:900,world:(c2,GY)=>{
    dof(c2,6,c3=>CALP({c:c3,x:180,y:GY+160,s:1.6,f:1,t,eyes:'open',brow:'worried',mouth:'frown',hf:[50,30]}));
    const wave=Math.sin(t*9)*12;CAESAR({c:c2,x:lerp(560,680,q),y:GY+330,s:2.3,f:1,t,walk:q>0.3?1:0,ph:t*6,eyes:'half',brow:'up',mouth:'smirk',hf:q>0.3?undefined:[78,-30+wave],hb:[-30,92]});}});
  vignette(c,0.45);};
// 8 · walks into the Senate among "friends"
SH.enter=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#3a2418'};const q=inv(A(10),B(10),t);
  const pos=[[60,1680,'senator',1],[250,1600,'cassius',1],[860,1600,'senator3',-1],[1030,1690,'senator2',-1],[700,1560,'brutus',-1]];
  senate(c,t,{x:540,y:pushZ(t,A(10),B(10),1080,1040),z:pushZ(t,A(10),B(10),0.78,0.86),mm:24},{world:(c2,GY)=>{
    for(const [x,y,k,f] of pos)S(k,{c:c2,x,y,s:1.25,f,t,view:'3q',eyes:'happy',brow:'flat',mouth:'smile',hf:[30,80]});
    CAESAR({c:c2,x:lerp(-80,470,eo(q)),y:1760,s:1.4,f:1,t,walk:q<0.98?1:0,ph:t*6,eyes:'happy',brow:'flat',mouth:'smile'});}});
  const z=pushZ(t,A(10),B(10),0.78,0.86),cy=pushZ(t,A(10),B(10),1080,1040);const scr=(x,y)=>[540+(x-540)*z,960+(y-cy)*z];
  pos.forEach(([x,y],i)=>{const [sx,sy]=scr(x,y-470*1.25);chip(c,WT(10,9)+i*0.08,t,'FRIEND',sx,sy,GRN_C,{size:30});});vignette(c,0.45);};
// 9 · Brutus steps forward (hand hidden behind his back), Caesar soft in the foreground
SH.brutus=function(c,t){L2={dx:-1,rim:'#ffc890',amb:'#2a1a20'};const q=eo(inv(A(12),A(12)+0.8,t));
  senate(c,t,{x:540,y:1000,z:1.15,mm:85},{noBench:0,world:(c2,GY)=>{
    BRUTUS({c:c2,x:lerp(560,600,q),y:lerp(1800,1960,q),s:lerp(2.6,3.1,q),f:-1,t,walk:q<1&&q>0?1:0,ph:t*5,eyes:'open',brow:'angry',mouth:'flat',hf:[-20,92],hb:[-34,70],
      propB:null});}});
  dof(c,9,c2=>CAESAR({c:c2,x:1040,y:2900,s:4.4,f:-1,t,back:true}));
  const fl=t>A(12)+0.5&&Math.floor(t*14)%2;chip(c,A(11)+0.05,t,fl?'??? ':'FRIEND',600,640,fl?RED_C:GRN_C,{size:40});vignette(c,0.5);};
// 10 · everyone had a knife — ring of senators raise 3D daggers, tags flip
SH.knives=function(c,t){L2={dx:1,rim:'#ff9a7a',amb:'#2a1418'};const t0=WT(14,0);const z=pushZ(t,A(13),B(14),0.95,1.12);
  const ring=[[250,1650,'cassius',1],[540,1590,'senator2',1],[830,1650,'senator3',-1],[90,1960,'senator',1],[990,1960,'brutus',-1]];
  senate(c,t,{x:540,y:1180,z,mm:35},{mood:t>t0?'blood':'day',world:(c2,GY)=>{
    const cz=()=>CAESAR({c:c2,x:540,y:1840,s:2.1,f:1,t,eyes:t>t0?'wide':'open',brow:t>t0?'up':'flat',mouth:t>t0?'o':'flat',sweat:t>t0?1:0,hf:[40,60],hb:[-40,60]});
    ring.forEach(([x,y,k,f],i)=>{if(i===3)cz();const up=eo(clamp((t-t0-i*0.07)/0.25));S(k,{c:c2,x,y,s:i<3?1.75:2.3,f,t,view:'3q',eyes:'angry',brow:'angry',mouth:'teeth',hf:[lerp(40,58,up),lerp(80,-62,up)],hb:[-30,92],
      propF:held('pugio_side',lerp(0.6,-1.35,up),{glint:t-t0+i*0.2})});});}});
  const scr=(x,y)=>[540+(x-540)*z,960+(y-1180)*z];ring.forEach(([x,y],i)=>{const [sx,sy]=scr(x,y-(i<3?1.75:2.3)*300);chip(c,A(13)+i*0.05,t,t>t0+i*0.07?'TRAITOR':'FRIEND',sx,sy,t>t0+i*0.07?RED_C:GRN_C,{size:28});});
  vignette(c,0.55);};
// 11 · 23 stab wounds — thrust rhythm, counter, red flashes
SH.stab=function(c,t){L2={dx:-1,rim:'#ff5a4a',amb:'#200a10'};const t0=A(15),t1=B(15),n=Math.min(23,Math.floor(1+inv(t0,t1,t)*22.99));
  c.fillStyle='#160608';c.fillRect(0,0,W,H);lightRays(c,540,-100,'255,80,60',0.2,5,2200,0.6);
  const hit=(t*9)%1;CAESAR({c,x:540,y:1770,s:3.0,f:1,t,eyes:'shock',brow:'up',mouth:'scream',sweat:1,lean:Math.sin(t*9*TAU)*0.05,hf:[54,40],hb:[-54,40]});
  blood(c,540,1420,70*(n/23),3,0.6);
  for(let i=0;i<4;i++){const ph=(t*2.2+i*0.25)%1,lunge=Math.sin(ph*Math.PI);const side=i%2?1:-1,yy=1240+i*85;const xh=540+side*lerp(560,170,lunge);
    creepKnife(c,540+side*900,yy+120,xh,yy,side>0?Math.PI+0.15:-0.15,1,{len:280,sleeve:'#3a2a2c'});}
  c.save();c.globalAlpha=0.3*(1-hit);c.fillStyle='#ff2020';c.fillRect(0,0,W,H);c.restore();
  counter(c,t0,t,n,'STAB WOUNDS',540,600,{col:RED_C});vignette(c,0.6);};
// 12 · Caesar was dead — at the foot of Pompey's statue, daggers dropped, heart shatters
SH.dead=function(c,t){L2={dx:1,rim:'#ffb08a',amb:'#200c10'};const q=inv(A(16),A(17),t);
  senate(c,t,{x:540,y:1180,z:pushZ(t,A(16),A(17),1.0,1.08),mm:50},{mood:'blood',noBench:1,world:(c2,GY)=>{
    blood(c2,560,1850,200,7,0.8);pivotFig(c2,'caesar',600,1850,1.7,-Math.PI/2,{t:0,eyes:'closed',brow:'worried',mouth:'flat',hf:[30,92],hb:[-30,92],noLaurel:1});
    blood(c2,560,1760,60,2,0.9);prop(c2,'laurel',840,1880,170,0.2,{alpha:0.95});prop(c2,'pugio_side',300,1900,190,0.3,{blood:1});prop(c2,'pugio_3q',760,1960,190,2.6,{blood:1});prop(c2,'pugio_side',980,1820,170,-2.9,{blood:1});}});
  livesHUD(c,t,3,{y:560,lose:WT(16,2)});if(t>WT(16,2)+0.3)glowTxt(c,'LIFE LOST',540,720,60,RED_C,{ls:10});
  vignette(c,0.6);const fo=clamp((t-(A(17)-0.6))/0.6);if(fo>0){c.fillStyle=`rgba(0,0,0,${fo})`;c.fillRect(0,0,W,H);}};
SH.life2=function(c,t){lifeCard(c,t,A(17),2);};
// 13 · wakes up — 3D Roman bed, sits up gasping
SH.wake=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a1a20'};const ts=WT(18,3)-0.1,u=eo(clamp((t-ts)/0.45));
  villa(c,t,{x:540,y:1040,z:1.08,mm:50},{winX:850,lamps:0,world:(c2,GY)=>{const bx=520,by=GY+260;prop(c2,'lectus',bx,by,1000,0);
    const mt=by-215;pivotFig(c2,'caesar',bx-80,mt-14+116*2.15,2.15,lerp(-Math.PI/2+0.06,-0.05,u),{t,cut:mt+4,noLaurel:1,eyes:u>0.2?'wide':'closed',brow:u>0.2?'up':'flat',mouth:u>0.2?'o':'flat',sweat:u>0.2?1:0,hf:u>0.3?[60,50]:[20,92],hb:[-40,80]});
    // blanket over the legs
    c2.save();const g=c2.createLinearGradient(0,mt-90,0,mt+40);g.addColorStop(0,'#8a2a5a');g.addColorStop(1,'#4a1030');c2.fillStyle=g;c2.strokeStyle=K2;c2.lineWidth=6;c2.beginPath();c2.moveTo(bx-110,mt+30);c2.quadraticCurveTo(bx-80,mt-80,bx+40,mt-70);c2.quadraticCurveTo(bx+300,mt-90,bx+470,mt-40);c2.lineTo(bx+480,mt+50);c2.closePath();c2.fill();c2.stroke();
    c2.strokeStyle='rgba(0,0,0,0.3)';c2.lineWidth=4;for(const k of [0,120,260]){c2.beginPath();c2.moveTo(bx+k,mt-70);c2.quadraticCurveTo(bx+k+40,mt-20,bx+k+20,mt+30);c2.stroke();}c2.restore();}});
  if(t>ts)livesHUD(c,t,2,{y:560});vignette(c,0.5);};
// 14 · same morning / same warnings / same day
SH.same1=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a1a20'};c.fillStyle='#120a0a';c.fillRect(0,0,W,H);calSlate(c,t,A(19),'AGAIN…','MARCH 15','SAME MORNING');
  loadFx(c,A(19)-0.05,t,0.5);vignette(c,0.5);};
SH.same2=function(c,t){c.fillStyle='#0c0a0e';c.fillRect(0,0,W,H);const pan=(x,draw,lab,t0)=>{const a=eo(clamp((t-t0)/0.3));c.save();c.globalAlpha=a;c.beginPath();rr(c,x,480,450,900,28);c.clip();draw();c.restore();c.save();c.globalAlpha=a;c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=5;rr(c,x,480,450,900,28);c.stroke();txt(c,lab,x+225,1440,40,'#fff');c.restore();};
  pan(50,()=>{street(c,t,{x:375,y:1200,z:0.75,mm:50},{dawn:1,world:(c2,GY)=>SEER({c:c2,x:300,y:GY+420,s:2.1,f:1,t,eyes:'wide',brow:'angry',mouth:'o',hf:[86,-14]})});},'THE SEER',A(20));
  pan(580,()=>{villa(c,t,{x:575,y:1180,z:0.75,mm:50},{night:1,noWin:1,world:(c2,GY)=>CALP({c:c2,x:700,y:GY+420,s:2.1,f:-1,t,eyes:'open',brow:'worried',mouth:'frown',tear:1,hf:[70,0]})});},'CALPURNIA',A(20)+0.12);
  stamp(c,WT(20,2),t,'SAME DAY',540,1650,{col:RED_C});};
// 15 · he remembers everything — ECU, knives orbit, memory kept
SH.remember=function(c,t){L2={dx:-1,rim:'#9fd8ff',amb:'#1a1a2a'};const q=inv(A(21),B(22),t);c.fillStyle='#0c0c16';c.fillRect(0,0,W,H);
  c.save();c.translate(540,1000);c.scale(lerp(1,1.08,eio(q)),lerp(1,1.08,eio(q)));c.translate(-540,-1000);
  for(let i=0;i<6;i++){const a=i/6*TAU+t*0.8,rx=470,ry=560;const x=540+Math.cos(a)*rx,y=1100+Math.sin(a)*ry;dof(c,Math.sin(a)>0?0:5,c2=>prop(c2,'pugio_side',x,y,220,a+Math.PI/2,{alpha:0.75,blood:0.6}));}
  CAESAR({c,x:540,y:2640,s:6.2,f:1,t,view:'front',eyes:t>A(22)?'sly':'open',brow:t>A(22)?'angry':'flat',mouth:'flat',hf:[30,94],hb:[-30,94]});c.restore();
  if(Math.floor(t*6)%4===0&&t<B(22)){c.save();c.globalAlpha=0.18;c.fillStyle=RED_C;c.fillRect(0,0,W,H);c.restore();}
  saveToast(c,WT(22,2),t,'MEMORY KEPT',1700,{dur:1.6,col:'#9fd8ff'});vignette(c,0.6);};
// 16 · so he stays home — on his 3D sella, guards at the door
SH.home=function(c,t){L2={dx:1,rim:'#ffdcb0',amb:'#2a1a20'};villa(c,t,{x:540,y:1060,z:1.0,mm:35},{winX:540,world:(c2,GY)=>{
    LEG({c:c2,x:130,y:GY+220,s:1.9,f:1,t,eyes:'open',brow:'angry',mouth:'flat',hf:[40,30],propF:held('gladius_side',-1.1)});LEG({c:c2,x:950,y:GY+220,s:1.9,f:-1,t,eyes:'open',brow:'angry',mouth:'flat',hf:[40,30],propF:held('gladius_side',-1.1)});
    prop(c2,'sella',540,GY+444,242,0);CAESAR({c:c2,x:540,y:GY+440,s:2.2,f:1,t,crouch:62,stance:34,eyes:'half',brow:'flat',mouth:'smirk',hf:[-6,62],hb:[8,62]});}});
  chip(c,WT(23,3),t,'STAYING HOME',540,640,GOLD_C,{size:40});vignette(c,0.45);};
// 17 · assassins arrive — empty chair, confusion, panic
SH.arrive=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1a20'};const tf=WT(25,0),tp=WT(25,4);const q=inv(A(24),tf,t);
  senate(c,t,{x:540,y:1160,z:0.95,mm:35},{world:(c2,GY)=>{prop(c2,'sella',540,1720,260,0);
    const g=[['brutus',lerp(-150,260,q),1880],['cassius',lerp(-300,120,q),1960],['senator2',lerp(1250,860,q),1900],['senator3',lerp(1400,1000,q),1980]];
    g.forEach(([k,x,y],i)=>{const pan=t>tp;S(k,{c:c2,x,y,s:1.8,f:x<540?1:-1,t,walk:q<1?1:0,ph:t*6+i,view:'3q',eyes:t>tf?(pan?'wide':'open'):'sly',brow:t>tf?'up':'angry',mouth:pan?'scream':'flat',sweat:pan?1:0,look:pan?[i%2?1:-1,0]:[x<540?1:-1,0],lean:pan?Math.sin(t*20+i)*0.04:0,hf:[30,70]});});}});
  if(t>tf)bigQ(c,540,1180,0.9*back(clamp((t-tf)/0.3)),t);vignette(c,0.45);};
// 18 · their plan: a mission scroll by candlelight
SH.plan=function(c,t){L2={dx:1,rim:'#ffb070',amb:'#1a1014'};c.fillStyle='#120c0a';c.fillRect(0,0,W,H);
  dof(c,7,c2=>{['brutus','cassius','senator2'].forEach((k,i)=>S(k,{c:c2,x:200+i*340,y:1600,s:2.1,f:i<1?1:-1,t,view:'3q',eyes:'sly',brow:'angry',mouth:'flat',look:[0,1]}));});
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1200,0,540,1200,700);g.addColorStop(0,'rgba(255,170,80,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  prop(c,'scroll_open',540,1250,620,0);const ln=[['THE PLAN',62,'#5a1a0a',A(26)],['TARGET: CAESAR',40,'#3a2010',WT(26,4)],['PLACE: THE SENATE',40,'#3a2010',WT(26,6)],['TIME: MARCH 15',40,'#3a2010',WT(26,6)+0.3],['IN PUBLIC',50,'#a81c1c',WT(26,7)]];
  ln.forEach(([s,sz,col,t0],i)=>{if(t<t0)return;c.save();c.globalAlpha=clamp((t-t0)/0.2);c.font=`900 ${sz}px "Inter Display"`;c.textAlign='center';c.fillStyle=col;c.letterSpacing='4px';c.fillText(s,540,1020+i*95);c.restore();});
  candle(c,880,1700,true,t,0);vignette(c,0.55);};
// 19 · no idea what to do next — TARGET NOT FOUND
SH.noidea=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1a20'};senate(c,t,{x:540,y:1180,z:1.0,mm:50},{world:(c2,GY)=>{prop(c2,'sella',540,1700,260,0);
    [['brutus',260,1940],['cassius',820,1960]].forEach(([k,x,y],i)=>S(k,{c:c2,x,y,s:2.1,f:x<540?1:-1,t,view:'3q',eyes:'open',brow:'worried',mouth:'frown',sweat:1,hf:[48,-58+Math.sin(t*10+i)*6]}));}});
  const k=clamp((t-A(27)-0.2)/0.2);if(k>0){c.save();c.globalAlpha=k;const gl=Math.floor(t*20)%7===0?14:0;c.fillStyle='rgba(30,4,6,0.85)';c.fillRect(0,860+gl,W,200);glowTxt(c,'TARGET NOT FOUND',540+gl,960,70,RED_C,{ls:6});c.restore();}
  bigQ(c,260,1150,0.6,t);bigQ(c,820,1150,0.6,t+1);vignette(c,0.5);};
// 20 · Caesar makes a mistake
SH.mistake=function(c,t){L2={dx:-1,rim:'#ff9a7a',amb:'#2a1418'};villa(c,t,{x:540,y:1000,z:pushZ(t,A(28),B(28),1.0,1.12),mm:85},{world:(c2,GY)=>CAESAR({c:c2,x:540,y:2180,s:4.0,f:1,t,eyes:'half',brow:'flat',mouth:'smirk',hf:[30,92],hb:[-30,92]})});
  warnBar(c,WT(28,3),t,'MISTAKE',{y:1620,end:B(28)+0.3});vignette(c,0.55);};
// 21 · assumes he's safe — lounges with a real goblet
SH.safe=function(c,t){L2={dx:1,rim:'#ffdcb0',amb:'#2a1a20'};const tg=WT(29,6);villa(c,t,{x:540,y:1080,z:1.0,mm:50},{world:(c2,GY)=>{prop(c2,'sella',540,GY+444,248,0);
    CAESAR({c:c2,x:540,y:GY+440,s:2.25,f:1,t,crouch:62,stance:34,lean:-0.08,eyes:'happy',brow:'up',mouth:'smile',hf:[48,20+Math.sin(t*2)*4],hb:[-40,70],propF:held('goblet',0,{len:46,noFlip:1})});}});
  const glitch=t>B(29)-0.4;chip(c,tg,t,glitch&&Math.floor(t*16)%2?'SAFE?':'SAFE ✓',540,1720,glitch?RED_C:GRN_C,{size:48});vignette(c,0.45);};
// 22 · conspirators disappear into Rome at night
SH.vanish=function(c,t){L2={dx:-1,rim:'#ff9a50',amb:'#1a1a30'};const q=inv(A(30),B(30),t);street(c,t,{x:540,y:1040,z:1.0,mm:50},{night:1,world:(c2,GY)=>{
    for(let i=0;i<3;i++){const x=lerp(380+i*150,760+i*90,q),a=1-clamp((q-0.45-i*0.12)/0.35);if(a<=0)continue;c2.save();c2.globalAlpha=a;S('hooded',{c:c2,x,y:GY+330-i*40,s:2.3-i*0.15,f:1,t,walk:1,ph:t*5+i,back:true});c2.restore();}}});
  vignette(c,0.6);};
// 23 · gather support, turn the Senate — whispers, support meter drains
SH.turn=function(c,t){L2={dx:1,rim:'#ffb070',amb:'#2a1418'};const q=inv(A(31),B(31),t);senate(c,t,{x:540,y:1160,z:1.0,mm:50},{turn:q>0.5?-1:0,world:(c2,GY)=>{
    S('cassius',{c:c2,x:330,y:1950,s:2.2,f:1,t,view:'3q',eyes:'sly',brow:'angry',mouth:'smirk',lean:0.12,hf:[44,10]});S('senator',{c:c2,x:620,y:1950,s:2.2,f:-1,t,view:'3q',eyes:q>0.5?'angry':'open',brow:q>0.5?'angry':'up',mouth:'flat',look:[-1,0]});
    BRUTUS({c:c2,x:900,y:2050,s:2.3,f:-1,t,view:'3q',eyes:'sly',brow:'flat',mouth:'flat'});}});
  statBar(c,540,1680,640,'SENATE SUPPORT',lerp(0.9,0.12,eo(q)),q>0.5?RED_C:GOLD_C);vignette(c,0.5);};
// 24 · power collapsing — at the night window, POWER bar cracks
SH.collapse=function(c,t){L2={dx:-1,rim:'#9fb8ff',amb:'#14142a'};const q=inv(A(32),B(32),t);villa(c,t,{x:540,y:1040,z:pushZ(t,A(32),B(32),1.0,1.1),mm:85},{night:1,winX:540,lamps:0,world:(c2,GY)=>CAESAR({c:c2,x:540,y:1940,s:3.0,f:1,t,back:true})});
  statBar(c,540,1660,640,'POWER',lerp(1,0.08,eio(q)),q>0.4?RED_C:GOLD_C,{crack:q>0.5});if(q>0.5){c.save();c.globalAlpha=0.12*Math.abs(Math.sin(t*8));c.fillStyle=RED_C;c.fillRect(0,0,W,H);c.restore();}vignette(c,0.6);};
// 25 · he survived the knives — studies a dagger in his hand
SH.survived=function(c,t){L2={dx:1,rim:'#ffcf8a',amb:'#1a1418'};villa(c,t,{x:540,y:1000,z:1.0,mm:135},{night:1,world:(c2,GY)=>CAESAR({c:c2,x:540,y:2190,s:4.2,f:1,t,eyes:'half',brow:'worried',mouth:'flat',look:[1,1],hf:[60,40],hb:[-30,92],propF:held('pugio_side',-0.25,{glint:t})})});vignette(c,0.55);};
// 26 · but he's losing Rome — tiny on the balcony, the city burning; heart breaks
SH.losing=function(c,t){L2={dx:1,rim:'#ff8a50',amb:'#1a0c0c'};burning(c,t,{x:540,y:1100,z:0.85,mm:24},{world:(c2,GY)=>{c2.fillStyle='#0a0606';c2.fillRect(560,1620,520,40);c2.fillRect(560,1660,520,600);
    CAESAR({c:c2,x:760,y:1620,s:1.1,f:-1,t,back:true});}});
  livesHUD(c,t,2,{y:560,lose:A(35)-0.55});vignette(c,0.55);const fo=clamp((t-(A(35)-0.4))/0.4);if(fo>0){c.fillStyle=`rgba(0,0,0,${fo})`;c.fillRect(0,0,W,H);}};
SH.life3=function(c,t){lifeCard(c,t,A(35),3);};
// 27 · understands something important
SH.understand=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#2a2018'};c.fillStyle='#120e0a';c.fillRect(0,0,W,H);const q=inv(A(36),B(36),t);
  lightRays(c,540,-200,'255,220,150',0.25*q,7,2200,0.6);CAESAR({c,x:540,y:2360,s:lerp(4.6,5.0,eio(q)),f:1,t,eyes:'sly',brow:'up',mouth:'flat',hf:[30,92],hb:[-30,92]});livesHUD(c,t,1,{y:560});vignette(c,0.55);};
// 28 · the problem was never just the assassination — the 3D dagger, crossed out
SH.problem=function(c,t){c.fillStyle='#0c0a0c';c.fillRect(0,0,W,H);dustMotes(c,t,30,'255,220,200',0.4);const a=Math.sin(t*0.9)*0.2-0.5;prop(c,'pugio_3q',540,1000,760,a,{glint:t*0.6,anc:[0.5,0.5]});
  if(t>WT(37,3)){bigX(c,540,1000,260,clamp((t-WT(37,3))/0.3));c.save();c.globalAlpha=clamp((t-WT(37,3))/0.3);txt(c,'NOT THE REAL PROBLEM',540,1400,52,'#fff',{ls:4});c.restore();}vignette(c,0.5);};
// 29 · it was the people around him — medallion board with red string
SH.people=function(c,t){c.fillStyle='#1a1210';c.fillRect(0,0,W,H);for(let i=0;i<300;i++){c.fillStyle=`rgba(255,240,220,${hash(i)*0.04})`;c.fillRect(hash(i*3)*W,hash(i*7)*H,6,6);}
  const P=[[230,760,'brutus','BRUTUS'],[850,760,'cassius','CASSIUS'],[200,1560,'senator2','CASCA'],[880,1560,'senator3','CIMBER']];const t0=A(38);
  P.forEach(([x,y],i)=>{const k=clamp((t-t0-0.2-i*0.12)/0.3);if(k<=0)return;c.save();c.strokeStyle='#c81a1a';c.lineWidth=6;c.beginPath();c.moveTo(540,1160);c.lineTo(lerp(540,x,k),lerp(1160,y,k));c.stroke();c.restore();});
  medal(c,540,1160,150,'caesar',t,{label:'CAESAR',bg:'#4a2a3a'});P.forEach(([x,y,k,l],i)=>{if(t>t0+i*0.12)medal(c,x,y,110,k,t,{label:l,eyes:'sly',brow:'angry',bg:'#2a2a3a'});});vignette(c,0.5);};
// 30 · he had pardoned his enemies (sepia flashback)
SH.pardon=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#3a2a20'};forum(c,t,{x:540,y:1060,z:0.95,mm:50},{world:(c2,GY)=>{
    CAESAR({c:c2,x:760,y:GY+300,s:2.2,f:-1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[74,10],hb:[-30,92]});
    ['senator','senator2','cassius'].forEach((k,i)=>S(k,{c:c2,x:150+i*170,y:GY+300+i*40,s:1.9,f:1,t,view:'3q',crouch:55,lean:0.25,eyes:'closed',brow:'worried',mouth:'flat',hf:[40,30],hb:[30,40]}));}});
  sepia(c,0.7);['senator','senator2','cassius'].forEach((k,i)=>stamp(c,WT(39,4)+i*0.25,t,'PARDONED',150+i*170+60,1420+i*40,{col:GRN_C,rot:-0.15,size:44}));vignette(c,0.55);};
// 31 · even Brutus — forgiven and handed power (a sealed 3D scroll)
SH.brutusPardon=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#3a2a20'};const q=eo(inv(A(40),WT(40,6),t));villa(c,t,{x:540,y:1060,z:1.0,mm:85},{world:(c2,GY)=>{
    BRUTUS({c:c2,x:290,y:GY+380,s:2.5,f:1,t,lean:0.12,eyes:'open',brow:'flat',mouth:'smile',hf:[lerp(30,96,q),lerp(70,10,q)],hb:[-30,92]});
    CAESAR({c:c2,x:780,y:GY+380,s:2.5,f:-1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[lerp(40,88,q),10],hb:[-30,92],propF:held('rolled',0.1,{len:64})});}});
  sepia(c,0.7);chip(c,WT(40,7),t,'GIVEN POWER',540,620,GOLD_C,{size:44});vignette(c,0.55);};
// 32 · isn't forgiving anyone — the pardon burns in his hand
SH.nomercy=function(c,t){L2={dx:-1,rim:'#ff7a50',amb:'#1a0c0c'};const tb=WT(41,4);villa(c,t,{x:540,y:1000,z:pushZ(t,A(41),B(41),1.0,1.1),mm:135},{night:1,world:(c2,GY)=>{
    const r=CAESAR({c:c2,x:540,y:2210,s:4.2,f:1,t,eyes:'angry',brow:'angry',mouth:'flat',hf:[70,40],hb:[-30,92],propF:held('rolled',-0.3,{len:66})});
    if(t>tb&&r){const k=clamp((t-tb)/0.5);for(let i=0;i<3;i++)fireTongue(c2,r.hf.x+40+i*30,r.hf.y-20,120*k,40*k,t,i);}}});
  stamp(c,WT(41,5),t,'NO MERCY',540,1680,{col:RED_C,size:80});vignette(c,0.55);};
// 33 · before the Ides of March
SH.ides=function(c,t){c.fillStyle='#0a0a14';c.fillRect(0,0,W,H);c.fillStyle='#f4f0d8';c.beginPath();c.arc(800,520,60,0,TAU);c.fill();calSlate(c,t,A(42),'THE NIGHT BEFORE','MARCH 14','',GOLD_C);vignette(c,0.5);};
// 34 · arrests — legionaries with torches & gladii drag Brutus away
SH.arrest=function(c,t){L2={dx:-1,rim:'#ff9a50',amb:'#1a1a30'};const q=inv(A(43),TW('seizes'),t);street(c,t,{x:540,y:1060,z:1.0,mm:35},{night:1,world:(c2,GY)=>{const dx=lerp(0,-160,q);
    LEG({c:c2,x:820+dx,y:GY+300,s:2.1,f:-1,t,walk:1,ph:t*5,eyes:'angry',brow:'angry',mouth:'flat',hf:[44,-10],propF:(c3,h,s)=>{prop(c3,'torch',h.x,h.y,46*s,0.15);fireTongue(c3,h.x+6*s,h.y-74*s,60*s,22*s,t,1);}});
    BRUTUS({c:c2,x:540+dx,y:GY+330,s:2.1,f:-1,t,walk:1,ph:t*5+1,lean:0.12,eyes:'wide',brow:'worried',mouth:'frown',sweat:1,hf:[8,52],hb:[-8,52]});
    c2.strokeStyle='#8a6a3a';c2.lineWidth=8;c2.beginPath();c2.moveTo(540+dx,GY+330-160*2.1);c2.lineTo(820+dx,GY+300-160*2.1);c2.stroke();
    LEG({c:c2,x:260+dx,y:GY+300,s:2.1,f:1,t,walk:1,ph:t*5+2,eyes:'angry',brow:'angry',mouth:'flat',hf:[30,30],propF:held('gladius_side',-0.9)});}});
  chip(c,WT(43,3),t,'ARRESTED',540,620,RED_C,{size:44});vignette(c,0.55);};
// 35 · seizes their letters
SH.letters=function(c,t){L2={dx:1,rim:'#ffb070',amb:'#1a1014'};c.fillStyle='#140e0c';c.fillRect(0,0,W,H);
  c.fillStyle='#4a2a18';c.fillRect(0,1500,W,600);c.fillStyle='#6a4024';c.fillRect(0,1480,W,30);
  prop(c,'scroll_open',540,1020,520,0);['BRUTUS','CASSIUS','CASCA','CIMBER','TREBONIUS'].forEach((n,i)=>{if(t<TW('seizes')+0.1+i*0.12)return;c.save();c.font='900 40px "Inter Display"';c.textAlign='center';c.fillStyle='#3a1a0a';c.fillText(n,540,860+i*72);c.restore();});
  for(let i=0;i<5;i++)prop(c,'rolled',170+i*190,1560+(i%2)*40,230,(hash(i)-0.5)*0.6);
  stamp(c,TW('seizes')+0.3,t,'EVIDENCE',540,1320,{col:RED_C,size:70});candle(c,960,1490,true,t,0);vignette(c,0.55);};
// 36 · the Senate turns against them
SH.senateTurn=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};senate(c,t,{x:540,y:1160,z:1.0,mm:35},{turn:1,world:(c2,GY)=>{
    BRUTUS({c:c2,x:420,y:1900,s:1.9,f:1,t,eyes:'wide',brow:'worried',mouth:'frown',sweat:1,hf:[8,52],hb:[-8,52]});S('cassius',{c:c2,x:660,y:1900,s:1.9,f:-1,t,eyes:'wide',brow:'worried',mouth:'frown',sweat:1,hf:[8,52],hb:[-8,52]});
    S('senator3',{c:c2,x:90,y:2080,s:2.3,f:1,t,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[96,-20]});S('senator',{c:c2,x:1000,y:2080,s:2.3,f:-1,t,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[96,-20]});}});
  chip(c,TW('turns')+0.3,t,'GUILTY',420,1060,RED_C,{size:34});chip(c,TW('turns')+0.45,t,'GUILTY',660,1060,RED_C,{size:34});vignette(c,0.5);};
// 37 · the assassination never happens — he walks in, empty seats
SH.never=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2418'};const q=inv(A(44),B(44),t);senate(c,t,{x:540,y:1120,z:0.9,mm:35},{empty:1,world:(c2,GY)=>CAESAR({c:c2,x:lerp(200,520,eo(q)),y:1880,s:1.9,f:1,t,walk:q<1?1:0,ph:t*6,eyes:'open',brow:'flat',mouth:'smirk'})});
  const k=clamp((t-WT(44,2))/0.3);if(k>0){c.save();c.globalAlpha=k;prop(c,'pugio_side',540,640,300,-0.2,{anc:[0.5,0.5]});c.restore();bigX(c,540,640,110,k);}vignette(c,0.45);};
// 38 · and Caesar survives
SH.survives=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#2a2018'};c.fillStyle='#14100a';c.fillRect(0,0,W,H);lightRays(c,540,-200,'255,220,140',0.3,9,2400,0.7);dustMotes(c,t,40,'255,230,170',0.6);
  CAESAR({c,x:540,y:2030,s:3.6,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[30,92],hb:[-30,92]});livesHUD(c,t,1,{y:560,r:44});saveToast(c,WT(45,1),t,'SURVIVED',1680,{dur:1.6,col:GOLD_C});vignette(c,0.5);};
// 39 · nobody dares challenge him — the Senate bows to the man on the dais
SH.bow=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#2a1418'};const q=eo(inv(A(46),A(47)+0.6,t));senate(c,t,{x:540,y:1180,z:0.95,mm:24},{noBench:1,world:(c2,GY)=>{
    c2.fillStyle=marbleG(c2,240,840,'#d8c8ac',-0.4);c2.fillRect(240,1500,600,120);c2.strokeStyle=K2;c2.lineWidth=5;c2.strokeRect(240,1500,600,120);prop(c2,'sella',540,1519,170,0);
    CAESAR({c:c2,x:540,y:1515,s:1.55,f:1,t,crouch:62,stance:34,eyes:'half',brow:'flat',mouth:'smirk',hf:[60,50],hb:[-60,50]});
    for(let r=0;r<2;r++)for(let i=0;i<4;i++){const x=150+i*260+(r?130:0),y=1900+r*190;S(SENATORS[(i+r)%4],{c:c2,x,y,s:1.7+r*0.2,f:x<540?1:-1,t,view:'3q',lean:0.55*q*(x<540?1:-1),crouch:30*q,eyes:'closed',brow:'worried',mouth:'flat',hf:[20,60],hb:[-10,60]});}}});vignette(c,0.45);};
// 40 · campaign against Parthia — legions march under the eagles
SH.parthia=function(c,t){L2={dx:-1,rim:'#fff0c0',amb:'#4a3020'};desert(c,t,{x:540+t*20%40,y:1050,z:0.95,mm:24},{world:(c2,GY)=>{
    for(let r=0;r<3;r++)for(let i=-1;i<6;i++){const x=i*210+r*90-((t*90)%210),y=GY+90+r*150;LEG({c:c2,x,y,s:1.25+r*0.2,f:1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'flat',hf:[30,30],propF:held('gladius_side',-1.3,{len:150})});}
    aquila(c2,240,GY-520,1.0,t);aquila(c2,820,GY-560,1.0,t+1);
    CAESAR({c:c2,x:560,y:GY+640,s:2.3,f:1,t,walk:1,ph:t*6,eyes:'angry',brow:'angry',mouth:'flat',hf:[66,-50],propF:held('gladius_side',-1.0)});}});
  txt(c,'PARTHIA',540,560,72,GOLD_C,{ls:14});vignette(c,0.45);};
SH.map=function(c,t){const q=inv(TW('expands'),TW('eventually'),t);romeMap(c,t,0.6+q*0.3,{east:eo(q),z:lerp(1,1.15,q)});txt(c,'TERRITORY +'+Math.round(eo(q)*42)+'%',540,1650,64,GOLD_C);vignette(c,0.4);};
SH.dynasty=function(c,t){c.fillStyle='#14100c';c.fillRect(0,0,W,H);const t0=TW('eventually');lightRays(c,540,-100,'255,210,140',0.18,7,2200,0.6);
  const N=[[540,720,'caesar'],[270,1160,'brutus'],[810,1160,'senator2'],[270,1580,'cassius'],[810,1580,'senator']];
  [[0,1],[0,2],[1,3],[2,4]].forEach(([a,b],i)=>{const k=clamp((t-t0-0.2-i*0.18)/0.25);if(k<=0)return;c.strokeStyle=GOLD_C;c.lineWidth=7;c.beginPath();c.moveTo(N[a][0],N[a][1]);c.lineTo(lerp(N[a][0],N[b][0],k),lerp(N[a][1],N[b][1],k));c.stroke();});
  N.forEach(([x,y,k],i)=>{if(t<t0+i*0.18)return;medal(c,x,y,i?100:140,k,t,{bg:'#3a2a20',label:i?'HEIR':'CAESAR',eyes:'happy'});if(i){prop(c,'laurel',x,y-80,120,0,{alpha:0.9});}});
  chip(c,WT(48,13),t,'DYNASTY FOUNDED',540,1880,GOLD_C,{size:40});};
// 41 · the Republic still exists on paper
SH.paper=function(c,t){c.fillStyle='#16120e';c.fillRect(0,0,W,H);dustMotes(c,t,30,'255,230,180',0.4);prop(c,'scroll_open',540,1060,720,0);
  [['SENATVS',60],['POPVLVSQVE',60],['ROMANVS',60],['— THE REPUBLIC —',44]].forEach(([s,sz],i)=>{c.save();c.font=`900 ${sz}px "Inter Display"`;c.textAlign='center';c.letterSpacing='6px';c.fillStyle=i===3?'#8a1a1a':'#3a2010';c.fillText(s,540,830+i*110);c.restore();});
  chip(c,WT(49,4),t,'STILL ACTIVE ✓',540,1620,GRN_C,{size:42});vignette(c,0.5);};
// 42 · in reality, a monarchy — a real gold crown settles on his head
SH.monarchy=function(c,t){L2={dx:1,rim:'#ffd070',amb:'#2a1a10'};const tc=WT(50,6)-0.5,k=eo(clamp((t-tc)/0.5));c.fillStyle='#1a0e0a';c.fillRect(0,0,W,H);lightRays(c,540,-200,'255,200,100',0.25,9,2400,0.6);
  prop(c,'sella',540,1774,352,0);const r=CAESAR({c,x:540,y:1770,s:3.2,f:1,t,crouch:62,stance:34,eyes:'sly',brow:'up',mouth:'smirk',hf:[64,60],hb:[-64,60],noLaurel:k>0.6});
  if(r&&t>tc-0.6){prop(c,'crown',r.hc.x,lerp(r.hc.y-500,r.hc.y-27*3.2*0.95,k),27*3.2*2.5,0,{anc:[0.5,0.62]});}
  if(k>=1){c.save();c.globalCompositeOperation='lighter';c.globalAlpha=0.5*(1-clamp((t-tc-0.5)/0.6));c.fillStyle='#ffd070';c.fillRect(0,0,W,H);c.restore();}
  chip(c,WT(50,6),t,'KING IN ALL BUT NAME',540,1660,GOLD_C,{size:40});vignette(c,0.55);};
// 43 · the irony — Brutus alone with his dagger (200mm)
SH.irony=function(c,t){L2={dx:-1,rim:'#9fb8ff',amb:'#14142a'};c.fillStyle='#0e0e18';c.fillRect(0,0,W,H);bokeh(c,t,8,'160,180,255',4);
  BRUTUS({c,x:540,y:2250,s:4.6,f:1,t,eyes:'half',brow:'worried',mouth:'flat',look:[1,1],hf:[66,46],hb:[-30,92],propF:held('pugio_side',-0.15,{glint:t})});vignette(c,0.6);};
// 44 · they killed him to save the Republic
SH.killed=function(c,t){L2={dx:1,rim:'#ff9a7a',amb:'#2a1418'};const ring=[[250,1650,'cassius',1],[540,1590,'senator2',1],[830,1650,'senator3',-1],[90,1960,'senator',1],[990,1960,'brutus',-1]];
  senate(c,t,{x:540,y:1180,z:pushZ(t,A(52),B(52),0.95,1.05),mm:35},{mood:'blood',world:(c2,GY)=>{
    ring.forEach(([x,y,k,f],i)=>{if(i===3)CAESAR({c:c2,x:540,y:1840,s:2.1,f:1,t,eyes:'wide',brow:'up',mouth:'o',hf:[40,60],hb:[-40,60]});S(k,{c:c2,x,y,s:i<3?1.75:2.3,f,t,view:'3q',eyes:'angry',brow:'angry',mouth:'teeth',hf:[58,-62],hb:[-30,92],propF:held('pugio_side',-1.35)});});}});
  sepia(c,0.35);if(t>WT(52,9)){c.save();c.globalAlpha=clamp((t-WT(52,9))/0.3);c.fillStyle='rgba(10,6,6,0.8)';c.fillRect(0,1580,W,180);txt(c,'“TO SAVE THE REPUBLIC”',540,1670,54,'#fff');c.restore();}vignette(c,0.55);};
// 45 · civil wars destroy it anyway
SH.civil=function(c,t){L2={dx:1,rim:'#ff7a40',amb:'#1a0806'};burning(c,t,{x:540,y:1100,z:pushZ(t,A(53),B(53),0.95,1.05),mm:35},{world:(c2,GY)=>{
    for(let i=0;i<4;i++){const x=120+i*260,cl=Math.sin(t*6+i)*0.5+0.5;LEG({c:c2,x:x-60,y:GY+200,s:1.5,f:1,t,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[60,lerp(-40,20,cl)],propF:held('gladius_side',lerp(-1.2,-0.1,cl),{len:150})});}}});
  const k=clamp((t-WT(53,7))/0.4);if(k>0){c.save();c.globalAlpha=k;prop(c,'scroll_open',540,1650,300,0.1);fireTongue(c,540,1760,220,120,t,3);c.restore();}
  chip(c,WT(53,4),t,'CIVIL WARS',540,640,RED_C,{size:48});vignette(c,0.55);};
// 46 · with three lives, he might have saved himself
SH.saved=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#1a1410'};const q=inv(A(54),B(55),t);c.fillStyle='#100c0a';c.fillRect(0,0,W,H);lightRays(c,540,-200,'255,210,140',0.2,7,2400,0.5);
  c.save();const z=lerp(1,1.1,eio(q));c.translate(540,1400);c.scale(z,z);c.translate(-540,-1400);prop(c,'sella',540,1794,330,0);CAESAR({c,x:540,y:1790,s:3.0,f:1,t,crouch:62,stance:34,eyes:'half',brow:'flat',mouth:'flat',hf:[60,60],hb:[-60,60]});c.restore();
  livesHUD(c,t,1,{y:560,r:44});vignette(c,0.6);};
// 47 · ...but the Republic never got a fourth — its lives are gone; fade to black
SH.fourth=function(c,t){c.fillStyle='#08080c';c.fillRect(0,0,W,H);dustMotes(c,t,30,'200,200,220',0.3);const t4=TW('fourth');
  c.save();c.globalAlpha=0.9;column(c,540,620,1460,180,'#cfc6b4');c.restore();if(t>WT(56,6)){c.save();c.strokeStyle='#0a0a0a';c.lineWidth=8;const k=clamp((t-WT(56,6))/0.8);c.beginPath();c.moveTo(500,700);c.lineTo(lerp(500,560,k),lerp(700,900,k));c.lineTo(lerp(560,490,k),lerp(900,1150,k));c.lineTo(lerp(490,580,k),lerp(1150,1400,k));c.stroke();c.restore();}
  txt(c,'THE REPUBLIC',540,1600,70,'#fff',{ls:10});livesHUD(c,t,0,{y:1760,r:40});
  if(t>t4-0.4){const k=clamp((t-t4+0.4)/0.4);heart(c,540,1930,56*k,false,{flash:Math.floor(t*8)%2});txt(c,'4TH LIFE?',540,2050-140,40,'#ff6a60');}
  vignette(c,0.6);const fo=clamp((t-(END-1.3))/1.2);if(fo>0){c.fillStyle=`rgba(0,0,0,${fo})`;c.fillRect(0,0,W,H);}};
SHOTS=[[0,'hook'],[A(1),'date'],[A(3),'power'],[A(4),'warned'],[A(5),'three'],[A(6),'life1'],[A(7),'seer'],[A(8),'calp'],[TW('after'),'dream'],[A(9),'ignore'],[A(10),'enter'],[A(11),'brutus'],[A(13),'knives'],[A(15),'stab'],[A(16),'dead'],
  [A(17),'life2'],[A(18),'wake'],[A(19),'same1'],[A(20),'same2'],[A(21),'remember'],[A(23),'home'],[A(24),'arrive'],[A(26),'plan'],[A(27),'noidea'],[A(28),'mistake'],[A(29),'safe'],[A(30),'vanish'],[A(31),'turn'],[A(32),'collapse'],[A(33),'survived'],[A(34),'losing'],
  [A(35),'life3'],[A(36),'understand'],[A(37),'problem'],[A(38),'people'],[A(39),'pardon'],[A(40),'brutusPardon'],[A(41),'nomercy'],[A(42),'ides'],[A(43),'arrest'],[TW('seizes'),'letters'],[TW('turns'),'senateTurn'],[A(44),'never'],[A(45),'survives'],[A(46),'bow'],
  [A(48),'parthia'],[TW('expands'),'map'],[TW('eventually'),'dynasty'],[A(49),'paper'],[A(50),'monarchy'],[A(51),'irony'],[A(52),'killed'],[A(53),'civil'],[A(54),'saved'],[A(56),'fourth']].map(([a,n])=>[a-0.12>0?a-0.12:a,n]);
IMPACTS=[[WT(14,0),14,0.4,'#ffffff',0.35],[A(15),18,1.6],[WT(16,2),10,0.4,'#ff3b30',0.3],[WT(18,3),10,0.3],[WT(41,5),10,0.3],[TW('seizes')+0.3,8,0.25],[WT(50,6),8,0.3,'#ffd070',0.3]];
