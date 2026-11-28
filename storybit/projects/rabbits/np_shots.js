'use strict';
// ===== "What if Napoleon had a respawn point?" — Style 3 =====
SH={};
KEY.clear();['RESPAWNS.','RESPAWN.','WATERLOO.','STOPS.'].forEach(k=>KEY.add(k));
function S2(kind,o){return fig2(o.c,{kind,view:'front',...o});}
const F0=(c,t,t0,d=0.3)=>{const a=1-clamp((t-t0)/d);if(a>0){c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);}};
const pushZ=(t,t0,t1,z0,z1)=>lerp(z0,z1,eio(inv(t0,t1,t)));
const MUSK=106/1236;// unused helper ratio
// musket held upright beside the body (shoulder arms) / levelled for a charge
const mUp=(o={})=>(c,h,s,f)=>prop(c,'musket',h.x,h.y,(o.len||290)*s,f>0?-Math.PI/2+0.12:-Math.PI/2-0.12,{anc:[0.16,0.5]});
const mCharge=(o={})=>(c,h,s,f)=>prop(c,'musket',h.x,h.y,290*s,f>0?0.08:Math.PI-0.08,{anc:[0.16,0.5],flip:f<0});
function muzzle(c,t,t0,x,y,s=1,dir=1){const a=t-t0;if(a<0||a>1.2)return;const k=1-a/1.2;c.save();if(a<0.15){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,160*s);g.addColorStop(0,'rgba(255,240,200,1)');g.addColorStop(0.4,'rgba(255,170,60,0.8)');g.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=g;c.fillRect(x-160*s,y-160*s,320*s,320*s);c.globalCompositeOperation='source-over';}
  for(let i=0;i<8;i++){c.fillStyle=`rgba(230,226,220,${0.7*k})`;c.beginPath();c.arc(x+dir*(a*260+i*20)*s,y-a*80*s+(hash(i)-0.5)*40*s,(30+a*120+hash(i)*30)*s,0,TAU);c.fill();}c.restore();}
function cannonAt(c,t,x,y,len,tf){prop(c,'cannon',x,y,len,0,{anc:[0.5,0.82]});if(tf!=null)for(const t0 of [].concat(tf))muzzle(c,t,t0,x+len*0.43,y-len*0.27,len/500,1);}
function telesc(c,h,s,f){prop(c,'telescope',h.x,h.y,92*s,f>0?-0.25:Math.PI+0.25,{anc:[0.25,0.5]});}

// 0 · could just try again — Napoleon on the smoky field, a TRY AGAIN button lights up
SH.hook=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#3a2a20'};const z=pushZ(t,0,A(3),1.0,1.1);
  field(c,t,{x:540,y:1150,z,mm:85},{sky:'dusk',world:(c2,GY)=>NAP({c:c2,x:540,y:2280,s:3.7,f:1,t,eyes:t>A(1)?'sly':'open',brow:'flat',mouth:t>A(2)?'smirk':'flat',hf:[34,58],hb:[-34,92]})});
  const k=back(clamp((t-A(2))/0.3));if(k>0){c.save();c.translate(540,640);c.scale(k,k);c.fillStyle='rgba(8,14,24,0.85)';c.beginPath();c.roundRect(-250,-60,500,120,60);c.fill();c.strokeStyle=CYAN_C;c.lineWidth=6;c.shadowColor=CYAN_C;c.shadowBlur=24;c.stroke();c.shadowBlur=0;
    c.font='900 54px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='6px';c.fillText('↻ TRY AGAIN',0,4);c.restore();}
  vignette(c,0.5);};
// 3 · Napoleon Bonaparte — on the ridge with his 3D telescope, name tag
SH.intro=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2a20'};field(c,t,{x:540,y:1080,z:pushZ(t,A(3),B(3),1.0,1.06),mm:50},{sky:'sun',world:(c2,GY)=>{
    NAP({c:c2,x:540,y:GY+620,s:2.6,f:1,t,eyes:'open',brow:'angry',mouth:'flat',hf:[56,40],hb:[-30,92],propF:telesc});}});
  statTag(c,540,640,'NAPOLEON BONAPARTE · EMPEROR',GOLD_C,clamp((t-A(3)-0.1)/0.3));vignette(c,0.45);};
// 4 · every time he loses — a cannonball impact, he's knocked flat, LIFE LOST
SH.loses=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1a20'};const th=WT(4,3);const fall=eo(clamp((t-th)/0.35));
  field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'dusk',world:(c2,GY)=>{const x=540,y=GY+560;c2.save();c2.translate(x,y-116*2.2);c2.rotate(-fall*1.45);c2.translate(-x,-(y-116*2.2));
    NAP({c:c2,x,y,s:2.2,f:1,t,eyes:t>th?'shock':'open',brow:t>th?'up':'angry',mouth:t>th?'scream':'flat',hf:[56,40],hb:[-56,40]});c2.restore();}});
  if(t>th-0.05&&t<th+0.2){c.save();c.globalAlpha=0.7*(1-(t-th)/0.2);c.fillStyle='#fff';c.fillRect(0,0,W,H);c.restore();}muzzle(c,t,th-0.05,1020,1250,1.0,-1);
  livesHUD(c,t,3,{y:560,lose:th+0.1});vignette(c,0.5);};
// 5 · he respawns — pillar of light, he reassembles standing
SH.respawn1=function(c,t){L2={dx:1,rim:'#a8e0ff',amb:'#1a2a3a'};field(c,t,{x:540,y:1100,z:1.0,mm:50},{sky:'dawn',world:(c2,GY)=>{const a=clamp((t-A(5)-0.2)/0.5);
    c2.save();c2.globalAlpha=a;NAP({c:c2,x:540,y:GY+560,s:2.4,f:1,t,eyes:'wide',brow:'up',mouth:'o',hf:[46,40],hb:[-46,40]});c2.restore();}});
  respawnFx(c,t,A(5),540,1860,1500);glowTxt(c,'RESPAWN',540,640,80,CYAN_C,{ls:12});vignette(c,0.5);};
