// ===== "What if you could save and reload your life?" — Style 3 (updated, from the death-countdown build) =====
KEY.clear();['SAVE','SAVE.','RELOAD','RELOAD.','RELOADS.','PRISONER','ONE','UNLIMITED','MILLIONAIRE.','PROMOTION.','REJECTED?','HUNDREDTH','TRUCK','DIES.','NOTHING','WORKS.','NO','LAST','HAPPEN.','FUTURE...','LIVED'].forEach(k=>KEY.add(k));
Object.assign(KIND2,{
  hero:{coat:'#2f4f63',limb:'#ecebe6',hat:'none',hair:'#2a1c14',hairStyle:'quiff',pants:'#2a2f3a'},
  friend:{coat:'#d08a2a',limb:'#ecebe6',hat:'none',hair:'#6a3a1a',hairStyle:'curly',pants:'#3a3a4a'},
  girl:{coat:'#c44a62',limb:'#ecebe6',hat:'none',hair:'#4a2416',hairStyle:'wavy',pants:'#3a2a34'},
  boss:{coat:'#3a3a44',limb:'#ecebe6',hat:'none',hair:'#9a9aa0',hairStyle:'slick',pants:'#26262e',stache:1},
  clerk:{coat:'#3a7a5a',limb:'#ecebe6',hat:'none',hair:'#1a1a1a',hairStyle:'buzz',pants:'#2a2a2a'},
});
const SAVE_C='#4fd6ff',LOAD_C='#ffb84a';
const FR=o=>fig2(o.c,{kind:'friend',...o});
// ---------------- game UI ----------------
function floppy(c,x,y,s,col=SAVE_C){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle='#0a0f16';c.lineWidth=7;
  c.fillStyle=col;c.beginPath();c.moveTo(-50,-50);c.lineTo(34,-50);c.lineTo(50,-34);c.lineTo(50,50);c.lineTo(-50,50);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8f6ff';rr(c,-30,-50,56,34,3);c.fill();c.stroke();c.fillStyle='#0a0f16';c.fillRect(8,-44,10,22);
  c.fillStyle='#f4f8fb';rr(c,-36,6,72,44,4);c.fill();c.stroke();c.fillStyle='rgba(0,0,0,0.25)';for(let i=0;i<3;i++)c.fillRect(-26,16+i*10,52,3);c.restore();}
function loadIco(c,x,y,s,t,col=LOAD_C){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=col;c.lineWidth=12;c.lineCap='round';c.beginPath();c.arc(0,0,42,-Math.PI*0.2,Math.PI*1.45);c.stroke();
  c.fillStyle=col;c.save();c.rotate(-Math.PI*0.2);c.beginPath();c.moveTo(42,-22);c.lineTo(64,6);c.lineTo(20,6);c.closePath();c.fill();c.restore();c.restore();}
function glowTxt(c,s,x,y,sz,col,o={}){c.save();c.font=`900 ${sz}px "Inter Display",Arial`;c.textAlign=o.al||'center';c.textBaseline='middle';if(o.ls)c.letterSpacing=o.ls+'px';
  c.shadowColor=col;c.shadowBlur=sz*0.5;c.fillStyle=col;c.fillText(s,x,y);c.shadowBlur=0;c.fillStyle=o.fill||'#ffffff';c.globalAlpha=0.9;c.fillText(s,x,y);c.restore();}
// "GAME SAVED" toast — pops, holds, slides away
function saveToast(c,t0,t,lab='GAME SAVED',y=560,o={}){const a=t-t0,dur=o.dur||1.6;if(a<0||a>dur+0.3)return;const k=a<0.18?eo(a/0.18):a>dur?1-(a-dur)/0.3:1;const col=o.col||SAVE_C;
  c.save();c.globalAlpha=k;c.translate(540,y);c.scale(0.8+0.2*k,0.8+0.2*k);
  const w=o.w||560;c.fillStyle='rgba(8,16,26,0.82)';rr(c,-w/2,-62,w,124,62);c.fill();c.strokeStyle=col;c.lineWidth=5;c.stroke();
  c.save();c.shadowColor=col;c.shadowBlur=30;c.strokeStyle=col;c.lineWidth=2;rr(c,-w/2,-62,w,124,62);c.stroke();c.restore();
  if(o.icon==='load')loadIco(c,-w/2+70,0,0.62,t,col);else floppy(c,-w/2+70,0,0.62,col);
  glowTxt(c,lab,28,-6,46,col,{ls:4});
  // progress dots
  const n=Math.floor(a*6)%4;for(let i=0;i<3;i++){c.fillStyle=i<n?col:'rgba(255,255,255,0.25)';c.beginPath();c.arc(28-26+i*26,36,6,0,TAU);c.fill();}
  c.restore();}
// rewind / reload transition overlay: scan tear bands, cyan-orange split, ◀◀ and a loading bar
function loadFx(c,t0,t,dur=0.7){const a=(t-t0)/dur;if(a<0||a>1)return;const k=Math.sin(a*Math.PI);
  c.save();c.globalCompositeOperation='screen';c.fillStyle=`rgba(255,170,70,${0.22*k})`;c.fillRect(0,0,W,H);c.restore();
  c.save();for(let i=0;i<14;i++){const y=(hash(i*3.1+Math.floor(t*30))*H)|0,h=8+hash(i)*60;c.fillStyle=`rgba(255,255,255,${0.10*k})`;c.fillRect(0,y,W,h);c.fillStyle=`rgba(80,220,255,${0.12*k})`;c.fillRect(-30*k,y+h*0.3,W,h*0.3);}
  c.fillStyle=`rgba(0,0,0,${0.18*k})`;for(let y=0;y<H;y+=6)c.fillRect(0,y,W,2);c.restore();
  c.save();c.globalAlpha=Math.min(1,k*1.6);glowTxt(c,'◀◀',540,860,150,LOAD_C);glowTxt(c,'LOADING',540,1010,58,LOAD_C,{ls:10});
  c.fillStyle='rgba(0,0,0,0.5)';rr(c,290,1070,500,22,11);c.fill();c.fillStyle=LOAD_C;rr(c,290,1070,500*clamp(a*1.3),22,11);c.fill();c.restore();}
// attempt counter chip
function attemptChip(c,n,x,y,s=1,col='#ff3b30'){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(10,10,16,0.82)';rr(c,-190,-46,380,92,46);c.fill();c.strokeStyle=col;c.lineWidth=5;c.stroke();
  c.font='800 30px "Inter Display",Arial';c.fillStyle='rgba(255,255,255,0.75)';c.textAlign='left';c.textBaseline='middle';c.letterSpacing='4px';c.fillText('ATTEMPT',-160,0);
  c.font=`900 ${String(n).length>3?42:52}px "Inter Display",Arial`;c.fillStyle=col;c.textAlign='right';c.letterSpacing='0px';c.fillText('#'+n,166,2);c.restore();}
function bigX(c,x,y,r,a=1,col='#ff3b30'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineWidth=r*0.22;c.shadowColor=col;c.shadowBlur=20;const p=Math.min(1,a);
  c.beginPath();c.moveTo(x-r,y-r);c.lineTo(x-r+2*r*Math.min(1,p*2),y-r+2*r*Math.min(1,p*2));if(p>0.5){const q=(p-0.5)*2;c.moveTo(x+r,y-r);c.lineTo(x+r-2*r*q,y-r+2*r*q);}c.stroke();c.restore();}
