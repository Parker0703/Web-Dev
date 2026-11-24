'use strict';
// ===================== cinematic rebuild: real 3D vehicles + 3D poplar + detailed sets + grading =====================
const T0P=[0,0,0];
// redraw part of the plate (an object in front) over characters: polygon of world points, clipped re-paint of the plate image
function plateOcc(c,id,poly){const P=poly.map(pp);c.save();c.beginPath();P.forEach((q,i)=>i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y));c.closePath();c.clip();c.drawImage(IMG[id],0,0,W,H);c.restore();}
// cinematic grade: lifted teal shadows, warm highlights, soft bloom on brights, gentle vignette, grain
function cgrade(c,t,o={}){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=o.tint||'rgba(40,90,110,0.35)';c.fillRect(0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='overlay';const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,o.top||'rgba(255,190,120,0.16)');g.addColorStop(1,o.bot||'rgba(30,60,80,0.22)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  if(o.flare){const [fx,fy]=o.flare;c.save();c.globalCompositeOperation='lighter';const r=c.createRadialGradient(fx,fy,0,fx,fy,520);r.addColorStop(0,'rgba(255,220,160,0.55)');r.addColorStop(0.3,'rgba(255,170,90,0.18)');r.addColorStop(1,'rgba(255,140,60,0)');c.fillStyle=r;c.fillRect(0,0,W,H);
    c.fillStyle='rgba(255,200,140,0.10)';c.fillRect(0,fy-6,W,12);for(let i=1;i<4;i++){const px=fx+(540-fx)*i*0.55,py=fy+(960-fy)*i*0.55;c.fillStyle=`rgba(255,200,150,${0.08})`;c.beginPath();c.arc(px,py,40+i*30,0,TAU);c.fill();}c.restore();}
  lens(c,t,{v:o.v??0.55});}
const hh=(t,a=4)=>({ox:Math.sin(t*1.3)*a+Math.sin(t*3.1)*a*0.4,oy:Math.cos(t*1.1)*a*0.7});
// draw a mixed list of actors far→near ({pos,draw})
function depth(L){L.filter(Boolean).map(a=>({a,w:pp(a.pos).w})).sort((p,q)=>q.w-p.w).forEach(x=>x.a.draw());}
const A_=(pos,draw)=>({pos,draw});
// ---- 1 · "In 1976," golden dawn on the DMZ: the lone poplar, a bomber's shadow crosses the land
XD.hook=(c,t,u,d)=>{camAt(c,'t2_dawn',[0,9,0],1.0+u*0.04,hh(t,3));tree3(c,t,T0P,{});const k=clamp((u-0.2)/1.4);vsprite(c,'b52',[lerp(-120,90,k),95,lerp(60,-40,k)],0.9,{});c.restore();
  cgrade(c,t,{flare:[880,640],top:'rgba(255,170,90,0.25)'});dzYear(c,'1976',clamp((u-0.05)/0.3));};
// ---- 2 · "America sent B-52 bombers," a formation thunders overhead, contrails
XD.b52=(c,t,u,d)=>{camAt(c,'t2_sky',[0,22,-30],1.0,hh(t,6));const k=clamp(u/(d+0.3));const yw=-0.245,hx=Math.cos(yw),hz=-Math.sin(yw);
  for(const [dx,dz,dy] of [[-18,-25,-4],[0,0,0],[-14,15,-2]]){const P=[lerp(-22,18,k)+dx,68+dy,lerp(-95,-85,k)+dz];
    for(const e of [-14,-6,6,14]){const s0=toWorld(P,yw,[-6,0,e]);const q=pp(s0),q0=pp([s0[0]-hx*90,s0[1],s0[2]-hz*90]);if(q.w<=0.1||q0.w<=0.1)continue;const g=c.createLinearGradient(q.x,q.y,q0.x,q0.y);g.addColorStop(0,'rgba(255,255,255,0.55)');g.addColorStop(1,'rgba(255,255,255,0)');
      c.save();c.strokeStyle=g;c.lineWidth=Math.max(2,q.s*260);c.lineCap='round';c.filter='blur(2px)';c.beginPath();c.moveTo(q.x,q.y);c.lineTo(q0.x,q0.y);c.stroke();c.restore();}
    vsprite(c,'b52',P,yw,{});}
  c.restore();cgrade(c,t,{v:0.45});tagC(c,540,420,'B-52 STRATOFORTRESS',clamp(u/0.3));};
// ---- 3 · "gunships" Cobras rip past low over the hills; the second one banks away
XD.gunships=(c,t,u,d)=>{camAt(c,'t2_hill',[2,6,0],1.0,hh(t,8));const k=u/d;depth([A_([lerp(-22,16,k),11,10],()=>heli(c,'cobra',[lerp(-22,16,k),11,10],Math.PI,t,{blur:[60,0]})),A_([lerp(-36,4,k),15,2],()=>heli(c,'cobra',[lerp(-36,4,k),15,2],Math.PI+0.2,t+0.3,{blur:[40,0]})),A_([lerp(30,-30,k),18,-30],()=>heli(c,'huey',[lerp(30,-30,k),18,-30],Math.PI,t+0.6,{}))]);
  c.restore();cgrade(c,t);tagC(c,540,420,'AH-1 COBRA GUNSHIPS',clamp(u/0.25));};
