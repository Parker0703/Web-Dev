T=10.9;const t=10.9;
SCN.bdayBig=(c,w,t)=>{const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,'#f8dcc0');g.addColorStop(1,'#eab494');c.fillStyle=g;c.fillRect(-w/2,-w/2,w,w);c.fillStyle='#d8a07a';c.fillRect(-w/2,w*0.3,w,w*0.3);
  for(const [x,y,col] of [[-0.36,-0.32,'#e85a5a'],[0.34,-0.36,'#5ab0d8'],[0.4,-0.1,'#f2c84a'],[-0.42,-0.05,'#7cc47a']]){c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=w*0.01;c.beginPath();c.ellipse(x*w,y*w,w*0.08,w*0.095,0,0,TAU);c.fill();c.stroke();}
  baby(c,{x:-w*0.02,y:w*0.5,s:w/250,pose:'sit',hat:1,face:BF('happy','up','grin',{tilt:0.06}),hf:[24,-6],hb:[-24,-6],open:1,t});cake(c,w*0.04,w*0.6,w/700,t,1);};
richBG(c,t,'46,12,26');
{const g=c.createRadialGradient(540,1260,40,540,1260,760);g.addColorStop(0,'rgba(255,70,80,0.4)');g.addColorStop(1,'rgba(255,40,60,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}
{const P=nodesIn(70,4,540,1250,560,700);network(c,P,t,2,{col:'255,120,140',maxD:220,r:4});}
// render the photo on its own layer, then rebuild it row by row: the right side breaks into flying pixels
const PX=520,PY=1270,PW=760,ROT=-0.05;
const Ly=document.createElement('canvas');Ly.width=W;Ly.height=H;const l=Ly.getContext('2d');polaroid(l,PX,PY,PW,ROT,'bdayBig',t,{age:'AGE 1'});
const top=PY-PW*0.66,bot=PY+PW*0.66,rows=48,rh=(bot-top)/rows;
for(let r=0;r<rows;r++){const y=top+r*rh,brk=PX+PW*0.18+Math.sin(r*0.7)*40+hash(r*3.3)*70;const off=hash(r*9.1)<0.25?(hash(r*5)-0.5)*40:0;
  c.drawImage(Ly,0,y,brk,rh,off,y,brk,rh);
  // a few slices past the break, shifted right and tinted red
  if(hash(r*2.7)<0.5){const w2=40+hash(r*4.1)*120;c.drawImage(Ly,brk,y,w2,rh,brk+30+hash(r)*80,y,w2,rh);c.fillStyle='rgba(255,40,50,0.35)';c.fillRect(brk+30+hash(r)*80,y,w2,rh);}
  // pixels breaking off, sampled from the photo
  for(let k=0;k<5;k++){const sx=brk+k*18,sz=14+hash(r*7+k)*16,d=(k+1)*(40+hash(r*11+k)*60);c.globalAlpha=1-k*0.17;c.drawImage(Ly,sx,y,sz,sz,sx+d,y-d*0.25,sz,sz);}c.globalAlpha=1;}
for(let i=0;i<60;i++){const x=PX+PW*0.42+hash(i*2.1)*330,y=top+hash(i*4.3)*(bot-top)-hash(i)*120,sz=8+hash(i*6.6)*22;c.globalAlpha=0.3+0.6*hash(i*9);c.fillStyle=['#ff3a3a','#fbf8f0','#f2b4c4','#ff7a5a','#e8b898'][i%5];c.fillRect(x,y,sz,sz);}c.globalAlpha=1;
c.save();c.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const y=top+hash(i*13)*(bot-top);c.fillStyle='rgba(255,60,60,0.35)';c.fillRect(PX+PW*0.2,y,420,4+hash(i)*6);}c.restore();
c.save();c.shadowColor='rgba(0,0,0,0.65)';c.shadowBlur=36;c.shadowOffsetY=10;
txt(c,'YOUR BRAIN',540,400,128,'#ffffff',{sw:26,ls:2});
txt(c,'DELETED',540,560,186,'#ff2e2e',{sw:32,ls:4});
txt(c,'THIS',540,715,128,'#ffffff',{sw:26,ls:2});
c.restore();vign(c,0.45);
