import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Calculator, ClockClockwise, CurrencyCircleDollar } from '@phosphor-icons/react'

const steps = [
  { icon: UserPlus, step: '01', title: 'Apply Online', description: 'Fill in a quick application with your basic details and employment info.' },
  { icon: Calculator, step: '02', title: 'Get Assessed', description: 'We assess your affordability based on your salary for the best terms.' },
  { icon: ClockClockwise, step: '03', title: 'Quick Approval', description: 'Same-day approval. No long waits, no unnecessary paperwork.' },
  { icon: CurrencyCircleDollar, step: '04', title: 'Get Your Cash', description: 'Money deposited directly into your bank account. Fast and secure.' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-warm-white to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-mint/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-navy/8 text-navy font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            How it <span className="text-primary">Works</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Getting your loan is as easy as 1-2-3-4. No complicated forms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          <div className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-px bg-gradient-to-r from-mint/10 via-mint/30 to-mint/10" />

          {steps.map((step, index) => {
            const StepCard = () => {
              const cardRef = useRef(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-30px' })

              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full bg-white shadow-md shadow-navy/5 border border-gray-100 group-hover:border-mint/20 flex items-center justify-center relative transition-all duration-500"
                  >
                    <step.icon size={32} weight="duotone" className="text-primary sm:hidden" />
                    <step.icon size={44} weight="duotone" className="text-primary hidden sm:block" />
                    <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-navy text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-md">
                      {step.step}
                    </div>
                  </motion.div>
                  <h3 className="text-sm sm:text-lg font-bold text-navy mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[180px] mx-auto hidden sm:block">{step.description}</p>
                </motion.div>
              )
            }
            return <StepCard key={step.step} />
          })}
        </div>
      </div>
    </section>
  )
}
