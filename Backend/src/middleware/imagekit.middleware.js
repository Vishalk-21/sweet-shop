const multer = require('multer')
const imagekit = require('../config/imagekit.config')

// Set up multer for in-memory storage (we'll upload to ImageKit)
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed'))
        }
    }
})

// Middleware to upload file to ImageKit
const uploadToImageKit = async (req, res, next) => {
    try {
        if (!req.file || !imagekit) {
            return next()
        }

        const fileName = `${Date.now()}_${req.file.originalname}`
        
        const response = await imagekit.upload({
            file: req.file.buffer,
            fileName: fileName,
            folder: '/sweet-shop/products'
        })

        // Attach ImageKit response to request object
        req.imagekit = {
            url: response.url,
            fileId: response.fileId,
            name: response.name
        }

        next()
    } catch (error) {
        console.error('Image upload error:', error)
        return next()
    }
}

module.exports = {
    upload,
    uploadToImageKit
}
