'use strict';
// ===================== Mansa Musa · shots =====================
// 3D camel sprite: picks the view bin from the true camera direction + the gait frame from time
const CEL=[5,20,40];
function camel(c,pos,yaw,t,o={}){const eye=CP.eye;const d=[eye[0]-pos[0],eye[1]-pos[1],eye[2]-pos[2]];const cy=Math.cos(yaw),sy=Math.sin(yaw);
  const lx=d[0]*cy-d[2]*sy,lz=d[0]*sy+d[2]*cy;let az=Math.atan2(lz,lx)*180/Math.PI;az=((Math.round(az/30)*30)%360+360)%360;const el=CEL.reduce((a,b)=>Math.abs(b-Math.atan2(d[1],Math.hypot(lx,lz))*180/Math.PI)<Math.abs(a-Math.atan2(d[1],Math.hypot(lx,lz))*180/Math.PI)?b:a);
  const ph=o.still?0:Math.floor(((((t*(o.sp??0.85))+(o.seed||0))%1)+1)%1*8);const name=`camel${ph}_${az}_${el}`;const m=VM[name],im=VIMG[name];if(!m||!im)return null;
  const p=pp(pos);if(p.w<=0.2)return null;if(o.shadow!==false)vshadow(c,pos,yaw,2.8,1.1,0.32,8);const k=(p.s/0.0061)/m.ppu*(o.sc||1);
  c.save();c.filter=(o.blur?`blur(${o.blur}px) `:'')+'sepia(0.25) saturate(1.25) brightness(0.96)';if(o.alpha!=null)c.globalAlpha=o.alpha;c.drawImage(im,p.x-m.ax*k,p.y-m.ay*k,m.w*k,m.h*k);c.restore();return {p,k};}
// royal parasol held over Musa (2D, on a pole from the bearer's hand)
function parasol(c,hx,hy,s,t){c.save();c.translate(hx,hy);const sw=Math.sin(t*1.3)*0.03;c.rotate(sw);c.strokeStyle='#5a3a10';c.lineWidth=7*s;c.beginPath();c.moveTo(0,0);c.lineTo(0,-260*s);c.stroke();
  const g=c.createLinearGradient(-160*s,0,160*s,0);g.addColorStop(0,'#a8701a');g.addColorStop(0.5,'#f6d060');g.addColorStop(1,'#a8701a');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=5*s;
  c.beginPath();c.moveTo(-170*s,-240*s);c.quadraticCurveTo(0,-360*s,170*s,-240*s);c.closePath();c.fill();c.stroke();for(let i=-4;i<=4;i++){c.fillStyle=i%2?'#7a1a1e':'#f2e2a0';c.beginPath();c.moveTo(i*38*s,-240*s);c.lineTo((i*38+19)*s,-222*s);c.lineTo((i*38+38)*s,-240*s);c.fill();}
  c.fillStyle='#f6d060';c.beginPath();c.arc(0,-322*s,12*s,0,TAU);c.fill();c.stroke();c.restore();}
// gold staff carried by attendants
function goldStaff(c,hx,hy,s,ang=0){c.save();c.translate(hx,hy);c.rotate(ang);const g=c.createLinearGradient(-6*s,0,6*s,0);g.addColorStop(0,'#a8701a');g.addColorStop(0.5,'#fff0a0');g.addColorStop(1,'#a8701a');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=3*s;
  c.beginPath();c.roundRect(-6*s,-300*s,12*s,360*s,6*s);c.fill();c.stroke();c.beginPath();c.arc(0,-310*s,18*s,0,TAU);c.fill();c.stroke();c.restore();}
// heat shimmer + drifting sand
function sandDrift(c,t,a=0.5){c.save();for(let i=0;i<60;i++){const k=hash(i*1.9),x=((hash(i)*1300+t*(80+k*160))%1300)-110,y=1100+hash(i*3.3)*820+Math.sin(t*2+i)*14;c.fillStyle=`rgba(255,230,180,${a*(0.15+k*0.35)})`;c.fillRect(x,y,20+k*60,2+k*2);}c.restore();}
function dustHaze(c,y0,y1,a=0.35,col='255,214,160'){const g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,`rgba(${col},0)`);g.addColorStop(0.6,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(0,y0,W,y1-y0);}
const XM={};
// ---- the caravan crossing the desert (wide, golden hour)
function caravan(c,t,o={}){const L=[];const n=o.n||16,sp=1.25;for(let i=0;i<n;i++){const x=(o.x0??-6)+i*(o.gap||4.2)-((t*sp)%(o.gap||4.2)),z=(o.z??0)+Math.sin(i*1.7)*0.6;
    L.push(A_([x,0,z],()=>camel(c,[x,0,z],Math.PI,t,{seed:i*0.37})));
    if(i%2===0){const wz=z+1.3;L.push(A_([x+0.6,0,wz],()=>who(c,i%4?'att1':'att3',[x+0.6,0,wz],F('dot','flat','flat',{seed:i,f:-1,view:'3q',walk:1,ph:t*6+i}))));}}
  if(o.musa){const mx=o.musa;L.push(A_([mx,0,1.6],()=>{const r=who(c,'musa',[mx,0,1.6],F('focus','flat','smirk',{seed:2,f:-1,view:'3q',walk:1,ph:t*6}))}));}
  depth(L.concat(o.extra||[]));}
XM.wide=(c,t,u,d)=>{camAt(c,'de_wide',[-10,2.2,0],1.0+u*0.02,hh(t,2));caravan(c,t,{n:18,x0:-40,gap:4.4,extra:[0,1,2].map(i=>{const x=14-i*5.2-((t*1.25)%5.2),z=9.5+i*0.4;return A_([x,0,z],()=>camel(c,[x,0,z],Math.PI,t,{seed:i*0.53}));})});c.restore();dustHaze(c,1050,1500,0.35);sandDrift(c,t,0.6);cgrade(c,t,{flare:[920,620],top:'rgba(255,150,70,0.25)',v:0.5});};
XM.hook=(c,t,u,d)=>{camAt(c,'de_low',[-6,1.8,0],1.03+u*0.03,hh(t,2));caravan(c,t,{n:10,x0:-14,gap:4.4,z:-3});c.restore();dustHaze(c,1100,1600,0.3);
  const s=2.5,x=560,y=1620;const r=who(c,'musa',[0,0,0],F('focus','flat','smirk',{seed:2,f:1,view:'3q',abs:{x,y,s},hf:[150,-30]}));if(r){c.save();const hx=r.hf.x,hy=r.hf.y;goldPile(c,hx,hy-6,110,40,4);c.restore();}
  coinRain(c,t,26,{sp:700,r:16});cgrade(c,t,{flare:[880,560],top:'rgba(255,150,70,0.25)',v:0.55});};
