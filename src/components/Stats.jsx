import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, CurrencyCircleDollar, Clock, ThumbsUp } from '@phosphor-icons/react'

const stats = [
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Clients', prefix: '' },
  { icon: CurrencyCircleDollar, value: 15, suffix: 'M+', label: 'Loans Disbursed', prefix: 'R' },
  { icon: Clock, value: 24, suffix: 'hrs', label: 'Average Approval', prefix: '<' },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Satisfaction Rate', prefix: '' },
]

function AnimatedCounter({ value, prefix, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight font-heading">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="py-12 sm:py-16 bg-white relative -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-navy/5 p-6 sm:p-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} weight="duotone" className="text-mint-dark" />
                </div>
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={isInView}
                />
                <p className="text-gray-400 text-xs mt-1 font-medium">{stat.label}</p>
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-gray-100" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
