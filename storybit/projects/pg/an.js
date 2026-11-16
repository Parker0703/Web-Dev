'use strict';
const ease=q=>q*q*(3-2*q);
// ===== Animals, ox cart, and reworked opening / powder / cart shots =====
// ---------- quadrupeds (side view, facing right, units = cm, ground y=0; k = px per cm) ----------
function _leg(c,P0,segs,ang,w,col,dark){// segs lengths, ang absolute angles from vertical (+ = forward)
  const pts=[P0];let p=P0;for(let i=0;i<segs.length;i++){p=[p[0]+Math.sin(ang[i])*segs[i],p[1]+Math.cos(ang[i])*segs[i]];pts.push(p);}
  c.lineCap='round';c.lineJoin='round';for(let pass=0;pass<2;pass++){for(let i=0;i<segs.length;i++){const a=pts[i],b=pts[i+1];c.strokeStyle=pass?col:OL;c.lineWidth=(w[i]+(pass?0:7));c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}}
  // joint shading + hoof
  c.fillStyle=shd(col,-0.12);for(let i=1;i<segs.length;i++){c.beginPath();c.arc(pts[i][0],pts[i][1],w[i]*0.3,0,TAU);c.fill();}
  const h=pts[pts.length-1],hw=w[w.length-1]*0.75;c.fillStyle='#2a2220';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(h[0]-hw,h[1]-10);c.lineTo(h[0]+hw+3,h[1]-10);c.lineTo(h[0]+hw+7,h[1]+3);c.lineTo(h[0]-hw-2,h[1]+3);c.closePath();c.fill();c.stroke();
  return pts;}
const QD={
  ox:{fore:{p:[70,-102],seg:[54,50],w:[26,18]},hind:{p:[-88,-112],seg:[44,40,40],w:[34,22,17]},stride:0.34,speed:5.2,
    col:'#a8784a',dark:'#7a5232',belly:'#d8b48a'},
  horse:{fore:{p:[76,-120],seg:[66,64],w:[22,13]},hind:{p:[-80,-128],seg:[52,52,50],w:[30,18,13]},stride:0.5,speed:13,
    col:'#7a4426',dark:'#4e2a16',belly:'#a86a44'}};
function _legAngles(type,ph,isHind){const st=QD[type].stride;const sw=Math.sin(ph),lift=Math.max(0,Math.cos(ph))*(type==='horse'?1.2:0.8);
  if(!isHind)return [sw*st, sw*st-lift*0.9];
  return [0.55+sw*st*0.8,-0.5+sw*st*0.6-lift*0.2,sw*st*0.5+lift*0.6];}
function _body(c,type){c.beginPath();
  if(type==='ox'){c.moveTo(-124,-126);c.bezierCurveTo(-60,-138,10,-134,62,-152);c.bezierCurveTo(88,-160,112,-148,126,-128);
    c.quadraticCurveTo(132,-110,126,-94);c.bezierCurveTo(122,-74,114,-52,100,-48);c.quadraticCurveTo(90,-50,84,-58);c.bezierCurveTo(40,-50,-20,-46,-62,-60);c.bezierCurveTo(-90,-62,-118,-72,-128,-98);c.quadraticCurveTo(-132,-114,-124,-126);}
  else{c.moveTo(-114,-142);c.bezierCurveTo(-60,-150,10,-138,70,-150);c.bezierCurveTo(98,-170,122,-206,150,-226);c.quadraticCurveTo(166,-236,176,-226);
    c.bezierCurveTo(196,-206,214,-180,222,-160);c.quadraticCurveTo(226,-146,214,-142);c.quadraticCurveTo(200,-140,192,-150);c.bezierCurveTo(180,-162,170,-176,160,-178);
    c.bezierCurveTo(140,-150,118,-118,100,-100);c.quadraticCurveTo(92,-82,80,-80);c.bezierCurveTo(30,-74,-30,-74,-62,-82);c.bezierCurveTo(-92,-86,-116,-96,-122,-120);c.quadraticCurveTo(-124,-134,-114,-142);}
  c.closePath();}
