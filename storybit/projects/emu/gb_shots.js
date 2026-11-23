// ===== Agent GARBO · Style 2 S2 =====
function band(c,t0,t,title,y=1560,o={}){const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.3)return;const a=Math.min(clamp(p/0.25),t>end?1-(t-end)/0.3:1);c.save();c.globalAlpha=a;c.fillStyle='rgba(0,0,0,0.78)';c.fillRect(0,y-58,W,116);txt(c,title,W/2,y-4,o.size||52,'#f4f1ea',{stroke:false,ls:o.ls??12,w:800});c.fillStyle='#e8302a';const lw=lerp(0,140,eo(p/0.5));c.fillRect(W/2-lw/2,y+34,lw,4);c.restore();}
function scam(x,z,gs=1600){return {x,y:GY-(gs-960)/z,z};}
function push(c,z,cx,cy,fn){c.save();c.translate(cx,cy);c.scale(z,z);c.translate(-cx,-cy);fn();c.restore();}
function room(c,t,o={}){c.save();brickRect(c,0,0,W,H,o.dark??0.45);c.restore();
  if(o.win){const [wx,wy]=o.win;c.fillStyle='#0c0a08';c.fillRect(wx-16,wy-16,332,432);const g=c.createLinearGradient(0,wy,0,wy+400);g.addColorStop(0,o.wc1||'#0a1428');g.addColorStop(1,o.wc2||'#1c2c48');c.fillStyle=g;c.fillRect(wx,wy,300,400);if(o.view)o.view(c,wx,wy);c.fillStyle='#0c0a08';c.fillRect(wx+142,wy,16,400);c.fillRect(wx,wy+190,300,14);}
  if(o.table!==false){const ty=o.ty??1420;const g=c.createLinearGradient(0,ty,0,H);g.addColorStop(0,'#5a3820');g.addColorStop(1,'#1c120a');c.fillStyle=g;c.fillRect(0,ty,W,H-ty);c.fillStyle='rgba(255,210,150,0.3)';c.fillRect(0,ty,W,5);}}
function deskLamp(c,x,y,s=1){c.fillStyle='#1a2a1a';c.fillRect(x-6*s,y-150*s,12*s,150*s);c.fillRect(x-40*s,y-8*s,80*s,10*s);c.fillStyle='#2f6a3a';c.beginPath();c.moveTo(x-70*s,y-150*s);c.lineTo(x+70*s,y-150*s);c.lineTo(x+40*s,y-200*s);c.lineTo(x-40*s,y-200*s);c.closePath();c.fill();c.fillStyle='#fff2c0';c.fillRect(x-60*s,y-152*s,120*s,5*s);}
function arrow(c,x0,y0,x1,y1,p,col='#b81c1c',w=14,bend=60){if(p<=0)return;const x=lerp(x0,x1,eo(p)),y=lerp(y0,y1,eo(p));c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo((x0+x)/2,(y0+y)/2-bend,x,y);c.stroke();
  const a=Math.atan2(y-((y0+y)/2-bend),x-(x0+x)/2);c.beginPath();c.moveTo(x+Math.cos(a)*w*1.8,y+Math.sin(a)*w*1.8);c.lineTo(x+Math.cos(a+2.4)*w*2.2,y+Math.sin(a+2.4)*w*2.2);c.lineTo(x+Math.cos(a-2.4)*w*2.2,y+Math.sin(a-2.4)*w*2.2);c.fill();}
function tankIcon(c,x,y,s,col='#3a3e34'){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=3;rr(c,-34,-10,68,22,8);c.fill();c.stroke();rr(c,-18,-26,36,18,5);c.fill();c.stroke();c.lineWidth=5;c.strokeStyle=col;seg(c,18,-18,48,-22);c.restore();}
function xMark(c,x,y,r,p){if(p<=0)return;c.save();c.strokeStyle='#c81c1c';c.lineWidth=18;c.lineCap='round';const q=eo(p);seg(c,x-r,y-r,x-r+2*r*Math.min(1,q*2),y-r+2*r*Math.min(1,q*2));if(q>0.5)seg(c,x+r,y-r,x+r-2*r*(q-0.5)*2,y-r+2*r*(q-0.5)*2);c.restore();}
function paper(c,x,y,w,h,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(-w/2+10,-h/2+12,w,h);c.drawImage(SPR.paper,-w/2,-h/2,w,h);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-w/2,-h/2,w,h);}
function lines(c,x0,y0,w,n,dy=30){c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=3;for(let i=0;i<n;i++)seg(c,x0,y0+i*dy,x0+w*(i===n-1?0.6:1),y0+i*dy);}
function postmark(c,x,y,r,label,p,col='#1a3a8a'){if(p<=0)return;const k=lerp(2.2,1,eo(clamp(p*3)));c.save();c.translate(x,y);c.scale(k,k);c.rotate(-0.2);c.globalAlpha=clamp(p*4);c.strokeStyle=col;c.lineWidth=7;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();c.lineWidth=3;c.beginPath();c.arc(0,0,r-12,0,TAU);c.stroke();txt(c,label,0,4,r*0.42,col,{stroke:false,ls:3});for(let i=0;i<4;i++){c.lineWidth=5;seg(c,r+10,-24+i*16,r+150,-24+i*16+Math.sin(i)*4);}c.restore();}
function typewriter(c,x,y,s,t,typing){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#1a1a1c';c.strokeStyle=K2;c.lineWidth=5;rr(c,-200,-60,400,130,20);c.fill();c.stroke();c.fillStyle='#2a2a2e';rr(c,-230,-110,460,50,20);c.fill();c.stroke();
  for(let r=0;r<3;r++)for(let k=0;k<9;k++){const pr=typing&&hash(k+r*9+Math.floor(t*14))>0.85?4:0;c.fillStyle='#d8d4c8';c.beginPath();c.arc(-160+k*40,-20+r*30+pr,11,0,TAU);c.fill();}
  c.fillStyle='#efe6cc';c.fillRect(-150,-260,300,160);c.strokeRect(-150,-260,300,160);lines(c,-120,-230,240,4,30);c.restore();}
