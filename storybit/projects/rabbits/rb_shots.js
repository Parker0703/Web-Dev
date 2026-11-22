'use strict';
// ===================== "Napoleon vs 1,000 rabbits" — StoryBit B =====================
SH={};
KEY.clear();['RABBITS.','RABBITS','1807.','MISTAKE.','OPPOSITE.','LUNCH.','WHY?'].forEach(k=>KEY.add(k));
const LIT=(rim='#ffe0a8',amb='#3a2a20',dx=1)=>{L2={dx,rim,amb};};
const nz2=(a,b)=>clamp((T-a)/(b-a));
const ink=(c,a)=>{c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);};
function BERT(o){return fig2(o.c,{kind:'berthier',view:'front',...o});}
// 0 · "Napoleon conquered armies, defeated kings, and nearly took over Europe." the emperor on the field, his army behind; crowns fall
SH.hook=function(c,t){LIT();field(c,t,{x:540,y:1080,z:pushZ(t,0,2.4,1.0,1.08),mm:50},{sky:'sun',world:(c2,GY)=>{
  for(let i=0;i<7;i++)fig2(c2,{kind:'french',view:'front',x:120+i*140,y:GY+150,s:1.0,f:1,t,seed:i,eyes:'dot',mouth:'flat',hf:[10,92],hb:[-10,92]});
  NAP({c:c2,x:540,y:GY+720,s:2.8,f:1,t,eyes:'dot',brow:'angry',mouth:'smirk',hf:[30,30],hb:[-10,92]});}});
  for(const [i,w] of [[0,'defeated'],[1,'kings']]){const t0=TW(w);const k=clamp((t-t0)/0.6);if(k>0&&k<1.5){c.save();c.translate(260+i*560,560+k*k*500);c.rotate(k*2*(i?1:-1));c.globalAlpha=1-clamp(k-0.6);prop(c,'crown',0,0,170,0,{anc:[0.5,0.5]});c.restore();}}
  if(t<0.12)F0(c,t,0,0.12);vignette(c,0.4);};
SH.europe=function(c,t){const q=eo(inv(TW('nearly'),B(0),t));europe(c,t,{z:1.05,labels:1,col:{FR:'#3a6ad8',ES:q>0.2?'#5a8ae8':null,IT:q>0.35?'#5a8ae8':null,AT:q>0.55?'#5a8ae8':null,PR:q>0.75?'#5a8ae8':null}});vignette(c,0.45);};
// 1 · "But one day, he was forced to retreat from a battlefield..." Napoleon flees across the field, hat in hand
SH.retreat=function(c,t){LIT('#ffc890','#2a1a20');const q=inv(A(1),A(2),t);field(c,t,{x:540,y:1080,z:1.0,mm:50},{sky:'dawn',world:(c2,GY)=>{
  const x=lerp(220,760,eo(q));NAP({c:c2,x,y:GY+640,s:2.4,f:1,t,run:1,ph:t*12,view:'side',eyes:'wide',brow:'worried',mouth:'o',sweat:1});
  for(let i=0;i<6;i++){const p=((t*2+i/6)%1);c2.fillStyle=`rgba(200,180,150,${0.5*(1-p)})`;c2.beginPath();c2.arc(x-120-p*160,GY+630-p*40,20+p*40,0,TAU);c2.fill();}}});FX.speed=0.6;FX.speedDir=0;vignette(c,0.45);};
// 2 · "because of a thousand rabbits." over the hill: a flood of rabbits, a counter rolls to 1,000
SH.reveal=function(c,t){LIT();const t0=A(2);field(c,t,{x:540,y:1080,z:pushZ(t,t0,B(2)+0.6,1.0,1.1),mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  const k=eo(clamp((t-t0)/1.4));swarm(c2,t,{n:70,x0:-150,x1:1230,y0:GY+40,y1:GY+40+k*1000,s0:0.5,s1:1.7,pose:'front',spd:10,seed:1});}});
  const v=Math.round(eo(clamp((t-TW('thousand')+0.2)/0.9))*1000);if(t>TW('thousand')-0.2){c.save();c.translate(540,560);c.fillStyle='rgba(10,8,14,0.85)';c.beginPath();c.roundRect(-250,-90,500,180,30);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.stroke();txt(c,v.toLocaleString('en-US'),0,4,120,'#fff',{sw:14});c.restore();}
  vignette(c,0.4);};
