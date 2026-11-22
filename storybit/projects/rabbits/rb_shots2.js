'use strict';
// ===================== Rabbits video · v2 scenes: real handshake, depth-sorted crowds, rabbits out of cages, the coach =====================
const COLS5=['white','grey','spot','brown','white'];
const handheld=(t,a=6)=>({x:Math.sin(t*1.7)*a+Math.sin(t*3.1)*a*0.4,y:Math.cos(t*1.3)*a*0.6});
// 6 · Tilsit: the two emperors actually shake hands (hands meet and pump together)
SH.tilsit=function(c,t){LIT('#ffe0a8','#2a3a4a');const z=pushZ(t,A(5),TW('chief')-0.1,1.0,1.1);river(c,t,{x:540,y:1080,z,mm:50},{pyr:0,palms:0,sunX:780,GY:1150,world:(c2,GY)=>{raft(c2,540,GY+260,1.15,t);
  const pump=Math.sin(t*9)*5,hy=60+pump;
  NAP({c:c2,x:430,y:GY+230,s:1.6,f:1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[69,hy+25],hb:[-10,92],seed:1,look:[1,0]});
  fig2(c2,{kind:'tsar',view:'front',x:650,y:GY+230,s:1.6,f:-1,t,eyes:'happy',brow:'flat',mouth:'smile',hf:[-69,hy+25],hb:[10,92],seed:2,look:[-1,0]});
  const hx=540,hy2=GY+230-(TH2+TOR2)*1.6+(hy+25)*1.6;c2.save();c2.strokeStyle='rgba(255,255,255,0.8)';c2.lineWidth=4;c2.lineCap='round';for(const d of [-1,1]){c2.beginPath();c2.arc(hx,hy2,26+Math.abs(pump)*1.5,d>0?-0.6:Math.PI-0.6,d>0?0.6:Math.PI+0.6);c2.stroke();}c2.restore();}});
  statTag(c,540,640,'TREATY OF TILSIT',GOLD_C,clamp((t-TW('diplomatic'))/0.3));vignette(c,0.4);};
const TH2=116,TOR2=84;
// 3 · "...because of a thousand rabbits." they pour over the hill crest toward camera instead of popping in
SH.reveal=function(c,t){LIT();const t0=A(2);const GYv=1300,z=pushZ(t,t0,B(2)+0.6,1.0,1.1);field(c,t,{x:540,y:1080,z,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+900,2.4);
  const prog=i=>clamp((t-t0-hash(i*9.1)*1.3)/1.1);
  swarm(c2,t,{n:200,x0:-200,x1:1280,y0:GY+30,y1:GY+1050,persp:P,seed:1,spd:11,flow:(x,y,i)=>{const p=prog(i);if(p<=0)return null;return {x:lerp(540+(x-540)*0.3,x,eo(p)),y:lerp(GY+8,y,eo(p))};},pose:i=>prog(i)<1?'hop':'front',f:i=>hash(i)>0.5?1:-1});}});
  const v=Math.round(eo(clamp((t-TW('thousand')+0.2)/0.9))*1000);if(t>TW('thousand')-0.2){c.save();c.translate(540,560);c.fillStyle='rgba(10,8,14,0.85)';c.beginPath();c.roundRect(-250,-90,500,180,30);c.fill();c.strokeStyle=GOLD_C;c.lineWidth=6;c.stroke();txt(c,v.toLocaleString('en-US'),0,4,120,'#fff',{sw:14});c.restore();}
  vignette(c,0.4);};
// 9 · "A rabbit hunt." one rabbit hops in from the side and sits; more far away
SH.hunt=function(c,t){LIT();const z=pushZ(t,A(6),A(7),1.05,1.12);field(c,t,{x:540,y:1100,z,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+700,2.4);
  const th=TW('hunt')-0.3,q=clamp((t-th)/0.7),rx=lerp(1300,620,eo(q));
  swarm(c2,t,{n:40,x0:-100,x1:1180,y0:GY+30,y1:GY+260,persp:P,pose:'sit',seed:31,actors:[
    {x:380,y:GY+700,rx:150,draw:()=>NAP({c:c2,x:380,y:GY+700,s:2.4,f:1,t,eyes:'happy',brow:'up',mouth:'smirk',propF:mUp(),hf:[24,60],hb:[-10,92],look:[1,1]})},
    {x:760,y:GY+640,rx:140,draw:()=>BERT({c:c2,x:760,y:GY+640,s:2.2,f:-1,t,eyes:'happy',brow:'up',mouth:'smile',hf:[10,92],hb:[-10,92],look:[-1,1]})},
    {x:rx,y:GY+820,rx:1,draw:()=>{if(q>0)rabbit(c2,rx,GY+820,pS(P,GY+820)*0.42,{pose:q<1?'hop':'sit',f:-1,t,col:'brown',seed:2,spd:12});}}]});}});vignette(c,0.4);};
