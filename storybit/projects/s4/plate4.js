'use strict';
// renders a shot's environment only + exports where each character stands on screen
window.NOLABEL=1;
function renderPlate(i){if(!E.gl){glInit();SET=buildCourtyard();}const S=SHOTS4[i],L=LIGHTS[S.mood];
  const R={cam:S.cam,light:L,draws:[],post:Object.assign({ink:1},L.post,S.post),shadow:{c:[0.5,0,0],size:11}};courtyardDraws(R,SET,S.mood);renderScene(R,0);
  const cam=S.cam,focus=S.post.focus??V.len(V.sub(cam.target,cam.eye)),range=S.post.range??8,maxR=S.post.maxR??10;
  const tg=toScreen(cam.target),sp=toScreen(V.add(cam.target,V.norm(L.sunDir)));
  const chars=S.chars.map(([id,pos])=>{const ft=toScreen(pos),hd=toScreen(V.add(pos,[0,1.0,0]));const d=V.len(V.sub(V.add(pos,[0,1.3,0]),cam.eye));
    return {id,x:ft[0],y:ft[1],ppm:Math.hypot(hd[0]-ft[0],hd[1]-ft[1]),blur:Math.max(0,Math.abs(d-focus)/range-0.08)*maxR*0.6};});
  return {name:S.name,mood:S.mood,sunDx:Math.sign(sp[0]-tg[0])||1,chars};}
