// ===== The man who survived two atomic bombs · Tsutomu Yamaguchi · style 2 =====
Object.assign(KIND2,{
  yama:{coat:'#7a7052',limb:'#ecebe6',hat:'none',hair:'#18140f',hairStyle:'sidepart',pants:'#5a5440',tie:'#3a3428',glasses:1},
  yamaOld:{coat:'#3a3c44',limb:'#ecebe6',hat:'none',hair:'#cfcfd2',hairStyle:'sidepart',pants:'#2a2c32',tie:'#6a2a2a',glasses:1},
  boss:{coat:'#34343e',limb:'#ecebe6',hat:'none',hair:'#2a2a2e',hairStyle:'slick',pants:'#24242c',tie:'#2a3a6a',glasses:1},
  worker:{coat:'#5a6a5a',limb:'#ecebe6',hat:'none',hair:'#1e1a16',hairStyle:'buzz',pants:'#3a443a'},
  woman3:{coat:'#6a4a5a',limb:'#ecebe6',hat:'none',hair:'#141014',hairStyle:'bun',pants:'#4a3440'},
  child:{coat:'#8a6a4a',limb:'#ecebe6',hat:'none',hair:'#1a1612',hairStyle:'fringe',pants:'#5a4a36'},
});
// glasses, bandage, burn marks on top of the face
const _face2T=face2;
face2=function(c,o,s,f,R,t){_face2T(c,o,s,f,R,t);const K=KIND2[o.kind]||{};if(o.back)return;
  if(o.burn){c.save();c.beginPath();c.arc(0,0,R-2*s,0,TAU);c.clip();const bx=o.view==='front'?R*0.5:(o.view==='side'?-f*R*0.1:-f*R*0.35);const g=c.createRadialGradient(bx,R*0.25,0,bx,R*0.25,R*0.55);g.addColorStop(0,'rgba(190,70,60,0.45)');g.addColorStop(1,'rgba(190,70,60,0)');c.fillStyle=g;c.fillRect(-R,-R,2*R,2*R);c.restore();}
  if(K.glasses){const fx=o.view==='front'?0:(o.view==='side'?null:f*7*s);c.strokeStyle='#1a1a1a';c.lineWidth=2.4*s;c.fillStyle='rgba(200,220,240,0.18)';
    if(fx===null){const ex=f*R*0.5;c.beginPath();c.ellipse(ex,-5*s,6*s,6.5*s,0,0,TAU);c.fill();c.stroke();seg(c,ex-f*6*s,-5*s,-f*R*0.15,-4*s);}
    else{for(const k of [-9.5,9.5]){c.beginPath();c.arc(fx+k*s,-3*s,7*s,0,TAU);c.fill();c.stroke();}seg(c,fx-2.5*s,-4*s,fx+2.5*s,-4*s);c.fillStyle='rgba(255,255,255,0.5)';for(const k of [-9.5,9.5]){c.beginPath();c.ellipse(fx+k*s+L2.dx*2.5*s,-6*s,2*s,1.2*s,-0.5,0,TAU);c.fill();}}}
  if(o.bandage){c.save();c.strokeStyle=K2;c.lineWidth=2.4*s;c.fillStyle='#f2f0ea';c.beginPath();c.moveTo(-R*1.02,-R*0.62);c.quadraticCurveTo(0,-R*0.85,R*1.02,-R*0.5);c.lineTo(R*1.0,-R*0.3);c.quadraticCurveTo(0,-R*0.62,-R*1.0,-R*0.42);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=1.4*s;for(let i=1;i<4;i++){c.beginPath();c.moveTo(-R*0.8+i*R*0.4,-R*0.72);c.lineTo(-R*0.7+i*R*0.4,-R*0.48);c.stroke();}
    c.fillStyle='rgba(190,80,70,0.35)';c.beginPath();c.ellipse((o.view==='front'?R*0.45:-f*R*0.3),-R*0.55,R*0.12,R*0.06,0,0,TAU);c.fill();
    const px=o.view==='front'?R*0.5:(o.view==='side'?-f*R*0.05:-f*R*0.3);c.fillStyle='#ece6d8';c.strokeStyle=K2;c.lineWidth=2*s;rr(c,px-R*0.16,R*0.18,R*0.32,R*0.2,R*0.04);c.fill();c.stroke();c.restore();}};
