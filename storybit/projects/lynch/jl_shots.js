'use strict';
// ===================== Jessica Lynch · shots (StoryBit C) =====================
const XJ={};const LT=i=>L[i].a;
function lens(c,t,o={}){cine(c,t,{v:o.v??0.5,bars:0});}
KEY.clear();['TRUE.','LYNCH.','AMBUSH.','PRISONER.','LEGEND.','STRANGE.','JAMMED.','FIGHT.','PIESTEWA,','LIE."','SURVIVOR.','HOME.'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
const F=(e,b,m,o)=>BF(e,b,m,o);
const ink=(c,a)=>{c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);};
function bigX(c,x,y,r,a=1,col='#ff3b30'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineWidth=r*0.22;const k=eo(clamp(a));seg(c,x-r*k,y-r*k,x+r*k,y+r*k);seg(c,x+r*k,y-r*k,x-r*k,y+r*k);c.restore();}
function tagC(c,x,y,s,k=1,col='#ffd23f'){if(k<=0)return;c.save();c.globalAlpha=clamp(k*2);c.translate(x,y);const sc=lerp(0.7,1,eo(clamp(k)));c.scale(sc,sc);c.font='900 40px "Inter Display"';c.letterSpacing='5px';const w=c.measureText(s).width+60;
  c.fillStyle='rgba(12,10,8,0.86)';c.beginPath();c.roundRect(-w/2,-38,w,76,38);c.fill();c.strokeStyle=col;c.lineWidth=4;c.stroke();c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,3);c.restore();}
function bigCard(c,x,y,k,top,bottom,col='#ffd23f',sz=110){if(k<=0)return;c.save();c.translate(x,y);const sc=back(clamp(k));c.scale(sc,sc);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-340,-120,680,240,30);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,top,0,-22,sz,'#fff',{sw:12});c.font='800 30px "Inter Display"';c.letterSpacing='6px';c.fillStyle=col;c.textAlign='center';c.fillText(bottom,0,78);c.restore();}
function popName(c,t,t0,name,sub,y=470){const k=clamp((t-t0)/0.3);if(k<=0)return;c.save();c.translate(540,y);const sc=back(k);c.scale(sc,sc);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-360,-90,720,180,26);c.fill();c.strokeStyle='#ffd23f';c.lineWidth=5;c.stroke();
  txt(c,name,0,-20,64,'#fff',{sw:10,ls:3});c.font='800 28px "Inter Display"';c.letterSpacing='6px';c.fillStyle='#ffd23f';c.textAlign='center';c.fillText(sub,0,52);c.restore();}
function nightVision(c,t,rec=true){c.save();c.globalCompositeOperation='saturation';c.fillStyle='#000';c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='#5aff8a';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(30,120,50,0.25)';c.fillRect(0,0,W,H);c.restore();c.save();const f=Math.floor(t*24);for(let i=0;i<1400;i++){c.fillStyle=`rgba(200,255,200,${hash(i+f*7)*0.18})`;c.fillRect(hash(i*3+f)*W,hash(i*7+f)*H,2,2);}c.restore();
  const g=c.createRadialGradient(540,960,400,540,960,1150);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.85)');c.fillStyle=g;c.fillRect(0,0,W,H);
  if(rec){c.fillStyle='rgba(180,255,190,0.85)';c.font='700 34px monospace';c.fillText((Math.floor(t*2)%2?'REC ●':'REC'),70,180);c.fillText('04/01/03  00:'+String(Math.floor(t*7)%60).padStart(2,'0'),70,230);}}
function tvFrame(c,t,live=true){const g=c.createRadialGradient(540,900,100,540,900,900);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.6)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.save();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2;for(let y=0;y<H;y+=6)seg(c,0,y,W,y);c.restore();
  if(live){c.fillStyle='#b8201a';c.fillRect(60,1520,280,74);txt(c,'LIVE',200,1557,52,'#fff',{stroke:false,ls:6});c.fillStyle='rgba(10,20,40,0.9)';c.fillRect(340,1520,680,74);c.font='800 34px "Inter Display"';c.fillStyle='#fff';c.textAlign='left';c.fillText('BREAKING: POW RESCUED IN IRAQ',364,1568);}}
function paper(c,x,y,s,rot,head1,head2,o={}){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=30;c.fillStyle='#ece4cc';c.fillRect(-340,-460,680,920);c.shadowColor='transparent';c.strokeStyle='#222';c.lineWidth=4;c.strokeRect(-340,-460,680,920);
  c.fillStyle='#111';c.font='900 46px "Lora",serif';c.textAlign='center';c.fillText(o.mast||'THE DAILY HERALD',0,-395);c.fillRect(-300,-372,600,5);c.font='900 72px "Inter Display"';c.fillText(head1,0,-280);if(head2)c.fillText(head2,0,-200);
  c.fillStyle='#bdb6a0';c.fillRect(-300,-160,600,330);c.strokeRect(-300,-160,600,330);if(o.photo)o.photo(c);c.fillStyle='#666';for(let i=0;i<9;i++)c.fillRect(-300,200+i*26,i%3===2?380:600,11);
  if(o.hl){c.fillStyle='rgba(255,210,60,0.55)';c.fillRect(-306,o.hl-8,612,26);}c.restore();}
function m16(c,x,y,s,ang,o={}){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#2a2a2c';
  c.beginPath();c.moveTo(-260,-10);c.lineTo(-120,-24);c.lineTo(-120,22);c.lineTo(-250,34);c.closePath();c.fill();c.stroke();c.fillRect(-120,-26,200,40);c.strokeRect(-120,-26,200,40);c.beginPath();c.roundRect(-40,-56,90,30,6);c.fill();c.stroke();
  c.fillRect(80,-18,180,28);c.strokeRect(80,-18,180,28);c.fillRect(260,-10,120,10);c.strokeRect(260,-10,120,10);c.fillRect(230,-46,14,30);c.strokeRect(230,-46,14,30);
  c.beginPath();c.moveTo(-30,14);c.lineTo(10,14);c.lineTo(30,110);c.lineTo(0,114);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-100,14);c.lineTo(-80,14);c.lineTo(-90,80);c.lineTo(-115,76);c.closePath();c.fill();c.stroke();
  if(o.jam){c.fillStyle='#d8b040';c.save();c.translate(-10,-30);c.rotate(-0.6);c.fillRect(-6,-20,12,34);c.strokeRect(-6,-20,12,34);c.restore();}c.restore();}
