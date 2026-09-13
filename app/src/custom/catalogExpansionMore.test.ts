import { describe, expect, it } from 'vitest'
import { catalogExpansionA } from './catalogExpansionA'
import { catalogExpansionB } from './catalogExpansionB'
import { catalogExpansionC } from './catalogExpansionC'
import { catalogExpansionD } from './catalogExpansionD'
import { catalogExpansionE } from './catalogExpansionE'
import { catalogExpansionF } from './catalogExpansionF'
import { classifyDesignType } from './designTypeCategories'

const newWave = [...catalogExpansionD, ...catalogExpansionE, ...catalogExpansionF]
const allExpansion = [
  ...catalogExpansionA,
  ...catalogExpansionB,
  ...catalogExpansionC,
  ...newWave,
]

describe('second catalog expansion wave', () => {
  it('adds 30 unique designs', () => {
    expect(newWave).toHaveLength(30)
    expect(new Set(newWave.map((design) => design.id)).size).toBe(30)
  })

  it('keeps all expansion ids unique across A-F', () => {
    expect(allExpansion).toHaveLength(57)
    expect(new Set(allExpansion.map((design) => design.id)).size).toBe(57)
  })

  it('classifies every new design into a concrete component family', () => {
    const types = new Set<string>()

    for (const design of newWave) {
      const type = classifyDesignType(design)
      expect(type).not.toBe('other')
      types.add(type)
    }

    for (const required of ['buttons', 'cards', 'inputs', 'toggles', 'loaders', 'navigation', 'data', 'media', 'spatial', 'mechanical', 'feedback']) {
      expect(types.has(required)).toBe(true)
    }
  })
})
