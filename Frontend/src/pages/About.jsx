import { motion } from 'framer-motion'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80 flex items-center justify-center overflow-hidden mb-20"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
            alt="Sweet Shop"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gold-400 mb-4"
          >
            About Kallu Sweet House
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-cream-200"
          >
            Where Tradition Meets Taste
          </motion.p>
        </motion.div>
      </motion.section>

      {/* About Content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 py-20"
      >
        {/* Main About Text */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gold-400/30 backdrop-blur-sm"
        >
          <motion.div
            variants={itemVariants}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-8 text-center">
              Welcome to Kallu Sweet House
            </h2>

            <p className="text-lg md:text-xl text-cream-100 leading-8 mb-8 text-justify">
              Welcome to Kallu Sweet House, where tradition meets taste. For years, we have been serving freshly prepared sweets made with the finest ingredients and authentic recipes. Our passion is to bring the rich flavors of Indian sweets to every celebration, festival, and special moment.
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-gold-400 mb-6 mt-12">
              Our Specialty
            </h3>

            <p className="text-lg md:text-xl text-cream-100 leading-8 mb-8 text-justify">
              From delicious laddoos and mouth-watering rasgullas to premium kaju katli and traditional milk sweets, every product is crafted with care, purity, and love. We maintain the highest standards of quality and hygiene to ensure that every bite delivers happiness and satisfaction.
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-gold-400 mb-6 mt-12">
              Our Philosophy
            </h3>

            <p className="text-lg md:text-xl text-cream-100 leading-8 mb-8 text-justify">
              At Kallu Sweet House, we believe sweets are more than just desserts, they are a part of our culture, emotions, and cherished memories. Whether you are celebrating a wedding, birthday, festival, or simply craving something sweet, we are here to make every occasion special.
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-gold-400 mb-6 mt-12">
              Thank You
            </h3>

            <p className="text-lg md:text-xl text-cream-100 leading-8 text-justify">
              Thank you for choosing Kallu Sweet House. We look forward to serving you with sweetness, quality, and trust.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              title: "Authentic Recipes",
              description: "Traditional recipes passed down through generations"
            },
            {
              title: "Premium Ingredients",
              description: "Only the finest and purest ingredients used"
            },
            {
              title: "Highest Quality",
              description: "Maintained standards of quality and hygiene"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(255, 195, 69, 0.3)' }}
              className="bg-gray-800/50 rounded-xl p-8 border border-gold-400/30 text-center backdrop-blur-sm transition"
            >
              <h4 className="text-2xl font-bold text-gold-400 mb-4">
                {feature.title}
              </h4>
              <p className="text-cream-200 text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <a href="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 195, 69, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold text-lg rounded-lg transition"
            >
              Explore Our Products
            </motion.button>
          </a>
        </motion.div>
      </motion.section>

      {/* Owner Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="bg-gray-800/50 py-20"
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gold-400"
          >
            Meet Our Owner
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Owner Photo */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center"
            >
              <img
                src="/owner.jpeg"
                alt="Kallu Prasad - Owner"
                className="rounded-xl shadow-2xl border-4 border-gold-400 max-w-md w-full"
              />
            </motion.div>

            {/* Owner Description */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 rounded-xl p-8 border border-gold-400/30"
            >
              <h3 className="text-3xl font-bold text-gold-400 mb-6">Kallu Prasad</h3>
              
              <p className="text-lg md:text-xl text-cream-100 leading-8">
                With a passion for quality and tradition, Kallu Prasad founded Kallu Sweet House with the goal of bringing authentic Indian sweets to every home. His dedication to excellence, customer satisfaction, and traditional recipes has made Kallu Sweet House a trusted name in the community.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-gold-400">✓</span>
                  <div>
                    <h4 className="text-xl font-bold text-gold-400">Quality Assurance</h4>
                    <p className="text-cream-200">Only the finest ingredients and authentic recipes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-gold-400">✓</span>
                  <div>
                    <h4 className="text-xl font-bold text-gold-400">Customer Focus</h4>
                    <p className="text-cream-200">Dedicated to customer satisfaction</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-gold-400">✓</span>
                  <div>
                    <h4 className="text-xl font-bold text-gold-400">Traditional Excellence</h4>
                    <p className="text-cream-200">Preserving authentic Indian sweet-making traditions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto px-4 py-20"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Watch Our Story
          </h2>
          <p className="text-xl text-cream-200">
            Discover what makes Kallu Sweet House special
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gold-400/30 backdrop-blur-sm shadow-2xl"
        >
          <video
            controls
            className="w-full h-auto"
            poster="/video-poster.jpg"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.section>
    </div>
  )
}
