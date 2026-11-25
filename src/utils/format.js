const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const numberFormatter = new Intl.NumberFormat('fr-FR')

export const formatPrice = (value) => priceFormatter.format(value)

/** Prix affiché sur une annonce : prix de vente, ou loyer mensuel pour une location. */
export const formatListingPrice = (property) =>
  property.transaction === 'location' ? `${formatPrice(property.price)} / mois` : formatPrice(property.price)

export const formatNumber = (value) => numberFormatter.format(value)

export const formatSurface = (value) => `${formatNumber(value)} m²`

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export const plural = (count, singular, pluralForm = `${singular}s`) => `${count} ${count > 1 ? pluralForm : singular}`

/** Retire accents et casse pour comparer des saisies libres (ville, code postal). */
export const normalize = (value = '') =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
