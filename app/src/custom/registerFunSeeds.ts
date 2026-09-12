import { seedDesigns } from './seedDesigns'
import { funSeedDesigns } from './funSeedDesigns'

const existing = new Set(seedDesigns.map((design) => design.id))

for (const design of funSeedDesigns) {
  if (!existing.has(design.id)) {
    seedDesigns.push(design)
    existing.add(design.id)
  }
}
