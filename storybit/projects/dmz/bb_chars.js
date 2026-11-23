'use strict';
// ===================== Baby memories · cast (StoryBit C): baby, mom, dad, scientist, lab mice, the key =====================
const BOL=K2;
Object.assign(KIND2,{
  baby:Object.assign(mkK({coat:'#f2b4c4',trim:'#ffffff',skin:SK[3],pants:'#f2b4c4'}),{robe:false,long:false,hair4:'babyNone',hair:'#b07838',browW:0.55,browCol:'#d8b088'}),
  babyB:Object.assign(mkK({coat:'#9ccbe8',trim:'#ffffff',skin:SK[3],pants:'#9ccbe8'}),{robe:false,long:false,hair4:'babyNone',hair:'#b07838',browW:0.55,browCol:'#d8b088'}),
  mom:Object.assign(mkK({coat:'#d8705a',trim:'#f6e6dc',skin:SK[1],pants:'#3a4258'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#5a3424',fem:1}),
  dad:Object.assign(mkK({coat:'#4a6a8a',trim:'#eef2f6',skin:SK[2],pants:'#2e3440'}),{robe:false,long:false,hair4:'swoop',hair:'#2a1c16',stubble:1,browW:1.2}),
  sci:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:SK[3],pants:'#3a3c48'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#7a3a22',fem:1,glasses:1}),
  sci2:Object.assign(mkK({coat:'#f4f4ee',trim:'#d8dad8',skin:SK[0],pants:'#2e3440'}),{robe:false,long:true,hair4:'part',hair:'#2a2420',glasses:1,tie:'#2a4a7a',browW:1.2}),
});
// ---------- cel light pass for hand-drawn bodies (same recipe as the character light pass) ----------
function litDraw(c,bx,fn){const cw=c.canvas.width,ch=c.canvas.height,m=c.getTransform(),sc=Math.hypot(m.a,m.b);
  const P=(x,y)=>({x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f});const p0=P(bx[0],bx[1]),p1=P(bx[2],bx[3]);
  const x0=Math.max(0,Math.floor(Math.min(p0.x,p1.x))),y0=Math.max(0,Math.floor(Math.min(p0.y,p1.y))),x1=Math.min(cw,Math.ceil(Math.max(p0.x,p1.x))),y1=Math.min(ch,Math.ceil(Math.max(p0.y,p1.y)));
  const bw=x1-x0,bh=y1-y0;if(bw<4||bh<4){fn(c);return;}
  const A=lyr('ba',cw,ch),B=lyr('bb',cw,ch),C=lyr('bc',cw,ch);const a=A.getContext('2d'),b=B.getContext('2d'),r=C.getContext('2d');
  a.setTransform(1,0,0,1,0,0);a.globalCompositeOperation='source-over';a.globalAlpha=1;a.filter='none';a.clearRect(x0,y0,bw,bh);a.setTransform(m);fn(a);a.setTransform(1,0,0,1,0,0);
  b.setTransform(1,0,0,1,0,0);b.globalCompositeOperation='source-over';b.clearRect(x0,y0,bw,bh);b.drawImage(A,x0,y0,bw,bh,x0,y0,bw,bh);
  const Ld=L2.dx||1,rim=L2.rim||'#ffb35a',amb=L2.amb||rim,k=sc*(bx[4]||1);
  const band=(off,col,dy)=>{r.setTransform(1,0,0,1,0,0);r.globalCompositeOperation='source-over';r.clearRect(x0,y0,bw,bh);r.drawImage(B,x0,y0,bw,bh,x0,y0,bw,bh);r.globalCompositeOperation='source-in';r.fillStyle=col;r.fillRect(x0,y0,bw,bh);r.globalCompositeOperation='destination-out';r.drawImage(B,x0,y0,bw,bh,x0+Ld*off,y0+dy,bw,bh);};
  a.globalCompositeOperation='source-atop';a.fillStyle=hexA(amb,0.10);a.fillRect(x0,y0,bw,bh);
  band(16*k,'rgba(30,20,44,0.20)',-4*k);a.globalCompositeOperation='source-atop';a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  band(7*k,'rgba(18,10,30,0.22)',-2*k);a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  band(-9*k,'rgba(255,236,205,0.16)',6*k);a.globalCompositeOperation='lighter';a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);
  band(-3.2*k,rim,-2.4*k);a.globalAlpha=0.38;a.drawImage(C,x0,y0,bw,bh,x0,y0,bw,bh);a.globalAlpha=1;
  a.globalCompositeOperation='destination-in';a.drawImage(B,x0,y0,bw,bh,x0,y0,bw,bh);a.globalCompositeOperation='source-over';
  c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(A,x0,y0,bw,bh,x0,y0,bw,bh);c.restore();}
function blob(c,pts,fill,lw){c.beginPath();c.moveTo((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2);for(let i=1;i<=pts.length;i++){const p=pts[i%pts.length],q=pts[(i+1)%pts.length];c.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2);}c.closePath();c.fillStyle=fill;c.fill();if(lw){c.strokeStyle=BOL;c.lineWidth=lw;c.lineJoin='round';c.stroke();}}
// chubby limb: thick tube with outline (upper+lower merged), round hand/foot
function chub(c,a,e,b,w,col,s){c.lineCap='round';c.lineJoin='round';const path=()=>{c.beginPath();c.moveTo(a.x,a.y);c.quadraticCurveTo(2*e.x-(a.x+b.x)/2,2*e.y-(a.y+b.y)/2,b.x,b.y);};
  path();c.strokeStyle=BOL;c.lineWidth=(w+9)*s;c.stroke();path();c.strokeStyle=col;c.lineWidth=w*s;c.stroke();
  c.strokeStyle='rgba(255,255,255,0.35)';c.lineWidth=w*0.22*s;c.beginPath();c.moveTo(a.x+(L2.dx||1)*w*0.22*s,a.y);c.quadraticCurveTo(2*e.x-(a.x+b.x)/2+(L2.dx||1)*w*0.22*s,2*e.y-(a.y+b.y)/2,b.x+(L2.dx||1)*w*0.2*s,b.y);c.stroke();
  // baby fat crease at the elbow/knee
  c.strokeStyle='rgba(120,70,70,0.35)';c.lineWidth=2.2*s;c.beginPath();const nx=-(b.y-a.y),ny=b.x-a.x,nl=Math.hypot(nx,ny)||1;c.moveTo(e.x-nx/nl*w*0.32*s,e.y-ny/nl*w*0.32*s);c.lineTo(e.x-nx/nl*w*0.05*s,e.y-ny/nl*w*0.05*s);c.stroke();}
function babyHand(c,p,s,skin,open){c.fillStyle=skin;c.strokeStyle=BOL;c.lineWidth=4*s;c.beginPath();c.arc(p.x,p.y,11.5*s,0,TAU);c.fill();c.stroke();
  if(open){for(const k of [-1,0,1]){c.beginPath();c.ellipse(p.x+k*6.5*s,p.y-11*s,3.6*s,5.5*s,k*0.25,0,TAU);c.fill();c.stroke();}c.beginPath();c.arc(p.x,p.y,10*s,0,TAU);c.fill();}
  c.fillStyle='rgba(255,255,255,0.5)';c.beginPath();c.ellipse(p.x+(L2.dx||1)*3.5*s,p.y-4*s,3.5*s,2.2*s,0,0,TAU);c.fill();}
// ---------- the baby (sit / stand / lie), head = the house head rig at baby proportions ----------
// o: x,y (floor point under the bottom/feet), s, pose, face {eyes,brow,mouth,look}, hf/hb (hand targets rel. to shoulder, units), kind, hat, t, seed, wob
function baby(c,o){const s=o.s||1,kind=o.kind||'baby',K=KIND2[kind],t=o.t??T,seed=o.seed||0,pose=o.pose||'sit';const skin=K.skin,on=K.coat,dk=shd(on,-0.25);
  const br=Math.sin(t*3.1+seed)*1.6,wob=(o.wob||0)*Math.sin(t*7+seed);const X0=o.x,Y0=o.y;
  // body frame in units
  const hipY=pose==='stand'?-62:-24,shY=hipY-70+br*0.4,lean=(o.lean||0)+wob*0.05;
  const U=(x,y)=>({x:X0+(x+(y-hipY)*-Math.sin(lean)*0)*s+Math.sin(lean)*(hipY-y)*-s,y:Y0+y*s});
  const hip=U(0,hipY),shL=U(-25,shY+10),shR=U(25,shY+10);
  const hf=o.hf||(pose==='stand'?[14,-46]:[18,44]),hb=o.hb||(pose==='stand'?[-14,-46]:[-18,44]);
  // contact shadow
  c.fillStyle='rgba(0,0,0,0.32)';c.beginPath();c.ellipse(X0,Y0+2*s,(pose==='stand'?44:66)*s,11*s,0,0,TAU);c.fill();
  const bxx=[X0-110*s,Y0-260*s,X0+110*s,Y0+30*s,s];
  litDraw(c,bxx,(g)=>{g.lineJoin='round';
    // legs
    if(pose==='sit'){for(const d of [-1,1]){const a=U(d*16,hipY+4),e=U(d*50,hipY+2),b=U(d*40,hipY+20);chub(g,a,e,b,27,on,s);
        g.save();g.translate(b.x,b.y);g.rotate(d*0.5);g.fillStyle='#ffffff';g.strokeStyle=BOL;g.lineWidth=4*s;g.beginPath();g.ellipse(d*4*s,2*s,14*s,11*s,0,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(200,170,180,0.5)';g.beginPath();g.ellipse(d*4*s,5*s,8*s,4*s,0,0,TAU);g.fill();g.restore();}}
    else if(pose==='stand'){for(const d of [-1,1]){const a=U(d*14,hipY+6),e=U(d*20+wob*3,hipY+34),b=U(d*22,-8);chub(g,a,e,b,24,on,s);
        g.fillStyle=skin;g.strokeStyle=BOL;g.lineWidth=4*s;g.beginPath();g.ellipse(b.x+d*3*s,b.y+4*s,15*s,8*s,0,0,TAU);g.fill();g.stroke();}}
    // diaper bottom + torso (onesie)
    const tor=[[-30,hipY+14],[-36,hipY-14],[-32,shY+30],[-26,shY+6],[0,shY],[26,shY+6],[32,shY+30],[36,hipY-14],[30,hipY+14],[0,hipY+20]].map(p=>{const q=U(p[0],p[1]);return [q.x,q.y];});
    blob(g,tor,on,5*s);
    // onesie details: snaps, little star print, collar trim
    g.fillStyle='#ffffff';for(let i=0;i<3;i++){const p=U(0,shY+22+i*16);g.beginPath();g.arc(p.x,p.y,2.6*s,0,TAU);g.fill();}
    {const p=U(13,shY+40);g.save();g.translate(p.x,p.y);g.fillStyle=shd(on,0.55);g.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,r=(k%2?4:9)*s;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.restore();}
    {const a=U(-17,shY+5),b=U(17,shY+5),m=U(0,shY+15);g.strokeStyle=K.trim;g.lineWidth=5*s;g.lineCap='round';g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(m.x,m.y,b.x,b.y);g.stroke();}
    // arms
    for(const [sh,h,d] of [[shL,hb,-1],[shR,hf,1]]){const tgt={x:sh.x+h[0]*s,y:sh.y+h[1]*s};const L1=24*s,L2b=22*s;const r=ik2(sh.x,sh.y,tgt.x,tgt.y,L1,L2b,p=>p.x*d+p.y*0.4);chub(g,sh,r.e,r.h,19,on,s);
      // cuff + hand
      g.fillStyle=skin;babyHand(g,r.h,s,skin,o.open);}
  });
  // head (house rig, head-only), sits low on the shoulders: babies have almost no neck
  const hs=s*(o.hs||0.86),hc=U(0,shY-38);
  const face=Object.assign({eyes:'dot',brow:'flat',mouth:'smile',view:'front'},o.face||{});
  const r=who(c,kind,[0,0,0],Object.assign({},face,{abs:{x:hc.x,y:hc.y,s:hs},headOnly:1,rot:1e-4,seed:seed,tilt:(face.tilt||0)+wob*0.06}));
  // hair: one soft curl on top
  {const R=47*hs;c.save();c.translate(hc.x,hc.y);c.rotate(face.tilt||0);c.lineCap='round';c.strokeStyle=BOL;c.lineWidth=11*hs;c.beginPath();c.moveTo(-6*hs,-R*0.97);c.bezierCurveTo(-4*hs,-R*1.42,R*0.42,-R*1.4,R*0.34,-R*1.1);c.bezierCurveTo(R*0.26,-R*0.96,R*0.06,-R*1.06,R*0.12,-R*1.18);c.stroke();
    c.strokeStyle=K.hair;c.lineWidth=5*hs;c.stroke();c.restore();}
  // party hat
  if(o.hat){const R=47*hs;c.save();c.translate(hc.x,hc.y-R*0.8);c.rotate((face.tilt||0)+0.18);c.lineJoin='round';const g2=c.createLinearGradient(-R*0.4,0,R*0.4,0);g2.addColorStop(0,'#c83a5a');g2.addColorStop(0.6,'#ff6a8a');g2.addColorStop(1,'#d84a6a');
    c.fillStyle=g2;c.strokeStyle=BOL;c.lineWidth=4.5*hs;c.beginPath();c.moveTo(-R*0.42,0);c.lineTo(0,-R*1.15);c.lineTo(R*0.42,0);c.quadraticCurveTo(0,R*0.1,-R*0.42,0);c.fill();c.stroke();
    c.fillStyle='#ffd84a';for(const [px,py] of [[-R*0.15,-R*0.25],[R*0.12,-R*0.5],[-R*0.04,-R*0.78],[R*0.2,-R*0.15]]){c.beginPath();c.arc(px,py,R*0.07,0,TAU);c.fill();}
    c.fillStyle='#ffffff';c.beginPath();c.arc(0,-R*1.2,R*0.13,0,TAU);c.fill();c.stroke();c.restore();}
  return {hc,R:47*hs,hip,s};}
// ---------- 2D birthday cake with one candle ----------
function cake(c,x,y,s,t,lit=1){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=BOL;c.lineWidth=5*s;
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(0,4*s,110*s,20*s,0,0,TAU);c.fill();
  c.fillStyle='#f6f2ea';c.beginPath();c.ellipse(0,0,104*s,22*s,0,0,TAU);c.fill();c.stroke();
  const gb=c.createLinearGradient(-80*s,0,80*s,0);gb.addColorStop(0,'#e8b0a0');gb.addColorStop(0.55,'#fff0e6');gb.addColorStop(1,'#f0c8b8');
  c.fillStyle=gb;c.beginPath();c.moveTo(-80*s,-6*s);c.lineTo(-80*s,-80*s);c.ellipse(0,-80*s,80*s,18*s,0,Math.PI,0,false);c.lineTo(80*s,-6*s);c.ellipse(0,-6*s,80*s,18*s,0,0,Math.PI,false);c.closePath();c.fill();c.stroke();
  c.fillStyle='#ff9ab4';c.beginPath();c.ellipse(0,-80*s,80*s,18*s,0,0,TAU);c.fill();c.stroke();
  // drips
  c.beginPath();c.moveTo(-80*s,-80*s);for(let i=0;i<=8;i++){const xx=-80*s+i*20*s,dy=(i%2?22:12)*s;c.quadraticCurveTo(xx-6*s,-80*s+dy*1.4+Math.sin((i/8)*Math.PI)*16*s,xx+4*s,-80*s+Math.sin((i/8)*Math.PI)*16*s);}c.lineTo(80*s,-80*s);c.ellipse(0,-80*s,80*s,18*s,0,0,Math.PI,false);c.fillStyle='#ff9ab4';c.fill();
  c.lineWidth=3.5*s;c.stroke();
  // sprinkles
  for(let i=0;i<14;i++){c.fillStyle=['#5ab0d8','#f2c84a','#7cc47a','#ffffff'][i%4];c.save();c.translate((hash(i)-0.5)*130*s,-80*s+(hash(i*3)-0.5)*22*s);c.rotate(hash(i*5)*3);c.fillRect(-5*s,-1.6*s,10*s,3.2*s);c.restore();}
  // candle "1"
  c.lineWidth=4*s;c.fillStyle='#5ab0d8';c.beginPath();c.moveTo(-6*s,-84*s);c.lineTo(-6*s,-150*s);c.lineTo(-16*s,-140*s);c.lineTo(-16*s,-152*s);c.lineTo(4*s,-166*s);c.lineTo(8*s,-166*s);c.lineTo(8*s,-84*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#2a2a2a';c.lineWidth=2.5*s;seg(c,2*s,-166*s,2*s,-176*s);
  if(lit>0){const fl=1+Math.sin(t*23)*0.08+Math.sin(t*37)*0.05;c.globalCompositeOperation='lighter';const g=c.createRadialGradient(2*s,-190*s,0,2*s,-190*s,90*s);g.addColorStop(0,`rgba(255,210,120,${0.55*lit})`);g.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=g;c.beginPath();c.arc(2*s,-190*s,90*s,0,TAU);c.fill();c.globalCompositeOperation='source-over';
    c.save();c.translate(2*s,-176*s);c.scale(fl*lit,fl*lit);c.fillStyle='#ffb02e';c.beginPath();c.moveTo(0,0);c.bezierCurveTo(12*s,-8*s,8*s,-24*s,0,-34*s);c.bezierCurveTo(-8*s,-24*s,-12*s,-8*s,0,0);c.fill();c.fillStyle='#fff6c8';c.beginPath();c.ellipse(0,-9*s,4*s,8*s,0,0,TAU);c.fill();c.restore();}
  c.restore();}
// ---------- lab mouse: white fur, pink ears/nose/tail, beady eyes; 3/4 view facing f ----------
// o: x,y ground, s, f, t, eyes ('dot'|'happy'|'wide'|'closed'), fiber (optogenetic cable glow 0..1), sniff, walk, look
function mouse(c,o){const s=o.s||1,f=o.f||1,t=o.t??T,sd=o.seed||0;const fur=o.fur||'#f4f1ee',pink='#f4a0a8';
  const walk=o.walk||0,ph=t*14+sd;const bob=walk?Math.abs(Math.sin(ph))*3:Math.sin(t*4+sd)*0.8;const sniff=(o.sniff??1)*Math.sin(t*22+sd)*1.2;
  c.save();c.translate(o.x,o.y);c.scale(f,1);
  c.fillStyle='rgba(0,0,0,0.32)';c.beginPath();c.ellipse(4*s,2*s,70*s,10*s,0,0,TAU);c.fill();c.restore();
  litDraw(c,[o.x-140*s,o.y-130*s,o.x+140*s,o.y+20*s,s*0.5],(g)=>{g.save();g.translate(o.x,o.y);g.scale(f,1);g.lineJoin='round';g.lineCap='round';
    // tail
    g.strokeStyle=BOL;g.lineWidth=9*s;const tw=Math.sin(t*3+sd)*12;g.beginPath();g.moveTo(-52*s,-20*s);g.bezierCurveTo(-100*s,-6*s,-120*s,(-46+tw)*s,-160*s,(-30+tw)*s);g.stroke();g.strokeStyle=pink;g.lineWidth=5*s;g.stroke();
    // back feet
    for(const k of [0,1]){const lift=walk?Math.max(0,Math.sin(ph+k*Math.PI))*6:0;g.fillStyle=pink;g.strokeStyle=BOL;g.lineWidth=3*s;g.beginPath();g.ellipse((-34+k*14)*s,(-3-lift)*s,10*s,5*s,0,0,TAU);g.fill();g.stroke();}
    // body
    g.save();g.translate(0,-bob*s);
    blob(g,[[-58,-8],[-62,-38],[-40,-62],[0,-66],[34,-58],[52,-36],[46,-8],[0,0]].map(p=>[p[0]*s,p[1]*s]),fur,5*s);
    g.strokeStyle='rgba(150,140,150,0.35)';g.lineWidth=2.4*s;for(const [x,y] of [[-30,-50],[-10,-56],[-44,-30]]){g.beginPath();g.moveTo(x*s,y*s);g.quadraticCurveTo((x+6)*s,(y+4)*s,(x+12)*s,y*s);g.stroke();}
    // front feet
    for(const k of [0,1]){const lift=walk?Math.max(0,Math.sin(ph+0.5+k*Math.PI))*6:0;g.fillStyle=pink;g.strokeStyle=BOL;g.lineWidth=3*s;g.beginPath();g.ellipse((26+k*12)*s,(-2-lift+bob)*s,8*s,4.5*s,0,0,TAU);g.fill();g.stroke();}
    // head
    g.save();g.translate(44*s,-48*s);g.rotate((o.look||0)*0.3+sniff*0.01);
    // far ear (behind)
    g.fillStyle=fur;g.strokeStyle=BOL;g.lineWidth=4.5*s;g.beginPath();g.ellipse(-4*s,-30*s,15*s,17*s,-0.3,0,TAU);g.fill();g.stroke();g.fillStyle=pink;g.beginPath();g.ellipse(-3*s,-30*s,9*s,11*s,-0.3,0,TAU);g.fill();
    blob(g,[[-22,6],[-24,-20],[-6,-30],[22,-20],[48,-2+sniff*0.3],[40,8],[10,16],[-14,16]].map(p=>[p[0]*s,p[1]*s]),fur,5*s);
    // near ear
    g.fillStyle=fur;g.strokeStyle=BOL;g.lineWidth=4.5*s;g.beginPath();g.ellipse(-16*s,-26*s,18*s,20*s,-0.5,0,TAU);g.fill();g.stroke();g.fillStyle=pink;g.beginPath();g.ellipse(-15*s,-25*s,11*s,13*s,-0.5,0,TAU);g.fill();
    g.strokeStyle='rgba(200,110,120,0.5)';g.lineWidth=2*s;g.beginPath();g.ellipse(-15*s,-25*s,6*s,8*s,-0.5,0.6,2.2);g.stroke();
    // nose + whiskers
    g.fillStyle='#ff8a9a';g.strokeStyle=BOL;g.lineWidth=3*s;g.beginPath();g.ellipse((47+sniff*0.3)*s,-2*s,6*s,5*s,0,0,TAU);g.fill();g.stroke();
    g.strokeStyle='rgba(30,30,36,0.75)';g.lineWidth=1.8*s;for(const k of [-1,0,1]){g.beginPath();g.moveTo(38*s,4*s);g.quadraticCurveTo(54*s,(6+k*6)*s,(70+sniff)*s,(4+k*12)*s);g.stroke();g.beginPath();g.moveTo(34*s,5*s);g.quadraticCurveTo(26*s,(10+k*5)*s,(20-sniff)*s,(10+k*10)*s);g.stroke();}
    // eye (beady, glossy)
    const E=o.eyes||'dot';const bl=((t*0.37+sd)%1)>0.95;
    if(E==='happy'||bl||E==='closed'){g.strokeStyle=BOL;g.lineWidth=3.6*s;g.beginPath();if(E==='happy')g.arc(16*s,-6*s,6*s,Math.PI*1.1,Math.PI*1.9);else{g.moveTo(10*s,-5*s);g.lineTo(22*s,-5*s);}g.stroke();}
    else{const er=E==='wide'?8:6.4;g.fillStyle='#120c10';g.beginPath();g.ellipse(16*s,-6*s,er*s,er*1.1*s,0,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(18.5*s,-9*s,2.3*s,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,0.5)';g.beginPath();g.arc(13*s,-3*s,1.2*s,0,TAU);g.fill();}
    // optogenetic implant: small cap on the skull
    if(o.fiber!=null){g.fillStyle='#d8dce4';g.strokeStyle=BOL;g.lineWidth=3*s;rr(g,-8*s,-42*s,14*s,12*s,3*s);g.fill();g.stroke();}
    g.restore();g.restore();g.restore();});
  // fiber optic cable going up out of frame + blue glow (drawn outside the light pass)
  if(o.fiber!=null){const hx=o.x+f*43*s,hy=o.y-(90+bob)*s;c.save();c.lineCap='round';c.strokeStyle=BOL;c.lineWidth=7*s;c.beginPath();c.moveTo(hx,hy);c.bezierCurveTo(hx,hy-120*s,hx+f*40*s,hy-260*s,hx+f*20*s,hy-(o.cable||600)*s);c.stroke();c.strokeStyle='#e8f0ff';c.lineWidth=3.5*s;c.stroke();
    if(o.fiber>0){c.globalCompositeOperation='lighter';c.strokeStyle=`rgba(90,160,255,${0.9*o.fiber})`;c.lineWidth=3*s;c.stroke();const g=c.createRadialGradient(hx,hy,0,hx,hy,70*s);g.addColorStop(0,`rgba(140,200,255,${0.9*o.fiber})`);g.addColorStop(0.3,`rgba(60,130,255,${0.5*o.fiber})`);g.addColorStop(1,'rgba(40,90,255,0)');c.fillStyle=g;c.beginPath();c.arc(hx,hy,70*s,0,TAU);c.fill();}
    c.restore();}
  return {head:{x:o.x+f*44*s,y:o.y-(96+bob)*s}};}
// ---------- the key: antique brass key with a memory charm (tiny glowing photo of the first birthday) ----------
function brass(c,x0,x1){const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'#8a5a14');g.addColorStop(0.35,'#f6d26a');g.addColorStop(0.5,'#fff2b8');g.addColorStop(0.7,'#d8a23a');g.addColorStop(1,'#7a4e10');return g;}
function keyProp(c,x,y,s,ang,o={}){c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';c.lineCap='round';
  const OL2=5*s;c.strokeStyle=BOL;c.lineWidth=OL2;
  // shaft + bit
  c.fillStyle=brass(c,0,0);const gs=c.createLinearGradient(0,-8*s,0,8*s);gs.addColorStop(0,'#fff0b0');gs.addColorStop(0.45,'#e2b048');gs.addColorStop(1,'#7a4e10');c.fillStyle=gs;
  c.beginPath();c.rect(30*s,-6*s,150*s,12*s);c.fill();c.stroke();
  c.beginPath();c.moveTo(140*s,6*s);c.lineTo(140*s,34*s);c.lineTo(152*s,34*s);c.lineTo(152*s,22*s);c.lineTo(162*s,22*s);c.lineTo(162*s,38*s);c.lineTo(178*s,38*s);c.lineTo(178*s,6*s);c.closePath();c.fill();c.stroke();
  c.beginPath();c.ellipse(176*s,0,8*s,9*s,0,0,TAU);c.fill();c.stroke();
  // ornate bow: ring with a heart cut-out
  const gb=c.createRadialGradient(-12*s,-14*s,4*s,0,0,48*s);gb.addColorStop(0,'#fff6c8');gb.addColorStop(0.4,'#f0c454');gb.addColorStop(1,'#8a5a14');c.fillStyle=gb;
  c.beginPath();c.arc(0,0,40*s,0,TAU);c.fill();c.stroke();
  c.fillStyle=o.hole||'rgba(10,8,14,0.92)';c.beginPath();c.moveTo(0,16*s);c.bezierCurveTo(-30*s,-4*s,-14*s,-28*s,0,-12*s);c.bezierCurveTo(14*s,-28*s,30*s,-4*s,0,16*s);c.fill();c.lineWidth=3.5*s;c.stroke();
  c.lineWidth=OL2;c.beginPath();c.ellipse(36*s,0,8*s,11*s,0,0,TAU);c.fillStyle=gs;c.fill();c.stroke();
  // specular glints
  c.fillStyle='rgba(255,255,240,0.85)';c.beginPath();c.ellipse(-18*s,-24*s,9*s,4*s,-0.6,0,TAU);c.fill();c.fillRect(60*s,-4*s,70*s,2.4*s);
  c.restore();}
// charm: small round locket hanging from the bow ring by a short chain, holding the glowing first-birthday photo
function charm(c,x,y,s,swing,glow,t){c.save();c.translate(x,y);c.rotate(swing);c.strokeStyle=BOL;c.lineWidth=4*s;c.lineCap='round';
  for(let i=0;i<4;i++){c.strokeStyle=BOL;c.lineWidth=7*s;c.beginPath();c.ellipse(0,(8+i*11)*s,4*s,6*s,i%2?0:1.4,0,TAU);c.stroke();c.strokeStyle='#e8c060';c.lineWidth=3*s;c.stroke();}
  c.translate(0,80*s);c.fillStyle=brass(c,-30*s,30*s);c.strokeStyle=BOL;c.lineWidth=5*s;c.beginPath();c.arc(0,0,32*s,0,TAU);c.fill();c.stroke();
  // photo window
  c.save();c.beginPath();c.arc(0,0,23*s,0,TAU);c.clip();const pg=c.createLinearGradient(0,-23*s,0,23*s);pg.addColorStop(0,'#ffe6b8');pg.addColorStop(1,'#f4b090');c.fillStyle=pg;c.fillRect(-24*s,-24*s,48*s,48*s);
  c.fillStyle='#fdf7f1';c.strokeStyle=BOL;c.lineWidth=2.4*s;c.beginPath();c.arc(-2*s,-2*s,11*s,0,TAU);c.fill();c.stroke();c.fillStyle='#ff6a8a';c.beginPath();c.moveTo(-8*s,-11*s);c.lineTo(-1*s,-26*s);c.lineTo(5*s,-11*s);c.closePath();c.fill();
  c.fillStyle=BOL;c.beginPath();c.arc(-6*s,-3*s,1.6*s,0,TAU);c.arc(2*s,-3*s,1.6*s,0,TAU);c.fill();c.strokeStyle=BOL;c.lineWidth=1.6*s;c.beginPath();c.arc(-2*s,1*s,3*s,0.2,Math.PI-0.2);c.stroke();
  c.fillStyle='#f2b4c4';c.beginPath();c.ellipse(-2*s,17*s,13*s,8*s,0,0,TAU);c.fill();c.fillStyle='#ff9ab4';c.fillRect(10*s,8*s,12*s,10*s);c.fillStyle='#ffd84a';c.fillRect(15*s,2*s,2*s,6*s);c.restore();
  c.strokeStyle=BOL;c.lineWidth=3*s;c.beginPath();c.arc(0,0,23*s,0,TAU);c.stroke();
  if(glow>0){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,0,0,0,0,110*s);g.addColorStop(0,`rgba(255,220,150,${0.55*glow})`);g.addColorStop(0.35,`rgba(255,180,90,${0.25*glow})`);g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,110*s,0,TAU);c.fill();}
  c.restore();}

{const _hb=hairLayer;hairLayer=function(c,R,s,f,o,K){if(K&&K.hair4==='babyNone')return;return _hb(c,R,s,f,o,K);};}
// fuller, lighter trousers on this video's grown-ups (thin dark legs read as "no legs" at wide sizes)
Object.assign(KIND2.dad,{pants:'#4a6a9a',legW:1.65});Object.assign(KIND2.mom,{pants:'#5a5070',legW:1.6});Object.assign(KIND2.sci,{pants:'#5a6478',legW:1.6});Object.assign(KIND2.sci2,{pants:'#6a5a48',legW:1.65});
{const _l2=limb2;limb2=function(c,a,e,b,w,col,s){if(w===15&&_KK&&_KK.legW)w=15*_KK.legW;return _l2(c,a,e,b,w,col,s);};}
