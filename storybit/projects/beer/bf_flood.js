'use strict';
// ===================== Flood engine: a depth-sorted height-field of beer, drawn far→near in ground rows =====================
// Every ground row (screen y = yg, perspective scale s) gets its own water profile h(x) (px at scale 1, a person ≈ 300).
// Rows are painted from the far wall toward the camera, and actors (people, barrels) are slotted in between rows,
// so water in front of a body hides it below the waterline and water behind it stays behind — nothing is pasted on.
const sAtY=(GY,y)=>0.55+(y-GY)*0.0016;
function floodField(c,t,F){const GY=F.GY,yb=F.yb??2150,N=F.rows??38,x0=F.x0??-300,x1=F.x1??1400,st=F.step??18,Hm=F.Hmax??800;
  const rows=[];for(let r=0;r<N;r++)rows.push(GY+Math.pow(r/(N-1),1.35)*(yb-GY));
  const acts=(F.actors||[]).filter(Boolean).sort((a,b)=>a.y-b.y);let ai=0;
  if(F.runup)wallRunup(c,t,F,GY);
  const PP=rows.map(yg=>{const P=[];for(let x=x0;x<=x1;x+=st)P.push([x,Math.max(0,F.H(x,yg,t))]);return P;});
  for(let r=0;r<N;r++){const yg=rows[r],s=sAtY(GY,yg),gap=(r<N-1?rows[r+1]:yg+40)-yg;
    while(ai<acts.length&&acts[ai].y<yg){acts[ai].draw();ai++;}
    const P=PP[r];if(!P.some(p=>p[1]>0.5))continue;F._next=r<N-1?PP[r+1]:null;
    floodRow(c,t,F,P,yg,s*(F.vk??1),gap,Hm,r);}
  while(ai<acts.length){acts[ai].draw();ai++;}}
