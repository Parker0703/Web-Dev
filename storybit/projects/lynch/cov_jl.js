T=39.2;const t=39.2;window.SS=1;
// background: dark red-to-black with soft heroic rays
{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a0a08');g.addColorStop(0.55,'#4a1410');g.addColorStop(1,'#120606');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.save();c.globalAlpha=0.16;for(let i=0;i<28;i++){c.fillStyle=i%2?'#ffb070':'#ff5a3a';c.beginPath();c.moveTo(540,1250);const a=i/28*TAU;c.lineTo(540+Math.cos(a)*2200,1250+Math.sin(a)*2200);c.lineTo(540+Math.cos(a+0.11)*2200,1250+Math.sin(a+0.11)*2200);c.fill();}c.restore();}
// right: the night-vision "LIVE" rescue footage on a TV
{const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c2=cv.getContext('2d');XJ.carry(c2,39.2,1.5,4);
 c.save();c.translate(805,930);c.rotate(0.06);c.fillStyle='#111';c.strokeStyle='#0b0b0d';c.lineWidth=10;c.beginPath();c.roundRect(-270,-210,540,420,26);c.fill();c.stroke();
 c.save();c.beginPath();c.roundRect(-250,-190,500,380,14);c.clip();c.drawImage(cv,60,560,1000,760,-250,-190,500,380);c.restore();
 c.fillStyle='#e0201a';c.fillRect(-250,128,120,44);txt(c,'LIVE',-190,163,34,'#fff',{sw:0,ls:4});c.restore();}
// left: the newspaper myth, stamped FALSE
{c.save();c.translate(280,950);c.rotate(-0.08);c.fillStyle='#f1ece0';c.strokeStyle='#0b0b0d';c.lineWidth=8;c.beginPath();c.rect(-230,-250,460,500);c.fill();c.stroke();
 c.fillStyle='#1a1a1a';c.font='900 34px "Inter Display"';c.textAlign='center';c.fillText('MORNING EDITION',0,-208);c.fillRect(-210,-196,420,5);
 c.font='900 64px "Inter Display"';c.fillText('SHE FOUGHT',0,-128);c.fillText('TO THE',0,-62);c.fillText('DEATH',0,4);
 c.fillStyle='rgba(0,0,0,0.25)';for(let i=0;i<7;i++){c.fillRect(-210,40+i*26,i%3===2?260:420,10);}
 c.restore();
 c.save();c.translate(270,1090);c.rotate(-0.28);c.strokeStyle='#e8231c';c.lineWidth=12;c.beginPath();c.roundRect(-190,-62,380,124,16);c.stroke();txt(c,'FALSE',0,40,110,'#e8231c',{sw:0,ls:10});c.restore();}
// Jessica, big and clear: eyes open, serious, in uniform
{const s=3.4,hx=540,hy=1480;const g=c.createRadialGradient(hx,hy,60,hx,hy,640);g.addColorStop(0,'rgba(255,120,80,0.45)');g.addColorStop(1,'rgba(255,60,40,0)');c.fillStyle=g;c.fillRect(0,700,W,1220);
 who(c,'jess',[0,0,0],F('dot','worried','flat',{seed:2,abs:{x:hx,y:hy+253*s,s}}));}
// title
c.save();c.shadowColor='rgba(0,0,0,0.9)';c.shadowBlur=40;c.shadowOffsetY=12;txt(c,'THE HERO STORY',540,250,112,'#ffffff',{sw:24,ls:2});txt(c,'WAS',540,400,120,'#ffffff',{sw:24,ls:4});txt(c,'A LIE',540,590,200,'#ff2a22',{sw:34,ls:8});c.restore();
txt(c,'PFC JESSICA LYNCH',540,1860,64,'#ffd23f',{sw:14,ls:4});
