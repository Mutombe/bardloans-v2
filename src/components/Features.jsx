import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scales, ShieldCheck, RocketLaunch } from '@phosphor-icons/react'
import BrandPattern from './BrandPattern'

const features = [
  { icon: Scales, title: 'Salary-Based Flexibility', description: 'Loans tailored to your income. Repayments that work for you.', href: '#offerings' },
  { icon: ShieldCheck, title: 'Transparent Pricing', description: 'Every fee upfront. No surprises, no hidden costs.', href: '#calculator' },
  { icon: RocketLaunch, title: 'Fast & Secure', description: 'Same-day approval. Your data protected, cash delivered.', href: '#how-it-works' },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 sm:py-28 bg-primary relative overflow-hidden" id="features">
      {/* Full background brand pattern */}
      <BrandPattern variant="orange-bg" className="absolute inset-0 z-0" />

      {/* Triangles */}
      {[
        { x: '92%', y: '20%', r: -25, o: 0.12, c: '#1B1464' },
        { x: '6%', y: '70%', r: 35, o: 0.1, c: '#ffffff' },
        { x: '50%', y: '8%', r: 45, o: 0.08, c: '#1B1464' },
      ].map((t, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: t.x, top: t.y, opacity: t.o }}>
          <svg width="16" height="16" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Why{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-primary">Bard Loans?</span>
              <span className="absolute inset-0 bg-navy-dark rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-lg">Simple, fair, and fast lending.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.a
              key={feature.title}
              href={feature.href}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-white hover:border-navy transition-all duration-300 hover:-translate-y-1 block group text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-navy-dark flex items-center justify-center mb-6 mx-auto transition-all duration-300">
                <feature.icon size={40} weight="bold" className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-3 uppercase">{feature.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{feature.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
