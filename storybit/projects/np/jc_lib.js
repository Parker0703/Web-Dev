'use strict';
// ===== 3D prop sprites =====
const PIMG={};window.READY=false;
Promise.all(Object.keys(PMETA).map(n=>new Promise(r=>{const im=new Image();im.onload=()=>{PIMG[n]=im;r();};im.onerror=r;im.src=PDATA[n];}))).then(()=>{window.READY=true;});
// anchor (u,v) of the sprite lands on (x,y); len = sprite width in px; rot radians; flip mirrors
const PANC={pugio_side:[0.19,0.5],pugio_3q:[0.19,0.5],gladius_side:[0.12,0.5],torch:[0.5,0.62],goblet:[0.5,0.5],scroll_open:[0.5,0.5],rolled:[0.5,0.5],sella:[0.5,1],lectus:[0.5,1],crown:[0.5,0.5],laurel:[0.5,0.5]};
function prop(c,n,x,y,len,rot=0,o={}){const m=PMETA[n],im=PIMG[n];if(!im)return;const k=len/m.w,a=o.anc||PANC[n]||[0.5,0.5];c.save();c.translate(x,y);c.rotate(rot);if(o.flip)c.scale(1,-1);if(o.alpha!=null)c.globalAlpha*=o.alpha;
  c.drawImage(im,-a[0]*m.w*k,-a[1]*m.h*k,m.w*k,m.h*k);
  if(o.blood){const B=lyr('bld',Math.ceil(m.w*k)+4,Math.ceil(m.h*k)+4),b=B.getContext('2d');b.setTransform(1,0,0,1,0,0);b.clearRect(0,0,B.width,B.height);b.drawImage(im,0,0,m.w*k,m.h*k);b.globalCompositeOperation='source-atop';
    const u0=(a[0]+0.12)*m.w*k;for(let i=0;i<9;i++){b.fillStyle=`rgba(${120+hash(i)*40|0},8,12,${0.75*o.blood})`;b.beginPath();b.ellipse(u0+hash(i*3)*m.w*k*0.7,m.h*k*(0.3+hash(i*5)*0.4),12+hash(i*7)*30,6+hash(i)*10,0,0,TAU);b.fill();}
    b.globalCompositeOperation='source-over';c.drawImage(B,-a[0]*m.w*k,-a[1]*m.h*k);}
  if(o.glint){const gx=(-a[0]+0.3+((o.glint*1.4)%1)*0.6)*m.w*k;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(gx,0,0,gx,0,40);g.addColorStop(0,'rgba(255,255,255,0.9)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(gx-40,-40,80,80);c.restore();}
  c.restore();}
// a held prop for fig2's front hand (drawn before the fist so fingers wrap the grip)
const PSZ={pugio_side:96,pugio_3q:96,gladius_side:170,torch:150,goblet:44,rolled:62,scroll_open:90};
const held=(n,rot,o={})=>(c,h,s,f)=>prop(c,n,h.x,h.y,(o.len||PSZ[n])*s,f>0?rot:Math.PI-rot,{...o,flip:f<0&&!o.noFlip});
// ===== lives HUD (three laurel hearts) =====
function heart(c,x,y,r,full,col='#e8303a'){c.save();c.translate(x,y);c.beginPath();c.moveTo(0,r*0.35);c.bezierCurveTo(-r*1.3,-r*0.5,-r*0.5,-r*1.25,0,-r*0.55);c.bezierCurveTo(r*0.5,-r*1.25,r*1.3,-r*0.5,0,r*0.35);c.lineTo(0,r*0.9);c.closePath();
  c.beginPath();c.moveTo(0,r*0.95);c.bezierCurveTo(-r*1.5,0,-r*1.05,-r*1.05,0,-r*0.45);c.bezierCurveTo(r*1.05,-r*1.05,r*1.5,0,0,r*0.95);c.closePath();
  if(full){const g=c.createLinearGradient(0,-r,0,r);g.addColorStop(0,'#ff8a80');g.addColorStop(0.5,col);g.addColorStop(1,'#8a0a14');c.fillStyle=g;c.shadowColor=col;c.shadowBlur=r*0.8;c.fill();c.shadowBlur=0;
    c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(-r*0.42,-r*0.35,r*0.22,r*0.14,-0.6,0,TAU);c.fill();}else{c.fillStyle='rgba(20,20,26,0.75)';c.fill();}
  c.strokeStyle='#0a0a0e';c.lineWidth=r*0.16;c.stroke();c.restore();}
// lives: n alive; lose = time the last heart breaks (shatter + fall)
function livesHUD(c,t,n,o={}){const x0=o.x||540,y=o.y||470,r=o.r||34,gap=r*2.7;c.save();
  c.fillStyle='rgba(8,8,12,0.6)';rr(c,x0-gap*1.5-30,y-r*1.25,gap*3+60,r*2.5,r*1.25);c.fill();c.strokeStyle='rgba(255,215,120,0.6)';c.lineWidth=3;c.stroke();
  for(let i=0;i<3;i++){const x=x0+(i-1)*gap;const alive=i<n;let full=alive;
    if(o.lose!=null&&i===n-1){const q=t-o.lose;if(q>0){full=false;const p=clamp(q/0.7);heart(c,x,y,r,false);c.save();c.globalAlpha=1-p;for(const sd of [-1,1]){c.save();c.translate(x+sd*p*40,y+p*p*120);c.rotate(sd*p*1.2);c.beginPath();c.rect(sd>0?0:-r*1.6,-r*1.6,r*1.6,r*3.2);c.clip();heart(c,0,0,r,true);c.restore();}c.restore();continue;}
      else{if(q>-0.5){const k=(q+0.5)/0.5;c.save();c.translate(x+(hash(Math.floor(t*40))-0.5)*10*k,y);heart(c,0,0,r*(1+k*0.15),true);c.restore();continue;}}}
    if(o.gain!=null&&i===n-1&&t>=o.gain){const k=back(clamp((t-o.gain)/0.4));heart(c,x,y,r*k,true);continue;}
    heart(c,x,y,r,full);}
  c.restore();}
// big "LIFE N" title card: hearts, gold lettering, sweep
function lifeCard(c,t,t0,n,o={}){const a=t-t0;c.fillStyle='#07060a';c.fillRect(0,0,W,H);const k=eo(clamp(a/0.35));
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,940,0,540,940,900);g.addColorStop(0,`rgba(${n===3?'255,190,80':n===2?'120,170,255':'255,90,70'},${0.35*k})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  dustMotes(c,t,40,'255,220,160',0.5);
  c.save();c.translate(540,880);c.scale(0.7+0.3*k,0.7+0.3*k);c.globalAlpha=k;
  c.font='900 70px "Inter Display",Arial';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='22px';c.fillStyle='rgba(255,230,180,0.75)';c.fillText('LIFE',0,-170);
  const g2=c.createLinearGradient(0,-120,0,120);g2.addColorStop(0,'#fff6d0');g2.addColorStop(0.5,'#f0b840');g2.addColorStop(1,'#8a5a10');c.font='900 320px "Inter Display",Arial';c.letterSpacing='0px';
  c.lineWidth=18;c.strokeStyle='#120c04';c.strokeText(String(n),0,30);c.fillStyle=g2;c.shadowColor='#f0b840';c.shadowBlur=40;c.fillText(String(n),0,30);c.shadowBlur=0;
  for(let i=0;i<3;i++){const used=i>=4-n;heart(c,(i-1)*120,260,40,!used);}c.restore();
  // light sweep across the numeral
  const sw=clamp((a-0.2)/0.6);if(sw>0&&sw<1){c.save();c.globalCompositeOperation='lighter';const x=lerp(200,880,sw);const g3=c.createLinearGradient(x-80,0,x+80,0);g3.addColorStop(0,'rgba(255,255,255,0)');g3.addColorStop(0.5,'rgba(255,240,200,0.35)');g3.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g3;c.fillRect(0,650,W,500);c.restore();}
  vignette(c,0.6);}
// word time lookup (robust to line splits): nth occurrence of a word (case/punct-insensitive)
const _WL=[];for(const l of L)for(const w of l.w)_WL.push({...w,k:w.x.toLowerCase().replace(/[^a-z0-9]/g,'')});
function TW(word,n=0){const k=word.toLowerCase().replace(/[^a-z0-9]/g,'');let i=0;for(const w of _WL)if(w.k===k){if(i===n)return w.t;i++;}console.error('TW miss',word,n);return 0;}
window.GR={tint:'rgba(255,160,80,0.16)',vig:0.55};

const SAVE_C='#4fd6ff',LOAD_C='#ffb84a';
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
function bigX(c,x,y,r,a=1,col='#ff3b30'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineWidth=r*0.22;c.shadowColor=col;c.shadowBlur=20;const p=Math.min(1,a);
  c.beginPath();c.moveTo(x-r,y-r);c.lineTo(x-r+2*r*Math.min(1,p*2),y-r+2*r*Math.min(1,p*2));if(p>0.5){const q=(p-0.5)*2;c.moveTo(x+r,y-r);c.lineTo(x+r-2*r*q,y-r+2*r*q);}c.stroke();c.restore();}
function bigCheck(c,x,y,r,a=1,col='#3ad06a'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineJoin='round';c.lineWidth=r*0.24;c.shadowColor=col;c.shadowBlur=20;c.beginPath();c.moveTo(x-r,y);c.lineTo(x-r*0.25,y+r*0.7);c.lineTo(x+r,y-r*0.7);c.stroke();c.restore();}
// ===== pixel-art hearts (Minecraft-style health bar) =====
const PXH=['..KK.KK..','.KRRKRRK.','KRWRRRRDK','KRRRRRRDK','KRRRRRRDK','.KRRRRDK.','..KRRDK..','...KDK...','....K....'];
const PXC={K:'#120406',R:'#e8242c',W:'#ffd8d8',D:'#9a0e16'};
heart=function(c,x,y,r,full,o={}){const px=r*2.2/9;c.save();c.translate(Math.round(x-4.5*px),Math.round(y-4.5*px));
  if(full&&o.glow!==0){c.save();c.shadowColor='rgba(255,40,40,0.7)';c.shadowBlur=r*0.7;c.fillStyle='rgba(0,0,0,0.01)';c.fillRect(px,px,7*px,6*px);c.restore();}
  for(let j=0;j<9;j++)for(let i=0;i<9;i++){const ch=PXH[j][i];if(ch==='.')continue;let col;
    if(ch==='K')col=o.flash?'#ffffff':PXC.K;else if(!full)col=(ch==='W'||ch==='R')&&j<3?'#3a2a2c':'#241a1c';else col=PXC[ch];
    c.fillStyle=col;c.fillRect(Math.floor(i*px),Math.floor(j*px),Math.ceil(px)+0.5,Math.ceil(px)+0.5);}
  c.restore();};
livesHUD=function(c,t,n,o={}){const x0=o.x||540,y0=o.y||470,r=o.r||34,gap=r*2.5;c.save();
  let sx=0,sy=0;if(o.lose!=null){const q=t-o.lose;if(q>0&&q<0.5){sx=(hash(Math.floor(t*30))-0.5)*r*0.5;sy=(hash(Math.floor(t*30)+0.3)-0.5)*r*0.4;}}
  c.fillStyle='rgba(8,8,12,0.55)';rr(c,x0-gap*1.5-24+sx,y0-r*1.2+sy,gap*3+48,r*2.4,8);c.fill();
  for(let i=0;i<3;i++){let x=x0+(i-1)*gap+sx,y=y0+sy;let full=i<n,flash=false;
    if(o.lose!=null&&i===n-1){const q=t-o.lose;if(q>=0){full=q<0.6?Math.floor(q*10)%2===0:false;flash=q<0.6&&Math.floor(q*10)%2===1;}}
    const alive=(o.lose!=null&&t>=o.lose)?n-1:n;if(alive===1&&i===0&&(o.lose==null||t>=o.lose+0.6||n===1&&o.lose==null))y+=(hash(Math.floor(t*12))>0.5?-1:1)*r*0.12;
    if(o.gain!=null&&i===n-1&&t>=o.gain){const k=clamp((t-o.gain)/0.25);heart(c,x,y,r*(0.6+0.4*k),true);continue;}
    heart(c,x,y,r,full,{flash});}
  c.restore();};
