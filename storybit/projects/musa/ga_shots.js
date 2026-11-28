// ===== GHOST ARMY · shots =====
SH={};
const HC=(y,s)=>y-247*s; // head centre of a standing figure
function binoFront(c,x,y,sc){c.save();c.translate(x,y);c.scale(sc,sc);c.strokeStyle=K2;c.lineWidth=5;for(const sx of [-34,34]){const g=c.createLinearGradient(sx-28,0,sx+28,0);g.addColorStop(0,'#1a1a1a');g.addColorStop(0.5,'#4a4a44');g.addColorStop(1,'#141414');c.fillStyle=g;rr(c,sx-28,-34,56,70,12);c.fill();c.stroke();c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(sx,-34,26,10,0,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(160,200,255,0.5)';c.beginPath();c.ellipse(sx-6,-36,9,4,0,0,TAU);c.fill();}
  c.fillStyle='#2a2a26';c.fillRect(-8,-20,16,30);c.strokeRect(-8,-20,16,30);for(const sx of [-1,1]){c.fillStyle='#ecebe6';c.beginPath();c.ellipse(sx*70,16,26,34,sx*0.3,0,TAU);c.fill();c.stroke();}c.restore();}
function headphones(c,x,y,R){c.save();c.strokeStyle='#2a2a26';c.lineWidth=R*0.14;c.beginPath();c.arc(x,y,R*1.08,Math.PI*1.08,Math.PI*1.92);c.stroke();c.fillStyle='#1a1a1a';c.strokeStyle=K2;c.lineWidth=R*0.06;for(const sx of [-1,1]){c.beginPath();c.ellipse(x+sx*R*1.02,y,R*0.22,R*0.32,0,0,TAU);c.fill();c.stroke();}c.restore();}
const GERW=o=>fig2(o.c,{kind:'ger1',...o});
// ---------- 0 · HOOK: a German officer at dawn watches an army in the valley ----------
SH.hook=function(c,t){const q=inv(0,A(1),t);L2={dx:1,rim:'#ffb070',amb:'#4a3a50'};const z=lerp(1,1.18,eio(q));const cam=scam(lerp(-100,40,q),0.62*z,1250);
  farmland(c,t,cam,{mood:'dawn',sun:[150,1000],mistY:1320,camp:1,village:900,world:c2=>{const ns=[];for(let r=0;r<3;r++)for(let k=0;k<6;k++)ns.push([-1500+k*560+r*200,GY+60+r*190,0.9+r*0.12,r*6+k]);
    for(const [x,y,s,i] of ns){if(i%4===3)howitzer(c2,x,y,110*s,{f:1});else sherman(c2,x,y,120*s,{t,num:String(1+i%9)});}}});
  // the officer, over-the-shoulder on a ridge
  c.fillStyle='#2a2418';c.beginPath();c.moveTo(-50,1700);c.quadraticCurveTo(400,1580,700,1700);c.lineTo(700,H);c.lineTo(-50,H);c.fill();fgGrass(c,t,1660,40,'#1e2a14',140);
  fig2(c,{x:260,y:2650,s:4.6,f:1,t,kind:'gerOff',back:1});vignette(c,0.55);};
// ---------- 1 · …most of them don't exist (two GIs lift a 30-ton "tank") ----------
SH.lift=function(c,t){const q=inv(A(1),A(2),t),up=eio(inv(WT(1,7),WT(1,9),t));L2={dx:1,rim:'#ffb070',amb:'#4a4058'};
  farmland(c,t,scam(0,1.25,1350),{mood:'dawn',sun:[120,1050],mistY:1360,world:c2=>{tent(c2,-650,GY-40,0.8);
    const lift=up*150;c2.save();c2.translate(60,-lift);sherman(c2,60,GY+150,150,{fake:1,t,wob:0.6+up*1.2});c2.restore();
    fig2(c2,{x:-290,y:GY+170,s:1.6,f:1,t,kind:'gi1',view:'side',eyes:up>0.5?'happy':'open',mouth:up>0.5?'smile':'flat',hf:up>0?[lerp(14,85,up),lerp(92,-70,up)]:undefined,hb:up>0?[lerp(-10,75,up),lerp(94,-80,up)]:undefined});
    fig2(c2,{x:420,y:GY+175,s:1.6,f:-1,t,kind:'gi2',view:'side',eyes:'open',mouth:up>0.5?'smile':'flat',hf:up>0?[lerp(-14,-85,up),lerp(92,-70,up)]:undefined,hb:up>0?[lerp(10,-75,up),lerp(94,-80,up)]:undefined});
    if(up<0.1)tethers(c2,60,GY+150,150);}});
  if(t>WT(1,8))chip(c,WT(1,8),t,'RUBBER',740,520,'#ffb020',{size:50});fgGrass(c,t,1960,50,'#2a3a1c',180);vignette(c,0.45);};
// ---------- 2 · through the binoculars; then pump + radio ----------
SH.bino=function(c,t){const q=inv(A(2),WT(2,18),t);L2={dx:1,rim:'#ffb070',amb:'#4a4058'};
  if(t<WT(2,8)){ // front: the officer raises binoculars
    farmland(c,t,scam(-400,1.6,1100),{mood:'dawn',sun:[900,900]});c.save();dof(c,3,d=>{});c.restore();
    fig2(c,{x:540,y:2700,s:5.6,f:1,t,kind:'gerOff',view:'front',eyes:'half',brow:'angry',mouth:'flat',hf:[60,-10],hb:[-60,-10]});const k=eio(inv(A(2),A(2)+0.6,t));binoFront(c,540,HC(2700,5.6)+lerp(300,-10,k),2.0);vignette(c,0.5);}
  else{ // POV through the lenses
    const z=lerp(1.6,2.2,eio(inv(WT(2,8),WT(2,18),t)));c.fillStyle='#000';c.fillRect(0,0,W,H);c.save();c.beginPath();c.arc(540-230,960,420,0,TAU);c.moveTo(540+230+420,960);c.arc(540+230,960,420,0,TAU);c.clip();farmland(c,t,scam(0,z,1250),{mood:'dawn',sun:[150,1000],world:c2=>{sherman(c2,-60,GY+120,130,{t,num:'7'});sherman(c2,500,GY+40,110,{fake:1,t,wob:0.3});howitzer(c2,-700,GY+60,110,{});}});c.restore();c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=3;c.beginPath();c.moveTo(500,960);c.lineTo(580,960);c.moveTo(540,920);c.lineTo(540,1000);c.stroke();c.fillStyle='rgba(120,200,160,0.06)';c.fillRect(0,0,W,H);}
  };
SH.tools=function(c,t){L2={dx:-1,rim:'#ffd8a0',amb:'#3a3a28'};const radio=t>WT(2,21);
  if(!radio){farmland(c,t,scam(0,2.4,1500),{mood:'day',world:c2=>{const inf=clamp(inv(WT(2,18)-0.2,WT(2,21),t));sherman(c2,60,GY+100,170,{fake:1,infl:0.15+inf*0.85,t,wob:0.5});}});
    // pump close-up in the foreground: boot on a foot pump, hose to the dummy
    const pk=Math.abs(Math.sin(t*9));c.fillStyle='#3a3a2a';c.strokeStyle=K2;c.lineWidth=6;rr(c,240,1700,240,60,10);c.fill();c.stroke();c.save();c.translate(260,1700);c.rotate(-0.25-pk*0.2);c.fillStyle='#4a4a3a';rr(c,0,-30,220,30,8);c.fill();c.stroke();c.restore();
    c.strokeStyle='#1a1a1a';c.lineWidth=16;c.beginPath();c.moveTo(470,1730);c.bezierCurveTo(700,1760,760,1500,700,1380);c.stroke();
    c.fillStyle='#2a2618';c.strokeStyle=K2;c.lineWidth=6;rr(c,250,1560-pk*50,190,90,30);c.fill();c.stroke();c.fillStyle='#4a4630';c.fillRect(250,1440-pk*50,190,130);c.strokeRect(250,1440-pk*50,190,130);
    fgGrass(c,t,1960,40,'#2a4a1c',150);}
  else{tentInterior(c,t);c.fillStyle='#5a4228';c.strokeStyle=K2;c.lineWidth=7;c.fillRect(-20,1200,W+40,700);c.strokeRect(-20,1200,W+40,40);radioSet(c,560,1030,1.1,t,1);const pr=Math.sin(t*22)>0.2;morseKey(c,520,1470,1.4,pr);hand(c,780,pr?1430:1405,1.25,-0.35,{sleeve:'#5e5a3a'});}
  vignette(c,0.45);};
// ---------- 3 · the dossier: "THE GHOST ARMY" stamp ----------
SH.dossier=function(c,t){const q=inv(A(3),A(4),t);c.fillStyle='#3a2a1a';c.fillRect(0,0,W,H);for(let i=0;i<14;i++){c.fillStyle='rgba(0,0,0,0.18)';c.fillRect(0,i*140+hash(i)*20,W,5);}
  lampPool(c,620,700,1100,'255,210,140',0.5);const z=lerp(1.05,1.18,eio(q));c.save();c.translate(540,950);c.scale(z,z);c.rotate(-0.04);
  c.fillStyle='#c8a868';c.strokeStyle=K2;c.lineWidth=7;rr(c,-420,-560,840,1120,10);c.fill();c.stroke();c.fillStyle='#b89858';c.fillRect(-420,-600,300,60);c.strokeRect(-420,-600,300,60);
  c.fillStyle='#f4efe2';c.fillRect(-380,-500,760,1000);c.strokeRect(-380,-500,760,1000);txt(c,'WAR DEPARTMENT',0,-420,40,'#1a1a1a',{stroke:false,ls:6,w:800});c.fillStyle='#1a1a1a';c.fillRect(-300,-385,600,4);
  txt(c,'23rd HEADQUARTERS',0,-300,50,'#1a1a1a',{stroke:false,w:900});txt(c,'SPECIAL TROOPS',0,-235,50,'#1a1a1a',{stroke:false,w:900});
  for(let i=0;i<8;i++){c.fillStyle=i%3===1?'#1a1a1a':'rgba(40,40,40,0.5)';c.fillRect(-320,-150+i*48,i%3===1?260:600-hash(i)*200,14);}
  stampMark(c,A(3)+0.4,t,'TOP SECRET',150,-140,'#c8201a',-0.18,58);stampMark(c,WT(3,13),t,'THE GHOST ARMY',0,330,'#c8201a',-0.08,72);c.restore();
  // stamping hand
  const sp=t-WT(3,13);if(sp>-0.6&&sp<0.8){const y=sp<0?lerp(700,1250,clamp((sp+0.6)/0.6)):lerp(1250,600,clamp(sp/0.5));c.save();c.translate(560,y);c.fillStyle='#6a4a2a';c.strokeStyle=K2;c.lineWidth=7;rr(c,-110,-30,220,70,10);c.fill();c.stroke();c.fillStyle='#3a2a1a';c.fillRect(-30,-200,60,170);c.strokeRect(-30,-200,60,170);c.restore();hand(c,560,y-260,1.3,0,{sleeve:'#5e5a3a'});}
  band(c,A(3)+0.2,t,'1944 · FRANCE',1700,{size:40,ls:8,end:B(3)});vignette(c,0.5);};
// ---------- 4 · mission: not to destroy ----------
SH.mission=function(c,t){L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};farmland(c,t,scam(-200,1.8,1150),{mood:'day',camp:1});c.save();dof(c,2,d=>{});c.restore();
  fig2(c,{x:540,y:2650,s:5.4,f:1,t,kind:'gi1',view:'front',eyes:'open',brow:'flat',mouth:'smirk',hf:[60,30]});
  chip(c,WT(4,4),t,'DESTROY',540,520,'#ff3b30',{size:58});strike(c,WT(4,4)+0.4,t,320,520,760,520);vignette(c,0.5);};
// ---------- 5 · the map: fake army here, real army there ----------
SH.mapPlan=function(c,t){c.fillStyle='#2a1e14';c.fillRect(0,0,W,H);lampPool(c,540,900,1000,'255,210,140',0.45);const z=lerp(1,1.08,inv(A(5),A(6),t));c.save();c.translate(540,960);c.scale(z,z);c.translate(-540,-960);
  warMap(c,60,330,960,1300,{draw:(c2,w,h)=>{const fk=eio(inv(WT(5,6),WT(5,8),t)),rl=eio(inv(WT(5,11),WT(5,13),t));
    unitBlock(c2,lerp(-200,w*0.28,fk),h*0.32,'ARMY?','#c8c0a8',{dash:1,alpha:fk>0?1:0});if(t>WT(5,8))chip(c2,WT(5,8)+0.1,t,'FAKE',w*0.28,h*0.32-120,'#ffb020',{size:36});
    unitBlock(c2,lerp(w+200,w*0.3,rl),h*0.72,'REAL','#7a8a4a',{alpha:rl>0?1:0});if(t>WT(5,13))chip(c2,WT(5,13)+0.05,t,'ACTUALLY HERE',w*0.3,h*0.72-120,'#34c759',{size:36});}});
  c.restore();const hx=t<WT(5,10)?lerp(-200,400,eio(inv(WT(5,5),WT(5,8),t))):lerp(400,1300,eio(inv(WT(5,9),WT(5,10),t)));hand(c,hx,880,1.5,0.4,{sleeve:'#5e5a3a'});vignette(c,0.5);};
// ---------- 6 · inflate: tank, artillery, aircraft ----------
SH.inflate=function(c,t){L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};const a=WT(6,2),b=WT(6,4),d=WT(6,7);const which=t<b?0:(t<d?1:2);const p=eio(inv([a-0.3,b-0.1,d-0.1][which],[a+0.7,b+0.7,d+0.8][which],t));
  farmland(c,t,scam(0,1.5,1200),{mood:'day',fence:1,world:c2=>{const infl=0.06+p*0.94;
    if(which===0)sherman(c2,180,GY+160,170,{fake:1,infl,t,wob:0.6});else if(which===1)howitzer(c2,250,GY+150,150,{fake:1,infl});else fighter(c2,180,GY+150,62,{fake:1,infl});
    fig2(c2,{x:-300,y:GY+260,s:1.7,f:1,t,kind:'gi2',view:'side',crouch:30,eyes:'open',mouth:'flat',hf:[40,30+Math.sin(t*9)*20]});c2.strokeStyle='#1a1a1a';c2.lineWidth=10;c2.beginPath();c2.moveTo(-250,GY+200);c2.quadraticCurveTo(-150,GY+250,-60,GY+120);c2.stroke();}});
  chip(c,[a,b,d][which]+0.2,t,['TANK','ARTILLERY','AIRCRAFT'][which],540,560,'#ffb020',{size:52});fgGrass(c,t,1960,40,'#2e4a20',150);vignette(c,0.45);};
