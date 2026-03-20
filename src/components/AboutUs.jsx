import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Handshake, Users, TrendUp, ShieldCheck } from '@phosphor-icons/react'

const values = [
  { icon: Handshake, title: 'Trust & Transparency', desc: 'Every fee laid out upfront. No hidden surprises, ever.' },
  { icon: Users, title: 'Community Impact', desc: 'Bridging the gap for those underserved by traditional banks.' },
  { icon: TrendUp, title: 'Financial Inclusion', desc: 'Empowering individuals and businesses to thrive.' },
  { icon: ShieldCheck, title: 'Responsible Lending', desc: 'Fair, responsible, and personalized financial services.' },
]

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white to-warm-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-mint/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-5 leading-tight">
              Empowering Your <span className="text-primary">Financial Future</span>
            </h2>
            <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
              <p>
                At Bard Loans, we believe that access to credit should be seamless, empowering, and rooted in trust. We understand that financial challenges and opportunities are a part of life, and we are here to ensure that individuals, families, and businesses have the resources they need to thrive.
              </p>
              <p>
                What sets Bard Loans apart is our unwavering commitment to accessibility, transparency, and community impact. By offering personalized financial services and innovative lending solutions, we aim to bridge the gap for those underserved by traditional financial systems.
              </p>
              <p>
                As we continue to grow, our mission remains clear: to uplift the communities we serve by fostering financial inclusion and trust. With every loan, every client, and every partnership, we are dedicated to creating meaningful and lasting change.
              </p>
            </div>
            {/* Artistic signature tagline */}
            <div className="mt-6 relative">
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-mint to-transparent rounded-full" />
              <p
                className="pl-5 text-navy text-lg sm:text-xl leading-snug"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontVariationSettings: '"slnt" 0',
                }}
              >
                <span className="text-primary font-bold">Bard Loans</span>
                <span className="text-navy/70 font-normal"> — empowering your financial future</span>
                <br />
                <span className="text-navy/70 font-normal">with </span>
                <span className="text-mint-dark font-bold">trust</span>
                <span className="text-navy/70 font-normal"> and </span>
                <span className="text-mint-dark font-bold">reliability.</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg border border-gray-100 hover:border-mint/20 transition-all duration-500 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-lg bg-mint/10 group-hover:bg-mint/15 flex items-center justify-center mb-3 transition-colors duration-300">
                  <value.icon size={20} weight="duotone" className="text-mint-dark" />
                </div>
                <h4 className="font-bold text-navy text-xs sm:text-sm mb-1">{value.title}</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
