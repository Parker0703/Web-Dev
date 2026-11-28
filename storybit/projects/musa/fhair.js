'use strict';
// ===== Facial hair drawn to the anatomy of the Style-5 head =====
// Face units (s=R/126): skull circle r=126 at (hx,y); face centre x; eyes y-6 (x±44); nose base ≈ y+26; mouth y+50 (corners ≈ ±24); chin y+126.
// Anatomy rules used here:
//  - sideburns grow at the skull edge from eye level down to the ear lobe (y-30 … y+20) and never stick out past the skull
//  - the cheek line runs from the ear lobe diagonally down to the mouth corner; the cheeks above it stay bare
//  - a moustache grows from the nose base to the upper lip, a little wider than the mouth, dipping at the philtrum, strands angled out and down
//  - a beard follows the jaw; only its length hangs below the chin, never out at the sides
// Keys on K: mst:'brush'|'walrus'|'handlebar'|'pencil'|'chevron'; fb:'full'|'short'|'chops'|'goatee'; stubble:1; burns:1; fbCol, mstCol.
const _A=d=>d*Math.PI/180;
function _fhStrands(g,s,col,pts,lw=2){g.save();g.strokeStyle=col;g.lineWidth=lw*s;g.lineCap='round';for(const [x0,y0,x1,y1,bx] of pts){g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2+(bx||0)*s,(y0+y1)/2,x1,y1);g.stroke();}g.restore();}
// region of a beard. o: drop (length under the chin), cheek (cheek line height shift), lip (clear area below the mouth), top (sideburn top)
function _beardPath(g,x,hx,y,s,o){const R=126*s,E=a=>[hx+Math.cos(_A(a))*R,y+Math.sin(_A(a))*R];const top=o.top??-10,ch=o.cheek||0,drop=o.drop||0,lip=o.lip||70;
  const [ax,ay]=E(top),[bx,by]=E(50),[cx2,cy2]=E(130),[dx,dy]=E(180-top);
  g.beginPath();g.moveTo(ax,ay);g.arc(hx,y,R,_A(top),_A(50));
  g.bezierCurveTo(bx-10*s,by+(18+drop*0.5)*s,x+(46+drop*0.2)*s,y+(126+drop)*s,x,y+(128+drop)*s);
  g.bezierCurveTo(x-(46+drop*0.2)*s,y+(126+drop)*s,cx2+10*s,cy2+(18+drop*0.5)*s,cx2,cy2);
  g.arc(hx,y,R,_A(130),_A(180-top));
  // inner edge: down the sideburn, the cheek line to the mouth corner, under the lower lip, back up
  g.lineTo(dx+22*s,dy+4*s);g.bezierCurveTo(hx-100*s,y+(34+ch)*s,x-62*s,y+(40+ch)*s,x-38*s,y+44*s);
  g.quadraticCurveTo(x-34*s,y+lip*s,x,y+(lip+2)*s);g.quadraticCurveTo(x+34*s,y+lip*s,x+38*s,y+44*s);
  g.bezierCurveTo(x+62*s,y+(40+ch)*s,hx+100*s,y+(34+ch)*s,ax-22*s,ay+4*s);g.closePath();}
