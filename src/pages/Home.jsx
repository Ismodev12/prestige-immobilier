import Hero from '../components/Hero'
import PropertySection from '../components/PropertySection'
import AboutSection from '../components/AboutSection'
import NeighborhoodSection from '../components/NeighborhoodSection'
import Testimonials from '../components/Testimonials'
import EstimateSection from '../components/EstimateSection'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo({
    title: '',
    description:
      "Prestige Immobilier vous accompagne pour acheter, vendre, louer ou investir : biens d'exception, estimation gratuite et conseil personnalisé depuis plus de 15 ans.",
  })
  return (
    <>
      <Hero />
      <PropertySection />
      <AboutSection />
      <NeighborhoodSection />
      <Testimonials />
      <EstimateSection />
    </>
  )
}
