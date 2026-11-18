'use strict';
// ===================== GTA 6 leak · shots =====================
const GV={};
const LT=i=>L[i].a;
const wt2=(w,near)=>wb(w,near);
function lens(c,t,o={}){bbCine(c,t,{v:o.v??0.55});}
function darkStage(c,t,col='20,16,30'){richBG(c,t,col);}
// 0 · "Police took this teenager's laptop…" night street, blue-red lights; an officer walks off with the bagged laptop
GV.cops=(c,t,u,d)=>{camAt(c,'s_night',[-1.15,1.0,8.5],K3(u,d,1.75,1.95),{oy:-40});
  const k=EZ.out(clamp(u/1.6));
  who(c,'hacker',[-0.75,0,8.35],BF('sad','worried','flat',{seed:2,hf:[10,90],hb:[-10,90]}));
  const r=who(c,'ukcop',[lerp(-1.35,-1.65,k),0,8.75],BF('dot','angry','flat',{seed:1,hf:[26,40],hb:[-10,90],view:u>0.2&&u<1.6?'3q':'front',f:-1,walk:u<1.6?1:0,ph:t*7}));
  evidenceBag(c,r.hf.x-10,r.hf.y+18,0.36*pp([-1.5,0,8.75]).s,0.05);
  c.restore();copLights(c,t,1);if(t<0.15)flash(c,1-t/0.15,'#fff');lens(c,t,{v:0.6});};
// 1 · "so he hacked the biggest game in the world with a hotel TV." TV-POV on the boy; the screen light floods his face
GV.hack=(c,t,u,d)=>{camAt(c,'ht_tvpov',[-1.15,1.0,-0.65],K3(u,d,1.05,1.15),{oy:-40});
  const r=sitAt(c,'hacker',[-1.15,0,-0.75],BF(t>wb('biggest',3.1)?'sly':'focus','up',t>wb('biggest',3.1)?'smirk':'flat',{seed:3,hf:[6,74],hb:[-10,90],look:[0,6]}));
  const hs=pp([-1.15,0,-0.75]).s;phone(c,r.hf.x,r.hf.y-10*hs,0.26*hs,-0.1,{code:1,glow:1});
  c.restore();glowAt(c,560,900,700,'90,140,255',0.18+0.06*Math.sin(t*20));lens(c,t);};
GV.tvots=(c,t,u,d)=>{camAt(c,'ht_ots',[0.5,1.25,-2.3],K3(u,d,1.03,1.1),{oy:60});
  onQuad(c,[0.0,1.73,-2.38],[1.2,1.73,-2.38],[0.0,1.05,-2.38],600,340,(g,w,h)=>{g.fillStyle='#04120a';g.fillRect(0,0,w,h);g.font='700 22px monospace';for(let i=0;i<14;i++){g.fillStyle=i%5?'#3aff8a':'#ff5a8a';g.fillText('>'+'01ACCESS_ROCKSTAR_VPN_'.slice(0,(i*7+Math.floor(t*30))%22),16,24+i*22);}gtaBox(g,w*0.8,h*0.5,0.5,0.05,{});});
  who(c,'hacker',[0.4,0,-1.55],BF('focus','flat','flat',{back:1,seed:3,hf:[10,90],hb:[-10,90]}));
  c.restore();lens(c,t);};
// 2 · "Give me 60 seconds…" the vault: the GTA VI box under lasers
GV.vault=(c,t,u,d)=>{camAt(c,'v_wide',[0,1.1,-1.6],K3(u,d,1.5,1.75),{oy:120});const p=pp([0,0.87,-1.6]);
  glowAt(c,p.x,p.y-80,260,'255,120,200',0.4);gtaBox(c,p.x,p.y-p.s*30,p.s*0.17,0,{});
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const y=p.y-p.s*(10+i*8)+Math.sin(t*2+i)*6;c.strokeStyle='rgba(255,40,40,0.75)';c.lineWidth=3;c.beginPath();c.moveTo(-200,y+(i-3)*30);c.lineTo(W+200,y-(i-3)*30);c.stroke();}c.restore();
  c.restore();lens(c,t,{v:0.6});};
