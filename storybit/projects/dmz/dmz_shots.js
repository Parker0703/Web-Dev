'use strict';
// ===================== "The Tree That Almost Started a War" · shots (StoryBit C) =====================
const XD={};
const GOLD_C='#ffd23f';
const TW=(w,n=0)=>{const k=w.toLowerCase().replace(/[^a-z0-9]/g,'');let i=0;for(const l of L)for(const q of l.w){if(q.x.toLowerCase().replace(/[^a-z0-9]/g,'')===k){if(i===n)return q.t;i++;}}console.error('TW miss',w);return 0;};
KEY.clear();['1976,','TREE.','KILLED.','FACE.','AXES.','DEAD.','FURIOUS.','HISTORY.','CHAINSAWS.','HELICOPTERS','GUAM.','BUNYAN.','SHOT.','GONE.','REGRET.'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
// ---- face safety: only names that style C actually draws (a wrong name = a blank face) ----
const EYES=new Set(['closed','dot','drunk','focus','glare','half','happy','rage','sad','shock','sleep','sly','squeeze','wide']),BROWS=new Set(['angry','flat','furious','sad','smug','up','worried']),
  MOUTHS=new Set(['drool','drunk','flat','frown','grin','grit','o','sad','shout','smile','smirk','sneer','teeth','wobble','yell']);
const EMAP2={open:'dot',angry:'glare',worried:'sad'};
function F(e,b,m,o){if(!EYES.has(e))console.warn('eye name fixed:',e);e=EYES.has(e)?e:(EMAP2[e]||'dot');b=BROWS.has(b)?b:'flat';m=MOUTHS.has(m)?m:'flat';return BF(e,b,m,o);}
const TREE=[0,0,0];
function treeAt(c,t,o={}){const b=pp(TREE),b1=pp([0,1,0]);poplar(c,b,b.y-b1.y,t,o);return {b,u:b.y-b1.y};}
const dzSh=(t,a)=>({ox:Math.sin(t*31)*a,oy:Math.cos(t*27)*a});
function dzYear(c,s,k,y=430){if(k<=0)return;c.save();c.translate(540,y);const sc=lerp(1.7,1,eo(k));c.scale(sc,sc);c.globalAlpha=clamp(k*2);txt(c,s,0,0,170,'#ffd23f',{sw:22,ls:6});c.restore();}
function dzCounter(c,x,y,k,val,label,col='#ffd23f'){if(k<=0)return;c.save();c.translate(x,y);const s=back(clamp(k));c.scale(s,s);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-300,-100,600,200,30);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,val,0,20,110,'#fff',{sw:12});c.font='800 30px "Inter Display"';c.letterSpacing='6px';c.fillStyle=col;c.textAlign='center';c.fillText(label,0,80);c.restore();}
// ---- Korea map (peninsula, DMZ band, JSA) ----
const KOR=[[126,762],[140,714],[294,634],[434,490],[574,474],[672,506],[784,410],[882,346],[1022,362],[910,442],[868,538],[812,618],[728,698],[630,746],[574,794],[560,858],[630,906],[686,954],[728,1018],[770,1082],[840,1210],[840,1370],[840,1450],[798,1514],[728,1546],[616,1578],[504,1610],[420,1562],[406,1450],[448,1338],[392,1242],[448,1162],[392,1098],[322,1050],[238,1066],[280,954],[252,826],[182,794]];
function koreaMap(c,t,o={}){c.fillStyle='#16283a';c.fillRect(0,0,W,H);c.save();const z=o.z||1,cx=o.cx??540,cy=o.cy??960;c.translate(540,960);c.scale(z,z);c.translate(-cx,-cy);
  c.strokeStyle='rgba(120,170,210,0.18)';c.lineWidth=2/z;for(let i=-20;i<40;i++){seg(c,i*60,-400,i*60,2400);seg(c,-400,i*60,1600,i*60);}
  c.fillStyle='#34463a';c.beginPath();c.moveTo(-400,-400);c.lineTo(1500,-400);c.lineTo(1500,330);c.lineTo(1022,362);c.lineTo(882,346);c.lineTo(784,410);c.lineTo(672,506);c.lineTo(574,474);c.lineTo(434,490);c.lineTo(294,634);c.lineTo(140,714);c.lineTo(126,762);c.lineTo(-400,900);c.closePath();c.fill();
  c.fillStyle='#6a8a5a';c.strokeStyle='#0e1a12';c.lineWidth=5/z;c.beginPath();KOR.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.stroke();
  c.save();c.clip();c.fillStyle='rgba(180,60,50,0.3)';c.beginPath();c.moveTo(0,0);c.lineTo(1200,0);c.lineTo(1200,954);c.lineTo(546,1010);c.lineTo(459,1056);c.lineTo(420,1090);c.lineTo(0,1090);c.closePath();c.fill();c.fillStyle='rgba(60,110,180,0.28)';c.beginPath();c.moveTo(0,2000);c.lineTo(1200,2000);c.lineTo(1200,954);c.lineTo(546,1010);c.lineTo(459,1056);c.lineTo(420,1090);c.lineTo(0,1090);c.closePath();c.fill();c.restore();
  const pulse=0.6+0.4*Math.sin(t*5);c.strokeStyle=`rgba(255,70,50,${0.5*pulse*(o.dmz??1)})`;c.lineWidth=40/z;c.beginPath();c.moveTo(420,1090);c.lineTo(459,1056);c.lineTo(546,1010);c.lineTo(686,954);c.stroke();c.strokeStyle=`rgba(255,220,120,${o.dmz??1})`;c.lineWidth=7/z;c.setLineDash([16/z,10/z]);c.stroke();c.setLineDash([]);
  if(o.labels!==false){c.fillStyle='rgba(255,255,255,0.75)';c.font=`900 ${Math.round(42/z)}px "Inter Display"`;c.textAlign='center';c.fillText('NORTH KOREA',520,700);c.fillText('SOUTH KOREA',620,1280);}
  if(o.jsa){const k=o.jsa,r=(30+20*Math.sin(t*6))/z;c.strokeStyle=`rgba(255,210,63,${k})`;c.lineWidth=6/z;c.beginPath();c.arc(459,1056,r,0,TAU);c.stroke();c.fillStyle='#ffd23f';c.beginPath();c.arc(459,1056,9/z,0,TAU);c.fill();}
  if(o.icons){for(let i=0;i<9;i++){const x=420+i*(266/8),y=1090+i*(-136/8)+(i%2?-26:26);c.fillStyle='#e8e0c8';c.font=`${Math.round(30/z)}px sans-serif`;c.textAlign='center';c.fillText(['⚠','✕','▲'][i%3],x,y);}}
  if(o.after)o.after(c);c.restore();}
