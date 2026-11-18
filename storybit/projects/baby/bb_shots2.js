'use strict';
// ===================== Baby memories · full shot list =====================
const sgB=(t,a,b)=>clamp((t-a)/(b-a));
const wb=(word,near=0)=>{let best=null;for(const q of W_){if(!q.x.toLowerCase().replace(/[^a-z0-9'-]/g,'').startsWith(word))continue;if(!best||Math.abs(q.t-near)<Math.abs(best.t-near))best=q;}return best?best.t:near;};
// ---------- shared graphics ----------
function heartP(c,x,y,r){c.beginPath();c.moveTo(x,y+r*0.9);c.bezierCurveTo(x-r*1.4,y,x-r*0.8,y-r*1.1,x,y-r*0.45);c.bezierCurveTo(x+r*0.8,y-r*1.1,x+r*1.4,y,x,y+r*0.9);c.closePath();}
function redX(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#e8342a';c.strokeStyle=K2;c.lineWidth=r*0.12;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=r*0.22;c.lineCap='round';c.beginPath();c.moveTo(-r*0.4,-r*0.4);c.lineTo(r*0.4,r*0.4);c.moveTo(r*0.4,-r*0.4);c.lineTo(-r*0.4,r*0.4);c.stroke();c.restore();}
function warnTri(c,x,y,r,k){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.lineJoin='round';c.fillStyle='#ffcc2a';c.strokeStyle=K2;c.lineWidth=r*0.12;c.beginPath();c.moveTo(0,-r);c.lineTo(r*1.05,r*0.75);c.lineTo(-r*1.05,r*0.75);c.closePath();c.fill();c.stroke();c.fillStyle=K2;rr(c,-r*0.09,-r*0.5,r*0.18,r*0.75,r*0.08);c.fill();c.beginPath();c.arc(0,r*0.47,r*0.11,0,TAU);c.fill();c.restore();}
function pill(c,x,y,text,k,o={}){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.font=`900 ${o.size||40}px "Inter Display"`;c.letterSpacing='4px';const w=c.measureText(text).width+60;c.fillStyle=o.bg||'rgba(10,10,16,0.88)';c.strokeStyle=o.col||'#ffd060';c.lineWidth=4;rr(c,-w/2,-36,w,72,36);c.fill();c.stroke();txt(c,text,0,2,o.size||40,o.tc||'#fff',{ls:4,stroke:false});c.restore();}
// mini scenes for photos (drawn in a w×w window centred at 0,0)
const SCN={
  bday:(c,w,t)=>{const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,'#f6dcc0');g.addColorStop(1,'#e8b898');c.fillStyle=g;c.fillRect(-w/2,-w/2,w,w);c.fillStyle='#d8a07a';c.fillRect(-w/2,w*0.22,w,w*0.3);
    for(const [x,y,col] of [[-0.32,-0.3,'#e85a5a'],[0.3,-0.34,'#5ab0d8'],[0.38,-0.12,'#f2c84a']]){c.fillStyle=col;c.strokeStyle=K2;c.lineWidth=w*0.01;c.beginPath();c.ellipse(x*w,y*w,w*0.07,w*0.085,0,0,TAU);c.fill();c.stroke();}
    baby(c,{x:-w*0.05,y:w*0.36,s:w/330,pose:'sit',hat:1,face:BF('happy','up','grin'),hf:[22,-4],hb:[-22,-4],open:1,t});cake(c,w*0.02,w*0.46,w/900,t,1);},
  steps:(c,w,t)=>{const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,'#c8dce8');g.addColorStop(1,'#a8c4d4');c.fillStyle=g;c.fillRect(-w/2,-w/2,w,w);c.fillStyle='#d8b088';c.fillRect(-w/2,w*0.25,w,w*0.3);
    baby(c,{x:0,y:w*0.42,s:w/340,pose:'stand',kind:'babyB',face:BF('happy','up','o'),hf:[30,-30],hb:[-30,-30],open:1,wob:1,t});},
  word:(c,w,t)=>{const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,'#f8d4dc');g.addColorStop(1,'#e8b0bc');c.fillStyle=g;c.fillRect(-w/2,-w/2,w,w);c.fillStyle='#c8a0a8';c.fillRect(-w/2,w*0.25,w,w*0.3);
    baby(c,{x:-w*0.12,y:w*0.4,s:w/330,pose:'sit',face:BF('happy','up','o'),hf:[20,30],hb:[-20,30],t});c.save();c.translate(w*0.24,-w*0.26);c.scale(w/700,w/700);speech(c,0,0,'MAMA!',{size:60,tail:-1});c.restore();},
  beach:(c,w,t)=>{const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,'#8fd0f0');g.addColorStop(0.55,'#d8f0ff');c.fillStyle=g;c.fillRect(-w/2,-w/2,w,w);c.fillStyle='#3a8ac8';c.fillRect(-w/2,w*0.02,w,w*0.12);c.fillStyle='#f0d8a0';c.fillRect(-w/2,w*0.14,w,w*0.4);
    c.fillStyle='#fff6c8';c.beginPath();c.arc(w*0.3,-w*0.3,w*0.08,0,TAU);c.fill();baby(c,{x:-w*0.05,y:w*0.44,s:w/360,pose:'stand',kind:'babyB',face:BF('happy','up','grin'),hf:[34,10],hb:[-20,40],t});
    c.fillStyle='#e85a5a';c.strokeStyle=K2;c.lineWidth=w*0.012;c.beginPath();c.moveTo(w*0.18,w*0.3);c.lineTo(w*0.34,w*0.3);c.lineTo(w*0.31,w*0.44);c.lineTo(w*0.21,w*0.44);c.closePath();c.fill();c.stroke();},
};
// polaroid with optional fx: del (glitch-dissolve 0..1), fade, age badge
function polaroid(c,x,y,w,rot,scene,t,o={}){const fx=o.del||0;if(fx>=1)return;const m=c.getTransform();const cw=c.canvas.width,ch=c.canvas.height;
  const Ly=lyr('pol',cw,ch),l=Ly.getContext('2d');l.setTransform(1,0,0,1,0,0);l.globalAlpha=1;l.globalCompositeOperation='source-over';l.clearRect(0,0,cw,ch);l.setTransform(m);
  l.save();l.translate(x,y);l.rotate(rot);const h=w*1.2;l.fillStyle='rgba(0,0,0,0.35)';rr(l,-w/2+10,-h/2+16,w,h,8);l.fill();l.fillStyle='#fbf8f0';l.strokeStyle=K2;l.lineWidth=5;rr(l,-w/2,-h/2,w,h,8);l.fill();l.stroke();
  const iw=w*0.86;l.save();l.translate(0,-h/2+w*0.07+iw/2);l.beginPath();l.rect(-iw/2,-iw/2,iw,iw);l.clip();SCN[scene](l,iw,t);l.restore();l.strokeStyle='rgba(0,0,0,0.5)';l.lineWidth=3;l.strokeRect(-iw/2,-h/2+w*0.07,iw,iw);
  if(o.age){l.fillStyle='#1a1a24';l.font=`900 ${w*0.11}px "Inter Display"`;l.textAlign='center';l.textBaseline='middle';l.fillText(o.age,0,h/2-w*0.12);}
  l.restore();
  c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=(o.a??1)*(1-fx*0.7);
  if(fx>0){const n=28;for(let i=0;i<n;i++){const y0=i*ch/n,off=(hash(i+Math.floor(t*20))-0.5)*fx*160*SS;c.drawImage(Ly,0,y0,cw,ch/n,off,y0,cw,ch/n);}c.globalCompositeOperation='source-atop';c.globalAlpha=1;}else c.drawImage(Ly,0,0);
  c.restore();
  if(fx>0){c.save();const P=(px,py)=>({x:(m.a*px+m.c*py+m.e)/SS,y:(m.b*px+m.d*py+m.f)/SS});const q=P(x,y);c.setTransform(SS,0,0,SS,0,0);
    c.fillStyle=`rgba(255,40,40,${0.35*fx})`;c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const yy=q.y+(hash(i+Math.floor(t*24))-0.5)*w*1.2;c.fillRect(q.x-w*0.6,yy,w*1.2,4+hash(i)*10);}c.globalCompositeOperation='source-over';
    for(let i=0;i<40;i++){const a=hash(i*3.1)*TAU,d=fx*(80+hash(i*7)*320),sz=6+hash(i)*14;c.globalAlpha=(1-fx);c.fillStyle=['#fbf8f0','#f2b4c4','#e8b898','#5ab0d8','#ff4a3a'][i%5];c.fillRect(q.x+(hash(i*5)-0.5)*w+Math.cos(a)*d,q.y+(hash(i*9)-0.5)*w*1.2+Math.sin(a)*d-fx*120,sz,sz);}c.restore();}}
// neuron network inside a region
function nodesIn(n,seed,cx,cy,rx,ry){const P=[];for(let i=0;i<n;i++){const a=hash(i*3.3+seed)*TAU,r=Math.sqrt(hash(i*5.7+seed));P.push([cx+Math.cos(a)*r*rx,cy+Math.sin(a)*r*ry]);}return P;}
function network(c,P,t,grow,o={}){const col=o.col||'120,200,255',n=P.length;c.save();c.globalCompositeOperation='lighter';c.lineCap='round';
  for(let i=0;i<n;i++){const k=clamp(grow*n*0.03-i*0.03+0.0);if(k<=0)continue;for(let j=i+1;j<Math.min(n,i+4);j++){const a=P[i],b=P[(j*7+i*3)%n];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d>(o.maxD||260))continue;const e=clamp(k*1.5);
      c.strokeStyle=`rgba(${col},${0.35})`;c.lineWidth=o.lw||2.5;c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+b[0])/2+(hash(i+j)-0.5)*40,(a[1]+b[1])/2+(hash(i*j)-0.5)*40,lerp(a[0],b[0],e),lerp(a[1],b[1],e));c.stroke();
      if(e>=1){const pu=(t*0.9+hash(i*j))%1;c.fillStyle=`rgba(${col},0.9)`;c.beginPath();c.arc(lerp(a[0],b[0],pu),lerp(a[1],b[1],pu),3,0,TAU);c.fill();}}
    c.fillStyle=`rgba(${col},${0.9*k})`;c.beginPath();c.arc(P[i][0],P[i][1],(o.r||6)*k,0,TAU);c.fill();}
  c.restore();}