// 6 · rewrite the map of Europe — French blue spreading
SH.map=function(c,t){const q=eo(inv(A(6),B(6),t));europe(c,t,{z:1.05,labels:1,col:{FR:'#3a6ad8',ES:q>0.35?'#5a8ae8':null,IT:q>0.5?'#5a8ae8':null,AT:q>0.7?'#5a8ae8':null,PR:q>0.85?'#5a8ae8':null},draw:(c2)=>{
    arrow(c2,310,946,580,916,'#fff',clamp(q*3-0.6),12);arrow(c2,310,946,510,1072,'#fff',clamp(q*3-0.9),12);arrow(c2,310,946,180,1150,'#fff',clamp(q*3-0.3),12);}});
  txt(c,'EUROPE',540,1640,64,'#fff',{ls:16});vignette(c,0.4);};
// 7-8 · the rule card, then he wakes up at the save point
SH.rule=function(c,t){c.fillStyle='#060912';c.fillRect(0,0,W,H);c.strokeStyle='rgba(95,227,255,0.07)';c.lineWidth=2;for(let x=0;x<W;x+=60){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}
  const k=back(clamp((t-A(7))/0.3));c.save();c.translate(540,1000);c.scale(k,k);c.fillStyle='rgba(10,20,40,0.85)';c.beginPath();c.roundRect(-430,-300,860,600,30);c.fill();c.strokeStyle=CYAN_C;c.lineWidth=5;c.shadowColor=CYAN_C;c.shadowBlur=24;c.stroke();c.shadowBlur=0;
  c.font='900 64px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='12px';c.fillText('THE RULE',0,-210);c.letterSpacing='0px';
  const r1=clamp((t-WT(8,0))/0.3),r2=clamp((t-WT(8,5))/0.3);c.globalAlpha=r1;c.font='900 120px "Inter Display"';c.fillText('⚔',-230,10);c.font='800 40px "Inter Display"';c.fillText('LOSE',-230,120);
  c.globalAlpha=r2;arrow(c,-110,10,90,10,GOLD_C,1,12);c.save();c.translate(250,100);c.scale(0.55,0.55);saveFlag(c,t,0,0,1,1);c.restore();c.font='800 40px "Inter Display"';c.fillStyle='#fff';c.fillText('RESPAWN',250,160);c.restore();vignette(c,0.4);};
SH.wake=function(c,t){L2={dx:1,rim:'#ffd8a8',amb:'#2a2018'};const tw=WT(8,7)-0.1,u=eo(clamp((t-tw)/0.4));salon(c,t,{x:540,y:1060,z:1.05,mm:50},{world:(c2,GY)=>{const bx=520,by=GY+260;prop(c2,'lectus',bx,by,1000,0);const mt=by-215;
    c2.save();const x=bx-80,y=mt-14+116*2.15;c2.translate(x,y-116*2.15);c2.rotate(lerp(-Math.PI/2+0.06,-0.05,u));c2.translate(-x,-(y-116*2.15));NAP({c:c2,x,y,s:2.15,f:1,t,cut:mt+4,eyes:u>0.2?'wide':'closed',brow:u>0.2?'up':'flat',mouth:u>0.2?'o':'flat',hf:u>0.3?[60,50]:[20,92],hb:[-40,80]});c2.restore();
    c2.save();const g=c2.createLinearGradient(0,mt-90,0,mt+40);g.addColorStop(0,'#2a4ab8');g.addColorStop(1,'#16286a');c2.fillStyle=g;c2.strokeStyle=K2;c2.lineWidth=6;c2.beginPath();c2.moveTo(bx-110,mt+30);c2.quadraticCurveTo(bx-80,mt-80,bx+40,mt-70);c2.quadraticCurveTo(bx+300,mt-90,bx+470,mt-40);c2.lineTo(bx+480,mt+50);c2.closePath();c2.fill();c2.stroke();
    c2.fillStyle='#d8b040';for(let i=0;i<8;i++){c2.beginPath();c2.arc(bx-40+i*60,mt-60+Math.sin(i)*6,5,0,TAU);c2.fill();}c2.restore();}});
  if(t>tw)saveToast(c,tw+0.1,t,'LOADED: SAVE POINT',1700,{dur:1.6,col:CYAN_C});vignette(c,0.45);};
// 9-12 · the save point: Austerlitz, December 1805 — sun breaks the fog, victory
SH.savept=function(c,t){c.fillStyle='#070a12';c.fillRect(0,0,W,H);saveFlag(c,t,540,1300,2.0,back(clamp((t-A(9))/0.4)));glowTxt(c,'SAVE POINT',540,640,84,CYAN_C,{ls:10});vignette(c,0.5);};
SH.date=function(c,t){field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'sun',world:()=>{}});c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(0,0,W,H);card(c,t,A(10),'2 DECEMBER','1805',GOLD_C,1000,150);vignette(c,0.45);};
SH.austerlitz=function(c,t){L2={dx:-1,rim:'#ffe0a8',amb:'#3a2a20'};const q=inv(A(11),B(11)+0.3,t);field(c,t,{x:540+q*40,y:1050,z:0.95,mm:24},{sky:'sun',world:(c2,GY)=>{
    for(let r=0;r<2;r++)for(let i=0;i<6;i++){const x=-60+i*200+r*100+q*60,y=GY+380+r*170;S2('french',{c:c2,x,y,s:1.3+r*0.25,f:1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'flat',hf:[50,40],propF:mUp()});}}});
  card(c,t,A(11),'THE BATTLE OF','AUSTERLITZ',GOLD_C,620,96);vignette(c,0.4);};
SH.victory=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2a20'};field(c,t,{x:540,y:1080,z:1.0,mm:50},{sky:'sun',world:(c2,GY)=>{
    for(const [x,f] of [[150,1],[930,-1]])S2('french',{c:c2,x,y:GY+700,s:2.3,f,t,view:'3q',eyes:'happy',brow:'up',mouth:'teeth',hf:[60,-50+Math.sin(t*10)*8],hb:[-30,92],propF:mUp()});
    NAP({c:c2,x:540,y:GY+620,s:2.6,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[64,-40],hb:[-30,92]});}});
  popup(c,t,A(12),'VICTORY','SAVE POINT LOCKED',GOLD_C,{y:640,size:76,h:210});vignette(c,0.4);};
