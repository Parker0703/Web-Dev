'use strict';
// ===================== THE 47 RONIN — shot script (Style 5) =====================
const X=(e,b,m,o)=>Object.assign({eyes:e,brow:b,mouth:m},o||{});
const KN={kn:1};
const WK=(t,sp=7,o=0)=>({walk:1,ph:t*sp+o});
const RUN=(t,sp=11,o=0)=>({run:1,ph:t*sp+o});
const two=(f,ang,x=54,y=2)=>({hf:[f*x,y],hb:[f*(x-16),y+16],propF:katana2(ang)});
const K3=(u,d,a,b)=>lerp(a,b,eio(clamp(u/d)));
const RA=['roninA','roninB','roninC','roninA','roninB','oishi','roninC','roninA','roninB','roninC'];
function at(c,pos,fn){const p=pp(pos);c.save();c.translate(p.x,p.y);c.scale(p.s,p.s);c.lineJoin='round';c.lineCap='round';fn(c,p);c.restore();return p;}
function label(c,t0,t,text,y=1560,o={}){const p=t-t0;if(p<0)return;const k=back(clamp(p/0.22));c.save();c.translate(540,y);c.scale(k,k);c.rotate(o.rot??-0.03);txt(c,text,0,0,o.size||120,o.col||'#fff',{ls:8,sw:(o.size||120)*0.2});c.restore();}
function wisps(c,x,y,t,n=3,h=260,col='235,235,245',a=0.5){c.save();c.lineCap='round';for(let i=0;i<n;i++){c.strokeStyle=`rgba(${col},${a})`;c.lineWidth=7-i;c.beginPath();for(let k=0;k<=14;k++){const q=k/14,yy=y-q*h,xx=x+(i-(n-1)/2)*14+Math.sin(q*5+t*2.2+i*1.7)*(8+q*34);k?c.lineTo(xx,yy):c.moveTo(xx,yy);c.globalAlpha=1;}c.stroke();}
  const g=c.createLinearGradient(0,y-h,0,y-h*0.6);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');c.restore();}
function breath(c,r,t,f=1){if(!r)return;const p=(t*0.7)%1;c.save();c.globalAlpha=(1-p)*0.4;c.fillStyle='#eef2ff';for(let i=0;i<4;i++){c.beginPath();c.arc(r.hc.x+f*(40+p*60+i*10)*r.s,r.hc.y+(20-p*26-i*5)*r.s,(8+p*16+i*2)*r.s,0,TAU);c.fill();}c.restore();}
function lowBars(c){}
const SHOTS=[
// ---------- HOOK ----------
[0,(c,t,u,d)=>{ // useless drunk — staggering toward us
  cam(c,'street_hook',{z:K3(u,d,1.03,1.16),x:560,y:1040,r:Math.sin(u*3.1)*0.03});
  cast(c,[['towns',[1.3,0,-2.2],X('half','angry','frown',{f:-1,hf:[-56,-30],hb:[20,70]})],['fish',[-0.4,0,-3.4],X('happy','up','grin',{f:1,hf:[50,-20+Math.sin(u*14)*6],lean:-0.08})]]);
  const sway=Math.sin(u*3.6)*0.17,hic=Math.max(0,Math.sin(u*9))*10;
  const r=who(c,'oishiD',[-0.3+Math.sin(u*1.8)*0.4,0,1.2+u*1.2],X('drunk','up',Math.sin(u*9)>0.2?'drunk':'o',{blushK:1.6,f:1,view:'front',...WK(u,5.5),rot:sway,lean:0.1,dy:-hic,hf:[62,-78+Math.sin(u*7)*14],hb:[-52,40+Math.sin(u*5)*20],propF:bottle(-0.6+Math.sin(u*7)*0.3)}));
  c.restore();if(r){for(let i=0;i<4;i++){const p=((u*1.1+i/4)%1);c.save();c.globalAlpha=(1-p)*0.9;c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(r.hc.x+110*r.s+i*26+Math.sin(p*6+i)*18,r.hc.y-40*r.s-p*240,8+i*4+p*8,0,TAU);c.stroke();c.restore();}
    for(let i=0;i<5;i++){const p=((u*1.6+i/5)%1);c.fillStyle=`rgba(210,235,255,${1-p})`;c.beginPath();c.arc(r.hf.x+10+i*9+p*40,r.hf.y-70*r.s+p*p*260,5,0,TAU);c.fill();}}
  tint(c,'rgba(255,150,80,0.16)');vign(c,0.45);}],
[1.15,(c,t,u,d)=>{ // ...and face-plants
  const hit=0.42,p=u-hit,sh=p>0&&p<0.25?(0.25-p)*50:0;cam(c,'street_hook',{z:1.14,x:500,y:1060,sx:Math.sin(u*90)*sh,sy:Math.cos(u*75)*sh});
  const k=u<hit?ei(u/hit):1,bn=p>0?Math.abs(Math.sin(p*14))*Math.exp(-p*7)*0.12:0;
  cast(c,[['towns',[0.75,0,-0.5],X(p>0?'closed':'half','angry','frown',{f:-1,hf:p>0?[-10,-118]:[-56,-30],hb:[20,70],tilt:p>0?0.2:0})],['fish',[-1.0,0,-1.6],X(p>0?'wide':'happy','up',p>0?'o':'grin',{f:1,hf:[50,-20],lean:-0.08,dy:p>0?-Math.sin(clamp(p/0.25)*Math.PI)*24:0})]]);
  const r=who(c,'oishiD',[0.45,0.04,2.4],X(p>0?'squeeze':'wide','up',p>0?'o':'shout',{f:-1,view:'front',rot:-(k*1.5-bn),hf:[70,lerp(-70,-20,k)],hb:[-60,lerp(40,-40,k)]}));
  const fp=pp([-0.6,0,2.5]);at(c,[lerp(-0.3,0.9,eo(clamp(u/0.9))),lerp(1.6,0,ei(clamp(u/0.7)))+0.06,2.0],(q)=>{q.rotate(u*13*(u<0.7?1:0)+1.2);q.fillStyle='#fbf8f0';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.ellipse(0,0,12,22,0,0,TAU);q.fill();q.stroke();q.fillStyle='#2a4a8a';q.fillRect(-12,-3,24,5);});
  c.restore();puff(c,fp.x,fp.y,p/0.5,12,'200,190,220',1.5);if(r&&p>0.1){for(let i=0;i<3;i++){const a=u*7+i*2.1;c.fillStyle='#ffe27a';c.strokeStyle='#18181c';c.lineWidth=3;c.save();c.translate(r.hc.x+Math.cos(a)*70,r.hc.y-70+Math.sin(a)*22);c.rotate(a);c.beginPath();for(let q=0;q<10;q++){const rr2=q%2?7:16,an=q/10*TAU;c.lineTo(Math.cos(an)*rr2,Math.sin(an)*rr2);}c.closePath();c.fill();c.stroke();c.restore();}}
  tint(c,'rgba(255,150,80,0.16)');vign(c,0.45);flash(c,p>0?0.35-p/0.12:0);
  const w=u-(d-0.1);if(w>0){c.save();c.translate(540,960);c.rotate(-0.5);c.fillStyle='#fff';c.fillRect(-1400,-lerp(4,1400,ei(w/0.1)),2800,lerp(8,2800,ei(w/0.1)));c.restore();}}],
[2.06,(c,t,u,d)=>{ // ...just to win one night
  const sh=u>0.3&&u<0.6?(0.6-u)*50:0;cam(c,'snow_hero',{z:K3(u,d,1.5,1.12),x:K3(u,d,540,560),y:K3(u,d,1300,1120),r:lerp(0.06,0,eo(u/0.8)),sx:Math.sin(u*90)*sh,sy:Math.cos(u*77)*sh});
  const B=[[-2.2,0,0.5],[1.0,0,0.5],[-1.2,0,-1.0],[0.2,0,-1.5],[2.2,0,0.0],[-3.0,0,-0.8]];
  B.forEach((p,i)=>{const a=clamp((u-0.45-i*0.09)/0.25);if(a<=0)return;c.save();c.globalAlpha=a;who(c,RA[i],p,X('glare','angry','flat',{f:i%2?-1:1,seed:i,hf:[(i%2?-1:1)*26,20],propF:i%2?lantern5():spear(0.05)}));c.restore();});
  const k=eo(clamp((u-0.25)/0.3));
  const r=who(c,'oishi',[-0.55,0,3],X(u<0.25?'closed':'glare','angry',k>0.5&&u<0.9?'grit':'flat',{gloom:u<0.25,f:1,view:'front',stance:34,lean:lerp(-0.06,0.1,k),tilt:u<0.25?0.25:0,noSw:k>0.1,hf:[lerp(-30,66,k),lerp(50,-78,k)],hb:[lerp(-20,-34,k),lerp(50,64,k)],propF:k>0.05?katana2(lerp(-2.4,0.42,k)):null}));
  c.restore();if(r){if(u>0.55){const g=((u-0.55)*1.4)%1.6;if(g<1){const L=150*r.s,ax=r.hf.x+Math.sin(0.42)*L*(0.15+g*0.85),ay=r.hf.y-Math.cos(0.42)*L*(0.15+g*0.85);c.save();c.globalCompositeOperation='lighter';c.translate(ax,ay);c.rotate(u*3);c.fillStyle=`rgba(255,255,255,${1-g})`;for(let q=0;q<4;q++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-3);c.lineTo(46*(1-g*0.5),0);c.lineTo(0,3);c.fill();}c.restore();}}}
  snow(c,t,170);speedLines(c,t,u>0.25&&u<0.7?0.8:0,0);vign(c,0.4);flash(c,1-u/0.14);}],
[3.40,(c,t,u,d)=>{ // give me 60 seconds — they march on the gate, weapons up on the slam
  const sl=t-T_SLAM,sh=sl>0&&sl<0.3?(0.3-sl)*50:0;cam(c,'snow_march',{z:K3(u,d,1.14,1.03),y:1010,sx:Math.sin(u*90)*sh,sy:Math.cos(u*77)*sh});const up=sl>0?back(clamp(sl/0.22)):0;
  const L=[];for(let i=0;i<9;i++){const row=i%2,x=-2.9+i*0.72,z=4.6-row*1.9-u*0.55+hash(i)*0.3,sd=i%2?1:-1;const pr=i%3;
    L.push([RA[i%10],[x,0,z],{back:true,f:sd,seed:i,...(sl>0?{stance:26}:WK(u,6,i)),dy:sl>0?-Math.sin(clamp(sl/0.3)*Math.PI)*18:0,propF:pr===0?lantern5():pr===1?spear(0.03):katana2(lerp(1.2,0.1,up)),hf:pr===0?[sd*26,lerp(20,-70,up)]:pr===1?[sd*24,lerp(30,-30,up)]:[sd*40,lerp(40,-80,up)]}]);}
  cast(c,L);c.restore();if(sl>0&&sl<0.5)ring(c,540,H*0.44,eo(sl/0.5)*900,(1-sl/0.5)*0.5,'rgba(255,255,255,',10);snow(c,t,150);vign(c,0.4);}],
[5.60,(c,t,u,d)=>{ // 47 samurai — pan across the ranks with a running count
  cam(c,'snow_line',{z:1.22,x:K3(u,d,400,680),y:1000});
  const L=[];for(let r=0;r<3;r++)for(let i=0;i<8;i++){const k=r*8+i,wv=clamp((u-0.3-i*0.12-r*0.1)/0.25),pr=k%5;L.push([RA[k%10],[-5.0+i*1.15+r*0.5,0,5.2-r*2.3],{f:1,seed:k,...X('glare','angry',wv>0.2&&wv<1?'yell':'flat'),dy:-Math.sin(wv*Math.PI)*14,propF:pr===1?lantern5():pr===3?spear(0.06):null,hf:pr===1?[26,lerp(18,-30,back(wv))]:pr===3?[22,lerp(30,0,back(wv))]:null}]);}
  cast(c,L);c.restore();snow(c,t,150);vign(c,0.4);
  const t47=WT(2,5),p=t-t47,n=p>=0?47:Math.max(1,Math.round(47*clamp((t-5.75)/(t47-5.75))));const k=p>=0?back(clamp(p/0.25)):0.72;c.save();c.translate(540,1500);c.scale(k,k);c.globalAlpha=p>=0?1:0.85;txt(c,String(n),0,0,300,'#fff',{sw:44});if(p>=0)txt(c,'SAMURAI',0,170,84,'#fff',{ls:16,sw:18});c.restore();
  if(p>0&&p<0.4)ring(c,540,1500,eo(p/0.4)*520,(1-p/0.4)*0.7,'rgba(255,255,255,',10);}],
[8.50,(c,t,u,d)=>{ // pulled off the most famous revenge — the signal, then the charge
  const go=u-2.5;cam(c,'snow_oishi',{z:K3(u,2.4,1.24,1.06),x:540,y:1060});const k=back(clamp((u-0.35)/0.3));
  const B=[[-2.6,0,-2.6],[1.0,0,-2.6],[-1.8,0,-3.6],[0.3,0,-3.8],[-3.2,0,-1.6],[1.5,0,-1.4]];const L=[];
  B.forEach((p,i)=>{const wv=clamp((u-0.7-i*0.08)/0.25),sd=i%2?-1:1,g=Math.max(0,go-i*0.07);L.push([RA[i],[p[0]+(p[0]+0.75)*g*0.9,0,p[2]+g*g*9],X('glare','angry',wv>0?'yell':'flat',{f:sd,seed:i,...(g>0?RUN(u,13,i):{}),dy:g>0?0:-Math.sin(clamp(wv)*Math.PI)*16,hf:[sd*30,lerp(24,-70,back(wv))],propF:i%2?spear(0.05):katana2(0.2)})]);});
  L.push(['oishi',[-0.75,0,-1.2+Math.max(0,go-0.5)**2*8],X('glare','furious',u>0.4&&u<1.6?'yell':'flat',{f:1,view:'front',noSw:1,stance:30,...(go>0.5?RUN(u,13):{}),lean:0.04,hf:[lerp(40,58,k),lerp(40,-104,k)],hb:[-30,70],propF:katana2(lerp(1.3,0.16,k))})]);
  const R=cast(c,L);const r=R[R.length-1];breath(c,r,t,1);c.restore();
  if(r&&u>0.6&&u<2.5){const g=((u-0.6)*1.1)%1.5;if(g<1){const Lb=150*r.s,ax=r.hf.x+Math.sin(0.16)*Lb*(0.1+g*0.9),ay=r.hf.y-Math.cos(0.16)*Lb*(0.1+g*0.9);c.save();c.globalCompositeOperation='lighter';c.translate(ax,ay);c.rotate(u*3);c.fillStyle=`rgba(255,255,255,${1-g})`;for(let q=0;q<4;q++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-3);c.lineTo(50*(1-g*0.5),0);c.lineTo(0,3);c.fill();}c.restore();}}
  snow(c,t,170);speedLines(c,t,go>0?0.7:0,0);vign(c,0.45);card(c,WT(2,10),t,'THE 47 RONIN','JAPAN · A TRUE STORY',1600,{col:'#c8281e',size:76,end:12.3});}],
