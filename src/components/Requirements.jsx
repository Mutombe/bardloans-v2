import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { IdentificationCard, Money, House, FileText, Handshake, CheckCircle } from '@phosphor-icons/react'

const requirements = [
  { icon: IdentificationCard, title: 'Identification', description: 'Valid South African ID document or smart card.' },
  { icon: Money, title: 'Proof of Income', description: 'Latest payslip or 3 months bank statements.' },
  { icon: House, title: 'Proof of Address', description: 'Recent utility bill or bank statement with your address.' },
  { icon: FileText, title: 'Application Form', description: 'Complete our simple loan application form.' },
  { icon: Handshake, title: 'Loan Agreement', description: 'Sign the loan agreement with clear, transparent terms.' },
]

export default function Requirements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="requirements" className="py-16 sm:py-24 bg-gradient-to-b from-warm-white to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            What You Need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            Simple <span className="text-primary">Requirements</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Have these documents ready and you&apos;re on your way.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-3">
          {requirements.map((req, index) => {
            const ReqCard = () => {
              const cardRef = useRef(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-20px' })

              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, x: -15 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-mint/20 transition-all duration-500 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-mint/10 group-hover:bg-mint/15 flex items-center justify-center transition-colors duration-300">
                    <req.icon size={22} weight="duotone" className="text-mint-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy text-sm">{req.title}</h4>
                    <p className="text-gray-400 text-xs">{req.description}</p>
                  </div>
                  <CheckCircle size={20} weight="fill" className="text-mint/30 flex-shrink-0 hidden sm:block" />
                </motion.div>
              )
            }
            return <ReqCard key={req.title} />
          })}
        </div>
      </div>
    </section>
  )
}
