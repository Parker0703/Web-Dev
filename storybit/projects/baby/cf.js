const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/index.html');await p.waitForFunction('window.READY===true');await p.evaluate(()=>document.fonts.ready);
await p.evaluate(t=>{window.NOCAP=true;renderFrame(t);},+process.argv[2]);const d=await p.evaluate(()=>grab(0.95));fs.writeFileSync('cover_src.jpg',Buffer.from(d.split(',')[1],'base64'));await b.close();})();
