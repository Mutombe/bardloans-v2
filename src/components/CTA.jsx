import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import BrandPattern from './BrandPattern'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="apply" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-mint/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        {[
          { x: '5%', y: '20%', r: 25, o: 0.08, c: '#E8891D' },
          { x: '92%', y: '30%', r: -35, o: 0.06, c: '#14B8A6' },
          { x: '80%', y: '75%', r: 50, o: 0.05, c: '#E8891D' },
        ].map((t, i) => (
          <div key={i} className="absolute" style={{ left: t.x, top: t.y, opacity: t.o }}>
            <svg width="16" height="16" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
          </div>
        ))}
      </div>

      <BrandPattern variant="orange" className="h-12 sm:h-16 relative z-[1]" />

      <div className="py-20 sm:py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.05] uppercase tracking-tight">
              Ready for{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-3 text-navy-dark">Cash?</span>
                <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
              </span>
            </h2>

            <p className="text-white/40 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Calculate your loan, see exact costs, apply in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-dark px-10 py-4 rounded-full text-base font-extrabold shadow-xl hover:scale-105 transition-transform uppercase tracking-wide"
                whileTap={{ scale: 0.97 }}
              >
                Calculate & Apply
                <ArrowRight size={20} weight="bold" />
              </motion.a>

              <motion.a
                href="https://wa.me/27676151569?text=Hi%20Bard%20Loans%2C%20I%27d%20like%20to%20apply%20for%20a%20loan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-full text-base font-extrabold shadow-xl hover:scale-105 transition-transform uppercase tracking-wide"
                whileTap={{ scale: 0.97 }}
              >
                <WhatsappLogo size={22} weight="fill" />
                WhatsApp Us
              </motion.a>
            </div>

            <p className="mt-10 text-white/20 text-sm">
              Registered Credit Provider NCRCP12840
            </p>
          </motion.div>
        </div>
      </div>
      <BrandPattern variant="navy" className="h-12 sm:h-16 relative z-[1]" />
    </section>
  )
}