// ---------- 1701 ----------
[12.60,(c,t,u,d)=>{cam(c,'castle_ext',{z:K3(u,d,1.14,1.0),y:K3(u,d,700,960)});c.restore();petals(c,t,30);tint(c,'rgba(255,220,170,0.12)');vign(c,0.3);card(c,12.9,t,'EDO CASTLE','1701',1500,{col:'#c8281e',size:84});}],
[14.50,(c,t,u,d)=>{ // inside the Shogun's castle, Lord Asano
  cam(c,'hall_wide',{z:K3(u,d,1.1,1.25),y:1040});
  cast(c,[['castleG',[-1.7,0,-7.5],X('dot','flat','flat',{f:1})],['castleG',[1.7,0,-10],X('dot','flat','flat',{f:-1})],['kira',[-0.8,0,-13],X('half','smug','smirk',{f:1,propF:fan(0),hf:[20,40]})],
    ['asano',[0.4,0,-7.2+u*1.5],X('dot','flat','flat',{f:-1,view:'front',...WK(u,6)})]]);
  c.restore();tint(c,'rgba(255,190,110,0.1)');vign(c,0.45);tag(c,WT(4,4)+0.1,t,'LORD ASANO',540,1560);}],
[16.60,(c,t,u,d)=>{ // insulted one too many times
  cam(c,'hall_two',{z:K3(u,d,1.05,1.16),y:900});const j=Math.sin(u*40)*2*clamp(u/1.5);
  const A=who(c,'asano',[0.62,0,-6],X('glare',u>1.2?'furious':'angry',u>1.2?'grit':'frown',{f:-1,vein:u>0.9,hf:[-24+j,84],hb:[26-j,86],dx:j,sweat:0}));
  who(c,'kira',[-0.62,0,-6],X('sly','smug',Math.sin(u*14)>0?'grin':'sneer',{f:1,lean:0.1,hf:[60,-6+Math.sin(u*14)*8],propF:fan(0,1.35),hb:[-30,50]}));
  c.restore();if(A&&u>0.9){c.save();c.translate(A.hc.x+70*A.s,A.hc.y-90*A.s);c.scale(A.s*1.4*(1+Math.sin(u*20)*0.08),A.s*1.4);c.strokeStyle='#e0241c';c.lineWidth=7;c.lineCap='round';for(let k=0;k<4;k++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(6,16);c.quadraticCurveTo(6,6,16,6);c.stroke();}c.restore();}
  tint(c,'rgba(255,190,110,0.1)');vign(c,0.45);}],