// 3 · "Give me 60 seconds…bullied by fluffy little animals." a rabbit sits on Napoleon's hat; he glares
SH.bullied=function(c,t){LIT();field(c,t,{x:540,y:1150,z:pushZ(t,A(3),B(3),1.05,1.15),mm:85},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  const r=NAP({c:c2,x:640,y:GY+900,s:3.0,f:1,t,eyes:t>TW('bullied')?'squeeze':'half',brow:'angry',mouth:'flat',hf:[10,92],hb:[-10,92]});
  const hx=640,hy=GY+900-3.0*300;rabbit(c2,hx-10,hy+40,1.1,{pose:'front',t,col:'white',seed:3});
  for(let i=0;i<5;i++)rabbit(c2,180+i*70+(i%2)*20,GY+880+(i%2)*40,0.9,{pose:i%2?'sit':'front',f:i%2?1:-1,t,seed:i+5,col:['grey','white','spot','brown','white'][i]});}});vignette(c,0.4);};
// 4 · "It was 1807."
SH.year=function(c,t){field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'sun',troops:0,smoke:0,world:()=>{}});ink(c,0.35);card(c,t,A(4),'THE YEAR','1807',GOLD_C,1000,150);vignette(c,0.5);};
// 5 · "Napoleon had just celebrated a major diplomatic victory…" the Tilsit raft: Napoleon and the Tsar shake hands; then Berthier
SH.tilsit=function(c,t){LIT('#ffe0a8','#2a3a4a');river(c,t,{x:540,y:1080,z:pushZ(t,A(5),TW('chief')-0.1,1.0,1.08),mm:50},{pyr:0,sunX:780,GY:1150,world:(c2,GY)=>{raft(c2,540,GY+260,1.15,t);
  const shk=Math.sin(t*10)*4;NAP({c:c2,x:420,y:GY+230,s:1.6,f:1,t,eyes:'happy',brow:'up',mouth:'grin',hf:[46,40+shk],hb:[-10,92],seed:1});
  fig2(c2,{kind:'tsar',view:'front',x:660,y:GY+230,s:1.6,f:-1,t,eyes:'happy',brow:'flat',mouth:'smile',hf:[46,40-shk],hb:[-10,92],seed:2});}});
  statTag(c,540,640,'TREATY OF TILSIT',GOLD_C,clamp((t-TW('diplomatic'))/0.3));vignette(c,0.4);};
SH.berthier=function(c,t){LIT('#ffd8a8','#2a2018');salon(c,t,{x:540,y:1150,z:pushZ(t,TW('chief')-0.1,A(6),1.0,1.08),mm:50},{world:(c2,GY)=>{
  const idea=t>TW('organize');BERT({c:c2,x:540,y:GY+700,s:2.7,f:1,t,eyes:idea?'happy':'dot',brow:'up',mouth:idea?'grin':'smile',hf:idea?[40,-60]:[10,92],hb:[-10,92]});}});
  popup(c,t,TW('alexandre'),'ALEXANDRE BERTHIER','CHIEF OF STAFF',GOLD_C,{y:640});
  if(t>TW('special')-0.1){const k=back(clamp((t-TW('special')+0.1)/0.35));c.save();c.translate(780,560);c.scale(k,k);c.fillStyle='#ffe066';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(0,0,46,0,TAU);c.fill();c.stroke();c.fillStyle='#c8ccd4';c.fillRect(-18,40,36,26);c.strokeRect(-18,40,36,26);c.restore();}
  vignette(c,0.4);};
