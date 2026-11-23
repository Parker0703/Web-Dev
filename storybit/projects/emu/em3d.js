'use strict';
// ===== 3D emu (faces +x, ground y=0, ~1.75 tall) and a 1930s army truck with a pedestal Lewis gun =====
const EMC={a:{f1:'#6a5a48',f2:'#4a3c30',f3:'#8a7a62',neck:'#6a7a8a',skin:'#8a9aaa',leg:'#4a463e'},b:{f1:'#5a5048',f2:'#3a322a',f3:'#7a6e60',neck:'#5a6a7a',skin:'#7a8a9a',leg:'#3e3a34'}};
function legIK(hip,foot,l1,l2){// returns ankle position; bird leg bends BACKWARD (ankle behind the hip-foot line)
  const dx=foot[0]-hip[0],dy=foot[1]-hip[1],d=Math.min(Math.hypot(dx,dy),l1+l2-1e-3),a=Math.atan2(dy,dx),b=Math.acos((l1*l1+d*d-l2*l2)/(2*l1*d));
  const ang=a-b;return [hip[0]+Math.cos(ang)*l1,hip[1]+Math.sin(ang)*l1];}
function buildEmu(D,o={}){const P=EMC[o.col||'a'],pose=o.pose||'stand',fr=o.fr||0;const fe=new Geo(),sk=new Geo(),lg=new Geo(),ey=new Geo(),bk=new Geo();
  const run=pose==='run',ph=fr/4*TAU;const bob=run?0.06*Math.abs(Math.cos(ph)):0;const by=1.12+bob,tilt=run?-0.18:0;
  // body: big egg + hanging shaggy feathers (layers of long tufts)
  G.sphere(fe,M4.chain(M4.T(0,by,0),M4.RZ(tilt),M4.S(0.5,0.31,0.29)),P.f2,{su:28,sv:18});
  const hh=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  for(let i=0;i<150;i++){const a=Math.PI*(0.02+hh(i*1.3)*0.96),zz=(hh(i*2.7)-0.5)*2;const cz=Math.sqrt(Math.max(0,1-zz*zz*0.8));
    const sx=-Math.cos(a)*0.5*cz,sy=by+Math.sin(a)*0.31*cz,sz=zz*0.29;const top=Math.sin(a)>0.75;
    const L=(top?0.16:0.2)+hh(i*3.1)*0.15,wd=0.05+hh(i*4.3)*0.03,sw=run?Math.sin(ph+i)*0.12:0,cs=hh(i*5.9);
    const rz=top?(1.25+(hh(i*7.7)-0.5)*0.4):(tilt+(sx<0?0.3:-0.1)+(hh(i*7.7)-0.5)*0.45+sw);const dy=top?0:-L*0.55,dx=top?-L*0.5:0;
    G.sphere(cs<0.25?sk:fe,M4.chain(M4.T(sx+dx,sy+dy,sz),M4.RZ(rz),M4.RX(zz*0.7+(hh(i*8.1)-0.5)*0.3),M4.S(wd,L,wd*0.7)),cs<0.25?P.f3:cs<0.62?P.f1:P.f2,{su:8,sv:8});}
  // rump plume
  for(let i=0;i<7;i++)G.sphere(fe,M4.chain(M4.T(-0.55-i*0.02,by+0.05-i*0.05,(i%3-1)*0.1),M4.RZ(1.1),M4.S(0.06,0.22,0.06)),P.f2,{su:8,sv:6});
  // neck: S-curve chain; forward and low when running, tall when standing/alert, down to the ground when pecking
  const nb=[0.42,by+0.12];let pts;if(pose==='peck')pts=[[0.6,by+0.15],[0.82,by-0.15],[0.95,0.55],[1.0,0.22]];else if(run)pts=[[0.62,by+0.25],[0.82,by+0.45],[1.0,by+0.6],[1.12,by+0.64]];else pts=[[0.5,by+0.35],[0.52,by+0.6],[0.55,by+0.78],[0.62,by+0.86]];
  const chain=[nb,...pts];const cr=(p0,p1,p2,p3,u)=>{const u2=u*u,u3=u2*u;return [0,1].map(k=>0.5*((2*p1[k])+(-p0[k]+p2[k])*u+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*u2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*u3));};
  for(let sgi=0;sgi<chain.length-1;sgi++)for(let k=0;k<8;k++){const u=k/8,q=cr(chain[Math.max(0,sgi-1)],chain[sgi],chain[sgi+1],chain[Math.min(chain.length-1,sgi+2)],u);const w=(sgi+u)/(chain.length-1),r=lerp(0.11,0.055,w);
    G.sphere(w<0.3?fe:sk,M4.chain(M4.T(q[0],q[1],0),M4.S(r,r,r*0.9)),w<0.3?P.f2:P.neck,{su:12,sv:8});}
  let prev=pts[pts.length-1];
  for(let i=0;i<5;i++){const u=i/4;G.sphere(fe,M4.chain(M4.T(lerp(nb[0],pts[1][0],u),lerp(nb[1],pts[1][1],u)+0.03,0),M4.S(0.1,0.08,0.09)),P.f2,{su:10,sv:8});}
  // head: small, flattish, dark crown fuzz, beak, big eyes
  const hx=prev[0],hy=prev[1],hp=pose==='peck'?-1.1:run?-0.15:0;
  G.sphere(sk,M4.chain(M4.T(hx+0.05,hy,0),M4.RZ(hp),M4.S(0.11,0.085,0.075)),P.skin,{su:16,sv:12});G.sphere(fe,M4.chain(M4.T(hx+0.02,hy+0.05,0),M4.RZ(hp),M4.S(0.09,0.05,0.07)),P.f2,{su:12,sv:8});
  const bx=hx+0.05+Math.cos(hp)*0.15,byk=hy+Math.sin(hp)*0.15-0.015;G.sphere(bk,M4.chain(M4.T(bx,byk,0),M4.RZ(hp-0.08),M4.S(0.09,0.028,0.045)),'#2a2622',{su:12,sv:8});
  for(const zs of [-1,1]){G.sphere(ey,M4.chain(M4.T(hx+0.08+Math.cos(hp)*0.02,hy+0.02+Math.sin(hp)*0.02,zs*0.062),M4.S(0.032,0.034,0.018)),'#5a2a0a',{su:12,sv:8});G.sphere(ey,M4.chain(M4.T(hx+0.088,hy+0.03,zs*0.075),M4.S(0.012,0.012,0.008)),'#ffffff',{su:8,sv:6});}
  // legs: thick feathered drumstick inside body, scaly shank bending backward, three forward toes
  for(const [zs,off] of [[-1,0],[1,Math.PI]]){let foot;const hip=[0.05,by-0.12];
    if(run){const q=ph+off;foot=[0.05+Math.cos(q)*0.5,0.06+Math.max(0,Math.sin(q))*0.38];}else if(pose==='peck')foot=[zs>0?0.25:-0.1,0.06];else foot=[zs>0?0.12:-0.05,0.06];
    const an=legIK(hip,foot,0.55,0.55);seg3(lg,[hip[0],hip[1],zs*0.13],[an[0],an[1],zs*0.13],0.085,P.leg,14);seg3(lg,[an[0],an[1],zs*0.13],[foot[0],foot[1],zs*0.13],0.06,P.leg,14);
    G.sphere(lg,M4.chain(M4.T(an[0],an[1],zs*0.13),M4.S(0.06,0.06,0.06)),P.leg,{su:10,sv:8});G.sphere(fe,M4.chain(M4.T((hip[0]+an[0])/2,(hip[1]+an[1])/2+0.12,zs*0.14),M4.S(0.13,0.2,0.12)),P.f1,{su:12,sv:8});
    const toeUp=run&&foot[1]>0.1?0.5:0;for(const tz of [-0.07,0,0.07])seg3(lg,[foot[0],foot[1],zs*0.13+tz*0.4],[foot[0]+Math.cos(toeUp)*0.2,foot[1]-0.03+Math.sin(toeUp)*0.15,zs*0.13+tz*1.6],0.035,'#3a3a38',8);}
  push(D,fe,{spec:0.2,rim:0.55});push(D,sk,{spec:0.6,rim:0.5});push(D,lg,{spec:0.5,rim:0.35});push(D,ey,{spec:4,rim:0.2});push(D,bk,{spec:1.2,rim:0.3});}