// 13-14 · life one, the same plan: he jabs the map table at RUSSIA
SH.life1=function(c,t){levelCard(c,t,A(13),1,'REAL HISTORY',{col:'150,200,255'});c.save();c.font='900 64px "Inter Display"';c.fillStyle='rgba(255,230,180,0.85)';c.textAlign='center';c.restore();};
SH.plan=function(c,t){L2={dx:1,rim:'#ffd8a8',amb:'#2a2018'};salon(c,t,{x:540,y:1150,z:1.0,mm:50},{world:(c2,GY)=>{
    NAP({c:c2,x:540,y:2060,s:2.3,f:1,t,eyes:'sly',brow:'angry',mouth:'smirk',hf:[70,60],hb:[-40,70]});
    // map table in front (drawn after → he stands behind it)
    c2.fillStyle='#5a3a1a';c2.fillRect(140,1840,800,40);c2.strokeStyle=K2;c2.lineWidth=6;c2.strokeRect(140,1840,800,40);c2.fillStyle='#3a2410';c2.fillRect(180,1880,30,260);c2.fillRect(870,1880,30,260);
    c2.fillStyle='#e8dcb8';c2.beginPath();c2.moveTo(200,1840);c2.lineTo(880,1840);c2.lineTo(860,1790);c2.lineTo(220,1790);c2.closePath();c2.fill();c2.stroke();c2.fillStyle='rgba(200,40,40,0.6)';c2.beginPath();c2.ellipse(720,1815,90,16,0,0,TAU);c2.fill();
    c2.fillStyle='#3a2a1a';c2.font='900 22px "Inter Display"';c2.textAlign='center';c2.fillText('RUSSIA',720,1822);c2.fillText('FRANCE',330,1822);}});
  arrow(c,330,1690,690,1690,'#ffffff',clamp((t-A(14)-0.4)/0.6),10);vignette(c,0.45);};
// 15 · marches into Russia with 600,000 men
SH.march=function(c,t){L2={dx:-1,rim:'#ffe0a8',amb:'#3a3020'};field(c,t,{x:540,y:1050,z:0.95,mm:24},{sky:'dusk',world:(c2,GY)=>{
    for(let r=0;r<3;r++)for(let i=-1;i<7;i++){const x=i*190+r*80-((t*80)%190),y=GY+260+r*170;S2(r===2&&i===3?'napgrey':'french',{c:c2,x,y,s:1.15+r*0.22,f:1,t,walk:1,ph:t*6+i+r,view:'3q',eyes:'open',brow:'angry',mouth:'flat',hf:[50,40],propF:r===2&&i===3?undefined:mUp()});}}});
  counter(c,WT(15,6),t,Math.round(lerp(0,600000,clamp((t-WT(15,6))/1.4))).toLocaleString(),'SOLDIERS',540,620);vignette(c,0.45);};
// 16-17 · the Russians don't fight — they turn and walk away
SH.nofight=function(c,t){L2={dx:1,rim:'#e0e8ff',amb:'#2a3040'};const q=inv(A(16),B(17),t);field(c,t,{x:540,y:1080,z:1.0,mm:50},{sky:'snow',smoke:0,troops:0,world:(c2,GY)=>{
    for(let i=0;i<4;i++){const x=lerp(260+i*190,420+i*260,eo(q)),a=1-clamp((q-0.5)/0.5);c2.save();c2.globalAlpha=a;S2('russian',{c:c2,x,y:GY+300-i*20,s:1.8,f:1,t,walk:q>0.15?1:0,ph:t*5+i,back:q>0.15,eyes:'open',mouth:'flat',hf:[50,40],propF:q>0.15?undefined:mUp()});c2.restore();}
    S2('french',{c:c2,x:150,y:GY+700,s:2.6,f:1,t,view:'3q',eyes:'open',brow:'worried',mouth:'o',look:[1,0],hf:[52,40],propF:mUp()});}});
  if(t>WT(16,2))bigQ(c,150,980,0.7,t);vignette(c,0.45);};
// 18 · burn everything behind them — Moscow in flames
SH.burn=function(c,t){L2={dx:1,rim:'#ff9a50',amb:'#1a0806'};moscow(c,t,{x:540,y:1100,z:pushZ(t,A(18),B(18),0.95,1.05),mm:35},{world:(c2,GY)=>NAP({c:c2,x:540,y:GY+520,s:1.9,f:1,t,back:true})});statTag(c,540,640,'MOSCOW · 1812','#ffd0a0',clamp((t-A(18)-0.2)/0.3));vignette(c,0.5);};
// 19 · winter hits — blizzard, greatcoat, frost, thermometer
SH.winter=function(c,t){L2={dx:-1,rim:'#d0e8ff',amb:'#2a3448'};field(c,t,{x:540,y:1100,z:1.0,mm:135},{sky:'snow',smoke:0,troops:0,world:(c2,GY)=>S2('napgrey',{c:c2,x:540,y:2250,s:4.2,f:1,t,eyes:'half',brow:'worried',mouth:'frown',sweat:0,lean:Math.sin(t*14)*0.015,hf:[20,60],hb:[-20,60]})});
  // breath puffs
  for(let i=0;i<3;i++){const p=((t*0.7+i/3)%1);c.fillStyle=`rgba(255,255,255,${0.5*(1-p)})`;c.beginPath();c.arc(560+p*120,1230-p*80,20+p*40,0,TAU);c.fill();}
  const tq=clamp((t-A(19))/0.8);c.save();c.translate(920,1250);c.fillStyle='#fff';c.beginPath();c.roundRect(-24,-320,48,320,24);c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();c.fillStyle='#5ab8ff';c.beginPath();c.roundRect(-12,-320*lerp(0.8,0.12,eo(tq)),24,320*lerp(0.8,0.12,eo(tq)),12);c.fill();c.beginPath();c.arc(0,10,42,0,TAU);c.fill();c.stroke();c.restore();
  txt(c,'−30°C',920,1360,48,'#d8f0ff');vignette(c,0.5);};
// 20 · fewer than 100,000 make it home
SH.home=function(c,t){L2={dx:-1,rim:'#d0e8ff',amb:'#2a3448'};const q=inv(A(20),B(20),t);field(c,t,{x:540,y:1080,z:1.0,mm:35},{sky:'snow',smoke:0,troops:0,world:(c2,GY)=>{
    const n=Math.max(2,Math.round(lerp(9,2,eo(q))));for(let i=0;i<9;i++){if(i>=n)continue;const x=120+i*110,y=GY+420+(i%3)*70;S2('frenchW',{c:c2,x,y,s:1.5,f:1,t,walk:1,ph:t*3+i,lean:0.18,view:'3q',eyes:'half',brow:'worried',mouth:'frown',hf:[40,60]});}}});
  counter(c,A(20),t,Math.round(lerp(600000,100000,eo(clamp((t-A(20))/1.6)))).toLocaleString(),'MADE IT HOME',540,620);vignette(c,0.5);};