// ---- 4 · "and hundreds of troops" a convoy rolls up the road at dawn, dust trailing
XD.troops=(c,t,u,d)=>{camAt(c,'t2_road2',[12.5,1.8,40],1.0,hh(t,3));const L=[];for(let i=0;i<4;i++){const z=lerp(70,22,clamp(u/1.5))+i*12,x=Math.sin(z*0.03)*6+8;const yaw=Math.PI/2+Math.cos(z*0.03)*0.18;
    L.push(A_([x,0,z],()=>{truck(c,[x,0,z],yaw,t,{});const q=pp([x,0.3,z+4]);for(let j=0;j<4;j++){c.fillStyle='rgba(200,170,120,0.08)';c.beginPath();c.arc(q.x+(hash(j+i)-0.5)*80*q.s*40,q.y-j*10,(60+j*30)*q.s*30,0,TAU);c.fill();}}));}depth(L);
  c.restore();cgrade(c,t,{});dzCounter(c,540,440,clamp((u-0.1)/0.3),'800+','TROOPS',GOLD_C);};
// ---- 5 · "to the most dangerous border on Earth…" the war-room table map; the DMZ line burns
function tableMap(c,t,o={}){// overlay on the war-room map table plane (y≈1.01): DMZ glow + JSA marker, projected
  const T=(u,v)=>pp([-3+u*6,1.012,-1.7+v*3.4]);const dmU=[[126.3,37.75],[126.68,37.96],[127.3,38.25],[128.35,38.62]].map(([lo,la])=>[((lo-123)*118+60)/1024,((43.2-la)*105+60)/1024]);
  c.save();c.globalCompositeOperation='lighter';const pl=0.6+0.4*Math.sin(t*5);c.strokeStyle=`rgba(255,80,50,${0.55*pl*(o.dmz??1)})`;c.lineWidth=26;c.lineCap='round';c.beginPath();dmU.forEach(([u,v],i)=>{const q=T(u,v);i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y);});c.stroke();
  c.strokeStyle=`rgba(255,200,120,${0.9*(o.dmz??1)})`;c.lineWidth=6;c.stroke();
  if(o.jsa){const q=T(dmU[1][0],dmU[1][1]);const r=26+14*Math.sin(t*6);c.strokeStyle='rgba(255,210,63,0.95)';c.lineWidth=5;c.beginPath();c.arc(q.x,q.y,r,0,TAU);c.stroke();c.fillStyle='#ffd23f';c.beginPath();c.arc(q.x,q.y,8,0,TAU);c.fill();}
  c.restore();if(o.after)o.after(T,dmU);}
XD.border=(c,t,u,d)=>{camAt(c,'wr_map',[0,1,0],lerp(1.0,1.25,eio(clamp(u/d))),{});tableMap(c,t,{});c.restore();cgrade(c,t,{tint:'rgba(20,60,110,0.35)'});
  txt(c,'THE DMZ',540,330,120,'#ff5a3a',{sw:16,ls:10});c.font='800 36px "Inter Display"';c.textAlign='center';c.fillStyle='#fff';c.fillText('160 MILES OF MINES, WIRE & GUNS',540,410);};
// ---- 6 · "to cut down one tree." everything converges on the poplar: helicopters circle, trucks surround, a target locks
XD.onetree=(c,t,u,d)=>{camAt(c,'t2_wide',[0,10,0],1.0+u*0.03,hh(t,3));const L=[A_([0,0,0],()=>tree3(c,t,T0P,{}))];
  for(let i=0;i<3;i++){const a=t*0.35+i*2.1,P=[Math.cos(a)*30,22+i*4,Math.sin(a)*30-6];L.push(A_(P,()=>heli(c,i%2?'cobra':'huey',P,-a-Math.PI/2,t+i,{})));}
  L.push(A_([12,0,10],()=>truck(c,[12,0,10],0.4,t,{})),A_([-12,0,9],()=>truck(c,[-12,0,9],-0.6,t,{})));depth(L);const top=pp([0,18,0]);c.restore();
  const k=eo(clamp((u-0.2)/0.6)),r=lerp(620,250,k);c.save();c.strokeStyle=`rgba(255,60,40,${0.9*k})`;c.lineWidth=7;c.beginPath();c.arc(top.x,top.y,r,0,TAU);c.stroke();for(let i=0;i<4;i++){const a=i*Math.PI/2;seg(c,top.x+Math.cos(a)*(r-50),top.y+Math.sin(a)*(r-50),top.x+Math.cos(a)*(r+60),top.y+Math.sin(a)*(r+60));}c.restore();
  cgrade(c,t);tagC(c,540,420,'TARGET: ONE TREE',clamp((t-TW('tree')+0.2)/0.3),'#ff6a5a');};
// ---- 7 · "Because three days earlier," rewind: the helicopters fly backwards, the trucks reverse out
XD.rewind=(c,t,u,d)=>{camAt(c,'t2_wide',[0,10,0],1.02,{});const tb=2.2-u*1.4;const L=[A_([0,0,0],()=>tree3(c,t,T0P,{}))];
  for(let i=0;i<3;i++){const a=tb*0.35+i*2.1,P=[Math.cos(a)*30*(1+u*0.8),22+i*4+u*12,Math.sin(a)*30-6];L.push(A_(P,()=>heli(c,i%2?'cobra':'huey',P,-a-Math.PI/2,-t,{})));}depth(L);c.restore();
  cgrade(c,t);dzVhs(c,t,1);tagC(c,540,420,'3 DAYS EARLIER',clamp(u/0.3));};
