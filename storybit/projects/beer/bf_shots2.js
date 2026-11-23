'use strict';
// ===================== flood shots rebuilt on the depth-sorted flood engine =====================
function mkF(c2,GY,o){const F=Object.assign({c:c2,GY,yb:2150,x0:-320,x1:1420,step:18,rows:40,Hmax:820,flow:320,spray:1,dir:1,inkFrom:38,vk:0.68},o);F.step2=F.step;return F;}
// ---- 1 · "a wave of beer taller than a house smashed through London…" ----
SH.wave=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(1)-0.05;const FV=470;const xF=tt=>lerp(-260,1500,clamp((tt-t0)/3.7));const sh=4+6*clamp((t-t0)/1.5);
  londonSt(c,t,{x:540+Math.sin(t*37)*sh,y:1000+Math.cos(t*29)*sh,z:1.0},{GY:1250,world:(c2,GY)=>{
    const F=mkF(c2,GY,{foamV:FV,flow:FV*0.6});F.H=boreH({GY,skew:0.4,xF,Hf:660,Hd:230,L:300,toe:170,faceW:120});F.runup={xF,Hf:700,Hd:230};
    F.actors=[sweptPerson(F,'poorM2',-40,GY+250,t,{t0,seed:3,vr:230,vf:200}),sweptPerson(F,'poorW',260,GY+430,t,{t0,seed:4,vr:250,vf:210}),sweptPerson(F,'poorM',600,GY+330,t,{t0,seed:5,vr:270,vf:190}),sweptPerson(F,'poorW2',880,GY+520,t,{t0,seed:6,vr:300,vf:220}),
      floater(F,'barrel',-500,GY+300,t-t0,{v:330}),floater(F,'stave',-700,GY+480,t-t0,{v:320,spin:1.5}),floater(F,'stave',-900,GY+180,t-t0,{v:300,spin:-1})];
    floodField(c2,t,F);}});tag(c,540,420,'TALLER THAN A HOUSE',GOLD_C,t,TW('taller'));vignette(c,0.4);};
// ---- 15 · "A fifteen-foot wave tore into St Giles," ----
SH.street=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(13)-0.05;const xF=tt=>lerp(-200,1250,clamp((tt-t0)/3.0));
  londonSt(c,t,{x:540+Math.sin(t*33)*6,y:1000+Math.cos(t*27)*5,z:1.0},{GY:1250,poor:1,world:(c2,GY)=>{
    c2.fillStyle='#e8e0cc';c2.strokeStyle=K2;c2.lineWidth=4;c2.fillRect(620,GY-560,300,80);c2.strokeRect(620,GY-560,300,80);c2.fillStyle='#1a1a1a';c2.font='900 44px "Lora",serif';c2.textAlign='center';c2.fillText('ST GILES',770,GY-506);
    const F=mkF(c2,GY,{foamV:480,flow:300});F.H=boreH({GY,skew:0.4,xF,Hf:660,Hd:240,L:300,toe:160,faceW:110});F.runup={xF,Hf:720,Hd:240};
    F.actors=[sweptPerson(F,'poorW',420,GY+380,t,{t0,seed:7,vr:240,vf:200}),sweptPerson(F,'poorM',820,GY+250,t,{t0,seed:8,vr:260,vf:190}),floater(F,'barrel',-400,GY+420,t-t0,{v:340}),floater(F,'stave',-650,GY+260,t-t0,{v:330,spin:1.2})];
    floodField(c2,t,F);const fx=xF(t)+(GY+500-GY)*0.15+110;measure(c2,Math.min(1000,fx-60),GY+500,GY+500-660*0.68*sAtY(GY,GY+500),'15 FT',clamp((t-TW('fifteen-foot'))/0.5));}});vignette(c,0.4);};