function dzWatch(c,x,y,r,frac,label){c.save();c.translate(x,y);c.fillStyle='#2a2a30';c.strokeStyle=OL;c.lineWidth=8;c.fillRect(-26,-r-60,52,40);c.strokeRect(-26,-r-60,52,40);c.beginPath();c.arc(0,0,r+16,0,TAU);c.fill();c.stroke();c.fillStyle='#f4f0e6';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
  c.fillStyle='rgba(220,50,40,0.85)';c.beginPath();c.moveTo(0,0);c.arc(0,0,r*0.92,-Math.PI/2,-Math.PI/2+frac*TAU);c.closePath();c.fill();c.strokeStyle='#2a2a2a';c.lineWidth=4;for(let i=0;i<60;i++){const a=i/60*TAU,l=i%5?10:22;seg(c,Math.cos(a)*(r-l),Math.sin(a)*(r-l),Math.cos(a)*r,Math.sin(a)*r);}
  const a=-Math.PI/2+frac*TAU;c.strokeStyle='#1a1a1a';c.lineWidth=8;c.lineCap='round';seg(c,0,0,Math.cos(a)*r*0.85,Math.sin(a)*r*0.85);c.fillStyle='#1a1a1a';c.beginPath();c.arc(0,0,14,0,TAU);c.fill();if(label)txt(c,label,0,r+110,80,'#fff',{sw:12});c.restore();}
function dzVhs(c,t,k){if(k<=0)return;c.save();c.globalAlpha=k;for(let i=0;i<6;i++){const y=((t*900+i*330)%2100)-100;c.fillStyle='rgba(255,255,255,0.18)';c.fillRect(0,y,W,8+hash(i)*14);}c.globalCompositeOperation='color';c.fillStyle='rgba(60,90,140,0.35)';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalAlpha=k;txt(c,'◀◀ REWIND',230,150,54,'#fff',{sw:8,ls:4});c.font='700 40px monospace';c.fillStyle='#fff';c.fillText('AUG 18 1976',650,150);c.restore();}
function dzJet(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.fillStyle='#8a929a';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(80,0);c.lineTo(20,-10);c.lineTo(-20,-60);c.lineTo(-36,-60);c.lineTo(-24,-10);c.lineTo(-70,-8);c.lineTo(-84,-28);c.lineTo(-92,-28);c.lineTo(-86,0);c.lineTo(-92,28);c.lineTo(-84,28);c.lineTo(-70,8);c.lineTo(-24,10);c.lineTo(-36,60);c.lineTo(-20,60);c.lineTo(20,10);c.closePath();c.fill();c.stroke();c.restore();}
// a convoy truck with troops in the back (helmets peeking over the rails)
function convoyTruck(c,t,P,lt,o={}){const r=solid(c,m35Parts({open:o.open,spin:o.spin||0}),P,lt);if(o.troops){for(let i=0;i<4;i++){const w=r.world([-2.9+i*1.0,2.05,(i%2?0.45:-0.45)]);const q=pp(w);const s=q.s*0.95;c.save();c.fillStyle='#e8c8a0';c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.arc(q.x,q.y-28*s,22*s,0,TAU);c.fill();c.stroke();
  c.fillStyle='#4e5638';c.beginPath();c.ellipse(q.x,q.y-40*s,27*s,20*s,0,Math.PI,TAU);c.fill();c.stroke();c.restore();}}return r;}
// ======================================== shots ========================================
// 1 · "In 1976," dawn over the DMZ: one poplar, a bomber's shadow sweeps over
XD.hook=(c,t,u,d)=>{camAt(c,'ts_dawn',[0,8,0],1.0+u*0.05,{});treeAt(c,t,{});c.restore();
  const k=clamp((u-0.3)/1.2);c.save();c.globalAlpha=0.35;c.translate(lerp(-600,1700,k),lerp(1500,600,k));c.rotate(-0.55);b52(c,0,0,1.6,0,{col:'#000'});c.restore();
  dzYear(c,'1976',clamp((u-0.05)/0.3));lens(c,t,{v:0.6});};
// 2 · "America sent B-52 bombers," — looking up: a B-52 roars over with contrails
XD.b52=(c,t,u,d)=>{camAt(c,'ts_sky',[0,22,-30],1.0,dzSh(t,6));c.restore();const k=u/(d+0.3);b52(c,lerp(1400,-300,k),lerp(1500,500,k),1.25,-2.2,{trail:1});b52(c,lerp(1700,100,k),lerp(1900,800,k),0.8,-2.2,{trail:1});
  tagC(c,540,420,'B-52 BOMBERS',clamp(u/0.3));lens(c,t);};
// 3 · "gunships" — Cobras scream across low
XD.gunships=(c,t,u,d)=>{camAt(c,'ts_sky',[0,22,-30],1.08,dzSh(t,10));c.restore();cobra(c,lerp(1500,-500,u/d),760,0.9,t,-1);cobra(c,lerp(1900,-200,u/d),1020,0.6,t+0.3,-1);huey(c,lerp(-600,1400,u/d),560,0.45,t,1);
  tagC(c,540,420,'GUNSHIPS',clamp(u/0.25));lens(c,t);};