SH.illusion=function(c,t){const q=inv(WT(6,9),A(7),t);L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};const cam=scam(lerp(0,200,q),lerp(1.15,0.5,eio(q)),1300);
  farmland(c,t,cam,{mood:'day',camp:1,world:c2=>{for(let r=0;r<4;r++)for(let k=0;k<9;k++){const x=-2200+k*520+r*170,y=GY+40+r*210,s=0.85+r*0.12;if((k+r)%5===2)howitzer(c2,x,y,110*s,{fake:1});else if((k+r)%7===4)fighter(c2,x,y,55*s,{fake:1});else sherman(c2,x,y,115*s,{fake:1,t,wob:0.2,num:String(k)});}
    for(let i=0;i<3;i++)fig2(c2,{x:-300+i*420,y:GY+120+i*60,s:1.3,f:i%2?1:-1,t,kind:'gi'+(1+i%2),view:'side',walk:1,ph:t*5+i,eyes:'open',mouth:'flat'});}});
  vignette(c,0.4);};
// ---------- 7 · what the Germans could SEE ----------
SH.see=function(c,t){L2={dx:1,rim:'#ffb070',amb:'#2a2a38'};farmland(c,t,scam(400,1.9,1100),{mood:'dusk'});c.fillStyle='rgba(20,15,30,0.3)';c.fillRect(0,0,W,H);
  sandbags(c,-20,1900,9,1.6);GERW({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:'half',brow:'angry',mouth:'flat',hf:[60,-10],hb:[-60,-10]});binoFront(c,540,HC(2700,5.6)-20,2.0);
  chip(c,WT(7,9),t,'SEE',540,560,'#9fd8ff',{size:50});vignette(c,0.55);};