// hippocampus (seahorse-shaped) in brainSide coordinates
function hippo(c,k,t,o={}){if(k<=0)return;c.save();c.lineCap='round';c.lineJoin='round';const path=()=>{c.beginPath();c.moveTo(-70,58);c.bezierCurveTo(-40,40,0,36,28,50);c.bezierCurveTo(52,62,58,86,40,96);c.bezierCurveTo(26,104,14,92,22,82);};
  c.globalCompositeOperation='lighter';path();c.strokeStyle=`rgba(255,190,80,${0.35*k})`;c.lineWidth=34;c.stroke();path();c.strokeStyle=`rgba(255,220,130,${0.9*k})`;c.lineWidth=14;c.stroke();path();c.strokeStyle=`rgba(255,250,220,${k})`;c.lineWidth=4;c.stroke();
  const pu=1+Math.sin(t*6)*0.15;const g=c.createRadialGradient(10,66,0,10,66,120*pu);g.addColorStop(0,`rgba(255,200,90,${0.35*k})`);g.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=g;c.beginPath();c.arc(10,66,120*pu,0,TAU);c.fill();c.restore();}
// 2D props
function album(c,x,y,s,rot,photos){c.save();c.translate(x,y);c.rotate(rot);c.lineJoin='round';c.fillStyle='#7a3a2a';c.strokeStyle=K2;c.lineWidth=5*s;rr(c,-120*s,-78*s,240*s,156*s,10*s);c.fill();c.stroke();
  for(const sd of [-1,1]){c.fillStyle='#f6f0e2';rr(c,sd>0?4*s:-112*s,-70*s,108*s,140*s,6*s);c.fill();c.stroke();for(const [px,py] of [[-36,-36],[36,-36],[-36,30],[36,30]]){const cx=sd*58*s+px*0.62*s,cy=py*s;c.strokeStyle='rgba(120,100,80,0.55)';c.lineWidth=2.4*s;c.setLineDash([6*s,5*s]);c.strokeRect(cx-22*s,cy-26*s,44*s,44*s);c.setLineDash([]);}}
  c.strokeStyle=K2;c.lineWidth=4*s;seg(c,0,-72*s,0,72*s);c.restore();}
function bookRead(c,x,y,s,t){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;const sw=Math.sin(t*1.3)*2*s;
  // page block peeking over the covers (pages face the reader, we see their top edges)
  c.fillStyle='#f6f0e2';c.beginPath();c.moveTo(-108*s,-34*s);c.quadraticCurveTo(-54*s,-58*s,0,-44*s);c.quadraticCurveTo(54*s,-58*s,108*s,-34*s);c.lineTo(100*s,-20*s);c.lineTo(-100*s,-20*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(120,100,80,0.45)';c.lineWidth=2*s;for(let i=1;i<4;i++){c.beginPath();c.moveTo(-100*s,(-34+i*4)*s);c.quadraticCurveTo(-54*s,(-56+i*4)*s,0,(-44+i*4)*s);c.quadraticCurveTo(54*s,(-56+i*4)*s,100*s,(-34+i*4)*s);c.stroke();}
  // two back covers angled toward us
  for(const sd of [-1,1]){const g=c.createLinearGradient(0,0,sd*120*s,0);g.addColorStop(0,'#5a2a1c');g.addColorStop(1,sd>0?'#8a4a30':'#6a3424');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=5*s;
    c.beginPath();c.moveTo(0,-40*s);c.lineTo(sd*112*s,(-30+sw*sd*0.3)*s);c.lineTo(sd*104*s,62*s);c.lineTo(0,70*s);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,220,170,0.35)';c.lineWidth=3*s;c.beginPath();c.moveTo(sd*20*s,-30*s);c.lineTo(sd*96*s,-22*s);c.stroke();}
  c.fillStyle='#3a1a10';c.strokeStyle=K2;c.lineWidth=4*s;rr(c,-9*s,-44*s,18*s,116*s,6*s);c.fill();c.stroke();
  c.restore();}
function chest(c,x,y,s,t,glow){c.save();c.translate(x,y);c.lineJoin='round';const gw=glow*(0.85+Math.sin(t*5)*0.15);
  if(gw>0){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,-40*s,0,0,-40*s,420*s);g.addColorStop(0,`rgba(255,200,110,${0.45*gw})`);g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(-500*s,-500*s,1000*s,900*s);c.restore();}
  c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(0,120*s,260*s,36*s,0,0,TAU);c.fill();
  const wd=c.createLinearGradient(-220*s,0,220*s,0);wd.addColorStop(0,'#4a2a18');wd.addColorStop(0.5,'#8a5430');wd.addColorStop(1,'#3a2012');
  c.fillStyle=wd;c.strokeStyle=K2;c.lineWidth=7*s;rr(c,-220*s,-30*s,440*s,150*s,12*s);c.fill();c.stroke();
  c.beginPath();c.moveTo(-220*s,-30*s);c.lineTo(-220*s,-90*s);c.bezierCurveTo(-200*s,-190*s,200*s,-190*s,220*s,-90*s);c.lineTo(220*s,-30*s);c.closePath();c.fill();c.stroke();
  // glow leaking from the lid seam
  if(gw>0){c.save();c.globalCompositeOperation='lighter';c.strokeStyle=`rgba(255,230,160,${0.9*gw})`;c.lineWidth=6*s;seg(c,-214*s,-32*s,214*s,-32*s);for(let i=0;i<6;i++){const xx=(-180+i*72)*s;const g=c.createLinearGradient(0,-32*s,0,-260*s);g.addColorStop(0,`rgba(255,220,140,${0.4*gw})`);g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.beginPath();c.moveTo(xx-10*s,-32*s);c.lineTo(xx+10*s,-32*s);c.lineTo(xx+40*s+Math.sin(t+i)*10*s,-260*s);c.lineTo(xx-40*s,-260*s);c.closePath();c.fill();}c.restore();}
  const br=c.createLinearGradient(0,-180*s,0,120*s);br.addColorStop(0,'#fff0a8');br.addColorStop(0.5,'#d8a23a');br.addColorStop(1,'#7a4e10');c.fillStyle=br;
  for(const xx of [-170,170]){c.fillRect((xx-16)*s,-160*s,32*s,280*s);c.strokeRect((xx-16)*s,-160*s,32*s,280*s);}
  rr(c,-60*s,-70*s,120*s,130*s,14*s);c.fill();c.stroke();
  c.fillStyle='#120c08';heartP(c,0,-6*s,24*s);c.fill();c.fillRect(-7*s,6*s,14*s,32*s);
  if(gw>0){c.save();c.globalCompositeOperation='lighter';heartP(c,0,-6*s,24*s);c.fillStyle=`rgba(255,200,110,${0.7*gw})`;c.fill();c.restore();}
  c.restore();}
