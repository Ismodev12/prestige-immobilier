import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Sélection de biens à comparer (3 au maximum), conservée dans le navigateur.
const KEY = 'pi-compare'
export const COMPARE_MAX = 3
const CompareContext = createContext(null)

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.slice(0, COMPARE_MAX) : []
  } catch {
    return []
  }
}

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(read)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      // Stockage indisponible : la sélection reste active pendant la visite.
    }
  }, [ids])

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(t)
  }, [notice])

  const toggle = useCallback((id) => {
    setIds((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id)
      if (current.length >= COMPARE_MAX) {
        setNotice(`Vous pouvez comparer ${COMPARE_MAX} biens au maximum. Retirez-en un pour en ajouter un autre.`)
        return current
      }
      return [...current, id]
    })
  }, [])

  const value = useMemo(
    () => ({ ids, toggle, clear: () => setIds([]), isSelected: (id) => ids.includes(id), notice }),
    [ids, toggle, notice],
  )
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare doit être utilisé dans CompareProvider')
  return ctx
}
