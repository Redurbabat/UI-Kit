import { useEffect, useMemo, useState } from 'react'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { componentCategories, componentRegistry } from './registry/componentRegistry'

const ALL = 'Alle Designs'

function componentIdFromHash() {
  const match = window.location.hash.match(/^#\/component\/(.+)$/)
  return match?.[1] ? decodeURIComponent(match[1]) : null
}

export function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('3D Button Lab')
  const [selectedId, setSelectedId] = useState<string | null>(() => componentIdFromHash())

  useEffect(() => {
    const syncHash = () => setSelectedId(componentIdFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const selectedComponent = useMemo(
    () => componentRegistry.find((component) => component.id === selectedId) ?? null,
    [selectedId],
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

      const haystack = [
        component.name,
        component.category,
        component.variant,
        component.description,
        ...component.tags,
      ]
        .join(' ')
        .toLocaleLowerCase()

      return haystack.includes(normalized)
    })
  }, [activeCategory, query])

  const chooseCategory = (category: string) => {
    setActiveCategory(category)
    window.requestAnimationFrame(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const openCode = (id: string) => {
    window.location.hash = `/component/${encodeURIComponent(id)}`
  }

  const closeCode = () => {
    window.location.hash = ''
    setSelectedId(null)
  }

  if (selectedComponent) {
    return <ComponentDetail component={selectedComponent} onBack={closeCode} />
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="RED UI Kit Startseite">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>RED UI <b>KIT</b></span>
        </a>
        <nav className="topnav" aria-label="Hauptnavigation">
          <a href="#library">Designs</a>
          <a href="#principles">Styles</a>
          <a href="#about">About</a>
        </nav>
        <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Design playground</span>
            <h1>Designs, die sich <em>nicht normal</em> anfühlen.</h1>
            <p>
              Eine visuelle Sammlung aus 3D, Glass, Glow, Clay, Neon, mechanischen Controls,
              ungewöhnlichen Cards und spielerischer Motion. Design auswählen, ausprobieren und
              mit einem Klick den Code öffnen.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => chooseCategory('3D Button Lab')} className="hero-primary">
                3D Lab öffnen <span>↘</span>
              </button>
              <button type="button" onClick={() => chooseCategory('Buttons')} className="hero-secondary">
                Buttons ansehen
              </button>
            </div>
            <div className="hero-stats" aria-label="Statistik">
              <div><strong>{componentRegistry.length}</strong><span>Designs</span></div>
              <div><strong>{componentCategories.length}</strong><span>Kategorien</span></div>
              <div><strong>3</strong><span>Code-Formate</span></div>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-orbit hero-orbit--a" />
            <div className="hero-orbit hero-orbit--b" />
            <div className="hero-core"><span>UI</span></div>
            <div className="hero-float-card hero-float-card--one">3D</div>
            <div className="hero-float-card hero-float-card--two">CSS</div>
            <div className="hero-float-card hero-float-card--three">GET CODE</div>
          </div>
        </section>

        <section className="principles" id="principles">
          <article><span>01</span><h3>3D & tactile</h3><p>Layered shadows, pressed movement and perspective for real depth.</p></article>
          <article><span>02</span><h3>Glass & glow</h3><p>Blur, reflections, neon light and translucent materials.</p></article>
          <article><span>03</span><h3>Retro & playful</h3><p>Arcade, pixel, clay, chrome and deliberately unusual shapes.</p></article>
          <article><span>04</span><h3>Get code</h3><p>The gallery stays visual. Code opens only when you ask for it.</p></article>
        </section>

        <section className="library" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Design library</span>
              <h2>Erst ansehen. Dann Code holen.</h2>
              <p>Wie eine Design-Galerie: Preview, Name und Get code. Der Editor öffnet sich separat.</p>
            </div>
            <label className="search-field">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="3D, glass, neon, retro …" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
            </label>
          </div>

          <div className="library-layout">
            <aside className="category-nav" aria-label="Designkategorien">
              <button className={activeCategory === ALL ? 'active' : ''} type="button" onClick={() => setActiveCategory(ALL)}>
                <span>{ALL}</span><b>{componentRegistry.length}</b>
              </button>
              {componentCategories.map((category) => (
                <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>
                  <span>{category}</span><b>{counts.get(category) ?? 0}</b>
                </button>
              ))}
            </aside>

            <div className="component-list">
              <div className="result-bar">
                <div><strong>{activeCategory}</strong><span>{visibleComponents.length} Designs</span></div>
                <span className="result-hint">Preview · Interact · Get code</span>
              </div>

              <div className="design-gallery">
                {visibleComponents.length > 0 ? (
                  visibleComponents.map((component, index) => (
                    <ComponentShowcase
                      key={component.id}
                      component={component}
                      index={index}
                      onGetCode={() => openCode(component.id)}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <span>⌕</span>
                    <h3>Nichts gefunden</h3>
                    <p>Versuche einen anderen Stil oder eine andere Kategorie.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <span className="section-kicker">Own visual language</span>
          <h2>Inspiriert von offenen UI-Galerien. Aber eigenständig.</h2>
          <p>Die besten Muster aus 3D, neumorphism, gradients, glow, retro, glass und motion werden zu einer eigenen RED UI Sprache kombiniert.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer">
        <span>RED UI KIT</span><span>Design playground for BABAT RED, Redion & experiments.</span>
      </footer>
    </div>
  )
}