// ---------- 8 · …what they could HEAR ----------
SH.hear=function(c,t){L2={dx:-1,rim:'#9fd8ff',amb:'#1a1a28'};germanHQ(c,t);const y=2650,s=5.6;
  fig2(c,{x:540,y,s,f:1,t,kind:'ger2',view:'front',eyes:'closed',brow:'worried',mouth:'flat',hf:[70,-40],hb:[-70,-40]});headphones(c,540,HC(y,s)-10,40.1*s);
  for(let i=0;i<4;i++){const k=((t*1.3+i/4)%1);c.strokeStyle=`rgba(160,220,255,${(1-k)*0.7})`;c.lineWidth=8;for(const sx of [-1,1]){c.beginPath();c.arc(540+sx*260,HC(y,s),90+k*300,sx>0?-0.6:Math.PI-0.6,sx>0?0.6:Math.PI+0.6);c.stroke();}}
  chip(c,WT(8,5),t,'HEAR',540,560,'#34c759',{size:58});vignette(c,0.55);};
// ---------- 9 · fake radio traffic, copying operators' "fist" ----------
SH.radio=function(c,t){L2={dx:-1,rim:'#ffd8a0',amb:'#3a3a28'};if(t<WT(9,9)){tentInterior(c,t);
    fig2(c,{x:540,y:2500,s:4.6,f:1,t,kind:'gi5',view:'front',eyes:'half',brow:'flat',mouth:'flat',hf:[80,40],hb:[-80,40]});headphones(c,540,HC(2500,4.6)-10,40.1*4.6);
    c.fillStyle='#5a4228';c.strokeStyle=K2;c.lineWidth=7;c.fillRect(-20,1500,W+40,500);c.strokeRect(-20,1500,W+40,40);radioSet(c,800,1380,0.8,t,1);const pr=Math.sin(t*20)>0.1;morseKey(c,330,1640,1.1,pr);hand(c,520,pr?1600:1580,1.1,-0.35,{sleeve:'#5a5838'});hand(c,850,1560,1.0,0.3,{sleeve:'#5a5838'});
    for(let i=0;i<12;i++){const k=(t*2+i/12)%1;c.fillStyle=`rgba(255,220,120,${1-k})`;const dash=(i*7)%3===0;rr(c,820+k*300-150,1150-k*400,dash?40:14,14,7);c.fill();}}
  else{ // "fist" matching graphic
    c.fillStyle='#14161c';c.fillRect(0,0,W,H);const p=inv(WT(9,9),B(9),t);const pat=[1,0,1,1,0,0,1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1];
    const row=(y,lab,col,k)=>{txt(c,lab,540,y-90,34,col,{stroke:false,ls:6,w:800});c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=3;c.beginPath();c.moveTo(80,y);c.lineTo(1000,y);c.stroke();let x=100;pat.forEach((v,i)=>{if(i/pat.length>k)return;c.fillStyle=col;const w=v?60:20;rr(c,x,y-14,w,28,14);c.fill();x+=w+14;});};
    row(820,'REAL GERMAN-HEARD OPERATOR','#9fd8ff',1);row(1180,'GHOST ARMY COPY','#ffb020',clamp(p*1.6));if(p>0.65){chip(c,WT(9,9)+1.6,t,'IDENTICAL',540,1500,'#34c759',{size:54});}
    c.save();c.globalAlpha=0.5;c.strokeStyle='#34c759';c.setLineDash([10,10]);c.lineWidth=3;for(let i=0;i<6;i++){const x=130+i*150;c.beginPath();c.moveTo(x,850);c.lineTo(x,1150);c.stroke();}c.restore();}
  vignette(c,0.5);};
