import { describe, expect, it } from 'vitest'
import { catalogExpansionA } from './catalogExpansionA'
import { catalogExpansionB } from './catalogExpansionB'
import { catalogExpansionC } from './catalogExpansionC'
import { classifyDesignType } from './designTypeCategories'

const designs = [...catalogExpansionA, ...catalogExpansionB, ...catalogExpansionC]

describe('catalog expansion', () => {
  it('contains 27 unique designs', () => {
    expect(designs).toHaveLength(27)
    expect(new Set(designs.map((design) => design.id)).size).toBe(27)
  })

  it('classifies every design into a concrete component family', () => {
    const types = new Set<string>()

    for (const design of designs) {
      const type = classifyDesignType(design)
      expect(type).not.toBe('other')
      types.add(type)
    }

    for (const required of ['buttons', 'cards', 'inputs', 'toggles', 'loaders', 'navigation', 'data', 'media', 'spatial', 'mechanical', 'feedback']) {
      expect(types.has(required)).toBe(true)
    }
  })
})
