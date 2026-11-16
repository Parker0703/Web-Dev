'use strict';
// ===== Style 4 storyboard: same 6 shots, A (3D model chars) vs B (2D cut-out chars) =====
let SET=null;
const SHOTS4=[
 {name:'establish',mood:'golden',cam:{eye:[3.6,4.6,6.6],target:[0.2,0.9,-0.6],fov:44},post:{maxR:6,range:12},
  chars:[['kenji',[0.6,0,1.6],{eyes:'dot',brow:'flat',mouth:'smile',armL:{a:20},armR:{a:20}},0.5],['master',[2.2,0.6,-4.0],{eyes:'half',brow:'flat',mouth:'flat',armL:{a:30,f:0.6},armR:{a:30,f:0.6}},0.2]]},
 {name:'scream',mood:'golden',cam:{eye:[0.5,1.1,5.6],target:[0.4,1.35,1.6],fov:40},post:{maxR:16,range:2.2},
  chars:[['kenji',[0.4,0,1.6],{eyes:'wide',brow:'angry',mouth:'shout',sweat:1,armL:{a:150,bend:-20},armR:{a:150,bend:-20},idle:2},0]]},
 {name:'twoShot',mood:'golden',cam:{eye:[0.15,1.35,7.8],target:[0.3,1.15,1.5],fov:36,roll:0.0},post:{maxR:14,range:3},
  chars:[['kenji',[-0.5,0,1.4],{eyes:'half',brow:'smug',mouth:'smirk',armL:{a:15},armR:{a:40,f:0.5},prop:'katana',propAng:-0.4,propAng3:0.1},0.25],['master',[0.95,0,1.6],{eyes:'happy',brow:'up',mouth:'grin',armL:{a:25},armR:{a:25}},-0.3]]},
 {name:'dutchClose',mood:'golden',cam:{eye:[1.9,1.55,4.2],target:[0.9,1.4,1.4],fov:30,roll:0.16},post:{maxR:18,range:1.6},
  chars:[['master',[0.9,0,1.4],{eyes:'dot',brow:'angry',mouth:'frown',armL:{a:20},armR:{a:20}},0.3]]},
 {name:'lowHero',mood:'night',cam:{eye:[0.2,0.35,5.2],target:[0.4,1.7,1.5],fov:46},post:{maxR:10,range:3.5},
  chars:[['kenji',[0.4,0,1.5],{eyes:'half',brow:'smug',mouth:'smile',armL:{a:20},armR:{a:150,f:0.1},prop:'katana',propAng:-0.15,propAng3:-0.1},0]]},
 {name:'overShoulder',mood:'night',cam:{eye:[2.4,1.75,5.0],target:[-0.3,1.2,-0.6],fov:38},post:{maxR:20,range:1.4,focus:6.2},
  chars:[['master',[2.2,0,3.0],{eyes:'dot',brow:'flat',mouth:'flat',back:1},Math.PI-0.4],['kenji',[-0.3,0,-0.6],{eyes:'wide',brow:'worried',mouth:'o',sweat:1,armL:{a:30},armR:{a:30}},0.35]]},
 {name:'katanaCU',mood:'golden',cam:{eye:[1.75,1.5,4.3],target:[0.45,1.5,1.8],fov:34},post:{maxR:14,range:1.2},
  chars:[['kenji',[0,0,1.5],{eyes:'half',brow:'smug',mouth:'smirk',armL:{a:15},armR:{a:100,f:0.45},prop:'katana',propAng3:-0.45,propRoll:1.3},0.15]]},
];
function renderFrame(t){if(!E.gl){glInit();SET=buildCourtyard();}
  const idx=Math.floor(t)%10,variant=t>=10?'B':'A',S=SHOTS4[idx],L=LIGHTS[S.mood];const lt=t%1;
  const drift=lt*0.25;const cam=Object.assign({},S.cam,{eye:V.add(S.cam.eye,V.sc(V.norm(V.sub(S.cam.target,S.cam.eye)),drift))});
  const R={cam,light:L,draws:[],post:Object.assign({ink:variant==='A'?1:0},L.post,S.post),shadow:{c:[0.5,0,0],size:11}};courtyardDraws(R,SET,S.mood);
  for(const [id,pos,P,ry] of S.chars){const K=CAST[id];if(variant==='A')addChar3D(R,id,K,pos,P,Math.floor(t*12)/12,{ry});else addChar2D(R,id,K,pos,P,t,{});}
  renderScene(R,t);window.LABEL=(variant==='A'?'A · 3D MODEL':'B · 2D CUT-OUT')+'  —  '+S.name;}
function grab(q){const o=document.getElementById('out'),g=o.getContext('2d');g.drawImage(E.cv,0,0);if(window.LABEL&&!window.NOLABEL){g.font='800 34px sans-serif';g.textAlign='left';g.fillStyle='rgba(0,0,0,0.6)';g.fillRect(24,24,g.measureText(window.LABEL).width+36,60);g.fillStyle='#fff';g.fillText(window.LABEL,42,66);}return o.toDataURL('image/jpeg',q);}
window.READY=true;
