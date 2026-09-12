import { seedDesigns } from './seedDesigns'
import { funSeedDesigns } from './funSeedDesigns'
import { rotatingCardSeedDesigns } from './rotatingCardSeeds'
import { userSnippetSeedDesigns } from './userSnippetSeeds'
import { kpiFlowSeedDesigns } from './kpiFlowSeeds'

const existing = new Set(seedDesigns.map((design) => design.id))

for (const design of [...funSeedDesigns, ...rotatingCardSeedDesigns, ...userSnippetSeedDesigns, ...kpiFlowSeedDesigns]) {
  if (!existing.has(design.id)) {
    seedDesigns.push(design)
    existing.add(design.id)
  }
}
