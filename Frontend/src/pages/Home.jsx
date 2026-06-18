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
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-4"
          >
            <span className="text-gold-400">Kallu Sweet House</span>
            <br />
            <span className="text-cream-200">Premium Delights</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-cream-200 mb-8"
          >
            Freshly prepared sweets made with finest ingredients
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 195, 69, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold text-lg rounded-lg transition"
              >
                Shop Now
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 195, 69, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-gold-400 text-gold-400 font-bold text-lg rounded-lg hover:bg-gold-400 hover:text-gray-900 transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold-400 text-3xl"
        >
          ↓
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl font-bold text-center mb-4 text-gold-400"
        >
          Featured Sweets
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-cream-200 mb-16"
        >
          Check out our most loved treats
        </motion.p>

        {loading ? (
          <motion.p variants={itemVariants} className="text-center text-cream-200">
            Loading products...
          </motion.p>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold rounded-lg transition"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* My Orders Section - Only for Logged In Users */}
      {isLoggedIn && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="bg-gray-800/50 py-20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-center mb-4 text-gold-400"
            >
              My Recent Orders 📦
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-center text-cream-200 mb-12"
            >
              Track your delicious orders
            </motion.p>

            {ordersLoading ? (
              <motion.p variants={itemVariants} className="text-center text-cream-200">
                Loading your orders...
              </motion.p>
            ) : orders.length > 0 ? (
              <div className="relative">
                {/* Horizontal Scrollable Container */}
                <div className="overflow-x-auto pb-4 scroll-smooth">
                  <motion.div
                    variants={containerVariants}
                    className="flex gap-6 min-w-max px-4"
                  >
                    {orders.map((order) => (
                      <motion.div
                        key={order._id}
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255, 195, 69, 0.3)' }}
                        className="flex-shrink-0 w-80 bg-gray-900 rounded-lg p-6 glow border border-gold-500/30"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gold-400">
                              Order #{order._id.toString().slice(-8)}
                            </h3>
                            <p className="text-xs text-cream-300">
                              {new Date(order.createdAt).toLocaleDateString()}
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
