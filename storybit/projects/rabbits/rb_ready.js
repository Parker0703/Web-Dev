window.READY=false;Promise.all([...Object.keys(RMETA).map(n=>new Promise(r=>{const im=new Image();im.onload=()=>{RIMG[n]=im;r();};im.onerror=r;im.src=RDATA[n];})),
  ...Object.keys(PMETA).map(n=>PIMG[n]?1:new Promise(r=>{const im=new Image();im.onload=()=>{PIMG[n]=im;r();};im.onerror=r;im.src=PDATA[n];}))]).then(()=>{window.READY=true;});
