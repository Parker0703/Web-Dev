// ---------- shared scene helpers ----------
function street(c,t,cam,o={}){
  sky(c,t,o.sky||{});
  if(o.behind)o.behind(c);
  const pr=par(cam,0.35);world(c,pr,()=>{const hw=W/2/pr.z+500;roofs(c,pr.x-hw,pr.x+hw,t);});
  if(o.rain)rain(c,t,o.rain*0.5,1);
  const lights=[];
  world(c,cam,()=>{
    const hw=W/2/cam.z+500;
    facades(c,cam.x-hw,cam.x+hw,o);
    ground(c,cam.x-hw,cam.x+hw);
    if(o.lamps)for(const Lm of o.lamps){if(Lm.x<cam.x-hw||Lm.x>cam.x+hw)continue;
      const r=lamp(c,Lm.x,Lm.on,t);lights.push({...r,r:Lm.r,hr:Lm.hr});
      c.save();c.globalCompositeOperation='lighter';
      const g=c.createRadialGradient(Lm.x,GY+90,0,Lm.x,GY+90,420);g.addColorStop(0,`rgba(255,190,100,${0.32*Lm.on})`);g.addColorStop(1,'rgba(255,160,80,0)');
      c.fillStyle=g;c.save();c.translate(Lm.x,GY+90);c.scale(1,0.32);c.translate(-Lm.x,-GY-90);c.fillRect(Lm.x-420,GY-330,840,840);c.restore();
      const g2=c.createLinearGradient(0,GY+40,0,GY+700);g2.addColorStop(0,`rgba(255,190,110,${0.22*Lm.on})`);g2.addColorStop(1,'rgba(255,190,110,0)');
      c.fillStyle=g2;c.fillRect(Lm.x-22,GY+40,44,660);c.restore();}
    if(o.world)o.world(c);
  });
  return lights;
}
function finishStreet(c,t,cam,lights,o={}){
  darkness(c,o.dark??0.55,lights.concat(o.extra||[]),cam);
  glows(c,cam,lights.concat(o.extraGlow||[]));
}
function rain(c,t,amt,front){
  if(amt<=0)return;c.save();c.strokeStyle=`rgba(190,215,230,${0.35*amt})`;c.lineWidth=front?3:2;
  for(let i=0;i<(front?70:50);i++){const x=(hash(i*3+front)*W*1.3+t*-260)%(W*1.3);const xx=x<0?x+W*1.3:x;const y=(hash(i*7+front)*H+t*(1900+hash(i)*600))%H;seg(c,xx-60,y,xx-60-16,y+(front?70:46));}
  c.restore();
}
function ghosted(c,fn,t,n=3,dt=0.035,col='rgba(255,210,90,0.22)'){
  for(let k=n;k>=1;k--){const o=fn(t-k*dt);if(o){o.ghost=col;fig(c,o);}}
  const o=fn(t);if(o)return fig(c,o);
}
function brickRect(c,x,y,w,h,dark=0){
  const p=c.createPattern(SPR.brick,'repeat');p.setTransform(new DOMMatrix().scale(.5));c.fillStyle=p;c.fillRect(x,y,w,h);
  if(dark){c.fillStyle=`rgba(0,0,0,${dark})`;c.fillRect(x,y,w,h);}
}
// one-point perspective alley; d = how deep the end wall is (1 far .. 0 at camera)
function alley(c,t,d,o={}){
  const vx=W/2+(o.vx||0),vy=H*0.52;
  const k=lerp(0.08,1.05,1-d); // end wall size factor
  const ew=W*k*0.75,eh=H*k*0.62;
  const ex=vx-ew/2,ey=vy-eh/2;
  c.fillStyle='#05080b';c.fillRect(0,0,W,H);
  // sky strip
  const sg=c.createLinearGradient(0,0,0,ey);sg.addColorStop(0,'#081016');sg.addColorStop(1,'#1a2a30');c.fillStyle=sg;
  c.beginPath();c.moveTo(-200,-50);c.lineTo(W+200,-50);c.lineTo(ex+ew,ey);c.lineTo(ex,ey);c.closePath();c.fill();
  // side walls (brick, darkened)
  c.save();c.beginPath();c.moveTo(-200,-50);c.lineTo(ex,ey);c.lineTo(ex,ey+eh);c.lineTo(-200,H+300);c.closePath();c.clip();
  c.save();c.translate(ex,vy);c.transform(1,0,0,1,0,0);brickRect(c,-1600,-1600,1600,3200,0.3);c.restore();
  const lg=c.createLinearGradient(0,0,ex,0);lg.addColorStop(0,'rgba(0,0,0,0.1)');lg.addColorStop(1,'rgba(0,0,0,0.75)');c.fillStyle=lg;c.fillRect(-200,-50,ex+200,H+400);c.restore();
  c.save();c.beginPath();c.moveTo(W+200,-50);c.lineTo(ex+ew,ey);c.lineTo(ex+ew,ey+eh);c.lineTo(W+200,H+300);c.closePath();c.clip();
  c.save();c.translate(ex+ew,vy);brickRect(c,0,-1600,1600,3200,0.3);c.restore();
  const rg=c.createLinearGradient(ex+ew,0,W,0);rg.addColorStop(0,'rgba(0,0,0,0.75)');rg.addColorStop(1,'rgba(0,0,0,0.1)');c.fillStyle=rg;c.fillRect(ex+ew,-50,W,H+400);c.restore();
  // floor
  c.save();c.beginPath();c.moveTo(-200,H+300);c.lineTo(ex,ey+eh);c.lineTo(ex+ew,ey+eh);c.lineTo(W+200,H+300);c.closePath();c.clip();
  const fg=c.createLinearGradient(0,ey+eh,0,H);fg.addColorStop(0,'#0d1214');fg.addColorStop(1,'#22292b');c.fillStyle=fg;c.fillRect(-200,ey+eh,W+400,H);
  c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=3;for(let i=-8;i<=8;i++){seg(c,vx+i*30*k,ey+eh,vx+i*260,H+300);}
  for(let j=0;j<10;j++){const yy=ey+eh+Math.pow(j/10,1.8)*(H-ey-eh+300);seg(c,-200,yy,W+200,yy);}
  c.fillStyle='rgba(140,170,180,0.1)';c.beginPath();c.ellipse(vx+120,ey+eh+(H-ey-eh)*0.6,180,30,0,0,TAU);c.fill();
  c.restore();
  // end wall
  c.save();c.translate(ex,ey);c.scale(k,k);brickRect(c,0,0,ew/k,eh/k,0.15);c.restore();
  c.strokeStyle='#000';c.lineWidth=4;c.strokeRect(ex,ey,ew,eh);
  if(o.crack){c.strokeStyle='rgba(0,0,0,0.85)';c.lineWidth=6;const cx=vx,cy=vy;for(let i=0;i<9;i++){let a=i/9*TAU+0.3,x=cx,y=cy;c.beginPath();c.moveTo(x,y);for(let j=0;j<4;j++){a+=(hash(i*5+j)-.5)*0.8;x+=Math.cos(a)*90*o.crack;y+=Math.sin(a)*90*o.crack;c.lineTo(x,y);}c.stroke();}}
  // wall lanterns on side walls
  const lights=[];
  if(o.lamps){for(let i=0;i<o.lamps;i++){const z=(i+0.5)/o.lamps;const kk=lerp(k,2.2,1-z);const side=i%2?1:-1;
      const lx=vx+side*(ew/2+(W*0.6-ew/2)*(1-z)),ly=vy-eh*0.25-(H*0.2)*(1-z);
      const on=o.flick?(0.35+0.65*(hash(Math.floor(t*12)+i*17)>0.35?1:0.2)):1;
      lights.push({x:lx,y:ly,on,r:200*kk,hr:300*kk});
      c.fillStyle='#0d0f0e';c.fillRect(lx-12*kk,ly-20*kk,24*kk,36*kk);c.fillStyle=`rgba(255,${180+40*on},90,${on})`;c.fillRect(lx-8*kk,ly-14*kk,16*kk,24*kk);}}
  return {ex,ey,ew,eh,k,lights};
}
function screenLights(c,list,amount){ // darkness with screen-space lights + glows
  darkness(c,amount,list.map(l=>({x:l.x,y:l.y,on:l.on,hr:l.hr||400})),null);
  c.save();c.globalCompositeOperation='lighter';
  for(const l of list){const r=l.r||300;const g=c.createRadialGradient(l.x,l.y,0,l.x,l.y,r);g.addColorStop(0,`rgba(255,200,110,${0.5*l.on})`);g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(l.x-r,l.y-r,2*r,2*r);}
  c.restore();
}
function shutterWin(c,w,x,y,p){ // shutters closing over a lit window, p 0..1
  if(p<=0)return;const hw=w.w/2*p;
  c.fillStyle='#3a2414';c.strokeStyle='#120a05';c.lineWidth=3;
  c.fillRect(x+w.x-4,y+w.y-4,hw+4,w.h+8);c.fillRect(x+w.x+w.w-hw,y+w.y-4,hw+4,w.h+8);
  for(let i=1;i<5;i++){seg(c,x+w.x,y+w.y+i*w.h/5,x+w.x+hw,y+w.y+i*w.h/5);seg(c,x+w.x+w.w-hw,y+w.y+i*w.h/5,x+w.x+w.w,y+w.y+i*w.h/5);}
}
function tophat(c,x,y,s){c.fillStyle='#070708';c.strokeStyle='rgba(150,30,35,0.8)';c.lineWidth=3*s;
  c.beginPath();c.ellipse(x,y,80*s,20*s,0,0,TAU);c.fill();c.stroke();
  c.beginPath();c.moveTo(x-46*s,y-6*s);c.lineTo(x-50*s,y-120*s);c.lineTo(x+50*s,y-120*s);c.lineTo(x+46*s,y-6*s);c.closePath();c.fill();c.stroke();
  c.beginPath();c.ellipse(x,y-120*s,50*s,12*s,0,0,TAU);c.fill();c.stroke();c.fillStyle='#3a0a0c';c.fillRect(x-48*s,y-34*s,96*s,14*s);
  c.fillStyle='rgba(255,255,255,0.08)';c.fillRect(x-36*s,y-110*s,14*s,96*s);}
