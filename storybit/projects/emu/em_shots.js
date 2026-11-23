'use strict';
// ===================== "The Great Emu War" — StoryBit B, re-hook every 2–3 s =====================
SH={};
KEY.clear();['20,000','WON.','EMUS.','MILITARY.','WRONG?','FIRE.','TRUCK,','RUNNING.','LOSING.'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
const ink=(c,a)=>{c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);};
const handheld=(t,a=6)=>({x:Math.sin(t*1.7)*a+Math.sin(t*3.1)*a*0.4,y:Math.cos(t*1.3)*a*0.6});
const FW=(c,t,t0,d=0.25)=>{const a=1-clamp((t-t0)/d);if(a>0){c.fillStyle=`rgba(255,255,255,${a*0.8})`;c.fillRect(0,0,W,H);}};
const yearTxt=(c,s,k,y=430,col='#fff')=>{if(k<=0)return;c.save();c.translate(540,y);const sc=lerp(1.8,1,eo(k));c.scale(sc,sc);c.globalAlpha=clamp(k*2);txt(c,s,0,0,170,col,{sw:22,ls:6});c.restore();};
const tag=(c,x,y,s,col,t,t0)=>statTag(c,x,y,s,col,clamp((t-t0)/0.25));
const DW=(c2,x,y,s,t,o={})=>DIG({c:c2,x,y,s,f:o.f||1,t,eyes:o.eyes||'open',brow:o.brow||'flat',mouth:o.mouth||'flat',hf:o.hf||[10,92],hb:o.hb||[-10,92],seed:o.seed||0,...o});
// gun crew: soldier standing behind a tripod Lewis gun, both hands on it (the action needs two hands)
function gunner(c2,x,y,s,t,o={}){const f=o.f||1,fire=o.fire,u=167*s;const gx=x+f*0.62*u,gy=y-1.0*u;const ang=o.ang||0;
  const kick=fire?Math.sin(t*60)*0.008*u:0;const G=lewisGun(c2,gx-f*kick,gy,s,ang,f,{gun:false});
  const sh=y-200*s;fig2(c2,{kind:o.kind||'digger',x,y,s,f,t,eyes:o.eyes||'angry',brow:o.brow||'angry',mouth:o.mouth||'grit',lean:0.08,hf:[(G.grip.x-x)/s,(G.grip.y-sh)/s],hb:[(G.stock.x-x)/s,(G.stock.y-sh)/s],seed:o.seed||0});
  lewisGun(c2,gx-f*kick,gy,s,ang,f,{tripod:false});if(fire)muzzleFlash(c2,G.muzzle.x,G.muzzle.y,s,t,ang,f);return G;}
// 0 · "In 1932," cold open: a machine gun opens up across the outback at a wall of emus
SH.hook=function(c,t){LIT('#ffe0b0','#3a2418');const hh=handheld(t,7);outback(c,t,{x:540+hh.x,y:1150+hh.y,z:pushZ(t,0,A(1),1.0,1.08),mm:35},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+760,2.2);
  flock(c2,t,{n:40,x0:600,x1:1500,y0:GY+60,y1:GY+420,persp:P,pose:'run',f:1,seed:3,flow:(x,y,i)=>({x:x+((t*170+i*40)%900)-200,y})});
  const G=gunner(c2,230,GY+760,2.2,t,{fire:t>0.2,ang:-0.04});for(let i=0;i<5;i++)tracer(c2,G.muzzle.x,G.muzzle.y,800+i*90,GY+150+i*40,t,i);for(let i=0;i<6;i++)dustHit(c2,700+hash(i)*600,GY+120+hash(i*3)*300,1.2,t,i);}});
  yearTxt(c,'1932',clamp((t-0.05)/0.3),420,'#ffd23f');FW(c,t,0,0.2);vignette(c,0.45);};
// 1 · "Australia" — the continent, Western Australia glowing
SH.map=function(c,t){const t0=A(1);const P=ausMap(c,t,{z:pushZ(t,t0,TW('soldiers'),1.0,1.15),cx:560,cy:800,wa:clamp((t-t0)/0.4),label:'AUSTRALIA',labelY:360});vignette(c,0.4);};
// 2 · "sent soldiers armed with machine guns" — two diggers set up a Lewis gun; push in; tag
SH.troops=function(c,t){LIT();const t0=TW('soldiers');outback(c,t,{x:540,y:1160,z:pushZ(t,t0-0.1,TW('fight'),1.0,1.14),mm:50},{land:'scrub',world:(c2,GY)=>{
  DW(c2,740,GY+620,2.1,t,{f:-1,eyes:'open',brow:'angry',mouth:'smirk',seed:2,propF:rifleUp(),hf:[-34,64]});gunner(c2,300,GY+700,2.3,t,{f:1,eyes:'focus',brow:'angry',mouth:'flat'});ammoCrate(c2,520,GY+720,1.3);}});
  tag(c,540,430,'LEWIS MACHINE GUNS',GOLD_C,t,TW('machine'));vignette(c,0.4);};
// 3 · "to fight 20,000 giant birds." — a wall of emus over the ridge; counter; one giant emu walks up to camera
SH.horde=function(c,t){LIT();const t0=TW('fight');outback(c,t,{x:540,y:1120,z:pushZ(t,t0,A(2),1.0,1.1),mm:35},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+900,2.4);
  const rise=i=>clamp((t-t0-hash(i*7.3)*0.9)/0.7);
  flock(c2,t,{n:170,x0:-300,x1:1380,y0:GY+10,y1:GY+620,persp:P,seed:9,flow:(x,y,i)=>{const p=rise(i);if(p<=0)return null;return {x,y:lerp(GY-8,y,eo(p))};},pose:i=>rise(i)<1?'run':'stand',view:i=>i%3?'q3':'front',f:i=>hash(i)>0.5?1:-1});
  const tb=TW('birds')-0.4;if(t>tb){const k=eo(clamp((t-tb)/0.6));emu(c2,lerp(820,640,k),GY+1260,lerp(2.6,3.4,k),t,{pose:'stand',view:'front',seed:4});}}});
  const v=Math.round(eo(clamp((t-TW('20,000')+0.15)/0.8))*20000);counterCard(c,540,440,back(clamp((t-TW('20,000')+0.2)/0.3)),v.toLocaleString('en-US'),'EMUS');vignette(c,0.4);};
