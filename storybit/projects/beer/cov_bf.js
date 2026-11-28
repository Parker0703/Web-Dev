const t=3.4;T=t;LIT('#ffc080','#2a1a14');
londonSt(c,t,{x:540,y:1010,z:1.0},{GY:1180,houseH:640,poor:1,behind:(c2,GY)=>{wallWave(c2,t,GY-1000,GY+40,{debris:4});},world:(c2,GY)=>{
  for(let i=0;i<3;i++){const x0=-80+i*330,ry=GY-640*(0.86+hash(i*3)*0.12);curtain(c2,t+i*0.3,x0,x0+300,ry,GY+20,1,{sd:i});}
  const xF=()=>820;const F=mkF(c2,GY,{foamV:0,flow:0,vk:0.75});F.H=boreH({GY,skew:0.35,xF,Hf:720,Hd:300,L:300,toe:180,faceW:120});F.runup={xF,Hf:900,Hd:300};
  const bob=(kind,x,yg,sd,s2)=>({y:yg,draw:()=>{const s=sAtY(GY,yg)*s2,hS=F.H(x,yg,t)*s*0.75,surf=yg-hS;c2.save();c2.translate(x,surf+60*s);c2.rotate(-0.5+sd*0.2);c2.translate(-x,-(surf+60*s));
    BW(c2,kind,x,surf+180*s,s,t,{f:1,eyes:'shock',brow:'worried',mouth:'scream',seed:sd,hf:[40,-170],hb:[-50,-120]});c2.restore();whitewater(c2,t,x,surf+4*s,30*s,sd,0.95);spray(c2,t,x+20*s,surf-40*s,8,90*s,110*s,1,sd);}});
  F.actors=[bob('poorW',300,GY+260,1,1),bob('poorM2',520,GY+420,2,1),floater(F,'barrel',150,GY+380,0,{v:0,rot:0.6}),floater(F,'stave',420,GY+200,0,{v:0,rot:-0.5})];floodField(c2,t,F);
  // foreground: a man running straight at us, the surge right behind him
  BW(c2,'poorM',780,GY+760,2.3,t,{view:'front',run:1,ph:1.1,f:-1,eyes:'shock',brow:'worried',mouth:'scream',hf:[-80,40],hb:[70,50],sweat:1,look:[1,0],seed:4});spray(c2,t,640,GY+300,26,600,420,1,5);}});
c.save();const tg=c.createLinearGradient(0,0,0,760);tg.addColorStop(0,'rgba(10,6,4,0.85)');tg.addColorStop(1,'rgba(10,6,4,0)');c.fillStyle=tg;c.fillRect(0,0,W,760);c.restore();
c.save();c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=40;c.shadowOffsetY=12;
txt(c,'LONDON, 1814',540,150,70,'#ffd23f',{sw:14,ls:8});txt(c,'DROWNED',540,330,190,'#ffffff',{sw:30,ls:4});txt(c,'IN BEER',540,530,210,'#ff2a22',{sw:34,ls:6});c.restore();vignette(c,0.5);
