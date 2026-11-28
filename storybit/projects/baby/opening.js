// ---------- HOOK ----------
[0,(c,t,u,d)=>{ // useless drunk — staggering toward us
  cam(c,'street_hook',{z:K3(u,d,1.03,1.16),x:560,y:1040,r:Math.sin(u*3.1)*0.03});
  cast(c,[['towns',[1.3,0,-2.2],X('half','angry','frown',{f:-1,hf:[-56,-30],hb:[20,70]})],['fish',[-0.4,0,-3.4],X('happy','up','grin',{f:1,hf:[50,-20+Math.sin(u*14)*6],lean:-0.08})]]);
  const sway=Math.sin(u*3.6)*0.17,hic=Math.max(0,Math.sin(u*9))*10;
  const r=who(c,'oishiD',[0.15+Math.sin(u*1.8)*0.45,0,1.4+u*1.3],X('happy','up',Math.sin(u*9)>0.2?'grin':'o',{f:1,view:'front',...WK(u,5.5),rot:sway,lean:0.1,dy:-hic,hf:[62,-78+Math.sin(u*7)*14],hb:[-52,40+Math.sin(u*5)*20],propF:bottle(-0.6+Math.sin(u*7)*0.3)}));
  c.restore();if(r){for(let i=0;i<4;i++){const p=((u*1.1+i/4)%1);c.save();c.globalAlpha=(1-p)*0.9;c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(r.hc.x+110*r.s+i*26+Math.sin(p*6+i)*18,r.hc.y-40*r.s-p*240,8+i*4+p*8,0,TAU);c.stroke();c.restore();}
    for(let i=0;i<5;i++){const p=((u*1.6+i/5)%1);c.fillStyle=`rgba(210,235,255,${1-p})`;c.beginPath();c.arc(r.hf.x+10+i*9+p*40,r.hf.y-70*r.s+p*p*260,5,0,TAU);c.fill();}}
  tint(c,'rgba(255,150,80,0.16)');vign(c,0.45);}],
[1.15,(c,t,u,d)=>{ // ...and face-plants
  const hit=0.42,p=u-hit,sh=p>0&&p<0.25?(0.25-p)*50:0;cam(c,'street_hook',{z:1.2,x:540,y:1120,sx:Math.sin(u*90)*sh,sy:Math.cos(u*75)*sh});
  const k=u<hit?ei(u/hit):1,bn=p>0?Math.abs(Math.sin(p*14))*Math.exp(-p*7)*0.12:0;
  cast(c,[['towns',[1.5,0,0.4],X(p>0?'closed':'half','angry','frown',{f:-1,hf:p>0?[-10,-118]:[-56,-30],hb:[20,70],tilt:p>0?0.2:0})],['fish',[-1.5,0,-0.2],X(p>0?'wide':'happy','up',p>0?'o':'grin',{f:1,hf:[50,-20],lean:-0.08,dy:p>0?-Math.sin(clamp(p/0.25)*Math.PI)*24:0})]]);
  const r=who(c,'oishiD',[0.1,0.04,2.2],X(p>0?'squeeze':'wide','up',p>0?'o':'shout',{f:1,view:'front',rot:k*1.5-bn,hf:[70,lerp(-70,-20,k)],hb:[-60,lerp(40,-40,k)]}));
  const fp=pp([0.9,0,2.3]);at(c,[lerp(0.6,2.3,eo(clamp(u/0.9))),lerp(1.6,0,ei(clamp(u/0.7)))+0.06,2.0],(q)=>{q.rotate(u*13*(u<0.7?1:0)+1.2);q.fillStyle='#fbf8f0';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.ellipse(0,0,12,22,0,0,TAU);q.fill();q.stroke();q.fillStyle='#2a4a8a';q.fillRect(-12,-3,24,5);});
  c.restore();puff(c,fp.x,fp.y,p/0.5,12,'200,190,220',1.5);if(r&&p>0.1){for(let i=0;i<3;i++){const a=u*7+i*2.1;c.fillStyle='#ffe27a';c.strokeStyle='#18181c';c.lineWidth=3;c.save();c.translate(r.hc.x+Math.cos(a)*70,r.hc.y-70+Math.sin(a)*22);c.rotate(a);c.beginPath();for(let q=0;q<10;q++){const rr2=q%2?7:16,an=q/10*TAU;c.lineTo(Math.cos(an)*rr2,Math.sin(an)*rr2);}c.closePath();c.fill();c.stroke();c.restore();}}
  tint(c,'rgba(255,150,80,0.16)');vign(c,0.45);flash(c,p>0?0.35-p/0.12:0);
  const w=u-(d-0.1);if(w>0){c.save();c.translate(540,960);c.rotate(-0.5);c.fillStyle='#fff';c.fillRect(-1400,-lerp(4,1400,ei(w/0.1)),2800,lerp(8,2800,ei(w/0.1)));c.restore();}}],
