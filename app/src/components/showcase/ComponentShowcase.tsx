import type { CSSProperties } from 'react'
import { ComponentPreview } from './ComponentPreview'
import type { UiComponentDefinition } from '../../registry/componentRegistry'

interface ComponentShowcaseProps {
  component: UiComponentDefinition
  index: number
  onGetCode: () => void
}

export function ComponentShowcase({ component, index, onGetCode }: ComponentShowcaseProps) {
  const style = { '--item-index': index } as CSSProperties

  return (
    <article className="design-card" id={component.id} style={style}>
      <div className={`design-stage preview-style-${component.variant}`}>
        <div className="design-grid" />
        <div className="design-light" />
        <div className="design-preview">
          <ComponentPreview component={component} />
        </div>
      </div>

      <footer className="design-card-footer">
        <div className="design-card-copy">
          <div className="design-card-meta">
            <span>{component.category}</span>
            <span className={`maturity maturity--${component.maturity}`}>{component.maturity}</span>
          </div>
          <h3>{component.name}</h3>
          <div className="design-tags">
            {component.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
        </div>
        <button className="get-code-button" type="button" onClick={onGetCode}>
          <span aria-hidden="true">‹/›</span>
          Get code
        </button>
      </footer>
    </article>
  )
}