function bigCheck(c,x,y,r,a=1,col='#3ad06a'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineJoin='round';c.lineWidth=r*0.24;c.shadowColor=col;c.shadowBlur=20;c.beginPath();c.moveTo(x-r,y);c.lineTo(x-r*0.25,y+r*0.7);c.lineTo(x+r,y-r*0.7);c.stroke();c.restore();}
function heart(c,x,y,s,col='#ff4a6a'){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;c.strokeStyle='#1a0a10';c.lineWidth=5;c.beginPath();c.moveTo(0,30);c.bezierCurveTo(-60,-10,-30,-60,0,-28);c.bezierCurveTo(30,-60,60,-10,0,30);c.fill();c.stroke();c.restore();}
// --------------- sets ---------------
function nightSky(c){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a0e1e');g.addColorStop(0.6,'#1a2040');g.addColorStop(1,'#2a2a48');c.fillStyle=g;c.fillRect(0,0,W,H);}
// corner shop / lottery kiosk interior
function shop(c,t){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#e8dcc0');g.addColorStop(1,'#c8b48c');c.fillStyle=g;c.fillRect(0,0,W,H);
  // shelves of goods
  for(let r=0;r<4;r++){const y=260+r*230;c.fillStyle='#8a6a48';c.fillRect(0,y+170,W,22);c.strokeStyle=K2;c.lineWidth=5;c.strokeRect(-5,y+170,W+10,22);
    for(let i=0;i<14;i++){const x=20+i*76+(r%2)*30,h=80+hash(i+r*9)*80,w=58;const col=['#d84a3a','#3a8ad8','#f2c230','#3ab070','#e07a2a','#8a5ad0'][(i+r)%6];
      c.fillStyle=col;rr(c,x,y+170-h,w,h,6);c.fill();c.strokeStyle=K2;c.lineWidth=4;c.stroke();c.fillStyle='rgba(255,255,255,0.7)';c.fillRect(x+8,y+170-h+16,w-16,10);}}
  // LOTTO sign
  c.save();c.translate(540,450);c.fillStyle='#1a1018';rr(c,-260,-80,520,160,24);c.fill();c.strokeStyle='#ff4a8a';c.lineWidth=6;c.stroke();glowTxt(c,'LOTTO',0,4,110,'#ff4a8a',{ls:12});c.restore();
  // counter
  const cg=c.createLinearGradient(0,1380,0,H);cg.addColorStop(0,'#6a4a2c');cg.addColorStop(1,'#3a2614');c.fillStyle=cg;c.fillRect(0,1380,W,H-1380);c.fillStyle='#8a6a42';c.fillRect(0,1360,W,40);c.strokeStyle=K2;c.lineWidth=7;c.strokeRect(-6,1360,W+12,40);}
// lottery ticket (≈ 8×15 cm), drawn at scale k
function ticket(c,x,y,k,rot=0,nums=['07','14','23','31','42']){c.save();c.translate(x,y);c.rotate(rot);c.scale(k,k);c.fillStyle='#fffbe8';c.strokeStyle=K2;c.lineWidth=5;rr(c,-60,-110,120,220,8);c.fill();c.stroke();
  c.fillStyle='#e8344a';c.fillRect(-60,-110,120,46);c.strokeRect(-60,-110,120,46);c.fillStyle='#fff';c.font='900 28px Arial';c.textAlign='center';c.fillText('LOTTO',0,-78);
  nums.forEach((n,i)=>{const yy=-40+i*30;c.fillStyle='#1a1a2a';c.font='800 22px Arial';c.fillText(n,-20,yy);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2;c.beginPath();c.arc(30,yy-7,10,0,TAU);c.stroke();});
  c.fillStyle='#1a1a2a';for(let i=0;i<18;i++)c.fillRect(-50+i*5.5,96,i%3?2:4,10);c.restore();}
function lottoBall(c,x,y,r,n,col){const g=c.createRadialGradient(x-r*0.35,y-r*0.4,r*0.1,x,y,r);g.addColorStop(0,'#fff');g.addColorStop(0.35,col);g.addColorStop(1,shd(col,-0.4));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();
  c.fillStyle='#fff';c.beginPath();c.arc(x,y,r*0.55,0,TAU);c.fill();c.fillStyle='#14141a';c.font=`900 ${r*0.62}px "Inter Display",Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText(n,x,y+2);}
function tvSet(c,x,y,w,h,screen){c.save();c.fillStyle='#1a1a20';c.strokeStyle=K2;c.lineWidth=10;rr(c,x-w/2-24,y-h/2-24,w+48,h+48,22);c.fill();c.stroke();c.save();c.beginPath();rr(c,x-w/2,y-h/2,w,h,10);c.clip();screen(c,x-w/2,y-h/2,w,h);
  c.fillStyle='rgba(255,255,255,0.08)';c.beginPath();c.moveTo(x-w/2,y-h/2);c.lineTo(x-w/2+w*0.4,y-h/2);c.lineTo(x-w/2,y+h/2*0.2);c.fill();c.restore();c.restore();}
// restaurant date set
function restaurant(c,t){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a2230');g.addColorStop(1,'#6a3a3a');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<7;i++){const x=80+i*160;c.fillStyle='rgba(255,200,120,0.18)';c.beginPath();c.arc(x,260+(i%2)*40,70,0,TAU);c.fill();c.fillStyle='#ffd890';c.beginPath();c.arc(x,260+(i%2)*40,16,0,TAU);c.fill();c.strokeStyle='rgba(30,10,10,0.6)';c.lineWidth=3;c.beginPath();c.moveTo(x,0);c.lineTo(x,244+(i%2)*40);c.stroke();}
  c.fillStyle='#4a2a2a';c.fillRect(0,880,W,30);c.fillStyle='#5a3232';for(let i=0;i<9;i++)c.fillRect(i*130,910,8,500);
  // window with city lights
  c.fillStyle='#141a30';rr(c,90,420,900,420,12);c.fill();c.strokeStyle=K2;c.lineWidth=8;c.stroke();for(let i=0;i<40;i++){c.fillStyle=`rgba(255,${190+hash(i)*60|0},120,${0.4+hash(i*2)*0.5})`;c.fillRect(110+hash(i*7)*850,600+hash(i*3)*220,10,14);}
  c.strokeStyle=K2;c.lineWidth=8;c.beginPath();c.moveTo(540,420);c.lineTo(540,840);c.stroke();}
function dateTable(c,x,yb,w,t){c.save();c.fillStyle='#f4ece0';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.moveTo(x-w/2,yb);c.lineTo(x+w/2,yb);c.lineTo(x+w/2+40,yb+320);c.lineTo(x-w/2-40,yb+320);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8dccc';c.fillRect(x-w/2-40,yb+300,w+80,500);c.strokeRect(x-w/2-40,yb+300,w+80,500);
  // candle
  c.fillStyle='#f4f0e0';rr(c,x-18,yb-90,36,96,6);c.fill();c.stroke();const fl=Math.sin(t*14)*3;c.fillStyle='#ffcf5a';c.beginPath();c.ellipse(x+fl*0.3,yb-112,12,26,0,0,TAU);c.fill();
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(x,yb-110,0,x,yb-110,260);gg.addColorStop(0,'rgba(255,190,90,0.35)');gg.addColorStop(1,'rgba(255,190,90,0)');c.fillStyle=gg;c.fillRect(x-260,yb-370,520,520);c.restore();
  // wine glasses
  for(const sd of [-1,1]){const gx=x+sd*w*0.32;c.strokeStyle=K2;c.lineWidth=5;c.fillStyle='rgba(220,235,245,0.35)';c.beginPath();c.moveTo(gx-26,yb-120);c.quadraticCurveTo(gx-28,yb-60,gx,yb-56);c.quadraticCurveTo(gx+28,yb-60,gx+26,yb-120);c.closePath();c.fill();c.stroke();
    c.fillStyle='#8a1a2a';c.beginPath();c.moveTo(gx-24,yb-92);c.quadraticCurveTo(gx,yb-50,gx+24,yb-92);c.closePath();c.fill();c.beginPath();c.moveTo(gx,yb-56);c.lineTo(gx,yb-8);c.stroke();c.beginPath();c.ellipse(gx,yb-6,22,6,0,0,TAU);c.stroke();}
  c.restore();}
// --- full car seen from the front (sedan), people seated behind the windshield
function carFront(c,cx,by,w,t,o={}){const u=w/2,col=o.col||'#3a5a7a';const X=k=>cx+k*u,Y=k=>by-k*u;c.save();c.lineJoin='round';
  // ground shadow + headlight pool on the road
  c.fillStyle='rgba(0,0,0,0.55)';c.beginPath();c.ellipse(cx,by+6,u*1.08,u*0.09,0,0,TAU);c.fill();
  if(o.lights!==false){c.save();c.globalCompositeOperation='lighter';for(const sd of [-1,1]){const g=c.createRadialGradient(X(sd*0.7),by+u*0.25,0,X(sd*0.7),by+u*0.25,u*0.9);g.addColorStop(0,'rgba(255,245,210,0.35)');g.addColorStop(1,'rgba(255,245,210,0)');c.fillStyle=g;c.fillRect(X(sd*0.7)-u,by-u*0.3,2*u,u*1.4);}c.restore();}
  // tyres
  for(const sd of [-1,1]){c.fillStyle='#0d0d10';rr(c,X(sd*0.84)-u*0.11,Y(0.3),u*0.22,u*0.3,u*0.05);c.fill();}
  const body=()=>{c.beginPath();c.moveTo(X(-0.98),Y(0.1));c.quadraticCurveTo(X(-1.0),Y(0.4),X(-0.97),Y(0.6));c.lineTo(X(-0.82),Y(0.8));c.lineTo(X(0.82),Y(0.8));c.lineTo(X(0.97),Y(0.6));c.quadraticCurveTo(X(1.0),Y(0.4),X(0.98),Y(0.1));c.quadraticCurveTo(cx,Y(0.04),X(-0.98),Y(0.1));c.closePath();};
  body();const bg=c.createLinearGradient(0,Y(0.8),0,Y(0.05));bg.addColorStop(0,shd(col,0.35));bg.addColorStop(0.28,col);bg.addColorStop(0.6,shd(col,-0.15));bg.addColorStop(1,shd(col,-0.5));c.fillStyle=bg;c.fill();c.strokeStyle=K2;c.lineWidth=u*0.02;c.stroke();
  // hood surface (lighter, seen from slightly above) + center crease
  c.beginPath();c.moveTo(X(-0.93),Y(0.62));c.lineTo(X(-0.8),Y(0.79));c.lineTo(X(0.8),Y(0.79));c.lineTo(X(0.93),Y(0.62));c.quadraticCurveTo(cx,Y(0.58),X(-0.93),Y(0.62));c.closePath();
  const hg=c.createLinearGradient(0,Y(0.8),0,Y(0.6));hg.addColorStop(0,shd(col,0.5));hg.addColorStop(1,shd(col,0.15));c.fillStyle=hg;c.fill();c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=u*0.008;c.stroke();
  c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=u*0.01;for(const sd of [-1,1]){c.beginPath();c.moveTo(X(sd*0.3),Y(0.78));c.quadraticCurveTo(X(sd*0.33),Y(0.7),X(sd*0.36),Y(0.61));c.stroke();}
  // greenhouse: A-pillars + roof
  c.fillStyle=shd(col,-0.2);c.beginPath();c.moveTo(X(-0.82),Y(0.8));c.lineTo(X(-0.62),Y(1.24));c.quadraticCurveTo(cx,Y(1.29),X(0.62),Y(1.24));c.lineTo(X(0.82),Y(0.8));c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=u*0.02;c.stroke();
  const ws=()=>{c.beginPath();c.moveTo(X(-0.74),Y(0.81));c.lineTo(X(-0.57),Y(1.19));c.quadraticCurveTo(cx,Y(1.23),X(0.57),Y(1.19));c.lineTo(X(0.74),Y(0.81));c.quadraticCurveTo(cx,Y(0.79),X(-0.74),Y(0.81));c.closePath();};
  c.save();ws();c.clip();const ig=c.createLinearGradient(0,Y(1.22),0,Y(0.8));ig.addColorStop(0,'#141824');ig.addColorStop(1,'#232a3c');c.fillStyle=ig;c.fillRect(X(-1),Y(1.3),2*u,u*0.6);
  for(const sd of [-1,1]){c.fillStyle='#262632';rr(c,X(sd*0.33)-u*0.22,Y(1.17),u*0.44,u*0.5,u*0.08);c.fill();}
  if(o.people!==false){const s=u*0.0022,yb=Y(1.15)+318*s;FR({c,x:X(-0.33),y:yb,s,f:1,t,view:'front',...(o.fr||{})});HERO({c,x:X(0.33),y:yb,s,f:-1,t,view:'front',...(o.hero||{})});
    // steering wheel in front of the driver
    c.save();c.translate(X(0.33),Y(0.855));c.rotate(o.wheel||0);c.strokeStyle='#08080c';c.lineWidth=u*0.035;c.beginPath();c.ellipse(0,0,u*0.17,u*0.12,0,Math.PI*1.06,Math.PI*1.94);c.stroke();c.restore();}
  c.fillStyle='#101016';c.fillRect(X(-1),Y(0.86),2*u,u*0.08);
  // glass: tint, reflections, wipers
  c.fillStyle='rgba(150,190,230,0.10)';c.fillRect(X(-1),Y(1.3),2*u,u*0.6);c.fillStyle='rgba(255,255,255,0.13)';c.beginPath();c.moveTo(X(-0.45),Y(1.21));c.lineTo(X(-0.25),Y(1.21));c.lineTo(X(-0.5),Y(0.8));c.lineTo(X(-0.7),Y(0.8));c.fill();
  if(o.glare){c.save();c.globalCompositeOperation='lighter';c.fillStyle=`rgba(255,250,230,${o.glare})`;c.fillRect(X(-1),Y(1.3),2*u,u*0.6);c.restore();}
  c.restore();ws();c.strokeStyle=K2;c.lineWidth=u*0.022;c.stroke();
  c.strokeStyle='#0a0a0e';c.lineWidth=u*0.014;c.lineCap='round';c.beginPath();c.moveTo(X(-0.62),Y(0.82));c.lineTo(X(-0.08),Y(0.86));c.moveTo(X(0.06),Y(0.82));c.lineTo(X(0.58),Y(0.86));c.stroke();
  // mirrors
  for(const sd of [-1,1]){c.fillStyle=col;c.beginPath();c.ellipse(X(sd*0.93),Y(0.84),u*0.08,u*0.05,sd*0.2,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=u*0.014;c.stroke();c.fillStyle='rgba(180,210,240,0.5)';c.beginPath();c.ellipse(X(sd*0.935),Y(0.84),u*0.055,u*0.03,sd*0.2,0,TAU);c.fill();}
  // headlights (swept), grille, badge
  for(const sd of [-1,1]){c.beginPath();c.moveTo(X(sd*0.5),Y(0.58));c.lineTo(X(sd*0.9),Y(0.6));c.lineTo(X(sd*0.92),Y(0.52));c.quadraticCurveTo(X(sd*0.7),Y(0.48),X(sd*0.52),Y(0.5));c.closePath();
    c.fillStyle=o.lights===false?'#c8d0d8':'#fffbe8';c.fill();c.strokeStyle=K2;c.lineWidth=u*0.014;c.stroke();c.fillStyle='rgba(120,170,220,0.6)';c.beginPath();c.arc(X(sd*0.78),Y(0.545),u*0.03,0,TAU);c.fill();
    if(o.lights!==false){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(X(sd*0.72),Y(0.54),0,X(sd*0.72),Y(0.54),u*0.4);g.addColorStop(0,'rgba(255,250,220,0.55)');g.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=g;c.fillRect(X(sd*0.72)-u*0.4,Y(0.54)-u*0.4,u*0.8,u*0.8);c.restore();}}
  c.beginPath();c.moveTo(X(-0.4),Y(0.56));c.lineTo(X(0.4),Y(0.56));c.lineTo(X(0.34),Y(0.42));c.lineTo(X(-0.34),Y(0.42));c.closePath();c.fillStyle='#14161c';c.fill();c.strokeStyle='#b8bec8';c.lineWidth=u*0.014;c.stroke();
  c.strokeStyle='rgba(200,206,216,0.55)';c.lineWidth=u*0.008;for(let k=1;k<4;k++){const y=Y(0.56-k*0.035);c.beginPath();c.moveTo(X(-0.39+k*0.015),y);c.lineTo(X(0.39-k*0.015),y);c.stroke();}
  c.fillStyle='#c8ced8';c.beginPath();c.ellipse(cx,Y(0.49),u*0.05,u*0.03,0,0,TAU);c.fill();
  // bumper: lower intake, fog lights, plate
  c.fillStyle='#0e0f14';c.beginPath();c.moveTo(X(-0.5),Y(0.3));c.lineTo(X(0.5),Y(0.3));c.lineTo(X(0.44),Y(0.18));c.lineTo(X(-0.44),Y(0.18));c.closePath();c.fill();
  for(const sd of [-1,1]){c.fillStyle='#0e0f14';rr(c,X(sd*0.72)-u*0.1,Y(0.3),u*0.2,u*0.09,u*0.03);c.fill();c.fillStyle='#ffe9b0';c.beginPath();c.arc(X(sd*0.72),Y(0.255),u*0.03,0,TAU);c.fill();}
  c.fillStyle='#f4f4ec';rr(c,X(-0.15),Y(0.42),u*0.3,u*0.09,u*0.01);c.fill();c.strokeStyle=K2;c.lineWidth=u*0.008;c.stroke();c.fillStyle='#1a1a2a';c.font=`800 ${u*0.06}px Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText('SV 0001',cx,Y(0.375));
  // body highlight line
  c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=u*0.012;c.beginPath();c.moveTo(X(-0.95),Y(0.62));c.quadraticCurveTo(cx,Y(0.585),X(0.95),Y(0.62));c.stroke();
  c.restore();}
function carFront3(c,cx,gy,w,t,o={}){const m=VMETA.car_front;const k=w/(m.sx1-m.sx0);const ox=cx-(m.sx0+(m.sx1-m.sx0)/2)*k,oy=gy-m.gy*k;const [hx0,hy0,hx1,hy1]=m.hole;const X0=ox+hx0*k,Y0=oy+hy0*k,X1=ox+hx1*k,Y1=oy+hy1*k,hw=X1-X0,hh=Y1-Y0;
  c.save();c.beginPath();c.rect(X0-40,Y0-10,hw+80,hh+30);c.clip();const ig=c.createLinearGradient(0,Y0,0,Y1);ig.addColorStop(0,'#141824');ig.addColorStop(1,'#262c40');c.fillStyle=ig;c.fillRect(X0-40,Y0-10,hw+80,hh+30);
  for(const sd of [-1,1]){c.fillStyle='#262632';rr(c,cx+sd*hw*0.25-hw*0.17,Y0+hh*0.08,hw*0.34,hh*1.1,hw*0.05);c.fill();}
  if(o.people!==false){const s=hh*0.4/94,yb=Y0+hh*0.12+318*s;FR({c,x:cx-hw*0.25,y:yb,s,f:1,t,view:'front',...(o.fr||{})});HERO({c,x:cx+hw*0.25,y:yb,s,f:-1,t,view:'front',...(o.hero||{})});
    c.save();c.translate(cx+hw*0.25,Y1-hh*0.05);c.rotate(o.wheel||0);c.strokeStyle='#08080c';c.lineWidth=hh*0.07;c.beginPath();c.ellipse(0,0,hw*0.15,hh*0.26,0,Math.PI*1.08,Math.PI*1.92);c.stroke();c.restore();}
  c.fillStyle='#0e0e14';c.fillRect(X0-40,Y1-hh*0.08,hw+80,hh*0.2);c.restore();
  if(o.lights!==false){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(cx,gy+60,0,cx,gy+60,w*0.8);g.addColorStop(0,'rgba(255,245,210,0.3)');g.addColorStop(1,'rgba(255,245,210,0)');c.fillStyle=g;c.fillRect(cx-w,gy-200,2*w,700);c.restore();}
  vehDraw(c,'car_front',cx,gy,w);
  // glass over the hole: tint, reflection, glare
  c.save();c.beginPath();c.moveTo(X0+hw*0.04,Y0);c.lineTo(X1-hw*0.04,Y0);c.lineTo(X1+hw*0.02,Y1);c.lineTo(X0-hw*0.02,Y1);c.closePath();c.clip();c.fillStyle='rgba(150,190,230,0.1)';c.fillRect(X0-40,Y0,hw+80,hh);
  c.fillStyle='rgba(255,255,255,0.12)';c.beginPath();c.moveTo(X0+hw*0.12,Y0);c.lineTo(X0+hw*0.3,Y0);c.lineTo(X0+hw*0.1,Y1);c.lineTo(X0-hw*0.08,Y1);c.fill();
  if(o.glare){c.globalCompositeOperation='lighter';c.fillStyle=`rgba(255,250,230,${o.glare})`;c.fillRect(X0-40,Y0,hw+80,hh);}c.restore();
  c.strokeStyle='#0a0a0e';c.lineWidth=hh*0.025;c.lineCap='round';c.beginPath();c.moveTo(X0+hw*0.08,Y1-hh*0.03);c.lineTo(cx-hw*0.05,Y1-hh*0.06);c.moveTo(cx+hw*0.03,Y1-hh*0.03);c.lineTo(X1-hw*0.1,Y1-hh*0.06);c.stroke();}
// night street seen head-on, the car stopped/driving toward camera
function cabin(c,t,o={}){nightSky(c);const hy=1060;
  for(let i=0;i<10;i++){const h=380+hash(i)*520,x=i*120-60;c.fillStyle=i%2?'#161a2c':'#1a1f34';c.fillRect(x,hy-h,116,h);for(let k=0;k<10;k++)if(hash(i*13+k)>0.55){c.fillStyle='rgba(255,210,130,0.55)';c.fillRect(x+16+(k%2)*48,hy-h+30+Math.floor(k/2)*70,26,34);}}
  // street lamps passing
  for(let i=0;i<4;i++){const x=((i*330-t*260*(o.speed??1))%1320+1320)%1320-120;c.fillStyle='#2a2a34';c.fillRect(x,hy-560,10,560);c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x+5,hy-560,0,x+5,hy-560,140);g.addColorStop(0,'rgba(255,210,140,0.5)');g.addColorStop(1,'rgba(255,210,140,0)');c.fillStyle=g;c.fillRect(x-140,hy-700,290,290);c.restore();}
  const rg=c.createLinearGradient(0,hy,0,H);rg.addColorStop(0,'#24262e');rg.addColorStop(1,'#121318');c.fillStyle=rg;c.fillRect(0,hy,W,H-hy);
  c.fillStyle='rgba(255,240,200,0.75)';for(let k=0;k<6;k++){const p=((k/6+t*0.9*(o.speed??1))%1);c.fillRect(540-3-p*14,hy+p*p*900,6+p*28,8+p*70);}
  const z=o.zoom||1.2;c.save();c.translate(540,1250);c.scale(z,z);c.translate(-540,-1150);
  carFront3(c,540,1640,1060,t,o);c.restore();}
