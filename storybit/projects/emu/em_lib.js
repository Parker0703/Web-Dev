'use strict';
// ===================== The Great Emu War · cast, props, sets (StoryBit B) =====================
const LIT=(rim='#ffe0a8',amb='#3a2a20',dx=1)=>{L2={dx,rim,amb};};
Object.assign(KIND2,{
  digger:{coat:'#8a7a4e',limb:'#7a6a42',hat:'slouch',hair:'#5a3a22',skirt:'#8a7a4e',skirtL:20,belt:1,buttons:1},
  major:{coat:'#7a6a44',limb:'#6a5a3a',hat:'peak',hair:'#4a3a2a',skirt:'#7a6a44',skirtL:22,belt:1,buttons:1,stache:1},
  farmer:{coat:'#c8b48a',limb:'#4a3e30',hat:'akubra',hair:'#6a4a2a',vest:'#7a5a3a'},
  farmer2:{coat:'#9aa0a8',limb:'#3a3630',hat:'akubra',hair:'#3a2a1a',vest:'#5a4632'},
  minister:{coat:'#2a2a32',limb:'#2a2a32',hat:'none',hair:'#d8d4cc',stache:1,vest:'#ece8e0'},
  ww1:{coat:'#8a7a4e',limb:'#7a6a42',hat:'brodie',hair:'#5a3a22',skirt:'#8a7a4e',skirtL:20,belt:1},
});
const DIG=o=>fig2(o.c,{kind:'digger',view:'front',...o});
// ---- hats: slouch hat (side pinned up, rising-sun badge), akubra, Brodie helmet, peaked cap ----
{const _h=hat2b;hat2b=function(c,h,s,f,R,t){
  if(h==='slouch'||h==='akubra'){c.save();c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=4*s;const col=h==='slouch'?'#7a6a48':'#5a4430';
    const g=c.createLinearGradient(0,-R*1.7,0,-R*0.5);g.addColorStop(0,shd(col,0.18));g.addColorStop(1,shd(col,-0.25));
    // brim (slouch: one side pinned up against the crown)
    c.fillStyle=shd(col,-0.1);c.beginPath();c.ellipse(0,-R*0.62,R*1.6,R*0.3,0,0,TAU);c.fill();c.stroke();
    if(h==='slouch'){c.fillStyle=shd(col,-0.05);c.beginPath();c.moveTo(-f*R*0.55,-R*0.6);c.quadraticCurveTo(-f*R*1.35,-R*0.75,-f*R*1.25,-R*1.55);c.quadraticCurveTo(-f*R*0.9,-R*1.35,-f*R*0.55,-R*1.2);c.closePath();c.fill();c.stroke();
      c.fillStyle='#c8a040';c.beginPath();c.arc(-f*R*0.95,-R*1.05,R*0.13,Math.PI,TAU);c.fill();for(let k=0;k<7;k++){const a=Math.PI+k/6*Math.PI;c.strokeStyle='#c8a040';c.lineWidth=1.4*s;seg(c,-f*R*0.95,-R*1.05,-f*R*0.95+Math.cos(a)*R*0.2,-R*1.05+Math.sin(a)*R*0.2);}c.strokeStyle=K2;c.lineWidth=4*s;}
    c.fillStyle=g;c.beginPath();c.moveTo(-R*0.78,-R*0.66);c.quadraticCurveTo(-R*0.85,-R*1.5,-R*0.25,-R*1.62);c.quadraticCurveTo(0,-R*1.45,R*0.25,-R*1.62);c.quadraticCurveTo(R*0.85,-R*1.5,R*0.78,-R*0.66);c.closePath();c.fill();c.stroke();
    c.fillStyle=h==='slouch'?'#5a4a30':'#2a1a10';c.beginPath();c.moveTo(-R*0.79,-R*0.68);c.lineTo(R*0.79,-R*0.68);c.lineTo(R*0.8,-R*0.86);c.lineTo(-R*0.8,-R*0.86);c.closePath();c.fill();
    c.fillStyle='rgba(255,240,210,0.18)';c.beginPath();c.ellipse(L2.dx*R*0.35,-R*1.25,R*0.18,R*0.3,0,0,TAU);c.fill();c.restore();return;}
  if(h==='brodie'){c.save();c.strokeStyle=K2;c.lineWidth=4*s;const g=c.createRadialGradient(L2.dx*R*0.3,-R*1.3,R*0.1,0,-R*0.9,R*1.3);g.addColorStop(0,'#8a8a6a');g.addColorStop(1,'#3a3a2a');
    c.fillStyle='#4a4a38';c.beginPath();c.ellipse(0,-R*0.72,R*1.55,R*0.3,0,0,TAU);c.fill();c.stroke();c.fillStyle=g;c.beginPath();c.ellipse(0,-R*0.8,R*0.95,R*0.72,0,Math.PI,TAU);c.fill();c.stroke();c.restore();return;}
  if(h==='peak'){c.save();c.strokeStyle=K2;c.lineWidth=4*s;c.fillStyle='#6a5a3a';c.beginPath();c.moveTo(-R*0.9,-R*0.7);c.quadraticCurveTo(-R*1.05,-R*1.4,0,-R*1.42);c.quadraticCurveTo(R*1.05,-R*1.4,R*0.9,-R*0.7);c.closePath();c.fill();c.stroke();
    c.fillStyle='#8a2a2a';c.fillRect(-R*0.9,-R*0.9,R*1.8,R*0.18);c.fillStyle='#1a1410';c.beginPath();c.ellipse(f*R*0.35,-R*0.62,R*0.75,R*0.16,0,0,Math.PI);c.fill();c.stroke();
    c.fillStyle='#d8b040';c.beginPath();c.arc(0,-R*1.05,R*0.12,0,TAU);c.fill();c.restore();return;}
  return _h(c,h,s,f,R,t);};}
