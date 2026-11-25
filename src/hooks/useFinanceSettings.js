import { useEffect, useState } from 'react'
import { DEFAULT_SETTINGS } from '../utils/finance'

// Paramètres de financement du visiteur (apport, durée, taux, revenus), partagés entre le simulateur,
// les fiches biens et le comparateur. Conservés dans le navigateur uniquement.
const KEY = 'pi-finance'

const read = () => {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function useFinanceSettings() {
  const [settings, setSettings] = useState(read)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      // Stockage indisponible : les réglages restent valables pour la page en cours.
    }
  }, [settings])
  const update = (patch) => setSettings((s) => ({ ...s, ...patch }))
  return [settings, update]
}
