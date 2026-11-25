import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { agency } from '../data/agency'
import { useSeo } from '../hooks/useSeo'

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Contactez Prestige Immobilier, 12 avenue Victor Hugo à Paris : par téléphone, par e-mail ou via notre formulaire.' })
  const { address, coordinates: c } = agency
  const bbox = [c.lng - 0.012, c.lat - 0.006, c.lng + 0.012, c.lat + 0.006].join(',')
  const channels = [
    { icon: Phone, label: 'Téléphone', value: agency.phone, href: agency.phoneHref },
    { icon: Mail, label: 'E-mail', value: agency.email, href: `mailto:${agency.email}` },
    { icon: MapPin, label: 'Agence', value: `${address.street}, ${address.postalCode} ${address.city}` },
  ]

  return (
    <>
      <PageHero
        title="Parlons de votre projet"
        intro="Une question, une visite, une estimation ? Nos conseillers vous répondent sous 24 heures ouvrées."
        image="/images/page-contact.webp"
        alt="Façade d’un café parisien à l’angle d’une rue"
        breadcrumbs={[{ label: 'Contact' }]}
      />
      <section className="container-site grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_400px] lg:gap-16">
        <Reveal>
          <h2 className="text-[28px] font-semibold sm:text-[34px]">Écrivez-nous</h2>
          <p className="mb-8 mt-3 text-ink-muted">Les champs marqués d’un astérisque sont obligatoires.</p>
          <ContactForm />
        </Reveal>
        <Reveal as="aside" delay={0.1} className="space-y-6" aria-label="Coordonnées de l'agence">
          <ul className="divide-y divide-line rounded-card border border-line">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-peach text-coral-dark">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">{label}</p>
                  {href ? (
                    <a href={href} className="break-words font-semibold text-navy hover:text-coral-dark">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-card bg-navy p-6 text-white">
            <p className="flex items-center gap-2 font-semibold">
              <Clock size={17} className="text-coral" /> Horaires d’ouverture
            </p>
            <dl className="mt-4 space-y-2.5 text-[14px]">
              {agency.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2.5 last:border-0">
                  <dt className="text-white/70">{h.days}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-card border border-line">
            <iframe
              title="Plan d'accès à l'agence Prestige Immobilier"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c.lat},${c.lng}`}
              className="h-[260px] w-full border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