// 4 · "and hundreds of troops" — a convoy of trucks full of soldiers rolls past
XD.troops=(c,t,u,d)=>{camAt(c,'ts_crew',[-2.2,2.8,0],1.0,dzSh(t,4));for(let i=0;i<3;i++){const x=lerp(-12,4,clamp(u/1.3))-i*7.5;convoyTruck(c,t,{p:[x,0,2.5-i*0.1],yaw:0,cy:1.2},LT_DAY,{troops:1,spin:-x/0.55});}
  c.restore();dzCounter(c,540,440,clamp((u-0.1)/0.3),'800+','TROOPS',GOLD_C);lens(c,t);};
// 5 · "to the most dangerous border on Earth…" — the DMZ glows across Korea
XD.border=(c,t,u,d)=>{const z=lerp(1.0,1.35,eio(clamp(u/d)));koreaMap(c,t,{z,cx:lerp(560,600,clamp(u/d)),cy:lerp(960,880,clamp(u/d)),icons:1});
  txt(c,'DMZ',540,330,130,'#ff5a3a',{sw:16,ls:10});c.font='800 36px "Inter Display"';c.textAlign='center';c.fillStyle='#fff';c.fillText('160 MILES OF MINES, WIRE & GUNS',540,410);lens(c,t);};
// 6 · "to cut down one tree." — everything converges: a target lock on the poplar
XD.onetree=(c,t,u,d)=>{camAt(c,'ts_wide',[0,12,0],1.0+u*0.02,{});treeAt(c,t,{});convoyTruck(c,t,{p:[9,0,7],yaw:0.4,cy:1.2},LT_DAY,{troops:1});convoyTruck(c,t,{p:[-9,0,6],yaw:-0.5,cy:1.2},LT_DAY,{troops:1});
  const top=pp([0,18,0]);c.restore();huey(c,200,380,0.32,t,1);huey(c,880,300,0.28,t+0.2,-1);cobra(c,760,520,0.26,t,-1);
  const k=eo(clamp((u-0.2)/0.6)),r=lerp(600,230,k);c.save();c.strokeStyle=`rgba(255,60,40,${0.9*k})`;c.lineWidth=8;c.beginPath();c.arc(top.x,top.y,r,0,TAU);c.stroke();for(let i=0;i<4;i++){const a=i*Math.PI/2;seg(c,top.x+Math.cos(a)*(r-50),top.y+Math.sin(a)*(r-50),top.x+Math.cos(a)*(r+60),top.y+Math.sin(a)*(r+60));}c.restore();
  tagC(c,540,420,'TARGET: ONE TREE',clamp((t-TW('tree')+0.2)/0.3),'#ff6a5a');lens(c,t);};
// 7 · "Because three days earlier," — rewind: the helicopters fly backwards, the trucks back away
XD.rewind=(c,t,u,d)=>{const tr=Math.max(0,1.6-u*1.3);camAt(c,'ts_wide',[0,12,0],1.02,{});treeAt(c,t,{});convoyTruck(c,t,{p:[9+(1.6-tr)*12,0,7],yaw:0.4,cy:1.2},LT_DAY,{});c.restore();huey(c,200-(1.6-tr)*600,380,0.32,t,1);
  dzVhs(c,t,1);tagC(c,540,420,'3 DAYS EARLIER',clamp(u/0.3));lens(c,t);};
// 8 · "that tree got two American soldiers killed." — dusk: two helmets in the grass, an axe left behind
XD.killed=(c,t,u,d)=>{camAt(c,'ts_base',[0,1.4,0],1.0+u*0.03,{oy:-200});treeAt(c,t,{trim:0.6});const h1=pp([1.6,0,2.6]),h2=pp([2.6,0,1.6]);
  for(const [p,r] of [[h1,0.3],[h2,-0.5]]){c.save();c.translate(p.x,p.y);c.rotate(r);c.fillStyle='#4e5638';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,-30*p.s,95*p.s,62*p.s,0,Math.PI,TAU);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.2)';c.beginPath();c.ellipse(-30*p.s,-60*p.s,30*p.s,12*p.s,-0.3,0,TAU);c.fill();c.restore();}
  const a=pp([0.8,0,3.4]);axe(c,a.x,a.y,0.9*a.s,1.4);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(120,90,140,0.5)';c.fillRect(0,0,W,H);c.restore();dzCounter(c,540,440,clamp((t-TW('killed')+0.1)/0.3),'2','AMERICANS KILLED','#ff5a4a');lens(c,t,{v:0.7});};
// 9 · "It stood inside the Joint Security Area," — blue huts on the border line, guards at their posts
XD.jsa=(c,t,u,d)=>{camAt(c,'jsa_wide',[0,2,-4],1.0+u*0.04,{});cast(c,[['rok',[-7.8,0,3.2],F('glare','angry','flat',{seed:1})],['rok',[7.6,0,3.1],F('glare','angry','flat',{seed:2})],['kpa',[-6.4,0,-3.6],F('glare','angry','flat',{seed:3})],['kpa2',[6.8,0,-3.8],F('glare','angry','flat',{seed:4})]]);
  c.restore();tagC(c,540,420,'JOINT SECURITY AREA',clamp(u/0.3));lens(c,t);};
// 10 · "the one spot in the Korean DMZ…" — map zoom to the JSA
XD.spot=(c,t,u,d)=>{const k=eio(clamp(u/d));koreaMap(c,t,{z:lerp(1.1,4.2,k),cx:lerp(560,459,k),cy:lerp(960,1056,k),jsa:1,labels:k<0.5});tagC(c,540,420,'THE JSA',clamp((u-0.4)/0.3));lens(c,t);};
// 11 · "…where North and South Korean guards stand face to face." — the stare across the concrete line
XD.face=(c,t,u,d)=>{camAt(c,'jsa_face',[6,1.5,0],1.0+u*0.025,{oy:-40});const sweat=u>1.5;
  cast(c,[['rok',[6.2,0,0.85],F('glare','angry','grit',{seed:3,f:-1,view:'3q',sweat})],['kpa',[6.0,0,-0.85],F('glare','furious','flat',{seed:2,f:1,view:'3q'})]]);c.restore();tagC(c,540,420,'FACE TO FACE',clamp((t-TW('face')+0.2)/0.3));lens(c,t,{v:0.6});};
