'use strict';
// ===================== "The London Beer Flood" — StoryBit B, re-hook every 2–3 s =====================
SH={};
KEY.clear();['1814','EIGHT','TWENTYTWO','THOUSAND','HOOPS','SNAPPED','NOBODY','EXPLODED','ANOTHER','MILLION','FIFTEENFOOT','POOREST','FIVE','ACCIDENT','TAX','REFUND'].forEach(k=>KEY.add(k));
const FW=(c,t,t0,d=0.25)=>{const a=1-clamp((t-t0)/d);if(a>0&&t>=t0){c.fillStyle=`rgba(255,255,255,${a*0.8})`;c.fillRect(0,0,W,H);}};
const yearTxt=(c,s,k,y=430,col='#fff')=>{if(k<=0)return;c.save();c.translate(540,y);const sc=lerp(1.8,1,eo(k));c.scale(sc,sc);c.globalAlpha=clamp(k*2);txt(c,s,0,0,170,col,{sw:22,ls:6});c.restore();};
const tag=(c,x,y,s,col,t,t0)=>statTag(c,x,y,s,col,clamp((t-t0)/0.25));

function measure(c,x,y0,y1,label,k,col='#ffd23f'){if(k<=0)return;c.save();c.globalAlpha=clamp(k*2);const y=lerp(y0,y1,eo(k));c.strokeStyle=K2;c.lineWidth=12;seg(c,x,y0,x,y);c.strokeStyle=col;c.lineWidth=6;seg(c,x,y0,x,y);
  for(const yy of [y0,y]){c.strokeStyle=K2;c.lineWidth=12;seg(c,x-30,yy,x+30,yy);c.strokeStyle=col;c.lineWidth=6;seg(c,x-30,yy,x+30,yy);}txt(c,label,x,(y0+y)/2+24,72,col,{sw:14});c.restore();}
function stamp(c,x,y,s,k,col=RED_C,rot=-0.12){if(k<=0)return;c.save();c.translate(x,y);c.rotate(rot);const sc=lerp(2.2,1,eo(clamp(k/0.6)));c.scale(sc,sc);c.globalAlpha=clamp(k*3);c.font='900 110px "Inter Display"';c.letterSpacing='8px';const w=c.measureText(s).width+70;
  c.strokeStyle=col;c.lineWidth=12;c.beginPath();c.roundRect(-w/2,-80,w,160,18);c.stroke();c.textAlign='center';c.fillStyle=col;c.fillText(s,0,40);c.restore();}
// the eight memorial candles on a ledge (lit one by one)
function eightCandles(c,t,t0,y=1640,s=1.6,dim=0){for(let i=0;i<8;i++){const k=clamp((t-t0-i*0.09)/0.2);const x=540+(i-3.5)*110;c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(x,y+4,26*s,6*s,0,0,TAU);c.fill();candle(c,x,y,s,t,k*(1-dim),i);}}
// ---------------- 0 · "In 1814," a wall of beer rises above the rooftops ----------------
SH.hook=function(c,t){LIT('#ffd0a0','#3a2a28');const k=eo(clamp(t/1.4));londonSt(c,t,{x:540,y:1000+Math.sin(t*31)*6*k,z:1.02+t*0.03},{GY:1300,houseH:560,behind:(c2,GY)=>{wallWave(c2,t,lerp(GY-450,GY-1060,k),GY+40,{debris:4});},world:(c2,GY)=>{
    BW(c2,'poorM',360,GY+520,1.5,t,{f:1,eyes:'wide',brow:'worried',mouth:'scream',hf:[40,30],seed:1,look:[0,-1]});BW(c2,'poorW',720,GY+560,1.6,t,{f:-1,eyes:'shock',brow:'worried',mouth:'o',seed:2,look:[0,-1]});}});
  yearTxt(c,'1814',clamp((t-0.05)/0.3),420,'#ffd23f');FW(c,t,0,0.2);vignette(c,0.45);};
// ---------------- 1 · "a wave of beer taller than a house smashed through London…" ----------------
SH.wave=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(1)-0.05,u=t-t0;const xF=lerp(-500,1700,u/3.8);
  londonSt(c,t,{x:540,y:1000+Math.sin(t*37)*8,z:1.0},{GY:1250,world:(c2,GY)=>{
    const ppl=[[ -60,GY+300,1.05,'poorM2',3],[260,GY+420,1.25,'poorW',4],[620,GY+360,1.15,'poorM',5],[900,GY+470,1.35,'poorW2',6]];
    for(const [x0,y,s,k,sd] of ppl){const x=x0+u*300;if(xF<x-260*s)BW(c2,k,x,y,s,t,{view:'q3',run:1,ph:t*12+sd,f:1,eyes:'wide',brow:'worried',mouth:'scream',seed:sd});}
    sideWave(c2,t,xF,GY+500,1000,1,{debris:5});floodSurf(c2,t,-1500,xF-200,GY+80,GY+1200,{flow:400});}});
  measure(c,960,1650,1650-0,'',0);tag(c,540,420,'TALLER THAN A HOUSE',GOLD_C,t,TW('taller'));vignette(c,0.4);};
