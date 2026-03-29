import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Clock, CurrencyCircleDollar } from '@phosphor-icons/react'
import LoanCalculator from './LoanCalculator'
import BrandPattern from './BrandPattern'

const highlights = [
  { icon: CurrencyCircleDollar, text: 'R500 – R350,000 range' },
  { icon: Clock, text: 'Same-day approval' },
  { icon: ShieldCheck, text: 'NCR registered' },
]

export default function DetailedCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="calculator" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-dark to-navy" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[8%] w-72 h-72 bg-mint/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-primary/8 rounded-full blur-3xl" />
        {[
          { x: '5%', y: '15%', r: 20, o: 0.06, c: '#E8891D' },
          { x: '92%', y: '25%', r: -35, o: 0.05, c: '#5EEAD4' },
          { x: '88%', y: '80%', r: 50, o: 0.04, c: '#E8891D' },
        ].map((t, i) => (
          <div key={i} className="absolute" style={{ left: t.x, top: t.y, opacity: t.o }}>
            <svg width="16" height="16" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
          </div>
        ))}
      </div>

      <BrandPattern variant="navy" className="h-12 sm:h-16 relative z-[1]" />

      <div className="py-20 sm:py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.05] uppercase tracking-tight">
                Calculate Your{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 px-3 text-navy-dark">Loan</span>
                  <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
                </span>
              </h2>

              <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
                See exactly what you&apos;ll pay. No surprises. Apply directly via WhatsApp or Email.
              </p>

              <div className="space-y-4 mb-10">
                {highlights.map((h, i) => (
                  <motion.div key={h.text} initial={{ opacity: 0, x: -15 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <h.icon size={24} weight="bold" className="text-primary" />
                    </div>
                    <span className="text-white/60 text-lg font-medium">{h.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6">
                <h4 className="text-white font-extrabold text-xl mb-4 uppercase">Our Fees</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Interest', value: '5%', note: 'per month' },
                    { label: 'Initiation', value: '5%', note: 'once-off' },
                    { label: 'Service', value: '10%', note: 'per month' },
                  ].map((fee) => (
                    <div key={fee.label} className="text-center">
                      <div className="text-4xl font-extrabold text-primary">{fee.value}</div>
                      <div className="text-white/60 text-base font-semibold">{fee.label}</div>
                      <div className="text-white/25 text-sm">{fee.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center">
              <LoanCalculator />
            </motion.div>
          </div>
        </div>
      </div>

      <BrandPattern variant="navy" className="h-12 sm:h-16 relative z-[1]" />
    </section>
  )
}
