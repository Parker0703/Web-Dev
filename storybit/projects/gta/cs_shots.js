'use strict';
// ===================== Ching Shih · shots =====================
SHOTS.length=0;SEQ.length=0;
const V={};const VSEQ=[];
function scr(c,p){const M=c.getTransform();return {x:(M.a*p.x+M.c*p.y+M.e)/SS,y:(M.b*p.x+M.d*p.y+M.f)/SS,s:p.s*M.a/SS};}
function headWho(c,kind,x,y,s,o){o=Object.assign({},o);if(!o.rot)o.rot=1e-4;const oy=headOff(kind,o)*s;return who(c,kind,[0,0,0],Object.assign({},o,{abs:{x,y:y-oy,s}}));}
function shake(c,k,t){if(k<=0)return;c.translate(Math.sin(t*90)*k*14,Math.cos(t*77)*k*10);}
function darkBG(c,t,col='10,12,30',o){richBG(c,t,col,o||{});}
const MPX=p=>164*p.s;
function blurBG(c,px,dark=0.25){if(px>0){c.save();c.setTransform(1,0,0,1,0,0);c.filter=`blur(${px*SS}px)`;c.drawImage(c.canvas,0,0);c.restore();}if(dark){c.fillStyle=`rgba(0,0,0,${dark})`;c.fillRect(0,0,W,H);}}
const at=(p,dx=0,dy=0)=>({x:p.x+dx,y:p.y+dy,s:p.s});
const F3=(e='dot',b='flat',m='flat',o={})=>X(e,b,m,Object.assign({view:'3q'},o));
const FF=(e='dot',b='flat',m='flat',o={})=>X(e,b,m,Object.assign({view:'front'},o));
// a stand-in at a world point (feet on the set floor)
function at3(c,kind,x,z,face,o={}){const p=pp([x,o.y||0,z]);return who(c,kind,[0,0,0],Object.assign({},face,{abs:p,f:o.f||1,rot:1e-4},o.fig||{}));}
// fleet on the water: ships = [x,z,kind,opts]; drawn far → near
function fleet(c,t,ships){ships.slice().sort((a,b)=>a[1]-b[1]).forEach(([x,z,kind,o],i)=>{const p=pp([x,0,z]);if(p.w<=0.1)return;const L=(kind==='west'?40:32)*MPX(p);if(L<4)return;
  const O=Object.assign({t,seed:i,moving:1},o||{});if(kind==='west')westShip(c,p.x,p.y,L,O);else junk(c,p.x,p.y,L,Object.assign({sail:kind==='navy'?'tan':'red',flag:kind==='navy'?'#e8c040':'#c8201a'},O));});}
