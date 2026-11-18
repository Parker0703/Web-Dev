'use strict';
// ===================== Ching Shih · props =====================
// clip to everything ABOVE the water surface (so hulls sit in the sea, cut by a gently moving waterline)
function aboveWater(c,k,t,ph=0){c.beginPath();c.moveTo(-420*k,-1200*k);c.lineTo(420*k,-1200*k);c.lineTo(420*k,0);for(let i=24;i>=0;i--){const xx=-420*k+i*840*k/24;c.lineTo(xx,Math.sin(i*1.3+t*3+ph)*4*k);}c.closePath();c.clip();}
function foamLine(c,k,t,w=300,ph=0){c.strokeStyle='rgba(255,255,255,0.85)';c.lineWidth=4*k;c.beginPath();for(let i=0;i<=24;i++){const xx=-w*k+i*2*w*k/24;c.lineTo(xx,Math.sin(i*1.3*(420/w)+t*3+ph)*4*k-1*k);}c.stroke();
  c.fillStyle='rgba(255,255,255,0.6)';for(let i=0;i<9;i++){c.beginPath();c.ellipse((-w+hash(i)*2*w)*k,(3+hash(i*3)*6)*k,(10+hash(i*5)*16)*k,2.5*k,0,0,TAU);c.fill();}
  c.save();c.globalAlpha=0.25;c.fillStyle='#0a2030';c.beginPath();c.ellipse(0,10*k,w*1.05*k,14*k,0,0,TAU);c.fill();c.restore();}
