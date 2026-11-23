'use strict';
// ===== Captions v2 (house style): lower-middle, chunks of 1–5 words on up to two stacked lines, heavy font, active word YELLOW =====
const CAP_Y=1210,CAP_W=840,CAP_YEL='#ffd23f',CAP_LH=104;
const CAP2=[];(function(){for(const l of L){let g=[],n=0;const fl=()=>{if(g.length)CAP2.push(g);g=[];n=0;};
  for(const w of l.w){const s=w.x.toUpperCase();if(g.length&&(n+s.length>26||g.length>=5))fl();g.push(w);n+=s.length+1;if(/[.!?:…]$/.test(w.x)&&n>8)fl();}fl();}
  for(let i=0;i<CAP2.length;i++){const g=CAP2[i];g.t0=g[0].t;const nx=i+1<CAP2.length?CAP2[i+1][0].t:99;g.t1=Math.min(nx,g[g.length-1].e+0.4);}})();
function timer(){}
function captions(c,t){for(const g of CAP2){if(t<g.t0-0.02||t>=g.t1)continue;
  c.save();c.font='900 86px "Inter Display"';c.letterSpacing='1px';const sp=26;
  const parts=g.map(w=>w.x.toUpperCase().replace(/[.,;:]+$/,'').replace(/…/g,''));const ws=parts.map(p=>c.measureText(p).width);
  const rowW=a=>a.reduce((s,i)=>s+ws[i],0)+sp*(a.length-1);const idx=parts.map((_,i)=>i);
  let rows=[idx];if(rowW(idx)>CAP_W*0.92||parts.length>3){let best=1,bd=1e9;for(let k=1;k<parts.length;k++){const d=Math.abs(rowW(idx.slice(0,k))-rowW(idx.slice(k)));if(d<bd){bd=d;best=k;}}rows=[idx.slice(0,best),idx.slice(best)];}
  const fit=Math.min(1,...rows.map(r=>CAP_W/rowW(r))),gk=clamp((t-g.t0+0.02)/0.12),pk=lerp(0.88,1,eo(gk));
  c.translate(W/2,CAP_Y);c.scale(fit*pk,fit*pk);let act=-1;for(let i=0;i<g.length;i++)if(t>=g[i].t-0.02)act=i;
  rows.forEach((r,ri)=>{const y=(ri-(rows.length-1)/2)*CAP_LH;let x=-rowW(r)/2;for(const i of r){const w=g[i];const on=i===act||KEY.has(parts[i].replace(/[^A-Z0-9]/g,''));const k=clamp((t-w.t+0.02)/0.1);const sc=i===act?lerp(1.16,1.05,eo(k)):1;
    c.save();c.translate(x+ws[i]/2,y);c.scale(sc,sc);c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
    c.shadowColor='rgba(0,0,0,0.55)';c.shadowBlur=18;c.shadowOffsetY=6;c.strokeStyle='#000';c.lineWidth=16;c.strokeText(parts[i],0,0);c.shadowColor='transparent';
    c.fillStyle=on&&t>=w.t-0.02?CAP_YEL:'#ffffff';c.fillText(parts[i],0,0);c.restore();x+=ws[i]+sp;}});
  c.restore();}}