// driver's view through the windshield (over the shoulder from the back seat)
function povRoad(c,t,o={}){nightSky(c);const hy=1000;
  for(let i=0;i<9;i++){const h=300+hash(i)*500;c.fillStyle='#141828';c.fillRect(i*130-40,hy-h,120,h);for(let k=0;k<6;k++)if(hash(i*9+k)>0.5){c.fillStyle='rgba(255,210,120,0.6)';c.fillRect(i*130-20+(k%2)*50,hy-h+30+k*40,18,20);}}
  const rg=c.createLinearGradient(0,hy,0,H);rg.addColorStop(0,'#2a2c34');rg.addColorStop(1,'#16171c');c.fillStyle=rg;c.fillRect(0,hy,W,H-hy);
  c.fillStyle='rgba(255,240,200,0.85)';for(let k=0;k<7;k++){const p=((k/7+t*1.2*(o.speed??1))%1);const y=hy+p*p*900,w=4+p*p*26;c.fillRect(540-w/2,y,w,10+p*60);}
  if(o.truck!=null){const q=o.truck;truckFront2(c,lerp(o.tx0??860,540,eio(Math.min(1,q))),lerp(1010,1500,Math.pow(Math.min(1,q),1.6)),lerp(200,1000,Math.pow(Math.min(1,q),1.5)));
    c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(540,1200,0,540,1200,1100);gg.addColorStop(0,`rgba(255,250,220,${0.25+q*0.6})`);gg.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();}
  // interior frame: roof, pillars, dash, two heads from behind
  c.fillStyle='#0c0c12';c.fillRect(0,0,W,260);c.beginPath();c.moveTo(0,260);c.lineTo(150,260);c.lineTo(40,1450);c.lineTo(0,1450);c.fill();c.beginPath();c.moveTo(W,260);c.lineTo(W-150,260);c.lineTo(W-40,1450);c.lineTo(W,1450);c.fill();
  c.fillStyle='#121218';c.beginPath();c.moveTo(0,1450);c.quadraticCurveTo(540,1380,W,1450);c.lineTo(W,H);c.lineTo(0,H);c.fill();
  fig2(c,{x:280,y:2420,s:3.1,f:1,t,kind:'friend',back:1});fig2(c,{x:800,y:2420,s:3.1,f:-1,t,kind:'hero',back:1});
  c.save();c.translate(800,1560);c.rotate(o.wheel||0);c.strokeStyle='#060608';c.lineWidth=40;c.beginPath();c.ellipse(0,0,230,170,0,Math.PI*1.02,Math.PI*1.98);c.stroke();c.restore();}