// 4 · "And somehow, the birds won." — an emu wearing a soldier's slouch hat stands on the ammo crate; scoreboard slams
SH.won=function(c,t){LIT('#ffd0a0','#3a2418');const t0=A(2);outback(c,t,{x:540,y:1200,z:pushZ(t,t0,A(3),1.05,1.15),mm:85},{land:'scrub',world:(c2,GY)=>{
  DW(c2,250,GY+760,2.3,t,{eyes:'wide',brow:'worried',mouth:'o',f:1,hf:[30,40],look:[1,-1]});ammoCrate(c2,700,GY+700,1.8);emu(c2,700,GY+700-0.45*167*1.8,2.4,t,{pose:'stand',view:'q3',f:-1,seed:5});
  const eh=emuHead(700,GY+700-0.45*167*1.8,2.4,'q3',-1);c2.save();c2.translate(eh.x+4,eh.y+30);c2.rotate(-0.15);hat2b(c2,'slouch',1.3,-1,27*1.3,t);c2.restore();}});
  scoreboard(c,540,430,back(clamp((t-TW('won')+0.1)/0.3)),1,0);if(t>TW('won'))FW(c,t,TW('won'),0.2);vignette(c,0.45);};
// 5 · "After World War I," — sepia trench, diggers in Brodie helmets; 1918
SH.ww1=function(c,t){const t0=A(3);trench(c,t);for(let i=0;i<3;i++)fig2(c,{kind:'ww1',view:'front',x:250+i*290,y:1760+(i%2)*40,s:2.6,f:i%2?-1:1,t,seed:i,eyes:'half',brow:'worried',mouth:'flat',propF:rifleUp(),hf:[34,64],hf:[24,60],hb:[-10,92]});
  sepia(c,0.85,t);yearTxt(c,'1918',clamp((t-t0)/0.3),420);vignette(c,0.55);};
// 6 · "thousands of Australian veterans had settled on farmland" — veterans become farmers in the wheat; tag
SH.settle=function(c,t){LIT();const t0=TW('thousands');outback(c,t,{x:540+Math.sin(t*0.4)*20,y:1150,z:pushZ(t,t0,TW('western'),1.0,1.08),mm:50},{land:'farm',house:[820,120],world:(c2,GY)=>{
  for(const [x,y,s,k,f] of [[220,GY+330,1.2,'farmer2',1],[880,GY+380,1.3,'farmer',-1],[520,GY+720,2.3,'farmer',1]])fig2(c2,{kind:k,view:'front',x,y,s,f,t,eyes:'happy',brow:'up',mouth:'smile',hf:[10,92],hb:[-10,92],seed:x});}});
  tag(c,540,430,'SOLDIER SETTLERS',GOLD_C,t,t0+0.2);vignette(c,0.4);};
// 7 · "in Western Australia." — map: WA glows, wheatbelt shaded, pin
SH.wa=function(c,t){const t0=TW('western');ausMap(c,t,{z:lerp(1.2,2.4,eo(clamp((t-t0)/1.2))),lc:lerp(133,121,eo(clamp((t-t0)/1.2))),la:lerp(-27,-28,eo(clamp((t-t0)/1.2))),cx:540,cy:820,wa:1,wheat:clamp((t-t0-0.3)/0.4),pin:clamp((t-t0-0.5)/0.3),pinLabel:'THE WHEATBELT'});vignette(c,0.4);};
// 8 · "But they had a serious problem:" — the wheat rustles behind a farmer; he turns
SH.problem=function(c,t){LIT('#ffd8a0','#3a2a1a');const t0=A(4);outback(c,t,{x:540,y:1200,z:pushZ(t,t0,A(5),1.05,1.18),mm:85},{land:'wheat',world:(c2,GY)=>{
  for(let i=0;i<40;i++){const x=640+hash(i)*360,y=GY+300+hash(i*3)*240;const sw=Math.sin(t*16+i)*10;c2.strokeStyle='#c89a3a';c2.lineWidth=5;c2.beginPath();c2.moveTo(x,y);c2.quadraticCurveTo(x+sw,y-50,x+sw*2,y-110);c2.stroke();}
  fig2(c2,{kind:'farmer',view:'front',x:330,y:GY+760,s:2.3,f:1,t,eyes:'wide',brow:'worried',mouth:'o',hf:[10,92],hb:[-10,92],look:[1.5,0]});}});
  if(t>t0+0.5){const k=back(clamp((t-t0-0.5)/0.3));c.save();c.translate(800,470);c.scale(k*0.7,k*0.7);bigQ(c,0,0,1,t);c.restore();}vignette(c,0.5);};