function yearCard(c,t,t0,yr,x=540,y=520){const k=popK(t,t0,0.4);hudCard(c,x,y,520,240,k,'255,200,90',(cc)=>{cc.font='900 150px Montserrat, sans-serif';cc.textAlign='center';cc.textBaseline='middle';cc.lineJoin='round';cc.strokeStyle='#000';cc.lineWidth=20;cc.strokeText(yr,0,8);cc.fillStyle='#ffd24a';cc.fillText(yr,0,8);},t);}
function counter(c,t,t0,dur,to,x,y,sz,prefix='',col='#ffd24a'){const u=clamp((t-t0)/dur);if(t<t0)return;const v=Math.round(EZ.out(u)*to);const s=prefix+v.toLocaleString('en-US');c.save();c.font=`900 ${sz}px Montserrat, sans-serif`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=sz*0.2;c.strokeText(s,x,y);c.fillStyle=col;c.fillText(s,x,y);c.restore();}
// icon helpers for the code / terms (symbols, not words)
function iconCheck(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#3ad06a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.24;c.lineCap='round';c.beginPath();c.moveTo(-r*0.45,0);c.lineTo(-r*0.1,r*0.35);c.lineTo(r*0.5,-r*0.35);c.stroke();c.restore();}
function iconCross(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#e8342a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.24;c.lineCap='round';c.beginPath();c.moveTo(-r*0.4,-r*0.4);c.lineTo(r*0.4,r*0.4);c.moveTo(r*0.4,-r*0.4);c.lineTo(-r*0.4,r*0.4);c.stroke();c.restore();}
function scroll(c,x,y,w,open,o={}){const h=w*1.25*open,k=w/400;c.save();c.translate(x,y);c.lineJoin='round';c.fillStyle='#f2e6c4';c.strokeStyle=OL;c.lineWidth=5*k;c.fillRect(-w/2,-h/2,w,h);c.strokeRect(-w/2,-h/2,w,h);
  c.fillStyle='rgba(60,40,20,0.75)';const rows=Math.floor(h/(40*k));for(let i=0;i<rows;i++)for(let j=0;j<6;j++){if(hash(i*7+j)<0.15)continue;c.fillRect(-w*0.36+j*w*0.13,-h/2+24*k+i*40*k,w*0.07,8*k);}
  if(o.seal){const sk=o.seal;c.save();c.translate(w*0.24,h*0.32);c.scale(sk,sk);c.fillStyle='#c8201a';c.fillRect(-40*k,-40*k,80*k,80*k);c.strokeStyle='#f2e6c4';c.lineWidth=5*k;c.strokeRect(-30*k,-30*k,60*k,60*k);c.beginPath();c.moveTo(-18*k,-10*k);c.lineTo(18*k,-10*k);c.moveTo(0,-22*k);c.lineTo(0,22*k);c.moveTo(-18*k,12*k);c.lineTo(18*k,12*k);c.stroke();c.restore();}
  for(const sy of [-h/2,h/2]){const g=c.createLinearGradient(0,sy-16*k,0,sy+16*k);g.addColorStop(0,'#8a4a22');g.addColorStop(1,'#5a2a12');c.fillStyle=g;c.strokeStyle=OL;rr(c,-w/2-24*k,sy-14*k,w+48*k,28*k,12*k);c.fill();c.stroke();}
  c.restore();}
function coinsPile(c,x,y,w,t=T,n=30){for(let i=0;i<n;i++){const r=Math.floor(Math.sqrt(i));const px=x+(hash(i*3.1)-0.5)*w*(1-r*0.12),py=y-r*w*0.05+hash(i)*w*0.03;c.fillStyle='#f0c840';c.strokeStyle='#8a6a10';c.lineWidth=2;c.beginPath();c.ellipse(px,py,w*0.05,w*0.03,0,0,TAU);c.fill();c.stroke();c.fillStyle='#8a6a10';c.fillRect(px-w*0.012,py-w*0.008,w*0.024,w*0.016);}}
// sea shot wrapper: plate + painted sea + fleet
function seaShot(c,t,plate,camO,ships,o={}){cam(c,plate,camO);seaPaint(c,t,Object.assign({z0:40},o.sea||{}));if(o.pre)o.pre(c);fleet(c,t,ships);if(o.post)o.post(c);c.restore();}
// ---------------------------------------------------------------------------------------------------------
// 1 · "The emperor of China sent his navy after one pirate…" emperor commands → the navy sails out
V.emp=(c,t,u,d)=>{const t0=V.emp.t0,tn=wt('navy',2.0);
  if(t<tn+0.15){cam(c,'yamen_close',{z:K3(u,d,1.2,1.3),y:900});const p=pp([0,0.35,-5.4]);const pt=ON(t,t0+0.6,0.35);
    who(c,'emperor',[0,0,0],Object.assign(FF('dot','down','frown'),{abs:p,f:1,rot:1e-4,hf:[lerp(14,74,pt),lerp(90,-4,pt)]}));c.restore();}
  else{seaShot(c,t,'sea_wide',{z:K3(u,d,1.0,1.08),y:940},[[-40,-420,'navy'],[30,-330,'navy'],[-12,-200,'navy'],[60,-560,'navy'],[-90,-640,'navy']]);}
  cine(c,t,{v:0.5});};
// 2 · "…a woman." Ching Shih on her stern at dusk, the wind in her robe
V.woman=(c,t,u,d)=>{cam(c,'deck_stern',{z:K3(u,d,2.3,2.45),y:860,x:534});const p=pp([0,1.4,-7.4]);
  who(c,'ching',[0,0,0],Object.assign(FF('half','flat','smirk',{look:0.2}),{abs:p,f:1,rot:1e-4,hf:[18,86],hb:[-14,88]}));c.restore();cine(c,t,{v:0.55,tint:'rgba(255,150,90,0.15)'});};
// 3 · "She beat them." red-sailed junks fire; a navy junk burns
V.beat=(c,t,u,d)=>{const t0=V.beat.t0;seaShot(c,t,'sea_dusk',{z:1.05+0.02*Math.sin(t*30)*(t-t0<0.4?1:0),y:940},[[-30,-170,'navy',{fire:ON(t,t0+0.2,0.4),moving:0}],[40,-260,'navy',{fire:0.6,moving:0}],[24,-110,'red',{f:-1,cannon:t0+0.05,gun:2}],[-60,-140,'red',{f:1,cannon:t0+0.25,gun:3}]],{sea:{cols:['#e0a888','#6a5a7a','#2e3654','#1e2440'],gx:500}});
  cine(c,t,{v:0.6,tint:'rgba(255,140,80,0.18)'});};
// 4 · "So he made her an offer…" an official holds out a sealed scroll
V.offer=(c,t,u,d)=>{const t0=V.offer.t0;cam(c,'yamen_close',{z:K3(u,d,1.25,1.35),y:950,x:560});const p=pp([0.15,0,-4.4]);const k=EZ.out(clamp((t-t0)/0.6));
  const r=who(c,'gov',[0,0,0],Object.assign(F3('dot','up','smile'),{abs:p,f:1,rot:1e-4,hf:[lerp(14,56,k),lerp(90,30,k)],hb:[lerp(-10,40,k),lerp(92,36,k)]}));
  if(r){const sx=(r.hf.x+r.hb.x)/2+20*p.s,sy=(r.hf.y+r.hb.y)/2;scroll(c,sx,sy-40*p.s,90*p.s,clamp((t-t0-0.2)/0.6),{seal:ON(t,t0+0.8,0.3)});}c.restore();cine(c,t,{v:0.5});};
// 5 · "…and she walked away with everything." she strides down the quay; her pirates carry the chests behind her
V.away=(c,t,u,d)=>{const t0=V.away.t0;cam(c,'canton',{z:2.2,y:1000,x:470});
  const crew=[['pirA',0.5],['pirB',1.1]];crew.forEach(([k,dl],i)=>{const A=pp([-4.2-dl,0,-1.0+i*0.4]),B=pp([-1.0-dl,0,-1.0+i*0.4]);const r=walker(c,k,t,A,B,t0+0.1,2.3,F3('dot','flat','smile'),{kind:'walk',stride:0.8,hfFix:[30,30],hbFix:[24,32],seed:i+3});if(r)chest(c,(r.hf.x+r.hb.x)/2+14*A.s,(r.hf.y+r.hb.y)/2+40*A.s,64*A.s,1,t);});
  const A=pp([-3.6,0,-0.8]),B=pp([-0.2,0,-0.8]);walker(c,'ching',t,A,B,t0,2.3,F3('half','flat','smirk'),{kind:'strut'});c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});};
// 6 · "Give me 60 seconds… a girl from a floating brothel… the most powerful pirate in history."
V.promise=(c,t,u,d)=>{const tb=wt('became',14.4);
  if(t<tb){cam(c,'canton',{z:K3(u,d,1.25,1.4),y:1100,x:420});seaSurface(c,t,{z0:12,z1:2,glitter:0,n:40});const p=pp([-2,-0.6,3.0]);flowerBoat(c,p.x,p.y,12*MPX(p),{t});
    const g=pp([-2.6,-0.05,2.2]);who(c,'chingY',[0,0,0],Object.assign(F3('dot','flat','flat',{look:0.3}),{abs:g,f:1,rot:1e-4}));c.restore();}
  else{cam(c,'deck_fwd',{z:K3(u,d,1.2,1.3),y:1000,x:520});const p=pp([-0.2,0,-0.6]);who(c,'ching',[0,0,0],Object.assign(FF('half','flat','smirk'),{abs:p,f:1,rot:1e-4,hf:[20,60],hb:[-18,88]}));c.restore();}
  cine(c,t,{v:0.5});};
// 7 · "Canton, China. 1801." the waterfront at dusk
V.canton=(c,t,u,d)=>{cam(c,'canton',{z:K3(u,d,1.0,1.08),y:1000});seaSurface(c,t,{z0:14,z1:2,glitter:0,n:60});
  for(const [x,z,L] of [[-6,4.0,9],[5,3.0,8]]){const p=pp([x,-0.6,z]);flowerBoat(c,p.x,p.y,L*MPX(p),{t});}c.restore();yearCard(c,t,wt('1801',18.8),'1801',540,560);cine(c,t,{v:0.45});};
