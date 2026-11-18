'use strict';
// ===================== Sleep paralysis · shots =====================
SHOTS.length=0;SEQ.length=0;
const V={};const VSEQ=[];
function scr(c,p){const M=c.getTransform();return {x:(M.a*p.x+M.c*p.y+M.e)/SS,y:(M.b*p.x+M.d*p.y+M.f)/SS,s:p.s*M.a/SS};}
function headWho(c,kind,x,y,s,o){o=Object.assign({},o);if(!o.rot)o.rot=1e-4;const oy=headOff(kind,o)*s;return who(c,kind,[0,0,0],Object.assign({},o,{abs:{x,y:y-oy,s}}));}
function shake(c,k,t){if(k<=0)return;c.translate(Math.sin(t*90)*k*14,Math.cos(t*77)*k*10);}
function darkBG(c,t,col='10,12,30'){c.fillStyle='#05060c';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,960,80,540,960,1000);g.addColorStop(0,`rgba(${col},0.9)`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);motes(c,t,18,'160,170,220');}
function inBed(c,o={}){return coupleFront(c,Object.assign({her:false,hx:o.hx??0,hb:1.2,ho:o.ho||X('sleep','flat','flat',{view:'front'})},o));}
function moon(c,t){c.save();c.globalCompositeOperation='screen';const g=c.createLinearGradient(900,0,300,1900);g.addColorStop(0,'rgba(120,150,255,0.18)');g.addColorStop(1,'rgba(120,150,255,0)');c.fillStyle=g;c.beginPath();c.moveTo(780,0);c.lineTo(1080,0);c.lineTo(600,1920);c.lineTo(220,1920);c.closePath();c.fill();c.restore();}
const fear=(o={})=>X('wide','worried','grit',Object.assign({view:'front',sweat:1},o));
// 1 · "You wake up in the middle of the night." his eyes snap open in the dark
V.open=(c,t,u,d)=>{const tn=wt('night');cam(c,'hb_front',{z:K3(u,d,1.25,1.45),y:820});const op=t>tn-0.05;
  inBed(c,{ho:X(op?'wide':'sleep',op?'up':'flat','flat',{view:'front',look:op?Math.sin(t*3)*0.5:0})});c.restore();NIGHT(c);moon(c,t);if(op)flash(c,Math.max(0,0.25-(t-tn)*1),'#000');cine(c,t,{v:0.75});};
// 2 · "You can't move…" close: eyes dart, body won't respond
V.cant=(c,t,u,d)=>{c.save();shake(c,0.12,t);cam(c,'hb_front',{z:K3(u,d,2.0,2.2),y:640});inBed(c,{ho:fear({look:Math.sin(t*5)*0.8,sweat:2})});c.restore();c.restore();NIGHT(c);cine(c,t,{v:0.8});};
// 3 · "…and something is standing at the foot of your bed." his view down the bed into the dark
V.thing=(c,t,u,d)=>{const ts=wt('standing'),tb=wt('bed',6.5);cam(c,'hb_pov',{z:K3(u,d,1.05,1.25),y:980});const p=scr(c,pp([0,0,1.15]));c.restore();NIGHT(c);
  hooded(c,p.x,p.y,p.s*340,ON(t,ts-0.4,1.1),t,{eyes:ON(t,tb-0.1,0.4)});povBlanket(c,t);tint(c,'rgba(0,0,0,0.25)','multiply');cine(c,t,{v:0.85});};
// 4 · title: the whole room — him frozen in bed, the figure at the foot
V.title=(c,t,u,d)=>{cam(c,'hb_corner',{z:K3(u,d,1.04,1.12),y:1000});const p=scr(c,pp([-2.95,0,-1.75]));c.restore();NIGHT(c);
  moonShaft(c,t,620);hooded(c,p.x,p.y,p.s*350,flick(t),t,{eyes:0.9,blur:6});cine(c,t,{v:0.8});};
