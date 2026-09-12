import { describe, expect, it } from 'vitest'
import { extremeCategories, extremeSeedDesigns } from './extremeSeedDesigns'
import { nextCategories, nextSeedDesigns } from './nextSeedDesigns'

const all = [...extremeSeedDesigns, ...nextSeedDesigns]
const categories = [...extremeCategories, ...nextCategories]

describe('complete extreme lab', () => {
  it('contains exactly 170 live designs', () => {
    expect(all).toHaveLength(170)
  })

  it('contains exactly 17 categories', () => {
    expect(categories).toHaveLength(17)
  })

  it('contains 10 designs in every category', () => {
    for (const category of categories) {
      expect(all.filter((design) => design.category === category)).toHaveLength(10)
    }
  })

  it('keeps all ids unique across packs', () => {
    const ids = all.map((design) => design.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