// ---------------- emus (3D sprites) ----------------
const EMU_K=0.72;
function emuHead(x,y,s,view,f=1){const u=167*s*EMU_K;const dx=view==='front'?0:view==='q3'?0.52:0.67;return {x:x+f*dx*u,y:y-1.98*u};}
function emu(c,x,y,s,t,o={}){const f=o.f||1,sd=o.seed||0,col=o.col||(hash(sd*3.7)>0.5?'a':'b'),vw=o.view||'side';let pose=o.pose||'stand';
  if(pose==='graze'){const ph=((t*0.35+hash(sd*5.1))%1);pose=ph<0.55?'peck':'stand';}
  let nm;if(pose==='run'){const fr=Math.floor((t*(o.spd||11)+sd*1.7))%4;nm=`em_${col}_run${(fr+4)%4}_${vw}`;}else nm=`em_${col}_${pose}_${vw}`;
  const m=RMETA[nm],im=RIMG[nm];const ppu=167*s*EMU_K;if(!m||!im)return;const k=ppu/m.ppu;
  const bob=pose==='run'?0:Math.sin(t*2.4+sd)*0.006*ppu;
  c.save();c.fillStyle='rgba(0,0,0,0.28)';c.beginPath();c.ellipse(x,y+0.02*ppu,0.42*ppu,0.07*ppu,0,0,TAU);c.fill();
  c.translate(x,y+bob);c.scale(f*k,k);c.drawImage(im,-m.ax,-m.ay,m.w,m.h);c.restore();
  if(pose==='run'&&o.dust!==0){c.save();for(let i=0;i<3;i++){const p=((t*3+i/3+sd*0.3)%1);c.fillStyle=`rgba(190,140,90,${0.35*(1-p)})`;c.beginPath();c.arc(x-f*(0.2+p*0.5)*ppu,y-p*0.15*ppu,(0.05+p*0.15)*ppu,0,TAU);c.fill();}c.restore();}}
// a flock in perspective, depth-sorted with actors (people, trucks), nobody overlapping
function flock(c,t,o){const n=o.n||40,res=[],P=o.persp,A=o.actors||[];
  for(let i=0;i<n;i++){const u=hash(i*3.7+(o.seed||0)),v=hash(i*5.3+(o.seed||0));let x=lerp(o.x0,o.x1,u),y=lerp(o.y0,o.y1,v);if(o.flow){const r=o.flow(x,y,i,t);if(!r)continue;({x,y}=r);}
    for(const a of A){const ry=a.ry||a.rx*0.32,dx=(x-a.x)/a.rx,dy=(y-a.y)/ry,d=Math.hypot(dx,dy);if(d<1){const k=d<1e-3?1:1/d;x=a.x+dx*k*a.rx;y=a.y+dy*k*ry;}}res.push({y,x,i});}
  for(const a of A)res.push({y:a.y,a});res.sort((p,q)=>p.y-q.y);
  for(const r of res){if(r.a){r.a.draw();continue;}const s=pS(P,r.y)*(o.big||1);const pose=typeof o.pose==='function'?o.pose(r.i):(o.pose||'stand');const f=typeof o.f==='function'?o.f(r.i,r.x):(o.f??(hash(r.i)>0.5?1:-1));
    emu(c,r.x,r.y,s,t,{pose,f,seed:r.i,view:typeof o.view==='function'?o.view(r.i):(o.view||'side'),spd:o.spd});}}
