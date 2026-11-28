'use strict';
// ===================== London Beer Flood 1814 · cast, props, sets (StoryBit B) =====================
Object.assign(KIND2,{
  brewer:{coat:'#6a5236',limb:'#4a3a2a',hat:'cap',hair:'#5a3a22',vest:'#e8dcc0',stubble:true},
  brewer2:{coat:'#5a4a3a',limb:'#3e342a',hat:'none',hair:'#2a1a10',vest:'#ddd2b8'},
  clerk:{coat:'#2e3440',limb:'#2a2e38',hat:'none',hair:'#7a5a3a',vest:'#e8e0cc'},
  owner:{coat:'#1c1c26',limb:'#24242e',hat:'tophat',hair:'#9a9a9a',vest:'#c8a040',stache:true,buttons:true},
  poorM:{coat:'#5a4a3a',limb:'#4a4036',hat:'cap',hair:'#3a2a1a',stubble:true},
  poorM2:{coat:'#4a5040',limb:'#3a3a30',hat:'none',hair:'#6a4a2a'},
  poorW:{coat:'#7a4a3a',limb:'#ecebe6',hat:'shawl',skirt:'#5a4038'},
  poorW2:{coat:'#4a5a6a',limb:'#ecebe6',hat:'shawl',skirt:'#3a4048'},
  mournW:{coat:'#2c2a30',limb:'#ecebe6',hat:'shawl',skirt:'#1c1a20'},
  mournM:{coat:'#2a2a30',limb:'#26262c',hat:'none',hair:'#4a3020'},
  juror:{coat:'#4a4032',limb:'#3a3228',hat:'none',hair:'#6a5a4a',vest:'#9a8a6a'},
  juror2:{coat:'#2e3a30',limb:'#2a302a',hat:'none',hair:'#b8b0a0',vest:'#c8c0a8',stache:true},
  coroner:{coat:'#1e1e24',limb:'#1e1e24',hat:'none',hair:'#e8e4dc',vest:'#f0ece4',stache:true},
  official:{coat:'#2a2e44',limb:'#2a2e44',hat:'tophat',hair:'#6a6a6a',vest:'#ece8e0'},
  rescuer:{coat:'#6a5a40',limb:'#4a4034',hat:'cap',hair:'#4a3020',stubble:true},
});
// ---- top hat ----
{const _h=hat2b;hat2b=function(c,h,s,f,R,t){
  if(h==='tophat'){c.save();c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=4*s;const col='#1a1a22';
    c.fillStyle='#24242c';c.beginPath();c.ellipse(0,-R*0.68,R*1.22,R*0.24,0,0,TAU);c.fill();c.stroke();
    const g=c.createLinearGradient(-R*0.8,0,R*0.8,0);g.addColorStop(0,'#0e0e14');g.addColorStop(0.35,'#3a3a46');g.addColorStop(1,'#101016');c.fillStyle=g;
    c.beginPath();c.moveTo(-R*0.74,-R*0.7);c.lineTo(-R*0.84,-R*2.15);c.quadraticCurveTo(0,-R*2.3,R*0.84,-R*2.15);c.lineTo(R*0.74,-R*0.7);c.quadraticCurveTo(0,-R*0.6,-R*0.74,-R*0.7);c.closePath();c.fill();c.stroke();
    c.fillStyle='#5a3a2a';c.beginPath();c.moveTo(-R*0.75,-R*0.82);c.lineTo(R*0.75,-R*0.82);c.lineTo(R*0.77,-R*1.02);c.lineTo(-R*0.77,-R*1.02);c.closePath();c.fill();
    c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=3*s;seg(c,-R*0.45,-R*1.15,-R*0.5,-R*2.0);c.restore();return;}
  return _h(c,h,s,f,R,t);};}
const BEER='#b8741e',BEER_D='#6a3a10',FOAM='#f4ead0';
const BW=(c2,kind,x,y,s,t,o={})=>fig2(c2,{kind,x,y,s,f:o.f||1,t,view:o.view||'front',eyes:o.eyes||'open',brow:o.brow||'flat',mouth:o.mouth||'flat',seed:o.seed||0,...o});
const handAt=(x,y,s,hv)=>({x:x+hv[0]*s,y:y-200*s+hv[1]*s});
// ---------------- generic helpers ----------------
function brickWall(c,x,y,w,h,col,o={}){c.fillStyle=col;c.fillRect(x,y,w,h);const bh=o.bh||22,bw=o.bw||56;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
  c.strokeStyle=o.mortar||'rgba(40,24,16,0.35)';c.lineWidth=o.lw||2;for(let r=0;r*bh<h;r++){const yy=y+r*bh;seg(c,x,yy,x+w,yy);for(let k=-1;k*bw<w+bw;k++){const xx=x+k*bw+(r%2?bw/2:0);seg(c,xx,yy,xx,yy+bh);}}
  for(let i=0;i<w*h/9000;i++){c.fillStyle=`rgba(${hash(i*3.1)>0.5?'0,0,0':'255,220,180'},${0.06+hash(i)*0.08})`;c.fillRect(x+hash(i*1.7)*w,y+hash(i*2.3)*h,bw*0.9,bh*0.85);}c.restore();}
function sash(c,x,y,w,h,lit,o={}){c.fillStyle=lit?(o.lc||'#ffcf7a'):'#2a2a34';c.fillRect(x,y,w,h);if(lit){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x+w/2,y+h/2,0,x+w/2,y+h/2,w*1.4);g.addColorStop(0,'rgba(255,190,90,0.35)');g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(x-w,y-h*0.6,w*3,h*2.2);c.restore();}
  if(o.broken){c.fillStyle='#14141a';c.beginPath();c.moveTo(x+w*0.1,y+h*0.1);c.lineTo(x+w*0.6,y+h*0.25);c.lineTo(x+w*0.3,y+h*0.55);c.closePath();c.fill();}
  c.strokeStyle='#efe8da';c.lineWidth=Math.max(2,w*0.07);c.strokeRect(x,y,w,h);c.lineWidth=Math.max(1.5,w*0.04);seg(c,x,y+h/2,x+w,y+h/2);seg(c,x+w/3,y,x+w/3,y+h);seg(c,x+2*w/3,y,x+2*w/3,y+h);
  c.fillStyle='rgba(230,220,200,0.9)';c.fillRect(x-w*0.08,y+h,w*1.16,h*0.06);}
