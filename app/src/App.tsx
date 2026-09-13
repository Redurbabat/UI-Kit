import { useEffect, useMemo, useState } from 'react'
import { CustomDesignCard } from './components/custom/CustomDesignCard'
import { CustomDesignDetail } from './components/custom/CustomDesignDetail'
import { CustomDesignStudio } from './components/custom/CustomDesignStudio'
import { CustomPreview } from './components/custom/CustomPreview'
import { TypeCatalog } from './components/custom/TypeCatalog'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { buildDesignTypeCategories } from './custom/designTypeCategories'
import { extremeSeedDesigns } from './custom/extremeSeedDesigns'
import { finalSeedDesigns } from './custom/finalSeedDesigns'
import { nextSeedDesigns } from './custom/nextSeedDesigns'
import { seedDesigns } from './custom/seedDesigns'
import { loadUserDesigns, saveUserDesigns } from './custom/storage'
import type { CustomDesign } from './custom/types'
import { componentRegistry } from './registry/componentRegistry'

const FEATURED_IDS = [
  'apple-glass-stat-card',
  'original-3d-graph-card',
  'spotify-motion-play-button',
  'red-flowing-kpi-card-row',
  'extreme-rotating-3d-card-ring',
  'mechanical-glass-filament-toggle',
]

type Route =
  | { kind: 'gallery' }
  | { kind: 'component'; id: string }
  | { kind: 'custom'; id: string }
  | { kind: 'studio' }

function routeFromHash(): Route {
  if (window.location.hash === '#/studio') return { kind: 'studio' }
  const customMatch = window.location.hash.match(/^#\/custom\/(.+)$/)
  if (customMatch?.[1]) return { kind: 'custom', id: decodeURIComponent(customMatch[1]) }
  const componentMatch = window.location.hash.match(/^#\/component\/(.+)$/)
  if (componentMatch?.[1]) return { kind: 'component', id: decodeURIComponent(componentMatch[1]) }
  return { kind: 'gallery' }
}

function uniqueDesigns(designs: CustomDesign[]) {
  const seen = new Set<string>()
  return designs.filter((design) => {
    if (seen.has(design.id)) return false
    seen.add(design.id)
    return true
  })
}

export function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash())
  const [userDesigns, setUserDesigns] = useState<CustomDesign[]>(() => loadUserDesigns())

  useEffect(() => {
    const syncHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const catalogDesigns = useMemo(
    () => uniqueDesigns([
      ...seedDesigns,
      ...extremeSeedDesigns,
      ...nextSeedDesigns,
      ...finalSeedDesigns,
      ...userDesigns,
    ]),
    [userDesigns],
  )

  const typeCategories = useMemo(() => buildDesignTypeCategories(catalogDesigns), [catalogDesigns])

  const heroDesign = useMemo(
    () => catalogDesigns.find((design) => design.id === 'apple-glass-stat-card') ?? catalogDesigns[0] ?? null,
    [catalogDesigns],
  )

  const featuredDesigns = useMemo(() => {
    const byId = new Map(catalogDesigns.map((design) => [design.id, design]))
    return FEATURED_IDS.map((id) => byId.get(id)).filter((design): design is CustomDesign => Boolean(design))
  }, [catalogDesigns])

  const selectedComponent = useMemo(
    () => route.kind === 'component' ? componentRegistry.find((component) => component.id === route.id) ?? null : null,
    [route],
  )

  const selectedCustom = useMemo(
    () => route.kind === 'custom' ? catalogDesigns.find((design) => design.id === route.id) ?? null : null,
    [route, catalogDesigns],
  )

  const scrollTo = (id: string) => {
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const closeRoute = () => {
    window.location.hash = ''
    setRoute({ kind: 'gallery' })
  }

  const saveCustom = (design: CustomDesign) => {
    const next = [...userDesigns, design]
    setUserDesigns(next)
    saveUserDesigns(next)
    window.location.hash = `/custom/${encodeURIComponent(design.id)}`
  }

  const deleteCustom = (id: string) => {
    const next = userDesigns.filter((design) => design.id !== id)
    setUserDesigns(next)
    saveUserDesigns(next)
  }

  const openDesign = (id: string) => {
    window.location.hash = `/custom/${encodeURIComponent(id)}`
  }

  if (route.kind === 'studio') {
    return <CustomDesignStudio onSave={saveCustom} onClose={closeRoute} />
  }

  if (selectedCustom) {
    return <CustomDesignDetail design={selectedCustom} onBack={closeRoute} />
  }

  if (selectedComponent) {
    return <ComponentDetail component={selectedComponent} onBack={closeRoute} />
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="RED UI Kit Startseite">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>RED UI <b>KIT</b></span>
        </a>
        <nav className="topnav" aria-label="Hauptnavigation">
          <a href="#featured">Featured</a>
          <a href="#catalog">Categories</a>
        </nav>
        <div className="topbar-actions">
          <button className="add-design-top" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add design</button>
          <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section hero-section--structured">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Component archive</span>
            <h1>UI finden, ohne <em>lange zu suchen.</em></h1>
            <p>
              Ob Glass, 3D, Spotify, Apple oder Mechanical spielt für die Ordnung keine Rolle mehr.
              Entscheidend ist, was das Element ist: Button, Card, Input, Loader, Navigation und so weiter.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollTo('featured')} className="hero-primary">Highlights ansehen <span>↘</span></button>
              <button type="button" onClick={() => { window.location.hash = '/studio' }} className="hero-secondary">Eigenes Design +</button>
            </div>
            <div className="hero-stats" aria-label="Statistik">
              <div><strong>{catalogDesigns.length}</strong><span>Designs</span></div>
              <div><strong>{typeCategories.length}</strong><span>Categories</span></div>
              <div><strong>{userDesigns.length}</strong><span>Saved</span></div>
            </div>
          </div>

          {heroDesign && (
            <div className="hero-live-card">
              <div className="preview-toolbar">
                <span><i /> Live preview</span>
                <span className="preview-id">Featured</span>
              </div>
              <div className="hero-live-stage">
                <CustomPreview design={heroDesign} />
              </div>
              <div className="hero-live-meta">
                <div><span>Preview</span><strong>{heroDesign.name}</strong></div>
                <button type="button" onClick={() => openDesign(heroDesign.id)}>Get code ↗</button>
              </div>
            </div>
          )}
        </section>

        <section className="structured-section featured-room" id="featured">
          <div className="library-head">
            <div>
              <span className="section-kicker">Featured</span>
              <h2>Nur sechs Highlights am Anfang.</h2>
              <p>Die Startseite bleibt ruhig. Erst wenn du weiter scrollst, beginnt der vollständige Katalog.</p>
            </div>
            <button className="section-link-button" type="button" onClick={() => scrollTo('catalog')}>Alle Kategorien ↓</button>
          </div>
          <div className="custom-design-grid structured-card-grid featured-six-grid">
            {featuredDesigns.map((design) => (
              <CustomDesignCard key={design.id} design={design} onGetCode={() => openDesign(design.id)} />
            ))}
          </div>
        </section>

        <TypeCatalog designs={catalogDesigns} onOpen={openDesign} onDeleteUser={deleteCustom} />

        <section className="about" id="about">
          <span className="section-kicker">One catalog</span>
          <h2>Buttons zu Buttons. Cards zu Cards. Alles eindeutig.</h2>
          <p>Die alte doppelte Sortierung nach Stil ist aus der Hauptseite entfernt. Der Typ-Katalog ist jetzt die zentrale Galerie.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer"><span>RED UI KIT</span><span>Organized component archive for BABAT RED and experiments.</span></footer>
    </div>
  )
}
