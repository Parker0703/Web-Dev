'use strict';
// ===== Phineas Gage cast (1848) =====
Object.assign(KIND2,{
  // young foreman: brown vest over work shirt, dark side-part, strong brows, clean-shaven, brown bowler
  gage:Object.assign(mkK({coat:'#7a5034',trim:'#f2ead8',skin:SK[1],pants:'#4a4038'}),{robe:false,long:false,hair4:'part',hair:'#3a2418',hat2:'bowler',hatCol:'#5a3a24',burns:1,browW:1.3,browL:1.1,jaw:1}),
  // after the accident: head wrapped, bandage over the left eye, no hat
  gageHurt:Object.assign(mkK({coat:'#7a5034',trim:'#f2ead8',skin:SK[1],pants:'#4a4038'}),{robe:false,long:false,hair4:'part',hair:'#3a2418',bandage:1,burns:1,browW:1.3,browL:1.1,jaw:1}),
  // the changed man: rumpled, stubble, scar, left eye shut
  gageAngry:Object.assign(mkK({coat:'#6a4430',trim:'#d8ccb4',skin:SK[1],pants:'#3e362e'}),{robe:false,long:false,hair4:'swoop',hair:'#3a2418',stubble:1,burns:1,scar:1,browW:1.6,browL:1.15,jaw:1}),
  // Chile, years later: stagecoach driver, wide-brim hat, poncho colours, scar
  gageChile:Object.assign(mkK({coat:'#a8542c',trim:'#f0d8a8',skin:SK[2],pants:'#4a3a2e'}),{robe:false,long:false,hair4:'part',hair:'#3a2418',hat2:'wide',hatCol:'#6a4a2a',scar:1,stubble:1,burns:1,mst:'walrus',mstCol:'#3a2418',browW:1.3}),
  // crew: Tom (flat cap, full beard, red shirt) and Will (straw hat, suspenders, thin brows)
  tom:Object.assign(mkK({coat:'#a83a2a',trim:'#f4e8d8',skin:SK[2],pants:'#3a3a48'}),{robe:false,long:false,hair4:'crew',hair:'#5a3a22',hat2:'flatcap',hatCol:'#4a4a50',fb:'full',fbCol:'#6a4026',browW:1.5}),
  will:Object.assign(mkK({coat:'#4a6a9a',trim:'#f4f0e4',skin:SK[0],pants:'#5a4a38'}),{robe:false,long:false,hair4:'swoop',hair:'#c8a050',hat2:'straw',hatCol:'#d8b868',browW:0.8,browCol:'#a8803a'}),
  // Dr. Williams: black frock coat, top hat, spectacles, mutton chops
  doc:Object.assign(mkK({coat:'#26242c',trim:'#f4f4f0',skin:SK[1],pants:'#26242c'}),{robe:false,long:true,hair4:'part',hair:'#6a5a4a',hat2:'top',hatCol:'#1a181e',glasses:1,fb:'chops',fbCol:'#7a6a58',mst:'handlebar',mstCol:'#7a6a58',browW:1.1}),
  driver:Object.assign(mkK({coat:'#6a7a4a',trim:'#e8e0c8',skin:SK[3],pants:'#4a4030'}),{robe:false,long:false,hair4:'crew',hair:'#2a2018',hat2:'straw',hatCol:'#c8a858',mst:'brush',browW:1.2}),
});
// ---------- beards / scar / bandage (face space) ----------
{const _df=drawFace4;drawFace4=function(g,x,y,s,P,K){_df(g,x,y,s,P,K);if(!K)return;g.save();g.lineCap='round';g.lineJoin='round';
  if(K.scar){g.strokeStyle='rgba(150,60,60,0.75)';g.lineWidth=4*s;g.beginPath();g.moveTo(x+30*s,y+36*s);g.lineTo(x+60*s,y+4*s);g.stroke();g.lineWidth=2*s;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x+(36+i*9)*s,y+(22-i*9)*s);g.lineTo(x+(44+i*9)*s,y+(32-i*9)*s);g.stroke();}
    // his left eye stays shut
    g.fillStyle=K.skin||'#f2e2d4';g.beginPath();g.ellipse(x+44*s,y-6*s,22*s,20*s,0,0,TAU);g.fill();g.strokeStyle=OL;g.lineWidth=4*s;g.beginPath();g.moveTo(x+28*s,y-4*s);g.quadraticCurveTo(x+44*s,y+4*s,x+60*s,y-4*s);g.stroke();}
  if(K.bandage){// gauze wrap over the left eye, angled up over the crown where the rod came out; clipped to the skull
    const f=P.f||1,front=P.view==='front'||!P.view,hx=x-f*(front?3.8:21.4)*s,R=126*s;g.save();g.beginPath();g.arc(hx,y,R+2*s,0,TAU);g.clip();
    const cv=(o)=>{g.beginPath();g.moveTo(x-24*s+o*0.7*s,y-160*s-o*0.7*s);g.quadraticCurveTo(x+34*s+o*0.7*s,y+24*s-o*0.7*s,x+160*s+o*0.7*s,y+34*s-o*0.7*s);};
    g.lineCap='butt';cv(0);g.strokeStyle=OL;g.lineWidth=78*s;g.stroke();cv(0);g.strokeStyle='#f4efe4';g.lineWidth=70*s;g.stroke();
    g.lineWidth=2.4*s;g.strokeStyle='rgba(150,140,120,0.5)';for(const o of [-24,-10,6,20]){cv(o);g.stroke();}cv(-30);g.strokeStyle='rgba(120,110,95,0.25)';g.lineWidth=12*s;g.stroke();
    g.fillStyle='rgba(120,46,30,0.38)';g.beginPath();for(let i=0;i<14;i++){const a=i/14*TAU,r=(8+hash(i*2.3)*9)*s;g.lineTo(x+60*s+Math.cos(a)*r,y-40*s+Math.sin(a)*r*0.7);}g.closePath();g.fill();
    g.restore();}
  g.restore();};}
