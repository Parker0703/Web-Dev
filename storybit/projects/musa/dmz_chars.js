'use strict';
// ===================== DMZ 1976 · cast (StoryBit C) =====================
const OG='#5a6244',KPA='#7a7248';
Object.assign(KIND2,{
  us1:Object.assign(mkK({coat:OG,trim:'#4a5236',skin:SK[1],pants:OG}),{robe:false,long:false,hair4:'crew',hair:'#4a3420',hat2:'m1',hatCol:'#4e5638',browW:1.3,belt:1}),
  us2:Object.assign(mkK({coat:OG,trim:'#4a5236',skin:'#d8b08a',pants:OG}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'m1',hatCol:'#4e5638',browW:1.3,belt:1}),
  bonifas:Object.assign(mkK({coat:OG,trim:'#4a5236',skin:SK[1],pants:OG}),{robe:false,long:false,hair4:'crew',hair:'#5a3a20',hat2:'m1',hatCol:'#4e5638',hatBar:'cpt',browW:1.3,belt:1}),
  barrett:Object.assign(mkK({coat:OG,trim:'#4a5236',skin:SK[0],pants:OG}),{robe:false,long:false,hair4:'crew',hair:'#8a6a40',hat2:'m1',hatCol:'#4e5638',hatBar:'lt',browW:1.1,belt:1}),
  eng:Object.assign(mkK({coat:OG,trim:'#4a5236',skin:SK[1],pants:OG}),{robe:false,long:false,hair4:'crew',hair:'#3a2a1a',hat2:'m1',hatCol:'#4e5638',browW:1.3,belt:1,vest:'#e8a030'}),
  ksc:Object.assign(mkK({coat:'#6a6a50',trim:'#5a5a42',skin:'#d8b08a',pants:'#5a5a44'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'flatcap',hatCol:'#5a5a42',browW:1.2}),
  rok:Object.assign(mkK({coat:'#4a5a3a',trim:'#3a4a2e',skin:'#d8b08a',pants:'#4a5a3a'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'m1',hatCol:'#3a4430',hatMP:1,browW:1.4,belt:1}),
  roksf:Object.assign(mkK({coat:'#3e4a32',trim:'#2e3826',skin:'#d0a880',pants:'#3e4a32'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'m1',hatCol:'#2e3626',browW:1.5,belt:1,vest:'#2a3020'}),
  kpa:Object.assign(mkK({coat:KPA,trim:'#6a6238',skin:'#d8b08a',pants:KPA}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'kpacap',hatCol:'#6e6840',browW:1.5,belt:1}),
  kpa2:Object.assign(mkK({coat:KPA,trim:'#6a6238',skin:'#c8a07a',pants:KPA}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'kpacap',hatCol:'#6e6840',browW:1.5,belt:1}),
  kpaoff:Object.assign(mkK({coat:'#6a6a46',trim:'#5a5a38',skin:'#d0a880',pants:'#5a5a3c'}),{robe:false,long:false,hair4:'crew',hair:'#1a1410',hat2:'kpacap',hatCol:'#62603c',browW:1.6,belt:1,epaul:1}),
  gen:Object.assign(mkK({coat:'#4a5a3e',trim:'#3a4a30',skin:SK[1],pants:'#4a5a3e'}),{robe:false,long:false,hair4:'part',hair:'#b8b4ac',browW:1.3,tie:'#2a3020'}),
  gen2:Object.assign(mkK({coat:'#2a3a5a',trim:'#1a2a4a',skin:'#c8a07a',pants:'#2a3a5a'}),{robe:false,long:false,hair4:'crew',hair:'#4a4440',browW:1.3,tie:'#1a1a2a'}),
});
// M1 steel helmet (round pot, slight flare, chin strap; captain/lieutenant rank on front; ROK "MP"); KPA peaked cap with a red band + star
{const _hd=hatDraw;hatDraw=function(c,K,R,f,v,s,lift=0){const T=K.hat2;if(T!=='m1'&&T!=='kpacap')return _hd(c,K,R,f,v,s,lift);
  const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.translate(0,-lift*R);const off=v==='3q'?f*R*0.16:(v==='side'?f*R*0.22:0);const col=K.hatCol;c.strokeStyle=OL;c.lineWidth=lw;
  if(T==='m1'){const g=c.createRadialGradient(off-R*0.35,-R*1.1,R*0.1,off,-R*0.6,R*1.35);g.addColorStop(0,shd(col,0.3));g.addColorStop(1,shd(col,-0.3));c.fillStyle=g;
    c.beginPath();c.moveTo(-R*1.26,-R*0.12);c.bezierCurveTo(-R*1.22,-R*1.62,R*1.22,-R*1.62,R*1.26,-R*0.12);c.quadraticCurveTo(R*0.7,-R*0.32,off,-R*0.36);c.quadraticCurveTo(-R*0.7,-R*0.32,-R*1.26,-R*0.12);c.closePath();c.fill();c.stroke();
    c.strokeStyle=shd(col,-0.4);c.lineWidth=lw*0.6;c.beginPath();c.moveTo(-R*1.2,-R*0.2);c.quadraticCurveTo(off,-R*0.5,R*1.2,-R*0.2);c.stroke();
    c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=lw*0.7;c.beginPath();c.arc(off-R*0.35,-R*0.95,R*0.45,Math.PI*1.1,Math.PI*1.5);c.stroke();
    if(K.hatBar==='cpt'){c.fillStyle='#e8e8ec';c.strokeStyle=OL;c.lineWidth=lw*0.4;for(const d of [-1,1])c.fillRect(off+d*R*0.1-R*0.06,-R*1.1,R*0.12,R*0.32);}
    if(K.hatBar==='lt'){c.fillStyle='#e8e8ec';c.fillRect(off-R*0.06,-R*1.1,R*0.12,R*0.32);}
    if(K.hatMP){c.fillStyle='#f4f4f4';c.font=`900 ${Math.round(R*0.45)}px "Inter Display"`;c.textAlign='center';c.fillText('MP',off,-R*0.72);}}
  else{const top=-R*1.18,band=-R*0.62;const g=c.createLinearGradient(0,top,0,band);g.addColorStop(0,shd(col,0.2));g.addColorStop(1,shd(col,-0.1));c.fillStyle=g;
    c.beginPath();c.moveTo(-R*0.9+off*0.3,band);c.lineTo(-R*1.1+off,top+R*0.08);c.quadraticCurveTo(off,top-R*0.12,R*1.1+off,top+R*0.08);c.lineTo(R*0.9+off*0.3,band);c.closePath();c.fill();c.stroke();
    c.fillStyle='#b8201a';c.beginPath();c.rect(-R*0.9+off*0.3,band-R*0.02,R*1.8,R*0.22);c.fill();c.stroke();
    c.fillStyle='#e8c050';c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?R*0.06:R*0.15;c.lineTo(off*0.6+Math.cos(a)*r,band-R*0.24+Math.sin(a)*r);}c.closePath();c.fill();
    c.fillStyle='#14160e';c.beginPath();c.moveTo(-R*0.8+off*0.6,band+R*0.2);c.quadraticCurveTo(off+f*(v==='front'?0:R*0.4),band+R*0.46,R*0.8+off*0.6+(v==='front'?0:f*R*0.3),band+R*0.2);c.closePath();c.fill();c.stroke();}
  c.restore();};}