// ---------- Chinese junk, side view. x,y = waterline centre; L = length px; o.f=-1 faces left
// o.sail: sail colour ('red' pirate | 'tan' navy | 'white'), o.flag colour, o.fire 0..1, o.crew [{kind,face}], o.cannon (time of a shot)
const JUNK_CREW_X=[-150,-110,-70,-30,10];
function junk(c,x,y,L,o={}){const k=L/600,t=o.t??T;c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,o.seed||0);c.rotate(Math.sin(t*1.1+(o.seed||0))*0.025);c.lineJoin='round';c.lineCap='round';
  const sail=o.sail||'red';const SC={red:['#b8301e','#d84a32','#8a2216'],tan:['#c8a878','#e0c898','#9a7c50'],white:['#e8e4d8','#f8f4ea','#b8b4a8']}[sail];
  // masts + battened lug sails (foremast, mainmast, mizzen), drawn behind the hull top
  const masts=[[150,330,150],[10,420,190],[-170,300,140]];
  for(const [mx,mh,sw] of masts){c.strokeStyle=OL;c.lineWidth=12*k;c.beginPath();c.moveTo(mx*k,-40*k);c.lineTo(mx*k,-(mh+40)*k);c.stroke();c.strokeStyle='#5a3a22';c.lineWidth=7*k;c.stroke();
    const top=-(mh+10)*k,bot=-80*k,left=(mx-sw*0.75)*k,right=(mx+sw*0.35)*k;const bil=Math.sin(t*1.6+mx)*6*k;
    c.beginPath();c.moveTo(left+10*k,top+20*k);c.quadraticCurveTo((left+right)/2,top-10*k,right,top);c.quadraticCurveTo(right+18*k+bil,(top+bot)/2,right+6*k,bot);c.lineTo(left-10*k,bot+10*k);c.quadraticCurveTo(left-26*k+bil,(top+bot)/2,left+10*k,top+20*k);c.closePath();
    const g=c.createLinearGradient(left,0,right,0);g.addColorStop(0,SC[2]);g.addColorStop(0.45,SC[1]);g.addColorStop(1,SC[0]);c.fillStyle=g;c.fill();c.strokeStyle=OL;c.lineWidth=OLW(k);c.stroke();
    // battens: the ribs that make a junk sail look like a junk
    c.strokeStyle='#3a2416';c.lineWidth=4.5*k;const n=7;for(let i=1;i<n;i++){const u=i/n;const yy=lerp(top+12*k,bot,u);c.beginPath();c.moveTo(lerp(left+6*k,left-12*k,u)+Math.sin(u*Math.PI)*(-14*k+bil),yy+u*6*k);c.quadraticCurveTo((left+right)/2,yy+8*k,lerp(right,right+8*k,u)+Math.sin(u*Math.PI)*(12*k+bil),yy);c.stroke();}
    c.strokeStyle='rgba(255,230,200,0.25)';c.lineWidth=2*k;for(let i=0;i<4;i++){c.beginPath();c.moveTo(lerp(left,right,0.2+i*0.2),top+20*k);c.lineTo(lerp(left,right,0.15+i*0.2),bot);c.stroke();}
    // sheet lines fanning from the sail edge
    c.strokeStyle='rgba(30,20,10,0.55)';c.lineWidth=1.6*k;for(let i=1;i<n;i++){const yy=lerp(top+12*k,bot,i/n);c.beginPath();c.moveTo(left-8*k,yy);c.lineTo(left-40*k,-60*k);c.stroke();}}
  // flags at the masthead / stern
  const fc=o.flag||'#c8201a';const fw=Math.sin(t*6+(o.seed||0))*5*k;for(const [fx,fy,fs] of [[10,-470,1],[-250,-250,0.8]]){c.fillStyle=fc;c.strokeStyle=OL;c.lineWidth=3*k;c.beginPath();c.moveTo(fx*k,fy*k);c.quadraticCurveTo((fx-40*fs)*k,(fy-6)*k+fw,(fx-80*fs)*k,(fy+4)*k+fw);c.lineTo((fx-80*fs)*k,(fy+40*fs)*k+fw);c.quadraticCurveTo((fx-40*fs)*k,(fy+30*fs)*k+fw,fx*k,(fy+40*fs)*k);c.closePath();c.fill();c.stroke();}
  // crew stand ON the deck behind the bulwark (drawn before the hull, so the hull side hides their legs); true scale for a ~32 m junk
  if(o.crew){const railY=x0=>{const u=clamp((x0+250)/430);return (1-u)*(1-u)*-110+2*u*(1-u)*-78+u*u*-92;};
    o.crew.forEach((cr,i)=>{const lx=JUNK_CREW_X[i%JUNK_CREW_X.length];const cx=lx*k,cy=(railY(lx)+17)*k;who(c,cr.kind,[0,0,0],Object.assign({},cr.face||X('dot','flat','flat',{view:'3q'}),{abs:{x:cx,y:cy,s:0.13*k},f:1,air:1,rot:1e-4,hf:cr.hf}));});}
  // hull: high square stern, upswept bow, wales, planking, painted eye, gunports
  const hull=()=>{c.beginPath();c.moveTo(-290*k,-150*k);c.lineTo(-250*k,-150*k);c.lineTo(-250*k,-110*k);c.quadraticCurveTo(-60*k,-78*k,180*k,-92*k);c.quadraticCurveTo(260*k,-100*k,300*k,-128*k);c.lineTo(290*k,-80*k);c.quadraticCurveTo(250*k,10*k,140*k,24*k);c.lineTo(-200*k,24*k);c.quadraticCurveTo(-276*k,10*k,-286*k,-40*k);c.closePath();};
  hull();const hg=c.createLinearGradient(0,-150*k,0,30*k);hg.addColorStop(0,'#7a4a28');hg.addColorStop(0.5,'#5a3418');hg.addColorStop(1,'#2a180c');c.fillStyle=hg;c.fill();
  c.save();hull();c.clip();c.strokeStyle='rgba(20,10,4,0.55)';c.lineWidth=2.5*k;for(let i=0;i<8;i++){const yy=-110*k+i*18*k;c.beginPath();c.moveTo(-300*k,yy+6*k);c.quadraticCurveTo(0,yy+18*k,300*k,yy-14*k);c.stroke();}
  c.fillStyle='#c83a2a';c.beginPath();c.moveTo(-300*k,-70*k);c.quadraticCurveTo(0,-56*k,300*k,-92*k);c.lineTo(300*k,-80*k);c.quadraticCurveTo(0,-44*k,-300*k,-58*k);c.closePath();c.fill();
  c.fillStyle='#e8c060';c.beginPath();c.moveTo(-300*k,-46*k);c.quadraticCurveTo(0,-34*k,300*k,-66*k);c.lineTo(300*k,-61*k);c.quadraticCurveTo(0,-29*k,-300*k,-41*k);c.closePath();c.fill();
  // stern panel decoration
  c.fillStyle='#9a2a22';c.fillRect(-286*k,-148*k,40*k,96*k);c.strokeStyle='#e8c060';c.lineWidth=3*k;c.strokeRect(-280*k,-140*k,28*k,80*k);c.restore();
  c.strokeStyle=OL;c.lineWidth=OLW(k);hull();c.stroke();
  // the bow eye (oculus) that lets the ship "see" the way
  c.fillStyle='#f4f0e6';c.beginPath();c.ellipse(236*k,-88*k,20*k,13*k,-0.25,0,TAU);c.fill();c.stroke();c.fillStyle='#14100c';c.beginPath();c.arc(240*k,-88*k,7*k,0,TAU);c.fill();
  // gunports with cannon muzzles
  for(let i=0;i<5;i++){const gx=(-170+i*80)*k,gy=-62*k+i*-2*k;c.fillStyle='#14100c';c.fillRect(gx-12*k,gy-10*k,24*k,18*k);c.fillStyle='#2a2a30';c.beginPath();c.arc(gx,gy-1*k,7*k,0,TAU);c.fill();}
  // rail + crew heads along the deck
  c.strokeStyle='#3a2416';c.lineWidth=5*k;c.beginPath();c.moveTo(-246*k,-120*k);c.quadraticCurveTo(-60*k,-92*k,180*k,-106*k);c.stroke();
  // cannon fire: muzzle flash + smoke ball
  if(o.cannon!=null){const q=(t-o.cannon);if(q>=0&&q<1.4){const gx=(-170+((o.gun||2))*80)*k;c.save();if(q<0.15){c.globalCompositeOperation='lighter';const fg=c.createRadialGradient(gx+40*k,-62*k,2,gx+40*k,-62*k,90*k);fg.addColorStop(0,'rgba(255,240,180,1)');fg.addColorStop(0.4,'rgba(255,150,40,0.8)');fg.addColorStop(1,'rgba(255,90,20,0)');c.fillStyle=fg;c.fillRect(gx-60*k,-160*k,200*k,200*k);c.globalCompositeOperation='source-over';}
    for(let i=0;i<6;i++){const r=(20+q*70+i*6)*k;c.fillStyle=`rgba(220,215,205,${0.7*(1-q/1.4)})`;c.beginPath();c.arc(gx+(30+q*90+i*12)*k,-62*k-(q*40+hash(i)*30)*k,r,0,TAU);c.fill();}c.restore();}}
  // fire on deck + black smoke (burning ship)
  if(o.fire){c.save();for(let i=0;i<14;i++){const u=((t*0.6+hash(i))%1);c.fillStyle=`rgba(30,26,24,${0.55*(1-u)})`;c.beginPath();c.arc((-150+hash(i*3)*300)*k+u*40*k,(-130-u*380)*k,(30+u*60)*k,0,TAU);c.fill();}
    c.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const fx=(-160+i*34)*k,fh=(60+Math.sin(t*12+i)*20)*k*o.fire;const fg=c.createLinearGradient(0,-100*k,0,-100*k-fh);fg.addColorStop(0,'rgba(255,170,40,0.9)');fg.addColorStop(1,'rgba(255,60,20,0)');c.fillStyle=fg;c.beginPath();c.moveTo(fx-16*k,-100*k);c.quadraticCurveTo(fx,-100*k-fh*1.2,fx+16*k,-100*k);c.closePath();c.fill();}c.restore();}
  c.restore();foamLine(c,k,t,300,o.seed||0);c.restore();}
