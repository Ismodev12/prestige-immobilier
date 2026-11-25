import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { agency } from '../data/agency'
import Logo from './ui/Logo'
import SocialLinks from './ui/SocialIcons'

const columns = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Acheter', to: '/acheter' },
      { label: 'Louer', to: '/louer' },
      { label: 'Vendre', to: '/vendre' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Notre agence', to: '/agence' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

const legal = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/confidentialite' },
  { label: 'Cookies', to: '/cookies' },
]

export default function Footer() {
  const { address } = agency
  return (
    <footer className="bg-navy text-white/75">
      <div className="container-site pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.75fr_.75fr_1.25fr_auto] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="full" light className="w-[190px]" />
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed">
              Agence immobilière indépendante depuis {agency.founded}. Achat, vente, location et investissement : un accompagnement
              exigeant, de la première visite à la signature.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-white">{column.title}</h2>
              <ul className="mt-5 space-y-3 text-[14.5px]">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-gold-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-white">Nous contacter</h2>
            <address className="mt-5 space-y-3.5 text-[14.5px] not-italic">
              <a href={agency.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold-light">
                <Phone size={16} strokeWidth={1.6} className="shrink-0 text-gold" aria-hidden="true" />
                {agency.phone}
              </a>
              <a href={`mailto:${agency.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-gold-light">
                <Mail size={16} strokeWidth={1.6} className="shrink-0 text-gold" aria-hidden="true" />
                {agency.email}
              </a>
              <p className="flex gap-3">
                <MapPin size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </span>
              </p>
            </address>
          </div>

          <div>
            <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-white">Suivez-nous</h2>
            <SocialLinks
              className="mt-5 flex-wrap lg:flex-nowrap"
              size={16}
              itemClassName="h-10 w-10 border border-white/20 text-white [--yt-play:#071D3B] hover:border-gold hover:bg-gold hover:text-navy"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {agency.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((item, index) => (
              <li key={item.to} className="flex items-center gap-5">
                {index > 0 && <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />}
                <Link to={item.to} className="transition-colors hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
