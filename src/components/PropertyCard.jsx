import { Link } from 'react-router-dom'
import { BedDouble, MapPin, Maximize2 } from 'lucide-react'
import { formatListingPrice, formatSurface, plural } from '../utils/format'
import FavoriteButton from './ui/FavoriteButton'

const badgeStyles = {
  Exclusivité: 'bg-navy text-white',
  Nouveauté: 'bg-white text-navy',
  'Coup de cœur': 'bg-gold text-navy',
}

export default function PropertyCard({ property, priority = false, className = '' }) {
  const href = `/biens/${property.slug}`
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-navy/[0.04] transition-shadow duration-500 hover:shadow-lift ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={property.images[0]}
          alt={`${property.title} à ${property.city}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width="800"
          height="600"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/55 to-transparent" />
        {property.badge && (
          <span
            className={`absolute left-3.5 top-3.5 rounded-[3px] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${badgeStyles[property.badge]}`}
          >
            {property.badge}
          </span>
        )}
        <FavoriteButton
          property={property}
          className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-white/90 text-navy backdrop-blur hover:bg-white"
        />
        <p className="absolute bottom-3.5 left-3.5 rounded-[3px] bg-navy/85 px-3 py-1.5 font-sans text-[15px] font-bold text-white backdrop-blur-sm">
          {formatListingPrice(property)}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-[19px] font-semibold leading-snug text-navy">
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-ink-muted">
          <MapPin size={14} strokeWidth={1.8} className="shrink-0 text-gold-dark" aria-hidden="true" />
          {property.city}
          <span className="text-ink-muted/60">·</span>
          <span className="truncate">{property.district}</span>
        </p>
        <dl className="mt-auto flex items-center gap-5 border-t border-line pt-4 text-[13.5px] font-medium text-ink">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Chambres</dt>
            <BedDouble size={16} strokeWidth={1.6} className="text-ink-muted" aria-hidden="true" />
            <dd>{plural(property.bedrooms, 'chambre')}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Surface</dt>
            <Maximize2 size={14} strokeWidth={1.8} className="text-ink-muted" aria-hidden="true" />
            <dd>{formatSurface(property.surface)}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
