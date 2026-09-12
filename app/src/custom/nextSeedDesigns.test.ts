import { describe, expect, it } from 'vitest'
import { nextCategories, nextSeedDesigns } from './nextSeedDesigns'

describe('objects and physics design pack', () => {
  it('contains 70 designs', () => {
    expect(nextSeedDesigns).toHaveLength(70)
  })

  it('contains 7 categories with 10 designs each', () => {
    expect(nextCategories).toHaveLength(7)
    for (const category of nextCategories) {
      expect(nextSeedDesigns.filter((design) => design.category === category)).toHaveLength(10)
    }
  })

  it('has unique ids', () => {
    const ids = nextSeedDesigns.map((design) => design.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
