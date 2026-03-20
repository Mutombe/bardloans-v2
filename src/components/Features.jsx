import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scales, ShieldCheck, RocketLaunch } from '@phosphor-icons/react'

const features = [
  {
    icon: Scales,
    title: 'Salary-based flexibility',
    description: 'Loans tailored to your income. We assess what you can comfortably afford, so repayments never stretch you thin.',
    accent: 'bg-primary/10',
    iconColor: 'text-primary',
    border: 'hover:border-primary/20',
    href: '#offerings',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent pricing',
    description: 'No hidden fees, no surprises. Every cost is laid out upfront — interest, initiation, and service fees all clearly stated.',
    accent: 'bg-mint/10',
    iconColor: 'text-mint-dark',
    border: 'hover:border-mint/20',
    href: '#calculator',
  },
  {
    icon: RocketLaunch,
    title: 'Fast and Secure',
    description: 'Same-day approvals in a secure environment. Your data is protected, and your cash arrives fast when you need it most.',
    accent: 'bg-navy/10',
    iconColor: 'text-navy',
    border: 'hover:border-navy/20',
    href: '#how-it-works',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group"
    >
      <a href={feature.href} className={`block bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100 ${feature.border} transition-all duration-500 h-full hover:-translate-y-1 no-underline`}>
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.5 }}
          className={`w-14 h-14 rounded-xl ${feature.accent} flex items-center justify-center mb-5`}
        >
          <feature.icon size={28} weight="duotone" className={feature.iconColor} />
        </motion.div>
        <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
      </a>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-16 sm:py-24 bg-white relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-mint/10 text-mint-dark font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            Why Choose <span className="text-primary">Bard Loans?</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            We make borrowing simple, fair, and fast. Here&apos;s what sets us apart.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
