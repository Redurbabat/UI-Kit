import { useEffect, useMemo, useState } from 'react'

const FAVORITES_KEY = 'red-ui-kit.favorites.v1'
const EVENT_NAME = 'red-ui-kit:favorites-changed'

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

function writeFavorites(values: string[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(values))
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: values }))
}

export function useDesignFavorites() {
  const [ids, setIds] = useState<string[]>(() => readFavorites())

  useEffect(() => {
    const sync = () => setIds(readFavorites())
    window.addEventListener('storage', sync)
    window.addEventListener(EVENT_NAME, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(EVENT_NAME, sync)
    }
  }, [])

  const favorites = useMemo(() => new Set(ids), [ids])

  const toggleFavorite = (id: string) => {
    const next = new Set(readFavorites())
    if (next.has(id)) next.delete(id)
    else next.add(id)
    const values = [...next]
    writeFavorites(values)
    setIds(values)
  }

  return { favorites, toggleFavorite }
}
