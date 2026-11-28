'use strict';
// ===================== Jessica Lynch · cast (StoryBit C) =====================
const DCU='#c8b48a';
Object.assign(KIND2,{
  jess:Object.assign(mkK({coat:DCU,trim:'#e8dcc0',skin:SK[0],pants:'#b8a47a'}),{robe:false,long:false,hair4:'part',hair:'#d8b060',hat2:'kevlar',hatCol:'#b8a070',fem:1,browW:0.8,browCol:'#a88840',camo:1}),
  jessG:Object.assign(mkK({coat:'#a8c8d8',trim:'#e8f0f4',skin:SK[0],pants:'#a8c8d8'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#d8b060',fem:1,browW:0.8,browCol:'#a88840'}),
  jessV:Object.assign(mkK({coat:'#2a3a5a',trim:'#f4f0e8',skin:SK[0],pants:'#2a2a3a'}),{robe:false,long:false,hair4:'longG',longHair:1,hair:'#d8b060',fem:1,browW:0.8,browCol:'#a88840'}),
  lori:Object.assign(mkK({coat:DCU,trim:'#e8dcc0',skin:'#e8cfae',pants:'#b8a47a'}),{robe:false,long:false,hair4:'part',hair:'#1a1410',hat2:'kevlar',hatCol:'#b8a070',fem:1,browW:1.0,camo:1}),
  gi1:Object.assign(mkK({coat:DCU,trim:'#e8dcc0',skin:SK[1],pants:'#b8a47a'}),{robe:false,long:false,hair4:'crew',hair:'#3a2a1c',hat2:'kevlar',hatCol:'#b8a070',browW:1.3,camo:1}),
  gi2:Object.assign(mkK({coat:DCU,trim:'#e8dcc0',skin:'#d8b896',pants:'#b8a47a'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'kevlar',hatCol:'#b8a070',browW:1.3,camo:1}),
  sf:Object.assign(mkK({coat:'#4a4a3a',trim:'#2a2a24',skin:SK[1],pants:'#3a3a2e'}),{robe:false,long:false,hair4:'crew',hair:'#2a2018',hat2:'kevlarNV',hatCol:'#3a3a30',browW:1.3,vest:'#2e2e26',belt:1}),
  sf2:Object.assign(mkK({coat:'#4a4a3a',trim:'#2a2a24',skin:'#d8b896',pants:'#3a3a2e'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'kevlarNV',hatCol:'#3a3a30',browW:1.3,vest:'#2e2e26',belt:1,fb:'short',fbCol:'#2a2018'}),
  iqdoc:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:'#e0c09a',pants:'#3a3a44'}),{robe:false,long:true,hair4:'crew',hair:'#1a1410',mst:'brush',mstCol:'#1a1410',browW:1.4,tie:'#5a3a2a'}),
  iqdoc2:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:'#d8b48e',pants:'#2a2a30'}),{robe:false,long:true,hair4:'crew',hair:'#4a4a4a',mst:'walrus',mstCol:'#3a3a3a',browW:1.3,glasses:1}),
  rep1:Object.assign(mkK({coat:'#2a2a32',trim:'#f4f4f0',skin:SK[1],pants:'#2a2a32'}),{robe:false,long:false,hair4:'part',hair:'#c8c6c4',tie:'#8a1a2a',browW:1.2,glasses:1}),
  rep2:Object.assign(mkK({coat:'#3a2a2a',trim:'#f4f4f0',skin:'#c89a76',pants:'#2a2a2a'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',tie:'#1a3a7a',browW:1.2}),
  anchor:Object.assign(mkK({coat:'#1a2a4a',trim:'#f4f4f0',skin:SK[2],pants:'#1a2a4a'}),{robe:false,long:false,hair4:'part',hair:'#2a1a10',tie:'#b8201a',browW:1.1}),
});
// PASGT "Fritz" helmet with desert cover; NV variant has the goggle mount + flipped-up tube
{const _hd=hatDraw;hatDraw=function(c,K,R,f,v,s,lift=0){const T=K.hat2;if(T!=='kevlar'&&T!=='kevlarNV')return _hd(c,K,R,f,v,s,lift);
  const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.translate(0,-lift*R);const off=v==='3q'?f*R*0.16:(v==='side'?f*R*0.22:0);const col=K.hatCol;c.strokeStyle=OL;c.lineWidth=lw;
  const g=c.createRadialGradient(off-R*0.3,-R*1.05,R*0.1,off,-R*0.6,R*1.3);g.addColorStop(0,shd(col,0.25));g.addColorStop(1,shd(col,-0.25));c.fillStyle=g;
  c.beginPath();c.moveTo(-R*1.18,-R*0.18);c.bezierCurveTo(-R*1.25,-R*1.55,R*1.25,-R*1.55,R*1.18,-R*0.18);c.quadraticCurveTo(R*0.6,-R*0.42,off,-R*0.46);c.quadraticCurveTo(-R*0.6,-R*0.42,-R*1.18,-R*0.18);c.closePath();c.fill();c.stroke();
  if(T==='kevlar'){c.fillStyle='rgba(120,90,50,0.35)';for(let i=0;i<7;i++){c.beginPath();c.ellipse(-R*0.8+hash(i)*R*1.6,-R*1.0+hash(i*3)*R*0.5,R*0.18,R*0.1,hash(i*5)*3,0,TAU);c.fill();}
    c.strokeStyle='#5a4a30';c.lineWidth=lw*0.8;c.beginPath();c.moveTo(-R*1.05,-R*0.62);c.quadraticCurveTo(off,-R*0.84,R*1.05,-R*0.62);c.stroke();}
  else{c.fillStyle='#1a1a18';c.beginPath();c.roundRect(off-R*0.22,-R*1.05,R*0.44,R*0.26,R*0.06);c.fill();c.stroke();c.fillStyle='#2a2a26';c.beginPath();c.roundRect(off-R*0.34,-R*1.42,R*0.68,R*0.34,R*0.1);c.fill();c.stroke();
    c.fillStyle='#4aff7a';c.globalAlpha=0.6;c.beginPath();c.arc(off-R*0.16,-R*1.25,R*0.07,0,TAU);c.arc(off+R*0.16,-R*1.25,R*0.07,0,TAU);c.fill();c.globalAlpha=1;}
  c.restore();};}
// desert camo blotches on DCU uniforms (drawn after the figure, clipped to the torso/legs area roughly)
