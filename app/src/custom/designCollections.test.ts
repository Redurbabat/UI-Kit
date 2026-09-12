import { describe, expect, it } from 'vitest'
import './registerFunSeeds'
import { buildDesignCollections } from './designCollections'
import { seedDesigns } from './seedDesigns'

describe('design collections', () => {
  it('assigns every built-in seed to exactly one collection', () => {
    const collections = buildDesignCollections(seedDesigns)
    const assigned = collections.flatMap((collection) => collection.designs)
    const ids = assigned.map((design) => design.id)

    expect(assigned).toHaveLength(seedDesigns.length)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(ids)).toEqual(new Set(seedDesigns.map((design) => design.id)))
  })

  it('keeps the main collection rooms available', () => {
    const collections = buildDesignCollections(seedDesigns)
    const ids = collections.map((collection) => collection.id)

    expect(ids).toContain('motion')
    expect(ids).toContain('music')
    expect(ids).toContain('spatial')
    expect(ids).toContain('workshop')
  })
})