function radioSet(c,x,y,s,t,on){c.save();c.translate(x,y);c.scale(s,s);const g=c.createLinearGradient(0,-120,0,120);g.addColorStop(0,'#4a4a3a');g.addColorStop(1,'#1c1c14');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=6;rr(c,-200,-120,400,220,16);c.fill();c.stroke();
  for(let i=0;i<3;i++){c.fillStyle='#111';c.beginPath();c.arc(-120+i*80,30,26,0,TAU);c.fill();c.strokeStyle='#8a8a7a';c.lineWidth=4;seg(c,-120+i*80,30,-120+i*80+Math.cos(t+i)*20,30+Math.sin(t+i)*20);}
  c.fillStyle=on?'#ffd66a':'#4a3a1a';c.fillRect(-160,-90,320,50);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(-160,-90,320,50);c.fillStyle='#a01010';c.fillRect(-160+((t*40)%300),-90,5,50);
  c.strokeStyle='#2a2a2a';c.lineWidth=8;seg(c,150,-120,230,-330);c.restore();}
function waves(c,x,y,t,dir=1,col='255,220,140',n=4){c.save();c.globalCompositeOperation='lighter';for(let k=0;k<n;k++){const r=((t*1.2+k/n)%1);c.strokeStyle=`rgba(${col},${(1-r)*0.7})`;c.lineWidth=8;c.beginPath();c.arc(x,y,40+r*260,dir>0?-0.7:Math.PI-0.7,dir>0?0.7:Math.PI+0.7);c.stroke();}c.restore();}
function agentCard(c,x,y,i,p,t){if(p<=0)return;const k=back(p);c.save();c.translate(x,y);c.scale(k,k);c.rotate((hash(i*3)-.5)*0.2);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(-58,-70,124,152);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-62,-76,124,152);c.strokeRect(-62,-76,124,152);
  c.fillStyle='#5a5a5a';c.fillRect(-46,-62,92,76);c.fillStyle='#1a1a1a';c.beginPath();c.arc(0,-30,20,0,TAU);c.fill();c.fillRect(-30,-10,60,24);
  const hats=['#2a2a2a','#5a3a20','#3e4a32'];c.fillStyle=hats[i%3];if(i%2){c.fillRect(-26,-56,52,10);c.fillRect(-16,-66,32,12);}
  c.fillStyle='#d01c1c';c.font='900 18px "Inter Display"';c.textAlign='center';c.fillText('AGENT '+(i+1),0,40);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2;seg(c,-44,54,44,54);seg(c,-44,64,30,64);
  c.fillStyle='#b01818';c.beginPath();c.arc(0,-72,6,0,TAU);c.fill();c.restore();}
function letterEnv(c,x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.fillStyle='#efe6d0';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-60,-38,120,76);c.strokeRect(-60,-38,120,76);c.beginPath();c.moveTo(-60,-38);c.lineTo(0,6);c.lineTo(60,-38);c.stroke();c.fillStyle='#c82a3a';c.beginPath();c.arc(0,10,8,0,TAU);c.fill();c.restore();}
function channelMap(c,t){ // England top, France bottom
  c.save();c.drawImage(SPR.paper,40,360,W-80,1300);c.strokeStyle='#3a2a1a';c.lineWidth=6;c.strokeRect(40,360,W-80,1300);c.fillStyle='rgba(70,110,140,0.28)';c.fillRect(60,380,W-120,1260);
  c.fillStyle='#c8b48a';c.strokeStyle='#5a4228';c.lineWidth=4;
  c.beginPath();c.moveTo(60,380);c.lineTo(1020,380);c.lineTo(1020,640);c.quadraticCurveTo(900,700,820,680);c.quadraticCurveTo(600,760,420,740);c.quadraticCurveTo(240,800,60,760);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(60,1640);c.lineTo(60,1180);c.quadraticCurveTo(200,1150,300,1060);c.lineTo(340,1180);c.quadraticCurveTo(480,1230,640,1170);c.quadraticCurveTo(760,1040,860,960);c.quadraticCurveTo(940,900,1020,900);c.lineTo(1020,1640);c.closePath();c.fill();c.stroke();
  const lab=(s2,x,y,sz=30)=>txt(c,s2,x,y,sz,'#3a2414',{stroke:false,font:'"Lora"',w:700,ls:3});lab('ENGLAND',540,520,36);lab('FRANCE',540,1460,36);lab('NORMANDY',300,1270);lab('CALAIS',880,1010);
  c.restore();return {EN:{x:420,y:640},NO:{x:330,y:1200},CA:{x:900,y:940}};}
function medal(c,x,y,s,type,t){c.save();c.translate(x,y);c.scale(s,s);c.rotate(Math.sin(t*2)*0.05);
  if(type==='iron'){c.fillStyle='#1a1a1c';c.fillRect(-14,-170,28,60);c.fillStyle='#b01818';c.fillRect(-8,-170,16,60);c.fillStyle='#f0f0f0';c.fillRect(-14,-150,28,8);
    c.strokeStyle=K2;c.lineWidth=6;for(let i=0;i<4;i++){c.save();c.rotate(i*Math.PI/2);c.fillStyle='#c8c8cc';c.beginPath();c.moveTo(-20,-10);c.lineTo(-36,-98);c.lineTo(36,-98);c.lineTo(20,-10);c.closePath();c.fill();c.stroke();c.fillStyle='#121214';c.beginPath();c.moveTo(-12,-6);c.lineTo(-25,-86);c.lineTo(25,-86);c.lineTo(12,-6);c.closePath();c.fill();c.restore();}c.fillStyle='#121214';c.fillRect(-16,-16,32,32);
    c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(-22,-84,8,60);}
  else{c.fillStyle='#d8546a';c.fillRect(-26,-180,52,70);c.fillStyle='#8a8a90';c.fillRect(-6,-180,12,70);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-26,-180,52,70);
    const g=c.createRadialGradient(-20,-20,4,0,0,90);g.addColorStop(0,'#fff6d0');g.addColorStop(1,'#a8862a');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=6;c.beginPath();for(let i=0;i<8;i++){const a=i/8*TAU-Math.PI/2;c.lineTo(Math.cos(a)*88,Math.sin(a)*88);c.lineTo(Math.cos(a+TAU/16)*58,Math.sin(a+TAU/16)*58);}c.closePath();c.fill();c.stroke();
    c.fillStyle='#b01818';c.beginPath();c.arc(0,0,30,0,TAU);c.fill();c.stroke();c.fillStyle='#e8d070';c.beginPath();c.arc(0,0,16,0,TAU);c.fill();}
  c.restore();}