// ---------- a British East Indiaman (3 masts, square rig) ----------
function westShip(c,x,y,L,o={}){const k=L/600,t=o.t??T;c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,1);c.rotate(Math.sin(t*1.1+1)*0.02);c.lineJoin='round';
  for(const [mx,mh] of [[170,430],[10,500],[-150,400]]){c.strokeStyle=OL;c.lineWidth=11*k;c.beginPath();c.moveTo(mx*k,-60*k);c.lineTo(mx*k,-mh*k);c.stroke();c.strokeStyle='#4a3020';c.lineWidth=6*k;c.stroke();
    for(let r=0;r<3;r++){const w=(150-r*30)*k,yy=-(120+r*110)*k,h=(95-r*12)*k;const bil=Math.sin(t*1.5+mx+r)*5*k;c.fillStyle='#eeeadc';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.8;c.beginPath();c.moveTo(mx*k-w/2,yy-h);c.lineTo(mx*k+w/2,yy-h);c.quadraticCurveTo(mx*k+w/2+10*k+bil,yy-h/2,mx*k+w/2,yy);c.lineTo(mx*k-w/2,yy);c.quadraticCurveTo(mx*k-w/2+10*k+bil,yy-h/2,mx*k-w/2,yy-h);c.closePath();c.fill();c.stroke();
      c.strokeStyle='#4a3020';c.lineWidth=5*k;c.beginPath();c.moveTo(mx*k-w/2-6*k,yy-h);c.lineTo(mx*k+w/2+6*k,yy-h);c.stroke();}}
  // ensign
  const fw=Math.sin(t*6)*5*k;c.fillStyle='#c8201a';c.strokeStyle=OL;c.lineWidth=3*k;c.fillRect(-300*k,-260*k+fw,90*k,56*k);c.strokeRect(-300*k,-260*k+fw,90*k,56*k);c.fillStyle='#1e2a6a';c.fillRect(-300*k,-260*k+fw,40*k,26*k);
  const hull=()=>{c.beginPath();c.moveTo(-290*k,-130*k);c.lineTo(250*k,-110*k);c.lineTo(330*k,-130*k);c.lineTo(290*k,-60*k);c.quadraticCurveTo(250*k,20*k,150*k,26*k);c.lineTo(-220*k,26*k);c.quadraticCurveTo(-286*k,10*k,-290*k,-130*k);c.closePath();};
  hull();c.fillStyle='#1a1a20';c.fill();c.save();hull();c.clip();c.fillStyle='#e8c050';c.fillRect(-300*k,-74*k,640*k,16*k);for(let i=0;i<9;i++){c.fillStyle='#14141a';c.fillRect((-230+i*55)*k,-72*k,20*k,12*k);}c.restore();c.strokeStyle=OL;c.lineWidth=OLW(k);hull();c.stroke();
  c.restore();foamLine(c,k,t,320,1);c.restore();}
