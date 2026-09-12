import { useState } from 'react'
import type { ComponentCode } from '../../registry/codeSnippets'

type CodeTab = keyof ComponentCode

const tabs: readonly { id: CodeTab; label: string }[] = [
  { id: 'react', label: 'React' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'all', label: 'All' },
]

interface CodePanelProps {
  code: ComponentCode
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

export function CodePanel({ code }: CodePanelProps) {
  const [tab, setTab] = useState<CodeTab>('react')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyText(code[tab])
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1300)
  }

  return (
    <section className="code-panel" aria-label="Quellcode">
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
              {item.label}
            </button>
          ))}
        </div>
        <button className={copied ? 'copy-button copied' : 'copy-button'} type="button" onClick={handleCopy}>
          {copied ? '✓ Kopiert' : 'Copy'}
        </button>
      </div>
      <div className="code-window">
        <div className="code-dots" aria-hidden="true"><i /><i /><i /></div>
        <pre><code>{code[tab]}</code></pre>
      </div>
    </section>
  )
}
