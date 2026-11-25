import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import { agency } from '../data/agency'

// Sans vidéo fournie (agency.videoUrl vide), la modale présente une visite en images animée des biens.
const slides = [
  { src: '/images/hero-villa.webp', caption: 'Villa contemporaine, éclairage de fin de journée' },
  { src: '/images/antibes-2.webp', caption: 'Pièce de vie ouverte sur le jardin, Antibes' },
  { src: '/images/bordeaux-1.webp', caption: 'Maison de maître et son parc, Bordeaux' },
  { src: '/images/paris16-2.webp', caption: 'Appartement rénové, Paris 16e' },
  { src: '/images/sainttropez-1.webp', caption: 'Piscine et terrasses, Saint-Tropez' },
  { src: '/images/bordeaux-3.webp', caption: 'Salon de réception et cheminée en marbre' },
]
const DURATION = 5000

function Slideshow() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const go = useCallback((step) => setIndex((i) => (i + step + slides.length) % slides.length), [])

  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(() => go(1), DURATION)
    return () => clearTimeout(timer)
  }, [index, playing, go])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === ' ') {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy sm:aspect-video">
      <AnimatePresence initial={false}>
        <motion.img
          key={slides[index].src}
          src={slides[index].src}
          alt={slides[index].caption}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: DURATION / 1000 + 1, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-7">
        <div className="mb-4 flex gap-1.5" aria-hidden="true">
          {slides.map((slide, i) => (
            <span key={slide.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
              <motion.span
                key={`${i}-${index}-${playing}`}
                className="block h-full bg-coral"
                initial={{ width: i < index ? '100%' : '0%' }}
                animate={{ width: i < index ? '100%' : i === index && playing ? '100%' : i === index ? '0%' : '0%' }}
                transition={{ duration: i === index && playing ? DURATION / 1000 : 0, ease: 'linear' }}
              />
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-white sm:text-base" aria-live="polite">
            {slides[index].caption}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Image précédente">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => setPlaying((p) => !p)} className="grid h-10 w-10 place-items-center rounded-full bg-coral text-navy hover:bg-coral-light" aria-label={playing ? 'Mettre en pause' : 'Lire'}>
              {playing ? <Pause size={17} /> : <Play size={17} className="translate-x-px" />}
            </button>
            <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Image suivante">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/90 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Présentation de Prestige Immobilier"
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-card shadow-2xl"
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {agency.videoUrl ? (
              <video src={agency.videoUrl} controls autoPlay playsInline className="aspect-video w-full bg-black" />
            ) : (
              <Slideshow />
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-navy/70 text-white backdrop-blur hover:bg-navy"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
