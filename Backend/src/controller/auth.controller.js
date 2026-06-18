const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'

function createToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    )
}

async function registerUsers(req, res) {
    try {
        const { name, email, phone, password, role = 'customer' } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' })
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, ...(phone ? [{ phone }] : [])]
        })

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            phone,
            password: hash,
            role
        })

        const token = createToken(user)

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Registration error:', error)
        return res.status(500).json({ message: 'Registration failed', error: error.message })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = createToken(user)

        return res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({ message: 'Login failed', error: error.message })
    }
}

async function logout(req, res) {
    return res.clearCookie('token').status(200).json({ message: 'Logged out successfully' })
}

async function getProfile(req, res) {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = {
    registerUsers,
    loginUser,
    logout,
    getProfile
}