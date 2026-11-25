import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import SearchBar from './SearchBar'
import VideoModal from './VideoModal'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)
  const reduce = useReducedMotion()
  const fade = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } }

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-navy pb-36 pt-20 sm:min-h-[640px] lg:min-h-[min(78vh,720px)] lg:pb-40">
        <motion.img
          src="/images/hero-villa.webp"
          alt="Villa contemporaine de luxe aux grandes baies vitrées, éclairée à la tombée de la nuit"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]"
          fetchpriority="high"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        />
        {/* Voile marine : dense à gauche pour le texte, transparent à droite pour laisser respirer l'architecture. */}
        <div className="absolute inset-0 -z-10 bg-navy/55 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(7,29,59,.92)_0%,rgba(7,29,59,.72)_34%,rgba(7,29,59,.18)_62%,rgba(7,29,59,0)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy/50 to-transparent" />

        <div className="container-site">
          <div className="max-w-[740px]">
            <motion.p {...fade(0.1)} className="eyebrow mb-6 text-gold-light before:bg-gold-light">
              Agence immobilière de prestige
            </motion.p>
            <motion.h1
              id="hero-title"
              {...fade(0.2)}
              className="text-[44px] font-semibold leading-[1.04] tracking-[-0.01em] text-white sm:text-[60px] lg:text-[72px]"
            >
              Trouvez la maison
              <br />
              de vos <em className="font-medium italic text-gold-light">rêves</em>
            </motion.h1>
            <motion.p {...fade(0.35)} className="mt-6 max-w-md text-[17px] leading-relaxed text-white/85 sm:text-[18px]">
              Avec Prestige Immobilier, concrétisez votre projet immobilier en toute confiance.
            </motion.p>
            <motion.div {...fade(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link to="/acheter" className="btn-gold">
                Découvrir nos biens
                <ArrowRight size={18} />
              </Link>
              <button type="button" onClick={() => setVideoOpen(true)} className="btn-outline-light group pl-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:scale-105">
                  <Play size={15} className="translate-x-px fill-navy" />
                </span>
                Voir la vidéo
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-site relative z-10 -mt-24 sm:-mt-20 lg:-mt-14">
        <motion.div {...fade(0.6)}>
          <SearchBar />
        </motion.div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  )
}
