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