// ---------- props & sets ----------
function titleCard(c,t0,t,lines,y0,o={}){const p=t-t0;if(p<0||window.NOCAP)return;lines.forEach((ln,i)=>{const k=back(clamp((p-i*0.12)/0.3));if(k<=0)return;c.save();c.translate(W/2,y0+i*(o.lh||96));c.scale(k,k);txt(c,ln[0],0,0,ln[1],ln[2]||'#fff',{sw:ln[1]*0.2,ls:4});c.restore();});}
function scallop(c,cx,cy,rx,ry,n,bump,a0=0,a1=TAU,seed=0){c.beginPath();for(let i=0;i<=n;i++){const a=lerp(a0,a1,i/n),x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;if(!i){c.moveTo(x,y);continue;}const am=lerp(a0,a1,(i-0.5)/n),k=bump*(0.8+hash(i+seed)*0.5);c.quadraticCurveTo(cx+Math.cos(am)*rx*(1+k),cy+Math.sin(am)*ry*(1+k),x,y);}}
// mushroom cloud: solid sculpted masses (dust skirt, turbulent stem, cauliflower cap) — one outline each, inner billow shading
function mushroom(c,x,y,sc,p,t,o={}){if(p<=0)return;c.save();c.translate(x,y);c.scale(sc,sc);const h=lerp(80,900,eo(clamp(p))),cap=lerp(70,340,eo(clamp(p*1.2))),warm=o.warm??1,dr=t*0.25;
  c.save();c.globalCompositeOperation='lighter';const bg=c.createRadialGradient(0,-40,0,0,-40,700);bg.addColorStop(0,`rgba(255,190,110,${0.5*warm})`);bg.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=bg;c.fillRect(-700,-740,1400,1400);c.restore();
  const shade=(x0,y0,x1,y1,c0,c1,c2)=>{const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,c0);g.addColorStop(0.55,c1);g.addColorStop(1,c2);return g;};
  // dust skirt
  const sk=lerp(120,520,eo(clamp(p*1.4)));scallop(c,0,0,sk,sk*0.32,14,0.22,Math.PI,TAU,3);c.lineTo(sk,30);c.lineTo(-sk,30);c.closePath();c.fillStyle=shade(0,-sk*0.35,0,30,'#d8c4a8','#9a8670','#5a4a40');c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();
  c.save();c.clip();for(let i=0;i<9;i++){const px=(hash(i)-0.5)*sk*1.6,py=-hash(i*3)*sk*0.22;const g=c.createRadialGradient(px-20,py-20,4,px,py,90);g.addColorStop(0,'rgba(255,240,215,0.35)');g.addColorStop(1,'rgba(255,240,215,0)');c.fillStyle=g;c.fillRect(px-90,py-90,180,180);}c.restore();
  // stem with turbulent edges
  c.beginPath();c.moveTo(-80,-10);for(let i=1;i<=10;i++){const yy=-h*i/10,ww=lerp(80,55,i/10)+Math.sin(i*1.7+dr*4)*9;c.quadraticCurveTo(-ww-14,yy+h/20,-ww,yy);}for(let i=10;i>=1;i--){const yy=-h*i/10,ww=lerp(80,55,i/10)+Math.cos(i*1.3+dr*4)*9;c.lineTo(ww,yy);c.quadraticCurveTo(ww+14,yy+h/20,ww,yy+h/10);}c.closePath();
  c.fillStyle=shade(-80,0,80,0,'#7a6a5c','#efe0c8','#6a5a50');c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();c.save();c.clip();for(let i=0;i<7;i++){const yy=-h*(0.12+i*0.13);c.strokeStyle='rgba(90,70,60,0.35)';c.lineWidth=5;c.beginPath();c.moveTo(-60,yy);c.quadraticCurveTo(0,yy-24+Math.sin(dr*3+i)*8,60,yy);c.stroke();}c.restore();
  // collar ring just under the cap
  const cy=-h-cap*0.32;scallop(c,0,cy+cap*0.42,cap*0.62,cap*0.2,12,0.25,0,TAU,7);c.closePath();c.fillStyle=shade(0,cy+cap*0.22,0,cy+cap*0.62,'#c8a888','#8a6a5a','#4a3a36');c.fill();c.strokeStyle=K2;c.lineWidth=6;c.stroke();
  // cap: one cauliflower silhouette
  scallop(c,0,cy,cap,cap*0.62,16,0.16,0,TAU,11);c.closePath();const cg=c.createRadialGradient(-cap*0.25,cy-cap*0.4,cap*0.1,0,cy,cap*1.15);cg.addColorStop(0,'#fff2dc');cg.addColorStop(0.45,o.col||'#d6b896');cg.addColorStop(0.85,'#8a6e60');cg.addColorStop(1,'#5a4844');c.fillStyle=cg;c.fill();c.strokeStyle=K2;c.lineWidth=7;c.stroke();
  c.save();c.clip();for(let i=0;i<14;i++){const a=hash(i*5)*TAU,r=hash(i*9)*0.7,px=Math.cos(a)*cap*r,py=cy+Math.sin(a)*cap*0.55*r,pr=cap*(0.22+hash(i)*0.16);
      const g=c.createRadialGradient(px-pr*0.35,py-pr*0.45,pr*0.05,px,py,pr);g.addColorStop(0,'rgba(255,246,228,0.55)');g.addColorStop(0.55,'rgba(200,170,140,0.08)');g.addColorStop(1,'rgba(60,40,40,0)');c.fillStyle=g;c.beginPath();c.arc(px,py,pr,0,TAU);c.fill();}
    c.strokeStyle='rgba(90,64,56,0.35)';c.lineWidth=5;for(let i=0;i<6;i++){const a=i*1.1+dr;c.beginPath();c.arc(Math.cos(a)*cap*0.4,cy+Math.sin(a)*cap*0.2,cap*0.22,a,a+2.2);c.stroke();}
    const ug=c.createLinearGradient(0,cy,0,cy+cap*0.62);ug.addColorStop(0,'rgba(255,140,60,0)');ug.addColorStop(1,`rgba(255,130,50,${0.45*warm})`);c.fillStyle=ug;c.fillRect(-cap*1.3,cy,cap*2.6,cap);c.restore();
  c.save();c.globalCompositeOperation='lighter';c.strokeStyle=`rgba(255,200,140,${0.5*warm})`;c.lineWidth=6;scallop(c,0,cy,cap*0.97,cap*0.6,16,0.16,0.2,Math.PI-0.2,11);c.stroke();c.restore();
  c.restore();}
