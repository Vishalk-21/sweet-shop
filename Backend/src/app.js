const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const authRoutes = require('./routes/auth.route')
const productRoutes = require('./routes/product.route')
const orderRoutes = require('./routes/order.route')
const messageRoutes = require('./routes/message.route')

// CORS Configuration
const configuredOrigins = (process.env.FRONTEND_URL || process.env.CLIENT_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5174',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            ...configuredOrigins
        ]
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    })
})

app.use('/api/auth', authRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', messageRoutes)

module.exports = app
