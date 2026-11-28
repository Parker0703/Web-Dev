const {chromium}=require('playwright');const {spawn}=require('child_process');
const [a,b,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
(async()=>{const br=await chromium.launch({args:['--allow-file-access-from-files','--disable-web-security']});const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/'+(process.env.PAGE||'index.html')+'');await p.waitForFunction('window.READY===true');await p.evaluate(()=>document.fonts.ready);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',out]);
let n=0;
for(let i=a;i<b;i++){await p.evaluate(t=>renderFrame(t),i/30);const d=await p.evaluate(()=>grab(0.95));
 const buf=Buffer.from(d.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));n++;
 if(n%150===0)console.log(out,i);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('done',out,n);await br.close();})();
