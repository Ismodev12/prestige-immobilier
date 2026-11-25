import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FileText, Home } from 'lucide-react'
import Reveal from './ui/Reveal'

const steps = [
  { icon: Home, label: 'Décrivez votre bien' },
  { icon: Clock, label: 'Rappel sous 24 h' },
  { icon: FileText, label: 'Avis de valeur écrit' },
]

export default function EstimateSection() {
  return (
    <section aria-labelledby="estimation-titre" className="section">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-card bg-navy">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <p className="eyebrow text-coral-light before:bg-coral-light">Estimation offerte</p>
              <h2 id="estimation-titre" className="mt-5 text-balance text-[32px] font-semibold leading-[1.12] text-white sm:text-[42px]">
                Estimez gratuitement votre bien
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/75">
                Obtenez une estimation précise et fiable en quelques clics.
              </p>
              <ol className="mt-9 grid gap-4 sm:grid-cols-3 sm:gap-6">
                {steps.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="flex items-center gap-3 text-[14px] text-white/85 sm:flex-col sm:items-start">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-coral/40 text-coral-light">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="mr-1.5 font-display text-coral-light">{i + 1}.</span>
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
              <Link to="/estimation" className="btn-coral mt-10">
                Commencer l'estimation
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-0">
              <img
                src="/images/estimate-villa.webp"
                alt="Villa contemporaine avec piscine au coucher du soleil"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/30 to-transparent lg:block" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy to-transparent lg:hidden" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