function palm(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#3a2a1a';c.lineWidth=26;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(30,-200,10,-420);c.stroke();
  for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*0.5+Math.sin(t*1.5+i)*0.05;c.strokeStyle='#2a4a2a';c.lineWidth=18;c.beginPath();c.moveTo(10,-420);c.quadraticCurveTo(10+Math.cos(a)*120,-420+Math.sin(a)*120-40,10+Math.cos(a)*220,-420+Math.sin(a)*220+60);c.stroke();}c.restore();}
// cast
Object.assign(KIND2,{garbo:{coat:'#5a4636',limb:'#ecebe6',hat:'trilby',long:true,tie:'#8a2a24'},garboOld:{coat:'#c8bca4',limb:'#ecebe6',hat:'fedora',long:true,tie:'#6a3a2a'}});
const GB=(o)=>fig2(o.c,{kind:'garbo',stache:true,...o});
var SH={};
SH.a=function(c,t){ // hook: Garbo and 27 phantom spies
  room(c,t,{dark:0.7,table:false});L2={dx:-1,rim:'#ffb35a'};
  const z=lerp(1.0,1.12,inv(0,B(0),t));push(c,z,W/2,1300,()=>{
    for(let i=0;i<27;i++){const r=Math.floor(i/9),k=i%9;const x=100+k*110+(r%2)*50,y=1300-r*150;const a=inv(WT(0,3)+i*0.03,WT(0,3)+i*0.03+0.3,t)*(1-inv(WT(0,7),B(0)+0.2,t));if(a<=0)continue;
      c.save();c.globalAlpha=a*(0.55-r*0.12);fig2(c,{x,y,s:0.75-r*0.08,f:k<4?1:-1,t,kind:'gspy',ghost:'rgba(150,130,105,1)',ga:1});c.restore();}
    if(t>WT(0,7)){const q=inv(WT(0,7),B(0)+0.4,t);c.save();for(let i=0;i<10;i++){c.globalAlpha=(1-q)*0.5*q*4>0.5?0.5:(1-q)*q*2;c.drawImage(SPR.fog,40+i*100-q*60,1100-q*200+hash(i)*200,300,140);}c.restore();}
    GB({c,x:540,y:1880,s:2.6,f:1,t,eyes:t>WT(0,1)?'sly':'open',brow:'sly',mouth:'smirk',hf:[40,-140],propF:pPen?pPen(false):null,castLen:1});});
  screenLights(c,[{x:540,y:500,on:1,r:800,hr:1300}],0.45);specks(c,t,25);
};
SH.b=function(c,t){ // one man with a pen
  room(c,t,{dark:0.6,ty:1460});deskLamp(c,850,1460,1.1);L2={dx:1,rim:'#ffb35a'};
  const z=lerp(1.3,1.1,eo(inv(A(1),A(1)+0.6,t)));push(c,z,540,1400,()=>{
    c.save();c.translate(560,1600);c.rotate(-0.05);c.drawImage(SPR.paper,-260,-160,520,320);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-260,-160,520,320);const n=Math.floor(inv(WT(1,7),B(1),t)*6);lines(c,-220,-110,440,n,40);c.restore();
    GB({c,x:300,y:1950,s:2.4,f:1,t,eyes:'open',brow:'flat',mouth:'flat',hf:[110,lerp(-40,-10,(Math.sin(t*12)+1)/2)],look:[2,2]});});
  if(t>WT(1,14)){const k=back(inv(WT(1,14),WT(1,14)+0.3,t));c.save();c.translate(760,700);c.scale(k,k);c.rotate(0.06);c.fillStyle='#b01818';rr(c,-170,-60,340,120,14);c.fill();txt(c,'D-DAY',0,4,80,'#fff',{sw:10,ls:6});c.restore();}
  screenLights(c,[{x:850,y:1300,on:1,r:700,hr:1100}],0.45);specks(c,t,20);
};
SH.c=function(c,t){ // 1941 · Juan Pujol García · hates both sides · wants to spy for Britain
  const cam=scam(lerp(-80,80,inv(A(2),B(5),t)),1.25,1720);L2={dx:-1,rim:'#ffc27a'};
  const lights=street(c,t,cam,{seed:7,sky:{moon:true},lamps:[{x:-260,on:1},{x:420,on:1}],world:c2=>{
    GB({c:c2,x:60,y:GY+30,s:2.0,f:1,t,eyes:t>A(5)?'sly':'open',brow:t>A(4)&&t<A(5)?'angry':'flat',mouth:t>A(4)&&t<A(5)?'frown':(t>A(5)?'smirk':'flat'),hf:t>A(5)?[40,-120]:null,castLen:1.1,seed:2});}});
  finishStreet(c,t,cam,lights,{dark:0.55});
  band(c,A(2),t,'1941',1700,{end:A(3),size:64,ls:20});
  if(t>A(3)&&t<A(4)+0.1){card(c,A(3),t,'JUAN PUJOL GARCÍA','SPAIN · BORN 1912',1700,{end:A(4)-0.1,w:860,size:56,tag:'SUBJECT'});}
  if(t>A(4)&&t<A(5)){const pl=(x,lbl,col,t0)=>{const p=inv(t0,t0+0.3,t);if(p<=0)return;c.save();c.translate(x,700);c.scale(back(p),back(p));c.rotate(x<540?-0.06:0.06);c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-170,-220,340,440);c.strokeRect(-170,-220,340,440);c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.arc(0,-40,90,0,TAU);c.fill();txt(c,lbl,0,150,46,'#fff',{sw:8,ls:4});c.restore();xMark(c,x,700,130,inv(t0+0.35,t0+0.65,t));};
    pl(290,'FASCISM','#3a3a40',WT(4,5));pl(790,'COMMUNISM','#7a1a1a',WT(4,7));}
  if(t>A(5)){const k=back(inv(A(5),A(5)+0.35,t));c.save();c.translate(700,700);c.scale(k,k);c.fillStyle='#f3efe4';c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.ellipse(0,0,260,170,0,0,TAU);c.fill();c.stroke();
    for(let i=0;i<3;i++){c.beginPath();c.arc(-200+i*-30,180+i*40,16-i*4,0,TAU);c.fill();c.stroke();}
    c.save();c.beginPath();c.ellipse(0,0,240,150,0,0,TAU);c.clip();c.fillStyle='#1a2a5a';c.fillRect(-240,-150,480,300);c.strokeStyle='#fff';c.lineWidth=60;seg(c,-240,-150,240,150);seg(c,240,-150,-240,150);c.strokeStyle='#c8102e';c.lineWidth=20;seg(c,-240,-150,240,150);seg(c,240,-150,-240,150);c.strokeStyle='#fff';c.lineWidth=80;seg(c,0,-150,0,150);seg(c,-240,0,240,0);c.strokeStyle='#c8102e';c.lineWidth=46;seg(c,0,-150,0,150);seg(c,-240,0,240,0);c.restore();c.restore();}
};
SH.d=function(c,t){ // Britain said no. Three times.
  room(c,t,{dark:0.5,ty:1500});L2={dx:-1,rim:'#ffb35a'};
  c.fillStyle='#3a2416';c.strokeStyle=K2;c.lineWidth=8;c.fillRect(600,520,360,980);c.strokeRect(600,520,360,980);c.fillStyle='#2a180e';c.fillRect(640,580,280,380);c.fillRect(640,1020,280,420);c.fillStyle='#d8b450';c.beginPath();c.arc(630,1060,14,0,TAU);c.fill();
  c.fillStyle='#e8dcc0';c.fillRect(660,440,240,60);c.strokeRect(660,440,240,60);txt(c,'BRITISH EMBASSY',780,470,22,'#2a1a10',{stroke:false,ls:2,w:800});
  const nos=[WT(6,2),WT(7,0),WT(7,1)];let n=0;for(const q of nos)if(t>q)n++;
  GB({c,x:300,y:1880,s:2.3,f:1,t,eyes:n>=2?'half':'open',brow:n>=1?'worried':'flat',mouth:n>=1?'frown':'flat',sweat:n>=3?1:0,hf:n?null:[60,-60],seed:3});
  nos.forEach((q,i)=>stamp(c,q,t,'REJECTED',540+(i-1)*40,620+i*260,{size:84,rot:-0.15+i*0.12}));
  screenLights(c,[{x:780,y:600,on:1,r:700,hr:1100}],0.45);specks(c,t,20);
};
SH.e=function(c,t){ // so he went to the Nazis
  room(c,t,{dark:0.55,ty:1500});L2={dx:1,rim:'#9ab8e0'};
  c.fillStyle='#5a1414';c.fillRect(420,300,240,700);c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(420,300,30,700);
  const q=eo(inv(A(8),A(8)+0.9,t));
  GB({c,x:lerp(-120,330,q),y:1880,s:2.3,f:1,t,walk:q<1?1:0,ph:t*7,eyes:'open',brow:'flat',mouth:q>=1?'smirk':'flat',hf:q>=1?[90,-20]:null});
  fig2(c,{x:780,y:1880,s:2.3,f:-1,t,kind:'german',eyes:t>WT(8,6)?'sly':'open',brow:'angry',mouth:t>WT(8,6)?'smirk':'flat',hf:q>=1?[-90,-20]:null,seed:4});
  band(c,A(8)+0.2,t,'MADRID · GERMAN ABWEHR',1780,{size:40,ls:6});
  screenLights(c,[{x:540,y:500,on:1,r:800,hr:1200}],0.45);specks(c,t,20);
};
SH.f=function(c,t){ // "London" reports, written in Lisbon
  if(t<A(11)){ // the letter + LONDON postmark, then scratch
    const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#5a3820');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.fillRect(0,0,W,H);
    const wasnt=t>A(10);const z=wasnt?lerp(1.3,1.0,eo(inv(A(10),A(10)+0.3,t))):1.0;
    push(c,z,540,960,()=>{paper(c,540,980,700,460,-0.04);txt(c,'REPORT FROM LONDON',0,-160,40,'#2a1a10',{stroke:false,font:'"Lora"'});lines(c,-280,-90,560,6,40);c.restore();
      postmark(c,760,800,110,'LONDON',inv(WT(9,5),WT(9,5)+0.4,t));
      if(wasnt)xMark(c,760,800,120,inv(A(10),A(10)+0.3,t));});
    if(wasnt){const k=back(inv(A(10),A(10)+0.3,t));c.save();c.translate(540,1500);c.scale(k,k);txt(c,'HE WASN\'T.',0,0,110,'#fff',{sw:16,ls:4});c.restore();}
  }else{ // Lisbon desk with guidebook, maps, magazines
    room(c,t,{dark:0.55,ty:1420,win:[640,330],wc1:'#e8a060',wc2:'#f6d0a0',view:(cc,wx,wy)=>{cc.fillStyle='#c86a3a';for(let i=0;i<6;i++)cc.fillRect(wx+i*55,wy+260-hash(i)*120,50,300);cc.fillStyle='#e8e0d0';cc.fillRect(wx+40,wy+300,80,100);}});
    L2={dx:-1,rim:'#ffc27a'};band(c,A(11),t,'LISBON, PORTUGAL',1780,{size:44,end:A(12)+1});
    const it=(t0,x,y,rot,fn)=>{const p=inv(t0,t0+0.3,t);if(p<=0)return;c.save();c.translate(x,y-(1-eo(p))*100);c.rotate(rot);c.globalAlpha=clamp(p*3);fn();c.restore();};
    typewriter(c,560,1520,0.9,t,true);
    it(WT(12,6),850,1500,0.1,()=>{c.fillStyle='#1a3a6a';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-90,-120,180,240);c.strokeRect(-90,-120,180,240);txt(c,'GUIDE',0,-50,34,'#e8d070',{stroke:false,ls:3});txt(c,'TO',0,-10,24,'#e8d070',{stroke:false});txt(c,'BRITAIN',0,30,30,'#e8d070',{stroke:false,ls:3});});
    it(A(13),220,1560,-0.12,()=>{c.drawImage(SPR.paper,-140,-100,280,200);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-140,-100,280,200);c.strokeStyle='#2a5aa8';c.lineWidth=5;c.beginPath();c.moveTo(-100,60);c.quadraticCurveTo(-20,-80,90,-40);c.stroke();c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2;for(let i=0;i<5;i++)seg(c,-140+i*60,-100,-140+i*60,100);});
    it(WT(13,2),340,1760,0.08,()=>{for(let i=0;i<2;i++){c.save();c.translate(i*40,i*18);c.fillStyle=i?'#b8382a':'#d8a43a';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-100,-70,200,140);c.strokeRect(-100,-70,200,140);txt(c,i?'PICTURE':'NEWS',0,-38,26,'#fff',{stroke:false,ls:2});c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(-80,-14,160,70);c.restore();}});
    GB({c,x:200,y:1950,s:2.2,f:1,t,eyes:'sly',brow:'sly',mouth:'smirk',hf:[120,-60]});
    screenLights(c,[{x:790,y:520,on:1,r:800,hr:1200}],0.35);
  }
  specks(c,t,20);
};
SH.g=function(c,t){ // the Germans believed every word
  room(c,t,{dark:0.6,ty:1460});deskLamp(c,180,1460,1.0);L2={dx:1,rim:'#ffb35a'};
  paper(c,560,1540,440,260,-0.05);txt(c,'AGENT ARABEL',0,-90,30,'#2a1a10',{stroke:false,font:'"Lora"'});lines(c,-180,-40,360,4,34);c.restore();
  const nod=Math.max(0,Math.sin((t-A(14))*10))*0.08*(t>WT(14,2)?1:0);
  fig2(c,{x:300,y:1900,s:2.3,f:1,t,kind:'german',eyes:'sly',brow:'sly',mouth:t>WT(14,2)?'smile':'flat',tilt:nod,hf:[90,-60],propF:pDoc()});
  fig2(c,{x:860,y:1900,s:2.3,f:-1,t,kind:'german',eyes:t>WT(14,3)?'happy':'open',brow:'up',mouth:t>WT(14,3)?'teeth':'flat',tilt:-nod,seed:3});
  if(t>WT(14,2))stamp(c,WT(14,3),t,'VERIFIED',540,760,{size:90,col:'#1a6a2a',rot:0.1});
  screenLights(c,[{x:180,y:1300,on:1,r:700,hr:1100}],0.45);specks(c,t,20);
};
SH.h=function(c,t){ // Nazis hunt a convoy that does not exist
  room(c,t,{dark:0.6,table:false});L2={dx:1,rim:'#9ab8e0'};
  const z=lerp(1.0,1.15,inv(A(15),B(15),t));push(c,z,540,1000,()=>{c.drawImage(SPR.paper,40,360,W-80,1300);c.strokeStyle='#3a2a1a';c.lineWidth=6;c.strokeRect(40,360,W-80,1300);c.fillStyle='rgba(50,90,130,0.35)';c.fillRect(60,380,W-120,1260);
    c.strokeStyle='rgba(0,0,0,0.15)';c.lineWidth=2;for(let i=0;i<10;i++){seg(c,60,380+i*126,1020,380+i*126);seg(c,60+i*96,380,60+i*96,1640);}
    txt(c,'ATLANTIC',540,1560,34,'rgba(20,30,50,0.6)',{stroke:false,font:'"Lora"',ls:12});
    const exist=inv(WT(15,8),WT(15,10),t);
    for(let i=0;i<6;i++){const x=300+(i%3)*170,y=900+Math.floor(i/3)*150;c.save();c.translate(x,y);c.globalAlpha=1-exist*0.75;if(exist>0)c.setLineDash([10,8]);c.fillStyle=exist>0.5?'rgba(0,0,0,0)':'#3a4048';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.moveTo(-60,-12);c.lineTo(60,-12);c.lineTo(44,14);c.lineTo(-50,14);c.closePath();c.fill();c.stroke();c.fillRect(-14,-30,28,18);c.strokeRect(-14,-30,28,18);c.setLineDash([]);c.restore();}
    for(let i=0;i<4;i++){const q=eo(inv(WT(15,4)+i*0.2,WT(15,4)+i*0.2+0.6,t));const sx=900,sy=500+i*90;const tx=360+i*120,ty=860+(i%2)*150;c.strokeStyle='#8a1c1c';c.lineWidth=6;c.setLineDash([16,10]);if(q>0)seg(c,sx,sy,lerp(sx,tx,q),lerp(sy,ty,q));c.setLineDash([]);c.fillStyle='#1a1a1a';c.beginPath();c.moveTo(lerp(sx,tx,q)-20,lerp(sy,ty,q));c.lineTo(lerp(sx,tx,q)+20,lerp(sy,ty,q)-6);c.lineTo(lerp(sx,tx,q)+20,lerp(sy,ty,q)+6);c.fill();}
    if(exist>0.6){const k=back(inv(WT(15,10),WT(15,10)+0.3,t));c.save();c.translate(560,1000);c.scale(k,k);bigQ(c,0,0,0.5,t);c.restore();}});
  fig2(c,{x:160,y:1900,s:2.2,f:1,t,kind:'german',eyes:t>WT(15,10)?'shock':'sly',brow:t>WT(15,10)?'up':'angry',mouth:t>WT(15,10)?'o':'smirk',hf:[110,-170],propF:pMag()});
  screenLights(c,[{x:W/2,y:600,on:1,r:900,hr:1400}],0.35);specks(c,t,15);
};
SH.i=function(c,t){ // suddenly MI5 wanted him · Codename: GARBO
  room(c,t,{dark:0.5,ty:1460,win:[80,330],view:(cc,wx,wy)=>{cc.fillStyle='#0a0e18';cc.fillRect(wx,wy+250,300,150);}});deskLamp(c,860,1460,1.0);L2={dx:-1,rim:'#ffb35a'};
  if(t<A(18)){band(c,A(16),t,'MI5 · LONDON',1780,{size:44});
    fig2(c,{x:360,y:1900,s:2.4,f:1,t,kind:'intelnh',eyes:t>A(17)?'wide':'open',brow:'up',mouth:t>A(17)?'o':'flat',hf:[100,-120],propF:pDoc(),seed:1});
    fig2(c,{x:820,y:1900,s:2.4,f:-1,t,kind:'intel2',eyes:t>WT(17,1)?'sly':'open',brow:'sly',mouth:t>WT(17,1)?'smirk':'flat',seed:2});}
  else{const k=lerp(1.25,1,eo(inv(A(18),A(18)+0.4,t)));c.save();c.translate(540,1000);c.scale(k,k);c.rotate(-0.03);c.fillStyle='rgba(0,0,0,0.4)';c.fillRect(-350,-430,720,880);c.fillStyle='#d8b878';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(-370,-450,720,880);c.strokeRect(-370,-450,720,880);c.fillStyle='#c8a868';c.fillRect(-370,-500,260,60);c.strokeRect(-370,-500,260,60);
    txt(c,'MI5 · MOST SECRET',-10,-370,34,'#5a1a10',{stroke:false,ls:6});c.fillStyle='#5a5a5a';c.fillRect(-300,-300,240,300);c.strokeRect(-300,-300,240,300);c.fillStyle='#1a1a1a';c.beginPath();c.arc(-180,-180,60,0,TAU);c.fill();c.fillRect(-250,-120,140,120);c.fillRect(-230,-260,100,30);c.fillRect(-250,-240,140,16);
    txt(c,'CODENAME',150,-240,34,'#3a2414',{stroke:false,ls:6});lines(c,-300,100,600,5,44);c.restore();
    stamp(c,A(19),t,'GARBO',600,880,{size:120,rot:-0.1});}
  screenLights(c,[{x:860,y:1300,on:1,r:700,hr:1100}],0.45);specks(c,t,20);
};
SH.j=function(c,t){ // network of 27 fake agents
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a2a20');g.addColorStop(1,'#140c08');c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='rgba(255,220,170,0.04)';for(let i=0;i<20;i++)c.fillRect(0,i*100,W,2);
  const z=lerp(1.25,1.0,eio(inv(A(20),B(21),t)));push(c,z,540,960,()=>{
    const pos=[];for(let i=0;i<27;i++){const r=Math.floor(i/5),k=i%5;pos.push([140+k*200+(r%2)*40,440+r*205+(hash(i)-.5)*40]);}
    const n=Math.floor(clamp(inv(WT(20,7),B(20),t))*27);
    c.strokeStyle='#b01818';c.lineWidth=3;for(let i=1;i<n;i++){const a=pos[i],b2=pos[Math.floor(hash(i*7)*i)];seg(c,a[0],a[1]-70,b2[0],b2[1]-70);}
    for(let i=0;i<27;i++)agentCard(c,pos[i][0],pos[i][1],i,i<n?1:inv(i/27*(B(20)-WT(20,7))+WT(20,7),i/27*(B(20)-WT(20,7))+WT(20,7)+0.25,t),t);});
  if(t>WT(20,7))counter(c,WT(20,7),t,String(Math.min(27,Math.floor(clamp(inv(WT(20,7),B(20),t))*27)+1)),'FAKE AGENTS',540,1720,{end:B(21)+0.2});
  if(t>A(21)){L2={dx:-1,rim:'#ffb35a'};}
};
SH.k=function(c,t){ // 315 letters, 500+ radio messages
  room(c,t,{dark:0.6,ty:1400});L2={dx:-1,rim:'#ffb35a'};
  const n1=Math.floor(inv(WT(22,3),WT(22,5),t)*315),n2=Math.floor(inv(WT(22,7),B(22),t)*500);
  for(let i=0;i<Math.min(60,Math.floor(n1/5));i++)letterEnv(c,140+hash(i)*360,1500-i*9+hash(i*3)*20,1.1,(hash(i*5)-.5)*0.6);
  radioSet(c,800,1300,0.9,t,n2>0);if(n2>0)waves(c,800,1000,t,1);
  GB({c,x:560,y:1900,s:2.2,f:1,t,eyes:'sly',brow:'sly',mouth:'smirk',hf:[110,-40]});
  fig2(c,{x:160,y:1900,s:2.2,f:1,t,kind:'intelnh',eyes:'open',brow:'flat',mouth:'smile',hf:[110,-60],propF:pDoc(),seed:5});
  if(n1>0)counter(c,WT(22,3),t,String(n1),'LETTERS',540,460,{end:B(22)+0.2});
  if(n2>0)counter(c,WT(22,7),t,String(n2)+(n2>=500?'+':''),'RADIO MESSAGES',540,700,{end:B(22)+0.2});
  screenLights(c,[{x:540,y:500,on:1,r:800,hr:1200}],0.45);specks(c,t,20);
};
SH.l=function(c,t){ // June 1944 · the warning sent too late
  room(c,t,{dark:0.62,ty:1420});L2={dx:-1,rim:'#9ab8e0'};
  band(c,A(23),t,'JUNE 1944',1780,{size:56,ls:18,end:B(24)});
  const hrs=lerp(3,8,inv(A(26),B(26),t));clock(c,820,620,150,hrs,t);txt(c,hrs<4?'3:00 AM':(hrs>7.9?'8:00 AM':''),820,830,40,'#fff',{sw:8});
  radioSet(c,330,1300,0.9,t,true);
  if(t>A(25)){waves(c,330,1000,t,1,'255,220,140');const q=inv(A(25),B(25),t);c.save();c.globalAlpha=clamp(q*3);c.strokeStyle='rgba(255,220,140,0.8)';c.lineWidth=6;c.setLineDash([20,14]);c.lineDashOffset=-t*120;seg(c,420,980,980,1180);c.setLineDash([]);c.restore();txt(c,'→ MADRID',830,1230,34,'#ffd66a',{sw:6,ls:4});}
  if(t>A(24)&&t<A(26)){const k=back(inv(A(25),A(25)+0.3,t));if(k>0){c.save();c.translate(560,500);c.scale(k,k);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(-250,-90,500,180);c.strokeRect(-250,-90,500,180);txt(c,'INVASION',0,-25,56,'#a81c1c',{stroke:false,ls:6});txt(c,'IS COMING',0,40,44,'#2a1a10',{stroke:false,ls:6});c.restore();}}
  if(t>WT(26,5))stamp(c,WT(26,5),t,'TOO LATE',540,1000,{size:100,rot:-0.12,end:A(27)});
  if(t<A(27))GB({c,x:200,y:1900,s:2.2,f:1,t,eyes:t>A(26)?'sly':'open',brow:t>A(26)?'sly':'worried',mouth:t>A(26)?'smirk':'flat',hf:[120,-70]});
  else{const k=lerp(1.25,1,eo(inv(A(27),A(27)+0.4,t)));push(c,k,540,1500,()=>{room(c,t,{dark:0.6,ty:1500});fig2(c,{x:540,y:1950,s:2.6,f:1,t,kind:'german',eyes:t>A(28)?'happy':'open',brow:'up',mouth:t>A(28)?'teeth':'flat',hf:t>A(28)?[60,-170]:[60,-60],propF:pDoc()});});
    if(t>A(28))stamp(c,A(28),t,'TRUSTED',540,720,{size:100,col:'#1a6a2a',rot:0.1});}
  screenLights(c,[{x:540,y:500,on:1,r:800,hr:1200}],0.45);specks(c,t,20);
};
SH.m=function(c,t){ // Normandy is a trick · real attack at Calais
  room(c,t,{dark:0.6,table:false});L2={dx:1,rim:'#9ab8e0'};const P=channelMap(c,t);
  arrow(c,P.EN.x-100,P.EN.y,P.NO.x,P.NO.y,inv(A(29),A(29)+0.6,t),'#2a5aa8',16);
  if(t>WT(29,6))stamp(c,WT(29,6),t,'FAKE',P.NO.x+40,P.NO.y-200,{size:80,rot:-0.12});
  arrow(c,P.EN.x+300,P.EN.y,P.CA.x,P.CA.y-20,inv(A(30),A(30)+0.8,t),'#b81c1c',30,40);
  if(t>WT(30,6)){const q=t-WT(30,6);for(let k=0;k<3;k++){const r=((q*0.8+k/3)%1);ring(c,P.CA.x,P.CA.y,60+r*260,(1-r)*0.7,'rgba(200,30,30,',8);}}
  screenLights(c,[{x:W/2,y:600,on:1,r:900,hr:1400}],0.35);specks(c,t,15);
};
SH.n=function(c,t){
  if(t<A(33)){ // Hitler, from behind, believes it
    const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#060404');c.fillStyle=g;c.fillRect(0,0,W,H);
    c.fillStyle='#2a1e16';for(let i=0;i<5;i++)c.fillRect(80+i*200,200,140,1100);c.fillStyle='rgba(0,0,0,0.6)';c.fillRect(0,1300,W,620);
    const z=lerp(1.0,1.15,inv(A(31),A(33),t));push(c,z,540,1300,()=>{c.fillStyle='#3a2416';c.fillRect(200,1250,680,60);c.fillRect(230,1310,30,300);c.fillRect(820,1310,30,300);
      c.fillStyle='#08080a';c.beginPath();c.arc(540,1000,70,0,TAU);c.fill();c.beginPath();c.moveTo(420,1070);c.quadraticCurveTo(540,1030,660,1070);c.lineTo(700,1260);c.lineTo(380,1260);c.closePath();c.fill();
      c.strokeStyle='rgba(255,200,140,0.6)';c.lineWidth=4;c.beginPath();c.arc(540,1000,68,-1.2,0.2);c.stroke();
      c.save();c.translate(560,1240);c.fillStyle='#efe6cc';c.fillRect(-60,-40,120,80);c.restore();});
    if(t>A(32))stamp(c,A(32),t,'BELIEVED',540,600,{size:100,rot:-0.1});
    screenLights(c,[{x:540,y:900,on:1,r:600,hr:900}],0.45);
  }else{ // divisions frozen at Calais while Allies pour into Normandy
    room(c,t,{dark:0.6,table:false});const P=channelMap(c,t);L2={dx:1,rim:'#9ab8e0'};
    for(let i=0;i<12;i++){const x=P.CA.x-120+(i%4)*60,y=P.CA.y+60+Math.floor(i/4)*50;tankIcon(c,x,y,0.8,'#5a5f55');}
    if(t>WT(33,3)){c.save();c.globalAlpha=0.5+0.5*Math.sin(t*6);txt(c,'WAITING…',P.CA.x-30,P.CA.y+260,36,'#fff',{sw:6,ls:4});c.restore();}
    const days=Math.floor(inv(WT(33,6),WT(33,9),t)*40);if(days>0)counter(c,WT(33,6),t,'DAY '+days,'AT CALAIS',540,1560,{});
    for(let i=0;i<8;i++){const t0=WT(33,10)+i*0.15;arrow(c,P.EN.x-120+i*20,P.EN.y+20,P.NO.x-60+i*25,P.NO.y+40+i*10,inv(t0,t0+0.8,t),'#2a5aa8',10,30);}
  }
  specks(c,t,15);
};
SH.o=function(c,t){ // Iron Cross + MBE: same man, both sides
  room(c,t,{dark:0.6,table:false});
  if(t<A(36)){L2={dx:-1,rim:'#ffb35a'};
    GB({c,x:540,y:1900,s:2.6,f:1,t,eyes:'open',brow:'flat',mouth:t>A(35)?'smile':'flat'});
    const iq=back(inv(WT(34,5),WT(34,5)+0.4,t)),mq=back(inv(WT(35,4),WT(35,4)+0.4,t));
    if(iq>0)medal(c,340,lerp(400,900,eo(inv(WT(34,5),WT(34,5)+0.4,t))),1.6*iq,'iron',t);
    if(mq>0)medal(c,740,lerp(400,900,eo(inv(WT(35,4),WT(35,4)+0.4,t))),1.6*mq,'mbe',t);
    band(c,A(34),t,'GERMANY: IRON CROSS',380,{size:40,end:A(35)});band(c,A(35),t,'BRITAIN: MBE',380,{size:40});
  }else{ // split screen
    c.save();c.beginPath();c.rect(0,0,W/2,H);c.clip();c.fillStyle='#3a1414';c.fillRect(0,0,W/2,H);L2={dx:1,rim:'#ff8a6a'};GB({c,x:290,y:1900,s:2.3,f:1,t,eyes:'sly',brow:'sly',mouth:'smirk'});medal(c,270,900,1.1,'iron',t);txt(c,'GERMANY',270,420,52,'#fff',{sw:8,ls:6});c.restore();
    c.save();c.beginPath();c.rect(W/2,0,W/2,H);c.clip();c.fillStyle='#142a4a';c.fillRect(W/2,0,W/2,H);L2={dx:-1,rim:'#9ab8e0'};GB({c,x:790,y:1900,s:2.3,f:-1,t,eyes:'sly',brow:'sly',mouth:'smirk'});medal(c,810,900,1.1,'mbe',t);txt(c,'BRITAIN',810,420,52,'#fff',{sw:8,ls:6});c.restore();
    c.fillStyle='#fff';c.fillRect(W/2-5,0,10,H);
    if(t>A(37))stamp(c,A(37),t,'SAME MAN',540,640,{size:90,rot:-0.06});
  }
  screenLights(c,[{x:540,y:500,on:1,r:900,hr:1300}],0.4);specks(c,t,20);
};
SH.p=function(c,t){ // he vanished · "died of malaria in Africa"
  if(t<A(40)){const cam=scam(0,1.3,1720);L2={dx:-1,rim:'#9ab8e0'};
    const q=inv(A(39),B(39)+0.4,t);
    const lights=street(c,t,cam,{seed:4,sky:{moon:true},lamps:[{x:-250,on:1}],world:c2=>{c2.save();c2.globalAlpha=1-q;GB({c:c2,x:lerp(0,260,q),y:GY+30,s:1.8,f:1,t,walk:1,ph:t*6,eyes:'open',brow:'flat',mouth:'flat',castLen:1.1});c2.restore();}});
    fog(c,t,0.8,{n:12,y0:1100,y1:1900,seed:5});finishStreet(c,t,cam,lights,{dark:0.62});
    if(t>B(39))band(c,B(39),t,'1944: HE DISAPPEARS',1780,{size:40,ls:6});
  }else{const tg=c.createLinearGradient(0,0,W,H);tg.addColorStop(0,'#5a3820');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.fillRect(0,0,W,H);
    const k=back(inv(A(40),A(40)+0.4,t));c.save();c.translate(540,1000);c.scale(k*1.7,k*1.7);c.rotate(-0.06+(1-k)*2);
    c.fillStyle='#ebe4cf';c.fillRect(-170,-220,340,440);c.strokeStyle='#222';c.lineWidth=3;c.strokeRect(-170,-220,340,440);c.fillStyle='#111';c.font='900 26px "Lora"';c.textAlign='center';c.fillText('THE DAILY NEWS · 1949',0,-180);c.fillRect(-150,-166,300,4);
    c.fillStyle='#9a0e0e';c.font='900 40px "Inter Display"';c.fillText('FORMER SPY',0,-118);c.fillText('DIES OF',0,-74);c.fillText('MALARIA',0,-30);c.fillStyle='#111';c.font='800 22px "Inter Display"';c.fillText('— ANGOLA, AFRICA —',0,4);
    c.fillStyle='#444';c.fillRect(-150,24,140,120);c.fillStyle='#111';c.beginPath();c.arc(-80,70,24,0,TAU);c.fill();c.fillRect(-104,94,48,50);c.fillStyle='rgba(0,0,0,0.45)';for(let i=0;i<8;i++)c.fillRect(10,24+i*15,140,6);for(let i=0;i<4;i++)c.fillRect(-150,160+i*14,300,6);c.restore();}
  specks(c,t,20);
};
SH.q=function(c,t){ // alive in Venezuela until 1988
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a6aa0');g.addColorStop(0.5,'#f0b878');g.addColorStop(1,'#f0b878');c.fillStyle=g;c.fillRect(0,0,W,H);
  const sg=c.createRadialGradient(780,900,0,780,900,600);sg.addColorStop(0,'rgba(255,240,200,0.8)');sg.addColorStop(1,'rgba(255,200,140,0)');c.fillStyle=sg;c.fillRect(0,0,W,H);c.fillStyle='#fff4d8';c.beginPath();c.arc(780,900,80,0,TAU);c.fill();
  c.fillStyle='#6a4a5a';c.beginPath();c.moveTo(0,1100);for(let x=0;x<=W;x+=60)c.lineTo(x,1000+Math.sin(x*0.008)*80+hash(x)*30);c.lineTo(W,1300);c.lineTo(0,1300);c.fill();
  for(let i=0;i<6;i++){const cols=['#e8c06a','#d86a5a','#6aa8b8','#e8e0c8','#b88ad0','#e89a5a'];c.fillStyle=cols[i];c.strokeStyle=K2;c.lineWidth=5;const x=i*190-20,h=300+hash(i)*120;c.fillRect(x,1500-h,180,h);c.strokeRect(x,1500-h,180,h);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(x+30,1500-h+60,40,60);c.fillRect(x+110,1500-h+60,40,60);c.fillStyle='#8a3a2a';c.fillRect(x-10,1500-h-20,200,24);}
  palm(c,120,1500,1.0,t);palm(c,960,1520,1.1,t);
  c.fillStyle='#c8a878';c.fillRect(0,1500,W,420);c.fillStyle='rgba(0,0,0,0.12)';for(let i=0;i<8;i++)c.fillRect(0,1540+i*48,W,3);
  L2={dx:1,rim:'#ffd0a0'};const q=inv(A(41),B(43),t);
  fig2(c,{x:lerp(200,620,q),y:1860,s:2.2,f:1,t,kind:'garboOld',stache:true,walk:1,ph:t*5,eyes:t>A(42)?'happy':'open',brow:'flat',mouth:'smile',castLen:0.9});
  band(c,A(42),t,'CARACAS, VENEZUELA',380,{size:44,end:A(43)});
  if(t>A(43))card(c,A(43),t,'JUAN PUJOL GARCÍA','1912 – 1988',420,{w:860,size:54,tag:'AGENT GARBO',end:END});
  if(t>A(44)){c.fillStyle=`rgba(0,0,0,${0.5*inv(A(44),END,t)})`;c.fillRect(0,0,W,H);}
  specks(c,t,20,'255,230,200');
};
