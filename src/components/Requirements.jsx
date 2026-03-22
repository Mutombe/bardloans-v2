import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { IdentificationCard, Money, House, FileText, Handshake, CheckCircle } from '@phosphor-icons/react'

const requirements = [
  { icon: IdentificationCard, title: 'SA ID Document' },
  { icon: Money, title: 'Proof of Income' },
  { icon: House, title: 'Proof of Address' },
  { icon: FileText, title: 'Application Form' },
  { icon: Handshake, title: 'Loan Agreement' },
]

export default function Requirements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="requirements" className="py-20 sm:py-28 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-4 uppercase tracking-tight">
            What You{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-white">Need</span>
              <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Just five documents. That&apos;s it.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-4">
          {requirements.map((req, index) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-5 bg-white rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white text-lg font-extrabold flex items-center justify-center">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-navy-dark flex items-center justify-center">
                <req.icon size={32} weight="bold" className="text-primary" />
              </div>
              <h4 className="flex-1 font-extrabold text-navy text-lg sm:text-xl uppercase">{req.title}</h4>
              <CheckCircle size={28} weight="fill" className="text-mint flex-shrink-0 hidden sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
