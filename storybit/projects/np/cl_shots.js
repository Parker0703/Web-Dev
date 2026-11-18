'use strict';
// ===== "What if Cleopatra had a charisma stat?" — Style 3 + holographic game UI =====
SH={};
KEY.clear();['CHARISMA','15.','FIFTEEN…','THIRTY-FIVE.','SEVENTY.','HUNDRED.'].forEach(k=>KEY.add(k));
function S2(kind,o){return fig2(o.c,{kind,view:'front',...o});}
const F0=(c,t,t0,d=0.3)=>{const a=1-clamp((t-t0)/d);if(a>0){c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);}};
const pushZ=(t,t0,t1,z0,z1)=>lerp(z0,z1,eio(inv(t0,t1,t)));
const CL=(o)=>CLEO(o);
const gld=(c,a=0.18)=>{c.save();c.globalCompositeOperation='soft-light';c.fillStyle=`rgba(255,190,90,${a})`;c.fillRect(0,0,W,H);c.restore();};
function rags(c,x,y,s){}// placeholder (runaway look uses the same gown, dusty)
function dust(c,a){c.save();c.globalCompositeOperation='multiply';c.fillStyle=`rgba(190,150,110,${a})`;c.fillRect(0,0,W,H);c.restore();}

// 0 · not the most beautiful — scanned in her own throne room
SH.hook=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#3a2418'};const z=pushZ(t,0,A(1),0.95,1.08);
  palace(c,t,{x:540,y:1160,z,mm:50},{noThrone:1,world:(c2,GY)=>{CL({c:c2,x:540,y:2060,s:2.6,f:1,t,eyes:'sly',brow:'flat',mouth:'smirk'});
    for(const [x,k,f] of [[110,'servant',1],[970,'envoy',-1]])S2(k,{c:c2,x,y:2140,s:2.2,f,t,view:'3q',eyes:'open',mouth:'flat'});}});
  const tk=WT(0,5);if(t>tk){const k=clamp((t-tk)/0.3);c.save();c.globalAlpha=k;c.strokeStyle=CYAN_C;c.lineWidth=5;c.shadowColor=CYAN_C;c.shadowBlur=14;const bx=380,by=880,bw=320,bh=420;
    for(const [sx,sy] of [[0,0],[1,0],[0,1],[1,1]]){const x=bx+sx*bw,y=by+sy*bh;c.beginPath();c.moveTo(x,y+(sy?-50:50));c.lineTo(x,y);c.lineTo(x+(sx?-50:50),y);c.stroke();}c.restore();
    statTag(c,540,820,'BEAUTY: 6 / 10',CYAN_C,k);}
  vignette(c,0.45);};
