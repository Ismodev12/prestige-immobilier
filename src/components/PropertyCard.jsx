import { Link } from 'react-router-dom'
import { Bath, BedDouble, MapPin, Maximize2 } from 'lucide-react'
import { team } from '../data/team'
import { formatListingPrice, formatSurface } from '../utils/format'
import FavoriteButton from './ui/FavoriteButton'

const badgeStyles = {
  Exclusivité: 'bg-navy text-white',
  Nouveauté: 'bg-white text-navy',
  'Coup de cœur': 'bg-coral text-white',
}

// Conseiller référent attribué de façon stable à chaque bien.
const advisorFor = (property) => team[Number(property.id.replace(/\D/g, '')) % team.length]

export default function PropertyCard({ property, priority = false, className = '' }) {
  const href = `/biens/${property.slug}`
  const agent = advisorFor(property)
  return (
    <article className={`group relative flex h-full flex-col bg-white ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist">
        <img
          src={property.images[0]}
          alt={`${property.title} à ${property.city}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width="800"
          height="600"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {property.badge && (
            <span className={`rounded-[2px] px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] ${badgeStyles[property.badge]}`}>{property.badge}</span>
          )}
          <span className="rounded-[2px] bg-coral px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
            {property.transaction === 'location' ? 'À louer' : 'À vendre'}
          </span>
        </div>
        <FavoriteButton property={property} className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-white/90 text-navy backdrop-blur hover:bg-white" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <img src={agent.photo} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover object-top" loading="lazy" />
          <span className="text-[12.5px] font-semibold text-white">{agent.name}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-[16px] font-medium leading-snug text-navy">
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-coral-dark">
            {property.title} à {property.city}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-muted">
          <MapPin size={13} strokeWidth={1.8} className="shrink-0 text-coral" aria-hidden="true" />
          <span className="truncate">
            {property.district}, {property.postalCode}
          </span>
        </p>
        <dl className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Chambres</dt>
            <BedDouble size={15} strokeWidth={1.6} className="text-ink-muted" aria-hidden="true" />
            <dd>{property.bedrooms} ch.</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Salles de bains</dt>
            <Bath size={15} strokeWidth={1.6} className="text-ink-muted" aria-hidden="true" />
            <dd>{property.bathrooms} sdb</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Surface</dt>
            <Maximize2 size={13} strokeWidth={1.8} className="text-ink-muted" aria-hidden="true" />
            <dd>{formatSurface(property.surface)}</dd>
          </div>
        </dl>
        <p className="mt-3 font-display text-[17px] font-semibold text-coral">{formatListingPrice(property)}</p>
      </div>
    </article>
  )
}
