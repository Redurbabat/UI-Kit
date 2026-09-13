import { useMemo, useState, type PointerEvent } from 'react'
import { buildDesignTypeCategories, type DesignTypeId } from '../../custom/designTypeCategories'
import type { CustomDesign } from '../../custom/types'
import { CustomDesignCard } from './CustomDesignCard'

interface TypeCatalogProps {
  designs: CustomDesign[]
  onOpen: (id: string) => void
  onDeleteUser?: (id: string) => void
}

export function TypeCatalog({ designs, onOpen, onDeleteUser }: TypeCatalogProps) {
  const categories = useMemo(() => buildDesignTypeCategories(designs), [designs])
  const [activeId, setActiveId] = useState<DesignTypeId>(() => categories[0]?.id ?? 'buttons')
  const [query, setQuery] = useState('')

  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0]
  const visibleDesigns = useMemo(() => {
    if (!activeCategory) return []
    const normalized = query.trim().toLocaleLowerCase()
    if (!normalized) return activeCategory.designs
    return activeCategory.designs.filter((design) =>
      [design.name, design.category, design.description, ...design.tags]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalized),
    )
  }, [activeCategory, query])

  const chooseCategory = (id: DesignTypeId) => {
    setActiveId(id)
    window.requestAnimationFrame(() => {
      document.getElementById('catalog-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const moveCatalog = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const catalog = event.currentTarget
    const rect = catalog.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)))
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(rect.height, 1)))
    catalog.style.setProperty('--catalog-mx', `${(x * 100).toFixed(1)}%`)
    catalog.style.setProperty('--catalog-my', `${(y * 100).toFixed(1)}%`)
    catalog.style.setProperty('--catalog-pan-x', `${((x - 0.5) * 12).toFixed(2)}px`)
    catalog.style.setProperty('--catalog-pan-y', `${((y - 0.5) * 8).toFixed(2)}px`)
  }

  if (!activeCategory) return null

  return (
    <section
      className="type-catalog"
      id="catalog"
      data-active-category={activeCategory.id}
      onPointerMove={moveCatalog}
    >
      <div className="catalog-ambient" aria-hidden="true">
        <i className="catalog-ambient-light" />
        <i className="catalog-ambient-orbit catalog-ambient-orbit--one" />
        <i className="catalog-ambient-orbit catalog-ambient-orbit--two" />
        <i className="catalog-ambient-grid" />
      </div>

      <div className="catalog-intro">
        <span className="section-kicker">Component catalog</span>
        <h2>Nach Bauteil geordnet.</h2>
        <p>Stil ist zweitrangig. Ein Button bleibt ein Button – egal ob Glass, 3D, Spotify, Mechanical oder Glow.</p>
      </div>

      <div className="catalog-layout">
        <aside className="catalog-sidebar" aria-label="Komponentenkategorien">
          <div className="catalog-sidebar-head"><span>Categories</span><b>{designs.length}</b></div>
          <nav>
            {categories.map((category) => (
              <button
                key={category.id}
                className={category.id === activeCategory.id ? 'active' : ''}
                type="button"
                onClick={() => chooseCategory(category.id)}
              >
                <span>{category.label}</span>
                <b>{category.designs.length}</b>
              </button>
            ))}
          </nav>
          <button className="catalog-add" type="button" onClick={() => { window.location.hash = '/studio' }}>+ Add design</button>
        </aside>

        <div className="catalog-content" id="catalog-content">
          <header className="catalog-category-head">
            <div>
              <span className="catalog-index">{String(categories.findIndex((item) => item.id === activeCategory.id) + 1).padStart(2, '0')}</span>
              <h3>{activeCategory.label}</h3>
              <p>{activeCategory.description}</p>
            </div>
            <label className="search-field catalog-search">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${activeCategory.label} …`} />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
            </label>
          </header>

          <div className="catalog-result-row"><strong>{visibleDesigns.length}</strong><span>of {activeCategory.designs.length} designs</span></div>

          <div className="custom-design-grid catalog-grid">
            {visibleDesigns.map((design) => (
              <CustomDesignCard
                key={design.id}
                design={design}
                onGetCode={() => onOpen(design.id)}
                onDelete={design.source === 'user' && onDeleteUser ? () => onDeleteUser(design.id) : undefined}
              />
            ))}
          </div>

          {visibleDesigns.length === 0 && (
            <div className="empty-state"><span>⌕</span><h3>Nichts gefunden</h3><p>Versuche einen anderen Suchbegriff.</p></div>
          )}
        </div>
      </div>
    </section>
  )
}
