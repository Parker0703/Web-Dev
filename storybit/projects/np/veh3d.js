'use strict';
// ===== 3D sedan + box truck (s4 engine) — rendered once as ink-outlined sprites for the 2D shots =====
const vv={add:(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub:(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],mul:(a,k)=>[a[0]*k,a[1]*k,a[2]*k],
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm:a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return [a[0]/l,a[1]/l,a[2]/l];},dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};
const VI=M4.id(),VNI=nm3to4(M4.nm(M4.id()));
// smooth grid surface from a 2D array of points P[j][k] (k wraps if loop)
function vGrid(g,P,col,loop=true){const c=C(col),nj=P.length,nk=P[0].length;const at=(j,k)=>P[Math.max(0,Math.min(nj-1,j))][loop?((k%nk)+nk)%nk:Math.max(0,Math.min(nk-1,k))];
  const N=[];for(let j=0;j<nj;j++){N[j]=[];for(let k=0;k<nk;k++){const du=vv.sub(at(j+1,k),at(j-1,k)),dv=vv.sub(at(j,k+1),at(j,k-1));N[j][k]=vv.norm(vv.cross(dv,du));}}
  // orient outward: compare with centroid
  let cen=[0,0,0],n=0;for(const r of P)for(const p of r){cen=vv.add(cen,p);n++;}cen=vv.mul(cen,1/n);
  let fl=0;for(let j=0;j<nj;j++)for(let k=0;k<nk;k++)fl+=vv.dot(N[j][k],vv.sub(P[j][k],cen));const sgn=fl<0?-1:1;
  const kk=loop?nk:nk-1;for(let j=0;j<nj-1;j++)for(let k=0;k<kk;k++){const k1=(k+1)%nk;const v=(jj,k2)=>[P[jj][k2],vv.mul(N[jj][k2],sgn),[jj/(nj-1),k2/nk]];g.quad(VI,VNI,c,v(j,k),v(j,k1),v(j+1,k1),v(j+1,k));}}
// ring of a rounded rectangle (superellipse) in the y-z plane at x
function sRing(x,yc,hh,hw,n=4.5,m=36,topSq=1){const r=[];for(let i=0;i<m;i++){const a=i/m*TAU,ca=Math.cos(a),sa=Math.sin(a);const z=hw*Math.sign(ca)*Math.pow(Math.abs(ca),2/n);let y=hh*Math.sign(sa)*Math.pow(Math.abs(sa),2/n);
  const zz=sa>0?z*(1-(1-topSq)*(sa)):z;r.push([x,yc+y,zz]);}return r;}
// loft: secs = [[x, yBottom, yTop, halfWidth, topSquash]]; caps both ends
function vLoft(g,secs,col,n=4.5,m=40){const P=secs.map(([x,yb,yt,hw,tq])=>sRing(x,(yb+yt)/2,(yt-yb)/2,hw,n,m,tq??1));vGrid(g,P,col,true);
  for(const [j,dir] of [[0,1],[P.length-1,-1]]){const r=P[j];const cen=vv.mul(r.reduce((a,p)=>vv.add(a,p),[0,0,0]),1/r.length);const nn=[secs[j][0]>secs[secs.length-1-j][0]?1:-1,0,0];const c=C(col);
    for(let k=0;k<r.length;k++)g.tri(VI,VNI,c,[cen,nn,[0,0]],[r[k],nn,[0,0]],[r[(k+1)%r.length],nn,[0,0]]);}}
function vBox(g,c0,size,col,rot=0){const M=M4.chain(M4.T(c0[0],c0[1],c0[2]),M4.RY(rot),M4.S(size[0],size[1],size[2]));G.box(g,M,col,{});}
function vCylZ(g,c0,r,w,col,seg=28){const M=M4.chain(M4.T(c0[0],c0[1],c0[2]),M4.RX(Math.PI/2),M4.S(r,w,r),M4.T(0,-0.5,0));G.cyl(g,M,col,{seg});}
function vCylX(g,c0,r,w,col,seg=28){const M=M4.chain(M4.T(c0[0],c0[1],c0[2]),M4.RZ(-Math.PI/2),M4.S(r,w,r),M4.T(0,-0.5,0));G.cyl(g,M,col,{seg});}
function vBeam(g,a,b,w,col){const d=vv.sub(b,a),L=Math.hypot(...d);const M=M4.chain(M4.T(a[0],a[1],a[2]),M4.lookY?M4.lookY(d):M4.id());// fallback below
  const ax=vv.norm(d);let up=Math.abs(ax[1])<0.9?[0,1,0]:[1,0,0];const s=vv.norm(vv.cross(ax,up)),u=vv.cross(s,ax);
  const P=[[0,0],[1,0],[1,1],[0,1]].map(([i,j])=>vv.add(vv.add(a,vv.mul(s,(i-0.5)*w)),vv.mul(u,(j-0.5)*w)));const Q=P.map(p=>vv.add(p,d));const c=C(col);
  for(let i=0;i<4;i++){const i1=(i+1)%4;const nrm=vv.norm(vv.add(vv.mul(s,[ -0.5,0.5,0.5,-0.5][i]+[ -0.5,0.5,0.5,-0.5][i1]),vv.mul(u,[-0.5,-0.5,0.5,0.5][i]+[-0.5,-0.5,0.5,0.5][i1])));g.quad(VI,VNI,c,[P[i],nrm,[0,0]],[P[i1],nrm,[0,0]],[Q[i1],nrm,[0,0]],[Q[i],nrm,[0,0]]);}}
