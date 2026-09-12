import { useMemo } from 'react'
import type { CustomDesign } from '../../custom/types'

interface CustomPreviewProps {
  design: Pick<CustomDesign, 'name' | 'html' | 'css' | 'previewCss' | 'js'>
  className?: string
}

function escapeClosingTag(value: string, tag: 'style' | 'script') {
  return value.replaceAll(`</${tag}>`, `<\\/${tag}>`)
}

function buildDocument(design: CustomPreviewProps['design']) {
  const css = escapeClosingTag(design.previewCss ?? design.css, 'style')
  const js = escapeClosingTag(design.js ?? '', 'script')

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:;">
<style>
*{box-sizing:border-box}html,body{width:100%;height:100%;margin:0}body{display:grid;place-items:center;overflow:hidden;background:transparent;color:white;font-family:Inter,system-ui,sans-serif;padding:24px}
${css}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
${design.html}
${js ? `<script>${js}<\\/script>` : ''}
</body>
</html>`
}

export function CustomPreview({ design, className }: CustomPreviewProps) {
  const srcDoc = useMemo(() => buildDocument(design), [design])

  return (
    <iframe
      className={className ? `custom-preview ${className}` : 'custom-preview'}
      title={`${design.name} preview`}
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    />
  )
}
