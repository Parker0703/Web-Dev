'use strict';
let SET=null;const SEQ=[];const shot=(d,mood,f,fade)=>{SEQ.push({d,mood,f,fade});};
const L2=(a,b,k)=>a.map((v,i)=>lerp(v,b[i],k));
// 1 · Kenji walks into the courtyard, crane down
shot(2.2,'golden',(u,q)=>{const k=eio(clamp(u/2.2,0,1)),kq=eio(clamp(q/2.2,0,1));const z=lerp(-0.6,1.3,kq);
  return {cam:{eye:L2([3.8,4.8,7.2],[2.1,2.2,5.6],k),target:[0.3,lerp(0.8,1.2,k),lerp(-0.2,1.1,k)],fov:42},post:{maxR:7,range:9},
   chars:[['kenji',[0.5,0,z],{eyes:'dot',brow:'flat',mouth:'smile',walk:q<2.0?1:0,armL:{a:20},armR:{a:20}},0.05],['master',[2.2,0.6,-4.0],{eyes:'half',brow:'flat',mouth:'flat',armL:{a:25},armR:{a:25}},-0.3]]};});
// 2 · draws the katana, smug
shot(1.8,'golden',(u,q)=>{const a=eo(clamp(q/0.6,0,1));
  return {cam:{eye:L2([1.9,1.45,4.4],[1.45,1.52,3.9],eio(u/1.8)),target:[0.45,1.5,1.8],fov:34},post:{maxR:14,range:1.2},
   chars:[['kenji',[0,0,1.5],{eyes:'half',brow:'smug',mouth:q>0.5?'smirk':'flat',armL:{a:15},armR:{a:lerp(30,100,a),f:0.45},prop:'katana',propAng3:lerp(0.7,-0.45,a),propRoll:1.3},0.15]]};},1);
// 3 · master bursts out laughing; Kenji's smugness drops
shot(1.8,'golden',(u,q)=>({cam:{eye:L2([0.15,1.35,7.8],[0.25,1.4,6.6],eio(u/1.8)),target:[0.3,1.2,1.5],fov:36},post:{maxR:14,range:3},
   chars:[['kenji',[-0.5,0,1.4],{eyes:q>1.0?'wide':'half',brow:q>1.0?'worried':'smug',mouth:q>1.0?'flat':'smirk',sweat:q>1.0?1:0,armL:{a:15},armR:{a:40,f:0.5},prop:'katana',propAng3:0.1},0.25],
          ['master',[0.95,0,1.6],{eyes:'happy',brow:'up',mouth:'grin',idle:3,tilt:Math.sin(q*20)*0.07,armL:{a:35+Math.sin(q*20)*8},armR:{a:35-Math.sin(q*20)*8}},-0.3]]}),1);
// 4 · master turns serious — dutch push-in
shot(1.8,'golden',(u,q)=>{const k=eo(clamp(u/1.8,0,1));
  return {cam:{eye:L2([2.4,1.6,5.0],[1.75,1.62,3.95],k),target:[0.9,1.52,1.4],fov:30,roll:lerp(0.06,0.18,k)},post:{maxR:18,range:1.6},
   chars:[['master',[0.9,0,1.4],{eyes:q<0.35?'closed':'dot',brow:q<0.35?'flat':'angry',mouth:q<0.35?'flat':'frown',armL:{a:20},armR:{a:20}},0.3]]};},1);
// 5 · Kenji panics (hard cut)
shot(2.4,'golden',(u,q)=>{const a=eo(clamp((q-0.25)/0.3,0,1)),sh=u>0.25&&u<0.9?(0.9-u)*0.05:0;
  return {cam:{eye:L2([0.5,1.15,6.2],[0.45,1.25,5.0],eo(clamp(u/1.2,0,1))).map((v,i)=>v+(i<2?Math.sin(u*70+i*2)*sh:0)),target:[0.4,1.45,1.6],fov:40},post:{maxR:16,range:2.2},
   chars:[['kenji',[0.4,0,1.6],{eyes:'wide',brow:q<0.25?'up':'angry',mouth:q<0.25?'o':'shout',sweat:1,idle:2,armL:{a:lerp(20,150,a),bend:-20},armR:{a:lerp(20,150,a),bend:-20}},0]]};});
let T0=[];{let s=0;for(const S of SEQ){T0.push(s);s+=S.d;}}
const DUR=SEQ.reduce((s,S)=>s+S.d,0);
function drawShot(i,t){const S=SEQ[i],u=t-T0[i],q=Math.floor(u*12)/12,o=S.f(u,q),Lg=LIGHTS[S.mood];
  const R={cam:o.cam,light:Lg,draws:[],post:Object.assign({ink:1},Lg.post,o.post),shadow:{c:[0.5,0,0],size:11}};courtyardDraws(R,SET,S.mood);
  for(const [id,pos,P,ry] of o.chars)addChar3D(R,id,CAST[id],pos,P,Math.floor(t*12)/12,{ry});renderScene(R,t);}
const FADE=0.25;let tmp=null;
function renderFrame(t){if(!E.gl){glInit();SET=buildCourtyard();}
  let i=0;while(i<SEQ.length-1&&t>=T0[i+1])i++;const u=t-T0[i];window.BLEND=0;
  if(i>0&&SEQ[i].fade&&u<FADE){drawShot(i-1,t);if(!tmp)tmp=mkCanvas(W,H);tmp.getContext('2d').drawImage(E.cv,0,0);window.BLEND=1-u/FADE;}
  drawShot(i,t);}
function grab(q){const o=document.getElementById('out'),g=o.getContext('2d');g.globalAlpha=1;g.drawImage(E.cv,0,0);if(window.BLEND>0){g.globalAlpha=window.BLEND;g.drawImage(tmp,0,0);g.globalAlpha=1;}return o.toDataURL('image/jpeg',q);}
window.READY=true;