// ---- 17 · "It crushed homes" the surge slams a house front, it buckles and goes down into the flood ----
SH.crush=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(15)-0.05,tb=TW('crushed')-0.1,ck=clamp((t-tb)/1.2);const sh=t>tb&&t<tb+0.5?(1-(t-tb)/0.5):0;const xF=tt=>lerp(-300,1500,clamp((tt-tb+0.55)/1.9));
  londonSt(c,t,{x:540+Math.sin(t*63)*20*sh,y:1000,z:1.0},{GY:1250,poor:1,houseH:0,lamps:false,world:(c2,GY)=>{
    for(let i=0;i<6;i++){const hy=GY-900+i*150,fall=clamp(ck*1.4-i*0.07);c2.save();c2.translate(260+fall*(i%2?150:60),hy+fall*fall*760);c2.rotate(fall*(i%2?0.7:0.45));brickWall(c2,0,0,560,150,'#7a4a36',{bh:22,bw:56});c2.strokeStyle=K2;c2.lineWidth=4;c2.strokeRect(0,0,560,150);if(i>0&&i<5)sash(c2,80,26,90,100,0,{broken:1}),sash(c2,380,26,90,100,0,{broken:1});c2.restore();}
    if(ck>0.35)for(let i=0;i<10;i++){const a=clamp(ck*1.5-0.4-i*0.04);const x=300+i*60+a*300,y=GY-200+a*a*500-Math.sin(a*Math.PI)*200;c2.save();c2.translate(x,y);c2.rotate(a*5+i);c2.fillStyle='#8a4a32';c2.strokeStyle=K2;c2.lineWidth=2;c2.fillRect(-18,-9,36,18);c2.strokeRect(-18,-9,36,18);c2.restore();}
    const F=mkF(c2,GY,{foamV:900,flow:400});F.H=boreH({GY,skew:0.4,xF,Hf:560,Hd:170,L:260});F.runup={xF,Hf:900,Hd:170};F.actors=[floater(F,'stave',-200,GY+300,t-t0,{v:360,spin:2}),floater(F,'stave',-500,GY+520,t-t0,{v:350,spin:-1.5}),floater(F,'barrel',-800,GY+400,t-t0,{v:330})];floodField(c2,t,F);}});
  FW(c,t,tb,0.15);vignette(c,0.45);};
