import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { productAPI, orderAPI } from '../services/api'
import { useStore } from '../store/store'

export default function Home() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const { isLoggedIn } = useStore()

  useEffect(() => {
    fetchFeaturedProducts()
    if (isLoggedIn) {
      fetchRecentOrders()
    }
  }, [isLoggedIn])

  const fetchRecentOrders = async () => {
    setOrdersLoading(true)
    try {
      const response = await orderAPI.getMyOrders()
      // Handle both array and object responses
      const ordersArray = Array.isArray(response.data) ? response.data : (response.data?.orders || [])
      setOrders(ordersArray.slice(0, 3))
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      setOrders([])
    } finally {
      setOrdersLoading(false)
    }
  }

  const fetchFeaturedProducts = async () => {
    setLoading(true)
    try {
      const response = await productAPI.getAllProducts({ limit: 4 })
      setProducts(response.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      // Fallback to sample products if API fails
      setProducts([
        {
          _id: '1',
          name: 'Chocolate Cake',
          description: 'Rich and delicious chocolate cake',
          price: 450,
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
          category: 'Cakes'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 25 }
    }
  }

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover opacity-15"
          />
          <motion.div 
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-800"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ float: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-10 text-6xl opacity-30"
        >
          🍰
        </motion.div>
        <motion.div
          animate={{ float: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-10 text-6xl opacity-30"
        >
          🍪
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="mb-6"
          >
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                Kallu Sweet House
              </span>
              <br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl md:text-4xl text-yellow-100 font-light"
              >
                Premium Delights ✨
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-2xl text-yellow-50 mb-8 font-light"
          >
            Freshly prepared sweets made with the finest ingredients
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: '0 0 40px rgba(255, 200, 50, 0.8)',
                  backgroundColor: '#FFC832'
                }}
                whileTap={{ scale: 0.92 }}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg rounded-full transition duration-300 shadow-lg"
              >
                🛒 Shop Now
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ 
                scale: 1.08, 
                boxShadow: '0 0 30px rgba(255, 200, 50, 0.5)',
                borderColor: '#FFC832',
                backgroundColor: 'rgba(255, 200, 50, 0.1)'
              }}
              whileTap={{ scale: 0.92 }}
              className="px-10 py-4 border-2 border-yellow-400 text-yellow-300 font-bold text-lg rounded-full hover:text-gray-900 transition duration-300"
            >
              📖 Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-3xl cursor-pointer"
        >
          ↓
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-24"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
          >
            ✨ Featured Sweets
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300"
          >
            Discover our most loved treats, handcrafted to perfection
          </motion.p>
        </motion.div>

        {loading ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-4xl"
            >
              🍰
            </motion.div>
            <p className="text-gray-400 mt-4">Loading delicious treats...</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product, index) => (
              <motion.div 
                key={product._id} 
                variants={scaleInVariants}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ 
                scale: 1.08, 
                boxShadow: '0 0 40px rgba(255, 200, 50, 0.6)'
              }}
              whileTap={{ scale: 0.92 }}
              className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg rounded-full transition duration-300 shadow-lg"
            >
              🎁 View All Products
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* My Orders Section - Only for Logged In Users */}
      {isLoggedIn && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="bg-gradient-to-b from-gray-800/30 to-gray-900/50 py-24"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              >
                📦 My Recent Orders
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300"
              >
                Track your delicious orders
              </motion.p>
            </motion.div>

            {ordersLoading ? (
              <motion.div variants={itemVariants} className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block text-4xl"
                >
                  📦
                </motion.div>
                <p className="text-gray-400 mt-4">Loading your orders...</p>
              </motion.div>
            ) : orders.length > 0 ? (
              <div className="relative">
                {/* Horizontal Scrollable Container */}
                <div className="overflow-x-auto pb-4 scroll-smooth">
                  <motion.div
                    variants={containerVariants}
                    className="flex gap-8 min-w-max px-4"
                  >
                    {orders.map((order, index) => (
                      <motion.div
                        key={order._id}
                        variants={scaleInVariants}
                        whileHover={{ y: -10, boxShadow: '0 10px 40px rgba(255, 200, 50, 0.2)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/50 transition duration-300 shadow-lg"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-yellow-400">
                              Order #{order._id.toString().slice(-8)}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                              order.status === 'Pending'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : order.status === 'Accepted'
                                ? 'bg-blue-500/20 text-blue-300'
                                : order.status === 'Preparing'
                                ? 'bg-purple-500/20 text-purple-300'
                                : order.status === 'Ready'
                                ? 'bg-orange-500/20 text-orange-300'
                                : order.status === 'Delivered'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {order.status}
                          </motion.span>
                        </div>

                        <div className="mb-4 border-t border-yellow-400/20 pt-4 max-h-24 overflow-y-auto">
                          {order.items && order.items.slice(0, 3).map((item, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex justify-between text-gray-300 text-sm mb-2"
                            >
                              <span className="truncate">{item.product_name || 'Product'}</span>
                              <span className="ml-2 text-yellow-400">x{item.quantity}</span>
                            </motion.div>
                          ))}
                          {order.items && order.items.length > 3 && (
                            <p className="text-gray-400 text-xs mt-2">
                              +{order.items.length - 3} more items
                            </p>
                          )}
                        </div>

                        <div className="border-t border-yellow-400/20 pt-4 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">Total</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                              ₹{order.total_amount}
                            </span>
                          </div>
                        </div>

                        <Link to="/orders">
                          <motion.button
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: '0 0 20px rgba(255, 200, 50, 0.4)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold rounded-lg transition text-sm duration-300"
                          >
                            View Details →
                          </motion.button>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="text-center py-12 text-gray-400"
              >
                <p className="text-lg mb-4">No orders yet</p>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-full"
                  >
                    Start Shopping 🛒
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                              order.status === 'Pending'
                                ? 'bg-yellow-900 text-yellow-300'
                                : order.status === 'Accepted'
                                ? 'bg-blue-900 text-blue-300'
                                : order.status === 'Preparing'
                                ? 'bg-purple-900 text-purple-300'
                                : order.status === 'Ready'
                                ? 'bg-orange-900 text-orange-300'
                                : order.status === 'Delivered'
                                ? 'bg-green-900 text-green-300'
                                : 'bg-red-900 text-red-300'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="mb-4 border-t border-gold-500/20 pt-4 max-h-24 overflow-y-auto">
                          {order.items && order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex justify-between text-cream-200 text-sm mb-1">
                              <span className="truncate">{item.product_name || 'Product'}</span>
                              <span className="ml-2">x{item.quantity}</span>
                            </div>
                          ))}
                          {order.items && order.items.length > 3 && (
                            <p className="text-cream-300 text-xs mt-2">
                              +{order.items.length - 3} more items
                            </p>
                          )}
                        </div>

                        <div className="border-t border-gold-500/20 pt-4 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-cream-200 text-sm">Total</span>
                            <span className="text-xl font-bold text-gold-400">₹{order.total_amount}</span>
                          </div>
                        </div>

                        <Link to="/orders">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold rounded-lg transition text-sm"
                          >
                            View Details
                          </motion.button>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="text-gold-400 text-2xl opacity-50 animate-bounce">→</div>
                </div>
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center text-cream-200 py-12 bg-gray-900 rounded-lg border border-gold-500/20"
              >
                <p className="text-lg mb-4">No orders yet!</p>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold rounded-lg"
                  >
                    Start Shopping
                  </motion.button>
                </Link>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="text-center mt-8"
            >
              <Link to="/orders">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold rounded-lg transition"
                >
                  View All Orders
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="bg-gray-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-16 text-gold-400"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🍰', title: 'Fresh Baked', desc: 'Made fresh daily' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Same day delivery available' },
              { icon: '💯', title: 'Quality Guarantee', desc: 'Premium ingredients only' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 0 30px rgba(255, 195, 69, 0.3)' }}
                className="bg-gray-900 p-8 rounded-lg text-center glow cursor-pointer"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gold-400 mb-2">{feature.title}</h3>
                <p className="text-cream-200">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
