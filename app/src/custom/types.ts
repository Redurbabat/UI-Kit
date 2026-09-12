export interface CustomDesign {
  id: string
  name: string
  category: string
  description: string
  html: string
  css: string
  js?: string
  previewCss?: string
  tags: string[]
  source: 'seed' | 'user'
}

export const CUSTOM_STORAGE_KEY = 'red-ui-kit.custom-designs.v1'

export function makeCustomId(name: string) {
  const slug = name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `custom-${slug || Date.now()}`
}
