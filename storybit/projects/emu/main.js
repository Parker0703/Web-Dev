const big=mk(W*SS,H*SS);const g=big.getContext('2d');
const outC=document.getElementById('out');const out=outC.getContext('2d');
initSprites();
function shotAt(t){let k=SHOTS[0];for(const s of SHOTS)if(t>=s[0])k=s;return k;}
function renderFrame(t){
  FX={shake:0,flash:0,flashCol:'#fff',speed:0,speedDir:0};
  for(const im of IMPACTS){const q=t-im[0];if(q>=0&&q<Math.max(im[2],0.3)){if(im[2]>0)FX.shake=Math.max(FX.shake,im[1]*(1-q/im[2]));if(im[3]){const fq=q/0.18;if(fq<1)FX.flash=Math.max(FX.flash,(im[4]||0.4)*(1-fq)),FX.flashCol=im[3];}}}
  const [st,name]=shotAt(t);
  // cut punch: brief white pop on every shot change
  const sinceCut=t-st;
  g.setTransform(SS,0,0,SS,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';
  g.fillStyle='#000';g.fillRect(0,0,W,H);
  g.save();
  // handheld sway + shake (overscan to avoid black edges)
  const sx=nz(t*0.6,1)*7+ (FX.shake?(hash(Math.floor(t*60))-.5)*FX.shake*2:0);
  const sy=nz(t*0.5,4)*6+ (FX.shake?(hash(Math.floor(t*60)+.3)-.5)*FX.shake*2:0);
  const ov=1.04+Math.min(FX.shake,25)*0.0025;
  g.translate(W/2+sx,H/2+sy);g.rotate(nz(t*0.4,7)*0.004);g.scale(ov,ov);g.translate(-W/2,-H/2);
  SH[name](g,t);
  g.restore();
  // capture speed set inside shot (shots set FX.speed)
  speedLines(g,t,FX.speed,FX.speedDir);
  if(sinceCut<0.12&&st>0){g.fillStyle=`rgba(255,255,255,${(1-sinceCut/0.12)*0.18})`;g.fillRect(0,0,W,H);}
  grade(g,t,window.GR||{});
  if(FX.flash>0){g.save();g.globalCompositeOperation='screen';g.globalAlpha=FX.flash;g.fillStyle=FX.flashCol;g.fillRect(0,0,W,H);g.restore();}
  // caption backing band for legibility

  if(!window.NOCAP){timer(g,t);captions(g,t);}
  out.drawImage(big,0,0,outC.width,outC.height);
}
window.renderFrame=renderFrame;
window.grab=(q)=>outC.toDataURL('image/jpeg',q||0.93);
window.READY=true;