// ---- 14 · "Over a million litres of beer burst through the brewery wall." cracks spurt, the wall gives way, the torrent comes at us ----
SH.wall=function(c,t){LIT('#ffd0a0','#3a2a28');const t0=A(12)-0.05,tb=TW('burst')-0.05,bk=clamp((t-tb)/1.2);const sh=t>tb&&t<tb+0.7?(1-(t-tb)/0.7):(t<tb?0.25*clamp((t-t0)/1.5):0);
  londonSt(c,t,{x:540+Math.sin(t*59)*22*sh,y:1000+Math.cos(t*47)*16*sh,z:1.0},{GY:1300,lamps:false,houseH:0,world:(c2,GY)=>{
    // the brewery's back wall across the lane, bulging, cracking, spurting — then a hole
    brickWall(c2,-400,GY-1450,1880,1450,'#6a3e2a',{bh:30,bw:72});c2.strokeStyle=K2;c2.lineWidth=6;c2.strokeRect(-400,GY-1450,1880,1450);
    const hole=bk>0?eo(bk):0;const cr=clamp((t-t0)/(tb-t0));c2.strokeStyle='rgba(20,10,4,0.9)';c2.lineWidth=5;for(let i=0;i<9;i++){const a=hash(i*3.1)*TAU,L=(120+hash(i)*260)*cr;c2.beginPath();c2.moveTo(540,GY-420);let x=540,y=GY-420;for(let k=1;k<=5;k++){x+=Math.cos(a+(hash(i*k)-0.5))*L/5;y+=Math.sin(a+(hash(i+k)-0.5))*L/5;c2.lineTo(x,y);}c2.stroke();}
    if(hole>0){const hp=()=>{c2.beginPath();for(let i=0;i<=24;i++){const a=i/24*TAU,r=(160+hash(i)*70)*hole*2.4;c2.lineTo(540+Math.cos(a)*r*1.25,GY-420+Math.sin(a)*r*0.9);}c2.closePath();};
      const hg=c2.createRadialGradient(540,GY-420,20,540,GY-420,600*hole);hg.addColorStop(0,LQ.thin);hg.addColorStop(0.6,LQ.mid);hg.addColorStop(1,LQ.deep);hp();c2.fillStyle=hg;c2.fill();c2.strokeStyle=K2;c2.lineWidth=5;c2.stroke();
      for(let i=0;i<24;i++){const a=i/24*TAU+t*0.5,r=(160+hash(i)*70)*hole*2.4;whitewater(c2,t,540+Math.cos(a)*r*1.18,GY-420+Math.sin(a)*r*0.85,(22+hash(i)*20)*(0.5+hole),i,0.95);}
      for(let i=0;i<5;i++){const a=hash(i*7)*TAU;spray(c2,t,540+Math.cos(a)*200*hole,GY-420+Math.sin(a)*150*hole,10,500*hole,300*hole,Math.cos(a)>0?1:-1,i);}}
    // jets forced out through the cracks before it gives way
    if(t<tb+0.3)for(let i=0;i<6;i++){const a=hash(i*3.1)*TAU,L=(80+hash(i)*200)*cr;const jx=540+Math.cos(a)*L,jy=GY-420+Math.sin(a)*L*0.8;jet(c2,t,jx,jy,(jx<540?-1:1)*(220+hash(i*5)*260),-80+hash(i*7)*120,(14+hash(i)*14)*Math.min(1,cr*1.4)*(1-clamp((t-tb)/0.3)),{T:0.62,sd:i});}
    // the torrent pouring out toward the camera
    const fy=lerp(GY-60,2250,eo(clamp((t-tb)/1.5)));const F=mkF(c2,GY,{inkFrom:36,flow:0,spray:0,flowZ:9,src:[540,GY-420]});
    F.H=(x,yg,tt)=>{if(t<tb)return 0;const dy=fy-yg,wid=lerp(500,2600,clamp((t-tb)/1.1))+(yg-GY)*1.6,lat=1-Math.pow(Math.abs(x-540)/(wid/2),6);if(lat<=0||dy<-140)return 0;
      let h=dy<0?26*(1+dy/140):dy<100?760*Math.pow(dy/100,0.55):240+520*Math.exp(-(dy-100)/300);return h*Math.min(1,lat*1.5)+Math.sin(x*0.03+tt*8+yg*0.04)*22+Math.sin(x*0.011-tt*5)*30;};
    if(hole>0)pour(c2,t,540,GY-330,GY,420*hole,{spread:0.9,sd:3});
    floodField(c2,t,F);
    if(bk>0)for(let i=0;i<34;i++){const a=hash(i*1.3)*TAU,sp=0.5+hash(i*2.1),r=bk*1300*sp;const x=540+Math.cos(a)*r,y=GY-420+Math.sin(a)*r*0.7+bk*bk*900,sc=1+bk*2.5*sp;c2.save();c2.translate(x,y);c2.rotate(bk*6*sp+i);c2.fillStyle=['#8a4a32','#7a3e2a','#9a5a3e'][i%3];c2.strokeStyle=K2;c2.lineWidth=2;c2.fillRect(-18*sc,-9*sc,36*sc,18*sc);c2.strokeRect(-18*sc,-9*sc,36*sc,18*sc);c2.restore();}}});
  const v=Math.round(eo(clamp((t-TW('million')+0.2)/0.9))*1000000);counterCard(c,540,440,back(clamp((t-TW('million')+0.3)/0.3)),(v>=1000000?'1,000,000+':v.toLocaleString('en-US')),'LITRES OF BEER',GOLD_C);FW(c,t,tb,0.2);vignette(c,0.4);};
// ---- brewery floor flood from bursting vats: radial surge from the vat base ----
function vatFlood(c2,GY,xc,t,tb,o={}){const R=o.R??2400,dur=o.dur??1.4;const F=mkF(c2,GY,{flow:0,spray:0,inkFrom:36,Hmax:700});const rr=tt=>lerp(o.r0??300,R,eo(clamp((tt-tb)/dur)));
  F.H=(x,yg,tt)=>{if(tt<tb)return 0;const d=Math.hypot(x-xc,(yg-GY)*2.4),dy=rr(tt)-d;if(dy<-150)return 0;let h=dy<0?24*(1+dy/150):dy<100?(o.Hf??700)*Math.pow(dy/100,0.55):(o.Hd??330)+((o.Hf??700)-(o.Hd??330))*Math.exp(-(dy-100)/400);
    return h+Math.sin(x*0.03+tt*8+yg*0.04)*16+Math.sin(x*0.012-tt*5)*24;};return F;}
SH.explode=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('exploded')-0.05,bk=clamp((t-tb)/1.6);const sh=t>tb&&t<tb+0.7?(1-(t-tb)/0.7):0;
  breweryIn(c,t,{x:560+Math.sin(t*61)*24*sh,y:1000+Math.cos(t*53)*20*sh,z:1.15-bk*0.08},{GY:1500,world:(c2,GY)=>{vat(c2,560,GY,1060,1260,t,{snap:3,snapK:1,strain:t<tb?clamp((t-tb+0.7)/0.7):0,burst:bk});
    const F=vatFlood(c2,GY,560,t,tb+0.12,{Hf:700});F.actors=[sweptPerson(F,'brewer',150,GY+120,t,{t0:A(9),vr:0,dir:-1,seed:2,vf:260}),floater(F,'stave',200,GY+260,t-tb,{v:-260,spin:2})];floodField(c2,t,F);}});
  FW(c,t,tb,0.25);vignette(c,0.45);};
