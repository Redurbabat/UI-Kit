import { useMemo, useState } from 'react'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { componentCategories, componentRegistry } from './registry/componentRegistry'

const ALL = 'Alle Komponenten'

export function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('3D Button Lab')

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

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="RED UI Kit Startseite">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>RED UI <b>KIT</b></span>
        </a>
        <nav className="topnav" aria-label="Hauptnavigation">
          <a href="#library">Components</a>
          <a href="#principles">Motion</a>
          <a href="#about">About</a>
        </nav>
        <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Experimental interface library</span>
            <h1>Interfaces, die sich <em>wie Objekte</em> anfühlen.</h1>
            <p>
              3D, Glass, Glow, mechanische Bewegung und ungewöhnliche Micro-Interactions —
              mit Live Preview und direkt kopierbarem React-, HTML- und CSS-Code.
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
              <div><strong>{componentRegistry.length}</strong><span>Komponenten</span></div>
              <div><strong>{componentCategories.length}</strong><span>Kategorien</span></div>
              <div><strong>4</strong><span>Copy-Formate</span></div>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-orbit hero-orbit--a" />
            <div className="hero-orbit hero-orbit--b" />
            <div className="hero-core"><span>UI</span></div>
            <div className="hero-float-card hero-float-card--one">3D</div>
            <div className="hero-float-card hero-float-card--two">CSS</div>
            <div className="hero-float-card hero-float-card--three">COPY</div>
          </div>
        </section>

        <section className="principles" id="principles">
          <article><span>01</span><h3>Physical</h3><p>Press, depth and inertia instead of flat click states.</p></article>
          <article><span>02</span><h3>Expressive</h3><p>Motion communicates state, hierarchy and character.</p></article>
          <article><span>03</span><h3>Copy-ready</h3><p>The code sits beside the live component, not on another page.</p></article>
          <article><span>04</span><h3>Accessible</h3><p>Focus states and reduced-motion behavior remain part of the system.</p></article>
        </section>

        <section className="library" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Component library</span>
              <h2>Preview links. Code rechts.</h2>
              <p>Eine Komponente auswählen, ausprobieren und den benötigten Code direkt kopieren.</p>
            </div>
            <label className="search-field">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Komponenten suchen …" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
            </label>
          </div>

          <div className="library-layout">
            <aside className="category-nav" aria-label="Komponentenkategorien">
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
                <div><strong>{activeCategory}</strong><span>{visibleComponents.length} Ergebnisse</span></div>
                <span className="result-hint">Hover · Click · Copy</span>
              </div>

              {visibleComponents.length > 0 ? (
                visibleComponents.map((component, index) => (
                  <ComponentShowcase key={component.id} component={component} index={index} />
                ))
              ) : (
                <div className="empty-state">
                  <span>⌕</span>
                  <h3>Nichts gefunden</h3>
                  <p>Versuche einen anderen Namen, Effekt oder eine andere Kategorie.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <span className="section-kicker">Built as a system</span>
          <h2>Nicht nur eine Sammlung von Snippets.</h2>
          <p>Das UI Kit ist registry-basiert aufgebaut. Neue Komponenten bekommen Name, Kategorie, Tags, Live-Preview und Copy-Code und erscheinen danach automatisch im Browser.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer">
        <span>RED UI KIT</span><span>Designed for BABAT RED, Redion & experiments.</span>
      </footer>
    </div>
  )
}