SH.over=function(c,t){gameOver(c,t,A(21));};
// 22-23 · respawn: Austerlitz again
SH.respawn2=function(c,t){L2={dx:1,rim:'#a8e0ff',amb:'#1a2a3a'};field(c,t,{x:540,y:1100,z:1.0,mm:50},{sky:'sun',world:(c2,GY)=>{const a=clamp((t-A(22)-0.2)/0.5);c2.save();c2.globalAlpha=a;NAP({c:c2,x:540,y:GY+560,s:2.4,f:1,t,eyes:t>A(23)?'sly':'wide',brow:'up',mouth:t>A(23)?'smirk':'o',hf:[46,40],hb:[-46,40]});c2.restore();}});
  respawnFx(c,t,A(22),540,1860,1500);if(t>A(23))card(c,t,A(23),'SAVE POINT','AUSTERLITZ',CYAN_C,620,90);else glowTxt(c,'RESPAWN',540,640,80,CYAN_C,{ls:12});livesHUD(c,t,2,{y:470,r:30});vignette(c,0.5);};
// 24 · skips Russia completely
SH.skip=function(c,t){europe(c,t,{z:1.05,labels:1,col:{FR:'#3a6ad8'},draw:(c2)=>{arrow(c2,310,946,920,730,'#ffffff',clamp((t-A(24))/0.5),14);if(t>WT(24,3))bigX(c2,615,808,90,clamp((t-WT(24,3))/0.25),'#ff5a4e');}});vignette(c,0.4);};
// 25-26 · Europe teams up anyway — coalition colours flood in, arrows converge
SH.teamup=function(c,t){const ks=['GB','PR','AT','RU','ES'];const col={FR:'#3a6ad8'};ks.forEach((k,i)=>{if(t>A(25)+0.3+i*0.3)col[k]='#c84a4a';});
  europe(c,t,{z:1.05,labels:1,col,draw:(c2)=>{[[224,760],[580,760],[580,916],[920,730],[180,1150]].forEach(([x,y],i)=>arrow(c2,x,y,310,946,'#ffd0c0',clamp((t-A(25)-0.4-i*0.25)/0.5),10));}});
  if(t>A(26))popup(c,t,A(26),'COALITION','EVERYONE VS FRANCE',PURP_C,{y:560,size:70,h:200});vignette(c,0.4);};
// 27-29 · Leipzig. Defeat. Exile.
SH.leipzig=function(c,t){L2={dx:1,rim:'#ffb070',amb:'#2a1a18'};field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'dusk',troopCol:'#5a1a1a',world:(c2,GY)=>{cannonAt(c2,t,250,GY+400,520,[A(27)+0.1,A(27)+0.5]);
    for(let i=0;i<3;i++)S2(['russian','prussian','british'][i],{c:c2,x:700+i*140,y:GY+380+i*60,s:1.8,f:-1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[40,50],propF:mCharge()});}});
  card(c,t,A(27),'1813','LEIPZIG','#ff9a7a',620,110);vignette(c,0.45);};
SH.defeat=function(c,t){L2={dx:-1,rim:'#ffb070',amb:'#1a1018'};field(c,t,{x:540,y:1100,z:1.0,mm:135},{sky:'dusk',world:(c2,GY)=>NAP({c:c2,x:540,y:2300,s:4.0,f:1,t,crouch:40,lean:0.08,eyes:'closed',brow:'worried',mouth:'frown',hf:[30,92],hb:[-30,92]})});livesHUD(c,t,2,{y:470,r:30,lose:A(28)+0.15});vignette(c,0.55);};
SH.exile=function(c,t){L2={dx:1,rim:'#ffd8a8',amb:'#2a2a3a'};elba(c,t,{x:540,y:1000,z:1.0,mm:35},{world:(c2,GY)=>NAP({c:c2,x:540,y:GY+70,s:1.0,f:1,t,crouch:55,stance:30,eyes:'half',brow:'worried',mouth:'frown',hf:[20,60],hb:[-20,60]})});statTag(c,540,640,'EXILE · ELBA','#e8eef8',clamp((t-A(29))/0.25));vignette(c,0.45);};
// 30 · respawn — now he knows the final boss
SH.respawn3=function(c,t){L2={dx:1,rim:'#a8e0ff',amb:'#1a2a3a'};const tb=TW('now');field(c,t,{x:540,y:1100,z:1.0,mm:85},{sky:'dawn',world:(c2,GY)=>{const a=clamp((t-A(30)-0.2)/0.4);c2.save();c2.globalAlpha=a;NAP({c:c2,x:540,y:GY+800,s:3.2,f:1,t,eyes:t>tb?'sly':'wide',brow:t>tb?'angry':'up',mouth:t>tb?'smirk':'o',hf:[40,60],hb:[-40,60]});c2.restore();}});
  respawnFx(c,t,A(30),540,1900,1500);if(t>tb){c.save();c.fillStyle='rgba(30,10,50,0.8)';c.fillRect(0,560,W,170);glowTxt(c,'FINAL BOSS',540+(Math.floor(t*20)%6===0?6:0),645,84,PURP_C,{ls:12});c.restore();}vignette(c,0.5);};
// 31 · Waterloo, 1815 — rain
SH.waterloo=function(c,t){L2={dx:1,rim:'#c8d0e0',amb:'#1a1e28'};field(c,t,{x:540,y:1100,z:pushZ(t,A(31),B(31),1.0,1.06),mm:24},{sky:'rain',farm:1,world:()=>{}});card(c,t,A(31),'18 JUNE 1815','WATERLOO',PURP_C,1000,120);};
// 32 · rain soaked the ground; he waited hours — mud-stuck cannon wheel, pocket-watch clock
SH.mud=function(c,t){L2={dx:-1,rim:'#c8d0e0',amb:'#1a1e28'};field(c,t,{x:540,y:1100,z:1.0,mm:50},{sky:'rain',world:(c2,GY)=>{cannonAt(c2,t,560,GY+520,620);c2.fillStyle='rgba(40,30,20,0.85)';c2.beginPath();c2.ellipse(560,GY+520,420,60,0,0,TAU);c2.fill();
    NAP({c:c2,x:230,y:GY+700,s:2.2,f:1,t,eyes:'half',brow:'worried',mouth:'frown',hf:[30,92],hb:[-30,92],look:[1,0]});}});
  const tw=WT(32,9);if(t>tw){const k=clamp((t-tw)/0.3);c.save();c.globalAlpha=k;c.translate(820,700);c.fillStyle='#f4ecd8';c.beginPath();c.arc(0,0,110,0,TAU);c.fill();c.strokeStyle='#c89a3a';c.lineWidth=14;c.stroke();c.strokeStyle=K2;c.lineWidth=8;c.lineCap='round';
    const a=(t-tw)*6;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(a)*80,-Math.cos(a)*80);c.moveTo(0,0);c.lineTo(Math.sin(a/12)*55,-Math.cos(a/12)*55);c.stroke();c.restore();txt(c,'+ HOURS',820,870,44,'#fff');}vignette(c,0.5);};
