const productModel = require('../model/product.model')

function normalizeProductData(data) {
    const normalized = { ...data }

    if (normalized.price !== undefined && normalized.price !== '') {
        normalized.price = Number(normalized.price)
    }

    if (normalized.stock !== undefined && normalized.stock !== '') {
        normalized.stock = Number(normalized.stock)
    }

    if (normalized.is_available !== undefined) {
        normalized.is_available = normalized.is_available === true || normalized.is_available === 'true'
    }

    return normalized
}

async function getAllProducts(req, res) {
    try {
        const { search, category } = req.query
        const filter = { is_available: true }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }
        }

        if (category) {
            filter.category = category
        }

        const products = await productModel.find(filter).sort({ createdAt: -1 })
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch products', error: error.message })
    }
}

async function getAllAdminProducts(req, res) {
    try {
        const products = await productModel.find().sort({ createdAt: -1 })
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch products', error: error.message })
    }
}

async function getProductById(req, res) {
    try {
        const product = await productModel.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch product', error: error.message })
    }
}

async function createProduct(req, res) {
    try {
        const { name, description, price, stock, category, is_available } = req.body

        if (!name || price === undefined || price === '' || stock === undefined || stock === '') {
            return res.status(400).json({ message: 'Name, price, and stock are required' })
        }

        const productData = normalizeProductData({
            name,
            description,
            price,
            stock,
            category,
            is_available
        })

        // Add image from ImageKit if uploaded
        if (req.imagekit) {
            productData.image = req.imagekit.url
        }

        const product = await productModel.create(productData)
        return res.status(201).json({ message: 'Product created successfully', product })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create product', error: error.message })
    }
}

async function updateProduct(req, res) {
    try {
        const updateData = normalizeProductData(req.body)

        // Add new image from ImageKit if uploaded
        if (req.imagekit) {
            updateData.image = req.imagekit.url
        }

        const product = await productModel.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({ message: 'Product updated successfully', product })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update product', error: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete product', error: error.message })
    }
}

module.exports = {
    getAllProducts,
    getAllAdminProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
