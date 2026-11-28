'use strict';
// ===================== v3: real death beats (no helmet symbols), closer cinematic framing =====================
// re-grade the finished frame through a filter (freeze / desaturate / blur)
function regrade(c,f){c.save();c.setTransform(1,0,0,1,0,0);c.filter=f;c.drawImage(c.canvas,0,0);c.restore();}
// drifting dust motes caught in a light beam
function motes(c,t,x0,y0,x1,y1,n=40,a=0.5){c.save();c.globalCompositeOperation='screen';for(let i=0;i<n;i++){const k=hash(i*1.7),x=lerp(x0,x1,hash(i*2.3))+Math.sin(t*0.4+i)*30,y=lerp(y0,y1,(hash(i*3.1)+t*0.02*(0.5+k))%1);c.fillStyle=`rgba(255,240,210,${a*(0.3+0.7*hash(i*5))})`;c.beginPath();c.arc(x,y,1.5+k*3.5,0,TAU);c.fill();}c.restore();}
// soft volumetric beam (screen-space quad)
function beam(c,P,a=0.18,col='255,236,200'){c.save();c.globalCompositeOperation='screen';c.filter='blur(30px)';const g=c.createLinearGradient(P[0][0],P[0][1],P[2][0],P[2][1]);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.restore();}
// out-of-focus foreground grass for depth
function fgGrass(c,t,y=1880,n=26,blur=14){c.save();c.filter=`blur(${blur}px)`;for(let i=0;i<n;i++){const x=hash(i*4.1)*1180-50,h=160+hash(i*2.2)*260,w=10+hash(i*6)*16,sw=Math.sin(t*1.1+i)*18;c.fillStyle=i%3?'#3c4a26':'#55602e';c.beginPath();c.moveTo(x-w,y);c.quadraticCurveTo(x+sw*0.5,y-h*0.6,x+sw,y-h);c.quadraticCurveTo(x+sw*0.5+w*0.3,y-h*0.5,x+w,y);c.fill();}c.restore();}
// ---- 8 · "that tree got two American soldiers killed." the two officers under the poplar → freeze-frame, drained to black & white
XD.killed=(c,t,u,d)=>{const tk=TW('killed')-0.05,fr=clamp((t-tk)/0.35);const T0=T;if(t>tk)T=tk;const uu=Math.min(u,tk-(t-u));
  camAt(c,'t2_mid',[-0.4,1.6,2.4],1.0+uu*0.035,t>tk?{}:hh(t,2));const L=[A_([0,0,0],()=>tree3(c,T,T0P,{state:'full'})),
    A_([0.5,0,3.3],()=>who(c,'bonifas',[0.5,0,3.3],F('dot','flat','smile',{seed:7,f:-1,view:'3q'}))),A_([-0.7,0,2.6],()=>who(c,'barrett',[-0.7,0,2.6],F('happy','up','grin',{seed:5,f:1,view:'3q'})))];depth(L);
  c.restore();T=T0;cgrade(c,t,{flare:[980,560],v:0.5});fgGrass(c,t);
  if(fr>0){regrade(c,`grayscale(${fr}) contrast(${1+0.25*fr}) brightness(${1-0.12*fr})`);const fl=clamp(1-(t-tk)/0.25);if(fl>0&&t>tk){c.fillStyle=`rgba(255,255,255,${fl*0.6})`;c.fillRect(0,0,W,H);}
    c.save();c.strokeStyle=`rgba(255,255,255,${fr*0.9})`;c.lineWidth=14;c.strokeRect(40,40,W-80,H-80);c.restore();}
  dzCounter(c,540,440,clamp((t-tk)/0.3),'2','AMERICANS KILLED','#ff5a4a');};