// 12 · "A hundred-foot poplar was blocking the view between two UN checkpoints." — aerial: the sightline, blocked
XD.poplar=(c,t,u,d)=>{camAt(c,'ts_air',[4,0,-2],1.0+u*0.03,{});const a=pp([16,2,8]),b=pp([-6,2,-22]),m=pp([0,10,0]);{c.save();c.fillStyle='#b8b0a0';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(b.x-30,b.y-60,60,60);c.strokeRect(b.x-30,b.y-60,60,60);c.restore();}treeAt(c,t,{});
  const k=eo(clamp((u-0.6)/0.8));c.save();c.strokeStyle='#ffd23f';c.lineWidth=8;c.setLineDash([24,16]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(lerp(a.x,b.x,k),lerp(a.y,b.y,k));c.stroke();c.setLineDash([]);
  if(k>0.5){c.fillStyle='#ff3b30';c.font='900 120px "Inter Display"';c.textAlign='center';c.fillText('✕',m.x+40,m.y+40);}
  c.font='900 34px "Inter Display"';c.textAlign='center';c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=8;for(const [p,s] of [[a,'CHECKPOINT 3'],[b,'OBSERVATION POST']]){c.strokeText(s,p.x,p.y-40);c.fillText(s,p.x,p.y-40);}c.restore();c.restore();
  tagC(c,540,420,'100-FOOT POPLAR',clamp((t-TW('hundred-foot'))/0.3));lens(c,t);};
// 13 · "So on August 18th, a small crew went out to trim it." — the truck pulls up, two workers chop the low limb from its bed
XD.crew=(c,t,u,d)=>{camAt(c,'ts_crew',[-2.2,2.8,0],1.0,{oy:-30});const T0=treeAt(c,t,{trim:clamp((u-1.5)/2)});const tx=lerp(-14,-4.2,eo(clamp(u/1.3)));
  solid(c,m35Parts({open:1,spin:-tx/0.55}),{p:[tx,0,0.6],yaw:0,cy:1.2},LT_DAY);
  const L1=[-3.6,4.0,0.1];if(u>=1.3)for(const [x,sd] of [[-5.3,4],[-3.9,6]]){const pos=[x,1.38,0.8];const rc=reach(pos,L1);const sw=Math.sin(t*6+sd)*0.35;const r=who(c,'ksc',pos,F('focus','angry','grit',{seed:sd,f:1,hf:[rc[0],rc[1]+sw*20],hb:[-10,94]}));if(r){axe(c,r.hf.x,r.hf.y,0.75*r.s,-0.2+sw);if(sw>0.25){const q=pp(L1);for(let i=0;i<5;i++){c.fillStyle='#e8d8b0';c.fillRect(q.x+(hash(i+sd)-0.5)*60,q.y+((t*3+i*0.2)%1)*80,6,4);}}}}
  who(c,'bonifas',[1.4,0,3.8],F('dot','flat','flat',{seed:7,f:-1}));c.restore();tagC(c,540,420,'AUGUST 18, 1976',clamp((t-TW('18th')+0.2)/0.3));lens(c,t);};
// 14 · "North Korean soldiers showed up and ordered them to stop." — they march in; the officer points
XD.stop=(c,t,u,d)=>{camAt(c,'ts_crew',[0.5,2.4,1],1.05,{oy:-30});treeAt(c,t,{trim:0.4});solid(c,m35Parts({open:1}),{p:[-4.2,0,0.6],yaw:0,cy:1.2},LT_DAY);
  const wk=clamp(u/1.2),ox=lerp(4.5,0.4,wk),pt=t>TW('ordered')-0.1;who(c,'ksc',[-5.0,1.38,0.8],F('wide','up','o',{seed:4,f:1}));who(c,'bonifas',[-2.0,0,4.2],F('focus','angry','flat',{seed:7,f:1,view:'3q'}));
  cast(c,[['kpa',[ox+1.2,0,2.6],F('glare','angry','flat',{seed:9,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7})],['kpa2',[ox+1.6,0,3.5],F('glare','angry','flat',{seed:10,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7+1})],['kpaoff',[ox,0,4.4],F('rage','furious','yell',Object.assign({seed:8,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7+2},pt?{hf:[-120,-50]}:{}))]]);
  c.restore();tagC(c,540,420,'"STOP!"',clamp((t-TW('stop')+0.15)/0.25),'#ff6a5a');lens(c,t);};
// 15 · "The Americans kept working." — Bonifas waves the officer off; the axes keep swinging
XD.kept=(c,t,u,d)=>{camAt(c,'ts_crew',[-2.6,2.8,0.6],1.0,{oy:-30});treeAt(c,t,{trim:0.7});solid(c,m35Parts({open:1}),{p:[-4.2,0,0.6],yaw:0,cy:1.2},LT_DAY);
  const L1=[-3.6,4.0,0.1];for(const [x,sd] of [[-5.3,4],[-3.9,6]]){const pos=[x,1.38,0.8];const rc=reach(pos,L1);const sw=Math.sin(t*7+sd)*0.35;const r=who(c,'ksc',pos,F('focus','angry','grit',{seed:sd,f:1,hf:[rc[0],rc[1]+sw*20],hb:[-10,94]}));if(r)axe(c,r.hf.x,r.hf.y,0.75*r.s,-0.2+sw);}
  who(c,'bonifas',[0.6,0,3.6],F('focus','flat','smirk',{seed:7,f:1,view:'3q',hf:[80,10]}));who(c,'kpaoff',[4.6,0,4.2],F('rage','furious','grit',{seed:8,f:-1,view:'3q'}));c.restore();lens(c,t);};
// 16 · "Then a North Korean officer gave a signal…" — close: he slips off his wristwatch
XD.signal=(c,t,u,d)=>{camAt(c,'ts_rev',[2,2.2,4],1.0,{});c.restore();ink(c,0.25);const s=2.9,x=540,y=1660;
  const r=who(c,'kpaoff',[0,0,0],F('rage','furious','grit',{seed:8,abs:{x,y,s},hf:[40,10]}));if(r){const w=r.hf;const k=clamp((u-0.6)/1.0);c.fillStyle='#1a1a1a';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.roundRect(w.x-26+k*60,w.y-14-k*20,52,28,6);c.fill();c.stroke();c.fillStyle='#e8e0c0';c.beginPath();c.arc(w.x+k*60,w.y-k*20,18,0,TAU);c.fill();c.stroke();}
  c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,60,40,0.35)';c.fillRect(0,0,W,H);c.restore();tagC(c,540,420,'THE SIGNAL',clamp((t-TW('signal')+0.2)/0.3),'#ff6a5a');lens(c,t,{v:0.7});};
// 17 · "and his men grabbed the crew's own axes." — a hand seizes the axe from the grass; chaos, dust; cut away
XD.axes=(c,t,u,d)=>{if(u<1.1){camAt(c,'ts_base',[0,0.6,1.5],1.25,{oy:-200});const p=pp([0.6,0,2.4]);c.restore();const k=clamp(u/0.5),lift=eo(clamp((u-0.5)/0.5));
    c.save();const hx=lerp(1250,640,eo(k)),hy=lerp(700,1000,eo(k))-lift*300;axe(c,lerp(p.x,hx-20,lift),lerp(p.y-40,hy+40,lift),1.4*p.s,lerp(1.4,0.3,lift));c.fillStyle='#d8b08a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.ellipse(hx,hy,70,52,0.4,0,TAU);c.fill();c.stroke();c.fillStyle=KPA;c.fillRect(hx+40,hy-60,500,120);c.strokeRect(hx+40,hy-60,500,120);c.restore();}
  else{camAt(c,'ts_crew',[-0.8,2.0,2.5],1.15,dzSh(t,14));treeAt(c,t,{trim:0.7});const ph=t*12;
    const RR=cast(c,[['kpa',[1.0,0,2.8],F('rage','furious','yell',{seed:9,f:-1,run:1,ph,hf:[-30,-170]})],['kpa2',[2.8,0,3.4],F('rage','furious','yell',{seed:10,f:-1,run:1,ph:ph+2,hf:[-30,-170]})],['ksc',[-3.0,0,3.2],F('wide','worried','o',{seed:4,f:-1,run:1,ph:ph+1})],['us2',[-1.6,0,4.0],F('wide','worried','o',{seed:5,f:-1,run:1,ph:ph+3})]]);
    for(const r of RR.slice(0,2))if(r)axe(c,r.hf.x,r.hf.y,0.8*r.s,-0.4+Math.sin(t*9)*0.3);
    for(let i=0;i<14;i++){const q=pp([(hash(i)-0.5)*6,0.3,2+hash(i*3)*3]);c.fillStyle='rgba(190,170,130,0.22)';c.beginPath();c.arc(q.x+Math.sin(t*3+i)*30,q.y-((t*0.8+hash(i))%1)*200,(80+hash(i*5)*90)*q.s,0,TAU);c.fill();}c.restore();
    const f=clamp((u-2.1)/0.4);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}}lens(c,t,{v:0.45});};
// 18 · "In less than a minute," — a stopwatch races
XD.minute=(c,t,u,d)=>{c.fillStyle='#120c0a';c.fillRect(0,0,W,H);dzWatch(c,540,860,300,Math.min(0.95,u/d*0.95),'');txt(c,'UNDER 1 MINUTE',540,380,80,'#ff5a4a',{sw:12});lens(c,t);};
// 19 · "Captain Arthur Bonifas and Lieutenant Mark Barrett were dead." — two framed portraits, folded flag
function dzPortrait(c,x,y,kind,name,rank,t,k){if(k<=0)return;c.save();c.globalAlpha=clamp(k*2);c.translate(x,y);c.scale(lerp(0.9,1,eo(k)),lerp(0.9,1,eo(k)));c.fillStyle='#4a3420';c.strokeStyle=OL;c.lineWidth=8;c.beginPath();c.roundRect(-210,-280,420,520,14);c.fill();c.stroke();
  c.fillStyle='#c8ccd0';c.fillRect(-180,-250,360,400);c.save();c.beginPath();c.rect(-180,-250,360,400);c.clip();who(c,kind,[0,0,0],F('dot','flat','flat',{seed:1,abs:{x:0,y:560,s:2.1}}));c.restore();c.strokeRect(-180,-250,360,400);
  c.fillStyle='#f2ead8';c.fillRect(-200,160,400,110);txt(c,name,0,212,40,'#1a1a1a',{sw:0});c.font='800 24px "Inter Display"';c.fillStyle='#5a4a3a';c.textAlign='center';c.fillText(rank,0,252);c.restore();}
XD.dead=(c,t,u,d)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#2a1e16');c.fillStyle=g;c.fillRect(0,0,W,H);
  dzPortrait(c,290,760,'bonifas','ARTHUR BONIFAS','CAPTAIN · U.S. ARMY',t,clamp(u/0.4));dzPortrait(c,790,760,'barrett','MARK BARRETT','1ST LIEUTENANT · U.S. ARMY',t,clamp((t-TW('lieutenant')+0.1)/0.4));
  c.save();c.translate(540,1500);c.fillStyle='#1a2a5a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-160,60);c.lineTo(0,-100);c.lineTo(160,60);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';for(let i=0;i<6;i++){c.beginPath();c.arc(-60+i*24,20-(i%2)*20,6,0,TAU);c.fill();}c.restore();lens(c,t,{v:0.7});};