// exterior night road (side view) for the crash beats
function nightRoad(c,t,cam){cityStreet(c,t,cam,{mood:'night',cw:9000,world:cam.world});}
// two heads seen through the side windows (car-local units)
function inCar(c){for(const [x,hair] of [[0.32,'#2a1c14'],[-0.95,'#6a3a1a']]){c.fillStyle='#d8d8dc';c.strokeStyle='#0c0c10';c.lineWidth=0.025;c.beginPath();c.arc(x,-1.13,0.17,0,TAU);c.fill();c.stroke();
  c.fillStyle=hair;c.beginPath();c.arc(x,-1.17,0.175,Math.PI*1.02,Math.PI*1.98);c.closePath();c.fill();c.fillStyle='#2a2a34';c.fillRect(x-0.2,-1.0,0.4,0.1);}}
// timeline branch diagram
function branches(c,t,t0,o={}){const n=o.n||7;const x0=140,y0=960;c.save();c.lineCap='round';
  for(let i=0;i<n;i++){const a=clamp((t-t0-i*0.12)/0.5);if(a<=0)continue;const y1=360+i*(1200/(n-1));const x1=lerp(x0,900,a);
    c.strokeStyle='rgba(120,200,255,0.75)';c.lineWidth=10;c.beginPath();c.moveTo(x0,y0);c.bezierCurveTo(x0+260,y0,x0+260,y1,x1,y1);c.stroke();
    if(a>=1){const xa=clamp((t-t0-i*0.12-0.5)/0.3);if(o.okIdx===i){bigCheck(c,930,y1,40,xa);}else bigX(c,930,y1,38,xa);}}
  c.fillStyle=SAVE_C;c.beginPath();c.arc(x0,y0,34,0,TAU);c.fill();c.strokeStyle='#0a0f16';c.lineWidth=6;c.stroke();floppy(c,x0,y0,0.4,'#0a1a26');c.restore();}
// ---------------- shots ----------------
SH={};
// 0 · street, coffee spills → reload, it never happened
SH.hook=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a6070'};const tl=WT(1,1)-0.05,tip=B(0)-0.45;
  // spill amount: 0→1 as the coffee pours, then the reload rewinds it back to 0
  const fw=clamp((t-tip)/0.55),bk=clamp((t-tl)/0.6),sp=t<tl?fw:fw*(1-eio(bk));const hit=sp>0.35;const clean=t>tl+0.6;
  const z=lerp(1.0,1.08,inv(0,B(1),t));c.save();c.translate(540,1150);c.scale(z,z);c.translate(-540,-1150);
  dof(c,3,d=>{cityStreet(d,t,scam(lerp(-80,40,inv(0,B(1),t)),1.6,1350),{mood:'morning',cw:9000});});
  const shock=sp>0.25&&!clean;const S=3.3,X=520,Y=2150;
  const r=HERO({c,x:X,y:Y,s:S,f:1,t,view:'front',eyes:shock?'wide':(clean?'happy':'open'),brow:shock?'up':'flat',mouth:shock?'scream':(clean?'smile':'flat'),sweat:shock?1:0,hf:[54-sp*30,30-sp*40],lean:-0.05*sp});
  const hd=r&&r.hf?r.hf:{x:X+200,y:1500};
  // chest stain: irregular wet blob + drips, grows with the spill
  const cx=X+10,cy=HEAD(Y,S)+47*S*2+120;const st=clamp((sp-0.3)/0.7);
  if(st>0){c.save();c.globalAlpha=0.92;const blob=(sc,col)=>{c.fillStyle=col;c.beginPath();for(let k=0;k<=24;k++){const a=k/24*TAU,rr2=(1+0.28*Math.sin(a*3+1)+0.18*Math.sin(a*5+2))*sc;const x=cx+Math.cos(a)*rr2*1.25,y=cy+Math.sin(a)*rr2*0.85;k?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();c.fill();};
    blob(95*st,'rgba(70,38,16,0.85)');blob(70*st,'rgba(96,54,24,0.9)');
    for(let k=0;k<5;k++){const dx=(k-2)*40*st,len=st*(80+hash(k)*160);c.fillStyle='rgba(84,46,20,0.9)';rr(c,cx+dx-9,cy+20,18,len,9);c.fill();c.beginPath();c.arc(cx+dx,cy+20+len,13,0,TAU);c.fill();}
    c.fillStyle='rgba(255,230,200,0.35)';c.beginPath();c.ellipse(cx-30*st,cy-25*st,40*st,14*st,-0.4,0,TAU);c.fill();c.restore();
    // steam off the hot stain
    c.save();for(let k=0;k<4;k++){const p=((t*0.8+k*0.25)%1);c.strokeStyle=`rgba(255,255,255,${0.35*(1-p)*st})`;c.lineWidth=10;c.lineCap='round';c.beginPath();const sx=cx-60+k*40;c.moveTo(sx,cy-40-p*220);c.bezierCurveTo(sx+30,cy-80-p*220,sx-30,cy-120-p*220,sx,cy-160-p*220);c.stroke();}c.restore();}
  // the cup: tips toward him while it pours
  const ang=-sp*1.7;const k=S*1.15;c.save();c.translate(hd.x,hd.y);c.rotate(ang);
  c.fillStyle='#f4efe6';c.strokeStyle=K2;c.lineWidth=4*S;c.beginPath();c.moveTo(-12*k,-30*k);c.lineTo(12*k,-30*k);c.lineTo(9*k,8*k);c.lineTo(-9*k,8*k);c.closePath();c.fill();c.stroke();
  c.fillStyle='#b8865a';c.fillRect(-11*k,-14*k,22*k,9*k);c.fillStyle='#2a2a32';rr(c,-13.5*k,-36*k,27*k,7*k,2*k);c.fill();c.stroke();
  const lip=[-12*k,-30*k];c.restore();
  // stream: from the cup lip to the chest (thick brown ribbon with highlight) + splash droplets
  if(sp>0.08&&sp<0.98&&(t<tl||bk<0.95)){const la=ang,lx=hd.x+Math.cos(la)*lip[0]-Math.sin(la)*lip[1],ly=hd.y+Math.sin(la)*lip[0]+Math.cos(la)*lip[1];
    const w=26*Math.sin(Math.PI*clamp(sp))+6;c.save();c.strokeStyle='#6a3a16';c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(lx,ly);c.quadraticCurveTo(lx-60,ly-40,cx+20,cy);c.stroke();
    c.strokeStyle='rgba(255,220,180,0.45)';c.lineWidth=w*0.25;c.beginPath();c.moveTo(lx-4,ly-4);c.quadraticCurveTo(lx-62,ly-46,cx+14,cy-6);c.stroke();
    for(let q=0;q<12;q++){const a=-Math.PI*0.9+hash(q)*Math.PI*0.8,d=(30+hash(q*3)*170)*clamp(sp*1.5);c.fillStyle='#5a3214';c.beginPath();c.ellipse(cx+20+Math.cos(a)*d,cy+Math.sin(a)*d*0.7,8+hash(q)*8,6+hash(q*2)*6,a,0,TAU);c.fill();}c.restore();}
  c.restore();saveToast(c,WT(0,4),t,'GAME SAVED',600,{dur:0.9});loadFx(c,tl,t,0.7);vignette(c,0.45);};
// 1 · lived it already: ghost copies of you replaying the same moment
SH.future=function(c,t){L2={dx:-1,rim:'#9fd8ff',amb:'#2a3048'};const q=inv(A(2),B(3),t);c.fillStyle='#0e1220';c.fillRect(0,0,W,H);
  dof(c,4,d=>{cityStreet(d,t,scam(0,1.5,1300),{mood:'dusk',cw:9000});});c.fillStyle='rgba(14,18,40,0.45)';c.fillRect(0,0,W,H);
  for(let i=4;i>=1;i--){const a=clamp((t-A(2)-i*0.25)/0.4)*0.28;c.save();c.globalAlpha=a;c.translate((i%2?1:-1)*i*70,-i*10);HERO({c,x:540,y:2450,s:4.3,f:1,t:t-i*0.3,view:'front',eyes:'open',mouth:'flat',ghost:1});c.restore();}
  HERO({c,x:540,y:2450,s:4.3,f:1,t,view:'front',eyes:t>A(3)?'half':'open',brow:t>A(3)?'flat':'up',mouth:'flat'});
  if(t>WT(2,5)){c.save();c.globalAlpha=clamp((t-WT(2,5))/0.3);glowTxt(c,'ALREADY SEEN',540,420,58,SAVE_C,{ls:8});c.restore();}vignette(c,0.55);};
// 2 · prisoner: inside a cell whose bars are loading bars
SH.prison=function(c,t){L2={dx:0,rim:'#ffb84a',amb:'#2a2438'};c.fillStyle='#14121c';c.fillRect(0,0,W,H);const z=lerp(1.0,1.18,eio(inv(A(4),B(7),t)));
  c.save();c.translate(540,1100);c.scale(z,z);c.translate(-540,-1100);
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(540,700,0,540,700,900);gg.addColorStop(0,'rgba(255,184,74,0.25)');gg.addColorStop(1,'rgba(255,184,74,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();
  HERO({c,x:540,y:2350,s:4.2,f:1,t,view:'front',eyes:t>A(6)?'half':'open',brow:'worried',mouth:'frown',hf:[40,-20],hb:[-40,-20]});
  const n=7;for(let i=0;i<n;i++){const x=90+i*150,drop=eo(clamp((t-A(5)-i*0.05)/0.35));const y1=lerp(-1200,0,drop);c.fillStyle='rgba(0,0,0,0.6)';rr(c,x-22,y1+120,44,1650,22);c.fill();
    c.strokeStyle=LOAD_C;c.lineWidth=5;rr(c,x-22,y1+120,44,1650,22);c.stroke();const fill=(Math.sin(t*2+i)*0.5+0.5);c.fillStyle=LOAD_C;rr(c,x-14,y1+128+1634*(1-fill),28,1634*fill,14);c.fill();}
  c.restore();vignette(c,0.6);};
// 3 · one morning: wakes, a save menu floats in the bedroom
SH.morning=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};bedroom2(c,t,{mood:'morning',clock:'7:00'});const q=inv(A(8),B(8),t);
  HERO({c,x:540,y:1700,s:2.7,f:1,t,view:'front',crouch:30,eyes:t>WT(8,4)?'wide':'half',brow:t>WT(8,4)?'up':'flat',mouth:t>WT(8,4)?'o':'flat',look:[0,-1]});
  c.fillStyle='#3a5a8a';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.moveTo(100,1500);c.lineTo(980,1500);c.lineTo(1010,1800);c.lineTo(70,1800);c.closePath();c.fill();c.stroke();
  const a=clamp((t-WT(8,4))/0.4);if(a>0){c.save();c.globalAlpha=a;c.translate(540,560);c.scale(0.9+0.1*a,0.9+0.1*a);c.fillStyle='rgba(8,16,26,0.82)';rr(c,-300,-150,600,300,30);c.fill();c.strokeStyle=SAVE_C;c.lineWidth=5;c.stroke();
    glowTxt(c,'SAVE',0,-60,74,SAVE_C,{ls:10});glowTxt(c,'LOAD',0,50,74,LOAD_C,{ls:10});c.restore();}
  vignette(c,0.4);};
