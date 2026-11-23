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
