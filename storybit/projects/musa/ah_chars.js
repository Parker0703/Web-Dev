'use strict';
// ===== Antwerp diamond heist cast — each one readable at a glance =====
Object.assign(KIND2,{
  // Leonardo Notarbartolo, "diamond trader": silver swept-back hair, gold-rim glasses, navy three-piece suit, burgundy tie, trimmed grey moustache
  leo:Object.assign(mkK({coat:'#26324e',trim:'#f4f0e6',skin:SK[1],pants:'#222a40'}),{robe:false,long:true,hair4:'part',hair:'#c9c7c4',glasses:1,tie:'#8a2232',vest:'#3a4666',mst:'pencil',mstCol:'#a8a6a2',browW:1.2,browCol:'#8a8884'}),
  // Leo on the heist night: same silver hair + glasses, black turtleneck + black gloves
  leoN:Object.assign(mkK({coat:'#1b1b22',trim:'#3a3a44',skin:SK[1],pants:'#16161c',limb:'#1d1d24'}),{robe:false,long:false,hair4:'part',hair:'#c9c7c4',glasses:1,mst:'pencil',mstCol:'#a8a6a2',browW:1.2,browCol:'#8a8884'}),
  // "The Genius" (alarm expert): lanky, black curly mop, goatee, olive tech vest, red beanie
  genius:Object.assign(mkK({coat:'#4a5a3c',trim:'#e8e4d4',skin:SK[3],pants:'#26262e'}),{robe:false,long:false,hair4:'swoop',hair:'#141216',hat2:'beanie',hatCol:'#b03a32',fb:'goatee',fbCol:'#141216',vest:'#2e3828',browW:1.0}),
  // "The Monster" (muscle + locks): huge, shaved head, thick black beard, brown leather jacket
  monster:Object.assign(mkK({coat:'#5a3a26',trim:'#e8dcc8',skin:SK[2],pants:'#2a2a30'}),{robe:false,long:false,hair4:'bald',hair:'#2a2420',fb:'full',fbCol:'#1e1814',browW:1.8,browL:1.15,jaw:1,belt:1}),
  // "Speedy" (the nervous one): small, wiry, mustard windbreaker, grey flat cap, droopy moustache
  speedy:Object.assign(mkK({coat:'#c8962a',trim:'#f6ecd0',skin:SK[0],pants:'#3a4258'}),{robe:false,long:false,hair4:'crew',hair:'#4a3020',hat2:'flatcap',hatCol:'#6e6e74',mst:'walrus',mstCol:'#4a3020',browW:1.1}),
  // bank-style guard: pale blue shirt, navy peaked cap
  guard:Object.assign(mkK({coat:'#8eaed0',trim:'#f2f4f8',skin:SK[2],pants:'#24304a'}),{robe:false,long:false,hair4:'crew',hair:'#2a2018',hat2:'peaked',hatCol:'#1e2a46',tie:'#1e2a46',belt:1,browW:1.2}),
  // the landowner: old farmer, green wax jacket, tweed flat cap, white beard
  farmer:Object.assign(mkK({coat:'#4c5a36',trim:'#ece4cc',skin:SK[1],pants:'#4a3e30'}),{robe:false,long:true,hair4:'crew',hair:'#e8e6e2',hat2:'flatcap',hatCol:'#8a6a44',fb:'short',fbCol:'#eeeceа'.slice(0,7),mst:'walrus',mstCol:'#f0eee8',browCol:'#d8d6d0',browW:1.3,old:1}),
  // Belgian police: dark navy, white-banded peaked cap
  cop:Object.assign(mkK({coat:'#1c2846',trim:'#e8ecf4',skin:SK[3],pants:'#141c32'}),{robe:false,long:false,hair4:'crew',hair:'#3a2a1c',hat2:'police',hatCol:'#18223c',belt:1,browW:1.3}),
  cop2:Object.assign(mkK({coat:'#1c2846',trim:'#e8ecf4',skin:SK[1],pants:'#141c32'}),{robe:false,long:false,hair4:'crew',hair:'#c8a050',hat2:'police',hatCol:'#18223c',belt:1,mst:'brush',mstCol:'#b08840',browW:1.1,browCol:'#a8803a'}),
  // detective: tan trench coat
  det:Object.assign(mkK({coat:'#b8955c',trim:'#f0e6cc',skin:SK[2],pants:'#3a3630'}),{robe:false,long:true,hair4:'part',hair:'#2a2420',tie:'#2a3a5a',stubble:1,belt:1,browW:1.4}),
});
KIND2.farmer.fbCol='#eeece6';
// extra hats: beanie, guard peaked cap, police cap
{const _hd=hatDraw;hatDraw=function(c,K,R,f,v,s,lift=0){const T=K.hat2;if(T!=='beanie'&&T!=='peaked'&&T!=='police')return _hd(c,K,R,f,v,s,lift);
  const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.translate(0,-lift*R);const off=v==='3q'?f*R*0.18:(v==='side'?f*R*0.25:0);const col=K.hatCol;c.strokeStyle=OL;c.lineWidth=lw;
  if(T==='beanie'){const g=c.createLinearGradient(0,-R*1.2,0,-R*0.3);g.addColorStop(0,shd(col,0.15));g.addColorStop(1,shd(col,-0.15));c.fillStyle=g;
    c.beginPath();c.moveTo(-R*1.0,-R*0.38);c.bezierCurveTo(-R*1.06,-R*1.32,R*1.06,-R*1.32,R*1.0,-R*0.38);c.closePath();c.fill();c.stroke();
    c.fillStyle=shd(col,-0.25);c.beginPath();c.moveTo(-R*1.02,-R*0.62);c.quadraticCurveTo(0,-R*0.74,R*1.02,-R*0.62);c.lineTo(R*1.0,-R*0.34);c.quadraticCurveTo(0,-R*0.46,-R*1.0,-R*0.34);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=lw*0.5;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*R*0.26+off*0.3,-R*0.64);c.lineTo(i*R*0.26+off*0.3,-R*0.42);c.stroke();}}
  else{// peaked cap: flat top, band, glossy visor
    const top=-R*1.18,band=-R*0.62;const g=c.createLinearGradient(0,top,0,band);g.addColorStop(0,shd(col,0.2));g.addColorStop(1,shd(col,-0.1));c.fillStyle=g;
    c.beginPath();c.moveTo(-R*0.9+off*0.3,band);c.lineTo(-R*1.08+off,top+R*0.08);c.quadraticCurveTo(off,top-R*0.1,R*1.08+off,top+R*0.08);c.lineTo(R*0.9+off*0.3,band);c.closePath();c.fill();c.stroke();
    c.fillStyle=T==='police'?'#f2f2f4':shd(col,-0.35);c.beginPath();c.rect(-R*0.9+off*0.3,band-R*0.02,R*1.8,R*0.22);c.fill();c.stroke();
    if(T==='police'){c.fillStyle='#1a1a1a';c.fillRect(-R*0.9+off*0.3,band+R*0.06,R*1.8,R*0.05);}
    c.fillStyle='#e8c050';c.beginPath();c.arc(off*0.6,band-R*0.2,R*0.13,0,TAU);c.fill();c.stroke();
    c.fillStyle='#0e0e14';c.beginPath();c.moveTo(-R*0.8+off*0.6,band+R*0.2);c.quadraticCurveTo(off+f*(v==='front'?0:R*0.4),band+R*0.48,R*0.8+off*0.6+(v==='front'?0:f*R*0.3),band+R*0.2);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=lw*0.5;c.beginPath();c.moveTo(-R*0.4+off*0.6,band+R*0.27);c.quadraticCurveTo(off*0.6,band+R*0.33,R*0.3+off*0.6,band+R*0.27);c.stroke();}
  c.restore();};}
