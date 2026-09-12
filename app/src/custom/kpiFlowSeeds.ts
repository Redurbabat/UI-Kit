import type { CustomDesign } from './types'

export const kpiFlowSeedDesigns: CustomDesign[] = [
  {
    id: 'red-flowing-kpi-card-row',
    name: 'Flowing KPI Card Row',
    category: 'Cards & Dashboards',
    description: 'Four KPI cards with animated multi-line graphs, warm pointer-following glare, 3D tilt and pulsing status icons.',
    tags: ['cards', 'dashboard', 'kpi', 'graph', '3d', 'hover', 'glow', 'tilt', 'animated'],
    source: 'seed',
    html: `<div class="red-kpi-board">
  <article class="red-kpi-card" tabindex="0">
    <div class="red-kpi-glow"></div>
    <div class="red-kpi-glare"></div>
    <button class="red-kpi-heart" type="button" aria-label="Favorit">♥</button>
    <div class="red-kpi-copy"><span>fällige Fehler</span><strong>0</strong></div>
    <svg class="red-kpi-graph" viewBox="0 0 300 72" aria-hidden="true">
      <g class="red-kpi-ticks"><path d="M30 48V70M92 52V70M154 54V70M216 45V70M276 50V70"/></g>
      <path class="red-kpi-line red-kpi-line-a" d="M0 61 C30 59 43 42 76 45 S122 62 161 54 S214 33 251 40 S281 43 300 43"/>
      <path class="red-kpi-line red-kpi-line-b" d="M0 68 C34 66 50 49 79 52 S126 68 164 60 S213 41 251 47 S282 48 300 49"/>
      <path class="red-kpi-line red-kpi-line-c" d="M0 57 C34 55 48 37 79 40 S125 55 162 48 S213 29 251 35 S282 38 300 37"/>
    </svg>
  </article>

  <article class="red-kpi-card" tabindex="0">
    <div class="red-kpi-glow"></div><div class="red-kpi-glare"></div>
    <button class="red-kpi-heart" type="button" aria-label="Favorit">♥</button>
    <div class="red-kpi-copy"><span>fällige Karten</span><strong>0</strong></div>
    <svg class="red-kpi-graph" viewBox="0 0 300 72" aria-hidden="true">
      <g class="red-kpi-ticks"><path d="M30 48V70M92 52V70M154 54V70M216 45V70M276 50V70"/></g>
      <path class="red-kpi-line red-kpi-line-a" d="M0 61 C30 59 43 42 76 45 S122 62 161 54 S214 33 251 40 S281 43 300 43"/>
      <path class="red-kpi-line red-kpi-line-b" d="M0 68 C34 66 50 49 79 52 S126 68 164 60 S213 41 251 47 S282 48 300 49"/>
      <path class="red-kpi-line red-kpi-line-c" d="M0 57 C34 55 48 37 79 40 S125 55 162 48 S213 29 251 35 S282 38 300 37"/>
    </svg>
  </article>

  <article class="red-kpi-card" tabindex="0">
    <div class="red-kpi-glow"></div><div class="red-kpi-glare"></div>
    <button class="red-kpi-heart" type="button" aria-label="Favorit">♥</button>
    <div class="red-kpi-copy"><span>neue Karten</span><strong>0</strong></div>
    <svg class="red-kpi-graph" viewBox="0 0 300 72" aria-hidden="true">
      <g class="red-kpi-ticks"><path d="M30 48V70M92 52V70M154 54V70M216 45V70M276 50V70"/></g>
      <path class="red-kpi-line red-kpi-line-a" d="M0 61 C30 59 43 42 76 45 S122 62 161 54 S214 33 251 40 S281 43 300 43"/>
      <path class="red-kpi-line red-kpi-line-b" d="M0 68 C34 66 50 49 79 52 S126 68 164 60 S213 41 251 47 S282 48 300 49"/>
      <path class="red-kpi-line red-kpi-line-c" d="M0 57 C34 55 48 37 79 40 S125 55 162 48 S213 29 251 35 S282 38 300 37"/>
    </svg>
  </article>

  <article class="red-kpi-card red-kpi-card-wide" tabindex="0">
    <div class="red-kpi-glow"></div><div class="red-kpi-glare"></div>
    <button class="red-kpi-heart" type="button" aria-label="Favorit">♥</button>
    <div class="red-kpi-copy"><span>nächste Wiederholung</span><strong class="red-kpi-date">Mo., 14.<br>Sept., 00:16</strong></div>
    <svg class="red-kpi-graph" viewBox="0 0 300 72" aria-hidden="true">
      <g class="red-kpi-ticks"><path d="M30 48V70M92 52V70M154 54V70M216 45V70M276 50V70"/></g>
      <path class="red-kpi-line red-kpi-line-a" d="M0 61 C30 59 43 42 76 45 S122 62 161 54 S214 33 251 40 S281 43 300 43"/>
      <path class="red-kpi-line red-kpi-line-b" d="M0 68 C34 66 50 49 79 52 S126 68 164 60 S213 41 251 47 S282 48 300 49"/>
      <path class="red-kpi-line red-kpi-line-c" d="M0 57 C34 55 48 37 79 40 S125 55 162 48 S213 29 251 35 S282 38 300 37"/>
    </svg>
  </article>
</div>`,
    css: `.red-kpi-board{--red-kpi-accent:#8b7300;--red-kpi-purple:#7767f0;width:min(1180px,96vw);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;perspective:1100px}.red-kpi-card{--rx:0deg;--ry:0deg;--mx:50%;--my:50%;position:relative;isolation:isolate;min-width:0;height:218px;padding:24px 23px;border:1px solid rgba(255,255,255,.32);border-radius:18px;background:linear-gradient(160deg,#090909,#050505 72%);overflow:hidden;transform-style:preserve-3d;transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);box-shadow:0 18px 35px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.03);transition:transform .42s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .3s,background .3s}.red-kpi-card::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at var(--mx) var(--my),rgba(255,205,45,.16),transparent 33%);opacity:0;transition:opacity .28s;pointer-events:none}.red-kpi-card:hover,.red-kpi-card:focus-visible,.red-kpi-card.is-active{border-color:rgba(224,183,20,.72);box-shadow:0 22px 48px rgba(0,0,0,.38),0 0 0 1px rgba(255,211,44,.22),inset 0 1px 0 rgba(255,255,255,.09);background:linear-gradient(145deg,#17120c,#050505 72%);outline:none}.red-kpi-card:hover::before,.red-kpi-card:focus-visible::before,.red-kpi-card.is-active::before{opacity:1}.red-kpi-glow{position:absolute;inset:-28%;z-index:-1;background:radial-gradient(circle at var(--mx) var(--my),rgba(239,188,18,.56),rgba(155,72,12,.34) 20%,transparent 44%);filter:blur(26px);opacity:0;transform:translateZ(-10px);transition:opacity .3s;pointer-events:none}.red-kpi-card:hover .red-kpi-glow,.red-kpi-card:focus-visible .red-kpi-glow,.red-kpi-card.is-active .red-kpi-glow{opacity:.95}.red-kpi-glare{position:absolute;inset:0;z-index:4;border-radius:inherit;background:radial-gradient(circle at var(--mx) var(--my),rgba(255,238,168,.28),rgba(255,166,40,.08) 23%,transparent 43%);mix-blend-mode:screen;opacity:0;transition:opacity .25s;pointer-events:none}.red-kpi-card:hover .red-kpi-glare,.red-kpi-card:focus-visible .red-kpi-glare,.red-kpi-card.is-active .red-kpi-glare{opacity:1}.red-kpi-copy{position:relative;z-index:5;transform:translateZ(28px)}.red-kpi-copy span{display:block;color:rgba(255,255,255,.83);font:800 clamp(11px,1.05vw,16px)/1.1 Inter,system-ui,sans-serif;letter-spacing:-.02em}.red-kpi-copy strong{display:block;margin-top:16px;color:#fff;font:900 clamp(28px,3vw,40px)/.95 Inter,system-ui,sans-serif;letter-spacing:-.05em;text-shadow:0 4px 16px rgba(0,0,0,.36)}.red-kpi-copy .red-kpi-date{font-size:clamp(20px,2.1vw,38px);line-height:1}.red-kpi-heart{position:absolute;right:14px;top:13px;z-index:7;width:44px;height:44px;border:7px solid rgba(145,119,0,.78);border-radius:50%;display:grid;place-items:center;padding:0;background:#070707;color:var(--red-kpi-purple);font-size:19px;line-height:1;cursor:pointer;transform:translateZ(36px);box-shadow:0 0 0 1px #000,inset 0 0 10px rgba(0,0,0,.7);transition:transform .25s,border-color .25s,box-shadow .25s}.red-kpi-heart:hover{transform:translateZ(46px) scale(1.08);border-color:#b99a00;box-shadow:0 0 18px rgba(230,190,16,.2)}.red-kpi-heart:active{transform:translateZ(24px) scale(.93)}.red-kpi-heart.is-liked{animation:red-kpi-heartbeat 1s ease infinite;color:#9a88ff}.red-kpi-graph{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:76px;overflow:visible;transform:translateZ(18px);pointer-events:none}.red-kpi-line{fill:none;stroke-linecap:round;stroke-width:2.2;vector-effect:non-scaling-stroke;stroke-dasharray:9 7;animation:red-kpi-flow 3.8s linear infinite}.red-kpi-line-a{stroke:rgba(157,130,0,.88)}.red-kpi-line-b{stroke:rgba(120,99,0,.55);animation-duration:5.2s;animation-direction:reverse}.red-kpi-line-c{stroke:rgba(226,190,16,.26);stroke-width:1.4;animation-duration:6.4s}.red-kpi-ticks path{fill:none;stroke:rgba(138,112,0,.55);stroke-width:1.3;vector-effect:non-scaling-stroke}.red-kpi-card:hover .red-kpi-line-a,.red-kpi-card:focus-visible .red-kpi-line-a,.red-kpi-card.is-active .red-kpi-line-a{stroke:rgba(235,195,16,.96);filter:drop-shadow(0 0 3px rgba(241,193,0,.24))}.red-kpi-card:hover .red-kpi-line-b,.red-kpi-card:focus-visible .red-kpi-line-b,.red-kpi-card.is-active .red-kpi-line-b{stroke:rgba(188,143,12,.78)}.red-kpi-card:hover .red-kpi-ticks path,.red-kpi-card:focus-visible .red-kpi-ticks path,.red-kpi-card.is-active .red-kpi-ticks path{stroke:rgba(202,162,0,.72)}@keyframes red-kpi-flow{to{stroke-dashoffset:-64}}@keyframes red-kpi-heartbeat{0%,100%{transform:translateZ(36px) scale(1)}35%{transform:translateZ(42px) scale(1.12)}55%{transform:translateZ(38px) scale(.98)}75%{transform:translateZ(44px) scale(1.08)}}@media(max-width:820px){.red-kpi-board{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:460px){.red-kpi-board{grid-template-columns:1fr}.red-kpi-card{height:200px}}@media(prefers-reduced-motion:reduce){.red-kpi-card,.red-kpi-line,.red-kpi-heart{animation:none!important;transition-duration:.001ms!important}}`,
    js: `document.querySelectorAll('.red-kpi-card').forEach(card=>{const reset=()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')};card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;card.style.setProperty('--mx',(x*100)+'%');card.style.setProperty('--my',(y*100)+'%');card.style.setProperty('--ry',((x-.5)*-16)+'deg');card.style.setProperty('--rx',((y-.5)*14)+'deg')});card.addEventListener('pointerleave',reset);card.addEventListener('blur',reset);card.addEventListener('click',e=>{if(e.target.closest('.red-kpi-heart'))return;card.classList.toggle('is-active')});const heart=card.querySelector('.red-kpi-heart');heart?.addEventListener('click',e=>{e.stopPropagation();heart.classList.toggle('is-liked')})})`,
  },
]
