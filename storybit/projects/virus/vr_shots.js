'use strict';
// ===================== Virus in the book · shots =====================
const XV={};const LT=i=>L[i].a;
function lens(c,t,o={}){bbCine(c,t,{v:o.v??0.55});}
// library helpers: desk occluder, candle light (re-lights whatever stands near the desk), window dust beam
const CANDLES=[[0.55,1.17,-1.42],[-0.6,1.17,-1.42],[2.25,1.45,-2.7]];
function deskFront(c){occluder(c,[[-0.7,0.78,-0.85],[0.7,0.78,-0.85],[0.7,0,-0.85],[-0.7,0,-0.85]],'#6a4426');occluder(c,[[-0.72,0.86,-0.83],[0.72,0.86,-0.83],[0.72,0.78,-0.85],[-0.72,0.78,-0.85]],'#7a5230');}
function candles(c,t,a=1){for(const [i,p] of CANDLES.entries()){const q=pp(p);const fl=0.85+0.15*Math.sin(t*17+i*3)+0.08*Math.sin(t*31+i);lightPool(c,q.x,q.y-0.05*q.s*160,q.s*230,'255,170,80',0.22*fl*a);}}
function libBeam(c,t){const a=pp([0,2.6,-4.85]),b=pp([0.2,0,-1.4]);dustBeam(c,t,a.x,a.y,b.x,b.y,140,46,'190,210,255');}
// an open book lying on the desk at its 3D spot (so hands can touch it and pages can move)
function deskBook(c,t,o={}){onQuad(c,[-0.34,0.91,-1.4],[0.34,0.91,-1.4],[-0.34,0.86,-0.93],680,460,(g,w,h)=>openBook(g,w,h,{glow:o.glow||0,seed:3}));
  if(o.turn>0&&o.turn<1){const p=pp([0,0.92,-1.15]);c.save();c.translate(p.x,p.y);c.scale(1,0.35);c.rotate(-Math.PI*o.turn);c.fillStyle='#f6ead0';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(0,-60,p.s*28,120);c.strokeRect(0,-60,p.s*28,120);c.restore();}}
function floatViruses(c,t,x,y,k,n=7,sc=1){for(let i=0;i<n;i++){const kk=clamp(k*1.3-i*0.08);if(kk<=0)continue;const a=(i%2?0:Math.PI)+(i%2?-1:1)*(0.15+hash(i*3)*0.5),d=(80+hash(i*5)*320)*kk;virusP(c,x+Math.cos(a)*d+Math.sin(t*2+i)*10,y+Math.sin(a)*d*0.6+20,(10+hash(i*7)*12)*sc,t+i,{rot:i});}}
// 0 · "Scientists just found a virus hiding inside a 1,000-year-old book." the scientist opens the old book; green light pours out
XV.hook=(c,t,u,d)=>{const tv=wb('virus',2.1),tb=wb('book',4.5);camAt(c,'lb_wide',[0,1.1,-1.4],K3(u,d,1.45,1.75),{oy:-30});
  const P=[0,0,-1.85];const hf=reach(P,[0.08,0.92,-1.1]);const op=EZ.out(sgB(t,0.3,1.2));
  who(c,'labsci',P,BF(t>tv?'wide':'focus',t>tv?'up':'flat',t>tv?'o':'flat',{seed:2,hf:[lerp(14,hf[0],op),lerp(90,hf[1],op)],hb:[-10,90]}));deskFront(c);
  const gl=EZ.out(sgB(t,tv-0.3,tv+0.5));deskBook(c,t,{glow:gl,turn:sgB(t,0.4,1.1)});const bp=pp([0,0.95,-1.15]);floatViruses(c,t,bp.x,bp.y,sgB(t,tv,tb+0.5),8,1);
  candles(c,t);libBeam(c,t);lightPool(c,bp.x,bp.y-80,420,'120,255,140',0.25*gl);c.restore();if(t<0.12)flash(c,1-t/0.12,'#000');lens(c,t,{v:0.65});};