function wheel(D,x,y,z,r,w,side,o={}){const t=new Geo(),rim=new Geo();vCylZ(t,[x,y,z],r,w,'#141418',32);vCylZ(t,[x,y,z+side*w*0.5],r*0.86,0.02,'#1e1e24',32);
  vCylZ(rim,[x,y,z+side*w*0.51],r*0.62,0.03,o.rim||'#c8ccd4',28);vCylZ(rim,[x,y,z+side*w*0.53],r*0.2,0.03,'#8a8e98',16);
  for(let i=0;i<5;i++){const a=i/5*TAU+(o.rot||0);vBeam(rim,[x,y,z+side*w*0.54],[x+Math.cos(a)*r*0.58,y+Math.sin(a)*r*0.58,z+side*w*0.54],r*0.12,'#a8acb6');}
  D.push({mesh:mesh(t),M:M4.id(),col:[1,1,1],spec:0.2,rim:0.1});D.push({mesh:mesh(rim),M:M4.id(),col:[1,1,1],spec:1.0,rim:0.25});}
// ---------------- sedan (nose +x), metres ----------------
function buildSedan(D,o={}){const body=new Geo(),glass=new Geo(),dark=new Geo(),chrome=new Geo(),lights=new Geo(),tail=new Geo();const COL=o.col||'#21466e',GL=o.glass||'#1c2a3a';
  vLoft(body,[[2.38,0.36,0.62,0.66,0.9],[2.33,0.27,0.74,0.84,0.9],[2.15,0.24,0.84,0.89,0.92],[1.6,0.24,0.9,0.91,0.95],[0.9,0.24,0.97,0.915,0.95],[0,0.24,0.99,0.915,0.95],[-1.3,0.24,1.0,0.915,0.95],[-1.9,0.25,0.99,0.905,0.95],[-2.2,0.28,0.95,0.87,0.92],[-2.34,0.34,0.86,0.8,0.9],[-2.39,0.42,0.74,0.66,0.9]],COL,5,48);
  // greenhouse: glass loft, then roof skin + pillars in body colour
  vLoft(glass,[[0.98,0.95,0.99,0.83,0.7],[0.62,0.95,1.27,0.8,0.62],[0.3,0.95,1.45,0.74,0.62],[-0.4,0.95,1.48,0.73,0.62],[-1.0,0.95,1.45,0.74,0.62],[-1.45,0.95,1.3,0.78,0.65],[-1.86,0.95,0.99,0.82,0.7]],GL,3.2,40);
  vLoft(body,[[0.36,1.40,1.465,0.7,0.6],[-0.4,1.43,1.495,0.7,0.6],[-1.02,1.40,1.465,0.7,0.6]],COL,3.2,32);
  for(const s of [-1,1]){vBeam(body,[0.98,0.97,s*0.82],[0.36,1.45,s*0.69],0.075,COL);vBeam(body,[-1.86,0.99,s*0.81],[-1.02,1.45,s*0.69],0.12,COL);vBeam(body,[-0.38,0.97,s*0.845],[-0.38,1.48,s*0.705],0.085,COL);
    vBeam(body,[0.98,0.975,s*0.84],[-1.86,0.995,s*0.83],0.05,COL);
    // door shut lines, handles, side skirt, mirror
    for(const x of [0.92,-0.38,-1.62])vBeam(dark,[x,0.3,s*0.922],[x+0.02,0.96,s*0.922],0.014,'#0c0e14');
    for(const x of [0.28,-0.92])vBox(chrome,[x,0.86,s*0.925],[0.2,0.035,0.02],'#d8dce4');
    vBeam(dark,[1.6,0.3,s*0.92],[-1.75,0.3,s*0.92],0.06,'#16181e');
    vBox(body,[0.88,1.02,s*0.99],[0.16,0.1,0.14],COL);vBox(glass,[0.86,1.02,s*1.065],[0.1,0.07,0.012],'#9ab4cc');vBeam(body,[0.92,0.98,s*0.9],[0.9,1.0,s*0.95],0.04,COL);
    // headlights / tail lights / fog lights
    vBox(lights,[2.27,0.75,s*0.6],[0.16,0.1,0.42],'#fffbe8');vBox(chrome,[2.24,0.75,s*0.6],[0.17,0.13,0.46],'#20242c');
    vBox(tail,[-2.32,0.84,s*0.62],[0.08,0.12,0.42],'#c81a20');vBox(lights,[2.34,0.38,s*0.62],[0.04,0.05,0.12],'#ffe9b0');}
  // grille + badge + bumpers + plates
  vBox(dark,[2.36,0.6,0],[0.05,0.2,0.78],'#101218');for(let k=0;k<3;k++)vBox(chrome,[2.385,0.54+k*0.06,0],[0.02,0.015,0.76],'#c0c6d0');vBox(chrome,[2.39,0.66,0],[0.02,0.06,0.1],'#e0e4ea');
  vBox(dark,[2.35,0.34,0],[0.08,0.1,1.2],'#0e1014');vBox(dark,[-2.37,0.36,0],[0.06,0.1,1.3],'#0e1014');
  vBox(chrome,[2.4,0.47,0],[0.02,0.11,0.42],'#f2f2ea');vBox(chrome,[-2.405,0.56,0],[0.02,0.11,0.42],'#f2f2ea');
  D.push({mesh:mesh(body),M:M4.id(),col:[1,1,1],spec:1.0,rim:0.3});D.push({mesh:mesh(glass),M:M4.id(),col:[1,1,1],spec:1.4,rim:0.35});
  D.push({mesh:mesh(dark),M:M4.id(),col:[1,1,1],spec:0.3});D.push({mesh:mesh(chrome),M:M4.id(),col:[1,1,1],spec:1.4,rim:0.3});
  D.push({mesh:mesh(lights),M:M4.id(),col:[1,1,1],emis:o.lights?[1.1,1.05,0.9]:[0.25,0.25,0.22],noShadow:true});D.push({mesh:mesh(tail),M:M4.id(),col:[1,1,1],emis:o.brake?[1.4,0.2,0.2]:[0.45,0.05,0.05]});
  for(const x of [1.4,-1.38])for(const s of [-1,1]){vCylZ(dark,[x,0.36,s*0.905],0.41,0.04,'#0a0b0e',32);wheel(D,x,0.33,s*0.8,0.33,0.24,s,{rot:o.wrot||0});}}
