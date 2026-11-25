import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'

export default function NotFound({ message = "La page que vous cherchez n'existe pas ou a été déplacée." }) {
  useSeo({ title: 'Page introuvable' })
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-[110px] font-semibold leading-none text-navy/10 sm:text-[160px]">404</p>
      <h1 className="-mt-6 text-[32px] font-semibold sm:text-[40px]">Cette adresse est introuvable</h1>
      <p className="mt-4 max-w-md text-ink-muted">{message}</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-navy">
          Retour à l’accueil
        </Link>
        <Link to="/acheter" className="btn-outline">
          Voir nos biens <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