// 20 · "America was furious." — the briefing room: a general slams the table; DEFCON 3 lights up
XD.furious=(c,t,u,d)=>{camAt(c,'cg_hear',[0,1.2,1.2],1.05,dzSh(t,u>0.8&&u<1.1?16:2));const sl=u>0.8;
  cast(c,[['gen2',[-1.2,0,0.9],F('glare','angry','frown',{seed:3})],['gen',[0,0,1.1],F('rage','furious','yell',{seed:2,hf:sl?[60,40]:[60,-40]})],['gen2',[1.2,0,0.9],F('glare','angry','grit',{seed:4})]]);c.restore();
  const k=clamp((u-0.9)/0.3);if(k>0){c.save();c.translate(540,430);c.fillStyle='rgba(20,0,0,0.9)';c.strokeStyle='#ff3b30';c.lineWidth=6;c.beginPath();c.roundRect(-260,-80,520,160,20);c.fill();c.stroke();txt(c,'DEFCON 3',0,30,100,Math.floor(t*4)%2?'#ff3b30':'#ff8a7a',{sw:8});c.restore();}lens(c,t);};
// 21 · "But instead of starting a war," — the strike arrows on the war map pull back
XD.instead=(c,t,u,d)=>{koreaMap(c,t,{z:1.6,cx:600,cy:900,labels:true,after:(c2)=>{const k=1-eo(clamp((u-0.4)/0.9));c2.strokeStyle='rgba(255,60,40,0.9)';c2.lineWidth=14;c2.lineCap='round';
    for(const [x,y] of [[480,1060],[640,1050],[780,1000]]){const ex=x,ey=lerp(y,y-260,k);seg(c2,x,y,ex,ey);c2.fillStyle='#ff3b30';c2.beginPath();c2.moveTo(ex,ey-30);c2.lineTo(ex-22,ey+4);c2.lineTo(ex+22,ey+4);c2.closePath();c2.fill();}}});tagC(c,540,420,'NO WAR… YET',clamp((u-0.6)/0.3));lens(c,t);};