// 1 · "Give me 60 seconds, and I'll show you how it got there." microscope view of the parchment fibres, something hiding in them
XV.micro=(c,t,u,d)=>{c.fillStyle='#050608';c.fillRect(0,0,W,H);c.save();c.beginPath();c.arc(540,1100,470,0,TAU);c.clip();const g=c.createRadialGradient(540,1100,40,540,1100,470);g.addColorStop(0,'#f2e2bc');g.addColorStop(1,'#b8985e');c.fillStyle=g;c.fillRect(70,630,940,940);
  c.strokeStyle='rgba(120,90,50,0.55)';c.lineCap='round';for(let i=0;i<60;i++){const x=70+hash(i)*940,y=630+hash(i*3)*940,a=hash(i*5)*3;c.lineWidth=4+hash(i*7)*8;c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+Math.cos(a)*120,y+Math.sin(a)*60,x+Math.cos(a+0.6)*200,y+Math.sin(a+0.6)*160,x+Math.cos(a+0.3)*320,y+Math.sin(a+0.3)*240);c.stroke();}
  const z=1+u*0.25;virusP(c,560,1150,34*z,t,{rot:0.4,gc:'120,255,140'});virusP(c,430,980,20*z,t+1,{rot:1.4});virusP(c,700,1260,16*z,t+2,{rot:2.2});c.restore();
  c.strokeStyle='#1a1c22';c.lineWidth=60;c.beginPath();c.arc(540,1100,500,0,TAU);c.stroke();c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.arc(540,1100,470,0,TAU);c.stroke();lens(c,t);};
// 2 · "Medieval books weren't made from paper." a monk at the desk, quill on the page, candlelight
XV.monk=(c,t,u,d)=>{camAt(c,'lb_wide',[0,1.1,-1.4],K3(u,d,1.5,1.6),{oy:-30});const P=[0,0,-1.85];const hf=reach(P,[0.1,0.92,-1.12]);
  const r=who(c,'monk',P,BF('focus','flat','flat',{seed:4,hf:[hf[0]+Math.sin(t*9)*3,hf[1]+Math.cos(t*9)*2],hb:[-10,90],look:[2,6]}));deskFront(c);deskBook(c,t,{});
  // quill in the hand, tip on the page, ink line growing
  const tip=pp([0.1,0.91,-1.1]);c.save();c.strokeStyle=K2;c.lineWidth=5;seg(c,r.hf.x,r.hf.y,tip.x,tip.y);c.fillStyle='#f4f0e6';c.beginPath();c.moveTo(r.hf.x,r.hf.y);c.quadraticCurveTo(r.hf.x+30,r.hf.y-90,r.hf.x+10,r.hf.y-150);c.quadraticCurveTo(r.hf.x-10,r.hf.y-80,r.hf.x,r.hf.y);c.fill();c.stroke();c.restore();
  candles(c,t);libBeam(c,t);c.restore();lens(c,t,{v:0.6});};
// 3 · "They were made from animal skin." a calfskin stretched on a wooden frame; the animal's outline fades into it
XV.skin=(c,t,u,d)=>{richBG(c,t,'40,26,16');const k=EZ.io(sgB(t,LT(3),LT(3)+0.9));c.save();c.globalAlpha=1-k;sheep(c,540,1250,2.6,{t,f:1});c.restore();c.save();c.globalAlpha=k;herse(c,540,1060,1.4,t,{});c.restore();
  lightPool(c,540,1000,700,'255,190,110',0.15);lens(c,t);};
