// Envoi des formulaires (contact, estimation, demande de visite).
//
// LIMITE ACTUELLE : le site est un frontend sans backend.
// Si la variable d'environnement VITE_API_URL est définie (fichier .env), les demandes sont envoyées
// en POST JSON vers `${VITE_API_URL}/leads`. Sinon, la demande est simplement conservée dans le
// navigateur (localStorage) et l'interface signale clairement qu'aucune donnée n'a été transmise.

const API_URL = import.meta.env.VITE_API_URL

export const isApiConnected = Boolean(API_URL)

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @param {'contact'|'estimation'|'visite'} type
 * @param {object} data valeurs du formulaire
 * @returns {Promise<{ ok: true, demo: boolean, reference: string }>}
 */
export async function submitLead(type, data) {
  const payload = { type, data, sentAt: new Date().toISOString(), page: window.location.pathname }

  if (API_URL) {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error("Le serveur n'a pas pu enregistrer votre demande.")
    const body = await response.json().catch(() => ({}))
    return { ok: true, demo: false, reference: body.reference ?? '' }
  }

  // Mode démonstration : aucune donnée ne quitte le navigateur.
  await wait(900)
  const reference = `PI-${Date.now().toString(36).toUpperCase().slice(-6)}`
  try {
    const stored = JSON.parse(localStorage.getItem('pi-leads') ?? '[]')
    stored.push({ ...payload, reference })
    localStorage.setItem('pi-leads', JSON.stringify(stored.slice(-20)))
  } catch {
    // Stockage indisponible (navigation privée) : sans incidence pour l'utilisateur.
  }
  return { ok: true, demo: true, reference }
}

// Règles de validation partagées par les formulaires (React Hook Form).
export const rules = {
  name: {
    required: 'Merci d’indiquer votre nom et prénom.',
    minLength: { value: 3, message: 'Votre nom semble incomplet.' },
  },
  email: {
    required: 'Merci d’indiquer votre adresse e-mail.',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Cette adresse e-mail n’est pas valide (exemple : nom@domaine.fr).' },
  },
  phone: {
    required: 'Merci d’indiquer un numéro de téléphone.',
    pattern: {
      value: /^(?:(?:\+|00)33\s?|0)[1-9](?:[\s.]?\d{2}){4}$/,
      message: 'Numéro invalide. Exemple : 06 12 34 56 78 ou +33 6 12 34 56 78.',
    },
  },
  consent: { required: 'Votre accord est nécessaire pour que nous puissions vous recontacter.' },
}
