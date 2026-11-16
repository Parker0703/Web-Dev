'use strict';
// ===================== STYLE 4 · tiny WebGL2 engine =====================
const W=1080,H=1920,TAU=Math.PI*2;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,eio=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,eo=t=>1-Math.pow(1-t,3);
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);};
const hex=(h)=>{h=h.replace('#','');return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];};
const C=(c)=>typeof c==='string'?hex(c):c;
// ---------- vec / mat ----------
const V={add:(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub:(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],sc:(a,s)=>[a[0]*s,a[1]*s,a[2]*s],dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],len:a=>Math.hypot(a[0],a[1],a[2]),norm:a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return [a[0]/l,a[1]/l,a[2]/l];},lerp:(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]};
const M4={
  id(){const m=new Float32Array(16);m[0]=m[5]=m[10]=m[15]=1;return m;},
  mul(a,b){const o=new Float32Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];o[i*4+j]=s;}return o;},
  persp(fov,asp,n,f){const t=1/Math.tan(fov/2),m=new Float32Array(16);m[0]=t/asp;m[5]=t;m[10]=(f+n)/(n-f);m[11]=-1;m[14]=2*f*n/(n-f);return m;},
  ortho(l,r,b,t,n,f){const m=M4.id();m[0]=2/(r-l);m[5]=2/(t-b);m[10]=-2/(f-n);m[12]=-(r+l)/(r-l);m[13]=-(t+b)/(t-b);m[14]=-(f+n)/(f-n);return m;},
  look(e,c,u){const z=V.norm(V.sub(e,c)),x=V.norm(V.cross(u,z)),y=V.cross(z,x);const m=M4.id();m[0]=x[0];m[4]=x[1];m[8]=x[2];m[1]=y[0];m[5]=y[1];m[9]=y[2];m[2]=z[0];m[6]=z[1];m[10]=z[2];m[12]=-V.dot(x,e);m[13]=-V.dot(y,e);m[14]=-V.dot(z,e);return m;},
  T(x,y,z){const m=M4.id();m[12]=x;m[13]=y;m[14]=z;return m;},
  S(x,y,z){const m=M4.id();m[0]=x;m[5]=y===undefined?x:y;m[10]=z===undefined?x:z;return m;},
  RX(a){const m=M4.id(),c=Math.cos(a),s=Math.sin(a);m[5]=c;m[6]=s;m[9]=-s;m[10]=c;return m;},
  RY(a){const m=M4.id(),c=Math.cos(a),s=Math.sin(a);m[0]=c;m[2]=-s;m[8]=s;m[10]=c;return m;},
  RZ(a){const m=M4.id(),c=Math.cos(a),s=Math.sin(a);m[0]=c;m[1]=s;m[4]=-s;m[5]=c;return m;},
  chain(...ms){return ms.reduce((a,b)=>M4.mul(a,b));},
  trs(p,r=[0,0,0],s=[1,1,1]){return M4.chain(M4.T(p[0],p[1],p[2]),M4.RY(r[1]),M4.RX(r[0]),M4.RZ(r[2]),M4.S(s[0],s[1],s[2]));},
  inv(m){const o=new Float32Array(16),[a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,a30,a31,a32,a33]=m;
    const b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32;
    let d=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;if(!d)return M4.id();d=1/d;
    o[0]=(a11*b11-a12*b10+a13*b09)*d;o[1]=(a02*b10-a01*b11-a03*b09)*d;o[2]=(a31*b05-a32*b04+a33*b03)*d;o[3]=(a22*b04-a21*b05-a23*b03)*d;o[4]=(a12*b08-a10*b11-a13*b07)*d;o[5]=(a00*b11-a02*b08+a03*b07)*d;o[6]=(a32*b02-a30*b05-a33*b01)*d;o[7]=(a20*b05-a22*b02+a23*b01)*d;
    o[8]=(a10*b10-a11*b08+a13*b06)*d;o[9]=(a01*b08-a00*b10-a03*b06)*d;o[10]=(a30*b04-a31*b02+a33*b00)*d;o[11]=(a21*b02-a20*b04-a23*b00)*d;o[12]=(a11*b07-a10*b09-a12*b06)*d;o[13]=(a00*b09-a01*b07+a02*b06)*d;o[14]=(a31*b01-a30*b03-a32*b00)*d;o[15]=(a20*b03-a21*b01+a22*b00)*d;return o;},
  nm(m){const i=M4.inv(m);return new Float32Array([i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]]);},
  xp(m,p){const x=p[0],y=p[1],z=p[2],w=m[3]*x+m[7]*y+m[11]*z+m[15];return [(m[0]*x+m[4]*y+m[8]*z+m[12])/w,(m[1]*x+m[5]*y+m[9]*z+m[13])/w,(m[2]*x+m[6]*y+m[10]*z+m[14])/w];},
  xv(m,v){return [m[0]*v[0]+m[4]*v[1]+m[8]*v[2],m[1]*v[0]+m[5]*v[1]+m[9]*v[2],m[2]*v[0]+m[6]*v[1]+m[10]*v[2]];},
  // matrix mapping unit Y segment [0,1] (radius 1) onto p0->p1 with radius r
  seg(p0,p1,r){const d=V.sub(p1,p0),L=V.len(d)||1e-5,y=V.sc(d,1/L);let ax=V.cross([0,1,0],y);const s=V.len(ax),c=y[1];let R=M4.id();
    if(s>1e-5){ax=V.sc(ax,1/s);const a=Math.atan2(s,c),cs=Math.cos(a),sn=Math.sin(a),t=1-cs,[x,yy,z]=ax;R=new Float32Array([t*x*x+cs,t*x*yy+sn*z,t*x*z-sn*yy,0,t*x*yy-sn*z,t*yy*yy+cs,t*yy*z+sn*x,0,t*x*z+sn*yy,t*yy*z-sn*x,t*z*z+cs,0,0,0,0,1]);}else if(c<0)R=M4.RX(Math.PI);
    return M4.chain(M4.T(p0[0],p0[1],p0[2]),R,M4.S(r,L,r));}
};
// ---------- geometry builder (vertex colours, merges many parts into one mesh) ----------
class Geo{constructor(){this.d=[];}
  v(p,n,uv,c){this.d.push(p[0],p[1],p[2],n[0],n[1],n[2],uv[0],uv[1],c[0],c[1],c[2]);}
  tri(M,N,c,a,b,d){const P=[a,b,d].map(q=>M4.xp(M,q[0])),Nn=[a,b,d].map(q=>V.norm(M4.xv(N,q[1])));const cr=V.cross(V.sub(P[1],P[0]),V.sub(P[2],P[0]));const ns=V.add(V.add(Nn[0],Nn[1]),Nn[2]);const ord=V.dot(cr,ns)<0?[0,2,1]:[0,1,2];for(const k of ord)this.v(P[k],Nn[k],[a,b,d][k][2]||[0,0],c);}
  quad(M,N,c,a,b,d,e){this.tri(M,N,c,a,b,d);this.tri(M,N,c,a,d,e);}}
