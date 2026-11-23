SH={};
function tstGround(c,y,h){const g=c.createLinearGradient(0,y-h,0,y);g.addColorStop(0,'#8fb4d4');g.addColorStop(1,'#d8e0e4');c.fillStyle=g;c.fillRect(0,y-h,W,h);c.fillStyle='#4a4e54';c.fillRect(0,y,W,40);c.fillStyle='#9a9a96';c.fillRect(0,y-6,W,8);c.fillStyle='#e8d070';for(let i=0;i<8;i++)c.fillRect(i*160+20,y+22,80,6);}
SH.a=function(c,t){window.NOCAP=1;c.fillStyle='#1a1d24';c.fillRect(0,0,W,H);L2={dx:-1,rim:'#ffb070',amb:'#2a2a48'};
 tstGround(c,600,560);car(c,390,600,150,{col:'#a8323a',roll:0.4});fig2(c,{x:900,y:600,s:150/176,f:-1,t,kind:'worker',view:'side',eyes:'open',mouth:'flat'});
 tstGround(c,1120,480);van(c,430,1120,138,{col:'#ece8e0'});fig2(c,{x:950,y:1120,s:138/176,f:-1,t,kind:'woman3',view:'front',eyes:'open',mouth:'smile'});
 tstGround(c,1720,560);bus(c,520,1720,86,{col:'#e0b030',pax:1});fig2(c,{x:150,y:1720,s:86/176,f:1,t,kind:'worker',view:'side',eyes:'open',mouth:'flat'});};
SH.b=function(c,t){window.NOCAP=1;const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#f0b878');g.addColorStop(0.5,'#a8b8c8');g.addColorStop(1,'#304860');c.fillStyle=g;c.fillRect(0,0,W,H);L2={dx:-1,rim:'#ffb070',amb:'#2a2a48'};
 const wy=760,m=210;rowboat2(c,560,wy,m,'back');fig2(c,{x:560-0.55*m,y:wy-0.12*m,s:m/176,f:-1,t,kind:'worker',view:'side',crouch:60,eyes:'half',mouth:'flat'});rowboat2(c,560,wy,m,'front',{ph:0.6,oarX:-0.2});waterLine(c,0,W,wy,m,t);
 const wy2=1660,m2=112;fishBoat(c,560,wy2,m2,{col:'#2a5a8a'});waterLine(c,0,W,wy2,m2,t);};
SHOTS=[[0,'a'],[1,'b']];IMPACTS=[];
