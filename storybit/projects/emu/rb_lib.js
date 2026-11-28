'use strict';
// ===================== Napoleon vs the rabbits · cast + props (StoryBit B) =====================
Object.assign(KIND2,{
  berthier:{coat:'#26346a',limb:'#f2f0ea',hat:'bicorneF',hair:'#5a3a22',skirt:'#26346a',skirtL:30,uniform:'nap',epaulettes:1,stache:1},
  tsar:{coat:'#1e5a3a',limb:'#f2f0ea',hat:'bicorneF',hair:'#c8a060',skirt:'#1e5a3a',skirtL:30,uniform:'ru',epaulettes:1},
  austrian:{coat:'#eeece4',limb:'#efece4',hat:'shako',shako:'#1a1a1a',plume:'#d8b040',skirt:'#eeece4',skirtL:24,uniform:'ru',belts:1},
  keeper:{coat:'#7a5a3a',limb:'#f0eee6',hat:'none',hair:'#5a3a22',skirt:'#7a5a3a',skirtL:20,vest:'#e8dcc0',belt:1,buttons:1,hem:'#4a3420'},
  memoir:{coat:'#26346a',limb:'#f2f0ea',hat:'none',hair:'#d8d4cc',skirt:'#26346a',skirtL:30,uniform:'nap',epaulettes:1,stache:1},
});
const BER=o=>fig2(o.c,{kind:'berthier',view:'front',...o});
// ---------- the rabbit: soft round body, long ears, cotton tail, big eyes, thick outline, 2.5D shading ----------
// o: pose 'sit'|'hop'|'front'|'eat'|'run' ; f facing ; col 'white'|'grey'|'brown'|'spot' ; t ; seed
const RCOL={white:['#ffffff','#d8dce6','#f8c8d0'],grey:['#c8ccd4','#8a8e9a','#f0b8c0'],brown:['#b8885a','#7a5a3a','#e8b0a0'],spot:['#ffffff','#d8dce6','#f8c8d0']};
function rabbit(c,x,y,s,o={}){const f=o.f||1,t=o.t??T,sd=o.seed||0,pose=o.pose||'sit',P=RCOL[o.col||'white'];const hop=pose==='hop'||pose==='run'?Math.abs(Math.sin(t*(o.spd||9)+sd*3)):0;
  c.save();c.translate(x,y);c.lineJoin='round';c.lineCap='round';
  c.fillStyle='rgba(0,0,0,0.28)';c.beginPath();c.ellipse(0,2*s,46*s*(1-hop*0.3),9*s,0,0,TAU);c.fill();
  c.translate(0,-hop*40*s);c.scale(f,1);
  const shade=(x0,x1,base)=>{const g=c.createLinearGradient(x0,-80*s,x1,10*s);g.addColorStop(0,base);g.addColorStop(1,P[1]);return g;};
  const OL=()=>{c.strokeStyle=K2;c.lineWidth=5*s;c.stroke();};
  if(pose==='front'){// facing the camera, charging: round body, face front, ears up and bouncing
    c.fillStyle=shade(-30*s,40*s,P[0]);c.beginPath();c.ellipse(0,-36*s,42*s,38*s,0,0,TAU);c.fill();OL();
    for(const sd2 of [-1,1]){c.fillStyle=P[0];c.beginPath();c.ellipse(sd2*22*s,-4*s,14*s,8*s,0,0,TAU);c.fill();OL();}
    const ew=Math.sin(t*12+sd)*0.15;for(const sd2 of [-1,1]){c.save();c.translate(sd2*16*s,-104*s);c.rotate(sd2*(0.18+ew));c.fillStyle=P[0];c.beginPath();c.ellipse(0,-34*s,13*s,40*s,0,0,TAU);c.fill();OL();c.fillStyle=P[2];c.beginPath();c.ellipse(0,-32*s,6*s,30*s,0,0,TAU);c.fill();c.restore();}
    c.fillStyle=shade(-30*s,30*s,P[0]);c.beginPath();c.arc(0,-92*s,34*s,0,TAU);c.fill();OL();
    if(o.col==='spot'){c.fillStyle='#4a3a32';c.beginPath();c.ellipse(-14*s,-100*s,12*s,10*s,0.3,0,TAU);c.fill();}
    for(const ex of [-13,13]){c.fillStyle=K2;c.beginPath();c.ellipse(ex*s,-96*s,6.5*s,8*s,0,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc((ex+2)*s,-99*s,2.6*s,0,TAU);c.fill();}
    c.fillStyle='#f08aa0';c.beginPath();c.moveTo(-5*s,-84*s);c.lineTo(5*s,-84*s);c.lineTo(0,-78*s);c.closePath();c.fill();c.strokeStyle=K2;c.lineWidth=2.4*s;c.beginPath();c.moveTo(0,-78*s);c.lineTo(0,-73*s);c.moveTo(0,-73*s);c.quadraticCurveTo(-5*s,-69*s,-8*s,-72*s);c.moveTo(0,-73*s);c.quadraticCurveTo(5*s,-69*s,8*s,-72*s);c.stroke();
    c.strokeStyle='rgba(30,30,36,0.6)';c.lineWidth=1.6*s;for(const k of [-1,1])for(const yy of [-80,-76]){c.beginPath();c.moveTo(k*10*s,yy*s);c.lineTo(k*36*s,(yy-4+k)*s);c.stroke();}
    if(o.blush!==0){c.fillStyle='rgba(255,140,160,0.35)';for(const k of [-1,1]){c.beginPath();c.ellipse(k*22*s,-82*s,7*s,4*s,0,0,TAU);c.fill();}}
    c.restore();return {head:{x:x,y:y-92*s-hop*40*s}};}
  // side / 3-quarter: tail, back leg, body, front paws, head, ears
  const stretch=pose==='hop'||pose==='run'?1+hop*0.25:1;
  c.fillStyle=P[0];c.beginPath();c.arc(-44*s,-30*s,11*s,0,TAU);c.fill();OL();
  c.fillStyle=P[0];c.beginPath();c.ellipse(-22*s,-6*s,24*s*stretch,10*s,0,0,TAU);c.fill();OL();
  c.fillStyle=shade(-40*s,40*s,P[0]);c.beginPath();c.ellipse(-6*s,-34*s,42*s*stretch,31*s,-0.1,0,TAU);c.fill();OL();
  if(o.col==='spot'){c.fillStyle='#4a3a32';c.beginPath();c.ellipse(-14*s,-44*s,16*s,12*s,0.2,0,TAU);c.fill();}
  c.fillStyle=P[0];c.beginPath();c.ellipse(24*s,-4*s,9*s,6*s,0,0,TAU);c.fill();OL();
  const ex=pose==='eat'?36:30,ey=pose==='eat'?-46:-62;c.save();c.translate(ex*s,ey*s);c.rotate(pose==='eat'?0.25:0);
  const ew=Math.sin(t*3+sd)*0.08;for(const [ox,a] of [[-6,-0.5],[6,-0.15]]){c.save();c.translate(ox*s,-18*s);c.rotate(a+ew);c.fillStyle=P[0];c.beginPath();c.ellipse(0,-30*s,11*s,34*s,0,0,TAU);c.fill();OL();c.fillStyle=P[2];c.beginPath();c.ellipse(0,-28*s,5*s,25*s,0,0,TAU);c.fill();c.restore();}
  c.fillStyle=shade(-20*s,30*s,P[0]);c.beginPath();c.ellipse(4*s,0,26*s,22*s,0,0,TAU);c.fill();OL();
  c.fillStyle=K2;c.beginPath();c.ellipse(12*s,-4*s,5.5*s,6.5*s,0,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(14*s,-6*s,2*s,0,TAU);c.fill();
  c.fillStyle='#f08aa0';c.beginPath();c.arc(29*s,4*s,4*s,0,TAU);c.fill();c.strokeStyle='rgba(30,30,36,0.6)';c.lineWidth=1.6*s;for(const yy of [4,8]){c.beginPath();c.moveTo(26*s,yy*s);c.lineTo(46*s,(yy+2)*s);c.stroke();}
  if(pose==='eat'&&o.carrot!==0){c.save();c.translate(36*s,14*s);c.rotate(0.6+Math.sin(t*14)*0.05);carrot(c,0,0,0.6*s);c.restore();}
  c.restore();c.restore();return {head:{x:x+f*ex*s,y:y+ey*s-hop*40*s}};}
function carrot(c,x,y,s){c.save();c.translate(x,y);c.lineJoin='round';c.fillStyle='#ff8a2a';c.strokeStyle=K2;c.lineWidth=4*s;c.beginPath();c.moveTo(-10*s,0);c.quadraticCurveTo(0,60*s,4*s,70*s);c.quadraticCurveTo(10*s,60*s,12*s,0);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(160,70,10,0.6)';c.lineWidth=2*s;for(const yy of [16,30,44])seg(c,-6*s,yy*s,4*s,(yy+2)*s);c.fillStyle='#5ab04a';c.strokeStyle=K2;c.lineWidth=3*s;for(const a of [-0.5,0,0.5]){c.save();c.rotate(a);c.beginPath();c.ellipse(1*s,-16*s,5*s,16*s,0,0,TAU);c.fill();c.stroke();c.restore();}c.restore();}
// a swarm of rabbits in perspective between two depths (y = ground screen rows), sorted back to front
function swarm(c,t,o){const n=o.n||40,res=[];for(let i=0;i<n;i++){const u=hash(i*3.7+(o.seed||0)),v=hash(i*5.3+(o.seed||0));let x=lerp(o.x0,o.x1,u),y=lerp(o.y0,o.y1,v);if(o.flow)({x,y}=o.flow(x,y,i,t));res.push([y,x,i]);}
  res.sort((a,b)=>a[0]-b[0]);for(const [y,x,i] of res){const k=lerp(o.s0,o.s1,(y-o.y0)/Math.max(1,o.y1-o.y0));const cols=['white','white','grey','spot','brown','white'];rabbit(c,x,y,k,{pose:o.pose||'front',f:o.f??(hash(i)>0.5?1:-1),t,seed:i,col:cols[i%cols.length],spd:o.spd});}}
// wooden rabbit cage (crate with bars); open = door swung up
function cage(c,x,y,s,open=0){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=5*s;const wood='#a8743a';
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(0,4*s,90*s,12*s,0,0,TAU);c.fill();
  c.fillStyle=shd(wood,-0.3);c.fillRect(-80*s,-100*s,160*s,100*s);c.strokeRect(-80*s,-100*s,160*s,100*s);c.fillStyle='rgba(20,14,8,0.85)';c.fillRect(-66*s,-86*s,132*s,72*s);
  c.fillStyle=wood;for(const [x0,y0,w,h] of [[-84,-106,168,16],[-84,-10,168,14],[-84,-106,16,110],[68,-106,16,110]]){c.fillRect(x0*s,y0*s,w*s,h*s);c.strokeRect(x0*s,y0*s,w*s,h*s);}
  if(open<1){c.save();c.translate(0,-86*s);c.scale(1,1-open);c.strokeStyle='#8a8e96';c.lineWidth=4*s;for(let i=0;i<7;i++){const xx=(-58+i*19)*s;seg(c,xx,0,xx,72*s);}c.restore();}
  if(open>0){c.save();c.translate(0,-104*s);c.rotate(-open*1.2);c.strokeStyle='#8a8e96';c.lineWidth=4*s;for(let i=0;i<7;i++){const xx=(-58+i*19)*s;seg(c,xx,0,xx,-60*s);}c.restore();}
  c.restore();}
// Napoleon's carriage (dark coach, gold trim, big wheels) + one horse; f = direction
function carriage(c,x,y,s,t,o={}){const f=o.f||1,mv=o.moving?1:0;c.save();c.translate(x,y);c.scale(f,1);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(0,6*s,340*s,22*s,0,0,TAU);c.fill();
  // horse (in front)
  const bob=mv?Math.sin(t*14)*6*s:0;c.save();c.translate(250*s,-120*s+bob);c.fillStyle='#5a3a26';c.beginPath();c.ellipse(0,0,95*s,48*s,0,0,TAU);c.fill();c.stroke();
  for(const [lx,ph] of [[-60,0],[-30,2],[40,1],[70,3]]){const a=mv?Math.sin(t*14+ph)*0.4:0;c.save();c.translate(lx*s,30*s);c.rotate(a);c.fillStyle='#4a2e1c';c.fillRect(-9*s,0,18*s,95*s);c.strokeRect(-9*s,0,18*s,95*s);c.restore();}
  c.save();c.translate(80*s,-30*s);c.rotate(-0.7);c.fillStyle='#5a3a26';rr(c,0,-22*s,110*s,44*s,20*s);c.fill();c.stroke();c.restore();c.fillStyle='#2a1a10';c.beginPath();c.ellipse(70*s,-60*s,20*s,46*s,-0.6,0,TAU);c.fill();c.restore();
  // body
  const g=c.createLinearGradient(0,-330*s,0,-80*s);g.addColorStop(0,'#2a2a36');g.addColorStop(1,'#0e0e14');c.fillStyle=g;c.beginPath();c.moveTo(-200*s,-90*s);c.quadraticCurveTo(-230*s,-260*s,-150*s,-310*s);c.lineTo(110*s,-310*s);c.quadraticCurveTo(170*s,-260*s,150*s,-90*s);c.closePath();c.fill();c.stroke();
  c.strokeStyle='#d8b040';c.lineWidth=5*s;c.beginPath();c.moveTo(-190*s,-110*s);c.lineTo(140*s,-110*s);c.moveTo(-160*s,-295*s);c.lineTo(105*s,-295*s);c.stroke();
  c.fillStyle='#e8d090';c.strokeStyle=K2;c.lineWidth=5*s;rr(c,-90*s,-270*s,120*s,100*s,10*s);c.fill();c.stroke();c.fillStyle='rgba(40,50,80,0.8)';rr(c,-80*s,-260*s,100*s,80*s,6*s);c.fill();
  c.fillStyle='#d8b040';c.beginPath();c.arc(70*s,-200*s,22*s,0,TAU);c.fill();c.stroke();txt(c,'N',70*s,-198*s,26*s,'#26346a',{stroke:false});
  // wheels
  for(const [wx,wr] of [[-150,72],[90,58]]){const a=mv?t*8:0;c.save();c.translate(wx*s,-wr*s);c.fillStyle='#c83a2a';c.strokeStyle=K2;c.lineWidth=6*s;c.beginPath();c.arc(0,0,wr*s,0,TAU);c.stroke();c.lineWidth=12*s;c.strokeStyle='#5a2a1a';c.stroke();c.strokeStyle='#c8a040';c.lineWidth=4*s;for(let k=0;k<8;k++){const aa=a+k*Math.PI/4;seg(c,0,0,Math.cos(aa)*wr*s,Math.sin(aa)*wr*s);}c.fillStyle='#d8b040';c.beginPath();c.arc(0,0,10*s,0,TAU);c.fill();c.restore();}
  c.restore();return {win:{x:x+f*(-30)*s,y:y-220*s}};}
// stick/whip swings for the soldiers
function stickProp(len,ang){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(ang*f);c.strokeStyle=K2;c.lineWidth=10*s;c.lineCap='round';seg(c,0,0,0,-len*s);c.strokeStyle='#8a5a2a';c.lineWidth=6*s;seg(c,0,0,0,-len*s);c.restore();};}
function whipProp(ang,t){return (c,h,s,f)=>{c.save();c.translate(h.x,h.y);c.rotate(ang*f);c.strokeStyle=K2;c.lineWidth=9*s;c.lineCap='round';seg(c,0,0,0,-60*s);c.strokeStyle='#4a2a1a';c.lineWidth=5*s;seg(c,0,0,0,-60*s);
  c.strokeStyle='#2a1a10';c.lineWidth=3*s;c.beginPath();c.moveTo(0,-60*s);for(let i=1;i<=10;i++)c.lineTo(Math.sin(i*0.6+t*12)*i*6*s*f,-60*s-i*14*s);c.stroke();c.restore();};}
// treaty raft on the river (Tilsit 1807): wooden raft + white pavilion
function raft(c,x,y,s,t){c.save();c.translate(x,y+Math.sin(t*1.5)*4*s);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;
  c.fillStyle='#8a5a2a';c.beginPath();c.moveTo(-420*s,0);c.lineTo(420*s,0);c.lineTo(380*s,50*s);c.lineTo(-380*s,50*s);c.closePath();c.fill();c.stroke();c.strokeStyle='rgba(40,20,8,0.6)';c.lineWidth=3*s;for(let i=-7;i<=7;i++)seg(c,i*55*s,4*s,i*52*s,46*s);
  c.strokeStyle=K2;c.lineWidth=6*s;c.fillStyle='#f4f0e4';c.beginPath();c.moveTo(-260*s,-20*s);c.lineTo(-260*s,-360*s);c.lineTo(260*s,-360*s);c.lineTo(260*s,-20*s);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e8e0cc';c.beginPath();c.moveTo(-300*s,-360*s);c.lineTo(0,-470*s);c.lineTo(300*s,-360*s);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(30,20,10,0.6)';rr(c,-110*s,-300*s,220*s,280*s,10*s);c.fill();
  for(const [fx,cols] of [[-230,['#2a4ab8','#fff','#d02a2a']],[230,['#fff','#2a5a3a','#d8b040']]]){c.strokeStyle=K2;c.lineWidth=5*s;seg(c,fx*s,-470*s,fx*s,-360*s);cols.forEach((col,i)=>{c.fillStyle=col;c.fillRect(fx*s+i*18*s,-470*s,18*s,40*s);});c.strokeRect(fx*s,-470*s,54*s,40*s);}
  c.restore();}
function qMarkB(c,x,y,sc,t){bigQ(c,x,y,sc,t);}
function memoirsBook(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=6*s;c.fillStyle='#5a2a1a';rr(c,-240*s,-170*s,480*s,340*s,14*s);c.fill();c.stroke();
  for(const sd of [-1,1]){c.fillStyle='#f2e4c4';c.beginPath();c.moveTo(0,-150*s);c.quadraticCurveTo(sd*120*s,-170*s,sd*225*s,-150*s);c.lineTo(sd*225*s,150*s);c.quadraticCurveTo(sd*120*s,140*s,0,160*s);c.closePath();c.fill();c.stroke();
    c.strokeStyle='rgba(60,40,20,0.7)';c.lineWidth=3*s;for(let i=0;i<9;i++){const yy=(-110+i*28)*s;c.beginPath();c.moveTo(sd*30*s,yy);for(let k=0;k<10;k++)c.lineTo(sd*(30+k*18)*s,yy+Math.sin(k*2+i)*3*s);c.stroke();}c.strokeStyle=K2;c.lineWidth=6*s;}
  if(o.title){txt(c,'MÉMOIRES',-118*s,-120*s,26*s,'#5a2a1a',{stroke:false,ls:3});}
  if(o.quill){const qx=110*s+Math.sin(t*8)*20*s,qy=20*s;c.save();c.translate(qx,qy);c.rotate(-0.7);c.fillStyle='#f4f0e6';c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(30*s,-100*s,10*s,-200*s);c.quadraticCurveTo(-20*s,-100*s,0,0);c.fill();c.stroke();c.restore();}
  c.restore();}
