'use strict';
// ===================== Space without a suit · cast + suits + face extras =====================
Object.assign(KIND2,{
  // the "you": station crew in a navy polo + khaki trousers, swept dark-brown hair, thick brows, clean-shaven
  astro:Object.assign(mkK({coat:'#2c3e6e',trim:'#e8ecf4',skin:SK[1],pants:'#9a8a66'}),{robe:false,long:false,hair4:'swoop',hair:'#4a2e1c',browW:1.35,browL:1.05}),
  // crewmate in a white EVA suit: short black hair, short beard
  crew:Object.assign(mkK({coat:'#eceef1',trim:'#c9cdd4',skin:SK[2],pants:'#e4e6ea',limb:'#eceef1'}),{robe:false,long:false,hair4:'crew',hair:'#1c1a1e',fb:'short',fbCol:'#2a2220',browW:1.2,suit:'eva'}),
  // 1960s test subject in a silver pressure suit: light-brown crew cut, brush moustache
  lb:Object.assign(mkK({coat:'#b2b8c2',trim:'#e0e4ea',skin:SK[2],pants:'#a6acb6',limb:'#b2b8c2'}),{robe:false,long:false,hair4:'crew',hair:'#7a5232',mst:'brush',mstCol:'#6a4428',suit:'gem'}),
  // 1960s engineers: white short-sleeve shirts + ties
  eng1:Object.assign(mkK({coat:'#f4f4ee',trim:'#d8dad8',skin:SK[0],pants:'#3a3c48'}),{robe:false,long:false,hair4:'crew',hair:'#2a2420',tie:'#2a3a6a',glasses:1,browW:1.2}),
  eng2:Object.assign(mkK({coat:'#eef0f4',trim:'#d8dad8',skin:SK[3],pants:'#4a4038'}),{robe:false,long:false,hair4:'part',hair:'#9a6232',tie:'#8a2a24',browW:0.9,stubble:0}),
  eng3:Object.assign(mkK({coat:'#f2f0e6',trim:'#d8dad8',skin:SK[2],pants:'#2e3440'}),{robe:false,long:false,hair4:'part',hair:'#bdbdc2',tie:'#2a5a3a',old:1,mst:'chevron',mstCol:'#9a9aa0',browCol:'#8a8a90'}),
});
const R47=s=>47*s;
// ---- face extras: puffed cheeks, frost round mouth/nose, saliva bubbles, blue lips
{const _dfS=drawFace4;drawFace4=function(g,x,y,s,P,K){
  if(P.puff){const k=P.puff;g.save();for(const sd of [-1,1]){const gg=g.createRadialGradient(x+sd*60*s,y+38*s,4*s,x+sd*60*s,y+38*s,40*s*k);gg.addColorStop(0,'rgba(255,190,190,0.55)');gg.addColorStop(1,'rgba(255,190,190,0)');g.fillStyle=gg;g.beginPath();g.arc(x+sd*60*s,y+38*s,40*s*k,0,TAU);g.fill();
    g.strokeStyle='rgba(120,60,70,0.55)';g.lineWidth=3.5*s;g.beginPath();g.arc(x+sd*58*s,y+40*s,34*s*k,sd>0?-0.9:Math.PI-0.9+1.8-1.8,sd>0?0.9:Math.PI+0.9);g.stroke();}g.restore();}
  _dfS(g,x,y,s,P,K);
  if(P.gape){const k=P.gape,my=y+60*s;g.save();g.lineJoin='round';g.fillStyle='#5a1420';g.strokeStyle=OL;g.lineWidth=7*s;g.beginPath();g.ellipse(x,my,30*s,(20+26*k)*s,0,0,TAU);g.fill();g.save();g.clip();g.fillStyle='#fff';g.fillRect(x-40*s,my-(20+26*k)*s,80*s,10*s);g.fillStyle='#e8606e';g.beginPath();g.ellipse(x,my+(14+20*k)*s,24*s,(12+8*k)*s,0,0,TAU);g.fill();g.strokeStyle='rgba(150,40,60,0.6)';g.lineWidth=2*s;g.beginPath();g.moveTo(x,my+(6+14*k)*s);g.lineTo(x,my+(20+20*k)*s);g.stroke();g.restore();g.beginPath();g.ellipse(x,my,30*s,(20+26*k)*s,0,0,TAU);g.stroke();g.restore();}
  if(P.blue){g.save();g.strokeStyle=`rgba(90,110,200,${0.6*P.blue})`;g.lineWidth=6*s;g.beginPath();g.moveTo(x-16*s,y+50*s);g.lineTo(x+16*s,y+50*s);g.stroke();g.restore();}
  if(P.bub){const T5=(typeof T!=='undefined'?T:0);g.save();for(let i=0;i<9;i++){const ph=(T5*1.6+hash(i*3))%1,bx=x+(hash(i)-0.5)*40*s,by=y+((P.gape?84:54)-ph*34)*s,r=(3+hash(i*5)*6)*s*(0.5+ph)*P.bub;if(ph>0.92)continue;g.fillStyle='rgba(220,240,255,0.55)';g.strokeStyle='rgba(30,40,70,0.8)';g.lineWidth=1.6*s;g.beginPath();g.arc(bx,by,r,0,TAU);g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(bx-r*0.35,by-r*0.35,r*0.3,0,TAU);g.fill();}g.restore();}
  if(P.frost){const k=P.frost;g.save();g.strokeStyle=`rgba(235,250,255,${k})`;g.lineWidth=3.4*s;g.lineCap='round';
    const crys=(cx,cy,r,a0)=>{for(let j=0;j<6;j++){const a=a0+j*Math.PI/3;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);g.stroke();g.beginPath();g.moveTo(cx+Math.cos(a)*r*0.55,cy+Math.sin(a)*r*0.55);g.lineTo(cx+Math.cos(a+0.5)*r*0.8,cy+Math.sin(a+0.5)*r*0.8);g.stroke();}};
    g.fillStyle=`rgba(215,242,255,${0.6*k})`;g.beginPath();g.ellipse(x,y+50*s,38*s,20*s,0,0,TAU);g.fill();g.beginPath();g.ellipse(x,y+24*s,18*s,12*s,0,0,TAU);g.fill();
    for(let i=0;i<9;i++){const a=hash(i*7)*TAU,d=(22+hash(i*3)*22)*s;crys(x+Math.cos(a)*d*1.3,y+42*s+Math.sin(a)*d*0.7,(5+hash(i)*6)*s*k,hash(i*9));}
    crys(x-10*s,y+22*s,6*s*k,0.3);crys(x+10*s,y+24*s,5*s*k,0.9);g.restore();}};}
