import { useEffect, useMemo, useState } from 'react'
import { TypeCatalog } from './components/custom/TypeCatalog'
import { CustomDesignCard } from './components/custom/CustomDesignCard'
import { CustomDesignDetail } from './components/custom/CustomDesignDetail'
import { CustomDesignStudio } from './components/custom/CustomDesignStudio'
import { CustomPreview } from './components/custom/CustomPreview'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { buildDesignTypeCategories } from './custom/designTypeCategories'
import { extremeSeedDesigns } from './custom/extremeSeedDesigns'
import { finalSeedDesigns } from './custom/finalSeedDesigns'
import { nextSeedDesigns } from './custom/nextSeedDesigns'
import { seedDesigns } from './custom/seedDesigns'
import { loadUserDesigns, saveUserDesigns } from './custom/storage'
import type { CustomDesign } from './custom/types'
import { componentCategories, componentRegistry } from './registry/componentRegistry'

const ALL = 'Alle Designs'
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
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL)
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

  const counts = useMemo(() => {
    const values = new Map<string, number>()
    for (const component of componentRegistry) {
      values.set(component.category, (values.get(component.category) ?? 0) + 1)
    }
    return values
  }, [])

  const visibleComponents = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return componentRegistry.filter((component) => {
      const categoryMatch = activeCategory === ALL || component.category === activeCategory
      if (!categoryMatch) return false
      if (!normalized) return true
      const haystack = [component.name, component.category, component.variant, component.description, ...component.tags]
        .join(' ')
        .toLocaleLowerCase()
      return haystack.includes(normalized)
    })
  }, [activeCategory, query])

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
          <a href="#library">Registry</a>
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
              <p>Die Startseite bleibt ruhig. Erst danach beginnt der vollständige Katalog.</p>
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

        <section className="library structured-section technical-registry" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Developer registry</span>
              <h2>Technischer Komponentenbestand.</h2>
              <p>Die Registry bleibt separat für stabile, strukturierte Komponenten und deren Varianten.</p>
            </div>
            <label className="search-field">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Registry durchsuchen …" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
            </label>
          </div>

          <div className="library-layout">
            <aside className="category-nav" aria-label="Registry-Kategorien">
              <button className={activeCategory === ALL ? 'active' : ''} type="button" onClick={() => setActiveCategory(ALL)}><span>{ALL}</span><b>{componentRegistry.length}</b></button>
              {componentCategories.map((category) => (
                <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>
                  <span>{category}</span><b>{counts.get(category) ?? 0}</b>
                </button>
              ))}
            </aside>

            <div className="component-list">
              <div className="result-bar"><div><strong>{activeCategory}</strong><span>{visibleComponents.length} Designs</span></div><span className="result-hint">Preview · Interact · Get code</span></div>
              <div className="design-gallery">
                {visibleComponents.length > 0 ? visibleComponents.map((component, index) => (
                  <ComponentShowcase key={component.id} component={component} index={index} onGetCode={() => { window.location.hash = `/component/${encodeURIComponent(component.id)}` }} />
                )) : (
                  <div className="empty-state"><span>⌕</span><h3>Nichts gefunden</h3><p>Versuche einen anderen Suchbegriff oder eine andere Kategorie.</p></div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <span className="section-kicker">Simple structure</span>
          <h2>Highlights oben. Kategorien darunter. Alles an seinem Platz.</h2>
          <p>Neue Designs landen automatisch nach ihrem UI-Typ im passenden Bereich. Deine eigenen Designs werden genauso einsortiert.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer"><span>RED UI KIT</span><span>Organized component archive for BABAT RED and experiments.</span></footer>
    </div>
  )
}