// 8 · "A young woman working on a floating brothel catches the eye of a pirate captain named Zheng Yi."
V.meet=(c,t,u,d)=>{const t0=V.meet.t0,tz=wt('pirate',24.1);cam(c,'canton',{z:2.4,y:1040,x:t<tz?400:560});
  const bp=pp([-2,-0.6,3.0]);flowerBoat(c,bp.x,bp.y,12*MPX(bp),{t});const g=pp([-2.6,-0.05,2.2]);
  who(c,'chingY',[0,0,0],Object.assign(F3(t>tz+0.4?'half':'dot','flat',t>tz+0.4?'smirk':'flat',{look:t>tz?0.8:0.2}),{abs:g,f:1,rot:1e-4}));
  const z=pp([0.6,0,-0.4]);who(c,'zheng',[0,0,0],Object.assign(F3('dot','up',t>tz+0.3?'smile':'flat',{look:-0.8}),{abs:z,f:-1,rot:1e-4}));c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});};
// 9 · "He asks her to marry him." on the quay: he holds out a jade bangle
V.ask=(c,t,u,d)=>{const t0=V.ask.t0;cam(c,'canton',{z:3.2,y:1030,x:480});const a=pp([-0.55,0,-0.6]),b=pp([0.35,0,-0.6]);const k=EZ.out(clamp((t-t0)/0.5));
  who(c,'chingY',[0,0,0],Object.assign(F3('dot','up','o'),{abs:a,f:1,rot:1e-4}));const r=who(c,'zheng',[0,0,0],Object.assign(F3('happy','up','smile'),{abs:b,f:-1,rot:1e-4,hf:[lerp(14,60,k),lerp(90,30,k)]}));
  if(r){const m=MPX(b);c.strokeStyle='#4ac88a';c.lineWidth=0.04*m;c.beginPath();c.ellipse(r.hf.x-0.08*m,r.hf.y-0.04*m,0.07*m,0.05*m,0,0,TAU);c.stroke();c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=0.012*m;c.beginPath();c.ellipse(r.hf.x-0.08*m,r.hf.y-0.04*m,0.06*m,0.04*m,0,3.6,5);c.stroke();}
  c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});};
// 10 · "She says yes… on one condition." one finger up
V.cond=(c,t,u,d)=>{const tc=wt('on',29.0);cam(c,'canton',{z:3.6,y:1020,x:420});const a=pp([-0.55,0,-0.6]);const k=ON(t,tc,0.3);
  who(c,'chingY',[0,0,0],Object.assign(F3(t<tc?'happy':'half','flat',t<tc?'smile':'smirk',{look:0.6}),{abs:a,f:1,rot:1e-4,hf:[lerp(14,30,k),lerp(90,-40,k)]}));c.restore();cine(c,t,{v:0.5,tint:'rgba(255,150,90,0.12)'});};
// 11 · "Half of everything he owns. And a share of his fleet." the loot splits in two; the fleet icons split
V.half=(c,t,u,d)=>{const th=wt('half',30.5),ts=wt('share',33.0);darkBG(c,t,'50,30,20',{c1:'255,190,90',bokCol:'255,210,140'});
  godRays(c,540,1100,'255,210,120',0.12,t,12,1200);const sp=EZ.back(clamp((t-(th+0.4))/0.5));chest(c,540-sp*220,1300,420,1,t);if(sp>0)chest(c,540+sp*220,1300,420,1,t);coinsPile(c,540-sp*220,1330,380,t,20);if(sp>0)coinsPile(c,540+sp*220,1330,380,t,20);
  if(t>th+0.3){c.save();c.strokeStyle='#fff';c.lineWidth=8;c.setLineDash([24,16]);c.beginPath();c.moveTo(540,960);c.lineTo(540,1420);c.stroke();c.restore();}
  if(t>ts){const k=popK(t,ts,0.4);for(let i=0;i<6;i++){const x=150+i*156,y=640;c.save();c.translate(x,y);c.scale(k,k);junk(c,0,0,140,{t,seed:i,noRefl:1,sail:i<3?'red':'white',flag:i<3?'#c8201a':'#888'});c.restore();}}
  cine(c,t,{v:0.6});};
// 12 · "Together, they build the Red Flag Fleet." on deck, the red flag goes up
V.flag=(c,t,u,d)=>{const t0=V.flag.t0;cam(c,'deck_fwd',{z:K3(u,d,1.15,1.25),y:960});
  who(c,'zheng',[0,0,0],Object.assign(F3('dot','flat','smile'),{abs:pp([0.7,0,-0.8]),f:-1,rot:1e-4}));who(c,'ching',[0,0,0],Object.assign(F3('half','flat','smirk'),{abs:pp([-0.5,0,-0.6]),f:1,rot:1e-4}));
  // a big red banner hoisted up a pole on the stern
  const up=EZ.out(clamp((t-(t0+0.3))/1.6));const pb=pp([0,1.4,-7.2]),pt=pp([0,7.4,-7.2]);c.strokeStyle=OL;c.lineWidth=10;c.beginPath();c.moveTo(pb.x,pb.y);c.lineTo(pt.x,pt.y);c.stroke();c.strokeStyle='#4a2c18';c.lineWidth=6;c.stroke();
  const fy=lerp(pb.y-60,pt.y+10,up),fw=Math.sin(t*6)*8;c.fillStyle='#d8201a';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(pt.x,fy);c.quadraticCurveTo(pt.x+90,fy-10+fw,pt.x+180,fy+fw);c.lineTo(pt.x+180,fy+110+fw);c.quadraticCurveTo(pt.x+90,fy+100,pt.x,fy+110);c.closePath();c.fill();c.stroke();
  c.restore();cine(c,t,{v:0.5});};
