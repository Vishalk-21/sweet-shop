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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold text-gold-400 mb-12"
        >
          Shopping Cart 🛒
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-600 text-white p-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-gray-800 rounded-lg"
          >
            <p className="text-3xl text-cream-200 mb-6">Your cart is empty</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gold-500 hover:bg-gold-600 text-gray-900 px-8 py-3 rounded-lg font-bold"
              >
                Continue Shopping
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
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="space-y-4"
              >
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="bg-gray-800 p-4 rounded-lg flex gap-4 glow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gold-400">{item.name}</h3>
                      <p className="text-cream-200">₹{item.price}</p>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="bg-gray-700 text-gold-400 px-3 py-1 rounded disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-cream-200 px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="bg-gray-700 text-gold-400 px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gold-400 mb-4">
                        ₹{item.price * item.quantity}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 p-6 rounded-lg h-fit glow sticky top-20"
            >
              <h2 className="text-2xl font-bold text-gold-400 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-gold-400 pb-6">
                <div className="flex justify-between text-cream-200">
                  <span>Subtotal:</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Shipping:</span>
                  <span className="text-gold-400">FREE</span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Tax (18%):</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gold-400 mb-8">
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold py-3 rounded-lg mb-3 disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isLoggedIn ? 'Place Order' : 'Login to Checkout')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
              >
                Clear Cart
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
