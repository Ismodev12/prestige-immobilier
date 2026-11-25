import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, Send } from 'lucide-react'
import { rules, submitLead } from '../utils/api'
import { FieldError, FormError, FormSuccess } from './ui/FormStatus'

const subjects = ['Acheter un bien', 'Vendre un bien', 'Louer un bien', 'Mettre en location', 'Autre demande']

/**
 * Formulaire de contact. Avec `property`, il devient une demande d'information ou de visite pour ce bien.
 */
export default function ContactForm({ property, compact = false }) {
  const id = useId()
  const [result, setResult] = useState(null)
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      subject: property ? 'Demande de visite' : subjects[0],
      message: property ? `Bonjour, je souhaite obtenir plus d’informations sur le bien « ${property.title} » à ${property.city} (réf. ${property.id}).` : '',
    },
  })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const response = await submitLead(property ? 'visite' : 'contact', { ...data, property: property?.id })
      setResult(response)
    } catch (error) {
      setServerError(error.message || 'Une erreur est survenue. Merci de réessayer ou de nous appeler.')
    }
  }

  if (result) {
    return (
      <FormSuccess
        title="Merci, votre message est bien reçu"
        message={
          property
            ? 'Un conseiller vous contacte rapidement pour organiser la visite et répondre à vos questions.'
            : 'Un conseiller vous répond sous 24 heures ouvrées, par e-mail ou par téléphone selon votre préférence.'
        }
        result={result}
        onReset={() => {
          reset()
          setResult(null)
        }}
        resetLabel="Envoyer un autre message"
      />
    )
  }

  const field = (name) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor={`${id}-name`} className="field-label">
            Nom et prénom <span className="text-coral-dark">*</span>
          </label>
          <input {...register('name', rules.name)} {...field('name')} autoComplete="name" className="field" placeholder="Jeanne Lefèvre" />
          <FieldError error={errors.name} id={`${id}-name-error`} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Adresse e-mail <span className="text-coral-dark">*</span>
          </label>
          <input {...register('email', rules.email)} {...field('email')} type="email" autoComplete="email" className="field" placeholder="nom@domaine.fr" />
          <FieldError error={errors.email} id={`${id}-email-error`} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Téléphone <span className="text-coral-dark">*</span>
          </label>
          <input {...register('phone', rules.phone)} {...field('phone')} type="tel" autoComplete="tel" className="field" placeholder="06 12 34 56 78" />
          <FieldError error={errors.phone} id={`${id}-phone-error`} />
        </div>
        {!property && (
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-subject`} className="field-label">
              Objet de votre demande
            </label>
            <select {...register('subject')} {...field('subject')} className="field">
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor={`${id}-message`} className="field-label">
            Votre message <span className="text-coral-dark">*</span>
          </label>
          <textarea
            {...register('message', {
              required: 'Merci de préciser votre demande.',
              minLength: { value: 15, message: 'Votre message est un peu court (15 caractères minimum).' },
            })}
            {...field('message')}
            rows={compact ? 4 : 5}
            className="field resize-y"
            placeholder="Décrivez votre projet, vos disponibilités..."
          />
          <FieldError error={errors.message} id={`${id}-message-error`} />
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            {...register('consent', rules.consent)}
            aria-invalid={errors.consent ? 'true' : 'false'}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[3px] border-line accent-[#0E2552]"
          />
          <span>J’accepte que Prestige Immobilier utilise mes coordonnées pour répondre à ma demande, conformément à la politique de confidentialité.</span>
        </label>
        <FieldError error={errors.consent} id={`${id}-consent-error`} />
      </div>

      <FormError message={serverError} />

      <button type="submit" disabled={isSubmitting} className={`btn-coral ${compact ? 'w-full' : 'w-full sm:w-auto'}`}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            {property ? 'Demander une visite' : 'Envoyer mon message'}
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
