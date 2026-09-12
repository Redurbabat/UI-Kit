import { useMemo, useState } from 'react'
import type { ComponentCode } from '../../registry/codeSnippets'

type CodeTab = keyof ComponentCode

const tabs: readonly { id: CodeTab; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'react', label: 'React' },
  { id: 'all', label: 'All' },
]

interface CodePanelProps {
  code: ComponentCode
  large?: boolean
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

export function CodePanel({ code, large = false }: CodePanelProps) {
  const [tab, setTab] = useState<CodeTab>('css')
  const [copied, setCopied] = useState(false)
  const lines = useMemo(() => code[tab].split('\n'), [code, tab])

  const handleCopy = async () => {
    await copyText(code[tab])
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1300)
  }

  return (
    <section className={large ? 'code-panel code-panel--large' : 'code-panel'} aria-label="Quellcode">
      <div className="code-toolbar">
        <div className="code-tabs" role="tablist" aria-label="Codeformat">
          {tabs.map((item) => (
            <button
              className={tab === item.id ? 'active' : ''}
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
            >
              <span className={`code-tab-icon code-tab-icon--${item.id}`} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
        <button className={copied ? 'copy-button copied' : 'copy-button'} type="button" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy code'}
        </button>
      </div>

      <div className="code-editor" role="region" aria-label={`${tab} code`}>
        <div className="code-lines" aria-hidden="true">
          {lines.map((_, index) => <span key={index}>{index + 1}</span>)}
        </div>
        <pre><code>{code[tab]}</code></pre>
      </div>

      <footer className="code-statusbar">
        <span>{tab.toUpperCase()}</span>
        <span>{lines.length} lines</span>
        <span>UTF-8</span>
      </footer>
    </section>
  )
}