// draws one animal; returns {yoke:[x,y] (screen), neck:[x,y]}
function quad(c,x,y,k,t,type='ox',o={}){const Q=QD[type],ph=t*Q.speed+(o.phase||0);const col=o.col||Q.col,dark=o.dark||Q.dark,belly=o.belly||Q.belly;
  // gait: diagonal pairs; body height follows the lowest hoof so the animal stands on the ground
  const legs=[['fore',ph+Math.PI,0],['hind',ph,0],['fore',ph,1],['hind',ph+Math.PI,1]];
  let maxY=-1e9;const A=legs.map(([L,p,near])=>{const g=Q[L],ang=_legAngles(type,p,L==='hind');let pp=g.p;let yy=pp[1];for(let i=0;i<g.seg.length;i++)yy+=Math.cos(ang[i])*g.seg[i];maxY=Math.max(maxY,yy);return {L,ang,near};});
  const lift=-maxY;const bob=Math.sin(ph*2)*(type==='horse'?3:1.5);
  c.save();c.translate(x,y);c.scale(k,k);c.translate(0,lift+bob);c.lineJoin='round';
  const fd=shd(col,-0.3),fdd=shd(dark,-0.2);
  // far legs (darker) behind the body
  for(const a of A.filter(a=>!a.near)){const g=Q[a.L];_leg(c,[g.p[0]-6,g.p[1]],g.seg,a.ang,g.w,fd,fdd);}
  // tail
  const sw=Math.sin(t*3+(o.phase||0))*8;c.strokeStyle=OL;c.lineCap='round';
  if(type==='ox'){c.lineWidth=11;c.beginPath();c.moveTo(-124,-122);c.quadraticCurveTo(-138+sw*0.3,-80,-132+sw,-40);c.stroke();c.strokeStyle=dark;c.lineWidth=6;c.stroke();c.fillStyle='#2a1a12';c.beginPath();c.ellipse(-132+sw,-30,9,18,sw*0.02,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=3;c.stroke();}
  else{c.fillStyle='#1e1410';c.beginPath();c.moveTo(-114,-138);c.bezierCurveTo(-150,-130,-160+sw,-80,-150+sw*1.5,-40);c.lineTo(-136+sw,-44);c.bezierCurveTo(-140,-90,-130,-120,-110,-128);c.closePath();c.fill();c.strokeStyle=OL;c.lineWidth=4;c.stroke();c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=2;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-118-i*4,-134);c.quadraticCurveTo(-148-i*2+sw,-90,-140-i*3+sw*1.4,-48);c.stroke();}}
  // body
  _body(c,type);const g=c.createLinearGradient(0,-170,0,-40);g.addColorStop(0,shd(col,0.15));g.addColorStop(0.6,col);g.addColorStop(1,dark);c.fillStyle=g;c.fill();
  c.save();_body(c,type);c.clip();
  c.fillStyle=belly;c.globalAlpha=0.45;c.beginPath();c.ellipse(0,-50,90,22,0,0,TAU);c.fill();c.globalAlpha=1;
  // muscle and bone landmarks: shoulder blade, ribs, hip point, thigh
  c.strokeStyle='rgba(40,20,10,0.35)';c.lineWidth=3;
  if(type==='ox'){c.beginPath();c.moveTo(78,-140);c.quadraticCurveTo(52,-110,62,-70);c.stroke();for(let i=0;i<4;i++){c.beginPath();c.arc(20-i*22,-40,60,-2.2,-1.6);c.stroke();}c.beginPath();c.arc(-84,-118,12,0,TAU);c.stroke();c.beginPath();c.moveTo(-70,-110);c.quadraticCurveTo(-60,-80,-86,-62);c.stroke();
    c.strokeStyle='rgba(40,20,10,0.25)';for(let i=0;i<5;i++){c.beginPath();c.moveTo(118+i*5,-128+i*14);c.lineTo(110+i*5,-112+i*14);c.stroke();}}
  else{c.beginPath();c.moveTo(80,-146);c.quadraticCurveTo(58,-120,70,-86);c.stroke();c.beginPath();c.arc(-80,-128,10,0,TAU);c.stroke();c.beginPath();c.moveTo(-66,-120);c.quadraticCurveTo(-56,-96,-80,-80);c.stroke();c.beginPath();c.moveTo(120,-176);c.quadraticCurveTo(110,-140,92,-112);c.stroke();}
  c.fillStyle='rgba(255,255,255,0.18)';c.beginPath();c.ellipse(-10,-128,80,8,-0.03,0,TAU);c.fill();
  c.restore();c.strokeStyle=OL;c.lineWidth=7;_body(c,type);c.stroke();
  // head details
  if(type==='ox'){// dewlap fold, head (separate block angled down), horns, ear, eye, muzzle
    c.fillStyle=shd(col,-0.08);c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(122,-84);c.quadraticCurveTo(128,-50,104,-40);c.quadraticCurveTo(110,-60,108,-84);c.closePath();c.fill();c.stroke();
    const hp=new Path2D();hp.moveTo(118,-138);hp.bezierCurveTo(136,-150,158,-142,166,-120);hp.bezierCurveTo(174,-100,186,-84,190,-66);hp.quadraticCurveTo(192,-48,174,-46);hp.quadraticCurveTo(156,-46,148,-58);hp.bezierCurveTo(138,-72,124,-86,116,-104);hp.quadraticCurveTo(110,-124,118,-138);hp.closePath();
    const hg=c.createLinearGradient(120,-150,180,-50);hg.addColorStop(0,shd(col,0.12));hg.addColorStop(1,dark);c.fillStyle=hg;c.fill(hp);c.lineWidth=6;c.stroke(hp);
    c.fillStyle='#c89a86';c.beginPath();c.ellipse(178,-58,15,12,0.4,0,TAU);c.fill();c.lineWidth=3;c.stroke();c.fillStyle='#3a2420';c.beginPath();c.ellipse(184,-62,3.5,5,0.4,0,TAU);c.fill();
    c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.moveTo(186,-50);c.quadraticCurveTo(174,-46,162,-52);c.stroke();
    // curly forehead tuft
    c.strokeStyle=shd(col,-0.35);c.lineWidth=2.5;for(let i=0;i<4;i++){c.beginPath();c.arc(146+i*5,-128+i*4,5,0.5,3.6);c.stroke();}
    c.fillStyle='#efe2c4';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(132,-142);c.bezierCurveTo(132,-170,150,-188,172,-190);c.bezierCurveTo(158,-178,148,-160,146,-138);c.closePath();c.fill();c.stroke();c.fillStyle='#4a3a2a';c.beginPath();c.moveTo(166,-186);c.lineTo(172,-190);c.lineTo(164,-180);c.fill();
    c.fillStyle=col;c.beginPath();c.moveTo(124,-122);c.quadraticCurveTo(100,-130,88,-116);c.quadraticCurveTo(104,-106,126,-112);c.closePath();c.fill();c.stroke();c.fillStyle='#e8a8a0';c.beginPath();c.ellipse(104,-117,11,3.5,0.1,0,TAU);c.fill();
    c.fillStyle='#fff';c.beginPath();c.ellipse(150,-108,7.5,6.5,0.2,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=3;c.stroke();c.fillStyle='#1a1210';c.beginPath();c.arc(152,-107,4.2,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(153.5,-108.5,1.4,0,TAU);c.fill();c.beginPath();c.arc(150,-108,10,-2.7,-0.6);c.stroke();}
  else{// mane, forelock, ear, eye, nostril
    c.fillStyle='#1e1410';c.beginPath();c.moveTo(66,-150);c.bezierCurveTo(100,-176,126,-212,160,-232);c.lineTo(156,-216);c.bezierCurveTo(130,-196,108,-162,86,-140);c.closePath();c.fill();c.strokeStyle=OL;c.lineWidth=4;c.stroke();
    c.beginPath();c.moveTo(166,-230);c.quadraticCurveTo(178,-222,180,-206);c.quadraticCurveTo(168,-212,162,-222);c.fill();
    c.fillStyle=col;c.beginPath();c.moveTo(158,-226);c.lineTo(150,-250);c.lineTo(168,-232);c.closePath();c.fill();c.stroke();
    c.fillStyle='#1a1210';c.beginPath();c.ellipse(184,-198,6,5,0.3,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(186,-200,1.8,0,TAU);c.fill();
    c.fillStyle='#2a1a14';c.beginPath();c.ellipse(216,-156,4,6,0.4,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=3;c.beginPath();c.moveTo(214,-144);c.quadraticCurveTo(204,-142,196,-148);c.stroke();
    // bridle
    c.strokeStyle='#2a1a10';c.lineWidth=5;c.beginPath();c.moveTo(168,-226);c.lineTo(198,-150);c.moveTo(178,-190);c.lineTo(212,-176);c.stroke();c.fillStyle='#c8a830';c.beginPath();c.arc(200,-150,5,0,TAU);c.fill();}
  // near legs in front
  for(const a of A.filter(a=>a.near)){const g2=Q[a.L];_leg(c,g2.p,g2.seg,a.ang,g2.w,col,dark);}
  // yoke / collar
  let yoke=null,bit=null;
  if(type==='ox'){c.fillStyle='#6a4626';c.strokeStyle=OL;c.lineWidth=5;c.save();c.translate(100,-154);c.rotate(-0.2);rr(c,-26,-12,52,22,8);c.fill();c.stroke();c.restore();c.strokeStyle='#4a3018';c.lineWidth=6;c.beginPath();c.moveTo(90,-146);c.quadraticCurveTo(100,-84,118,-140);c.stroke();yoke=[100,-150];}
  else{c.fillStyle='#4a2e1a';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(100,-136,16,40,-0.55,0,TAU);c.fill();c.stroke();c.fillStyle='#c8a830';c.beginPath();c.arc(112,-158,5,0,TAU);c.fill();yoke=[100,-130];bit=[200,-150];}
  const m=c.getTransform();c.restore();const S2=(p)=>{const X=x+(p[0])*k,Y=y+(p[1]+lift+bob)*k;return {x:X,y:Y};};
  return {yoke:S2(yoke),bit:bit?S2(bit):null};}
// ---------- ox cart: plank bed with stake rails, two big spoked wheels ----------
// x,y = ground under the axle, U = px per metre. part: 'back' (bed, far rail, far wheel) or 'front' (near rail, near wheel, tongue)
function oxCart(c,x,y,U,t,part,o={}){const k=U/100;c.save();c.translate(x,y);c.scale(k,k);c.lineJoin='round';c.strokeStyle=OL;const bob=Math.abs(Math.sin(t*5.2))*2;c.translate(0,-bob);
  const wood='#8a6440',wd='#6a4a2a',wl='#a88058';
  const wheel=(cx,dark)=>{const R=62,rot=-(o.dist||0)/R;c.save();c.translate(cx,-R);c.fillStyle=dark?shd(wd,-0.3):wd;c.lineWidth=7;c.beginPath();c.arc(0,0,R,0,TAU);c.fill();c.stroke();c.fillStyle=dark?shd(wood,-0.3):wood;c.beginPath();c.arc(0,0,R-10,0,TAU);c.fill();c.stroke();
    c.strokeStyle='#3a2a1a';c.lineWidth=3;c.beginPath();c.arc(0,0,R-3,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=rot+i/12*TAU;c.fillStyle='#2a2a2e';c.beginPath();c.arc(Math.cos(a)*(R-3),Math.sin(a)*(R-3),2.4,0,TAU);c.fill();}
    c.save();c.beginPath();c.arc(0,0,R-10,0,TAU);c.clip();for(let i=0;i<10;i++){const a=rot+i/10*TAU;c.strokeStyle=OL;c.lineWidth=11;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*R,Math.sin(a)*R);c.stroke();c.strokeStyle=dark?shd(wl,-0.3):wl;c.lineWidth=6;c.stroke();}c.restore();
    c.fillStyle=dark?'#3a2a1a':'#5a3e24';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(0,0,15,0,TAU);c.fill();c.stroke();c.fillStyle='#2a2a2e';c.beginPath();c.arc(0,0,6,0,TAU);c.fill();c.restore();};
  const rail=(dark,dy=0)=>{const cw=dark?shd(wood,-0.3):wood;c.lineWidth=5;for(let i=0;i<7;i++){const sx=-128+i*40;c.fillStyle=cw;c.beginPath();rr(c,sx-5,-150+dy,10,58,2);c.fill();c.stroke();}
    for(const ry of [-148,-118]){c.fillStyle=cw;c.beginPath();rr(c,-138,ry+dy,262,12,3);c.fill();c.stroke();c.strokeStyle='rgba(30,16,6,0.4)';c.lineWidth=2;c.beginPath();c.moveTo(-130,ry+dy+6);c.lineTo(116,ry+dy+6);c.stroke();c.strokeStyle=OL;c.lineWidth=5;}};
  if(part==='back'){wheel(-6,1);c.save();c.translate(-12,-10);rail(1);c.restore();
    // bed floor with plank seams, hay heaped inside
    c.fillStyle=wd;c.lineWidth=6;c.beginPath();rr(c,-140,-96,266,18,4);c.fill();c.stroke();c.fillStyle='#d8b860';c.beginPath();c.moveTo(-134,-96);for(let i=0;i<=12;i++)c.lineTo(-134+i*21,-104-8*hash(i*3.1)-(i>3&&i<9?10:0));c.lineTo(120,-96);c.closePath();c.fill();c.strokeStyle='rgba(120,90,20,0.6)';c.lineWidth=2;for(let i=0;i<14;i++){const hx=-130+i*18;c.beginPath();c.moveTo(hx,-98);c.lineTo(hx+6,-110);c.stroke();}}
  else{// tongue to the yoke, near rail, near wheel
    if(o.tongue){const T=o.tongue;c.strokeStyle=OL;c.lineWidth=14;c.beginPath();c.moveTo(118,-86);c.lineTo((T.x-x)/k,(T.y-y)/k+bob);c.stroke();c.strokeStyle=wd;c.lineWidth=8;c.stroke();}
    c.fillStyle=wood;c.lineWidth=6;c.beginPath();rr(c,-142,-92,270,22,4);c.fill();c.stroke();c.strokeStyle='rgba(30,16,6,0.45)';c.lineWidth=2.5;for(let i=1;i<6;i++){c.beginPath();c.moveTo(-142+i*45,-90);c.lineTo(-142+i*45,-72);c.stroke();}
    rail(0);wheel(0,0);}
  c.restore();}
// ---------- reworked shots ----------
// 1 · OPEN: face in the lamplight → the spark → the blast → slow-motion: the rod goes through → it spins away and spears the dirt; he's down, then his hand moves
{const o0=S.open;S.open=(c,t,u,d)=>{const tm=wt('survived'),tir=wt('iron'),tth=wt('through'),tbr=wt('brain');const T1=0.5,T2=1.25,T3=2.2,T4=2.85;
  const K=KIND2.gage;
  if(t<T1){// extreme close-up: focused face lit from below, the rod bobbing beside him
    cam(c,'rr_rock',{z:2.6,x:520,y:700});c.restore();tint(c,'rgba(20,10,6,0.6)','multiply');const s=8.2,hx=620,hy=900;const tap=Math.abs(Math.sin(t*16));
    who(c,'gage',[0,0,0],X('focus','angry','grit',{abs:{x:hx,y:hy+255*s,s},view:'3q',f:-1,hf:[12,93],hb:[-12,93],tilt:-0.06}));
    // sweat bead on the temple
    c.fillStyle='rgba(220,240,255,0.9)';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(hx+250,hy-60+t*120);c.quadraticCurveTo(hx+266,hy-30+t*120,hx+250,hy-18+t*120);c.quadraticCurveTo(hx+234,hy-30+t*120,hx+250,hy-60+t*120);c.fill();c.stroke();
    tampIron(c,{x:170,y:2200-tap*60},{x:230,y:760-tap*60},4.4);fist2(c,{x:196,y:1700-tap*60},7,KIND2.gage.coat);
    const lg=c.createLinearGradient(0,1900,0,700);lg.addColorStop(0,'rgba(255,150,60,0.55)');lg.addColorStop(1,'rgba(255,150,60,0)');c.save();c.globalCompositeOperation='soft-light';c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();
    if(t>T1-0.12){const q=(t-(T1-0.12))/0.12;glow(c,190,1900,520*q,'255,200,120',0.9);sparks(c,190,1860,q,22,3);}
    c.fillStyle=`rgba(0,0,0,${1-ON(t,0,0.18)})`;c.fillRect(0,0,W,H);cine(c,t,{v:0.75});return;}
  if(t<T2){// the blast: close on the drill hole, the rock cracks, fire and stone burst out
    const q=(t-T1)/(T2-T1),sh=(1-q)*30;c.save();c.translate(nz(t*40,1)*sh,nz(t*40,2)*sh);
    cam(c,'rr_rock',{z:2.8,x:540,y:1100});c.restore();tint(c,'rgba(30,10,4,0.5)','multiply');
    // cracked boulder face
    c.fillStyle='#8a8478';c.strokeStyle=OL;c.lineWidth=8;c.beginPath();c.moveTo(-40,1460);c.quadraticCurveTo(300,1250,560,1240);c.quadraticCurveTo(860,1250,1120,1440);c.lineTo(1120,2000);c.lineTo(-40,2000);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(30,26,22,0.8)';c.lineWidth=5;for(let i=0;i<9;i++){const a=Math.PI*(0.05+i*0.11);let px=540,py=1250;c.beginPath();c.moveTo(px,py);for(let j=0;j<5;j++){px+=Math.cos(a+(hash(i*5+j)-0.5)*0.7)*60*q*1.6;py+=Math.abs(Math.sin(a+(hash(i*5+j)-0.5)*0.7))*50*q*1.6;c.lineTo(px,py);}c.stroke();}
    // fireball + shock ring
    c.save();c.globalCompositeOperation='lighter';const R=150+q*900;const fg=c.createRadialGradient(540,1240,0,540,1240,R);fg.addColorStop(0,'rgba(255,250,220,1)');fg.addColorStop(0.25,'rgba(255,190,80,0.95)');fg.addColorStop(0.6,'rgba(230,80,20,0.6)');fg.addColorStop(1,'rgba(120,20,0,0)');c.fillStyle=fg;c.beginPath();c.arc(540,1240,R,0,TAU);c.fill();
    c.strokeStyle=`rgba(255,230,180,${0.8*(1-q)})`;c.lineWidth=30*(1-q)+4;c.beginPath();c.ellipse(540,1250,R*0.9,R*0.32,0,0,TAU);c.stroke();c.restore();
    // rock chunks
    for(let i=0;i<22;i++){const a=-Math.PI*(0.1+0.8*hash(i*1.7)),v=600+hash(i*3.1)*1400;const px=540+Math.cos(a)*v*q*0.6,py=1240+Math.sin(a)*v*q*0.6+900*q*q;const r=10+hash(i*7)*26;c.save();c.translate(px,py);c.rotate(q*10*(hash(i)-0.5));c.fillStyle=i%4?'#7a746a':'#a49c8c';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();for(let j=0;j<6;j++){const b=j/6*TAU;c.lineTo(Math.cos(b)*r*(0.7+0.4*hash(i*9+j)),Math.sin(b)*r*(0.7+0.4*hash(i*9+j)));}c.closePath();c.fill();c.stroke();c.restore();}
    // the rod leaves the hole like a bullet
    const ry=lerp(1240,-500,Math.min(1,q*1.6));tampIron(c,{x:540,y:ry+760},{x:532,y:ry},3.4,1);
    c.save();c.globalCompositeOperation='lighter';const tg=c.createLinearGradient(0,ry,0,1300);tg.addColorStop(0,'rgba(255,230,180,0.7)');tg.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=tg;c.fillRect(505,ry,60,1300-ry);c.restore();
    smokePuffs(c,540,1240,q);flash(c,Math.max(0,1-q*4),'#fff');c.restore();cine(c,t,{v:0.6});return;}
  if(t<T3){// slow motion, profile: the rod passes up through his head
    const q=(t-T2)/(T3-T2);cam(c,'rr_dusk',{z:2.6,x:540,y:900});c.restore();
    c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.55)';c.fillRect(0,0,W,H);c.restore();tint(c,'rgba(120,20,10,0.35)','multiply');
    speedLines(c,t,0.6,540,600);
    const s=5.4,hcx=520,hcy=1080,R=52*s;const back=ease(clamp(q*1.4))*0.35;
    who(c,'gage',[0,0,0],X(q<0.35?'shock':'closed','up',q<0.35?'o':'grit',{abs:{x:hcx,y:hcy+255*s,s},view:'3q',f:1,noHat:1,hf:[12,93],hb:[-12,93],tilt:-back}));
    // rod path through the head (tilted with it): under the left cheekbone → behind the eye → out the top
    const rot=(p)=>{const dx=p.x-hcx,dy=p.y-(hcy+255*s*0.0);return p;};
    const en={x:hcx+0.5*R,y:hcy+0.42*R},ex={x:hcx+0.22*R,y:hcy-1.0*R};const dx=ex.x-en.x,dy=ex.y-en.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;
    const tipD=lerp(-0.2,2.6,q)*L;const tip={x:en.x+ux*tipD,y:en.y+uy*tipD},tail={x:tip.x-ux*1050,y:tip.y-uy*1050};
    c.save();c.beginPath();c.rect(0,0,W,H);c.arc(hcx-10,hcy,R*1.02,0,TAU,true);c.clip('evenodd');tampIron(c,tail,tip,4.6);c.restore();
    if(tipD>L){const k2=clamp((tipD-L)/(L*1.2));c.save();for(let i=0;i<26;i++){const a=Math.atan2(uy,ux)+(hash(i*2.3)-0.5)*1.4,v=(80+hash(i*4.1)*360)*k2;const px=ex.x+Math.cos(a)*v,py=ex.y+Math.sin(a)*v+200*k2*k2;c.fillStyle=i%3?'#7a0c12':'#f2e8d6';c.beginPath();c.ellipse(px,py,5+hash(i)*8,3+hash(i*2)*4,a,0,TAU);c.fill();}
      c.fillStyle='rgba(120,10,16,0.45)';c.beginPath();c.ellipse(ex.x,ex.y-20*k2,60*k2+10,24*k2+6,Math.atan2(uy,ux),0,TAU);c.fill();c.restore();
      // the bowler flies off
      const hp={x:hcx+40+200*k2,y:hcy-R*1.05-380*k2};c.save();c.translate(hp.x,hp.y);c.rotate(k2*2.2);hatDraw(c,K,R,1,'3q',R/126,0);c.restore();}
    else{c.save();c.translate(hcx,hcy);c.rotate(-back);hatDraw(c,K,R,1,'3q',R/126,0);c.restore();}
    if(tipD>0&&tipD<L*1.2){c.fillStyle='rgba(110,10,16,0.75)';c.beginPath();c.ellipse(en.x,en.y,16,9,0.3,0,TAU);c.fill();}
    glow(c,ex.x,ex.y,220*(tipD>L?1:0),'255,90,60',0.45);
    c.fillStyle=`rgba(255,255,255,${Math.max(0,1-q*6)})`;c.fillRect(0,0,W,H);
    const lb=0.25*Math.sin(q*Math.PI);c.fillStyle=`rgba(140,0,0,${lb})`;c.fillRect(0,0,W,H);cine(c,t,{v:0.8});return;}
  if(t<T4){// up in the dusk sky the rod spins, blood trailing; then drops
    const q=(t-T3)/(T4-T3);const sk=c.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#1a1430');sk.addColorStop(0.55,'#c0502a');sk.addColorStop(1,'#f0a050');c.fillStyle=sk;c.fillRect(0,0,W,H);
    for(let i=0;i<6;i++){const px=(i*260+t*60)%1500-200,py=260+i*170;const g=c.createRadialGradient(px,py,0,px,py,300);g.addColorStop(0,'rgba(60,24,40,0.45)');g.addColorStop(1,'rgba(60,24,40,0)');c.save();c.translate(px,py);c.scale(1,0.22);c.translate(-px,-py);c.fillStyle=g;c.beginPath();c.arc(px,py,300,0,TAU);c.fill();c.restore();}
    const cx=540+q*120,cy=lerp(1300,700,Math.sin(q*Math.PI*0.6)),a=q*7.5;c.save();c.translate(cx,cy);c.rotate(a);tampIron(c,{x:-420,y:0},{x:420,y:0},3.3);c.restore();
    for(let i=0;i<20;i++){const qq=q-i*0.02;if(qq<0)continue;const aa=qq*7.5,px=540+qq*120+Math.cos(aa)*420,py=lerp(1300,700,Math.sin(qq*Math.PI*0.6))+Math.sin(aa)*420+i*6;c.fillStyle=`rgba(120,10,16,${0.7-i*0.03})`;c.beginPath();c.arc(px,py,7-i*0.25,0,TAU);c.fill();}
    birds(c,t,5);cine(c,t,{v:0.6});return;}
  // the rod spears the dirt; he lies in the dust; then his hand rises
  const q=t-T4;cam(c,'rr_wide',{z:K3(q,1,1.45,1.56),x:470,y:1120});const shk=Math.max(0,1-q*5)*14;
  lieAt(c,'gage',[0.5,0.05,1.1],[0.0,0.05,1.0],X('xx','__none','tongue',{view:'front',noHat:1,hf:[-70,30+(t>tbr+0.25?Math.sin(t*14)*12:0)],hb:[60,40]}));
  const rp=pp([1.35,0,0.75]);c.restore();const land=clamp(q/0.12);const k=rp.s/2.2*1.6;c.save();c.translate(rp.x+nz(t*50,1)*shk,rp.y);c.rotate(0.38);tampIron(c,{x:0,y:-900*(1-land)+30*k},{x:0,y:-900*(1-land)-360*k},k*1.4);c.restore();
  if(land>=1){const dq=clamp((q-0.12)/0.7);c.save();c.globalAlpha=1-dq;for(let i=0;i<16;i++){const a=-Math.PI*hash(i*1.3),r=dq*(80+hash(i*2.7)*200);const px=rp.x+Math.cos(a)*r,py=rp.y+Math.sin(a)*r*0.4,R=16+40*dq;const g=c.createRadialGradient(px,py,0,px,py,R);g.addColorStop(0,'rgba(200,170,130,0.7)');g.addColorStop(1,'rgba(200,170,130,0)');c.fillStyle=g;c.beginPath();c.arc(px,py,R,0,TAU);c.fill();}c.restore();}
  dust(c,t,700,1500,0.5,'210,190,160',16);cine(c,t,{v:0.65,tint:'rgba(255,170,120,0.14)'});};S.open.t0=o0.t0;}
function smokePuffs(c,x,y,q){c.save();for(let i=0;i<16;i++){const a=-Math.PI*(0.1+0.8*hash(i*3.3)),r=q*(220+hash(i*5.5)*460),px=x+Math.cos(a)*r,py=y+Math.sin(a)*r*0.7,R=80+q*200*(0.5+hash(i));const g=c.createRadialGradient(px,py,0,px,py,R);g.addColorStop(0,`rgba(80,70,64,${0.55*(1-q*0.5)})`);g.addColorStop(1,'rgba(80,70,64,0)');c.fillStyle=g;c.beginPath();c.arc(px,py,R,0,TAU);c.fill();}c.restore();}
// 6 · packing powder: the flask tips, black grains pour into the drill hole (cut-away shows it filling), then the rod goes in and tamps
function _rockCut(c,hx,hy,K,fill,o={}){// big boulder face with a cut-away of the drill hole; hx,hy = hole mouth; K = scale
  c.save();c.lineJoin='round';const rg=c.createLinearGradient(0,hy-60*K,0,hy+700*K);rg.addColorStop(0,'#a8a294');rg.addColorStop(1,'#6a665c');c.fillStyle=rg;c.strokeStyle=OL;c.lineWidth=8;
  c.beginPath();c.moveTo(hx-620*K,hy+760*K);c.lineTo(hx-560*K,hy+120*K);c.quadraticCurveTo(hx-360*K,hy-30*K,hx,hy-12*K);c.quadraticCurveTo(hx+380*K,hy-10*K,hx+560*K,hy+160*K);c.lineTo(hx+620*K,hy+760*K);c.closePath();c.fill();c.stroke();
  // granite speckle + facets
  c.save();c.clip();for(let i=0;i<220;i++){c.fillStyle=i%3?'rgba(40,36,32,0.35)':'rgba(255,255,255,0.25)';c.fillRect(hx+(hash(i*1.3)-0.5)*1200*K,hy+hash(i*2.1)*760*K,4*K+1,3*K+1);}
  c.strokeStyle='rgba(40,36,32,0.25)';c.lineWidth=4;for(let i=0;i<6;i++){c.beginPath();c.moveTo(hx+(-500+i*190)*K,hy+(40+hash(i)*80)*K);c.lineTo(hx+(-440+i*200)*K,hy+(400+hash(i*3)*200)*K);c.stroke();}
  // cut-away panel: lighter cut face with the shaft
  const cw=58*K,dep=560*K;const cg=c.createLinearGradient(hx-150*K,0,hx+150*K,0);cg.addColorStop(0,'#9a9486');cg.addColorStop(0.5,'#b4ae9e');cg.addColorStop(1,'#8a8476');c.fillStyle=cg;c.beginPath();c.moveTo(hx-150*K,hy+30*K);c.lineTo(hx+150*K,hy+30*K);c.lineTo(hx+150*K,hy+dep+60*K);c.lineTo(hx-150*K,hy+dep+60*K);c.closePath();c.fill();
  c.strokeStyle='rgba(120,110,96,0.6)';c.lineWidth=3;for(let i=0;i<10;i++){c.beginPath();c.moveTo(hx-150*K,hy+(60+i*55)*K);c.lineTo(hx-cw/2,hy+(70+i*55)*K);c.moveTo(hx+cw/2,hy+(50+i*55)*K);c.lineTo(hx+150*K,hy+(62+i*55)*K);c.stroke();}
  {const sg=c.createLinearGradient(hx-cw/2,0,hx+cw/2,0);sg.addColorStop(0,'#1a1714');sg.addColorStop(0.5,'#3a342e');sg.addColorStop(1,'#14120f');c.fillStyle=sg;c.fillRect(hx-cw/2,hy,cw,dep);}
  // powder fill rising from the bottom
  if(fill>0){const fh=dep*fill;c.fillStyle='#141210';c.fillRect(hx-cw/2,hy+dep-fh,cw,fh);c.fillStyle='rgba(90,84,76,0.6)';for(let i=0;i<60;i++){const py=hy+dep-hash(i*1.7)*fh;c.fillRect(hx-cw/2+hash(i*2.9)*cw,py,3,3);}
    c.fillStyle='#141210';c.beginPath();c.ellipse(hx,hy+dep-fh,cw/2,7*K,0,0,TAU);c.fill();}
  c.strokeStyle=OL;c.lineWidth=6;c.strokeRect(hx-150*K,hy+30*K,300*K,dep+30*K);c.lineWidth=5;c.strokeRect(hx-cw/2,hy,cw,dep);
  c.fillStyle='#0e0c0a';c.beginPath();c.ellipse(hx,hy,cw/2+4,12*K,0,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=5;c.stroke();
  c.restore();c.restore();return {dep,cw};}
{const o0=S.tamp;S.tamp=(c,t,u,d)=>{const t0=S.tamp.t0,ta=wt('a',21.0),tr=wt('rock',t0),t13=wt('13-pound',t0);
  if(t<ta+0.05){// medium close: Gage crouched behind the rock, pouring
    const q=(t-t0)/(ta+0.05-t0);cam(c,'rr_rock',{z:K3(q,1,2.0,2.15),x:560,y:900});c.restore();
    const s=3.9;const r=who(c,'gage',[0,0,0],X('focus','flat','flat',{abs:{x:330,y:1700,s},view:'3q',f:1,lean:0.2,crouch:24,hf:[78,30],hb:[40,64]}));
    const hx=r?r.hf.x+150:720,hy=r?r.hf.y+300:1300;const fill=0.06+0.36*ON(t,t0+0.4,ta-t0-0.4);
    _rockCut(c,hx,hy,1.05,fill);
    if(r){const k=r.s/3.4*2.6,rot=0.95+Math.sin(t*3)*0.05;powderFlask(c,r.hf.x+40,r.hf.y+6,k,rot);const sp={x:r.hf.x+40+Math.cos(rot)*52*k-Math.sin(rot)*(-2)*k,y:r.hf.y+6+Math.sin(rot)*52*k+Math.cos(rot)*(-2)*k};
      // the grain stream: a dark ribbon plus falling grains, into the hole mouth
      c.save();c.strokeStyle='rgba(20,18,16,0.85)';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(sp.x,sp.y);c.quadraticCurveTo(sp.x+(hx-sp.x)*0.2,sp.y+40,hx,hy);c.stroke();
      c.fillStyle='#1a1816';for(let i=0;i<30;i++){const f=((t*2.2+hash(i*3.7))%1);const px=lerp(sp.x,hx,f*f)+(hash(i)-0.5)*10,py=lerp(sp.y,hy,f);c.beginPath();c.arc(px,py,2.6+hash(i*2)*2,0,TAU);c.fill();}
      for(let i=0;i<8;i++){const f=((t*3+hash(i*5.1))%1);c.fillStyle=`rgba(40,36,32,${1-f})`;c.beginPath();c.arc(hx+(hash(i)-0.5)*40*f,hy-6-f*12,3,0,TAU);c.fill();}c.restore();
      hands(c,r,KIND2.gage);}
    cine(c,t,{v:0.6});return;}
  // close-up: the rod goes into the hole and tamps — his hands on the iron
  const q=t-ta;cam(c,'rr_rock',{z:3.2,x:560,y:1000});c.restore();tint(c,'rgba(20,14,10,0.3)','multiply');
  const hx=560,hy=1180,K=1.7;const R=_rockCut(c,hx,hy,K,0.42);
  const ins=ON(t,ta,0.6);const tap=t>ta+0.6?Math.max(0,Math.sin((t-ta-0.6)*9)):0;const depth=lerp(-300,R.dep*0.5,ins)-tap*90;
  const tip={x:hx,y:hy+depth},top={x:hx-10,y:tip.y-1400};
  c.save();c.beginPath();c.rect(0,0,W,hy);c.rect(hx-R.cw/2,hy,R.cw,R.dep);c.clip();tampIron(c,tip,top,3.8);c.restore();
  // hands gripping the iron, sleeves from the left
  for(const [yy,sx] of [[tip.y-1120,-60],[tip.y-820,-120]]){c.save();c.lineCap='round';c.strokeStyle=OL;c.lineWidth=96;c.beginPath();c.moveTo(sx,yy-260);c.quadraticCurveTo(hx-260,yy-120,hx-40,yy);c.stroke();c.strokeStyle=KIND2.gage.coat;c.lineWidth=84;c.stroke();c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=30;c.beginPath();c.moveTo(sx,yy-230);c.quadraticCurveTo(hx-260,yy-90,hx-40,yy+20);c.stroke();c.restore();
    c.fillStyle='#f2ead8';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.ellipse(hx-62,yy+2,22,46,-0.5,0,TAU);c.fill();c.stroke();fist2(c,{x:hx,y:yy},7.2,KIND2.gage.coat);}
  if(tap>0.95){dust(c,t,hx,hy,0.4,'120,110,100',10);}
  if(t>t13-0.1){const k=popK(t,t13-0.1);c.save();c.translate(860,1600);c.scale(k,k);panel(c,-150,-110,300,220,{r:36,fill:'rgba(10,10,14,0.85)'});c.fillStyle='#4a4e56';c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(-70,70);c.lineTo(70,70);c.lineTo(50,-30);c.lineTo(-50,-30);c.closePath();c.fill();c.stroke();c.beginPath();c.arc(0,-46,20,0,TAU);c.stroke();txt(c,'13 lb',0,30,48,'#fff',{stroke:false});c.restore();}
  cine(c,t,{v:0.55});};S.tamp.t0=o0.t0;}
// 9 · ox cart into town: big pair of oxen, Gage sitting up in the cart, talking; driver on the front bench with a goad
{const o0=S.cart;S.cart=(c,t,u,d)=>{const t0=S.cart.t0,tt=wt('talking',t0);cam(c,'road',{z:K3(u,d,1.1,1.18),x:540,y:1000});c.restore();
  const mid=t0+d*0.5,close=t>mid;const gy=close?1760:1560,U=close?430:200,dist=(t-t0)*130,sc=U/210;
  c.save();c.fillStyle='rgba(150,110,70,0.5)';c.fillRect(0,gy-40*sc,W,600);c.strokeStyle='rgba(80,50,30,0.35)';c.lineWidth=5;c.lineCap='round';for(let i=0;i<14;i++){const x=((hash(i)*1400-dist*1.6*sc)%1400+1400)%1400-160,y=gy-20+hash(i*3)*300;c.beginPath();c.moveTo(x,y);c.lineTo(x+50+hash(i*5)*70,y);c.stroke();}c.restore();
  const cx=close?450:200;c.fillStyle='rgba(40,24,10,0.35)';c.beginPath();c.ellipse(close?540:560,gy+8,close?700:560,36*sc,0,0,TAU);c.fill();
  let ox1={yoke:{x:W+200,y:gy-1.4*U}};
  if(!close){quad(c,700,gy-30,U/100*0.9,t,'ox',{phase:1.3,col:'#7a5a3e',dark:'#54382a',belly:'#a88a68'});ox1=quad(c,640,gy,U/100,t,'ox');}
  oxCart(c,cx,gy,U,t,'back',{dist});
  const bob=Math.abs(Math.sin(t*5.2))*2*U/100;const railTop=gy-1.48*U-bob;
  const G=who(c,'gageHurt',[0,0,0],X(t>tt?'happy':'dot','up',t>tt&&Math.sin(t*14)>0?'o':'grin',{abs:{x:cx-0.3*U,y:railTop+0.46*305*1.25*sc,s:1.25*sc},view:'3q',f:1,hf:t>tt?[50,-20+Math.sin(t*6)*20]:[14,80],hb:[-14,80],tilt:Math.sin(t*5.2)*0.03}));
  const D=who(c,'driver',[0,0,0],X(t>tt?'dot':'shock','up',t>tt?'smirk':'o',{abs:{x:cx+0.95*U,y:railTop+0.46*305*1.2*sc,s:1.2*sc},view:'3q',f:-1,hf:[-40,10],hb:[30,40],tilt:Math.sin(t*5.2+1)*0.03}));
  oxCart(c,cx,gy,U,t,'front',{dist,tongue:ox1.yoke});
  if(D){c.save();c.strokeStyle=OL;c.lineWidth=9*sc;c.lineCap='round';c.beginPath();c.moveTo(D.hf.x,D.hf.y);c.lineTo(D.hf.x+330*sc,D.hf.y-90*sc);c.stroke();c.strokeStyle='#8a6a3a';c.lineWidth=4*sc;c.stroke();c.restore();hands(c,D,KIND2.driver);}
  if(G)hands(c,G,KIND2.gageHurt);
  dust(c,t,cx-200,gy-20,0.5,'200,170,120',10);cine(c,t,{v:0.5});};S.cart.t0=o0.t0;}
// 4 · Vermont crew: Tom's pickaxe at full size, detailed
function pickaxe(c,hand,ang,k){c.save();c.translate(hand.x,hand.y);c.rotate(ang);c.lineCap='round';c.lineJoin='round';
  // ash handle with grain
  c.strokeStyle=OL;c.lineWidth=26*k;c.beginPath();c.moveTo(-90*k,0);c.lineTo(250*k,0);c.stroke();const hg=c.createLinearGradient(0,-9*k,0,9*k);hg.addColorStop(0,'#d8b07a');hg.addColorStop(1,'#8a6036');c.strokeStyle=hg;c.lineWidth=16*k;c.stroke();
  c.strokeStyle='rgba(90,56,26,0.5)';c.lineWidth=2*k;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-60*k+i*55*k,-3*k);c.quadraticCurveTo(-30*k+i*55*k,2*k,0+i*55*k,-2*k);c.stroke();}
  // steel head: pointed pick on one side, chisel adze on the other, eye collar
  c.translate(240*k,0);const sg=c.createLinearGradient(-20*k,-120*k,20*k,120*k);sg.addColorStop(0,'#c8ccd4');sg.addColorStop(0.5,'#6a6e78');sg.addColorStop(1,'#3a3c44');c.fillStyle=sg;c.strokeStyle=OL;c.lineWidth=7*k;
  c.beginPath();c.moveTo(-16*k,-20*k);c.quadraticCurveTo(-30*k,-90*k,-70*k,-150*k);c.quadraticCurveTo(-8*k,-110*k,16*k,-20*k);c.lineTo(18*k,20*k);c.quadraticCurveTo(-4*k,90*k,-40*k,132*k);c.lineTo(-62*k,120*k);c.quadraticCurveTo(-24*k,80*k,-18*k,20*k);c.closePath();c.fill();c.stroke();
  c.fillStyle='#4a4c54';c.beginPath();rr(c,-24*k,-26*k,48*k,52*k,8*k);c.fill();c.stroke();c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=3*k;c.beginPath();c.moveTo(-10*k,-30*k);c.quadraticCurveTo(-24*k,-90*k,-58*k,-138*k);c.stroke();c.restore();}
{const o0=S.vt;S.vt=(c,t,u,d)=>{const t0=S.vt.t0;cam(c,'rr_wide',{z:K3(u,d,1.0,1.08),x:540,y:K3(u,d,980,1000)});
  const ph=(t*1.6)%1,sw=ph<0.55?ease(ph/0.55):1-ease((ph-0.55)/0.45);// raise slowly, strike fast
  const VT=cast(c,[['tom',[-0.1,0,1.3],X('focus','flat',sw>0.8?'grit':'flat',{view:'3q',f:1,crouch:12+sw*6,hf:[lerp(70,30,sw),lerp(40,-80,sw)],hb:[lerp(40,10,sw),lerp(50,-60,sw)]})],['will',[1.4,0,1.2],X('focus','flat','flat',{view:'3q',f:-1,crouch:24,lean:0.1,hf:[-40,80],hb:[-10,84]})]]);
  if(VT&&VT[0]){const r=VT[0];const a=lerp(0.5,-1.9,sw);pickaxe(c,r.hb,a,r.s/3.4*1.15);hands(c,r,KIND2.tom);if(ph<0.06)chips(c,r.hb.x+Math.cos(0.5)*280*r.s/3.4,r.hb.y+Math.sin(0.5)*280*r.s/3.4,ph/0.06,10,3,['#8a8478','#a49c8c']);}
  c.restore();birds(c,t,7);godrays(c,900,-60,0.25,'255,220,170');chip(c,540,1640,'VERMONT · 1848',popK(t,t0+0.1),{col:'#ffd8a0'});cine(c,t,{v:0.5});};S.vt.t0=o0.t0;}
