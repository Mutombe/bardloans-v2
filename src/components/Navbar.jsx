import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, House, Info, Briefcase, Path, Question, Calculator, WhatsappLogo, EnvelopeSimple, Phone } from '@phosphor-icons/react'

const navLinks = [
  { name: 'Home', href: '#home', icon: House },
  { name: 'About Us', href: '#about', icon: Info },
  { name: 'Offerings', href: '#offerings', icon: Briefcase },
  { name: 'How it Works', href: '#how-it-works', icon: Path },
  { name: 'FAQ', href: '#faq', icon: Question },
  { name: 'Loan Calculator', href: '#calculator', icon: Calculator },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${scrolled ? 'shadow-lg shadow-navy/5' : 'shadow-md shadow-black/5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <motion.a href="#home" className="flex-shrink-0" whileHover={{ scale: 1.02 }}>
              <img src="/logo.png" alt="Bard Loans" className="h-8 lg:h-10 w-auto" loading="eager" />
            </motion.a>
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.filter(l => l.name !== 'Loan Calculator').map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-semibold transition-colors duration-300 uppercase tracking-wide text-navy/70 hover:text-primary">
                  {link.name}
                </a>
              ))}
              <a href="#calculator" className="px-6 py-2.5 rounded-full text-sm font-extrabold uppercase tracking-wide bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                Apply Now
              </a>
            </div>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 cursor-pointer text-navy">
              <List size={26} weight="bold" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-navy-dark flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <img src="/logo.png" alt="Bard Loans" className="h-7 w-auto brightness-0 invert" loading="eager" />
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white cursor-pointer">
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.05 } }}
                        className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group"
                      >
                        <Icon size={20} weight="bold" className="text-white/30 group-hover:text-primary transition-colors" />
                        <span className="text-[15px] font-semibold uppercase tracking-wide">{link.name}</span>
                      </motion.a>
                    )
                  })}
                </div>
              </div>
              <div className="px-4 pb-6 space-y-3 border-t border-white/[0.06] pt-5">
                <a href="#calculator" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-full font-extrabold text-sm uppercase tracking-wide">
                  Apply Now
                </a>
                <div className="flex gap-2">
                  <a href="https://wa.me/27676151569" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366]/15 text-[#25D366] py-3 rounded-full text-xs font-bold">
                    <WhatsappLogo size={16} weight="fill" /> WhatsApp
                  </a>
                  <a href="mailto:apply@bardloans.co.za" className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.06] text-white/50 py-3 rounded-full text-xs font-bold">
                    <EnvelopeSimple size={16} weight="bold" /> Email
                  </a>
                </div>
                <a href="tel:0676151569" className="flex items-center justify-center gap-2 text-white/25 text-xs">
                  <Phone size={12} weight="bold" /> 067 615 1569
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