// 11 · cages open: rabbits come OUT of each crate, hop forward and part around Napoleon and the soldier
SH.open=function(c,t){LIT();const to=TW('opened');const z=pushZ(t,A(11),B(11),1.0,1.06);field(c,t,{x:540+Math.sin(t*0.5)*20,y:1100,z,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+820,2.6);
  const cx=i=>170+i*240,cy=GY+330,op=i=>eo(clamp((t-to+0.2-i*0.08)/0.5));
  const L=[];for(let i=0;i<4;i++)for(let j=0;j<9;j++){const p=clamp((t-to-0.25-i*0.08-j*0.2)/1.6);if(p<=0)continue;const ang=(hash(i*9+j)-0.5)*1.6;L.push([cx(i)+Math.sin(ang)*p*380,cy+18+p*(300+hash(j*3+i)*420)]);}
  swarm(c2,t,{n:L.length,x0:0,x1:1,y0:0,y1:1,persp:P,spd:11,seed:5,flow:(x,y,i)=>({x:L[i][0],y:L[i][1]}),pose:'hop',f:i=>Math.sin((hash(i)-0.5))>0?1:-1,
    actors:[{x:600,y:GY+820,rx:150,draw:()=>NAP({c:c2,x:600,y:GY+820,s:2.6,f:1,t,eyes:'focus',brow:'flat',mouth:'smirk',propF:mCharge(),hf:[44,40],hb:[-10,92]})},
      {x:120,y:GY+380,rx:60,draw:()=>fig2(c2,{kind:'french',view:'front',x:120,y:GY+380,s:1.3,f:1,t,seed:3,hf:[40,40],hb:[-10,92]})},
      ...[0,1,2,3].map(i=>({x:cx(i),y:cy,rx:95,ry:24,draw:()=>cage(c2,cx(i),cy,1.0,op(i),{t,seed:i})}))]});}});
  vignette(c,0.4);};
// 12 · "But they did the exact opposite." open crates far back keep emptying; the whole field hops TOWARD him (we see his back)
SH.opposite=function(c,t){LIT();const t0=A(12);const z=pushZ(t,t0,B(12),1.0,1.1);field(c,t,{x:540,y:1100,z,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+900,2.6);
  const cg=[0,1,2,3,4,5].map(i=>({x:60+i*190,y:GY+150,rx:70,ry:20,draw:()=>cage(c2,60+i*190,GY+150,0.62,1,{t,seed:i+7})}));
  swarm(c2,t,{n:150,x0:-60,x1:1140,y0:GY+160,y1:GY+760,persp:P,spd:10,seed:4,flow:(x,y,i)=>{const sp=60+hash(i*3)*80;const yy=GY+165+((y-GY-165+(t-t0)*sp)%600);return {x:x+(540-x)*((yy-GY-160)/1800),y:yy};},pose:'hop',f:i=>hash(i*5)>0.5?1:-1,
    actors:[...cg,{x:540,y:GY+900,rx:160,draw:()=>NAP({c:c2,x:540,y:GY+900,s:2.6,f:1,t,back:true,hf:[44,40],hb:[-10,92]})}]});}});
  const k=eo(clamp((t-TW('opposite')+0.3)/0.5));c.save();c.translate(540,720);c.strokeStyle=RED_C;c.lineWidth=14;c.lineCap='round';for(const d of [-1,1]){const a=lerp(-0.25,Math.PI*0.5,k);c.save();c.rotate(d*a);c.beginPath();c.moveTo(0,0);c.lineTo(0,-200);c.moveTo(0,-200);c.lineTo(-40,-150);c.moveTo(0,-200);c.lineTo(40,-150);c.stroke();c.restore();}c.restore();vignette(c,0.4);};