// ---------------- the truck (3D sprite) with a gunner standing in the tray ----------------
const TR_CAM={side:{c:[0,1.2,0],r:2.6,eye:[0,0.15,1]},q3:{c:[0,1.2,0],r:2.6,eye:[0.62,0.16,0.76]}};
function truck(c,x,y,s,t,o={}){const vw=o.view||'side',ppu=167*s,f=o.f||1;const bump=o.bump||0;const by=-Math.abs(Math.sin(t*9))*bump*0.06*ppu+Math.sin(t*23)*bump*0.015*ppu,rot=Math.sin(t*7.3)*bump*0.04;
  const nm=`tr_${vw}_w${o.moving?Math.floor(t*16)%4:0}`;const m=RMETA[nm];if(!m)return;const k=ppu/m.ppu;const o0=cProj(TR_CAM[vw],[0,0,0]);
  const pt=(X,Y,Z)=>{const p=cProj(TR_CAM[vw],[X,Y,Z]);let dx=(p[0]-o0[0])*k*f,dy=(p[1]-o0[1])*k;const cs=Math.cos(rot),sn=Math.sin(rot);return {x:x+dx*cs-dy*sn,y:y+by+dx*sn+dy*cs};};
  c.save();c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(x+f*0.2*ppu,y+0.05*ppu,2.6*ppu,0.25*ppu,0,0,TAU);c.fill();c.restore();
  if(o.moving)for(let i=0;i<12;i++){const p=((t*2.4+i/12)%1);c.fillStyle=`rgba(200,140,90,${0.45*(1-p)})`;c.beginPath();c.arc(x-f*(1.8+p*3)*ppu,y-(0.1+p*0.6)*ppu+Math.sin(i*5)*0.15*ppu,(0.2+p*0.7)*ppu,0,TAU);c.fill();}
  const g=pt(-1.15,1.0,0);if(o.gunner)o.gunner(g.x,g.y,ppu/167,pt);
  c.save();c.translate(x,y+by);c.rotate(rot);c.scale(f*k,k);c.drawImage(RIMG[nm],-m.ax,-m.ay,m.w,m.h);c.restore();
  return {pt,muzzle:pt(0.4,1.8,0),grip:pt(-0.85,1.76,0)};}
// ---------------- Lewis gun (2D side view) on a tripod, muzzle flash, tracers, dust hits ----------------
function lewisGun(c,x,y,s,ang,f=1,o={}){const u=167*s;c.save();c.translate(x,y);c.scale(f,1);c.rotate(ang);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=0.012*u;
  if(o.tripod!==false){c.strokeStyle='#2a2a26';c.lineWidth=0.025*u;for(const a of [-0.35,0.05,0.4]){c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(a)*0.5*u,0.75*u);c.stroke();}c.strokeStyle=K2;c.lineWidth=0.012*u;}
  const sg=c.createLinearGradient(0,-0.06*u,0,0.06*u);sg.addColorStop(0,'#5a5c5e');sg.addColorStop(0.5,'#2a2c2e');sg.addColorStop(1,'#141516');
  c.fillStyle=sg;c.beginPath();c.roundRect(-0.05*u,-0.065*u,0.85*u,0.13*u,0.02*u);c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=0.006*u;for(let i=0;i<10;i++)seg(c,(0.02+i*0.075)*u,-0.06*u,(0.02+i*0.075)*u,0.06*u);c.strokeStyle=K2;c.lineWidth=0.012*u;
  c.fillStyle='#1a1a1a';c.fillRect(0.8*u,-0.02*u,0.2*u,0.04*u);c.strokeRect(0.8*u,-0.02*u,0.2*u,0.04*u);
  c.fillStyle='#3a3c3e';c.beginPath();c.ellipse(0.12*u,-0.1*u,0.2*u,0.045*u,0,0,TAU);c.fill();c.stroke();c.fillStyle='#4a4c4e';c.beginPath();c.ellipse(0.12*u,-0.115*u,0.07*u,0.02*u,0,0,TAU);c.fill();
  c.fillStyle='#2a2a2c';c.beginPath();c.moveTo(-0.05*u,-0.05*u);c.lineTo(-0.25*u,-0.04*u);c.lineTo(-0.25*u,0.05*u);c.lineTo(-0.05*u,0.06*u);c.closePath();c.fill();c.stroke();
  c.fillStyle='#6a4a2a';c.beginPath();c.moveTo(-0.25*u,-0.04*u);c.lineTo(-0.55*u,-0.02*u);c.lineTo(-0.58*u,0.09*u);c.lineTo(-0.25*u,0.05*u);c.closePath();c.fill();c.stroke();
  c.fillStyle='#4a3420';c.beginPath();c.roundRect(-0.2*u,0.05*u,0.05*u,0.12*u,0.015*u);c.fill();c.stroke();
  c.restore();return {muzzle:{x:x+f*Math.cos(ang)*1.0*u,y:y+Math.sin(ang)*1.0*u},grip:{x:x+f*(-0.17*Math.cos(ang))*u,y:y+0.1*u},stock:{x:x-f*0.45*u,y:y}};}
