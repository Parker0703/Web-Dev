const t=2.4;LIT('#ff9a60','#2a1410');
outback(c,t,{x:540,y:1000,z:1.0,mm:35},{land:'scrub',dusk:1,lift:470,sunX:640,world:(c2,GY)=>{const P=PSP(GY,GY+800,2.4);
  for(let i=0;i<10;i++){const p=i/10;c2.fillStyle=`rgba(200,110,60,${0.28*(1-p)})`;c2.beginPath();c2.ellipse(700+Math.sin(i)*200,GY+300-i*30,300+i*60,90+i*20,0,0,TAU);c2.fill();}
  flock(c2,t,{n:70,x0:-200,x1:1300,y0:GY+30,y1:GY+520,persp:P,pose:'run',view:'q3',seed:7,f:-1});
  const G=gunner(c2,200,GY+1020,2.5,t,{fire:false,ang:-0.1,eyes:'shock',brow:'worried',mouth:'scream',sweat:1});for(let i=0;i<5;i++)tracer(c2,G.muzzle.x,G.muzzle.y,600+i*120,GY+200+i*40,t,i);
  emu(c2,960,GY+1180,4.6,t,{pose:'stand',view:'front',seed:3});for(let i=0;i<6;i++)dustHit(c2,420+i*110,GY+330+(i%3)*60,1.5,t+i*0.15,i);}});
c.save();c.globalCompositeOperation='lighter';const rg=c.createRadialGradient(780,900,50,780,900,700);rg.addColorStop(0,'rgba(255,120,60,0.25)');rg.addColorStop(1,'rgba(255,120,60,0)');c.fillStyle=rg;c.fillRect(0,0,W,H);c.restore();
const line=(parts,y,size)=>{c.save();c.font=`900 ${size}px "Inter Display"`;c.letterSpacing='3px';const ws=parts.map(p=>c.measureText(p[0]).width),sp=size*0.28,tot=ws.reduce((a,b)=>a+b,0)+sp*(parts.length-1);let x=540-tot/2;
  parts.forEach((p,i)=>{txt(c,p[0],x+ws[i]/2,y,size,p[1],{sw:size*0.2,ls:3});x+=ws[i]+sp;});c.restore();};
c.save();c.shadowColor='rgba(0,0,0,0.8)';c.shadowBlur=40;c.shadowOffsetY=12;
line([['AUSTRALIA','#ffffff']],190,138);line([['LOST','#ff2a22'],['A','#ffffff'],['WAR','#ffffff']],345,132);line([['TO','#ffffff'],['EMUS','#ff2a22']],505,150);c.restore();vignette(c,0.55);