function nm3to4(nm){return new Float32Array([nm[0],nm[1],nm[2],0,nm[3],nm[4],nm[5],0,nm[6],nm[7],nm[8],0,0,0,0,1]);}
const G={
  box(g,M,col,o={}){const c=C(col),N=nm3to4(M4.nm(M)),x=0.5,y=o.base?1:0.5,y0=o.base?0:-0.5,z=0.5;const P=[[-x,y0,z],[x,y0,z],[x,y,z],[-x,y,z],[-x,y0,-z],[x,y0,-z],[x,y,-z],[-x,y,-z]];
    const F=[[0,1,2,3,[0,0,1]],[5,4,7,6,[0,0,-1]],[1,5,6,2,[1,0,0]],[4,0,3,7,[-1,0,0]],[3,2,6,7,[0,1,0]],[4,5,1,0,[0,-1,0]]];
    const su=o.uvs?o.uvs[0]:1,sv=o.uvs?o.uvs[1]:1;for(const [a,b,cc,d,n] of F){const sh=o.shade?1-(n[1]<0?0.1:0):1;g.quad(M,N,c.map(v=>v*sh),[P[a],n,[0,sv]],[P[b],n,[su,sv]],[P[cc],n,[su,0]],[P[d],n,[0,0]]);}},
  cyl(g,M,col,o={}){const c=C(col),N=nm3to4(M4.nm(M)),s=o.seg||16,rt=o.rt??1,rb=o.rb??1,h=1;const sl=Math.atan2(rb-rt,h);
    for(let i=0;i<s;i++){const a0=i/s*TAU,a1=(i+1)/s*TAU;const p=(a,r,y)=>[Math.sin(a)*r,y,-Math.cos(a)*r];const n=a=>o.flat?[Math.sin((a0+a1)/2)*Math.cos(sl),Math.sin(sl),-Math.cos((a0+a1)/2)*Math.cos(sl)]:[Math.sin(a)*Math.cos(sl),Math.sin(sl),-Math.cos(a)*Math.cos(sl)];
      g.quad(M,N,c,[p(a0,rb,0),n(a0),[i/s,1]],[p(a1,rb,0),n(a1),[(i+1)/s,1]],[p(a1,rt,h),n(a1),[(i+1)/s,0]],[p(a0,rt,h),n(a0),[i/s,0]]);
      if(o.caps!==0){if(rt>0)g.tri(M,N,c.map(v=>v*1.04),[[0,h,0],[0,1,0]],[p(a1,rt,h),[0,1,0]],[p(a0,rt,h),[0,1,0]]);g.tri(M,N,c,[[0,0,0],[0,-1,0]],[p(a0,rb,0),[0,-1,0]],[p(a1,rb,0),[0,-1,0]]);}}},
  sphere(g,M,col,o={}){const c=C(col),N=nm3to4(M4.nm(M)),su=o.su||24,sv=o.sv||16;const P=(i,j)=>{const th=i/su*TAU,ph=j/sv*Math.PI;return [Math.sin(th)*Math.sin(ph),Math.cos(ph),-Math.cos(th)*Math.sin(ph)];};
    for(let i=0;i<su;i++)for(let j=0;j<sv;j++){const a=P(i,j),b=P(i+1,j),d=P(i+1,j+1),e=P(i,j+1);g.quad(M,N,c,[e,e,[i/su,(j+1)/sv]],[d,d,[(i+1)/su,(j+1)/sv]],[b,b,[(i+1)/su,j/sv]],[a,a,[i/su,j/sv]]);}},
  lathe(g,M,col,prof,o={}){const c=C(col),N=nm3to4(M4.nm(M)),s=o.seg||24,n=prof.length;const nr=[];for(let i=0;i<n;i++){const a=prof[Math.max(0,i-1)],b=prof[Math.min(n-1,i+1)];const dr=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dr,dy)||1;nr.push([dy/l,-dr/l]);}
    for(let k=0;k<s;k++){const a0=k/s*TAU,a1=(k+1)/s*TAU;for(let i=0;i<n-1;i++){const P=(a,j)=>[Math.sin(a)*prof[j][0],prof[j][1],-Math.cos(a)*prof[j][0]],Nn=(a,j)=>[Math.sin(a)*nr[j][0],nr[j][1],-Math.cos(a)*nr[j][0]];const v0=1-i/(n-1),v1=1-(i+1)/(n-1);
      g.quad(M,N,c,[P(a0,i),Nn(a0,i),[k/s,v0]],[P(a1,i),Nn(a1,i),[(k+1)/s,v0]],[P(a1,i+1),Nn(a1,i+1),[(k+1)/s,v1]],[P(a0,i+1),Nn(a0,i+1),[k/s,v1]]);}}},
  plane(g,M,col,o={}){const c=C(col),N=nm3to4(M4.nm(M)),u=o.uv||1;g.quad(M,N,c,[[-0.5,0,0.5],[0,1,0],[0,u]],[[0.5,0,0.5],[0,1,0],[u,u]],[[0.5,0,-0.5],[0,1,0],[u,0]],[[-0.5,0,-0.5],[0,1,0],[0,0]]);},
  // low-poly jittered blob (rocks, bushes, moss): flat shaded
  blob(g,M,col,o={}){const c=C(col),N=nm3to4(M4.nm(M)),su=o.su||8,sv=o.sv||5,j=o.j??0.18,sd=o.seed||1;const P=(i,k)=>{const th=(i%su)/su*TAU,ph=k/sv*Math.PI;const r=(k===0||k===sv)?1:1+(hash(sd*31+(i%su)*7+k*13)-0.5)*2*j;return [Math.sin(th)*Math.sin(ph)*r,Math.cos(ph)*r,-Math.cos(th)*Math.sin(ph)*r];};
    for(let i=0;i<su;i++)for(let k=0;k<sv;k++){const a=P(i,k),b=P(i+1,k),d=P(i+1,k+1),e=P(i,k+1);const n=V.norm(V.cross(V.sub(d,e),V.sub(a,e)));const cc=c.map(v=>v*(0.92+hash(sd+i*3+k)*0.16));
      if(k>0)g.tri(M,N,cc,[e,n],[b,n],[a,n]);if(k<sv-1)g.tri(M,N,cc,[e,n],[d,n],[b,n]);}},
};
// ---------- GL ----------
const E={};
function glInit(){const cv=document.getElementById('gl');const gl=cv.getContext('webgl2',{antialias:false,preserveDrawingBuffer:true,alpha:false});E.gl=gl;E.cv=cv;
  E.hdr=!!gl.getExtension('EXT_color_buffer_float');gl.getExtension('OES_texture_float_linear');
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o)+'\n'+s.slice(0,200));return o;};
  E.prog=(vs,fs)=>{const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));
    const u={};const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const a=gl.getActiveUniform(p,i);u[a.name.replace('[0]','')]=gl.getUniformLocation(p,a.name);}return {p,u};};
  E.P=E.prog(VS_MAIN,FS_MAIN);E.PS=E.prog(VS_SH,FS_SH);E.PK=E.prog(VS_FS,FS_SKY);E.PB=E.prog(VS_FS,FS_BRIGHT);E.PBL=E.prog(VS_FS,FS_BLUR);E.PC=E.prog(VS_FS,FS_COMP);E.PE=E.prog(VS_FS,FS_EDGE);
  E.fsVAO=gl.createVertexArray();
  // shadow map
  E.SM=2048;E.shTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,E.shTex);gl.texStorage2D(gl.TEXTURE_2D,1,gl.DEPTH_COMPONENT24,E.SM,E.SM);
  for(const [k,v] of [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE],[gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE],[gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL]])gl.texParameteri(gl.TEXTURE_2D,k,v);
  E.shFB=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,E.shFB);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,E.shTex,0);
  // MSAA scene
  const CF=E.hdr?gl.RGBA16F:gl.RGBA8;E.msFB=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,E.msFB);
  const rbC=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,rbC);gl.renderbufferStorageMultisample(gl.RENDERBUFFER,4,CF,W,H);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.RENDERBUFFER,rbC);
  const rbN=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,rbN);gl.renderbufferStorageMultisample(gl.RENDERBUFFER,4,gl.RGBA8,W,H);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT1,gl.RENDERBUFFER,rbN);
  const rbD=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,rbD);gl.renderbufferStorageMultisample(gl.RENDERBUFFER,4,gl.DEPTH_COMPONENT24,W,H);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rbD);
  const tex=(w,h,f,nearest)=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texStorage2D(gl.TEXTURE_2D,1,f,w,h);const fl=nearest?gl.NEAREST:gl.LINEAR;gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,fl);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,fl);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t;};
  E.colTex=tex(W,H,CF);E.depTex=tex(W,H,gl.DEPTH_COMPONENT24,true);E.rsFB=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,E.rsFB);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,E.colTex,0);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,E.depTex,0);
  E.nTex=tex(W,H,gl.RGBA8,true);E.nFB=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,E.nFB);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,E.nTex,0);
  E.edTex=tex(W,H,CF);E.edFB=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,E.edFB);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,E.edTex,0);
  E.bw=W>>2;E.bh=H>>2;E.bT=[tex(E.bw,E.bh,CF),tex(E.bw,E.bh,CF)];E.bF=E.bT.map(t=>{const f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);return f;});
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);}
function mesh(g){const gl=E.gl,va=gl.createVertexArray(),b=gl.createBuffer();gl.bindVertexArray(va);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.d),gl.STATIC_DRAW);
  const st=44;[[0,3,0],[1,3,12],[2,2,24],[3,3,32]].forEach(([l,n,o])=>{gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,n,gl.FLOAT,false,st,o);});gl.bindVertexArray(null);return {va,n:g.d.length/11};}
