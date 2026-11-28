const {chromium}=require('playwright');const fs=require('fs');
const V={
 pugio_side:{b:'pugio',c:[0.65,0,0],r:1.85,eye:[0,0.12,1]},
 pugio_3q:{b:'pugio',c:[0.65,0,0],r:1.85,eye:[0.35,0.25,0.9],yaw:0.0,roll:0.0},
 gladius_side:{b:'gladius',c:[1.6,0,0],r:2.95,eye:[0,0.12,1]},
 scroll_open:{b:'scroll',r:2.2,eye:[0,0.08,1]},
 rolled:{b:'rolled',r:1.6,eye:[0.15,0.35,1]},
 goblet:{b:'goblet',c:[0,0.95,0],r:1.0,eye:[0,0.3,1]},
 torch:{b:'torch',c:[0,-0.9,0],r:1.1,eye:[0,0.15,1]},
 sella:{b:'sella',c:[0,0.6,0],r:1.25,eye:[0.55,0.35,0.85]},
 lectus:{b:'lectus',c:[0,1.0,0],r:2.6,eye:[0.12,0.32,1]},
 crown:{b:'crown',c:[0,0.5,0],r:1.3,eye:[0,0.45,1]},
 laurel:{b:'laurel',c:[0,0,0],r:1.2,eye:[0,0.55,1]},
 carpet_roll:{b:'carpet_roll',r:1.9,eye:[0.2,0.3,1]},
 carpet_flat:{b:'carpet_flat',r:1.9,eye:[0,0.75,0.65]},
 pearl:{b:'pearl',r:1.1,eye:[0,0.2,1]},
 throne:{b:'throne',c:[0,1.6,0],r:1.3,eye:[0.3,0.25,1]},
 musket:{b:'musket',c:[1.3,0,0],r:4.1,eye:[0,0.12,1]},
 cannon:{b:'cannon',c:[-0.6,1.0,0],r:2.4,eye:[0.45,0.25,1]},
 telescope:{b:'telescope',c:[1.15,0,0],r:1.3,eye:[0.1,0.2,1]},
 barge2:{b:'barge2',c:[0,3.8,0],r:8.3,eye:[0.22,0.32,1]},
 galley:{b:'galley',c:[0,3.4,0],r:8.0,eye:[0.3,0.25,1]},
 galley_burn:{b:'galley_burn',c:[0,2.6,0],r:8.0,eye:[0.3,0.25,1]},
 barge:{b:'barge',c:[0,3.2,0],r:7.9,eye:[0,0.12,1]},
};
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
await p.goto('file://'+__dirname+'/props.html');await p.waitForFunction('window.READY===true');fs.mkdirSync('props',{recursive:true});
const ids=process.argv.slice(2).length?process.argv.slice(2):Object.keys(V);
for(const id of ids){const v=V[id];const e=v.eye,l=Math.hypot(...e);const o={...v,eye:e.map(x=>x/l)};
 try{const t0=Date.now();await p.evaluate(([b,o])=>renderProp(b,o),[v.b,o]);const d=await p.evaluate(()=>grab());fs.writeFileSync(`props/raw_${id}.png`,Buffer.from(d.split(',')[1],'base64'));console.log('ok',id,Date.now()-t0);}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}
await b.close();})();
