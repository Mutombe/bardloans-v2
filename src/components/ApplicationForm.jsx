import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { User, Briefcase, Bank, FileText, ArrowRight, ArrowLeft, PaperPlaneTilt, CheckCircle, CloudArrowUp, WarningCircle, Info } from '@phosphor-icons/react'
import SignaturePad from './SignaturePad'

const STEPS = [
  { icon: User, label: 'Personal' },
  { icon: Briefcase, label: 'Employment' },
  { icon: Bank, label: 'Banking & Loan' },
  { icon: FileText, label: 'Upload & Sign' },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function LoanBreakdown({ amount, months }) {
  const a = Number(amount) || 0
  const m = Number(months) || 1
  if (a <= 0) return null
  const interest = a * 0.05 * m
  const initiation = a * 0.05
  const serviceFee = a * 0.10 * m
  const total = a + interest + initiation + serviceFee
  const monthly = total / m
  const fmt = (n) => `R${n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div className="bg-gradient-to-br from-navy-50/60 to-mint-50/40 rounded-xl p-4 space-y-1.5">
      <h4 className="text-navy font-extrabold text-sm uppercase mb-2 flex items-center gap-1.5">
        <Info size={14} className="text-mint" /> Your Loan Breakdown
      </h4>
      <div className="flex justify-between text-xs"><span className="text-gray-400">Interest (5%/mo)</span><span className="font-semibold text-navy">{fmt(interest)}</span></div>
      <div className="flex justify-between text-xs"><span className="text-gray-400">Initiation (5%)</span><span className="font-semibold text-navy">{fmt(initiation)}</span></div>
      <div className="flex justify-between text-xs"><span className="text-gray-400">Service fee (10%/mo)</span><span className="font-semibold text-navy">{fmt(serviceFee)}</span></div>
      <div className="border-t border-gray-200/60 pt-1.5 mt-1.5">
        <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Total Repayable</span><span className="font-extrabold text-navy">{fmt(total)}</span></div>
        {m > 1 && <div className="flex justify-between text-sm mt-0.5"><span className="text-gray-400">Monthly Instalment</span><span className="font-extrabold text-mint-dark">{fmt(monthly)}</span></div>}
      </div>
    </div>
  )
}

export default function ApplicationForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [prefilled, setPrefilled] = useState(false)

  const [form, setForm] = useState({
    surname: '', firstName: '', idNumber: '', dateOfBirth: '',
    maritalStatus: '', gender: '', residentialAddress: '', emailAddress: '',
    contactNumber: '', alternativeNumber: '', nextOfKin: '', relationship: '', nextOfKinContact: '',
    employerName: '', positionHeld: '', contractType: 'Permanent', employeeNumber: '',
    employmentDate: '', contractExpiryDate: '', supervisorName: '', supervisorContact: '', employerAddress: '',
    bankName: '', branch: '', accountNumber: '', accountName: '',
    loanAmount: '', loanInstallment: '', repaymentPeriod: '1', loanPurpose: '',
  })
  const [idFile, setIdFile] = useState(null)
  const [proofFile, setProofFile] = useState(null)
  const [signature, setSignature] = useState(null)
  const [consent, setConsent] = useState(false)

  // Read URL params from calculator
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const loanAmount = params.get('loanAmount')
    const months = params.get('months')
    if (loanAmount && months) {
      setForm(prev => ({
        ...prev,
        loanAmount,
        repaymentPeriod: months,
      }))
      setPrefilled(true)
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname + window.location.hash)
    }
  }, [])

  // Auto-calculate installment when amount/period change
  useEffect(() => {
    const a = Number(form.loanAmount) || 0
    const m = Number(form.repaymentPeriod) || 1
    if (a > 0) {
      const total = a * (1.05 + 0.15 * m)
      update('loanInstallment', (total / m).toFixed(2))
    }
  }, [form.loanAmount, form.repaymentPeriod])

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const canProceed = () => {
    if (step === 0) return form.surname && form.firstName && form.idNumber && form.contactNumber
    if (step === 1) return form.employerName && form.positionHeld
    if (step === 2) return form.bankName && form.accountNumber && form.loanAmount
    if (step === 3) return idFile && proofFile && signature && consent
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      data.append('idDocument', idFile)
      data.append('proofOfEmployment', proofFile)
      data.append('signature', signature)
      data.append('applicationDate', new Date().toISOString().split('T')[0])

      const res = await fetch(`${API_URL}/api/apply/`, { method: 'POST', body: data })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or WhatsApp us at 067 615 1569.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-navy font-medium text-sm outline-none transition-colors'
  const labelClass = 'block text-primary font-bold text-xs uppercase tracking-wide mb-1.5'

  if (submitted) {
    return (
      <section id="apply-form" className="py-20 sm:py-28 bg-navy-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} weight="bold" className="text-mint" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4 uppercase">Application Submitted!</h2>
          <p className="text-gray-400 text-lg mb-8">
            Your loan application has been received. We&apos;ll review it and get back to you within 24 hours.
          </p>
          <a href="#home" className="inline-flex items-center gap-2 bg-primary text-white font-extrabold text-sm px-8 py-3.5 rounded-full uppercase tracking-wide hover:scale-105 transition-transform">
            Back to Home
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="apply-form" className="py-20 sm:py-28 bg-navy-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Apply{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-3 text-white">Online</span>
              <span className="absolute inset-0 bg-primary rounded-md skew-x-[-2deg]" />
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            {prefilled ? 'Your loan details are pre-filled from the calculator. Complete your details below.' : 'Fill in the form below. It takes less than 5 minutes.'}
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const active = i === step
            const done = i < step
            return (
              <div key={i} className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-all ${
                    active ? 'bg-primary text-white shadow-lg' : done ? 'bg-mint/20 text-mint cursor-pointer' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {done ? <CheckCircle size={16} weight="fill" /> : <Icon size={16} weight="bold" />}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && <div className={`w-6 sm:w-10 h-0.5 ${i < step ? 'bg-mint' : 'bg-white/20'}`} />}
              </div>
            )
          })}
        </div>

        {/* Form steps */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h3 className="text-2xl font-extrabold text-navy uppercase mb-6">Personal Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Surname *</label><input className={inputClass} value={form.surname} onChange={e => update('surname', e.target.value)} /></div>
                  <div><label className={labelClass}>First Name *</label><input className={inputClass} value={form.firstName} onChange={e => update('firstName', e.target.value)} /></div>
                  <div><label className={labelClass}>ID Number *</label><input className={inputClass} value={form.idNumber} onChange={e => update('idNumber', e.target.value)} /></div>
                  <div><label className={labelClass}>Date of Birth</label><input type="date" className={inputClass} value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} /></div>
                  <div><label className={labelClass}>Marital Status</label>
                    <select className={inputClass} value={form.maritalStatus} onChange={e => update('maritalStatus', e.target.value)}>
                      <option value="">Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Gender</label>
                    <select className={inputClass} value={form.gender} onChange={e => update('gender', e.target.value)}>
                      <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                </div>
                <div><label className={labelClass}>Residential Address</label><input className={inputClass} value={form.residentialAddress} onChange={e => update('residentialAddress', e.target.value)} /></div>
                <div><label className={labelClass}>Email Address</label><input type="email" className={inputClass} value={form.emailAddress} onChange={e => update('emailAddress', e.target.value)} /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Contact Number *</label><input className={inputClass} value={form.contactNumber} onChange={e => update('contactNumber', e.target.value)} /></div>
                  <div><label className={labelClass}>Alternative Number</label><input className={inputClass} value={form.alternativeNumber} onChange={e => update('alternativeNumber', e.target.value)} /></div>
                </div>
                <h4 className="text-lg font-extrabold text-navy uppercase pt-4">Next of Kin</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><label className={labelClass}>Full Name</label><input className={inputClass} value={form.nextOfKin} onChange={e => update('nextOfKin', e.target.value)} /></div>
                  <div><label className={labelClass}>Relationship</label><input className={inputClass} value={form.relationship} onChange={e => update('relationship', e.target.value)} /></div>
                  <div><label className={labelClass}>Contact Number</label><input className={inputClass} value={form.nextOfKinContact} onChange={e => update('nextOfKinContact', e.target.value)} /></div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h3 className="text-2xl font-extrabold text-navy uppercase mb-6">Employment Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Name of Employer *</label><input className={inputClass} value={form.employerName} onChange={e => update('employerName', e.target.value)} /></div>
                  <div><label className={labelClass}>Position Held *</label><input className={inputClass} value={form.positionHeld} onChange={e => update('positionHeld', e.target.value)} /></div>
                  <div><label className={labelClass}>Nature of Contract</label>
                    <select className={inputClass} value={form.contractType} onChange={e => update('contractType', e.target.value)}>
                      <option>Permanent</option><option>Contract</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Employee Number</label><input className={inputClass} value={form.employeeNumber} onChange={e => update('employeeNumber', e.target.value)} /></div>
                  <div><label className={labelClass}>Employment Date</label><input type="date" className={inputClass} value={form.employmentDate} onChange={e => update('employmentDate', e.target.value)} /></div>
                  <div><label className={labelClass}>Contract Expiry Date</label><input type="date" className={inputClass} value={form.contractExpiryDate} onChange={e => update('contractExpiryDate', e.target.value)} /></div>
                  <div><label className={labelClass}>Supervisor Name</label><input className={inputClass} value={form.supervisorName} onChange={e => update('supervisorName', e.target.value)} /></div>
                  <div><label className={labelClass}>Supervisor Contact</label><input className={inputClass} value={form.supervisorContact} onChange={e => update('supervisorContact', e.target.value)} /></div>
                </div>
                <div><label className={labelClass}>Employer&apos;s Address</label><input className={inputClass} value={form.employerAddress} onChange={e => update('employerAddress', e.target.value)} /></div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h3 className="text-2xl font-extrabold text-navy uppercase mb-6">Banking Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Bank Name *</label><input className={inputClass} value={form.bankName} onChange={e => update('bankName', e.target.value)} /></div>
                  <div><label className={labelClass}>Branch</label><input className={inputClass} value={form.branch} onChange={e => update('branch', e.target.value)} /></div>
                  <div><label className={labelClass}>Account Number *</label><input className={inputClass} value={form.accountNumber} onChange={e => update('accountNumber', e.target.value)} /></div>
                  <div><label className={labelClass}>Account Name</label><input className={inputClass} value={form.accountName} onChange={e => update('accountName', e.target.value)} /></div>
                </div>
                <h4 className="text-lg font-extrabold text-navy uppercase pt-4">Loan Details</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Loan Amount (R) *</label><input type="number" className={inputClass} value={form.loanAmount} onChange={e => update('loanAmount', e.target.value)} placeholder="500 - 350,000" /></div>
                  <div><label className={labelClass}>Repayment Period</label>
                    <select className={inputClass} value={form.repaymentPeriod} onChange={e => update('repaymentPeriod', e.target.value)}>
                      <option value="1">1 Month</option><option value="2">2 Months</option><option value="3">3 Months</option><option value="4">4 Months</option><option value="5">5 Months</option><option value="6">6 Months</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2"><label className={labelClass}>Loan Purpose</label><input className={inputClass} value={form.loanPurpose} onChange={e => update('loanPurpose', e.target.value)} placeholder="e.g. Medical, Education, Emergency" /></div>
                </div>

                {/* Live calculation breakdown */}
                {form.loanAmount && <LoanBreakdown amount={form.loanAmount} months={form.repaymentPeriod} />}

                {prefilled && (
                  <div className="bg-mint-50 border border-mint/20 rounded-xl p-3 flex items-center gap-2 text-mint-dark text-sm">
                    <CheckCircle size={18} weight="fill" />
                    Loan details pre-filled from calculator. Adjust if needed.
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-2xl font-extrabold text-navy uppercase mb-6">Upload & Sign</h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>ID Document *</label>
                    <label className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${idFile ? 'border-mint bg-mint/5' : 'border-gray-200 hover:border-primary bg-gray-50'}`}>
                      {idFile ? <CheckCircle size={32} weight="fill" className="text-mint" /> : <CloudArrowUp size={32} className="text-gray-400" />}
                      <span className="text-sm font-bold text-navy">{idFile ? idFile.name : 'Upload ID'}</span>
                      <span className="text-xs text-gray-400">PDF, JPG or PNG</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setIdFile(e.target.files[0])} />
                    </label>
                  </div>
                  <div>
                    <label className={labelClass}>Proof of Income *</label>
                    <label className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${proofFile ? 'border-mint bg-mint/5' : 'border-gray-200 hover:border-primary bg-gray-50'}`}>
                      {proofFile ? <CheckCircle size={32} weight="fill" className="text-mint" /> : <CloudArrowUp size={32} className="text-gray-400" />}
                      <span className="text-sm font-bold text-navy">{proofFile ? proofFile.name : 'Upload Payslip / Bank Statement'}</span>
                      <span className="text-xs text-gray-400">PDF, JPG or PNG</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setProofFile(e.target.files[0])} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Digital Signature *</label>
                  <SignaturePad onSignature={setSignature} />
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                  <p className="font-bold text-navy text-sm mb-2">DATA COLLECTION NOTICE</p>
                  <p>Bard Loans collects personal data for clients which includes name, contact details, employment details, income, expenses and references for the purposes of verifying client identity and assessing credit worthiness. Clients information may be shared with third party service providers, credit bureaus and regulatory authorities as required by law. Clients have the right to access, correct or delete their data by contacting dpo@bardsantner.com.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-primary accent-primary cursor-pointer" />
                  <span className="text-sm text-gray-600">
                    I confirm that the information submitted belongs to me, the applicant, and I hereby give explicit, informed, and voluntary consent to Bard Loans to collect, process, and store my personal data for the purposes stated above.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
              <WarningCircle size={18} weight="bold" />
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-navy font-bold text-sm uppercase tracking-wide hover:text-primary transition-colors cursor-pointer">
                <ArrowLeft size={18} weight="bold" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => canProceed() && setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-extrabold text-sm uppercase tracking-wide transition-all ${
                  canProceed() ? 'bg-primary text-white shadow-lg hover:scale-105 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight size={18} weight="bold" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-sm uppercase tracking-wide transition-all ${
                  canProceed() && !submitting ? 'bg-primary text-white shadow-lg hover:scale-105 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {submitting ? 'Submitting...' : <>Submit Application <PaperPlaneTilt size={18} weight="bold" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
