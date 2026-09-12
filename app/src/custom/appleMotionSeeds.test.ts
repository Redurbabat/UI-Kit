import { describe, expect, it } from 'vitest'
import { appleMotionSeedDesigns } from './appleMotionSeeds'

describe('Apple motion collection', () => {
  it('ships six unique reusable designs', () => {
    expect(appleMotionSeedDesigns).toHaveLength(6)
    expect(new Set(appleMotionSeedDesigns.map((design) => design.id)).size).toBe(6)
  })

  it('keeps every preview self contained', () => {
    for (const design of appleMotionSeedDesigns) {
      expect(design.category).toBe('Apple Motion')
      expect(design.html).toContain('data-apple-depth')
      expect(design.css).toContain('[data-apple-depth]')
      expect(design.js).toContain('pointermove')
    }
  })
})
