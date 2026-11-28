'use strict';
function S2(kind,o){return fig2(o.c,{kind,view:'front',...o});}
const F0=(c,t,t0,d=0.3)=>{const a=1-clamp((t-t0)/d);if(a>0){c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);}};
const pushZ=(t,t0,t1,z0,z1)=>lerp(z0,z1,eio(inv(t0,t1,t)));
const MUSK=106/1236;// unused helper ratio
// musket held upright beside the body (shoulder arms) / levelled for a charge
const mUp=(o={})=>(c,h,s,f)=>prop(c,'musket',h.x,h.y,(o.len||290)*s,f>0?-Math.PI/2+0.12:-Math.PI/2-0.12,{anc:[0.16,0.5]});
const mCharge=(o={})=>(c,h,s,f)=>prop(c,'musket',h.x,h.y,290*s,f>0?0.08:Math.PI-0.08,{anc:[0.16,0.5],flip:f<0});
function muzzle(c,t,t0,x,y,s=1,dir=1){const a=t-t0;if(a<0||a>1.2)return;const k=1-a/1.2;c.save();if(a<0.15){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,160*s);g.addColorStop(0,'rgba(255,240,200,1)');g.addColorStop(0.4,'rgba(255,170,60,0.8)');g.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=g;c.fillRect(x-160*s,y-160*s,320*s,320*s);c.globalCompositeOperation='source-over';}
  for(let i=0;i<8;i++){c.fillStyle=`rgba(230,226,220,${0.7*k})`;c.beginPath();c.arc(x+dir*(a*260+i*20)*s,y-a*80*s+(hash(i)-0.5)*40*s,(30+a*120+hash(i)*30)*s,0,TAU);c.fill();}c.restore();}
