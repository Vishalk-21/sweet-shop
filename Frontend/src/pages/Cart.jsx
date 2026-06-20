import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/store'
import { Link, useNavigate } from 'react-router-dom'
import { orderAPI } from '../services/api'

export default function Cart() {
  const cart = useStore((state) => state.cart)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const clearCart = useStore((state) => state.clearCart)
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(total * 0.18)
  const finalTotal = total + tax

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const items = cart.map(item => ({
        product_id: item._id,
        quantity: item.quantity
      }))

      await orderAPI.createOrder({ items })
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🛒 Shopping Cart
          </h1>
          <p className="text-gray-400">Manage your delicious orders</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 flex items-start gap-2"
          >
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-yellow-400/20"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🛍️
            </motion.div>
            <p className="text-3xl text-gray-300 mb-2 font-bold">Your cart is empty</p>
            <p className="text-gray-400 mb-8">Add some delicious items to get started!</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255, 200, 50, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-10 py-4 rounded-full font-bold text-lg"
              >
                Continue Shopping 🛒
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="space-y-4"
              >
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0, x: -30, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        scale: 1,
                        transition: { type: 'spring', stiffness: 100, damping: 20 }
                      }
                    }}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(255, 200, 50, 0.2)' }}
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-xl flex gap-6 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg shadow-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm">{item.category}</p>
                      <p className="text-2xl font-bold text-yellow-400">₹{item.price}</p>

                      {/* Quantity Controls */}
                      <motion.div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="bg-gray-900/60 hover:bg-gray-900 text-yellow-400 px-4 py-2 rounded-lg disabled:opacity-30 transition"
                        >
                          −
                        </motion.button>
                        <span className="text-gray-300 px-6 py-2 bg-gray-900/30 rounded-lg font-semibold">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="bg-gray-900/60 hover:bg-gray-900 text-yellow-400 px-4 py-2 rounded-lg transition"
                        >
                          +
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="text-right flex flex-col justify-between">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          ₹{item.price * item.quantity}
                        </p>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgb(220, 38, 38)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        🗑️ Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-2xl h-fit sticky top-24 border border-yellow-400/20 shadow-2xl backdrop-blur"
            >
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                📋 Order Summary
              </h2>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 mb-8 border-b border-yellow-400/30 pb-8"
              >
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex justify-between text-gray-300"
                >
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{total}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex justify-between text-gray-300"
                >
                  <span>Shipping:</span>
                  <span className="text-green-400 font-semibold">FREE 🚚</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex justify-between text-gray-300"
                >
                  <span>Tax (18%):</span>
                  <span className="font-semibold">₹{tax}</span>
                </motion.div>
              </motion.div>

              <div className="flex justify-between text-2xl font-bold mb-8 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                <span className="text-gray-100">Total:</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ₹{finalTotal}
                </span>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(255, 200, 50, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 rounded-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
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
                  `${isLoggedIn ? '✓ Place Order' : '🔐 Login to Checkout'}`
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCart}
                className="w-full bg-red-600/70 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
              >
                🗑️ Clear Cart
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
