SH.cover=function(c,t){L2={dx:1,rim:'#ffc890',amb:'#2a1a18'};
  field(c,2.0,{x:540,y:1120,z:1.0,mm:135},{sky:'dusk',world:()=>{}});
  c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(180,90,70,0.35)';c.fillRect(0,0,W,H);c.restore();
  // respawn pillar behind him
  c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(340,0,740,0);g.addColorStop(0,'rgba(90,200,255,0)');g.addColorStop(0.5,'rgba(150,225,255,0.45)');g.addColorStop(1,'rgba(90,200,255,0)');c.fillStyle=g;c.fillRect(340,500,400,1500);c.restore();
  for(let i=0;i<40;i++){c.fillStyle=`rgba(180,240,255,${0.3+hash(i)*0.5})`;const s=6+hash(i*3)*12;c.fillRect(380+hash(i*7)*320,620+hash(i*5)*1200,s,s);}
  // ghost lives: past Napoleons fading behind, cyan-tinted
  for(const [x,y,s,a] of [[200,2080,2.6,0.28],[880,2080,2.6,0.28],[340,1980,2.2,0.18],[740,1980,2.2,0.18]]){c.save();c.globalAlpha=a;dof(c,3,c2=>NAP({c:c2,x,y,s,f:x<540?1:-1,t:2,eyes:'closed',brow:'flat',mouth:'flat',hf:[30,92],hb:[-30,92]}));c.restore();}
  c.save();c.globalCompositeOperation='color';c.fillStyle='rgba(90,200,255,0.0)';c.restore();
  NAP({c,x:540,y:2380,s:4.6,f:1,t:2,eyes:'sly',brow:'angry',mouth:'smirk',hf:[34,92],hb:[-34,92]});
  // pixel hearts: two full, one breaking, + respawn arrow
  const y=760,r=74,gap=200;c.fillStyle='rgba(0,0,0,0.55)';c.beginPath();c.roundRect(540-gap*1.5-24,y-r*1.25,gap*3+48,r*2.5,14);c.fill();
  heart(c,540-gap,y,r,true);heart(c,540,y,r,true);heart(c,540+gap,y,r,false,{flash:1});
  c.save();c.translate(540+gap,y);c.strokeStyle=CYAN_C;c.lineWidth=12;c.shadowColor=CYAN_C;c.shadowBlur=20;c.beginPath();c.arc(0,0,r*0.62,-2.6,1.6);c.stroke();c.fillStyle=CYAN_C;c.beginPath();c.moveTo(Math.cos(1.6)*r*0.62+14,Math.sin(1.6)*r*0.62);c.lineTo(Math.cos(1.6)*r*0.62-18,Math.sin(1.6)*r*0.62-14);c.lineTo(Math.cos(1.6)*r*0.62-16,Math.sin(1.6)*r*0.62+18);c.closePath();c.fill();c.restore();
  lightRays(c,540,-200,'255,200,140',0.18,9,2400,0.5);vignette(c,0.55);};
