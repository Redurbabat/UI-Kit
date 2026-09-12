import { describe, expect, it } from 'vitest'
import { extremeCategories, extremeSeedDesigns } from './extremeSeedDesigns'
import { nextCategories, nextSeedDesigns } from './nextSeedDesigns'
import { finalCategories, finalSeedDesigns } from './finalSeedDesigns'

const all = [...extremeSeedDesigns, ...nextSeedDesigns, ...finalSeedDesigns]
const categories = [...extremeCategories, ...nextCategories, ...finalCategories]

describe('complete extreme lab', () => {
  it('contains exactly 200 live designs', () => {
    expect(all).toHaveLength(200)
  })

  it('contains exactly 20 categories', () => {
    expect(categories).toHaveLength(20)
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