// 3 · "…and what it cost him." the secure hospital corridor, a heavy door swings shut
GV.costhim=(c,t,u,d)=>{camAt(c,'hp_hall',[0,1.2,-6],K3(u,d,1.15,1.35),{oy:0});c.restore();const k=EZ.in(sgB(t,LT(3)+0.6,LT(3)+1.2));if(k>0){c.save();c.fillStyle=`rgba(0,0,0,${k*0.85})`;c.fillRect(0,0,W*k*0.5,H);c.fillRect(W-W*k*0.5,0,W*k*0.5,H);c.restore();}lens(c,t,{v:0.7});};
// 4 · "September 2022." calendar slam over a dark city
GV.sept=(c,t,u,d)=>{darkStage(c,t,'16,20,40');const k=popK(t,LT(4)-0.05,0.35);if(k>0){c.save();c.translate(540,1000);c.scale(k,k);c.rotate(-0.04);c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=8;rr(c,-260,-280,520,560,26);c.fill();c.stroke();c.fillStyle='#d82a2a';rr(c,-260,-280,520,150,26);c.fill();c.stroke();c.fillRect(-256,-160,512,30);
    txt(c,'SEPTEMBER',0,-205,74,'#fff',{stroke:false,ls:4});txt(c,'2022',0,60,210,'#1a1a24',{stroke:false});for(const x of [-150,150]){c.fillStyle='#8a8e96';rr(c,x-16,-310,32,70,14);c.fill();c.stroke();}c.restore();}
  lens(c,t);};
// 5 · "Grand Theft Auto 6 is Rockstar's most guarded secret." the studio, wall screen with the GTA VI art; then the vault locks shut
GV.studio=(c,t,u,d)=>{const tg=wb('most',16.1)-0.05;if(t>=tg){GV.vaultLock(c,t,t-tg,d-(tg-GV.studio.t0));return;}camAt(c,'st_wide',[0.6,1.3,-1.6],K3(u,d,1.15,1.3),{oy:-60});
  who(c,'dev1',[0.7,0,-0.9],BF('happy','up','smile',{seed:4,view:'3q',f:1,hf:[60,24],hb:[-10,90]}));who(c,'dev2',[1.6,0,-0.6],BF('dot','up','smile',{seed:5,hf:[10,90],hb:[-10,90]}));
  c.restore();lens(c,t);};
GV.vaultLock=(c,t,u,d)=>{camAt(c,'v_wide',[0,1.1,-1.6],1.55+u*0.06,{oy:120});const p=pp([0,0.87,-1.6]);glowAt(c,p.x,p.y-80,260,'255,120,200',0.4);gtaBox(c,p.x,p.y-p.s*30,p.s*0.17,0,{});c.restore();
  // lock icons + bars slam in
  for(let i=0;i<3;i++){const k=popK(t,GV.studio.t0+(wb('most',16.1)-GV.studio.t0)+0.15+i*0.18,0.3);if(k<=0)continue;c.save();c.translate(270+i*270,560);c.scale(k,k);c.fillStyle='#f6c21a';c.strokeStyle=K2;c.lineWidth=7;rr(c,-60,-20,120,100,14);c.fill();c.stroke();c.lineWidth=16;c.strokeStyle=K2;c.beginPath();c.arc(0,-20,38,Math.PI,0);c.stroke();c.lineWidth=8;c.strokeStyle='#c8ccd4';c.stroke();c.fillStyle=K2;c.beginPath();c.arc(0,22,12,0,TAU);c.fill();c.fillRect(-5,22,10,30);c.restore();}
  lens(c,t,{v:0.6});};
// 6 · "The hacker is a British teenager." spotlight intro + flag
GV.intro=(c,t,u,d)=>{darkStage(c,t,'20,22,40');c.save();const z=1+u*0.05;c.translate(540,1300);c.scale(z,z);c.translate(-540,-1300);L2={dx:1,rim:'#9ab0ff',amb:'#4a4a7a',key:'rgba(255,205,150,'};
  c.fillStyle='rgba(255,255,255,0.07)';c.beginPath();c.moveTo(380,0);c.lineTo(700,0);c.lineTo(860,1720);c.lineTo(220,1720);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,0.1)';c.beginPath();c.ellipse(540,1720,330,60,0,0,TAU);c.fill();
  const r=who(c,'hacker',[0,0,0],Object.assign(BF('sly','flat','smirk',{seed:3,hf:[10,90],hb:[-10,90]}),{abs:{x:540,y:1720,s:2.6}}));c.restore();
  unionJack(c,840,700,200,popK(t,wb('british',18.9)-0.05,0.35));lens(c,t);};
