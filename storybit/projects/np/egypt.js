'use strict';
// ===== Cleopatra cast: Egyptian royal attire + Romans =====
Object.assign(KIND2,{
  cleo:{coat:'#f7f3ea',limb:'#ecebe6',hat:'wig',hair:'#0c0a10',skirt:'#f4efe2',skirtL:114,hem:'#d8a830',usekh:1,sash:1,uraeus:1,kohl:1,cuffs:1},
  ptolemy:{coat:'#f2ecdc',limb:'#ecebe6',hat:'nemes',skirt:'#efe8d6',skirtL:52,usekh:1,sash:1,kohl:1},
  antony:{coat:'#a82424',limb:'#ecebe6',hat:'none',hair:'#3a2414',hairStyle:'curly',skirt:'#962020',skirtL:46,armor:'muscle',belt:true,cape:'#a01c1c',stubble:true},
  octavian:{coat:'#efe9dc',limb:'#ecebe6',hat:'none',hair:'#c89a52',hairStyle:'sidepart',skirt:'#e6dfcf',skirtL:104,toga:'#5a1a5e',togaW:9},
  egysoldier:{coat:'#f0e8d4',limb:'#ecebe6',hat:'khat',skirt:'#ece2c8',skirtL:46,belt:true,usekhS:1},
  servant:{coat:'#e8dcc0',limb:'#ecebe6',hat:'none',hair:'#1a1410',hairStyle:'buzz',skirt:'#e2d6ba',skirtL:50},
  envoy:{coat:'#2a6a5a',limb:'#ecebe6',hat:'none',hair:'#2a1a10',hairStyle:'curly',skirt:'#245a4c',skirtL:108,stubble:true},
  envoy2:{coat:'#c08a2a',limb:'#ecebe6',hat:'none',hair:'#d8d8d8',hairStyle:'slick',skirt:'#a87420',skirtL:108,stache:1},
});
// torso extras (inside torso transform; origin = hip)
const _rT=romanTorso;
romanTorso=function(c,K,s,f,t,TOR){
  if(K.armor==='muscle'){// bronze muscle cuirass
    const g=c.createLinearGradient(-27*s,0,27*s,0);g.addColorStop(L2.dx>0?0:1,'#6a4818');g.addColorStop(0.55,'#d8a850');g.addColorStop(L2.dx>0?1:0,'#ffe8a8');
    c.fillStyle=g;c.beginPath();c.moveTo(-25*s,-TOR*s+12*s);c.quadraticCurveTo(0,-TOR*s+4*s,25*s,-TOR*s+12*s);c.lineTo(24*s,-6*s);c.quadraticCurveTo(0,4*s,-24*s,-6*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3*s;c.stroke();
    c.strokeStyle='rgba(80,50,10,0.55)';c.lineWidth=2.4*s;c.beginPath();c.arc(-9*s,-TOR*s+40*s,10*s,0.2,Math.PI-0.2);c.arc(9*s,-TOR*s+40*s,10*s,0.2,Math.PI-0.2);c.stroke();
    c.beginPath();c.moveTo(0,-TOR*s+30*s);c.lineTo(0,-14*s);c.moveTo(-10*s,-34*s);c.lineTo(10*s,-34*s);c.moveTo(-9*s,-22*s);c.lineTo(9*s,-22*s);c.stroke();
    for(let i=-3;i<=3;i++){c.fillStyle=i%2?'#8a1c1c':'#6a4a1a';rr(c,i*7.6*s-3.4*s,-4*s,6.8*s,16*s,2*s);c.fill();}
    return;}
  _rT(c,K,s,f,t,TOR);
  if(K.sash){c.fillStyle='#d8a830';c.fillRect(-27*s,-10*s,54*s,8*s);c.strokeStyle=K2;c.lineWidth=2*s;c.strokeRect(-27*s,-10*s,54*s,8*s);
    c.fillStyle='#1a3a8a';c.fillRect(-4*s,-6*s,8*s,40*s);c.fillStyle='#b81c2a';c.fillRect(-4*s,8*s,8*s,6*s);c.fillRect(-4*s,22*s,8*s,6*s);c.fillStyle='#d8a830';c.fillRect(-6*s,34*s,12*s,6*s);
    // pleats down the gown
    c.strokeStyle='rgba(120,100,70,0.22)';c.lineWidth=1.6*s;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*5*s,-TOR*s+30*s);c.lineTo(i*6*s,-12*s);c.stroke();}}
  if(K.usekh||K.usekhS){// broad collar: concentric bands of gold, lapis, turquoise, carnelian
    const R0=K.usekhS?20:30,cy=-TOR*s+2*s;const bands=K.usekhS?['#d8a830','#2a5ab8','#d8a830']:['#e8b838','#1f4aa8','#e8b838','#2ab0a0','#e8b838','#c03020','#e8b838'];
    for(let i=bands.length-1;i>=0;i--){const r=(10+(R0-10)*(i+1)/bands.length)*s;c.fillStyle=bands[i];c.beginPath();c.ellipse(0,cy,r*1.25,r,0,0,Math.PI);c.closePath();c.fill();}
    c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.ellipse(0,cy,R0*1.25*s,R0*s,0,0,Math.PI);c.stroke();
    // beads along the rim
    c.fillStyle='#ffe9a0';for(let i=1;i<14;i++){const a=i/14*Math.PI;c.beginPath();c.arc(Math.cos(a)*R0*1.25*s*0.97,cy+Math.sin(a)*R0*s*0.97,1.8*s,0,TAU);c.fill();}
    const gl=c.createRadialGradient(-6*s,cy+4*s,0,0,cy,R0*s);gl.addColorStop(0,'rgba(255,255,255,0.35)');gl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gl;c.beginPath();c.ellipse(0,cy,R0*1.25*s,R0*s,0,0,Math.PI);c.fill();}
};
// nemes (striped royal headcloth) and khat (plain soldier headcloth)
const _hatE=hat2b;
hat2b=function(c,h,s,f,R,t){
  if(h==='nemes'||h==='khat'){c.strokeStyle=K2;c.lineWidth=4*s;const nm=h==='nemes';
    c.save();c.beginPath();c.moveTo(-R*1.02,-R*0.36);c.quadraticCurveTo(-R*1.1,-R*1.25,0,-R*1.25);c.quadraticCurveTo(R*1.1,-R*1.25,R*1.02,-R*0.36);c.lineTo(R*1.32,R*1.15);c.lineTo(R*0.86,R*1.15);c.lineTo(R*0.86,-R*0.36);c.lineTo(-R*0.86,-R*0.36);c.lineTo(-R*0.86,R*1.15);c.lineTo(-R*1.32,R*1.15);c.closePath();
    c.fillStyle=nm?'#e8b838':'#f0e8d4';c.fill();c.save();c.clip();if(nm){c.fillStyle='#1f3c9a';for(let i=-12;i<14;i++){c.save();c.translate(0,i*R*0.16);c.fillRect(-R*2,0,R*4,R*0.075);c.restore();}}c.restore();c.stroke();
    c.fillStyle=nm?'#e8b838':'#d8c8a0';c.fillRect(-R*0.9,-R*0.5,R*1.8,R*0.15);c.strokeRect(-R*0.9,-R*0.5,R*1.8,R*0.15);
    if(nm){cobra(c,0,-R*0.58,R*0.3,s);}c.restore();return;}
  if(h==='wig'){c.save();c.strokeStyle=K2;c.lineWidth=4*s;const g=c.createLinearGradient(-R*1.2,0,R*1.2,0);g.addColorStop(0,'#05040a');g.addColorStop(0.45,'#1c1a26');g.addColorStop(0.7,'#3a3848');g.addColorStop(1,'#0a0810');c.fillStyle=g;
    const bang=-R*0.36;c.beginPath();c.moveTo(-R*0.78,bang);c.lineTo(R*0.78,bang);c.lineTo(R*0.84,R*0.05);c.lineTo(R*0.9,R*0.92);c.lineTo(R*1.24,R*0.92);c.lineTo(R*1.24,-R*0.3);c.quadraticCurveTo(R*1.3,-R*1.3,0,-R*1.32);c.quadraticCurveTo(-R*1.3,-R*1.3,-R*1.24,-R*0.3);c.lineTo(-R*1.24,R*0.92);c.lineTo(-R*0.9,R*0.92);c.lineTo(-R*0.84,R*0.05);c.closePath();c.fill();c.stroke();
    c.save();c.clip();c.strokeStyle='rgba(120,120,150,0.35)';c.lineWidth=1.6*s;for(let i=-11;i<=11;i++){const x=i*R*0.11;c.beginPath();c.moveTo(x,-R*1.25);c.quadraticCurveTo(x*1.1,-R*0.8,x*1.12,R*1.0);c.stroke();}
    c.fillStyle='rgba(200,200,230,0.22)';c.beginPath();c.ellipse(R*0.3*(L2.dx||1),-R*0.95,R*0.55,R*0.14,-0.2,0,TAU);c.fill();c.restore();
    c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(-R*0.78,bang);c.lineTo(R*0.78,bang);c.stroke();c.restore();return;}
  return _hatE(c,h,s,f,R,t);};