// 5 · "Your eyes are open." extreme close on the eyes
V.eyes=(c,t,u,d)=>{darkBG(c,t);headWho(c,'him',540,1060,lerp(8.6,9.2,u/d),fear({look:Math.sin(t*6)*0.9,sweat:2}));NIGHT(c);cine(c,t,{v:0.8});};
// 6 · "You try to scream." mouth strains, no sound
V.scream=(c,t,u,d)=>{darkBG(c,t);c.save();shake(c,0.2,t);headWho(c,'him',540,900,lerp(5.4,5.8,u/d),X('squeeze','worried','grit',{view:'front',sweat:2,vein:1}));c.restore();
  const k=popK(t,wt('scream')+0.1);if(k>0){c.save();c.translate(870,1450);c.scale(k,k);speaker(c,0,0,90,true,1);c.restore();}NIGHT(c);cine(c,t,{v:0.8});};
// 7 · "Nothing. Not a word. Not even a finger." from above: frozen in bed, a hand that won't move
V.nothing=(c,t,u,d)=>{const tf=wt('finger',19.8);cam(c,'hb_front',{z:K3(u,d,1.35,1.5),y:860});inBed(c,{ho:fear({sweat:2})});const hp=pp([0.42,0.72,-0.9]);c.restore();NIGHT(c);
  if(t>tf-0.4){pulseRing(c,tf-0.4,t,hp.x,hp.y,110,null,{end:d+V.nothing.t0});}cine(c,t,{v:0.8});};
// 8 · "Then you feel it." eyes slide down to his chest
V.feel=(c,t,u,d)=>{cam(c,'hb_front',{z:K3(u,d,2.1,2.25),y:640});inBed(c,{ho:fear({look:0,eyes:'wide',brow:'worried'})});c.restore();NIGHT(c);cine(c,t,{v:0.85});};
// 9 · "A weight on your chest… pressing down. Harder." a dark mass settles on him
V.weight=(c,t,u,d)=>{const tp=wt('pressing'),th=wt('harder',25.6);const press=ON(t,tp-0.2,0.6)+0.8*ON(t,th,0.25);const sh=t>th?0.3:(t>tp?0.1:0.03);
  c.save();const z=K3(u,d,1.5,1.6);c.translate(540,1150);c.scale(z,z);c.translate(-445,-1060);
  chestScene(c,t,{k:ON(t,V.weight.t0,1.4),press,shake:sh,eyes:ON(t,V.weight.t0+0.6,0.4),ho:X('wide','worried','grit',{view:'3q',sweat:2,vein:t>th?1:0})});c.restore();cine(c,t,{v:0.85});};
function arrowDown(c,x,y,t,k){if(k<=0)return;c.save();c.globalAlpha=k;c.translate(x,y+((t*2)%1)*30);c.fillStyle='rgba(200,60,80,0.85)';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(-18,-50);c.lineTo(18,-50);c.lineTo(18,0);c.lineTo(36,0);c.lineTo(0,40);c.lineTo(-36,0);c.lineTo(-18,0);c.closePath();c.fill();c.stroke();c.restore();}
// 10 · "This is sleep paralysis." slow push across the room, the figure watching
V.name=(c,t,u,d)=>{cam(c,'hb_corner',{z:K3(u,d,1.12,1.28),x:520,y:980});const p=scr(c,pp([-2.95,0,-1.75]));c.restore();NIGHT(c);moonShaft(c,t,620);hooded(c,p.x,p.y,p.s*350,0.95,t,{eyes:1,blur:6});cine(c,t,{v:0.8});};
// 11 · "about 8 percent of people" — 100 people, 8 light up
V.pct=(c,t,u,d)=>{const t8=wt('8',29.9);darkBG(c,t);const k=popK(t,V.pct.t0+0.1,0.5);for(let i=0;i<100;i++){const cx=180+(i%10)*80,cy=620+Math.floor(i/10)*92;const lit=[3,17,26,41,58,62,77,94].includes(i)&&t>t8+i*0.004;c.save();c.translate(cx,cy);c.scale(k,k);personIcon(c,0,0,30,lit?'#ff4a5a':'#4a5068');c.restore();}
  if(t>t8){c.save();c.translate(540,1620);c.scale(popK(t,t8),popK(t,t8));txt(c,'8%',0,0,150,'#ff4a5a',{sw:22});c.restore();}cine(c,t,{v:0.6,bars:0});};
