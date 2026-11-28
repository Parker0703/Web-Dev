'use strict';
// ===================== animation toolkit: planted-foot gaits, easing, anticipation =====================
const EZ={
  io:u=>{u=clamp(u);return u<0.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;},
  out:u=>{u=clamp(u);return 1-Math.pow(1-u,3);},
  in:u=>{u=clamp(u);return u*u*u;},
  back:u=>{u=clamp(u);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2);},
  // damped spring settle 0→1 with overshoot
  spring:(u,k=8,z=0.35)=>{if(u<=0)return 0;return 1-Math.exp(-z*k*u)*Math.cos(k*u*Math.sqrt(1-z*z));},
  smooth:u=>{u=clamp(u);return u*u*(3-2*u);}
};
const seg01=(t,a,b)=>clamp((t-a)/(b-a));
// distance travelled along a move with ease-in / ease-out (accelerate, cruise, slow to a stop)
function travel(t,t0,dur,dist,acc=0.25){const u=clamp((t-t0)/dur);const a=Math.min(acc,0.49);
  // trapezoid velocity profile, integrated
  const vmax=1/(1-a);let p;if(u<a)p=vmax*u*u/(2*a);else if(u>1-a){const r=1-u;p=1-vmax*r*r/(2*a);}else p=vmax*(u-a/2);return p*dist;}
// gait: returns fig options so that feet stay planted on the ground while the body moves.
//  d = distance travelled (plate px), s = figure scale, f = facing (+1 right / -1 left)
//  kind: 'walk' | 'sneak' | 'run' | 'strut'
function gait(d,s,f,t,o={}){const kind=o.kind||'walk';const P={walk:{D:52,lift:18,bob:6,arm:34,lean:0.05,crouch:2},strut:{D:56,lift:16,bob:7,arm:38,lean:-0.03,crouch:2},
    sneak:{D:40,lift:42,bob:9,arm:0,lean:0.18,crouch:18},run:{D:84,lift:40,bob:13,arm:46,lean:0.3,crouch:8}}[kind];
  const D=P.D*(o.stride||1)*s,c=d/(2*D);const seed=o.seed||0;const br=Math.sin((T+seed)*2.6+seed*3)*1.4;
  // body: lowest at each contact, highest when the legs pass
  const crouch=P.crouch+P.bob*(0.5+0.5*Math.cos(4*Math.PI*c))*(o.moving??1);const hipY=-(116)+crouch+br; // relative to ground, in units
  const foot=(off)=>{const cc=c+off,k=Math.floor(cc),u=cc-k;const plant=k*2*D+D/2;let x,lift=0;
    if(u<0.5)x=plant;else{const w=EZ.smooth((u-0.5)/0.5);x=plant+w*2*D;lift=Math.sin(Math.PI*w)*P.lift*s;}
    // toe-off: heel rises late in stance
    if(u>0.38&&u<0.5)lift+=((u-0.38)/0.12)*3*s;
    return [(x-d)/s,(-lift)/s-hipY];};
  const ff=foot(0),fb=foot(0.5);
  let hf,hb;
  if(kind==='sneak'){// classic cartoon tiptoe: hands up by the chest, fingers dangling, slight bounce
    hf=[24+Math.sin(c*2*Math.PI)*4,44];hb=[10+Math.sin(c*2*Math.PI+1)*4,48];}
  else if(kind==='run'){// bent arms pumping hard
    hf=[Math.cos(2*Math.PI*(c+0.5))*44+14,50+Math.sin(2*Math.PI*(c+0.5))*10];hb=[Math.cos(2*Math.PI*c)*44+10,52+Math.sin(2*Math.PI*c)*10];}
  else{const a=P.arm;hf=[Math.cos(2*Math.PI*(c+0.5))*a+8,82-Math.max(0,Math.cos(2*Math.PI*(c+0.5)))*8];hb=[Math.cos(2*Math.PI*c)*a+6,84-Math.max(0,Math.cos(2*Math.PI*c))*8];}
  if(o.hf)hf=o.hf;if(o.hb)hb=o.hb;
  return {ff,fb,hf,hb,crouch:crouch,lean:(P.lean+(o.lean||0)),stance:0,headX:Math.sin(4*Math.PI*c-0.6)*1.2};}
// draw a walker in plate space: from point A to B (plate px) over [t0,t0+dur]; scale interpolates for depth
function walker(c,kind,t,A,B,t0,dur,face,o={}){const dist=Math.hypot(B.x-A.x,B.y-A.y);const d=travel(t,t0,dur,dist,o.acc??0.22);const u=dist?d/dist:0;
  const x=lerp(A.x,B.x,u),y=lerp(A.y,B.y,u),s=lerp(A.s,B.s,u);const f=o.f??(B.x>=A.x?1:-1);
  const moving=(t>t0&&t<t0+dur)?1:0;const g=gait(d,s,f,t,Object.assign({moving},o));
  return who(c,kind,[0,0,0],Object.assign({},face,{abs:{x,y,s},f,ff:g.ff,fb:g.fb,hf:o.hfFix||g.hf,hb:o.hbFix||g.hb,crouch:g.crouch,lean:g.lean,headX:g.headX,rot:1e-4}));}
// anticipation → action → follow-through value for one beat (0 rest, dips negative before, overshoots after)
function antic(t,t0,pre=0.18,act=0.22,amt=0.25){if(t<t0-pre)return 0;if(t<t0)return -amt*EZ.smooth((t-(t0-pre))/pre);return lerp(-amt,1,EZ.spring((t-t0)/act*1.2,9,0.42));}
