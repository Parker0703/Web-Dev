'use strict';
// ===================== Virus in the book · cast + props (StoryBit C, 2D characters living in 3D sets) =====================
Object.assign(KIND2,{
  monk:Object.assign(mkK({coat:'#5a4030',trim:'#3a2818',skin:SK[1],pants:'#4a3426'}),{robe:false,long:true,hair4:'bald',hair:'#3a2a1c',legW:1.6,browW:1.2,fb:'short',fbCol:'#4a3020'}),
  labsci:Object.assign(mkK({coat:'#f4f6f8',trim:'#cfd6de',skin:SK[3],pants:'#3a4a66'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#2a1c16',fem:1,glasses:1,legW:1.5}),
  arch:Object.assign(mkK({coat:'#8a7a52',trim:'#e8dcc0',skin:SK[2],pants:'#5a4a36'}),{robe:false,long:false,hair4:'crew',hair:'#4a3020',hat2:'wide',hatCol:'#c8a868',legW:1.6,stubble:1}),
});
// where a hand should go to touch a 3D point: hf target in rig units from the character's ground point
function reach(pos,target,o={}){const p=pp(pos),q=pp(target),s=p.s*(o.sc||1);const sh={x:p.x+(o.side||1)*14*s,y:p.y-(o.crouch?200-o.crouch:200)*s};return [(q.x-sh.x)/s,(q.y-sh.y)/s];}
// warm local light (candle) / cool light (screen, UV) spilling over everything already drawn
function lightPool(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);c.restore();}
function dustBeam(c,t,x0,y0,x1,y1,w,n=40,col='255,240,210'){c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,`rgba(${col},0.16)`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(x0-w*0.3,y0);c.lineTo(x0+w*0.3,y0);c.lineTo(x1+w,y1);c.lineTo(x1-w,y1);c.closePath();c.fill();
  for(let i=0;i<n;i++){const u=hash(i*3.1),v=(hash(i*5.3)+t*0.03*(0.5+hash(i)))%1;const x=lerp(x0,x1,v)+(u-0.5)*lerp(w*0.6,w*2,v)+Math.sin(t+i)*6,y=lerp(y0,y1,v);c.fillStyle=`rgba(${col},${0.35+0.4*Math.sin(t*2+i)})`;c.beginPath();c.arc(x,y,1.5+hash(i*7)*2.5,0,TAU);c.fill();}c.restore();}
// ---------- the sheep (C style: fluffy wool lumps, dark face + legs, thick outline) ----------
function sheep(c,x,y,s,o={}){const f=o.f||1,t=o.t??T,sd=o.seed||0,graze=o.graze||0,lie=o.lie||0;c.save();c.translate(x,y);c.scale(f,1);c.lineJoin='round';c.lineCap='round';
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(0,2*s,80*s,12*s,0,0,TAU);c.fill();c.restore();
  const wool=o.wool||'#f4eee0',dk=o.face||'#2a2420',br=Math.sin(t*3+sd)*1.5;
  litDraw(c,[x-130*s,y-160*s,x+130*s,y+20*s,s*0.6],(g)=>{g.save();g.translate(x,y);g.scale(f,1);g.lineJoin='round';g.lineCap='round';
    if(!lie){for(const [lx,ph] of [[-40,0],[-22,1],[28,2],[46,3]]){g.strokeStyle=K2;g.lineWidth=13*s;g.beginPath();g.moveTo(lx*s,-40*s);g.lineTo(lx*s+Math.sin(t*2+ph+sd)*(o.walk?6:0)*s,0);g.stroke();g.strokeStyle=dk;g.lineWidth=8*s;g.stroke();}}
    const by=lie?-30:-62+br*0.3;
    // wool body: overlapping circles with outline drawn as one union
    const P=[[-50,0,30],[-24,-14,32],[6,-18,32],[34,-10,30],[50,4,26],[30,16,28],[-6,18,30],[-38,14,28]];
    g.save();g.translate(0,by*s);g.strokeStyle=K2;g.lineWidth=9*s;for(const [px,py,r] of P){g.beginPath();g.arc(px*s,py*s,r*s,0,TAU);g.stroke();}g.fillStyle=wool;for(const [px,py,r] of P){g.beginPath();g.arc(px*s,py*s,r*s,0,TAU);g.fill();}
    g.strokeStyle='rgba(160,150,130,0.45)';g.lineWidth=2.5*s;for(let i=0;i<9;i++){g.beginPath();g.arc((-40+i*10)*s,(-4+(i%3)*8)*s,6*s,0.3,2.6);g.stroke();}
    if(o.pox){g.fillStyle='rgba(200,60,60,0.75)';for(let i=0;i<7;i++){g.beginPath();g.arc((-36+hash(i+sd)*72)*s,(-12+hash(i*3+sd)*24)*s,4*s,0,TAU);g.fill();}}
    g.restore();
    // head: dark long face, ears, eyes
    g.save();g.translate(62*s,(by-6+graze*48+(lie?14:0))*s);g.rotate(graze*0.9+(o.tilt||0));
    g.fillStyle=dk;g.strokeStyle=K2;g.lineWidth=5*s;g.beginPath();g.ellipse(-8*s,-14*s,16*s,7*s,-0.6,0,TAU);g.fill();g.stroke();g.beginPath();g.ellipse(14*s,-16*s,16*s,7*s,0.5,0,TAU);g.fill();g.stroke();
    g.beginPath();g.ellipse(6*s,4*s,18*s,26*s,-0.15,0,TAU);g.fill();g.stroke();g.fillStyle=wool;g.beginPath();g.arc(2*s,-18*s,12*s,0,TAU);g.fill();g.strokeStyle=K2;g.lineWidth=4*s;g.stroke();
    const E=o.eyes||'dot';if(E==='closed'){g.strokeStyle='#fff';g.lineWidth=2.6*s;for(const ex of [-2,14]){g.beginPath();g.arc(ex*s,0,4*s,0.2,Math.PI-0.2);g.stroke();}}else{g.fillStyle='#fff';for(const ex of [-2,14]){g.beginPath();g.ellipse(ex*s,-1*s,4.5*s,5.5*s,0,0,TAU);g.fill();}g.fillStyle=K2;for(const ex of [-1,15]){g.beginPath();g.arc(ex*s,0,2.6*s,0,TAU);g.fill();}}
    g.restore();g.restore();});}
// ---------- sheep skull with teeth (for the dig) ----------
function skull(c,x,y,s,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;const g=c.createLinearGradient(-60*s,0,60*s,0);g.addColorStop(0,'#c8b898');g.addColorStop(0.5,'#efe4cc');g.addColorStop(1,'#b8a888');c.fillStyle=g;
  c.beginPath();c.moveTo(-70*s,-10*s);c.quadraticCurveTo(-60*s,-46*s,-10*s,-44*s);c.quadraticCurveTo(50*s,-40*s,78*s,-8*s);c.lineTo(84*s,10*s);c.quadraticCurveTo(40*s,22*s,-20*s,20*s);c.quadraticCurveTo(-64*s,18*s,-70*s,-10*s);c.fill();c.stroke();
  c.fillStyle='#3a2a1c';c.beginPath();c.ellipse(-30*s,-14*s,12*s,10*s,0,0,TAU);c.fill();c.stroke();c.beginPath();c.ellipse(60*s,-6*s,8*s,5*s,0.3,0,TAU);c.fill();
  // molar row (the teeth that held the virus DNA)
  for(let i=0;i<6;i++){const tx=(-6+i*13)*s;c.fillStyle='#fff8e6';c.strokeStyle=K2;c.lineWidth=3*s;rr(c,tx,16*s,11*s,16*s,3*s);c.fill();c.stroke();}
  c.restore();}
// ---------- poxvirus particle: brick-shaped core with surface ridges ----------
function virusP(c,x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate((o.rot||0)+Math.sin(t*0.8)*0.1);c.lineJoin='round';const col=o.col||'#7ae06a';
  if(o.glow!==0)lightPool(c,0,0,r*2.4,o.gc||'120,255,140',0.45);
  const g=c.createRadialGradient(-r*0.3,-r*0.4,r*0.1,0,0,r*1.2);g.addColorStop(0,shd(col,0.45));g.addColorStop(0.6,col);g.addColorStop(1,shd(col,-0.45));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=r*0.09;rr(c,-r*0.85,-r*1.1,r*1.7,r*2.2,r*0.6);c.fill();c.stroke();
  c.strokeStyle=shd(col,-0.35);c.lineWidth=r*0.07;c.lineCap='round';for(let i=0;i<7;i++){c.beginPath();const yy=-r*0.85+i*r*0.28;c.moveTo(-r*0.6,yy);c.bezierCurveTo(-r*0.2,yy-r*0.12,r*0.2,yy+r*0.12,r*0.6,yy);c.stroke();}
  c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.ellipse(-r*0.35,-r*0.6,r*0.18,r*0.32,-0.3,0,TAU);c.fill();c.restore();}
// ---------- DNA double helix (vertical) ----------
function helix(c,x,y,h,w,t,o={}){c.save();c.translate(x,y);const n=26;for(let i=0;i<n;i++){const u=i/(n-1),yy=-h/2+u*h,a=u*Math.PI*4+t*2;const x1=Math.sin(a)*w,x2=Math.sin(a+Math.PI)*w,z1=Math.cos(a);
    const bad=o.bad&&i>=o.bad[0]&&i<=o.bad[1];c.strokeStyle=bad?'#ff4a4a':'rgba(200,230,255,0.7)';c.lineWidth=4;c.beginPath();c.moveTo(x1,yy);c.lineTo(x2,yy);c.stroke();
    for(const [xx,zz,col] of [[x1,z1,bad?'#ff6a6a':'#6ad8ff'],[x2,-z1,bad?'#ff9a6a':'#ff8ad0']]){c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.arc(xx,yy,7+zz*3,0,TAU);c.fill();c.stroke();}}
  c.restore();}
// ---------- parchment on a stretching frame (herse) ----------
function herse(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=7*s;
  const wd='#7a5230';for(const [x0,y0,w2,h2] of [[-230,-300,40,600],[190,-300,40,600],[-230,-300,460,40],[-230,260,460,40]]){c.fillStyle=wd;rr(c,x0*s,y0*s,w2*s,h2*s,6*s);c.fill();c.stroke();}
  // the skin, pegged with cords
  const g=c.createLinearGradient(-170*s,0,170*s,0);g.addColorStop(0,'#d8c09a');g.addColorStop(0.5,'#f2e4c4');g.addColorStop(1,'#d4ba92');c.fillStyle=g;c.beginPath();c.moveTo(-160*s,-230*s);c.quadraticCurveTo(0,-250*s,160*s,-230*s);c.quadraticCurveTo(178*s,0,160*s,230*s);c.quadraticCurveTo(0,250*s,-160*s,230*s);c.quadraticCurveTo(-178*s,0,-160*s,-230*s);c.fill();c.stroke();
  c.strokeStyle='#c8a868';c.lineWidth=3*s;for(let i=0;i<6;i++){const yy=(-200+i*80)*s;seg(c,-210*s,yy,-162*s,yy);seg(c,210*s,yy,162*s,yy);}
  c.strokeStyle='rgba(150,120,80,0.35)';c.lineWidth=2*s;for(let i=0;i<14;i++){c.beginPath();c.arc((-120+hash(i)*240)*s,(-200+hash(i*3)*400)*s,(10+hash(i*5)*30)*s,0,1.2);c.stroke();}
  if(o.virus>0){for(let i=0;i<9;i++){const k=clamp(o.virus*1.4-i*0.08);if(k<=0)continue;const fx=(-130+hash(i*7)*260)*s,fy=(-200+hash(i*11)*400)*s;virusP(c,fx,fy-(1-k)*300*s,14*s,t+i,{rot:i,glow:1});}}
  c.restore();}
function flagFR(c,x,y,w){const h=w*0.66;c.save();c.translate(x,y);['#1f3fa8','#ffffff','#e0302a'].forEach((col,i)=>{c.fillStyle=col;c.fillRect(-w/2+i*w/3,-h/2,w/3+1,h);});c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-w/2,-h/2,w,h);c.restore();}
function flagAT(c,x,y,w){const h=w*0.66;c.save();c.translate(x,y);['#d8202a','#ffffff','#d8202a'].forEach((col,i)=>{c.fillStyle=col;c.fillRect(-w/2,-h/2+i*h/3,w,h/3+1);});c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-w/2,-h/2,w,h);c.restore();}
function flagUK(c,x,y,w){c.save();c.translate(x,y);const F=document.createElement('canvas');F.width=w;F.height=w*0.5;const f=F.getContext('2d');f.translate(w/2,w*0.25);jackDraw(f,w);c.drawImage(F,-w/2,-w*0.25);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(-w/2,-w*0.25,w,w*0.5);c.restore();}
// a closed medieval book (codex): leather cover, metal corners, clasp
function codex(c,x,y,s,rot,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;
  c.fillStyle='#e8d8b0';rr(c,-96*s,-126*s,200*s,262*s,6*s);c.fill();c.stroke();c.fillStyle=o.col||'#6a2a1e';rr(c,-104*s,-134*s,200*s,262*s,8*s);c.fill();c.stroke();
  c.strokeStyle='rgba(230,190,110,0.8)';c.lineWidth=4*s;c.strokeRect(-84*s,-112*s,160*s,218*s);c.beginPath();c.arc(-4*s,-4*s,34*s,0,TAU);c.stroke();
  c.fillStyle='#d8b050';c.strokeStyle=K2;c.lineWidth=3*s;for(const [cx,cy] of [[-104,-134],[96,-134],[-104,128],[96,128]]){c.beginPath();c.moveTo(cx*s,cy*s);c.lineTo((cx+(cx<0?30:-30))*s,cy*s);c.lineTo(cx*s,(cy+(cy<0?30:-30))*s);c.closePath();c.fill();c.stroke();}
  if(o.glow)lightPool(c,0,0,220*s,'120,255,140',0.4*o.glow);c.restore();}
