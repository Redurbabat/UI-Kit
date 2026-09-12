import type { UiComponentDefinition } from './componentRegistry'
import { getComponentCode as getBaseComponentCode, type ComponentCode } from './codeSnippets'
import { getStylePackCss, stylePackIds } from './stylePacks'

export function getEnhancedComponentCode(component: UiComponentDefinition): ComponentCode {
  const base = getBaseComponentCode(component)

  if (!stylePackIds.has(component.variant)) {
    return base
  }

  const packCss = getStylePackCss(component.family, component.variant)
  const css = `${base.css}\n\n${packCss}`.trim()

  return {
    ...base,
    css,
    all: `${base.react}\n\n/* CSS */\n${css}`,
  }
}