function scriptText(c,s,x,y,size,col,p,o={}){ // handwriting revealed left->right
  c.save();c.font=`${o.w||700} ${size}px ${o.font||'"TeX Gyre Chorus"'}`;c.textAlign='left';c.textBaseline='alphabetic';
  const w=c.measureText(s).width;const x0=o.al==='center'?x-w/2:x;
  c.beginPath();c.rect(x0-20,y-size*1.2,(w+40)*clamp(p),size*1.8);c.clip();
  if(o.glow){c.shadowColor=o.glow;c.shadowBlur=o.blur||20;}
  c.fillStyle=col;c.fillText(s,x0,y);if(o.bold){c.fillText(s,x0+1.5,y);}
  c.restore();return w;
}
function paperSheet(c,x,y,w,h,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.shadowColor='rgba(0,0,0,0.6)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#e6d6b0';c.fillRect(-w/2,-h/2,w,h);c.shadowColor='transparent';c.drawImage(SPR.paper,-w/2,-h/2,w,h);c.restore();}
function candle(c,x,y,lit,t,i){
  c.fillStyle='rgba(0,0,0,0.5)';c.beginPath();c.ellipse(x,y+4,52,12,0,0,TAU);c.fill();
  const g=c.createLinearGradient(x-26,0,x+26,0);g.addColorStop(0,'#bfb59a');g.addColorStop(.4,'#f3ecd8');g.addColorStop(1,'#a89d80');
  c.fillStyle=g;c.fillRect(x-26,y-170,52,170);c.strokeStyle='#0b0b0d';c.lineWidth=4;c.strokeRect(x-26,y-170,52,170);
  c.fillStyle='#e9e2cc';c.beginPath();c.ellipse(x,y-170,26,8,0,0,TAU);c.fill();c.stroke();
  c.fillStyle='#e9e2cc';c.beginPath();c.moveTo(x+10,y-170);c.quadraticCurveTo(x+16,y-130,x+12,y-120);c.quadraticCurveTo(x+6,y-140,x+10,y-170);c.fill();
  c.strokeStyle='#222';c.lineWidth=3;seg(c,x,y-170,x,y-186);
  if(lit>0){const fl=1+Math.sin(t*17+i*3)*0.08+Math.sin(t*29+i)*0.05,k=back(lit)*fl;
    c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(x,y-205,0,x,y-205,300*k);gg.addColorStop(0,'rgba(255,190,90,0.55)');gg.addColorStop(1,'rgba(255,140,40,0)');c.fillStyle=gg;c.fillRect(x-300,y-505,600,600);c.restore();
    c.save();c.translate(x+Math.sin(t*9+i)*2,y-186);c.scale(k,k);
    c.fillStyle='#ff9a2a';c.beginPath();c.moveTo(0,-56);c.quadraticCurveTo(18,-16,12,0);c.quadraticCurveTo(0,8,-12,0);c.quadraticCurveTo(-18,-16,0,-56);c.fill();
    c.fillStyle='#fff3c0';c.beginPath();c.moveTo(0,-34);c.quadraticCurveTo(9,-10,6,0);c.quadraticCurveTo(0,4,-6,0);c.quadraticCurveTo(-9,-10,0,-34);c.fill();c.restore();}
}
function newspaper(c,x,y,s,rot,head='JACK THE RIPPER'){
  c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=20;c.fillStyle='#ebe4cf';c.fillRect(-170,-220,340,440);c.shadowColor='transparent';
  c.strokeStyle='#222';c.lineWidth=3;c.strokeRect(-170,-220,340,440);
  c.fillStyle='#111';c.font='900 30px "Lora"';c.textAlign='center';c.fillText('THE ILLUSTRATED',0,-178);c.fillRect(-150,-166,300,4);
  c.fillStyle='#9a0e0e';c.font='900 40px "Inter Display"';c.fillText(head.split(' ').slice(0,1).join(' '),0,-118);c.fillText(head.split(' ').slice(1).join(' '),0,-74);
  c.fillStyle='#444';c.fillRect(-150,-50,140,120);c.fillStyle='#111';c.beginPath();c.arc(-80,-10,22,0,TAU);c.fill();c.fillRect(-100,10,40,60);c.fillRect(-114,-40,68,8);c.fillRect(-100,-70,40,32);
  c.fillStyle='rgba(0,0,0,0.45)';for(let i=0;i<9;i++)c.fillRect(10,-50+i*14,140,6);for(let i=0;i<8;i++)c.fillRect(-150,90+i*14,300,6);
  c.restore();
}
function boxProp(c,x,y,s,lid,shake){ // small cardboard box, lid 0..1 open
  c.save();c.translate(x+shake,y);c.scale(s,s);
  c.fillStyle='rgba(0,0,0,0.5)';c.beginPath();c.ellipse(0,8,170,26,0,0,TAU);c.fill();
  c.fillStyle='#a87a44';c.strokeStyle='#0b0b0d';c.lineWidth=5;c.fillRect(-140,-150,280,150);c.strokeRect(-140,-150,280,150);
  c.fillStyle='#8a6034';c.fillRect(-140,-150,280,30);
  c.fillStyle='#efe6cc';c.fillRect(-70,-100,140,56);c.strokeRect(-70,-100,140,56);c.fillStyle='#222';c.font='700 26px "Lora"';c.textAlign='center';c.fillText('Mr Lusk',0,-64);
  c.save();c.translate(-150,-150-lid*170);c.rotate(-lid*0.5);
  c.fillStyle='#b88a52';c.beginPath();c.moveTo(0,4);c.lineTo(300,4);c.lineTo(290,-26-lid*40);c.lineTo(10,-26-lid*40);c.closePath();c.fill();c.stroke();if(lid<0.3){c.strokeStyle='#e8dcc0';c.lineWidth=4;seg(c,150,-26,150,4);}c.restore();
  if(lid>0.2){c.fillStyle='#1a120a';c.fillRect(-130,-148,260,24);}
  if(lid<0.3){c.strokeStyle='#e8dcc0';c.lineWidth=4;seg(c,0,-150,0,0);seg(c,-140,-80,140,-80);}
  c.restore();
}
function jarKidney(c,p){
  c.fillStyle='#120c0a';c.fillRect(-300,-300,600,600);
  const k=back(p/0.4);c.save();c.scale(k,k);
  c.fillStyle='rgba(200,230,220,0.18)';c.strokeStyle='#cfe4dc';c.lineWidth=7;rr(c,-110,-130,220,260,40);c.fill();c.stroke();
  c.fillStyle='#5c4a3a';c.fillRect(-118,-160,236,40);c.strokeStyle='#0b0b0d';c.lineWidth=4;c.strokeRect(-118,-160,236,40);
  c.fillStyle='rgba(190,210,140,0.35)';c.fillRect(-104,-60,208,182);
  c.save();c.translate(0,40);c.rotate(-0.3+Math.sin(p*4)*0.05);
  c.fillStyle='#8e2b3a';c.strokeStyle='#3a0a12';c.lineWidth=6;c.beginPath();c.moveTo(-34,-58);c.bezierCurveTo(-90,-60,-92,50,-30,62);c.bezierCurveTo(10,68,30,40,10,14);c.bezierCurveTo(0,0,8,-10,14,-20);c.bezierCurveTo(30,-50,10,-60,-34,-58);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,180,190,0.35)';c.beginPath();c.ellipse(-46,-20,10,22,0.3,0,TAU);c.fill();c.restore();
  c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(-90,-110,16,200);
  c.fillStyle='#efe6cc';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.fillRect(-80,100,160,52);c.strokeRect(-80,100,160,52);txt(c,'½ KIDNEY',0,127,32,'#a01010',{stroke:false});
  c.restore();
}
function cuffs(c,x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.strokeStyle='#0b0b0d';c.lineWidth=26;
  for(const dx of [-70,70]){c.beginPath();c.arc(dx,0,50,0.25*Math.PI,2.05*Math.PI);c.stroke();}
  c.strokeStyle='#b9c0c8';c.lineWidth=16;for(const dx of [-70,70]){c.beginPath();c.arc(dx,0,50,0.25*Math.PI,2.05*Math.PI);c.stroke();}
  c.strokeStyle='#8a929c';c.lineWidth=8;for(let i=0;i<3;i++){c.beginPath();c.ellipse(-24+i*24,-46,12,7,0,0,TAU);c.stroke();}c.restore();}
