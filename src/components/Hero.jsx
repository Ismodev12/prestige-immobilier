import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import { advisor } from '../data/agency'

const ease = [0.22, 1, 0.36, 1]

/** Hero : présentation de la conseillère, recherche rapide et portrait détouré sur fond pêche. */
export default function Hero() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const fade = (delay, y = 20) =>
    reduce ? {} : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } }

  const onSubmit = (event) => {
    event.preventDefault()
    const ville = query.trim()
    navigate(`/recherche?transaction=achat${ville ? `&ville=${encodeURIComponent(ville)}` : ''}`)
  }

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-peach">
      <span className="deco-square -left-6 top-24 hidden lg:block" aria-hidden="true" />
      <div className="container-site relative grid items-end gap-6 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-6">
        <div className="pb-14 lg:pb-36 lg:pt-16">
          <motion.p {...fade(0.05)} className="text-[13px] font-medium text-ink-muted">
            {advisor.role}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...fade(0.15)}
            className="mt-3 font-display text-[44px] font-medium uppercase leading-[1.02] tracking-[0.01em] text-navy sm:text-[60px] lg:text-[68px]"
          >
            {advisor.firstName}
            <br />
            {advisor.lastName}
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink-muted">
            Trouvez la maison de vos <span className="font-semibold text-coral-dark">rêves</span>. {advisor.intro}
          </motion.p>
          <motion.form
            {...fade(0.45)}
            role="search"
            onSubmit={onSubmit}
            className="mt-8 flex max-w-md items-stretch gap-1.5 rounded-[3px] bg-white p-1.5 shadow-bar"
          >
            <label htmlFor="hero-search" className="sr-only">
              Ville, quartier ou code postal
            </label>
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ville ou code postal"
              className="min-w-0 flex-1 bg-transparent px-3 text-[14.5px] text-navy placeholder:text-ink-muted/80 focus:outline-none"
            />
            <button type="submit" className="btn-coral min-h-[44px] px-5">
              <Search size={16} aria-hidden="true" />
              Rechercher
            </button>
          </motion.form>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[460px] self-end lg:max-w-[520px]"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <span className="absolute -right-4 bottom-10 h-28 w-28 bg-coral-soft sm:-right-8" aria-hidden="true" />
          <span className="absolute -left-4 top-16 h-20 w-20 border border-coral/40 sm:-left-8" aria-hidden="true" />
          <img
            src={advisor.portrait}
            alt={`Portrait de ${advisor.firstName} ${advisor.lastName}, ${advisor.role.toLowerCase()}`}
            fetchpriority="high"
            width="900"
            height="1100"
            className="relative mx-auto aspect-[9/11] h-auto w-full max-w-[460px] rounded-t-full object-cover object-top"
          />
        </motion.div>
      </div>
    </section>
  )
}