// ---------------- 2 · "and killed eight people." ----------------
SH.eight=function(c,t){LIT('#a8b8ff','#22222e');const t0=A(2)-0.05;londonSt(c,t,{x:540,y:960,z:1.05},{GY:1200,night:1,poor:1,world:(c2,GY)=>{floodSurf(c2,t,-1500,2600,GY+60,GY+1400,{flow:60,top:'#8a5a24'});
    for(let i=0;i<4;i++)stave(c2,100+i*260,GY+180+i*60,1.2,0.3+i);barrel(c2,820,GY+300,1.1,{});}});
  eightCandles(c,t,TW('eight')-0.15,1660,1.5);counterCard(c,540,440,back(clamp((t-TW('eight')+0.15)/0.3)),'8','PEOPLE KILLED',RED_C);vignette(c,0.5);};
// ---------------- 3 · "It started inside the Horse Shoe Brewery." ----------------
function breweryFront(c2,t,GY,x=540){c2.save();brickWall(c2,x-760,GY-1250,1520,1250,'#6a3e2a',{bh:26,bw:64});c2.strokeStyle=K2;c2.lineWidth=6;c2.strokeRect(x-760,GY-1250,1520,1250);
  c2.fillStyle='#4a2a1c';c2.fillRect(x+420,GY-1900,170,650);c2.strokeRect(x+420,GY-1900,170,650);for(let i=0;i<7;i++){const a=((t*0.2+i/7)%1);c2.fillStyle=`rgba(80,74,70,${0.4*(1-a)})`;c2.beginPath();c2.arc(x+505+a*120,GY-1920-a*400,30+a*90,0,TAU);c2.fill();}
  for(let k=0;k<5;k++)for(let r=0;r<2;r++)sash(c2,x-680+k*300,GY-1150+r*300,110,170,hash(k+r*5)>0.5);
  c2.fillStyle='#1e140e';c2.beginPath();c2.moveTo(x-200,GY);c2.lineTo(x-200,GY-420);c2.arc(x,GY-420,200,Math.PI,TAU);c2.lineTo(x+200,GY);c2.closePath();c2.fill();c2.stroke();
  c2.fillStyle='#2a1a10';c2.fillRect(x-560,GY-1330,1120,150);c2.strokeRect(x-560,GY-1330,1120,150);c2.fillStyle='#e8c060';c2.font='900 84px "Lora",serif';c2.textAlign='center';c2.fillText('HORSE SHOE BREWERY',x,GY-1225);
  c2.strokeStyle='#e8c060';c2.lineWidth=22;c2.beginPath();c2.arc(x,GY-760,90,Math.PI*0.15,Math.PI*0.85,true);c2.stroke();c2.fillStyle='#2a1a10';for(let i=0;i<7;i++){const a=Math.PI*(1.0+i/6*0.0)+0;}c2.restore();}
SH.brewery=function(c,t){LIT('#ffe0b0','#3a2a20');const t0=A(3)-0.05,u=t-t0;londonSt(c,t,{x:540,y:820,z:pushZ(t,t0,A(4),0.86,0.95)},{GY:1350,lamps:false,world:(c2,GY)=>{breweryFront(c2,t,GY);
    BW(c2,'brewer',250,GY+430,1.25,t,{f:1,crouch:20,lean:0.25,hf:[70,70],hb:[50,80],eyes:'open',brow:'flat',mouth:'smile',seed:3});
    const bx=380+((u*90)%200);c2.save();c2.translate(bx,GY+400);c2.rotate(u*2.4);c2.translate(-bx,-(GY+400));c2.restore();
    c2.save();c2.translate(390+u*60,GY+410);c2.rotate(Math.PI/2);barrel(c2,52,0,1.0);c2.restore();
    BW(c2,'brewer2',840,GY+470,1.35,t,{f:-1,eyes:'open',brow:'flat',mouth:'flat',hf:[-40,40],seed:4});barrel(c2,980,GY+480,1.2);}});
  tag(c,540,420,"MEUX'S HORSE SHOE BREWERY",GOLD_C,t,TW('horse'));vignette(c,0.4);};
// ---------------- 4 · "A giant wooden vat, twenty-two feet tall," tilt up the vat; a worker for scale ----------------
SH.vat=function(c,t){LIT('#ffd8a8','#2a1a10');const t0=A(4)-0.05;const k=eio(clamp((t-t0)/2.4));breweryIn(c,t,{x:540,y:lerp(1250,900,k),z:0.92},{GY:1500,world:(c2,GY)=>{
    vat(c2,470,GY,900,1080,t,{label:''});barrel(c2,1060,GY+40,0.9);BW(c2,'brewer',130,GY+60,0.95,t,{f:1,eyes:'open',brow:'up',mouth:'o',look:[0.3,-1],seed:2});
    measure(c2,1000,GY,GY-1106,'22 FT',clamp((t-TW('twenty-two')+0.1)/0.6));}});vignette(c,0.45);};
