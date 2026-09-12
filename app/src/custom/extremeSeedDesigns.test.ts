import { describe, expect, it } from 'vitest'
import { extremeCategories, extremeSeedDesigns } from './extremeSeedDesigns'

describe('Extreme 100 design registry', () => {
  it('contains exactly 100 designs', () => {
    expect(extremeSeedDesigns).toHaveLength(100)
  })

  it('contains 10 categories with 10 designs each', () => {
    expect(extremeCategories).toHaveLength(10)

    for (const category of extremeCategories) {
      expect(extremeSeedDesigns.filter((design) => design.category === category)).toHaveLength(10)
    }
  })

  it('uses unique ids and copy-ready code', () => {
    const ids = extremeSeedDesigns.map((design) => design.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const design of extremeSeedDesigns) {
      expect(design.html.trim().length).toBeGreaterThan(0)
      expect(design.css.trim().length).toBeGreaterThan(0)
      expect(design.tags).toContain('extreme-100')
    }
  })
})
