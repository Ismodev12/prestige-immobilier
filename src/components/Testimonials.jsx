import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import Reveal from './ui/Reveal'
import Stars from './ui/Stars'

export default function Testimonials() {
  const track = useRef(null)
  const scroll = (direction) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    el.scrollBy({ left: direction * ((card?.offsetWidth ?? 320) + 24), behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="avis-titre" className="section bg-mist">
      <div className="container-site">
        <Reveal className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Témoignages</p>
            <h2 id="avis-titre" className="text-[30px] font-semibold leading-[1.15] sm:text-[38px] lg:text-[42px]">
              Ils nous font confiance
            </h2>
          </div>
          <div className="flex gap-2 lg:hidden">
            <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy hover:border-navy" aria-label="Témoignage précédent">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy hover:border-navy" aria-label="Témoignage suivant">
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <ul ref={track} className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {testimonials.map((t, index) => (
            <Reveal as="li" key={t.id} delay={index * 0.1} className="w-[86%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
              <figure className="flex h-full flex-col rounded-card bg-white p-7 shadow-card sm:p-8">
                <Quote size={28} strokeWidth={1.2} className="text-gold" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-serif text-[18px] italic leading-[1.6] text-navy">« {t.quote} »</blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                  <img src={t.photo} alt={`Portrait de ${t.name}`} loading="lazy" width="56" height="56" className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-[13px] text-ink-muted">{t.context}</p>
                    <div className="mt-1">
                      <Stars rating={t.rating} size={13} />
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-center text-[12.5px] text-ink-muted">
          Témoignages présentés à titre d’exemple, en attendant la publication d’avis clients vérifiés.
        </p>
      </div>
    </section>
  )
}