// ---------------- 5 · "held more than three thousand barrels of beer." ----------------
SH.barrels=function(c,t){LIT('#ffd8a8','#2a1a10');const t0=TW('held')-0.1;breweryIn(c,t,{x:540,y:900,z:1.0},{GY:1500,world:(c2,GY)=>{
    const n=Math.floor(eo(clamp((t-t0)/2.2))*60);for(let i=0;i<n;i++){const r=Math.floor(i/10),q=i%10;const drop=clamp((t-t0-i*0.035)/0.2);barrel(c2,120+q*92+(r%2)*46,GY-r*120-(1-eo(drop))*300,0.72);}
    BW(c2,'brewer',960,GY+90,1.0,t,{f:-1,eyes:'wide',brow:'up',mouth:'o',seed:2});}});
  const v=Math.round(eo(clamp((t-TW('three')+0.15)/0.9))*3000);counterCard(c,540,440,back(clamp((t-TW('three')+0.25)/0.3)),(v>=3000?'3,000+':v.toLocaleString('en-US')),'BARRELS OF BEER',GOLD_C);vignette(c,0.45);};
// ---------------- 6 · "Huge iron hoops kept it together." ----------------
SH.hoops=function(c,t){LIT('#ffd8a8','#2a1a10');const t0=A(5)-0.05,u=t-t0;breweryIn(c,t,{x:lerp(480,560,u/2.7),y:lerp(1000,700,eio(clamp(u/2.6))),z:2.1},{GY:1500,world:(c2,GY)=>{vat(c2,560,GY,1060,1260,t,{strain:0.4,ladder:false});}});
  tag(c,540,420,'IRON HOOPS',CYAN_C,t,TW('iron'));vignette(c,0.5);};
// ---------------- 7 · "On October 17th," ----------------
SH.date=function(c,t){LIT('#ffd8a8','#2a1a10');const t0=A(6)-0.05;breweryIn(c,t,{x:540,y:900,z:1.0,blur:6},{GY:1500,world:(c2,GY)=>vat(c2,560,GY,1060,1260,t,{})});c.fillStyle='rgba(10,6,4,0.45)';c.fillRect(0,0,W,H);
  const k=back(clamp((t-t0)/0.35));if(k>0)calendarPage(c,540,800,k*1.15,1,-0.05);vignette(c,0.5);};
// ---------------- 8 · "one of those hoops snapped." ----------------
SH.snap=function(c,t){LIT('#ffd8a8','#2a1a10');const ts=TW('snapped')-0.08,sk=clamp((t-ts)/0.9);breweryIn(c,t,{x:540,y:1150+(t>ts&&t<ts+0.3?Math.sin(t*80)*10:0),z:0.95},{GY:1500,world:(c2,GY)=>{
    vat(c2,470,GY,900,1080,t,{snap:t>ts?3:null,snapK:sk,strain:t>ts?0.6:0.2});
    if(t>ts&&t<ts+0.35){const y=GY-26-1080*(0.06+3*0.88/8);c2.save();c2.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const a=hash(i)*TAU,r=(t-ts)*700*hash(i*3);c2.fillStyle='rgba(255,220,120,0.9)';c2.beginPath();c2.arc(920+Math.cos(a)*r,y+Math.sin(a)*r,4,0,TAU);c2.fill();}c2.restore();}
    BW(c2,'brewer',180,GY+80,1.05,t,{f:1,eyes:t>ts+0.1?'wide':'open',brow:t>ts+0.1?'up':'flat',mouth:t>ts+0.1?'o':'flat',look:[0.6,-0.6],seed:2});}});
  FW(c,t,ts,0.15);tag(c,540,420,'SNAP!',RED_C,t,ts);vignette(c,0.45);};
// ---------------- 9 · "Nobody panicked." the clerk shrugs and keeps writing ----------------
SH.calm=function(c,t){LIT('#ffd8a8','#2a1a10');const t0=A(8)-0.05;breweryIn(c,t,{x:540,y:1000,z:1.15},{GY:1500,world:(c2,GY)=>{vat(c2,820,GY,1060,1260,t,{snap:3,snapK:1});
    desk(c2,-40,560,GY+150,170,{});BW(c2,'clerk',260,GY+150,1.35,t,{f:1,eyes:'closed',brow:'up',mouth:'smile',hf:[60,30],seed:5});
    c2.fillStyle='#f2ead8';c2.strokeStyle=K2;c2.lineWidth=3;c2.save();c2.translate(380,GY-35);c2.fillRect(-70,-14,140,28);c2.strokeRect(-70,-14,140,28);c2.restore();
    c2.strokeStyle='#e8e0c8';c2.lineWidth=4;const hx=260+60*1.35,hy=GY+150-200*1.35+30*1.35;seg(c2,hx,hy,hx+30,hy-50);}});
  tag(c,540,420,'"IT\'LL BE FINE."',GOLD_C,t,TW('panicked')-0.2);vignette(c,0.45);};
// ---------------- 10 · "An hour later," the clock spins one hour ----------------
SH.hour=function(c,t){const t0=A(9)-0.05;breweryIn(c,t,{x:540,y:900,z:1.0,blur:8},{GY:1500,world:(c2,GY)=>vat(c2,560,GY,1060,1260,t,{snap:3,snapK:1})});c.fillStyle='rgba(10,6,4,0.5)';c.fillRect(0,0,W,H);
  const k=eio(clamp((t-t0-0.15)/0.9)),m=30+k*60;wallClock(c,540,820,300,4+Math.floor(m/60),m%60);tag(c,540,420,'+1 HOUR',GOLD_C,t,t0);vignette(c,0.5);};
