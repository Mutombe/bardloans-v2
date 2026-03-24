import { EnvelopeSimple, Phone, MapPin, LinkedinLogo, FacebookLogo, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Offerings', href: '#offerings' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
]

const legal = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
  { name: 'Contact Policy', href: '#' },
  { name: 'POPIA Compliance', href: '#' },
]

const contact = [
  { icon: EnvelopeSimple, text: 'info@bardloans.co.za', href: 'mailto:info@bardloans.co.za' },
  { icon: EnvelopeSimple, text: 'apply@bardloans.co.za', href: 'mailto:apply@bardloans.co.za' },
  { icon: WhatsappLogo, text: '067 615 1569', href: 'https://wa.me/27676151569' },
  { icon: Phone, text: '010 017 6996', href: 'tel:0100176996' },
  { icon: MapPin, text: '2nd Floor Bowmans Building, 11 Alice Lane, Sandton, 2196', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Bard Loans" className="h-9 w-auto mb-4 brightness-0 invert" loading="eager" />
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Fast, easy loans with same-day approval. Your trusted lending partner in South Africa.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: WhatsappLogo, href: 'https://wa.me/27676151569' },
                { Icon: FacebookLogo, href: '#' },
                { Icon: InstagramLogo, href: '#' },
                { Icon: LinkedinLogo, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Icon size={18} className="text-gray-400 hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {navigation.map((link) => (
                <li key={link.name}><a href={link.href} className="text-gray-400 hover:text-primary text-sm transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-2.5">
              {legal.map((link) => (
                <li key={link.name}><a href={link.href} className="text-gray-400 hover:text-primary text-sm transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3">
              {contact.map((item, i) => (
                <li key={i}>
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-start gap-2.5 text-gray-400 hover:text-primary text-sm transition-colors group">
                    <item.icon size={15} className="text-primary/70 group-hover:text-primary mt-0.5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              Bard Santner Investors authorised financial services provider and registered credit provider NCRCP12840
            </p>
            <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Bard Loans. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
