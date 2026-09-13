import { seedDesigns } from './seedDesigns'
import { funSeedDesigns } from './funSeedDesigns'
import { rotatingCardSeedDesigns } from './rotatingCardSeeds'
import { userSnippetSeedDesigns } from './userSnippetSeeds'
import { kpiFlowSeedDesigns } from './kpiFlowSeeds'
import { mechanicalGlassToggleSeedDesigns } from './mechanicalGlassToggleSeeds'
import { originalGraphCardSeedDesigns } from './originalGraphCardSeeds'
import { appleMotionSeedDesigns } from './appleMotionSeeds'
import { spotifyMotionButtonSeedDesigns } from './spotifyMotionButtonSeeds'
import { catalogExpansionA } from './catalogExpansionA'
import { catalogExpansionB } from './catalogExpansionB'
import { catalogExpansionC } from './catalogExpansionC'

const existing = new Set(seedDesigns.map((design) => design.id))

for (const design of [...spotifyMotionButtonSeedDesigns].reverse()) {
  if (!existing.has(design.id)) {
    seedDesigns.unshift(design)
    existing.add(design.id)
  }
}

for (const design of [
  ...funSeedDesigns,
  ...rotatingCardSeedDesigns,
  ...userSnippetSeedDesigns,
  ...kpiFlowSeedDesigns,
  ...mechanicalGlassToggleSeedDesigns,
  ...originalGraphCardSeedDesigns,
  ...appleMotionSeedDesigns,
  ...catalogExpansionA,
  ...catalogExpansionB,
  ...catalogExpansionC,
]) {
  if (!existing.has(design.id)) {
    seedDesigns.push(design)
    existing.add(design.id)
  }
}
