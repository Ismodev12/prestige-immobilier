import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

/** Galerie de la fiche bien : mosaïque adaptée au nombre de photos et visionneuse plein écran au clavier. */
export default function Gallery({ images, title }) {
  const [current, setCurrent] = useState(null)
  const open = current !== null
  const go = useCallback((step) => setCurrent((i) => (i + step + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setCurrent(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, go])

  const side = images.slice(1, 3)
  const tile = (src, index, className, eager = false) => (
    <button
      key={src}
      type="button"
      onClick={() => setCurrent(index)}
      className={`group relative overflow-hidden bg-mist ${className}`}
      aria-label={`Agrandir la photo ${index + 1} sur ${images.length}`}
    >
      <img
        src={src}
        alt={`${title}, photo ${index + 1}`}
        loading={eager ? 'eager' : 'lazy'}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10" />
    </button>
  )

  return (
    <>
      <div className={`grid gap-2 overflow-hidden rounded-card ${side.length ? 'md:grid-cols-[2fr_1fr]' : ''}`}>
        {tile(images[0], 0, 'aspect-[4/3] md:aspect-auto md:h-[540px]', true)}
        {side.length > 0 && (
          <div className={`hidden gap-2 md:grid ${side.length === 2 ? 'grid-rows-2' : ''}`}>
            {side.map((src, i) => tile(src, i + 1, 'h-full min-h-0'))}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[13px] text-ink-muted">{images.length} photos</p>
        <button type="button" onClick={() => setCurrent(0)} className="inline-flex min-h-[40px] items-center gap-2 text-[14px] font-semibold text-navy hover:text-coral-dark">
          <Expand size={16} />
          Voir toutes les photos
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-[#040f20]/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Photos : ${title}`}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
              <p className="text-sm">
                {current + 1} / {images.length}
              </p>
              <button type="button" onClick={() => setCurrent(null)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10" aria-label="Fermer la galerie" autoFocus>
                <X size={22} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-16">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[current]}
                  src={images[current]}
                  alt={`${title}, photo ${current + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[78vh] w-auto max-w-full rounded-[4px] object-contain"
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4" aria-label="Photo précédente">
                    <ChevronLeft size={22} />
                  </button>
                  <button type="button" onClick={() => go(1)} className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4" aria-label="Photo suivante">
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
            <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 pb-5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Afficher la photo ${i + 1}`}
                  aria-current={i === current}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-[3px] transition-opacity ${i === current ? 'opacity-100 ring-2 ring-coral' : 'opacity-50 hover:opacity-80'}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
