const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files','--disable-web-security']});const p=await b.newPage({viewport:{width:1080,height:1920}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/'+(process.env.PAGE||'index.html'));await p.waitForFunction('window.READY===true').catch(()=>{});
await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{window.NOCAP=1});
const ts=process.argv.slice(2).map(Number);fs.mkdirSync('st',{recursive:true});
for(const t of ts){const t0=Date.now();try{await p.evaluate(t=>renderFrame(t),t);}catch(e){errs.push(t+': '+e.message);continue;}
 const d=await p.evaluate(()=>grab(0.95));fs.writeFileSync(`st/${t.toFixed(2)}.jpg`,Buffer.from(d.split(',')[1],'base64'));console.log(t,Date.now()-t0,'ms');}
console.log(errs.join('\n'));await b.close();})();
