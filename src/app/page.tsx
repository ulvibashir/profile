import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import TechProfiles from '@/components/TechProfiles'
import PortfolioProjects from '@/components/PortfolioProjects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <TechProfiles />
      <PortfolioProjects />
      <Contact />
      <Footer />
    </main>
  )
}