// 9 · "emus." — an emu bursts out of the wheat right at camera
SH.emus=function(c,t){LIT();const t0=A(5);const k=back(clamp((t-t0+0.05)/0.3));const hh=handheld(t,10*(1-clamp((t-t0)/0.6)));outback(c,t,{x:540+hh.x,y:1200+hh.y,z:1.1,mm:85},{land:'wheat',world:(c2,GY)=>{
  emu(c2,560,GY+1500-k*120,3.9+k*0.4,t,{pose:'stand',view:'front',seed:7});for(let i=0;i<30;i++){const x=hash(i)*1200-60,y=GY+1500+hash(i*3)*120;c2.strokeStyle='#e0b050';c2.lineWidth=12;c2.beginPath();c2.moveTo(x,y);c2.quadraticCurveTo(x+(hash(i*5)-0.5)*60,y-160,x+(hash(i*7)-0.5)*120,y-320-k*40*hash(i));c2.stroke();}}});FW(c,t,t0,0.15);vignette(c,0.45);};
// 10 · "Every year, these giant flightless birds" — size check: emu vs farmer, 1.9 m, can't fly
SH.stats=function(c,t){LIT();const t0=A(6);outback(c,t,{x:540,y:1150,z:1.08,mm:50},{land:'farm',world:(c2,GY)=>{const y=GY+720;
  fig2(c2,{kind:'farmer',view:'front',x:330,y,s:2.1,f:1,t,eyes:'wide',brow:'up',mouth:'o',hf:[10,92],hb:[-10,92],look:[1,-1]});emu(c2,720,y,2.1*1.1,t,{pose:'stand',view:'q3',f:-1,seed:8});
  c2.strokeStyle='#ffd23f';c2.lineWidth=6;const top=y-1.9*167*2.1;seg(c2,920,y,920,top);seg(c2,900,y,940,y);seg(c2,900,top,940,top);}});
  tag(c,800,430,'UP TO 1.9 M TALL',GOLD_C,t,t0+0.2);tag(c,800,500,"CAN'T FLY",GOLD_C,t,TW('flightless'));vignette(c,0.4);};
// 11 · "migrated through farmland" — map: herds stream west into the wheatbelt
SH.migrate=function(c,t){const t0=TW('migrated');ausMap(c,t,{z:2.0,lc:122,la:-28.5,cx:540,cy:800,wa:1,wheat:1,arrows:clamp((t-t0+0.1)/1.2)});tag(c,540,430,'EVERY YEAR',GOLD_C,t,t0);vignette(c,0.4);};
// 12 · "destroying crops" — the flock grazes the wheat flat; a farmer despairs behind
SH.crops=function(c,t){LIT();const t0=TW('destroying');outback(c,t,{x:540,y:1150,z:pushZ(t,t0,TW('damaging'),1.0,1.08),mm:50},{land:'wheat',world:(c2,GY)=>{const P=PSP(GY,GY+800,2.3);
  for(let i=0;i<26;i++){const x=hash(i*2)*1200-60,y=GY+200+hash(i*5)*700;c2.fillStyle='rgba(120,80,30,0.45)';c2.beginPath();c2.ellipse(x,y,80+hash(i)*60,16,0,0,TAU);c2.fill();}
  flock(c2,t,{n:30,x0:-80,x1:1160,y0:GY+80,y1:GY+620,persp:P,pose:'graze',seed:12,view:'q3',actors:[{x:860,y:GY+240,rx:60,draw:()=>fig2(c2,{kind:'farmer2',view:'front',x:860,y:GY+240,s:1.0,f:-1,t,eyes:'wide',brow:'worried',mouth:'scream',hf:[-30,-60],hb:[10,92]})}]});}});
  tag(c,540,430,'CROPS DESTROYED',GOLD_C,t,t0+0.15);vignette(c,0.4);};
// 13 · "and damaging fences." — emus burst through a wire fence; posts snap
SH.fence=function(c,t){LIT();const t0=TW('damaging');const hh=handheld(t,6);outback(c,t,{x:540+hh.x,y:1150+hh.y,z:1.05,mm:50},{land:'farm',world:(c2,GY)=>{const P=PSP(GY,GY+800,2.3);const fy=GY+520,brk=clamp((t-t0-0.2)/0.3);
  for(let i=-1;i<11;i++){const x=i*120,mid=i>=3&&i<=5;const a=mid?brk*(i-4)*0.6:0;c2.save();c2.translate(x,fy);c2.rotate(a);c2.strokeStyle='#5a4028';c2.lineWidth=12;seg(c2,0,0,0,-110);c2.restore();}
  c2.strokeStyle='rgba(60,60,60,0.9)';c2.lineWidth=3;for(const h of [35,70,100]){c2.beginPath();c2.moveTo(-200,fy-h);c2.lineTo(330,fy-h);c2.quadraticCurveTo(480,fy-h+brk*120,540,fy-h+brk*220);c2.moveTo(1400,fy-h);c2.lineTo(720,fy-h);c2.quadraticCurveTo(600,fy-h+brk*120,560,fy-h+brk*200);c2.stroke();}
  flock(c2,t,{n:14,x0:300,x1:800,y0:GY+120,y1:GY+380,persp:P,pose:'run',view:'q3',f:1,seed:14,flow:(x,y,i)=>({x:x+(t-t0)*120,y:y+(t-t0)*(260+hash(i)*120)})});}});
  if(t>t0+0.3)stamp(c,t0+0.3,t,'SNAP!',540,440,{size:110,col:'#ffd23f',rot:-0.08});vignette(c,0.4);};
