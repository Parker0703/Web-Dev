const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+__dirname+'/index.html');await p.waitForFunction('window.READY===true');
for(const t of [3,9,20,33,40,45,55,60,70,78]){for(const mode of ['full','nohair','nolight']){const ms=await p.evaluate(([t,mode])=>{window.NOLIGHT=mode==='nolight';const hl=hairLayer,lh=longHair2;if(mode==='nohair'){hairLayer=()=>{};longHair2=()=>{};}const t0=performance.now();renderFrame(t);grab(0.95);const d=performance.now()-t0;hairLayer=hl;longHair2=lh;window.NOLIGHT=false;return d;},[t,mode]);process.stdout.write(t+' '+mode+' '+ms.toFixed(0)+'  ');}console.log();}
await b.close();})();
