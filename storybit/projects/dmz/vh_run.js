const {chromium}=require('playwright');const fs=require('fs');
// usage: node vh_run.js <json list file>   entries: {id,b,az,el,r,c,...}
const L=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+__dirname+'/vh.html');await p.waitForFunction('window.READY===true');fs.mkdirSync('vh',{recursive:true});
for(const o of L){try{const r=await p.evaluate(o=>renderV(o),o);const d=await p.evaluate(()=>grab());fs.writeFileSync(`vh/raw_${o.id}.png`,Buffer.from(d.split(',')[1],'base64'));fs.writeFileSync(`vh/cam_${o.id}.json`,JSON.stringify({c:o.c||[0,0,0],r:o.r,az:o.az,el:o.el}));console.log('ok',o.id);}catch(e){console.log('FAIL',o.id,e.message.slice(0,300));}}
await b.close();})();