// 14 · "Frustrated farmers begged the government for help." — farmers, hats in hand, before the minister's desk
SH.beg=function(c,t){LIT('#ffd8a0','#2a1a10');const t0=A(7);office(c,t,{x:540,y:960,z:pushZ(t,t0,A(8),1.0,1.06)},{world:(c2,GY)=>{
  fig2(c2,{kind:'minister',view:'front',x:760,y:GY-60,s:2.0,f:-1,t,eyes:'half',brow:'flat',mouth:'frown',hf:[-10,92],hb:[10,92]});desk(c2,560,1000,GY-160,520,t);
  for(const [x,f,k] of [[220,1,'farmer'],[420,1,'farmer2']])fig2(c2,{kind:k,view:'front',x,y:GY+300,s:2.2,f,t,eyes:'wide',brow:'worried',mouth:'wobble',hf:[30,40],hb:[-10,92],seed:x,look:[1,-1]});
  if(t>TW('help')-0.2){const k=back(clamp((t-TW('help')+0.2)/0.3));c2.save();c2.translate(380,GY-420);c2.rotate(-0.1);c2.scale(k,k);c2.fillStyle='#f4ecd8';c2.strokeStyle=K2;c2.lineWidth=4;c2.fillRect(-110,-70,220,140);c2.strokeRect(-110,-70,220,140);txt(c2,'PLEASE',0,-22,40,'#3a2a1a',{stroke:false});txt(c2,'HELP!',0,28,48,'#8a1a1a',{stroke:false});c2.restore();}}});vignette(c,0.45);};
// 15 · "So the government sent in the military." — the minister stamps it
SH.military=function(c,t){LIT('#ffd8a0','#2a1a10');const t0=A(8),ts=TW('military')-0.15;office(c,t,{x:620,y:900,z:1.25},{world:(c2,GY)=>{
  const down=t>ts&&t<ts+0.2;fig2(c2,{kind:'minister',view:'front',x:760,y:GY-60,s:2.0,f:-1,t,eyes:'angry',brow:'angry',mouth:'smirk',hf:[-60,down?20:-30],hb:[10,92]});desk(c2,560,1000,GY-160,520,t);
  c2.fillStyle='#f4ecd8';c2.fillRect(560,GY-200,180,40);}});if(t>ts)stamp(c,ts,t,'APPROVED',540,500,{size:100,col:'#2a8a3a',rot:-0.1});if(t>ts)FW(c,t,ts,0.12);vignette(c,0.45);};
const IMPACT_MIL=()=>TW('military')-0.15;
// 16 · "Two soldiers." — two diggers slam in, names
SH.two=function(c,t){LIT();const t0=A(9);outback(c,t,{x:540,y:1160,z:1.12,mm:85},{land:'scrub',world:(c2,GY)=>{
  const k1=back(clamp((t-t0)/0.25)),k2=back(clamp((t-t0-0.3)/0.25));if(k1>0)DW(c2,330,GY+760,2.4*k1,t,{f:1,eyes:'open',brow:'angry',mouth:'smirk',seed:1});if(k2>0)DW(c2,760,GY+760,2.4*k2,t,{f:-1,eyes:'focus',brow:'flat',mouth:'flat',seed:2});}});
  popup(c,t,t0+0.1,'SGT. McMURRAY','& GNR. O\'HALLORAN',GOLD_C,{y:440,size:56,w:860});vignette(c,0.4);};
// 17 · "Machine guns." — Lewis gun close-up slam
SH.guns=function(c,t){const t0=A(10);c.fillStyle='#1a1612';c.fillRect(0,0,W,H);LIT();const k=back(clamp((t-t0)/0.25));c.save();c.translate(540,820);c.scale(k,k);lewisGun(c,-120,0,3.7,-0.06,1,{tripod:false,view:'q3'});c.restore();
  tag(c,540,440,'LEWIS GUN × 2',GOLD_C,t,t0+0.1);c.save();c.globalCompositeOperation='lighter';lightRays(c,540,-100,'255,220,160',0.15,7,2000,0.5);c.restore();vignette(c,0.5);};
// 18 · "Thousands of rounds of ammunition." — crates stack up; counter
SH.ammo=function(c,t){LIT();const t0=TW('thousands');outback(c,t,{x:540,y:1160,z:1.05,mm:50},{land:'scrub',world:(c2,GY)=>{
  for(let i=0;i<9;i++){const k=clamp((t-t0-i*0.12)/0.25);if(k<=0)continue;const r=Math.floor(i/3),q=i%3;ammoCrate(c2,290+q*250+r*45,GY+880-r*0.335*167*2.0-(1-eo(k))*600,2.0);}}});
  counterCard(c,540,450,back(clamp((t-t0)/0.3)),Math.round(eo(clamp((t-t0)/1.4))*10000).toLocaleString('en-US'),'ROUNDS');vignette(c,0.4);};
// 19 · "What could possibly go wrong?" — smug crew; an emu peeks over their shoulders; record-scratch freeze
SH.wrong=function(c,t){LIT();const t0=A(11),tf=TW('wrong');const tt=Math.min(t,tf);outback(c,tt,{x:540,y:1180,z:pushZ(tt,t0,tf,1.05,1.15),mm:85},{land:'scrub',world:(c2,GY)=>{
  const pk=clamp((tt-t0-0.3)/0.5);emu(c2,lerp(1000,820,eo(pk)),GY+560,2.4,tt,{pose:'stand',view:'q3',f:-1,seed:11});
  DW(c2,330,GY+800,2.5,tt,{f:1,eyes:'sly',brow:'up',mouth:'smirk',seed:1});DW(c2,680,GY+820,2.5,tt,{f:-1,eyes:'happy',brow:'up',mouth:'smile',seed:2,propF:rifleUp(),hf:[-34,64]});}});
  if(t>tf){c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.6)';c.fillRect(0,0,W,H);c.restore();stamp(c,tf,t,'?',820,520,{size:140,col:'#ffd23f',rot:0.1});}vignette(c,0.45);};
// 20 · "On November 2," — the date card over a dawn advance
SH.nov2=function(c,t){LIT('#ffc890','#2a1a20');const t0=A(12);outback(c,t,{x:540+(t-t0)*40,y:1160,z:1.0,mm:35},{land:'scrub',dusk:1,world:(c2,GY)=>{for(let i=0;i<2;i++)DW(c2,300+i*170+(t-t0)*60,GY+640+i*30,1.6,t,{f:1,walk:1,ph:t*8+i,seed:i,propF:i?rifleUp():null,hf:i?[34,64]:undefined});}});
  const k=back(clamp((t-t0)/0.3));c.save();c.translate(540,470);c.scale(k,k);c.rotate(-0.04);c.fillStyle='#f4ecd8';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-200,-150,400,300);c.strokeRect(-200,-150,400,300);c.fillStyle='#b8201e';c.fillRect(-200,-150,400,80);txt(c,'NOV',0,-110,56,'#fff',{stroke:false,ls:6});txt(c,'2',0,10,140,'#1a1a1a',{stroke:false});txt(c,'1932',0,110,40,'#5a4a3a',{stroke:false,ls:6});c.restore();vignette(c,0.4);};
