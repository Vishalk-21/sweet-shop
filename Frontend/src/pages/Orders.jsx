import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { orderAPI } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [isLoggedIn, navigate])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await orderAPI.getMyOrders()
      setOrders(response.data.orders || [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-600'
      case 'Accepted':
        return 'bg-blue-600'
      case 'Preparing':
        return 'bg-purple-600'
      case 'Ready':
        return 'bg-orange-600'
      case 'Delivered':
        return 'bg-green-600'
      case 'Cancelled':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold text-gold-400 mb-12"
        >
          My Orders 📦
        </motion.h1>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-cream-200">Loading orders...</p>
          </motion.div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-gray-800 rounded-lg"
          >
            <p className="text-2xl text-cream-200">No orders yet</p>
            <p className="text-cream-300 mt-2">Start shopping to place your first order!</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            {orders.map((order) => (
              <motion.div
                key={order._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-gray-800 p-6 rounded-lg glow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gold-400">Order #{order._id.slice(-8)}</h3>
                    <p className="text-cream-300 text-sm mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <span className={`${getStatusColor(order.status)} text-white px-4 py-2 rounded-full font-bold`}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-4 pb-4 border-b border-gold-400">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-cream-200 py-2">
                      <div>
                        <p>{item.product_id?.name || 'Product'}</p>
                        <p className="text-sm text-cream-300">Qty: {item.quantity}</p>
                      </div>
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-cream-300">Total Amount</p>
                    <p className="text-3xl font-bold text-gold-400">₹{order.total_amount}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-gold-500 hover:bg-gold-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
