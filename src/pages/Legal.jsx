import PageHero from '../components/ui/PageHero'
import { agency } from '../data/agency'
import { useSeo } from '../hooks/useSeo'

// Textes juridiques à faire valider et compléter (SIREN, carte professionnelle, assureur) avant la mise en ligne.
const pages = {
  mentions: {
    title: 'Mentions légales',
    sections: [
      ['Éditeur du site', `${agency.name}, ${agency.address.street}, ${agency.address.postalCode} ${agency.address.city}. Téléphone : ${agency.phone}. E-mail : ${agency.email}. Numéro SIREN, carte professionnelle (CCI) et garantie financière : à compléter.`],
      ['Hébergement', "Nom, adresse et coordonnées de l'hébergeur : à compléter lors de la mise en production."],
      ['Propriété intellectuelle', "Les contenus du site (textes, logo, mise en page) sont la propriété de Prestige Immobilier. Les photographies proviennent d'Unsplash et sont utilisées conformément à la licence Unsplash."],
      ['Médiation', "Conformément au Code de la consommation, le client peut recourir gratuitement à un médiateur de la consommation. Coordonnées du médiateur : à compléter."],
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    sections: [
      ['Données collectées', 'Nous collectons uniquement les informations que vous saisissez dans nos formulaires (nom, coordonnées, caractéristiques de votre bien) afin de répondre à votre demande.'],
      ['Durée de conservation', 'Vos données sont conservées trois ans à compter du dernier contact, puis supprimées.'],
      ['Vos droits', `Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour l'exercer, écrivez à ${agency.email}. Vous pouvez également saisir la CNIL.`],
      ['Favoris', 'Vos biens favoris sont enregistrés uniquement dans votre navigateur et ne nous sont pas transmis.'],
    ],
  },
  cookies: {
    title: 'Cookies',
    sections: [
      ['Cookies utilisés', "Ce site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. Seul le stockage local du navigateur est utilisé pour mémoriser vos favoris."],
      ['Contenus tiers', "Les cartes intégrées sont fournies par OpenStreetMap, qui peut déposer ses propres cookies techniques lors de l'affichage."],
    ],
  },
}

export default function Legal({ page }) {
  const content = pages[page]
  useSeo({ title: content.title, description: `${content.title} du site Prestige Immobilier.` })
  return (
    <>
      <PageHero compact title={content.title} breadcrumbs={[{ label: content.title }]} />
      <div className="container-site prose-estate max-w-[820px] py-12 sm:py-16">
        {content.sections.map(([heading, text]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </>
  )
}
