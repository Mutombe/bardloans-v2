import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, WhatsappLogo, Calculator } from '@phosphor-icons/react'
import BrandPattern from './BrandPattern'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="apply" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-mint/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      {/* Top pattern band */}
      <BrandPattern variant="orange" className="h-12 sm:h-16 relative z-[1]" />

      {/* Main content */}
      <div className="py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-mint/15 text-mint-light rounded-full px-4 py-1.5 mb-6"
            >
              <Calculator size={16} weight="fill" />
              <span className="font-semibold text-xs tracking-wide uppercase">Get started in minutes</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to get the{' '}
              <span className="text-primary">cash you need?</span>
            </h2>

            <p className="text-white/40 text-sm sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Use our calculator, see your exact costs, and apply directly — it takes less than 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href="#calculator"
                className="relative inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 transition-all duration-300 cursor-pointer overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Calculate & Apply
                  <ArrowRight size={18} weight="bold" />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.a>

              <motion.a
                href="https://wa.me/27676151569?text=Hi%20Bard%20Loans%2C%20I%27d%20like%20to%20apply%20for%20a%20loan.%20Please%20assist%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 backdrop-blur-sm text-[#25D366] border border-[#25D366]/20 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsappLogo size={20} weight="fill" />
                WhatsApp Us
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white/20 text-[11px]"
            >
              Registered Credit Provider NCRCP12840 &bull; Authorised Financial Services Provider
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
