function band(c,t0,t,title,y=1560,o={}){const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.3)return;const a=Math.min(clamp(p/0.25),t>end?1-(t-end)/0.3:1);c.save();c.globalAlpha=a;c.fillStyle='rgba(0,0,0,0.78)';c.fillRect(0,y-58,W,116);txt(c,title,W/2,y-4,o.size||52,'#f4f1ea',{stroke:false,ls:o.ls??12,w:800});c.fillStyle='#e8302a';const lw=lerp(0,140,eo(p/0.5));c.fillRect(W/2-lw/2,y+34,lw,4);c.restore();}
// ===== Operation Mincemeat · Style 2 S2 =====
function scam(x,z,gs=1600){return {x,y:GY-(gs-960)/z,z};}
function push(c,z,cx,cy,fn){c.save();c.translate(cx,cy);c.scale(z,z);c.translate(-cx,-cy);fn();c.restore();}
function searchlights(c,t){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const bx=180+i*380,by=1180,a=-Math.PI/2+Math.sin(t*0.5+i*2)*0.45;
  const g=c.createLinearGradient(bx,by,bx+Math.cos(a)*1500,by+Math.sin(a)*1500);g.addColorStop(0,'rgba(220,235,255,0.22)');g.addColorStop(1,'rgba(220,235,255,0)');c.fillStyle=g;c.beginPath();c.moveTo(bx-10,by);c.lineTo(bx+Math.cos(a-0.06)*1600,by+Math.sin(a-0.06)*1600);c.lineTo(bx+Math.cos(a+0.06)*1600,by+Math.sin(a+0.06)*1600);c.lineTo(bx+10,by);c.fill();}c.restore();
  for(let i=0;i<2;i++){const x=260+i*520+Math.sin(t*0.3+i)*20,y=420+i*110;c.fillStyle='#1a2024';c.beginPath();c.ellipse(x,y,70,30,0,0,TAU);c.fill();c.beginPath();c.moveTo(x+50,y);c.lineTo(x+95,y-26);c.lineTo(x+95,y+26);c.fill();c.strokeStyle='rgba(30,36,40,0.8)';c.lineWidth=2;seg(c,x,y+30,x+20,y+400);}}
function room(c,t,o={}){ // style-1 brick interior with one warm lamp
  c.save();brickRect(c,0,0,W,H,o.dark??0.45);c.restore();
  if(o.win){const [wx,wy]=o.win;c.fillStyle='#0c0a08';c.fillRect(wx-16,wy-16,332,432);const g=c.createLinearGradient(0,wy,0,wy+400);g.addColorStop(0,o.wc1||'#0a1428');g.addColorStop(1,o.wc2||'#1c2c48');c.fillStyle=g;c.fillRect(wx,wy,300,400);if(o.view)o.view(c,wx,wy);c.fillStyle='#0c0a08';c.fillRect(wx+142,wy,16,400);c.fillRect(wx,wy+190,300,14);
    c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=5;seg(c,wx,wy,wx+300,wy+400);seg(c,wx+300,wy,wx,wy+400);}
  if(o.table!==false){const ty=o.ty??1420;const g=c.createLinearGradient(0,ty,0,H);g.addColorStop(0,'#5a3820');g.addColorStop(1,'#1c120a');c.fillStyle=g;c.fillRect(0,ty,W,H-ty);c.fillStyle='rgba(255,210,150,0.3)';c.fillRect(0,ty,W,5);}
}
function deskLamp(c,x,y,s=1){c.fillStyle='#1a2a1a';c.fillRect(x-6*s,y-150*s,12*s,150*s);c.fillRect(x-40*s,y-8*s,80*s,10*s);c.fillStyle='#2f6a3a';c.beginPath();c.moveTo(x-70*s,y-150*s);c.lineTo(x+70*s,y-150*s);c.lineTo(x+40*s,y-200*s);c.lineTo(x-40*s,y-200*s);c.closePath();c.fill();c.fillStyle='#fff2c0';c.fillRect(x-60*s,y-152*s,120*s,5*s);}
function medMap(c,t,o={}){ // paper map of the Mediterranean
  c.save();c.drawImage(SPR.paper,40,360,W-80,1300);c.strokeStyle='#3a2a1a';c.lineWidth=6;c.strokeRect(40,360,W-80,1300);
  c.fillStyle='rgba(70,110,140,0.25)';c.fillRect(60,380,W-120,1260);
  c.fillStyle='#c8b48a';c.strokeStyle='#5a4228';c.lineWidth=4;
  // Italy boot
  c.beginPath();c.moveTo(300,380);c.lineTo(520,380);c.quadraticCurveTo(560,560,700,760);c.quadraticCurveTo(820,880,780,940);c.quadraticCurveTo(740,900,700,960);c.lineTo(660,900);c.quadraticCurveTo(560,760,420,620);c.quadraticCurveTo(330,520,300,380);c.closePath();c.fill();c.stroke();
  // Sicily
  const SI=o.sicily||{x:660,y:1060};c.beginPath();c.moveTo(560,1010);c.lineTo(740,1000);c.lineTo(690,1110);c.closePath();c.fill();c.stroke();
  // Sardinia
  c.beginPath();c.ellipse(240,860,58,120,0.1,0,TAU);c.fill();c.stroke();
  // Greece
  c.beginPath();c.moveTo(900,700);c.lineTo(1020,680);c.lineTo(1020,1000);c.quadraticCurveTo(960,1060,930,1000);c.quadraticCurveTo(900,920,940,880);c.quadraticCurveTo(880,820,900,700);c.closePath();c.fill();c.stroke();
  // N Africa
  c.beginPath();c.moveTo(60,1280);c.quadraticCurveTo(400,1220,600,1260);c.quadraticCurveTo(800,1300,1020,1300);c.lineTo(1020,1640);c.lineTo(60,1640);c.closePath();c.fill();c.stroke();
  const lab=(s2,x,y)=>txt(c,s2,x,y,30,'#3a2414',{stroke:false,font:'"Lora"',w:700,ls:3});
  lab('SICILY',650,1150);lab('SARDINIA',240,1020);lab('GREECE',960,1060);lab('ITALY',520,600);lab('NORTH AFRICA',540,1400);
  c.restore();return {SI:{x:650,y:1050},SA:{x:240,y:860},GR:{x:950,y:860},AF:{x:540,y:1330}};
}
function arrow(c,x0,y0,x1,y1,p,col='#b81c1c',w=14){if(p<=0)return;const x=lerp(x0,x1,eo(p)),y=lerp(y0,y1,eo(p));c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo((x0+x)/2,(y0+y)/2-60,x,y);c.stroke();
  const a=Math.atan2(y-((y0+y)/2-60),x-(x0+x)/2);c.beginPath();c.moveTo(x+Math.cos(a)*24,y+Math.sin(a)*24);c.lineTo(x+Math.cos(a+2.4)*30,y+Math.sin(a+2.4)*30);c.lineTo(x+Math.cos(a-2.4)*30,y+Math.sin(a-2.4)*30);c.fill();}
