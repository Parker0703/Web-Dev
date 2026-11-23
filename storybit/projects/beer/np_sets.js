'use strict';
// ===== Napoleonic sets + game UI =====
const BLUE_C='#4a8aff';
// rolling battlefield: o.sky = 'sun' (Austerlitz) | 'snow' | 'rain' | 'dawn' | 'dusk' ; o.troops: distant army lines
function field(c,t,v={},o={}){const GY=o.GY||1300,sky=o.sky||'sun';c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const SK={sun:['#5a7ab8','#f8d8a0','#fff0c8'],snow:['#8a96a8','#c8d0dc','#e8ecf2'],rain:['#2a303c','#4a5260','#6a7280'],dawn:['#3a4a7a','#f0a070','#ffd8a0'],dusk:['#2a2050','#c86a5a','#ffb080']}[sky];
  const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,SK[0]);g.addColorStop(0.6,SK[1]);g.addColorStop(1,SK[2]);c.fillStyle=g;c.fillRect(-2000,-600,5000,GY+600);
  if(sky==='sun'||sky==='dawn'||sky==='dusk'){const sx=o.sunX??760,sy=GY-(sky==='sun'?420:160);c.fillStyle='#fff6d8';c.beginPath();c.arc(sx,sy,90,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const sg=c.createRadialGradient(sx,sy,0,sx,sy,800);sg.addColorStop(0,'rgba(255,220,150,0.65)');sg.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=sg;c.fillRect(-800,-600,2600,2200);c.restore();
    if(sky==='sun')lightRays(c,sx,sy,'255,230,170',0.22,9,2200,0.7);}
  // clouds
  for(let i=0;i<7;i++){const x=((hash(i)*2600+t*(8+i*2))%2600)-800,y=-200+hash(i*3)*500;c.fillStyle=sky==='rain'?'rgba(30,34,44,0.85)':sky==='snow'?'rgba(230,234,240,0.85)':'rgba(255,250,240,0.75)';for(let k=0;k<5;k++){c.beginPath();c.arc(x+k*70,y+Math.sin(k)*20,70+hash(i+k)*40,0,TAU);c.fill();}}
  // far hills + troop lines
  const hill=(y0,amp,col,ph)=>{c.fillStyle=col;c.beginPath();c.moveTo(-2000,GY);for(let x=-2000;x<=3000;x+=50)c.lineTo(x,y0-Math.sin(x*0.0025+ph)*amp-Math.sin(x*0.007+ph*2)*amp*0.3);c.lineTo(3000,2600);c.lineTo(-2000,2600);c.fill();};
  const HC={sun:['#7a8a6a','#6a8a4a','#5a7a3a'],snow:['#c8ccd4','#dcdfe6','#eef0f4'],rain:['#3a4236','#4a4a32','#5a4a30'],dawn:['#5a5a6a','#6a6a4a','#6a5a3a'],dusk:['#4a3a50','#5a4a40','#5a4030']}[sky];
  hill(GY-200,90,HC[0],0.3);if(o.troops!==0){for(let r=0;r<2;r++){const yy=GY-150+r*40;for(let x=-1200;x<2400;x+=14){c.fillStyle=o.troopCol||(r?'#2a3a7a':'#3a3a4a');c.fillRect(x+Math.sin(x)*3,yy-12-hash(x)*4,6,14);}}
    for(let i=0;i<5;i++){const x=-300+i*420;c.strokeStyle='#3a2a1a';c.lineWidth=3;c.beginPath();c.moveTo(x,GY-160);c.lineTo(x,GY-215);c.stroke();c.fillStyle=['#2a4ab8','#fff','#d02a2a'][i%3];c.fillRect(x,GY-215,26,16);}}
  if(o.farm){c.fillStyle='#8a7a6a';c.fillRect(780,GY-250,220,110);c.fillStyle='#5a3a2a';c.beginPath();c.moveTo(760,GY-250);c.lineTo(890,GY-320);c.lineTo(1020,GY-250);c.fill();c.fillStyle='#2a1a1a';for(let i=0;i<3;i++)c.fillRect(800+i*65,GY-220,30,40);}
  hill(GY-60,60,HC[1],1.7);hill(GY+40,40,HC[2],2.9);
  // ground detail: grass tufts / snow drifts / mud puddles
  if(sky==='rain'||o.mud){for(let i=0;i<26;i++){const x=hash(i*7)*2200-600,y=GY+80+hash(i*3)*900;c.fillStyle='rgba(30,26,20,0.55)';c.beginPath();c.ellipse(x,y,60+hash(i)*120,12+hash(i*5)*14,0,0,TAU);c.fill();c.fillStyle='rgba(160,170,190,0.35)';c.beginPath();c.ellipse(x-10,y-3,40+hash(i)*70,6,0,0,TAU);c.fill();}}
  else if(sky==='snow'){for(let i=0;i<30;i++){c.fillStyle='rgba(255,255,255,0.9)';c.beginPath();c.ellipse(hash(i*7)*2200-600,GY+80+hash(i*3)*900,80+hash(i)*120,14,0,0,TAU);c.fill();}}
  else{c.strokeStyle='rgba(40,60,20,0.5)';c.lineWidth=3;for(let i=0;i<80;i++){const x=hash(i*7)*2200-600,y=GY+60+hash(i*3)*1000;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(x,y);c.lineTo(x+k*8,y-16-hash(i)*10);c.stroke();}}}
  // battle smoke on the horizon
  if(o.smoke!==0)for(let i=0;i<6;i++){c.fillStyle=`rgba(${sky==='rain'?'120,120,130':'235,230,220'},0.55)`;const x=-200+i*300+Math.sin(t*0.3+i)*20,y=GY-170;for(let k=0;k<4;k++){c.beginPath();c.arc(x+k*40,y-k*20,50+k*12,0,TAU);c.fill();}}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();
  // weather overlays
  if(sky==='rain'){c.save();c.strokeStyle='rgba(200,210,230,0.45)';c.lineWidth=2.5;for(let i=0;i<160;i++){const x=(hash(i)*W+t*120)%W,y=(hash(i*3)*H+t*1400)%H;c.beginPath();c.moveTo(x,y);c.lineTo(x-12,y+46);c.stroke();}c.restore();}
  if(sky==='snow'||o.snowfall){c.save();c.fillStyle='rgba(255,255,255,0.9)';for(let i=0;i<160;i++){const sp=0.5+hash(i*5);const x=(hash(i)*W+Math.sin(t*1.5+i)*30+t*90*sp)%W,y=(hash(i*3)*H+t*260*sp)%H;c.beginPath();c.arc(x,y,2+hash(i*7)*4,0,TAU);c.fill();}c.restore();}}
