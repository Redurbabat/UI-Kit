import type { PointerEvent } from 'react'
import type { CustomDesign } from '../../custom/types'
import { useDesignFavorites } from '../../custom/preferences'
import { CustomPreview } from './CustomPreview'

interface CustomDesignCardProps {
  design: CustomDesign
  onGetCode: () => void
  onDelete?: () => void
}

export function CustomDesignCard({ design, onGetCode, onDelete }: CustomDesignCardProps) {
  const { favorites, toggleFavorite } = useDesignFavorites()
  const favorite = favorites.has(design.id)

  const moveCard = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)))
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(rect.height, 1)))

    card.style.setProperty('--card-mx', `${(x * 100).toFixed(1)}%`)
    card.style.setProperty('--card-my', `${(y * 100).toFixed(1)}%`)
    card.style.setProperty('--card-rx', `${((0.5 - y) * 4.2).toFixed(2)}deg`)
    card.style.setProperty('--card-ry', `${((x - 0.5) * 5.2).toFixed(2)}deg`)
    card.style.setProperty('--card-shift-x', `${((x - 0.5) * 4).toFixed(2)}px`)
    card.style.setProperty('--card-shift-y', `${((y - 0.5) * 3).toFixed(2)}px`)
  }

  const resetCard = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget
    card.style.setProperty('--card-mx', '50%')
    card.style.setProperty('--card-my', '38%')
    card.style.setProperty('--card-rx', '0deg')
    card.style.setProperty('--card-ry', '0deg')
    card.style.setProperty('--card-shift-x', '0px')
    card.style.setProperty('--card-shift-y', '0px')
  }

  return (
    <article
      className="design-card custom-design-card"
      onPointerMove={moveCard}
      onPointerLeave={resetCard}
    >
      <div className="design-card-preview">
        <CustomPreview design={design} />
        <button
          type="button"
          className={favorite ? 'design-favorite active' : 'design-favorite'}
          onClick={() => toggleFavorite(design.id)}
          aria-label={favorite ? `Remove ${design.name} from favorites` : `Add ${design.name} to favorites`}
          title={favorite ? 'Favorit entfernen' : 'Als Favorit speichern'}
        >
          {favorite ? '★' : '☆'}
        </button>
      </div>
      <footer className="design-card-footer">
        <div>
          <strong>{design.name}</strong>
          <span>{design.category} · {design.source === 'seed' ? 'included' : 'your design'}</span>
        </div>
        <div className="custom-card-actions">
          {onDelete && <button type="button" className="custom-delete" onClick={onDelete} aria-label={`Delete ${design.name}`}>×</button>}
          <button className="get-code-button" type="button" onClick={onGetCode}><span>&lt;/&gt;</span> Get code</button>
        </div>
      </footer>
    </article>
  )
}