[18.90,(c,t,u,d)=>{ // an official named Kira
  cam(c,'hall_kira',{z:K3(u,d,1.0,1.14),y:860});
  who(c,'kira',[-0.5,0,-6],X('sly','smug','sneer',{f:1,view:'front',hf:[40,K3(u,0.5,50,-18)],hb:[-26,70],propF:fan(clamp(u/0.35),0.15)}));
  c.restore();tint(c,'rgba(255,190,110,0.1)');vign(c,0.45);tag(c,WT(4,16),t,'KIRA',540,1560,{col:'#b04a8a'});}],
[20.60,(c,t,u,d)=>{ // so he draws his sword
  const k=eo(clamp((u-0.35)/0.3));cam(c,'hall_asano',{z:lerp(1.0,1.12,eo(u/d)),x:600,y:1000,r:lerp(0,-0.04,k)});
  const r=who(c,'asano',[0.95,0,-4.5],X(u<0.3?'glare':'rage','furious',k>0.5?'yell':'grit',{vein:1,f:-1,view:'front',lean:-0.1*k,noSw:k>0.2,hf:[lerp(-20,-70,k),lerp(50,-34,k)],hb:[lerp(14,30,k),lerp(70,62,k)],propF:k>0.2?katana2(lerp(2.2,0.5,k)):null}));
  c.restore();if(r&&k>0.2)sparks(c,r.hf.x,r.hf.y-90*r.s,(u-0.45)/0.5,10,3,'220,235,255');speedLines(c,t,k*0.7,0);tint(c,'rgba(255,120,80,'+0.18*k+')');vign(c,0.5);}],
[21.75,(c,t,u,d)=>{ // and slashes him
  const hit=0.22,p=u-hit,sh=p>0&&p<0.35?(0.35-p)*70:0;cam(c,'hall_two',{z:1.22,x:540,y:900,r:-0.07,sx:Math.sin(u*95)*sh,sy:Math.cos(u*80)*sh});
  const k=eo(clamp(u/hit));const rec=eo(clamp(p/0.4));
  const Kr=who(c,'kira',[-0.3-rec*0.3,0,-6],X(p>0?'squeeze':'shock',p>0?'worried':'up',p>0?'yell':'o',{f:1,tear:p>0,lean:-0.3*rec,hf:[lerp(30,-30,rec),lerp(40,-70,rec)],hb:[-40,lerp(60,-40,rec)],sweat:1}));
  const A=who(c,'asano',[lerp(1.5,0.62,k),0,-6],X('rage','furious','yell',{f:-1,noSw:1,lean:0.3,stance:40,hf:[lerp(-20,-80,k),lerp(-80,30,k)],hb:[-40,40],propF:katana2(lerp(-0.6,2.0,k))}));
  if(Kr&&p>0){at(c,[-1.15-rec*0.5,0,-6],(c2)=>{});const ph=clamp(p/0.5);c.save();c.translate(Kr.hc.x+140*Kr.s*ph,Kr.hc.y-120*Kr.s-300*Kr.s*ph+420*Kr.s*ph*ph);c.rotate(ph*9);const s=Kr.s;c.strokeStyle='#18181c';c.lineWidth=8*s;c.beginPath();c.moveTo(0,0);c.lineTo(0,-60*s);c.stroke();c.strokeStyle='#e8c060';c.lineWidth=4.6*s;c.beginPath();c.moveTo(0,0);c.lineTo(0,-60*s);c.stroke();c.restore();}
  c.restore();if(A)slash(c,A.hf.x-40,A.hf.y-30,360,-0.9,2.6,u/0.55,{glow:'rgba(255,170,150,'});
  if(Kr&&p>0){sparks(c,Kr.hc.x+10,Kr.hc.y-60*Kr.s,p/0.45,14,7,'255,120,100');}
  speedLines(c,t,u<0.5?0.9:0.3,1);tint(c,'rgba(255,90,60,0.14)');vign(c,0.5);flash(c,p>0?1-p/0.12:0);}],
[23.30,(c,t,u,d)=>{ // big mistake
  cam(c,'hall_two',{z:K3(u,d,1.16,1.06),y:940});const k=eo(clamp(u/0.3));
  who(c,'kira',[-0.95,0,-7.4],X('sad','worried','wobble',{f:1,cry:1,...KN,lean:0.2,hf:[10,-40],hb:[-20,60],sweat:1}));
  cast(c,[['castleG',[lerp(2.6,1.05,k),0,-6.2],X('dot','angry','frown',{f:-1,lean:0.12,...(k<0.98?RUN(u,14):{}),hf:[-54,10],hb:[-40,30]})],['castleG',[lerp(-2.0,-0.45,k),0,-6.2],X('dot','angry','frown',{f:1,lean:0.12,...(k<0.98?RUN(u,14,2):{}),hf:[54,10],hb:[40,30]})],
    ['asano',[0.3,0,-6],X('shock','worried','wobble',{f:-1,view:'front',gloom:1,noSw:1,crouch:lerp(0,16,k),hf:[-70,-10],hb:[70,-10],sweat:1})]]);
  at(c,[0.1,0,-5.0],(q)=>{q.rotate(0.35);q.strokeStyle='#18181c';q.lineWidth=9;q.beginPath();q.moveTo(-70,0);q.lineTo(80,0);q.stroke();q.strokeStyle='#dfe6f2';q.lineWidth=5;q.beginPath();q.moveTo(-24,0);q.lineTo(80,0);q.stroke();q.strokeStyle='#2a2636';q.beginPath();q.moveTo(-70,0);q.lineTo(-30,0);q.stroke();});
  c.restore();tint(c,'rgba(255,190,110,0.1)');vign(c,0.5);label(c,23.45,t,'BIG MISTAKE',1560,{col:'#ff4a3a',size:116});}],
[25.00,(c,t,u,d)=>{ // drawing a sword in that castle is a crime
  cam(c,'hall_walk',{z:K3(u,d,1.0,1.12),y:960});const z=-8.2-u*1.1;
  cast(c,[['castleG',[-0.75,0,z-0.1],{back:true,f:1,...WK(u,6),hf:[40,30]}],['castleG',[0.75,0,z-0.1],{back:true,f:-1,...WK(u,6,3.1),hf:[-40,30]}],['asano',[0,0,z],{back:true,f:1,noSw:1,...WK(u,6,1.5),hf:[-6,60],hb:[6,60],lean:0.06}]]);
  c.restore();tint(c,'rgba(255,170,100,0.12)');vign(c,0.55);stamp(c,WT(6,9),t,'CRIME',540,1520,{size:170});}],
[27.10,(c,t,u,d)=>{ // ordered to take his own life
  cam(c,'court_sepp',{z:K3(u,d,1.0,1.16),x:560,y:960});
  who(c,'official',[2.6,0,-0.6],X('closed','flat','flat',{f:-1,blur:3,hf:[-14,80],hb:[10,84]}));
  at(c,[0.4,0.002,1.6],(q)=>{q.fillStyle='rgba(250,248,240,0.96)';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.ellipse(0,6,190,42,0,0,TAU);q.fill();q.stroke();});
  who(c,'asanoW',[0.4,0,1.6],X('closed','sad','flat',{f:1,view:'front',...KN,tilt:K3(u,d,0,0.22),lean:K3(u,d,0,0.06),hf:[24,80],hb:[-24,80]}));
  at(c,[0.4,0,2.05],(q)=>{q.scale(0.55,0.55);q.fillStyle='#c8a878';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.moveTo(-46,-30);q.lineTo(46,-30);q.lineTo(38,0);q.lineTo(-38,0);q.closePath();q.fill();q.stroke();q.fillRect(-54,-38,108,9);q.strokeRect(-54,-38,108,9);
    q.strokeStyle='#18181c';q.lineWidth=8;q.beginPath();q.moveTo(-40,-44);q.lineTo(40,-44);q.stroke();q.strokeStyle='#f4f6fb';q.lineWidth=4.4;q.beginPath();q.moveTo(-14,-44);q.lineTo(40,-44);q.stroke();q.strokeStyle='#f0ece0';q.beginPath();q.moveTo(-40,-44);q.lineTo(-16,-44);q.stroke();});
  c.restore();godrays(c,1180,120,0.1,'255,190,140');petals(c,t,22);tint(c,'rgba(255,150,110,0.14)');vign(c,0.5);}],