function muzzleFlash(c,x,y,s,t,ang=0,f=1){const fl=(Math.floor(t*30)%2)===0;if(!fl)return;const u=167*s;c.save();c.translate(x,y);c.scale(f,1);c.rotate(ang);c.globalCompositeOperation='lighter';
  const g=c.createRadialGradient(0.1*u,0,0,0.1*u,0,0.35*u);g.addColorStop(0,'rgba(255,250,210,1)');g.addColorStop(0.35,'rgba(255,190,80,0.8)');g.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=g;c.beginPath();c.ellipse(0.12*u,0,0.35*u,0.16*u,0,0,TAU);c.fill();
  c.fillStyle='rgba(255,240,180,0.9)';for(const a of [-0.5,0,0.5]){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*0.3*u,Math.sin(a)*0.3*u-0.02*u);c.lineTo(Math.cos(a)*0.3*u,Math.sin(a)*0.3*u+0.02*u);c.fill();}c.restore();}
function tracer(c,x0,y0,x1,y1,t,i){const p=((t*6+i*0.37)%1);c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,220,140,0.9)';c.lineWidth=4;c.lineCap='round';const a=p,b=Math.min(1,p+0.12);seg(c,lerp(x0,x1,a),lerp(y0,y1,a),lerp(x0,x1,b),lerp(y0,y1,b));c.restore();}
function dustHit(c,x,y,s,t,sd){const p=((t*2.2+hash(sd)*0.9)%1);if(p>0.7)return;const u=167*s,q=p/0.7;c.save();c.fillStyle=`rgba(170,110,70,${0.6*(1-q)})`;for(let k=0;k<4;k++){c.beginPath();c.arc(x+(k-1.5)*0.05*u*(1+q),y-q*0.25*u-k*0.03*u,(0.04+q*0.1)*u,0,TAU);c.fill();}
  c.fillStyle=`rgba(120,80,50,${0.8*(1-q)})`;for(let k=0;k<6;k++){const a=-Math.PI*(0.15+k*0.14);c.beginPath();c.arc(x+Math.cos(a)*q*0.3*u,y+Math.sin(a)*q*0.3*u+q*q*0.2*u,0.012*u,0,TAU);c.fill();}c.restore();}
// ---------------- sets ----------------
function gumTree(c,x,y,h,t,sd,dusk){c.save();c.translate(x,y);c.rotate(Math.sin(t*0.9+sd)*0.012);const tr=dusk?'#c8b8b0':'#ece6da';c.strokeStyle=tr;c.lineCap='round';
  c.lineWidth=h*0.06;seg(c,0,0,h*0.02,-h*0.5);c.lineWidth=h*0.035;seg(c,h*0.02,-h*0.5,-h*0.2,-h*0.78);seg(c,h*0.02,-h*0.5,h*0.22,-h*0.82);seg(c,h*0.02,-h*0.45,h*0.05,-h*0.9);
  c.strokeStyle='rgba(120,100,80,0.35)';c.lineWidth=h*0.012;seg(c,-h*0.01,-h*0.1,-h*0.005,-h*0.4);
  const cols=dusk?['#4a4a3a','#5a5a44','#3a3a30']:['#6a7a58','#7a8a64','#5a6a4a'];for(const [dx,dy,r,k] of [[-0.22,-0.82,0.17,0],[0.22,-0.86,0.18,1],[0.05,-0.97,0.2,2],[-0.05,-0.72,0.13,1],[0.3,-0.7,0.11,0]]){c.fillStyle=cols[k];c.beginPath();c.ellipse(dx*h,dy*h,r*h*1.3,r*h*0.8,0,0,TAU);c.fill();}
  c.restore();}