function xray(c,cx,cy,s,t,k){c.save();c.translate(cx,cy);c.scale(s,s);c.strokeStyle='rgba(210,235,255,0.9)';c.lineWidth=14;c.lineCap='round';
  c.beginPath();c.arc(0,-330,70,0,TAU);c.stroke();for(let i=0;i<12;i++){c.beginPath();c.arc(0,-240+i*26,9,0,TAU);c.stroke();}
  for(let i=0;i<6;i++){c.beginPath();c.ellipse(0,-200+i*22,90-i*6,14,0,Math.PI*0.05,Math.PI*0.95);c.stroke();}seg(c,-110,-235,110,-235);seg(c,-110,-235,-150,-60);seg(c,-150,-60,-170,90);seg(c,110,-235,150,-60);seg(c,150,-60,170,90);
  c.beginPath();c.ellipse(0,80,100,40,0,0,TAU);c.stroke();seg(c,-60,100,-80,330);seg(c,-80,330,-90,560);seg(c,60,100,80,330);seg(c,80,330,90,560);
  const hot=(x,y,lab,d)=>{const q=clamp(k*3-d);if(q<=0)return;c.save();c.strokeStyle='#ff3b30';c.lineWidth=10;c.beginPath();c.arc(x,y,60*eo(q),0,TAU);c.stroke();c.restore();if(q>0.5)txt(c,lab,x+(x<0?-170:170),y,40,'#fff',{sw:8});};
  hot(0,-110,'SPINE',0);hot(160,-10,'ARM',0.6);hot(-85,440,'LEG',1.2);c.restore();}
function memorial(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=OL;c.lineWidth=5;c.lineJoin='round';
  c.fillStyle='#2a2a2c';c.fillRect(-8,-260,16,240);c.strokeRect(-8,-260,16,240);c.fillStyle='#8a7a5a';c.beginPath();c.ellipse(0,-290,58,38,0,Math.PI,TAU);c.closePath();c.fill();c.stroke();c.fillRect(-62,-292,124,12);
  for(const sx of [-1,1]){c.fillStyle='#4a3a2a';c.beginPath();c.moveTo(sx*14,0);c.lineTo(sx*14,-70);c.lineTo(sx*48,-70);c.lineTo(sx*48,-10);c.lineTo(sx*78,-8);c.lineTo(sx*78,6);c.lineTo(sx*14,6);c.closePath();c.fill();c.stroke();}
  c.fillStyle='#c8c8c8';c.beginPath();c.ellipse(26,-180,10,16,0,0,TAU);c.fill();c.stroke();c.restore();}
function iraqMap(c,t,k){c.fillStyle='#1c2a3a';c.fillRect(0,0,W,H);const P=[[300,500],[520,440],[760,560],[860,780],[800,1100],[720,1400],[560,1500],[420,1420],[300,1180],[260,880]];c.save();c.fillStyle='#d8c098';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();P.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();c.stroke();
  c.strokeStyle='#5a8ab8';c.lineWidth=8;c.beginPath();c.moveTo(430,520);c.quadraticCurveTo(560,900,640,1300);c.stroke();c.beginPath();c.moveTo(600,480);c.quadraticCurveTo(700,850,690,1300);c.stroke();
  const dot=(x,y,l)=>{c.fillStyle='#b8201a';c.beginPath();c.arc(x,y,14,0,TAU);c.fill();c.stroke();txt(c,l,x+(x>540?-10:10),y-36,34,'#fff',{sw:7});};dot(560,780,'BAGHDAD');dot(610,1250,'NASIRIYAH');
  const q=eo(clamp(k));c.strokeStyle='#ffd23f';c.lineWidth=12;c.setLineDash([24,16]);c.lineDashOffset=-t*40;c.beginPath();const pts=[[700,1500],[690,1380],[660,1300],[620,1260]];const n=Math.max(1,Math.floor(q*3)+1);c.moveTo(...pts[0]);for(let i=1;i<=Math.min(3,n);i++){const a=pts[i-1],b=pts[i],u=i<n?1:(q*3)%1||1;c.lineTo(lerp(a[0],b[0],u),lerp(a[1],b[1],u));}c.stroke();c.setLineDash([]);c.restore();}
// rescue litter carried by two operators
function carryOut(c,t,x,z,o={}){const ph=t*7;const R=[x-1.4,0,z],Fr=[x+1.4,0,z];
  const rr=who(c,'sf2',R,F('focus','angry','grit',{seed:4,walk:1,ph,f:1,hf:[46,40],hb:[30,44]}));const rf=who(c,'sf',Fr,F('focus','angry','grit',{seed:3,walk:1,ph:ph+Math.PI,f:1,hf:[-22,52],hb:[-40,48]}));
  if(!rr||!rf)return;const s=rr.s,a={x:(rr.hf.x+rr.hb.x)/2,y:(rr.hf.y+rr.hb.y)/2},b={x:(rf.hf.x+rf.hb.x)/2,y:(rf.hf.y+rf.hb.y)/2};
  c.save();c.strokeStyle=OL;c.lineWidth=7*s;c.lineCap='round';c.beginPath();c.moveTo(a.x-10*s,a.y);c.lineTo(b.x+10*s,b.y);c.stroke();c.strokeStyle='#6a6a58';c.lineWidth=4*s;c.stroke();
  c.fillStyle='#5a6a4a';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(a.x+20*s,a.y-4*s);c.lineTo(b.x-20*s,b.y-4*s);c.lineTo(b.x-20*s,b.y+10*s);c.lineTo(a.x+20*s,a.y+10*s);c.closePath();c.fill();c.stroke();
  const L2=Math.hypot(b.x-a.x,b.y-a.y),ang=Math.atan2(b.y-a.y,b.x-a.x);c.translate(a.x,a.y);c.rotate(ang);
  c.fillStyle='#d8dcd8';c.beginPath();c.roundRect(L2-110*s,-30*s,70*s,26*s,10*s);c.fill();c.stroke();
  c.fillStyle='#f2efe8';c.beginPath();c.arc(L2-76*s,-42*s,30*s,0,TAU);c.fill();c.stroke();c.fillStyle='#d8b060';c.beginPath();c.arc(L2-72*s,-50*s,30*s,Math.PI*0.95,Math.PI*2.05);c.fill();c.stroke();
  c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.moveTo(L2-88*s,-40*s);c.lineTo(L2-80*s,-40*s);c.moveTo(L2-68*s,-40*s);c.lineTo(L2-60*s,-40*s);c.stroke();
  c.fillStyle='#7a8a6a';c.lineWidth=4*s;c.beginPath();c.moveTo(40*s,-6*s);c.quadraticCurveTo(60*s,-60*s,L2*0.5,-52*s);c.quadraticCurveTo(L2-140*s,-46*s,L2-110*s,-20*s);c.lineTo(L2-110*s,-4*s);c.lineTo(40*s,-4*s);c.closePath();c.fill();c.stroke();c.restore();}