[30.60,(c,t,u,d)=>{ // Kira walks away with a scratch
  cam(c,'hall_walk',{z:K3(u,d,1.12,1.0),y:920});
  const r=who(c,'kira',[0.1,0,-9+u*1.6],X('sly','smug','sneer',{f:1,view:'front',...WK(u,6),hf:[30,40],propF:fan(1,0.2)}));
  if(r){const s=r.s,R=47*s;c.save();c.translate(r.hc.x+18*s,r.hc.y-R*0.42);c.rotate(-0.25);c.fillStyle='#f6f3ea';c.strokeStyle='#18181c';c.lineWidth=2.4*s;rr(c,-13*s,-6*s,26*s,12*s,3*s);c.fill();c.stroke();c.strokeStyle='#c8322a';c.lineWidth=2*s;c.beginPath();c.moveTo(-5*s,0);c.lineTo(5*s,0);c.stroke();c.restore();}
  c.restore();tint(c,'rgba(255,190,110,0.1)');vign(c,0.45);tag(c,WT(8,5)-0.1,t,'JUST A SCRATCH',540,1560,{col:'#b04a8a'});}],
// ---------- the fall ----------
[32.90,(c,t,u,d)=>{ // lose everything
  cam(c,'court_ret',{z:K3(u,d,1.0,1.14),y:940});
  const fl=-Math.sin(clamp(u/0.3)*Math.PI)*26;
  cast(c,[['retA',[-1.5,0,0.3],X('shock','up','o',{f:1,dy:fl,sweat:1,hf:[30,-40],hb:[-20,60]})],['retB',[1.9,0,0.2],X('sad','sad','wobble',{f:-1,tear:1,dy:fl*0.7})],['retC',[-0.6,0,-0.5],X('closed','sad','sad',{f:1,lean:0.1,cry:1})],['retB',[1.1,0,-0.7],X('shock','worried','o',{f:-1,seed:3})],
    ['oishiK',[0.3,0,0.9],X(u>1?'closed':'shock','sad',u>1?'sad':'o',{f:1,view:'front',gloom:u>1,lean:0,headX:0,tilt:u>1?0.12:0,hf:[18,88],hb:[-18,88]})]]);
  c.restore();tint(c,'rgba(120,130,180,0.2)');vign(c,0.5);}],
[35.40,(c,t,u,d)=>{cam(c,'court_cush',{z:K3(u,d,1.06,1.16)});c.restore();petals(c,t,8);tint(c,'rgba(120,130,180,0.25)');vign(c,0.6);label(c,35.5,t,'NO MASTER',1500);}],
[36.25,(c,t,u,d)=>{cam(c,'court_shoji',{z:K3(u,d,1.06,1.14),x:520});
  at(c,[-1.24,0.6,-6.55],(q)=>{q.strokeStyle='#18120c';q.fillStyle='#8a6238';q.lineWidth=5;for(const a of [0.62,-0.62]){q.save();q.translate(0,-250);q.rotate(a);q.fillRect(-250,-22,500,44);q.strokeRect(-250,-22,500,44);q.strokeStyle='rgba(40,20,8,0.4)';q.lineWidth=2;q.beginPath();q.moveTo(-240,-6);q.lineTo(240,-2);q.moveTo(-240,8);q.lineTo(240,10);q.stroke();q.strokeStyle='#18120c';q.lineWidth=5;q.restore();}
    q.fillStyle='#f4ecd8';q.fillRect(-46,-330,92,160);q.strokeRect(-46,-330,92,160);q.fillStyle='#c0281e';q.fillRect(-18,-214,36,36);q.strokeStyle='rgba(30,30,40,0.7)';q.lineWidth=5;for(let k=0;k<3;k++){q.beginPath();q.moveTo(-24+k*24,-312);q.lineTo(-24+k*24,-236);q.stroke();}});
  c.restore();tint(c,'rgba(120,130,180,0.22)');vign(c,0.55);label(c,36.3,t,'NO HOME',1500);}],
[37.05,(c,t,u,d)=>{cam(c,'court_plan',{z:1.1,y:900});
  const r=who(c,'retA',[0.2,0,1.2],X('sad','sad','wobble',{f:1,view:'front',hf:[44,-6],hb:[-20,80],propF:pouch()}));
  if(r){const p=clamp(u/0.6);c.fillStyle='#e8c060';c.strokeStyle='#18181c';c.lineWidth=3;c.beginPath();c.ellipse(r.hf.x+6,r.hf.y+50+p*p*560,13,13*Math.abs(Math.cos(u*14)),0,0,TAU);c.fill();c.stroke();}
  c.restore();tint(c,'rgba(120,130,180,0.2)');vign(c,0.5);label(c,37.1,t,'NO PAY',1560);}],
[37.85,(c,t,u,d)=>{ // they're now ronin... samurai with nothing
  cam(c,'street_dusk',{z:K3(u,d,1.0,1.12),y:940});
  const L=[];for(let i=0;i<5;i++)L.push([['retA','retB','oishiK','retC','retB'][i],[-2.0+i*1.0,0,0.5-u*1.3-(i%2)*1.2],{back:true,f:i%2?1:-1,seed:i,...WK(u,5.5,i*1.3),lean:0.08}]);
  cast(c,L);c.restore();tint(c,'rgba(255,140,90,0.14)');vign(c,0.5);card(c,WT(10,7)-0.15,t,'RONIN','samurai with no master',1540,{col:'#c8281e',size:92});}],
[40.00,(c,t,u,d)=>{ // everyone expects revenge
  cam(c,'street_dusk',{z:1.14,x:540,y:900});
  who(c,'oishiK',[0,0,-7],{back:true,f:1,...WK(u,5)});
  cast(c,[['towns',[-0.5,0,2.4],X('dot','worried','o',{f:1,lean:0.1,hf:[44,-36],hb:[-10,80]})],['fish',[0.5,0,2.5],X('wide','up','o',{f:-1,hf:[-20,70]})]]);
  c.restore();tint(c,'rgba(255,140,90,0.14)');vign(c,0.5);}],
[41.30,(c,t,u,d)=>{ // Kira expects revenge
  cam(c,'mans_day_kira',{z:K3(u,d,1.0,1.14),y:900});
  who(c,'kira',[0,0.7,-16.6],X('shock','worried','wobble',{f:Math.sin(u*5)>0?1:-1,sweat:2,look:[Math.sin(u*5)*3,0],sweat:1,hf:[26,30+Math.sin(u*30)*3],hb:[-26,34],propF:fan(0,0.4),dx:Math.sin(u*38)*2}));
  c.restore();vign(c,0.45);}],
[43.40,(c,t,u,d)=>{ // fills his house with guards
  cam(c,'mans_day_wide',{z:K3(u,d,1.5,1.66),y:1290});
  const L=[];for(let r=0;r<3;r++)for(let i=0;i<7;i++){const k=r*7+i,a=spring((u-0.15-k*0.045)*1.6);if(a<=0.02)continue;L.push([k%2?'guard':'guard2',[-3.6+i*1.2,0,-5.2+r*0.95],{f:i<3?1:-1,sc:a,seed:k,...X('glare','angry','flat'),hf:[i<3?26:-26,24],propF:spear(0.04)}]);}
  cast(c,L);c.restore();vign(c,0.4);label(c,WT(13,6)-0.05,t,'GUARDS',1680,{size:130});}],