// ---------- cover: X-ray proof above, the man himself below, title in the centre ----------
SHOTS.push([201,(c,t)=>{T=3.3;
  const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#03101e');bg.addColorStop(0.4,'#0e1a2e');bg.addColorStop(0.58,'#2a1020');bg.addColorStop(0.75,'#6a1a14');bg.addColorStop(1,'#b03a1c');c.fillStyle=bg;c.fillRect(0,0,W,H);
  const rg=c.createRadialGradient(330,1560,60,330,1560,760);rg.addColorStop(0,'rgba(255,150,70,0.75)');rg.addColorStop(1,'rgba(255,90,40,0)');c.fillStyle=rg;c.fillRect(0,900,W,H-900);
  // X-ray skull, upper right, fading out above the title
  c.save();c.beginPath();c.rect(0,0,W,1000);c.clip();
  c.strokeStyle='rgba(90,170,230,0.08)';c.lineWidth=2;for(let i=0;i<=12;i++){c.beginPath();c.moveTo(0,i*80);c.lineTo(W,i*80);c.stroke();}for(let i=0;i<=14;i++){c.beginPath();c.moveTo(i*80,0);c.lineTo(i*80,960);c.stroke();}
  const sx=690,sy=470,sc=1.32;const K2=xraySkull(c,sx,sy,sc,t,{frontal:1,hole:1,crack:1});
  const dx=K2.top.x-K2.cheek.x,dy=K2.top.y-K2.cheek.y,l=Math.hypot(dx,dy),ux=dx/l,uy=dy/l;
  c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,70,50,0.45)';c.lineWidth=56;c.lineCap='round';c.beginPath();c.moveTo(K2.cheek.x,K2.cheek.y);c.lineTo(K2.top.x,K2.top.y);c.stroke();c.restore();
  _xrod(c,{x:K2.cheek.x-ux*520,y:K2.cheek.y-uy*520},{x:K2.top.x+ux*190,y:K2.top.y+uy*190},1.2);
  for(const P of [K2.cheek,K2.top])ring(c,P.x,P.y,52,0.95,'rgba(255,90,70,',7);
  c.restore();{const fd=c.createLinearGradient(0,720,0,990);fd.addColorStop(0,'rgba(28,21,39,0)');fd.addColorStop(1,'rgba(28,21,39,1)');c.fillStyle=fd;c.fillRect(0,720,W,270);const f2=c.createLinearGradient(0,990,0,1100);f2.addColorStop(0,'rgba(28,21,39,1)');f2.addColorStop(1,'rgba(28,21,39,0)');c.fillStyle=f2;c.fillRect(0,990,W,110);}
  // Gage, lower left, looking up at it — rod through his own head
  const s=5.6,hcx=340,hcy=1610,R=52*s;
  who(c,'gage',[0,0,0],X('shock','up','o',{abs:{x:hcx,y:hcy+255*s,s},view:'3q',f:1,noHat:1,hf:[12,93],hb:[-12,93],tilt:0.05}));
  const en={x:hcx+0.5*R,y:hcy+0.45*R},ex={x:hcx+0.2*R,y:hcy-1.0*R},ddx=ex.x-en.x,ddy=ex.y-en.y,L=Math.hypot(ddx,ddy),vx=ddx/L,vy=ddy/L;
  c.save();c.beginPath();c.rect(0,0,W,H);c.arc(hcx-8,hcy,R*1.02,0,TAU,true);c.clip('evenodd');tampIron(c,{x:en.x-vx*480,y:en.y-vy*480},{x:ex.x+vx*330,y:ex.y+vy*330},3.4,0.35);c.restore();
  c.save();for(let i=0;i<16;i++){const a=Math.atan2(vy,vx)+(hash(i*2.3)-0.5)*1.5,v=50+hash(i*4.1)*170;c.fillStyle=i%3?'#8a1018':'#f2e8d6';c.beginPath();c.ellipse(ex.x+Math.cos(a)*v,ex.y+Math.sin(a)*v,5+hash(i)*7,3+hash(i*2)*4,a,0,TAU);c.fill();}c.fillStyle='#5a0a10';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(ex.x,ex.y,26,10,Math.atan2(vy,vx)+1.57,0,TAU);c.fill();c.stroke();c.restore();
  c.fillStyle='rgba(220,240,255,0.95)';c.strokeStyle=OL;c.lineWidth=4;const sw=[hcx+R*0.98,hcy-R*0.3];c.beginPath();c.moveTo(sw[0],sw[1]-30);c.quadraticCurveTo(sw[0]+16,sw[1],sw[0],sw[1]+12);c.quadraticCurveTo(sw[0]-16,sw[1],sw[0],sw[1]-30);c.fill();c.stroke();
  // title, centred
  txt(c,'IRON ROD THROUGH',540,1010,92,'#fff',{sw:22,ls:2});txt(c,'HIS BRAIN',540,1120,112,'#fff',{sw:24,ls:3});txt(c,'AND HE LIVED',540,1232,100,'#ff2b2b',{sw:24,ls:3});
  grain(c,3);T=201;}]);
