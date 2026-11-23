'use strict';
// ===================== Great Molasses Flood · shots (StoryBit C) =====================
const XM={};const LT=i=>L[i].a,LB=i=>L[i].b;
const ink=(c,a)=>{c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);};
function bigX(c,x,y,r,a=1,col='#ff3b30'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineWidth=r*0.22;const k=eo(clamp(a));seg(c,x-r*k,y-r*k,x+r*k,y+r*k);seg(c,x+r*k,y-r*k,x-r*k,y+r*k);c.restore();}
function lens(c,t,o={}){cine(c,t,{v:o.v??0.5,bars:0});}
KEY.clear();['SYRUP.','MOLASSES.','RIVETS…','25','35','STUCK.','SANK.','21','150','EXPLODE?','BROWN,','SWEET.'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
const HH=(t,a=6)=>({ox:Math.sin(t*1.7)*a+Math.sin(t*3.1)*a*0.4,oy:Math.cos(t*1.3)*a*0.6});
// ---------- the wave as a real 3D volume: profile slices across the street, drawn far → near ----------
function waveProfileRaw(fx,h,tail){return [[fx-tail,0],[fx-tail,0.9],[fx-tail*0.45,h*0.32],[fx-9,h*0.62],[fx-3.5,h*0.92],[fx-1.2,h],[fx+1.1,h*0.96],[fx+2.0,h*0.82],[fx+1.7,h*0.7],[fx+0.6,h*0.66],[fx+0.1,h*0.45],[fx+0.6,h*0.18],[fx+1.4,0]];}
function waveProfile(fx,h,tail){const P=waveProfileRaw(fx,h,tail);const out=[];for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];const n=i<2?1:5;
  for(let k=0;k<n;k++){const u=k/n,u2=u*u,u3=u2*u;out.push([0,1].map(j=>0.5*((2*p1[j])+(-p0[j]+p2[j])*u+(2*p0[j]-5*p1[j]+4*p2[j]-p3[j])*u2+(-p0[j]+3*p1[j]-3*p2[j]+p3[j])*u3)));}}out.push(P[P.length-1]);return out;}
function wave3(c,t,fx,h,o={}){const za=o.za??-7,zb=o.zb??7,n=o.n??18,tail=o.tail??30;const cam=CP.eye||[0,0,10];
  const Z=[];for(let i=0;i<=n;i++)Z.push(lerp(za,zb,i/n));const grid=Z.map(z=>{const wob=Math.sin(z*0.9+t*3)*0.06+Math.sin(z*2.3-t*4)*0.04;return waveProfile(fx+Math.sin(z*0.7+t*2)*0.4,h*(1+wob),tail).map(([x,y])=>[x,y,z]);});
  const Q=[];const K=grid[0].length;for(let i=0;i<n;i++)for(let k=0;k<K-1;k++){const a=grid[i][k],b=grid[i][k+1],cc=grid[i+1][k+1],dd=grid[i+1][k];const m=[(a[0]+b[0]+cc[0]+dd[0])/4,(a[1]+b[1]+cc[1]+dd[1])/4,(a[2]+b[2]+cc[2]+dd[2])/4];
    const dist=Math.hypot(m[0]-cam[0],m[1]-cam[1],m[2]-cam[2]);const dx=b[0]-a[0],dy=b[1]-a[1];const L=Math.hypot(dx,dy)||1;const ny=dx/L;// up-facing → lit
    Q.push({pts:[a,b,cc,dd],dist,lit:ny,k,ht:m[1]/h});}
  for(const a of (o.actors||[])){Q.push({actor:a,dist:Math.hypot(a.pos[0]-cam[0],a.pos[1]+1-cam[1],a.pos[2]-cam[2])-(a.bias||0)});}
  Q.sort((p,q)=>q.dist-p.dist);c.save();c.lineJoin='round';
  for(const q of Q){if(q.actor){c.restore();q.actor.draw();c.save();c.lineJoin='round';continue;}const P=q.pts.map(p=>pp(p));if(P.some(p=>p.w<=0.2))continue;const l=clamp(0.35+q.lit*0.45+q.ht*0.35);const r=Math.round(lerp(30,128,l*l)),g=Math.round(lerp(12,58,l*l)),bb=Math.round(lerp(4,20,l*l));
    c.fillStyle=`rgb(${r},${g},${bb})`;c.strokeStyle=c.fillStyle;c.lineWidth=1.5;c.beginPath();P.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();c.fill();c.stroke();
    if(q.ht>0.85&&q.lit>0.2){c.fillStyle='rgba(255,210,150,0.22)';c.fill();}}
  // dark outline along the crest + glossy streaks on the face
  c.strokeStyle='#120602';c.lineWidth=5;c.beginPath();grid.forEach((row,i)=>{const p=pp(row[Math.floor(row.length*0.6)]);i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y);});c.stroke();
  c.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const z=lerp(za,zb,hash(i*1.7));const a=pp([fx+0.3,h*(0.3+hash(i*2.9)*0.5),z]);if(a.w<=0.2)continue;const len=(80+hash(i*3)*160)*a.s;
    c.strokeStyle='rgba(255,160,80,0.14)';c.lineWidth=(8+hash(i)*12)*a.s;c.lineCap='round';c.beginPath();c.moveTo(a.x,a.y);c.lineTo(a.x+(hash(i*7)-0.5)*30*a.s,a.y+len+((t*140)%50)*a.s);c.stroke();}
  c.restore();
  // spray blobs flung from the lip
  for(let i=0;i<(o.blobs??50);i++){const z=lerp(za,zb,hash(i*4.1)),ph=(t*1.4+hash(i*2.3))%1;const b=pp([fx+1.8+ph*4,h*(0.95+ph*0.4)-ph*ph*h*1.3,z]);if(b.w<=0.2)continue;const r=(10+hash(i)*24)*b.s*(1-ph*0.5);
    c.fillStyle='#4a220c';c.strokeStyle='#120602';c.lineWidth=2.5;c.beginPath();c.ellipse(b.x,b.y,r,r*1.2,0,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(255,190,120,0.55)';c.beginPath();c.ellipse(b.x-r*0.3,b.y-r*0.35,r*0.28,r*0.18,-0.5,0,TAU);c.fill();}
  if(o.debris)for(let i=0;i<o.debris;i++){const z=lerp(za,zb,hash(i*6.1)),ph=(t*0.7+hash(i))%1;const b=pp([fx-ph*6,h*(0.4+0.55*Math.sin(ph*Math.PI)),z]);if(b.w<=0.2)continue;c.save();c.translate(b.x,b.y);c.rotate(t*2.5+i);c.fillStyle=['#8a6a44','#6a6a70','#7a4a2a','#a8986a'][i%4];c.strokeStyle='#120602';c.lineWidth=3;
    if(i%3===0){c.beginPath();c.arc(0,0,30*b.s,0,TAU);c.fill();c.stroke();c.beginPath();for(let k=0;k<6;k++){c.moveTo(0,0);c.lineTo(Math.cos(k)*30*b.s,Math.sin(k)*30*b.s);}c.stroke();}else{c.fillRect(-46*b.s,-9*b.s,92*b.s,18*b.s);c.strokeRect(-46*b.s,-9*b.s,92*b.s,18*b.s);}c.restore();}}
// someone caught in the wave: tumbling, carried along, half covered in molasses
function swept(c,kind,x,y,z,t,o={}){const rot=o.rot??t*3.2;const r=who(c,kind,[x,y,z],BF('shock','up','scream',{seed:o.seed||1,rot,hf:[50+Math.sin(t*9)*20,-80],hb:[-50,-70+Math.cos(t*8)*20],run:1,ph:t*16,f:o.f||1}));
  const p=pp([x,y,z]);c.save();for(let k=0;k<6;k++){const a=k*1.1+t*2;c.fillStyle=k%2?'#4a220c':'#3a1a08';c.beginPath();c.ellipse(p.x+Math.cos(a)*60*p.s,p.y-40*p.s+Math.sin(a)*30*p.s,(40+k*6)*p.s,(26+k*3)*p.s,a,0,TAU);c.fill();}c.restore();return r;}
// someone the wave catches from behind: runs → lifted, pitched forward, arms thrown up, splash climbing them → swallowed (front face covers them in the depth sort)
function victimActor(c,kind,x,z,fx,t,o={}){const dx=fx-x;const k=clamp((dx+3.2)/3.2);const lift=k*k*1.3,pitch=k*0.9;
  return {pos:[x,0,z],bias:0.3,draw:()=>{const r=who(c,kind,[x+k*1.2,lift,z],F(k>0?'shock':'wide','up','scream',{seed:o.seed||1,run:1,ph:t*(15-k*8),f:o.f??-1,rot:(o.f??-1)*-pitch*0.6+Math.sin(t*9)*0.08*k,
      hf:undefined,hb:undefined}));
    if(k>0){const g=pp([x,0,z]);for(let i=0;i<14;i++){const ph=(t*2+hash(i*3.1))%1;const bx=g.x+(hash(i)-0.5)*180*g.s,by=g.y-(ph*lift*170+ph*60)*g.s*1.0-k*40*g.s;c.fillStyle=i%2?'#4a220c':'#3a1a08';c.strokeStyle='#120602';c.lineWidth=2;
        c.beginPath();c.ellipse(bx,by,(10+hash(i*5)*18)*g.s*(0.5+k),(9+hash(i*7)*14)*g.s*(0.5+k),0,0,TAU);c.fill();c.stroke();}
      const sp=pp([x,lift*0.6,z]);c.fillStyle='#3a1a08';c.beginPath();c.ellipse(sp.x,sp.y+40*sp.s,(90+k*70)*sp.s,(30+k*50)*sp.s,0,0,TAU);c.fill();}}};}
// after being swallowed: the head and a reaching hand break the surface on top of the crest, then go under again
function crestRider(c,kind,fx,h,z,t,o={}){const cr=pp([fx-1.4,h*0.98,z]);if(cr.w<=0.2)return;const bob=Math.sin(t*5+(o.seed||0))*0.25;const r0=pp([fx-1.4,h*0.98-1.2+bob,z]);
  c.save();c.beginPath();c.rect(-3000,-3000,8000,cr.y+3000+6*cr.s);c.clip();const r=who(c,kind,[fx-1.4,h*0.98-1.35+bob,z],F('shock','up','scream',{seed:o.seed||1,rot:Math.sin(t*3)*0.5+(o.rot||0),hf:[60,-160+Math.sin(t*9)*20],hb:[-50,-120]}));c.restore();
  c.save();c.fillStyle='#4a220c';c.strokeStyle='#120602';c.lineWidth=2;for(let i=0;i<5;i++){const a=i*1.3+t*3;c.beginPath();c.ellipse(cr.x+Math.cos(a)*50*cr.s,cr.y+Math.sin(a)*10*cr.s,22*cr.s,12*cr.s,0,0,TAU);c.fill();c.stroke();}c.restore();return r;}
// carried in the flood after the wave: body under the surface, tilted, drifting with the current; dunks under and claws back up; molasses coats head and arms
function carried(c,kind,pos,surf,t,o={}){const sd=o.seed||1;const dunk=Math.max(0,Math.sin(t*1.6+sd*2))**6;const dd=lerp(o.d??0.85,1.3,dunk);const g=pp([pos[0],surf,pos[2]]);
  c.save();c.beginPath();c.rect(-3000,-3000,8000,g.y+3000+2*g.s);c.clip();const r=who(c,kind,[pos[0],surf-dd,pos[2]],F(dunk>0.5?'squeeze':'shock','up','scream',{seed:sd,rot:(o.tilt??0.35)+Math.sin(t*2.2+sd)*0.18,f:o.f||1,
    hf:[50+Math.sin(t*7+sd)*25,-175+Math.cos(t*6)*15],hb:[-60+Math.cos(t*8+sd)*20,-80+Math.sin(t*5)*25]}));c.restore();
  if(r){c.fillStyle='rgba(58,26,8,0.85)';for(const hp of [r.hf,r.hb]){if(hp.y>g.y)continue;c.beginPath();c.ellipse(hp.x,hp.y+8*g.s,11*g.s,16*g.s,0,0,TAU);c.fill();}
    if(r.hc&&r.hc.y<g.y){c.beginPath();c.ellipse(r.hc.x,r.hc.y-14*g.s,24*g.s,12*g.s,0,0,TAU);c.fill();for(let i=0;i<3;i++){const dl=((t*0.8+i*0.33)%1);c.beginPath();c.ellipse(r.hc.x-14*g.s+i*14*g.s,r.hc.y-6*g.s+dl*30*g.s,3*g.s,6*g.s,0,0,TAU);c.fill();}}}
  c.save();const w=60*g.s;c.fillStyle='#2e1406';c.beginPath();c.ellipse(g.x,g.y+2*g.s,w*1.4,w*0.34,0,0,TAU);c.fill();c.strokeStyle='rgba(255,170,90,0.35)';c.lineWidth=3;c.beginPath();c.ellipse(g.x,g.y,w*1.4,w*0.34,0,Math.PI*1.1,Math.PI*1.9);c.stroke();
  for(let i=0;i<4;i++){const ph=(t*1.2+i/4)%1;c.strokeStyle=`rgba(255,170,90,${0.3*(1-ph)})`;c.lineWidth=3;const tx=pp([pos[0]-0.4-ph*2.4,surf,pos[2]]);c.beginPath();c.moveTo(tx.x,tx.y-6*g.s);c.lineTo(tx.x-40*g.s,tx.y);c.stroke();}
  if(dunk>0.45){c.save();c.translate(g.x+10*g.s,g.y);c.rotate(Math.sin(t*6)*0.2);c.strokeStyle='#0b0b0d';c.lineWidth=16*g.s;c.lineCap='round';seg(c,0,0,0,-90*g.s*dunk);c.strokeStyle='#3a1a08';c.lineWidth=11*g.s;seg(c,0,0,0,-90*g.s*dunk);c.fillStyle='#f2efe8';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.beginPath();c.arc(0,-96*g.s*dunk,11*g.s,0,TAU);c.fill();c.stroke();c.fillStyle='rgba(58,26,8,0.8)';c.beginPath();c.arc(0,-92*g.s*dunk,8*g.s,0,Math.PI);c.fill();c.restore();}
  if(dunk>0.3){for(let i=0;i<6;i++){const a=i/6*TAU+t*4;c.fillStyle='#4a220c';c.beginPath();c.arc(g.x+Math.cos(a)*w,g.y-Math.abs(Math.sin(a))*30*g.s*dunk,8*g.s,0,TAU);c.fill();}}c.restore();return r;}
// ---------- props / ui ----------
function tagC(c,x,y,s,k=1,col='#ffd23f'){if(k<=0)return;c.save();c.globalAlpha=clamp(k*2);c.translate(x,y);c.scale(lerp(0.7,1,eo(clamp(k))),lerp(0.7,1,eo(clamp(k))));c.font='900 40px "Inter Display"';c.letterSpacing='5px';const w=c.measureText(s).width+60;
  c.fillStyle='rgba(12,10,8,0.86)';c.beginPath();c.roundRect(-w/2,-38,w,76,38);c.fill();c.strokeStyle=col;c.lineWidth=4;c.stroke();c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,3);c.restore();}
