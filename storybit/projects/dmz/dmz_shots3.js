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
