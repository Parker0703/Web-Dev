'use strict';
// ===================== "The Tree That Almost Started a War" · shots (StoryBit C) =====================
const XD={};
KEY.clear();['1976,','TREE.','KILLED.','FACE.','AXES.','DEAD.','FURIOUS.','HISTORY.','CHAINSAWS.','HELICOPTERS','GUAM.','BUNYAN.','SHOT.','GONE.','REGRET.','TREE.'].forEach(k=>KEY.add(k.replace(/[^A-Z0-9]/g,'')));
const TREE=[0,0,0];
function treeAt(c,t,o={}){const b=pp(TREE),b1=pp([0,1,0]);poplar(c,b,b.y-b1.y,t,o);return {b,u:b.y-b1.y};}
const LTi=i=>L[i].a;
// ---- look test 1 · "where North and South Korean guards stand face to face" ----
XD.face=(c,t,u,d)=>{camAt(c,'jsa_face',[6,1.5,0],1.0+u*0.01,{oy:-40});
  cast(c,[['rok',[6.2,0,0.85],F('angry','angry','grit',{seed:3,f:-1,view:'3q'})],['kpa',[6.0,0,-0.85],F('angry','angry','flat',{seed:2,f:1,view:'3q'})]]);
  c.restore();tagC(c,540,420,'FACE TO FACE',clamp(u/0.3));lens(c,t);};
// ---- look test 2 · August 18th: two workers on the truck bed chop the low limb; Captain Bonifas watches; a KPA officer arrives pointing ----
XD.crew=(c,t,u,d)=>{camAt(c,'ts_crew',[-2.2,2.8,0],1.0,{oy:-30});const T0=treeAt(c,t,{trim:clamp(u/3)});
  solid(c,m35Parts({open:1}),{p:[-4.2,0,0.6],yaw:0,cy:1.2},LT_DAY);
  const L1=[-3.6,4.0,0.1];for(const [x,sd] of [[-5.3,4],[-3.9,6]]){const pos=[x,1.38,0.8];const rc=reach(pos,L1);const sw=Math.sin(t*6+sd)*0.35;const r=who(c,'ksc',pos,F('focus','angry','grit',{seed:sd,f:1,hf:[rc[0],rc[1]+sw*20],hb:[-10,94]}));if(r)axe(c,r.hf.x,r.hf.y,0.75*r.s,-0.2+sw);}
  who(c,'bonifas',[1.4,0,3.8],F('open','flat','flat',{seed:7,f:-1}));
  who(c,'kpa',[5.6,0,2.4],F('angry','angry','flat',{seed:9,f:-1}));who(c,'kpaoff',[4.0,0,4.4],F('angry','angry','grit',{seed:8,f:-1,hf:[-120,-50]}));
  c.restore();tagC(c,540,420,'AUGUST 18, 1976',clamp(u/0.3));lens(c,t);};
// ---- look test 3 · Operation Paul Bunyan: chainsaws at the trunk, helicopters overhead, convoy, ROK special forces ----
XD.op=(c,t,u,d)=>{camAt(c,'ts_base',[0,1.6,0],1.0,{oy:-330});const T0=treeAt(c,t,{cut:clamp(u/3)});
  solid(c,m35Parts(),{p:[8,0,-2],yaw:0.3,cy:1.2},LT_DAY);solid(c,m35Parts(),{p:[-7,0,-3],yaw:-0.3,cy:1.2},LT_DAY);
  for(const [x,f,sd] of [[-1.25,1,3],[1.25,-1,5]]){const pos=[x,0,0.6];const rc=reach(pos,[x*0.55,1.0,0.3]);const r=who(c,'eng',pos,F('focus','angry','grit',{seed:sd,f,crouch:14,hf:[rc[0],rc[1]],hb:[rc[0]-f*26,rc[1]+6]}));
    if(r){c.save();c.translate(r.hf.x,r.hf.y);if(f<0)c.scale(-1,1);chainsaw(c,0,0,0.5*r.s,0.06,t);c.restore();sawdust(c,t,T0.b.x,T0.b.y-1.0*T0.u,r.s,-f);}}
  cast(c,[['roksf',[3.6,0,3.4],F('angry','angry','grit',{seed:11})],['roksf',[-3.4,0,3.0],F('angry','angry','grit',{seed:12})],['roksf',[4.6,0,1.6],F('angry','angry','grit',{seed:13})],['kpa',[-7,0,-6],F('wide','up','o',{seed:14})],['kpa2',[-8.6,0,-4.4],F('wide','up','o',{seed:15})]]);
  c.restore();
  huey(c,lerp(-200,300,(u*0.15)%1)+100,360,0.45,t,1);huey(c,820,520,0.32,t+0.3,-1);cobra(c,640,300,0.3,t,-1);cobra(c,180,560,0.24,t+0.5,1);
  tagC(c,540,420,'OPERATION PAUL BUNYAN',clamp(u/0.3));lens(c,t);};
SHOTS.length=0;SHOTS.push([0,(c,t)=>XD.face(c,t,t,3)],[30,(c,t)=>XD.crew(c,t,t-30,4)],[60,(c,t)=>XD.op(c,t,t-60,4)]);
