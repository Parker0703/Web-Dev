'use strict';
// ===================== 47 RONIN · cast, attire, hair, hats, props (Style 5) =====================
let CUR={};
const SK=['#fdf7f1','#fbf3ec','#f9efe6','#fffaf5'];
const mkK=(o)=>Object.assign({limb:o.skin||SK[0],skin:SK[0],hat:'none',long:true,robe:true,s4face:1,hair:'#1a171c',hair4:'chon',hairStyle:'quiff',pants:'#2e2c36'},o);
Object.assign(KIND2,{
  // --- the raid: black coats, white zig-zag trim, white headbands
  oishi:mkK({coat:'#1b1a22',trim:'#f4f1e8',sash:'#e9e5da',hakama:'#34333e',attire:'raid',band:1,swords:1,skin:SK[1],brows:1}),
  roninA:mkK({coat:'#1b1a22',trim:'#f4f1e8',sash:'#e9e5da',hakama:'#3a3842',attire:'raid',band:1,swords:1,skin:SK[2],goatee:1}),
  roninB:mkK({coat:'#1d1c26',trim:'#f4f1e8',sash:'#e9e5da',hakama:'#2e3040',attire:'raid',band:1,swords:1,skin:SK[3]}),
  roninC:mkK({coat:'#1b1a22',trim:'#f4f1e8',sash:'#e9e5da',hakama:'#38343c',attire:'raid',band:1,swords:1,skin:SK[0],hair:'#8a8890',old:1}),
  // --- Oishi off duty (teal kimono, loose), and as chief retainer (formal)
  oishiD:mkK({coat:'#3f7f86',trim:'#eadfb8',sash:'#7a3528',hakama:'#35686e',attire:'plain',skin:SK[1],messy:1,pants:'#35686e'}),
  oishiK:mkK({coat:'#27406e',trim:'#f0ece0',sash:'#1c2c4e',hakama:'#55607a',wing:'#2f4c82',attire:'kami',swords:1,skin:SK[1]}),
  retA:mkK({coat:'#3c4a5c',trim:'#f0ece0',sash:'#27303c',hakama:'#5e6672',wing:'#48586c',attire:'kami',swords:1,skin:SK[2],goatee:1}),
  retB:mkK({coat:'#4c5a48',trim:'#f0ece0',sash:'#2f3a2c',hakama:'#6a7264',wing:'#5a6a56',attire:'kami',swords:1,skin:SK[3]}),
  retC:mkK({coat:'#5a4a5e',trim:'#f0ece0',sash:'#3a2e3e',hakama:'#726878',wing:'#6a5870',attire:'kami',swords:1,skin:SK[0],hair:'#8a8890',old:1}),
  // --- Lord Asano: pale blue-green court dress; white for the end
  asano:mkK({coat:'#e9eef0',trim:'#ffffff',sash:'#5d8f98',hakama:'#8fbcc4',wing:'#9fc8ce',attire:'kami',swords:1,crest:1,skin:SK[3]}),
  asanoW:mkK({coat:'#f6f4ee',trim:'#d9dce6',sash:'#eceae2',hakama:'#eeece6',attire:'white',skin:SK[3],pants:'#eeece6'}),
  // --- Kira: older official, plum and gold
  kira:mkK({coat:'#6c3a5c',trim:'#e8c468',sash:'#3c2034',hakama:'#8a5878',wing:'#7c4a6c',attire:'kami',crest:1,hair:'#b4b2b8',old:1,stache:1,skin:SK[0]}),
  kiraN:mkK({coat:'#d9d6cc',trim:'#a8a498',sash:'#8a8678',hakama:'#cfccc2',attire:'white',hair:'#b4b2b8',old:1,stache:1,messy:1,skin:SK[0],pants:'#cfccc2'}),
  // --- guards
  guard:mkK({coat:'#6e5a44',trim:'#d8c8a0',sash:'#3a2c20',hakama:'#4a4038',attire:'plain',hat:'jingasa',swords:1,skin:SK[2]}),
  guard2:mkK({coat:'#55606a',trim:'#d8d4c8',sash:'#2c3238',hakama:'#3c444c',attire:'plain',hat:'jingasa',swords:1,skin:SK[0]}),
  captain:mkK({coat:'#7a2a24',trim:'#e8c468',sash:'#2a1a18',hakama:'#3a2a2c',attire:'armor',swords:1,skin:SK[2],band:2,goatee:1,brows:1}),
  castleG:mkK({coat:'#2c3a52',trim:'#d8d4c8',sash:'#1a2232',hakama:'#46526a',wing:'#36466a',attire:'kami',skin:SK[2]}),
  official:mkK({coat:'#1e1e26',trim:'#c8a850',sash:'#3a2a1a',hakama:'#3a3a48',wing:'#2a2a36',attire:'kami',hat:'eboshi',crest:1,skin:SK[0],old:1}),
  // --- townsfolk, spy, modern visitor
  fish:mkK({coat:'#3a5a8a',trim:'#e8e4d8',sash:'#c8c0a8',hakama:'#3a5a8a',attire:'plain',band:3,skin:SK[2],pants:'#d8c8a8'}),
  towns:mkK({coat:'#8a6a4a',trim:'#e0d4b8',sash:'#4a3626',hakama:'#7a5c40',attire:'plain',skin:SK[3]}),
  spy:mkK({coat:'#2a2c38',trim:'#4a4c5a',sash:'#1a1a22',hakama:'#24262e',attire:'plain',hat:'kasa',skin:SK[2]}),
  visitor:Object.assign(mkK({coat:'#4a7ac8',trim:'#e8e8ee',skin:SK[3],pants:'#2a3248'}),{robe:false,long:false,hair4:'modern',hair:'#3a2a20'}),
});
// ---------------- attire layers (drawn in torso space) ----------------
const _robe5=robe2;
robe2=function(c,s,f,K,TOR){
  if(K.attire==='kami'){ // kataginu: stiff winged shoulders under the collar
    for(const d of [-1,1]){c.fillStyle=shapeShade(c,d>0?6*s:-56*s,d>0?56*s:-6*s,K.wing,s);c.strokeStyle=K2;c.lineWidth=3.2*s;c.lineJoin='round';
      c.beginPath();c.moveTo(d*7*s,-TOR*s+8*s);c.lineTo(d*54*s,-TOR*s+3*s);c.lineTo(d*50*s,-TOR*s+15*s);c.lineTo(d*23*s,-40*s);c.lineTo(d*9*s,-40*s);c.closePath();c.fill();c.stroke();
      c.strokeStyle='rgba(10,10,20,0.35)';c.lineWidth=1.8*s;c.beginPath();c.moveTo(d*14*s,-TOR*s+10*s);c.lineTo(d*14*s,-42*s);c.stroke();c.beginPath();c.moveTo(d*30*s,-TOR*s+8*s);c.lineTo(d*19*s,-42*s);c.stroke();
      if(K.crest){c.fillStyle='#f6f2e6';c.beginPath();c.arc(d*24*s,-TOR*s+30*s,4.6*s,0,TAU);c.fill();c.fillStyle=K.wing;c.beginPath();c.arc(d*24*s,-TOR*s+30*s,2*s,0,TAU);c.fill();}}}
  _robe5(c,s,f,K,TOR);
  if(K.attire==='raid'){ // white zig-zag hem + tasuki cords crossing the chest
    const HK5=CUR.kn?1.34:1.72;c.save();c.transform(1,0,0,HK5,0,-4*s+4*s*HK5);c.beginPath();c.moveTo(-29*s,-4*s);c.lineTo(29*s,-4*s);c.quadraticCurveTo(36*s,26*s,40*s,46*s);c.quadraticCurveTo(0,52*s,-40*s,46*s);c.quadraticCurveTo(-36*s,26*s,-29*s,-4*s);c.closePath();c.clip();
    c.fillStyle='#16151c';c.fillRect(-44*s,36*s,88*s,18*s);c.fillStyle='#f4f1e8';c.beginPath();c.moveTo(-44*s,54*s);for(let i=0;i<=11;i++){c.lineTo((-44+i*8)*s,(i%2?38:46)*s);}c.lineTo(44*s,54*s);c.closePath();c.fill();c.restore();
    c.strokeStyle='#f4f1e8';c.lineWidth=3.4*s;c.lineCap='round';c.beginPath();c.moveTo(-22*s,-TOR*s+12*s);c.lineTo(20*s,-46*s);c.stroke();c.beginPath();c.moveTo(22*s,-TOR*s+12*s);c.lineTo(-20*s,-46*s);c.stroke();
    c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=1*s;c.beginPath();c.moveTo(-21*s,-TOR*s+14*s);c.lineTo(21*s,-44*s);c.stroke();}
  if(K.attire==='armor'){ // lamellar cuirass, shoulder guards, skirt plates
    const top=-TOR*s+16*s;for(let r=0;r<5;r++){const y=top+r*9.5*s;c.fillStyle=shapeShade(c,-26*s,26*s,r%2?'#3a2422':'#5a2a24',s);c.strokeStyle=K2;c.lineWidth=2*s;rr(c,-25*s,y,50*s,10*s,3*s);c.fill();c.stroke();
      c.fillStyle='#e8c468';for(let k=-3;k<=3;k++){c.fillRect((k*7-1)*s,y+3.5*s,2*s,3.4*s);}}
    for(const d of [-1,1]){for(let r=0;r<3;r++){c.fillStyle=shapeShade(c,d>0?24*s:-46*s,d>0?46*s:-24*s,r%2?'#3a2422':'#5a2a24',s);c.strokeStyle=K2;c.lineWidth=2*s;rr(c,(d>0?24:-46)*s,top-4*s+r*8*s,22*s,9*s,3*s);c.fill();c.stroke();}}
    for(let k=0;k<4;k++){const x=(-36+k*19)*s;c.fillStyle=shapeShade(c,x,x+16*s,k%2?'#4a2622':'#5e2c26',s);c.strokeStyle=K2;c.lineWidth=2*s;c.beginPath();c.moveTo(x+2*s,-2*s);c.lineTo(x+15*s,-2*s);c.lineTo(x+17*s,30*s);c.lineTo(x,30*s);c.closePath();c.fill();c.stroke();c.fillStyle='#e8c468';c.fillRect(x+3*s,9*s,11*s,2*s);c.fillRect(x+2*s,20*s,13*s,2*s);}}
  if(K.swords&&!CUR.noSw){ // daisho tucked through the obi: grips forward, scabbards behind
    const sx=-f;c.save();c.translate(sx*18*s,-30*s);for(const [L,a,w] of [[92,0.38,6.4],[58,0.52,5.4]]){c.save();c.rotate(sx*a+Math.PI/2*sx);c.lineCap='round';
      c.strokeStyle=K2;c.lineWidth=(w+3)*s;seg(c,0,-26*s,0,L*s);c.strokeStyle='#16141c';c.lineWidth=w*s;seg(c,0,0,0,L*s);c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=1.4*s;seg(c,-1.6*s,4*s,-1.6*s,L*s-6*s);
      c.strokeStyle='#2a2636';c.lineWidth=w*s;seg(c,0,-26*s,0,-4*s);c.strokeStyle='#e8e0cc';c.lineWidth=1.6*s;for(let k=0;k<4;k++)seg(c,-w*0.45*s,(-23+k*5.4)*s,w*0.45*s,(-20.6+k*5.4)*s);
      c.fillStyle='#c8a048';c.strokeStyle=K2;c.lineWidth=1.6*s;c.beginPath();c.ellipse(0,-2*s,w*1.15*s,2.6*s,0,0,TAU);c.fill();c.stroke();c.restore();}c.restore();}
};
// ---------------- hair: chonmage top-knot, headbands; modern ----------------
const _hair5=hairLayer;
hairLayer=function(c,R,s,f,o,K){
  if(K.hair4==='modern'){c.save();const col=K.hair;const sh=[()=>{c.beginPath();c.moveTo(-R*1.04,R*0.05);c.bezierCurveTo(-R*1.12,-R*0.95,-R*0.5,-R*1.22,R*0.05,-R*1.18);c.bezierCurveTo(R*0.7,-R*1.2,R*1.12,-R*0.8,R*1.04,R*0.05);c.quadraticCurveTo(R*0.9,-R*0.5,R*0.4,-R*0.62);c.quadraticCurveTo(-R*0.2,-R*0.4,-R*0.82,-R*0.55);c.quadraticCurveTo(-R*0.98,-R*0.3,-R*1.04,R*0.05);c.closePath();}];
    if(o.back)sh[0]=()=>{c.beginPath();c.arc(0,-R*0.08,R*1.08,0,TAU);};unionShapes(c,sh,s,col,4.2*s);c.fillStyle='rgba(255,240,220,0.5)';c.beginPath();c.ellipse(L2.dx*R*0.3,-R*0.98,R*0.26,R*0.08,-0.2,0,TAU);c.fill();c.restore();return;}
  if(K.hair4!=='chon')return _hair5(c,R,s,f,o,K);
  c.save();const col=K.hair,dk=shd(col,-0.45),tt=CUR.t||0;const vf=o.view==='front'?0.2:1,ln=f*vf;
  const cap=o.back?()=>{c.beginPath();c.arc(0,-R*0.06,R*1.05,0,TAU);}
    :()=>{c.beginPath();c.moveTo(-R*1.03,R*0.1);c.bezierCurveTo(-R*1.1,-R*0.86,-R*0.55,-R*1.1,0,-R*1.08);c.bezierCurveTo(R*0.55,-R*1.1,R*1.1,-R*0.86,R*1.03,R*0.1);
      c.quadraticCurveTo(R*0.97,-R*0.2,R*0.8,-R*0.42);c.quadraticCurveTo(R*0.5,-R*0.74,ln*R*0.1,-R*0.66);c.quadraticCurveTo(-R*0.5,-R*0.74,-R*0.8,-R*0.42);c.quadraticCurveTo(-R*0.97,-R*0.2,-R*1.03,R*0.1);c.closePath();};
  const kx=o.back?0:-ln*R*0.12,knot=()=>{c.beginPath();c.save();c.translate(kx,-R*1.08);c.rotate(o.back?0:ln*0.5);c.ellipse(ln*R*0.2,-R*0.2,R*0.44,R*0.2,0,0,TAU);c.restore();};
  const bun=()=>{c.beginPath();c.arc(kx-ln*R*0.2,-R*1.08,R*0.24,0,TAU);};
  const shapes=[cap,bun,knot];if(K.messy&&!o.back){for(const [x,a] of [[-0.86,-0.3],[0.8,0.3]])shapes.push(()=>{c.beginPath();c.moveTo(x*R,-R*0.72);c.quadraticCurveTo((x+a*0.5)*R,-R*0.5,(x+a)*R,-R*0.22+Math.sin(tt*3+x)*R*0.03);c.quadraticCurveTo((x+a*0.2)*R,-R*0.5,(x+0.14)*R,-R*0.72);c.closePath();});}
  const gr=c.createLinearGradient(0,-R*1.3,0,R*0.1);gr.addColorStop(0,shd(col,0.18));gr.addColorStop(0.6,col);gr.addColorStop(1,dk);unionShapes(c,shapes,s,gr,4.4*s);
  c.save();cap();c.clip();c.fillStyle='rgba(8,6,14,0.42)';c.beginPath();c.ellipse(-L2.dx*R*0.75,-R*0.3,R*0.62,R*0.95,0,0,TAU);c.fill();c.restore();
  c.fillStyle='rgba(255,246,236,0.8)';c.beginPath();c.ellipse(L2.dx*R*0.42,-R*0.88,R*0.24,R*0.075,L2.dx*0.5,0,TAU);c.fill();c.fillStyle='rgba(255,246,236,0.5)';c.beginPath();c.ellipse(kx+ln*R*0.2,-R*1.24,R*0.14,R*0.04,ln*0.5,0,TAU);c.fill();
  c.strokeStyle='#f0ece0';c.lineWidth=3*s;c.beginPath();c.moveTo(kx-ln*R*0.05,-R*1.22);c.lineTo(kx-ln*R*0.1,-R*0.98);c.stroke(); // paper tie on the knot
  if(K.band){ // hachimaki
    const bc=K.band===2?'#b02a24':K.band===3?'#e8e2cc':'#f6f3ea';c.lineJoin='round';const y0=-R*0.6;
    const tx=o.back?0:-f*R*1.0;if(K.band!==3){c.fillStyle=bc;c.strokeStyle=K2;c.lineWidth=2.6*s;for(const [a,l,ph] of [[0.35,0.95,0],[0.75,0.7,1.3]]){const w=Math.sin(tt*7+ph)*0.16;c.beginPath();c.moveTo(tx,y0+R*0.05);const ex=tx-(o.back?0.4:1)*f*Math.cos(a+w)*R*l,ey=y0+Math.sin(a+w)*R*l;c.quadraticCurveTo((tx+ex)/2,y0+R*0.02,ex,ey-R*0.07);c.lineTo(ex,ey+R*0.09);c.quadraticCurveTo((tx+ex)/2,y0+R*0.22,tx,y0+R*0.2);c.closePath();c.fill();c.stroke();}}
    c.fillStyle=bc;c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(-R*1.06,y0+R*0.16);c.quadraticCurveTo(0,y0-R*0.12,R*1.06,y0+R*0.16);c.lineTo(R*1.04,y0+R*0.4);c.quadraticCurveTo(0,y0+R*0.12,-R*1.04,y0+R*0.4);c.closePath();c.fill();c.stroke();
    c.fillStyle='rgba(120,130,170,0.3)';c.beginPath();c.ellipse(-L2.dx*R*0.7,y0+R*0.24,R*0.34,R*0.14,0,0,TAU);c.fill();}
  if(K.stache&&!o.back){c.strokeStyle=shd(col,-0.25);c.lineWidth=3.4*s;c.lineCap='round';const fx=f*R*(o.view==='front'?0.03:0.17);for(const d of [-1,1]){c.beginPath();c.moveTo(fx+d*R*0.05,R*0.33);c.quadraticCurveTo(fx+d*R*0.2,R*0.3,fx+d*R*0.3,R*0.46);c.stroke();}}
  if(K.goatee&&!o.back){const fx=f*R*(o.view==='front'?0.03:0.17);c.fillStyle=shd(K.hair,-0.1);c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.moveTo(fx-R*0.13,R*0.74);c.quadraticCurveTo(fx,R*1.12,fx+R*0.13,R*0.74);c.quadraticCurveTo(fx,R*0.82,fx-R*0.13,R*0.74);c.fill();c.stroke();}
  c.restore();};
