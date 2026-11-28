// ===== Agent GARBO v2 · real-world scale (1 m = 160*s px), lenses, OTS / back angles =====
Object.assign(KIND2,{hitB:{coat:'#5a5242',limb:'#ecebe6',hat:'none',long:true},harris:{coat:'#3e4450',limb:'#ecebe6',hat:'none',long:true,tie:'#2a3a6a'}});
KIND2.intelnh.tie='#5a1a1a';KIND2.intel2.tie='#3a3020';
const M=s=>160*s; // pixels per metre for a figure of scale s
function pPen2(){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(-0.5*f);c.fillStyle='#1a1a1c';c.strokeStyle=K2;c.lineWidth=1.6*s;rr(c,-2*s,-22*s,4*s,24*s,1.5*s);c.fill();c.stroke();c.fillStyle='#d8b450';c.fillRect(-2*s,-22*s,4*s,3*s);c.restore();}}
function pSlip(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*8*s,h.y-14*s);c.rotate(-0.15*f);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(-17*s,-12*s,34*s,24*s);c.strokeRect(-17*s,-12*s,34*s,24*s);c.fillStyle='rgba(0,0,0,0.35)';for(let i=0;i<3;i++)c.fillRect(-13*s,(-6+i*6)*s,26*s,1.6*s);c.restore();}}
function pA4(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*10*s,h.y-18*s);c.rotate(-0.1*f);const w=34*s,hh=46*s;c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=2.2*s;c.fillRect(-w/2,-hh/2,w,hh);c.strokeRect(-w/2,-hh/2,w,hh);c.fillStyle='#a81c1c';c.fillRect(-w/2+4*s,-hh/2+4*s,w-8*s,4*s);c.fillStyle='rgba(0,0,0,0.3)';for(let i=0;i<5;i++)c.fillRect(-w/2+4*s,-hh/2+13*s+i*6*s,w-8*s,1.5*s);c.restore();}}
// desk seen from the front-above; returns the back-edge y so figures can be cut there
function desk(c,yb,o={}){const g=c.createLinearGradient(0,yb,0,H);g.addColorStop(0,o.c0||'#6a4428');g.addColorStop(1,o.c1||'#24160c');c.fillStyle=g;c.fillRect(-100,yb,W+200,H-yb+100);
  c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=3;for(let i=0;i<7;i++){const y=yb+30+i*i*14;seg(c,-100,y,W+100,y+8);}
  c.fillStyle='rgba(255,215,160,0.35)';c.fillRect(-100,yb,W+200,4);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(-100,yb+4,W+200,6);return yb;}