// ---------------- 11 · "the whole vat exploded." ----------------
SH.explode=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('exploded')-0.05,bk=clamp((t-tb)/1.6);const sh=t>tb&&t<tb+0.7?(1-(t-tb)/0.7):0;
  breweryIn(c,t,{x:560+Math.sin(t*61)*24*sh,y:1000+Math.cos(t*53)*20*sh,z:1.15-bk*0.08},{GY:1500,world:(c2,GY)=>{vat(c2,560,GY,1060,1260,t,{snap:3,snapK:1,strain:t<tb?clamp((t-tb+0.7)/0.7):0,burst:bk});
    BW(c2,'brewer',130,GY+120,1.1,t,{f:1,eyes:t>tb?'shock':'open',brow:'up',mouth:t>tb?'scream':'flat',lean:t>tb?-0.25:0,seed:2});if(bk>0.25)floodSurf(c2,t,-1500,2600,GY+200-bk*120,GY+1400,{flow:500});}});
  FW(c,t,tb,0.25);vignette(c,0.45);};
// ---------------- 12 · "The blast smashed the vat beside it…" ----------------
SH.chain=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('smashed')-0.05,bk=clamp((t-tb)/1.5);const sh=t>tb&&t<tb+0.6?(1-(t-tb)/0.6):0;
  breweryIn(c,t,{x:620+Math.sin(t*61)*20*sh,y:960,z:0.82},{GY:1450,world:(c2,GY)=>{vat(c2,-120,GY,800,950,t,{burst:1});vat(c2,820,GY,800,950,t,{burst:bk,ladder:false});
    sideWave(c2,t,lerp(300,700,clamp((t-A(10)+0.05)/0.6)),GY+60,520,1,{xFar:-900,tail:0.6});if(bk>0.3)floodSurf(c2,t,-1500,2600,GY+120-bk*80,GY+1400,{flow:500});}});FW(c,t,tb,0.2);vignette(c,0.45);};
// ---------------- 13 · "and then another." ----------------
SH.another=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('another')-0.1,bk=clamp((t-tb)/1.2);const sh=t>tb&&t<tb+0.6?(1-(t-tb)/0.6):0;
  breweryIn(c,t,{x:540+Math.sin(t*57)*24*sh,y:960+Math.cos(t*49)*18*sh,z:1.0},{GY:1450,world:(c2,GY)=>{vat(c2,560,GY,900,1050,t,{burst:bk});floodSurf(c2,t,-1500,2600,GY+140-bk*60,GY+1400,{flow:600});}});FW(c,t,tb,0.2);
  counterCard(c,540,420,back(clamp((t-tb)/0.3)),'3','VATS BURST',RED_C);vignette(c,0.45);};
// ---------------- 14 · "Over a million litres of beer burst through the brewery wall." ----------------
SH.wall=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(12)-0.05,tb=TW('burst')-0.05,bk=clamp((t-tb)/1.4);const sh=t>tb&&t<tb+0.6?(1-(t-tb)/0.6):0;
  londonSt(c,t,{x:540+Math.sin(t*59)*22*sh,y:1000,z:1.05},{GY:1300,lamps:false,poor:1,behind:(c2,GY)=>{},world:(c2,GY)=>{
    // the brewery's back wall in front of the street
    if(bk<1){c2.save();c2.globalAlpha=1;brickWall(c2,-300,GY-1350+bk*0,1680,1350,'#6a3e2a',{bh:30,bw:72});c2.strokeStyle=K2;c2.lineWidth=6;c2.strokeRect(-300,GY-1350,1680,1350);c2.restore();
      if(t<tb){for(let i=0;i<5;i++){c2.strokeStyle='rgba(20,10,4,0.8)';c2.lineWidth=4;const a=hash(i)*TAU;seg(c2,540,GY-500,540+Math.cos(a)*120*clamp((t-tb+0.8)/0.8),GY-500+Math.sin(a)*120*clamp((t-tb+0.8)/0.8));}}}
    if(bk>0){wallWave(c2,t,lerp(GY-300,GY-1250,eo(bk)),GY+900,{debris:6});
      for(let i=0;i<40;i++){const a=hash(i*1.3)*TAU,sp=0.5+hash(i*2.1),r=bk*1300*sp;const x=540+Math.cos(a)*r,y=GY-500+Math.sin(a)*r*0.7+bk*bk*900,sc=1+bk*2.5*sp;c2.save();c2.translate(x,y);c2.rotate(bk*6*sp+i);c2.fillStyle=['#8a4a32','#7a3e2a','#9a5a3e'][i%3];c2.strokeStyle=K2;c2.lineWidth=2;c2.fillRect(-18*sc,-9*sc,36*sc,18*sc);c2.strokeRect(-18*sc,-9*sc,36*sc,18*sc);c2.restore();}}}});
  const v=Math.round(eo(clamp((t-TW('million')+0.2)/0.9))*1000000);counterCard(c,540,440,back(clamp((t-TW('million')+0.3)/0.3)),(v>=1000000?'1,000,000+':v.toLocaleString('en-US')),'LITRES OF BEER',GOLD_C);FW(c,t,tb,0.2);vignette(c,0.4);};