function tankIcon(c,x,y,s,col='#3a3e34'){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=3;rr(c,-34,-10,68,22,8);c.fill();c.stroke();rr(c,-18,-26,36,18,5);c.fill();c.stroke();c.lineWidth=5;c.strokeStyle=col;seg(c,18,-18,48,-22);c.restore();}
function seaNight(c,t,o={}){sky(c,t,{top:'#03060c',mid:'#0a1622',bot:'#13242e',mx:o.mx??760,my:o.my??520});const hz=o.hz??1180;
  const g=c.createLinearGradient(0,hz,0,H);g.addColorStop(0,'#16303c');g.addColorStop(1,'#050c12');c.fillStyle=g;c.fillRect(0,hz,W,H);
  c.fillStyle='rgba(220,235,240,0.35)';for(let i=0;i<16;i++){const y=hz+12+i*i*3.2;c.fillRect((o.mx??760)-40+Math.sin(t*2+i)*16-i*4,y,80+i*8,3);}
  for(let i=0;i<40;i++){const y=hz+hash(i)*700,x=(hash(i*3)*W+t*20*(1+hash(i)))%W;c.fillStyle='rgba(180,210,220,0.15)';c.fillRect(x,y,30+hash(i*5)*60,2);}}
function beachDawn(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a3a5a');g.addColorStop(0.45,'#e89a6a');g.addColorStop(0.62,'#f6d0a0');g.addColorStop(1,'#f6d0a0');c.fillStyle=g;c.fillRect(-50,-50,W+100,H+100);
  const hz=o.hz??1080;const sg=c.createRadialGradient(o.sx??300,hz,0,o.sx??300,hz,700);sg.addColorStop(0,'rgba(255,240,200,0.9)');sg.addColorStop(1,'rgba(255,200,140,0)');c.fillStyle=sg;c.fillRect(0,0,W,H);c.fillStyle='#fff4d8';c.beginPath();c.arc(o.sx??300,hz,70,Math.PI,TAU);c.fill();
  for(let i=0;i<4;i++){c.globalAlpha=0.5;c.drawImage(SPR.fog,((t*12+i*300)%1400)-300,220+i*90,500,140);c.globalAlpha=1;}
  c.fillStyle=o.land||'#5a4a5a';c.beginPath();c.moveTo(W*0.55,hz);c.lineTo(W*0.7,hz-70);c.lineTo(W*0.85,hz-40);c.lineTo(W,hz-90);c.lineTo(W,hz);c.fill();
  const wg=c.createLinearGradient(0,hz,0,hz+380);wg.addColorStop(0,'#c88a7a');wg.addColorStop(1,'#3a5a6a');c.fillStyle=wg;c.fillRect(0,hz,W,380);
  c.fillStyle='rgba(255,230,190,0.6)';for(let i=0;i<10;i++){c.fillRect((o.sx??300)-50+Math.sin(t*2+i)*14-i*6,hz+10+i*i*3,100+i*12,3);}
  const sand=hz+380;const sd=c.createLinearGradient(0,sand,0,H);sd.addColorStop(0,'#d8b07a');sd.addColorStop(1,'#8a6a42');c.fillStyle=sd;c.fillRect(0,sand,W,H-sand);
  for(let i=0;i<3;i++){const y=sand-20+Math.sin(t*1.4+i)*16+i*8;c.fillStyle=`rgba(255,250,240,${0.55-i*0.15})`;c.beginPath();c.moveTo(0,y);for(let x=0;x<=W;x+=40)c.lineTo(x,y+Math.sin(x*0.02+t*2+i)*8);c.lineTo(W,y+16);c.lineTo(0,y+16);c.fill();}
  return sand;}
function submarine(c,x,y,s,t){c.save();c.translate(x,y+Math.sin(t*1.2)*4*s);c.scale(s,s);c.fillStyle='#0a1014';c.beginPath();c.ellipse(0,0,420,46,0,Math.PI,TAU);c.fill();c.fillRect(-420,-2,840,10);
  c.beginPath();c.moveTo(-60,-40);c.lineTo(-40,-130);c.lineTo(70,-130);c.lineTo(100,-40);c.fill();c.fillRect(-10,-190,8,60);c.fillRect(20,-170,6,40);
  c.strokeStyle='rgba(140,180,200,0.4)';c.lineWidth=3;c.beginPath();c.ellipse(0,0,418,44,0,Math.PI*1.1,Math.PI*1.6);c.stroke();txt(c,'P219',-200,-14,26,'#6a7a80',{stroke:false});c.restore();}