// ---------- living sea surface: wave crests anchored in world space (move with the camera) ----------
function seaLife(c,t,o={}){const z0=o.z0??-6,z1=o.z1??-180,n=o.n??220;c.save();for(let i=0;i<n;i++){const z=lerp(z0,z1,Math.pow(hash(i*1.7),1.8));const x=(hash(i*3.3)-0.5)*Math.abs(z)*1.6+Math.sin(t*0.6+i)*0.6;const p=pp([x,0,z]);if(p.w<=0.1)continue;const m=164*p.s;const ph=(t*0.8+hash(i*5))%1;
    c.strokeStyle=`rgba(240,250,255,${0.55*Math.sin(ph*Math.PI)})`;c.lineWidth=Math.max(1,0.06*m);c.beginPath();c.moveTo(p.x-0.9*m,p.y);c.quadraticCurveTo(p.x,p.y-0.12*m,p.x+0.9*m,p.y);c.stroke();}c.restore();}
// ---------- the flower boat (floating brothel): painted hull, curved roof cabin, lanterns ----------
function flowerBoat(c,x,y,L,o={}){const k=L/600,t=o.t??T;c.save();c.translate(x,y);c.save();aboveWater(c,k,t*0.7,2);c.rotate(Math.sin(t*0.9)*0.012);c.lineJoin='round';
  // cabin with curved roof
  c.fillStyle='#8a2a22';c.strokeStyle=OL;c.lineWidth=OLW(k);c.fillRect(-230*k,-210*k,440*k,120*k);c.strokeRect(-230*k,-210*k,440*k,120*k);
  for(let i=0;i<6;i++){const wx=(-205+i*72)*k;c.fillStyle='#ffd88a';c.fillRect(wx,-190*k,52*k,70*k);c.strokeStyle='#3a1a10';c.lineWidth=3*k;c.strokeRect(wx,-190*k,52*k,70*k);c.beginPath();c.moveTo(wx+26*k,-190*k);c.lineTo(wx+26*k,-120*k);c.moveTo(wx,-155*k);c.lineTo(wx+52*k,-155*k);c.stroke();}
  c.fillStyle='#2a3a3a';c.strokeStyle=OL;c.lineWidth=OLW(k);c.beginPath();c.moveTo(-270*k,-206*k);c.quadraticCurveTo(-250*k,-232*k,-200*k,-250*k);c.lineTo(180*k,-250*k);c.quadraticCurveTo(230*k,-232*k,250*k,-206*k);c.quadraticCurveTo(0,-196*k,-270*k,-206*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#e8c060';c.lineWidth=3*k;c.beginPath();c.moveTo(-262*k,-212*k);c.quadraticCurveTo(0,-202*k,242*k,-212*k);c.stroke();
  // lanterns swinging under the eaves
  for(let i=0;i<5;i++){const lx=(-200+i*95)*k,sw=Math.sin(t*1.5+i)*4*k;c.strokeStyle='#3a1a10';c.lineWidth=2*k;c.beginPath();c.moveTo(lx,-206*k);c.lineTo(lx+sw,-180*k);c.stroke();c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(lx+sw,-166*k,2,lx+sw,-166*k,60*k);lg.addColorStop(0,'rgba(255,140,60,0.5)');lg.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=lg;c.fillRect(lx-60*k,-226*k,120*k,120*k);c.restore();
    c.fillStyle='#e8342a';c.strokeStyle=OL;c.lineWidth=2.5*k;c.beginPath();c.ellipse(lx+sw,-166*k,13*k,16*k,0,0,TAU);c.fill();c.stroke();c.fillStyle='#f0c860';c.fillRect(lx+sw-6*k,-184*k,12*k,4*k);c.fillRect(lx+sw-6*k,-152*k,12*k,4*k);}
  // people standing ON the deck (feet behind the side rail, drawn before the hull)
  if(o.deck)o.deck(c,k);
  // hull
  const hull=()=>{c.beginPath();c.moveTo(-300*k,-96*k);c.lineTo(290*k,-96*k);c.quadraticCurveTo(300*k,-40*k,240*k,10*k);c.lineTo(-250*k,10*k);c.quadraticCurveTo(-306*k,-40*k,-300*k,-96*k);c.closePath();};
  hull();const hg=c.createLinearGradient(0,-96*k,0,10*k);hg.addColorStop(0,'#c8402a');hg.addColorStop(1,'#5a1a12');c.fillStyle=hg;c.fill();c.save();hull();c.clip();c.fillStyle='#e8c060';c.fillRect(-310*k,-80*k,620*k,8*k);for(let i=0;i<12;i++){c.fillStyle='#2a6a5a';c.beginPath();c.arc((-270+i*48)*k,-50*k,10*k,0,TAU);c.fill();}c.restore();c.strokeStyle=OL;c.lineWidth=OLW(k);hull();c.stroke();
  c.restore();
  // warm lantern reflections shimmering on the river below the boat
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const lx=(-200+i*95)*k;for(let j=0;j<4;j++){c.fillStyle=`rgba(255,150,70,${0.28-j*0.06})`;c.fillRect(lx-10*k+Math.sin(t*3+i+j)*4*k,(8+j*12)*k,20*k,4*k);}}c.restore();
  foamLine(c,k,t*0.7,300,2);c.restore();}