// 7 · "He's already on bail for hacking other giant companies." three giant towers, each screen turns red
GV.bail=(c,t,u,d)=>{darkStage(c,t,'14,16,30');const t0=GV.bail.t0;c.save();const z=1.05+u*0.04;c.translate(540,1000);c.scale(z,z);c.translate(-540,-1000);
  for(let i=0;i<3;i++){const x=220+i*320,h=900+(i===1?220:0),y=1720-h;c.fillStyle='#22263a';c.strokeStyle=K2;c.lineWidth=7;c.fillRect(x-110,y,220,h);c.strokeRect(x-110,y,220,h);
    const hk=t>wb('hacking',21.7)+i*0.25;for(let r=0;r<Math.floor(h/60);r++)for(let k=0;k<3;k++){c.fillStyle=hk?(hash(r*3+k+i*50+Math.floor(t*8))>0.3?'#ff3a3a':'#5a1a1a'):(hash(r*3+k+i*50)>0.4?'#ffd890':'#2a2e44');c.fillRect(x-90+k*64,y+20+r*60,44,34);}
    if(hk){const k2=popK(t,wb('hacking',21.7)+i*0.25,0.3);c.save();c.translate(x,y-70);c.scale(k2,k2);warnTri(c,0,0,60,1);c.restore();}}
  c.restore();lens(c,t);};
// 8 · "Police have taken his laptop." the bag slams onto an evidence table
GV.taken=(c,t,u,d)=>{darkStage(c,t,'30,24,24');const k=EZ.out(sgB(t,LT(8),LT(8)+0.35));c.fillStyle='#4a3a2a';c.fillRect(0,1300,W,620);c.strokeStyle=K2;c.lineWidth=8;seg(c,0,1300,W,1300);
  evidenceBag(c,540,lerp(400,1150,k),2.6,-0.05+0.05*k);if(k>=1){const p=sgB(t,LT(8)+0.35,LT(8)+0.8);if(p<1)puff(c,540,1300,p,12,'200,190,170',2);}
  // a stamp-like seal
  const sk=popK(t,wb('laptop',24.9),0.3);if(sk>0){c.save();c.translate(800,1500);c.scale(sk,sk);c.rotate(-0.2);c.strokeStyle='#d82a2a';c.lineWidth=12;c.beginPath();c.arc(0,0,90,0,TAU);c.stroke();redX(c,0,0,60,1);c.restore();}
  lens(c,t);};
// 9 · "He's reportedly stuck in a hotel room under police protection." the corridor, an officer on guard by his door
GV.guard=(c,t,u,d)=>{camAt(c,'co_door',[0.3,1.1,-1.2],K3(u,d,1.25,1.5),{oy:-60});who(c,'ukcop2',[0.55,0,-0.6],BF('dot','flat','flat',{seed:6,hf:[10,90],hb:[-10,90]}));c.restore();lens(c,t);};
// 10 · "So he plugs an Amazon Fire Stick into the hotel TV." insert: the stick slides into the HDMI port, light on
GV.stick=(c,t,u,d)=>{const t0=GV.stick.t0,tin=wb('stick',31.8);c.fillStyle='#0c0d12';c.fillRect(0,0,W,H);
  // TV edge with ports
  c.save();const z=1.1+u*0.04;c.translate(540,1000);c.scale(z,z);c.translate(-540,-1000);const g=c.createLinearGradient(600,0,1080,0);g.addColorStop(0,'#1a1b22');g.addColorStop(1,'#2a2c36');c.fillStyle=g;c.fillRect(620,300,520,1400);c.strokeStyle=K2;c.lineWidth=8;c.strokeRect(620,300,520,1400);
  glowAt(c,1080,900,500,'90,140,255',0.25);for(let i=0;i<3;i++){c.fillStyle='#050608';rr(c,640,820+i*150,70,40,8);c.fill();c.strokeStyle='#5a5e6a';c.lineWidth=4;c.stroke();txt(c,'HDMI '+(i+1),760,840+i*150,26,'#8a8e9a',{stroke:false,al:'left'});}
  const k=EZ.io(sgB(t,t0+0.2,tin));const x=lerp(80,440,k);fireStick(c,x,970,2.4,0,t>tin?1:0);
  // hand pushing it: hoodie sleeve + fingers wrapped over the stick
  c.lineJoin='round';c.strokeStyle=K2;c.lineWidth=7;c.fillStyle='#2c3240';c.beginPath();c.moveTo(-200,1110);c.lineTo(x-330,1080);c.lineTo(x-330,880);c.lineTo(-200,850);c.closePath();c.fill();c.stroke();
  c.fillStyle=SK[2];c.beginPath();c.ellipse(x-250,975,95,85,0,0,TAU);c.fill();c.stroke();for(let i=0;i<4;i++){c.beginPath();c.ellipse(x-185,915+i*40,34,22,0.2,0,TAU);c.fill();c.stroke();}c.beginPath();c.ellipse(x-200,1040,50,26,-0.5,0,TAU);c.fill();c.stroke();
  c.restore();if(t>tin){const p=sgB(t,tin,tin+0.4);if(p<1)sparks(c,700,960,p,12,3,'150,200,255');}lens(c,t);};
