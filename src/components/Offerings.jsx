import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, Timer, Wallet, Lightning, PaperPlaneTilt, Car, SolarPanel, Package } from '@phosphor-icons/react'

const offerings = [
  { icon: User, title: 'Personal Loans', description: 'Up to R100,000. Tailored to you.' },
  { icon: Timer, title: 'Short Term', description: 'Up to 6 months repayment.' },
  { icon: Wallet, title: 'Salary Based', description: 'Up to R50,000 based on income.' },
  { icon: Lightning, title: 'Quick Loans', description: 'Up to R5,000. Same-day cash.' },
  { icon: PaperPlaneTilt, title: 'Pay Later', description: 'Get now, pay monthly.' },
  { icon: Car, title: 'Collateral', description: 'Up to R100,000 with assets.' },
  { icon: SolarPanel, title: 'Solar & Borehole', description: 'Up to R100,000 for installations.' },
  { icon: Package, title: 'Grocery & Stands', description: 'Up to R100,000 for essentials.' },
]

export default function Offerings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="offerings" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {[
        { x: '4%', y: '15%', r: 30, o: 0.05, c: '#E8891D' },
        { x: '95%', y: '80%', r: -45, o: 0.04, c: '#14B8A6' },
      ].map((t, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: t.x, top: t.y, opacity: t.o }}>
          <svg width="14" height="14" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-4 uppercase tracking-tight">
            Our{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-white">Offerings</span>
              <span className="absolute inset-0 bg-navy rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Loans up to R350,000. A solution for every need.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {offerings.map((offering, index) => (
            <motion.a
              key={offering.title}
              href="#calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-navy-dark rounded-2xl p-5 sm:p-6 border-2 border-navy-dark hover:border-primary transition-all duration-300 hover:-translate-y-1 block group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-primary flex items-center justify-center mb-4 mx-auto transition-all duration-300">
                <offering.icon size={32} weight="bold" className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-1 uppercase">{offering.title}</h3>
              <p className="text-white/40 text-sm">{offering.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
