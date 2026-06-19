require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Import models
const User = require('./src/model/user.model')

async function createOwnerAccount() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
        console.log('MongoDB connected')

        // Check if owner already exists
        const existingOwner = await User.findOne({ email: 'owner@sweetshop.com' })
        if (existingOwner) {
            console.log('Owner account already exists!')
            await mongoose.connection.close()
            return
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('Owner@123', 10)

        // Create owner user
        const owner = new User({
            name: 'Sweet Shop Owner',
            email: 'owner@sweetshop.com',
            password: hashedPassword,
            role: 'owner'
        })

        await owner.save()
        console.log('✅ Owner account created successfully!')
        console.log('Email: owner@sweetshop.com')
        console.log('Password: Owner@123')

        await mongoose.connection.close()
    } catch (error) {
        console.error('❌ Error creating owner account:', error.message)
        process.exit(1)
    }
}

createOwnerAccount()
