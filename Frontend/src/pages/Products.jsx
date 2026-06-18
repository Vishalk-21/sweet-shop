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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold text-center text-gold-400 mb-4"
        >
          Our Delicious Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center text-cream-200 mb-12"
        >
          Explore our wide range of fresh sweets and desserts
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 bg-gray-800 text-cream-200 rounded-lg border-2 border-gold-400 focus:outline-none focus:border-gold-300"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 mb-12 overflow-x-auto pb-4"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                category === cat
                  ? 'bg-gold-500 text-gray-900'
                  : 'bg-gray-800 text-gold-400 hover:bg-gray-700'
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
            className="text-center py-12"
          >
            <p className="text-2xl text-cream-200">Loading products...</p>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-2xl text-cream-200">No products found</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