[45.10,(c,t,u,d)=>{ // the ronin do the opposite
  cam(c,'court_plan',{z:K3(u,d,1.04,1.2),y:860});
  cast(c,[['retA',[-0.95,0,0.4],X('dot','up','o',{f:1,lean:0.12})],['retB',[1.35,0,0.3],X('dot','up','flat',{f:-1,lean:0.12})],['retC',[-0.3,0,-0.4],X('dot','flat','flat',{f:1})],
    ['oishiK',[0.2,0,1.2],X('sly','smug','sneer',{f:1,view:'front',hf:[44,K3(u,0.5,60,-70)],hb:[-18,88]})]]);
  c.restore();tint(c,'rgba(255,150,100,0.12)');vign(c,0.5);}],
[47.40,(c,t,u,d)=>{ // they split up
  cam(c,'street_dusk',{z:1.04,y:960});
  cast(c,[['retA',[-0.6-u*2.4,0,0.5],{f:-1,...WK(u,7)}],['retB',[0.6+u*2.4,0,0.2],{f:1,...WK(u,7,2)}],['oishiK',[0,0,-1-u*2.5],{back:true,f:1,...WK(u,7,1)}],['retC',[-0.3-u*1.2,0,-2-u*2],{back:true,f:-1,...WK(u,7,4)}]]);
  c.restore();tint(c,'rgba(255,140,90,0.14)');vign(c,0.5);}],
[48.30,(c,t,u,d)=>{ // some take normal jobs
  cam(c,'street_dusk',{z:1.1,y:940});
  cast(c,[['towns',[1.9,0,-3],X('happy','flat','smile',{f:-1,hf:[-30,30]})],['fish',[-0.9+u*1.4,0,0.6],X('happy','up','grin',{f:1,...WK(u,7),hf:[10,-8],hb:[-10,-6],propF:pole()})]]);
  c.restore();tint(c,'rgba(255,140,90,0.12)');vign(c,0.45);}],
// ---------- Oishi's act ----------
[49.30,(c,t,u,d)=>{ // their leader, Oishi
  cam(c,'street_tea',{z:K3(u,d,1.06,1.2),x:560,y:880});
  who(c,'oishiD',[2.9,0.55,-0.3],X('sly','smug','smirk',{f:1,view:'front',blushK:1.3,...KN,hf:[26,80],hb:[-26,80]}));teaTable(c,u,0);
  c.restore();tint(c,'rgba(255,140,70,0.14)');vign(c,0.5);tag(c,WT(18,0),t,'OISHI · THE LEADER',540,1560,{col:'#3f9aa4'});}],
[51.95,(c,t,u,d)=>{ // drinks, parties
  cam(c,'street_tea',{z:K3(u,d,1.2,1.06),x:560,y:900,r:Math.sin(u*2.2)*0.012});const g=Math.sin(u*5);
  /*friend*/const FR=()=>who(c,'towns',[3.65,0.55,0.75],X('happy','up','grin',{f:-1,...KN,lean:0.06+g*0.03,hf:[-44,-30+g*8],hb:[20,60],propF:bottle(-0.9)}));
  teaTable(c,u,1);who(c,'oishiD',[2.9,0.55,-0.3],X('drunk','up','drunk',{blushK:1.7,f:1,view:'front',...KN,tilt:g*0.08,lean:g*0.04,hf:[40,-58+g*12],hb:[-40,-30-g*12],propF:cup()}));FR();
  c.restore();for(let i=0;i<4;i++){const p=((u*0.6+i/4)%1);c.save();c.globalAlpha=1-p;txt(c,'♪',300+i*150+Math.sin(p*5+i)*40,1250-p*500,70,'#ffe6a0',{sw:10});c.restore();}
  tint(c,'rgba(255,140,70,0.16)');vign(c,0.5);}],
[55.20,(c,t,u,d)=>{ // lets the whole country think he's given up
  cam(c,'street_hook',{z:K3(u,d,1.14,1.24),x:520,y:1080});
  who(c,'towns',[1.2,0,-1.6],X('sly','angry','sneer',{f:-1,hf:[-30,-30],hb:[20,70]}));who(c,'fish',[-1.0,0,-3.2],X('dot','worried','frown',{f:1}));
  const r=who(c,'oishiD',[-0.5,0.05,0.4],X('sleep','up','drool',{blushK:1.6,f:1,view:'front',rot:1.42,hf:[60,-40],hb:[-50,-30]}));
  at(c,[0.6,0,1.0],(q)=>{q.rotate(1.2);q.fillStyle='#fbf8f0';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.ellipse(0,0,12,22,0,0,TAU);q.fill();q.stroke();q.fillStyle='#2a4a8a';q.fillRect(-12,-3,24,5);});
  c.restore();if(r){for(let i=0;i<3;i++){const p=((u*0.7+i/3)%1);c.save();c.globalAlpha=1-p;txt(c,'z',r.hc.x+90+p*90+i*10,r.hc.y-60-p*150,40+p*40,'#fff',{sw:8});c.restore();}}
  tint(c,'rgba(255,150,80,0.14)');vign(c,0.5);}],
[57.00,(c,t,u,d)=>{ // Kira's spies watch
  cam(c,'street_spy',{z:K3(u,d,1.0,1.1),x:560,y:940});
  who(c,'oishiD',[2.4,0.55,1.6],X('drunk','up','drunk',{blushK:1.7,f:1,view:'front',...KN,hf:[40,-50],propF:cup()}));
  who(c,'spy',[-1.0,0,-1.3],{back:true,f:1,lean:0.1,hf:[30,-30],hb:[-10,80],blur:2.5});
  c.restore();c.save();c.fillStyle='rgba(6,6,14,0.5)';c.fillRect(0,0,150,H);c.restore();tint(c,'rgba(60,70,160,0.2)');vign(c,0.65);}],
[58.20,(c,t,u,d)=>{ // and slowly relax
  cam(c,'mans_day_guard',{z:K3(u,d,1.0,1.1),y:940});const y=Math.sin(u*2.4);
  who(c,'guard2',[-0.9,0,-6.7],X('sleep','flat','drool',{f:1,...KN,lean:-0.18,hf:[20,60],hb:[-20,60]}));
  const r=who(c,'guard',[0.35,0,-6.5],X('sleep','up','o',{f:-1,view:'front',lean:-0.04,tilt:-0.1,hf:[-50,-118+y*4],hb:[56,-110-y*4]}));
  c.restore();if(r){for(let i=0;i<3;i++){const p=((u*0.6+i/3)%1);c.save();c.globalAlpha=1-p;txt(c,'z',r.hc.x-330+p*60,r.hc.y-10-p*130,36+p*36,'#fff',{sw:8});c.restore();}}vign(c,0.4);}],
// ---------- the night ----------
[59.95,(c,t,u,d)=>{cam(c,'snow_empty',{z:K3(u,d,1.12,1.0),y:900});c.restore();snow(c,t,190);vign(c,0.5);card(c,60.1,t,'ALMOST 2 YEARS LATER','a winter night',1520,{col:'#6a8ad8',size:58,w:840});}],
[61.70,(c,t,u,d)=>{ // 47 of them
  cam(c,'snow_march',{z:K3(u,d,1.1,1.0),y:1000});const k=eo(clamp(u/2.4));
  const L=[];for(let i=0;i<12;i++){const sd=i%2?1:-1,row=Math.floor(i/2);const x=sd*lerp(4.4+row*0.5,0.5+row*0.72,k),z=1.2+(row%3)*1.7+hash(i)*0.3;L.push([RA[i%10],[x,0,z],{back:k>0.9,f:-sd,seed:i,...(k<0.98?WK(u,7,i):{}),...X('glare','angry','flat'),propF:i%4===0?lantern5():i%4===2?spear(0.05):null,hf:i%4===0?[-sd*26,20]:i%4===2?[-sd*24,30]:null}]);}
  cast(c,L);c.restore();snow(c,t,170);vign(c,0.45);}],
[64.70,(c,t,u,d)=>{ // come back together
  cam(c,'snow_oishi',{z:K3(u,d,1.2,1.06),x:540,y:1040});
  cast(c,[['roninA',[-2.2,0,-1.6],X('glare','angry','flat',{f:1,hf:[26,24],propF:spear(0.05)})],['roninC',[0.9,0,-1.8],X('glare','angry','flat',{f:-1,hf:[-26,20],propF:lantern5()})]]);
  const r=who(c,'oishi',[-0.7,0,-0.4],X('glare','angry',u>1.2?'yell':'flat',{f:1,view:'front',hf:[40,lerp(60,-100,back(clamp((u-0.9)/0.3)))],hb:[-26,70]}));breath(c,r,t,1);
  c.restore();snow(c,t,180);vign(c,0.45);}],