function muzzleAt(c,x,y,s,t,sd){if((Math.floor(t*14+sd*3))%3)return;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,50*s);g.addColorStop(0,'rgba(255,250,210,1)');g.addColorStop(1,'rgba(255,150,50,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,50*s,0,TAU);c.fill();c.restore();}
function ambulance(c,x,y,s,f,t){c.save();c.translate(x,y);c.scale(f*s,s);c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#f4f4f0';c.beginPath();c.roundRect(-200,-170,300,150,14);c.fill();c.stroke();c.beginPath();c.moveTo(100,-120);c.lineTo(170,-110);c.lineTo(190,-60);c.lineTo(190,-20);c.lineTo(100,-20);c.closePath();c.fill();c.stroke();
  c.fillStyle='#8ab0c8';c.beginPath();c.moveTo(112,-108);c.lineTo(162,-100);c.lineTo(176,-66);c.lineTo(112,-66);c.closePath();c.fill();c.stroke();c.fillStyle='#c8201a';c.fillRect(-80,-120,40,90);c.fillRect(-105,-95,90,40);
  for(const wx of [-130,120]){c.fillStyle='#1a1a1a';c.beginPath();c.arc(wx,-16,34,0,TAU);c.fill();c.stroke();c.fillStyle='#8a8a8a';c.beginPath();c.arc(wx,-16,12,0,TAU);c.fill();}
  if(Math.floor(t*6)%2){c.fillStyle='#ff4a3a';c.beginPath();c.arc(-150,-180,14,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,80,60,0.35)';c.beginPath();c.arc(-150,-180,60,0,TAU);c.fill();c.restore();}c.restore();}
function bedPatient(c,p,o={}){const s=p.s;c.save();c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#f2efe8';c.beginPath();c.arc(p.x-70*s,p.y-52*s,30*s,0,TAU);c.fill();c.stroke();c.fillStyle='#d8b060';c.beginPath();c.arc(p.x-74*s,p.y-60*s,30*s,Math.PI*0.95,Math.PI*2.05);c.fill();c.stroke();
  c.fillStyle=OL;if(o.closed){c.lineWidth=3;seg(c,p.x-84*s,p.y-50*s,p.x-76*s,p.y-50*s);seg(c,p.x-64*s,p.y-50*s,p.x-56*s,p.y-50*s);}else{c.beginPath();c.arc(p.x-80*s,p.y-52*s,3.5*s,0,TAU);c.arc(p.x-60*s,p.y-52*s,3.5*s,0,TAU);c.fill();}
  c.fillStyle='#a8c8d8';c.beginPath();c.roundRect(p.x-44*s,p.y-62*s,190*s,44*s,14*s);c.fill();c.stroke();c.restore();}
// =============== shots ===============
// 0-1 · "In 2003, America watched a hero get rescued live from an Iraqi hospital…" — the night-vision footage on the news
XJ.live=(c,t,u,d)=>{const cx=2.4+u*0.35;camAt(c,'iq_hosp',[cx,1.3,8],1.3+u*0.02,{oy:-20});carryOut(c,t,cx,8);c.restore();nightVision(c,t);tvFrame(c,t,t>LT(1)-0.1);
  if(u<0.6)bigCard(c,540,520,clamp(u/0.25),'2003','IRAQ WAR');lens(c,t,{v:0.4});};
// 2 · "and almost none of it was true." freeze, the image cracks
XJ.untrue=(c,t,u,d)=>{XJ.live(c,LT(2)-0.2,LT(2)-0.2,3);c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.9)';c.fillRect(0,0,W,H);c.restore();ink(c,0.3);
  const k=eo(clamp(u/0.4));c.save();c.strokeStyle='rgba(255,255,255,0.9)';c.lineWidth=4;for(let i=0;i<9;i++){const a=i/9*TAU+0.3;c.beginPath();c.moveTo(540,820);let x=540,y=820;for(let j=0;j<5;j++){x+=Math.cos(a+(hash(i*5+j)-0.5))*120*k;y+=Math.sin(a+(hash(i*7+j)-0.5))*120*k;c.lineTo(x,y);}c.stroke();}c.restore();
  if(u>0.3){c.save();c.translate(540,820);const kk=back(clamp((u-0.3)/0.3));c.scale(kk*0.8,kk*0.8);bigQ(c,0,0,1,t);c.restore();}lens(c,t);};
// 3 · "Her name was Jessica Lynch."
XJ.name=(c,t,u,d)=>{camAt(c,'iq_road',[0.6,1.3,1.9],2.2,{oy:-20});who(c,'jess',[0.8,0,1.9],F('dot','flat','smile',{seed:1,hf:[10,92],hb:[-10,92]}));c.restore();popName(c,t,LT(3)+0.4,'JESSICA LYNCH','PFC · U.S. ARMY');lens(c,t);};
// 4 · "She was 19 years old, a supply clerk from West Virginia." she checks a supply crate with a clipboard; tags
XJ.clerk=(c,t,u,d)=>{camAt(c,'iq_road',[0.4,1.2,1.6],1.9,{oy:-20});const r=who(c,'jess',[0.6,0,1.9],F('focus','flat','flat',{seed:1,hf:[34,40],hb:[-10,92],look:[1,2]}));
  if(r){c.save();c.translate(r.hf.x,r.hf.y);c.rotate(-0.15);c.fillStyle='#8a6a3a';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-10,-70,80,100);c.strokeRect(-10,-70,80,100);c.fillStyle='#f4f0e4';c.fillRect(-2,-58,64,82);c.fillStyle='#999';for(let i=0;i<5;i++)c.fillRect(6,-48+i*14,46,4);c.restore();}
  const cp=pp([1.8,0,2.2]);c.save();c.fillStyle='#6a6a3a';c.strokeStyle=OL;c.lineWidth=5;c.fillRect(cp.x-90,cp.y-110,180,110);c.strokeRect(cp.x-90,cp.y-110,180,110);txt(c,'MRE',cp.x,cp.y-55,36,'#e8e0c0',{stroke:false});c.restore();c.restore();
  tagC(c,300,420,'AGE 19',clamp((t-wb('19',11))/0.3));tagC(c,780,520,'SUPPLY CLERK',clamp((t-wb('supply',12))/0.3));tagC(c,420,620,'WEST VIRGINIA',clamp((t-wb('west',13))/0.3));lens(c,t);};
// 5 · "March 23rd, 2003." calendar page over the convoy on the road
XJ.date=(c,t,u,d)=>{camAt(c,'iq_road',[-6,1.5,0],1.15+u*0.03,{oy:0});c.restore();const k=back(clamp(u/0.3));c.save();c.translate(540,500);c.scale(k,k);c.rotate(-0.04);c.fillStyle='#f4ecd8';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-190,-150,380,300);c.strokeRect(-190,-150,380,300);c.fillStyle='#b8201e';c.fillRect(-190,-150,380,80);
  txt(c,'MARCH',0,-110,52,'#fff',{stroke:false,ls:6});txt(c,'23',0,10,140,'#1a1a1a',{stroke:false});txt(c,'2003',0,110,46,'#5a4a3a',{stroke:false,ls:8});c.restore();lens(c,t);};
