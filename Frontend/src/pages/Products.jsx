import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  const categories = ['All', 'Cakes', 'Donuts', 'Cupcakes', 'Pastries', 'Brownies','Sweets','Namkeen']

  useEffect(() => {
    fetchProducts()
  }, [search, category])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category !== 'All') params.category = category

      const response = await productAPI.getAllProducts(params)
      setProducts(response.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
          >
            🍰 Our Delicious Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Explore our wide range of fresh sweets and desserts, handcrafted with love
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.input
            type="text"
            placeholder="🔍 Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 200, 50, 0.3)' }}
            className="w-full px-6 py-4 bg-gray-800/80 backdrop-blur text-gray-100 rounded-lg border-2 border-yellow-400/30 hover:border-yellow-400/50 focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder-gray-500 text-lg"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
                category === cat
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg'
                  : 'bg-gray-800/60 text-yellow-300 hover:bg-gray-800 border border-yellow-400/30 hover:border-yellow-400/60'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-6xl mb-4"
            >
              🍰
            </motion.div>
            <p className="text-xl text-gray-300">Loading delicious treats...</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 100, damping: 20 }
                    }
                  }}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-3xl mb-4">🔍</p>
                <p className="text-2xl text-gray-300 mb-4">No products found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
