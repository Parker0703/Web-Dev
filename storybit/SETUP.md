# Setup

## Claude Code on the phone / browser (cloud session)
1. Start a Claude Code session and upload `storybit_abc.zip`.
2. Ask Claude: "Unzip storybit_abc.zip, read storybit/CLAUDE.md, SETUP.md and StoryBit_Production_Handbook.pdf, set everything up and render a test still in each project."
3. Claude runs (only if something is missing):
   ```
   cd storybit
   npm i playwright && npx playwright install chromium     # skip if require('playwright') already works
   pip install numpy scipy pillow
   mkdir -p ~/.fonts && cp assets/fonts/*.otf ~/.fonts/ && fc-cache -f
   ```
   Network access must allow npm/pip installs (Claude settings) if packages are missing.

## PC (Windows / Mac)
1. Install Claude Code, Node.js 20+, Python 3.11+, ffmpeg.
2. In the `storybit` folder: `npm i playwright && npx playwright install chromium`, `pip install numpy scipy pillow`.
3. Install the Inter Display fonts in `assets/fonts`.
4. Run `claude` in the `storybit` folder.

3D (backgrounds and props) renders through WebGL with SwiftShader (`--use-angle=swiftshader`), so no GPU is needed.
