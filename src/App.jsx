import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Features from './components/Features'
import Offerings from './components/Offerings'
import HowItWorks from './components/HowItWorks'
import Requirements from './components/Requirements'
import DetailedCalculator from './components/DetailedCalculator'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <Offerings />
      <HowItWorks />
      <Requirements />
      <DetailedCalculator />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