// outback / wheatbelt: o.land 'wheat'|'scrub'|'farm', o.dusk, o.fence, o.house; world(c,GY)
function outback(c,t,v={},o={}){v={...v,y:(v.y||960)+(o.lift??420)};const GY=o.GY||1300,dusk=o.dusk;c.save();dof(c,lensBlur(v),c=>{c.save();cam(c,v);
  const g=c.createLinearGradient(0,-800,0,GY);if(dusk){g.addColorStop(0,'#2a2a5a');g.addColorStop(0.55,'#d8704a');g.addColorStop(1,'#ffc080');}else{g.addColorStop(0,'#3a7ac8');g.addColorStop(0.6,'#9ac8ea');g.addColorStop(1,'#f4ead0');}c.fillStyle=g;c.fillRect(-2500,-800,6000,GY+800);
  const sx=o.sunX??780,sy=GY-(dusk?120:620);c.fillStyle=dusk?'#ffe0a0':'#fffbe8';c.beginPath();c.arc(sx,sy,dusk?110:80,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';const sg=c.createRadialGradient(sx,sy,0,sx,sy,900);sg.addColorStop(0,dusk?'rgba(255,170,90,0.6)':'rgba(255,250,220,0.5)');sg.addColorStop(1,'rgba(255,200,150,0)');c.fillStyle=sg;c.fillRect(-1500,-800,4000,2600);c.restore();
  for(let i=0;i<6;i++){const x=((hash(i)*3000+t*(6+i*2))%3000)-1000,y=-300+hash(i*3)*450;c.fillStyle=dusk?'rgba(255,190,150,0.55)':'rgba(255,255,255,0.8)';for(let k=0;k<5;k++){c.beginPath();c.ellipse(x+k*80,y+Math.sin(k)*14,70+k*8,30,0,0,TAU);c.fill();}}
  // far range + plain
  c.fillStyle=dusk?'#6a4a6a':'#8aa0b8';c.beginPath();c.moveTo(-2500,GY-60);for(let x=-2500;x<=3500;x+=60)c.lineTo(x,GY-60-Math.abs(Math.sin(x*0.004))*50-Math.sin(x*0.011)*14);c.lineTo(3500,GY);c.lineTo(-2500,GY);c.fill();
  const red=o.land==='scrub';const gg=c.createLinearGradient(0,GY-40,0,GY+1600);if(red){gg.addColorStop(0,dusk?'#8a4a34':'#b8683a');gg.addColorStop(1,dusk?'#5a2a1a':'#8a4424');}else{gg.addColorStop(0,dusk?'#a8784a':'#d8b060');gg.addColorStop(1,dusk?'#7a5030':'#b88a3a');}c.fillStyle=gg;c.fillRect(-2500,GY-40,6000,2000);
  // distant gum tree belt
  for(let i=0;i<30;i++){const x=-1400+i*150+hash(i*2.3)*90;gumTree(c,x,GY-30+hash(i*4.1)*20,70+hash(i*1.9)*80,t,i,dusk);}
  if(o.land==='wheat'||o.land==='farm'){// wheat rows converging, golden heads swaying
    for(let r=0;r<36;r++){const yy=GY+Math.pow(r/36,1.7)*1500;c.strokeStyle=dusk?'rgba(120,70,30,0.35)':'rgba(150,100,30,0.35)';c.lineWidth=1+r*0.12;c.beginPath();c.moveTo(-2500,yy);c.lineTo(3500,yy);c.stroke();}
    for(let i=0;i<420;i++){const d=hash(i*1.31),x=-1500+hash(i*2.71)*4000,y=GY+Math.pow(d,1.5)*1500,sz=0.4+d*2.4,sw=Math.sin(t*2+x*0.004)*6*sz;c.strokeStyle=dusk?'#c8904a':'#e8c060';c.lineWidth=1.4*sz;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+sw*0.5,y-12*sz,x+sw,y-24*sz);c.stroke();c.fillStyle=dusk?'#d8a050':'#f4d070';c.beginPath();c.ellipse(x+sw,y-27*sz,2.4*sz,6*sz,sw*0.03,0,TAU);c.fill();}}
  else{// red dirt with spinifex and scrub
    for(let i=0;i<160;i++){const d=hash(i*1.7),x=-1500+hash(i*3.3)*4000,y=GY+Math.pow(d,1.5)*1500,sz=0.4+d*2.2;c.fillStyle=dusk?'#5a5a3a':'#8a8a4a';c.beginPath();c.ellipse(x,y,22*sz,9*sz,0,Math.PI,TAU);c.fill();c.strokeStyle=dusk?'#6a6a44':'#a8a058';c.lineWidth=1.2*sz;for(let k=-3;k<=3;k++)seg(c,x,y,x+k*6*sz,y-14*sz-hash(i+k)*6*sz);}
    for(let i=0;i<60;i++){const d=hash(i*2.9),x=-1500+hash(i*5.3)*4000,y=GY+Math.pow(d,1.4)*1500;c.fillStyle='rgba(80,30,10,0.25)';c.beginPath();c.ellipse(x,y,(10+d*40),(3+d*10),0,0,TAU);c.fill();}}
  if(o.fence){const fy=GY+(o.fenceY||180);c.strokeStyle='#5a4028';for(let i=-12;i<30;i++){const x=i*120+((o.fenceX||0)%120);c.lineWidth=7;seg(c,x,fy,x,fy-70);}c.strokeStyle='rgba(60,60,60,0.8)';c.lineWidth=2;for(const h of [20,40,60]){c.beginPath();c.moveTo(-1500,fy-h);c.lineTo(3500,fy-h);c.stroke();}}
  if(o.house){const hx=o.house[0],hy=GY+o.house[1];c.fillStyle='#c8c0b0';c.fillRect(hx-120,hy-110,240,110);c.fillStyle='#8a8a8e';c.beginPath();c.moveTo(hx-150,hy-110);c.lineTo(hx,hy-190);c.lineTo(hx+150,hy-110);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3;c.stroke();c.strokeRect(hx-120,hy-110,240,110);
    c.fillStyle='#5a4030';c.fillRect(hx-20,hy-70,40,70);c.fillStyle='#ffe0a0';c.fillRect(hx-90,hy-80,40,34);c.fillRect(hx+50,hy-80,40,34);c.strokeStyle='#5a5a5e';c.lineWidth=5;c.beginPath();c.moveTo(hx+150,hy-60);c.lineTo(hx+175,hy);c.stroke();c.fillStyle='#7a7a7e';c.fillRect(hx+130,hy-180,30,70);
    c.fillStyle='#8a6a4a';c.fillRect(hx+190,hy-200,16,200);for(let k=0;k<8;k++){const a=t*3+k*Math.PI/4;c.strokeStyle='#6a6a6e';c.lineWidth=4;seg(c,hx+198,hy-205,hx+198+Math.cos(a)*45,hy-205+Math.sin(a)*45);}}
  if(o.haze!==0){c.fillStyle=dusk?'rgba(255,170,120,0.12)':'rgba(255,240,220,0.16)';c.fillRect(-2500,GY-120,6000,180);}
  c.restore();});cam(c,v);if(o.world)o.world(c,GY);c.restore();motes(c,t,18,dusk?'rgba(255,180,120,A)':'rgba(255,230,190,A)',4);}
