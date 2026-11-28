'use strict';
// ===================== DMZ 1976 · real 3D models (s4 engine) → ink-outlined sprites from many angles =====================
// all models: +x forward, +y up, origin = reference point (helicopters/trucks: ground under the mast/centre; aircraft: centre of mass)
function pushG(D,g,o={}){D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],spec:o.spec??0.4,rim:o.rim??0.3,emis:o.emis});}
function qN(g,col,a,b,c2,d){const u=vv.sub(b,a),w=vv.sub(d,a);let n=vv.norm(vv.cross(u,w));const cc=C(col);g.quad(VI,VNI,cc,[a,n,[0,0]],[b,n,[0,0]],[c2,n,[0,0]],[d,n,[0,0]]);}
// a lifting surface (wing / tail) from a root to a tip: root LE x, root chord, tip LE x, tip chord, root (y,z), tip (y,z), thickness root/tip
function surf(g,col,botCol,r,t,n=10){const P=[];for(let i=0;i<=n;i++){const u=i/n;const le=lerp(r.le,t.le,u),ch=lerp(r.ch,t.ch,u),y=lerp(r.y,t.y,u),z=lerp(r.z,t.z,u),th=lerp(r.th,t.th,u);
    P.push({LT:[le,y+th*0.5,z],LB:[le,y-th*0.3,z],TT:[le-ch,y+th*0.12,z],TB:[le-ch,y-th*0.08,z],M:[le-ch*0.3,y+th*0.6,z]});}
  const s=Math.sign(t.z-r.z)||1;for(let i=0;i<n;i++){const A=P[i],B=P[i+1];
    if(s>0){qN(g,col,A.LT,A.M,B.M,B.LT);qN(g,col,A.M,A.TT,B.TT,B.M);qN(g,botCol,A.TB,A.LB,B.LB,B.TB);qN(g,col,A.LB,A.LT,B.LT,B.LB);}
    else{qN(g,col,B.LT,B.M,A.M,A.LT);qN(g,col,B.M,B.TT,A.TT,A.M);qN(g,botCol,B.TB,B.LB,A.LB,A.TB);qN(g,col,B.LB,B.LT,A.LT,A.LB);}}
  const T=P[n];qN(g,col,T.LT,T.M,T.TT,T.TB);}
// vertical surface (fin) given root/tip in x-y at z=0
function fin(g,col,rootLE,rootCh,y0,tipLE,tipCh,y1,th){const n=8;for(let i=0;i<n;i++){const u0=i/n,u1=(i+1)/n;const L0=lerp(rootLE,tipLE,u0),L1=lerp(rootLE,tipLE,u1),C0=lerp(rootCh,tipCh,u0),C1=lerp(rootCh,tipCh,u1),Y0=lerp(y0,y1,u0),Y1=lerp(y0,y1,u1),T0=lerp(th,th*0.35,u0)/2,T1=lerp(th,th*0.35,u1)/2;
  for(const s of [1,-1]){const a=[L0,Y0,s*T0],b=[L1,Y1,s*T1],c2=[L1-C1,Y1,s*T1*0.3],d=[L0-C0,Y0,s*T0*0.3];if(s>0)qN(g,col,a,d,c2,b);else qN(g,col,a,b,c2,d);}}}
function tube(g,a,b,r,col,seg=10){const d=vv.sub(b,a),L=Math.hypot(...d);const ax=vv.norm(d);const up=Math.abs(ax[1])<0.95?[0,1,0]:[1,0,0];const s=vv.norm(vv.cross(ax,up)),u=vv.cross(s,ax);
  const cc=C(col);for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU;const o0=vv.add(vv.mul(s,Math.cos(a0)*r),vv.mul(u,Math.sin(a0)*r)),o1=vv.add(vv.mul(s,Math.cos(a1)*r),vv.mul(u,Math.sin(a1)*r));
    const n0=vv.norm(o0),n1=vv.norm(o1);g.quad(VI,VNI,cc,[vv.add(a,o0),n0,[0,0]],[vv.add(a,o1),n1,[0,0]],[vv.add(b,o1),n1,[0,0]],[vv.add(b,o0),n0,[0,0]]);}}
