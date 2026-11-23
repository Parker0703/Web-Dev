function coverScene(){const t=110;window.__nf=0;FX={shake:0,flash:0,flashCol:'#fff',speed:0,speedDir:0};
  g.setTransform(SS,0,0,SS,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';const c=g;
  // night street, cool and dark
  dof(c,6,d=>{cityStreet(d,t,scam(0,1.4,1150),{mood:'night',cw:9000});});c.fillStyle='rgba(8,12,30,0.55)';c.fillRect(0,0,W,H);
  // truck headlights blasting in from the left
  vehDraw(c,'truck_front',540,1750,1150);c.fillStyle='rgba(8,12,30,0.25)';c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='lighter';for(const x of [300,905]){const gg=c.createRadialGradient(x,1325,0,x,1325,620);gg.addColorStop(0,'rgba(255,252,235,1)');gg.addColorStop(0.12,'rgba(255,245,215,0.7)');gg.addColorStop(0.4,'rgba(255,235,190,0.2)');gg.addColorStop(1,'rgba(255,235,190,0)');c.fillStyle=gg;c.fillRect(0,0,W,H);}c.restore();
  // a ring of ghost copies of him (every reload)
  L2={dx:1,rim:'#9fe8ff',amb:'#1a2040'};
  for(let i=7;i>=1;i--){const a=i/7;c.save();c.globalAlpha=0.10+0.03*(7-i);const dx=(i%2?1:-1)*(120+Math.floor((i-1)/2)*130);c.translate(dx,-i*12);
    HERO({c,x:540,y:2960,s:5.2-i*0.12,f:1,t,view:'front',eyes:'half',brow:'worried',mouth:'flat'});c.fillStyle='rgba(0,0,0,0)';c.restore();}
  c.save();c.globalCompositeOperation='screen';c.fillStyle='rgba(60,170,255,0.12)';c.fillRect(0,0,W,H);c.restore();
  // him: front, wide eyes, sweat, rim lit by the headlights
  HERO({c,x:540,y:3000,s:5.6,f:1,t,view:'front',eyes:'wide',brow:'up',mouth:'o',sweat:1});
  // the 3D save disk, cracked, top right
  const m=VMETA.floppy_6,im=VIMG.floppy_6;if(im){const Wd=260,k=Wd/(m.sx1-m.sx0);c.save();c.translate(870,250);c.rotate(0.18);
    c.save();c.globalCompositeOperation='lighter';const gg=c.createRadialGradient(0,0,0,0,0,300);gg.addColorStop(0,'rgba(79,214,255,0.5)');gg.addColorStop(1,'rgba(79,214,255,0)');c.fillStyle=gg;c.fillRect(-300,-300,600,600);c.restore();
    c.drawImage(im,-(m.sx0+(m.sx1-m.sx0)/2)*k,-((m.top+m.gy)/2)*k,m.w*k,m.h*k);
    c.strokeStyle='rgba(255,255,255,0.95)';c.shadowColor='#9fe8ff';c.shadowBlur=14;c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-10,-20);c.lineTo(-60,-110);c.moveTo(-10,-20);c.lineTo(70,-60);c.lineTo(110,-120);c.moveTo(-10,-20);c.lineTo(20,90);c.lineTo(-30,140);c.moveTo(-10,-20);c.lineTo(-100,40);c.stroke();c.restore();}
  // reload arrows orbiting
  vignette(c,0.55);out.drawImage(big,0,0,outC.width,outC.height);}