// 4 · save any moment / return to it: menu close-up with a slot thumbnail
SH.menu=function(c,t){c.fillStyle='#0a1018';c.fillRect(0,0,W,H);const sel=t>A(10)+0.2?1:0;
  c.save();c.strokeStyle='rgba(79,214,255,0.08)';c.lineWidth=2;for(let x=0;x<W;x+=60){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}for(let y=0;y<H;y+=60){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}c.restore();
  glowTxt(c,'SAVE GAME',540,470,80,SAVE_C,{ls:12});
  // slot card with a thumbnail of this moment
  c.save();c.translate(540,960);c.fillStyle='rgba(8,20,32,0.9)';rr(c,-420,-260,840,520,30);c.fill();c.strokeStyle=sel?LOAD_C:SAVE_C;c.lineWidth=7;c.stroke();
  c.save();c.beginPath();rr(c,-390,-230,420,460,18);c.clip();c.translate(-390,-230);c.scale(0.39,0.24);bedroom2(c,t,{mood:'morning',clock:'7:00'});HERO({c,x:540,y:1700,s:2.7,f:1,t,view:'front',eyes:'happy',mouth:'smile'});c.restore();
  c.strokeStyle='#0a0f16';c.lineWidth=5;rr(c,-390,-230,420,460,18);c.stroke();
  c.font='900 54px "Inter Display",Arial';c.fillStyle='#fff';c.textAlign='left';c.fillText('SLOT 1',70,-150);c.font='700 36px "Inter Display",Arial';c.fillStyle='rgba(255,255,255,0.7)';c.fillText('MON · 7:02 AM',70,-90);c.fillText('BEDROOM',70,-40);
  floppy(c,130,110,0.9,sel?LOAD_C:SAVE_C);loadIco(c,300,110,1.0,t,sel?LOAD_C:'rgba(255,255,255,0.3)');c.restore();
  if(sel){glowTxt(c,'▶ LOAD',540,1400,70,LOAD_C,{ls:10});}else{glowTxt(c,'▶ SAVE',540,1400,70,SAVE_C,{ls:10});}vignette(c,0.4);};
// 5 · the rules: one slot · ∞ reloads · only you remember
SH.rules=function(c,t){c.fillStyle='#0a1018';c.fillRect(0,0,W,H);L2={dx:-1,rim:'#9fd8ff',amb:'#2a3048'};
  const card=(i,t0,draw)=>{const a=eo(clamp((t-t0)/0.35));if(a<=0)return;c.save();c.globalAlpha=a;c.translate(540,560+i*400+(1-a)*60);c.fillStyle='rgba(8,20,32,0.92)';rr(c,-440,-160,880,320,34);c.fill();c.strokeStyle=SAVE_C;c.lineWidth=5;c.stroke();draw();c.restore();};
  card(0,A(11),()=>{floppy(c,-280,0,1.3);glowTxt(c,'1',-80,0,150,SAVE_C);c.font='900 64px "Inter Display",Arial';c.fillStyle='#fff';c.textAlign='left';c.textBaseline='middle';c.fillText('SLOT',20,0);});
  card(1,A(12),()=>{loadIco(c,-280,0,1.6,t);glowTxt(c,'∞',20,-6,190,LOAD_C);});
  card(2,A(13),()=>{c.translate(0,90);c.fillStyle='rgba(8,20,32,0.96)';rr(c,-440,-250,880,500,34);c.fill();c.strokeStyle=SAVE_C;c.lineWidth=5;c.stroke();c.save();c.beginPath();rr(c,-440,-250,880,500,34);c.clip();
    const xs=[-330,-180,190,340];xs.forEach((x,i)=>{fig2(c,{x,y:330,s:1.2,f:x<0?1:-1,t,kind:['x1','x2','x3','x4'][i],view:'front',eyes:'half',brow:'flat',mouth:'flat'});glowTxt(c,'?',x,-170,60,'#9aa4b4');});
    c.save();c.globalCompositeOperation='lighter';const g0=c.createRadialGradient(5,20,0,5,20,230);g0.addColorStop(0,'rgba(79,214,255,0.35)');g0.addColorStop(1,'rgba(79,214,255,0)');c.fillStyle=g0;c.fillRect(-240,-250,490,500);c.restore();
    HERO({c,x:5,y:345,s:1.3,f:1,t,view:'front',eyes:'open',brow:'up',mouth:'smirk'});c.save();c.translate(5,-205);c.scale(0.5,0.5);floppy(c,0,0,1,SAVE_C);c.restore();c.restore();
    });
  vignette(c,0.35);};
// 6 · naturally, you test it: drops a mug, reloads
SH.test=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#6a6a70'};kitchen(c,0,0,W,H);const drop=WT(14,2),tl=WT(14,3)+0.15;const back=t>tl+0.35;
  const z=lerp(1.0,1.08,inv(A(14),B(14),t));c.save();c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);
  HERO({c,x:540,y:2300,s:3.9,f:1,t,view:'front',eyes:(t>drop&&!back)?'wide':'sly',brow:'up',mouth:(t>drop&&!back)?'o':'smirk',hf:[44,24],hb:[-40,60]});
  if(t<drop||back){const h={x:540+44*3.9+70,y:2300-318*3.9+250};}
  // the mug: in hand → falls → smashes → back in hand
  const hx=540+150,hy=1250;if(t<drop||back){c.save();c.translate(hx,hy);c.fillStyle='#e8dcd0';c.strokeStyle=K2;c.lineWidth=7;rr(c,-40,-50,80,96,10);c.fill();c.stroke();c.beginPath();c.arc(48,-2,24,-1.2,1.2);c.stroke();c.restore();}
  else{const p=clamp((t-drop)/0.35);const y=lerp(hy,1780,p*p);if(p<1){c.save();c.translate(hx,y);c.rotate(p*2);c.fillStyle='#e8dcd0';c.strokeStyle=K2;c.lineWidth=7;rr(c,-40,-50,80,96,10);c.fill();c.stroke();c.restore();}
    else for(let i=0;i<7;i++){c.save();c.translate(hx+(hash(i)-.5)*260,1790+hash(i*3)*40);c.rotate(hash(i)*3);c.fillStyle='#e8dcd0';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(0,-18);c.lineTo(22,8);c.lineTo(-14,14);c.closePath();c.fill();c.stroke();c.restore();}}
  c.restore();saveToast(c,A(14)-0.2,t,'GAME SAVED',560,{dur:0.9});loadFx(c,tl,t,0.7);vignette(c,0.4);};
// 7 · buys a lottery ticket — saved
SH.lotto=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#6a6050'};shop(c,t);
  fig2(c,{x:760,y:1720,s:2.6,f:-1,t,kind:'clerk',view:'front',eyes:'open',mouth:'flat',hf:[-50,40]});
  c.fillStyle='#6a4a2c';c.fillRect(0,1380,W,H-1380);c.fillStyle='#8a6a42';c.fillRect(0,1360,W,40);c.strokeStyle=K2;c.lineWidth=7;c.strokeRect(-6,1360,W+12,40);
  HERO({c,x:300,y:2500,s:3.6,f:1,t,view:'front',eyes:'sly',brow:'up',mouth:'smirk',hf:[50,-20],propF:(c2,h,s)=>ticket(c2,h.x+6*s,h.y-22*s,s*0.24,0.15)});
  saveToast(c,WT(15,1),t,'GAME SAVED',520,{dur:1.3});vignette(c,0.4);};
// 8 · the winning numbers on TV
SH.numbers=function(c,t){L2={dx:-1,rim:'#9fd8ff',amb:'#2a3048'};livingRoom(c,t);c.fillStyle='rgba(10,12,30,0.35)';c.fillRect(0,0,W,H);
  tvSet(c,540,700,820,520,(c2,x,y,w,h)=>{const g2=c2.createLinearGradient(0,y,0,y+h);g2.addColorStop(0,'#1a2a6a');g2.addColorStop(1,'#0a1430');c2.fillStyle=g2;c2.fillRect(x,y,w,h);
    c2.font='900 48px "Inter Display",Arial';c2.fillStyle='#ffd23a';c2.textAlign='center';c2.fillText('WINNING NUMBERS',540,y+80);
    ['07','14','23','31','42'].forEach((n,i)=>{const a=clamp((t-A(16)-i*0.15)/0.2);if(a>0)lottoBall(c2,x+100+i*155,y+300,60*eo(a),n,['#e8344a','#3a8ad8','#f2c230','#3ab070','#8a5ad0'][i]);});});
  HERO({c,x:540,y:2650,s:3.4,f:1,t,back:1});
  // he holds his ticket up to compare
  ticket(c,330,1450,0.62,-0.2);vignette(c,0.45);};
// 9 · reload → buys the right numbers → millionaire
SH.million=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#6a6050'};const tl=A(17)-0.05,win=WT(17,3)-0.1;
  if(t<win){shop(c,t);HERO({c,x:420,y:2400,s:3.6,f:1,t,view:'front',eyes:'sly',brow:'up',mouth:'smirk',hf:[50,-20],propF:(c2,h,s)=>ticket(c2,h.x+6*s,h.y-22*s,s*0.24,0.15)});loadFx(c,tl,t,0.6);vignette(c,0.4);return;}
  const g2=c.createRadialGradient(540,900,0,540,900,1300);g2.addColorStop(0,'#3a7a3a');g2.addColorStop(1,'#0e2a14');c.fillStyle=g2;c.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const x=(hash(i)*W+Math.sin(t*2+i)*40),y=((hash(i*3)*H+(t-win)*500*(0.6+hash(i)))%H);c.save();c.translate(x,y);c.rotate(Math.sin(t*3+i)*0.8);c.fillStyle='#7ac87a';c.strokeStyle='#1a3a1a';c.lineWidth=4;rr(c,-46,-22,92,44,4);c.fill();c.stroke();c.fillStyle='#2a6a2a';c.font='900 26px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('$',0,1);c.restore();}
  const k=eo(clamp((t-win)/0.3));const r=HERO({c,x:540,y:2350,s:3.8,f:1,t,view:'front',eyes:'happy',brow:'up',mouth:'teeth',hf:[70,-70],hb:[-70,-70]});
  // giant presentation cheque held up with both hands at its bottom corners
  const hy=r&&r.hf?Math.min(r.hf.y,r.hb.y):1000;c.save();c.translate(540,hy-110-(1-k)*120);c.fillStyle='#fffdf0';c.strokeStyle=K2;c.lineWidth=8;rr(c,-420,-130,840,260,16);c.fill();c.stroke();c.fillStyle='#2a6a3a';c.fillRect(-420,-130,840,50);
  c.font='900 40px Arial';c.fillStyle='#fff';c.textAlign='left';c.fillText('LOTTO',-400,-92);c.font='900 110px "Inter Display",Arial';c.fillStyle='#1a3a1a';c.textAlign='center';c.textBaseline='middle';c.fillText('$1,000,000',0,30);c.restore();if(r&&r.hf){fist2(c,r.hf,3.8,'#ecebe6');fist2(c,r.hb,3.8,'#ecebe6');}
  vignette(c,0.4);};
