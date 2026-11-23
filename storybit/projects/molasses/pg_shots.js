'use strict';
// ===================== Phineas Gage · cinematic Style 5 =====================
const SK1=SK[1];
function dust(c,t,x,y,k,col='200,180,150',n=26){if(k<=0)return;c.save();for(let i=0;i<n;i++){const a=hash(i*3)*TAU,sp=0.4+hash(i*5)*0.6,p=Math.min(1,k*sp);const px=x+Math.cos(a)*p*420,py=y+Math.sin(a)*p*160-p*120;const r=40+hash(i)*70+p*80;const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,`rgba(${col},${0.45*(1-p*0.7)})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(px-r,py-r,r*2,r*2);}c.restore();}
function sparks(c,x,y,p,n=18,seed=1){if(p<=0||p>=1)return;c.save();c.globalCompositeOperation='lighter';c.lineCap='round';for(let i=0;i<n;i++){const a=-Math.PI/2+(hash(i*7+seed)-0.5)*2.6,v=300+hash(i*3+seed)*700;const x1=x+Math.cos(a)*v*p,y1=y+Math.sin(a)*v*p+p*p*400;const x0=x+Math.cos(a)*v*Math.max(0,p-0.08),y0=y+Math.sin(a)*v*Math.max(0,p-0.08)+Math.max(0,p-0.08)**2*400;c.strokeStyle=`rgba(255,${200+hash(i)*55|0},120,${1-p})`;c.lineWidth=5;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();}c.restore();}
function speedLines(c,t,a=1,cx=540,cy=960){c.save();c.strokeStyle=`rgba(255,255,255,${0.35*a})`;c.lineWidth=3;for(let i=0;i<40;i++){const an=hash(i)*TAU,r0=380+((t*900+hash(i*3)*800)%700);c.beginPath();c.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0);c.lineTo(cx+Math.cos(an)*(r0+160),cy+Math.sin(an)*(r0+160));c.stroke();}c.restore();}
// daguerreotype portrait: brass frame + sepia plate with a head drawn inside
function portrait(c,x,y,s,kind,expr,o={}){c.save();c.translate(x,y);c.scale(s,s);c.rotate(o.rot||0);c.fillStyle='#8a6a2a';c.strokeStyle=OL;c.lineWidth=7;rr(c,-170,-215,340,430,40);c.fill();c.stroke();c.fillStyle='#c8a048';rr(c,-150,-195,300,390,30);c.fill();c.stroke();
  c.save();c.beginPath();c.ellipse(0,0,122,166,0,0,TAU);c.clip();const g=c.createRadialGradient(0,-20,20,0,0,200);g.addColorStop(0,'#e8d6b0');g.addColorStop(1,'#8a7050');c.fillStyle=g;c.fillRect(-140,-180,280,360);
  c.save();c.filter='sepia(0.85) contrast(1.05)';const PS=4.2;const base=Object.assign({noOutline:1,view:'front',hf:[12,93],hb:[-12,93]},expr);const rs=who(_scr,kind,[0,0,0],Object.assign({},base,{abs:{x:0,y:0,s:PS}}));who(c,kind,[0,0,0],Object.assign({},base,{abs:{x:-(rs?rs.hc.x:0),y:-(rs?rs.hc.y:0)+20,s:PS}}));c.restore();
  if(o.crack>0){c.strokeStyle=`rgba(255,255,255,${0.85*o.crack})`;c.lineWidth=3;for(let i=0;i<9;i++){const a=i/9*TAU+0.3;c.beginPath();c.moveTo(20,-30);let px=20,py=-30;for(let j=0;j<4;j++){px+=Math.cos(a+(hash(i*7+j)-0.5))*50*o.crack;py+=Math.sin(a+(hash(i*7+j)-0.5))*50*o.crack;c.lineTo(px,py);}c.stroke();}}
  if(o.fade>0){c.fillStyle=`rgba(30,24,20,${o.fade})`;c.fillRect(-140,-180,280,360);}c.restore();
  c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.ellipse(0,0,122,166,0,0,TAU);c.stroke();c.fillStyle='rgba(255,255,255,0.18)';c.beginPath();c.ellipse(-50,-90,40,90,-0.4,0,TAU);c.fill();c.restore();}
// side-view skull for the x-ray (local units ~ 1 = 1px at s=1); returns key points
function xraySkull(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';const ln='rgba(160,230,255,0.95)',fl='rgba(120,200,255,0.10)';
  c.shadowColor='rgba(120,220,255,0.8)';c.shadowBlur=18;c.strokeStyle=ln;c.lineWidth=6;c.fillStyle=fl;
  c.beginPath();c.moveTo(-170,40);c.bezierCurveTo(-200,-120,-90,-230,40,-220);c.bezierCurveTo(170,-210,230,-110,215,0);c.bezierCurveTo(205,60,190,90,170,110);c.lineTo(160,150);c.bezierCurveTo(150,175,120,180,110,200);c.lineTo(60,215);c.lineTo(20,210);c.bezierCurveTo(-20,240,-80,230,-95,190);c.lineTo(-100,140);c.bezierCurveTo(-130,120,-160,100,-170,40);c.closePath();c.fill();c.stroke();
  // eye socket, nasal cavity, cheekbone, jaw, teeth
  c.lineWidth=5;c.beginPath();c.ellipse(130,10,40,36,0,0,TAU);c.stroke();c.beginPath();c.moveTo(195,40);c.lineTo(205,95);c.lineTo(178,96);c.stroke();c.beginPath();c.moveTo(60,70);c.quadraticCurveTo(110,60,160,75);c.stroke();
  c.beginPath();c.moveTo(-60,120);c.quadraticCurveTo(-40,200,40,215);c.stroke();for(let i=0;i<7;i++){c.strokeRect(70+i*13,150,10,22);}
  c.lineWidth=3;c.globalAlpha=0.55;c.beginPath();c.moveTo(-120,-80);c.bezierCurveTo(-60,-130,40,-140,120,-90);c.stroke();c.beginPath();c.moveTo(-150,0);c.bezierCurveTo(-80,-30,40,-30,170,-30);c.stroke();c.globalAlpha=1;
  // brain inside: frontal lobe region (front-top)
  c.shadowBlur=0;const fr=o.frontal||0;c.fillStyle=`rgba(255,80,80,${0.12+0.4*fr})`;c.beginPath();c.moveTo(40,-200);c.bezierCurveTo(150,-190,200,-110,190,-30);c.lineTo(100,-40);c.bezierCurveTo(60,-90,30,-150,40,-200);c.closePath();c.fill();
  c.restore();return {cheek:{x:x+100*s,y:y+120*s},eye:{x:x+105*s,y:y+10*s},top:{x:x+70*s,y:y-215*s}};}
function brainSide(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=7;
  const lobes=[['#f6a6bf',[[-30,-150],[90,-150],[170,-70],[160,10],[60,0],[0,-40],[-30,-100]]],['#f8c48a',[[-30,-150],[-130,-130],[-180,-50],[-110,-10],[0,-40],[-30,-100]]],['#a8d8f0',[[-180,-50],[-200,40],[-130,80],[-60,60],[-110,-10]]],['#c8e8a8',[[-110,-10],[-60,60],[60,70],[160,10],[60,0],[0,-40]]]];
  lobes.forEach(([col,P],i)=>{const hot=i===0?(o.frontal||0):0;c.fillStyle=hot>0?`rgb(${255},${Math.round(166-120*hot)},${Math.round(191-150*hot)})`:col;if(i===0&&o.dim)c.globalAlpha=1-0.5*o.dim;c.beginPath();P.forEach(([a,b],j)=>j?c.lineTo(a,b):c.moveTo(a,b));c.closePath();c.fill();c.stroke();c.globalAlpha=1;});
  c.lineWidth=3;c.strokeStyle='rgba(0,0,0,0.3)';for(let i=0;i<10;i++){c.beginPath();const a=-160+i*34;c.moveTo(a,-100+Math.sin(i)*30);c.bezierCurveTo(a+14,-60,a-10,-30,a+20,0);c.stroke();}
  c.fillStyle='#e89aa8';c.strokeStyle=OL;c.lineWidth=7;c.beginPath();c.moveTo(-60,60);c.quadraticCurveTo(-40,120,-10,150);c.lineTo(20,140);c.quadraticCurveTo(0,100,10,60);c.closePath();c.fill();c.stroke();
  c.fillStyle='#d88aa0';c.beginPath();c.ellipse(-130,70,60,34,0.3,0,TAU);c.fill();c.stroke();c.restore();}
function ox(c,x,y,s,t,walk=1){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;const ph=t*6*walk;
  for(const [lx,o] of [[-80,0],[-50,Math.PI],[70,Math.PI],[100,0]]){c.fillStyle=o?'#7a5a3a':'#8a6a48';c.beginPath();c.moveTo(lx-10,20);c.lineTo(lx+Math.sin(ph+o)*14-8,110);c.lineTo(lx+Math.sin(ph+o)*14+10,110);c.lineTo(lx+12,20);c.closePath();c.fill();c.stroke();c.fillStyle='#2a2018';c.fillRect(lx+Math.sin(ph+o)*14-10,104,22,10);}
  c.fillStyle='#9a7450';c.beginPath();c.ellipse(0,0,140,70,0,0,TAU);c.fill();c.stroke();c.fillStyle='#b8946a';c.beginPath();c.ellipse(-20,10,90,40,0,0,TAU);c.fill();
  c.fillStyle='#9a7450';c.beginPath();c.moveTo(120,-30);c.quadraticCurveTo(190,-50,210,10);c.quadraticCurveTo(212,50,180,58);c.quadraticCurveTo(150,40,130,20);c.closePath();c.fill();c.stroke();
  c.fillStyle='#d8c0a0';c.beginPath();c.ellipse(205,36,18,16,0,0,TAU);c.fill();c.stroke();c.fillStyle=OL;c.beginPath();c.arc(178,0,6,0,TAU);c.fill();
  c.fillStyle='#f0e6d0';for(const sd of [-1,1]){c.beginPath();c.moveTo(150,-36);c.quadraticCurveTo(150+sd*10,-90,186+sd*6,-80);c.lineTo(160,-30);c.closePath();c.fill();c.stroke();}
  c.strokeStyle='#5a3a1a';c.lineWidth=12;c.beginPath();c.moveTo(130,-48);c.lineTo(110,40);c.stroke();c.strokeStyle=OL;c.lineWidth=4;c.stroke();
  c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-138,-10);c.quadraticCurveTo(-170,30,-160,70);c.stroke();c.restore();}
function cart(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;c.fillStyle='#8a6440';c.beginPath();c.rect(-170,-60,300,70);c.fill();c.stroke();c.strokeStyle='rgba(40,24,10,0.5)';c.lineWidth=3;for(let i=1;i<6;i++){c.beginPath();c.moveTo(-170+i*50,-60);c.lineTo(-170+i*50,10);c.stroke();}
  c.strokeStyle=OL;c.lineWidth=8;c.beginPath();c.moveTo(130,-20);c.lineTo(260,-30);c.stroke();
  const wr=t*4;c.fillStyle='#6a4a2a';c.lineWidth=6;c.beginPath();c.arc(-40,30,70,0,TAU);c.fill();c.stroke();c.fillStyle='#8a6440';c.beginPath();c.arc(-40,30,54,0,TAU);c.fill();c.stroke();c.lineWidth=5;for(let i=0;i<8;i++){const a=wr+i/8*TAU;c.beginPath();c.moveTo(-40,30);c.lineTo(-40+Math.cos(a)*54,30+Math.sin(a)*54);c.stroke();}c.fillStyle='#3a2a1a';c.beginPath();c.arc(-40,30,12,0,TAU);c.fill();c.stroke();c.restore();}
function stagecoach(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;const bob=Math.sin(t*14)*4;
  for(const wx of [-130,90]){const wr=t*8;c.fillStyle='#c8463a';c.beginPath();c.arc(wx,80,62,0,TAU);c.fill();c.stroke();c.fillStyle='#8a2a22';c.beginPath();c.arc(wx,80,48,0,TAU);c.fill();c.stroke();c.lineWidth=4;for(let i=0;i<10;i++){const a=wr+i/10*TAU;c.beginPath();c.moveTo(wx,80);c.lineTo(wx+Math.cos(a)*48,80+Math.sin(a)*48);c.stroke();}c.lineWidth=6;c.fillStyle='#3a2a1a';c.beginPath();c.arc(wx,80,10,0,TAU);c.fill();}
  c.translate(0,bob);c.fillStyle='#2a3a6a';c.beginPath();c.moveTo(-200,20);c.lineTo(-210,-150);c.quadraticCurveTo(-30,-185,150,-150);c.lineTo(160,20);c.quadraticCurveTo(-20,50,-200,20);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8c870';for(const wx of [-150,-40]){rr(c,wx,-120,80,70,10);c.fill();c.stroke();}c.strokeStyle='#c8a830';c.lineWidth=5;c.beginPath();c.moveTo(-200,-10);c.quadraticCurveTo(-20,15,160,-10);c.stroke();
  c.fillStyle='#5a3a22';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.rect(150,-60,90,22);c.fill();c.stroke();c.beginPath();c.rect(-180,-178,300,24);c.fill();c.stroke();c.fillStyle='#8a6a40';c.beginPath();c.rect(-160,-212,120,36);c.fill();c.stroke();c.restore();}
function horse(c,x,y,s,t,col='#6a3a22'){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;const ph=t*13;
  for(const [lx,o] of [[-70,0],[-46,2.4],[60,1.2],[84,3.6]]){const sw=Math.sin(ph+o);c.fillStyle=shd(col,o>2?-0.2:0);c.beginPath();c.moveTo(lx-10,10);c.lineTo(lx+sw*34-6,64);c.lineTo(lx+sw*40-8,112);c.lineTo(lx+sw*40+8,112);c.lineTo(lx+sw*34+10,64);c.lineTo(lx+12,10);c.closePath();c.fill();c.stroke();c.fillStyle='#1a1410';c.fillRect(lx+sw*40-10,108,22,10);}
  const by=Math.sin(ph*2)*5;c.translate(0,by);c.fillStyle=col;c.beginPath();c.ellipse(0,-10,110,48,0,0,TAU);c.fill();c.stroke();
  c.beginPath();c.moveTo(80,-40);c.quadraticCurveTo(120,-120,150,-120);c.quadraticCurveTo(190,-110,200,-80);c.lineTo(186,-66);c.quadraticCurveTo(150,-80,140,-60);c.quadraticCurveTo(120,-20,100,0);c.closePath();c.fill();c.stroke();
  c.fillStyle='#2a1a10';c.beginPath();c.moveTo(90,-50);c.quadraticCurveTo(110,-130,150,-128);c.lineTo(130,-100);c.quadraticCurveTo(110,-70,104,-40);c.closePath();c.fill();c.beginPath();c.moveTo(-105,-20);c.quadraticCurveTo(-150,-10+Math.sin(ph)*10,-140,50);c.lineTo(-120,30);c.closePath();c.fill();c.stroke();
  c.fillStyle=OL;c.beginPath();c.arc(170,-100,5,0,TAU);c.fill();c.restore();}
function museumCase(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';
  // velvet base
  c.fillStyle='#5a1a24';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-330,140);c.lineTo(330,140);c.lineTo(300,190);c.lineTo(-300,190);c.closePath();c.fill();c.stroke();
  // the tamping iron lying beside the skull
  tampIron(c,{x:-300,y:120},{x:300,y:96},1.25);
  // skull (front view)
  c.translate(-40,0);c.fillStyle='#ece2c8';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-110,-30);c.bezierCurveTo(-120,-190,120,-190,110,-30);c.bezierCurveTo(108,20,90,40,80,60);c.lineTo(70,110);c.lineTo(-70,110);c.lineTo(-80,60);c.bezierCurveTo(-90,40,-108,20,-110,-30);c.closePath();c.fill();c.stroke();
  c.fillStyle='#3a3028';for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*44,-10,30,28,0,0,TAU);c.fill();c.stroke();}c.beginPath();c.moveTo(0,20);c.lineTo(-12,50);c.lineTo(12,50);c.closePath();c.fill();
  c.fillStyle='#f6f0dc';for(let i=0;i<6;i++){c.beginPath();c.rect(-45+i*15,78,13,24);c.fill();c.stroke();}
  // the exit hole on top-left of the skull (his left = viewer's right)
  c.fillStyle='#2a2018';c.beginPath();c.ellipse(36,-120,20,14,0.3,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(60,40,20,0.6)';c.lineWidth=3;for(let i=0;i<5;i++){const a=i/5*TAU;c.beginPath();c.moveTo(36+Math.cos(a)*20,-120+Math.sin(a)*14);c.lineTo(36+Math.cos(a)*40,-120+Math.sin(a)*30);c.stroke();}
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-50,-110,24,40,-0.4,0,TAU);c.fill();c.restore();
  // glass box
  c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='rgba(220,240,255,0.7)';c.lineWidth=5;c.fillStyle='rgba(180,220,255,0.06)';c.beginPath();c.rect(-340,-300,680,440);c.fill();c.stroke();c.beginPath();c.moveTo(-340,-300);c.lineTo(-300,-330);c.lineTo(380,-330);c.lineTo(340,-300);c.stroke();c.beginPath();c.moveTo(380,-330);c.lineTo(380,110);c.lineTo(340,140);c.stroke();
  c.fillStyle='rgba(255,255,255,0.14)';c.beginPath();c.moveTo(-300,-280);c.lineTo(-220,-280);c.lineTo(-330,100);c.lineTo(-330,-10);c.closePath();c.fill();c.restore();}
function plaque(c,x,y,s,text){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#c8a860';c.strokeStyle=OL;c.lineWidth=5;rr(c,-270,-40,540,80,8);c.fill();c.stroke();txt(c,text,0,4,27,'#3a2a14',{stroke:false,ls:3});c.restore();}
function swearBubble(c,x,y,s,t,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();for(let i=0;i<14;i++){const a=i/14*TAU,r=i%2?110:150;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*0.8);}c.closePath();c.fill();c.stroke();
  const sy=['#','@','$','%','!','&'];for(let i=0;i<5;i++){txt(c,sy[(i+Math.floor(t*6))%6],-120+i*60,Math.sin(t*20+i)*6,70,['#d82a20','#1a1a22'][i%2],{stroke:false});}c.restore();}
function meter(c,x,y,s,v,k=1){if(k<=0)return;c.save();c.translate(x,y);c.scale(s*k,s*k);panel(c,-260,-90,520,180,{r:40,fill:'rgba(10,10,14,0.85)'});const g2=c.createLinearGradient(-220,0,220,0);g2.addColorStop(0,'#3ad28a');g2.addColorStop(0.5,'#ffd060');g2.addColorStop(1,'#ff3b30');c.fillStyle=g2;rr(c,-220,-16,440,32,16);c.fill();
  txt(c,'☺',-220,-52,46,'#3ad28a',{stroke:false});txt(c,'☹',220,-52,46,'#ff3b30',{stroke:false});const px=-220+440*v;c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(px,-30);c.lineTo(px-18,-60);c.lineTo(px+18,-60);c.closePath();c.fill();c.stroke();c.beginPath();c.arc(px,0,22,0,TAU);c.fill();c.stroke();c.restore();}
function birds(c,t,n=6){c.save();c.strokeStyle='rgba(40,30,30,0.7)';c.lineWidth=4;c.lineCap='round';for(let i=0;i<n;i++){const x=((t*60+hash(i)*1200)%1300)-100,y=300+hash(i*3)*300+Math.sin(t*2+i)*20,f=Math.sin(t*10+i)*10;c.beginPath();c.moveTo(x-18,y-f);c.quadraticCurveTo(x-8,y-4,x,y);c.quadraticCurveTo(x+8,y-4,x+18,y-f);c.stroke();}c.restore();}
// ================= SHOTS =================
const S={};const SEQ=[];const SHOTS=[];
// 1 · cold open: a spark in the dark, the iron rod rockets skyward in slow motion; dust; Gage sits up
S.open=(c,t,u,d)=>{const tan=wt('an'),tir=wt('iron'),tbr=wt('brain');
  if(t<tan){const p=t/tan;cam(c,'rr_low',{z:1.25,x:560,y:900});c.restore();tint(c,`rgba(0,0,0,${0.85-0.6*p})`,'multiply');
    if(t<0.3){c.fillStyle='#000';c.fillRect(0,0,W,H);sparks(c,540,1500,t/0.3,26,3);glow(c,540,1500,200*t/0.3,'255,200,120',1);}
    else{const q=(t-0.3)/(tan-0.3);flash(c,Math.max(0,0.8-q*2),'#fff');const rx=lerp(520,700,q),ry=lerp(1700,-260,Math.pow(q,0.8));c.save();c.translate(rx,ry);c.rotate(-1.35);tampIron(c,{x:-300,y:0},{x:300,y:0},2.6,0.9);c.restore();
      c.save();c.globalCompositeOperation='lighter';const tg=c.createLinearGradient(rx,ry,rx-50,ry+420);tg.addColorStop(0,'rgba(255,220,160,0.55)');tg.addColorStop(1,'rgba(255,220,160,0)');c.strokeStyle=tg;c.lineWidth=26;c.lineCap='round';c.beginPath();c.moveTo(rx-50,ry+420);c.lineTo(rx,ry);c.stroke();c.restore();dust(c,t,540,1650,q,'210,190,160',30);}
    cine(c,t,{v:0.7});return;}
  // dust settles; he's on his back, then sits up holding his head; the rod lands behind him
  cam(c,'rr_wide',{z:K3(t-tan,tbr+0.6-tan,1.45,1.6),x:470,y:1120});const su=ON(t,tir+0.3,0.7);const land=ON(t,tan,0.25);
  const rp=pp([-0.25,0,0.5]);c.save();c.translate(rp.x,rp.y-lerp(600,0,land));c.rotate(-0.5);tampIron(c,{x:-10,y:0},{x:-10,y:-340*rp.s/2.2},rp.s/2.2*1.4);c.restore();
  if(su<0.05)lieAt(c,'gageHurt',[0.5,0.05,1.1],[0.0,0.05,1.0],X('closed','flat','flat',{view:'front',hf:[-20,40],hb:[20,46]}));
  else sitAt(c,'gageHurt',[0.3,-0.42,1.0],X(t>tbr-0.2?'dot':'closed','worried','o',{view:'front',hf:[lerp(30,40,su),lerp(40,-60,su)],hb:[-12,90],tilt:lerp(0.3,0.06,su)}));
  c.restore();dust(c,t,540,1300,0.6+0.4*ON(t,tan,2.2),'210,190,160',22);cine(c,t,{v:0.6,tint:'rgba(255,200,140,0.12)'});};
// 2 · "the people who knew him said he died that day": friends at dusk, hats to chest; his portrait cracks
S.died=(c,t,u,d)=>{const t0=S.died.t0,td=wt('died',t0);cam(c,'rr_dusk',{z:K3(u,d,1.22,1.3),x:560,y:1060});
  cast(c,[['tom',[-0.05,0,1.15],X('sad','worried','frown',{view:'front',noHat:1,hf:[-14,30],hb:[14,30],tilt:0.08})],['will',[1.05,0,1.25],X('sad','worried','wobble',{view:'front',noHat:1,hf:[12,92],hb:[-12,92],tilt:-0.06})]]);c.restore();
  // hats held to the chest
  
  portrait(c,540,1500,1.25,'gage',X('dot','up','smile',{}),{crack:ON(t,td-0.05,0.35),fade:0.5*ON(t,td+0.2,0.6)});cine(c,t,{v:0.65,tint:'rgba(120,60,160,0.15)'});};
// 3 · what that rod took: profile head, glowing brain, a piece missing
S.took=(c,t,u,d)=>{const t0=S.took.t0,tt=wt('took',t0);gfxBG(c,t,{plate:'rr_dusk'});tint(c,'rgba(10,10,30,0.55)','multiply');const k=popK(t,t0+0.8);
  c.save();c.translate(540,1150);c.scale(k,k);c.fillStyle='rgba(30,26,40,0.95)';c.strokeStyle='rgba(160,200,255,0.6)';c.lineWidth=6;c.beginPath();c.moveTo(-230,320);c.bezierCurveTo(-260,40,-200,-250,40,-280);c.bezierCurveTo(230,-290,290,-120,270,0);c.lineTo(310,90);c.lineTo(270,110);c.lineTo(276,170);c.bezierCurveTo(240,210,190,200,170,230);c.lineTo(160,320);c.closePath();c.fill();c.stroke();
  brainSide(c,40,-70,1.0,t,{frontal:t>tt-0.1?0.5+0.5*Math.sin(t*8):0});if(t>tt-0.1){const p=ON(t,tt-0.1,0.6);c.save();c.translate(lerp(110,330,p),lerp(-150,-300,p));c.rotate(p*2);c.fillStyle='#ff6a6a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-40,-30);c.lineTo(40,-36);c.lineTo(50,30);c.lineTo(-30,40);c.closePath();c.fill();c.stroke();c.restore();}
  c.restore();cine(c,t,{v:0.6,bars:0});};
// 4 · Vermont, 1848: golden-hour railroad cut, crews at work, birds
S.vt=(c,t,u,d)=>{const t0=S.vt.t0;cam(c,'rr_wide',{z:K3(u,d,1.0,1.08),x:540,y:K3(u,d,980,1000)});
  const swing=Math.sin(t*5);const VT=cast(c,[['tom',[-0.1,0,1.3],X('focus','flat','flat',{view:'3q',f:1,crouch:12,hf:[40,lerp(-60,40,(swing+1)/2)],hb:[20,lerp(-40,50,(swing+1)/2)]})],['will',[1.4,0,1.2],X('focus','flat','flat',{view:'3q',f:-1,crouch:24,lean:0.1,hf:[-40,80],hb:[-10,84]})]]);if(VT&&VT[0]){const r=VT[0];const a=Math.atan2(r.hf.y-r.hb.y,r.hf.x-r.hb.x);c.save();c.translate(r.hf.x,r.hf.y);c.rotate(a);c.strokeStyle=OL;c.lineWidth=14*r.s/3.4;c.lineCap='round';c.beginPath();c.moveTo(-60*r.s/3.4,0);c.lineTo(90*r.s/3.4,0);c.stroke();c.strokeStyle='#8a6440';c.lineWidth=8*r.s/3.4;c.stroke();c.fillStyle='#5a5e66';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(80*r.s/3.4,-60*r.s/3.4);c.quadraticCurveTo(110*r.s/3.4,0,80*r.s/3.4,60*r.s/3.4);c.lineTo(96*r.s/3.4,0);c.closePath();c.fill();c.stroke();c.restore();hands(c,r,KIND2.tom);}
  c.restore();birds(c,t,7);godrays(c,900,-60,0.25,'255,220,170');chip(c,540,1640,'VERMONT · 1848',popK(t,t0+0.1),{col:'#ffd8a0'});cine(c,t,{v:0.5});};
// 5 · meet the foreman: careful (measures), polite (tips hat), trusted (handshake)
S.gage=(c,t,u,d)=>{const t0=S.gage.t0,tc=wt('careful',t0),tp=wt('polite',t0),tg=wt('guy',t0);cam(c,'rr_wide',{z:K3(u,d,1.3,1.42),x:K3(u,d,520,560),y:1040});
  let G={view:'3q',f:1,hf:[12,93],hb:[-12,93]};let lift=0;
  if(t<tc){G=Object.assign(G,{hf:[30,30],hb:[-12,93]});}
  else if(t<tp){G=Object.assign(G,{crouch:40,hf:[60,70],hb:[40,74],lean:0.12});}
  else if(t<tg){const p=ON(t,tp,0.35)*(1-ON(t,tp+0.55,0.3));lift=p*0.55;G=Object.assign(G,{hf:[lerp(30,26,p),lerp(40,-74,p)],hb:[-12,93],tilt:-0.08*p});}
  else{G=Object.assign(G,{hf:[60,30],hb:[-12,93]});}
  const Gr=who(c,'gage',[0.1,0,1.0],X(t>tp?'happy':'dot','up',t>tp?'grin':'smile',Object.assign(G,{hatLift:lift})));
  const Wr=who(c,'will',[1.3,0,1.15],X(t>tg?'happy':'dot','up',t>tg?'grin':'smile',{view:'3q',f:-1,hf:t>tg?[-60,30]:[-12,92],hb:[12,92]}));
  if(Gr&&t<tc){c.save();c.translate(Gr.hf.x+10,Gr.hf.y-10);c.rotate(-0.2);c.fillStyle='#d8c8a0';c.strokeStyle=OL;c.lineWidth=4;rr(c,-28,-38,56,76,6);c.fill();c.stroke();c.fillStyle='rgba(40,30,20,0.6)';for(let i=0;i<5;i++)c.fillRect(-18,-26+i*12,36,4);c.restore();}
  if(Gr&&t>=tc&&t<tp){c.save();c.translate(Gr.hf.x,Gr.hf.y);c.rotate(0.3);c.fillStyle='#e8c860';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(0,-8,120,16);c.strokeRect(0,-8,120,16);for(let i=1;i<10;i++){c.beginPath();c.moveTo(i*12,-8);c.lineTo(i*12,i%2?-1:2);c.stroke();}c.restore();}
  c.restore();if(t>=tc&&t<tp)check(c,880,1560,70,popK(t,tc));if(t>=tg)starBurst(c,700,800,50,popK(t,tg)*clamp(1-(t-tg)));cine(c,t,{v:0.5});};
// 6 · packing the powder, tamping with the 13-pound iron
S.tamp=(c,t,u,d)=>{const t0=S.tamp.t0,tpk=wt('packing',t0),tr=wt('rock',t0),t13=wt('13-pound',t0);cam(c,'rr_wide',{z:K3(u,d,2.0,2.15),x:580,y:K3(u,d,900,880)});const hole=pp([0.9,0.69,0.6]);
  const pour=t<tr;const st=Math.sin((t-tr)*7);const ty=pour?0:(st*0.5+0.5);
  const r=who(c,'gage',[0.45,0,1.05],X('focus','flat','flat',{view:'3q',f:1,lean:0.16,crouch:pour?30:20,hf:pour?[70,40]:[46,lerp(-10,30,ty)],hb:pour?[40,60]:[40,lerp(30,70,ty)]}));
  if(r&&pour){powderFlask(c,r.hf.x+30,r.hf.y+10,r.s/3.4*2.2,0.7);c.save();c.fillStyle='#2a2420';for(let i=0;i<14;i++){const q=((t*3+hash(i))%1);c.beginPath();c.arc(r.hf.x+70+Math.sin(i)*4,r.hf.y+50+q*(hole.y-r.hf.y-50),3,0,TAU);c.fill();}c.restore();hands(c,r,KIND2.gage);}
  if(r&&!pour){const top={x:hole.x-6,y:hole.y-lerp(470,420,ty)*r.s/3.4};tampIron(c,{x:hole.x,y:hole.y-lerp(40,0,ty)*r.s/3.4},top,r.s/3.4*2.2);hands(c,r,KIND2.gage);}
  c.restore();if(t>t13-0.1){const k=popK(t,t13-0.1);c.save();c.translate(870,1560);c.scale(k,k);panel(c,-150,-110,300,220,{r:36,fill:'rgba(10,10,14,0.85)'});c.fillStyle='#4a4e56';c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(-70,70);c.lineTo(70,70);c.lineTo(50,-30);c.lineTo(-50,-30);c.closePath();c.fill();c.stroke();c.beginPath();c.arc(0,-46,20,0,TAU);c.stroke();txt(c,'13 lb',0,30,48,'#fff',{stroke:false});c.restore();}cine(c,t,{v:0.55});};
// 7 · one spark: extreme close-up on the rod tip in the hole, slow-motion spark, white-out
S.spark=(c,t,u,d)=>{const t0=S.spark.t0,ts=wt('spark',t0);cam(c,'rr_rock',{z:K3(t-t0,1,2.4,2.7),x:650,y:1000});c.restore();tint(c,'rgba(0,0,0,0.35)','multiply');
  tampIron(c,{x:560,y:1180},{x:520,y:-200},4.5,ON(t,ts-0.05,0.3));const p=clamp((t-ts+0.05)/0.9);sparks(c,560,1170,p,30,5);if(p>0)glow(c,560,1170,300*p,'255,200,120',1-p*0.5);
  heartbeatPulse(c,t);cine(c,t,{v:0.75});flash(c,ON(t,ts+0.35,0.25),'#fff');};
function heartbeatPulse(c,t){}
// 8 · x-ray: the rod's path — in through the left cheek, behind the eye, out the top of the skull
S.xray=(c,t,u,d)=>{const t0=S.xray.t0,tc=wt('cheek',t0),te=wt('eye',t0),ts=wt('skull',t0);c.fillStyle='#04121e';c.fillRect(0,0,W,H);c.save();c.strokeStyle='rgba(80,160,220,0.08)';c.lineWidth=2;for(let i=0;i<20;i++){c.beginPath();c.moveTo(0,i*100);c.lineTo(W,i*100);c.stroke();c.beginPath();c.moveTo(i*60,0);c.lineTo(i*60,H);c.stroke();}c.restore();
  const p=t<tc?0:t<te?0.45*ON(t,tc,te-tc):t<ts?0.45+0.4*ON(t,te,ts-te):0.85+0.6*ON(t,ts,0.5);const fr=ON(t,te,0.6);
  const K2=xraySkull(c,520,1020,2.0,t,{frontal:fr});const A={x:K2.cheek.x+40,y:K2.cheek.y+260},B={x:K2.top.x-30,y:K2.top.y-420};const tip={x:lerp(A.x,B.x,p),y:lerp(A.y,B.y,p)};
  if(p>0){const L=Math.hypot(B.x-A.x,B.y-A.y);const tail={x:tip.x-(B.x-A.x)/L*700,y:tip.y-(B.y-A.y)/L*700};c.save();c.shadowColor='rgba(255,120,80,0.9)';c.shadowBlur=24;tampIron(c,tail,tip,2.2,0.6);c.restore();
    c.save();c.strokeStyle='rgba(255,90,70,0.6)';c.lineWidth=10;c.setLineDash([18,14]);c.beginPath();c.moveTo(A.x,A.y);c.lineTo(B.x,B.y);c.stroke();c.setLineDash([]);c.restore();}
  for(const [tt,P2] of [[tc,K2.cheek],[te,K2.eye],[ts,K2.top]])if(t>tt-0.05){const k=popK(t,tt-0.05);ring(c,P2.x,P2.y,50*k,0.9,'rgba(255,90,70,',8);}
  vign(c,0.6);grain(c,t,0.05);};
// 9 · minutes later he's talking, riding into town sitting up in an ox cart
S.cart=(c,t,u,d)=>{const t0=S.cart.t0,tt=wt('talking',t0);cam(c,'road',{z:K3(u,d,1.06,1.12),x:540,y:1000});const mv=(t-t0)*70;const bx=180+mv,by=1330;
  cart(c,bx-60,by,1.0,t);ox(c,bx+300,by-70,0.95,t);
  sitAt(c,'gageHurt',[lerp(-1.2,-0.5,clamp((t-t0)/d)),0.45,3.0],X(t>tt?'happy':'dot','up',Math.sin(t*14)>0&&t>tt?'o':'grin',{view:'front',hf:t>tt?[40,-30+Math.sin(t*6)*20]:[14,80],hb:[-14,80],tilt:Math.sin(t*9)*0.04}));
  who(c,'driver',[lerp(-0.2,0.5,clamp((t-t0)/d)),0.45,3.0],X('shock','up','o',{view:'3q',f:-1,crouch:46,kn:1,hf:[50,40],hb:[30,44]}));c.restore();
  dust(c,t,bx-160,by+60,0.5,'200,170,120',10);cine(c,t,{v:0.5});};
// 10 · the doctor arrives; "Here's business enough for you."
S.doc=(c,t,u,d)=>{const t0=S.doc.t0,tg=wt('gage',t0),th=wt('here\'s',t0);cam(c,'inn',{z:K3(u,d,1.1,1.18),y:1000});const wk=ON(t,t0+0.1,1.2);const shock=t>tg;
  const D2=who(c,'doc',[lerp(-1.5,-0.42,wk),0,lerp(0.6,0.2,wk)],X(shock?'shock':'dot',shock?'up':'flat',shock?'o':'flat',Object.assign({view:'3q',f:1,hf:[12,92],hb:[-12,92],hatLift:shock?0.35+Math.abs(Math.sin(t*10))*0.1:0},wk<1?WK(t,4):{})));
  if(D2){c.save();c.translate(D2.hb.x,D2.hb.y+30*D2.s/3.4);c.fillStyle='#3a2418';c.strokeStyle=OL;c.lineWidth=5;rr(c,-50*D2.s/3.4,-10*D2.s/3.4,100*D2.s/3.4,60*D2.s/3.4,12);c.fill();c.stroke();c.strokeStyle='#c8a830';c.lineWidth=4;c.beginPath();c.arc(0,-10*D2.s/3.4,18*D2.s/3.4,Math.PI,0);c.stroke();c.restore();}
  sitAt(c,'gageHurt',[0.42,0,-0.4],X(t>th?'happy':'dot','up',t>th?(Math.sin(t*14)>0?'o':'grin'):'smile',{view:'3q',f:-1,hf:t>th?[44,14]:[-14,64],hb:[10,64]}));c.restore();cine(c,t,{v:0.5});};
// 11 · he survives… but something's off: slow push in, light goes cold, the eye hardens
S.off=(c,t,u,d)=>{const t0=S.off.t0,to=wt('off',t0);cam(c,'inn',{z:K3(u,d,2.2,2.6),x:830,y:K3(u,d,740,700)});const k=ON(t,to-0.3,1.0);
  sitAt(c,'gageHurt',[0.6,0,-0.4],X(k>0.3?'glare':'dot',k>0.3?'angry':'flat','flat',{view:'front',hf:[18,78],hb:[-18,78],tilt:0.02*Math.sin(t*3)}));c.restore();
  tint(c,`rgba(40,0,0,${0.45*k})`,'multiply');vign(c,0.3+0.5*k);cine(c,t,{v:0.6});};
// 12 · the polite foreman is gone: shouting, hat thrown, swear-symbols; crew steps back
S.rude=(c,t,u,d)=>{const t0=S.rude.t0,tr=wt('rude',t0),ti=wt('impatient',t0),ts=wt('swearing',t0);cam(c,'rr_wide',{z:K3(u,d,1.3,1.38),x:540,y:1040,sx:t>ts?Math.sin(t*50)*4:0});
  const yell=t>tr;const stomp=t>ti&&t<ts;
  const G=who(c,'gageAngry',[0.2,0,1.0],X('glare','angry',yell?(Math.sin(t*16)>0?'yell':'grit'):'frown',{view:'3q',f:1,hf:yell?[60,lerp(-40,20,(Math.sin(t*9)+1)/2)]:[12,92],hb:stomp?[-12,92]:[-30,40],vein:yell?1:0,dy:stomp?-Math.abs(Math.sin(t*12))*8:0}));
  const back=ON(t,tr,0.6);who(c,'will',[lerp(1.2,1.55,back),0,1.2],X('shock','worried','wobble',{view:'3q',f:-1,hf:[-30,10],hb:[20,20],sweat:1,lean:-0.1*back}));
  c.restore();if(t>ts-0.1)swearBubble(c,290,385,0.85,t,popK(t,ts-0.1));if(stomp)clockIco(c,880,1580,90,Math.floor(t*30)%12,(t*600)%60,popK(t,ti));cine(c,t,{v:0.55,tint:'rgba(140,40,20,0.12)'});};
// 13 · "no longer Gage": two portraits — the man before, and the man after; the old one fades
S.nolonger=(c,t,u,d)=>{const t0=S.nolonger.t0,tn=wt('no',t0);gfxBG(c,t,{plate:'rr_dusk'});tint(c,'rgba(10,10,20,0.45)','multiply');
  portrait(c,290,920,1.3,'gage',X('dot','up','smile',{}),{rot:-0.05,fade:0.65*ON(t,tn,0.8)});portrait(c,790,950,1.3,'gageAngry',X('glare','angry','frown',{}),{rot:0.05});
  {const ak=ON(t,t0+0.2,0.5);if(ak>0){c.save();c.globalAlpha=ak;c.fillStyle='#e8dcc0';c.strokeStyle=OL;c.lineWidth=6;c.translate(540,930);c.beginPath();c.moveTo(-50,-22);c.lineTo(20,-22);c.lineTo(20,-50);c.lineTo(70,0);c.lineTo(20,50);c.lineTo(20,22);c.lineTo(-50,22);c.closePath();c.fill();c.stroke();c.restore();}}meter(c,540,1560,1.6,lerp(0.15,0.92,ON(t,t0+0.3,1.6)),popK(t,t0+0.1));cine(c,t,{v:0.6,bars:0});};
// 14 · the frontal lobe — the part that keeps you in check; its brake snaps
S.lobe=(c,t,u,d)=>{const t0=S.lobe.t0,tf=wt('frontal',t0),tc=wt('check',t0);gfxBG(c,t,{plate:'inn'});tint(c,'rgba(8,8,20,0.6)','multiply');const k=popK(t,t0+0.1);
  c.save();c.translate(540,980);c.scale(k*1.7,k*1.7);brainSide(c,0,0,1,t,{frontal:t>tf-0.1?0.5+0.5*Math.sin(t*7):0});c.restore();
  const rp=ON(t,t0+0.2,0.8);tampIron(c,{x:lerp(980,860,rp)+80,y:lerp(1500,1350,rp)+300},{x:lerp(860,660,rp),y:lerp(1300,560,rp)},2.0);
  if(t>wt('keeps',t0)-0.1){const kk=popK(t,wt('keeps',t0)-0.1);c.save();c.translate(800,620);c.scale(kk,kk);panel(c,-110,-110,220,220,{r:50,fill:'rgba(10,10,14,0.85)'});c.fillStyle='#d83a2a';c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();for(let i=0;i<8;i++){const a=i/8*TAU+Math.PI/8;c.lineTo(Math.cos(a)*70,Math.sin(a)*70);}c.closePath();c.fill();c.stroke();
    if(t>tc-0.1){c.strokeStyle='#1a1a22';c.lineWidth=8;c.beginPath();c.moveTo(-60,-50);c.lineTo(-10,0);c.lineTo(-30,20);c.lineTo(40,70);c.stroke();}c.restore();}
  cine(c,t,{v:0.6,bars:0});};
// 15 · the twist: years later, driving a stagecoach through the Andes at sunset
S.chile=(c,t,u,d)=>{const t0=S.chile.t0,tc=wt('chile',t0);cam(c,'andes',{z:K3(u,d,1.06,1.16),x:540,y:1000});c.restore();const ZZ=lerp(1.1,1.24,(q=>q*q*(3-2*q))(clamp(u/d)));c.save();c.translate(560,1150);c.scale(ZZ,ZZ);c.translate(-600,-1150);
  // dirt road (tracking shot: the coach holds frame, the road streams past)
  const ry=1330;c.save();const rg=c.createLinearGradient(0,ry-60,0,1700);rg.addColorStop(0,'#b07050');rg.addColorStop(1,'#8a5038');c.fillStyle=rg;c.beginPath();c.moveTo(0,ry-50);c.quadraticCurveTo(540,ry-80,1080,ry-50);c.lineTo(1080,1920);c.lineTo(0,1920);c.closePath();c.fill();
  c.strokeStyle='rgba(70,36,24,0.35)';c.lineWidth=5;c.lineCap='round';for(let i=0;i<16;i++){const x=((hash(i)*1400-t*900)%1400+1400)%1400-160,y=ry-20+hash(i*3)*300;c.beginPath();c.moveTo(x,y);c.lineTo(x+60+hash(i*5)*80,y);c.stroke();}
  for(let i=0;i<10;i++){const x=((hash(i*7)*1300-t*900)%1300+1300)%1300-100,y=ry+20+hash(i*9)*260;c.fillStyle='#6a3a28';c.beginPath();c.ellipse(x,y,10+hash(i)*10,6,0,0,TAU);c.fill();}c.restore();
  const bob=Math.sin(t*14)*5,X0=170,Y0=1400,cs=1.3;
  c.save();c.fillStyle='rgba(40,16,10,0.4)';c.beginPath();c.ellipse(X0+120,Y0+200,460,40,0,0,TAU);c.fill();c.restore();
  // horses, a pair, the far one darker
  const H2=quad(c,740,Y0+170,1.25,t,'horse',{phase:0.9,col:'#4a2a18',dark:'#2e1a0e',belly:'#6a4028'});const H1=quad(c,680,Y0+200,1.38,t,'horse');
  stagecoach(c,X0,Y0,cs,t);
  // driver's box on the front of the roof
  const bx=X0+150*cs,by=Y0-150*cs+bob*cs;
  const G=who(c,'gageChile',[0,0,0],X('focus','flat','smirk',{abs:{x:bx+6,y:by+100,s:1.3},view:'3q',f:1,kn:1,crouch:58,hf:[72,8],hb:[60,14],tilt:Math.sin(t*14)*0.025,lean:0.06}));
  // box front board hides the legs: he is seated behind it
  c.save();c.translate(bx,by);c.scale(0.82,0.82);c.fillStyle='#6a4626';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-40,10);c.lineTo(110,0);c.lineTo(126,150);c.lineTo(-30,160);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(30,16,8,0.4)';c.lineWidth=3;for(let i=1;i<4;i++){c.beginPath();c.moveTo(-36+i*2,10+i*37);c.lineTo(114+i*3,i*37);c.stroke();}c.fillStyle='#c8a830';c.beginPath();c.arc(-24,22,6,0,TAU);c.arc(104,14,6,0,TAU);c.fill();c.restore();
  // reins from his hands to the bits
  if(G){c.save();c.strokeStyle='#2a1a10';c.lineWidth=4;for(const [h,hx2,hy2] of [[G.hf,H2.bit.x,H2.bit.y],[G.hb,H1.bit.x,H1.bit.y]]){c.beginPath();c.moveTo(h.x,h.y);c.quadraticCurveTo((h.x+hx2)/2,Math.max(h.y,hy2)+40,hx2,hy2);c.stroke();}c.restore();}
  dust(c,t,X0-260,Y0+150,1.0,'220,150,110',18);dust(c,t,X0+40,Y0+170,0.7,'220,150,110',10);c.restore();
  if(t>tc-0.1)chip(c,540,1680,'CHILE',popK(t,tc-0.1),{col:'#ffd0a0'});cine(c,t,{v:0.55,tint:'rgba(255,120,80,0.12)'});};
// 16 · the brain adapts: new pathways light up around the damage
S.adapt=(c,t,u,d)=>{const t0=S.adapt.t0,ta=wt('adapt',t0);gfxBG(c,t,{plate:'andes'});tint(c,'rgba(8,8,24,0.6)','multiply');c.save();c.translate(540,1000);c.scale(1.7,1.7);brainSide(c,0,0,1,t,{dim:1});c.restore();
  const g=ON(t,t0+0.3,d-0.6);c.save();c.globalCompositeOperation='lighter';c.lineCap='round';for(let i=0;i<14;i++){const a=hash(i*3)*TAU;const x1=540-120+Math.cos(a)*200,y1=900+Math.sin(a)*120,x2=540+120+Math.cos(a+1)*120,y2=800+Math.sin(a+1)*90;const L=clamp(g*1.4-i*0.05);if(L<=0)continue;
    c.strokeStyle=`rgba(120,230,255,${0.8})`;c.lineWidth=7;c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2,(y1+y2)/2-120,lerp(x1,x2,L),lerp(y1,y2,L));c.stroke();glow(c,lerp(x1,x2,L),lerp(y1,y2,L),30,'160,240,255',0.8);}c.restore();
  if(t>ta-0.1)check(c,540,1560,80,popK(t,ta-0.1));cine(c,t,{v:0.6,bars:0});};
// 17 · today: his skull and the rod, side by side at Harvard; then a ghost of the old Gage in the glass
S.museum=(c,t,u,d)=>{const t0=S.museum.t0,te=S.end?0:0;cam(c,'museum',{z:K3(t-t0,END-t0,1.5,1.05),y:K3(t-t0,END-t0,900,980)});const mp=pp([0,0.95,-0.8]);c.restore();
  c.save();c.globalCompositeOperation='lighter';const g2=c.createLinearGradient(540,0,540,1300);g2.addColorStop(0,'rgba(255,240,210,0.0)');g2.addColorStop(1,'rgba(255,240,210,0.22)');c.fillStyle=g2;c.beginPath();c.moveTo(470,0);c.lineTo(610,0);c.lineTo(900,1250);c.lineTo(180,1250);c.closePath();c.fill();c.restore();
  const zk=K3(t-t0,END-t0,1.5,1.05);museumCase(c,540,1000,0.95*zk/1.3,t);plaque(c,540,1430*zk/1.4+200*(1-zk/1.4),0.9,'PHINEAS P. GAGE · 1848');
  const ta=wt('accident',t0);if(t>ta){const a=0.32*ON(t,ta,1.0)*(1-ON(t,END-2.4,1.0));c.save();c.globalAlpha=a;c.filter='blur(1px)';who(c,'gage',[0,0,0],X('dot','up','smile',{abs:{x:780,y:1300,s:2.6},view:'3q',f:-1,noOutline:1,hatLift:0.4*ON(t,ta+0.6,0.6),hf:[-26,-74],hb:[12,92]}));c.restore();}
  cine(c,t,{v:0.7});flash(c,ON(t,END-1.5,1.4),'#000');};
// ---------- timeline ----------
SEQ.push(['open',0],['died',wt('but',3.5)],['took',wt('give')],['vt',wt('vermont')],['gage',wt('phineas')],['tamp',wt("he's",18.8)],['spark',wt('one',23.4)],['xray',wt('the',24.7)],['cart',wt('minutes')],['doc',wt('when',35)],
 ['off',wt('he',40)],['rude',wt('the',42.8)],['nolonger',wt('his',48.4)],['lobe',wt('the',51.4)],['chile',wt('but',56.3)],['adapt',wt('scientists')],['museum',wt('today')]);
SEQ.forEach(([k,t0])=>{S[k].t0=t0;});
SHOTS.length=0;SEQ.forEach(([k,t0])=>SHOTS.push([t0,(c,t,u,d)=>S[k](c,t,u,d)]));
const _hl=(c,ks)=>{c.fillStyle='#8a9aa8';c.fillRect(0,0,W,H);ks.forEach((k,i)=>{[['front',270],['3q',810]].forEach(([v,x])=>{who(c,k,[0,0,0],X('dot','flat',k==='tom'?'grin':'flat',{abs:{x,y:i*640+330+950,s:4},view:v,f:1,hf:[12,93],hb:[-12,93]}));});});};
SHOTS.push([300,(c)=>_hl(c,['gageAngry','gageChile','tom'])]);SHOTS.push([301,(c)=>_hl(c,['doc','driver','gage'])]);SHOTS.push([302,(c)=>_hl(c,['_t1','_t2','_t3'])]);
SHOTS.push([200,(c,t,u,d)=>{T=3;cam(c,'rr_rock',{z:1.6,x:540,y:800});
  c.save();c.setTransform(SS,0,0,SS,0,0);c.fillStyle='rgba(10,6,8,0.62)';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,1180,80,540,1180,1000);g.addColorStop(0,'rgba(255,140,50,0.95)');g.addColorStop(0.45,'rgba(210,40,20,0.6)');g.addColorStop(1,'rgba(20,0,0,0)');c.globalCompositeOperation='screen';c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';
  godrays(c,540,1180,0.24,'255,150,80');c.restore();c.restore();
  const s=6,hcx=540,hcy=1270,ax=hcx,ay=hcy+255*s;
  who(c,'gage',[0,0,0],X('shock','up','o',{abs:{x:ax,y:ay,s},view:'front',f:1,noHat:1,hf:[12,93],hb:[-12,93]}));
  const en={x:735,y:1385},ex={x:662,y:968},dx=(ex.x-en.x),dy=(ex.y-en.y),L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;
  // motion trail above the exit
  c.save();const tg=c.createLinearGradient(ex.x,ex.y,ex.x+ux*520,ex.y+uy*520);tg.addColorStop(0,'rgba(255,200,120,0.0)');tg.addColorStop(1,'rgba(255,220,160,0.55)');c.strokeStyle=tg;c.lineWidth=70;c.lineCap='round';c.beginPath();c.moveTo(ex.x,ex.y);c.lineTo(ex.x+ux*470,ex.y+uy*470);c.stroke();c.restore();
  c.save();c.beginPath();c.rect(0,0,W,H);c.arc(hcx-6,hcy+2,300,0,TAU,true);c.clip('evenodd');tampIron(c,{x:en.x-ux*360,y:en.y-uy*360},{x:ex.x+ux*430,y:ex.y+uy*430},3.2,0.4);c.restore();
  // wound rims + bone chips flying off the exit
  c.save();c.fillStyle='#5a1414';c.strokeStyle=OL;c.lineWidth=5;for(const p of [ex]){c.beginPath();c.ellipse(p.x,p.y,30,12,Math.atan2(uy,ux)+Math.PI/2,0,TAU);c.fill();c.stroke();}
  for(let i=0;i<14;i++){const a=-Math.PI/2+(hash(i*3.3)-0.5)*1.6,r=60+hash(i*5.1)*230;c.fillStyle=i%3?'#efe6d2':'#8a1e1e';c.beginPath();c.ellipse(ex.x+Math.cos(a)*r,ex.y+Math.sin(a)*r,6+hash(i)*7,4+hash(i*2)*4,a,0,TAU);c.fill();}c.restore();
  sparks&&sparks(c,4,ex.x,ex.y,1.2);
  vign(c,0.55);grain(c,3);
  txt(c,'HE SURVIVED THIS',540,250,100,'#fff',{sw:24,ls:3});txt(c,'BUT HE "DIED" THAT DAY',540,385,76,'#ff2b2b',{sw:22,ls:2});T=200;}]);
