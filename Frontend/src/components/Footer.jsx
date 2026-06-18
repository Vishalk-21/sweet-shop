import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-gray-900 border-t-2 border-gold-400 py-12 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">Kallu Sweet House</h3>
            <p className="text-cream-200 text-sm">Freshly prepared sweets made with finest ingredients and authentic recipes, delivering happiness with every bite.</p>
          </div>

          <div>
            <h4 className="text-gold-400 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream-200 text-sm">
              <li><a href="/" className="hover:text-gold-400 transition">Home</a></li>
              <li><a href="/products" className="hover:text-gold-400 transition">Products</a></li>
              <li><a href="/about" className="hover:text-gold-400 transition">About</a></li>
              <li><a href="/contact" className="hover:text-gold-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-cream-200 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-bold mb-4">Contact Us</h4>
            <p className="text-cream-200 text-sm mb-2">📧 kallusweethouse.info@gmail.com</p>
            <p className="text-cream-200 text-sm mb-2">📱 +91 8756086076</p>
            <p className="text-cream-200 text-sm mb-2">📍 Dorwa Ramnagar, Meja, Prayagraj 212305</p>
            <p className="text-cream-200 text-sm">🕐 Open: Daily, 9AM-9PM</p>
          </div>
        </div>

        <div className="border-t border-gold-400 pt-8 text-center text-cream-300 text-sm">
          <p>&copy; {currentYear} Kallu Sweet House. All rights reserved. | Made with ❤️</p>
        </div>
      </div>
    </motion.footer>
  )
}
