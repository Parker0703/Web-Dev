// ---------- shared scene helpers ----------
function street(c,t,cam,o={}){
  sky(c,t,o.sky||{});
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

// ---------- shots ----------
const SH={};
function scam(x,z,gs=1600){return {x,y:GY-(gs-960)/z,z};}
SH.A=function(c,t){
  let z=lerp(0.8,1.3,eo(inv(0.07,0.55,t)))+0.15*inv(0.6,5.1,t)+0.75*eio(inv(5.1,6.0,t))-0.6*eo(inv(6.32,6.7,t));
  let gs=lerp(1620,lerp(1620,2350,eio(inv(5.1,6.0,t))),1);if(t>6.32)gs=lerp(2350,1640,eo(inv(6.32,6.7,t)));
  const cam=scam(lerp(-40,40,inv(0,8.6,t)),z,gs);if(t>5.1&&t<6.7){cam.x=lerp(cam.x,60,eio(inv(5.1,6.0,t))*(1-eo(inv(6.32,6.7,t))));}
  FX.speed=Math.max(FX.speed,1-inv(0.07,0.5,t));
  let on=1;if(t>5.1&&t<6.32){on=hash(Math.floor(t*16))>0.45?1:0.15;if(t>5.85&&t<6.1)on=0;}
  const gone=t>5.92;
  const lights=street(c,t,cam,{seed:1,lamps:[{x:-130,on}],onFacade:(i,x,y,F)=>{
    for(const w of F.wins){if(!w.lit)continue;const wx=x+w.x;const ts=1.95+((wx+900)/1800)*2.6;shutterWin(c,w,x,y,eo(inv(ts,ts+0.12,t)));}},
    world:(c)=>{
      if(!gone)ripper(c,{x:60,y:GY,s:1.6,f:-1,t,glint:t>4.0&&t<4.6?lerp(1,0.45,inv(4.0,4.6,t)):0.45});
      // runners in foreground
      for(let i=0;i<3;i++){const t0=1.75+i*0.6;
        ghosted(c,tt=>{const p=(tt-t0)/1.5;if(p<0||p>1)return null;return {x:lerp(800,-900,p),y:GY+140+i*25,s:1.55,f:-1,t:tt,run:1,ph:tt*15+i,kind:['town','woman','town'][i],eyes:'wide',mouth:'scream',brow:'worried',sweat:2,seed:i};},t,3,0.04,'rgba(255,255,255,0.16)');}
    }});
  fog(c,t,0.75,{n:9,y0:1300,y1:1900,sp:30,seed:2});
  // parting fog reveal
  const pr=eo(inv(0.07,1.3,t));if(pr<1){c.save();c.globalAlpha=1-pr*0.6;c.drawImage(SPR.fog,W/2-900-pr*800,500,1400,1300);c.drawImage(SPR.fog,W/2-500+pr*800,500,1400,1300);c.drawImage(SPR.fog,W/2-700,700,1400,1100);c.restore();}
  finishStreet(c,t,cam,lights,{dark:0.6});
  card(c,0.35,t,'LONDON · 1888','',1640,{end:1.65,tag:'',w:600,size:68});
  if(t>6.32){const p=t-6.32;bigQ(c,W/2,1020,spring(p*1.3)*(1+Math.sin(p*6)*0.03),t);if(p<0.5)ring(c,W/2,1020,lerp(120,900,eo(p/0.5)),(1-p/0.5)*0.7,'rgba(255,90,70,',14);}
};
SH.B=function(c,t){
  const t0=A(4),tEnd=WT(4,10);
  const travel=(tt)=>{if(tt<t0)return 0;if(tt<tEnd)return (tt-t0)*560+eo(inv(t0,t0+0.4,tt))*-120+120;return (tEnd-t0)*560+eo(inv(tEnd,tEnd+0.35,tt))*90;};
  const cy=-travel(t);const z=1.25;
  FX.speed=Math.max(FX.speed,(1-inv(t0,t0+0.35,t))*0.8);
  c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(0,-cy);
  // top-down cobbles
  const p=c.createPattern(SPR.cobble,'repeat');p.setTransform(new DOMMatrix().scale(.5));c.fillStyle=p;c.fillRect(-800,cy-1200,1600,2400);
  c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(-800,cy-1200,1600,2400);
  // puddles
  for(let i=0;i<6;i++){const py=-i*700-200,px=(hash(i)-.5)*700;c.fillStyle='rgba(120,160,175,0.22)';c.beginPath();c.ellipse(px,py,160,70,0.2,0,TAU);c.fill();c.fillStyle='rgba(255,210,140,0.12)';c.beginPath();c.ellipse(px+30,py-10,60,16,0.2,0,TAU);c.fill();}
  // prints
  const endY=-(tEnd-t0)*560-300;
  for(let k=0;k<40;k++){const y=-k*170+200;if(y<endY)break;const side=k%2?1:-1;const x=side*48;
    c.save();c.translate(x,y);c.rotate(side*0.08);
    c.fillStyle='rgba(5,8,10,0.75)';c.beginPath();c.ellipse(0,-26,26,44,0,0,TAU);c.fill();c.beginPath();c.ellipse(0,46,20,24,0,0,TAU);c.fill();
    c.fillStyle='rgba(170,200,210,0.28)';c.beginPath();c.ellipse(-8,-40,8,18,0,0,TAU);c.fill();c.restore();}
  // fog swirl at the end
  const sw=inv(tEnd,tEnd+1.2,t);
  c.save();c.globalAlpha=0.35+0.5*sw;for(let i=0;i<5;i++){const a=t*1.5+i*1.3;c.drawImage(SPR.fog,Math.cos(a)*120-360,endY-240+Math.sin(a)*60-260,720,520);}c.restore();
  c.restore();
  // lamp light from side
  const lg=c.createRadialGradient(W*0.85,H*0.35,0,W*0.85,H*0.35,1100);lg.addColorStop(0,'rgba(255,190,110,0.28)');lg.addColorStop(1,'rgba(255,160,80,0)');
  c.save();c.globalCompositeOperation='lighter';c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();
  fog(c,t,0.4,{n:8,y0:0,y1:H,sp:40,seed:9});
  if(t>tEnd){const p=t-tEnd;const sy=H/2+(endY-cy)*z;bigQ(c,W/2,sy-60,0.42*spring(p*1.4),t,0.92);}
};
SH.C=function(c,t){
  if(t<A(6)){ // autumn street
    const cam=scam(lerp(-100,500,inv(A(5),A(6),t)),1.2);
    const lights=street(c,t,cam,{seed:3,lamps:[{x:-200,on:1},{x:700,on:1}],world:(c)=>{
      fig(c,{x:lerp(150,470,inv(A(5),A(6),t)),y:GY+80,s:1.45,f:1,t,run:0.35,ph:t*7,kind:'woman',eyes:'half',mouth:'flat',seed:1});
      fig(c,{x:lerp(860,640,inv(A(5),A(6),t)),y:GY+60,s:1.4,f:-1,t,run:0.35,ph:t*7+1,kind:'town',eyes:'half',mouth:'frown',brow:'worried',seed:2});}});
    leaves(c,t,30);fog(c,t,0.4,{n:7,y0:1300,y1:1900,seed:4});
    finishStreet(c,t,cam,lights,{dark:0.45});leaves(c,t+3.1,14);
    card(c,WT(5,3),t,'WHITECHAPEL','EAST LONDON · 1888',1660,{end:A(6)-0.1,tag:'LOCATION'});
  } else if(t<A(7)){ // poorest corner
    const p=inv(A(6),A(7),t);
    const cam=scam(lerp(1350,2450,eo(p*1.6)*0.75+p*0.25),1.25,1620);
    FX.speed=Math.max(FX.speed,(1-inv(A(6),A(6)+0.35,t)));FX.speedDir=1;
    const lights=street(c,t,cam,{seed:3,lamps:[{x:1500,on:1},{x:2500,on:0.9}],world:(c)=>{
      // washing lines
      c.strokeStyle='#111';c.lineWidth=3;for(let i=0;i<3;i++){const x0=1300+i*520;c.beginPath();c.moveTo(x0,700);c.quadraticCurveTo(x0+200,780,x0+420,700);c.stroke();
        for(let k=0;k<4;k++){const xx=x0+60+k*90;const yy=700+Math.sin((k+1)/5*Math.PI)*70;c.fillStyle=['#8a8270','#6a5040','#9a9a8a','#5a4a4a'][k];c.save();c.translate(xx,yy);c.rotate(Math.sin(t*2+k)*0.1);c.fillRect(-26,0,52,70+hash(k+i)*30);c.restore();}}
      const crowd=[[1450,'woman',-1,1.05],[1660,'town',1,1.1],[1880,'news',1,0.7],[2050,'woman',1,1.0],[2280,'town',-1,1.12],[2520,'woman',-1,1.0],[2720,'town',1,1.05]];
      crowd.forEach((q,i)=>{const shiver=Math.sin(t*40+i)*1.6;
        fig(c,{x:q[0]+shiver,y:GY+60+(i%2)*40,s:q[3]*1.35,f:q[2],t,kind:q[1],eyes:i%3?'half':'open',mouth:i%2?'frown':'flat',brow:'worried',lean:i===4?0.25+Math.max(0,Math.sin(t*6))*0.15:0,seed:i,hf:i===1?[18*q[2],40]:null});});
    }});
    fog(c,t,0.45,{n:7,y0:1300,y1:1900,seed:5});finishStreet(c,t,cam,lights,{dark:0.42});
  } else if(t<A(8)){ // fog hand
    const p=inv(A(7),A(8)-0.2,t);
    c.fillStyle='#1b2a30';c.fillRect(0,0,W,H);
    const cam={x:0,y:1120,z:lerp(1.0,1.12,p)};
    const lights=street(c,t,{x:200,y:1000,z:0.9},{seed:6,lamps:[{x:500,on:0.8}]});
    finishStreet(c,t,{x:200,y:1000,z:0.9},lights,{dark:0.4});
    fog(c,t,0.5+p*0.5,{n:10,y0:300,y1:1700,sz:1300,sp:60,seed:11});
    world(c,cam,()=>{fig(c,{x:-40,y:GY+260,s:3.0,f:1,t,kind:'town',eyes:'wide',brow:'worried',mouth:p>0.5?'o':'flat',sweat:p>0.4?2:0,hf:[78,-62+Math.sin(t*3)*3],look:[3,-2],seed:3});});
    // fog swallowing the hand first, then everything
    c.save();c.globalAlpha=clamp(p*1.6);for(let i=0;i<5;i++){const a=t*0.8+i;c.drawImage(SPR.fog,700+Math.cos(a)*80-500,560+Math.sin(a)*60-300,1000,700);}c.restore();
    fog(c,t,p*0.9,{n:12,y0:200,y1:1800,sz:1400,sp:80,seed:12});
    c.fillStyle=`rgba(150,175,182,${p*0.55})`;c.fillRect(0,0,W,H);
  } else { // gas lamps flicker -> dash down alley -> dead end
    const hit=WT(8,4)+0.25;
    if(t<A(8)+1.05){
      const p=inv(A(8),A(8)+1.05,t);
      const cam=scam(lerp(0,700,p),1.0,1640);
      const lamps=[];for(let i=-2;i<6;i++){const x=i*420;lamps.push({x,on:hash(Math.floor(t*13)+i*7)>0.3?1:0.15});}
      const lights=street(c,t,cam,{seed:7,lamps});fog(c,t,0.5,{n:8,y0:1200,y1:1900,seed:13});finishStreet(c,t,cam,lights,{dark:0.6});
    } else {
      const p=inv(A(8)+1.05,hit,t);const d=t<hit?1-ei(p)*0.97:0.03-0.02*Math.sin(inv(hit,hit+0.3,t)*Math.PI);
      FX.speed=Math.max(FX.speed,t<hit?0.4+p*0.6:0);
      const al=alley(c,t,d,{lamps:4,flick:true,crack:t>hit?eo(inv(hit,hit+0.15,t)):0});
      screenLights(c,al.lights,0.55);
      if(t>hit){dust(c,W/2,H*0.6,inv(hit,hit+0.7,t),16,'rgba(190,170,150,',4);comic(c,'DEAD END',W/2,H*0.62,inv(hit+0.05,hit+1.0,t),'#ff3a2e',96,-0.06);}
    }
  }
};
SH.D=function(c,t){
  const t0=A(9),tr=WT(10,1);
  const al=alley(c,t,0.55,{lamps:0});
  const walk=t<A(10)+0.1;const bx=walk?lerp(-200,420,inv(t0,A(10)+0.1,t)):420;
  const cz=lerp(1,1.9,eio(inv(tr,tr+0.6,t)));
  c.save();c.translate(W/2,H*0.62);c.scale(cz,cz);c.translate(-W/2,-H*0.62);
  const sw=Math.sin(t*5)*0.25*(walk?1:0.4);
  const r=fig(c,{x:bx,y:1640,s:2.1,f:1,t,run:walk?0.45:0,ph:t*8,kind:'bobby',eyes:t>tr?'wide':'open',brow:t>tr?'up':'worried',mouth:t>tr?'o':'flat',sweat:t>A(10)?2:1,
    hf:walk?null:[64,lerp(60,-10,eo(inv(A(10),A(10)+0.4,t)))],propF:pLantern(1,sw),look:[3,0],seed:1});
  c.restore();
  const hx=W/2+(r.hf.x-W/2)*cz,hy=H*0.62+(r.hf.y+42*2.1-H*0.62)*cz;
  screenLights(c,[{x:hx,y:hy,on:1,r:380*cz,hr:520*cz}],0.82);
  // heartbeat pulses then cut to black
  const hb=[WT(10,3),WT(10,4)];for(const h of hb){const q=t-h;if(q>0&&q<0.3){c.fillStyle=`rgba(140,0,0,${(1-q/0.3)*0.35})`;c.fillRect(0,0,W,H);}}
  if(t>B(10)-0.1){c.fillStyle='#000';c.fillRect(0,0,W,H);}
};
SH.E=function(c,t){
  if(t<A(12)){
    c.save();brickRect(c,0,0,W,H,0.35);c.restore();
    screenLights(c,[{x:W*0.25,y:H*0.18,on:1,r:700,hr:1100}],0.5);
    const pages=['AUG','SEP','OCT','NOV'];const rips=[A(11)+0.2,A(11)+0.5,WT(11,3)+0.05];
    for(let i=3;i>=0;i--){const rt=i<3?rips[i]:99;const q=t-rt;if(q>0.8)continue;
      c.save();const px=W/2,py=1050;
      if(q>0){c.translate(px+eo(q/0.8)*700,py+ei(q/0.8)*900-eo(q/0.3)*120);c.rotate(q*4);}else c.translate(px,py);
      c.shadowColor='rgba(0,0,0,0.6)';c.shadowBlur=30;c.fillStyle='#efe6cc';c.fillRect(-300,-340,600,680);c.shadowColor='transparent';c.drawImage(SPR.paper,-300,-340,600,680);
      c.fillStyle='#8a1010';c.fillRect(-300,-340,600,150);txt(c,pages[i],0,-262,110,'#fff',{stroke:false,ls:12});
      txt(c,'1888',0,-120,70,'#2a1a10',{stroke:false,font:'"Lora"',ls:10});
      c.strokeStyle='rgba(40,25,10,0.5)';c.lineWidth=3;for(let r=0;r<5;r++)for(let k=0;k<7;k++){c.strokeRect(-270+k*77,-60+r*70,77,70);}
      c.restore();}
    c.fillStyle='#222';c.beginPath();c.arc(W/2,1050-360,14,0,TAU);c.fill();
    if(t>WT(11,3))counter(c,WT(11,3),t,'≈10','WEEKS',W/2,1560,{});
  } else {
    const p=inv(A(12),B(17),t);
    c.fillStyle='#07090b';c.fillRect(0,0,W,H);
    const tg=c.createLinearGradient(0,1300,0,H);tg.addColorStop(0,'#2a1d14');tg.addColorStop(1,'#120c08');c.fillStyle=tg;c.fillRect(0,1300,W,H-1300);
    c.fillStyle='rgba(255,255,255,0.05)';c.fillRect(0,1300,W,5);
    const names=[['MARY ANN','NICHOLS'],['ANNIE','CHAPMAN'],['ELIZABETH','STRIDE'],['CATHERINE','EDDOWES'],['MARY JANE','KELLY']];
    const cz=lerp(1.0,1.08,p);c.save();c.translate(W/2,1250);c.scale(cz,cz);c.translate(-W/2,-1250);
    const lights=[];
    for(let i=0;i<5;i++){const x=150+i*195,y=1330+(i%2)*60;const ap=eo(inv(A(12)+i*0.12,A(12)+i*0.12+0.4,t));if(ap<=0)continue;
      c.save();c.globalAlpha=ap;const lit=inv(A(13+i),A(13+i)+0.35,t);candle(c,x,y,lit,t,i);
      if(lit>0){const k=back(lit);c.save();c.translate(x,y+70);c.scale(k,k);txt(c,names[i][0],0,0,27,'#f3ecd8',{ls:2,w:800,sw:6});txt(c,names[i][1],0,36,25,'#c9b48a',{ls:2,w:700,sw:6});c.restore();
        lights.push({x:(x-W/2)*cz+W/2,y:(y-205-1250)*cz+1250,on:clamp(lit*2),hr:420,r:10});}
      c.restore();}
    c.restore();
    darkness(c,0.5,lights,null);
    card(c,A(12)+0.3,t,'THE CANONICAL FIVE','AUG – NOV 1888',1760,{w:700,size:56,col:'#b08a3a'});
  }
  specks(c,t,30);
};
SH.F=function(c,t){
  if(t<A(19)){ // city panics
    const cam=scam(lerp(0,120,inv(A(18),A(19),t)),1.2);FX.shake=Math.max(FX.shake,3);
    const lights=street(c,t,cam,{seed:8,lamps:[{x:-300,on:1},{x:520,on:1}],onFacade:(i,x,y,F)=>{
      const d=F.door;const ts=A(18)+0.15+((i+3)%4)*0.28;const q=inv(ts,ts+0.1,t);
      if(q<1){c.fillStyle='#050403';c.fillRect(x+d.x,y+d.y,d.w,d.h);c.save();c.translate(x+d.x,y+d.y);c.scale(q,1);c.drawImage(F.c,d.x*2,d.y*2,d.w*2,d.h*2,0,0,d.w,d.h);c.restore();}
      if(t>ts+0.1&&t<ts+0.6)comic(c,'SLAM!',x+d.x+d.w/2,y+d.y-40,inv(ts+0.1,ts+0.6,t),'#ffd84a',56);}
      ,world:(c)=>{
      for(let i=0;i<4;i++){const dir=i%2?1:-1,t0=A(18)+i*0.25;
        ghosted(c,tt=>{const q=(tt-t0)/1.3;if(q<0||q>1)return null;return {x:dir>0?lerp(-600,800,q):lerp(800,-600,q),y:GY+90+i*30,s:1.55,f:dir,t:tt,run:1,ph:tt*15+i,kind:i%2?'woman':'town',eyes:'wide',mouth:'scream',brow:'worried',sweat:2,seed:i};},t,3,0.04,'rgba(255,255,255,0.15)');}
    }});
    fog(c,t,0.4,{n:6,y0:1350,y1:1900,seed:15});finishStreet(c,t,cam,lights,{dark:0.5});
  } else if(t<A(20)){ // vigilance patrol
    const p=inv(A(19),A(20),t);const mx=lerp(-300,500,p);
    const cam=scam(mx-110,1.25);
    const lights=street(c,t,cam,{seed:9,lamps:[{x:200,on:1}],world:(c)=>{
      for(let i=0;i<3;i++){const x=mx-i*230,step=Math.sin(t*9+i);
        fig(c,{x,y:GY+100+i*12,s:1.6,f:1,t,run:0.5,ph:t*9+i,kind:'town',eyes:'angry',brow:'angry',mouth:'flat',hf:[40,30],hb:[-30,10],propF:pLantern(1,Math.sin(t*9+i)*0.15),propB:pClub(-0.5),lean:0.05,seed:i+4});}
    }});
    const ex=[0,1,2].map(i=>({x:mx-i*230+64,y:GY-110,on:1,dy:0,hr:360}));
    fog(c,t,0.35,{n:6,y0:1350,y1:1900,seed:16});finishStreet(c,t,cam,lights,{dark:0.62,extra:ex});
    card(c,A(19)+0.3,t,'NIGHT PATROLS','WHITECHAPEL VIGILANCE COMMITTEE',1730,{end:A(20)-0.1,w:820,size:58,tag:'NEIGHBOURS'});
  } else if(t<WT(20,5)){ // police flood in
    const cam=scam(0,1.2);FX.shake=Math.max(FX.shake,4);
    const lights=street(c,t,cam,{seed:10,lamps:[{x:-350,on:1},{x:420,on:1}],world:(c)=>{
      for(let i=0;i<5;i++){const dir=i%2?-1:1,t0=A(20)+i*0.12,tx=-380+i*190;
        ghosted(c,tt=>{const q=eo((tt-t0)/0.5);if(tt<t0)return null;const st=dir>0?-900:900;return {x:lerp(st,tx*0.95,q),y:GY+80+(i%3)*30,s:1.5,f:dir,t:tt,run:q<1?1:0.2,ph:tt*16+i,kind:'bobby',eyes:'angry',brow:'angry',mouth:'o',hf:[14*dir,-58],propF:pWhistle(),seed:i};},t,3,0.04,'rgba(255,210,90,0.25)');
        const q=t-t0-0.3;if(q>0){c.strokeStyle='rgba(255,255,255,0.6)';c.lineWidth=4;for(let k=0;k<3;k++){const rr2=((q*2+k/3)%1);c.globalAlpha=1-rr2;c.beginPath();c.arc(tx+30*dir,GY-300,40+rr2*80,-0.6,0.6);c.stroke();}c.globalAlpha=1;}}
    }});
    finishStreet(c,t,cam,lights,{dark:0.45});
    comic(c,'TWEEEET!',W/2,820,inv(A(20)+0.2,A(20)+1.3,t),'#ffd84a',80,0.05);
  } else if(t<A(21)){ // questioning door to door
    const p=inv(WT(20,5),A(21),t);
    const cam=scam(lerp(-100,1250,p),1.3,1640);
    const lights=street(c,t,cam,{seed:11,lamps:[{x:150,on:1},{x:950,on:1}],world:(c)=>{
      for(let i=0;i<4;i++){const x=i*380+190;const near=Math.abs(cam.x-x)<420;
        fig(c,{x:x-110,y:GY+80,s:1.5,f:1,t,kind:'bobby',eyes:'open',brow:'flat',mouth:'flat',propF:pNotebook(),hf:[40,40],hb:[30,30],propB:pPen(false),seed:i});
        fig(c,{x:x+70,y:GY+50,s:1.4,f:-1,t,kind:i%2?'woman':'town',eyes:'half',mouth:'frown',brow:'worried',hf:near?[-40,-20]:null,hb:near?[40,-20]:null,seed:i+9});}
    }});
    finishStreet(c,t,cam,lights,{dark:0.5});
    const n=Math.floor(eo(inv(WT(20,5),B(20),t))*2000);
    counter(c,WT(20,5),t,(n>=2000?'2,000+':n.toLocaleString('en-GB')),'QUESTIONED',W/2,560,{end:A(21)-0.05});
  } else { // nothing
    c.save();brickRect(c,0,0,W,H,0.45);c.restore();
    const shrug=inv(A(22),A(22)+0.25,t);
    fig(c,{x:W/2,y:1880,s:3.2,f:1,t,kind:'bobby',eyes:shrug>0?'half':'open',brow:shrug>0?'worried':'flat',mouth:shrug>0?'frown':'flat',sweat:shrug>0?2:1,look:[2,1],
      hf:shrug>0?[lerp(40,90,shrug),lerp(40,-40,shrug)]:[40,30],hb:shrug>0?[lerp(-30,-80,shrug),lerp(30,-40,shrug)]:[30,30],propF:shrug>0?null:pNotebook(),seed:2});
    screenLights(c,[{x:W*0.7,y:H*0.3,on:1,r:800,hr:1200}],0.45);
    stamp(c,A(22),t,'NOTHING',W/2,640,{col:'#b9bec4',size:130});
  }
  specks(c,t,25);
};
SH.G=function(c,t){
  if(t<A(24)){ // letter slides under door
    const p=inv(A(23),A(24),t);
    c.fillStyle='#120c08';c.fillRect(0,0,W,H);
    const dz=lerp(1,1.08,p);c.save();c.translate(W/2,H/2);c.scale(dz,dz);c.translate(-W/2,-H/2);
    const dg=c.createLinearGradient(0,0,W,0);dg.addColorStop(0,'#24160e');dg.addColorStop(.5,'#3a2516');dg.addColorStop(1,'#20140c');c.fillStyle=dg;c.fillRect(60,-100,W-120,1260);
    c.strokeStyle='rgba(0,0,0,0.55)';c.lineWidth=8;c.strokeRect(140,40,W-280,520);c.strokeRect(140,640,W-280,440);
    c.fillStyle='#b48a3c';c.fillRect(W/2-80,520,160,30);txt(c,'LETTERS',W/2,535,22,'#2a1a0a',{stroke:false});
    // gap light
    c.fillStyle='rgba(255,190,110,0.85)';c.fillRect(60,1160,W-120,12);
    // floor
    const fg=c.createLinearGradient(0,1172,0,H);fg.addColorStop(0,'#2a1c12');fg.addColorStop(1,'#120c08');c.fillStyle=fg;c.fillRect(0,1172,W,H);
    c.strokeStyle='rgba(0,0,0,0.5)';c.lineWidth=4;for(let i=0;i<8;i++){const y=1172+Math.pow(i/8,1.6)*800;seg(c,0,y,W,y);}
    // envelope
    const q=eo(inv(A(23)+0.1,A(23)+0.75,t));
    c.save();c.beginPath();c.rect(0,1166,W,H);c.clip();
    c.translate(W/2-40+q*80,lerp(1150,1500,q));c.rotate(lerp(0,0.18,q));c.scale(lerp(0.8,1.4,q),lerp(0.3,1.4,q));
    c.fillStyle='#e9dcbc';c.strokeStyle='#3a2a1a';c.lineWidth=4;c.fillRect(-220,-110,440,220);c.strokeRect(-220,-110,440,220);
    c.beginPath();c.moveTo(-220,-110);c.lineTo(0,10);c.lineTo(220,-110);c.stroke();
    c.font='italic 700 34px "TeX Gyre Chorus"';c.fillStyle='#8a1010';c.textAlign='center';c.fillText('The Boss, Central News Office',0,62);
    c.restore();c.restore();
    screenLights(c,[{x:W/2,y:1250,on:1,r:600,hr:800}],0.5);
    card(c,A(23)+0.7,t,'CENTRAL NEWS AGENCY','27 SEPT 1888',1760,{end:A(24)-0.05,w:900,size:52,tag:'LETTER ARRIVES'});
  } else {
    const z=lerp(1,1.03,inv(A(24),A(26),t))+0.12*eio(inv(A(26),A(26)+0.6,t));
    c.fillStyle='#0d0907';c.fillRect(0,0,W,H);
    c.save();c.translate(W/2,1620);c.scale(z,z);c.translate(-W/2,-1620);
    paperSheet(c,W/2,1250,940,1900,-0.015);
    const lines=[['Dear Boss,',A(24),A(24)+0.5],['I keep on hearing the police',A(24)+0.45,A(24)+1.1],['have caught me but they',A(24)+1.0,A(24)+1.5],["wont fix me just yet.",A(24)+1.4,A(25)+0.1]];
    lines.forEach((l,i)=>scriptText(c,l[0],120,520+i*88,62,'#a8100e',inv(l[1],l[2],t),{bold:true}));
    if(t>A(25)){const q=t-A(25);const k=spring(q*1.3);c.save();c.translate(560,960);c.rotate(-0.08);c.scale(k,k);scriptText(c,'ha. ha.',0,0,130,'#c4120e',1,{al:'center',bold:true});c.restore();}
    scriptText(c,'Good Luck.',140,1180,58,'#a8100e',inv(A(25)+0.6,A(26),t),{bold:true});
    scriptText(c,'Yours truly',200,1400,68,'#a8100e',inv(A(26)+0.1,A(26)+0.8,t),{bold:true});
    if(t>A(27)){const q=inv(A(27),A(27)+0.6,t);scriptText(c,'Jack the Ripper',W/2,1640,108,'#d0140f',q,{al:'center',bold:true,glow:'rgba(255,60,20,0.9)',blur:30+Math.sin(t*20)*8});
      // embers
      c.save();c.globalCompositeOperation='lighter';for(let i=0;i<30;i++){const e=((t-A(27))*0.8+hash(i))%1;c.fillStyle=`rgba(255,${120+hash(i*3)*100},40,${(1-e)*0.9})`;c.beginPath();c.arc(200+hash(i*5)*680+Math.sin(t*3+i)*20,1640-e*360,3+hash(i)*4,0,TAU);c.fill();}c.restore();}
    c.restore();
    // angry bobby inset for "mocking the police"
    bubble(c,A(25)+0.05,t,250,1560,190,'POLICE',(c,p)=>{c.fillStyle='#2a1a1a';c.fillRect(-200,-200,400,400);fig(c,{x:0,y:470,s:2.2,f:1,t,kind:'bobby',eyes:'angry',brow:'angry',mouth:'teeth',red:0.6+Math.sin(t*12)*0.2,seed:5});
      c.fillStyle='rgba(230,230,230,0.6)';for(let k=0;k<2;k++){const sp=((t*1.5+k*0.5)%1);c.beginPath();c.arc((k?60:-60)+sp*20*(k?1:-1),-120-sp*80,14+sp*20,0,TAU);c.fill();}},{end:A(26)-0.05});
    screenLights(c,[{x:W*0.65,y:H*0.25,on:1,r:900,hr:1300}],0.35);
  }
};
SH.H=function(c,t){
  if(t<A(29)){ // newspapers rain + newsboy
    const p=inv(A(28),A(29),t);
    const cam=scam(lerp(0,150,p),1.3,1640);
    const lights=street(c,t,cam,{seed:12,lamps:[{x:-250,on:1},{x:480,on:1}],world:(c)=>{
      const jumpy=Math.abs(Math.sin(t*8))*14;
      fig(c,{x:80,y:GY+80,s:1.8,f:1,t,kind:'news',eyes:'open',brow:'up',mouth:'scream',hf:[50,-70+jumpy*0.5],propF:pNews('RIPPER!'),jump:jumpy,seed:3});
      fig(c,{x:-250,y:GY+50,s:1.5,f:1,t,kind:'woman',eyes:'wide',mouth:'o',brow:'worried',propF:pNews('MURDER'),hf:[40,10],seed:6});
      fig(c,{x:400,y:GY+50,s:1.5,f:-1,t,kind:'town',eyes:'wide',mouth:'o',brow:'up',propF:pNews('RIPPER'),hf:[-40,10],seed:7});
    }});
    finishStreet(c,t,cam,lights,{dark:0.4});
    for(let i=0;i<9;i++){const t0=A(28)+i*0.28;const q=(t-t0)/1.4;if(q<0||q>1)continue;
      newspaper(c,lerp(hash(i)*W,W/2+(hash(i*3)-.5)*900,q),lerp(-300,H+300,q*q*0.4+q*0.6),lerp(0.4,1.4,q),q*6*(hash(i*5)-.5)+i,i%2?'JACK THE RIPPER':'WHITECHAPEL HORROR');}
    comic(c,'EXTRA! EXTRA!',W/2,640,inv(A(28)+0.3,A(29)-0.1,t),'#ffd84a',84,-0.06);
  } else if(t<A(30)){ // twist
    c.save();brickRect(c,0,0,W,H,0.5);c.restore();
    const z=lerp(1.4,1,eo(inv(A(29),A(29)+0.4,t)));c.save();c.translate(W/2,1150);c.scale(z,z);c.translate(-W/2,-1150);
    c.fillStyle='#4a3420';c.fillRect(120,700,840,920);c.strokeStyle='#22160c';c.lineWidth=16;c.strokeRect(120,700,840,920);
    paperSheet(c,W/2,1150,560,760,0.03);scriptText(c,'Dear Boss,',330,900,58,'#a8100e',1,{bold:true});for(let i=0;i<4;i++)scriptText(c,'~~~~ ~~~ ~~~~~ ~~',330,980+i*70,46,'#a8100e',1);scriptText(c,'Jack the Ripper',W/2,1440,70,'#c4120e',1,{al:'center',bold:true});
    c.strokeStyle='#c01818';c.lineWidth=5;seg(c,180,760,W/2,1150);seg(c,900,760,W/2,1150);c.fillStyle='#d8201a';c.beginPath();c.arc(W/2,800,18,0,TAU);c.fill();
    c.restore();screenLights(c,[{x:W/2,y:900,on:1,r:700,hr:1000}],0.45);
    warnBar(c,A(29),t,'TWIST',{y:560,end:B(29)+0.2});
  } else if(t<A(31)){ // historians
    c.save();brickRect(c,0,0,W,H,0.55);c.restore();
    c.save();c.translate(0,140);paperSheet(c,W/2,760,460,600,0.03);scriptText(c,'Dear Boss,',330,580,48,'#a8100e',1,{bold:true});for(let i=0;i<3;i++)scriptText(c,'~~~~ ~~~ ~~~~~',330,650+i*60,40,'#a8100e',1);scriptText(c,'Jack the Ripper',W/2,960,58,'#c4120e',1,{al:'center',bold:true});
    const xp=inv(WT(30,7),WT(30,7)+0.3,t);if(xp>0){c.strokeStyle='#e3241b';c.lineWidth=26;c.lineCap='round';seg(c,W/2-200,560,lerp(W/2-200,W/2+200,eo(xp*2)),lerp(560,1000,eo(xp*2)));if(xp>0.5)seg(c,W/2+200,560,lerp(W/2+200,W/2-200,eo(xp*2-1)),lerp(560,1000,eo(xp*2-1)));}c.restore();
    const hs=[[190,1,pBook()],[540,1,pMag()],[890,-1,pBook()]];
    hs.forEach((h,i)=>{const sh2=Math.sin(t*10+i)*6*(t>A(30)+0.3?1:0);
      fig(c,{x:h[0],y:1960,s:2.6,f:h[1],t,kind:'hist',glasses:true,eyes:'half',brow:'flat',mouth:'frown',headX:sh2/1.9*0.6,look:[0,-2],hf:[50*h[1],20],propF:h[2],seed:i+2});});
    screenLights(c,[{x:W/2,y:700,on:1,r:800,hr:1100}],0.4);
    card(c,A(30)+0.2,t,'HISTORIANS','“PROBABLY NOT HIM”',430,{end:A(31)-0.05,w:640,size:56,tag:''});
  } else { // journalist
    const p=inv(A(31),A(32),t);FX.speed=Math.max(FX.speed,(1-inv(A(31),A(31)+0.3,t)));FX.speedDir=1;
    c.fillStyle='#160f0a';c.fillRect(0,0,W,H);c.save();c.globalAlpha=0.5;brickRect(c,0,0,W,1300,0.5);c.restore();
    const z=lerp(1.15,1.25,p);c.save();c.translate(W/2,1300);c.scale(z,z);c.translate(-W/2,-1300);
    const bl=inv(A(31)+0.3,A(31)+0.6,t);
    const jr=fig(c,{x:W/2,y:1700,s:2.4,f:1,t,kind:'journo',eyes:'half',brow:'angry',mouth:bl>0&&bl<1?'o':'grin',hf:[50,-60],propF:pPen(true),hb:[-20,60],seed:4});
    if(bl>0&&bl<1){c.strokeStyle='rgba(255,255,255,0.7)';c.lineWidth=4;for(let k=0;k<3;k++)seg(c,W/2+80+k*12,1060-k*20,W/2+130+k*14,1020-k*24);}
    // desk
    const dg=c.createLinearGradient(0,1400,0,1700);dg.addColorStop(0,'#5a3a20');dg.addColorStop(1,'#2a1a0e');c.fillStyle=dg;c.fillRect(60,1400,W-120,520);c.strokeStyle='#120a05';c.lineWidth=8;c.strokeRect(60,1400,W-120,520);
    c.fillStyle='#e9e0c8';c.save();c.translate(320,1420);c.rotate(-0.1);c.fillRect(-120,-30,240,40);c.restore();c.save();c.translate(700,1418);c.rotate(0.08);c.fillRect(-110,-28,220,36);c.restore();
    c.fillStyle='#1a2a1a';c.fillRect(840,1250,40,150);c.fillStyle='#2f6a3a';c.beginPath();c.moveTo(780,1260);c.lineTo(940,1260);c.lineTo(900,1200);c.lineTo(820,1200);c.fill();
    c.restore();
    screenLights(c,[{x:860,y:1290,on:1,r:700,hr:900}],0.55);
    const ps=toScreenLocal(jr.hf.x+40,jr.hf.y-70,z);
    pulseRing(c,A(31)+0.35,t,ps.x,ps.y,110,'PROBABLY FAKE',{lx:W/2,ly:700});
  }
};
function toScreenLocal(x,y,z){return {x:W/2+(x-W/2)*z,y:1300+(y-1300)*z};}
SH.I=function(c,t){
  const man=(o)=>fig(c,Object.assign({x:W/2,y:1800,s:3.0,f:1,t,kind:'town',stache:true,seed:8},o));
  const table=()=>{const g=c.createLinearGradient(0,1380,0,H);g.addColorStop(0,'#4a3020');g.addColorStop(1,'#1a100a');c.fillStyle=g;c.fillRect(0,1380,W,H);c.fillStyle='rgba(255,255,255,0.06)';c.fillRect(0,1380,W,6);};
  const bgw=()=>{c.save();brickRect(c,0,0,W,1400,0.5);c.restore();};
  if(t<A(33)){
    bgw();table();
    const q=eo(inv(A(32)+0.1,A(32)+0.6,t));boxProp(c,lerp(-300,W/2,q),1500,1.2,0,0);
    candle(c,880,1560,1,t,1);
    screenLights(c,[{x:880,y:1350,on:1,r:500,hr:900}],0.5);
    card(c,A(32),t,'16 OCT 1888','A PARCEL ARRIVES',1780,{end:A(33)-0.05,w:640,size:64,tag:'WEEKS LATER'});
  } else if(t<A(36)){
    bgw();
    const lid=t<A(34)?eo(inv(A(33)+0.6,A(34),t))*0.35:0.35+0.65*eo(inv(A(34),A(34)+0.3,t));
    const sh=t<A(34)?Math.sin(t*50)*3:0;
    const rec=inv(A(35),A(35)+0.25,t);
    const zz=lerp(1,1.12,inv(A(33),A(34),t));c.save();c.translate(W/2,1500);c.scale(zz,zz);c.translate(-W/2,-1500);
    if(rec>0){for(let k=3;k>=1;k--){const r2=inv(A(35),A(35)+0.25,t-k*0.03);man({lean:-0.35*r2,x:W/2-60*r2,ghost:'rgba(255,255,255,0.15)'});}}
    man({eyes:rec>0?'wide':'open',brow:rec>0?'up':'worried',mouth:rec>0?'scream':'flat',sweat:2,lean:-0.35*rec,x:W/2-60*rec,look:[0,4],
      hf:rec>0?[60,-40]:[110,150-lid*90+sh],hb:rec>0?[-60,-40]:[-70,150+sh]});
    table();boxProp(c,W/2,1500,1.2,lid,sh);candle(c,880,1560,1,t,1);
    c.restore();
    screenLights(c,[{x:880,y:1350,on:1,r:500,hr:900},{x:W/2,y:1380,on:lid,r:300,hr:500}],0.55);
    card(c,A(33)+0.3,t,'GEORGE LUSK','HEAD OF THE VIGILANCE COMMITTEE',1820,{end:A(34)-0.1,w:820,size:50,tag:''});
    bubble(c,A(34),t,W/2,780,300,'INSIDE THE BOX',(c,p)=>{if(t<A(35)){c.fillStyle='#0c0806';c.fillRect(-300,-300,600,600);c.fillStyle='rgba(200,230,220,0.08)';rr(c,-100,-110,200,230,40);c.fill();}else jarKidney(c,t-A(35));},{tail:[W/2,1300]});
  } else if(t<A(37)){
    bgw();table();boxProp(c,W/2,1600,1.2,1,0);candle(c,880,1660,1,t,1);
    const q=eo(inv(A(36),A(36)+0.7,t));
    paperSheet(c,W/2,lerp(1500,1000,q),lerp(200,860,q),lerp(120,1000,q),lerp(0.3,-0.02,q));
    if(q>0.9){c.save();c.translate(W/2,1000);for(let i=0;i<7;i++){scriptText(c,'~~ ~~~~~ ~~~ ~~~~ ~~',-340,-250+i*80,46,'#5a1a10',inv(A(36)+0.7+i*0.12,A(36)+0.9+i*0.12,t),{bold:true});}c.restore();}
    screenLights(c,[{x:880,y:1450,on:1,r:500,hr:900},{x:W/2,y:900,on:1,r:600,hr:1000}],0.5);
  } else {
    c.fillStyle='#0c0605';c.fillRect(0,0,W,H);
    paperSheet(c,W/2,1050,1000,1500,-0.02);
    const q=inv(A(37),A(37)+0.55,t);
    c.save();c.translate(W/2,1000);c.rotate(-0.08);scriptText(c,'From hell',0,0,220,'#7a0a08',q,{al:'center',bold:true,glow:'rgba(160,0,0,0.6)',blur:16});c.restore();
    for(let i=0;i<5;i++)scriptText(c,'~~~ ~~~~~ ~~ ~~~~',160,1250+i*70,46,'#5a1a10',inv(A(37)+0.5,A(37)+1.2,t),{bold:true});
    screenLights(c,[{x:W/2,y:1000,on:1,r:700,hr:1000}],0.4);
    if(t-A(37)<0.5)ring(c,W/2,1000,lerp(100,900,eo((t-A(37))/0.5)),(1-(t-A(37))/0.5)*0.6,'rgba(255,60,40,',12);
  }
  specks(c,t,20);
};
SH.J=function(c,t){
  if(t<A(39)){ // storm
    const p=inv(A(38),A(39),t);const cam=scam(lerp(0,200,p),lerp(1.05,1.15,p));
    const fl=Math.max(0,1-(t-A(38)-0.1)/0.35)*(t>A(38)+0.1?1:0)+Math.max(0,1-(t-A(38)-1.3)/0.3)*(t>A(38)+1.3?0.7:0);
    const lights=street(c,t,cam,{seed:13,sky:{top:'#05080c',mid:'#0e1a22',bot:'#16252c',moon:false},rain:1,lamps:[{x:-200,on:1},{x:650,on:1}],world:(c)=>{
      if(fl>0.05)ripper(c,{x:820,y:GY,s:1.1,f:-1,t,a:fl,glint:fl});}});
    if(fl>0){c.save();c.strokeStyle=`rgba(230,240,255,${fl})`;c.lineWidth=8;c.beginPath();let x=700,y=0;c.moveTo(x,y);for(let i=0;i<8;i++){x+=(hash(i*3+Math.floor(A(38)))-.5)*160;y+=80;c.lineTo(x,y);}c.stroke();c.restore();}
    fog(c,t,0.35,{n:6,y0:1300,y1:1900,seed:20});finishStreet(c,t,cam,lights,{dark:0.6-fl*0.4});rain(c,t,1,1);
    card(c,A(38)+0.4,t,'30 SEPT 1888','THE “DOUBLE EVENT”',1700,{end:A(39)-0.05,w:640,size:64,tag:'THE WORST NIGHT'});
  } else if(t<A(40)){ // map
    c.fillStyle='#120c08';c.fillRect(0,0,W,H);
    const z=lerp(1,1.08,inv(A(39),A(40),t));c.save();c.translate(W/2,1000);c.scale(z,z);c.rotate(-0.03);c.translate(-W/2,-1000);
    c.drawImage(SPR.paper,40,420,W-80,1200);
    c.strokeStyle='rgba(70,45,20,0.75)';c.lineCap='round';
    const roads=[[[60,700],[1020,780],16],[[60,1250],[1020,1180],22],[[300,420],[360,1620],16],[[720,420],[640,1620],14],[[60,980],[1020,1020],8],[[500,420],[520,1620],8],[[860,420],[900,1620],8]];
    for(const r of roads){c.lineWidth=r[2];seg(c,r[0][0],r[0][1],r[1][0],r[1][1]);}
    const lab=(s,x,y,a)=>{c.save();c.translate(x,y);c.rotate(a);txt(c,s,0,0,26,'rgba(60,35,15,0.9)',{stroke:false,font:'"Lora"',w:700,ls:3});c.restore();};
    lab('WHITECHAPEL RD',760,1180,-0.07);lab('COMMERCIAL ST',335,560,1.52);lab('BERNER ST',860,860,1.5);lab('MITRE SQ',250,960,0);lab('ALDGATE',190,1310,0);
    const p1={x:830,y:1080},p2={x:340,y:900};
    const dp=inv(WT(39,2)+0.1,WT(39,5),t);if(dp>0){c.strokeStyle='#c01818';c.lineWidth=7;c.setLineDash([18,14]);c.lineDashOffset=-t*40;c.beginPath();c.moveTo(p1.x,p1.y-30);c.quadraticCurveTo(600,820,lerp(p1.x,p2.x,dp),lerp(p1.y,p2.y,dp)-30);c.stroke();c.setLineDash([]);}
    mapPin(c,p1.x,p1.y,t-WT(39,1));mapPin(c,p2.x,p2.y,t-WT(39,2));
    if(t>WT(39,1))txt(c,'1:00 AM',p1.x+110,p1.y-60,30,'#fff',{sw:6});if(t>WT(39,2))txt(c,'1:44 AM',p2.x+110,p2.y-60,30,'#fff',{sw:6});
    c.restore();
    if(t>WT(39,4)){const q=t-WT(39,4);const k=back(q/0.3);c.save();c.translate(W/2,1480);c.scale(k,k);clock(c,0,0,140,q*6,t);c.restore();
      c.save();c.translate(W/2,1700);c.scale(k,k);c.fillStyle='#d0201f';rr(c,-170,-40,340,80,14);c.fill();txt(c,'< 1 HOUR',0,0,46,'#fff',{stroke:false,ls:5});c.restore();}
    screenLights(c,[{x:W/2,y:900,on:1,r:900,hr:1300}],0.35);
  } else if(t<A(41)){ // police everywhere
    const p=inv(A(40),A(41),t);const cam=scam(lerp(0,600,p),1.2);FX.shake=Math.max(FX.shake,5);
    const ex=[];
    const lights=street(c,t,cam,{seed:14,rain:0.6,sky:{moon:false},lamps:[{x:0,on:1},{x:800,on:1}],world:(c)=>{
      for(let i=0;i<6;i++){const dir=i%2?-1:1,t0=A(40)+i*0.15;
        ghosted(c,tt=>{const q=(tt-t0)/1.4;if(q<0||q>1)return null;const x=dir>0?lerp(-700,1400,q):lerp(1500,-500,q);return {x,y:GY+60+(i%3)*40,s:1.45,f:dir,t:tt,run:1,ph:tt*16+i,kind:'bobby',eyes:'angry',brow:'angry',mouth:'o',hf:[40*dir,0],propF:pLantern(1,Math.sin(tt*14)*0.3),seed:i};},t,3,0.04,'rgba(255,210,90,0.22)');
        const q=(t-t0)/1.4;if(q>0&&q<1)ex.push({x:(dir>0?lerp(-700,1400,q):lerp(1500,-500,q))+40*dir,y:GY-180,on:1,dy:0,hr:340});}
    }});
    finishStreet(c,t,cam,lights,{dark:0.62,extra:ex});rain(c,t,0.7,1);
    comic(c,'TWEEEET!',W*0.3,760,inv(A(40)+0.1,A(40)+1.0,t),'#ffd84a',70,-0.1);comic(c,'TWEEET!',W*0.7,900,inv(A(40)+0.5,A(40)+1.5,t),'#ffd84a',60,0.1);
  } else if(t<A(42)){ // collision
    const cam=scam(0,1.35,1660);const tc=A(41)+0.42;
    const lights=street(c,t,cam,{seed:15,rain:0.6,sky:{moon:false},lamps:[{x:0,on:1}],world:(c)=>{
      for(const dir of [1,-1]){
        if(t<tc){ghosted(c,tt=>{const q=inv(A(41)-0.1,tc,tt);return {x:lerp(-800*dir,-70*dir,q),y:GY+90,s:1.4,f:dir,t:tt,run:1,ph:tt*16,kind:'bobby',eyes:'angry',brow:'angry',mouth:'o',seed:dir+3};},t,3,0.04,'rgba(255,210,90,0.25)');}
        else{const q=inv(tc,tc+0.3,t);fig(c,{x:-70*dir-dir*120*eo(q),y:GY+90,s:1.4,f:dir,t,kind:'bobby',noHat:true,eyes:'spiral',brow:'worried',mouth:'o',lean:-0.5*eo(q),crouch:30*eo(q),seed:dir+3});
          bonkStars(c,-70*dir-dir*120*eo(q)+dir*8,GY-470,t);
          // flying helmet
          const hq=t-tc;c.save();c.translate(-60*dir-dir*260*hq,GY-480-900*hq+1400*hq*hq);c.rotate(hq*10*dir);c.fillStyle=COL.bobby;c.strokeStyle='#0b0b0d';c.lineWidth=5;c.beginPath();c.moveTo(-34,0);c.quadraticCurveTo(-32,-62,0,-66);c.quadraticCurveTo(32,-62,34,0);c.closePath();c.fill();c.stroke();c.restore();}
      }}});
    finishStreet(c,t,cam,lights,{dark:0.45});rain(c,t,0.6,1);
    if(t>tc){comic(c,'BONK!',W/2,760,inv(tc,tc+0.8,t),'#ffd84a',110,-0.08);if(t-tc<0.4)ring(c,W/2,1100,lerp(60,500,(t-tc)/0.4),(1-(t-tc)/0.4)*0.7);}
  } else { // puddle reflection
    const p=inv(A(42),A(43),t);
    c.fillStyle='#0a0f12';c.fillRect(0,0,W,H);
    const pt=c.createPattern(SPR.cobble,'repeat');pt.setTransform(new DOMMatrix().scale(1.2));c.fillStyle=pt;c.fillRect(0,0,W,H);c.fillStyle='rgba(0,0,0,0.35)';c.fillRect(0,0,W,H);
    c.save();c.beginPath();c.ellipse(W/2,1150,470,300,0,0,TAU);c.clip();
    const sg=c.createLinearGradient(0,850,0,1450);sg.addColorStop(0,'#5f8a96');sg.addColorStop(1,'#2a4450');c.fillStyle=sg;c.fillRect(0,800,W,700);
    c.fillStyle='rgba(255,200,120,0.5)';c.beginPath();c.arc(780,950,40,0,TAU);c.fill();
    const wx=lerp(-200,1300,inv(A(42)+0.05,A(42)+1.0,t));
    c.save();c.translate(0,1150);c.scale(1,-1);c.translate(0,-1150);ripper(c,{x:wx,y:1420,s:1.0,f:1,t,walk:1,ph:t*9,glint:0.8});c.restore();
    for(let i=0;i<3;i++){const r2=((t*0.9+i/3)%1);ring(c,W/2+60,1180,r2*420,(1-r2)*0.35,'rgba(200,230,240,',4);}
    c.restore();
    c.strokeStyle='rgba(200,230,240,0.35)';c.lineWidth=4;c.beginPath();c.ellipse(W/2,1150,470,300,0,0,TAU);c.stroke();
    screenLights(c,[{x:800,y:900,on:1,r:600,hr:900}],0.4);rain(c,t,0.4,1);
    warnBar(c,WT(42,2),t,'SUSPECT ESCAPED',{y:600,end:B(42)+0.4});
  }
};
SH.K=function(c,t){
  const wipeA=WT(46,1),wipeB=WT(46,6);
  const chalkVis=t<wipeA?inv(A(43)+0.3,A(43)+1.3,t):1-inv(wipeA,wipeB,t);
  const flashT=WT(46,7)+0.1;
  c.save();brickRect(c,0,0,W,H,0.3);
  // doorway arch
  c.fillStyle='#060504';c.beginPath();c.moveTo(640,1650);c.lineTo(640,700);c.arc(860,700,220,Math.PI,TAU);c.lineTo(1080,1650);c.fill();
  c.fillStyle='#3a3530';c.fillRect(0,1650,W,H-1650);c.restore();
  chalkLines(c,300,820,chalkVis,t);
  if(t>wipeA&&t<wipeB+0.4){c.save();for(let i=0;i<20;i++){const e=((t*1.3+hash(i))%1);c.fillStyle=`rgba(240,240,230,${(1-e)*0.5})`;c.beginPath();c.arc(260+hash(i*3)*380,900+e*700,4+hash(i)*5,0,TAU);c.fill();}c.restore();}
  // bobby with lantern (left)
  const lr=eo(inv(A(43),A(43)+0.6,t));
  const bobLeave=t>A(45);
  const b=fig(c,{x:lerp(-80,140,lr)-(bobLeave?eo(inv(A(45),A(45)+0.6,t))*400:0),y:1880,s:2.0,f:1,t,kind:'bobby',eyes:t>A(44)?'wide':'open',brow:'up',mouth:t>A(44)?'o':'flat',hf:[60,lerp(60,-30,lr)],propF:pLantern(1,Math.sin(t*3)*0.1),seed:1});
  // chief
  if(t>A(45)){const q=eo(inv(A(45),A(45)+0.8,t));const scrub=t>wipeA&&t<wipeB?Math.sin(t*16):0;
    const cx=lerp(1300,600,q);
    fig(c,{x:cx,y:1880,s:2.2,f:-1,t,kind:'chief',eyes:'angry',brow:'angry',mouth:'frown',run:q<1?0.6:0,ph:t*9,
      hf:t>wipeA&&t<wipeB?[-180+scrub*50,-150+Math.cos(t*16)*40]:[-30,60],propF:t>wipeA&&t<wipeB+0.3?pSponge():null,seed:2});}
  // camera man
  if(t>WT(46,5)){const q=eo(inv(WT(46,5),flashT-0.05,t));const cx=lerp(-300,170,q);const late=t>flashT;
    // tripod camera
    c.save();c.translate(cx+150,1500);c.strokeStyle='#2a1a0e';c.lineWidth=10;seg(c,0,0,-60,380);seg(c,0,0,60,380);seg(c,0,0,0,380);c.fillStyle='#3a2414';c.strokeStyle='#0b0b0d';c.lineWidth=5;c.fillRect(-60,-110,120,110);c.strokeRect(-60,-110,120,110);c.fillStyle='#111';c.fillRect(56,-80,40,50);c.fillStyle='#8aa';c.beginPath();c.arc(96,-55,16,0,TAU);c.fill();
    c.strokeStyle='#888';c.lineWidth=5;seg(c,-30,-110,-30,-170);c.fillStyle='#aaa';c.fillRect(-60,-180,60,14);c.restore();
    fig(c,{x:cx,y:1880,s:1.9,f:1,t,kind:'cam',eyes:late?'wide':'open',brow:late?'up':'worried',mouth:late?'scream':'flat',sweat:2,run:q<1?1:0,ph:t*14,hf:[60,-60],hb:[40,-10],seed:6});
    if(t>flashT&&t<flashT+0.25){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(cx+120,1320,0,cx+120,1320,700);g.addColorStop(0,'rgba(255,255,240,0.9)');g.addColorStop(1,'rgba(255,255,240,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();}}
  screenLights(c,[{x:b.hf.x,y:b.hf.y+84,on:1,r:520,hr:900}],0.62);
  if(t>A(44))pulseRing(c,A(44),t,520,940,300,'CLUE',{end:A(46)-0.1,lx:520,ly:560});
  card(c,A(45)+0.3,t,'SIR CHARLES WARREN','POLICE COMMISSIONER',1760,{end:WT(46,4),w:760,size:54,tag:''});
  if(t>flashT+0.15)comic(c,'TOO LATE!',W/2,620,inv(flashT+0.15,flashT+1.0,t),'#ff3a2e',90,-0.06);
};
SH.Lx=function(c,t){
  const lampT=[A(49),A(49)+0.45,A(49)+0.9,A(49)+1.4,A(50)];
  const lampX=[-700,-250,200,650,1100];
  const cam=scam(lerp(150,350,inv(A(47),END,t)),1.0,1640);
  const lamps=lampX.map((x,i)=>({x,on:t<lampT[i]?1:Math.max(0,1-(t-lampT[i])/0.12)*(hash(Math.floor(t*30))>0.5?1:0.4)}));
  const ra=1-inv(A(49),A(50)+0.1,t);
  const lights=street(c,t,cam,{seed:16,lamps,world:(c)=>{
    for(let i=0;i<5;i++){const q=t-lampT[i];if(q>0&&q<1){c.save();c.globalAlpha=(1-q)*0.6;c.drawImage(SPR.fog,lampX[i]-80+q*40,GY-660-q*180,160+q*140,160+q*140);c.restore();}}
    ripper(c,{x:lerp(-100,700,inv(A(47),A(50)+0.3,t)),y:GY+60,s:1.5,f:1,t,walk:1,ph:t*7,a:ra,glint:0});}});
  fog(c,t,0.55+0.4*(1-ra),{n:10,y0:900,y1:1900,sz:1100,seed:21});
  finishStreet(c,t,cam,lights,{dark:lerp(0.6,0.9,1-ra)});
  card(c,A(48),t,'NOV 1888','THE LAST KNOWN MURDER',1700,{end:A(49)+0.6,w:600,size:66,tag:'AFTER'});
  if(t>A(50)+0.15){c.fillStyle=`rgba(0,0,0,${inv(A(50)+0.15,A(51),t)*0.85})`;c.fillRect(0,0,W,H);}
};
SH.M=function(c,t){
  const shut=WT(53,4)+0.05,stampT=shut+0.18;
  c.fillStyle='#1b120c';c.fillRect(0,0,W,H);
  const wg=c.createLinearGradient(0,0,W,H);wg.addColorStop(0,'#3a2616');wg.addColorStop(1,'#1a0f08');c.fillStyle=wg;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=3;for(let i=0;i<14;i++)seg(c,0,i*150+20,W,i*150-40);
  const z=lerp(1.04,1.0,eo(inv(A(51),A(51)+0.4,t)));c.save();c.translate(W/2,1050);c.scale(z,z);c.translate(-W/2,-1050);
  // folder back
  c.fillStyle='#c9a86a';c.strokeStyle='#6a5030';c.lineWidth=6;rr(c,80,420,920,1320,18);c.fill();c.stroke();
  c.fillStyle='#c9a86a';rr(c,120,370,300,80,14);c.fill();c.stroke();txt(c,'CASE FILE',270,410,34,'#5a3a1a',{stroke:false,ls:6});
  // sheet
  c.drawImage(SPR.paper,130,470,820,1220);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=3;c.strokeRect(130,470,820,1220);
  txt(c,'WHITECHAPEL MURDERS · 1888',540,540,34,'#3a2a1a',{stroke:false,font:'"Lora"',w:700,ls:4});
  // mugshot
  c.fillStyle='#2a2622';c.fillRect(190,610,360,440);c.strokeStyle='#111';c.lineWidth=6;c.strokeRect(190,610,360,440);
  c.save();c.beginPath();c.rect(190,610,360,440);c.clip();ripper(c,{x:370,y:1330,s:1.45,f:1,t,glint:0,bag:false,col:'#060606',rim:'rgba(80,80,80,0.6)'});c.restore();
  txt(c,'?',370,820,150,'#f3ecd8',{sw:10});
  const fields=[['NAME',800],['FACE',900],['ARREST',1000]];
  for(const f of fields){txt(c,f[0]+':',600,f[1],34,'#3a2a1a',{stroke:false,al:'left',w:800,ls:3});c.strokeStyle='rgba(0,0,0,0.4)';c.lineWidth=3;seg(c,600,f[1]+30,910,f[1]+30);}
  scriptText(c,'Jack the Ripper',590,1240,72,'#1a1a3a',1,{bold:true});
  if(t>A(53)+0.3){const q=inv(A(53)+0.3,A(53)+0.75,t);c.strokeStyle='#c01818';c.lineWidth=12;c.lineCap='round';c.beginPath();for(let i=0;i<=20*q;i++){const x=590+i*22,y=1215+Math.sin(i*1.7)*16;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
  if(t>A(53)+0.6)txt(c,'???',770,800,40,'#c01818',{stroke:false,al:'left'});
  if(t>WT(51,1))txt(c,'UNKNOWN',770,900,32,'#c01818',{stroke:false,ls:2,al:'left'});
  if(t>WT(52,1))txt(c,'NONE',770,1000,34,'#c01818',{stroke:false,ls:3,al:'left'});
  c.restore();
  stamp(c,WT(51,1),t,'NO FACE',370,1000,{size:60,end:A(52)+0.3,rot:-0.2});
  if(t>WT(52,0)){const q=inv(WT(52,0),WT(52,0)+0.25,t);cuffs(c,700,lerp(-200,1450,eo(q)),1.1,0.3+(1-q)*2);if(q>=1&&t-WT(52,0)<0.6)dust(c,700,1500,(t-WT(52,0)-0.25)/0.4,8);}
  // folder cover slam
  if(t>shut-0.15){const q=eo(inv(shut-0.15,shut,t));c.save();c.translate(W/2,1080);c.scale(1,lerp(-0.02,1,q)*(q<1?1:1));c.translate(-W/2,-1080);
    c.fillStyle='#d4b274';c.strokeStyle='#6a5030';c.lineWidth=6;rr(c,80,420,920,1320,18);c.fill();c.stroke();
    txt(c,'CASE No. 1888/W',540,700,56,'#5a3a1a',{stroke:false,font:'"Lora"',ls:6});txt(c,'JACK THE RIPPER',540,800,64,'#5a3a1a',{stroke:false,ls:8});c.restore();}
  screenLights(c,[{x:W*0.55,y:H*0.35,on:1,r:900,hr:1400}],0.42);
  stamp(c,stampT,t,'UNSOLVED',W/2,1150,{size:150,rot:-0.14});
};
SH.N=function(c,t){
  const p=inv(A(54),END,t);const cam=scam(0,lerp(1.3,1.7,eio(p)),1420);
  const lights=street(c,t,cam,{seed:17,lamps:[{x:-230,on:1}],world:(c)=>{tophat(c,40,GY+70,1.3);c.save();c.globalCompositeOperation='lighter';const hg=c.createRadialGradient(-40,GY+60,0,-40,GY+60,260);hg.addColorStop(0,'rgba(255,190,110,0.35)');hg.addColorStop(1,'rgba(255,190,110,0)');c.fillStyle=hg;c.fillRect(-300,GY-200,520,520);c.restore();
    c.fillStyle='rgba(0,0,0,0.45)';c.beginPath();c.ellipse(40,GY+60,120,22,0,0,TAU);c.fill();
    const gl=inv(A(56)-0.4,A(56),t)*(1-inv(B(56),B(56)+0.3,t));
    if(gl>0)ripper(c,{x:780,y:GY-80,s:0.8,f:-1,t,a:0.18*gl,glint:gl});}});
  fog(c,t,0.6,{n:9,y0:1100,y1:1900,seed:22});finishStreet(c,t,cam,lights,{dark:0.65});
  if(t>WT(55,0)){const q=t-WT(55,0);bigQ(c,W/2,880,spring(q*1.3)*0.85*(1+Math.sin(q*6)*0.04),t);if(q<0.5)ring(c,W/2,880,lerp(100,800,eo(q/0.5)),(1-q/0.5)*0.6,'rgba(255,80,60,',12);}
  if(t>B(56)+0.1){c.fillStyle=`rgba(0,0,0,${inv(B(56)+0.1,END,t)})`;c.fillRect(0,0,W,H);}
};
const SHOTS=[[0,'A'],[A(4),'B'],[A(5),'C'],[A(9),'D'],[A(11),'E'],[A(18),'F'],[A(23),'G'],[A(28),'H'],[A(32),'I'],[A(38),'J'],[A(43),'K'],[A(47),'Lx'],[A(51),'M'],[A(54),'N']];
// impacts -> shake / flash
const IMPACTS=[[A(3),18,0.5,'#cfe0ff',0.55],[T_SLAM,10,0.3],[WT(8,4)+0.25,22,0.5,'#fff',0.25],[WT(10,3),6,0.2],[A(22),12,0.35],[A(25),8,0.3],[A(27),16,0.5,'#ff5030',0.35],[A(29),14,0.4,'#ff3020',0.35],[A(35),12,0.35],[A(37),16,0.5,'#ff4020',0.3],[A(38)+0.1,10,0.4,'#dfe8ff',0.6],[A(38)+1.3,8,0.3,'#dfe8ff',0.4],[WT(39,1),10,0.25],[WT(39,2),10,0.25],[A(41)+0.42,18,0.4,'#fff',0.2],[WT(46,7)+0.1,6,0.3,'#fff',0.5],[WT(52,0)+0.25,10,0.3],[WT(53,4)+0.05,12,0.3],[WT(53,4)+0.23,20,0.5,'#ff3020',0.25],[WT(55,0),12,0.4,'#ff3020',0.2],[A(43)-0.02,0,0,'#fff',0.15],[A(47),0,0,'#fff',0.12]];