// 6 · "A rabbit hunt." hunting horn sounds, muskets ready, a rabbit pops up in the grass
SH.hunt=function(c,t){LIT();field(c,t,{x:540,y:1100,z:pushZ(t,A(6),A(7),1.05,1.12),mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  NAP({c:c2,x:380,y:GY+700,s:2.4,f:1,t,eyes:'happy',brow:'up',mouth:'smirk',propF:mUp(),hf:[24,60],hb:[-10,92]});
  BERT({c:c2,x:760,y:GY+640,s:2.2,f:-1,t,eyes:'happy',brow:'up',mouth:'grin',hf:[10,92],hb:[-10,92]});
  const k=back(clamp((t-TW('hunt')+0.05)/0.3));if(k>0)rabbit(c2,600,GY+820,0.9*k,{pose:'sit',f:-1,t,col:'brown',seed:2});}});vignette(c,0.4);};
// 7 · "He ordered around 1,000 rabbits to be brought to a nearby hunting ground." carts of cages roll in, stacks of cages
SH.cages=function(c,t){LIT();const q=inv(A(7),B(7),t);field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  for(let r=0;r<3;r++)for(let i=0;i<6;i++){const k=clamp(q*3-(r*6+i)*0.14);if(k<=0)continue;cage(c2,110+i*170+(r%2)*60,GY+260+r*220-(1-eo(k))*400,0.9+r*0.15,0);}}});
  const v=Math.round(eo(clamp((t-TW('1,000')+0.1)/1.0))*1000);if(t>TW('1,000')-0.1){c.save();c.translate(540,620);c.fillStyle='rgba(10,8,14,0.85)';c.beginPath();c.roundRect(-260,-80,520,160,28);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.stroke();txt(c,'~'+v.toLocaleString('en-US'),0,0,96,'#fff',{sw:12});c.restore();}vignette(c,0.4);};
// 8 · "Sounds simple, right?" Napoleon smug with his musket
SH.simple=function(c,t){LIT();field(c,t,{x:540,y:1150,z:1.1,mm:85},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{NAP({c:c2,x:540,y:GY+900,s:3.0,f:1,t,eyes:'half',brow:'flat',mouth:'smirk',propF:mUp(),hf:[24,60],hb:[-10,92]});}});
  bigCheck(c,820,620,60,clamp((t-TW('right')+0.1)/0.3));vignette(c,0.4);};
// 9 · "Well, Berthier made one tiny mistake." Berthier sweats; one tiny red mark
SH.mistake=function(c,t){LIT('#ffd8a8','#2a2018');salon(c,t,{x:540,y:1150,z:1.08,mm:85},{world:(c2,GY)=>{BERT({c:c2,x:540,y:GY+760,s:3.0,f:1,t,eyes:'wide',brow:'worried',mouth:'wobble',sweat:1,hf:[10,92],hb:[-10,92]});}});
  const k=back(clamp((t-TW('mistake')+0.05)/0.3));if(k>0){c.save();c.translate(820,600);c.scale(k*0.6,k*0.6);bigX(c,0,0,60,1);c.restore();}vignette(c,0.4);};
// 10 · "He bought domesticated rabbits instead of wild ones." tame (wanted wild): side by side
SH.tame=function(c,t){c.fillStyle='#101420';c.fillRect(0,0,W,H);const t0=A(10);
  const k1=back(clamp((t-TW('domesticated')+0.1)/0.35)),k2=back(clamp((t-TW('wild')+0.1)/0.35));
  if(k1>0){c.save();c.translate(300,1250);c.scale(k1,k1);c.fillStyle='rgba(255,200,120,0.12)';c.beginPath();c.arc(0,-120,240,0,TAU);c.fill();rabbit(c,0,60,2.0,{pose:'front',t,col:'white',seed:1});c.restore();statTag(c,300,700,'TAME',GOLD_C,k1);}
  if(k2>0){c.save();c.translate(790,1250);c.scale(k2,k2);c.fillStyle='rgba(120,200,120,0.12)';c.beginPath();c.arc(0,-120,240,0,TAU);c.fill();rabbit(c,0,60,2.0,{pose:'sit',f:-1,t,col:'brown',seed:2});c.restore();statTag(c,790,700,'WILD',GRN_C,k2);}
  if(t>TW('wild')+0.3)bigX(c,790,1050,90,clamp((t-TW('wild')-0.3)/0.3)*0.9);vignette(c,0.5);};
