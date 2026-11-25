import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeftRight, X } from 'lucide-react'
import { properties } from '../data/properties'
import { COMPARE_MAX, useCompare } from '../hooks/useCompare'

/** Barre flottante affichant la sélection du comparateur sur toutes les pages. */
export default function CompareBar() {
  const { ids, toggle, clear, notice } = useCompare()
  const { pathname } = useLocation()
  const selected = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean)
  const visible = selected.length > 0 && pathname !== '/comparer'

  return (
    <>
      {/* Espace réservé sous le footer pour que la barre ne masque jamais le contenu. */}
      {visible && <div className="h-28 bg-navy sm:h-32" aria-hidden="true" />}
      <AnimatePresence>
        {visible && (
          <motion.aside
            aria-label="Biens sélectionnés pour la comparaison"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-[760px] bg-navy p-3 text-white shadow-lift sm:inset-x-6 sm:bottom-5 sm:p-4"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <ul className="flex flex-1 items-center gap-2 overflow-hidden">
                {Array.from({ length: COMPARE_MAX }, (_, i) => selected[i]).map((p, i) =>
                  p ? (
                    <li key={p.id} className="relative shrink-0">
                      <img src={p.images[0]} alt={p.title} className="h-12 w-16 object-cover sm:h-14 sm:w-20" />
                      <button
                        type="button"
                        onClick={() => toggle(p.id)}
                        className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-coral text-white"
                        aria-label={`Retirer ${p.title} du comparateur`}
                      >
                        <X size={12} strokeWidth={3} />
                      </button>
                    </li>
                  ) : (
                    <li key={`vide-${i}`} className="hidden h-14 w-20 shrink-0 place-items-center border border-dashed border-white/25 text-[11px] text-white/45 sm:grid">
                      Vide
                    </li>
                  ),
                )}
              </ul>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={clear} className="hidden px-2 text-[13px] text-white/70 hover:text-white sm:block">
                  Vider
                </button>
                <Link
                  to="/comparer"
                  className={`btn-coral min-h-[44px] px-4 ${selected.length < 2 ? 'pointer-events-none opacity-50' : ''}`}
                  aria-disabled={selected.length < 2}
                  tabIndex={selected.length < 2 ? -1 : undefined}
                >
                  <ArrowLeftRight size={16} />
                  Comparer ({selected.length})
                </Link>
              </div>
            </div>
            {selected.length < 2 && <p className="mt-2 text-[12px] text-white/65">Ajoutez au moins un autre bien pour lancer la comparaison.</p>}
          </motion.aside>
        )}
      </AnimatePresence>
      <div aria-live="polite" className="sr-only">
        {notice}
      </div>
      <AnimatePresence>
        {notice && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-md bg-white p-4 text-center text-[14px] text-navy shadow-lift sm:bottom-32"
          >
            {notice}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
