// ---------- HUD ----------
function txt(c,s,x,y,size,col='#fff',o={}){
  c.font=`${o.w||900} ${size}px ${o.font||'"Inter Display"'}`;c.textAlign=o.al||'center';c.textBaseline='middle';
  if(o.ls)c.letterSpacing=o.ls+'px';
  if(o.stroke!==false){c.lineJoin='round';c.strokeStyle=o.sc||'#060606';c.lineWidth=o.sw||size*0.16;c.strokeText(s,x,y);}
  c.fillStyle=col;c.fillText(s,x,y);c.letterSpacing='0px';
}
// slam-in card: CASE FILE style label
function card(c,t0,t,title,sub,y=1600,o={}){
  const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.25)return;
  const out=t>end?eo((t-end)/0.25):0;
  const k=spring(p*1.4);const x=W/2+(1-k)*-700+out*900;
  c.save();c.globalAlpha=1-out;c.translate(x,y);c.rotate(-0.02);
  const w=o.w||720,h=sub?150:110;
  c.fillStyle='rgba(8,10,12,0.88)';rr(c,-w/2,-h/2,w,h,14);c.fill();
  c.fillStyle=o.col||'#d0201f';c.fillRect(-w/2,-h/2,16,h);
  c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=3;rr(c,-w/2,-h/2,w,h,14);c.stroke();
  if(o.tag){txt(c,o.tag,-w/2+40,-h/2+26,24,o.col||'#d0201f',{al:'left',stroke:false,ls:6});}
  txt(c,title,10,sub?-8+(o.tag?10:0):0+(o.tag?12:0),o.size||64,'#fff',{ls:4});
  if(sub)txt(c,sub,10,48,30,'#c9c3b5',{stroke:false,ls:3,w:700});
  c.restore();
}
function stamp(c,t0,t,text,x,y,o={}){
  const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.2)return;const fade=t>end?1-(t-end)/0.2:1;
  const k=clamp(p/0.16);const sc=lerp(2.6,1,eo(k));
  c.save();c.globalAlpha=fade*clamp(p/0.08);c.translate(x,y);c.rotate(o.rot??-0.12);c.scale(sc,sc);
  const size=o.size||120,col=o.col||'#d0201f';
  c.font=`900 ${size}px "Inter Display"`;c.letterSpacing='8px';const w=c.measureText(text).width+60,h=size*1.25;
  c.strokeStyle=col;c.lineWidth=12;rr(c,-w/2,-h/2,w,h,16);c.stroke();c.lineWidth=4;rr(c,-w/2+14,-h/2+14,w-28,h-28,10);c.stroke();
  c.fillStyle=col;c.textAlign='center';c.textBaseline='middle';c.fillText(text,0,6);c.letterSpacing='0px';
  // ink speckle wear
  c.globalCompositeOperation='destination-out';for(let i=0;i<40;i++){c.fillStyle='rgba(0,0,0,0.6)';c.beginPath();c.arc((hash(i)-.5)*w,(hash(i*3)-.5)*h,2+hash(i*7)*6,0,TAU);c.fill();}
  c.restore();
  if(p>0.12&&p<0.6){ring(c,x,y,lerp(100,700,eo((p-0.12)/0.45)),(1-(p-0.12)/0.48)*0.6,'rgba(255,255,255,',8);dust(c,x,y+h*0.4,(p-0.12)/0.5,12,'rgba(200,190,170,',3);}
}
function warnBar(c,t0,t,text,o={}){
  const p=t-t0;if(p<0)return;const end=o.end??t0+1.6;if(t>end+0.3)return;
  const out=t>end?eo((t-end)/0.3):0;const k=eo(p/0.18);const y=o.y??420,h=110;
  c.save();c.globalAlpha=1-out;
  c.translate(0,y);c.scale(1,k*(1-out*0.6));
  c.fillStyle='rgba(120,0,0,0.85)';c.fillRect(0,-h/2,W,h);
  c.save();c.beginPath();c.rect(0,-h/2,W,16);c.rect(0,h/2-16,W,16);c.clip();
  for(let x=-60+((t*200)%60);x<W+60;x+=60){c.fillStyle='#ffcc22';c.beginPath();c.moveTo(x,-h/2);c.lineTo(x+30,-h/2);c.lineTo(x+14,h/2);c.lineTo(x-16,h/2);c.fill();}
  c.restore();
  const blink=Math.floor(p*6)%2===0?1:0.75;
  c.globalAlpha*=blink;txt(c,'⚠ '+text+' ⚠',W/2,4,62,'#fff',{ls:8});
  c.restore();
}
function pulseRing(c,t0,t,x,y,r,label,o={}){
  const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.25)return;const fade=t>end?1-(t-end)/0.25:1;
  const k=back(p/0.3),pu=1+Math.sin(p*9)*0.05;
  c.save();c.globalAlpha=fade;
  c.strokeStyle=o.col||'#ff3b30';c.lineWidth=8;c.setLineDash([26,14]);c.lineDashOffset=-p*60;c.beginPath();c.arc(x,y,r*k*pu,0,TAU);c.stroke();c.setLineDash([]);
  ring(c,x,y,r*k*pu+((p*1.4)%1)*60,(1-((p*1.4)%1))*0.5,'rgba(255,80,60,',5);
  if(label){const lx=o.lx??x,ly=o.ly??(y-r-60);c.strokeStyle=o.col||'#ff3b30';c.lineWidth=5;seg(c,x,y-r*k,lx,ly+30);
    c.fillStyle=o.col||'#ff3b30';c.font='900 44px "Inter Display"';c.letterSpacing='5px';const w=c.measureText(label).width+44;rr(c,lx-w/2,ly-34,w,64,12);c.fill();c.letterSpacing='0px';
    txt(c,label,lx,ly,44,'#fff',{stroke:false,ls:5});}
  c.restore();
}
function bigQ(c,x,y,sc,t,a=1,col='#e3241b'){
  if(sc<=0.01||a<=0)return;
  c.save();c.globalAlpha=a;c.translate(x,y);c.scale(sc,sc);c.rotate(Math.sin(t*3)*0.05);
  c.font='900 520px "Inter Display"';c.textAlign='center';c.textBaseline='middle';
  c.lineJoin='round';c.strokeStyle='#050505';c.lineWidth=46;c.strokeText('?',0,0);
  const g=c.createLinearGradient(0,-260,0,260);g.addColorStop(0,'#ff4a3a');g.addColorStop(1,'#8a0a0a');c.fillStyle=g;c.fillText('?',0,0);
  c.fillStyle='rgba(255,255,255,0.25)';c.fillText('?',-8,-10);c.fillStyle=g;c.fillText('?',4,4);
  c.restore();
}
function counter(c,t0,t,val,label,x,y,o={}){
  if(t<t0)return;const end=o.end??99;if(t>end+0.2)return;const fade=t>end?1-(t-end)/0.2:1;
  const k=back((t-t0)/0.3);
  c.save();c.globalAlpha=fade;c.translate(x,y);c.scale(k,k);
  c.fillStyle='rgba(8,10,14,0.9)';rr(c,-300,-95,600,190,22);c.fill();c.strokeStyle='#e3c04a';c.lineWidth=5;rr(c,-300,-95,600,190,22);c.stroke();
  txt(c,val,0,-18,104,'#ffd64a',{ls:4});
  txt(c,label,0,58,36,'#fff',{stroke:false,ls:8,w:800});
  c.restore();
}
function bubble(c,t0,t,x,y,r,label,draw,o={}){
  const p=t-t0;if(p<0)return;const end=o.end??99;if(t>end+0.25)return;const fade=t>end?1-(t-end)/0.25:1;
  const k=back(p/0.35);
  c.save();c.globalAlpha=fade;
  if(o.tail){c.fillStyle='#f3efe4';c.strokeStyle='#0b0b0d';c.lineWidth=8;c.beginPath();c.moveTo(o.tail[0],o.tail[1]);c.lineTo(x-40*k,y+r*0.6*k);c.lineTo(x+20*k,y+r*0.8*k);c.closePath();c.fill();c.stroke();}
  c.translate(x,y);c.scale(k,k);
  c.fillStyle='#1b1410';c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
  c.save();c.beginPath();c.arc(0,0,r,0,TAU);c.clip();draw(c,p);c.restore();
  c.strokeStyle='#f3efe4';c.lineWidth=14;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();c.strokeStyle='#0b0b0d';c.lineWidth=5;c.beginPath();c.arc(0,0,r+8,0,TAU);c.stroke();
  if(label){c.fillStyle='#d0201f';c.font='900 38px "Inter Display"';c.letterSpacing='5px';const w=c.measureText(label).width+40;rr(c,-w/2,-r-34,w,58,12);c.fill();c.letterSpacing='0px';txt(c,label,0,-r-5,38,'#fff',{stroke:false,ls:5});}
  c.restore();
}
// ---------- timer ----------
const T_SLAM=WT(4,2),T_END=B(56);
function timer(c,t){
  if(t<T_SLAM)return;
  const p=t-T_SLAM;let pop=0;if(t>T_END)pop=clamp((t-T_END)/0.25);if(pop>=1)return;
  const rem=Math.max(0,Math.ceil(60*(1-clamp((t-T_SLAM)/(T_END-T_SLAM)))));
  const fly=eio((p-0.6)/0.35);
  const x=lerp(W/2,975,fly),y=lerp(H*0.44,128,fly),r=lerp(230,62,fly)*(p<0.25?spring(p*2.2):1)*(1+pop*0.6);
  c.save();c.globalAlpha=1-pop;
  if(p<0.6&&p>0.02)ring(c,x,y,r+p*700,(1-p/0.6)*0.6,'rgba(255,60,50,',12);
  c.fillStyle='rgba(10,6,6,0.82)';c.beginPath();c.arc(x,y,r,0,TAU);c.fill();
  c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=r*0.16;c.beginPath();c.arc(x,y,r*0.86,0,TAU);c.stroke();
  const frac=rem/60;c.strokeStyle='#ff2d22';c.lineCap='round';c.beginPath();c.arc(x,y,r*0.86,-Math.PI/2,-Math.PI/2+TAU*frac);c.stroke();c.lineCap='butt';
  txt(c,String(rem),x,y+r*0.04,r*0.78,'#fff',{sw:r*0.1});
  c.restore();
}
// ---------- captions ----------
const KEY=new Set(['1888','TERROR','VANISHED','TRACE','WHITECHAPEL','POOREST','FOG','HAND','BODIES','MURDERED','PANICS','PATROLS','THOUSAND','NOTHING','LETTER','RED','INK','MOCKING','JACK','RIPPER','MONSTER','TWIST','JOURNALIST','BOX','KIDNEY','HELL','WORST','TWICE','HOUR','EVERYWHERE','SLIPS','CHALKED','CLUE','CHIEF','WIPED','PHOTOGRAPH','NOVEMBER','STOP','GONE','FACE','ARREST','NAME','WHO','FOLLOW','NOBODY','60']);
const CAP=[];
(function buildCaps(){
  for(const l of L){
    const ws=l.w;let grp=[];let len=0;
    const flush=()=>{if(grp.length)CAP.push(grp);grp=[];len=0;};
    for(const w of ws){const s=w.x.toUpperCase();if(grp.length&&(len+s.length+1>20||grp.length>=4))flush();grp.push(w);len+=s.length+1;}
    flush();
  }
  for(let i=0;i<CAP.length;i++){const g=CAP[i];g.t0=g[0].t;const nx=i+1<CAP.length?CAP[i+1][0].t:99;g.t1=Math.min(nx,g[g.length-1].e+0.45);}
})();
function captions(c,t){
  for(const g of CAP){
    if(t<g.t0-0.02||t>=g.t1)continue;
    c.save();c.font='800 50px "Inter Display"';c.letterSpacing='7px';
    const parts=g.map(w=>w.x.toUpperCase().replace(/…/g,'…'));
    const widths=parts.map(p=>c.measureText(p).width);const sp=24;const total=widths.reduce((a,b)=>a+b,0)+sp*(parts.length-1);
    const fit=Math.min(1,720/total);let x=-total/2;const y=0;c.translate(W/2,232);c.scale(fit,fit);
    for(let i=0;i<g.length;i++){
      const w=g[i];if(t>=w.t-0.02){
        const k=clamp((t-w.t+0.02)/0.1);const sc=lerp(1.25,1,eo(k));
        const key=KEY.has(parts[i].replace(/[^A-Z0-9]/g,''));
        c.save();c.translate(x+widths[i]/2,y);c.scale(sc,sc);c.globalAlpha=clamp(k*2);
        c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
        c.strokeStyle='rgba(0,0,0,0.95)';c.lineWidth=12;c.strokeText(parts[i],0,0);
        c.fillStyle=key?'#ff3a2e':'#ffffff';c.fillText(parts[i],0,0);c.restore();
      }
      x+=widths[i]+sp;
    }
    c.restore();
  }
}
