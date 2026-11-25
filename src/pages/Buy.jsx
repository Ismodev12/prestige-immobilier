import ListingView from '../components/ListingView'
import PageHero from '../components/ui/PageHero'
import { useSeo } from '../hooks/useSeo'

export default function Buy() {
  useSeo({
    title: 'Acheter un bien immobilier',
    description: 'Villas, maisons de caractère et appartements de standing à vendre : découvrez les biens sélectionnés par Prestige Immobilier.',
  })
  return (
    <>
      <PageHero
        title="Acheter un bien d'exception"
        intro="Villas contemporaines, maisons de maître, appartements haussmanniens : chaque bien est visité et sélectionné par nos conseillers."
        image="/images/page-buy.webp"
        alt="Villa blanche moderne avec piscine et jardin"
        breadcrumbs={[{ label: 'Acheter' }]}
      />
      <ListingView transaction="achat" />
    </>
  )
}
