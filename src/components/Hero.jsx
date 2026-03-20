import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightning, CheckCircle, Clock, Wallet, CaretLeft, CaretRight } from '@phosphor-icons/react'
import LoanCalculator from './LoanCalculator'

const slides = [
  { src: '/HERO.png', alt: 'Happy woman with cash from Bard Loans' },
  { src: '/HERO2.png', alt: 'Happy man with cash from Bard Loans' },
]

const badges = [
  { icon: Wallet, label: 'Low interest', desc: '5% per month', href: '#calculator' },
  { icon: Clock, label: '3 months max', desc: 'to repay', href: '#how-it-works' },
  { icon: CheckCircle, label: 'Monthly repayments', desc: 'easy & flexible', href: '#offerings' },
]

/* Artistic hand-drawn SVG brush stroke underline */
function BrushUnderline() {
  return (
    <motion.svg
      viewBox="0 0 200 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-auto"
      aria-hidden="true"
    >
      <motion.path
        d="M3 11C20 5 40 3 60 6C80 9 95 13 120 10C140 7 160 4 197 8"
        stroke="#14B8A6"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
      />
      <motion.path
        d="M8 14C30 10 55 8 85 11C110 13 145 9 192 12"
        stroke="#E8891D"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-warm">
      {/* Background carousel images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover object-top"
              loading={current === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 via-40% to-navy-dark/10 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent via-25% to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/30 via-navy-dark/60 via-55% to-navy-dark/95 lg:hidden" />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-3xl pointer-events-none hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full pt-28 pb-32 lg:pt-0 lg:pb-0">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            {/* Left text */}
            <div className="lg:col-span-5">
              <motion.a
                href="#calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-mint/15 backdrop-blur-sm border border-mint/20 rounded-full px-3.5 py-1.5 mb-5 hover:bg-mint/25 transition-colors cursor-pointer"
              >
                <Lightning size={14} weight="fill" className="text-mint-light" />
                <span className="text-mint-light text-[11px] font-semibold tracking-wide uppercase">Same-Day Approval</span>
              </motion.a>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-4 tracking-tight"
              >
                Need Cash{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">FAST?</span>
                  <BrushUnderline />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-white/80 font-medium mb-2.5 leading-relaxed"
              >
                Fast, Easy Loans.
                <br />
                Same-Day Approval.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/35 text-xs sm:text-sm mb-6 max-w-sm leading-relaxed"
              >
                From R500 to R5,000 — transparent fees, flexible repayment up to 3 months. Empowering your financial future.
              </motion.p>

              {/* Feature Badges — clickable */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {badges.map((badge, i) => (
                  <motion.a
                    key={badge.label}
                    href={badge.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                    className="flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.07] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-white/[0.1] hover:border-white/[0.12] transition-all cursor-pointer"
                  >
                    <badge.icon size={14} weight="bold" className="text-mint flex-shrink-0" />
                    <div>
                      <span className="text-white font-semibold text-[11px] block leading-tight">{badge.label}</span>
                      <span className="text-white/30 text-[9px] hidden sm:block">{badge.desc}</span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Carousel controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 mt-8"
              >
                <button onClick={prev} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all cursor-pointer">
                  <CaretLeft size={14} weight="bold" />
                </button>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-7 bg-mint' : 'w-2.5 bg-white/15 hover:bg-white/25'}`} />
                  ))}
                </div>
                <button onClick={next} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all cursor-pointer">
                  <CaretRight size={14} weight="bold" />
                </button>
              </motion.div>
            </div>

            <div className="hidden lg:block lg:col-span-3" />

            {/* Calculator */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <LoanCalculator compact />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 70L48 63C96 56 192 42 288 36.7C384 31 480 35 576 39C672 43 768 47 864 46.7C960 47 1056 42 1152 38C1248 34 1344 32 1392 31L1440 30V70H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
