SHOTS.length=0;SHOTS.push([0,(c,t)=>{t=3.3;T=t;camAt(c,'ca_think',[0,11,-40],1.08,{});
  {const L=[];for(let i=0;i<5;i++){const p=gp(120+i*210,1330+(i%2)*30);L.push(A_(p,()=>camel(c,p,0.5,t,{still:1})));}depth(L);}c.restore();regrade(c,'blur(4px)');
  cgrade(c,t,{flare:[260,760],v:0.45});
  coinRain(c,t,34,{sp:700,r:22});
  {const g=c.createLinearGradient(0,1200,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(20,8,0,0.6)');c.fillStyle=g;c.fillRect(0,1200,W,720);}
  const r=who(c,'musa',[0,0,0],F('happy','up','grin',{seed:2,f:1,view:'3q',abs:{x:470,y:2060,s:3.1},hf:[210,-120]}));if(r)goldPile(c,r.hf.x+10,r.hf.y+4,170,64,6);
  {c.save();c.globalCompositeOperation='screen';for(let i=0;i<14;i++){const x=hash(i)*W,y=820+hash(i*3)*300,rr=2+hash(i*5)*4;const gg=c.createRadialGradient(x,y,0,x,y,rr*5);gg.addColorStop(0,'rgba(255,240,180,0.9)');gg.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=gg;c.fillRect(x-rr*5,y-rr*5,rr*10,rr*10);}c.restore();}
  c.save();const tg=c.createLinearGradient(0,0,0,860);tg.addColorStop(0,'rgba(18,8,2,0.9)');tg.addColorStop(1,'rgba(18,8,2,0)');c.fillStyle=tg;c.fillRect(0,0,W,860);c.restore();
  const line=(parts,y,size)=>{const meas=sz=>{c.font=`900 ${sz}px "Inter Display"`;c.letterSpacing='4px';const ws=parts.map(p=>c.measureText(p[0]).width);return [ws,ws.reduce((a,b)=>a+b,0)+sz*0.28*(parts.length-1)];};let [ws,tot]=meas(size);if(tot>970){size*=970/tot;[ws,tot]=meas(size);}const gap=size*0.28;let x=540-tot/2;
    parts.forEach((p,i)=>{txt(c,p[0],x+ws[i]/2,y,size,p[1],{sw:size*0.17,ls:4});x+=ws[i]+gap;});};
  c.save();c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=40;c.shadowOffsetY=12;
  txt(c,'MALI, 1324',540,140,62,'#ffd23f',{sw:13,ls:10});line([['HE','#fff'],['CRASHED','#ff2a22']],310,170);line([['AN','#fff'],['ECONOMY','#fff']],490,170);line([['WITH','#fff'],['GOLD','#ff2a22']],670,170);c.restore();
  vignette(c,0.4);}]);