// 6 · "Her convoy took a wrong turn into the city of Nasiriyah…" map: the route bends the wrong way
XJ.map=(c,t,u,d)=>{iraqMap(c,t,u/(d*0.8));if(u>1.2)tagC(c,540,420,'WRONG TURN',clamp((u-1.2)/0.3));lens(c,t);};
// 7 · "and drove straight into an ambush." muzzle flashes from the rooftops, soldiers dive for cover behind the truck
XJ.ambush=(c,t,u,d)=>{const h={ox:Math.sin(t*23)*10,oy:Math.cos(t*19)*8};camAt(c,'iq_roadLow',[-4,1.2,1.5],1.05,{ox:h.ox,oy:h.oy+40});
  for(let i=0;i<8;i++){const p=pp([-30+i*7,3.5+hash(i)*2,(i%2?-1:1)*(7+hash(i*3)*3)]);muzzleAt(c,p.x,p.y,p.s*2,t,i);}
  cast(c,[['jess',[-4.6,0,1.6],F('shock','worried','scream',{seed:1,crouch:50,f:-1})],['gi1',[-2.6,0,2.4],F('squeeze','angry','grit',{seed:3,crouch:40,f:-1})]]);c.restore();lens(c,t,{v:0.6});};
// 8 · "Eleven American soldiers were killed." dusk, eleven memorial crosses in a row
XJ.eleven=(c,t,u,d)=>{camAt(c,'iq_road',[-6,1.2,0],1.1,{oy:0});c.restore();c.fillStyle='rgba(40,20,10,0.45)';c.fillRect(0,0,W,H);
  for(let i=0;i<11;i++){const k=clamp((u-i*0.08)/0.3);if(k<=0)continue;const x=90+i*90,y=1500-Math.abs(i-5)*10;c.save();c.globalAlpha=k;memorial(c,x,y,0.55);c.restore();}
  bigCard(c,540,500,clamp(u/0.3),'11','SOLDIERS KILLED','#e8e8e8');lens(c,t,{v:0.7});};
// 9 · "pulled from a wrecked Humvee with a broken spine, a broken arm, and a shattered leg." x-ray
XJ.xray=(c,t,u,d)=>{c.fillStyle='#06101c';c.fillRect(0,0,W,H);xray(c,540,1020,1.0,t,u/(d*0.85));tagC(c,540,330,'FROM A HUMVEE CRASH',clamp(u/0.3));lens(c,t);};
// 10 · "She was taken prisoner." hospital bed, a guard's shadow in the doorway
XJ.prisoner=(c,t,u,d)=>{camAt(c,'iq_ward',[0,0.8,-1.8],1.5,{oy:-30});const p=pp([0,0.62,-1.8]);bedPatient(c,p,{closed:1});c.restore();
  c.fillStyle='rgba(0,0,0,0.55)';c.beginPath();c.moveTo(980,400);c.lineTo(1080,380);c.lineTo(1080,1500);c.lineTo(900,1500);c.closePath();c.fill();c.fillStyle='rgba(0,0,0,0.6)';c.beginPath();c.ellipse(990,700,40,52,0,0,TAU);c.fill();c.fillRect(950,750,80,400);lens(c,t,{v:0.7});};
// 11 · "Nine days later, Special Forces stormed the hospital where she was being held." night raid: operators run in
XJ.storm=(c,t,u,d)=>{camAt(c,'iq_hosp',[0,2.2,4],1.15+u*0.04,{oy:0});cast(c,[['sf',[-3+u*1.4,0,6.5],F('focus','angry','grit',{seed:3,run:1,ph:t*13,f:1})],['sf2',[-5+u*1.4,0,7.5],F('focus','angry','grit',{seed:4,run:1,ph:t*13+1,f:1})],['sf',[-7+u*1.4,0,6],F('focus','angry','grit',{seed:7,run:1,ph:t*13+2,f:1})]]);c.restore();nightVision(c,t);tagC(c,540,330,'9 DAYS LATER',clamp(u/0.3),'#8aff9a');lens(c,t,{v:0.3});};
// 12 · "Night-vision cameras rolled as they carried her out on a stretcher."
XJ.carry=(c,t,u,d)=>{const cx=2.0+u*0.4;camAt(c,'iq_hosp',[cx,1.3,8.5],1.3,{oy:-20});carryOut(c,t,cx,8.5);c.restore();nightVision(c,t);lens(c,t,{v:0.3});};
// 13 · "And by the next morning," sunrise, a stack of newspapers dropped on a doorstep
XJ.morning=(c,t,u,d)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#f8c080');g.addColorStop(1,'#6a4a3a');c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='#ffe8a0';c.beginPath();c.arc(540,1200,200,0,TAU);c.fill();
  for(let i=0;i<5;i++){const k=eo(clamp((u-i*0.12)/0.4));paper(c,540+(i-2)*40,lerp(-400,900+i*30,k),0.5,(i-2)*0.12,'POW RESCUED','',{});}lens(c,t);};
