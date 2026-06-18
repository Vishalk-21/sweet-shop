const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        
        if (decoded.role !== 'owner') {
            return res.status(403).json({ message: 'Admin access required' })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = {
    verifyToken,
    verifyAdmin
}