function sky45(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,o.top||'#6a9ad0');g.addColorStop(0.6,o.mid||'#b8d4ea');g.addColorStop(1,o.bot||'#e8e0cc');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<5;i++){c.fillStyle='rgba(255,255,255,0.7)';const x=((i*260+t*8)%1400)-160,y=200+i*90;c.beginPath();c.ellipse(x,y,140,34,0,0,TAU);c.ellipse(x+70,y-18,90,30,0,0,TAU);c.fill();}}
function jpHouse2(c,x,y,w,h,seed){c.save();c.translate(x,y);c.strokeStyle=K2;c.lineWidth=5;const wood=['#6a4a30','#5a3e28','#7a5838'][seed%3];
  c.fillStyle=wood;c.fillRect(-w/2,-h,w,h);c.strokeRect(-w/2,-h,w,h);c.fillStyle='rgba(0,0,0,0.25)';for(let i=0;i<Math.floor(w/22);i++)c.fillRect(-w/2+i*22,-h,3,h);
  for(let i=0;i<2;i++){const wy=-h*0.85+i*h*0.45;c.fillStyle='#efe4c8';c.fillRect(-w*0.38,wy,w*0.76,h*0.28);c.strokeRect(-w*0.38,wy,w*0.76,h*0.28);c.strokeStyle='#4a3420';c.lineWidth=3;for(let k=1;k<6;k++)seg(c,-w*0.38+k*w*0.76/6,wy,-w*0.38+k*w*0.76/6,wy+h*0.28);seg(c,-w*0.38,wy+h*0.14,w*0.38,wy+h*0.14);c.strokeStyle=K2;c.lineWidth=5;}
  for(const ry of [-h,-h*0.5]){c.fillStyle='#2e3036';c.beginPath();c.moveTo(-w/2-30,ry+10);c.quadraticCurveTo(0,ry-20,w/2+30,ry+10);c.lineTo(w/2+10,ry-34);c.quadraticCurveTo(0,ry-50,-w/2-10,ry-34);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,0.12)';c.lineWidth=3;for(let k=0;k<8;k++)seg(c,-w/2+k*w/7,ry-30,-w/2+k*w/7-6,ry+6);c.strokeStyle=K2;c.lineWidth=5;}
  c.restore();}
function jpStreet(c,t,cam,o={}){sky45(c,t,o.sky||{});
  world(c,par(cam,0.4),()=>{for(let i=-6;i<8;i++){c.fillStyle='#8a9aa8';c.fillRect(i*300,GY-420-hash(i)*120,280,420);}});
  world(c,cam,()=>{for(let i=-5;i<7;i++)jpHouse2(c,i*360+60,GY-10,320,360+hash(i*3)*80,i+5);
    const g=c.createLinearGradient(0,GY,0,GY+500);g.addColorStop(0,'#b8a888');g.addColorStop(1,'#8a7a62');c.fillStyle=g;c.fillRect(cam.x-2000,GY-10,4000,800);
    for(let i=-4;i<6;i++){const px=i*500+200;c.fillStyle='#4a3a2a';c.fillRect(px-8,GY-640,16,640);c.fillRect(px-50,GY-610,100,10);}
    c.strokeStyle='rgba(20,20,20,0.7)';c.lineWidth=3;for(let k=0;k<2;k++){c.beginPath();for(let i=-4;i<6;i++){const px=i*500+200;c.lineTo(px,GY-605+k*12);if(i<5)c.quadraticCurveTo(px+250,GY-560+k*12,px+500,GY-605+k*12);}c.stroke();}
    if(o.world)o.world(c);});}
function b29(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#3a3e46';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.ellipse(0,0,140,18,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-30,-4);c.lineTo(40,-4);c.lineTo(10,-150);c.lineTo(-10,-150);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-30,4);c.lineTo(40,4);c.lineTo(10,150);c.lineTo(-10,150);c.closePath();c.fill();c.stroke();
  for(const d of [-1,1])for(const k of [50,105]){c.fillRect(-6,d*k-8,30,16);}c.beginPath();c.moveTo(-130,-4);c.lineTo(-150,-50);c.lineTo(-120,-50);c.lineTo(-110,0);c.fill();c.stroke();c.restore();}
function parachute(c,x,y,s,t){c.save();c.translate(x,y+Math.sin(t*2)*4);c.rotate(Math.sin(t*1.5)*0.08);c.scale(s,s);c.fillStyle='#e8e4dc';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.arc(0,0,60,Math.PI,TAU);c.quadraticCurveTo(30,8,0,0);c.quadraticCurveTo(-30,8,-60,0);c.fill();c.stroke();
  c.lineWidth=2;for(const k of [-58,-25,25,58])seg(c,k,2,0,100);c.fillStyle='#4a4e56';c.lineWidth=3;rr(c,-14,96,28,40,6);c.fill();c.stroke();c.restore();}
function trainCar(c,x,y,w,t,o={}){c.save();c.translate(x,y);c.strokeStyle=K2;c.lineWidth=6;c.fillStyle='#3a2a20';rr(c,-w/2,-300,w,280,18);c.fill();c.stroke();c.fillStyle='#2a1e16';c.fillRect(-w/2,-320,w,30);c.strokeRect(-w/2,-320,w,30);
  for(let i=0;i<4;i++){const wx=-w/2+60+i*(w-120)/4;c.fillStyle=o.lit?'#e8d8a8':'#8aa0b0';c.fillRect(wx,-250,(w-120)/4-30,130);c.strokeRect(wx,-250,(w-120)/4-30,130);c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.moveTo(wx+10,-245);c.lineTo(wx+40,-245);c.lineTo(wx+10,-160);c.fill();}
  for(const k of [-w*0.32,-w*0.2,w*0.2,w*0.32]){c.save();c.translate(k,-10);c.rotate(t*12);c.fillStyle='#1a1a1a';c.beginPath();c.arc(0,0,42,0,TAU);c.fill();c.stroke();c.strokeStyle='#6a6a6a';c.lineWidth=4;for(let k=0;k<6;k++){const a=k*Math.PI/3;seg(c,0,0,Math.cos(a)*34,Math.sin(a)*34);}c.fillStyle='#8a8a8a';c.beginPath();c.arc(0,0,9,0,TAU);c.fill();c.restore();}c.restore();}
