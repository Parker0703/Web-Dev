T=2.0;const t=2.0;window.SS=1;
camAt(c,'ne_street',[6,3.2,0],1.25,{oy:-160});const fx=-1.5;molassesSheet(c,t,-60,fx-1,-7,7,0.9,{edge:false});
const A=[victimActor(c,'dock2',-3.4,-1.4,fx,t,{seed:3}),victimActor(c,'dock',-0.6,2.2,fx,t,{seed:7}),{pos:[7.4,0,1.6],draw:()=>who(c,'boy',[7.4,0,1.6],F('shock','up','scream',{seed:1,run:1,ph:2.2,f:-1}))},{pos:[8.6,0,-1.2],draw:()=>who(c,'girl',[8.6,0,-1.2],F('wide','worried','scream',{seed:4,run:1,ph:3.4,f:-1}))}];
wave3(c,t,fx,7.6,{debris:8,actors:A});c.restore();
c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,120,70,0.18)';c.fillRect(0,0,W,H);c.restore();vignette(c,0.5);
const line=(parts,y,size)=>{c.save();c.font=`900 ${size}px "Inter Display"`;c.letterSpacing='3px';const ws=parts.map(p=>c.measureText(p[0]).width),sp=size*0.28,tot=ws.reduce((a,b)=>a+b,0)+sp*(parts.length-1);let x=540-tot/2;parts.forEach((p,i)=>{txt(c,p[0],x+ws[i]/2,y,size,p[1],{sw:size*0.2,ls:3});x+=ws[i]+sp;});c.restore();};
c.save();c.shadowColor='rgba(0,0,0,0.85)';c.shadowBlur=40;c.shadowOffsetY=12;line([['A','#fff'],['WAVE','#fff'],['OF','#fff']],190,135);line([['MOLASSES','#ff2a22']],350,160);line([['KILLED','#fff'],['21','#ff2a22']],510,140);c.restore();
