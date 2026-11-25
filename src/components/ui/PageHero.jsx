import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Reveal from './Reveal'

/** En-tête des pages secondaires : fond pêche, fil d'Ariane, titre et photo facultative à droite. */
export default function PageHero({ title, intro, image, alt = '', breadcrumbs = [], children, compact = false }) {
  return (
    <section className="relative overflow-hidden bg-peach">
      <span className="deco-square -left-4 top-10 hidden lg:block" aria-hidden="true" />
      <div className={`container-site grid items-center gap-10 ${image ? 'lg:grid-cols-[1.1fr_1fr]' : ''} ${compact ? 'py-12 sm:py-14' : 'py-14 sm:py-20'}`}>
        <div>
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-coral-dark">
                  Accueil
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight size={13} aria-hidden="true" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-coral-dark">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-navy">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Reveal className="max-w-2xl">
            <h1 className="text-balance text-[32px] font-normal leading-[1.15] sm:text-[42px] lg:text-[48px]">{title}</h1>
            {intro && <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">{intro}</p>}
          </Reveal>
          {children}
        </div>
        {image && (
          <Reveal delay={0.1} className="relative hidden lg:block">
            <span className="absolute -bottom-5 -right-5 h-2/3 w-2/3 bg-peach-200" aria-hidden="true" />
            <img src={image} alt={alt} fetchpriority="high" className="relative aspect-[16/11] w-full object-cover" />
          </Reveal>
        )}
      </div>
    </section>
  )
}