// ---------- 10 · loudspeakers at night ----------
SH.speakers=function(c,t){const q=inv(A(10),B(10),t);L2={dx:-1,rim:'#9fb8ff',amb:'#141828'};
  farmland(c,t,scam(lerp(40,120,q),lerp(0.8,0.9,q),1250),{mood:'night',road:120,world:c2=>{halfTrack(c2,-60,GY+260,150,{on:t>WT(10,3),t});fig2(c2,{x:420,y:GY+300,s:1.6,f:-1,t,kind:'gi4',view:'side',eyes:'open',mouth:'flat',hf:[-40,40]});reelDeck(c2,560,GY+170,0.35,t);}});
  const ic=[[WT(10,8),'TANKS','🛡'],[WT(10,10),'MARCHING','👣'],[WT(10,13),'TRUCKS','🚚']];ic.forEach(([t0,lab],i)=>chip(c,t0,t,lab,[250,560,850][i],560+i*90,'#ffb020',{size:40}));
  lampPool(c,300,1150,500,'255,200,120',0.15);vignette(c,0.6);};
// ---------- 11 · from a distance: a phantom army in the dark ----------
SH.phantom=function(c,t){const q=inv(A(11),B(11),t);L2={dx:-1,rim:'#9fb8ff',amb:'#141828'};
  farmland(c,t,scam(0,0.75,1150),{mood:'night',mistY:1300,world:c2=>{c2.save();c2.globalAlpha=clamp(q*1.6)*0.55;c2.globalCompositeOperation='lighter';for(let k=0;k<7;k++)sherman(c2,-1500+k*480,GY+80+(k%2)*80,120,{col:'#3a5a8a'});for(let k=0;k<14;k++)fig2(c2,{x:-1400+k*210,y:GY+330,s:1.0,f:1,t,kind:'gi1',view:'side',walk:1,ph:t*5+k,eyes:'open'});c2.restore();}});
  c.fillStyle='#0c1008';c.beginPath();c.moveTo(-20,1620);c.quadraticCurveTo(540,1540,1100,1640);c.lineTo(1100,H);c.lineTo(-20,H);c.fill();sandbags(c,-30,1700,9,1.4);
  GERW({c,x:260,y:2500,s:3.8,f:1,t,view:undefined,eyes:'wide',brow:'worried',mouth:'o',sweat:1});GERW({c,x:820,y:2560,s:3.8,f:-1,t,view:undefined,eyes:'open',brow:'worried',mouth:'frown'});
  vignette(c,0.6);};
