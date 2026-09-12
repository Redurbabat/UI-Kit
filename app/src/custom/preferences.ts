import { useEffect, useMemo, useState } from 'react'

const FAVORITES_KEY = 'red-ui-kit.favorites.v1'
const FAVORITES_EVENT = 'red-ui-kit:favorites-changed'
const RATINGS_KEY = 'red-ui-kit.ratings.v1'
const RATINGS_EVENT = 'red-ui-kit:ratings-changed'

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
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: values }))
}

function readRatings(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(RATINGS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed)
        .filter((entry): entry is [string, number] => typeof entry[1] === 'number' && entry[1] >= 1 && entry[1] <= 5),
    )
  } catch {
    return {}
  }
}

function writeRatings(values: Record<string, number>) {
  window.localStorage.setItem(RATINGS_KEY, JSON.stringify(values))
  window.dispatchEvent(new CustomEvent(RATINGS_EVENT, { detail: values }))
}

export function useDesignFavorites() {
  const [ids, setIds] = useState<string[]>(() => readFavorites())

  useEffect(() => {
    const sync = () => setIds(readFavorites())
    window.addEventListener('storage', sync)
    window.addEventListener(FAVORITES_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(FAVORITES_EVENT, sync)
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

export function useDesignRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>(() => readRatings())

  useEffect(() => {
    const sync = () => setRatings(readRatings())
    window.addEventListener('storage', sync)
    window.addEventListener(RATINGS_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(RATINGS_EVENT, sync)
    }
  }, [])

  const rateDesign = (id: string, rating: number) => {
    const value = Math.min(5, Math.max(1, Math.round(rating)))
    const next = { ...readRatings(), [id]: value }
    writeRatings(next)
    setRatings(next)
  }

  const clearRating = (id: string) => {
    const next = { ...readRatings() }
    delete next[id]
    writeRatings(next)
    setRatings(next)
  }

  return { ratings, rateDesign, clearRating }
}