// 11 · "Grabs a phone." 12 · "And gets to work."
GV.grab=(c,t,u,d)=>{camAt(c,'ht_tvpov',[-1.15,1.0,-0.65],K3(u,d,1.12,1.2),{oy:-60});const g=EZ.out(sgB(t,GV.grab.t0,GV.grab.t0+0.4));
  const r=sitAt(c,'hacker',[-1.15,0,-0.75],BF('focus','up','smirk',{seed:3,hf:[6,lerp(90,74,g)],hb:[-10,90],look:[0,5]}));const hs=pp([-1.15,0,-0.75]).s;phone(c,r.hf.x,r.hf.y-10*hs,0.26*hs,-0.1,{glow:g});c.restore();lens(c,t);};
GV.work=(c,t,u,d)=>{camAt(c,'ht_ots',[0.5,1.25,-2.3],K3(u,d,1.05,1.15),{oy:60});
  onQuad(c,[0.0,1.73,-2.38],[1.2,1.73,-2.38],[0.0,1.05,-2.38],600,340,(g,w,h)=>{g.fillStyle='#04120a';g.fillRect(0,0,w,h);g.font='700 22px monospace';for(let i=0;i<14;i++){g.fillStyle='#3aff8a';g.fillText('$ '+'connect --target rockstar'.slice(0,(i*5+Math.floor(t*40))%26),16,24+i*22);}});
  who(c,'hacker',[0.4,0,-1.55],BF('focus','flat','flat',{back:1,seed:3,hf:[10,90],hb:[-10,90]}));c.restore();lens(c,t);};
// 13 · "He tricks his way into Rockstar's internal company chat." phone login → ACCESS GRANTED
GV.login=(c,t,u,d)=>{darkStage(c,t,'10,14,26');const t0=GV.login.t0,ta=wb('chat',39.9);c.save();const z=1+u*0.05;c.translate(540,1050);c.scale(z,z);c.translate(-540,-1050);
  c.fillStyle='#16181e';c.strokeStyle=K2;c.lineWidth=10;rr(c,240,380,600,1220,70);c.fill();c.stroke();c.fillStyle='#1c1e2a';rr(c,270,420,540,1140,40);c.fill();
  txt(c,'ROCKSTAR GAMES',540,560,42,'#f6c21a',{stroke:false,ls:3});txt(c,'company chat · sign in',540,620,28,'#8a8ea0',{stroke:false});
  const n1=Math.min(22,Math.floor((t-t0)*14)),n2=Math.min(10,Math.max(0,Math.floor((t-t0-1.2)*12)));for(const [y,lab,n,ch] of [[760,'email',n1,'employee@rockstar...'],[900,'password',n2,'••••••••••']]){c.fillStyle='#2a2d3c';rr(c,320,y-40,440,80,16);c.fill();txt(c,lab,330,y-62,22,'#8a8ea0',{stroke:false,al:'left'});txt(c,ch.slice(0,n),340,y,30,'#e8e8ee',{stroke:false,al:'left'});}
  const ok=t>ta-0.3;c.fillStyle=ok?'#2fbf74':'#5a5cf0';rr(c,320,1020,440,90,20);c.fill();txt(c,ok?'ACCESS GRANTED':'SIGN IN',540,1066,34,'#fff',{stroke:false,ls:3});
  c.restore();check(c,820,520,70,popK(t,ta-0.3,0.3));lens(c,t);};
