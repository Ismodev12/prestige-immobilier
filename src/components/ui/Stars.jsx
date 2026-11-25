import { Star } from 'lucide-react'

export default function Stars({ rating = 5, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} strokeWidth={1.5} className={i < rating ? 'fill-coral text-coral' : 'text-line'} aria-hidden="true" />
      ))}
    </span>
  )
}
