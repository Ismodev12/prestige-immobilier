import { motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Info } from 'lucide-react'

/** Écran de confirmation après envoi d'un formulaire, avec mention claire du mode démonstration. */
export function FormSuccess({ title, message, result, onReset, resetLabel = 'Envoyer une autre demande' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="rounded-card border border-coral/30 bg-peach/60 p-7 sm:p-9"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-coral/15 text-coral-dark">
        <CircleCheck size={26} strokeWidth={1.6} />
      </span>
      <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink-muted">{message}</p>
      {result?.reference && (
        <p className="mt-4 text-sm text-ink-muted">
          Référence de votre demande : <strong className="font-semibold text-navy">{result.reference}</strong>
        </p>
      )}
      {result?.demo && (
        <p className="mt-5 flex gap-2.5 rounded-[4px] border border-line bg-white p-3.5 text-[13px] leading-relaxed text-ink-muted">
          <Info size={16} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
          <span>
            Mode démonstration : aucun serveur n’est encore connecté, votre demande n’a pas été transmise à l’agence.
            Renseignez <code className="font-semibold text-navy">VITE_API_URL</code> pour activer l’envoi réel.
          </span>
        </p>
      )}
      {onReset && (
        <button type="button" onClick={onReset} className="btn-outline mt-7">
          {resetLabel}
        </button>
      )}
    </motion.div>
  )
}

export function FieldError({ error, id }) {
  if (!error) return null
  return (
    <p id={id} className="field-error" role="alert">
      <CircleAlert size={14} aria-hidden="true" />
      {error.message}
    </p>
  )
}

export function FormError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="flex items-start gap-2 rounded-[4px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
      <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