// ---------- 12 · German intelligence reports it ----------
SH.intel=function(c,t){L2={dx:-1,rim:'#ffd8a0',amb:'#2a2018'};const s1=WT(12,2),s2=WT(12,7);
  if(t<s1){germanHQ(c,t);fig2(c,{x:540,y:2500,s:4.6,f:1,t,kind:'ger2',view:'front',eyes:'wide',brow:'up',mouth:'o',hf:[70,-40],hb:[-70,-40]});headphones(c,540,HC(2500,4.6)-10,40.1*4.6);c.fillStyle='#3a2a1a';c.fillRect(-20,1550,W+40,400);radioSet(c,540,1500,0.8,t,1);}
  else if(t<s2){ // typing the report — both hands, close-up
    c.fillStyle='#2a1e14';c.fillRect(0,0,W,H);lampPool(c,540,700,900,'255,200,130',0.45);c.save();paper(c,540,700,520,560,0);c.restore();txt(c,'MELDUNG',540,520,42,'#1a1a1a',{stroke:false,ls:8});const nch=Math.floor((t-s1)*16);for(let i=0;i<5;i++){const len=clamp((nch-i*12)/12);if(len>0){c.fillStyle='#2a2a2a';c.fillRect(330,600+i*50,380*len,10);}}
    typewriter(c,540,1350,1.6,t,1);const ph=Math.floor(t*12)%2;hand(c,360,1460+(ph?20:0),1.3,-0.2,{sleeve:'#5a6258'});hand(c,720,1460+(ph?0:20),1.3,0.2,{sleeve:'#5a6258'});}
  else{germanHQ(c,t,{mapDraw:(c2,w,h)=>{const p=eio(inv(s2,s2+0.6,t));unitBlock(c2,w*0.3,lerp(-200,h*0.4,p),'2 DIV.','#c8c0a8',{dash:1});}});
    fig2(c,{x:880,y:2300,s:3.6,f:-1,t,kind:'gerOff',view:undefined,eyes:'open',brow:'angry',mouth:'smirk',hf:[-120,-60]});}
  vignette(c,0.5);};
