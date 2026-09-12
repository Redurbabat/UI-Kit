import type { CustomDesign } from './types'

export type DesignCollectionId =
  | 'motion'
  | 'music'
  | 'spatial'
  | 'workshop'
  | 'other'

export interface DesignCollection {
  id: DesignCollectionId
  label: string
  title: string
  description: string
  tags: string[]
  designs: CustomDesign[]
}

const categoryIncludes = (design: CustomDesign, values: string[]) => {
  const category = design.category.toLocaleLowerCase()
  return values.some((value) => category.includes(value))
}

const hasTag = (design: CustomDesign, values: string[]) => {
  const tags = design.tags.map((tag) => tag.toLocaleLowerCase())
  return values.some((value) => tags.includes(value))
}

export function buildDesignCollections(designs: CustomDesign[]): DesignCollection[] {
  const buckets: Record<DesignCollectionId, CustomDesign[]> = {
    motion: [],
    music: [],
    spatial: [],
    workshop: [],
    other: [],
  }

  for (const design of designs) {
    if (design.category === 'Apple Motion') {
      buckets.motion.push(design)
      continue
    }

    if (categoryIncludes(design, ['music']) || hasTag(design, ['music', 'spotify-inspired', 'spotify'])) {
      buckets.music.push(design)
      continue
    }

    if (
      categoryIncludes(design, ['3d', 'card', 'dashboard']) ||
      hasTag(design, ['3d', 'carousel', 'dashboard', 'kpi', 'spatial'])
    ) {
      buckets.spatial.push(design)
      continue
    }

    if (
      categoryIncludes(design, ['mechanical', 'loader', 'tree', 'navigation', 'toggle', 'button']) ||
      hasTag(design, ['mechanical', 'loader', 'physics', 'toy', 'fun', 'button'])
    ) {
      buckets.workshop.push(design)
      continue
    }

    buckets.other.push(design)
  }

  const collections: DesignCollection[] = [
    {
      id: 'motion',
      label: 'Motion Gallery',
      title: 'Apple Depth & spatial motion',
      description: 'Ruhige Glasflächen, Pointer-Light, Depth und kontrollierte 3D-Bewegung.',
      tags: ['glass', 'depth', 'pointer light'],
      designs: buckets.motion,
    },
    {
      id: 'music',
      label: 'Music Room',
      title: 'Music controls',
      description: 'Play, Follow, Shuffle, Like, Queue und Device mit Licht, Blur und Press-Travel.',
      tags: ['music', 'controls', 'micro interaction'],
      designs: buckets.music,
    },
    {
      id: 'spatial',
      label: 'Spatial Gallery',
      title: '3D, cards & dashboards',
      description: 'Räumliche Karten, Graphs, Carousels und Dashboard-Flächen mit Perspektive.',
      tags: ['3d', 'cards', 'dashboard'],
      designs: buckets.spatial,
    },
    {
      id: 'workshop',
      label: 'Workshop',
      title: 'Mechanical, tactile & fun',
      description: 'Mechanische Controls, Loader, Buttons und spielerische Interaktionen.',
      tags: ['mechanical', 'tactile', 'fun'],
      designs: buckets.workshop,
    },
    {
      id: 'other',
      label: 'Experiment Shelf',
      title: 'Other experiments',
      description: 'Alle übrigen Built-ins, die keiner spezialisierten Sammlung angehören.',
      tags: ['experimental', 'misc'],
      designs: buckets.other,
    },
  ]

  return collections.filter((collection) => collection.designs.length > 0)
}
