import { useMemo, useState } from 'react'
import { extremeCategories, extremeSeedDesigns } from '../../custom/extremeSeedDesigns'
import { nextCategories, nextSeedDesigns } from '../../custom/nextSeedDesigns'
import { CustomDesignCard } from './CustomDesignCard'

interface ExtremeLabProps {
  onGetCode: (id: string) => void
}

const allDesigns = [...extremeSeedDesigns, ...nextSeedDesigns]
const allCategories = [...extremeCategories, ...nextCategories]

export function ExtremeLab({ onGetCode }: ExtremeLabProps) {
  const [category, setCategory] = useState(allCategories[0] ?? '')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return allDesigns.filter((design) => {
      if (design.category !== category) return false
      if (!normalized) return true
      return [design.name, design.description, ...design.tags]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalized)
    })
  }, [category, query])

  const countForCategory = (value: string) => allDesigns.filter((design) => design.category === value).length

  return (
    <section className="extreme-lab" id="extreme-lab">
      <div className="extreme-head">
        <div>
          <span className="section-kicker">Extreme 170 lab</span>
          <h2>170 komplett übertriebene UI-Experimente.</h2>
          <p>
            3D, Glass, Partikel, Blur, Physics, Licht, Portale, Loader, Cursor, mechanische Controls,
            Mini-Games, Spatial Windows, Sci-Fi Devices und animierte Illustrationen.
          </p>
        </div>
        <div className="extreme-count"><strong>{allDesigns.length}</strong><span>live designs</span></div>
      </div>

      <div className="extreme-controls">
        <div className="extreme-tabs" role="tablist" aria-label="Extreme design categories">
          {allCategories.map((item, index) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              <i>{String(index + 1).padStart(2, '0')}</i>
              <span>{item.replace('Extreme ', '')}</span>
              <b>{countForCategory(item)}</b>
            </button>
          ))}
        </div>

        <label className="extreme-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="vault, physics, game, portal, 3d …"
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