// a terraced Georgian house front: x,y=bottom-left, w,h
function townhouse(c,x,y,w,h,t,o={}){const fl=o.fl||3,fh=h/fl,col=o.col||'#8a5a40';brickWall(c,x,y-h,w,h,col,{bh:Math.max(8,fh*0.08),bw:Math.max(20,fh*0.2)});
  c.fillStyle=shd(col,-0.28);c.fillRect(x,y-h-fh*0.12,w,fh*0.12);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(x,y-h,w,h);
  const nw=o.nw||3,ww=w/(nw*2+0.4),wh=fh*0.5;for(let f2=0;f2<fl;f2++){for(let k=0;k<nw;k++){const wx=x+ww*0.7+k*ww*2,wy=y-h+f2*fh+fh*0.22;if(f2===fl-1&&k===o.door)continue;sash(c,wx,wy,ww,wh,hash(x*0.1+k*7+f2*3+(o.seed||0))<(o.lit??0.45),{broken:o.poor&&hash(k+f2*5+x)>0.7});}}
  if(o.door!=null){const dx=x+ww*0.7+o.door*ww*2,dw=ww,dh=fh*0.78;c.fillStyle=o.dcol||'#2a3a2a';c.fillRect(dx,y-dh,dw,dh);c.strokeStyle=K2;c.lineWidth=3;c.strokeRect(dx,y-dh,dw,dh);c.fillStyle='#e8d8a0';c.beginPath();c.arc(dx+dw/2,y-dh,dw/2,Math.PI,TAU);c.fill();c.stroke();}
  // chimneys + smoke
  for(const k of [0.15,0.8]){const cx=x+w*k;c.fillStyle=shd(col,-0.15);c.fillRect(cx-14,y-h-fh*0.12-44,28,44);c.strokeStyle=K2;c.lineWidth=2;c.strokeRect(cx-14,y-h-fh*0.12-44,28,44);
    if(o.smoke!==false)for(let i=0;i<5;i++){const a=((t*0.25+i/5+hash(cx))%1);c.fillStyle=`rgba(90,84,80,${0.28*(1-a)})`;c.beginPath();c.arc(cx+a*60+Math.sin(t+i)*8,y-h-fh*0.12-50-a*180,14+a*40,0,TAU);c.fill();}}
  if(o.poor){c.strokeStyle='rgba(30,20,10,0.5)';c.lineWidth=2;const ly=y-h+fh*1.05;c.beginPath();c.moveTo(x,ly);c.quadraticCurveTo(x+w/2,ly+30,x+w,ly);c.stroke();for(let i=0;i<4;i++){const lx=x+w*(0.15+i*0.2),sw=Math.sin(t*2+i)*4;c.fillStyle=['#d8d0c0','#9a6a5a','#c8c0a0','#6a7a8a'][i];c.beginPath();c.moveTo(lx,ly+12+i%2*4);c.lineTo(lx+30,ly+14);c.lineTo(lx+30+sw,ly+60);c.lineTo(lx+sw,ly+58);c.closePath();c.fill();}}}
function lampPost(c,x,y,s,t,lit=true){c.strokeStyle=K2;c.lineWidth=10*s;seg(c,x,y,x,y-380*s);c.strokeStyle='#2a2a30';c.lineWidth=6*s;seg(c,x,y,x,y-380*s);c.fillStyle='#2a2a30';c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(x-22*s,y-380*s);c.lineTo(x+22*s,y-380*s);c.lineTo(x+14*s,y-430*s);c.lineTo(x-14*s,y-430*s);c.closePath();c.fill();c.stroke();
  if(lit){c.fillStyle='#ffd88a';c.fillRect(x-12*s,y-424*s,24*s,38*s);c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-405*s,0,x,y-405*s,170*s);g.addColorStop(0,'rgba(255,200,110,0.55)');g.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=g;c.fillRect(x-170*s,y-575*s,340*s,340*s);c.restore();}}
function cobbles(c,GY,yb,o={}){const g=c.createLinearGradient(0,GY,0,yb);g.addColorStop(0,o.c0||'#5a5048');g.addColorStop(1,o.c1||'#3a3430');c.fillStyle=g;c.fillRect(-2000,GY,5200,yb-GY);
  for(let r=0;r<40;r++){const d=r/40,yy=GY+Math.pow(d,1.6)*(yb-GY),sz=0.3+d*2.2;for(let i=0;i<60;i++){const xx=-1200+i*80*sz*0.5+((r%2)*40*sz*0.5)+hash(r*7+i)*10;if(xx>2400)break;c.fillStyle=`rgba(${hash(r+i*3)>0.5?'20,16,14':'120,110,100'},0.22)`;c.beginPath();c.ellipse(xx,yy,16*sz,5*sz,0,0,TAU);c.fill();}}}
