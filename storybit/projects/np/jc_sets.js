'use strict';
// ===== Roman sets (canvas) for Caesar — world space 1080×1920, camera via cam(c,{x,y,z}) =====
// lens: mm sets background blur (24 wide/sharp … 200 tele/soft); z is framing zoom
function lensBlur(v){return v.blur??(v.mm>40?(v.mm-40)*0.07:0);}
function cam(c,v){c.translate(540,960);c.scale(v.z||1,v.z||1);c.translate(-(v.x??540),-(v.y??960));}
function marbleG(c,x0,x1,col='#e8e0d0',dark=-0.45){const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,shd(col,dark));g.addColorStop(0.35,col);g.addColorStop(0.55,shd(col,0.3));g.addColorStop(0.8,shd(col,-0.1));g.addColorStop(1,shd(col,dark*0.9));return g;}
function column(c,x,y0,y1,w,col='#e6dccb',o={}){c.save();c.strokeStyle=K2;c.lineWidth=o.lw||5;
  // base + plinth
  c.fillStyle=marbleG(c,x-w*0.75,x+w*0.75,col);rr(c,x-w*0.72,y1-w*0.3,w*1.44,w*0.3,4);c.fill();c.stroke();rr(c,x-w*0.62,y1-w*0.52,w*1.24,w*0.24,w*0.12);c.fill();c.stroke();
  // shaft with slight taper + flutes
  c.fillStyle=marbleG(c,x-w/2,x+w/2,col);c.beginPath();c.moveTo(x-w*0.5,y1-w*0.52);c.lineTo(x-w*0.43,y0+w*0.5);c.lineTo(x+w*0.43,y0+w*0.5);c.lineTo(x+w*0.5,y1-w*0.52);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(60,40,30,0.22)';c.lineWidth=Math.max(1.5,w*0.035);for(let i=1;i<6;i++){const u=i/6-0.5;c.beginPath();c.moveTo(x+u*w*0.98,y1-w*0.55);c.lineTo(x+u*w*0.84,y0+w*0.55);c.stroke();}
  // capital (ionic-ish volutes)
  c.strokeStyle=K2;c.lineWidth=o.lw||5;c.fillStyle=marbleG(c,x-w*0.8,x+w*0.8,col);rr(c,x-w*0.78,y0,w*1.56,w*0.22,3);c.fill();c.stroke();
  c.beginPath();c.moveTo(x-w*0.6,y0+w*0.22);c.lineTo(x+w*0.6,y0+w*0.22);c.lineTo(x+w*0.48,y0+w*0.5);c.lineTo(x-w*0.48,y0+w*0.5);c.closePath();c.fill();c.stroke();
  for(const s of [-1,1]){c.beginPath();c.arc(x+s*w*0.62,y0+w*0.36,w*0.16,0,TAU);c.fill();c.stroke();c.beginPath();c.arc(x+s*w*0.62,y0+w*0.36,w*0.06,0,TAU);c.stroke();}
  c.restore();}
function marbleFloor(c,y0,y1,col='#c8b89c',o={}){const g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,shd(col,-0.35));g.addColorStop(1,shd(col,0.05));c.fillStyle=g;c.fillRect(-2000,y0,5200,y1-y0);
  // perspective tiles
  c.strokeStyle='rgba(40,24,14,0.25)';c.lineWidth=3;const vx=o.vx??540;for(let i=-14;i<=14;i++){c.beginPath();c.moveTo(vx+i*30,y0);c.lineTo(vx+i*260,y1+400);c.stroke();}
  let y=y0,d=18;while(y<y1+400){c.beginPath();c.moveTo(-2000,y);c.lineTo(3200,y);c.stroke();y+=d;d*=1.32;}
  // inlaid porphyry circles
  if(o.disc){c.fillStyle='rgba(120,30,40,0.35)';c.beginPath();c.ellipse(vx,y0+(y1-y0)*0.55,260,60,0,0,TAU);c.fill();c.strokeStyle='rgba(230,200,140,0.4)';c.lineWidth=5;c.stroke();}
  // warm sheen
  const s=c.createRadialGradient(vx,y0+60,0,vx,y0+60,700);s.addColorStop(0,'rgba(255,220,160,0.25)');s.addColorStop(1,'rgba(255,220,160,0)');c.fillStyle=s;c.fillRect(-2000,y0,5200,y1-y0);}