// 10 · ambitious: suits up, walks into the office
SH.ambit=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};office(c,t,{wx:520});const q=inv(A(18),B(18),t);
  HERO({c,x:lerp(200,520,q),y:1950,s:3.2,f:1,t,walk:q<1?1:0,ph:t*4.5,eyes:'sly',brow:'up',mouth:'smirk',castLen:0.5});vignette(c,0.4);};
// 11 · asks the boss (two-shot over the desk) — saved — rejected
SH.boss=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};const rej=t>A(21);const z=lerp(1,1.06,inv(A(19),B(21),t));c.save();c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);
  dof(c,2.5,d=>{office(d,t,{wx:280});});
  fig2(c,{x:760,y:2050,s:3.2,f:-1,t,kind:'boss',view:'front',eyes:rej?'half':'open',brow:rej?'angry':'flat',mouth:rej?'frown':'flat',hf:rej?[-40,40]:[-20,60]});
  deskFront(c,540,1560,1000);
  HERO({c,x:290,y:2250,s:3.4,f:1,t,eyes:rej?'wide':'open',brow:'up',mouth:rej?'o':'smile',hf:[50,30]});
  c.restore();if(rej){bigX(c,780,620,80,clamp((t-A(21))/0.3));}
  saveToast(c,WT(19,1),t,'GAME SAVED',520,{dur:1.2});vignette(c,0.4);};
// 12 · reload · try again · and again — attempt counter climbs
SH.loop=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};const n=t<A(23)?2:t<A(24)?3:4;const t0=n===2?A(22):n===3?A(23):A(24);
  dof(c,2.5,d=>{office(d,t,{wx:280});});
  fig2(c,{x:760,y:2050,s:3.2,f:-1,t,kind:'boss',view:'front',eyes:'half',brow:'angry',mouth:'frown',hf:[-40,40]});deskFront(c,540,1560,1000);
  HERO({c,x:290,y:2250,s:3.4,f:1,t,eyes:n===4?'half':'open',brow:n===4?'flat':'up',mouth:n===2?'smile':(n===3?'flat':'smirk'),hf:[n*20,30-n*10]});
  attemptChip(c,n,540,560,1.1);if(t-t0<0.25)bigX(c,780,800,70,1-(t-t0)/0.25);loadFx(c,t0-0.15,t,0.45);vignette(c,0.4);};
// 13 · eventually you learn exactly what to say → promoted
SH.learn=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};const yes=t>A(26);dof(c,2.5,d=>{office(d,t,{wx:280});});
  fig2(c,{x:760,y:2050,s:3.2,f:-1,t,kind:'boss',view:'front',eyes:yes?'happy':'open',brow:'up',mouth:yes?'teeth':'o',hf:yes?[-90,-20]:[-40,40]});deskFront(c,540,1560,1000);
  HERO({c,x:290,y:2250,s:3.4,f:1,t,eyes:'sly',brow:'up',mouth:'smirk',hf:yes?[90,-10]:[50,30]});
  attemptChip(c,37,540,560,1.1,'#3ad06a');if(yes){bigCheck(c,780,800,70,clamp((t-A(26))/0.3));c.save();c.globalAlpha=clamp((t-A(26)-0.2)/0.3);glowTxt(c,'PROMOTED',540,1400,84,'#3ad06a',{ls:10});c.restore();}vignette(c,0.4);};
// 14 · money · success · relationships — three quick beats
SH.life=function(c,t){L2={dx:-1,rim:'#fff0c8',amb:'#5a5a66'};const k=t<WT(27,1)?0:t<WT(27,2)?1:2;
  if(k===0){const g2=c.createRadialGradient(540,900,0,540,900,1300);g2.addColorStop(0,'#3a6a3a');g2.addColorStop(1,'#0e2014');c.fillStyle=g2;c.fillRect(0,0,W,H);
    for(let i=0;i<9;i++){const x=200+(i%3)*340,y=1200-Math.floor(i/3)*120;c.fillStyle='#7ac87a';c.strokeStyle='#1a3a1a';c.lineWidth=5;for(let j=0;j<4;j++){rr(c,x-110,y-j*18,220,90,6);c.fill();c.stroke();}}
    HERO({c,x:540,y:2500,s:4.2,f:1,t,view:'front',eyes:'sly',brow:'up',mouth:'smirk'});}
  else if(k===1){office(c,t,{wx:520});c.fillStyle='rgba(10,10,20,0.25)';c.fillRect(0,0,W,H);
    // corner office nameplate + skyline
    c.fillStyle='#2a2a34';rr(c,240,1250,600,120,12);c.fill();c.strokeStyle='#d8b060';c.lineWidth=6;c.stroke();c.font='900 52px "Inter Display",Arial';c.fillStyle='#e8c870';c.textAlign='center';c.textBaseline='middle';c.fillText('C · E · O',540,1312);
    HERO({c,x:540,y:2300,s:3.6,f:1,t,view:'front',eyes:'half',brow:'flat',mouth:'smirk',hf:[30,40],hb:[-30,40]});}
  else{cityStreet(c,t,scam(0,1.4,1300),{mood:'dusk',cw:9000});
    [[-330,'x2'],[330,'x3'],[-170,'friend'],[170,'x1']].forEach(([dx,kd],i)=>fig2(c,{x:540+dx,y:2150+(i<2?-60:0),s:3.0,f:dx>0?-1:1,t,kind:kd,view:'front',eyes:'happy',mouth:'teeth',hf:i%2?[-60,-80]:[60,-80]}));
    HERO({c,x:540,y:2350,s:3.4,f:1,t,view:'front',eyes:'happy',brow:'up',mouth:'teeth',hf:[80,-90],hb:[-80,-90]});}
  vignette(c,0.4);};
// 15 · meets the perfect girl
SH.girl=function(c,t){L2={dx:-1,rim:'#ffe0b0',amb:'#5a5060'};const q=inv(A(28),B(28),t);dof(c,3,d=>{cityStreet(d,t,scam(-300+q*60,1.8,1700),{mood:'dusk',cw:9000});});
  c.save();const z=lerp(1.0,1.12,eio(q));c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);
  fig2(c,{x:620,y:2350,s:3.6,f:-1,t,kind:'girl',view:'front',eyes:'happy',brow:'up',mouth:'smile',tilt:0.06});c.restore();
  dof(c,4,d=>{HERO({c:d,x:130,y:2900,s:5.4,f:1,t,back:1});});vignette(c,0.45);};
// 16 · the date: you know every joke, every story… and when to kiss her
SH.date=function(c,t){L2={dx:0,rim:'#ffc890',amb:'#4a2a34'};restaurant(c,t);const laugh=t<A(30)||(t>A(30)&&t<A(31));const k=t>WT(31,3);
  fig2(c,{x:290,y:2250,s:3.3,f:1,t,kind:'hero',view:'front',eyes:k?'closed':'sly',brow:'up',mouth:k?'smile':'smirk',hf:[60,40],lean:k?0.12:0});
  fig2(c,{x:790,y:2250,s:3.2,f:-1,t,kind:'girl',view:'front',eyes:k?'closed':(laugh?'happy':'open'),brow:'up',mouth:k?'smile':(laugh?'teeth':'smile'),hf:laugh&&!k?[-30,-60]:[-50,40],lean:k?0.12:0});
  dateTable(c,540,1560,760,t);
  const tick=(i,t0,lab)=>{const a=clamp((t-t0)/0.25);if(a<=0)return;c.save();c.globalAlpha=a;c.translate(80,430+i*120);bigCheck(c,0,0,28,1);c.font='800 44px "Inter Display",Arial';c.fillStyle='#fff';c.textAlign='left';c.textBaseline='middle';c.fillText(lab,50,2);c.restore();};
  tick(0,WT(29,2),'JOKES');tick(1,WT(30,1),'STORIES');tick(2,WT(31,1),'THE KISS');
  if(k){for(let i=0;i<5;i++){const p=((t-WT(31,3))*0.6+i*0.2)%1;heart(c,540+Math.sin(i*2+t)*80,1100-p*500,0.6+hash(i)*0.4,`rgba(255,74,106,${1-p})`);}}vignette(c,0.45);};
// 17 · for her: love at first sight
SH.her=function(c,t){L2={dx:0,rim:'#ffc890',amb:'#4a2a34'};const q=inv(A(32),B(33),t);restaurant(c,t);c.fillStyle='rgba(255,120,150,0.12)';c.fillRect(0,0,W,H);
  c.save();const z=lerp(1.0,1.1,eio(q));c.translate(540,1100);c.scale(z,z);c.translate(-540,-1100);fig2(c,{x:540,y:2600,s:4.6,f:1,t,kind:'girl',view:'front',eyes:'happy',brow:'up',mouth:'smile',tilt:0.05});c.restore();
  for(let i=0;i<7;i++){const p=((t-A(32))*0.4+i/7)%1;heart(c,140+i*130,1700-p*1300,0.5+hash(i)*0.35,`rgba(255,74,106,${0.85*(1-p)})`);}
  if(t>WT(33,3)){c.save();c.globalAlpha=clamp((t-WT(33,3))/0.3);c.translate(540,420);c.fillStyle='rgba(20,8,14,0.7)';rr(c,-210,-60,420,120,60);c.fill();c.strokeStyle='#ff4a6a';c.lineWidth=5;c.stroke();glowTxt(c,'1ST TRY',0,0,58,'#ff4a6a',{ls:6});c.restore();}vignette(c,0.45);};
// 18 · for you: attempt #100
SH.you=function(c,t){L2={dx:0,rim:'#9fd8ff',amb:'#2a2a38'};const q=inv(A(34),B(35),t);c.fillStyle='#14161e';c.fillRect(0,0,W,H);
  dof(c,4,d=>{restaurant(d,t);});c.fillStyle='rgba(10,12,30,0.55)';c.fillRect(0,0,W,H);
  c.save();const z=lerp(1.0,1.12,eio(q));c.translate(540,1100);c.scale(z,z);c.translate(-540,-1100);HERO({c,x:540,y:2600,s:4.6,f:1,t,view:'front',eyes:'half',brow:'worried',mouth:'flat',sweat:1});c.restore();
  // ghost counter ticking up to 100
  const n=Math.min(100,Math.floor(lerp(1,100,eo(clamp((t-A(35))/0.8)))));attemptChip(c,n,540,520,1.3,LOAD_C);vignette(c,0.6);};
// 19 · but then, one night…
SH.night=function(c,t){L2={dx:-1,rim:'#9fb8ff',amb:'#1e2234'};const q=inv(A(36),B(38),t);cityStreet(c,t,scam(lerp(-200,200,q),1.2,1150),{mood:'night',cw:9000});
  c.fillStyle=`rgba(10,10,30,${0.2+0.2*q})`;c.fillRect(0,0,W,H);vignette(c,0.6);};
