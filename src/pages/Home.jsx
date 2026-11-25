import Hero from '../components/Hero'
import IntroBand from '../components/IntroBand'
import PropertySection from '../components/PropertySection'
import ServicesSection from '../components/ServicesSection'
import VideoSection from '../components/VideoSection'
import TeamSection from '../components/TeamSection'
import CommunitiesSection from '../components/CommunitiesSection'
import TestimonialSection from '../components/TestimonialSection'
import NewsSection from '../components/NewsSection'
import ContactSection from '../components/ContactSection'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo({
    title: '',
    description:
      "Prestige Immobilier vous accompagne pour acheter, vendre, louer ou investir à Paris et sur la Côte d'Azur : biens d'exception, estimation gratuite et conseil personnalisé.",
  })
  return (
    <>
      <Hero />
      <IntroBand />
      <PropertySection />
      <ServicesSection />
      <VideoSection />
      <TeamSection />
      <CommunitiesSection />
      <TestimonialSection />
      <NewsSection />
      <ContactSection />
    </>
  )
}