// ---------------- hats ----------------
const _hat5=hat2b;
hat2b=function(c,h,s,f,R,t){
  if(h==='jingasa'){c.save();c.lineJoin='round';c.fillStyle='#1a171c';c.beginPath();c.ellipse(-R*0.9,-R*0.1,R*0.2,R*0.4,0,0,TAU);c.ellipse(R*0.9,-R*0.1,R*0.2,R*0.4,0,0,TAU);c.fill();
    const g=c.createLinearGradient(-R*1.5,0,R*1.5,0);g.addColorStop(L2.dx>0?1:0,'#4a4a5a');g.addColorStop(0.5,'#22222c');g.addColorStop(L2.dx>0?0:1,'#0e0e14');
    c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-R*1.55,-R*0.42);c.quadraticCurveTo(-R*0.5,-R*1.2,0,-R*1.34);c.quadraticCurveTo(R*0.5,-R*1.2,R*1.55,-R*0.42);c.quadraticCurveTo(0,-R*0.2,-R*1.55,-R*0.42);c.closePath();c.fill();c.stroke();
    c.strokeStyle='#d8b048';c.lineWidth=2.4*s;c.beginPath();c.moveTo(-R*1.46,-R*0.44);c.quadraticCurveTo(0,-R*0.24,R*1.46,-R*0.44);c.stroke();c.fillStyle='#d8b048';c.beginPath();c.arc(0,-R*0.78,R*0.16,0,TAU);c.fill();c.fillStyle='#22222c';c.beginPath();c.arc(0,-R*0.78,R*0.08,0,TAU);c.fill();
    c.strokeStyle='rgba(255,255,255,0.4)';c.lineWidth=2.4*s;c.beginPath();c.moveTo(L2.dx*R*0.5,-R*1.02);c.quadraticCurveTo(L2.dx*R*0.95,-R*0.8,L2.dx*R*1.2,-R*0.6);c.stroke();c.restore();return;}
  if(h==='kasa'){c.save();c.lineJoin='round';const g=c.createLinearGradient(-R*1.7,0,R*1.7,0);g.addColorStop(L2.dx>0?1:0,'#d8c088');g.addColorStop(0.5,'#a88c50');g.addColorStop(L2.dx>0?0:1,'#5a4626');
    c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-R*1.7,-R*0.1);c.lineTo(0,-R*1.4);c.lineTo(R*1.7,-R*0.1);c.quadraticCurveTo(0,R*0.16,-R*1.7,-R*0.1);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(60,40,10,0.45)';c.lineWidth=1.6*s;for(let k=-5;k<=5;k++){c.beginPath();c.moveTo(0,-R*1.36);c.lineTo(k*R*0.3,-R*0.02-Math.abs(k)*R*0.012);c.stroke();}for(const q of [0.35,0.65]){c.beginPath();c.moveTo(-R*1.7*q,-R*1.4+R*1.3*q);c.quadraticCurveTo(0,-R*1.4+R*1.5*q,R*1.7*q,-R*1.4+R*1.3*q);c.stroke();}
    c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(0,R*0.12,R*0.95,R*0.2,0,0,TAU);c.fill();c.restore();return;}
  if(h==='eboshi'){c.save();c.lineJoin='round';c.fillStyle='#14131a';c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-R*0.86,-R*0.5);c.quadraticCurveTo(-R*0.8,-R*1.5,-R*0.1,-R*1.75);c.quadraticCurveTo(R*0.5,-R*1.8,R*0.6,-R*1.2);c.quadraticCurveTo(R*0.86,-R*0.9,R*0.86,-R*0.5);c.quadraticCurveTo(0,-R*0.72,-R*0.86,-R*0.5);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,0.3)';c.lineWidth=2.4*s;c.beginPath();c.moveTo(L2.dx*R*0.4,-R*1.5);c.quadraticCurveTo(L2.dx*R*0.62,-R*1.1,L2.dx*R*0.66,-R*0.8);c.stroke();c.strokeStyle='#c8a850';c.lineWidth=2*s;c.beginPath();c.moveTo(-R*0.5,R*0.9);c.lineTo(-R*0.8,-R*0.5);c.moveTo(R*0.5,R*0.9);c.lineTo(R*0.8,-R*0.5);c.stroke();c.restore();return;}
  return _hat5(c,h,s,f,R,t);};
