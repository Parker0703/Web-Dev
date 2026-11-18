// ===== WW2 cast for Style 2 S2 =====
Object.assign(KIND2,{
  intel:{coat:'#4a4436',limb:'#ecebe6',hat:'trilby',long:true,belt:false,buttons:false,vest:'#2a2620'},
  intel2:{coat:'#5c5a4a',limb:'#ecebe6',hat:'peakK',long:true,buttons:true,belt:true},
  marine:{coat:'#3e4a32',limb:'#ecebe6',hat:'peakM',long:true,buttons:true,belt:true},
  german:{coat:'#5a5f55',limb:'#ecebe6',hat:'peakG',long:true,buttons:true,belt:true,stache:false},
  gspy:{coat:'#3a3a40',limb:'#ecebe6',hat:'fedora',long:true},
  navy:{coat:'#1c2234',limb:'#ecebe6',hat:'navy',buttons:true},
  fisher:{coat:'#3c5a72',limb:'#ecebe6',hat:'beret',stubble:true},
  tommy:{coat:'#6a6440',limb:'#ecebe6',hat:'brodie',belt:true},
  intelnh:{coat:'#4a4436',limb:'#ecebe6',hat:'none',long:true,vest:'#2a2620'},
});
const _hat2b=hat2b;
hat2b=function(h,s,f,R,t){
  const sh=(c0,c1)=>{const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(L2.dx>0?0:1,c0);g.addColorStop(L2.dx>0?1:0,c1);return g;};
  let c=this&&this.canvas?this:null;return _hat2b.apply(null,arguments);
};
// hat2b is called as hat2b(c,...) in head2 — wrap properly:
hat2b=function(c,h,s,f,R,t){
  const sh=(c0,c1)=>{const g=c.createLinearGradient(-R,0,R,0);g.addColorStop(L2.dx>0?0:1,c0);g.addColorStop(L2.dx>0?1:0,c1);return g;};
  c.strokeStyle=K2;c.lineWidth=4*s;
  const peak=(top,band,brim)=>{c.fillStyle=sh(shd(top,-0.4),shd(top,0.25));c.beginPath();c.ellipse(0,-R*0.95,R*1.12,R*0.5,0,Math.PI,TAU);c.fill();c.stroke();
    c.fillStyle=band;c.fillRect(-R*0.95,-R*0.98,R*1.9,R*0.28);c.strokeRect(-R*0.95,-R*0.98,R*1.9,R*0.28);
    c.fillStyle=brim;c.beginPath();c.ellipse(f*R*0.55,-R*0.66,R*0.62,R*0.14,0,0,TAU);c.fill();c.stroke();
    c.fillStyle='#e8d070';c.beginPath();c.arc(f*R*0.1,-R*1.1,R*0.13,0,TAU);c.fill();rimLine(c,R,s);};
  if(h==='peakK')return peak('#6a6448','#3a2a1a','#2a2016');
  if(h==='peakM')return peak('#2a3a2a','#8a1c1c','#141a12');
  if(h==='peakG')return peak('#5a5f55','#2a2e28','#121410');
  if(h==='navy'){peak('#f2f0ea','#141a2a','#101420');return;}
  if(h==='trilby'||h==='fedora'){const col=h==='trilby'?'#3a3226':'#26262c';c.fillStyle=sh(shd(col,-0.3),shd(col,0.35));c.beginPath();c.ellipse(0,-R*0.7,R*1.35,R*0.2,0,0,TAU);c.fill();c.stroke();
    c.beginPath();c.moveTo(-R*0.78,-R*0.72);c.quadraticCurveTo(-R*0.8,-R*1.6,0,-R*1.55);c.quadraticCurveTo(R*0.8,-R*1.6,R*0.78,-R*0.72);c.closePath();c.fill();c.stroke();c.fillStyle='#141210';c.fillRect(-R*0.78,-R*0.95,R*1.56,R*0.2);rimLine(c,R,s);return;}
  if(h==='beret'){c.fillStyle=sh('#141820','#3a4458');c.beginPath();c.ellipse(-f*R*0.15,-R*0.72,R*1.1,R*0.42,-0.15*f,0,TAU);c.fill();c.stroke();return;}
  if(h==='brodie'){c.fillStyle=sh('#3a3a24','#7a7a50');c.beginPath();c.ellipse(0,-R*0.62,R*1.5,R*0.22,0,0,TAU);c.fill();c.stroke();c.beginPath();c.arc(0,-R*0.62,R*0.95,Math.PI,TAU);c.fill();c.stroke();rimLine(c,R,s);return;}
  return _hat2b(c,h,s,f,R,t);
};
function rimLine(c,R,s){return;c.strokeStyle=L2.rim;c.lineWidth=2.4*s;c.globalAlpha=0.8;c.beginPath();c.arc(0,-R*0.7,R*1.0,L2.dx>0?-1.2:Math.PI+0.4,L2.dx>0?-0.4:Math.PI+1.2);c.stroke();c.globalAlpha=1;}
// props
function pBriefcase(open=0){return (c,h,s,f)=>{c.save();c.translate(h.x+f*6*s,h.y+30*s);const g=c.createLinearGradient(0,-24*s,0,24*s);g.addColorStop(0,'#6a4a2a');g.addColorStop(1,'#2a1a0e');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=3*s;rr(c,-40*s,-24*s,80*s,50*s,6*s);c.fill();c.stroke();
  c.strokeStyle='#1a1008';c.lineWidth=5*s;c.beginPath();c.arc(0,-24*s,12*s,Math.PI,TAU);c.stroke();c.fillStyle='#d8b450';c.fillRect(-5*s,-6*s,10*s,8*s);c.restore();}}