// ---------- hats built into the head (follow tilt and view) ----------
function hatDraw(c,K,R,f,v,s,lift=0){const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.translate(0,-lift*R);const off=v==='3q'?f*R*0.18:0;const col=K.hatCol||'#3a2a1a';c.strokeStyle=OL;c.lineWidth=lw;
  const brim=(w,y,th)=>{c.fillStyle=shd(col,-0.15);c.beginPath();c.ellipse(off*0.4,y,w,th,0,0,TAU);c.fill();c.stroke();};
  const crown=(top,w,y0,round)=>{const g2=c.createLinearGradient(-w,top,w,y0);g2.addColorStop(0,shd(col,0.18));g2.addColorStop(1,shd(col,-0.2));c.fillStyle=g2;c.beginPath();c.moveTo(-w+off,y0);if(round)c.bezierCurveTo(-w*1.05+off,top,w*1.05+off,top,w+off,y0);else{c.lineTo(-w*0.94+off,top);c.quadraticCurveTo(off,top-R*0.06,w*0.94+off,top);c.lineTo(w+off,y0);}c.closePath();c.fill();c.stroke();};
  const T=K.hat2;
  if(T==='bowler'){brim(R*1.2,-R*0.52,R*0.18);crown(-R*1.42,R*0.82,-R*0.56,true);c.fillStyle=shd(col,-0.4);c.fillRect(-R*0.82+off,-R*0.72,R*1.64,R*0.14);}
  else if(T==='top'){brim(R*1.15,-R*0.55,R*0.16);crown(-R*1.95,R*0.72,-R*0.58,false);c.fillStyle='#3a3440';c.fillRect(-R*0.74+off,-R*0.8,R*1.48,R*0.16);}
  else if(T==='flatcap'){c.fillStyle=col;c.beginPath();c.moveTo(-R*1.0,-R*0.42);c.bezierCurveTo(-R*1.02,-R*1.18,R*1.1,-R*1.22,R*1.06,-R*0.5);c.quadraticCurveTo(0,-R*0.62,-R*1.0,-R*0.42);c.closePath();c.fill();c.stroke();c.fillStyle=shd(col,-0.3);c.beginPath();c.moveTo(off-R*0.7,-R*0.46);c.quadraticCurveTo(off+f*R*0.1,-R*0.56,off+R*0.75,-R*0.48);c.quadraticCurveTo(off+R*0.6,-R*0.26,off,-R*0.24);c.quadraticCurveTo(off-R*0.6,-R*0.28,off-R*0.7,-R*0.46);c.closePath();c.fill();c.stroke();}
  else if(T==='straw'||T==='wide'){brim(R*(T==='wide'?1.6:1.45),-R*0.5,R*0.24);crown(-R*1.25,R*0.72,-R*0.52,false);c.fillStyle=T==='straw'?'#8a3a2a':'#2a1a10';c.fillRect(-R*0.74+off,-R*0.72,R*1.48,R*0.16);
    if(T==='straw'){c.strokeStyle='rgba(120,80,20,0.4)';c.lineWidth=lw*0.4;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-R*0.6+i*R*0.3+off,-R*1.2);c.lineTo(-R*0.66+i*R*0.33+off,-R*0.58);c.stroke();}}}
  c.restore();}
{const _f3=face2;face2=function(c,o,s,f,R,t){if(KIND2[o.kind]&&KIND2[o.kind].hat2&&!o.noHat){const K=KIND2[o.kind];const keep=K.hair4;_f3(c,o,s,f,R,t);hatDraw(c,K,R,f,o.back?'back':(o.view||'front'),s,o.hatLift||0);}else _f3(c,o,s,f,R,t);};}
// ---------- props ----------
// the tamping iron: 3 ft 7 in, tapering to a point at the top end
function tampIron(c,a,b,k,hot=0){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1;c.save();c.translate(a.x,a.y);c.rotate(Math.atan2(dy,dx));c.lineJoin='round';
  const g2=c.createLinearGradient(0,-8*k,0,8*k);g2.addColorStop(0,'#9aa0a8');g2.addColorStop(0.45,'#4a4e56');g2.addColorStop(1,'#24262c');c.fillStyle=g2;c.strokeStyle=OL;c.lineWidth=5*k;
  c.beginPath();c.moveTo(0,-7*k);c.lineTo(L*0.72,-7*k);c.lineTo(L,-1.5*k);c.lineTo(L,1.5*k);c.lineTo(L*0.72,7*k);c.lineTo(0,7*k);c.quadraticCurveTo(-4*k,0,0,-7*k);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=2*k;c.beginPath();c.moveTo(6*k,-4*k);c.lineTo(L*0.7,-4*k);c.lineTo(L*0.96,-1*k);c.stroke();
  c.strokeStyle='rgba(60,40,30,0.4)';c.lineWidth=1.5*k;for(let i=1;i<6;i++){c.beginPath();c.moveTo(L*i*0.12,-6*k);c.lineTo(L*i*0.12+4*k,6*k);c.stroke();}
  if(hot>0){c.globalCompositeOperation='lighter';const g3=c.createLinearGradient(0,0,L,0);g3.addColorStop(0,'rgba(255,120,40,0)');g3.addColorStop(1,`rgba(255,200,120,${0.8*hot})`);c.fillStyle=g3;c.fillRect(0,-10*k,L,20*k);}
  c.restore();}
function powderFlask(c,x,y,k,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='#c8a868';c.strokeStyle=OL;c.lineWidth=4*k;c.beginPath();c.moveTo(-30*k,-20*k);c.quadraticCurveTo(0,-40*k,34*k,-12*k);c.lineTo(46*k,-4*k);c.lineTo(40*k,6*k);c.quadraticCurveTo(0,34*k,-34*k,16*k);c.closePath();c.fill();c.stroke();c.fillStyle='#6a4a2a';c.beginPath();c.rect(42*k,-8*k,14*k,12*k);c.fill();c.stroke();c.strokeStyle='rgba(90,60,30,0.5)';c.lineWidth=2*k;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-20*k+i*14*k,-24*k+i*2*k);c.lineTo(-24*k+i*14*k,20*k-i*2*k);c.stroke();}c.restore();}
Object.assign(KIND2,{_t1:Object.assign({},KIND2.will,{hat2:null,fb:'goatee',mst:'chevron',fbCol:'#a8803a'}),_t2:Object.assign({},KIND2.gage,{hat2:null,fb:'short',burns:0}),_t3:Object.assign({},KIND2.driver,{hat2:null,mst:'pencil'})});
