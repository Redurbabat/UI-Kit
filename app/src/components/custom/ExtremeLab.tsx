import { useMemo, useState } from 'react'
import { extremeCategories, extremeSeedDesigns } from '../../custom/extremeSeedDesigns'
import { CustomDesignCard } from './CustomDesignCard'

interface ExtremeLabProps {
  onGetCode: (id: string) => void
}

export function ExtremeLab({ onGetCode }: ExtremeLabProps) {
  const [category, setCategory] = useState(extremeCategories[0] ?? '')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return extremeSeedDesigns.filter((design) => {
      if (design.category !== category) return false
      if (!normalized) return true
      return [design.name, design.description, ...design.tags]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalized)
    })
  }, [category, query])

  return (
    <section className="extreme-lab" id="extreme-lab">
      <div className="extreme-head">
        <div>
          <span className="section-kicker">Extreme 100 lab</span>
          <h2>100 komplett übertriebene UI-Experimente.</h2>
          <p>
            3D, Glass, Partikel, Blur, Physics, Licht, Portale, Loader, Cursor und Microinteractions.
            Immer nur eine 10er-Kategorie wird live gerendert.
          </p>
        </div>
        <div className="extreme-count"><strong>100</strong><span>live designs</span></div>
      </div>

      <div className="extreme-controls">
        <div className="extreme-tabs" role="tablist" aria-label="Extreme design categories">
          {extremeCategories.map((item, index) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              <i>{String(index + 1).padStart(2, '0')}</i>
              <span>{item.replace('Extreme ', '')}</span>
              <b>10</b>
            </button>
          ))}
        </div>

        <label className="extreme-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="glow, portal, 3d, physics …"
          />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
        </label>
      </div>

      <div className="extreme-resultbar">
        <div><strong>{category}</strong><span>{visible.length} Designs</span></div>
        <span>Live preview · Interact · Get code</span>
      </div>

      <div className="extreme-grid">
        {visible.map((design) => (
          <CustomDesignCard
            key={design.id}
            design={design}
            onGetCode={() => onGetCode(design.id)}
          />
        ))}
      </div>
    </section>
  )
}
