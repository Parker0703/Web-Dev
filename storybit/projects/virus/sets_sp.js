'use strict';
LIGHT5.horror={sunDir:[-0.55,0.45,0.7],sunCol:[0.28,0.36,0.62],sky:[0.06,0.07,0.13],gnd:[0.03,0.03,0.05],fog:[0.0,0.0,0.0],fogD:0.06,fogH:0,skyTop:[0.0,0.0,0.0],skyHor:[0.0,0.0,0.0],skyBot:[0.0,0.0,0.0],cloud:0,stars:0,sunSize:3000,sunGlow:[0.4,0.5,0.8],
  post:{bloom:0.4,thr:0.85,sat:0.9,expo:0.85,lift:[0.0,0.0,0.02],gain:[0.92,0.96,1.08],vig:1.7,ink:1}};
LIGHT5.morningB={sunDir:[-0.55,0.55,0.62],sunCol:[1.3,1.1,0.9],sky:[0.5,0.52,0.6],gnd:[0.4,0.36,0.3],fog:[0.8,0.78,0.8],fogD:0.008,fogH:0,skyTop:[0.4,0.55,0.85],skyHor:[0.9,0.85,0.8],skyBot:[0.7,0.7,0.7],cloud:0.5,stars:0,sunSize:900,
  post:{bloom:0.4,thr:0.9,sat:1.05,expo:1.0,lift:[0.01,0.01,0.01],gain:[1.03,1.0,0.97],vig:1.15,ink:1}};
PL.length=0;
PL.push(
 ['hb_front','bedroom','horror',[0,2.0,2.6],[0,0.75,-1.3],50],
 ['hb_pov','bedroom','horror',[0.0,1.0,-1.35],[0.0,1.25,2.6],62],
 ['hb_top','bedroom','horror',[0,4.6,-0.5],[0,0.5,-1.0],44],
 ['hb_close','bedroom','horror',[0.0,1.35,-0.55],[0.0,0.72,-1.6],40],
 ['hb_side','bedroom','horror',[2.4,1.35,-0.6],[0,0.75,-0.8],46],
 ['hb_room','bedroom','horror',[2.5,1.95,3.4],[-0.3,0.75,-1.1],48],
 ['hb_corner','bedroom','horror',[1.3,1.45,1.5],[-3.0,1.2,-2.2],52],
 ['hb_over','bedroom','horror',[3.2,1.55,-1.05],[0,1.15,-1.05],60],
 ['hb_day','bedroom','morningB',[0,2.0,2.6],[0,0.75,-1.3],50]);
