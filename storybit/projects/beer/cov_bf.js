const t=1.6;LIT('#ffb070','#2a1a14');
londonSt(c,t,{x:540,y:1020,z:1.0},{GY:1330,houseH:600,behind:(c2,GY)=>{wallWave(c2,t,GY-1150,GY+40,{debris:5});},world:(c2,GY)=>{
  for(let i=0;i<4;i++){const x0=-80+i*330,ry=GY-600*(0.86+hash(i*3)*0.12);curtain(c2,t+i*0.3,x0,x0+300,ry,GY+20,1,{sd:i});}
  floodSurf(c2,t,-400,1500,GY+40,GY+150,{flow:300,refl:false});
  BW(c2,'poorM',250,GY+560,1.75,t,{view:'q3',run:1,ph:1.2,f:-1,eyes:'wide',brow:'worried',mouth:'scream',seed:1});
  BW(c2,'poorW',820,GY+600,1.9,t,{view:'q3',run:1,ph:4.1,f:1,eyes:'shock',brow:'worried',mouth:'scream',seed:2});
  c2.save();c2.translate(560,GY-120);c2.rotate(0.7);c2.rotate(Math.PI/2);barrel(c2,0,40,1.1);c2.restore();spray(c2,t,540,GY-160,20,300,240,1,3);}});
c.save();c.globalCompositeOperation='lighter';const rg=c.createRadialGradient(540,700,50,540,700,800);rg.addColorStop(0,'rgba(255,170,60,0.22)');rg.addColorStop(1,'rgba(255,120,60,0)');c.fillStyle=rg;c.fillRect(0,0,W,H);c.restore();
const line=(parts,y,size)=>{c.save();c.font=`900 ${size}px "Inter Display"`;c.letterSpacing='3px';const ws=parts.map(p=>c.measureText(p[0]).width),sp=size*0.28,tot=ws.reduce((a,b)=>a+b,0)+sp*(parts.length-1);let x=540-tot/2;
  parts.forEach((p,i)=>{txt(c,p[0],x+ws[i]/2,y,size,p[1],{sw:size*0.2,ls:3});x+=ws[i]+sp;});c.restore();};
c.save();c.shadowColor='rgba(0,0,0,0.85)';c.shadowBlur=40;c.shadowOffsetY=12;
line([['A','#ffffff'],['WAVE','#ffffff'],['OF','#ffffff']],200,130);line([['BEER','#ff2a22']],370,190);line([['KILLED','#ffffff'],['8','#ff2a22']],530,140);c.restore();vignette(c,0.5);
