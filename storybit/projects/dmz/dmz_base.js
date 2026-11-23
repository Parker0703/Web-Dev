'use strict';
// ===================== DMZ base helpers (from Lynch) (StoryBit C) =====================
const XJ={};const LT=i=>L[i].a;
function lens(c,t,o={}){cine(c,t,{v:o.v??0.5,bars:0});}
const F=(e,b,m,o)=>BF(e,b,m,o);
const ink=(c,a)=>{c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(0,0,W,H);};
function bigX(c,x,y,r,a=1,col='#ff3b30'){if(a<=0)return;c.save();c.globalAlpha=Math.min(1,a);c.strokeStyle=col;c.lineCap='round';c.lineWidth=r*0.22;const k=eo(clamp(a));seg(c,x-r*k,y-r*k,x+r*k,y+r*k);seg(c,x+r*k,y-r*k,x-r*k,y+r*k);c.restore();}
function tagC(c,x,y,s,k=1,col='#ffd23f'){if(k<=0)return;c.save();c.globalAlpha=clamp(k*2);c.translate(x,y);const sc=lerp(0.7,1,eo(clamp(k)));c.scale(sc,sc);c.font='900 40px "Inter Display"';c.letterSpacing='5px';const w=c.measureText(s).width+60;
  c.fillStyle='rgba(12,10,8,0.86)';c.beginPath();c.roundRect(-w/2,-38,w,76,38);c.fill();c.strokeStyle=col;c.lineWidth=4;c.stroke();c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,3);c.restore();}
function bigCard(c,x,y,k,top,bottom,col='#ffd23f',sz=110){if(k<=0)return;c.save();c.translate(x,y);const sc=back(clamp(k));c.scale(sc,sc);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-340,-120,680,240,30);c.fill();c.strokeStyle=col;c.lineWidth=6;c.stroke();
  txt(c,top,0,-22,sz,'#fff',{sw:12});c.font='800 30px "Inter Display"';c.letterSpacing='6px';c.fillStyle=col;c.textAlign='center';c.fillText(bottom,0,78);c.restore();}
function popName(c,t,t0,name,sub,y=470){const k=clamp((t-t0)/0.3);if(k<=0)return;c.save();c.translate(540,y);const sc=back(k);c.scale(sc,sc);c.fillStyle='rgba(12,10,8,0.88)';c.beginPath();c.roundRect(-360,-90,720,180,26);c.fill();c.strokeStyle='#ffd23f';c.lineWidth=5;c.stroke();
  txt(c,name,0,-20,64,'#fff',{sw:10,ls:3});c.font='800 28px "Inter Display"';c.letterSpacing='6px';c.fillStyle='#ffd23f';c.textAlign='center';c.fillText(sub,0,52);c.restore();}
function nightVision(c,t,rec=true){c.save();c.globalCompositeOperation='saturation';c.fillStyle='#000';c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='#5aff8a';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(30,120,50,0.25)';c.fillRect(0,0,W,H);c.restore();c.save();const f=Math.floor(t*24);for(let i=0;i<1400;i++){c.fillStyle=`rgba(200,255,200,${hash(i+f*7)*0.18})`;c.fillRect(hash(i*3+f)*W,hash(i*7+f)*H,2,2);}c.restore();
  const g=c.createRadialGradient(540,960,400,540,960,1150);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.85)');c.fillStyle=g;c.fillRect(0,0,W,H);
  if(rec){c.fillStyle='rgba(180,255,190,0.85)';c.font='700 34px monospace';c.fillText((Math.floor(t*2)%2?'REC ●':'REC'),70,180);c.fillText('04/01/03  00:'+String(Math.floor(t*7)%60).padStart(2,'0'),70,230);}}
function tvFrame(c,t,live=true){const g=c.createRadialGradient(540,900,100,540,900,900);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.6)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.save();c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=2;for(let y=0;y<H;y+=6)seg(c,0,y,W,y);c.restore();
  if(live){c.fillStyle='#b8201a';c.fillRect(60,1520,280,74);txt(c,'LIVE',200,1557,52,'#fff',{stroke:false,ls:6});c.fillStyle='rgba(10,20,40,0.9)';c.fillRect(340,1520,680,74);c.font='800 34px "Inter Display"';c.fillStyle='#fff';c.textAlign='left';c.fillText('BREAKING: POW RESCUED IN IRAQ',364,1568);}}
