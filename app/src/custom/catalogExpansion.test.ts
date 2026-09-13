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

  it('covers the main component categories without falling into Other', () => {
    const counts = new Map<string, number>()
    for (const design of designs) {
      const type = classifyDesignType(design)
      counts.set(type, (counts.get(type) ?? 0) + 1)
      expect(type).not.toBe('other')
    }

    expect(counts.get('buttons')).toBe(4)
    expect(counts.get('cards')).toBe(4)
    expect(counts.get('inputs')).toBe(3)
    expect(counts.get('toggles')).toBe(2)
    expect(counts.get('loaders')).toBe(2)
    expect(counts.get('navigation')).toBe(2)
    expect(counts.get('data')).toBe(2)
    expect(counts.get('media')).toBe(2)
    expect(counts.get('spatial')).toBe(2)
    expect(counts.get('mechanical')).toBe(2)
    expect(counts.get('feedback')).toBe(2)
  })
})
