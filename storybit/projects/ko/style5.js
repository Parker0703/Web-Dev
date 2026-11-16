'use strict';
// ===== STYLE 5 = Style 4 3D ink-outlined worlds (pre-rendered plates) + Style 2 characters =====
Object.assign(KIND2,{
  kenji:{coat:'#e0508e',limb:'#ecebe6',hat:'none',long:true,robe:true,trim:'#f0c040',hair:'#1c1820',hairStyle:'quiff',hair4:'pomp',skin:'#f6efe2',s4face:1,pants:'#2a2030'},
  master:{coat:'#2c3f8c',limb:'#ecebe6',hat:'none',long:true,robe:true,trim:'#8ab0f0',hair:'#ffffff',hairStyle:'curly',hair4:'cloud',skin:'#f4ece0',s4face:1,old:1,beard:1,pants:'#1e2a5a',sash:'#e07a2a'},
});
function robe2(c,s,f,K,TOR){const top=-TOR*s+8*s;if(!CUR.back){
  c.fillStyle=K.trim;c.strokeStyle=K2;c.lineWidth=2.4*s;for(const d of [-1,1]){c.beginPath();c.moveTo(d*5*s,top+2*s);c.lineTo(d*15*s,top+2*s);c.lineTo(d*3*s,top+46*s);c.lineTo(-d*3*s,top+46*s);c.closePath();c.fill();c.stroke();}
  c.fillStyle='#f4eee0';c.beginPath();c.moveTo(-5*s,top+2*s);c.lineTo(5*s,top+2*s);c.lineTo(0,top+20*s);c.closePath();c.fill();
  }
  // obi
  const oy=top+52*s;c.fillStyle=K.sash||'#c89a2a';c.strokeStyle=K2;c.lineWidth=2.6*s;c.beginPath();c.rect(-31*s,oy,62*s,13*s);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(-31*s,oy+2*s,62*s,2.5*s);
  c.fillStyle=K.trim;c.fillRect(-31*s,oy+6*s,62*s,2*s);}