// ---- 8 · "that tree got two American soldiers killed." dusk: two helmets in the grass, an axe left behind
XD.killed=(c,t,u,d)=>{camAt(c,'t2_base',[0,1.6,0],1.0+u*0.03,{oy:-200});tree3(c,t,T0P,{state:'trim'});const h1=pp([1.6,0,2.6]),h2=pp([2.6,0,1.6]);
  for(const [p,r] of [[h1,0.3],[h2,-0.5]]){c.save();c.translate(p.x,p.y);c.rotate(r);const g=c.createRadialGradient(-30*p.s,-60*p.s,5,0,-30*p.s,100*p.s);g.addColorStop(0,'#6e7650');g.addColorStop(1,'#2a3020');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=5;c.beginPath();c.ellipse(0,-30*p.s,95*p.s,62*p.s,0,Math.PI,TAU);c.closePath();c.fill();c.stroke();c.restore();}
  const a=pp([0.8,0,3.4]);axe(c,a.x,a.y,0.9*a.s,1.4);c.restore();cgrade(c,t,{tint:'rgba(80,40,90,0.4)',top:'rgba(255,120,80,0.2)',v:0.75});dzCounter(c,540,440,clamp((t-TW('killed')+0.1)/0.3),'2','AMERICANS KILLED','#ff5a4a');};
// ---- 9 · "It stood inside the Joint Security Area," the blue huts on the line; guards at their posts; slow push
XD.jsa=(c,t,u,d)=>{camAt(c,'j2_wide',[0,2.4,-6],1.0+u*0.05,{});cast(c,[['rok',[-3.6,0,6.4],F('glare','angry','flat',{seed:1})],['rok',[3.6,0,6.2],F('glare','angry','flat',{seed:2})],['kpa',[-3.4,0,-6.2],F('glare','angry','flat',{seed:3})],['kpa2',[3.4,0,-6.4],F('glare','angry','flat',{seed:4})]]);
  c.restore();cgrade(c,t);tagC(c,540,420,'JOINT SECURITY AREA',clamp(u/0.3));};
// ---- 10 · "the one spot in the Korean DMZ…" the war-room map; push in on the JSA
XD.spot=(c,t,u,d)=>{camAt(c,'wr_map',[-0.9,1,-0.1],lerp(1.1,2.6,eio(clamp(u/d))),{});tableMap(c,t,{jsa:1});c.restore();cgrade(c,t,{tint:'rgba(20,60,110,0.35)'});tagC(c,540,420,'THE JSA',clamp((u-0.4)/0.3));};
// ---- 11 · "…guards stand face to face." the stare across the concrete line
XD.face=(c,t,u,d)=>{camAt(c,'j2_face',[6,1.5,0],1.0+u*0.03,{oy:-40});const sweat=u>1.5;
  cast(c,[['rok',[6.2,0,0.85],F('glare','angry','grit',{seed:3,f:-1,view:'3q',sweat})],['kpa',[6.0,0,-0.85],F('glare','furious','flat',{seed:2,f:1,view:'3q'})]]);c.restore();cgrade(c,t,{v:0.65});tagC(c,540,420,'FACE TO FACE',clamp((t-TW('face')+0.2)/0.3));};
