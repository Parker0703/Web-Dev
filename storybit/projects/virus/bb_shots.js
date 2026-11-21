'use strict';
// ===================== Baby memories · shots =====================
SHOTS.length=0;
const BF=(e='dot',b='flat',m='flat',o={})=>Object.assign({eyes:e,brow:b,mouth:m,view:'front'},o);
function camAt(c,id,pt,z,o={}){CP=PM[id];const q=pp(pt);cam(c,id,Object.assign({z,x:q.x+(o.ox||0),y:q.y+(o.oy||0)},o));}
function bbCine(c,t,o={}){cine(c,t,{v:o.v??0.5,tint:o.tint});}
// rain: streaks in screen space + splashes on a ground band
function rain(c,t,o={}){const n=o.n||180,ang=o.ang??0.12;c.save();c.lineCap='round';
  for(let i=0;i<n;i++){const d=hash(i*1.7),sp=1900+d*1400,len=40+d*90,x=((hash(i*3.1)*1300+t*sp*ang)%1300)-110,y=((hash(i*5.3)*2200+t*sp)%2200)-140;
    c.strokeStyle=`rgba(190,210,255,${0.12+d*0.3})`;c.lineWidth=1.2+d*2.6;c.beginPath();c.moveTo(x,y);c.lineTo(x-len*ang,y-len);c.stroke();}
  if(o.ground){const [y0,y1]=o.ground;for(let i=0;i<46;i++){const ph=(t*2.2+hash(i*9.1))%1,x=hash(i*4.4+Math.floor(t*2.2+hash(i*9.1)))*W,y=y0+hash(i*6.6+Math.floor(t*2.2+hash(i*9.1)))*(y1-y0),r=(6+hash(i)*14)*(0.4+(y-y0)/(y1-y0))*ph*2;
    c.strokeStyle=`rgba(200,220,255,${0.45*(1-ph)})`;c.lineWidth=1.6;c.beginPath();c.ellipse(x,y,r,r*0.3,0,0,TAU);c.stroke();}}
  c.restore();}