function paper(c,x,y,s,rot,head1,head2,o={}){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.shadowColor='rgba(0,0,0,0.5)';c.shadowBlur=30;c.fillStyle='#ece4cc';c.fillRect(-340,-460,680,920);c.shadowColor='transparent';c.strokeStyle='#222';c.lineWidth=4;c.strokeRect(-340,-460,680,920);
  c.fillStyle='#111';c.font='900 46px "Lora",serif';c.textAlign='center';c.fillText(o.mast||'THE DAILY HERALD',0,-395);c.fillRect(-300,-372,600,5);c.font='900 72px "Inter Display"';c.fillText(head1,0,-280);if(head2)c.fillText(head2,0,-200);
  c.fillStyle='#bdb6a0';c.fillRect(-300,-160,600,330);c.strokeRect(-300,-160,600,330);if(o.photo)o.photo(c);c.fillStyle='#666';for(let i=0;i<9;i++)c.fillRect(-300,200+i*26,i%3===2?380:600,11);
  if(o.hl){c.fillStyle='rgba(255,210,60,0.55)';c.fillRect(-306,o.hl-8,612,26);}c.restore();}
function m16(c,x,y,s,ang,o={}){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.lineJoin='round';c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#2a2a2c';
  c.beginPath();c.moveTo(-260,-10);c.lineTo(-120,-24);c.lineTo(-120,22);c.lineTo(-250,34);c.closePath();c.fill();c.stroke();c.fillRect(-120,-26,200,40);c.strokeRect(-120,-26,200,40);c.beginPath();c.roundRect(-40,-56,90,30,6);c.fill();c.stroke();
  c.fillRect(80,-18,180,28);c.strokeRect(80,-18,180,28);c.fillRect(260,-10,120,10);c.strokeRect(260,-10,120,10);c.fillRect(230,-46,14,30);c.strokeRect(230,-46,14,30);
  c.beginPath();c.moveTo(-30,14);c.lineTo(10,14);c.lineTo(30,110);c.lineTo(0,114);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-100,14);c.lineTo(-80,14);c.lineTo(-90,80);c.lineTo(-115,76);c.closePath();c.fill();c.stroke();
  if(o.jam){c.fillStyle='#d8b040';c.save();c.translate(-10,-30);c.rotate(-0.6);c.fillRect(-6,-20,12,34);c.strokeRect(-6,-20,12,34);c.restore();}c.restore();}
function xray(c,cx,cy,s,t,k){c.save();c.translate(cx,cy);c.scale(s,s);c.strokeStyle='rgba(210,235,255,0.9)';c.lineWidth=14;c.lineCap='round';
  c.beginPath();c.arc(0,-330,70,0,TAU);c.stroke();for(let i=0;i<12;i++){c.beginPath();c.arc(0,-240+i*26,9,0,TAU);c.stroke();}
  for(let i=0;i<6;i++){c.beginPath();c.ellipse(0,-200+i*22,90-i*6,14,0,Math.PI*0.05,Math.PI*0.95);c.stroke();}seg(c,-110,-235,110,-235);seg(c,-110,-235,-150,-60);seg(c,-150,-60,-170,90);seg(c,110,-235,150,-60);seg(c,150,-60,170,90);
  c.beginPath();c.ellipse(0,80,100,40,0,0,TAU);c.stroke();seg(c,-60,100,-80,330);seg(c,-80,330,-90,560);seg(c,60,100,80,330);seg(c,80,330,90,560);
  const hot=(x,y,lab,d)=>{const q=clamp(k*3-d);if(q<=0)return;c.save();c.strokeStyle='#ff3b30';c.lineWidth=10;c.beginPath();c.arc(x,y,60*eo(q),0,TAU);c.stroke();c.restore();if(q>0.5)txt(c,lab,x+(x<0?-170:170),y,40,'#fff',{sw:8});};
  hot(0,-110,'SPINE',0);hot(160,-10,'ARM',0.6);hot(-85,440,'LEG',1.2);c.restore();}