function canvasTex(cv,o={}){const gl=E.gl,t=o.t||gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cv);gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);const wr=o.repeat?gl.REPEAT:gl.CLAMP_TO_EDGE;gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,o.wrapS??wr);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wr);
  const ext=gl.getExtension('EXT_texture_filter_anisotropic');if(ext)gl.texParameterf(gl.TEXTURE_2D,ext.TEXTURE_MAX_ANISOTROPY_EXT,8);return t;}
function mkCanvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
// ---------- shaders ----------
const VS_MAIN=`#version 300 es
layout(location=0) in vec3 aP;layout(location=1) in vec3 aN;layout(location=2) in vec2 aU;layout(location=3) in vec3 aC;
uniform mat4 uM,uVP,uLVP;uniform mat3 uNM;uniform float uOut,uShOff,uPx;uniform vec3 uSunD,uCam;
out vec3 vW,vN,vC;out vec2 vU;out vec4 vL;
void main(){vec4 w=uM*vec4(aP,1.);vN=normalize(uNM*aN);w.xyz+=vN*uOut*uPx*length(w.xyz-uCam);vW=w.xyz;vC=aC;vU=aU;vL=uLVP*vec4(w.xyz+uSunD*uShOff,1.);gl_Position=uVP*w;}`;
const FS_MAIN=`#version 300 es
precision highp float;precision highp sampler2DShadow;
in vec3 vW,vN,vC;in vec2 vU;in vec4 vL;
uniform vec3 uCol,uEmis,uSunDir,uSunCol,uSky,uGnd,uFog,uCam,uOutCol;uniform float uFogD,uFogH,uRim,uAT,uSprite,uOutline,uHasTex,uSpec,uUnlit,uSSS,uToon,uTThr;uniform vec3 uShTint;
uniform sampler2D uTex;uniform sampler2DShadow uSh;uniform int uNP;uniform vec4 uPP[10];uniform vec3 uPC[10];uniform float uNoInk;
layout(location=0) out vec4 o;layout(location=1) out vec4 oN;
float shadow(){vec3 p=vL.xyz/vL.w*0.5+0.5;if(p.x<0.||p.x>1.||p.y<0.||p.y>1.||p.z>1.)return 1.;float s=0.;vec2 ts=vec2(1./2048.);
  for(int x=-2;x<=2;x++)for(int y=-2;y<=2;y++)s+=texture(uSh,vec3(p.xy+vec2(x,y)*ts*1.25,p.z-0.0012));return s/25.;}
void main(){vec4 tx=uHasTex>.5?texture(uTex,vU):vec4(1.);if(tx.a<uAT)discard;oN=vec4(normalize(vN)*0.5+0.5,uNoInk>.5?0.:1.);
  float dist=length(vW-uCam);float fg=clamp(1.-exp(-dist*uFogD),0.,1.)*(1.-clamp((vW.y-uFogH)*0.05,0.,0.7));
  if(uOutline>.5){o=vec4(mix(uOutCol,uFog,fg*0.85),1.);return;}
  vec3 base=uCol*vC*tx.rgb;if(uUnlit>.5){o=vec4(mix(base+uEmis,uFog,fg),1.);return;}
  vec3 N=normalize(vN);if(!gl_FrontFacing)N=-N;vec3 V=normalize(uCam-vW);float sh=shadow();
  float ndl=uSprite>.5?0.72:dot(N,uSunDir);float d=uSprite>.5?ndl:(smoothstep(-0.05,0.45,ndl)*0.6+max(ndl,0.)*0.4);
  vec3 hemi=uSprite>.5?mix(uGnd,uSky,0.62):mix(uGnd,uSky,clamp(N.y*0.5+0.5,0.,1.));
  vec3 L=hemi+uSunCol*d*sh;vec3 c;
  if(uToon>0.){float lit=smoothstep(uTThr-0.03,uTThr+0.03,ndl)*smoothstep(0.3,0.55,sh);
    vec3 Lt=hemi*0.8+uSunCol*0.82*lit;
    for(int i=0;i<10;i++){if(i>=uNP)break;vec3 lv=uPP[i].xyz-vW;float dl=length(lv);float a=clamp(1.-dl/uPP[i].w,0.,1.);a=smoothstep(0.15,0.55,a)*0.8+a*a*0.2;float lam=smoothstep(0.0,0.12,dot(N,lv/dl))*0.8+0.2;Lt+=uPC[i]*a*lam;}
    vec3 ct=base*Lt*mix(uShTint,vec3(1.),lit)+uEmis*tx.rgb;
    vec3 h=normalize(uSunDir+V);if(uSpec>0.)ct+=uSunCol*smoothstep(0.978,0.986,dot(N,h))*uSpec*0.3*lit;
    float rim=smoothstep(0.58,0.64,1.-max(dot(N,V),0.))*uRim;ct+=(uSunCol*0.7*lit*smoothstep(-0.2,0.3,dot(N,uSunDir+vec3(0,0.2,0)))+hemi*0.15)*rim*0.9;
    vec3 L2=L;for(int i=0;i<10;i++){if(i>=uNP)break;vec3 lv=uPP[i].xyz-vW;float dl=length(lv);float a=clamp(1.-dl/uPP[i].w,0.,1.);a*=a;L2+=uPC[i]*a*(max(dot(N,lv/dl),0.)*0.75+0.25);}
    c=mix(base*L2+uEmis*tx.rgb,ct,uToon);}
  else{
  for(int i=0;i<10;i++){if(i>=uNP)break;vec3 lv=uPP[i].xyz-vW;float dl=length(lv);float a=clamp(1.-dl/uPP[i].w,0.,1.);a*=a;float lam=uSprite>.5?0.9:max(dot(N,lv/dl),0.)*0.75+0.25;L+=uPC[i]*a*lam;}
  c=base*L+uEmis*tx.rgb;
  if(uSpec>0.){vec3 h=normalize(uSunDir+V);c+=uSunCol*pow(max(dot(N,h),0.),60.)*uSpec*sh;}
  if(uRim>0.&&uSprite<.5){float r=pow(1.-max(dot(N,V),0.),3.)*uRim;c+=(uSunCol*sh*0.55+hemi*0.4)*r;}}
  if(uSSS>0.)c+=base*uSSS;
  o=vec4(mix(c,uFog,fg),1.);}`;
