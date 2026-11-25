import { useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Euro, Home, MapPin, Search } from 'lucide-react'
import { properties, propertyTypes } from '../data/properties'
import { BUDGETS, toQueryString } from '../utils/filters'

function Field({ icon: Icon, label, htmlFor, children, className = '' }) {
  return (
    <div className={`group relative flex min-h-[64px] items-center gap-3 px-4 lg:px-5 ${className}`}>
      <Icon size={19} strokeWidth={1.6} className="shrink-0 text-coral-dark" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </label>
        {children}
      </div>
    </div>
  )
}

const controlClass =
  'block w-full appearance-none truncate bg-transparent py-0.5 pr-5 text-[15px] font-semibold text-navy placeholder:font-medium placeholder:text-ink-muted/70 focus:outline-none'

/** Barre de recherche principale : les critères sont transmis à la page de résultats via l'URL. */
export default function SearchBar({ initial = {}, className = '' }) {
  const navigate = useNavigate()
  const id = useId()
  const [values, setValues] = useState({
    transaction: initial.transaction ?? 'achat',
    ville: initial.ville ?? '',
    type: initial.type ?? '',
    budget: initial.budget ?? '',
  })

  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))].sort((a, b) => a.localeCompare(b, 'fr')), [])
  const update = (key) => (event) =>
    setValues((current) => ({
      ...current,
      [key]: event.target.value,
      ...(key === 'transaction' ? { budget: '' } : {}),
    }))

  const onSubmit = (event) => {
    event.preventDefault()
    navigate(`/recherche${toQueryString({ ...values, ville: values.ville.trim() })}`)
  }

  const chevron = (
    <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted lg:right-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )

  return (
    <form
      role="search"
      aria-label="Rechercher un bien"
      onSubmit={onSubmit}
      className={`rounded-card bg-white p-2 shadow-bar ring-1 ring-navy/5 ${className}`}
    >
      <div className="grid divide-y divide-line lg:grid-cols-[1fr_1.35fr_1.1fr_1.1fr_auto] lg:items-center lg:divide-x lg:divide-y-0">
        <Field icon={Home} label="Transaction" htmlFor={`${id}-transaction`}>
          <select id={`${id}-transaction`} value={values.transaction} onChange={update('transaction')} className={controlClass}>
            <option value="achat">Acheter</option>
            <option value="location">Louer</option>
          </select>
          {chevron}
        </Field>
        <Field icon={MapPin} label="Localisation" htmlFor={`${id}-ville`}>
          <input
            id={`${id}-ville`}
            type="text"
            list={`${id}-villes`}
            value={values.ville}
            onChange={update('ville')}
            placeholder="Ville ou code postal"
            autoComplete="off"
            className={controlClass}
          />
          <datalist id={`${id}-villes`}>
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </Field>
        <Field icon={Building2} label="Type de bien" htmlFor={`${id}-type`}>
          <select id={`${id}-type`} value={values.type} onChange={update('type')} className={controlClass}>
            <option value="">Tous les types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {chevron}
        </Field>
        <Field icon={Euro} label="Budget maximum" htmlFor={`${id}-budget`}>
          <select id={`${id}-budget`} value={values.budget} onChange={update('budget')} className={controlClass}>
            <option value="">Sans limite</option>
            {BUDGETS[values.transaction].map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {chevron}
        </Field>
        <div className="pt-2 lg:pl-2 lg:pt-0">
          <button type="submit" className="btn-coral min-h-[56px] w-full px-8 lg:w-auto">
            <Search size={18} strokeWidth={2} aria-hidden="true" />
            Rechercher
          </button>
        </div>
      </div>
    </form>
  )
}