// ---- 19 · "Captain Arthur Bonifas and Lieutenant Mark Barrett were dead." the hangar: two flag-draped coffins, an honor guard, daylight
function boxOcc(c,id,a,b){const P=[];for(const x of [a[0],b[0]])for(const y of [a[1],b[1]])for(const z of [a[2],b[2]]){const q=pp([x,y,z]);P.push([q.x,q.y]);}P.sort((p,q)=>p[0]-q[0]||p[1]-q[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];
  for(const p of P){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}for(const p of P.slice().reverse()){while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p);}const H_=lo.slice(0,-1).concat(up.slice(0,-1));
  c.save();c.beginPath();H_.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
XD.dead=(c,t,u,d)=>{const wide=u<1.6;if(wide){camAt(c,'hg_wide',[-0.8,1.1,-1.5],1.12+u*0.04,{});cast(c,[['us1',[-2.3,0,-1.4],F('dot','sad','flat',{seed:21})],['us2',[0,0,-1.8],F('dot','sad','flat',{seed:22})]]);
    for(const x of [-1,1])boxOcc(c,'hg_wide',[x-0.43,0,-1.16],[x+0.43,1.14,1.16]);}
  else camAt(c,'hg_close',[-0.2,0.95,-0.6],1.02+(u-1.6)*0.05,{});
  c.restore();
  beam(c,[[0,0],[520,0],[900,1500],[150,1500]],0.22);motes(c,t,120,200,900,1300,46,0.55);
  cgrade(c,t,{tint:'rgba(40,60,90,0.35)',v:0.7});regrade(c,'saturate(0.75)');{const g=c.createLinearGradient(0,0,0,760);g.addColorStop(0,'rgba(0,0,0,0.75)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,760);}
  const nm=(s,r,x,y,k)=>{if(k<=0)return;c.save();c.globalAlpha=clamp(k*1.5);c.textAlign='center';c.font='800 50px "Inter Display"';c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,0.8)';c.shadowBlur=14;c.fillText(s,x,y);
    c.font='600 26px "Inter Display"';c.fillStyle='#e8d8a8';c.fillText(r,x,y+42);c.fillStyle='#d8b860';c.fillRect(x-lerp(0,150,eo(clamp(k))),y+62,lerp(0,300,eo(clamp(k))),3);c.restore();};
  nm('ARTHUR BONIFAS','CAPTAIN · U.S. ARMY',540,380,clamp((t-TW('bonifas')+0.3)/0.4));nm('MARK BARRETT','FIRST LIEUTENANT · U.S. ARMY',540,540,clamp((t-TW('barrett')+0.3)/0.4));};
// ---- closer framing (characters were too small)
XD.jsa=(c,t,u,d)=>{camAt(c,'j2_mid',[0,2.0,0],1.0+u*0.04,{});cast(c,[['rok',[-0.9,0,6.6],F('glare','angry','flat',{seed:1})],['rok',[1.4,0,6.4],F('glare','angry','flat',{seed:2})],['kpa',[-1.0,0,-1.0],F('glare','angry','flat',{seed:3})],['kpa2',[2.0,0,-1.2],F('glare','angry','flat',{seed:4})]]);
  c.restore();cgrade(c,t);tagC(c,540,420,'JOINT SECURITY AREA',clamp(u/0.3));};
XD.noshot=(c,t,u,d)=>{camAt(c,'t2_rev2',[0.3,1.7,-0.4],1.0+u*0.03,{});cast(c,[['kpa',[-1.6,0,-2.2],F('glare','angry','flat',{seed:14})],['kpa2',[-0.6,0,-2.6],F('glare','angry','flat',{seed:15})],['kpaoff',[-0.2,0,-1.2],F('glare','furious','grit',{seed:16,sweat:true})]]);
  vshadow(c,[lerp(-12,12,u/d),0,-1],0.2,11,3,0.3,16);c.restore();cgrade(c,t);fgGrass(c,t);dzCounter(c,540,440,clamp(u/0.3),'0','SHOTS FIRED',GOLD_C);};
// foreground depth on the ground-level crew scenes
for(const k of ['crew','stop','kept','sf','engineers','cut']){const f=XD[k];XD[k]=(c,t,u,d)=>{f(c,t,u,d);fgGrass(c,t,1900,22,16);};}
// detailed chainsaw (side view). origin = front-handle grip; bar points +x. on: chain runs, engine shakes
function chainsaw(c,x,y,s,ang,t,on=true){c.save();c.translate(x,y);c.rotate(ang);c.scale(s*0.62,s*0.62);const v=on?Math.sin(t*95)*1.6:0;c.translate(v,Math.cos(t*83)*v*0.5);c.lineJoin='round';c.lineCap='round';const OLc=OL;
  // guide bar
  const bg=c.createLinearGradient(0,30,0,66);bg.addColorStop(0,'#e4e8ea');bg.addColorStop(0.5,'#a8aeb2');bg.addColorStop(1,'#6c7276');c.fillStyle=bg;c.strokeStyle=OLc;c.lineWidth=5;
  c.beginPath();c.moveTo(10,32);c.lineTo(250,36);c.arc(250,50,14,-Math.PI/2,Math.PI/2);c.lineTo(10,66);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(40,44,48,0.5)';c.lineWidth=2;seg(c,30,49,232,50);c.fillStyle='#5a5e62';for(const rx of [40,70])c.beginPath(),c.arc(rx,49,4,0,TAU),c.fill();
  // chain: running teeth around the bar edge
  const off=on?(t*900)%18:0;c.fillStyle='#2a2c2e';const tooth=(px,py,up)=>{c.beginPath();c.moveTo(px-5,py);c.lineTo(px+5,py);c.lineTo(px+2,py+(up?-7:7));c.closePath();c.fill();};
  for(let k=0;k<14;k++){const px=12+((k*18+off)%250);tooth(px,32+(px/250)*4,true);const qx=262-((k*18+off)%250);tooth(qx,66-(qx/250)*0,false);}
  c.strokeStyle='#2a2c2e';c.lineWidth=3;c.setLineDash([7,4]);c.lineDashOffset=on?-t*900:0;c.beginPath();c.moveTo(10,31);c.lineTo(250,35);c.arc(250,50,15,-Math.PI/2,Math.PI/2);c.lineTo(10,67);c.stroke();c.setLineDash([]);
  // engine housing: grey crankcase + orange cover
  c.strokeStyle=OLc;c.lineWidth=5;c.fillStyle='#3c3e40';c.beginPath();c.roundRect(-120,28,150,52,14);c.fill();c.stroke();
  const og=c.createLinearGradient(0,-20,0,60);og.addColorStop(0,'#ff9a3a');og.addColorStop(1,'#d2560c');c.fillStyle=og;c.beginPath();c.moveTo(-110,60);c.lineTo(-118,10);c.quadraticCurveTo(-110,-14,-80,-14);c.lineTo(-10,-10);c.quadraticCurveTo(20,-6,22,22);c.lineTo(22,58);c.closePath();c.fill();c.stroke();
  c.fillStyle='#2a2c2e';for(let k=0;k<5;k++){c.beginPath();c.roundRect(-96+k*14,8,7,30,3);c.fill();}c.fillStyle='#f4f0e8';c.fillRect(-40,4,46,10);c.fillStyle='#2a2c2e';c.beginPath();c.arc(-60,48,9,0,TAU);c.fill();
  // rear handle loop + trigger
  c.strokeStyle=OLc;c.lineWidth=16;c.beginPath();c.moveTo(-110,6);c.quadraticCurveTo(-130,-30,-170,-28);c.lineTo(-215,-22);c.quadraticCurveTo(-232,-8,-212,6);c.lineTo(-150,18);c.stroke();c.strokeStyle='#4a4c4e';c.lineWidth=9;c.stroke();
  // front handle hoop (the grip at the origin) + chain-brake guard
  c.strokeStyle=OLc;c.lineWidth=15;c.beginPath();c.moveTo(-34,62);c.lineTo(-34,8);c.quadraticCurveTo(-34,-4,-20,-4);c.lineTo(4,-4);c.quadraticCurveTo(16,-4,16,8);c.lineTo(16,22);c.stroke();c.strokeStyle='#26282a';c.lineWidth=8;c.stroke();
  c.fillStyle='#1e2022';c.strokeStyle=OLc;c.lineWidth=4;c.beginPath();c.moveTo(24,-12);c.lineTo(36,-8);c.lineTo(34,30);c.lineTo(24,30);c.closePath();c.fill();c.stroke();
  // muffler
  c.fillStyle='#7a7e82';c.beginPath();c.roundRect(4,40,22,22,5);c.fill();c.stroke();
  if(on){for(let i=0;i<6;i++){const ph=(t*1.8+i/6)%1;c.fillStyle=`rgba(210,210,210,${0.35*(1-ph)})`;c.beginPath();c.arc(14+ph*-60,40-ph*140,10+ph*34,0,TAU);c.fill();}}
  c.restore();}
// ---- 24/31 · engineers + chainsaws: close, low, at the trunk (real-size saws, two-hand grip)
function sawCrew(c,t,u,on,bite){const T0=tree3(c,t,T0P,{state:'trim'});const out=[];const xl=pp([-0.5,1.05,0.1]).x,xr=pp([0.5,1.05,0.1]).x;
  if(bite){const k=clamp(u/3);for(const sx of [-1,1]){const e=pp([sx*0.66,1.05,0.1]),q=pp([sx*lerp(0.6,0.25,k),1.05,0.1]);c.save();c.fillStyle='#2a1c10';c.beginPath();c.moveTo(e.x,e.y-26);c.lineTo(q.x,q.y-4);c.lineTo(q.x,q.y+4);c.lineTo(e.x,e.y+8);c.closePath();c.fill();c.fillStyle='#e8d0a0';c.fillRect(Math.min(e.x,q.x),e.y+8,Math.abs(q.x-e.x),5);c.restore();}}
  for(const [pos,f,sd,aim] of [[[-1.2,0,0.15],1,3,[-0.62,1.05,0.1]],[[1.2,0,0.15],-1,5,[0.62,1.05,0.1]]]){const rc=reach(pos,bite?aim:[aim[0]*1.25,0.85,aim[2]]);
    const r=who(c,'eng',pos,F('focus','angry','grit',{seed:sd,f,view:'3q',crouch:bite?6:0,hf:[rc[0],rc[1]],hb:[rc[0]-f*55,rc[1]+(bite?-14:6)]}));
    if(r){c.save();if(bite){c.beginPath();c.rect(-50,-50,W+100,H+100);c.rect(xl,0,xr-xl,H);c.clip('evenodd');}c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.8*r.s,bite?0.0:0.55,t,on);c.restore();out.push({r,f});
      if(on&&bite){const a=pp(aim);sawdust(c,t,a.x,a.y,r.s*1.6,-f*0.6);sawdust(c,t*1.3+0.5,a.x,a.y,r.s*1.2,-f);}}}return out;}
XD.engineers=(c,t,u,d)=>{camAt(c,'t2_saw',[0,1.0,0],1.0+u*0.03,hh(t,2));sawCrew(c,t,u,u>0.5,false);c.restore();cgrade(c,t);fgGrass(c,t,1900,22,16);tagC(c,540,420,'ENGINEERS',clamp(u/0.3));};
XD.cut=(c,t,u,d)=>{const on=t>TW('chainsaws')-0.1;camAt(c,'t2_saw',[0,1.0,0],1.0+u*0.02,on?dzSh(t,3):{});sawCrew(c,t,u,on,on);
  heli(c,'huey',[lerp(-40,40,(u*0.1)%1),20,-30],0,t,{});c.restore();cgrade(c,t);fgGrass(c,t,1900,22,16);};
