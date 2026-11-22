'use strict';
function shdH(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;if(k<0){r*=1+k;g*=1+k;b*=1+k;}else{r+=(255-r)*k;g+=(255-g)*k;b+=(255-b)*k;}return '#'+[r,g,b].map(v=>(v|0).toString(16).padStart(2,'0')).join('');}
// ===== 3D rabbit (s4 engine) — rendered once per pose/colour/view to keyed sprites (rabbits video) =====
// model faces +x, ground at y=0, z toward camera in side view. o: col, pose ('sit'|'sit2'|'hop'|'eat'), ph (hop phase 0..3)
const RB3={white:{fur:'#f2f2f4',sh:'#dcdce4',belly:'#ffffff',inner:'#f4a6b6'},grey:{fur:'#a8acb6',sh:'#8a8e98',belly:'#e4e6ea',inner:'#eea0ae'},
  brown:{fur:'#a87a4e',sh:'#8a6038',belly:'#ecd8bc',inner:'#e8a0a0'},spot:{fur:'#f2f2f4',sh:'#dcdce4',belly:'#ffffff',inner:'#f4a6b6',patch:'#3e3028'}};
function ell(g,x,y,z,sx,sy,sz,col,rot=[0,0,0],q=20){G.sphere(g,M4.chain(M4.T(x,y,z),M4.RY(rot[1]),M4.RZ(rot[2]),M4.RX(rot[0]),M4.S(sx,sy,sz)),col,{su:q,sv:Math.round(q*0.7)});}
function buildRabbit(D,o={}){const P=RB3[o.col||'white'],pose=o.pose||'sit',ph=o.ph||0;
  const fur=new Geo(),soft=new Geo(),pink=new Geo(),eye=new Geo(),dark=new Geo();
  // pose parameters: torso pitch, head offset/pitch, hind legs, front paws, ear sweep
  let tp=0.32,hx=0.55,hy=1.05,hp=0,hind=0,fr=[0.45,0.12],earB=0,bodyS=1,lift=0;
  if(pose==='hop'){const A=[{tp:0.5,hind:0,fr:[0.5,0.1],earB:0.1,s:0.95},{tp:0.15,hind:0.9,fr:[0.75,0.35],earB:0.5,s:1.12},{tp:-0.05,hind:1.2,fr:[0.85,0.45],earB:0.85,s:1.2},{tp:0.35,hind:0.3,fr:[0.7,0.05],earB:0.4,s:1.0}][ph];
    tp=A.tp;hind=A.hind;fr=A.fr;earB=A.earB;bodyS=A.s;hx=0.6+(bodyS-1)*0.6;hy=1.0-(0.32-tp)*0.5;}
  if(pose==='eat'){tp=0.18;hx=0.78;hy=0.68;hp=-0.35;fr=[0.62,0.1];}
  // --- torso: big round haunch + chest, slightly pitched
  ell(fur,-0.22,0.5,0,0.62*bodyS,0.5,0.56,P.fur,[0,0,tp*0.5]);
  ell(fur,0.22,0.62+(0.32-tp)*-0.2,0,0.45*bodyS,0.48,0.44,P.fur,[0,0,tp]);
  ell(soft,0.4,0.55,0,0.26,0.36,0.32,P.belly,[0,0,0.3]);// chest fluff
  for(let i=0;i<9;i++){const a=i/9*TAU;ell(soft,0.42+Math.cos(a)*0.04,0.62+Math.sin(a)*0.22,Math.sin(a*1.3)*0.18,0.12,0.12,0.12,P.belly,[0,0,0],10);}
  ell(fur,-0.72,0.55,0,0.17,0.17,0.17,P.belly,[0,0,0],14);// cotton tail
  for(let i=0;i<6;i++){const a=i/6*TAU;ell(fur,-0.78+Math.cos(a)*0.06,0.56+Math.sin(a)*0.06,0.05,0.1,0.1,0.1,P.belly,[0,0,0],10);}
  // --- hind legs (thigh + long foot); kicked back during the hop
  for(const zs of [-1,1]){const kx=-0.25-hind*0.35,ky=0.36+hind*0.12;ell(fur,kx,ky,zs*0.33,0.4,0.3,0.19,P.fur,[0,0,0.3+hind*0.5]);
    const fx=-0.02-hind*0.85,fy=0.07+hind*0.25;ell(fur,fx,fy,zs*0.3,0.38,0.075,0.12,P.sh,[0,0,hind*0.9]);ell(pink,fx+0.36-hind*0.3,fy+0.01,zs*0.3,0.04,0.035,0.06,P.inner,[0,0,0],8);}
  // --- front legs + paws
  for(const zs of [-1,1]){const px=fr[0],py=fr[1];ell(fur,(0.4+px)/2,(0.5+py)/2,zs*0.15,0.09,Math.max(0.12,Math.hypot(px-0.4,py-0.5)/2+0.05),0.09,P.fur,[0,0,Math.atan2(px-0.4,0.5-py)]);ell(soft,px,py,zs*0.15,0.12,0.08,0.1,P.belly,[0,0,0],12);}
  // --- head: skull, cheeks, muzzle, nose, eyes
  const H=M=>M;const hz=0;const hc=(x,y)=>[hx+x*Math.cos(hp)-y*Math.sin(hp),hy+x*Math.sin(hp)+y*Math.cos(hp)];
  let [x,y]=hc(0,0);ell(fur,x,y,hz,0.38,0.34,0.35,P.fur,[0,0,hp]);
  for(const zs of [-1,1]){[x,y]=hc(0.14,-0.1);ell(soft,x,y,zs*0.17,0.22,0.18,0.16,P.belly,[0,0,hp]);for(let i=0;i<4;i++){[x,y]=hc(0.05+i*0.05,-0.2);ell(soft,x,y,zs*(0.26-i*0.02),0.08,0.07,0.07,P.belly,[0,0,0],8);}}
  [x,y]=hc(0.31,-0.07);ell(soft,x,y,0,0.14,0.12,0.16,P.belly,[0,0,hp]);
  [x,y]=hc(0.43,-0.02);ell(pink,x,y,0,0.045,0.035,0.06,'#f07c96',[0,0,hp],10);
  for(const zs of [-1,1]){[x,y]=hc(0.22,0.08);ell(eye,x,y,zs*0.22,0.085,0.1,0.07,'#1a0e0a',[0,zs*-0.5,hp],16);[x,y]=hc(0.27,0.12);ell(fur,x,y,zs*0.255,0.025,0.025,0.02,'#ffffff',[0,0,0],8);}
  if(P.patch){[x,y]=hc(0.12,0.08);ell(dark,x,y,0.16,0.17,0.15,0.2,P.patch,[0,0,hp]);ell(dark,-0.25,0.85,0.18,0.32,0.22,0.36,P.patch);ell(dark,-0.45,0.6,-0.22,0.2,0.18,0.3,P.patch);}
  // --- ears: long, flattened, splayed; pink inner faces forward/out; swept back when hopping (+variant 'sit2': one ear flopped)
  for(const zs of [-1,1]){const flop=pose==='sit2'&&zs<0;const swp=-0.25-earB+(flop?-0.9:0),spl=zs*(0.18+(flop?0.4:0));
    const [bx,by]=hc(-0.08,0.28);const L=0.42;const cx=bx+Math.sin(-swp)*L*0.9*Math.cos(spl),cy=by+Math.cos(swp)*L*0.9,cz=zs*0.12+Math.sin(spl)*L;
    ell(P.patch&&zs>0?dark:fur,cx,cy,cz,0.065,L,0.16,P.patch&&zs>0?P.patch:P.fur,[spl,0,swp+hp],18);
    ell(pink,cx+0.045,cy,cz+zs*0.01,0.03,L*0.84,0.1,P.inner,[spl,0,swp+hp],16);}
  // lift for hop frames
  const lf=pose==='hop'?[0,0.15,0.45,0.1][ph]:0;for(const g of [fur,soft,pink,eye,dark]){}
  push(D,fur,{spec:0.25,rim:0.55});push(D,soft,{spec:0.15,rim:0.6});push(D,pink,{spec:0.6,rim:0.3});push(D,eye,{spec:3.5,rim:0.2});push(D,dark,{spec:0.25,rim:0.4});
  if(lf)for(const d of D)d.M=M4.chain(M4.T(0,lf,0),d.M);}