// 13 · the charge: a wave rolls at camera, parts around Napoleon, the front rows pass IN FRONT of him
SH.charge=function(c,t){LIT();const t0=A(13);const hh=handheld(t,8);field(c,t,{x:540+hh.x,y:1100+hh.y,z:pushZ(t,t0,B(13),1.0,1.14),mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+1100,3.2);
  swarm(c2,t,{n:220,x0:-300,x1:1380,y0:GY+20,y1:GY+700,persp:P,spd:12,seed:7,flow:(x,y,i)=>{const sp=180+hash(i*7)*160;const yy=y+(t-t0)*sp;if(yy>GY+1500)return null;return {x:x+(x-540)*((yy-GY)/2400),y:yy};},pose:'hop',f:i=>hash(i)>0.5?1:-1,
    actors:[{x:540,y:GY+1100,rx:230,draw:()=>NAP({c:c2,x:540,y:GY+1100,s:3.2,f:1,t,eyes:'shock',brow:'up',mouth:'shout',hf:[40,-30+Math.sin(t*14)*6],hb:[-10,92],crouch:Math.abs(Math.sin(t*8))*6})}]});}});FX.speed=0.5;vignette(c,0.4);};
// 17 · "...mistaken Napoleon for the guy delivering lunch." the ring closes around him; some in front, some behind; he looks down
SH.lunch=function(c,t){LIT();const z=pushZ(t,A(17),B(17),1.0,1.1);field(c,t,{x:540,y:1100,z,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+760,2.5);
  const R=[];for(let i=0;i<22;i++){const a=i/22*TAU+0.15,rr=(i%2?300:410);R.push([540+Math.cos(a)*rr,GY+760+Math.sin(a)*(i%2?110:160)]);}
  const nb=110;swarm(c2,t,{n:nb+R.length,x0:-150,x1:1230,y0:GY+60,y1:GY+520,persp:P,pose:'front',seed:21,flow:(x,y,i)=>i<nb?{x,y}:{x:R[i-nb][0],y:R[i-nb][1]},f:(i,x)=>x<540?1:-1,
    actors:[{x:540,y:GY+760,rx:140,draw:()=>NAP({c:c2,x:540,y:GY+760,s:2.5,f:1,t,eyes:'wide',brow:'worried',mouth:'o',hf:[10,92],hb:[-10,92],look:[0,3]})}]});
  if(t>TW('lunch')-0.6)for(let i=0;i<R.length;i+=4){const k=back(clamp((t-TW('lunch')+0.6-i*0.03)/0.3));const [x,y]=R[i];const s=pS(P,y)*0.42;c2.save();c2.translate(x,y-150*s);c2.scale(k*s*1.6,k*s*1.6);c2.fillStyle='#fff';c2.strokeStyle=K2;c2.lineWidth=4;c2.beginPath();c2.ellipse(0,-40,52,40,0,0,TAU);c2.fill();c2.stroke();carrot(c2,-4,-66,0.55,t);c2.restore();}}});vignette(c,0.4);};
// 18 · sticks and whips: soldiers stand IN the crowd (depth sorted)
SH.sticks=function(c,t){LIT();const hh=handheld(t,5);field(c,t,{x:540+hh.x,y:1100+hh.y,z:1.0,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+730,2.2);const sw=Math.sin(t*9);
  swarm(c2,t,{n:200,x0:-150,x1:1230,y0:GY+150,y1:GY+1000,persp:P,pose:'hop',spd:10,seed:11,f:1,flow:(x,y,i)=>({x:((x+t*90+300)%1600)-300,y}),
    actors:[{x:300,y:GY+700,rx:120,draw:()=>fig2(c2,{kind:'french',view:'front',x:300,y:GY+700,s:2.2,f:1,t,seed:1,eyes:'squeeze',brow:'angry',mouth:'shout',propF:stickProp(160,-0.6+sw*0.7),hf:[50,-20],hb:[-10,92]})},
      {x:800,y:GY+760,rx:120,draw:()=>fig2(c2,{kind:'french',view:'front',x:800,y:GY+760,s:2.2,f:-1,t,seed:2,eyes:'squeeze',brow:'angry',mouth:'shout',propF:whipProp(-0.4+Math.cos(t*8)*0.5,t),hf:[-50,-20],hb:[10,92]})}]});}});vignette(c,0.4);};