SH.chain=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('smashed')-0.05,bk=clamp((t-tb)/1.5);const sh=t>tb&&t<tb+0.6?(1-(t-tb)/0.6):0;
  breweryIn(c,t,{x:620+Math.sin(t*61)*20*sh,y:960,z:0.82},{GY:1450,world:(c2,GY)=>{vat(c2,-120,GY,800,950,t,{burst:1});vat(c2,820,GY,800,950,t,{burst:bk,ladder:false});
    const F=mkF(c2,GY,{flow:300,spray:1,inkFrom:36,Hmax:700});const xF=tt=>lerp(-300,1000,clamp((tt-A(10)+0.4)/1.0));const B=boreH({GY,skew:0.4,xF,Hf:640,Hd:380,L:380,toe:150,faceW:110});const V=vatFlood(c2,GY,820,t,tb+0.1,{Hf:700,r0:200});
    F.H=(x,yg,tt)=>Math.max(B(x,yg,tt),V.H(x,yg,tt));F.actors=[floater(F,'barrel',-200,GY+220,t-A(10),{v:320}),floater(F,'stave',-400,GY+380,t-A(10),{v:330,spin:1.6})];floodField(c2,t,F);}});FW(c,t,tb,0.2);vignette(c,0.45);};
SH.another=function(c,t){LIT('#ffd8a8','#2a1a10');const tb=TW('another')-0.1,bk=clamp((t-tb)/1.2);const sh=t>tb&&t<tb+0.6?(1-(t-tb)/0.6):0;
  breweryIn(c,t,{x:540+Math.sin(t*57)*24*sh,y:960+Math.cos(t*49)*18*sh,z:1.0},{GY:1450,world:(c2,GY)=>{
    const F0=mkF(c2,GY,{flow:300,spray:0,inkFrom:40,Hmax:600});F0.H=(x,yg,tt)=>300+Math.sin(x*0.02+tt*6+yg*0.05)*25+Math.sin(x*0.007-tt*3)*30;
    vat(c2,560,GY,900,1050,t,{burst:bk});const V=vatFlood(c2,GY,560,t,tb+0.08,{Hf:700,Hd:420,r0:250});F0.H=((h0)=>(x,yg,tt)=>Math.max(h0(x,yg,tt),V.H(x,yg,tt)))(F0.H);
    F0.actors=[floater(F0,'barrel',-300,GY+300,t-A(11),{v:260}),floater(F0,'stave',100,GY+150,t-A(11),{v:280,spin:1})];floodField(c2,t,F0);}});FW(c,t,tb,0.2);
  counterCard(c,540,420,back(clamp((t-tb)/0.3)),'3','VATS BURST',RED_C);vignette(c,0.45);};
