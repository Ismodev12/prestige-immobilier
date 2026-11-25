import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

/** Titre de section : filet doré, titre serif, sous-titre et lien optionnel aligné à droite. */
export default function SectionHeading({ eyebrow, title, subtitle, link, align = 'left', as: Heading = 'h2', light = false }) {
  const centered = align === 'center'
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-5 sm:mb-12 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow mb-4 ${light ? 'text-gold-light' : ''}`}>{eyebrow}</p>}
        <Heading
          className={`text-balance text-[30px] font-semibold leading-[1.15] sm:text-[38px] lg:text-[42px] ${light ? 'text-white' : ''}`}
        >
          {!eyebrow && !centered && <span aria-hidden="true" className="mr-4 inline-block h-px w-10 translate-y-[-10px] bg-gold align-middle" />}
          {title}
        </Heading>
        {subtitle && (
          <p className={`mt-4 max-w-xl text-[16px] leading-relaxed ${light ? 'text-white/75' : 'text-ink-muted'} ${centered ? 'mx-auto' : ''}`}>
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
