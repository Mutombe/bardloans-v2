import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalendarBlank, ArrowRight, Info, WhatsappLogo, FileText } from '@phosphor-icons/react'

function buildWhatsAppUrl(amount, months, calc) {
  const msg = `Hi Bard Loans,%0A%0AI'd like to apply for a loan.%0A%0A*Loan Amount:* R${amount.toLocaleString()}%0A*Repayment Period:* ${months} month${months > 1 ? 's' : ''}%0A*Total Repayable:* R${calc.total.toFixed(2)}%0A*Monthly Instalment:* R${calc.monthly.toFixed(2)}%0A%0APlease assist me with the application process.`
  return `https://wa.me/27676151569?text=${msg}`
}

function buildEmailUrl(amount, months, calc) {
  const subject = encodeURIComponent(`Loan Application - R${amount.toLocaleString()} over ${months} month${months > 1 ? 's' : ''}`)
  const body = encodeURIComponent(`Hi Bard Loans,\n\nI would like to apply for a loan with the following details:\n\nLoan Amount: R${amount.toLocaleString()}\nRepayment Period: ${months} month${months > 1 ? 's' : ''}\nInterest (5%/mo): R${calc.interest.toFixed(2)}\nInitiation Fee (5%): R${calc.initiation.toFixed(2)}\nService Fee (10%/mo): R${calc.serviceFee.toFixed(2)}\nTotal Repayable: R${calc.total.toFixed(2)}\nMonthly Instalment: R${calc.monthly.toFixed(2)}\n\nPlease assist me with the application process.\n\nKind regards`)
  return `mailto:apply@bardloans.co.za?subject=${subject}&body=${body}`
}

