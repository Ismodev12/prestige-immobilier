import { useId, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'
import { useFinanceSettings } from '../hooks/useFinanceSettings'
import { useSeo } from '../hooks/useSeo'
import { ASSUMPTIONS, maxBudget } from '../utils/finance'
import { formatNumber, plural } from '../utils/format'

const euros = (v) => `${formatNumber(Math.round(v))} €`

function MoneyField({ id, label, value, onChange, hint, step = 100 }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="field pr-10"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted">€</span>
      </div>
      {hint && <p className="mt-1.5 text-[12.5px] text-ink-muted">{hint}</p>}
    </div>
  )
}

export default function Simulator() {
  useSeo({
    title: 'Simulateur de budget immobilier',
    description: 'Calculez en quelques secondes votre budget d’achat réel : capacité d’emprunt, frais de notaire, garantie et biens accessibles.',
  })
  const id = useId()
  const [s, update] = useFinanceSettings()
  const result = useMemo(() => maxBudget(s), [s])
  const matches = useMemo(
    () => properties.filter((p) => p.transaction === 'achat' && p.price <= result.price).sort((a, b) => b.price - a.price),
    [result.price],
  )

  return (
    <>
      <PageHero
        compact
        title="Quel bien pouvez-vous vraiment acheter ?"
        intro="Indiquez vos revenus et votre apport : nous calculons votre budget complet, frais de notaire et garantie compris, puis les biens qui y correspondent."
        breadcrumbs={[{ label: 'Acheter', to: '/acheter' }, { label: 'Simulateur de budget' }]}
      />

      <section className="container-site grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal className="space-y-6 border border-line bg-white p-6 sm:p-8">
          <h2 className="text-[22px] font-normal">Votre situation</h2>
          <MoneyField id={`${id}-rev`} label="Revenus nets mensuels du foyer" value={s.income} onChange={(v) => update({ income: v })} hint="Salaires, revenus fonciers retenus par la banque, pensions." />
          <MoneyField id={`${id}-dettes`} label="Autres crédits en cours (mensualités)" value={s.otherDebts} onChange={(v) => update({ otherDebts: v })} />
          <MoneyField id={`${id}-apport`} label="Apport personnel" value={s.downPayment} step={5000} onChange={(v) => update({ downPayment: v })} hint="Épargne disponible pour le projet." />
          <div className="grid gap-5 sm:grid-cols-2">
            <fieldset>
              <legend className="field-label">Durée du prêt</legend>
              <div className="grid grid-cols-3 gap-1.5">
                {[15, 20, 25].map((y) => (
                  <button
                    key={y}
                    type="button"
                    aria-pressed={s.years === y}
                    onClick={() => update({ years: y })}
                    className={`min-h-[46px] rounded-[3px] border text-[14px] font-semibold transition-colors ${
                      s.years === y ? 'border-navy bg-navy text-white' : 'border-line text-ink hover:border-navy/40'
                    }`}
                  >
                    {y} ans
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${id}-taux`} className="field-label">
                Taux d’intérêt (%)
              </label>
              <input
                id={`${id}-taux`}
                type="number"
                min={0}
                max={10}
                step={0.05}
                value={s.rate}
                onChange={(e) => update({ rate: Math.max(0, Math.min(10, Number(e.target.value) || 0)) })}
                className="field"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bg-navy p-6 text-white sm:p-10" aria-live="polite">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-coral-light">Votre budget d’achat</p>
          <p className="mt-3 font-display text-[44px] font-medium leading-none sm:text-[54px]">{euros(result.price)}</p>
          <p className="mt-3 text-[14px] text-white/70">Prix maximal du bien, hors frais d’acquisition.</p>

          <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-[14.5px]">
            {[
              ['Mensualité maximale (35 % des revenus)', `${euros(result.maxPayment)} / mois`],
              ['Dont crédit', `${euros(result.credit)} / mois`],
              ['Dont assurance emprunteur', `${euros(result.insurance)} / mois`],
              ['Montant empruntable', euros(result.loan)],
              ['Apport', euros(result.downPayment)],
              ['Frais de notaire estimés', euros(result.notary)],
              ['Garantie du prêt', euros(result.guarantee)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-white/70">{label}</dt>
                <dd className="text-right font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <Link to={`/acheter?budget=${result.price}`} className="btn-coral mt-8 w-full sm:w-auto">
            {matches.length === 0 ? 'Voir les biens à vendre' : matches.length === 1 ? 'Voir le bien dans mon budget' : `Voir les ${matches.length} biens dans mon budget`}{' '}
            <ArrowRight size={16} />
          </Link>
          <p className="mt-6 flex gap-2 text-[12px] leading-relaxed text-white/60">
            <Info size={14} className="mt-0.5 shrink-0 text-coral-light" aria-hidden="true" />
            Simulation indicative fondée sur un taux d’endettement de 35 % assurance comprise, des frais de notaire de{' '}
            {ASSUMPTIONS.notaryRate * 100} % (ancien) et une garantie de 1 %. Seule une banque ou un courtier peut confirmer votre
            capacité de financement.
          </p>
        </Reveal>
      </section>

      <section className="bg-peach py-14 sm:py-16" aria-labelledby="sim-biens">
        <div className="container-site">
          <h2 id="sim-biens" className="mb-8 text-[24px] font-normal sm:text-[28px]">
            {matches.length ? `${plural(matches.length, 'bien correspond', 'biens correspondent')} à votre budget` : 'Aucun bien en vente dans ce budget pour le moment'}
          </h2>
          {matches.length ? (
            <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {matches.slice(0, 6).map((p) => (
                <li key={p.id} className="bg-white p-3">
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl text-ink-muted">
              Augmentez la durée ou l’apport, ou{' '}
              <Link to="/contact" className="font-semibold text-navy underline decoration-coral underline-offset-4">
                confiez-nous votre recherche
              </Link>{' '}
              : certains biens sont vendus hors annonces.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