// ---- spacesuit helmets (drawn after the figure, around the head)
function evaHelmet(c,r,o={}){if(!r)return;const s=r.s,R=R47(s),f=o.f||1;c.save();c.translate(r.hc.x,r.hc.y);c.lineJoin='round';
  // neck ring
  c.fillStyle='#b8bcc6';c.strokeStyle=OL;c.lineWidth=4.5*s;c.beginPath();c.ellipse(0,R*1.22,R*1.05,R*0.28,0,0,TAU);c.fill();c.stroke();c.fillStyle='#e6e8ec';c.beginPath();c.ellipse(0,R*1.16,R*0.95,R*0.18,0,0,TAU);c.fill();
  // glass bubble
  const gg=c.createRadialGradient(-R*0.4,-R*0.5,R*0.2,0,0,R*1.5);gg.addColorStop(0,'rgba(220,240,255,0.08)');gg.addColorStop(0.8,'rgba(170,210,255,0.16)');gg.addColorStop(1,'rgba(120,170,230,0.42)');c.fillStyle=gg;c.beginPath();c.arc(0,-R*0.05,R*1.42,0,TAU);c.fill();
  c.strokeStyle=OL;c.lineWidth=5*s;c.stroke();c.strokeStyle='rgba(255,255,255,0.85)';c.lineWidth=2.6*s;c.beginPath();c.arc(0,-R*0.05,R*1.33,0,TAU);c.stroke();
  // raised gold visor + hard shell on top
  c.fillStyle='#f2f2f0';c.strokeStyle=OL;c.lineWidth=4.5*s;c.beginPath();c.arc(0,-R*0.05,R*1.48,Math.PI*1.08,Math.PI*1.92);c.arc(0,-R*0.05,R*1.18,Math.PI*1.86,Math.PI*1.14,true);c.closePath();c.fill();c.stroke();
  const vg=c.createLinearGradient(-R,-R*1.4,R,-R*0.8);vg.addColorStop(0,'#f8d878');vg.addColorStop(0.5,'#d8a030');vg.addColorStop(1,'#8a5a18');c.fillStyle=vg;c.beginPath();c.arc(0,-R*0.05,R*1.18,Math.PI*1.14,Math.PI*1.86);c.arc(0,-R*0.05,R*0.98,Math.PI*1.82,Math.PI*1.18,true);c.closePath();c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.ellipse(-R*0.45,-R*0.95,R*0.32,R*0.06,-0.35,0,TAU);c.fill();
  if(o.visorDown){const vg2=c.createLinearGradient(-R,-R*1.2,R,R);vg2.addColorStop(0,'#fbe08a');vg2.addColorStop(0.45,'#d49a30');vg2.addColorStop(1,'#6a4410');c.fillStyle=vg2;c.beginPath();c.arc(0,-R*0.05,R*1.18,0,TAU);c.fill();c.strokeStyle=OL;c.lineWidth=4*s;c.stroke();
    c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(-R*0.45,-R*0.6,R*0.45,R*0.12,-0.5,0,TAU);c.fill();c.fillStyle='rgba(60,40,10,0.35)';c.beginPath();c.ellipse(R*0.2,R*0.2,R*0.3,R*0.5,0.2,0,TAU);c.fill();}
  // helmet lights on the sides
  for(const sd of [-1,1]){c.fillStyle='#d8dce4';c.strokeStyle=OL;c.lineWidth=3*s;rr(c,sd*R*1.36-R*0.16,-R*0.7,R*0.32,R*0.36,R*0.06);c.fill();c.stroke();c.fillStyle='#fffbe0';c.beginPath();c.arc(sd*R*1.36,-R*0.52,R*0.09,0,TAU);c.fill();}
  // glass glint
  c.strokeStyle='rgba(255,255,255,0.9)';c.lineWidth=4*s;c.lineCap='round';c.beginPath();c.arc(0,-R*0.05,R*1.2,Math.PI*1.18,Math.PI*1.36);c.stroke();c.beginPath();c.arc(0,-R*0.05,R*1.2,Math.PI*0.12,Math.PI*0.22);c.stroke();
  c.restore();}