// 11 · "And when the cages opened, Napoleon expected the rabbits to run away." soldiers lift the doors; Napoleon aims, confident
SH.open=function(c,t){LIT();const to=TW('opened');field(c,t,{x:540,y:1100,z:1.0,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  for(let i=0;i<4;i++){cage(c2,170+i*240,GY+330,1.0,eo(clamp((t-to+0.2-i*0.08)/0.5)));}
  fig2(c2,{kind:'french',view:'front',x:120,y:GY+380,s:1.3,f:1,t,seed:3,hf:[40,40],hb:[-10,92]});
  NAP({c:c2,x:600,y:GY+820,s:2.6,f:1,t,eyes:'focus',brow:'flat',mouth:'smirk',propF:mCharge(),hf:[44,40],hb:[-10,92]});
  if(t>to)for(let i=0;i<4;i++){const p=clamp((t-to-0.3-i*0.1)/1.5);rabbit(c2,170+i*240+p*0,GY+330+p*30,0.7,{pose:'sit',f:i%2?1:-1,t,seed:i,col:['white','grey','spot','white'][i]});}}});
  if(t>TW('run')-0.1){const k=clamp((t-TW('run')+0.1)/0.4);c.save();c.globalAlpha=k;c.translate(540,600);c.strokeStyle=GRN_C;c.lineWidth=14;c.lineCap='round';for(const d of [-1,1]){c.beginPath();c.moveTo(0,0);c.lineTo(d*260,-60);c.stroke();c.beginPath();c.moveTo(d*260,-60);c.lineTo(d*210,-100);c.moveTo(d*260,-60);c.lineTo(d*220,-10);c.stroke();}c.restore();}vignette(c,0.4);};
// 12 · "But they did the exact opposite." the arrows flip around and point at him
SH.opposite=function(c,t){LIT();field(c,t,{x:540,y:1100,z:1.05,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{swarm(c2,t,{n:24,x0:80,x1:1000,y0:GY+300,y1:GY+500,s0:0.6,s1:0.9,pose:'front',spd:0.0001,seed:4});NAP({c:c2,x:540,y:GY+900,s:2.6,f:1,t,back:true,hf:[44,40],hb:[-10,92]});}});
  const k=eo(clamp((t-TW('opposite')+0.3)/0.5));c.save();c.translate(540,720);c.strokeStyle=RED_C;c.lineWidth=14;c.lineCap='round';for(const d of [-1,1]){const a=lerp(-0.25,Math.PI*0.5,k);c.save();c.rotate(d*a);c.beginPath();c.moveTo(0,0);c.lineTo(0,-200);c.moveTo(0,-200);c.lineTo(-40,-150);c.moveTo(0,-200);c.lineTo(40,-150);c.stroke();c.restore();}c.restore();vignette(c,0.4);};
// 13 · "Instead of escaping, the rabbits charged straight toward him." the stampede, Napoleon's face
SH.charge=function(c,t){LIT();const t0=A(13);field(c,t,{x:540,y:1100,z:pushZ(t,t0,B(13),1.0,1.12),mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  const q=clamp((t-t0)/2.8);swarm(c2,t,{n:60,x0:-100,x1:1180,y0:GY+80,y1:GY+500,s0:0.6,s1:1.0,pose:'front',spd:12,seed:7,flow:(x,y,i,tt)=>({x:lerp(x,540+(x-540)*0.5,q),y:y+q*(500+hash(i)*300)})});
  NAP({c:c2,x:540,y:GY+1100,s:3.2,f:1,t,eyes:'shock',brow:'up',mouth:'shout',hf:[10,92],hb:[-10,92]});}});FX.speed=0.5;vignette(c,0.4);};
