import { describe, expect, it } from 'vitest'
import { buildDesignTypeCategories, classifyDesignType } from './designTypeCategories'
import type { CustomDesign } from './types'

const design = (id: string, name: string, category: string, tags: string[] = []): CustomDesign => ({
  id,
  name,
  category,
  description: name,
  tags,
  source: 'seed',
  html: '<div></div>',
  css: '',
})

describe('design type categories', () => {
  it('classifies by component type before visual style', () => {
    expect(classifyDesignType(design('a', '3D Glass Play Button', 'Apple Motion', ['3d', 'button']))).toBe('buttons')
    expect(classifyDesignType(design('b', 'Mechanical Toggle', 'Mechanical Controls', ['toggle', 'button']))).toBe('toggles')
    expect(classifyDesignType(design('c', 'Spatial Login', 'Apple Motion', ['login', 'glass']))).toBe('inputs')
    expect(classifyDesignType(design('d', 'Neon Spinner', '3D Objects', ['spinner']))).toBe('loaders')
    expect(classifyDesignType(design('e', 'Flow KPI Card', 'Cards & Dashboards', ['kpi', 'card']))).toBe('data')
  })

  it('places every design in exactly one category', () => {
    const designs = [
      design('a', 'Glow Button', 'Buttons', ['button']),
      design('b', 'Profile Card', 'Cards', ['card']),
      design('c', 'Search Input', 'Inputs', ['search']),
      design('d', 'Orbit Scene', '3D Objects', ['3d']),
      design('e', 'Toast Notice', 'Feedback', ['toast']),
    ]

    const categories = buildDesignTypeCategories(designs)
    const ids = categories.flatMap((category) => category.designs.map((item) => item.id))

    expect(ids).toHaveLength(designs.length)
    expect(new Set(ids).size).toBe(designs.length)
    expect(ids.sort()).toEqual(designs.map((item) => item.id).sort())
  })
})
