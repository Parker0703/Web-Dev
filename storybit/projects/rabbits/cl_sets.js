'use strict';
// ===== Egypt sets + game UI for Cleopatra =====
const GOLD_C='#ffc94a',CYAN_C='#5fe3ff',GRN_C='#4ade80',PURP_C='#c58cff',RED_C='#ff5a4e';
function lotusColumn(c,x,y0,y1,w){c.save();c.strokeStyle=K2;c.lineWidth=5;const g=c.createLinearGradient(x-w/2,0,x+w/2,0);g.addColorStop(0,'#8a6a40');g.addColorStop(0.45,'#e8cfa0');g.addColorStop(1,'#9a7a4a');
  c.fillStyle=g;c.fillRect(x-w/2,y0+w*0.9,w,y1-y0-w*0.9);c.strokeRect(x-w/2,y0+w*0.9,w,y1-y0-w*0.9);
  // painted bands + hieroglyph ticks
  for(let k=0;k<4;k++){const yy=y0+w*1.2+k*(y1-y0)*0.22;c.fillStyle=['#1f4aa8','#c03020','#2ab0a0','#d8a830'][k];c.fillRect(x-w/2,yy,w,w*0.12);}
  c.fillStyle='rgba(60,30,10,0.45)';for(let k=0;k<12;k++){const yy=y0+w*1.6+k*(y1-y0)*0.065;c.fillRect(x-w*0.18,yy,w*0.36*(0.5+hash(k+x)*0.5),w*0.05);}
  // papyrus/lotus capital
  c.fillStyle=g;c.beginPath();c.moveTo(x-w*0.5,y0+w*0.9);c.quadraticCurveTo(x-w*1.0,y0+w*0.3,x-w*0.8,y0);c.lineTo(x+w*0.8,y0);c.quadraticCurveTo(x+w*1.0,y0+w*0.3,x+w*0.5,y0+w*0.9);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#2ab0a0';c.lineWidth=4;for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(x+k*w*0.12,y0+w*0.85);c.quadraticCurveTo(x+k*w*0.3,y0+w*0.3,x+k*w*0.34,y0+w*0.05);c.stroke();}
  c.fillStyle='#d8a830';c.fillRect(x-w*0.85,y0-w*0.12,w*1.7,w*0.14);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(x-w*0.85,y0-w*0.12,w*1.7,w*0.14);c.restore();}
function brazier(c,x,y,t,s=1){c.save();c.strokeStyle=K2;c.lineWidth=4;c.fillStyle='#8a6a2a';c.fillRect(x-6*s,y-180*s,12*s,180*s);c.strokeRect(x-6*s,y-180*s,12*s,180*s);
  const g=c.createLinearGradient(x-50*s,0,x+50*s,0);g.addColorStop(0,'#7a5418');g.addColorStop(0.5,'#f0c860');g.addColorStop(1,'#8a6018');c.fillStyle=g;c.beginPath();c.moveTo(x-52*s,y-200*s);c.lineTo(x+52*s,y-200*s);c.lineTo(x+30*s,y-170*s);c.lineTo(x-30*s,y-170*s);c.closePath();c.fill();c.stroke();
  for(let i=0;i<3;i++)fireTongue(c,x-20*s+i*20*s,y-198*s,70*s,26*s,t,i+x);c.globalCompositeOperation='lighter';const gl=c.createRadialGradient(x,y-240*s,0,x,y-240*s,420*s);gl.addColorStop(0,'rgba(255,170,80,0.42)');gl.addColorStop(1,'rgba(255,170,80,0)');c.fillStyle=gl;c.fillRect(x-420*s,y-660*s,840*s,840*s);c.restore();}
