import { useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Building, Building2, Check, Home, Loader2, Trees } from 'lucide-react'
import { rules, submitLead } from '../utils/api'
import { FieldError, FormError, FormSuccess } from './ui/FormStatus'

const types = [
  { value: 'Maison', icon: Home },
  { value: 'Appartement', icon: Building2 },
  { value: 'Villa', icon: Building },
  { value: 'Terrain', icon: Trees },
]

const conditions = [
  { value: 'À rénover', hint: 'Travaux importants à prévoir' },
  { value: 'Bon état', hint: 'Habitable, quelques rafraîchissements' },
  { value: 'Rénové récemment', hint: 'Travaux de moins de 5 ans' },
  { value: 'Neuf ou très récent', hint: 'Construction de moins de 10 ans' },
]

const steps = [
  { title: 'Votre bien', fields: ['type', 'address', 'postalCode', 'city'] },
  { title: 'Caractéristiques', fields: ['surface', 'bedrooms', 'condition'] },
  { title: 'Vos coordonnées', fields: ['name', 'email', 'phone', 'consent'] },
]

function ChoiceCard({ register, name, value, rulesConfig, children, invalid }) {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" value={value} {...register(name, rulesConfig)} className="peer sr-only" aria-invalid={invalid ? 'true' : 'false'} />
      <span className="flex h-full items-center gap-3 rounded-[4px] border border-line bg-white p-4 transition-all duration-200 hover:border-navy/30 peer-checked:border-gold peer-checked:bg-gold-soft peer-checked:shadow-[0_0_0_1px_#D5A447] peer-focus-visible:ring-2 peer-focus-visible:ring-gold/40">
        {children}
      </span>
      <Check size={16} className="absolute right-3 top-3 hidden text-gold-dark peer-checked:block" aria-hidden="true" />
    </label>
  )
}

