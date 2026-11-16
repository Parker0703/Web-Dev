'use strict';
// ===== Roman wardrobe for Style 3 fig2: toga, tunic + armour, laurel, galea, hood =====
Object.assign(KIND2,{
  caesar:{coat:'#f0e8d4',limb:'#ecebe6',hat:'none',hair:'#4a3a2a',hairStyle:'buzz',skirt:'#e9dfc8',skirtL:104,toga:'#6e1c74',togaW:17,laurel:1,hem:'#6e1c74'},
  brutus:{coat:'#e6dccb',limb:'#ecebe6',hat:'none',hair:'#1e1612',hairStyle:'curly',skirt:'#ddd2bc',skirtL:104,toga:'#8a2424',togaW:7,stubble:true},
  senator:{coat:'#e4dccc',limb:'#ecebe6',hat:'none',hair:'#9a9a9a',hairStyle:'sidepart',skirt:'#d8cfbc',skirtL:104,toga:'#8a2424',togaW:6},
  senator2:{coat:'#ddd4c0',limb:'#ecebe6',hat:'none',hair:'#2a2018',hairStyle:'buzz',skirt:'#d2c8b2',skirtL:104,toga:'#8a2424',togaW:6,stubble:true},
  senator3:{coat:'#e8e0d0',limb:'#ecebe6',hat:'none',hair:'#d4d4d4',hairStyle:'slick',skirt:'#ddd4c2',skirtL:104,toga:'#8a2424',togaW:6,stache:1},
  cassius:{coat:'#d8cdb6',limb:'#ecebe6',hat:'none',hair:'#3a2a1c',hairStyle:'slick',skirt:'#cfc3aa',skirtL:104,toga:'#8a2424',togaW:6},
  calpurnia:{coat:'#2a4a7a',limb:'#ecebe6',hat:'none',hair:'#2a1810',hairStyle:'bun',skirt:'#24406a',skirtL:110,palla:'#c8a858'},
  seer:{coat:'#3a3028',limb:'#ecebe6',hat:'hood',hair:'#d8d8d8',skirt:'#2e261e',skirtL:110,stache:1},
  hooded:{coat:'#2a2420',limb:'#ecebe6',hat:'hood2',skirt:'#221c18',skirtL:110},
  legion:{coat:'#a82424',limb:'#ecebe6',hat:'galea',skirt:'#9a2020',skirtL:44,armor:1,belt:true},
});
// drawn inside the torso transform (origin = hip, y up negative), after the coat
function romanTorso(c,K,s,f,t,TOR){
  if(K.toga){// diagonal sash over the left shoulder to the right hip, with folds
    const w=K.togaW;c.save();c.beginPath();c.moveTo(-23*s,-TOR*s+8*s);c.quadraticCurveTo(0,-TOR*s,23*s,-TOR*s+8*s);c.lineTo(27*s,6*s);c.quadraticCurveTo(0,12*s,-27*s,6*s);c.closePath();c.clip();
    c.fillStyle='rgba(0,0,0,0.12)';c.beginPath();c.moveTo(-f*30*s,-TOR*s);c.lineTo(-f*(30-w*2.4)*s,-TOR*s);c.lineTo(f*34*s,4*s);c.lineTo(f*(34-w*2.4)*s,8*s);c.closePath();c.fill();
    c.fillStyle=shapeShade(c,-27*s,27*s,K.coat,s);c.beginPath();c.moveTo(-f*30*s,-TOR*s-4*s);c.lineTo(-f*(30-w*2.2)*s,-TOR*s-4*s);c.lineTo(f*32*s,-2*s);c.lineTo(f*(32-w*2.2)*s,10*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3*s;c.stroke();
    c.strokeStyle=K.toga;c.lineWidth=w*0.75*s;c.beginPath();c.moveTo(-f*(30-w*0.5)*s,-TOR*s-4*s);c.lineTo(f*(32-w*0.5)*s,4*s);c.stroke();
    c.strokeStyle='rgba(0,0,0,0.28)';c.lineWidth=2.4*s;for(const k of [0.3,0.6]){c.beginPath();c.moveTo(-f*(30-w*2.2*k)*s+f*12*s,-TOR*s+18*s);c.quadraticCurveTo(f*2*s,-40*s,f*(32-w*2.2*k)*s,-6*s);c.stroke();}
    c.restore();}
  if(K.armor){// lorica segmentata bands + shoulder plates
    const g=c.createLinearGradient(-26*s,0,26*s,0);g.addColorStop(L2.dx>0?0:1,'#4a5058');g.addColorStop(0.6,'#b8c0ca');g.addColorStop(L2.dx>0?1:0,'#e8eef4');
    for(let i=0;i<5;i++){const y=(-TOR+14+i*15)*s;c.fillStyle=g;rr(c,-26*s,y,52*s,15*s,4*s);c.fill();c.strokeStyle=K2;c.lineWidth=2.6*s;c.stroke();}
    for(const sx of [-1,1]){c.fillStyle=g;c.beginPath();c.ellipse(sx*20*s,(-TOR+10)*s,15*s,10*s,sx*0.3,0,TAU);c.fill();c.stroke();}
    c.fillStyle='#d8b050';for(let i=0;i<5;i++){c.beginPath();c.arc(0,(-TOR+21+i*15)*s,2.2*s,0,TAU);c.fill();}}
  if(K.palla){c.fillStyle=shapeShade(c,-27*s,27*s,K.palla,s);c.beginPath();c.moveTo(-27*s,-TOR*s+6*s);c.quadraticCurveTo(-34*s,-40*s,-24*s,0);c.lineTo(-10*s,0);c.quadraticCurveTo(-18*s,-50*s,8*s,-TOR*s+4*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3*s;c.stroke();}
}
// hats: galea (helmet with crest), hood
const _hatR=hat2b;
hat2b=function(c,h,s,f,R,t){
  if(h==='galea'){c.strokeStyle=K2;c.lineWidth=4*s;const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(L2.dx>0?0:1,'#6a5a3a');g.addColorStop(0.55,'#c8a858');g.addColorStop(L2.dx>0?1:0,'#f4e0a0');
    // crest
    c.fillStyle='#b81c1c';c.beginPath();c.moveTo(-R*0.9,-R*1.0);c.quadraticCurveTo(0,-R*2.0,R*0.9,-R*1.0);c.quadraticCurveTo(0,-R*1.45,-R*0.9,-R*1.0);c.fill();c.stroke();
    c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2*s;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*R*0.2,-R*1.2);c.lineTo(i*R*0.24,-R*1.62+Math.abs(i)*R*0.08);c.stroke();}
    c.strokeStyle=K2;c.lineWidth=4*s;c.fillStyle=g;c.beginPath();c.arc(0,-R*0.1,R*1.08,Math.PI*1.02,Math.PI*1.98);c.lineTo(R*1.12,-R*0.02);c.lineTo(-R*1.12,-R*0.02);c.closePath();c.fill();c.stroke();
    c.fillStyle=g;for(const sx of [-1,1]){c.beginPath();c.moveTo(sx*R*0.98,-R*0.1);c.lineTo(sx*R*1.05,R*0.62);c.quadraticCurveTo(sx*R*0.85,R*0.75,sx*R*0.68,R*0.5);c.lineTo(sx*R*0.72,-R*0.1);c.closePath();c.fill();c.stroke();}
    c.fillStyle='#e8d080';c.fillRect(-R*1.1,-R*0.2,R*2.2,R*0.14);c.strokeRect(-R*1.1,-R*0.2,R*2.2,R*0.14);return;}
  if(h==='hood2'){window.__nobeard=1;hat2b(c,'hood',s,f,R,t);window.__nobeard=0;return;}
  if(h==='hood'){c.strokeStyle=K2;c.lineWidth=4.5*s;c.fillStyle=shapeShade(c,-R*1.3,R*1.3,'#4a3c30',s);
    c.beginPath();c.moveTo(-R*1.2,R*0.7);c.quadraticCurveTo(-R*1.45,-R*1.35,0,-R*1.42);c.quadraticCurveTo(R*1.45,-R*1.35,R*1.2,R*0.7);c.lineTo(R*0.82,R*0.6);c.quadraticCurveTo(R*0.95,-R*0.75,0,-R*0.82);c.quadraticCurveTo(-R*0.95,-R*0.75,-R*0.82,R*0.9);c.closePath();c.fill();c.stroke();
    c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.moveTo(-R*0.82,R*0.6);c.quadraticCurveTo(-R*0.95,-R*0.75,0,-R*0.82);c.quadraticCurveTo(R*0.95,-R*0.75,R*0.82,R*0.6);c.lineTo(R*0.6,R*0.2);c.quadraticCurveTo(0,-R*0.55,-R*0.6,R*0.2);c.closePath();c.fill();
    if(!window.__nobeard){c.fillStyle='#e4e2dc';c.beginPath();c.moveTo(-R*0.55,R*0.35);c.quadraticCurveTo(-R*0.5,R*0.95,0,R*1.08);c.quadraticCurveTo(R*0.5,R*0.95,R*0.55,R*0.35);c.quadraticCurveTo(0,R*0.6,-R*0.55,R*0.35);c.fill();c.lineWidth=3*s;c.stroke();}return;}
  return _hatR(c,h,s,f,R,t);};
