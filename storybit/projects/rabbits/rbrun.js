const {chromium}=require('playwright');const fs=require('fs');
const VW={side:[0,0.18,1],front:[1,0.14,0.02],q3:[0.75,0.2,0.62]};
const V={};for(const col of ['white','grey','brown','spot']){
  V[`rb_${col}_sit_front`]={col,pose:'sit',vw:'front'};V[`rb_${col}_sit2_front`]={col,pose:'sit2',vw:'front'};
  V[`rb_${col}_sit_q3`]={col,pose:'sit',vw:'q3'};V[`rb_${col}_sit2_q3`]={col,pose:'sit2',vw:'q3'};V[`rb_${col}_sit_side`]={col,pose:'sit',vw:'side'};
  for(let p=0;p<4;p++){V[`rb_${col}_hop${p}_side`]={col,pose:'hop',ph:p,vw:'side'};V[`rb_${col}_hop${p}_q3`]={col,pose:'hop',ph:p,vw:'q3'};}
  V[`rb_${col}_eat_side`]={col,pose:'eat',vw:'side'};V[`rb_${col}_eat_q3`]={col,pose:'eat',vw:'q3'};}
const CV={side:[0,0.12,1],q3:[0.55,0.16,0.82]};
const COACH={};for(const vw of ['side','q3']){for(let w=0;w<4;w++)COACH[`co_${vw}_w${w}`]={b:'coach',wf:w,vw};COACH[`co_${vw}_open`]={b:'coach',open:1,vw};COACH[`co_${vw}_half`]={b:'coach',open:0.45,vw};
  COACH[`ho_${vw}_stand`]={b:'horses',pose:'stand',vw};for(let f=0;f<4;f++)COACH[`ho_${vw}_g${f}`]={b:'horses',fr:f,vw};}
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/rb_props.html');await p.waitForFunction('window.READY===true');fs.mkdirSync('rprops',{recursive:true});
if(process.argv[2]==='coach'){for(const id of Object.keys(COACH)){const v=COACH[id];const e=CV[v.vw],l=Math.hypot(...e);const cc=v.b==='coach'?{c:[0.85,1.45,0],r:2.75}:{c:[4.5,1.35,0],r:2.4};const o={...v,...cc,eye:e.map(x=>x/l),sun:[0.45,0.8,0.55]};
 try{await p.evaluate(([b,o])=>renderProp(b,o),[v.b,o]);const d=await p.evaluate(()=>grab());fs.writeFileSync(`rprops/raw_${id}.png`,Buffer.from(d.split(',')[1],'base64'));fs.writeFileSync(`rprops/cam_${id}.json`,JSON.stringify({c:o.c,r:o.r,eye:o.eye}));console.log('ok',id);}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}await b.close();return;}
const ids=process.argv.slice(2).length?Object.keys(V).filter(k=>process.argv.slice(2).some(a=>k.includes(a))):Object.keys(V);
for(const id of ids){const v=V[id];const e=VW[v.vw],l=Math.hypot(...e);const o={...v,c:[0,0.85,0],r:1.35,eye:e.map(x=>x/l),sun:[0.45,0.8,0.55]};
 try{await p.evaluate(([o])=>renderProp('rabbit',o),[o]);const d=await p.evaluate(()=>grab());fs.writeFileSync(`rprops/raw_${id}.png`,Buffer.from(d.split(',')[1],'base64'));console.log('ok',id);}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}
await b.close();})();