// 33 · that delay let the Prussians arrive
SH.prussians=function(c,t){L2={dx:-1,rim:'#c8d0e0',amb:'#1a1e28'};const q=inv(A(33),B(33),t);field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'rain',troopCol:'#1a1e30',world:(c2,GY)=>{
    for(let r=0;r<2;r++)for(let i=0;i<5;i++){const x=lerp(1300,560,eo(q))+i*170+r*90,y=GY+300+r*200;S2('prussian',{c:c2,x,y,s:1.6+r*0.3,f:-1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'flat',hf:[50,40],propF:mUp()});}}});
  statTag(c,540,640,'PRUSSIANS ARRIVE','#e8eef8',clamp((t-WT(33,4))/0.3));vignette(c,0.5);};
// 34 · so this time…
SH.thistime=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a2018'};field(c,t,{x:540,y:1100,z:1.0,mm:200},{sky:'dawn',world:(c2,GY)=>NAP({c:c2,x:540,y:2650,s:5.6,f:1,t,eyes:'sly',brow:'angry',mouth:'smirk',hf:[30,92],hb:[-30,92]})});vignette(c,0.55);};
// 35 · attacks at dawn, mud and all — cannons fire, charge through the mud
SH.dawn=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a2018'};field(c,t,{x:540,y:1100,z:1.0,mm:24},{sky:'dawn',mud:1,world:(c2,GY)=>{cannonAt(c2,t,230,GY+280,430,[WT(35,2),WT(35,2)+0.6,WT(35,5)]);
    for(let i=0;i<5;i++){const x=300+i*170+((t-A(35))*120%60),y=GY+520+(i%2)*90;S2('french',{c:c2,x,y,s:1.8,f:1,t,walk:1,run:1,ph:t*8+i,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[44,46],propF:mCharge()});
      c2.fillStyle='rgba(60,40,20,0.7)';for(let k=0;k<3;k++){const p=((t*2+i+k/3)%1);c2.beginPath();c2.arc(x-30-p*60,y-10-p*40*(1-p),8,0,TAU);c2.fill();}}}});
  card(c,t,WT(35,2),'DAWN','ATTACK!',GOLD_C,620,96);vignette(c,0.45);};
// 36 · the British line breaks before help can reach them
SH.breaks=function(c,t){L2={dx:-1,rim:'#ffd0a0',amb:'#2a2018'};const tb=WT(36,3);field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'dawn',mud:1,world:(c2,GY)=>{
    for(let i=0;i<6;i++){const br=t>tb+i*0.08,x=120+i*170+(br?Math.sin(i*3)*80*clamp((t-tb)/0.6):0),y=GY+380+(i%2)*80;S2('british',{c:c2,x,y,s:1.7,f:br?(i%2?1:-1):-1,t,walk:br?1:0,run:br?1:0,ph:t*8+i,back:br&&i%2===0,view:'3q',eyes:br?'wide':'angry',brow:br?'up':'angry',mouth:br?'scream':'flat',sweat:br?1:0,hf:[44,40],propF:br?undefined:mCharge()});}}});
  if(t>tb){c.save();c.strokeStyle='#fff';c.lineWidth=10;c.setLineDash([30,18]);c.beginPath();c.moveTo(0,1450);c.lineTo(W,1450);c.stroke();c.restore();bigX(c,540,1450,70,clamp((t-tb)/0.25),'#fff');}vignette(c,0.45);};
// 37 · Waterloo… won.
SH.won=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#2a2018'};field(c,t,{x:540,y:1080,z:pushZ(t,A(37),B(37),1.0,1.08),mm:50},{sky:'sun',world:(c2,GY)=>{
    NAP({c:c2,x:540,y:GY+700,s:2.7,f:1,t,eyes:'happy',brow:'up',mouth:'teeth',hf:[66,-44],hb:[-30,92]});for(const [x,f] of [[140,1],[940,-1]])S2('french',{c:c2,x,y:GY+780,s:2.3,f,t,view:'3q',eyes:'happy',brow:'up',mouth:'teeth',hf:[56,-50+Math.sin(t*10+x)*8],propF:mUp()});}});
  popup(c,t,WT(37,1)-0.1,'WATERLOO WON','FINAL BOSS DEFEATED',GOLD_C,{y:620,size:72,h:210});vignette(c,0.4);};
