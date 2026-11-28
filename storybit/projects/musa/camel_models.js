'use strict';
// ===================== dromedary camel (nose +x, real size ≈ 2.1 m at the hump), pacing gait by o.ph, optional gold load =====================
function limbChain(g,pts,rs,col){for(let i=0;i<pts.length-1;i++){tube(g,pts[i],pts[i+1],(rs[i]+rs[i+1])/2,col,12);}pts.forEach((p,i)=>ellG(g,p[0],p[1],p[2],rs[i],rs[i],rs[i],col,10));}
function buildCamel(D,o={}){const b=new Geo(),dk=new Geo(),ld=new Geo(),gd=new Geo();const ph=o.ph||0;const CA='#c99c64',CD='#a87c48',CL='#d8b07a';
  // body: barrel, chest, haunch, single hump, belly
  ellG(b,0,1.55,0,1.12,0.46,0.44,CA,22);ellG(b,0.72,1.47,0,0.52,0.52,0.42,CA,18);ellG(b,-0.78,1.52,0,0.5,0.46,0.4,CA,18);ellG(b,-0.05,1.98,0,0.66,0.46,0.38,CL,18);ellG(b,0.05,1.22,0,0.8,0.2,0.32,CD,14);
  // neck: down-forward then up, head with long muzzle
  const nk=[[0.95,1.75,0],[1.35,1.55,0],[1.7,1.55,0],[1.95,1.9,0],[2.05,2.18,0]];limbChain(b,nk,[0.26,0.22,0.18,0.15,0.14],CA);
  ellG(b,2.18,2.24,0,0.26,0.15,0.13,CA,14);ellG(b,2.42,2.16,0,0.16,0.11,0.1,CL,12);ellG(dk,2.53,2.13,0,0.05,0.05,0.07,'#3a2a1a',8);
  for(const s of [-1,1]){ellG(dk,2.22,2.3,s*0.11,0.035,0.035,0.035,'#1a120c',8);ellG(b,2.06,2.38,s*0.09,0.05,0.08,0.03,CD,8);}
  // tail
  tube(b,[-1.25,1.62,0],[-1.32,1.1,0],0.04,CD,8);ellG(dk,-1.33,1.02,0,0.05,0.12,0.05,'#5a4026',8);
  // legs: pacing gait (same-side legs together), knobbly knees, wide pads
  for(const [lx,lz,side,fr] of [[0.72,0.24,0,1],[0.72,-0.24,0.5,1],[-0.78,0.24,0,0],[-0.78,-0.24,0.5,0]]){const a=Math.sin((ph+side)*TAU)*0.32,lift=Math.max(0,Math.cos((ph+side)*TAU))*0.16;
    const hip=[lx,1.32,lz],kn=[lx+Math.sin(a)*0.55+(fr?0:-0.06),0.78+lift*0.6,lz],ft=[lx+Math.sin(a)*1.1-(fr?0:0.04)-lift*0.35,0.08+lift,lz];
    limbChain(b,[hip,kn,ft],[fr?0.16:0.19,0.085,0.065],CA);ellG(dk,kn[0]+0.04*(fr?1:-1),kn[1],kn[2],0.1,0.09,0.09,CD,10);ellG(dk,ft[0]+0.04,ft[1]-0.03,ft[2],0.15,0.06,0.12,'#7a5a3a',10);}
  if(o.load!=='none'){// saddle frame over the hump, rich blanket, gold-filled leather sacks + a small chest of bars
    vBox(ld,[0,2.12,0],[1.3,0.06,1.04],'#7a1e22');vBox(ld,[0,2.08,0],[1.34,0.02,1.08],'#d8a830');for(const s of [-1,1]){vBox(ld,[0,1.78,s*0.53],[1.2,0.6,0.03],'#7a1e22');vBox(ld,[0,1.5,s*0.545],[1.22,0.06,0.03],'#d8a830');}
    for(const s of [-1,1])for(const x of [-0.36,0.36]){ellG(ld,x,1.62,s*0.72,0.26,0.34,0.2,'#6a4426',14);ellG(gd,x,1.95,s*0.7,0.2,0.07,0.15,'#f0c040',12);for(let k=0;k<5;k++)ellG(gd,x+(hash(k+x*9)-0.5)*0.25,1.99+hash(k*3)*0.03,s*(0.66+hash(k*7)*0.08),0.06,0.015,0.06,'#ffd860',8);}
    vBox(ld,[0,2.2,0],[0.6,0.3,0.44],'#5a3420');vBox(gd,[0,2.36,0],[0.5,0.04,0.36],'#f0c040');for(let k=0;k<6;k++)vBox(gd,[-0.18+(k%3)*0.18,2.42,(k<3?-0.08:0.08)],[0.15,0.06,0.1],'#ffd050');
    for(const x of [1.0,-1.05])for(const s of [-1,1])tube(ld,[x*0.55,2.05,s*0.5],[x,1.55,s*0.45],0.015,'#d8a830',6);}
  pushG(D,b,{spec:0.25,rim:0.4});pushG(D,dk,{spec:0.2,rim:0.2});pushG(D,ld,{spec:0.3,rim:0.3});D.push({mesh:mesh(gd),M:M4.id(),col:[1.25,1.15,0.9],spec:2.2,rim:0.6,emis:[0.12,0.09,0.02]});}
VB.camel=buildCamel;