// gold rearing cobra (uraeus)
function cobra(c,x,y,r,s){c.save();c.translate(x,y);const g=c.createLinearGradient(-r,0,r,0);g.addColorStop(0,'#a87418');g.addColorStop(0.5,'#ffe48a');g.addColorStop(1,'#b8821c');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=2.2*s;
  c.beginPath();c.moveTo(-r*0.35,r*0.6);c.quadraticCurveTo(-r*0.95,-r*0.4,-r*0.45,-r*1.0);c.quadraticCurveTo(0,-r*1.35,r*0.45,-r*1.0);c.quadraticCurveTo(r*0.95,-r*0.4,r*0.35,r*0.6);c.closePath();c.fill();c.stroke();
  c.fillStyle='#1f4aa8';c.beginPath();c.ellipse(0,-r*0.35,r*0.22,r*0.42,0,0,TAU);c.fill();c.fillStyle='#c01828';c.beginPath();c.arc(0,-r*0.85,r*0.12,0,TAU);c.fill();c.restore();}
// Cleopatra's head: gold diadem + uraeus over the bob, kohl wings on the eyes
const _head2E=head2;
head2=function(c,hc,s,f,o,K,t,lean,HR){const r=_head2E.apply(this,arguments);if(!(K.uraeus||K.kohl))return r;const R=HR*s;
  c.save();c.translate(hc.x,hc.y);c.rotate(lean*0.5+(o.tilt||0)*f);
  if(K.kohl&&!o.back&&o.eyes!=='closed'&&o.eyes!=='happy'){const ex=[-11*s,11*s],ey=1.5*s;c.strokeStyle='#0a0810';c.lineCap='round';c.lineWidth=2.8*s;
    for(let i=0;i<2;i++){const d=i?1:-1;c.beginPath();c.moveTo(ex[i]+d*4*s,ey-4*s);c.quadraticCurveTo(ex[i]+d*9*s,ey-4.5*s,ex[i]+d*15*s,ey-8*s);c.stroke();}}
  if(K.uraeus){const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(0,'#9a6a10');g.addColorStop(0.5,'#ffe48a');g.addColorStop(1,'#a87418');c.strokeStyle=K2;c.lineWidth=2.6*s;
    c.fillStyle=g;c.beginPath();c.ellipse(0,-R*0.62,R*1.18,R*0.2,0,Math.PI*0.98,Math.PI*2.02);c.lineTo(R*1.16,-R*0.52);c.ellipse(0,-R*0.52,R*1.16,R*0.16,0,Math.PI*2.02,Math.PI*0.98,true);c.closePath();c.fill();c.stroke();
    for(const sx of [-0.55,0.55]){c.fillStyle='#1f4aa8';c.beginPath();c.arc(sx*R,-R*0.6,R*0.06,0,TAU);c.fill();}
    cobra(c,0,-R*0.72,R*0.34,s);
    // gold earrings
    for(const sx of [-1,1]){c.fillStyle='#e8b838';c.beginPath();c.arc(sx*R*0.86,R*0.98,R*0.09,0,TAU);c.fill();c.stroke();}}
  c.restore();return r;};