// ---------- treasure chest of loot ----------
function chest(c,x,y,w,open=1,t=T){const k=w/200;c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=OLW(k);
  c.fillStyle='#6a3a1e';rr(c,-w/2,-80*k,w,80*k,8*k);c.fill();c.stroke();c.fillStyle='#c8a050';for(const xx of [-0.4,0,0.4])c.fillRect(xx*w-6*k,-80*k,12*k,80*k);
  if(open>0){for(let i=0;i<18;i++){const cx=(hash(i)-0.5)*w*0.8,cy=-80*k-hash(i*3)*26*k;c.fillStyle='#f0c840';c.beginPath();c.ellipse(cx,cy,12*k,7*k,0,0,TAU);c.fill();c.strokeStyle='#8a6a10';c.lineWidth=2*k;c.stroke();}
    c.save();c.translate(0,-80*k);c.rotate(-open*1.1);c.fillStyle='#5a3018';c.strokeStyle=OL;c.lineWidth=OLW(k);c.beginPath();c.moveTo(-w/2,0);c.quadraticCurveTo(0,-50*k,w/2,0);c.lineTo(w/2,-6*k);c.closePath();c.fill();c.stroke();c.restore();}
  c.restore();}
// ===================== DETAIL PASS: richer water, junks, western ships =====================
// sea surface overlay in world space: swell bands, sun glitter, whitecaps and crest lines (all anchored via pp)
function seaSurface(c,t,o={}){const z0=o.z0??-8,z1=o.z1??-900;c.save();
  // swell bands: soft light/dark ribbons running across, rolling toward camera
  for(let i=0;i<40;i++){const u=((i/40)+t*0.012)%1;const z=lerp(z0,z1,Math.pow(u,2.2));const a=pp([-2000,0,z]),b=pp([2000,0,z]);if(a.w<=0.1)continue;const th=Math.max(1,(pp([0,0,z]).s)*164*0.35);
    c.fillStyle=i%2?`rgba(255,255,255,${0.05*(1-u)})`:`rgba(0,20,40,${0.07*(1-u)})`;c.beginPath();c.moveTo(a.x,a.y-th);for(let q=0;q<=20;q++){const x=-2000+q*200,p=pp([x,0,z]);c.lineTo(p.x,p.y-th*(0.5+0.5*Math.sin(q*0.9+t+i)));}c.lineTo(b.x,b.y+th);c.lineTo(a.x,a.y+th);c.closePath();c.fill();}
  // sun glitter path (toward the sun direction on screen)
  if(o.glitter!==0){const gx=o.gx??620;c.save();c.globalCompositeOperation='lighter';for(let i=0;i<260;i++){const z=lerp(-30,z1,Math.pow(hash(i*1.3),1.5));const spread=Math.abs(z)*0.12;const x=(gx-540)/540*Math.abs(z)*0.35+(hash(i*2.1)-0.5)*spread;const p=pp([x,0,z]);if(p.w<=0.1)continue;const m=164*p.s;const tw=Math.max(0,Math.sin(t*6+i*1.7));if(tw<0.4)continue;
    c.fillStyle=`rgba(255,250,220,${0.75*tw})`;c.beginPath();c.ellipse(p.x,p.y,Math.max(1.2,0.7*m),Math.max(0.6,0.12*m),0,0,TAU);c.fill();}c.restore();}
  // whitecaps + crest lines
  for(let i=0;i<(o.n??260);i++){const z=lerp(z0,z1,Math.pow(hash(i*1.7),2));const x=(hash(i*3.3)-0.5)*Math.abs(z)*1.4;const p=pp([x,0,z]);if(p.w<=0.1)continue;const m=164*p.s;const ph=(t*0.7+hash(i*5))%1;const a=Math.sin(ph*Math.PI);
    c.strokeStyle=`rgba(240,250,255,${0.6*a})`;c.lineWidth=Math.max(1,0.08*m);c.beginPath();c.moveTo(p.x-1.2*m,p.y);c.quadraticCurveTo(p.x,p.y-0.18*m,p.x+1.2*m,p.y);c.stroke();
    if(hash(i*7)>0.7){c.fillStyle=`rgba(255,255,255,${0.5*a})`;for(let q=0;q<3;q++){c.beginPath();c.ellipse(p.x+(q-1)*0.5*m,p.y-0.06*m,Math.max(1,0.28*m),Math.max(0.5,0.06*m),0,0,TAU);c.fill();}}}
  c.restore();}
