'use strict';
// ===================== The Antwerp diamond heist · shots =====================
SHOTS.length=0;SEQ.length=0;
const V={};const VSEQ=[];
function scr(c,p){const M=c.getTransform();return {x:(M.a*p.x+M.c*p.y+M.e)/SS,y:(M.b*p.x+M.d*p.y+M.f)/SS,s:p.s*M.a/SS};}
function headWho(c,kind,x,y,s,o){o=Object.assign({},o);if(!o.rot)o.rot=1e-4;const oy=headOff(kind,o)*s;return who(c,kind,[0,0,0],Object.assign({},o,{abs:{x,y:y-oy,s}}));}
function shake(c,k,t){if(k<=0)return;c.translate(Math.sin(t*90)*k*14,Math.cos(t*77)*k*10);}
function darkBG(c,t,col='10,12,30',o){richBG(c,t,col,o||{});}
const at=(p,dx=0,dy=0)=>({x:p.x+dx,y:p.y+dy,s:p.s});
const F=(eyes,brow,mouth,o)=>X(eyes,brow,mouth,o);
// the cast's faces for the usual moods
const SMUG=(o={})=>X('half','flat','smirk',Object.assign({view:'3q'},o));
// spotlight: darken everything except a soft circle (never covers the face)
function spotOn(c,x,y,r,k){if(k<=0)return;c.save();const g=c.createRadialGradient(x,y,r*0.8,x,y,r*2.2);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${0.62*k})`);c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}
// ---- world-anchored props: everything that sits in a set is drawn INSIDE the camera transform at a projected 3D point
const MPX=p=>164*p.s; // pixels per metre at a projected point
// draw something lying flat on the ground at world (x,z): fn draws in local metres (1 unit = 1 m) centred at 0,0; rot = turn on the ground
function flatAt(c,x,z,rot,fn){const p=pp([x,0,z]),pa=pp([x+Math.cos(rot)*0.5,0,z+Math.sin(rot)*0.5]),pb=pp([x-Math.sin(rot)*0.5,0,z+Math.cos(rot)*0.5]);
  c.save();c.transform((pa.x-p.x)*2,(pa.y-p.y)*2,(pb.x-p.x)*2,(pb.y-p.y)*2,p.x,p.y);c.scale(0.002,0.002);fn(c);c.restore();} // local unit = 2 mm
// draw something standing upright on the ground at world (x,z), scaled so that w metres = its width in the callback's px units
function standAt(c,x,z,fn,y=0){const p=pp([x,y,z]);fn(c,p.x,p.y,MPX(p),p);}
// a sheet of paper lying flat (in metres)
function sheetFlat(c,w,h,col='#f4f0e6',lines=1){c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=3;c.fillRect(-w/2,-h/2,w,h);c.strokeRect(-w/2,-h/2,w,h);if(lines){c.fillStyle='rgba(90,90,100,0.5)';for(let i=0;i<5;i++)c.fillRect(-w*0.38,-h*0.36+i*h*0.15,w*(0.5+hash(i*3+w)*0.25),h*0.04);}}
// soft depth-of-field: blur what has already been drawn (for close-up inserts over a set)
function blurBG(c,px,dark=0.25){c.save();c.setTransform(1,0,0,1,0,0);c.filter=`blur(${px*SS}px)`;c.drawImage(c.canvas,0,0);c.restore();if(dark){c.fillStyle=`rgba(0,0,0,${dark})`;c.fillRect(0,0,W,H);}}
// a sleeve + hand coming into frame from an edge (insert shots): sleeve colour, glove/skin, end point and angle
function armIn(c,x0,y0,x1,y1,sleeve,hand,o={}){const a=Math.atan2(y1-y0,x1-x0),L=Math.hypot(x1-x0,y1-y0),w=o.w||90;c.save();c.translate(x0,y0);c.rotate(a);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=6;
  const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,shd(sleeve,0.2));g.addColorStop(1,shd(sleeve,-0.25));c.fillStyle=g;c.beginPath();c.moveTo(-40,-w/2);c.lineTo(L-w*0.3,-w*0.45);c.lineTo(L-w*0.3,w*0.45);c.lineTo(-40,w/2);c.closePath();c.fill();c.stroke();
  c.fillStyle=shd(sleeve,-0.3);c.fillRect(L-w*0.42,-w*0.47,w*0.16,w*0.94);c.strokeRect(L-w*0.42,-w*0.47,w*0.16,w*0.94);
  // hand: palm + curled fingers around a held object, thumb on top
  const hg=c.createRadialGradient(L,-w*0.15,4,L,0,w*0.6);hg.addColorStop(0,shd(hand,0.15));hg.addColorStop(1,shd(hand,-0.15));c.fillStyle=hg;
  c.beginPath();c.ellipse(L,0,w*0.42,w*0.36,0,0,TAU);c.fill();c.stroke();for(let i=0;i<4;i++){c.beginPath();c.ellipse(L+w*0.32,-w*0.24+i*w*0.16,w*0.13,w*0.085,0,0,TAU);c.fill();c.stroke();}
  c.beginPath();c.ellipse(L+w*0.12,-w*0.36,w*0.18,w*0.09,-0.5,0,TAU);c.fill();c.stroke();c.restore();}
// ---------------------------------------------------------------------------------------------------------
// 1 · "100 million dollars in diamonds…" an open box overflowing with stones — then they vanish
V.open=(c,t,u,d)=>{cam(c,'v_wall',{z:K3(u,d,1.25,1.42),y:1000});c.restore();vignDark(c,0.5);
  const gone=t>wt('vanished',2.8)+0.05;const vk=1-ON(t,wt('vanished',2.8),0.25);
  drawer(c,540,1420,780,(cc,x,y,w)=>{if(vk>0){cc.save();cc.globalAlpha=vk;diamondPile(cc,x,y+20,w*0.95,t,34);goldBar(cc,x+w*0.32,y+10,w*0.28);cc.restore();}});
  if(t<wt('vanished',2.8)+0.1){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1200,40,540,1200,520);g.addColorStop(0,'rgba(170,220,255,0.35)');g.addColorStop(1,'rgba(170,220,255,0)');c.fillStyle=g;c.fillRect(0,600,W,1200);c.restore();}
  puff(c,540,1200,wt('vanished',2.8),t,180);sparkBurst(c,540,1180,wt('vanished',2.8),t,360,18);
  cine(c,t,{v:0.6});};
// 2 · "…from a vault nobody could break into." the giant round door, shut
V.door=(c,t,u,d)=>{cam(c,'c_door0',{z:K3(u,d,1.06,1.3),y:880});c.restore();
  const tb=wt('break',4.9);if(t>tb){c.save();c.globalCompositeOperation='lighter';const gl=(t-tb)/0.7;const gx=lerp(200,900,clamp(gl));const g=c.createLinearGradient(gx-120,0,gx+120,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(0.5,'rgba(255,255,255,0.25)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,400,W,1100);c.restore();}
  cine(c,t,{v:0.6});};
// 3 · "And the whole thing fell apart because of a half-eaten sandwich." the hero
V.sand=(c,t,u,d)=>{const t0=V.sand.t0;darkBG(c,t,'60,40,20',{c1:'255,170,90',c2:'255,120,60',bokCol:'255,200,140',rayCol:'255,210,160'});
  // spotlight from above
  c.save();c.globalCompositeOperation='lighter';const sg=c.createLinearGradient(540,0,540,1300);sg.addColorStop(0,'rgba(255,230,180,0.0)');sg.addColorStop(0.3,'rgba(255,230,180,0.18)');sg.addColorStop(1,'rgba(255,230,180,0.05)');c.fillStyle=sg;c.beginPath();c.moveTo(420,0);c.lineTo(660,0);c.lineTo(980,1300);c.lineTo(100,1300);c.closePath();c.fill();c.restore();
  // a table top
  c.fillStyle='#3a2a1e';c.beginPath();c.moveTo(0,1180);c.lineTo(W,1180);c.lineTo(W,H);c.lineTo(0,H);c.closePath();c.fill();c.fillStyle='#4e3a2a';c.fillRect(0,1180,W,18);
  // drop + squash/stretch on landing, then a slow turn
  const tl=wt('fell',7.0);const fall=clamp((t-(tl-0.5))/0.5);const yy=lerp(-400,1010,EZ.in(fall));const land=t-tl;let sx=1,sy=1;if(fall<1){sy=1.12;sx=0.92;}else if(land<0.5){const q=Math.exp(-land*7)*Math.cos(land*28);sx=1+0.14*q;sy=1-0.14*q;}
  const bite=t<wt('half-eaten',8.4)?0:EZ.back(clamp((t-wt('half-eaten',8.4))/0.25));
  c.save();c.translate(540,1150);c.scale(sx,sy);c.translate(-540,-1150);sandwich(c,540,yy,lerp(960,1010,u/d),-0.06+Math.sin(t*0.8)*0.02,{t,bite,glint:1});c.restore();
  if(bite>0&&bite<1.2){const tb=wt('half-eaten',8.4);for(let i=0;i<10;i++){const q=clamp((t-tb)/0.8);c.fillStyle='#e8c07a';c.strokeStyle=OL;c.lineWidth=2;const px=850+Math.cos(i)*q*160,py=1000-Math.sin(i*1.7+1)*140*q+q*q*400;if(q<1){c.beginPath();c.ellipse(px,py,8,6,i,0,TAU);c.fill();c.stroke();}}}
  if(fall>=1&&land<0.35){c.save();c.globalAlpha=1-land/0.35;c.fillStyle='rgba(255,240,210,0.6)';for(let i=0;i<8;i++){c.beginPath();c.ellipse(540+(i-3.5)*110*(1+land*3),1190,30,8,0,0,TAU);c.fill();}c.restore();}
  cine(c,t,{v:0.6});};
// 4 · "Give me 60 seconds, and I'll show you the heist of the century…" the crew walks toward us out of the dark
V.crew=(c,t,u,d)=>{const t0=V.crew.t0;cam(c,'c_dark',{z:K3(u,d,1.12,1.0),y:1060});
  const row=[['genius',-0.75,-6.0,0.0],['leoN',0.0,-5.6,0.15],['monster',0.72,-6.1,0.3],['speedy',-0.35,-6.6,0.45]];
  // back to front so nearer figures overlap
  const tA=t0+0.1,dur=3.2;row.slice().sort((a,b)=>a[2]-b[2]).forEach(([k,x,z0,dl])=>{const A=pp([x,0,z0]),B=pp([x*1.15,0,z0+2.6]);const sc={monster:1.13,speedy:0.9,genius:1.05}[k]||1;
    walkerZ(c,k,t,{x:A.x,y:A.y,s:A.s*sc},{x:B.x,y:B.y,s:B.s*sc},tA+dl,dur,X(k==='speedy'?'wide':'half',k==='speedy'?'worried':'flat',k==='leoN'?'smirk':'flat',{view:'front',look:k==='speedy'?Math.sin(t*4)*0.6:0}),{rate:1.5,ph0:dl*3});});
  c.restore();NIGHT(c);
  // flashlights from the crew sweeping the floor
  torch(c,300,1100,1.2+Math.sin(t*1.3)*0.2,700,0.8);torch(c,780,1080,1.9+Math.sin(t*1.1)*0.2,700,0.8);
  cine(c,t,{v:0.7});};
// 5 · "…and the lunch that ruined it." Speedy, munching, totally innocent
V.lunch=(c,t,u,d)=>{darkBG(c,t,'40,40,60');const tl=wt('lunch',13.9);
  const chew=Math.max(0,Math.sin(t*14))*(t<wt('ruined',14.5)?1:0);
  const sy=Math.sin(t*3)*4;const r=headWho(c,'speedy',540,800,4.2,Object.assign(X(t>wt('ruined',14.5)?'wide':'half','up',chew>0.5?'o':'flat',{view:'3q',look:t>wt('ruined',14.5)?-0.7:0,sweat:t>wt('ruined',14.5)?2:0}),{f:-1,hf:[44,4+sy],hb:[30,10+sy]}));
  if(r)sandwich(c,(r.hf.x+r.hb.x)/2-40,(r.hf.y+r.hb.y)/2-30,640,-0.3,{t,bite:1,flip:1,noShadow:1});
  if(r){for(const p of [r.hf,r.hb]){c.fillStyle=SK[0];c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(p.x,p.y,30,0,TAU);c.fill();c.stroke();}}
  if(chew>0.7){c.fillStyle='#e8c07a';c.beginPath();c.arc(620+Math.sin(t*20)*20,1030,6,0,TAU);c.fill();}
  cine(c,t,{v:0.6});};
// 6 · "Antwerp, Belgium." skyline + flag
V.antwerp=(c,t,u,d)=>{c.save();const z=K3(u,d,1.12,1.0);c.translate(540,960);c.scale(z,z);c.translate(-540,-960);antwerpSky(c,t);c.restore();
  flagPin(c,700,820,1.4,popK(t,wt('belgium',16.4)-0.1,0.4));cine(c,t,{v:0.4});};
// 7 · "The diamond capital of the world." the diamond district street, traders walking, a giant gem over it all
V.capital=(c,t,u,d)=>{const t0=V.capital.t0;cam(c,'s_day',{z:K3(u,d,1.5,1.62),y:1180});
  const A1=pp([-3.6,0,0.6]),B1=pp([2.6,0,0.6]);walker(c,'det',t,A1,B1,t0-0.6,4.4,X('dot','flat','flat',{view:'3q'}),{kind:'walk'});
  const A2=pp([3.0,0,-0.4]),B2=pp([-2.4,0,-0.4]);walker(c,'leo',t,A2,B2,t0-0.2,4.8,X('dot','flat','smile',{view:'3q'}),{kind:'walk',seed:2,hfFix:[16,74]});
  c.restore();const k=popK(t,wt('capital',18.0),0.5);if(k>0){c.save();c.translate(540,520);c.scale(k,k);const gl=c.createRadialGradient(0,0,20,0,0,320);gl.addColorStop(0,'rgba(180,230,255,0.6)');gl.addColorStop(1,'rgba(180,230,255,0)');c.fillStyle=gl;c.fillRect(-320,-320,640,640);diamond(c,0,0,170,t,{spark:0.6+0.4*Math.sin(t*4)});c.restore();sparkBurst(c,540,520,wt('capital',18.0),t,420,16);}
  cine(c,t,{v:0.45});};
// 8 · "Two floors underground sits a vault with ten layers of security." cut-away, camera sinks to the vault; ten rings
V.under=(c,t,u,d)=>{c.save();const dy=-EZ.io(clamp(u/1.6))*560;c.translate(0,dy);const r=crossSection(c,t);c.restore();
  const vx=r.vx,vy=r.vy+dy;// pulse on the vault
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(vx,vy,20,vx,vy,300);g.addColorStop(0,'rgba(120,200,255,0.35)');g.addColorStop(1,'rgba(120,200,255,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  shieldRings(c,vx,vy,10,t,wt('ten',21.9),180);
  // floor arrows: -1, -2
  const k1=popK(t,wt('floors',19.9),0.35),k2=popK(t,wt('underground',20.3),0.35);[[k1,'-1',r.vy-560+dy+40],[k2,'-2',r.vy-200+dy+40]].forEach(([k,s,y])=>{if(k>0){c.save();c.translate(960,y);c.scale(k,k);c.fillStyle='#ffd24a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,0,58,0,TAU);c.fill();c.stroke();c.fillStyle='#1a1a1e';c.font='900 56px Montserrat, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,4);c.restore();}});
  cine(c,t,{v:0.5});};
// 9 · the layers: heat · radar · seismic · magnetic · the lock (100,000,000)
V.layers=(c,t,u,d)=>{cam(c,'v_corner',{z:K3(u,d,1.15,1.35),y:900});c.restore();tint(c,'rgba(10,14,30,0.55)','multiply');
  const beats=[wt('heat',23.8),wt('radar',24.7),wt('seismic',25.2),wt('magnetic',26.4),wt('lock',28.0)];let i=0;while(i<beats.length-1&&t>=beats[i+1])i++;
  const k=popK(t,beats[i],0.32);const bx=540,by=900;
  const HC=['255,120,60','90,255,150','255,176,74','120,180,255','255,210,74'][i];c.save();c.globalCompositeOperation='lighter';const hg=c.createRadialGradient(bx,by,40,bx,by,700);hg.addColorStop(0,`rgba(${HC},0.22)`);hg.addColorStop(1,`rgba(${HC},0)`);c.fillStyle=hg;c.fillRect(0,0,W,H);c.restore();
  hudCard(c,bx,by,760,760,k,HC,(cc)=>{
    if(i===0){// thermal: a body-heat blob on a scan grid, the sensor eye
      const g=cc.createRadialGradient(0,40,10,0,40,260);g.addColorStop(0,'#ffffff');g.addColorStop(0.2,'#ffe04a');g.addColorStop(0.45,'#ff6a2a');g.addColorStop(0.7,'#8a2aa8');g.addColorStop(1,'rgba(30,20,90,0)');cc.fillStyle=g;cc.beginPath();cc.ellipse(0,60,150,250,0,0,TAU);cc.fill();cc.beginPath();cc.arc(0,-170,80,0,TAU);cc.fill();
      cc.strokeStyle='rgba(255,255,255,0.12)';cc.lineWidth=2;for(let q=-6;q<=6;q++){cc.beginPath();cc.moveTo(q*55,-340);cc.lineTo(q*55,340);cc.stroke();cc.beginPath();cc.moveTo(-340,q*55);cc.lineTo(340,q*55);cc.stroke();}
      heatSensor(cc,230,-250,130,{on:1});}
    else if(i===1)radarIco(cc,260,t);
    else if(i===2)seismoIco(cc,230,t,1.2);
    else if(i===3)magnetIco(cc,300,t,0);
    else{dial(cc,0,-60,210,t*6*(1-clamp((t-beats[4])/2.5)));rollDigits(cc,0,250,86,t,wt('100',28.6));}},t);
  for(let q=0;q<5;q++){c.fillStyle=q<=i?'#ffd24a':'rgba(255,255,255,0.25)';c.beginPath();c.arc(540+(q-2)*60,1400,q===i?16:11,0,TAU);c.fill();}
  cine(c,t,{v:0.6});};
// 10 · "Nobody had ever cracked it. Nobody had even tried." a guard strolls past the door, checks his watch, yawns
V.nobody=(c,t,u,d)=>{const t0=V.nobody.t0;cam(c,'c_door0',{z:K3(u,d,1.25,1.32),y:1200});
  const A=pp([-1.0,0,-5.6]),B=pp([0.9,0,-5.6]);const tw=wt('nobody',34.2);
  const stopT=t0+2.2;const yawn=t>tw&&t<tw+1.3;
  if(t<stopT+0.1)walker(c,'guard',t,A,at(pp([0.15,0,-5.6])),t0,2.2,X('dot','flat','flat',{view:'3q'}),{kind:'walk'});
  else{const P2=pp([0.15,0,-5.6]);const g=gait(0,P2.s,1,t,{moving:0});const lift=ON(t,stopT+0.1,0.35)*(1-ON(t,tw-0.2,0.3));
    who(c,'guard',[0,0,0],Object.assign(X(yawn?'closed':'dot',yawn?'up':'flat',yawn?'o':'flat',{view:'3q'}),{abs:P2,f:1,hf:yawn?[22,-118]:[lerp(14,30,lift),lerp(88,26,lift)],hb:yawn?[-18,-116]:[lerp(-10,14,lift),lerp(92,40,lift)],rot:1e-4,stance:16}));}
  c.restore();cine(c,t,{v:0.55});};
// 11 · "Then a man named Leonardo Notarbartolo moves in." Leo strolls down the street, briefcase in hand, and in through the doors
V.leo=(c,t,u,d)=>{const t0=V.leo.t0;cam(c,'s_door',{z:K3(u,d,1.2,1.3),y:1100,x:400});
  const A=pp([-0.75,0,-1.45]),B=pp([0.0,0,-1.6]),C=pp([0.0,0,-2.4]);const tB=t0+2.1;
  let r;if(t<tB+0.05)r=walker(c,'leo',t,A,B,t0,2.1,X('dot','flat','smile',{view:'3q'}),{kind:'strut',hfFix:[14,70]});
  else{const k=EZ.io(clamp((t-tB)/1.1));const P2={x:lerp(B.x,C.x,k),y:lerp(B.y,C.y,k),s:lerp(B.s,C.s,k)};r=walkerZ(c,'leo',t,B,C,tB,1.1,X('dot','flat','smile',{view:'back'}),{hfFix:[18,70]});}
  if(r)briefcase(c,r.hf.x,r.hf.y,lerp(A.s,C.s,u/d)*1.2);const hs=r?scr(c,{x:r.hc.x,y:r.hc.y,s:1}):{x:540,y:700};
  c.restore();
  const tn=wt('leonardo',37.2);spotOn(c,hs.x,hs.y,230,ON(t,tn,0.3)*(1-ON(t,wt('moves',38.9),0.3)));
  cine(c,t,{v:0.45});};
// 12 · "He rents an office right inside the building." he walks in, sets the briefcase down, a satisfied pat
V.office=(c,t,u,d)=>{const t0=V.office.t0;cam(c,'o_wide',{z:K3(u,d,1.2,1.28),y:1040});
  const A=pp([1.6,0,-0.4]),B=pp([0.35,0,-0.9]);const tS=t0+1.5;let r;
  if(t<tS+0.05)r=walker(c,'leo',t,A,B,t0-0.2,1.7,X('dot','flat','smile',{view:'3q'}),{kind:'walk',hfFix:[14,70]});
  else{const k=EZ.io(clamp((t-tS)/0.5));const pat=t>tS+0.7?Math.abs(Math.sin((t-tS-0.7)*9))*(t<tS+1.5?1:0):0;
    r=who(c,'leo',[0,0,0],Object.assign(X('half','up','smile',{view:'3q'}),{abs:B,f:-1,hf:[lerp(14,46,k),lerp(70,52-pat*8,k)],rot:1e-4}));}
  const bk=clamp((t-tS)/0.5);if(r){const P0={x:r.hf.x,y:r.hf.y};const desk=pp([-0.05,0.8,-1.5]);const bx=lerp(P0.x,desk.x,EZ.io(bk)),by=lerp(P0.y,desk.y-60*desk.s,EZ.io(bk));briefcase(c,bx,by,B.s*1.25);}
  c.restore();cine(c,t,{v:0.45});};
// 13 · "He poses as a diamond trader." loupe in his eye, a stone in tweezers, catches the light
V.trader=(c,t,u,d)=>{cam(c,'o_desk',{z:K3(u,d,1.0,1.06),y:960});c.restore();blurBG(c,5,0.18);
  // Leo's own hands: the loupe raised beside his face, the stone held out in tweezers
  const r=headWho(c,'leo',420,800,3.6,Object.assign(X('happy','up','smile',{view:'3q',look:0.7}),{f:1,hf:[78,-46+Math.sin(t*1.5)*3],hb:[96,6]}));
  if(r){const L=r.hf,D=r.hb;
    // tweezers from the back hand, stone at the tip
    const tx=D.x+120,ty=D.y-70;c.strokeStyle='#b8bec8';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(D.x,D.y);c.lineTo(tx,ty);c.moveTo(D.x+6,D.y+6);c.lineTo(tx+6,ty+2);c.stroke();
    diamond(c,tx+14,ty-10,30,t,{spark:0.5+0.5*Math.sin(t*5)});
    // loupe in the front hand, between his face and the stone, magnifying it
    const px=L.x+70,py=L.y-40;c.save();c.beginPath();c.arc(px,py,64,0,TAU);c.clip();c.fillStyle='rgba(220,236,255,0.3)';c.fillRect(px-70,py-70,140,140);diamond(c,px+6,py+4,46,t,{spark:0.8});c.restore();
    c.strokeStyle=OL;c.lineWidth=6;c.fillStyle='#1c1c22';c.beginPath();c.arc(px,py,70,0,TAU);c.arc(px,py,60,0,TAU,true);c.fill('evenodd');c.beginPath();c.arc(px,py,70,0,TAU);c.stroke();
    c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.ellipse(px-24,py-28,22,10,-0.7,0,TAU);c.fill();
    c.strokeStyle='#1c1c22';c.lineWidth=14;c.beginPath();c.moveTo(px-40,py+50);c.lineTo(L.x,L.y);c.stroke();
    c.fillStyle=SK[1];c.strokeStyle=OL;c.lineWidth=4;for(const p of [L,D]){c.beginPath();c.arc(p.x,p.y,24,0,TAU);c.fill();c.stroke();}
    sparkBurst(c,tx+14,ty-10,wt('trader',43.3),t,200,10);}
  cine(c,t,{v:0.55});};
// 14 · "He even gets his own safe deposit box… inside the vault." his small door swings open; a wink
V.box=(c,t,u,d)=>{const t0=V.box.t0;const tw=wt('vault',47.8);c.save();const z=K3(u,d,1.0,1.06);c.translate(540,960);c.scale(z,z);c.translate(-540,-960);
  richBG(c,t,'20,26,44',{rays:0,bok:4});
  // the wall: rows of steel doors in perspective-free close-up
  const bw=170,bh=150,ox=-40,oy=120;const DX=6,DY=5;let myX=0,myY=0;
  for(let r=0;r<11;r++)for(let q=0;q<7;q++){const x=ox+q*bw,y=oy+r*bh;const mine=(r===DY&&q===DX-2);
    c.fillStyle='#0c0d10';c.fillRect(x+5,y+5,bw-10,bh-10);
    if(mine){myX=x;myY=y;continue;}
    const g=c.createLinearGradient(x,y,x+bw,y+bh);g.addColorStop(0,'#d6dbe2');g.addColorStop(1,'#8e95a0');c.fillStyle=g;c.fillRect(x+5,y+5,bw-10,bh-10);c.strokeStyle=OL;c.lineWidth=4;c.strokeRect(x+5,y+5,bw-10,bh-10);
    c.fillStyle='#c8a050';c.fillRect(x+bw/2-22,y+18,44,13);for(const dx of [-22,22]){c.fillStyle='#d8c070';c.beginPath();c.arc(x+bw/2+dx,y+bh/2+10,9,0,TAU);c.fill();}}
  // light from the top
  c.save();c.globalCompositeOperation='lighter';const lg=c.createLinearGradient(0,0,0,H);lg.addColorStop(0,'rgba(220,235,255,0.18)');lg.addColorStop(1,'rgba(220,235,255,0)');c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();
  // his box: open interior (diamond + gold glinting), then the door swinging on its left hinge
  const ob=EZ.back(clamp((t-(t0+0.9))/0.7));const x=myX,y=myY;
  c.save();c.globalCompositeOperation='lighter';const ig=c.createRadialGradient(x+bw/2,y+bh/2,4,x+bw/2,y+bh/2,bw);ig.addColorStop(0,`rgba(170,220,255,${0.45*clamp(ob)})`);ig.addColorStop(1,'rgba(170,220,255,0)');c.fillStyle=ig;c.fillRect(x-bw/2,y-bh/2,bw*2,bh*2);c.restore();
  diamond(c,x+bw/2-20,y+bh/2+18,26,t,{seed:4});goldBar(c,x+bw/2+34,y+bh/2+40,64);
  c.save();c.translate(x+5,y+5);const sx=Math.cos(clamp(ob)*1.75);c.transform(sx,-0.12*(1-sx),0,1,0,0);const g2=c.createLinearGradient(0,0,bw,0);g2.addColorStop(0,'#e2e6ec');g2.addColorStop(1,'#8e95a0');c.fillStyle=g2;c.fillRect(0,0,bw-10,bh-10);c.strokeStyle=OL;c.lineWidth=4;c.strokeRect(0,0,bw-10,bh-10);
  c.fillStyle='#c8a050';c.fillRect(bw/2-27,13,44,13);c.fillStyle='#d8c070';c.beginPath();c.arc(bw/2-5,bh/2+5,10,0,TAU);c.fill();c.restore();
  // Leo in front, his arm reaching to the door handle (the door's free edge moves with the swing)
  const hx=x+5+(bw-10)*Math.cos(clamp(ob)*1.75)-12,hy=y+bh/2+10;
  const r=headWho(c,'leo',300,1180,3.4,Object.assign(X(t>tw?'sly':'dot','flat','smirk',{view:t>tw?'front':'3q',look:t>tw?0:0.7}),{f:1,hf:[(hx-300)/3.4*0.85,(hy-1040)/3.4+40]}));
  if(r){c.strokeStyle=OL;c.lineWidth=5;c.fillStyle=SK[1];c.beginPath();c.arc(r.hf.x,r.hf.y,26,0,TAU);c.fill();c.stroke();}
  c.restore();cine(c,t,{v:0.5});};
// 15 · "For over two years, he smiles at the guards… and studies every single sensor."
V.years=(c,t,u,d)=>{const t0=V.years.t0;const ts=wt('studies',51.3);
  cam(c,'c_door0',{z:K3(u,d,1.25,1.4),y:1250});
  const G=pp([0.7,0,-5.4]);who(c,'guard',[0,0,0],Object.assign(X('dot','flat',t>wt('smiles',49.9)?'smile':'flat',{view:'3q'}),{abs:G,f:-1,rot:1e-4,hf:t>wt('smiles',49.9)+0.2&&t<ts?[30,-20+Math.sin(t*10)*8]:undefined}));
  const A=pp([-1.2,0,-3.4]),B=pp([-0.1,0,-4.0]);const r=walker(c,'leo',t,A,B,t0,2.0,X(t>ts?'dot':'happy','flat','smile',{view:'3q',look:t>ts?-0.9:0}),{kind:'walk',hfFix:t>wt('smiles',49.9)&&t<ts?[24,-24+Math.sin(t*12)*10]:undefined});
  c.restore();
  // calendar pages flying off: two years
  for(let i=0;i<10;i++){const tt=t0+0.2+i*0.18;const q=clamp((t-tt)/0.9);if(q<=0||q>=1)continue;calPage(c,140+q*500,300-q*240+q*q*400,170,['JAN','MAR','MAY','JUL','SEP','NOV','JAN','APR','AUG','DEC'][i],[3,12,8,21,5,17,9,26,14,30][i],1,{rot:q*2.2});}
  // studying the sensor: eyes dart, then a blueprint sketch appears
  if(t>ts){const k=popK(t,ts+0.3,0.4);if(k>0){c.save();c.translate(300,1640);c.scale(k*0.62,k*0.62);c.rotate(-0.05);c.fillStyle='#1e3a6a';c.strokeStyle=OL;c.lineWidth=6;rr(c,-220,-170,440,340,14);c.fill();c.stroke();
    c.strokeStyle='rgba(200,230,255,0.75)';c.lineWidth=3;c.strokeRect(-190,-140,380,280);c.beginPath();c.arc(70,10,70,0,TAU);c.stroke();c.beginPath();c.moveTo(-190,40);c.lineTo(-20,40);c.stroke();
    for(const [x,y] of [[-150,-110],[150,-110],[-60,90],[160,110]]){heatSensor(c,x,y,46,{on:Math.sin(t*6+x)>0?1:0.2});c.strokeStyle='#ff5a4a';c.lineWidth=4;c.beginPath();c.arc(x,y,40,0,TAU);c.stroke();}c.restore();}}
  cine(c,t,{v:0.5});};
// 16 · "February 2003." the page tears to the 15th, red circle
V.feb=(c,t,u,d)=>{deskBG(c,t);c.save();c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(560,1290,320,40,0,0,TAU);c.fill();c.restore();const k=popK(t,V.feb.t0,0.4);c.save();c.translate(540,940);c.scale(k,k);calPage(c,0,0,560,'FEB',15,1,{year:'2003',circle:clamp((t-wt('2003',54.5))/0.6)});c.restore();cine(c,t,{v:0.6});};
// 17 · "A quiet weekend night. It's time." empty street at night, then his watch ticks to the hour
V.night=(c,t,u,d)=>{const tw=wt("it's",57.0)-0.25;if(t<tw){cam(c,'s_night',{z:K3(u,d,1.45,1.55),y:1100});c.restore();
    for(let i=0;i<3;i++){const q=((t*0.3+i*0.33)%1);c.fillStyle=`rgba(255,255,255,${0.5*Math.sin(q*Math.PI)})`;c.beginPath();c.arc(200+i*300+q*80,200+i*90,3,0,TAU);c.fill();}}
  else{deskBG(c,t);const sec=lerp(56,60,clamp((t-tw)/0.6));watchFace(c,540,960,330,t,11.99,59,{sec});if(t>tw+0.6)sparkBurst(c,540,960,tw+0.6,t,420,12,'255,220,150');}
  cine(c,t,{v:0.55});};
// 18 · "That afternoon, he walks into the vault and sprays the heat sensor with hairspray. Now it's blind."
V.spray=(c,t,u,d)=>{const t0=V.spray.t0;const tsp=wt('sprays',60.3),tbl=wt('blind',62.8);
  const closeUp=t>tsp+0.5;
  if(!closeUp){cam(c,'v_wide',{z:K3(u,d,1.25,1.45),y:1150,x:420});
    const A=pp([1.0,0,-0.4]),B=pp([-1.6,0,-2.6]);const tS=t0+1.9;
    if(t<tS)walker(c,'leo',t,A,B,t0+0.2,1.7,X('dot','flat','flat',{view:'3q',look:Math.sin(t*3)*0.6}),{kind:'walk'});
    else{const k=EZ.io(clamp((t-tS)/0.5));const r=who(c,'leo',[0,0,0],Object.assign(X('half','up','smirk',{view:'3q',look:-0.6}),{abs:B,f:-1,hf:[lerp(14,64,k),lerp(86,-62,k)],rot:1e-4}));if(r&&k>0.3)sprayCan(c,r.hf.x-10*B.s,r.hf.y,60*B.s,-0.7);
      if(t>tsp)sprayMist(c,r.hf.x-10,r.hf.y-30,-2.2,0.8,t,1);}
    c.restore();}
  else{// close on the sensor: mist rolls over the lens, red light dies
    cam(c,'v_corner',{z:1.8,y:620,x:260});c.restore();blurBG(c,8,0.3);
    // the sensor mounted on the wall bracket
    c.fillStyle='#9aa0aa';c.strokeStyle=OL;c.lineWidth=5;c.fillRect(470,520,180,90);c.strokeRect(470,520,180,90);
    const fog=clamp((t-(tsp+0.5))/1.6);heatSensor(c,560,820,420,{on:1-ON(t,tbl-0.3,0.4),fog});
    armIn(c,1200,1900,905,1480,KIND2.leo.coat,SK[1],{w:110});sprayCan(c,900,1500,480,-0.7);sprayMist(c,770,1180,-2.3,2.2,t,1-ON(t,tbl,0.4));}
  cine(c,t,{v:0.55});};
// 19 · "At night, his crew slips in." four silhouettes tiptoe along the street to the doors
V.slip=(c,t,u,d)=>{const t0=V.slip.t0;cam(c,'s_night',{z:1.75,y:1240,x:480});
  const crew=[['monster',0.0],['genius',0.32],['leoN',0.64],['speedy',0.96]];crew.forEach(([k,dl],i)=>{const A=pp([-1.9-i*0.75,0,-1.0]),B=pp([1.6-i*0.75,0,-1.0]);const sc={monster:1.13,speedy:0.9,genius:1.05}[k]||1;
    walker(c,k,t,at(A),{x:B.x,y:B.y,s:B.s},t0-0.3,2.4,X('dot','up','o',{view:'3q',look:0.3}),{kind:'sneak',seed:i,stride:0.95});});
  c.restore();NIGHT(c);cine(c,t,{v:0.7});};
// 20 · "Tape over the light sensor." gloved hand, tape unrolls across the lens
V.tape=(c,t,u,d)=>{cam(c,'c_dark',{z:2.0,y:600,x:320});c.restore();blurBG(c,8,0.35);c.fillStyle='#9aa0aa';c.strokeStyle=OL;c.lineWidth=5;c.fillRect(470,520,180,80);c.strokeRect(470,520,180,80);
  const tt=wt('tape',65.2);const cx=560,cy=760;heatSensor(c,cx,cy,380,{on:1-ON(t,tt+0.9,0.2)});
  const k=EZ.io(clamp((t-tt)/0.9));c.save();c.translate(cx,cy+20);c.rotate(-0.08);c.fillStyle='rgba(200,190,150,0.92)';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-230,-60,460*k,120);c.strokeRect(-230,-60,460*k,120);c.strokeStyle='rgba(255,255,255,0.4)';c.lineWidth=3;for(let i=0;i<8;i++){if(i*60>460*k)break;c.beginPath();c.moveTo(-220+i*60,-55);c.lineTo(-200+i*60,55);c.stroke();}
  c.restore();
  // the Genius's gloved hand smoothing the tape down
  const hx=cx-230+460*k;armIn(c,hx+420,cy+760,hx+10,cy+40,'#4a5a3c','#1d1d24',{w:100});
  // headlamp beam from the Genius
  torch(c,820,1500,-2.0,900,0.6);cine(c,t,{v:0.65});};
// 21 · "A homemade aluminum plate to trick the magnetic lock." the Monster slides the plate between the sensor halves
V.plate=(c,t,u,d)=>{darkBG(c,t,'20,30,50');const tp=wt('plate',69.4),tt=wt('trick',70.3);
  const r=headWho(c,'monster',300,1240,3.0,X('dot','up','flat',{view:'3q',look:0.5}));
  const k=EZ.io(clamp((t-(tp-0.6))/0.9));hudCard(c,640,820,700,560,1,'120,180,255',(cc)=>{magnetIco(cc,240,t,k);
    if(t>tt){cc.save();cc.globalAlpha=ON(t,tt,0.3);cc.strokeStyle='#5aff8a';cc.lineWidth=14;cc.lineCap='round';cc.beginPath();cc.moveTo(-60,200);cc.lineTo(-10,250);cc.lineTo(90,150);cc.stroke();cc.restore();}},t);
  cine(c,t,{v:0.6});};
// 22 · "And the giant vault door?" low angle, tiny crew, enormous door
V.giant=(c,t,u,d)=>{cam(c,'c_dark',{z:K3(u,d,1.0,1.1),y:1000});const P=pp([0.0,0,-5.6]);
  ['genius','leoN','monster'].forEach((k,i)=>who(c,k,[0,0,0],Object.assign(Object.assign(X('dot','up','o',{view:'front'}),{back:1}),{abs:{x:P.x+(i-1)*90*P.s,y:P.y,s:P.s*({monster:1.13,genius:1.05}[k]||1)},f:1,rot:1e-4})));
  c.restore();NIGHT(c);torch(c,540,1600,-1.57,1100,0.7);cine(c,t,{v:0.7});};
// 23 · "They have a copy of the key… and, it's said, a hidden camera had already filmed the combination."
V.key=(c,t,u,d)=>{const tc=wt('and,',75.0);
  if(t<tc){darkBG(c,t,'50,40,20',{c1:'255,200,90',c2:'255,160,60',bokCol:'255,220,140',rayCol:'255,220,150'});godRays(c,540,1380,'255,210,120',0.1,t,12,1200);const k=popK(t,V.key.t0+0.2,0.5);headWho(c,'leoN',540,760,3.4,SMUG({view:'front'}));
    c.save();c.translate(540,1380);c.scale(k,k);vaultKey(c,0,0,760,-0.1+Math.sin(t*2)*0.03,{glow:1});c.restore();sparkBurst(c,700,1350,V.key.t0+0.5,t,300,12,'255,220,140');}
  else{// "flashback" tape look: the dial seen from a hidden camera above the door
    cam(c,'c_door0',{z:2.2,y:860,x:540});c.restore();c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(128,128,128,0.6)';c.fillRect(0,0,W,H);c.restore();tint(c,'rgba(60,120,60,0.25)');
    for(let i=0;i<H;i+=6){c.fillStyle='rgba(0,0,0,0.12)';c.fillRect(0,i,W,2);}
    const ty=(t*137)%H;c.fillStyle='rgba(255,255,255,0.08)';c.fillRect(0,ty,W,30);
    dial(c,837,986,82,Math.sin(t*1.8)*2.2);
    // REC frame
    c.strokeStyle='rgba(255,255,255,0.8)';c.lineWidth=6;for(const [x,y,sx,sy] of [[80,240,1,1],[1000,240,-1,1],[80,1640,1,-1],[1000,1640,-1,-1]]){c.beginPath();c.moveTo(x,y+sy*80);c.lineTo(x,y);c.lineTo(x+sx*80,y);c.stroke();}
    if(Math.sin(t*6)>0){c.fillStyle='#ff2a2a';c.beginPath();c.arc(150,320,22,0,TAU);c.fill();}
    spyCam(c,880,420,170,t,{rot:0.5});}
  cine(c,t,{v:0.55});};
// 24 · "The door swings open." light floods out over the crew
V.swing=(c,t,u,d)=>{const t0=V.swing.t0;const a=EZ.io(clamp((t-(t0+0.15))/1.5));const ids=['c_door0','c_door25','c_door60','c_door100','c_door160'];const f=a*(ids.length-1);const i0=Math.floor(f),i1=Math.min(ids.length-1,i0+1),w=f-i0;
  cam(c,ids[i0],{z:K3(u,d,1.15,1.25),y:1000});if(w>0){c.globalAlpha=w;c.drawImage(IMG[ids[i1]],0,0,W,H);c.globalAlpha=1;}
  const P=pp([0,0,-6.3]);['genius','leoN','monster','speedy'].forEach((k,i)=>who(c,k,[0,0,0],Object.assign(Object.assign(X('dot','up','o',{view:'front'}),{back:1}),{abs:{x:P.x+(i-1.5)*110*P.s,y:P.y+(i%2)*10,s:P.s*({monster:1.13,speedy:0.9,genius:1.05}[k]||1)},f:1,rot:1e-4,hf:i===2?[30,-10]:undefined})));
  c.restore();c.fillStyle=`rgba(4,6,14,${0.55*(1-a)})`;c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,820,40,540,820,700);g.addColorStop(0,`rgba(220,236,255,${0.5*a})`);g.addColorStop(1,'rgba(220,236,255,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  cine(c,t,{v:0.6});};
// 25 · "One by one, they crack 109 of the 189 boxes." the wall: doors popping open, counter
V.crack=(c,t,u,d)=>{const t0=V.crack.t0;richBG(c,t,'20,26,44',{rays:0,bok:6});const cols=7,rows=11,bw=136,bh=128,ox=540-cols*bw/2,oy=180;let n=0;
  const opened=Math.floor(lerp(0,109,clamp((t-(t0+0.3))/3.6)));
  for(let r=0;r<rows;r++)for(let q=0;q<cols;q++){const i=r*cols+q;const x=ox+q*bw,y=oy+r*bh;const op=hash(i*3.7)<0.58&&n<opened;if(hash(i*3.7)<0.58)n++;
    c.fillStyle='#0c0d10';c.fillRect(x+6,y+6,bw-12,bh-12);
    if(op){c.save();c.globalCompositeOperation='lighter';const og=c.createRadialGradient(x+bw/2,y+bh/2,4,x+bw/2,y+bh/2,bw*0.7);og.addColorStop(0,'rgba(160,210,255,0.35)');og.addColorStop(1,'rgba(160,210,255,0)');c.fillStyle=og;c.fillRect(x-bw*0.2,y-bh*0.2,bw*1.4,bh*1.4);c.restore();if(hash(i)<0.4)diamond(c,x+bw/2,y+bh/2+10,18,t,{seed:i});c.save();c.translate(x+6,y+6);c.transform(0.25,-0.08,0,1,0,0);const g=c.createLinearGradient(0,0,bw,0);g.addColorStop(0,'#b8bec8');g.addColorStop(1,'#7e8590');c.fillStyle=g;c.fillRect(0,0,bw-12,bh-12);c.strokeStyle=OL;c.lineWidth=4;c.strokeRect(0,0,bw-12,bh-12);c.restore();}
    else{const g=c.createLinearGradient(x,y,x+bw,y+bh);g.addColorStop(0,'#d6dbe2');g.addColorStop(1,'#8e95a0');c.fillStyle=g;c.fillRect(x+6,y+6,bw-12,bh-12);c.strokeStyle=OL;c.lineWidth=4;c.strokeRect(x+6,y+6,bw-12,bh-12);
      c.fillStyle='#c8a050';c.fillRect(x+bw/2-20,y+18,40,12);c.fillStyle='#d8c070';c.beginPath();c.arc(x+bw/2,y+bh/2+12,10,0,TAU);c.fill();}}
  // counter
  const cnt=Math.min(109,opened);c.save();c.shadowColor='rgba(255,200,60,0.7)';c.shadowBlur=40;c.fillStyle='rgba(10,10,16,0.9)';rr(c,200,1600,680,160,80);c.fill();c.shadowColor='transparent';c.strokeStyle='#ffd24a';c.lineWidth=6;rr(c,200,1600,680,160,80);c.stroke();c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.font='900 120px Montserrat, sans-serif';c.strokeStyle='#000';c.lineWidth=22;const s1=String(cnt),s2=' / 189';c.strokeText(s1+s2,540,1680);c.fillStyle='#ffd24a';c.fillText(s1+s2,540,1680);c.restore();
  // the Monster's crowbar swing (anticipation, strike)
  const ph=((t-t0)*1.4)%1;const sw=ph<0.4?-0.6*EZ.io(ph/0.4):lerp(-0.6,0.5,EZ.back(clamp((ph-0.4)/0.2)));if(ph>0.45&&ph<0.62){sparkBurst(c,700,1220,t-(ph-0.45)/1.4,t,160,12,'255,200,90');}
  c.save();c.translate(940,1500);c.rotate(sw);c.strokeStyle='#3a3e46';c.lineWidth=26;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(-260,-300);c.stroke();c.strokeStyle='#d83a2a';c.lineWidth=18;c.beginPath();c.moveTo(-200,-230);c.lineTo(-262,-302);c.lineTo(-300,-290);c.stroke();c.restore();
  cine(c,t,{v:0.5});};
// 26 · "Diamonds. Gold. Cash." three hits
V.loot=(c,t,u,d)=>{darkBG(c,t,'40,40,70');const b=[wt('diamonds',86.1),wt('gold',87.0),wt('cash',87.4)];let i=0;while(i<2&&t>=b[i+1])i++;const k=popK(t,b[i],0.3);
  godRays(c,540,960,i===1?'255,210,90':(i===2?'150,255,150':'170,220,255'),0.12*k,t,14,1300);c.save();c.translate(540,960);c.scale(k,k);if(i===0){diamondPile(c,0,140,620,t,40);for(let q=0;q<10;q++){const yy=((t*700+q*200)%1100)-700;diamond(c,(hash(q)-0.5)*500,yy,30,t,{seed:q,rot:t*3+q});}}
  else if(i===1){for(let r=0;r<3;r++)for(let q=0;q<3-r;q++)goldBar(c,(q-(2-r)/2)*230,160-r*110,220);}else{for(let q=0;q<3;q++)cashStack(c,(q-1)*240,140-(q%2)*40,220);for(let q=0;q<8;q++){const yy=((t*500+q*260)%1300)-800;c.save();c.translate((hash(q*3)-0.5)*700,yy);c.rotate(t*2+q);c.fillStyle='#8ab87a';c.strokeStyle=OL;c.lineWidth=4;c.fillRect(-70,-30,140,60);c.strokeRect(-70,-30,140,60);c.restore();}}
  c.restore();sparkBurst(c,540,960,b[i],t,420,14,i===1?'255,220,120':'255,255,255');cine(c,t,{v:0.6});};
// 27 · "Stuffed into bags until they can barely carry them." the Monster staggers, Speedy topples
V.bags=(c,t,u,d)=>{const t0=V.bags.t0;cam(c,'v_dark',{z:1.12,y:1100,x:540});
  // Speedy behind, straining to lift a bag that won't budge
  const S=pp([0.55,0,-2.0]);const strain=Math.sin(t*16)*0.04;const rs=who(c,'speedy',[0,0,0],Object.assign(X('squeeze','worried','grit',{view:'3q',sweat:2}),{abs:S,f:-1,hf:[22,108],hb:[14,110],crouch:34+Math.sin(t*16)*3,lean:0.42+strain,rot:1e-4,stance:26}));
  if(rs){const bw=0.62*MPX(S);lootBag(c,(rs.hf.x+rs.hb.x)/2-bw*0.1,S.y+2,bw,1,{sag:1.4,rot:strain});}
  // the Monster lumbers across with a heavy bag in each hand
  const A=pp([-1.05,0,-1.0]),B=pp([-0.35,0,-1.0]);const r=walker(c,'monster',t,A,B,t0,3.0,X('squeeze','worried','grit',{view:'3q',sweat:2}),{kind:'walk',stride:0.55,hfFix:[16,92],hbFix:[2,92],lean:0.1});
  if(r){const m=MPX(A);for(const [h,sc] of [[r.hb,0.55],[r.hf,0.6]]){lootBag(c,h.x,h.y+0.42*m*sc*1.1,0.62*m*sc,1,{sag:2,rot:Math.sin(t*5)*0.06});}}
  c.restore();NIGHT(c);cine(c,t,{v:0.65});};
// 28 · "By morning, they're gone." the empty vault, opened boxes, paper on the floor
V.gone=(c,t,u,d)=>{cam(c,'v_wide',{z:K3(u,d,1.3,1.18),y:1000});
  for(let i=0;i<16;i++){const x=-1.8+hash(i*3.3)*3.4,z=-2.4+hash(i*5.1)*2.6;flatAt(c,x,z,hash(i)*3,(cc)=>sheetFlat(cc,105,150));}
  c.restore();motes(c,t,40,'255,240,220');c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'rgba(255,220,170,0.18)');g.addColorStop(1,'rgba(255,220,170,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();cine(c,t,{v:0.5});};
// 29 · "The perfect crime." the getaway car rolls off at dawn; Leo's smirk in the window
V.perfect=(c,t,u,d)=>{const t0=V.perfect.t0;cam(c,'s_night',{z:1.6,y:1300,x:540});
  const go=EZ.in(clamp((t-(t0+0.6))/1.4));const xw=lerp(-0.4,9,go);const p=pp([xw,0,1.0]);const m=MPX(p),Lc=4.3*m;
  car2(c,p.x,p.y,Lc,{col:'#2e3e5e',t,moving:go>0?1:0,wheel:go>0?16:0,beams:1,front:seated('speedy',X('wide','worried','grit',{view:'3q'})),rear:seated('leoN',SMUG({view:'3q'}))});
  const k=Lc/600;V.perfect.sp=scr(c,{x:p.x+58*k,y:p.y-180*k,s:1});
  c.restore();tint(c,'rgba(255,170,120,0.18)');cine(c,t,{v:0.55});};
// 30 · "Almost." freeze-frame, desaturate, Speedy circled
V.almost=(c,t,u,d)=>{const tt=V.perfect.t0+1.2;V.perfect(c,tt,1,1);c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(128,128,128,0.9)';c.fillRect(0,0,W,H);c.restore();
  const sp=V.perfect.sp||{x:540,y:1400};spotOn(c,sp.x,sp.y,150,ON(t,V.almost.t0,0.2));};
// 31 · "One of them had a job. Burn the trash." Leo points; Speedy nods, lighter in hand, bags at his feet
V.job=(c,t,u,d)=>{const tb=wt('burn',98.1);cam(c,'s_night',{z:2.4,y:1330,x:560});
  // the getaway car parked at the kerb, behind them
  const cp=pp([-2.9,0,-0.1]);car2(c,cp.x,cp.y,4.3*MPX(cp),{col:'#2e3e5e',t,lights:0});
  const L=pp([0.75,0,0.4]),S=pp([-0.35,0,0.5]);const pt=ON(t,V.job.t0+0.2,0.3);
  who(c,'leoN',[0,0,0],Object.assign(X('dot','down','flat',{view:'3q'}),{abs:L,f:-1,hf:[lerp(14,74,pt),lerp(90,-4,pt)],rot:1e-4}));
  const nod=Math.max(0,Math.sin((t-V.job.t0)*9))*(t<V.job.t0+1.2?1:0);const rs=who(c,'speedy',[0,0,0],Object.assign(X('wide','worried','o',{view:'3q',sweat:1}),{abs:S,f:1,hf:t>tb?[30,28]:[16,88],hb:[-8,92],rot:1e-4,tilt:nod*0.12}));
  const m=MPX(S);trashBag(c,S.x-0.42*m,S.y+2,0.5*m);trashBag(c,S.x-0.82*m,S.y+4,0.45*m,{rot:-0.15});
  if(rs&&t>tb){const k=m/164;const fl=t>tb+0.25;const hx=rs.hf.x,hy=rs.hf.y;c.fillStyle='#c8c8cc';c.strokeStyle=OL;c.lineWidth=3*k;c.fillRect(hx-6*k,hy-26*k,12*k,22*k);c.strokeRect(hx-6*k,hy-26*k,12*k,22*k);
    if(fl){const fy=hy-34*k;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(hx,fy,2,hx,fy,90*k);g.addColorStop(0,'rgba(255,190,90,0.6)');g.addColorStop(1,'rgba(255,190,90,0)');c.fillStyle=g;c.fillRect(hx-90*k,fy-90*k,180*k,180*k);c.restore();
      c.fillStyle='#ffd27a';c.beginPath();c.moveTo(hx,fy-16*k+Math.sin(t*20)*2*k);c.quadraticCurveTo(hx+8*k,fy,hx,fy+6*k);c.quadraticCurveTo(hx-8*k,fy,hx,fy-16*k);c.fill();}}
  c.restore();NIGHT(c);cine(c,t,{v:0.6});};
// 32 · "Instead… he panicked. And dumped it in a forest by the highway."
V.panic=(c,t,u,d)=>{const t0=V.panic.t0;const td=wt('dumped',100.4),th=td+0.15;cam(c,'g_night',{z:1.12,y:1150,x:540});
  // his own car on the hard shoulder, hazards blinking
  const pc=pp([2.4,0,7.3]);const pm=MPX(pc);car2(c,pc.x,pc.y,4.3*pm,{col:'#2e3e5e',t,f:-1,hazard:1});
  // passing traffic on the far lane (moves along the road, scaled by distance)
  for(const [ofs,lane,dir,col] of [[0,11.6,1,'#8a8a92'],[1.6,8.6,-1,'#6a7a5a']]){const q=((t-t0+ofs)*0.45)%1;const xw=dir>0?lerp(-9,9,q):lerp(9,-9,q);const p=pp([xw,0,lane]);car2(c,p.x,p.y,4.3*MPX(p),{col,t,moving:1,wheel:18,beams:1,f:dir>0?1:-1});}
  // the guard rail is in front of the road: redraw its beam + posts over the traffic
  const r0=pp([-8,0.42,6.42]),r1=pp([8,0.42,6.42]),r2=pp([8,0.66,6.42]),r3=pp([-8,0.66,6.42]);c.fillStyle='#8a8e98';c.strokeStyle=OL;c.lineWidth=2;c.beginPath();c.moveTo(r0.x,r0.y);c.lineTo(r1.x,r1.y);c.lineTo(r2.x,r2.y);c.lineTo(r3.x,r3.y);c.closePath();c.fill();c.stroke();
  for(let i=-4;i<=4;i++){const a=pp([i*2,0,6.4]),b=pp([i*2,0.62,6.4]);c.strokeStyle='#6a6e78';c.lineWidth=0.08*MPX(a);c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}
  // Speedy: runs in from his car (right of frame), looks around wildly, then hurls both bags into the brush
  const A=pp([-1.5,0,1.9]),B=pp([0.15,0,1.3]);const m=MPX(B);
  if(t<th-0.35){const r=walker(c,'speedy',t,A,B,t0+0.1,1.2,X('shock','worried','o',{view:'3q',sweat:2,look:t>t0+1.3?Math.sin(t*14):0}),{kind:'run',f:-1,hfFix:[24,30],hbFix:[14,34]});
    if(r){trashBag(c,r.hf.x-0.1*m,r.hf.y+0.5*m,0.45*m);trashBag(c,r.hb.x+0.05*m,r.hb.y+0.5*m,0.42*m,{rot:0.2});}}
  else{const k=clamp(antic(t,th,0.3,0.3,0.45));const r=who(c,'speedy',[0,0,0],Object.assign(X('squeeze','worried','grit',{view:'3q',sweat:2}),{abs:B,f:-1,hf:[lerp(-34,60,k),lerp(30,-60,k)],hb:[lerp(-44,50,k),lerp(34,-50,k)],lean:lerp(-0.2,0.3,k),rot:1e-4,crouch:12}));
    if(t<th){if(r){trashBag(c,r.hf.x,r.hf.y+0.4*m,0.45*m);}}
    else{// ballistic flight in world space to where they land in the brush
      for(let i=0;i<2;i++){const q=clamp((t-th-i*0.06)/0.75);const x=lerp(0.3,0.78+i*0.22,q),z=lerp(1.3,0.6+i*0.15,q),y=0.9+Math.sin(q*Math.PI)*1.1-q*0.9;const p=pp([x,Math.max(0,y),z]);trashBag(c,p.x,p.y+(y<=0.01?0:0),0.45*MPX(p),{rot:q<1?q*5+i:0.3+i*0.4});}}}
  c.restore();NIGHT(c);cine(c,t,{v:0.6});};
// 33 · "The next morning, the landowner finds it." the farmer walks the edge of his woods, stops, stares
V.farmer=(c,t,u,d)=>{const t0=V.farmer.t0;const tf=wt('finds',105.0);cam(c,'g_dawn',{z:1.25,y:1220,x:560});
  for(let i=0;i<9;i++)flatAt(c,0.45+hash(i*3.1)*0.8,0.45+hash(i*4.7)*0.6,hash(i)*3,(cc)=>sheetFlat(cc,60,100));
  for(let i=0;i<2;i++){const p=pp([0.78+i*0.22,0,0.6+i*0.15]);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(p.x,p.y+2,0.28*MPX(p),0.07*MPX(p),0,0,TAU);c.fill();trashBag(c,p.x,p.y,0.45*MPX(p),{rot:0.3+i*0.4});}
  const A=pp([-1.4,0,1.5]),B=pp([0.2,0,1.2]);const surprised=t>tf;
  const r=walker(c,'farmer',t,A,B,t0-0.2,1.9,X(surprised?'shock':'dot',surprised?'up':'flat',surprised?'o':'flat',{view:'3q',look:surprised?-0.4:0}),{kind:'walk',stride:0.85,f:-1,hfFix:surprised?[34,-6]:[18,74]});
  if(r){const m=MPX(B);c.strokeStyle='#6a4a2a';c.lineWidth=0.05*m;c.lineCap='round';c.beginPath();c.moveTo(r.hf.x,r.hf.y-0.05*m);c.lineTo(r.hf.x-0.06*m,r.hf.y+0.95*m);c.stroke();}
  c.restore();cine(c,t,{v:0.45});};
// 34 · "Receipts. Diamond center envelopes. A security videotape. And a half-eaten salami sandwich."
V.items=(c,t,u,d)=>{const t0=V.items.t0;const tsw=wt('and',110.3);const dim=ON(t,tsw,0.4);
  cam(c,'g_floor',{z:lerp(K3(u,d,1.25,1.32),1.38,EZ.io(dim)),y:lerp(1060,1140,EZ.io(dim)),x:650});
  // two torn bags at the top of the spill
  for(const [x,z,r] of [[0.5,1.45,0.3],[0.05,1.55,-0.2]]){const p=pp([x,0,z]);trashBag(c,p.x,p.y,0.5*MPX(p),{rot:r});}
  const kr=popK(t,t0,0.3),ke=popK(t,wt('diamond',107.2),0.3),kv=popK(t,wt('a',108.5),0.3),ks=popK(t,tsw,0.4);
  if(kr>0){flatAt(c,0.46,0.92,0.4,(cc)=>{cc.scale(kr,kr);receipt(cc,0,0,60,0);receipt(cc,45,22,60,0.5);});standAt(c,0.44,0.74,(cc,x,y,m)=>evMarker(cc,x,y,1,kr*m/950));}
  if(ke>0){flatAt(c,0.08,0.98,-0.3,(cc)=>{cc.scale(ke,ke);envelope(cc,0,0,150,0.2);envelope(cc,-20,34,140,-0.15);});standAt(c,-0.1,0.86,(cc,x,y,m)=>evMarker(cc,x,y,2,ke*m/950));}
  if(kv>0){flatAt(c,0.42,0.55,0.2,(cc)=>{cc.scale(kv,kv);vhsTape(cc,0,0,120,0);});standAt(c,0.36,0.36,(cc,x,y,m)=>evMarker(cc,x,y,3,kv*m/950));}
  for(const tf of [t0+0.05,wt('diamond',107.2)+0.05,wt('a',108.5)+0.05])flashPop(c,tf,t,0.45);
  // the sandwich, lying on the leaves (bitten end toward us), lit as the camera pushes in
  if(ks>0){const p=pp([0.1,0,0.5]);const m=MPX(p);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(p.x,p.y+0.04*m,0.2*m,0.05*m,0,0,TAU);c.fill();
    c.save();c.translate(p.x,p.y);c.scale(ks,ks);sandwich(c,0,-0.03*m,0.36*m,0.1,{t,bite:1,glint:1,noShadow:1});c.restore();standAt(c,-0.12,0.42,(cc,x,y,mm)=>evMarker(cc,x,y,4,popK(t,tsw+0.4,0.35)*mm/950));}
  c.restore();
  if(dim>0){c.save();const g=c.createRadialGradient(540,1000,200,540,1000,1000);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${0.55*dim})`);c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
    godRays(c,560,1000,'255,210,150',0.1*dim,t,12,1200);sparkBurst(c,560,980,tsw+0.1,t,480,16,'255,230,170');flashPop(c,wt('sandwich',112.0),t,0.6);}
  cine(c,t,{v:0.5});};
