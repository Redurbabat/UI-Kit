import type { CustomDesign } from './types'
import { createApplePointerScript } from './motion/appleDepthPreset'
import html from './snippets/original3dGraphCard.html?raw'
import css from './snippets/original3dGraphCard.css?raw'

const applePointerMotion = createApplePointerScript({
  rootSelector: '.grid',
  surfaceSelector: '.card',
  pointerXVar: '--mx',
  pointerYVar: '--my',
  rotateXVar: '--rx',
  rotateYVar: '--ry',
  maxRotateX: 4.5,
  maxRotateY: 5.5,
  easing: 0.13,
  activeClass: 'is-pointer',
})

export const originalGraphCardSeedDesigns: CustomDesign[] = [
  {
    id: 'original-3d-graph-card',
    name: 'Apple 3D Graph Card',
    category: 'Cards & Dashboards',
    description: 'Premium analytics card with restrained motion, pointer-tracked Apple-like depth, glass specular highlight, rolling number, heart pulse and dual flowing graph paths.',
    tags: ['3d', 'graph', 'dashboard', 'glass', 'apple', 'depth', 'tilt', 'analytics', 'animated'],
    source: 'seed',
    html,
    css,
    js: applePointerMotion,
  },
]
