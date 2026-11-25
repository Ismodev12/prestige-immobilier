import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { agency } from '../data/agency'
import { properties } from '../data/properties'
import { formatListingPrice } from '../utils/format'
import Logo from './ui/Logo'
import SocialLinks from './ui/SocialIcons'

const links = [
  { label: 'Acheter', to: '/acheter' },
  { label: 'Louer', to: '/louer' },
  { label: 'Vendre', to: '/vendre' },
  { label: 'Estimer mon bien', to: '/estimation' },
  { label: 'Simulateur de budget', to: '/simulateur' },
  { label: 'Comparateur', to: '/comparer' },
  { label: 'Notre agence', to: '/agence' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const legal = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/confidentialite' },
  { label: 'Cookies', to: '/cookies' },
]

export default function Footer() {
  const { address } = agency
  const latest = properties.filter((p) => p.transaction === 'achat').slice(-2).reverse()
  return (
    <footer className="bg-navy text-[14px] text-white/70">
      <div className="container-site grid gap-12 pb-12 pt-16 sm:pt-20 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1.25fr_1.2fr] lg:gap-10">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm leading-relaxed">
            Agence immobilière indépendante depuis {agency.founded}. Achat, vente, location et investissement : un accompagnement
            exigeant, de la première visite à la signature.
          </p>
          <SocialLinks className="mt-6 flex-wrap gap-2" size={15} itemClassName="h-9 w-9 bg-white/10 text-white [--yt-play:#0E2552] hover:bg-coral" />
        </div>

        <nav aria-label="Liens du site">
          <h2 className="font-display text-[15px] font-medium text-white">Navigation</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-coral-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-[15px] font-medium text-white">Nous contacter</h2>
          <address className="mt-5 space-y-3.5 not-italic">
            <p className="flex gap-3">
              <MapPin size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-coral-light" aria-hidden="true" />
              <span>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </span>
            </p>
            <a href={agency.phoneHref} className="flex items-center gap-3 transition-colors hover:text-coral-light">
              <Phone size={16} strokeWidth={1.6} className="shrink-0 text-coral-light" aria-hidden="true" />
              {agency.phone}
            </a>
            <a href={`mailto:${agency.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-coral-light lg:break-normal">
              <Mail size={16} strokeWidth={1.6} className="shrink-0 text-coral-light" aria-hidden="true" />
              {agency.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-display text-[15px] font-medium text-white">Derniers biens</h2>
          <ul className="mt-5 space-y-4">
            {latest.map((p) => (
              <li key={p.id}>
                <Link to={`/biens/${p.slug}`} className="group flex items-center gap-4">
                  <img src={p.images[0]} alt="" loading="lazy" className="h-16 w-20 shrink-0 object-cover" />
                  <span>
                    <span className="block text-[13.5px] font-medium text-white transition-colors group-hover:text-coral-light">
                      {p.title} à {p.city}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-coral-light">{formatListingPrice(p)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[12.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {agency.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-coral-light">
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