function gemHelmet(c,r,o={}){if(!r)return;const s=r.s,R=R47(s);c.save();c.translate(r.hc.x,r.hc.y);c.lineJoin='round';
  // silver shell with an oval faceplate opening, neck ring, hose port
  c.fillStyle='#8a909a';c.strokeStyle=OL;c.lineWidth=4.5*s;c.beginPath();c.ellipse(0,R*1.16,R*0.98,R*0.26,0,0,TAU);c.fill();c.stroke();
  const sg=c.createLinearGradient(-R*1.4,0,R*1.4,0);sg.addColorStop(0,'#7c828c');sg.addColorStop(0.35,'#e8ecf0');sg.addColorStop(0.6,'#c4cad2');sg.addColorStop(1,'#6e747e');c.fillStyle=sg;
  c.beginPath();c.ellipse(0,-R*0.1,R*1.38,R*1.42,0,0,TAU);c.ellipse(0,R*0.08,R*0.98,R*1.0,0,TAU,0,true);c.fill('evenodd');c.stroke();
  c.lineWidth=3*s;c.beginPath();c.ellipse(0,R*0.08,R*0.98,R*1.0,0,0,TAU);c.stroke();
  c.fillStyle='rgba(180,210,240,0.14)';c.beginPath();c.ellipse(0,R*0.08,R*0.98,R*1.0,0,0,TAU);c.fill();
  c.strokeStyle='rgba(255,255,255,0.85)';c.lineWidth=3*s;c.lineCap='round';c.beginPath();c.ellipse(0,R*0.08,R*0.86,R*0.88,0,Math.PI*1.15,Math.PI*1.4);c.stroke();
  // visor hinge bolts + top ridge
  for(const sd of [-1,1]){c.fillStyle='#4a5058';c.strokeStyle=OL;c.lineWidth=2.5*s;c.beginPath();c.arc(sd*R*1.12,R*0.05,R*0.13,0,TAU);c.fill();c.stroke();}
  c.strokeStyle='rgba(60,64,72,0.7)';c.lineWidth=3*s;c.beginPath();c.moveTo(0,-R*1.5);c.lineTo(0,-R*1.0);c.stroke();
  c.restore();}
