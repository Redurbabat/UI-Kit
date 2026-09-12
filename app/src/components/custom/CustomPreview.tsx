import { useMemo } from 'react'
import type { CustomDesign } from '../../custom/types'

interface CustomPreviewProps {
  design: Pick<CustomDesign, 'name' | 'html' | 'css' | 'previewCss'>
  className?: string
}

function buildDocument(design: CustomPreviewProps['design']) {
  const css = (design.previewCss ?? design.css).replaceAll('</style>', '<\\/style>')
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
*{box-sizing:border-box}html,body{width:100%;height:100%;margin:0}body{display:grid;place-items:center;overflow:hidden;background:transparent;color:white;font-family:Inter,system-ui,sans-serif;padding:24px}
${css}
</style>
</head>
<body>${design.html}</body>
</html>`
}

export function CustomPreview({ design, className }: CustomPreviewProps) {
  const srcDoc = useMemo(() => buildDocument(design), [design])

  return (
    <iframe
      className={className ? `custom-preview ${className}` : 'custom-preview'}
      title={`${design.name} preview`}
      sandbox=""
      srcDoc={srcDoc}
    />
  )
}