// 35 · "Police follow the trail straight to the crew." the board fills: forest pin → string → four polaroids
V.board=(c,t,u,d)=>{const t0=V.board.t0;corkBG(c);
  const P=[['leoN',260,520,-0.06],['genius',820,500,0.07],['monster',260,1220,0.05],['speedy',820,1220,-0.08]];const pin={x:540,y:880};
  P.forEach(([k,x,y,r],i)=>{const kk=popK(t,t0+0.15+i*0.25,0.3);if(kk<=0)return;c.save();c.translate(x,y);c.scale(kk,kk);polaroid(c,0,0,330,r,(cc,px,py,w)=>{headWho(cc,k,px,py+w*0.2,1.65,X('dot','flat','flat',{view:'front'}));});c.restore();});
  // the forest snapshot in the middle + strings
  c.save();c.translate(pin.x,pin.y);c.rotate(0.04);polaroid(c,0,0,260,0,(cc,px,py,w)=>{cc.fillStyle='#4a5a3a';cc.fillRect(-w,-w,2*w,2*w);trashBag(cc,px-30,py+60,90);trashBag(cc,px+40,py+64,80);},{bg:'#6a7a5a'});c.restore();
  P.forEach(([k,x,y],i)=>redString(c,pin,{x,y:y-190},clamp((t-(t0+1.0+i*0.2))/0.5)));
  // police lights wash
  const bl=Math.sin(t*12)>0;c.save();c.globalCompositeOperation='lighter';c.fillStyle=bl?'rgba(60,100,255,0.14)':'rgba(255,50,50,0.14)';c.fillRect(0,0,W,H);c.restore();
  cine(c,t,{v:0.5});};