// 22 · "it planned the most extreme gardening job in history." — the plan: a tree, with everything checked off
XD.garden=(c,t,u,d)=>{c.fillStyle='#1a3a5a';c.fillRect(0,0,W,H);c.strokeStyle='rgba(200,225,255,0.15)';c.lineWidth=2;for(let i=0;i<40;i++){seg(c,i*30,0,i*30,H);seg(c,0,i*50,W,i*50);}
  c.save();poplar(c,{x:540,y:1150},26,t,{});c.globalCompositeOperation='color';c.fillStyle='#4a8ad8';c.fillRect(0,0,W,1200);c.restore();c.save();c.strokeStyle='#ff5a4a';c.lineWidth=8;c.beginPath();c.arc(540,860,330,0,TAU);c.stroke();seg(c,140,860,940,860);seg(c,540,460,540,1260);c.restore();
  txt(c,'OPERATION: CUT 1 TREE',540,300,62,'#ffd23f',{sw:10,ls:4});const items=['CHAINSAWS','SPECIAL FORCES','27 HELICOPTERS','B-52 BOMBERS','AIRCRAFT CARRIER'];
  items.forEach((s,i)=>{const k=clamp((u-0.3-i*0.4)/0.25);if(k<=0)return;c.save();c.globalAlpha=k;c.font='800 46px "Inter Display"';c.fillStyle='#e8f2ff';c.textAlign='left';c.fillText('☑  '+s,250,1340+i*90);c.restore();});lens(c,t);};
// 23 · "On August 21st, a convoy rolled in." — dawn; headlights; the convoy comes up the road toward the tree
XD.convoy=(c,t,u,d)=>{camAt(c,'ts_dawn',[0,6,4],1.0,{});treeAt(c,t,{trim:0.7});for(let i=3;i>=0;i--){const z=lerp(40,10,clamp(u/2.6))+i*7;const x=8+Math.sin(z*0.03)*6;const P={p:[x,0,z],yaw:-Math.PI/2+Math.cos(z*0.03)*0.18,cy:1.2};headBeam(c,P,14,0.25);convoyTruck(c,t,P,LT_DAY,{troops:1,spin:z/0.55});}
  c.restore();tagC(c,540,420,'AUGUST 21 · 7:00 AM',clamp((t-TW('21st')+0.2)/0.3));lens(c,t);};
// 24 · "Engineers with chainsaws." — they step up and pull the cords; the saws roar into life
XD.engineers=(c,t,u,d)=>{camAt(c,'ts_base',[0,1.6,0],1.0,{oy:-300});treeAt(c,t,{trim:0.7});
  for(const [x,f,sd] of [[-1.6,1,3],[1.6,-1,5]]){const r=who(c,'eng',[x,0,0.9],F('focus','angry','grit',{seed:sd,f,hf:[50*f,20],hb:[-10*f,92]}));if(r){c.save();c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.5*r.s,-0.3,t,u>0.4);c.restore();if(u>0.4)for(let i=0;i<5;i++){const ph=(t*1.5+i/5)%1;c.fillStyle=`rgba(200,200,200,${0.5*(1-ph)})`;c.beginPath();c.arc(r.hf.x-f*40*r.s,r.hf.y-30*r.s-ph*120,(10+ph*30)*r.s,0,TAU);c.fill();}}}
  c.restore();tagC(c,540,420,'ENGINEERS',clamp(u/0.3));lens(c,t);};
// 25 · "Special forces ready to fight." — a line of ROK special forces, clubs in hand
XD.sf=(c,t,u,d)=>{camAt(c,'ts_low',[0,1.6,4],1.05,{oy:-140});const Lr=[];for(let i=0;i<6;i++)Lr.push(['roksf',[-4+i*1.6,0,4+(i%2)*0.8],F('glare','furious','grit',{seed:20+i,hf:[18,70]})]);const R=cast(c,Lr);
  R.forEach(r=>{if(r){c.save();c.translate(r.hf.x,r.hf.y);c.rotate(0.3);c.strokeStyle=OL;c.lineWidth=12*r.s;seg(c,0,10*r.s,0,-90*r.s);c.strokeStyle='#8a6a40';c.lineWidth=7*r.s;seg(c,0,10*r.s,0,-90*r.s);c.restore();}});c.restore();tagC(c,540,420,'SPECIAL FORCES',clamp(u/0.3));lens(c,t);};
