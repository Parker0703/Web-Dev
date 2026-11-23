'use strict';
// ===================== 3D vehicle sprites in the plates: pick the rendered view that matches the real viewing angle =====================
// READY waits for both the plates (main5 sets READY) and every vehicle sprite to decode
{let _pl=false,_vr=false;Object.defineProperty(window,'READY',{get:()=>_pl&&_vr,set:v=>{_pl=v;},configurable:true});
 const ks=typeof VM!=='undefined'?Object.keys(VM):[];window.VIMG={};let n=0;for(const k of ks){const im=new Image();im.onload=()=>{if(++n===ks.length)_vr=true;};im.src=VM[k].src;VIMG[k]=im;}if(!ks.length)_vr=true;}
const VEL={huey:[-25,5,30],cobra:[-25,5,30],b52:[-50,-20,10],f4:[-30,5,30],m35:[5,22,45],m35o:[5,22,45]};
const nearest=(arr,v)=>arr.reduce((a,b)=>Math.abs(b-v)<Math.abs(a-v)?b:a);
const toWorld=(pos,yaw,l)=>{const c=Math.cos(yaw),s=Math.sin(yaw);return [pos[0]+l[0]*c+l[2]*s,pos[1]+l[1],pos[2]-l[0]*s+l[2]*c];};
// key: 'huey' | 'cobra' | 'b52' | 'f4' | 'm35' | 'm35o' ; pos world (model origin), yaw heading (model +x), o.sc scale, o.blur [dx,dy] px motion streak, o.alpha
function vsprite(c,key,pos,yaw,o={}){const eye=CP.eye;const d=[eye[0]-pos[0],eye[1]-pos[1],eye[2]-pos[2]];const cy=Math.cos(yaw),sy=Math.sin(yaw);
  const lx=d[0]*cy-d[2]*sy,lz=d[0]*sy+d[2]*cy;let az=Math.atan2(lz,lx)*180/Math.PI;az=((Math.round(az/30)*30)%360+360)%360;const el=nearest(VEL[key],Math.atan2(d[1],Math.hypot(lx,lz))*180/Math.PI);
  const name=(key==='m35o'?'m35o':key)+'_'+az+'_'+String(el).replace('-','m');const m=VM[name],im=VIMG[name];if(!m||!im)return null;
  const p=pp(pos);if(p.w<=0.2)return null;const k=(p.s/0.0061)/m.ppu*(o.sc||1);const x=p.x-m.ax*k,y=p.y-m.ay*k,w=m.w*k,h=m.h*k;
  c.save();if(o.alpha!=null)c.globalAlpha=o.alpha;if(o.filter)c.filter=o.filter;
  if(o.blur){const [bx,by]=o.blur;for(let i=4;i>=1;i--){c.globalAlpha=(o.alpha??1)*0.12;c.drawImage(im,x-bx*i/4,y-by*i/4,w,h);}c.globalAlpha=o.alpha??1;}
  c.drawImage(im,x,y,w,h);c.restore();return {p,k};}
// ground shadow under a vehicle / low aircraft: projected, soft
function vshadow(c,pos,yaw,len,wid,a=0.4,soft=8){const P=[[len/2,wid/2],[len/2,-wid/2],[-len/2,-wid/2],[-len/2,wid/2]].map(([x,z])=>pp(toWorld([pos[0],0.02,pos[2]],yaw,[x,0,z])));if(P.some(q=>q.w<=0.1))return;
  c.save();c.filter=`blur(${soft}px)`;c.fillStyle=`rgba(12,16,10,${a})`;c.beginPath();P.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fill();c.restore();}