// ---- 12 · "A hundred-foot poplar was blocking the view between two UN checkpoints." aerial; the sightline is cut
XD.poplar=(c,t,u,d)=>{camAt(c,'t2_air',[4,0,-2],1.0+u*0.03,{});const a=pp([16,3,8]),b=pp([21,9,12]),e=pp([-30,4,-20]);tree3(c,t,T0P,{});
  const k=eo(clamp((u-0.6)/0.8)),m=pp([0,12,0]);c.save();c.strokeStyle='#ffd23f';c.lineWidth=7;c.setLineDash([24,16]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(b.x,b.y);c.lineTo(lerp(b.x,e.x,k),lerp(b.y,e.y,k));c.stroke();c.setLineDash([]);
  if(k>0.5){c.fillStyle='#ff3b30';c.font='900 120px "Inter Display"';c.textAlign='center';c.fillText('✕',m.x,m.y+40);}c.font='900 32px "Inter Display"';c.textAlign='center';c.fillStyle='#fff';c.strokeStyle=OL;c.lineWidth=8;for(const [p,s] of [[b,'CHECKPOINT 3'],[e,'OBSERVATION POST']]){c.strokeText(s,p.x,p.y-30);c.fillText(s,p.x,p.y-30);}c.restore();c.restore();
  cgrade(c,t);tagC(c,540,420,'100-FOOT POPLAR',clamp((t-TW('hundred-foot'))/0.3));};
// trimming crew on the open truck bed under the low limb
const LIMB=[-3.4,4.3,0.4];
function crewOnTruck(c,t,tx,sw0,arrived=true){truck(c,[tx,0,1.3],0,t,{open:1});if(!arrived)return;for(const [x,sd] of [[-4.45,4],[-3.45,6]]){const pos=[x,1.3,1.5];const rc=reach(pos,LIMB);const sw=Math.sin(t*6+sd)*0.35*sw0;
  const r=who(c,'ksc',pos,F('focus','angry','grit',{seed:sd,f:1,hf:[rc[0],rc[1]+sw*20],hb:[-10,94]}));if(r){axe(c,r.hf.x,r.hf.y,0.75*r.s,-0.2+sw);if(sw>0.25){const q=pp(LIMB);for(let i=0;i<6;i++){c.fillStyle='#e8d8b0';c.fillRect(q.x+(hash(i+sd)-0.5)*60,q.y+((t*3+i*0.2)%1)*90,6,4);}}}}}
// ---- 13 · "So on August 18th, a small crew went out to trim it."
XD.crew=(c,t,u,d)=>{camAt(c,'t2_crew2',[-2.8,1.15,1.2],1.0,{});const tx=lerp(-16,-4.2,eo(clamp(u/1.3)));depth([A_([0,0,0],()=>tree3(c,t,T0P,{state:u>3?'trim':'full'})),A_([tx,0,1.3],()=>crewOnTruck(c,t,u>1.3?-4.2:tx,u>1.3?1:0,u>1.3)),A_([1.4,0,3.8],()=>who(c,'bonifas',[1.4,0,3.8],F('dot','flat','flat',{seed:7,f:-1})))]);
  c.restore();cgrade(c,t);tagC(c,540,420,'AUGUST 18, 1976',clamp((t-TW('18th')+0.2)/0.3));};
// ---- 14 · "North Korean soldiers showed up and ordered them to stop." they march in; the officer points
XD.stop=(c,t,u,d)=>{camAt(c,'t2_crew2',[-1.6,1.15,1.6],1.04,{});const wk=clamp(u/1.2),ox=lerp(2.2,-1.5,wk),pt=t>TW('ordered')-0.1;
  depth([A_([0,0,0],()=>tree3(c,t,T0P,{})),A_([-4.2,0,1.3],()=>crewOnTruck(c,t,-4.2,0.2)),A_([-2.9,0,4.6],()=>who(c,'bonifas',[-2.9,0,4.6],F('focus','angry','flat',{seed:7,f:1,view:'3q'}))),
    A_([ox+0.6,0,2.8],()=>who(c,'kpa',[ox+0.6,0,2.8],F('glare','angry','flat',{seed:9,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7}))),A_([ox+0.9,0,3.0],()=>who(c,'kpa2',[ox+0.9,0,3.0],F('glare','angry','flat',{seed:10,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7+1}))),
    A_([ox,0,4.4],()=>who(c,'kpaoff',[ox,0,4.4],F('rage','furious','yell',Object.assign({seed:8,f:-1,view:'3q',walk:wk<1?1:0,ph:t*7+2},pt?{hf:[-120,-50]}:{}))))]);
  c.restore();cgrade(c,t);tagC(c,540,420,'"STOP!"',clamp((t-TW('stop')+0.15)/0.25),'#ff6a5a');};
// ---- 15 · "The Americans kept working." Bonifas waves the officer off; the axes keep swinging
XD.kept=(c,t,u,d)=>{camAt(c,'t2_crew2',[-2.4,1.15,1.4],1.0,{});depth([A_([0,0,0],()=>tree3(c,t,T0P,{})),A_([-4.2,0,1.3],()=>crewOnTruck(c,t,-4.2,1)),A_([-2.3,0,4.6],()=>who(c,'bonifas',[-2.3,0,4.6],F('focus','flat','smirk',{seed:7,f:1,view:'3q',hf:[80,10]}))),A_([-0.7,0,4.0],()=>who(c,'kpaoff',[-0.7,0,4.0],F('rage','furious','grit',{seed:8,f:-1,view:'3q'})))]);
  c.restore();cgrade(c,t);};
// ---- 16 · "Then a North Korean officer gave a signal…" close: he slips off his wristwatch (85 mm, background soft)
XD.signal=(c,t,u,d)=>{camAt(c,'t2_rev',[2,2.2,4],1.15,{});cast(c,[['kpa',[-0.6,0,-1.2],F('glare','angry','grit',{seed:14})],['kpa2',[1.4,0,-1.6],F('glare','angry','grit',{seed:15})],['kpa',[3.0,0,-0.6],F('glare','angry','flat',{seed:17})]]);c.restore();c.save();c.filter='blur(6px)';c.drawImage(c.canvas,0,0,c.canvas.width,c.canvas.height,0,0,W,H);c.restore();ink(c,0.2);const s=2.9,x=540,y=1660;
  const r=who(c,'kpaoff',[0,0,0],F('rage','furious','grit',{seed:8,abs:{x,y,s},hf:[175,-250]}));if(r){const w=r.hf;const k=clamp((u-0.6)/1.0);c.save();c.translate(w.x+k*60,w.y-k*20);const g=c.createLinearGradient(-26,0,26,0);g.addColorStop(0,'#8a8e94');g.addColorStop(0.5,'#e8ecf0');g.addColorStop(1,'#6a6e74');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=4;c.beginPath();c.arc(0,0,22,0,TAU);c.fill();c.stroke();c.fillStyle='#f4f0e0';c.beginPath();c.arc(0,0,16,0,TAU);c.fill();c.strokeStyle='#1a1a1a';c.lineWidth=2;seg(c,0,0,0,-11);seg(c,0,0,8,4);c.restore();}
  cgrade(c,t,{tint:'rgba(120,30,20,0.4)',v:0.75});tagC(c,540,420,'THE SIGNAL',clamp((t-TW('signal')+0.2)/0.3),'#ff6a5a');};
// ---- 17 · axes grabbed; the crew scatters; dust; cut to black
XD.axes=(c,t,u,d)=>{if(u<1.1){camAt(c,'t2_base',[0,0.6,1.5],1.25,{oy:-200});const p=pp([0.6,0,2.4]);c.restore();const k=clamp(u/0.5),lift=eo(clamp((u-0.5)/0.5));
    c.save();const hx=lerp(1250,640,eo(k)),hy=lerp(700,1000,eo(k))-lift*300;axe(c,lerp(p.x,hx-20,lift),lerp(p.y-40,hy+40,lift),1.4*p.s,lerp(1.4,0.3,lift));c.fillStyle='#d8b08a';c.strokeStyle=OL;c.lineWidth=6;c.beginPath();c.ellipse(hx,hy,70,52,0.4,0,TAU);c.fill();c.stroke();c.fillStyle=KPA;c.fillRect(hx+40,hy-60,500,120);c.strokeRect(hx+40,hy-60,500,120);c.restore();}
  else{camAt(c,'t2_crew2',[-1.2,1.15,2.0],1.08,dzSh(t,14));tree3(c,t,T0P,{});const ph=t*12;
    const RR=cast(c,[['kpa',[-0.9,0,3.0],F('rage','furious','yell',{seed:9,f:-1,run:1,ph,hf:[-30,-170]})],['kpa2',[0.0,0,3.8],F('rage','furious','yell',{seed:10,f:-1,run:1,ph:ph+2,hf:[-30,-170]})],['ksc',[-3.2,0,3.0],F('wide','worried','o',{seed:4,f:-1,run:1,ph:ph+1})],['us2',[-2.0,0,4.4],F('wide','worried','o',{seed:5,f:-1,run:1,ph:ph+3})]]);
    for(const r of RR.slice(0,2))if(r)axe(c,r.hf.x,r.hf.y,0.8*r.s,-0.4+Math.sin(t*9)*0.3);
    for(let i=0;i<14;i++){const q=pp([(hash(i)-0.5)*6,0.3,2+hash(i*3)*3]);c.fillStyle='rgba(190,170,130,0.22)';c.beginPath();c.arc(q.x+Math.sin(t*3+i)*30,q.y-((t*0.8+hash(i))%1)*200,(80+hash(i*5)*90)*q.s,0,TAU);c.fill();}c.restore();
    const f=clamp((u-2.1)/0.4);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}}cgrade(c,t,{v:0.6});};