function mapPin(c,x,y,p){if(p<=0)return;const k=spring(p*1.2),dy=(1-clamp(p/0.12))*-300;
  c.save();c.translate(x,y+dy);c.scale(k,k);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(10,6,22,8,0,0,TAU);c.fill();
  c.strokeStyle='#222';c.lineWidth=6;seg(c,0,0,0,-70);c.fillStyle='#d8201a';c.strokeStyle='#0b0b0d';c.lineWidth=5;c.beginPath();c.arc(0,-84,30,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.5)';c.beginPath();c.arc(-9,-94,9,0,TAU);c.fill();c.restore();
  if(p<0.6)ring(c,x,y,lerp(20,240,eo(p/0.6)),(1-p/0.6)*0.8,'rgba(220,30,20,',8);}
function clock(c,x,y,r,spin,t){c.save();c.translate(x,y);c.fillStyle='#efe6cc';c.strokeStyle='#0b0b0d';c.lineWidth=10;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();
  for(let i=0;i<12;i++){const a=i/12*TAU;c.lineWidth=i%3?3:7;seg(c,Math.cos(a)*r*0.78,Math.sin(a)*r*0.78,Math.cos(a)*r*0.92,Math.sin(a)*r*0.92);}
  c.lineCap='round';c.lineWidth=12;const a1=-Math.PI/2+spin*TAU/12;seg(c,0,0,Math.cos(a1)*r*0.5,Math.sin(a1)*r*0.5);c.lineWidth=7;c.strokeStyle='#a01010';const a2=-Math.PI/2+spin*TAU;seg(c,0,0,Math.cos(a2)*r*0.8,Math.sin(a2)*r*0.8);
  c.fillStyle='#0b0b0d';c.beginPath();c.arc(0,0,12,0,TAU);c.fill();c.restore();}