// spinning main rotor: translucent disc + blurred blades, in true perspective around the mast
function rotorDisc(c,pos,yaw,mast,R,t,o={}){const N=36,ctr=toWorld(pos,yaw,mast);const P=[];for(let i=0;i<N;i++){const a=i/N*TAU;P.push(pp(toWorld(pos,yaw,[mast[0]+Math.cos(a)*R,mast[1]+(o.tilt||0)*Math.cos(a),mast[2]+Math.sin(a)*R])));}if(P.some(q=>q.w<=0.1))return;
  const C0=pp(ctr);c.save();c.fillStyle=`rgba(20,22,18,${o.a??0.16})`;c.beginPath();P.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fill();
  c.strokeStyle='rgba(15,16,14,0.10)';c.lineWidth=Math.max(1,C0.s*6);for(let r=0.35;r<1;r+=0.22){c.beginPath();for(let i=0;i<=N;i++){const a=i/N*TAU;const q=pp(toWorld(pos,yaw,[mast[0]+Math.cos(a)*R*r,mast[1],mast[2]+Math.sin(a)*R*r]));i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y);}c.stroke();}
  const sp=(o.blades||2),ang=t*(o.rpm||37);c.lineCap='round';for(let b=0;b<sp;b++)for(let g=0;g<5;g++){const a=ang+b*TAU/sp-g*0.07;const q=pp(toWorld(pos,yaw,[mast[0]+Math.cos(a)*R,mast[1],mast[2]+Math.sin(a)*R]));
    c.strokeStyle=`rgba(18,18,16,${g?0.12:0.55})`;c.lineWidth=Math.max(1.5,C0.s*(g?14:9));c.beginPath();c.moveTo(C0.x,C0.y);c.lineTo(q.x,q.y);c.stroke();}c.restore();}
function tailRotor(c,pos,yaw,hub,r,t){const N=20,P=[];for(let i=0;i<N;i++){const a=i/N*TAU;P.push(pp(toWorld(pos,yaw,[hub[0]+Math.cos(a)*r,hub[1]+Math.sin(a)*r,hub[2]])));}if(P.some(q=>q.w<=0.1))return;
  c.save();c.fillStyle='rgba(20,20,18,0.22)';c.beginPath();P.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.fill();c.restore();}
// complete helicopters (sprite + rotors + optional ground shadow)
const HELI={huey:{mast:[0.2,3.55,0],R:7.3,tail:[-8.35,3.55,-0.3],tr:1.3},cobra:{mast:[0,3.0,0],R:6.7,tail:[-8.25,3.2,0.3],tr:1.25}};
function heli(c,key,pos,yaw,t,o={}){const H=HELI[key];if(o.shadow)vshadow(c,[pos[0],0,pos[2]],yaw,11,3,0.32*clamp(1-pos[1]/40),14);
  const r=vsprite(c,key,pos,yaw,o);tailRotor(c,pos,yaw,H.tail,H.tr,t);rotorDisc(c,pos,yaw,H.mast,H.R*(o.sc||1),t+(o.seed||0),{});return r;}
function truck(c,pos,yaw,t,o={}){vshadow(c,pos,yaw,7,2.6,0.42,6);return vsprite(c,o.open?'m35o':'m35',pos,yaw,o);}
// the 3D poplar sprite: state full|trim|stump; optional fall angle (rotates about the base)
function tree3(c,t,pos,o={}){const eye=CP.eye;const d=[eye[0]-pos[0],eye[1]-pos[1]-(o.state==='stump'?3:12),eye[2]-pos[2]];const el=nearest([0,12,30,55],Math.atan2(d[1],Math.hypot(d[0],d[2]))*180/Math.PI);
  const st=o.state||'full',name=`poplar${st}_90_${el}`,m=VM[name],im=VIMG[name];if(!m||!im)return null;const p=pp(pos);const k=(p.s/0.0061)/m.ppu;
  vshadow(c,pos,0.6,st==='stump'?3:22,st==='stump'?3:14,0.35,18);c.save();c.translate(p.x,p.y);if(o.fall)c.rotate(o.fall);const sw=st==='stump'?0:Math.sin(t*0.9)*0.004;c.transform(1,0,sw,1,0,0);
  c.drawImage(im,-m.ax*k,-m.ay*k,m.w*k,m.h*k);c.restore();return {b:p,u:k*m.ppu};}
