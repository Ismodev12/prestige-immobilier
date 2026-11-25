import { Link } from 'react-router-dom'
import { ArrowLeftRight, Check, Minus, Trophy, X } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { properties } from '../data/properties'
import { useCompare } from '../hooks/useCompare'
import { useFinanceSettings } from '../hooks/useFinanceSettings'
import { useSeo } from '../hooks/useSeo'
import { purchaseCost } from '../utils/finance'
import { formatListingPrice, formatNumber, formatSurface } from '../utils/format'

const DPE_ORDER = 'ABCDEFG'
const euros = (v) => `${formatNumber(Math.round(v))} €`

/**
 * Lignes du tableau. `score` sert à désigner la meilleure valeur (la plus haute gagne) ;
 * une ligne sans `score` n'est pas départagée.
 */
const buildRows = (settings) => [
  { label: 'Prix', render: (p) => formatListingPrice(p) },
  {
    label: 'Prix au m²',
    render: (p) => `${formatNumber(Math.round(p.price / p.surface))} €`,
    score: (p) => -p.price / p.surface,
  },
  {
    label: 'Coût mensuel réel',
    hint: 'Crédit, assurance, taxe foncière, charges et énergie, avec vos réglages de financement.',
    render: (p) => (p.transaction === 'achat' ? `${euros(purchaseCost(p, settings).monthly)} / mois` : `${euros(p.price)} / mois`),
    score: (p) => -(p.transaction === 'achat' ? purchaseCost(p, settings).monthly : p.price),
  },
  { label: 'Surface', render: (p) => formatSurface(p.surface), score: (p) => p.surface },
  { label: 'Pièces', render: (p) => p.rooms, score: (p) => p.rooms },
  { label: 'Chambres', render: (p) => p.bedrooms, score: (p) => p.bedrooms },
  { label: 'Salles de bains', render: (p) => p.bathrooms, score: (p) => p.bathrooms },
  { label: 'Terrain', render: (p) => (p.land ? formatSurface(p.land) : null), score: (p) => p.land ?? 0 },
  { label: 'Étage', render: (p) => p.floor ?? null },
  { label: 'Année de construction', render: (p) => p.yearBuilt },
  {
    label: 'DPE',
    render: (p) => `${p.energy.dpe} (${p.energy.consumption} kWh/m²/an)`,
    score: (p) => -DPE_ORDER.indexOf(p.energy.dpe),
  },
  { label: 'GES', render: (p) => p.energy.ges, score: (p) => -DPE_ORDER.indexOf(p.energy.ges) },
  { label: 'Taxe foncière', render: (p) => (p.propertyTax ? `${euros(p.propertyTax)} / an` : null) },
  { label: 'Charges de copropriété', render: (p) => (p.charges ? `${euros(p.charges)} / mois` : p.transaction === 'achat' ? 'Aucune' : null) },
]

