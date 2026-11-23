T=2.2;const t=2.2;window.SS=1;
camAt(c,'ne_street',[3,2.2,-0.5],1.55,{oy:-60});molassesSheet(c,t,-60,-1,-7,7,0.9,{edge:false});wave3(c,t,-1,7.6,{debris:6});
cast(c,[['boy',[3.5,0,0.6],BF('shock','up','scream',{run:1,ph:2,f:-1,seed:1,hf:[40,-90],hb:[-40,-80]})],['girl',[6,0,-1.6],BF('wide','worried','scream',{run:1,ph:3,f:-1,seed:4})]]);c.restore();
c.save();c.shadowColor='rgba(0,0,0,0.8)';c.shadowBlur=40;c.shadowOffsetY=12;
txt(c,'A 25-FOOT',540,190,140,'#ffffff',{sw:28,ls:3});txt(c,'WAVE OF',540,345,130,'#ffffff',{sw:26,ls:3});txt(c,'MOLASSES',540,510,150,'#ff2a22',{sw:30,ls:4});c.restore();
