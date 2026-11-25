import { useEffect } from 'react'

const SITE = 'Prestige Immobilier'

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Met à jour le titre, la meta description et les balises Open Graph de la page courante. */
export function useSeo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Agence immobilière haut de gamme à Paris`
    document.title = fullTitle
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.origin + window.location.pathname
  }, [title, description])
}
