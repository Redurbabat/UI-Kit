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

  it('classifies every new design into a concrete component type', () => {
    const counts = new Map<string, number>()
    for (const design of newWave) {
      const type = classifyDesignType(design)
      expect(type).not.toBe('other')
      counts.set(type, (counts.get(type) ?? 0) + 1)
    }

    expect(counts.get('buttons')).toBe(3)
    expect(counts.get('cards')).toBe(3)
    expect(counts.get('inputs')).toBe(4)
    expect(counts.get('toggles')).toBe(2)
    expect(counts.get('loaders')).toBe(2)
    expect(counts.get('navigation')).toBe(3)
    expect(counts.get('data')).toBe(3)
    expect(counts.get('media')).toBe(2)
    expect(counts.get('spatial')).toBe(3)
    expect(counts.get('mechanical')).toBe(3)
    expect(counts.get('feedback')).toBe(2)
  })
})