// ===================== v2 props: better virus, helix, manuscripts =====================
// poxvirus: rounded-brick body, translucent outer membrane, dense knobbly surface tubules, faint dumbbell core
virusP=function(c,x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate((o.rot||0)+Math.sin(t*0.8+(o.rot||0))*0.08);c.lineJoin='round';c.lineCap='round';const col=o.col||'#86e07a';
  if(o.glow!==0)lightPool(c,0,0,r*2.6,o.gc||'120,255,140',0.4);
  const body=()=>{rr(c,-r*0.82,-r*1.08,r*1.64,r*2.16,r*0.74);};
  // outer membrane halo
  c.fillStyle='rgba(200,255,200,0.18)';c.strokeStyle='rgba(220,255,220,0.55)';c.lineWidth=r*0.05;rr(c,-r*0.95,-r*1.22,r*1.9,r*2.44,r*0.86);c.fill();c.stroke();
  const g=c.createRadialGradient(-r*0.35,-r*0.45,r*0.1,0,0,r*1.25);g.addColorStop(0,shd(col,0.5));g.addColorStop(0.55,col);g.addColorStop(1,shd(col,-0.5));c.fillStyle=g;body();c.fill();
  c.save();body();c.clip();
  // faint inner core (dumbbell) seen through the surface
  c.fillStyle='rgba(30,90,40,0.28)';c.beginPath();c.ellipse(0,-r*0.42,r*0.42,r*0.3,0,0,TAU);c.ellipse(0,r*0.42,r*0.42,r*0.3,0,0,TAU);c.fill();c.fillRect(-r*0.16,-r*0.42,r*0.32,r*0.84);
  // surface tubules: short rounded ridges in a woven pattern, lit on top
  for(let row=0;row<11;row++)for(let k=0;k<6;k++){const yy=-r*1.0+row*r*0.2,xx=-r*0.72+k*r*0.29+(row%2)*r*0.145,a=(row%2?0.5:-0.5);
    c.save();c.translate(xx,yy);c.rotate(a);c.fillStyle=shd(col,-0.3);c.beginPath();c.ellipse(0,r*0.02,r*0.12,r*0.05,0,0,TAU);c.fill();c.fillStyle=shd(col,0.25);c.beginPath();c.ellipse(0,-r*0.01,r*0.1,r*0.035,0,0,TAU);c.fill();c.restore();}
  // shading toward the shadow side + rim light
  const sg=c.createLinearGradient(-r,0,r,0);sg.addColorStop(0,'rgba(255,255,255,0.12)');sg.addColorStop(0.6,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,30,0,0.4)');c.fillStyle=sg;c.fillRect(-r,-r*1.2,r*2,r*2.4);c.restore();
  c.strokeStyle=K2;c.lineWidth=Math.max(2,r*0.08);body();c.stroke();
  c.strokeStyle='rgba(220,255,200,0.8)';c.lineWidth=Math.max(1.5,r*0.04);c.beginPath();c.arc(-r*0.1,-r*0.2,r*0.95,-2.6,-1.6);c.stroke();
  c.restore();};