// 26 · "Twenty-seven helicopters overhead." — the sky fills, the counter climbs
XD.helis=(c,t,u,d)=>{camAt(c,'ts_sky',[0,22,-30],1.0,dzSh(t,6));c.restore();const n=Math.floor(eo(clamp(u/1.6))*27);for(let i=0;i<n;i++){const x=((hash(i*1.3)*1500+u*(120+hash(i)*80))%1500)-200,y=300+hash(i*2.7)*900,s=0.12+hash(i*3.3)*0.3;(i%3?huey:cobra)(c,x,y,s,t+i,i%2?1:-1);}
  dzCounter(c,540,440,clamp(u/0.3),String(n),'HELICOPTERS',GOLD_C);lens(c,t);};
// 27 · "B-52s flying in from Guam." — map: Guam to Korea, the bomber traces the route
XD.guam=(c,t,u,d)=>{c.fillStyle='#16283a';c.fillRect(0,0,W,H);c.save();c.fillStyle='#4a6a48';c.strokeStyle='#0e1a12';c.lineWidth=8;c.translate(150,200);c.scale(0.42,0.42);c.beginPath();KOR.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.stroke();c.restore();
  c.fillStyle='#4a6a48';c.strokeStyle='#0e1a12';c.lineWidth=4;c.beginPath();c.ellipse(860,1560,18,30,0.3,0,TAU);c.fill();c.stroke();txt(c,'GUAM',860,1650,50,'#fff',{sw:8});txt(c,'KOREA',360,880,50,'#fff',{sw:8});
  const k=eo(clamp(u/1.8));c.strokeStyle='#ffd23f';c.lineWidth=8;c.setLineDash([22,14]);c.beginPath();const P0=[860,1530],P1=[620,1000],P2=[360,660];for(let i=0;i<=30*k;i++){const s=i/30;c.lineTo((1-s)**2*P0[0]+2*(1-s)*s*P1[0]+s*s*P2[0],(1-s)**2*P0[1]+2*(1-s)*s*P1[1]+s*s*P2[1]);}c.stroke();c.setLineDash([]);
  const s=k,bx=(1-s)**2*P0[0]+2*(1-s)*s*P1[0]+s*s*P2[0],by=(1-s)**2*P0[1]+2*(1-s)*s*P1[1]+s*s*P2[1];b52(c,bx,by,0.22,-2.6,{col:'#c8ccd0'});txt(c,'GUAM → KOREA',640,1000,52,'#ffd23f',{sw:8});lens(c,t);};
// 28 · "An aircraft carrier waiting off the coast." — USS Midway, jets launching
XD.carrier=(c,t,u,d)=>{camAt(c,'sea_wide',[0,6,0],1.0+u*0.03,{});const q=pp([-4,7,-40]);c.restore();const k=(u*0.7)%1;dzJet(c,lerp(q.x,q.x-900,k),lerp(q.y,q.y-500,k),0.7,-2.6);
  tagC(c,540,420,'USS MIDWAY',clamp(u/0.3));lens(c,t);};
// 29 · "They called it…" — a classified file slides in
XD.called=(c,t,u,d)=>{c.fillStyle='#14120e';c.fillRect(0,0,W,H);c.save();c.translate(540,lerp(1500,960,eo(clamp(u/0.5))));c.rotate(-0.05);c.fillStyle='#c8a870';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.roundRect(-380,-480,760,960,16);c.fill();c.stroke();c.fillStyle='#b8985e';c.fillRect(-380,-480,300,60);
  c.strokeStyle='#c8201a';c.lineWidth=8;c.strokeRect(-220,-330,440,120);txt(c,'TOP SECRET',0,-245,72,'#c8201a',{sw:0,ls:6});c.restore();lens(c,t);};
// 30 · "Operation Paul Bunyan." — a giant lumberjack's shadow falls over the tree
XD.bunyan=(c,t,u,d)=>{camAt(c,'ts_wide',[0,12,0],lerp(1.0,1.15,eo(clamp(u/d))),{});treeAt(c,t,{trim:0.7});c.restore();c.save();const s=back(clamp(u/0.4));c.translate(540,470);c.scale(s,s);txt(c,'OPERATION',0,-40,80,'#fff',{sw:12,ls:10});txt(c,'PAUL BUNYAN',0,80,120,'#ffd23f',{sw:16,ls:6});c.restore();lens(c,t);};
// 31 · "Right in front of the North Korean guards, the chainsaws started." — the cut; KPA guards watch
XD.cut=(c,t,u,d)=>{camAt(c,'ts_base',[0,1.6,0],1.0,{oy:-330});const T0=treeAt(c,t,{trim:0.7,cut:clamp((t-TW('chainsaws')+0.2)/3)});const on=t>TW('chainsaws')-0.1;
  cast(c,[['kpa',[-5.5,0,-4],F('glare','angry','flat',{seed:14})],['kpa2',[-3.6,0,-5.5],F('glare','angry','flat',{seed:15})],['kpa',[3.8,0,-5],F('glare','angry','flat',{seed:16})]]);
  for(const [x,f,sd] of [[-1.25,1,3],[1.25,-1,5]]){const pos=[x,0,0.6];const rc=reach(pos,[x*0.55,1.0,0.3]);const r=who(c,'eng',pos,F('focus','angry','grit',{seed:sd,f,crouch:14,hf:[rc[0],rc[1]],hb:[rc[0]-f*26,rc[1]+6]}));
    if(r){c.save();c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.5*r.s,0.06,t,on);c.restore();if(on)sawdust(c,t,T0.b.x,T0.b.y-1.0*T0.u,r.s,-f);}}
  c.restore();huey(c,lerp(-300,1300,(u*0.12)%1),360,0.34,t,1);lens(c,t);};
// 32 · "Nobody fired a shot." — frozen stares; the counter stays at zero
XD.noshot=(c,t,u,d)=>{camAt(c,'ts_rev',[0.4,1.6,0],1.35+u*0.04,{oy:-120});cast(c,[['kpa',[-0.6,0,-1.2],F('glare','angry','flat',{seed:14})],['kpa2',[1.4,0,-1.6],F('glare','angry','flat',{seed:15})],['kpaoff',[0.4,0,0],F('glare','furious','grit',{seed:16,sweat:true})]]);
  c.restore();dzCounter(c,540,440,clamp(u/0.3),'0','SHOTS FIRED',GOLD_C);lens(c,t);};