function steamroller(c,x,y,s,t){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;
  c.fillStyle='#f2b81a';rr(c,-40*s,-190*s,190*s,110*s,14*s);c.fill();c.stroke();c.fillStyle='#bfe0f0';rr(c,0,-176*s,90*s,60*s,8*s);c.fill();c.stroke();c.fillStyle='#e8a812';c.fillRect(-60*s,-90*s,260*s,40*s);c.strokeRect(-60*s,-90*s,260*s,40*s);
  c.fillStyle='#d8d8dc';c.beginPath();c.arc(-60*s,-30*s,72*s,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=3*s;const sp=t*4;for(let i=0;i<5;i++){const a=sp+i*1.26;seg(c,-60*s+Math.cos(a)*60*s,-30*s+Math.sin(a)*60*s,-60*s+Math.cos(a)*20*s,-30*s+Math.sin(a)*20*s);}
  c.strokeStyle=K2;c.lineWidth=6*s;c.fillStyle='#2a2a30';c.beginPath();c.arc(150*s,-20*s,52*s,0,TAU);c.fill();c.stroke();c.fillStyle='#8a8a90';c.beginPath();c.arc(150*s,-20*s,20*s,0,TAU);c.fill();c.stroke();
  c.fillStyle='#3a3a40';c.fillRect(110*s,-250*s,16*s,64*s);c.strokeRect(110*s,-250*s,16*s,64*s);c.fillStyle=`rgba(80,80,90,0.5)`;for(let i=0;i<3;i++){const p=(t*1.5+i/3)%1;c.beginPath();c.arc(118*s+p*40*s,-260*s-p*120*s,(14+p*30)*s,0,TAU);c.fill();}
  c.restore();}
function carMem(c,x,y,s,col,sink){c.save();c.translate(x,y+sink*40*s);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;c.fillStyle=col;rr(c,-80*s,-60*s,160*s,50*s,16*s);c.fill();c.stroke();c.beginPath();c.moveTo(-46*s,-60*s);c.lineTo(-30*s,-96*s);c.lineTo(34*s,-96*s);c.lineTo(52*s,-60*s);c.closePath();c.fill();c.stroke();
  c.fillStyle='#cfe8f4';c.beginPath();c.moveTo(-36*s,-64*s);c.lineTo(-24*s,-90*s);c.lineTo(2*s,-90*s);c.lineTo(2*s,-64*s);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(8*s,-64*s);c.lineTo(8*s,-90*s);c.lineTo(30*s,-90*s);c.lineTo(44*s,-64*s);c.closePath();c.fill();c.stroke();
  c.fillStyle='#1a1a20';for(const xx of [-46,46]){c.beginPath();c.arc(xx*s,-10*s,18*s,0,TAU);c.fill();c.stroke();}
  // a little memory photo strapped to the roof
  c.save();c.translate(0,-118*s);c.rotate(-0.08);c.fillStyle='#fbf8f0';c.fillRect(-26*s,-22*s,52*s,46*s);c.strokeRect(-26*s,-22*s,52*s,46*s);c.fillStyle='#f2b4c4';c.fillRect(-20*s,-16*s,40*s,30*s);c.fillStyle='#fdf7f1';c.beginPath();c.arc(0,-4*s,9*s,0,TAU);c.fill();c.restore();
  c.restore();}
function cabinet(c,x,y,s,open){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=7*s;const g=c.createLinearGradient(-180*s,0,180*s,0);g.addColorStop(0,'#5a6676');g.addColorStop(0.5,'#8a96a6');g.addColorStop(1,'#4a5462');
  c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(0,20*s,230*s,30*s,0,0,TAU);c.fill();c.fillStyle=g;rr(c,-180*s,-560*s,360*s,580*s,12*s);c.fill();c.stroke();
  for(let i=0;i<3;i++){const dy=-530*s+i*182*s,o=i===1?open*90*s:0;c.fillStyle=g;rr(c,-160*s,dy+o*0.25,320*s,160*s,10*s);c.fill();c.stroke();if(o>0){c.fillStyle='#2a2e36';c.fillRect(-150*s,dy-6*s,300*s,o*0.25);}
    c.fillStyle='#f6f0e2';rr(c,-60*s,dy+30*s+o*0.25,120*s,46*s,4*s);c.fill();c.stroke();c.fillStyle='#c8ccd4';rr(c,-50*s,dy+100*s+o*0.25,100*s,24*s,12*s);c.fill();c.stroke();
    c.fillStyle='#b8b0a0';txt(c,'?',0,dy+54*s+o*0.25,34*s,'#9a9080',{stroke:false});}
  c.restore();}
// ---------- shots ----------
// 0 · hook: three baby memories (ages 1, 2, 3) orbit the brain… then get deleted, one by one
BV.hook=(c,t,u,d)=>{richBG(c,t,'40,10,20');const sh=t>0.67?Math.sin(t*60)*4*(1-sgB(t,0.67,1.1)):0;c.save();c.translate(sh,0);
  const bz=1.05+u*0.06;brainSide(c,540,1040,bz*1.15,t,{});glowAt(c,540,1040,520,'255,60,60',0.12+0.1*Math.sin(t*8));
  const del=[wb('first',1.6),wb('three',1.7),wb('years',2.1)];const ph=[['bday','AGE 1'],['steps','AGE 2'],['word','AGE 3']];
  ph.forEach(([sc,ag],i)=>{const a=-Math.PI/2+(i-1)*1.0+Math.sin(t*0.8+i)*0.05,R=420,x=540+Math.cos(a)*R*1.0,y=1040+Math.sin(a)*R*0.85+(i===1?-40:60);const k=popK(t,0.05+i*0.12,0.35);if(k<=0)return;
    c.save();c.translate(x,y);c.scale(k,k);c.translate(-x,-y);polaroid(c,x,y,260,(i-1)*0.12,sc,t,{age:ag,del:sgB(t,del[i],del[i]+0.55)});c.restore();});
  // red scan beam sweeping across
  if(t>0.6){const yb=lerp(400,1700,(t*0.9)%1);c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,yb-40,0,yb+40);g.addColorStop(0,'rgba(255,40,40,0)');g.addColorStop(0.5,'rgba(255,60,50,0.55)');g.addColorStop(1,'rgba(255,40,40,0)');c.fillStyle=g;c.fillRect(0,yb-40,W,80);c.restore();}
  c.restore();if(t<0.12)flash(c,1-t/0.12,'#fff');bbCine(c,t,{v:0.6});};
// 1 · "on purpose." the brain smirks and hits a big red DELETE button
BV.purpose=(c,t,u,d)=>{richBG(c,t,'30,12,40');const t0=BV.purpose.t0,tp=wb('purpose',3.9);const z=1+u*0.08;c.save();c.translate(540,1000);c.scale(z,z);c.translate(-540,-1000);
  brainFace(c,540,860,300,{eyes:t>tp?'half':'dot',brow:t>tp?'angry':0,mouth:t>tp?'smirk':'smile'});
  const press=t>tp?EZ.out(sgB(t,tp,tp+0.12))-EZ.out(sgB(t,tp+0.2,tp+0.4))*0.6:0;
  c.save();c.translate(540,1420);c.lineJoin='round';c.fillStyle='#2a2a34';c.strokeStyle=K2;c.lineWidth=8;rr(c,-200,-30,400,110,20);c.fill();c.stroke();
  c.fillStyle='#8a1410';c.beginPath();c.ellipse(0,-10+press*24,160,46,0,0,TAU);c.fill();c.stroke();const gb=c.createLinearGradient(0,-90,0,0);gb.addColorStop(0,'#ff6a5a');gb.addColorStop(1,'#d81e14');c.fillStyle=gb;c.fillRect(-160,-60+press*24,320,50);c.beginPath();c.ellipse(0,-60+press*24,160,46,0,0,TAU);c.fill();c.stroke();
  c.strokeStyle=K2;c.lineWidth=10;c.beginPath();c.ellipse(0,-10+press*24,160,46,0,0,Math.PI);c.stroke();c.restore();
  // a little brain "hand" (a fold) pressing it
  const hy=lerp(1180,1330,press);c.save();c.strokeStyle=K2;c.lineWidth=40;c.lineCap='round';seg(c,700,1020,600,hy);c.strokeStyle='#f6a6bf';c.lineWidth=28;seg(c,700,1020,600,hy);c.fillStyle='#f6a6bf';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.arc(600,hy+10,34,0,TAU);c.fill();c.stroke();c.restore();
  c.restore();if(t>tp+0.1){flash(c,0.6*(1-sgB(t,tp+0.1,tp+0.4)),'#ff2a2a');for(let i=0;i<3;i++)ring(c,540,1400,80+sgB(t,tp+0.1,tp+0.7)*600+i*60,0.5*(1-sgB(t,tp+0.1,tp+0.7)),'rgba(255,80,60,',10);}
  bbCine(c,t,{v:0.6});};