// 14 · "Then he posts a message:" the studio, the wall screen turns red, devs freeze
function devsShock(c,t,u,d,msgK){camAt(c,'st_wide',[0.6,1.5,-2.4],K3(u,d,1.12,1.25),{oy:-80});
  onQuad(c,[-1.4,2.82,-4.9],[2.2,2.82,-4.9],[-1.4,0.88,-4.9],720,390,(g,w,h)=>{g.fillStyle='#2a0608';g.fillRect(0,0,w,h);g.fillStyle='rgba(255,40,40,'+(0.4+0.2*Math.sin(t*10))+')';g.fillRect(0,0,w,h);if(msgK>0){g.font='900 46px "Inter Display"';g.fillStyle='#fff';g.textAlign='center';g.fillText('⚠ NEW MESSAGE',w/2,h*0.45);g.font='700 30px "Inter Display"';g.fillText('from: unknown user',w/2,h*0.62);}});
  who(c,'dev1',[0.7,0,-0.9],BF('shock','up','o',{seed:4,hf:[14,88],hb:[-10,90]}));who(c,'dev2',[1.6,0,-0.6],BF('wide','worried','o',{seed:5,hf:[10,90],hb:[-10,90]}));c.restore();}
GV.posts=(c,t,u,d)=>{devsShock(c,t,u,d,popK(t,wb('message',41.8)-0.1,0.3));lens(c,t,{v:0.6});};
// 15/16 · "contact me within 24 hours… or I leak the source code." the chat message + countdown
GV.threat=(c,t,u,d)=>{darkStage(c,t,'30,8,16');const t0=GV.threat.t0;
  chatPanel(c,540,860,940,620,popK(t,t0-0.05,0.3),[['unknown','contact me within 24 hours… or I leak the source code.','#ff5a5a',sgB(t,t0,t0+0.4)*1.0]],t);
  const k=popK(t,wb('24',43.7)-0.05,0.35);if(k>0){const left=Math.max(0,24*3600-Math.floor((t-wb('24',43.7))*3600*1.7));const hh=String(Math.floor(left/3600)).padStart(2,'0'),mm=String(Math.floor(left/60)%60).padStart(2,'0'),ss=String(left%60).padStart(2,'0');
    c.save();c.translate(540,1380);c.scale(k,k);c.fillStyle='rgba(10,6,8,0.9)';c.strokeStyle='#ff3a3a';c.lineWidth=8;rr(c,-330,-90,660,180,30);c.fill();c.stroke();txt(c,`${hh}:${mm}:${ss}`,0,4,120,'#ff3a3a',{sw:12});c.restore();}
  if(t>wb('leak',45.2)){const p=sgB(t,wb('leak',45.2),wb('leak',45.2)+1.2);c.save();c.font='700 30px monospace';for(let i=0;i<28;i++){const x=hash(i)*W,y=((hash(i*3)*H)+p*900)%H;c.fillStyle=`rgba(255,80,80,${0.5*(1-p*0.5)})`;c.fillText('{ }</>;'.charAt(i%7),x,y);}c.restore();}
  lens(c,t,{v:0.65});};
// 17 · "Hours later, 90 secret videos of GTA 6 are all over the internet." tiles multiply across the screen
GV.videos=(c,t,u,d)=>{darkStage(c,t,'16,10,30');const t0=GV.videos.t0,t90=wb('90',48.1);const n=Math.min(90,Math.max(0,Math.floor((t-t90+0.2)*45)));
  for(let i=0;i<n;i++){const col=i%6,row=Math.floor(i/6),x=95+col*178,y=420+row*92+((i*37)%5)*2;if(y>1720)continue;const k=popK(t,t90-0.2+i/45,0.25);c.save();c.translate(x,y);c.scale(k,k);c.fillStyle='#0a0a0e';c.strokeStyle=K2;c.lineWidth=4;rr(c,-80,-42,160,84,8);c.fill();c.stroke();c.save();rr(c,-74,-36,148,72,6);c.clip();c.translate(-74,-36);vcArt(c,148,72);c.restore();c.fillStyle='rgba(255,255,255,0.9)';c.beginPath();c.moveTo(-10,-14);c.lineTo(16,0);c.lineTo(-10,14);c.closePath();c.fill();c.restore();}
  const kk=popK(t,t90,0.3);if(kk>0){c.save();c.translate(540,1610);c.scale(kk,kk);c.fillStyle='rgba(10,8,16,0.92)';c.strokeStyle='#ff5aa8';c.lineWidth=7;rr(c,-200,-80,400,160,28);c.fill();c.stroke();txt(c,String(n),0,4,120,'#fff',{sw:12});c.restore();}
  lens(c,t);};