PB.rabbit=buildRabbit;
// ===== 3D berline (Napoleon's coach) + coach horses =====
const NAVY='#1d2a4a',GOLDC='#d8b040',WOODR='#7a2418';
function seg3(g,a,b,r,col,q=12){const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);G.sphere(g,M4.chain(M4.T((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2),M4.RZ(Math.atan2(dx,-dy)),M4.S(r,L/2+r*0.6,r)),col,{su:q,sv:Math.round(q*0.7)});}
function wheel3(g,gm,x,y,z,R,wa){// rim ring + 12 spokes + hub, in the x-y plane at depth z
  const tor=(rad,rr,col,gg)=>{const pr=[];for(let i=0;i<=16;i++){const a=-i/16*TAU;pr.push([rad+Math.cos(a)*rr,Math.sin(a)*rr*1.6]);}G.lathe(gg,M4.chain(M4.T(x,y,z),M4.RX(Math.PI/2)),col,pr,{seg:56});};
  tor(R-0.02,0.045,'#26221e',g);tor(R-0.1,0.05,WOODR,gm);
  for(let k=0;k<12;k++){const a=wa+k/12*TAU;seg3(gm,[x,y,z],[x+Math.cos(a)*(R-0.08),y+Math.sin(a)*(R-0.08),z],0.028,WOODR,8);}
  G.cyl(gm,M4.chain(M4.T(x,y,z),M4.RX(Math.PI/2),M4.S(0.12,0.22,0.12),M4.T(0,-0.5,0)),GOLDC,{seg:16});}