// DNA double helix: two continuous backbone ribbons with depth (back strand drawn first, darker), base-pair rungs
helix=function(c,x,y,h,w,t,o={}){c.save();c.translate(x,y);const N=80,turns=2.2,ph=t*1.6;const pt=(u,s)=>{const a=u*Math.PI*2*turns+ph+(s?Math.PI:0);return {x:Math.sin(a)*w,y:-h/2+u*h,z:Math.cos(a)};};
  const bad=u=>o.bad&&u>=o.bad[0]/26&&u<=o.bad[1]/26;
  // rungs (behind first, then ribbons by depth)
  for(let i=0;i<=24;i++){const u=i/24,A=pt(u,0),B=pt(u,1);const mid={x:(A.x+B.x)/2,y:A.y};const cA=bad(u)?'#ff4a3a':['#5ad0ff','#ffd04a','#7ae06a','#ff7ac8'][i%4],cB=bad(u)?'#ff9a3a':['#ffd04a','#5ad0ff','#ff7ac8','#7ae06a'][i%4];
    c.lineCap='round';c.strokeStyle=K2;c.lineWidth=11;seg(c,A.x,A.y,B.x,B.y);c.strokeStyle=cA;c.lineWidth=6;seg(c,A.x,A.y,mid.x,mid.y);c.strokeStyle=cB;seg(c,mid.x,mid.y,B.x,B.y);}
  for(const pass of [0,1])for(const s of [0,1]){for(let i=0;i<N;i++){const u0=i/N,u1=(i+1)/N,P0=pt(u0,s),P1=pt(u1,s);const front=P0.z>0;if((pass===1)!==front)continue;
      c.lineCap='round';c.strokeStyle=K2;c.lineWidth=18;seg(c,P0.x,P0.y,P1.x,P1.y);c.strokeStyle=front?(s?'#9ad8ff':'#e8f4ff'):(s?'#3a6a9a':'#5a6a8a');c.lineWidth=11;seg(c,P0.x,P0.y,P1.x,P1.y);
      if(front){c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=3;seg(c,P0.x-3,P0.y,P1.x-3,P1.y);}}}
  if(o.glowOn!==0){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,0,0,0,0,h*0.7);g.addColorStop(0,'rgba(90,200,255,0.18)');g.addColorStop(1,'rgba(90,200,255,0)');c.fillStyle=g;c.fillRect(-h,-h,2*h,2*h);}
  c.restore();};