function memorial(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=OL;c.lineWidth=5;c.lineJoin='round';
  c.fillStyle='#2a2a2c';c.fillRect(-8,-260,16,240);c.strokeRect(-8,-260,16,240);c.fillStyle='#8a7a5a';c.beginPath();c.ellipse(0,-290,58,38,0,Math.PI,TAU);c.closePath();c.fill();c.stroke();c.fillRect(-62,-292,124,12);
  for(const sx of [-1,1]){c.fillStyle='#4a3a2a';c.beginPath();c.moveTo(sx*14,0);c.lineTo(sx*14,-70);c.lineTo(sx*48,-70);c.lineTo(sx*48,-10);c.lineTo(sx*78,-8);c.lineTo(sx*78,6);c.lineTo(sx*14,6);c.closePath();c.fill();c.stroke();}
  c.fillStyle='#c8c8c8';c.beginPath();c.ellipse(26,-180,10,16,0,0,TAU);c.fill();c.stroke();c.restore();}
function iraqMap(c,t,k){c.fillStyle='#1c2a3a';c.fillRect(0,0,W,H);const P=[[300,500],[520,440],[760,560],[860,780],[800,1100],[720,1400],[560,1500],[420,1420],[300,1180],[260,880]];c.save();c.fillStyle='#d8c098';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();P.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();c.stroke();
  c.strokeStyle='#5a8ab8';c.lineWidth=8;c.beginPath();c.moveTo(430,520);c.quadraticCurveTo(560,900,640,1300);c.stroke();c.beginPath();c.moveTo(600,480);c.quadraticCurveTo(700,850,690,1300);c.stroke();
  const dot=(x,y,l)=>{c.fillStyle='#b8201a';c.beginPath();c.arc(x,y,14,0,TAU);c.fill();c.stroke();txt(c,l,x+(x>540?-10:10),y-36,34,'#fff',{sw:7});};dot(560,780,'BAGHDAD');dot(610,1250,'NASIRIYAH');
  const q=eo(clamp(k));c.strokeStyle='#ffd23f';c.lineWidth=12;c.setLineDash([24,16]);c.lineDashOffset=-t*40;c.beginPath();const pts=[[700,1500],[690,1380],[660,1300],[620,1260]];const n=Math.max(1,Math.floor(q*3)+1);c.moveTo(...pts[0]);for(let i=1;i<=Math.min(3,n);i++){const a=pts[i-1],b=pts[i],u=i<n?1:(q*3)%1||1;c.lineTo(lerp(a[0],b[0],u),lerp(a[1],b[1],u));}c.stroke();c.setLineDash([]);c.restore();}
// rescue litter carried by two operators
function carryOut(c,t,x,z,o={}){const ph=t*7;const R=[x-1.4,0,z],Fr=[x+1.4,0,z];
  const rr=who(c,'sf2',R,F('focus','angry','grit',{seed:4,walk:1,ph,f:1,hf:[46,40],hb:[30,44]}));const rf=who(c,'sf',Fr,F('focus','angry','grit',{seed:3,walk:1,ph:ph+Math.PI,f:1,hf:[-22,52],hb:[-40,48]}));
  if(!rr||!rf)return;const s=rr.s,a={x:(rr.hf.x+rr.hb.x)/2,y:(rr.hf.y+rr.hb.y)/2},b={x:(rf.hf.x+rf.hb.x)/2,y:(rf.hf.y+rf.hb.y)/2};
  c.save();c.strokeStyle=OL;c.lineWidth=7*s;c.lineCap='round';c.beginPath();c.moveTo(a.x-10*s,a.y);c.lineTo(b.x+10*s,b.y);c.stroke();c.strokeStyle='#6a6a58';c.lineWidth=4*s;c.stroke();
  c.fillStyle='#5a6a4a';c.strokeStyle=OL;c.lineWidth=4*s;c.beginPath();c.moveTo(a.x+20*s,a.y-4*s);c.lineTo(b.x-20*s,b.y-4*s);c.lineTo(b.x-20*s,b.y+10*s);c.lineTo(a.x+20*s,a.y+10*s);c.closePath();c.fill();c.stroke();
  const L2=Math.hypot(b.x-a.x,b.y-a.y),ang=Math.atan2(b.y-a.y,b.x-a.x);c.translate(a.x,a.y);c.rotate(ang);
  c.fillStyle='#d8dcd8';c.beginPath();c.roundRect(L2-110*s,-30*s,70*s,26*s,10*s);c.fill();c.stroke();
  c.fillStyle='#f2efe8';c.beginPath();c.arc(L2-76*s,-42*s,30*s,0,TAU);c.fill();c.stroke();c.fillStyle='#d8b060';c.beginPath();c.arc(L2-72*s,-50*s,30*s,Math.PI*0.95,Math.PI*2.05);c.fill();c.stroke();
  c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.moveTo(L2-88*s,-40*s);c.lineTo(L2-80*s,-40*s);c.moveTo(L2-68*s,-40*s);c.lineTo(L2-60*s,-40*s);c.stroke();
  c.fillStyle='#7a8a6a';c.lineWidth=4*s;c.beginPath();c.moveTo(40*s,-6*s);c.quadraticCurveTo(60*s,-60*s,L2*0.5,-52*s);c.quadraticCurveTo(L2-140*s,-46*s,L2-110*s,-20*s);c.lineTo(L2-110*s,-4*s);c.lineTo(40*s,-4*s);c.closePath();c.fill();c.stroke();c.restore();}
