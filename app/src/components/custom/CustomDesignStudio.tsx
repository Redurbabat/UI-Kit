import { useMemo, useState } from 'react'
import { makeCustomId, type CustomDesign } from '../../custom/types'
import { CustomPreview } from './CustomPreview'

interface CustomDesignStudioProps {
  onSave: (design: CustomDesign) => void
  onClose: () => void
}

const initialHtml = `<button class="my-button" type="button">My design</button>`
const initialCss = `.my-button {
  padding: 14px 22px;
  border: 0;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, #6f67ff, #22d3ee);
  box-shadow: 0 16px 35px rgba(0,0,0,.3);
  cursor: pointer;
}`

export function CustomDesignStudio({ onSave, onClose }: CustomDesignStudioProps) {
  const [name, setName] = useState('My Design')
  const [category, setCategory] = useState('Buttons')
  const [description, setDescription] = useState('Eigenes HTML/CSS Design')
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [tags, setTags] = useState('custom, css')

  const preview = useMemo(
    () => ({ name: name || 'Preview', html, css }),
    [name, html, css],
  )

  const save = () => {
    const trimmedName = name.trim()
    if (!trimmedName || !html.trim() || !css.trim()) return

    onSave({
      id: `${makeCustomId(trimmedName)}-${Date.now()}`,
      name: trimmedName,
      category: category.trim() || 'Other',
      description: description.trim(),
      html,
      css,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      source: 'user',
    })
  }

  return (
    <div className="custom-studio-page">
      <header className="detail-topbar">
        <button className="detail-back" type="button" onClick={onClose}>← Go back</button>
        <div className="detail-meta"><span>Custom</span><strong>Add your own design</strong></div>
      </header>

      <main className="custom-studio">
        <section className="custom-studio-form">
          <div className="custom-studio-heading">
            <span>Design metadata</span>
            <h1>Eigenes Design einfügen</h1>
            <p>HTML und CSS einfügen, direkt testen und lokal im Browser speichern.</p>
          </div>

          <div className="custom-meta-grid">
            <label>Name<input value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Kategorie<input value={category} onChange={(event) => setCategory(event.target.value)} /></label>
          </div>

          <label>Beschreibung<input value={description} onChange={(event) => setDescription(event.target.value)} /></label>
          <label>Tags<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="3d, glow, button" /></label>

          <div className="custom-code-grid">
            <label>HTML<textarea spellCheck={false} value={html} onChange={(event) => setHtml(event.target.value)} /></label>
            <label>CSS<textarea spellCheck={false} value={css} onChange={(event) => setCss(event.target.value)} /></label>
          </div>

          <div className="custom-studio-actions">
            <button className="hero-secondary" type="button" onClick={onClose}>Abbrechen</button>
            <button className="hero-primary" type="button" onClick={save}>Design speichern</button>
          </div>
        </section>

        <section className="custom-studio-preview">
          <div className="preview-toolbar"><span><i /> Live preview</span><span>isolated iframe</span></div>
          <div className="custom-preview-shell"><CustomPreview design={preview} /></div>
          <div className="custom-preview-note">Scripts sind in der Vorschau deaktiviert. HTML/CSS kann dadurch die UI-Kit-Seite nicht überschreiben.</div>
        </section>
      </main>
    </div>
  )
}
