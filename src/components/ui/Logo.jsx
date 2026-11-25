import { Link } from 'react-router-dom'

/**
 * Logo Prestige Immobilier (dessin d'origine, tons dorés convertis en corail).
 * variant="lockup" : emblème + nom composé, lisible dans le header.
 * variant="full"   : logo complet, pour le footer et les grands formats.
 */
export default function Logo({ variant = 'lockup', light = false, className = '' }) {
  if (variant === 'full') {
    return (
      <Link to="/" className={`inline-block ${className}`} aria-label="Prestige Immobilier, retour à l'accueil">
        <img
          src={light ? '/brand/logo-light.webp' : '/brand/logo.webp'}
          alt="Prestige Immobilier"
          width="640"
          height="390"
          className="h-auto w-full"
        />
      </Link>
    )
  }

  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Prestige Immobilier, retour à l'accueil">
      <img src={light ? '/brand/emblem-light.webp' : '/brand/emblem.webp'} alt="" width="360" height="162" className="h-8 w-auto sm:h-9" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-semibold tracking-[-0.01em] sm:text-[20px] ${light ? 'text-white' : 'text-navy'}`}>Prestige</span>
        <span className="mt-[3px] font-display text-[8.5px] font-medium uppercase tracking-[0.38em] text-coral">Immobilier</span>
      </span>
    </Link>
  )
}