function floodRow(c,t,F,P,yg,s,gap,Hm,r){const bot=yg+gap+2;
  // split into wet segments
  const segs=[];let cur=null;for(const p of P){if(p[1]>0.5){if(!cur){cur=[];segs.push(cur);}cur.push(p);}else cur=null;}
  const g=c.createLinearGradient(0,yg-Hm*s,0,yg);g.addColorStop(0,LQ.thin);g.addColorStop(0.45,LQ.mid);g.addColorStop(1,LQ.deep);
  for(const S of segs){const xa=S[0][0],xb=S[S.length-1][0];
    // thin film (toe) is see-through, deep water is not
    const path=()=>{c.beginPath();c.moveTo(xa,bot);for(const [x,h] of S)c.lineTo(x,yg-h*s+ (h<30?0:Math.sin(x*0.05+t*9+r)*1.5*s));c.lineTo(xb,bot);c.closePath();};
    const hmax=S.reduce((m,p)=>Math.max(m,p[1]),0);c.globalAlpha=hmax<40?0.55:0.97;path();c.fillStyle=g;c.fill();c.globalAlpha=1;
    // surface sheen + ripple highlights along this row's top edge, scrolling with the flow
    c.save();c.lineCap='round';for(let i=0;i<S.length-1;i++){const [x,h]=S[i],[x2,h2]=S[i+1];if(h<6)continue;const ph=hash(Math.floor((x-(t*(F.flow??200)))/40)+r*13);if(ph<0.12){c.strokeStyle=LQ.dk+'0.22)';c.lineWidth=Math.max(1,3*s);c.beginPath();c.moveTo(x-6,yg-h*s+6*s);c.quadraticCurveTo((x+x2)/2,yg-(h+h2)/2*s+10*s,x2+6,yg-h2*s+6*s);c.stroke();continue;}if(ph<0.82)continue;
      c.strokeStyle=LQ.hi+(0.12+0.3*(ph-0.75))+')';c.lineWidth=Math.max(1,2.4*s);seg(c,x,yg-h*s+1.5*s,x2,yg-h2*s+1.5*s);}c.restore();
    // steep face: vertical flow streaks + whitewater where the profile climbs fast (the surge front)
    for(let i=1;i<S.length-1;i++){const [x,h]=S[i],hp=S[i-1][1],hn=S[i+1][1];const slope=Math.max(Math.abs(h-hp),Math.abs(hn-h))/F.step2;
      if(slope>0.9&&h>40){const top=yg-h*s;if(r%2===0){const ph=(t*1.8+hash(x*0.13+r))%1;c.strokeStyle=LQ.hi+(0.3*(1-ph))+')';c.lineWidth=(3+hash(x+r)*5)*s;seg(c,x,top+ph*h*s*0.3,x+(hash(x)-0.5)*10*s,top+h*s*(0.5+0.4*hash(x*3+r)));}
        if((r%4===0&&hash(x*0.37+r)>0.55)||(slope>3&&r%2===0))whitewater(c,t,x+(hash(x+r*7)-0.5)*20*s,top+6*s,(14+hash(x*1.7+r)*22)*s*Math.min(1.4,0.6+slope*0.15),Math.floor(x*0.3+r*5),0.92);}
      // foam streaks riding on the flat flood behind the front
      else if(F.flowZ&&h>30&&hash(Math.floor(x/70)*3.1+Math.floor(r-t*F.flowZ)*7.7)>0.9){const top=yg-h*s,ang=Math.atan2(top-F.src[1],x-F.src[0]);c.save();c.translate(x,top+4*s);c.rotate(ang);c.fillStyle='rgba(246,236,210,0.7)';c.beginPath();c.ellipse(0,0,(26+hash(x+r)*34)*s,4.5*s,0,0,TAU);c.fill();for(let k=0;k<3;k++){c.beginPath();c.arc((k-1)*14*s,-2*s,(4+hash(x+k)*4)*s,0,TAU);c.fill();}c.restore();}
      else if(h>40&&hash(Math.floor((x-t*(F.flow??200)*0.8)/60)*3.1+r*7.7)>0.95){const top=yg-h*s;c.fillStyle="rgba(246,236,210,0.45)";c.beginPath();c.ellipse(x,top+3*s,(18+hash(x+r)*30)*s,2.4*s,0,0,TAU);c.fill();}}
    // crest spray thrown forward off the front
    if(F.spray&&r%5===0){for(let i=1;i<S.length-1;i++){const [x,h]=S[i];if(h>Hm*0.75&&S[i+1][1]<h*0.8){spray(c,t,x,yg-h*s,10,140*s,180*s,F.dir??1,r+i);break;}}}
    if(F._next){for(let i=0;i<S.length;i+=2){const [x,h]=S[i];if(h<120)continue;const j=Math.round((x-(F.x0??-300))/F.step2);const hn=F._next[j]?F._next[j][1]:0;if(hn>h*0.55)continue;
      const top=yg-h*s;whitewater(c,t,x+(hash(x+r)-0.5)*10*s,top+5*s,(14+hash(x*1.3+r)*14)*s,Math.floor(x+r*3),0.95);
      const ph=(t*1.7+hash(x*0.7+r))%1;c.strokeStyle=LQ.hi+(0.35*(1-ph))+')';c.lineWidth=(3+hash(x)*5)*s;seg(c,x,top+12*s+ph*30*s,x+(hash(x*2)-0.5)*8*s,top+h*s*(0.4+0.5*hash(x*3+r)));
      if(hash(x*0.9+r)>0.8)spray(c,t,x,top,4,60*s,120*s,hash(x)>0.5?1:-1,Math.floor(x));}}
    // ink edge on the nearest rows only, so the volume reads as one body
    if(F.ink&&r>=(F.inkFrom??30)){c.strokeStyle=K2;c.lineWidth=2.5;c.beginPath();for(const [x,h] of S)c.lineTo(x,yg-h*s);c.stroke();}}}
// sideways surge (tsunami-like bore) profile. o:{xF(t), toe, faceW, Hf, Hd, L, skew}
function boreH(o){return (x,yg,t)=>{const xF=o.xF(t)+(yg-o.GY)*(o.skew??0.05)+Math.sin(yg*0.013+t*1.7)*10;const dx=(o.dir??1)*(xF-x);const toe=o.toe??170,fw=o.faceW??110,pl=o.plateau??90;
  if(dx<-toe)return 0;if(dx<0)return (o.film??22)*Math.pow(1+dx/toe,0.7)+Math.sin(x*0.05+t*12)*1.5;
  let h=dx<fw?o.Hf*Math.pow(dx/fw,0.5):dx<fw+pl?o.Hf:o.Hd+(o.Hf-o.Hd)*Math.exp(-(dx-fw-pl)/(o.L??320));
  const tb=Math.min(1,dx/260);h+=tb*(Math.sin(x*0.021+t*6+yg*0.03)*o.Hf*0.018+Math.sin(x*0.009-t*3.6+yg*0.011)*o.Hf*0.025);return h;};}