// 14 · "America had a legend." TV anchor, HERO graphic
XJ.legend=(c,t,u,d)=>{c.fillStyle='#14203a';c.fillRect(0,0,W,H);c.fillStyle='#1e3058';c.fillRect(0,1150,W,770);who(c,'anchor',[0,0,0],F('happy','up','smile',{seed:9,abs:{x:540,y:1700,s:2.2},hf:[30,40],hb:[-30,40]}));c.fillStyle='#2a3a5a';c.fillRect(140,1420,800,500);c.strokeStyle=OL;c.lineWidth=6;c.strokeRect(140,1420,800,500);
  c.save();c.translate(540,560);const k=back(clamp(u/0.3));c.scale(k,k);c.fillStyle='#0a1430';c.fillRect(-360,-220,720,440);c.strokeStyle='#ffd23f';c.lineWidth=8;c.strokeRect(-360,-220,720,440);txt(c,'AMERICAN',0,-90,80,'#fff',{sw:10,ls:6});txt(c,'HERO',0,40,170,'#ffd23f',{sw:16,ls:8});c.restore();tvFrame(c,t,false);lens(c,t);};
// 15-16 · "Newspapers said she fought until she ran out of ammunition. That she was shot and stabbed." the front page, lines highlighted
const MYTH=(c)=>{c.save();c.translate(0,0);c.fillStyle='#c8b48a';c.beginPath();c.ellipse(0,40,90,120,0,0,TAU);c.fill();c.fillStyle='#f2efe8';c.beginPath();c.arc(0,-90,50,0,TAU);c.fill();c.strokeStyle='#222';c.lineWidth=4;c.stroke();c.fillStyle='#b8a070';c.beginPath();c.ellipse(0,-120,62,34,0,Math.PI,TAU);c.fill();c.restore();};
XJ.papers=(c,t,u,d)=>{c.fillStyle='#2a2420';c.fillRect(0,0,W,H);const k=eo(clamp(u/0.5));const hl=t>LT(16)?260:t>LT(15)+0.6?208:null;paper(c,540,860,lerp(0.3,1.25,k),lerp(4,-0.04,k),'"FIGHTING','TO THE END"',{photo:MYTH,hl:hl===null?null:(hl)});
  if(t>LT(16)){tagC(c,540,330,'SHOT & STABBED?',clamp((t-LT(16))/0.3));}else if(t>LT(15)+0.6)tagC(c,540,330,'EMPTIED HER GUN?',clamp((t-LT(15)-0.6)/0.3));lens(c,t);};
// 17 · "That she went down fighting." the myth: a comic-book action poster
XJ.myth=(c,t,u,d)=>{const g=c.createRadialGradient(540,900,50,540,900,1100);g.addColorStop(0,'#ffcf5a');g.addColorStop(1,'#c8401a');c.fillStyle=g;c.fillRect(0,0,W,H);c.save();c.globalAlpha=0.35;for(let i=0;i<24;i++){c.fillStyle=i%2?'#fff':'#ffb020';c.beginPath();c.moveTo(540,900);const a=i/24*TAU+t*0.2;c.lineTo(540+Math.cos(a)*1600,900+Math.sin(a)*1600);c.lineTo(540+Math.cos(a+0.13)*1600,900+Math.sin(a+0.13)*1600);c.fill();}c.restore();
  const r=who(c,'jess',[0,0,0],F('angry','angry','grit',{seed:1,abs:{x:540,y:1640,s:2.6},hf:[90,-50],hb:[60,-36],lean:0.1}));if(r){m16(c,r.hf.x+40,r.hf.y+6,0.75,-0.1);muzzleAt(c,r.hf.x+330,r.hf.y-10,3,0,0);}
  c.save();c.strokeStyle=OL;c.lineWidth=10;c.strokeRect(30,260,1020,1560);c.restore();txt(c,'THE STORY',540,400,92,'#fff',{sw:14,ls:8});lens(c,t);};
// 18 · "Movie deals. Magazine covers." covers fly in, a film clapper snaps
XJ.covers=(c,t,u,d)=>{c.fillStyle='#1a1418';c.fillRect(0,0,W,H);for(let i=0;i<4;i++){const k=eo(clamp((u-i*0.18)/0.35));if(k<=0)continue;c.save();c.translate(lerp(i%2?1400:-300,220+i*210,k),lerp(300,620+(i%2)*260,k));c.rotate((i-1.5)*0.14);
    c.fillStyle=['#c8201a','#f4f4f0','#1a3a7a','#ffd23f'][i];c.fillRect(-150,-200,300,400);c.strokeStyle=OL;c.lineWidth=6;c.strokeRect(-150,-200,300,400);txt(c,['HERO','BRAVE','POW','SAVED'][i],0,-150,50,i===1||i===3?'#111':'#fff',{stroke:false,ls:4});MYTH.call(null,(()=>{c.save();c.translate(0,70);c.scale(1.2,1.2);return c;})());c.restore();c.restore();}
  if(t>wb('movie',52.5)){const k=clamp((t-wb('movie',52.5))/0.4);c.save();c.translate(540,1450);c.rotate(-0.1);c.fillStyle='#1a1a1a';c.fillRect(-200,-60,400,200);c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(-200,-60,400,200);c.save();c.translate(-200,-60);c.rotate(-0.5*(1-k));c.fillStyle='#1a1a1a';c.fillRect(0,-50,400,50);for(let i=0;i<6;i++){c.fillStyle='#fff';c.beginPath();c.moveTo(i*70,-50);c.lineTo(i*70+35,-50);c.lineTo(i*70+15,0);c.lineTo(i*70-20,0);c.fill();}c.restore();txt(c,'THE MOVIE',0,50,48,'#fff',{stroke:false});c.restore();}lens(c,t);};
// 19 · "A hero for a nation at war." flag rippling, her portrait
XJ.nation=(c,t,u,d)=>{for(let i=0;i<13;i++){c.fillStyle=i%2?'#f4f4f0':'#b8201a';c.beginPath();for(let x=0;x<=W;x+=20)c.lineTo(x,i*150+Math.sin(x*0.01+t*2)*14);for(let x=W;x>=0;x-=20)c.lineTo(x,(i+1)*150+Math.sin(x*0.01+t*2)*14);c.fill();}c.fillStyle='#1a3a7a';c.fillRect(0,0,500,800);c.fillStyle='#fff';for(let i=0;i<20;i++){c.beginPath();c.arc(50+(i%5)*100,80+Math.floor(i/5)*180,16,0,TAU);c.fill();}
  ink(c,0.25);who(c,'jess',[0,0,0],F('happy','up','smile',{seed:1,abs:{x:540,y:1500,s:2.4},hf:[14,92],hb:[-14,92]}));lens(c,t);};
