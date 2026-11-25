import { agency } from '../../data/agency'

// Pictogrammes des réseaux sociaux (Lucide n'inclut plus les logos de marques).
const icons = {
  Facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" fill="currentColor" />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r=".6" fill="currentColor" stroke="none" />
    </g>
  ),
  LinkedIn: (
    <g fill="currentColor">
      <rect x="4.5" y="9.5" width="3" height="10" />
      <circle cx="6" cy="6" r="1.8" />
      <path d="M10 9.5h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 3 0 3.6 2 3.6 4.5v5.8h-3v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2h-3V9.5Z" />
    </g>
  ),
  YouTube: (
    <g>
      <rect x="3" y="6" width="18" height="12" rx="3.5" fill="currentColor" />
      <path d="m10.3 9.4 4.6 2.6-4.6 2.6V9.4Z" fill="var(--yt-play, #071D3B)" />
    </g>
  ),
}

export function SocialIcon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

/** Liste de liens vers les réseaux sociaux de l'agence. */
export default function SocialLinks({ className = '', itemClassName = '', size = 16 }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {agency.socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${agency.name} sur ${social.name} (nouvel onglet)`}
            className={`grid place-items-center rounded-full transition-colors duration-300 ${itemClassName}`}
          >
            <SocialIcon name={social.name} size={size} />
          </a>
        </li>
      ))}
    </ul>
  )
}
