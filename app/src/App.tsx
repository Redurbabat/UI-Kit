import { useEffect, useMemo, useState } from 'react'
import { ComponentDetail } from './components/showcase/ComponentDetail'
import { ComponentShowcase } from './components/showcase/ComponentShowcase'
import { CustomDesignCard } from './components/custom/CustomDesignCard'
import { CustomDesignDetail } from './components/custom/CustomDesignDetail'
import { CustomDesignStudio } from './components/custom/CustomDesignStudio'
import { componentCategories, componentRegistry } from './registry/componentRegistry'
import { seedDesigns } from './custom/seedDesigns'
import { loadUserDesigns, saveUserDesigns } from './custom/storage'
import type { CustomDesign } from './custom/types'

const ALL = 'Alle Designs'

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

  const customDesigns = useMemo(() => [...seedDesigns, ...userDesigns], [userDesigns])

  const selectedComponent = useMemo(
    () => route.kind === 'component' ? componentRegistry.find((component) => component.id === route.id) ?? null : null,
    [route],
  )

  const selectedCustom = useMemo(
    () => route.kind === 'custom' ? customDesigns.find((design) => design.id === route.id) ?? null : null,
    [route, customDesigns],
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

  const chooseCategory = (category: string) => {
    setActiveCategory(category)
    window.requestAnimationFrame(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <a href="#my-designs">My Designs</a>
          <a href="#library">Designs</a>
          <a href="#principles">Styles</a>
        </nav>
        <div className="topbar-actions">
          <button className="add-design-top" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add design</button>
          <a className="github-link" href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Design playground</span>
            <h1>Designs, die sich <em>nicht normal</em> anfühlen.</h1>
            <p>
              Eine visuelle Sammlung aus 3D, Glass, Glow, Clay, Neon, mechanischen Controls,
              ungewöhnlichen Cards und spielerischer Motion. Du kannst außerdem eigene HTML/CSS-Designs einfügen.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => chooseCategory('3D Button Lab')} className="hero-primary">3D Lab öffnen <span>↘</span></button>
              <button type="button" onClick={() => { window.location.hash = '/studio' }} className="hero-secondary">Eigenes Design +</button>
            </div>
            <div className="hero-stats" aria-label="Statistik">
              <div><strong>{componentRegistry.length + customDesigns.length}</strong><span>Designs</span></div>
              <div><strong>{componentCategories.length}</strong><span>Kategorien</span></div>
              <div><strong>{customDesigns.length}</strong><span>My Designs</span></div>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-orbit hero-orbit--a" />
            <div className="hero-orbit hero-orbit--b" />
            <div className="hero-core"><span>UI</span></div>
            <div className="hero-float-card hero-float-card--one">3D</div>
            <div className="hero-float-card hero-float-card--two">CSS</div>
            <div className="hero-float-card hero-float-card--three">ADD +</div>
          </div>
        </section>

        <section className="principles" id="principles">
          <article><span>01</span><h3>3D & tactile</h3><p>Layered shadows, pressed movement and perspective for real depth.</p></article>
          <article><span>02</span><h3>Glass & glow</h3><p>Blur, reflections, neon light and translucent materials.</p></article>
          <article><span>03</span><h3>Bring your own</h3><p>Paste HTML and CSS, preview it safely and keep it in your browser.</p></article>
          <article><span>04</span><h3>Get code</h3><p>The gallery stays visual. Code opens only when you ask for it.</p></article>
        </section>

        <section className="my-designs" id="my-designs">
          <div className="library-head">
            <div>
              <span className="section-kicker">My designs</span>
              <h2>Deine eigene Sammlung.</h2>
              <p>Die ersten zwei Designs sind dein Focus-Button und dein Domino-Spinner. Weitere kannst du direkt selbst einfügen.</p>
            </div>
            <button className="hero-primary my-design-add" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add your design</button>
          </div>
          <div className="custom-design-grid">
            {customDesigns.map((design) => (
              <CustomDesignCard
                key={design.id}
                design={design}
                onGetCode={() => { window.location.hash = `/custom/${encodeURIComponent(design.id)}` }}
                onDelete={design.source === 'user' ? () => deleteCustom(design.id) : undefined}
              />
            ))}
          </div>
        </section>

        <section className="library" id="library">
          <div className="library-head">
            <div>
              <span className="section-kicker">Design library</span>
              <h2>Erst ansehen. Dann Code holen.</h2>
              <p>Preview, Name und Get code. Der Editor öffnet sich separat.</p>
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
          <span className="section-kicker">Own visual language</span>
          <h2>Design-Galerie und persönliches CSS-Labor.</h2>
          <p>Feste Library-Designs und deine eigenen HTML/CSS-Experimente leben nebeneinander, ohne dass dein eingefügtes CSS die Website überschreibt.</p>
          <a href="https://github.com/Redurbabat/UI-Kit" target="_blank" rel="noreferrer">Repository ansehen ↗</a>
        </section>
      </main>

      <footer className="footer"><span>RED UI KIT</span><span>Design playground for BABAT RED, Redion & experiments.</span></footer>
    </div>
  )
}
