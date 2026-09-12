import type { CustomDesign } from './types'

const sharedCss = String.raw`
.spfx-stage{
  min-height:280px;
  width:min(720px,92vw);
  display:grid;
  place-items:center;
  padding:34px;
  background:
    radial-gradient(circle at 50% 18%,rgba(30,215,96,.11),transparent 28rem),
    linear-gradient(180deg,#171717,#0b0b0b 72%);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:#fff;
}
.spfx-row{display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap}
.spfx-button{
  --mx:50%;--my:50%;--lift:0px;--press:1;--glow:.0;
  position:relative;
  isolation:isolate;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-height:48px;
  border:0;
  outline:0;
  cursor:pointer;
  user-select:none;
  transform:translateY(var(--lift)) scale(var(--press));
  transform-origin:center;
  transition:transform .38s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,background .25s ease,border-color .25s ease,color .25s ease,filter .25s ease;
  will-change:transform;
}
.spfx-button::before{
  content:"";
  position:absolute;
  inset:1px;
  z-index:-1;
  border-radius:inherit;
  pointer-events:none;
  background:radial-gradient(circle at var(--mx) var(--my),rgba(255,255,255,.33),rgba(255,255,255,.08) 16%,transparent 38%);
  opacity:var(--glow);
  transition:opacity .25s ease;
  mix-blend-mode:screen;
}
.spfx-button::after{
  content:"";
  position:absolute;
  inset:-12px;
  z-index:-2;
  border-radius:inherit;
  pointer-events:none;
  background:radial-gradient(circle at var(--mx) var(--my),rgba(30,215,96,.34),transparent 42%);
  filter:blur(18px);
  opacity:0;
  transition:opacity .25s ease;
}
.spfx-button:hover,.spfx-button:focus-visible{--lift:-3px;--glow:1}
.spfx-button:hover::after,.spfx-button:focus-visible::after{opacity:.9}
.spfx-button:active{--lift:0px;--press:.94;transition-duration:.08s}
.spfx-button:focus-visible{box-shadow:0 0 0 3px rgba(255,255,255,.12),0 0 0 6px rgba(30,215,96,.32)}
.spfx-icon{width:20px;height:20px;display:block;flex:none;filter:drop-shadow(0 3px 9px rgba(0,0,0,.28))}
.spfx-label{position:relative;z-index:2;font-weight:800;letter-spacing:-.02em}

.spfx-play{
  width:64px;height:64px;min-height:64px;border-radius:50%;
  background:#1ed760;color:#000;
  box-shadow:0 10px 24px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.38);
}
.spfx-play:hover{background:#20e76a;box-shadow:0 16px 32px rgba(0,0,0,.38),0 0 34px rgba(30,215,96,.24),inset 0 1px 0 rgba(255,255,255,.5)}
.spfx-play .spfx-icon{width:25px;height:25px;margin-left:3px;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.spfx-play:hover .spfx-icon{transform:scale(1.08)}

.spfx-pill{
  min-width:104px;height:48px;padding:0 21px;border-radius:999px;
  border:1px solid rgba(255,255,255,.72);
  background:rgba(18,18,18,.78);color:#fff;
  backdrop-filter:blur(18px) saturate(130%);
  -webkit-backdrop-filter:blur(18px) saturate(130%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 10px 24px rgba(0,0,0,.3);
}
.spfx-pill:hover{border-color:#fff;background:rgba(36,36,36,.9);box-shadow:0 16px 34px rgba(0,0,0,.34),0 0 22px rgba(255,255,255,.05),inset 0 1px 0 rgba(255,255,255,.12)}
.spfx-pill.is-active{border-color:#1ed760;color:#1ed760;background:rgba(30,215,96,.08);box-shadow:0 0 28px rgba(30,215,96,.08),inset 0 0 0 1px rgba(30,215,96,.08)}
.spfx-pill.is-active::after{opacity:1}

.spfx-icon-button{
  width:52px;height:52px;min-height:52px;border-radius:50%;
  background:rgba(24,24,24,.72);color:#b3b3b3;
  border:1px solid rgba(255,255,255,.06);
  backdrop-filter:blur(18px) saturate(135%);
  -webkit-backdrop-filter:blur(18px) saturate(135%);
  box-shadow:0 10px 26px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.06);
}
.spfx-icon-button:hover{color:#fff;background:rgba(40,40,40,.86);box-shadow:0 14px 30px rgba(0,0,0,.34),0 0 22px rgba(255,255,255,.04)}
.spfx-icon-button.is-active{color:#1ed760;border-color:rgba(30,215,96,.28);background:rgba(30,215,96,.08);box-shadow:0 0 28px rgba(30,215,96,.13),inset 0 1px 0 rgba(255,255,255,.08)}
.spfx-icon-button.is-active .spfx-icon{animation:spfx-pop .45s cubic-bezier(.16,1,.3,1)}

.spfx-device{
  min-width:178px;height:52px;padding:0 18px;border-radius:14px;
  background:linear-gradient(180deg,rgba(40,40,40,.9),rgba(25,25,25,.94));
  color:#f4f4f4;border:1px solid rgba(255,255,255,.08);
  box-shadow:0 14px 32px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.07);
  backdrop-filter:blur(18px);
}
.spfx-device:hover{background:linear-gradient(180deg,rgba(51,51,51,.96),rgba(29,29,29,.98));border-color:rgba(30,215,96,.22);box-shadow:0 18px 38px rgba(0,0,0,.4),0 0 26px rgba(30,215,96,.07)}
.spfx-device .spfx-status{width:7px;height:7px;border-radius:50%;background:#1ed760;box-shadow:0 0 13px rgba(30,215,96,.78);animation:spfx-status 2.2s ease-in-out infinite}

.spfx-queue{
  min-width:148px;height:50px;padding:0 18px;border-radius:999px;
  color:#fff;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(20px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 12px 28px rgba(0,0,0,.3);
}
.spfx-queue:hover{background:rgba(255,255,255,.11);border-color:rgba(255,255,255,.14)}
.spfx-queue .spfx-lines{display:grid;gap:3px;width:18px}
.spfx-queue .spfx-lines i{height:2px;border-radius:99px;background:currentColor;transform-origin:left;transition:transform .28s cubic-bezier(.16,1,.3,1)}
.spfx-queue .spfx-lines i:nth-child(2){width:13px}.spfx-queue .spfx-lines i:nth-child(3){width:9px}
.spfx-queue:hover .spfx-lines i:nth-child(1){transform:scaleX(.62)}
.spfx-queue:hover .spfx-lines i:nth-child(2){transform:scaleX(1.34)}
.spfx-queue:hover .spfx-lines i:nth-child(3){transform:scaleX(1.65)}

@keyframes spfx-pop{0%{transform:scale(.7)}55%{transform:scale(1.18)}100%{transform:scale(1)}}
@keyframes spfx-status{50%{opacity:.55;box-shadow:0 0 5px rgba(30,215,96,.38)}}
@media(prefers-reduced-motion:reduce){.spfx-button,.spfx-icon,.spfx-status{animation:none!important;transition-duration:.001ms!important}}
`