// ---------------- the London street (St Giles) ----------------
function londonSt(c,t,v={},o={}){const GY=o.GY||1240;c.save();cam(c,v);
  const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,o.night?'#14141e':'#3a3a4e');g.addColorStop(0.6,o.night?'#2a2a3a':'#a87a5a');g.addColorStop(1,o.night?'#3a3440':'#e0a870');c.fillStyle=g;c.fillRect(-2000,-800,5200,GY+800);
  // St Giles-in-the-Fields spire on the skyline + far roofs
  c.fillStyle=o.night?'#22222c':'#6a5a5a';c.fillRect(-2000,GY-700,5200,700);for(let i=0;i<40;i++){const x=-2000+i*130;c.fillRect(x,GY-760-hash(i)*120,110,140);}
  const sx=o.spireX??380;c.fillStyle=o.night?'#2a2a34':'#7a6a6a';c.fillRect(sx-40,GY-1150,80,450);c.beginPath();c.moveTo(sx-46,GY-1150);c.lineTo(sx,GY-1420);c.lineTo(sx+46,GY-1150);c.closePath();c.fill();c.fillRect(sx-52,GY-1160,104,20);
  if(o.behind)o.behind(c,GY);
  // the row of terraced houses facing camera
  const H0=o.houseH??820;let x=-1400;if(H0>0)for(let i=0;x<2600;i++){const w=300+hash(i*3.7)*140,h=H0*(0.82+hash(i*5.1)*0.3);townhouse(c,x,GY,w,h,t,{fl:h>H0?4:3,col:['#7a4a36','#8a5a42','#6a4232','#9a6a4a','#7a5a48'][i%5],door:i%3===1?1:null,poor:o.poor,lit:o.night?0.6:0.3,seed:i});x+=w;}
  c.fillStyle='#3a3430';c.fillRect(-2000,GY,5200,24);cobbles(c,GY+24,2600,o);
  if(o.lamps!==false)for(const lx of (o.lampX||[-200,1300]))lampPost(c,lx,GY+60,1,t,!!o.night);
  if(o.world)o.world(c,GY);c.restore();}
