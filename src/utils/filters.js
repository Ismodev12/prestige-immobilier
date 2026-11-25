import { normalize } from './format'

// Critères de recherche transmis dans l'URL (?transaction=achat&ville=Paris&type=Villa&budget=1000000...).
export const DEFAULT_FILTERS = {
  transaction: 'achat',
  ville: '',
  type: '',
  budget: '',
  chambres: '',
  surface: '',
  tri: 'recent',
}

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
  { value: 'surface-desc', label: 'Surface décroissante' },
]

export const BUDGETS = {
  achat: [
    { value: '500000', label: '500 000 €' },
    { value: '750000', label: '750 000 €' },
    { value: '1000000', label: '1 000 000 €' },
    { value: '1500000', label: '1 500 000 €' },
    { value: '2000000', label: '2 000 000 €' },
    { value: '3000000', label: '3 000 000 €' },
  ],
  location: [
    { value: '2000', label: '2 000 € / mois' },
    { value: '3000', label: '3 000 € / mois' },
    { value: '4500', label: '4 500 € / mois' },
    { value: '7000', label: '7 000 € / mois' },
  ],
}

export const parseFilters = (searchParams, overrides = {}) => {
  const filters = { ...DEFAULT_FILTERS }
  Object.keys(DEFAULT_FILTERS).forEach((key) => {
    const value = searchParams.get(key)
    if (value !== null) filters[key] = value
  })
  if (!['achat', 'location'].includes(filters.transaction)) filters.transaction = 'achat'
  return { ...filters, ...overrides }
}

/** Construit la chaîne de requête en omettant les critères vides ou par défaut. */
export const toQueryString = (filters, { keepTransaction = true } = {}) => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return
    if (key === 'tri' && value === DEFAULT_FILTERS.tri) return
    if (key === 'transaction' && !keepTransaction) return
    params.set(key, value)
  })
  const query = params.toString()
  return query ? `?${query}` : ''
}

export const filterProperties = (list, filters) => {
  const city = normalize(filters.ville)
  const result = list.filter((p) => {
    if (filters.transaction && p.transaction !== filters.transaction) return false
    if (filters.type && p.type !== filters.type) return false
    if (filters.budget && p.price > Number(filters.budget)) return false
    if (filters.chambres && p.bedrooms < Number(filters.chambres)) return false
    if (filters.surface && p.surface < Number(filters.surface)) return false
    if (city) {
      const haystack = normalize(`${p.city} ${p.district} ${p.postalCode}`)
      if (!haystack.includes(city)) return false
    }
    return true
  })

  const sorters = {
    'prix-asc': (a, b) => a.price - b.price,
    'prix-desc': (a, b) => b.price - a.price,
    'surface-desc': (a, b) => b.surface - a.surface,
  }
  return sorters[filters.tri] ? [...result].sort(sorters[filters.tri]) : result
}

export const countActiveFilters = (filters) =>
  ['ville', 'type', 'budget', 'chambres', 'surface'].filter((key) => filters[key]).length