const VS_SH=`#version 300 es
layout(location=0) in vec3 aP;layout(location=2) in vec2 aU;uniform mat4 uM,uLVP;out vec2 vU;void main(){vU=aU;gl_Position=uLVP*uM*vec4(aP,1.);}`;
const FS_SH=`#version 300 es
precision highp float;in vec2 vU;uniform sampler2D uTex;uniform float uHasTex,uAT;out vec4 o;void main(){if(uHasTex>.5&&texture(uTex,vU).a<uAT)discard;o=vec4(1.);}`;
const VS_FS=`#version 300 es
out vec2 vU;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vU=p;gl_Position=vec4(p*2.-1.,0.,1.);}`;
const FS_SKY=`#version 300 es
precision highp float;in vec2 vU;uniform mat4 uIVP;uniform vec3 uCam,uTop,uHor,uSunDir,uSunCol,uBot;uniform float uCloud,uStars,uT,uSunSize;out vec4 o;
float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=0.5;for(int i=0;i<5;i++){s+=n2(p)*a;p*=2.03;a*=0.5;}return s;}
void main(){vec4 q=uIVP*vec4(vU*2.-1.,1.,1.);vec3 d=normalize(q.xyz/q.w-uCam);float y=d.y;
  vec3 c=y>0.?mix(uHor,uTop,pow(clamp(y,0.,1.),0.55)):mix(uHor,uBot,clamp(-y*4.,0.,1.));
  float sd=max(dot(d,uSunDir),0.);c+=uSunCol*(pow(sd,uSunSize)*1.2+pow(sd,8.)*0.25);
  if(uCloud>0.&&y>0.){vec2 uv=d.xz/(y+0.12)*1.3+vec2(uT*0.01,0.);float cl=smoothstep(0.52,0.78,fbm(uv*1.2));float edge=smoothstep(0.52,0.62,fbm(uv*1.2))-cl;
    vec3 cc=mix(uHor*1.05+0.08,vec3(1.),0.55)+uSunCol*0.12;c=mix(c,cc,cl*uCloud*smoothstep(0.,0.15,y));c+=edge*uCloud*0.06;}
  if(uStars>0.&&y>0.){vec2 g=d.xz/(y+0.3)*120.;float s=step(0.995,h2(floor(g)));c+=vec3(s)*uStars*smoothstep(0.,0.3,y)*(0.6+0.4*sin(uT*3.+h2(floor(g))*20.));}
  o=vec4(c,1.);}`;
