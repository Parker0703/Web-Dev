'use strict';
// ===== Ching Shih cast (Qing dynasty, c.1801–1844) =====
const RB=(o,x)=>Object.assign(mkK(Object.assign({attire:'plain'},o)),x||{});
Object.assign(KIND2,{
  // young Shih: flower-boat girl, pink silk, flower in her bun
  chingY:RB({coat:'#e89ab4',trim:'#fff0d8',hakama:'#c8607e',sash:'#f0c860',skin:SK[3]},{hair4:'part',hair:'#141018',hat2:'bun',hatCol:'#141018',flower:'#ff6a8a',fem:1,browW:0.8}),
  // Ching Shih, pirate queen: crimson robe with gold trim, black sash, gold hairpins, a dao at her hip
  ching:RB({coat:'#9a1822',trim:'#f0c860',hakama:'#24141a',sash:'#1a1016',skin:SK[3]},{hair4:'part',hair:'#141018',hat2:'bun',hatCol:'#141018',pins:'#f0c860',fem:1,browW:1.0,dao:1}),
  // old Ching Shih: plum robe, silver bun
  chingOld:RB({coat:'#5a3a5e',trim:'#e8dcc8',hakama:'#3a2a3e',sash:'#c8a050',skin:SK[3]},{hair4:'part',hair:'#c8c6c4',hat2:'bun',hatCol:'#c8c6c4',pins:'#e8d8a0',fem:1,browW:0.9,browCol:'#a8a6a4',old:1}),
  // Zheng Yi: weathered captain, Qing queue under a red pirate band, thick black moustache, indigo jacket
  zheng:RB({coat:'#24345a',trim:'#c8a060',hakama:'#1a2236',sash:'#c8302a',skin:SK[1]},{hair4:'bald',hair:'#16120e',hat2:'queueBand',hatCol:'#c8302a',mst:'walrus',mstCol:'#16120e',stubble:1,browW:1.6,jaw:1,dao:1}),
  // Cheung Po Tsai: young lieutenant, queue, jade-green jacket, red sash
  cheung:RB({coat:'#2e6a4c',trim:'#e8dcb4',hakama:'#1e3a2a',sash:'#c8302a',skin:SK[2]},{hair4:'bald',hair:'#16120e',hat2:'queue',hatCol:'#16120e',browW:1.2}),
  // pirates of the Red Flag Fleet: red headbands, rough tunics
  pirA:RB({coat:'#7a5a3a',trim:'#d8c8a0',hakama:'#3a2e24',sash:'#c8302a',skin:SK[1]},{hair4:'crew',hair:'#16120e',hat2:'redband',hatCol:'#c8302a',fb:'short',fbCol:'#16120e',browW:1.5}),
  pirB:RB({coat:'#4a4a3a',trim:'#d8d0b0',hakama:'#2a2a24',sash:'#c8302a',skin:SK[2]},{hair4:'bald',hair:'#16120e',hat2:'redband',hatCol:'#c8302a',mst:'chevron',mstCol:'#16120e',browW:1.4}),
  pirC:RB({coat:'#8a3a2a',trim:'#e8d8b8',hakama:'#3a1e18',sash:'#2a2a2a',skin:SK[0]},{hair4:'swoop',hair:'#16120e',hat2:'redband',hatCol:'#c8302a',stubble:1,browW:1.2}),
  // Qing navy: officer (blue robe, rank square, mandarin hat) and sailor (straw hat, round badge)
  qing:RB({coat:'#24346e',trim:'#f0e8d0',hakama:'#1a2452',sash:'#c8a050',skin:SK[1]},{hair4:'bald',hair:'#16120e',hat2:'mandarin',hatCol:'#1a1a1e',rank:1,mst:'pencil',mstCol:'#16120e',browW:1.3}),
  qsail:RB({coat:'#5a6a8a',trim:'#f0e8d0',hakama:'#3a4458',sash:'#2a2a3a',skin:SK[2]},{hair4:'bald',hair:'#16120e',hat2:'conical',hatCol:'#c8a868',badge:1,browW:1.2}),
  // the governor-general: dark formal robe, rank square, peacock-feathered hat, long thin moustache + goatee
  gov:RB({coat:'#1a2240',trim:'#d8c890',hakama:'#141a30',sash:'#c8a050',skin:SK[0]},{hair4:'bald',hair:'#8a8884',hat2:'mandarin',hatCol:'#1a1a1e',feather:1,rank:1,mst:'walrus',mstCol:'#8a8884',fb:'goatee',fbCol:'#8a8884',browW:1.2,old:1}),
  // the Jiaqing Emperor: imperial yellow dragon robe
  emperor:RB({coat:'#e8b42a',trim:'#2a3a8a',hakama:'#d89a20',sash:'#2a3a8a',skin:SK[0]},{hair4:'bald',hair:'#16120e',hat2:'imperial',hatCol:'#2a2a30',dragon:1,mst:'pencil',mstCol:'#16120e',browW:1.2}),
  // British captain (navy blue coat, gold trim, bicorne) and Portuguese officer (wine coat, black bicorne)
  brit:Object.assign(mkK({coat:'#1e2a4a',trim:'#f0c860',skin:SK[3],pants:'#e8e4d8'}),{robe:false,long:true,hair4:'part',hair:'#c8a060',hat2:'bicorne',hatCol:'#14141a',buttons:1,browW:1.0,browCol:'#a8803a'}),
  portu:Object.assign(mkK({coat:'#5a1e2a',trim:'#e8d8a0',skin:SK[1],pants:'#2a2a30'}),{robe:false,long:true,hair4:'part',hair:'#2a1a12',hat2:'bicorne',hatCol:'#14141a',buttons:1,mst:'handlebar',mstCol:'#2a1a12',browW:1.3}),
  // women + children who walk in with her; fishermen
  womA:RB({coat:'#3a7a8a',trim:'#f0e8d0',hakama:'#2a5a68',sash:'#e8c060',skin:SK[2]},{hair4:'part',hair:'#141018',hat2:'bun',hatCol:'#141018',fem:1,browW:0.8}),
  womB:RB({coat:'#8a6a3a',trim:'#f0e8d0',hakama:'#5a4428',sash:'#c84a3a',skin:SK[1]},{hair4:'part',hair:'#141018',hat2:'bun',hatCol:'#141018',fem:1,browW:0.8}),
  kid:RB({coat:'#c84a3a',trim:'#f8e8c8',hakama:'#8a2a24',sash:'#f0c860',skin:SK[3]},{hair4:'crew',hair:'#141018',browW:0.8}),
  fisher:RB({coat:'#6a6a4a',trim:'#e0d8b8',hakama:'#4a4a34',sash:'#2a2a24',skin:SK[1]},{hair4:'bald',hair:'#16120e',hat2:'conical',hatCol:'#c8a868',browW:1.2}),
});
// ---- hats / hairstyles of the period, drawn in head space so they follow the head
{const _hd=hatDraw;hatDraw=function(c,K,R,f,v,s,lift=0){const T=K.hat2;const MINE=['bun','queue','queueBand','redband','mandarin','conical','bicorne','imperial'];if(!MINE.includes(T))return _hd(c,K,R,f,v,s,lift);
  const lw=Math.max(2,4.5*s);c.save();c.lineJoin='round';c.lineCap='round';c.strokeStyle=OL;c.lineWidth=lw;const off=v==='3q'?f*R*0.18:(v==='side'?f*R*0.3:0);const back=v==='back';
  const queue=()=>{// shaved front (slight blue-grey), hair from the crown back, braid hanging behind
    c.fillStyle='rgba(90,110,140,0.18)';c.beginPath();c.ellipse(off*0.4,-R*0.55,R*0.78,R*0.42,0,Math.PI,TAU);c.fill();
    const hc=K.hair||'#16120e';c.fillStyle=hc;c.beginPath();c.moveTo(-R*0.98-off*0.2,-R*0.28);c.bezierCurveTo(-R*1.0,-R*0.9,-R*0.5,-R*1.06,-off*0.4,-R*1.05);c.bezierCurveTo(R*0.5,-R*1.06,R*1.0,-R*0.9,R*0.98-off*0.2,-R*0.28);c.bezierCurveTo(R*0.7,-R*0.8,-R*0.7,-R*0.8,-R*0.98-off*0.2,-R*0.28);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,0.25)';c.lineWidth=lw*0.5;c.beginPath();c.moveTo(-R*0.5,-R*0.95);c.quadraticCurveTo(0,-R*1.02,R*0.4,-R*0.96);c.stroke();
    // braid over the shoulder (visible from the side the head turns away from)
    const bx=-f*R*0.92;c.strokeStyle=OL;c.lineWidth=lw;c.fillStyle=hc;for(let i=0;i<6;i++){c.beginPath();c.ellipse(bx-f*R*0.04*i,R*0.1+i*R*0.24,R*0.13,R*0.16,f*0.2,0,TAU);c.fill();c.stroke();}
    c.fillStyle='#c8302a';c.fillRect(bx-f*R*0.3-R*0.06,R*1.5,R*0.12,R*0.2);};
  if(T==='bun'){// hair swept up into a bun with pins (and a flower)
    const hc=K.hatCol;c.fillStyle=hc;c.beginPath();c.ellipse(off*0.3,-R*1.05,R*0.48,R*0.36,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(255,255,255,0.28)';c.lineWidth=lw*0.6;c.beginPath();c.arc(off*0.3,-R*1.05,R*0.3,Math.PI*1.1,Math.PI*1.7);c.stroke();
    c.fillStyle=hc;c.strokeStyle=OL;c.lineWidth=lw;c.beginPath();c.moveTo(-R*0.98,-R*0.2);c.bezierCurveTo(-R*1.04,-R*0.9,R*1.04,-R*0.9,R*0.98,-R*0.2);c.bezierCurveTo(R*0.7,-R*0.6,-R*0.7,-R*0.6,-R*0.98,-R*0.2);c.closePath();c.fill();c.stroke();
    if(K.pins){c.strokeStyle=K.pins;c.lineWidth=lw*0.9;for(const a of [-0.5,0.4]){c.beginPath();c.moveTo(off*0.3+Math.cos(a+Math.PI)*R*0.7,-R*1.05+Math.sin(a)*R*0.3);c.lineTo(off*0.3+Math.cos(a)*R*0.7,-R*1.1-Math.sin(a)*R*0.3);c.stroke();}c.fillStyle=K.pins;c.beginPath();c.arc(off*0.3+R*0.62,-R*1.3,R*0.1,0,TAU);c.fill();}
    if(K.flower){c.fillStyle=K.flower;for(let i=0;i<5;i++){const a=i/5*TAU;c.beginPath();c.arc(off*0.3+R*0.45+Math.cos(a)*R*0.12,-R*1.12+Math.sin(a)*R*0.12,R*0.1,0,TAU);c.fill();}c.fillStyle='#ffe08a';c.beginPath();c.arc(off*0.3+R*0.45,-R*1.12,R*0.07,0,TAU);c.fill();}}
  else if(T==='queue'){queue();}
  else if(T==='queueBand'||T==='redband'){if(T==='queueBand')queue();c.fillStyle=K.hatCol;c.strokeStyle=OL;c.lineWidth=lw;c.beginPath();c.moveTo(-R*1.02,-R*0.5);c.quadraticCurveTo(0,-R*0.7,R*1.02,-R*0.5);c.lineTo(R*1.0,-R*0.28);c.quadraticCurveTo(0,-R*0.48,-R*1.0,-R*0.28);c.closePath();c.fill();c.stroke();
    const kx=-f*R*1.0;for(const [a,l] of [[0.4,0.6],[0.9,0.5]]){c.beginPath();c.moveTo(kx,-R*0.4);c.lineTo(kx-f*Math.cos(a)*R*l,-R*0.4+Math.sin(a)*R*l-R*0.07);c.lineTo(kx-f*Math.cos(a)*R*l,-R*0.4+Math.sin(a)*R*l+R*0.07);c.closePath();c.fill();c.stroke();}}
  else if(T==='mandarin'){queue();// conical summer hat with red tassel fringe + finial
    c.fillStyle='#e8dcc0';c.beginPath();c.moveTo(-R*1.25+off*0.3,-R*0.45);c.quadraticCurveTo(off*0.4,-R*1.55,R*1.25+off*0.3,-R*0.45);c.quadraticCurveTo(off*0.3,-R*0.3,-R*1.25+off*0.3,-R*0.45);c.closePath();c.fill();c.stroke();
    c.strokeStyle='#c8302a';c.lineWidth=lw*0.8;for(let i=-5;i<=5;i++){c.beginPath();c.moveTo(off*0.4+i*R*0.03,-R*1.2);c.lineTo(off*0.3+i*R*0.2,-R*0.5);c.stroke();}
    c.fillStyle='#c8302a';c.strokeStyle=OL;c.lineWidth=lw*0.8;c.beginPath();c.arc(off*0.4,-R*1.3,R*0.13,0,TAU);c.fill();c.stroke();
    if(K.feather){c.fillStyle='#2a6a5a';c.beginPath();c.moveTo(off*0.4-f*R*0.1,-R*1.2);c.quadraticCurveTo(-f*R*1.1,-R*1.1,-f*R*1.5,-R*0.4);c.quadraticCurveTo(-f*R*1.0,-R*0.9,off*0.4,-R*1.15);c.closePath();c.fill();c.stroke();c.fillStyle='#e8c050';c.beginPath();c.arc(-f*R*1.2,-R*0.7,R*0.1,0,TAU);c.fill();c.fillStyle='#2a4a9a';c.beginPath();c.arc(-f*R*1.2,-R*0.7,R*0.05,0,TAU);c.fill();}}
  else if(T==='conical'){// woven straw hat
    const g=c.createLinearGradient(0,-R*1.4,0,-R*0.4);g.addColorStop(0,shd(K.hatCol,0.2));g.addColorStop(1,shd(K.hatCol,-0.2));c.fillStyle=g;c.beginPath();c.moveTo(-R*1.5+off*0.3,-R*0.42);c.lineTo(off*0.4,-R*1.45);c.lineTo(R*1.5+off*0.3,-R*0.42);c.quadraticCurveTo(off*0.3,-R*0.28,-R*1.5+off*0.3,-R*0.42);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(90,60,20,0.5)';c.lineWidth=lw*0.4;for(let i=1;i<5;i++){const u=i/5;c.beginPath();c.moveTo(lerp(off*0.4,-R*1.5+off*0.3,u),lerp(-R*1.45,-R*0.42,u));c.quadraticCurveTo(off*0.35,lerp(-R*1.45,-R*0.35,u),lerp(off*0.4,R*1.5+off*0.3,u),lerp(-R*1.45,-R*0.42,u));c.stroke();}}
  else if(T==='bicorne'){c.fillStyle=K.hatCol;c.beginPath();c.moveTo(-R*1.4,-R*0.55);c.quadraticCurveTo(-R*0.6,-R*1.0,off*0.3,-R*1.35);c.quadraticCurveTo(R*0.6,-R*1.0,R*1.4,-R*0.55);c.quadraticCurveTo(0,-R*0.62,-R*1.4,-R*0.55);c.closePath();c.fill();c.stroke();
    c.strokeStyle='#e8c060';c.lineWidth=lw*0.7;c.beginPath();c.moveTo(-R*1.3,-R*0.6);c.quadraticCurveTo(-R*0.6,-R*0.98,off*0.3,-R*1.28);c.quadraticCurveTo(R*0.6,-R*0.98,R*1.3,-R*0.6);c.stroke();c.fillStyle='#c8302a';c.beginPath();c.arc(off*0.3+R*0.4,-R*0.95,R*0.12,0,TAU);c.fill();}
  else if(T==='imperial'){queue();c.fillStyle='#2a2a30';c.beginPath();c.moveTo(-R*1.1+off*0.3,-R*0.5);c.quadraticCurveTo(off*0.4,-R*1.5,R*1.1+off*0.3,-R*0.5);c.closePath();c.fill();c.stroke();c.strokeStyle='#c8302a';c.lineWidth=lw*0.8;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(off*0.4+i*R*0.03,-R*1.2);c.lineTo(off*0.3+i*R*0.22,-R*0.55);c.stroke();}
    c.fillStyle='#f0c860';c.strokeStyle=OL;c.lineWidth=lw*0.7;for(let i=0;i<3;i++){c.beginPath();c.arc(off*0.4,-R*1.3-i*R*0.16,R*(0.12-i*0.025),0,TAU);c.fill();c.stroke();}}
  c.restore();};}
