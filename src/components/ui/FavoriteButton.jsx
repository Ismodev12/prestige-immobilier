import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '../../hooks/useFavorites'

export default function FavoriteButton({ property, className = '', withLabel = false }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(property.id)
  const label = active ? `Retirer « ${property.title} » des favoris` : `Ajouter « ${property.title} » aux favoris`

  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(property.id)
      }}
      whileTap={{ scale: 0.88 }}
      aria-pressed={active}
      aria-label={withLabel ? undefined : label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 transition-colors duration-300 ${className}`}
    >
      <Heart
        size={18}
        strokeWidth={1.8}
        className={active ? 'fill-gold text-gold' : ''}
      />
      {withLabel && <span>{active ? 'Dans vos favoris' : 'Ajouter aux favoris'}</span>}
    </motion.button>
  )
}
