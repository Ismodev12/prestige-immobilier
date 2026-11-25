import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProperties } from '../data/properties'
import PropertyCard from './PropertyCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function PropertySection() {
  return (
    <section aria-labelledby="biens-titre" className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Sélection du moment"
          title={<span id="biens-titre">Nos biens d'exception</span>}
          subtitle="Découvrez une sélection de propriétés soigneusement choisies pour vous."
          link={{ to: '/acheter', label: 'Voir tous les biens' }}
        />
      </div>

      {/* Mobile : carrousel horizontal avec aperçu de la carte suivante. Tablette et desktop : grille. */}
      <div className="container-site">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {featuredProperties.map((property, index) => (
            <Reveal as="li" key={property.id} delay={index * 0.08} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link to="/acheter" className="btn-outline">
            Voir tous les biens
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
