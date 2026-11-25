import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { posts } from '../data/posts'
import { useSeo } from '../hooks/useSeo'
import { formatDate } from '../utils/format'

export default function Blog() {
  useSeo({ title: 'Blog immobilier', description: 'Conseils, analyses de marché et portraits de quartiers par les experts de Prestige Immobilier.' })
  const categories = ['Tous', ...new Set(posts.map((p) => p.category))]
  const [category, setCategory] = useState('Tous')
  const list = category === 'Tous' ? posts : posts.filter((p) => p.category === category)
  const [first, ...rest] = list

  return (
    <>
      <PageHero
        compact
        title="Le journal de l’immobilier"
        intro="Conseils d’experts, tendances du marché et portraits de quartiers, pour décider en connaissance de cause."
        breadcrumbs={[{ label: 'Blog' }]}
      />
      <div className="container-site py-12 sm:py-16">
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filtrer par catégorie">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`min-h-[42px] shrink-0 rounded-full border px-5 text-[14px] font-semibold transition-colors ${
                category === c ? 'border-navy bg-navy text-white' : 'border-line text-ink hover:border-navy/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {first && (
          <Reveal>
            <Link to={`/blog/${first.slug}`} className="group grid overflow-hidden rounded-card bg-mist lg:grid-cols-[1.3fr_1fr]">
              <div className="overflow-hidden">
                <img src={first.image} alt={first.alt} className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-coral-dark">{first.category}</p>
                <h2 className="mt-4 text-balance text-[28px] font-semibold leading-tight transition-colors group-hover:text-navy-600 sm:text-[34px]">{first.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{first.excerpt}</p>
                <p className="mt-6 flex items-center gap-3 text-[13px] text-ink-muted">
                  <time dateTime={first.date}>{formatDate(first.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} /> {first.readingTime} min de lecture
                  </span>
                </p>
                <span className="link-arrow mt-7">
                  Lire l’article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-card">
                    <img src={post.image} alt={post.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-coral-dark">{post.category}</p>
                  <h2 className="mt-3 text-[24px] font-semibold leading-snug">{post.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-muted">{post.excerpt}</p>
                  <p className="mt-4 text-[13px] text-ink-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min de lecture
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
