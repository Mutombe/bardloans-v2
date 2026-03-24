import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightning, CaretLeft, CaretRight } from '@phosphor-icons/react'
import LoanCalculator from './LoanCalculator'

const slides = [
  { src: '/orange girl .jpg.jpeg', alt: 'Woman holding South African Rands', bg: '#E8891D' },
  { src: '/Orange fam .jpg.jpeg', alt: 'Happy family empowered by Bard Loans', bg: '#E8891D' },
]

function ScatteredTriangles() {
  const triangles = [
    { x: '8%', y: '12%', size: 18, rotate: 15, opacity: 0.15, color: '#E8891D', delay: 0 },
    { x: '15%', y: '75%', size: 12, rotate: -30, opacity: 0.1, color: '#14B8A6', delay: 0.5 },
    { x: '42%', y: '8%', size: 22, rotate: 45, opacity: 0.12, color: '#E8891D', delay: 1 },
    { x: '85%', y: '15%', size: 14, rotate: -15, opacity: 0.1, color: '#5EEAD4', delay: 0.3 },
    { x: '90%', y: '70%', size: 20, rotate: 60, opacity: 0.08, color: '#E8891D', delay: 0.8 },
    { x: '55%', y: '85%', size: 10, rotate: -45, opacity: 0.12, color: '#14B8A6', delay: 1.2 },
    { x: '25%', y: '45%', size: 8, rotate: 20, opacity: 0.08, color: '#ffffff', delay: 0.6 },
    { x: '75%', y: '40%', size: 16, rotate: -60, opacity: 0.06, color: '#ffffff', delay: 0.9 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {triangles.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: t.opacity, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 + t.delay },
            scale: { duration: 0.4, delay: 0.8 + t.delay },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: t.delay },
          }}
          className="absolute"
          style={{ left: t.x, top: t.y }}
        >
          <svg width={t.size} height={t.size} viewBox="0 0 20 20" style={{ transform: `rotate(${t.rotate}deg)` }}>
            <polygon points="10,2 18,18 2,18" fill={t.color} />
          </svg>
        </motion.div>
      ))}
    </div>
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
    <section id="home" className="relative min-h-screen overflow-hidden bg-navy-dark">
      {/* Background: solid bg color per slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ backgroundColor: slides[current].bg }}
        />
      </AnimatePresence>

      {/* Person image — full-screen cover on mobile (face at top), contained right on desktop */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute
              inset-0 w-full h-full object-cover object-top
              lg:inset-0 lg:w-full lg:h-full lg:object-cover lg:object-top"
            loading="eager"
          />
        </AnimatePresence>
      </div>

      {/* Overlays for text readability */}
      {/* Mobile: top clear (face visible), bottom dark (text readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-navy-dark lg:hidden" />

      <ScatteredTriangles />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-3xl pointer-events-none hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex lg:items-center items-end">
        <div className="w-full pb-24 lg:pb-0 lg:pt-0">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            {/* Text */}
            <div className="lg:col-span-5">
              <motion.a
                href="#calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 mb-4 hover:bg-white/25 transition-colors cursor-pointer"
              >
                <Lightning size={14} weight="fill" className="text-white" />
                <span className="text-white text-[11px] font-semibold tracking-wide uppercase">Same-Day Approval</span>
              </motion.a>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[2rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-white leading-[1.08] mb-5 tracking-tight uppercase"
              >
                Apply for a{' '}
                <span className="relative inline-block my-0.5">
                  <span className="relative z-10 px-2.5 py-0.5 text-navy-dark">LOAN</span>
                  <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
                </span>{' '}
                <br className="hidden sm:block" />
                Online<span className="lg:hidden text-primary"> Today!</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2.5 mb-5"
              >
                <a href="#how-it-works" className="bg-white text-navy-dark font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform">
                  Quick Approval!
                </a>
                <a href="#calculator" className="bg-white text-navy-dark font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform">
                  NO Hidden Fees!
                </a>
              </motion.div>

              <motion.a
                href="#calculator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="inline-flex items-center gap-2 bg-navy-dark border-2 border-white text-white font-extrabold text-sm px-7 py-3 rounded-full hover:bg-white hover:text-navy-dark transition-all duration-300 shadow-xl uppercase tracking-wide"
              >
                Apply Online Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 mt-6"
              >
                <button onClick={prev} className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                  <CaretLeft size={14} weight="bold" />
                </button>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-7 bg-white' : 'w-2.5 bg-white/20 hover:bg-white/30'}`} />
                  ))}
                </div>
                <button onClick={next} className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                  <CaretRight size={14} weight="bold" />
                </button>
              </motion.div>
            </div>

            <div className="hidden lg:block lg:col-span-3" />

            <div className="hidden lg:flex lg:col-span-4 justify-end">
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
