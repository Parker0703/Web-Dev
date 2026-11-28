'use strict';
// ===== Napoleonic cast for Style 3 fig2 =====
Object.assign(KIND2,{
  napoleon:{coat:'#26346a',limb:'#f2f0ea',hat:'bicorne',hair:'#3a2a1c',skirt:'#26346a',skirtL:30,uniform:'nap',epaulettes:1},
  napgrey:{coat:'#8a8c90',limb:'#f2f0ea',hat:'bicorne',hair:'#3a2a1c',skirt:'#8a8c90',skirtL:70,greatcoat:1},
  french:{coat:'#2a3a7a',limb:'#f0eee6',hat:'shako',shako:'#16161c',plume:'#c81e2a',skirt:'#2a3a7a',skirtL:26,uniform:'line',belts:1},
  frenchW:{coat:'#2a3a7a',limb:'#f0eee6',hat:'shako',shako:'#16161c',plume:'#c81e2a',skirt:'#2a3a7a',skirtL:26,uniform:'line',belts:1,frost:1},
  russian:{coat:'#2a5a3a',limb:'#e8e4d8',hat:'shako',shako:'#1a1a1a',plume:'#e8e8e8',skirt:'#2a5a3a',skirtL:26,uniform:'ru',belts:1},
  british:{coat:'#c0282a',limb:'#efece4',hat:'shako',shako:'#1a1a1a',plume:'#ffffff',belgic:1,skirt:'#c0282a',skirtL:24,uniform:'br',belts:1},
  prussian:{coat:'#1e2440',limb:'#2a2a30',hat:'shako',shako:'#141414',plume:'#e8e8e8',skirt:'#1e2440',skirtL:24,uniform:'pr',belts:1},
  marshal:{coat:'#26346a',limb:'#f2f0ea',hat:'bicorneF',hair:'#8a6a4a',skirt:'#26346a',skirtL:30,uniform:'nap',epaulettes:1,stache:1},
});
const _rTN=romanTorso;
romanTorso=function(c,K,s,f,t,TOR){_rTN(c,K,s,f,t,TOR);
  if(K.uniform){const top=-TOR*s;
    // white plastron (French) / facing colours, gold buttons
    const face={nap:'#f4f2ec',line:'#f4f2ec',ru:'#c02828',br:'#1e2a5a',pr:'#c02828'}[K.uniform];
    if(K.uniform==='nap'){c.fillStyle='#f4f2ec';c.beginPath();c.moveTo(-12*s,top+6*s);c.lineTo(12*s,top+6*s);c.lineTo(10*s,-6*s);c.lineTo(-10*s,-6*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=2.4*s;c.stroke();
      c.strokeStyle='#26346a';c.lineWidth=7*s;c.beginPath();c.moveTo(-13*s,top+4*s);c.lineTo(-11*s,-4*s);c.moveTo(13*s,top+4*s);c.lineTo(11*s,-4*s);c.stroke();}
    else{c.fillStyle=face;c.beginPath();c.moveTo(-15*s,top+6*s);c.lineTo(15*s,top+6*s);c.lineTo(12*s,top+48*s);c.lineTo(-12*s,top+48*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=2.4*s;c.stroke();}
    c.fillStyle='#e8c040';for(let i=0;i<5;i++){c.beginPath();c.arc(-8*s,top+14*s+i*9*s,1.9*s,0,TAU);c.arc(8*s,top+14*s+i*9*s,1.9*s,0,TAU);c.fill();}
    // red collar
    c.fillStyle=K.uniform==='br'?'#1e2a5a':'#c02828';c.beginPath();c.ellipse(0,top+3*s,16*s,5*s,0,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=2*s;c.stroke();
    if(K.belts){c.strokeStyle='#f4f2ec';c.lineWidth=6*s;c.beginPath();c.moveTo(-24*s,top+10*s);c.lineTo(22*s,-8*s);c.moveTo(24*s,top+10*s);c.lineTo(-22*s,-8*s);c.stroke();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=1.4*s;c.stroke();
      c.fillStyle='#d8b040';c.beginPath();c.arc(0,top+38*s,4.5*s,0,TAU);c.fill();}
    if(K.epaulettes){for(const sx of [-1,1]){c.fillStyle='#e8c040';c.beginPath();c.ellipse(sx*23*s,top+6*s,11*s,6*s,sx*0.3,0,TAU);c.fill();c.strokeStyle=K2;c.lineWidth=2*s;c.stroke();
      c.strokeStyle='#d8a828';c.lineWidth=1.6*s;for(let k=0;k<6;k++){c.beginPath();c.moveTo(sx*(16+k*2.4)*s,top+10*s);c.lineTo(sx*(16+k*2.6)*s,top+18*s);c.stroke();}}}
    if(K.uniform==='nap'){c.fillStyle='#c02828';c.fillRect(-27*s,top+26*s,6*s,40*s);c.fillStyle='#f4f2ec';c.beginPath();c.arc(-18*s,top+20*s,3.5*s,0,TAU);c.fill();}// Légion d'honneur ribbon + star
  }
  if(K.greatcoat){c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2.4*s;c.beginPath();c.moveTo(0,-TOR*s+6*s);c.lineTo(0,0);c.stroke();c.fillStyle='#4a4c50';for(let i=0;i<4;i++){c.beginPath();c.arc(-6*s,-TOR*s+18*s+i*16*s,2.2*s,0,TAU);c.arc(6*s,-TOR*s+18*s+i*16*s,2.2*s,0,TAU);c.fill();}
    c.fillStyle='#7a7c80';c.beginPath();c.ellipse(0,-TOR*s+6*s,28*s,12*s,0,0,Math.PI);c.fill();c.strokeStyle=K2;c.lineWidth=2.4*s;c.stroke();}
};
const _hatN=hat2b;
hat2b=function(c,h,s,f,R,t){
  if(h==='bicorne'||h==='bicorneF'){c.save();c.strokeStyle=K2;c.lineWidth=4*s;const sw=h==='bicorne';// Napoleon wears it sideways ("en bataille")
    const g=c.createLinearGradient(0,-R*1.6,0,-R*0.3);g.addColorStop(0,'#2a2a34');g.addColorStop(1,'#0c0c12');c.fillStyle=g;c.beginPath();
    if(sw){c.moveTo(-R*1.55,-R*0.42);c.quadraticCurveTo(-R*0.9,-R*1.75,0,-R*1.55);c.quadraticCurveTo(R*0.9,-R*1.75,R*1.55,-R*0.42);c.quadraticCurveTo(R*0.6,-R*0.85,0,-R*0.8);c.quadraticCurveTo(-R*0.6,-R*0.85,-R*1.55,-R*0.42);}
    else{c.moveTo(-R*0.9,-R*0.55);c.quadraticCurveTo(-R*0.7,-R*1.9,0,-R*1.95);c.quadraticCurveTo(R*0.7,-R*1.9,R*0.9,-R*0.55);c.quadraticCurveTo(0,-R*0.85,-R*0.9,-R*0.55);}
    c.closePath();c.fill();c.stroke();
    c.strokeStyle='#d8b040';c.lineWidth=2.4*s;c.beginPath();if(sw){c.moveTo(-R*1.45,-R*0.47);c.quadraticCurveTo(-R*0.6,-R*0.92,0,-R*0.86);c.quadraticCurveTo(R*0.6,-R*0.92,R*1.45,-R*0.47);}else{c.moveTo(-R*0.82,-R*0.6);c.quadraticCurveTo(0,-R*0.9,R*0.82,-R*0.6);}c.stroke();
    // tricolour cockade
    const cx=sw?-R*0.62:0,cy=sw?-R*1.08:-R*1.15;for(const [r,col] of [[0.24,'#2a4ab8'],[0.16,'#ffffff'],[0.08,'#d02a2a']]){c.fillStyle=col;c.beginPath();c.arc(cx,cy,R*r,0,TAU);c.fill();}c.strokeStyle=K2;c.lineWidth=2*s;c.beginPath();c.arc(cx,cy,R*0.24,0,TAU);c.stroke();
    c.restore();return;}
  if(h==='shako'){const K=__KN||{};c.save();c.strokeStyle=K2;c.lineWidth=4*s;const col=K.shako||'#16161c';
    const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(0,shd(col,0.25));g.addColorStop(0.5,col);g.addColorStop(1,shd(col,-0.3));c.fillStyle=g;
    if(K.belgic){c.beginPath();c.moveTo(-R*0.82,-R*0.5);c.lineTo(-R*0.78,-R*1.3);c.quadraticCurveTo(0,-R*1.9,R*0.78,-R*1.3);c.lineTo(R*0.82,-R*0.5);c.closePath();c.fill();c.stroke();}
    else{c.beginPath();c.moveTo(-R*0.8,-R*0.5);c.lineTo(-R*0.86,-R*1.62);c.lineTo(R*0.86,-R*1.62);c.lineTo(R*0.8,-R*0.5);c.closePath();c.fill();c.stroke();c.fillStyle=shd(col,0.15);c.beginPath();c.ellipse(0,-R*1.62,R*0.86,R*0.12,0,0,TAU);c.fill();c.stroke();}
    c.fillStyle='#d8b040';c.beginPath();c.moveTo(0,-R*1.38);c.lineTo(R*0.3,-R*1.1);c.lineTo(0,-R*0.72);c.lineTo(-R*0.3,-R*1.1);c.closePath();c.fill();c.lineWidth=2*s;c.stroke();
    c.fillStyle='#111';c.beginPath();c.ellipse(0,-R*0.52,R*0.92,R*0.14,0,0,Math.PI);c.fill();// peak
    c.fillStyle=K.plume||'#c81e2a';c.beginPath();c.ellipse(0,-R*(K.belgic?1.75:1.85),R*0.16,R*(K.belgic?0.12:0.3),0,0,TAU);c.fill();c.lineWidth=2.4*s;c.stroke();
    if(K.frost){c.fillStyle='rgba(255,255,255,0.85)';c.beginPath();c.ellipse(0,-R*1.62,R*0.88,R*0.16,0,Math.PI,TAU);c.fill();}
    c.restore();return;}
  return _hatN(c,h,s,f,R,t);};
let __KN=null;const _fig2N=fig2;fig2=function(c,o){__KN=KIND2[o.kind]||{};const r=_fig2N(c,o);
  if(__KN.frost&&r){c.save();c.fillStyle='rgba(255,255,255,0.75)';for(let i=0;i<8;i++){c.beginPath();c.arc(o.x+(hash(i)-0.5)*60*(o.s||1),o.y-(120+hash(i*3)*150)*(o.s||1),(3+hash(i*5)*4)*(o.s||1),0,TAU);c.fill();}c.restore();}
  __KN=null;return r;};
const NAP=o=>fig2(o.c,{kind:'napoleon',view:'front',...o});