export default function LoanCalculator({ compact = false, maxAmount = 350000 }) {
  const [amount, setAmount] = useState(maxAmount <= 5000 ? 2000 : 10000)
  const [months, setMonths] = useState(1)

  const maxMonths = 6
  const step = maxAmount <= 5000 ? 100 : maxAmount <= 50000 ? 500 : 1000

  const calc = useMemo(() => {
    const interest = amount * 0.05 * months
    const initiation = amount * 0.05
    const serviceFee = amount * 0.10 * months
    const total = amount + interest + initiation + serviceFee
    const monthly = total / months
    return { interest, initiation, serviceFee, total, monthly }
  }, [amount, months])

  const progress = ((amount - 500) / (maxAmount - 500)) * 100
  const fmt = (n) => `R${n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const fmtShort = (n) => n >= 1000 ? `R${(n / 1000).toLocaleString()}K` : `R${n.toLocaleString()}`

  const wrapperClass = compact
    ? 'bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-2xl shadow-black/20'
    : 'bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-[0_8px_40px_rgba(27,20,100,0.12),0_2px_8px_rgba(27,20,100,0.06)] ring-1 ring-mint/15'

  const textMain = compact ? 'text-white' : 'text-navy'
  const textSub = compact ? 'text-white/60' : 'text-navy/60'
  const textMuted = compact ? 'text-white/35' : 'text-gray-400'
  const textFaint = compact ? 'text-white/20' : 'text-gray-300'
  const breakdownBg = compact ? 'bg-white/[0.04] border border-white/[0.06]' : 'bg-gradient-to-br from-navy-50/60 to-mint-50/40'
  const btnInactiveBg = compact ? 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] border border-white/[0.06]' : 'bg-gray-50 text-gray-500 hover:bg-mint-50 border border-gray-100'
  const dividerColor = compact ? 'border-white/[0.08]' : 'border-gray-200/60'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: compact ? 0.4 : 0, ease: 'easeOut' }}
      className={wrapperClass}
    >
      <div className="h-0.5 w-12 bg-mint rounded-full mb-4 mx-auto" />

      <div className="text-center mb-4">
        <h3 className={`${textMain} font-extrabold ${compact ? 'text-lg' : 'text-2xl'} uppercase`}>How much do you need?</h3>
        {!compact && <p className={`${textMuted} text-sm mt-1`}>Calculate — then apply via WhatsApp or Email</p>}
      </div>

      {/* Amount */}
      <motion.div key={amount} initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="text-center mb-1">
        <span className={`${compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'} font-extrabold ${textMain} tracking-tight`}>
          R{amount.toLocaleString()}
        </span>
      </motion.div>

      {/* Slider */}
      <div className="mb-5">
        <input type="range" min="500" max={maxAmount} step={step} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" style={{ '--progress': `${progress}%` }} />
        <div className={`flex justify-between text-[10px] ${textFaint} mt-0.5 font-medium`}>
          <span>R500</span>
          <span>{fmtShort(maxAmount)}</span>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-5">
        <label className={`text-sm font-bold ${textSub} flex items-center gap-1.5 mb-2 uppercase`}>
          <CalendarBlank size={16} weight="bold" className="text-mint" />
          Repayment period
        </label>
        <div className={`grid ${compact ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-6'} gap-1.5`}>
          {Array.from({ length: maxMonths }, (_, i) => i + 1).map((m) => (
            <motion.button
              key={m}
              onClick={() => setMonths(m)}
              className={`py-2 ${compact ? '' : 'sm:py-2.5'} rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                months === m ? 'bg-mint text-white shadow-md shadow-mint/20' : btnInactiveBg
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {m} {m === 1 ? 'mo' : 'mo'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div className={`${breakdownBg} rounded-xl p-3 ${compact ? '' : 'sm:p-4'} mb-5 space-y-1.5`}>
        {[
          { label: 'Interest (5%/mo)', value: calc.interest, hasInfo: true },
          { label: 'Initiation fee (5%)', value: calc.initiation },
          { label: 'Service fee (10%/mo)', value: calc.serviceFee },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-xs">
            <span className={`${textMuted} flex items-center gap-1`}>
              {row.label}
              {row.hasInfo && <Info size={11} className={textFaint} />}
            </span>
            <span className={`font-semibold ${compact ? 'text-white/70' : 'text-navy'}`}>{fmt(row.value)}</span>
          </div>
        ))}
        <div className={`border-t ${dividerColor} pt-1.5 mt-1.5`}>
          <div className="flex justify-between text-xs">
            <span className={compact ? 'text-white/50' : 'text-gray-500'}>Total Repayable</span>
            <motion.span
              key={calc.total}
              initial={{ scale: 1.08, color: '#0D9488' }}
              animate={{ scale: 1, color: compact ? '#ffffff' : '#1B1464' }}
              className={`font-bold ${compact ? 'text-sm' : 'text-base'}`}
            >
              {fmt(calc.total)}
            </motion.span>
          </div>
          {months > 1 && (
            <div className="flex justify-between text-xs mt-0.5">
              <span className={textMuted}>Monthly Instalment</span>
              <span className={`font-bold text-mint-dark ${compact ? 'text-sm' : 'text-base'}`}>{fmt(calc.monthly)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dual Apply Buttons */}
      <div className={`grid grid-cols-2 gap-2 ${compact ? '' : 'sm:gap-3'}`}>
        <motion.a
          href={buildWhatsAppUrl(amount, months, calc)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white ${compact ? 'py-2.5 text-xs' : 'py-3 text-sm'} rounded-xl font-bold shadow-md shadow-[#25D366]/20 transition-all cursor-pointer`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <WhatsappLogo size={compact ? 16 : 18} weight="fill" />
          WhatsApp
        </motion.a>
        <motion.a
          href={`?loanAmount=${amount}&months=${months}#apply-form`}
          onClick={(e) => {
            e.preventDefault()
            const params = new URLSearchParams(window.location.search)
            params.set('loanAmount', amount)
            params.set('months', months)
            window.history.replaceState({}, '', `?${params.toString()}`)
            document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white ${compact ? 'py-2.5 text-xs' : 'py-3 text-sm'} rounded-xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer overflow-hidden group relative`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <FileText size={compact ? 16 : 18} weight="bold" />
            Apply
          </span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.a>
      </div>

      <p className={`text-center text-[10px] ${textFaint} mt-2.5`}>
        No hidden fees &bull; Same-day response
      </p>
    </motion.div>
  )
}