function chalkLines(c,x,y,p,t){ // illegible chalk scrawl, p = visibility
  if(p<=0)return;c.save();c.globalAlpha=p;c.strokeStyle='rgba(235,235,225,0.9)';c.lineWidth=7;c.lineCap='round';c.lineJoin='round';
  c.shadowColor='rgba(255,255,240,0.7)';c.shadowBlur=14*p;
  for(let r=0;r<5;r++){c.beginPath();let xx=x-170+(r%2)*20;const yy=y+r*62;c.moveTo(xx,yy);
    const n=8+Math.floor(hash(r)*5);for(let i=0;i<n;i++){const w=22+hash(r*31+i)*18;const h=18+hash(r*7+i)*26;
      c.quadraticCurveTo(xx+w*0.3,yy-h,xx+w*0.6,yy-h*0.2);c.quadraticCurveTo(xx+w*0.8,yy+h*0.4,xx+w,yy);xx+=w+(hash(i+r*3)>.75?18:0);if(hash(i*9+r)>.8)c.moveTo(xx+14,yy);}
    c.stroke();}
  c.restore();}
function bonkStars(c,x,y,t){for(let i=0;i<5;i++){const a=t*6+i/5*TAU;const sx=x+Math.cos(a)*70,sy=y+Math.sin(a)*22;c.fillStyle='#ffd84a';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.beginPath();for(let k=0;k<10;k++){const r=k%2?7:16,aa=k/10*TAU-Math.PI/2;c.lineTo(sx+Math.cos(aa)*r,sy+Math.sin(aa)*r);}c.closePath();c.fill();c.stroke();}}
function comic(c,s,x,y,p,col='#ffd84a',size=70,rot=-0.1){if(p<=0||p>1)return;const k=back(p/0.25)*(p>0.8?1-(p-0.8)/0.2:1);c.save();c.translate(x,y);c.rotate(rot);c.scale(k,k);txt(c,s,0,0,size,col,{sw:14,ls:3});c.restore();}