// 13 · "Hundreds of ships… then more than a thousand." the fleet multiplies across the sea
V.grow=(c,t,u,d)=>{const t0=V.grow.t0,tt=wt('thousand',39.4);const n=Math.floor(lerp(12,90,EZ.io(clamp((t-t0)/2.8))));const ships=[];for(let i=0;i<n;i++)ships.push([(hash(i*3.1)-0.5)*900*(0.3+hash(i*1.7)),-200-hash(i*1.7)*1400,'red',{moving:1}]);
  seaShot(c,t,'sea_wide',{z:K3(u,d,1.05,1.0),y:930},ships);{const s=t<tt-0.1?'100+':'1,000+';const k=popK(t,t<tt-0.1?t0+0.2:tt-0.1,0.35);c.save();c.translate(540,560);c.scale(k,k);c.font='900 150px Montserrat, sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=28;c.strokeText(s,0,0);c.fillStyle='#ffd24a';c.fillText(s,0,0);c.restore();}cine(c,t,{v:0.5});};
// 14 · "In 1807, Zheng Yi dies." a typhoon; his ship pitches in the storm
V.dies=(c,t,u,d)=>{seaShot(c,t,'sea_storm',{z:1.15,y:920},[[0,-130,'red',{seed:2,moving:0}]],{sea:{cols:['#8a96a4','#4a5a6a','#2a3644','#1a2430'],glitter:0}});
  // rain + lightning
  c.save();c.strokeStyle='rgba(220,230,240,0.35)';c.lineWidth=2;for(let i=0;i<140;i++){const x=(hash(i*3.3)*W+t*600)%W,y=(hash(i*7.1)*H+t*1800)%H;c.beginPath();c.moveTo(x,y);c.lineTo(x-14,y+50);c.stroke();}c.restore();
  if(Math.sin(t*3.1)>0.97){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,W,H);}yearCard(c,t,wt('1807',40.8),'1807',540,500);cine(c,t,{v:0.65});};
// 15 · "Everyone expects his pirates to tear each other apart." two pirates square up on deck
V.fight=(c,t,u,d)=>{cam(c,'deck_fwd',{z:1.55,y:1000,x:500});const s=Math.sin(t*9);
  who(c,'pirA',[0,0,0],Object.assign(F3('rage','down','yell'),{abs:pp([-0.55,0,-0.5]),f:1,rot:1e-4,hf:[54,10+s*10],hb:[30,40],lean:0.15}));
  who(c,'pirB',[0,0,0],Object.assign(F3('rage','down','grit'),{abs:pp([0.55,0,-0.6]),f:-1,rot:1e-4,hf:[54,14-s*10],hb:[30,42],lean:0.15}));
  who(c,'pirC',[0,0,0],Object.assign(F3('wide','worried','o'),{abs:pp([0.05,0,-2.4]),f:1,rot:1e-4}));c.restore();cine(c,t,{v:0.5});};
// 16 · "Instead… she takes over." she steps up onto the stern; the crew falls silent and bows
V.takes=(c,t,u,d)=>{const t0=V.takes.t0,tk=wt('takes',47.3);cam(c,'deck_fwd',{z:K3(u,d,1.15,1.28),y:900,x:540});
  const top=pp([0,1.4,-7.0]);const step=EZ.io(clamp((t-t0)/0.9));const P={x:top.x,y:lerp(top.y+60,top.y,step),s:top.s};
  who(c,'ching',[0,0,0],Object.assign(FF('half','down','flat'),{abs:P,f:1,rot:1e-4,hf:[16,88],hb:[-12,88]}));
  const bow=ON(t,tk,0.4);for(const [k,x,z,f] of [['pirA',-0.8,-1.0,1],['pirB',0.75,-1.2,-1],['pirC',-0.1,-0.4,1]])who(c,k,[0,0,0],Object.assign(F3('dot','up','o'),{abs:pp([x,0,z]),f,rot:1e-4,lean:bow*0.5,hf:[24,60],hb:[20,62]}));
  c.restore();cine(c,t,{v:0.5});};
// 17 · "And she rules with a code." a scroll of laws unrolls before her
V.code=(c,t,u,d)=>{const t0=V.code.t0;cam(c,'deck_stern',{z:1.5,y:900,x:540});const p=pp([0,1.4,-7.4]);who(c,'ching',[0,0,0],Object.assign(FF('half','down','flat'),{abs:p,f:1,rot:1e-4,hf:[50,10],hb:[-14,88]}));c.restore();blurBG(c,4,0.25);
  scroll(c,540,1260,460,EZ.out(clamp((t-(t0+0.2))/0.8)));cine(c,t,{v:0.55});};
// 18–20 · the three laws as symbol cards
function lawCard(c,t,t0,t1,icon,colA){const k1=popK(t,t0,0.35);hudCard(c,540,900,760,760,k1,colA,(cc)=>{icon(cc,clamp((t-t1)/0.4));},t);}
V.law1=(c,t,u,d)=>{darkBG(c,t,'40,20,20',{c1:'255,90,60'});lawCard(c,t,V.law1.t0,wt('beheaded',51.9),(cc,k)=>{scroll(cc,-130,-20,300,1);iconCross(cc,-130,-20,90,popK(t,V.law1.t0+0.3,0.3));
  // the blade falls
  cc.save();cc.translate(170,-240+EZ.in(k)*260);cc.rotate(-0.3);cc.fillStyle='#d8dce4';cc.strokeStyle=OL;cc.lineWidth=6;cc.beginPath();cc.moveTo(-20,-160);cc.lineTo(26,-160);cc.quadraticCurveTo(46,40,0,140);cc.lineTo(-20,140);cc.closePath();cc.fill();cc.stroke();cc.fillStyle='#5a2a1a';cc.fillRect(-26,-220,40,60);cc.restore();},'255,90,60');cine(c,t,{v:0.6});};
V.law2=(c,t,u,d)=>{darkBG(c,t,'40,20,30',{c1:'255,90,140'});lawCard(c,t,V.law2.t0,wt('death',54.3),(cc,k)=>{cc.save();cc.translate(-140,10);headWho(cc,'womA',0,-60,2.4,FF('wide','worried','o'));cc.restore();
  // a shield in front of her + skull for anyone who hurts her
  cc.save();cc.translate(-140,190);cc.fillStyle='#3a6ad8';cc.strokeStyle=OL;cc.lineWidth=6;cc.beginPath();cc.moveTo(-90,-60);cc.lineTo(90,-60);cc.lineTo(80,40);cc.quadraticCurveTo(0,130,-80,40);cc.closePath();cc.fill();cc.stroke();cc.restore();
  if(k>0){cc.save();cc.translate(180,0);cc.scale(EZ.back(k),EZ.back(k));cc.fillStyle='#f4f0e6';cc.strokeStyle=OL;cc.lineWidth=6;cc.beginPath();cc.arc(0,-20,80,0,TAU);cc.fill();cc.stroke();cc.fillRect(-46,40,92,46);cc.strokeRect(-46,40,92,46);cc.fillStyle='#14100c';for(const sx of [-30,30]){cc.beginPath();cc.arc(sx,-20,22,0,TAU);cc.fill();}cc.beginPath();cc.moveTo(0,10);cc.lineTo(-10,30);cc.lineTo(10,30);cc.closePath();cc.fill();for(let i=-2;i<=2;i++)cc.fillRect(i*18-3,46,6,30);cc.restore();}},'255,90,140');cine(c,t,{v:0.6});};
V.law3=(c,t,u,d)=>{darkBG(c,t,'20,30,50',{c1:'90,160,255'});lawCard(c,t,V.law3.t0,wt('ears',57.4),(cc,k)=>{
  const q=clamp((t-V.law3.t0)/1.4);cc.save();cc.translate(-150+q*60,170);cc.scale(1.35,1.35);cc.save();cc.beginPath();cc.rect(-400,-600,800,580);cc.clip();headWho(cc,'pirC',0,-150,1.7,F3('wide','worried','o',{look:-0.8}));cc.restore();
  cc.strokeStyle='#5a3a22';cc.lineWidth=10;cc.lineCap='round';cc.beginPath();cc.moveTo(40,-40);cc.lineTo(170,90);cc.stroke();
  cc.fillStyle='#5a3a22';cc.strokeStyle=OL;cc.lineWidth=6;cc.beginPath();cc.moveTo(-170,-20);cc.lineTo(170,-20);cc.quadraticCurveTo(150,40,100,50);cc.lineTo(-110,50);cc.quadraticCurveTo(-160,40,-170,-20);cc.closePath();cc.fill();cc.stroke();
  cc.fillStyle='#3a6a8a';cc.fillRect(-260,50,520,60);cc.strokeStyle='rgba(255,255,255,0.6)';cc.lineWidth=4;for(let i=0;i<5;i++){cc.beginPath();cc.moveTo(-240+i*110+Math.sin(t*3+i)*10,62);cc.quadraticCurveTo(-210+i*110,54,-180+i*110,62);cc.stroke();}cc.restore();
  cc.save();cc.translate(210,-180);cc.scale(1.3,1.3);cc.fillStyle='#f2d8c8';cc.strokeStyle=OL;cc.lineWidth=6;cc.beginPath();cc.moveTo(-30,-80);cc.bezierCurveTo(60,-110,80,30,10,70);cc.bezierCurveTo(-20,90,-40,60,-30,30);cc.bezierCurveTo(10,10,20,-30,-10,-40);cc.closePath();cc.fill();cc.stroke();cc.restore();iconCross(cc,210,-180,120,k*0.95);},'90,160,255');cine(c,t,{v:0.6});};
// 21 · "Within a few years, she commands around 1,800 ships… and as many as 80,000 pirates." the whole sea is red sails
V.armada=(c,t,u,d)=>{const t0=V.armada.t0;const ships=[];for(let i=0;i<180;i++)ships.push([(hash(i*3.1)-0.5)*1500*(0.25+hash(i*1.7)),-120-Math.pow(hash(i*1.7),0.8)*1800,'red',{moving:1}]);
  seaShot(c,t,'sea_wide',{z:K3(u,d,1.12,1.0),y:930},ships);counter(c,t,wt('1,800',61.3)-0.2,1.2,1800,540,470,140);if(t>wt('80,000',63.2)-0.3)counter(c,t,wt('80,000',63.2)-0.3,1.0,80000,540,640,110,'','#ff5a4a');cine(c,t,{v:0.5});};
// 22 · "She raids coastal villages. She makes fishing boats pay her for protection."
V.raid=(c,t,u,d)=>{const t0=V.raid.t0,tf=wt('she',66.1);
  if(t<tf){cam(c,'village',{z:K3(u,d,1.25,1.35),y:1100,x:520});const s=pp([0,-0.3,20]);seaSurface(c,t,{z0:30,z1:14,glitter:0,n:20});
    // pirates charge up the beach from the junk, villagers run
    for(const [k,x0,dl] of [['pirA',1.6,0],['pirB',2.4,0.2]]){const A=pp([x0,0,2.4]),B=pp([x0-1.8,0,0.6]);walker(c,k,t,A,B,t0+dl,1.4,F3('rage','down','yell'),{kind:'run',f:-1,hfFix:[50,-20]});}
    for(const [k,x0,dl] of [['fisher',-0.6,0.1],['womB',-1.0,0.25]]){const A=pp([x0,0,0.2]),B=pp([x0-2.4,0,-1.2]);walker(c,k,t,A,B,t0+dl,1.4,F3('shock','worried','o',{look:0.7}),{kind:'run',f:-1,hfFix:[30,-60],hbFix:[24,-58]});}}
  else{seaShot(c,t,'sea_low',{z:3.4,y:1090,x:330},[[6,-70,'red',{moving:0,f:-1}]],{pre:(cc)=>{},post:(cc)=>{// a fisherman's sampan alongside; he lifts a pouch of coins up
      const p=pp([-3,0,-36]);const m=MPX(p);cc.save();cc.beginPath();cc.rect(p.x-4*m,p.y-4*m,8*m,4*m);cc.clip();cc.fillStyle='#6a4a2a';cc.strokeStyle=OL;cc.lineWidth=0.06*m;cc.beginPath();cc.moveTo(p.x-2.2*m,p.y-0.45*m);cc.lineTo(p.x+2.4*m,p.y-0.5*m);cc.quadraticCurveTo(p.x+2.2*m,p.y,p.x+1.4*m,p.y+0.1*m);cc.lineTo(p.x-1.6*m,p.y+0.1*m);cc.quadraticCurveTo(p.x-2.2*m,p.y,p.x-2.2*m,p.y-0.45*m);cc.closePath();cc.fill();cc.stroke();cc.restore();
      const k=ON(t,tf+0.5,0.5);const r=who(cc,'fisher',[0,0,0],Object.assign(F3('wide','worried','o',{look:0.6}),{abs:{x:p.x-0.3*m,y:p.y-0.42*m,s:p.s},f:1,rot:1e-4,hf:[lerp(14,40,k),lerp(90,-30,k)]}));
      if(r){cc.fillStyle='#8a6a3a';cc.strokeStyle=OL;cc.lineWidth=0.03*m;cc.beginPath();cc.arc(r.hf.x,r.hf.y-0.08*m,0.12*m,0,TAU);cc.fill();cc.stroke();cc.fillStyle='#f0c840';cc.beginPath();cc.arc(r.hf.x,r.hf.y-0.18*m,0.05*m,0,TAU);cc.fill();}}});}
  cine(c,t,{v:0.5});};
// 23 · "Even British ships aren't safe." junks close in on an East Indiaman
V.brit=(c,t,u,d)=>{const t0=V.brit.t0;const q=EZ.io(clamp((t-t0)/2.0));seaShot(c,t,'sea_wide',{z:1.2,y:930},[[0,-240,'west',{moving:0}],[lerp(-70,-28,q),-200,'red',{f:1}],[lerp(70,30,q),-230,'red',{f:-1}],[lerp(-40,-14,q),-150,'red',{f:1}]]);
  const k=popK(t,wt('safe',70.7),0.3);hudCard(c,300,1430,380,440,k,'255,90,80',(cc)=>{cc.fillStyle='#2a3a5a';cc.fillRect(-190,-220,380,440);headWho(cc,'brit',0,40,2.4,FF('shock','up','o',{sweat:2}));},t);cine(c,t,{v:0.5});};
// 24 · "China's navy sends fleet after fleet." wave after wave of tan sails
V.waves=(c,t,u,d)=>{const t0=V.waves.t0;const ships=[];for(let w=0;w<3;w++)for(let i=0;i<7;i++){const ap=EZ.out(clamp((t-t0-w*0.6)/1.6));ships.push([(i-3)*22+w*8,lerp(-900,-260-w*160,ap),'navy',{moving:1}]);}
  seaShot(c,t,'sea_wide',{z:1.05,y:930},ships);cine(c,t,{v:0.5});};
// 25 · "She beats them." broadsides, a navy junk ablaze
V.beat2=(c,t,u,d)=>{const t0=V.beat2.t0;seaShot(c,t,'sea_wide',{z:1.25+(t-t0<0.3?0.02*Math.sin(t*60):0),y:930},[[-24,-150,'navy',{fire:ON(t,t0+0.15,0.3),moving:0}],[36,-230,'navy',{fire:0.8,moving:0}],[18,-95,'red',{f:-1,cannon:t0,gun:1}],[-52,-120,'red',{f:1,cannon:t0+0.2,gun:3}]]);cine(c,t,{v:0.55,tint:'rgba(255,140,80,0.12)'});};
// 26 · "And the sailors she captures? Many of them switch sides and join her." kneeling navy sailors → red headbands
V.join=(c,t,u,d)=>{const t0=V.join.t0,tj=wt('switch',77.6);cam(c,'deck_fwd',{z:1.3,y:980,x:540});
  who(c,'ching',[0,0,0],Object.assign(FF('half','flat','smirk'),{abs:pp([0,1.4,-7.2]),f:1,rot:1e-4,hf:[46,40]}));
  [[-0.95,-0.9],[0.0,-0.4],[0.95,-0.9]].forEach(([x,z],i)=>{const sw=ON(t,tj+i*0.25,0.3);const kind=sw>0.5?'qsailR':'qsail';const r=who(c,kind,[0,0,0],Object.assign(X(sw>0.5?'happy':'wide',sw>0.5?'flat':'worried',sw>0.5?'smile':'o',{view:sw>0.5?'front':'3q',look:0}),{abs:pp([x,0,z]),f:x<0?1:-1,rot:1e-4,crouch:lerp(30,0,sw),lean:lerp(0.3,0,sw),hf:sw>0.5?[16,88]:[18,98],hb:sw>0.5?[-12,90]:[-10,98]}));if(r)puff(c,r.hc.x,r.hc.y-20*pp([x,0,z]).s,tj+i*0.25,t,60*pp([x,0,z]).s,'255,255,255');});
  c.restore();cine(c,t,{v:0.5});};
KIND2.qsailR=Object.assign({},KIND2.qsail,{hat2:'redband',hatCol:'#c8302a',hair4:'crew',badge:0});
// 27 · "China even turns to the Portuguese and the British for help." the official shakes their hands in the hall
V.help=(c,t,u,d)=>{const t0=V.help.t0,tb=wt('british',81.4);cam(c,'yamen',{z:K3(u,d,1.35,1.42),y:1060,x:540});
  who(c,'qing',[0,0,0],Object.assign(F3('dot','up','smile'),{abs:pp([0,0,-3.2]),f:t<tb?-1:1,rot:1e-4,hf:[56,40]}));
  who(c,'portu',[0,0,0],Object.assign(F3('dot','flat','smile'),{abs:pp([-0.9,0,-3.0]),f:1,rot:1e-4,hf:t<tb?[56,40]:undefined}));
  who(c,'brit',[0,0,0],Object.assign(F3('dot','flat','smile'),{abs:pp([0.9,0,-3.0]),f:-1,rot:1e-4,hf:t>=tb?[56,40]:undefined}));c.restore();cine(c,t,{v:0.5});};
// 28 · "It still doesn't work." a British ship limps off, sails holed, smoking
V.fail=(c,t,u,d)=>{const t0=V.fail.t0;seaShot(c,t,'sea_wide',{z:1.2,y:930},[[lerp(0,-40,EZ.in(clamp((t-t0)/1.5))),-240,'west',{f:-1,moving:1}],[50,-180,'red',{f:-1}]],{post:(cc)=>{const p=pp([lerp(0,-40,EZ.in(clamp((t-t0)/1.5))),0,-240]);for(let i=0;i<10;i++){const q=((t*0.5+hash(i))%1);cc.fillStyle=`rgba(40,36,34,${0.5*(1-q)})`;cc.beginPath();cc.arc(p.x+(hash(i*3)-0.5)*200,p.y-200-q*400,30+q*60,0,TAU);cc.fill();}}});
  const k=popK(t,wt('work',83.5),0.3);hudCard(c,780,1430,380,440,k,'255,200,90',(cc)=>{cc.fillStyle='#5a2a2a';cc.fillRect(-190,-220,380,440);headWho(cc,'ching',0,40,2.4,FF('half','flat','smirk'));},t);cine(c,t,{v:0.5});};
// 29 · "So in 1810, China tries something else." the emperor thinks
V.think=(c,t,u,d)=>{cam(c,'yamen_close',{z:1.3,y:900});const p=pp([0,0.35,-5.4]);who(c,'emperor',[0,0,0],Object.assign(FF('half','worried','flat',{look:-0.3}),{abs:p,f:1,rot:1e-4,hf:[-16,80],hb:[-22,80]}));c.restore();yearCard(c,t,wt('1810',84.5),'1810',540,520);cine(c,t,{v:0.5});};
// 30 · "Peace." a white flag rises on a navy junk
V.peace=(c,t,u,d)=>{const t0=V.peace.t0;seaShot(c,t,'sea_wide',{z:1.6,y:920},[[0,-120,'navy',{moving:0}]],{post:(cc)=>{const p=pp([0,0,-120]),m=MPX(p);const top=pp([2,16,-120]);const up=EZ.out(clamp((t-t0)/0.8));const fy=lerp(top.y+4*m,top.y,up),fw=Math.sin(t*6)*0.2*m;cc.fillStyle='#f8f6f0';cc.strokeStyle=OL;cc.lineWidth=0.08*m;cc.beginPath();cc.moveTo(top.x,fy);cc.quadraticCurveTo(top.x+1.2*m,fy+fw,top.x+2.4*m,fy+fw);cc.lineTo(top.x+2.4*m,fy+1.6*m+fw);cc.quadraticCurveTo(top.x+1.2*m,fy+1.6*m,top.x,fy+1.6*m);cc.closePath();cc.fill();cc.stroke();}});cine(c,t,{v:0.45});};
// 31 · "And she doesn't send a messenger." a messenger with a scroll … crossed out
V.mess=(c,t,u,d)=>{cam(c,'canton',{z:3.0,y:1030,x:500});const p=pp([-0.2,0,-0.7]);const r=who(c,'qsail',[0,0,0],Object.assign(F3('dot','flat','flat'),{abs:p,f:1,rot:1e-4,hf:[44,62]}));if(r)scroll(c,r.hf.x+16*p.s,r.hf.y+6*p.s,52*p.s,1);c.restore();blurBG(c,0,0);iconCross(c,540,560,110,popK(t,wt('messenger',89.5),0.3));cine(c,t,{v:0.5});};
// 32 · "She walks into the governor's office herself… unarmed, with women and children by her side."
V.walkin=(c,t,u,d)=>{const t0=V.walkin.t0;cam(c,'yamen',{z:K3(u,d,1.15,1.22),y:1080,x:540});
  who(c,'gov',[0,0,0],Object.assign(F3('wide','up','o',{look:-0.6}),{abs:pp([0.3,0.35,-5.6]),f:-1,rot:1e-4}));
  const group=[['womB',-1.2,-2.7,-0.3,-4.1,0.5],['kid',-0.3,-2.3,0.45,-3.7,0.3],['womA',-1.65,-2.0,-0.85,-3.5,0.2],['ching',-1.0,-1.5,-0.2,-3.0,0]];group.forEach(([k,ax,az,bx,bz,dl],i)=>{const A=pp([ax,0,az]),B=pp([bx,0,bz]);const sc=k==='kid'?0.62:1;
    walker(c,k,t,{x:A.x,y:A.y,s:A.s*sc},{x:B.x,y:B.y,s:B.s*sc},t0+dl*0.6,3.0,F3(k==='ching'?'half':'dot','flat',k==='ching'?'flat':'flat'),{kind:'walk',stride:k==='kid'?0.7:0.9,seed:i});});
  c.restore();if(t>wt('unarmed',92.8))iconCross(c,190,420,70,popK(t,wt('unarmed',92.8),0.3));if(t>wt('unarmed',92.8)){c.save();c.translate(190,420);c.rotate(-0.6);c.fillStyle='#d8dce4';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-6,-60,12,90);c.strokeRect(-6,-60,12,90);c.fillStyle='#5a2a1a';c.fillRect(-10,30,20,30);c.restore();}
  cine(c,t,{v:0.5});};