// 20 · surrounded → around his legs (low 85mm, rabbits circle in front of and behind his boots) → he runs for his coach, they follow
SH.swarmed=function(c,t){LIT();const tl=TW('swarmed'),tc=TW('followed');
  if(t<tl-0.05){const z=pushZ(t,A(20),tl,1.0,1.08);field(c,t,{x:540+Math.sin(t*0.6)*30,y:1100,z,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+800,2.4);
      swarm(c2,t,{n:190,x0:-200,x1:1280,y0:GY+100,y1:GY+1100,persp:P,pose:'hop',spd:9,seed:23,f:i=>hash(i)>0.5?1:-1,flow:(x,y,i)=>{const cxs=[260,540,830][i%3],cys=[GY+640,GY+800,GY+660][i%3];const a=hash(i*3.3)*TAU+t*(0.5+hash(i)*0.4)*(i%2?1:-1),r=110+hash(i*7)*330;return i<120?{x:cxs+Math.cos(a)*r,y:cys+Math.sin(a)*r*0.35}:{x,y};},
        actors:[{x:260,y:GY+640,rx:100,draw:()=>fig2(c2,{kind:'french',view:'front',x:260,y:GY+640,s:2.0,f:1,t,seed:4,eyes:'wide',brow:'worried',mouth:'o',propF:mUp(),hf:[24,60],hb:[-10,92],look:[0,3]})},
          {x:830,y:GY+660,rx:100,draw:()=>fig2(c2,{kind:'french',view:'front',x:830,y:GY+660,s:2.0,f:-1,t,seed:5,eyes:'shock',brow:'up',mouth:'scream',hf:[-40,-20],hb:[10,92],look:[0,3]})},
          {x:540,y:GY+800,rx:110,draw:()=>NAP({c:c2,x:540,y:GY+800,s:2.4,f:1,t,eyes:'shock',brow:'up',mouth:'shout',hf:[10,92],hb:[-10,92],look:[0,3]})}]});}});vignette(c,0.4);return;}
  if(t<tc-0.05){const hh=handheld(t,10);const z=pushZ(t,tl,tc,1.15,1.25);field(c,t,{x:540+hh.x,y:1720+hh.y,z,mm:85},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+1050,3.4);
      const N=26,ring=[];for(let i=0;i<N;i++){const a=i/N*TAU+t*1.4*(i%2?1:-1)*0.6,r=(i%2?230:330);ring.push([540+Math.cos(a)*r,GY+1050+Math.sin(a)*90,a]);}
      const tip=Math.sin(t*11);
      swarm(c2,t,{n:N+60,x0:-200,x1:1280,y0:GY+800,y1:GY+1500,persp:P,seed:29,flow:(x,y,i)=>i<N?{x:ring[i][0],y:ring[i][1]}:{x:x+Math.sin(t*2+i)*40,y},pose:i=>i<N?(i%3===0?'sit':'hop'):'front',f:i=>i<N?(Math.cos(ring[i][2]+Math.PI/2)*(i%2?1:-1)>0?1:-1):(hash(i)>0.5?1:-1),spd:10,
        actors:[{x:540,y:GY+1050,rx:70,ry:30,draw:()=>NAP({c:c2,x:540,y:GY+1050,s:3.4,f:1,t,walk:0.6,ph:t*12,eyes:'shock',brow:'up',mouth:'scream',hf:[46,-34],hb:[-10,92],look:[tip*1.5,3],sweat:1})}]});}});vignette(c,0.4);return;}
  // run to the waiting coach; camera pans with him; the crowd follows
  const q=inv(tc,A(21),t);const nx=lerp(150,1200,eio(q));const camx=lerp(520,1150,eio(q));
  field(c,t,{x:camx,y:1100,z:1.0,mm:35},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const P=PSP(GY,GY+640,1.25),ppu=167*1.25;
    coach(c2,1280,GY+560,ppu,t,{door:1});
    swarm(c2,t,{n:70,x0:0,x1:1,y0:GY+420,y1:GY+900,persp:P,pose:'hop',spd:11,seed:33,f:1,flow:(x,y,i)=>{const lag=120+hash(i*4.7)*700;return {x:nx-lag+Math.sin(t*3+i)*20,y};},
      actors:[{x:nx,y:GY+640,rx:80,draw:()=>NAP({c:c2,x:nx,y:GY+640,s:1.25,f:1,t,run:1,ph:t*13,view:'side',eyes:'wide',brow:'worried',mouth:'scream',hf:[10,92],hb:[-10,92]})}]});}});vignette(c,0.4);};