XM.souk=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.0+u*0.03,hh(t,2));const L=[];
  for(let i=0;i<7;i++){const z=-2-i*3.2,x=(i%2?1:-1)*(0.9+hash(i)*0.8);const k=['cai1','cai2','cai3','merch2','caiW','cai1','cai3'][i];L.push(A_([x,0,z],()=>who(c,k,[x,0,z],F(i%3?'shock':'wide','up','o',{seed:10+i,f:x>0?-1:1,view:'3q'}))));}
  L.push(A_([1.9,0,5.2],()=>who(c,'merch',[1.9,0,5.2],F('wide','up','o',{seed:4,f:-1,view:'3q',hf:[-60,10]}))));
  L.push(A_([-0.5,0,6.2],()=>{const r=who(c,'musa',[-0.5,0,6.2],F('happy','up','smile',{seed:2,f:1,view:'3q',hf:[120,-20]}));if(r)goldBag(c,r.hf.x+10*r.s,r.hf.y+40*r.s,0.75*r.s,true);}));
  L.push(A_([-1.3,0,4.6],()=>{const r=who(c,'att1',[-1.3,0,4.6],F('dot','flat','flat',{seed:6,f:1,view:'3q',hf:[40,-60]}));if(r)parasol(c,r.hf.x,r.hf.y,r.s*0.9,t);}));
  depth(L);c.restore();motes(c,t,100,300,1000,1500,40,0.5);cgrade(c,t,{top:'rgba(255,160,80,0.18)',v:0.55});};

// ---------- the route map: North & West Africa + Arabia (real coastline, lon/lat), the Mali Empire, the hajj route ----------
const AFR=[[-17.5,14.7],[-16.8,12.5],[-15,10.9],[-13.3,9],[-11.5,6.9],[-7.5,4.4],[-3,5],[1.5,6.2],[4.5,6.3],[8.6,4.5],[9.6,3.5],[14,2],[30,2],[42,2],[46,4],[48.6,8.2],[51.2,11.8],[48,11.2],[45,10.4],[43.3,11.5],[42.6,13],[39.6,15.6],[37.2,18.9],[36.8,22],[35.6,23.9],[33.6,27.2],[32.5,29.9],[32.3,31.3],[29.9,31.2],[25,31.6],[20.1,32.1],[19.9,30.9],[15.2,32.3],[11.2,33.2],[10.1,33.9],[11,35.2],[10.2,37.2],[3,36.8],[-2,35.1],[-5.9,35.8],[-6.8,34],[-9.6,32.5],[-9.8,29.9],[-13,27.6],[-17,21],[-16.5,19.5],[-16,16.5]];
const ARB=[[32.5,29.9],[32.3,31.3],[34.2,31.3],[34.5,31.6],[35.1,33.1],[35.9,35.5],[36,37],[44,38],[50,37],[48.8,30.5],[47.9,30],[48.4,28.5],[50.1,26.7],[50.8,24.7],[51.6,25],[54,24.1],[56.4,24.9],[59.8,22.5],[57.8,19],[55.5,17.4],[52.2,15.6],[48,14],[45,12.8],[43.4,12.7],[42.6,16.5],[41.2,18],[39.1,21.5],[36.6,27.3],[34.9,29.5]];
const IBR=[[-9.5,37],[-6,36.2],[-2,36.7],[0.3,38.7],[3.2,42],[3,45],[-10,45]],ITA=[[8,45],[12.4,44.2],[16,41],[15.6,38],[16.5,38.5],[18.5,40.2],[16.2,41.6],[13.6,45.6],[13,46]];
const MALI=[[-16.5,15.8],[-14,13],[-12,11],[-9,9.5],[-6,9.6],[-3.5,10.8],[-1,13],[0.6,15.5],[0.5,17.4],[-2.4,18.6],[-6,18],[-10.5,17],[-14.5,16.9]];
const ROUTE=[[-8.9,11.4],[-7.5,14.5],[-7,17.3],[-4.5,22.5],[0.2,27.8],[8,30],[17,30.4],[25,30.6],[31.2,30.05],[33.5,28.6],[36.3,26.5],[39.8,21.4]];
function hajjMap(c,t,o={}){const z=o.z||1,cx=o.cx??15,cy=o.cy??21;const S=19*z;const P=([lo,la])=>[540+(lo-cx)*S,1000-(la-cy)*S*1.12];
  c.fillStyle='#16304e';c.fillRect(0,0,W,H);{const g=c.createRadialGradient(540,900,100,540,900,1200);g.addColorStop(0,'rgba(80,140,160,0.35)');g.addColorStop(1,'rgba(0,0,0,0.5)');c.fillStyle=g;c.fillRect(0,0,W,H);}
  c.strokeStyle='rgba(255,255,255,0.05)';c.lineWidth=2;for(let lo=-30;lo<=70;lo+=5){const a=P([lo,0]),b=P([lo,50]);seg(c,a[0],a[1],b[0],b[1]);}for(let la=0;la<=50;la+=5){const a=P([-30,la]),b=P([70,la]);seg(c,a[0],a[1],b[0],b[1]);}
  const land=(poly,col)=>{c.save();c.beginPath();poly.forEach((q,i)=>{const p=P(q);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);});c.closePath();const g=c.createLinearGradient(0,P([0,35])[1],0,P([0,5])[1]);g.addColorStop(0,'#e0bc80');g.addColorStop(0.55,col);g.addColorStop(1,'#a89858');c.fillStyle=g;c.fill();c.clip();
    for(let i=0;i<900;i++){c.fillStyle=`rgba(${hash(i)>0.5?'120,80,40':'255,240,200'},0.12)`;c.beginPath();c.arc(hash(i*1.3)*W,hash(i*2.9)*H,2+hash(i*5)*7,0,TAU);c.fill();}c.restore();
    c.strokeStyle='#f4e8c8';c.lineWidth=3;c.beginPath();poly.forEach((q,i)=>{const p=P(q);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);});c.closePath();c.stroke();};
  land(AFR,'#d8a868');land(ARB,'#d8aa6a');
  c.strokeStyle='#5ab0d0';c.lineWidth=5;c.lineCap='round';c.beginPath();[[31.2,30.1],[31.3,27],[32.6,24.5],[32.9,22],[31,20],[33.5,17.5],[32.5,15.6]].forEach((q,i)=>{const p=P(q);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);});c.stroke();
  c.beginPath();[[-11,12.5],[-8,13.5],[-4,15.5],[-3,16.6],[0,16.3],[1.5,14],[3.5,11.5],[6.5,9],[6.5,5]].forEach((q,i)=>{const p=P(q);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);});c.stroke();
  const mk=clamp(o.mali||0);if(mk>0){c.save();c.globalAlpha=mk;c.beginPath();MALI.forEach((q,i)=>{const p=P(q);i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);});c.closePath();c.fillStyle=`rgba(240,190,60,${0.45+0.15*Math.sin(t*4)})`;c.fill();c.strokeStyle='#ffe08a';c.lineWidth=5;c.setLineDash([14,8]);c.stroke();c.setLineDash([]);
    const m=P([-6.5,15.8]);txt(c,'MALI EMPIRE',m[0],m[1],40,'#fff6d0',{sw:9,ls:2});c.restore();}
  const rk=clamp(o.route||0);if(rk>0){const pts=ROUTE.map(P);let tot=0;const sg=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);sg.push(l);tot+=l;}let rem=tot*rk;
    c.save();c.strokeStyle='#ffd23f';c.lineWidth=8;c.setLineDash([22,12]);c.lineDashOffset=-t*40;c.shadowColor='rgba(0,0,0,0.6)';c.shadowBlur=8;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);let end=pts[0];
    for(let i=1;i<pts.length&&rem>0;i++){const f=Math.min(1,rem/sg[i-1]);end=[lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)];c.lineTo(end[0],end[1]);rem-=sg[i-1];}c.stroke();c.restore();
    c.save();c.translate(end[0],end[1]);c.fillStyle='#ffd23f';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(0,0,14,0,TAU);c.fill();c.stroke();c.restore();}
  {const sp=P([4,24]);c.save();c.globalAlpha=0.55;txt(c,'S A H A R A',sp[0],sp[1],46,'#7a4a20',{stroke:false,ls:10});c.restore();const rs=P([38.6,25]);c.save();c.globalAlpha=0.5;c.translate(rs[0],rs[1]);c.rotate(1.0);txt(c,'RED SEA',0,0,26,'#bfe0ff',{stroke:false,ls:4});c.restore();}
  const city=(nm,q,k,col='#fff')=>{if(k<=0)return;const p=P(q);c.save();c.globalAlpha=clamp(k*2);c.fillStyle=col;c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.arc(p[0],p[1],11,0,TAU);c.fill();c.stroke();txt(c,nm,p[0],p[1]+(nm==='NIANI'?44:-36),38,col,{sw:9});c.restore();};
  city('NIANI',[-8.9,11.4],o.niani??0,'#ffe08a');city('CAIRO',[31.2,30.05],o.cairo??0,'#ffffff');city('MECCA',[39.8,21.4],o.mecca??0,'#ffffff');
  vignette(c,0.4);}