// ---- 18 · "In less than a minute," the officer's wristwatch in the grass, the second hand racing
XD.minute=(c,t,u,d)=>{camAt(c,'t2_base',[0,0.4,2],1.4,{oy:-300});c.restore();c.save();c.filter='blur(10px)';c.drawImage(c.canvas,0,0,c.canvas.width,c.canvas.height,0,0,W,H);c.restore();ink(c,0.35);
  c.save();c.translate(540,900);c.rotate(-0.2);c.fillStyle='#2a2420';c.fillRect(-60,-420,120,840);const g=c.createRadialGradient(-60,-60,20,0,0,260);g.addColorStop(0,'#f0f2f4');g.addColorStop(0.6,'#9aa0a6');g.addColorStop(1,'#4a4e54');c.fillStyle=g;c.strokeStyle=OL;c.lineWidth=8;c.beginPath();c.arc(0,0,250,0,TAU);c.fill();c.stroke();
  c.fillStyle='#f6f2e8';c.beginPath();c.arc(0,0,210,0,TAU);c.fill();c.strokeStyle='#1a1a1a';for(let i=0;i<60;i++){const a=i/60*TAU,l=i%5?12:28;c.lineWidth=i%5?3:7;seg(c,Math.cos(a)*(210-l),Math.sin(a)*(210-l),Math.cos(a)*200,Math.sin(a)*200);}
  const sec=-Math.PI/2+Math.min(0.97,u/d)*TAU;c.strokeStyle='#c8201a';c.lineWidth=6;c.lineCap='round';seg(c,-Math.cos(sec)*40,-Math.sin(sec)*40,Math.cos(sec)*190,Math.sin(sec)*190);c.strokeStyle='#1a1a1a';c.lineWidth=12;seg(c,0,0,Math.cos(-1.2)*110,Math.sin(-1.2)*110);seg(c,0,0,Math.cos(2.3)*160,Math.sin(2.3)*160);
  c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(-70,-90,90,40,-0.6,0,TAU);c.fill();c.restore();cgrade(c,t,{v:0.7});txt(c,'UNDER 1 MINUTE',540,330,84,'#ff5a4a',{sw:12});};
