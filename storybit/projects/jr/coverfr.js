const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/index.html');await p.waitForFunction('window.READY===true');await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{window.NOCAP=true;renderFrame(4.12);});const d=await p.evaluate(()=>grab(0.97));fs.writeFileSync('cover_src.jpg',Buffer.from(d.split(',')[1],'base64'));
const q=await b.newPage({viewport:{width:1080,height:1920}});
await q.goto('file://'+__dirname+'/cover.html');await q.waitForFunction('window.DONE===true');
await q.screenshot({path:'cover_raw.png',clip:{x:0,y:0,width:1080,height:1920}});await b.close();})();