// ---------- 13 · real troops slip away unnoticed ----------
SH.column=function(c,t){const q=inv(A(13),B(13),t);L2={dx:-1,rim:'#9fb8ff',amb:'#141828'};const cx=lerp(-600,600,q);
  farmland(c,t,scam(cx,1.0,1150),{mood:'night',road:160,mistY:1250,world:c2=>{for(let k=0;k<5;k++){const x=-1600+k*720+(t-A(13))*190;sherman(c2,x,GY+290,125,{t,roll:t*3,num:String(k+1)});}
    for(let k=0;k<6;k++){const x=-1300+k*600+(t-A(13))*190;fig2(c2,{x,y:GY+520,s:1.5,f:1,t,kind:'gi'+(1+k%2),view:'side',walk:1,ph:t*5+k,eyes:'open',mouth:'flat'});}}});
  chip(c,WT(13,9),t,'UNNOTICED',540,560,'#34c759',{size:50});vignette(c,0.6);};
// ---------- 14 · the Rhine, March 1945 ----------
SH.rhine=function(c,t){c.fillStyle='#14161c';c.fillRect(0,0,W,H);lampPool(c,540,900,1000,'255,210,140',0.25);const q=inv(A(14),B(14),t);const z=lerp(1,1.1,eio(q));c.save();c.translate(540,980);c.scale(z,z);c.translate(-540,-980);
  warMap(c,60,360,960,1240,{river:1,label:'RHINE',draw:(c2,w,h)=>{
    arrowPath(c2,curvePts(w*0.08,h*0.82,w*0.5,h*0.3,0.15),inv(WT(14,3),WT(14,9),t),'rgba(200,190,170,0.9)',{dash:1,w:20});if(t>WT(14,4))unitBlock(c2,w*0.35,h*0.42,'GHOST','#c8c0a8',{dash:1});
    if(t>WT(14,5)){c2.save();c2.globalAlpha=clamp((t-WT(14,5))/0.4);for(let i=0;i<3;i++)unitBlock(c2,w*0.82,h*(0.25+i*0.13),'','#5a6258');c2.restore();arrowPath(c2,[[w*0.78,h*0.4],[w*0.55,h*0.4]],inv(WT(14,6),WT(14,8),t),'#d0201f',{w:16});}
    arrowPath(c2,curvePts(w*0.15,h*0.95,w*0.75,h*0.78,-0.15),inv(WT(14,15),WT(14,19),t),'#34c759',{w:26});}});c.restore();
  band(c,WT(14,15),t,'MARCH 1945 · THE RHINE',1720,{size:40,ls:8});vignette(c,0.5);};
// ---------- 15 · the unbelievable part ----------
SH.reveal=function(c,t){L2={dx:-1,rim:'#ffd8a0',amb:'#3a3a28'};farmland(c,t,scam(0,2.2,1200),{mood:'day'});c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(0,0,W,H);
  const z=lerp(1,1.2,eio(inv(A(15),B(15),t)));c.save();c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);fig2(c,{x:540,y:2700,s:5.6,f:1,t,kind:'gi3',view:'front',eyes:t>WT(15,3)?'wide':'open',brow:'up',mouth:t>WT(15,3)?'smile':'flat',lean:0.04});c.restore();vignette(c,0.6);};
