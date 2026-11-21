'use strict';
// ===================== Milgram 1961 · Style 5 =====================
// scene → graphic → scene → graphic … every cut on a line start, every action on its word time
const X=(e,b,m,o)=>Object.assign({eyes:e,brow:b,mouth:m},o||{});
const K3=(u,d,a,b)=>lerp(a,b,eio(clamp(u/d)));
const ON=(t,t0,d=0.3)=>eio(clamp((t-t0)/d));
// word times (from the voice)
const W_=(()=>{const o=[];for(const l of L)for(const w of l.w)o.push(w);return o;})();
const wt=(word,after=0)=>{const w=W_.find(q=>q.t>=after-0.01&&q.x.toLowerCase().replace(/[^a-z0-9'-]/g,'').startsWith(word));return w?w.t:after;};
// ---------- head-anchored figures ----------
const _HOFF={};const _scr=mk(64,64).getContext('2d');
function headOff(kind,o){const key=kind+(o.view||'');if(_HOFF[key]!=null)return _HOFF[key];CUR=Object.assign({t:0},o);const r=fig2(_scr,{kind,x:0,y:0,s:1,t:0,f:1,...o,eyes:'dot'});return _HOFF[key]=r?r.hc.y:-300;}
function headAt(c,kind,pos,o={}){const p=pp(pos);const oy=headOff(kind,o)*p.s*(o.sc||1);return who(c,kind,pos,Object.assign({},o,{dy:(o.dy||0)-oy}));}
// lying on the side (side camera): head at pos, body runs toward dirPos
function lieAt(c,kind,pos,dirPos,o={}){const a=pp(pos),b=pp(dirPos);const th=Math.atan2(-(b.x-a.x),b.y-a.y);const s=a.s*(o.sc||1);const oy=headOff(kind,o)*s;
  c.save();c.translate(a.x+(o.dx||0),a.y+(o.dy||0));c.rotate(th);CUR=Object.assign({t:T},o);const q={kind,x:0,y:-oy,s,t:T,f:1,...o};const r=fig2(c,q);
  const out={r,th,ox:a.x+(o.dx||0),oy:a.y+(o.dy||0),s};c.restore();return out;}
const toW=(L,p)=>({x:L.ox+Math.cos(L.th)*p.x-Math.sin(L.th)*p.y,y:L.oy+Math.sin(L.th)*p.x+Math.cos(L.th)*p.y});
function heart(c,x,y,r,col='#ff5a7a'){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=r*0.16;c.beginPath();c.moveTo(0,r*0.9);c.bezierCurveTo(-r*1.5,-r*0.1,-r*0.7,-r*1.2,0,-r*0.45);c.bezierCurveTo(r*0.7,-r*1.2,r*1.5,-r*0.1,0,r*0.9);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.7)';c.beginPath();c.ellipse(-r*0.42,-r*0.35,r*0.2,r*0.12,-0.6,0,TAU);c.fill();c.restore();}
function hearts(c,x,y,t,t0,n=5,s=1){const p=t-t0;if(p<0)return;for(let i=0;i<n;i++){const q=p-i*0.12;if(q<0||q>1.6)continue;const k=q/1.6;c.save();c.globalAlpha=1-k*k;heart(c,x+(hash(i*3)-0.5)*220*s+Math.sin(q*5+i)*14*s,y-k*360*s,(16+hash(i)*16)*s*(q<0.15?back(q/0.15):1));c.restore();}}
function glow(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(x,y,0,x,y,r);g2.addColorStop(0,`rgba(${col},${a})`);g2.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2);c.restore();}
// ---------- graphic-explanation stage ----------
function gfxBG(c,t,o={}){c.save();c.filter='blur(16px) brightness(0.42) saturate(1.2)';c.drawImage(IMG[o.plate||'room_wide'],-80,-80,W+160,H+160);c.restore();
  const g2=c.createLinearGradient(0,0,0,H);g2.addColorStop(0,'rgba(18,16,48,0.72)');g2.addColorStop(1,'rgba(30,14,44,0.82)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  c.save();for(let i=0;i<60;i++){const a=0.25+0.5*(0.5+0.5*Math.sin(t*2+i*1.7));c.fillStyle=`rgba(220,225,255,${a*0.6})`;c.beginPath();c.arc(hash(i*3)*W,hash(i*7)*H,1+hash(i)*2.4,0,TAU);c.fill();}c.restore();motes(c,t,18);}
function panel(c,x,y,w,h,o={}){c.save();c.shadowColor='rgba(0,0,0,0.45)';c.shadowBlur=40;c.shadowOffsetY=14;c.fillStyle=o.fill||'rgba(26,24,56,0.92)';rr(c,x,y,w,h,o.r||44);c.fill();c.restore();
  c.save();c.strokeStyle=o.edge||'rgba(170,180,255,0.35)';c.lineWidth=4;rr(c,x,y,w,h,o.r||44);c.stroke();const hl=c.createLinearGradient(0,y,0,y+h*0.4);hl.addColorStop(0,'rgba(255,255,255,0.08)');hl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=hl;rr(c,x,y,w,h,o.r||44);c.fill();
  if(o.title){c.fillStyle=o.tc||'#ffd36a';c.font='900 44px "Inter Display"';c.letterSpacing='6px';c.textAlign='center';c.textBaseline='middle';c.fillText(o.title,x+w/2,y+70);c.letterSpacing='0px';c.fillStyle='rgba(255,255,255,0.14)';c.fillRect(x+60,y+118,w-120,3);}c.restore();}
function popK(t,t0,d=0.35){return t<t0?0:back(clamp((t-t0)/d));}
function chip(c,t0,t,text,x,y,o={}){tag(c,t0,t,text,x,y,o);}
function bigWord(c,s,x,y,size,col,k){if(k<=0)return;c.save();c.translate(x,y);const sc=lerp(1.6,1,eo(clamp(k)));c.scale(sc,sc);c.globalAlpha=clamp(k*3);txt(c,s,0,0,size,col,{sw:size*0.2,ls:6});c.restore();}