// 33 · "Her terms?" she faces the governor
V.terms=(c,t,u,d)=>{cam(c,'yamen',{z:1.6,y:1020,x:560});who(c,'gov',[0,0,0],Object.assign(F3('dot','worried','flat',{look:-0.3}),{abs:pp([0.6,0.35,-5.6]),f:-1,rot:1e-4}));
  who(c,'ching',[0,0,0],Object.assign(F3('half','flat','smirk'),{abs:pp([-0.4,0,-3.4]),f:1,rot:1e-4,hf:[40,-10]}));c.restore();cine(c,t,{v:0.5});};
// 34 · "Her pirates are pardoned. They keep their loot. And her husband gets a job… in the navy that was hunting them."
V.list=(c,t,u,d)=>{const t0=V.list.t0;darkBG(c,t,'40,30,20',{c1:'255,200,90'});const b=[wt('pardoned',97.5),wt('loot',98.6),wt('husband',99.3)];
  const rows=[(cc)=>{scroll(cc,0,0,170,1,{seal:1});},(cc)=>{chest(cc,0,60,220,1,t);},(cc)=>{headWho(cc,'cheungN',0,40,1.5,FF('happy','up','smile'));}];
  rows.forEach((fn,i)=>{const k=popK(t,b[i],0.35);if(k<=0)return;const y=470+i*430;hudCard(c,470,y,560,380,k,'255,200,90',(cc)=>{fn(cc);},t);iconCheck(c,880,y,70,popK(t,b[i]+0.3,0.3));});cine(c,t,{v:0.5});};
