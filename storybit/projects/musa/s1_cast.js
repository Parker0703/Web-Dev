// ===== Style 1 cast: route every fig2 call to the style-1 stick figure =====
Object.assign(COL,{garbo:'#6a5038',garboOld:'#cfc3a8',german:'#56604f',intel:'#3e3a32',intelnh:'#3e3a32',intel2:'#5c5a42',gspy:'#33333a'});
(0,eval)('fig='+fig.toString().replace("const long=K==='bobby'||K==='chief';","const long=K==='bobby'||K==='chief'||K==='german'||K==='intel2';"));
const _hatS1=hat;
hat=function(c,K,s,f,R,o){
  const brimHat=(col,band)=>{c.strokeStyle='#0b0b0d';c.lineWidth=4*s;c.fillStyle=col;c.beginPath();c.ellipse(0,-R*0.72,R+14*s,7*s,0,0,TAU);c.fill();c.stroke();c.beginPath();c.moveTo(-R*0.78,-R*0.74);c.quadraticCurveTo(-R*0.8,-R*1.55,0,-R*1.45);c.quadraticCurveTo(R*0.8,-R*1.55,R*0.78,-R*0.74);c.closePath();c.fill();c.stroke();c.fillStyle=band;c.fillRect(-R*0.78,-R*0.95,R*1.56,6*s);};
  const cap=(top,band)=>{c.strokeStyle='#0b0b0d';c.lineWidth=4*s;c.fillStyle=top;c.beginPath();c.ellipse(0,-R*0.95,R+10*s,R*0.5,0,Math.PI,TAU);c.fill();c.stroke();c.fillStyle=band;c.fillRect(-R-2*s,-R*0.95,2*R+4*s,9*s);c.strokeRect(-R-2*s,-R*0.95,2*R+4*s,9*s);c.fillStyle='#0b0b0d';c.beginPath();c.ellipse(f*12*s,-R*0.6,R*0.8,6*s,0,0,TAU);c.fill();c.fillStyle='#d8c070';c.beginPath();c.arc(f*2*s,-R*1.12,5*s,0,TAU);c.fill();};
  if(K==='garbo')return brimHat('#2e241c','#6a2a20');
  if(K==='garboOld')return brimHat('#e8dcb8','#3a2a1a');
  if(K==='gspy')return brimHat('#1e1e24','#0b0b0d');
  if(K==='intel')return brimHat('#2a2620','#141210');
  if(K==='german')return cap('#56604f','#2a2e26');
  if(K==='intel2')return cap('#6a6448','#3a2a1a');
  return _hatS1(c,K,s,f,R,o);
};
const _figS1=fig;
fig=function(c,o){const r=_figS1(c,o);
  if(o.kind==='garbo'||o.kind==='garboOld'){} return r;};
const EYE={sly:'half',shock:'wide',happy:'squeeze',closed:'half',side:'open'},BROW={sly:'flat'};
fig2=function(c,o){const q={...o};
  if(q.eyes)q.eyes=EYE[q.eyes]||q.eyes;if(q.brow)q.brow=BROW[q.brow]||q.brow;
  if(q.walk&&!q.run){q.run=0.4;}delete q.walk;
  if(q.ghost)q.ghost=q.ghost;
  return fig(c,q);};
