export interface ApplePointerOptions {
  rootSelector: string
  surfaceSelector?: string
  pointerXVar?: string
  pointerYVar?: string
  rotateXVar?: string
  rotateYVar?: string
  maxRotateX?: number
  maxRotateY?: number
  easing?: number
  activeClass?: string
}

export const appleDepthMotionCss = String.raw`
[data-apple-depth]{
  --apple-px:50%;
  --apple-py:50%;
  --apple-rx:0deg;
  --apple-ry:0deg;
  --apple-lift:0px;
  --apple-scale:1;
  --apple-specular:0;
  position:relative;
  isolation:isolate;
  transform-style:preserve-3d;
  transform:perspective(var(--apple-perspective,1100px)) rotateX(var(--apple-rx)) rotateY(var(--apple-ry)) translateY(var(--apple-lift)) scale(var(--apple-scale));
  transition:transform .44s cubic-bezier(.2,.8,.2,1),box-shadow .32s ease,border-color .32s ease,background-color .32s ease;
  will-change:transform;
}
[data-apple-depth]::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:30;
  border-radius:inherit;
  pointer-events:none;
  background:radial-gradient(circle at var(--apple-px) var(--apple-py),rgba(255,255,255,.28) 0,rgba(255,255,255,.11) 12%,rgba(255,255,255,.035) 28%,transparent 48%);
  mix-blend-mode:screen;
  opacity:var(--apple-specular);
  transition:opacity .28s ease;
}
[data-apple-depth]::after{
  content:"";
  position:absolute;
  inset:1px;
  z-index:29;
  border-radius:inherit;
  pointer-events:none;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 1px 0 0 rgba(255,255,255,.05),inset 0 -1px 0 rgba(0,0,0,.22);
  opacity:.8;
}
[data-apple-depth].is-apple-active{
  --apple-lift:-5px;
  --apple-specular:1;
}
[data-apple-depth].is-apple-pressed{
  --apple-lift:-1px;
  --apple-scale:.985;
}
[data-apple-depth] [data-apple-layer]{
  position:relative;
  z-index:35;
  transform:translateZ(var(--apple-z,24px));
  transform-style:preserve-3d;
}
@media(hover:none){
  [data-apple-depth]{transform:none!important}
  [data-apple-depth]::before{display:none}
}
@media(prefers-reduced-motion:reduce){
  [data-apple-depth]{transform:none!important;transition-duration:.001ms!important}
  [data-apple-depth]::before{display:none}
}
`

export function createApplePointerScript(options: ApplePointerOptions): string {
  const rootSelector = JSON.stringify(options.rootSelector)
  const surfaceSelector = options.surfaceSelector ? JSON.stringify(options.surfaceSelector) : 'null'
  const pointerXVar = JSON.stringify(options.pointerXVar ?? '--apple-px')
  const pointerYVar = JSON.stringify(options.pointerYVar ?? '--apple-py')
  const rotateXVar = JSON.stringify(options.rotateXVar ?? '--apple-rx')
  const rotateYVar = JSON.stringify(options.rotateYVar ?? '--apple-ry')
  const activeClass = JSON.stringify(options.activeClass ?? 'is-apple-active')
  const maxRotateX = options.maxRotateX ?? 5
  const maxRotateY = options.maxRotateY ?? 6
  const easing = options.easing ?? 0.14

  return `(() => {
  if (!window.matchMedia('(hover:hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll(${rootSelector}).forEach((root) => {
    const surface = ${surfaceSelector} ? root.querySelector(${surfaceSelector}) : root;
    if (!surface) return;
    let frame = 0;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const render = () => {
      currentX += (targetX - currentX) * ${easing};
      currentY += (targetY - currentY) * ${easing};
      surface.style.setProperty(${rotateYVar}, currentX.toFixed(2) + 'deg');
      surface.style.setProperty(${rotateXVar}, currentY.toFixed(2) + 'deg');
      if (Math.abs(targetX-currentX)>.02 || Math.abs(targetY-currentY)>.02) frame=requestAnimationFrame(render); else frame=0;
    };
    const schedule = () => { if (!frame) frame=requestAnimationFrame(render); };
    root.addEventListener('pointerenter', () => root.classList.add(${activeClass}));
    root.addEventListener('pointermove', (event) => {
      const rect=root.getBoundingClientRect();
      const x=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
      const y=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
      root.style.setProperty(${pointerXVar},(x*100).toFixed(1)+'%');
      root.style.setProperty(${pointerYVar},(y*100).toFixed(1)+'%');
      targetX=(.5-x)*${maxRotateY * 2};
      targetY=(y-.5)*${maxRotateX * 2};
      schedule();
    });
    root.addEventListener('pointerdown', () => root.classList.add('is-apple-pressed'));
    const release = () => root.classList.remove('is-apple-pressed');
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);
    root.addEventListener('pointerleave', () => {
      root.classList.remove(${activeClass},'is-apple-pressed');
      root.style.setProperty(${pointerXVar},'50%');
      root.style.setProperty(${pointerYVar},'50%');
      targetX=0; targetY=0; schedule();
    });
  });
})();`
}

export const appleDepthMotionJs = createApplePointerScript({
  rootSelector: '[data-apple-depth]',
  maxRotateX: 4.5,
  maxRotateY: 5.5,
  easing: 0.14,
})