const FS_BRIGHT=`#version 300 es
precision highp float;in vec2 vU;uniform sampler2D uS;uniform float uThr;out vec4 o;void main(){vec3 c=vec3(0);for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)c+=texture(uS,vU+vec2(x,y)/vec2(270.,480.)).rgb;c/=9.;float l=max(c.r,max(c.g,c.b));o=vec4(c*smoothstep(uThr,uThr+0.35,l),1.);}`;
const FS_BLUR=`#version 300 es
precision highp float;in vec2 vU;uniform sampler2D uS;uniform vec2 uDir;out vec4 o;void main(){float w[5]=float[](0.227,0.194,0.121,0.054,0.016);vec3 c=texture(uS,vU).rgb*w[0];for(int i=1;i<5;i++){c+=texture(uS,vU+uDir*float(i)).rgb*w[i];c+=texture(uS,vU-uDir*float(i)).rgb*w[i];}o=vec4(c,1.);}`;
const FS_EDGE=`#version 300 es
precision highp float;in vec2 vU;uniform sampler2D uS,uD,uN;uniform float uNear,uFar,uInk,uInkW,uInkFar;uniform vec2 uRes;out vec4 o;
float lin(float d){float z=d*2.-1.;return 2.*uNear*uFar/(uFar+uNear-z*(uFar-uNear));}
float Z(vec2 uv){return lin(texture(uD,uv).r);}
void main(){vec2 px=uInkW/uRes;vec3 c=texture(uS,vU).rgb;float zc=Z(vU);
  float zl=Z(vU-vec2(px.x,0)),zr=Z(vU+vec2(px.x,0)),zu=Z(vU+vec2(0,px.y)),zd=Z(vU-vec2(0,px.y));
  float zul=Z(vU+vec2(-px.x,px.y)),zur=Z(vU+px),zdl=Z(vU-px),zdr=Z(vU+vec2(px.x,-px.y));
  float sil=max(max(abs(zl-zc),abs(zr-zc)),max(abs(zu-zc),abs(zd-zc)));sil=max(sil,max(max(abs(zul-zc),abs(zur-zc)),max(abs(zdl-zc),abs(zdr-zc)))*0.8);sil/=zc;
  vec4 nc4=texture(uN,vU);vec3 nc=nc4.xyz*2.-1.;float cr=0.;
  for(int k=0;k<4;k++){vec2 of=k==0?vec2(px.x,0):k==1?vec2(-px.x,0):k==2?vec2(0,px.y):vec2(0,-px.y);vec4 n4=texture(uN,vU+of);float w=min(nc4.a,n4.a);cr=max(cr,(1.-dot(nc,n4.xyz*2.-1.))*w);}
  float e=max(smoothstep(0.03,0.07,sil),smoothstep(0.22,0.4,cr));
  e*=uInk*mix(1.,uInkFar,smoothstep(6.,45.,zc));if(zc>uFar*0.9)e=0.;
  vec3 ink=c*vec3(0.2,0.17,0.22)+vec3(0.012,0.008,0.016);o=vec4(mix(c,ink,e),1.);}`;
