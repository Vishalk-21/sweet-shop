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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md glow"
      >
        {/* Login Type Toggle */}
        <div className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLoginType('customer')
              setError('')
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition ${
              loginType === 'customer'
                ? 'bg-gold-500 text-gray-900'
                : 'bg-gray-700 text-cream-200 hover:bg-gray-600'
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
            className={`flex-1 py-2 rounded-lg font-bold transition ${
              loginType === 'owner'
                ? 'bg-gold-500 text-gray-900'
                : 'bg-gray-700 text-cream-200 hover:bg-gray-600'
            }`}
          >
            👨‍💼 Owner
          </motion.button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gold-400 mb-2">
          {loginType === 'customer' ? 'Welcome Back!' : 'Owner Portal'}
        </h1>
        <p className="text-center text-cream-200 mb-6 text-sm">
          {loginType === 'customer' 
            ? 'Login to your account to place orders' 
            : 'Access your business dashboard'}
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-600 text-white p-3 rounded-lg mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-cream-200 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-cream-200 rounded-lg border-2 border-gold-400 focus:outline-none focus:border-gold-300"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-cream-200 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-cream-200 rounded-lg border-2 border-gold-400 focus:outline-none focus:border-gold-300"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : `${loginType === 'customer' ? 'Login' : 'Owner Login'}`}
          </motion.button>
        </form>

        {loginType === 'customer' && (
          <p className="text-center text-cream-200 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-400 hover:text-gold-300 font-bold">
              Register here
            </Link>
          </p>
        )}

        {loginType === 'owner' && (
          <p className="text-center text-cream-200 mt-6 text-sm">
            <span className="text-gold-400 font-semibold">⚠️ Owner Account Required</span>
            <br />
            Contact admin for owner account creation
          </p>
        )}
      </motion.div>
    </div>
  )
}
