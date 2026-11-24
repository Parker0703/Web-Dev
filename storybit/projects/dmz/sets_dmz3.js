'use strict';
// ---------------- aircraft hangar: two flag-draped coffins, honor guard, daylight through the open door ----------------
function flagTex(){return TX.usflag=TX.usflag||cvTex(512,1024,(x,w,h)=>{// stripes run along v (coffin length); canton at the head end (v=0), on the left side
  for(let i=0;i<13;i++){x.fillStyle=i%2?'#e8e2d6':'#9a1c22';x.fillRect(i*w/13,0,w/13+1,h);}
  const cw=w*7/13,ch=h*0.4;x.fillStyle='#1c2650';x.fillRect(0,0,cw,ch);x.fillStyle='#e8e2d6';
  for(let r=0;r<9;r++)for(let k=0;k<(r%2?5:6);k++){const cx=(k*2+(r%2?2:1))*cw/12,cy=(r+0.8)*ch/10;x.beginPath();for(let j=0;j<10;j++){const a=-Math.PI/2+j*Math.PI/5,rr=j%2?3:7.5;x.lineTo(cx+Math.cos(a)*rr*0.9,cy+Math.sin(a)*rr*1.6);}x.closePath();x.fill();}
  for(let i=0;i<900;i++){x.fillStyle=`rgba(0,0,0,${0.03+hash(i)*0.05})`;x.fillRect(hash(i*1.7)*w,hash(i*3.1)*h,1+hash(i*5)*3,20+hash(i*7)*120);}
  const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,0.25)');g.addColorStop(0.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.25)');x.fillStyle=g;x.fillRect(0,0,w,h);},{});}