// 18 · "One of the biggest leaks in gaming history." a bar chart of big leaks; this one towers over the rest
GV.biggest=(c,t,u,d)=>{darkStage(c,t,'14,14,28');const t0=GV.biggest.t0;const H0=[0.22,0.35,0.28,0.4,1.0];for(let i=0;i<5;i++){const x=150+i*195,hh=EZ.out(sgB(t,t0+0.1+i*0.1,t0+0.7+i*0.12))*H0[i]*1000,last=i===4;c.fillStyle=last?'#ff5aa8':'#4a5070';c.strokeStyle=K2;c.lineWidth=6;rr(c,x-70,1650-hh,140,hh,12);c.fill();c.stroke();
    if(last&&hh>900){gtaBox(c,x,1650-hh-160,0.8,0.05,{});}}c.strokeStyle='#8a8ea0';c.lineWidth=5;seg(c,60,1652,1020,1652);
  const k=popK(t,wb('history',54.1)-0.1,0.35);if(k>0){c.save();c.translate(300,560);c.scale(k,k);c.fillStyle='#f6c21a';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.moveTo(-60,-60);c.lineTo(60,-60);c.lineTo(50,10);c.quadraticCurveTo(0,60,-50,10);c.closePath();c.fill();c.stroke();c.fillRect(-12,40,24,40);c.strokeRect(-12,40,24,40);rr(c,-50,80,100,24,6);c.fill();c.stroke();txt(c,'#1',0,-14,46,'#1a1a24',{stroke:false});c.restore();}
  lens(c,t);};
// 19 · "Rockstar says the attack cost them 5 million dollars…" cash storm + counter in the studio
GV.cost=(c,t,u,d)=>{camAt(c,'st_screen',[0.4,1.8,-4.9],K3(u,d,1.1,1.2),{oy:0});c.restore();const t5=wb('5',57.2);const v=Math.round(EZ.out(sgB(t,t5-0.6,wb('dollars',58.2)+0.2))*5000000);
  for(let i=0;i<26;i++){const p=((t-GV.cost.t0)*0.5+hash(i))%1;cash(c,hash(i*3)*W,-100+p*2100,1.2,t*2+i);}
  c.save();c.translate(540,1450);c.fillStyle='rgba(10,10,16,0.92)';c.strokeStyle='#7ac46a';c.lineWidth=8;rr(c,-420,-110,840,220,30);c.fill();c.stroke();txt(c,'$'+v.toLocaleString('en-US'),0,4,120,'#7ac46a',{sw:12});c.restore();lens(c,t);};
// 20 · "and thousands of hours of work." exhausted devs, a clock spinning
GV.hours=(c,t,u,d)=>{camAt(c,'st_wide',[0.9,1.2,-1.2],K3(u,d,1.2,1.3),{oy:-40});who(c,'dev1',[0.7,0,-0.9],BF('half','worried','flat',{seed:4,sweat:1,tilt:0.12,hf:[10,92],hb:[-10,90]}));who(c,'dev2',[1.6,0,-0.6],BF('half','worried','wobble',{seed:5,tilt:-0.1,hf:[10,92],hb:[-10,90]}));c.restore();
  clockIco(c,540,600,110,(t*6)%12,(t*72)%60,popK(t,GV.hours.t0,0.3));lens(c,t);};
