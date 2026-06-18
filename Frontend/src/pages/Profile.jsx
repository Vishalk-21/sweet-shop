import { motion } from 'framer-motion'
import { useStore } from '../store/store'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
        <p className="text-2xl text-cream-200">Please login to view your profile</p>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-lg glow"
        >
          <h1 className="text-4xl font-bold text-gold-400 mb-8">My Profile</h1>

          <div className="space-y-6">
            <div>
              <label className="text-cream-300 block mb-2 font-semibold">Name</label>
              <p className="text-cream-200 text-lg">{user.name}</p>
            </div>

            <div>
              <label className="text-cream-300 block mb-2 font-semibold">Email</label>
              <p className="text-cream-200 text-lg">{user.email}</p>
            </div>

            {user.role === 'owner' && (
              <div>
                <label className="text-cream-300 block mb-2 font-semibold">Role</label>
                <p className="text-gold-400 text-lg font-bold">👑 Admin Owner</p>
              </div>
            )}

            <div className="pt-6 border-t border-gold-400 space-y-4">
              {user.role === 'owner' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/admin/dashboard')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  📊 Go to Admin Dashboard
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold py-3 rounded-lg"
              >
                Edit Profile
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-cream-200 font-bold py-3 rounded-lg"
              >
                Change Password
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
