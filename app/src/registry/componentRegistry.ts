export type ComponentMaturity = 'stable' | 'candidate' | 'experiment'

export type ComponentFamily =
  | 'button'
  | 'toggle'
  | 'checkbox'
  | 'card'
  | 'loader'
  | 'input'
  | 'form'
  | 'pattern'
  | 'radio'
  | 'tooltip'
  | 'experimental'

export interface UiComponentDefinition {
  id: string
  name: string
  family: ComponentFamily
  category: string
  variant: string
  description: string
  tags: string[]
  maturity: ComponentMaturity
}

interface FamilyDefinition {
  family: Exclude<ComponentFamily, 'experimental'>
  category: string
  description: string
  variants: readonly [string, string][]
  tags: string[]
}

const families: FamilyDefinition[] = [
  {
    family: 'button',
    category: 'Buttons',
    description: 'Primary actions with material response, light and depth.',
    variants: [
      ['glass', 'Glass'],
      ['neon', 'Neon'],
      ['liquid', 'Liquid'],
      ['physical', 'Physical'],
      ['aurora', 'Aurora'],
    ],
    tags: ['action', 'press', 'motion'],
  },
  {
    family: 'toggle',
    category: 'Toggle switches',
    description: 'State controls with tactile movement and clear on/off feedback.',
    variants: [
      ['standard', 'Standard'],
      ['glass', 'Glass'],
      ['neon', 'Neon'],
      ['segment', 'Segment'],
      ['orb', 'Orb'],
    ],
    tags: ['state', 'settings', 'control'],
  },
  {
    family: 'checkbox',
    category: 'Checkboxes',
    description: 'Compact selection controls with distinct completion feedback.',
    variants: [
      ['default', 'Default'],
      ['round', 'Round'],
      ['glow', 'Glow'],
      ['line', 'Line'],
      ['soft', 'Soft'],
    ],
    tags: ['selection', 'form', 'state'],
  },
  {
    family: 'card',
    category: 'Cards',
    description: 'Surfaces for status, navigation and spatial content.',
    variants: [
      ['glass', 'Glass'],
      ['neon', 'Neon'],
      ['tilt', '3D Tilt'],
      ['accent', 'Accent line'],
      ['orbit', 'Orbit'],
    ],
    tags: ['surface', 'depth', 'content'],
  },
  {
    family: 'loader',
    category: 'Loaders',
    description: 'Ongoing-state indicators from quiet rings to expressive AI motion.',
    variants: [
      ['ring', 'Ring'],
      ['dual', 'Dual'],
      ['dots', 'Dots'],
      ['orb', 'AI Orb'],
      ['bars', 'Bars'],
    ],
    tags: ['loading', 'progress', 'motion'],
  },
  {
    family: 'input',
    category: 'Inputs',
    description: 'Text controls with clear focus hierarchy and different surface treatments.',
    variants: [
      ['default', 'Default'],
      ['glass', 'Glass'],
      ['neon', 'Neon'],
      ['floating', 'Floating label'],
      ['search', 'Search'],
    ],
    tags: ['form', 'text', 'focus'],
  },
  {
    family: 'form',
    category: 'Forms',
    description: 'Small composed forms demonstrating component combinations.',
    variants: [
      ['standard', 'Standard'],
      ['glass', 'Glass'],
      ['accent', 'Accent'],
      ['compact', 'Compact'],
      ['ai', 'AI'],
    ],
    tags: ['form', 'composition', 'layout'],
  },
  {
    family: 'pattern',
    category: 'Patterns',
    description: 'Background materials for surfaces and showcase areas.',
    variants: [
      ['grid', 'Grid'],
      ['dots', 'Dots'],
      ['diagonal', 'Diagonal'],
      ['orbits', 'Orbits'],
      ['aurora', 'Aurora'],
    ],
    tags: ['background', 'surface', 'texture'],
  },
  {
    family: 'radio',
    category: 'Radio buttons',
    description: 'Single-choice controls with several physical and light treatments.',
    variants: [
      ['default', 'Default'],
      ['ring', 'Ring'],
      ['glow', 'Glow'],
      ['soft', 'Soft'],
      ['pop', 'Pop'],
    ],
    tags: ['selection', 'form', 'state'],
  },
  {
    family: 'tooltip',
    category: 'Tooltips',
    description: 'Context hints with glass, glow and spatial placement variations.',
    variants: [
      ['default', 'Default'],
      ['glass', 'Glass'],
      ['neon', 'Neon'],
      ['arrow', 'Arrow'],
      ['side', 'Side'],
    ],
    tags: ['overlay', 'hint', 'information'],
  },
]

const coreComponents: UiComponentDefinition[] = families.flatMap((family) =>
  family.variants.map(([variant, name], index) => ({
    id: `${family.family}-${variant}`,
    name,
    family: family.family,
    category: family.category,
    variant,
    description: family.description,
    tags: [...family.tags, variant],
    maturity: index === 0 ? 'candidate' : 'experiment',
  })),
)

const experimentalNames = [
  ['mechanical', 'Mechanical Plunger', ['3d', 'physical', 'press']],
  ['cube', 'Cube', ['3d', 'perspective', 'object']],
  ['jelly', 'Jelly', ['playful', 'morph', 'soft']],
  ['orbit', 'Orbit', ['space', 'energy', 'continuous']],
  ['magnetic', 'Magnetic', ['pointer', 'follow', 'interactive']],
  ['hologram', 'Hologram', ['scanline', 'ai', 'light']],
  ['folder', 'Folder', ['files', 'fold', '3d']],
  ['arcade', 'Arcade', ['physical', 'game', 'press']],
  ['crystal', 'Crystal', ['material', 'glass', 'shape']],
  ['flip', 'Flip', ['3d', 'reveal', 'two-state']],
  ['split', 'Split', ['mechanical', 'reveal', '3d']],
  ['bubble', 'Bubble', ['organic', 'morph', 'playful']],
  ['ticket', 'Ticket', ['shape', 'entry', 'playful']],
  ['space-door', 'Space Door', ['3d', 'door', 'reveal']],
  ['lever', 'Lever', ['mechanical', 'switch', 'physical']],
  ['capsule', 'Capsule', ['shape', 'physical', 'playful']],
  ['stacked', 'Stacked', ['depth', 'press', 'layers']],
  ['wave', 'Liquid Wave', ['liquid', 'motion', 'fill']],
  ['eye', 'Eye', ['playful', 'tracking', 'character']],
  ['portal', 'Portal', ['energy', 'space', 'ai']],
] as const

const experimentalComponents: UiComponentDefinition[] = experimentalNames.map(
  ([variant, name, tags]) => ({
    id: `experimental-${variant}`,
    name,
    family: 'experimental',
    category: '3D Button Lab',
    variant,
    description: 'A deliberately non-standard control exploring physicality, character and spatial interaction.',
    tags: ['button', 'experimental', ...tags],
    maturity: 'experiment',
  }),
)

export const componentRegistry: UiComponentDefinition[] = [
  ...coreComponents,
  ...experimentalComponents,
]

export const componentCategories = Array.from(
  new Set(componentRegistry.map((component) => component.category)),
)

export function searchComponents(query: string): UiComponentDefinition[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return componentRegistry

  return componentRegistry.filter((component) => {
    const haystack = [
      component.name,
      component.category,
      component.variant,
      component.description,
      ...component.tags,
    ]
      .join(' ')
      .toLocaleLowerCase()

    return haystack.includes(normalized)
  })
}