// a chest control box + umbilical hose on suits (front views)
function suitChest(c,r,K,o={}){if(!r)return;const s=r.s,hip=r.hip,hc=r.hc;const cx=(hip.x*0.62+hc.x*0.38),cy=hip.y*0.62+hc.y*0.38+20*s;c.save();c.translate(cx,cy);c.lineJoin='round';
  if(K.suit==='eva'){c.fillStyle='#d8dce4';c.strokeStyle=OL;c.lineWidth=3.5*s;rr(c,-26*s,-16*s,52*s,30*s,5*s);c.fill();c.stroke();for(let i=0;i<4;i++){c.fillStyle=['#e03a2a','#f0c030','#40c060','#3a8ae0'][i];c.beginPath();c.arc((-16+i*11)*s,-5*s,3.4*s,0,TAU);c.fill();}
    c.fillStyle='#2a2e36';c.fillRect(-18*s,3*s,36*s,6*s);c.fillStyle='#3a6ae0';c.fillRect(-16*s,4*s,20*s,4*s);
    c.strokeStyle='#d8dce4';c.lineWidth=5*s;c.lineCap='round';for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*24*s,-6*s);c.bezierCurveTo(sd*40*s,-10*s,sd*44*s,-40*s,sd*30*s,-62*s);c.stroke();}c.strokeStyle=OL;c.lineWidth=1.4*s;for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*24*s,-6*s);c.bezierCurveTo(sd*40*s,-10*s,sd*44*s,-40*s,sd*30*s,-62*s);c.stroke();}
    c.fillStyle='#c9cdd4';c.strokeStyle=OL;c.lineWidth=3*s;rr(c,-46*s,56*s,92*s,12*s,5*s);c.fill();c.stroke();c.fillStyle='#e8eaee';for(let k=0;k<5;k++)c.fillRect((-38+k*17)*s,59*s,8*s,6*s);
    // US-style flag patch on the shoulder
    c.restore();c.save();c.translate(hc.x+28*s,hc.y+90*s);c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=2*s;c.fillRect(-9*s,-6*s,18*s,12*s);c.strokeRect(-9*s,-6*s,18*s,12*s);c.fillStyle='#c02a2a';for(let k=0;k<3;k++)c.fillRect(-9*s,(-6+k*4)*s,18*s,2*s);c.fillStyle='#2a3a8a';c.fillRect(-9*s,-6*s,8*s,6*s);}
  else{c.fillStyle='#5a6068';c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.arc(-14*s,0,8*s,0,TAU);c.fill();c.stroke();c.beginPath();c.arc(14*s,0,8*s,0,TAU);c.fill();c.stroke();
    c.strokeStyle='#e8e4d0';c.lineWidth=7*s;c.lineCap='round';c.beginPath();c.moveTo(-14*s,0);c.bezierCurveTo(-40*s,40*s,-30*s,90*s,-60*s,140*s);c.stroke();c.strokeStyle=OL;c.lineWidth=1.5*s;c.stroke();}
  c.restore();}
// draw a suited character: backpack behind (prepass), figure, chest box, helmet
const _scrS=mk(64,64).getContext('2d');
function gauntlets(c,r,K){if(!r||K.suit!=='eva')return;const s=r.s;for(const h of [r.hf,r.hb]){c.fillStyle='#c84a2a';c.strokeStyle=OL;c.lineWidth=3*s;c.beginPath();c.arc(h.x,h.y-9*s,11*s,0,TAU);c.fill();c.stroke();c.fillStyle='#f2f2f0';c.beginPath();c.arc(h.x,h.y+2*s,10*s,0,TAU);c.fill();c.stroke();}}
function suitWho(c,kind,pos,o={}){const K=KIND2[kind];o=Object.assign({noHat:1},o);
  if(K.suit==='eva'){const p=o.abs?o.abs:pp(pos);CUR=Object.assign({t:T},o);const r0=fig2(_scrS,{kind,x:p.x+(o.dx||0),y:p.y+(o.dy||0),s:p.s*(o.sc||1),t:T,f:1,...o});if(r0){const s=p.s*(o.sc||1);c.save();c.translate(r0.hc.x,r0.hc.y+120*s);c.rotate(o.rot||0);c.fillStyle='#d8dce2';c.strokeStyle=OL;c.lineWidth=4*s;if(o.view==='front'||!o.view){rr(c,-62*s,-52*s,124*s,128*s,14*s);c.fill();c.stroke();c.fillStyle='#b8bcc6';rr(c,-58*s,-50*s,14*s,120*s,6*s);c.fill();rr(c,44*s,-50*s,14*s,120*s,6*s);c.fill();}else if(o.view==='side'){rr(c,-(o.f||1)*46*s-30*s,-40*s,60*s,110*s,10*s);c.fill();c.stroke();}c.restore();}}
  const r=who(c,kind,pos,o);if(!r)return r;const p=o.abs?o.abs:pp(pos);c.save();if(o.rot){const qx=p.x+(o.dx||0),qy=p.y+(o.dy||0);c.translate(qx,qy);c.rotate(o.rot);c.translate(-qx,-qy);}
  if(o.view==='front'||!o.view)suitChest(c,r,K,o);gauntlets(c,r,K);if(K.suit==='eva')evaHelmet(c,r,o);else gemHelmet(c,r,o);c.restore();return r;}