// ---- 18 · cutaway: beer jets through the pavement grating and pours down the cellar steps; the family is caught as it rises ----
SH.cellars=function(c,t){LIT('#ffd0a0','#2a2018');const t0=TW('flooded')-0.1,u=t-t0,lv=clamp((u-0.25)/2.6);c.fillStyle='#14100c';c.fillRect(0,0,W,H);
  const SY=760;const g=c.createLinearGradient(0,0,0,SY);g.addColorStop(0,'#3a3a4e');g.addColorStop(1,'#a87a5a');c.fillStyle=g;c.fillRect(0,0,W,SY);townhouse(c,-60,SY,1200,700,t,{fl:2,poor:1,col:'#7a4a36',door:1,seed:9});
  floodSurf(c,t,-100,1200,SY-170,SY,{flow:300});
  c.fillStyle='#4a3a2e';c.fillRect(0,SY,W,60);c.fillStyle='#3a2e26';c.fillRect(60,SY+60,960,760);for(let r=0;r<8;r++)for(let k=0;k<7;k++){c.fillStyle=`rgba(${hash(r*7+k)>0.5?'90,74,60':'70,58,48'},0.6)`;c.fillRect(70+k*140+(r%2?70:0),SY+70+r*94,132,88);}
  c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(60,SY+60,960,760);
  // steps down from a street door (left) — beer cascades down them
  const steps=[];for(let i=0;i<7;i++)steps.push([60,170+i*34,SY+120+i*95]);c.fillStyle='#4a3a2c';for(const [a,b,y] of steps){c.fillRect(a,y,b-a,95);c.strokeStyle='#1a120c';c.lineWidth=3;c.strokeRect(a,y,b-a,95);}
  const fy=SY+810-lv*360;c.save();c.beginPath();c.rect(60,SY+60,960,760);c.clip();
  cascade(c,t,steps,clamp(u/1.2));c.fillStyle='#1a1a1e';c.fillRect(780,SY+50,170,20);
  pour(c,t,865,SY+66,fy,150,{spread:0.55,sd:2});jet(c,t,800,SY+64,-260,-60,14,{T:0.3,sd:1});jet(c,t,930,SY+64,260,-60,14,{T:0.3,sd:3});
  const fam=[['poorW',380,1.25,1,'shock','worried','o'],['poorM',560,1.4,-1,'wide','worried','scream'],['poorW2',700,0.95,-1,'wide','worried','o']];
  for(const [k,x,s,f,e,b,m] of fam){const xx=x-lv*60,lift=Math.max(0,(SY+810-fy)-150*s)*0.6;BW(c,k,xx,SY+810-lift,s,t,{f,eyes:e,brow:b,mouth:m,seed:x,look:[0.8,-0.5],hf:lv>0.3?[40*f,-150+Math.sin(t*7+x)*20]:undefined});}
  floodSurf(c,t,60,1020,fy,SY+830,{flow:-160,dir:-1,refl:0.25,a:0.86});for(const [k,x,s] of fam)whitewater(c,t,x-lv*60,fy+4,24*s,x,0.9);c.restore();
  tag(c,540,300,'WHOLE FAMILIES LIVED HERE',GOLD_C,t,TW('families')-0.3);vignette(c,0.4);};
// ---- 21 · "Five of them drowned." beer bursts through the window and down the stairs; the level climbs up the mourners ----
SH.drowned=function(c,t){LIT('#ffc890','#1a1410');const t0=A(18)-0.05,u=t-t0,lv=clamp(u/1.8);cellar(c,t,{x:540,y:1250+Math.sin(t*29)*5,z:1.35},{GY:1450,world:(c2,GY)=>{
    const surf=GY+80-lv*300;
    jet(c2,t,700,GY-960,-60,120,70,{T:0.62,sd:4,splash:false});jet(c2,t,800,GY-960,40,150,60,{T:0.6,sd:5,splash:false});
    const steps=[];for(let i=0;i<9;i++)steps.push([-460+i*42,60,GY-560+i*62]);cascade(c2,t,steps,clamp(u/0.9));
    const M=[['mournW',160,1.15,1],['mournM',350,1.0,1],['mournW',760,1.0,-1],['mournM',940,1.15,-1]];
    for(const [k,x,s,f] of M){const fl=Math.max(0,(GY+40-surf)-200*s)*0.8;BW(c2,k,x,GY+40-fl+Math.sin(t*3+x)*4*lv,s,t,{f,eyes:lv>0.6?'squeeze':'shock',brow:'worried',mouth:lv>0.6?'gulp':'o',look:[0,-1],seed:x,hf:[40*f+Math.sin(t*8+x)*20,-150+Math.cos(t*7+x)*20],hb:[-40*f,lv>0.4?-90:94]});}
    floodSurf(c2,t,-1500,2600,surf,GY+1500,{flow:-160,dir:-1,a:0.86,refl:0.28});for(const x of [740,830])splash(c2,t,x,surf,1.4,0.95,x);for(const [k,x,s] of M){whitewater(c2,t,x,surf+4,30*s,x,0.92);if(Math.sin(t*8+x)>0.2)spray(c2,t,x+30,surf-20,6,90,110,1,x);}
    for(const x of [250,830])candle(c2,x,surf+60,1.3,t,1-clamp(u/0.9),x);}});
  c.fillStyle=`rgba(0,0,0,${clamp((t-A(18)-1.1)/0.7)*0.6})`;c.fillRect(0,0,W,H);counterCard(c,540,440,back(clamp((t-TW('five')+0.1)/0.3)),'5','MOURNERS DROWNED',RED_C);vignette(c,0.6);};