// 1 · a hidden ability — her eyes catch gold, a locked slot glows
SH.hidden=function(c,t){L2={dx:-1,rim:'#ffd070',amb:'#1a1020'};c.fillStyle='#120a10';c.fillRect(0,0,W,H);const q=inv(A(1),B(1),t);
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1050,0,540,1050,900);g.addColorStop(0,`rgba(255,190,80,${0.2+0.2*q})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  CL({c,x:540,y:2420,s:5.3,f:1,t,eyes:t>WT(1,5)?'sly':'open',brow:'up',mouth:'flat'});sparkles(c,t,540,1100,420,18);
  const k=back(clamp((t-WT(1,5))/0.35));if(k>0){c.save();c.translate(540,620);c.scale(k,k);c.fillStyle='rgba(10,8,20,0.8)';c.beginPath();c.roundRect(-210,-70,420,140,22);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=4;c.stroke();
    c.font='900 40px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='6px';c.fillText('🔒 ???',0,-14);c.font='700 22px "Inter Display"';c.fillStyle=GOLD_C;c.fillText('HIDDEN ABILITY',0,36);c.restore();}
  vignette(c,0.55);};
// 2 · a charisma stat she could level up — her status window pops
SH.statPop=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1120,z:1.0,mm:135},{world:(c2,GY)=>CL({c:c2,x:300,y:2240,s:3.4,f:1,t,eyes:'wide',brow:'up',mouth:'o',look:[1,0]})});
  statWin(c,770,1330,0.82,{name:'CLEOPATRA VII',lv:1,v:[18,40,15],hi:2,a:(t-A(2))/0.35},t);
  if(t>WT(2,5)){const u=clamp((t-WT(2,5))/0.4);glowTxt(c,'▲ LEVEL UP',770,1060-u*30,46,GOLD_C,{ls:6});}vignette(c,0.45);};
// 3 · runaway princess → most influential woman (two halves)
SH.runaway=function(c,t){L2={dx:1,rim:'#ffcf9a',amb:'#3a2a2a'};desert(c,t,{x:540+t*10,y:1000,z:1.0,mm:35},{world:(c2,GY)=>{
    CL({c:c2,x:520+t*10,y:GY+520,s:2.4,f:1,t,walk:1,run:1,ph:t*7,eyes:'wide',brow:'worried',mouth:'frown',sweat:1});}});dust(c,0.25);statTag(c,540,620,'RUNAWAY PRINCESS',CYAN_C,clamp((t-A(3))/0.3));vignette(c,0.5);};
SH.queen=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#3a2418'};const q=inv(TW('most',1),B(3),t);palace(c,t,{x:540,y:1150,z:pushZ(t,TW('most',1),B(3),0.9,1.0),mm:35},{noThroneProp:0,world:(c2,GY)=>{
    prop(c2,'throne',540,GY-110,300,0);CL({c:c2,x:540,y:GY-100,s:1.55,f:1,t,crouch:60,stance:30,eyes:'sly',brow:'up',mouth:'smirk',hf:[44,50],hb:[-44,50]});
    for(let i=0;i<6;i++){const x=80+i*184,y=2000+(i%2)*80;S2(['envoy','envoy2','servant','egysoldier','senator','envoy'][i],{c:c2,x,y,s:1.8,f:x<540?1:-1,t,view:'3q',lean:0.45*(x<540?1:-1)*eo(clamp(q*2)),crouch:20,eyes:'closed',mouth:'flat',hf:[24,60],hb:[-14,60]});}}});
  lightRays(c,540,-200,'255,220,150',0.2,7,2200,0.6);statTag(c,540,620,'MOST INFLUENTIAL WOMAN ALIVE',GOLD_C,clamp((t-TW('most',1))/0.3));vignette(c,0.45);};
// 4 · here's the system
SH.system=function(c,t){c.fillStyle='#060814';c.fillRect(0,0,W,H);c.strokeStyle='rgba(95,227,255,0.08)';c.lineWidth=2;for(let x=0;x<W;x+=60){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}for(let y=(t*40)%60;y<H;y+=60){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}
  statWin(c,540,1050,1.5,{name:'HUMAN',lv:1,title:'SYSTEM',v:[0,0,0],a:(t-A(4)+0.05)/0.35},t);vignette(c,0.5);};
// 5-6 · three stats: a soldier flexes, a scribe reads, a charmer smiles
SH.three=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1160,z:1.0,mm:50},{noThrone:1,world:(c2,GY)=>{
    const flex=Math.sin(t*8)*6;S2('egysoldier',{c:c2,x:190,y:2050,s:2.0,f:1,t,eyes:'angry',brow:'angry',mouth:'teeth',hf:[64,-34+flex],hb:[-64,-34-flex]});
    S2('envoy2',{c:c2,x:540,y:2050,s:2.0,f:1,t,eyes:'open',brow:'up',mouth:'flat',look:[0,1],hf:[22,40],hb:[-22,40],propF:(c3,h,s)=>prop(c3,'scroll_open',h.x-22*s,h.y-14*s,70*s,0)});
    S2('envoy',{c:c2,x:890,y:2050,s:2.0,f:-1,t,eyes:'happy',brow:'up',mouth:'teeth',hf:[66,-20],hb:[-30,92]});}});
  [[190,WT(5,4),0],[540,WT(6,0),1],[890,WT(6,2),2]].forEach(([x,t0,i])=>{const k=back(clamp((t-t0)/0.3));if(k<=0)return;c.save();c.translate(x,870);c.scale(k,k);c.fillStyle='rgba(8,10,20,0.8)';c.beginPath();c.arc(0,0,64,0,TAU);c.fill();c.strokeStyle=STC[i];c.lineWidth=5;c.shadowColor=STC[i];c.shadowBlur=16;c.stroke();c.shadowBlur=0;
    c.font='900 58px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(STI[i],0,4);c.font='900 24px "Inter Display"';c.letterSpacing='3px';c.fillText(STN[i],0,100);c.restore();});vignette(c,0.45);};
// 7 · most people start at 20
SH.twenty=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};street(c,t,{x:540,y:1100,z:0.95,mm:35},{dawn:0,world:(c2,GY)=>{
    const P=[[120,1900,'servant'],[330,1820,'envoy'],[560,1880,'egysoldier'],[780,1830,'envoy2'],[980,1910,'servant']];P.forEach(([x,y,k],i)=>S2(k,{c:c2,x,y,s:1.6,f:x<540?1:-1,t,view:'3q',eyes:'open',mouth:'flat',walk:i%2,ph:t*5+i}));}});
  [[120,1900],[330,1820],[560,1880],[780,1830],[980,1910]].forEach(([x,y],i)=>{const sy=960+(y-1100)*0.95-1.6*300*0.95;statTag(c,540+(x-540)*0.95,sy,'♛ 20',GOLD_C,clamp((t-WT(7,4)+0.2-i*0.06)/0.25));});vignette(c,0.45);};
// 8-9 · Cleopatra? just 15 — spotlight, small number, awkward smile
SH.fifteen=function(c,t){L2={dx:1,rim:'#ffe0b0',amb:'#1a1418'};c.fillStyle='#0e0a0c';c.fillRect(0,0,W,H);lightRays(c,540,-200,'255,230,180',0.3,5,2400,0.3);
  const t15=A(9);CL({c,x:540,y:2300,s:4.0,f:1,t,eyes:t>t15?'open':'wide',brow:t>t15?'worried':'up',mouth:t>t15?'smile':'o',sweat:t>t15?1:0,hf:t>t15?[60,-10]:[34,92],hb:t>t15?[-60,-10]:[-34,92]});
  if(t>t15){const k=back(clamp((t-t15)/0.3));c.save();c.translate(540,640);c.scale(k,k);statTag(c,0,0,'♛ CHARISMA: 15',GOLD_C,1);c.restore();}vignette(c,0.6);};
SH.lv1=function(c,t){levelCard(c,t,A(10),1,'SURVIVAL');};
// 12 · her brother drives her out — Ptolemy points, soldiers push her through the gate
SH.exile=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1a20'};const q=inv(A(12),B(12),t);palace(c,t,{x:540,y:1150,z:0.95,mm:35},{noThroneProp:1,world:(c2,GY)=>{
    prop(c2,'throne',540,GY-110,280,0);S2('ptolemy',{c:c2,x:540,y:GY-100,s:1.4,f:1,t,crouch:58,stance:30,eyes:'angry',brow:'angry',mouth:'scream',hf:[96,-20],hb:[-40,50]});
    const dx=lerp(0,-340,eo(q));CL({c:c2,x:420+dx,y:2020,s:2.0,f:-1,t,walk:1,ph:t*6,lean:-0.08,eyes:'wide',brow:'worried',mouth:'frown',sweat:1});
    S2('egysoldier',{c:c2,x:640+dx,y:2040,s:2.0,f:-1,t,walk:1,ph:t*6+1,eyes:'angry',brow:'angry',mouth:'flat',hf:[70,10],propF:held('gladius_side',-0.3,{len:140})});}});vignette(c,0.45);};
// 13-14 · no throne, no army — alone in the desert at night
SH.alone=function(c,t){L2={dx:-1,rim:'#9fb8ff',amb:'#14142a'};river(c,t,{x:540,y:1000,z:1.0,mm:50},{night:1,pyr:1,world:(c2,GY)=>CL({c:c2,x:540,y:2150,s:2.6,f:1,t,eyes:'half',brow:'worried',mouth:'frown',tear:1,hf:[20,60],hb:[-20,60]})});
  [[320,A(13),'THRONE'],[760,A(14),'ARMY']].forEach(([x,t0,l])=>{const k=clamp((t-t0)/0.25);if(k<=0)return;statTag(c,x-40,640,l,'#9aa4b8',k);bigX(c,x+110,640,36,k,'#e8eef8');});vignette(c,0.55);};
// 15 · loyalty raises charisma — she shares water with a desert guide, +CHA floats into her bar
SH.loyal=function(c,t){L2={dx:1,rim:'#ffcf9a',amb:'#3a2a2a'};const q=inv(A(15),B(15),t);desert(c,t,{x:540,y:1000,z:1.0,mm:50},{world:(c2,GY)=>{
    CL({c:c2,x:380,y:GY+560,s:2.4,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[78,30],propF:held('goblet',0,{len:42,noFlip:1})});
    S2('servant',{c:c2,x:760,y:GY+560,s:2.4,f:-1,t,eyes:t>WT(15,9)?'happy':'open',brow:'up',mouth:t>WT(15,9)?'teeth':'o',hf:[60,30],hb:[-30,92]});}});
  if(t>WT(15,9)){for(let i=0;i<3;i++){const p=clamp((t-WT(15,9)-i*0.25)/0.8);if(p<=0||p>=1)continue;heart(c,lerp(760,380,eo(p)),lerp(1000,820,eo(p))-Math.sin(p*Math.PI)*160,26,true);}}
  statWin(c,540,620,0.62,{name:'CLEOPATRA VII',lv:1,v:[18,40,lerp(15,17,clamp((t-WT(15,10))/0.6))],hi:2,a:1},t);if(t>WT(15,11))glowTxt(c,'+ CHA',820,560,44,GOLD_C);vignette(c,0.45);};
// 16 · rolled up in a carpet — a servant shoulders the 3D carpet roll
SH.carpet=function(c,t){L2={dx:-1,rim:'#ffb070',amb:'#1a1420'};street(c,t,{x:540,y:1060,z:1.0,mm:50},{night:1,world:(c2,GY)=>{const x=lerp(260,640,inv(A(16),B(16)+0.5,t));
    const hy=GY+380-255*2.3+80;prop(c2,'carpet_roll',x+10,hy-40,560,-0.05,{anc:[0.5,0.5]});
    S2('servant',{c:c2,x,y:GY+380,s:2.3,f:1,t,walk:1,ph:t*5,eyes:'sly',brow:'flat',mouth:'flat',hf:[34,-58],hb:[-40,-58]});
    // her face peeking out of the roll end
    c2.save();c2.fillStyle='#0c0a10';c2.beginPath();c2.arc(x+290,hy-46,30,0,TAU);c2.fill();c2.fillStyle='#e6e4de';c2.beginPath();c2.arc(x+292,hy-40,22,0,TAU);c2.fill();c2.fillStyle=K2;c2.beginPath();c2.arc(x+286,hy-42,2.6,0,TAU);c2.arc(x+298,hy-42,2.6,0,TAU);c2.fill();c2.restore();}});vignette(c,0.55);};
// 17 · delivered straight to Julius Caesar
SH.deliver=function(c,t){L2={dx:1,rim:'#ffd49a',amb:'#3a2418'};palace(c,t,{x:540,y:1140,z:0.95,mm:35},{noThroneProp:1,world:(c2,GY)=>{
    prop(c2,'sella',540,GY-112,180,0);CAESAR({c:c2,x:540,y:GY-108,s:1.45,f:1,t,crouch:62,stance:34,eyes:'open',brow:'up',mouth:'flat',hf:[46,46],hb:[-46,46]});
    for(const x of [250,830])LEG({c:c2,x,y:GY+40,s:1.5,f:x<540?1:-1,t,eyes:'open',mouth:'flat',hf:[30,30],propF:held('gladius_side',-1.2,{len:150})});
    const x=lerp(-200,420,eo(inv(A(17),B(17),t)));prop(c2,'carpet_roll',x+10,2080-255*2.1+40,510,-0.05,{anc:[0.5,0.5]});S2('servant',{c:c2,x,y:2080,s:2.1,f:1,t,walk:1,ph:t*5,eyes:'open',mouth:'smile',hf:[34,-58],hb:[-40,-58]});}});vignette(c,0.45);};
// 18 · the carpet opens — unrolled on the floor, she rises
SH.opens=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#3a2418'};const q=eo(clamp((t-A(18))/0.7));palace(c,t,{x:540,y:1200,z:1.0,mm:50},{noThrone:1,world:(c2,GY)=>{
    prop(c2,'carpet_flat',540,2020,lerp(300,900,q),0,{anc:[0.5,0.5]});if(q<0.95)prop(c2,'carpet_roll',540+lerp(-150,330,q),2000,lerp(560,200,q),0,{anc:[0.5,0.5]});
    const up=clamp((t-A(18)-0.5)/0.6);if(up>0){c2.save();c2.globalAlpha=Math.min(1,up*2);CL({c:c2,x:540,y:2060+lerp(260,0,eo(up)),s:2.6,f:1,t,crouch:lerp(80,0,eo(up)),eyes:'sly',brow:'up',mouth:'smirk',hf:[60,-10],hb:[-60,-10]});c2.restore();sparkles(c2,t,540,1500,400,20);}}});vignette(c,0.45);};
// 19 · she speaks
SH.speaks=function(c,t){L2={dx:-1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1100,z:1.0,mm:135},{world:(c2,GY)=>CL({c:c2,x:540,y:2250,s:4.4,f:1,t,eyes:'sly',brow:'up',mouth:Math.floor(t*8)%2?'o':'smile',hf:[66,20],hb:[-30,92]})});
  for(let i=0;i<3;i++){const p=((t-A(19))*1.2+i/3)%1;c.save();c.globalAlpha=(1-p)*0.6;c.strokeStyle=GOLD_C;c.lineWidth=5;c.beginPath();c.arc(540,1180,140+p*380,-0.6,0.6);c.stroke();c.restore();}vignette(c,0.5);};
// 20 · Caesar listens
SH.listens=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1100,z:1.0,mm:135},{world:(c2,GY)=>CAESAR({c:c2,x:540,y:2250,s:4.4,f:1,t,eyes:'happy',brow:'up',mouth:'smile',lean:0.06,hf:[30,92],hb:[-30,92]})});sparkles(c,t,540,1000,380,12);vignette(c,0.5);};
// 21 · alliance unlocked
SH.alliance=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1150,z:1.0,mm:50},{noThrone:1,world:(c2,GY)=>{CL({c:c2,x:360,y:2060,s:2.3,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[92,10]});CAESAR({c:c2,x:720,y:2060,s:2.3,f:-1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[92,10]});}});
  popup(c,t,A(21),'ALLIANCE UNLOCKED','JULIUS CAESAR',GOLD_C,{y:700});vignette(c,0.45);};
SH.cha35=function(c,t){palace(c,t,{x:540,y:1150,z:1.0,mm:85},{});chaUp(c,t,A(23),15,35);};
// 25 · Egypt is hers again — on the throne, Ptolemy gone
SH.hers=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#3a2418'};palace(c,t,{x:540,y:1120,z:pushZ(t,A(25),B(25),1.0,1.1),mm:50},{noThroneProp:1,world:(c2,GY)=>{prop(c2,'throne',540,GY-110,300,0);CL({c:c2,x:540,y:GY-100,s:1.55,f:1,t,crouch:60,stance:30,eyes:'happy',brow:'up',mouth:'smile',hf:[44,50],hb:[-44,50]});}});
  lightRays(c,540,-200,'255,220,150',0.22,7,2200,0.6);vignette(c,0.45);};
SH.lv2=function(c,t){levelCard(c,t,A(26),2,'INFLUENCE');};
// 28 · languages, diplomacy, powerful people listen
const SCR=['Γειά','𓂋𓏤','SALVE','שלום','ܫܠܡ','سلام','𐤔𐤋𐤌','ⲭⲉⲣⲉ','𐎠𐎭'];
SH.langs=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1120,z:1.0,mm:85},{world:(c2,GY)=>CL({c:c2,x:540,y:2250,s:3.6,f:1,t,eyes:'sly',brow:'up',mouth:Math.floor(t*7)%2?'o':'smile',hf:[64,0],hb:[-30,92]})});
  SCR.forEach((s,i)=>{const t0=A(28)+i*0.18;if(t<t0)return;const k=back(clamp((t-t0)/0.3)),an=-Math.PI/2+(i-4)*0.36,r=430;const x=540+Math.cos(an)*r,y=1220+Math.sin(an)*r*0.9;c.save();c.translate(x,y);c.scale(k,k);
    c.fillStyle='rgba(250,244,230,0.95)';c.beginPath();c.roundRect(-82,-44,164,88,30);c.fill();c.strokeStyle=K2;c.lineWidth=4;c.stroke();c.font='800 38px "Noto Sans","Inter Display",serif';c.fillStyle='#2a1a10';c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,2);c.restore();});
  statTag(c,540,1720,'LANGUAGES: 9',CYAN_C,clamp((t-A(28)-1.2)/0.3));vignette(c,0.45);};
SH.diplo=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1a20'};palace(c,t,{x:540,y:1150,z:0.95,mm:35},{world:(c2,GY)=>{CL({c:c2,x:540,y:1990,s:2.2,f:1,t,eyes:'sly',brow:'up',mouth:'smile',hf:[70,-10],hb:[-70,-10]});
    [['envoy',170,2150,1],['envoy2',360,2240,1],['senator3',720,2240,-1],['envoy',910,2150,-1]].forEach(([k,x,y,f],i)=>S2(k,{c:c2,x,y,s:2.0,f,t,view:'3q',lean:0.18*f,eyes:'happy',brow:'up',mouth:'o',look:[f,0]}));}});
  popup(c,t,TW('listen')-0.2,'DIPLOMACY','MASTERED',CYAN_C,{y:640,size:64,h:200});vignette(c,0.45);};
// 29 · Mark Antony summons her (a sealed 3D scroll)
SH.antony=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};forum(c,t,{x:540,y:1080,z:1.0,mm:85},{world:(c2,GY)=>{
    for(const x of [120,960])LEG({c:c2,x,y:GY+380,s:2.0,f:x<540?1:-1,t,eyes:'open',mouth:'flat',hf:[30,30],propF:held('gladius_side',-1.2)});
    S2('antony',{c:c2,x:540,y:GY+620,s:3.0,f:1,t,eyes:'sly',brow:'angry',mouth:'smirk',hf:[78,10],propF:held('rolled',0.0,{len:70})});}});
  statTag(c,540,620,'MARK ANTONY · GENERAL OF ROME',GOLD_C,clamp((t-WT(29,5))/0.3));vignette(c,0.45);};
// 30 · golden ship, purple sails, silver oars
SH.ship=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#3a2030'};const q=inv(A(30),B(30),t);river(c,t,{x:540,y:1000,z:1.0,mm:24},{world:(c2,GY)=>{
    const x=lerp(-60,600,q);prop(c2,'barge',x,GY+330,1100,Math.sin(t*1.4)*0.012,{anc:[0.5,0.68]});
    CL({c:c2,x:x-180,y:GY+90,s:0.62,f:1,t,eyes:'happy',mouth:'smile'});
    for(let i=0;i<10;i++){const w=((t*0.8+i*0.1)%1);c2.strokeStyle=`rgba(255,240,210,${0.5*(1-w)})`;c2.lineWidth=3;c2.beginPath();c2.ellipse(x-560-w*300,GY+330+i*4,80+w*120,8,0,0,TAU);c2.stroke();}
    sparkles(c2,t,x,GY+100,520,22);}});
  [['GOLDEN SHIP',WT(30,4)],['PURPLE SAILS',WT(30,8)],['SILVER OARS',WT(30,11)]].forEach(([s,t0],i)=>statTag(c,540,1500+i*80,s,i===1?PURP_C:i===2?'#e8eef8':GOLD_C,clamp((t-t0)/0.25)));vignette(c,0.4);};
// 31 · he's supposed to question her
SH.question=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};forum(c,t,{x:540,y:1080,z:1.0,mm:135},{world:(c2,GY)=>S2('antony',{c:c2,x:540,y:GY+800,s:4.0,f:1,t,eyes:'angry',brow:'angry',mouth:'flat',hf:[64,40],propF:(c3,h,s)=>prop(c3,'scroll_open',h.x-20*s,h.y-10*s,78*s,0)})});
  vignette(c,0.5);};
// 32-33 · instead, he's captivated
SH.captivated=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#2a1418'};forum(c,t,{x:540,y:1080,z:1.0,mm:135},{world:(c2,GY)=>{S2('antony',{c:c2,x:540,y:GY+800,s:4.0,f:1,t,eyes:'happy',brow:'up',mouth:'o',lean:Math.sin(t*2)*0.03,hf:[40,92]});
    prop(c2,'scroll_open',740,GY+760,250,0.6+clamp((t-A(32))/0.4)*0.6,{anc:[0.5,0.5]});}});
  for(let i=0;i<6;i++){const p=((t-A(32))*0.7+i/6)%1;heart(c,540+Math.sin(i*2+t*2)*260,1000-p*500,22+(1-p)*10,true,{glow:0});}sparkles(c,t,540,1000,360,14);vignette(c,0.45);};
SH.cha70=function(c,t){river(c,t,{x:540,y:1000,z:1.0,mm:85},{});chaUp(c,t,A(35),35,70);};
// 37 · the bet: a fortune on one dinner
SH.bet=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};palace(c,t,{x:540,y:1160,z:1.0,mm:50},{night:1,noThrone:1,world:(c2,GY)=>{
    c2.fillStyle='#5a3418';c2.fillRect(80,2000,920,40);c2.fillStyle='#3a2210';c2.fillRect(120,2040,40,200);c2.fillRect(920,2040,40,200);
    S2('antony',{c:c2,x:250,y:2150,s:2.2,f:1,t,eyes:'sly',brow:'up',mouth:'smirk',hf:[80,40]});CL({c:c2,x:820,y:2150,s:2.2,f:-1,t,eyes:'sly',brow:'up',mouth:'smirk',hf:[80,-30]});
    for(let i=0;i<26;i++){const x=420+hash(i)*240,y=1990-hash(i*3)*90;c2.fillStyle='#e8b838';c2.strokeStyle=K2;c2.lineWidth=2;c2.beginPath();c2.ellipse(x,y,22,8,0,0,TAU);c2.fill();c2.stroke();}
    prop(c2,'goblet',540,1900,90,0);}});
  popup(c,t,WT(37,6),'BET','10,000,000 SESTERCES',GOLD_C,{y:640,size:70,h:200});vignette(c,0.45);};
// 38 · the pearl drops into vinegar (200mm insert)
SH.pearl=function(c,t){c.fillStyle='#120a08';c.fillRect(0,0,W,H);bokeh(c,t,10,'255,190,110',3);const td=A(38)+0.9,q=clamp((t-A(38))/0.9);
  prop(c,'goblet',540,1420,640,0);const py=lerp(500,1080,q*q);if(t<td)prop(c,'pearl',540,py,120,0,{anc:[0.5,0.5]});
  if(t>=td){const p=clamp((t-td)/0.6);for(let i=0;i<14;i++){const an=-Math.PI/2+(hash(i)-0.5)*1.6;c.fillStyle=`rgba(200,220,180,${1-p})`;c.beginPath();c.arc(540+Math.cos(an)*p*220,1080+Math.sin(an)*p*260+p*p*200,8,0,TAU);c.fill();}
    for(let i=0;i<20;i++){const b=((t-td)*0.8+hash(i))%1;c.fillStyle=`rgba(255,255,240,${0.6*(1-b)})`;c.beginPath();c.arc(480+hash(i*3)*120,1150-b*90,4+hash(i)*5,0,TAU);c.fill();}}
  sparkles(c,t,540,py,90,8,'255,255,240');
  statTag(c,540,1820,'PRICELESS PEARL',GOLD_C,clamp((t-A(38)-0.2)/0.3));vignette(c,0.55);};
// 39 · and drinks it (cup held low at her chin, face clear)
SH.drinks=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};palace(c,t,{x:540,y:1100,z:1.0,mm:135},{night:1,world:(c2,GY)=>CL({c:c2,x:540,y:2250,s:4.4,f:1,t,eyes:'closed',brow:'up',mouth:'smile',hf:[52,-26],hb:[-30,92],propF:held('goblet',-0.45,{len:48,noFlip:1})})});vignette(c,0.5);};
// 40 · bet won — Antony speechless
SH.betwon=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1418'};palace(c,t,{x:540,y:1100,z:1.0,mm:85},{night:1,world:(c2,GY)=>S2('antony',{c:c2,x:540,y:2250,s:4.0,f:1,t,eyes:'wide',brow:'up',mouth:'o',sweat:1,hf:[30,92]})});popup(c,t,A(40),'BET WON','',GOLD_C,{y:640,h:170});vignette(c,0.45);};
// 41 · final boss
SH.boss=function(c,t){c.fillStyle='#0a0610';c.fillRect(0,0,W,H);const k=clamp((t-A(41))/0.3);for(let i=0;i<10;i++){c.fillStyle=`rgba(150,90,255,${0.05*k})`;c.fillRect(0,880+i*12-60,W,8);}
  c.save();c.globalAlpha=k;c.fillStyle='rgba(30,10,50,0.85)';c.fillRect(0,860,W,200);c.strokeStyle=PURP_C;c.lineWidth=5;c.beginPath();c.moveTo(0,860);c.lineTo(W,860);c.moveTo(0,1060);c.lineTo(W,1060);c.stroke();glowTxt(c,'FINAL BOSS',540+(Math.floor(t*20)%5===0?8:0),960,96,PURP_C,{ls:14});c.restore();vignette(c,0.55);};
// 42 · Octavian — immune
SH.octavian=function(c,t){L2={dx:-1,rim:'#b0a0ff',amb:'#14102a'};senate(c,t,{x:540,y:1100,z:1.0,mm:135},{mood:'night',world:(c2,GY)=>S2('octavian',{c:c2,x:330,y:2250,s:4.0,f:1,t,eyes:'half',brow:'angry',mouth:'flat',hf:[-4,62],hb:[6,62],look:[1,0]})});
  statWin(c,790,1350,0.78,{name:'OCTAVIAN',lv:99,title:'BOSS',v:[60,95,8],hi:2,a:(t-A(42)-0.2)/0.35},t);vignette(c,0.55);};
// 43 · he wants Egypt — map arrows, then the army builds
SH.wants=function(c,t){const q=inv(A(43),WT(43,5),t);romeMap(c,t,0.75,{z:1.1});c.save();c.strokeStyle=PURP_C;c.lineWidth=12;c.lineCap='round';c.setLineDash([30,20]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(600,820);c.quadraticCurveTo(800,860,lerp(600,1080,q),lerp(820,1180,q));c.stroke();c.restore();
  txt(c,'EGYPT',1080,1240,44,GOLD_C);vignette(c,0.4);};
SH.army=function(c,t){L2={dx:-1,rim:'#fff0c0',amb:'#4a3020'};desert(c,t,{x:540,y:1050,z:0.95,mm:24},{world:(c2,GY)=>{for(let r=0;r<3;r++)for(let i=-1;i<6;i++){const x=i*210+r*90-((t*90)%210),y=GY+90+r*150;LEG({c:c2,x,y,s:1.25+r*0.2,f:1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'flat',hf:[30,30],propF:held('gladius_side',-1.3,{len:150})});}
    aquila(c2,240,GY-520,1.0,t);aquila(c2,820,GY-560,1.0,t+1);}});
  counter(c,WT(43,8),t,Math.round(lerp(2000,75000,clamp((t-WT(43,8))/1.4))).toLocaleString(),'SOLDIERS',540,620);vignette(c,0.45);};
// 44 · tries everything — three quick panels, each fails
SH.tries=function(c,t){c.fillStyle='#0c0a10';c.fillRect(0,0,W,H);const P=[['GIFTS',(c2)=>{for(let i=0;i<10;i++){c2.fillStyle='#e8b838';c2.beginPath();c2.ellipse(-60+hash(i)*120,40-hash(i*3)*60,22,8,0,0,TAU);c2.fill();}prop(c2,'goblet',60,20,70,0);}],['LETTERS',(c2)=>prop(c2,'rolled',0,0,200,-0.2,{anc:[0.5,0.5]})],['CHARM',(c2)=>{sparkles(c2,t,0,0,90,10);heart(c2,0,0,46,true);}]];
  P.forEach(([l,draw],i)=>{const t0=A(44)+i*0.55,k=back(clamp((t-t0)/0.3));if(k<=0)return;const y=760+i*360;c.save();c.translate(540,y);c.scale(k,k);c.fillStyle='rgba(30,24,40,0.9)';c.beginPath();c.roundRect(-380,-150,760,300,24);c.fill();c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=4;c.stroke();
    c.save();c.translate(-160,0);draw(c);c.restore();txt(c,l,170,0,54,'#fff');c.restore();if(t>t0+0.35)bigX(c,860,y,50,clamp((t-t0-0.35)/0.2),'#e8eef8');});vignette(c,0.45);};
// 45 · he refuses to be impressed — her charm bounces off
SH.refuses=function(c,t){L2={dx:-1,rim:'#b0a0ff',amb:'#14102a'};senate(c,t,{x:540,y:1100,z:1.0,mm:85},{mood:'night',world:(c2,GY)=>S2('octavian',{c:c2,x:540,y:2250,s:3.6,f:1,t,eyes:'half',brow:'angry',mouth:'flat',hf:[-4,62],hb:[6,62]})});
  c.save();c.strokeStyle='rgba(180,160,255,0.6)';c.lineWidth=6;c.shadowColor='#b0a0ff';c.shadowBlur=20;c.beginPath();c.arc(540,1300,520,Math.PI*1.1,Math.PI*1.9);c.stroke();c.restore();
  for(let i=0;i<6;i++){const p=((t-A(45))*1.1+i/6)%1;const x=lerp(-60,540-420,p<0.6?p/0.6:1)+(p>0.6?-(p-0.6)*600:0),y=900+i*60+(p>0.6?(p-0.6)*400:0);heart(c,x,y,22,true,{glow:0});}
  statTag(c,540,640,'IMMUNE',PURP_C,clamp((t-A(45)-0.3)/0.3));vignette(c,0.55);};
SH.cha100=function(c,t){palace(c,t,{x:540,y:1150,z:1.0,mm:85},{night:1});chaUp(c,t,A(46)+0.2,70,100,{max:1});};
// 48 · even max level can't win every battle — Actium at night
SH.actium=function(c,t){seaBattle(c,t,{x:540,y:1000,z:1.0,mm:35},{});statTag(c,540,640,'BATTLE OF ACTIUM · 31 BC','#e8eef8',clamp((t-A(48)-0.3)/0.3));vignette(c,0.5);};
// 49 · Octavian defeats her forces
SH.defeat=function(c,t){L2={dx:1,rim:'#ff9a60',amb:'#1a0806'};burning(c,t,{x:540,y:1100,z:1.0,mm:35},{world:(c2,GY)=>{const q=eo(inv(A(49),B(49),t));
    for(let i=0;i<4;i++)LEG({c:c2,x:lerp(-200,140,q)+i*170,y:GY+220+(i%2)*60,s:1.6,f:1,t,walk:1,ph:t*6+i,view:'3q',eyes:'angry',brow:'angry',mouth:'scream',hf:[60,-20],propF:held('gladius_side',-0.8,{len:150})});
    for(let i=0;i<3;i++)S2('egysoldier',{c:c2,x:lerp(860,1150,q)+i*90,y:GY+240+(i%2)*60,s:1.5,f:-1,t,walk:1,run:1,ph:t*8+i,eyes:'wide',brow:'worried',mouth:'scream',sweat:1});}});vignette(c,0.5);};
// 50 · Egypt falls — the cobra banner drops in the empty throne room
SH.falls=function(c,t){L2={dx:1,rim:'#ff9a60',amb:'#1a0806'};const q=eo(clamp((t-A(50))/0.8));palace(c,t,{x:540,y:1150,z:1.0,mm:50},{night:1,braziers:0,world:(c2,GY)=>{
    c2.save();c2.translate(540,lerp(300,1500,q));c2.rotate(q*0.6);c2.fillStyle='#4a1460';c2.fillRect(-90,-300,180,600);c2.fillStyle='#d8a830';c2.fillRect(-90,-300,180,24);cobra(c2,0,0,70,1.8);c2.restore();}});
  c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(120,60,40,0.5)';c.fillRect(0,0,W,H);c.restore();smoke(c,t,540,1400,8,1.6,0.35);vignette(c,0.6);};
// 51 · and Cleopatra's story ends — eyes close, light fades
SH.ends=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#1a1014'};const q=inv(A(51),B(51)+0.4,t);palace(c,t,{x:540,y:1100,z:pushZ(t,A(51),B(51),1.0,1.06),mm:135},{night:1,world:(c2,GY)=>CL({c:c2,x:540,y:2250,s:4.4,f:1,t,eyes:t>WT(51,2)?'closed':'half',brow:'flat',mouth:'flat',hf:[30,92],hb:[-30,92]})});
  c.fillStyle=`rgba(0,0,0,${0.55*q})`;c.fillRect(0,0,W,H);vignette(c,0.6);};
// 52-53 · from nothing to one of the most powerful women in history
SH.legacy=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#2a1a20'};c.fillStyle='#0c0a0c';c.fillRect(0,0,W,H);const tb=A(53);
  const pan=(x,draw,lab,a)=>{if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.beginPath();c.roundRect(x,520,450,900,28);c.clip();draw();c.restore();c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=5;c.beginPath();c.roundRect(x,520,450,900,28);c.stroke();txt(c,lab,x+225,1480,40,'#fff');c.restore();};
  pan(50,()=>{desert(c,t,{x:611,y:1150,z:0.8,mm:50},{world:(c2,GY)=>CL({c:c2,x:280,y:GY+338,s:2.6,f:1,t,eyes:'half',brow:'worried',mouth:'frown'})});dust(c,0.3);},'ALMOST NOTHING',clamp((t-A(52))/0.3));
  pan(580,()=>{palace(c,t,{x:469,y:1150,z:0.8,mm:50},{world:(c2,GY)=>CL({c:c2,x:800,y:GY+238,s:2.6,f:-1,t,eyes:'sly',brow:'up',mouth:'smirk'})});lightRays(c,805,500,'255,220,150',0.25,5,1000,0.5);},'LEGEND',clamp((t-tb)/0.3));
  if(t>tb){c.save();c.strokeStyle=GOLD_C;c.lineWidth=10;c.lineCap='round';c.shadowColor=GOLD_C;c.shadowBlur=20;const k=clamp((t-tb)/0.4);c.beginPath();c.moveTo(450,970);c.lineTo(lerp(450,640,k),970);c.stroke();c.restore();}vignette(c,0.5);};
SH.survivor=function(c,t){levelCard(c,t,A(54),1,'SURVIVOR',{col:'160,200,255'});};
// 56-57 · level one hundred: Queen of Egypt — crowned, gold, fade to black
SH.queenEnd=function(c,t){L2={dx:1,rim:'#ffe0a0',amb:'#2a1a10'};c.fillStyle='#120a06';c.fillRect(0,0,W,H);lightRays(c,540,-200,'255,210,120',0.3,9,2400,0.7);dustMotes(c,t,40,'255,230,170',0.6);
  prop(c,'throne',540,1640,420,0);CL({c,x:540,y:1660,s:2.4,f:1,t,crouch:60,stance:30,eyes:'sly',brow:'up',mouth:'smirk',hf:[60,46],hb:[-60,46]});
  const k=back(clamp((t-A(56))/0.4));c.save();c.translate(540,640);c.scale(k,k);c.fillStyle='rgba(8,6,2,0.7)';c.beginPath();c.roundRect(-400,-110,800,220,24);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.shadowColor=GOLD_C;c.shadowBlur=24;c.stroke();c.shadowBlur=0;
  glowTxt(c,'LV 100',0,-36,80,GOLD_C,{ls:8});if(t>A(57)){c.globalAlpha=clamp((t-A(57))/0.3);c.font='900 46px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.letterSpacing='8px';c.fillText('QUEEN OF EGYPT',0,58);}c.restore();
  vignette(c,0.55);const fo=clamp((t-(END-1.2))/1.1);if(fo>0){c.fillStyle=`rgba(0,0,0,${fo})`;c.fillRect(0,0,W,H);}};
SHOTS=[[0,'hook'],[A(1),'hidden'],[A(2),'statPop'],[A(3),'runaway'],[TW('most',1),'queen'],[A(4),'system'],[A(5),'three'],[A(7),'twenty'],[A(8),'fifteen'],[A(10),'lv1'],[A(12),'exile'],[A(13),'alone'],[A(15),'loyal'],[A(16),'carpet'],[A(17),'deliver'],[A(18),'opens'],[A(19),'speaks'],[A(20),'listens'],[A(21),'alliance'],[A(22),'cha35'],[A(25),'hers'],[A(26),'lv2'],
  [A(28),'langs'],[TW('diplomacy')-0.1,'diplo'],[A(29),'antony'],[A(30),'ship'],[A(31),'question'],[A(32),'captivated'],[A(34),'cha70'],[A(37),'bet'],[A(38),'pearl'],[A(39),'drinks'],[A(40),'betwon'],[A(41),'boss'],[A(42),'octavian'],[A(43),'wants'],[WT(43,5),'army'],[A(44),'tries'],[A(45),'refuses'],[A(46),'cha100'],
  [A(48),'actium'],[A(49),'defeat'],[A(50),'falls'],[A(51),'ends'],[A(52),'legacy'],[A(54),'survivor'],[A(56),'queenEnd']].map(([a,n])=>[a>0.12?a-0.12:a,n]);
IMPACTS=[[A(9),6,0.25],[A(21),8,0.3,'#ffe0a0',0.3],[A(24),8,0.3,'#ffe0a0',0.3],[A(36),8,0.3,'#ffe0a0',0.3],[A(40),8,0.3,'#ffe0a0',0.25],[A(42),10,0.35],[A(47),12,0.4,'#ffe0a0',0.35],[A(49),14,0.5],[A(50),10,0.4]];
// ===== v2 fixes =====
const GBW=525/1005,FIRE=[[0.694,0.444],[0.194,0.499],[0.344,0.526],[0.518,0.539],[0.817,0.63]];
// a burning galley: sprite on the waterline, fire + smoke rising from the actual burning planks, reflection on the water
function burningGalley(c,t,x,y,len,o={}){const fl=o.flip?-1:1,seed=o.seed||0;
  // reflection glow on the water under the ship
  c.save();c.globalCompositeOperation='lighter';for(const [u] of FIRE){const px=x+(u-0.5)*len*fl;for(let k=0;k<6;k++){c.fillStyle=`rgba(255,130,50,${0.16*(1-k/6)})`;const w=len*(0.05-k*0.006)*(1+Math.sin(t*4+k+u*9)*0.2);c.fillRect(px-w/2,y+k*len*0.025,w,len*0.012);}}c.restore();
  // smoke behind
  for(const [u,v] of FIRE.slice(0,3)){const px=x+(u-0.5)*len*fl,py=y+(v-0.78)*len*GBW;smoke(c,t+seed+u*5,px,py-len*0.18,7,len/900,0.55);}
  prop(c,'galley_burn',x,y,len,o.rot||0,{anc:[0.5,0.78],flip:0});if(o.flip){} 
  // flames rooted on the deck spots, glow halo
  FIRE.forEach(([u,v],i)=>{const px=x+(u-0.5)*len*fl,py=y+(v-0.78)*len*GBW+len*0.01;const h=len*(0.07+hash(i+seed)*0.05);
    c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(px,py-h*0.4,0,px,py-h*0.4,h*1.4);g.addColorStop(0,'rgba(255,170,70,0.3)');g.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=g;c.fillRect(px-h*1.4,py-h*1.8,h*2.8,h*2.8);c.restore();
    for(let k=0;k<2;k++)fireTongue(c,px+(k-0.5)*len*0.022,py,h*(1-k*0.3),len*0.028,t,i*3+k+seed);});
  // embers
  for(let i=0;i<18;i++){const p=((t*0.5+hash(i+seed))%1);c.fillStyle=`rgba(255,${150+hash(i)*80|0},60,${1-p})`;c.beginPath();c.arc(x+(hash(i*3+seed)-0.5)*len*0.8,y-len*0.12-p*len*0.6,2+hash(i)*3,0,TAU);c.fill();}}
SH.ship=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#3a2030'};const t0=A(30),t1=A(31),q=inv(t0,t1,t),e=eio(clamp((q-0.15)/0.75));
  const GY=1150,bx=lerp(430,560,q),L=1300,H=L*856/996,wy=GY+40+Math.sin(t*1.3)*4;const px=bx+(0.301-0.5)*L,py=wy+(0.688-0.834)*H;
  const z=lerp(1.0,2.35,e),cx=lerp(540,px+40,e),cy=lerp(1000,py-40,e);
  river(c,t,{x:cx,y:cy,z,mm:lerp(28,85,e)},{world:(c2,G)=>{
    // wake + reflection
    c2.save();c2.globalAlpha=0.35;c2.translate(bx,wy);c2.scale(1,-0.45);prop(c2,'barge2',0,0,L,0,{anc:[0.5,0.834]});c2.restore();
    for(let i=0;i<10;i++){const w=((t*0.8+i*0.1)%1);c2.strokeStyle=`rgba(255,240,210,${0.5*(1-w)})`;c2.lineWidth=3;c2.beginPath();c2.ellipse(bx-L*0.48-w*260,wy+6+i*3,70+w*120,7,0,0,TAU);c2.stroke();}
    prop(c2,'barge2',bx,wy,L,Math.sin(t*1.3)*0.008,{anc:[0.5,0.834]});
    // Cleopatra seated on the deck throne under the canopy, waving
    CL({c:c2,x:px+14,y:py+2,s:0.6,f:1,t,crouch:60,stance:26,eyes:'sly',brow:'up',mouth:'smile',hf:[52,-30+Math.sin(t*5)*8],hb:[-40,44]});
    sparkles(c2,t,bx,wy-300,560,22);}});
  [['GOLDEN SHIP',WT(30,4)],['PURPLE SAILS',WT(30,8)],['SILVER OARS',WT(30,11)]].forEach(([s2,tt],i)=>statTag(c,540,1560+i*80,s2,i===1?PURP_C:i===2?'#e8eef8':GOLD_C,clamp((t-tt)/0.25)));vignette(c,0.4);};
SH.actium=function(c,t){const q=inv(A(48),A(49),t);river(c,t,{x:540+q*40,y:1000,z:lerp(1.0,1.08,q),mm:35},{night:1,pyr:0,GY:960,world:(c2,GY)=>{
    burningGalley(c2,t,230,GY+40,440,{seed:1});prop(c2,'galley',880,GY+50,480,0.0,{anc:[0.5,0.78]});
    burningGalley(c2,t,760,GY+280,640,{seed:2,rot:0.05});
    burningGalley(c2,t,400,GY+620,900,{seed:3,rot:-0.03});
    for(let i=0;i<8;i++){const x=hash(i*5)*1100,y=GY+420+hash(i*7)*500;c2.fillStyle='#2a1a10';c2.save();c2.translate(x+Math.sin(t+i)*6,y);c2.rotate(hash(i)*2);c2.fillRect(-30,-5,60,10);c2.restore();}}});
  statTag(c,540,640,'BATTLE OF ACTIUM · 31 BC','#e8eef8',clamp((t-A(48)-0.3)/0.3));vignette(c,0.5);};
SH.falls=function(c,t){L2={dx:1,rim:'#ff9a60',amb:'#1a0806'};const q=inv(A(50),A(51),t);palace(c,t,{x:540,y:1150,z:lerp(0.95,1.02,q),mm:35},{night:1,braziers:0,world:(c2,GY)=>{
    // the Egyptian banner burning and dropping
    const bq=eo(clamp(q*1.4));c2.save();c2.translate(800,lerp(520,1180,bq));c2.rotate(bq*0.5);c2.fillStyle='#4a1460';c2.fillRect(-80,-260,160,520);c2.fillStyle='#d8a830';c2.fillRect(-80,-260,160,22);cobra(c2,0,-20,60,1.6);c2.restore();
    fireTongue(c2,800+bq*40,lerp(520,1180,bq)-200,220,90,t,7);
    // Rome takes the palace: eagle standard planted before the throne, legionaries march in
    aquila(c2,540,lerp(1180,1360,eo(clamp(q*2))),1.2,t);
    for(let i=0;i<3;i++){const x=lerp(-180,140,eo(clamp(q*1.3)))+i*190;LEG({c:c2,x,y:2060+(i%2)*60,s:2.0,f:1,t,walk:1,ph:t*6+i,eyes:'angry',brow:'angry',mouth:'flat',hf:[46,40],propF:held('gladius_side',-0.3)});}
    for(let i=0;i<2;i++)S2('egysoldier',{c:c2,x:900+i*130,y:2100+i*40,s:1.9,f:-1,t,crouch:40,lean:0.2,eyes:'closed',brow:'worried',mouth:'frown',hf:[30,50],hb:[-30,50]});}});
  c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(150,70,40,0.45)';c.fillRect(0,0,W,H);c.restore();smoke(c,t,300,1300,6,1.4,0.3);vignette(c,0.6);};
