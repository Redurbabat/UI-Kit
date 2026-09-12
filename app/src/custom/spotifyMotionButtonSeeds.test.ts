import { describe, expect, it } from 'vitest'
import { spotifyMotionButtonSeedDesigns } from './spotifyMotionButtonSeeds'

describe('spotify motion button seeds', () => {
  it('ships six unique music button designs', () => {
    expect(spotifyMotionButtonSeedDesigns).toHaveLength(6)
    expect(new Set(spotifyMotionButtonSeedDesigns.map((design) => design.id)).size).toBe(6)
  })

  it('keeps every design in the Music Buttons family with motion code', () => {
    for (const design of spotifyMotionButtonSeedDesigns) {
      expect(design.category).toBe('Music Buttons')
      expect(design.html).toContain('data-spfx')
      expect(design.css).toContain('.spfx-button')
      expect(design.js).toContain("querySelectorAll('[data-spfx]')")
    }
  })
})
