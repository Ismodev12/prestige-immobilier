import { Phone } from 'lucide-react'
import { team } from '../data/team'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function TeamSection({ id }) {
  return (
    <section id={id} aria-labelledby="equipe-titre" className="relative scroll-mt-24 py-20 sm:py-24">
      <span className="deco-square left-0 top-16 hidden md:block" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="equipe-titre"
          eyebrow="Notre équipe"
          title={
            <>
              Des conseillers passionnés,
              <br className="hidden sm:block" /> experts de leur marché
            </>
          }
        />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-7">
          {team.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 0.08} className="group">
              <div className="overflow-hidden bg-peach">
                <img
                  src={member.photo}
                  alt={`Portrait de ${member.name}, ${member.role}`}
                  loading="lazy"
                  width="720"
                  height="900"
                  className="aspect-[4/4.6] w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-[16px] font-medium">{member.name}</h3>
              <p className="text-[13px] text-ink-muted">{member.role}</p>
              <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy hover:text-coral-dark">
                <Phone size={13} className="text-coral" aria-hidden="true" />
                {member.phone}
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