// 2 · "Give me 60 seconds, and I'll show you where those memories went." grown-up you, in your old nursery, holding an empty album
BV.give=(c,t,u,d)=>{camAt(c,'nu_wide',[0.0,1.3,-0.9],K3(u,d,1.05,1.15),{oy:-420});
  const tw=wb('memories',8.6);const ts=W_.find(w=>w.x==='60').t,wk=sgB(t,ts+0.45,ts+1.35);const P=[lerp(-2.2,-0.8,EZ.out(wk)),0,-2.0];const walking=wk>0&&wk<1;const r=who(c,'dad',P,BF(t>tw?'wide':'dot',t>tw?'up':'worried',t>tw?'o':'flat',walking?{walk:1,ph:t*9,view:'3q',f:1,hf:[40,46],hb:[-40,46],seed:3}:{hf:[42,44],hb:[-42,44],seed:3,look:[0,7]}));
  const mx=(r.hf.x+r.hb.x)/2,my=(r.hf.y+r.hb.y)/2;const ps=pp(P).s;bookRead(c,mx,my-8*ps,ps*0.62,t);
  // the photos fly out of the album and turn to dust
  if(t>tw-0.3)for(let i=0;i<5;i++){const k=sgB(t,tw-0.3+i*0.1,tw+0.9+i*0.1);if(k<=0||k>=1)continue;const sd=i%2?1:-1,x=mx+sd*(90+EZ.out(k)*(260+i*60)),y=my-60-k*(500+i*60);c.save();c.globalAlpha=1-k*k;c.translate(x,y);c.rotate(k*4*(i%2?1:-1));c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-40,-48,80,96);c.strokeRect(-40,-48,80,96);c.fillStyle=['#f2b4c4','#9ccbe8','#f6dcc0','#c8e0a8','#f8d4dc'][i];c.fillRect(-32,-40,64,64);c.restore();
    for(let j=0;j<8;j++){c.fillStyle=`rgba(255,230,200,${0.7*(1-k)})`;c.beginPath();c.arc(x+(hash(i*9+j)-0.5)*160*k,y+(hash(i*7+j)-0.5)*160*k+60*k,3+hash(j)*4,0,TAU);c.fill();}}
  c.restore();bbCine(c,t,{v:0.45});};
// 4 · "Your first steps." the baby wobbles from the crib toward dad's open hands
BV.steps=(c,t,u,d)=>{camAt(c,'nu_wide',[0.1,0.7,-1.0],K3(u,d,1.12,1.2),{oy:-120});const t0=BV.steps.t0;
  const k=EZ.io(sgB(t,t0,t0+0.75));const bx=lerp(-0.45,0.05,k);
  who(c,'dad',[0.55,0,-1.6],BF('happy','up','grin',{hf:[-64,52],hb:[-40,62],f:-1,view:'3q',lean:0.12,seed:3}));
  const pb=pp([bx,0,-0.75]);baby(c,{x:pb.x,y:pb.y,s:pb.s*0.6,pose:'stand',kind:'babyB',face:BF('happy','up','o'),hf:[28,-34],hb:[-28,-34],open:1,wob:1,seed:2});
  // footprints appear behind the baby
  for(let i=0;i<4;i++){const fx=lerp(-0.45,0.05,i/4);if(fx>bx-0.05)continue;const q=pp([fx+(i%2?0.02:-0.02),0,-0.7]);c.fillStyle='rgba(255,210,120,0.75)';c.beginPath();c.ellipse(q.x,q.y,10,5,0,0,TAU);c.fill();}
  c.restore();bbCine(c,t,{v:0.45});};
// 5 · "Your first word." close: "MAMA!"
BV.word=(c,t,u,d)=>{const t0=BV.word.t0,tw=wb('word',12.9);camAt(c,'nu_low',[0.35,0.32,-0.45],K3(u,d,1.45,1.55),{oy:-30});
  const pb=pp([0.35,0,-0.5]);const r=baby(c,{x:pb.x,y:pb.y,s:pb.s*0.5,pose:'sit',hs:0.98,face:BF(t>tw?'happy':'dot','up',t>tw?'grin':'o'),hf:[20,30],hb:[-20,30],seed:4});
  c.restore();const k=popK(t,tw-0.08,0.3);if(k>0){speech(c,760,620,'MAMA!',{size:74,k,tail:-1});for(let i=0;i<3;i++){const hk=popK(t,tw+0.1+i*0.08,0.3);if(hk<=0)continue;c.save();c.translate(600+i*130,480-Math.sin(t*4+i)*10);c.scale(hk,hk);heartP(c,0,0,26);c.fillStyle='#ff5a7a';c.fill();c.strokeStyle=K2;c.lineWidth=5;c.stroke();c.restore();}}
  bbCine(c,t,{v:0.45});};
// 6 · "Gone." the three photos burn away to nothing
BV.gone=(c,t,u,d)=>{richBG(c,t,'20,14,18');const t0=BV.gone.t0;['bday','steps','word'].forEach((sc,i)=>{const del=sgB(t,t0+0.15+i*0.08,t0+0.75+i*0.08);polaroid(c,300+i*240,1000+(i===1?-30:20),250,(i-1)*0.14,sc,t,{del});});
  glowAt(c,540,1000,500,'255,80,40',0.2*(1-sgB(t,t0+0.3,t0+1.0)));bbCine(c,t,{v:0.7});};
// 7 · "Scientists call it infantile amnesia." scientist presents a hologram: the 0–3 years of the life timeline are blank
BV.amnesia=(c,t,u,d)=>{camAt(c,'ml_wide',[-0.7,1.1,-1.1],K3(u,d,1.08,1.16),{oy:-60});const t0=BV.amnesia.t0;
  who(c,'sci',[-1.3,0,-1.6],BF('dot','up','smile',{hf:[72,26],seed:5}));
  c.restore();const k=popK(t,t0+0.3,0.4);if(k>0){c.save();c.translate(700,780);c.scale(k*0.9,k*0.9);c.fillStyle='rgba(20,60,110,0.55)';c.strokeStyle='rgba(140,210,255,0.95)';c.lineWidth=4;rr(c,-300,-150,600,300,20);c.fill();c.stroke();
    // life timeline: years 0..10, first 3 years empty/striped
    for(let i=0;i<10;i++){const x=-260+i*52,on=i>=3;c.fillStyle=on?'rgba(120,220,255,0.85)':'rgba(255,255,255,0.08)';c.fillRect(x,-30,44,70);if(!on){c.strokeStyle='rgba(255,90,90,0.8)';c.lineWidth=3;c.strokeRect(x,-30,44,70);}
      c.fillStyle='#d8f0ff';c.font='800 26px "Inter Display"';c.textAlign='center';c.fillText(String(i),x+22,80);}
    c.fillStyle='rgba(255,90,90,0.9)';c.font='900 70px "Inter Display"';c.fillText('?',-182,-60);c.restore();}
  bbCine(c,t,{v:0.5});};
// 8 · "And everyone has it." a lineup of all kinds of people, each with an empty memory bubble
BV.everyone=(c,t,u,d)=>{richBG(c,t,'24,20,44');const t0=BV.everyone.t0;c.save();const z=1+u*0.05;c.translate(540,1200);c.scale(z,z);c.translate(-540,-1200);
  c.fillStyle='rgba(255,255,255,0.06)';c.beginPath();c.ellipse(540,1600,560,90,0,0,TAU);c.fill();
  const P=[['mom',150,1.05],['sci2',345,1.1],['kid7',540,0.78],['dad',735,1.1],['sci',930,1.05]];
  L2={dx:1,rim:'#a8b8ff',amb:'#5a5a8a',key:'rgba(255,205,150,'};
  P.forEach(([k,x,sc],i)=>{const r=who(c,k,[0,0,0],Object.assign(BF('dot',i%2?'worried':'up','flat',{seed:i}),{abs:{x,y:1640,s:1.38*sc}}));
    const bk=popK(t,t0+0.12*i,0.3);if(bk>0){const hy=r.hc.y-150;c.save();c.translate(x,hy);c.scale(bk,bk);c.fillStyle='rgba(255,255,255,0.92)';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.ellipse(0,0,70,56,0,0,TAU);c.fill();c.stroke();
      for(const [dx,dy,rr0] of [[-28,72,12],[-16,96,7]]){c.beginPath();c.arc(dx,dy,rr0,0,TAU);c.fill();c.stroke();}c.strokeStyle='rgba(120,120,140,0.7)';c.lineWidth=3;c.setLineDash([8,6]);c.strokeRect(-34,-30,68,56);c.setLineDash([]);txt(c,'?',0,0,44,'#e8342a',{stroke:false});c.restore();}});
  c.restore();bbCine(c,t,{v:0.55});};