// ---------------- map of Australia ----------------
const AUS=[[113.4,-22],[114.2,-26.3],[115,-29.5],[115.7,-31.9],[115.1,-34.3],[117.9,-35.1],[121.9,-33.9],[124,-33],[126.1,-32.3],[129,-31.6],[131.2,-31.5],[134.2,-32.6],[135.9,-34.8],[137.5,-33],[137.8,-35.6],[139.6,-36],[140.6,-38],[143.5,-38.8],[146.3,-39.1],[147.8,-37.9],[150,-37.4],[150.2,-35.7],[151.3,-33.8],[153.1,-31],[153.6,-28.2],[153.1,-25],[150.8,-22.6],[149.3,-21],[146.3,-18.9],[145.4,-16.2],[145.3,-14.9],[143.5,-14],[142.5,-10.7],[141.6,-12.9],[141.6,-16],[140.2,-17.7],[139,-17],[137,-15.9],[135.5,-14.7],[136.8,-12.2],[135.9,-11.9],[132.6,-11.5],[131,-12.2],[130,-13],[129.4,-14.9],[128,-15],[126.9,-14],[124.4,-16.3],[123,-16.4],[121,-19.6],[118.8,-20.3],[116.7,-20.6],[114.6,-21.8]];
const TAS=[[144.6,-40.7],[148.3,-40.9],[148,-43.2],[146,-43.6],[145,-42]];
function ausMap(c,t,o={}){const z=o.z||1,ox=o.cx??540,oy=o.cy??960,sc=15*z,lc=o.lc??133,la=o.la??-27;const P=([lo,lt])=>[ox+(lo-lc)*sc,oy-(lt-la)*sc*1.15];
  const bg=c.createRadialGradient(540,900,100,540,960,1200);bg.addColorStop(0,'#1e3a5a');bg.addColorStop(1,'#0c1a2c');c.fillStyle=bg;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(120,170,220,0.12)';c.lineWidth=2;for(let lo=110;lo<=160;lo+=5){const a=P([lo,-5]),b=P([lo,-45]);seg(c,a[0],a[1],b[0],b[1]);}for(let lt=-10;lt>=-45;lt-=5){const a=P([105,lt]),b=P([160,lt]);seg(c,a[0],a[1],b[0],b[1]);}
  const path=pts=>{c.beginPath();pts.forEach((p,i)=>{const q=P(p);i?c.lineTo(...q):c.moveTo(...q);});c.closePath();};
  c.save();c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=30;c.fillStyle='#d8b878';path(AUS);c.fill();path(TAS);c.fill();c.restore();
  if(o.wa){c.save();path(AUS);c.clip();const a=P([129,0]);c.fillStyle=`rgba(255,200,60,${0.55*o.wa})`;c.fillRect(0,0,a[0],H);c.strokeStyle='rgba(60,40,20,0.7)';c.setLineDash([12,10]);c.lineWidth=4;seg(c,a[0],0,a[0],H);c.restore();}
  c.strokeStyle=K2;c.lineWidth=5;path(AUS);c.stroke();path(TAS);c.stroke();
  if(o.wheat){const pts=[[116.5,-30],[119.5,-30.5],[120.5,-33],[117.5,-34],[116.2,-32.5]];c.save();c.globalAlpha=o.wheat;c.fillStyle='rgba(240,200,80,0.85)';path(pts);c.fill();c.strokeStyle='#8a6a20';c.lineWidth=3;c.stroke();for(let i=0;i<30;i++){const q=P([116.4+hash(i)*4,-30.2-hash(i*3)*3.4]);c.strokeStyle='#a88a30';c.lineWidth=2;seg(c,q[0],q[1],q[0],q[1]-10);}c.restore();}
  if(o.pin){const q=P([118.4,-31.1]);const k=back(clamp(o.pin));c.save();c.translate(q[0],q[1]);c.scale(k,k);c.fillStyle='#ffd23f';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-30,-40,-30,-80,0,-80);c.bezierCurveTo(30,-80,30,-40,0,0);c.fill();c.stroke();c.fillStyle=K2;c.beginPath();c.arc(0,-55,10,0,TAU);c.fill();c.restore();
    if(o.pinLabel)statTag(c,q[0]+20,q[1]-130,o.pinLabel,GOLD_C,k);}
  if(o.arrows){for(let i=0;i<6;i++){const a=P([[126,-25],[128,-28],[125,-30],[124,-22],[127,-33],[123,-26]][i]),b=P([[119,-30.5],[119.5,-31.5],[118.5,-32.5],[118,-30],[119.8,-33],[118.2,-31]][i]);const p=clamp(o.arrows*1.3-i*0.08);if(p<=0)continue;
    const ex=lerp(a[0],b[0],eo(p)),ey=lerp(a[1],b[1],eo(p));c.strokeStyle='rgba(255,90,60,0.9)';c.lineWidth=10;c.lineCap='round';c.setLineDash([22,16]);c.lineDashOffset=-t*60;seg(c,a[0],a[1],ex,ey);c.setLineDash([]);
    const an=Math.atan2(ey-a[1],ex-a[0]);c.fillStyle='rgba(255,90,60,0.95)';c.beginPath();c.moveTo(ex+Math.cos(an)*26,ey+Math.sin(an)*26);c.lineTo(ex+Math.cos(an+2.4)*22,ey+Math.sin(an+2.4)*22);c.lineTo(ex+Math.cos(an-2.4)*22,ey+Math.sin(an-2.4)*22);c.fill();
    emu(c,ex-Math.cos(an)*30,ey+20,0.28,t,{pose:'run',f:Math.cos(an)<0?-1:1,seed:i,dust:0});}}
  if(o.label){c.save();c.font='900 44px "Inter Display"';c.letterSpacing='8px';c.textAlign='center';c.fillStyle='rgba(255,255,255,0.9)';c.fillText(o.label,540,o.labelY||560);c.restore();}
  return P;}
