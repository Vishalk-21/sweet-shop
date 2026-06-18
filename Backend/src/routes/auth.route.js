const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')

router.post('/register', authController.registerUsers)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logout)
router.get('/profile', authController.getProfile)

module.exports = router