function hieroBand(c,x0,x1,y,h){c.save();c.fillStyle='#c8a46a';c.fillRect(x0,y,x1-x0,h);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(x0,y,x1-x0,h);c.fillStyle='rgba(50,24,10,0.7)';
  for(let x=x0+20,k=0;x<x1-20;x+=h*0.7,k++){const m=Math.floor(hash(k*1.7)*5),cx=x+h*0.25,cy=y+h/2;c.beginPath();
    if(m===0){c.arc(cx,cy,h*0.22,0,TAU);}else if(m===1){c.rect(cx-h*0.06,cy-h*0.32,h*0.12,h*0.64);}else if(m===2){c.ellipse(cx,cy,h*0.26,h*0.14,0,0,TAU);}else if(m===3){c.moveTo(cx-h*0.24,cy+h*0.3);c.lineTo(cx,cy-h*0.3);c.lineTo(cx+h*0.24,cy+h*0.3);}else{c.arc(cx,cy-h*0.08,h*0.14,0,TAU);c.rect(cx-h*0.04,cy,h*0.08,h*0.3);}c.fill();}c.restore();}
// --- Egyptian throne room (Alexandria palace) ---
function palace(c,t,v={},o={}){const GY=o.GY||1500;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,'#3a2414');g.addColorStop(1,o.night?'#4a3020':'#8a6440');c.fillStyle=g;c.fillRect(-1600,-600,4300,GY+600);
  // painted wall: deep blue starred ceiling band, figures frieze
  c.fillStyle='#14204a';c.fillRect(-1600,-600,4300,520);c.fillStyle='#e8c860';for(let i=0;i<120;i++){const x=hash(i*3)*4300-1600,y=hash(i*7)*480-580;c.save();c.translate(x,y);for(let k=0;k<5;k++){c.rotate(TAU/5);c.fillRect(-1,0,2,10);}c.restore();}
  hieroBand(c,-1600,2700,-80,60);hieroBand(c,-1600,2700,GY-330,70);
  for(let i=-4;i<10;i++){const x=i*300;c.fillStyle='rgba(0,0,0,0.18)';c.fillRect(x+30,60,240,GY-420);c.strokeStyle='rgba(232,200,96,0.5)';c.lineWidth=4;c.strokeRect(x+30,60,240,GY-420);
    // painted figure silhouettes (profile, classic Egyptian wall art)
    c.fillStyle=['#2a5ab8','#c03020','#2ab0a0'][((i%3)+3)%3];c.globalAlpha=0.45;c.beginPath();c.arc(x+150,300,30,0,TAU);c.fill();c.fillRect(x+128,330,44,240);c.fillRect(x+110,570,80,30);c.globalAlpha=1;}
  // purple + gold banners
  for(const x of [-60,1140]){c.fillStyle='#4a1460';c.fillRect(x-70,40,140,700);c.fillStyle='#d8a830';c.fillRect(x-70,40,140,24);c.fillRect(x-70,716,140,24);cobra(c,x,420,60,1.6);}
  // dais + throne
  if(!o.noThrone){c.fillStyle='#b89060';c.fillRect(140,GY-220,800,110);c.fillStyle='#9a7448';c.fillRect(80,GY-120,920,120);c.strokeStyle=K2;c.lineWidth=5;c.strokeRect(140,GY-220,800,110);c.strokeRect(80,GY-120,920,120);
    if(!o.noThroneProp)prop(c,'throne',540,GY-210,300,0);}
  for(const x of o.cols||[-250,250,830,1330])lotusColumn(c,x,80,GY-90,120);
  const fg=c.createLinearGradient(0,GY-100,0,2400);fg.addColorStop(0,'#6a4a2a');fg.addColorStop(1,'#c8a46a');c.fillStyle=fg;c.fillRect(-1600,GY-100,4300,1400);
  c.strokeStyle='rgba(30,16,6,0.3)';c.lineWidth=3;let y=GY-100,d=18;while(y<2400){c.beginPath();c.moveTo(-1600,y);c.lineTo(2700,y);c.stroke();y+=d;d*=1.3;}
  for(let i=-10;i<=10;i++){c.beginPath();c.moveTo(540+i*40,GY-100);c.lineTo(540+i*300,2400);c.stroke();}
  if(o.braziers!==0){brazier(c,o.bx0??60,GY+80,t,1.1);brazier(c,o.bx1??1020,GY+80,t,1.1);}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// --- the Nile / sea at sunset ---
