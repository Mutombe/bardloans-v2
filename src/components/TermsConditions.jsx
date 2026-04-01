import { X } from '@phosphor-icons/react'

const sections = [
  { title: '1. Introduction', text: 'These Terms and Conditions govern your use of the Bard Loans website and loan services provided by Bard Santner Investors SA (NCRCP12840), an authorised financial services provider. By accessing our website or applying for a loan, you agree to be bound by these terms.' },
  { title: '2. Eligibility', items: ['You must be at least 18 years old.','You must be a South African citizen or permanent resident with a valid SA ID or passport.','You must have a verifiable source of income.','You must provide accurate and truthful information in your application.'] },
  { title: '3. Loan Products and Terms', items: ['Loan amounts range from R500 to R350,000 depending on the product type.','Repayment periods range from 1 to 6 months depending on the loan.','Interest rate: 5% per month on the loan amount.','Initiation fee: 5% once-off on the loan amount.','Service fee: 10% per month on the loan amount.','All fees are disclosed upfront via our loan calculator before application.'] },
  { title: '4. Application and Approval', text: 'All loan applications are subject to affordability assessment and credit checks. Bard Santner Investors SA reserves the right to approve or decline any application at its sole discretion. Same-day approval is subject to complete documentation and verification.' },
  { title: '5. Repayment Obligations', items: ['Borrowers must repay the full amount (principal plus fees) within the agreed repayment period.','Monthly instalments are due on the agreed date each month.','Late payments may incur additional charges and may be reported to credit bureaus.','Early repayment is permitted without penalty.'] },
  { title: '6. Collateral', text: 'For collateral-based loans, the borrower pledges assets (vehicles, machinery, or other approved assets) as security. In the event of default, Bard Santner Investors SA reserves the right to recover the outstanding amount through the pledged collateral in accordance with applicable law.' },
  { title: '7. Data Protection', text: 'Your personal data is processed in accordance with our Privacy Policy and the Protection of Personal Information Act (POPIA). By using our services, you consent to the collection, processing, and storage of your personal data as described in our Privacy Policy.' },
  { title: '8. Intellectual Property', text: 'All content on the Bard Loans website, including text, graphics, logos, images, and software, is the property of Bard Santner Investors SA and is protected by intellectual property laws. Unauthorised use is prohibited.' },
  { title: '9. Limitation of Liability', text: 'Bard Santner Investors SA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the loan amount in question.' },
  { title: '10. Dispute Resolution', text: 'Any disputes arising from these terms shall first be addressed through our internal complaints procedure. If unresolved, disputes may be referred to the National Credit Regulator (NCR) or resolved through mediation/arbitration in accordance with South African law.' },
  { title: '11. Amendments', text: 'Bard Santner Investors SA reserves the right to amend these Terms and Conditions at any time. Changes will be published on our website and will take effect immediately upon publication.' },
  { title: '12. Governing Law', text: 'These Terms and Conditions are governed by the laws of the Republic of South Africa.' },
]

export default function TermsConditions({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Sticky header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-extrabold text-navy uppercase">Terms & Conditions</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-6">
          <p className="text-primary font-bold text-base mb-1">Bard Santner Investors SA</p>
          <p className="text-gray-400 text-xs mb-6">Effective Date: March 2026 | Registered Credit Provider: NCRCP12840</p>

          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-base font-extrabold text-navy uppercase mb-2">{s.title}</h3>
                {s.text && <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>}
                {s.items && (
                  <ul className="space-y-1">
                    {s.items.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm leading-relaxed flex gap-2">
                        <span className="text-primary font-bold">•</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-base font-extrabold text-navy uppercase mb-2">Contact Us</h3>
            <p className="text-gray-600 text-sm">Bard Santner Investors SA</p>
            <p className="text-gray-600 text-sm">2nd Floor Bowmans Building, 11 Alice Lane, Sandton, 2196</p>
            <p className="text-gray-600 text-sm">Tel: 067 615 1569 | Email: <a href="mailto:info@bardloans.co.za" className="text-primary hover:underline">info@bardloans.co.za</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
