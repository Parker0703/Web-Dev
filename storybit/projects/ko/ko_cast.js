'use strict';
// ===================== Knockout · cast + boxing gear (Style 5 characters) =====================
Object.assign(KIND2,{
  ace:Object.assign(mkK({coat:SK[1],trim:SK[1],skin:SK[1],pants:SK[1]}),{robe:false,long:false,coat:null,hair4:'crew',hair:'#1c1418',browW:1.3,muscle:40,glove:'#d81f2a',shorts:'#c81e28',shortsTrim:'#f4f0e6'}),
  duke:Object.assign(mkK({coat:SK[2],trim:SK[2],skin:SK[2],pants:SK[2]}),{robe:false,long:false,coat:null,hair4:'bald',hair:'#16120e',stubble:1,browW:1.7,jaw:1,muscle:54,glove:'#1f4fc8',shorts:'#1c3a9a',shortsTrim:'#e8b830'}),
  rook:Object.assign(mkK({coat:SK[0],trim:SK[0],skin:SK[0],pants:SK[0]}),{robe:false,long:false,coat:null,hair4:'swoop',hair:'#5a3524',browW:1.0,muscle:34,glove:'#1f9a4a',shorts:'#1f7a3a',shortsTrim:'#f4f0e6'}),
  coach:Object.assign(mkK({coat:'#2a2a32',trim:'#e8e8ee',skin:SK[3],pants:'#2a2a32'}),{robe:false,long:false,hair4:'crew',hair:'#b8b8bc',mst:'walrus',mstCol:'#9a9aa0',browW:1.5,old:1,towel:1}),
  ref:Object.assign(mkK({coat:'#f4f4f4',trim:'#1a1a1e',skin:SK[1],pants:'#1a1a1e'}),{robe:false,long:false,hair4:'part',hair:'#3a2a1e',browW:1.1,bowtie:1}),
});
// remember which character is being drawn (fist2 / shorts need it) + the last limb's elbow→hand (glove direction)
let _KK=null,_LL=null;
let _TORSO=0;
{const _f=fig2;fig2=function(c,o){const prev=_KK;_KK=KIND2[o.kind]||null;_TORSO=1;const r=_f(c,o);_TORSO=0;
  if(r&&_KK&&_KK.shorts&&!o.ghost)koShorts(c,r,o.s||1,o.f||1,_KK,o);
  if(r&&_KK&&_KK.towel&&!o.ghost)koTowel(c,r,o.s||1,o.f||1);
  _KK=prev;return r;};}
{const _r=rim2;rim2=function(c,s,w){_r(c,s,w);if(_TORSO&&_KK&&_KK.muscle){_TORSO=0;koMuscles(c,s,_KK);}};}
{const _l=limb2;limb2=function(c,a,e,b,w,col,s){_LL={e,b};return _l(c,a,e,b,w,col,s);};}
{const _fi=fist2;fist2=function(c,p,s,col){if(_KK&&_KK.glove&&!(CUR&&CUR.noGlove)){const dark=col!==_KK.limb&&col!==(_KK.limb);const back=(CUR&&CUR._backFist);koGlove(c,p,s,_KK.glove,_LL?Math.atan2(p.y-_LL.e.y,p.x-_LL.e.x):0,{dark:col!==_KK.limb});return;}return _fi(c,p,s,col);};}
// a boxing glove: padded mitt + thumb + white cuff + laces, oriented along the forearm (ang)
function koGlove(c,p,s,col,ang,o={}){const k=s*(o.big||1);c.save();c.translate(p.x,p.y);c.rotate(ang);c.lineJoin='round';
  const base=o.dark?shd(col,-0.22):col;
  // cuff (wrist, behind the mitt)
  c.fillStyle=o.dark?'#c8c8c4':'#f4f2ea';c.strokeStyle=K2;c.lineWidth=3.6*k;rr(c,-20*k,-11*k,15*k,22*k,4*k);c.fill();c.stroke();
  c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=1.6*k;for(const yy of [-5,0,5]){c.beginPath();c.moveTo(-17*k,yy*k);c.lineTo(-8*k,yy*k);c.stroke();}
  // mitt
  const g=c.createRadialGradient(4*k+L2.dx*4*k,-7*k,2*k,4*k,0,24*k);g.addColorStop(0,shd(base,0.45));g.addColorStop(0.55,base);g.addColorStop(1,shd(base,-0.4));
  c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*k;c.beginPath();c.moveTo(-7*k,-12*k);c.bezierCurveTo(6*k,-20*k,24*k,-18*k,25*k,-2*k);c.bezierCurveTo(26*k,13*k,10*k,18*k,-2*k,15*k);c.bezierCurveTo(-9*k,13*k,-9*k,-8*k,-7*k,-12*k);c.closePath();c.fill();c.stroke();
  // thumb (tucked along the side)
  c.fillStyle=shd(base,-0.08);c.beginPath();c.ellipse(4*k,10*k,9*k,5.5*k,-0.2,0,TAU);c.fill();c.stroke();
  // knuckle crease + shine
  c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2*k;c.beginPath();c.moveTo(16*k,-13*k);c.quadraticCurveTo(19*k,-1*k,15*k,10*k);c.stroke();
  c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(8*k,-11*k,7*k,2.6*k,-0.15,0,TAU);c.fill();
  c.restore();}