// detailed katana held in the front hand
function katana2(ang){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(ang*f);c.scale(f,1);c.lineJoin='round';
  // grip (tsuka) with diamond wrap
  const gl=44*s,gw=6.5*s;c.fillStyle='#1e1a2c';c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.rect(-gw,-6*s,gw*2,gl);c.fill();c.stroke();
  c.fillStyle='#ece4d0';for(let k=0;k<5;k++){const y=-2*s+k*8.5*s;c.beginPath();c.moveTo(0,y);c.lineTo(gw*0.7,y+4*s);c.lineTo(0,y+8*s);c.lineTo(-gw*0.7,y+4*s);c.closePath();c.fill();}
  c.fillStyle='#2a2626';c.fillRect(-gw-1*s,gl-8*s,gw*2+2*s,5*s);
  // tsuba + habaki
  c.fillStyle='#2a2628';c.beginPath();c.ellipse(0,-9*s,15*s,4.5*s,0,0,TAU);c.fill();c.stroke();c.strokeStyle='#d8a840';c.lineWidth=1.6*s;c.beginPath();c.ellipse(0,-9*s,13*s,3.6*s,0,0,TAU);c.stroke();
  c.fillStyle='#e0b048';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(-4.5*s,-19*s,9*s,8*s);c.strokeRect(-4.5*s,-19*s,9*s,8*s);
  // curved blade with shinogi + wavy hamon
  const L=150*s,bw=7*s,cv=10*s;const P=(k,side)=>{const y=-19*s-k*L,x=cv*k*k+side;return [x,y];};
  c.beginPath();c.moveTo(-bw/2,-19*s);for(let k=0;k<=1.001;k+=0.05){const w=k>0.9?bw*(1-k)/0.1:bw;const [x,y]=P(k,-w/2);c.lineTo(x,y);}for(let k=1;k>=-0.001;k-=0.05){const w=k>0.9?bw*(1-k)/0.1:bw;const [x,y]=P(k,w/2);c.lineTo(x,y);}c.closePath();
  const bg=c.createLinearGradient(-bw,0,bw,0);bg.addColorStop(0,'#6a7486');bg.addColorStop(0.45,'#c4ccd8');bg.addColorStop(0.55,'#f4f8ff');bg.addColorStop(1,'#ffffff');c.fillStyle=bg;c.fill();c.strokeStyle=K2;c.lineWidth=2.4*s;c.stroke();
  c.strokeStyle='rgba(255,255,255,0.9)';c.lineWidth=1.3*s;c.beginPath();for(let k=0.02;k<0.9;k+=0.02){const [x,y]=P(k,bw*0.12+Math.sin(k*60)*bw*0.1);k<0.03?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  c.strokeStyle='rgba(60,70,90,0.6)';c.lineWidth=1*s;c.beginPath();for(let k=0;k<0.92;k+=0.05){const [x,y]=P(k,-bw*0.15);k<0.01?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  c.restore();};}
// ---- arms start at the SHOULDERS (re-patch the Style 2 rig for Style 5 only)
(function(){let src=_fig2raw.toString();const rp=(a,b)=>{if(!src.includes(a))throw new Error('s5 patch miss '+a);src=src.split(a).join(b);};
  rp("const AF=ik2(sh.x,sh.y,sh.x+hf[0]*s,sh.y+hf[1]*s,UA*s,FA*s,el),AB=ik2(sh.x,sh.y,sh.x+hb[0]*s,sh.y+hb[1]*s,UA*s,FA*s,el);",
     "const SW=o.view==='front'||o.back?24:(o.view==='side'?4:19),shF={x:sh.x+f*SW*s,y:sh.y+5*s},shB={x:sh.x-f*SW*0.85*s,y:sh.y+5*s};const AF=ik2(shF.x,shF.y,shF.x+hf[0]*s,shF.y+hf[1]*s,UA*s,FA*s,el),AB=ik2(shB.x,shB.y,shB.x+hb[0]*s,shB.y+hb[1]*s,UA*s,FA*s,el);");
  rp('HR=40.1;','HR=47;');rp('(HR-2)*s','(HR-8)*s');
  src=src.replace(/limb2\(c,hip,L[BF]\.e[^;]*;boot2\(c,L[BF]\.h,s,f,K\);/g,m=>'if(!o.kn){'+m+'}');
  rp("limb2(c,sh,AB.","limb2(c,shB,AB.");rp("limb2(c,sh,AF.","limb2(c,shF,AF.");
  // front view: each elbow bends OUTWARD from its own shoulder, and both arms are drawn in front of the torso
  rp("AF=ik2(shF.x,shF.y,shF.x+hf[0]*s,shF.y+hf[1]*s,UA*s,FA*s,el)","AF=ik2(shF.x,shF.y,shF.x+hf[0]*s,shF.y+hf[1]*s,UA*s,FA*s,(o.view==='front'&&!o.back)?(p=>(p.x-shF.x)*f*1.0+p.y*0.15):el)");
  rp("AB=ik2(shB.x,shB.y,shB.x+hb[0]*s,shB.y+hb[1]*s,UA*s,FA*s,el)","AB=ik2(shB.x,shB.y,shB.x+hb[0]*s,shB.y+hb[1]*s,UA*s,FA*s,(o.view==='front'&&!o.back)?(p=>(shB.x-p.x)*f*1.0+p.y*0.15):el)");
  rp("limb2(c,shB,AB.e,AB.h,K.coat?14:10,shd(K.coat||K.limb,-0.25),s);cuff2(c,AB,s,K);fist2(c,AB.h,s,shd(K.limb,-0.18));","if(!(o.view==='front'&&!o.back)){limb2(c,shB,AB.e,AB.h,K.coat?14:10,shd(K.coat||K.limb,-0.25),s);cuff2(c,AB,s,K);fist2(c,AB.h,s,shd(K.limb,-0.18));}");
  rp("limb2(c,shF,AF.e,AF.h,K.coat?14:10,K.coat||K.limb,s);cuff2(c,AF,s,K);","if(o.view==='front'&&!o.back){limb2(c,shB,AB.e,AB.h,K.coat?14:10,shd(K.coat||K.limb,-0.1),s);cuff2(c,AB,s,K);if(o.propB)o.propB(c,AB.h,s,-f,t);fist2(c,AB.h,s,shd(K.limb,-0.06));}limb2(c,shF,AF.e,AF.h,K.coat?14:10,K.coat||K.limb,s);cuff2(c,AF,s,K);");
  (0,eval)('var _fig2raw5='+src);let w=fig2.toString().split('_fig2raw(').join('_fig2raw5(');(0,eval)('fig2='+w);})();
// ---- Style 4 face: warm skin, hard cel shadow away from the light, simple expressive Style 4 features
const EMAP={open:'dot',none:'dot'};
const _face2s5=face2;
face2=function(c,o,s,f,R,t){const K=KIND2[o.kind]||{};if(!K.s4face||o.back)return _face2s5(c,o,s,f,R,t);
  c.save();c.beginPath();c.arc(0,0,R-1.5*s,0,TAU);c.clip();const Ld=L2.dx||1;
  // 1 base skin
  c.fillStyle=K.skin;c.fillRect(-R,-R,2*R,2*R);
  // 2 soft form shadow: light wraps from the key side, falls off toward the far edge
  let gg=c.createRadialGradient(Ld*R*0.32,-R*0.34,R*0.1,Ld*R*0.1,-R*0.1,R*1.25);gg.addColorStop(0,'rgba(255,248,236,0.35)');gg.addColorStop(0.55,'rgba(255,240,225,0)');gg.addColorStop(1,'rgba(170,110,130,0.26)');c.fillStyle=gg;c.fillRect(-R,-R,2*R,2*R);
  // 3 hard core-shadow crescent on the far side (Style 4 cel layer)
  c.fillStyle='rgba(170,120,150,0.20)';c.beginPath();c.arc(0,0,R*1.02,0,TAU);c.arc(Ld*R*0.34,-R*0.1,R*1.02,0,TAU,true);c.fill('evenodd');
  // 4 deepest occlusion layer at the far edge
  c.fillStyle='rgba(120,80,120,0.14)';c.beginPath();c.arc(0,0,R*1.02,0,TAU);c.arc(Ld*R*0.14,-R*0.04,R*1.0,0,TAU,true);c.fill('evenodd');
  // 5 hair casts a shadow band on the forehead
  gg=c.createLinearGradient(0,-R*0.78,0,-R*0.28);gg.addColorStop(0,'rgba(110,70,100,0.26)');gg.addColorStop(1,'rgba(110,60,80,0)');c.fillStyle=gg;c.fillRect(-R,-R,2*R,R*0.75);
  // 6 underside of the jaw turning away (chin plane)
  c.fillStyle='rgba(150,100,125,0.15)';c.beginPath();c.arc(0,0,R*1.02,0,TAU);c.arc(Ld*R*0.06,-R*0.2,R*1.0,0,TAU,true);c.fill('evenodd');
  // 7 warm cheek flush + forehead/cheek highlights on the lit side
  c.fillStyle='rgba(255,170,170,0.06)';c.beginPath();c.ellipse(0,R*0.3,R*0.75,R*0.3,0,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.38)';c.beginPath();c.ellipse(Ld*R*0.36,-R*0.28,R*0.2,R*0.1,Ld*-0.4,0,TAU);c.fill();
  c.fillStyle='rgba(255,255,255,0.22)';c.beginPath();c.ellipse(Ld*R*0.5,R*0.18,R*0.1,R*0.06,0,0,TAU);c.fill();
  // 8 thin rim on the lit edge
  c.strokeStyle='rgba(255,250,240,0.75)';c.lineWidth=3*s;c.beginPath();c.arc(0,0,R-3*s,Ld>0?-1.25:Math.PI+0.45,Ld>0?-0.45:Math.PI+1.25);c.stroke();
  c.restore();
  const P={...o,eyes:EMAP[o.eyes]||o.eyes||'dot'};turnFace(c,o,P,K,R,s,f);
  if(K.hat==='none'||!K.hat)hairLayer(c,R,s,f,o,K);};
function beard5(c,R,s,f){const P5=[[0,0.98,0.2,0.26],[-0.22,0.78,0.2,0.17],[0.22,0.78,0.2,0.17],[0,0.74,0.24,0.15],[-0.11,0.9,0.15,0.17],[0.11,0.9,0.15,0.17]];
  c.lineWidth=4.5*s;c.strokeStyle=K2;for(const [x,y,rx,ry] of P5){c.beginPath();c.ellipse(x*R,y*R,rx*R,ry*R,0,0,TAU);c.stroke();}
  for(const [x,y,rx,ry] of P5){const gg=c.createRadialGradient(x*R+L2.dx*rx*R*0.3,y*R-ry*R*0.4,1,x*R,y*R,rx*R*1.2);gg.addColorStop(0,'#ffffff');gg.addColorStop(1,'#cfcdd6');c.fillStyle=gg;c.beginPath();c.ellipse(x*R,y*R,rx*R,ry*R,0,0,TAU);c.fill();}
  c.fillStyle='rgba(140,140,180,0.3)';c.beginPath();c.ellipse(-L2.dx*R*0.12,R*0.94,R*0.14,R*0.2,0,0,TAU);c.fill();
  for(const sd of [-1,1]){c.fillStyle='#fbfaf6';c.strokeStyle='rgba(30,24,40,0.7)';c.lineWidth=2*s;c.beginPath();c.moveTo(0,R*0.27);c.quadraticCurveTo(sd*R*0.22,R*0.18,sd*R*0.36,R*0.3);c.quadraticCurveTo(sd*R*0.22,R*0.3,0,R*0.33);c.closePath();c.fill();c.stroke();}}
// ---- Style 4 hair, drawn in 2D: smooth glossy sculpted volumes, hard cel shadow, crisp shine spots (no strand lines)
const _hairL5=hairLayer;
function unionShapes(c,shapes,s,fill,olw){c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=olw;for(const sh of shapes){sh();c.stroke();}c.fillStyle=fill;for(const sh of shapes){sh();c.fill();}}
hairLayer=function(c,R,s,f,o,K){
  if(K.hair4==='pomp'){c.save();const vf=o.view==='front'?0.35:1,lean=f*vf;
    const cap=()=>{c.beginPath();c.moveTo(-R*1.03,-R*0.02);c.bezierCurveTo(-R*1.08,-R*0.9,-R*0.55,-R*1.1,0,-R*1.08);c.bezierCurveTo(R*0.55,-R*1.1,R*1.08,-R*0.9,R*1.03,-R*0.02);
      c.quadraticCurveTo(R*0.95,-R*0.42,R*0.62,-R*0.5);c.quadraticCurveTo(R*0.2,-R*0.62,-R*0.05+lean*R*0.1,-R*0.56);c.quadraticCurveTo(-R*0.5,-R*0.5,-R*0.86,-R*0.32);c.quadraticCurveTo(-R*1.0,-R*0.2,-R*1.03,-R*0.02);c.closePath();};
    const pomp=()=>{c.beginPath();c.ellipse(lean*R*0.12,-R*1.12,R*0.9,R*0.52,-lean*0.12,0,TAU);};
    const pomp2=()=>{c.beginPath();c.moveTo(-R*0.55,-R*0.82);c.bezierCurveTo(-R*0.3,-R*1.55,R*0.75,-R*1.62,R*0.98,-R*1.02);c.bezierCurveTo(R*1.02,-R*0.82,R*0.86,-R*0.66,R*0.62,-R*0.72);c.bezierCurveTo(R*0.3,-R*0.8,-R*0.2,-R*0.72,-R*0.55,-R*0.82);c.closePath();};
    const burn=sd=>()=>{c.beginPath();c.moveTo(sd*R*0.98,-R*0.3);c.quadraticCurveTo(sd*R*1.04,R*0.02,sd*R*0.9,R*0.18);c.lineTo(sd*R*0.8,R*0.06);c.quadraticCurveTo(sd*R*0.84,-R*0.12,sd*R*0.8,-R*0.36);c.closePath();};
    const shp=[cap,pomp,pomp2,burn(-1),burn(1)];const gr=c.createLinearGradient(0,-R*1.4,0,0);gr.addColorStop(0,'#3e3846');gr.addColorStop(0.55,'#221e28');gr.addColorStop(1,'#141118');
    unionShapes(c,shp,s,gr,4.5*s);
    // hard cel shadow on the side away from the light + under the pomp
    c.save();cap();c.clip();c.fillStyle='rgba(6,4,10,0.55)';c.beginPath();c.ellipse(-L2.dx*R*0.7,-R*0.3,R*0.7,R*0.9,0,0,TAU);c.fill();c.restore();
    c.save();pomp();c.clip();c.fillStyle='rgba(6,4,10,0.45)';c.beginPath();c.ellipse(lean*R*0.2-L2.dx*R*0.45,-R*0.78,R*0.8,R*0.3,0,0,TAU);c.fill();c.restore();
    c.strokeStyle='rgba(6,4,10,0.75)';c.lineWidth=2.6*s;c.beginPath();c.moveTo(-R*0.5,-R*0.86);c.bezierCurveTo(-R*0.1,-R*1.2,R*0.5,-R*1.28,R*0.86,-R*1.0);c.stroke();
    // crisp glossy shine spots (Style 4)
    c.fillStyle='rgba(255,246,236,0.92)';c.beginPath();c.ellipse(R*0.12+L2.dx*R*0.2,-R*1.4,R*0.3,R*0.09,-0.2,0,TAU);c.fill();
    c.beginPath();c.ellipse(R*0.58,-R*1.12,R*0.14,R*0.06,-0.5,0,TAU);c.fill();
    c.fillStyle='rgba(255,246,236,0.55)';c.beginPath();c.ellipse(L2.dx*R*0.62,-R*0.62,R*0.1,R*0.18,L2.dx*0.5,0,TAU);c.fill();
    c.restore();return;}
  if(K.hair4==='cloud'){c.save();const P=[];const ring=o.back?[[-0.9,-0.1],[-0.95,-0.55],[-0.62,-0.95],[-0.2,-1.12],[0.25,-1.1],[0.66,-0.92],[0.95,-0.52],[0.9,-0.1],[-0.45,-0.45],[0.0,-0.55],[0.45,-0.45],[-0.5,0.1],[0,0.05],[0.5,0.1],[0,0.5],[-0.55,0.5],[0.55,0.5]]
      :[[-1.0,0.05],[-1.02,-0.38],[-0.8,-0.8],[-0.38,-1.08],[0.08,-1.15],[0.52,-1.02],[0.88,-0.72],[1.04,-0.32],[1.0,0.08],[-0.2,-0.78],[0.3,-0.78]];
    for(const [x,y] of ring)P.push([x*R,y*R,R*(o.back?0.42:0.36)]);
    const shapes=P.map(([x,y,r])=>()=>{c.beginPath();c.arc(x,y,r,0,TAU);});unionShapes(c,shapes,s,'#fbfaf6',4.2*s);
    for(const [x,y,r] of P){c.save();c.beginPath();c.arc(x,y,r,0,TAU);c.clip();c.fillStyle='rgba(150,150,190,0.38)';c.beginPath();c.arc(x-L2.dx*r*0.55,y+r*0.45,r*0.95,0,TAU);c.fill();
      c.fillStyle='rgba(255,255,255,0.95)';c.beginPath();c.ellipse(x+L2.dx*r*0.3,y-r*0.38,r*0.28,r*0.14,0,0,TAU);c.fill();c.restore();}
    c.restore();return;}
  return _hairL5(c,R,s,f,o,K);};
// ---- Style 4 look, drawn in 2D: ink outline, hard cel shadow, kimono hem flare, master beard + headband
const LAY={};function lyr5(k){return LAY[k]||(LAY[k]=mk(W,H));}
function masterExtras(c,hc,s,f,o){const R=47*s;c.save();c.translate(hc.x,hc.y-R*0.46);c.lineJoin='round';c.strokeStyle=K2;
  // headband over the cloud hair with knot tails
  c.fillStyle='#f4f2ec';c.lineWidth=3.2*s;c.beginPath();c.moveTo(-R*1.12,-R*0.38);c.quadraticCurveTo(0,-R*0.58,R*1.12,-R*0.38);c.lineTo(R*1.1,-R*0.12);c.quadraticCurveTo(0,-R*0.32,-R*1.1,-R*0.12);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#7aa0e8';c.lineWidth=1.6*s;c.beginPath();c.moveTo(-R*1.05,-R*0.26);c.quadraticCurveTo(0,-R*0.46,R*1.05,-R*0.26);c.stroke();
  const kx=-f*R*1.08;c.fillStyle='#f4f2ec';c.strokeStyle=K2;c.lineWidth=2.6*s;for(const [a,l] of [[0.5,0.7],[1.0,0.55]]){c.beginPath();c.moveTo(kx,-R*0.3);c.lineTo(kx-f*Math.cos(a)*R*l,-R*0.3+Math.sin(a)*R*l-R*0.08);c.lineTo(kx-f*Math.cos(a)*R*l,-R*0.3+Math.sin(a)*R*l+R*0.08);c.closePath();c.fill();c.stroke();}
  c.restore();}
const _robe2=robe2;robe2=function(c,s,f,K,TOR){_robe2(c,s,f,K,TOR);
  // flared kimono hem below the waist (structured body, not a tube)
  const HK=K.long?(CUR.kn?1.34:1.72):1;c.save();c.transform(1,0,0,HK,0,-4*s+4*s*HK);c.strokeStyle=K2;c.lineWidth=3*s;const g=c.createLinearGradient(-40*s,0,40*s,0);g.addColorStop(L2.dx>0?1:0,shd(K.hakama||K.coat,0.18));g.addColorStop(0.5,K.hakama||K.coat);g.addColorStop(L2.dx>0?0:1,shd(K.hakama||K.coat,-0.35));
  c.fillStyle=g;c.beginPath();c.moveTo(-29*s,-4*s);c.lineTo(29*s,-4*s);c.quadraticCurveTo(36*s,26*s,40*s,46*s);c.quadraticCurveTo(0,52*s,-40*s,46*s);c.quadraticCurveTo(-36*s,26*s,-29*s,-4*s);c.closePath();c.fill();c.stroke();
  c.fillStyle=K.trim;c.beginPath();c.moveTo(-39*s,40*s);c.quadraticCurveTo(0,46*s,39*s,40*s);c.lineTo(40*s,46*s);c.quadraticCurveTo(0,52*s,-40*s,46*s);c.closePath();c.fill();
  c.strokeStyle='rgba(20,10,30,0.35)';c.lineWidth=2*s;for(const x of [-16,4,20]){c.beginPath();c.moveTo(x*s,4*s);c.quadraticCurveTo(x*1.15*s,24*s,x*1.3*s,44*s);c.stroke();}
  if(!CUR.back){c.fillStyle=K.trim;c.strokeStyle=K2;c.lineWidth=2*s;c.beginPath();c.moveTo(-3*s,-4*s);c.lineTo(3*s,-4*s);c.lineTo(6*s,48*s);c.lineTo(-2*s,48*s);c.closePath();c.fill();c.stroke();}
  c.restore();c.save();c.strokeStyle=K2;
  // obi knot at the side
  c.fillStyle=K.sash||'#c89a2a';c.lineWidth=2.4*s;c.beginPath();c.ellipse(-f*24*s,-22*s,7*s,5*s,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-f*24*s,-18*s);c.lineTo(-f*30*s,-2*s);c.lineTo(-f*22*s,-3*s);c.closePath();c.fill();c.stroke();
  c.restore();};
// neck in skin tone for Style 5 faces
{const _n=neck2;neck2=function(c,nk,hc,s,K,o){if(!(K&&K.s4face))return _n(c,nk,hc,s,K,o);const a={x:nk.x,y:nk.y+6*s},b={x:hc.x*0.35+nk.x*0.65,y:hc.y*0.35+nk.y*0.65};c.lineCap='round';
  c.strokeStyle=K2;c.lineWidth=22*s;seg(c,a.x,a.y,b.x,b.y);c.strokeStyle=K.skin;c.lineWidth=15*s;seg(c,a.x,a.y,b.x,b.y);c.strokeStyle='rgba(150,90,105,0.6)';c.lineWidth=15*s;seg(c,b.x,b.y,b.x*0.6+a.x*0.4,b.y*0.6+a.y*0.4);};}

// ---------- view-dependent face: features are drawn front-on, then wrapped around the head sphere ----------
// front 0°, three-quarter ~35°, side ~80°. Each vertical strip of the face moves to R·sin(φ+θ) and is squeezed by cos(φ+θ),
// so the near eye stays big, the far eye narrows toward the far edge, the mouth slides toward the facing side, and
// in side view the far eye goes over the horizon and disappears. Mirrors automatically with f.
const _TF={};
function turnFace(c,o,P,K,R,s,f){const view=o.back?'back':(o.view||'front');const th=view==='front'?0:0.5;// side view uses the same 3/4 turn
  if(th===0){c.save();c.translate(f*R*0.03,0);drawFace4(c,0,0,R/126,P,K);if(K.beard)beard5(c,R,s,f);c.restore();return;}
  const m=c.getTransform(),sc=Math.max(0.2,Math.hypot(m.a,m.b));const E=1.15*R,Wd=Math.ceil(2*E*sc),Hd=Wd;
  let cv=_TF.cv;if(!cv||cv.width<Wd||cv.height<Hd){cv=_TF.cv=document.createElement('canvas');cv.width=Math.max(Wd,cv?cv.width:0);cv.height=Math.max(Hd,cv?cv.height:0);}
  const g=cv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);g.setTransform(sc,0,0,sc,Wd/2,Hd/2);drawFace4(g,0,0,R/126,P,K);if(K.beard)beard5(g,R,s,1);
  // features are designed facing right (+x); mirror the source for f<0 by flipping θ
  const T=th*f,N=72;c.save();c.beginPath();c.arc(0,0,R-1.5*s,0,TAU);c.clip();c.imageSmoothingEnabled=true;
  for(let i=0;i<N;i++){const u0=-E+2*E*i/N,u1=-E+2*E*(i+1)/N;const p0=Math.asin(clamp(u0/R,-0.999,0.999))+T,p1=Math.asin(clamp(u1/R,-0.999,0.999))+T;
    if(Math.abs(p0)>=Math.PI/2&&Math.abs(p1)>=Math.PI/2)continue;const q0=Math.max(-Math.PI/2,Math.min(Math.PI/2,p0)),q1=Math.max(-Math.PI/2,Math.min(Math.PI/2,p1));const x0=R*Math.sin(q0),x1=R*Math.sin(q1);const w=x1-x0;if(w<=0.05)continue;
    const sx=(u0+E)*sc,sw=Math.max(1,(u1-u0)*sc*(q1-q0)/(p1-p0||1));c.drawImage(cv,sx,0,sw,Hd,x0,-E,w+0.6,2*E);}
  c.restore();
}