// ---------------- 15 · "A fifteen-foot wave tore into St Giles," ----------------
SH.street=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(13)-0.05,u=t-t0;const xF=lerp(-200,1500,u/3.0);londonSt(c,t,{x:540,y:1000+Math.sin(t*33)*6,z:1.0},{GY:1250,poor:1,world:(c2,GY)=>{
    c2.fillStyle='#e8e0cc';c2.strokeStyle=K2;c2.lineWidth=4;c2.fillRect(620,GY-560,300,80);c2.strokeRect(620,GY-560,300,80);c2.fillStyle='#1a1a1a';c2.font='900 44px "Lora",serif';c2.textAlign='center';c2.fillText('ST GILES',770,GY-506);
    BW(c2,'poorW',1000,GY+430,1.2,t,{view:'q3',run:1,ph:t*12,f:1,eyes:'wide',brow:'worried',mouth:'scream',seed:3});
    sideWave(c2,t,xF,GY+480,860,1,{debris:4});floodSurf(c2,t,-1500,xF-150,GY+120,GY+1200,{flow:400});measure(c2,xF+200,GY+480,GY+480-860,'15 FT',clamp((t-TW('fifteen-foot'))/0.5));}});vignette(c,0.4);};
// ---------------- 16 · "one of the poorest slums in London." ----------------
SH.slum=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(14)-0.05;londonSt(c,t,{x:540,y:1000,z:pushZ(t,t0,A(15),1.0,1.08)},{GY:1220,poor:1,world:(c2,GY)=>{
    const P=[['poorW',120,GY+260,0.95,1,'worried','flat'],['poorM2',420,GY+200,0.85,-1,'flat','frown'],['poorM',760,GY+300,1.05,-1,'worried','flat'],['poorW2',980,GY+240,0.95,-1,'flat','flat'],['poorM',260,GY+520,1.3,1,'worried','frown'],['poorW',820,GY+600,1.45,-1,'worried','flat']];
    for(const [k,x,y,s,f,b,m] of P)BW(c2,k,x,y,s,t,{f,brow:b,mouth:m,seed:x});}});tag(c,540,420,'THE ST GILES ROOKERY',GOLD_C,t,TW('slums')-0.2);vignette(c,0.45);};
// ---------------- 17 · "It crushed homes" a house front collapses into the flood ----------------
SH.crush=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(15)-0.05,tb=TW('crushed')-0.05,ck=clamp((t-tb)/1.1);const sh=t>tb&&t<tb+0.5?(1-(t-tb)/0.5):0;
  londonSt(c,t,{x:540+Math.sin(t*63)*20*sh,y:1000,z:1.0},{GY:1250,poor:1,houseH:0,lamps:false,world:(c2,GY)=>{
    // one house in close-up, falling apart in slices
    for(let i=0;i<6;i++){const hy=GY-900+i*150,fall=clamp(ck*1.4-i*0.07);c2.save();c2.translate(260+fall*(i%2?120:-80),hy+fall*fall*700);c2.rotate(fall*(i%2?0.6:-0.5));brickWall(c2,0,0,560,150,'#7a4a36',{bh:22,bw:56});c2.strokeStyle=K2;c2.lineWidth=4;c2.strokeRect(0,0,560,150);if(i>0&&i<5)sash(c2,80,26,90,100,0,{broken:1}),sash(c2,380,26,90,100,0,{broken:1});c2.restore();}
    if(ck>0.4)rubble(c2,540,GY+200,900,t,2);sideWave(c2,t,lerp(200,1600,clamp((t-t0)/1.6)),GY+460,700,1,{debris:4});floodSurf(c2,t,-1500,2600,GY+140,GY+1200,{flow:400});}});FW(c,t,tb,0.15);vignette(c,0.45);};
// ---------------- 18 · "and flooded cellars where whole families lived." cutaway ----------------
SH.cellars=function(c,t){LIT('#ffd0a0','#2a2018');const t0=TW('flooded')-0.1,u=t-t0,lv=clamp(u/3.0)*0.42;c.fillStyle='#14100c';c.fillRect(0,0,W,H);
  c.save();const SY=760;// street level
  const g=c.createLinearGradient(0,0,0,SY);g.addColorStop(0,'#3a3a4e');g.addColorStop(1,'#a87a5a');c.fillStyle=g;c.fillRect(0,0,W,SY);townhouse(c,-60,SY,1200,700,t,{fl:2,poor:1,col:'#7a4a36',door:1,seed:9});
  floodSurf(c,t,-100,1200,SY-150,SY,{flow:300});
  // ground slab + cellar room
  c.fillStyle='#4a3a2e';c.fillRect(0,SY,W,60);c.fillStyle='#3a2e26';c.fillRect(60,SY+60,960,760);for(let r=0;r<8;r++)for(let k=0;k<7;k++){c.fillStyle=`rgba(${hash(r*7+k)>0.5?'90,74,60':'70,58,48'},0.6)`;c.fillRect(70+k*140+(r%2?70:0),SY+70+r*94,132,88);}
  c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(60,SY+60,960,760);c.fillStyle='#2a2218';c.fillRect(60,SY+820,960,30);
  // grating: beer pours down
  c.fillStyle='#1a1a1e';c.fillRect(780,SY,160,60);const fy=SY+820-lv*520;c.save();c.beginPath();c.rect(60,SY+60,960,760);c.clip();
  for(let i=0;i<6;i++){c.fillStyle=`rgba(200,130,40,${0.85})`;c.fillRect(790+i*24+Math.sin(t*20+i)*3,SY+60,14,fy-SY-60);}
  // the family in the cellar: they stand up and back away as the beer comes in
  const fam=[['poorW',300,1.05,1,'shock','worried','o'],['poorM',520,1.15,1,'wide','worried','scream'],['poorW2',690,0.8,-1,'wide','worried','o']];
  for(const [k,x,s,f,e,b,m] of fam)BW(c,k,x-lv*120,SY+800,s*1.25,t,{f,eyes:e,brow:b,mouth:m,seed:x,look:[0.8,-0.5]});
  floodSurf(c,t,60,1020,fy,SY+830,{flow:200});c.restore();c.restore();tag(c,540,300,'WHOLE FAMILIES LIVED HERE',GOLD_C,t,TW('families')-0.3);vignette(c,0.4);};
