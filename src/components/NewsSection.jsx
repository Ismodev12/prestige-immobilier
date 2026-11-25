import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { formatDate } from '../utils/format'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function NewsSection() {
  const [main, ...others] = posts
  return (
    <section aria-labelledby="actus-titre" className="relative pb-20 pt-4 sm:pb-24">
      <span className="deco-square right-0 top-0 hidden md:block" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="actus-titre"
          eyebrow="Le journal"
          title={
            <>
              Actualités et conseils
              <br className="hidden sm:block" /> du marché immobilier
            </>
          }
        />
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Reveal>
            <Link to={`/blog/${main.slug}`} className="group relative block overflow-hidden">
              <img
                src={main.image}
                alt={main.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04] lg:aspect-auto lg:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-coral-light">
                  {main.category} · <time dateTime={main.date}>{formatDate(main.date)}</time>
                </p>
                <h3 className="mt-2 text-[21px] font-medium leading-snug text-white sm:text-[24px]">{main.title}</h3>
                <p className="mt-2 line-clamp-2 max-w-lg text-[14px] text-white/75">{main.excerpt}</p>
              </div>
            </Link>
          </Reveal>
          <ul className="flex flex-col divide-y divide-line">
            {others.slice(0, 3).map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 0.08} className="py-5 first:pt-0 last:pb-0">
                <Link to={`/blog/${post.slug}`} className="group flex gap-5">
                  <img src={post.image} alt="" loading="lazy" className="h-[92px] w-[120px] shrink-0 object-cover sm:h-[104px] sm:w-[150px]" />
                  <div className="min-w-0">
                    <p className="text-[11.5px] text-ink-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                    <h3 className="mt-1 text-[15.5px] font-medium leading-snug transition-colors group-hover:text-coral-dark">{post.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
