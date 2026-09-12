import type { CustomDesign } from './types'
import html from './snippets/original3dGraphCard.html?raw'
import css from './snippets/original3dGraphCard.css?raw'

export const originalGraphCardSeedDesigns: CustomDesign[] = [
  {
    id: 'original-3d-graph-card',
    name: 'Original 3D Graph Card',
    category: 'Cards & Dashboards',
    description: 'Original 3D analytics card with 15 hover zones, animated rolling number, layered glow, glare, heart pulse and dual flowing graph paths.',
    tags: ['3d', 'graph', 'dashboard', 'glow', 'tilt', 'analytics', 'animated'],
    source: 'seed',
    html,
    css,
  },
]