// ---------------- 19 · "In one basement," ----------------
SH.basement=function(c,t){LIT('#ffc890','#1a1410');const t0=A(16)-0.05;cellar(c,t,{x:540,y:960,z:pushZ(t,t0,A(17),1.0,1.12)},{GY:1450,world:(c2,GY)=>{coffin(c2,560,GY+60,1.2);for(const x of [380,740])candle(c2,x,GY+60-150*1.2,1.2,t,1,x);candle(c2,180,GY+80,1.4,t,1,3);candle(c2,940,GY+90,1.4,t,1,5);}});
  c.fillStyle='rgba(10,6,4,0.25)';c.fillRect(0,0,W,H);vignette(c,0.6);};
// ---------------- 20 · "mourners had gathered for a little boy's wake." ----------------
SH.wake=function(c,t){LIT('#ffc890','#1a1410');const t0=A(17)-0.05;cellar(c,t,{x:540,y:1250,z:1.35},{GY:1450,world:(c2,GY)=>{
    const M=[['mournW',140,GY+40,1.15,1],['mournM',330,GY-20,1.0,1],['mournW',760,GY-20,1.0,-1],['mournM',940,GY+40,1.15,-1]];for(const [k,x,y,s,f] of M)BW(c2,k,x,y,s,t,{f,eyes:'closed',brow:'worried',mouth:'frown',seed:x});
    coffin(c2,550,GY+150,1.45);for(const x of [400,710])candle(c2,x,GY+150-150*1.45,1.3,t,1,x);}});
  tag(c,540,420,"A LITTLE BOY'S WAKE",GOLD_C,t,TW('wake')-0.3);vignette(c,0.6);};
// ---------------- 21 · "Five of them drowned." beer floods the cellar, candles go out ----------------
SH.drowned=function(c,t){LIT('#ffc890','#1a1410');const t0=A(18)-0.05,u=t-t0,lv=clamp(u/1.9);cellar(c,t,{x:540,y:1250+Math.sin(t*29)*5,z:1.35},{GY:1450,world:(c2,GY)=>{
    for(let i=0;i<5;i++){c2.fillStyle='rgba(200,130,40,0.9)';c2.fillRect(650+i*40+Math.sin(t*22+i)*4,GY-920,26,920);}
    const M=[['mournW',160,1.15,1],['mournM',350,1.0,1],['mournW',760,1.0,-1],['mournM',940,1.15,-1]];for(const [k,x,s,f] of M)BW(c2,k,x,GY+40,s,t,{f,eyes:'shock',brow:'worried',mouth:'o',look:[0,-1],seed:x});
    floodSurf(c2,t,-1500,2600,GY+80-lv*230,GY+1500,{flow:250});for(const x of [250,830])candle(c2,x,GY-lv*230+60,1.3,t,1-clamp(u/0.9),x);}});
  c.fillStyle=`rgba(0,0,0,${clamp((t-A(18)-1.1)/0.7)*0.6})`;c.fillRect(0,0,W,H);counterCard(c,540,440,back(clamp((t-TW('five')+0.1)/0.3)),'5','MOURNERS DROWNED',RED_C);vignette(c,0.6);};
// ---------------- 22 · "Rescuers dug through the wreckage for hours." ----------------
SH.rescue=function(c,t){LIT('#ffc070','#1a1820');const t0=A(19)-0.05;londonSt(c,t,{x:540,y:1000,z:pushZ(t,t0,A(20),1.0,1.08)},{GY:1220,night:1,poor:1,lamps:false,world:(c2,GY)=>{
    rubble(c2,560,GY+330,1100,t,5);const dig=Math.sin(t*5);
    BW(c2,'rescuer',250,GY+420,1.25,t,{f:1,crouch:20+dig*8,lean:0.25,hf:[70,60+dig*10],hb:[40,70],eyes:'angry',brow:'worried',mouth:'grit',seed:2});shovel(c2,250+70*1.25,GY+420-200*1.25+60*1.25+dig*12,1.25,0.5);
    BW(c2,'rescuer',830,GY+450,1.3,t,{f:-1,hf:[-50,-60],eyes:'open',brow:'worried',mouth:'flat',seed:4});const L=handAt(830,GY+450,1.3,[-50,-60]);lantern(c2,L.x,L.y,1.3,t);
    BW(c2,'poorM2',560,GY+600,1.45,t,{f:1,crouch:40,lean:0.3,hf:[50,90],hb:[30,96],eyes:'open',brow:'worried',mouth:'grit',seed:6});
    floodSurf(c2,t,-1500,2600,GY+560,GY+1400,{flow:40,top:'#8a5a24'});}});tag(c,540,420,'FOR HOURS',GOLD_C,t,TW('hours')-0.3);vignette(c,0.5);};
