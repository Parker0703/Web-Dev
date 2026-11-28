"""Forced alignment with pocketsphinx, phrase by phrase (phrase runs from words.json), rewrites words.json + data.js."""
import json,re,numpy as np,scipy.io.wavfile as wf
from pocketsphinx import Decoder,get_model_path
L=json.load(open('words.json'));sr,x=wf.read('voice16.wav')
mp=get_model_path()
dec=Decoder(hmm=mp+'/en-us/en-us',dict=mp+'/en-us/cmudict-en-us.dict',lm=None,loglevel='ERROR')
dec.add_word('repaving','R IY P EY V IH NG',True);dec.add_word("rockstar's",'R AA K S T AA R Z',True)
NUM={'60':'sixty','2022':'twenty twenty two','24':'twenty four','90':'ninety','5':'five','6':'six','gta':'g t a'}
def toks(w):k=re.sub(r"[^a-z0-9'-]","",w.lower());k=NUM.get(k,k);return [p for p in k.replace('-',' ').split() if p]
bad=0
for l in L:
    parts=[];own=[]
    for i,w in enumerate(l['w']):
        for p in toks(w['x']):parts.append(p);own.append(i)
    S=None
    for ma,mb in [(0.2,0.25),(0.1,0.4),(0.3,0.15),(0.05,0.6),(0.35,0.5)]:
        a=max(0,l['a']-ma);b=min(len(x)/sr,l['b']+mb);seg=x[int(a*sr):int(b*sr)]
        dec.set_align_text(' '.join(parts));dec.start_utt();dec.process_raw(seg.astype(np.int16).tobytes(),full_utt=True);dec.end_utt()
        try:R=[(re.sub(r'\(\d+\)$','',q.word),q.start_frame/100+a,(q.end_frame+1)/100+a) for q in dec.seg() if q.word not in ('<s>','</s>','<sil>','[NOISE]','(NULL)')]
        except TypeError:continue
        if [q[0] for q in R]==parts:S=R;break
    if S is None:print('FAIL',l['line']);bad+=1;continue
    st={};en={}
    for (wd,t0,t1),i in zip(S,own):st.setdefault(i,t0);en[i]=t1
    old=[w['t'] for w in l['w']]
    for i,w in enumerate(l['w']):w['t']=round(st[i],3);w['e']=round(en[i],3)
    l['a']=l['w'][0]['t'];l['b']=l['w'][-1]['e']
    print(f"{l['line'][:44]:44s} shift "+' '.join(f"{w['t']-o:+.2f}" for w,o in zip(l['w'],old)))
json.dump(L,open('words.json','w'),indent=0)
open('data.js','w').write('const L='+json.dumps(L)+';const END='+str(round(L[-1]['b']+1.6,2))+';')
print('bad',bad)