KIND2.cheungN=Object.assign({},KIND2.qing,{hat2:'mandarin',mst:null,hair:'#16120e',skin:SK[2],coat:'#24346e'});
// 35 · "China says yes." the governor stamps the seal
V.yes=(c,t,u,d)=>{const t0=V.yes.t0;cam(c,'yamen_close',{z:1.35,y:1000});const p=pp([0,0.35,-6.1]);const ph=clamp((t-t0)/0.7);const dn=ph<0.5?EZ.in(ph*2):1-EZ.out((ph-0.5)*2)*0.4;
  who(c,'gov',[0,0,0],Object.assign(FF('dot','flat','smile'),{abs:p,f:1,rot:1e-4,hf:[34,lerp(40,74,dn)],hb:[-16,82]}));
  // scroll lying flat on the desk top (corners projected on the desk plane)
  const q=[[-0.45,-5.35],[0.45,-5.35],[0.45,-5.85],[-0.45,-5.85]].map(([x,z])=>pp([x,1.18,z]));c.fillStyle='#f2e6c4';c.strokeStyle=OL;c.lineWidth=3;c.beginPath();q.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(60,40,20,0.6)';for(let i=0;i<5;i++){const a=pp([-0.3,1.18,-5.45-i*0.07]),b=pp([0.1,1.18,-5.45-i*0.07]);c.fillRect(a.x,a.y-2,b.x-a.x,3);}
  if(t>t0+0.35){const sp=pp([0.25,1.18,-5.55]);c.fillStyle='#c8201a';c.fillRect(sp.x-14,sp.y-10,28,20);}
  c.restore();if(t>t0+0.35&&t<t0+0.55){c.fillStyle='rgba(255,255,255,0.2)';c.fillRect(0,0,W,H);}iconCheck(c,880,520,80,popK(t,t0+0.5,0.3));cine(c,t,{v:0.5});};