// ---------------- 23 · "So who paid for it?" ----------------
SH.who=function(c,t){LIT('#ffe0b0','#2a1a10');const t0=A(20)-0.05;court(c,t,{x:540,y:960,z:1.0,blur:5},{GY:1450,world:(c2,GY)=>{jurybox(c2,-200,1300,GY+200,320);}});c.fillStyle='rgba(10,6,4,0.35)';c.fillRect(0,0,W,H);
  moneyBag(c,540,1200,1.6);bigQB(c,540,640,back(clamp((t-TW('paid')+0.1)/0.35)),t);vignette(c,0.5);};
// ---------------- 24 · "Nobody." an empty dock in a spotlight ----------------
SH.nobody=function(c,t){LIT('#ffe0b0','#2a1a10');court(c,t,{x:540,y:1000,z:1.05},{GY:1450,world:(c2,GY)=>{c2.fillStyle='rgba(0,0,0,0.55)';c2.fillRect(-1500,-1000,4000,4000);
    c2.save();c2.globalCompositeOperation='lighter';const g=c2.createRadialGradient(540,GY+80,20,540,GY+80,520);g.addColorStop(0,'rgba(255,230,180,0.5)');g.addColorStop(1,'rgba(255,200,140,0)');c2.fillStyle=g;c2.beginPath();c2.moveTo(470,-200);c2.lineTo(610,-200);c2.lineTo(900,GY+260);c2.lineTo(180,GY+260);c2.closePath();c2.fill();c2.restore();
    // empty chair
    c2.fillStyle='#5a3418';c2.strokeStyle=K2;c2.lineWidth=5;c2.fillRect(440,GY-280,200,230);c2.strokeRect(440,GY-280,200,230);c2.fillRect(420,GY-60,240,30);c2.strokeRect(420,GY-60,240,30);for(const x of [430,640])c2.fillRect(x,GY-30,14,140);}});
  tag(c,540,420,'NO ONE',RED_C,t,A(21)-0.05);vignette(c,0.55);};
// ---------------- 25 · "A jury ruled it an accident." ----------------
SH.jury=function(c,t){LIT('#ffe0b0','#2a1a10');const t0=A(22)-0.05;court(c,t,{x:540,y:1000,z:1.05},{GY:1450,world:(c2,GY)=>{
    for(let i=0;i<5;i++)BW(c2,i%2?'juror2':'juror',130+i*205,GY-60,0.85,t,{f:i<2?1:-1,eyes:'open',brow:'flat',mouth:'flat',seed:i});
    jurybox(c2,0,1080,GY+40,230);const up=clamp((t-TW('ruled')+0.3)/0.4);BW(c2,'juror2',540,GY+380-up*0,1.35,t,{f:1,eyes:'closed',brow:'up',mouth:'flat',hf:up>0?[50,-20]:[38,90],seed:9});}});
  stamp(c,540,520,'ACCIDENT',clamp((t-TW('accident')+0.1)/0.5));vignette(c,0.45);};
// ---------------- 26 · "And the brewery?" the owner in front of the brewery ----------------
SH.owner=function(c,t){LIT('#ffe0b0','#3a2a20');const t0=A(23)-0.05;londonSt(c,t,{x:540,y:1050,z:pushZ(t,t0,A(24),1.15,1.3)},{GY:1350,lamps:false,world:(c2,GY)=>{breweryFront(c2,t,GY);
    BW(c2,'owner',540,GY+520,1.7,t,{f:1,eyes:'sly',brow:'sly',mouth:'smirk',hf:[40,60],seed:4});}});tag(c,540,420,'MEUX & CO. · THE OWNERS',GOLD_C,t,A(23));vignette(c,0.45);};