// ---------- value chart (parchment card): gold's worth crashing ----------
function valueChart(c,t,k,o={}){if(k<=0)return;const x=o.x??140,y=o.y??470,w=o.w??800,h=o.h??520;c.save();c.globalAlpha=clamp(k*2);c.translate(0,(1-eo(clamp(k*1.5)))*60);
  c.fillStyle='rgba(244,232,204,0.96)';c.strokeStyle='#4a3418';c.lineWidth=6;c.beginPath();c.roundRect(x,y,w,h,18);c.fill();c.stroke();
  txt(c,o.title||'VALUE OF GOLD IN CAIRO',x+w/2,y+56,38,'#4a3418',{stroke:false,ls:2});c.strokeStyle='rgba(74,52,24,0.35)';c.lineWidth=2;for(let i=1;i<5;i++)seg(c,x+60,y+90+i*(h-150)/5,x+w-30,y+90+i*(h-150)/5);
  c.strokeStyle='#4a3418';c.lineWidth=4;seg(c,x+60,y+90,x+60,y+h-60);seg(c,x+60,y+h-60,x+w-30,y+h-60);
  const N=60,dk=clamp(o.draw??k);c.strokeStyle='#c8201a';c.lineWidth=9;c.lineJoin='round';c.beginPath();let lx=0,ly=0;for(let i=0;i<=N*dk;i++){const u=i/N;const v=u<0.3?0.85+Math.sin(u*40)*0.02:u<0.42?lerp(0.85,0.32,eio((u-0.3)/0.12)):0.32+Math.sin(u*30)*0.02+(u>0.9?(u-0.9)*0.6:0);
    lx=x+60+u*(w-110);ly=y+h-60-v*(h-170);i?c.lineTo(lx,ly):c.moveTo(lx,ly);}c.stroke();if(dk>0){coin(c,lx,ly,22,t*2,1);}
  const yr=(u,s)=>{txt(c,s,x+60+u*(w-110),y+h-28,26,'#4a3418',{stroke:false});};yr(0.05,'1320');yr(0.36,'1324');yr(0.7,'1330');yr(0.97,'1336');
  if(o.arrow){const a=clamp(o.arrow);c.save();c.globalAlpha=a;c.translate(x+w*0.56,y+h*0.42);c.fillStyle='#c8201a';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(-30,-70);c.lineTo(30,-70);c.lineTo(30,10);c.lineTo(60,10);c.lineTo(0,80);c.lineTo(-60,10);c.lineTo(-30,10);c.closePath();c.fill();c.stroke();c.restore();}
  c.restore();}
// "1324" style year slam + stamps
function stamp(c,s,x,y,k,col='#c8201a',rot=-0.12,size=110){if(k<=0)return;c.save();c.translate(x,y);c.rotate(rot);const sc=lerp(2.2,1,eo(clamp(k*1.6)));c.scale(sc,sc);c.globalAlpha=clamp(k*3);c.strokeStyle=col;c.lineWidth=10;c.font=`900 ${size}px "Inter Display"`;const w=c.measureText(s).width;
  c.strokeRect(-w/2-24,-size*0.62,w+48,size*1.2);c.fillStyle=col;c.textAlign='center';c.textBaseline='middle';c.fillText(s,0,4);c.restore();}
