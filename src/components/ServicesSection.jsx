import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, HeartHandshake, Home, KeyRound, MessagesSquare, ScrollText, Tag, Target, Users } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const services = [
  { icon: Home, title: 'Acheter un bien', text: 'Recherche ciblée, visites sélectionnées et négociation pour trouver le bien qui vous ressemble.', to: '/acheter' },
  { icon: Tag, title: 'Vendre un bien', text: 'Estimation juste, mise en valeur professionnelle et acquéreurs qualifiés pour vendre sereinement.', to: '/vendre' },
  { icon: KeyRound, title: 'Louer un bien', text: 'Appartements et maisons, vides ou meublés : des locations choisies avec soin.', to: '/louer' },
]

const values = [
  { icon: Target, title: 'Le client au centre', text: 'Chaque recherche est construite à partir de vos priorités, pas de notre catalogue.' },
  { icon: BadgeCheck, title: 'Transparence', text: 'Prix, honoraires, points faibles d’un bien : nous vous disons tout, simplement.' },
  { icon: ScrollText, title: 'Expertise', text: 'Juridique, fiscalité, travaux : un conseil documenté pour décider en confiance.' },
  { icon: MessagesSquare, title: 'Communication', text: 'Un compte rendu après chaque visite et une réponse sous 24 heures ouvrées.' },
  { icon: Users, title: 'Travail d’équipe', text: 'Nos conseillers partagent leurs fichiers pour élargir vos opportunités.' },
  { icon: HeartHandshake, title: 'Engagement', text: 'Nous restons à vos côtés jusqu’à la remise des clés, et au-delà.' },
]

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-titre" className="relative">
      <div className="relative pt-4 sm:pt-6">
        <span className="deco-square right-0 top-10 hidden md:block" aria-hidden="true" />
        <div className="container-site">
          <SectionHeading
            id="services-titre"
            eyebrow="Nos services"
            title={
              <>
                Un accompagnement premium pour
                <br className="hidden sm:block" /> concrétiser votre projet
              </>
            }
          />
        </div>
      </div>

      {/* Les cartes chevauchent la bande bleu marine. */}
      <div className="bg-[linear-gradient(to_bottom,#fff_0,#fff_140px,#0E2552_140px)] sm:bg-[linear-gradient(to_bottom,#fff_0,#fff_160px,#0E2552_160px)]">
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-3">
            {services.map(({ icon: Icon, title, text, to }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08}>
                <Link to={to} className="group block h-full bg-white p-8 shadow-lift transition-transform duration-500 hover:-translate-y-1.5 sm:p-10">
                  <Icon size={34} strokeWidth={1.2} className="text-coral" aria-hidden="true" />
                  <h3 className="mt-6 text-[20px] font-normal">{title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy group-hover:text-coral-dark">
                    En savoir plus <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <ul className="grid gap-x-10 gap-y-12 py-20 sm:grid-cols-2 sm:py-24 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 0.08}>
                <Icon size={28} strokeWidth={1.2} className="text-coral-light" aria-hidden="true" />
                <h3 className="mt-4 text-[16px] font-medium text-white">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