// ---------------- box truck (nose +x) ----------------
function buildTruck(D,o={}){const cab=new Geo(),box=new Geo(),dark=new Geo(),chrome=new Geo(),glass=new Geo(),lights=new Geo();const RED=o.col||'#b82a2a';
  // chassis + bumper
  vBox(dark,[-0.4,0.62,0],[8.4,0.25,1.1],'#141418');vBox(chrome,[4.12,0.6,0],[0.22,0.32,2.3],'#c4c8d0');
  // hood + cab (conventional)
  vLoft(cab,[[4.08,0.75,1.55,1.0,0.85],[3.95,0.72,1.72,1.06,0.9],[3.0,0.72,1.78,1.08,0.9],[2.62,0.72,1.82,1.1,0.9]],RED,5,40);
  vLoft(cab,[[2.64,0.72,2.95,1.18,0.9],[2.3,0.72,3.05,1.2,0.92],[1.15,0.72,3.08,1.2,0.92],[1.05,0.72,3.0,1.17,0.9]],RED,6,44);
  // windshield + side windows
  vBox(glass,[2.66,2.38,0],[0.06,0.8,2.04],'#1e2c3c');for(const s of [-1,1])vBox(glass,[1.95,2.4,s*1.205],[0.95,0.72,0.03],'#1e2c3c');
  for(const s of [-1,1]){vBeam(cab,[2.68,1.95,s*1.05],[2.66,2.85,s*1.05],0.1,RED);vBox(cab,[1.43,2.4,s*1.21],[0.06,0.75,0.04],RED);
    vBox(dark,[1.62,1.3,s*1.21],[0.03,0.9,0.03],'#0c0e14');vBox(chrome,[1.95,1.62,s*1.23],[0.22,0.05,0.02],'#d8dce4');
    // mirrors on arms
    vBeam(chrome,[2.6,2.5,s*1.2],[2.75,2.4,s*1.55],0.05,'#c8ccd4');vBox(dark,[2.72,2.25,s*1.58],[0.08,0.55,0.25],'#1a1c22');
    // steps + fuel tank
    vBox(chrome,[1.85,0.62,s*1.15],[0.6,0.06,0.25],'#b8bcc6');vCylX(chrome,[0.4,0.75,s*0.95],0.32,1.1,'#c8ccd4');
    // headlights + amber markers
    vBox(lights,[4.05,1.25,s*0.82],[0.06,0.24,0.32],'#fffbe8');vBox(lights,[4.02,1.55,s*1.0],[0.05,0.08,0.12],'#ffb040');}
  // big chrome grille
  vBox(chrome,[4.1,1.2,0],[0.04,0.62,1.1],'#c8ccd4');for(let k=0;k<7;k++)vBox(dark,[4.12,0.95+k*0.08,0],[0.02,0.035,1.0],'#20242c');
  // exhaust stack
  // cargo box with a stripe + rear doors
  vBox(box,[-2.2,2.25,0],[6.4,3.1,2.46],'#eef0f2');vBox(box,[-2.2,0.66,0],[6.4,0.12,2.48],'#c8ccd4');
  for(const s of [-1,1]){vBox(chrome,[-2.2,1.25,s*1.235],[6.2,0.18,0.02],'#2a5aa8');vBox(dark,[-2.2,3.79,s*1.235],[6.4,0.03,0.02],'#9aa0aa');for(let k=0;k<8;k++)vBox(dark,[-5.2+k*0.85,2.25,s*1.235],[0.02,3.0,0.01],'#c8ccd2');}
  vBox(lights,[-5.42,1.0,0.9],[0.04,0.2,0.2],'#c81a20');vBox(lights,[-5.42,1.0,-0.9],[0.04,0.2,0.2],'#c81a20');
  D.push({mesh:mesh(cab),M:M4.id(),col:[1,1,1],spec:1.0,rim:0.3});D.push({mesh:mesh(box),M:M4.id(),col:[1,1,1],spec:0.5,rim:0.2});D.push({mesh:mesh(dark),M:M4.id(),col:[1,1,1],spec:0.3});
  D.push({mesh:mesh(chrome),M:M4.id(),col:[1,1,1],spec:1.5,rim:0.3});D.push({mesh:mesh(glass),M:M4.id(),col:[1,1,1],spec:1.4,rim:0.35});D.push({mesh:mesh(lights),M:M4.id(),col:[1,1,1],emis:o.lights?[1.1,1.05,0.9]:[0.3,0.3,0.25],noShadow:true});
  for(const x of [3.0,-3.0,-4.1])for(const s of [-1,1]){vCylZ(dark,[x,0.56,s*1.12],0.62,0.04,'#0a0b0e',32);}
  for(const x of [3.0,-3.0,-4.1])for(const s of [-1,1])wheel(D,x,0.52,s*1.0,0.52,0.36,s,{rim:'#d0d4dc',rot:o.wrot||0});}