// water climbing up the far wall where the surge slams into the houses, then falling back as a curtain
function wallRunup(c,t,F,GY){const o=F.runup,s=sAtY(GY,GY);c.save();for(let x=F.x0??-300;x<=(F.x1??1400);x+=14){const dx=(o.dir??1)*(o.xF(t)-x);if(dx<0||dx>900)continue;
  const up=Math.exp(-Math.pow((dx-160)/170,2)),hh=(o.Hd*0.68+o.Hf*0.75*up)*s;const ph=hash(x*0.37);c.globalAlpha=0.75+0.2*up;c.fillStyle=up>0.3?LQ.thin:LQ.mid;c.fillRect(x,GY-hh,15,hh);
  if(up>0.25){whitewater(c,t,x,GY-hh+4,(10+ph*14)*s*1.4,Math.floor(x),0.9);if(ph>0.6){const fall=((t*1.5+ph)%1);c.fillStyle=`rgba(232,170,80,${0.8*(1-fall)})`;c.beginPath();c.arc(x+5,GY-hh+fall*hh*0.8,4+ph*5,0,TAU);c.fill();}}}
  c.globalAlpha=1;c.restore();}
// ---------------- actors ----------------
// a person running ahead of the surge, then knocked down, swept up and carried; head bobbing, arms reaching, dunks under and claws back
function sweptPerson(F,kind,x0,yg,t,o={}){const GY=F.GY,s=sAtY(GY,yg)*(o.sc||1),vk=F.vk??1,vr=o.vr??260,t0=o.t0??0,dir=o.dir??1;
  // find the moment the front's toe reaches them
  let ti=null;for(let tt=t0;tt<=t;tt+=1/30){const xr=x0+dir*vr*(tt-t0);if(F.H(xr,yg,tt)>45){ti=tt;break;}}
  return {y:yg,draw:()=>{const c=F.c;if(ti===null){const x=x0+dir*vr*(t-t0);if(vr===0){BW(c,kind,x,yg,s,t,{f:-dir,eyes:'shock',brow:'up',mouth:'scream',seed:o.seed||0,lean:0.1*dir});return;}BW(c,kind,x,yg,s,t,{view:'q3',run:1,ph:t*13+(o.seed||0),f:dir,eyes:'wide',brow:'worried',mouth:'scream',seed:o.seed||0,look:[-dir,0]});
      if(F.H(x,yg,t)>0.5)legWake(c,t,x,yg-F.H(x,yg,t)*s*vk,s,dir,o.seed||0);return;}
    const k=t-ti,xi=x0+dir*vr*(ti-t0),vf=o.vf??340;const x=xi+dir*(vf*(1-Math.exp(-k*2.2))/2.2+vf*0.35*k);
    const hS=F.H(x,yg,t)*s*vk,surf=yg-hS;const fallK=clamp(k/0.35);const sd=o.seed||0;
    const dunk=Math.max(0,Math.sin(k*2.1+sd*1.7))**8;const bob=Math.sin(t*4.3+sd)*10*s;
    // upright → knocked backwards (feet swept downstream) → floating on the back, half under
    const ang=-dir*(fallK*1.05+Math.sin(t*2.7+sd)*0.18*fallK);
    const feet=Math.min(yg,surf+lerp(0,215,eo(fallK))*s+bob+dunk*190*s);const hip=feet-116*s;
    c.save();c.translate(x,hip);c.rotate(ang);c.translate(-x,-hip);
    const r=BW(c,kind,x,feet,s,t,{f:dir,eyes:dunk>0.4?'squeeze':(k<0.5?'shock':'wide'),brow:'worried',mouth:dunk>0.4?'gulp':'scream',seed:sd,hf:[40*dir+Math.sin(t*8+sd)*30,-165+Math.cos(t*7)*25],hb:[-50*dir+Math.cos(t*9+sd)*25,-110+Math.sin(t*6+sd)*30]});
    c.restore();
    // impact burst at the legs, then a churning foam collar where the body breaks the surface, spray from thrashing arms
    if(k<0.5)spray(c,t,x,yg-40*s,16,260*s,300*s,dir,sd+2,1-k*2);
    whitewater(c,t,x-dir*10*s,surf+4*s,26*s,sd,0.95);whitewater(c,t,x+dir*40*s,surf+6*s,18*s,sd+3,0.9);if(Math.sin(t*8+sd)>0.3)spray(c,t,x+20*s,surf-60*s,6,80*s,90*s,dir,sd+5,0.8);
    if(dunk>0.5)for(let i=0;i<5;i++){const ph=(t*2+i/5)%1;c.fillStyle=`rgba(246,236,210,${0.9*(1-ph)})`;c.beginPath();c.arc(x+(hash(i+sd)-0.5)*40*s,surf-ph*30*s,(3+i)*s,0,TAU);c.fill();}}};}