// 4 · "So researchers tested the pages from old manuscripts in Britain, France and Austria." three books on the lab bench, flags pop as named
XV.tested=(c,t,u,d)=>{camAt(c,'ml_wide',[0,1.0,-0.9],K3(u,d,1.15,1.25),{oy:-40});const P=[-0.2,0,-1.55];const hf=reach(P,[0.0,0.97,-0.65]);
  who(c,'labsci',P,BF('focus','flat','flat',{seed:2,hf:hf,hb:[-10,90],look:[0,5]}));
  occluder(c,[[-1.1,0.88,-0.125],[1.1,0.88,-0.125],[1.1,0,-0.125],[-1.1,0,-0.125]],'#2a3442');occluder(c,[[-1.15,0.93,-0.07],[1.15,0.93,-0.07],[1.15,0.88,-0.07],[-1.15,0.88,-0.07]],'#a8b2c0');
  const B=[[-0.55,'#6a2a1e','britain',flagUK],[0.0,'#3a4a2a','france',flagFR],[0.55,'#2a3a5a','austria',flagAT]];
  for(const [x,col,w,fn] of B){const q=pp([x,0.95,-0.5]);codex(c,q.x,q.y-q.s*14,q.s*0.11,-0.05+x*0.1,{col});const k=popK(t,wb(w,15.5)-0.05,0.3);if(k>0){c.save();c.translate(q.x,q.y-q.s*58);c.scale(k,k);fn(c,0,0,120);c.restore();}}
  c.restore();lens(c,t);};
