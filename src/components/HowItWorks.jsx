import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Calculator, ClockClockwise, CurrencyCircleDollar } from '@phosphor-icons/react'

const steps = [
  { icon: UserPlus, step: '01', title: 'Apply', description: 'Quick online application.' },
  { icon: Calculator, step: '02', title: 'Assessed', description: 'Based on your salary.' },
  { icon: ClockClockwise, step: '03', title: 'Approved', description: 'Same-day decision.' },
  { icon: CurrencyCircleDollar, step: '04', title: 'Get Cash', description: 'Straight to your account.' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-navy-dark relative overflow-hidden">
      {[
        { x: '8%', y: '20%', r: 15, o: 0.06, c: '#E8891D' },
        { x: '88%', y: '70%', r: -30, o: 0.05, c: '#5EEAD4' },
      ].map((t, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: t.x, top: t.y, opacity: t.o }}>
          <svg width="16" height="16" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            How it{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-navy-dark">Works</span>
              <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-lg">Four simple steps to your cash.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full bg-white/[0.05] border-2 border-white/10 group-hover:border-primary flex items-center justify-center relative transition-all duration-300">
                <step.icon size={44} weight="bold" className="text-primary" />
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-navy-dark text-sm font-extrabold flex items-center justify-center">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1 uppercase">{step.title}</h3>
              <p className="text-white/40 text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="text-center mt-14">
          <a href="#calculator" className="inline-flex items-center gap-2 bg-white text-navy-dark font-extrabold text-base px-10 py-4 rounded-full hover:scale-105 transition-transform uppercase tracking-wide shadow-xl">
            Apply Online Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