// 20 · "But here's where it gets strange." record scratch freeze
XJ.strange=(c,t,u,d)=>{XJ.nation(c,LT(20)-0.1,1.5,2);c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.85)';c.fillRect(0,0,W,H);c.restore();ink(c,0.3);stamp(c,LT(20)+0.3,t,'WAIT…',540,520,{col:'#ffd23f',size:120});};
// 21 · "Jessica never fired a single shot." her rifle, round counter stays at 0
XJ.noshot=(c,t,u,d)=>{c.fillStyle='#1c1a16';c.fillRect(0,0,W,H);m16(c,540,880,1.2,-0.06);bigCard(c,540,460,clamp(u/0.3),'0','SHOTS FIRED');lens(c,t);};
// 22 · "Her rifle jammed." the cartridge stuck in the ejection port; she yanks the charging handle
XJ.jammed=(c,t,u,d)=>{c.fillStyle='#1c1a16';c.fillRect(0,0,W,H);const sh=Math.sin(t*30)*4;m16(c,540+sh,880,1.6,-0.06,{jam:1});stamp(c,LT(22)+0.25,t,'JAMMED',540,480,{col:'#ffd23f',size:110});lens(c,t);};
// 23-24 · "She wasn't shot. She wasn't stabbed." icons get crossed out
XJ.notshot=(c,t,u,d)=>{c.fillStyle='#1c1a16';c.fillRect(0,0,W,H);const ic=(x,y,kind,k,lab)=>{c.save();c.translate(x,y);c.fillStyle='rgba(255,255,255,0.08)';c.beginPath();c.arc(0,0,200,0,TAU);c.fill();c.strokeStyle='#fff';c.lineWidth=8;c.stroke();c.fillStyle='#d8d4c8';c.strokeStyle=OL;c.lineWidth=5;
    if(kind==='bullet'){c.beginPath();c.moveTo(-40,90);c.lineTo(-40,-30);c.quadraticCurveTo(0,-130,40,-30);c.lineTo(40,90);c.closePath();c.fillStyle='#c8a040';c.fill();c.stroke();}else{c.rotate(-0.7);c.beginPath();c.moveTo(-14,-140);c.lineTo(14,-140);c.lineTo(10,40);c.lineTo(-10,40);c.closePath();c.fill();c.stroke();c.fillStyle='#4a3020';c.fillRect(-22,40,44,90);c.strokeRect(-22,40,44,90);}
    c.restore();bigX(c,x,y,170,k,'#ff3b30');txt(c,lab,x,y+260,44,'#fff',{sw:8});};
  ic(540,700,'bullet',clamp((t-LT(23)-0.3)/0.25),'NOT SHOT');if(t>LT(24)-0.1)ic(540,1400,'knife',clamp((t-LT(24)-0.3)/0.25),'NOT STABBED');lens(c,t);};
// 25 · "Her injuries came from the crash." diagram: the Humvee slams the truck and rolls
XJ.crash=(c,t,u,d)=>{camAt(c,'iq_roadLow',[-3,1.2,1],1.15,{oy:0});c.restore();const k=eo(clamp(u/0.8));c.save();c.translate(lerp(-200,520,k),1300);c.rotate(k*2.6*clamp((u-0.6)/0.6));c.fillStyle='#c8b48a';c.strokeStyle=OL;c.lineWidth=6;c.fillRect(-160,-110,320,90);c.strokeRect(-160,-110,320,90);c.fillRect(-60,-170,180,60);c.strokeRect(-60,-170,180,60);
  for(const wx of [-100,100]){c.fillStyle='#1a1a1a';c.beginPath();c.arc(wx,-20,36,0,TAU);c.fill();c.stroke();}c.restore();if(u>0.7){c.save();c.globalCompositeOperation='lighter';c.fillStyle=`rgba(255,220,150,${0.6*(1-clamp((u-0.7)/0.4))})`;c.beginPath();c.arc(640,1260,220,0,TAU);c.fill();c.restore();}tagC(c,540,440,'THE CRASH',clamp(u/0.3));lens(c,t);};
// 26 · "And the hospital?"
XJ.hospQ=(c,t,u,d)=>{camAt(c,'iq_hosp',[0,4,-4],1.0+u*0.05,{oy:0});c.restore();if(u>0.2){c.save();c.translate(540,520);const k=back(clamp((u-0.2)/0.3));c.scale(k*0.7,k*0.7);bigQ(c,0,0,1,t);c.restore();}lens(c,t);};
// 27 · "The Iraqi soldiers had already left it." empty ward, guards' chairs empty, a door swinging
XJ.left=(c,t,u,d)=>{camAt(c,'iq_ward',[-0.5,1,-1.5],1.15,{oy:-20});c.restore();tagC(c,540,420,'SOLDIERS: GONE',clamp(u/0.3));lens(c,t);};
// 28 · "The doctors said they'd given her their own blood, and had even tried to drive her back… in an ambulance…"
XJ.doctors=(c,t,u,d)=>{const amb=t>wb('ambulance',78);if(!amb){camAt(c,'iq_ward',[0,0.9,-1.4],1.55,{oy:-30});const p=pp([0,0.62,-1.8]);bedPatient(c,p);
    const r=who(c,'iqdoc',[0.9,0,-1.2],F('focus','up','smile',{seed:11,f:-1,hf:[-50,-40],hb:[10,92]}));if(r){c.save();c.fillStyle='#b8201a';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.roundRect(r.hf.x-22,r.hf.y-60,44,56,8);c.fill();c.stroke();c.strokeStyle='#b8201a';c.lineWidth=3;c.beginPath();c.moveTo(r.hf.x,r.hf.y);c.quadraticCurveTo(r.hf.x-60,r.hf.y+40,p.x-60*p.s,p.y-40*p.s);c.stroke();c.restore();}
    c.restore();tagC(c,540,420,'GAVE HER BLOOD',clamp((t-wb('blood',75))/0.3));}
  else{camAt(c,'iq_hosp',[0,1.5,6],1.1,{oy:0});c.restore();ambulance(c,lerp(300,800,eo(clamp((t-wb('ambulance',78))/1.2))),1450,1.2,1,t);nightVision(c,t,false);tagC(c,540,420,'AMBULANCE → U.S. LINES',clamp((t-wb('ambulance',78))/0.3),'#8aff9a');}lens(c,t);};