// 38 · here's the problem — the smile drops
SH.problem=function(c,t){L2={dx:-1,rim:'#ffd0a0',amb:'#1a1418'};field(c,t,{x:540,y:1100,z:1.0,mm:135},{sky:'dusk',world:(c2,GY)=>NAP({c:c2,x:540,y:2420,s:4.6,f:1,t,eyes:t>A(38)+0.5?'open':'happy',brow:t>A(38)+0.5?'worried':'up',mouth:t>A(38)+0.5?'flat':'smile',hf:[30,92],hb:[-30,92]})});vignette(c,0.55);};
// 39 · seven coalitions — cards slam in 1..7
SH.seven=function(c,t){c.fillStyle='#0c0a12';c.fillRect(0,0,W,H);const t0=WT(39,4);for(let i=0;i<7;i++){const tt=t0-0.6+i*0.22;const k=back(clamp((t-tt)/0.25));if(k<=0)continue;const col=i%3,row=Math.floor(i/3);const x=220+col*320,y=700+row*380;
    c.save();c.translate(x,y);c.rotate((hash(i)-0.5)*0.15);c.scale(k,k);c.fillStyle='rgba(120,30,40,0.92)';c.beginPath();c.roundRect(-130,-160,260,320,20);c.fill();c.strokeStyle='#ffd0c0';c.lineWidth=5;c.stroke();c.font='900 120px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(String(i+1),0,-10);c.font='800 24px "Inter Display"';c.letterSpacing='4px';c.fillText('COALITION',0,110);c.restore();}vignette(c,0.4);};
// 40 · win one war, the next one is already coming — endless armies on the horizon
SH.next=function(c,t){L2={dx:-1,rim:'#ffb090',amb:'#1a1418'};const q=inv(A(40),B(40),t);field(c,t,{x:540,y:1100,z:1.0,mm:85},{sky:'dusk',troopCol:'#4a1a1a',world:(c2,GY)=>{
    for(let r=0;r<3;r++)for(let i=0;i<8;i++){const x=-80+i*160+r*60,y=GY+60+r*90+q*60*r;S2(['british','prussian','russian'][(i+r)%3],{c:c2,x,y,s:0.7+r*0.2,f:-1,t,walk:1,ph:t*6+i+r,view:'3q',eyes:'angry',mouth:'flat'});}
    NAP({c:c2,x:540,y:GY+980,s:3.0,f:1,t,back:true});}});vignette(c,0.5);};
// 41 · final respawn
SH.final=function(c,t){L2={dx:1,rim:'#a8e0ff',amb:'#1a2a3a'};salon(c,t,{x:540,y:1100,z:1.0,mm:85},{world:(c2,GY)=>{const a=clamp((t-A(41)-0.2)/0.4);c2.save();c2.globalAlpha=a;NAP({c:c2,x:540,y:2320,s:3.4,f:1,t,eyes:'half',brow:'flat',mouth:'flat',hf:[30,92],hb:[-30,92]});c2.restore();}});
  respawnFx(c,t,A(41),540,1900,1500);livesHUD(c,t,1,{y:470,r:30});statTag(c,540,640,'FINAL RESPAWN',CYAN_C,clamp((t-A(41)-0.3)/0.3));vignette(c,0.5);};
// 42 · he stops — pause menu, cursor lands on QUIT
SH.stops=function(c,t){L2={dx:1,rim:'#ffd8a8',amb:'#2a2018'};salon(c,t,{x:540,y:1100,z:1.0,mm:85},{world:(c2,GY)=>NAP({c:c2,x:540,y:2320,s:3.4,f:1,t,eyes:'closed',brow:'flat',mouth:'smile',hf:[30,92],hb:[-30,92]})});pauseMenu(c,t,A(42)-0.05,t>A(42)+0.6?2:0,780);};
// 43 · no invasions, no new wars — arrows vanish from the map
SH.noinv=function(c,t){const q=clamp((t-A(43))/1.2);europe(c,t,{z:1.05,labels:1,col:{FR:'#3a6ad8'},draw:(c2)=>{c2.save();c2.globalAlpha=1-q;arrow(c2,310,946,580,916,'#fff',1,12);arrow(c2,310,946,920,730,'#fff',1,12);arrow(c2,310,946,180,1150,'#fff',1,12);c2.restore();
    if(q>0.6){c2.save();c2.strokeStyle=GRN_C;c2.lineWidth=10;c2.setLineDash([20,14]);polyPath(c2,FRANCE);c2.stroke();c2.restore();}}});vignette(c,0.4);};
// 44-45 · just France… and peace — a calm garden at sunset, a dove
SH.peace=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2a20'};field(c,t,{x:540,y:1080,z:pushZ(t,A(44),B(45),1.0,1.08),mm:50},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{
    NAP({c:c2,x:540,y:GY+700,s:2.7,f:1,t,eyes:'happy',brow:'flat',mouth:'smile',hf:[30,92],hb:[-30,92]});
    const dq=clamp((t-A(45))/1.2);if(dq>0){const x=lerp(900,600,dq),y=lerp(700,880,dq)+Math.sin(t*8)*10;c2.fillStyle='#fff';c2.strokeStyle=K2;c2.lineWidth=4;c2.beginPath();c2.ellipse(x,y,40,22,0,0,TAU);c2.fill();c2.stroke();const fl=Math.sin(t*16)*20;c2.beginPath();c2.moveTo(x,y);c2.lineTo(x-20,y-40-fl);c2.lineTo(x+30,y-10);c2.closePath();c2.fill();c2.stroke();}}});
  statTag(c,540,640,'PEACE',GRN_C,clamp((t-A(45))/0.3));vignette(c,0.4);};
// 46 · the cheat code was never another life
SH.cheat=function(c,t){c.fillStyle='#060810';c.fillRect(0,0,W,H);const k=back(clamp((t-A(46))/0.3));c.save();c.translate(540,1000);c.scale(k,k);c.fillStyle='rgba(14,18,32,0.92)';c.beginPath();c.roundRect(-400,-200,800,400,26);c.fill();c.strokeStyle=CYAN_C;c.lineWidth=5;c.stroke();
  c.font='800 36px "Inter Display"';c.fillStyle='rgba(255,255,255,0.7)';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='8px';c.fillText('CHEAT CODE',0,-120);c.letterSpacing='0px';c.font='900 90px "Inter Display"';c.fillStyle='#fff';c.fillText('∞ LIVES',0,10);c.restore();
  if(t>WT(46,5))bigX(c,540,1010,170,clamp((t-WT(46,5))/0.25),'#ff5a4e');vignette(c,0.4);};
// 47 · it was knowing when to stop playing — QUIT GAME pressed, he walks into the sunset, fade
SH.quit=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a2018'};const q=inv(A(47),END,t);field(c,t,{x:540,y:1080,z:1.0,mm:35},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>NAP({c:c2,x:lerp(540,700,q),y:GY+520,s:lerp(2.0,1.6,q),f:1,t,walk:1,ph:t*5,back:true})});
  const k=back(clamp((t-WT(47,3))/0.3));if(k>0){c.save();c.translate(540,640);c.scale(k,k);const pr=t>WT(47,5);c.fillStyle=pr?'rgba(95,227,255,0.35)':'rgba(8,14,24,0.85)';c.beginPath();c.roundRect(-260,-64,520,128,64);c.fill();c.strokeStyle=CYAN_C;c.lineWidth=6;c.stroke();c.font='900 56px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='6px';c.fillText('QUIT GAME',0,4);c.restore();}
  vignette(c,0.45);const fo=clamp((t-(END-1.2))/1.1);if(fo>0){c.fillStyle=`rgba(0,0,0,${fo})`;c.fillRect(0,0,W,H);}};
