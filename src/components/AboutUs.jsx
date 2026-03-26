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
    <section id="about" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Lightweight stone texture — SVG without heavy filters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1400 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="s1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f0f0" /><stop offset="100%" stopColor="#d8d8d8" />
            </linearGradient>
            <linearGradient id="s2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eaeaea" /><stop offset="100%" stopColor="#d0d0d0" />
            </linearGradient>
            <linearGradient id="s3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#f5f5f5" /><stop offset="100%" stopColor="#dcdcdc" />
            </linearGradient>
          </defs>
          {/* Base layer */}
          <ellipse cx="180" cy="780" rx="140" ry="85" fill="url(#s1)" opacity="0.5" transform="rotate(-5 180 780)" />
          <ellipse cx="450" cy="800" rx="170" ry="95" fill="url(#s2)" opacity="0.45" transform="rotate(6 450 800)" />
          <ellipse cx="750" cy="790" rx="190" ry="90" fill="url(#s3)" opacity="0.5" transform="rotate(-3 750 790)" />
          <ellipse cx="1050" cy="800" rx="160" ry="100" fill="url(#s1)" opacity="0.45" transform="rotate(10 1050 800)" />
          {/* Second layer */}
          <ellipse cx="120" cy="660" rx="120" ry="70" fill="url(#s2)" opacity="0.4" transform="rotate(12 120 660)" />
          <ellipse cx="350" cy="680" rx="130" ry="75" fill="url(#s3)" opacity="0.45" transform="rotate(-8 350 680)" />
          <ellipse cx="600" cy="670" rx="150" ry="80" fill="url(#s1)" opacity="0.4" transform="rotate(5 600 670)" />
          <ellipse cx="870" cy="685" rx="125" ry="72" fill="url(#s2)" opacity="0.45" transform="rotate(-15 870 685)" />
          <ellipse cx="1150" cy="670" rx="135" ry="68" fill="url(#s3)" opacity="0.4" transform="rotate(8 1150 670)" />
          {/* Third layer */}
          <ellipse cx="200" cy="550" rx="100" ry="60" fill="url(#s3)" opacity="0.35" transform="rotate(20 200 550)" />
          <ellipse cx="450" cy="565" rx="110" ry="55" fill="url(#s1)" opacity="0.4" transform="rotate(-12 450 565)" />
          <ellipse cx="700" cy="555" rx="105" ry="62" fill="url(#s2)" opacity="0.35" transform="rotate(15 700 555)" />
          <ellipse cx="950" cy="570" rx="100" ry="58" fill="url(#s3)" opacity="0.4" transform="rotate(-18 950 570)" />
          <ellipse cx="1200" cy="555" rx="95" ry="55" fill="url(#s1)" opacity="0.35" transform="rotate(10 1200 555)" />
          {/* Fourth layer */}
          <ellipse cx="150" cy="440" rx="80" ry="50" fill="url(#s1)" opacity="0.3" transform="rotate(25 150 440)" />
          <ellipse cx="380" cy="455" rx="90" ry="48" fill="url(#s2)" opacity="0.35" transform="rotate(-20 380 455)" />
          <ellipse cx="600" cy="445" rx="85" ry="52" fill="url(#s3)" opacity="0.3" transform="rotate(14 600 445)" />
          <ellipse cx="830" cy="460" rx="88" ry="46" fill="url(#s1)" opacity="0.35" transform="rotate(-22 830 460)" />
          <ellipse cx="1060" cy="450" rx="82" ry="50" fill="url(#s2)" opacity="0.3" transform="rotate(18 1060 450)" />
          <ellipse cx="1280" cy="440" rx="78" ry="48" fill="url(#s3)" opacity="0.35" transform="rotate(-12 1280 440)" />
          {/* Upper stones */}
          <ellipse cx="250" cy="340" rx="65" ry="40" fill="url(#s2)" opacity="0.25" transform="rotate(30 250 340)" />
          <ellipse cx="500" cy="350" rx="70" ry="38" fill="url(#s3)" opacity="0.3" transform="rotate(-25 500 350)" />
          <ellipse cx="750" cy="345" rx="68" ry="42" fill="url(#s1)" opacity="0.25" transform="rotate(22 750 345)" />
          <ellipse cx="1000" cy="355" rx="65" ry="36" fill="url(#s2)" opacity="0.3" transform="rotate(-28 1000 355)" />
          {/* Top layer */}
          <ellipse cx="350" cy="250" rx="55" ry="32" fill="url(#s1)" opacity="0.2" transform="rotate(35 350 250)" />
          <ellipse cx="650" cy="240" rx="50" ry="30" fill="url(#s3)" opacity="0.25" transform="rotate(-30 650 240)" />
          <ellipse cx="950" cy="250" rx="52" ry="34" fill="url(#s2)" opacity="0.2" transform="rotate(28 950 250)" />
          {/* Peak */}
          <ellipse cx="500" cy="160" rx="40" ry="25" fill="url(#s2)" opacity="0.18" transform="rotate(40 500 160)" />
          <ellipse cx="800" cy="155" rx="38" ry="22" fill="url(#s1)" opacity="0.15" transform="rotate(-35 800 155)" />
        </svg>
      </div>

      {/* Triangles */}
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
