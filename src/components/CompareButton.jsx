import { ArrowLeftRight, Check } from 'lucide-react'
import { useCompare } from '../hooks/useCompare'

/** Ajoute ou retire un bien de la sélection du comparateur. */
export default function CompareButton({ property, variant = 'icon', className = '' }) {
  const { isSelected, toggle } = useCompare()
  const active = isSelected(property.id)
  const label = active ? `Retirer « ${property.title} » du comparateur` : `Ajouter « ${property.title} » au comparateur`
  const onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(property.id)
  }

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-[3px] border px-4 text-[14px] font-semibold transition-colors ${
          active ? 'border-navy bg-navy text-white' : 'border-line text-navy hover:border-navy'
        } ${className}`}
      >
        {active ? <Check size={16} /> : <ArrowLeftRight size={16} />}
        {active ? 'Dans le comparateur' : 'Comparer'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`grid place-items-center rounded-full backdrop-blur transition-colors ${
        active ? 'bg-navy text-white' : 'bg-white/90 text-navy hover:bg-white'
      } ${className}`}
    >
      {active ? <Check size={16} strokeWidth={2.4} /> : <ArrowLeftRight size={16} strokeWidth={1.8} />}
    </button>
  )
}
