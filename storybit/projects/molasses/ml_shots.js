'use strict';
const XM={};const LT=i=>L[i].a;
function lens(c,t,o={}){bbCine(c,t,{v:o.v??0.5});}
XM.test1=(c,t)=>{camAt(c,'ne_street',[-2,3,-1],1.04,{oy:60});molassesSheet(c,t,-60,-3,-7,7,0.6);molassesWave(c,t,-3,7.6,{debris:1});
  cast(c,[['boy',[6,0,0.6],BF('wide','up','scream',{run:1,ph:t*14,f:-1,seed:1,hf:[30,-60],hb:[-30,-40]})],['dock',[9.5,0,-1.8],BF('shock','up','scream',{run:1,ph:t*13+1,f:-1,seed:2})]]);c.restore();lens(c,t);};
XM.test2=(c,t)=>{camAt(c,'ne_tank',[-10.5,3,6],1.1,{oy:40});
  const kp=(t*1.2)%2;cast(c,[['boy',[-8.5+Math.sin(t*2)*0.8,0,9.5],BF('happy','up','smile',{seed:3,run:1,ph:t*12,f:Math.cos(t*2)>0?1:-1})],['girl',[-6.6,0,10.6],BF('happy','up','smile',{seed:4,hf:[40,-60],hb:[-10,90],f:-1})],
    ['dock',[-12.5,0,7.5],BF('dot','flat','smile',{seed:5,hf:[30,30],hb:[-10,90]})],['dock2',[-14,0,8.2],BF('happy','up','smile',{seed:6,f:-1,hf:[-30,30],hb:[10,90]})]]);c.restore();lens(c,t);};
XM.test3=(c,t)=>{camAt(c,'ne_flood',[-4,0.9,-0.6],1.1,{oy:-60});const D=0.85;molassesSheet(c,t,-50,4,-6,7.5,D);
  const hz=[-12,0,-5.5],hp=pp([hz[0],D,hz[2]]);c.save();c.beginPath();c.rect(-3000,-3000,8000,hp.y+3000);c.clip();horse(c,hp.x,hp.y+40*hp.s,hp.s*0.95,0.15);c.restore();
  c.fillStyle=ML;c.beginPath();c.ellipse(hp.x,hp.y+4*hp.s,240*hp.s,40*hp.s,0,0,TAU);c.fill();
  stuck(c,'dock2',[-6.3,0,-3.4],0.95,BF('squeeze','worried','scream',{seed:7,surf:D,hf:[40,-90],hb:[-40,-80]}));
  stuck(c,'sailor',[-2.1,0,-0.3],0.6,BF('focus','angry','grit',{seed:8,surf:D,f:-1,hf:[-95,-30],hb:[10,60]}));stuck(c,'girl',[-4,0,1.3],0.75,BF('wide','worried','o',{seed:9,surf:D,hf:[30,-70],hb:[-30,-60]}));c.restore();lens(c,t,{v:0.6});};
const XSEQ=[['test1',0],['test2',30],['test3',60]];
SHOTS.length=0;XSEQ.forEach(([k,t0])=>{SHOTS.push([t0,(c,t,u,d)=>XM[k](c,t,u,d)]);});