// 20 · you and your best friend get into a car
SH.car=function(c,t){L2={dx:-1,rim:'#9fb8ff',amb:'#2a2e44'};const q=inv(A(39),B(40)+0.3,t);
  cityStreet(c,t,scam(0,1.3,1200),{mood:'night',cw:9000,world:c2=>{
    carSide(c2,60,GY+300,560,{people:q>0.6});
    if(q<0.6){FR({c:c2,x:lerp(-520,-150,eio(q/0.6)),y:GY+330,s:1.25,f:1,t,walk:1,ph:t*4.5,eyes:'happy',mouth:'teeth'});HERO({c:c2,x:lerp(-700,-330,eio(q/0.6)),y:GY+330,s:1.25,f:1,t,walk:1,ph:t*4.5+1,eyes:'happy',mouth:'smile'});}}});
  vignette(c,0.5);};
// 21 · driving, laughing — then headlights from the right (driver's view)
SH.drive=function(c,t){L2={dx:0,rim:'#ffd090',amb:'#2a2e44'};if(t<A(41)){cabin(c,t,{fr:{eyes:'happy',mouth:'teeth',hf:[40,30]},hero:{eyes:'happy',mouth:'smile',hf:[-40,20],hb:[40,20]}});vignette(c,0.5);return;}
  const q=inv(A(41),B(41),t);povRoad(c,t,{truck:q*0.45});vignette(c,0.5);};
// 22 · two seconds to react — extreme close-up, headlights on his face
SH.two=function(c,t){L2={dx:1,rim:'#fff6d8',amb:'#2a2e44'};c.fillStyle='#0c0e18';c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(W,700,0,W,700,1400);gg.addColorStop(0,`rgba(255,250,220,${0.4+0.3*inv(A(42),B(42),t)})`);gg.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();
  const z=lerp(1,1.15,eio(inv(A(42),B(42),t)));c.save();c.translate(540,1100);c.scale(z,z);c.translate(-540,-1100);HERO({c,x:540,y:2900,s:6.2,f:1,t,view:'front',eyes:'wide',brow:'up',mouth:'o',sweat:1});c.restore();
  const s=Math.max(0,2-(t-A(42))*0.9);glowTxt(c,s.toFixed(2)+'s',540,470,110,'#ff3b30');vignette(c,0.6);};
// 23 · you save — freeze frame
SH.saveIt=function(c,t){povRoad(c,A(43),{truck:0.55,speed:0});c.fillStyle='rgba(20,40,60,0.45)';c.fillRect(0,0,W,H);
  const a=eo(clamp((t-A(43))/0.25));c.save();c.globalAlpha=a;floppy(c,540,900,2.2*a+0.2);c.restore();saveToast(c,A(43),t,'GAME SAVED',1300,{dur:2});
  c.fillStyle='rgba(255,255,255,0.06)';for(let y=0;y<H;y+=8)c.fillRect(0,y,W,2);vignette(c,0.5);};
// 24 · the crash (exterior, head-on)
function crashScene(c,t,t0,o={}){const q=clamp((t-t0)/0.7);cityStreet(c,t,scam(0,1.3,800),{mood:'night',cw:9000,world:c2=>{
    const hit=q>=1;const cx=hit?-250:lerp(-900,-250,q);const tx=hit?370:lerp(1300,370,q);
    c2.save();if(o.swerve){c2.translate(cx,GY+300);c2.rotate(-0.12*clamp(q*2));c2.translate(-cx,-(GY+300));}carSide(c2,cx+(o.brake&&hit?-30:0),GY+300-(o.swerve?50*clamp(q*2):0),480,{people:1});c2.restore();
    truckSide(c2,tx,GY+330,770);if(hit){c2.save();c2.globalCompositeOperation='lighter';const gg=c2.createRadialGradient(-10,GY+150,0,-10,GY+150,260);gg.addColorStop(0,'rgba(255,220,160,0.6)');gg.addColorStop(1,'rgba(255,220,160,0)');c2.fillStyle=gg;c2.fillRect(-300,GY-150,600,600);c2.restore();}
    if(o.brake&&!hit){c2.fillStyle='rgba(220,220,230,0.35)';for(let i=0;i<6;i++){c2.beginPath();c2.arc(cx-240-i*40,GY+290-hash(i)*40,40+i*10,0,TAU);c2.fill();}}
    if(hit){const p=clamp((t-t0-0.7)/0.5);for(let i=0;i<16;i++){const a=hash(i)*TAU;c2.fillStyle='rgba(200,230,255,0.85)';c2.save();c2.translate(-10+Math.cos(a)*p*420,GY+120+Math.sin(a)*p*260);c2.rotate(a);c2.fillRect(-10,-4,20,8);c2.restore();}}}});
  if(q>=1&&t-t0<0.95){c.fillStyle=`rgba(255,255,255,${1-(t-t0-0.7)/0.25})`;c.fillRect(0,0,W,H);}vignette(c,0.5);}
SH.crash=function(c,t){crashScene(c,t,A(44)-0.45);};
// 25 · your best friend dies — aftermath, hazard lights, you on your knees
SH.dies=function(c,t){L2={dx:-1,rim:'#ff6a6a',amb:'#2a1e2a'};const bl=Math.floor(t*3)%2;cityStreet(c,t*0.2,scam(60,1.3,800),{mood:'night',cw:9000,world:c2=>{
    truckSide(c2,600,GY+330,770);carSide(c2,-30,GY+300,480,{rot:0.03});c2.fillStyle='rgba(60,60,70,0.5)';for(let i=0;i<5;i++){c2.beginPath();c2.arc(210+i*30,GY+120-i*90-((t*60)%90),60+i*14,0,TAU);c2.fill();}
    HERO({c:c2,x:-170,y:GY+430,s:1.3,f:1,t,view:'front',crouch:95,eyes:'closed',brow:'worried',mouth:'frown',tear:1,hf:[12,-55],hb:[-12,-55]});}});
  c.save();c.globalCompositeOperation='lighter';c.fillStyle=bl?'rgba(255,40,40,0.18)':'rgba(40,80,255,0.16)';c.fillRect(0,0,W,H);c.restore();vignette(c,0.6);};
// 26 · reload → back in the car
SH.reload1=function(c,t){cabin(c,t,{fr:{eyes:'happy',mouth:'teeth'},hero:{eyes:'wide',brow:'up',mouth:'flat',hf:[-40,20],hb:[40,20]}});saveToast(c,A(46),t,'LOADING…',1450,{icon:'load',col:LOAD_C,dur:1.1});loadFx(c,A(46),t,0.8);vignette(c,0.5);};
// 27 · turn the wheel → truck still hits
SH.wheel=function(c,t){if(t<A(49)-0.3){cabin(c,t,{wheel:-0.5*eio(inv(A(48),B(48),t)),fr:{eyes:'wide',brow:'up',mouth:'o'},hero:{eyes:'wide',brow:'angry',mouth:'scream',hf:[-50,20],hb:[50,20],lean:-0.1},glare:0.25});vignette(c,0.5);return;}
  crashScene(c,t,A(49)-0.3,{swerve:1});};
// 28 · reload · slam the brakes · another collision · reload
SH.brakes=function(c,t){if(t<A(51)){cabin(c,t,{fr:{eyes:'wide',mouth:'o'},hero:{eyes:'wide',brow:'angry',mouth:'scream'}});loadFx(c,A(50),t,0.6);vignette(c,0.5);return;}
  crashScene(c,t,A(51)+0.2,{brake:1});if(t>A(53))loadFx(c,A(53),t,0.6);};
// 29 · every possible move: grid of timelines, each ending in ✕
SH.grid=function(c,t){c.fillStyle='#0a0c14';c.fillRect(0,0,W,H);const tw=330,th=330;const n=Math.min(12,Math.floor((t-A(54))/0.4)+1);
  const labs=['LEFT','RIGHT','BRAKE','FASTER','SLOWER','REVERSE','HORN','OTHER ROAD','STAY HOME','LATER','EARLIER','WALK'];
  for(let i=0;i<12;i++){const x=40+(i%3)*(tw+20)+tw/2,y=360+Math.floor(i/3)*(th+20)+th/2;c.save();c.translate(x,y);c.beginPath();rr(c,-tw/2,-th/2,tw,th,18);c.clip();
    c.fillStyle='#1a2038';c.fillRect(-tw/2,-th/2,tw,th);c.fillStyle='#2a2c34';c.fillRect(-tw/2,40,tw,200);c.fillStyle='rgba(255,240,200,0.7)';c.fillRect(-tw/2,110,tw,6);
    const q=clamp((t-A(54)-i*0.4)/1.2);carSide(c,lerp(-200,-60,q),100,150);truckSide(c,lerp(300,110,q),104,240);
    c.restore();c.save();c.translate(x,y);c.strokeStyle=i<n?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.08)';c.lineWidth=4;rr(c,-tw/2,-th/2,tw,th,18);c.stroke();
    c.font='800 26px "Inter Display",Arial';c.fillStyle='rgba(255,255,255,0.75)';c.textAlign='center';c.fillText(labs[i],0,-th/2+44);
    if(q>=1)bigX(c,0,10,60,clamp((t-A(54)-i*0.4-1.2)/0.2));c.restore();}
  if(t>A(57)){c.save();c.globalAlpha=0.35*clamp((t-A(57))/0.3);c.fillStyle='#ff3b30';c.fillRect(0,0,W,H);c.restore();}
  attemptChip(c,Math.floor(lerp(4,240,clamp((t-A(54))/(B(57)-A(54))))),540,180,1.0);vignette(c,0.4);};
// 30 · hundreds of lifetimes: worn out, counter in the thousands
SH.lifetimes=function(c,t){L2={dx:0,rim:'#ffb84a',amb:'#2a2438'};const q=inv(A(58),B(59),t);c.fillStyle='#100e18';c.fillRect(0,0,W,H);
  for(let i=0;i<16;i++){const a=i/16*TAU+t*0.2,r=520+Math.sin(t+i)*30;c.save();c.globalAlpha=0.25;c.translate(540+Math.cos(a)*r,1000+Math.sin(a)*r*0.9);c.rotate(a);loadIco(c,0,0,0.6,t);c.restore();}
  c.save();const z=lerp(1.0,1.15,eio(q));c.translate(540,1150);c.scale(z,z);c.translate(-540,-1150);HERO({c,x:540,y:2600,s:4.4,f:1,t,view:'front',eyes:t>A(59)?'open':'half',brow:'worried',mouth:'flat',sweat:1});c.restore();
  attemptChip(c,Math.floor(lerp(240,4812,eio(clamp((t-A(58))/2.2)))),540,470,1.25,LOAD_C);vignette(c,0.6);};
