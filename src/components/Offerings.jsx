import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, Timer, Wallet, Lightning, PaperPlaneTilt, Car, SolarPanel, Package } from '@phosphor-icons/react'

const offerings = [
  { icon: User, title: 'Personal Loans', description: 'Flexible personal loans tailored to your individual financial needs and goals.', color: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: Timer, title: 'Short Term Loans', description: 'Quick-turnaround loans from 1 to 3 months. Get funded, get on with life.', color: 'bg-navy/10', iconColor: 'text-navy' },
  { icon: Wallet, title: 'Salary Based', description: 'Loans assessed on your income. Repayments structured around affordability.', color: 'bg-mint/10', iconColor: 'text-mint-dark' },
  { icon: Lightning, title: 'Quick Loans', description: 'Same-day approval and fast disbursement when you need cash urgently.', color: 'bg-amber-500/10', iconColor: 'text-amber-600' },
  { icon: PaperPlaneTilt, title: 'Send Now Pay Later', description: 'Get what you need now and pay back in manageable monthly instalments.', color: 'bg-violet-500/10', iconColor: 'text-violet-600' },
  { icon: Car, title: 'Collateral Based', description: 'Secure larger amounts using your vehicles or machinery as collateral.', color: 'bg-blue-500/10', iconColor: 'text-blue-600' },
  { icon: SolarPanel, title: 'Solar & Borehole', description: 'Finance solar installations and borehole systems. Invest in your property.', color: 'bg-emerald-500/10', iconColor: 'text-emerald-600' },
  { icon: Package, title: 'Grocery & Stands', description: 'Finance groceries and property stands. Practical solutions for everyday needs.', color: 'bg-rose-500/10', iconColor: 'text-rose-600' },
]

export default function Offerings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="offerings" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-navy/8 text-navy font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            Loan Solutions <span className="text-primary">For You</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            From quick cash to property investments — a lending solution for every need.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {offerings.map((offering, index) => {
            const CardWrapper = () => {
              const cardRef = useRef(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-20px' })

              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <a href="#calculator" className="block bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg border border-gray-100 hover:border-mint/20 transition-all duration-500 h-full hover:-translate-y-1 no-underline">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${offering.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <offering.icon size={22} weight="duotone" className={offering.iconColor} />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-navy mb-1">{offering.title}</h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">{offering.description}</p>
                  </a>
                </motion.div>
              )
            }
            return <CardWrapper key={offering.title} />
          })}
        </div>
      </div>
    </section>
  )
}
