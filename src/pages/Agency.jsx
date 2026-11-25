import { Award, Compass, Gem, HeartHandshake } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import EstimateSection from '../components/EstimateSection'
import TeamSection from '../components/TeamSection'
import { agency } from '../data/agency'
import { useSeo } from '../hooks/useSeo'

const values = [
  { icon: Gem, title: 'Exigence', text: 'Chaque bien est visité, photographié et décrit avec la même rigueur, quel que soit son prix.' },
  { icon: HeartHandshake, title: 'Écoute', text: 'Nous prenons le temps de comprendre votre projet avant de vous proposer quoi que ce soit.' },
  { icon: Compass, title: 'Conseil', text: 'Marché, fiscalité, travaux : un avis franc et documenté pour décider sereinement.' },
  { icon: Award, title: 'Discrétion', text: 'Une partie de nos ventes se conclut hors annonces, pour les clients qui le souhaitent.' },
]

export default function Agency() {
  useSeo({
    title: 'Notre agence',
    description: "Découvrez Prestige Immobilier : une agence indépendante fondée en 2010, une équipe d'experts et un engagement d'excellence.",
  })
  return (
    <>
      <PageHero
        title="Une agence indépendante, une signature exigeante"
        intro={`Fondée en ${agency.founded} avenue Victor Hugo, Prestige Immobilier accompagne une clientèle exigeante en France et à l’international.`}
        image="/images/video-living.webp"
        alt="Salon élégant avec cheminée et canapés blancs"
        breadcrumbs={[{ label: 'Notre agence' }]}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <img src="/images/agency-interior.webp" alt="Séjour contemporain aux tons naturels" loading="lazy" className="aspect-[4/5] w-full rounded-card object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute -bottom-6 right-4 w-44 rounded-card bg-white p-5 shadow-lift sm:right-8 sm:w-56">
              <img src="/brand/logo.webp" alt="Logo Prestige Immobilier" className="w-full" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">Notre histoire</p>
            <h2 className="text-balance text-[30px] font-semibold leading-tight sm:text-[40px]">Quinze ans au service de vos projets</h2>
            <div className="prose-estate mt-6">
              <p>
                Prestige Immobilier est née d’une conviction simple : un projet immobilier mérite le même soin qu’une œuvre
                d’architecture. Depuis {agency.founded}, notre équipe accompagne acquéreurs, vendeurs et investisseurs avec une
                exigence constante.
              </p>
              <p>
                Paris reste notre port d’attache, mais notre réseau de partenaires nous permet de vous accompagner sur la Côte
                d’Azur, au Pays basque, en Bordelais et en Bourgogne.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                ['15', 'ans d’expertise'],
                ['1 200+', 'transactions'],
                ['98 %', 'de clients satisfaits'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-[30px] font-semibold text-navy sm:text-[36px]">{value}</span>
                    <span className="text-[13px] text-ink-muted">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Nos valeurs" title="Ce qui guide chacune de nos missions" light />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="border-t border-white/15 pt-7">
                <Icon size={30} strokeWidth={1.2} className="text-coral" aria-hidden="true" />
                <h3 className="mt-5 text-[22px] font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <TeamSection id="equipe" />

      <EstimateSection />
    </>
  )
}
