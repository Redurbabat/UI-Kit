import { useEffect, useMemo, useState } from 'react'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { CustomDesignCard } from './components/custom/CustomDesignCard'
import { CustomDesignDetail } from './components/custom/CustomDesignDetail'
import { CustomDesignStudio } from './components/custom/CustomDesignStudio'
import { CustomPreview } from './components/custom/CustomPreview'
import { ExtremeLab } from './components/custom/ExtremeLab'
import { componentCategories, componentRegistry } from './registry/componentRegistry'
import { extremeSeedDesigns } from './custom/extremeSeedDesigns'
import { nextSeedDesigns } from './custom/nextSeedDesigns'
import { finalSeedDesigns } from './custom/finalSeedDesigns'
import { seedDesigns } from './custom/seedDesigns'
import { loadUserDesigns, saveUserDesigns } from './custom/storage'
import type { CustomDesign } from './custom/types'

const ALL = 'Alle Designs'
const FEATURED_IDS = [
  'apple-glass-stat-card',
  'original-3d-graph-card',
  'red-flowing-kpi-card-row',
  'extreme-rotating-3d-card-ring',
  'apple-spatial-login',
  'apple-control-center-panel',
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

export function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('3D Button Lab')
  const [route, setRoute] = useState<Route>(() => routeFromHash())
  const [userDesigns, setUserDesigns] = useState<CustomDesign[]>(() => loadUserDesigns())
  const [showAllSeeds, setShowAllSeeds] = useState(false)

  useEffect(() => {
    const syncHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const customDesigns = useMemo(() => [...seedDesigns, ...userDesigns], [userDesigns])
  const allCustomDesigns = useMemo(
    () => [...customDesigns, ...extremeSeedDesigns, ...nextSeedDesigns, ...finalSeedDesigns],
    [customDesigns],
  )

  const heroDesign = useMemo(
    () => seedDesigns.find((design) => design.id === 'apple-glass-stat-card') ?? seedDesigns[0] ?? null,
    [],
  )

  const featuredDesigns = useMemo(() => {
    const byId = new Map(seedDesigns.map((design) => [design.id, design]))
    return FEATURED_IDS.map((id) => byId.get(id)).filter((design): design is CustomDesign => Boolean(design))
  }, [])

  const appleMotionDesigns = useMemo(
    () => seedDesigns.filter((design) => design.category === 'Apple Motion'),
    [],
  )

  const visibleSeedDesigns = showAllSeeds ? seedDesigns : seedDesigns.slice(0, 8)

  const selectedComponent = useMemo(
    () => route.kind === 'component' ? componentRegistry.find((component) => component.id === route.id) ?? null : null,
    [route],
  )

  const selectedCustom = useMemo(
    () => route.kind === 'custom' ? allCustomDesigns.find((design) => design.id === route.id) ?? null : null,
    [route, allCustomDesigns],
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

  const chooseCategory = (category: string) => {
    setActiveCategory(category)
    scrollTo('library')
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
          <a href="#explore">Explore</a>
          <a href="#motion">Motion</a>
          <a href="#my-designs">My Designs</a>
          <a href="#extreme-lab">Extreme</a>
          <a href="#library">Library</a>
        </nav>
        <div className="topbar-actions">
          <button className="add-design-top" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add design</button>
          <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section hero-section--structured">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Component playground</span>
            <h1>Eine Library für UI, <em>Motion & Experimente.</em></h1>
            <p>
              Nicht mehr alles in einem Block: kuratierte Designs, Apple Motion, eigene Experimente,
              Extreme Lab und die klassische Component Library haben jetzt klare Bereiche.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollTo('explore')} className="hero-primary">Explore starten <span>↘</span></button>
              <button type="button" onClick={() => { window.location.hash = '/studio' }} className="hero-secondary">Eigenes Design +</button>
            </div>
            <div className="hero-stats" aria-label="Statistik">
              <div><strong>{componentRegistry.length + allCustomDesigns.length}</strong><span>Designs</span></div>
              <div><strong>{seedDesigns.length}</strong><span>Built-in</span></div>
              <div><strong>{userDesigns.length}</strong><span>Saved</span></div>
            </div>
          </div>

          {heroDesign && (
            <div className="hero-live-card">
              <div className="preview-toolbar">
                <span><i /> Live component</span>
                <span className="preview-id">{heroDesign.category}</span>
              </div>
              <div className="hero-live-stage">
                <CustomPreview design={heroDesign} />
              </div>
              <div className="hero-live-meta">
                <div><span>Featured</span><strong>{heroDesign.name}</strong></div>
                <button type="button" onClick={() => openDesign(heroDesign.id)}>Get code ↗</button>
              </div>
            </div>
          )}
        </section>

        <section className="site-directory" id="explore">
          <div className="library-head directory-head">
            <div>
              <span className="section-kicker">Start here</span>
              <h2>Was willst du bauen?</h2>
              <p>Die Website ist jetzt nach Aufgabe und Design-Art gegliedert.</p>
            </div>
          </div>
          <div className="directory-grid">
            <button type="button" onClick={() => scrollTo('featured')}><span>01 · Curated</span><strong>Featured designs</strong><p>Die stärksten vorhandenen Komponenten zuerst.</p><b>{featuredDesigns.length} picks</b></button>
            <button type="button" onClick={() => scrollTo('motion')}><span>02 · Motion</span><strong>Apple Motion</strong><p>Glass, Depth, Pointer Light und ruhige 3D-Bewegung.</p><b>{appleMotionDesigns.length} designs</b></button>
            <button type="button" onClick={() => scrollTo('playground-collection')}><span>03 · Playground</span><strong>Built-in experiments</strong><p>Fun, 3D, Mechanical, Loaders und ungewöhnliche UI.</p><b>{seedDesigns.length} designs</b></button>
            <button type="button" onClick={() => scrollTo('my-designs')}><span>04 · Personal</span><strong>My Designs</strong><p>Nur deine lokal gespeicherten HTML/CSS/JS-Designs.</p><b>{userDesigns.length} saved</b></button>
            <button type="button" onClick={() => scrollTo('extreme-lab')}><span>05 · Extreme</span><strong>Extreme 200</strong><p>20 Kategorien mit bewusst übertriebenen Experimenten.</p><b>200 experiments</b></button>
            <button type="button" onClick={() => chooseCategory(ALL)}><span>06 · Registry</span><strong>Component Library</strong><p>Stabile Komponenten nach Kategorie durchsuchen.</p><b>{componentRegistry.length} components</b></button>
          </div>
        </section>

        <section className="principles structure-principles" id="principles">
          <article><span>01</span><h3>Browse</h3><p>Erst kuratierte Beispiele ansehen, statt direkt in hunderte Designs einzusteigen.</p></article>
          <article><span>02</span><h3>Interact</h3><p>Live Preview, Pointer Motion, Controls und echte Zustände direkt ausprobieren.</p></article>
          <article><span>03</span><h3>Get code</h3><p>Detail-Workbench öffnen und HTML, CSS, JavaScript oder React separat kopieren.</p></article>
          <article><span>04</span><h3>Build your own</h3><p>Eigenes Design einfügen und vorhandene Motion-Presets darauf anwenden.</p></article>
        </section>

        <section className="structured-section" id="featured">
          <div className="library-head">
            <div>
              <span className="section-kicker">Featured</span>
              <h2>Gute Einstiege statt Zufall.</h2>
              <p>Eine kleine Auswahl vorhandener UI-Kit-Designs, die unterschiedliche Richtungen zeigen.</p>
            </div>
            <button className="section-link-button" type="button" onClick={() => scrollTo('playground-collection')}>Alle Built-ins ↓</button>
          </div>
          <div className="custom-design-grid structured-card-grid">
            {featuredDesigns.map((design) => (
              <CustomDesignCard key={design.id} design={design} onGetCode={() => openDesign(design.id)} />
            ))}
          </div>
        </section>

        <section className="structured-section motion-section" id="motion">
          <div className="library-head">
            <div>
              <span className="section-kicker">Motion system</span>
              <h2>Apple Depth als eigene Familie.</h2>
              <p>Dieselbe Motion-Sprache auf Stat Card, Login, Control Center, Media, App Tile und Command Palette.</p>
            </div>
            <button className="section-link-button" type="button" onClick={() => { window.location.hash = '/studio' }}>Preset benutzen +</button>
          </div>
          <div className="custom-design-grid structured-card-grid">
            {appleMotionDesigns.map((design) => (
              <CustomDesignCard key={design.id} design={design} onGetCode={() => openDesign(design.id)} />
            ))}
          </div>
        </section>

        <section className="structured-section" id="playground-collection">
          <div className="library-head">
            <div>
              <span className="section-kicker">Built-in playground</span>
              <h2>Die vorhandenen Experimente.</h2>
              <p>Seed-Designs sind jetzt von deinen persönlichen Designs getrennt. Nichts geht verloren.</p>
            </div>
            <button className="section-link-button" type="button" onClick={() => setShowAllSeeds((value) => !value)}>
              {showAllSeeds ? 'Weniger zeigen ↑' : `Alle ${seedDesigns.length} zeigen ↓`}
            </button>
          </div>
          <div className="custom-design-grid structured-card-grid">
            {visibleSeedDesigns.map((design) => (
              <CustomDesignCard key={design.id} design={design} onGetCode={() => openDesign(design.id)} />
            ))}
          </div>
        </section>

        <section className="my-designs structured-section" id="my-designs">
          <div className="library-head">
            <div>
              <span className="section-kicker">My designs</span>
              <h2>Dein eigener Bereich.</h2>
              <p>Hier stehen nur Designs, die du selbst im Studio gespeichert hast.</p>
            </div>
            <button className="hero-primary my-design-add" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add your design</button>
          </div>
          {userDesigns.length > 0 ? (
            <div className="custom-design-grid structured-card-grid">
              {userDesigns.map((design) => (
                <CustomDesignCard
                  key={design.id}
                  design={design}
                  onGetCode={() => openDesign(design.id)}
                  onDelete={() => deleteCustom(design.id)}
                />
              ))}
            </div>
          ) : (
            <div className="personal-empty">
              <span>＋</span>
              <div><strong>Noch keine eigenen Designs</strong><p>Füge HTML/CSS/JS ein oder starte mit dem Apple-Depth-Preset.</p></div>
              <button type="button" onClick={() => { window.location.hash = '/studio' }}>Design hinzufügen</button>
            </div>
          )}
        </section>

        <ExtremeLab onGetCode={openDesign} />

        <section className="library structured-section" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Component library</span>
              <h2>Die klassische Registry.</h2>
              <p>Stabile Komponenten nach Kategorie filtern, previewen und anschließend Code holen.</p>
            </div>
            <label className="search-field">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="3D, glass, neon, retro …" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
            </label>
          </div>

          <div className="library-layout">
            <aside className="category-nav" aria-label="Designkategorien">
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
                  <div className="empty-state"><span>⌕</span><h3>Nichts gefunden</h3><p>Versuche einen anderen Stil oder eine andere Kategorie.</p></div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <span className="section-kicker">One visual system</span>
          <h2>Galerie, Motion, Extreme Lab und persönliches Code-Labor.</h2>
          <p>Die vorhandenen UI-Bausteine bleiben erhalten, sind aber jetzt nach Zweck getrennt und leichter erreichbar.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer"><span>RED UI KIT</span><span>Design playground for BABAT RED and experiments.</span></footer>
    </div>
  )
}
