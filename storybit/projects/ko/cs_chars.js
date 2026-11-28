'use strict';
// ===== tickle video cast =====
Object.assign(KIND2,{
  hero:Object.assign(mkK({coat:'#e8743a',trim:'#fff3e6',skin:SK[1],pants:'#34445e'}),{robe:false,long:false,hair4:'swoop',hair:'#5a3524'}),
  pal:Object.assign(mkK({coat:'#3aa874',trim:'#f2fff6',skin:SK[2],pants:'#3a3a48'}),{robe:false,long:false,hair4:'part',hair:'#1c1418'}),
  sci:Object.assign(mkK({coat:'#f6f6f2',trim:'#d8dad8',skin:SK[3],pants:'#3a3c48'}),{robe:false,long:true,hair4:'longG',longHair:1,hair:'#7a3a22',fem:1,glasses:1}),
});
{const _df=drawFace4;drawFace4=function(g,x,y,s,P,K){_df(g,x,y,s,P,K);if(!K)return;
  if(K.fem&&!['shock','wide','rage'].includes(P.eyes||'dot')){g.save();g.strokeStyle=OL;g.lineCap='round';g.lineWidth=5*s;for(const sd of [-1,1]){const bx=x+sd*54*s,by=y-16*s;g.beginPath();g.moveTo(bx,by);g.quadraticCurveTo(bx+sd*8*s,by-4*s,bx+sd*13*s,by-12*s);g.stroke();}g.restore();}
  if(K.glasses){g.save();g.strokeStyle='#2a2018';g.lineWidth=5*s;for(const sd of [-1,1]){g.fillStyle='rgba(220,235,255,0.16)';g.beginPath();g.ellipse(x+sd*44*s,y-6*s,30*s,25*s,0,0,TAU);g.fill();g.stroke();}g.beginPath();g.moveTo(x-14*s,y-10*s);g.quadraticCurveTo(x,y-18*s,x+14*s,y-10*s);g.stroke();g.strokeStyle='rgba(255,255,255,0.7)';g.lineWidth=3*s;for(const sd of [-1,1]){g.beginPath();g.arc(x+sd*44*s-8*s,y-14*s,13*s,3.6,4.6);g.stroke();}g.restore();}};}
{const _df2=drawFace4;drawFace4=function(g,x,y,s,P,K){if(P.mouth!=='laugh')return _df2(g,x,y,s,P,K);_df2(g,x,y,s,Object.assign({},P,{mouth:'__none'}),K);const my=y+50*s,w=30*s,h=30*s;
  g.save();g.lineJoin='round';g.strokeStyle=OL;g.lineWidth=5*s;g.fillStyle='#6a1a24';g.beginPath();g.moveTo(x-w,my-h*0.35);g.quadraticCurveTo(x,my-h*0.55,x+w,my-h*0.35);g.quadraticCurveTo(x+w*0.9,my+h*0.9,x,my+h*0.95);g.quadraticCurveTo(x-w*0.9,my+h*0.9,x-w,my-h*0.35);g.closePath();g.fill();
  g.save();g.clip();g.fillStyle='#fff';g.fillRect(x-w,my-h*0.6,w*2,h*0.4);g.fillStyle='#ef7a86';g.beginPath();g.ellipse(x,my+h*0.7,w*0.6,h*0.35,0,0,TAU);g.fill();g.restore();g.stroke();g.restore();};}