// Moscow burning: onion domes + fire
function moscow(c,t,v={},o={}){burning(c,t,v,{world:(c2,GY)=>{
  c2.fillStyle='#14080a';for(const [x,h,r] of [[180,520,70],[420,680,90],[640,560,80],[880,620,70]]){c2.fillRect(x-r*0.7,GY-h,r*1.4,h);c2.beginPath();c2.moveTo(x-r,GY-h);c2.quadraticCurveTo(x-r*1.1,GY-h-r*1.3,x,GY-h-r*1.9);c2.quadraticCurveTo(x+r*1.1,GY-h-r*1.3,x+r,GY-h);c2.fill();c2.fillRect(x-3,GY-h-r*2.4,6,r*0.6);c2.fillRect(x-14,GY-h-r*2.25,28,5);}
  for(let i=0;i<10;i++)fireTongue(c2,60+i*110,GY-200-hash(i)*400,260,110,t,i+20);if(o.world)o.world(c2,GY);}});}
// Elba: small rocky island in the sea
function elba(c,t,v={},o={}){river(c,t,v,{pyr:0,sunX:300,GY:1100,world:(c2,GY)=>{c2.fillStyle='#6a5a48';c2.beginPath();c2.moveTo(150,GY+260);c2.quadraticCurveTo(300,GY+80,540,GY+60);c2.quadraticCurveTo(800,GY+60,940,GY+260);c2.closePath();c2.fill();c2.strokeStyle=K2;c2.lineWidth=6;c2.stroke();
  c2.fillStyle='#4a7a3a';for(const x of [380,690]){c2.fillRect(x-5,GY-60,10,140);c2.beginPath();c2.arc(x,GY-80,60,0,TAU);c2.fill();}if(o.world)o.world(c2,GY);}});}