function ellG(g,x,y,z,sx,sy,sz,col,q=18){G.sphere(g,M4.chain(M4.T(x,y,z),M4.S(sx,sy,sz)),col,{su:q,sv:Math.round(q*0.7)});}
const OD='#323a26',ODL='#3c4530',GLASS='#1a2630';
// ---------------- UH-1H "Huey" ----------------
function buildHuey(D,o={}){const b=new Geo(),gl=new Geo(),dk=new Geo(),sk=new Geo();
  vLoft(b,[[3.45,1.05,1.25,0.12,0.9],[3.15,0.78,1.9,0.72,1.0],[2.65,0.6,2.18,1.05,1.0],[1.8,0.55,2.36,1.2,1.0],[0.5,0.55,2.4,1.22,1.0],[-0.9,0.6,2.4,1.2,1.0],[-1.8,0.9,2.32,1.0,0.9],[-2.6,1.4,2.22,0.6,0.8],[-3.05,1.6,2.16,0.38,0.7]],OD,4.2,36);
  vLoft(b,[[-2.95,1.56,2.16,0.36,0.6],[-5,1.8,2.24,0.26,0.6],[-7.9,2.02,2.32,0.13,0.6]],OD,3.2,20);
  vLoft(b,[[1.1,2.3,2.62,0.55,0.8],[0.4,2.3,3.02,0.62,0.9],[-1.6,2.3,3.0,0.62,0.9],[-2.7,2.25,2.6,0.4,0.8]],ODL,4,24);
  tube(dk,[-2.5,2.75,0.25],[-3.1,2.95,0.35],0.22,'#2a2a26');tube(dk,[0.2,3.0,0],[0.2,3.5,0],0.16,'#2a2a28');ellG(dk,0.2,3.5,0,0.38,0.14,0.38,'#2a2a28');
  // windshield bubble + chin windows + side windows
  ellG(gl,2.62,1.82,0,0.72,0.42,1.0,GLASS);for(const s of [-1,1]){ellG(gl,3.0,1.05,s*0.42,0.32,0.28,0.26,GLASS);
    vBox(gl,[1.95,1.78,s*1.215],[0.85,0.62,0.04],GLASS);vBox(gl,[0.75,1.82,s*1.225],[0.62,0.55,0.04],GLASS);vBox(gl,[-0.05,1.82,s*1.225],[0.62,0.55,0.04],GLASS);
    vBox(dk,[0.35,1.42,s*1.23],[1.7,0.05,0.04],'#2a2e24');vBox(dk,[0.35,0.62,s*1.23],[1.7,0.05,0.04],'#2a2e24');}
  // tail: fin, stabilisers, tail-rotor gearbox
  fin(b,OD,-7.55,1.2,2.15,-8.6,0.7,3.85,0.24);surf(b,OD,OD,{le:-5.2,ch:0.75,y:2.12,z:0.2,th:0.1},{le:-5.35,ch:0.55,y:2.12,z:1.4,th:0.06},4);surf(b,OD,OD,{le:-5.2,ch:0.75,y:2.12,z:-0.2,th:0.1},{le:-5.35,ch:0.55,y:2.12,z:-1.4,th:0.06},4);
  ellG(dk,-8.35,3.55,-0.18,0.22,0.22,0.16,'#2a2a28');
  // skids + cross tubes
  for(const s of [-1,1]){tube(sk,[-1.7,0.1,s*1.25],[2.2,0.1,s*1.25],0.07,'#2e2e2a');tube(sk,[2.2,0.1,s*1.25],[2.65,0.42,s*1.25],0.07,'#2e2e2a');
    for(const x of [1.3,-0.8]){tube(sk,[x,0.1,s*1.25],[x,0.55,s*0.95],0.075,'#2e2e2a');}}
  for(const x of [1.3,-0.8])tube(sk,[x,0.55,-0.95],[x,0.55,0.95],0.06,'#2e2e2a');
  // white "U.S. ARMY" panel strips + a red/white tail-rotor warning band
  vBox(dk,[-4.2,2.12,0.3],[1.6,0.12,0.02],'#d8d8d0');vBox(dk,[-4.2,2.12,-0.3],[1.6,0.12,0.02],'#d8d8d0');
  pushG(D,b,{spec:0.35,rim:0.35});pushG(D,gl,{spec:3.0,rim:0.6});pushG(D,dk,{spec:0.6});pushG(D,sk,{spec:0.4});}