// 21 · "the soldiers spotted a massive group of emus" — through the binoculars
SH.spot=function(c,t){LIT();const t0=TW('spotted');outback(c,t,{x:540+Math.sin(t*1.1)*30,y:1330,z:pushZ(t,t0,TW('opened'),1.6,1.9),mm:200},{land:'scrub',lift:0,world:(c2,GY)=>{const P=PSP(GY,GY+400,1.2);flock(c2,t,{n:90,x0:-200,x1:1300,y0:GY+20,y1:GY+420,persp:P,pose:'graze',seed:21,view:'q3'});}});
  binoView(c,t);tag(c,540,300,'MASSIVE FLOCK',GOLD_C,t,TW('massive'));};
// 22 · "and opened fire." — the gun roars, tracers, dust erupts among the birds
SH.fire=function(c,t){LIT('#ffe0b0','#3a2418');const t0=TW('opened');const hh=handheld(t,12);outback(c,t,{x:540+hh.x,y:1150+hh.y,z:1.05,mm:35},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+760,2.3);
  flock(c2,t,{n:50,x0:500,x1:1500,y0:GY+40,y1:GY+420,persp:P,pose:'run',f:1,seed:22,view:'q3',flow:(x,y,i)=>({x:x+(t-t0)*(200+hash(i)*200),y})});
  const G=gunner(c2,230,GY+780,2.3,t,{fire:true,ang:-0.05,eyes:'angry',mouth:'scream'});for(let i=0;i<6;i++)tracer(c2,G.muzzle.x,G.muzzle.y,700+i*90,GY+100+i*50,t,i);for(let i=0;i<8;i++)dustHit(c2,600+hash(i)*700,GY+80+hash(i*3)*350,1.4,t,i);}});
  FW(c,t,t0,0.12);vignette(c,0.45);};
// 23 · "But the birds scattered in every direction." — high angle: they burst outward like a firework of dust
SH.scatter=function(c,t){LIT();const t0=A(13);outback(c,t,{x:540,y:1450,z:pushZ(t,t0,A(14),0.9,0.8),mm:24},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+700,1.6);const q=eo(clamp((t-t0)/1.8));
  flock(c2,t,{n:60,x0:0,x1:1,y0:0,y1:1,persp:P,pose:'run',view:'q3',seed:23,flow:(x,y,i)=>{const a=i/60*TAU+hash(i)*0.3;return {x:540+Math.cos(a)*(40+q*(600+hash(i*5)*300)),y:GY+700+Math.sin(a)*(20+q*(260+hash(i*3)*120))};},f:i=>Math.cos(i/60*TAU)>0?1:-1});
  for(let i=0;i<8;i++){const p=((t-t0)*0.8+i/8)%1;c2.fillStyle=`rgba(180,110,60,${0.4*(1-p)})`;c2.beginPath();c2.arc(540,GY+700,80+p*500,0,TAU);c2.fill();}}});
  if(t>t0+0.3){c.save();c.globalAlpha=clamp((t-t0-0.3)/0.3);c.strokeStyle='#ffd23f';c.lineWidth=10;c.lineCap='round';for(let i=0;i<8;i++){const a=i/8*TAU;seg(c,540+Math.cos(a)*120,600+Math.sin(a)*120,540+Math.cos(a)*260,600+Math.sin(a)*260);}c.restore();}vignette(c,0.4);};
// 24 · "They were surprisingly fast," — tracking shot beside a sprinting emu; speedometer
SH.fast=function(c,t){LIT();const t0=A(14);const x0=(t-t0)*900;outback(c,t,{x:540+x0,y:1180,z:1.0,mm:50},{land:'scrub',world:(c2,GY)=>{emu(c2,500+x0,GY+760,2.5,t,{pose:'run',view:'q3',f:1,seed:24,spd:16});emu(c2,200+x0,GY+520,1.7,t,{pose:'run',view:'q3',f:1,seed:25,spd:15});}});
  c.save();c.strokeStyle='rgba(255,255,255,0.45)';c.lineWidth=4;for(let i=0;i<20;i++){const y=hash(i)*H,x=((hash(i*3)*W-(t*2400))%W+W)%W;seg(c,x,y,x+220,y);}c.restore();
  const k=back(clamp((t-t0)/0.3));c.save();c.translate(800,470);c.scale(k,k);c.fillStyle='rgba(10,8,14,0.85)';c.beginPath();c.arc(0,0,130,Math.PI,TAU);c.closePath();c.fill();c.strokeStyle='#ffd23f';c.lineWidth=8;c.stroke();const v=eo(clamp((t-t0)/0.9));c.strokeStyle='#fff';c.lineWidth=8;seg(c,0,0,Math.cos(Math.PI+v*Math.PI*0.85)*100,Math.sin(Math.PI+v*Math.PI*0.85)*100);txt(c,Math.round(v*50)+' KM/H',0,40,44,'#fff',{sw:8});c.restore();vignette(c,0.4);};
