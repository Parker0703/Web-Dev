SH.cover=function(c,t){L2={dx:1,rim:'#ffd08a',amb:'#3a2418'};
  palace(c,2.0,{x:540,y:1150,z:1.05,mm:135},{noThrone:1,world:()=>{}});
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,1250,0,540,1250,900);g.addColorStop(0,'rgba(255,190,90,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  lightRays(c,540,-200,'255,220,150',0.22,9,2400,0.6);
  dof(c,3,c2=>{S2('antony',{c:c2,x:150,y:1930,s:2.9,f:1,t:2,eyes:'happy',brow:'up',mouth:'o',look:[1,0]});CAESAR({c:c2,x:930,y:1930,s:2.9,f:-1,t:2,eyes:'happy',brow:'up',mouth:'o',look:[-1,0]});});
  for(const [x,y,r] of [[150,940,30],[230,860,22],[90,840,18],[930,940,30],[850,860,22],[1000,840,18]])heart(c,x,y,r,true);
  CL({c,x:540,y:2280,s:4.7,f:1,t:2,eyes:'sly',brow:'up',mouth:'smirk',hf:[46,92],hb:[-46,92]});
  sparkles(c,1.3,540,1080,520,26);sparkles(c,2.1,540,1080,420,18);
  // stat pill
  c.save();c.translate(540,640);c.fillStyle='rgba(10,8,4,0.78)';c.beginPath();c.roundRect(-330,-62,660,124,62);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.shadowColor=GOLD_C;c.shadowBlur=26;c.stroke();c.shadowBlur=0;
  c.font='900 54px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.letterSpacing='4px';c.fillStyle='#fff';c.fillText('♛ CHARISMA',-90,4);
  const g2=c.createLinearGradient(0,-40,0,40);g2.addColorStop(0,'#fff6d0');g2.addColorStop(1,'#e8a020');c.fillStyle=g2;c.font='900 64px "Inter Display"';c.fillText('MAX',230,4);c.restore();
  vignette(c,0.5);};
