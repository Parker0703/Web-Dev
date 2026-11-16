'use strict';
// ===== Hiroo Onoda cast =====
Object.assign(KIND2,{
  // young Onoda: clean-shaven, thick straight determined brows, field cap with sun flaps
  onoda:Object.assign(mkK({coat:'#6e6c44',trim:'#d8d0a8',skin:SK[1],pants:'#5a5838'}),{robe:false,long:false,hair4:'crew',hair:'#1c1418',hat:'fcap',cap:'#6a6840',flaps:1,browW:1.35,browL:1.15,jaw:1}),
  // Onoda after decades: weathered, stubble, hollow cheeks, faded patched uniform
  onodaOld:Object.assign(mkK({coat:'#7e7a54',trim:'#c8bc90',skin:SK[2],pants:'#6a6448'}),{robe:false,long:false,hair4:'crew',hair:'#2a2420',hat:'fcap',cap:'#76704a',flaps:1,ragged:1,stubble:1,old:1,browW:1.35,browL:1.15,jaw:1}),
  // 1944 commander: officer cap with gold star, bristly moustache, heavy brows
  cmdr:Object.assign(mkK({coat:'#5a5e3e',trim:'#d8d0a8',skin:SK[2],pants:'#4a4e34'}),{robe:false,long:true,hair4:'part',hair:'#1c1418',hat:'fcap',cap:'#4e5236',star:1,stache:'brush',browW:1.6,browL:1.2}),
  // 1974 Taniguchi: grey side part, round glasses, grey moustache, thin arched brows, wrinkles
  tani:Object.assign(mkK({coat:'#3a3c46',trim:'#e8e8ec',skin:SK[2],pants:'#30323a'}),{robe:false,long:true,hair4:'part',hair:'#bdbdc2',glasses:1,old:1,stache:'thin',stacheCol:'#9a9aa0',browW:0.8,browCol:'#8a8a90',browL:1.05,browY:6}),
  // Suzuki: young traveler, messy swept hair, red bandana, thin brows, wide friendly look
  suzuki:Object.assign(mkK({coat:'#c8562e',trim:'#fff0e0',skin:SK[1],pants:'#3a4a6a'}),{robe:false,long:false,hair4:'swoop',hair:'#241a16',bandana:'#d83a2a',browW:0.7,browL:0.9,browY:4}),
});
// soldier field cap with visor (sits on the crown, face clear)
function fieldCap(c,r,K,o={}){if(!r||!K.cap)return;const R=47*r.s;c.save();c.translate(r.hc.x+(o.dx||0)*R,r.hc.y);c.rotate(o.tilt||0);c.lineJoin='round';const lw=5*r.s/3.4*1.4;
  c.fillStyle=K.cap;c.strokeStyle=OL;c.lineWidth=lw;c.beginPath();c.moveTo(-R*1.0,-R*0.42);c.bezierCurveTo(-R*1.05,-R*1.22,R*1.05,-R*1.22,R*1.0,-R*0.42);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(0,0,0,0.18)';c.fillRect(-R*1.0,-R*0.56,R*2.0,R*0.12);c.fillStyle=shd(K.cap,-0.35);c.beginPath();c.ellipse(0,-R*0.42,R*0.95,R*0.16,0,0,Math.PI);c.fill();c.stroke();
  if(K.star){c.fillStyle='#ffd040';star(c,0,-R*0.78,R*0.16);}else{c.fillStyle='#c8a830';star(c,0,-R*0.78,R*0.12);}
  c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.ellipse(-R*0.45,-R*0.95,R*0.25,R*0.08,-0.3,0,TAU);c.fill();c.restore();}
function star(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r*0.45:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}c.closePath();c.fill();}
// patches / tears on the ragged uniform
function ragged(c,r){if(!r)return;const s=r.s/3.4;const cx=(r.hc.x+r.hip.x)/2,cy=lerp(r.hc.y,r.hip.y,0.62);c.save();c.lineWidth=3*s;c.strokeStyle=OL;
  for(const [dx,dy,w,h,col] of [[-30,10,34,26,'#5a5434'],[26,-26,26,22,'#8a8058']]){c.fillStyle=col;c.save();c.translate(cx+dx*s,cy+dy*s);c.rotate(0.15);c.fillRect(-w/2*s,-h/2*s,w*s,h*s);c.strokeRect(-w/2*s,-h/2*s,w*s,h*s);c.setLineDash([4*s,4*s]);c.strokeStyle='#d8d0a8';c.strokeRect(-w/2*s+4*s,-h/2*s+4*s,w*s-8*s,h*s-8*s);c.restore();}c.restore();}
