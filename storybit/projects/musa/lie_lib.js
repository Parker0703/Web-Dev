// ---------- head-anchored figures ----------
const _HOFF={};const _scr=mk(64,64).getContext('2d');
function headOff(kind,o){const key=kind+(o.view||'');if(_HOFF[key]!=null)return _HOFF[key];CUR=Object.assign({t:0},o);const r=fig2(_scr,{kind,x:0,y:0,s:1,t:0,f:1,...o,eyes:'dot'});return _HOFF[key]=r?r.hc.y:-300;}
function headAt(c,kind,pos,o={}){const p=pp(pos);const oy=headOff(kind,o)*p.s*(o.sc||1);return who(c,kind,pos,Object.assign({},o,{dy:(o.dy||0)-oy}));}
// lying on the side (side camera): head at pos, body runs toward dirPos
function lieAt(c,kind,pos,dirPos,o={}){const a=pp(pos),b=pp(dirPos);const th=Math.atan2(-(b.x-a.x),b.y-a.y);const s=a.s*(o.sc||1);const oy=headOff(kind,o)*s;
  c.save();c.translate(a.x+(o.dx||0),a.y+(o.dy||0));c.rotate(th);CUR=Object.assign({t:T},o);const q={kind,x:0,y:-oy,s,t:T,f:1,...o};const r=fig2(c,q);
  const out={r,th,ox:a.x+(o.dx||0),oy:a.y+(o.dy||0),s};c.restore();return out;}
const toW=(L,p)=>({x:L.ox+Math.cos(L.th)*p.x-Math.sin(L.th)*p.y,y:L.oy+Math.sin(L.th)*p.x+Math.cos(L.th)*p.y});
