import { describe, expect, it } from 'vitest'
import { catalogExpansionG } from './catalogExpansionG'
import { catalogExpansionH } from './catalogExpansionH'
import { catalogExpansionI } from './catalogExpansionI'
import { classifyDesignType } from './designTypeCategories'

const designs = [...catalogExpansionG, ...catalogExpansionH, ...catalogExpansionI]

describe('third catalog expansion wave', () => {
  it('contains 36 unique designs', () => {
    expect(designs).toHaveLength(36)
    expect(new Set(designs.map((design) => design.id)).size).toBe(36)
  })

  it('keeps every design in a real component category', () => {
    const counts = new Map<string, number>()

    for (const design of designs) {
      const type = classifyDesignType(design)
      expect(type).not.toBe('other')
      counts.set(type, (counts.get(type) ?? 0) + 1)
    }

    expect(counts.get('overlays')).toBe(6)
    expect(counts.get('tables')).toBe(6)
    expect(counts.get('progress')).toBe(6)
    expect(counts.get('profiles')).toBe(6)
    expect(counts.get('inputs')).toBe(3)
    expect(counts.get('navigation')).toBe(3)
    expect(counts.get('feedback')).toBe(2)
    expect(counts.get('data')).toBe(2)
    expect(counts.get('buttons')).toBe(1)
    expect(counts.get('cards')).toBe(1)
  })
})