// ---- 20 · "America was furious." the war room: a general slams the map table; DEFCON 3 flashes red
XD.furious=(c,t,u,d)=>{camAt(c,'wr_wide',[0,1.5,-1.6],1.45,dzSh(t,u>0.8&&u<1.1?16:2));const sl=u>0.8;
  const gp=[0.2,0,-2.3];const rc=reach(gp,[0.5,1.02,-1.6]);cast(c,[['gen2',[-1.8,0,-2.4],F('glare','angry','frown',{seed:3})],['gen',gp,F('rage','furious','yell',{seed:2,hf:sl?rc:[60,-60]})],['gen2',[2.0,0,-2.2],F('glare','angry','grit',{seed:4})]]);plateOcc(c,'wr_wide',[[-3.3,1.0,-1.9],[3.3,1.0,-1.9],[3.3,0,1.9],[-3.3,0,1.9]]);c.restore();
  if(u>0.9&&Math.floor(t*4)%2){c.save();c.globalCompositeOperation='overlay';c.fillStyle='rgba(255,40,30,0.35)';c.fillRect(0,0,W,H);c.restore();}cgrade(c,t,{tint:'rgba(20,50,100,0.35)'});
  const k=clamp((u-0.9)/0.3);if(k>0){c.save();c.translate(540,430);c.fillStyle='rgba(20,0,0,0.9)';c.strokeStyle='#ff3b30';c.lineWidth=6;c.beginPath();c.roundRect(-260,-80,520,160,20);c.fill();c.stroke();txt(c,'DEFCON 3',0,30,100,Math.floor(t*4)%2?'#ff3b30':'#ff8a7a',{sw:8});c.restore();}};
// ---- 21 · "But instead of starting a war," strike arrows on the map table pull back
XD.instead=(c,t,u,d)=>{camAt(c,'wr_map',[0,1,0],1.15,{});tableMap(c,t,{after:(T,dm)=>{const k=1-eo(clamp((u-0.4)/0.9));c.save();c.strokeStyle='rgba(255,60,40,0.9)';c.lineWidth=12;c.lineCap='round';
    for(const [u0,v0] of [[0.38,0.66],[0.5,0.7],[0.62,0.64]]){const a=T(u0,v0),b=T(u0,lerp(v0,v0-0.25,k));seg(c,a.x,a.y,b.x,b.y);c.fillStyle='#ff3b30';c.beginPath();c.moveTo(b.x,b.y-30);c.lineTo(b.x-22,b.y+4);c.lineTo(b.x+22,b.y+4);c.closePath();c.fill();}c.restore();}});c.restore();
  cgrade(c,t,{tint:'rgba(20,60,110,0.35)'});tagC(c,540,420,'NO WAR… YET',clamp((u-0.6)/0.3));};
// ---- 22 · "the most extreme gardening job in history." the plan on the table: a tree, and everything checked off
XD.garden=(c,t,u,d)=>{camAt(c,'wr_map',[0,1,0],1.0,{});c.restore();c.save();c.globalAlpha=0.9;c.fillStyle='#1a3a5a';c.fillRect(140,560,800,1100);c.strokeStyle='rgba(200,225,255,0.15)';c.lineWidth=2;for(let i=0;i<27;i++){seg(c,140+i*30,560,140+i*30,1660);}for(let i=0;i<22;i++)seg(c,140,560+i*50,940,560+i*50);c.restore();
  c.save();c.beginPath();c.rect(140,560,800,1100);c.clip();c.globalAlpha=0.85;const m=VM['poplarfull_90_0'],im=VIMG['poplarfull_90_0'];if(m&&im){const k=520/m.h;c.drawImage(im,540-m.ax*k,1150-m.ay*k,m.w*k,m.h*k);}c.globalCompositeOperation='color';c.fillStyle='#4a8ad8';c.fillRect(0,0,W,H);c.restore();
  c.save();c.strokeStyle='#ff5a4a';c.lineWidth=8;c.beginPath();c.arc(540,900,280,0,TAU);c.stroke();seg(c,200,900,880,900);seg(c,540,560,540,1240);c.restore();
  txt(c,'OPERATION: CUT 1 TREE',540,300,62,'#ffd23f',{sw:10,ls:4});const items=['CHAINSAWS','SPECIAL FORCES','27 HELICOPTERS','B-52 BOMBERS','AIRCRAFT CARRIER'];
  items.forEach((s,i)=>{const k=clamp((u-0.3-i*0.4)/0.25);if(k<=0)return;c.save();c.globalAlpha=k;c.font='800 46px "Inter Display"';c.fillStyle='#e8f2ff';c.textAlign='left';c.fillText('☑  '+s,250,1340+i*90);c.restore();});cgrade(c,t,{tint:'rgba(20,60,110,0.3)'});};
// ---- 23 · "On August 21st, a convoy rolled in." first light; headlights; the convoy comes up the road
XD.convoy=(c,t,u,d)=>{camAt(c,'t2_dawn',[0,6,4],1.0,hh(t,2));const L=[A_([0,0,0],()=>tree3(c,t,T0P,{state:'trim'}))];for(let i=0;i<4;i++){const z=lerp(46,14,clamp(u/2.6))+i*9;const x=Math.sin(z*0.03)*6+8;const yaw=Math.PI/2+Math.cos(z*0.03)*0.18;
    L.push(A_([x,0,z],()=>{const P={p:[x,0,z],yaw:yaw,cy:1.2};headBeam(c,P,14,0.3);truck(c,[x,0,z],yaw,t,{});}));}depth(L);
  c.restore();cgrade(c,t,{flare:[860,700],top:'rgba(255,160,80,0.25)'});tagC(c,540,420,'AUGUST 21 · 7:00 AM',clamp((t-TW('21st')+0.2)/0.3));};