// ---------- THE RAID ----------
[67.35,(c,t,u,d)=>{ // hit the mansion — the gate
  const hit=0.42,p=u-hit,sh=p>0&&p<0.3?(0.3-p)*90:0;cam(c,'f_gateOut',{z:1.08,x:500,y:940,r:0.04,sx:Math.sin(u*90)*sh,sy:Math.cos(u*70)*sh});
  const k=u<hit?ei(u/hit):1;const g1=pp([0.2,1.4,-5.85]);
  cast(c,[['roninB',[2.2,0,-2.6],X('glare','furious','yell',{f:-1,...RUN(u,12),...two(-1,0.5)})],['roninC',[0.25,0,-3.3],X('glare','furious','yell',{f:1,...RUN(u,12,2),...two(1,0.3)})],
    ['roninA',[0.9,0,-4.6],X('wide','angry','shout',{f:-1,stance:44,lean:lerp(-0.3,0.35,k),hf:[lerp(40,-60,k),lerp(-90,10,k)],hb:[lerp(60,-40,k),lerp(-80,24,k)],propF:mallet(lerp(-2.2,1.2,k))})]]);
  c.restore();chips(c,g1.x*1.0,g1.y,p/0.6,22,4);sparks(c,g1.x,g1.y,p/0.4,14,2,'255,230,190');if(p>0&&p<0.5)ring(c,g1.x,g1.y,eo(p/0.5)*600,(1-p/0.5)*0.8,'rgba(255,255,255,',14);
  snow(c,t,150);speedLines(c,t,0.5,0);vign(c,0.45);flash(c,p>0?0.9-p/0.1:0);label(c,67.5,t,'FRONT',1720,{size:150,col:'#ffd24a'});}],
[68.10,(c,t,u,d)=>{ // bursting in
  const sh=u<0.25?(0.25-u)*60:0;cam(c,'f_gateIn',{z:1.06,y:940,sx:Math.sin(u*90)*sh,sy:Math.cos(u*70)*sh});const k=eo(u/0.5);
  at(c,[0,0,-6.05],(q)=>{q.fillStyle='#0a0a12';q.fillRect(-330,-610,660,610);const g=q.createLinearGradient(0,-600,0,0);g.addColorStop(0,'rgba(120,150,230,0.5)');g.addColorStop(1,'rgba(200,215,255,0.75)');q.fillStyle=g;q.fillRect(-330,-610,660,610);});
  cast(c,[['roninA',[-0.7,0,-7.2-u*1.2],X('glare','furious','yell',{f:1,view:'front',...RUN(u,13),...two(1,0.5)})],['oishi',[0.3,0,-7.6-u*2.4],X('glare','furious','yell',{f:1,view:'front',...RUN(u,13,2),...two(1,0.9)})],['roninB',[-0.2,0,-6.7-u*0.9],X('glare','furious','yell',{f:-1,view:'front',...RUN(u,13,4),...two(-1,0.6)})]]);
  cast(c,[['guard',[-2.2,0,-11.4],{back:true,f:1,lean:-0.14,hf:[30,-30],hb:[-30,-20],propF:spear(0.3)}],['guard2',[1.6,0,-11.8],{back:true,f:-1,lean:-0.1,stance:30,hf:[-40,10],propF:spear(-0.9)}]]);
  const g0=pp([0,1.8,-6]);c.restore();chips(c,g0.x-160,g0.y,u/0.7,18,1);chips(c,g0.x+170,g0.y+60,u/0.7,18,9);puff(c,g0.x,g0.y+420,u/0.8,14,'235,240,255',1.6);snow(c,t,110);speedLines(c,t,0.7,0);vign(c,0.5);flash(c,0.7-u/0.12);}],
[68.80,(c,t,u,d)=>{ // and the back — over the wall
  cam(c,'f_wall',{z:1.06,y:900,r:-0.05});
  at(c,[-7.4,0,-6.45],(q)=>{q.strokeStyle='#18120c';q.lineWidth=14;q.beginPath();q.moveTo(-36,0);q.lineTo(-20,-640);q.moveTo(36,0);q.lineTo(20,-640);q.stroke();q.strokeStyle='#a87a44';q.lineWidth=8;q.beginPath();q.moveTo(-36,0);q.lineTo(-20,-640);q.moveTo(36,0);q.lineTo(20,-640);q.stroke();for(let k=1;k<9;k++){q.strokeStyle='#18120c';q.lineWidth=11;q.beginPath();q.moveTo(-34+k*1.7,-k*70);q.lineTo(34-k*1.7,-k*70);q.stroke();q.strokeStyle='#a87a44';q.lineWidth=6;q.stroke();}});
  const arc=(p,x0)=>{const q=clamp(p);return [x0,3.45+Math.sin(q*Math.PI)*0.25-q*q*2.6,-6.2-q*0.8];};
  const p1=(u-0.12)/0.62,p2=(u-0.3)/0.62;
  if(p2>0)who(c,'roninB',arc(p2,-9.1),X('glare','furious','yell',{f:1,crouch:40,lean:0.3,rot:clamp(p2)*0.5,stance:30,...two(1,1.5,44,30)}));
  const r=who(c,'roninC',arc(p1,-8.0),X('glare','furious','yell',{f:1,crouch:40,lean:0.3,rot:clamp(p1)*0.6,stance:30,...two(1,1.4,44,30)}));
  c.restore();const ld=pp([-7.4,0,-8.8]);puff(c,ld.x,ld.y,(u-0.62)/0.5,12,'235,240,255',1.3);
  snow(c,t,130);speedLines(c,t,0.5,0);vign(c,0.5);label(c,68.85,t,'BACK',1720,{size:150,col:'#ffd24a'});}],
[69.50,(c,t,u,d)=>{ // dash
  cam(c,'f_dash',{z:1.06,x:K3(u,d,500,600),y:1000});const k=eo(u/0.6),x=lerp(-10.5,-12.35,k);
  who(c,'captain',[0,0,-13.35],X('wide','angry','teeth',{f:-1,stance:36,lean:-0.06,...two(-1,-0.5,50,-30)}));
  for(let i=4;i>=1;i--)who(c,'oishi',[0,0,x+i*0.42*(1-k*0.6)],{f:1,run:1,ph:u*16-i*0.7,ghost:'rgba(160,200,255,0.9)',ga:0.26-i*0.045,hf:[60,10]});
  const r=who(c,'oishi',[0,0,x],X('glare','furious','yell',{f:1,...RUN(u,16),lean:0.2,hf:[58,6],hb:[40,22],propF:katana2(1.25)}));
  c.restore();const f0=pp([0,0,x+0.6]);puff(c,f0.x,f0.y,(u%0.3)/0.3,7,'235,240,255',0.9);snow(c,t,110);speedLines(c,t,0.95,1);vign(c,0.5);}],
