import { BadgeCheck, Clock, Lock } from 'lucide-react'
import EstimateForm from '../components/EstimateForm'
import PageHero from '../components/ui/PageHero'
import { agency } from '../data/agency'
import { useSeo } from '../hooks/useSeo'

const promises = [
  { icon: Clock, title: 'Rappel sous 24 h', text: 'Un expert de votre secteur vous contacte rapidement.' },
  { icon: BadgeCheck, title: 'Avis de valeur écrit', text: 'Fondé sur les ventes réelles et la visite de votre bien.' },
  { icon: Lock, title: 'Données protégées', text: 'Vos informations ne sont jamais revendues.' },
]

export default function Estimate() {
  useSeo({
    title: 'Estimation immobilière gratuite',
    description: 'Estimez gratuitement votre maison ou votre appartement avec un expert Prestige Immobilier : réponse sous 24 heures.',
  })
  return (
    <>
      <PageHero
        compact
        title="Estimez gratuitement votre bien"
        intro="Trois étapes, deux minutes : un expert vous remet ensuite un avis de valeur précis et argumenté."
        image="/images/estimate-villa.webp"
        alt="Villa contemporaine avec piscine au coucher du soleil"
        breadcrumbs={[{ label: 'Vendre', to: '/vendre' }, { label: 'Estimation' }]}
      />
      <section className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
          <EstimateForm />
        </div>
        <aside className="space-y-8 lg:pt-4" aria-label="Nos engagements">
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon size={26} strokeWidth={1.3} className="shrink-0 text-gold-dark" aria-hidden="true" />
              <div>
                <h2 className="font-sans text-[16px] font-bold text-navy">{title}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">{text}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-line pt-8 text-[14px] text-ink-muted">
            Vous préférez en parler de vive voix ?
            <a href={agency.phoneHref} className="mt-1 block font-serif text-[22px] font-semibold text-navy hover:text-gold-dark">
              {agency.phone}
            </a>
          </div>
        </aside>
      </section>
    </>
  )
}