function bigCard(c,x,y,k,top,bottom,col='#ffd23f'){if(k<=0)return;c.save();c.translate(x,y);const sc=back(clamp(k));c.scale(sc,sc);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-330,-120,660,240,30);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,top,0,-22,110,'#fff',{sw:12});c.font='800 32px "Inter Display"';c.letterSpacing='7px';c.fillStyle=col;c.textAlign='center';c.fillText(bottom,0,78);c.restore();}
function lunchPail(c,h,s){c.save();c.translate(h.x,h.y);c.strokeStyle='#2a2a2e';c.lineWidth=3*s;c.beginPath();c.arc(0,-2*s,12*s,Math.PI,TAU);c.stroke();c.fillStyle='#8a8e96';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.fillRect(-16*s,6*s,32*s,24*s);c.strokeRect(-16*s,6*s,32*s,24*s);c.restore();}
function sandwich(c,h,s){c.save();c.translate(h.x,h.y-6*s);c.fillStyle='#e8c88a';c.strokeStyle='#0b0b0d';c.lineWidth=2.5*s;c.beginPath();c.roundRect(-14*s,-8*s,28*s,16*s,5*s);c.fill();c.stroke();c.fillStyle='#7aa84a';c.fillRect(-14*s,-1*s,28*s,3*s);c.restore();}
function ball(c,x,y,s){c.save();c.fillStyle='#c84a2a';c.strokeStyle='#0b0b0d';c.lineWidth=3*s;c.beginPath();c.arc(x,y,14*s,0,TAU);c.fill();c.stroke();c.strokeStyle='#f4e8d0';c.lineWidth=2*s;c.beginPath();c.arc(x,y,14*s,0.5,2.5);c.stroke();c.restore();}
function rivetFly(c,x,y,s,t0,t,ang,sd){const p=t-t0;if(p<0||p>1.2)return;const d=p*900*s,dx=Math.cos(ang)*d,dy=Math.sin(ang)*d+p*p*200*s;c.save();c.strokeStyle='rgba(255,220,150,0.7)';c.lineWidth=4*s;c.lineCap='round';seg(c,x+dx*0.6,y+dy*0.6,x+dx,y+dy);
  c.translate(x+dx,y+dy);c.rotate(p*20+sd);c.fillStyle='#3a3230';c.strokeStyle='#0b0b0d';c.lineWidth=2*s;c.beginPath();c.ellipse(0,0,9*s,6*s,0,0,TAU);c.fill();c.stroke();c.fillRect(-3*s,0,6*s,14*s);c.restore();
  if(p<0.12){c.save();c.globalCompositeOperation='lighter';c.fillStyle=`rgba(255,220,150,${1-p/0.12})`;c.beginPath();c.arc(x,y,40*s,0,TAU);c.fill();c.restore();}}
