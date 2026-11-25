// Coordonnées et informations de l'agence. Modifier ici met à jour tout le site.
export const agency = {
  name: 'Prestige Immobilier',
  tagline: "L'immobilier d'exception, avec exigence",
  phone: '+33 1 84 80 12 34',
  phoneHref: 'tel:+33184801234',
  email: 'contact@prestige-immobilier.fr',
  address: { street: '12 avenue Victor Hugo', postalCode: '75016', city: 'Paris' },
  hours: [
    { days: 'Lundi au vendredi', time: '9 h 00 à 19 h 00' },
    { days: 'Samedi', time: '10 h 00 à 17 h 00' },
    { days: 'Dimanche', time: 'Sur rendez-vous' },
  ],
  coordinates: { lat: 48.8703, lng: 2.2858 },
  founded: 2010,
  // Liens à remplacer par les pages officielles de l'agence.
  socials: [
    { name: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { name: 'YouTube', href: 'https://www.youtube.com/' },
  ],
  // URL d'une vidéo de présentation (MP4 dans /public ou sur un CDN).
  // Laisser vide : la modale « Voir la vidéo » présente alors une visite en images des biens.
  videoUrl: '',
}

export const navigation = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Acheter',
    to: '/acheter',
    children: [
      { label: 'Tous nos biens à vendre', to: '/acheter' },
      { label: 'Villas', to: '/acheter?type=Villa' },
      { label: 'Maisons', to: '/acheter?type=Maison' },
      { label: 'Appartements', to: '/acheter?type=Appartement' },
    ],
  },
  {
    label: 'Louer',
    to: '/louer',
    children: [
      { label: 'Toutes nos locations', to: '/louer' },
      { label: 'Appartements', to: '/louer?type=Appartement' },
      { label: 'Maisons', to: '/louer?type=Maison' },
      { label: 'Villas', to: '/louer?type=Villa' },
    ],
  },
  {
    label: 'Vendre',
    to: '/vendre',
    children: [
      { label: 'Vendre avec Prestige', to: '/vendre' },
      { label: 'Estimer mon bien', to: '/estimation' },
      { label: 'Nos honoraires', to: '/vendre#honoraires' },
    ],
  },
  {
    label: 'Notre agence',
    to: '/agence',
    children: [
      { label: "L'agence", to: '/agence' },
      { label: "L'équipe", to: '/agence#equipe' },
      { label: 'Questions fréquentes', to: '/faq' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