function fadeBlack(c,a){if(a<=0)return;c.fillStyle=`rgba(0,0,0,${clamp(a)})`;c.fillRect(0,0,W,H);}
// ---------- crowd helpers ----------
const CROWD=['cai1','cai2','cai3','merch2','caiW','cai1','merch','cai3','cai2','caiW'];
function crowdAt(L,c,t,pts,o={}){pts.forEach((p,i)=>{const k=CROWD[(i+(o.off||0))%CROWD.length];const f=o.face?o.face(p,i):(p[0]>0?-1:1);L.push(A_(p,()=>{const r=who(c,k,p,F(o.eyes?o.eyes(i):(i%3?'shock':'wide'),'up',o.mouth?o.mouth(i):(i%2?'o':'smile'),Object.assign({seed:20+i,f,view:'3q'},o.arm?o.arm(i,p):{})));if(r&&o.after)o.after(r,i,p);}));});}
// ===================== THE SHOTS =====================
// 2 · "…made gold cheaper in another country." a Cairo merchant weighs a coin; the value arrow drops
XM.cheaper=(c,t,u,d)=>{camAt(c,'sk_rev',[0,1.9,8],1.0+u*0.04,hh(t,2));const L=[];crowdAt(L,c,t,[gp(250,1300),gp(820,1250),gp(640,1190)],{off:2});depth(L);c.restore();
  const s=2.6;const r=who(c,'merch',[0,0,0],F('wide','up','o',{seed:4,f:1,view:'3q',abs:{x:420,y:1640,s},hf:[170,-60]}));if(r)coin(c,r.hf.x+18,r.hf.y-26,34,0.2,Math.cos(t*2)*0.4+0.6);
  cgrade(c,t,{v:0.5});const k=clamp((t-TW('cheaper')+0.1)/0.4);if(k>0){c.save();c.globalAlpha=k;c.translate(840,640+eo(k)*80);c.fillStyle='#c8201a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.moveTo(-36,-90);c.lineTo(36,-90);c.lineTo(36,10);c.lineTo(72,10);c.lineTo(0,96);c.lineTo(-72,10);c.lineTo(-36,10);c.closePath();c.fill();c.stroke();c.restore();txt(c,'GOLD',840,500,64,'#ffd23f',{sw:12});}
  tagC(c,540,420,'CAIRO, EGYPT',clamp((u-0.2)/0.3));};
// 3 · "And people were still talking about it years later." gossip in the souk
XM.talking=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.04+u*0.02,hh(t,2));const L=[];
  const g1=[gp(330,1430),gp(560,1460)],g2=[gp(760,1300),gp(900,1320)];
  L.push(A_(g1[0],()=>who(c,'cai3',g1[0],F('sly','up','smirk',{seed:31,f:1,view:'3q',hf:[90,-110]}))),A_(g1[1],()=>who(c,'caiW',g1[1],F('wide','up','o',{seed:32,f:-1,view:'3q'}))));
  L.push(A_(g2[0],()=>who(c,'merch2',g2[0],F('happy','up','grin',{seed:33,f:1,view:'3q'}))),A_(g2[1],()=>who(c,'cai2',g2[1],F('shock','up','o',{seed:34,f:-1,view:'3q'}))));
  crowdAt(L,c,t,[gp(470,1180),gp(640,1150),gp(300,1200)],{off:4});depth(L);c.restore();motes(c,t,100,300,1000,1400,30,0.45);cgrade(c,t,{v:0.55});
  for(const [x,y,ph] of [[450,640,0],[830,600,0.5]]){const k=(t*0.8+ph)%1;if(k>0.75)continue;c.save();c.globalAlpha=Math.sin(k/0.75*Math.PI);c.fillStyle='#fffaf0';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(x,y-k*40,70,50,0,0,TAU);c.fill();c.stroke();coin(c,x,y-k*40,24,0,1);c.restore();}
  tagC(c,540,420,'YEARS LATER…',clamp((t-TW('years')+0.2)/0.3));};
// 4 · "In 1324, Mansa Musa," before the great mud mosque of Timbuktu
XM.mali=(c,t,u,d)=>{camAt(c,'ml_wide',[-4,4.2,-6],1.0+u*0.04,{});const L=[];const m=gp(560,1500);
  L.push(A_(m,()=>who(c,'musa',m,F('focus','flat','smirk',{seed:2}))));for(const [x,y,k] of [[300,1420,'att1'],[800,1430,'att2'],[180,1330,'att3'],[920,1340,'att1']]){const p=gp(x,y);L.push(A_(p,()=>{const r=who(c,k,p,F('dot','flat','flat',{seed:x,f:x<540?1:-1,view:'3q',hf:[30,-40]}));if(r)goldStaff(c,r.hf.x,r.hf.y,r.s*0.9,x<540?0.08:-0.08);}));}
  depth(L);c.restore();cgrade(c,t,{flare:[260,520],v:0.5});dzYear(c,'1324',clamp((t-TW('1324')+0.1)/0.35));const k=clamp((t-TW('mansa')+0.1)/0.3);if(k>0)tagC(c,540,560,'MANSA MUSA',k);};
