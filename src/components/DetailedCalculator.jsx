import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calculator, ShieldCheck, Clock, CurrencyCircleDollar } from '@phosphor-icons/react'
import LoanCalculator from './LoanCalculator'
import BrandPattern from './BrandPattern'

const highlights = [
  { icon: CurrencyCircleDollar, text: 'R500 – R5,000 loan range' },
  { icon: Clock, text: 'Same-day approval & payout' },
  { icon: ShieldCheck, text: 'NCR registered provider' },
]

export default function DetailedCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="calculator" className="relative overflow-hidden">
      {/* Dark navy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-dark to-navy" />

      {/* Decorative blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[8%] w-72 h-72 bg-mint/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-primary/8 rounded-full blur-3xl" />
      </div>

      {/* Top pattern band */}
      <BrandPattern variant="navy" className="h-12 sm:h-16 relative z-[1]" />

      {/* Main content */}
      <div className="py-16 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-mint/15 text-mint-light rounded-full px-3.5 py-1.5 mb-5">
                <Calculator size={14} weight="fill" />
                <span className="font-semibold text-[11px] tracking-wide uppercase">Loan Calculator</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                Calculate Your <span className="text-primary">Loan</span> in Seconds
              </h2>

              <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                Use our transparent calculator to see exactly what you&apos;ll pay. No surprises, no hidden fees. Once you&apos;re happy, apply directly via WhatsApp or Email — your calculation details are included automatically.
              </p>

              <div className="space-y-3 mb-8">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.text}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <h.icon size={18} weight="duotone" className="text-mint" />
                    </div>
                    <span className="text-white/60 text-sm">{h.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 sm:p-5">
                <h4 className="text-white font-bold text-sm mb-3">How our fees work</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Interest', value: '5%', note: 'per month' },
                    { label: 'Initiation', value: '5%', note: 'once-off' },
                    { label: 'Service fee', value: '10%', note: 'per month' },
                  ].map((fee) => (
                    <div key={fee.label} className="text-center">
                      <div className="text-2xl font-extrabold text-mint">{fee.value}</div>
                      <div className="text-white/60 text-xs font-medium">{fee.label}</div>
                      <div className="text-white/25 text-[10px]">{fee.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <LoanCalculator />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom pattern band */}
      <BrandPattern variant="navy" className="h-12 sm:h-16 relative z-[1]" />
    </section>
  )
}