function bokehL(c,pts,a=1){c.save();c.globalCompositeOperation='lighter';for(const [x,y,r,col] of pts){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${0.35*a})`);g.addColorStop(0.75,`rgba(${col},${0.22*a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}c.restore();}
function glowAt(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.restore();}

const BV={};
// lens depth of field in screen space: blur everything above y0 (fading in toward y1)
function tiltBlur(c,y0,y1,px){const cv=c.canvas,m=c.getTransform();const L=lyr('tb',cv.width,cv.height),l=L.getContext('2d');l.setTransform(1,0,0,1,0,0);l.globalCompositeOperation='source-over';l.clearRect(0,0,cv.width,cv.height);l.filter=`blur(${px*SS}px)`;l.drawImage(cv,0,0);l.filter='none';
  l.globalCompositeOperation='destination-in';const g=l.createLinearGradient(0,y0*SS,0,y1*SS);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');l.fillStyle=g;l.fillRect(0,0,cv.width,cv.height);c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(L,0,0);c.restore();}
// TEST A · "Your first birthday." baby in a party hat on the rug, cake with one candle, mom clapping
BV.bday=(c,t,u,d)=>{const B=[0.35,0,-0.5];camAt(c,'nu_low',[0.35,0.3,-0.45],K3(u,d,1.25,1.35),{oy:-20});
  const pb=pp(B);const r=baby(c,{x:pb.x,y:pb.y,s:pb.s*0.5,pose:'sit',hat:1,hs:0.98,face:BF('happy','up','grin',{tilt:0.05}),hf:[22,-6+Math.sin(t*6)*6],hb:[-22,-6+Math.sin(t*6+2)*6],open:1,seed:1});
  const pc=pp([0.35,0,-0.28]);cake(c,pc.x,pc.y,pc.s*0.22,t,1);
  c.save();for(let i=0;i<40;i++){const x=hash(i*2.3)*1080,y=((hash(i*4.1)*1400+t*(80+hash(i)*90))%1400)+300;c.save();c.translate(x,y);c.rotate(t*3+i);c.fillStyle=['#e85a5a','#f2c84a','#5ab0d8','#7cc47a','#f08ab0'][i%5];c.globalAlpha=0.85;c.fillRect(-7,-3,14,6);c.restore();}c.restore();
  c.restore();bbCine(c,t,{v:0.45});};
// TEST B · "In mice, scientists switched forgotten baby memories back on." blue light through the fiber, a memory lights up
BV.mice=(c,t,u,d)=>{const M=[0.02,0.94,-0.55];camAt(c,'ml_arena',[0.02,1.02,-0.55],K3(u,d,2.3,2.5),{oy:20});
  const pm=pp(M);const on=clamp((t-wb('switched',71.5))/0.25);const r=mouse(c,{x:pm.x,y:pm.y,s:pm.s*0.16,f:1,eyes:on>0.5?'wide':'dot',fiber:on,seed:0.3,look:-0.3,cable:900});
  // memory orb rising from the mouse's head: inside, the baby mouse snuggled against its mother
  const k=EZ.out(clamp((t-wb('switched',71.5)-0.2)/0.6));if(k>0){const s=pm.s*0.16,R=52*s*(0.6+0.4*k),ox=r.head.x-50*s,oy=r.head.y-(30+36*k)*s;c.save();c.globalAlpha=k;
    // light threads from the implant into the orb
    c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(120,190,255,0.6)';c.lineWidth=2*s;for(let i=0;i<5;i++){c.beginPath();c.moveTo(r.head.x,r.head.y);c.quadraticCurveTo(r.head.x+(i-2)*14*s,r.head.y-30*s,ox+(i-2)*12*s,oy+R*0.9);c.stroke();}c.restore();
    const g=c.createRadialGradient(ox,oy,0,ox,oy,R*1.5);g.addColorStop(0,'rgba(140,200,255,0.35)');g.addColorStop(0.7,'rgba(90,150,255,0.18)');g.addColorStop(1,'rgba(90,150,255,0)');c.fillStyle=g;c.beginPath();c.arc(ox,oy,R*1.5,0,TAU);c.fill();
    c.save();c.beginPath();c.arc(ox,oy,R,0,TAU);c.clip();const bg=c.createLinearGradient(0,oy-R,0,oy+R);bg.addColorStop(0,'rgba(255,224,170,0.95)');bg.addColorStop(1,'rgba(240,170,120,0.95)');c.fillStyle=bg;c.fillRect(ox-R,oy-R,2*R,2*R);
      c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(ox,oy+R*0.62,R*0.9,R*0.22,0,0,TAU);c.fill();
      mouse(c,{x:ox+14*s,y:oy+R*0.6,s:s*0.42,f:-1,eyes:'happy',sniff:0,seed:1});mouse(c,{x:ox-26*s,y:oy+R*0.66,s:s*0.24,f:1,eyes:'happy',sniff:0,seed:2});
      for(let i=0;i<3;i++){const hx=ox+(i-1)*14*s,hy=oy-R*0.45-Math.sin(t*3+i)*4*s;c.fillStyle='#ff6a8a';c.beginPath();c.moveTo(hx,hy+4*s);c.bezierCurveTo(hx-8*s,hy-2*s,hx-4*s,hy-8*s,hx,hy-4*s);c.bezierCurveTo(hx+4*s,hy-8*s,hx+8*s,hy-2*s,hx,hy+4*s);c.fill();}c.restore();
    c.strokeStyle='rgba(190,230,255,0.95)';c.lineWidth=2.6*s;c.beginPath();c.arc(ox,oy,R,0,TAU);c.stroke();c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=1.6*s;c.beginPath();c.arc(ox,oy,R*0.92,-2.4,-1.6);c.stroke();
    c.restore();glowAt(c,ox,oy,R*2,'120,180,255',0.22*k);}
  c.restore();bbCine(c,t,{v:0.55});};
// TEST C · "You just lost the key." rain at night, the brass key with its memory locket bounces on the drain grate
BV.key=(c,t,u,d)=>{const G0=[0.04,0.02,-0.3];CP=PM.al_drain;const g0=pp(G0);
  // the drop: falls in, bounces once on the bars, tips toward the slot
  const td=wb('lost',77.1)-0.32,fall=clamp((t-td)/0.32),bnc=clamp((t-td-0.32)/0.45);let ky,ang,kx=0;
  if(t<td+0.32){ky=-900*(1-fall*fall);ang=-0.6+fall*0.9;}else{ky=-Math.sin(bnc*Math.PI)*170*(1-bnc*0.3);ang=0.3+bnc*0.5;kx=bnc*6;}
  const sink=clamp((t-wb('key',77.5)-0.3)/0.5);
  cam(c,'al_drain',{z:K3(u,d,2.2,2.45),x:g0.x+40,y:g0.y-160,r:-0.04});c.save();c.setTransform(SS,0,0,SS,0,0);tiltBlur(c,700,1120,9);c.restore();
  {c.save();c.globalCompositeOperation='lighter';const lp=c.createRadialGradient(g0.x+260,g0.y-40,0,g0.x+260,g0.y-40,520);lp.addColorStop(0,'rgba(255,170,80,0.32)');lp.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=lp;c.fillRect(g0.x-600,g0.y-600,1400,1200);
    for(let i=0;i<4;i++){const x=g0.x+120+i*90+Math.sin(t*2+i)*6;const sg2=c.createLinearGradient(0,g0.y-200,0,g0.y+500);sg2.addColorStop(0,'rgba(255,190,110,0)');sg2.addColorStop(0.4,`rgba(255,190,110,${0.18-i*0.03})`);sg2.addColorStop(1,'rgba(255,190,110,0)');c.fillStyle=sg2;c.fillRect(x-10-i*3,g0.y-200,20+i*6,700);}c.restore();}
  bokehL(c,[[g0.x+300,g0.y-520,120,'255,190,110'],[g0.x-360,g0.y-600,80,'255,180,100'],[g0.x+120,g0.y-680,60,'255,200,140']],0.8);
  const s=g0.s*0.1;const kxp=g0.x+kx*s*10-60*s,kyp=g0.y-14*s+ky*s*0.6+sink*120*s;
  // splash on contact
  const sp=clamp((t-td-0.32)/0.5);if(sp>0&&sp<1){c.save();c.strokeStyle=`rgba(210,225,255,${0.8*(1-sp)})`;c.lineWidth=5*s;for(let i=0;i<9;i++){const a=-Math.PI*(0.1+0.8*hash(i)),r=(60+hash(i*3)*120)*s*EZ.out(sp);c.beginPath();c.moveTo(kxp+Math.cos(a)*r*0.4,g0.y+Math.sin(a)*r*0.2);c.lineTo(kxp+Math.cos(a)*r,g0.y+Math.sin(a)*r*0.8-60*s*sp);c.stroke();}c.beginPath();c.ellipse(kxp,g0.y,200*s*sp,50*s*sp,0,0,TAU);c.stroke();c.restore();}
  c.save();if(sink>0){c.beginPath();c.rect(0,0,W,g0.y+10*s);c.clip();}
  charm(c,kxp+Math.cos(ang)*(-30)*s,kyp+Math.sin(ang)*(-30)*s,s*1.0,Math.sin(t*9)*0.4*(1-bnc)+0.2,1,t);
  keyProp(c,kxp,kyp,s,ang,{});c.restore();
  glowAt(c,kxp,kyp,160*s,'255,200,120',0.3*(1-sink));if(sink>0)glowAt(c,kxp,g0.y+10*s,300*s,'255,190,100',0.9*(1-sgB(t,wb('key',77.5)+0.75,79.1)));
  c.restore();rain(c,t,{n:200,ang:0.08,ground:[1150,1780]});bbCine(c,t,{v:0.6});};