function soundFx(c,x,y,word,k,rot=-0.1,col='#ffd23f'){if(k<=0||k>=1)return;c.save();c.translate(x,y);c.rotate(rot);const sc=lerp(0.6,1.15,eo(clamp(k*3)));c.scale(sc,sc);c.globalAlpha=1-clamp((k-0.7)/0.3);txt(c,word,0,0,70,col,{sw:12});c.restore();}
function coldBreath(c,x,y,s,t,sd){for(let i=0;i<3;i++){const p=((t*0.8+i/3+sd)%1);c.fillStyle=`rgba(240,246,255,${0.5*(1-p)})`;c.beginPath();c.arc(x+p*40*s,y-p*30*s,(8+p*24)*s,0,TAU);c.fill();}}
function horseStuck(c,pos,surf,t){const p=pp([pos[0],surf,pos[2]]);c.save();c.beginPath();c.rect(-3000,-3000,8000,p.y+3000);c.clip();const tilt=Math.sin(t*3)*0.12;c.translate(p.x,p.y-40*p.s+Math.sin(t*3)*10*p.s);c.rotate(tilt);horse(c,0,0,p.s*1.3,t*0.25);c.restore();
  c.save();c.fillStyle=ML;c.strokeStyle='#120602';c.lineWidth=3;c.beginPath();c.ellipse(p.x,p.y+4*p.s,250*p.s,36*p.s,0,0,TAU);c.fill();c.beginPath();c.ellipse(p.x,p.y+4*p.s,250*p.s,36*p.s,0,Math.PI*1.05,Math.PI*1.95);c.stroke();
  for(let i=0;i<3;i++){const ph=(t*0.6+i/3)%1;c.strokeStyle=`rgba(90,46,18,${0.6*(1-ph)})`;c.beginPath();c.ellipse(p.x,p.y+4*p.s,250*p.s*(1+ph*0.4),36*p.s*(1+ph*0.4),0,0,TAU);c.stroke();}c.restore();return p;}
function tankCut(c,id,fill,t){// x-ray cut-out in the tank wall showing the molasses inside (tank centre (-30,0,-10), r 13.5, h 15)
  const A=pp([-30+13.5*Math.cos(0.75),1,-10+13.5*Math.sin(0.75)]),B=pp([-30+13.5*Math.cos(1.25),1,-10+13.5*Math.sin(1.25)]),Ct=pp([-30+13.5*Math.cos(1.0),14,-10+13.5*Math.sin(1.0)]);
  const x0=Math.min(A.x,B.x),x1=Math.max(A.x,B.x),yT=Ct.y,yB=Math.max(A.y,B.y);c.save();c.beginPath();c.roundRect(x0,yT,x1-x0,yB-yT,20);c.fillStyle='#120c0a';c.fill();c.clip();
  const ly=lerp(yB,yT+40,fill);c.fillStyle='#3a1a08';c.beginPath();c.moveTo(x0,yB);for(let x=x0;x<=x1;x+=10)c.lineTo(x,ly+Math.sin(x*0.03+t*3)*8);c.lineTo(x1,yB);c.closePath();c.fill();
  c.fillStyle='rgba(255,170,90,0.25)';c.fillRect(x0,ly-4,x1-x0,10);c.restore();c.save();c.strokeStyle='#ffd23f';c.lineWidth=6;c.setLineDash([18,12]);c.beginPath();c.roundRect(x0,yT,x1-x0,yB-yT,20);c.stroke();c.restore();return {x0,x1,yT,yB};}
const F=(e,b,m,o)=>BF(e,b,m,o);
// =============== shots ===============
// 0 · "A 25-foot wave just swallowed a city street…" people turn, run at camera; the wave rolls under the El and scoops up a man
XM.hook=(c,t,u,d)=>{const h=HH(t,10);camAt(c,'ne_street',[0,3,-1],1.05+u*0.02,{ox:h.ox,oy:-50+h.oy});const fx=-14+u*6.5;molassesSheet(c,t,-60,fx-1,-7,7,0.9,{edge:false});
  const A=[victimActor(c,'dock2',-2.5+u*1.1,-0.6,fx,t,{seed:3}),victimActor(c,'boy',3.2+u*1.4,0.9,fx,t,{seed:1}),victimActor(c,'dock',6.8+u*1.3,-1.8,fx,t,{seed:2}),victimActor(c,'girl',10+u*1.2,1.9,fx,t,{seed:4})];
  wave3(c,t,fx,7.6,{debris:6,actors:A});if(fx>-1)crestRider(c,'dock2',fx,7.6,-0.6,t,{seed:3});
  c.restore();if(u<0.12)flash(c,1-u/0.12,'#000');lens(c,t,{v:0.6});};
// 1 · "and it was made of syrup." a fat drip splats on a man's cap; he wipes it, sniffs his fingers
XM.syrup=(c,t,u,d)=>{camAt(c,'ne_low',[2,1.6,0],1.55,{oy:-80});const P=[2,0,0];const fall=clamp(u/0.45);const r=who(c,'dock',P,F(fall<1?'dot':'wide','up',fall<1?'flat':'o',{seed:5,hf:u>0.6?[16,-150]:[14,90],hb:[-12,92],look:[0,-3]}));
  const hp=pp([2,1.95,0]);if(fall<1){c.fillStyle='#4a220c';c.strokeStyle='#120602';c.lineWidth=3;c.beginPath();c.ellipse(hp.x,lerp(hp.y-700,hp.y,fall*fall),14,22,0,0,TAU);c.fill();c.stroke();}
  else{c.fillStyle='#3a1a08';c.beginPath();c.ellipse(hp.x,hp.y-10,60,16,0,0,TAU);c.fill();for(let i=0;i<4;i++){const dl=((t*0.9+i*0.25)%1)*80;c.beginPath();c.ellipse(hp.x-40+i*26,hp.y+dl,6,10,0,0,TAU);c.fill();}}c.restore();
  if(u>1.0)tagC(c,540,560,'MOLASSES',clamp((u-1.0)/0.3));lens(c,t);};
// 2 · "Boston." establishing, quiet street, the El, name card
XM.boston=(c,t,u,d)=>{camAt(c,'ne_wide',[-6,5,-4],1.05+u*0.03,{oy:0});cast(c,[['dock',[9-u*0.6,0,3.6],F('dot','flat','smile',{seed:6,walk:1,ph:t*7,f:-1})],['girl',[5+u*0.5,0,0.5],F('dot','flat','smile',{seed:7,walk:1,ph:t*7,f:1})],['boy',[7,0,-2],F('happy','up','smile',{seed:3,run:1,ph:t*12,f:-1})]]);c.restore();bigCard(c,540,470,clamp(u/0.3),'BOSTON','NORTH END');lens(c,t);};
// 3 · "January 15th, 1919." a newsboy waves the paper; date card flips
XM.date=(c,t,u,d)=>{camAt(c,'ne_street',[8,1.5,-1],1.6,{oy:-60});const r=who(c,'boy',[8,0,-1],F('happy','up','scream',{seed:8,hf:[40,-150+Math.sin(t*8)*15],hb:[-28,40],f:-1}));
  c.save();c.translate(r.hf.x,r.hf.y);c.rotate(-0.2+Math.sin(t*8)*0.08);c.fillStyle='#ece4cc';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.fillRect(-10,-90,120,80);c.strokeRect(-10,-90,120,80);c.fillStyle='#111';c.font='900 18px serif';c.fillText('BOSTON POST',-2,-66);c.fillRect(0,-58,100,3);for(let i=0;i<5;i++)c.fillRect(0,-48+i*8,i%2?60:100,3);c.restore();
  c.save();c.translate(r.hb.x,r.hb.y);c.fillStyle='#ece4cc';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.fillRect(-60,-12,70,26);c.strokeRect(-60,-12,70,26);c.restore();
  c.restore();const k=clamp((t-LT(3))/0.3);c.save();c.translate(540,470);c.scale(back(k),back(k));c.fillStyle='#f4ecd8';c.strokeStyle='#0b0b0d';c.lineWidth=6;c.fillRect(-190,-150,380,300);c.strokeRect(-190,-150,380,300);c.fillStyle='#b8201e';c.fillRect(-190,-150,380,80);
  txt(c,'JAN',0,-110,56,'#fff',{stroke:false,ls:6});txt(c,'15',0,10,140,'#1a1a1a',{stroke:false});txt(c,t>LT(4)?'1919':'',0,110,46,'#5a4a3a',{stroke:false,ls:8});c.restore();lens(c,t);};