function river(c,t,v={},o={}){const GY=o.GY||1150;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const sk=c.createLinearGradient(0,-600,0,GY);sk.addColorStop(0,o.night?'#060816':'#2a2a6a');sk.addColorStop(0.55,o.night?'#1a1430':'#e86a4a');sk.addColorStop(1,o.night?'#3a2030':'#ffd08a');c.fillStyle=sk;c.fillRect(-2000,-600,5000,GY+600);
  if(!o.night){c.fillStyle='#fff0c0';c.beginPath();c.arc(o.sunX??760,GY-120,110,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const sg=c.createRadialGradient(o.sunX??760,GY-120,0,o.sunX??760,GY-120,700);sg.addColorStop(0,'rgba(255,200,120,0.6)');sg.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=sg;c.fillRect(-600,GY-900,2400,1600);c.restore();}
  // far bank: pyramids, palms, lighthouse
  c.fillStyle=o.night?'#120c18':'#7a4a4a';if(o.pyr!==0){for(const [x,s] of [[-200,1],[150,0.7],[1250,0.9]]){c.beginPath();c.moveTo(x-260*s,GY);c.lineTo(x,GY-260*s);c.lineTo(x+260*s,GY);c.fill();}}
  c.fillRect(-2000,GY-30,5000,30);if(o.palms!==0){for(let i=0;i<14;i++){const x=-600+i*220+hash(i)*60;c.fillRect(x-4,GY-150,8,150);for(let k=0;k<6;k++){c.save();c.translate(x,GY-150);c.rotate(-1.4+k*0.56);c.beginPath();c.ellipse(36,0,40,8,0,0,TAU);c.fill();c.restore();}}}else{for(let i=0;i<22;i++){const x=-700+i*150+hash(i)*70,h=60+hash(i*3)*70;c.fillRect(x-4,GY-h*0.5,8,h*0.5);c.beginPath();c.ellipse(x,GY-h*0.7,30+hash(i*5)*20,h*0.5,0,0,TAU);c.fill();}}
  // water with sun glitter
  const wg=c.createLinearGradient(0,GY,0,2600);wg.addColorStop(0,o.night?'#1a1428':'#c86a4a');wg.addColorStop(0.3,o.night?'#0c0c1a':'#3a3a6a');wg.addColorStop(1,'#101026');c.fillStyle=wg;c.fillRect(-2000,GY,5000,1800);
  for(let i=0;i<160;i++){const y=GY+Math.pow(hash(i*3),1.6)*1300,x=(o.sunX??760)+(hash(i*7)-0.5)*(80+(y-GY)*0.9)+Math.sin(t*2+i)*14,w=10+hash(i)*60*(1+(y-GY)/600);c.fillStyle=o.night?`rgba(255,140,60,${0.25*hash(i*5)})`:`rgba(255,230,170,${0.55*hash(i*5)})`;c.fillRect(x,y,w,3+(y-GY)/300);}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();}
// --- night sea battle (Actium) ---
function seaBattle(c,t,v={},o={}){river(c,t,v,{night:1,pyr:0,GY:1000,world:(c2,GY)=>{
  for(let i=0;i<6;i++){const x=-200+i*280+Math.sin(t*0.6+i)*10,y=GY+60+(i%2)*120,s=0.35+(i%2)*0.12;c2.save();c2.globalAlpha=0.9;prop(c2,'barge',x,y,1000*s,Math.sin(t+i)*0.02,{anc:[0.5,0.7]});c2.restore();
    if(i%2===0){fireTongue(c2,x,y-260*s,320*s,140*s,t,i);smoke(c2,t+i,x,y-500*s,6,1.2*s,0.5);}}
  for(let i=0;i<40;i++){const p=((t*0.4+hash(i))%1);c2.fillStyle=`rgba(255,${150+hash(i)*80|0},60,${1-p})`;c2.beginPath();c2.arc(hash(i*3)*1400-160,GY+200-p*900,3+hash(i)*4,0,TAU);c2.fill();}
  if(o.world)o.world(c2,GY);}});}
// ===== game UI =====
const STN=['STRENGTH','INTELLIGENCE','CHARISMA'],STI=['⚔','✦','♛'],STC=['#ff9a5a','#5fe3ff','#ffc94a'];
// holographic status window (see-through): o={name,lv,v:[s,i,c],hi:2,gold,a,title}
function statWin(c,x,y,sc,o,t){const a=o.a??1;if(a<=0)return;const k=spring(Math.min(1,a));const PW=560,PH=520;c.save();c.translate(x,y);c.scale(sc*lerp(0.5,1,k),sc*lerp(0.1,1,k));c.globalAlpha=Math.min(1,a*3)*(0.95+0.05*Math.sin(t*37));
  const E=o.gold?'255,201,74':'95,227,255',E_=`rgb(${E})`,Ea=al=>`rgba(${E},${al})`;
  c.shadowColor=E_;c.shadowBlur=50;const bg=c.createLinearGradient(0,-PH/2,0,PH/2);bg.addColorStop(0,o.gold?'rgba(70,46,8,0.42)':'rgba(10,30,70,0.38)');bg.addColorStop(1,o.gold?'rgba(30,16,4,0.5)':'rgba(18,10,58,0.46)');c.fillStyle=bg;c.beginPath();c.roundRect(-PW/2,-PH/2,PW,PH,22);c.fill();c.shadowBlur=0;
  c.save();c.clip();c.strokeStyle=Ea(0.07);c.lineWidth=1.5;for(let r=0;r<13;r++)for(let q=0;q<11;q++){const hx=-PW/2+q*56+(r%2)*28,hy=-PH/2+r*48;c.beginPath();for(let e=0;e<6;e++){const an=e*Math.PI/3+Math.PI/6;c.lineTo(hx+Math.cos(an)*26,hy+Math.sin(an)*26);}c.closePath();c.stroke();}
  const sw=((t*0.45)%1.3-0.15)*PH-PH/2;const sg=c.createLinearGradient(0,sw-60,0,sw+10);sg.addColorStop(0,Ea(0));sg.addColorStop(1,Ea(0.16));c.fillStyle=sg;c.fillRect(-PW/2,sw-60,PW,70);c.restore();
  c.shadowColor=E_;c.shadowBlur=18;c.strokeStyle=E_;c.lineWidth=4;c.beginPath();c.roundRect(-PW/2,-PH/2,PW,PH,22);c.stroke();c.shadowBlur=0;
  c.strokeStyle='#fff';c.lineWidth=6;c.lineCap='round';for(const [sx,sy] of [[-1,-1],[1,-1],[-1,1],[1,1]]){const cx=sx*(PW/2-4),cy=sy*(PH/2-4);c.beginPath();c.moveTo(cx,cy-sy*46);c.lineTo(cx,cy);c.lineTo(cx-sx*46,cy);c.stroke();}
  const hy=-PH/2+66;c.save();c.translate(-PW/2+66,hy);c.fillStyle='#ffd24a';c.shadowColor='#ffd24a';c.shadowBlur=14;c.beginPath();for(let e=0;e<6;e++){const an=e*Math.PI/3;c.lineTo(Math.cos(an)*34,Math.sin(an)*34);}c.closePath();c.fill();c.shadowBlur=0;
    c.fillStyle='#3a2406';c.font='900 15px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.fillText('LV',0,-10);c.font='900 24px "Inter Display"';c.fillText(String(o.lv??1),0,10);c.restore();
  c.font='900 34px "Inter Display"';c.textAlign='left';c.textBaseline='middle';c.letterSpacing='8px';c.fillStyle='#fff';c.shadowColor=E_;c.shadowBlur=16;c.fillText(o.title||'STATUS',-PW/2+122,hy-4);c.shadowBlur=0;c.letterSpacing='4px';
  c.font='700 18px "Inter Display"';c.fillStyle=Ea(0.9);c.fillText(o.name||'PLAYER',-PW/2+124,hy+28);c.letterSpacing='0px';
  c.strokeStyle=Ea(0.6);c.lineWidth=2;c.beginPath();c.moveTo(-PW/2+30,hy+58);c.lineTo(PW/2-30,hy+58);c.stroke();
  for(let i=0;i<3;i++){const ry=-PH/2+190+i*100,v=o.v[i],col=STC[i],hot=o.hi===i;
    if(hot){c.fillStyle=Ea(0.14);c.beginPath();c.roundRect(-PW/2+22,ry-38,PW-44,76,14);c.fill();}
    c.save();c.translate(-PW/2+62,ry);const ib=c.createRadialGradient(-6,-8,2,0,0,26);ib.addColorStop(0,'#fff');ib.addColorStop(0.3,col);ib.addColorStop(1,'rgba(0,0,0,0.6)');c.fillStyle=ib;c.beginPath();c.arc(0,0,26,0,TAU);c.fill();c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=2.5;c.stroke();
      c.fillStyle='#fff';c.font='900 26px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.fillText(STI[i],0,1);c.restore();
    c.font='800 24px "Inter Display"';c.textAlign='left';c.letterSpacing='3px';c.fillStyle='#eaf8ff';c.fillText(STN[i],-PW/2+100,ry-14);c.letterSpacing='0px';
    const segs=10,f=clamp(v/100),bx=-PW/2+100,bw=290,s2=bw/segs;for(let q=0;q<segs;q++){const on=q<Math.round(f*segs*10)/10&&q<Math.ceil(f*segs);const part=clamp(f*segs-q);c.fillStyle='rgba(255,255,255,0.1)';c.beginPath();c.roundRect(bx+q*s2,ry+8,s2-5,14,3);c.fill();if(part>0){c.fillStyle=col;c.shadowColor=col;c.shadowBlur=hot?14:6;c.beginPath();c.roundRect(bx+q*s2,ry+8,(s2-5)*part,14,3);c.fill();c.shadowBlur=0;}}
    c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.roundRect(PW/2-110,ry-24,84,48,10);c.fill();c.font='900 30px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.fillStyle=hot?'#ffe066':'#fff';c.fillText(v>=100?'MAX':String(Math.round(v)),PW/2-68,ry+1);}
  c.restore();}
// big stat counter: CHARISMA a → b
function chaUp(c,t,t0,a,b,o={}){const q=clamp((t-t0)/0.9),v=Math.round(lerp(a,b,eio(q)));c.fillStyle='rgba(6,6,14,0.55)';c.fillRect(0,0,W,H);
  const k=back(clamp((t-t0+0.1)/0.35));c.save();c.translate(540,1000);c.scale(k,k);
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(0,0,0,0,0,600);gg.addColorStop(0,`rgba(255,200,80,${0.35+0.25*q})`);gg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gg;c.fillRect(-600,-600,1200,1200);c.restore();
  for(let i=0;i<14;i++){const an=i/14*TAU+t*0.5;c.save();c.rotate(an);c.fillStyle=`rgba(255,220,120,${0.18*q})`;c.beginPath();c.moveTo(0,0);c.lineTo(900,-40);c.lineTo(900,40);c.fill();c.restore();}
  c.font='900 54px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='14px';c.fillStyle='#fff';c.shadowColor=GOLD_C;c.shadowBlur=20;c.fillText('♛ CHARISMA',0,-230);c.shadowBlur=0;c.letterSpacing='0px';
  const g2=c.createLinearGradient(0,-140,0,140);g2.addColorStop(0,'#fff6d0');g2.addColorStop(0.5,'#f0b840');g2.addColorStop(1,'#8a5a10');c.font='900 300px "Inter Display"';c.lineWidth=18;c.strokeStyle='#140c04';const s=o.max&&q>=1?'100':String(v);
  c.strokeText(s,0,20);c.fillStyle=g2;c.shadowColor='#f0b840';c.shadowBlur=40;c.fillText(s,0,20);c.shadowBlur=0;
  c.font='800 44px "Inter Display"';c.fillStyle='rgba(255,255,255,0.75)';c.fillText(`${a}  →  ${b}`,0,230);
  if(q>=1){const p=clamp((t-t0-0.9)/0.4);c.globalAlpha=1-p*0.3;glowTxt(c,o.max?'MAX LEVEL':'LEVEL UP!',0,330,64,o.max?GOLD_C:CYAN_C,{ls:10});}
  for(let i=0;i<24;i++){const p=((t-t0)*0.8+hash(i))%1;c.fillStyle=`rgba(255,220,120,${1-p})`;c.beginPath();c.arc((hash(i*3)-0.5)*700,300-p*900,4+hash(i)*5,0,TAU);c.fill();}
  c.restore();}
// level banner card
function levelCard(c,t,t0,n,label,o={}){const a=t-t0;c.fillStyle='#07060a';c.fillRect(0,0,W,H);const k=eo(clamp(a/0.3));
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,960,0,540,960,900);g.addColorStop(0,`rgba(${o.col||'255,190,80'},${0.35*k})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  dustMotes(c,t,40,'255,220,160',0.5);c.save();c.translate(540,940);c.scale(0.7+0.3*k,0.7+0.3*k);c.globalAlpha=k;
  c.font='900 64px "Inter Display",Arial';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='20px';c.fillStyle='rgba(255,230,180,0.8)';c.fillText('LEVEL',0,-200);c.letterSpacing='0px';
  const g2=c.createLinearGradient(0,-120,0,120);g2.addColorStop(0,'#fff6d0');g2.addColorStop(0.5,'#f0b840');g2.addColorStop(1,'#8a5a10');c.font=`900 ${String(n).length>2?240:300}px "Inter Display",Arial`;c.lineWidth=18;c.strokeStyle='#120c04';c.strokeText(String(n),0,10);c.fillStyle=g2;c.shadowColor='#f0b840';c.shadowBlur=40;c.fillText(String(n),0,10);c.shadowBlur=0;
  const lk=clamp((a-0.35)/0.3);if(lk>0){c.globalAlpha=k*lk;c.fillStyle='rgba(0,0,0,0.55)';c.font='900 70px "Inter Display"';c.letterSpacing='10px';const w=c.measureText(label).width+80;c.beginPath();c.roundRect(-w/2,180,w,110,18);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=4;c.stroke();c.fillStyle='#fff';c.fillText(label,6,238);}c.restore();
  const sw=clamp((a-0.15)/0.6);if(sw>0&&sw<1){c.save();c.globalCompositeOperation='lighter';const x=lerp(150,930,sw);const g3=c.createLinearGradient(x-80,0,x+80,0);g3.addColorStop(0,'rgba(255,255,255,0)');g3.addColorStop(0.5,'rgba(255,240,200,0.35)');g3.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g3;c.fillRect(0,700,W,500);c.restore();}
  vignette(c,0.6);}
// game pop-up (unlock / bet won / boss)
function popup(c,t,t0,title,sub,col=GOLD_C,o={}){const a=t-t0;if(a<0)return;const k=back(clamp(a/0.3)),y=o.y||1000;c.save();c.translate(540,y);c.scale(k,k);
  const w=o.w||820,h=o.h||230;c.fillStyle='rgba(8,8,16,0.78)';c.beginPath();c.roundRect(-w/2,-h/2,w,h,26);c.fill();c.shadowColor=col;c.shadowBlur=30;c.strokeStyle=col;c.lineWidth=6;c.stroke();c.shadowBlur=0;
  c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=2;c.beginPath();c.roundRect(-w/2+12,-h/2+12,w-24,h-24,18);c.stroke();
  glowTxt(c,title,0,sub?-26:0,o.size||74,col,{ls:8});if(sub){c.font='800 34px "Inter Display"';c.fillStyle='rgba(255,255,255,0.85)';c.textAlign='center';c.letterSpacing='6px';c.fillText(sub,0,58);c.letterSpacing='0px';}
  if(o.icon)o.icon(c,-w/2+90,0);c.restore();
  if(a<0.6){for(let i=0;i<20;i++){const an=hash(i)*TAU,d=a/0.6*500;c.fillStyle=`rgba(255,230,140,${1-a/0.6})`;c.beginPath();c.arc(540+Math.cos(an)*d,y+Math.sin(an)*d*0.6,5,0,TAU);c.fill();}}}
// floating stat tag over a head
function statTag(c,x,y,txt2,col=CYAN_C,a=1){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.font='900 34px "Inter Display"';c.letterSpacing='3px';const w=c.measureText(txt2).width+40;c.fillStyle='rgba(8,12,24,0.75)';c.beginPath();c.roundRect(x-w/2,y-28,w,56,14);c.fill();c.strokeStyle=col;c.lineWidth=3;c.shadowColor=col;c.shadowBlur=12;c.stroke();c.shadowBlur=0;
  c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(txt2,x,y+1);c.restore();}
function sparkles(c,t,x,y,r,n=14,col='255,230,150'){for(let i=0;i<n;i++){const p=((t*0.7+hash(i*3))%1),an=hash(i)*TAU+t*0.3;const px=x+Math.cos(an)*r*(0.4+p*0.6),py=y+Math.sin(an)*r*(0.4+p*0.6)-p*40;const s=(1-p)*10;c.save();c.translate(px,py);c.rotate(p*3);c.fillStyle=`rgba(${col},${1-p})`;c.beginPath();for(let k=0;k<4;k++){c.lineTo(0,-s*2);c.lineTo(s*0.4,-s*0.4);c.rotate(Math.PI/2);}c.fill();c.restore();}}

function aquila(c,x,y,s,t){c.save();c.translate(x,y);c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#6a4024';c.fillRect(-5*s,0,10*s,520*s);c.strokeRect(-5*s,0,10*s,520*s);
  const g=c.createLinearGradient(-60*s,0,60*s,0);g.addColorStop(0,'#8a6010');g.addColorStop(0.5,'#ffe08a');g.addColorStop(1,'#a87818');c.fillStyle=g;
  c.beginPath();c.moveTo(0,-10*s);c.lineTo(-70*s,-70*s+Math.sin(t*2)*4*s);c.lineTo(-50*s,-20*s);c.lineTo(-20*s,-12*s);c.lineTo(0,-50*s);c.lineTo(20*s,-12*s);c.lineTo(50*s,-20*s);c.lineTo(70*s,-70*s+Math.sin(t*2)*4*s);c.closePath();c.fill();c.stroke();
  c.beginPath();c.arc(0,-56*s,12*s,0,TAU);c.fill();c.stroke();c.fillRect(-30*s,-6*s,60*s,14*s);c.strokeRect(-30*s,-6*s,60*s,14*s);
  c.fillStyle='#a81c24';rr(c,-44*s,40*s,88*s,110*s,4*s);c.fill();c.stroke();c.fillStyle='#f0c858';c.font=`900 ${26*s}px "Inter Display",Arial`;c.textAlign='center';c.fillText('SPQR',0,100*s);c.restore();}
