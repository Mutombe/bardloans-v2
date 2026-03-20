import { motion } from 'framer-motion'
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
    <footer className="bg-navy-dark text-white relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Bard Loans" className="h-8 sm:h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/30 text-xs leading-relaxed mb-5 max-w-xs">
              Fast, easy loans with same-day approval. Bard Santner Investors — your trusted lending partner in South Africa.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: WhatsappLogo, href: 'https://wa.me/27676151569' },
                { Icon: FacebookLogo, href: '#' },
                { Icon: InstagramLogo, href: '#' },
                { Icon: LinkedinLogo, href: '#' },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-mint/15 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon size={18} weight="regular" className="text-white/40 hover:text-mint" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 sm:mb-6">Navigation</h4>
            <ul className="space-y-2.5">
              {navigation.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/30 hover:text-mint text-xs transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 sm:mb-6">Legal</h4>
            <ul className="space-y-2.5">
              {legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/30 hover:text-mint text-xs transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 sm:mb-6">Contact</h4>
            <ul className="space-y-3">
              {contact.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-2.5 text-white/30 hover:text-mint text-xs transition-colors duration-300 group"
                  >
                    <item.icon size={14} weight="regular" className="text-mint/50 group-hover:text-mint mt-0.5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/20 text-[10px] text-center sm:text-left">
              Offered by Bard Santner Investors authorised financial services provider and registered credit provider NCRCP12840
            </p>
            <p className="text-white/20 text-[10px]">
              &copy; {new Date().getFullYear()} Bard Loans. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