// 25 · "difficult to hit," — bullets kick dust where the emu WAS: MISS, MISS
SH.hit=function(c,t){LIT();const t0=TW('difficult');const hh=handheld(t,8);outback(c,t,{x:540+hh.x,y:1160+hh.y,z:1.0,mm:50},{land:'scrub',world:(c2,GY)=>{
  const zz=Math.sin((t-t0)*7)*220;emu(c2,620+zz,GY+640,2.0,t,{pose:'run',view:'q3',f:Math.cos((t-t0)*7)>0?1:-1,seed:26,spd:16});for(let i=0;i<4;i++){const p=((t-t0)*2.5+i*0.25)%1;dustHit(c2,620+Math.sin((t-t0-0.25-i*0.1)*7)*220,GY+660,1.6,t,i*7);}
  const G=gunner(c2,180,GY+880,2.0,t,{fire:true,ang:-0.12,eyes:'squeeze',mouth:'grit'});}});
  for(let i=0;i<3;i++){const k=back(clamp((t-t0-0.2-i*0.45)/0.2));if(k>0){c.save();c.translate(700+(i-1)*180,430+(i%2)*70);c.scale(k,k);c.rotate((i-1)*0.12);txt(c,'MISS',0,0,72,'#ffd23f',{sw:12});c.restore();}}vignette(c,0.4);};
// 26 · "and seemed completely impossible to control." — chaos: soldiers chase in circles, hats fly, emus everywhere
SH.control=function(c,t){LIT();const t0=TW('seemed');const hh=handheld(t,10);outback(c,t,{x:540+hh.x,y:1180+hh.y,z:1.0,mm:35},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+760,2.2);
  const s1=(t-t0)*2.2;flock(c2,t,{n:40,x0:-200,x1:1300,y0:GY+100,y1:GY+680,persp:P,pose:'run',view:'q3',seed:27,flow:(x,y,i)=>({x:((x+(t*(150+hash(i)*200))*(i%2?1:-1))%1500+1500)%1500-200,y}),f:i=>i%2?1:-1,
    actors:[{x:540+Math.cos(s1)*240,y:GY+700+Math.sin(s1)*110,rx:80,draw:()=>DW(c2,540+Math.cos(s1)*240,GY+700+Math.sin(s1)*110,2.0,t,{f:-Math.sin(s1)>0?1:-1,run:1,ph:t*13,eyes:'wide',brow:'worried',mouth:'scream',seed:1})},
      {x:540+Math.cos(s1+Math.PI)*240,y:GY+700+Math.sin(s1+Math.PI)*110,rx:80,draw:()=>DW(c2,540+Math.cos(s1+Math.PI)*240,GY+700+Math.sin(s1+Math.PI)*110,2.0,t,{f:-Math.sin(s1+Math.PI)>0?1:-1,run:1,ph:t*13+1,eyes:'shock',brow:'up',mouth:'scream',seed:2})}]});
  const hp=((t-t0)*0.9)%1;c2.save();c2.translate(300+hp*500,GY+200-Math.sin(hp*Math.PI)*400);c2.rotate(hp*8);hat2b(c2,'slouch',1.6,1,27*1.6,t);c2.restore();}});vignette(c,0.4);};
// 27 · "The soldiers even mounted a machine gun on a truck," — the truck rolls in, gunner standing in the tray
SH.truck=function(c,t){LIT();const t0=A(15);const q=eo(clamp((t-t0)/1.6));outback(c,t,{x:540,y:1120,z:pushZ(t,t0,TW('hoping'),1.0,1.1),mm:35},{land:'scrub',world:(c2,GY)=>{
  truck(c2,lerp(-200,560,q),GY+640,1.05,t,{view:'q3',moving:q<1,gunner:(x,y,s,pt)=>{const gp=pt(-0.85,1.76,0);fig2(c2,{kind:'digger',view:'front',x,y,s,f:1,t,eyes:'focus',brow:'angry',mouth:'smirk',hf:[(gp.x-x)/s,(gp.y-(y-200*s))/s],hb:[(gp.x-x)/s-6,(gp.y-(y-200*s))/s+6]});}});}});
  tag(c,540,430,'TRUCK-MOUNTED GUN',GOLD_C,t,TW('truck')-0.1);vignette(c,0.4);};
// 28 · "hoping to chase them down." — tracking chase across the scrub
SH.chase=function(c,t){LIT();const t0=TW('hoping');const xw=(t-t0)*700;outback(c,t,{x:700+xw,y:1150,z:1.0,mm:50},{land:'scrub',world:(c2,GY)=>{const P=PSP(GY,GY+640,1.2);
  flock(c2,t,{n:16,x0:0,x1:1,y0:GY+300,y1:GY+620,persp:P,pose:'run',view:'q3',f:1,seed:28,spd:16,flow:(x,y,i)=>({x:900+xw+i*70+Math.sin(t*2+i)*40,y}),
    actors:[{x:300+xw,y:GY+700,rx:1,draw:()=>{const T0=truck(c2,300+xw,GY+700,1.0,t,{view:'q3',moving:1,bump:0.3,gunner:(x,y,s,pt)=>{const gp=pt(-0.85,1.76,0);fig2(c2,{kind:'digger',x,y,s,f:1,t,eyes:'angry',brow:'angry',mouth:'grit',hf:[(gp.x-x)/s,(gp.y-(y-200*s))/s],hb:[(gp.x-x)/s-6,(gp.y-(y-200*s))/s+6]});}});muzzleFlash(c2,T0.muzzle.x,T0.muzzle.y,1.0,t,0,1);}}]});}});FX.speed=0.4;vignette(c,0.4);};