function tombstone(c,x,y,s,p){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(0,6,240,26,0,0,TAU);c.fill();
  const g=c.createLinearGradient(-200,0,200,0);g.addColorStop(0,'#8a8680');g.addColorStop(0.6,'#d8d2c8');g.addColorStop(1,'#f0ece4');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=6;
  c.beginPath();c.moveTo(-200,0);c.lineTo(-200,-420);c.quadraticCurveTo(0,-520,200,-420);c.lineTo(200,0);c.closePath();c.fill();c.stroke();
  c.fillStyle='#3a3630';c.font='700 34px "Lora"';c.textAlign='center';c.fillText('WILLIAM MARTIN',0,-360);c.font='600 22px "Lora"';c.fillText('Born 29th March 1907',0,-318);c.fillText('Died 24th April 1943',0,-290);
  c.globalAlpha=clamp(p);c.font='italic 600 23px "Lora"';c.fillText('Glyndwr Michael',0,-200);c.fillText('served as Major William Martin, RM',0,-170);c.globalAlpha=1;
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2;seg(c,-140,-250,140,-250);c.restore();}
const SH={};
SH.a=function(c,t){ // hook: London blackout, intelligence officer, covered stretcher
  const z=lerp(0.95,1.3,eo(inv(0,0.6,t)))+0.1*inv(0.6,A(2),t)-0.3*eio(inv(A(2),A(2)+0.6,t));
  const cam=scam(lerp(0,60,inv(0,A(3),t))+lerp(0,160,eio(inv(A(2),A(2)+0.6,t))),z,1700);FX.speed=Math.max(FX.speed,1-inv(0,0.45,t));
  L2={dx:-1,rim:'#ffb35a'};
  const lights=street(c,t,cam,{seed:2,sky:{moon:true},behind:c=>searchlights(c,t),lamps:[{x:-180,on:1}],world:c2=>{
    const sly=t>A(1);
    fig2(c2,{x:0,y:GY+40,s:2.1,f:1,t,kind:'intel',eyes:sly?'sly':'open',brow:sly?'sly':'flat',mouth:sly?'smirk':'flat',hf:sly?[40,-90]:[20,40],propF:sly?pDoc():pBriefcase(),castLen:1.1,seed:1});
    if(t>A(2)-0.2){c2.save();c2.globalAlpha=eo(inv(A(2)-0.2,A(2)+0.3,t));c2.fillStyle='#3a2a1a';c2.fillRect(220,GY+20,620,16);c2.fillRect(240,GY+36,10,40);c2.fillRect(810,GY+36,10,40);coveredBody(c2,530,GY+20,0.95);c2.restore();}}});
  fog(c,t,0.5,{n:8,y0:1300,y1:1900,seed:3});finishStreet(c,t,cam,lights,{dark:0.6});
  band(c,0.2,t,'LONDON · 1943',1660,{end:A(1)+0.3});
  if(t>A(2)+0.3){const q=t-A(2)-0.3;bigQ(c,W/2,760,spring(q*1.3)*0.55,t);}
};
SH.b=function(c,t){ // timer slam over a sly close-up
  const cam=scam(30,2.7,2000);L2={dx:-1,rim:'#ffb35a'};
  const lights=street(c,t,cam,{seed:2,behind:c=>searchlights(c,t),lamps:[{x:-200,on:1}],world:c2=>{fig2(c2,{x:30,y:GY,s:1.0,f:1,t,kind:'intel',eyes:t>WT(3,5)?'sly':'open',brow:'sly',mouth:'smirk',hf:[30,lerp(60,-80,inv(WT(3,7),WT(3,7)+0.3,t))]});}});
  finishStreet(c,t,cam,lights,{dark:0.5});
};
SH.c=function(c,t){
  if(t<A(7)){ // war room map: Sicily is the obvious target
    room(c,t,{dark:0.55,table:false});const z=lerp(1.0,1.1,inv(A(4),A(7),t));
    push(c,z,W/2,1000,()=>{const P=medMap(c,t);arrow(c,P.AF.x,P.AF.y,P.SI.x,P.SI.y+40,inv(A(5)+0.3,A(5)+1.2,t));
      if(t>A(6)){const q=t-A(6);for(let k=0;k<3;k++){const r=((q*0.8+k/3)%1);ring(c,P.SI.x,P.SI.y,60+r*260,(1-r)*0.7,'rgba(200,30,30,',8);}}});
    screenLights(c,[{x:W/2,y:500,on:1,r:700,hr:1300}],0.4);
    band(c,A(4),t,'1943',1760,{end:A(5)+0.6,size:60,ls:18});
    if(t>A(6))fig2(c,{x:150,y:2250,s:2.6,f:1,t,kind:'intel2',eyes:'open',brow:'worried',mouth:'frown',sweat:1,hf:[90,-120],look:[2,-1]});
  }else{ // the Germans know it too
    const cam=scam(0,1.6,1720);L2={dx:1,rim:'#9ab8e0'};
    room(c,t,{dark:0.6,ty:1500});
    c.save();c.translate(560,700);c.scale(0.5,0.5);c.translate(-W/2,-1000);medMap(c,t);c.restore();
    const q=inv(A(7),A(7)+0.5,t);
    fig2(c,{x:330,y:2400,s:3.3,f:1,t,kind:'german',eyes:'sly',brow:'angry',mouth:'smirk',hf:[lerp(40,90,eo(q)),lerp(40,-200,eo(q))]});
    if(q>=1){ring(c,555,830,40+((t*2)%1)*60,0.6*(1-((t*2)%1)),'rgba(200,30,30,',6);}
    screenLights(c,[{x:800,y:300,on:1,r:700,hr:1200}],0.45);
  }
  specks(c,t,25);
};
SH.d=function(c,t){ // British intelligence: an insane idea
  room(c,t,{dark:0.5,win:[640,330],view:(cc,wx,wy)=>{searchlightsMini(cc,wx,wy,t);}});deskLamp(c,860,1420,1.1);
  const idea=t>WT(8,6);const insane=t>WT(8,10);
  fig2(c,{x:280,y:2250,s:2.8,f:1,t,kind:'intel',eyes:idea?'sly':'open',brow:idea?'sly':'flat',mouth:idea?'smirk':'flat',hf:idea?[40,-150]:[50,40],seed:1});
  fig2(c,{x:800,y:2260,s:2.75,f:-1,t,kind:'intel2',eyes:insane?'shock':'open',brow:insane?'up':'flat',mouth:insane?'scream':'flat',sweat:insane?1:0,lean:insane?-0.12:0,seed:2});
  if(idea){const k=back(inv(WT(8,6),WT(8,6)+0.3,t));c.save();c.translate(380,820);c.scale(k,k);c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,0,0,0,0,200);g.addColorStop(0,'rgba(255,230,140,0.6)');g.addColorStop(1,'rgba(255,200,90,0)');c.fillStyle=g;c.fillRect(-200,-200,400,400);c.restore();
    c.fillStyle='#fff2b0';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.arc(0,0,48,0,TAU);c.fill();c.stroke();c.fillStyle='#7a7a7a';c.fillRect(-22,44,44,30);c.strokeRect(-22,44,44,30);c.restore();}
  screenLights(c,[{x:860,y:1280,on:1,r:600,hr:1000}],0.45);band(c,A(8)+0.2,t,'BRITISH INTELLIGENCE',1780,{end:B(8)+0.2,size:44,ls:8});specks(c,t,20);
};
function searchlightsMini(c,wx,wy,t){c.save();c.beginPath();c.rect(wx,wy,300,400);c.clip();c.globalCompositeOperation='lighter';for(let i=0;i<2;i++){const a=-Math.PI/2+Math.sin(t*0.5+i*2)*0.5,bx=wx+80+i*140,by=wy+400;c.strokeStyle='rgba(220,235,255,0.25)';c.lineWidth=18;seg(c,bx,by,bx+Math.cos(a)*500,by+Math.sin(a)*500);}c.restore();}
SH.e=function(c,t){ // the body: a cold room, covered; name on the file
  const z=lerp(1.0,1.08,inv(A(9),A(11),t));
  push(c,z,W/2,1300,()=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a2630');g.addColorStop(1,'#080c10');c.fillStyle=g;c.fillRect(0,0,W,H);
    c.fillStyle='rgba(180,210,230,0.06)';for(let x=0;x<W;x+=120)for(let y=0;y<1400;y+=120)c.fillRect(x+2,y+2,116,116);
    c.fillStyle='#2a3238';c.fillRect(0,1400,W,520);
    c.fillStyle='#5a6268';c.fillRect(160,1300,760,26);c.fillRect(190,1326,16,120);c.fillRect(874,1326,16,120);coveredBody(c,540,1300,1.15);
    L2={dx:1,rim:'#bcd8f0'};
    fig2(c,{x:150,y:2150,s:2.4,f:1,t,kind:'intelnh',eyes:'closed',brow:'worried',mouth:'flat',hf:[40,-10],propF:(cc,h,s)=>{cc.save();cc.translate(h.x+10,h.y-20);const g2=c.createLinearGradient(-20,0,20,0);g2.addColorStop(0,'#2a2620');g2.addColorStop(1,'#5a4a36');cc.fillStyle=g2;cc.beginPath();cc.ellipse(0,0,46*s/1.7,12*s/1.7,0,0,TAU);cc.fill();cc.restore();},seed:1});
    fig2(c,{x:930,y:2150,s:2.4,f:-1,t,kind:'intel2',eyes:'closed',brow:'worried',mouth:'flat',seed:2});});
  const lg=c.createRadialGradient(540,600,0,540,600,900);lg.addColorStop(0,'rgba(200,225,255,0.25)');lg.addColorStop(1,'rgba(0,0,0,0)');c.save();c.globalCompositeOperation='lighter';c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();
  if(t>A(10)){const k=back(inv(A(10),A(10)+0.4,t));c.save();c.translate(540,640);c.scale(k,k);c.rotate(-0.04);c.drawImage(SPR.paper,-260,-130,520,260);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-260,-130,520,260);
    txt(c,'GLYNDWR MICHAEL',0,-40,46,'#2a1a10',{stroke:false,font:'"Lora"'});txt(c,'WELSHMAN · 34',0,30,30,'#5a3a20',{stroke:false,font:'"Lora"',w:700,ls:4});c.restore();}
  specks(c,t,20,'200,220,240');
};
SH.f=function(c,t){ // someone who never existed: Major William Martin materialises
  room(c,t,{dark:0.55,table:false});
  const form=eo(inv(A(11)+0.3,A(12),t));L2={dx:-1,rim:'#ffb35a'};
  const ox=t<A(12)?540:lerp(540,300,eio(inv(A(12),A(12)+0.5,t)));
  c.save();c.globalAlpha=0.25+0.75*form;
  if(form<1){c.setLineDash([16,12]);}
  fig2(c,{x:ox,y:2250,s:3.3,f:1,t,kind:'marine',eyes:form>0.6?'open':'closed',brow:'flat',mouth:'flat',hf:[20,90],seed:3});c.setLineDash([]);c.restore();
  if(form<1){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<40;i++){const p=(t*0.8+hash(i))%1;c.fillStyle=`rgba(255,220,150,${(1-p)*0.7*(1-form)})`;c.beginPath();c.arc(ox-180+hash(i*3)*360,1880-p*900,4,0,TAU);c.fill();}c.restore();}
  if(t>A(12)){const k=back(inv(A(12),A(12)+0.35,t));c.save();c.translate(760,960);c.scale(k,k);c.rotate(0.05);c.fillStyle='#e6dcc2';c.strokeStyle=K2;c.lineWidth=5;rr(c,-230,-150,460,300,12);c.fill();c.stroke();
    c.fillStyle='#6a6a6a';c.fillRect(-200,-110,130,170);const g=c.createRadialGradient(-140,-50,4,-135,-40,40);g.addColorStop(0,'#fff');g.addColorStop(1,'#999');c.fillStyle=g;c.beginPath();c.arc(-135,-40,34,0,TAU);c.fill();
    txt(c,'NAVAL IDENTITY CARD',70,-100,20,'#3a2a1a',{stroke:false,ls:2,w:800});txt(c,'MAJOR',70,-40,34,'#2a1a10',{stroke:false,font:'"Lora"'});txt(c,'W. MARTIN',70,10,40,'#2a1a10',{stroke:false,font:'"Lora"'});
    if(t>A(13)){c.fillStyle='#8a1c1c';c.fillRect(-60,70,260,40);txt(c,'ROYAL MARINES',70,90,22,'#fff',{stroke:false,ls:3,w:800});}c.restore();}
  screenLights(c,[{x:540,y:700,on:1,r:800,hr:1300}],0.4);specks(c,t,25);
};
SH.g=function(c,t){ // the fake life laid out on a desk (top-down)
  const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#5a3820');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.fillRect(0,0,W,H);c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=3;for(let i=0;i<14;i++)seg(c,0,i*150+30,W,i*150-20);
  const z=lerp(1.2,1.32,inv(A(14),A(19),t));
  push(c,z,W/2,1150,()=>{
    const drop=(t0,x,y,rot,fn)=>{const p=inv(t0,t0+0.3,t);if(p<=0)return;const k=lerp(1.6,1,eo(p));c.save();c.translate(x,y-(1-eo(p))*120);c.rotate(rot);c.scale(k,k);c.globalAlpha=clamp(p*3);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(-150+12,-110+14,300,220);fn();c.restore();};
    drop(A(15)+0.2,330,780,-0.12,()=>{c.fillStyle='#f6f0e0';c.fillRect(-140,-180,280,360);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-140,-180,280,360);c.fillStyle='#585858';c.fillRect(-115,-155,230,250);
      const g=c.createRadialGradient(-10,-70,4,0,-60,60);g.addColorStop(0,'#fff');g.addColorStop(1,'#9a9a9a');c.fillStyle=g;c.beginPath();c.arc(0,-60,50,0,TAU);c.fill();c.fillStyle='#2a2a2a';c.beginPath();c.arc(0,-75,56,Math.PI,TAU);c.fill();c.fillStyle='#9a9a9a';c.fillRect(-60,-6,120,100);
      txt(c,'Pam',0,140,40,'#2a2a2a',{stroke:false,font:'"TeX Gyre Chorus"'});});
    drop(A(16)+0.1,760,700,0.1,()=>{for(let i=0;i<2;i++){c.save();c.translate(i*24,i*24);c.fillStyle='#efe6d0';c.fillRect(-150,-95,300,190);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-150,-95,300,190);c.beginPath();c.moveTo(-150,-95);c.lineTo(0,10);c.lineTo(150,-95);c.stroke();c.fillStyle='#c82a3a';c.beginPath();c.arc(0,20,16,0,TAU);c.fill();c.restore();}});
    drop(WT(16,2),780,1150,-0.18,()=>{for(let i=0;i<2;i++){c.save();c.translate(i*30,i*20);c.fillStyle='#e8c860';c.fillRect(-130,-55,260,110);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-130,-55,260,110);c.setLineDash([8,6]);seg(c,70,-55,70,55);c.setLineDash([]);txt(c,'THEATRE',-20,-10,28,'#3a2410',{stroke:false,font:'"Lora"'});txt(c,'ADMIT ONE',-20,26,18,'#3a2410',{stroke:false,ls:3});c.restore();}});
    drop(A(17)+0.1,380,1270,0.06,()=>{c.fillStyle='#f6f2e6';c.fillRect(-170,-210,340,420);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-170,-210,340,420);txt(c,'LLOYDS BANK',0,-160,32,'#1a2a4a',{stroke:false,font:'"Lora"'});c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=3;for(let i=0;i<7;i++)seg(c,-130,-100+i*34,130,-100+i*34);
      if(t>A(18)){const k=back(inv(A(18),A(18)+0.3,t));c.save();c.scale(k,k);c.fillStyle='rgba(200,30,30,0.15)';c.fillRect(-140,90,280,70);txt(c,'OVERDRAFT: £79',0,125,30,'#b01818',{stroke:false,font:'"Lora"'});c.restore();}});
  });
  screenLights(c,[{x:560,y:900,on:1,r:900,hr:1300}],0.35);
  if(t>A(18)+0.2){fig2(c,{x:960,y:2280,s:2.6,f:-1,t,kind:'intel2',eyes:'squeeze',brow:'up',mouth:'teeth',seed:5,hf:[-40,-160]});}
};
SH.h=function(c,t){
  if(t<A(21)){ // briefcase chained to his wrist, then opened
    const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1c1410');g.addColorStop(1,'#080604');c.fillStyle=g;c.fillRect(0,0,W,H);
    const z=lerp(1.15,1.0,eo(inv(A(19),A(19)+0.5,t)));push(c,z,W/2,1000,()=>{
      // sleeve + hand coming in from the left
      c.strokeStyle=K2;c.lineWidth=170;c.lineCap='round';seg(c,-200,900,360,960);c.strokeStyle='#3e4a32';c.lineWidth=150;seg(c,-200,900,360,960);c.strokeStyle='rgba(255,200,140,0.25)';c.lineWidth=20;seg(c,-200,850,340,905);
      c.fillStyle='#8a1c1c';c.fillRect(250,890,40,140);
      const g2=c.createRadialGradient(470,940,10,450,960,90);g2.addColorStop(0,'#f2f0ea');g2.addColorStop(1,'#9a9690');c.fillStyle=g2;c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.arc(450,960,80,0,TAU);c.fill();c.stroke();
      const lock=inv(WT(19,3),WT(19,3)+0.25,t);c.strokeStyle='#b8c0c8';c.lineWidth=16;c.beginPath();c.ellipse(360,960,40,90,0,0,TAU*lerp(0.5,1,lock));c.stroke();
      for(let i=0;i<6;i++){c.strokeStyle='#9aa2aa';c.lineWidth=8;c.beginPath();c.ellipse(420+i*42,1080+i*26,22,12,0.5,0,TAU);c.stroke();}
      const open=inv(A(20),A(20)+0.35,t);
      c.save();c.translate(760,1330);const bg=c.createLinearGradient(0,-140,0,140);bg.addColorStop(0,'#7a5430');bg.addColorStop(1,'#2a1a0c');c.fillStyle=bg;c.strokeStyle=K2;c.lineWidth=8;rr(c,-240,-130,480,260,24);c.fill();c.stroke();
      c.fillStyle='#d8b450';c.fillRect(-30,-40,60,40);c.strokeStyle='#2a1a0c';c.lineWidth=18;c.beginPath();c.arc(0,-130,50,Math.PI,TAU);c.stroke();
      if(open>0){c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(0,-130,0,0,-130,420*open);lg.addColorStop(0,'rgba(255,230,160,0.7)');lg.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=lg;c.fillRect(-500,-600,1000,700);c.restore();}
      c.restore();if(lock>0&&lock<1)ring(c,360,960,lerp(40,200,lock),(1-lock)*0.6);});
    screenLights(c,[{x:600,y:700,on:1,r:700,hr:1200}],0.35);
  }else{ // letters: Greece & Sardinia, not Sicily
    room(c,t,{dark:0.6,table:false});
    const P=medMap(c,t);
    const lt=inv(A(21),A(21)+0.4,t);c.save();c.translate(lerp(W/2,250,eo(inv(WT(21,4),WT(21,4)+0.4,t))),lerp(1500,1520,lt));c.rotate(-0.06);c.scale(lerp(1.3,0.7,eo(inv(WT(21,4),WT(21,4)+0.4,t))),lerp(1.3,0.7,eo(inv(WT(21,4),WT(21,4)+0.4,t))));
    c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-200,-150,400,300);c.strokeRect(-200,-150,400,300);txt(c,'MOST SECRET',0,-100,34,'#a81c1c',{stroke:false,ls:4});c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=3;for(let i=0;i<6;i++)seg(c,-160,-50+i*30,160,-50+i*30);c.restore();
    arrow(c,P.AF.x-80,P.AF.y,P.GR.x,P.GR.y+40,inv(WT(21,9),WT(21,9)+0.6,t),'#2a5aa8');arrow(c,P.AF.x-160,P.AF.y,P.SA.x+20,P.SA.y+80,inv(WT(21,11),WT(21,11)+0.6,t),'#2a5aa8');
    if(t>A(22))xMark(c,P.SI.x,P.SI.y,70,inv(A(22),A(22)+0.4,t));
    screenLights(c,[{x:W/2,y:600,on:1,r:800,hr:1300}],0.35);
  }
  specks(c,t,20);
};
function xMark(c,x,y,r,p){if(p<=0)return;c.save();c.strokeStyle='#c81c1c';c.lineWidth=18;c.lineCap='round';const q=eo(p);seg(c,x-r,y-r,x-r+2*r*Math.min(1,q*2),y-r+2*r*Math.min(1,q*2));if(q>0.5)seg(c,x+r,y-r,x+r-2*r*(q-0.5)*2,y-r+2*r*(q-0.5)*2);c.restore();}
SH.i=function(c,t){
  if(t<A(24)){ // canister + dry ice fog
    room(c,t,{dark:0.6,ty:1520});const g=c.createLinearGradient(330,0,750,0);g.addColorStop(0,'#3a4248');g.addColorStop(0.6,'#a8b4bc');g.addColorStop(1,'#5a646c');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=7;rr(c,330,560,420,980,40);c.fill();c.stroke();
    for(const y of [700,1000,1300]){c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(330,y,420,18);}c.fillStyle='#e6dcc2';c.fillRect(380,880,320,120);c.strokeRect(380,880,320,120);txt(c,'OPTICAL',540,920,34,'#2a1a10',{stroke:false,ls:3});txt(c,'INSTRUMENTS',540,965,30,'#2a1a10',{stroke:false,ls:3});
    c.save();for(let i=0;i<12;i++){const p=(t*0.35+hash(i))%1;c.globalAlpha=(1-p)*0.6;c.drawImage(SPR.fog,300+hash(i*3)*300-200*p,1500-p*500,500+p*400,300+p*200);}c.restore();
    screenLights(c,[{x:540,y:500,on:1,r:700,hr:1200}],0.4);
    band(c,A(23)+0.2,t,'DRY ICE',1780,{end:A(24),size:44});
  }else if(t<A(25)){ // submarine surfaces at night
    seaNight(c,t,{});const q=eo(inv(A(24),A(24)+0.8,t));submarine(c,560,lerp(1340,1210,q),1.1,t);
    if(q<1){c.fillStyle='rgba(255,255,255,0.5)';for(let i=0;i<14;i++){c.beginPath();c.arc(120+i*65,1210+Math.sin(t*6+i)*10,8+hash(i)*10,0,TAU);c.fill();}}
    band(c,A(24)+0.2,t,'HMS SERAPH',1780,{size:44});
  }else{ // sliding him into the sea off Spain
    const cam={x:0,y:0,z:1};seaNight(c,t,{mx:300,my:560,hz:1120});
    c.fillStyle='#0a0e14';c.beginPath();c.moveTo(560,1120);c.lineTo(740,1060);c.lineTo(900,1080);c.lineTo(1080,1020);c.lineTo(1080,1120);c.fill();c.fillStyle='#ffe6a8';c.beginPath();c.arc(820,1050,6,0,TAU);c.fill();
    c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,230,160,0.2)';c.lineWidth=30;const la=Math.sin(t*1.2)*0.6;seg(c,820,1050,820+Math.cos(Math.PI+la)*500,1050+Math.sin(Math.PI+la)*60);c.restore();
    submarine(c,300,1250,1.4,t);
    L2={dx:-1,rim:'#9ab8e0'};const sl=eo(inv(A(25)+0.2,A(25)+1.6,t));
    fig2(c,{x:330,y:1130,s:1.1,f:1,t,kind:'navy',eyes:'closed',brow:'worried',mouth:'flat',hf:[70,40],hb:[60,50],seed:1});fig2(c,{x:470,y:1130,s:1.1,f:-1,t,kind:'navy',eyes:'closed',brow:'worried',mouth:'flat',hf:[-60,40],seed:2});
    c.save();c.translate(lerp(390,620,sl),lerp(1100,1300,sl*sl));c.rotate(lerp(0,0.5,sl));c.fillStyle='#3e4a32';c.strokeStyle=K2;c.lineWidth=4;rr(c,-110,-18,220,36,16);c.fill();c.stroke();c.restore();
    if(sl>0.9&&t-A(25)<3){const r=((t-A(25)-1.4)*1.2)%1;ring(c,620,1300,40+r*180,(1-r)*0.4,'rgba(200,230,240,',4);}
    band(c,A(25)+0.3,t,'OFF HUELVA, SPAIN · 30 APRIL 1943',1780,{size:36,ls:5});
  }
  specks(c,t,25,'200,220,240');
};
SH.j=function(c,t){
  if(t<A(28)){ // dawn tide; fisherman finds him
    const sand=beachDawn(c,t,{});L2={dx:-1,rim:'#ffd0a0'};
    const p=inv(A(26),A(27),t);lyingFigure(c,lerp(860,640,eo(p)),sand+90,1.4,t);
    if(t>A(27)){const q=eo(inv(A(27),A(27)+0.7,t));
      c.fillStyle='#4a3020';c.beginPath();c.moveTo(-40+lerp(-200,0,q),sand-30);c.lineTo(220+lerp(-200,0,q),sand-30);c.lineTo(180+lerp(-200,0,q),sand+10);c.lineTo(0+lerp(-200,0,q),sand+10);c.fill();
      fig2(c,{x:lerp(-160,290,q),y:sand+330,s:2.3,f:1,t,kind:'fisher',run:q<1?0.6:0,ph:t*9,eyes:q>=1?'shock':'open',brow:q>=1?'up':'flat',mouth:q>=1?'scream':'flat',sweat:q>=1?1:0,hf:q>=1?[50,-110]:null,hb:q>=1?[-30,-110]:null,castLen:0.9});}
    band(c,A(26)+0.3,t,'HUELVA · DAWN',1780,{end:A(27)-0.1,size:40});
  }else{ // German spies photograph the documents
    room(c,t,{dark:0.6,ty:1460});deskLamp(c,820,1460,1.1);
    c.save();c.translate(560,1560);c.rotate(-0.05);for(let i=0;i<3;i++){c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-200+i*60,-120+i*20,300,200);c.strokeRect(-200+i*60,-120+i*20,300,200);}c.restore();
    L2={dx:1,rim:'#ffb35a'};const flash=((t-A(28))%0.9)<0.08&&t>A(28)+0.5;
    fig2(c,{x:300,y:2000,s:2.2,f:1,t,kind:'gspy',eyes:'sly',brow:'angry',mouth:'smirk',hf:[60,-40],propF:pCamera(),castLen:0.7});
    fig2(c,{x:880,y:2050,s:2.1,f:-1,t,kind:'gspy',eyes:'open',brow:'flat',mouth:'flat',look:[-2,1],seed:3});
    if(flash){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,W,H);}
    screenLights(c,[{x:820,y:1310,on:1,r:600,hr:1000}],0.5);
    band(c,A(28)+0.3,t,'GERMAN INTELLIGENCE',1780,{size:40});
  }
  specks(c,t,20,'255,230,200');
};
SH.k=function(c,t){
  if(t<A(31)){ // will they believe it? magnifying glass, heartbeat push-in
    room(c,t,{dark:0.65,ty:1400});deskLamp(c,820,1400,1.0);const z=lerp(1.0,1.25,inv(A(29),A(31),t));
    push(c,z,540,1300,()=>{c.save();c.translate(540,1480);c.rotate(-0.03);c.drawImage(SPR.paper,-280,-180,560,360);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-280,-180,560,360);txt(c,'MOST SECRET',0,-130,32,'#a81c1c',{stroke:false,ls:4});c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=3;for(let i=0;i<7;i++)seg(c,-230,-80+i*34,230,-80+i*34);c.restore();
      if(t>A(30))fig2(c,{x:300,y:2150,s:2.2,f:1,t,kind:'german',eyes:'open',brow:'angry',mouth:'flat',hf:[110,-70],propF:pMag(),look:[2,2],sweat:1});});
    const hb=(t-A(29))%0.85;if(hb<0.15){c.fillStyle=`rgba(120,0,0,${(1-hb/0.15)*0.25})`;c.fillRect(0,0,W,H);}
    screenLights(c,[{x:820,y:1250,on:1,r:600,hr:1100}],0.5);
  }else if(t<A(33)){ // they do -> letters go up the chain
    room(c,t,{dark:0.6,table:false});
    if(t<A(32)){fig2(c,{x:540,y:2150,s:3.0,f:1,t,kind:'german',eyes:'sly',brow:'sly',mouth:'smirk',tilt:Math.sin((t-A(31))*14)*0.08*(t<A(31)+0.5?1:0),hf:[60,-150],propF:pDoc()});}
    else{const p=inv(A(32),A(33),t);for(let i=0;i<4;i++){const x=180+i*240,y=1750-i*230;c.fillStyle='#2a2018';c.fillRect(x-90,y,180,30);
        fig2(c,{x,y,s:0.9,f:1,t,kind:'german',eyes:'open',brow:'flat',mouth:'flat',hf:[60,-60],seed:i});}
      const k=Math.min(3,Math.floor(p*4));const lp=(p*4)%1;const x=lerp(180+k*240,180+(k+1)*240,eo(lp)),y=lerp(1750-k*230,1750-(k+1)*230,eo(lp))-260;c.save();c.translate(x+40,y);c.rotate(Math.sin(t*10)*0.2);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-30,-22,60,44);c.strokeRect(-30,-22,60,44);c.fillStyle='#a81c1c';c.fillRect(-22,-16,44,6);c.restore();}
    screenLights(c,[{x:540,y:600,on:1,r:800,hr:1300}],0.45);
  }else{ // to the very top: a figure seen only from behind
    const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#060404');c.fillStyle=g;c.fillRect(0,0,W,H);
    c.fillStyle='#2a1e16';for(let i=0;i<5;i++)c.fillRect(80+i*200,200,140,1100);c.fillStyle='rgba(0,0,0,0.6)';c.fillRect(0,1300,W,620);
    const z=lerp(1.0,1.12,inv(A(33),A(34),t));push(c,z,540,1300,()=>{c.fillStyle='#3a2416';c.fillRect(200,1250,680,60);c.fillRect(230,1310,30,300);c.fillRect(820,1310,30,300);
      c.fillStyle='#08080a';c.beginPath();c.arc(540,1000,70,0,TAU);c.fill();c.beginPath();c.moveTo(420,1070);c.quadraticCurveTo(540,1030,660,1070);c.lineTo(700,1260);c.lineTo(380,1260);c.closePath();c.fill();
      c.strokeStyle='rgba(255,200,140,0.6)';c.lineWidth=4;c.beginPath();c.arc(540,1000,68,-1.2,0.2);c.stroke();
      c.save();c.translate(560,1240);c.fillStyle='#efe6cc';c.fillRect(-60,-40,120,80);c.restore();});
    screenLights(c,[{x:540,y:900,on:1,r:600,hr:900}],0.45);
    band(c,A(33)+0.2,t,'THE VERY TOP',1780,{size:40});
  }
  specks(c,t,20);
};
SH.l=function(c,t){ // tanks and troops moved to Greece and Sardinia
  room(c,t,{dark:0.6,table:false});const P=medMap(c,t);
  const tanks=(t0,tx,ty,n,seed)=>{for(let i=0;i<n;i++){const q=eo(inv(t0+i*0.08,t0+i*0.08+0.9,t));if(q<=0)continue;const sx=P.SI.x-40+i*20,sy=P.SI.y+(i%2)*30;tankIcon(c,lerp(sx,tx+(i%3)*40-40,q),lerp(sy,ty+Math.floor(i/3)*36,q),0.9);}};
  tanks(A(34),P.GR.x,P.GR.y-40,6,1);tanks(A(35),P.SA.x,P.SA.y-60,4,2);
  if(t>A(36)){const k=back(inv(A(36),A(36)+0.3,t));c.save();c.translate(P.SI.x,P.SI.y-20);c.scale(k,k);fig2(c,{x:0,y:40,s:0.55,f:1,t,kind:'german',eyes:'open',brow:'worried',mouth:'flat'});c.restore();txt(c,'(nearly empty)',P.SI.x,P.SI.y+170,30,'#3a2414',{stroke:false,font:'"Lora"',w:700});}
  screenLights(c,[{x:W/2,y:600,on:1,r:900,hr:1400}],0.35);specks(c,t,15);
};
SH.m=function(c,t){ // London gets the message
  room(c,t,{dark:0.5,ty:1460,win:[640,330],view:(cc,wx,wy)=>searchlightsMini(cc,wx,wy,t)});deskLamp(c,180,1460,1.0);
  c.fillStyle='#1a1a1c';c.strokeStyle=K2;c.lineWidth=5;rr(c,330,1320,420,180,20);c.fill();c.stroke();for(let r=0;r<3;r++)for(let k=0;k<8;k++){c.fillStyle='#d8d4c8';c.beginPath();c.arc(370+k*48,1370+r*40,13,0,TAU);c.fill();}
  const roll=inv(A(38),A(38)+1.0,t);const ph=lerp(120,560,eo(Math.max(roll,inv(A(37),A(38),t)*0.2)));
  c.save();c.translate(540,1320-ph/2);c.fillStyle='#f2ecd8';c.fillRect(-180,-ph/2,360,ph);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(-180,-ph/2,360,ph);
  txt(c,'TELEGRAM',0,-ph/2+40,30,'#5a3a20',{stroke:false,ls:6});if(t>A(38)){const typed='MINCEMEAT SWALLOWED WHOLE';const n=Math.floor(inv(A(38),B(38),t)*typed.length);const words=typed.slice(0,n).split(' ');words.forEach((w2,i)=>txt(c,w2,0,-ph/2+120+i*70,46,'#1a1a1a',{stroke:false,font:'"Courier 10 Pitch"',w:700}));}
  c.restore();
  if(t>B(38)-0.1){fig2(c,{x:150,y:2300,s:2.4,f:1,t,kind:'intelnh',eyes:'happy',brow:'up',mouth:'scream',hf:[40,-170],hb:[-40,-170]});fig2(c,{x:940,y:2300,s:2.4,f:-1,t,kind:'intel2',eyes:'squeeze',brow:'up',mouth:'teeth',hf:[-40,-170],hb:[40,-170]});}
  screenLights(c,[{x:180,y:1300,on:1,r:700,hr:1200}],0.4);
};
SH.n=function(c,t){
  if(t<A(41)){ // landing in Sicily at dawn
    const sand=beachDawn(c,t,{sx:700,land:'#4a3a4a'});L2={dx:1,rim:'#ffd0a0'};
    for(let i=0;i<3;i++){const x=200+i*300+((t-A(39))*30),y=sand-40-i*30;c.save();c.translate(x,y);c.scale(0.8-i*0.15,0.8-i*0.15);c.fillStyle='#3a4038';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(-160,-50);c.lineTo(160,-50);c.lineTo(130,20);c.lineTo(-140,20);c.closePath();c.fill();c.stroke();c.restore();}
    if(t>A(40)){for(let i=0;i<4;i++){const t0=A(40)+i*0.2;const g=(tt)=>{const q=(tt-t0)/1.6;if(q<0||q>1)return null;return {x:lerp(80+i*90,760+i*90,q),y:sand+200+i*60,s:1.6,f:1,t:tt,kind:'tommy',run:1,ph:tt*14+i,eyes:'angry',brow:'angry',mouth:'teeth'};};
      for(let k=3;k>=1;k--){const o=g(t-k*0.04);if(o){o.ghost='rgba(255,210,120,1)';o.ga=0.12+0.05*(3-k);fig2(c,o);}}const o=g(t);if(o)fig2(c,o);}}
    band(c,A(39),t,'SICILY · JULY 1943',1780,{size:44});
  }else{ // a German sentry watching the wrong way
    const sand=beachDawn(c,t,{sx:700});L2={dx:1,rim:'#ffd0a0'};
    c.fillStyle='#5a4a3a';c.beginPath();c.moveTo(0,sand-200);c.lineTo(620,sand-220);c.lineTo(700,H);c.lineTo(0,H);c.fill();
    c.fillStyle='#e8dcc0';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(30,sand-470,220,70);c.strokeRect(30,sand-470,220,70);txt(c,'← GREECE',140,sand-435,32,'#3a2414',{stroke:false,font:'"Lora"'});c.fillStyle='#3a2a1a';c.fillRect(130,sand-400,14,190);
    const turn=t>WT(41,4);
    fig2(c,{x:400,y:sand-210,s:2.0,f:turn?1:-1,t,kind:'german',eyes:turn?'shock':'sly',brow:turn?'up':'flat',mouth:turn?'scream':'smirk',sweat:turn?1:0,hf:turn?[50,-120]:[-30,-60],propF:turn?null:pBinoc(),castLen:0.6});
    if(turn){const k=back(inv(WT(41,4),WT(41,4)+0.3,t));c.save();c.translate(560,sand-640);c.scale(k,k);txt(c,'!!',0,0,120,'#fff',{sw:14});c.restore();}
    for(let i=0;i<4;i++){const x=760+i*90+Math.sin(t*8+i)*4;fig2(c,{x,y:sand+200+(i%2)*60,s:1.1,f:-1,t,kind:'tommy',run:0.6,ph:t*12+i,eyes:'angry',brow:'angry',mouth:'flat'});}
  }
  specks(c,t,20,'255,230,200');
};
SH.o=function(c,t){ // Mincemeat; the grave in Huelva
  if(t<A(43)){room(c,t,{dark:0.6,table:false});const k=back(inv(A(42),A(42)+0.4,t));c.save();c.translate(540,960);c.scale(k,k);c.rotate(-0.04);c.drawImage(SPR.paper,-380,-240,760,480);c.strokeStyle=K2;c.lineWidth=5;c.strokeRect(-380,-240,760,480);
      txt(c,'OPERATION',0,-90,60,'#2a1a10',{stroke:false,font:'"Lora"',ls:10});txt(c,'MINCEMEAT',0,10,96,'#a81c1c',{stroke:false,ls:6});txt(c,'MOST SECRET · 1943',0,110,30,'#5a3a20',{stroke:false,ls:6});c.restore();
    screenLights(c,[{x:540,y:700,on:1,r:800,hr:1300}],0.35);}
  else{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a1a3a');g.addColorStop(0.55,'#e88a5a');g.addColorStop(1,'#3a2418');c.fillStyle=g;c.fillRect(0,0,W,H);
    const sg=c.createRadialGradient(780,1180,0,780,1180,600);sg.addColorStop(0,'rgba(255,230,180,0.85)');sg.addColorStop(1,'rgba(255,180,120,0)');c.fillStyle=sg;c.fillRect(0,0,W,H);c.fillStyle='#ffe8c0';c.beginPath();c.arc(780,1180,90,0,TAU);c.fill();
    c.fillStyle='#2a1a1e';c.fillRect(0,1240,W,680);for(let i=0;i<7;i++){c.fillStyle='#1a1014';c.fillRect(40+i*160,1150-hash(i)*60,26,120+hash(i)*60);c.beginPath();c.arc(53+i*160,1150-hash(i)*60,40,Math.PI,TAU);c.fill();}
    const z=lerp(1.0,1.15,inv(A(43),END,t));push(c,z,540,1500,()=>{tombstone(c,540,1720,1.45,inv(A(44),A(44)+0.8,t));});
    band(c,A(43)+0.2,t,'HUELVA CEMETERY',1840,{size:36,end:B(45)});
    if(t>B(45)+0.1){c.fillStyle=`rgba(0,0,0,${inv(B(45)+0.1,END,t)})`;c.fillRect(0,0,W,H);}}
  specks(c,t,25,'255,220,180');
};
const SHOTS=[[0,'a'],[A(3),'b'],[A(4),'c'],[A(8),'d'],[A(9),'e'],[A(11),'f'],[A(14),'g'],[A(19),'h'],[A(23),'i'],[A(26),'j'],[A(29),'k'],[A(34),'l'],[A(37),'m'],[A(39),'n'],[A(42),'o']];
const IMPACTS=[[A(2)+0.3,14,0.4,'#cfe0ff',0.3],[T_SLAM,10,0.3],[WT(8,10),10,0.3],[WT(19,3),8,0.25],[A(22),12,0.35],[A(31),8,0.3],[A(38),6,0.3],[WT(41,4),14,0.4,'#fff',0.25]];
