import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { faqs } from '../data/faqs'
import { useSeo } from '../hooks/useSeo'

export default function Faq() {
  useSeo({ title: 'Questions fréquentes', description: 'Estimation, honoraires, mandat, location : les réponses aux questions les plus fréquentes.' })
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHero compact title="Questions fréquentes" intro="Les réponses aux questions que nos clients nous posent le plus souvent." breadcrumbs={[{ label: 'FAQ' }]} />
      <div className="container-site max-w-[860px] py-12 sm:py-16">
        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q}>
                <h2 className="font-sans">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[19px] font-semibold text-navy sm:text-[21px]"
                  >
                    {item.q}
                    <Plus size={20} className={`shrink-0 text-coral-dark transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 leading-[1.8] text-ink-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
        <p className="mt-10 text-center text-ink-muted">
          Vous ne trouvez pas votre réponse ?{' '}
          <Link to="/contact" className="font-semibold text-navy underline decoration-coral underline-offset-4">
            Contactez-nous
          </Link>
          .
        </p>
      </div>
    </>
  )
}
