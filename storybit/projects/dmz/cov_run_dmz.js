const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files','--disable-web-security']});const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log(e.message));
await p.goto('file://'+__dirname+'/index.html');await p.waitForFunction('window.READY===true');await p.addScriptTag({path:'cov_dmz.js'});
await p.evaluate(()=>{window.NOCAP=1;});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>renderFrame(0.4));
const d=await p.evaluate(()=>grab(0.95));fs.writeFileSync('out/thumbnail.jpg',Buffer.from(d.split(',')[1],'base64'));await b.close();})();