// 5 · "The pages looked perfectly clean." 6 · "No spots. No damage." a page under UV light, a magnifier sweeps it
function pageClose(c,t){c.fillStyle='#2a1a10';c.fillRect(0,0,W,H);c.save();c.translate(60,300);msPage(c,960,1480,11);c.restore();c.strokeStyle='rgba(60,40,20,0.5)';c.lineWidth=6;c.strokeRect(60,300,960,1480);}
XV.clean=(c,t,u,d)=>{c.save();const z=1.05+u*0.06;c.translate(540,1000);c.scale(z,z);c.translate(-540,-1000);pageClose(c,t);c.restore();
  const sx=lerp(120,980,EZ.io(u/d));c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(sx,1150,0,sx,1150,360);g.addColorStop(0,'rgba(170,100,255,0.5)');g.addColorStop(1,'rgba(150,80,255,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  uvTorch(c,sx+260,520,Math.atan2(1150-520,sx-(sx+260)),1.3,600);lens(c,t);};
XV.nospots=(c,t,u,d)=>{pageClose(c,t);const mx=lerp(330,760,EZ.io(u/d)),my=1050+Math.sin(u*3)*120;c.save();c.beginPath();c.arc(mx,my,190,0,TAU);c.clip();c.translate(mx,my);c.scale(1.6,1.6);c.translate(-mx,-my);pageClose(c,t);c.restore();
  c.strokeStyle=K2;c.lineWidth=12;c.beginPath();c.arc(mx,my,190,0,TAU);c.stroke();c.strokeStyle='#c8a868';c.lineWidth=6;c.stroke();c.strokeStyle=K2;c.lineWidth=36;c.lineCap='round';seg(c,mx+140,my+140,mx+300,my+300);c.strokeStyle='#5a3a22';c.lineWidth=24;seg(c,mx+140,my+140,mx+300,my+300);
  check(c,300,560,62,popK(t,wb('spots',20.8),0.3));check(c,780,560,62,popK(t,wb('damage',21.8),0.3));lens(c,t);};
// 7 · "But the DNA told a different story." the lab's monitor wall: a helix, part of it turns red
XV.dna=(c,t,u,d)=>{const td=wb('dna',23.6);if(t<td+0.35){camAt(c,'ml_wide',[-0.1,1.6,-2.7],K3(u,0.6,1.3,1.6),{oy:0});
    onQuad(c,[-1.75,2.3,-2.72],[-0.15,2.3,-2.72],[-1.75,1.1,-2.72],600,450,(g,w,h)=>{g.fillStyle='#04121e';g.fillRect(0,0,w,h);helix(g,w/2,h/2,h*0.9,130,t,{glowOn:0});});c.restore();lens(c,t,{v:0.6});return;}
  const bad=t>wb('different',24.4);richBG(c,t,'6,16,34');const z=1.0+0.08*sgB(t,td,td+2);c.save();c.translate(540,1080);c.scale(z,z);helix(c,0,0,1250,230,t,{bad:bad?[10,16]:null});c.restore();
  if(bad){const k=popK(t,wb('different',24.4),0.3);c.save();c.translate(540,1080);c.scale(k,k);c.strokeStyle='#ff3a3a';c.lineWidth=10;c.setLineDash([24,14]);rr(c,-300,-110,600,230,30);c.stroke();c.setLineDash([]);c.restore();warnTri(c,860,1430,80,k);}
  lens(c,t,{v:0.55});};
// 8 · "It was sheeppox." the virus particle, huge, next to its victim
XV.pox=(c,t,u,d)=>{richBG(c,t,'10,30,16');const k=popK(t,LT(8),0.4);c.save();c.translate(540,1000);c.scale(k,k);virusP(c,0,0,170,t,{rot:0.35,gc:'120,255,140'});c.restore();
  const s2=popK(t,wb('sheeppox',26.7),0.35);if(s2>0){c.save();c.translate(540,1560);c.scale(s2,s2);sheep(c,0,0,1.4,{t,pox:1});c.restore();}lens(c,t);};
// 9 · "A deadly disease of livestock." a flock on the open steppe; some animals carry the pox
XV.flock=(c,t,u,d)=>{camAt(c,'st_open',[0,0.4,-9],K3(u,d,1.1,1.22),{oy:-40});const S=[[-1.6,-12,1,0],[1.4,-11.4,-1,1],[-0.4,-10.6,1,0],[2.0,-9.6,-1,1],[-1.5,-9.0,1,0],[0.6,-8.2,-1,0],[-1.0,-7.2,1,1]];
  S.sort((a,b)=>a[1]-b[1]).forEach(([x,z,f,px],i)=>{const q=pp([x,0,z]);sheep(c,q.x,q.y,q.s*0.55,{t,f,seed:i,graze:(Math.sin(t*0.8+i*2)>0.2)?1:0,pox:px});});c.restore();lens(c,t,{v:0.45});};
// 10 · "Don't panic. It's a livestock virus, not a human one." sheep side vs person side
XV.panic=(c,t,u,d)=>{richBG(c,t,'18,22,30');const k1=popK(t,LT(10)+0.1,0.3),k2=popK(t,wb('human',32.4)-0.1,0.3);
  if(k1>0){c.save();c.translate(300,1250);c.scale(k1,k1);c.fillStyle='rgba(255,60,60,0.12)';c.beginPath();c.arc(0,-90,230,0,TAU);c.fill();sheep(c,0,40,1.3,{t,pox:1});c.restore();virusP(c,180,880,40*k1,t,{rot:0.4});}
  if(k2>0){c.save();c.translate(790,1250);c.scale(k2,k2);c.fillStyle='rgba(60,220,120,0.12)';c.beginPath();c.arc(0,-90,230,0,TAU);c.fill();who(c,'labsci',[0,0,0],Object.assign(BF('happy','up','smile',{seed:5,hf:[10,90],hb:[-10,90]}),{abs:{x:0,y:110,s:1.05}}));c.restore();check(c,960,880,56,k2);}
  lens(c,t);};
// 11 · "So why was it inside a book?" 19 · "So how did a virus end up in a book?" the book on the desk, candle-lit, question
function bookQ(c,t,u,d,tq){camAt(c,'lb_desk',[0,0.9,-1.15],K3(u,d,1.1,1.3),{oy:-40});deskBook(c,t,{glow:0.4+0.2*Math.sin(t*3)});candles(c,t,1.4);libBeam(c,t);c.restore();bigQ(c,540,620,popK(t,tq,0.35)*1.0,t);lens(c,t,{v:0.65});}
XV.whyQ=(c,t,u,d)=>bookQ(c,t,u,d,wb('book',35.1)-0.1);
// 12 · "Maybe the animal was sick when it died." one sheep lying in the golden grass, eyes closed
XV.sick=(c,t,u,d)=>{camAt(c,'st_open',[0.2,0.3,-7.5],K3(u,d,1.35,1.5),{oy:-40});const q=pp([0.2,0,-7.2]);sheep(c,q.x,q.y,q.s*0.55,{t,f:1,lie:1,eyes:'closed',pox:1});const q2=pp([-1.8,0,-11]);sheep(c,q2.x,q2.y,q2.s*0.42,{t,f:1,graze:1});c.restore();lens(c,t,{v:0.5});};
// 13 · "Or the virus landed on the skin while the parchment was made." the skin on the frame; particles drift onto it
XV.landed=(c,t,u,d)=>{richBG(c,t,'40,26,16');herse(c,540,1060,1.4,t,{virus:sgB(t,wb('landed',38.9)-0.2,wb('made',41.0))});lightPool(c,540,1000,700,'255,190,110',0.15);lens(c,t);};
// 14 · "Researchers aren't sure which." the scientist in the lab, one hand up: which one?
XV.unsure=(c,t,u,d)=>{camAt(c,'ml_wide',[0,1.1,-1.0],K3(u,d,1.12,1.2),{oy:-160});const P=[-0.2,0,-1.55];who(c,'labsci',P,BF('dot','worried','flat',{seed:2,hf:[40,-10],hb:[-10,90],tilt:0.1}));
  occluder(c,[[-1.1,0.88,-0.125],[1.1,0.88,-0.125],[1.1,0,-0.125],[-1.1,0,-0.125]],'#2a3442');c.restore();
  const k=popK(t,LT(14),0.3);if(k>0){for(const [x,dr] of [[230,'sheep'],[850,'frame']]){c.save();c.translate(x,470);c.scale(k*0.8,k*0.8);c.fillStyle='#fff';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(0,0,130,0,TAU);c.fill();c.stroke();if(dr==='sheep')sheep(c,0,60,0.8,{t,pox:1});else herse(c,0,0,0.32,t,{virus:1});c.restore();}
    c.save();c.translate(540,420);c.scale(k,k);txt(c,'?',0,0,80,'#e8342a',{sw:14});c.restore();}
  lens(c,t);};
// 15 · "But here's the twist." lab lights stutter, push in hard on the monitors
XV.twist=(c,t,u,d)=>{camAt(c,'ml_wide',[-0.1,1.6,-2.7],K3(u,d,1.1,1.7),{oy:0});c.restore();if(Math.sin(t*50)>0.5&&u<0.5)flash(c,0.4,'#000');lens(c,t,{v:0.7});};
// 16 · "Those pages let them rebuild the virus's family tree." a tree grows; its leaves are manuscript pages
XV.tree=(c,t,u,d)=>{richBG(c,t,'16,24,18');const k=EZ.out(sgB(t,LT(16),LT(16)+2.6));
  const br=(x,y,a,len,dep,i)=>{if(dep>5)return;const p=clamp(k*6-dep);if(p<=0)return;const x2=x+Math.cos(a)*len*p,y2=y+Math.sin(a)*len*p;c.strokeStyle=K2;c.lineWidth=(16-dep*2.4)+6;c.lineCap='round';seg(c,x,y,x2,y2);c.strokeStyle='#8a6a40';c.lineWidth=16-dep*2.4;seg(c,x,y,x2,y2);
    if(p>=1){if(dep===5||dep===3){c.save();c.translate(x2,y2);c.rotate(a+Math.PI/2);c.fillStyle='#f0e2c0';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-16,-20,32,40);c.strokeRect(-16,-20,32,40);c.restore();}else virusP(c,x2,y2,14,t+i,{glow:0});br(x2,y2,a-0.42,len*0.72,dep+1,i*2);br(x2,y2,a+0.42,len*0.72,dep+1,i*2+1);}};
  br(540,1700,-Math.PI/2,300,0,1);lens(c,t);};
// 17 · "It goes back about 3,500 years." the years roll back
XV.years=(c,t,u,d)=>{richBG(c,t,'30,22,12');const t3=wb('3,500',49.8);const v=Math.round(EZ.out(sgB(t,t3-0.5,t3+0.4))*3500);
  c.save();c.translate(540,1000);c.fillStyle='rgba(10,8,6,0.9)';c.strokeStyle='#e8c060';c.lineWidth=8;rr(c,-360,-130,720,260,34);c.fill();c.stroke();txt(c,v.toLocaleString('en-US'),0,-14,160,'#ffd060',{sw:16});txt(c,'YEARS',0,90,52,'#fff',{stroke:false,ls:8});c.restore();
  // hourglass sand
  c.save();c.translate(540,1500);c.rotate(Math.sin(t*2)*0.05);c.strokeStyle=K2;c.lineWidth=8;c.fillStyle='rgba(220,240,255,0.25)';c.beginPath();c.moveTo(-90,-130);c.lineTo(90,-130);c.lineTo(10,0);c.lineTo(90,130);c.lineTo(-90,130);c.lineTo(-10,0);c.closePath();c.fill();c.stroke();const sf=(u/d);c.fillStyle='#e8c060';c.beginPath();c.moveTo(-70*(1-sf),-120+sf*100);c.lineTo(70*(1-sf),-120+sf*100);c.lineTo(0,-6);c.closePath();c.fill();c.beginPath();c.moveTo(-80*sf,124);c.lineTo(80*sf,124);c.lineTo(0,124-sf*100);c.closePath();c.fill();c.restore();lens(c,t);};
// 18 · "The oldest traces come from sheep teeth on the Eurasian steppe." an archaeologist kneels at the trench, brushing a sheep skull; cut in on the teeth
XV.dig=(c,t,u,d)=>{const tt=wb('teeth',54.0)-0.15;if(t<tt){camAt(c,'st_wide',[0.4,0.6,-1.6],K3(u,d,1.45,1.6),{oy:-80});const sk=pp([0.3,0.01,-1.45]);skull(c,sk.x,sk.y,sk.s*0.26,-0.1);
    const P=[0.4,0,-1.95];const hf=reach(P,[0.32,0.06,-1.45],{crouch:56});sitAt(c,'arch',P,BF('focus','flat','flat',{seed:6,hf:[hf[0]+Math.sin(t*10)*4,hf[1]],hb:[-10,80],look:[0,7]}));
    const r2=pp([0.32,0.05,-1.45]);for(let i=0;i<6;i++){const p=((t*1.5+i/6)%1);c.fillStyle=`rgba(180,140,90,${0.5*(1-p)})`;c.beginPath();c.arc(r2.x+(hash(i)-0.5)*80*p+20,r2.y-60*p,4+p*6,0,TAU);c.fill();}c.restore();lens(c,t,{v:0.45});return;}
  camAt(c,'st_dig',[0,0.05,-1.0],K3(t-tt,d-(tt-XV.dig.t0),1.2,1.35),{oy:-40});const sk=pp([0.0,0.01,-1.0]);skull(c,sk.x,sk.y,sk.s*0.32,-0.1);lightPool(c,sk.x+20*sk.s*0.32,sk.y+24*sk.s*0.32,260,'255,230,170',0.35);c.restore();
  const k=popK(t,tt+0.4,0.3);if(k>0){c.save();c.translate(780,700);c.scale(k,k);c.fillStyle='rgba(10,20,12,0.9)';c.strokeStyle='#7ae06a';c.lineWidth=6;c.beginPath();c.arc(0,0,110,0,TAU);c.fill();c.stroke();helix(c,0,0,170,44,t,{});c.restore();}lens(c,t,{v:0.45});};
XV.howQ=(c,t,u,d)=>bookQ(c,t,u,d,LT(19)+0.2);
// 20 · "Because the book is the animal." the closed book turns into the animal it came from
XV.reveal=(c,t,u,d)=>{richBG(c,t,'40,26,16');const k=EZ.io(sgB(t,wb('animal',60.4)-0.5,wb('animal',60.4)+0.3));lightPool(c,540,1100,600,'255,200,120',0.25+0.2*k);
  c.save();c.globalAlpha=1-k;codex(c,540,1100,2.4,-0.04,{col:'#6a2a1e'});c.restore();c.save();c.globalAlpha=k;sheep(c,540,1320,2.6,{t,f:1});c.restore();
  if(k>0&&k<1){for(let i=0;i<20;i++){const a=i/20*TAU;c.fillStyle=`rgba(255,230,170,${1-k})`;c.beginPath();c.arc(540+Math.cos(a)*300*k,1100+Math.sin(a)*300*k,6,0,TAU);c.fill();}}lens(c,t);};
// 21 · "Every page was once a living creature…" pages fan out; each one carries the faint outline of an animal
XV.pages=(c,t,u,d)=>{richBG(c,t,'30,20,14');const k=EZ.out(sgB(t,LT(21),LT(21)+1.4));for(let i=0;i<7;i++){const a=(i-3)*0.22*k,x=540+(i-3)*120*k,y=1150-Math.abs(i-3)*20*k;c.save();c.translate(x,y);c.rotate(a);c.save();c.beginPath();c.moveTo(-130,-180);for(let k=0;k<=12;k++)c.lineTo(-130+k*260/12,-180+Math.sin(k*1.7+i)*4);for(let k=0;k<=16;k++)c.lineTo(130+Math.sin(k*1.3+i)*4,-180+k*360/16);for(let k=0;k<=12;k++)c.lineTo(130-k*260/12,180+Math.sin(k*2.1+i)*4);for(let k=0;k<=16;k++)c.lineTo(-130+Math.sin(k*1.9+i)*4,180-k*360/16);c.closePath();c.save();c.clip();c.translate(-130,-180);msPage(c,260,360,i*5);c.restore();c.strokeStyle=K2;c.lineWidth=5;c.stroke();c.restore();
    c.globalAlpha=0.28*k;sheep(c,0,90,0.9,{t,f:i%2?-1:1,seed:i});c.restore();}lightPool(c,540,1100,600,'255,210,150',0.2);lens(c,t);};
// 22 · "and it never stopped telling its story." back in the library, the book glows softly; fade to black
XV.outro=(c,t,u,d)=>{camAt(c,'lb_wide',[0,1.3,-1.6],K3(u,d,1.5,1.2),{oy:-40});deskBook(c,t,{glow:0.5});candles(c,t);libBeam(c,t);const bp=pp([0,0.95,-1.15]);lightPool(c,bp.x,bp.y-60,300,'255,220,150',0.3);c.restore();
  const f=sgB(t,L[L.length-1].b+0.25,END-0.15);lens(c,t,{v:0.6});if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
// ---------- edit ----------
const XSEQ=[['hook',0],['micro',LT(1)-0.05],['monk',LT(2)-0.05],['skin',LT(3)-0.05],['tested',LT(4)-0.05],['clean',LT(5)-0.05],['nospots',LT(6)-0.05],['dna',LT(7)-0.05],['pox',LT(8)-0.05],['flock',LT(9)-0.05],['panic',LT(10)-0.05],
  ['whyQ',LT(11)-0.05],['sick',LT(12)-0.05],['landed',LT(13)-0.05],['unsure',LT(14)-0.05],['twist',LT(15)-0.05],['tree',LT(16)-0.05],['years',LT(17)-0.05],['dig',LT(18)-0.05],['howQ',LT(19)-0.05],['reveal',LT(20)-0.05],['pages',LT(21)-0.05],['outro',LT(22)-0.05]];
SHOTS.length=0;XSEQ.forEach(([k,t0])=>{XV[k].t0=t0;SHOTS.push([t0,(c,t,u,d)=>XV[k](c,t,u,d)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
KEY.clear();['VIRUS','60','SKIN','DNA','SHEEPPOX','TWIST','3500','ANIMAL'].forEach(w=>KEY.add(w));