// 21 · "Eventually, the emperor had enough." at the coach door: he fumes, then climbs the step and disappears inside; the door slams
SH.enough=function(c,t){LIT('#ffd0a0','#3a2418');const t0=A(21),t1=A(22);const tg=t0+1.25,tin=t1-0.55;
  const z=pushZ(t,t0,t1,1.0,1.08);field(c,t,{x:520,y:1500,z,mm:50},{sky:'sun',troops:0,smoke:0,world:(c2,GY)=>{const s=2.1,ppu=167*s,P=PSP(GY,GY+900,s);
    const door=t<tin?1:t<tin+0.12?0.5:0;const co=coach(c2,470,GY+760,ppu,t,{door,horses:true});
    const g=clamp((t-tg)/(tin-tg-0.05));const d=co.door,dx=(d.a.x+d.b.x)/2;
    const nx=lerp(770,dx,eio(clamp(g*1.6))),ny=lerp(GY+900,co.step.y-0.05*ppu,eio(clamp(g*1.8-0.5)))-Math.max(0,g-0.75)*0.7*ppu;
    const drawN=()=>{const back=g>0.25;NAP({c:c2,x:nx,y:ny,s:s*(1-Math.max(0,g-0.6)*0.12),f:1,t,back,walk:g>0&&g<1?1:0,ph:t*10,eyes:'squeeze',brow:'angry',mouth:'grit',hf:back?[-10,92]:[10,92],hb:back?[10,92]:[-10,92]});if(!back)steam(c2,nx,ny-s*262,s,t);};
    swarm(c2,t,{n:40,x0:-150,x1:1200,y0:GY+860,y1:GY+1250,persp:P,pose:i=>i%3?'sit':'front',seed:41,f:i=>hash(i)>0.5?1:-1,
      actors:[{x:nx,y:ny,rx:g>0.5?1:90,draw:()=>{if(t>=tin)return;if(g>0.62){const x0=Math.min(d.a.x,d.b.x),y0=Math.min(d.a.y,d.b.y);c2.save();c2.beginPath();c2.rect(x0,y0,Math.abs(d.b.x-d.a.x),Math.abs(d.b.y-d.a.y)+ppu*0.15);c2.clip();drawN();c2.fillStyle=`rgba(10,6,6,${(g-0.62)*1.6})`;c2.fillRect(x0,y0,Math.abs(d.b.x-d.a.x),Math.abs(d.b.y-d.a.y)+ppu*0.15);c2.restore();}else drawN();}}]});
    if(t>=tin){const p=clamp((t-tin-0.12)/0.6);for(let i=0;i<10;i++){c2.fillStyle=`rgba(220,200,170,${0.5*(1-p)})`;c2.beginPath();c2.arc(dx+(hash(i)-0.5)*ppu*1.2*(0.5+p),co.step.y-hash(i*3)*ppu*0.6-p*ppu*0.3,(0.1+p*0.3)*ppu,0,TAU);c2.fill();}}}});
  c.fillStyle='rgba(255,60,40,0.06)';c.fillRect(0,0,W,H);vignette(c,0.45);};
// 22 · "...retreating from a bunch of hungry bunnies." tracking shot: coach gallops, camera rides along, the swarm chases; his face at the window
SH.flee=function(c,t){LIT();const t0=A(22);const tb=TW('retreating');if(t<tb-0.1){c.fillStyle='#0c0e16';c.fillRect(0,0,W,H);const k=clamp((t-t0)/0.8);
    for(const [i,kind] of [[0,'british'],[1,'russian'],[2,'prussian'],[3,'austrian']]){const kk=back(clamp(k*4-i*0.6));if(kk<=0)continue;fig2(c,{kind,view:'front',x:180+i*240,y:1500,s:1.6*kk,f:1,t,seed:i,eyes:'open',brow:'angry',mouth:'grit',propF:mUp(),hf:[24,60],hb:[-10,92]});}
    statTag(c,540,700,'ENTIRE ARMIES',RED_C,k);vignette(c,0.5);return;}
  const tt=t-tb,cxw=300+tt*520;const hh=handheld(t,4);
  field(c,t,{x:cxw+200+hh.x,y:1480+hh.y,z:1.0,mm:50},{sky:'dusk',troops:0,smoke:0,world:(c2,GY)=>{const ppu=132,P=PSP(GY,GY+520,ppu/167);
    let co;swarm(c2,t,{n:90,x0:0,x1:1,y0:GY+380,y1:GY+860,persp:P,pose:'hop',spd:13,seed:51,f:1,flow:(x,y,i)=>({x:cxw-230-hash(i*4.7)*650+Math.sin(t*2+i)*30,y}),
      actors:[{x:cxw,y:GY+520,rx:1,draw:()=>{co=coach(c2,cxw,GY+520,ppu,t,{moving:1});inWindow(c2,co.win,t,{f:-1,eyes:'wide',brow:'worried',mouth:'o'});}}]});}});
  FX.speed=0.45;vignette(c,0.4);};