// reflection: draws fn mirrored below the waterline, darkened and wavy
function reflect(c,x,y,k,fn,a=0.25){c.save();c.beginPath();c.rect(x-500*k,y,1000*k,300*k);c.clip();c.translate(x,y);c.scale(1,-0.55);c.translate(-x,-y);c.globalAlpha=a;fn();c.restore();
  c.save();c.fillStyle='rgba(20,50,80,0.25)';for(let i=0;i<10;i++){c.fillRect(x-420*k,y+(6+i*12)*k,840*k,3*k);}c.restore();}
const _junk0=junk;
junk=function(c,x,y,L,o={}){const k=L/600,t=o.t??T;
  if(!o.noRefl&&!o._r)reflect(c,x,y,k,()=>_junkDetail(c,x,y,L,Object.assign({},o,{_r:1,crew:null,cannon:null,fire:0})),0.22);
  _junkDetail(c,x,y,L,o);};
function _junkDetail(c,x,y,L,o){const k=L/600,t=o.t??T;
  // shrouds + backstays behind sails (rigging from mastheads down to the hull sides)
  c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,o.seed||0);c.rotate(Math.sin(t*1.1+(o.seed||0))*0.025);
  c.strokeStyle='rgba(30,20,12,0.7)';c.lineWidth=1.8*k;for(const [mx,mh] of [[150,330],[10,420],[-170,300]]){for(const dx of [-60,-30,30,60]){c.beginPath();c.moveTo(mx*k,-(mh+20)*k);c.lineTo((mx+dx)*k,-100*k);c.stroke();}}
  c.beginPath();c.moveTo(10*k,-440*k);c.lineTo(290*k,-130*k);c.moveTo(10*k,-440*k);c.lineTo(-280*k,-150*k);c.stroke();c.restore();c.restore();
  _junk0(c,x,y,L,o);
  // extras on top of the base junk: stern gallery, rudder, deckhouse, rattan shields, anchor, ropes, sail patches, bow spray
  c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,o.seed||0);c.rotate(Math.sin(t*1.1+(o.seed||0))*0.025);c.lineJoin='round';
  // deckhouse with curved roof amidships-aft
  c.fillStyle='#6a3a20';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.8;c.fillRect(-230*k,-178*k,110*k,62*k);c.strokeRect(-230*k,-178*k,110*k,62*k);
  for(let i=0;i<3;i++){c.fillStyle='#ffd88a';c.fillRect((-222+i*34)*k,-168*k,24*k,22*k);c.strokeStyle='#3a1a10';c.lineWidth=2*k;c.strokeRect((-222+i*34)*k,-168*k,24*k,22*k);}
  c.fillStyle='#2a3a3a';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.8;c.beginPath();c.moveTo(-246*k,-176*k);c.quadraticCurveTo(-238*k,-196*k,-214*k,-200*k);c.lineTo(-136*k,-200*k);c.quadraticCurveTo(-112*k,-196*k,-104*k,-176*k);c.closePath();c.fill();c.stroke();
  // stern lantern
  c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(-270*k,-170*k,2,-270*k,-170*k,40*k);lg.addColorStop(0,'rgba(255,170,80,0.7)');lg.addColorStop(1,'rgba(255,170,80,0)');c.fillStyle=lg;c.fillRect(-310*k,-210*k,80*k,80*k);c.restore();
  c.fillStyle='#e8342a';c.strokeStyle=OL;c.lineWidth=2.5*k;c.beginPath();c.ellipse(-270*k,-170*k,10*k,13*k,0,0,TAU);c.fill();c.stroke();
  // rattan shields lined along the bulwark
  for(let i=0;i<7;i++){const sx=(-110+i*42)*k,sy=(-104+i*-1.6)*k;if(o.crew&&JUNK_CREW_X.slice(0,o.crew.length).some(cx=>Math.abs(cx*k-sx)<24*k))continue;const sg=c.createRadialGradient(sx-4*k,sy-4*k,2,sx,sy,16*k);sg.addColorStop(0,'#e0c27a');sg.addColorStop(1,'#9a7a3a');c.fillStyle=sg;c.strokeStyle=OL;c.lineWidth=2.5*k;c.beginPath();c.arc(sx,sy,15*k,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(90,60,20,0.6)';c.lineWidth=1.2*k;for(let r=5;r<15;r+=4){c.beginPath();c.arc(sx,sy,r*k,0,TAU);c.stroke();}c.fillStyle='#c8302a';c.beginPath();c.arc(sx,sy,4*k,0,TAU);c.fill();}
  // anchor hanging at the bow + cable
  c.strokeStyle='#3a2a1a';c.lineWidth=3*k;c.beginPath();c.moveTo(262*k,-110*k);c.quadraticCurveTo(286*k,-80*k,282*k,-46*k);c.stroke();c.strokeStyle='#2a2a30';c.lineWidth=6*k;c.beginPath();c.moveTo(282*k,-46*k);c.lineTo(282*k,-10*k);c.moveTo(266*k,-20*k);c.quadraticCurveTo(282*k,-4*k,298*k,-20*k);c.stroke();
  // weathering: salt streaks + dark tar near the waterline
  c.fillStyle='rgba(20,12,6,0.35)';c.beginPath();c.moveTo(-290*k,-12*k);c.quadraticCurveTo(0,8*k,290*k,-16*k);c.lineTo(250*k,24*k);c.lineTo(-210*k,24*k);c.closePath();c.fill();
  c.strokeStyle='rgba(230,230,220,0.18)';c.lineWidth=3*k;for(let i=0;i<12;i++){const sx=(-250+i*44+hash(i)*20)*k;c.beginPath();c.moveTo(sx,-60*k);c.lineTo(sx+4*k,-20*k);c.stroke();}
  // sail patches (faded squares) on the main sail
  for(let i=0;i<4;i++){c.fillStyle=`rgba(${o.sail==='tan'?'240,220,180':'230,120,90'},0.35)`;c.strokeStyle='rgba(40,20,10,0.4)';c.lineWidth=1.5*k;const px=(-80+hash(i*3)*120)*k,py=(-380+hash(i*5)*220)*k;c.fillRect(px,py,26*k,22*k);c.strokeRect(px,py,26*k,22*k);}
  c.restore();
  // rudder blade dropping below the stern into the water (seen through the surface)
  c.save();c.globalAlpha=0.55;c.fillStyle='#3a2416';c.beginPath();c.moveTo(-280*k,-10*k);c.lineTo(-250*k,-10*k);c.lineTo(-246*k,60*k);c.lineTo(-300*k,70*k);c.closePath();c.fill();c.restore();
  // bow spray when sailing
  if(o.moving){c.fillStyle='rgba(255,255,255,0.75)';for(let i=0;i<10;i++){const q=((t*1.5+hash(i))%1);c.beginPath();c.arc((290+q*50)*k,(-10-Math.sin(q*Math.PI)*36)*k-hash(i*3)*10*k,(4+hash(i*5)*6)*k*(1-q),0,TAU);c.fill();}
    c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=3*k;for(let i=0;i<3;i++){c.beginPath();c.moveTo((-260-i*40)*k,(6+i*6)*k);c.quadraticCurveTo((-420-i*60)*k,(10+i*10)*k,(-560-i*80)*k,(4+i*14)*k);c.stroke();}}
  c.restore();}
// richer western ship: bowsprit + jibs, gun deck with run-out cannons, stern gallery, ratlines, crow's nests, pennant
const _west0=westShip;
westShip=function(c,x,y,L,o={}){const k=L/600,t=o.t??T;
  c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,1);c.rotate(Math.sin(t*1.1+1)*0.02);
  c.strokeStyle='rgba(20,14,10,0.7)';c.lineWidth=1.6*k;for(const [mx,mh] of [[170,430],[10,500],[-150,400]]){for(let i=0;i<6;i++){c.beginPath();c.moveTo(mx*k,-mh*k);c.lineTo((mx-50+i*20)*k,-120*k);c.stroke();}for(let r=0;r<8;r++){const yy=-(140+r*40)*k,hw=(50-r*5)*k;c.beginPath();c.moveTo(mx*k-hw,yy);c.lineTo(mx*k+hw,yy);c.stroke();}}
  c.restore();c.restore();
  _west0(c,x,y,L,o);
  c.save();c.translate(x,y);if(o.f===-1)c.scale(-1,1);c.save();aboveWater(c,k,t,1);c.rotate(Math.sin(t*1.1+1)*0.02);c.lineJoin='round';
  // bowsprit + two jib sails
  c.strokeStyle=OL;c.lineWidth=9*k;c.beginPath();c.moveTo(300*k,-120*k);c.lineTo(440*k,-190*k);c.stroke();c.strokeStyle='#4a3020';c.lineWidth=5*k;c.stroke();
  for(const [ax,ay] of [[420,-180],[370,-160]]){c.fillStyle='#eeeadc';c.strokeStyle=OL;c.lineWidth=OLW(k)*0.7;c.beginPath();c.moveTo(ax*k,ay*k);c.lineTo(170*k,-430*k);c.lineTo(190*k,-150*k);c.closePath();c.fill();c.stroke();}
  // crow's nests + pennant
  for(const [mx,mh] of [[170,430],[10,500],[-150,400]]){c.fillStyle='#4a3020';c.strokeStyle=OL;c.lineWidth=2.5*k;c.fillRect((mx-22)*k,-(mh-80)*k,44*k,12*k);c.strokeRect((mx-22)*k,-(mh-80)*k,44*k,12*k);}
  c.fillStyle='#c8201a';c.beginPath();c.moveTo(10*k,-500*k);c.lineTo(-90*k,-492*k+Math.sin(t*6)*6*k);c.lineTo(10*k,-484*k);c.closePath();c.fill();
  // run-out cannons through the gunports
  for(let i=0;i<9;i++){c.fillStyle='#2a2a30';c.fillRect((-226+i*55)*k,-70*k,14*k,8*k);}
  // stern gallery windows, glowing
  c.fillStyle='#3a2a1a';c.fillRect(-296*k,-150*k,40*k,70*k);for(let i=0;i<2;i++)for(let j=0;j<3;j++){c.fillStyle='#ffd88a';c.fillRect((-292+i*18)*k,(-144+j*22)*k,14*k,16*k);}
  // figurehead
  c.fillStyle='#e8c050';c.strokeStyle=OL;c.lineWidth=2.5*k;c.beginPath();c.ellipse(318*k,-112*k,10*k,16*k,0.6,0,TAU);c.fill();c.stroke();
  c.restore();c.restore();};

// paint the sea ourselves (no texture banding): deep gradient from the horizon down, then the surface overlay
function seaPaint(c,t,o={}){const h=pp([0,0,-3000]);const hy=h.y;const near=pp([0,0,o.near??20]);const y1=Math.max(H*1.5,near.y);
  const g=c.createLinearGradient(0,hy,0,y1);const C=o.cols||['#9ac0d0','#3a7a98','#1e4e6c','#163a52'];g.addColorStop(0,C[0]);g.addColorStop(0.08,C[1]);g.addColorStop(0.5,C[2]);g.addColorStop(1,C[3]);c.fillStyle=g;c.fillRect(-W,hy,W*3,y1-hy+H);
  c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(-W,hy-1,W*3,2);seaSurface(c,t,o);}