// handwritten medieval script line (gothic minims) in a box
function scriptLine(g,x,y,w,sz,col='rgba(50,30,15,0.85)',seed=0){g.save();g.strokeStyle=col;g.lineWidth=Math.max(1.2,sz*0.16);g.lineCap='round';let cx=x;let i=0;while(cx<x+w-sz){const wl=2+Math.floor(hash(seed+i*1.7)*5);for(let k=0;k<wl&&cx<x+w;k++){const hh=sz*(hash(seed+i+k*3.3)>0.82?1.5:1),up=hash(seed*3+i+k)>0.86;g.beginPath();g.moveTo(cx,y-(up?hh*1.4:hh));g.lineTo(cx,y);g.lineTo(cx+sz*0.18,y-sz*0.12);g.stroke();cx+=sz*0.42;}cx+=sz*0.55;i++;}g.restore();}
// parchment surface (aged, fibrous, stains) filling w×h at 0,0
function parchment(g,w,h,seed=0){const gr=g.createRadialGradient(w*0.5,h*0.45,w*0.1,w*0.5,h*0.5,w*0.8);gr.addColorStop(0,'#f6ead0');gr.addColorStop(0.7,'#ead6ae');gr.addColorStop(1,'#cfb07e');g.fillStyle=gr;g.fillRect(0,0,w,h);
  for(let i=0;i<14;i++){const sx=hash(i*3+seed)*w,sy=hash(i*5+seed)*h,r=10+hash(i*7+seed)*w*0.08;const sgr=g.createRadialGradient(sx,sy,0,sx,sy,r);sgr.addColorStop(0,'rgba(150,110,60,0.18)');sgr.addColorStop(1,'rgba(150,110,60,0)');g.fillStyle=sgr;g.fillRect(sx-r,sy-r,2*r,2*r);}
  g.strokeStyle='rgba(160,130,90,0.18)';g.lineWidth=1;for(let i=0;i<60;i++){const fx=hash(i*1.3+seed)*w,fy=hash(i*2.9+seed)*h;g.beginPath();g.moveTo(fx,fy);g.quadraticCurveTo(fx+8,fy+3,fx+16+hash(i)*20,fy+(hash(i*4)-0.5)*6);g.stroke();}}