// ---------------- AH-1 Cobra gunship ----------------
function buildCobra(D){const b=new Geo(),gl=new Geo(),dk=new Geo(),sk=new Geo();const C1='#3a4230';
  vLoft(b,[[3.75,1.1,1.3,0.1,0.9],[3.25,0.78,1.56,0.4,1.0],[2.4,0.62,1.66,0.5,1.0],[1.0,0.56,1.72,0.5,1.0],[-0.6,0.6,1.92,0.5,1.0],[-2.0,0.9,2.0,0.45,0.95],[-3.0,1.3,1.96,0.3,0.8]],C1,4.0,32);
  vLoft(b,[[-2.9,1.36,1.95,0.28,0.6],[-5.5,1.62,2.05,0.2,0.6],[-8.0,1.86,2.14,0.11,0.6]],C1,3.2,18);
  vLoft(gl,[[3.02,1.5,1.72,0.3,1.0],[2.3,1.52,2.12,0.42,1.0],[1.05,1.6,2.3,0.42,1.0],[0.15,1.7,2.24,0.38,1.0]],GLASS,2.6,24);
  vLoft(b,[[0.2,1.9,2.2,0.48,0.9],[-0.5,1.9,2.5,0.5,0.9],[-2.2,1.95,2.45,0.48,0.9],[-2.8,1.95,2.15,0.3,0.8]],'#424a36',4,22);
  tube(dk,[0,2.5,0],[0,2.95,0],0.14,'#262622');ellG(dk,0,2.95,0,0.32,0.12,0.32,'#262622');
  for(const s of [-1,1]){surf(b,C1,C1,{le:0.3,ch:1.1,y:1.25,z:s*0.45,th:0.16},{le:0.15,ch:0.9,y:1.18,z:s*1.55,th:0.1},3);
    vCylX(dk,[-0.2,0.98,s*1.25],0.22,1.7,'#2c2c28',18);vCylX(dk,[0.66,0.98,s*1.25],0.2,0.04,'#141414',18);vCylX(dk,[-0.3,0.98,s*0.82],0.17,1.4,'#34342e',14);
    tube(sk,[-1.3,0.1,s*0.95],[2.0,0.1,s*0.95],0.06,'#2a2a26');tube(sk,[2.0,0.1,s*0.95],[2.4,0.36,s*0.95],0.06,'#2a2a26');for(const x of [1.2,-0.6])tube(sk,[x,0.1,s*0.95],[x,0.62,s*0.42],0.06,'#2a2a26');}
  ellG(dk,2.85,0.56,0,0.3,0.24,0.3,'#26261f');tube(dk,[2.95,0.5,0],[3.75,0.48,0],0.05,'#1a1a1a');
  fin(b,C1,-7.6,1.2,1.95,-8.5,0.65,3.5,0.22);surf(b,C1,C1,{le:-5.8,ch:0.7,y:1.95,z:0.15,th:0.1},{le:-5.95,ch:0.5,y:1.95,z:1.1,th:0.06},3);surf(b,C1,C1,{le:-5.8,ch:0.7,y:1.95,z:-0.15,th:0.1},{le:-5.95,ch:0.5,y:1.95,z:-1.1,th:0.06},3);
  ellG(dk,-8.25,3.2,0.17,0.2,0.2,0.14,'#262622');
  pushG(D,b,{spec:0.35,rim:0.35});pushG(D,gl,{spec:3.0,rim:0.6});pushG(D,dk,{spec:0.7});pushG(D,sk,{spec:0.4});}