function buildCoach(D,o={}){const body=new Geo(),gold=new Geo(),dark=new Geo(),glass=new Geo(),wood=new Geo(),lamp=new Geo();const wa=(o.wf||0)*(TAU/12)/4;
  // running gear: perch, springs, axles, wheels
  vBox(dark,[0,0.62,0],[2.9,0.12,0.18],'#2a1a12');for(const sx of [-1,1]){ell(dark,sx*1.15,0.92,0.55,0.38,0.06,0.07,'#3a3a40');ell(dark,sx*1.15,0.92,-0.55,0.38,0.06,0.07,'#3a3a40');}
  vBox(dark,[-1.25,0.75,0],[0.1,0.1,1.75],'#2a1a12');vBox(dark,[1.25,0.55,0],[0.1,0.1,1.75],'#2a1a12');
  for(const zs of [-1,1]){wheel3(dark,wood,-1.25,0.75,zs*0.88,0.75,wa);wheel3(dark,wood,1.25,0.55,zs*0.88,0.55,wa*1.36);}
  // cabin: curved belly, upper box, roof with gold gallery
  ell(body,0,1.32,0,1.25,0.42,0.7,NAVY);vBox(body,[0,1.95,0],[2.2,1.15,1.38],NAVY);vBox(body,[0,2.58,0],[2.4,0.12,1.5],'#141c34');
  for(let i=0;i<=10;i++)vBox(gold,[-1.15+i*0.23,2.7,0.72],[0.03,0.16,0.03],GOLDC);vBox(gold,[0,2.79,0.72],[2.35,0.03,0.03],GOLDC);vBox(gold,[0,2.79,-0.72],[2.35,0.03,0.03],GOLDC);
  vBox(gold,[0,2.51,0.7],[2.25,0.04,0.02],GOLDC);vBox(gold,[0,1.38,0.71],[2.25,0.04,0.02],GOLDC);
  // quarter windows (glass with a sky reflection), red curtains
  for(const wx of [-0.78,0.78]){vBox(glass,[wx,2.05,0.695],[0.5,0.55,0.02],'#2a3a58');vBox(gold,[wx,2.05,0.7],[0.56,0.04,0.02],GOLDC);vBox(gold,[wx,2.33,0.7],[0.56,0.03,0.02],GOLDC);vBox(gold,[wx,1.77,0.7],[0.56,0.03,0.02],GOLDC);
    vBox(gold,[wx-0.27,2.05,0.7],[0.03,0.59,0.02],GOLDC);vBox(gold,[wx+0.27,2.05,0.7],[0.03,0.59,0.02],GOLDC);vBox(body,[wx-0.2,2.05,0.69],[0.12,0.52,0.02],'#8a1a22');}
  // door (hinged at x=-0.38 on the near side); open = swung out toward camera
  const ang=-(o.open||0)*1.25;const hx=-0.38,hz=0.72;const DM=(g,c0,sz,col)=>{G.box(g,M4.chain(M4.T(hx,0,hz),M4.RY(ang),M4.T(-hx,0,-hz),M4.T(c0[0],c0[1],c0[2]),M4.S(sz[0],sz[1],sz[2])),col,{});};
  if(o.open){vBox(dark,[0,1.75,0.69],[0.74,1.38,0.03],'#140c0a');vBox(dark,[0,1.35,0.66],[0.7,0.18,0.06],'#6a1420');}
  DM(body,[0,1.75,0.725],[0.76,1.4,0.05],NAVY);DM(glass,[0,2.1,0.755],[0.46,0.44,0.02],'#2a3a58');DM(gold,[0,2.1,0.76],[0.52,0.03,0.02],GOLDC);
  DM(gold,[0,1.4,0.76],[0.24,0.24,0.03],GOLDC);DM(gold,[-0.36,1.75,0.76],[0.03,1.36,0.02],GOLDC);DM(gold,[0.36,1.75,0.76],[0.03,1.36,0.02],GOLDC);DM(gold,[0.3,1.7,0.78],[0.04,0.1,0.05],GOLDC);
  vBox(dark,[0,0.95,0.86],[0.36,0.04,0.2],'#3a3a40');vBox(dark,[0,1.02,0.78],[0.04,0.16,0.04],'#3a3a40');// iron step
  // coachman's box + footboard, rear boot, lanterns
  vBox(body,[1.42,2.0,0],[0.5,0.16,1.15],'#141c34');vBox(wood,[1.62,1.55,0],[0.1,0.85,1.0],'#2a1a12');vBox(body,[1.38,2.18,0],[0.42,0.24,1.1],'#3a1a14');
  vBox(body,[-1.42,1.55,0],[0.42,0.8,1.15],'#22180f');for(const zs of [-1,1])vBox(gold,[-1.42,1.55,zs*0.58],[0.44,0.03,0.02],GOLDC);
  for(const zs of [-1,1]){vBox(gold,[1.18,2.35,zs*0.78],[0.12,0.26,0.12],GOLDC);ell(lamp,1.18,2.35,zs*0.78,0.06,0.1,0.06,'#fff0b0');}
  // pole to the horses + swingletrees
  seg3(wood,[1.6,0.9,0],[3.4,1.25,0],0.05,'#3a2412');vBox(dark,[2.0,0.95,0],[0.08,0.06,1.0],'#2a1a12');
  push(D,body,{spec:1.4,rim:0.45});push(D,gold,{spec:2.4,rim:0.5});push(D,dark,{spec:0.6,rim:0.3});push(D,glass,{spec:3,rim:0.6});push(D,wood,{spec:0.8,rim:0.35});push(D,lamp,{spec:1,rim:0.2,emis:[1,0.85,0.4]});}