// ---- 24 · "Engineers with chainsaws." they pull the cords; the saws cough smoke and roar
XD.engineers=(c,t,u,d)=>{camAt(c,'t2_base',[0,1.6,0],1.0,{oy:-300});tree3(c,t,T0P,{state:'trim'});
  for(const [x,f,sd] of [[-1.6,1,3],[1.6,-1,5]]){const r=who(c,'eng',[x,0,0.9],F('focus','angry','grit',{seed:sd,f,hf:[50*f,20],hb:[-10*f,92]}));if(r){c.save();c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.5*r.s,-0.3,t,u>0.4);c.restore();if(u>0.4)for(let i=0;i<5;i++){const ph=(t*1.5+i/5)%1;c.fillStyle=`rgba(200,200,200,${0.5*(1-ph)})`;c.beginPath();c.arc(r.hf.x-f*40*r.s,r.hf.y-30*r.s-ph*120,(10+ph*30)*r.s,0,TAU);c.fill();}}}
  c.restore();cgrade(c,t);tagC(c,540,420,'ENGINEERS',clamp(u/0.3));};
// ---- 25 · "Special forces ready to fight." a line of ROK special forces, clubs ready; a Huey hovers behind
XD.sf=(c,t,u,d)=>{camAt(c,'t2_low',[0,1.6,4],1.05,{oy:-140});heli(c,'huey',[-8,9,-18],0.4,t,{shadow:1});const Lr=[];for(let i=0;i<6;i++)Lr.push(['roksf',[-4+i*1.6,0,4+(i%2)*0.8],F('glare','furious','grit',{seed:20+i,hf:[18,70]})]);const R=cast(c,Lr);
  R.forEach(r=>{if(r){c.save();c.translate(r.hf.x,r.hf.y);c.rotate(0.3);c.strokeStyle=OL;c.lineWidth=12*r.s;seg(c,0,10*r.s,0,-90*r.s);c.strokeStyle='#8a6a40';c.lineWidth=7*r.s;seg(c,0,10*r.s,0,-90*r.s);c.restore();}});c.restore();cgrade(c,t);tagC(c,540,420,'ROK SPECIAL FORCES',clamp(u/0.3));};
// ---- 26 · "Twenty-seven helicopters overhead." the sky fills, rotors thudding; the counter climbs
XD.helis=(c,t,u,d)=>{camAt(c,'t2_sky',[0,22,-30],1.0,hh(t,6));const n=Math.floor(eo(clamp(u/1.6))*27);const L=[];for(let i=0;i<n;i++){const P=[(hash(i*1.3)-0.5)*120+u*(6+hash(i)*6),18+hash(i*2.7)*50,-20-hash(i*3.3)*90];const yaw=Math.PI+(hash(i*5)-0.5)*0.6;L.push(A_(P,()=>heli(c,i%3?'huey':'cobra',P,yaw,t+i,{})));}depth(L);
  c.restore();cgrade(c,t,{v:0.45});dzCounter(c,540,440,clamp(u/0.3),String(n),'HELICOPTERS',GOLD_C);};
// ---- 27 · "B-52s flying in from Guam." over the Pacific, the bombers come in high; route inset
XD.guam=(c,t,u,d)=>{camAt(c,'s2_sky',[0,36,0],1.0,hh(t,4));const k=u/(d+0.4);for(const [dx,dz] of [[-10,-30],[0,0],[-30,26]])vsprite(c,'b52',[lerp(-80,20,k)+dx,72,lerp(-75,-55,k)+dz],-0.2,{});c.restore();cgrade(c,t,{v:0.45});
  c.save();c.translate(800,1500);c.fillStyle='rgba(10,20,34,0.8)';c.strokeStyle='#ffd23f';c.lineWidth=4;c.beginPath();c.roundRect(-200,-160,400,320,18);c.fill();c.stroke();c.save();c.translate(-170,-150);c.scale(0.18,0.18);c.fillStyle='#4a6a48';c.beginPath();KOR.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.restore();
  c.fillStyle='#4a6a48';c.beginPath();c.arc(140,110,8,0,TAU);c.fill();c.strokeStyle='#ffd23f';c.setLineDash([10,8]);c.beginPath();c.moveTo(140,110);c.quadraticCurveTo(60,20,-80,-60);c.stroke();c.setLineDash([]);c.font='800 26px "Inter Display"';c.fillStyle='#fff';c.textAlign='center';c.fillText('GUAM',140,146);c.fillText('KOREA',-90,-100);c.restore();tagC(c,540,420,'FROM GUAM',clamp(u/0.3));};
// ---- 28 · "An aircraft carrier waiting off the coast." USS Midway; an F-4 thunders off the deck
XD.carrier=(c,t,u,d)=>{camAt(c,'s2_low',[0,5.5,0],1.0+u*0.03,hh(t,3));const k=clamp(u/1.8);const P=[lerp(-30,40,k),5.6+k*k*22,lerp(10,22,k)];vsprite(c,'f4',P,-0.25,{blur:[-30*k,10*k]});
  for(let i=0;i<8;i++){const q=pp([P[0]-10-i*3,P[1]-i*0.4,P[2]+i*0.6]);c.fillStyle=`rgba(230,230,230,${0.25*(1-i/8)})`;c.beginPath();c.arc(q.x,q.y,(30+i*12)*q.s*30,0,TAU);c.fill();}c.restore();cgrade(c,t);tagC(c,540,420,'USS MIDWAY',clamp(u/0.3));};