// flat object lying on the desk: foreshortened (perspective squash)
function onDesk(c,x,y,w,h,rot,fn,sq=0.55){c.save();c.translate(x,y);c.scale(1,sq);c.rotate(rot);c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-w/2+8,-h/2+10,w,h);fn(w,h);c.restore();}
function sheet(w,h,c,n=6,head){c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-w/2,-h/2,w,h);c.strokeRect(-w/2,-h/2,w,h);if(head){c.fillStyle='#a81c1c';c.fillRect(-w/2+w*0.1,-h/2+h*0.07,w*0.8,h*0.05);}c.fillStyle='rgba(0,0,0,0.3)';for(let i=0;i<n;i++)c.fillRect(-w/2+w*0.1,-h/2+h*0.2+i*h*0.11,w*(i===n-1?0.5:0.8),Math.max(2,h*0.018));}
function bgRoom(c,t,o={}){room(c,t,{table:false,...o});if(o.lamp)deskLamp(c,o.lamp[0],o.lamp[1],o.lamp[2]||1);}
function giantHand(c,x,y,a,s,col){ // a forearm entering frame: sleeve + white hand, hand radius ~0.05 m
  c.save();c.translate(x,y);c.rotate(a);c.lineCap='round';c.strokeStyle=K2;c.lineWidth=124*s;seg(c,0,0,-900*s,0);c.strokeStyle=col;c.lineWidth=112*s;seg(c,0,0,-900*s,0);c.strokeStyle='rgba(255,220,180,0.25)';c.lineWidth=16*s;seg(c,-30*s,-40*s,-900*s,-40*s);
  c.fillStyle='#ecebe6';c.strokeStyle=K2;c.lineWidth=6*s;c.beginPath();c.ellipse(-10*s,0,40*s,58*s,0,0,TAU);c.fill();c.stroke();
  const g=c.createRadialGradient(40*s,-20*s,6*s,50*s,0,70*s);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#a8a49c');c.fillStyle=g;c.beginPath();c.ellipse(50*s,0,58*s,50*s,0,0,TAU);c.fill();c.stroke();
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=4*s;for(let i=-1;i<=1;i++)seg(c,70*s,i*18*s,98*s,i*18*s);c.restore();}
SH={};
SH.a=function(c,t){ // hook: low medium-wide, phantom spies behind in soft focus
  L2={dx:-1,rim:'#ffb35a',amb:'#6a4a30'};const z=lerp(1.0,1.1,inv(0,B(0),t));
  push(c,z,W/2,1200,()=>{dof(c,3.5,d=>{bgRoom(d,t,{dark:0.55});const fl=d.createLinearGradient(0,1500,0,H);fl.addColorStop(0,'#2a1e16');fl.addColorStop(1,'#0c0806');d.fillStyle=fl;d.fillRect(0,1500,W,H);
      for(let i=0;i<27;i++){const r=Math.floor(i/9),k=i%9;const x=80+k*115+(r%2)*55,y=1560-r*90;const a=inv(WT(0,3)+i*0.025,WT(0,3)+i*0.025+0.3,t)*(1-inv(WT(0,7),B(0)+0.3,t));if(a<=0)continue;
        d.save();d.globalAlpha=a*(0.75-r*0.15);fig2(d,{x,y,s:1.25-r*0.18,f:k<4?1:-1,t,kind:'gspy',ghost:'rgba(150,128,100,1)',ga:1});d.restore();}
      if(t>WT(0,7)){const q=inv(WT(0,7),B(0)+0.5,t);d.save();for(let i=0;i<10;i++){d.globalAlpha=Math.sin(q*Math.PI)*0.6;d.drawImage(SPR.fog,i*110-60-q*80,1150+hash(i)*250-q*120,320,150);}d.restore();}});
    fig2(c,{x:540,y:2120,s:3.5,f:1,t,kind:'garbo',stache:true,eyes:t>WT(0,1)?'sly':'open',brow:'sly',mouth:t>WT(0,1)?'smirk':'flat',hf:[30,30],propF:pPen2(),castLen:0});});
  screenLights(c,[{x:420,y:500,on:1,r:800,hr:1300}],0.42);vignette(c,0.55);specks(c,t,25);
};
SH.b=function(c,t){ // one man with a pen: medium close at the desk
  L2={dx:1,rim:'#ffcf8a',amb:'#6a4a30'};const yb=1430,s=4.6;const z=lerp(1.12,1.0,eo(inv(A(1),A(1)+0.8,t)));
  push(c,z,W/2,1300,()=>{dof(c,5,d=>{bgRoom(d,t,{dark:0.55,lamp:[900,1240,1.4]});});desk(c,yb);
    onDesk(c,600,yb+110,M(s)*0.21,M(s)*0.297,0.08,(w,h)=>{sheet(w,h,c,Math.floor(inv(WT(1,6),B(1),t)*7));});
    const wr=Math.sin(t*14)*4;fig2(c,{x:290,y:yb+140*s,s,f:1,t,kind:'garbo',stache:true,cut:yb,eyes:'open',brow:'flat',mouth:'flat',look:[2,2],hf:[56+wr*0.4,70],hb:[34,80],propF:pPen2(),tilt:0.06});});
  if(t>WT(1,14)){const k=back(inv(WT(1,14),WT(1,14)+0.3,t));c.save();c.translate(560,600);c.scale(k,k);c.rotate(-0.05);c.fillStyle='#b01818';rr(c,-150,-52,300,104,12);c.fill();txt(c,'D-DAY',0,4,70,'#fff',{sw:9,ls:6});c.restore();}
  screenLights(c,[{x:900,y:1100,on:1,r:700,hr:1200}],0.4);vignette(c,0.5);
};
SH.c=function(c,t){ // 1941 street; posters pasted on the wall behind him
  const cam=scam(lerp(-60,60,inv(A(2),B(5),t)),1.35,1760);L2={dx:-1,rim:'#ffc27a',amb:'#3a4a6a'};
  const lights=street(c,t,cam,{seed:7,sky:{moon:true},lamps:[{x:-300,on:1},{x:420,on:1}],world:c2=>{
    const post=(x,lbl,col,t0)=>{const p=inv(t0,t0+0.25,t);if(p<=0)return;c2.save();c2.translate(x,GY-150);c2.globalAlpha=clamp(p*2);c2.rotate(x<0?-0.03:0.04);c2.fillStyle=col;c2.strokeStyle=K2;c2.lineWidth=4;c2.fillRect(-60,-85,120,170);c2.strokeRect(-60,-85,120,170);c2.fillStyle='rgba(0,0,0,0.3)';c2.beginPath();c2.arc(0,-20,34,0,TAU);c2.fill();txt(c2,lbl,0,55,lbl.length>7?17:22,'#fff',{sw:3,ls:1});c2.restore();xMark(c2,x,GY-150,60,inv(t0+0.3,t0+0.6,t));};
    if(t>A(4)){post(-140,'FASCISM','#3a3a40',WT(4,5));post(250,'COMMUNISM','#7a1a1a',WT(4,7));}
    fig2(c2,{x:60,y:GY+40,s:2.0,f:1,t,kind:'garbo',stache:true,eyes:t>A(5)?'sly':'open',brow:t>A(4)&&t<A(5)?'angry':'flat',mouth:t>A(4)&&t<A(5)?'frown':(t>A(5)?'smirk':'flat'),hf:t>A(5)?[34,-30]:null,castLen:1.1,seed:2});}});
  finishStreet(c,t,cam,lights,{dark:0.55});vignette(c,0.45);
  band(c,A(2),t,'1941',1720,{end:A(3),size:64,ls:20});
  if(t>A(3)&&t<A(4)+0.1)card(c,A(3),t,'JUAN PUJOL GARCÍA','SPAIN · BORN 1912',1720,{end:A(4)-0.1,w:860,size:56,tag:'SUBJECT'});
  if(t>A(5)){const k=back(inv(A(5),A(5)+0.35,t));c.save();c.translate(760,560);c.scale(k,k);c.fillStyle='#f3efe4';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.ellipse(0,0,190,125,0,0,TAU);c.fill();c.stroke();
    for(let i=0;i<3;i++){c.beginPath();c.arc(-150-i*26,140+i*40,13-i*3,0,TAU);c.fill();c.stroke();}
    c.save();c.beginPath();c.ellipse(0,0,174,110,0,0,TAU);c.clip();c.fillStyle='#1a2a5a';c.fillRect(-180,-115,360,230);c.strokeStyle='#fff';c.lineWidth=46;seg(c,-180,-115,180,115);seg(c,180,-115,-180,115);c.strokeStyle='#c8102e';c.lineWidth=15;seg(c,-180,-115,180,115);seg(c,180,-115,-180,115);c.strokeStyle='#fff';c.lineWidth=60;seg(c,0,-115,0,115);seg(c,-180,0,180,0);c.strokeStyle='#c8102e';c.lineWidth=34;seg(c,0,-115,0,115);seg(c,-180,0,180,0);c.restore();c.restore();}
};
SH.d=function(c,t){ // over Garbo's shoulder: the embassy door, an official says no
  L2={dx:-1,rim:'#ffcf8a',amb:'#4a3a2a'};const fl=1520,so=2.7;const doorH=M(so)*2.15,doorW=M(so)*0.95,dx=740;
  const nos=[WT(6,2),WT(7,0),WT(7,1)];let n=0;for(const q of nos)if(t>q)n++;
  dof(c,1.2,d=>{bgRoom(d,t,{dark:0.5});const g=d.createLinearGradient(0,fl,0,H);g.addColorStop(0,'#3a2a1e');g.addColorStop(1,'#120c08');d.fillStyle=g;d.fillRect(0,fl,W,H);
    d.fillStyle='#e8dcc0';d.strokeStyle=K2;d.lineWidth=4;d.fillRect(dx-130,fl-doorH-80,260,52);d.strokeRect(dx-130,fl-doorH-80,260,52);txt(d,'BRITISH EMBASSY',dx,fl-doorH-54,22,'#2a1a10',{stroke:false,ls:2,w:800});
    d.fillStyle='#120c08';d.fillRect(dx-doorW/2-18,fl-doorH-18,doorW+36,doorH+18);const open=eo(inv(nos[0]-0.5,nos[0]-0.1,t));d.fillStyle='#e8c890';d.fillRect(dx-doorW/2,fl-doorH,doorW,doorH);
    d.save();d.translate(dx-doorW/2,0);d.scale(1-open*0.75,1);d.fillStyle='#3a2416';d.fillRect(0,fl-doorH,doorW,doorH);d.strokeStyle=K2;d.lineWidth=5;d.strokeRect(0,fl-doorH,doorW,doorH);d.fillStyle='#2a180e';d.fillRect(24,fl-doorH+30,doorW-48,doorH*0.4);d.fillRect(24,fl-doorH*0.5,doorW-48,doorH*0.42);d.restore();
    if(open>0.3)fig2(d,{x:dx+10,y:fl,s:so,f:-1,t,kind:'intel2',eyes:n>=2?'half':'open',brow:'angry',mouth:'frown',tilt:n>=1?Math.sin(t*9)*0.1:0,hf:n>=1?[-46,-30]:null});});
  dof(c,3,d=>{fig2(d,{x:200,y:2560,s:5.2,f:1,t,kind:'garbo',back:1,hf:[10,90]});});
  nos.forEach((q,i)=>stamp(c,q,t,'NO',250,470+i*170,{size:74,rot:-0.15+i*0.13}));
  if(n>=3){const k=back(inv(nos[2],nos[2]+0.3,t));c.save();c.translate(420,640);c.scale(k,k);txt(c,'×3',0,0,90,'#ff3a2e',{sw:12});c.restore();}
  screenLights(c,[{x:dx,y:fl-doorH*0.5,on:1,r:700,hr:1100}],0.4);vignette(c,0.5);specks(c,t,15);
};
SH.e=function(c,t){ // Madrid: two-shot handshake
  L2={dx:1,rim:'#9ab8e0',amb:'#4a2a2a'};const s=3.4,yf=2080;const q=eo(inv(A(8),A(8)+0.9,t));
  dof(c,3,d=>{bgRoom(d,t,{dark:0.55,ty:1520});d.fillStyle='#5a1414';d.fillRect(400,240,280,780);d.fillStyle='rgba(0,0,0,0.3)';d.fillRect(400,240,34,780);d.fillStyle='#e8e0d0';d.beginPath();d.arc(540,520,80,0,TAU);d.fill();d.fillStyle='#5a1414';d.beginPath();d.arc(540,520,48,0,TAU);d.fill();});
  const shake=q>=1?Math.sin((t-A(8)-0.9)*12)*5:0;
  fig2(c,{x:lerp(-160,300,q),y:yf,s,f:1,t,walk:q<1?1:0,ph:t*7,kind:'garbo',stache:true,eyes:'open',brow:'flat',mouth:q>=1?'smirk':'flat',hf:q>=1?[70,12+shake]:null});
  fig2(c,{x:780,y:yf,s,f:-1,t,kind:'german',eyes:t>WT(8,6)?'sly':'open',brow:'angry',mouth:t>WT(8,6)?'smirk':'flat',hf:q>=1?[-70,12+shake]:null,seed:4});
  band(c,A(8)+0.2,t,'MADRID · GERMAN INTELLIGENCE',1800,{size:38,ls:5});
  screenLights(c,[{x:540,y:420,on:1,r:800,hr:1200}],0.42);vignette(c,0.5);specks(c,t,20);
};
SH.f=function(c,t){
  if(t<A(11)){ // insert: the "London" report (full-frame close-up, no people)
    const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#5a3820');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.fillRect(0,0,W,H);
    const wasnt=t>A(10);const z=wasnt?lerp(1.3,1.0,eo(inv(A(10),A(10)+0.3,t))):lerp(1.0,1.06,inv(A(9),A(10),t));
    push(c,z,540,960,()=>{c.save();c.translate(540,980);c.rotate(-0.04);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(-340,-220,700,460);sheet(700,460,c,7);c.restore();txt(c,'REPORT FROM LONDON',520,800,40,'#2a1a10',{stroke:false,font:'"Lora"'});
      postmark(c,760,780,100,'LONDON',inv(WT(9,5),WT(9,5)+0.4,t));if(wasnt)xMark(c,760,780,110,inv(A(10),A(10)+0.3,t));});
    if(wasnt){const k=back(inv(A(10),A(10)+0.3,t));c.save();c.translate(540,1480);c.scale(k,k);txt(c,"HE WASN'T.",0,0,110,'#fff',{sw:16,ls:4});c.restore();}
    vignette(c,0.5);
  }else{ // Lisbon: Garbo typing at a desk, guidebook / map / magazines at true size
    L2={dx:-1,rim:'#ffc27a',amb:'#6a4a30'};const yb=1440,s=4.3;
    dof(c,4.5,d=>{bgRoom(d,t,{dark:0.5,win:[600,300],wc1:'#e8a060',wc2:'#f6d0a0',view:(cc,wx,wy)=>{for(let i=0;i<6;i++){cc.fillStyle=['#c86a3a','#e0b080','#b85a3a','#d8c0a0','#c87a4a','#e8d0b0'][i];cc.fillRect(wx+i*52,wy+250-hash(i)*110,48,300);cc.fillStyle='#8a3a2a';cc.fillRect(wx+i*52-4,wy+240-hash(i)*110,56,14);}}});});
    desk(c,yb);
    const it=(t0,fn)=>{const p=inv(t0,t0+0.3,t);if(p<=0)return;c.save();c.globalAlpha=clamp(p*3);c.translate(0,-(1-eo(p))*60);fn();c.restore();};
    it(A(13),()=>onDesk(c,830,yb+330,M(s)*0.6,M(s)*0.42,-0.1,(w,h)=>{c.drawImage(SPR.paper,-w/2,-h/2,w,h);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(-w/2,-h/2,w,h);c.strokeStyle='#2a5aa8';c.lineWidth=6;c.beginPath();c.moveTo(-w*0.35,h*0.3);c.quadraticCurveTo(-w*0.05,-h*0.4,w*0.3,-h*0.1);c.stroke();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2;for(let i=1;i<5;i++)seg(c,-w/2+i*w/5,-h/2,-w/2+i*w/5,h/2);}));
    it(WT(13,2),()=>onDesk(c,180,yb+300,M(s)*0.21,M(s)*0.28,0.15,(w,h)=>{c.fillStyle='#b8382a';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-w/2,-h/2,w,h);c.strokeRect(-w/2,-h/2,w,h);txt(c,'PICTURE',0,-h*0.32,w*0.17,'#fff',{stroke:false,ls:2});c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-w*0.4,-h*0.15,w*0.8,h*0.5);}));
    it(WT(12,6),()=>onDesk(c,900,yb+110,M(s)*0.14,M(s)*0.21,0.3,(w,h)=>{c.fillStyle='#1a3a6a';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-w/2,-h/2,w,h);c.strokeRect(-w/2,-h/2,w,h);txt(c,'GUIDE TO',0,-h*0.18,w*0.15,'#e8d070',{stroke:false});txt(c,'BRITAIN',0,h*0.08,w*0.2,'#e8d070',{stroke:false,ls:2});},0.7));
    typewriter(c,560,yb+120,M(s)*0.42/400,t,true);
    fig2(c,{x:300,y:yb+140*s,s,f:1,t,kind:'garbo',stache:true,cut:yb,eyes:t>A(12)?'sly':'open',brow:t>A(12)?'sly':'flat',mouth:'smirk',look:[2,1],hf:[58+Math.sin(t*16)*3,60],hb:[40,66+Math.cos(t*16)*3]});
    band(c,A(11),t,'LISBON, PORTUGAL',1820,{size:42,end:A(12)+1});
    screenLights(c,[{x:750,y:500,on:1,r:800,hr:1200}],0.32);vignette(c,0.45);
  }
  specks(c,t,18);
};
SH.g=function(c,t){ // over a German shoulder: his colleague reads the report and nods
  L2={dx:1,rim:'#ffb35a',amb:'#4a4030'};const nod=Math.max(0,Math.sin((t-A(14))*10))*0.09*(t>WT(14,2)?1:0);
  dof(c,3.5,d=>{bgRoom(d,t,{dark:0.6,ty:1480,lamp:[150,1480,1.2]});});
  fig2(c,{x:430,y:2160,s:3.7,f:1,t,kind:'german',eyes:t>WT(14,2)?'happy':'sly',brow:'up',mouth:t>WT(14,2)?'smile':'flat',tilt:nod,look:[1,2],hf:[52,-6],hb:[30,10],propF:pA4()});
  dof(c,4,d=>{fig2(d,{x:930,y:2900,s:6.4,f:-1,t,kind:'german',back:1});});
  if(t>WT(14,3))stamp(c,WT(14,3),t,'VERIFIED',520,620,{size:84,col:'#1a6a2a',rot:0.08});
  screenLights(c,[{x:150,y:1250,on:1,r:700,hr:1100}],0.42);vignette(c,0.5);specks(c,t,15);
};
SH.h=function(c,t){ // insert: map table, a German hand pushes U-boats at a convoy that isn't there
  L2={dx:1,rim:'#9ab8e0'};const z=lerp(1.0,1.12,inv(A(15),B(15),t));
  push(c,z,540,1000,()=>{c.fillStyle='#1a120c';c.fillRect(0,0,W,H);c.drawImage(SPR.paper,40,300,W-80,1440);c.strokeStyle='#3a2a1a';c.lineWidth=6;c.strokeRect(40,300,W-80,1440);c.fillStyle='rgba(50,90,130,0.35)';c.fillRect(60,320,W-120,1400);
    c.strokeStyle='rgba(0,0,0,0.15)';c.lineWidth=2;for(let i=0;i<12;i++){seg(c,60,320+i*120,1020,320+i*120);seg(c,60+i*96,320,60+i*96,1720);}
    txt(c,'NORTH ATLANTIC',540,1650,34,'rgba(20,30,50,0.6)',{stroke:false,font:'"Lora"',ls:10});
    const exist=inv(WT(15,8),WT(15,10),t);
    for(let i=0;i<6;i++){const x=300+(i%3)*170,y=820+Math.floor(i/3)*150;c.save();c.translate(x,y);c.globalAlpha=1-exist*0.75;if(exist>0)c.setLineDash([10,8]);c.fillStyle=exist>0.5?'rgba(0,0,0,0)':'#3a4048';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.moveTo(-50,-10);c.lineTo(50,-10);c.lineTo(36,12);c.lineTo(-42,12);c.closePath();c.fill();c.stroke();c.setLineDash([]);c.restore();}
    const subs=[[860,520],[880,1100],[260,1300]];const pq=eo(inv(WT(15,3),WT(15,6),t));
    subs.forEach((p0,i)=>{const tx=[620,640,330][i],ty=[820,1000,1000][i];const x=lerp(p0[0],tx,i===0?pq:eo(inv(WT(15,4)+i*0.25,WT(15,6)+i*0.25,t))),y=lerp(p0[1],ty,i===0?pq:eo(inv(WT(15,4)+i*0.25,WT(15,6)+i*0.25,t)));
      c.strokeStyle='#8a1c1c';c.lineWidth=5;c.setLineDash([14,10]);seg(c,p0[0],p0[1],x,y);c.setLineDash([]);c.fillStyle='#1a1a1a';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.ellipse(x,y,30,9,Math.atan2(ty-p0[1],tx-p0[0]),0,TAU);c.fill();c.fillRect(x-5,y-16,10,10);});
    // the hand pushing the lead marker (sleeve from top-right)
    const hx=lerp(subs[0][0],620,pq)+40,hy=lerp(subs[0][1],820,pq)-50;giantHand(c,hx,hy,-2.4,0.75,'#56604f');
    if(exist>0.6){const k=back(inv(WT(15,10),WT(15,10)+0.3,t));bigQ(c,520,980,0.45*k,t);}});
  vignette(c,0.55);specks(c,t,12);
};
SH.i=function(c,t){
  if(t<A(18)){ // MI5 office two-shot
    L2={dx:-1,rim:'#ffcf8a',amb:'#3a3a4a'};
    dof(c,3.5,d=>{bgRoom(d,t,{dark:0.5,win:[90,300],view:(cc,wx,wy)=>{cc.fillStyle='#0a0e18';cc.fillRect(wx,wy+230,300,170);cc.fillStyle='#ffe0a0';for(let i=0;i<8;i++)cc.fillRect(wx+20+i*34,wy+260+hash(i)*60,10,14);},lamp:[900,1500,1.2]});});
    fig2(c,{x:350,y:2140,s:3.6,f:1,t,kind:'intelnh',eyes:t>A(17)?'wide':'open',brow:'up',mouth:t>A(17)?'o':'flat',look:[1,2],hf:[50,-4],propF:pA4(),seed:1});
    fig2(c,{x:790,y:2140,s:3.6,f:-1,t,kind:'intel2',eyes:t>WT(17,1)?'sly':'open',brow:'sly',mouth:t>WT(17,1)?'smirk':'flat',lean:-0.06,seed:2});
    band(c,A(16),t,'MI5 · LONDON',1800,{size:42});vignette(c,0.5);
  }else{ // insert: the file
    const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#4a3020');tg.addColorStop(1,'#1c120a');c.fillStyle=tg;c.fillRect(0,0,W,H);
    const k=lerp(1.25,1,eo(inv(A(18),A(18)+0.4,t)));c.save();c.translate(540,1000);c.scale(k,k);c.rotate(-0.03);c.fillStyle='rgba(0,0,0,0.4)';c.fillRect(-350,-430,720,880);c.fillStyle='#d8b878';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-370,-450,720,880);c.strokeRect(-370,-450,720,880);c.fillStyle='#c8a868';c.fillRect(-370,-500,260,60);c.strokeRect(-370,-500,260,60);
    txt(c,'MI5 · MOST SECRET',-10,-370,34,'#5a1a10',{stroke:false,ls:6});c.fillStyle='#5a5a5a';c.fillRect(-300,-300,240,300);c.strokeRect(-300,-300,240,300);c.fillStyle='#1a1a1a';c.beginPath();c.arc(-180,-180,60,0,TAU);c.fill();c.fillRect(-250,-120,140,120);c.fillRect(-230,-260,100,30);c.fillRect(-250,-240,140,16);
    txt(c,'CODENAME',150,-240,34,'#3a2414',{stroke:false,ls:6});c.fillStyle='rgba(0,0,0,0.3)';for(let i=0;i<5;i++)c.fillRect(-300,100+i*44,600,4);c.restore();
    stamp(c,A(19),t,'GARBO',600,880,{size:120,rot:-0.1});vignette(c,0.5);}
  specks(c,t,18);
};
SH.j=function(c,t){ // from behind Garbo and his handler: the wall of 27 invented agents
  L2={dx:-1,rim:'#ffb35a',amb:'#4a3020'};const z=lerp(1.08,1.0,eio(inv(A(20),B(21),t)));
  push(c,z,540,1000,()=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a2a20');g.addColorStop(1,'#140c08');c.fillStyle=g;c.fillRect(0,0,W,H);c.save();brickRect(c,0,0,W,1700,0.55);c.restore();
    c.fillStyle='#4a3424';c.fillRect(60,330,960,1230);c.strokeStyle='#2a1a10';c.lineWidth=14;c.strokeRect(60,330,960,1230);c.fillStyle='rgba(0,0,0,0.12)';for(let i=0;i<40;i++)c.fillRect(70+hash(i)*930,340+hash(i*3)*1200,6,6);
    const pos=[];for(let i=0;i<27;i++){const r=Math.floor(i/5),k=i%5;pos.push([175+k*182+(r%2)*30,450+r*190+(hash(i)-.5)*30]);}
    const T0=WT(20,7),T1=B(20);const n=Math.floor(clamp(inv(T0,T1,t))*27);
    c.strokeStyle='#b01818';c.lineWidth=3;for(let i=1;i<n;i++){const a=pos[i],b2=pos[Math.floor(hash(i*7)*i)];seg(c,a[0],a[1]-70,b2[0],b2[1]-70);}
    for(let i=0;i<27;i++){const ti=T0+i/27*(T1-T0);agentCard(c,pos[i][0],pos[i][1],i,inv(ti,ti+0.25,t)*0.9,t);}
    dof(c,2.5,d=>{fig2(d,{x:230,y:2560,s:4.6,f:1,t,kind:'harris',back:1});fig2(d,{x:860,y:2600,s:4.8,f:-1,t,kind:'garbo',back:1,hf:[-50,-40]});});});
  if(t>WT(20,7))counter(c,WT(20,7),t,String(Math.min(27,Math.floor(clamp(inv(WT(20,7),B(20),t))*27)+1)),'FAKE AGENTS',540,1790,{end:B(21)+0.2});
  screenLights(c,[{x:540,y:500,on:1,r:900,hr:1300}],0.32);vignette(c,0.5);
};
SH.k=function(c,t){ // letters pile up, the radio keys out messages
  L2={dx:-1,rim:'#ffcf8a',amb:'#5a4030'};const yb=1450,s=4.3;
  dof(c,4.5,d=>{bgRoom(d,t,{dark:0.6});});desk(c,yb);
  const n1=Math.floor(inv(WT(22,3),WT(22,5),t)*315),n2=Math.floor(inv(WT(22,7),B(22),t)*500);
  const ew=M(s)*0.16;for(let i=0;i<Math.min(28,Math.floor(n1/11));i++)letterEnv(c,150+hash(i)*120,yb+330-i*11,ew/120,(hash(i*5)-.5)*0.5);
  radioSet(c,760,yb+60,M(s)*0.5/400,t,n2>0);if(n2>0)waves(c,880,yb-200,t,1);
  fig2(c,{x:430,y:yb+140*s,s,f:1,t,kind:'garbo',stache:true,cut:yb,eyes:'sly',brow:'sly',mouth:'smirk',look:[2,1],hf:[62,62],hb:[40,74]});
  if(n1>0)counter(c,WT(22,3),t,String(n1),'LETTERS',540,440,{end:B(22)+0.2});
  if(n2>0)counter(c,WT(22,7),t,String(n2)+(n2>=500?'+':''),'RADIO MESSAGES',540,680,{end:B(22)+0.2});
  screenLights(c,[{x:540,y:420,on:1,r:800,hr:1200}],0.4);vignette(c,0.5);
};
SH.l=function(c,t){
  if(t<A(27)){ // June 1944: Garbo at the radio; clock in soft focus behind
    L2={dx:1,rim:'#9ab8e0',amb:'#2a3448'};const yb=1460,s=4.4;const hrs=lerp(3,8,inv(A(26),B(26),t));
    dof(c,1.8,d=>{bgRoom(d,t,{dark:0.62});clock(d,300,640,120,hrs,t);});
    txt(c,hrs<4?'3:00 AM':(hrs>7.9?'8:00 AM':''),300,820,40,'#fff',{sw:8});
    desk(c,yb);radioSet(c,380,yb+70,M(s)*0.5/400,t,true);
    if(t>A(25)){waves(c,380,yb-170,t,1,'255,220,140');txt(c,'→ MADRID',300,yb-260,34,'#ffd66a',{sw:6,ls:4});}
    fig2(c,{x:760,y:yb+140*s,s,f:-1,t,kind:'garbo',stache:true,cut:yb,eyes:t>A(26)?'sly':'open',brow:t>A(26)?'sly':'worried',mouth:t>A(26)?'smirk':'flat',look:[-1,1],hf:[-62,62],hb:[-36,74]});
    band(c,A(23),t,'JUNE 1944',1820,{size:56,ls:18,end:B(24)});
    if(t>A(25)&&t<A(26)){const k=back(inv(A(25),A(25)+0.3,t));c.save();c.translate(560,470);c.scale(k,k);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-240,-80,480,160);c.strokeRect(-240,-80,480,160);txt(c,'INVASION',0,-22,52,'#a81c1c',{stroke:false,ls:6});txt(c,'IS COMING',0,38,40,'#2a1a10',{stroke:false,ls:6});c.restore();}
    if(t>WT(26,5))stamp(c,WT(26,5),t,'TOO LATE',640,560,{size:96,rot:-0.12,end:A(27)});
  }else{ // a German officer reads it: close-up
    L2={dx:-1,rim:'#ffb35a',amb:'#4a4030'};const k=lerp(1.15,1,eo(inv(A(27),A(27)+0.5,t)));
    push(c,k,540,1400,()=>{dof(c,4.5,d=>{bgRoom(d,t,{dark:0.6,lamp:[880,1300,1.3]});});
      fig2(c,{x:520,y:2700,s:5.6,f:1,t,kind:'german',eyes:t>A(28)?'happy':'open',brow:'up',mouth:t>A(28)?'teeth':'flat',look:[1,2],hf:[44,-20],propF:pSlip()});});
    if(t>A(28))stamp(c,A(28),t,'TRUSTED',540,560,{size:96,col:'#1a6a2a',rot:0.1});}
  screenLights(c,[{x:540,y:460,on:1,r:800,hr:1200}],0.4);vignette(c,0.5);specks(c,t,15);
};
SH.m=function(c,t){ // map insert: Normandy fake, Calais real
  room(c,t,{dark:0.6,table:false});L2={dx:1,rim:'#9ab8e0'};const P=channelMap(c,t);
  arrow(c,P.EN.x-100,P.EN.y,P.NO.x,P.NO.y,inv(A(29),A(29)+0.6,t),'#2a5aa8',16);
  if(t>WT(29,6))stamp(c,WT(29,6),t,'FAKE',P.NO.x+40,P.NO.y-200,{size:80,rot:-0.12});
  arrow(c,P.EN.x+300,P.EN.y,P.CA.x,P.CA.y-20,inv(A(30),A(30)+0.8,t),'#b81c1c',30,40);
  if(t>WT(30,6)){const q=t-WT(30,6);for(let k=0;k<3;k++){const r=((q*0.8+k/3)%1);ring(c,P.CA.x,P.CA.y,60+r*260,(1-r)*0.7,'rgba(200,30,30,',8);}}
  screenLights(c,[{x:W/2,y:600,on:1,r:900,hr:1400}],0.35);vignette(c,0.45);specks(c,t,12);
};
SH.n=function(c,t){
  if(t<A(33)){ // Hitler, only ever from behind, at his desk
    L2={dx:1,rim:'#ffb070',amb:'#2a1e16'};const z=lerp(1.0,1.1,inv(A(31),A(33),t));
    push(c,z,540,1300,()=>{dof(c,2.5,d=>{const g=d.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#060404');d.fillStyle=g;d.fillRect(0,0,W,H);
        d.fillStyle='#2a1e16';for(let i=0;i<5;i++)d.fillRect(80+i*200,160,140,1040);d.fillStyle='#3a2416';d.fillRect(180,1180,720,56);d.fillStyle='#2a180e';d.fillRect(180,1236,720,300);
        deskLamp(d,780,1180,1.1);onDesk(d,520,1200,130,180,0.1,(w,h)=>sheet(w,h,d,5,true),0.4);});
      fig2(c,{x:500,y:2560,s:5.0,f:-1,t,kind:'hitB',back:1});});
    if(t>A(32))stamp(c,A(32),t,'BELIEVED',540,560,{size:96,rot:-0.1});
    screenLights(c,[{x:780,y:900,on:1,r:600,hr:900}],0.45);vignette(c,0.6);
  }else{ // map: divisions frozen at Calais, Allies pour into Normandy
    room(c,t,{dark:0.6,table:false});const P=channelMap(c,t);L2={dx:1,rim:'#9ab8e0'};
    for(let i=0;i<12;i++){const x=P.CA.x-120+(i%4)*60,y=P.CA.y+70+Math.floor(i/4)*44;tankIcon(c,x,y,0.75,'#5a5f55');}
    if(t>WT(33,3)){c.save();c.globalAlpha=0.5+0.5*Math.sin(t*6);txt(c,'WAITING…',P.CA.x-40,P.CA.y+250,34,'#fff',{sw:6,ls:4});c.restore();}
    const days=Math.floor(inv(WT(33,6),WT(33,9),t)*40);if(days>0)counter(c,WT(33,6),t,'DAY '+days,'AT CALAIS',540,1560,{});
    for(let i=0;i<8;i++){const t0=WT(33,10)+i*0.15;arrow(c,P.EN.x-140+i*22,P.EN.y+20,P.NO.x-70+i*22,P.NO.y+30+i*8,inv(t0,t0+0.8,t),'#2a5aa8',9,30);}
    vignette(c,0.45);}
  specks(c,t,12);
};
function lapelMacro(c,t,col){ // extreme close-up of a jacket lapel
  const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,shd2(col,0.15));g.addColorStop(1,shd2(col,-0.45));c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(0,0,0,0.08)';c.lineWidth=3;for(let i=-40;i<60;i++)seg(c,i*40,0,i*40+600,H);c.strokeStyle='rgba(255,255,255,0.04)';for(let i=-40;i<60;i++)seg(c,i*40+12,0,i*40+612,H);
  c.fillStyle=shd2(col,-0.3);c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.moveTo(-50,-50);c.lineTo(620,-50);c.lineTo(260,1500);c.lineTo(-50,1700);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.moveTo(620,-50);c.lineTo(660,-50);c.lineTo(300,1500);c.lineTo(260,1500);c.fill();c.fillStyle='#ecebe6';c.beginPath();c.moveTo(650,-50);c.lineTo(900,-50);c.lineTo(560,700);c.lineTo(440,700);c.closePath();c.fill();c.stroke();}
