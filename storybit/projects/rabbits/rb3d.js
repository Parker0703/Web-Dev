'use strict';
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
