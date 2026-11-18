// ===== 3D-rendered vehicle sprites (veh/*.png from veh3d.js via the s4 engine) =====
const VIMG={};window.READY=false;
Promise.all(Object.keys(VMETA).map(n=>new Promise(r=>{const im=new Image();im.onload=()=>{VIMG[n]=im;r();};im.onerror=r;im.src=VDATA[n];}))).then(()=>{window.READY=true;});
// draw a side/front sprite: cx = centre of the vehicle body, gy = ground line, len = body width in px; flip mirrors horizontally
function vehDraw(c,n,cx,gy,len,o={}){const m=VMETA[n],im=VIMG[n];if(!im)return;const k=len/(m.sx1-m.sx0);c.save();c.translate(cx,gy);if(o.flip)c.scale(-1,1);if(o.rot)c.rotate(o.rot);
  c.drawImage(im,-(m.sx0+(m.sx1-m.sx0)/2)*k,-m.gy*k,m.w*k,m.h*k);c.restore();return k;}
// side-view sedan with the two of them visible through the side glass
function carSide(c,cx,gy,len,o={}){vehDraw(c,'car_side',cx,gy,len,o);if(!o.people)return;const ppm=len/4.78,f=o.flip?-1:1;c.save();c.globalAlpha=0.8;
  for(const [dx,hair] of [[0.25,'#2a1c14'],[-0.8,'#6a3a1a']]){const x=cx+f*dx*ppm,y=gy-1.16*ppm,r=0.17*ppm;c.fillStyle='#c8c8cc';c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.fillStyle=hair;c.beginPath();c.arc(x,y-r*0.15,r*1.02,Math.PI*1.02,Math.PI*1.98);c.fill();}c.restore();}
function truckSide(c,cx,gy,len,o={}){vehDraw(c,'truck_side_l',cx,gy,len,o);}
function truckFront2(c,cx,by,w){vehDraw(c,'truck_front',cx,by,w);}
