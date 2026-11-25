import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock, Lightbulb, ListOrdered } from 'lucide-react'
import { posts } from '../data/posts'
import { useSeo } from '../hooks/useSeo'
import { formatDate, normalize } from '../utils/format'
import NotFound from './NotFound'

const anchor = (text) =>
  normalize(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Rendu d'un bloc d'article : paragraphe, intertitre, liste, encadré conseil ou appel à l'action. */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={anchor(block.text)} className="scroll-mt-28">
          {block.text}
        </h2>
      )
    case 'ul':
      return (
        <ul className="!list-none !pl-0 mb-6 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[16.5px] leading-relaxed text-ink-muted">
              <span className="mt-[7px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-coral-soft text-coral-dark">
                <Check size={11} strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'tip':
      return (
        <aside className="my-8 border-l-[3px] border-coral bg-peach px-6 py-5">
          <p className="!mb-0 flex items-center gap-2 font-display !text-[16px] font-medium !text-navy">
            <Lightbulb size={18} className="text-coral" aria-hidden="true" />
            {block.title}
          </p>
          <p className="!mb-0 mt-2 !text-[15.5px]">{block.text}</p>
        </aside>
      )
    case 'cta':
      return (
        <div className="mt-12 bg-navy p-8 text-white sm:p-10">
          <p className="!mb-0 font-display !text-[22px] font-medium leading-snug !text-white sm:!text-[24px]">{block.title}</p>
          <p className="!mb-0 mt-3 !text-[15.5px] !text-white/75">{block.text}</p>
          <Link to={block.to} className="btn-coral mt-7">
            {block.label} <ArrowRight size={16} />
          </Link>
        </div>
      )
    default:
      return <p>{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  useSeo({ title: post?.title ?? 'Article introuvable', description: post?.excerpt })
  if (!post) return <NotFound message="Cet article n'existe pas ou a été déplacé." />
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2)
  const headings = post.body.filter((b) => b.type === 'h2')
  const hasCta = post.body.some((b) => b.type === 'cta')

  const toc = (
    <ol className="space-y-2.5 text-[14px]">
      {headings.map((h, i) => (
        <li key={h.text} className="flex gap-2.5">
          <span className="font-display text-coral">{i + 1}.</span>
          <a href={`#${anchor(h.text)}`} className="text-ink-muted transition-colors hover:text-navy">
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <article>
      <header className="bg-peach">
        <div className="container-site max-w-[900px] pb-12 pt-10 sm:pt-14">
          <Link to="/blog" className="link-arrow mb-8 flex w-fit">
            <ArrowLeft size={16} /> Tous les articles
          </Link>
          <p className="eyebrow">{post.category}</p>
          <h1 className="mt-3 text-balance text-[30px] font-normal leading-[1.2] sm:text-[42px]">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{post.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-muted">
            <span className="font-semibold text-navy">Par la rédaction Prestige Immobilier</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" /> {post.readingTime} min de lecture
            </span>
          </p>
        </div>
      </header>

      <div className="container-site max-w-[1100px] pt-10">
        <img src={post.image} alt={post.alt} className="aspect-[16/8] w-full object-cover" />
      </div>

      <div className="container-site grid max-w-[1100px] gap-12 py-12 sm:py-16 lg:grid-cols-[240px_1fr] lg:gap-16">
        {headings.length > 0 && (
          <nav aria-label="Sommaire de l'article" className="lg:order-none">
            <details className="border border-line p-5 lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 font-display text-[15px] font-medium text-navy">
                <ListOrdered size={17} className="text-coral" aria-hidden="true" /> Sommaire
              </summary>
              <div className="mt-4">{toc}</div>
            </details>
            <div className="sticky top-28 hidden lg:block">
              <p className="mb-4 flex items-center gap-2 font-display text-[15px] font-medium text-navy">
                <ListOrdered size={17} className="text-coral" aria-hidden="true" /> Sommaire
              </p>
              {toc}
            </div>
          </nav>
        )}

        <div className="prose-estate min-w-0 max-w-[720px] [&>p]:text-[17px]">
          {post.body.map((block, i) => (
            <Block key={`${block.type}-${i}`} block={block} />
          ))}
          {!hasCta && (
            <div className="mt-12 bg-navy p-8 text-white">
              <p className="font-display text-[22px] font-medium text-white">Un projet en tête ?</p>
              <Link to="/contact" className="btn-coral mt-6">
                Nous contacter <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {others.length > 0 && (
        <aside className="border-t border-line bg-mist py-14" aria-label="À lire aussi">
          <div className="container-site">
            <h2 className="mb-8 text-[24px] font-normal">À lire aussi</h2>
            <ul className="grid gap-8 md:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group flex gap-5">
                    <img src={p.image} alt="" loading="lazy" className="h-24 w-32 shrink-0 object-cover sm:h-28 sm:w-40" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral-dark">{p.category}</p>
                      <p className="mt-2 font-display text-[17px] font-medium leading-snug text-navy group-hover:text-coral-dark">{p.title}</p>
                      <p className="mt-1 text-[12.5px] text-ink-muted">{p.readingTime} min de lecture</p>
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
