const PM=JSON.parse(require('fs').readFileSync('plates/meta.json'));
global.P=function(id,p){const m=PM[id].vp,[x,y,z]=p;const w=m[3]*x+m[7]*y+m[11]*z+m[15];const Q=(x,y,z)=>{const w=m[3]*x+m[7]*y+m[11]*z+m[15];return [((m[0]*x+m[4]*y+m[8]*z+m[12])/w*0.5+0.5)*1080,(1-((m[1]*x+m[5]*y+m[9]*z+m[13])/w*0.5+0.5))*1920];};const a=Q(x,y,z),b=Q(x,y+1.83,z);return `${p} -> x${Math.round(a[0])} feet${Math.round(a[1])} head${Math.round(b[1])} w${w.toFixed(1)}`;};
const T=process.argv[2];for(const s of process.argv.slice(3)){console.log(T,P(T,s.split(',').map(Number)));}
