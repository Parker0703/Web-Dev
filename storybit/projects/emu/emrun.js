const {chromium}=require('playwright');const fs=require('fs');
const VW={gq3:[0.42,0.18,0.89],side:[0,0.15,1],q3:[0.62,0.16,0.76],front:[1,0.12,0.03],back:[-0.8,0.18,0.6]};const V={};
for(const col of ['a','b'])for(const vw of ['side','q3','front']){V[`em_${col}_stand_${vw}`]={b:'emu',col,pose:'stand',vw};V[`em_${col}_peck_${vw}`]={b:'emu',col,pose:'peck',vw};for(let f=0;f<4;f++)V[`em_${col}_run${f}_${vw}`]={b:'emu',col,pose:'run',fr:f,vw};}
for(const vw of ['side','q3']){for(let w=0;w<4;w++)V[`tr_${vw}_w${w}`]={b:'truck',wf:w,vw};}
for(const vw of ['side','q3'])for(const k of ['lewis','smle','tripod'])V[`gn_${k}_${vw}`]={b:'gun',kind:k,vw};
V['am_q3']={b:'ammo',vw:'q3'};
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+__dirname+'/em_props.html');await p.waitForFunction('window.READY===true');fs.mkdirSync('rprops',{recursive:true});
const ids=process.argv.slice(2).length?Object.keys(V).filter(k=>process.argv.slice(2).some(a=>k.includes(a))):Object.keys(V);
for(const id of ids){const v=V[id];const e=VW[v.b==='gun'&&v.vw==='q3'?'gq3':v.vw],l=Math.hypot(...e);const cc=v.b==='emu'?{c:[0.25,0.95,0],r:1.25}:v.b==='ammo'?{c:[0,0.16,0],r:0.42}:v.b==='gun'?(v.kind==='tripod'?{c:[0,-0.4,0],r:0.6}:{c:[0.12,0,0],r:1.0}):{c:[0,1.2,0],r:2.6};const o={...v,...cc,eye:e.map(x=>x/l),sun:[0.45,0.85,0.5]};
 try{await p.evaluate(([b,o])=>renderProp(b,o),[v.b,o]);const d=await p.evaluate(()=>grab());fs.writeFileSync(`rprops/raw_${id}.png`,Buffer.from(d.split(',')[1],'base64'));fs.writeFileSync(`rprops/cam_${id}.json`,JSON.stringify({c:o.c,r:o.r,eye:o.eye}));console.log('ok',id);}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}
await b.close();})();
