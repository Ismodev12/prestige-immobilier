import { useEffect, useId, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { properties, propertyTypes } from '../data/properties'
import { BUDGETS, SORT_OPTIONS, countActiveFilters, filterProperties, parseFilters } from '../utils/filters'
import { plural } from '../utils/format'
import PropertyCard from './PropertyCard'

function Filters({ filters, onChange, onReset, lockTransaction, idPrefix }) {
  const set = (key) => (event) => onChange({ [key]: event.target.value })
  return (
    <div className="space-y-6">
      {!lockTransaction && (
        <fieldset>
          <legend className="field-label">Transaction</legend>
          <div className="grid grid-cols-2 rounded-[4px] border border-line p-1">
            {[
              ['achat', 'Acheter'],
              ['location', 'Louer'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filters.transaction === value}
                onClick={() => onChange({ transaction: value, budget: '' })}
                className={`min-h-[40px] rounded-[3px] text-[14px] font-semibold transition-colors ${
                  filters.transaction === value ? 'bg-navy text-white' : 'text-ink-muted hover:text-navy'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div>
        <label htmlFor={`${idPrefix}-ville`} className="field-label">
          Ville ou code postal
        </label>
        <input id={`${idPrefix}-ville`} value={filters.ville} onChange={set('ville')} className="field" placeholder="Paris, 06600..." />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-type`} className="field-label">
          Type de bien
        </label>
        <select id={`${idPrefix}-type`} value={filters.type} onChange={set('type')} className="field">
          <option value="">Tous les types</option>
          {propertyTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-budget`} className="field-label">
          Budget maximum
        </label>
        <select id={`${idPrefix}-budget`} value={filters.budget} onChange={set('budget')} className="field">
          <option value="">Sans limite</option>
          {BUDGETS[filters.transaction].map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="field-label">Chambres minimum</legend>
        <div className="grid grid-cols-5 gap-1.5">
          {['', '1', '2', '3', '4'].map((value) => (
            <button
              key={value || 'all'}
              type="button"
              aria-pressed={filters.chambres === value}
              onClick={() => onChange({ chambres: value })}
              className={`min-h-[42px] rounded-[4px] border text-[14px] font-semibold transition-colors ${
                filters.chambres === value ? 'border-navy bg-navy text-white' : 'border-line text-ink hover:border-navy/40'
              }`}
            >
              {value ? `${value}+` : 'Tous'}
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${idPrefix}-surface`} className="field-label">
          Surface minimum
        </label>
        <select id={`${idPrefix}-surface`} value={filters.surface} onChange={set('surface')} className="field">
          <option value="">Toutes surfaces</option>
          {[50, 100, 150, 200, 300].map((s) => (
            <option key={s} value={s}>
              {s} m² et plus
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={onReset} className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy hover:text-coral-dark">
        <RotateCcw size={15} />
        Réinitialiser les filtres
      </button>
    </div>
  )
}

/**
 * Liste filtrable de biens. Les critères vivent dans l'URL : la page est partageable et le bouton
 * « retour » du navigateur restaure la recherche précédente.
 */
export default function ListingView({ transaction }) {
  const idPrefix = useId()
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(searchParams, transaction ? { transaction } : {}), [searchParams, transaction])
  const results = useMemo(() => filterProperties(properties, filters), [filters])
  const [drawer, setDrawer] = useState(false)
  const active = countActiveFilters(filters)

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  const update = (patch) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    if (transaction) next.delete('transaction')
    setSearchParams(next, { replace: true })
  }
  const resetAll = () => setSearchParams(transaction ? {} : { transaction: filters.transaction }, { replace: true })

  const filterPanel = (
    <Filters filters={filters} onChange={update} onReset={resetAll} lockTransaction={Boolean(transaction)} idPrefix={idPrefix} />
  )

  return (
    <div className="container-site py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] xl:gap-14">
        <aside className="hidden lg:block" aria-label="Filtres de recherche">
          <div className="sticky top-28 rounded-card border border-line bg-white p-6">
            <h2 className="mb-6 flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy">
              <SlidersHorizontal size={16} className="text-coral-dark" />
              Affiner la recherche
            </h2>
            {filterPanel}
          </div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <p className="text-[15px] text-ink-muted" aria-live="polite">
              <strong className="font-display text-[22px] font-semibold text-navy">{results.length}</strong>{' '}
              {results.length > 1 ? 'biens correspondent' : 'bien correspond'} à votre recherche
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="btn-outline min-h-[44px] px-4 text-[14px] lg:hidden"
                aria-haspopup="dialog"
              >
                <SlidersHorizontal size={16} />
                Filtres{active > 0 && ` (${active})`}
              </button>
              <label htmlFor={`${idPrefix}-tri`} className="sr-only">
                Trier les résultats
              </label>
              <select
                id={`${idPrefix}-tri`}
                value={filters.tri}
                onChange={(e) => update({ tri: e.target.value === 'recent' ? '' : e.target.value })}
                className="field min-h-[44px] w-auto py-0 text-[14px] font-semibold"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length > 0 ? (
            <motion.ul layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((property, index) => (
                  <motion.li
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                  >
                    <PropertyCard property={property} priority={index < 3} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="rounded-card border border-dashed border-navy/15 bg-mist px-6 py-16 text-center">
              <SearchX size={40} strokeWidth={1.2} className="mx-auto text-coral-dark" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Aucun bien ne correspond pour le moment</h2>
              <p className="mx-auto mt-3 max-w-md text-ink-muted">
                Élargissez vos critères, ou confiez-nous votre recherche : nos conseillers vous présentent aussi des biens vendus en
                toute discrétion, hors annonces.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={resetAll} className="btn-navy">
                  <RotateCcw size={16} />
                  Réinitialiser les filtres
                </button>
                <Link to="/contact" className="btn-outline">
                  Confier ma recherche
                </Link>
              </div>
            </div>
          )}
          {results.length > 0 && (
            <p className="mt-10 text-center text-[14px] text-ink-muted">
              {plural(results.length, 'bien affiché', 'biens affichés')}. Vous ne trouvez pas votre bonheur ?{' '}
              <Link to="/contact" className="font-semibold text-navy underline decoration-coral underline-offset-4 hover:text-coral-dark">
                Confiez-nous votre recherche
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      {/* Filtres mobiles : panneau plein écran */}
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy/60" onClick={() => setDrawer(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtres de recherche"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-[12px] bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="text-xl font-semibold">Filtres</h2>
                <button type="button" onClick={() => setDrawer(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-mist" aria-label="Fermer les filtres">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">{filterPanel}</div>
              <div className="border-t border-line p-4">
                <button type="button" onClick={() => setDrawer(false)} className="btn-coral w-full">
                  Voir {plural(results.length, 'bien')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
