import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Features from './components/Features'
import Offerings from './components/Offerings'
import HowItWorks from './components/HowItWorks'
import Requirements from './components/Requirements'
import DetailedCalculator from './components/DetailedCalculator'
import ApplicationForm from './components/ApplicationForm'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

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
      <ApplicationForm />
      <FAQ />
      <CTA />
      <Footer onPrivacy={() => setShowPrivacy(true)} onTerms={() => setShowTerms(true)} />
      <FloatingWhatsApp />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsConditions onClose={() => setShowTerms(false)} />}
    </div>
  )
}

export default App
