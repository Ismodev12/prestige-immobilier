export const team = [
  { name: 'Élodie Laurent', role: 'Fondatrice et directrice', photo: '/images/team-1.webp', phone: '+33 1 84 80 12 30' },
  { name: 'Marc Delorme', role: 'Directeur des ventes', photo: '/images/team-2.webp', phone: '+33 1 84 80 12 31' },
  { name: 'Aïssata Diallo', role: 'Responsable location', photo: '/images/team-3.webp', phone: '+33 1 84 80 12 32' },
  { name: 'Julien Moreau', role: 'Expert en estimation', photo: '/images/team-4.webp', phone: '+33 1 84 80 12 33' },
]

// Conseiller référent attribué de façon stable à chaque bien (cartes, fiche et réservation de visite).
export const advisorFor = (property) => team[Number(property.id.replace(/\D/g, '')) % team.length]