// 14 · "Why?" freeze, a big question mark
SH.why=function(c,t){LIT();field(c,t,{x:540,y:1100,z:1.12,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{swarm(c2,0,{n:20,x0:100,x1:980,y0:GY+400,y1:GY+700,s0:0.8,s1:1.0,pose:'front',spd:0.0001,seed:7});}});ink(c,0.45);bigQ(c,540,900,back(clamp((t-A(14))/0.35))*1.2,t);vignette(c,0.5);};
// 15 · "Because these weren't wild animals." a close-up: big-eyed tame bunny
SH.cute=function(c,t){LIT();field(c,t,{x:540,y:1150,z:1.2,mm:135},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{rabbit(c2,540,GY+640,4.2,{pose:'front',t,col:'white',seed:9});}});statTag(c,540,640,'TAME',GOLD_C,clamp((t-TW('wild',1)+0.1)/0.3));vignette(c,0.45);};
// 16 · "They were used to being fed by humans." a keeper hands out carrots; rabbits crowd his boots (warm flashback)
SH.fed=function(c,t){LIT('#ffe8c0','#5a4030');field(c,t,{x:540,y:1100,z:1.08,mm:50},{sky:'sun',troops:0,smoke:0,farm:1,world:(c2,GY)=>{
  const r=fig2(c2,{kind:'keeper',view:'front',x:540,y:GY+760,s:2.5,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[50,30+Math.sin(t*4)*6],hb:[-10,92]});carrot(c2,r.hf.x+10,r.hf.y-10,1.4);
  for(let i=0;i<7;i++){const a=i/7*Math.PI;rabbit(c2,540+Math.cos(a)*300,GY+800+Math.sin(a)*120,1.0,{pose:i%2?'eat':'front',f:Math.cos(a)>0?-1:1,t,seed:i,col:['white','grey','spot','brown'][i%4]});}}});
  c.fillStyle='rgba(255,200,120,0.12)';c.fillRect(0,0,W,H);vignette(c,0.5);};
// 17 · "…mistaken Napoleon for the guy delivering lunch." rabbits all around him, each dreaming of carrots
SH.lunch=function(c,t){LIT();field(c,t,{x:540,y:1100,z:pushZ(t,A(17),B(17),1.0,1.08),mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  NAP({c:c2,x:540,y:GY+760,s:2.5,f:1,t,eyes:'wide',brow:'worried',mouth:'o',hf:[10,92],hb:[-10,92]});
  const R=[];for(let i=0;i<10;i++){const a=Math.PI*0.05+i/9*Math.PI*0.9;R.push([540+Math.cos(a)*380,GY+720+Math.sin(a)*240,i]);}R.sort((a,b)=>a[1]-b[1]).forEach(([x,y,i])=>{const h=rabbit(c2,x,y,1.05,{pose:'front',t,seed:i,col:['white','grey','spot','brown','white'][i%5]});
    if(t>TW('lunch')-0.6&&i%3===0){const k=back(clamp((t-TW('lunch')+0.6-i*0.05)/0.3));c2.save();c2.translate(h.head.x,h.head.y-120);c2.scale(k,k);c2.fillStyle='#fff';c2.strokeStyle=K2;c2.lineWidth=4;c2.beginPath();c2.ellipse(0,0,52,40,0,0,TAU);c2.fill();c2.stroke();carrot(c2,-4,-26,0.55);c2.restore();}});}});vignette(c,0.4);};
// 18 · "His men tried chasing them away with sticks and whips." soldiers swing; rabbits hop around them
SH.sticks=function(c,t){LIT();field(c,t,{x:540,y:1100,z:1.0,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
  swarm(c2,t,{n:30,x0:-50,x1:1130,y0:GY+200,y1:GY+900,s0:0.7,s1:1.1,pose:'hop',spd:10,seed:11,f:1});
  const sw=Math.sin(t*9);fig2(c2,{kind:'french',view:'front',x:300,y:GY+700,s:2.2,f:1,t,seed:1,eyes:'squeeze',brow:'angry',mouth:'shout',propF:stickProp(160,-0.6+sw*0.7),hf:[50,-20],hb:[-10,92]});
  fig2(c2,{kind:'french',view:'front',x:800,y:GY+760,s:2.2,f:-1,t,seed:2,eyes:'squeeze',brow:'angry',mouth:'shout',propF:whipProp(-0.4+Math.cos(t*8)*0.5,t),hf:[50,-20],hb:[-10,92]});}});vignette(c,0.4);};