// French Empire salon: green & gold walls, bees, N monogram, chandelier
function salon(c,t,v={},o={}){const GY=o.GY||1500;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,'#1a3a2a');g.addColorStop(1,o.night?'#1a2a22':'#2e5a40');c.fillStyle=g;c.fillRect(-1600,-600,4300,GY+600);
  for(let i=-5;i<10;i++){const x=i*260;c.strokeStyle='#d8b040';c.lineWidth=5;c.strokeRect(x+30,120,200,GY-500);c.fillStyle='rgba(216,176,64,0.5)';for(let k=0;k<4;k++){c.save();c.translate(x+130,260+k*220);c.beginPath();c.ellipse(0,0,10,14,0,0,TAU);c.fill();c.beginPath();c.ellipse(-12,-8,8,5,0.5,0,TAU);c.ellipse(12,-8,8,5,-0.5,0,TAU);c.fill();c.restore();}}
  // big N in laurel
  c.save();c.translate(540,380);c.strokeStyle='#d8b040';c.lineWidth=8;c.beginPath();c.arc(0,0,110,Math.PI*0.65,Math.PI*2.35);c.stroke();c.fillStyle='#e8c050';c.font='900 150px "Inter Display",serif';c.textAlign='center';c.textBaseline='middle';c.fillText('N',0,8);c.restore();
  // chandelier
  if(!o.noChand){c.strokeStyle='#d8b040';c.lineWidth=4;c.beginPath();c.moveTo(540,-300);c.lineTo(540,40);c.stroke();for(let k=-3;k<=3;k++){c.fillStyle='#ffe6a0';c.beginPath();c.arc(540+k*60,60-Math.abs(k)*8,8,0,TAU);c.fill();}c.save();c.globalCompositeOperation='lighter';const cg=c.createRadialGradient(540,60,0,540,60,700);cg.addColorStop(0,'rgba(255,220,150,0.35)');cg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=cg;c.fillRect(-200,-600,1500,1500);c.restore();}
  // windows with curtains
  for(const x of [-60,1140]){c.fillStyle=o.night?'#0a1430':'#bfe0ff';c.fillRect(x-110,140,220,560);c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(x-110,140,220,560);c.fillStyle='#8a1a2a';c.fillRect(x-150,100,60,640);c.fillRect(x+90,100,60,640);}
  const fg=c.createLinearGradient(0,GY-100,0,2400);fg.addColorStop(0,'#5a3a1a');fg.addColorStop(1,'#a8784a');c.fillStyle=fg;c.fillRect(-1600,GY-100,4300,1400);
  c.strokeStyle='rgba(20,10,4,0.35)';c.lineWidth=3;for(let i=-10;i<=10;i++){c.beginPath();c.moveTo(540+i*60,GY-100);c.lineTo(540+i*260,2400);c.stroke();}
  c.fillStyle='rgba(120,20,30,0.6)';c.beginPath();c.ellipse(540,GY+260,480,110,0,0,TAU);c.fill();c.strokeStyle='rgba(216,176,64,0.6)';c.lineWidth=6;c.stroke();
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// Europe map (stylised) — France blue, enemies red as they join
// stylised but real-shaped Europe (lon/lat projected)
const PJ=(lo,la)=>[(lo+11)*20+40,(64-la)*30+430];
const LAND={
 main:[[-1.8,43.4],[-1.2,46],[-2.2,47.2],[-4.6,48.3],[-1.6,48.7],[-1.5,49.6],[0.2,49.5],[1.6,50.9],[2.5,51.1],[4,51.4],[4.8,52.9],[6.9,53.4],[8.5,53.6],[8.6,55],[8.1,57],[10.5,57.7],[10.5,56.5],[11,55.6],[10,54.6],[11,54],[14.2,53.9],[18.5,54.6],[21.2,55.3],[21.1,56.7],[24.1,57.3],[23.5,59.2],[28,59.6],[30.3,60],[33,61],[42,62],[42,46],[38,47],[35,45.3],[33.5,44.5],[32,46.5],[30,46],[28.8,44],[28,41.3],[26,40.8],[24,40.7],[22.9,40.6],[23.7,38],[22.2,36.5],[21.1,37.9],[20,39.5],[19.4,41.8],[15.7,44.3],[13.6,45.6],[12.3,45.3],[12.4,44],[14,42.5],[16.1,41.5],[18.5,40.2],[16.6,38.4],[15.6,38],[16,39],[15.7,40],[14.2,40.8],[12.5,41.8],[11,42.6],[10.2,43.9],[8.6,44.4],[7.5,43.8],[5,43.4],[3.2,42.4],[3.3,41.9],[0.8,41],[-0.3,39.5],[0.2,38.7],[-2,36.8],[-5.6,36],[-6.4,36.8],[-7.4,37.2],[-8.9,37],[-8.8,38.7],[-9.5,39.4],[-8.7,42],[-9,43.5]],
 gb:[[-5.7,50],[-3,50.6],[1.4,51.2],[1.7,52.7],[0,53.6],[-1.5,55],[-2,56],[-1.8,57.6],[-3.2,58.6],[-5,58.6],[-5.6,57],[-5,55.5],[-3,54.9],[-3.3,54],[-4.6,53.3],[-4.4,52.2],[-5.2,51.7],[-4,51.5]],
 ie:[[-6,52],[-6.2,53.9],[-5.5,54.5],[-7,55.3],[-8.4,55],[-10,54],[-10,52],[-9.8,51.5],[-8,51.6]],
 sc:[[5,59],[6,58],[7.5,58],[10.6,59],[11.2,58.9],[12,57.6],[12.7,56.2],[14.2,55.4],[16,56.2],[16.6,57.9],[18.5,59.5],[17.5,61],[18,64],[5,64]],
 si:[[12.4,38.1],[15.6,38.3],[15.1,36.7],[13,37.5]],sa:[[8.4,41],[9.8,41],[9.6,39],[8.4,39]],co:[[8.6,43],[9.5,42.9],[9.4,41.4],[8.7,41.6]]};
