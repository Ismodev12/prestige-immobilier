import { Link } from 'react-router-dom'

/**
 * Logo Prestige Immobilier.
 * variant="lockup" : emblème original (maison et immeubles) + nom composé en Playfair, pour le header où le
 *   logo complet serait illisible à petite taille.
 * variant="full"   : logo original complet, pour le footer et les grands formats.
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
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Prestige Immobilier, retour à l'accueil"
    >
      <img
        src={light ? '/brand/emblem-light.webp' : '/brand/emblem.webp'}
        alt=""
        width="360"
        height="162"
        className="h-9 w-auto sm:h-10"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[21px] font-bold tracking-[-0.01em] sm:text-[23px] ${light ? 'text-white' : 'text-navy'}`}>
          Prestige
        </span>
        <span className="mt-1 font-serif text-[9.5px] font-semibold uppercase tracking-[0.42em] text-gold-dark sm:text-[10px]">
          Immobilier
        </span>
      </span>
    </Link>
  )
}