// ---------------- 27 · "The government gave it back the tax it had paid on all the lost beer." ----------------
SH.tax=function(c,t){LIT('#ffe8c0','#2a2018');const t0=A(24)-0.05,u=t-t0;const pk=eio(clamp((t-TW('gave')+0.1)/0.9));treasury(c,t,{x:540,y:1300,z:1.4},{GY:1450,world:(c2,GY)=>{
    BW(c2,'official',330,GY+20,1.2,t,{f:1,eyes:'open',brow:'flat',mouth:'flat',hf:[90,70],seed:3});
    BW(c2,'owner',880,GY+180,1.35,t,{f:-1,eyes:t>TW('back')?'happy':'sly',brow:'up',mouth:'smile',hf:[-80,40],seed:4});
    desk(c2,-20,1100,GY+260,200,{});c2.fillStyle='#f2ead8';c2.strokeStyle=K2;c2.lineWidth=3;c2.save();c2.translate(300,GY+30);c2.rotate(-0.04);c2.fillRect(-130,-24,260,48);c2.strokeRect(-130,-24,260,48);c2.fillStyle='#3a2a1a';c2.font='700 22px "Lora",serif';c2.textAlign='center';c2.fillText('EXCISE DUTY · BEER',0,8);c2.restore();
    moneyBag(c2,lerp(380,760,pk),GY+50,1.0);for(let i=0;i<10;i++){const a=clamp(u*1.2-i*0.12);if(a<=0)continue;coin(c2,lerp(380,780,a)+hash(i)*40,GY+40-Math.sin(a*Math.PI)*120,20,t*8+i);}}});
  stamp(c,540,470,'TAX REFUNDED',clamp((t-TW('tax')+0.1)/0.5),'#3aff7a',-0.08);vignette(c,0.4);};
// ---------------- 28 · "Eight people died…" ----------------
SH.died=function(c,t){LIT('#a8b8ff','#22222e');const t0=A(25)-0.05;londonSt(c,t,{x:540,y:960,z:pushZ(t,t0,A(26),1.0,1.06)},{GY:1200,night:1,poor:1,world:(c2,GY)=>{floodSurf(c2,t,-1500,2600,GY+60,GY+1400,{flow:40,top:'#8a5a24'});rubble(c2,300,GY+200,600,t,1);}});
  eightCandles(c,t,t0-1,1660,1.5);counterCard(c,540,440,back(clamp((t-TW('eight',1)+0.1)/0.3)),'8','DEAD',RED_C);vignette(c,0.55);};
// ---------------- 29 · "and the brewery got a refund." split: candles vs money ----------------
SH.refund=function(c,t){LIT('#ffe8c0','#2a2018');const t0=A(26)-0.05,u=t-t0;
  c.save();c.beginPath();c.rect(0,0,540,H);c.clip();c.fillStyle='#14141e';c.fillRect(0,0,540,H);eightCandlesHalf(c,t);c.restore();
  c.save();c.beginPath();c.rect(540,0,540,H);c.clip();const g=c.createRadialGradient(810,1100,50,810,1100,800);g.addColorStop(0,'#ffcf5a');g.addColorStop(1,'#8a4a10');c.fillStyle=g;c.fillRect(540,0,540,H);
    for(let i=0;i<20;i++){const a=(u*0.6+hash(i))%1;coin(c,560+hash(i*3)*500,-60+a*2000,22,t*6+i);}
    BW(c,'owner',810,1620,1.7,t,{f:-1,eyes:'happy',brow:'up',mouth:'smile',hf:[-40,20],seed:4});moneyBag(c,810-40*1.7-30,1620-200*1.7+20*1.7+60,1.1);c.restore();
  c.strokeStyle='#fff';c.lineWidth=10;seg(c,540,0,540,H);c.save();c.translate(810,560);c.scale(0.7,0.7);stamp(c,0,0,'REFUND',clamp((t-TW('refund')+0.1)/0.5),'#3aff7a',-0.1);c.restore();
  const f=clamp((t-(END-1.8))/1.7);vignette(c,0.45);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
function eightCandlesHalf(c,t){for(let i=0;i<8;i++){const x=110+(i%4)*110,y=1150+Math.floor(i/4)*260;candle(c,x,y,1.5,t,1,i);}txt(c,'8 DEAD',270,760,100,'#fff',{sw:16});}
var SHOTS=[[0,'hook'],[A(1)-0.05,'wave'],[A(2)-0.05,'eight'],[A(3)-0.05,'brewery'],[A(4)-0.05,'vat'],[TW('held')-0.1,'barrels'],[A(5)-0.05,'hoops'],[A(6)-0.05,'date'],[A(7)-0.05,'snap'],[A(8)-0.05,'calm'],
  [A(9)-0.05,'hour'],[TW('the',0)>0?TW('whole')-0.15:0,'explode'],[A(10)-0.05,'chain'],[A(11)-0.05,'another'],[A(12)-0.05,'wall'],[A(13)-0.05,'street'],[A(14)-0.05,'slum'],[A(15)-0.05,'crush'],[TW('flooded')-0.1,'cellars'],[A(16)-0.05,'basement'],
  [A(17)-0.05,'wake'],[A(18)-0.05,'drowned'],[A(19)-0.05,'rescue'],[A(20)-0.05,'who'],[A(21)-0.05,'nobody'],[A(22)-0.05,'jury'],[A(23)-0.05,'owner'],[A(24)-0.05,'tax'],[A(25)-0.05,'died'],[A(26)-0.05,'refund']];
var IMPACTS=[[0.02,10,0.3,'#ffffff',0.3],[TW('snapped')-0.08,10,0.3],[TW('exploded')-0.05,16,0.6,'#ffe0b0',0.4],[TW('smashed')-0.05,12,0.5],[TW('another')-0.1,12,0.5],[TW('burst')-0.05,14,0.5,'#ffffff',0.3],[TW('crushed')-0.05,12,0.4],[A(21),6,0.25]];
