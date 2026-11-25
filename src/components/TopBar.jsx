import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { agency } from '../data/agency'
import SocialLinks from './ui/SocialIcons'

export default function TopBar() {
  return (
    <div className="bg-navy text-[13px] text-white">
      <div className="container-site flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-5 sm:gap-7">
          <a href={agency.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold-light">
            <Phone size={14} strokeWidth={1.8} className="text-gold" aria-hidden="true" />
            <span>{agency.phone}</span>
          </a>
          <a
            href={`mailto:${agency.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-light"
            aria-label={`Écrire à ${agency.email}`}
          >
            <Mail size={14} strokeWidth={1.8} className="text-gold" aria-hidden="true" />
            <span className="hidden md:inline">{agency.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-5">
          <nav aria-label="Liens utiles" className="hidden items-center sm:flex">
            <Link to="/faq" className="transition-colors hover:text-gold-light">
              FAQ
            </Link>
            <span className="mx-3 h-3 w-px bg-white/25" aria-hidden="true" />
            <Link to="/contact" className="transition-colors hover:text-gold-light">
              Contact
            </Link>
          </nav>
          <SocialLinks
            size={13}
            className="gap-1.5"
            itemClassName="h-6 w-6 bg-white/10 text-white/85 [--yt-play:#071D3B] hover:bg-gold hover:text-navy"
          />
        </div>
      </div>
    </div>
  )
}
