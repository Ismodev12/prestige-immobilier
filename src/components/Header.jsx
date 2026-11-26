import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Heart, Mail, Menu, Phone, X } from 'lucide-react'
import { agency, navigation } from '../data/agency'
import { useFavorites } from '../hooks/useFavorites'
import Logo from './ui/Logo'
import SocialLinks from './ui/SocialIcons'

const isItemActive = (item, pathname) =>
  item.to === '/' ? pathname === '/' : pathname.startsWith(item.to) || item.children?.some((c) => pathname === c.to.split(/[?#]/)[0])

function DesktopItem({ item, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = isItemActive(item, pathname)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const linkClass = `relative inline-flex h-full items-center text-[14px] font-medium transition-colors duration-200 ${
    active ? 'text-navy' : 'text-ink/80 hover:text-navy'
  }`
  const underline = (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-coral transition-transform duration-300 ease-out ${
        active ? 'scale-x-100' : 'scale-x-0'
      }`}
    />
  )

  if (!item.children) {
    return (
      <li className="flex h-full items-center">
        <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
          {item.label}
          {underline}
        </NavLink>
      </li>
    )
  }

  return (
    <li
      ref={ref}
      className="relative flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="flex h-full items-center gap-1">
        <NavLink to={item.to} className={linkClass}>
          {item.label}
          {underline}
        </NavLink>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`Sous-menu ${item.label}`}
          className="grid h-7 w-5 place-items-center text-ink/60 transition-colors hover:text-navy"
        >
          <ChevronDown size={14} strokeWidth={2} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-1"
          >
            <ul className="border-t-2 border-coral bg-white py-2 shadow-lift">
              {item.children.map((child) => (
                <li key={child.to}>
                  <Link
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-5 py-2.5 text-[14px] font-medium text-ink/80 transition-colors hover:bg-mist hover:text-navy"
                  >
                    {child.label}
                    <ArrowRight size={14} className="-translate-x-1 text-coral opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// Le menu mobile est rendu dans <body> via un portail : le header utilise un flou d'arrière-plan
// (backdrop-filter), qui ferait sinon positionner le panneau « fixed » par rapport au header et non à l'écran.
function MobileMenu({ open, onClose, pathname }) {
  const [expanded, setExpanded] = useState(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // Garde le focus clavier dans le menu tant qu'il est ouvert.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu de navigation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/60"
            onClick={onClose}
          />
          <motion.nav
            ref={panelRef}
            id="menu-mobile"
            aria-label="Menu principal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-mist"
                aria-label="Fermer le menu"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-5 py-3">
              {navigation.map((item) => {
                const active = isItemActive(item, pathname)
                const isOpen = expanded === item.label
                return (
                  <li key={item.label} className="border-b border-line last:border-0">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={`flex min-h-[54px] flex-1 items-center font-display text-[19px] font-medium ${active ? 'text-coral-dark' : 'text-navy'}`}
                      >
                        {item.label}
                      </NavLink>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          aria-label={`Afficher le sous-menu ${item.label}`}
                          className="grid h-11 w-11 place-items-center text-navy"
                        >
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <Link to={child.to} className="flex min-h-[44px] items-center pl-4 text-[15px] text-ink-muted hover:text-navy">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
            <div className="space-y-4 border-t border-line bg-mist px-5 py-6">
              <Link to="/estimation" className="btn-coral w-full">
                Estimer mon bien
                <ArrowRight size={17} />
              </Link>
              <div className="flex items-center justify-between text-sm text-navy">
                <a href={agency.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 font-semibold">
                  <Phone size={16} className="text-coral-dark" />
                  {agency.phone}
                </a>
                <a href={`mailto:${agency.email}`} className="grid h-11 w-11 place-items-center" aria-label="Nous écrire par e-mail">
                  <Mail size={18} className="text-coral-dark" />
                </a>
              </div>
              <SocialLinks size={15} itemClassName="h-10 w-10 bg-navy text-white [--yt-play:#0E2552] hover:bg-coral hover:text-navy" />
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function Header() {
  const location = useLocation()
  const { pathname } = location
  const { ids } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.key])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 supports-[backdrop-filter]:bg-white/90 ${
        scrolled ? 'shadow-[0_8px_30px_-18px_rgba(14,37,82,.3)]' : 'shadow-[inset_0_-1px_0_#E4E7EC]'
      }`}
    >
      <div className={`container-site flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? 'h-[68px]' : 'h-[72px] lg:h-[80px]'}`}>
        <Logo />

        <nav aria-label="Navigation principale" className="hidden h-full xl:block">
          <ul className="flex h-full items-stretch gap-7">
            {navigation.map((item) => (
              <DesktopItem key={item.label} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/favoris"
            className="relative grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-mist"
            aria-label={`Mes favoris (${ids.length})`}
          >
            <Heart size={20} strokeWidth={1.8} />
            {ids.length > 0 && (
              <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <a href={agency.phoneHref} className="hidden items-center gap-2 text-[14px] font-semibold text-navy transition-colors hover:text-coral-dark md:inline-flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-peach text-coral">
              <Phone size={15} strokeWidth={2} aria-hidden="true" />
            </span>
            {agency.phone}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-mist xl:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </header>
  )
}
