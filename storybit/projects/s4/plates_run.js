const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+__dirname+'/plate.html');await p.waitForFunction('window.READY===true');
const out='../s5/plates';fs.mkdirSync(out,{recursive:true});const meta=[];
for(let i=0;i<7;i++){const t0=Date.now();const m=await p.evaluate(i=>renderPlate(i),i);const d=await p.evaluate(()=>grab(0.92));fs.writeFileSync(`${out}/p${i}.jpg`,Buffer.from(d.split(',')[1],'base64'));meta.push(m);console.log(i,m.name,Date.now()-t0,'ms');}
fs.writeFileSync(`${out}/plates.js`,'const PLATES='+JSON.stringify(meta)+';');await b.close();})();