// floating (zero-g) pose: slow tumble + drifting limbs
function floatO(t,k=1,seed=0,o={}){const a=Math.sin(t*1.3+seed),b=Math.sin(t*1.7+seed*2);return Object.assign({air:1,hf:[56+a*10*k,10+b*16*k],hb:[-56-b*10*k,16+a*16*k],tilt:a*0.06,ff:[16+a*16*k,100-Math.max(0,b)*22*k],fb:[-12+b*12*k,104-Math.max(0,a)*20*k]},o);}
// swelling: scale the whole figure around its middle (skin holds)
function swellWho(c,kind,pos,o,k){const p=o.abs?o.abs:pp(pos);const s=p.s*(o.sc||1),cy=p.y+(o.dy||0)-150*s,cx=p.x+(o.dx||0);c.save();c.translate(cx,cy);c.scale(1+0.75*k,1+0.2*k);c.translate(-cx,-cy);const r=who(c,kind,pos,o);c.restore();return r;}
// empty spacesuit hanging on the wall (ending)
function emptySuit(c,x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';c.strokeStyle=OL;
  c.lineWidth=5;c.beginPath();c.moveTo(0,-290);c.lineTo(0,-250);c.stroke();c.fillStyle='#8a8e96';c.fillRect(-60,-258,120,10);c.strokeRect(-60,-258,120,10);
  const body=(path,fill)=>{c.fillStyle=fill;path();c.fill();c.lineWidth=5;c.stroke();};
  // legs slumped
  for(const sd of [-1,1])body(()=>{c.beginPath();c.moveTo(sd*16,40);c.quadraticCurveTo(sd*34,140,sd*26,230);c.lineTo(sd*58,236);c.quadraticCurveTo(sd*62,140,sd*52,40);c.closePath();},'#e4e6ea');
  for(const sd of [-1,1]){c.fillStyle='#b8bcc4';c.beginPath();c.ellipse(sd*42,238,26,12,0,0,TAU);c.fill();c.stroke();}
  // arms hanging
  for(const sd of [-1,1])body(()=>{c.beginPath();c.moveTo(sd*58,-170);c.quadraticCurveTo(sd*92,-80,sd*80,10);c.lineTo(sd*104,14);c.quadraticCurveTo(sd*118,-90,sd*84,-186);c.closePath();},'#e8eaee');
  for(const sd of [-1,1]){c.fillStyle='#f2f2f0';c.beginPath();c.arc(sd*92,26,18,0,TAU);c.fill();c.stroke();}
  // torso
  body(()=>{rr(c,-70,-200,140,250,40);},'#eceef1');c.fillStyle='#d8dce4';rr(c,-36,-140,72,40,6);c.fill();c.lineWidth=4;c.stroke();for(let i=0;i<4;i++){c.fillStyle=['#e03a2a','#f0c030','#40c060','#3a8ae0'][i];c.beginPath();c.arc(-22+i*15,-126,5,0,TAU);c.fill();}
  // helmet on top: empty glass, visor down with a reflection
  c.fillStyle='#b8bcc6';c.beginPath();c.ellipse(0,-200,64,16,0,0,TAU);c.fill();c.lineWidth=5;c.stroke();
  const vg=c.createLinearGradient(-60,-320,60,-210);vg.addColorStop(0,'#f8d878');vg.addColorStop(0.5,'#c88a28');vg.addColorStop(1,'#6a4410');c.fillStyle=vg;c.beginPath();c.arc(0,-262,66,0,TAU);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(-24,-290,24,8,-0.5,0,TAU);c.fill();
  // tiny reflection of the person glaring (the visor "looks back")
  if(o.refl){c.fillStyle='rgba(40,40,60,0.35)';c.beginPath();c.arc(14,-256,10,0,TAU);c.fill();c.fillRect(8,-246,12,22);}
  c.restore();}