// ---------------- B-52D Stratofortress (SEA camouflage, black belly) ----------------
function buildB52(D){const b=new Geo(),blk=new Geo(),gl=new Geo(),en=new Geo(),dk=new Geo();const T1='#7a6c4a',G1='#4c5a3a',G2='#3a4630',BL='#16171a';
  vLoft(b,[[24,-0.2,0.7,0.35,0.9],[22.5,-1.3,1.5,1.45,1],[19.5,-1.6,2.0,1.75,1],[10,-1.7,2.15,1.8,1],[-6,-1.6,2.1,1.78,1],[-15,-1.2,1.98,1.4,1],[-20,-0.6,1.75,0.85,1],[-23.6,0.3,1.4,0.3,1]],G1,4.2,40);
  vLoft(blk,[[23.6,-0.25,0.15,0.38,0.9],[22.4,-1.36,0.0,1.5,1],[19.5,-1.66,0.0,1.8,1],[10,-1.76,0.0,1.85,1],[-6,-1.66,0.0,1.82,1],[-15,-1.26,0.1,1.44,1],[-20,-0.66,0.4,0.88,1],[-23.5,0.25,0.6,0.32,1]],BL,4.2,40);
  ellG(dk,23.4,0.3,0,1.0,0.5,0.4,'#22242a');for(const s of [-1,1]){vBox(gl,[20.7,1.55,s*0.75],[1.6,0.42,0.6],GLASS);}vBox(gl,[21.3,1.25,0],[0.5,0.42,1.0],GLASS);
  // wings: high-mounted, 35° sweep, drooping tips; camo patches on top, black underneath
  for(const s of [-1,1]){const segs=[[0,8,10.5,1.7],[7,3.6,8.3,1.4],[14,-1.1,6.6,1.0],[21,-5.8,5.0,0.6],[28,-10.5,3.6,0.15]];
    for(let i=0;i<segs.length-1;i++){const [z0,le0,ch0,y0]=segs[i],[z1,le1,ch1,y1]=segs[i+1];surf(b,[T1,G1,G2,T1][i],BL,{le:le0,ch:ch0,y:y0,z:s*(1.7+z0),th:lerp(1.1,0.3,i/4)},{le:le1,ch:ch1,y:y1,z:s*(1.7+z1),th:lerp(1.1,0.3,(i+1)/4)},3);}
    // twin-engine pods on pylons
    for(const [zz,le,yy] of [[8.6,4.6,0.9],[15.2,0.2,0.45]]){const z=s*zz;vBox(en,[le-1.5,yy-0.8,z],[2.4,1.2,0.35],'#2a2c30');for(const dz of [-0.62,0.62]){vCylX(en,[le-2.6,yy-1.75,z+dz],0.62,5.2,'#2a2c30',22);vCylX(dk,[le-0.02,yy-1.75,z+dz],0.5,0.05,'#0c0c0e',18);vCylX(dk,[le-5.25,yy-1.75,z+dz],0.42,0.05,'#5a4a3a',16);}}
    vCylX(en,[-5.4,-0.6,s*24],0.75,7.5,BL,20);ellG(en,-1.6,-0.6,s*24,0.9,0.75,0.75,BL,14);}
  // tail: tall fin + stabilisers
  fin(b,G1,-15.2,7.5,1.8,-21.2,3.4,10.6,0.9);for(const s of [-1,1])surf(b,G1,BL,{le:-17.0,ch:5.8,y:1.3,z:s*0.6,th:0.5},{le:-21.8,ch:2.6,y:1.3,z:s*8.0,th:0.15},4);
  pushG(D,b,{spec:0.3,rim:0.35});pushG(D,blk,{spec:0.35,rim:0.25});pushG(D,gl,{spec:3,rim:0.6});pushG(D,en,{spec:0.6,rim:0.3});pushG(D,dk,{spec:0.5});}