// ---------- detailed props (sharp, thick outline) ----------
// Arisaka-style rifle: butt at a, grip hand at b, muzzle past b
function rifle(c,a,b,s,ext=1.9){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,ang=Math.atan2(dy,dx);const Lt=ext>10?ext:L*ext,k=Math.max(0.55,s);const tip={x:a.x+dx/L*Lt,y:a.y+dy/L*Lt};
  c.save();c.translate(a.x,a.y);c.rotate(ang);c.lineJoin='round';c.lineCap='round';const ow=6*k;
  // sling (behind)
  c.strokeStyle=OL;c.lineWidth=7*k;c.beginPath();c.moveTo(Lt*0.08,10*k);c.quadraticCurveTo(Lt*0.32,46*k,Lt*0.58,8*k);c.stroke();c.strokeStyle='#7a6a3e';c.lineWidth=4*k;c.stroke();
  // barrel
  const bt=-14*k;c.fillStyle='#3e4248';c.strokeStyle=OL;c.lineWidth=ow;c.beginPath();c.rect(Lt*0.36,bt-4*k,Lt*0.64,8*k);c.fill();c.stroke();
  c.fillStyle='#2a2c30';c.beginPath();c.moveTo(Lt-4*k,bt-4*k);c.lineTo(Lt-2*k,bt-12*k);c.lineTo(Lt+2*k,bt-12*k);c.lineTo(Lt+2*k,bt-4*k);c.closePath();c.fill();c.stroke();
  // wooden stock: butt → wrist → fore-end
  const wd=c.createLinearGradient(0,-20*k,0,20*k);wd.addColorStop(0,'#a8683a');wd.addColorStop(0.5,'#8a4e26');wd.addColorStop(1,'#5e3216');c.fillStyle=wd;c.beginPath();
  c.moveTo(-28*k,-12*k);c.lineTo(Lt*0.16,-10*k);c.lineTo(Lt*0.78,-10*k);c.lineTo(Lt*0.8,-4*k);c.lineTo(Lt*0.78,4*k);c.lineTo(Lt*0.24,6*k);c.quadraticCurveTo(Lt*0.17,8*k,Lt*0.15,14*k);c.lineTo(Lt*0.08,20*k);c.lineTo(-28*k,24*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(50,24,8,0.45)';c.lineWidth=1.8*k;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-20*k+i*6*k,-6*k+i*6*k);c.bezierCurveTo(Lt*0.05,-4*k+i*5*k,Lt*0.4,-6*k+i*2*k,Lt*0.7,-6*k+i*2.5*k);c.stroke();}
  c.fillStyle='rgba(255,220,170,0.35)';c.beginPath();c.moveTo(-20*k,-8*k);c.lineTo(Lt*0.75,-7*k);c.lineTo(Lt*0.75,-5*k);c.lineTo(-20*k,-4*k);c.fill();
  // butt plate, upper handguard, barrel bands
  c.fillStyle='#2a2c30';c.strokeStyle=OL;c.lineWidth=ow*0.8;c.beginPath();c.rect(-32*k,-12*k,6*k,36*k);c.fill();c.stroke();
  c.fillStyle='#7a4420';c.beginPath();c.rect(Lt*0.42,-15*k,Lt*0.32,6*k);c.fill();c.stroke();
  c.fillStyle='#4a4e54';for(const u of [0.5,0.74]){c.beginPath();c.rect(Lt*u,-17*k,6*k,16*k);c.fill();c.stroke();}
  // receiver + bolt knob + trigger guard
  const mt=c.createLinearGradient(0,-22*k,0,-8*k);mt.addColorStop(0,'#8a9098');mt.addColorStop(1,'#3e4248');c.fillStyle=mt;c.beginPath();c.rect(Lt*0.2,-21*k,Lt*0.18,11*k);c.fill();c.stroke();
  c.strokeStyle=OL;c.lineWidth=ow*0.8;c.beginPath();c.moveTo(Lt*0.3,-12*k);c.lineTo(Lt*0.31,4*k);c.stroke();c.fillStyle='#3e4248';c.beginPath();c.arc(Lt*0.31,6*k,5*k,0,TAU);c.fill();c.stroke();
  c.beginPath();c.arc(Lt*0.24,10*k,7*k,0.2,Math.PI-0.2);c.stroke();
  c.strokeStyle='rgba(255,255,255,0.55)';c.lineWidth=2*k;c.beginPath();c.moveTo(Lt*0.4,bt-2*k);c.lineTo(Lt*0.98,bt-2*k);c.stroke();
  c.fillStyle='#2a2c30';c.strokeStyle=OL;c.lineWidth=ow*0.6;c.beginPath();c.rect(Lt*0.39,-26*k,10*k,8*k);c.fill();c.stroke();c.beginPath();c.rect(Lt*0.79,-16*k,10*k,16*k);c.fill();c.stroke();
  c.fillStyle='#8a9098';for(const u of [0.1,0.58]){c.beginPath();c.arc(Lt*u,u<0.3?18*k:6*k,3*k,0,TAU);c.fill();c.stroke();}
  c.fillStyle='#c8a830';c.beginPath();c.arc(Lt*0.06,4*k,4*k,0,TAU);c.fill();c.stroke();
  c.restore();return tip;}
// katana in its scabbard (handed over), centred at x,y
function katana(c,x,y,s,a=0){const k=Math.max(0.6,s);c.save();c.translate(x,y);c.rotate(a);c.lineJoin='round';c.lineCap='round';c.strokeStyle=OL;c.lineWidth=5*k;
  // saya (scabbard)
  const sg=c.createLinearGradient(0,-9*k,0,9*k);sg.addColorStop(0,'#4a2a22');sg.addColorStop(0.45,'#2a1610');sg.addColorStop(1,'#120806');c.fillStyle=sg;c.beginPath();c.moveTo(-18*k,-8*k);c.quadraticCurveTo(80*k,-12*k,170*k,-6*k);c.quadraticCurveTo(178*k,0,170*k,6*k);c.quadraticCurveTo(80*k,4*k,-18*k,8*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,220,200,0.35)';c.lineWidth=2.5*k;c.beginPath();c.moveTo(0,-5*k);c.quadraticCurveTo(80*k,-9*k,160*k,-4*k);c.stroke();
  c.fillStyle='#c8a830';c.strokeStyle=OL;c.lineWidth=3*k;c.beginPath();c.rect(164*k,-7*k,10*k,14*k);c.fill();c.stroke();c.beginPath();c.rect(20*k,-9*k,8*k,18*k);c.fill();c.stroke();
  // tsuba (guard) + habaki
  c.fillStyle='#2e2a24';c.lineWidth=4*k;c.beginPath();c.ellipse(-22*k,0,6*k,20*k,0,0,TAU);c.fill();c.stroke();c.fillStyle='#c8a830';c.beginPath();c.ellipse(-22*k,0,2.5*k,12*k,0,0,TAU);c.fill();
  // tsuka: wrapped handle with diamond pattern
  c.fillStyle='#e8e2d4';c.strokeStyle=OL;c.lineWidth=5*k;c.beginPath();c.rect(-110*k,-9*k,84*k,18*k);c.fill();c.stroke();
  c.fillStyle='#1c1a22';for(let i=0;i<7;i++){const xx=-104*k+i*12*k;c.beginPath();c.moveTo(xx,-9*k);c.lineTo(xx+6*k,0);c.lineTo(xx,9*k);c.lineTo(xx-6*k,0);c.closePath();c.fill();}
  c.fillStyle='#c8a830';c.beginPath();c.rect(-116*k,-10*k,8*k,20*k);c.fill();c.stroke();c.fillStyle='#d8b840';c.beginPath();c.ellipse(-70*k,0,5*k,4*k,0,0,TAU);c.fill();
  c.restore();}
// rice sack with a tied neck
function riceSack(c,x,y,s,rot=0){const k=s;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#d4c09a';c.strokeStyle=OL;c.lineWidth=5*k;c.beginPath();c.moveTo(-14*k,-40*k);c.quadraticCurveTo(-52*k,-20*k,-46*k,30*k);c.quadraticCurveTo(0,54*k,46*k,30*k);c.quadraticCurveTo(52*k,-20*k,14*k,-40*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(120,90,50,0.6)';c.lineWidth=2*k;c.setLineDash([5*k,4*k]);c.beginPath();c.moveTo(-40*k,26*k);c.quadraticCurveTo(0,44*k,40*k,26*k);c.stroke();c.setLineDash([]);
  c.fillStyle='#b8a074';c.strokeStyle=OL;c.lineWidth=4*k;c.beginPath();c.moveTo(-14*k,-40*k);c.lineTo(-20*k,-58*k);c.lineTo(20*k,-58*k);c.lineTo(14*k,-40*k);c.closePath();c.fill();c.stroke();c.strokeStyle='#6a4a2a';c.lineWidth=5*k;c.beginPath();c.moveTo(-16*k,-44*k);c.lineTo(16*k,-44*k);c.stroke();
  c.fillStyle='rgba(255,255,255,0.3)';c.beginPath();c.ellipse(-20*k,0,8*k,20*k,0.2,0,TAU);c.fill();c.restore();}
// official paper (orders / leaflets): vertical text columns, red seal, fold crease
function doc(c,x,y,s,rot=0,o={}){const k=s;c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';const w=(o.w||70)*k,h=(o.h||92)*k;
  c.fillStyle='rgba(0,0,0,0.22)';c.fillRect(-w/2+4*k,-h/2+5*k,w,h);c.fillStyle=o.col||'#f6f0de';c.strokeStyle=OL;c.lineWidth=(o.lw||4)*k;c.beginPath();c.rect(-w/2,-h/2,w,h);c.fill();c.stroke();
  c.strokeStyle='rgba(120,100,70,0.35)';c.lineWidth=1.5*k;c.beginPath();c.moveTo(-w/2,0);c.lineTo(w/2,0);c.stroke();
  c.fillStyle='rgba(30,22,16,0.8)';const cols=Math.max(3,Math.round(w/(12*k)));for(let i=0;i<cols-1;i++){const xx=w/2-10*k-i*(w-16*k)/(cols-1);for(let j=0;j<5;j++){const yy=-h/2+10*k+j*(h-20*k)/5;c.fillRect(xx-2.5*k,yy,5*k,(h-20*k)/5-4*k);}}
  c.fillStyle='#c8281e';c.beginPath();c.arc(-w/2+14*k,h/2-14*k,8*k,0,TAU);c.fill();c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=1.2*k;c.strokeRect(-w/2+9*k,h/2-19*k,10*k,10*k);c.restore();}
function backpack(c,r,f){if(!r)return;const s=r.s/3.4;c.save();c.fillStyle='#3a5a8a';c.strokeStyle=OL;c.lineWidth=4*s;rr(c,r.hc.x-f*70*s-36*s,r.hc.y+70*s,72*s,120*s,14*s);c.fill();c.stroke();c.restore();}

// ---------- per-character face details (drawn in face space) ----------
{const _df=drawFace4;drawFace4=function(g,x,y,s,P,K){_df(g,x,y,s,P,K);if(!K)return;g.save();g.lineCap='round';g.lineJoin='round';
  g.restore();};}
// ---------- field cap / bandana built into the head (follows tilt and view) ----------
{const _f2=face2;face2=function(c,o,s,f,R,t){_f2(c,o,s,f,R,t);const K=KIND2[o.kind]||{};const v=o.back?'back':(o.view||'front');
  if(K.cap&&o.noCap){hairLayer(c,R,s,f,o,K);}
  if(K.cap&&!o.noCap){c.save();c.lineJoin='round';const lw=Math.max(2,4.5*s);const off=v==='3q'?f*R*0.22:v==='side'?f*R*0.4:0;
    // short sideburns peeking under the cap
    if(v!=='back'){c.fillStyle=K.hair||'#1c1418';for(const sd of [-1,1]){if(v==='3q'&&sd===f)continue;c.beginPath();c.ellipse(sd*R*0.9,-R*0.12,R*0.1,R*0.2,0,0,TAU);c.fill();}}
    // sun flaps hanging at the back / sides
    if(K.flaps){c.fillStyle=shd(K.cap,0.08);c.strokeStyle=OL;c.lineWidth=lw;if(v==='back'){c.fillStyle=K.cap;c.beginPath();c.moveTo(-R*0.98,-R*0.45);c.lineTo(R*0.98,-R*0.45);c.lineTo(R*0.8,R*0.6);c.quadraticCurveTo(0,R*0.74,-R*0.8,R*0.6);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.35)';for(const xx of [-0.35,0.35]){c.beginPath();c.moveTo(xx*R,R*0.1);c.lineTo(xx*R,R*0.74);c.stroke();}}
      else{const sides=v==='3q'?[-f*0.98]:[-0.98,0.98];for(const xx of sides){c.beginPath();c.moveTo(xx*R-R*0.17,-R*0.32);c.lineTo(xx*R+R*0.17,-R*0.32);c.lineTo(xx*R+R*0.2,R*0.62);c.lineTo(xx*R-R*0.2,R*0.62);c.closePath();c.fill();c.stroke();}}}
    // dome: hugs the skull, brim line sits just above the brows
    const g2=c.createLinearGradient(-R,-R*1.2,R,0);g2.addColorStop(0,shd(K.cap,0.18));g2.addColorStop(1,shd(K.cap,-0.2));c.fillStyle=g2;c.strokeStyle=OL;c.lineWidth=lw;
    c.beginPath();c.moveTo(-R*1.04,-R*0.3);c.bezierCurveTo(-R*1.08,-R*1.28,R*1.08,-R*1.28,R*1.04,-R*0.3);c.quadraticCurveTo(0,-R*0.42,-R*1.04,-R*0.3);c.closePath();c.fill();c.stroke();
    c.fillStyle=shd(K.cap,-0.28);c.beginPath();c.moveTo(-R*1.04,-R*0.3);c.quadraticCurveTo(0,-R*0.42,R*1.04,-R*0.3);c.lineTo(R*1.02,-R*0.42);c.quadraticCurveTo(0,-R*0.56,-R*1.02,-R*0.42);c.closePath();c.fill();c.stroke();
    // seam lines on the crown
    c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=lw*0.6;for(const k of [-0.4,0.4]){c.beginPath();c.moveTo(off+k*R,-R*0.5);c.quadraticCurveTo(off+k*R*0.6,-R*0.95,off,-R*1.05);c.stroke();}
    if(v!=='back'){c.fillStyle=K.star?'#ffd040':'#c8a830';star(c,off,-R*0.74,R*(K.star?0.15:0.11));
      // visor: a curved lip that juts out over the brows, toward the facing side in 3/4 view
      c.fillStyle=shd(K.cap,-0.42);c.strokeStyle=OL;c.lineWidth=lw;c.beginPath();const vw=v==='3q'?R*0.7:R*0.78;c.moveTo(off-vw,-R*0.33);c.quadraticCurveTo(off,-R*0.46,off+vw,-R*0.33);c.quadraticCurveTo(off+vw*0.8,-R*0.12,off,-R*0.1);c.quadraticCurveTo(off-vw*0.8,-R*0.12,off-vw,-R*0.33);c.closePath();c.fill();c.stroke();
      c.fillStyle='rgba(0,0,0,0.18)';c.beginPath();c.ellipse(off,-R*0.04,vw*0.85,R*0.08,0,0,Math.PI);c.fill();}
    c.fillStyle='rgba(255,255,255,0.22)';c.beginPath();c.ellipse(-R*0.42,-R*0.92,R*0.26,R*0.08,-0.35,0,TAU);c.fill();c.restore();}
  if(K.bandana&&v!=='back'){c.save();c.strokeStyle=OL;c.lineWidth=Math.max(2,4*s);c.fillStyle=K.bandana;c.beginPath();c.moveTo(-R*1.0,-R*0.5);c.quadraticCurveTo(0,-R*0.7,R*1.0,-R*0.5);c.lineTo(R*0.98,-R*0.34);c.quadraticCurveTo(0,-R*0.54,-R*0.98,-R*0.34);c.closePath();c.fill();c.stroke();
    c.fillStyle='rgba(255,255,255,0.8)';for(let i=-3;i<=3;i++){c.beginPath();c.arc(i*R*0.26,-R*0.5-Math.cos(i*0.35)*R*0.08,R*0.03,0,TAU);c.fill();}
    const kx=-f*R*1.0;c.fillStyle=K.bandana;c.beginPath();c.moveTo(kx,-R*0.42);c.lineTo(kx-f*R*0.35,-R*0.2);c.lineTo(kx-f*R*0.18,-R*0.12);c.closePath();c.fill();c.stroke();c.restore();}};}
// comrades (Akatsu, Shimada, Kozuka) — each with a distinct face
Object.assign(KIND2,{
  akatsu:Object.assign({},KIND2.onoda,{coat:'#727048',skin:SK[0],browW:0.9,browL:0.9,jaw:0,flaps:0}),
  shimada:Object.assign({},KIND2.onoda,{coat:'#66643e',skin:SK[2],stache:'brush',browW:1.5,flaps:1}),
  kozuka:Object.assign({},KIND2.onoda,{coat:'#6a6a46',skin:SK[1],stubble:1,browW:1.1,browL:1.2,flaps:0}),
});