// 29 · "But the rough terrain made aiming almost impossible." — the truck bucks over ruts; the gun sight swings wildly
SH.terrain=function(c,t){LIT();const t0=TW('rough')-0.6;const xw=(t-t0)*500;const hh=handheld(t,16);outback(c,t,{x:540+xw+hh.x,y:1150+hh.y,z:1.15,mm:85},{land:'scrub',world:(c2,GY)=>{
  for(let i=0;i<12;i++){const x=i*260-400+Math.floor(xw/260)*260;c2.fillStyle='rgba(90,40,20,0.5)';c2.beginPath();c2.ellipse(x,GY+760,90,22,0,0,TAU);c2.fill();c2.fillStyle='#8a5a3a';c2.beginPath();c2.ellipse(x+120,GY+740,60,26,0,Math.PI,TAU);c2.fill();}
  truck(c2,480+xw,GY+760,1.15,t,{view:'q3',moving:1,bump:1.6,gunner:(x,y,s,pt)=>{const gp=pt(-0.85,1.76,0);fig2(c2,{kind:'digger',x,y,s,f:1,t,eyes:'shock',brow:'up',mouth:'scream',hf:[(gp.x-x)/s,(gp.y-(y-200*s))/s],hb:[(gp.x-x)/s-6,(gp.y-(y-200*s))/s+6]});}});}});
  const ax=820+Math.sin(t*9)*130,ay=480+Math.cos(t*7)*90;c.save();c.strokeStyle='#ffd23f';c.lineWidth=6;c.beginPath();c.arc(ax,ay,70,0,TAU);c.stroke();seg(c,ax-100,ay,ax+100,ay);seg(c,ax,ay-100,ax,ay+100);c.restore();vignette(c,0.45);};
// 30 · "And the emus just kept running." — low angle: they stream past camera, endless
SH.running=function(c,t){LIT('#ffd8a0','#3a2418');const t0=A(16);outback(c,t,{x:540,y:1250,z:1.0,mm:24},{land:'scrub',dusk:1,world:(c2,GY)=>{const P=PSP(GY,GY+700,2.0);
  flock(c2,t,{n:44,x0:-300,x1:1400,y0:GY+60,y1:GY+780,persp:P,pose:'run',view:'q3',f:1,spd:15,seed:30,flow:(x,y,i)=>({x:((x+t*(300+hash(i)*200))%1900+1900)%1900-400,y})});}});vignette(c,0.4);};
// 31 · "After several failed attempts," — one, two, three attempts: X X X
SH.failed=function(c,t){LIT();const t0=A(17);outback(c,t,{x:540,y:1180,z:1.05,mm:50},{land:'scrub',world:(c2,GY)=>{DW(c2,540,GY+800,2.5,t,{f:1,eyes:'half',brow:'worried',mouth:'frown',seed:1,lean:0.1,crouch:6});ammoCrate(c2,820,GY+760,1.6,'EMPTY');}});
  for(let i=0;i<3;i++){const k=clamp((t-t0-0.15-i*0.4)/0.25);if(k>0){c.save();c.translate(300+i*240,440);c.fillStyle='rgba(10,8,14,0.8)';c.beginPath();c.roundRect(-90,-90,180,180,20);c.fill();bigX(c,0,0,70,k,'#ffd23f');c.restore();}}vignette(c,0.45);};
// 32 · "the military operation was called off." — stamp; the truck drives away into the dusk
SH.off=function(c,t){LIT('#ffb890','#2a1a20');const t0=TW('called')-0.2;outback(c,t,{x:540,y:1150,z:1.0,mm:35},{land:'scrub',dusk:1,world:(c2,GY)=>{truck(c2,600-(t-t0)*120,GY+420,0.8,t,{view:'q3',f:-1,moving:1});emu(c2,860,GY+700,1.9,t,{pose:'stand',view:'q3',f:-1,seed:32});}});
  stamp(c,t0,t,'CALLED OFF',540,450,{size:100,col:'#ffd23f',rot:-0.1});vignette(c,0.45);};
// 33 · "The soldiers had fired thousands of rounds," — empty brass everywhere; counter
SH.rounds=function(c,t){LIT();const t0=A(18);c.fillStyle='#7a4424';c.fillRect(0,0,W,H);for(let i=0;i<260;i++){const x=hash(i)*W,y=700+hash(i*3)*1220,a=hash(i*5)*TAU,k=clamp((t-t0-hash(i*7)*1.2)/0.2);if(k<=0)continue;c.save();c.translate(x,y-(1-k)*300);c.rotate(a);c.fillStyle='#d8a840';c.strokeStyle='#5a3a10';c.lineWidth=2;c.beginPath();c.roundRect(-22,-7,44,14,5);c.fill();c.stroke();c.fillStyle='#f0d080';c.fillRect(-16,-5,24,3);c.restore();}
  counterCard(c,540,450,back(clamp((t-t0)/0.3)),'~'+Math.round(eo(clamp((t-t0)/1.2))*10000).toLocaleString('en-US'),'ROUNDS FIRED');vignette(c,0.45);};
// 34 · "but the emus were still everywhere." — pull back: emus all over the camp, one standing on the truck
SH.everywhere=function(c,t){LIT();const t0=TW('still')-0.3;outback(c,t,{x:540,y:1150,z:pushZ(t,t0,A(19),1.25,0.95),mm:35},{land:'farm',world:(c2,GY)=>{const P=PSP(GY,GY+760,2.2);
  flock(c2,t,{n:80,x0:-300,x1:1400,y0:GY+30,y1:GY+700,persp:P,pose:'graze',seed:34,view:'q3',actors:[{x:520,y:GY+620,rx:330,ry:60,draw:()=>{truck(c2,520,GY+620,1.2,t,{view:'q3'});emu(c2,520-0.9*167*1.2,GY+620-1.1*167*1.2,1.2,t,{pose:'stand',view:'q3',f:-1,seed:35});}}]});}});vignette(c,0.4);};