// gold arm cuffs on the fists, red cape behind Antony
let __K=null;const _fig2E=fig2;
fig2=function(c,o){const K=KIND2[o.kind]||{};__K=K;const s=o.s||1;
  if(K.cape&&!o.back){c.save();const x=o.x,y=o.y-(o.crouch||0)*s*0;const lean=(o.lean||0)*(o.f||1);c.translate(x,y-116*s);c.rotate(lean);const sw=Math.sin((o.t||0)*3)*4*s;
    const g=c.createLinearGradient(-50*s,0,50*s,0);g.addColorStop(0,shd(K.cape,-0.45));g.addColorStop(0.5,K.cape);g.addColorStop(1,shd(K.cape,-0.3));c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;
    c.beginPath();c.moveTo(-26*s,-86*s);c.lineTo(26*s,-86*s);c.quadraticCurveTo(44*s,10*s,50*s+sw,96*s);c.lineTo(-50*s+sw,96*s);c.quadraticCurveTo(-44*s,10*s,-26*s,-86*s);c.closePath();c.fill();c.stroke();c.restore();}
  const r=_fig2E(c,o);__K=null;return r;};
const _fist2E=fist2;
fist2=function(c,h,s,col){if(__K&&__K.cuffs){c.save();c.strokeStyle='#e8b838';c.lineWidth=7*s;c.beginPath();c.arc(h.x,h.y,9.5*s,0,TAU);c.stroke();c.strokeStyle='#1f4aa8';c.lineWidth=2*s;c.beginPath();c.arc(h.x,h.y,9.5*s,0,TAU);c.stroke();c.restore();}return _fist2E.apply(this,arguments);};
const CLEO=o=>fig2(o.c,{kind:'cleo',view:'front',...o});