// 33 · "Forty-two minutes later, the tree was gone." — TIMBER: it falls, the dust rolls out
XD.gone=(c,t,u,d)=>{const fk=clamp((u-0.4)/1.4);const fall=Math.pow(fk,2.2)*1.45;const imp=fk>=1&&u<2.5;camAt(c,'ts_wide',[0,10,0],1.0,dzSh(t,imp?(1-(u-1.8)/0.7)*18:0));treeAt(c,t,{trim:0.7,fall,fallDir:-1,cut:1});
  if(fk>=0.98){for(let i=0;i<16;i++){const q=pp([-6-hash(i)*16,0.5,(hash(i*3)-0.5)*6]);const a=clamp((u-1.8)*0.8);c.fillStyle=`rgba(200,180,140,${0.5*(1-a)})`;c.beginPath();c.arc(q.x,q.y-a*120,(120+hash(i*5)*160)*q.s*(0.5+a),0,TAU);c.fill();}}
  c.restore();dzWatch(c,860,560,110,0.7,'');txt(c,'42 MIN',860,760,64,'#fff',{sw:10});lens(c,t);};
// 34 · "And for the first time ever," — a telegram arrives
XD.first=(c,t,u,d)=>{c.fillStyle='#16120e';c.fillRect(0,0,W,H);c.save();c.translate(540,lerp(1700,900,eo(clamp(u/0.6))));c.rotate(-0.04);c.fillStyle='#f0e6c8';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-400,-300,800,600);c.strokeRect(-400,-300,800,600);c.fillStyle='#c8a040';c.fillRect(-400,-300,800,90);txt(c,'TELEGRAM',0,-232,62,'#2a1a10',{sw:0,ls:10});c.fillStyle='#2a2a2a';c.font='700 34px monospace';c.textAlign='left';['FROM: PYONGYANG','TO: UN COMMAND, PANMUNJOM','DATE: AUGUST 21 1976','','PRIORITY: URGENT'].forEach((l,i)=>c.fillText(l,-350,-140+i*58));c.restore();tagC(c,540,330,'FIRST TIME EVER',clamp((u-0.3)/0.3));lens(c,t);};
// 35 · "North Korea's leader sent a message of regret." — the word REGRET, underlined
XD.regret=(c,t,u,d)=>{c.fillStyle='#16120e';c.fillRect(0,0,W,H);c.save();c.translate(540,960);c.rotate(-0.04);c.fillStyle='#ece4cc';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-380,-520,760,1040);c.strokeRect(-380,-520,760,1040);
  c.fillStyle='#2a2a2a';c.font='700 40px monospace';c.textAlign='left';['MESSAGE FROM KIM IL SUNG:','','"IT IS REGRETFUL THAT','AN INCIDENT OCCURRED','IN THE JOINT SECURITY','AREA, PANMUNJOM."'].forEach((s,i)=>c.fillText(s,-330,-400+i*70));
  const k=clamp((t-TW('regret')+0.3)/0.4);c.strokeStyle='#c8201a';c.lineWidth=8;seg(c,-110,-250,-110+250*k,-250);c.restore();lens(c,t);};
// 36 · "Two countries almost went back to war…" — the two armies across the line, then pull back to the map
XD.war=(c,t,u,d)=>{if(u<1.4){camAt(c,'jsa_wide',[0,2,-4],1.05-u*0.03,dzSh(t,3));const Lw=[];for(let i=0;i<5;i++){Lw.push(['rok',[-12+i*6,0,4+(i%2)],F('glare','furious','grit',{seed:30+i})]);Lw.push(['kpa',[-12+i*6+2,0,-4-(i%2)],F('glare','furious','grit',{seed:40+i})]);}cast(c,Lw);c.restore();}
  else koreaMap(c,t,{z:lerp(2.2,1.0,eo(clamp((u-1.4)/1.2))),cx:lerp(459,560,eo(clamp((u-1.4)/1.2))),cy:lerp(1056,960,eo(clamp((u-1.4)/1.2))),jsa:1});lens(c,t);};
// 37 · "over a tree." — the stump at sunset; fade out
XD.stump=(c,t,u,d)=>{camAt(c,'ts_dawn',[0,3,0],1.25+u*0.03,{oy:-200});treeAt(c,t,{stump:1,stumpH:6});c.restore();const f=clamp((t-(END-1.8))/1.7);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}lens(c,t,{v:0.6});};
const XSEQ=[['hook',0],['b52',TW('America')-0.1],['gunships',TW('gunships')-0.1],['troops',TW('hundreds')-0.1],['border',TW('most')-0.15],['onetree',LT(1)-0.05],['rewind',LT(2)-0.05],['killed',LT(3)-0.05],
  ['jsa',LT(4)-0.05],['spot',LT(5)-0.05],['face',TW('where')-0.1],['poplar',LT(6)-0.05],['crew',LT(7)-0.05],['stop',LT(8)-0.05],['kept',LT(9)-0.05],['signal',LT(10)-0.05],['axes',LT(11)-0.05],['minute',LT(12)-0.05],
  ['dead',LT(13)-0.05],['furious',LT(14)-0.05],['instead',LT(15)-0.05],['garden',LT(16)-0.05],['convoy',LT(17)-0.05],['engineers',LT(18)-0.05],['sf',LT(19)-0.05],['helis',LT(20)-0.05],['guam',LT(21)-0.05],['carrier',LT(22)-0.05],
  ['called',LT(23)-0.05],['bunyan',LT(24)-0.05],['cut',LT(25)-0.05],['noshot',LT(26)-0.05],['gone',LT(27)-0.05],['first',LT(28)-0.05],['regret',LT(29)-0.05],['war',LT(30)-0.05],['stump',LT(31)-0.05]];
SHOTS.length=0;XSEQ.forEach(([k,t0],i)=>{const t1=i+1<XSEQ.length?XSEQ[i+1][1]:END;SHOTS.push([t0,(c,t)=>XD[k](c,t,t-t0,t1-t0)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