// 9 · "But here's the weird part." the baby tilts its head, a big question mark
BV.weird=(c,t,u,d)=>{const t0=BV.weird.t0;camAt(c,'nu_low',[0.35,0.3,-0.45],K3(u,d,1.3,1.5),{oy:-20});const pb=pp([0.35,0,-0.5]);
  baby(c,{x:pb.x,y:pb.y,s:pb.s*0.5,pose:'sit',hs:0.98,face:BF('focus','up','flat',{tilt:0.16}),hf:[18,40],hb:[-18,40],seed:5});c.restore();
  bigQ(c,820,640,popK(t,wb('weird',20.0)-0.05,0.35)*1.0,t);bbCine(c,t,{v:0.5});};
// 10 · "Babies remember just fine." a glowing memory of a rattle lights up over the baby + a green check
BV.fine=(c,t,u,d)=>{const t0=BV.fine.t0;camAt(c,'nu_low',[0.35,0.3,-0.45],K3(u,d,1.5,1.4),{oy:-20});const pb=pp([0.35,0,-0.5]);
  const r=baby(c,{x:pb.x,y:pb.y,s:pb.s*0.5,pose:'sit',hs:0.98,face:BF('happy','up','grin'),hf:[22,-8],hb:[-22,-8],open:1,seed:6});c.restore();
  const k=popK(t,t0+0.15,0.35);if(k>0){c.save();c.translate(560,560);c.scale(k,k);glowAt(c,0,0,240,'255,210,120',0.4);c.fillStyle='rgba(255,246,220,0.95)';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(0,0,130,0,TAU);c.fill();c.stroke();
    // rattle
    c.rotate(Math.sin(t*10)*0.25);c.fillStyle='#f2c84a';c.beginPath();c.arc(-20,-30,46,0,TAU);c.fill();c.stroke();c.fillStyle='#e85a5a';c.beginPath();c.arc(-20,-30,20,0,TAU);c.fill();c.fillStyle='#5ab0d8';rr(c,10,0,24,90,12);c.save();c.translate(0,0);c.rotate(-0.6);rr(c,8,10,26,90,13);c.fill();c.stroke();c.restore();c.restore();}
  check(c,760,800,60,popK(t,wb('fine',22.4),0.3));bbCine(c,t,{v:0.45});};
// 11 · "Three-month-olds can remember a toy for days." top-down crib: ribbon on the ankle, kicks spin the mobile; days tick by
BV.toy=(c,t,u,d)=>{const t0=BV.toy.t0;c.fillStyle='#d8b088';c.fillRect(0,0,W,H);c.save();const z=1.05+u*0.05;c.translate(540,1050);c.scale(z,z);c.rotate(0.04);c.translate(-540,-1050);
  L2={dx:1,rim:'#fff0d0',amb:'#a89090',key:'rgba(255,205,150,'};
  c.fillStyle='rgba(0,0,0,0.25)';rr(c,170,520,760,1180,30);c.fill();c.fillStyle='#f8f6f2';c.strokeStyle=K2;c.lineWidth=8;rr(c,150,500,780,1160,26);c.fill();c.stroke();
  const sh=c.createLinearGradient(0,540,0,1640);sh.addColorStop(0,'#bcd8e8');sh.addColorStop(1,'#a0c4d8');c.fillStyle=sh;rr(c,190,540,700,1080,18);c.fill();c.stroke();
  c.strokeStyle='rgba(255,255,255,0.5)';c.lineWidth=6;for(let i=0;i<8;i++){c.beginPath();c.arc(260+i*90,620+(i%3)*360,22,0,TAU);c.stroke();}
  for(let i=0;i<14;i++){c.fillStyle='#f8f6f2';c.strokeStyle=K2;c.lineWidth=4;rr(c,170+i*55,505,18,28,6);c.fill();c.stroke();rr(c,170+i*55,1625,18,28,6);c.fill();c.stroke();}
  const kick=Math.max(0,Math.sin(t*9));const r=baby(c,{x:540,y:1380,s:1.55,pose:'stand',kind:'babyB',face:BF('happy','up','grin'),hf:[34,-20],hb:[-34,-20],open:1,wob:kick,seed:7});
  // mobile above (top view) spinning with each kick, ribbon from the ankle
  const mx=700,my=760,ang=t*1.2+kick*0.8;c.strokeStyle='#e85a5a';c.lineWidth=6;c.beginPath();c.moveTo(540+30,1380-10-kick*20);c.bezierCurveTo(760,1300,820,1000,mx,my);c.stroke();
  c.save();c.translate(mx,my);c.rotate(ang);c.strokeStyle=K2;c.lineWidth=8;seg(c,-120,0,120,0);seg(c,0,-120,0,120);[['#f2c84a',120,0],['#5ab0d8',-120,0],['#f08ab0',0,120],['#7cc47a',0,-120]].forEach(([col,x,y])=>{c.fillStyle=col;c.beginPath();c.arc(x,y,34,0,TAU);c.fill();c.stroke();});c.fillStyle='#fff';c.beginPath();c.arc(0,0,18,0,TAU);c.fill();c.stroke();c.restore();
  c.restore();
  // day counter
  const n=Math.min(6,1+Math.floor(Math.max(0,t-wb('days',25.4)+1.6)/0.3));const k=popK(t,t0+0.2,0.3);if(k>0){c.save();c.translate(200,520);c.scale(k,k);c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=6;rr(c,-90,-80,180,180,16);c.fill();c.stroke();c.fillStyle='#e8342a';rr(c,-90,-80,180,50,16);c.fill();c.stroke();txt(c,'DAY',0,-55,30,'#fff',{stroke:false,ls:4});txt(c,String(n),0,30,90,'#1a1a24',{stroke:false});c.restore();}
  bbCine(c,t,{v:0.4});};
// 12 · "Brain scans show one-year-olds storing memories in the hippocampus, your brain's memory hub."
BV.scan=(c,t,u,d)=>{richBG(c,t,'8,22,40');const t0=BV.scan.t0,ts=wb('storing',27.5),th=wb('hippocampus',29.1),thub=wb('hub',30.9);
  const zk=EZ.io(sgB(t,th-0.4,th+0.4));const z=lerp(1,1.55,zk);c.save();c.translate(540,1040);c.scale(z,z);c.translate(-540-lerp(0,10,zk)*1.6*0,-1040-lerp(0,66,zk)*1.6);
  // scanner ring
  c.save();c.lineWidth=60;c.strokeStyle='#d8dde4';c.beginPath();c.arc(540,1040,470,0,TAU);c.stroke();c.lineWidth=8;c.strokeStyle=K2;c.beginPath();c.arc(540,1040,500,0,TAU);c.stroke();c.beginPath();c.arc(540,1040,440,0,TAU);c.stroke();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(90,200,255,0.5)';c.lineWidth=6;c.beginPath();c.arc(540,1040,430,t*2,t*2+1.2);c.stroke();c.restore();
  // baby head silhouette (big round) + x-ray brain
  c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(120,180,230,0.08)';c.strokeStyle='rgba(150,210,250,0.4)';c.lineWidth=4;c.beginPath();c.arc(540,1010,330,0,TAU);c.fill();c.stroke();c.restore();
  brainSide(c,540,1010,1.2,t,{xray:true});
  c.save();c.translate(540,1010);c.scale(1.2,1.2);hippo(c,EZ.out(sgB(t,th-0.1,th+0.35)),t);c.restore();
  // memory sparks stream into the hippocampus
  if(t>ts){for(let i=0;i<10;i++){const p=((t-ts)*0.9+i/10)%1,a=hash(i*3)*TAU,R=520*(1-p);const x=540+12*1.2+Math.cos(a)*R,y=1010+66*1.2+Math.sin(a)*R;c.save();c.globalAlpha=Math.min(1,p*3);c.translate(x,y);c.rotate(a);c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-18,-22,36,44);c.strokeRect(-18,-22,36,44);c.fillStyle=['#f2b4c4','#9ccbe8','#f6dcc0'][i%3];c.fillRect(-14,-18,28,28);c.restore();}}
  if(t>thub){for(let i=0;i<3;i++){const p=((t-thub)*1.2+i/3)%1;ring(c,540+12*1.2,1010+66*1.2,40+p*260,0.6*(1-p),'rgba(255,200,100,',6);}}
  c.restore();if(t>th)pill(c,540,1600,'HIPPOCAMPUS',popK(t,th,0.3),{col:'#ffc860'});bbCine(c,t,{v:0.55});};
