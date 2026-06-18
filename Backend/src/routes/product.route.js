const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')
const { upload, uploadToImageKit } = require('../middleware/imagekit.middleware')
const { verifyAdmin } = require('../middleware/auth.middleware')

// Customer Routes
router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getProductById)

// Admin Routes
router.get('/admin/products', verifyAdmin, productController.getAllAdminProducts)
router.post('/admin/products', verifyAdmin, upload.single('image'), uploadToImageKit, productController.createProduct)
router.put('/admin/products/:id', verifyAdmin, upload.single('image'), uploadToImageKit, productController.updateProduct)
router.delete('/admin/products/:id', verifyAdmin, productController.deleteProduct)

module.exports = router