// moustache shapes (centre x, upper lip), outward-and-down growth, philtrum notch on top
function _mstPath(g,x,y,s,type,mo){const m=y+(mo?40:42)*s;g.beginPath();
  if(type==='walrus'){g.moveTo(x,m-16*s);g.quadraticCurveTo(x+18*s,m-24*s,x+34*s,m-14*s);g.quadraticCurveTo(x+46*s,m-2*s,x+44*s,m+20*s);g.quadraticCurveTo(x+36*s,m+12*s,x+28*s,m+12*s);g.quadraticCurveTo(x+14*s,m+6*s,x,m+8*s);
    g.quadraticCurveTo(x-14*s,m+6*s,x-28*s,m+12*s);g.quadraticCurveTo(x-36*s,m+12*s,x-44*s,m+20*s);g.quadraticCurveTo(x-46*s,m-2*s,x-34*s,m-14*s);g.quadraticCurveTo(x-18*s,m-24*s,x,m-16*s);}
  else if(type==='handlebar'){g.moveTo(x,m-12*s);g.quadraticCurveTo(x+16*s,m-18*s,x+30*s,m-8*s);g.quadraticCurveTo(x+44*s,m+2*s,x+56*s,m-6*s);g.quadraticCurveTo(x+66*s,m-14*s,x+62*s,m-24*s);
    g.quadraticCurveTo(x+60*s,m-8*s,x+48*s,m+4*s);g.quadraticCurveTo(x+34*s,m+10*s,x+20*s,m+4*s);g.quadraticCurveTo(x+10*s,m+1*s,x,m+3*s);
    g.quadraticCurveTo(x-10*s,m+1*s,x-20*s,m+4*s);g.quadraticCurveTo(x-34*s,m+10*s,x-48*s,m+4*s);g.quadraticCurveTo(x-60*s,m-8*s,x-62*s,m-24*s);g.quadraticCurveTo(x-66*s,m-14*s,x-56*s,m-6*s);g.quadraticCurveTo(x-44*s,m+2*s,x-30*s,m-8*s);g.quadraticCurveTo(x-16*s,m-18*s,x,m-12*s);}
  else if(type==='pencil'){g.moveTo(x-3*s,m-6*s);g.quadraticCurveTo(x-16*s,m-8*s,x-28*s,m-1*s);g.quadraticCurveTo(x-16*s,m-2*s,x-3*s,m-1*s);g.closePath();g.moveTo(x+3*s,m-6*s);g.quadraticCurveTo(x+16*s,m-8*s,x+28*s,m-1*s);g.quadraticCurveTo(x+16*s,m-2*s,x+3*s,m-1*s);}
  else if(type==='chevron'){g.moveTo(x,m-14*s);g.quadraticCurveTo(x+22*s,m-20*s,x+34*s,m-6*s);g.lineTo(x+36*s,m+8*s);g.quadraticCurveTo(x+18*s,m+2*s,x,m+4*s);g.quadraticCurveTo(x-18*s,m+2*s,x-36*s,m+8*s);g.lineTo(x-34*s,m-6*s);g.quadraticCurveTo(x-22*s,m-20*s,x,m-14*s);}
  else{// brush: fuller, squared ends just past the mouth corners
    g.moveTo(x,m-14*s);g.quadraticCurveTo(x+20*s,m-22*s,x+32*s,m-10*s);g.quadraticCurveTo(x+38*s,m-2*s,x+34*s,m+6*s);g.quadraticCurveTo(x+16*s,m+1*s,x,m+4*s);g.quadraticCurveTo(x-16*s,m+1*s,x-34*s,m+6*s);g.quadraticCurveTo(x-38*s,m-2*s,x-32*s,m-10*s);g.quadraticCurveTo(x-20*s,m-22*s,x,m-14*s);}
  g.closePath();}