// 5 · "ruler of the Mali Empire, traveled to Mecca." the empire, then the 4,000-km route
XM.map=(c,t,u,d)=>{const tr=TW('traveled')-0.15;const k=eio(clamp((t-tr)/1.6));hajjMap(c,t,{z:lerp(1.5,1.12,k),cx:lerp(-6,15.5,k),cy:lerp(13,22,k),mali:clamp((t-TW('mali')+0.1)/0.4),route:clamp((t-tr)/1.2),niani:clamp((t-TW('mali'))/0.4),cairo:clamp((t-tr-0.6)/0.3),mecca:clamp((t-TW('mecca')+0.1)/0.3)});};
// 6 · "But his journey through Cairo turned into a legendary display of wealth." the procession walks up to the gate
XM.journey=(c,t,u,d)=>{camAt(c,'ca_wide',[0,6.5,-24],1.0+u*0.03,hh(t,2));const L=[];const z0=lerp(37,31,u/d);
  for(let i=0;i<6;i++){const z=z0-7-i*5.5,x=(i%2?1.6:-1.6);L.push(A_([x,0,z],()=>camel(c,[x,0,z],-Math.PI/2,t,{seed:i*0.3})));}
  for(let i=0;i<8;i++){const z=z0-1-i*2.2-hash(i)*0.6,x=(i%2?2.6:-2.6)+hash(i*3)*0.4;L.push(A_([x,0,z],()=>{const r=who(c,i%3?'att1':'att2',[x,0,z],F('dot','flat','flat',{seed:i,back:1,walk:1,ph:t*6+i,hf:[20,-40]}));if(r&&i%2)goldStaff(c,r.hf.x,r.hf.y,r.s*0.9,0);}));}
  L.push(A_([0,0,z0],()=>{const r=who(c,'musa',[0,0,z0],F('dot','flat','flat',{seed:2,back:1,walk:1,ph:t*6}));}));L.push(A_([0.9,0,z0+0.6],()=>{const r=who(c,'att3',[0.9,0,z0+0.6],F('dot','flat','flat',{seed:9,back:1,walk:1,ph:t*6+1,hf:[-30,-60]}));if(r)parasol(c,r.hf.x,r.hf.y,r.s*0.9,t);}));
  depth(L);c.restore();dustHaze(c,1150,1700,0.25);cgrade(c,t,{flare:[300,420],v:0.5});tagC(c,540,420,'CAIRO · 1324',clamp((u-0.3)/0.3));
  const g=clamp((t-TW('legendary'))/0.5);if(g>0){c.save();c.globalCompositeOperation='screen';c.globalAlpha=g*0.6;for(let i=0;i<24;i++){const x=200+hash(i)*700,y=900+hash(i*3)*600,r=(4+hash(i*5)*8)*(0.6+0.4*Math.sin(t*6+i));const gg=c.createRadialGradient(x,y,0,x,y,r*4);gg.addColorStop(0,'rgba(255,240,180,1)');gg.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=gg;c.fillRect(x-r*4,y-r*4,r*8,r*8);}c.restore();}};
// 7 · "His caravan reportedly included thousands of people…" the endless line across the dunes
XM.caravan=(c,t,u,d)=>{XM.wide(c,t,u,d);tagC(c,540,420,'THOUSANDS OF PEOPLE',clamp((t-TW('thousands')+0.1)/0.3));};
// 8 · "…and camels carrying enormous amounts of gold." low and close: saddlebags heavy with gold pass the lens
XM.camels=(c,t,u,d)=>{camAt(c,'de_low',[-6,1.8,0],1.08,hh(t,3));const L=[];for(let i=0;i<5;i++){const x=6-i*4.6-((t*1.25)%4.6)+2,z=1.2+(i%2)*1.6;L.push(A_([x,0,z],()=>camel(c,[x,0,z],Math.PI,t,{seed:i*0.41})));}
  depth(L);c.restore();c.save();c.globalCompositeOperation='screen';for(let i=0;i<30;i++){const x=hash(i)*W,y=700+hash(i*3)*700,r=(3+hash(i*5)*7)*(0.5+0.5*Math.sin(t*7+i*2));const gg=c.createRadialGradient(x,y,0,x,y,r*5);gg.addColorStop(0,'rgba(255,240,180,0.9)');gg.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=gg;c.fillRect(x-r*5,y-r*5,r*10,r*10);}c.restore();
  sandDrift(c,t,0.7);cgrade(c,t,{flare:[900,520],top:'rgba(255,150,70,0.25)',v:0.5});tagC(c,540,420,'LOADED WITH GOLD',clamp((t-TW('gold',1)+0.4)/0.3));};
// 9 · "And when he arrived in Cairo," under the great gate; the city stares
XM.arrive=(c,t,u,d)=>{camAt(c,'ca_gate',[0,3.2,-24],1.0+u*0.04,{});const L=[];const mp=gp(lerp(560,535,u/d),lerp(1640,1500,u/d));
  L.push(A_(mp,()=>who(c,'musa',mp,F('dot','flat','flat',{seed:2,back:1,walk:1,ph:t*6}))));crowdAt(L,c,t,[gp(200,1380),gp(330,1330),gp(860,1360),gp(960,1420),gp(760,1300),gp(330,1270)],{off:0,face:p=>p[0]>mp[0]?-1:1});
    depth(L);c.restore();cgrade(c,t,{v:0.5});};
// 10 · "he started giving gold away." coins arc from his hand into the crowd
XM.giving=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.06,hh(t,2));const L=[];const tg=[[700,1300],[830,1270],[960,1320],[760,1220],[900,1210]];const HN=[];
  crowdAt(L,c,t,tg.map(([x,y])=>gp(x,y)),{off:3,eyes:i=>i%2?'happy':'wide',mouth:i=>i%2?'grin':'o',face:()=>-1,arm:i=>({hf:[-70,-170]}),after:(r,i)=>{HN[i]=r.hf;}});depth(L);c.restore();
  // throw cycle: wind down, sweep up-forward, release at the top
  const cyc=0.9,ph=(t%cyc)/cyc,sw=ph<0.55?eio(ph/0.55):1-eio((ph-0.55)/0.45);const r=who(c,'musa',[0,0,0],F('happy','up','grin',{seed:2,f:1,view:'3q',abs:{x:330,y:1640,s:2.4},hf:[lerp(70,180,sw),lerp(30,-150,sw)]}));
  if(r&&ph<0.5)goldPile(c,r.hf.x,r.hf.y+6,60,22,2);
  if(r)for(let n=0;n<3;n++){const age=((t%cyc)+n*cyc)-0.5*cyc;if(age<0||age>1.4)continue;const rel=Math.floor(t/cyc)-n;for(let i=0;i<14;i++){const tgt=HN[(i+rel)%HN.length];if(!tgt)continue;const k=clamp(age/1.0),sx=330+180*2.4*0.62,sy=1640-150*2.4*0.6-280;
      const x=lerp(sx,tgt.x+(hash(i+rel)-0.5)*60,k),y=lerp(sy,tgt.y-10,k)-Math.sin(k*Math.PI)*(220+hash(i*3+rel)*120);if(k<1)coin(c,x,y,19,t*6+i,Math.cos(t*9+i));}}
  motes(c,t,100,300,1000,1400,30,0.45);cgrade(c,t,{v:0.55});};
