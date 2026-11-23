#!/bin/bash
# voice + music + sfx → mix.wav (no ambience bed). END = voice length + ~1s
END=$(python3 -c "import re;s=open('data.js').read();print(re.search(r'END=([0-9.]+)',s).group(1))")
ffmpeg -v error -y -i voice.mp3 -i music.wav -i sfx.wav -filter_complex "[0:a]aresample=44100,asplit=2[v][vk];[1:a][vk]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[m];[v][m][2:a]amix=inputs=3:normalize=0:weights='1 0.36 0.34',afade=t=out:st=$(python3 -c "print($END-1.4)"):d=1.3,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.5:LRA=11[o]" -map "[o]" -t $END -ar 44100 mix.wav