// ---------------- beer: flood surface, side wave, wall wave ----------------
function foamBlob(c,x,y,r,a=1){c.fillStyle=`rgba(244,234,208,${a})`;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
function floodSurf(c,t,x0,x1,ys,yb,o={}){const g=c.createLinearGradient(0,ys,0,yb);g.addColorStop(0,o.top||'#c8862a');g.addColorStop(0.25,BEER);g.addColorStop(1,BEER_D);c.fillStyle=g;c.globalAlpha=o.a??1;
  c.beginPath();c.moveTo(x0,yb);for(let x=x0;x<=x1;x+=20)c.lineTo(x,ys+Math.sin(x*0.02+t*5)*6+Math.sin(x*0.007-t*3)*8);c.lineTo(x1,yb);c.closePath();c.fill();c.globalAlpha=1;
  c.strokeStyle=K2;c.lineWidth=3;c.beginPath();for(let x=x0;x<=x1;x+=20){const y=ys+Math.sin(x*0.02+t*5)*6+Math.sin(x*0.007-t*3)*8;x===x0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  for(let i=0;i<Math.abs(x1-x0)/40;i++){const xx=x0+((hash(i*2.3)*(x1-x0)+t*(o.flow||120)*(0.5+hash(i)))%(x1-x0)),yy=ys+6+hash(i*5.1)*Math.min(160,yb-ys-10);foamBlob(c,xx,yy,3+hash(i)*7,0.55);c.fillStyle='rgba(244,234,208,0.35)';c.fillRect(xx-30,yy,60*hash(i*3),3);}}
// side-travelling breaking wave: front at xF, dir +1 → moving right; base y yb, height h. Body extends behind to xFar.
function sideWave(c,t,xF,yb,h,dir=1,o={}){const xFar=o.xFar??(xF-dir*2600),ys=yb-h*(o.tail??0.55);c.save();c.lineJoin='round';
  const P=[];P.push([xFar,yb+40]);P.push([xFar,ys]);for(let k=0;k<=12;k++){const u=k/12,x=lerp(xFar,xF-dir*h*0.5,u);P.push([x,ys-Math.pow(u,2.4)*h*0.4+Math.sin(x*0.02+t*6)*8]);}
  P.push([xF-dir*h*0.2,yb-h*0.98]);P.push([xF+dir*h*0.12,yb-h*0.9]);P.push([xF+dir*h*0.18,yb-h*0.72]);P.push([xF+dir*h*0.02,yb-h*0.66]);P.push([xF+dir*h*0.08,yb-h*0.3]);P.push([xF+dir*h*0.22,yb+40]);
  const g=c.createLinearGradient(0,yb-h,0,yb);g.addColorStop(0,'#d8963a');g.addColorStop(0.5,BEER);g.addColorStop(1,BEER_D);c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=5;c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.stroke();
  // light streaks on the face
  c.save();c.clip();c.strokeStyle='rgba(255,210,140,0.35)';c.lineWidth=6;for(let i=0;i<14;i++){const x=xF-dir*(40+i*h*0.09),y0=yb-h*0.8+hash(i)*40;c.beginPath();c.moveTo(x,y0);c.quadraticCurveTo(x+dir*30,y0+h*0.4,x-dir*10,yb);c.stroke();}c.restore();
  // foam lip + crest + spray
  for(let i=0;i<22;i++){const u=i/21,x=lerp(xF-dir*h*0.6,xF+dir*h*0.16,u),y=yb-h*(0.8+0.18*Math.sin(u*Math.PI))+(u>0.85?h*(u-0.85)*1.2:0);foamBlob(c,x+Math.sin(t*9+i)*5,y,h*(0.05+0.04*hash(i)),0.95);}
  c.strokeStyle=K2;c.lineWidth=3;for(let i=0;i<10;i++){const x=xF-dir*h*(0.1+i*0.1),y=yb-h*0.97+Math.sin(i)*6;c.beginPath();c.arc(x,y,h*0.05,Math.PI*1.1,Math.PI*1.9);c.stroke();}
  for(let i=0;i<26;i++){const a=(t*1.4+hash(i))%1,x=xF+dir*(h*0.1+a*h*0.6*hash(i*3)),y=yb-h*0.95+a*a*h*0.9-a*h*0.3*hash(i*7);foamBlob(c,x,y,4+hash(i*5)*10*(1-a),0.85*(1-a));c.fillStyle=`rgba(200,130,40,${0.8*(1-a)})`;c.beginPath();c.arc(x+12,y+16,3+hash(i)*5,0,TAU);c.fill();}
  // foam skirt at the base
  for(let i=0;i<16;i++)foamBlob(c,xF+dir*h*(0.05+hash(i)*0.25),yb+20-hash(i*3)*30,10+hash(i*7)*24,0.9);
  if(o.debris)for(let i=0;i<o.debris;i++){const x=xF-dir*(h*0.4+hash(i*4)*h*1.5),y=ys-10+hash(i*2)*h*0.3;stave(c,x,y,h*0.0016,t*2+i);}
  c.restore();}
function stave(c,x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='#9a6a3a';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.roundRect(-110*s,-12*s,220*s,24*s,6*s);c.fill();c.stroke();c.strokeStyle='rgba(60,30,10,0.5)';c.lineWidth=2;seg(c,-100*s,-3*s,100*s,-3*s);c.restore();}
// a wall of beer coming at the camera: spans whole width, top at yTop, foam lip
function wallWave(c,t,yTop,yb,o={}){c.save();const g=c.createLinearGradient(0,yTop,0,yb);g.addColorStop(0,'#e0a04a');g.addColorStop(0.35,BEER);g.addColorStop(1,BEER_D);c.fillStyle=g;c.beginPath();c.moveTo(-1500,yb);
  for(let x=-1500;x<=2600;x+=30)c.lineTo(x,yTop+Math.sin(x*0.006+t*3)*40+Math.sin(x*0.017-t*5)*16);c.lineTo(2600,yb);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=5;c.stroke();
  c.save();c.clip();c.strokeStyle='rgba(255,220,150,0.3)';c.lineWidth=8;for(let i=0;i<30;i++){const x=-1400+i*140+Math.sin(t*2+i)*20;c.beginPath();c.moveTo(x,yTop+60);c.quadraticCurveTo(x+40,(yTop+yb)/2,x-20,yb);c.stroke();}c.restore();
  for(let i=0;i<70;i++){const x=-1500+i*60,y=yTop+Math.sin(x*0.006+t*3)*40+Math.sin(x*0.017-t*5)*16;foamBlob(c,x,y+6,22+hash(i)*26,0.97);}
  for(let i=0;i<60;i++){const a=(t*1.2+hash(i*3))%1,x=-1200+hash(i)*3600,y=yTop-40-a*260+a*a*400;foamBlob(c,x,y,4+hash(i*7)*12*(1-a),0.9*(1-a));}
  if(o.debris)for(let i=0;i<o.debris;i++)stave(c,-600+hash(i*3.3)*2200,yTop+80+hash(i*1.1)*(yb-yTop-200),0.9+hash(i)*0.8,t*1.5+i*2);
  c.restore();}
// ---------------- brewery interior + the giant vat ----------------
function breweryIn(c,t,v={},o={}){const GY=o.GY||1400;c.save();cam(c,v);
  brickWall(c,-1600,-900,4300,GY+900,'#5a3a2c',{bh:30,bw:76,mortar:'rgba(20,12,8,0.45)'});
  for(let i=0;i<6;i++){const wx=-900+i*520;c.fillStyle='#1a1410';c.beginPath();c.moveTo(wx,GY-760);c.lineTo(wx,GY-1300);c.arc(wx+90,GY-1300,90,Math.PI,TAU);c.lineTo(wx+180,GY-760);c.closePath();c.fill();
    c.fillStyle=o.dusk?'#e8a868':'#c8d8e0';c.beginPath();c.moveTo(wx+14,GY-774);c.lineTo(wx+14,GY-1300);c.arc(wx+90,GY-1300,76,Math.PI,TAU);c.lineTo(wx+166,GY-774);c.closePath();c.fill();c.strokeStyle='#1a1410';c.lineWidth=6;seg(c,wx+90,GY-774,wx+90,GY-1376);seg(c,wx+14,GY-1050,wx+166,GY-1050);
    c.save();c.globalCompositeOperation='lighter';const gg=c.createLinearGradient(wx+90,GY-1300,wx+400,GY);gg.addColorStop(0,o.dusk?'rgba(255,180,110,0.22)':'rgba(220,235,255,0.18)');gg.addColorStop(1,'rgba(255,220,180,0)');c.fillStyle=gg;c.beginPath();c.moveTo(wx+14,GY-1300);c.lineTo(wx+166,GY-1300);c.lineTo(wx+560,GY);c.lineTo(wx+260,GY);c.closePath();c.fill();c.restore();}
  // beams
  c.fillStyle='#3a2618';for(let i=0;i<3;i++){c.fillRect(-1600,-700+i*40,4300,34);}c.fillStyle='#2a1a10';for(let i=0;i<9;i++)c.fillRect(-1500+i*480,-900,46,GY+900);
  // floor
  const fg=c.createLinearGradient(0,GY,0,GY+900);fg.addColorStop(0,'#5a4030');fg.addColorStop(1,'#3a2a1e');c.fillStyle=fg;c.fillRect(-1600,GY,4300,1200);c.strokeStyle='rgba(20,12,6,0.45)';c.lineWidth=2;for(let r=0;r<24;r++){const yy=GY+Math.pow(r/24,1.5)*900;seg(c,-1600,yy,2700,yy);}
  for(let i=-20;i<30;i++){c.beginPath();c.moveTo(540+i*40,GY);c.lineTo(540+i*260,GY+900);c.stroke();}
  if(o.world)o.world(c,GY);c.restore();dustMotes(c,t,26,'255,220,170',0.45);}
// barrel (standing): x,y bottom centre
function barrel(c,x,y,s,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';const g=c.createLinearGradient(-50,0,50,0);g.addColorStop(0,'#5a3418');g.addColorStop(0.4,'#a8703a');g.addColorStop(1,'#4a2a12');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=4;
  c.beginPath();c.moveTo(-40,0);c.quadraticCurveTo(-56,-65,-40,-130);c.lineTo(40,-130);c.quadraticCurveTo(56,-65,40,0);c.closePath();c.fill();c.stroke();c.fillStyle='#8a5a2a';c.beginPath();c.ellipse(0,-130,40,10,0,0,TAU);c.fill();c.stroke();
  c.strokeStyle='#2a2a2e';c.lineWidth=7;for(const yy of [-20,-110]){c.beginPath();c.moveTo(-47,yy);c.quadraticCurveTo(0,yy+8,47,yy);c.stroke();}c.restore();}
// giant vat: x = centre, y = base, w,h px. o.hoops count, o.snap = index of broken hoop (slid to the floor), o.burst 0..1, o.strain 0..1 (creak bulge)
function vat(c,x,y,w,h,t,o={}){const n=o.hoops||9,ry=w*0.07,bk=o.burst||0;c.save();c.lineJoin='round';
  if(bk>0){vatBurst(c,x,y,w,h,t,bk,o);c.restore();return;}
  const bul=(o.strain||0)*Math.sin(t*30)*2;
  // support stand + ladder + top catwalk
  c.fillStyle='#3a2414';c.fillRect(x-w*0.52,y-26,w*1.04,26);c.strokeStyle=K2;c.lineWidth=4;c.strokeRect(x-w*0.52,y-26,w*1.04,26);
  const y0=y-26,yt=y0-h;const g=c.createLinearGradient(x-w/2,0,x+w/2,0);g.addColorStop(0,'#4a2a12');g.addColorStop(0.3,'#b07a40');g.addColorStop(0.45,'#c8904e');g.addColorStop(1,'#3a200c');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=6;
  c.beginPath();c.moveTo(x-w/2-bul,y0);c.lineTo(x-w/2-bul,yt);c.ellipse(x,yt,w/2+bul,ry,0,Math.PI,TAU,false);c.lineTo(x+w/2+bul,y0);c.ellipse(x,y0,w/2+bul,ry,0,0,Math.PI,false);c.closePath();c.fill();c.stroke();
  // staves
  c.save();c.beginPath();c.rect(x-w/2-bul,yt,w+bul*2,h+ry);c.clip();c.strokeStyle='rgba(40,20,6,0.45)';c.lineWidth=2.5;for(let k=1;k<26;k++){const a=-Math.PI/2+k/26*Math.PI,xx=x+Math.sin(a)*w/2;c.beginPath();c.moveTo(xx,yt+Math.cos(a)*ry);c.lineTo(xx,y0+Math.cos(a)*ry);c.stroke();}c.restore();
  // top rim
  c.fillStyle='#6a4220';c.beginPath();c.ellipse(x,yt,w/2+bul,ry,0,0,TAU);c.fill();c.stroke();c.fillStyle='#4a2a10';c.beginPath();c.ellipse(x,yt+3,w/2-14,ry-6,0,0,TAU);c.fill();
  // hoops
  for(let i=0;i<n;i++){if(i===o.snap)continue;const yy=y0-h*(0.06+i*0.88/(n-1)),hh=Math.max(8,h*0.022);const hg=c.createLinearGradient(x-w/2,0,x+w/2,0);hg.addColorStop(0,'#1a1a1e');hg.addColorStop(0.4,'#6a6a72');hg.addColorStop(1,'#141418');c.fillStyle=hg;
    c.beginPath();c.moveTo(x-w/2-bul-3,yy-hh/2);c.ellipse(x,yy-hh/2,w/2+bul+3,ry,0,Math.PI,0,true);c.lineTo(x+w/2+bul+3,yy+hh/2);c.ellipse(x,yy+hh/2,w/2+bul+3,ry,0,0,Math.PI,false);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=3;c.stroke();
    c.fillStyle='#9a9aa2';for(let k=0;k<9;k++){const a=-Math.PI/2+(k+0.5)/9*Math.PI;c.beginPath();c.arc(x+Math.sin(a)*w/2,yy+Math.cos(a)*ry,Math.max(2,hh*0.18),0,TAU);c.fill();}}
  if(o.snap!=null&&o.snapK!=null){// the broken hoop: slides down and hits the floor
    const k=o.snapK,yy0=y0-h*(0.06+o.snap*0.88/(n-1)),yy=lerp(yy0,y-6,eo(clamp(k*1.2)));c.strokeStyle='#4a4a52';c.lineWidth=Math.max(8,h*0.022);c.beginPath();c.ellipse(x+w*0.05*clamp(k*2),yy,w/2+8,ry+k*10,k*0.06,0.1,Math.PI*0.95);c.stroke();c.strokeStyle=K2;c.lineWidth=2;c.stroke();}
  // ladder on the side
  if(o.ladder!==false){c.strokeStyle='#5a3a1a';c.lineWidth=8;const lx=x+w/2-w*0.08;seg(c,lx-24,y,lx-34,yt);seg(c,lx+24,y,lx+14,yt);c.lineWidth=5;for(let k=1;k<16;k++){const yy=y-k*(y-yt)/16;seg(c,lx-24-k*0.6,yy,lx+24-k*0.6,yy);}}
  if(o.label){c.fillStyle='rgba(30,16,6,0.85)';c.font=`900 ${Math.round(w*0.06)}px "Inter Display"`;c.textAlign='center';c.fillText(o.label,x,y0-h*0.5);}
  c.restore();}
// vat bursting: staves splay outward + a mass of beer erupts
function vatBurst(c,x,y,w,h,t,k,o){const y0=y-26,n=26;const lift=eo(clamp(k*1.4));
  // beer mass
  const mh=h*(1-0.55*lift),mw=w*(1+1.6*lift);const g=c.createLinearGradient(0,y0-mh,0,y0);g.addColorStop(0,'#e0a04a');g.addColorStop(1,BEER_D);c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=5;
  c.beginPath();c.moveTo(x-mw/2,y+20);c.quadraticCurveTo(x-mw*0.5,y0-mh*0.7,x-w*0.25,y0-mh);for(let i=0;i<=10;i++){const u=i/10;c.lineTo(x-w*0.25+u*w*0.5,y0-mh-Math.sin(u*Math.PI)*h*0.18*(1-lift)+Math.sin(t*14+i)*10);}c.quadraticCurveTo(x+mw*0.5,y0-mh*0.7,x+mw/2,y+20);c.closePath();c.fill();c.stroke();
  for(let i=0;i<24;i++){const u=i/23;foamBlob(c,x-w*0.3+u*w*0.6,y0-mh-Math.sin(u*Math.PI)*h*0.18*(1-lift)+Math.sin(t*14+i)*10,w*0.035+hash(i)*w*0.02,0.95);}
  // staves flying out (both sides) + hoops falling
  for(let i=0;i<n;i+=2){const a=-Math.PI/2+(i+0.5)/n*Math.PI,side=Math.sin(a),xs=x+side*w/2;const sp=0.6+hash(i*3.3)*0.8,tt=k*sp;const dx=side*tt*w*1.1,dy=-tt*h*0.5*(0.5+hash(i))+tt*tt*h*1.3;
    c.save();c.translate(xs+dx,y0-h/2+dy);c.rotate(side*tt*2.5+hash(i)*tt);c.fillStyle=hash(i)>0.5?'#a8703a':'#7a4a22';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.roundRect(-w*0.018,-h/2,w*0.036,h,6);c.fill();c.stroke();c.restore();}
  for(let i=0;i<3;i++){const yy=y0-h*(0.15+i*0.3)+k*k*h*0.9;c.strokeStyle='#3a3a42';c.lineWidth=Math.max(8,h*0.022);c.beginPath();c.ellipse(x+Math.sin(i*2)*k*w*0.3,Math.min(y,yy),w*(0.5+k*0.3),w*0.07+k*20,Math.sin(i)*k*0.5,0,TAU);c.stroke();}
  // spray
  for(let i=0;i<40;i++){const a=hash(i*2.1)*Math.PI*1.2-Math.PI*1.1,r=k*(w*0.6+hash(i)*w*0.9);const px=x+Math.cos(a)*r,py=y0-h*0.6+Math.sin(a)*r*0.8+k*k*h*0.8;foamBlob(c,px,py,(6+hash(i*7)*16)*(1-k*0.5),0.9*(1-k*0.6));c.fillStyle=`rgba(200,130,40,${0.9*(1-k*0.6)})`;c.beginPath();c.arc(px+10,py+12,5+hash(i)*8,0,TAU);c.fill();}}
// ---------------- cellar (basement wake) ----------------
function cellar(c,t,v={},o={}){const GY=o.GY||1420;c.save();cam(c,v);c.fillStyle='#2a221c';c.fillRect(-1200,-600,3500,3000);
  // stone blocks back wall + vault
  for(let r=0;r<18;r++)for(let k=0;k<16;k++){const x=-900+k*170+(r%2?85:0),y=GY-r*90;c.fillStyle=`rgb(${78+hash(r*16+k)*30|0},${66+hash(r+k*3)*24|0},${54+hash(k+r*7)*20|0})`;c.fillRect(x+3,y-87,164,84);}
  c.fillStyle='#14100c';c.beginPath();c.moveTo(-1200,-600);c.lineTo(2300,-600);c.lineTo(2300,GY-1100);c.quadraticCurveTo(540,GY-1700,-1200,GY-1100);c.closePath();c.fill();
  // street-level barred window (light from above)
  const wx=o.winX??760,wy=GY-1000;c.fillStyle=o.night?'#3a4458':'#9aa8b8';c.fillRect(wx-130,wy-80,260,140);c.strokeStyle='#1a1a1e';c.lineWidth=10;for(let k=-2;k<=2;k++)seg(c,wx+k*52,wy-80,wx+k*52,wy+60);c.strokeRect(wx-130,wy-80,260,140);
  c.save();c.globalCompositeOperation='lighter';const lg=c.createLinearGradient(wx,wy,wx-200,GY);lg.addColorStop(0,'rgba(200,210,230,0.18)');lg.addColorStop(1,'rgba(200,210,230,0)');c.fillStyle=lg;c.beginPath();c.moveTo(wx-130,wy+60);c.lineTo(wx+130,wy+60);c.lineTo(wx+60,GY);c.lineTo(wx-420,GY);c.closePath();c.fill();c.restore();
  // stairs coming down on the left to a door
  c.fillStyle='#3a2e24';for(let i=0;i<9;i++){c.fillRect(-460+i*42,GY-560+i*62,520-i*42,62);c.strokeStyle='#1a140e';c.lineWidth=3;c.strokeRect(-460+i*42,GY-560+i*62,520-i*42,62);}c.fillStyle='#1a120c';c.fillRect(-470,GY-900,180,340);
  // floor
  c.fillStyle='#3a3028';c.fillRect(-1200,GY,3500,1000);c.strokeStyle='rgba(0,0,0,0.3)';for(let r=0;r<12;r++){const yy=GY+Math.pow(r/12,1.5)*700;c.lineWidth=2;seg(c,-1200,yy,2300,yy);}
  if(o.world)o.world(c,GY);c.restore();}
function candle(c,x,y,s,t,lit=1,sd=0){c.fillStyle='#efe6d0';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(x-7*s,y-46*s,14*s,46*s);c.strokeRect(x-7*s,y-46*s,14*s,46*s);if(lit<=0)return;const fl=1+Math.sin(t*17+sd)*0.12;
  c.save();c.globalAlpha=lit;c.fillStyle='#ffd25a';c.beginPath();c.ellipse(x,y-56*s,5*s,12*s*fl,0,0,TAU);c.fill();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-56*s,0,x,y-56*s,150*s);g.addColorStop(0,'rgba(255,190,90,0.5)');g.addColorStop(1,'rgba(255,140,50,0)');c.fillStyle=g;c.fillRect(x-150*s,y-206*s,300*s,300*s);c.restore();}
// small closed wooden coffin on trestles (side view)
function coffin(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=4;c.fillStyle='#4a2e1a';for(const lx of [-90,80]){c.fillRect(lx,-110,12,110);c.strokeRect(lx,-110,12,110);}
  c.fillStyle='#a87444';c.beginPath();c.moveTo(-130,-110);c.lineTo(-115,-190);c.lineTo(125,-190);c.lineTo(135,-110);c.closePath();c.fill();c.stroke();c.fillStyle='#c88e58';c.beginPath();c.moveTo(-118,-190);c.lineTo(-100,-212);c.lineTo(112,-212);c.lineTo(128,-190);c.closePath();c.fill();c.stroke();c.fillStyle='#7a4a26';c.fillRect(-130,-112,265,22);c.strokeRect(-130,-112,265,22);
  c.fillStyle='#f0e8d8';c.fillRect(-150,-112,300,10);c.strokeRect(-150,-112,300,10);c.restore();}
// ---------------- courtroom (coroner's inquest) ----------------
function court(c,t,v={},o={}){const GY=o.GY||1400;c.save();cam(c,v);const g=c.createLinearGradient(0,-600,0,GY);g.addColorStop(0,'#3a2616');g.addColorStop(1,'#6a4428');c.fillStyle=g;c.fillRect(-1200,-800,3500,GY+800);
  for(let i=0;i<12;i++){const x=-1100+i*300;c.strokeStyle='rgba(20,10,4,0.55)';c.lineWidth=6;c.strokeRect(x+20,GY-900,260,560);c.strokeRect(x+20,GY-300,260,260);c.fillStyle='rgba(255,220,170,0.06)';c.fillRect(x+30,GY-890,120,540);}
  // royal crest above
  c.fillStyle='#c8a040';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(440,GY-1280);c.lineTo(640,GY-1280);c.lineTo(640,GY-1140);c.quadraticCurveTo(540,GY-1040,440,GY-1140);c.closePath();c.fill();c.stroke();c.fillStyle='#8a1a1a';c.fillRect(470,GY-1250,70,90);c.fillStyle='#1a2a6a';c.fillRect(540,GY-1250,70,90);
  c.fillStyle='#4a2c18';c.fillRect(-1200,GY,3500,1200);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2;for(let r=0;r<16;r++){const yy=GY+Math.pow(r/16,1.5)*800;seg(c,-1200,yy,2300,yy);}
  if(o.world)o.world(c,GY);c.restore();}
function jurybox(c,x0,x1,y,h){c.save();c.fillStyle='#5a3820';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(x0,y-h,x1-x0,h);c.strokeRect(x0,y-h,x1-x0,h);c.fillStyle='#7a5030';c.fillRect(x0-10,y-h-22,x1-x0+20,22);c.strokeRect(x0-10,y-h-22,x1-x0+20,22);
  c.strokeStyle='rgba(20,10,4,0.5)';c.lineWidth=4;for(let x=x0+30;x<x1-20;x+=140)c.strokeRect(x,y-h+24,110,h-48);c.restore();}
// ---------------- treasury office ----------------
function treasury(c,t,v={},o={}){const GY=o.GY||1400;c.save();cam(c,v);c.fillStyle='#2e4a3a';c.fillRect(-1200,-800,3500,GY+800);
  for(let s2=0;s2<5;s2++){const y=GY-1200+s2*170;c.fillStyle='#3a2414';c.fillRect(-900,y+140,800,22);for(let i=0;i<20;i++){c.fillStyle=['#6a2a2a','#2a3a5a','#5a4a2a','#3a5a3a'][(i+s2)%4];c.fillRect(-890+i*39,y+20+hash(i+s2*9)*20,32,120-hash(i+s2*9)*20);}}
  c.fillStyle='#9ab0c0';c.fillRect(1100,GY-1150,380,560);c.strokeStyle='#e8e0d0';c.lineWidth=12;c.strokeRect(1100,GY-1150,380,560);seg(c,1290,GY-1150,1290,GY-590);seg(c,1100,GY-870,1480,GY-870);
  c.fillStyle='#4a3020';c.fillRect(-1200,GY,3500,1200);if(o.world)o.world(c,GY);c.restore();}
function desk(c,x0,x1,y,h,o={}){c.save();c.fillStyle=o.top||'#6a4428';c.strokeStyle=K2;c.lineWidth=5;c.fillRect(x0-20,y-h-30,x1-x0+40,30);c.strokeRect(x0-20,y-h-30,x1-x0+40,30);c.fillStyle=o.col||'#4a2e1a';c.fillRect(x0,y-h,x1-x0,h);c.strokeRect(x0,y-h,x1-x0,h);
  c.strokeStyle='rgba(20,10,4,0.5)';c.lineWidth=4;for(let x=x0+30;x<x1-40;x+=200)c.strokeRect(x,y-h+30,170,h-60);c.restore();}
function coin(c,x,y,r,rot=0){c.save();c.translate(x,y);c.scale(Math.max(0.15,Math.abs(Math.cos(rot))),1);c.fillStyle='#e8b830';c.strokeStyle=K2;c.lineWidth=3;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#a87a10';c.lineWidth=2;c.beginPath();c.arc(0,0,r*0.72,0,TAU);c.stroke();
  c.fillStyle='#a87a10';c.font=`900 ${Math.round(r*1.1)}px "Inter Display"`;c.textAlign='center';c.textBaseline='middle';c.fillText('£',0,r*0.05);c.restore();}
function moneyBag(c,x,y,s,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.fillStyle='#c8a870';c.strokeStyle=K2;c.lineWidth=5;c.beginPath();c.moveTo(-30,-150);c.quadraticCurveTo(-110,-60,-80,0);c.quadraticCurveTo(0,20,80,0);c.quadraticCurveTo(110,-60,30,-150);c.closePath();c.fill();c.stroke();
  c.fillStyle='#a8885a';c.beginPath();c.moveTo(-34,-150);c.lineTo(-50,-185);c.lineTo(50,-185);c.lineTo(34,-150);c.closePath();c.fill();c.stroke();c.strokeStyle='#5a3a1a';c.lineWidth=7;seg(c,-36,-152,36,-152);
  c.fillStyle='#5a3a1a';c.font='900 80px "Inter Display"';c.textAlign='center';c.fillText('£',0,-36);c.restore();}
function wallClock(c,x,y,r,h,m){c.save();c.fillStyle='#4a2e1a';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.arc(x,y,r*1.14,0,TAU);c.fill();c.stroke();c.fillStyle='#f2ead8';c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();
  c.fillStyle='#2a1a10';c.font=`700 ${Math.round(r*0.2)}px "Lora",serif`;c.textAlign='center';c.textBaseline='middle';const RN=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];for(let i=0;i<12;i++){const a=i/12*TAU-Math.PI/2;c.fillText(RN[i],x+Math.cos(a)*r*0.78,y+Math.sin(a)*r*0.78);}
  const ah=((h%12)+m/60)/12*TAU-Math.PI/2,am=m/60*TAU-Math.PI/2;c.strokeStyle='#1a1a1a';c.lineCap='round';c.lineWidth=r*0.07;seg(c,x,y,x+Math.cos(ah)*r*0.48,y+Math.sin(ah)*r*0.48);c.lineWidth=r*0.045;seg(c,x,y,x+Math.cos(am)*r*0.7,y+Math.sin(am)*r*0.7);c.fillStyle='#1a1a1a';c.beginPath();c.arc(x,y,r*0.06,0,TAU);c.fill();c.restore();}
