import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Favoris conservés dans le navigateur du visiteur (localStorage).
const STORAGE_KEY = 'pi-favorites'
const FavoritesContext = createContext(null)

const readStorage = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Stockage indisponible : les favoris restent actifs pour la session.
    }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
  }, [])

  const value = useMemo(() => ({ ids, toggle, isFavorite: (id) => ids.includes(id) }), [ids, toggle])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites doit être utilisé dans FavoritesProvider')
  return context
}
