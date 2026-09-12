import { CUSTOM_STORAGE_KEY, type CustomDesign } from './types'

export function loadUserDesigns(): CustomDesign[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is CustomDesign => {
      if (!item || typeof item !== 'object') return false
      const design = item as Partial<CustomDesign>
      return Boolean(
        design.id &&
          design.name &&
          design.category &&
          typeof design.html === 'string' &&
          typeof design.css === 'string',
      )
    })
  } catch {
    return []
  }
}

export function saveUserDesigns(designs: CustomDesign[]) {
  window.localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(designs))
}