// ---- robe extras: rank square, sailor badge, dragon roundel, dao at the hip
{const _rb=robe2;robe2=function(c,s,f,K,TOR){_rb(c,s,f,K,TOR);if(CUR.back)return;c.save();c.lineJoin='round';
  if(K.rank){const g=c.createLinearGradient(0,-70*s,0,-34*s);g.addColorStop(0,'#2a2a3a');g.addColorStop(1,'#1a1a28');c.fillStyle=g;c.strokeStyle='#e8c060';c.lineWidth=2.5*s;c.fillRect(-15*s,-72*s,30*s,30*s);c.strokeRect(-15*s,-72*s,30*s,30*s);
    c.fillStyle='#f4f0e6';c.beginPath();c.ellipse(0,-58*s,8*s,5*s,-0.4,0,TAU);c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.4*s;c.beginPath();c.moveTo(-10*s,-48*s);c.quadraticCurveTo(0,-52*s,10*s,-48*s);c.stroke();c.fillStyle='#c8302a';c.beginPath();c.arc(7*s,-66*s,2.5*s,0,TAU);c.fill();}
  if(K.badge){c.fillStyle='#f4f0e6';c.strokeStyle=OL;c.lineWidth=2.5*s;c.beginPath();c.arc(0,-56*s,12*s,0,TAU);c.fill();c.stroke();c.strokeStyle='#c8302a';c.lineWidth=2.5*s;c.beginPath();c.arc(0,-56*s,7*s,0,TAU);c.stroke();}
  if(K.dragon){c.strokeStyle='#e8c060';c.fillStyle='#2a3a8a';c.lineWidth=2.5*s;c.beginPath();c.arc(0,-58*s,15*s,0,TAU);c.fill();c.stroke();c.strokeStyle='#f0c860';c.lineWidth=2.2*s;c.beginPath();c.moveTo(-9*s,-50*s);c.bezierCurveTo(-12*s,-62*s,0,-70*s,6*s,-62*s);c.bezierCurveTo(12*s,-56*s,2*s,-50*s,8*s,-48*s);c.stroke();c.fillStyle='#c8302a';c.beginPath();c.arc(6*s,-63*s,2.4*s,0,TAU);c.fill();}
  if(K.dao&&!CUR.noSw){c.save();c.translate(f*20*s,-14*s);c.rotate(f*0.5);c.strokeStyle=OL;c.lineWidth=3*s;c.fillStyle='#2a1c14';rr(c,-4*s,0,8*s,62*s,3*s);c.fill();c.stroke();c.fillStyle='#c8a050';c.fillRect(-6*s,-4*s,12*s,6*s);c.strokeRect(-6*s,-4*s,12*s,6*s);c.fillStyle='#5a2a1a';rr(c,-3*s,-22*s,6*s,18*s,2*s);c.fill();c.stroke();c.restore();}
  c.restore();};}