function office(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#c8b89a');g.addColorStop(1,'#8a7a62');c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='rgba(0,0,0,0.05)';for(let x=0;x<W;x+=60)c.fillRect(x,0,3,1500);
  const wx=o.wx??300,wy=o.wy??260,ww=520,wh=560;c.fillStyle='#4a3a28';c.fillRect(wx-20,wy-20,ww+40,wh+40);const sg=c.createLinearGradient(0,wy,0,wy+wh);sg.addColorStop(0,'#7aa8d8');sg.addColorStop(1,'#d8e4ee');c.fillStyle=sg;c.fillRect(wx,wy,ww,wh);
  c.fillStyle='#6a8a6a';c.beginPath();c.moveTo(wx,wy+wh*0.62);c.quadraticCurveTo(wx+ww*0.3,wy+wh*0.38,wx+ww*0.55,wy+wh*0.55);c.quadraticCurveTo(wx+ww*0.8,wy+wh*0.4,wx+ww,wy+wh*0.5);c.lineTo(wx+ww,wy+wh);c.lineTo(wx,wy+wh);c.fill();c.fillStyle='#4a6a8a';c.fillRect(wx,wy+wh*0.78,ww,wh*0.22);
  if(o.cloud)mushroom(c,wx+ww*0.6,wy+wh*0.72,0.32,o.cloud,t,{warm:1});
  c.fillStyle='#4a3a28';c.fillRect(wx+ww/2-8,wy,16,wh);c.fillRect(wx,wy+wh/2-8,ww,16);
  c.fillStyle='#5a4a38';c.fillRect(0,1500,W,420);c.fillStyle='rgba(255,220,170,0.2)';c.fillRect(0,1500,W,5);
  if(o.white){c.save();c.globalCompositeOperation='lighter';const wg=c.createRadialGradient(wx+ww/2,wy+wh/2,0,wx+ww/2,wy+wh/2,1500*o.white);wg.addColorStop(0,`rgba(255,255,245,${o.white})`);wg.addColorStop(1,'rgba(255,255,245,0)');c.fillStyle=wg;c.fillRect(0,0,W,H);c.restore();}}
function deskFront(c,x,yb,w){c.fillStyle='#6a4a2c';c.strokeStyle=K2;c.lineWidth=6;c.fillRect(x-w/2,yb,w,40);c.strokeRect(x-w/2,yb,w,40);c.fillStyle='#4a321e';c.fillRect(x-w/2+20,yb+40,w-40,500);c.strokeRect(x-w/2+20,yb+40,w-40,500);c.fillStyle='rgba(255,220,170,0.25)';c.fillRect(x-w/2,yb,w,6);}
function shelterBG(c,t){c.fillStyle='#0c0806';c.fillRect(0,0,W,H);const g=c.createRadialGradient(540,900,50,540,900,900);g.addColorStop(0,'#5a4430');g.addColorStop(1,'#140c06');c.fillStyle=g;c.beginPath();c.moveTo(-50,H);c.lineTo(-50,700);c.quadraticCurveTo(540,120,1130,700);c.lineTo(1130,H);c.closePath();c.fill();
  c.strokeStyle='#3a2414';c.lineWidth=40;for(const x of [120,960]){seg(c,x,H,x,560);}c.beginPath();c.moveTo(120,600);c.quadraticCurveTo(540,300,960,600);c.stroke();c.strokeStyle=K2;c.lineWidth=4;
  c.fillStyle='rgba(0,0,0,0.25)';for(let i=0;i<40;i++){c.beginPath();c.arc(hash(i)*W,600+hash(i*3)*1100,6+hash(i*5)*14,0,TAU);c.fill();}
  const fl=Math.sin(t*9)*0.08;c.save();c.globalCompositeOperation='lighter';const lg=c.createRadialGradient(540,700,0,540,700,700);lg.addColorStop(0,`rgba(255,190,110,${0.35+fl})`);lg.addColorStop(1,'rgba(255,160,80,0)');c.fillStyle=lg;c.fillRect(0,0,W,H);c.restore();
  c.strokeStyle='#2a2a2a';c.lineWidth=4;seg(c,540,480,540,610);c.fillStyle='#ffd890';c.strokeStyle=K2;c.lineWidth=4;c.beginPath();c.ellipse(540,640,26,36,0,0,TAU);c.fill();c.stroke();c.fillStyle='#3a3a3a';c.fillRect(522,600,36,12);}
function mapCard(c,p,t){panel(c,110,320,860,700,{r:40});c.save();c.beginPath();rr(c,110,320,860,700,40);c.clip();c.fillStyle='#1a3a5a';c.fillRect(110,320,860,700);
  const land=(pts)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle='#5a7a52';c.fill();c.strokeStyle='#2a3a28';c.lineWidth=5;c.stroke();};
  land([[980,340],[900,420],[820,480],[740,560],[660,600],[560,640],[470,700],[430,720],[450,760],[540,740],[640,700],[740,650],[840,610],[980,580]]);
  land([[300,760],[380,740],[440,780],[460,860],[430,960],[360,990],[300,960],[250,900],[220,840],[260,800]]);
  land([[480,770],[560,760],[620,790],[600,820],[520,815]]);c.restore();
  const hx=610,hy=650,nx=255,ny=865;c.strokeStyle='#ffd60a';c.lineWidth=8;c.setLineDash([22,14]);c.lineDashOffset=-t*60;const q=eo(clamp(p));c.beginPath();c.moveTo(hx,hy);const n=30;for(let i=1;i<=n*q;i++){const u=i/n;const x=lerp(hx,nx,u),y=lerp(hy,ny,u)-Math.sin(u*Math.PI)*-30;c.lineTo(x,y);}c.stroke();c.setLineDash([]);
  for(const [x,y,l,dx,dy] of [[hx,hy,'HIROSHIMA',0,-48],[nx,ny,'NAGASAKI',30,58]]){c.fillStyle='#ff3a2e';c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(x,y,15,0,TAU);c.fill();c.stroke();label(c,l,x+dx,y+dy,32,'#fff',900,3);}
  label(c,'~300 KM BY TRAIN',540,390,32,'rgba(255,255,255,0.75)',800,5);}
