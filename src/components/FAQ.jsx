import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CaretDown, CurrencyCircleDollar, ListBullets, Percent, CalendarCheck, Lightning, IdentificationCard, Car, ShieldCheck, WhatsappLogo, ArrowRight } from '@phosphor-icons/react'

const faqs = [
  { icon: CurrencyCircleDollar, question: 'How much can I borrow?', answer: 'Up to R350,000 depending on the loan type. Quick loans up to R5,000, salary-based up to R50,000, personal/collateral/product-based up to R100,000.' },
  { icon: ListBullets, question: 'What loans do you offer?', answer: 'Personal, Short Term, Salary Based, Quick Loans, Send Now Pay Later, Collateral Based (vehicles/machinery), and Product Based (solar, boreholes, groceries, stands).' },
  { icon: Percent, question: 'What are the fees?', answer: '5% interest per month, 5% initiation fee (once-off), 10% service fee per month. All shown upfront in our calculator.' },
  { icon: CalendarCheck, question: 'How long to repay?', answer: 'Up to 6 months depending on the loan. Shorter terms = less total interest.' },
  { icon: Lightning, question: 'How fast is approval?', answer: 'Same day! Funds can be in your account within hours.' },
  { icon: IdentificationCard, question: 'What documents do I need?', answer: 'Three things: your SA ID document, a valid passport, and proof of income. That\'s it.' },
  { icon: Car, question: 'What is collateral lending?', answer: 'Use your vehicles or machinery as security for loans up to R100,000 with better terms.' },
  { icon: ShieldCheck, question: 'Are you registered?', answer: 'Yes. Bard Santner Investors — authorised FSP and registered credit provider NCRCP12840.' },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
  const Icon = faq.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`rounded-2xl transition-all duration-300 ${isOpen ? 'bg-primary/5 border-2 border-primary/20' : 'bg-transparent border-2 border-transparent hover:bg-gray-50'}`}
    >
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group cursor-pointer">
        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
          <Icon size={24} weight="bold" />
        </div>
        <span className={`flex-1 text-base sm:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-navy' : 'text-navy/70 group-hover:text-navy'}`}>
          {faq.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
          <CaretDown size={18} weight="bold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.5rem] sm:pl-[5.5rem]">
              <p className="text-gray-500 text-base leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-4 uppercase tracking-tight">
            Got{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-white">Questions?</span>
              <span className="absolute inset-0 bg-navy rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Everything you need to know.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? -1 : index)} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-navy-dark rounded-2xl p-8 text-center">
              <h4 className="text-white font-extrabold text-2xl mb-3 uppercase">Still Stuck?</h4>
              <p className="text-white/40 text-base leading-relaxed mb-8">Reach out — we&apos;re here to help.</p>
              <div className="space-y-3">
                <a href="https://wa.me/27676151569?text=Hi%20Bard%20Loans%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-full text-base font-extrabold uppercase tracking-wide hover:scale-105 transition-transform">
                  <WhatsappLogo size={22} weight="fill" /> WhatsApp Us
                </a>
                <a href="#calculator" className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 rounded-full text-base font-extrabold uppercase tracking-wide hover:scale-105 transition-transform">
                  Calculate Loan <ArrowRight size={18} weight="bold" />
                </a>
                <a href="mailto:info@bardloans.co.za" className="flex items-center justify-center gap-2 w-full bg-white/10 text-white/60 py-3.5 rounded-full text-base font-semibold border border-white/10 hover:bg-white/15 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