function _fhFill(g,col,s,path,shade=1){g.save();path();g.fillStyle=col;g.fill();path();g.clip();const b=g.getTransform();
  g.restore();}
{const _dfH=drawFace4;drawFace4=function(g,x,y,s,P,K){_dfH(g,x,y,s,P,K);if(!K||(!K.mst&&!K.fb&&!K.stubble&&!K.burns))return;
  const f=P.f||1,front=P.view==='front'||!P.view;const hx=x-f*(front?3.8:21.4)*s,R=126*s;const col=K.fbCol||K.hair||'#3a2418',mcol=K.mstCol||col;
  const mo=['o','yell','shout','grin','laugh','wobble','scream5','teeth','open'].includes(P.mouth);const dk=shd(col,-0.35),lt=shd(col,0.28);
  g.save();g.lineJoin='round';g.lineCap='round';
  const skull=()=>{g.beginPath();g.arc(hx,y,R,0,TAU);};
  // ---- stubble: a soft shadow over the beard zone + upper lip, feathered edge, fine sparse grain
  if(K.stubble){g.save();skull();g.clip();g.filter=`blur(${3.5*s}px)`;g.fillStyle='rgba(70,56,64,0.24)';_beardPath(g,x,hx,y,s,{top:-4,cheek:6,lip:66});g.fill();_mstPath(g,x,y,s,'chevron',mo);g.fill();g.filter='none';
    _beardPath(g,x,hx,y,s,{top:-4,cheek:6,lip:66});g.clip();g.fillStyle='rgba(50,40,46,0.45)';for(let i=0;i<190;i++){const a=hash(i*1.37)*TAU,r=Math.sqrt(hash(i*2.71))*R;g.fillRect(hx+Math.cos(a)*r,y+Math.abs(Math.sin(a))*r,1.1*s,1.8*s);}g.restore();
    g.save();_mstPath(g,x,y,s,'chevron',mo);g.clip();g.fillStyle='rgba(50,40,46,0.45)';for(let i=0;i<40;i++)g.fillRect(x+(hash(i*4.1)-0.5)*66*s,y+(30+hash(i*6.3)*16)*s,1.1*s,1.8*s);g.restore();}
  // ---- sideburns at the skull edge (inside the outline), eye level to ear lobe
  if(K.burns&&K.fb!=='full'&&K.fb!=='short'&&K.fb!=='chops'){g.save();skull();g.clip();g.fillStyle=col;for(const sd of [-1,1]){const w=(!front&&sd===f?12:18)*s;g.beginPath();g.arc(hx,y,R+4*s,sd>0?_A(-28):_A(180+28),sd>0?_A(8):_A(172),sd<0);
      const ex=hx+sd*Math.cos(_A(8))*R,ey=y+Math.sin(_A(8))*R;g.lineTo(ex-sd*w*0.8,ey-2*s);g.quadraticCurveTo(hx+sd*(R/s-w/s-4)*s,y-6*s,hx+sd*Math.cos(_A(28))*R-sd*w,y-Math.sin(_A(28))*R+4*s);g.closePath();g.fill();
      _fhStrands(g,s,dk,[0,1,2,3].map(i=>{const yy=y+(-24+i*9)*s,xx=hx+sd*(R-6*s-hash(i+sd)*w*0.6);return [xx,yy,xx-sd*2*s,yy+9*s,0];}),1.6);}g.restore();}
  // ---- full / short beard: follows the jaw, length only below the chin
  if(K.fb==='full'||K.fb==='short'){const full=K.fb==='full',o={top:full?-14:-8,cheek:full?0:6,drop:full?26:4,lip:mo?84:66};const path=()=>_beardPath(g,x,hx,y,s,o);
    g.save();path();g.fillStyle=col;g.fill();path();g.clip();
    const lg=g.createLinearGradient(0,y,0,y+(130+o.drop)*s);lg.addColorStop(0,lt);lg.addColorStop(0.5,col);lg.addColorStop(1,dk);g.globalAlpha=0.55;g.fillStyle=lg;g.fillRect(hx-R,y-R,2*R,2.4*R);g.globalAlpha=1;
    // strands: comb down the jaw and fan out from the chin
    const st=[];for(let i=0;i<(full?80:46);i++){const u=hash(i*3.3+1),v=hash(i*7.1+2);const ang=_A(-6+u*192);const rr=(0.62+v*0.42)*R;const px=hx+Math.cos(ang)*rr,py=y+Math.max(Math.sin(ang)*rr,(30+v*20)*s);const out=(px-x)/R;const L=(10+hash(i*1.9)*12)*s;st.push([px,py,px+out*5*s,py+L,out*4]);}
    _fhStrands(g,s,'rgba(0,0,0,0.28)',st,2);_fhStrands(g,s,'rgba(255,255,255,0.16)',st.filter((_,i)=>i%3===0).map(([a,b,c2,d2,e])=>[a+3*s,b,c2+3*s,d2,e]),1.6);g.restore();
    // wispy tips on the lower edge
    g.save();g.fillStyle=col;for(let i=-3;i<=3;i++){const tx=x+i*14*s,ty=y+(126+o.drop-Math.abs(i)*Math.abs(i)*2.6)*s;g.beginPath();g.moveTo(tx-7*s,ty-6*s);g.quadraticCurveTo(tx,ty+8*s,tx+7*s,ty-6*s);g.fill();}g.restore();
    g.strokeStyle=OL;g.lineWidth=3.4*s;path();g.stroke();if(!K.mst)K._autoMst=1;}
  // ---- mutton chops: sideburn widening down the cheek to the jaw corner, chin shaved, stays inside the skull outline
  if(K.fb==='chops'){g.save();skull();g.clip();for(const sd of [-1,1]){const w=!front&&sd===f?0.82:1;const P2=()=>{g.beginPath();g.arc(hx,y,R+6*s,sd>0?_A(-2):_A(182),sd>0?_A(54):_A(126),sd<0);
        const jx=hx+sd*Math.cos(_A(52))*R,jy=y+Math.sin(_A(52))*R;g.quadraticCurveTo(jx-sd*20*s,jy-4*s,x+sd*44*w*s,y+66*s);g.quadraticCurveTo(x+sd*44*w*s,y+48*s,x+sd*54*w*s,y+36*s);
        g.quadraticCurveTo(hx+sd*(R/s-30)*s,y+22*s,hx+sd*(R/s-14)*s,y-2*s);g.closePath();};
      P2();g.fillStyle=col;g.fill();g.save();P2();g.clip();const lg=g.createLinearGradient(0,y-40*s,0,y+110*s);lg.addColorStop(0,lt);lg.addColorStop(1,dk);g.globalAlpha=0.5;g.fillStyle=lg;g.fillRect(hx-R,y-R,2*R,2*R);g.globalAlpha=1;
        const st=[];for(let i=0;i<24;i++){const u=hash(i*2.3+sd),v=hash(i*5.9+sd);const yy=y+(4+u*84)*s;const xx=hx+sd*(R-(6+v*50*(0.3+u))*s);st.push([xx,yy,xx-sd*4*s,yy+12*s,-sd*2]);}_fhStrands(g,s,'rgba(0,0,0,0.3)',st,1.8);g.restore();
      g.strokeStyle=OL;g.lineWidth=3.2*s;P2();g.stroke();}g.restore();}
  // ---- goatee: chin patch under the lower lip, a little length under the chin
  if(K.fb==='goatee'){const P3=()=>{g.beginPath();g.moveTo(x-24*s,y+68*s);g.quadraticCurveTo(x,y+(mo?84:62)*s,x+24*s,y+68*s);g.quadraticCurveTo(x+28*s,y+112*s,x+6*s,y+140*s);g.quadraticCurveTo(x,y+146*s,x-6*s,y+140*s);g.quadraticCurveTo(x-28*s,y+112*s,x-24*s,y+68*s);g.closePath();};
    P3();g.fillStyle=col;g.fill();g.save();P3();g.clip();_fhStrands(g,s,'rgba(0,0,0,0.3)',[-12,-6,0,6,12].map(d=>[x+d*s,y+80*s,x+d*0.6*s,y+(126+Math.abs(d)*-0.8)*s,0]),1.8);g.restore();g.strokeStyle=OL;g.lineWidth=3*s;P3();g.stroke();}
  // ---- moustache last (sits over the beard's upper lip)
  const mt=K.mst||(K._autoMst?(K.fb==='full'?'walrus':'chevron'):null);
  if(mt){const P4=()=>_mstPath(g,x,y,s,mt,mo);P4();g.fillStyle=mcol;g.fill();g.save();P4();g.clip();const lg=g.createLinearGradient(0,y+20*s,0,y+60*s);lg.addColorStop(0,lt);lg.addColorStop(1,dk);g.globalAlpha=0.6;g.fillStyle=lg;g.fillRect(x-70*s,y+10*s,140*s,60*s);g.globalAlpha=1;
      const st=[];for(let i=1;i<=6;i++)for(const sd of [-1,1]){const xx=x+sd*i*6.5*s;st.push([xx,y+30*s,xx+sd*(3+i*0.8)*s,y+(48+i*0.6)*s,sd*1.5]);}_fhStrands(g,s,'rgba(0,0,0,0.3)',st,1.6);
      g.fillStyle='rgba(255,255,255,0.22)';g.beginPath();g.ellipse(x-16*s,y+31*s,9*s,2.6*s,-0.25,0,TAU);g.fill();g.restore();
    g.strokeStyle=OL;g.lineWidth=(mt==='pencil'?2:3)*s;P4();g.stroke();}
  delete K._autoMst;g.restore();};}
