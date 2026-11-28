SHOTS.length=0;
SHOTS.push([0,(c,t)=>{c.fillStyle='#8a8f9e';c.fillRect(0,0,W,H);}]);
// onion-skin strips: walk / sneak / run, 10 samples each over one stride cycle
SHOTS.push([301,(c,t)=>{c.fillStyle='#c8ccd4';c.fillRect(0,0,W,H);L2={dx:0.6,rim:'rgba(255,255,255,',amb:'rgba(255,255,255,0.1)',key:'rgba(255,205,150,'};
  const rows=[['leo','walk',0.6],['leoN','sneak',0.6],['speedy','run',0.6]];
  rows.forEach(([k,kind,s],r)=>{const gy=520+r*600;c.strokeStyle='#666';c.lineWidth=2;c.beginPath();c.moveTo(0,gy);c.lineTo(W,gy);c.stroke();
    for(let i=0;i<10;i++){const tt=i*0.11;const D={walk:38,sneak:30,run:62}[kind]*s;const d=tt/1.0*D*2*1.0*(kind==='run'?2.2:1);const x=60+d*1.6+i*0;
      const g=gait(d,s,1,tt,{kind,moving:1});c.globalAlpha=i===9?1:0.55;
      who(c,k,[0,0,0],Object.assign(X('dot','flat','flat',{view:'side'}),{abs:{x:80+i*96,y:gy,s},f:1,ff:g.ff,fb:g.fb,hf:g.hf,hb:g.hb,crouch:g.crouch,lean:g.lean,headX:g.headX,rot:1e-4}));
      c.fillStyle='red';c.fillRect(80+i*96+g.ff[0]*s-2,gy-2,4,4);}
    c.globalAlpha=1;});}]);
SHOTS.push([302,(c,t)=>{c.fillStyle='#3a3f4c';c.fillRect(0,0,W,H);
  sandwich(c,540,420,820,-0.05,{t:2,glint:1});
  diamondPile(c,300,900,360,2);goldBar(c,760,880,240);cashStack(c,780,1060,220);lootBag(c,280,1250,300,1,{peek:1});
  sprayCan(c,560,1250,240,0.2);heatSensor(c,860,1180,150,{on:1,fog:0.6});vaultKey(c,540,1420,560,0);spyCam(c,200,1600,140,0.1);dial(c,540,1640,110,0.5);
  trashBag(c,860,1700,220);receipt(c,960,1450,90,0.2);envelope(c,700,1800,200,-0.1);vhsTape(c,320,1820,200,0.1);}]);
