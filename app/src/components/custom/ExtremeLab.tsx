import { useMemo, useState } from 'react'
import { extremeCategories, extremeSeedDesigns } from '../../custom/extremeSeedDesigns'
import { nextCategories, nextSeedDesigns } from '../../custom/nextSeedDesigns'
import { finalCategories, finalSeedDesigns } from '../../custom/finalSeedDesigns'
import { useDesignFavorites } from '../../custom/preferences'
import { CustomDesignCard } from './CustomDesignCard'

interface ExtremeLabProps {
  onGetCode: (id: string) => void
}

type SortMode = 'default' | 'az' | 'za'

const allDesigns = [...extremeSeedDesigns, ...nextSeedDesigns, ...finalSeedDesigns]
const allCategories = [...extremeCategories, ...nextCategories, ...finalCategories]

export function ExtremeLab({ onGetCode }: ExtremeLabProps) {
  const [category, setCategory] = useState(allCategories[0] ?? '')
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sort, setSort] = useState<SortMode>('default')
  const { favorites } = useDesignFavorites()

  const categoryDesigns = useMemo(() => allDesigns.filter((design) => design.category === category), [category])

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const design of categoryDesigns) {
      for (const item of design.tags) counts.set(item, (counts.get(item) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 7)
      .map(([value]) => value)
  }, [categoryDesigns])

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    const filtered = categoryDesigns.filter((design) => {
      if (favoritesOnly && !favorites.has(design.id)) return false
      if (tag && !design.tags.includes(tag)) return false
      if (!normalized) return true
      return [design.name, design.description, ...design.tags]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalized)
    })

    if (sort === 'az') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'za') return [...filtered].sort((a, b) => b.name.localeCompare(a.name))
    return filtered
  }, [categoryDesigns, favorites, favoritesOnly, query, sort, tag])

  const countForCategory = (value: string) => allDesigns.filter((design) => design.category === value).length

  const randomDesign = () => {
    const pool = favoritesOnly ? allDesigns.filter((design) => favorites.has(design.id)) : allDesigns
    if (!pool.length) return
    const design = pool[Math.floor(Math.random() * pool.length)]
    onGetCode(design.id)
  }

  const chooseCategory = (value: string) => {
    setCategory(value)
    setTag('')
  }

  return (
    <section className="extreme-lab" id="extreme-lab">
      <div className="extreme-head">
        <div>
          <span className="section-kicker">Extreme 200 lab</span>
          <h2>200 komplett übertriebene UI-Experimente.</h2>
          <p>
            3D, Glass, Partikel, Blur, Physics, Licht, Portale, Loader, Cursor, mechanische Controls,
            Mini-Games, Spatial Windows, Sci-Fi Devices, Ambient Scenes, Strange Inputs und Mini Devices.
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
              onClick={() => chooseCategory(item)}
            >
              <i>{String(index + 1).padStart(2, '0')}</i>
              <span>{item.replace('Extreme ', '')}</span>
              <b>{countForCategory(item)}</b>
            </button>
          ))}
        </div>

        <div className="extreme-side-controls">
          <label className="extreme-search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="vault, physics, ambient, input …"
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
          </label>
          <div className="extreme-actions">
            <button type="button" className={favoritesOnly ? 'active' : ''} onClick={() => setFavoritesOnly((value) => !value)}>★ Favorites <b>{favorites.size}</b></button>
            <button type="button" onClick={randomDesign}>⚄ Random</button>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} aria-label="Sort designs">
              <option value="default">Default order</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="extreme-tags" aria-label="Popular tags">
        <button type="button" className={!tag ? 'active' : ''} onClick={() => setTag('')}>All</button>
        {popularTags.map((item) => (
          <button key={item} type="button" className={tag === item ? 'active' : ''} onClick={() => setTag(item)}>#{item}</button>
        ))}
      </div>

      <div className="extreme-resultbar">
        <div><strong>{category}</strong><span>{visible.length} Designs</span></div>
        <span>{favoritesOnly ? 'Favorites · ' : ''}{tag ? `#${tag} · ` : ''}Live preview · Interact · Get code</span>
      </div>

      <div className="extreme-grid">
        {visible.length ? visible.map((design) => (
          <CustomDesignCard
            key={design.id}
            design={design}
            onGetCode={() => onGetCode(design.id)}
          />
        )) : (
          <div className="extreme-empty">
            <span>☆</span>
            <strong>Keine Designs in diesem Filter.</strong>
            <p>Filter zurücksetzen oder zuerst ein paar Favoriten markieren.</p>
          </div>
        )}
      </div>
    </section>
  )
}