// knocked-out cartoon face: X eyes, closed mouth with the tongue poking out
{const _dfK=drawFace4;drawFace4=function(g,x,y,s,P,K){const xx=P.eyes==='xx',tg=P.mouth==='tongue';if(!xx&&!tg)return _dfK(g,x,y,s,P,K);
  _dfK(g,x,y,s,Object.assign({},P,{eyes:xx?'__none':P.eyes,mouth:tg?'__none':P.mouth}),K);g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=OL;
  if(xx){g.lineWidth=9*s;for(const sd of [-1,1]){const ex=x+sd*44*s,ey=y-6*s,r=17*s;g.beginPath();g.moveTo(ex-r,ey-r);g.lineTo(ex+r,ey+r);g.moveTo(ex+r,ey-r);g.lineTo(ex-r,ey+r);g.stroke();}}
  if(tg){const my=y+50*s;g.fillStyle='#e8606a';g.lineWidth=5*s;g.beginPath();g.moveTo(x-6*s,my);g.lineTo(x+28*s,my);g.quadraticCurveTo(x+34*s,my+44*s,x+12*s,my+46*s);g.quadraticCurveTo(x-10*s,my+44*s,x-6*s,my);g.closePath();g.fill();g.stroke();
    g.strokeStyle='rgba(150,30,40,0.7)';g.lineWidth=3*s;g.beginPath();g.moveTo(x+11*s,my+4*s);g.lineTo(x+12*s,my+28*s);g.stroke();
    g.strokeStyle=OL;g.lineWidth=7*s;g.beginPath();g.moveTo(x-26*s,my-2*s);g.quadraticCurveTo(x,my+3*s,x+28*s,my-3*s);g.stroke();}
  g.restore();};}