function calendarPage(c,x,y,s,k,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.fillStyle='#f4eee0';c.strokeStyle=K2;c.lineWidth=6;c.beginPath();c.roundRect(-220,-260,440,520,18);c.fill();c.stroke();c.fillStyle='#8a1a1a';c.beginPath();c.roundRect(-220,-260,440,130,[18,18,0,0]);c.fill();c.stroke();
  c.fillStyle='#fff';c.font='900 64px "Inter Display"';c.textAlign='center';c.fillText('OCTOBER',0,-170);c.fillStyle='#1a1a1a';c.font='900 250px "Inter Display"';c.fillText('17',0,120);c.font='700 60px "Lora",serif';c.fillText('1814',0,210);
  c.fillStyle='#2a2a2a';for(let i=0;i<5;i++){c.beginPath();c.arc(-160+i*80,-262,12,0,TAU);c.fill();}c.restore();}
// rubble pile
function rubble(c,x,y,w,t,sd=0){c.save();for(let i=0;i<46;i++){const u=hash(i*1.3+sd),hh=Math.sin(u*Math.PI)*w*0.32,xx=x-w/2+u*w,yy=y-hash(i*2.7+sd)*hh;c.save();c.translate(xx,yy);c.rotate(hash(i*4+sd)*3);
  if(i%5===0){c.fillStyle='#5a3a22';c.strokeStyle=K2;c.lineWidth=3;c.fillRect(-60,-8,120,16);c.strokeRect(-60,-8,120,16);}else{c.fillStyle=['#8a4a32','#7a3e2a','#9a5a3e'][i%3];c.strokeStyle=K2;c.lineWidth=2;c.fillRect(-18,-9,36,18);c.strokeRect(-18,-9,36,18);}c.restore();}c.restore();}