// ---------------- other sets: minister's office, WWI trench (sepia) ----------------
function office(c,t,v={},o={}){v={...v,y:(v.y||960)+(o.lift??400)};const GY=1500;c.save();cam(c,v);
  const g=c.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#5a3a22');g.addColorStop(1,'#3a2414');c.fillStyle=g;c.fillRect(-800,-400,2700,GY+400);
  c.strokeStyle='rgba(20,10,4,0.45)';c.lineWidth=4;for(let i=-6;i<14;i++)c.strokeRect(i*170,140,140,GY-500);
  c.fillStyle='#bcd4e6';c.fillRect(640,220,360,520);c.strokeStyle='#2a1a10';c.lineWidth=14;c.strokeRect(640,220,360,520);c.lineWidth=6;seg(c,820,220,820,740);seg(c,640,480,1000,480);
  c.strokeStyle='rgba(40,25,12,0.6)';c.lineWidth=5;for(let i=0;i<14;i++)seg(c,646,236+i*36,994,236+i*36);
  // 1930s blue ensign on a pole
  const fx=200,fy=230;c.strokeStyle='#c8a040';c.lineWidth=8;seg(c,fx,fy-30,fx,fy+700);c.save();c.translate(fx,fy);const wv=k=>Math.sin(t*2+k*0.02)*6;c.fillStyle='#1a2a7a';c.beginPath();c.moveTo(0,0);for(let k=0;k<=300;k+=20)c.lineTo(k,wv(k));for(let k=300;k>=0;k-=20)c.lineTo(k,180+wv(k));c.closePath();c.fill();
    c.fillStyle='#fff';c.fillRect(0,0,150,90);c.fillStyle='#c8102e';c.fillRect(65,0,20,90);c.fillRect(0,37,150,16);c.fillStyle='#fff';for(const [sx,sy] of [[75,140],[230,60],[200,120],[260,110],[240,160]]){c.beginPath();c.arc(sx,sy+wv(sx),sx===75?16:9,0,TAU);c.fill();}c.restore();
  c.fillStyle='#4a2e18';c.fillRect(-800,GY-100,2700,1200);c.restore();if(o.world){c.save();cam(c,v);o.world(c,GY);c.restore();}}