const FS_COMP=`#version 300 es
precision highp float;in vec2 vU;uniform sampler2D uS,uD,uB;uniform float uFocus,uRange,uMaxR,uNear,uFar,uBloom,uVig,uSat,uExpo,uT,uGrain,uMB;uniform vec2 uRes,uMBDir;uniform vec3 uLift,uGain;out vec4 o;
float lin(float d){float z=d*2.-1.;return 2.*uNear*uFar/(uFar+uNear-z*(uFar-uNear));}
float coc(vec2 uv){float z=lin(texture(uD,uv).r);return clamp(abs(z-uFocus)/uRange-0.08,0.,1.)*uMaxR;}
vec3 aces(vec3 x){return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.,1.);}
void main(){vec2 px=1./uRes;float zc=lin(texture(uD,vU).r);float cc=coc(vU);vec3 acc=texture(uS,vU).rgb;float wsum=1.;
  if(uMaxR>0.5){for(int i=0;i<40;i++){float r=sqrt((float(i)+0.5)/40.)*uMaxR;float a=float(i)*2.39996;vec2 off=vec2(cos(a),sin(a))*r*px;float tz=lin(texture(uD,vU+off).r);float tc=coc(vU+off);if(tz>zc)tc=min(tc,cc);float w=smoothstep(r-1.5,r+0.5,tc);acc+=texture(uS,vU+off).rgb*w;wsum+=w;}}
  vec3 c=acc/wsum;
  if(uMB>0.){vec3 m=vec3(0);for(int i=0;i<12;i++){m+=texture(uS,vU+uMBDir*(float(i)/11.-0.5)*uMB).rgb;}c=mix(c,m/12.,0.85);}
  c+=texture(uB,vU).rgb*uBloom;c*=uExpo;c=aces(c);c=pow(c,vec3(0.94));
  c=uLift+(uGain-uLift)*c;float l=dot(c,vec3(0.299,0.587,0.114));c=mix(vec3(l),c,uSat);
  vec2 q=vU-0.5;c*=1.-dot(q*vec2(1.,0.6),q*vec2(1.,0.6))*uVig;
  c+=(fract(sin(dot(vU*uRes+uT*61.,vec2(12.9898,78.233)))*43758.5453)-0.5)*uGrain;o=vec4(c,1.);}`;