SHOTS=[[0,'hook'],[A(3),'intro'],[A(4),'loses'],[A(5),'respawn1'],[A(6),'map'],[A(7),'rule'],[WT(8,5),'wake'],[A(9),'savept'],[A(10),'date'],[A(11),'austerlitz'],[A(12),'victory'],[A(13),'life1'],[A(14),'plan'],[A(15),'march'],[A(16),'nofight'],[A(18),'burn'],[A(19),'winter'],[A(20),'home'],[A(21),'over'],
  [A(22),'respawn2'],[A(24),'skip'],[A(25),'teamup'],[A(27),'leipzig'],[A(28),'defeat'],[A(29),'exile'],[A(30),'respawn3'],[A(31),'waterloo'],[A(32),'mud'],[A(33),'prussians'],[A(34),'thistime'],[A(35),'dawn'],[A(36),'breaks'],[A(37),'won'],[A(38),'problem'],[A(39),'seven'],[A(40),'next'],[A(41),'final'],[A(42),'stops'],[A(43),'noinv'],[A(44),'peace'],[A(46),'cheat'],[A(47),'quit']].map(([a,n])=>[a>0.12?a-0.12:a,n]);
IMPACTS=[[WT(4,3),14,0.4,'#ffffff',0.3],[A(21),10,0.4],[A(28),10,0.35],[WT(35,2),12,0.35],[WT(36,3),10,0.3],[WT(37,1),8,0.3,'#ffe0a0',0.3]];
// ===== v2: dawn charge (tracking camera) + British line breaks (cinematic rout) =====
function mudSplash(c,t,x,y,s,seed){for(let k=0;k<4;k++){const p=((t*2.6+seed+k/4)%1);c.fillStyle=`rgba(70,48,26,${0.8*(1-p)})`;c.beginPath();c.arc(x-p*70*s,y-Math.sin(p*Math.PI)*60*s,(5+k*2)*s,0,TAU);c.fill();}}
function speedLines(c,t,a=0.25){c.save();c.strokeStyle=`rgba(255,240,220,${a})`;c.lineWidth=3;for(let i=0;i<26;i++){const y=hash(i)*H,x=((hash(i*3)*W*1.6-t*2400)%(W*1.6)+W*1.6)%(W*1.6)-W*0.3;c.beginPath();c.moveTo(x,y);c.lineTo(x+160+hash(i)*200,y);c.stroke();}c.restore();}
// column of charging soldiers, rows back→front so near bodies cover far muskets; bayonets level at the hip, never at face height
function chargeRows(c2,t,GY,kind,x0,vx,dir,o={}){for(let r=0;r<3;r++){const s=1.25+r*0.38,gap=360+r*120,y=GY+200+r*210;for(let i=-1;i<5;i++){const x=x0+t*vx+i*gap+(r%2)*gap*0.5+Math.sin(i*1.7+r)*30;
      S2(kind,{c:c2,x,y,s,f:dir,t,walk:1,run:1,ph:t*9+i*1.3+r,view:'3q',lean:0.12*dir,eyes:'angry',brow:'angry',mouth:'scream',hf:[56,58],hb:[22,64],propF:mCharge()});
      mudSplash(c2,t,x-dir*20*s,y,s,i+r*7);}}}
SH.dawn=function(c,t){L2={dx:1,rim:'#ffd0a0',amb:'#2a2018'};const t0=A(35)-0.12,tm=WT(35,4)-0.05,q=t-t0;
  if(t<tm){// wide low tracking shot: camera rides along with the charge, cannons blast from the left
    const camX=540+q*240;field(c,t,{x:camX,y:1080,z:0.95,mm:24},{sky:'dawn',mud:1,world:(c2,GY)=>{
      for(const [cx,tf] of [[200,[t0+0.15,t0+0.9]],[-260,[t0+0.5,t0+1.3]]])cannonAt(c2,t,cx,GY+120,420,tf);
      chargeRows(c2,t-t0,GY,'french',-200,300,1);}});
    speedLines(c,t,0.18);card(c,t,WT(35,2),'DAWN','ATTACK!',GOLD_C,620,96);}
  else{// 85mm low insert: one grenadier screaming mid-stride, boots smashing mud
    field(c,t,{x:540+(t-tm)*120,y:1080,z:1.0,mm:85},{sky:'dawn',mud:1,world:(c2,GY)=>{
      for(let i=0;i<3;i++)S2('french',{c:c2,x:-120+i*420+(t-tm)*160,y:GY+300,s:1.6,f:1,t,walk:1,run:1,ph:t*9+i,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[56,58],propF:mCharge()});
      S2('french',{c:c2,x:520+(t-tm)*120,y:GY+1020,s:3.3,f:1,t,walk:1,run:1,ph:t*9,view:'3q',lean:0.1,eyes:'angry',brow:'angry',mouth:'scream',sweat:1,hf:[58,58],hb:[22,64],propF:mCharge()});
      for(let k=0;k<6;k++)mudSplash(c2,t,420+k*60+(t-tm)*120,GY+1020,3.3,k);}});
    speedLines(c,t,0.25);}
  vignette(c,0.45);};
