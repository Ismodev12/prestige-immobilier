import { useSearchParams } from 'react-router-dom'
import ListingView from '../components/ListingView'
import SearchBar from '../components/SearchBar'
import PageHero from '../components/ui/PageHero'
import { useSeo } from '../hooks/useSeo'
import { parseFilters } from '../utils/filters'

export default function SearchResults() {
  const [params] = useSearchParams()
  const filters = parseFilters(params)
  const city = filters.ville ? filters.ville.charAt(0).toUpperCase() + filters.ville.slice(1) : ''
  const label = filters.transaction === 'location' ? 'Locations' : 'Biens à vendre'
  useSeo({
    title: `Résultats de recherche${city ? ` : ${city}` : ''}`,
    description: 'Résultats de votre recherche immobilière chez Prestige Immobilier.',
  })
  return (
    <>
      <PageHero
        compact
        title={city ? `${label} à ${city}` : label}
        intro="Affinez vos critères à tout moment : les résultats se mettent à jour instantanément."
        breadcrumbs={[{ label: 'Résultats de recherche' }]}
      >
        <div className="mt-10">
          <SearchBar key={params.toString()} initial={filters} />
        </div>
      </PageHero>
      <ListingView />
    </>
  )
}
