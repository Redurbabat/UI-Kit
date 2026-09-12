import { seedDesigns } from './seedDesigns'
import { funSeedDesigns } from './funSeedDesigns'
import { rotatingCardSeedDesigns } from './rotatingCardSeeds'

const existing = new Set(seedDesigns.map((design) => design.id))

for (const design of [...funSeedDesigns, ...rotatingCardSeedDesigns]) {
  if (!existing.has(design.id)) {
    seedDesigns.push(design)
    existing.add(design.id)
  }
}