const FRANCE=[[-1.8,43.4],[-1.2,46],[-2.2,47.2],[-4.6,48.3],[-1.6,48.7],[-1.5,49.6],[0.2,49.5],[1.6,50.9],[2.5,51.1],[4.2,49.9],[6.4,49.5],[8.2,49],[7.6,47.6],[6.9,46.4],[7,45],[7.5,43.8],[5,43.4],[3.2,42.4],[1.5,42.6]];
// regions (lon/lat boxes clipped to land) for colouring states
const REG={ES:[-11,35,3.2,43.8],PR:[9,51,24,56.5],AT:[9.6,44.5,26,51],RU:[23,44,44,62],IT:[6.6,36,19,46.4],GB:[-11,49.5,2,59.5]};
const EUN={ES:'SPAIN',PR:'PRUSSIA',AT:'AUSTRIA',RU:'RUSSIA',IT:'ITALY',GB:'BRITAIN',FR:'FRANCE'};
const EUC={FR:PJ(2.5,46.8),ES:PJ(-4,40),PR:PJ(16,53),AT:PJ(16,47.8),RU:PJ(33,54),IT:PJ(12.5,42.6),GB:PJ(-1.8,53)};
const EU={FR:FRANCE.map(p=>PJ(...p))};
function polyPath(c,P){c.beginPath();P.forEach((p,i)=>{const [x,y]=PJ(...p);i?c.lineTo(x,y):c.moveTo(x,y);});c.closePath();}
function europe(c,t,o={}){c.fillStyle='#14202e';c.fillRect(0,0,W,H);c.save();c.translate(540,1000+(o.dy??240));c.scale(o.z||1,o.z||1);c.translate(-540,-1000);
  const sg=c.createRadialGradient(540,900,0,540,900,1000);sg.addColorStop(0,'#2c4a6a');sg.addColorStop(1,'#14243a');c.fillStyle=sg;c.fillRect(-300,300,1700,1400);
  // sea grid
  c.strokeStyle='rgba(255,255,255,0.05)';c.lineWidth=2;for(let x=0;x<1100;x+=80){c.beginPath();c.moveTo(x,300);c.lineTo(x,1500);c.stroke();}for(let y=320;y<1500;y+=80){c.beginPath();c.moveTo(-100,y);c.lineTo(1200,y);c.stroke();}
  // land shadow + land
  c.save();c.translate(8,12);c.fillStyle='rgba(0,0,0,0.35)';for(const P of Object.values(LAND)){polyPath(c,P);c.fill();}c.restore();
  for(const P of Object.values(LAND)){polyPath(c,P);c.fillStyle='#d2bf98';c.fill();}
  // state colours clipped to land
  c.save();c.beginPath();for(const P of Object.values(LAND))P.forEach((p,i)=>{const [x,y]=PJ(...p);i?c.lineTo(x,y):c.moveTo(x,y);});c.clip();
  for(const [k,b] of Object.entries(REG)){const col=(o.col||{})[k];if(!col)continue;const [x0,y1]=PJ(b[0],b[1]),[x1,y0]=PJ(b[2],b[3]);c.fillStyle=col;c.fillRect(x0,y0,x1-x0,y1-y0);}
  c.strokeStyle='rgba(80,60,30,0.55)';c.lineWidth=3;c.setLineDash([10,8]);for(const b of Object.values(REG)){const [x0,y1]=PJ(b[0],b[1]),[x1,y0]=PJ(b[2],b[3]);c.strokeRect(x0,y0,x1-x0,y1-y0);}c.setLineDash([]);c.restore();
  polyPath(c,FRANCE);c.fillStyle=(o.col||{}).FR||'#d2bf98';c.fill();c.strokeStyle='#1a2a5a';c.lineWidth=5;c.stroke();
  c.strokeStyle='#4a3a20';c.lineWidth=4;for(const P of Object.values(LAND)){polyPath(c,P);c.stroke();}
  // rivers + Paris
  c.strokeStyle='rgba(60,120,200,0.6)';c.lineWidth=3;[[[7,47.5],[8.5,50],[6.5,51.8]],[[9,48.3],[16,48.2],[20,46],[28,45]]].forEach(R=>{c.beginPath();R.forEach((p,i)=>{const [x,y]=PJ(...p);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();});
  const [px,py]=PJ(2.35,48.85);c.fillStyle='#ffd860';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.arc(px,py,10,0,TAU);c.fill();c.stroke();
  if(o.labels){c.font='900 24px "Inter Display"';c.textAlign='center';c.textBaseline='middle';for(const [k,[x,y]] of Object.entries(EUC)){c.fillStyle='rgba(20,14,8,0.85)';c.fillText(EUN[k],x,y);}}
  if(o.draw)o.draw(c);c.restore();}
function arrow(c,x0,y0,x1,y1,col,k=1,w=16){if(k<=0)return;const x=lerp(x0,x1,k),y=lerp(y0,y1,k);c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo((x0+x)/2,(y0+y)/2-60,x,y);c.stroke();const a=Math.atan2(y-((y0+y)/2-60),x-(x0+x)/2);c.translate(x,y);c.rotate(a);c.beginPath();c.moveTo(w*1.6,0);c.lineTo(-w,-w*1.3);c.lineTo(-w,w*1.3);c.closePath();c.fill();c.restore();}
// ===== game UI =====
// respawn pillar of light + pixels reassembling
function respawnFx(c,t,t0,x,y,h=900){const a=t-t0;if(a<0||a>1.4)return;const k=a<0.25?a/0.25:1-clamp((a-0.8)/0.6);c.save();c.globalCompositeOperation='lighter';
  const g=c.createLinearGradient(x-120,0,x+120,0);g.addColorStop(0,'rgba(90,200,255,0)');g.addColorStop(0.5,`rgba(160,230,255,${0.7*k})`);g.addColorStop(1,'rgba(90,200,255,0)');c.fillStyle=g;c.fillRect(x-120,y-h,240,h);
  for(let i=0;i<40;i++){const p=((a*1.5+hash(i))%1);c.fillStyle=`rgba(180,240,255,${(1-p)*k})`;const s=6+hash(i*3)*10;c.fillRect(x+(hash(i*7)-0.5)*220,y-p*h,s,s);}
  c.strokeStyle=`rgba(180,240,255,${k})`;c.lineWidth=6;c.beginPath();c.ellipse(x,y,150*(0.6+a*0.4),34,0,0,TAU);c.stroke();c.restore();}
function gameOver(c,t,t0){const a=t-t0;c.fillStyle='rgba(0,0,0,0.85)';c.fillRect(0,0,W,H);const k=back(clamp(a/0.35));c.save();c.translate(540,940);c.scale(k,k);
  c.font='900 150px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.lineWidth=16;c.strokeStyle='#1a0204';c.strokeText('GAME',0,-90);c.strokeText('OVER',0,80);c.fillStyle='#ff3b30';c.shadowColor='#ff3b30';c.shadowBlur=30;c.fillText('GAME',0,-90);c.fillText('OVER',0,80);c.restore();
  if(a>0.6){const b=clamp((a-0.6)/0.6);c.fillStyle='rgba(255,255,255,0.15)';c.beginPath();c.roundRect(240,1220,600,26,13);c.fill();c.fillStyle=CYAN_C;c.beginPath();c.roundRect(240,1220,600*b,26,13);c.fill();c.font='800 34px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.letterSpacing='8px';c.fillText('RESPAWNING…',540,1300);c.letterSpacing='0px';}}
// checkpoint flag (save point)
function saveFlag(c,t,x,y,s=1,a=1){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.translate(x,y);c.scale(s,s);c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,-120,0,0,-120,260);g.addColorStop(0,'rgba(90,200,255,0.5)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(-260,-380,520,520);c.restore();
  c.strokeStyle=K2;c.lineWidth=6;c.fillStyle='#d8d8e0';c.fillRect(-6,-260,12,260);c.strokeRect(-6,-260,12,260);const w=Math.sin(t*4)*10;
  c.beginPath();c.moveTo(6,-256);c.quadraticCurveTo(80,-270+w,150,-240+w);c.lineTo(150,-160+w);c.quadraticCurveTo(80,-190+w,6,-170);c.closePath();const fg=c.createLinearGradient(6,0,150,0);fg.addColorStop(0,'#2a4ab8');fg.addColorStop(0.34,'#2a4ab8');fg.addColorStop(0.34,'#fff');fg.addColorStop(0.67,'#fff');fg.addColorStop(0.67,'#d02a2a');fg.addColorStop(1,'#d02a2a');c.fillStyle=fg;c.fill();c.stroke();
  c.fillStyle='#5fe3ff';c.beginPath();c.ellipse(0,0,70,18,0,0,TAU);c.fill();c.strokeStyle=K2;c.stroke();c.restore();}
// little card (date / title)
function card(c,t,t0,l1,l2,col=GOLD_C,y=1000,sz=110){const k=back(clamp((t-t0)/0.3));if(k<=0)return;c.save();c.translate(540,y);c.scale(k,k);c.fillStyle='rgba(10,8,14,0.82)';c.beginPath();c.roundRect(-420,-150,840,300,26);c.fill();c.strokeStyle=col;c.lineWidth=6;c.shadowColor=col;c.shadowBlur=24;c.stroke();c.shadowBlur=0;
  c.font='800 40px "Inter Display"';c.fillStyle='rgba(255,255,255,0.8)';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='10px';c.fillText(l1,0,-80);c.letterSpacing='0px';const g=c.createLinearGradient(0,-40,0,80);g.addColorStop(0,'#fff6d0');g.addColorStop(1,col);c.fillStyle=g;c.font=`900 ${sz}px "Inter Display"`;c.fillText(l2,0,30);c.restore();}
// pause menu
function pauseMenu(c,t,t0,hi,my=1000){const k=clamp((t-t0)/0.25);if(k<=0)return;c.fillStyle=`rgba(6,8,16,${0.6*k})`;c.fillRect(0,0,W,H);c.save();c.globalAlpha=k;c.translate(540,my);
  c.fillStyle='rgba(14,18,32,0.92)';c.beginPath();c.roundRect(-330,-300,660,600,30);c.fill();c.strokeStyle=CYAN_C;c.lineWidth=5;c.stroke();
  c.font='900 80px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='12px';c.fillText('❚❚ PAUSED',0,-200);c.letterSpacing='0px';
  ['RESUME WAR','NEW CAMPAIGN','QUIT GAME'].forEach((s,i)=>{const y=-60+i*130,on=i===hi;c.fillStyle=on?'rgba(95,227,255,0.22)':'rgba(255,255,255,0.06)';c.beginPath();c.roundRect(-260,y-46,520,92,18);c.fill();if(on){c.strokeStyle=CYAN_C;c.lineWidth=5;c.stroke();}
    c.font='800 46px "Inter Display"';c.fillStyle=on?'#fff':'rgba(255,255,255,0.55)';c.fillText((on?'▶ ':'')+s,0,y+2);});c.restore();}