// 35 · "And that's how Australia became famous" — newspapers spin in
SH.famous=function(c,t){const t0=A(19);c.fillStyle='#2a2420';c.fillRect(0,0,W,H);const k=eo(clamp((t-t0)/0.6));emuPaper(c,540,760,lerp(0.2,1.0,k),lerp(6,-0.06,k),t);tag(c,540,330,'FAMOUS WORLDWIDE',GOLD_C,t,TW('famous'));vignette(c,0.5);};
// 36 · "for fighting a war against birds..." — map of Australia with an emu flag over the wheatbelt
SH.against=function(c,t){const t0=TW('fighting');const P=ausMap(c,t,{z:1.6,lc:126,la:-28,cx:540,cy:780,wa:1,wheat:1});const q=P([118.4,-31.1]);const k=back(clamp((t-t0)/0.4));
  c.save();c.translate(q[0],q[1]);c.scale(k,k);c.strokeStyle='#3a2a1a';c.lineWidth=8;seg(c,0,0,0,-260);c.fillStyle='#ffd23f';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(0,-260);c.lineTo(190,-215);c.lineTo(0,-170);c.closePath();c.fill();c.stroke();c.restore();emu(c,q[0]+90,q[1]-170*k+10,0.45*k,t,{pose:'stand',view:'q3',seed:2});vignette(c,0.4);};
// 37 · "and losing." — the victor: an emu in a slouch hat stands on the abandoned truck at sunset; final score
SH.losing=function(c,t){LIT('#ffb080','#3a1a10');const t0=A(20);outback(c,t,{x:540,y:1180,z:pushZ(t,t0,END,1.05,1.2),mm:50},{land:'scrub',dusk:1,world:(c2,GY)=>{
  truck(c2,520,GY+760,1.15,t,{view:'q3'});const ex=520-0.95*167*1.15,ey=GY+760-1.12*167*1.15;emu(c2,ex,ey,1.6,t,{pose:'stand',view:'q3',f:-1,seed:37});const eh=emuHead(ex,ey,1.6,'q3',-1);c2.save();c2.translate(eh.x+3,eh.y+22);c2.rotate(-0.15);hat2b(c2,'slouch',0.95,-1,27*0.95,t);c2.restore();}});
  scoreboard(c,540,440,back(clamp((t-t0)/0.3)),1,0);const f=clamp((t-(END-1.8))/1.7);vignette(c,0.45);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
var SHOTS=[[0,'hook'],[A(1)-0.05,'map'],[TW('soldiers')-0.1,'troops'],[TW('fight')-0.1,'horde'],[A(2)-0.05,'won'],[A(3)-0.05,'ww1'],[TW('thousands')-0.1,'settle'],[TW('western')-0.1,'wa'],[A(4)-0.05,'problem'],[A(5)-0.05,'emus'],
  [A(6)-0.05,'stats'],[TW('migrated')-0.1,'migrate'],[TW('destroying')-0.1,'crops'],[TW('damaging')-0.1,'fence'],[A(7)-0.05,'beg'],[A(8)-0.05,'military'],[A(9)-0.05,'two'],[A(10)-0.05,'guns'],[TW('thousands',1)-0.1,'ammo'],[A(11)-0.05,'wrong'],
  [A(12)-0.05,'nov2'],[TW('spotted')-0.1,'spot'],[TW('opened')-0.1,'fire'],[A(13)-0.05,'scatter'],[A(14)-0.05,'fast'],[TW('difficult')-0.1,'hit'],[TW('seemed')-0.1,'control'],[A(15)-0.05,'truck'],[TW('hoping')-0.1,'chase'],[TW('rough')-0.7,'terrain'],
  [A(16)-0.05,'running'],[A(17)-0.05,'failed'],[TW('called')-0.25,'off'],[A(18)-0.05,'rounds'],[TW('still')-0.3,'everywhere'],[A(19)-0.05,'famous'],[TW('fighting')-0.1,'against'],[A(20)-0.05,'losing']];
var IMPACTS=[[0.02,10,0.3,'#ffffff',0.3],[TW('won'),8,0.3],[A(5),12,0.4,'#ffffff',0.3],[TW('military')-0.15,8,0.25],[A(10),8,0.3],[TW('opened'),12,0.5],[TW('called')-0.2,8,0.3]];

function emuPaper(c,x,y,s,rot,t){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=30;c.fillStyle='#ece4cc';c.fillRect(-380,-500,760,1000);c.shadowColor='transparent';c.strokeStyle='#222';c.lineWidth=4;c.strokeRect(-380,-500,760,1000);
  c.fillStyle='#111';c.font='900 52px "Lora",serif';c.textAlign='center';c.fillText('THE DAILY NEWS',0,-430);c.fillRect(-340,-405,680,6);c.font='900 92px "Inter Display"';c.fillStyle='#111';c.fillText('THE GREAT',0,-300);c.fillText('EMU WAR',0,-200);
  c.fillStyle='#c8bfa4';c.fillRect(-320,-150,640,400);c.strokeRect(-320,-150,640,400);c.save();c.beginPath();c.rect(-320,-150,640,400);c.clip();emu(c,-60,230,1.9,t,{pose:'stand',view:'q3',f:1,seed:3});emu(c,190,200,1.4,t,{pose:'run',view:'q3',f:-1,seed:5});c.restore();
  c.fillStyle='#555';for(let i=0;i<9;i++){c.fillRect(-320,290+i*22,i%3===2?400:640,10);}c.restore();}