// ---------------- sprite views ----------------
const KEYC=[0,1,0];
const VLIGHT={sunDir:[0.35,0.75,0.55],sunCol:[1.15,1.05,1.0],sky:[0.42,0.46,0.6],gnd:[0.2,0.2,0.24],fog:[0,1,0],fogD:0.0,fogH:0,skyTop:KEYC,skyHor:KEYC,skyBot:KEYC,cloud:0,stars:0,sunSize:1e9,sunGlow:[0,0,0],
  post:{bloom:0,thr:9,sat:1.08,expo:1.0,lift:[0,0,0],gain:[1,1,1],vig:0,ink:1}};
const VIEWS={
  car_side:{b:'car',eye:[0,1.3,22],target:[0,0.78,0],fov:25},
  car_side_l:{b:'car',eye:[0,1.3,22],target:[0,0.78,0],fov:25,flip:1},
  car_front:{b:'car',eye:[16,1.9,0],target:[0,0.8,0],fov:17,glass:'#00ff00'},
  car_3q:{b:'car',eye:[11,2.6,9],target:[0,0.7,0],fov:16},
  truck_side_l:{b:'truck',eye:[0,2.4,40],target:[0.6,1.9,0],fov:28,flip:1},
  truck_front:{b:'truck',eye:[24,1.7,2.5],target:[0,1.8,0],fov:18},
};
function renderVeh(id,o={}){if(!E.gl)glInit();const V=VIEWS[id];const D=[];
  if(V.b==='car')buildSedan(D,{lights:1,glass:V.glass,...o});else buildTruck(D,{lights:1,...o});
  if(V.flip)for(const d of D)d.M=M4.chain(M4.RY(Math.PI),d.M);
  // ground disc for contact shadow (keyed green, receives shadow)
  const gd=new Geo();G.box(gd,M4.chain(M4.T(0,-0.05,0),M4.S(40,0.1,40)),'#00ff00',{});D.push({mesh:mesh(gd),M:M4.id(),col:[1,1,1],noInk:true,spec:0});
  const cam={eye:V.eye,target:V.target,fov:V.fov,near:1,far:200};const R={cam,light:VLIGHT,draws:D,post:Object.assign({},VLIGHT.post,{focus:V4len(V.eye,V.target),range:100,maxR:0}),shadow:{c:[0,0,0],size:14}};
  renderScene(R,0);return true;}