function pDoc(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*12*s,h.y-30*s);c.rotate(-0.12*f);c.fillStyle='#efe6cc';c.strokeStyle=K2;c.lineWidth=2.5*s;c.fillRect(-22*s,-30*s,44*s,60*s);c.strokeRect(-22*s,-30*s,44*s,60*s);c.fillStyle='#a81c1c';c.fillRect(-16*s,-24*s,32*s,6*s);c.strokeStyle='rgba(0,0,0,0.3)';c.lineWidth=2*s;for(let i=0;i<4;i++)seg(c,-16*s,(-10+i*9)*s,16*s,(-10+i*9)*s);c.restore();}}
function pMag(){return (c,h,s,f)=>{c.strokeStyle=K2;c.lineWidth=6*s;seg(c,h.x,h.y,h.x+f*18*s,h.y-24*s);c.fillStyle='rgba(200,230,255,0.35)';c.strokeStyle='#8a6a2a';c.lineWidth=5*s;c.beginPath();c.arc(h.x+f*30*s,h.y-40*s,17*s,0,TAU);c.fill();c.stroke();}}
function pBinoc(){return (c,h,s,f)=>{c.fillStyle='#1a1a1a';c.strokeStyle=K2;c.lineWidth=2*s;rr(c,h.x-6*s,h.y-14*s,22*s*f,12*s,4*s);c.fill();rr(c,h.x-6*s,h.y-2*s,22*s*f,12*s,4*s);c.fill();}}
function pCamera(){return (c,h,s,f)=>{c.fillStyle='#202022';c.strokeStyle=K2;c.lineWidth=2*s;rr(c,h.x-14*s,h.y-26*s,30*s,20*s,3*s);c.fill();c.stroke();c.fillStyle='#8aa';c.beginPath();c.arc(h.x+f*6*s,h.y-16*s,5*s,0,TAU);c.fill();}}
function pPhoto(){return (c,h,s,f)=>{c.save();c.translate(h.x+f*12*s,h.y-26*s);c.fillStyle='#f6f0e0';c.strokeStyle=K2;c.lineWidth=2*s;c.fillRect(-20*s,-26*s,40*s,52*s);c.strokeRect(-20*s,-26*s,40*s,52*s);c.fillStyle='#6a6a6a';c.fillRect(-15*s,-21*s,30*s,34*s);c.fillStyle='#dcd8cc';c.beginPath();c.arc(0,-8*s,7*s,0,TAU);c.fill();c.restore();}}
// the body: covered shape / uniformed figure lying face down (never graphic)
function coveredBody(c,x,y,s){c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(x,y+8*s,300*s,24*s,0,0,TAU);c.fill();
  const g=c.createLinearGradient(0,y-80*s,0,y);g.addColorStop(0,'#f2f2f4');g.addColorStop(1,'#9aa0aa');c.fillStyle=g;c.strokeStyle=K2;c.lineWidth=5*s;
  c.beginPath();c.moveTo(x-280*s,y);c.quadraticCurveTo(x-270*s,y-70*s,x-200*s,y-66*s);c.quadraticCurveTo(x-120*s,y-52*s,x-40*s,y-60*s);c.quadraticCurveTo(x+80*s,y-72*s,x+180*s,y-56*s);c.quadraticCurveTo(x+250*s,y-80*s,x+280*s,y);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=3*s;for(const k of [-150,-30,90])seg(c,x+k*s,y-56*s,x+(k+20)*s,y-4*s);
  c.fillStyle='#1a1614';c.beginPath();c.ellipse(x+292*s,y-30*s,12*s,22*s,0,0,TAU);c.fill();c.beginPath();c.ellipse(x+290*s,y-8*s,12*s,20*s,0,0,TAU);c.fill();}
function lyingFigure(c,x,y,s,t){ // uniformed figure face-down at the shoreline, seen from a distance
  c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(0,0,0,0.35)';c.beginPath();c.ellipse(0,6,170,16,0,0,TAU);c.fill();
  c.strokeStyle=K2;c.lineCap='round';c.lineWidth=22;seg(c,60,-8,150,-4);seg(c,60,-8,140,6);c.strokeStyle='#3e4a32';c.lineWidth=15;seg(c,60,-8,150,-4);seg(c,60,-8,140,6);
  c.fillStyle='#3e4a32';c.strokeStyle=K2;c.lineWidth=5;rr(c,-90,-30,160,40,18);c.fill();c.stroke();c.fillStyle='rgba(255,220,180,0.2)';c.fillRect(-80,-28,140,8);
  const g=c.createRadialGradient(-110,-26,2,-118,-16,30);g.addColorStop(0,'#fff');g.addColorStop(1,'#8a8884');c.fillStyle=g;c.beginPath();c.arc(-118,-14,26,0,TAU);c.fill();c.stroke();
  c.strokeStyle=K2;c.lineWidth=17;seg(c,-70,-6,-150,26);c.strokeStyle='#3e4a32';c.lineWidth=11;seg(c,-70,-6,-150,26);
  c.strokeStyle='#9a9a9a';c.lineWidth=3;seg(c,-150,26,-185,36);c.fillStyle='#4a3020';c.strokeStyle=K2;c.lineWidth=3;rr(c,-240,24,60,40,5);c.fill();c.stroke();
  c.restore();}
