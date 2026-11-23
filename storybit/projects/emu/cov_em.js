const t=2.2;LIT('#ffd0a0','#3a2418');
outback(c,t,{x:540,y:1100,z:1.0,mm:35},{land:'scrub',lift:200,world:(c2,GY)=>{const P=PSP(GY,GY+800,2.4);
  flock(c2,t,{n:60,x0:-200,x1:1300,y0:GY+40,y1:GY+640,persp:P,pose:'run',view:'q3',seed:5,f:-1});
  const G=gunner(c2,250,GY+900,2.6,t,{fire:true,ang:-0.06,eyes:'shock',brow:'up',mouth:'scream'});for(let i=0;i<4;i++)dustHit(c2,620+i*130,GY+300+i*60,1.6,t+i*0.2,i);
  emu(c2,960,GY+1000,2.6,t,{pose:'run',view:'q3',f:-1,seed:9});}});
c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(220,140,90,0.18)';c.fillRect(0,0,W,H);c.restore();
c.save();c.shadowColor='rgba(0,0,0,0.75)';c.shadowBlur=36;c.shadowOffsetY=10;
txt(c,'AUSTRALIA',540,180,140,'#ffffff',{sw:28,ls:3});txt(c,'LOST A WAR',540,340,120,'#ffd23f',{sw:26,ls:3});txt(c,'TO BIRDS',540,500,150,'#ffffff',{sw:30,ls:4});
c.restore();vignette(c,0.4);