// floating barrel / timber carried on the flood (only behind the front, riding the surface)
function floater(F,type,x0,yg,t,o={}){const GY=F.GY,s=sAtY(GY,yg);return {y:yg,draw:()=>{const c=F.c,x=x0+(o.v??300)*t;const h=F.H(x,yg,t);if(h<60)return;const y=yg-h*s*(F.vk??1)+(o.sink??6)*s;
  c.save();c.translate(x,y);c.rotate(Math.sin(t*2+x0)*0.25+(o.rot||0)+t*(o.spin||0));if(type==='barrel'){c.rotate(Math.PI/2);barrel(c,0,48*s,0.8*s);}else stave(c,0,0,1.1*s,0);c.restore();
  whitewater(c,t,x,y+10*s,16*s,Math.floor(x0),0.8);}};}
// ---------------- leaks: jets through gaps, sheets over sills, cascades down stairs ----------------
// pressurised jet out of an opening at (x,y), initial velocity (vx,vy) px/s, gravity, thickness w; breaks into drops at the end
function jet(c,t,x,y,vx,vy,w,o={}){const G=o.g??2200,T=o.T??0.55,n=26;c.save();c.lineCap='round';const P=[];for(let i=0;i<=n;i++){const u=i/n*T;P.push([x+vx*u+Math.sin(t*25+i)*w*0.05,y+vy*u+0.5*G*u*u]);}
  const body=(k)=>{c.beginPath();for(let i=0;i<=n*k;i++)c.lineTo(P[i][0],P[i][1]);};
  c.strokeStyle=K2;c.lineWidth=w+5;body(0.78);c.stroke();c.strokeStyle=LQ.mid;c.lineWidth=w;body(0.78);c.stroke();c.strokeStyle=LQ.hi+'0.6)';c.lineWidth=w*0.3;body(0.7);c.stroke();
  for(let i=0;i<14;i++){const ph=(t*3+hash(i*2.2+(o.sd||0)))%1,j=Math.floor(lerp(n*0.6,n,ph));const p=P[Math.min(n,j)];c.fillStyle=i%2?LQ.mid:'rgba(246,236,210,0.9)';c.beginPath();c.arc(p[0]+(hash(i)-0.5)*w*1.6,p[1]+(hash(i*3)-0.5)*w,w*(0.15+0.25*hash(i*5)),0,TAU);c.fill();}
  const e=P[n];if(o.splash!==false){whitewater(c,t,e[0],e[1],w*1.1,o.sd||0);spray(c,t,e[0],e[1],8,w*3,w*3,Math.sign(vx)||1,o.sd||0);}c.restore();return e;}
// sheet of beer running down a flight of steps (each step edge throws a small fall), steps = [[x0,x1,y],...] top→bottom
function cascade(c,t,steps,k,o={}){c.save();for(let i=0;i<steps.length;i++){const [a,b,y]=steps[i];const f=clamp(k*steps.length-i);if(f<=0)break;const nx=steps[i+1];const yn=nx?nx[2]:y+40;
  c.globalAlpha=0.9;c.fillStyle=LQ.mid;c.fillRect(a,y-8,(b-a)*f,10);// thin sheet on the tread
  if(f>=1){const g=c.createLinearGradient(0,y,0,yn);g.addColorStop(0,LQ.thin);g.addColorStop(1,LQ.mid);c.fillStyle=g;c.beginPath();c.moveTo(b,y-8);c.quadraticCurveTo(b+16,y,b+12,yn);c.lineTo(b-2,yn);c.lineTo(b-2,y);c.closePath();c.fill();
    whitewater(c,t,b+8,yn-4,12,i,0.9);for(let d=0;d<3;d++){const ph=(t*2.5+d/3+i*0.3)%1;c.fillStyle=`rgba(232,170,80,${0.8*(1-ph)})`;c.beginPath();c.arc(b+14+ph*20,y+ph*(yn-y),3,0,TAU);c.fill();}}}
  c.globalAlpha=1;c.restore();}
// beer forced under a door: a fan-shaped sheet spreading across the floor
function seep(c,t,x,y,w,k,dir=1){if(k<=0)return;c.save();const L=k*420;const g=c.createRadialGradient(x,y,0,x,y,L);g.addColorStop(0,'rgba(200,126,34,0.9)');g.addColorStop(1,'rgba(200,126,34,0.15)');c.fillStyle=g;c.beginPath();c.moveTo(x,y-w/2);
  for(let i=0;i<=16;i++){const a=-0.9+i/16*1.8;c.lineTo(x+dir*Math.cos(a)*L*(0.8+0.2*Math.sin(i*2+t*4)),y+Math.sin(a)*L*0.32);}c.lineTo(x,y+w/2);c.closePath();c.fill();for(let i=0;i<6;i++){const ph=(t*1.2+i/6)%1;c.strokeStyle=`rgba(255,236,170,${0.4*(1-ph)})`;c.lineWidth=2;c.beginPath();c.ellipse(x,y,ph*L*0.9,ph*L*0.3,0,-0.9,0.9);c.stroke();}c.restore();}
