import { useEffect, useMemo, useState } from 'react'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { CustomDesignCard } from './components/custom/CustomDesignCard'
import { CustomDesignDetail } from './components/custom/CustomDesignDetail'
import { CustomDesignStudio } from './components/custom/CustomDesignStudio'
import { CustomPreview } from './components/custom/CustomPreview'
import { DesignCollectionSection } from './components/custom/DesignCollectionSection'
import { ExtremeLab } from './components/custom/ExtremeLab'
import { buildDesignCollections } from './custom/designCollections'
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
  'spotify-premium-play-button',
  'red-flowing-kpi-card-row',
  'extreme-rotating-3d-card-ring',
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

  useEffect(() => {
    const syncHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const collections = useMemo(() => buildDesignCollections(seedDesigns), [])
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
          <a href="#explore">Rooms</a>
          <a href="#collection-motion">Motion</a>
          <a href="#collection-music">Music</a>
          <a href="#my-designs">Studio</a>
          <a href="#library">Archive</a>
        </nav>
        <div className="topbar-actions">
          <button className="add-design-top" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add design</button>
          <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section hero-section--structured">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Spatial UI archive</span>
            <h1>Ein digitales Haus für <em>UI & Motion.</em></h1>
            <p>
              Jede Design-Familie hat jetzt ihren eigenen Raum. Du läufst von Sammlung zu Sammlung,
              statt durch eine lange unsortierte Liste zu scrollen.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollTo('explore')} className="hero-primary">Rundgang starten <span>↘</span></button>
              <button type="button" onClick={() => { window.location.hash = '/studio' }} className="hero-secondary">Eigenes Design +</button>
            </div>
            <div className="hero-stats" aria-label="Statistik">
              <div><strong>{componentRegistry.length + allCustomDesigns.length}</strong><span>Designs</span></div>
              <div><strong>{collections.length}</strong><span>Collections</span></div>
              <div><strong>{userDesigns.length}</strong><span>Saved</span></div>
            </div>
          </div>

          {heroDesign && (
            <div className="hero-live-card">
              <div className="preview-toolbar">
                <span><i /> Live exhibit</span>
                <span className="preview-id">{heroDesign.category}</span>
              </div>
              <div className="hero-live-stage">
                <CustomPreview design={heroDesign} />
              </div>
              <div className="hero-live-meta">
                <div><span>Entrance exhibit</span><strong>{heroDesign.name}</strong></div>
                <button type="button" onClick={() => openDesign(heroDesign.id)}>Get code ↗</button>
              </div>
            </div>
          )}
        </section>

        <section className="site-directory" id="explore">
          <div className="library-head directory-head">
            <div>
              <span className="section-kicker">House directory</span>
              <h2>Jeder Raum hat eine Aufgabe.</h2>
              <p>Die Built-ins sind nicht mehr vermischt, sondern nach ihrer eigentlichen Funktion einsortiert.</p>
            </div>
          </div>
          <div className="directory-grid directory-grid--organized">
            <button type="button" onClick={() => scrollTo('featured')}><span>00 · Showcase</span><strong>Featured exhibition</strong><p>Eine kleine kuratierte Vitrine für den Einstieg.</p><b>{featuredDesigns.length} exhibits</b></button>
            {collections.map((collection, index) => (
              <button type="button" key={collection.id} onClick={() => scrollTo(`collection-${collection.id}`)}>
                <span>{String(index + 1).padStart(2, '0')} · {collection.label}</span>
                <strong>{collection.title}</strong>
                <p>{collection.description}</p>
                <b>{collection.designs.length} designs</b>
              </button>
            ))}
            <button type="button" onClick={() => scrollTo('my-designs')}><span>06 · Private</span><strong>My Designs</strong><p>Nur deine lokal gespeicherten Arbeiten.</p><b>{userDesigns.length} saved</b></button>
            <button type="button" onClick={() => scrollTo('extreme-lab')}><span>07 · Experimental</span><strong>Extreme 200</strong><p>Die große experimentelle Ausstellung bleibt separat.</p><b>200 experiments</b></button>
            <button type="button" onClick={() => chooseCategory(ALL)}><span>08 · Archive</span><strong>Component Registry</strong><p>Stabile Registry-Komponenten mit Suche und Kategorien.</p><b>{componentRegistry.length} components</b></button>
          </div>
        </section>

        <section className="principles structure-principles" id="principles">
          <article><span>01</span><h3>Curated</h3><p>Featured ist nur die Vitrine. Der eigentliche Bestand lebt in festen Sammlungen.</p></article>
          <article><span>02</span><h3>Organized</h3><p>Motion, Music, Spatial, Workshop und Experimente haben jeweils einen eigenen Raum.</p></article>
          <article><span>03</span><h3>Interactive</h3><p>Jede Karte bleibt live, anklickbar und öffnet weiterhin die Get-code-Workbench.</p></article>
          <article><span>04</span><h3>Personal</h3><p>Deine eigenen Designs bleiben getrennt vom Built-in-Bestand.</p></article>
        </section>

        <section className="structured-section featured-room" id="featured">
          <div className="library-head">
            <div>
              <span className="section-kicker">Featured exhibition</span>
              <h2>Fünf Stücke als Einstieg.</h2>
              <p>Nur eine kuratierte Vitrine. Danach beginnt der eigentliche Rundgang durch die Sammlungen.</p>
            </div>
          </div>
          <div className="custom-design-grid structured-card-grid">
            {featuredDesigns.map((design) => (
              <CustomDesignCard key={design.id} design={design} onGetCode={() => openDesign(design.id)} />
            ))}
          </div>
        </section>

        {collections.map((collection) => (
          <DesignCollectionSection key={collection.id} collection={collection} onOpen={openDesign} />
        ))}

        <section className="my-designs structured-section" id="my-designs">
          <div className="library-head">
            <div>
              <span className="section-kicker">Private studio</span>
              <h2>Deine eigenen Arbeiten.</h2>
              <p>Nur Designs, die du selbst im Studio gespeichert hast. Keine Built-ins dazwischen.</p>
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
              <div><strong>Noch keine eigenen Designs</strong><p>Füge HTML/CSS/JS ein oder starte mit einem Motion-Preset.</p></div>
              <button type="button" onClick={() => { window.location.hash = '/studio' }}>Design hinzufügen</button>
            </div>
          )}
        </section>

        <ExtremeLab onGetCode={openDesign} />

        <section className="library structured-section" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Archive library</span>
              <h2>Die stabile Component Registry.</h2>
              <p>Der technische Bestand bleibt separat von den experimentellen Seed-Designs.</p>
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
          <span className="section-kicker">One organized system</span>
          <h2>Showcase, Sammlungen, Studio, Extreme Hall und Archiv.</h2>
          <p>Jeder Teil der Website hat jetzt eine klare Rolle. Designs werden nicht gelöscht, sondern dort gezeigt, wo sie hingehören.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer"><span>RED UI KIT</span><span>Spatial design house for BABAT RED and experiments.</span></footer>
    </div>
  )
}