// bare-chested boxer: broad chest, pecs, six-pack, obliques — in torso space (origin = hip, up = -y)
function koMuscles(c,s,K){const W=K.muscle,sk=K.limb||'#fbf3ec';c.save();c.lineJoin='round';c.lineCap='round';
  const body=()=>{c.beginPath();c.moveTo(-W/2*s,-92*s);c.quadraticCurveTo(0,-100*s,W/2*s,-92*s);c.quadraticCurveTo((W/2+4)*s,-70*s,(W/2-2)*s,-52*s);c.quadraticCurveTo(17*s,-30*s,15*s,4*s);c.lineTo(-15*s,4*s);c.quadraticCurveTo(-17*s,-30*s,-(W/2-2)*s,-52*s);c.quadraticCurveTo(-(W/2+4)*s,-70*s,-W/2*s,-92*s);c.closePath();};
  body();const g=c.createLinearGradient(-W/2*s,0,W/2*s,0);g.addColorStop(L2.dx>0?1:0,shd(sk,0.12));g.addColorStop(0.55,sk);g.addColorStop(L2.dx>0?0:1,shd(sk,-0.22));c.fillStyle=g;c.fill();c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();
  c.save();body();c.clip();
  // pecs: two plates with a soft shadow under each
  c.fillStyle='rgba(90,70,80,0.13)';for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*1*s,-86*s);c.quadraticCurveTo(sd*(W/2)*s,-90*s,sd*(W/2-1)*s,-70*s);c.quadraticCurveTo(sd*(W/4)*s,-58*s,sd*1*s,-62*s);c.closePath();c.fill();}
  c.strokeStyle='rgba(60,45,55,0.55)';c.lineWidth=2.6*s;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*2*s,-62*s);c.quadraticCurveTo(sd*(W/4)*s,-56*s,sd*(W/2-3)*s,-68*s);c.stroke();}
  c.beginPath();c.moveTo(0,-90*s);c.lineTo(0,-60*s);c.stroke();
  // six-pack
  for(let r=0;r<3;r++)for(const sd of [-1,1]){const y=(-52+r*14)*s;c.fillStyle='rgba(90,70,80,0.12)';rr(c,sd>0?1.5*s:-10.5*s,y,9*s,11*s,4*s);c.fill();c.strokeStyle='rgba(60,45,55,0.45)';c.lineWidth=1.8*s;c.stroke();}
  // obliques + navel
  c.strokeStyle='rgba(60,45,55,0.4)';c.lineWidth=2*s;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*14*s,-48*s);c.quadraticCurveTo(sd*12*s,-14*s,sd*4*s,2*s);c.stroke();}
  c.fillStyle='rgba(60,45,55,0.5)';c.beginPath();c.ellipse(0,-7*s,1.6*s,2.4*s,0,0,TAU);c.fill();
  // shine on the chest
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-L2.dx*W*0.2*s,-80*s,W*0.18*s,4*s,-0.2,0,TAU);c.fill();
  c.restore();c.restore();}