export default function EstimateForm() {
  const id = useId()
  const topRef = useRef(null)
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(null)
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched', shouldUnregister: false, defaultValues: { bedrooms: '' } })

  const field = (name) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const next = async () => {
    const valid = await trigger(steps[step].fields)
    if (valid) {
      setStep((s) => s + 1)
      scrollTop()
    }
  }

  const onSubmit = async (data) => {
    setServerError('')
    try {
      setResult(await submitLead('estimation', data))
      scrollTop()
    } catch (error) {
      setServerError(error.message || 'Une erreur est survenue. Merci de réessayer.')
    }
  }

  if (result) {
    return (
      <div ref={topRef} className="scroll-mt-32">
        <FormSuccess
          title="Votre demande d'estimation est enregistrée"
          message="Un expert de l'agence étudie les caractéristiques de votre bien et les ventes récentes du secteur. Il vous rappelle sous 24 heures pour convenir d'une visite, puis vous remet un avis de valeur écrit."
          result={result}
          onReset={() => {
            reset()
            setStep(0)
            setResult(null)
          }}
          resetLabel="Estimer un autre bien"
        />
      </div>
    )
  }

  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* Progression */}
      <ol className="mb-10 grid grid-cols-3 gap-3" aria-label="Étapes du formulaire">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? 'step' : undefined}>
            <span className={`block h-[3px] rounded-full transition-colors duration-500 ${i <= step ? 'bg-gold' : 'bg-line'}`} />
            <span className={`mt-3 flex items-center gap-2 text-[12.5px] font-semibold sm:text-[13.5px] ${i <= step ? 'text-navy' : 'text-ink-muted'}`}>
              <span className="font-serif text-gold-dark">{i + 1}.</span>
              <span className="truncate">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <fieldset>
                  <legend className="field-label">
                    Type de bien <span className="text-gold-dark">*</span>
                  </legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {types.map(({ value, icon: Icon }) => (
                      <ChoiceCard key={value} register={register} name="type" value={value} invalid={errors.type} rulesConfig={{ required: 'Merci de sélectionner le type de bien.' }}>
                        <Icon size={20} strokeWidth={1.5} className="text-gold-dark" aria-hidden="true" />
                        <span className="text-[15px] font-semibold text-navy">{value}</span>
                      </ChoiceCard>
                    ))}
                  </div>
                  <FieldError error={errors.type} id={`${id}-type-error`} />
                </fieldset>
                <div>
                  <label htmlFor={`${id}-address`} className="field-label">
                    Adresse du bien <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    {...register('address', { required: "Merci d'indiquer l'adresse du bien.", minLength: { value: 5, message: 'Adresse incomplète.' } })}
                    {...field('address')}
                    autoComplete="street-address"
                    className="field"
                    placeholder="12 rue de la Pompe"
                  />
                  <FieldError error={errors.address} id={`${id}-address-error`} />
                </div>
                <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
                  <div>
                    <label htmlFor={`${id}-postalCode`} className="field-label">
                      Code postal <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      {...register('postalCode', {
                        required: 'Code postal requis.',
                        pattern: { value: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/, message: 'Code postal invalide (5 chiffres).' },
                      })}
                      {...field('postalCode')}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      className="field"
                      placeholder="75016"
                    />
                    <FieldError error={errors.postalCode} id={`${id}-postalCode-error`} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-city`} className="field-label">
                      Ville <span className="text-gold-dark">*</span>
                    </label>
                    <input {...register('city', { required: 'Ville requise.' })} {...field('city')} autoComplete="address-level2" className="field" placeholder="Paris" />
                    <FieldError error={errors.city} id={`${id}-city-error`} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-surface`} className="field-label">
                      Surface habitable (m²) <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      {...register('surface', {
                        required: 'Merci d’indiquer la surface.',
                        valueAsNumber: true,
                        min: { value: 9, message: 'La surface minimale est de 9 m².' },
                        max: { value: 5000, message: 'Surface trop élevée : vérifiez la saisie.' },
                      })}
                      {...field('surface')}
                      type="number"
                      inputMode="numeric"
                      className="field"
                      placeholder="120"
                    />
                    <FieldError error={errors.surface} id={`${id}-surface-error`} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-bedrooms`} className="field-label">
                      Nombre de chambres <span className="text-gold-dark">*</span>
                    </label>
                    <select {...register('bedrooms', { required: 'Merci de préciser le nombre de chambres.' })} {...field('bedrooms')} className="field">
                      <option value="">Sélectionner</option>
                      <option value="0">Aucune (studio, terrain)</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} chambre{n > 1 ? 's' : ''}
                        </option>
                      ))}
                      <option value="6+">6 chambres et plus</option>
                    </select>
                    <FieldError error={errors.bedrooms} id={`${id}-bedrooms-error`} />
                  </div>
                </div>
                <fieldset>
                  <legend className="field-label">
                    État du bien <span className="text-gold-dark">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {conditions.map((c) => (
                      <ChoiceCard key={c.value} register={register} name="condition" value={c.value} invalid={errors.condition} rulesConfig={{ required: "Merci d'indiquer l'état du bien." }}>
                        <span>
                          <span className="block text-[15px] font-semibold text-navy">{c.value}</span>
                          <span className="mt-0.5 block text-[13px] text-ink-muted">{c.hint}</span>
                        </span>
                      </ChoiceCard>
                    ))}
                  </div>
                  <FieldError error={errors.condition} id={`${id}-condition-error`} />
                </fieldset>
                <div>
                  <label htmlFor={`${id}-details`} className="field-label">
                    Précisions <span className="font-normal text-ink-muted">(facultatif)</span>
                  </label>
                  <textarea {...register('details')} id={`${id}-details`} rows={3} className="field" placeholder="Terrasse, vue, parking, travaux récents..." />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label htmlFor={`${id}-name`} className="field-label">
                    Nom et prénom <span className="text-gold-dark">*</span>
                  </label>
                  <input {...register('name', rules.name)} {...field('name')} autoComplete="name" className="field" placeholder="Jeanne Lefèvre" />
                  <FieldError error={errors.name} id={`${id}-name-error`} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-email`} className="field-label">
                      Adresse e-mail <span className="text-gold-dark">*</span>
                    </label>
                    <input {...register('email', rules.email)} {...field('email')} type="email" autoComplete="email" className="field" placeholder="nom@domaine.fr" />
                    <FieldError error={errors.email} id={`${id}-email-error`} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-phone`} className="field-label">
                      Téléphone <span className="text-gold-dark">*</span>
                    </label>
                    <input {...register('phone', rules.phone)} {...field('phone')} type="tel" autoComplete="tel" className="field" placeholder="06 12 34 56 78" />
                    <FieldError error={errors.phone} id={`${id}-phone-error`} />
                  </div>
                </div>
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
                    <input type="checkbox" {...register('consent', rules.consent)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#071D3B]" />
                    <span>J’accepte d’être recontacté par un expert de Prestige Immobilier au sujet de mon estimation.</span>
                  </label>
                  <FieldError error={errors.consent} id={`${id}-consent-error`} />
                </div>
                <FormError message={serverError} />
              </>
            )}
          </motion.div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn justify-start px-0 text-navy hover:text-gold-dark">
              <ArrowLeft size={17} />
              Étape précédente
            </button>
          ) : (
            <span className="text-[13px] text-ink-muted">Gratuit et sans engagement</span>
          )}
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="btn-navy">
              Continuer
              <ArrowRight size={17} />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="btn-gold">
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Recevoir mon estimation
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
