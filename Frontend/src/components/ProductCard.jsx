import { motion } from 'framer-motion'
import { useStore } from '../store/store'

export default function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
    hover: {
      y: -15,
      boxShadow: '0 20px 60px rgba(255, 200, 50, 0.3)',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, transition: { duration: 0.4 } }
  }

  const badgeVariants = {
    initial: { opacity: 0, y: -10 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden cursor-pointer border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-900">
        <motion.img
          src={product.image}
          alt={product.name}
          variants={imageVariants}
          initial="initial"
          whileHover="hover"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
        />
        
        {/* Price Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        >
          ₹{product.price}
        </motion.div>

        {/* Sale Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: -5 }}
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
        >
          BESTSELLER ⭐
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
        >
          {product.name}
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-300 text-sm mb-4 h-10 overflow-hidden"
        >
          {product.description}
        </motion.p>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block text-xs bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full font-medium border border-yellow-400/30">
            {product.category}
          </span>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ 
            scale: 1.08,
            boxShadow: '0 0 30px rgba(255, 200, 50, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            addToCart(product)
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-sm"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            🛒
          </motion.span>
          <span>Add to Cart</span>
        </motion.button>

        {/* Quick View Link */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="mt-3 overflow-hidden"
        >
          <button className="w-full text-center text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors">
            Quick View →
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