function V4len(a,b){return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);}
// ---------------- 3D floppy disk (the save icon) — 9 × 9.4 × 0.33 cm, scaled ×10 ----------------
function buildFloppy(D,o={}){const body=new Geo(),metal=new Geo(),label=new Geo(),dark=new Geo();const BL='#1648a0';
  // body with a chamfered top-right corner: main block + corner prism
  vBox(body,[-0.3,0,0],[8.4,9.4,0.33],BL);vBox(body,[4.2,-0.3,0],[0.6,8.8,0.33],BL);
  const c=C(BL),z0=-0.165,z1=0.165,nn=[0.7,0.7,0];const P=[[3.9,4.7],[4.5,4.1]];
  for(const [z,n] of [[z1,[0,0,1]],[z0,[0,0,-1]]])body.tri(VI,VNI,c,[[3.9,4.7,z],n,[0,0]],[[4.5,4.1,z],n,[0,0]],[[3.9,4.1,z],n,[0,0]]);
  body.quad(VI,VNI,c,[[3.9,4.7,z1],nn,[0,0]],[[4.5,4.1,z1],nn,[0,0]],[[4.5,4.1,z0],nn,[0,0]],[[3.9,4.7,z0],nn,[0,0]]);
  // metal shutter + slot + hub hole
  vBox(metal,[-0.4,3.0,0],[5.2,3.4,0.37],'#c8ced8');vBox(dark,[0.6,3.1,0],[1.1,2.4,0.39],'#141820');vBox(metal,[-0.4,1.3,0],[5.2,0.08,0.38],'#9aa2ae');
  // label
  vBox(label,[-0.1,-2.2,0],[6.8,4.6,0.36],'#f4f6f8');vBox(dark,[-0.1,-0.25,0],[6.8,0.35,0.37],'#3ac0ff');
  for(let k=0;k<4;k++)vBox(dark,[-0.1-(k%2)*0.6,-1.2-k*0.85,0],[5.6-(k%2)*1.2,0.12,0.37],'#7a8494');
  // write-protect notch
  vBox(dark,[-3.85,-4.1,0],[0.5,0.55,0.35],'#0e1420');
  D.push({mesh:mesh(body),M:M4.id(),col:[1,1,1],spec:1.3,rim:0.4});D.push({mesh:mesh(metal),M:M4.id(),col:[1,1,1],spec:1.8,rim:0.4});
  D.push({mesh:mesh(label),M:M4.id(),col:[1,1,1],spec:0.4,rim:0.2});D.push({mesh:mesh(dark),M:M4.id(),col:[1,1,1],spec:0.6});}
VIEWS.floppy={b:'floppy',eye:[0,0,70],target:[0,0,0],fov:17};
const _rv=renderVeh;
renderVeh=function(id,o={}){const V=VIEWS[id];if(V.b!=='floppy')return _rv(id,o);if(!E.gl)glInit();const D=[];buildFloppy(D);
  const R0=M4.chain(M4.RY(o.yaw||0),M4.RX(o.pitch??-0.18),M4.RZ(o.roll??0.06));for(const d of D)d.M=M4.chain(R0,d.M);
  const cam={eye:V.eye,target:V.target,fov:V.fov,near:1,far:200};const L=Object.assign({},VLIGHT,{sunDir:[-0.6,0.75,0.45],sunCol:[0.85,0.82,0.8],sky:[0.32,0.36,0.48],post:Object.assign({},VLIGHT.post,{sat:1.25})});
  const R={cam,light:L,draws:D,post:Object.assign({},L.post,{focus:36,range:100,maxR:0}),shadow:{c:[0,0,0],size:14}};renderScene(R,0);return true;};
