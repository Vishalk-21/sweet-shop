import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { authAPI } from '../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const setAuth = useStore((state) => state.setAuth)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await authAPI.register({ name, email, password })
      const { user, token } = response.data
      
      setAuth(user, token)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
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
        <h1 className="text-4xl font-bold text-center text-gold-400 mb-8">Join Us!</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-600 text-white p-3 rounded-lg mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-cream-200 block mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-cream-200 rounded-lg border-2 border-gold-400 focus:outline-none focus:border-gold-300"
              placeholder="Your name"
              required
              disabled={loading}
            />
          </div>

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
            {loading ? 'Creating account...' : 'Register'}
          </motion.button>
        </form>

        <p className="text-center text-cream-200 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 font-bold">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