PB.emu=buildEmu;
// ---- truck: 1930s army lorry, olive drab, flat wooden tray, pedestal-mounted Lewis gun, spoked steel wheels ----
function lewis3(g,x,y,z,yaw){const M=(a,b,cc,s)=>G.sphere(g,M4.chain(M4.T(x,y,z),M4.RY(yaw),M4.T(a,b,cc),M4.S(...s)),'#2a2c2e',{su:14,sv:10});
  G.cyl(g,M4.chain(M4.T(x,y,z),M4.RY(yaw),M4.RZ(-Math.PI/2),M4.S(0.075,0.95,0.075)),'#3a3c3e',{seg:16});
  G.cyl(g,M4.chain(M4.T(x,y,z),M4.RY(yaw),M4.T(0.95,0,0),M4.RZ(-Math.PI/2),M4.S(0.025,0.25,0.025)),'#1a1a1a',{seg:10});
  G.cyl(g,M4.chain(M4.T(x,y,z),M4.RY(yaw),M4.T(0.25,0.1,0),M4.S(0.2,0.05,0.2)),'#2a2c2e',{seg:24});M(-0.25,-0.02,0,[0.25,0.07,0.06]);M(-0.45,-0.08,0,[0.18,0.08,0.05]);}
function buildTruck(D,o={}){const body=new Geo(),dark=new Geo(),wood=new Geo(),glass=new Geo(),chrome=new Geo(),tyre=new Geo();const wa=(o.wf||0)*TAU/40;const OD='#5a5c3a';
  for(const [wx,wz] of [[1.55,0.82],[1.55,-0.82],[-1.25,0.82],[-1.25,-0.82]]){const pr=[];for(let i=0;i<=16;i++){const a=-i/16*TAU;pr.push([0.4+Math.cos(a)*0.08,Math.sin(a)*0.1]);}G.lathe(tyre,M4.chain(M4.T(wx,0.48,wz),M4.RX(Math.PI/2)),'#1a1a1a',pr,{seg:40});
    G.cyl(dark,M4.chain(M4.T(wx,0.48,wz),M4.RX(Math.PI/2),M4.S(0.33,0.12,0.33),M4.T(0,-0.5,0)),'#4a4c30',{seg:24});for(let k=0;k<10;k++){const a=wa+k/10*TAU;seg3(dark,[wx,0.48,wz+Math.sign(wz)*0.06],[wx+Math.cos(a)*0.3,0.48+Math.sin(a)*0.3,wz+Math.sign(wz)*0.06],0.025,'#3a3c24',8);}
    G.sphere(chrome,M4.chain(M4.T(wx,0.48,wz+Math.sign(wz)*0.08),M4.S(0.08,0.08,0.04)),'#8a8c70',{su:12,sv:8});}
  vBox(dark,[0.1,0.7,0],[4.1,0.14,0.9],'#2a2a20');
  // bonnet, radiator, mudguards
  vBox(body,[1.75,1.12,0],[1.0,0.55,0.9],OD);G.sphere(body,M4.chain(M4.T(1.75,1.4,0),M4.S(0.5,0.08,0.45)),OD,{su:20,sv:8});vBox(dark,[2.28,1.12,0],[0.06,0.62,0.8],'#2a2a24');for(let i=0;i<8;i++)vBox(chrome,[2.31,0.86+i*0.07,0],[0.02,0.02,0.72],'#6a6c58');
  for(const zs of [-1,1]){G.sphere(body,M4.chain(M4.T(1.55,0.86,zs*0.82),M4.S(0.55,0.22,0.2)),OD,{su:20,sv:10});vBox(body,[0.5,0.78,zs*0.82],[0.9,0.06,0.25],OD);G.sphere(chrome,M4.chain(M4.T(2.25,1.35,zs*0.55),M4.S(0.07,0.11,0.11)),'#d8d8c0',{su:14,sv:10});}
  // cab: open-sided with canvas roof
  vBox(body,[0.95,1.35,0],[0.7,1.0,1.4],OD);vBox(glass,[1.31,1.75,0],[0.03,0.45,1.2],'#3a4a5a');vBox(body,[0.85,2.05,0],[1.0,0.08,1.5],'#6a6a48');vBox(dark,[0.75,1.15,0.71],[0.4,0.5,0.02],'#1a1a14');
  // tray with wooden slats
  vBox(wood,[-1.05,0.95,0],[2.6,0.12,1.7],'#7a5a34');for(const zs of [-1,1]){for(let k=0;k<3;k++)vBox(wood,[-1.05,1.12+k*0.16,zs*0.85],[2.6,0.12,0.05],k%2?'#8a6a40':'#6a4a2a');}for(let k=0;k<3;k++)vBox(wood,[-2.33,1.12+k*0.16,0],[0.05,0.12,1.7],'#6a4a2a');
  for(let i=0;i<5;i++)vBox(dark,[-2.2+i*0.6,1.25,0.86],[0.04,0.5,0.06],'#3a3a2a');
  // pedestal + Lewis gun
  G.cyl(dark,M4.chain(M4.T(-0.6,1.0,0),M4.S(0.06,0.75,0.06)),'#2a2c2e',{seg:12});lewis3(dark,-0.6,1.8,0,o.gy||0);
  vBox(wood,[-1.7,1.1,0.4],[0.4,0.25,0.3],'#5a5a3a');vBox(wood,[-1.7,1.35,0.4],[0.36,0.22,0.28],'#4a4a30');
  push(D,body,{spec:0.6,rim:0.4});push(D,dark,{spec:1.0,rim:0.3});push(D,wood,{spec:0.3,rim:0.3});push(D,glass,{spec:3,rim:0.5});push(D,chrome,{spec:2.5,rim:0.5});push(D,tyre,{spec:0.4,rim:0.25});}
PB.truck=buildTruck;
