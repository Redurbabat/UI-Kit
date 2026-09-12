import type { CustomDesign } from './types'
import html from './snippets/original3dGraphCard.html?raw'
import css from './snippets/original3dGraphCard.css?raw'

const applePointerMotion = `(() => {
  const grid = document.querySelector('.grid');
  const card = document.querySelector('.card');
  if (!grid || !card || !window.matchMedia('(hover:hover)').matches) return;

  let frame = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.13;
    currentY += (targetY - currentY) * 0.13;
    card.style.setProperty('--ry', currentX.toFixed(2) + 'deg');
    card.style.setProperty('--rx', currentY.toFixed(2) + 'deg');

    if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
      frame = requestAnimationFrame(render);
    } else {
      frame = 0;
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  grid.addEventListener('pointerenter', () => grid.classList.add('is-pointer'));

  grid.addEventListener('pointermove', (event) => {
    const rect = grid.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    grid.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    grid.style.setProperty('--my', (y * 100).toFixed(1) + '%');

    targetX = (0.5 - x) * 11;
    targetY = (y - 0.5) * 9;
    schedule();
  });

  grid.addEventListener('pointerleave', () => {
    grid.classList.remove('is-pointer');
    grid.style.setProperty('--mx', '50%');
    grid.style.setProperty('--my', '50%');
    targetX = 0;
    targetY = 0;
    schedule();
  });
})();`

export const originalGraphCardSeedDesigns: CustomDesign[] = [
  {
    id: 'original-3d-graph-card',
    name: 'Apple 3D Graph Card',
    category: 'Cards & Dashboards',
    description: 'Premium analytics card with Redion-style restrained motion, pointer-tracked Apple-like depth, glass specular highlight, rolling number, heart pulse and dual flowing graph paths.',
    tags: ['3d', 'graph', 'dashboard', 'glass', 'apple', 'redion-inspired', 'tilt', 'analytics', 'animated'],
    source: 'seed',
    html,
    css,
    js: applePointerMotion,
  },
]
