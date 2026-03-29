import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { IdentificationCard, Globe, Money, CheckCircle } from '@phosphor-icons/react'

const requirements = [
  { icon: IdentificationCard, title: 'SA ID Document' },
  { icon: Globe, title: 'Valid Passport' },
  { icon: Money, title: 'Proof of Income' },
]

export default function Requirements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="requirements" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-4 uppercase tracking-tight">
            What You{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-white">Need</span>
              <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Just three documents. That&apos;s it.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-5">
          {requirements.map((req, index) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-primary transition-all duration-300 group text-center"
            >
              <div className="w-20 h-20 rounded-full bg-navy-dark flex items-center justify-center mb-5 mx-auto">
                <req.icon size={44} weight="bold" className="text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-extrabold flex items-center justify-center">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="font-extrabold text-navy text-lg uppercase">{req.title}</h4>
              </div>
              <CheckCircle size={28} weight="fill" className="text-mint mx-auto mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
