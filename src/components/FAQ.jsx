import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CaretDown, Question, CurrencyCircleDollar, ListBullets, Percent, CalendarCheck, Lightning, IdentificationCard, Car, ShieldCheck, WhatsappLogo, ArrowRight } from '@phosphor-icons/react'

const faqs = [
  {
    icon: CurrencyCircleDollar,
    question: 'How much can I borrow?',
    answer: 'You can borrow between R500 and R5,000. The exact amount depends on your salary and affordability assessment. We ensure you can comfortably manage your repayments.',
  },
  {
    icon: ListBullets,
    question: 'What types of loans do you offer?',
    answer: 'We offer a wide range of lending solutions: Personal Loans, Short Term Loans, Salary Based Loans, Quick Loans, Send Now Pay Later, Collateral Based loans (vehicles or machinery), and Product Based financing for solar installations, boreholes, groceries, and stands.',
  },
  {
    icon: Percent,
    question: 'What are the interest rates and fees?',
    answer: 'Our interest rate is 5% per month on the loan amount. There is a once-off initiation fee of 5% and a monthly service fee of 10%. All fees are transparently displayed in our loan calculator before you apply — no hidden costs.',
  },
  {
    icon: CalendarCheck,
    question: 'How long do I have to repay?',
    answer: 'You can choose a repayment period of 1, 2, or 3 months. The total amount repayable varies based on the term you select — shorter terms mean less total interest paid.',
  },
  {
    icon: Lightning,
    question: 'How fast is the approval process?',
    answer: 'We offer same-day approval! Once your application is submitted and your documents verified, you can receive funds in your bank account within hours.',
  },
  {
    icon: IdentificationCard,
    question: 'What documents do I need to apply?',
    answer: 'You will need: a valid South African ID, proof of income (latest payslip), proof of address (recent utility bill or bank statement), a completed application form, and a signed loan agreement form.',
  },
  {
    icon: Car,
    question: 'What is collateral-based lending?',
    answer: 'Collateral-based loans allow you to secure larger amounts using your vehicles or machinery as security. This can give you access to better terms and higher loan amounts based on the value of your assets.',
  },
  {
    icon: ShieldCheck,
    question: 'Is Bard Loans a registered credit provider?',
    answer: 'Yes, Bard Santner Investors is an authorised financial services provider and registered credit provider (NCRCP12840). We operate fully within South African lending regulations.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
  const Icon = faq.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`rounded-xl transition-all duration-300 ${isOpen ? 'bg-mint-50/50 border border-mint/10' : 'bg-transparent border border-transparent hover:bg-gray-50/80'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left group cursor-pointer"
      >
        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-mint text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-mint/10 group-hover:text-mint-dark'}`}>
          <Icon size={18} weight={isOpen ? 'fill' : 'duotone'} />
        </div>
        <span className={`flex-1 text-sm sm:text-[15px] font-semibold transition-colors duration-300 ${isOpen ? 'text-navy' : 'text-navy/80 group-hover:text-navy'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-mint text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <CaretDown size={14} weight="bold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-16 sm:pl-[4.5rem]">
              <p className="text-gray-500 text-sm leading-relaxed">
                {faq.answer}
              </p>
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
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-white to-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-navy/8 text-navy font-semibold text-xs px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            <Question size={13} weight="bold" className="inline mr-1 -mt-0.5" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Everything you need to know about Bard Loans.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* FAQ List — 2 cols */}
          <div className="lg:col-span-2 space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-mint/15 flex items-center justify-center mx-auto mb-4">
                <Question size={28} weight="duotone" className="text-mint" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Still have questions?</h4>
              <p className="text-white/40 text-xs leading-relaxed mb-6">
                Can&apos;t find what you&apos;re looking for? Reach out to us directly — we&apos;re here to help.
              </p>
              <div className="space-y-2.5">
                <a
                  href="https://wa.me/27676151569?text=Hi%20Bard%20Loans%2C%20I%20have%20a%20question%20about%20your%20loan%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  WhatsApp Us
                </a>
                <a
                  href="#calculator"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Calculate Your Loan
                  <ArrowRight size={14} weight="bold" />
                </a>
                <a
                  href="mailto:info@bardloans.co.za?subject=Question about Bard Loans"
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/15 text-white/70 py-2.5 rounded-xl text-xs font-bold transition-colors border border-white/10"
                >
                  Email Us Instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
