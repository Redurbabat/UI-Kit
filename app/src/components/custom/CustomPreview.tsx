import { useMemo } from 'react'
import type { CustomDesign } from '../../custom/types'

export interface PreviewSettings {
  background: 'dark' | 'light' | 'grid' | 'transparent'
  accent: string
  speed: number
}

interface CustomPreviewProps {
  design: Pick<CustomDesign, 'name' | 'html' | 'css' | 'previewCss' | 'js'>
  className?: string
  settings?: Partial<PreviewSettings>
}

const DEFAULT_SETTINGS: PreviewSettings = {
  background: 'dark',
  accent: '#756cff',
  speed: 1,
}

function escapeClosingTag(value: string, tag: 'style' | 'script') {
  return value.replaceAll(`</${tag}>`, `<\\/${tag}>`)
}

function safeAccent(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_SETTINGS.accent
}

function buildDocument(design: CustomPreviewProps['design'], partialSettings?: Partial<PreviewSettings>) {
  const settings = { ...DEFAULT_SETTINGS, ...partialSettings }
  const accent = safeAccent(settings.accent)
  const speed = Math.min(3, Math.max(0.1, Number(settings.speed) || 1))
  const css = escapeClosingTag(design.previewCss ?? design.css, 'style')
  const js = escapeClosingTag(design.js ?? '', 'script')
  const backgrounds: Record<PreviewSettings['background'], string> = {
    dark: '#090b10',
    light: '#eef1f7',
    grid: `linear-gradient(#ffffff0b 1px,transparent 1px),linear-gradient(90deg,#ffffff0b 1px,transparent 1px),#090b10`,
    transparent: 'transparent',
  }
  const background = backgrounds[settings.background]
  const transitionDuration = Math.max(0.04, 0.3 / speed)

  const speedScript = `
const __redSpeed=${speed};
const __redApplySpeed=()=>document.getAnimations().forEach(animation=>{animation.playbackRate=__redSpeed});
__redApplySpeed();
document.addEventListener('animationstart',()=>requestAnimationFrame(__redApplySpeed),true);
new MutationObserver(()=>requestAnimationFrame(__redApplySpeed)).observe(document.body,{subtree:true,childList:true});`

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:;">
<style>
:root{--accent:${accent};--red-accent:${accent};--ui-accent:${accent};--playground-accent:${accent};--playground-speed:${speed}}
*{box-sizing:border-box;transition-duration:${transitionDuration}s!important}
html,body{width:100%;height:100%;margin:0}
body{display:grid;place-items:center;overflow:hidden;background:${background};background-size:${settings.background === 'grid' ? '24px 24px,24px 24px,auto' : 'auto'};color:${settings.background === 'light' ? '#11151d' : 'white'};font-family:Inter,system-ui,sans-serif;padding:24px}
${css}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
${design.html}
<script>${speedScript}${js ? `\n${js}` : ''}<\\/script>
</body>
</html>`
}

export function CustomPreview({ design, className, settings }: CustomPreviewProps) {
  const srcDoc = useMemo(() => buildDocument(design, settings), [design, settings])

  return (
    <iframe
      className={className ? `custom-preview ${className}` : 'custom-preview'}
      title={`${design.name} preview`}
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    />
  )
}
