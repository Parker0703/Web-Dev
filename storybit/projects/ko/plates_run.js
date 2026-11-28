const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});await p.goto('file://'+__dirname+'/plate.html');await p.waitForFunction('window.READY===true');
fs.mkdirSync('plates',{recursive:true});const only=process.argv.slice(2);const n=await p.evaluate(()=>PL.length);
let meta={};try{meta=JSON.parse(fs.readFileSync('plates/meta.json'));}catch(e){}
for(let i=0;i<n;i++){const id=await p.evaluate(i=>PL[i][0],i);if(only.length&&!only.includes(id))continue;const t0=Date.now();
 try{const m=await p.evaluate(i=>renderPlate(i),i);const d=await p.evaluate(()=>grab(0.92));fs.writeFileSync(`plates/${id}.jpg`,Buffer.from(d.split(',')[1],'base64'));meta[id]=m;console.log(id,Date.now()-t0,'ms');}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}
fs.writeFileSync('plates/meta.json',JSON.stringify(meta));fs.writeFileSync('plates/plates.js','const PM='+JSON.stringify(meta)+';');await b.close();})();