// 19 · "But the rabbits kept coming." an endless stream over the rise
SH.kept=function(c,t){LIT();field(c,t,{x:540,y:1080,z:1.0,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{swarm(c2,t,{n:80,x0:-200,x1:1280,y0:GY+20,y1:GY+1100,s0:0.4,s1:1.4,pose:'front',spd:11,seed:13,flow:(x,y,i,tt)=>({x,y:GY+20+((y-GY-20+tt*260)%1080)})});}});vignette(c,0.4);};
// 20 · "They surrounded the hunters, swarmed around Napoleon's legs, and even followed him toward his carriage."
SH.swarmed=function(c,t){LIT();const tl=TW('swarmed'),tc=TW('followed');if(t<tc-0.05){field(c,t,{x:540,y:1200,z:t<tl?1.0:1.25,mm:t<tl?50:85},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{
    NAP({c:c2,x:540,y:GY+800,s:2.6,f:1,t,eyes:'shock',brow:'up',mouth:'shout',hf:[10,92],hb:[-10,92]});
    const R=[];for(let i=0;i<16;i++){const a=i/16*TAU+t*0.6;R.push([540+Math.cos(a)*(150+(i%3)*60),GY+800+Math.sin(a)*70,i]);}R.sort((a,b)=>a[1]-b[1]).forEach(([x,y,i])=>rabbit(c2,x,y,0.9,{pose:'hop',f:Math.sin(i/16*TAU+t*0.6)>0?-1:1,t,seed:i,col:['white','grey','spot','brown'][i%4]}));}});vignette(c,0.4);return;}
  field(c,t,{x:540,y:1100,z:1.0,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const q=inv(tc,B(20)+0.4,t);carriage(c2,880,GY+560,0.85,t,{f:1});
    const x=lerp(220,640,q);NAP({c:c2,x,y:GY+640,s:2.0,f:1,t,walk:1,ph:t*9,view:'side',eyes:'squeeze',brow:'angry',mouth:'flat',hf:[10,92],hb:[-10,92]});
    for(let i=0;i<14;i++)rabbit(c2,x-160-i*60-(i%2)*20,GY+620+(i%3)*30,0.75,{pose:'hop',f:1,t,seed:i,col:['white','grey','spot','brown'][i%4]});}});vignette(c,0.4);};
// 21 · "Eventually, the emperor had enough." steam out of his ears
SH.enough=function(c,t){LIT('#ffb080','#3a1a10');field(c,t,{x:540,y:1150,z:1.1,mm:85},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{NAP({c:c2,x:540,y:GY+900,s:3.0,f:1,t,eyes:'squeeze',brow:'angry',mouth:'grit',hf:[10,92],hb:[-10,92]});
  for(let i=0;i<8;i++){const p=((t*1.5+i/8)%1);for(const d of [-1,1]){c2.fillStyle=`rgba(240,240,240,${0.6*(1-p)})`;c2.beginPath();c2.arc(540+d*(260+p*110),GY+900-3.0*300-p*240,14+p*30,0,TAU);c2.fill();}}}});c.fillStyle='rgba(255,60,40,0.12)';c.fillRect(0,0,W,H);vignette(c,0.45);};
