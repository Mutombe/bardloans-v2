import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsappLogo, X } from '@phosphor-icons/react'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!tooltip) return
    const timer = setTimeout(() => setTooltip(false), 8000)
    return () => clearTimeout(timer)
  }, [tooltip])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl shadow-black/10 px-4 py-2.5 max-w-[180px] relative"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <X size={10} weight="bold" />
            </button>
            <p className="text-navy text-xs font-semibold leading-snug">
              Need help? Chat with us on WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/27676151569?text=Hi%20Bard%20Loans%2C%20I%27d%20like%20to%20apply%20for%20a%20loan.%20Please%20assist%20me."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
      >
        <WhatsappLogo size={28} weight="fill" className="text-white" />
      </motion.a>
    </div>
  )
}