// 11–13 · officials / merchants / religious leaders: three quick two-shots, each receiving a bag of gold
function giftShot(c,t,u,kind,tag,plate,tgt){camAt(c,plate,tgt,1.08+u*0.06,hh(t,2));const L=[];crowdAt(L,c,t,[gp(240,1240),gp(860,1220)],{off:5});depth(L);c.restore();
  const s=2.2;const k=eo(clamp(u/0.45)),k2=eo(clamp((u-0.5)/0.35));const mid=545;// Musa reaches out holding the bag; the receiver takes it and pulls it in
  const mx=lerp(220,mid-20,k)-k2*60,rx=lerp(900,mid+30,k)+k2*40;
  const rm=who(c,'musa',[0,0,0],F('happy','up','smile',{seed:2,f:1,view:'3q',abs:{x:300,y:1500,s},hf:[lerp(110,(mid-20-300)/s*1.6,k)*(1-k2)+k2*60,-30+k2*60]}));
  const rr=who(c,kind,[0,0,0],F(u>0.35?'wide':'focus','up',u>0.35?'o':'flat',{seed:5,f:-1,view:'3q',abs:{x:790,y:1500,s},hf:[lerp(-40,(mid+30-790)/s*1.6,k)+k2*40,-30+k2*10]}));
  const hx=k2>0&&rr?rr.hf.x:(rm?rm.hf.x:mid),hy=k2>0&&rr?rr.hf.y:(rm?rm.hf.y:1100);goldBag(c,hx+(k2>0?-10:12),hy+110*1.15,1.15,true);
  cgrade(c,t,{v:0.55});tagC(c,540,420,tag,clamp(u/0.25));}
XM.officials=(c,t,u,d)=>giftShot(c,t,u,'emir','OFFICIALS','ca_gate',[0,3.2,-24]);
XM.merchants=(c,t,u,d)=>giftShot(c,t,u,'merch','MERCHANTS','sk_st',[0,0.95,0]);
XM.religious=(c,t,u,d)=>giftShot(c,t,u,'imam','RELIGIOUS LEADERS','sk_rev',[0,1.9,8]);
// 14 · "Almost everyone he met." the whole street holds gold
XM.everyone=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.0+u*0.03,hh(t,2));const L=[];const P=[[200,1500],[380,1420],[560,1500],[760,1420],[920,1480],[300,1300],[480,1280],[680,1280],[860,1300],[420,1200],[620,1190],[780,1200]];
  crowdAt(L,c,t,P.map(([x,y])=>gp(x,y)),{eyes:i=>i%2?'happy':'wide',mouth:i=>i%3?'grin':'o',arm:i=>({hf:[50,-120]}),after:(r,i)=>{if(r.hf)coin(c,r.hf.x,r.hf.y-14,10+r.s*8,t*3+i,Math.cos(t*4+i));}});depth(L);c.restore();
  coinRain(c,t,16,{sp:600,r:12});cgrade(c,t,{v:0.5});tagC(c,540,420,'EVERYONE',clamp((t-TW('everyone')+0.1)/0.3));};
// 15 · "…he flooded the city's gold market." a river of coins pours down the souk
XM.flood=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.0+u*0.02,dzSh(t,u>1.6?4:1));const L=[];const lvl=eio(clamp((t-TW('flooded')+0.6)/1.8));
  crowdAt(L,c,t,[gp(240,1480),gp(860,1440),gp(420,1340),gp(700,1320)],{eyes:()=>'shock',mouth:()=>'o',arm:i=>({hf:[i%2?-80:80,-170]})});depth(L);c.restore();
  if(lvl>0){const top=lerp(1950,1280,lvl);c.save();const g=c.createLinearGradient(0,top-200,0,H);g.addColorStop(0,'#fff2a0');g.addColorStop(0.35,'#e8b430');g.addColorStop(1,'#7a4a0a');c.fillStyle=g;c.beginPath();c.moveTo(0,H);
    for(let x=0;x<=W;x+=20){const y=top+Math.sin(x*0.012+t*3)*24+Math.sin(x*0.031-t*5)*10-Math.max(0,1-Math.abs(x-540)/400)*lerp(0,320,lvl)*0.5;c.lineTo(x,y);}c.lineTo(W,H);c.closePath();c.fill();
    for(let i=0;i<120;i++){const x=hash(i*1.7)*W,y=top+hash(i*2.3)*(H-top)+Math.sin(t*4+i)*6;coin(c,x,y-Math.max(0,1-Math.abs(x-540)/400)*lerp(0,160,lvl),9+hash(i*3)*12,t+i,0.3+hash(i)*0.5);}c.restore();}
  coinRain(c,t,40,{sp:900,r:14,x0:260,x1:820});cgrade(c,t,{v:0.5});stamp(c,'FLOODED',540,560,clamp((t-TW('flooded'))/0.3),'#c8201a',-0.1,100);};
// 16 · "Suddenly, gold became less valuable." the chart crashes over a stunned merchant
XM.valuable=(c,t,u,d)=>{camAt(c,'sk_rev',[0,1.9,8],1.08,hh(t,1.5));c.restore();regrade(c,'blur(8px) brightness(0.7)');const s=2.5;who(c,'merch',[0,0,0],F('sad','worried','frown',{seed:4,f:-1,view:'3q',abs:{x:780,y:1950,s:2.3}}));
  valueChart(c,t,clamp(u/0.4),{draw:clamp((t-TW('suddenly'))/1.6),arrow:clamp((t-TW('less'))/0.3),y:330,h:560});cgrade(c,t,{v:0.6});};
// 17 · "And this wasn't just some temporary rumor." whispers in a dark alley → stamped RECORDED
XM.rumor=(c,t,u,d)=>{camAt(c,'sk_rev',[0,1.9,8],1.12,{});c.restore();regrade(c,'brightness(0.55) saturate(0.8)');const s=2.4;
  who(c,'cai3',[0,0,0],F('sly','up','smirk',{seed:31,f:1,view:'3q',abs:{x:330,y:1720,s},hf:[110,-170]}));who(c,'cai2',[0,0,0],F('wide','up','o',{seed:34,f:-1,view:'3q',abs:{x:760,y:1720,s}}));
  cgrade(c,t,{v:0.7});const k=clamp((t-TW('rumor')+0.2)/0.3);if(k>0){txt(c,'RUMOR?',540,560,120,'#fff',{sw:20});c.save();c.strokeStyle='#c8201a';c.lineWidth=16;c.lineCap='round';seg(c,300,620,300+480*eo(clamp(k*1.5)),500);c.restore();}};
