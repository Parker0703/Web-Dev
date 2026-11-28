SHOTS.length=0;SHOTS.push([0,(c,t)=>{c.fillStyle='#888';c.fillRect(0,0,W,H);}]);
SHOTS.push([300,(c,t)=>{c.fillStyle='#9aa0ae';c.fillRect(0,0,W,H);L2={dx:0.6,rim:'rgba(255,255,255,',amb:'rgba(255,255,255,0.1)',key:'rgba(255,205,150,'};
  const CAST=['chingY','ching','chingOld','zheng','cheung','pirA','pirB','pirC','qing','qsail','gov','emperor','brit','portu','womA','kid'];
  CAST.forEach((k,i)=>{const col=i%4,row=Math.floor(i/4);who(c,k,[0,0,0],Object.assign(X('dot','flat','smile',{view:i%2?'3q':'front'}),{abs:{x:140+col*270,y:440+row*470,s:k==='kid'?0.75:1.12},f:1}));});}]);
SHOTS.push([302,(c,t)=>{T=2;cam(c,'sea_wide',{z:1.0,y:960});seaPaint(c,T);
  const ships=[[-90,0,-700,'tan'],[60,0,-520,'red'],[-14,0,-260,'red']];ships.forEach(([x,y,z,s],i)=>{const p=pp([x,0,z]);junk(c,p.x,p.y,32*164*p.s,{t:T,sail:s,seed:i,moving:1,flag:s==='tan'?'#e8c040':'#c8201a',cannon:i===2?1.95:null});});
  c.restore();}]);
SHOTS.push([303,(c,t)=>{T=2;cam(c,'canton',{z:1.2,y:1100});seaSurface(c,T,{z0:2,z1:40,glitter:0,n:80});const p=pp([-2,-0.6,3.0]);flowerBoat(c,p.x,p.y,12*164*p.s,{t:T});c.restore();}]);
SHOTS.push([304,(c,t)=>{T=2;cam(c,'sea_wide',{z:1.0,y:960});seaPaint(c,T);const p=pp([0,0,-110]);junk(c,p.x,p.y,32*164*p.s,{t:T,moving:1,crew:[{kind:'pirA'},{kind:'ching'},{kind:'pirB'},{kind:'pirC'}]});c.restore();}]);
