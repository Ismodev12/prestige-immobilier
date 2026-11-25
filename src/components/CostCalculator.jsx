import { useId, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { useFinanceSettings } from '../hooks/useFinanceSettings'
import { ASSUMPTIONS, purchaseCost } from '../utils/finance'
import { formatNumber, formatPrice } from '../utils/format'

const euros = (v) => `${formatNumber(Math.round(v))} €`

/** Coût réel d'un bien à l'achat : mensualité complète et budget total, réglables par le visiteur. */
export default function CostCalculator({ property }) {
  const id = useId()
  const [settings, update] = useFinanceSettings()
  const downPayment = Math.min(settings.downPayment, property.price)
  const cost = useMemo(() => purchaseCost(property, { ...settings, downPayment }), [property, settings, downPayment])

  return (
    <div className="border border-line bg-white">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
        {/* Réglages */}
        <div className="space-y-6 border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <label htmlFor={`${id}-apport`} className="field-label !mb-0">
                Votre apport
              </label>
              <span className="font-display text-[15px] font-medium text-navy">{euros(downPayment)}</span>
            </div>
            <input
              id={`${id}-apport`}
              type="range"
              min={0}
              max={property.price}
              step={5000}
              value={downPayment}
              onChange={(e) => update({ downPayment: Number(e.target.value) })}
              className="w-full accent-[#D85C45]"
            />
            <p className="mt-1 text-[12px] text-ink-muted">
              Les banques attendent souvent un apport couvrant au moins les frais de notaire ({euros(cost.notary)}).
            </p>
          </div>

          <fieldset>
            <legend className="field-label">Durée du prêt</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {[15, 20, 25].map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={settings.years === y}
                  onClick={() => update({ years: y })}
                  className={`min-h-[42px] rounded-[3px] border text-[14px] font-semibold transition-colors ${
                    settings.years === y ? 'border-navy bg-navy text-white' : 'border-line text-ink hover:border-navy/40'
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
              value={settings.rate}
              onChange={(e) => update({ rate: Math.max(0, Math.min(10, Number(e.target.value) || 0)) })}
              className="field max-w-[160px]"
            />
          </div>

          <dl className="space-y-2 border-t border-line pt-5 text-[14px]">
            {[
              ['Prix du bien', formatPrice(property.price)],
              ['Frais de notaire estimés', euros(cost.notary)],
              ['Garantie du prêt', euros(cost.guarantee)],
              ['Montant emprunté', euros(cost.loan)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-ink-muted">{label}</dt>
                <dd className="font-semibold text-navy">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-2">
              <dt className="font-semibold text-navy">Budget total</dt>
              <dd className="font-display text-[16px] font-medium text-navy">{euros(cost.totalBudget)}</dd>
            </div>
          </dl>
        </div>

        {/* Résultat */}
        <div className="bg-peach p-6 sm:p-8" aria-live="polite">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-coral-dark">Coût mensuel réel estimé</p>
          <p className="mt-2 font-display text-[38px] font-medium leading-none text-navy sm:text-[44px]">
            {euros(cost.monthly)}
            <span className="ml-1 text-[16px] font-normal text-ink-muted">/ mois</span>
          </p>

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white" aria-hidden="true">
            {cost.lines.map((line) => (
              <motion.span
                key={line.key}
                className="h-full"
                style={{ backgroundColor: line.color }}
                animate={{ width: `${(line.value / cost.monthly) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          <ul className="mt-6 space-y-3 text-[14px]">
            {cost.lines.map((line) => (
              <li key={line.key} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5 text-ink-muted">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-navy/10" style={{ backgroundColor: line.color }} />
                  {line.label}
                </span>
                <span className="font-semibold text-navy">{euros(line.value)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-coral/20 pt-5 text-[13.5px] text-ink-muted">
            <p>
              Revenus nets conseillés : <strong className="text-navy">{euros(cost.recommendedIncome)} / mois</strong> (taux d’endettement de 35 %).
            </p>
            <p>
              Coût total du crédit sur {settings.years} ans : <strong className="text-navy">{euros(cost.creditCost)}</strong>.
            </p>
          </div>

          <p className="mt-5 flex gap-2 text-[12px] leading-relaxed text-ink-muted">
            <Info size={14} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
            Estimation indicative : frais de notaire à {ASSUMPTIONS.notaryRate * 100} %, assurance à{' '}
            {String(ASSUMPTIONS.insuranceRate * 100).replace('.', ',')} % par an, énergie calculée à partir du DPE. Elle ne remplace
            pas une offre de prêt.
          </p>
          <Link to="/simulateur" className="link-arrow mt-5">
            Calculer mon budget d’achat <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