// ---- 30 · "Operation Paul Bunyan." low angle on the poplar at dawn; the title stamps in
XD.bunyan=(c,t,u,d)=>{camAt(c,'t2_dawn',[0,12,0],lerp(1.0,1.12,eo(clamp(u/d))),{});tree3(c,t,T0P,{state:'trim'});c.restore();cgrade(c,t,{flare:[880,640]});
  c.save();const s=back(clamp(u/0.4));c.translate(540,470);c.scale(s,s);txt(c,'OPERATION',0,-40,80,'#fff',{sw:12,ls:10});txt(c,'PAUL BUNYAN',0,80,120,'#ffd23f',{sw:16,ls:6});c.restore();};
// ---- 31 · "Right in front of the North Korean guards, the chainsaws started."
XD.cut=(c,t,u,d)=>{camAt(c,'t2_base',[0,1.6,0],1.0,{oy:-330});const T0=tree3(c,t,T0P,{state:'trim'});const on=t>TW('chainsaws')-0.1;
  cast(c,[['kpa',[-5.5,0,-4],F('glare','angry','flat',{seed:14})],['kpa2',[-3.6,0,-5.5],F('glare','angry','flat',{seed:15})],['kpa',[3.8,0,-5],F('glare','angry','flat',{seed:16})]]);
  for(const [x,f,sd] of [[-1.25,1,3],[1.25,-1,5]]){const pos=[x,0,0.6];const rc=reach(pos,[x*0.55,1.0,0.3]);const r=who(c,'eng',pos,F('focus','angry','grit',{seed:sd,f,crouch:14,hf:[rc[0],rc[1]],hb:[rc[0]-f*26,rc[1]+6]}));
    if(r){c.save();c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.5*r.s,0.06,t,on);c.restore();if(on&&T0)sawdust(c,t,T0.b.x,T0.b.y-1.0*T0.u,r.s,-f);}}
  heli(c,'huey',[lerp(-40,40,(u*0.1)%1),20,-30],0,t,{});c.restore();cgrade(c,t);};
// ---- 32 · "Nobody fired a shot." frozen stares; a helicopter shadow slides over them; zero
XD.noshot=(c,t,u,d)=>{camAt(c,'t2_rev',[0.4,1.6,0],1.35+u*0.04,{oy:-120});cast(c,[['kpa',[-0.6,0,-1.2],F('glare','angry','flat',{seed:14})],['kpa2',[1.4,0,-1.6],F('glare','angry','flat',{seed:15})],['kpaoff',[0.4,0,0],F('glare','furious','grit',{seed:16,sweat:true})]]);
  vshadow(c,[lerp(-12,12,u/d),0,-1],0.2,11,3,0.3,16);c.restore();cgrade(c,t);dzCounter(c,540,440,clamp(u/0.3),'0','SHOTS FIRED',GOLD_C);};
// ---- 33 · "Forty-two minutes later, the tree was gone." TIMBER — the poplar topples, dust rolls out
XD.gone=(c,t,u,d)=>{const fk=clamp((u-0.4)/1.4);const fall=-Math.pow(fk,2.2)*1.45;const imp=fk>=1&&u<2.5;camAt(c,'t2_wide',[0,10,0],1.0,dzSh(t,imp?(1-(u-1.8)/0.7)*18:0));tree3(c,t,T0P,{state:'trim',fall});
  if(fk>=0.98){for(let i=0;i<16;i++){const q=pp([-6-hash(i)*20,0.5,(hash(i*3)-0.5)*6]);const a=clamp((u-1.8)*0.8);c.fillStyle=`rgba(200,180,140,${0.5*(1-a)})`;c.beginPath();c.arc(q.x,q.y-a*120,(120+hash(i*5)*160)*q.s*(0.5+a),0,TAU);c.fill();}}
  c.restore();cgrade(c,t);dzWatch(c,860,560,110,0.7,'');txt(c,'42 MIN',860,760,64,'#fff',{sw:10});};
// ---- 36 · "Two countries almost went back to war…" both sides massed across the line; then the map
XD.war=(c,t,u,d)=>{if(u<1.4){camAt(c,'j2_wide',[0,2.4,-6],1.05-u*0.03,dzSh(t,3));const Lw=[];for(let i=0;i<5;i++){Lw.push(['rok',[-14+i*7,0,4+(i%2)],F('glare','furious','grit',{seed:30+i})]);Lw.push(['kpa',[-14+i*7+2,0,-4-(i%2)],F('glare','furious','grit',{seed:40+i})]);}cast(c,Lw);c.restore();cgrade(c,t);}
  else{camAt(c,'wr_map',[0,1,0],lerp(2.2,1.0,eo(clamp((u-1.4)/1.2))),{});tableMap(c,t,{jsa:1});c.restore();cgrade(c,t,{tint:'rgba(20,60,110,0.35)'});}};
// ---- 37 · "over a tree." the stump at golden hour; fade out
XD.stump=(c,t,u,d)=>{camAt(c,'t2_dawn',[0,3,0],1.25+u*0.03,{oy:-200});tree3(c,t,T0P,{state:'stump'});c.restore();cgrade(c,t,{flare:[880,640],v:0.65});const f=clamp((t-(END-1.8))/1.7);if(f>0){c.fillStyle=`rgba(0,0,0,${f})`;c.fillRect(0,0,W,H);}};