function desk(c,x0,x1,y,h,t){c.fillStyle='#6a4426';c.beginPath();c.moveTo(x0-30,y);c.lineTo(x1+30,y);c.lineTo(x1,y-60);c.lineTo(x0,y-60);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=5;c.stroke();
  const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#5a3820');g.addColorStop(1,'#2a160a');c.fillStyle=g;c.fillRect(x0-30,y,x1-x0+60,h);c.strokeRect(x0-30,y,x1-x0+60,h);c.strokeStyle='#c8a040';c.lineWidth=3;c.strokeRect(x0+10,y+40,(x1-x0)/2-30,h*0.4);c.strokeRect((x0+x1)/2+20,y+40,(x1-x0)/2-30,h*0.4);}
function trench(c,t){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#4a4438');g.addColorStop(1,'#2a241c');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const x=(i%8)*150-30+(Math.floor(i/8)%2)*70,y=900+Math.floor(i/8)*70;c.fillStyle=i%3?'#7a6a4a':'#6a5a3a';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.roundRect(x,y,140,60,18);c.fill();c.stroke();}
  c.strokeStyle='#2a2a26';c.lineWidth=3;for(let k=0;k<3;k++){c.beginPath();for(let x=0;x<=W;x+=10)c.lineTo(x,640+k*40+Math.sin(x*0.08+k)*14);c.stroke();}for(let x=20;x<W;x+=90){c.strokeStyle='#3a3020';c.lineWidth=6;seg(c,x,600,x,760);}
  for(let i=0;i<5;i++){const p=((t*0.4+i/5)%1);c.fillStyle=`rgba(200,190,170,${0.35*(1-p)})`;c.beginPath();c.arc(200+i*180,500-p*300,60+p*80,0,TAU);c.fill();}}
function sepia(c,a=0.85,tt=0){c.save();c.globalCompositeOperation='color';c.fillStyle=`rgba(160,120,70,${a})`;c.fillRect(0,0,W,H);c.restore();c.fillStyle='rgba(40,30,20,0.12)';for(let i=0;i<4;i++){c.fillRect(hash(i+Math.floor(tt*12))*W,0,2,H);}}
// ---------------- UI pieces ----------------
function scoreboard(c,x,y,k,a,b){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(10,10,16,0.88)';c.beginPath();c.roundRect(-380,-110,760,220,30);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.stroke();
  txt(c,'EMUS',-200,-50,48,'#fff',{sw:8,ls:6});txt(c,'ARMY',200,-50,48,'#fff',{sw:8,ls:6});txt(c,String(a),-200,40,110,'#ffd23f',{sw:12});txt(c,String(b),200,40,110,'#fff',{sw:12});txt(c,':',0,30,90,'#fff',{sw:10});c.restore();}
function counterCard(c,x,y,k,val,label,col=GOLD_C){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(10,8,14,0.86)';c.beginPath();c.roundRect(-300,-95,600,190,28);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,val,0,-14,104,'#fff',{sw:12});c.font='800 30px "Inter Display"';c.letterSpacing='6px';c.fillStyle=col;c.textAlign='center';c.fillText(label,0,62);c.restore();}
function ammoCrate(c,x,y,s,lbl){const u=167*s;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=0.012*u;c.fillStyle='#6a6a3a';c.fillRect(-0.4*u,-0.35*u,0.8*u,0.35*u);c.strokeRect(-0.4*u,-0.35*u,0.8*u,0.35*u);c.fillStyle='#7a7a48';c.beginPath();c.moveTo(-0.4*u,-0.35*u);c.lineTo(0.4*u,-0.35*u);c.lineTo(0.5*u,-0.45*u);c.lineTo(-0.3*u,-0.45*u);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8e0c0';c.font=`900 ${0.09*u}px "Inter Display"`;c.textAlign='center';c.textBaseline='middle';c.fillText(lbl||'.303 AMMO',0,-0.18*u);c.restore();}
function binoView(c,t){c.save();c.fillStyle='#000';c.beginPath();c.rect(0,0,W,H);c.arc(330,960,330,0,TAU,true);c.moveTo(1080,960);c.arc(750,960,330,0,TAU,true);c.fill('evenodd');c.restore();}