function lantern(c,x,y,s,t){c.save();c.translate(x,y);c.strokeStyle=K2;c.lineWidth=3*s;seg(c,0,0,0,14*s);c.fillStyle='#2a2a2e';c.fillRect(-14*s,14*s,28*s,6*s);c.fillStyle='#ffd27a';c.fillRect(-11*s,20*s,22*s,30*s);c.strokeRect(-11*s,20*s,22*s,30*s);c.fillStyle='#2a2a2e';c.fillRect(-14*s,50*s,28*s,6*s);
  c.globalCompositeOperation='lighter';const g=c.createRadialGradient(0,35*s,0,0,35*s,180*s);g.addColorStop(0,'rgba(255,200,110,0.55)');g.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=g;c.fillRect(-180*s,-145*s,360*s,360*s);c.restore();}
function shovel(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.strokeStyle=K2;c.lineWidth=9*s;seg(c,0,-60*s,0,140*s);c.strokeStyle='#8a6a3a';c.lineWidth=5*s;seg(c,0,-60*s,0,140*s);c.fillStyle='#7a7a82';c.strokeStyle=K2;c.lineWidth=3*s;c.beginPath();c.moveTo(-22*s,140*s);c.lineTo(22*s,140*s);c.lineTo(18*s,190*s);c.quadraticCurveTo(0,204*s,-18*s,190*s);c.closePath();c.fill();c.stroke();c.restore();}
function bigQB(c,x,y,k,t){if(k<=0)return;c.save();c.translate(x,y+Math.sin(t*3)*8);c.scale(k,k);txt(c,'?',0,90,340,'#ffd23f',{sw:30});c.restore();}