// 18 · "A historian named Al-Umari later recorded…" lamplight, the pen moving
XM.umari=(c,t,u,d)=>{camAt(c,'su_wide',[0,0.6,0],1.0+u*0.04,{});const p=gp(560,1460);const r=who(c,'umari',p,F('focus','flat','flat',{seed:41,crouch:30,hf:[30,110]}));
  boxOcc(c,'su_wide',[-0.98,0,-0.2],[0.98,0.48,0.8]);c.restore();beam(c,[[1080,520],[1080,900],[300,1700],[100,1500]],0.18);motes(c,t,300,500,1000,1500,40,0.5);cgrade(c,t,{v:0.6});
  tagC(c,540,420,'AL-UMARI · HISTORIAN',clamp((t-TW('al-umari')+0.1)/0.3));};
// 19 · "…gold prices in Egypt had fallen … and remained depressed for years." the manuscript itself
XM.record=(c,t,u,d)=>{camAt(c,'su_close',[0,0.5,0.2],1.05+u*0.02,{});c.restore();regrade(c,'blur(6px) brightness(0.75)');
  c.save();c.translate(540,1000);c.rotate(-0.05);c.fillStyle='#efe0bc';c.strokeStyle='#5a3a18';c.lineWidth=6;c.beginPath();c.roundRect(-400,-520,800,1040,10);c.fill();c.stroke();
  c.strokeStyle='rgba(60,40,20,0.75)';c.lineWidth=4;c.lineCap='round';for(let l=0;l<9;l++){const y=-440+l*52;c.beginPath();for(let x=330;x>-330;x-=6){const yy=y+Math.sin(x*0.09+l*2)*6*hash(Math.floor(x/30)+l*7)+(hash(Math.floor(x/14)+l)>0.8?-12:0);x===330?c.moveTo(x,yy):c.lineTo(x,yy);}c.stroke();}
  c.fillStyle='#8a2a1a';c.beginPath();c.arc(330,-460,12,0,TAU);c.fill();c.restore();valueChart(c,t,1,{draw:clamp((t-TW('fallen')+0.6)/2.2),title:'GOLD PRICE · EGYPT',x:170,y:900,w:740,h:470});
  const yr=Math.round(lerp(1324,1336,clamp((t-TW('remained'))/1.3)));if(t>TW('remained')-0.1){txt(c,String(yr),540,800,100,'#ffd23f',{sw:16});}cgrade(c,t,{v:0.6});};
// 20 · "Think about that." Musa at dusk above Cairo — slow push
XM.think=(c,t,u,d)=>{camAt(c,'ca_think',[0,11,-40],1.04+u*0.05,{});c.restore();regrade(c,'blur(3px)');cgrade(c,t,{flare:[260,760],v:0.6});who(c,'musa',[0,0,0],F('focus','flat','smirk',{seed:2,abs:{x:540,y:1740+(1-u/d)*20,s:2.8+u*0.08}}));};
// 21 · "Most kings tried to conquer cities to gain their wealth." the siege: fire, ladders, a charging army
XM.kings=(c,t,u,d)=>{camAt(c,'ca_dusk',[0,9,-40],1.06+u*0.03,dzSh(t,3));c.restore();regrade(c,'brightness(0.5) saturate(1.3) contrast(1.1)');
  c.save();c.globalCompositeOperation='lighter';c.filter='blur(26px)';for(let i=0;i<9;i++){const x=80+i*115+hash(i)*40,y=820+hash(i*3)*90,h=180+hash(i*5)*150+Math.sin(t*7+i)*20;const g=c.createLinearGradient(0,y,0,y-h);g.addColorStop(0,'rgba(255,170,60,0.55)');g.addColorStop(0.5,'rgba(220,70,20,0.35)');g.addColorStop(1,'rgba(80,10,0,0)');c.fillStyle=g;c.beginPath();c.moveTo(x-50,y);c.quadraticCurveTo(x-40+Math.sin(t*5+i)*20,y-h*0.6,x+Math.sin(t*3+i)*30,y-h);c.quadraticCurveTo(x+40,y-h*0.5,x+50,y);c.closePath();c.fill();}c.restore();
  c.save();c.filter='blur(30px)';for(let i=0;i<8;i++){const x=hash(i*2)*W,y=640-((t*50+hash(i)*500)%500);c.fillStyle='rgba(20,12,12,0.35)';c.beginPath();c.arc(x+Math.sin(t+i)*30,y,140+hash(i*3)*120,0,TAU);c.fill();}c.restore();
  c.save();for(let i=0;i<50;i++){const x=(hash(i*1.3)*W+Math.sin(t*2+i)*40),y=1000-((t*(90+hash(i)*120)+hash(i*2)*900)%900);c.fillStyle=`rgba(255,${150+hash(i)*80|0},60,${0.5+hash(i*3)*0.5})`;c.fillRect(x,y,3,3);}c.restore();
  // ranks of soldiers marching toward the fire (small, behind), spears up
  for(let row=0;row<3;row++)for(let i=0;i<9;i++){const s=0.85+row*0.22,x=((i*130+row*60+t*(40+row*20))%1300)-110,y=1310+row*70;const r=who(c,'king',[0,0,0],F('glare','angry','grit',{seed:70+i+row*9,f:-1,view:'3q',walk:1,ph:t*6+i,abs:{x,y,s},hf:[-40,-60]}));if(r){c.save();c.strokeStyle='#2a2018';c.lineWidth=4*s;seg(c,r.hf.x,r.hf.y+60*s,r.hf.x-10*s,r.hf.y-240*s);c.fillStyle='#b8b8c0';c.beginPath();c.moveTo(r.hf.x-10*s,r.hf.y-270*s);c.lineTo(r.hf.x-18*s,r.hf.y-236*s);c.lineTo(r.hf.x-2*s,r.hf.y-236*s);c.closePath();c.fill();c.restore();}}
  // the warlord in front: sword raised high, away from his face
  const r=who(c,'king',[0,0,0],F('rage','furious','yell',{seed:66,f:1,view:'3q',abs:{x:400,y:1760,s:2.5},hf:[190,-250]}));if(r){c.save();c.translate(r.hf.x,r.hf.y);c.rotate(0.35);const g=c.createLinearGradient(-8,0,8,0);g.addColorStop(0,'#8a8a92');g.addColorStop(0.5,'#f4f4f8');g.addColorStop(1,'#6a6a72');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.moveTo(-9,-20);c.lineTo(-9,-250);c.lineTo(0,-280);c.lineTo(9,-250);c.lineTo(9,-20);c.closePath();c.fill();c.stroke();c.fillStyle='#c8a040';c.fillRect(-36,-24,72,14);c.strokeRect(-36,-24,72,14);c.fillStyle='#4a2a18';c.fillRect(-7,-10,14,44);c.restore();}
  cgrade(c,t,{tint:'rgba(120,30,20,0.35)',v:0.75});tagC(c,540,420,'CONQUEST',clamp((t-TW('conquer')+0.1)/0.3),'#ff6a5a');};
