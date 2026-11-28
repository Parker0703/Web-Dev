// ---------- utils ----------
const W=1080,H=1920,SS=2,GY=1500;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const inv=(a,b,v)=>clamp((v-a)/(b-a));
const eo=t=>1-Math.pow(1-clamp(t),3);
const ei=t=>Math.pow(clamp(t),3);
const eio=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const back=t=>{t=clamp(t);const c=2.2;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const spring=t=>t<=0?0:1-Math.exp(-7*t)*Math.cos(16*t);
function hash(n){const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);}
function nz(t,s=0){return Math.sin(t*1.7+s)*.5+Math.sin(t*3.1+s*2.3)*.3+Math.sin(t*5.3+s*.7)*.2;}
const A=i=>L[i].a, B=i=>L[i].b, WT=(i,k)=>L[i].w[Math.min(k,L[i].w.length-1)].t;
const TAU=Math.PI*2;
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function seg(c,ax,ay,bx,by){c.beginPath();c.moveTo(ax,ay);c.lineTo(bx,by);c.stroke();}

// ---------- global effect registers (filled by shots) ----------
let FX={shake:0,flash:0,flashCol:'#fff',speed:0,speedDir:0,red:0};

// ---------- sprites ----------
const SPR={};
function initSprites(){
  // fog puff
  let c=mk(512,512),g=c.getContext('2d');
  let gr=g.createRadialGradient(256,256,0,256,256,256);
  gr.addColorStop(0,'rgba(190,210,215,0.55)');gr.addColorStop(.5,'rgba(170,195,200,0.25)');gr.addColorStop(1,'rgba(160,185,190,0)');
  g.fillStyle=gr;g.fillRect(0,0,512,512);SPR.fog=c;
  // grain
  c=mk(512,512);g=c.getContext('2d');const id=g.createImageData(512,512);
  for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=9;}
  g.putImageData(id,0,0);SPR.grain=c;
  // cobbles tile 400x220 world at 2x
  c=mk(800,440);g=c.getContext('2d');g.scale(2,2);
  g.fillStyle='#14191c';g.fillRect(0,0,400,220);
  for(let r=0;r<8;r++)for(let k=0;k<9;k++){
    const x=k*48+(r%2)*24+ (hash(r*31+k)-.5)*6, y=r*28+4;
    const l=24+hash(r*7+k*3)*14;
    g.fillStyle=`rgb(${l+6},${l+12},${l+16})`;
    g.beginPath();g.ellipse(x+22,y+12,21,11.5,0,0,TAU);g.fill();
    g.fillStyle='rgba(150,180,190,0.10)';g.beginPath();g.ellipse(x+18,y+8,12,4,0,0,TAU);g.fill();
  }
  SPR.cobble=c;
  // brick texture 300x300 world
  c=mk(600,600);g=c.getContext('2d');g.scale(2,2);
  g.fillStyle='#1d1210';g.fillRect(0,0,300,300);
  for(let r=0;r<20;r++)for(let k=0;k<7;k++){
    const x=k*46+(r%2)*23-23,y=r*15;
    const v=hash(r*13+k*7);
    g.fillStyle=`rgb(${70+v*35},${38+v*16},${30+v*10})`;
    g.fillRect(x+1.5,y+1.5,43,12);
    g.fillStyle='rgba(255,220,190,0.06)';g.fillRect(x+1.5,y+1.5,43,3);
    if(hash(r*3+k)>.85){g.fillStyle='rgba(0,0,0,0.25)';g.fillRect(x+1.5,y+1.5,43,12);}
  }
  SPR.brick=c;
  // paper
  c=mk(1000,1000);g=c.getContext('2d');
  g.fillStyle='#e6d6b0';g.fillRect(0,0,1000,1000);
  for(let i=0;i<2500;i++){g.fillStyle=`rgba(120,90,40,${Math.random()*0.05})`;g.fillRect(Math.random()*1000,Math.random()*1000,2+Math.random()*30,1+Math.random()*3);}
  gr=g.createRadialGradient(500,500,250,500,500,720);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(110,70,20,0.45)');g.fillStyle=gr;g.fillRect(0,0,1000,1000);
  SPR.paper=c;
  // facades
  SPR.fac=[];
  const bases=['#5a3127','#4b2c25','#3f3a36','#563224','#46302a','#3b3330'];
  for(let v=0;v<6;v++){
    const fw=380,fh=1100;c=mk(fw*2,fh*2);g=c.getContext('2d');g.scale(2,2);
    const stone=v===2||v===5;
    if(stone){g.fillStyle=bases[v];g.fillRect(0,0,fw,fh);
      for(let r=0;r<fh/40;r++)for(let k=0;k<5;k++){g.fillStyle=`rgba(0,0,0,${0.08+hash(v*99+r*5+k)*0.12})`;g.fillRect(k*80+(r%2)*40-40,r*40,78,38);}
    } else {const p=g.createPattern(SPR.brick,'repeat');p.setTransform(new DOMMatrix().scale(.5));g.fillStyle=p;g.fillRect(0,0,fw,fh);
      g.fillStyle=bases[v]+'55';g.fillRect(0,0,fw,fh);}
    // cornice
    g.fillStyle='#2a2422';g.fillRect(-4,0,fw+8,26);g.fillStyle='#4a423c';g.fillRect(-4,22,fw+8,8);
    const wins=[];const rows=3,cols=2+(v%2);
    for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){
      const ww=72,wh=120,gx=(fw-cols*ww)/(cols+1);
      const x=gx+k*(ww+gx),y=90+r*230;const lit=hash(v*17+r*5+k*3)>.45;
      wins.push({x,y,w:ww,h:wh,lit});
      g.fillStyle='#1a1512';g.fillRect(x-8,y-8,ww+16,wh+16);
      g.fillStyle='#6b6258';g.fillRect(x-12,y+wh+6,ww+24,9);
      if(lit){const lg=g.createLinearGradient(0,y,0,y+wh);lg.addColorStop(0,'#ffcf7a');lg.addColorStop(1,'#c9802e');g.fillStyle=lg;}
      else{const lg=g.createLinearGradient(x,y,x+ww,y+wh);lg.addColorStop(0,'#1d2a33');lg.addColorStop(.5,'#2e3f4a');lg.addColorStop(1,'#141c22');g.fillStyle=lg;}
      g.fillRect(x,y,ww,wh);
      if(!lit){g.fillStyle='rgba(200,230,255,0.12)';g.beginPath();g.moveTo(x+8,y+wh);g.lineTo(x+30,y);g.lineTo(x+44,y);g.lineTo(x+22,y+wh);g.fill();}
      g.strokeStyle='#211a15';g.lineWidth=5;g.strokeRect(x,y,ww,wh);seg(g,x+ww/2,y,x+ww/2,y+wh);seg(g,x,y+wh/2,x+ww,y+wh/2);
    }
    // door
    const dx=fw*0.5-48+(v%3-1)*90,dy=fh-230;
    g.fillStyle='#120d0b';g.fillRect(dx-10,dy-14,116,244);
    const dg=g.createLinearGradient(dx,0,dx+96,0);dg.addColorStop(0,'#2b1b12');dg.addColorStop(.5,'#3b2618');dg.addColorStop(1,'#24160f');
    g.fillStyle=dg;g.fillRect(dx,dy,96,230);
    g.strokeStyle='rgba(0,0,0,0.5)';g.lineWidth=3;g.strokeRect(dx+12,dy+14,72,90);g.strokeRect(dx+12,dy+120,72,96);
    g.fillStyle='#b48a3c';g.beginPath();g.arc(dx+80,dy+120,5,0,TAU);g.fill();
    g.fillStyle='#544c44';g.fillRect(dx-16,fh-6,128,8);
    // drainpipe
    g.fillStyle='#1b1c1c';g.fillRect(fw-14,26,8,fh);
    // signs
    if(v===1){g.fillStyle='#2a1a10';g.fillRect(30,fh-330,fw-60,62);g.strokeStyle='#b8902f';g.lineWidth=3;g.strokeRect(36,fh-324,fw-72,50);
      g.fillStyle='#e8c45a';g.font='900 30px "Lora"';g.textAlign='center';;}
    if(v===3){g.fillStyle='#14202a';g.fillRect(40,fh-330,fw-80,58);g.fillStyle='#e9dcc0';g.font='900 34px "Lora"';g.textAlign='center';;}
    // grime gradient
    const gg=g.createLinearGradient(0,0,0,fh);gg.addColorStop(0,'rgba(0,0,0,0.35)');gg.addColorStop(.6,'rgba(0,0,0,0)');gg.addColorStop(1,'rgba(0,0,0,0.4)');g.fillStyle=gg;g.fillRect(0,0,fw,fh);
    SPR.fac.push({c,wins,door:{x:dx,y:dy,w:96,h:230},w:fw,h:fh});
  }
}

