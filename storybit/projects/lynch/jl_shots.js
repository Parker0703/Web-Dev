'use strict';
const XJ={};const LT=i=>L[i].a;
function lens(c,t,o={}){cine(c,t,{v:o.v??0.5,bars:0});}
KEY.clear();
const F=(e,b,m,o)=>BF(e,b,m,o);
function nightVision(c,t){c.save();c.globalCompositeOperation='saturation';c.fillStyle='#000';c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='#5aff8a';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(30,120,50,0.25)';c.fillRect(0,0,W,H);c.restore();c.save();for(let i=0;i<1400;i++){c.fillStyle=`rgba(200,255,200,${hash(i+Math.floor(t*24)*7)*0.18})`;c.fillRect(hash(i*3+Math.floor(t*24))*W,hash(i*7+Math.floor(t*24))*H,2,2);}c.restore();
  const g=c.createRadialGradient(540,960,400,540,960,1150);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.85)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='rgba(180,255,190,0.85)';c.font='700 34px monospace';c.fillText('REC ●',70,180);c.fillText('04/01/03  00:'+String(Math.floor(t*7)%60).padStart(2,'0'),70,230);}
function stretcher(c,a,b,s){c.save();c.strokeStyle=OL;c.lineWidth=5*s;c.fillStyle='#5a6a4a';c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(b.x,b.y+18*s);c.lineTo(a.x,a.y+18*s);c.closePath();c.fill();c.stroke();c.restore();}
XJ.test1=(c,t)=>{camAt(c,'iq_road',[0,1.2,1.4],1.7,{oy:-40});cast(c,[['jess',[1.1,0,1.9],F('dot','flat','smile',{seed:1,hf:[10,92],hb:[-10,92]})],['lori',[-0.4,0,1.2],F('happy','up','smile',{seed:2,f:1,hf:[20,90],hb:[-10,92]})],['gi1',[-2.4,0,0.4],F('dot','flat','flat',{seed:3})]]);c.restore();lens(c,t);};
// two operators carry her out on a litter; she lies on it, a blanket over her
function carryOut(c,t,x,z,o={}){const ph=t*7;const R=[x-1.4,0,z],Fr=[x+1.4,0,z];
  const rr=who(c,'sf2',R,F('focus','angry','grit',{seed:4,walk:1,ph,f:1,hf:[46,40],hb:[30,44]}));const rf=who(c,'sf',Fr,F('focus','angry','grit',{seed:3,walk:1,ph:ph+Math.PI,f:1,hf:[-22,52],hb:[-40,48]}));
  if(!rr||!rf)return;const s=rr.s,a={x:(rr.hf.x+rr.hb.x)/2,y:(rr.hf.y+rr.hb.y)/2},b={x:(rf.hf.x+rf.hb.x)/2,y:(rf.hf.y+rf.hb.y)/2};
  c.save();c.strokeStyle=OL;c.lineWidth=7*s;c.lineCap='round';c.beginPath();c.moveTo(a.x-10*s,a.y);c.lineTo(b.x+10*s,b.y);c.stroke();c.strokeStyle='#6a6a58';c.lineWidth=4*s;c.stroke();
  c.fillStyle='#5a6a4a';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(a.x+20*s,a.y-4*s);c.lineTo(b.x-20*s,b.y-4*s);c.lineTo(b.x-20*s,b.y+10*s);c.lineTo(a.x+20*s,a.y+10*s);c.closePath();c.fill();c.stroke();
  const L=Math.hypot(b.x-a.x,b.y-a.y),ang=Math.atan2(b.y-a.y,b.x-a.x);c.translate(a.x,a.y);c.rotate(ang);
  c.fillStyle='#d8dcd8';c.beginPath();c.roundRect(L-110*s,-30*s,70*s,26*s,10*s);c.fill();c.stroke();
  c.fillStyle='#f2efe8';c.beginPath();c.arc(L-76*s,-42*s,30*s,0,TAU);c.fill();c.stroke();c.fillStyle='#d8b060';c.beginPath();c.arc(L-72*s,-50*s,30*s,Math.PI*0.95,Math.PI*2.05);c.fill();c.stroke();
  c.fillStyle=OL;c.lineWidth=3*s;c.beginPath();c.moveTo(L-88*s,-40*s);c.lineTo(L-80*s,-40*s);c.moveTo(L-68*s,-40*s);c.lineTo(L-60*s,-40*s);c.stroke();
  c.fillStyle='#7a8a6a';c.lineWidth=4*s;c.beginPath();c.moveTo(40*s,-6*s);c.quadraticCurveTo(60*s,-60*s,(L*0.5)*s/s,-52*s);c.quadraticCurveTo(L-140*s,-46*s,L-110*s,-20*s);c.lineTo(L-110*s,-4*s);c.lineTo(40*s,-4*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#6a7a5a';c.lineWidth=2*s;for(let k=1;k<5;k++){c.beginPath();c.moveTo(40*s+k*(L-150*s)/5,-40*s);c.lineTo(40*s+k*(L-150*s)/5+10*s,-6*s);c.stroke();}c.restore();}
XJ.test2=(c,t)=>{const cx=(t*0.6)%2;camAt(c,'iq_hosp',[cx+0.6,1.3,8],1.45,{oy:-20});carryOut(c,t,cx,8);c.restore();nightVision(c,t);};
XJ.test3=(c,t)=>{camAt(c,'cg_hear',[0,1.2,1.0],1.3,{oy:40});const P=[0,0,0.9];const h1=reach(P,[0.18,0.84,1.25],{crouch:50}),h2=reach(P,[-0.18,0.84,1.25],{crouch:50});who(c,'jessV',P,F('half','worried','flat',{seed:6,kn:1,hf:h1,hb:h2}));occluder(c,[[-1.9,0.8,2.1],[1.9,0.8,2.1],[1.9,0,2.1],[-1.9,0,2.1]],'#6a4426');occluder(c,[[-1.9,0.84,2.15],[1.9,0.84,2.15],[1.9,0.78,2.15],[-1.9,0.78,2.15]],'#3a5a3a');
  for(const x of [-0.5,0.5]){const m=pp([x,0.83,1.7]),m2=pp([x*0.7,1.12,1.4]);c.strokeStyle=OL;c.lineWidth=6;seg(c,m.x,m.y,m2.x,m2.y);c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(m2.x,m2.y,10,16,0,0,TAU);c.fill();}c.restore();lens(c,t);};
const XSEQ=[['test1',0],['test2',30],['test3',60]];
SHOTS.length=0;XSEQ.forEach(([k,t0],i)=>{SHOTS.push([t0,(c,t,u,d)=>XJ[k](c,t,t-t0,1)]);});