export default function Compare() {
  useSeo({ title: 'Comparateur de biens', description: 'Comparez jusqu’à trois biens côte à côte : prix au m², coût mensuel réel, DPE, surfaces et prestations.' })
  const { ids, toggle, clear } = useCompare()
  const [settings] = useFinanceSettings()
  const list = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean)
  const rows = buildRows(settings)

  const bestIndex = (row) => {
    if (!row.score || list.length < 2) return -1
    const scores = list.map((p) => (row.render(p) === null ? -Infinity : row.score(p)))
    const max = Math.max(...scores)
    // Pas de « meilleur » si toutes les valeurs sont identiques.
    return scores.filter((s) => s === max).length === 1 ? scores.indexOf(max) : -1
  }

  return (
    <>
      <PageHero compact title="Comparateur de biens" intro="Vos biens sélectionnés côte à côte. La meilleure valeur de chaque critère est mise en évidence." breadcrumbs={[{ label: 'Comparateur' }]} />

      <div className="container-site py-12 sm:py-16">
        {list.length === 0 ? (
          <div className="border border-dashed border-navy/15 bg-mist px-6 py-16 text-center">
            <ArrowLeftRight size={40} strokeWidth={1.2} className="mx-auto text-coral" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-normal">Aucun bien à comparer</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">
              Touchez l’icône de comparaison sur une annonce pour ajouter jusqu’à trois biens, puis revenez ici.
            </p>
            <Link to="/acheter" className="btn-coral mt-8">
              Parcourir les biens
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[14px] text-ink-muted">
                {list.length} bien{list.length > 1 ? 's' : ''} sur 3. Les coûts mensuels utilisent vos réglages :{' '}
                {euros(settings.downPayment)} d’apport, {settings.years} ans à {String(settings.rate).replace('.', ',')} %.{' '}
                <Link to="/simulateur" className="font-semibold text-navy underline decoration-coral underline-offset-4">
                  Modifier
                </Link>
              </p>
              <button type="button" onClick={clear} className="text-[14px] font-semibold text-navy hover:text-coral-dark">
                Vider le comparateur
              </button>
            </div>

            <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-[14px]">
                <caption className="sr-only">Comparaison des biens sélectionnés</caption>
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 w-[170px] bg-white p-3 align-bottom text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted sm:w-[210px]">
                      Critère
                    </th>
                    {list.map((p) => (
                      <th key={p.id} scope="col" className="min-w-[200px] p-3 align-top font-normal">
                        <div className="relative">
                          <img src={p.images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => toggle(p.id)}
                            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-navy hover:bg-white"
                            aria-label={`Retirer ${p.title} du comparateur`}
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <Link to={`/biens/${p.slug}`} className="mt-3 block font-display text-[15.5px] font-medium leading-snug text-navy hover:text-coral-dark">
                          {p.title} à {p.city}
                        </Link>
                        <p className="mt-0.5 text-[12.5px] text-ink-muted">{p.district}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const best = bestIndex(row)
                    return (
                      <tr key={row.label} className="border-t border-line">
                        <th scope="row" className="sticky left-0 z-10 bg-white p-3 align-top font-semibold text-navy">
                          {row.label}
                          {row.hint && <span className="mt-1 block text-[11.5px] font-normal leading-snug text-ink-muted">{row.hint}</span>}
                        </th>
                        {list.map((p, i) => {
                          const value = row.render(p)
                          return (
                            <td key={p.id} className={`p-3 align-top ${i === best ? 'bg-coral-soft/60' : ''}`}>
                              {value === null ? (
                                <Minus size={16} className="text-ink-muted/50" aria-label="Non concerné" />
                              ) : (
                                <span className={i === best ? 'font-semibold text-navy' : 'text-ink'}>{value}</span>
                              )}
                              {i === best && (
                                <span className="mt-1 flex items-center gap-1 text-[11.5px] font-semibold text-coral-dark">
                                  <Trophy size={12} aria-hidden="true" /> Meilleur
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  <tr className="border-t border-line">
                    <th scope="row" className="sticky left-0 z-10 bg-white p-3 align-top font-semibold text-navy">
                      Prestations
                    </th>
                    {list.map((p) => (
                      <td key={p.id} className="p-3 align-top">
                        <ul className="space-y-1.5">
                          {p.features.map((f) => (
                            <li key={f} className="flex gap-2 text-[13px] text-ink">
                              <Check size={14} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="sticky left-0 z-10 bg-white p-3" aria-label="Actions" />
                    {list.map((p) => (
                      <td key={p.id} className="p-3">
                        <Link to={`/biens/${p.slug}#visite`} className="btn-coral w-full px-3">
                          Réserver une visite
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {list.length < 3 && (
              <p className="mt-8 text-center text-[14px] text-ink-muted">
                Vous pouvez ajouter {3 - list.length} autre{3 - list.length > 1 ? 's' : ''} bien{3 - list.length > 1 ? 's' : ''}.{' '}
                <Link to="/acheter" className="font-semibold text-navy underline decoration-coral underline-offset-4">
                  Parcourir les annonces
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
