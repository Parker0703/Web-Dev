// thumbnail: the poplar at golden hour, gunships + B-52s overhead, a US captain and a KPA officer face to face
SHOTS.length=0;SHOTS.push([0,(c,t)=>{t=6.2;T=t;camAt(c,'cv_tree',[0,15,0],1.0,{});tree3(c,t,T0P,{});
  heli(c,'huey',[-30,46,-80],0.3,t,{seed:5});heli(c,'cobra',[-26,24,-25],0.3,t,{});heli(c,'cobra',[13,21,-18],Math.PI-0.35,t,{seed:3});
  c.restore();cgrade(c,t,{flare:[860,560],top:'rgba(255,150,80,0.25)',v:0.55});
  {const g=c.createLinearGradient(0,1150,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(10,6,4,0.75)');c.fillStyle=g;c.fillRect(0,1150,W,770);}
  {c.save();c.strokeStyle='rgba(255,42,34,0.9)';c.lineWidth=9;c.shadowColor='rgba(0,0,0,0.6)';c.shadowBlur=12;const X=545,Y=880,R=300;c.beginPath();c.arc(X,Y,R,0,TAU);c.stroke();c.lineWidth=7;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])seg(c,X+dx*(R-60),Y+dy*(R-60),X+dx*(R+60),Y+dy*(R+60));c.restore();}
  who(c,'bonifas',[0,0,0],F('glare','angry','grit',{seed:7,f:1,view:'3q',abs:{x:280,y:1920,s:2.15}}));
  who(c,'kpaoff',[0,0,0],F('rage','furious','grit',{seed:8,f:-1,view:'3q',hf:[-150,-60],abs:{x:800,y:1920,s:2.15}}));
  c.save();const tg=c.createLinearGradient(0,0,0,820);tg.addColorStop(0,'rgba(10,6,4,0.88)');tg.addColorStop(1,'rgba(10,6,4,0)');c.fillStyle=tg;c.fillRect(0,0,W,820);c.restore();
  const line=(parts,y,size)=>{const meas=sz=>{c.font=`900 ${sz}px "Inter Display"`;c.letterSpacing='4px';const ws=parts.map(p=>c.measureText(p[0]).width);return [ws,ws.reduce((a,b)=>a+b,0)+sz*0.28*(parts.length-1)];};let [ws,tot]=meas(size);if(tot>960){size*=960/tot;[ws,tot]=meas(size);}const gap=size*0.28;let x=540-tot/2;
    parts.forEach((p,i)=>{txt(c,p[0],x+ws[i]/2,y,size,p[1],{sw:size*0.17,ls:4});x+=ws[i]+gap;});};
  c.save();c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=40;c.shadowOffsetY=12;
  txt(c,'KOREA, 1976',540,140,64,'#ffd23f',{sw:13,ls:10});line([['ALMOST','#fff'],['WAR','#ff2a22']],320,180);line([['OVER','#fff'],['1','#fff'],['TREE','#ff2a22']],520,190);c.restore();
  vignette(c,0.45);}]);
