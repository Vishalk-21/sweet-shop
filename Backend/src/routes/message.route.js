const express = require('express')
const router = express.Router()
const messageController = require('../controller/message.controller')
const { verifyAdmin } = require('../middleware/auth.middleware')

// Customer Routes
router.post('/messages', messageController.createMessage)

// Admin Routes
router.get('/admin/messages/stats', verifyAdmin, messageController.getMessageStats)
router.get('/admin/messages', verifyAdmin, messageController.getAllMessages)
router.get('/admin/messages/:id', verifyAdmin, messageController.getMessageById)
router.put('/admin/messages/:id/status', verifyAdmin, messageController.updateMessageStatus)
router.delete('/admin/messages/:id', verifyAdmin, messageController.deleteMessage)

module.exports = router
