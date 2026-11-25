import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { advisor } from '../data/agency'
import Reveal from './ui/Reveal'
import Stars from './ui/Stars'

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]
  const go = (step) => setIndex((i) => (i + step + testimonials.length) % testimonials.length)

  return (
    <section aria-labelledby="avis-titre" className="relative overflow-hidden py-20 sm:py-24">
      <div className="container-site">
        <Reveal className="mb-12 text-center sm:mb-16">
          <p className="eyebrow mb-3">Témoignages</p>
          <h2 id="avis-titre" className="text-balance text-[26px] font-normal leading-[1.25] sm:text-[32px] lg:text-[36px]">
            Ils nous ont confié
            <br className="hidden sm:block" /> leur projet immobilier
          </h2>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[420px]">
            <span className="absolute -left-6 -top-6 h-[70%] w-[70%] bg-peach-200 sm:-left-10 sm:-top-8" aria-hidden="true" />
            <span className="absolute -bottom-6 -right-6 h-24 w-24 bg-peach sm:-right-10" aria-hidden="true" />
            <img
              src={advisor.photo}
              alt={`Portrait de ${advisor.firstName} ${advisor.lastName}`}
              loading="lazy"
              className="relative aspect-[4/4.6] w-full object-cover object-top"
            />
          </Reveal>

          <div>
            <Quote size={40} strokeWidth={1} className="text-coral" aria-hidden="true" />
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <blockquote className="mt-5 font-display text-[19px] font-light leading-[1.7] text-navy sm:text-[22px]">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <img src={t.photo} alt={`Portrait de ${t.name}`} width="56" height="56" className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-[13px] text-ink-muted">{t.context}</p>
                    <div className="mt-1">
                      <Stars rating={t.rating} size={13} />
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            <div className="mt-10 flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy hover:border-coral hover:text-coral" aria-label="Témoignage précédent">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full bg-coral text-white hover:bg-coral-dark" aria-label="Témoignage suivant">
                <ChevronRight size={18} />
              </button>
              <p className="text-[13px] text-ink-muted">
                {index + 1} / {testimonials.length}
              </p>
            </div>
            <p className="mt-8 text-[12px] text-ink-muted">Témoignages présentés à titre d’exemple, en attendant la publication d’avis clients vérifiés.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
