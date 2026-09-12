import { useMemo, useState } from 'react'
import { makeCustomId, type CustomDesign } from '../../custom/types'
import { appleDepthMotionCss, appleDepthMotionJs } from '../../custom/motion/appleDepthPreset'
import { CustomPreview } from './CustomPreview'

interface CustomDesignStudioProps {
  onSave: (design: CustomDesign) => void
  onClose: () => void
}

type MotionPreset = 'none' | 'apple-depth'

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

const applePresetWrapperCss = `.red-apple-preset-wrap {
  display: inline-grid;
  place-items: center;
  max-width: 100%;
  border-radius: 30px;
  transform-origin: center;
}
.red-apple-preset-wrap > [data-apple-layer] {
  display: grid;
  place-items: center;
  max-width: 100%;
}`

function withMotionPreset(
  preset: MotionPreset,
  html: string,
  css: string,
  js: string,
) {
  if (preset === 'none') return { html, css, js }

  return {
    html: `<div class="red-apple-preset-wrap" data-apple-depth>
  <div data-apple-layer style="--apple-z: 18px">
${html}
  </div>
</div>`,
    css: `${appleDepthMotionCss}\n${applePresetWrapperCss}\n${css}`,
    js: `${appleDepthMotionJs}\n${js}`.trim(),
  }
}

export function CustomDesignStudio({ onSave, onClose }: CustomDesignStudioProps) {
  const [name, setName] = useState('My Design')
  const [category, setCategory] = useState('Buttons')
  const [description, setDescription] = useState('Eigenes HTML/CSS/JS Design')
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [js, setJs] = useState('')
  const [tags, setTags] = useState('custom, css')
  const [motionPreset, setMotionPreset] = useState<MotionPreset>('none')

  const composed = useMemo(
    () => withMotionPreset(motionPreset, html, css, js),
    [motionPreset, html, css, js],
  )

  const preview = useMemo(
    () => ({ name: name || 'Preview', ...composed }),
    [name, composed],
  )

  const save = () => {
    const trimmedName = name.trim()
    if (!trimmedName || !html.trim() || !css.trim()) return

    const finalTags = tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    if (motionPreset === 'apple-depth') finalTags.push('apple-depth', '3d', 'motion')

    onSave({
      id: `${makeCustomId(trimmedName)}-${Date.now()}`,
      name: trimmedName,
      category: category.trim() || 'Other',
      description: description.trim(),
      html: composed.html,
      css: composed.css,
      js: composed.js.trim() || undefined,
      tags: [...new Set(finalTags)],
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
            <p>HTML, CSS und optional JavaScript einfügen, direkt testen und lokal im Browser speichern.</p>
          </div>

          <div className="custom-meta-grid">
            <label>Name<input value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Kategorie<input value={category} onChange={(event) => setCategory(event.target.value)} /></label>
          </div>

          <label>Beschreibung<input value={description} onChange={(event) => setDescription(event.target.value)} /></label>
          <label>Tags<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="3d, glow, button" /></label>

          <div className="custom-meta-grid">
            <label>
              Motion preset
              <select value={motionPreset} onChange={(event) => setMotionPreset(event.target.value as MotionPreset)}>
                <option value="none">None — Original design</option>
                <option value="apple-depth">Apple Depth — glass light + soft 3D tilt</option>
              </select>
            </label>
            <div className="motion-preset-hint">
              <span>{motionPreset === 'apple-depth' ? 'Apple Depth active' : 'No motion preset'}</span>
              <small>{motionPreset === 'apple-depth' ? 'Pointer light, subtle perspective, press depth and spring return are added automatically.' : 'Your HTML, CSS and JS are previewed unchanged.'}</small>
            </div>
          </div>

          <div className="custom-code-grid custom-code-grid--three">
            <label>HTML<textarea spellCheck={false} value={html} onChange={(event) => setHtml(event.target.value)} /></label>
            <label>CSS<textarea spellCheck={false} value={css} onChange={(event) => setCss(event.target.value)} /></label>
            <label>JavaScript <span className="optional-label">optional</span><textarea spellCheck={false} value={js} onChange={(event) => setJs(event.target.value)} placeholder="// optional: pointer, particles, physics …" /></label>
          </div>

          <div className="custom-studio-actions">
            <button className="hero-secondary" type="button" onClick={onClose}>Abbrechen</button>
            <button className="hero-primary" type="button" onClick={save}>Design speichern</button>
          </div>
        </section>

        <section className="custom-studio-preview">
          <div className="preview-toolbar"><span><i /> Live preview</span><span>{motionPreset === 'apple-depth' ? 'Apple Depth · isolated iframe' : 'isolated iframe'}</span></div>
          <div className="custom-preview-shell"><CustomPreview design={preview} /></div>
          <div className="custom-preview-note">JavaScript läuft nur im isolierten iframe. Netzwerkzugriffe sind per CSP blockiert; die Hauptseite und ihr Storage bleiben getrennt.</div>
        </section>
      </main>
    </div>
  )
}
