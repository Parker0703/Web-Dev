T=3;const t=3;window.SS=1;
camAt(c,'lb_desk',[0,0.9,-1.15],1.15,{oy:-300});deskBook(c,t,{glow:0.9});candles(c,t,1.6);libBeam(c,t);c.restore();
// the virus rising out of the pages
lightPool(c,540,1180,620,'120,255,140',0.45);virusP(c,560,1080,150,t,{rot:0.35});for(const [x,y,r,rt] of [[300,1250,46,1],[820,1290,38,2],[400,960,30,3],[760,900,26,4]])virusP(c,x,y,r,t,{rot:rt});
c.save();c.shadowColor='rgba(0,0,0,0.75)';c.shadowBlur=36;c.shadowOffsetY=10;
txt(c,'A VIRUS WAS',540,170,118,'#ffffff',{sw:26,ls:2});txt(c,'HIDING IN',540,320,150,'#ff3a2e',{sw:30,ls:3});txt(c,'THIS BOOK',540,470,118,'#ffd060',{sw:26,ls:2});
c.restore();vign(c,0.4);