function buildHangar(){texInit();const D=[],g=new Geo(),fl=new Geo(),fg=new Geo();
  TX.hfloor=TX.hfloor||cvTex(512,512,(x,w,h)=>{x.fillStyle='#5a5a58';x.fillRect(0,0,w,h);speck(x,w,h,3000,['rgba(0,0,0,0.12)','rgba(255,255,255,0.05)'],3);x.strokeStyle='rgba(20,20,20,0.35)';x.lineWidth=3;for(let i=0;i<=4;i++){x.beginPath();x.moveTo(i*128,0);x.lineTo(i*128,h);x.stroke();x.beginPath();x.moveTo(0,i*128);x.lineTo(w,i*128);x.stroke();}
    for(let i=0;i<40;i++){x.fillStyle=`rgba(0,0,0,${0.05+hash(i*9)*0.08})`;x.beginPath();x.ellipse(hash(i)*w,hash(i*2)*h,20+hash(i*3)*60,10+hash(i*4)*30,hash(i*5)*3,0,TAU);x.fill();}},{repeat:1});
  G.plane(fl,M4.S(40,1,80),[1,1,1],{uv:16});D.push({mesh:mesh(fl),M:M4.id(),tex:TX.hfloor,col:[1,1,1],rim:0,spec:1.6});
  const WL='#4a4e52',ST='#2e3236';
  BX(g,[-16,0,0],[0.4,12,44],WL);BX(g,[16,0,0],[0.4,12,44],WL);BX(g,[0,0,22],[32,12,0.4],WL);
  BX(g,[-12.5,0,-20],[7,12,0.4],WL);BX(g,[12.5,0,-20],[7,12,0.4],WL);BX(g,[0,9,-20],[18,3,0.4],WL);
  BX(g,[0,12,1],[32,0.3,44],'#2a2c2e');for(let z=-18;z<=20;z+=4){BX(g,[0,10.6,z],[32,0.25,0.25],ST);for(let x=-14;x<=14;x+=2)BX(g,[x,10.6,z],[0.12,1.3,0.12],ST,{rz:x%4?0.5:-0.5});}
  for(let z=-18;z<=20;z+=6)for(const x of [-15.6,15.6])BX(g,[x,0,z],[0.5,12,0.5],ST);
  for(const x of [-8.6,8.6])BX(g,[x,0,-20.6],[0.6,9.2,0.8],ST);
  // biers + coffins + draped flags
  const FT=flagTex();for(const x of [-1.0,1.0]){BX(g,[x,0,0],[0.84,0.6,2.3],'#121214');BX(g,[x,0.6,0],[0.7,0.52,2.16],'#3a2a20');
    G.plane(fg,M4.chain(M4.T(x,1.128,0),M4.S(0.74,1,2.24)),[1,1,1],{uv:1});
    for(const s of [-1,1])G.plane(fg,M4.chain(M4.T(x,0.95,s*1.125),M4.RX(s*Math.PI/2*0.98),M4.S(0.74,1,0.36)),[1,1,1],{uv:1});
    for(const s of [-1,1])G.plane(fg,M4.chain(M4.T(x+s*0.375,0.95,0),M4.RZ(-s*Math.PI/2*0.98),M4.S(0.36,1,2.24)),[1,1,1],{uv:1});}
  G.plane(fg,M4.chain(M4.T(-12.5,6.2,-19.75),M4.RX(Math.PI/2),M4.S(4.2,1,7.6)),[1,1,1],{uv:1});G.plane(fg,M4.chain(M4.T(12.5,6.2,-19.75),M4.RX(Math.PI/2),M4.S(4.2,1,7.6)),[1,1,1],{uv:1});
  D.push({mesh:mesh(fg),M:M4.id(),tex:FT,col:[1,1,1],emis:[0.25,0.25,0.25],rim:0.2,spec:0.3});
  // stanchions with rope, a podium, an equipment cart in shadow
  for(const [x,z] of [[-2.4,1.6],[2.4,1.6],[-2.4,-1.6],[2.4,-1.6]]){G.cylY?0:0;BX(g,[x,0,z],[0.36,0.04,0.36],'#b89a50');BX(g,[x,0,z],[0.06,0.95,0.06],'#c8a858');}
  BX(g,[-6,0,-6],[3,1.4,1.6],'#3a3e42');BX(g,[6.5,0,-9],[2,2,2],'#3e4246');BX(g,[7.4,0,-7],[1.2,1.2,1.2],'#44484c');
  const lt=new Geo();for(const z of [-10,-2,6])for(const x of [-6,6]){G.sphere(lt,M4.chain(M4.T(x,9.8,z),M4.S(0.6,0.2,0.6)),'#fff');}D.push({mesh:mesh(lt),M:M4.id(),col:[1,1,1],emis:[1.4,1.25,1.0],rim:0,noShadow:1});
  D.push({mesh:mesh(g),M:M4.id(),col:[1,1,1],rim:0.25,spec:0.6});return {D,pts:[[-6,9.5,-2,12,[0.9,0.8,0.6]],[6,9.5,-2,12,[0.9,0.8,0.6]],[0,6,4,10,[0.5,0.48,0.45]]]};}
LIGHT5.hangar={sunDir:[0.15,0.32,-1],sunCol:[2.2,2.0,1.7],sky:[0.16,0.17,0.19],gnd:[0.1,0.1,0.1],fog:[0.75,0.78,0.82],fogD:0.004,fogH:0,skyTop:[0.75,0.82,0.92],skyHor:[0.82,0.84,0.86],skyBot:[0.9,0.9,0.9],cloud:0.1,stars:0,sunSize:3000,sunGlow:[0.6,0.55,0.5],
  post:{bloom:0.55,thr:0.9,sat:0.9,expo:1.3,lift:[0.02,0.022,0.03],gain:[1.02,1.0,0.98],vig:1.25,ink:1}};
{const _g3=getSet;getSet=function(k){if(k==='hangar')return SETS[k]||(SETS[k]=buildHangar());return _g3(k);};}
PL.push(
 ['hg_wide','hangar','hangar',[3.0,1.6,6.6],[-0.8,1.1,-1.5],44],['hg_close','hangar','hangar',[2.8,1.25,3.6],[-0.2,0.95,-0.6],40],
 ['t2_mid','tsite2','korGold',[3.4,1.35,9.5],[-0.4,1.6,2.4],34],['t2_crew2','tsite2','korDay',[0.2,1.9,10.8],[-2.6,1.15,1.4],46],
 ['j2_mid','jsa2','korDay',[0.6,1.5,16],[0,2.0,0],44],['t2_rev2','tsite2','korDay',[-5.5,1.5,-8.5],[0.3,1.7,-0.4],38],
);
