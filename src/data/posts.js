// Articles du blog, rédigés selon la méthode AIDA :
//   Attention : une accroche chiffrée ou une situation concrète qui interpelle le lecteur.
//   Intérêt   : le contexte et les règles à connaître, expliqués simplement.
//   Désir     : une méthode pas à pas, des exemples chiffrés et des astuces qui donnent envie d'agir.
//   Action    : un appel à l'action clair, relié à un service de l'agence.
//
// Blocs disponibles : p (paragraphe), h2 (intertitre), ul (liste), tip (encadré conseil), cta (appel à l'action).
// Les montants sont des exemples pédagogiques : les taux et barèmes doivent être vérifiés au moment de la lecture.

const countWords = (body) =>
  body
    .map((b) => [b.text, b.title, ...(b.items ?? [])].filter(Boolean).join(' '))
    .join(' ')
    .split(/\s+/).length

const withReadingTime = (post) => ({ ...post, readingTime: Math.max(3, Math.round(countWords(post.body) / 220)) })

export const posts = [
  {
    slug: 'dpe-loi-climat-ce-qui-change',
    title: 'DPE : ce que la loi Climat change pour votre bien, et comment en tirer parti',
    category: 'Réglementation',
    date: '2026-11-20',
    image: '/images/blog-tendances.webp',
    alt: 'Maison contemporaine éclairée à la tombée de la nuit',
    excerpt:
      'Interdictions de louer, audit énergétique, nouvelle règle de calcul : le calendrier à connaître et les travaux qui font vraiment gagner des classes.',
    body: [
      // Attention
      {
        type: 'p',
        text: 'Deux appartements identiques, dans la même rue, au même étage. L’un est classé C, l’autre G. Le premier se loue sans difficulté et se vend au prix du marché. Le second ne peut plus être proposé à un nouveau locataire depuis le 1er janvier 2025, et les acquéreurs négocient son prix en intégrant le coût des travaux. Une seule lettre sur un diagnostic suffit désormais à changer la valeur d’un bien.',
      },
      // Intérêt
      { type: 'h2', text: 'Le DPE, en deux minutes' },
      {
        type: 'p',
        text: 'Le diagnostic de performance énergétique classe un logement de A (très performant) à G (passoire thermique) selon deux critères : sa consommation d’énergie et ses émissions de gaz à effet de serre. C’est la plus mauvaise des deux notes qui détermine la classe finale. Le DPE est valable dix ans et doit figurer dans toute annonce de vente ou de location.',
      },
      {
        type: 'p',
        text: 'Depuis la réforme de 2021, il est « opposable » : un acquéreur ou un locataire peut se retourner contre le vendeur ou le bailleur si le diagnostic est erroné. Il n’est donc plus une simple formalité, mais une information engageante.',
      },
      { type: 'h2', text: 'Le calendrier de la loi Climat et résilience' },
      {
        type: 'ul',
        items: [
          'Depuis le 24 août 2022 : les loyers des logements classés F et G ne peuvent plus être augmentés, ni en cours de bail, ni lors d’une relocation.',
          'Depuis le 1er janvier 2025 : les logements classés G ne peuvent plus faire l’objet d’un nouveau bail ou d’un renouvellement.',
          'À partir du 1er janvier 2028 : la même interdiction s’appliquera aux logements classés F.',
          'À partir du 1er janvier 2034 : elle s’étendra aux logements classés E.',
        ],
      },
      {
        type: 'p',
        text: 'Côté vente, un audit énergétique est obligatoire pour les maisons et les immeubles en monopropriété classés F ou G depuis 2023, et classés E depuis 2025. Il présente des scénarios de travaux chiffrés pour atteindre une meilleure classe. Il ne s’applique pas aux appartements en copropriété.',
      },
      {
        type: 'tip',
        title: 'Une bonne nouvelle pour les logements chauffés à l’électricité',
        text: 'Depuis le 1er janvier 2026, le coefficient qui convertit l’électricité consommée en énergie primaire est passé de 2,3 à 1,9. Résultat : de nombreux logements chauffés à l’électricité gagnent mécaniquement une classe, sans aucun travaux. Si votre DPE date d’avant 2026 et que vous vous chauffez à l’électricité, un nouveau diagnostic peut valoir la peine.',
      },
      // Désir
      { type: 'h2', text: 'Gagner des classes : par où commencer ?' },
      {
        type: 'p',
        text: 'Dans une maison mal isolée, la chaleur s’échappe d’abord par le haut. Selon les estimations de l’ADEME, les pertes se répartissent ainsi :',
      },
      {
        type: 'ul',
        items: [
          'Toiture et combles : 25 à 30 % des pertes de chaleur.',
          'Murs : 20 à 25 %.',
          'Renouvellement de l’air et ponts thermiques : 20 à 25 %.',
          'Fenêtres : 10 à 15 %.',
          'Planchers bas : 7 à 10 %.',
        ],
      },
      {
        type: 'p',
        text: 'La règle d’or est simple : isoler avant de changer de chauffage. Installer une pompe à chaleur dans une maison qui fuit revient à chauffer la rue avec un équipement plus cher. L’ordre le plus efficace est généralement le suivant : combles et toiture, ventilation, murs, menuiseries, puis système de chauffage dimensionné pour un logement devenu sobre.',
      },
      {
        type: 'p',
        text: 'En appartement, les leviers sont souvent collectifs (isolation des façades, chaudière commune) et se décident en assemblée générale. Consultez le plan pluriannuel de travaux de la copropriété : il indique ce qui est prévu et à quelle échéance.',
      },
      {
        type: 'tip',
        title: 'Avant d’engager des travaux',
        text: 'Demandez au diagnostiqueur le détail des postes qui pénalisent votre note : un DPE indique toujours les recommandations prioritaires. Renseignez-vous aussi auprès de France Rénov’, le service public de la rénovation, sur les aides en vigueur (MaPrimeRénov’, éco-prêt à taux zéro, certificats d’économies d’énergie) : leurs conditions évoluent chaque année.',
      },
      { type: 'h2', text: 'Ce que cela change pour votre projet' },
      {
        type: 'p',
        text: 'Vous vendez ? Un bien bien classé se vend plus vite : mettez sa note en avant. Un bien mal classé se vend aussi, à condition d’en tenir compte dans le prix et de fournir aux acquéreurs une estimation crédible des travaux. Vous achetez ? Une passoire thermique peut être une opportunité, si la décote couvre réellement le coût de la rénovation.',
      },
      // Action
      {
        type: 'cta',
        title: 'Connaître la vraie valeur de votre bien, DPE compris',
        text: 'Nos experts intègrent la performance énergétique et le coût des travaux dans chaque estimation. Gratuit, sans engagement, avec un avis de valeur écrit.',
        label: 'Estimer mon bien',
        to: '/estimation',
      },
    ],
  },

  {
    slug: 'calculer-son-budget-achat-immobilier',
    title: 'Acheter un bien : calculer votre vrai budget en 5 étapes',
    category: 'Achat',
    date: '2026-11-12',
    image: '/images/blog-investir.webp',
    alt: 'Vue aérienne des immeubles haussmanniens de Paris',
    excerpt:
      'Capacité d’emprunt, apport, frais de notaire, garanties, travaux : la méthode complète, avec un exemple chiffré, pour savoir ce que vous pouvez vraiment acheter.',
    body: [
      // Attention
      {
        type: 'p',
        text: 'Vous avez repéré un appartement à 600 000 €. Vous pensez qu’il vous faut 600 000 € ? En réalité, la facture dépassera probablement 660 000 €. Frais de notaire, garantie du prêt, petits travaux : ce sont ces lignes oubliées qui font échouer des projets au dernier moment, parfois après la signature du compromis.',
      },
      // Intérêt
      {
        type: 'p',
        text: 'Les banques appliquent des règles strictes, fixées par le Haut Conseil de stabilité financière. Les connaître avant de visiter vous permet de cibler les bons biens, de négocier avec assurance et de présenter un dossier solide au vendeur.',
      },
      { type: 'h2', text: 'Étape 1 : estimer votre capacité d’emprunt' },
      {
        type: 'p',
        text: 'Deux règles encadrent les crédits immobiliers. Vos mensualités, assurance comprise, ne doivent pas dépasser 35 % de vos revenus nets. Et la durée du prêt est limitée à 25 ans (27 ans dans le neuf ou en cas de gros travaux). Les banques peuvent déroger à ces règles pour une partie de leurs dossiers, en priorité pour les résidences principales.',
      },
      {
        type: 'ul',
        items: [
          'Revenus nets du foyer : 7 000 € par mois.',
          'Mensualité maximale (35 %) : 2 450 €, dont environ 100 € d’assurance emprunteur.',
          'Mensualité disponible pour le crédit : 2 350 €.',
          'Sur 25 ans, avec un taux hypothétique de 3,5 %, cela correspond à un emprunt d’environ 470 000 €.',
        ],
      },
      { type: 'h2', text: 'Étape 2 : chiffrer les frais de notaire' },
      {
        type: 'p',
        text: 'Les « frais de notaire » sont surtout des taxes. Dans l’ancien, ils représentent environ 7 à 8 % du prix ; dans le neuf, 2 à 3 %. Ils comprennent les droits de mutation reversés au département et à la commune (la plus grosse part), les émoluments du notaire fixés par un barème national, et les frais de formalités.',
      },
      {
        type: 'p',
        text: 'Pour un bien ancien à 600 000 €, comptez environ 45 000 €. Attention : depuis 2025, la plupart des départements ont été autorisés à relever légèrement les droits de mutation, sauf pour les primo-accédants. Demandez une estimation précise au notaire dès vos premières visites.',
      },
      {
        type: 'tip',
        title: 'Deux moyens légaux de réduire la base taxée',
        text: 'Si les honoraires d’agence sont à la charge de l’acquéreur, ils ne sont pas soumis aux droits de mutation : seul le prix net vendeur est taxé. Si le bien est vendu avec des meubles (cuisine équipée amovible, électroménager, mobilier), leur valeur peut être déduite du prix taxable, à condition d’en dresser une liste estimée de façon réaliste et annexée à l’acte.',
      },
      { type: 'h2', text: 'Étape 3 : ajouter les frais annexes' },
      {
        type: 'ul',
        items: [
          'Garantie du prêt (caution ou hypothèque) : souvent autour de 1 % du montant emprunté.',
          'Frais de dossier bancaire : de quelques centaines à 1 500 € environ, négociables.',
          'Frais de courtage, si vous passez par un courtier.',
          'Déménagement et installation.',
          'Prorata de taxe foncière de l’année, remboursé au vendeur à la signature.',
        ],
      },
      { type: 'h2', text: 'Étape 4 : prévoir une réserve travaux' },
      {
        type: 'p',
        text: 'Même un bien « prêt à emménager » réserve des surprises : peinture, électricité à remettre aux normes, travaux votés en copropriété. Lisez les procès-verbaux d’assemblée générale des trois dernières années et le DPE, puis prévoyez une enveloppe. Un ordre de grandeur prudent : 2 à 5 % du prix pour un bien en bon état.',
      },
      // Désir
      { type: 'h2', text: 'Étape 5 : assembler le budget complet' },
      { type: 'p', text: 'Reprenons notre appartement ancien à 600 000 € :' },
      {
        type: 'ul',
        items: [
          'Prix du bien : 600 000 €.',
          'Frais de notaire (environ 7,5 %) : 45 000 €.',
          'Garantie et frais de dossier : 6 000 €.',
          'Réserve travaux : 15 000 €.',
          'Budget total : 666 000 €.',
          'Emprunt possible : 470 000 €. Apport nécessaire : 196 000 €.',
        ],
      },
      {
        type: 'p',
        text: 'Ce calcul change tout. Avec 196 000 € d’apport, l’achat est réaliste. Avec 120 000 €, il faut viser autour de 530 000 €, ou augmenter la durée du prêt dans la limite autorisée. Vous le savez avant de visiter, plutôt qu’après une offre refusée par la banque.',
      },
      {
        type: 'tip',
        title: 'Le réflexe qui rassure les vendeurs',
        text: 'Obtenez une attestation de financement de votre banque ou de votre courtier avant de faire une offre. Face à plusieurs acquéreurs, le vendeur choisit souvent le dossier le plus sûr, pas forcément le plus offrant.',
      },
      // Action
      {
        type: 'cta',
        title: 'Faites valider votre budget par un conseiller',
        text: 'En 30 minutes, nous reprenons votre plan de financement avec vous et nous vous présentons les biens qui correspondent vraiment à votre enveloppe.',
        label: 'Prendre rendez-vous',
        to: '/contact',
      },
    ],
  },

  {
    slug: 'choisir-son-quartier-methode',
    title: 'Choisir son quartier : la méthode en 7 critères pour ne pas se tromper',
    category: 'Quartiers',
    date: '2026-10-28',
    image: '/images/blog-quartiers.webp',
    alt: 'Terrasse d’un restaurant parisien en fin de journée',
    excerpt:
      'Prix réels, transports, nuisances, projets urbains, copropriété : comment vérifier un quartier avec des sources fiables avant de signer.',
    body: [
      // Attention
      {
        type: 'p',
        text: 'On peut refaire une cuisine, abattre une cloison, changer les fenêtres. On ne peut pas déplacer un appartement. L’emplacement est la seule caractéristique d’un bien qui ne se corrige jamais : il détermine à la fois votre qualité de vie et la valeur de revente.',
      },
      // Intérêt
      {
        type: 'p',
        text: 'Pourtant, beaucoup d’acquéreurs choisissent un quartier sur une impression, lors d’une visite un samedi ensoleillé. Voici la méthode que nous utilisons avec nos clients, avec les outils publics et gratuits qui permettent de vérifier chaque point.',
      },
      { type: 'h2', text: '1. Les prix réels, pas les prix affichés' },
      {
        type: 'p',
        text: 'Les annonces montrent des prix demandés, pas des prix de vente. Le service public DVF (Demandes de valeurs foncières), accessible gratuitement sur data.gouv.fr, recense les ventes réellement conclues, adresse par adresse, sur les dernières années. Comparez avec des biens de surface et d’étage proches : c’est la meilleure base pour négocier.',
      },
      { type: 'h2', text: '2. Les transports, testés aux bonnes heures' },
      {
        type: 'p',
        text: 'Faites le trajet domicile-travail un mardi à 8 h 15, pas un dimanche. Mesurez le temps de porte à porte, la marche jusqu’à la station, l’affluence. Un bien situé à moins de cinq minutes à pied d’une station de métro ou de RER reste l’un des critères les plus recherchés à la revente.',
      },
      { type: 'h2', text: '3. La vie quotidienne' },
      {
        type: 'ul',
        items: [
          'Commerces de proximité : boulangerie, marché, pharmacie, supermarché.',
          'Écoles : la carte scolaire, consultable auprès de la mairie, détermine l’établissement de secteur.',
          'Espaces verts, équipements sportifs, médecins.',
          'Stationnement : tarifs résidentiels et listes d’attente pour les places.',
        ],
      },
      { type: 'h2', text: '4. Les nuisances, vérifiées trois fois' },
      {
        type: 'p',
        text: 'Revenez à trois moments différents : un matin de semaine, un soir vers 22 h et un week-end. Un bar en rez-de-chaussée, une ligne de bus sous les fenêtres ou un marché bruyant ne se voient pas toujours lors d’une visite organisée. Consultez aussi Géorisques (georisques.gouv.fr) pour connaître les risques naturels et technologiques de l’adresse, et les cartes de bruit publiées par les grandes collectivités.',
      },
      { type: 'h2', text: '5. Les projets urbains à venir' },
      {
        type: 'p',
        text: 'Une future gare peut faire monter les prix ; un immeuble de huit étages devant vos fenêtres peut faire l’inverse. Le plan local d’urbanisme (PLU), consultable en mairie ou sur le Géoportail de l’urbanisme, indique ce qui peut être construit autour du bien. Regardez aussi les panneaux de permis de construire affichés dans la rue.',
      },
      { type: 'h2', text: '6. L’immeuble et la copropriété' },
      {
        type: 'ul',
        items: [
          'Les procès-verbaux des trois dernières assemblées générales : travaux votés, litiges, impayés.',
          'Le plan pluriannuel de travaux, désormais obligatoire dans la plupart des copropriétés de plus de quinze ans.',
          'Le montant des charges et du fonds de travaux.',
          'L’état des parties communes : hall, cage d’escalier, toiture, façade.',
        ],
      },
      { type: 'h2', text: '7. Le potentiel de valorisation' },
      {
        type: 'p',
        text: 'Les signaux d’un quartier qui progresse sont souvent visibles avant les prix : nouveaux commerces indépendants, rénovations de façades, arrivée de jeunes familles, projets de transport. À l’inverse, des vitrines vides qui se multiplient doivent vous alerter.',
      },
      // Désir
      {
        type: 'tip',
        title: 'Notre grille de décision',
        text: 'Attribuez une note sur 5 à chaque critère, puis pondérez selon vos priorités (par exemple, les écoles comptent double pour une famille). Comparez deux ou trois quartiers sur cette grille : la décision devient objective, et vous savez exactement sur quoi vous pouvez faire des compromis.',
      },
      {
        type: 'p',
        text: 'Avec cette méthode, vous ne visitez plus au hasard : vous savez ce que vous cherchez, vous repérez plus vite les bonnes affaires et vous évitez les biens dont les défauts se paieraient à la revente.',
      },
      // Action
      {
        type: 'cta',
        title: 'Confiez-nous vos critères',
        text: 'Nos conseillers connaissent chaque rue de leurs quartiers. Dites-nous ce qui compte pour vous : nous vous présentons les adresses qui y répondent, y compris des biens vendus hors annonces.',
        label: 'Lancer ma recherche',
        to: '/contact',
      },
    ],
  },

  {
    slug: 'vendre-au-meilleur-prix-guide',
    title: 'Vendre au meilleur prix : le guide complet en 6 étapes',
    category: 'Vente',
    date: '2026-10-09',
    image: '/images/blog-vendre.webp',
    alt: 'La tour Eiffel vue depuis le Trocadéro au coucher du soleil',
    excerpt:
      'Estimation, diagnostics, mise en valeur, stratégie de prix, choix de l’acquéreur et fiscalité : tout ce qui fait la différence entre une vente rapide et une vente qui s’enlise.',
    body: [
      // Attention
      {
        type: 'p',
        text: 'Les trois premières semaines de mise en vente décident souvent du prix final. C’est la période où votre annonce est nouvelle, où les acquéreurs actifs la découvrent et où les visites sont les plus nombreuses. Un bien surévalué à ce moment-là est vu, comparé, puis écarté. Quelques semaines plus tard, il faut baisser le prix, et les acheteurs se demandent ce qui cloche.',
      },
      // Intérêt
      {
        type: 'p',
        text: 'Vendre au meilleur prix ne consiste donc pas à afficher le prix le plus élevé, mais le prix juste, avec un bien et un dossier irréprochables. Voici les six étapes que nous suivons pour chaque mandat.',
      },
      { type: 'h2', text: 'Étape 1 : estimer à partir des ventes réelles' },
      {
        type: 'p',
        text: 'Les annonces concurrentes indiquent ce que les vendeurs espèrent, pas ce que les acquéreurs paient. Appuyez-vous sur les ventes conclues dans votre rue et votre immeuble (données publiques DVF sur data.gouv.fr), puis ajustez selon l’étage, l’exposition, l’état, l’extérieur et la performance énergétique. Un avis de valeur écrit, argumenté avec des comparables, vous servira ensuite à défendre votre prix face aux négociations.',
      },
      { type: 'h2', text: 'Étape 2 : préparer un dossier complet' },
      { type: 'p', text: 'Le dossier de diagnostic technique doit être prêt dès la promesse de vente. Selon le bien, il comprend :' },
      {
        type: 'ul',
        items: [
          'Le diagnostic de performance énergétique (DPE), et l’audit énergétique pour une maison classée E, F ou G.',
          'L’état des risques et pollutions, de moins de six mois.',
          'Le diagnostic amiante si le permis de construire date d’avant le 1er juillet 1997.',
          'Le constat de risque d’exposition au plomb si le bien a été construit avant 1949.',
          'Les diagnostics électricité et gaz si les installations ont plus de quinze ans.',
          'Le mesurage loi Carrez pour un lot de copropriété, et l’état termites dans les zones concernées.',
        ],
      },
      {
        type: 'p',
        text: 'Pour un appartement, rassemblez aussi le règlement de copropriété, les trois derniers procès-verbaux d’assemblée générale, le carnet d’entretien et les derniers appels de charges. Un dossier complet rassure l’acquéreur et évite des semaines de retard entre l’offre et le compromis.',
      },
      // Désir
      { type: 'h2', text: 'Étape 3 : mettre le bien en valeur' },
      {
        type: 'ul',
        items: [
          'Désencombrer : retirer un meuble par pièce agrandit visuellement l’espace.',
          'Réparer les petits défauts : poignées, joints, ampoules, traces sur les murs.',
          'Neutraliser : un mur coloré repeint en blanc cassé plaît au plus grand nombre.',
          'Faire entrer la lumière : rideaux ouverts, lampes allumées, vitres propres.',
          'Confier les photos à un professionnel : elles déclenchent ou non la visite.',
        ],
      },
      {
        type: 'tip',
        title: 'Le seuil psychologique',
        text: 'Les acquéreurs filtrent leurs recherches par tranches de prix rondes. Un bien affiché 505 000 € n’apparaît pas pour ceux qui ont fixé un maximum à 500 000 €. Positionner son prix juste sous un seuil élargit fortement le nombre de personnes qui verront l’annonce.',
      },
      { type: 'h2', text: 'Étape 4 : choisir la bonne offre, pas seulement la plus haute' },
      {
        type: 'p',
        text: 'Demandez une offre écrite, avec le montant de l’apport et une attestation de financement. Une offre légèrement inférieure mais financée sans condition de prêt, ou avec un apport important, est souvent plus sûre qu’une offre élevée qui dépend d’un crédit incertain.',
      },
      { type: 'h2', text: 'Étape 5 : sécuriser la vente jusqu’à l’acte' },
      {
        type: 'p',
        text: 'Après la signature du compromis, l’acquéreur dispose d’un délai de rétractation de dix jours. Si l’achat est financé par un crédit, une condition suspensive d’obtention de prêt s’applique, d’une durée minimale d’un mois et généralement de 45 à 60 jours. Comptez en moyenne trois mois entre le compromis et l’acte authentique chez le notaire.',
      },
      { type: 'h2', text: 'Étape 6 : anticiper la fiscalité' },
      {
        type: 'p',
        text: 'La vente de votre résidence principale est exonérée d’impôt sur la plus-value. Pour une résidence secondaire ou un bien locatif, la plus-value est imposée à 19 % au titre de l’impôt sur le revenu, plus les prélèvements sociaux, après des abattements progressifs : elle est totalement exonérée d’impôt sur le revenu après 22 ans de détention, et de prélèvements sociaux après 30 ans. Le notaire calcule et prélève l’impôt directement lors de la vente.',
      },
      {
        type: 'p',
        text: 'Bien préparée, une vente se déroule sans mauvaise surprise : le bon prix dès le départ, des visites qualifiées, un acquéreur solide et un calendrier maîtrisé.',
      },
      // Action
      {
        type: 'cta',
        title: 'Commencez par une estimation juste',
        text: 'Un expert visite votre bien, l’analyse au regard des ventes récentes du secteur et vous remet un avis de valeur écrit sous 48 heures. Gratuit et sans engagement.',
        label: 'Estimer mon bien',
        to: '/estimation',
      },
    ],
  },
].map(withReadingTime)
