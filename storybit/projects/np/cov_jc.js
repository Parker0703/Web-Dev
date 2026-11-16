SH.cover=function(c,t){L2={dx:-1,rim:'#ff5a4a',amb:'#200a10'};
  senate(c,1.2,{x:540,y:1150,z:1.0,mm:135},{mood:'blood',world:()=>{}});
  c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(120,20,30,0.45)';c.fillRect(0,0,W,H);c.restore();
  lightRays(c,540,-100,'255,90,70',0.22,6,2300,0.5);
  CAESAR({c,x:540,y:2170,s:4.3,f:1,t:1.2,eyes:'shock',brow:'up',mouth:'scream',sweat:1,hf:[62,40],hb:[-62,40]});
  blood(c,570,1560,70,3,0.75);blood(c,480,1760,50,9,0.7);
  const K=[[-1,1430,0.0],[1,1520,0.05],[-1,1640,0.12],[1,1740,0.02],[-1,1840,0.1]];
  K.forEach(([sd,y,ex],i)=>creepKnife(c,540+sd*900,y+140,540+sd*(250-ex*300),y,sd>0?Math.PI+0.18:-0.18,1,{len:330,sleeve:'#3a2a2c',glint:0.3+i*0.17}));
  // big pixel hearts: two full, the third flashing as it breaks
  const y=640,r=88,gap=230;c.fillStyle='rgba(0,0,0,0.55)';rr(c,540-gap*1.5-30,y-r*1.25,gap*3+60,r*2.5,14);c.fill();
  heart(c,540-gap,y,r,true);heart(c,540,y,r,true);
  c.save();for(const sd of [-1,1]){c.save();c.translate(540+gap+sd*22,y+18);c.rotate(sd*0.18);c.beginPath();c.rect(sd>0?0:-r*1.2,-r*1.2,r*1.2,r*2.4);c.clip();heart(c,0,0,r,true,{flash:1});c.restore();}c.restore();
  c.save();c.strokeStyle='#fff';c.lineWidth=10;c.lineJoin='miter';c.beginPath();c.moveTo(540+gap,y-r*0.9);c.lineTo(540+gap-14,y-r*0.3);c.lineTo(540+gap+12,y+r*0.1);c.lineTo(540+gap-8,y+r*0.8);c.stroke();c.restore();
  for(let i=0;i<10;i++){c.fillStyle=i%2?'#e8242c':'#ffffff';const a=hash(i)*TAU,d=r*(1.2+hash(i*3)*0.8);c.fillRect(540+gap+Math.cos(a)*d,y+Math.sin(a)*d,14,14);}
  vignette(c,0.55);};