// horse: x forward, ground y=0; gallop frames 0..3 or stand; z offset for the pair
function horse3(D,x0,z0,col,mane,fr,stand){const g=new Geo(),m=new Geo(),h=new Geo(),tk=new Geo();const H=(x,y,z)=>[x0+x,y,z0+z];
  const bob=stand?0:[0.05,0.12,0.02,-0.04][fr];const y=1.45+bob;
  ell(g,x0,y,z0,1.0,0.44,0.38,col);ell(g,x0,y-0.12,z0,0.85,0.36,0.34,col);ell(g,x0+0.72,y+0.05,z0,0.48,0.46,0.36,col);ell(g,x0-0.72,y+0.04,z0,0.5,0.47,0.38,col);
  const nk=stand?0:[0.1,-0.05,0.15,0.05][fr];seg3(g,H(1.0,y+0.25,0),H(1.45+nk*0.3,y+0.95-nk,0),0.24,col,14);
  const hx=1.66+nk*0.3,hy=y+1.02-nk;ell(g,x0+hx-0.06,hy+0.06,z0,0.2,0.17,0.15,col);seg3(g,[x0+hx-0.02,hy,z0],[x0+hx+0.26,hy-0.4,z0],0.11,col,14);
  ell(g,x0+hx+0.28,hy-0.43,z0,0.12,0.1,0.11,shdH(col,-0.25));ell(tk,x0+hx+0.33,hy-0.42,z0+0.06,0.025,0.02,0.02,'#0a0a0a');for(const zs of [-1,1])ell(m,x0+hx-0.22,hy+0.2,z0+zs*0.08,0.04,0.11,0.04,col);
  for(const zs of [-1,1])ell(tk,x0+hx-0.05,hy+0.05,z0+zs*0.12,0.035,0.035,0.02,'#0a0a0a');
  for(let i=0;i<5;i++){const u=i/4;ell(m,x0+1.02+u*0.55,y+0.48+u*0.6-nk*u,z0,0.09,0.2,0.06,mane,[0,0,-0.75]);}
  const tw=stand?0:[0.3,0.1,-0.1,0.2][fr];for(let i=0;i<6;i++){const u=i/5;ell(m,x0-1.15-u*0.35,y+0.15-u*0.55+tw*u,z0,0.08+u*0.03,0.14,0.08,mane,[0,0,0.5+tw]);}
  // legs: [hip/shoulder angle, knee angle] per leg per frame (rotary gallop)
  const P=stand?[[0,0],[0,0],[0,0],[0,0]]:[[[0.6,-0.3],[0.3,-0.9],[-0.5,0.2],[-0.2,0.6]],[[0.2,-1.2],[-0.1,-0.4],[-0.6,0.4],[-0.7,0.9]],[[-0.4,-0.3],[-0.6,-0.1],[0.1,1.0],[0.4,0.5]],[[-0.2,-0.2],[0.2,-1.0],[0.5,0.3],[0.2,1.1]]][fr];
  const L=[[0.75,0.2],[0.75,-0.2],[-0.75,0.2],[-0.75,-0.2]];
  L.forEach(([lx,lz],i)=>{const [a1,a2]=P[i].map(v=>v*0.7);const top=H(lx,y-0.25,lz);const kn=[top[0]+Math.sin(a1)*0.6,top[1]-Math.cos(a1)*0.6,top[2]];const ft=[kn[0]+Math.sin(a1+a2)*0.62,Math.max(0.06,kn[1]-Math.cos(a1+a2)*0.62),kn[2]];
    const mid=[(top[0]+kn[0])/2,(top[1]+kn[1])/2,top[2]];seg3(g,[top[0],top[1]+0.1,top[2]],mid,lx>0?0.17:0.2,col,12);seg3(g,mid,kn,0.1,col,12);seg3(g,kn,ft,0.065,shdH(col,-0.15),10);ell(tk,ft[0]+0.02,ft[1]-0.02,ft[2],0.11,0.06,0.1,'#1a1410');ell(m,ft[0],ft[1]+0.07,ft[2],0.08,0.05,0.08,mane);});
  // harness: collar, breast strap, saddle pad, traces
  G.sphere(tk,M4.chain(M4.T(x0+0.95,y+0.3,z0),M4.RZ(-0.7),M4.S(0.14,0.42,0.42)),'#3a2414',{su:16,sv:10});ell(tk,x0+0.1,y+0.42,z0,0.28,0.1,0.42,'#2a1a10');vBox(tk,[x0+0.2,y-0.1,z0],[0.07,0.75,0.78],'#2a1a10');for(const zs of [-1,1])seg3(tk,[x0+0.95,y+0.1,z0+zs*0.36],[x0-1.3,y-0.1,z0+zs*0.36],0.025,'#2a1a10',8);
  ell(h,x0+0.95,y+0.62,z0,0.05,0.05,0.05,GOLDC);
  push(D,g,{spec:0.9,rim:0.5});push(D,m,{spec:0.4,rim:0.4});push(D,tk,{spec:1.2,rim:0.3});push(D,h,{spec:2.4});}
function buildHorses(D,o={}){const st=o.pose==='stand',fr=o.fr||0;horse3(D,4.55,-0.45,'#5a3420','#1a1210',(fr+2)%4,st);horse3(D,4.45,0.45,'#6a3e24','#1a1210',fr,st);}
PB.coach=buildCoach;PB.horses=buildHorses;
