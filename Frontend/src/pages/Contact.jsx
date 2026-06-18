import { motion } from 'framer-motion'
import { useState } from 'react'
import { messageAPI } from '../services/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await messageAPI.createMessage(formData)
      setSuccessMessage('✅ Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setErrorMessage(error.response?.data?.message || 'Failed to send message. Please try again.')
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setLoading(false)
    }
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
            alt="Contact Us"
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
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-cream-200"
          >
            Get in Touch with Kallu Sweet House
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gold-400 mb-8">Contact Information</h2>
            </div>

            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 rounded-lg p-8 border border-gold-400/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-3">
                <span className="text-3xl">📍</span> Our Location
              </h3>
              <p className="text-lg text-cream-100 leading-8">
                <strong>Kallu Sweet House</strong><br/>
                Dorwa Ramnagar<br/>
                Meja, Prayagraj<br/>
                Pincode: 212305
              </p>
            </motion.div>

            {/* Contact Details Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 rounded-lg p-8 border border-gold-400/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-gold-400 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl text-gold-400">📞</span>
                  <div>
                    <p className="text-cream-200 text-sm">Phone</p>
                    <p className="text-lg text-cream-100 font-semibold">+91 8756086076</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl text-gold-400">✉️</span>
                  <div>
                    <p className="text-cream-200 text-sm">Email</p>
                    <p className="text-lg text-cream-100 font-semibold">kallusweethouse.info@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl text-gold-400">🕐</span>
                  <div>
                    <p className="text-cream-200 text-sm">Working Hours</p>
                    <p className="text-lg text-cream-100 font-semibold">9:00 AM - 9:00 PM (Daily)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-800/50 rounded-lg p-8 border border-gold-400/30 backdrop-blur-sm space-y-6"
          >
            <h3 className="text-2xl font-bold text-gold-400 mb-6">Send us a Message</h3>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-600/80 text-white p-4 rounded-lg text-center font-semibold"
              >
                {successMessage}
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600/80 text-white p-4 rounded-lg text-center font-semibold"
              >
                {errorMessage}
              </motion.div>
            )}

            <div>
              <label htmlFor="name" className="block text-cream-200 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 text-cream-100 border border-gold-400/50 rounded-lg focus:outline-none focus:border-gold-400 transition"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cream-200 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 text-cream-100 border border-gold-400/50 rounded-lg focus:outline-none focus:border-gold-400 transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-cream-200 font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-cream-100 border border-gold-400/50 rounded-lg focus:outline-none focus:border-gold-400 transition"
                placeholder="Your Phone Number"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-cream-200 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-gray-700 text-cream-100 border border-gold-400/50 rounded-lg focus:outline-none focus:border-gold-400 transition resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 195, 69, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold text-lg rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>

        {/* Map Section */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gold-400 mb-8 text-center">Find Us On Map</h2>
          <motion.div
            variants={itemVariants}
            className="rounded-lg overflow-hidden border-4 border-gold-400/50 shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230950.07698461166!2d81.82391458671876!3d25.250564099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398557787bf3cb6d%3A0xdb788c14e786f0b4!2zS2FsbHUgc3dlZXQgRG9yYXZhIE1vZCDgpJXgpLLgpY3gpLLgpYIg4KS44KWN4KS14KWA4KSfIOCkoeCli-CksOCkteCkviDgpK7gpYvgpKEgbXVseWFtIHlhZGF2!5e0!3m2!1sen!2sin!4v1781766100431!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kallu Sweet House Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}
