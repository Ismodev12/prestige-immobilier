import Reveal from './ui/Reveal'

/** Bandeau bleu marine qui chevauche le bas du hero : promesse de l'agence en deux colonnes. */
export default function IntroBand() {
  return (
    <div className="relative z-10 bg-white">
      <div className="container-site -translate-y-10 lg:-translate-y-16">
        <Reveal className="grid gap-8 bg-navy px-7 py-10 text-white shadow-lift sm:px-12 sm:py-12 md:grid-cols-2 md:gap-14">
          <div className="space-y-5">
            <p className="font-display text-[20px] font-light leading-snug sm:text-[23px]">
              Partons ensemble à la recherche de votre futur chez-vous.
            </p>
            <p className="font-display text-[20px] font-light leading-snug text-coral-light sm:text-[23px]">
              Paris, Côte d’Azur, Pays basque : nous connaissons chaque rue.
            </p>
          </div>
          <div className="space-y-4 border-white/15 text-[14.5px] leading-relaxed text-white/75 md:border-l md:pl-14">
            <p>
              Un projet immobilier est d’abord un projet de vie. Nous prenons le temps de comprendre vos envies, votre budget et vos
              contraintes avant de vous présenter le moindre bien.
            </p>
            <p>Visites ciblées, conseils francs, négociation et suivi jusqu’au notaire : un seul interlocuteur, du début à la fin.</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