// 31 · no version where everyone makes it — timeline branches, all ✕
SH.noway=function(c,t){c.fillStyle='#0a0c14';c.fillRect(0,0,W,H);branches(c,t,A(60)-0.2,{n:7});vignette(c,0.4);};
// 32 · you could leave him behind and save yourself
SH.leave=function(c,t){c.fillStyle='#0a0c14';c.fillRect(0,0,W,H);L2={dx:-1,rim:'#9fd8ff',amb:'#2a3048'};
  const a=clamp((t-A(62))/0.4);c.save();c.globalAlpha=a;
  c.save();c.beginPath();rr(c,80,520,430,800,30);c.clip();c.fillStyle='#1a2038';c.fillRect(80,520,430,800);HERO({c,x:295,y:1300,s:1.6,f:1,t,view:'front',eyes:'open',brow:'worried',mouth:'flat'});c.restore();
  c.save();c.beginPath();rr(c,570,520,430,800,30);c.clip();c.fillStyle='#1a2038';c.fillRect(570,520,430,800);FR({c,x:785,y:1300,s:1.6,f:-1,t,view:'front',eyes:'happy',mouth:'smile'});c.fillStyle='rgba(10,10,20,0.45)';c.fillRect(570,520,430,800);c.restore();
  c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=5;rr(c,80,520,430,800,30);c.stroke();rr(c,570,520,430,800,30);c.stroke();
  bigCheck(c,295,1440,56,clamp((t-WT(62,4))/0.3));bigX(c,785,1440,52,clamp((t-WT(62,2))/0.3));c.restore();vignette(c,0.4);};
// 33 · you can't — shakes head, tears, looks at him in the car
SH.cant=function(c,t){cabin(c,t,{speed:0.3,fr:{eyes:'happy',mouth:'teeth'},hero:{eyes:'closed',brow:'worried',mouth:'frown',tear:1,tilt:Math.sin(t*5)*0.08}});vignette(c,0.55);};
// 34 · reload one last time
SH.last=function(c,t){c.fillStyle='#0a1018';c.fillRect(0,0,W,H);const a=eo(clamp((t-A(64))/0.4));c.save();c.translate(540,880);c.scale(0.6+0.4*a,0.6+0.4*a);c.globalAlpha=a;loadIco(c,0,0,3.2,t);c.restore();
  glowTxt(c,'LOAD',540,1330,90,LOAD_C,{ls:14});c.save();c.globalAlpha=0.7;c.font='800 40px "Inter Display",Arial';c.fillStyle='#fff';c.textAlign='center';c.fillText('LAST TIME',540,1430);c.restore();loadFx(c,WT(64,4),t,0.6);vignette(c,0.45);};
// 35 · this time you don't change anything: hands off, calm
SH.calm=function(c,t){cabin(c,t,{speed:0.6,fr:{eyes:'happy',mouth:'teeth',hf:[40,30]},hero:{eyes:'half',brow:'flat',mouth:'flat',hf:[-30,60],hb:[30,60]},glare:0.15*inv(A(65),B(65),t)});vignette(c,0.5);};
// 36 · you look at your best friend and say it
SH.say=function(c,t){L2={dx:1,rim:'#ffe6b0',amb:'#2a2e44'};const q=inv(A(66),B(67),t);c.fillStyle='#14182a';c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(W,800,0,W,800,1500);gg.addColorStop(0,`rgba(255,240,200,${0.15+q*0.25})`);gg.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();
  const z=lerp(1.0,1.08,eio(q));c.save();c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);
  FR({c,x:330,y:2350,s:4.2,f:1,t,view:'front',eyes:t>A(67)+0.6?'happy':'open',brow:'up',mouth:t>A(67)+0.6?'smile':'flat',look:[1,0]});
  HERO({c,x:790,y:2350,s:4.2,f:-1,t,view:'front',eyes:'half',brow:'worried',mouth:t>A(67)?(Math.floor(t*7)%2?'o':'flat'):'smile',tear:1,look:[-1,0]});c.restore();vignette(c,0.55);};
// 37 · first time since… the light grows
SH.first=function(c,t){const q=inv(A(68),B(69),t);cabin(c,t,{speed:0.5,fr:{eyes:'happy',mouth:'smile'},hero:{eyes:'happy',brow:'flat',mouth:'smile',tear:1,hf:[-30,60],hb:[30,60]},glare:0.2+q*0.8});vignette(c,0.5);};
// 38 · you let the moment happen — white, then the save icon shatters, fade to black
function shards(n,seed){const P=[];for(let i=0;i<n;i++){const a0=i/n*TAU+(hash(i+seed)-.5)*0.4,a1=(i+1)/n*TAU+(hash(i+1+seed)-.5)*0.4;const r1=0.18+hash(i*7+seed)*0.12;
  P.push([[Math.cos(a0)*r1,Math.sin(a0)*r1],[Math.cos(a0)*1.6,Math.sin(a0)*1.6],[Math.cos(a1)*1.6,Math.sin(a1)*1.6],[Math.cos(a1)*r1,Math.sin(a1)*r1]]);}
  P.push(Array.from({length:n},(_,i)=>{const a=i/n*TAU+(hash(i+seed)-.5)*0.4,r1=0.18+hash(i*7+seed)*0.12;return [Math.cos(a)*r1,Math.sin(a)*r1];}));return P;}
const SHD=shards(11,3);
SH.end=function(c,t){const t0=A(70),tc=WT(70,3)-0.15,tb=tc+0.45;const q=inv(t0,END,t);
  // background: the headlight white settles into a dark blue void
  const bgk=clamp((t-t0)/0.9);const g=c.createRadialGradient(540,900,0,540,900,1300);g.addColorStop(0,`rgb(${lerp(255,40,bgk)|0},${lerp(255,56,bgk)|0},${lerp(255,96,bgk)|0})`);g.addColorStop(1,`rgb(${lerp(240,8,bgk)|0},${lerp(244,10,bgk)|0},${lerp(250,20,bgk)|0})`);c.fillStyle=g;c.fillRect(0,0,W,H);
  dustMotes(c,t,30,'160,220,255',0.35*bgk);
  // the 3D disk, slowly turning
  const yawF=clamp((t-t0)/1.6)*8;const fi=Math.min(8,Math.floor(yawF));const nm='floppy_'+fi,m=VMETA[nm],im=VIMG[nm];if(!im)return;
  const Wd=520*lerp(0.9,1.05,eo(clamp((t-t0)/1.2)));const k=Wd/(m.sx1-m.sx0);const cxp=540,cyp=900+Math.sin(t*2)*10;const ox=-(m.sx0+(m.sx1-m.sx0)/2)*k,oy=-((m.top+m.gy)/2)*k;
  // glow behind
  c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(cxp,cyp,0,cxp,cyp,520);gg.addColorStop(0,`rgba(79,214,255,${0.35*bgk})`);gg.addColorStop(1,'rgba(79,214,255,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);c.restore();
  if(t<tb){c.save();c.translate(cxp,cyp);c.drawImage(im,ox,oy,m.w*k,m.h*k);
    // cracks spreading from the centre
    const cr=clamp((t-tc)/0.4);if(cr>0){c.strokeStyle='rgba(255,255,255,0.95)';c.shadowColor='#9fe8ff';c.shadowBlur=18;c.lineWidth=5;c.lineCap='round';for(const P of SHD.slice(0,11)){c.beginPath();c.moveTo(P[0][0]*Wd*0.5,P[0][1]*Wd*0.5);c.lineTo(P[0][0]*Wd*0.5+(P[1][0]-P[0][0])*Wd*0.32*cr,P[0][1]*Wd*0.5+(P[1][1]-P[0][1])*Wd*0.32*cr);c.stroke();}}
    c.restore();}
  else{const p=clamp((t-tb)/1.3),e=eo(p);
    // flash at the break
    if(p<0.25){c.fillStyle=`rgba(200,240,255,${0.6*(1-p/0.25)})`;c.fillRect(0,0,W,H);}
    SHD.forEach((P,i)=>{const cen=P.reduce((a,v)=>[a[0]+v[0]/P.length,a[1]+v[1]/P.length],[0,0]);const dir=Math.atan2(cen[1],cen[0]);const dist=(i===SHD.length-1?60:380+hash(i*5)*420)*e;
      const tumble=Math.cos(p*(3+hash(i)*4)*Math.PI*0.6);// fake 3D flip
      c.save();c.translate(cxp+Math.cos(dir)*dist,cyp+Math.sin(dir)*dist+e*e*260);c.rotate((hash(i*3)-.5)*e*4);c.scale(Math.max(0.12,Math.abs(tumble))*(1+e*0.5),1+e*0.5);
      c.globalAlpha=1-clamp((p-0.55)/0.45);c.beginPath();P.forEach(([x,y],j)=>j?c.lineTo(x*Wd*0.5-cen[0]*Wd*0.5,y*Wd*0.5-cen[1]*Wd*0.5):c.moveTo(x*Wd*0.5-cen[0]*Wd*0.5,y*Wd*0.5-cen[1]*Wd*0.5));c.closePath();c.save();c.clip();
      c.drawImage(im,ox-cen[0]*Wd*0.5,oy-cen[1]*Wd*0.5,m.w*k,m.h*k);if(tumble<0){c.fillStyle='rgba(10,30,70,0.55)';c.fillRect(-Wd,-Wd,2*Wd,2*Wd);}c.restore();
      c.strokeStyle='rgba(220,245,255,0.9)';c.lineWidth=4;c.stroke();c.restore();});
    for(let i=0;i<40;i++){const a=hash(i*2.3)*TAU,d=(200+hash(i)*700)*e;c.fillStyle=`rgba(180,235,255,${0.8*(1-p)})`;c.beginPath();c.arc(cxp+Math.cos(a)*d,cyp+Math.sin(a)*d,3+hash(i*4)*5,0,TAU);c.fill();}}
  vignette(c,0.5);};
SHOTS=[[0,'hook'],[A(2),'future'],[A(4),'prison'],[A(8),'morning'],[A(9),'menu'],[A(11),'rules'],[A(14),'test'],[A(15),'lotto'],[A(16),'numbers'],[A(17)-0.1,'million'],[A(18),'ambit'],[A(19),'boss'],[A(22)-0.1,'loop'],[A(25),'learn'],[A(27),'life'],[A(28),'girl'],[A(29),'date'],[A(32),'her'],[A(34),'you'],[A(36),'night'],[A(39),'car'],[A(41)-0.4,'drive'],[A(42),'two'],[A(43),'saveIt'],[A(44)-0.45,'crash'],[A(45),'dies'],[A(46),'reload1'],[A(47),'wheel'],[A(50),'brakes'],[A(54),'grid'],[A(58),'lifetimes'],[A(60),'noway'],[A(62),'leave'],[A(63),'cant'],[A(64),'last'],[A(65),'calm'],[A(66),'say'],[A(68),'first'],[A(70),'end']];
IMPACTS=[[WT(0,4),8,0.25],[A(17)+0.4,12,0.4,'#ffffff',0.4],[A(21),10,0.3],[A(43),12,0.35,'#9fe8ff',0.4],[A(44)+0.25,30,0.7,'#ffffff',0.8],[A(49)+0.4,26,0.6,'#ffffff',0.6],[A(52)+0.3,26,0.6,'#ffffff',0.6],[A(57),14,0.4,'#ff3b30',0.3]];