function banner(c,x,y,w,h,t,txt='SPQR'){c.save();c.strokeStyle=K2;c.lineWidth=4;c.fillStyle='#d8b040';c.fillRect(x-w/2-14,y-10,w+28,12);c.strokeRect(x-w/2-14,y-10,w+28,12);
  const sw=Math.sin(t*1.3+x)*6;const g=c.createLinearGradient(x-w/2,0,x+w/2,0);g.addColorStop(0,'#5a0a10');g.addColorStop(0.5,'#a81c24');g.addColorStop(1,'#5a0a10');c.fillStyle=g;
  c.beginPath();c.moveTo(x-w/2,y);c.lineTo(x+w/2,y);c.lineTo(x+w/2+sw,y+h);c.lineTo(x+sw,y+h-40);c.lineTo(x-w/2+sw,y+h);c.closePath();c.fill();c.stroke();
  c.fillStyle='#f0c858';c.font=`900 ${w*0.26}px "Inter Display",Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText(txt,x+sw*0.4,y+h*0.32);
  c.strokeStyle='#f0c858';c.lineWidth=3;c.beginPath();c.arc(x+sw*0.5,y+h*0.6,w*0.16,0,TAU);c.stroke();c.restore();}
// seated background senators (tiered benches), simple lit silhouettes
function benchRows(c,x0,x1,y,rows,t,o={}){for(let r=rows-1;r>=0;r--){const yy=y-r*110,sc=0.62-r*0.06;c.fillStyle=shd('#8a6a4a',-0.3-r*0.08);c.fillRect(x0,yy,x1-x0,40);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(x0,yy,x1-x0,40);
    for(let x=x0+40;x<x1-20;x+=88*sc+20){const k=hash(x*0.13+r*7);if(o.empty&&k>0.25)continue;const hx=x+Math.sin(t*0.8+x)*2,hy=yy-62*sc;
      c.fillStyle=shd('#e6dccb',-0.25-r*0.1);rr(c,hx-26*sc,hy+10*sc,52*sc,70*sc,14*sc);c.fill();c.stroke();
      c.fillStyle=shd('#d8d4cc',-0.2-r*0.1);c.beginPath();c.arc(hx,hy-6*sc,22*sc,0,TAU);c.fill();c.stroke();
      c.fillStyle=['#2a2018','#8a8a8a','#4a3a2a','#cfcfcf'][Math.floor(k*4)];c.beginPath();c.arc(hx,hy-10*sc,22*sc,Math.PI*1.05,Math.PI*1.95);c.fill();
      if(o.turn){c.fillStyle=K2;c.beginPath();c.arc(hx-5*sc+o.turn*4*sc,hy-6*sc,2.6*sc,0,TAU);c.arc(hx+7*sc+o.turn*4*sc,hy-6*sc,2.6*sc,0,TAU);c.fill();}}}}
// marble statue (Pompey) — fig2 in stone
KIND2.statue={coat:'#d6d0c4',limb:'#d6d0c4',hat:'none',hair:'#bdb6a8',hairStyle:'curly',skirt:'#cfc8ba',skirtL:104,toga:'#c4bcae',togaW:10};
function statue(c,x,y,s,t,o={}){c.save();c.fillStyle=marbleG(c,x-110*s,x+110*s,'#cfc6b4');rr(c,x-100*s,y,200*s,140*s,6);c.fill();c.strokeStyle=K2;c.lineWidth=5;c.stroke();
  const L0=L2;L2={...L2,rim:'#ffe6c0'};fig2(c,{kind:'statue',x,y,s,f:1,t:0,view:'front',eyes:'closed',brow:'flat',mouth:'flat',hf:[64,30],hb:[-12,94]});L2=L0;
  if(o.blood){c.fillStyle='rgba(150,10,20,0.85)';for(let i=0;i<7;i++){const bx=x+(hash(i)-0.5)*90*s,by=y-300*s+hash(i*3)*240*s,h=(60+hash(i*5)*200)*s*o.blood;rr(c,bx-6*s,by,12*s,h,6*s);c.fill();c.beginPath();c.arc(bx,by+h,9*s,0,TAU);c.fill();}}
  c.restore();}
// --- 1. Senate (Curia of Pompey) ---
function senate(c,t,v={},o={}){const GY=o.GY||1500;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const mood=o.mood||'day';const wall=mood==='blood'?'#6a3a32':'#b8a284';
  const g=c.createLinearGradient(0,-400,0,GY);g.addColorStop(0,shd(wall,-0.55));g.addColorStop(1,shd(wall,-0.1));c.fillStyle=g;c.fillRect(-1600,-600,4300,GY+600);
  // coffered upper wall + high windows with light
  for(let i=-4;i<9;i++){const x=i*240+60;c.fillStyle='rgba(0,0,0,0.25)';rr(c,x,-200,170,260,85);c.fill();c.fillStyle=mood==='night'?'rgba(80,110,180,0.35)':'rgba(255,230,170,0.75)';rr(c,x+16,-180,138,230,69);c.fill();}
  if(mood!=='night')lightRays(c,540,-100,'255,220,150',0.16,7,2200,0.9);
  // apse with statue of Pompey
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.moveTo(340,GY-120);c.lineTo(340,380);c.arc(540,380,200,Math.PI,0);c.lineTo(740,GY-120);c.closePath();c.fill();
  statue(c,540,GY-260,1.25,t,{blood:o.statueBlood});
  // columns
  for(const x of [-700,-380,-60,1140,1460,1780])column(c,x,140,GY-100,110);
  for(const x of [250,830])column(c,x,240,GY-120,90);
  banner(c,90,280,150,420,t);banner(c,990,280,150,420,t);
  // tiered benches with senators each side
  if(!o.noBench){benchRows(c,-900,200,GY-150,3,t,{empty:o.empty,turn:o.turn});benchRows(c,880,1980,GY-150,3,t,{empty:o.empty,turn:o.turn});}
  marbleFloor(c,GY-120,2600,'#c4ae8c',{disc:1});
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);
  c.restore();
  if(o.mood==='blood'){c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,60,60,0.55)';c.fillRect(0,0,W,H);c.restore();}}
// --- 2. Caesar's house (Pompeian red, lamps) ---
function oilLamp(c,x,y,t,s=1){c.save();c.strokeStyle=K2;c.lineWidth=4;c.fillStyle='#8a6a2a';rr(c,x-4*s,y,8*s,260*s,3);c.fill();c.stroke();c.beginPath();c.ellipse(x,y+260*s,40*s,10*s,0,0,TAU);c.fill();c.stroke();
  c.fillStyle='#c8a048';c.beginPath();c.ellipse(x,y,36*s,14*s,0,0,TAU);c.fill();c.stroke();fireTongue(c,x+26*s,y-6*s,46*s,16*s,t,x);
  c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x+26*s,y-30*s,0,x+26*s,y-30*s,420*s);g.addColorStop(0,'rgba(255,170,80,0.45)');g.addColorStop(1,'rgba(255,170,80,0)');c.fillStyle=g;c.fillRect(x-420*s,y-450*s,840*s,840*s);c.restore();}
function villa(c,t,v={},o={}){const GY=o.GY||1500;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);const night=o.night;
  const g=c.createLinearGradient(0,0,0,GY);g.addColorStop(0,night?'#3a0e10':'#7a1c18');g.addColorStop(1,night?'#5a1814':'#a8301e');c.fillStyle=g;c.fillRect(-1600,-600,4300,GY+600);
  // painted panels + frieze + black dado
  c.fillStyle='#1a1412';c.fillRect(-1600,GY-330,4300,210);c.fillStyle='#d8b050';c.fillRect(-1600,GY-336,4300,8);
  for(let i=-5;i<10;i++){const x=i*300;c.strokeStyle='rgba(240,200,120,0.55)';c.lineWidth=4;c.strokeRect(x+40,260,220,GY-640);c.strokeStyle='rgba(20,10,8,0.5)';c.lineWidth=12;c.strokeRect(x+20,240,260,GY-600);
    c.fillStyle='rgba(240,200,120,0.4)';c.beginPath();c.arc(x+150,260+(GY-640)/2,20,0,TAU);c.fill();}
  c.fillStyle='#1a1412';c.fillRect(-1600,120,4300,70);c.fillStyle='#d8b050';for(let x=-1600;x<2700;x+=60){c.fillRect(x,140,30,8);c.fillRect(x+15,160,30,8);}
  // window with sky (dawn or night)
  if(!o.noWin){const wx=o.winX??760;c.fillStyle='#1a1412';rr(c,wx-150,360,300,520,150);c.fill();const sk=c.createLinearGradient(0,380,0,880);
    if(night){sk.addColorStop(0,'#0a1028');sk.addColorStop(1,'#2a3460');}else{sk.addColorStop(0,'#7aa0d0');sk.addColorStop(1,'#f8c890');}c.fillStyle=sk;rr(c,wx-130,380,260,490,130);c.fill();
    if(night){c.fillStyle='#f4f0d8';c.beginPath();c.arc(wx+40,480,30,0,TAU);c.fill();}
    c.fillStyle=night?'#0a0c18':'#c89070';c.beginPath();c.moveTo(wx-130,870);c.lineTo(wx-130,760);c.lineTo(wx-70,760);c.lineTo(wx-60,700);c.lineTo(wx-10,700);c.lineTo(wx,740);c.lineTo(wx+60,740);c.lineTo(wx+80,680);c.lineTo(wx+130,690);c.lineTo(wx+130,870);c.fill();
    c.strokeStyle='#5a3418';c.lineWidth=10;c.beginPath();c.moveTo(wx,380);c.lineTo(wx,870);c.moveTo(wx-130,620);c.lineTo(wx+130,620);c.stroke();
    if(!night)lightRays(c,wx,500,'255,210,150',0.18,5,1600,0.5);}
  for(const x of o.cols||[-60,1140])column(c,x,100,GY-80,120,'#ece4d4');
  // floor: mosaic
  const fg=c.createLinearGradient(0,GY-120,0,2400);fg.addColorStop(0,'#5a4030');fg.addColorStop(1,'#a88a64');c.fillStyle=fg;c.fillRect(-1600,GY-120,4300,1400);
  c.strokeStyle='rgba(20,10,6,0.35)';c.lineWidth=3;let y=GY-120,d=16;while(y<2400){c.beginPath();c.moveTo(-1600,y);c.lineTo(2700,y);c.stroke();y+=d;d*=1.3;}
  c.strokeStyle='rgba(240,220,180,0.35)';c.lineWidth=8;c.beginPath();c.ellipse(540,GY+160,520,90,0,0,TAU);c.stroke();
  if(o.lamps!==0){oilLamp(c,o.lampX??180,GY-420,t,1);}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);
  c.restore();}
// --- 3. Rome street (insulae, arches, torches) ---
function insula(c,x,y,w,h,col,t,night,seed){c.save();c.strokeStyle=K2;c.lineWidth=5;const g=c.createLinearGradient(x,0,x+w,0);g.addColorStop(0,shd(col,-0.35));g.addColorStop(0.6,col);g.addColorStop(1,shd(col,-0.15));c.fillStyle=g;c.fillRect(x,y-h,w,h);c.strokeRect(x,y-h,w,h);
  // tile roof
  c.fillStyle='#8a3a22';c.beginPath();c.moveTo(x-30,y-h);c.lineTo(x+w/2,y-h-70);c.lineTo(x+w+30,y-h);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=3;for(let i=1;i<10;i++){c.beginPath();c.moveTo(x-30+i*(w+60)/10,y-h);c.lineTo(x+w/2,y-h-70);c.stroke();}
  // windows (lit at night) + balcony
  for(let r=0;r<Math.floor(h/190);r++)for(let k=0;k<Math.floor(w/130);k++){const wx=x+40+k*130,wy=y-h+60+r*190;const lit=night&&hash(seed+r*3+k)>0.45;c.fillStyle=lit?'#ffb860':'#1a120e';rr(c,wx,wy,60,90,30);c.fill();c.strokeStyle=K2;c.lineWidth=4;c.stroke();
    if(lit){c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,170,80,0.18)';c.beginPath();c.arc(wx+30,wy+45,90,0,TAU);c.fill();c.restore();}}
  c.fillStyle='#5a3418';c.fillRect(x+10,y-h+250,w-20,18);for(let i=0;i<w-20;i+=26)c.fillRect(x+12+i,y-h+268,6,50);
  // door arch
  c.fillStyle='#120c0a';c.beginPath();c.moveTo(x+w*0.35,y);c.lineTo(x+w*0.35,y-170);c.arc(x+w*0.5,y-170,w*0.15,Math.PI,0);c.lineTo(x+w*0.65,y);c.fill();c.restore();}
function wallTorch(c,x,y,t,s=1){prop(c,'torch',x,y,46*s,-0.35);c.save();fireTongue(c,x+10*s,y-30*s,70*s,26*s,t,x);c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-50*s,0,x,y-50*s,380*s);g.addColorStop(0,'rgba(255,150,60,0.5)');g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(x-400*s,y-430*s,800*s,800*s);c.restore();}
function street(c,t,v={},o={}){const GY=o.GY||1500,night=o.night;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const sk=c.createLinearGradient(0,-600,0,GY);if(night){sk.addColorStop(0,'#05060e');sk.addColorStop(1,'#1c1a30');}else if(o.dawn){sk.addColorStop(0,'#3a4a7a');sk.addColorStop(0.6,'#e8906a');sk.addColorStop(1,'#ffd8a0');}else{sk.addColorStop(0,'#6a9ad0');sk.addColorStop(1,'#f0dcb8');}c.fillStyle=sk;c.fillRect(-1600,-600,4300,GY+600);
  if(night){for(let i=0;i<80;i++){c.fillStyle=`rgba(255,255,255,${0.3+hash(i)*0.6})`;c.fillRect(hash(i*3)*3000-1000,hash(i*7)*800-500,3,3);}c.fillStyle='#f4f0d8';c.beginPath();c.arc(860,-200,60,0,TAU);c.fill();}
  // distant aqueduct arches + temple roofs
  c.fillStyle=night?'#141424':(o.dawn?'#9a6a6a':'#c8b8a0');c.fillRect(-1600,560,4300,40);for(let x=-1600;x<2700;x+=120){c.fillRect(x,560,24,500);c.beginPath();c.arc(x+72,640,48,Math.PI,0);c.fill();}
  c.beginPath();c.moveTo(200,620);c.lineTo(420,480);c.lineTo(640,620);c.fill();c.fillRect(220,620,400,420);
  const tone=night?['#4a3a40','#3a3238','#54443a']:['#d8a868','#c88a58','#e0c090'];
  insula(c,-900,GY-100,520,1050,tone[0],t,night,1);insula(c,-340,GY-100,400,820,tone[1],t,night,2);insula(c,1020,GY-100,460,980,tone[2],t,night,3);insula(c,1520,GY-100,500,900,tone[0],t,night,4);
  if(night||o.torches){wallTorch(c,-120,GY-560,t);wallTorch(c,1080,GY-600,t);}
  // cobblestones
  const fg=c.createLinearGradient(0,GY-100,0,2400);fg.addColorStop(0,night?'#2a2420':'#8a7a64');fg.addColorStop(1,night?'#4a3e34':'#b8a488');c.fillStyle=fg;c.fillRect(-1600,GY-100,4300,1400);
  c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=3;let y=GY-100,d=14,row=0;while(y<2400){c.beginPath();c.moveTo(-1600,y);c.lineTo(2700,y);c.stroke();for(let x=-1600+(row%2)*d*1.5;x<2700;x+=d*3){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+d);c.stroke();}y+=d;d*=1.25;row++;}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();
  if(night){c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(70,80,140,0.35)';c.fillRect(0,0,W,H);c.restore();}}
// --- 4. Forum at sunrise (temple facade, steps) ---
function forum(c,t,v={},o={}){const GY=o.GY||1500;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const sk=c.createLinearGradient(0,-600,0,GY);sk.addColorStop(0,'#2a3a6a');sk.addColorStop(0.55,'#e88a5a');sk.addColorStop(1,'#ffe0a8');c.fillStyle=sk;c.fillRect(-1600,-600,4300,GY+600);
  c.save();c.globalCompositeOperation='lighter';const sg=c.createRadialGradient(540,700,0,540,700,900);sg.addColorStop(0,'rgba(255,220,150,0.7)');sg.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=sg;c.fillRect(-500,-200,2100,1800);c.restore();
  // temple: pediment + 6 columns + steps
  c.strokeStyle=K2;c.lineWidth=6;c.fillStyle=marbleG(c,-100,1180,'#e8d8c0',-0.3);c.beginPath();c.moveTo(-80,300);c.lineTo(540,40);c.lineTo(1160,300);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(0,0,0,0.15)';c.beginPath();c.moveTo(60,280);c.lineTo(540,90);c.lineTo(1020,280);c.closePath();c.fill();
  c.fillStyle=marbleG(c,-100,1180,'#e8d8c0',-0.3);c.fillRect(-80,300,1240,90);c.strokeRect(-80,300,1240,90);c.fillStyle='rgba(60,30,20,0.6)';c.font='900 46px "Inter Display",Arial';c.textAlign='center';c.letterSpacing='14px';c.fillText('S·P·Q·R',540,362);
  c.fillStyle='rgba(30,18,14,0.55)';c.fillRect(-60,390,1200,GY-560);
  for(let i=0;i<6;i++)column(c,-20+i*224,390,GY-300,104,'#ecdcc4');
  for(let i=0;i<5;i++){c.fillStyle=marbleG(c,-300,1380,'#d8c8ac',-0.35);c.fillRect(-300-i*40,GY-300+i*44,1680+i*80,44);c.strokeRect(-300-i*40,GY-300+i*44,1680+i*80,44);}
  const fg=c.createLinearGradient(0,GY-80,0,2400);fg.addColorStop(0,'#b89a74');fg.addColorStop(1,'#e0c89c');c.fillStyle=fg;c.fillRect(-1600,GY-80,4300,1400);
  c.strokeStyle='rgba(60,30,20,0.25)';c.lineWidth=3;for(let i=-10;i<=10;i++){c.beginPath();c.moveTo(540+i*60,GY-80);c.lineTo(540+i*320,2400);c.stroke();}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// --- 5. Parthian desert ---
function desert(c,t,v={},o={}){const GY=o.GY||1400;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const sk=c.createLinearGradient(0,-600,0,GY);sk.addColorStop(0,'#3a6ab0');sk.addColorStop(0.7,'#f0c890');sk.addColorStop(1,'#ffe8c0');c.fillStyle=sk;c.fillRect(-2000,-600,5000,GY+600);
  c.fillStyle='#fff6d8';c.beginPath();c.arc(780,420,90,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const sg=c.createRadialGradient(780,420,0,780,420,600);sg.addColorStop(0,'rgba(255,230,160,0.6)');sg.addColorStop(1,'rgba(255,230,160,0)');c.fillStyle=sg;c.fillRect(0,-200,1600,1300);c.restore();
  c.fillStyle='#b08a7a';c.beginPath();c.moveTo(-2000,GY-260);for(let x=-2000;x<=3000;x+=100)c.lineTo(x,GY-260-Math.abs(Math.sin(x*0.004))*200-hash(x)*40);c.lineTo(3000,GY);c.lineTo(-2000,GY);c.fill();
  for(const [col,amp,yo] of [['#d8a868',90,-120],['#e8b878',60,-40],['#f0c888',40,40]]){c.fillStyle=col;c.beginPath();c.moveTo(-2000,GY+yo);for(let x=-2000;x<=3000;x+=50)c.lineTo(x,GY+yo-Math.sin(x*0.003+yo)*amp);c.lineTo(3000,2600);c.lineTo(-2000,2600);c.fill();}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// --- 6. Burning Rome at night ---
function burning(c,t,v={},o={}){c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);const sk=c.createLinearGradient(0,-600,0,1500);sk.addColorStop(0,'#0a0608');sk.addColorStop(0.6,'#5a1408');sk.addColorStop(1,'#e85a1a');c.fillStyle=sk;c.fillRect(-1600,-600,4300,2600);
  smoke(c,t,300,700,10,2.2,0.55);smoke(c,t+3,820,600,10,2.4,0.5);
  c.fillStyle='#120806';const sil=[[-300,900],[-60,780],[120,980],[300,700],[520,860],[700,640],[880,900],[1080,760],[1300,880]];for(const [x,y] of sil){c.fillRect(x,y,220,1500-y);c.beginPath();c.moveTo(x-10,y);c.lineTo(x+110,y-60);c.lineTo(x+230,y);c.fill();}
  c.beginPath();c.arc(540,620,180,Math.PI,0);c.fill();c.fillRect(360,620,360,900);for(let i=0;i<5;i++)c.fillRect(380+i*80,620,30,-40);
  for(let i=0;i<14;i++)fireTongue(c,hash(i)*1400-160,900+hash(i*3)*500,200+hash(i*5)*260,90+hash(i*7)*60,t,i);
  c.fillStyle='#0c0605';c.fillRect(-1600,1480,4300,1200);
  for(let i=0;i<60;i++){const p=((t*0.3+hash(i))%1);c.fillStyle=`rgba(255,${150+hash(i)*80|0},60,${1-p})`;c.beginPath();c.arc(hash(i*3)*1200-60+Math.sin(t+i)*30,1500-p*1400,3+hash(i)*4,0,TAU);c.fill();}
  c.restore();});cam(c,v);if(o.world)o.world(c,1500);c.restore();}
// --- 7. Map of the Mediterranean with Roman territory ---
function romeMap(c,t,k,o={}){c.fillStyle='#16202e';c.fillRect(0,0,W,H);
  c.save();c.translate(540,1000);c.scale(o.z||1,o.z||1);c.translate(-540,-1000);
  // sea
  const sg=c.createRadialGradient(540,1000,0,540,1000,900);sg.addColorStop(0,'#2c4a6a');sg.addColorStop(1,'#14243a');c.fillStyle=sg;c.fillRect(-400,300,1900,1400);
  const land='#c8b48c',lands=[
    [[-300,560],[200,520],[420,560],[520,640],[600,620],[700,560],[900,500],[1300,480],[1400,600],[1300,700],[1150,720],[1050,800],[980,760],[880,820],[800,780],[760,700],[640,700],[560,760],[620,880],[700,1000],[680,1030],[560,900],[480,780],[420,740],[300,760],[120,720],[60,780],[-60,820],[-300,860]],
    [[-300,1300],[200,1260],[460,1240],[720,1300],[960,1320],[1100,1240],[1260,1160],[1400,1100],[1500,1500],[-300,1600]],
    [[1050,860],[1250,820],[1400,860],[1400,1080],[1250,1120],[1120,1060],[1060,960]]];
  for(const P of lands){c.beginPath();P.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=land;c.fill();c.strokeStyle='#5a4a30';c.lineWidth=4;c.stroke();}
  // Roman territory (red) grows from Italy outward with k; east expansion (Parthia) when o.east
  c.save();c.beginPath();for(const P of lands){P.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();}c.clip();
  const R0=lerp(380,760,clamp(k));c.fillStyle='rgba(190,30,40,0.75)';c.beginPath();c.ellipse(560,860,R0*1.25,R0,0,0,TAU);c.fill();
  if(o.east){const e=clamp(o.east);c.fillStyle='rgba(190,30,40,0.8)';c.beginPath();c.ellipse(1250,900,80+e*420,60+e*380,0,0,TAU);c.fill();
    c.strokeStyle='rgba(255,220,120,0.8)';c.lineWidth=6;c.setLineDash([16,12]);c.lineDashOffset=-t*40;c.beginPath();c.ellipse(1250,900,80+e*420,60+e*380,0,0,TAU);c.stroke();c.setLineDash([]);}
  c.restore();
  // Rome marker
  c.fillStyle='#ffd860';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(600,820,16,0,TAU);c.fill();c.stroke();txt(c,'ROME',600,780,34,'#fff');
  if(o.east){txt(c,'PARTHIA',1240,980,44,'#ffe6a0');}
  c.restore();}
