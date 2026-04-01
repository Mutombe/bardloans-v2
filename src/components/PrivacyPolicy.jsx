import { X } from '@phosphor-icons/react'

const sections = [
  { title: '1. Information We Collect', items: ['Personal Identifiers: Name, ID number, passport number, and date of birth.','Contact Information: Address, phone numbers, and email addresses.','Financial Information: Bank account details, transaction history, and credit scores.','Digital Data: IP addresses, browser type, cookies, and online banking activity.','Sensitive Data: Biometric data and health-related data for specific services, with safeguards as per applicable law.','Children\'s Data: No collection without parental consent.','Location Data: Collected strictly for fraud prevention and security.','Third-Party Sources: We may collect data from partners, service providers, professional representatives, and regulatory authorities, all under lawful compliance.'] },
  { title: '2. How We Use Your Data', items: ['Service delivery','Legal compliance','Fraud prevention','Marketing and personalization (with consent)','Security monitoring'], note: 'Lawful Basis: Consent, contract performance, compliance with law, and legitimate interests (e.g., fraud prevention).' },
  { title: '3. Data Sharing', text: 'We may share your data with regulatory authorities, service providers, partner institutions, and other parties as required by law. All third parties are bound by confidentiality agreements and data protection compliance.' },
  { title: '4. Data Retention', items: ['Personal Identifiers: Up to 7 years after account closure.','Financial Records: 7 years (regulatory compliance).','Sensitive Data: Retained only as long as necessary.'] },
  { title: '5. Your Rights', items: ['Access, correction, and deletion of your data','Objection to processing','Right to be informed','Consent management','Right to complain to the Data Protection Authority','Right not to be subjected to automated processing'] },
  { title: '6. Security Measures', text: 'We apply encryption, access controls, audits, penetration testing, and 24/7 monitoring to protect your data.' },
  { title: '7. Cookies and Tracking', text: 'Cookies are used for secure login, analytics, and user experience. Preferences can be managed via browser settings.' },
  { title: '8. International Data Transfers', text: 'Data may be transferred internationally with appropriate safeguards in place to protect your information.' },
  { title: '9. Updates to this Policy', text: 'We may update this policy periodically. The latest version will always be available on our website.' },
]

export default function PrivacyPolicy({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Sticky header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-extrabold text-navy uppercase">Privacy Policy</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-6">
          <p className="text-primary font-bold text-base mb-4">Bard Santner Investors SA</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            At Bard Santner Investors SA, we are committed to protecting your privacy and ensuring the security of your personal information. We process personal data in compliance with the Protection of Personal Information Act (POPIA) and all applicable South African data protection legislation.
          </p>

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
                {s.note && <p className="text-gray-400 text-xs mt-2 italic">{s.note}</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-base font-extrabold text-navy uppercase mb-2">10. Contact Us</h3>
            <p className="text-gray-600 text-sm">Bard Santner Investors SA</p>
            <p className="text-gray-600 text-sm">2nd Floor Bowmans Building, 11 Alice Lane, Sandton, 2196</p>
            <p className="text-gray-600 text-sm">Tel: 067 615 1569 | Email: <a href="mailto:info@bardloans.co.za" className="text-primary hover:underline">info@bardloans.co.za</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