// 4 · "It was a strangely warm winter day" coats off, a man fans himself with his cap; thermometer climbs
XM.warm=(c,t,u,d)=>{camAt(c,'ne_wide',[0,1.5,-2],1.25,{oy:-40});cast(c,[['dock',[2,0,-1],F('half','up','smile',{seed:9,hf:[30,-140+Math.sin(t*10)*12],hb:[-12,92]})],['dock2',[-1.6,0,0.6],F('happy','up','smile',{seed:10,hf:[-8,-40],hb:[-40,20],f:-1})],['girl',[4.5,0,-3],F('happy','up','smile',{seed:11,walk:1,ph:t*6,f:-1})]]);c.restore();
  const k=clamp(u/0.4),v=Math.round(lerp(20,46,eo(clamp(u/1.6))));c.save();c.translate(860,520);c.scale(k,k);c.fillStyle='rgba(12,10,8,0.85)';c.beginPath();c.roundRect(-110,-200,220,400,40);c.fill();c.strokeStyle='#ffd23f';c.lineWidth=5;c.stroke();
  c.fillStyle='#f4f0e8';c.fillRect(-14,-150,28,240);c.fillStyle='#d8302a';c.fillRect(-10,90-240*(v-10)/50,20,240*(v-10)/50);c.beginPath();c.arc(0,110,30,0,TAU);c.fill();txt(c,v+'°F',0,-176,40,'#fff',{sw:6});c.restore();lens(c,t);};
// 5 · "Kids were playing, workers were eating lunch…" kids toss a ball, workers eat at the foot of the tank
XM.kids=(c,t,u,d)=>{camAt(c,'ne_tank',[-10.5,1.4,8.6],1.35+u*0.03,{oy:80});const bp=(t*1.4)%2,bt=bp<1?bp:2-bp;
  const A=[-8.8,0,9.4],B=[-6.2,0,10.4];const r=cast(c,[['boy',A,F('happy','up','smile',{seed:3,hf:[40,-90],hb:[-10,90],f:1})],['girl',B,F('happy','up','smile',{seed:4,hf:[-40,-90],hb:[10,90],f:-1})],
    ['dock',[-12.5,0,7.5],F('happy','flat','smile',{seed:5,hf:[22,-10],hb:[-26,40],look:[1,0]})],['dock2',[-14,0,8.2],F('dot','up','smile',{seed:6,f:1,hf:[34,-30],hb:[-10,90],look:[1,0]})]]);
  if(r[0]&&r[1]){const x=lerp(r[0].hf.x,r[1].hf.x,bt),y=lerp(r[0].hf.y,r[1].hf.y,bt)-Math.sin(bt*Math.PI)*160;ball(c,x,y,1.1);}
  if(r[2]){sandwich(c,r[2].hf,r[2].s);lunchPail(c,r[2].hb,r[2].s);}if(r[3])sandwich(c,r[3].hf,r[3].s);c.restore();lens(c,t);};
// 6 · "right next to a giant steel tank." tilt up the tank; height tag
XM.tank=(c,t,u,d)=>{const q=eio(clamp(u/(d-0.2)));camAt(c,'ne_tank',[-24,lerp(2,12,q),-2],1.25,{oy:0});cast(c,[['boy',[-13,0,9],F('wide','up','o',{seed:3,look:[-1,-4],back:1})],['girl',[-11.5,0,9.6],F('wide','up','o',{seed:4,back:1})]]);c.restore();tagC(c,540,560,'50 FEET TALL',clamp((u-0.6)/0.3));lens(c,t);};
// 7 · "Inside it?" the tank wall goes see-through
XM.inside=(c,t,u,d)=>{camAt(c,'ne_tank',[-24,8,-2],1.0,{oy:0});c.save();c.globalAlpha=clamp(u/0.3);tankCut(c,'ne_tank',0.88,t);c.restore();c.restore();if(u>0.1){c.save();c.translate(540,500);const k=back(clamp((u-0.1)/0.3));c.scale(k*0.7,k*0.7);bigQ(c,0,0,1,t);c.restore();}lens(c,t);};
// 8 · "Over two million gallons of molasses." it fills; counter
XM.gallons=(c,t,u,d)=>{camAt(c,'ne_tank',[-24,8,-2],1.0+u*0.02,{oy:0});tankCut(c,'ne_tank',lerp(0.2,0.9,eo(clamp(u/2))),t);c.restore();
  bigCard(c,540,470,clamp(u/0.3),(Math.round(eo(clamp(u/1.6))*2.3*10)/10).toFixed(1)+' MILLION','GALLONS OF MOLASSES');lens(c,t);};
// 9 · "Then, just after noon, people heard a sound like machine-gun fire." clock at 12:40; everyone freezes and turns toward the tank
XM.noon=(c,t,u,d)=>{const tp=LT(10)+1.8;camAt(c,'ne_tank',[-11.5,1.3,8.2],1.35,{oy:80});const turned=t>tp;
  cast(c,[['dock',[-12.5,0,7.5],F(turned?'wide':'happy','up',turned?'o':'smile',{seed:5,back:turned,hf:[22,-10],hb:[-26,40]})],['dock2',[-14,0,8.2],F(turned?'shock':'dot','up',turned?'o':'smile',{seed:6,back:turned,hf:[34,-30],hb:[-10,90]})],['boy',[-8.8,0,9.4],F(turned?'wide':'happy','worried',turned?'o':'smile',{seed:3,back:turned})]]);c.restore();
  const k=clamp(u/0.3);c.save();c.translate(830,500);c.scale(k,k);c.fillStyle='#f4ecd8';c.strokeStyle='#0b0b0d';c.lineWidth=8;c.beginPath();c.arc(0,0,110,0,TAU);c.fill();c.stroke();for(let i=0;i<12;i++){const a=i/12*TAU;seg(c,Math.cos(a)*86,Math.sin(a)*86,Math.cos(a)*100,Math.sin(a)*100);}
  c.lineWidth=10;seg(c,0,0,0,-62);c.lineWidth=6;const m=lerp(0,40,clamp(u/2))/60*TAU;seg(c,0,0,Math.sin(m)*84,-Math.cos(m)*84);c.restore();
  for(let i=0;i<4;i++)soundFx(c,240+i*170,380+(i%2)*80,['RAT','TAT','TAT','TAT'][i],(t-tp-i*0.18)/0.9,(i%2?0.1:-0.12));lens(c,t);};
// 10 · "That was the tank's rivets…" close on the seam: rivets strain, then pop
XM.rivets=(c,t,u,d)=>{const h=HH(t,4);camAt(c,'ne_tankC',[-18,3,0],1.3,{ox:h.ox,oy:h.oy});c.restore();const s=1.4;
  for(let i=0;i<8;i++){const x=200+i*96,y=900+Math.sin(i)*6;const t0=LT(11)+0.4+i*0.14;c.save();c.fillStyle='#2a2220';c.strokeStyle='#0b0b0d';c.lineWidth=3;if(t<t0){const sh=Math.sin(t*60+i)*2*clamp((t-LT(11))/0.4);c.beginPath();c.ellipse(x+sh,y,13*s,9*s,0,0,TAU);c.fill();c.stroke();}else{c.fillStyle='#120c0a';c.beginPath();c.ellipse(x,y,9*s,6*s,0,0,TAU);c.fill();c.fillStyle='#3a1a08';c.beginPath();c.ellipse(x,y+10,6,14+((t-t0)*30),0,0,TAU);c.fill();}c.restore();rivetFly(c,x,y,s,t0,t,-0.4-hash(i)*1.6,i);}
  tagC(c,540,560,'RIVETS',clamp((u-0.2)/0.3));lens(c,t,{v:0.6});};
// 11 · "shooting off, one by one." rivets zip past; a worker ducks, one pings off the El
XM.oneby=(c,t,u,d)=>{camAt(c,'ne_tank',[-12,2.5,7],1.4,{oy:20});const r=who(c,'dock',[-12.5,0,7.5],F('squeeze','worried','scream',{seed:5,crouch:40+Math.sin(t*6)*5,hf:[20,-170],hb:[-20,-170],f:1}));
  who(c,'boy',[-9.5,0,9.8],F('shock','up','scream',{seed:3,run:1,ph:t*15,f:1}));const T0=pp([-20,6,0]);c.restore();for(let i=0;i<7;i++){const t0=LT(12)+i*0.25;rivetFly(c,200+hash(i)*300,400+hash(i*3)*400,1.3,t0,t,-0.1+hash(i*5)*0.5,i);soundFx(c,600+hash(i*7)*300,420+hash(i*9)*300,'PING',(t-t0-0.3)/0.6,0.1,'#fff');}lens(c,t);};
