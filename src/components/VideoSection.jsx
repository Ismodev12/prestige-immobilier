import { useState } from 'react'
import { Play } from 'lucide-react'
import VideoModal from './VideoModal'
import Reveal from './ui/Reveal'

/** Grande photo d'architecture à cheval sur la bande bleu marine, avec bouton de lecture corail. */
export default function VideoSection() {
  const [open, setOpen] = useState(false)
  return (
    <section aria-label="Présentation vidéo" className="-mt-px bg-[linear-gradient(to_bottom,#0E2552_0,#0E2552_45%,#fff_45%)]">
      <div className="container-site">
        <Reveal className="group relative overflow-hidden">
          <img
            src="/images/hero-villa.webp"
            alt="Villa contemporaine aux grandes baies vitrées, éclairée à la tombée de la nuit"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03] sm:aspect-[16/7.5]"
          />
          <div className="absolute inset-0 bg-navy/15" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral text-white shadow-lift transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20"
            aria-label="Voir la vidéo de présentation"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-coral/40 motion-reduce:hidden" aria-hidden="true" />
            <Play size={26} className="relative translate-x-0.5 fill-white" />
          </button>
        </Reveal>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
