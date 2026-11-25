// Agenda des visites.
//
// LIMITE ACTUELLE : sans serveur, les disponibilités sont simulées. Chaque créneau est déclaré libre ou
// occupé de façon stable (même bien, même jour, même résultat), et les réservations faites dans ce
// navigateur sont mémorisées pour ne pas être proposées deux fois. Pour un agenda réel, remplacer
// `getSlots` par un appel à l'API de l'agence (Google Agenda, Calendly, logiciel métier) et envoyer la
// réservation via `submitLead('visite', ...)`, déjà branché sur VITE_API_URL.

const KEY = 'pi-bookings'

const WEEKDAY_SLOTS = ['09:30', '10:30', '11:30', '14:00', '15:00', '16:00', '17:00', '18:00']
const SATURDAY_SLOTS = ['10:00', '11:00', '12:00', '14:30', '15:30']
export const VISIT_DURATION = 45 // minutes

export const toISODate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Les prochains jours ouverts à la visite (le dimanche est fermé). */
export function getDays(count = 12, from = new Date()) {
  const days = []
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  while (days.length < count) {
    if (d.getDay() !== 0) days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

const readBookings = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...readBookings(), booking].slice(-30)))
  } catch {
    // Stockage indisponible : sans incidence sur la confirmation.
  }
}

// Hachage simple et stable pour simuler un taux d'occupation d'environ 35 %.
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

/** Créneaux d'une journée pour un bien, avec leur disponibilité. */
export function getSlots(propertyId, date, now = new Date()) {
  const iso = toISODate(date)
  const base = date.getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS
  const booked = readBookings().filter((b) => b.propertyId === propertyId && b.date === iso).map((b) => b.time)
  const minStart = new Date(now.getTime() + 2 * 60 * 60 * 1000) // réservation au plus tard 2 h avant
  return base.map((time) => {
    const [h, m] = time.split(':').map(Number)
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m)
    const taken = hash(`${propertyId}-${iso}-${time}`) % 100 < 35
    return { time, available: start > minStart && !taken && !booked.includes(time) }
  })
}

const icsDate = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`

const escapeIcs = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

/** Génère un fichier .ics (iCalendar) téléchargeable pour ajouter la visite à son agenda. */
export function buildIcsUrl({ title, start, durationMinutes = VISIT_DURATION, location, description }) {
  const end = new Date(start.getTime() + durationMinutes * 60000)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Prestige Immobilier//Visites//FR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@prestige-immobilier.fr`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART;TZID=Europe/Paris:${icsDate(start)}`,
    `DTEND;TZID=Europe/Paris:${icsDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }))
}