// ---------------- props (front hand) ----------------
const PROP=(fn)=>(c,h,s,f,t)=>{c.save();c.translate(h.x,h.y);c.scale(f,1);c.lineJoin='round';c.lineCap='round';fn(c,s,t);c.restore();};
const spear=(ang,len=1)=>PROP((c,s)=>{c.rotate(ang);c.strokeStyle=K2;c.lineWidth=8.5*s;seg(c,0,70*s,0,-190*s*len);c.strokeStyle='#7a4a2a';c.lineWidth=5*s;seg(c,0,70*s,0,-190*s*len);c.strokeStyle='rgba(255,220,180,0.35)';c.lineWidth=1.4*s;seg(c,-1.4*s,60*s,-1.4*s,-186*s*len);
  const y=-190*s*len;c.fillStyle='#c8a048';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(-4.5*s,y-4*s,9*s,10*s);c.strokeRect(-4.5*s,y-4*s,9*s,10*s);
  const g=c.createLinearGradient(-7*s,0,7*s,0);g.addColorStop(0,'#7a8494');g.addColorStop(0.5,'#f2f6fc');g.addColorStop(1,'#b8c2d0');c.fillStyle=g;c.lineWidth=2.4*s;c.beginPath();c.moveTo(-7*s,y-4*s);c.quadraticCurveTo(-8*s,y-26*s,0,y-52*s);c.quadraticCurveTo(8*s,y-26*s,7*s,y-4*s);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(60,70,90,0.5)';c.lineWidth=1*s;seg(c,0,y-6*s,0,y-46*s);});
const bottle=(tip=0)=>PROP((c,s)=>{c.rotate(tip);const g=c.createLinearGradient(-9*s,0,9*s,0);g.addColorStop(0,'#c8c2b0');g.addColorStop(0.5,'#fbf8f0');g.addColorStop(1,'#a8a290');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=2.6*s;
  c.beginPath();c.moveTo(-3.6*s,-30*s);c.lineTo(3.6*s,-30*s);c.lineTo(3.2*s,-18*s);c.bezierCurveTo(13*s,-10*s,12*s,8*s,9*s,12*s);c.lineTo(-9*s,12*s);c.bezierCurveTo(-12*s,8*s,-13*s,-10*s,-3.2*s,-18*s);c.closePath();c.fill();c.stroke();c.fillStyle='#2a4a8a';c.fillRect(-9.5*s,-2*s,19*s,3.4*s);c.beginPath();c.arc(0,3*s,0,0,TAU);c.fill();});
const cup=()=>PROP((c,s)=>{c.fillStyle='#f6f2e8';c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.moveTo(-9*s,-9*s);c.lineTo(9*s,-9*s);c.quadraticCurveTo(7*s,3*s,3*s,4*s);c.lineTo(-3*s,4*s);c.quadraticCurveTo(-7*s,3*s,-9*s,-9*s);c.closePath();c.fill();c.stroke();c.fillStyle='#b0261e';c.fillRect(-8*s,-7*s,16*s,2.4*s);});
const fan=(open,ang=0)=>PROP((c,s)=>{c.rotate(ang);if(open>0.05){const a0=-Math.PI/2-0.75*open,a1=-Math.PI/2+0.75*open,r=62*s;const g=c.createRadialGradient(0,0,10*s,0,0,r);g.addColorStop(0,'#b8862a');g.addColorStop(1,'#f4d67a');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.moveTo(0,0);c.arc(0,0,r,a0,a1);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(90,50,10,0.5)';c.lineWidth=1.2*s;for(let k=0;k<=8;k++){const a=lerp(a0,a1,k/8);seg(c,0,0,Math.cos(a)*r,Math.sin(a)*r);}c.fillStyle='#b0261e';c.beginPath();c.arc(0,-r*0.62,7*s,0,TAU);c.fill();}
  else{c.strokeStyle=K2;c.lineWidth=8*s;seg(c,0,4*s,0,-60*s);c.strokeStyle='#e8c060';c.lineWidth=4.6*s;seg(c,0,4*s,0,-60*s);}});
const mallet=(ang)=>PROP((c,s)=>{c.rotate(ang);c.strokeStyle=K2;c.lineWidth=10*s;seg(c,0,60*s,0,-150*s);c.strokeStyle='#9a6a3a';c.lineWidth=6.4*s;seg(c,0,60*s,0,-150*s);
  const g=c.createLinearGradient(0,-190*s,0,-140*s);g.addColorStop(0,'#c89858');g.addColorStop(1,'#6a4424');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=3.4*s;rr(c,-44*s,-192*s,88*s,52*s,9*s);c.fill();c.stroke();c.strokeStyle='rgba(50,26,8,0.5)';c.lineWidth=1.6*s;for(const y of [-180,-168,-154])seg(c,-38*s,y*s,38*s,(y+2)*s);
  c.strokeStyle='#3a3a40';c.lineWidth=4*s;seg(c,-36*s,-192*s,-36*s,-140*s);seg(c,36*s,-192*s,36*s,-140*s);});
const lantern5=(lit=1)=>PROP((c,s,t)=>{c.strokeStyle=K2;c.lineWidth=5*s;seg(c,0,30*s,0,-50*s);c.strokeStyle='#6a4a2a';c.lineWidth=3*s;seg(c,0,30*s,0,-50*s);c.strokeStyle='#222';c.lineWidth=1.6*s;seg(c,0,-50*s,12*s,-42*s);
  const x=12*s,y=-18*s;if(lit){const g=c.createRadialGradient(x,y,2,x,y,90*s);g.addColorStop(0,'rgba(255,200,110,0.55)');g.addColorStop(1,'rgba(255,170,80,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,90*s,0,TAU);c.fill();}
  const g2=c.createLinearGradient(x-14*s,0,x+14*s,0);g2.addColorStop(0,'#f0c070');g2.addColorStop(0.5,'#fff4d0');g2.addColorStop(1,'#e0a050');c.fillStyle=g2;c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.ellipse(x,y,14*s,22*s,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(120,60,20,0.5)';c.lineWidth=1*s;for(let k=-2;k<=2;k++){c.beginPath();c.ellipse(x,y+k*7*s,14*s*Math.sqrt(1-(k*7/22)**2),2*s,0,0,TAU);c.stroke();}c.fillStyle='#1a1a1a';c.fillRect(x-7*s,y-25*s,14*s,4*s);c.fillRect(x-7*s,y+21*s,14*s,4*s);});
const scroll5=()=>PROP((c,s)=>{c.fillStyle='#f4ecd8';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.rect(-30*s,-8*s,60*s,74*s);c.fill();c.stroke();c.strokeStyle='rgba(30,30,40,0.6)';c.lineWidth=1.6*s;for(let k=0;k<6;k++)seg(c,(-22+k*9)*s,0,(-22+k*9)*s,(40+hash(k)*18)*s);c.fillStyle='#7a2a2a';for(const y of [-12,62]){rr(c,-34*s,y*s,68*s,8*s,4*s);c.fill();c.stroke();}c.fillStyle='#c02a20';c.fillRect(14*s,48*s,10*s,10*s);});
const pouch=()=>PROP((c,s,t)=>{c.rotate(Math.PI+Math.sin(t*9)*0.12);c.fillStyle='#8a6a3a';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.moveTo(-6*s,0);c.quadraticCurveTo(-20*s,-14*s,-14*s,-34*s);c.quadraticCurveTo(0,-42*s,14*s,-34*s);c.quadraticCurveTo(20*s,-14*s,6*s,0);c.closePath();c.fill();c.stroke();c.strokeStyle='#d8c090';c.lineWidth=2*s;seg(c,-7*s,-3*s,7*s,-3*s);});
const incense=()=>PROP((c,s,t)=>{c.strokeStyle='#5a7a3a';c.lineWidth=2.2*s;for(const k of [-1,0,1])seg(c,k*3*s,6*s,k*5*s,-46*s);c.fillStyle='#ff8a3a';for(const k of [-1,0,1]){c.beginPath();c.arc(k*5*s,-47*s,2.4*s,0,TAU);c.fill();}});
const bundle=()=>PROP((c,s)=>{c.strokeStyle=K2;c.lineWidth=8.5*s;seg(c,0,70*s,0,-170*s);c.strokeStyle='#7a4a2a';c.lineWidth=5*s;seg(c,0,70*s,0,-170*s);
  const g=c.createRadialGradient(6*s,-176*s,2,0,-166*s,30*s);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#b8b8c8');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.arc(0,-166*s,24*s,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-6*s,-188*s);c.lineTo(-16*s,-206*s);c.lineTo(0,-196*s);c.lineTo(14*s,-208*s);c.lineTo(7*s,-188*s);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(90,90,120,0.5)';c.lineWidth=1.6*s;c.beginPath();c.arc(0,-166*s,16*s,0.4,2.2);c.stroke();});
const pole=()=>PROP((c,s)=>{c.strokeStyle=K2;c.lineWidth=7*s;seg(c,-110*s,-6*s,110*s,-6*s);c.strokeStyle='#b89a5a';c.lineWidth=4*s;seg(c,-110*s,-6*s,110*s,-6*s);for(const d of [-1,1]){c.strokeStyle='#3a2a1a';c.lineWidth=1.6*s;seg(c,d*100*s,-6*s,d*112*s,44*s);seg(c,d*100*s,-6*s,d*88*s,44*s);c.fillStyle='#a8844a';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.ellipse(d*100*s,50*s,24*s,8*s,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(d*100*s-24*s,50*s);c.lineTo(d*100*s-18*s,72*s);c.lineTo(d*100*s+18*s,72*s);c.lineTo(d*100*s+24*s,50*s);c.fill();c.stroke();
    for(let k=0;k<3;k++){c.fillStyle=['#7aa0c0','#c8d8e4','#5a88a8'][k];c.beginPath();c.ellipse(d*100*s+(k-1)*10*s,46*s-k*2*s,11*s,4*s,0.3,0,TAU);c.fill();c.stroke();}}});
