import type { CustomDesign } from './types'

export type DesignTypeId =
  | 'buttons'
  | 'cards'
  | 'inputs'
  | 'toggles'
  | 'loaders'
  | 'navigation'
  | 'overlays'
  | 'tables'
  | 'progress'
  | 'profiles'
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

const identityOf = (design: CustomDesign) =>
  [design.id, design.name, design.category].join(' ').toLocaleLowerCase()

const fullTextOf = (design: CustomDesign) =>
  [design.id, design.name, design.category, design.description, ...design.tags]
    .join(' ')
    .toLocaleLowerCase()

const contains = (text: string, words: string[]) => words.some((word) => text.includes(word))

export function classifyDesignType(design: CustomDesign): DesignTypeId {
  const identity = identityOf(design)
  const text = fullTextOf(design)

  // Explicit component identity wins over visual/style labels.
  if (contains(identity, ['toggle', 'switch', 'checkbox', 'radio'])) return 'toggles'
  if (contains(identity, ['loader', 'spinner', 'loading', 'skeleton'])) return 'loaders'
  if (contains(identity, ['login', 'sign in', 'form', 'input', 'search', 'field', 'textarea', 'select', 'password', 'slider'])) return 'inputs'
  if (contains(identity, ['modal', 'dialog', 'popover', 'tooltip', 'drawer', 'sheet', 'overlay', 'command palette'])) return 'overlays'
  if (contains(identity, ['table', 'list', 'kanban', 'row', 'inbox', 'activity feed'])) return 'tables'
  if (contains(identity, ['progress', 'stepper', 'steps', 'timeline step', 'completion', 'wizard'])) return 'progress'
  if (contains(identity, ['avatar', 'profile', 'user chip', 'presence', 'member stack'])) return 'profiles'
  if (contains(identity, ['navigation', 'navbar', 'menu', 'tabs', 'breadcrumb', 'pagination', 'sidebar', 'dock'])) return 'navigation'
  if (contains(identity, ['button', 'buttons', ' btn ', 'cta'])) return 'buttons'
  if (contains(identity, ['card', 'cards', 'ticket', 'pricing', 'tile'])) return 'cards'
  if (contains(identity, ['dashboard', 'analytics', 'metric', 'kpi', 'graph', 'chart', 'data'])) return 'data'
  if (contains(identity, ['media', 'player', 'album', 'video', 'photo', 'audio'])) return 'media'
  if (contains(identity, ['mechanical', 'device', 'gear', 'printer', 'reactor', 'knob', 'dial', 'lever', 'filament'])) return 'mechanical'
  if (contains(identity, ['feedback', 'toast', 'alert', 'badge', 'status', 'notification'])) return 'feedback'
  if (contains(identity, ['3d', 'spatial', 'carousel', 'orbit', 'hologram', 'cube', 'portal', 'scene', 'window'])) return 'spatial'

  // Fallbacks use description/tags only when the name/category did not identify a component type.
  if (contains(text, ['toggle', 'switch', 'checkbox', 'radio'])) return 'toggles'
  if (contains(text, ['loader', 'spinner', 'loading', 'skeleton'])) return 'loaders'
  if (contains(text, ['login', 'form', 'input', 'search', 'textarea', 'select', 'password'])) return 'inputs'
  if (contains(text, ['modal', 'dialog', 'popover', 'tooltip', 'drawer', 'sheet', 'overlay'])) return 'overlays'
  if (contains(text, ['table', 'list', 'kanban', 'row', 'inbox', 'activity feed'])) return 'tables'
  if (contains(text, ['progress', 'stepper', 'steps', 'completion', 'wizard'])) return 'progress'
  if (contains(text, ['avatar', 'profile', 'presence', 'member'])) return 'profiles'
  if (contains(text, ['button', 'cta'])) return 'buttons'
  if (contains(text, ['card', 'ticket'])) return 'cards'
  if (contains(text, ['navigation', 'menu', 'tabs', 'sidebar', 'dock'])) return 'navigation'
  if (contains(text, ['dashboard', 'analytics', 'metric', 'kpi', 'graph', 'chart'])) return 'data'
  if (contains(text, ['media', 'music', 'player', 'album', 'video', 'photo', 'audio'])) return 'media'
  if (contains(text, ['mechanical', 'device', 'gear', 'printer', 'knob', 'dial'])) return 'mechanical'
  if (contains(text, ['feedback', 'toast', 'alert', 'badge', 'status', 'notification', 'success', 'error'])) return 'feedback'
  if (contains(text, ['3d', 'spatial', 'carousel', 'orbit', 'hologram', 'cube', 'scene', 'window'])) return 'spatial'

  return 'other'
}

const META: Array<Omit<DesignTypeCategory, 'designs'>> = [
  { id: 'buttons', label: 'Buttons', description: 'Alle Buttons an einem Ort – unabhängig von 3D, Glass, Spotify, Glow oder Stil.' },
  { id: 'cards', label: 'Cards', description: 'Alle Cards an einem Ort – auch Graph-, KPI-, 3D- oder Glass-Cards.' },
  { id: 'inputs', label: 'Inputs & Forms', description: 'Login, Suche, Inputs, Formulare, Selects und Eingabeelemente.' },
  { id: 'toggles', label: 'Toggles', description: 'Switches, Toggles, Checkboxen und binäre Controls.' },
  { id: 'loaders', label: 'Loaders', description: 'Spinner, Loader, Loading-States und Fortschrittsanzeigen.' },
  { id: 'navigation', label: 'Navigation', description: 'Menüs, Tabs, Sidebars, Docks und Navigationsmuster.' },
  { id: 'overlays', label: 'Modals & Overlays', description: 'Dialoge, Popovers, Tooltips, Drawers und schwebende Bedienflächen.' },
  { id: 'tables', label: 'Tables & Lists', description: 'Tabellen, Listen, Kanban-Ansichten, Inbox-Reihen und strukturierte Sammlungen.' },
  { id: 'progress', label: 'Progress & Steps', description: 'Fortschritt, Stepper, Wizards und mehrstufige Abläufe.' },
  { id: 'profiles', label: 'Avatars & Profiles', description: 'Avatare, Profile, Presence, Member-Stacks und Identitätsbausteine.' },
  { id: 'data', label: 'Dashboards & Data', description: 'Dashboards, Graphen, Charts und Analytics-Flächen, sofern sie keine Card sind.' },
  { id: 'media', label: 'Media', description: 'Player, Audio, Video, Album- und Medienoberflächen.' },
  { id: 'spatial', label: '3D & Spatial', description: 'Räumliche Szenen, Carousels und 3D-Objekte, die kein anderer UI-Typ sind.' },
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
