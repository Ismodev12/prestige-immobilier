import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { neighborhoods } from '../data/neighborhoods'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function CommunitiesSection() {
  return (
    <section aria-labelledby="quartiers-titre" className="relative bg-peach py-20 sm:py-24">
      <span className="deco-square right-0 top-12 hidden bg-peach-300 md:block" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="quartiers-titre"
          eyebrow="Nos quartiers"
          title={
            <>
              Explorez nos quartiers et trouvez
              <br className="hidden sm:block" /> le bien qui vous correspond
            </>
          }
        />
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {neighborhoods.map((n, index) => (
            <Reveal as="li" key={n.slug} delay={index * 0.08} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <Link
                to={`/recherche?transaction=achat&ville=${encodeURIComponent(n.query)}`}
                className="group relative block aspect-[3/4.2] overflow-hidden bg-navy"
              >
                <img
                  src={n.image}
                  alt={n.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-[19px] font-medium text-white">{n.name}</h3>
                  <p className="mt-1 text-[12.5px] text-white/75">Prix moyen : {n.priceM2} / m²</p>
                  <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-[13px] font-semibold text-coral-light opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    Voir les biens <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link to="/acheter" className="btn-coral">
            Explorer nos biens
          </Link>
        </div>
      </div>
    </section>
  )
}