// ---------- frame rendering ----------
// R = {cam:{eye,target,fov,roll,near,far}, light:{sunDir,sunCol,sky,gnd,fog,fogD,fogH, skyTop,skyHor,skyBot,cloud,stars,sunSize}, pts:[[x,y,z,r,[col]]], draws:[...], post:{focus,range,maxR,bloom,thr,vig,sat,expo,lift,gain,grain,mb,mbDir}, shadow:{c:[x,y,z],size}}
function drawList(R,pass,VP,LVP){const gl=E.gl,P=pass==='sh'?E.PS:E.P,u=P.u;
  for(const d of R.draws){if(pass==='sh'&&d.noShadow)continue;if(pass==='out'&&!d.outline)continue;
    const M=pass==='sh'&&d.shM?d.shM:d.M;gl.uniformMatrix4fv(u.uM,false,M);
    if(d.tex){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,d.tex);}gl.uniform1f(u.uHasTex,d.tex?1:0);gl.uniform1f(u.uAT,d.at??0.5);
    if(pass!=='sh'){gl.uniformMatrix3fv(u.uNM,false,M4.nm(M));gl.uniform3fv(u.uCol,C(d.col||[1,1,1]));gl.uniform3fv(u.uEmis,C(d.emis||[0,0,0]));gl.uniform1f(u.uRim,d.rim??0.25);gl.uniform1f(u.uSpec,d.spec||0);
      gl.uniform1f(u.uSprite,d.sprite?1:0);gl.uniform1f(u.uShOff,d.shOff||0);gl.uniform1f(u.uUnlit,d.unlit?1:0);gl.uniform1f(u.uSSS,d.sss||0);gl.uniform1f(u.uNoInk,d.noInk?1:0);gl.uniform1f(u.uToon,d.toon??(R.toon||0));gl.uniform1f(u.uTThr,d.tthr??0.08);gl.uniform3fv(u.uShTint,C(d.shTint||R.shTint||[0.72,0.62,0.86]));gl.uniform1f(u.uOutline,pass==='out'?1:0);gl.uniform1f(u.uOut,pass==='out'?d.outline:0);gl.uniform3fv(u.uOutCol,C(d.outCol||[0.04,0.035,0.05]));
      if(pass==='out'){gl.enable(gl.CULL_FACE);gl.cullFace(gl.FRONT);}else if(d.cull===false)gl.disable(gl.CULL_FACE);else{gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);}}
    gl.bindVertexArray(d.mesh.va);gl.drawArrays(gl.TRIANGLES,0,d.mesh.n);}}