// ---------- camera ----------
// cam: {x,y,z}. world point (cam.x,cam.y) maps to screen centre.
function world(c,cam,fn){c.save();c.translate(W/2,H/2);c.scale(cam.z,cam.z);c.translate(-cam.x,-cam.y);fn();c.restore();}
function par(cam,f){return {x:cam.x*f,y:lerp(1000,cam.y,f),z:1+(cam.z-1)*f};}
function toScreen(cam,x,y){return {x:(x-cam.x)*cam.z+W/2,y:(y-cam.y)*cam.z+H/2};}

// ---------- environment ----------
function sky(c,t,o={}){
  const g=c.createLinearGradient(0,0,0,H);
  g.addColorStop(0,o.top||'#060b10');g.addColorStop(.55,o.mid||'#12212a');g.addColorStop(1,o.bot||'#1d3036');
  c.fillStyle=g;c.fillRect(-50,-50,W+100,H+100);
  if(o.moon!==false){
    const mx=o.mx??760,my=o.my??520;
    const mg=c.createRadialGradient(mx,my,0,mx,my,260);mg.addColorStop(0,'rgba(220,235,230,0.35)');mg.addColorStop(1,'rgba(220,235,230,0)');
    c.fillStyle=mg;c.fillRect(mx-260,my-260,520,520);
    c.fillStyle='#d9e4dc';c.beginPath();c.arc(mx,my,62,0,TAU);c.fill();
    c.fillStyle='rgba(150,170,160,0.35)';c.beginPath();c.arc(mx-18,my-10,14,0,TAU);c.arc(mx+20,my+18,9,0,TAU);c.fill();
    // clouds over moon
    for(let i=0;i<4;i++){const cx=((t*18+i*290)%1400)-200,cy=my-60+i*40;c.globalAlpha=.55;c.drawImage(SPR.fog,cx-220,cy-70,440,140);c.globalAlpha=1;}
  }
}
function roofs(c,x0,x1,t){
  // far rooftops, in parallax world coords
  c.fillStyle='#0b1418';
  const start=Math.floor(x0/220)-1,end=Math.floor(x1/220)+1;
  c.beginPath();c.moveTo(start*220,1600);
  for(let i=start;i<=end;i++){
    const x=i*220,h=520+hash(i)*220;
    c.lineTo(x,h+40);c.lineTo(x+20,h);c.lineTo(x+200,h);c.lineTo(x+220,h+40);
  }
  c.lineTo(end*220+220,1600);c.closePath();c.fill();
  for(let i=start;i<=end;i++){
    const x=i*220,h=520+hash(i)*220;
    c.fillStyle='#0b1418';
    for(let k=0;k<2;k++){const cx=x+40+k*110+hash(i*3+k)*30;c.fillRect(cx,h-60,26,62);c.fillRect(cx-4,h-66,34,10);
      // smoke
      for(let p=0;p<3;p++){const st=((t*0.25+p/3+hash(i+k))%1);c.globalAlpha=(1-st)*0.18;c.drawImage(SPR.fog,cx-30+st*60,h-90-st*220,90+st*120,90+st*120);c.globalAlpha=1;}
    }
    if(hash(i*7)>.6){c.fillStyle='rgba(255,190,90,0.55)';c.fillRect(x+70,h+70,16,22);}
    if(i%9===4){ // church spire
      c.fillStyle='#0a1216';c.fillRect(x+60,h-260,90,300);c.beginPath();c.moveTo(x+50,h-260);c.lineTo(x+105,h-520);c.lineTo(x+160,h-260);c.fill();
      c.fillStyle='rgba(255,200,110,0.5)';c.beginPath();c.arc(x+105,h-180,16,0,TAU);c.fill();
    }
  }
}
function facades(c,x0,x1,o={}){
  const start=Math.floor(x0/380)-1,end=Math.floor(x1/380)+1;
  for(let i=start;i<=end;i++){
    const v=Math.floor(hash(i*3.3+(o.seed||0))*6),F=SPR.fac[v];
    const x=i*380,y=GY-F.h;
    c.drawImage(F.c,x,y,F.w,F.h);
    if(o.onFacade)o.onFacade(i,x,y,F);
    // roof
    c.fillStyle='#0e1517';c.fillRect(x-2,y-46,F.w+4,48);
    for(let k=0;k<2;k++){const cx=x+60+k*200+hash(i+k)*40;c.fillStyle='#161d1f';c.fillRect(cx,y-120,40,76);c.fillStyle='#5a3a2a';c.fillRect(cx+6,y-136,10,18);c.fillRect(cx+22,y-132,10,14);}
  }
}
function ground(c,x0,x1,o={}){
  const p=c.createPattern(SPR.cobble,'repeat');p.setTransform(new DOMMatrix().scale(.5));
  c.fillStyle='#4a4a46';c.fillRect(x0,GY,x1-x0,34);
  c.fillStyle='#2b2c2a';for(let x=Math.floor(x0/120)*120;x<x1;x+=120)c.fillRect(x,GY,3,34);
  c.fillStyle='#202220';c.fillRect(x0,GY+34,x1-x0,10);
  c.fillStyle=p;c.fillRect(x0,GY+44,x1-x0,1400);
  const g=c.createLinearGradient(0,GY,0,GY+700);g.addColorStop(0,'rgba(0,0,0,0.45)');g.addColorStop(1,'rgba(40,70,80,0.15)');c.fillStyle=g;c.fillRect(x0,GY+44,x1-x0,1400);
}
function lamp(c,x,on,t,o={}){
  const top=GY-560;
  c.fillStyle='#121a17';c.fillRect(x-9,top+40,18,520);
  c.fillRect(x-24,GY-60,48,60);c.fillRect(x-16,GY-90,32,30);
  c.fillRect(x-36,top+40,72,10);
  // lantern
  c.fillStyle='#0f1512';c.beginPath();c.moveTo(x-34,top-50);c.lineTo(x+34,top-50);c.lineTo(x+22,top+40);c.lineTo(x-22,top+40);c.closePath();c.fill();
  c.beginPath();c.moveTo(x-40,top-50);c.lineTo(x,top-88);c.lineTo(x+40,top-50);c.fill();
  const lv=on;
  c.fillStyle=`rgba(${255},${lerp(60,214,lv)},${lerp(30,120,lv)},${0.25+0.75*lv})`;
  c.beginPath();c.moveTo(x-27,top-43);c.lineTo(x+27,top-43);c.lineTo(x+17,top+33);c.lineTo(x-17,top+33);c.closePath();c.fill();
  c.strokeStyle='#0f1512';c.lineWidth=4;seg(c,x,top-43,x,top+33);
  return {x,y:top-5,on:lv};
}
function glows(c,cam,list){
  c.save();c.globalCompositeOperation='lighter';
  for(const L of list){if(L.on<=0.02)continue;const s=toScreen(cam,L.x,L.y);const r=(L.r||520)*cam.z;
    const g=c.createRadialGradient(s.x,s.y,0,s.x,s.y,r);const a=L.on*(L.i||0.55);
    g.addColorStop(0,`rgba(255,200,110,${a})`);g.addColorStop(.25,`rgba(255,160,70,${a*0.35})`);g.addColorStop(1,'rgba(255,140,60,0)');
    c.fillStyle=g;c.fillRect(s.x-r,s.y-r,2*r,2*r);}
  c.restore();
}
// darkness with light holes (screen space)
let DARK=null,DG=null;
function darkness(c,amount,lights,cam){
  if(!DARK){DARK=mk(W*SS,H*SS);DG=DARK.getContext('2d');}
  const g=DG;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W*SS,H*SS);g.setTransform(SS,0,0,SS,0,0);
  g.globalCompositeOperation='source-over';g.fillStyle=`rgba(3,8,14,${amount})`;g.fillRect(0,0,W,H);
  g.globalCompositeOperation='destination-out';
  for(const L of lights){if(L.on<=0.02)continue;const s=cam?toScreen(cam,L.x,L.y+(L.dy??260)):L;const r=(L.hr||620)*(cam?cam.z:1);
    const gr=g.createRadialGradient(s.x,s.y,0,s.x,s.y,r);gr.addColorStop(0,`rgba(0,0,0,${L.on*0.95})`);gr.addColorStop(.55,`rgba(0,0,0,${L.on*0.5})`);gr.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=gr;g.fillRect(s.x-r,s.y-r,2*r,2*r);}
  g.globalCompositeOperation='source-over';
  c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(DARK,0,0);c.restore();
}
function fog(c,t,dens,o={}){ // screen-space drifting fog band
  const n=o.n||10,y0=o.y0??900,y1=o.y1??1900,sp=o.sp??20,sz=o.sz??900;
  c.save();c.globalAlpha=clamp(dens,0,1);
  for(let i=0;i<n;i++){
    const w=sz*(0.7+hash(i*5+(o.seed||0))*0.8);
    const x=((hash(i*9+(o.seed||0))*1800+t*sp*(0.6+hash(i)*0.8)+(o.off||0))%(W+w*1.2))-w*0.6;
    const y=lerp(y0,y1,hash(i*13+(o.seed||0)))+Math.sin(t*0.4+i)*30;
    c.drawImage(SPR.fog,x-w/2,y-w*0.3,w,w*0.6);
  }
  c.restore();
}
function specks(c,t,n=40,col='rgba(220,235,240,',seed=0){
  for(let i=0;i<n;i++){
    const x=(hash(i+seed)*W+t*(10+hash(i*3)*30))%W, y=(hash(i*7+seed)*H - t*(8+hash(i*5)*20)+H*10)%H;
    const a=0.15+0.35*(0.5+0.5*Math.sin(t*2+i));
    c.fillStyle=col+a+')';c.beginPath();c.arc(x,y,1.5+hash(i*11)*2.2,0,TAU);c.fill();
  }
}
function leaves(c,t,n=26,amt=1){
  for(let i=0;i<n;i++){
    const sp=200+hash(i)*260;
    const x=W+120-((t*sp+hash(i*3)*1600)%(W+400));
    const y=(hash(i*7)*H*0.9+ (t*sp*0.35)+Math.sin(t*3+i)*40)%H;
    c.save();c.globalAlpha=amt;c.translate(x,y);c.rotate(t*4*(hash(i)-.5)*3+i);
    c.fillStyle=['#c8702a','#a64a1e','#d99a3a','#7d3a18'][i%4];
    c.beginPath();c.ellipse(0,0,16,8,0,0,TAU);c.fill();c.strokeStyle='rgba(60,20,5,0.7)';c.lineWidth=2;seg(c,-16,0,16,0);
    c.restore();
  }
}
function speedLines(c,t,amt,dir=0,col='rgba(255,255,255,'){ // dir 0 radial, 1 horizontal
  if(amt<=0.01)return;
  c.save();
  for(let i=0;i<46;i++){
    const r=hash(i*3.7+Math.floor(t*20));
    if(dir===0){const a=hash(i)*TAU,r0=380+r*200,r1=r0+300+hash(i*2)*500;
      c.strokeStyle=col+(amt*0.5)+')';c.lineWidth=2+hash(i*5)*5;seg(c,W/2+Math.cos(a)*r0,H/2+Math.sin(a)*r0,W/2+Math.cos(a)*r1,H/2+Math.sin(a)*r1);}
    else{const y=hash(i*1.3+Math.floor(t*24))*H,x=hash(i*2.1+Math.floor(t*24))*W,l=200+hash(i)*500;
      c.strokeStyle=col+(amt*0.45)+')';c.lineWidth=2+hash(i*5)*4;seg(c,x,y,x+l*dir,y);}
  }
  c.restore();
}
function ring(c,x,y,r,a,col='rgba(255,255,255,',w=10){if(a<=0||r<=0)return;c.strokeStyle=col+a+')';c.lineWidth=w;c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();}
function dust(c,x,y,p,n=10,col='rgba(190,180,160,',seed=0){ // p 0..1 progress
  if(p<=0||p>=1)return;
  for(let i=0;i<n;i++){const a=-Math.PI*hash(i+seed);const d=eo(p)*(60+hash(i*3+seed)*120);
    c.fillStyle=col+((1-p)*0.6)+')';c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d*0.5,(10+hash(i*7)*16)*(0.5+p),0,TAU);c.fill();}
}
function grade(c,t,o={}){
  c.save();
  c.globalCompositeOperation='soft-light';c.fillStyle=o.tint||'rgba(40,110,120,0.35)';c.fillRect(0,0,W,H);
  c.globalCompositeOperation='source-over';
  const v=c.createRadialGradient(W/2,H*0.5,H*0.28,W/2,H*0.5,H*0.72);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(0,0,0,${o.vig??0.7})`);
  c.fillStyle=v;c.fillRect(0,0,W,H);
  const ox=(hash(Math.floor(t*10))*256)|0,oy=(hash(Math.floor(t*10)+.5)*256)|0;
  if(!SPR.gp)SPR.gp=c.createPattern(SPR.grain,'repeat');
  c.translate(-ox,-oy);c.fillStyle=SPR.gp;c.fillRect(0,0,W+ox,H+oy);
  c.restore();
}
