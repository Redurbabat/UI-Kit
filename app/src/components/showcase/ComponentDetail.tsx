import { useState } from 'react'
import { ComponentPreview } from './ComponentPreview'
import { CodePanel } from './CodePanel'
import { getComponentCode } from '../../registry/codeSnippets'
import type { UiComponentDefinition } from '../../registry/componentRegistry'

interface ComponentDetailProps {
  component: UiComponentDefinition
  onBack: () => void
}

type PreviewTheme = 'dark' | 'light'

export function ComponentDetail({ component, onBack }: ComponentDetailProps) {
  const [theme, setTheme] = useState<PreviewTheme>('dark')
  const code = getComponentCode(component)

  return (
    <div className="detail-page">
      <header className="detail-topbar">
        <button className="detail-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Go back
        </button>
        <div className="detail-meta">
          <span>{component.category}</span>
          <strong>{component.name}</strong>
          <span className={`maturity maturity--${component.maturity}`}>{component.maturity}</span>
        </div>
      </header>

      <main className="detail-workbench">
        <section className={`detail-preview detail-preview--${theme}`} aria-label={`${component.name} live preview`}>
          <div className="detail-preview-toolbar">
            <div className="detail-color-readout">
              <span className="detail-swatch" />
              <code>{theme === 'dark' ? '#121212' : '#F3F3F3'}</code>
            </div>
            <div className="detail-theme-switch" aria-label="Preview background">
              <button
                className={theme === 'dark' ? 'active' : ''}
                type="button"
                onClick={() => setTheme('dark')}
                aria-label="Dark background"
              >
                ◐
              </button>
              <button
                className={theme === 'light' ? 'active' : ''}
                type="button"
                onClick={() => setTheme('light')}
                aria-label="Light background"
              >
                □
              </button>
            </div>
          </div>
          <div className="detail-preview-stage">
            <div className="detail-stage-grid" />
            <div className="detail-stage-glow" />
            <div className="detail-preview-content">
              <ComponentPreview component={component} />
            </div>
          </div>
          <div className="detail-preview-caption">
            <span>{component.name}</span>
            <small>{component.tags.slice(0, 4).join(' · ')}</small>
          </div>
        </section>

        <CodePanel code={code} large />
      </main>
    </div>
  )
}