// boxing shorts: a real garment — waistband round the hips, each leg tube follows its thigh to mid-thigh, folds + side stripe
function koShorts(c,r,s,f,K,o){const h=r.hip;const TH=60;const col=K.shorts,tr=K.shortsTrim;
  // feet exactly as fig2 places them → knees by the same IK
  const st=(o.stance??20)*s;let FF={x:h.x+st*f,y:o.y},FB={x:h.x-st*f*0.8,y:o.y};
  if(o.ff)FF={x:h.x+o.ff[0]*s*f,y:h.y+o.ff[1]*s};if(o.fb)FB={x:h.x+o.fb[0]*s*f,y:h.y+o.fb[1]*s};
  const kn=p=>p.x*f;const KF=ik2(h.x,h.y,FF.x,FF.y,TH*s,TH*s,kn).e,KB=ik2(h.x,h.y,FB.x,FB.y,TH*s,TH*s,kn).e;
  c.save();c.lineJoin='round';c.lineCap='round';
  const leg=(K2p,off,dark)=>{const a={x:h.x+off*s,y:h.y+2*s},u=0.56;const e={x:lerp(a.x,K2p.x,u),y:lerp(a.y,K2p.y,u)};const ang=Math.atan2(e.y-a.y,e.x-a.x),nx=-Math.sin(ang),ny=Math.cos(ang);
    const w0=17*s,w1=16.5*s;const P=[[a.x+nx*w0,a.y+ny*w0],[e.x+nx*w1,e.y+ny*w1],[e.x-nx*w1,e.y-ny*w1],[a.x-nx*w0,a.y-ny*w0]];
    const base=dark?shd(col,-0.25):col;const g=c.createLinearGradient(a.x-nx*w0,a.y-ny*w0,a.x+nx*w0,a.y+ny*w0);g.addColorStop(0,shd(base,-0.25));g.addColorStop(0.5,base);g.addColorStop(1,shd(base,0.18));
    c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(P[0][0],P[0][1]);c.lineTo(P[1][0],P[1][1]);c.quadraticCurveTo(e.x+(e.x-a.x)*0.06,e.y+(e.y-a.y)*0.06,P[2][0],P[2][1]);c.lineTo(P[3][0],P[3][1]);c.closePath();c.fill();c.stroke();
    // hem trim + a fold
    c.strokeStyle=tr;c.lineWidth=4*s;c.beginPath();c.moveTo(lerp(P[1][0],e.x,0.08)-(e.x-a.x)*0.08,lerp(P[1][1],e.y,0.08)-(e.y-a.y)*0.08);c.lineTo(lerp(P[2][0],e.x,0.08)-(e.x-a.x)*0.08,lerp(P[2][1],e.y,0.08)-(e.y-a.y)*0.08);c.stroke();
    c.strokeStyle='rgba(0,0,0,0.28)';c.lineWidth=2*s;c.beginPath();c.moveTo(lerp(a.x,e.x,0.25),lerp(a.y,e.y,0.25));c.quadraticCurveTo(lerp(a.x,e.x,0.55)+nx*5*s,lerp(a.y,e.y,0.55)+ny*5*s,lerp(a.x,e.x,0.85)+nx*2*s,lerp(a.y,e.y,0.85)+ny*2*s);c.stroke();};
  leg(KB,-f*7,true);
  // seat / crotch block joining both legs + waistband
  const g=c.createLinearGradient(h.x-30*s,0,h.x+30*s,0);g.addColorStop(L2.dx>0?1:0,shd(col,0.2));g.addColorStop(0.5,col);g.addColorStop(L2.dx>0?0:1,shd(col,-0.28));
  c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(h.x-19*s,h.y-12*s);c.lineTo(h.x+19*s,h.y-12*s);c.quadraticCurveTo(h.x+23*s,h.y+4*s,h.x+18*s,h.y+16*s);c.quadraticCurveTo(h.x,h.y+22*s,h.x-18*s,h.y+16*s);c.quadraticCurveTo(h.x-23*s,h.y+4*s,h.x-19*s,h.y-12*s);c.closePath();c.fill();c.stroke();
  leg(KF,f*7,false);
  // waistband with the boxer's colour stripe + tie
  c.fillStyle=tr;c.strokeStyle=K2;c.lineWidth=3.5*s;rr(c,h.x-20*s,h.y-16*s,40*s,9*s,3*s);c.fill();c.stroke();
  c.strokeStyle=col;c.lineWidth=2*s;c.beginPath();c.moveTo(h.x-18*s,h.y-11.5*s);c.lineTo(h.x+18*s,h.y-11.5*s);c.stroke();
  c.strokeStyle=K2;c.lineWidth=1.6*s;c.beginPath();c.moveTo(h.x+f*2*s,h.y-8*s);c.quadraticCurveTo(h.x+f*5*s,h.y-1*s,h.x+f*1*s,h.y+3*s);c.moveTo(h.x+f*2*s,h.y-8*s);c.quadraticCurveTo(h.x+f*7*s,h.y-3*s,h.x+f*6*s,h.y+2*s);c.stroke();
  c.restore();}
// coach's towel over the shoulder
function koTowel(c,r,s,f){const h=r.hip;c.save();c.fillStyle='#f4f4f0';c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(h.x-f*14*s,h.y-96*s);c.lineTo(h.x-f*2*s,h.y-96*s);c.lineTo(h.x-f*6*s,h.y-40*s);c.lineTo(h.x-f*18*s,h.y-42*s);c.closePath();c.fill();c.stroke();c.restore();}