// 12 · "The tank split wide open." the seam rips, molasses erupts
XM.split=(c,t,u,d)=>{const h=HH(t,14);camAt(c,'ne_tank',[-24,7,-2],1.0,{ox:h.ox,oy:h.oy});const k=eo(clamp(u/0.8));const A=pp([-30+13.5*Math.cos(1.0),0,-10+13.5*Math.sin(1.0)]),B=pp([-30+13.5*Math.cos(1.0),15,-10+13.5*Math.sin(1.0)]);
  c.save();c.fillStyle='#120602';c.beginPath();for(let i=0;i<=12;i++){const q=i/12,y=lerp(A.y,B.y,q*k);c.lineTo(A.x-(8+q*30)*k+Math.sin(i*2)*6,y);}for(let i=12;i>=0;i--){const q=i/12,y=lerp(A.y,B.y,q*k);c.lineTo(A.x+(8+q*30)*k+Math.sin(i*3)*6,y);}c.closePath();c.fill();c.restore();
  for(let i=0;i<40;i++){const ph=(t*1.2+hash(i))%1,y=lerp(A.y,B.y,hash(i*3)*k);const x=A.x+(hash(i*5)-0.3)*30;c.fillStyle='#4a220c';c.strokeStyle='#120602';c.lineWidth=2;const bx=x+ph*400*(hash(i*7)+0.3),by=y+ph*ph*600-ph*120;c.beginPath();c.ellipse(bx,by,(16+hash(i)*26)*(0.4+ph),(14+hash(i)*20)*(0.4+ph),0,0,TAU);c.fill();c.stroke();}
  c.restore();flash(c,clamp(1-u/0.2)*0.6);lens(c,t,{v:0.65});};
// 13 · "And a brown wave, 25 feet tall, rushed out at 35 miles per hour." side view: the wave crosses the street, a man for scale; height + speed
XM.wave=(c,t,u,d)=>{const h=HH(t,9);camAt(c,'ne_street',[0,3,-1],1.04,{ox:h.ox,oy:60+h.oy});const fx=-22+u*5.2;molassesSheet(c,t,-60,fx-1,-7,7,0.9,{edge:false});
  const run=clamp((u-1.4)/0.3),rx=run*(u-1.4)*1.5;const A=[victimActor(c,'dock2',3+rx,0.4,fx,t,{seed:6}),victimActor(c,'girl',5.5+rx,-2.2,fx,t,{seed:9})];
  if(run<=0){A[0]={pos:[3,0,0.4],draw:()=>who(c,'dock2',[3,0,0.4],F('wide','up','o',{seed:6,back:1,hf:[30,-60],hb:[-30,-60]}))};A[1]={pos:[5.5,0,-2.2],draw:()=>who(c,'girl',[5.5,0,-2.2],F('wide','up','o',{seed:9,back:1}))};}
  wave3(c,t,fx,7.6,{debris:5,actors:A});if(fx>3.5)crestRider(c,'dock2',fx,7.6,0.4,t,{seed:6});
  const top=pp([fx-1.2,7.6,3]),bot=pp([fx-1.2,0,3]);c.save();c.strokeStyle='#ffd23f';c.lineWidth=6;seg(c,top.x+40,top.y,top.x+40,bot.y);seg(c,top.x+20,top.y,top.x+60,top.y);seg(c,bot.x+20,bot.y,bot.x+60,bot.y);c.restore();c.restore();
  tagC(c,300,470,'25 FEET',clamp((t-wb('25',35))/0.3));bigCard(c,700,470,clamp((t-wb('35',37.5))/0.3),'35','MILES PER HOUR');FX.speed=0.35;lens(c,t);};
// 14 · "It smashed buildings," the wave slams a frame house; planks burst
XM.smash=(c,t,u,d)=>{const h=HH(t,16);camAt(c,'ne_wide',[0,4,-6],1.15,{ox:h.ox,oy:h.oy});const fx=-8+u*6;molassesSheet(c,t,-60,fx,-7,7,1.2,{edge:false});wave3(c,t,fx,7.0,{debris:10,za:-9,zb:3});c.restore();
  for(let i=0;i<24;i++){const ph=clamp((u-0.2-hash(i)*0.3)*0.9);if(ph<=0)continue;c.save();c.translate(540+(hash(i*3)-0.3)*900*ph,700-500*ph+600*ph*ph);c.rotate(ph*9*(hash(i)-0.5));c.fillStyle=['#a8784a','#8a5a34','#6a6a70'][i%3];c.strokeStyle='#0b0b0d';c.lineWidth=3;c.fillRect(-60,-10,120,20);c.strokeRect(-60,-10,120,20);c.restore();}
  soundFx(c,540,520,'CRASH!',u/1.2,-0.08);lens(c,t,{v:0.6});};
// 15 · "bent the steel girders of an elevated railway," looking up: the El girder buckles, a tram car teeters above
XM.el=(c,t,u,d)=>{const h=HH(t,10);camAt(c,'ne_rail',[0,6.2,-0.5],1.05,{ox:h.ox,oy:h.oy});const b=eo(clamp(u/1.4));const A=pp([-8,5.6,-1.5]),B=pp([8,5.6,-1.5]),M=pp([0,5.6-b*2.2,-1.5]);
  c.save();c.strokeStyle='#3e4a44';c.lineWidth=90*M.s;c.lineCap='butt';c.beginPath();c.moveTo(A.x,A.y);c.quadraticCurveTo(M.x,M.y+b*120,B.x,B.y);c.stroke();c.strokeStyle='#0b0b0d';c.lineWidth=5;c.stroke();c.restore();
  const tc=pp([2,7.2-b*1.6,-0.6]);c.save();c.translate(tc.x,tc.y);c.rotate(-0.08-b*0.25+Math.sin(t*4)*0.02);c.fillStyle='#7a2a22';c.strokeStyle='#0b0b0d';c.lineWidth=5;const s=tc.s;c.fillRect(-260*s,-150*s,520*s,150*s);c.strokeRect(-260*s,-150*s,520*s,150*s);c.fillStyle='#f4e8c8';for(let i=0;i<6;i++)c.fillRect((-230+i*80)*s,-120*s,50*s,50*s);c.restore();
  c.restore();soundFx(c,540,1500,'CREEEAK',u/1.6,0.05,'#fff');lens(c,t,{v:0.6});};
// 16 · "and swept people and horses away." people + a horse tumble along in the flood
XM.swept=(c,t,u,d)=>{const h=HH(t,10);camAt(c,'ne_sideHi',[0.6+u*0.9,1.4,1.4],1.3,{ox:h.ox,oy:h.oy-60});const S=1.4;molassesSheet(c,t,-40,30,-7,8.5,S,{edge:false});
  for(let i=0;i<26;i++){const z=-6+hash(i*3)*15,x=((hash(i)*34+t*5)%34)-16;const a=pp([x,S,z]),b=pp([x+2.8,S,z]);c.strokeStyle='rgba(255,170,90,0.22)';c.lineWidth=5*a.s;c.lineCap='round';seg(c,a.x,a.y,b.x,b.y);}
  for(let i=0;i<6;i++){const z=-5+i*2.3,x=((hash(i*7)*30+t*5)%30)-12;const b=pp([x,S,z]);c.save();c.translate(b.x,b.y);c.rotate(Math.sin(t+i));c.fillStyle=['#8a6a44','#6a4a2a','#a8986a'][i%3];c.strokeStyle='#120602';c.lineWidth=3;c.fillRect(-60*b.s,-8*b.s,120*b.s,16*b.s);c.strokeRect(-60*b.s,-8*b.s,120*b.s,16*b.s);c.restore();}
  const L=[['horse',[-3.5+u*1.0,0,-2.5]],['dock',[-1.5+u*1.1,0,0.8],{seed:5,tilt:-0.4}],['girl',[0.6+u*1.2,0,3.2],{seed:4,d:0.8,tilt:0.5}],['boy',[2.6+u*1.0,0,-1.2],{seed:3,d:0.9}]].sort((a,b)=>a[1][2]-b[1][2]);
  for(const [k,pos,o] of L){if(k==='horse'){const p=pp([pos[0],S,pos[2]]);c.save();c.beginPath();c.rect(-3000,-3000,8000,p.y+3000);c.clip();c.translate(p.x,p.y-20*p.s+Math.sin(t*2.5)*14*p.s);c.rotate(-0.5+Math.sin(t*1.8)*0.25);horse(c,0,0,p.s*1.15,t*0.6);c.restore();
      c.fillStyle='#2e1406';c.beginPath();c.ellipse(p.x,p.y,220*p.s,40*p.s,0,0,TAU);c.fill();for(let i=0;i<8;i++){const a=i/8*TAU+t*3;c.fillStyle='#4a220c';c.beginPath();c.arc(p.x+Math.cos(a)*200*p.s,p.y-Math.abs(Math.sin(a+t))*30*p.s,10*p.s,0,TAU);c.fill();}}
    else carried(c,k,pos,S,t,o);}
  c.restore();lens(c,t,{v:0.6});};