// 13 · "So what goes wrong?"
BV.wrong=(c,t,u,d)=>{richBG(c,t,'40,10,14');const t0=BV.wrong.t0,tw=wb('wrong',32.5);const sh=t>tw?Math.sin(t*70)*8*(1-sgB(t,tw,tw+0.5)):0;c.save();c.translate(sh,0);
  brainSide(c,540,1060,1.35+u*0.08,t,{});c.restore();if(t>tw)tint(c,`rgba(255,30,30,${0.25*(1-sgB(t,tw,tw+0.7))})`,'source-over');warnTri(c,540,640,130,popK(t,tw-0.05,0.35));bbCine(c,t,{v:0.6});};
// 14 · "A baby's brain is a construction site." hard hat, cones, a crane lowering a new neuron
BV.site=(c,t,u,d)=>{richBG(c,t,'30,26,20');const t0=BV.site.t0;c.save();const z=1.05+u*0.05;c.translate(540,1100);c.scale(z,z);c.translate(-540,-1100);
  // crane
  c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=8;c.fillStyle='#f2b81a';for(let i=0;i<9;i++){c.strokeRect(880,500+i*120,70,120);seg(c,880,500+i*120,950,620+i*120);}c.fillRect(560,440,460,50);c.strokeRect(560,440,460,50);
  const hy=lerp(500,760,EZ.out(sgB(t,t0+0.2,t0+1.4)));c.strokeStyle='#2a2a30';c.lineWidth=5;seg(c,640,490,640,hy);c.fillStyle='#8a8a90';c.strokeStyle=K2;c.beginPath();c.arc(640,hy+14,16,0,TAU);c.fill();c.stroke();
  // the neuron on the hook
  c.save();c.translate(640,hy+80);c.rotate(Math.sin(t*2)*0.1);c.globalCompositeOperation='lighter';c.strokeStyle='rgba(120,210,255,0.9)';c.lineWidth=6;c.lineCap='round';for(let i=0;i<7;i++){const a=i/7*TAU;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(Math.cos(a+0.3)*40,Math.sin(a+0.3)*40,Math.cos(a)*80,Math.sin(a)*80);c.stroke();}c.fillStyle='rgba(160,230,255,1)';c.beginPath();c.arc(0,0,22,0,TAU);c.fill();c.restore();
  brainSide(c,480,1180,1.15,t,{});
  // hard hat on top
  c.save();c.translate(505,985);c.rotate(-0.06);c.fillStyle='#ffcc1a';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.arc(0,0,130,Math.PI,0);c.closePath();c.fill();c.stroke();rr(c,-170,-14,340,30,14);c.fill();c.stroke();c.fillStyle='#ffe680';c.fillRect(-14,-128,28,118);c.strokeRect(-14,-128,28,118);c.restore();
  // cones + hazard tape
  for(const x of [170,330,610,780]){c.save();c.translate(x,1560);c.fillStyle='#ff7a1a';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.moveTo(-40,0);c.lineTo(-12,-110);c.lineTo(12,-110);c.lineTo(40,0);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.fillRect(-26,-70,52,16);c.fillStyle='#ff7a1a';rr(c,-55,-6,110,20,6);c.fill();c.stroke();c.restore();}
  c.save();c.translate(540,1500);c.rotate(-0.05);c.fillStyle='#ffd21a';c.fillRect(-620,-24,1240,48);c.save();c.beginPath();c.rect(-620,-24,1240,48);c.clip();c.fillStyle='#1a1a1a';for(let i=-20;i<20;i++){c.beginPath();c.moveTo(i*60+t*40,-24);c.lineTo(i*60+30+t*40,-24);c.lineTo(i*60+t*40,24);c.lineTo(i*60-30+t*40,24);c.closePath();c.fill();}c.restore();c.restore();
  // welding sparks
  if(Math.sin(t*13)>0)sparks(c,330,1120,((t*3)%1),12,Math.floor(t*3),'255,220,140');
  c.restore();bbCine(c,t,{v:0.55});};
// 15 · "It builds over a million new connections every second." the network explodes, counter rolls to 1,000,000
BV.million=(c,t,u,d)=>{richBG(c,t,'6,10,30');const t0=BV.million.t0;const P=BV.million.P||(BV.million.P=nodesIn(120,3,540,1000,460,560));
  const gr=EZ.out(sgB(t,t0,t0+2.4));network(c,P,t,gr*1.2,{maxD:240});
  const v=Math.round(EZ.out(sgB(t,wb('million',36.9)-0.4,wb('connections',37.6)+0.3))*1000000);const k=popK(t,t0+0.4,0.3);
  if(k>0){c.save();c.translate(540,1560);c.scale(k,k);c.fillStyle='rgba(8,12,30,0.88)';c.strokeStyle='#6ad8ff';c.lineWidth=5;rr(c,-330,-90,660,180,24);c.fill();c.stroke();txt(c,v.toLocaleString('en-US'),0,-14,104,'#fff',{sw:14});
    // a ticking stopwatch symbol
    c.restore();clockIco(c,820,1440,46,0,Math.floor((t-t0)*60)%60,k);}
  bbCine(c,t,{v:0.5});};
// 16/17/18 · the hippocampus close: new neurons pop in → wire in → scramble the old memory path
function hippoClose(c,t){richBG(c,t,'14,10,30');c.save();c.translate(540,1020);c.scale(5.2,5.2);c.translate(-10,-70);hippo(c,1,t);c.restore();}
const HP=nodesIn(26,9,540,1020,330,300);const HN=nodesIn(9,21,540,1020,300,280);
BV.newn=(c,t,u,d)=>{hippoClose(c,t);network(c,HP,t,2,{col:'255,200,110',maxD:300});const t0=BV.newn.t0,tn=wb('new',41.0);
  HN.forEach((p,i)=>{const k=popK(t,tn-0.4+i*0.09,0.3);if(k<=0)return;c.save();c.translate(p[0],p[1]);c.scale(k,k);glowAt(c,0,0,60,'120,255,170',0.6);c.fillStyle='#8affc0';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(0,0,16,0,TAU);c.fill();c.stroke();c.restore();starBurst(c,p[0]+24,p[1]-24,18,k*(1-sgB(t,tn+i*0.09,tn+0.5+i*0.09)));});
  bbCine(c,t,{v:0.55});};
BV.wire=(c,t,u,d)=>{hippoClose(c,t);network(c,HP,t,2,{col:'255,200,110',maxD:300});const t0=BV.wire.t0;
  HN.forEach((p,i)=>{const q=HP[(i*3)%HP.length],q2=HP[(i*5+2)%HP.length];const k=EZ.out(sgB(t,t0+0.2+i*0.1,t0+1.1+i*0.1));c.save();c.globalCompositeOperation='lighter';c.strokeStyle='rgba(120,255,170,0.9)';c.lineWidth=4;c.lineCap='round';
    for(const qq of [q,q2]){c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(lerp(p[0],qq[0],k),lerp(p[1],qq[1],k));c.stroke();}c.restore();c.fillStyle='#8affc0';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(p[0],p[1],16,0,TAU);c.fill();c.stroke();});
  bbCine(c,t,{v:0.55});};
BV.scramble=(c,t,u,d)=>{hippoClose(c,t);const t0=BV.scramble.t0,ts=wb('scramble',45.0);const mess=EZ.io(sgB(t,ts,ts+1.0));
  // the old memory path (gold) with a memory photo travelling along it; then it knots up
  const N=40,pts=[];for(let i=0;i<=N;i++){const u2=i/N;let x=lerp(150,930,u2),y=1020+Math.sin(u2*6)*60;x+=mess*Math.sin(u2*31+t*3)*90*Math.sin(u2*Math.PI);y+=mess*Math.cos(u2*23+t*2)*160*Math.sin(u2*Math.PI);pts.push([x,y]);}
  c.save();c.globalCompositeOperation='lighter';c.lineCap='round';c.lineJoin='round';c.strokeStyle='rgba(255,200,100,0.5)';c.lineWidth=24;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.strokeStyle='rgba(255,240,190,0.95)';c.lineWidth=7;c.stroke();c.restore();
  // green new neurons cutting across
  HN.forEach((p,i)=>{c.fillStyle='#8affc0';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(p[0],p[1],16,0,TAU);c.fill();c.stroke();});
  const pu=Math.min(0.55,(t-t0)*0.35),idx=Math.floor(pu*N),P=pts[idx];const br=sgB(t,ts+0.3,ts+1.1);
  if(br<1){c.save();c.translate(P[0],P[1]-40);c.rotate(-0.1+br*2);for(let i=0;i<4;i++){const dx=(i%2-0.5)*br*160,dy=(Math.floor(i/2)-0.5)*br*160;c.save();c.globalAlpha=1-br;c.translate(dx,dy);c.rotate(br*(i-1.5));c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-38,-46,38,46);c.strokeRect(-38,-46,38,46);c.fillStyle='#f2b4c4';c.fillRect(-32,-40,32,40);c.restore();c.translate(0,0);}c.restore();}
  bbCine(c,t,{v:0.55});};