// 21 · "But here's the twist." light flicker, slam zoom on the boy
GV.twist=(c,t,u,d)=>{camAt(c,'ht_tvpov',[-1.15,1.2,-0.65],K3(u,d,1.05,1.2),{oy:-40});sitAt(c,'hacker',[-1.15,0,-0.75],BF('wide','up','o',{seed:3,hf:[10,90],hb:[-10,90]}));c.restore();if(Math.sin(t*50)>0.6&&u<0.5)flash(c,0.35,'#000');lens(c,t,{v:0.7});};
// 22 · "Doctors said he was unfit to stand trial." doctor with a clipboard in the secure hospital
GV.unfit=(c,t,u,d)=>{camAt(c,'hp_hall',[0,1.2,-1.5],K3(u,d,1.1,1.2),{oy:-30});const r=who(c,'doctor',[0.1,0,-1.0],BF('dot','worried','flat',{seed:7,hf:[8,76],hb:[-10,90]}));
  const ps=pp([0.1,0,-1.0]).s;clipboard(c,r.hf.x-6*ps,r.hf.y+8*ps,0.42*ps,0.06,(g,s)=>{for(let i=0;i<5;i++){g.fillStyle='#9aa0aa';g.fillRect(-46*s,(-56+i*18)*s,(60+hash(i)*30)*s,5*s);}redX(g,20*s,44*s,24*s,popK(t,wb('unfit',63.7),0.3));});
  c.restore();lens(c,t);};
// 23 · "A court still found he did it." the judge brings the gavel down
GV.court=(c,t,u,d)=>{camAt(c,'ct_wide',[0,1.6,-2.6],K3(u,d,1.35,1.5),{oy:-40});const tb=wb('found',66.6);
  const r=who(c,'judge',[0,0.5,-3.15],BF(t>tb?'focus':'dot','angry','flat',{seed:8,hf:[40,-20],hb:[-10,90]}));
  occluder(c,[[-2,1.4,-2.6],[2,1.4,-2.6],[2,0.5,-2.6],[-2,0.5,-2.6]],'#6a4428');occluder(c,[[-2.05,1.46,-2.6],[2.05,1.46,-2.6],[2.05,1.4,-2.6],[-2.05,1.4,-2.6]],'#3a2410');
  const sw=t<tb?-0.9+Math.sin(t*3)*0.05:(t<tb+0.12?lerp(-0.9,0.5,(t-tb)/0.12):0.5);gavel(c,r.hf.x,r.hf.y,0.42*pp([0,0.5,-3.15]).s,sw);
  c.restore();if(t>tb+0.1&&t<tb+0.5){const p=(t-tb-0.1)/0.4;ring(c,700,880,60+p*300,0.7*(1-p),'rgba(255,220,150,',8);}lens(c,t);};
// 24 · "And because he said he'd go straight back to hacking…" the boy in the dock, smirking; a laptop bubble
GV.dock=(c,t,u,d)=>{camAt(c,'ct_dock',[3.0,1.2,-0.8],K3(u,d,1.3,1.45),{oy:-60});who(c,'hacker',[3.0,0,-1.0],BF('sly','flat','smirk',{seed:3,hf:[10,90],hb:[-10,90]}));
  occluder(c,[[2.25,0.9,0.2],[3.75,0.9,0.2],[3.75,0,0.2],[2.25,0,0.2]],'#5a3820');c.restore();
  const k=popK(t,wb('hacking',69.6)-0.6,0.35);if(k>0){c.save();c.translate(800,620);c.scale(k,k);c.fillStyle='#fff';c.strokeStyle=K2;c.lineWidth=7;c.beginPath();c.ellipse(0,0,170,130,0,0,TAU);c.fill();c.stroke();for(const [x,y,r2] of [[-120,150,22],[-160,200,14]]){c.beginPath();c.arc(x,y,r2,0,TAU);c.fill();c.stroke();}laptop(c,0,40,1.0,1,{glow:1});c.restore();}
  lens(c,t);};
// 25 · "he was sent to a secure hospital." escorted down the corridor; 26 · "With no release date." calendar spins to ?
GV.sent=(c,t,u,d)=>{camAt(c,'hp_hall',[0,1.2,-2.5],K3(u,d,1.3,1.45),{oy:-30});const z=lerp(-4.5,-2.2,EZ.io(u/d));
  cast(c,[['nurse',[-0.55,0,z+0.1],BF('dot','flat','flat',{seed:9,walk:1,ph:t*7})],['hacker',[0.05,0,z],BF('sad','worried','flat',{seed:3,walk:1,ph:t*7+1})],['nurse',[0.65,0,z+0.1],BF('dot','flat','flat',{seed:10,walk:1,ph:t*7+2})]]);c.restore();lens(c,t,{v:0.6});};
