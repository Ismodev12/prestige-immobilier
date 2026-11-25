# Prestige Immobilier

Site vitrine d'agence immobilière haut de gamme : React 18, Vite 5, Tailwind CSS 3, React Router, Framer Motion,
React Hook Form et Lucide.

## Versions

| Branche | Charte |
| --- | --- |
| `master` | v2 : bleu marine, corail et fond pêche, conseillère mise en avant en page d'accueil |
| `v1-bleu-or` | v1 : bleu marine et or, hero photo pleine largeur (conservée comme démo) |

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # version de production dans dist/
```

## Organisation

```
src/
  components/   sections de l'accueil, cartes, formulaires, header, footer
  components/ui composants génériques (titres, logo, favoris, en-têtes de page)
  pages/        une page par route (Acheter, Louer, Vendre, fiche bien, Agence, Blog...)
  data/         contenus modifiables : agence, conseillère, biens, quartiers, équipe, articles, FAQ
  hooks/        favoris (localStorage) et SEO (titre, description, canonical)
  utils/        formatage, filtres de recherche, envoi des formulaires
scripts/        optimisation des photos et génération du logo
```

## Outils pour les visiteurs

- **Coût réel** (fiche de chaque bien à vendre) : mensualité du crédit, assurance, taxe foncière, charges et énergie
  estimée d'après le DPE, avec apport, durée et taux réglables. Calculs dans `src/utils/finance.js`.
- **Simulateur de budget** (`/simulateur`) : budget d'achat maximal selon revenus, crédits en cours et apport
  (taux d'endettement de 35 %), puis lien vers les biens accessibles. Les réglages sont partagés avec les fiches et
  le comparateur (stockage local du navigateur).
- **Comparateur** (`/comparer`) : jusqu'à 3 biens côte à côte, meilleure valeur mise en évidence, barre flottante de
  sélection sur toutes les pages.
- **Réservation de visite** (fiche bien) : choix du jour, du créneau et du mode (sur place ou vidéo), confirmation
  et fichier agenda `.ics` avec rappel. **Limite** : les disponibilités sont simulées dans `src/utils/agenda.js` ;
  à remplacer par l'agenda réel de l'agence (API Google Agenda, Calendly ou logiciel métier).

## Formulaires (limite actuelle)

Aucun backend n'est fourni. Sans configuration, les formulaires de contact, de visite et d'estimation affichent
clairement un **mode démonstration** : rien n'est transmis. Pour activer l'envoi réel, créer un fichier `.env` :

```
VITE_API_URL=https://api.exemple.fr
```

Les demandes sont alors envoyées en `POST` JSON vers `${VITE_API_URL}/leads` (voir `src/utils/api.js`).

## Photos

Photos Unsplash (licence Unsplash, usage commercial autorisé), converties en WebP dans `public/images`.
La liste figure dans `scripts/images.manifest.js` ; `npm run images` les télécharge et les reconvertit.
Le portrait du hero (`agent-hero.webp`) est un recadrage 900 x 1100 du portrait `team-1`.

## Contenus de démonstration

Biens, conseillers, témoignages et chiffres clés sont fictifs. Les témoignages sont signalés comme exemples sur le
site ; les mentions légales contiennent des champs « à compléter » (SIREN, carte professionnelle, hébergeur).