// 17 · "But here's the twist:" freeze, desaturate, stamp
XM.twist=(c,t,u,d)=>{XM.swept(c,LT(17)+1.4,1.4,2.2);c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.75)';c.fillRect(0,0,W,H);c.restore();stamp(c,LT(18)+0.1,t,'TWIST',540,520,{col:'#ffd23f',size:120});};
// 18 · "the wave wasn't the worst part." aerial: the whole North End drowned in brown, the tank burst
XM.aerial=(c,t,u,d)=>{camAt(c,'ne_aerial',[-12,0,-4],1.05+u*0.04,{oy:0});molassesSheet(c,t,-60,30,-14,10,0.8);c.restore();tagC(c,540,560,'NOT THE WORST PART',clamp((t-wb('worst',49.3))/0.3),'#ffd23f');lens(c,t,{v:0.6});};
// 19 · "As the cold January air hit it," frost creeps in, breath clouds, temperature drops
XM.cold=(c,t,u,d)=>{camAt(c,'ne_flood',[-4,1.2,1.3],1.7,{oy:60});const D=0.85;molassesSheet(c,t,-50,4,-6,7.5,D);const r=stuck(c,'dock2',[-4,0,1.3],0.8,F('half','worried','frown',{seed:7,surf:D,hf:[30,-40],hb:[-30,-40]}));
  if(r)coldBreath(c,r.hip?r.hip.x+20:540,(r.hip?r.hip.y:900)-320*r.s,r.s*2,t,0);c.restore();const k=clamp(u/1.2);c.save();c.fillStyle=`rgba(150,190,255,${0.25*k})`;c.fillRect(0,0,W,H);c.strokeStyle=`rgba(230,240,255,${0.6*k})`;c.lineWidth=3;
  for(let i=0;i<20;i++){const x=hash(i)*W,y=hash(i*3)*H;c.beginPath();for(let a=0;a<6;a++){c.moveTo(x,y);c.lineTo(x+Math.cos(a)*20*k,y+Math.sin(a)*20*k);}c.stroke();}c.restore();
  const v=Math.round(lerp(46,16,eo(clamp(u/1.6))));txt(c,v+'°F',860,500,70,'#bfe0ff',{sw:12});lens(c,t);};
// 20 · "the molasses got thicker and thicker…" a boot pulls up out of the goo, long strands stretching, then it sucks back down
XM.thick=(c,t,u,d)=>{c.fillStyle='#2a1206';c.fillRect(0,0,W,H);const lift=Math.sin(clamp(u/1.8)*Math.PI)*0.9;const by=1250-lift*500;
  c.save();c.fillStyle='#4a3a30';c.strokeStyle='#0b0b0d';c.lineWidth=6;c.fillRect(450,by-500,180,500);c.strokeRect(450,by-500,180,500);c.fillStyle='#1a1410';c.beginPath();c.roundRect(420,by-40,260,90,30);c.fill();c.stroke();
  for(let i=0;i<7;i++){const x=440+i*36;c.strokeStyle='#4a220c';c.lineWidth=18-Math.abs(i-3)*3;c.beginPath();c.moveTo(x,by+40);c.quadraticCurveTo(x+Math.sin(i+t)*20,(by+1250)/2,x+(i-3)*30,1300);c.stroke();}c.restore();
  const g=c.createLinearGradient(0,1250,0,1920);g.addColorStop(0,'#5a2a0e');g.addColorStop(1,'#1a0a04');c.fillStyle=g;c.beginPath();c.moveTo(0,1300);for(let x=0;x<=W;x+=20)c.lineTo(x,1290+Math.sin(x*0.02+t)*8-(Math.abs(x-540)<200?lift*120*(1-Math.abs(x-540)/200):0));c.lineTo(W,H);c.lineTo(0,H);c.fill();
  c.fillStyle='rgba(255,190,120,0.3)';c.fillRect(0,1290,W,8);tagC(c,540,560,'THICKER…',clamp(u/0.3));lens(c,t);};
// 21 · "like wet cement." split card: molasses vs cement, equals sign
XM.cement=(c,t,u,d)=>{c.fillStyle='#1a1612';c.fillRect(0,0,W,H);const k=back(clamp(u/0.3));c.save();c.translate(540,820);c.scale(k,k);
  for(const [x,col,lab] of [[-240,'#4a220c','MOLASSES'],[240,'#8a8a86','WET CEMENT']]){c.fillStyle=col;c.strokeStyle='#0b0b0d';c.lineWidth=8;c.beginPath();c.roundRect(x-170,-170,340,340,30);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,0.18)';c.beginPath();c.ellipse(x-60,-90,80,24,-0.3,0,TAU);c.fill();txt(c,lab,x,230,44,'#fff',{sw:8});}
  txt(c,'=',0,0,140,'#ffd23f',{sw:14});c.restore();lens(c,t);};
// 22 · "People who survived the wave got stuck." they try to walk; legs won't come
XM.stuck=(c,t,u,d)=>{camAt(c,'ne_flood',[-4,0.9,-0.6],1.1+u*0.02,{oy:-60});const D=0.85;molassesSheet(c,t,-50,4,-6,7.5,D);
  stuck(c,'dock2',[-6.3,0,-3.4],0.8,F('squeeze','worried','scream',{seed:7,surf:D,lean:Math.sin(t*3)*0.15,hf:[60,-20],hb:[-40,-10]}));
  stuck(c,'dock',[-2.1,0,-0.3],0.7,F('wide','worried','o',{seed:8,surf:D,lean:0.2+Math.sin(t*4)*0.08,hf:[70,0],hb:[-60,10],f:1}));
  stuck(c,'girl',[-4,0,1.3],0.65,F('shock','up','scream',{seed:9,surf:D,hf:[40,-110],hb:[-40,-110]}));c.restore();lens(c,t,{v:0.6});};
// 23 · "The more they struggled, the deeper they sank." one man thrashes and sinks lower and lower
XM.sank=(c,t,u,d)=>{camAt(c,'ne_flood',[-3.5,0.9,0.3],1.9,{oy:60});const D=0.85,dd=lerp(0.7,1.35,eo(clamp(u/2.2)));molassesSheet(c,t,-50,4,-6,7.5,D);
  stuck(c,'dock',[-3.5,0,0.3],dd,F('squeeze','worried','scream',{seed:8,surf:D,hf:[60+Math.sin(t*12)*30,-120+Math.cos(t*10)*30],hb:[-60+Math.cos(t*11)*30,-110+Math.sin(t*9)*30]}));
  for(let i=0;i<4;i++){const p=pp([-3.5+Math.cos(i*1.6)*0.8,D,0.3+Math.sin(i*1.6)*0.5]);c.fillStyle='#4a220c';c.beginPath();c.ellipse(p.x,p.y-((t*3+i)%1)*60,10,12,0,0,TAU);c.fill();}c.restore();
  const arr=clamp((u-0.4)/0.3);if(arr>0){c.save();c.globalAlpha=arr;c.strokeStyle='#ffd23f';c.lineWidth=12;c.lineCap='round';seg(c,870,420,870,620);c.beginPath();c.moveTo(830,580);c.lineTo(870,630);c.lineTo(910,580);c.stroke();c.restore();}lens(c,t,{v:0.6});};
// 24 · "Rescuers waded in up to their waists." sailors wade with a rope; one grabs the girl's hand and pulls
XM.rescue=(c,t,u,d)=>{camAt(c,'ne_flood',[-3,0.9,0.4],1.15,{oy:-60});const D=0.85;molassesSheet(c,t,-50,4,-6,7.5,D);const pull=clamp((u-1.0)/1.0);
  const G=[-4.3,0,1.0],S=[-2.4+u*0.15,0,0.3];const pS=pp([S[0],D,S[2]]),pG=pp([G[0],D,G[2]]);
  const g=stuck(c,'girl',G,lerp(0.75,0.55,pull),F('wide','up','o',{seed:9,surf:D,hf:[(pS.x-pG.x)/pG.s*0.55,-70],hb:[-30,-60],f:1}));
  const s=stuck(c,'sailor',S,0.55,F('focus','angry','grit',{seed:8,surf:D,f:-1,lean:-0.15,hf:g?[(g.hf.x-pS.x)/pS.s,(g.hf.y-(pS.y-200*pS.s))/pS.s+200*0+((D-0.55)*0)]:[-90,-20],hb:[20,40]}));
  stuck(c,'dock2',[-1.0,0,-1.6],0.6,F('focus','angry','grit',{seed:12,surf:D,f:-1,hf:[-60,10],hb:[-80,20],lean:-0.2}));
  if(s){const a=pp([-1.0,D+0.9,-1.6]);c.save();c.strokeStyle='#c8b080';c.lineWidth=7;c.beginPath();c.moveTo(s.hb.x,s.hb.y);c.quadraticCurveTo((s.hb.x+a.x)/2,Math.max(s.hb.y,a.y)+60,a.x-30,a.y+60);c.stroke();c.restore();}c.restore();
  tagC(c,540,560,'WAIST-DEEP',clamp((t-wb('waists',63))/0.3));lens(c,t,{v:0.6});};
