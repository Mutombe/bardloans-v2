import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Handshake, Users, TrendUp, ShieldCheck } from '@phosphor-icons/react'

const values = [
  { icon: Handshake, title: 'Trust', desc: 'Every fee upfront. No surprises.' },
  { icon: Users, title: 'Community', desc: 'Bridging the gap for everyone.' },
  { icon: TrendUp, title: 'Inclusion', desc: 'Empowering you to thrive.' },
  { icon: ShieldCheck, title: 'Responsible', desc: 'Fair and personalized service.' },
]

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F5F4] relative overflow-hidden">
      {[
        { x: '90%', y: '10%', r: 20, o: 0.06, c: '#E8891D' },
        { x: '3%', y: '55%', r: -40, o: 0.05, c: '#14B8A6' },
      ].map((t, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: t.x, top: t.y, opacity: t.o }}>
          <svg width="16" height="16" viewBox="0 0 20 20" style={{ transform: `rotate(${t.r}deg)` }}><polygon points="10,2 18,18 2,18" fill={t.c} /></svg>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-6 leading-[1.05] uppercase tracking-tight">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-3 text-white">Bard Loans</span>
                <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
              </span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-6">
              We believe access to credit should be simple, empowering, and rooted in trust. We&apos;re here to help individuals, families, and businesses get the cash they need to thrive.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              What sets us apart is our commitment to transparency, community impact, and responsible lending. No fine print, no runarounds — just honest financial help.
            </p>

            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-mint to-transparent rounded-full" />
              <p className="pl-5 text-navy text-xl sm:text-2xl leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>
                <span className="text-primary font-bold">Your reliable financial partner when it matters most!</span>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
            {values.map((value, i) => (
              <motion.a
                key={value.title}
                href="#calculator"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="bg-navy-dark rounded-2xl p-6 sm:p-7 hover:scale-[1.03] transition-transform duration-300 block text-center"
              >
                <value.icon size={44} weight="bold" className="text-primary mx-auto mb-3" />
                <h4 className="font-extrabold text-white text-lg uppercase mb-1">{value.title}</h4>
                <p className="text-white/40 text-sm">{value.desc}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
