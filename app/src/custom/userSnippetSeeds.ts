import type { CustomDesign } from './types'

export const userSnippetSeedDesigns: CustomDesign[] = [
  {
    id: 'user-expandable-file-tree',
    name: 'Expandable File Tree',
    category: 'Tree & Navigation',
    description: 'A clean nested file tree with animated folder expansion and connector lines.',
    tags: ['tree', 'files', 'folders', 'navigation', 'expand', 'minimal'],
    source: 'seed',
    html: `<div class="red-tree-container">
  <ul class="red-tree-root">
    <li class="red-tree-item">
      <input class="red-tree-toggle" type="checkbox" id="red-tree-project" checked>
      <label class="red-tree-label" for="red-tree-project"><span class="red-tree-folder red-tree-folder-closed">▸</span><span class="red-tree-folder red-tree-folder-open">▾</span><strong>UI-Kit</strong></label>
      <div class="red-tree-children-wrapper"><div class="red-tree-children">
        <ul>
          <li class="red-tree-item">
            <input class="red-tree-toggle" type="checkbox" id="red-tree-src" checked>
            <label class="red-tree-label" for="red-tree-src"><span class="red-tree-folder red-tree-folder-closed">▸</span><span class="red-tree-folder red-tree-folder-open">▾</span>src</label>
            <div class="red-tree-children-wrapper"><div class="red-tree-children"><ul>
              <li class="red-tree-item"><a class="red-file-item red-is-selected" href="#"><span>◇</span>App.tsx</a></li>
              <li class="red-tree-item"><a class="red-file-item" href="#"><span>♢</span>main.tsx</a></li>
              <li class="red-tree-item"><a class="red-file-item" href="#"><span>#</span>styles.css</a></li>
            </ul></div></div>
          </li>
          <li class="red-tree-item">
            <input class="red-tree-toggle" type="checkbox" id="red-tree-assets">
            <label class="red-tree-label" for="red-tree-assets"><span class="red-tree-folder red-tree-folder-closed">▸</span><span class="red-tree-folder red-tree-folder-open">▾</span>assets</label>
            <div class="red-tree-children-wrapper"><div class="red-tree-children"><ul>
              <li class="red-tree-item"><a class="red-file-item" href="#"><span>▧</span>logo.svg</a></li>
              <li class="red-tree-item"><a class="red-file-item" href="#"><span>▧</span>preview.png</a></li>
            </ul></div></div>
          </li>
          <li class="red-tree-item"><a class="red-file-item" href="#"><span>◇</span>package.json</a></li>
        </ul>
      </div></div>
    </li>
  </ul>
</div>`,
    css: `.red-tree-container{width:320px;border:1px solid #e4e4e7;border-radius:12px;padding:24px;background:#fff;box-shadow:0 14px 35px rgba(0,0,0,.12);font-family:Inter,system-ui,sans-serif}.red-tree-container ul{list-style:none;padding:0;margin:0}.red-tree-container ul ul{margin-left:11px;padding-left:11px;border-left:1px solid #e4e4e7}.red-tree-item{position:relative;margin-top:4px}.red-tree-container ul ul .red-tree-item::before{content:"";position:absolute;left:-11px;top:14px;width:11px;height:1px;background:#e4e4e7}.red-tree-label,.red-file-item{display:flex;align-items:center;gap:8px;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:14px;color:#09090b;transition:background-color .2s,transform .2s;user-select:none;text-decoration:none;height:28px}.red-tree-label:hover,.red-file-item:hover{background:#f4f4f5;transform:translateX(2px)}.red-is-selected{background:#f4f4f5;color:#09090b;font-weight:600}.red-tree-folder{width:16px;color:#71717a;flex-shrink:0;text-align:center}.red-tree-folder-open{display:none}.red-tree-toggle:checked~.red-tree-label .red-tree-folder-open{display:inline;color:#09090b}.red-tree-toggle:checked~.red-tree-label .red-tree-folder-closed{display:none}.red-tree-toggle{display:none}.red-tree-children-wrapper{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease-in-out}.red-tree-children{overflow:hidden}.red-tree-toggle:checked~.red-tree-children-wrapper{grid-template-rows:1fr}@media(prefers-reduced-motion:reduce){.red-tree-children-wrapper,.red-tree-label,.red-file-item{transition:none}}`,
  },
  {
    id: 'user-hamster-wheel-loader',
    name: 'Hamster Wheel Loader',
    category: 'Fun Loaders',
    description: 'A playful CSS hamster running inside a spinning wheel with animated limbs, ears, eyes and spokes.',
    tags: ['loader', 'hamster', 'fun', 'character', 'animation', 'css'],
    source: 'seed',
    html: `<div class="red-wheel-and-hamster" role="img" aria-label="Animated hamster running in a wheel">
  <div class="red-wheel"></div>
  <div class="red-hamster">
    <div class="red-hamster__head"><div class="red-hamster__ear"></div><div class="red-hamster__eye"></div><div class="red-hamster__nose"></div></div>
    <div class="red-hamster__body"><div class="red-hamster__limb red-hamster__limb--fr"></div><div class="red-hamster__limb red-hamster__limb--fl"></div><div class="red-hamster__limb red-hamster__limb--br"></div><div class="red-hamster__limb red-hamster__limb--bl"></div><div class="red-hamster__tail"></div></div>
  </div>
  <div class="red-spoke"></div>
</div>`,
    css: `.red-wheel-and-hamster{--dur:1s;position:relative;width:12em;height:12em;font-size:14px}.red-wheel,.red-hamster,.red-hamster div,.red-spoke{position:absolute}.red-wheel,.red-spoke{border-radius:50%;top:0;left:0;width:100%;height:100%}.red-wheel{background:radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);z-index:2}.red-hamster{animation:redHamster var(--dur) ease-in-out infinite;top:50%;left:calc(50% - 3.5em);width:7em;height:3.75em;transform:rotate(4deg) translate(-.8em,1.85em);transform-origin:50% 0;z-index:1}.red-hamster__head{animation:redHamsterHead var(--dur) ease-in-out infinite;background:hsl(30,90%,55%);border-radius:70% 30% 0 100%/40% 25% 25% 60%;box-shadow:0 -.25em 0 hsl(30,90%,80%) inset,.75em -1.55em 0 hsl(30,90%,90%) inset;top:0;left:-2em;width:2.75em;height:2.5em;transform-origin:100% 50%}.red-hamster__ear{animation:redHamsterEar var(--dur) ease-in-out infinite;background:hsl(0,90%,85%);border-radius:50%;box-shadow:-.25em 0 hsl(30,90%,55%) inset;top:-.25em;right:-.25em;width:.75em;height:.75em;transform-origin:50% 75%}.red-hamster__eye{animation:redHamsterEye var(--dur) linear infinite;background:#000;border-radius:50%;top:.375em;left:1.25em;width:.5em;height:.5em}.red-hamster__nose{background:hsl(0,90%,75%);border-radius:35% 65% 85% 15%/70% 50% 50% 30%;top:.75em;left:0;width:.2em;height:.25em}.red-hamster__body{animation:redHamsterBody var(--dur) ease-in-out infinite;background:hsl(30,90%,90%);border-radius:50% 30% 50% 30%/15% 60% 40% 40%;box-shadow:.1em .75em 0 hsl(30,90%,55%) inset,.15em -.5em 0 hsl(30,90%,80%) inset;top:.25em;left:2em;width:4.5em;height:3em;transform-origin:17% 50%;transform-style:preserve-3d}.red-hamster__limb--fr,.red-hamster__limb--fl{clip-path:polygon(0 0,100% 0,70% 80%,60% 100%,0 100%,40% 80%);top:2em;left:.5em;width:1em;height:1.5em;transform-origin:50% 0}.red-hamster__limb--fr{animation:redHamsterFR var(--dur) linear infinite;background:linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);transform:rotate(15deg) translateZ(-1px)}.red-hamster__limb--fl{animation:redHamsterFL var(--dur) linear infinite;background:linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);transform:rotate(15deg)}.red-hamster__limb--br,.red-hamster__limb--bl{border-radius:.75em .75em 0 0;clip-path:polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0 30%);top:1em;left:2.8em;width:1.5em;height:2.5em;transform-origin:50% 30%}.red-hamster__limb--br{animation:redHamsterBR var(--dur) linear infinite;background:linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);transform:rotate(-25deg) translateZ(-1px)}.red-hamster__limb--bl{animation:redHamsterBL var(--dur) linear infinite;background:linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);transform:rotate(-25deg)}.red-hamster__tail{animation:redHamsterTail var(--dur) linear infinite;background:hsl(0,90%,85%);border-radius:.25em 50% 50% .25em;box-shadow:0 -.2em 0 hsl(0,90%,75%) inset;top:1.5em;right:-.5em;width:1em;height:.5em;transform:rotate(30deg) translateZ(-1px);transform-origin:.25em .25em}.red-spoke{animation:redSpoke var(--dur) linear infinite;background:radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50%/99% 99% no-repeat}@keyframes redHamster{from,to{transform:rotate(4deg) translate(-.8em,1.85em)}50%{transform:rotate(0) translate(-.8em,1.85em)}}@keyframes redHamsterHead{from,25%,50%,75%,to{transform:rotate(0)}12.5%,37.5%,62.5%,87.5%{transform:rotate(8deg)}}@keyframes redHamsterEye{from,90%,to{transform:scaleY(1)}95%{transform:scaleY(0)}}@keyframes redHamsterEar{from,25%,50%,75%,to{transform:rotate(0)}12.5%,37.5%,62.5%,87.5%{transform:rotate(12deg)}}@keyframes redHamsterBody{from,25%,50%,75%,to{transform:rotate(0)}12.5%,37.5%,62.5%,87.5%{transform:rotate(-2deg)}}@keyframes redHamsterFR{from,25%,50%,75%,to{transform:rotate(50deg) translateZ(-1px)}12.5%,37.5%,62.5%,87.5%{transform:rotate(-30deg) translateZ(-1px)}}@keyframes redHamsterFL{from,25%,50%,75%,to{transform:rotate(-30deg)}12.5%,37.5%,62.5%,87.5%{transform:rotate(50deg)}}@keyframes redHamsterBR{from,25%,50%,75%,to{transform:rotate(-60deg) translateZ(-1px)}12.5%,37.5%,62.5%,87.5%{transform:rotate(20deg) translateZ(-1px)}}@keyframes redHamsterBL{from,25%,50%,75%,to{transform:rotate(20deg)}12.5%,37.5%,62.5%,87.5%{transform:rotate(-60deg)}}@keyframes redHamsterTail{from,25%,50%,75%,to{transform:rotate(30deg) translateZ(-1px)}12.5%,37.5%,62.5%,87.5%{transform:rotate(10deg) translateZ(-1px)}}@keyframes redSpoke{to{transform:rotate(-1turn)}}@media(prefers-reduced-motion:reduce){.red-wheel-and-hamster *{animation-play-state:paused!important}}`,
  },
  {
    id: 'user-tilted-3d-card-deck',
    name: 'Tilted 3D Card Deck',
    category: 'Extreme 3D Carousels',
    description: 'An eight-card 3D ring tilted on the X-axis, based on perspective, rotateY and translateZ.',
    tags: ['3d', 'carousel', 'deck', 'cards', 'rotateY', 'perspective', 'css'],
    source: 'seed',
    html: `<div class="red-deck-wrapper">
  <div class="red-deck-inner" style="--quantity:8">
    <article class="red-deck-card" style="--index:0;--color-card:255,105,70"><div class="red-deck-face"><b>01</b><span>Notes</span></div></article>
    <article class="red-deck-card" style="--index:1;--color-card:244,114,182"><div class="red-deck-face"><b>02</b><span>Stats</span></div></article>
    <article class="red-deck-card" style="--index:2;--color-card:139,92,246"><div class="red-deck-face"><b>03</b><span>AI</span></div></article>
    <article class="red-deck-card" style="--index:3;--color-card:56,189,248"><div class="red-deck-face"><b>04</b><span>Docs</span></div></article>
    <article class="red-deck-card" style="--index:4;--color-card:45,212,191"><div class="red-deck-face"><b>05</b><span>Media</span></div></article>
    <article class="red-deck-card" style="--index:5;--color-card:163,230,53"><div class="red-deck-face"><b>06</b><span>Data</span></div></article>
    <article class="red-deck-card" style="--index:6;--color-card:251,191,36"><div class="red-deck-face"><b>07</b><span>Tools</span></div></article>
    <article class="red-deck-card" style="--index:7;--color-card:248,113,113"><div class="red-deck-face"><b>08</b><span>System</span></div></article>
  </div>
</div>`,
    css: `.red-deck-wrapper{width:min(560px,94vw);height:330px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;perspective:1000px}.red-deck-wrapper::after{content:"";position:absolute;left:50%;bottom:28px;width:330px;height:65px;transform:translateX(-50%);background:radial-gradient(ellipse,#756cff2b,transparent 68%);filter:blur(12px)}.red-deck-inner{--w:100px;--h:150px;--translateZ:calc((var(--w) + var(--h)) + 0px);--rotateX:-15deg;--perspective:1000px;position:absolute;width:var(--w);height:var(--h);z-index:2;transform-style:preserve-3d;transform:perspective(var(--perspective));animation:redDeckRotating 20s linear infinite}.red-deck-wrapper:hover .red-deck-inner{animation-play-state:paused}.red-deck-card{position:absolute;border:2px solid rgba(var(--color-card),.72);border-radius:14px;overflow:hidden;inset:0;transform:rotateY(calc((360deg / var(--quantity))*var(--index))) translateZ(var(--translateZ));box-shadow:0 18px 35px #0008,0 0 22px rgba(var(--color-card),.18);background:rgba(8,10,15,.82);backdrop-filter:blur(12px)}.red-deck-face{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;color:white;background:radial-gradient(circle at 50% 18%,rgba(var(--color-card),.22) 0%,rgba(var(--color-card),.55) 78%,rgba(var(--color-card),.85) 100%);box-shadow:inset 0 1px 0 #fff4}.red-deck-face::before{content:"";position:absolute;left:14px;right:14px;top:20px;height:55px;border:1px solid #ffffff40;border-radius:8px;background:repeating-linear-gradient(90deg,#ffffff25 0 1px,transparent 1px 12px),repeating-linear-gradient(0deg,#ffffff20 0 1px,transparent 1px 12px)}.red-deck-face b{font:900 26px/1 Inter,system-ui,sans-serif;opacity:.82}.red-deck-face span{margin-top:5px;font:800 9px/1 Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase}@keyframes redDeckRotating{from{transform:perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0)}to{transform:perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn)}}@media(max-width:520px){.red-deck-inner{--w:78px;--h:118px;--translateZ:190px}.red-deck-wrapper{height:280px}}@media(prefers-reduced-motion:reduce){.red-deck-inner{animation:none}}`,
  },
]
