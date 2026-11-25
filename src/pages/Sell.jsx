import { Link } from 'react-router-dom'
import { ArrowRight, Camera, FileText, Handshake, KeyRound, LineChart, Users } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Testimonials from '../components/Testimonials'
import { useSeo } from '../hooks/useSeo'

const steps = [
  { icon: LineChart, title: 'Estimation argumentée', text: 'Visite, étude des ventes comparables et avis de valeur écrit sous 48 heures.' },
  { icon: Camera, title: 'Mise en valeur', text: 'Reportage photo professionnel, visite virtuelle et annonce rédigée sur mesure.' },
  { icon: Users, title: 'Acquéreurs qualifiés', text: 'Diffusion premium et présentation à notre fichier d’acheteurs au financement validé.' },
  { icon: Handshake, title: 'Négociation', text: 'Nous défendons votre prix et sécurisons chaque offre avant de vous la présenter.' },
  { icon: FileText, title: 'Suivi juridique', text: 'Diagnostics, compromis et coordination avec les notaires jusqu’à l’acte.' },
  { icon: KeyRound, title: 'Remise des clés', text: 'Un interlocuteur unique, présent jusqu’à la signature définitive.' },
]

const fees = [
  ['Jusqu’à 150 000 €', '6 % TTC'],
  ['De 150 001 € à 400 000 €', '5 % TTC'],
  ['De 400 001 € à 800 000 €', '4,5 % TTC'],
  ['De 800 001 € à 1 500 000 €', '4 % TTC'],
  ['Au-delà de 1 500 000 €', '3,5 % TTC'],
]

export default function Sell() {
  useSeo({
    title: 'Vendre votre bien',
    description: 'Vendez au juste prix avec Prestige Immobilier : estimation gratuite, mise en valeur professionnelle et acquéreurs qualifiés.',
  })
  return (
    <>
      <PageHero
        title="Vendre au juste prix, sereinement"
        intro="Une méthode éprouvée pour vendre plus vite, au meilleur prix du marché, avec un seul interlocuteur du premier rendez-vous à la signature."
        image="/images/page-sell.webp"
        alt="La tour Eiffel au coucher du soleil depuis le Trocadéro"
        breadcrumbs={[{ label: 'Vendre' }]}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/estimation" className="btn-gold">
            Estimer mon bien gratuitement
            <ArrowRight size={17} />
          </Link>
          <Link to="/contact" className="btn-outline-light">
            Parler à un conseiller
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Notre méthode" title="Six étapes, un seul objectif : votre vente" align="center" />
          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 0.08} className="bg-white p-8 lg:p-10">
                <div className="flex items-start justify-between">
                  <Icon size={30} strokeWidth={1.2} className="text-gold-dark" aria-hidden="true" />
                  <span className="font-serif text-[40px] font-semibold leading-none text-navy/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-[21px] font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="honoraires" className="scroll-mt-28 bg-mist py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow mb-4">Transparence</p>
            <h2 className="text-[30px] font-semibold leading-tight sm:text-[38px]">Nos honoraires de transaction</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-muted">
              Honoraires à la charge du vendeur, calculés sur le prix de vente net vendeur. Barème applicable au 1er janvier 2026,
              affiché en agence conformément à l’arrêté du 10 janvier 2017.
            </p>
            <Link to="/estimation" className="btn-gold mt-8">
              Commencer l'estimation
              <ArrowRight size={17} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <table className="w-full overflow-hidden rounded-card bg-white text-left shadow-card">
              <caption className="sr-only">Barème des honoraires de vente</caption>
              <thead className="bg-navy text-[13px] uppercase tracking-[0.1em] text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Prix de vente
                  </th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold">
                    Honoraires
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map(([range, fee]) => (
                  <tr key={range} className="border-b border-line last:border-0">
                    <td className="px-6 py-4 text-[15px]">{range}</td>
                    <td className="px-6 py-4 text-right font-semibold text-navy">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <Testimonials />
    </>
  )
}
