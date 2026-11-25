import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import PageHero from '../components/ui/PageHero'
import { properties } from '../data/properties'
import { useFavorites } from '../hooks/useFavorites'
import { useSeo } from '../hooks/useSeo'

export default function Favorites() {
  useSeo({ title: 'Mes favoris', description: 'Retrouvez les biens que vous avez sélectionnés.' })
  const { ids } = useFavorites()
  const list = properties.filter((p) => ids.includes(p.id))
  return (
    <>
      <PageHero compact title="Mes favoris" intro="Vos biens sélectionnés sont enregistrés sur cet appareil." breadcrumbs={[{ label: 'Mes favoris' }]} />
      <div className="container-site py-12 sm:py-16">
        {list.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <li key={p.id}>
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-card border border-dashed border-navy/15 bg-mist px-6 py-16 text-center">
            <Heart size={40} strokeWidth={1.2} className="mx-auto text-gold-dark" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">Aucun favori pour l’instant</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">Touchez le cœur sur une annonce pour la retrouver ici et comparer vos coups de cœur.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/acheter" className="btn-navy">
                Biens à vendre
              </Link>
              <Link to="/louer" className="btn-outline">
                Biens à louer
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