function dustBurst2(c,x,y,p){if(p<0||p>1.5)return;for(let i=0;i<16;i++){const a=-Math.PI*(0.05+hash(i)*0.9),d=eo(Math.min(1,p))*(60+hash(i*3)*220);c.fillStyle=`rgba(150,130,110,${0.5*(1-p/1.5)})`;c.beginPath();c.arc(x+Math.cos(a)*d*1.6,y+Math.sin(a)*d*0.4,14+hash(i*7)*24,0,TAU);c.fill();}}
const YA=(o)=>fig2(o.c,{kind:'yama',...o});
SH={};
SH.a=function(c,t){
  if(t<A(1)){ // from behind him: the first cloud rises over the city
    L2={dx:1,rim:'#ffc890',amb:'#6a4a30'};sky45(c,t,{top:'#c86a3a',mid:'#e8a870',bot:'#f0d0a0'});
    c.fillStyle='#4a3a30';for(let i=0;i<14;i++)c.fillRect(i*80,1220-hash(i)*120,76,500);mushroom(c,600,1220,0.75,inv(0,A(1),t)*0.8+0.2,t);
    c.fillStyle='#3a2a20';c.fillRect(0,1500,W,420);dof(c,2.5,d=>{YA({c:d,x:300,y:2700,s:5.6,f:1,t,back:1});});
  }else{ // side view: the train carries him toward the second cloud
    L2={dx:1,rim:'#ffc890',amb:'#4a3a30'};sky45(c,t,{top:'#7a8aa8',mid:'#c8c0b0',bot:'#e0d0b8'});const q=inv(A(1),A(2),t);
    mushroom(c,880,1220,0.55,q*0.9,t);c.fillStyle='#6a7a6a';c.beginPath();c.moveTo(0,1260);for(let x=0;x<=W;x+=60)c.lineTo(x,1200+Math.sin(x*0.01)*40);c.lineTo(W,1600);c.lineTo(0,1600);c.fill();
    c.fillStyle='#8a7a62';c.fillRect(0,1560,W,360);c.fillStyle='#3a3a3a';c.fillRect(0,1560,W,14);
    const tx=lerp(-200,420,q);trainCar(c,tx,1560,760,t);c.save();c.beginPath();c.rect(tx+20,1310,140,130);c.clip();c.fillStyle='#4a3a30';c.fillRect(tx+20,1310,140,130);YA({c,x:tx+90,y:1734,s:1.5,f:1,t,view:'side',eyes:'open',brow:'flat',mouth:'flat',bandage:1,burn:1});c.fillStyle='rgba(180,200,220,0.2)';c.fillRect(tx+20,1310,140,130);c.restore();
    label(c,'→',tx+460,1300,90,'#ffd60a',900,0);}
  vignette(c,0.45);specks(c,t,12,'255,230,200');
};
SH.b=function(c,t){ // front close-up; lucky or unlucky?
  L2={dx:-1,rim:'#ffc890',amb:'#4a4030'};dof(c,4,d=>{const g=d.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a2a34');g.addColorStop(1,'#0e0e14');d.fillStyle=g;d.fillRect(0,0,W,H);mushroom(d,820,1100,0.5,1,t,{warm:0.6});});
  YA({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:t>A(3)?'wide':'open',brow:t>A(3)?'up':'flat',mouth:t>A(3)?'o':'smile',sweat:t>A(3)?1:0});
  if(t>WT(2,9))tag(c,WT(2,9),t,'LUCKIEST?',300,600,'#34c759');if(t>A(3))tag(c,WT(3,1),t,'UNLUCKIEST?',760,720,'#ff3b30');vignette(c,0.5);
};
SH.c=function(c,t){ // Hiroshima, Aug 6 1945: side view, walking with his briefcase
  const cam=scam(lerp(-200,200,inv(A(5),A(9),t)),1.25,1760);L2={dx:-1,rim:'#fff0c8',amb:'#6a6a50'};
  jpStreet(c,t,cam,{world:c2=>{YA({c:c2,x:lerp(-260,260,inv(A(5),A(9),t)),y:GY+40,s:2.0,f:1,t,view:'side',walk:1,ph:t*6,eyes:'open',brow:'flat',mouth:'flat',propF:pBriefcase(),castLen:0.9});
    fig2(c2,{x:-600,y:GY+60,s:1.8,f:1,t,kind:'woman3',view:'side',walk:1,ph:t*5+1,eyes:'open',mouth:'flat'});fig2(c2,{x:520,y:GY+50,s:1.4,f:-1,t,kind:'child',view:'front',eyes:'happy',mouth:'smile'});}});
  vignette(c,0.4);band(c,A(5),t,'AUGUST 6, 1945 · HIROSHIMA',1760,{size:40,ls:6,end:B(6)+0.3});
  if(t>A(7))card(c,A(7),t,'TSUTOMU YAMAGUCHI','ENGINEER · MITSUBISHI',1760,{w:900,size:54,tag:'FROM NAGASAKI',end:B(8)});
};
SH.d=function(c,t){
  if(t<A(11)){ // the shipyard: his last day
    const cam=scam(lerp(0,120,inv(A(9),A(11),t)),1.1,1760);L2={dx:-1,rim:'#fff0c8',amb:'#6a6a50'};
    sky45(c,t,{});c.fillStyle='#5a6070';for(let i=0;i<4;i++){const x=150+i*260;c.fillRect(x,700,24,700);c.fillRect(x,700,220,20);c.strokeStyle='#5a6070';c.lineWidth=6;seg(c,x+12,700,x+200,560);seg(c,x+200,560,x+200,720);}
    c.fillStyle='#6a5a4a';c.fillRect(0,1380,W,540);c.fillStyle='#4a6a8a';c.fillRect(0,1380,W,80);
    YA({c,x:lerp(200,560,inv(A(9),A(11),t)),y:1820,s:2.6,f:1,t,view:'side',walk:1,ph:t*6,eyes:'open',brow:'flat',mouth:'flat',propF:pBriefcase(),castLen:0.6});
    tag(c,A(9)+0.3,t,'LAST DAY IN HIROSHIMA',540,600,'#ff9f0a');vignette(c,0.35);
  }else{ // the sky: a B-29 and a tiny parachute; he looks up (low angle, front)
    L2={dx:-1,rim:'#fff0c8',amb:'#6a6a50'};sky45(c,t,{top:'#4a7ab8',mid:'#9ac0e0'});const q=inv(A(11),B(11),t);b29(c,lerp(-200,1300,q),360,1.0);
    if(t>WT(11,3))parachute(c,lerp(560,600,inv(WT(11,3),B(11),t)),lerp(400,760,inv(WT(11,3),B(11)+1,t)),1.1,t);
    YA({c,x:540,y:2800,s:5.4,f:1,t,view:'front',eyes:'open',look:[0,-2],brow:'up',mouth:'o',propF:pBriefcase()});vignette(c,0.35);}
};
SH.e=function(c,t){
  if(t<A(13)){ // the flash
    const p=inv(A(12),A(12)+0.25,t),f2=1-inv(A(12)+0.4,B(12),t);c.fillStyle='#fff8e8';c.fillRect(0,0,W,H);c.save();c.globalAlpha=1-f2*0.85;sky45(c,t,{top:'#ffd8a0',mid:'#fff0d8',bot:'#fff8ee'});c.restore();
    c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(540,700,0,540,700,900);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
    titleCard(c,A(12)+0.2,t,[['BRIGHTER',110,'#ff8a1a'],['THAN THE SUN',90,'#1a1a1a']],820,{lh:120});
  }else{ // from behind him: cloud 3 km away, the shockwave knocks him down
    L2={dx:1,rim:'#ffb070',amb:'#6a3a20'};sky45(c,t,{top:'#9a5a3a',mid:'#d89a6a',bot:'#e8c090'});const q=inv(A(13),B(14),t);mushroom(c,560,1250,0.7,0.35+q*0.6,t);
    c.fillStyle='#4a3a30';for(let i=0;i<14;i++)c.fillRect(i*80,1260-hash(i)*80,76,400);c.fillStyle='#6a5444';c.fillRect(0,1500,W,420);
    const wave=inv(A(14),A(14)+0.5,t);if(wave>0){c.save();c.globalAlpha=1-wave;c.strokeStyle='rgba(255,230,190,0.9)';c.lineWidth=30;c.beginPath();c.ellipse(560,1500,200+wave*900,60+wave*250,0,Math.PI,TAU);c.stroke();c.restore();for(let i=0;i<20;i++){const p2=clamp(wave*1.4);c.fillStyle='rgba(120,100,80,0.5)';c.beginPath();c.arc(560+(hash(i)-0.5)*1400*p2,1500-hash(i*3)*300*p2,20+hash(i*5)*30,0,TAU);c.fill();}}
    const fall=eo(inv(A(14)+0.1,A(14)+0.5,t));if(t<A(14)+0.1){dof(c,2,d=>{YA({c:d,x:300,y:2650,s:5.0,f:1,t,back:1});});}else{c.save();c.translate(820,1760);c.rotate(-fall*Math.PI/2*0.98);YA({c,x:0,y:0,s:2.6,f:-1,t,view:'side',eyes:'closed',brow:'worried',mouth:'o',hf:[-50,lerp(40,-80,fall)],hb:[-30,lerp(40,-90,fall)]});c.restore();if(fall>0.9){dustBurst2(c,520,1760,t-A(14)-0.5);}}
    if(t>WT(13,2))counter(c,WT(13,2),t,'3 KM','FROM GROUND ZERO',540,1080,{end:A(14)+0.1});}
  vignette(c,0.4);
};
SH.f=function(c,t){ // injuries: front close-up
  L2={dx:-1,rim:'#ffb070',amb:'#5a3020'};dof(c,4,d=>{const g=d.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a2a24');g.addColorStop(1,'#120a08');d.fillStyle=g;d.fillRect(0,0,W,H);mushroom(d,820,1200,0.5,1,t,{warm:0.5});});
  YA({c,x:540,y:2700,s:5.6,f:1,t,view:'front',eyes:t>A(16)?'closed':'wide',brow:'worried',mouth:'frown',burn:t>A(17)?1:0,sweat:1});
  if(t<A(16)){for(let k=0;k<3;k++){const r=((t*1.6+k/3)%1);for(const sx of [220,860]){c.strokeStyle=`rgba(255,255,255,${(1-r)*0.7})`;c.lineWidth=6;c.beginPath();c.arc(sx,1360,40+r*80,sx<540?Math.PI*0.7:-0.4,sx<540?Math.PI*1.3:0.4);c.stroke();}}}
  if(t>A(16)&&t<A(17)){c.fillStyle=`rgba(255,255,255,${0.5*(1-inv(A(16),A(16)+0.8,t))})`;c.fillRect(0,0,W,H);}
  tag(c,WT(15,1),t,'EARDRUMS BURST',540,480,'#ff3b30');tag(c,WT(16,1),t,'BLINDED',540,580,'#ff9f0a');tag(c,WT(17,4),t,'BURNED',540,680,'#ff3b30');vignette(c,0.5);
};
SH.g=function(c,t){ // air-raid shelter
  L2={dx:1,rim:'#ffc890',amb:'#3a2414'};shelterBG(c,t);
  fig2(c,{x:220,y:1960,s:2.7,f:1,t,kind:'woman3',view:'front',crouch:40,eyes:'closed',brow:'worried',mouth:'frown'});fig2(c,{x:860,y:1980,s:2.7,f:-1,t,kind:'worker',view:'front',crouch:40,eyes:'half',brow:'worried',mouth:'flat',bandage:1});
  YA({c,x:540,y:2150,s:3.4,f:1,t,view:'front',crouch:50,eyes:'half',brow:'worried',mouth:'frown',bandage:1,burn:1,hf:[30,40],hb:[-30,40]});
  band(c,A(18)+0.2,t,'AIR-RAID SHELTER',1800,{size:42,ls:8});vignette(c,0.6);
};
SH.h=function(c,t){
  if(t<A(21)){ // dawn train: side view, he sits at the window, bandaged
    L2={dx:1,rim:'#ffc890',amb:'#5a4030'};sky45(c,t,{top:'#e8a070',mid:'#f0c8a0',bot:'#e8d8c0'});const sc=t*400;
    c.fillStyle='#7a8a6a';c.beginPath();c.moveTo(0,1100);for(let x=0;x<=W;x+=40)c.lineTo(x,1040+Math.sin((x+sc*0.2)*0.01)*50);c.lineTo(W,1500);c.lineTo(0,1500);c.fill();
    for(let i=0;i<6;i++){const x=((i*260-sc)%1560+1560)%1560-240;c.fillStyle='#4a3a2a';c.fillRect(x,820,14,560);}
    c.fillStyle='#8a7a62';c.fillRect(0,1480,W,440);trainCar(c,540,1560,1000,t);c.save();c.beginPath();c.rect(320,1310,190,130);c.clip();c.fillStyle='#4a3a30';c.fillRect(320,1310,190,130);YA({c,x:415,y:1812,s:1.8,f:1,t,view:'side',eyes:'half',brow:'worried',mouth:'flat',bandage:1,burn:1});c.fillStyle='rgba(180,200,220,0.2)';c.fillRect(320,1310,190,130);c.restore();
    band(c,A(19),t,'AUGUST 7',1820,{size:42,ls:10});vignette(c,0.45);
  }else{ mapCard(c,inv(A(21),B(22),t),t);label(c,'HOME',540,1100,120,'#fff',900,8);vignette(c,0.4);}
};
SH.i=function(c,t){ // Aug 9: he walks into the Nagasaki office, bandaged
  L2={dx:-1,rim:'#fff0c8',amb:'#6a5a40'};office(c,t,{wx:520});const q=inv(A(23),B(25),t);
  YA({c,x:lerp(80,420,q),y:1900,s:3.0,f:1,t,view:'side',walk:q<1?1:0,ph:t*4.5,eyes:'half',brow:'worried',mouth:'frown',bandage:1,burn:1,propF:pBriefcase(),castLen:0.5});
  band(c,A(23),t,'AUGUST 9 · NAGASAKI',1800,{size:42,ls:8});tag(c,A(24)+0.2,t,'BANDAGED',300,520,'#ff9f0a');vignette(c,0.4);
};
SH.j=function(c,t){ // two-shot: he describes the bomb, boss shakes his head
  L2={dx:-1,rim:'#fff0c8',amb:'#6a5a40'};dof(c,2.5,d=>{office(d,t,{wx:280});});deskFront(c,540,1560,800);
  const spread=t>A(27)?eo(inv(A(27),A(27)+0.4,t)):0;
  YA({c,x:300,y:2100,s:3.4,f:1,t,view:'front',cut:1560,eyes:t>A(28)?'wide':'open',brow:'up',mouth:'o',bandage:1,burn:1,hf:[lerp(40,80,spread),lerp(10,-60,spread)],hb:[lerp(-40,-80,spread),lerp(10,-60,spread)]});
  fig2(c,{x:790,y:2100,s:3.4,f:-1,t,kind:'boss',view:t>A(29)?'front':'side',cut:1560,eyes:t>A(29)?'half':'open',brow:t>A(29)?'flat':'up',mouth:t>A(29)?'smirk':'flat',tilt:t>A(29)?Math.sin(t*8)*0.1:0,hf:[-20,30],hb:[20,30]});
  if(t>A(27)&&t<A(29)){const k=back(inv(A(27),A(27)+0.3,t));c.save();c.translate(300,560);c.scale(k,k);c.fillStyle='#f3efe4';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.ellipse(0,0,220,130,0,0,TAU);c.fill();c.stroke();mushroom(c,0,80,0.18,1,t,{warm:0.6});c.restore();}
  if(t>A(29))stamp(c,WT(29,2),t,"DOESN'T BELIEVE",640,520,{size:64,rot:0.06});vignette(c,0.4);
};
SH.k=function(c,t){ // the window turns white
  L2={dx:1,rim:'#ffffff',amb:'#6a5a40'};const w=inv(A(31),A(31)+0.6,t);
  dof(c,2,d=>{office(d,t,{wx:280,white:w});});deskFront(c,540,1560,800);
  YA({c,x:300,y:2100,s:3.4,f:1,t,view:'front',cut:1560,eyes:w>0.2?'wide':'open',brow:'up',mouth:w>0.2?'scream':'o',bandage:1,burn:1,hf:[50,-20],hb:[-50,-20]});
  fig2(c,{x:790,y:2100,s:3.4,f:-1,t,kind:'boss',view:'front',cut:1560,eyes:w>0.2?'wide':'open',brow:'up',mouth:w>0.2?'o':'flat',hf:[-20,30],hb:[20,30]});
  if(w>0){c.fillStyle=`rgba(255,255,250,${w*0.8})`;c.fillRect(0,0,W,H);}vignette(c,0.3);
};
SH.l=function(c,t){
  if(t<A(35)){ // over his shoulder: the second cloud, 3 km away again
    L2={dx:1,rim:'#ffb070',amb:'#6a3a20'};sky45(c,t,{top:'#8a5a4a',mid:'#d0a080',bot:'#e8c8a0'});const q=inv(A(32),B(34),t);
    c.fillStyle='#5a6a5a';c.beginPath();c.moveTo(0,1180);c.quadraticCurveTo(300,1020,560,1140);c.quadraticCurveTo(800,1030,1080,1120);c.lineTo(1080,1500);c.lineTo(0,1500);c.fill();mushroom(c,560,1250,0.7,0.3+q*0.7,t);
    c.fillStyle='#4a6a8a';c.fillRect(0,1380,W,120);c.fillStyle='#5a4a38';c.fillRect(0,1500,W,420);
    dof(c,3,d=>{YA({c:d,x:250,y:2700,s:5.4,f:1,t,back:1,bandage:1});});
    if(t>A(33))counter(c,A(33),t,'3 KM','AGAIN',700,1080,{end:B(34)});
  }else{ // he survives again: rising from under the desk
    L2={dx:-1,rim:'#fff0c8',amb:'#6a5a40'};office(c,t,{wx:280,cloud:1});const up=eo(inv(A(36),A(36)+0.6,t));deskFront(c,540,1560,800);
    YA({c,x:540,y:lerp(2500,2150,up),s:3.4,f:1,t,view:'front',cut:1560,eyes:'wide',brow:'worried',mouth:'o',bandage:1,burn:1,sweat:1,hf:[60,-40],hb:[-60,-40]});
    if(t>A(36)+0.3)counter(c,A(36)+0.3,t,'2 BOMBS','1 MAN',540,560,{});}
  vignette(c,0.4);
};
SH.m=function(c,t){
  if(t<A(39)){ // old Yamaguchi; timeline and official recognition
    L2={dx:-1,rim:'#ffd8a0',amb:'#4a4040'};dof(c,4,d=>{office(d,t,{wx:260});});
    fig2(c,{x:540,y:2700,s:5.4,f:1,t,kind:'yamaOld',view:'front',eyes:'open',brow:'flat',mouth:'smile'});
    if(t<A(38)){panel(c,90,380,900,220,{r:40});const q=inv(A(37),B(37),t);c.fillStyle='rgba(255,255,255,0.15)';rr(c,160,520,760,16,8);c.fill();c.fillStyle='#ffd60a';rr(c,160,520,760*q,16,8);c.fill();label(c,'1945',190,470,34,'#fff',900,2);label(c,'2010',890,470,34,'#fff',900,2);label(c,Math.round(q*64)+' MORE YEARS',540,450,44,'#fff',900,4);}
    else{const k=back(inv(A(38),A(38)+0.4,t));c.save();c.translate(540,640);c.scale(k,k);c.rotate(-0.03);panel(c,-400,-250,800,500,{r:24,c0:'rgba(246,240,224,0.97)',c1:'rgba(232,224,204,0.97)'});
      label(c,'OFFICIALLY RECOGNISED',0,-160,40,'#7a1a1a',900,4);label(c,'SURVIVOR OF BOTH',0,-60,50,'#2a1a10',900,3);label(c,'HIROSHIMA & NAGASAKI',0,10,42,'#2a1a10',900,3);label(c,'THE ONLY ONE',0,100,36,'#7a1a1a',900,6);c.restore();}
  }else{ // closing card
    L2={dx:-1,rim:'#ffd8a0',amb:'#2a2a34'};const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1c26');g.addColorStop(1,'#08080c');c.fillStyle=g;c.fillRect(0,0,W,H);
    fig2(c,{x:540,y:2650,s:5.2,f:1,t,kind:'yamaOld',view:'front',eyes:'closed',brow:'flat',mouth:'smile'});
    titleCard(c,A(39),t,[['TSUTOMU YAMAGUCHI',76],['1916 – 2010',60,'#ffd60a'],['AGED 93',44]],460,{lh:100});
    if(t>A(41)){c.fillStyle=`rgba(0,0,0,${0.5*inv(A(41),END,t)})`;c.fillRect(0,0,W,H);}}
  vignette(c,0.5);specks(c,t,12,'255,230,200');
};
SHOTS=[[0,'a'],[A(2),'b'],[A(5),'c'],[A(9),'d'],[A(12),'e'],[A(15),'f'],[A(18),'g'],[A(19),'h'],[A(23),'i'],[A(26),'j'],[A(30),'k'],[A(32),'l'],[A(37),'m']];
IMPACTS=[[T_SLAM,10,0.3],[A(12),24,0.6,'#ffffff',0.9],[A(14),20,0.5],[A(31)+0.1,24,0.6,'#ffffff',0.9],[A(32),16,0.5],[A(36)+0.3,10,0.3],[WT(29,2),10,0.3],[A(38),10,0.3]];
