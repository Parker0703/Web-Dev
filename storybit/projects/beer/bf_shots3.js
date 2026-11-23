'use strict';
Object.assign(KIND2,{poorMb:{coat:'#5a4a3a',limb:'#4a4036',hat:'none',hair:'#3a2a1a',stubble:true}});
// ===================== the eight dead: grief, not symbols =====================
function rain(c,t,a=0.35,n=140){c.save();c.strokeStyle=`rgba(200,215,235,${a})`;c.lineWidth=2;for(let i=0;i<n;i++){const x=(hash(i*1.7)*1300-100+t*120)%1300-100,ph=(t*1.6+hash(i*3.3))%1,y=ph*2100-100;seg(c,x,y,x-12,y+46);}c.restore();}
function coldGrade(c,a=0.35){c.save();c.globalCompositeOperation='color';c.fillStyle=`rgba(90,110,140,${a})`;c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(150,160,185,0.55)';c.fillRect(0,0,W,H);c.restore();}
function smallCap(c,x,y,s,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='#5a4a3a';c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.ellipse(0,0,30*s,16*s,0,Math.PI,TAU);c.closePath();c.fill();c.stroke();c.fillStyle='#4a3a2c';c.beginPath();c.ellipse(16*s,2*s,22*s,6*s,0.1,0,TAU);c.fill();c.stroke();
  c.fillStyle='rgba(180,110,40,0.5)';c.beginPath();c.ellipse(-6*s,-6*s,10*s,4*s,0,0,TAU);c.fill();c.restore();}
// the child's rag doll — worn and ragged: torn hem, a patch, one button eye and one stitched X, stuffing poking out, matted yarn hair, soaked with beer
function ragDoll(c,x,y,s,t,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.lineCap='round';c.strokeStyle=K2;const cloth='#ddc9a8';
  for(const [d,ll] of [[-1,82],[1,70]]){c.strokeStyle=K2;c.lineWidth=11*s;seg(c,d*9*s,40*s,d*13*s,ll*s);c.strokeStyle=cloth;c.lineWidth=7*s;seg(c,d*9*s,40*s,d*13*s,ll*s);c.strokeStyle=K2;c.lineWidth=3*s;c.fillStyle='#5a3426';c.beginPath();c.ellipse(d*13*s,(ll+2)*s,7*s,5*s,0,0,TAU);c.fill();c.stroke();}
  for(const d of [-1,1]){c.strokeStyle=K2;c.lineWidth=10*s;seg(c,d*15*s,4*s,d*27*s,40*s);c.strokeStyle=cloth;c.lineWidth=6.5*s;seg(c,d*15*s,4*s,d*27*s,40*s);}
  c.fillStyle='#f6f0e4';for(let i=0;i<4;i++){c.beginPath();c.arc(-29*s+(i%2)*4*s,40*s+i*2*s,3.2*s,0,TAU);c.fill();}c.strokeStyle='#8a7a64';c.lineWidth=1.2*s;seg(c,-27*s,38*s,-34*s,50*s);
  c.strokeStyle=K2;c.fillStyle='#a8545a';c.lineWidth=3.5*s;c.beginPath();c.moveTo(-14*s,0);c.lineTo(14*s,0);c.quadraticCurveTo(28*s,26*s,27*s,44*s);
  const hem=[27,20,15,8,2,-5,-11,-17,-22,-27];hem.forEach((hx,i)=>c.lineTo(hx*s,(i%2?52:45)*s+(i===4?6*s:0)));c.quadraticCurveTo(-29*s,26*s,-14*s,0);c.closePath();c.fill();c.stroke();
  c.fillStyle='#6a7a8a';c.fillRect(4*s,14*s,13*s,12*s);c.strokeRect(4*s,14*s,13*s,12*s);c.strokeStyle='#e8e0d0';c.lineWidth=1.3*s;for(let i=0;i<4;i++){seg(c,(5+i*3.5)*s,12*s,(5+i*3.5)*s,16*s);seg(c,(5+i*3.5)*s,24*s,(5+i*3.5)*s,28*s);}
  c.fillStyle='rgba(110,60,14,0.5)';c.beginPath();c.ellipse(-8*s,30*s,13*s,9*s,0.4,0,TAU);c.fill();c.beginPath();c.ellipse(14*s,40*s,8*s,5*s,0,0,TAU);c.fill();
  c.save();c.translate(0,-14*s);c.rotate(-0.28);c.fillStyle='#e2d0b4';c.strokeStyle=K2;c.lineWidth=3.5*s;c.beginPath();c.arc(0,0,19*s,0,TAU);c.fill();c.stroke();
  c.fillStyle='rgba(120,70,20,0.35)';c.beginPath();c.ellipse(6*s,8*s,9*s,6*s,0,0,TAU);c.fill();
  c.strokeStyle='#6a3a1a';c.lineWidth=4*s;for(let i=0;i<10;i++){const a=Math.PI*1.02+i/9*Math.PI*0.96;c.beginPath();c.moveTo(Math.cos(a)*13*s,Math.sin(a)*13*s);c.quadraticCurveTo(Math.cos(a)*25*s,Math.sin(a)*21*s,Math.cos(a)*21*s+(i<5?-7:7)*s+Math.sin(i*3)*3*s,Math.sin(a)*12*s+20*s+(i%3)*4*s);c.stroke();}
  c.fillStyle='#2a2a30';c.beginPath();c.arc(-7*s,-3*s,3.6*s,0,TAU);c.fill();c.fillStyle='#8a8a94';c.beginPath();c.arc(-8*s,-4*s,1.2*s,0,TAU);c.fill();
  c.strokeStyle='#2a1a10';c.lineWidth=2.2*s;seg(c,4*s,-6*s,10*s,0);seg(c,10*s,-6*s,4*s,0);c.strokeStyle='#5a2a1a';c.beginPath();c.moveTo(-5*s,8*s);c.lineTo(-1*s,7*s);c.lineTo(3*s,8.5*s);c.stroke();
  c.strokeStyle='#2a1a10';c.lineWidth=1*s;c.beginPath();c.moveTo(10*s,0);c.quadraticCurveTo(14*s,6*s,11*s,12*s+Math.sin(t*2)*1.5*s);c.stroke();c.restore();
  c.restore();}
// the mother: kneeling, the doll pressed to her chest — one forearm under it, the other hand holding it close; head bowed, eyes squeezed, shaking with sobs
function mother(c,t,x,y,s,o={}){const cr=o.kneel??70;const sob=Math.max(0,Math.sin(t*4.6))**2,sh=sob*3*s;
  fig2(c,{kind:'poorW',x,y:y+sh,s,f:1,t,view:'front',eyes:o.eyes||'closed',brow:'worried',mouth:o.mouth||'wobble',crouch:cr,lean:0,tilt:0.12,noArms:1,seed:21});
  const sy=y+sh+cr*s-200*s+4*s,shL={x:x-25*s,y:sy},shR={x:x+25*s,y:sy};const K=KIND2.poorW,armC=K.coat;
  ragDoll(c,x+3*s,sy+40*s,s,t,0.18+Math.sin(t*1.4)*0.03);
  limb2(c,shL,{x:x-36*s,y:sy+64*s},{x:x+20*s,y:sy+86*s},10,armC,s);fist2(c,{x:x+20*s,y:sy+86*s},s,K.limb);
  limb2(c,shR,{x:x+42*s,y:sy+50*s},{x:x+22*s,y:sy+50*s},10,shd(armC,0.06),s);fist2(c,{x:x+22*s,y:sy+50*s},s,K.limb);
  const hy=y+sh+cr*s-116*s-96*s-33*s;for(const [ex,off] of [[-9,0],[9,0.45]]){const ph=(t*0.5+off)%1;c.fillStyle='rgba(205,228,255,0.95)';c.strokeStyle=K2;c.lineWidth=1.4*s;c.beginPath();c.ellipse(x+(7+ex)*s,hy+2*s+ph*24*s,2.4*s,3.6*s,0,0,TAU);c.fill();c.stroke();
    c.strokeStyle='rgba(205,228,255,0.55)';c.lineWidth=1.6*s;seg(c,x+(7+ex)*s,hy-1*s,x+(7+ex)*s,hy+ph*24*s);}
  const fph=(t*0.7)%1;if(fph<0.6){c.fillStyle='rgba(205,228,255,0.9)';c.beginPath();c.arc(x+12*s,hy+30*s+fph*40*s,2.2*s,0,TAU);c.fill();}}
SH.eight=function(c,t){LIT('#b8c8e8','#1e222e');const t0=A(2)-0.05,u=t-t0;
  londonSt(c,t,{x:540,y:900,z:lerp(1.18,1.25,clamp(u/2))},{GY:1080,night:1,poor:1,lamps:false,world:(c2,GY)=>{
    rubble(c2,180,GY+120,520,t,3);rubble(c2,930,GY+90,420,t,6);for(let i=0;i<4;i++)stave(c2,80+i*280,GY+200+i*40,1.0,0.4+i*0.7);
    // neighbours in the background holding lanterns, silent
    for(const [x,k,sd] of [[120,'poorM2',31],[300,'poorW2',32],[860,'poorM',33],[1000,'poorW',34]]){BW(c2,k,x,GY+170,0.75,t,{f:x<540?1:-1,eyes:'closed',brow:'worried',mouth:'frown',seed:sd,hf:x<540?[30,-10]:[-30,-10]});const L=handAt(x,GY+170,0.75,x<540?[30,-10]:[-30,-10]);lantern(c2,L.x,L.y,0.75,t);}
    // a man with his cap off, head bowed; a woman's hand on the mother's shoulder
    BW(c2,'poorMb',760,GY+430,1.25,t,{f:-1,eyes:'closed',brow:'worried',mouth:'frown',hf:[-6,50],hb:[10,92],seed:35});smallCap(c2,760-6*1.25,GY+430-200*1.25+50*1.25,1.1,0.2);
    BW(c2,'poorW2',360,GY+400,1.2,t,{f:1,eyes:'closed',brow:'worried',mouth:'frown',hf:[90,58],seed:36});
    mother(c2,t,520,GY+520,1.45);
    floodSurf(c2,t,-1500,2600,GY+470,GY+1400,{flow:30,top:'#7a5a34',a:0.78,refl:0.3,foam:0.3});}});
  rain(c,t,0.3);coldGrade(c,0.4);
  const k=clamp((t-TW('eight')+0.1)/0.5);if(k>0){c.save();c.globalAlpha=k;c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=30;txt(c,'8 LIVES',540,470,130,'#ffffff',{sw:18,ls:8});c.restore();}vignette(c,0.65);};
// "Eight people died…" — close on the mother; slow push; rain; the lantern beside her
SH.died=function(c,t){LIT('#c8d4f0','#1a1e28');const t0=A(25)-0.05,u=t-t0;
  londonSt(c,t,{x:540,y:1000,z:lerp(1.0,1.05,clamp(u/1.5)),blur:5},{GY:1150,night:1,poor:1,lamps:false,world:(c2,GY)=>{rubble(c2,300,GY+100,600,t,1);floodSurf(c2,t,-1500,2600,GY+60,GY+900,{flow:30,top:'#7a5a34',refl:0.3,foam:0.3});}});
  c.fillStyle='rgba(10,12,20,0.35)';c.fillRect(0,0,W,H);
  const s=lerp(4.3,4.5,clamp(u/1.5));mother(c,t,550,600+225*s,s,{kneel:20});lantern(c,240,1260,2.2,t);
  rain(c,t,0.28);coldGrade(c,0.45);vignette(c,0.7);};
// refund split: grief on the left, the owner's money on the right
function eightCandlesHalf(c,t){c.fillStyle='#161a24';c.fillRect(0,0,540,H);c.save();c.beginPath();c.rect(0,0,540,H);c.clip();mother(c,t,290,640+225*3.4,3.4,{kneel:20});rain(c,t,0.25);coldGrade(c,0.45);c.restore();txt(c,'8 DEAD',270,330,96,'#ffffff',{sw:16});}
