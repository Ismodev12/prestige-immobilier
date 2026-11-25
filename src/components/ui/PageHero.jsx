import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Reveal from './Reveal'

/** En-tête des pages secondaires : photo, voile marine, fil d'Ariane et titre. */
export default function PageHero({ title, intro, image, alt = '', breadcrumbs = [], children, compact = false }) {
  return (
    <section className={`relative isolate overflow-hidden bg-navy ${compact ? 'pb-14 pt-12 sm:pb-16 sm:pt-14' : 'pb-16 pt-14 sm:pb-24 sm:pt-20'}`}>
      {image && (
        <>
          <img src={image} alt={alt} className="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high" />
          <div className="absolute inset-0 -z-10 bg-navy/75 sm:bg-gradient-to-r sm:from-navy/90 sm:via-navy/70 sm:to-navy/30" />
        </>
      )}
      <div className="container-site">
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/65">
            <li>
              <Link to="/" className="transition-colors hover:text-gold-light">
                Accueil
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={13} aria-hidden="true" />
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-gold-light">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal className="max-w-2xl">
          <h1 className="text-balance text-[36px] font-semibold leading-[1.1] text-white sm:text-[48px] lg:text-[56px]">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 sm:text-[17px]">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
