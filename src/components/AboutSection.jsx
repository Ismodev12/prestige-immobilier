import { Link } from 'react-router-dom'
import { ArrowRight, Gem, Handshake, ShieldCheck } from 'lucide-react'
import Reveal from './ui/Reveal'

const pillars = [
  { icon: Gem, title: 'Expertise reconnue', text: 'Depuis plus de 15 ans sur le marché haut de gamme.' },
  { icon: Handshake, title: 'Accompagnement personnalisé', text: 'Un conseiller dédié, de la visite à la signature.' },
  { icon: ShieldCheck, title: 'Sécurité et confiance', text: 'Dossiers vérifiés et transactions encadrées.' },
]

const stats = [
  { value: '15', suffix: ' ans', label: "d'expérience" },
  { value: '1 200', suffix: '+', label: 'biens vendus' },
  { value: '98', suffix: ' %', label: 'de clients satisfaits' },
]

export default function AboutSection() {
  return (
    <section aria-labelledby="agence-titre" className="bg-mist">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[340px] sm:min-h-[460px] lg:min-h-[640px]" y={0}>
          <img
            src="/images/agency-interior.webp"
            alt="Salon contemporain lumineux aux tons clairs, canapé et mobilier en bois"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_75%]"
          />
          <div className="absolute bottom-0 left-0 hidden bg-navy px-8 py-7 text-white sm:block lg:px-10">
            <dl className="flex gap-8 lg:gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-[30px] font-semibold leading-none text-gold-light">
                      {stat.value}
                      <span className="text-[20px]">{stat.suffix}</span>
                    </span>
                    <span className="mt-2 block text-[12.5px] text-white/70">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="flex items-center">
          <div className="w-full px-5 py-16 sm:px-12 sm:py-20 lg:max-w-[640px] lg:px-16 xl:px-20">
            <Reveal>
              <p className="eyebrow">Notre agence</p>
              <h2 id="agence-titre" className="mt-5 text-balance text-[32px] font-semibold leading-[1.15] sm:text-[40px]">
                Une équipe passionnée à votre service
              </h2>
              <p className="mt-6 text-[16px] leading-[1.8] text-ink-muted">
                Depuis plus de 15 ans, Prestige Immobilier vous accompagne dans tous vos projets : achat, vente, location et
                investissement immobilier, avec un engagement d'excellence.
              </p>
              <Link to="/agence" className="btn-gold mt-8">
                En savoir plus
                <ArrowRight size={17} />
              </Link>
            </Reveal>

            <ul className="mt-12 grid gap-6 border-t border-navy/10 pt-10 sm:grid-cols-3 sm:gap-5">
              {pillars.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={0.1 * i} className="flex gap-4 sm:block">
                  <Icon size={30} strokeWidth={1.1} className="shrink-0 text-gold-dark" aria-hidden="true" />
                  <div>
                    <h3 className="font-sans text-[14.5px] font-bold text-navy sm:mt-4">{title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
