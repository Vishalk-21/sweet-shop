const mongoose = require('mongoose')

async function connectDB() {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

    if (!mongoUri) {
        console.error('MongoDB connection string missing. Set MONGO_URI or MONGODB_URI.')
        return false
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        })
        console.log('MongoDB connected')
        return true
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
        return false
    }
}

module.exports = connectDB