// ---------- 16 · who they really were: 4 panels ----------
SH.crew=function(c,t){L2={dx:-1,rim:'#ffd8a0',amb:'#3a3a28'};c.fillStyle='#14161c';c.fillRect(0,0,W,H);
  const P=[[WT(16,4),'ARTISTS','gi3',(c2,x,y)=>{easel(c2,x+150,y+40,0.6,cc=>{cc.fillStyle='#9ac0d8';cc.fillRect(-170,-220,340,140);cc.fillStyle='#6a8a4a';cc.fillRect(-170,-80,340,120);sherman(cc,0,-10,22,{fake:1});});}],
    [WT(16,5),'DESIGNERS','gi1',(c2,x,y)=>{c2.fillStyle='#2a4a7a';c2.fillRect(x-40,y+20,330,180);c2.strokeStyle='rgba(255,255,255,0.8)';c2.lineWidth=3;c2.strokeRect(x-20,y+40,290,140);c2.beginPath();c2.moveTo(x,y+150);c2.lineTo(x+120,y+150);c2.lineTo(x+150,y+90);c2.lineTo(x+250,y+90);c2.stroke();}],
    [WT(16,6),'SOUND ENGINEERS','gi4',(c2,x,y)=>{reelDeck(c2,x+130,y+110,0.45,t);}],
    [WT(16,9),'RADIO OPERATORS','gi5',(c2,x,y)=>{radioSet(c2,x+140,y+110,0.55,t,1);}]];
  P.forEach(([t0,lab,k,prop],i)=>{const x=(i%2)*540,y=180+Math.floor(i/2)*820;const p=eo(clamp((t-t0)/0.35));if(p<=0)return;c.save();c.globalAlpha=p;c.beginPath();rr(c,x+16,y,508,800,20);c.clip();
    c.fillStyle=['#3a4a3a','#3a3a4a','#4a3a2a','#2a3a4a'][i];c.fillRect(x,y,540,800);lampPool(c,x+270,y+250,500,'255,220,160',0.3);fig2(c,{x:x+150,y:y+1050,s:2.6,f:1,t,kind:k,view:undefined,eyes:'happy',mouth:'smile'});prop(c,x+180,y+420);c.restore();
    c.strokeStyle='#e8d070';c.lineWidth=5;rr(c,x+16,y,508,800,20);c.stroke();chip(c,t0,t,lab,x+270,y+740,'#e8d070',{size:30});});};
// ---------- 17 · not a conventional fighting force ----------
SH.line=function(c,t){L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};farmland(c,t,scam(0,1.5,1300),{mood:'day',camp:1,world:c2=>{sherman(c2,600,GY+80,110,{fake:1,t,wob:0.3});}});
  const K=['gi3','gi1','gi4','gi5','gi2'];K.forEach((k,i)=>{const x=110+i*215;fig2(c,{x,y:1860,s:2.0,f:1,t,kind:k,view:'front',eyes:'open',mouth:i%2?'smile':'flat',hf:[34,40]});
    const hx=x+46,hy=1860-280;c.save();c.translate(hx,hy);c.rotate(-0.5);if(i%2===0){c.fillStyle='#8a5a2a';c.fillRect(-6,-110,12,120);c.fillStyle='#c83a2a';c.fillRect(-9,-136,18,30);}else{c.fillStyle='#f4efe2';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-40,-60,80,100);c.strokeRect(-40,-60,80,100);}c.restore();});
  vignette(c,0.45);};
// ---------- 18 · weapon down, brush up (both hands) ----------
SH.brush=function(c,t){const q=inv(A(18),B(18),t);L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};c.fillStyle='#4a3a26';c.fillRect(0,0,W,H);for(let i=0;i<10;i++){c.fillStyle='rgba(0,0,0,0.15)';c.fillRect(0,i*200+hash(i)*40,W,8);}lampPool(c,540,800,1000,'255,220,160',0.4);
  // rifle being set down
  const rd=eio(clamp(q*2));c.save();c.translate(lerp(560,520,rd),lerp(900,1400,rd));c.rotate(lerp(-0.9,-0.05,rd));c.fillStyle='#5a3a1e';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.moveTo(-420,-20);c.lineTo(80,-24);c.lineTo(160,30);c.lineTo(260,40);c.lineTo(250,80);c.lineTo(80,40);c.lineTo(-420,10);c.closePath();c.fill();c.stroke();c.fillStyle='#2a2a2a';c.fillRect(-560,-18,180,16);c.strokeRect(-560,-18,180,16);c.restore();
  hand(c,lerp(560,520,rd)+60,lerp(900,1400,rd)+40,1.3,0.2,{sleeve:'#5e5a3a'});
  // other hand picks up a paintbrush
  const pb=eio(inv(WT(18,5),B(18),t));const bx=lerp(820,700,pb),by=lerp(1600,1000,pb);c.save();c.translate(bx,by);c.rotate(-0.6);c.fillStyle='#8a5a2a';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-10,-200,20,260);c.strokeRect(-10,-200,20,260);c.fillStyle='#b8bcc2';c.fillRect(-13,-240,26,44);c.strokeRect(-13,-240,26,44);c.fillStyle='#c83a2a';c.beginPath();c.moveTo(-13,-240);c.quadraticCurveTo(0,-320,13,-240);c.fill();c.stroke();c.restore();hand(c,bx+30,by+60,1.3,-0.3,{sleeve:'#5e5a3a'});
  vignette(c,0.5);};
