#!/bin/bash
cd "$(dirname "$0")";N=${N:-$(python3 -c "import re;s=open('data.js').read();print(int(float(re.search(r'END=([0-9.]+)',s).group(1))*30)+1)")}
for ((s=0;s<N;s+=250)); do e=$((s+250)); [ $e -gt $N ] && e=$N; f=ch_$(printf %05d $s)
  [ -f $f.ok ] && continue; mkdir lk_$s 2>/dev/null || continue
  node render.js $s $e $f.mp4 > $f.log 2>&1 && touch $f.ok || rmdir lk_$s
done; echo W$1 done
