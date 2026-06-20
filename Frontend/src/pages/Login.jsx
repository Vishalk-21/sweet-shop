import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { authAPI } from '../services/api'

export default function Login() {
  const [loginType, setLoginType] = useState('customer') // 'customer' or 'owner'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const setAuth = useStore((state) => state.setAuth)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await authAPI.login({ email, password })
      const { user, token } = response.data
      
      // Check if owner login but user is not owner
      if (loginType === 'owner' && user.role !== 'owner') {
        setError('This account does not have owner privileges')
        setLoading(false)
        return
      }
      
      // Check if customer login but user is owner
      if (loginType === 'customer' && user.role === 'owner') {
        setError('Please use Owner Login for this account')
        setLoading(false)
        return
      }
      
      setAuth(user, token)
      
      // Redirect based on login type
      if (loginType === 'owner') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative z-10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur p-8 md:p-10 rounded-2xl w-full max-w-md border border-yellow-400/20 shadow-2xl"
      >
        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-4 right-4 text-3xl opacity-20"
        >
          🍰
        </motion.div>

        {/* Login Type Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8 bg-gray-800/50 p-1 rounded-xl"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLoginType('customer')
              setError('')
            }}
            className={`flex-1 py-3 rounded-lg font-bold transition duration-300 ${
              loginType === 'customer'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                : 'bg-transparent text-yellow-300 hover:bg-gray-800/50'
            }`}
          >
            👥 Customer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLoginType('owner')
              setError('')
            }}
            className={`flex-1 py-3 rounded-lg font-bold transition duration-300 ${
              loginType === 'owner'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                : 'bg-transparent text-yellow-300 hover:bg-gray-800/50'
            }`}
          >
            👨‍💼 Owner
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {loginType === 'customer' ? 'Welcome! 👋' : 'Owner Portal 🔑'}
          </h1>
          <p className="text-gray-400">
            {loginType === 'customer' 
              ? 'Login to order your favorite sweets' 
              : 'Access your business dashboard'}
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 text-sm flex items-start gap-2"
          >
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-gray-300 block mb-2 font-semibold text-sm">📧 Email</label>
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 200, 50, 0.3)' }}
              className="w-full px-5 py-3 bg-gray-900/50 text-gray-100 rounded-lg border-2 border-yellow-400/30 hover:border-yellow-400/50 focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder-gray-600"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-gray-300 block mb-2 font-semibold text-sm">🔐 Password</label>
            <motion.input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 200, 50, 0.3)' }}
              className="w-full px-5 py-3 bg-gray-900/50 text-gray-100 rounded-lg border-2 border-yellow-400/30 hover:border-yellow-400/50 focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder-gray-600"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 200, 50, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                ⏳
              </motion.span>
            ) : (
              `${loginType === 'customer' ? 'Login' : 'Owner Login'} →`
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        {loginType === 'customer' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-400 mt-8"
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-bold transition">
              Register here
            </Link>
          </motion.p>
        )}

        {loginType === 'owner' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg"
          >
            <p className="text-yellow-400 font-semibold text-sm">⚠️ Owner Account</p>
            <p className="text-gray-400 text-xs mt-1">
              Contact admin for owner account creation
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