SHOTS.push([202,(c,t)=>{T=3.3;_film(c,t);
  const sx=545,sy=650,sc=1.72;const K2=xraySkull(c,sx,sy,sc,t,{frontal:1,hole:1,crack:1});
  const dx=K2.top.x-K2.cheek.x,dy=K2.top.y-K2.cheek.y,l=Math.hypot(dx,dy),ux=dx/l,uy=dy/l;
  c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,70,50,0.45)';c.lineWidth=70;c.lineCap='round';c.beginPath();c.moveTo(K2.cheek.x,K2.cheek.y);c.lineTo(K2.top.x,K2.top.y);c.stroke();c.strokeStyle='rgba(255,150,120,0.6)';c.lineWidth=20;c.stroke();c.restore();
  _xrod(c,{x:K2.cheek.x-ux*900,y:K2.cheek.y-uy*900},{x:K2.top.x+ux*240,y:K2.top.y+uy*240},1.3);
  // bone fragments bursting from the exit
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const a=Math.atan2(uy,ux)+(hash(i*2.1)-0.5)*1.6,v=60+hash(i*3.9)*220;c.save();c.translate(K2.top.x+Math.cos(a)*v,K2.top.y+Math.sin(a)*v);c.rotate(hash(i)*6);c.fillStyle='rgba(220,240,255,0.9)';c.beginPath();c.moveTo(-9,-5);c.lineTo(10,-7);c.lineTo(7,8);c.lineTo(-8,6);c.closePath();c.fill();c.restore();}c.restore();
  for(const P of [K2.cheek,K2.top])ring(c,P.x,P.y,66,0.95,'rgba(255,90,70,',8);
  const fd=c.createLinearGradient(0,1080,0,1500);fd.addColorStop(0,'rgba(2,7,13,0)');fd.addColorStop(0.5,'rgba(2,7,13,0.7)');fd.addColorStop(1,'rgba(2,7,13,0.7)');c.fillStyle=fd;c.fillRect(0,1080,W,420);
  txt(c,'IRON ROD THROUGH',540,1250,92,'#fff',{sw:22,ls:2});txt(c,'HIS BRAIN',540,1360,112,'#fff',{sw:24,ls:3});txt(c,'AND HE LIVED',540,1472,100,'#ff2b2b',{sw:24,ls:3});
  grain(c,3);T=202;}]);