// 25 · "Even horses couldn't pull free." a horse heaves and thrashes; a man hauls on the reins
XM.horse=(c,t,u,d)=>{camAt(c,'ne_flood',[-6,0.9,-1],1.25,{oy:-40});const D=0.85;molassesSheet(c,t,-50,4,-6,7.5,D);const hp=horseStuck(c,[-6.5,0,-1.6],D,t);
  const m=stuck(c,'dock',[-3.4,0,0.6],0.6,F('squeeze','angry','grit',{seed:5,surf:D,f:-1,lean:0.25+Math.sin(t*5)*0.05,hf:[-70,-40],hb:[-50,-30]}));
  if(m){c.save();c.strokeStyle='#3a2418';c.lineWidth=5;c.beginPath();c.moveTo(m.hf.x,m.hf.y);c.quadraticCurveTo((m.hf.x+hp.x+160*hp.s)/2,m.hf.y+20,hp.x+170*hp.s,hp.y-110*hp.s);c.stroke();c.restore();}c.restore();lens(c,t,{v:0.6});};
// 26 · "21 people died." quiet: grey, the empty street, caps floating
XM.died=(c,t,u,d)=>{camAt(c,'ne_flood',[-4,0.9,-0.6],1.05,{oy:-60});molassesSheet(c,t,-50,4,-6,7.5,0.85);for(let i=0;i<4;i++){const p=pp([-6+i*1.6,0.85,-2+i*0.9]);c.save();c.translate(p.x+Math.sin(t+i)*10,p.y);c.rotate(Math.sin(t*0.8+i)*0.1);hat2b(c,'flatcap',p.s*1.6,1,27*p.s*1.6,t);c.restore();}c.restore();
  c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.85)';c.fillRect(0,0,W,H);c.restore();ink(c,0.25);bigCard(c,540,470,clamp(u/0.4),'21','LIVES LOST','#e8e8e8');lens(c,t,{v:0.7});};
// 27 · "Around 150 were injured." rescue wagon, nurse bandaging an arm
XM.injured=(c,t,u,d)=>{camAt(c,'ne_low',[3.6,1.0,0.1],1.35,{oy:60});const r=cast(c,[['dock2',[3.0,0,0],F('half','worried','frown',{seed:7,hf:[40,0],hb:[-10,92]})],['girl',[4.3,0,0.2],F('focus','flat','flat',{seed:13,f:-1,hf:[-30,10],hb:[-20,20]})]]);
  if(r[0]){c.save();c.fillStyle='#f4f4f4';c.strokeStyle='#0b0b0d';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.ellipse(r[0].hf.x-20-i*14,r[0].hf.y,10,16,0.3,0,TAU);c.fill();c.stroke();}c.restore();}c.restore();bigCard(c,540,470,clamp(u/0.3),String(Math.round(eo(clamp(u/1.2))*150)),'INJURED');lens(c,t);};
// 28 · "So how does a tank just…" the torn tank; an investigator in a bowler studies the ripped plate
XM.how=(c,t,u,d)=>{camAt(c,'ne_tankC',[-19.5,1.4,-1.5],1.3,{oy:60});const r=who(c,'boss',[-19.5,0,-1.5],F('focus','worried','flat',{seed:14,f:-1,hf:[-60,-40],hb:[10,92],look:[-2,0]}));c.restore();
  c.save();c.fillStyle='#120602';c.beginPath();c.moveTo(300,300);c.lineTo(360,1300);c.lineTo(200,1300);c.lineTo(250,300);c.fill();c.restore();if(u>0.5){c.save();c.translate(800,480);const k=back(clamp((u-0.5)/0.3));c.scale(k*0.6,k*0.6);bigQ(c,0,0,1,t);c.restore();}lens(c,t);};
// 29 · "explode?" a flash replay of the burst
XM.explode=(c,t,u,d)=>{XM.split(c,LT(13)+u*1.5,u*1.5,1.5);c.save();c.globalCompositeOperation='saturation';c.fillStyle='rgba(0,0,0,0.5)';c.fillRect(0,0,W,H);c.restore();flash(c,clamp(1-u/0.15));};
// 30 · "It had leaked since the day it was built." molasses oozes from the seams; neighbours fill buckets from the drips
XM.leak=(c,t,u,d)=>{camAt(c,'ne_tankC',[-18,2.2,2],1.2,{oy:-20});const r=cast(c,[['girl',[-19.5,0,0.5],F('happy','up','smile',{seed:4,f:-1,hf:[-30,40],hb:[10,92]})],['boy',[-17.8,0,1.6],F('happy','up','smile',{seed:3,f:-1,hf:[-26,50],hb:[10,92]})]]);
  for(const k of r){if(!k)continue;c.save();c.fillStyle='#8a8e96';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.beginPath();c.moveTo(k.hf.x-26,k.hf.y);c.lineTo(k.hf.x+26,k.hf.y);c.lineTo(k.hf.x+20,k.hf.y+50);c.lineTo(k.hf.x-20,k.hf.y+50);c.closePath();c.fill();c.stroke();c.fillStyle='#3a1a08';c.fillRect(k.hf.x-22,k.hf.y+4,44,10);c.restore();}c.restore();
  for(let i=0;i<9;i++){const x=120+i*110,y0=200+hash(i)*500;const len=200+hash(i*3)*500+((t*60+i*30)%120);c.fillStyle='#3a1a08';c.beginPath();c.moveTo(x-6,y0);c.quadraticCurveTo(x-8,y0+len*0.5,x-3,y0+len);c.lineTo(x+3,y0+len);c.quadraticCurveTo(x+8,y0+len*0.5,x+6,y0);c.fill();c.beginPath();c.ellipse(x,y0+len+10,9,13,0,0,TAU);c.fill();}
  tagC(c,540,560,'LEAKING FROM DAY ONE',clamp(u/0.3));lens(c,t);};
// 31 · "The company's fix?" the boss shrugs with a smug grin
XM.fix=(c,t,u,d)=>{camAt(c,'ne_tank',[-12,1.0,7.5],2.3,{oy:-120});who(c,'boss',[-12,0,7.5],F('sly','up','smirk',{seed:14,hf:[60,-60+Math.sin(t*5)*6],hb:[-60,-60+Math.sin(t*5)*6]}));c.restore();lens(c,t);};
// 32 · "Paint it brown, so the leaks wouldn't show." a painter on a ladder rolls brown paint over the drips
XM.paint=(c,t,u,d)=>{camAt(c,'ne_tankC',[-18,3.2,1],1.2,{oy:0});c.restore();const prog=clamp(u/1.8);
  for(let i=0;i<9;i++){const x=120+i*110,y0=200+hash(i)*500;const len=300+hash(i*3)*400;c.fillStyle='#3a1a08';c.fillRect(x-5,y0,10,len);}
  c.fillStyle='#5a3a2a';c.fillRect(0,0,W*prog,1400);c.fillStyle='rgba(255,255,255,0.06)';for(let i=0;i<20;i++)c.fillRect(0,i*70,W*prog,6);
  c.save();c.strokeStyle='#6a4a2a';c.lineWidth=16;const lx=W*prog;seg(c,lx-140,1500,lx-40,500);seg(c,lx+40,1500,lx+140,500);c.lineWidth=12;for(let i=0;i<8;i++){const q=i/8;seg(c,lerp(lx-140,lx-40,q),lerp(1500,500,q),lerp(lx+40,lx+140,q),lerp(1500,500,q));}c.restore();
  const r=who(c,'dock2',[0,0,0],F('focus','flat','smirk',{seed:12,abs:{x:lx,y:1000,s:1.6},hf:[60,-60+Math.sin(t*6)*40],hb:[-30,60],f:1}));if(r){c.save();c.strokeStyle='#3a2418';c.lineWidth=8;seg(c,r.hf.x,r.hf.y,r.hf.x+40,r.hf.y-60);c.fillStyle='#5a3a2a';c.strokeStyle='#0b0b0d';c.lineWidth=4;c.beginPath();c.roundRect(r.hf.x+20,r.hf.y-110,70,50,10);c.fill();c.stroke();c.restore();}
  tagC(c,540,560,'PAINTED BROWN',clamp((t-wb('brown',78))/0.3));lens(c,t);};