// laurel wreath over the hair (gold leaves, two rows)
const _head2R=head2;
head2=function(c,hc,s,f,o,K,t,lean,HR){const r=_head2R.apply(this,arguments);if(!K.laurel||o.noLaurel)return r;const R=HR*s;
  c.save();c.translate(hc.x,hc.y);c.rotate(lean*0.5+(o.tilt||0)*f);c.lineWidth=1.8*s;c.strokeStyle='#3a2a08';
  const N=11;for(const side of [-1,1])for(let i=0;i<N;i++){const a=-Math.PI/2+side*(0.18+i/(N-1)*1.25);const rr0=R*1.02;const x=Math.cos(a)*rr0,y=Math.sin(a)*rr0*0.92-R*0.05;
    for(const row of [-1,1]){c.save();c.translate(x,y);c.rotate(a+Math.PI/2*side*-1+row*0.55*side+(side>0?0:Math.PI));
      const g=c.createLinearGradient(0,-5*s,0,5*s);g.addColorStop(0,'#fff0a0');g.addColorStop(0.5,'#e0b038');g.addColorStop(1,'#8a6010');c.fillStyle=g;
      c.beginPath();c.ellipse(row*4*s,0,9*s,3.6*s,row*0.5,0,TAU);c.fill();c.stroke();c.restore();}}
  c.restore();return r;};
const ROM=(kind)=>o=>fig2(o.c,{kind,...o});
const CAESAR=ROM('caesar'),BRUTUS=ROM('brutus'),CALP=ROM('calpurnia'),SEER=ROM('seer'),LEG=ROM('legion');
