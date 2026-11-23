const t=2.3;LIT('#ffc890','#3a2418');
field(c,t,{x:540,y:1120,z:1.0,mm:50},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{
  swarm(c2,t,{n:160,x0:-150,x1:1230,y0:GY+120,y1:GY+620,s0:0.45,s1:0.95,pose:'front',seed:41});
  NAP({c:c2,x:540,y:GY+1080,s:3.6,f:1,t,eyes:'shock',brow:'worried',mouth:'scream',sweat:1,hf:[34,92],hb:[-34,92]});
  const R=[];for(let i=0;i<14;i++){const a=Math.PI*0.02+i/13*Math.PI*0.96;R.push([540+Math.cos(a)*(i%2?330:450),GY+800+Math.sin(a)*(i%2?120:200),i]);}
  R.sort((a,b)=>a[0]-b[0]).forEach(([x,y,i])=>rabbit(c2,x,y,1.5,{pose:'front',t:t+i,seed:i+50,col:['white','grey','spot','brown','white'][i%5]}));}});
c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,120,90,0.25)';c.fillRect(0,0,W,H);c.restore();
c.save();c.shadowColor='rgba(0,0,0,0.75)';c.shadowBlur=36;c.shadowOffsetY=10;
txt(c,'NAPOLEON',540,190,140,'#ffffff',{sw:28,ls:3});txt(c,'LOST TO',540,350,110,'#ffd060',{sw:24,ls:3});txt(c,'RABBITS',540,520,170,'#ff3a2e',{sw:32,ls:4});
c.restore();vignette(c,0.45);