// 33 · "It was never even properly tested before they filled it." clipboard checklist, TEST: X, then the tank fills anyway
XM.tested=(c,t,u,d)=>{camAt(c,'ne_tank',[-24,8,-2],1.0,{oy:0});tankCut(c,'ne_tank',lerp(0.1,0.9,eo(clamp((u-0.8)/1.6))),t);c.restore();
  const k=back(clamp(u/0.3));c.save();c.translate(540,560);c.scale(k,k);c.rotate(-0.04);c.fillStyle='#7a5a3a';c.strokeStyle='#0b0b0d';c.lineWidth=6;c.beginPath();c.roundRect(-220,-220,440,440,20);c.fill();c.stroke();c.fillStyle='#f4ecd8';c.fillRect(-190,-180,380,380);c.strokeRect(-190,-180,380,380);
  c.fillStyle='#c8c8c8';c.fillRect(-60,-240,120,50);c.strokeRect(-60,-240,120,50);for(const [i,lab,ok] of [[0,'STEEL',1],[1,'RIVETS',1],[2,'WATER TEST',0]]){const y=-110+i*110;txt(c,lab,-30,y,36,'#2a2a2a',{stroke:false});
    if(ok){c.strokeStyle='#2a8a3a';c.lineWidth=10;c.beginPath();c.moveTo(110,y);c.lineTo(135,y+25);c.lineTo(170,y-25);c.stroke();}else if(u>0.6){bigX(c,140,y,40,clamp((u-0.6)/0.2),'#d8302a');}}c.restore();lens(c,t);};
// 34 · "The company was held responsible, and the disaster helped bring in stricter building rules," gavel + newspaper, rulebook stamps in
XM.court=(c,t,u,d)=>{c.fillStyle='#2a1e16';c.fillRect(0,0,W,H);const k=eo(clamp(u/0.6));c.save();c.translate(540,760);c.rotate(lerp(5,-0.05,k));c.scale(lerp(0.2,1,k),lerp(0.2,1,k));c.fillStyle='#ece4cc';c.fillRect(-360,-460,720,920);c.strokeStyle='#222';c.lineWidth=4;c.strokeRect(-360,-460,720,920);
  c.fillStyle='#111';c.font='900 48px "Lora",serif';c.textAlign='center';c.fillText('THE BOSTON POST',0,-390);c.fillRect(-320,-370,640,5);c.font='900 80px "Inter Display"';c.fillText('COMPANY',0,-270);c.fillText('LIABLE',0,-180);c.fillStyle='#777';for(let i=0;i<14;i++)c.fillRect(-320,-110+i*36,i%4===3?380:640,14);c.restore();
  const gp=clamp((t-wb('responsible',84.2)+0.1)/0.25);if(gp>0){c.save();c.translate(800,1350);c.rotate(-0.9+eo(Math.min(1,gp))*0.9);c.fillStyle='#6a3a1a';c.strokeStyle='#0b0b0d';c.lineWidth=6;c.fillRect(-20,-20,260,40);c.strokeRect(-20,-20,260,40);c.beginPath();c.roundRect(-80,-60,120,120,16);c.fill();c.stroke();c.restore();}
  if(t>wb('stricter',86))stamp(c,wb('stricter',86),t,'NEW RULES',540,1000,{col:'#2a8a3a',size:110});lens(c,t);};
// 35 · "so engineers had to sign off on projects like this." an engineer signs a blueprint; a seal stamps it
XM.sign=(c,t,u,d)=>{c.fillStyle='#16304a';c.fillRect(0,0,W,H);c.strokeStyle='rgba(200,220,255,0.25)';c.lineWidth=2;for(let x=0;x<W;x+=60)seg(c,x,0,x,H);for(let y=0;y<H;y+=60)seg(c,0,y,W,y);
  c.strokeStyle='rgba(230,240,255,0.85)';c.lineWidth=5;c.beginPath();c.ellipse(540,760,250,60,0,0,TAU);c.stroke();seg(c,290,760,290,1160);seg(c,790,760,790,1160);c.beginPath();c.ellipse(540,1160,250,60,0,0,Math.PI);c.stroke();txt(c,'TANK — SPEC.',540,620,40,'#e8f0ff',{stroke:false,ls:6});
  const sp=clamp((u-0.3)/1.2);c.save();c.strokeStyle='#e8f0ff';c.lineWidth=6;c.beginPath();for(let i=0;i<=40*sp;i++){const x=600+i*7,y=1320+Math.sin(i*0.7)*18-i*0.6;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
  const px=600+40*sp*7,py=1320+Math.sin(40*sp*0.7)*18-40*sp*0.6;c.translate(px,py);c.rotate(-0.6);c.fillStyle='#1a1a1e';c.strokeStyle='#0b0b0d';c.lineWidth=3;c.fillRect(-8,-180,16,180);c.fillStyle='#d8b040';c.fillRect(-8,-180,16,26);c.restore();
  if(u>1.6)stamp(c,LT(36)+1.6,t,'P.E. APPROVED',330,1420,{col:'#d8302a',size:64});lens(c,t);};
// 36 · "And some Bostonians say that on hot summer days…" summer: sun, a man in shirtsleeves stops on the cobbles
XM.summer=(c,t,u,d)=>{camAt(c,'ne_low',[2,1.1,0],lerp(1.8,2.0,u/d),{oy:60});const r=who(c,'dock',[2,0,0],F(u>1?'half':'dot','up','flat',{seed:5,hf:[10,92],hb:[-10,92],look:[0,-2],tilt:u>1?-0.08:0}));c.restore();
  c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(900,150,20,900,150,700);g.addColorStop(0,'rgba(255,220,150,0.45)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();c.fillStyle='rgba(255,170,80,0.08)';c.fillRect(0,0,W,H);lens(c,t);};
// 37 · "the North End still smells sweet." sweet golden wisps rise from the cobbles; he smiles, eyes closed
XM.sweet=(c,t,u,d)=>{camAt(c,'ne_low',[2,1.1,0],lerp(2.0,2.4,eio(clamp(u/(d-1)))),{oy:60});const r=who(c,'dock',[2,0,0],F('closed','up','smile',{seed:5,hf:[10,92],hb:[-10,92],tilt:-0.1}));c.restore();
  for(let i=0;i<10;i++){const x=140+i*90,ph=(t*0.25+hash(i))%1;c.save();c.strokeStyle=`rgba(255,200,120,${0.55*Math.sin(ph*Math.PI)})`;c.lineWidth=12;c.lineCap='round';c.beginPath();for(let k=0;k<=20;k++){const y=1500-k*45-ph*200;c.lineTo(x+Math.sin(k*0.5+t*1.5+i)*40,y);}c.stroke();c.restore();}
  c.fillStyle='rgba(255,170,80,0.08)';c.fillRect(0,0,W,H);const f=clamp((t-(END-1.8))/1.7);lens(c,t);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
const XSEQ=[['hook',0],['syrup',LT(1)-0.05],['boston',LT(2)-0.05],['date',LT(3)-0.05],['warm',LT(5)-0.05],['kids',LT(6)-0.05],['tank',LT(7)-0.05],['inside',LT(8)-0.05],['gallons',LT(9)-0.05],['noon',LT(10)-0.05],
  ['rivets',LT(11)-0.05],['oneby',LT(12)-0.05],['split',LT(13)-0.05],['wave',LT(14)-0.05],['smash',LT(15)-0.05],['el',LT(16)-0.05],['swept',LT(17)-0.05],['twist',LT(18)-0.05],['aerial',LT(19)-0.05],['cold',LT(20)-0.05],
  ['thick',LT(21)-0.05],['cement',LT(22)-0.05],['stuck',LT(23)-0.05],['sank',LT(24)-0.05],['rescue',LT(25)-0.05],['horse',LT(26)-0.05],['died',LT(27)-0.05],['injured',LT(28)-0.05],['how',LT(29)-0.05],['explode',LT(30)-0.05],
  ['leak',LT(31)-0.05],['fix',LT(32)-0.05],['paint',LT(33)-0.05],['tested',LT(34)-0.05],['court',LT(35)-0.05],['sign',LT(36)-0.05],['summer',LT(37)-0.05],['sweet',LT(38)-0.05]];
SHOTS.length=0;XSEQ.forEach(([k,t0],i)=>{const t1=i+1<XSEQ.length?XSEQ[i+1][1]:END;SHOTS.push([t0,(c,t,u,d)=>XM[k](c,t,t-t0,t1-t0)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
var IMPACTS=[[LT(0)+0.02,10,0.4],[LT(13),14,0.6],[LT(15),10,0.4],[LT(16)+0.5,8,0.4],[LT(30),10,0.3],[LT(18)+0.1,6,0.25]];