// 22 · "The man who had faced entire European armies was retreating from a bunch of hungry bunnies." the carriage speeds off, bunnies chasing
SH.flee=function(c,t){LIT();const t0=A(22);const tb=TW('retreating');if(t<tb-0.1){c.fillStyle='#0c0e16';c.fillRect(0,0,W,H);const k=clamp((t-t0)/0.8);
    for(const [i,kind] of [[0,'british'],[1,'russian'],[2,'prussian'],[3,'austrian']]){const kk=back(clamp(k*4-i*0.6));if(kk<=0)continue;fig2(c,{kind,view:'front',x:180+i*240,y:1500,s:1.6*kk,f:1,t,seed:i,eyes:'angry'?'focus':'dot',brow:'angry',mouth:'grit',propF:mUp(),hf:[24,60],hb:[-10,92]});}
    statTag(c,540,700,'ENTIRE ARMIES',RED_C,k);vignette(c,0.5);return;}
  field(c,t,{x:540,y:1080,z:1.0,mm:35},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{const q=inv(tb,B(22),t);const cx=lerp(620,860,eo(q));const w=carriage(c2,cx,GY+420,1.2,t,{f:1,moving:1});
    c2.save();c2.beginPath();c2.rect(w.win.x-45,w.win.y-35,90,70);c2.clip();NAP({c:c2,x:w.win.x,y:w.win.y+230,s:0.9,f:-1,t,eyes:'wide',brow:'worried',mouth:'o',hf:[10,92],hb:[-10,92]});c2.restore();
    for(let i=0;i<22;i++)rabbit(c2,cx-230-(i%11)*55-(i%3)*15,GY+440+(i%4)*40+(i>10?70:0),0.9+(i%4)*0.1,{pose:'hop',f:1,t,seed:i,spd:13,col:['white','grey','spot','brown'][i%4]});}});FX.speed=0.5;vignette(c,0.4);};
// 23 · "Now, there's a catch:" record-scratch freeze: the frame goes sepia and stops
SH.catch=function(c,t){const tf=A(23);SH.flee(c,Math.min(t,tf));c.save();c.globalCompositeOperation='color';c.fillStyle='rgba(160,120,70,0.9)';c.fillRect(0,0,W,H);c.restore();ink(c,0.25);
  const k=back(clamp((t-tf)/0.3));c.save();c.translate(540,900);c.scale(k,k);c.fillStyle='#ffd04a';c.strokeStyle=K2;c.lineWidth=8;c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?60:130;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.stroke();txt(c,'!',0,6,110,K2,{stroke:false});c.restore();vignette(c,0.5);};
// 24 · "this story comes mainly from a general's memoirs published decades later," the old general writes his memoirs by candle
SH.memoirs=function(c,t){LIT('#ffc070','#2a1a10');salon(c,t,{x:540,y:1150,z:1.05,mm:50},{night:1,world:(c2,GY)=>{fig2(c2,{kind:'memoir',view:'front',x:540,y:GY+520,s:2.2,f:1,t,eyes:'focus',brow:'flat',mouth:'flat',old:1,hf:[40,50],hb:[-10,92],look:[0,6]});
  c2.fillStyle='#5a3a22';c2.strokeStyle=K2;c2.lineWidth=6;c2.fillRect(200,GY+620,680,60);c2.strokeRect(200,GY+620,680,60);c2.fillStyle='#4a2e18';c2.fillRect(220,GY+680,640,300);c2.strokeRect(220,GY+680,640,300);memoirsBook(c2,540,GY+640,0.8,t,{title:1,quill:1});}});c.fillStyle='rgba(255,170,80,0.12)';c.fillRect(0,0,W,H);
  if(t>TW('decades')-0.1){const k=back(clamp((t-TW('decades')+0.1)/0.3));c.save();c.translate(540,620);c.scale(k,k);c.fillStyle='rgba(10,8,14,0.85)';c.beginPath();c.roundRect(-300,-70,600,140,24);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=5;c.stroke();txt(c,'DECADES LATER',0,0,64,'#fff',{sw:10,ls:4});c.restore();}vignette(c,0.5);};
// 25 · "so historians can't confirm every detail." a magnifier over the page, question marks
SH.confirm=function(c,t){c.fillStyle='#120c08';c.fillRect(0,0,W,H);memoirsBook(c,540,1050,1.9,t,{title:1});const mx=lerp(340,740,eo(inv(A(25),B(25),t))),my=1000+Math.sin(t*2)*60;c.strokeStyle=K2;c.lineWidth=16;c.beginPath();c.arc(mx,my,150,0,TAU);c.stroke();c.strokeStyle='#c8a868';c.lineWidth=8;c.stroke();c.strokeStyle=K2;c.lineWidth=40;c.lineCap='round';seg(c,mx+110,my+110,mx+260,my+260);c.strokeStyle='#5a3a22';c.lineWidth=26;seg(c,mx+110,my+110,mx+260,my+260);
  for(let i=0;i<3;i++){const k=back(clamp((t-A(25)-0.3-i*0.25)/0.3));if(k>0){c.save();c.translate(220+i*320,640+(i%2)*60);c.scale(k*0.55,k*0.55);bigQ(c,0,0,1,t);c.restore();}}vignette(c,0.5);};
