import { useMemo, useState } from 'react'
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

  if (!activeCategory) return null

  return (
    <section className="type-catalog" id="catalog">
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
