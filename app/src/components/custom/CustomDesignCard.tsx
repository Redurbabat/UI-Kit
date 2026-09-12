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

  return (
    <article className="design-card custom-design-card">
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