// 12 · "When you dream, your brain switches off your muscles…" brain + lever; a sleepwalker punching the wall, crossed out
V.switch=(c,t,u,d)=>{const ts=wt('switches'),tp=wt('punch',38.9);darkBG(c,t,'30,20,60');brainSide(c,330,760,1.1,t,{});const on=1-ON(t,ts,0.5);lever(c,800,760,1,on,t);flexIco(c,800,520,60,on>0.5);
  c.strokeStyle='rgba(160,200,255,0.6)';c.lineWidth=6;c.setLineDash([16,12]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(500,760);c.lineTo(690,760);c.stroke();c.setLineDash([]);
  const k=popK(t,tp-0.4);if(k>0){c.save();c.translate(540,1450);c.scale(k,k);panel(c,-300,-220,600,440,{r:40,fill:'rgba(20,20,40,0.9)'});c.fillStyle='#6a5a8a';c.fillRect(160,-200,40,400);
    who(c,'him',[0,0,0],X('closed','angry','grit',{view:'side',f:1,abs:{x:0,y:190,s:0.95},hf:[lerp(40,110,clamp((t-tp)*4)),-30],hb:[-20,40]}));crossOut(c,40,0,170,popK(t,tp+0.3,0.25));c.restore();}cine(c,t,{v:0.6,bars:0});};
// 13 · "But sometimes, your mind wakes up… before that switch flips back."
V.wakes=(c,t,u,d)=>{const tw=wt('wakes',41.3),tf=wt('flips',43.2);darkBG(c,t,'30,20,60');const lit=ON(t,tw,0.4);c.save();c.globalAlpha=0.4+0.6*lit;brainSide(c,330,820,1.15,t,{});c.restore();
  if(lit>0){const g=c.createRadialGradient(330,820,40,330,820,360);g.addColorStop(0,`rgba(255,240,170,${0.35*lit})`);g.addColorStop(1,'rgba(255,240,170,0)');c.fillStyle=g;c.fillRect(0,400,700,900);eyeIco(c,330,520,60,true);}
  lever(c,800,820,1,Math.max(0,Math.sin(t*20)*0.08*ON(t,tf-0.2,0.2)),t);flexIco(c,800,580,60,false);if(t>tf)crossOut(c,800,1080,70,popK(t,tf+0.1));cine(c,t,{v:0.6,bars:0});};
// 14 · "So you're awake. But your body is still asleep." top view: head lit, body grey and frozen
V.split=(c,t,u,d)=>{const ta=wt('asleep',46.7);cam(c,'hb_front',{z:K3(u,d,1.3,1.4),y:860});inBed(c,{ho:fear()});const hd=pp([0,0.95,-1.74]),bd=pp([0,0.62,-0.8]);c.restore();NIGHT(c);
  c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(hd.x,hd.y,30,hd.x,hd.y,260);g.addColorStop(0,'rgba(255,230,150,0.55)');g.addColorStop(1,'rgba(255,230,150,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  if(t>ta-0.3){c.save();c.fillStyle=`rgba(40,60,140,${0.45*ON(t,ta-0.3,0.5)})`;c.beginPath();c.ellipse(bd.x,bd.y+40,380,200,0,0,TAU);c.fill();c.restore();zzz(c,bd.x+260,bd.y-60,t,1.3,ON(t,ta-0.3,0.5));}cine(c,t,{v:0.75});};
// 15 · "And the dream doesn't stop. It leaks into your room."
V.leak=(c,t,u,d)=>{cam(c,'hb_room',{z:K3(u,d,1.08,1.2),y:960});inBed(c,{ho:fear()});const hp=pp([0,0.95,-1.74]);c.restore();NIGHT(c);dreamWisps(c,hp.x,hp.y,t,ON(t,wt('leaks',50.4)-0.6,1.2),1.1);cine(c,t,{v:0.8});};
// 16 · "Your brain's fear center is still running at full power. It scans the dark for a threat…"
V.fearC=(c,t,u,d)=>{const ts=wt('scans',55.7);darkBG(c,t,'40,10,20');brainSide(c,540,900,1.9,t,{});const am={x:540+120,y:900+70};const pu=0.6+0.4*Math.sin(t*9);
  const g=c.createRadialGradient(am.x,am.y,0,am.x,am.y,150);g.addColorStop(0,`rgba(255,60,50,${0.95*pu})`);g.addColorStop(1,'rgba(255,60,50,0)');c.fillStyle=g;c.beginPath();c.arc(am.x,am.y,150,0,TAU);c.fill();
  if(t>ts-0.2){const a=t*3;c.save();c.globalAlpha=ON(t,ts-0.2,0.4);c.strokeStyle='rgba(255,90,80,0.6)';c.lineWidth=4;for(const r of [260,420,580]){c.beginPath();c.arc(am.x,am.y,r,0,TAU);c.stroke();}
    const sg=c.createConicGradient?c.createConicGradient(a,am.x,am.y):null;if(sg){sg.addColorStop(0,'rgba(255,80,70,0.45)');sg.addColorStop(0.12,'rgba(255,80,70,0)');sg.addColorStop(1,'rgba(255,80,70,0)');c.fillStyle=sg;c.beginPath();c.arc(am.x,am.y,600,0,TAU);c.fill();}c.restore();}cine(c,t,{v:0.7,bars:0});};
// 17 · "…and when it can't find one, it builds one. A shadow. A figure. A face."
V.build=(c,t,u,d)=>{const tsh=wt('shadow',60.5),tfi=wt('figure',61.5),tfa=wt('face',63);cam(c,'hb_pov',{z:K3(u,d,1.05,1.35),y:980});const p=scr(c,pp([0,0,1.1]));c.restore();NIGHT(c);
  const k1=ON(t,tsh-0.2,0.5),k2=ON(t,tfi-0.2,0.5),k3=ON(t,tfa-0.2,0.5);
  if(k2<1){c.save();c.globalAlpha=k1*(1-k2);const g=c.createRadialGradient(p.x,p.y-p.s*160,10,p.x,p.y-p.s*160,p.s*200);g.addColorStop(0,'rgba(4,2,10,0.95)');g.addColorStop(1,'rgba(4,2,10,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
  hooded(c,p.x,p.y,p.s*340,k2,t,{eyes:k3,blur:lerp(14,5,k3)});povBlanket(c,t);cine(c,t,{v:0.85});};
// 18 · "That weight on your chest? Your breathing just feels shallow… and your brain fills in the rest."
V.breath=(c,t,u,d)=>{const tsh=wt('shallow',66.8),tr=wt('fills',68.6);darkBG(c,t);c.save();c.translate(540,760);panel(c,-380,-170,760,340,{r:40,fill:'rgba(14,16,32,0.94)'});
  c.strokeStyle='#7ac8ff';c.lineWidth=8;c.lineCap='round';c.beginPath();const amp=lerp(110,26,ON(t,tsh-0.3,0.6));for(let x=-330;x<=330;x+=6){const y=Math.sin((x+t*260)*0.025)*amp;x===-330?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();c.restore();
  c.save();c.translate(540,760-260);lungIcon2(c,80);c.restore();
  const k=ON(t,tr-0.2,0.6);if(k>0){thought(c,540,1380,560,420,k,540,1150,(cc)=>{hooded(cc,0,150,300,1,t,{eyes:1,blur:2});});}cine(c,t,{v:0.6,bars:0});};
function lungIcon2(c,r){c.fillStyle='#f08a8a';c.strokeStyle=OL;c.lineWidth=r*0.07;for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*r*0.3,r*0.05,r*0.26,r*0.44,sd*0.15,0,TAU);c.fill();c.stroke();}c.strokeStyle='#f6f6f6';c.lineWidth=r*0.09;seg(c,0,-r*0.6,0,-r*0.15);}
// 19 · "Something is sitting on you."
V.sit=(c,t,u,d)=>{c.save();const z=K3(u,d,1.58,1.7);c.translate(540,1150);c.scale(z,z);c.translate(-445,-1060);chestScene(c,t,{k:1,press:1+0.2*Math.sin(t*3),shake:0.1,eyes:1,ho:X('wide','worried','grit',{view:'3q',sweat:2})});c.restore();cine(c,t,{v:0.85});};
// 20–22 · history on old parchment
V.demons=(c,t,u,d)=>{darkBG(c,t,'50,30,10');parchment(c,540,960,820,1080,popK(t,V.demons.t0+0.1,0.5),cc=>{inkSleeper(cc,0,200,1.6);cc.save();cc.globalAlpha=0.9;hooded(cc,-150,150,330,1,t,{eyes:0.6,blur:1});cc.restore();
  cc.strokeStyle='#4a2a10';cc.lineWidth=3;for(let i=0;i<6;i++){cc.beginPath();cc.moveTo(-320,-380+i*40);cc.lineTo(320,-380+i*40+(hash(i)-0.5)*6);cc.stroke();}});candles(c,t);cine(c,t,{v:0.7,bars:0});};
function candles(c,t){for(const [x,y] of [[140,1620],[940,1640]]){c.fillStyle='#efe2c0';c.strokeStyle=OL;c.lineWidth=4;rr(c,x-22,y-120,44,140,8);c.fill();c.stroke();const fl=1+Math.sin(t*14+x)*0.08;c.save();c.translate(x,y-140);c.scale(1,fl);const g=c.createRadialGradient(0,0,2,0,0,160);g.addColorStop(0,'rgba(255,200,110,0.45)');g.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=g;c.fillRect(-160,-160,320,320);c.fillStyle='#ffd27a';c.beginPath();c.moveTo(0,-34);c.quadraticCurveTo(16,0,0,10);c.quadraticCurveTo(-16,0,0,-34);c.fill();c.restore();}}
V.oldhag=(c,t,u,d)=>{darkBG(c,t,'30,40,60');parchment(c,540,960,820,1080,popK(t,V.oldhag.t0+0.1,0.5),cc=>{cc.save();cc.globalAlpha=0.95;hooded(cc,40,420,640,1,t,{eyes:0.9,blur:1});cc.restore();
  // little wooden cabin + snow
  cc.strokeStyle='#2a1a10';cc.lineWidth=5;cc.beginPath();cc.moveTo(-330,-260);cc.lineTo(-230,-360);cc.lineTo(-130,-260);cc.lineTo(-130,-160);cc.lineTo(-330,-160);cc.closePath();cc.stroke();cc.fillStyle='rgba(42,26,16,0.6)';for(let i=0;i<20;i++){cc.beginPath();cc.arc((hash(i)-0.5)*700,(hash(i*3)-0.5)*900,4,0,TAU);cc.fill();}});cine(c,t,{v:0.7,bars:0});};
V.japan=(c,t,u,d)=>{darkBG(c,t,'40,20,30');parchment(c,540,960,820,1080,popK(t,V.japan.t0+0.1,0.5),cc=>{cc.fillStyle='#b8402a';cc.beginPath();cc.arc(200,-300,90,0,TAU);cc.fill();
  // futon + frozen sleeper (ink), shoji grid behind
  cc.strokeStyle='#3a2414';cc.lineWidth=4;for(let i=0;i<5;i++){cc.beginPath();cc.moveTo(-340+i*90,-420);cc.lineTo(-340+i*90,-60);cc.stroke();}for(let j=0;j<4;j++){cc.beginPath();cc.moveTo(-340,-420+j*90);cc.lineTo(20,-420+j*90);cc.stroke();}
  inkSleeper(cc,0,220,1.6);cc.strokeStyle='#b8402a';cc.lineWidth=5;for(const a of [-0.4,0,0.4]){cc.beginPath();cc.moveTo(-190+Math.cos(a-1.57)*60,170+Math.sin(a-1.57)*60);cc.lineTo(-190+Math.cos(a-1.57)*100,170+Math.sin(a-1.57)*100);cc.stroke();}});cine(c,t,{v:0.7,bars:0});};
// 23 · "In 1781, a painter showed it as a demon crouched on a sleeping woman's chest."
V.paint=(c,t,u,d)=>{const td=wt('demon',83);darkBG(c,t,'40,20,10');const k=popK(t,V.paint.t0+0.1,0.6);painting(c,540,940,760,560,t,k*lerp(1,1.08,u/d));if(t>td){pulseRing(c,td,t,540-760*0.06*1.05,940-560*0.07*1.05,110,null,{end:d+V.paint.t0});}
  c.save();c.fillStyle='#d8b060';c.strokeStyle=OL;c.lineWidth=4;rr(c,400,1340,280,70,8);c.fill();c.stroke();txt(c,'1781',540,1376,46,'#2a1a08',{stroke:false});c.restore();cine(c,t,{v:0.7,bars:0});};
// 24 · "It usually lasts a few seconds. Sometimes a couple of minutes." timer ring
V.lasts=(c,t,u,d)=>{const tm=wt('minutes',88.8);darkBG(c,t);const sec=t<tm-0.6?Math.min(10,(t-V.lasts.t0)*6):lerp(10,120,ON(t,tm-0.6,0.9));const k=popK(t,V.lasts.t0+0.1);
  c.save();c.translate(540,960);c.scale(k,k);c.lineWidth=40;c.strokeStyle='rgba(255,255,255,0.1)';c.beginPath();c.arc(0,0,280,0,TAU);c.stroke();c.strokeStyle='#7ac8ff';c.beginPath();c.arc(0,0,280,-Math.PI/2,-Math.PI/2+TAU*sec/120);c.stroke();
  const m=Math.floor(sec/60),s=Math.floor(sec%60);txt(c,`${m}:${String(s).padStart(2,'0')}`,0,10,150,'#fff',{sw:16});c.restore();cine(c,t,{v:0.6,bars:0});};
// 25 · "And it can't hurt you."
V.safe=(c,t,u,d)=>{darkBG(c,t,'20,50,40');const k=popK(t,V.safe.t0+0.1,0.5);c.save();c.translate(540,960);c.scale(k,k);c.fillStyle='#2fbf74';c.strokeStyle=OL;c.lineWidth=12;c.beginPath();c.moveTo(0,-260);c.lineTo(220,-180);c.quadraticCurveTo(220,120,0,260);c.quadraticCurveTo(-220,120,-220,-180);c.closePath();c.fill();c.stroke();c.restore();check(c,540,960,130,k);cine(c,t,{v:0.6,bars:0});};
// 26 · "Stress, too little sleep, and sleeping on your back all make it more likely."
V.causes=(c,t,u,d)=>{const t1=wt('stress',91.3),t2=wt('little',91.9),t3=wt('back',93.8);darkBG(c,t);
  const k1=popK(t,t1),k2=popK(t,t2),k3=popK(t,t3);if(k1>0){c.save();c.translate(540,560);c.scale(k1,k1);gauge(c,0,0,160,0.9+Math.sin(t*16)*0.04);c.restore();}
  if(k2>0){c.save();c.translate(540,960);c.scale(k2,k2);battery(c,0,0,1.6,0.15);zzz(c,190,-70,t,1,1);c.restore();}
  if(k3>0){c.save();c.translate(540,1460);c.scale(k3,k3);panel(c,-260,-200,520,400,{r:40,fill:'rgba(20,22,40,0.94)'});who(c,'him',[0,0,0],X('sleep','flat','flat',{view:'front',abs:{x:0,y:170,s:0.95},air:1,hf:[14,93],hb:[-14,93]}));c.restore();}
  cine(c,t,{v:0.6,bars:0});};
// 27 · "If it ever happens, don't fight it."
V.fight=(c,t,u,d)=>{const tf=wt("don't",97.3);cam(c,'hb_front',{z:K3(u,d,2.0,2.15),y:640});inBed(c,{ho:X(t<tf?'squeeze':'half',t<tf?'worried':'flat',t<tf?'grit':'flat',{view:'front',sweat:t<tf?2:0})});c.restore();NIGHT(c);
  const k=popK(t,tf);if(k>0){c.save();c.translate(860,1450);c.scale(k,k);noSign(c,0,0,110,(cc,r)=>{fist2(cc,{x:0,y:0},r/22,'#f6d8c0');});c.restore();}cine(c,t,{v:0.8});};
// 28 · "Focus on moving one finger. Or one toe." close on the hand, then the foot
V.finger=(c,t,u,d)=>{const tf=wt('finger',100),tt=wt('toe',101.2);darkBG(c,t,'20,24,50');const g=c.createLinearGradient(0,1100,0,1920);g.addColorStop(0,'#5a6488');g.addColorStop(1,'#34395a');c.fillStyle=g;c.fillRect(0,1100,W,820);
  if(t<tt-0.25){// hand resting on the duvet, index finger twitches
    const tw=Math.max(0,Math.sin((t-tf)*18))*ON(t,tf-0.1,0.2)*(t<tt-0.4?1:0);handBig(c,540,1180,2.6,tw);ringFx(c,t,tf,620,1050);}
  else{footBig(c,540,1250,2.4,Math.max(0,Math.sin((t-tt)*18)));ringFx(c,t,tt,610,1080);}NIGHT(c);cine(c,t,{v:0.75});};
function ringFx(c,t,t0,x,y){const p=t-t0;if(p<0||p>0.8)return;ring(c,x,y,40+p*260,(1-p/0.8)*0.8,'rgba(255,230,160,',8);}
function handBig(c,x,y,s,tw){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';c.strokeStyle=OL;c.lineWidth=4;
  c.fillStyle='#4e5a6e';rr(c,-160,30,140,70,20);c.fill();c.stroke();const sk='#f2d8c4';c.fillStyle=sk;c.beginPath();c.ellipse(20,60,70,48,0,0,TAU);c.fill();c.stroke();
  for(let i=0;i<4;i++){const fx=60+i*4,fy=24+i*24,lift=i===0?tw*26:0;c.save();c.translate(fx,fy);c.rotate(-lift*0.02);c.fillStyle=sk;rr(c,0,-12-lift,62-i*6,24,12);c.fill();c.stroke();c.restore();}
  c.beginPath();c.ellipse(-10,14,26,14,-0.6,0,TAU);c.fill();c.stroke();c.restore();}
function footBig(c,x,y,s,tw){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#5a6488';rr(c,-200,-80,200,160,30);c.fill();c.stroke();
  c.fillStyle='#f2d8c4';c.beginPath();c.moveTo(-10,-40);c.quadraticCurveTo(120,-60,150,-10);c.quadraticCurveTo(160,40,100,50);c.lineTo(-10,50);c.closePath();c.fill();c.stroke();
  for(let i=0;i<5;i++){const tx=150-i*2,ty=-30+i*16,up=i===0?tw*14:0;c.beginPath();c.ellipse(tx,ty-up,12-i,9-i*0.6,0,0,TAU);c.fill();c.stroke();}c.restore();}
// 29 · "Because there's no demon in your room." the figure dissolves to smoke
V.nodemon=(c,t,u,d)=>{const tn=wt('no',102.2);cam(c,'hb_pov',{z:K3(u,d,1.2,1.05),y:980});const p=scr(c,pp([0,0,1.1]));c.restore();NIGHT(c);const k=1-ON(t,tn,1.2);
  hooded(c,p.x,p.y,p.s*340,k,t,{eyes:k,blur:lerp(30,5,k)});povBlanket(c,t);for(let i=0;i<16;i++){const q=1-k;c.fillStyle=`rgba(30,20,50,${0.4*k*(1-q)})`;c.beginPath();c.arc(p.x+(hash(i)-0.5)*300*(1+q*2),p.y-p.s*150-q*400*hash(i*3),40+q*80,0,TAU);c.fill();}cine(c,t,{v:0.8});};
// 30 · "Just a brain that woke up… without the rest of you." morning light, empty room, he sits up and breathes out
V.end=(c,t,u,d)=>{const tw=wt('woke',105.3);cam(c,'hb_day',{z:K3(u,d,1.05,1.12),y:900});const up=ON(t,tw-0.4,0.8);
  inBed(c,{ho:X(up>0.5?'half':'wide',up>0.5?'flat':'worried',up>0.5?'smile':'flat',{view:'front'}),hdy:up*0.25});c.restore();tint(c,`rgba(255,220,170,${0.12})`,'soft-light');cine(c,t,{v:0.5});};
VSEQ.push(['open',0],['cant',wt('you',2.8)],['thing',wt('and',4.4)],['title',wt('give',7.7)],['eyes',wt('your',12.1)],['scream',wt('you',13.6)],['nothing',wt('nothing',15.5)],['feel',wt('then',20.7)],['weight',wt('a',22.3)],['name',wt('this',27.3)],
  ['pct',wt('and',29.4)],['switch',wt("here's",32.9)],['wakes',wt('but',39.9)],['split',wt('so',44.3)],['leak',wt('and',47.8)],['fearC',wt('your',52.3)],['build',wt('and',57.7)],['breath',wt('that',64.1)],['sit',wt('something',70.1)],
  ['demons',wt('for',72.6)],['oldhag',wt('in',75.2)],['japan',wt('in',77.9)],['paint',wt('in',80.1)],['lasts',wt('it',85.6)],['safe',wt('and',89.7)],['causes',wt('stress',91.3)],['fight',wt('if',96.1)],['finger',wt('focus',98.6)],['nodemon',wt('because',101.8)],['end',wt('just',104.4)]);
VSEQ.forEach(([k,t0])=>{V[k].t0=t0;});
VSEQ.forEach(([k,t0])=>SHOTS.push([t0,(c,t,u,d)=>V[k](c,t,u,d)]));
SHOTS.sort((a,b)=>a[0]-b[0]);
// ---------- thumbnail: frozen in bed, the watcher standing right behind him ----------
SHOTS.push([200,(c,t)=>{T=8.0;cam(c,'hb_front',{z:1.8,y:700,x:560});hooded(c,725,1010,790,1,T,{eyes:1,blur:3});
  inBed(c,{ho:fear({look:-0.6,sweat:2,brow:'worried'})});c.restore();NIGHT(c);
  const g2=c.createLinearGradient(0,1380,0,1920);g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(0.4,'rgba(0,0,0,0.75)');g2.addColorStop(1,'rgba(0,0,0,0.9)');c.fillStyle=g2;c.fillRect(0,1380,1080,540);
  c.save();c.textAlign='center';const L1=(s,y,sz,col)=>txt(c,s,540,y,sz,col,{sw:sz*0.2,ls:2});
  L1("YOU CAN'T MOVE",1560,104,'#fff');L1('AND IT SEES YOU',1690,104,'#ff2b2b');c.restore();}]);
SHOTS.sort((a,b)=>a[0]-b[0]);
