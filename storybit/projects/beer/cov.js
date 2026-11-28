const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/index.html');await p.waitForFunction('window.READY===true');await p.evaluate(()=>document.fonts.ready);
await p.addScriptTag({path:__dirname+'/cov_scene.js'});
const d=await p.evaluate(()=>{try{coverScene();}catch(e){return 'ERR '+e.message;}return grab(0.96);});
if(d.startsWith('ERR'))console.log(d);else fs.writeFileSync('cov_raw.jpg',Buffer.from(d.split(',')[1],'base64'));console.log(errs.join('\n'));await b.close();})();