// 26 · "But if it happened anything like the account describes," the charge again, like an old film
SH.account=function(c,t){SH.charge(c,A(13)+1.6+(t-A(26))*0.6);c.save();c.globalCompositeOperation='color';c.fillStyle='rgba(170,130,80,0.85)';c.fillRect(0,0,W,H);c.restore();
  c.fillStyle='rgba(40,30,20,0.15)';for(let i=0;i<5;i++){const x=hash(i+Math.floor(t*12))*W;c.fillRect(x,0,3,H);}ink(c,0.15);vignette(c,0.6);};
// 27 · "Napoleon's most embarrassing opponent wasn't Britain, Russia, or Austria." three enemies, each crossed out as named
SH.opponents=function(c,t){c.fillStyle='#0c0e16';c.fillRect(0,0,W,H);LIT('#ffe0a8','#2a2a3a');const E=[['british','britain'],['russian','russia'],['austrian','austria']];
  E.forEach(([kind,w],i)=>{const x=200+i*340;fig2(c,{kind,view:'front',x,y:1520,s:1.9,f:1,t,seed:i,eyes:'focus',brow:'angry',mouth:'grit',propF:mUp(),hf:[24,60],hb:[-10,92]});const k=clamp((t-TW(w)+0.05)/0.3);if(k>0)bigX(c,x,1180,110,k);});
  statTag(c,540,700,'MOST EMBARRASSING OPPONENT',GOLD_C,clamp((t-A(27))/0.3));vignette(c,0.5);};
// 28 · "It was lunch." one small bunny munching a carrot, victorious; Napoleon's hat lies beside it
SH.lunchEnd=function(c,t){LIT();field(c,t,{x:540,y:1150,z:pushZ(t,A(28),END,1.1,1.25),mm:135},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{
  rabbit(c2,800,GY+560,3.4,{pose:'eat',f:-1,t,col:'white',seed:4});c2.save();c2.translate(640,GY+550);c2.rotate(-0.2);hat2b(c2,'bicorne',3.0,1,60,t);c2.restore();}});
  const f=clamp((t-(END-1.8))/1.7);vignette(c,0.45);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
var SHOTS=[[0,'hook'],[TW('nearly')-0.1,'europe'],[A(1)-0.05,'retreat'],[A(2)-0.05,'reveal'],[A(3)-0.05,'bullied'],[A(4)-0.05,'year'],[A(5)-0.05,'tilsit'],[TW('chief')-0.1,'berthier'],[A(6)-0.05,'hunt'],[A(7)-0.05,'cages'],[A(8)-0.05,'simple'],[A(9)-0.05,'mistake'],[A(10)-0.05,'tame'],
  [A(11)-0.05,'open'],[A(12)-0.05,'opposite'],[A(13)-0.05,'charge'],[A(14)-0.05,'why'],[A(15)-0.05,'cute'],[A(16)-0.05,'fed'],[A(17)-0.05,'lunch'],[A(18)-0.05,'sticks'],[A(19)-0.05,'kept'],[A(20)-0.05,'swarmed'],[A(21)-0.05,'enough'],[A(22)-0.05,'flee'],[A(23)-0.05,'catch'],[A(24)-0.05,'memoirs'],[A(25)-0.05,'confirm'],[A(26)-0.05,'account'],[A(27)-0.05,'opponents'],[A(28)-0.05,'lunchEnd']];
var IMPACTS=[[A(2)+0.2,6,0.3],[A(13)+0.1,10,0.5],[A(21),8,0.3,'#ff9a70',0.2],[A(23),12,0.3,'#ffffff',0.4]];
{const TS=TW('60'),TE=L[L.length-1].b;const src=timer.toString().replace(/T_SLAM/g,'TS').replace(/T_END/g,'TE').replace(/^function timer/,'function');timer=eval('('+src+')');}