function renderScene(R,t){const gl=E.gl,cam=R.cam,Lg=R.light,pp=R.post||{};
  const fwd=V.norm(V.sub(cam.target,cam.eye));let up=[0,1,0];if(cam.roll){const rt=V.norm(V.cross(fwd,up));up=V.add(V.sc(up,Math.cos(cam.roll)),V.sc(rt,Math.sin(cam.roll)));}
  const near=cam.near||0.1,far=cam.far||300;const Pm=M4.persp((cam.fov||40)*Math.PI/180,W/H,near,far),Vm=M4.look(cam.eye,cam.target,up),VP=M4.mul(Pm,Vm);
  const sd=V.norm(Lg.sunDir),sc=R.shadow||{c:cam.target,size:14};const lc=sc.c,le=V.add(lc,V.sc(sd,60));const LVP=M4.mul(M4.ortho(-sc.size,sc.size,-sc.size,sc.size,1,140),M4.look(le,lc,Math.abs(sd[1])>0.99?[0,0,1]:[0,1,0]));
  // shadow pass
  gl.bindFramebuffer(gl.FRAMEBUFFER,E.shFB);gl.viewport(0,0,E.SM,E.SM);gl.clear(gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.useProgram(E.PS.p);gl.uniformMatrix4fv(E.PS.u.uLVP,false,LVP);gl.uniform1i(E.PS.u.uTex,0);drawList(R,'sh',VP,LVP);
  // main pass
  gl.bindFramebuffer(gl.FRAMEBUFFER,E.msFB);gl.viewport(0,0,W,H);gl.drawBuffers([gl.COLOR_ATTACHMENT0,gl.COLOR_ATTACHMENT1]);gl.clearBufferfv(gl.COLOR,0,[0,0,0,1]);gl.clearBufferfv(gl.COLOR,1,[0.5,0.5,0.5,0]);gl.clear(gl.DEPTH_BUFFER_BIT);gl.drawBuffers([gl.COLOR_ATTACHMENT0,gl.NONE]);
  gl.disable(gl.DEPTH_TEST);gl.useProgram(E.PK.p);const K=E.PK.u;gl.uniformMatrix4fv(K.uIVP,false,M4.inv(VP));gl.uniform3fv(K.uCam,cam.eye);gl.uniform3fv(K.uTop,C(Lg.skyTop));gl.uniform3fv(K.uHor,C(Lg.skyHor));gl.uniform3fv(K.uBot,C(Lg.skyBot||Lg.skyHor));gl.uniform3fv(K.uSunDir,sd);
  gl.uniform3fv(K.uSunCol,C(Lg.sunGlow||Lg.sunCol));gl.uniform1f(K.uCloud,Lg.cloud||0);gl.uniform1f(K.uStars,Lg.stars||0);gl.uniform1f(K.uT,t);gl.uniform1f(K.uSunSize,Lg.sunSize||400);gl.bindVertexArray(E.fsVAO);gl.drawArrays(gl.TRIANGLES,0,3);
  gl.drawBuffers([gl.COLOR_ATTACHMENT0,gl.COLOR_ATTACHMENT1]);gl.enable(gl.DEPTH_TEST);gl.useProgram(E.P.p);const u=E.P.u;gl.uniformMatrix4fv(u.uVP,false,VP);gl.uniformMatrix4fv(u.uLVP,false,LVP);gl.uniform3fv(u.uSunDir,sd);if(u.uSunD)gl.uniform3fv(u.uSunD,sd);gl.uniform3fv(u.uSunCol,C(Lg.sunCol));gl.uniform3fv(u.uSky,C(Lg.sky));gl.uniform3fv(u.uGnd,C(Lg.gnd));
  gl.uniform3fv(u.uFog,C(Lg.fog));gl.uniform1f(u.uFogD,Lg.fogD??0.01);gl.uniform1f(u.uFogH,Lg.fogH??0);gl.uniform3fv(u.uCam,cam.eye);if(u.uPx)gl.uniform1f(u.uPx,2*Math.tan((cam.fov||40)*Math.PI/360)/H);gl.uniform1i(u.uTex,0);gl.uniform1i(u.uSh,1);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,E.shTex);
  const pts=(R.pts||[]).slice(0,10);gl.uniform1i(u.uNP,pts.length);if(pts.length){gl.uniform4fv(u.uPP,new Float32Array(pts.flatMap(p=>[p[0],p[1],p[2],p[3]])));gl.uniform3fv(u.uPC,new Float32Array(pts.flatMap(p=>C(p[4]))));}
  drawList(R,'main',VP,LVP);drawList(R,'out',VP,LVP);gl.cullFace(gl.BACK);
  // resolve
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER,E.msFB);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,E.rsFB);gl.blitFramebuffer(0,0,W,H,0,0,W,H,gl.COLOR_BUFFER_BIT,gl.LINEAR);gl.blitFramebuffer(0,0,W,H,0,0,W,H,gl.DEPTH_BUFFER_BIT,gl.NEAREST);gl.readBuffer(gl.COLOR_ATTACHMENT1);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,E.nFB);gl.blitFramebuffer(0,0,W,H,0,0,W,H,gl.COLOR_BUFFER_BIT,gl.NEAREST);gl.readBuffer(gl.COLOR_ATTACHMENT0);
  // bloom
  gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.bindVertexArray(E.fsVAO);gl.viewport(0,0,E.bw,E.bh);
  gl.bindFramebuffer(gl.FRAMEBUFFER,E.bF[0]);gl.useProgram(E.PB.p);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,E.colTex);gl.uniform1i(E.PB.u.uS,0);gl.uniform1f(E.PB.u.uThr,pp.thr??0.75);gl.drawArrays(gl.TRIANGLES,0,3);
  gl.useProgram(E.PBL.p);gl.uniform1i(E.PBL.u.uS,0);for(let k=0;k<3;k++){const s=1+k*1.5;gl.bindFramebuffer(gl.FRAMEBUFFER,E.bF[1]);gl.bindTexture(gl.TEXTURE_2D,E.bT[0]);gl.uniform2f(E.PBL.u.uDir,s/E.bw,0);gl.drawArrays(gl.TRIANGLES,0,3);
    gl.bindFramebuffer(gl.FRAMEBUFFER,E.bF[0]);gl.bindTexture(gl.TEXTURE_2D,E.bT[1]);gl.uniform2f(E.PBL.u.uDir,0,s/E.bh);gl.drawArrays(gl.TRIANGLES,0,3);}
  // ink lines
  gl.viewport(0,0,W,H);gl.bindFramebuffer(gl.FRAMEBUFFER,E.edFB);gl.useProgram(E.PE.p);const ue=E.PE.u;gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,E.colTex);gl.uniform1i(ue.uS,0);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,E.depTex);gl.uniform1i(ue.uD,1);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,E.nTex);gl.uniform1i(ue.uN,2);
  gl.uniform1f(ue.uNear,near);gl.uniform1f(ue.uFar,far);gl.uniform1f(ue.uInk,pp.ink??0);gl.uniform1f(ue.uInkW,pp.inkW??1.8);gl.uniform1f(ue.uInkFar,pp.inkFar??0.45);gl.uniform2f(ue.uRes,W,H);gl.drawArrays(gl.TRIANGLES,0,3);
  // composite
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,W,H);gl.useProgram(E.PC.p);const c=E.PC.u;
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,E.edTex);gl.uniform1i(c.uS,0);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,E.depTex);gl.uniform1i(c.uD,1);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,E.bT[0]);gl.uniform1i(c.uB,2);
  gl.uniform1f(c.uFocus,pp.focus??V.len(V.sub(cam.target,cam.eye)));gl.uniform1f(c.uRange,pp.range??8);gl.uniform1f(c.uMaxR,pp.maxR??10);gl.uniform1f(c.uNear,near);gl.uniform1f(c.uFar,far);gl.uniform1f(c.uBloom,pp.bloom??0.6);gl.uniform1f(c.uVig,pp.vig??0.9);gl.uniform1f(c.uSat,pp.sat??1.08);gl.uniform1f(c.uExpo,pp.expo??1.1);
  gl.uniform1f(c.uT,t);gl.uniform1f(c.uGrain,pp.grain??0.025);gl.uniform2f(c.uRes,W,H);gl.uniform3fv(c.uLift,C(pp.lift||[0.02,0.015,0.03]));gl.uniform3fv(c.uGain,C(pp.gain||[1,0.98,0.95]));gl.uniform1f(c.uMB,pp.mb||0);gl.uniform2fv(c.uMBDir,pp.mbDir||[1,0]);gl.drawArrays(gl.TRIANGLES,0,3);
  E.VP=VP;}
// project world point to screen px (for 2D overlays)
function toScreen(p){const q=M4.xp(E.VP,p);return [(q[0]*0.5+0.5)*W,(1-(q[1]*0.5+0.5))*H,q[2]];}
