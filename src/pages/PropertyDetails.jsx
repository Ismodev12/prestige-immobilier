import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, Calendar, Check, DoorOpen, Layers, MapPin, Maximize2, Phone, Trees } from 'lucide-react'
import { getPropertyBySlug, properties } from '../data/properties'
import { agency } from '../data/agency'
import { team } from '../data/team'
import { useSeo } from '../hooks/useSeo'
import { formatListingPrice, formatNumber, formatPrice, formatSurface } from '../utils/format'
import Gallery from '../components/Gallery'
import EnergyRating from '../components/EnergyRating'
import ContactForm from '../components/ContactForm'
import PropertyCard from '../components/PropertyCard'
import FavoriteButton from '../components/ui/FavoriteButton'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-dark">
        <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">{label}</dt>
        <dd className="mt-0.5 font-semibold text-navy">{value}</dd>
      </div>
    </div>
  )
}

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)

  useSeo({
    title: property ? `${property.title} à ${property.city}, ${formatListingPrice(property)}` : 'Bien introuvable',
    description: property?.summary,
  })

  if (!property) return <NotFound message="Ce bien n'est plus disponible ou a déjà trouvé preneur." />

  const isRental = property.transaction === 'location'
  const listing = isRental ? { label: 'Louer', to: '/louer' } : { label: 'Acheter', to: '/acheter' }
  const advisor = isRental ? team[2] : team[1]
  const pricePerM2 = Math.round(property.price / property.surface)
  const similar = properties
    .filter((p) => p.id !== property.id && p.transaction === property.transaction)
    .sort((a, b) => (b.type === property.type) - (a.type === property.type) || Math.abs(a.price - property.price) - Math.abs(b.price - property.price))
    .slice(0, 3)
  const { lat, lng } = property.coordinates
  const bbox = [lng - 0.03, lat - 0.016, lng + 0.03, lat + 0.016].join(',')

  return (
    <article>
      <div className="container-site pt-8 sm:pt-10">
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink-muted">
            <li>
              <Link to="/" className="hover:text-navy">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={listing.to} className="hover:text-navy">
                {listing.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-navy">
              {property.title}
            </li>
          </ol>
        </nav>

        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {property.badge && (
                <span className="rounded-[3px] bg-navy px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">{property.badge}</span>
              )}
              <span className="rounded-[3px] border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                {isRental ? 'Location' : 'Vente'} · Réf. {property.id}
              </span>
            </div>
            <h1 className="text-balance text-[34px] font-semibold leading-[1.1] sm:text-[46px]">
              {property.title} à {property.city}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-[15px] text-ink-muted">
              <MapPin size={16} className="text-gold-dark" aria-hidden="true" />
              {property.district}, {property.postalCode} {property.city.replace(/ \d+e$/, '')}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end">
            <div className="lg:text-right">
              <p className="font-serif text-[34px] font-semibold leading-none text-navy sm:text-[40px]">{formatListingPrice(property)}</p>
              <p className="mt-2 text-[13px] text-ink-muted">
                {isRental ? 'Charges comprises' : `Honoraires à la charge du vendeur · ${formatNumber(pricePerM2)} € / m²`}
              </p>
            </div>
            <FavoriteButton
              property={property}
              withLabel
              className="min-h-[44px] shrink-0 whitespace-nowrap rounded-[4px] border border-line px-4 text-[14px] font-semibold text-navy hover:border-navy"
            />
          </div>
        </header>

        <Gallery images={property.images} title={`${property.title} à ${property.city}`} />
      </div>

      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_380px] xl:gap-16">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="caracteristiques">
            <h2 id="caracteristiques" className="sr-only">
              Caractéristiques principales
            </h2>
            <dl className="grid grid-cols-2 gap-6 rounded-card border border-line p-6 sm:grid-cols-3 sm:p-8">
              <Fact icon={Maximize2} label="Surface" value={formatSurface(property.surface)} />
              <Fact icon={DoorOpen} label="Pièces" value={property.rooms} />
              <Fact icon={BedDouble} label="Chambres" value={property.bedrooms} />
              <Fact icon={Bath} label="Salles de bains" value={property.bathrooms} />
              {property.land ? (
                <Fact icon={Trees} label="Terrain" value={formatSurface(property.land)} />
              ) : (
                <Fact icon={Layers} label="Étage" value={property.floor} />
              )}
              <Fact icon={Calendar} label="Année" value={property.yearBuilt} />
            </dl>
          </section>

          <Reveal as="section" aria-labelledby="description">
            <p className="eyebrow mb-4">Le bien</p>
            <h2 id="description" className="mb-6 text-[28px] font-semibold sm:text-[32px]">
              {property.summary}
            </h2>
            <div className="prose-estate">
              {property.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" aria-labelledby="prestations">
            <h2 id="prestations" className="mb-6 text-[24px] font-semibold">
              Prestations
            </h2>
            <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-[15px] text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-gold-light">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
              {property.furnished && (
                <li className="flex items-center gap-3 text-[15px] text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-gold-light">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  Location meublée
                </li>
              )}
            </ul>
            {isRental && property.deposit && (
              <p className="mt-6 rounded-[4px] bg-mist p-4 text-[14px] text-ink-muted">
                Dépôt de garantie : <strong className="text-navy">{formatPrice(property.deposit)}</strong>. Honoraires de location
                conformes au barème réglementaire, communiqués sur simple demande.
              </p>
            )}
          </Reveal>

          <Reveal as="section" aria-labelledby="energie">
            <h2 id="energie" className="mb-6 text-[24px] font-semibold">
              Performance énergétique
            </h2>
            <div className="grid gap-10 rounded-card border border-line p-6 sm:grid-cols-2 sm:p-8">
              <EnergyRating kind="dpe" value={property.energy.dpe} amount={property.energy.consumption} />
              <EnergyRating kind="ges" value={property.energy.ges} amount={property.energy.emissions} />
            </div>
            <p className="mt-3 text-[12.5px] text-ink-muted">
              Informations sur les risques auxquels ce bien est exposé disponibles sur le site Géorisques : georisques.gouv.fr.
            </p>
          </Reveal>

          <Reveal as="section" aria-labelledby="localisation">
            <h2 id="localisation" className="mb-2 text-[24px] font-semibold">
              Localisation
            </h2>
            <p className="mb-6 text-[15px] text-ink-muted">
              Quartier {property.district}, {property.city}. L'adresse exacte est communiquée lors de la prise de rendez-vous.
            </p>
            <div className="overflow-hidden rounded-card border border-line">
              <iframe
                title={`Carte du quartier ${property.district} à ${property.city}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
                className="h-[340px] w-full border-0 grayscale-[35%]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <aside className="lg:pt-0" aria-label="Contacter l'agence">
          <div className="sticky top-28 space-y-5">
            <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-7">
              <div className="mb-6 flex items-center gap-4 border-b border-line pb-6">
                <img src={advisor.photo} alt={`Portrait de ${advisor.name}`} className="h-16 w-16 rounded-full object-cover object-top" loading="lazy" />
                <div>
                  <p className="font-serif text-[18px] font-semibold text-navy">{advisor.name}</p>
                  <p className="text-[13px] text-ink-muted">{advisor.role}</p>
                  <a href={`tel:${advisor.phone.replace(/\s/g, '')}`} className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy hover:text-gold-dark">
                    <Phone size={13} className="text-gold-dark" />
                    {advisor.phone}
                  </a>
                </div>
              </div>
              <h2 className="mb-5 text-[21px] font-semibold">Ce bien vous intéresse ?</h2>
              <ContactForm property={property} compact />
            </div>
            <a href={agency.phoneHref} className="btn-navy w-full">
              <Phone size={17} />
              Appeler l'agence
            </a>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similaires" className="bg-mist py-16 sm:py-20">
          <div className="container-site">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 id="similaires" className="text-[28px] font-semibold sm:text-[34px]">
                Biens similaires
              </h2>
              <Link to={listing.to} className="link-arrow">
                <ArrowLeft size={16} />
                Retour aux annonces
              </Link>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <li key={p.id}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}