function muzzleAt(c,x,y,s,t,sd){if((Math.floor(t*14+sd*3))%3)return;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,50*s);g.addColorStop(0,'rgba(255,250,210,1)');g.addColorStop(1,'rgba(255,150,50,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,50*s,0,TAU);c.fill();c.restore();}
function ambulance(c,x,y,s,f,t){c.save();c.translate(x,y);c.scale(f*s,s);c.strokeStyle=OL;c.lineWidth=5;c.fillStyle='#f4f4f0';c.beginPath();c.roundRect(-200,-170,300,150,14);c.fill();c.stroke();c.beginPath();c.moveTo(100,-120);c.lineTo(170,-110);c.lineTo(190,-60);c.lineTo(190,-20);c.lineTo(100,-20);c.closePath();c.fill();c.stroke();
  c.fillStyle='#8ab0c8';c.beginPath();c.moveTo(112,-108);c.lineTo(162,-100);c.lineTo(176,-66);c.lineTo(112,-66);c.closePath();c.fill();c.stroke();c.fillStyle='#c8201a';c.fillRect(-80,-120,40,90);c.fillRect(-105,-95,90,40);
  for(const wx of [-130,120]){c.fillStyle='#1a1a1a';c.beginPath();c.arc(wx,-16,34,0,TAU);c.fill();c.stroke();c.fillStyle='#8a8a8a';c.beginPath();c.arc(wx,-16,12,0,TAU);c.fill();}
  if(Math.floor(t*6)%2){c.fillStyle='#ff4a3a';c.beginPath();c.arc(-150,-180,14,0,TAU);c.fill();c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,80,60,0.35)';c.beginPath();c.arc(-150,-180,60,0,TAU);c.fill();c.restore();}c.restore();}
function bedPatient(c,p,o={}){const s=p.s;c.save();c.strokeStyle=OL;c.lineWidth=4;c.fillStyle='#f2efe8';c.beginPath();c.arc(p.x-70*s,p.y-52*s,30*s,0,TAU);c.fill();c.stroke();c.fillStyle='#d8b060';c.beginPath();c.arc(p.x-74*s,p.y-60*s,30*s,Math.PI*0.95,Math.PI*2.05);c.fill();c.stroke();
  c.fillStyle=OL;if(o.closed){c.lineWidth=3;seg(c,p.x-84*s,p.y-50*s,p.x-76*s,p.y-50*s);seg(c,p.x-64*s,p.y-50*s,p.x-56*s,p.y-50*s);}else{c.beginPath();c.arc(p.x-80*s,p.y-52*s,3.5*s,0,TAU);c.arc(p.x-60*s,p.y-52*s,3.5*s,0,TAU);c.fill();}
  c.fillStyle='#a8c8d8';c.beginPath();c.roundRect(p.x-44*s,p.y-62*s,190*s,44*s,14*s);c.fill();c.stroke();c.restore();}
