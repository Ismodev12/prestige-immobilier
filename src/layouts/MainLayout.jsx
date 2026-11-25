import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

/** Remonte en haut de page à chaque navigation, ou fait défiler jusqu'à l'ancre (#equipe...). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function MainLayout() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-coral focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Aller au contenu
      </a>
      <ScrollManager />
      <Header />
      <main id="contenu" className="overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