// 19 · "Like repaving a road while the cars are still on it."
BV.road=(c,t,u,d)=>{const t0=BV.road.t0;c.save();c.translate(540,1330);c.scale(1.55,1.55);c.translate(-540,-1330);const sky=c.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#8ab8e0');sky.addColorStop(0.55,'#f0d8b8');c.fillStyle=sky;c.fillRect(0,0,W,H);
  c.fillStyle='#7aa860';c.fillRect(0,1000,W,920);c.fillStyle='#6a6a72';c.fillRect(0,1150,W,340);c.fillStyle='#fff';for(let i=0;i<8;i++)c.fillRect(((i*170-t*120)%1360+1360)%1360-140,1310,90,14);
  const ex=lerp(1250,280,EZ.io(sgB(t,t0,t0+2.4)));// the fresh asphalt front moves left
  const cars=[['#e85a5a',0],['#5ab0d8',1],['#f2c84a',2]];
  cars.forEach(([col,i])=>{const x=40+i*230+(t-t0)*90,sink=clamp((x-ex)/120);carMem(c,x,1430,1.0,col,sink);});
  // fresh black asphalt over everything right of the front
  c.save();const ag=c.createLinearGradient(0,1150,0,1490);ag.addColorStop(0,'#1a1a1e');ag.addColorStop(1,'#26262c');c.fillStyle=ag;c.globalAlpha=0.94;c.fillRect(ex,1150,W-ex+100,340);c.globalAlpha=1;c.fillStyle='rgba(255,255,255,0.12)';for(let i=0;i<10;i++)c.fillRect(ex+40+i*90,1180+(i%3)*90,60,6);c.restore();
  steamroller(c,ex-30,1400,1.1,t);
  // steam rising off the hot asphalt
  for(let i=0;i<8;i++){const p=(t*0.6+i/8)%1;c.fillStyle=`rgba(255,255,255,${0.25*(1-p)})`;c.beginPath();c.arc(ex+60+i*110,1150-p*300,20+p*40,0,TAU);c.fill();}
  c.restore();bbCine(c,t,{v:0.4});};
// 20 · "Plus, you had no words yet." the baby opens its mouth: the bubble is empty
BV.nowords=(c,t,u,d)=>{const t0=BV.nowords.t0;camAt(c,'nu_low',[0.35,0.3,-0.45],K3(u,d,1.35,1.5),{oy:-20});const pb=pp([0.35,0,-0.5]);
  baby(c,{x:pb.x,y:pb.y,s:pb.s*0.5,pose:'sit',hs:0.98,face:BF('dot','worried','o'),hf:[18,40],hb:[-18,40],seed:8});c.restore();
  const k=popK(t,t0+0.25,0.3);if(k>0){c.save();c.translate(760,640);c.scale(k,k);c.fillStyle='#fff';c.strokeStyle=K2;c.lineWidth=7;rr(c,-170,-90,340,180,90);c.fill();c.stroke();c.beginPath();c.moveTo(-90,86);c.lineTo(-150,150);c.lineTo(-40,86);c.closePath();c.fill();c.stroke();c.fillRect(-92,76,56,16);
    for(let i=0;i<3;i++){c.fillStyle='#b8b8c4';c.beginPath();c.arc(-60+i*60,0,16+Math.max(0,Math.sin(t*6-i))*4,0,TAU);c.fill();}c.restore();}
  bbCine(c,t,{v:0.45});};
// 21 · "No words, no story to file it under." the memory flies to the filing cabinet: every label is blank; it bounces out
BV.file=(c,t,u,d)=>{richBG(c,t,'20,24,36');const t0=BV.file.t0,tf=wb('file',53.8);cabinet(c,540,1640,1.35,EZ.out(sgB(t,tf-0.3,tf)));
  const fl=sgB(t,t0+0.2,tf);const bo=sgB(t,tf,tf+0.9);let x,y,r;if(bo<=0){x=lerp(140,540,EZ.io(fl));y=lerp(500,1120,EZ.io(fl))-Math.sin(fl*Math.PI)*200;r=fl*0.6;}else{x=540+bo*360;y=1120-Math.sin(bo*Math.PI)*300+bo*bo*500;r=0.6+bo*4;}
  polaroid(c,x,y,200,r,'bday',t,{a:1});redX(c,800,780,70,popK(t,tf+0.2,0.3));bbCine(c,t,{v:0.55});};
// 22 · "Around age seven, most of what's left fades fast."
BV.seven=(c,t,u,d)=>{const t0=BV.seven.t0,tf=wb('fades',57.9);camAt(c,'nu_wide',[0.1,0.75,-0.9],K3(u,d,1.25,1.35),{oy:-40});
  const r=who(c,'kid7',[0.05,0,-0.9],BF('dot','up','smile',{sc:0.78,seed:9,hf:[14,88],hb:[-10,90]}));
  // a gold "7" balloon
  const bp=pp([0.55,0,-1.0]);c.save();c.translate(bp.x+40,bp.y-420+Math.sin(t*2)*8);c.strokeStyle='#f6f0e6';c.lineWidth=3;seg(c,0,120,-10,400);const g=c.createLinearGradient(-80,0,80,0);g.addColorStop(0,'#c8901a');g.addColorStop(0.45,'#fff0a8');g.addColorStop(1,'#b07810');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=8;c.lineJoin='round';
    c.beginPath();c.moveTo(-80,-120);c.lineTo(80,-120);c.lineTo(80,-70);c.lineTo(-10,120);c.lineTo(-62,120);c.lineTo(22,-66);c.lineTo(-80,-66);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.fillRect(-64,-110,50,10);c.restore();
  // memories orbit and fade, fast
  for(let i=0;i<6;i++){const a=0,sd=i%2?1:-1,x=r.hc.x+sd*(250+(i>>1)*60),y=r.hc.y+40+(i>>1)*170+Math.sin(t*2+i)*14;const fade=sgB(t,tf-0.6+i*0.14,tf+0.1+i*0.14);if(fade>=1)continue;c.save();c.globalAlpha=1-fade;c.translate(x,y-fade*80);c.rotate(Math.sin(a)*0.2);c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=4;c.fillRect(-36,-44,72,88);c.strokeRect(-36,-44,72,88);c.fillStyle=['#f2b4c4','#9ccbe8','#f6dcc0','#c8e0a8','#f8d4dc','#d8c8f0'][i];c.fillRect(-30,-38,60,60);c.restore();}
  c.restore();bbCine(c,t,{v:0.45});};
// 23 · "And that first memory you think you have?" grown-up you, looking up at a toddler-on-the-beach memory
BV.think=(c,t,u,d)=>{const t0=BV.think.t0;camAt(c,'nu_wide',[0.0,1.1,-1.2],K3(u,d,1.35,1.45),{oy:-80});
  const r=who(c,'dad',[-0.2,0,-1.3],BF('dot','up','smile',{seed:3,look:[3,-4],hf:[12,90],hb:[-10,92]}));c.restore();
  const k=popK(t,t0+0.25,0.35);if(k>0){c.save();c.translate(700,700);c.scale(k,k);glowAt(c,0,0,320,'255,220,150',0.35);c.restore();
    c.save();c.translate(700,700);c.scale(k,k);c.translate(-700,-700);polaroid(c,700,700,300,0.06,'beach',t,{});c.restore();}
  bbCine(c,t,{v:0.45});};
// 24 · "Almost four in ten people say they remember being two or younger."
BV.four=(c,t,u,d)=>{richBG(c,t,'16,18,40');const t0=BV.four.t0;for(let i=0;i<10;i++){const col=i%5,row=Math.floor(i/5),x=170+col*185,y=920+row*360;const lit=i<4&&t>wb('four',61.4)+i*0.18;const k=popK(t,t0+i*0.05,0.3);if(k<=0)continue;c.save();c.translate(x,y);c.scale(k,k);
    if(lit)glowAt(c,0,-20,140,'255,200,90',0.45);personIcon(c,0,0,90,lit?'#ffc845':'rgba(255,255,255,0.22)');if(lit){c.fillStyle='#fff';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(56,-150,34,0,TAU);c.fill();c.stroke();txt(c,'2',56,-148,40,'#e8342a',{stroke:false});}c.restore();}
  const n=Math.min(4,Math.max(0,Math.floor((t-wb('four',61.4))/0.18)+1));const kk=popK(t,wb('ten',62.2),0.3);if(kk>0){c.save();c.translate(540,1560);c.scale(kk,kk);txt(c,`${n} / 10`,0,0,120,'#ffc845',{sw:16});c.restore();}
  bbCine(c,t,{v:0.5});};
