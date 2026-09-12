import type { CSSProperties } from 'react'
import { ComponentPreview } from './ComponentPreview'
import { CodePanel } from './CodePanel'
import type { UiComponentDefinition } from '../../registry/componentRegistry'
import { getComponentCode } from '../../registry/codeSnippets'

interface ComponentShowcaseProps {
  component: UiComponentDefinition
  index: number
}

export function ComponentShowcase({ component, index }: ComponentShowcaseProps) {
  const code = getComponentCode(component)
  const style = { '--item-index': index } as CSSProperties

  return (
    <article className="showcase" id={component.id} style={style}>
      <header className="showcase-head">
        <div>
          <div className="showcase-meta">
            <span>{component.category}</span>
            <span className={`maturity maturity--${component.maturity}`}>{component.maturity}</span>
          </div>
          <h3>{component.name}</h3>
          <p>{component.description}</p>
        </div>
        <div className="tag-list" aria-label="Tags">
          {component.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <div className="showcase-grid">
        <section className="preview-panel" aria-label={`${component.name} Vorschau`}>
          <div className="preview-toolbar">
            <span><i /> Live preview</span>
            <span className="preview-id">#{component.id}</span>
          </div>
          <div className={`preview-stage preview-stage--${component.family}`}>
            <div className="preview-grid" />
            <div className="preview-glow" />
            <div className="preview-content"><ComponentPreview component={component} /></div>
          </div>
        </section>
        <CodePanel code={code} />
      </div>
    </article>
  )
}
