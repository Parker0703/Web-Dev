SHOTS.push([300,(c,t)=>{cam(c,'br_wide',{z:1.0});c.restore();c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(0,0,W,H);L2=LTAB;CUR={t:T};
 const P=[['rest',{}],['ribs',{hf:[-14,50],hb:[14,50]}],['armpit',{hf:[-14,44],hb:[10,-90]}],['wave',{hf:[30,-80]}],['point',{hf:[60,-20]}],['bench',{hf:[-20,70],hb:[20,70],crouch:30}]];
 P.forEach(([n,o],i)=>{const x=200+(i%3)*340,y=880+Math.floor(i/3)*900;fig2(c,{kind:'hero',x,y,s:2.3,t:T,f:1,view:'front',eyes:'dot',mouth:'smile',...o});txt(c,n,x,y+60,40,'#fff',{sw:8});});}]);