// 25 · "Researchers think most of those memories are made up." the photo splits into puzzle pieces: a family photo, a story, a home video
BV.madeup=(c,t,u,d)=>{richBG(c,t,'26,14,30');const t0=BV.madeup.t0,tm=wb('made',67.4);const sp=EZ.out(sgB(t,t0+0.9,t0+1.6));
  // sources behind
  const src=[[-1,-1,'cam'],[1,-1,'talk'],[-1,1,'tv'],[1,1,'book']];
  src.forEach(([sx,sy,ic],i)=>{const k=sp;if(k<=0)return;const x=540+sx*260*k,y=1000+sy*300*k;c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='rgba(255,255,255,0.1)';c.beginPath();c.arc(0,0,90,0,TAU);c.fill();c.strokeStyle='#fff';c.lineWidth=7;c.lineJoin='round';c.fillStyle='#fff';
    if(ic==='cam'){rr(c,-50,-30,100,66,10);c.stroke();c.beginPath();c.arc(0,4,20,0,TAU);c.stroke();c.fillRect(-20,-44,30,14);}else if(ic==='talk'){rr(c,-50,-36,100,58,26);c.stroke();c.beginPath();c.moveTo(-20,22);c.lineTo(-34,44);c.lineTo(0,22);c.stroke();for(let j=0;j<3;j++){c.beginPath();c.arc(-24+j*24,-8,6,0,TAU);c.fill();}}
    else if(ic==='tv'){rr(c,-56,-36,112,72,8);c.stroke();c.beginPath();c.moveTo(-10,-16);c.lineTo(16,0);c.lineTo(-10,16);c.closePath();c.fill();}else{c.beginPath();c.moveTo(0,-30);c.quadraticCurveTo(-30,-40,-56,-30);c.lineTo(-56,34);c.quadraticCurveTo(-30,24,0,34);c.quadraticCurveTo(30,24,56,34);c.lineTo(56,-30);c.quadraticCurveTo(30,-40,0,-30);c.closePath();c.stroke();seg(c,0,-30,0,34);}
    c.restore();});
  // the photo as four tiles drifting apart
  const m=c.getTransform();const cw=c.canvas.width,ch=c.canvas.height;const Ly=lyr('mu',cw,ch),l=Ly.getContext('2d');l.setTransform(1,0,0,1,0,0);l.clearRect(0,0,cw,ch);l.setTransform(SS,0,0,SS,0,0);polaroid(l,540,1000,420,0.04,'beach',t,{});
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{const dx=sx*sp*120,dy=sy*sp*140,ro=sx*sy*sp*0.15;c.save();c.translate(540+dx,1000+dy);c.rotate(ro);c.translate(-540,-1000);c.beginPath();c.rect(sx<0?300:540,sy<0?720:1000,240,280);c.clip();c.setTransform(1,0,0,1,0,0);c.save();const M=new DOMMatrix([SS,0,0,SS,0,0]).translate(540+dx,1000+dy).rotate(ro*180/Math.PI).translate(-540,-1000);c.setTransform(M);c.setTransform(1,0,0,1,0,0);c.restore();c.restore();});
  // draw tiles properly: each tile = clipped polaroid moved
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{const dx=sx*sp*120,dy=sy*sp*140,ro=sx*sy*sp*0.15;c.save();c.translate(540+dx,1000+dy);c.rotate(ro);c.translate(-540,-1000);c.beginPath();c.rect(sx<0?300:540,sy<0?730:1000,240,270);c.clip();polaroid(c,540,1000,420,0.04,'beach',t,{});c.restore();});
  bigQ(c,540,520,popK(t,tm-0.05,0.35)*0.9,t);bbCine(c,t,{v:0.55});};
// 26 · "But here's the twist." the lab: push in on the mouse arena, light flickers on
BV.twist=(c,t,u,d)=>{const t0=BV.twist.t0;camAt(c,'ml_wide',[0,1.0,-0.6],K3(u,d,1.15,1.6),{oy:0});
  
  const pm=pp([0.05,0.94,-0.55]);mouse(c,{x:pm.x,y:pm.y,s:pm.s*0.16,f:-1,eyes:'dot',fiber:0,seed:0.3,cable:900});
  c.restore();const fl=t<t0+0.4?(Math.sin(t*90)>0.3?0.5:0):0;if(fl)flash(c,fl*0.4,'#000');glowAt(c,560,1000,420,'120,180,255',0.15+0.1*Math.sin(t*5));bbCine(c,t,{v:0.6});};
// 27 · "In mice," close on the mouse in the arena, sniffing
BV.inmice=(c,t,u,d)=>{camAt(c,'ml_arena',[0.02,1.02,-0.55],K3(u,d,2.1,2.3),{oy:20});const pm=pp([lerp(-0.12,0.02,EZ.out(u/d)),0.94,-0.55]);
  mouse(c,{x:pm.x,y:pm.y,s:pm.s*0.16,f:1,eyes:'dot',fiber:0,seed:0.3,look:0.2,walk:u<0.6?1:0,cable:900});c.restore();bbCine(c,t,{v:0.55});};
// 29 · "So yours might not be gone." deep inside your brain: a locked chest, light leaking out of the heart-shaped keyhole
BV.notgone=(c,t,u,d)=>{richBG(c,t,'26,14,40');const t0=BV.notgone.t0;const z=lerp(1,1.35,EZ.io(u/d));c.save();c.translate(540,1150);c.scale(z,z);c.translate(-540,-1150);
  const P=BV.notgone.P||(BV.notgone.P=nodesIn(60,5,540,950,520,700));network(c,P,t,2,{col:'170,120,255',maxD:240,r:4});
  chest(c,540,1250,1.2,t,EZ.out(sgB(t,t0,t0+0.8)));
  for(let i=0;i<24;i++){const p=(t*0.25+hash(i))%1;c.fillStyle=`rgba(255,220,150,${0.6*Math.sin(p*Math.PI)})`;c.beginPath();c.arc(540+(hash(i*3)-0.5)*600,1200-p*700,2+hash(i*5)*4,0,TAU);c.fill();}
  c.restore();bbCine(c,t,{v:0.6});};
// end: the key shot gets a fade to black after the last word
{const _k=BV.key;BV.key=(c,t,u,d)=>{_k(c,t,u,d);const f=sgB(t,wb('key',77.5)+0.75,79.3);if(f>0){c.save();c.setTransform(SS,0,0,SS,0,0);c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);c.restore();}};}
KIND2.kid7=Object.assign(mkK({coat:'#e8743a',trim:'#fff3e6',skin:SK[2],pants:'#34445e'}),{robe:false,long:false,hair4:'swoop',hair:'#3a2418'});
// ---------- the edit ----------
const LN=i=>L[i].a-0.05;
const BSEQ=[['hook',0],['purpose',LN(1)],['give',LN(2)],['bday',LN(4)],['steps',LN(5)],['word',wb('your',12.5)-0.05],['gone',LN(6)],['amnesia',LN(7)],['everyone',LN(8)],['weird',LN(9)],['fine',LN(10)],['toy',LN(11)],['scan',LN(12)],['wrong',LN(13)],
  ['site',LN(14)],['million',LN(15)],['newn',LN(16)],['wire',LN(17)],['scramble',LN(18)],['road',LN(19)],['nowords',LN(20)],['file',LN(21)],['seven',LN(22)],['think',LN(23)],['four',LN(24)],['madeup',LN(25)],['twist',LN(26)],['inmice',LN(27)],['mice',LN(28)],['notgone',LN(29)],['key',LN(30)]];
SHOTS.length=0;BSEQ.forEach(([k,t0])=>{BV[k].t0=t0;SHOTS.push([t0,(c,t,u,d)=>BV[k](c,t,u,d)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
KEY.clear();['DELETED','PURPOSE','60','GONE','AMNESIA','HIPPOCAMPUS','MILLION','SCRAMBLE','SEVEN','MADE','TWIST','KEY'].forEach(w=>KEY.add(w));
Object.assign(KIND2.kid7,{pants:'#4a6a9a',legW:1.5});
