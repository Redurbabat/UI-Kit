import { useMemo, useState } from 'react'
import type { CustomDesign } from '../../custom/types'
import { CustomPreview } from './CustomPreview'

type Tab = 'html' | 'css' | 'all'

interface CustomDesignDetailProps {
  design: CustomDesign
  onBack: () => void
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

export function CustomDesignDetail({ design, onBack }: CustomDesignDetailProps) {
  const [tab, setTab] = useState<Tab>('css')
  const [copied, setCopied] = useState(false)

  const code = useMemo(() => ({
    html: design.html,
    css: design.css,
    all: `${design.html}\n\n<style>\n${design.css}\n</style>`,
  }), [design])

  const value = code[tab]
  const lines = value.split('\n')

  const copy = async () => {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="detail-page">
      <header className="detail-topbar">
        <button className="detail-back" type="button" onClick={onBack}>← Go back</button>
        <div className="detail-meta"><span>{design.category}</span><strong>{design.name}</strong><span>{design.source}</span></div>
      </header>

      <main className="detail-workbench custom-detail-workbench">
        <section className="detail-preview detail-preview--dark">
          <div className="detail-preview-stage custom-detail-stage"><CustomPreview design={design} /></div>
          <div className="detail-preview-caption"><span>{design.name}</span><small>{design.tags.join(' · ')}</small></div>
        </section>

        <section className="code-panel code-panel--large">
          <div className="code-toolbar">
            <div className="code-tabs" role="tablist" aria-label="Codeformat">
              {(['html', 'css', 'all'] as const).map((item) => (
                <button key={item} type="button" className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item.toUpperCase()}</button>
              ))}
            </div>
            <button className={copied ? 'copy-button copied' : 'copy-button'} type="button" onClick={copy}>{copied ? '✓ Kopiert' : 'Copy code'}</button>
          </div>
          <div className="code-window code-window--large">
            <ol className="custom-code-lines">
              {lines.map((line, index) => <li key={`${index}-${line}`}><code>{line || ' '}</code></li>)}
            </ol>
          </div>
        </section>
      </main>
    </div>
  )
}
