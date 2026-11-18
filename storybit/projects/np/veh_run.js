const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
await p.goto('file://'+__dirname+'/veh.html');await p.waitForFunction('window.READY===true');fs.mkdirSync('veh',{recursive:true});
for(const id of process.argv.slice(2)){const ci=id.indexOf(':');const v=ci<0?id:id.slice(0,ci),opt=ci<0?null:id.slice(ci+1);const o=opt?JSON.parse(opt):{};const name=v+(o.tag?'_'+o.tag:'');
 try{await p.evaluate(([v,o])=>renderVeh(v,o),[v,o]);const d=await p.evaluate(()=>grab());fs.writeFileSync(`veh/raw_${name}.png`,Buffer.from(d.split(',')[1],'base64'));console.log('ok',name);}catch(e){console.log('FAIL',id,e.message.slice(0,300));}}
await b.close();})();
