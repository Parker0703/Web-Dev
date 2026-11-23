'use strict';
const WK=(t,sp=7,o=0)=>({walk:1,ph:t*sp+o});
// ===================== The Milgram experiment · Style 5 =====================
function lbl(c,t0,t,text,y=1560,o={}){const p=t-t0;if(p<0||(o.end&&t>o.end))return;const k=back(clamp(p/0.22));c.save();c.translate(o.x||540,y);c.scale(k,k);c.rotate(o.rot??-0.03);txt(c,text,0,0,o.size||110,o.col||'#fff',{ls:6,sw:(o.size||110)*0.2});c.restore();}
function motes(c,t,n=22,col='230,235,220'){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const d=hash(i*2.3),x=(hash(i)*1080+Math.sin(t*0.3+i)*40),y=((hash(i*5)*2000-t*(8+d*14))%2000+2000)%2000;c.fillStyle=`rgba(${col},${0.08+0.18*(0.5+0.5*Math.sin(t*2+i))})`;c.beginPath();c.arc(x,y,1.5+d*2.5,0,TAU);c.fill();}c.restore();}
function grade(c,o={}){if(o.tint)tint(c,o.tint,o.mode||'soft-light');if(o.dark)tint(c,`rgba(10,8,14,${o.dark})`,'multiply');vign(c,o.v??0.45);}
// fluorescent flicker / overhead light
function flicker(t,k=1){const f=Math.sin(t*61)*Math.sin(t*17.3);return f>0.92?0.18*k:0;}
// ---------- seated figure: legs drawn as a bent seated pose ----------
const _HIP={};
function sitAt(c,kind,pos,o={}){const p=pp(pos);const s=p.s*(o.sc||1);const f=o.f||1;const cr=o.cr??56;
  const r=who(c,kind,pos,Object.assign({},o,{kn:1,crouch:cr,stance:6}));if(!r)return r;const K=KIND2[kind];
  // thighs forward + shins down to the floor (drawn in front, so it reads as sitting)
  const side=o.view==='side'||o.view==='3q';const fx=side?f:0.45*f;
  for(const [k,off] of [[0,-9],[1,9]]){const hx=r.hip.x+off*s*(side?0.3:1),hy=r.hip.y-4*s;const kx=hx+fx*44*s,ky=hy+(side?2:14)*s;const fy=p.y+(o.dy||0);const ax=kx+fx*4*s;
    c.save();c.lineCap='round';c.lineJoin='round';for(const [w,col] of [[25*s,K2],[19*s,K.pants||'#333']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(hx,hy);c.lineTo(kx,ky);c.lineTo(ax,fy-14*s);c.stroke();}
    c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=4*s;c.beginPath();c.moveTo(hx,hy-6*s);c.lineTo(kx,ky-6*s);c.stroke();c.restore();boot2(c,{x:ax,y:fy},s,f,K);}
  return r;}
function strap(c,p,s){if(!p)return;c.save();c.translate(p.x,p.y);c.fillStyle='#4a2e1a';c.strokeStyle=OL;c.lineWidth=3*s;rr(c,-20*s,-9*s,40*s,18*s,4*s);c.fill();c.stroke();c.fillStyle='#d8c070';rr(c,-5*s,-7*s,10*s,14*s,2*s);c.fill();c.stroke();c.restore();}
// ---------- shock generator (2D close graphic) ----------
function genIcon(c,x,y,sc,o={}){c.save();c.translate(x,y);c.scale(sc,sc);c.lineJoin='round';const lit=o.lit??-1;
  c.fillStyle='#4a4c52';c.strokeStyle=OL;c.lineWidth=7;rr(c,-470,-150,940,300,20);c.fill();c.stroke();const g2=c.createLinearGradient(0,-150,0,150);g2.addColorStop(0,'rgba(255,255,255,0.12)');g2.addColorStop(1,'rgba(0,0,0,0.25)');c.fillStyle=g2;rr(c,-470,-150,940,300,20);c.fill();
  c.fillStyle='#d8d4c8';rr(c,-440,-130,880,46,6);c.fill();c.fillStyle='#1a1a1e';c.font='900 30px "Inter Display"';c.textAlign='center';c.textBaseline='middle';c.fillText('SHOCK GENERATOR  ·  TYPE ZLB',0,-106);
  const labs=['SLIGHT','MODERATE','STRONG','VERY STRONG','INTENSE','EXTREME','DANGER','XXX'];
  for(let i=0;i<30;i++){const xx=-435+i*30;const on=i<=lit;c.fillStyle='#e8e4d8';c.font='800 10px "Inter Display"';c.fillText(String(15+i*15),xx,-66);
    c.fillStyle=i>=28?'#7a1a1a':'#1e2026';rr(c,xx-11,-54,22,52,4);c.fill();c.fillStyle='#c8c8cc';rr(c,xx-5,on?-28:-48,10,20,3);c.fill();
    c.fillStyle=on?(i>=20?'#ff4a2a':'#ffd060'):'#3a3a30';c.beginPath();c.arc(xx,16,7,0,TAU);c.fill();if(on){glow(c,xx,16,26,i>=20?'255,80,40':'255,210,90',0.6);}}
  for(let k=0;k<8;k++){const x0=-446+k*4*30,ww=k===7?2*30-2:4*30-6;c.fillStyle=k>=6?'#a82a20':'#d8d4c8';rr(c,x0,40,ww,30,4);c.fill();c.fillStyle=k>=6?'#fff':'#1a1a1e';c.font='900 12px "Inter Display"';c.fillText(labs[k],x0+ww/2,56);}
  c.fillStyle='#202226';c.beginPath();c.arc(-380,110,24,0,TAU);c.fill();c.strokeStyle='#d8d4c8';c.lineWidth=3;c.stroke();if(lit>=0){glow(c,-380,110,40,'255,90,60',0.7);}
  c.fillStyle='#d8d4c8';rr(c,250,92,180,40,6);c.fill();c.fillStyle='#1a1a1e';c.font='900 16px "Inter Display"';c.fillText('VOLTAGE ENERGIZER',340,113);c.restore();}
function bolt(c,x1,y1,x2,y2,t,a=1,col='150,210,255'){if(a<=0)return;c.save();c.globalCompositeOperation='lighter';c.lineCap='round';c.lineJoin='round';const n=12;
  for(const [w,al] of [[22,0.18],[9,0.5],[3.5,1]]){c.strokeStyle=`rgba(${col},${al*a})`;c.lineWidth=w;c.beginPath();for(let i=0;i<=n;i++){const u=i/n,j=(i>0&&i<n)?(hash(i*7+Math.floor(t*24))-0.5)*70:0;const x=lerp(x1,x2,u)+j*(y2-y1)/Math.hypot(x2-x1,y2-y1+1e-3),y=lerp(y1,y2,u)-j*(x2-x1)/Math.hypot(x2-x1,y2-y1+1e-3);i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}c.restore();}
function voltChip(c,v,x,y,o={}){c.save();c.translate(x,y);const k=o.k??1;c.scale(k,k);const danger=v>=330;c.fillStyle=danger?'rgba(150,20,20,0.92)':'rgba(20,20,26,0.88)';c.strokeStyle=danger?'#ff6a4a':'#ffd060';c.lineWidth=5;rr(c,-170,-60,340,120,26);c.fill();c.stroke();
  txt(c,v+' V',0,4,74,danger?'#fff':'#ffd060',{stroke:false});c.restore();}
function speech(c,x,y,text,o={}){const k=o.k??1;if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(o.rot||0);c.font=`900 ${o.size||54}px "Inter Display"`;const w=c.measureText(text).width+70,h=(o.size||54)*1.7;
  c.fillStyle=o.fill||'#fff';c.strokeStyle=OL;c.lineWidth=7;c.beginPath();if(o.jag){for(let i=0;i<24;i++){const a=i/24*TAU,r=(i%2?0.8:1.05);c.lineTo(Math.cos(a)*w*0.62*r,Math.sin(a)*h*0.8*r);}c.closePath();}else{rr(c,-w/2,-h/2,w,h,h/2);}c.fill();c.stroke();
  if(!o.jag){c.beginPath();const tx=o.tail||-1;c.moveTo(tx*w*0.18,h/2-4);c.lineTo(tx*w*0.3,h/2+34);c.lineTo(tx*w*0.05,h/2-4);c.closePath();c.fill();c.stroke();c.fillRect(tx*w*0.2-14,h/2-12,40,10);}
  txt(c,text,0,3,o.size||54,o.col||'#1a1a1e',{stroke:false});c.restore();}
function personIcon(c,x,y,r,col){c.save();c.fillStyle=col;c.beginPath();c.arc(x,y-r*0.95,r*0.45,0,TAU);c.fill();c.beginPath();c.moveTo(x-r*0.7,y+r*0.9);c.quadraticCurveTo(x-r*0.75,y-r*0.35,x,y-r*0.38);c.quadraticCurveTo(x+r*0.75,y-r*0.35,x+r*0.7,y+r*0.9);c.closePath();c.fill();c.restore();}
function slip(c,x,y,text,k,rot=0){if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);c.rotate(rot);c.fillStyle='#fbf8ee';c.strokeStyle=OL;c.lineWidth=5;rr(c,-130,-44,260,88,6);c.fill();c.stroke();c.strokeStyle='rgba(0,0,0,0.12)';c.lineWidth=2;c.beginPath();c.moveTo(-110,28);c.lineTo(110,28);c.stroke();txt(c,text,0,2,44,'#1a1a2a',{stroke:false,ls:5});c.restore();}
function hat(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#3a3a42';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,70,18,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-46,0);c.lineTo(-40,-60);c.quadraticCurveTo(0,-74,40,-60);c.lineTo(46,0);c.closePath();c.fill();c.stroke();c.fillStyle='#6a2a2a';c.fillRect(-44,-16,88,12);c.restore();}
// foreground matte: re-draw parts of the plate (table top, generator) over figures standing behind them
function hull(P){P=P.slice().sort((a,b)=>a.x-b.x||a.y-b.y);const cr=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);const lo=[],up=[];for(const p of P){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}for(const p of P.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p);}return lo.slice(0,-1).concat(up.slice(0,-1));}
function occ(c,boxes){const id=Object.keys(PM).find(k=>PM[k]===CP);c.save();c.beginPath();for(const [x0,x1,y0,y1,z0,z1] of boxes){const P=[];for(const x of [x0,x1])for(const y of [y0,y1])for(const z of [z0,z1])P.push(pp([x,y,z]));const h=hull(P);h.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();}c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
const TABLE=[[-0.92,0.92,0.74,0.79,-0.45,0.45],[-0.64,0.64,0.79,1.13,-0.33,0.13],[0.69,0.87,0.79,0.99,-0.04,0.14]];
// ================= SHOTS =================
const S={};
// S · a volunteer at the generator, the experimenter behind him; first switch on "shocks"
S.open=(c,t,u,d)=>{const t0=S.open.t0,ts=wt('shocks',t0);const pr=ON(t,ts-0.12,0.12);cam(c,'lab_wide',{z:K3(u,d,1.25,1.4),x:K3(u,d,470,450),y:K3(u,d,860,840)});
  who(c,'exper',[-1.5,0,-2.0],X('half','flat','flat',{f:1,view:'front',hf:[16,64],hb:[-10,60]}));occ(c,TABLE);
  const r=sitAt(c,'teach',[0.05,0,0.82],X(t>ts?'squeeze':'wide','worried',t>ts?'grit':'wobble',{f:1,view:'3q',sweat:1,hf:[lerp(78,96,pr),lerp(-14,0,pr)],hb:[20,46]}));
  if(t>ts){const P=pp([0.25,0.9,0.12]);sparks(c,P.x,P.y,(t-ts)/0.45,12,1,'255,220,140');glow(c,P.x,P.y,140,'255,200,90',0.6*clamp(1-(t-ts)*2));}
  c.restore();flash(c,t>ts?0.3*clamp(1-(t-ts)*5):0);motes(c,t);grade(c,{tint:'rgba(60,90,80,0.25)'});};
// S · the learner strapped in, begging
S.beg=(c,t,u,d)=>{const t0=S.beg.t0,tb=wt('begged',t0);const yell=t>tb-0.1;const sh=yell?Math.sin(t*38)*5:0;cam(c,'lroom_f',{z:K3(u,d,1.0,1.1),y:900,sx:sh});
  const r=sitAt(c,'learner',[0,0,-0.52],X(yell?'squeeze':'wide','worried',yell?'scream5':'o',{f:1,view:'front',sweat:2,tear:yell,hf:[50,50],hb:[-50,50],lean:yell?Math.sin(t*12)*0.06:0}));
  if(r){strap(c,r.hf,r.hip?pp([0,0,-0.52]).s:1);strap(c,r.hb,pp([0,0,-0.52]).s);const P=pp([0.36,0.66,-0.5]);c.save();c.strokeStyle='#1a1a1a';c.lineWidth=5;c.beginPath();c.moveTo(r.hf.x,r.hf.y);c.bezierCurveTo(r.hf.x-30,r.hf.y+120,r.hf.x-160,r.hf.y+260,r.hf.x-300,r.hf.y+300);c.stroke();c.restore();
    if(yell)speech(c,r.hc.x+60,r.hc.y-300,'LET ME OUT!',{k:popK(t,tb-0.1),jag:1,size:64,fill:'#fff3d0',col:'#a01818',rot:-0.06});}
  c.restore();motes(c,t,14,'255,230,190');grade(c,{tint:'rgba(140,90,40,0.25)',v:0.55});};
// S · they kept going: front through the generator
S.kept=(c,t,u,d)=>{const t0=S.kept.t0,tk=wt('kept',t0),tg=wt('going',t0);cam(c,'lab_teach',{z:K3(u,d,1.0,1.08),y:960});const top=pp([0,1.13,0.0]);
  c.save();c.beginPath();c.rect(-200,-200,W+400,top.y+200);c.clip();const r=who(c,'teach',[0,0,0.85],X('squeeze','worried','grit',{view:'front',sweat:2,hf:[-40,lerp(70,96,Math.abs(Math.sin(t*9)))],hb:[30,90]}));c.restore();
  c.restore();for(const q of [tk,tg])flash(c,t>q&&t<q+0.12?0.35:0,'#ffe0a0');grade(c,{tint:'rgba(160,40,30,0.25)',v:0.55});};
// G · title: the Milgram experiment
S.title=(c,t,u,d)=>{const t0=S.title.t0,td=wt('disturbing',t0),te=wt('experiments',t0);gfxBG(c,t,{plate:'lab_wide'});const lit=Math.floor(clamp((t-t0)/5.5)*29);
  genIcon(c,540,1060,1.0*popK(t,t0+0.1),{lit});
  if(t>td-0.1){const k=popK(t,td-0.1);c.save();c.translate(540,640);c.scale(k,k);txt(c,'THE MILGRAM',0,-70,104,'#fff',{sw:22,ls:6});txt(c,'EXPERIMENT',0,60,118,'#ff3b30',{sw:24,ls:6});c.restore();}
  if(t>te)lbl(c,te,t,'YALE · 1961',1420,{size:64,col:'#ffd060',rot:0});};
// S · Yale University, 1961: Milgram walks in
S.yale=(c,t,u,d)=>{const t0=S.yale.t0,tm=wt('milgram',t0),ty=wt('yale',t0);cam(c,'yale_ext',{z:K3(u,d,1.05,1.18),y:K3(u,d,900,960)});const wk=ON(t,tm-0.6,1.4);
  const r=who(c,'milgram',[lerp(2.6,1.35,wk),0,7.6],X('dot','flat','smile',{f:wk<1?-1:1,view:wk<1?'3q':'front',...(wk<1?WK(t,6):{})}));c.restore();
  chip(c,t0+0.6,t,'1961',540,560,{col:'#ffd060'});if(t>tm)chip(c,tm,t,'STANLEY MILGRAM · PSYCHOLOGIST',540,1780,{col:'#8ab4ff'});if(t>ty)chip(c,ty,t,'YALE UNIVERSITY',540,680,{col:'#fff'});grade(c,{v:0.35});};
// G · the question
S.quest=(c,t,u,d)=>{const t0=S.quest.t0,to=wt('ordinary',t0),ta=wt('authority',t0),tf=wt('far',t0);gfxBG(c,t,{plate:'lab_wide'});L2={dx:1,rim:'#e8f0ff',amb:'#5a6070',key:'rgba(255,240,220,'};CP=PM.lab_wide;
  const kq=popK(t,t0+0.05);if(kq>0){c.save();c.translate(540,430);c.scale(kq,kq);txt(c,'HOW FAR WOULD',0,-60,84,'#fff',{sw:18,ls:5});txt(c,'YOU GO?',0,50,112,'#ffd060',{sw:22,ls:6});c.restore();}
  const ke=ON(t,ta-0.3,0.4),kp=ON(t,to-0.2,0.4);CUR={t:T};
  if(ke>0){c.save();c.globalAlpha=ke;fig2(c,{kind:'exper',x:330,y:1640,s:3.0,t:T,f:1,view:'front',eyes:'half',brow:'flat',mouth:'flat',hf:[80,-60],hb:[-20,60]});c.restore();chip(c,ta,t,'AUTHORITY',330,1720,{col:'#ff6a4a'});}
  if(kp>0){c.save();c.globalAlpha=kp;fig2(c,{kind:'teach',x:800,y:1640,s:1.8,t:T,f:-1,view:'front',eyes:'wide',brow:'worried',mouth:'o',sweat:1});c.restore();chip(c,to+0.3,t,'ORDINARY PERSON',800,1720,{col:'#8ab4ff'});}
  if(ke>0&&kp>0){c.save();c.strokeStyle='rgba(255,210,96,0.8)';c.lineWidth=8;c.setLineDash([18,14]);c.beginPath();c.moveTo(480,980);c.quadraticCurveTo(640,900,760,1180);c.stroke();c.setLineDash([]);c.restore();}};
// S · the rigged draw: teacher and learner pick slips from the experimenter's hat
S.draw=(c,t,u,d)=>{const t0=S.draw.t0,tt=wt('teacher',t0),tl=wt('learner',t0+3),tm=wt('memory',t0);cam(c,'lab_wide',{z:K3(u,d,1.0,1.06),x:540,y:1000});
  const pick1=ON(t,tt-0.9,0.5),pick2=ON(t,tl-0.9,0.5);
  const e=who(c,'exper',[0.55,0,0.7],X('half','flat','smirk',{view:'front',sc:0.85,hf:[0,40],hb:[-30,60]}));
  const a=who(c,'teach',[0.05,0,0.95],X('dot',t>tt?'up':'flat',t>tt?'smile':'flat',{f:1,view:'3q',sc:0.85,hf:[lerp(30,70,pick1),lerp(60,20,pick1)]}));
  const b=who(c,'learner',[0.95,0,0.4],X('dot',t>tl?'up':'flat',t>tl?'smile':'flat',{f:-1,view:'3q',sc:0.85,hf:[lerp(30,70,pick2),lerp(60,20,pick2)]}));
  if(e)hat(c,e.hf.x,e.hf.y-10,pp([0.55,0,0.7]).s*0.5);if(a&&t>tt-0.2)slip(c,a.hf.x+40,a.hf.y-150,'TEACHER',popK(t,tt-0.2)*pp([0.05,0,0.95]).s*0.5,-0.08);if(b&&t>tl-0.2)slip(c,b.hf.x-40,b.hf.y-150,'LEARNER',popK(t,tl-0.2)*pp([0.95,0,0.4]).s*0.5,0.08);
  c.restore();if(t>tm)chip(c,tm,t,'"A MEMORY STUDY"',540,520,{col:'#ffd060'});grade(c,{tint:'rgba(60,90,80,0.2)'});};
// G · the rules: wrong answer → shock → voltage goes up
S.rules=(c,t,u,d)=>{const t0=S.rules.t0,ti=wt('incorrectly',t0),tsh=wt('shock',t0),tm=wt('mistake',t0),tv=wt('increased',t0);gfxBG(c,t,{plate:'lab_wide'});L2={dx:1,rim:'#e8f0ff',amb:'#5a6070',key:'rgba(255,240,220,'};CUR={t:T};
  panel(c,90,360,900,1340,{title:'THE RULES'});
  const k1=popK(t,t0+0.1);c.save();c.globalAlpha=clamp(k1);fig2(c,{kind:'learner',x:300,y:1060,s:1.9,t:T,f:1,view:'front',eyes:t>tsh?'shock':'dot',brow:t>tsh?'worried':'flat',mouth:t>tsh?'yell':'flat',sweat:t>tsh?2:0});c.restore();txt(c,'LEARNER',300,1120,38,'#8ab4ff',{sw:8,ls:4});
  const k2=popK(t,wt('teacher',t0)-0.2);c.save();c.globalAlpha=clamp(k2);fig2(c,{kind:'teach',x:780,y:1060,s:1.9,t:T,f:-1,view:'front',eyes:'wide',brow:'worried',mouth:'wobble',hf:[-70,lerp(20,40,ON(t,tsh-0.2,0.1))]});c.restore();txt(c,'TEACHER',780,1120,38,'#ffd060',{sw:8,ls:4});
  if(t>ti-0.1){const k=popK(t,ti-0.1);c.save();c.translate(300,500);c.scale(k,k);c.fillStyle='#ff3b30';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.arc(0,30,48,0,TAU);c.fill();c.stroke();txt(c,'✕',0,34,56,'#fff',{stroke:false});txt(c,'WRONG',0,110,36,'#ff8a80',{stroke:false,ls:4});c.restore();}
  if(t>tsh-0.15)bolt(c,700,840,390,840,t,clamp(1-(t-tsh-0.5)*2));
  const steps=Math.floor(clamp((t-tm+0.1)/(END))*0)+(t>tm?1:0)+(t>tv?2:0)+(t>tv+0.35?1:0);const v=15+steps*15;
  genIcon(c,540,1360,0.85,{lit:steps});if(t>tm-0.1)voltChip(c,v,540,1600,{k:popK(t,tm-0.1)});
  if(t>tv){c.save();c.globalAlpha=clamp(1-(t-tv-0.6));txt(c,'▲',540+190,1600,56,'#ff6a4a',{sw:8});c.restore();}};
// S · "But there was a catch": the learner looks right at us, sly
S.catch=(c,t,u,d)=>{const t0=S.catch.t0,tc=wt('catch',t0);cam(c,'lroom_f',{z:K3(u,d,1.25,1.4),y:760,r:K3(u,d,0,-0.05)});
  sitAt(c,'learner',[0,0,-0.52],X(t>tc?'sly':'dot',t>tc?'smug':'flat',t>tc?'smirk':'flat',{f:1,view:'front',hf:[50,50],hb:[-50,50]}));c.restore();grade(c,{tint:'rgba(120,60,180,0.3)',v:0.65});};
// G · it was all fake
S.fake=(c,t,u,d)=>{const t0=S.fake.t0,ta=wt('actor',t0),tf=wt('fake',t0),tn=wt('no',t0+3),tk=wt('know',t0+5);gfxBG(c,t,{plate:'lroom_f'});CUR={t:T};L2={dx:1,rim:'#ffe8d0',amb:'#5a5048',key:'rgba(255,230,200,'};
  const k1=popK(t,t0+0.05);c.save();c.globalAlpha=clamp(k1);fig2(c,{kind:'learner',x:300,y:1050,s:2.3,t:T,f:1,view:'front',eyes:t>ta?'happy':'dot',brow:'up',mouth:t>ta?'grin':'smile',hf:[60,-40]});c.restore();
  if(t>ta-0.05){c.save();c.translate(300,620);c.scale(popK(t,ta-0.05)*1,popK(t,ta-0.05));c.rotate(-0.12);c.strokeStyle='#ff3b30';c.lineWidth=10;rr(c,-170,-60,340,120,14);c.stroke();txt(c,'ACTOR',0,4,82,'#ff3b30',{stroke:false,ls:8});c.restore();}
  const k2=popK(t,wt('machine',t0)-0.1);if(k2>0){genIcon(c,770,760,0.4*k2,{lit:-1});if(t>tf-0.05){c.save();c.translate(770,760);c.scale(popK(t,tf-0.05),popK(t,tf-0.05));c.rotate(0.1);c.strokeStyle='#ff3b30';c.lineWidth=10;rr(c,-150,-60,300,120,14);c.stroke();txt(c,'FAKE',0,4,82,'#ff3b30',{stroke:false,ls:8});c.restore();}}
  if(t>tn-0.05){voltChip(c,0,770,960,{k:popK(t,tn-0.05)});}
  if(t>tk-0.3){const k=popK(t,tk-0.3);c.save();c.globalAlpha=clamp(k);fig2(c,{kind:'teach',x:540,y:1720,s:2.0,t:T,f:-1,view:'front',eyes:'wide',brow:'worried',mouth:'o',sweat:1});c.restore();
    for(let i=0;i<3;i++){const kk=popK(t,tk-0.2+i*0.12);c.save();c.translate(680+i*70,1240-i*30);c.scale(kk,kk);txt(c,'?',0,0,100,'#ffd060',{sw:18});c.restore();}chip(c,tk,t,"THEY DIDN'T KNOW",540,1800,{col:'#ffd060'});}};
// S · the learner screams, demands release, then goes silent (voltage climbing)
S.scream=(c,t,u,d)=>{const t0=S.scream.t0,ts=wt('screaming',t0),td=wt('demanding',t0),tsr=wt('stopped',t0);const sil=t>tsr-0.05;const yell=t>ts-0.15&&!sil;const sh=yell?Math.sin(t*44)*7:0;
  cam(c,'lroom_f',{z:K3(u,d,1.0,1.18),y:K3(u,d,900,840),sx:sh});const struggle=t>td&&!sil?Math.sin(t*20)*0.1:0;
  const r=sitAt(c,'learner',[0,0,-0.52],X(sil?'closed':yell?'squeeze':'wide',sil?'flat':'worried',sil?'flat':yell?'scream5':'wobble',{f:1,view:'front',sweat:sil?0:2,tear:yell,cry:t>td&&!sil,hf:[50,50+(struggle*80)],hb:[-50,50-(struggle*80)],lean:struggle,tilt:sil?0.35*ON(t,tsr,0.5):0}));
  if(r){const s0=pp([0,0,-0.52]).s;strap(c,r.hf,s0);strap(c,r.hb,s0);if(t>td-0.1&&!sil)speech(c,r.hc.x+40,r.hc.y-300,'LET ME OUT!',{k:popK(t,td-0.1),jag:1,size:64,fill:'#fff3d0',col:'#a01818',rot:0.05});
    if(yell&&t<td-0.1)speech(c,r.hc.x+40,r.hc.y-300,'AAARGH!',{k:popK(t,ts-0.15),jag:1,size:66,fill:'#fff3d0',col:'#a01818',rot:-0.05});}
  c.restore();const v=sil?330:Math.min(315,150+Math.floor(clamp((t-t0)/(tsr-t0))*12)*15);voltChip(c,v,540,1580,{k:popK(t,t0+0.1)});
  if(sil){tint(c,`rgba(0,0,0,${0.45*ON(t,tsr,0.6)})`,'multiply');lbl(c,tsr+0.3,t,'…SILENCE',560,{size:90,col:'#c8c8d8',rot:0});}motes(c,t,12,'255,230,190');grade(c,{tint:'rgba(150,60,30,0.25)',v:0.6});};
// S · distressed, some protest, others hesitate
S.distress=(c,t,u,d)=>{const t0=S.distress.t0,tp=wt('protested',t0),to=wt('others',t0);const two=t>to-0.03;cam(c,'lab_teach',{z:two?1.12:K3(u,d,1.0,1.08),y:960,x:540});const top=pp([0,1.13,0.0]);
  c.save();c.beginPath();c.rect(-200,-200,W+400,top.y+200);c.clip();
  if(!two){const pro=t>tp-0.1;who(c,'teach',[0,0,0.85],X(pro?'glare':'squeeze',pro?'angry':'worried',pro?'scream5':'wobble',{view:'front',sweat:2,dx:pro?0:Math.sin(t*30)*3,hf:pro?[-120,-30]:[-40,80],hb:[30,90]}));}
  else{const hov=Math.sin(t*22)*4;who(c,'teach2',[0,0,0.85],X('wide','worried','wobble',{view:'front',sweat:2,tilt:Math.sin(t*3)*0.05,hf:[-46,58+hov],hb:[30,90]}));}c.restore();
  c.restore();if(!two&&t>tp-0.1)speech(c,720,420,"I WON'T DO THIS!",{k:popK(t,tp-0.1),size:52,tail:-1});if(two)chip(c,to,t,'HESITATED',540,1600,{col:'#ffd060'});else chip(c,t0+0.8,t,'VISIBLY DISTRESSED',540,1600,{col:'#8ab4ff',end:tp-0.15});
  grade(c,{tint:'rgba(60,90,80,0.25)',v:0.55});};
// S · the experimenter, calm: "Please continue."
S.cont=(c,t,u,d)=>{const t0=S.cont.t0,tl=wt('lab',t0),tc=wt('continue',t0),tca=wt('calmly',t0);cam(c,'lab_exp',{z:K3(u,d,1.0,1.08),x:540,y:1000});
  who(c,'exper',[3.05,0,-2.25],X('half','flat','flat',{view:'front',f:-1,hf:[16,64],hb:[-16,64],tilt:0}));c.restore();
  if(t>tl)chip(c,tl,t,'LAB COAT',540,1480,{col:'#c8ccd0',end:tca});if(t>tca-0.05){const k=popK(t,tca-0.05);c.save();c.translate(540,1560);c.scale(k,k);panel(c,-380,-90,760,180,{r:40,fill:'rgba(14,14,20,0.92)'});txt(c,'"PLEASE CONTINUE."',0,4,58,'#fff',{stroke:false,ls:3});c.restore();}
  grade(c,{tint:'rgba(60,90,80,0.25)',v:0.55});};
// G · the result (drumroll)
S.result=(c,t,u,d)=>{const t0=S.result.t0,tr=wt('result',t0);c.fillStyle='#0a0a10';c.fillRect(0,0,W,H);glow(c,540,900,700,'255,220,160',0.12+0.08*Math.sin(t*20)*(t<tr?1:0));
  for(let i=0;i<5;i++){const a=-0.4+i*0.2;c.save();c.globalAlpha=0.06;c.fillStyle='#fff';c.beginPath();c.moveTo(540,-100);c.lineTo(540+Math.sin(a+Math.sin(t*0.8)*0.05)*1400,2200);c.lineTo(540+Math.sin(a+0.08)*1400,2200);c.closePath();c.fill();c.restore();}
  if(t>tr-0.08){const k=popK(t,tr-0.08,0.25);c.save();c.translate(540,940);c.scale(k,k);c.rotate(-0.05);txt(c,'THE',0,-110,90,'#fff',{sw:18,ls:8});txt(c,'RESULT',0,40,170,'#ff3b30',{sw:30,ls:10});c.restore();}};
// G · 26 of 40 → 450 volts → 65 percent
S.stats=(c,t,u,d)=>{const t0=S.stats.t0,t40=wt('40',t0),t26=wt('26',t0),t450=wt('450',t0),t65=wt('65',t0);gfxBG(c,t,{plate:'lab_wide'});
  const showGrid=t<t65-0.1;if(showGrid){panel(c,90,330,900,1000,{title:'40 PEOPLE'});for(let i=0;i<40;i++){const cx=210+(i%8)*95,cy=560+Math.floor(i/8)*150;const k=popK(t,t40-0.05+i*0.012);if(k<=0)continue;const red=t>t26+i*0.03&&i<26;c.save();c.translate(cx,cy);c.scale(k,k);personIcon(c,0,0,46,red?'#ff3b30':'#c8ccd8');c.restore();}
    if(t>t26){const n=Math.min(26,Math.floor((t-t26)/0.03)+1);txt(c,n+' / 40',540,1430,96,'#ff3b30',{sw:18});txt(c,'WENT ALL THE WAY',540,1530,44,'#fff',{sw:10,ls:5});}
    if(t>t450-0.1){genIcon(c,540,1660,0.62,{lit:29});glow(c,540+0.62*435-0.62*30*0,1660,120,'255,60,40',0.5);lbl(c,t450-0.1,t,'450 VOLTS',1820,{size:72,col:'#ffd060',rot:0});}}
  else{const k=popK(t,t65-0.1,0.3);c.save();c.translate(540,900);c.scale(k,k);glow(c,0,0,500,'255,60,40',0.35);txt(c,'65%',0,0,330,'#ff3b30',{sw:50});c.restore();txt(c,'KEPT GOING TO THE END',540,1230,56,'#fff',{sw:12,ls:5});}};
// S · not everyone obeyed: a volunteer stands up and walks out
S.refuse=(c,t,u,d)=>{const t0=S.refuse.t0,td=wt("didn't",t0),tb=wt('blindly',t0);const up=ON(t,td-0.2,0.5),walk=ON(t,tb,1.2);cam(c,'lab_wide',{z:K3(u,d,1.1,1.18),x:520,y:1000});
  who(c,'exper',[-1.5,0,-1.9],X('wide','up','o',{f:1,view:'3q',hf:[40,10]}));occ(c,TABLE);
  if(up<1)sitAt(c,'teach3',[0,0,0.85],X('glare','angry','frown',{f:-1,view:'3q',cr:56*(1-up),hf:[0,40]}));
  else who(c,'teach3',[lerp(0,-1.9,walk),0,lerp(0.85,1.3,walk)],X('glare','angry','frown',{f:-1,view:'3q',...(walk>0.02&&walk<0.98?WK(t,6):{}),hf:[-20,30],hb:[20,30]}));
  c.restore();chip(c,td,t,'NOT EVERYONE OBEYED',540,1500,{col:'#3ad28a'});chip(c,tb+0.4,t,'14 OF 40 STOPPED',540,1620,{col:'#fff'});grade(c,{tint:'rgba(60,90,80,0.2)'});};
// G · under certain conditions → ordinary people go much further
S.cond=(c,t,u,d)=>{const t0=S.cond.t0,tu=wt('unsettling',t0),tc=wt('under',t0),to=wt('ordinary',t0),tf=wt('further',t0),ti=wt('imagined',t0);gfxBG(c,t,{plate:'lab_wide'});CUR={t:T};L2={dx:1,rim:'#e8f0ff',amb:'#5a6070',key:'rgba(255,240,220,'};
  if(t<tc-0.1){const k=popK(t,t0+0.1);c.save();c.translate(540,820);c.scale(k,k);txt(c,'DEEPLY',0,-70,96,'#fff',{sw:20,ls:6});txt(c,'UNSETTLING',0,60,120,'#ff3b30',{sw:24,ls:6});c.restore();return;}
  panel(c,90,330,900,520,{title:'UNDER CERTAIN CONDITIONS'});const cards=[['AUTHORITY','#ff6a4a'],['PRESTIGE','#ffd060'],['STEP BY STEP','#8ab4ff']];
  cards.forEach(([tx,col],i)=>{const k=popK(t,tc+0.1+i*0.3);if(k<=0)return;c.save();c.translate(240+i*300,600);c.scale(k,k);c.fillStyle='rgba(255,255,255,0.06)';rr(c,-125,-110,250,220,26);c.fill();c.strokeStyle=col;c.lineWidth=4;rr(c,-125,-110,250,220,26);c.stroke();
    if(i===0){c.fillStyle='#f4f4f0';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.moveTo(-40,-60);c.lineTo(40,-60);c.lineTo(56,40);c.lineTo(-56,40);c.closePath();c.fill();c.stroke();c.fillStyle='#f2efe6';c.beginPath();c.moveTo(-14,-60);c.lineTo(0,-20);c.lineTo(14,-60);c.fill();}
    if(i===1){c.fillStyle='#a8866c';c.strokeStyle=OL;c.lineWidth=5;c.fillRect(-60,-30,120,70);c.strokeRect(-60,-30,120,70);c.fillRect(-18,-80,36,120);c.strokeRect(-18,-80,36,120);c.fillStyle='#3a4a5a';for(const x of [-44,32])c.fillRect(x-6,-10,14,24);}
    if(i===2){c.fillStyle=col;for(let s2=0;s2<5;s2++){c.fillRect(-60+s2*24,40-s2*20,24,s2*20+12);}}
    txt(c,tx,0,80,30,col,{stroke:false,ls:3});c.restore();});
  if(t>to-0.1){const w=ON(t,to,tf-to+0.4);const y=1300;c.save();c.strokeStyle='rgba(255,255,255,0.18)';c.lineWidth=18;c.lineCap='round';c.beginPath();c.moveTo(160,y);c.lineTo(920,y);c.stroke();const g2=c.createLinearGradient(160,0,920,0);g2.addColorStop(0,'#ffd060');g2.addColorStop(1,'#ff3b30');c.strokeStyle=g2;c.beginPath();c.moveTo(160,y);c.lineTo(lerp(160,920,w),y);c.stroke();c.restore();
    txt(c,'15 V',160,y+70,36,'#ffd060',{stroke:false});txt(c,'450 V',920,y+70,36,'#ff3b30',{stroke:false});const x=lerp(160,920,w);fig2(c,{kind:'teach',x,y:y-20,s:1.3,t:T,f:1,view:'3q',eyes:t>ti?'shock':'dot',brow:t>ti?'worried':'flat',mouth:t>ti?'o':'flat',...(w<1?WK(t,8):{})});
    if(t>ti)lbl(c,ti,t,'FURTHER THAN THEY IMAGINED',1560,{size:56,col:'#fff',rot:0});}};
// S · final: alone at the generator; the shadow of the experimenter; the last switch on "persuaded"
S.final=(c,t,u,d)=>{const t0=S.final.t0,tp=wt('persuaded',t0),tq=wt('question',t0);const pr=t>tp?1:0;cam(c,'lab_teach',{z:K3(t-t0,7,1.0,1.12),y:K3(t-t0,7,1000,960)});const top=pp([0,1.13,0.0]);
  c.save();c.beginPath();c.rect(-200,-200,W+400,top.y+200);c.clip();const r=who(c,'teach',[0,0,0.85],X(pr?'squeeze':'focus','worried',pr?'grit':'flat',{view:'front',sweat:2,hf:[-40,lerp(64,96,ON(t,tp-0.1,0.12))],hb:[30,90]}));c.restore();
  // looming shadow of the experimenter behind him
  const sh=ON(t,tq-0.3,1.5);if(sh>0){c.save();c.globalAlpha=0.45*sh;c.fillStyle='#000';const P=pp([0.9,1.6,1.9]);c.beginPath();c.ellipse(P.x,P.y,170,200,0,0,TAU);c.fill();c.fillRect(P.x-260,P.y+150,520,1000);c.restore();}
  c.restore();grade(c,{dark:0.35+0.3*ON(t,t0,3),tint:'rgba(150,30,20,0.3)',v:0.75});if(pr){flash(c,clamp(1-(t-tp)*4)*0.7,'#fff0d0');tint(c,`rgba(0,0,0,${ON(t,tp+0.5,0.5)})`,'source-over');}};
// ---------- timeline ----------
const SEQ=[['open',0],['beg',wt('and',5.6)],['kept',wt('many',7.9)],['title',wt('give')],['yale',wt('in',16)],['quest',wt('he',22.2)],['draw',wt('participants',30)],['rules',wt('whenever')],
  ['catch',wt('but',48)],['fake',wt('the',49.7)],['scream',wt('as',58.2)],['distress',wt('the',65.5)],['cont',wt('but',71.4)],['result',wt('and',76.1)],['stats',wt('out',78.7)],['refuse',wt('the',89)],['cond',wt('but',93)],['final',wt('and',101.4)]];
SEQ.forEach(([k,t0])=>{S[k].t0=t0;});
const SHOTS=SEQ.map(([k,t0])=>[t0,(c,t,u,d)=>S[k](c,t,u,d)]);
SHOTS.push([200,(c,t,u,d)=>{T=4.6;const ts=4.42;cam(c,'lab_wide',{z:1.12,x:430,y:900});
  who(c,'exper',[-1.5,0,-2.0],X('half','flat','smirk',{f:1,view:'front',hf:[16,64],hb:[-10,60]}));occ(c,TABLE);
  sitAt(c,'teach',[0.05,0,0.82],X('squeeze','worried','grit',{f:1,view:'3q',sweat:2,hf:[96,0],hb:[20,46]}));
  const P=pp([0.25,0.9,0.12]);sparks(c,P.x,P.y,0.35,16,1,'255,220,140');glow(c,P.x,P.y,260,'255,200,90',0.7);c.restore();
  grade(c,{tint:'rgba(170,40,30,0.35)',v:0.55});T=200;
  txt(c,'THE MILGRAM',540,300,128,'#fff',{sw:28,ls:4});txt(c,'EXPERIMENT',540,450,148,'#ff2b2b',{sw:32,ls:4});
  txt(c,'65% WENT TO 450 VOLTS',540,1700,72,'#fff',{sw:18,ls:3});}]);