// ---------------- F-4 Phantom II (Navy gray over white) ----------------
function buildF4(D){const b=new Geo(),w=new Geo(),gl=new Geo(),dk=new Geo();const GR='#8a9098',WH='#dcdee2';
  vLoft(b,[[9.6,0.1,0.35,0.12,0.9],[7.6,-0.35,0.75,0.52,1],[4.5,-0.55,0.95,0.7,1],[1,-0.6,0.95,1.05,1],[-3,-0.55,0.9,1.15,1],[-6.5,-0.45,0.8,0.95,1],[-8.6,-0.4,0.62,0.85,1]],GR,4,32);
  vLoft(w,[[9.4,0.08,0.12,0.14,0.9],[7.6,-0.36,0.0,0.54,1],[4.5,-0.57,0.0,0.72,1],[1,-0.62,0.0,1.07,1],[-3,-0.57,0.0,1.17,1],[-6.5,-0.47,0.0,0.97,1],[-8.5,-0.42,0.0,0.87,1]],WH,4,32);
  vLoft(gl,[[5.2,0.7,0.95,0.3,1],[4.0,0.75,1.32,0.45,1],[2.2,0.8,1.36,0.47,1],[0.8,0.85,1.15,0.4,1]],GLASS,2.6,22);
  for(const s of [-1,1]){vBox(b,[2.4,0.05,s*1.12],[2.6,1.0,0.5],GR);vBox(dk,[3.72,0.05,s*1.12],[0.05,0.85,0.42],'#141414');
    surf(b,GR,WH,{le:2.2,ch:6.2,y:-0.2,z:s*1.1,th:0.4},{le:-1.6,ch:3.0,y:-0.2,z:s*4.6,th:0.16},4);surf(b,GR,WH,{le:-1.6,ch:3.0,y:-0.2,z:s*4.6,th:0.16},{le:-2.5,ch:2.0,y:0.55,z:s*6.0,th:0.1},2);
    surf(b,GR,WH,{le:-6.6,ch:2.6,y:0.4,z:s*0.8,th:0.14},{le:-8.0,ch:1.4,y:-0.6,z:s*3.0,th:0.06},3);vCylX(dk,[-8.9,-0.1,s*0.55],0.45,0.7,'#3a3632',16);}
  fin(b,GR,-5.2,3.6,0.8,-8.0,1.4,3.6,0.24);
  pushG(D,b,{spec:0.7,rim:0.4});pushG(D,w,{spec:0.5,rim:0.3});pushG(D,gl,{spec:3,rim:0.6});pushG(D,dk,{spec:0.5});}
// ---------------- M35 "deuce-and-a-half" cargo truck ----------------
function tyre(D,x,y,z,r,w,ph){const t=new Geo(),h=new Geo();vCylZ(t,[x,y,z],r,w,'#18181a',28);for(let i=0;i<16;i++){const a=i/16*TAU+ph;vBox(t,[x+Math.cos(a)*r,y+Math.sin(a)*r,z],[0.16,0.1,w*1.02],'#1e1e20',0);}
  vCylZ(h,[x,y,z+Math.sign(z)*w*0.52],r*0.55,0.04,'#3a4030',20);vCylZ(h,[x,y,z+Math.sign(z)*w*0.56],r*0.2,0.06,'#2a2e24',12);for(let i=0;i<6;i++){const a=i/6*TAU+ph;ellG(h,x+Math.cos(a)*r*0.38,y+Math.sin(a)*r*0.38,z+Math.sign(z)*w*0.58,0.03,0.03,0.03,'#5a5a50',6);}
  pushG(D,t,{spec:0.15,rim:0.15});pushG(D,h,{spec:0.5});}