// 36 · "She retires rich, opens a gambling house, and lives to 69." the gambling house; 69
V.retire=(c,t,u,d)=>{const t0=V.retire.t0;cam(c,'gamble',{z:K3(u,d,1.3,1.4),y:1000,x:520});
  who(c,'chingOld',[0,0,0],Object.assign(FF('happy','flat','smile'),{abs:pp([0,0,-3.4]),f:1,rot:1e-4,hf:[34,40]}));
  for(const [k,x,z,f] of [['pirA',-1.3,-2.4,1],['fisher',1.3,-2.2,-1]])who(c,k,[0,0,0],Object.assign(F3('dot','up','o'),{abs:pp([x,0,z]),f,rot:1e-4,crouch:30}));
  const tp=pp([0,0.8,-3.0]);coinsPile(c,tp.x,tp.y,180*tp.s,t,24);c.restore();
  const k=popK(t,wt('69',107.6),0.35);if(k>0){c.save();c.translate(540,520);c.scale(k,k);c.font='900 170px Montserrat, sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle='#000';c.lineWidth=28;c.strokeText('69',0,0);c.fillStyle='#ffd24a';c.fillText('69',0,0);c.restore();}cine(c,t,{v:0.55});};
// 37 · "She dies in her bed." peaceful, lamp light
V.bed=(c,t,u,d)=>{cam(c,'bedcn',{z:K3(u,d,1.25,1.35),y:820,x:600});
  const pil=pp([0,0.78,-3.55]);c.save();c.beginPath();c.rect(0,0,W,pil.y+18*pil.s);c.clip();headWho(c,'chingOld',pil.x,pil.y-22,pil.s*1.05,FF('closed','flat','smile'));c.restore();
  const q=[[-0.75,-3.25],[0.75,-3.25],[0.8,-1.85],[-0.8,-1.85]].map(([x,z])=>pp([x,0.8,z]));const g=c.createLinearGradient(q[0].x,q[0].y,q[2].x,q[2].y);g.addColorStop(0,'#c8443a');g.addColorStop(1,'#8a2a22');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=5;
  c.beginPath();c.moveTo(q[0].x,q[0].y);c.quadraticCurveTo((q[0].x+q[1].x)/2,(q[0].y+q[1].y)/2-30,q[1].x,q[1].y);c.lineTo(q[2].x,q[2].y);c.lineTo(q[3].x,q[3].y);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(240,200,120,0.6)';c.lineWidth=4;c.beginPath();c.moveTo(q[0].x,q[0].y+6);c.quadraticCurveTo((q[0].x+q[1].x)/2,(q[0].y+q[1].y)/2-24,q[1].x,q[1].y+6);c.stroke();
  c.restore();cine(c,t,{v:0.6});};
// 38 · "The most powerful pirate in history… was never caught." the Red Flag Fleet sails into the sunset
V.end=(c,t,u,d)=>{const ships=[];for(let i=0;i<40;i++)ships.push([(hash(i*3.1)-0.5)*500*(0.3+hash(i*1.7)),-180-hash(i*1.7)*900,'red',{moving:1,f:-1}]);ships.push([lerp(-6,-14,u/d),-70,'red',{moving:1,f:-1,crew:[{kind:'pirA'},{kind:'ching'},{kind:'cheung'},{kind:'pirB'}]}]);
  seaShot(c,t,'sea_dusk',{z:K3(u,d,1.0,1.1),y:930},ships,{sea:{cols:['#ffc890','#b0606a','#4a3a5a','#1e1c30'],gx:540}});
  cine(c,t,{v:0.6,tint:'rgba(255,140,90,0.15)'});};
VSEQ.push(['emp',0],['woman',wt('a',3.8)],['beat',wt('she',5.1)],['offer',wt('so',6.4)],['away',wt('and',8.2)],['promise',wt('give',10.7)],['canton',wt('canton',17.5)],['meet',wt('a',20.6)],['ask',wt('he',26.0)],['cond',wt('she',27.8)],
  ['half',wt('half',30.5)],['flag',wt('together',34.4)],['grow',wt('hundreds',37.1)],['dies',wt('in',40.5)],['fight',wt('everyone',43.3)],['takes',wt('instead',46.4)],['code',wt('and',48.6)],['law1',wt('disobey',50.7)],['law2',wt('hurt',52.8)],['law3',wt('desert',55.1)],
  ['armada',wt('within',58.0)],['raid',wt('she',64.6)],['brit',wt('even',69.2)],['waves',wt("china's",71.2)],['beat2',wt('she',74.0)],['join',wt('and',75.2)],['help',wt('china',79.1)],['fail',wt('it',82.5)],['think',wt('so',84.0)],['peace',wt('peace',87.3)],['mess',wt('and',88.3)],
  ['walkin',wt('she',90.3)],['terms',wt('her',95.7)],['list',wt('her',96.7)],['yes',wt('china',102.9)],['retire',wt('she',104.4)],['bed',wt('she',108.8)],['end',wt('the',110.5)]);
VSEQ.forEach(([k,t0])=>{V[k].t0=t0;});
VSEQ.forEach(([k,t0])=>SHOTS.push([t0,(c,t,u,d)=>V[k](c,t,u,d)]));
SHOTS.sort((a,b)=>a[0]-b[0]);