const pointerJs = String.raw`(() => {
  document.querySelectorAll('[data-spfx]').forEach((button) => {
    const reset = () => {
      button.style.setProperty('--mx', '50%');
      button.style.setProperty('--my', '50%');
    };
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      button.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      button.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
    button.addEventListener('pointerleave', reset);
    button.addEventListener('blur', reset);
    if (button.hasAttribute('data-toggle')) {
      button.addEventListener('click', () => button.classList.toggle('is-active'));
    }
  });
})();`

const playSvg = `<svg class="spfx-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.6v12.8c0 .77.84 1.25 1.5.86l10.14-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6Z"/></svg>`
const heartSvg = `<svg class="spfx-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20.4 10.55 19C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 2C19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.55 11.5L12 20.4Z"/></svg>`
const shuffleSvg = `<svg class="spfx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5"/><path d="m21 3-7.5 7.5"/><path d="M4 7h2.5c2.5 0 4 2 5.2 4s2.8 4 5.8 4H21"/><path d="M16 16h5v5"/><path d="M4 17h2.5c1.5 0 2.6-.6 3.5-1.5"/></svg>`
const deviceSvg = `<svg class="spfx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 17h6"/><path d="M10 7h4"/></svg>`

export const spotifyMotionButtonSeedDesigns: CustomDesign[] = [
  {
    id: 'spotify-motion-play-button',
    name: 'Spotify Motion Play Button',
    category: 'Music Buttons',
    description: 'Spotify-inspired circular play CTA with brighter hover lift, cursor light, soft green bloom and tactile press travel.',
    tags: ['spotify', 'music', 'play', 'button', 'green', 'glow', 'blur', 'motion'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-play" data-spfx aria-label="Play">${playSvg}</button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
  {
    id: 'spotify-motion-follow-button',
    name: 'Spotify Motion Follow Button',
    category: 'Music Buttons',
    description: 'Spotify-style Follow pill upgraded with glass blur, cursor-tracked highlight and animated active state.',
    tags: ['spotify', 'follow', 'pill', 'button', 'glass', 'blur', 'toggle'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-pill" data-spfx data-toggle><span class="spfx-label">Follow</span></button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
  {
    id: 'spotify-motion-shuffle-button',
    name: 'Spotify Motion Shuffle Button',
    category: 'Music Buttons',
    description: 'Compact shuffle control with familiar green active state, frosted blur, cursor light and springy icon feedback.',
    tags: ['spotify', 'shuffle', 'icon button', 'music', 'green', 'animation'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-icon-button" data-spfx data-toggle aria-label="Shuffle">${shuffleSvg}</button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
  {
    id: 'spotify-motion-like-button',
    name: 'Spotify Motion Like Button',
    category: 'Music Buttons',
    description: 'Like control with heart pop, restrained green activation glow and dark translucent player-surface styling.',
    tags: ['spotify', 'like', 'heart', 'icon', 'button', 'glow'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-icon-button" data-spfx data-toggle aria-label="Like">${heartSvg}</button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
  {
    id: 'spotify-motion-queue-button',
    name: 'Spotify Motion Queue Button',
    category: 'Music Buttons',
    description: 'Queue pill with animated line choreography, soft player blur and mouse-following specular light.',
    tags: ['spotify', 'queue', 'button', 'lines', 'blur', 'motion'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-queue" data-spfx><span class="spfx-lines" aria-hidden="true"><i></i><i></i><i></i></span><span class="spfx-label">Queue</span></button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
  {
    id: 'spotify-motion-device-button',
    name: 'Spotify Motion Device Button',
    category: 'Music Buttons',
    description: 'Device picker action with Spotify-like dark control surface, live green status dot, blur and subtle edge illumination.',
    tags: ['spotify', 'device', 'button', 'status', 'music', 'glass', 'blur'],
    source: 'seed',
    html: `<div class="spfx-stage"><button class="spfx-button spfx-device" data-spfx>${deviceSvg}<span class="spfx-label">This device</span><i class="spfx-status" aria-hidden="true"></i></button></div>`,
    css: sharedCss,
    js: pointerJs,
  },
]