function buildM35(D,o={}){const b=new Geo(),cv=new Geo(),gl=new Geo(),dk=new Geo(),lt=new Geo();const ph=o.ph||0;
  vBox(dk,[-0.4,0.82,0],[6.6,0.3,0.95],'#22261c');
  vBox(b,[2.65,1.05,0],[1.25,0.78,1.2],OD);ellG(b,2.65,1.83,0,0.66,0.12,0.6,OD,14);vBox(dk,[3.3,1.35,0],[0.06,0.62,0.95],'#1e2218');for(let i=0;i<7;i++)vBox(b,[3.33,1.35,-0.42+i*0.14],[0.04,0.6,0.05],ODL);
  for(const s of [-1,1]){vBox(b,[2.65,1.18,s*0.86],[1.35,0.1,0.55],OD);vBox(b,[2.65,1.02,s*0.86],[1.35,0.26,0.06],OD);ellG(lt,3.28,1.36,s*0.78,0.06,0.12,0.12,'#e8e0b0',10);}
  vBox(b,[1.45,1.0,0],[1.15,1.15,2.15],OD);vBox(cv,[1.45,2.15,0],[1.25,0.28,2.2],'#5a6044');vBox(gl,[2.05,1.82,0],[0.04,0.55,1.9],GLASS);vBox(dk,[2.07,1.82,0],[0.06,0.6,0.05],'#2a2e24');
  for(const s of [-1,1])vBox(gl,[1.5,1.8,s*1.08],[0.7,0.5,0.03],GLASS);
  vBox(b,[3.5,0.62,0],[0.18,0.2,2.3],'#2a2e24');
  // cargo bed with slatted sides; canvas tilt over bows (or open with bench seats)
  vBox(b,[-1.4,1.18,0],[4.2,0.12,2.3],OD);for(const s of [-1,1]){vBox(b,[-1.4,1.55,s*1.12],[4.2,0.62,0.06],ODL);for(let i=0;i<7;i++)vBox(dk,[-3.4+i*0.66,1.55,s*1.15],[0.06,0.62,0.04],'#2e3426');}
  vBox(b,[-3.5,1.55,0],[0.06,0.62,2.3],ODL);
  if(!o.open){vLoft(cv,[[0.65,1.75,2.95,1.17,0.75],[-3.45,1.75,2.95,1.17,0.75]],'#5e6446',3.0,30);for(let i=0;i<5;i++)vBox(dk,[0.4-i*0.95,2.4,0],[0.05,1.1,2.36],'#4e543a');}
  else for(const s of [-1,1])vBox(dk,[-1.4,1.45,s*0.85],[3.8,0.08,0.35],'#5a4a32');
  vBox(lt,[-3.52,1.05,0.9],[0.04,0.12,0.18],'#c82a1a');vBox(lt,[-3.52,1.05,-0.9],[0.04,0.12,0.18],'#c82a1a');
  pushG(D,b,{spec:0.3,rim:0.3});pushG(D,cv,{spec:0.15,rim:0.25});pushG(D,gl,{spec:2.5,rim:0.5});pushG(D,dk,{spec:0.3});pushG(D,lt,{spec:1,emis:[0.3,0.3,0.2]});
  tyre(D,2.65,0.55,1.05,0.55,0.36,ph);tyre(D,2.65,0.55,-1.05,0.55,0.36,ph);for(const x of [-1.4,-2.75]){tyre(D,x,0.55,1.0,0.55,0.62,ph);tyre(D,x,0.55,-1.0,0.55,0.62,ph);}}
