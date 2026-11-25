import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { neighborhoods } from '../data/neighborhoods'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function NeighborhoodSection() {
  return (
    <section aria-labelledby="quartiers-titre" className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="Paris, quartier par quartier"
          title={<span id="quartiers-titre">Explorez nos quartiers</span>}
          subtitle="Nos conseillers vivent et travaillent dans ces quartiers : ils en connaissent chaque rue, chaque immeuble."
          link={{ to: '/blog/vivre-a-saint-germain', label: 'Découvrir la ville' }}
        />
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {neighborhoods.map((n, index) => (
            <Reveal as="li" key={n.slug} delay={index * 0.1}>
              <Link
                to={`/recherche?transaction=achat&ville=${encodeURIComponent(n.query)}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-card bg-navy md:aspect-[4/4.2] lg:aspect-[4/3.6]"
              >
                <img
                  src={n.image}
                  alt={n.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-light">Prix moyen : {n.priceM2} / m²</p>
                  <h3 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-white">{n.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[14px] leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:opacity-100">
                    {n.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
                    Découvrir le quartier
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
