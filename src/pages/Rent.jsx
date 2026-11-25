import ListingView from '../components/ListingView'
import PageHero from '../components/ui/PageHero'
import { useSeo } from '../hooks/useSeo'

export default function Rent() {
  useSeo({
    title: 'Louer un bien',
    description: 'Appartements meublés, lofts, villas et maisons à louer : des locations haut de gamme, dossiers et baux gérés par nos soins.',
  })
  return (
    <>
      <PageHero
        title="Louer en toute sérénité"
        intro="Des locations vides ou meublées, soigneusement sélectionnées. Visites, dossier et bail : nous nous occupons de tout."
        image="/images/page-rent.webp"
        alt="Villa contemporaine avec piscine et terrasse"
        breadcrumbs={[{ label: 'Louer' }]}
      />
      <ListingView transaction="location" />
    </>
  )
}
