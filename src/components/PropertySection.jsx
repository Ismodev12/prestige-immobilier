import { Link } from 'react-router-dom'
import { featuredProperties } from '../data/properties'
import PropertyCard from './PropertyCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function PropertySection() {
  return (
    <section aria-labelledby="biens-titre" className="relative pb-20 pt-4 sm:pb-24">
      <span className="deco-square left-0 top-0 hidden md:block" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="biens-titre"
          eyebrow="Nos biens d'exception"
          title={
            <>
              Une sélection variée,
              <br className="hidden sm:block" /> soigneusement choisie pour vous
            </>
          }
        />
        <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <Reveal as="li" key={property.id} delay={(index % 3) * 0.08}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link to="/acheter" className="btn-coral">
            Voir tous nos biens
          </Link>
        </div>
      </div>
    </section>
  )
}