[2.06,(c,t,u,d)=>{ // ...just to win one night
  const sh=u>0.3&&u<0.6?(0.6-u)*50:0;cam(c,'snow_hero',{z:K3(u,d,1.5,1.12),x:K3(u,d,540,560),y:K3(u,d,1300,1120),r:lerp(0.06,0,eo(u/0.8)),sx:Math.sin(u*90)*sh,sy:Math.cos(u*77)*sh});
  const B=[[-2.2,0,0.5],[1.0,0,0.5],[-1.2,0,-1.0],[0.2,0,-1.5],[2.2,0,0.0],[-3.0,0,-0.8]];
  B.forEach((p,i)=>{const a=clamp((u-0.45-i*0.09)/0.25);if(a<=0)return;c.save();c.globalAlpha=a;who(c,RA[i],p,X('dot','angry','flat',{f:i%2?-1:1,seed:i,hf:[(i%2?-1:1)*26,20],propF:i%2?lantern5():spear(0.05)}));c.restore();});
  const k=eo(clamp((u-0.25)/0.3));
  const r=who(c,'oishi',[-0.55,0,3],X(u<0.25?'closed':'dot','angry',k>0.5&&u<0.9?'teeth':'flat',{f:1,view:'front',stance:34,lean:lerp(-0.06,0.1,k),tilt:u<0.25?0.25:0,noSw:k>0.1,hf:[lerp(-30,66,k),lerp(50,-78,k)],hb:[lerp(-20,-34,k),lerp(50,64,k)],propF:k>0.05?katana2(lerp(-2.4,0.42,k)):null}));
  c.restore();if(r){slash(c,r.hc.x-10,r.hc.y+110*r.s,300*r.s,2.6,-0.6,(u-0.25)/0.5);if(u>0.55){const g=((u-0.55)*1.4)%1.6;if(g<1){const L=150*r.s,ax=r.hf.x+Math.sin(0.42)*L*(0.15+g*0.85),ay=r.hf.y-Math.cos(0.42)*L*(0.15+g*0.85);c.save();c.globalCompositeOperation='lighter';c.translate(ax,ay);c.rotate(u*3);c.fillStyle=`rgba(255,255,255,${1-g})`;for(let q=0;q<4;q++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-3);c.lineTo(46*(1-g*0.5),0);c.lineTo(0,3);c.fill();}c.restore();}}}
  snow(c,t,170);speedLines(c,t,u>0.25&&u<0.7?0.8:0,0);vign(c,0.4);flash(c,1-u/0.14);}],
[3.40,(c,t,u,d)=>{ // give me 60 seconds — they march on the gate, weapons up on the slam
  const sl=t-T_SLAM,sh=sl>0&&sl<0.3?(0.3-sl)*50:0;cam(c,'snow_march',{z:K3(u,d,1.14,1.03),y:1010,sx:Math.sin(u*90)*sh,sy:Math.cos(u*77)*sh});const up=sl>0?back(clamp(sl/0.22)):0;
  const L=[];for(let i=0;i<9;i++){const row=i%2,x=-2.9+i*0.72,z=4.6-row*1.9-u*0.55+hash(i)*0.3,sd=i%2?1:-1;const pr=i%3;
    L.push([RA[i%10],[x,0,z],{back:true,f:sd,seed:i,...(sl>0?{stance:26}:WK(u,6,i)),dy:sl>0?-Math.sin(clamp(sl/0.3)*Math.PI)*18:0,propF:pr===0?lantern5():pr===1?spear(0.03):katana2(lerp(1.2,0.1,up)),hf:pr===0?[sd*26,lerp(20,-70,up)]:pr===1?[sd*24,lerp(30,-30,up)]:[sd*40,lerp(40,-80,up)]}]);}
  cast(c,L);c.restore();if(sl>0&&sl<0.5)ring(c,540,H*0.44,eo(sl/0.5)*900,(1-sl/0.5)*0.5,'rgba(255,255,255,',10);snow(c,t,150);vign(c,0.4);}],
