const express = require('express')
const router = express.Router()
const orderController = require('../controller/order.controller')
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware')

// Customer Routes
router.post('/orders', verifyToken, orderController.createOrder)
router.get('/orders/my', verifyToken, orderController.getMyOrders)
router.get('/orders/:id', verifyToken, orderController.getOrderById)

// Admin Routes
router.get('/admin/orders', verifyAdmin, orderController.getAllOrders)
router.put('/admin/orders/:id/status', verifyAdmin, orderController.updateOrderStatus)
router.get('/admin/dashboard/stats', verifyAdmin, orderController.getDashboardStats)

module.exports = router
