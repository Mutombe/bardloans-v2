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

const sidebarVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const linkVariants = {
  closed: { opacity: 0, x: 30 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when sidebar is open
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-navy/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <motion.a href="#home" className="flex items-center gap-3 flex-shrink-0" whileHover={{ scale: 1.02 }}>
              <img src="/logo.png" alt="Bard Loans" className={`h-8 lg:h-10 w-auto transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`} />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.filter(l => l.name !== 'Loan Calculator').map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-medium transition-colors duration-300 relative group ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'}`}
                  whileHover={{ y: -1 }}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-primary' : 'bg-mint'}`} />
                </motion.a>
              ))}
              <motion.a
                href="#calculator"
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-500 ${
                  scrolled
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark'
                    : 'bg-white text-navy shadow-lg shadow-black/15 hover:bg-white/90'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                APPLY NOW
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 cursor-pointer transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
            >
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar panel */}
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-navy-dark flex flex-col lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <img src="/logo.png" alt="Bard Loans" className="h-7 w-auto brightness-0 invert" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className="text-white/20 text-[10px] font-semibold tracking-widest uppercase px-2 mb-3">Menu</p>
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] group-hover:bg-mint/15 flex items-center justify-center transition-colors">
                          <Icon size={18} weight="duotone" className="text-white/30 group-hover:text-mint transition-colors" />
                        </div>
                        <span className="text-sm font-medium">{link.name}</span>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Bottom CTA + contact */}
              <div className="px-4 pb-6 space-y-3 border-t border-white/[0.06] pt-5">
                <a
                  href="#calculator"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  APPLY NOW
                </a>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/27676151569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366]/15 text-[#25D366] py-2.5 rounded-xl text-xs font-bold transition-colors hover:bg-[#25D366]/25"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:apply@bardloans.co.za"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.06] text-white/50 py-2.5 rounded-xl text-xs font-bold transition-colors hover:bg-white/[0.1] hover:text-white/70"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                    Email
                  </a>
                </div>
                <a
                  href="tel:0676151569"
                  className="flex items-center justify-center gap-2 text-white/25 text-[11px] hover:text-white/40 transition-colors"
                >
                  <Phone size={12} weight="bold" />
                  067 615 1569
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
