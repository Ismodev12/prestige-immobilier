import { Mail, MapPin, Phone } from 'lucide-react'
import { agency } from '../data/agency'
import ContactForm from './ContactForm'
import Reveal from './ui/Reveal'

export default function ContactSection() {
  const items = [
    { icon: Phone, label: 'Téléphone', value: agency.phone, href: agency.phoneHref },
    { icon: Mail, label: 'E-mail', value: agency.email, href: `mailto:${agency.email}` },
    { icon: MapPin, label: 'Agence', value: `${agency.address.street}, ${agency.address.postalCode} ${agency.address.city}` },
  ]
  return (
    <section aria-labelledby="contact-titre" className="bg-peach py-20 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.45fr] lg:gap-20">
        <Reveal>
          <h2 id="contact-titre" className="text-[28px] font-normal leading-tight sm:text-[34px]">
            Besoin d’un conseil ?
            <br />
            Parlons-en.
          </h2>
          <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-ink-muted">
            Notre équipe vous répond sous 24 heures ouvrées, par e-mail ou par téléphone selon votre préférence.
          </p>
          <ul className="mt-10 space-y-7">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <Icon size={24} strokeWidth={1.3} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-navy">{label}</p>
                  {href ? (
                    <a href={href} className="break-words text-[14px] text-ink-muted hover:text-coral-dark">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14px] text-ink-muted">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="bg-white p-6 shadow-card sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