// 29 · "but U.S. troops opened fire on it at a checkpoint." it stops, flashes, turns back
XJ.checkpoint=(c,t,u,d)=>{c.fillStyle='#0a1016';c.fillRect(0,0,W,H);c.fillStyle='#2a2a26';c.fillRect(0,1500,W,420);c.save();c.fillStyle='#c8b090';for(let i=0;i<6;i++)c.fillRect(700+i*60,1380,50,120);c.restore();
  const back2=clamp((u-1.2)/1);ambulance(c,lerp(380,140,back2),1520,1.0,back2>0?-1:1,t);for(let i=0;i<4;i++)muzzleAt(c,900+i*40,1320-i*20,2,t,i);nightVision(c,t,false);tagC(c,540,420,'CHECKPOINT',clamp(u/0.3),'#8aff9a');lens(c,t);};
// 30 · "When the rescue team stormed in," door kicked open in night vision
XJ.breach=(c,t,u,d)=>{camAt(c,'iq_ward',[0.5,1.1,0],1.05,{oy:0});const k=clamp(u/0.3);who(c,'sf',[1.2-u*0.6,0,0.2],F('focus','angry','grit',{seed:3,walk:1,ph:t*9,f:-1,hf:[-60,10],hb:[-30,20]}));who(c,'sf2',[2.4-u*0.6,0,0.9],F('focus','angry','grit',{seed:4,walk:1,ph:t*9+1,f:-1}));c.restore();nightVision(c,t);flash(c,clamp(1-u/0.12)*0.6,'#aaffaa');lens(c,t,{v:0.3});};
// 31 · "there was no one left to fight." operators lower weapons, a doctor stands calmly with raised open hands
XJ.noone=(c,t,u,d)=>{camAt(c,'iq_ward',[0,1.1,-0.4],1.05,{oy:0});cast(c,[['sf',[0.8,0,0.4],F('wide','up','o',{seed:3,f:-1,look:[-2,0]})],['iqdoc2',[-1.8,0,-1.2],F('dot','flat','flat',{seed:12,f:1,hf:[60,-40],hb:[-60,-40]})],['sf2',[2.2,0,1.0],F('half','flat','flat',{seed:4,f:-1})]]);c.restore();nightVision(c,t);tagC(c,540,330,'NO RESISTANCE',clamp(u/0.3),'#8aff9a');lens(c,t,{v:0.3});};
// 32 · "So where did the action-movie version come from?" a film reel spins over the myth poster
XJ.movie=(c,t,u,d)=>{XJ.myth(c,t,1,2);ink(c,0.5);c.save();c.translate(540,800);c.rotate(t*2);c.fillStyle='#2a2a2c';c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.arc(0,0,260,0,TAU);c.fill();c.stroke();for(let i=0;i<6;i++){const a=i/6*TAU;c.fillStyle='#0a0a0a';c.beginPath();c.arc(Math.cos(a)*150,Math.sin(a)*150,60,0,TAU);c.fill();}c.fillStyle='#fff';c.beginPath();c.arc(0,0,30,0,TAU);c.fill();c.restore();lens(c,t);};
// 33 · "Nobody ever fully explained it." a file with blacked-out lines
XJ.redacted=(c,t,u,d)=>{c.fillStyle='#2a2420';c.fillRect(0,0,W,H);c.save();c.translate(540,880);c.rotate(-0.03);c.fillStyle='#f0ead8';c.fillRect(-380,-560,760,1120);c.strokeStyle=OL;c.lineWidth=5;c.strokeRect(-380,-560,760,1120);txt(c,'REPORT',0,-470,60,'#222',{stroke:false,ls:8});
  for(let i=0;i<18;i++){const y=-370+i*50,w=i%4===3?400:640;const k=clamp((u-i*0.06)/0.15);c.fillStyle='#999';c.fillRect(-320,y,w,14);if(hash(i*3)>0.35){c.fillStyle='#111';c.fillRect(-320,y-10,w*k,34);}}c.restore();if(u>0.8){c.save();c.translate(540,520);const k=back(clamp((u-0.8)/0.3));c.scale(k*0.6,k*0.6);bigQ(c,0,0,1,t);c.restore();}lens(c,t);};
// 34-36 · "And the soldier who actually did fight back that day, her best friend, Lori Piestewa, was barely mentioned."
XJ.lori=(c,t,u,d)=>{camAt(c,'iq_road',[0.2,1.3,1.6],2.0,{oy:-20});cast(c,[['lori',[-0.3,0,1.9],F('focus','angry','grit',{seed:2,f:1,hf:[10,92],hb:[-10,92]})],['jess',[1.1,0,1.5],F('happy','up','smile',{seed:1,f:-1,hf:[-30,40],hb:[10,92]})]]);c.restore();
  popName(c,t,LT(35)+0.1,'LORI PIESTEWA','PFC · HER BEST FRIEND');lens(c,t);};
XJ.mention=(c,t,u,d)=>{c.fillStyle='#2a2420';c.fillRect(0,0,W,H);paper(c,540,880,1.15,-0.03,'"FIGHTING','TO THE END"',{photo:MYTH});const mx=700,my=1180;c.save();c.strokeStyle=OL;c.lineWidth=16;c.beginPath();c.arc(mx,my,130,0,TAU);c.stroke();c.strokeStyle='#c8a868';c.lineWidth=8;c.stroke();c.lineWidth=36;c.strokeStyle=OL;c.lineCap='round';seg(c,mx+92,my+92,mx+220,my+220);c.strokeStyle='#5a3a22';c.lineWidth=24;seg(c,mx+92,my+92,mx+220,my+220);c.restore();
  txt(c,'…Piestewa',mx,my,30,'#333',{stroke:false});tagC(c,540,330,'BARELY MENTIONED',clamp(u/0.3));lens(c,t);};