GV.nodate=(c,t,u,d)=>{camAt(c,'hp_hall',[0,1.2,-8],K3(u,d,1.4,1.55),{oy:0});c.restore();const k=popK(t,GV.nodate.t0,0.35);
  if(k>0){c.save();c.translate(540,980);c.scale(k,k);c.rotate(0.04);c.fillStyle='#fbf8f0';c.strokeStyle=K2;c.lineWidth=8;rr(c,-220,-240,440,480,22);c.fill();c.stroke();c.fillStyle='#2a5a6a';rr(c,-220,-240,440,120,22);c.fill();c.stroke();txt(c,'RELEASE',0,-180,56,'#fff',{stroke:false,ls:4});
    const spin=t<wb('date',73.5)?String(Math.floor(hash(Math.floor(t*14))*31)+1):'?';txt(c,spin,0,60,200,spin==='?'?'#d82a2a':'#1a1a24',{stroke:false});c.restore();}
  lens(c,t,{v:0.7});};
// 27/28 · "This week, the game he leaked finally comes out." launch: the box on a pedestal, fireworks over a sunset city; fade to black
GV.launch=(c,t,u,d)=>{const g0=c.createLinearGradient(0,0,0,H);g0.addColorStop(0,'#2a1650');g0.addColorStop(0.5,'#e84a8a');g0.addColorStop(0.75,'#ffb060');g0.addColorStop(1,'#1a2a50');c.fillStyle=g0;c.fillRect(0,0,W,H);
  c.save();c.translate(0,0);vcArt(c,W,H);c.restore();c.fillStyle='rgba(20,10,30,0.25)';c.fillRect(0,0,W,H);
  const t0=GV.launch.t0,tc=wb('comes',76.6);for(let i=0;i<6;i++){const tb=t0+0.3+i*0.35,p=(t-tb)/1.2;if(p<0||p>1)continue;const x=200+hash(i*3)*680,y=500+hash(i*5)*400;c.save();c.globalCompositeOperation='lighter';for(let k=0;k<20;k++){const a=k/20*TAU,r2=EZ.out(p)*200;c.fillStyle=`rgba(${['255,120,200','255,210,120','120,220,255'][i%3]},${1-p})`;c.beginPath();c.arc(x+Math.cos(a)*r2,y+Math.sin(a)*r2+p*p*80,6,0,TAU);c.fill();}c.restore();}
  const k=EZ.out(sgB(t,t0,t0+0.6)),sc=lerp(1.6,2.3,EZ.io(u/d));glowAt(c,540,1150,520,'255,230,180',0.5);c.fillStyle='rgba(10,8,20,0.6)';c.beginPath();c.ellipse(540,1520,300,60,0,0,TAU);c.fill();gtaBox(c,540,lerp(1500,1180,k),sc,-0.04+Math.sin(t*1.2)*0.02,{});
  if(t>tc){const p=sgB(t,tc,tc+0.6);ring(c,540,1180,200+p*500,0.6*(1-p),'rgba(255,240,200,',10);}
  const f=sgB(t,L[L.length-1].b+0.3,END-0.15);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}
  lens(c,t,{v:0.45});};
// ---------- edit ----------
const GSEQ=[['cops',0],['hack',LT(1)-0.05],['tvots',wb('with',4.7)-0.05],['vault',LT(2)-0.05],['costhim',LT(3)-0.05],['sept',LT(4)-0.05],['studio',LT(5)-0.05],['intro',LT(6)-0.05],['bail',LT(7)-0.05],['taken',LT(8)-0.05],['guard',LT(9)-0.05],
  ['stick',LT(10)-0.05],['grab',LT(11)-0.05],['work',LT(12)-0.05],['login',LT(13)-0.05],['posts',LT(14)-0.05],['threat',LT(15)-0.05],['videos',LT(17)-0.05],['biggest',LT(18)-0.05],['cost',LT(19)-0.05],['hours',LT(20)-0.05],
  ['twist',LT(21)-0.05],['unfit',LT(22)-0.05],['court',LT(23)-0.05],['dock',LT(24)-0.05],['sent',LT(25)-0.05],['nodate',LT(26)-0.05],['launch',LT(27)-0.05]];
SHOTS.length=0;GSEQ.forEach(([k,t0])=>{GV[k].t0=t0;SHOTS.push([t0,(c,t,u,d)=>GV[k](c,t,u,d)]);});SHOTS.sort((a,b)=>a[0]-b[0]);
KEY.clear();['LAPTOP','TV','60','SECRET','24','90','TWIST','HOSPITAL'].forEach(w=>KEY.add(w));
