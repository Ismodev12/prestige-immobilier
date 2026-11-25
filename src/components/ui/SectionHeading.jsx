import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

/**
 * Titre de section : surtitre en capitales, titre sur deux lignes et sous-titre facultatif.
 * Centré par défaut, comme dans la maquette. `align="left"` place un lien optionnel à droite.
 */
export default function SectionHeading({ eyebrow, title, subtitle, link, align = 'center', as: Heading = 'h2', light = false, id }) {
  const centered = align === 'center'
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-5 sm:mb-14 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        {eyebrow && <p className={`eyebrow mb-3 ${light ? 'text-coral-light' : ''}`}>{eyebrow}</p>}
        <Heading
          id={id}
          className={`text-balance text-[26px] font-normal leading-[1.25] sm:text-[32px] lg:text-[36px] ${light ? 'text-white' : ''}`}
        >
          {title}
        </Heading>
        {subtitle && (
          <p className={`mt-4 text-[15.5px] leading-relaxed ${light ? 'text-white/75' : 'text-ink-muted'} ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link to={link.to} className="link-arrow shrink-0">
          {link.label}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      )}
    </Reveal>
  )
}
