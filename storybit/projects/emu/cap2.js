'use strict';
// ===== Captions v2 (house style from now on): lower-middle (~63% height), compact 1–3 word chunks, heavy font, active word YELLOW =====
// keeps clear of the right-side app buttons and the bottom UI strip; nothing ever in red.
const CAP_Y=1210,CAP_W=840,CAP_YEL='#ffd23f';
const CAP2=[];(function(){for(const l of L){let g=[],n=0;const fl=()=>{if(g.length)CAP2.push(g);g=[];n=0;};
  for(const w of l.w){const s=w.x.toUpperCase();const end=/[.,!?:;…]$/.test(w.x);if(g.length&&(n+s.length>14||g.length>=3))fl();g.push(w);n+=s.length+1;if(end&&g.length>=1&&n>6)fl();}fl();}
  for(let i=0;i<CAP2.length;i++){const g=CAP2[i];g.t0=g[0].t;const nx=i+1<CAP2.length?CAP2[i+1][0].t:99;g.t1=Math.min(nx,g[g.length-1].e+0.4);}})();
function timer(){}
function captions(c,t){for(const g of CAP2){if(t<g.t0-0.02||t>=g.t1)continue;
  c.save();c.font='900 86px "Inter Display"';c.letterSpacing='1px';
  const parts=g.map(w=>w.x.toUpperCase().replace(/[.,;:]+$/,'').replace(/…/g,''));const ws=parts.map(p=>c.measureText(p).width),sp=26;const tot=ws.reduce((a,b)=>a+b,0)+sp*(parts.length-1);
  const fit=Math.min(1,CAP_W/tot),gk=clamp((t-g.t0+0.02)/0.12);c.translate(W/2,CAP_Y);c.scale(fit*lerp(0.88,1,eo(gk)),fit*lerp(0.88,1,eo(gk)));let x=-tot/2;
  let act=-1;for(let i=0;i<g.length;i++)if(t>=g[i].t-0.02)act=i;
  for(let i=0;i<g.length;i++){const w=g[i];const on=i===act||KEY.has(parts[i].replace(/[^A-Z0-9]/g,''));const k=clamp((t-w.t+0.02)/0.1);const sc=i===act?lerp(1.18,1.06,eo(k)):1;
    c.save();c.translate(x+ws[i]/2,0);c.scale(sc,sc);c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
    c.shadowColor='rgba(0,0,0,0.55)';c.shadowBlur=18;c.shadowOffsetY=6;c.strokeStyle='#000';c.lineWidth=16;c.strokeText(parts[i],0,0);c.shadowColor='transparent';
    c.fillStyle=on&&t>=w.t-0.02?CAP_YEL:'#ffffff';c.globalAlpha=t>=w.t-0.02?1:0.92;c.fillText(parts[i],0,0);c.restore();x+=ws[i]+sp;}
  c.restore();}}