SH.o=function(c,t){
  if(t<A(36)){ // macro inserts: each medal pinned to the same jacket
    const iron=t<A(35);const z=lerp(1.08,1.0,eo(inv(iron?A(34):A(35),(iron?A(34):A(35))+0.6,t)));
    push(c,z,540,1000,()=>{lapelMacro(c,t,'#5a4636');
      const q=eo(inv(iron?WT(34,5):WT(35,4),(iron?WT(34,5):WT(35,4))+0.35,t));if(q>0){c.save();c.globalAlpha=clamp(q*2);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(720,1180,170,50,0,0,TAU);c.fill();c.restore();medal(c,700,lerp(1300,1100,q),2.3,iron?'iron':'mbe',t);}});
    band(c,A(34),t,'GERMANY: THE IRON CROSS',380,{size:38,end:A(35)});band(c,A(35),t,'BRITAIN: MBE',380,{size:40});vignette(c,0.5);
  }else{ // split screen, chest-up
    c.save();c.beginPath();c.rect(0,0,W/2,H);c.clip();c.fillStyle='#3a1414';c.fillRect(0,0,W/2,H);L2={dx:1,rim:'#ff8a6a',amb:'#4a1a1a'};
      fig2(c,{x:300,y:2650,s:5.2,f:1,t,kind:'garbo',stache:true,eyes:'sly',brow:'sly',mouth:'smirk'});medal(c,220,1720,0.42,'iron',t);txt(c,'GERMANY',270,420,52,'#fff',{sw:8,ls:6});c.restore();
    c.save();c.beginPath();c.rect(W/2,0,W/2,H);c.clip();c.fillStyle='#142a4a';c.fillRect(W/2,0,W/2,H);L2={dx:-1,rim:'#9ab8e0',amb:'#1a2a4a'};
      fig2(c,{x:780,y:2650,s:5.2,f:-1,t,kind:'garbo',stache:true,eyes:'sly',brow:'sly',mouth:'smirk'});medal(c,860,1720,0.42,'mbe',t);txt(c,'BRITAIN',810,420,52,'#fff',{sw:8,ls:6});c.restore();
    c.fillStyle='#fff';c.fillRect(W/2-5,0,10,H);
    if(t>A(37))stamp(c,A(37),t,'SAME MAN',540,640,{size:90,rot:-0.06});vignette(c,0.4);}
  specks(c,t,15);
};
SH.p=function(c,t){
  if(t<A(40)){const cam=scam(0,1.35,1740);L2={dx:-1,rim:'#9ab8e0',amb:'#2a3448'};const q=inv(A(39),B(39)+0.4,t);
    const lights=street(c,t,cam,{seed:4,sky:{moon:true},lamps:[{x:-250,on:1}],world:c2=>{c2.save();c2.globalAlpha=1-q;fig2(c2,{x:lerp(-40,260,inv(A(38),B(39)+0.4,t)),y:GY+40,s:2.0,f:1,t,walk:1,ph:t*6,kind:'garbo',stache:true,eyes:'open',brow:'flat',mouth:'flat',castLen:1.1});c2.restore();}});
    fog(c,t,0.8,{n:12,y0:1100,y1:1900,seed:5});finishStreet(c,t,cam,lights,{dark:0.62});vignette(c,0.5);
    if(t>B(39))band(c,B(39),t,'1944: HE DISAPPEARS',1800,{size:40,ls:6});
  }else{const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#5a3820');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.fillRect(0,0,W,H);
    const k=back(inv(A(40),A(40)+0.4,t));c.save();c.translate(540,1000);c.scale(k*1.7,k*1.7);c.rotate(-0.06+(1-k)*2);
    c.fillStyle='#ebe4cf';c.fillRect(-170,-220,340,440);c.strokeStyle='#222';c.lineWidth=3;c.strokeRect(-170,-220,340,440);c.fillStyle='#111';c.font='900 26px "Lora"';c.textAlign='center';c.fillText('THE DAILY NEWS · 1949',0,-180);c.fillRect(-150,-166,300,4);
    c.fillStyle='#9a0e0e';c.font='900 40px "Inter Display"';c.fillText('FORMER SPY',0,-118);c.fillText('DIES OF',0,-74);c.fillText('MALARIA',0,-30);c.fillStyle='#111';c.font='800 22px "Inter Display"';c.fillText('— ANGOLA, AFRICA —',0,4);
    c.fillStyle='#444';c.fillRect(-150,24,140,120);c.fillStyle='#111';c.beginPath();c.arc(-80,70,24,0,TAU);c.fill();c.fillRect(-104,94,48,50);c.fillStyle='rgba(0,0,0,0.45)';for(let i=0;i<8;i++)c.fillRect(10,24+i*15,140,6);for(let i=0;i<4;i++)c.fillRect(-150,160+i*14,300,6);c.restore();vignette(c,0.5);}
  specks(c,t,18);
};
SH.q=function(c,t){ // Caracas: old Garbo in the foreground, the street behind in soft focus
  L2={dx:1,rim:'#ffd0a0',amb:'#8a6a50'};const q=inv(A(41),B(43),t);
  dof(c,4,d=>{const g=d.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a6aa0');g.addColorStop(0.5,'#f0b878');g.addColorStop(1,'#f0b878');d.fillStyle=g;d.fillRect(0,0,W,H);
    const sg=d.createRadialGradient(780,820,0,780,820,600);sg.addColorStop(0,'rgba(255,240,200,0.8)');sg.addColorStop(1,'rgba(255,200,140,0)');d.fillStyle=sg;d.fillRect(0,0,W,H);d.fillStyle='#fff4d8';d.beginPath();d.arc(780,820,80,0,TAU);d.fill();
    d.fillStyle='#6a4a5a';d.beginPath();d.moveTo(0,1000);for(let x=0;x<=W;x+=60)d.lineTo(x,900+Math.sin(x*0.008)*80+hash(x)*30);d.lineTo(W,1200);d.lineTo(0,1200);d.fill();
    for(let i=0;i<6;i++){const cols=['#e8c06a','#d86a5a','#6aa8b8','#e8e0c8','#b88ad0','#e89a5a'];d.fillStyle=cols[i];d.strokeStyle=K2;d.lineWidth=5;const x=i*190-20,h=560+hash(i)*160;d.fillRect(x,1420-h,180,h);d.strokeRect(x,1420-h,180,h);d.fillStyle='rgba(0,0,0,0.35)';d.fillRect(x+30,1420-h+80,40,70);d.fillRect(x+110,1420-h+80,40,70);d.fillRect(x+30,1420-h+250,40,70);d.fillRect(x+110,1420-h+250,40,70);d.fillStyle='#8a3a2a';d.fillRect(x-10,1420-h-20,200,24);}
    palm(d,120,1420,1.3,t);palm(d,960,1440,1.4,t);d.fillStyle='#c8a878';d.fillRect(0,1420,W,500);});
  fig2(c,{x:lerp(260,640,q),y:2130,s:3.6,f:1,t,kind:'garboOld',stache:true,walk:1,ph:t*4.5,eyes:t>A(42)?'happy':'open',brow:'flat',mouth:'smile'});
  band(c,A(42),t,'CARACAS, VENEZUELA',380,{size:44,end:A(43)});
  if(t>A(43))card(c,A(43),t,'JUAN PUJOL GARCÍA','1912 – 1988',420,{w:860,size:54,tag:'AGENT GARBO',end:END});
  vignette(c,0.4);if(t>A(44)){c.fillStyle=`rgba(0,0,0,${0.55*inv(A(44),END,t)})`;c.fillRect(0,0,W,H);}
  specks(c,t,15,'255,230,200');
};
