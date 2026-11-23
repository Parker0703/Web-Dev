'use strict';
// ===== Randy Gardner cast =====
Object.assign(KIND2,{
  randy:Object.assign(mkK({coat:'#b8482e',trim:'#f4e6d8',skin:SK[1],pants:'#5a4a38'}),{robe:false,long:false,hair4:'crew',hair:'#5a3524'}),
  jersey:Object.assign(mkK({coat:'#5aa8e8',trim:'#ffd040',skin:SK[1],pants:'#f4f0e4'}),{robe:false,long:false,hair4:'crew',hair:'#5a3524',jersey:1}),
  bruce:Object.assign(mkK({coat:'#3a8a5a',trim:'#eef8f0',skin:SK[2],pants:'#3a3a48'}),{robe:false,long:false,hair4:'part',hair:'#c89a48'}),
  joe:Object.assign(mkK({coat:'#6a4ab0',trim:'#f2eefc',skin:SK[0],pants:'#2e2e3a'}),{robe:false,long:false,hair4:'swoop',hair:'#1c1418'}),
  dement:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:SK[3],pants:'#3a3c48'}),{robe:false,long:true,hair4:'part',hair:'#3a2a1e',glasses:1}),
  oldr:Object.assign(mkK({coat:'#7a8aa8',trim:'#eef2f8',skin:SK[1],pants:'#4a5470'}),{robe:false,long:false,hair4:'crew',hair:'#c8c8cc'}),
  kid:Object.assign(mkK({coat:'#e8743a',trim:'#fff3e6',skin:SK[2],pants:'#34445e'}),{robe:false,long:false,hair4:'swoop',hair:'#2a1a14'}),
});
// tired eye bags (P.bags 0..1) — drawn under the eyes, never over them
{const _df=drawFace4;drawFace4=function(g,x,y,s,P,K){_df(g,x,y,s,P,K);const b=P.bags||0;if(b<=0)return;g.save();g.lineCap='round';
  for(const sd of [-1,1]){const ex=x+sd*44*s,ey=y+14*s;g.strokeStyle=`rgba(110,60,120,${0.35+0.4*b})`;g.lineWidth=(4+5*b)*s;g.beginPath();g.arc(ex,ey,(17+4*b)*s,0.25*Math.PI,0.75*Math.PI);g.stroke();
    if(b>0.55){g.lineWidth=3*s;g.strokeStyle=`rgba(110,60,120,${0.4*b})`;g.beginPath();g.arc(ex,ey+8*s,(19+4*b)*s,0.3*Math.PI,0.7*Math.PI);g.stroke();}}g.restore();};}
// football helmet (sits on the crown, face fully visible) + chest number
function helmet(c,r,o={}){if(!r)return;const R=47*r.s,f=o.f||1;c.save();c.translate(r.hc.x,r.hc.y);c.rotate(o.tilt||0);c.lineJoin='round';
  c.fillStyle='#5aa8e8';c.strokeStyle=OL;c.lineWidth=5*r.s/3.4*1.4;c.beginPath();c.moveTo(-R*1.12,-R*0.08);c.bezierCurveTo(-R*1.2,-R*1.25,R*1.2,-R*1.25,R*1.12,-R*0.08);c.quadraticCurveTo(R*1.05,-R*0.32,R*0.8,-R*0.42);c.quadraticCurveTo(0,-R*0.62,-R*0.8,-R*0.42);c.quadraticCurveTo(-R*1.05,-R*0.32,-R*1.12,-R*0.08);c.closePath();c.fill();c.stroke();
  c.fillStyle='#ffd040';c.beginPath();c.moveTo(-R*0.12,-R*1.08);c.lineTo(R*0.12,-R*1.08);c.lineTo(R*0.1,-R*0.55);c.lineTo(-R*0.1,-R*0.55);c.closePath();c.fill();
  c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.ellipse(-R*0.45,-R*0.8,R*0.25,R*0.1,-0.5,0,TAU);c.fill();
  // ear pads on the sides, chin strap
  for(const sd of [-1,1]){c.fillStyle='#4a90d0';c.beginPath();c.ellipse(sd*R*1.02,R*0.1,R*0.18,R*0.3,0,0,TAU);c.fill();c.stroke();}
  c.strokeStyle='#e8e4d8';c.lineWidth=4*r.s/3.4*1.4;c.beginPath();c.moveTo(-R*1.0,R*0.35);c.quadraticCurveTo(0,R*1.25,R*1.0,R*0.35);c.stroke();c.restore();}
function jerseyNum(c,r,n='23'){if(!r)return;const x=(r.hc.x+r.hip.x)/2,y=lerp(r.hc.y,r.hip.y,0.55);txt(c,n,x,y,46*r.s/3.4*1.4,'#ffffff',{sw:9*r.s/3.4});}
function football(c,x,y,s,a=0){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);c.fillStyle='#8a4a22';c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,0,40,24,0,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.moveTo(-14,-2);c.lineTo(14,-2);c.stroke();for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*6,-8);c.lineTo(i*6,4);c.stroke();}
  c.fillStyle='rgba(255,255,255,0.3)';c.beginPath();c.ellipse(-12,-12,14,5,-0.2,0,TAU);c.fill();c.restore();}
