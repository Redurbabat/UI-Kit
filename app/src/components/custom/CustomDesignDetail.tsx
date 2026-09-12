import { useMemo, useRef, useState } from 'react'
import type { CustomDesign } from '../../custom/types'
import { useDesignFavorites } from '../../custom/preferences'
import { CustomPreview, type PreviewSettings } from './CustomPreview'

type Tab = 'html' | 'css' | 'js' | 'all'
type PreviewBackground = PreviewSettings['background']

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
  const [background, setBackground] = useState<PreviewBackground>('dark')
  const [accent, setAccent] = useState('#756cff')
  const [speed, setSpeed] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const { favorites, toggleFavorite } = useDesignFavorites()
  const favorite = favorites.has(design.id)

  const settings = useMemo<PreviewSettings>(() => ({ background, accent, speed }), [background, accent, speed])

  const code = useMemo(() => {
    const script = design.js?.trim() ? `\n\n<script>\n${design.js}\n</script>` : ''
    return {
      html: design.html,
      css: design.css,
      js: design.js ?? '',
      all: `${design.html}\n\n<style>\n${design.css}\n</style>${script}`,
    }
  }, [design])

  const value = code[tab]
  const lines = value.split('\n')
  const tabs: Tab[] = design.js?.trim() ? ['html', 'css', 'js', 'all'] : ['html', 'css', 'all']

  const copy = async () => {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    await stageRef.current?.requestFullscreen()
  }

  return (
    <div className="detail-page">
      <header className="detail-topbar">
        <button className="detail-back" type="button" onClick={onBack}>← Go back</button>
        <div className="detail-meta"><span>{design.category}</span><strong>{design.name}</strong><span>{design.source}</span></div>
        <button
          type="button"
          className={favorite ? 'detail-favorite active' : 'detail-favorite'}
          onClick={() => toggleFavorite(design.id)}
        >
          {favorite ? '★ Favorit' : '☆ Favorit'}
        </button>
      </header>

      <div className="playground-toolbar" aria-label="Preview controls">
        <div className="playground-control playground-backgrounds">
          <span>Background</span>
          {(['dark', 'light', 'grid', 'transparent'] as PreviewBackground[]).map((item) => (
            <button key={item} type="button" className={background === item ? 'active' : ''} onClick={() => setBackground(item)}>{item}</button>
          ))}
        </div>
        <label className="playground-control playground-color">
          <span>Accent</span>
          <input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} />
          <code>{accent}</code>
        </label>
        <label className="playground-control playground-speed">
          <span>Motion {speed.toFixed(2)}×</span>
          <input type="range" min="0.25" max="2.5" step="0.25" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
        </label>
        <button type="button" className="playground-reset" onClick={() => { setBackground('dark'); setAccent('#756cff'); setSpeed(1) }}>Reset</button>
        <button type="button" className="playground-fullscreen" onClick={toggleFullscreen}>⛶ Fullscreen</button>
      </div>

      <main className="detail-workbench custom-detail-workbench playground-workbench">
        <section className={`detail-preview detail-preview--${background}`}>
          <div ref={stageRef} className="detail-preview-stage custom-detail-stage playground-stage">
            <CustomPreview design={design} settings={settings} />
          </div>
          <div className="detail-preview-caption">
            <span>{design.name}</span>
            <small>{design.tags.join(' · ')}</small>
          </div>
        </section>

        <section className="code-panel code-panel--large">
          <div className="code-toolbar">
            <div className="code-tabs" role="tablist" aria-label="Codeformat">
              {tabs.map((item) => (
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