SH.breaks=function(c,t){L2={dx:-1,rim:'#ffd0a0',amb:'#2a2018'};const t0=A(36)-0.12,tb=WT(36,3),q=t-t0,br=clamp((t-tb)/0.6);
  const camX=540+q*140,z=lerp(0.95,1.08,eo(clamp((t-tb)/1.5)));
  const sh=t>tb&&t<tb+0.5?(hash(Math.floor(t*40))-0.5)*24*(1-(t-tb)/0.5):0;
  c.save();c.translate(sh,sh*0.6);
  field(c,t,{x:camX,y:1080,z,mm:35},{sky:'dawn',mud:1,world:(c2,GY)=>{
    chargeRows(c2,t-t0,GY-60,'french',-1250,430,1);
    // British line on the right: firing volley, then breaking — turning, running off, muskets dropped, shakos flying
    for(let r=0;r<2;r++)for(let i=0;i<5;i++){const s=1.6+r*0.45,y=GY+330+r*260,x0=620+i*260+r*130;const d=hash(i*3+r)*0.35;const b=clamp((t-tb-d)/0.5);
      const run=b>0;const x=x0+(run?(t-tb-d)*(240+hash(i)*120):0);
      if(run&&b<1){const dx=x0-30+b*40,dy=y-150*s+b*b*150*s;c2.save();c2.translate(dx,dy);c2.rotate(-b*2.2);prop(c2,'musket',0,0,290*s,Math.PI-0.1,{anc:[0.5,0.5]});c2.restore();}
      else if(run){prop(c2,'musket',x0-10,y-6,290*s,Math.PI*0.98,{anc:[0.5,0.5]});}
      S2('british',{c:c2,x,y,s,f:run?1:-1,t,walk:run?1:0,run:run?1:0,ph:t*10+i,view:'3q',lean:run?0.15:0,look:run?[-1,0]:[0,0],eyes:run?'wide':'angry',brow:run?'up':'angry',mouth:run?'scream':'flat',sweat:run?1:0,hf:run?[50,-30]:[56,58],hb:run?[-40,-40]:[22,64],propF:run?undefined:mCharge()});
      if(!run){const tv=t0+0.2+r*0.25;muzzle(c2,t,tv,x-300*s*0.9,y-110*s,0.5*s,-1);}
      if(run&&b<1){const hx=x-10,hy=y-300*s-b*260*s;c2.save();c2.translate(hx+b*80,hy);c2.rotate(b*4);c2.fillStyle='#1a1a1a';c2.strokeStyle=K2;c2.lineWidth=3;c2.fillRect(-24*s,-30*s,48*s,60*s);c2.strokeRect(-24*s,-30*s,48*s,60*s);c2.fillStyle='#fff';c2.beginPath();c2.arc(0,-34*s,7*s,0,TAU);c2.fill();c2.restore();}}
    // gun smoke drifting across
    for(let i=0;i<6;i++){c2.fillStyle=`rgba(235,230,220,${0.12+0.1*br})`;const x=700+i*150+Math.sin(t+i)*30,y=GY+80+hash(i)*300;c2.beginPath();c2.arc(x,y,90+hash(i*3)*60,0,TAU);c2.fill();}}});
  c.restore();
  if(t>tb){lightRays(c,900,200,'255,220,170',0.18*br,7,2200,0.5);popup(c,t,tb+0.15,'LINE BROKEN','',GOLD_C,{y:640,h:160,size:64});}
  vignette(c,0.5);};
// ===== v2: a properly drawn white dove (flapping wings, feathers, beak, tail) =====
function dove(c,x,y,s,t,dir=-1){c.save();c.translate(x,y);c.scale(dir*s,s);c.strokeStyle=K2;c.lineWidth=3.2;c.lineJoin='round';const fl=Math.sin(t*14);
  const wing=(far)=>{c.save();c.translate(-6,-6);c.rotate((far?-0.35:0)+fl*0.85-0.2);const g=c.createLinearGradient(0,-90,0,0);g.addColorStop(0,'#ffffff');g.addColorStop(1,far?'#c8ccd8':'#e6e8f0');c.fillStyle=g;
    c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-18,-60,-6,-96);c.lineTo(4,-82);c.lineTo(12,-92);c.lineTo(18,-74);c.lineTo(28,-80);c.lineTo(30,-58);c.lineTo(40,-60);c.quadraticCurveTo(36,-20,22,0);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(120,130,150,0.6)';c.lineWidth=1.6;for(const k of [0.25,0.5,0.75]){c.beginPath();c.moveTo(6,-8);c.lineTo(lerp(-6,34,k),-lerp(90,58,k));c.stroke();}c.restore();};
  wing(true);
  // tail fan
  c.fillStyle='#e8eaf2';c.beginPath();c.moveTo(-34,4);c.lineTo(-74,-6);c.lineTo(-78,10);c.lineTo(-72,22);c.lineTo(-36,14);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3.2;c.stroke();
  c.strokeStyle='rgba(120,130,150,0.6)';c.lineWidth=1.4;for(const yy of [2,10]){c.beginPath();c.moveTo(-38,8);c.lineTo(-74,yy);c.stroke();}
  // body
  const bg=c.createLinearGradient(0,-20,0,24);bg.addColorStop(0,'#ffffff');bg.addColorStop(1,'#cfd3de');c.fillStyle=bg;c.beginPath();c.moveTo(-40,8);c.quadraticCurveTo(-20,-22,16,-16);c.quadraticCurveTo(34,-14,38,-4);c.quadraticCurveTo(30,18,0,20);c.quadraticCurveTo(-24,20,-40,8);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3.2;c.stroke();
  // head, eye, beak
  c.fillStyle='#ffffff';c.beginPath();c.arc(34,-18,15,0,TAU);c.fill();c.stroke();c.fillStyle=K2;c.beginPath();c.arc(38,-21,2.6,0,TAU);c.fill();
  c.fillStyle='#f0a070';c.beginPath();c.moveTo(47,-19);c.lineTo(58,-15);c.lineTo(47,-12);c.closePath();c.fill();c.lineWidth=2;c.stroke();
  // olive branch
  c.strokeStyle='#5a7a3a';c.lineWidth=3;c.beginPath();c.moveTo(52,-14);c.quadraticCurveTo(62,0,58,12);c.stroke();c.fillStyle='#7aa84a';for(const [lx,ly,a] of [[58,-4,0.6],[61,4,-0.4],[56,10,0.8]]){c.beginPath();c.ellipse(lx,ly,7,3,a,0,TAU);c.fill();}
  wing(false);c.restore();}
SH.peace=function(c,t){L2={dx:1,rim:'#ffe0a8',amb:'#3a2a20'};field(c,t,{x:540,y:1080,z:pushZ(t,A(44),B(45),1.0,1.08),mm:50},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{
    NAP({c:c2,x:540,y:GY+700,s:2.7,f:1,t,eyes:'happy',brow:'flat',mouth:'smile',look:[1,0],hf:[30,92],hb:[-30,92]});
    const dq=clamp((t-A(44)+0.1)/1.6);if(dq>0){const x=lerp(1180,790,eo(dq)),y=lerp(560,840,eo(dq))+Math.sin(t*7)*8;dove(c2,x,y,1.5,t,-1);}}});
  statTag(c,540,640,'PEACE',GRN_C,clamp((t-A(45))/0.3));vignette(c,0.4);};
