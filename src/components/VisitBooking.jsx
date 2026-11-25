import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarCheck, ChevronLeft, ChevronRight, Download, Info, Loader2, MapPin, Video } from 'lucide-react'
import { rules, submitLead } from '../utils/api'
import { buildIcsUrl, getDays, getSlots, saveBooking, toISODate, VISIT_DURATION } from '../utils/agenda'
import { FieldError, FormError } from './ui/FormStatus'

const weekday = (d) => d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')
const longDate = (d) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
const modes = [
  { value: 'sur-place', label: 'Sur place', icon: MapPin },
  { value: 'video', label: 'En vidéo', icon: Video },
]

/** Réservation d'une visite : jour, créneau, mode de visite, coordonnées, puis confirmation et fichier agenda. */
export default function VisitBooking({ property, advisor }) {
  const id = useId()
  const days = useMemo(() => getDays(12), [])
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState(null)
  const [mode, setMode] = useState('sur-place')
  const [step, setStep] = useState('slot') // slot, details, done
  const [result, setResult] = useState(null)
  const [serverError, setServerError] = useState('')
  const [refresh, setRefresh] = useState(0)
  const strip = useRef(null)
  const day = days[dayIndex]
  const slots = useMemo(() => getSlots(property.id, day), [property.id, day, refresh])
  const firstAvailable = useMemo(() => days.findIndex((d) => getSlots(property.id, d).some((s) => s.available)), [days, property.id])

  useEffect(() => {
    if (firstAvailable > 0) setDayIndex(firstAvailable)
  }, [firstAvailable])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' })

  const start = useMemo(() => {
    if (!time) return null
    const [h, m] = time.split(':').map(Number)
    return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m)
  }, [day, time])

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const response = await submitLead('visite', { ...data, property: property.id, date: toISODate(day), time, mode })
      saveBooking({ propertyId: property.id, date: toISODate(day), time })
      const location = mode === 'video' ? 'Visite en vidéo (lien envoyé par e-mail)' : `${property.district}, ${property.postalCode} ${property.city.replace(/ \d+e$/, '')}`
      setResult({
        ...response,
        ics: buildIcsUrl({
          title: `Visite : ${property.title} à ${property.city}`,
          start,
          location,
          description: `Visite avec ${advisor.name}, Prestige Immobilier (réf. ${property.id}). Téléphone : ${advisor.phone}.`,
        }),
      })
      setStep('done')
      setRefresh((r) => r + 1)
    } catch (error) {
      setServerError(error.message || 'La réservation n’a pas pu être enregistrée. Merci de réessayer ou de nous appeler.')
    }
  }

  if (step === 'done' && result) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-coral-soft text-coral-dark">
          <CalendarCheck size={24} strokeWidth={1.6} />
        </span>
        <h3 className="mt-4 text-[20px] font-normal">Votre visite est réservée</h3>
        <div className="mt-4 space-y-1.5 bg-peach p-4 text-[14px]">
          <p className="font-semibold text-navy first-letter:uppercase">
            {longDate(day)} à {time.replace(':', ' h ')}
          </p>
          <p className="text-ink-muted">
            {mode === 'video' ? 'Visite en vidéo' : 'Visite sur place'} · {VISIT_DURATION} minutes avec {advisor.name}
          </p>
          {result.reference && <p className="text-ink-muted">Référence : {result.reference}</p>}
        </div>
        <a href={result.ics} download={`visite-${property.slug}.ics`} className="btn-navy mt-4 w-full">
          <Download size={16} /> Ajouter à mon agenda
        </a>
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">
          Un rappel est inclus deux heures avant la visite. Pour décaler, appelez {advisor.name} au {advisor.phone}.
        </p>
        {result.demo && (
          <p className="mt-4 flex gap-2 border border-line p-3 text-[12px] leading-relaxed text-ink-muted">
            <Info size={14} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
            Mode démonstration : les disponibilités sont simulées et la réservation n’a pas été transmise à l’agence. Renseignez VITE_API_URL pour activer l’envoi réel.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStep('slot')
            setTime(null)
            setResult(null)
          }}
          className="mt-4 text-[13.5px] font-semibold text-navy hover:text-coral-dark"
        >
          Réserver un autre créneau
        </button>
      </motion.div>
    )
  }

  if (step === 'details') {
    const field = (name) => ({ id: `${id}-${name}`, 'aria-invalid': errors[name] ? 'true' : 'false' })
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <button type="button" onClick={() => setStep('slot')} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy hover:text-coral-dark">
          <ArrowLeft size={15} /> Changer de créneau
        </button>
        <p className="bg-peach p-3.5 text-[14px] font-semibold text-navy first-letter:uppercase">
          {longDate(day)} à {time.replace(':', ' h ')} · {mode === 'video' ? 'en vidéo' : 'sur place'}
        </p>
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Nom et prénom <span className="text-coral-dark">*</span>
          </label>
          <input {...register('name', rules.name)} {...field('name')} autoComplete="name" className="field" />
          <FieldError error={errors.name} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Adresse e-mail <span className="text-coral-dark">*</span>
          </label>
          <input {...register('email', rules.email)} {...field('email')} type="email" autoComplete="email" className="field" />
          <FieldError error={errors.email} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Téléphone <span className="text-coral-dark">*</span>
          </label>
          <input {...register('phone', rules.phone)} {...field('phone')} type="tel" autoComplete="tel" className="field" />
          <FieldError error={errors.phone} />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-relaxed text-ink-muted">
          <input type="checkbox" {...register('consent', rules.consent)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#0E2552]" />
          <span>J’accepte que Prestige Immobilier utilise mes coordonnées pour organiser cette visite.</span>
        </label>
        <FieldError error={errors.consent} />
        <FormError message={serverError} />
        <button type="submit" disabled={isSubmitting} className="btn-coral w-full">
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Réservation...
            </>
          ) : (
            'Confirmer la visite'
          )}
        </button>
      </form>
    )
  }

  const scrollDays = (dir) => strip.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="field-label !mb-0 capitalize">{day.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        <div className="flex gap-1">
          <button type="button" onClick={() => scrollDays(-1)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-navy hover:border-navy" aria-label="Jours précédents">
            <ChevronLeft size={15} />
          </button>
          <button type="button" onClick={() => scrollDays(1)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-navy hover:border-navy" aria-label="Jours suivants">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div ref={strip} role="radiogroup" aria-label="Jour de la visite" className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {days.map((d, i) => {
          const active = i === dayIndex
          const full = !getSlots(property.id, d).some((s) => s.available)
          return (
            <button
              key={toISODate(d)}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${longDate(d)}${full ? ', complet' : ''}`}
              disabled={full}
              onClick={() => {
                setDayIndex(i)
                setTime(null)
              }}
              className={`flex h-[66px] w-[54px] shrink-0 flex-col items-center justify-center rounded-[3px] border text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                active ? 'border-navy bg-navy text-white' : 'border-line text-navy hover:border-navy/40'
              }`}
            >
              <span className={`text-[11px] uppercase ${active ? 'text-white/70' : 'text-ink-muted'}`}>{weekday(d)}</span>
              <span className="font-display text-[18px] font-medium leading-tight">{d.getDate()}</span>
            </button>
          )
        })}
      </div>

      <p className="field-label mt-5">Créneaux disponibles</p>
      <div role="radiogroup" aria-label="Heure de la visite" className="grid grid-cols-4 gap-1.5">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            role="radio"
            aria-checked={time === slot.time}
            disabled={!slot.available}
            onClick={() => setTime(slot.time)}
            className={`min-h-[40px] rounded-[3px] border text-[13.5px] font-semibold transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-mist disabled:text-ink-muted/40 disabled:line-through ${
              time === slot.time ? 'border-coral bg-coral text-white' : 'border-line text-navy hover:border-coral'
            }`}
          >
            {slot.time.replace(':', 'h')}
          </button>
        ))}
      </div>

      <fieldset className="mt-5">
        <legend className="field-label">Type de visite</legend>
        <div className="grid grid-cols-2 gap-1.5">
          {modes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`flex min-h-[44px] items-center justify-center gap-2 rounded-[3px] border text-[13.5px] font-semibold transition-colors ${
                mode === value ? 'border-navy bg-navy text-white' : 'border-line text-navy hover:border-navy/40'
              }`}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" disabled={!time} onClick={() => setStep('details')} className="btn-coral mt-6 w-full">
        {time ? `Continuer : ${weekday(day)} ${day.getDate()} à ${time.replace(':', 'h')}` : 'Choisissez un créneau'}
      </button>
      <p className="mt-3 text-center text-[12px] text-ink-muted">
        Visite de {VISIT_DURATION} minutes avec {advisor.name}. Gratuit et sans engagement.
      </p>
    </div>
  )
}
