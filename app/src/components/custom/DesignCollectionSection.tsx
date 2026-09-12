import type { DesignCollection } from '../../custom/designCollections'
import { CustomDesignCard } from './CustomDesignCard'

interface DesignCollectionSectionProps {
  collection: DesignCollection
  onOpen: (id: string) => void
}

export function DesignCollectionSection({ collection, onOpen }: DesignCollectionSectionProps) {
  return (
    <section className="structured-section collection-room" id={`collection-${collection.id}`}>
      <div className="library-head collection-room-head">
        <div>
          <span className="section-kicker">{collection.label}</span>
          <h2>{collection.title}</h2>
          <p>{collection.description}</p>
        </div>
        <div className="collection-room-meta">
          <strong>{collection.designs.length}</strong>
          <span>designs</span>
        </div>
      </div>

      <div className="collection-tags" aria-label={`${collection.label} tags`}>
        {collection.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <div className="custom-design-grid structured-card-grid collection-room-grid">
        {collection.designs.map((design) => (
          <CustomDesignCard
            key={design.id}
            design={design}
            onGetCode={() => onOpen(design.id)}
          />
        ))}
      </div>
    </section>
  )
}