[5.60,(c,t,u,d)=>{ // 47 samurai — pan across the ranks with a running count
  cam(c,'snow_line',{z:1.22,x:K3(u,d,400,680),y:1000});
  const L=[];for(let r=0;r<3;r++)for(let i=0;i<8;i++){const k=r*8+i,wv=clamp((u-0.3-i*0.12-r*0.1)/0.25),pr=k%5;L.push([RA[k%10],[-5.0+i*1.15+r*0.5,0,5.2-r*2.3],{f:1,seed:k,...X('dot','angry',wv>0.2&&wv<1?'shout':'flat'),dy:-Math.sin(wv*Math.PI)*14,propF:pr===1?lantern5():pr===3?spear(0.06):null,hf:pr===1?[26,lerp(18,-30,back(wv))]:pr===3?[22,lerp(30,0,back(wv))]:null}]);}
  cast(c,L);c.restore();snow(c,t,150);vign(c,0.4);
  const t47=WT(2,5),p=t-t47,n=p>=0?47:Math.max(1,Math.round(47*clamp((t-5.75)/(t47-5.75))));const k=p>=0?back(clamp(p/0.25)):0.72;c.save();c.translate(540,1500);c.scale(k,k);c.globalAlpha=p>=0?1:0.85;txt(c,String(n),0,0,300,'#fff',{sw:44});if(p>=0)txt(c,'SAMURAI',0,170,84,'#fff',{ls:16,sw:18});c.restore();
  if(p>0&&p<0.4)ring(c,540,1500,eo(p/0.4)*520,(1-p/0.4)*0.7,'rgba(255,255,255,',10);}],
[8.50,(c,t,u,d)=>{ // pulled off the most famous revenge — the signal, then the charge
  const go=u-2.5;cam(c,'snow_oishi',{z:K3(u,2.4,1.24,1.06),x:540,y:1060});const k=back(clamp((u-0.35)/0.3));
  const B=[[-2.6,0,-2.6],[1.0,0,-2.6],[-1.8,0,-3.6],[0.3,0,-3.8],[-3.2,0,-1.6],[1.5,0,-1.4]];const L=[];
  B.forEach((p,i)=>{const wv=clamp((u-0.7-i*0.08)/0.25),sd=i%2?-1:1,g=Math.max(0,go-i*0.07);L.push([RA[i],[p[0]+(p[0]+0.75)*g*0.9,0,p[2]+g*g*9],X('dot','angry',wv>0?'shout':'flat',{f:sd,seed:i,...(g>0?RUN(u,13,i):{}),dy:g>0?0:-Math.sin(clamp(wv)*Math.PI)*16,hf:[sd*30,lerp(24,-70,back(wv))],propF:i%2?spear(0.05):katana2(0.2)})]);});
  L.push(['oishi',[-0.75,0,-1.2+Math.max(0,go-0.5)**2*8],X('dot','angry',u>0.4&&u<1.6?'shout':'flat',{f:1,view:'front',noSw:1,stance:30,...(go>0.5?RUN(u,13):{}),lean:0.04,hf:[lerp(40,58,k),lerp(40,-104,k)],hb:[-30,70],propF:katana2(lerp(1.3,0.16,k))})]);
  const R=cast(c,L);const r=R[R.length-1];breath(c,r,t,1);c.restore();
  if(r&&u>0.6&&u<2.5){const g=((u-0.6)*1.1)%1.5;if(g<1){const Lb=150*r.s,ax=r.hf.x+Math.sin(0.16)*Lb*(0.1+g*0.9),ay=r.hf.y-Math.cos(0.16)*Lb*(0.1+g*0.9);c.save();c.globalCompositeOperation='lighter';c.translate(ax,ay);c.rotate(u*3);c.fillStyle=`rgba(255,255,255,${1-g})`;for(let q=0;q<4;q++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-3);c.lineTo(50*(1-g*0.5),0);c.lineTo(0,3);c.fill();}c.restore();}}
  snow(c,t,170);speedLines(c,t,go>0?0.7:0,0);vign(c,0.45);card(c,WT(2,10),t,'THE 47 RONIN','JAPAN · A TRUE STORY',1600,{col:'#c8281e',size:76,end:12.3});}],