// 22 · "Mansa Musa simply walked into one of the richest cities in the world..." calm, through the gate, the crowd bowing
XM.walked=(c,t,u,d)=>{camAt(c,'ca_gate',[0,3.2,-24],lerp(1.0,1.1,eo(clamp(u/d))),{});const L=[];const mp=gp(540,lerp(1440,1620,u/d));
  L.push(A_(mp,()=>who(c,'musa',mp,F('happy','up','smile',{seed:2,walk:1,ph:t*5}))));crowdAt(L,c,t,[gp(160,1400),gp(300,1350),gp(880,1360),gp(980,1440),gp(760,1300),gp(330,1270)],{eyes:()=>'closed',mouth:()=>'smile',arm:()=>({crouch:22}),face:p=>p[0]>mp[0]?-1:1});
  depth(L);c.restore();cgrade(c,t,{flare:[540,380],v:0.5});tagC(c,540,420,'ONE OF THE RICHEST CITIES',clamp((t-TW('richest')+0.1)/0.3));};
// 23 · "…and gave away so much gold that its value dropped." gold rain + the value counter collapsing
XM.dropped=(c,t,u,d)=>{camAt(c,'sk_st',[0,0.95,0],1.04,hh(t,2));const L=[];crowdAt(L,c,t,[gp(250,1480),gp(820,1460),gp(450,1340),gp(680,1320)],{eyes:()=>'shock',mouth:()=>'o'});depth(L);c.restore();
  coinRain(c,t,60,{sp:1000,r:15});cgrade(c,t,{v:0.5});const k=clamp((t-TW('value')+0.1)/0.6);c.save();c.fillStyle='rgba(12,10,8,0.85)';c.strokeStyle='#ffd23f';c.lineWidth=5;c.beginPath();c.roundRect(240,450,600,230,20);c.fill();c.stroke();
  txt(c,'VALUE OF GOLD',540,500,34,'#ffd23f',{stroke:false,ls:3});const bw=lerp(480,150,eo(k));c.fillStyle='#3a2e1a';c.fillRect(300,550,480,70);const g=c.createLinearGradient(300,0,780,0);g.addColorStop(0,'#fff0a0');g.addColorStop(1,'#d89a20');c.fillStyle=k>0.5?'#e0402a':g;c.fillRect(300,550,bw,70);c.strokeStyle='#ffd23f';c.lineWidth=3;c.strokeRect(300,550,480,70);
  if(k>0){c.fillStyle='#ff4a3a';c.beginPath();const ax=300+bw+50;c.moveTo(ax-20,560);c.lineTo(ax+20,560);c.lineTo(ax+20,590);c.lineTo(ax+36,590);c.lineTo(ax,626);c.lineTo(ax-36,590);c.lineTo(ax-20,590);c.closePath();c.fill();}c.restore();};
// 24 · "He didn't conquer Cairo." dusk over the city, Musa and his caravan resting outside the walls
XM.notconq=(c,t,u,d)=>{camAt(c,'ca_dusk',[0,9,-40],1.0+u*0.03,{});const L=[];for(let i=0;i<4;i++){const p=gp(200+i*200,1500+(i%2)*40);L.push(A_(p,()=>camel(c,p,0.4,t,{still:1})));}depth(L);c.restore();
  who(c,'musa',[0,0,0],F('happy','flat','smile',{seed:2,f:-1,view:'3q',abs:{x:700,y:1720,s:2.4}}));cgrade(c,t,{flare:[220,660],v:0.6});stamp(c,'NO WAR',540,540,clamp((t-TW('conquer',1)+0.1)/0.3),'#ffd23f',-0.1,96);};
// 25 · "He accidentally messed with its economy just by spending money." the caravan leaves at sunset → fade
XM.economy=(c,t,u,d)=>{camAt(c,'de_wide',[-10,2.2,0],1.0+u*0.03,{});caravan(c,t,{n:18,x0:-40,gap:4.4});c.restore();dustHaze(c,1050,1500,0.35);sandDrift(c,t,0.5);cgrade(c,t,{flare:[920,620],top:'rgba(255,130,60,0.3)',v:0.6});
  const k=clamp((t-TW('money')-0.4)/0.6);if(k>0){c.save();c.globalAlpha=k;txt(c,'MANSA MUSA',540,760,110,'#ffd23f',{sw:18,ls:6});txt(c,'KING OF MALI',540,870,48,'#fff',{sw:10,ls:6});c.restore();}fadeBlack(c,(t-(END-1.7))/1.7);};
const XSEQ=[['hook',0],['cheaper',TW('made')-0.15],['talking',LT(1)-0.1],['mali',LT(2)-0.1],['map',LT(3)-0.1],['journey',LT(4)-0.1],['caravan',LT(5)-0.1],['camels',TW('camels')-0.15],['arrive',LT(6)-0.1],['giving',LT(7)-0.1],
  ['officials',LT(8)-0.1],['merchants',TW('merchants')-0.1],['religious',TW('religious')-0.1],['everyone',LT(9)-0.1],['flood',LT(10)-0.1],['valuable',LT(11)-0.1],['rumor',LT(12)-0.1],['umari',LT(13)-0.1],['record',TW('that',2)-0.1],
  ['think',LT(14)-0.1],['kings',LT(15)-0.1],['walked',LT(16)-0.1],['dropped',LT(17)-0.1],['notconq',LT(18)-0.1],['economy',LT(19)-0.1]];
SHOTS.length=0;XSEQ.forEach(([k,t0],i)=>{const t1=i+1<XSEQ.length?XSEQ[i+1][1]:END;SHOTS.push([t0,(c,t)=>XM[k](c,t,t-t0,t1-t0)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