// ---------------- the poplar (~30 m), 3D foliage clusters ----------------
function buildPoplar(D,o={}){const tr=new Geo(),lf=new Geo(),lf2=new Geo();const st=o.state||'full';const bark='#6a5a48';
  const H=st==='stump'?6:30;G.lathe(tr,M4.id(),bark,[[1.15,0],[0.8,0.6],[0.68,2],[0.6,6],[0.55,11],[0.001,st==='stump'?6:11.2]].filter(p=>p[1]<=H+0.01),{seg:24});
  if(st==='stump'){G.cyl(tr,M4.chain(M4.T(0,6,0),M4.S(0.6,0.04,0.6)),'#d8c49a',{seg:24});pushG(D,tr,{spec:0.2,rim:0.25});return;}
  const limbs=[[0,10,0,-5,20,1.5,0.5],[0,10,0,0.5,24,-0.8,0.55],[0,10,0,5.5,19,0.6,0.5],[-5,20,1.5,-8,25,2.4,0.25],[0.5,24,-0.8,-2,29,-1,0.25],[0.5,24,-0.8,3,28.5,0.8,0.25],[5.5,19,0.6,9,23,-1.2,0.25],[0,9,0,-6,14,-3,0.25],[0,8,0,7,13,2.5,0.24]];
  if(st!=='trim')limbs.push([0,3.4,0,-4.8,5.2,0.4,0.3]);
  for(const [x0,y0,z0,x1,y1,z1,r] of limbs){tube(tr,[x0,y0,z0],[x1,y1,z1],r,bark,10);}
  // foliage: many leaf clumps, darker inside, brighter on the outside
  const cl=[];for(const [x0,y0,z0,x1,y1,z1] of limbs){const n=Math.round(Math.hypot(x1-x0,y1-y0)*3);for(let i=0;i<n;i++){const u=0.4+0.6*hash(i*1.3+x1);cl.push([lerp(x0,x1,u),lerp(y0,y1,u),lerp(z0,z1,u),1.8]);}cl.push([x1,y1,z1,2.6]);}
  for(let k=0;k<90;k++){const a=hash(k*4.1)*TAU,e=hash(k*2.3)*Math.PI*0.9-0.2,r=4+hash(k*7.7)*5.5;cl.push([Math.cos(a)*Math.cos(e)*r*1.15,18+Math.sin(e)*r*1.2,Math.sin(a)*Math.cos(e)*r,2.2]);}
  let i=0;for(const [cx,cy,cz,R] of cl){if(st==='trim'&&cy<7)continue;for(let k=0;k<20;k++){const a=hash(i*3.3+k)*TAU,e=(hash(i*5.1+k)-0.5)*Math.PI,rr=R*hash(i*7.7+k*1.9);const x=cx+Math.cos(a)*Math.cos(e)*rr,y=cy+Math.sin(e)*rr*0.8,z=cz+Math.sin(a)*Math.cos(e)*rr;
      const s=0.3+hash(i*9.1+k)*0.45,ci=Math.floor(hash(i*2.9+k*1.7)*5);ellG(ci<3?lf:lf2,x,y,z,s*1.2,s*0.8,s*1.2,['#35501c','#3e5c22','#2c4418','#4c6a28','#587a2e'][ci],8);}i++;}
  pushG(D,tr,{spec:0.2,rim:0.25});D.push({mesh:mesh(lf),M:M4.id(),col:[1.15,1.2,1.05],spec:0.25,rim:0.45,sss:0.5,noInk:true});D.push({mesh:mesh(lf2),M:M4.id(),col:[1.15,1.2,1.05],spec:0.3,rim:0.5,sss:0.5,noInk:true});}
const VB={huey:buildHuey,cobra:buildCobra,b52:buildB52,f4:buildF4,m35:buildM35,poplar:buildPoplar};
// render one view: camera on a sphere around the model (az: from +x toward +z, el: up), key light fixed relative to the camera
function renderV(o){if(!E.gl)glInit();const D=[];VB[o.b](D,o);const ctr=o.c||[0,0,0],rad=o.r||5,fov=18,dist=rad/Math.tan(fov*Math.PI/360)/(W/H)*1.05;
  const ev=[Math.cos(o.el)*Math.cos(o.az),Math.sin(o.el),Math.cos(o.el)*Math.sin(o.az)];const eye=[ctr[0]+ev[0]*dist,ctr[1]+ev[1]*dist,ctr[2]+ev[2]*dist];
  const F=vv.norm(vv.sub(ctr,eye)),R=vv.norm(vv.cross(F,[0,1,0])),U=vv.cross(R,F);const sun=vv.norm(vv.add(vv.add(vv.mul(R,-0.55),vv.mul(U,0.75)),vv.mul(F,-0.45)));
  const KC=o.b==='poplar'?[1,0,1]:[0,1,0];const L=Object.assign({},VLIGHT,{skyTop:KC,skyHor:KC,skyBot:KC,fog:KC,sunDir:[sun[0],Math.max(0.35,sun[1]),sun[2]],sunCol:[1.25,1.15,1.05],sky:[0.5,0.55,0.66],gnd:[0.32,0.3,0.26],post:Object.assign({},VLIGHT.post,{sat:1.08,ink:1})});
  renderScene({cam:{eye,target:ctr,fov,near:0.5,far:dist*3},light:L,draws:D,post:Object.assign({},L.post,{focus:dist,range:1000,maxR:0}),shadow:{c:ctr,size:rad*1.5}},0);return {eye,dist};}
