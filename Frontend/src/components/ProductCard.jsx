import { motion } from 'framer-motion'
import { useStore } from '../store/store'

export default function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart)

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-900 rounded-lg overflow-hidden glow group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gold-500 text-gray-900 px-3 py-1 rounded-full font-bold">
          ₹{product.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gold-400 mb-2">{product.name}</h3>
        <p className="text-cream-200 text-sm mb-4">{product.description}</p>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="text-xs bg-gray-800 text-gold-300 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product)}
          className="w-full bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold py-2 rounded-lg transition"
        >
          Add to Cart 🛒
        </motion.button>
      </div>
    </motion.div>
  )
}