[70.15,(c,t,u,d)=>{ // CLASH
  const hs=u<0.1?0:u-0.1,sh=u<0.34?(0.34-u)*80:0;cam(c,'f_clash',{z:lerp(1.3,1.12,eo(u/0.3)),y:880,r:0.06,sx:Math.sin(u*95)*sh,sy:Math.cos(u*83)*sh});
  const push=Math.sin(hs*30)*0.03;
  const A=who(c,'oishi',[-2.1+push,0,-13.87],X('glare','furious','grit',{f:1,stance:42,lean:0.22,...two(1,0.75,62,-36)}));
  const B=who(c,'captain',[-1.0+push,0,-14.87],X('rage','furious','grit',{f:-1,vein:1,stance:42,lean:0.18,sweat:1,...two(-1,0.75,62,-36)}));
  c.restore();if(A&&B){const cx=(A.hf.x+B.hf.x)/2,cy=A.hf.y-150*A.s;sparks(c,cx,cy,u/0.5,24,5);sparks(c,cx,cy,(u-0.3)/0.35,12,11);ring(c,cx,cy,eo(u/0.45)*700,(1-u/0.45)*0.9,'rgba(255,255,255,',16);
    c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(cx,cy,0,cx,cy,90+Math.sin(u*60)*20);g.addColorStop(0,'rgba(255,255,240,0.95)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,130,0,TAU);c.fill();c.restore();}
  snow(c,t,90);speedLines(c,t,0.6,0);tint(c,'rgba(255,170,110,0.12)');vign(c,0.5);flash(c,0.95-u/0.1);}],
[70.75,(c,t,u,d)=>{ // finisher — spin cut, captain sent flying
  const hit=0.18,p=u-hit,sh=p>0&&p<0.3?(0.3-p)*80:0;cam(c,'f_court',{z:1.25,y:1040,sx:Math.sin(u*95)*sh,sy:Math.cos(u*83)*sh});const k=eo(clamp(u/hit)),fl=eo(clamp(p/0.5));
  const L=[];for(let i=0;i<5;i++){const x=[-2.7,2.2,-1.7,1.9,-3.1][i],z=[-14.5,-13.8,-16.2,-15.8,-11.6][i],sd=i%2?-1:1;L.push([RA[i],[x,0,z],X('glare','furious','yell',{f:sd,stance:34,lean:0.14,seed:i,...two(sd,0.4+Math.sin(u*12+i)*0.5)})]);L.push([i%2?'guard':'guard2',[x+sd*1.25,0,z],X('wide','worried','teeth',{f:-sd,lean:-0.1,seed:i+9,hf:[-sd*40,0],propF:spear(-0.8+Math.sin(u*12+i)*0.3)})]);}
  L.push(['captain',[lerp(0.9,3.4,fl),lerp(0,1.5,Math.sin(fl*Math.PI)),-12.6-fl*0.6],X('squeeze','worried','shout',{f:-1,rot:fl*1.5,lean:-0.3,noSw:1,hf:[40,-70],hb:[-50,-60]})]);
  L.push(['oishi',[lerp(-0.6,0.4,k),0,-12.6],X('glare','furious','yell',{f:1,stance:46,lean:0.28,hf:[lerp(-40,74,k),lerp(-60,20,k)],hb:[lerp(-30,50,k),lerp(-40,34,k)],propF:katana2(lerp(-1.4,1.9,k))})]);
  const R=cast(c,L);c.restore();const o=R[R.length-1];if(o){slash(c,o.hc.x+20,o.hc.y+60*o.s,330*o.s/0.5,-2.9,0.7,u/0.5);const cp=pp([1.0,1.0,-12.6]);sparks(c,cp.x,cp.y,p/0.45,18,3);if(p>0)ring(c,cp.x,cp.y,eo(p/0.4)*500,(1-p/0.4)*0.8,'rgba(255,255,255,',12);}
  for(let i=0;i<4;i++){const q=pp([[-2.1,1.6,-1.1,1.3][i],1.2,[-14.5,-13.8,-16.2,-15.8][i]]);sparks(c,q.x,q.y,((u*1.6+i*0.27)%1),8,i*5);}
  snow(c,t,120);vign(c,0.5);flash(c,p>0?0.8-p/0.1:0);}],
[71.30,(c,t,u,d)=>{ // they search every room (corridor ambush)
  const hit=0.62,p=u-hit,sh=p>0&&p<0.25?(0.25-p)*60:0;cam(c,'rooms_corr',{z:K3(u,d,1.0,1.1),y:940,sx:Math.sin(u*95)*sh,sy:Math.cos(u*83)*sh});const z=-5.6+u*3.6;const fl=eo(clamp(p/0.45));
  cast(c,[['roninC',[0.5,0,z-2.6],X('glare','angry','flat',{f:1,view:'front',...RUN(u,13,3),hf:[30,16],propF:lantern5()})],['roninA',[-0.4,0,z-1.4],X('glare','furious','yell',{f:1,view:'front',...RUN(u,13,1.5),...two(1,0.8)})],
    ['guard2',[lerp(-1.0,-0.2,eo(clamp((u-0.3)/0.3)))+fl*2.2,lerp(0,0.9,Math.sin(fl*Math.PI)),z+1.2-fl*0.4],X(p>0?'squeeze':'wide','angry','shout',{f:1,rot:fl*1.4,lean:0.2,hf:[50,-20],propF:p>0?null:spear(0.9)})],
    ['roninB',[0.2,0,z],X('glare','furious','yell',{f:-1,view:'front',...(p>0?{stance:40,lean:0.2}:RUN(u,13)),hf:p>0?[lerp(-60,50,eo(p/0.15)),lerp(-50,24,eo(p/0.15))]:[-56,0],hb:[-40,16],propF:katana2(p>0?lerp(-1.0,1.8,eo(p/0.15)):0.6)})]]);
  c.restore();const q=pp([0,1.1,z+1.0]);if(p>0){slash(c,q.x,q.y,300,-2.6,0.6,p/0.45);sparks(c,q.x+30,q.y,p/0.4,16,2);chips(c,q.x+300,q.y,p/0.6,14,6,['#f4ecd8','#e8dcc0','#3a2414']);}
  speedLines(c,t,0.5,0);tint(c,'rgba(60,80,170,0.14)');vign(c,0.55);flash(c,p>0?0.7-p/0.1:0);}],
[72.90,(c,t,u,d)=>{ // his bed is still warm
  cam(c,'rooms_bed',{z:K3(u,d,1.0,1.14),x:520,y:1000});
  who(c,'roninA',[-3.5,0,-5.6],X('glare','angry','flat',{f:-1,hf:[-30,10],propF:lantern5()}));
  const r=who(c,'oishi',[-1.75,0,-3.9],X('focus','angry','flat',{gloom:1,f:-1,...KN,lean:0.3,hf:[-76,50],hb:[20,60]}));
  const b=pp([-2.6,0.3,-4.6]);c.restore();wisps(c,b.x,b.y,t,3,300,'255,235,210',0.5);wisps(c,b.x-130,b.y+40,t+2,2,220,'255,235,210',0.4);tint(c,'rgba(60,80,170,0.12)');vign(c,0.55);tag(c,WT(24,3),t,'STILL WARM',540,1620,{col:'#ff8a3a'});}],
[74.80,(c,t,u,d)=>{ // charcoal shed
  cam(c,'shed',{z:K3(u,d,1.0,1.2),x:K3(u,d,560,470),y:1040});const k=eo(clamp((u-0.5)/0.7));
  const r=who(c,'kiraN',[-0.75,0,-3.1],X('shock','worried','wobble',{cry:1,sweat:2,shockL:1,f:1,view:'front',crouch:62,stance:14,sweat:1,hf:[30,-36],hb:[-30,-30],dx:Math.sin(u*40)*2}));
  c.restore();
  // darkness with the search lantern sweeping in
  const lx=lerp(1500,820,k),ly=900;c.save();const dk=c.createRadialGradient(lx,ly,60,lx,ly,lerp(260,1250,k));dk.addColorStop(0,'rgba(10,8,20,0)');dk.addColorStop(1,'rgba(6,5,14,0.93)');c.fillStyle=dk;c.fillRect(0,0,W,H);c.globalCompositeOperation='lighter';const gl=c.createRadialGradient(lx,ly,0,lx,ly,900);gl.addColorStop(0,`rgba(255,180,90,${0.28*k})`);gl.addColorStop(1,'rgba(255,150,60,0)');c.fillStyle=gl;c.fillRect(0,0,W,H);c.restore();
  // ronin silhouettes in the doorway (foreground)
  c.save();c.fillStyle='rgba(5,5,10,0.96)';c.beginPath();c.moveTo(1080,700);c.quadraticCurveTo(900,620,860,820);c.quadraticCurveTo(820,1100,900,1920);c.lineTo(1080,1920);c.closePath();c.globalAlpha=k;c.fill();c.restore();
  vign(c,0.6);stamp(c,WT(25,3)+0.05,t,'FOUND',540,1560,{size:170,col:'#ffd24a',rot:-0.06});}],
// ---------- after ----------
[77.70,(c,t,u,d)=>{ // carry his head to their master's grave
  cam(c,'grave_dawn',{z:K3(u,d,1.0,1.1),y:980});const L=[];
  for(let i=0;i<8;i++){const x=-2.8+i*1.3-u*0.9;L.push([i===1?'oishi':RA[i],[x,0,0.4+(i%2)*0.8],{f:-1,seed:i,...WK(u,5,i*1.1),...X('focus','flat','flat'),hf:i===0?[-30,24]:i%3===2?[-24,30]:null,propF:i===0?bundle():i%3===2?spear(-0.05):null}]);}
  cast(c,L);c.restore();godrays(c,1150,200,0.09,'255,200,170');snow(c,t,60,0.8);tint(c,'rgba(255,170,150,0.12)');vign(c,0.45);}],
[80.20,(c,t,u,d)=>{ // turn themselves in
  cam(c,'kneel_snow',{z:K3(u,d,1.0,1.1),y:980});const L=[];
  for(let r=0;r<3;r++)for(let i=0;i<5;i++){const k=r*5+i,pos=[-2.4+i*1.2+r*0.3,0,-16.3+r*1.3],dn=u>0.15+(2-r)*0.22+i*0.04;L.push([k===12?'oishi':RA[k%10],pos,{f:1,seed:k,...(dn?KN:{}),lean:dn?0.12:0,tilt:dn?0.2:0,...X('closed','flat','flat'),noSw:1,hf:[22,80],hb:[-22,80]}]);}
  for(const a of L)at(c,[a[1][0]+0.75,0,a[1][2]+0.12],(q)=>{q.rotate(-0.05);q.strokeStyle='#18181c';q.lineWidth=11;q.beginPath();q.moveTo(-70,0);q.lineTo(70,0);q.stroke();q.strokeStyle='#22202a';q.lineWidth=6;q.beginPath();q.moveTo(-30,0);q.lineTo(70,0);q.stroke();q.strokeStyle='#e8e0cc';q.beginPath();q.moveTo(-70,0);q.lineTo(-34,0);q.stroke();});
  cast(c,L);c.restore();snow(c,t,60,0.8);tint(c,'rgba(255,190,170,0.1)');vign(c,0.45);}],
[82.00,(c,t,u,d)=>{ // the Shogun orders
  cam(c,'hall_order',{z:K3(u,d,1.0,1.12),y:940});const L=[['official',[0,0,-10.5],X('closed','flat','flat',{f:1,view:'front',hf:[26,10],hb:[-26,10],propF:scroll5()})]];
  for(let r=0;r<2;r++)for(let i=0;i<4;i++)L.push([RA[(r*4+i)%10===5?0:(r*4+i)%10],[-1.65+i*1.1+r*0.2,0,-7.4+r*1.7],{back:true,f:1,seed:i+r*4,...KN,lean:0.1,noSw:1}]);
  cast(c,L);c.restore();tint(c,'rgba(255,190,110,0.1)');vign(c,0.5);}],
[84.80,(c,t,u,d)=>{ // and they accept it
  cam(c,'hall_bow',{z:K3(u,d,1.0,1.12),y:900});const k=eio(clamp((u-0.2)/0.9));
  who(c,'roninB',[-0.2,0,-8.9],X('closed','flat','flat',{f:1,...KN,noSw:1,lean:0.1+k*0.2,blur:2}));
  who(c,'oishi',[-1.7,0,-7.7],X('closed','flat','flat',{f:1,view:'front',...KN,noSw:1,lean:k*0.12,tilt:k*0.3,hf:[24,80],hb:[-24,80]}));
  c.restore();tint(c,'rgba(255,190,110,0.12)');vign(c,0.5);}],
[86.10,(c,t,u,d)=>{ // buried next to their master
  cam(c,'grave_day',{z:K3(u,d,1.14,1.0),y:K3(u,d,860,960)});c.restore();petals(c,t,12);tint(c,'rgba(255,225,180,0.1)');vign(c,0.35);card(c,86.5,t,'SENGAKU-JI','TOKYO · TODAY',1560,{col:'#c8281e',size:76});}],
[88.85,(c,t,u,d)=>{ // people still leave incense
  cam(c,'grave_inc',{z:K3(u,d,1.0,1.12),y:980});const k=eo(clamp((u-0.3)/0.6));
  const r=who(c,'visitor',[0.35,0,-0.85],X('closed','flat','smile',{f:1,crouch:0,stance:16,lean:0.06+0.1*k,tilt:0.2*k,hf:[lerp(40,62,k),lerp(20,52,k)],hb:[-10,70],propF:incense()}));
  c.restore();if(r)wisps(c,r.hf.x+6,r.hf.y-50*r.s,t,3,340,'240,240,250',0.55);const q=pp([-0.85,0.5,-1.6]);wisps(c,q.x,q.y,t+3,2,260,'240,240,250',0.4);tint(c,'rgba(255,225,180,0.1)');vign(c,0.4);}],
[91.20,(c,t,u,d)=>{ // more than 300 years later
  cam(c,'grave_dusk',{z:K3(u,d,1.0,1.1),y:960});const pts=[];for(let r=0;r<4;r++)for(let i=0;i<6;i++)pts.push(pp([-6+i*2.4+r*0.5,0.4+r*0.32,-1.6-r*1.6]));
  c.restore();pts.forEach((q,i)=>wisps(c,q.x,q.y,t+i*1.3,2,170+hash(i)*120,'245,235,240',0.34));godrays(c,1150,260,0.08,'255,180,140');tint(c,'rgba(255,150,110,0.14)');vign(c,0.5);
  const p=t-WT(31,10);if(p>0){const k=back(clamp(p/0.25));c.save();c.translate(540,1480);c.scale(k,k);txt(c,'300+',0,0,230,'#fff',{sw:36});txt(c,'YEARS',0,150,90,'#fff',{ls:18,sw:18});c.restore();}}],
[300,(c,t,u,d)=>{cam(c,'hall_two',{z:1.0});c.restore();c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(0,0,W,H);
  const E=[['glare','angry','grit',{vein:1,f:1}],['rage','furious','yell',{}],['shock','up','yell',{sweat:2,shockL:1}],['sad','sad','wobble',{tear:1}],['drunk','up','drunk',{blushK:1.6}],['sly','smug','sneer',{}],['focus','flat','flat',{gloom:1}],['closed','sad','sad',{cry:1}],['sleep','flat','drool',{}],['happy','up','grin',{}],['wide','worried','o',{sweat:1}],['half','smug','smirk',{}]];
  E.forEach((e,i)=>{const x=180+(i%3)*360,y=330+Math.floor(i/3)*430;const K=i%2?KIND2.kira:KIND2.oishi;c.save();c.translate(x,y);c.fillStyle=K.skin;c.strokeStyle='#18181c';c.lineWidth=5;c.beginPath();c.arc(0,0,140,0,TAU);c.fill();c.stroke();drawFace4(c,0,0,140/126,{eyes:e[0],brow:e[1],mouth:e[2],...e[3]},K);c.restore();txt(c,e[0]+'/'+e[2],x,y+175,30,'#fff',{sw:6});});}],
[200,(c,t,u,d)=>{ // cover
  cam(c,'snow_march',{z:1.3,x:540,y:1000});T=3.3;
  const L=[];for(let i=0;i<8;i++){const sd=i%2?1:-1,row=Math.floor(i/2);L.push([RA[(i+1)%5===0?1:(i%5)],[sd*(1.5+row*0.75),0,1.6-row*1.25],{f:-sd,seed:i,...X('glare','furious','grit',{vein:i<2}),stance:30,propF:i%3===0?katana2(0.4):i%3===1?spear(0.05):lantern5(),hf:i%3===0?[-sd*40,-60]:i%3===1?[-sd*24,30]:[-sd*26,20]}]);}
  cast(c,L);who(c,'oishi',[0,0,5.6],X('glare','furious','grit',{gloom:1,vein:1,f:1,view:'front',stance:42,hf:[66,-40],hb:[-30,70],propF:katana2(0.5)}));
  c.restore();godrays(c,540,640,0.16,'255,120,100');
  snow(c,3.3,150);tint(c,'rgba(255,70,60,0.13)');const v=c.createRadialGradient(540,1000,H*0.32,540,1000,H*0.78);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.42)');c.fillStyle=v;c.fillRect(0,0,W,H);
  txt(c,'47 SAMURAI',540,290,156,'#fff',{sw:32,ls:4});txt(c,'FAKED IT 2 YEARS',540,445,104,'#ff2b2b',{sw:24,ls:2});txt(c,'FOR ONE NIGHT',540,575,124,'#fff',{sw:28,ls:3});}],
];
function teaTable(c,u,party){at(c,[2.7,0.83,1.0],(q)=>{q.scale(0.62,0.62);const n=party?4:2;for(let i=0;i<n;i++){const x=-50+i*34;q.fillStyle='#fbf8f0';q.strokeStyle='#18181c';q.lineWidth=4;q.beginPath();q.moveTo(x-5,-44);q.lineTo(x+5,-44);q.lineTo(x+5,-30);q.bezierCurveTo(x+18,-22,x+16,-4,x+12,0);q.lineTo(x-12,0);q.bezierCurveTo(x-16,-4,x-18,-22,x-5,-30);q.closePath();q.fill();q.stroke();q.fillStyle='#2a4a8a';q.fillRect(x-13,-16,26,5);}
  q.fillStyle='#f6f2e8';q.beginPath();q.ellipse(70,-4,14,5,0,0,TAU);q.fill();q.stroke();});}
