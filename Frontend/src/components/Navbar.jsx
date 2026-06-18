import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store/store'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const cart = useStore((state) => state.cart)
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const user = useStore((state) => state.user)

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-50 border-b-2 border-gold-400"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img 
                src="/kallu-logo.jpeg" 
                alt="Kallu Sweet House" 
                className="h-16 w-auto max-w-xs"
              />
            </motion.div>
            <span className="text-lg md:text-xl font-bold text-gold-400 hidden sm:block">Kallu Sweet House</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Admin Dashboard - Owner Only */}
            {isLoggedIn && user?.role === 'owner' && (
              <Link to="/admin/dashboard">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-400 text-2xl hover:text-purple-300 transition"
                  title="Admin Dashboard"
                >
                  📊
                </motion.button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-gold-400 text-2xl hover:text-gold-300 transition"
              >
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Profile/Login */}
            {isLoggedIn ? (
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-gold-400 text-2xl hover:text-gold-300 transition"
                >
                  👤
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gold-500 hover:bg-gold-600 text-gray-900 px-4 py-2 rounded-lg font-semibold transition"
                >
                  Login
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gold-400 text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 flex flex-col gap-4"
          >
            {isLoggedIn && user?.role === 'owner' && (
              <NavLink to="/admin/dashboard">📊 Dashboard</NavLink>
            )}
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ to, children }) {
  return (
    <Link to={to}>
      <motion.span
        whileHover={{ color: '#ffb400' }}
        className="text-cream-200 hover:text-gold-400 transition cursor-pointer"
      >
        {children}
      </motion.span>
    </Link>
  )
}