// 37-38 · "She died of her wounds, the first Native American woman killed in combat for the U.S. military."
XJ.died=(c,t,u,d)=>{camAt(c,'iq_road',[-6,1.4,0],1.1,{oy:0});c.restore();c.fillStyle='rgba(60,30,20,0.45)';c.fillRect(0,0,W,H);memorial(c,540,1520,1.5);
  if(t>LT(38)-0.1){const k=clamp((t-LT(38))/0.4);c.save();c.globalAlpha=k;c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(90,330,900,250,30);c.fill();c.strokeStyle='#ffd23f';c.lineWidth=5;c.stroke();txt(c,'FIRST NATIVE AMERICAN WOMAN',540,400,46,'#fff',{sw:8});txt(c,'KILLED IN COMBAT',540,470,46,'#fff',{sw:8});txt(c,'IN THE U.S. MILITARY',540,535,38,'#ffd23f',{sw:6});c.restore();}lens(c,t,{v:0.7});};
// 39 · "Four years later, Jessica stood in front of Congress and said it herself:" the hearing room
XJ.congress=(c,t,u,d)=>{camAt(c,'cg_hear',[0,1.3,0.6],1.05+u*0.04,{oy:0});const P=[0,0,0.9];const h1=[16,50],h2=[-16,50];who(c,'jessV',P,F('half','worried','flat',{seed:6,kn:1,hf:h1,hb:h2}));
  occluder(c,[[-1.9,0.8,2.1],[1.9,0.8,2.1],[1.9,0,2.1],[-1.9,0,2.1]],'#6a4426');occluder(c,[[-1.9,0.84,2.15],[1.9,0.84,2.15],[1.9,0.78,2.15],[-1.9,0.78,2.15]],'#3a5a3a');for(const x of [-0.5,0.5]){const m=pp([x,0.83,1.7]),m2=pp([x*0.7,1.12,1.4]);c.strokeStyle=OL;c.lineWidth=6;seg(c,m.x,m.y,m2.x,m2.y);c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(m2.x,m2.y,10,16,0,0,TAU);c.fill();}
  c.restore();tagC(c,540,330,'APRIL 2007 · CONGRESS',clamp(u/0.3));lens(c,t);};
// 40 · the quote
XJ.quote=(c,t,u,d)=>{camAt(c,'cg_hear',[0,1.3,1.0],1.35,{oy:120});const P=[0,0,0.9];const h1=[16,50],h2=[-16,50];who(c,'jessV',P,F('half','worried','frown',{seed:6,kn:1,hf:h1,hb:h2}));
  occluder(c,[[-1.9,0.8,2.1],[1.9,0.8,2.1],[1.9,0,2.1],[-1.9,0,2.1]],'#6a4426');c.restore();const k=clamp(u/0.4);c.save();c.globalAlpha=k;c.fillStyle='rgba(12,10,8,0.9)';c.beginPath();c.roundRect(70,270,940,300,30);c.fill();c.strokeStyle='#ffd23f';c.lineWidth=5;c.stroke();
  txt(c,'"I\'M STILL CONFUSED AS TO',540,360,48,'#fff',{sw:6});txt(c,'WHY THEY CHOSE TO LIE."',540,430,48,'#ffd23f',{sw:6});c.font='700 28px "Inter Display"';c.fillStyle='#ccc';c.textAlign='center';c.fillText('— JESSICA LYNCH, 2007',540,510);c.restore();lens(c,t);};
// 41-42 · "She said she wasn't a hero. She was a survivor."
XJ.survivor=(c,t,u,d)=>{camAt(c,'cg_hear',[0,1.3,1.0],1.55,{oy:140});const P=[0,0,0.9];who(c,'jessV',P,F('half','flat','smile',{seed:6,kn:1,hf:[10,64],hb:[-10,64]}));occluder(c,[[-1.9,0.8,2.1],[1.9,0.8,2.1],[1.9,0,2.1],[-1.9,0,2.1]],'#6a4426');c.restore();
  const t1=LT(42);if(t<t1){c.save();txt(c,'HERO',540,420,130,'#fff',{sw:14,ls:8});c.restore();bigX(c,540,420,140,clamp((t-LT(41)-0.4)/0.25),'#ff3b30');}else tagC(c,540,420,'SURVIVOR',clamp((t-t1)/0.3)*1.0);lens(c,t);};
// 43 · "And the real heroes were the ones who didn't come home." dusk on the road, the memorial row, fade out
XJ.home=(c,t,u,d)=>{camAt(c,'iq_road',[-6,1.4,0],lerp(1.05,1.2,eio(clamp(u/(d-1)))),{oy:0});c.restore();c.fillStyle='rgba(90,40,20,0.4)';c.fillRect(0,0,W,H);for(let i=0;i<11;i++)memorial(c,90+i*90,1500-Math.abs(i-5)*10,0.55);
  const f=clamp((t-(END-1.8))/1.7);lens(c,t,{v:0.7});if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
const XSEQ=[['live',0],['untrue',LT(2)-0.05],['name',LT(3)-0.05],['clerk',LT(4)-0.05],['date',LT(5)-0.05],['map',LT(6)-0.05],['ambush',LT(7)-0.05],['eleven',LT(8)-0.05],['xray',LT(9)-0.05],['prisoner',LT(10)-0.05],
  ['storm',LT(11)-0.05],['carry',LT(12)-0.05],['morning',LT(13)-0.05],['legend',LT(14)-0.05],['papers',LT(15)-0.05],['myth',LT(17)-0.05],['covers',LT(18)-0.05],['nation',LT(19)-0.05],['strange',LT(20)-0.05],
  ['noshot',LT(21)-0.05],['jammed',LT(22)-0.05],['notshot',LT(23)-0.05],['crash',LT(25)-0.05],['hospQ',LT(26)-0.05],['left',LT(27)-0.05],['doctors',LT(28)-0.05],['checkpoint',LT(29)-0.05],['breach',LT(30)-0.05],['noone',LT(31)-0.05],
  ['movie',LT(32)-0.05],['redacted',LT(33)-0.05],['lori',LT(34)-0.05],['mention',LT(36)-0.05],['died',LT(37)-0.05],['congress',LT(39)-0.05],['quote',LT(40)-0.05],['survivor',LT(41)-0.05],['home',LT(43)-0.05]];
SHOTS.length=0;XSEQ.forEach(([k,t0],i)=>{const t1=i+1<XSEQ.length?XSEQ[i+1][1]:END;SHOTS.push([t0,(c,t,u,d)=>XJ[k](c,t,t-t0,t1-t0)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
