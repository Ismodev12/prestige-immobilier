import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { posts } from '../data/posts'
import { useSeo } from '../hooks/useSeo'
import { formatDate } from '../utils/format'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  useSeo({ title: post?.title ?? 'Article introuvable', description: post?.excerpt })
  if (!post) return <NotFound message="Cet article n'existe pas ou a été déplacé." />
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <article>
      <header className="container-site max-w-[860px] pb-10 pt-12 sm:pt-16">
        <Link to="/blog" className="link-arrow mb-8">
          <ArrowLeft size={16} /> Tous les articles
        </Link>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">{post.category}</p>
        <h1 className="mt-4 text-balance text-[34px] font-semibold leading-[1.12] sm:text-[48px]">{post.title}</h1>
        <p className="mt-5 text-[18px] leading-relaxed text-ink-muted">{post.excerpt}</p>
        <p className="mt-6 flex items-center gap-3 text-[13px] text-ink-muted">
          <span className="font-semibold text-navy">Par la rédaction Prestige Immobilier</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {post.readingTime} min
          </span>
        </p>
      </header>
      <div className="container-site max-w-[1100px]">
        <img src={post.image} alt={post.alt} className="aspect-[16/8] w-full rounded-card object-cover" />
      </div>
      <div className="container-site prose-estate max-w-[760px] py-12 sm:py-16 [&_p]:text-[17px]">
        {post.body.map((block) => (block.type === 'h2' ? <h2 key={block.text}>{block.text}</h2> : <p key={block.text}>{block.text}</p>))}
        <div className="mt-12 rounded-card bg-navy p-8 text-white">
          <p className="font-serif text-[22px] font-semibold text-white">Un projet en tête ?</p>
          <p className="mt-2 text-white/75">Nos conseillers répondent à vos questions, sans engagement.</p>
          <Link to="/contact" className="btn-gold mt-6">
            Nous contacter <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      {others.length > 0 && (
        <aside className="border-t border-line bg-mist py-14" aria-label="À lire aussi">
          <div className="container-site">
            <h2 className="mb-8 text-[26px] font-semibold">À lire aussi</h2>
            <ul className="grid gap-8 md:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group flex gap-5">
                    <img src={p.image} alt="" loading="lazy" className="h-24 w-32 shrink-0 rounded-[4px] object-cover sm:h-28 sm:w-40" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark">{p.category}</p>
                      <p className="mt-2 font-serif text-[19px] font-semibold leading-snug text-navy group-hover:text-navy-600">{p.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  )
}
