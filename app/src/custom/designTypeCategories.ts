import type { CustomDesign } from './types'

export type DesignTypeId =
  | 'buttons'
  | 'cards'
  | 'inputs'
  | 'toggles'
  | 'loaders'
  | 'navigation'
  | 'data'
  | 'media'
  | 'spatial'
  | 'mechanical'
  | 'feedback'
  | 'other'

export interface DesignTypeCategory {
  id: DesignTypeId
  label: string
  description: string
  designs: CustomDesign[]
}

const normalize = (design: CustomDesign) =>
  [design.id, design.name, design.category, design.description, ...design.tags]
    .join(' ')
    .toLocaleLowerCase()

const contains = (text: string, words: string[]) => words.some((word) => text.includes(word))

export function classifyDesignType(design: CustomDesign): DesignTypeId {
  const text = normalize(design)

  if (contains(text, ['toggle', 'switch', 'checkbox', 'radio'])) return 'toggles'
  if (contains(text, ['loader', 'spinner', 'loading', 'skeleton', 'progress ring'])) return 'loaders'
  if (contains(text, ['login', 'sign in', 'form', 'input', 'search', 'field', 'textarea', 'select', 'password', 'slider'])) return 'inputs'
  if (contains(text, ['navigation', 'navbar', ' nav ', 'menu', 'tabs', 'breadcrumb', 'pagination', 'sidebar', 'dock'])) return 'navigation'
  if (contains(text, ['dashboard', 'analytics', 'metric', 'kpi', 'graph', 'chart', 'stat card', 'data card'])) return 'data'

  // Component type wins over visual style: a 3D/glass/music button is still a button.
  if (contains(text, ['button', ' btn ', 'cta', 'play control', 'follow control', 'shuffle control', 'like control', 'queue control'])) return 'buttons'

  if (contains(text, ['card', 'ticket', 'profile', 'pricing', 'product tile', 'id card'])) return 'cards'
  if (contains(text, ['media', 'music', 'player', 'album', 'video', 'photo', 'audio'])) return 'media'
  if (contains(text, ['3d', 'spatial', 'carousel', 'orbit', 'hologram', 'cube', 'portal', 'scene', 'window'])) return 'spatial'
  if (contains(text, ['mechanical', 'device', 'gear', 'printer', 'reactor', 'knob', 'dial', 'lever', 'filament'])) return 'mechanical'
  if (contains(text, ['feedback', 'toast', 'alert', 'badge', 'status', 'notification', 'success', 'error'])) return 'feedback'

  return 'other'
}

const META: Array<Omit<DesignTypeCategory, 'designs'>> = [
  { id: 'buttons', label: 'Buttons', description: 'Alle Buttons an einem Ort – unabhängig von 3D, Glass, Spotify, Glow oder Stil.' },
  { id: 'cards', label: 'Cards', description: 'Cards, Tickets, Profile und andere eigenständige Inhaltsflächen.' },
  { id: 'inputs', label: 'Inputs & Forms', description: 'Login, Suche, Inputs, Formulare, Selects und Eingabeelemente.' },
  { id: 'toggles', label: 'Toggles', description: 'Switches, Toggles, Checkboxen und binäre Controls.' },
  { id: 'loaders', label: 'Loaders', description: 'Spinner, Loader, Loading-States und Fortschrittsanzeigen.' },
  { id: 'navigation', label: 'Navigation', description: 'Menüs, Tabs, Sidebars, Docks und Navigationsmuster.' },
  { id: 'data', label: 'Dashboards & Data', description: 'KPI, Graphen, Charts, Metrics und Analytics-Komponenten.' },
  { id: 'media', label: 'Media', description: 'Player, Audio, Video, Album- und Medienoberflächen.' },
  { id: 'spatial', label: '3D & Spatial', description: 'Carousels, räumliche Szenen, Hologramme und 3D-Objekte.' },
  { id: 'mechanical', label: 'Mechanical & Devices', description: 'Mechanische Controls, Geräte, Knobs, Dials und physische UI-Metaphern.' },
  { id: 'feedback', label: 'Feedback & Status', description: 'Alerts, Status, Badges, Notifications und Rückmeldungen.' },
  { id: 'other', label: 'Other', description: 'Experimente, die keinem klaren UI-Bauteil zugeordnet werden können.' },
]

export function buildDesignTypeCategories(designs: CustomDesign[]): DesignTypeCategory[] {
  const buckets = new Map<DesignTypeId, CustomDesign[]>()
  for (const meta of META) buckets.set(meta.id, [])

  for (const design of designs) {
    buckets.get(classifyDesignType(design))?.push(design)
  }

  return META
    .map((meta) => ({ ...meta, designs: buckets.get(meta.id) ?? [] }))
    .filter((category) => category.designs.length > 0)
}