// ---------- 19 · imagination: the sketch comes to life ----------
SH.imagine=function(c,t){const q=inv(A(19),B(19),t),life=eio(inv(WT(19,4),B(19),t));L2={dx:1,rim:'#ffd8a0',amb:'#3a3a28'};
  farmland(c,t,scam(0,1.4,1350),{mood:'day',world:c2=>{c2.save();c2.globalAlpha=life;sherman(c2,150,GY+150,150,{fake:1,t,wob:0.3});c2.restore();}});
  c.save();c.globalAlpha=1-life*0.85;c.fillStyle='#f4efe2';c.fillRect(0,0,W,H);c.strokeStyle='#3a3a3a';c.lineWidth=4;const dp=clamp(q*2.2);c.save();c.beginPath();c.rect(0,0,W*dp,H);c.clip();c.globalAlpha*=0.9;c.setLineDash([]);
  c.translate(540,1150);c.scale(150,150);c.lineWidth=0.025;c.strokeStyle='#2a2a2a';c.beginPath();c.moveTo(-2.9,-1.0);c.lineTo(-2.9,-1.8);c.lineTo(1.5,-1.9);c.lineTo(2.9,-1.1);c.lineTo(2.6,-0.9);c.lineTo(-2.7,-0.9);c.closePath();c.moveTo(-1.45,-1.9);c.bezierCurveTo(-1.6,-2.3,-1.25,-2.62,-0.6,-2.65);c.lineTo(0.55,-2.63);c.bezierCurveTo(0.95,-2.6,1.1,-2.4,1.1,-2.1);c.moveTo(1.2,-2.2);c.lineTo(3.4,-2.2);c.moveTo(-2.3,0);c.lineTo(2.3,0);c.quadraticCurveTo(2.95,-0.1,2.9,-0.55);c.moveTo(-2.3,0);c.quadraticCurveTo(-3,-0.1,-3,-0.5);for(const bx of [-1.96,-1.34,-0.36,0.26,1.24,1.86]){c.moveTo(bx+0.25,-0.27);c.arc(bx,-0.27,0.25,0,TAU);}c.stroke();c.restore();
  // pencil
  const px=lerp(100,980,dp),py=1000+Math.sin(t*20)*40;c.save();c.translate(px,py);c.rotate(-0.7);c.fillStyle='#e8c040';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-12,-260,24,250);c.strokeRect(-12,-260,24,250);c.fillStyle='#e8c8a0';c.beginPath();c.moveTo(-12,-10);c.lineTo(0,40);c.lineTo(12,-10);c.fill();c.stroke();c.restore();hand(c,px+70,py+170,1.2,-0.4,{sleeve:'#625e3e'});c.restore();
  vignette(c,0.45);};
// ---------- 20 · the army that didn't exist ----------
SH.finale=function(c,t){const q=inv(A(20),B(20),t),fade=eio(inv(WT(20,12),B(20)+0.3,t));L2={dx:1,rim:'#ffb070',amb:'#3a2a40'};
  farmland(c,t,scam(lerp(-200,100,q),lerp(0.75,0.95,eio(q)),1300),{mood:'dusk',mistY:1350,world:c2=>{c2.save();c2.globalAlpha=1-fade*0.85;for(let r=0;r<3;r++)for(let k=0;k<7;k++)sherman(c2,-1500+k*500+r*180,GY+60+r*200,(110+r*14),{fake:1,t,wob:0.25,num:String(k)});c2.restore();}});
  c.fillStyle='#1a1410';c.beginPath();c.moveTo(-20,1700);c.quadraticCurveTo(300,1620,600,1720);c.lineTo(600,H);c.lineTo(-20,H);c.fill();fig2(c,{x:200,y:2550,s:4.0,f:1,t,kind:'gerOff',back:1});vignette(c,0.6);};
// ---------- 21 · follow: a dummy sags ----------
SH.end=function(c,t){const p=inv(A(21),END,t);L2={dx:1,rim:'#ffb070',amb:'#3a2a40'};farmland(c,t,scam(0,1.6,1350),{mood:'dusk',world:c2=>{sherman(c2,0,GY+150,170,{fake:1,infl:1-p*0.8,t,wob:0.4});}});vignette(c,0.6);};

SHOTS=[[0,'hook'],[A(1),'lift'],[A(2),'bino'],[WT(2,18),'tools'],[A(3),'dossier'],[A(4),'mission'],[A(5),'mapPlan'],[A(6),'inflate'],[WT(6,9),'illusion'],[A(7),'see'],[A(8),'hear'],[A(9),'radio'],[A(10),'speakers'],[A(11),'phantom'],[A(12),'intel'],[A(13),'column'],[A(14),'rhine'],[A(15),'reveal'],[A(16),'crew'],[A(17),'line'],[A(18),'brush'],[A(19),'imagine'],[A(20),'finale'],[A(21),'end']];
IMPACTS=[[WT(1,8),12,0.3],[WT(3,13),16,0.4],[WT(4,4)+0.4,8,0.3],[WT(6,2)+0.7,8,0.3],[WT(6,4)+0.6,8,0.3],[WT(6,7)+0.7,8,0.3],[A(8),10,0.3],[WT(10,3),12,0.4],[WT(12,7)+0.6,10,0.3],[A(15),8,0.3],[WT(20,14),10,0.4]];