// one manuscript page: margins, two ruled columns of script, a gold+red illuminated initial, small border vine
function msPage(g,w,h,seed=0,o={}){parchment(g,w,h,seed);const m=w*0.12,cw=(w-m*2.4)/2,sz=Math.max(3,h*0.018);
  g.strokeStyle='rgba(170,120,90,0.25)';g.lineWidth=1;for(let col=0;col<2;col++){const x0=m+col*(cw+m*0.4);for(let i=0;i<22;i++){const yy=h*0.14+i*h*0.034;if(yy>h*0.88)break;g.beginPath();g.moveTo(x0,yy);g.lineTo(x0+cw,yy);g.stroke();const skip=(col===0&&i<4);scriptLine(g,x0+(skip?cw*0.36:0),yy-1,skip?cw*0.64:cw*(i%7===6?0.6:1),sz,i%9===4?'rgba(160,30,20,0.85)':'rgba(50,30,15,0.85)',seed*13+col*50+i*3);}}
  // illuminated initial
  const ix=m,iy=h*0.1,is=cw*0.32;g.fillStyle='#2a4a9a';g.fillRect(ix,iy,is,is);g.strokeStyle='#d8a838';g.lineWidth=Math.max(2,is*0.08);g.strokeRect(ix,iy,is,is);g.fillStyle='#c82a1e';g.font=`900 ${is*0.8}px serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('Q',ix+is/2,iy+is*0.55);
  g.strokeStyle='rgba(60,120,60,0.7)';g.lineWidth=Math.max(1.5,w*0.006);g.beginPath();g.moveTo(ix+is*0.5,iy+is);for(let k=0;k<6;k++){g.quadraticCurveTo(ix-m*0.5,iy+is+k*h*0.12+h*0.06,ix+is*0.3,iy+is+(k+1)*h*0.12);}g.stroke();for(let k=0;k<6;k++){g.fillStyle=k%2?'#d8a838':'#c82a1e';g.beginPath();g.arc(ix-m*0.1,iy+is+(k+0.5)*h*0.12,Math.max(2,w*0.012),0,TAU);g.fill();}}
// an open codex lying flat, drawn in a w×h box (top-down-ish): thick cover boards, stacked page block, curved pages rising to the spine, gutter shadow
function openBook(g,w,h,o={}){g.save();g.lineJoin='round';
  // cover boards
  g.fillStyle='#4a2414';g.strokeStyle=K2;g.lineWidth=Math.max(3,w*0.008);rr(g,0,h*0.06,w,h*0.94,w*0.02);g.fill();g.stroke();
  // page block edges (thickness) under each page
  for(const sd of [0,1]){const x0=sd?w*0.5:w*0.035,x1=sd?w*0.965:w*0.5;for(let k=0;k<5;k++){g.fillStyle=k%2?'#e2cfa4':'#d4bc8c';g.beginPath();g.moveTo(x0,h*0.9+k*h*0.012);g.lineTo(x1,h*0.9+k*h*0.012);g.lineTo(x1,h*0.92+k*h*0.012);g.lineTo(x0,h*0.92+k*h*0.012);g.fill();}}
  // the two pages: top edge curves up toward the spine
  for(const sd of [0,1]){g.save();g.beginPath();if(!sd){g.moveTo(w*0.04,h*0.1);g.quadraticCurveTo(w*0.3,h*0.08,w*0.5,h*0.0);g.lineTo(w*0.5,h*0.9);g.quadraticCurveTo(w*0.3,h*0.94,w*0.04,h*0.92);}else{g.moveTo(w*0.96,h*0.1);g.quadraticCurveTo(w*0.7,h*0.08,w*0.5,h*0.0);g.lineTo(w*0.5,h*0.9);g.quadraticCurveTo(w*0.7,h*0.94,w*0.96,h*0.92);}g.closePath();g.clip();
    g.translate(sd?w*0.5:w*0.04,0);msPage(g,w*0.46,h*0.94,sd*7+(o.seed||0));g.restore();
    g.strokeStyle=K2;g.lineWidth=Math.max(2.5,w*0.006);g.beginPath();if(!sd){g.moveTo(w*0.04,h*0.1);g.quadraticCurveTo(w*0.3,h*0.08,w*0.5,h*0.0);g.moveTo(w*0.04,h*0.1);g.lineTo(w*0.04,h*0.92);g.quadraticCurveTo(w*0.3,h*0.94,w*0.5,h*0.9);}else{g.moveTo(w*0.96,h*0.1);g.quadraticCurveTo(w*0.7,h*0.08,w*0.5,h*0.0);g.moveTo(w*0.96,h*0.1);g.lineTo(w*0.96,h*0.92);g.quadraticCurveTo(w*0.7,h*0.94,w*0.5,h*0.9);}g.stroke();}
  // gutter shadow + spine line, light falloff across the curve
  const gs=g.createLinearGradient(w*0.38,0,w*0.62,0);gs.addColorStop(0,'rgba(60,30,10,0)');gs.addColorStop(0.5,'rgba(60,30,10,0.45)');gs.addColorStop(1,'rgba(60,30,10,0)');g.fillStyle=gs;g.fillRect(w*0.38,0,w*0.24,h*0.92);
  g.strokeStyle='rgba(40,20,8,0.8)';g.lineWidth=Math.max(2,w*0.005);g.beginPath();g.moveTo(w*0.5,0);g.lineTo(w*0.5,h*0.9);g.stroke();
  if(o.glow>0){g.globalCompositeOperation='lighter';const gg=g.createRadialGradient(w/2,h/2,0,w/2,h/2,w*0.6);gg.addColorStop(0,`rgba(120,255,140,${0.6*o.glow})`);gg.addColorStop(1,'rgba(120,255,140,0)');g.fillStyle=gg;g.fillRect(0,0,w,h);}
  g.restore();}
// closed codex in 3/4: front board with tooling, visible page-block edge + spine thickness, brass bosses and clasp
codex=function(c,x,y,s,rot,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';const col=o.col||'#6a2a1e',W2=200*s,H2=262*s,T2=46*s;
  c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(T2*0.3,H2*0.52,W2*0.6,18*s,0,0,TAU);c.fill();
  // page block (right + bottom thickness)
  c.fillStyle='#e6d4aa';c.strokeStyle=K2;c.lineWidth=5*s;c.beginPath();c.moveTo(W2/2,-H2/2+6*s);c.lineTo(W2/2+T2,-H2/2+6*s+T2*0.35);c.lineTo(W2/2+T2,H2/2+T2*0.35-6*s);c.lineTo(W2/2,H2/2-6*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(150,120,80,0.6)';c.lineWidth=1.5*s;for(let i=1;i<8;i++){const xx=W2/2+i*T2/8;c.beginPath();c.moveTo(xx,-H2/2+6*s+i*T2*0.35/8);c.lineTo(xx,H2/2-6*s+i*T2*0.35/8);c.stroke();}
  c.fillStyle=shd(col,-0.35);c.strokeStyle=K2;c.lineWidth=5*s;c.beginPath();c.moveTo(-W2/2,H2/2);c.lineTo(W2/2,H2/2);c.lineTo(W2/2+T2,H2/2+T2*0.35);c.lineTo(-W2/2+T2,H2/2+T2*0.35);c.closePath();c.fill();c.stroke();
  // front board
  const gb=c.createLinearGradient(-W2/2,-H2/2,W2/2,H2/2);gb.addColorStop(0,shd(col,0.25));gb.addColorStop(0.5,col);gb.addColorStop(1,shd(col,-0.3));c.fillStyle=gb;rr(c,-W2/2,-H2/2,W2,H2,8*s);c.fill();c.stroke();
  c.strokeStyle='rgba(40,15,8,0.6)';c.lineWidth=3*s;c.strokeRect(-W2/2+16*s,-H2/2+16*s,W2-32*s,H2-32*s);c.strokeRect(-W2/2+28*s,-H2/2+28*s,W2-56*s,H2-56*s);
  c.beginPath();c.moveTo(-W2/2+28*s,-H2/2+28*s);c.lineTo(W2/2-28*s,H2/2-28*s);c.moveTo(W2/2-28*s,-H2/2+28*s);c.lineTo(-W2/2+28*s,H2/2-28*s);c.stroke();
  const bs=(bx,by)=>{const g2=c.createRadialGradient(bx-3*s,by-3*s,1,bx,by,13*s);g2.addColorStop(0,'#fff2b8');g2.addColorStop(1,'#8a6420');c.fillStyle=g2;c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.arc(bx,by,11*s,0,TAU);c.fill();c.stroke();};
  for(const [bx,by] of [[-W2/2+24*s,-H2/2+24*s],[W2/2-24*s,-H2/2+24*s],[-W2/2+24*s,H2/2-24*s],[W2/2-24*s,H2/2-24*s],[0,0]])bs(bx,by);
  c.fillStyle='#b8902e';c.strokeStyle=K2;c.lineWidth=3*s;rr(c,W2/2-14*s,-14*s,T2+20*s,28*s,4*s);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.18)';c.beginPath();c.moveTo(-W2/2+8*s,-H2/2+8*s);c.lineTo(-W2/2+60*s,-H2/2+8*s);c.lineTo(-W2/2+8*s,H2/2-60*s);c.closePath();c.fill();
  if(o.glow)lightPool(c,0,0,220*s,'120,255,140',0.4*o.glow);c.restore();};
// handheld UV torch: knurled metal grip, glowing violet lens, beam cone
function uvTorch(c,x,y,ang,s,beamLen=700){c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';
  c.save();c.globalCompositeOperation='lighter';const bg=c.createLinearGradient(0,0,beamLen*s,0);bg.addColorStop(0,'rgba(170,110,255,0.55)');bg.addColorStop(1,'rgba(150,90,255,0)');c.fillStyle=bg;c.beginPath();c.moveTo(0,-26*s);c.lineTo(beamLen*s,-200*s);c.lineTo(beamLen*s,200*s);c.lineTo(0,26*s);c.closePath();c.fill();c.restore();
  c.strokeStyle=K2;c.lineWidth=6*s;const mg=c.createLinearGradient(0,-30*s,0,30*s);mg.addColorStop(0,'#8a8e98');mg.addColorStop(0.45,'#d8dce4');mg.addColorStop(1,'#3a3e48');c.fillStyle=mg;
  c.beginPath();c.moveTo(-260*s,-20*s);c.lineTo(-40*s,-20*s);c.lineTo(-6*s,-34*s);c.lineTo(-6*s,34*s);c.lineTo(-40*s,20*s);c.lineTo(-260*s,20*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(30,30,40,0.55)';c.lineWidth=3*s;for(let i=0;i<10;i++){const xx=-240*s+i*16*s;seg(c,xx,-18*s,xx+8*s,18*s);}
  c.fillStyle='#2a2c34';rr(c,-150*s,-26*s,24*s,52*s,6*s);c.fill();c.strokeStyle=K2;c.lineWidth=4*s;c.stroke();
  const lg=c.createRadialGradient(0,0,0,0,0,40*s);lg.addColorStop(0,'#ffffff');lg.addColorStop(0.4,'#c89aff');lg.addColorStop(1,'#6a3ac8');c.fillStyle=lg;c.beginPath();c.ellipse(-4*s,0,10*s,32*s,0,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=4*s;c.stroke();
  lightPool(c,0,0,90*s,'190,140,255',0.6);c.restore();}
// ===================== detailed sheep skull (side view, half buried) =====================
// length ~ 300 units at s=1; origin at the middle of the jaw line
skull=function(c,x,y,s,rot=0,o={}){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.lineCap='round';const OLw=5*s;
  const bone=(x0,x1)=>{const g=c.createLinearGradient(0,-90*s,0,40*s);g.addColorStop(0,'#f4ead2');g.addColorStop(0.55,'#e2d2ae');g.addColorStop(1,'#b8a07a');return g;};
  // horn core curling back from the top of the cranium
  c.fillStyle='#d8c6a0';c.strokeStyle=K2;c.lineWidth=OLw;c.beginPath();c.moveTo(-70*s,-78*s);c.bezierCurveTo(-150*s,-140*s,-215*s,-70*s,-175*s,-20*s);c.bezierCurveTo(-160*s,-2*s,-130*s,-12*s,-140*s,-34*s);c.bezierCurveTo(-155*s,-66*s,-112*s,-92*s,-60*s,-58*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(120,90,50,0.45)';c.lineWidth=2.4*s;for(let i=0;i<7;i++){c.beginPath();c.arc(-150*s,-60*s,(22+i*9)*s,-2.4,-0.9);c.stroke();}
  // mandible (lower jaw) with its cheek-tooth row
  c.fillStyle=bone();c.strokeStyle=K2;c.lineWidth=OLw;c.beginPath();c.moveTo(-95*s,-10*s);c.quadraticCurveTo(-110*s,40*s,-70*s,52*s);c.lineTo(90*s,40*s);c.quadraticCurveTo(140*s,34*s,150*s,22*s);c.lineTo(140*s,12*s);c.lineTo(-40*s,22*s);c.quadraticCurveTo(-70*s,20*s,-74*s,-6*s);c.closePath();c.fill();c.stroke();
  for(let i=0;i<6;i++){const tx=(-36+i*20)*s;c.fillStyle=i<3?'#fff6dc':'#f6ecd0';c.strokeStyle=K2;c.lineWidth=3*s;rr(c,tx,10*s,17*s,14*s,3*s);c.fill();c.stroke();c.strokeStyle='rgba(140,110,60,0.6)';c.lineWidth=1.6*s;seg(c,tx+8*s,12*s,tx+8*s,22*s);}
  // cranium + face (upper skull)
  c.fillStyle=bone();c.strokeStyle=K2;c.lineWidth=OLw;c.beginPath();c.moveTo(-110*s,-20*s);c.bezierCurveTo(-118*s,-80*s,-60*s,-104*s,-10*s,-96*s);c.bezierCurveTo(40*s,-90*s,110*s,-60*s,168*s,-28*s);c.quadraticCurveTo(182*s,-16*s,170*s,-4*s);c.lineTo(150*s,4*s);c.lineTo(-30*s,8*s);c.quadraticCurveTo(-96*s,8*s,-110*s,-20*s);c.closePath();c.fill();c.stroke();
  // upper cheek-tooth row
  for(let i=0;i<6;i++){const tx=(-36+i*20)*s;c.fillStyle='#fff8e2';c.strokeStyle=K2;c.lineWidth=3*s;rr(c,tx,-2*s,17*s,14*s,3*s);c.fill();c.stroke();c.strokeStyle='rgba(140,110,60,0.6)';c.lineWidth=1.6*s;seg(c,tx+8*s,0,tx+8*s,10*s);}
  // big round eye socket (orbit) with depth
  const og=c.createRadialGradient(-38*s,-50*s,2*s,-40*s,-46*s,30*s);og.addColorStop(0,'#1a120a');og.addColorStop(1,'#5a4026');c.fillStyle=og;c.strokeStyle=K2;c.lineWidth=OLw;c.beginPath();c.ellipse(-40*s,-48*s,26*s,24*s,-0.2,0,TAU);c.fill();c.stroke();
  c.strokeStyle='rgba(255,250,230,0.7)';c.lineWidth=3*s;c.beginPath();c.ellipse(-40*s,-48*s,30*s,28*s,-0.2,-2.6,-1.2);c.stroke();
  // zygomatic arch, nasal bone, nostril opening, sutures, foramina
  c.strokeStyle='rgba(110,80,45,0.7)';c.lineWidth=3*s;c.beginPath();c.moveTo(-66*s,-22*s);c.quadraticCurveTo(-10*s,-12*s,40*s,-18*s);c.stroke();
  c.beginPath();c.moveTo(-10*s,-92*s);c.quadraticCurveTo(80*s,-70*s,160*s,-30*s);c.stroke();
  c.fillStyle='#3a2816';c.beginPath();c.moveTo(150*s,-22*s);c.quadraticCurveTo(168*s,-20*s,166*s,-8*s);c.quadraticCurveTo(150*s,-8*s,150*s,-22*s);c.fill();
  c.strokeStyle='rgba(90,60,30,0.6)';c.lineWidth=2*s;c.beginPath();c.moveTo(-80*s,-80*s);for(let i=0;i<8;i++)c.lineTo((-72+i*6)*s,(-88+(i%2)*6)*s);c.stroke();c.beginPath();c.moveTo(20*s,-70*s);for(let i=0;i<6;i++)c.lineTo((24+i*6)*s,(-66+(i%2)*5)*s);c.stroke();
  c.fillStyle='#3a2816';for(const [fx,fy] of [[40*s,-34*s],[70*s,-30*s]]){c.beginPath();c.ellipse(fx,fy,4*s,3*s,0,0,TAU);c.fill();}
  // weathering: cracks + soil stains
  c.strokeStyle='rgba(80,55,30,0.55)';c.lineWidth=1.8*s;c.beginPath();c.moveTo(10*s,-94*s);c.lineTo(22*s,-74*s);c.lineTo(14*s,-58*s);c.stroke();c.beginPath();c.moveTo(-100*s,10*s);c.lineTo(-84*s,26*s);c.stroke();
  for(let i=0;i<10;i++){c.fillStyle=`rgba(120,85,45,${0.15+hash(i)*0.2})`;c.beginPath();c.ellipse((-90+hash(i*3)*240)*s,(-70+hash(i*5)*110)*s,(6+hash(i*7)*16)*s,(3+hash(i*9)*6)*s,hash(i)*3,0,TAU);c.fill();}
  // soil still covering the lower edge
  if(o.buried!==0){c.fillStyle='#7a5a3a';c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-200*s,36*s);for(let i=0;i<=20;i++)c.lineTo((-200+i*20)*s,(36+Math.sin(i*1.7)*6-(o.dig||0)*(i>6&&i<14?14:0))*s);c.lineTo(200*s,80*s);c.lineTo(-200*s,80*s);c.closePath();c.fill();
    c.fillStyle='rgba(60,40,20,0.5)';for(let i=0;i<30;i++){c.beginPath();c.arc((-190+hash(i*2)*380)*s,(44+hash(i*4)*30)*s,(1.5+hash(i)*3)*s,0,TAU);c.fill();}}
  c.restore();};
// soft-bristle dig brush, held at the handle end (x,y = hand), pointing along ang
function digBrush(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle='#a8743a';rr(c,-8*s,-6*s,110*s,12*s,6*s);c.fill();c.stroke();c.fillStyle='#c8ccd4';c.fillRect(100*s,-9*s,18*s,18*s);c.strokeRect(100*s,-9*s,18*s,18*s);
  c.fillStyle='#e8d090';c.beginPath();c.moveTo(118*s,-11*s);c.lineTo(150*s,-15*s);c.lineTo(150*s,15*s);c.lineTo(118*s,11*s);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(120,90,40,0.6)';c.lineWidth=1.5*s;for(let i=-3;i<=3;i++)seg(c,120*s,i*3*s,150*s,i*4*s);c.restore();}