// 36 · "And DNA from that sandwich points to one of them." helix rises from the bite → the Monster's photo gets circled
V.dna=(c,t,u,d)=>{const t0=V.dna.t0;labBG(c,t);const td=wt('dna',115.3),tp=wt('points',116.4);
  // evidence tray under UV light
  c.save();c.shadowColor='rgba(150,110,255,0.8)';c.shadowBlur=60;c.fillStyle='#1a2030';rr(c,70,1380,620,230,30);c.fill();c.restore();c.strokeStyle='rgba(160,200,255,0.8)';c.lineWidth=4;rr(c,70,1380,620,230,30);c.stroke();
  sandwich(c,380,1470,620,0.06,{t,bite:1,noShadow:1});
  // scanning beam sweeps across the bite
  const sq=clamp((t-t0)/1.0);if(sq<1){const sx=lerp(90,680,sq);c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(sx-40,0,sx+40,0);g.addColorStop(0,'rgba(90,255,200,0)');g.addColorStop(0.5,'rgba(90,255,200,0.55)');g.addColorStop(1,'rgba(90,255,200,0)');c.fillStyle=g;c.fillRect(sx-40,1340,80,300);c.restore();}
  // the helix rises out of the bite
  const hk=clamp((t-td)/1.0);if(hk>0){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(560,1420,10,560,1420,200);g.addColorStop(0,`rgba(140,220,255,${0.5*hk})`);g.addColorStop(1,'rgba(140,220,255,0)');c.fillStyle=g;c.fillRect(360,1220,400,400);c.restore();}
  dnaNeon(c,560,1400,640,t,hk);
  // beam from helix top to the match panel
  const ak=clamp((t-tp)/0.45);if(ak>0){c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(120,230,255,0.9)';c.lineWidth=8;c.lineCap='round';c.shadowColor='rgba(120,230,255,1)';c.shadowBlur=30;c.beginPath();c.moveTo(560,760);c.lineTo(lerp(560,760,ak),lerp(760,640,ak));c.stroke();c.restore();}
  const mk=popK(t,tp+0.25,0.4);hudCard(c,760,420,440,520,mk,'90,255,150',(cc)=>{cc.save();cc.beginPath();cc.rect(-180,-220,360,360);cc.clip();cc.fillStyle='#2a3a4a';cc.fillRect(-180,-220,360,360);
      headWho(cc,'monster',0,-30,1.9,X(t>tp+0.8?'shock':'dot','flat',t>tp+0.8?'o':'flat',{view:'front'}));cc.restore();
      // match bars filling + check
      for(let q=0;q<4;q++){const fk=clamp((t-(tp+0.5+q*0.12))/0.4);cc.fillStyle='rgba(255,255,255,0.15)';cc.fillRect(-170,160+q*20,340,10);cc.fillStyle='#5aff96';cc.fillRect(-170,160+q*20,340*fk,10);}
      const ck=clamp((t-(tp+1.0))/0.3);if(ck>0){cc.save();cc.globalAlpha=ck;cc.fillStyle='#5aff96';cc.beginPath();cc.arc(150,-190,46,0,TAU);cc.fill();cc.strokeStyle='#06121e';cc.lineWidth=12;cc.lineCap='round';cc.beginPath();cc.moveTo(126,-190);cc.lineTo(144,-170);cc.lineTo(176,-208);cc.stroke();cc.restore();}},t);
  cine(c,t,{v:0.55});};
// 37 · "Five days later, Notarbartolo walks back into the diamond center like nothing happened." whistling strut
V.back=(c,t,u,d)=>{const t0=V.back.t0;cam(c,'s_door',{z:K3(u,d,1.25,1.32),y:1100,x:400});
  const A=pp([-0.75,0,-1.4]),B=pp([0.1,0,-1.6]);const r=walker(c,'leo',t,A,B,t0+0.2,3.6,X('happy','up','o',{view:'3q'}),{kind:'strut',hfFix:[14,70]});
  if(r)briefcase(c,r.hf.x,r.hf.y,A.s*1.2);c.restore();
  // whistle notes + "+5 days" calendar flick
  for(let i=0;i<4;i++){const q=((t-t0)*0.8+i*0.25)%1;if(t<t0+0.4)break;c.save();c.globalAlpha=Math.sin(q*Math.PI);c.translate(560+q*120,640-q*220);c.fillStyle='#ffe08a';c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.ellipse(0,0,18,13,-0.4,0,TAU);c.fill();c.stroke();c.fillRect(14,-60,6,60);c.strokeRect(14,-60,6,60);c.restore();}
  const ck=popK(t,t0,0.3)*(1-ON(t,t0+1.6,0.3));if(ck>0){c.save();c.translate(170,340);c.scale(ck*0.5,ck*0.5);calPage(c,0,0,300,'FEB',21,1,{});c.restore();}
  cine(c,t,{v:0.45});};
// 38 · "The police are waiting." two officers step out; Leo jumps
V.wait=(c,t,u,d)=>{const t0=V.wait.t0;cam(c,'s_door',{z:1.42,y:1080,x:560});const tj=t0+0.45;
  const L=pp([0.1,0,-1.55]);const j=t>tj?Math.max(0,Math.sin(clamp((t-tj)/0.35)*Math.PI))*40:0;
  const c1=pp([-0.5,0,-2.0]),c2=pp([0.7,0,-2.0]);const ck=EZ.out(clamp((t-t0)/0.5));
  who(c,'cop',[0,0,0],Object.assign(X('dot','down','flat',{view:'3q'}),{abs:{x:lerp(c1.x-120,c1.x,ck),y:c1.y,s:c1.s},f:1,rot:1e-4,hf:[26,40]}));
  who(c,'cop2',[0,0,0],Object.assign(X('dot','down','flat',{view:'3q'}),{abs:{x:lerp(c2.x+120,c2.x,ck),y:c2.y,s:c2.s},f:-1,rot:1e-4,hf:[26,40]}));
  const r=who(c,'leo',[0,0,0],Object.assign(X(t>tj?'shock':'happy',t>tj?'up':'flat',t>tj?'o':'smile',{view:'front',sweat:t>tj?2:0}),{abs:{x:L.x,y:L.y-j*L.s,s:L.s},f:1,rot:1e-4,hf:t>tj?[40,-30]:[14,70],hb:t>tj?[-40,-30]:undefined}));
  if(r&&t<tj)briefcase(c,r.hf.x,r.hf.y,L.s*1.2);
  c.restore();if(t>tj){const q=clamp((t-tj)/0.5);c.save();c.translate(540,520);c.scale(EZ.back(q),EZ.back(q));c.fillStyle='#ff3a3a';c.strokeStyle=OL;c.lineWidth=6;c.font='900 150px Montserrat, sans-serif';c.textAlign='center';c.lineWidth=20;c.strokeText('!',0,0);c.fillText('!',0,0);c.restore();}
  cine(c,t,{v:0.5});};
// 39 · "10 years in prison." the bars slam, ten tally marks
V.prison=(c,t,u,d)=>{const t0=V.prison.t0;prisonCell(c,t,0,Math.min(10,Math.floor(clamp((t-(t0+0.4))/1.2)*10+0.001)));
  const P={x:560,y:1640,s:2.3};who(c,'leo',[0,0,0],Object.assign(X('half','worried','frown',{view:'front'}),{abs:P,f:1,rot:1e-4,hf:[20,90],hb:[-20,90]}));
  const sl=EZ.out(clamp((t-t0)/0.35));c.save();shake(c,t-t0>0.3&&t-t0<0.6?0.5:0,t);barsFront(c,t,sl);c.restore();cine(c,t,{v:0.6});};
// 40 · "But here's the craziest part." fast push on a single diamond in the dark
V.twist=(c,t,u,d)=>{darkBG(c,t,'30,40,80');godRays(c,540,940,'170,220,255',0.16,t,16,1400);const z=lerp(0.6,1.25,EZ.io(u/d));c.save();c.translate(540,940);c.scale(z,z);diamond(c,0,0,240,t,{spark:0.8});c.restore();sparkBurst(c,540,900,V.twist.t0+0.2,t,500,18);cine(c,t,{v:0.6});};
// 41 · "Most of the diamonds were never found." an empty bag, question marks drifting
V.never=(c,t,u,d)=>{darkBG(c,t,'40,30,30',{c1:'255,200,90',bokCol:'255,220,140'});c.save();c.globalCompositeOperation='lighter';const sp=c.createRadialGradient(540,1200,40,540,1200,600);sp.addColorStop(0,'rgba(255,220,150,0.3)');sp.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=sp;c.fillRect(0,0,W,H);c.restore();lootBag(c,540,1340,560,0.25,{sag:1});const k=popK(t,wt('never',129.8),0.4);
  for(let i=0;i<5;i++){const q=((t*0.25+i*0.2)%1);qMark(c,200+i*170,1100-q*600,90+hash(i)*60,Math.sin(q*Math.PI)*k,Math.sin(t+i)*0.3);}cine(c,t,{v:0.6});};
// 42 · "Which means somewhere out there… 100 million dollars is still hidden." the camera sinks under the forest floor: a buried case, glowing
V.hidden=(c,t,u,d)=>{const t0=V.hidden.t0;const dy=-EZ.io(clamp((t-(t0+0.6))/2.2))*1000;c.save();c.translate(0,dy);
  cam(c,'g_night',{z:1.0,y:960});c.restore();
  const gy=1920;const eg=c.createLinearGradient(0,gy,0,gy+1100);eg.addColorStop(0,'#3a2a1c');eg.addColorStop(1,'#140c08');c.fillStyle=eg;c.fillRect(0,gy,W,1200);c.fillStyle='#4a3a26';c.fillRect(0,gy,W,26);speckles(c,0,gy,W,1100,260,'rgba(255,220,180,0.1)');
  c.strokeStyle='#4a3424';c.lineWidth=14;c.lineCap='round';for(const [x0,x1] of [[60,140],[1000,930],[880,760]]){c.beginPath();c.moveTo(x0,gy);c.bezierCurveTo(x0,gy+180,x1+40,gy+260,x1,gy+560);c.stroke();}
  const bx=540,by=gy+640;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(bx,by,20,bx,by,420);g.addColorStop(0,'rgba(140,210,255,0.45)');g.addColorStop(1,'rgba(140,210,255,0)');c.fillStyle=g;c.fillRect(0,gy,W,1200);c.restore();
  c.fillStyle='#4a3a2a';c.strokeStyle=OL;c.lineWidth=6;rr(c,bx-240,by-80,480,200,20);c.fill();c.stroke();c.fillStyle='#2a1c12';c.beginPath();c.moveTo(bx-240,by-80);c.lineTo(bx-200,by-200);c.lineTo(bx+260,by-180);c.lineTo(bx+240,by-80);c.closePath();c.fill();c.stroke();
  diamondPile(c,bx,by-70,380,t,22);c.fillStyle='#c8a050';c.fillRect(bx-30,by-10,60,40);c.strokeRect(bx-30,by-10,60,40);
  c.restore();
  const k=popK(t,wt('100',132.4),0.4);if(k>0)rollDigits(c,540,560,110,t,wt('100',132.4),'$100,000,000');
  cine(c,t,{v:0.6});};

VSEQ.push(['open',0],['door',wt('vault',3.7)],['sand',wt('and',6.0)],['crew',wt('give',9.8)],['lunch',wt('and',13.4)],['antwerp',wt('antwerp',15.8)],['capital',wt('the',17.4)],['under',wt('two',19.7)],
  ['layers',wt('heat',23.8)-0.1],['nobody',wt('nobody',31.9)],['leo',wt('then',36.1)],['office',wt('he',39.7)],['trader',wt('he',42.1)],['box',wt('he',44.1)],['years',wt('for',48.4)],['feb',wt('february',53.8)],['night',wt('a',55.8)],
  ['spray',wt('that',57.5)],['slip',wt('at',63.5)],['tape',wt('tape',65.2)],['plate',wt('a',67.3)],['giant',wt('and',72.0)],['key',wt('they',73.5)],['swing',wt('the',79.5)],['crack',wt('one',81.3)],['loot',wt('diamonds',86.1)],
  ['bags',wt('bags',88.6)-0.15],['gone',wt('by',91.6)],['perfect',wt('the',93.8)],['almost',wt('almost',95.5)],['job',wt('one',96.5)],['panic',wt('he',99.4)-0.3],['farmer',wt('the',103.5)],['items',wt('receipts',106.1)],
  ['board',wt('police',112.6)],['dna',wt('and',115.0)],['back',wt('five',117.8)],['wait',wt('the',122.9)],['prison',wt('10',124.6)],['twist',wt('but',126.5)],['never',wt('most',128.3)],['hidden',wt('which',130.6)]);
VSEQ.forEach(([k,t0])=>{V[k].t0=t0;});
VSEQ.forEach(([k,t0])=>SHOTS.push([t0,(c,t,u,d)=>V[k](c,t,u,d)]));
SHOTS.sort((a,b)=>a[0]-b[0]);
// ---------- thumbnail ----------
SHOTS.push([200,(c,t)=>{T=3.0;richBG(c,T,'60,40,20',{c1:'255,170,90',c2:'255,120,60',bokCol:'255,200,140',rayCol:'255,210,160'});godRays(c,540,900,'255,210,140',0.16,T,16,1500);
  headWho(c,'leoN',540,470,3.0,X('shock','up','o',{view:'front',sweat:2}));
  diamondPile(c,540,1330,900,T,44);
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1000,40,540,1000,560);g.addColorStop(0,'rgba(255,220,150,0.35)');g.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  sandwich(c,540,1010,1000,-0.08,{t:T,bite:1,glint:0});
  c.save();c.textAlign='center';const L1=(s,y,sz,col)=>txt(c,s,540,y,sz,col,{sw:sz*0.2,ls:2});L1('$100 MILLION HEIST',1580,84,'#fff');L1('RUINED BY A SANDWICH',1695,76,'#ff2b2b');c.restore();}]);
SHOTS.sort((a,b)=>a[0]-b[0]);
