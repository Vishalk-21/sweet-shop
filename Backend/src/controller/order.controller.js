const orderModel = require('../model/order.model')
const productModel = require('../model/product.model')

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body
        const userId = req.user.id

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Items are required' })
        }

        let totalAmount = 0
        const orderItems = []

        // Validate and process items
        for (const item of items) {
            const product = await productModel.findById(item.product_id)

            if (!product) {
                return res.status(404).json({ message: `Product ${item.product_id} not found` })
            }

            if (!product.is_available) {
                return res.status(400).json({ message: `Product ${product.name} is not available` })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
            }

            orderItems.push({
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price
            })

            totalAmount += product.price * item.quantity

            // Update product stock
            product.stock -= item.quantity
            await product.save()
        }

        const order = new orderModel({
            user_id: userId,
            items: orderItems,
            total_amount: totalAmount
        })

        await order.save()

        return res.status(201).json({
            message: 'Order created successfully',
            order
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get Customer's Orders
exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id

        const orders = await orderModel.find({ user_id: userId })
            .populate('items.product_id', 'name image price')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Orders fetched successfully',
            orders
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate('user_id', 'name email phone')
            .populate('items.product_id', 'name image price')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Orders fetched successfully',
            orders
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Ready', 'Delivered', 'Cancelled']

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        const order = await orderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('user_id', 'name email phone')
         .populate('items.product_id', 'name image price')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        return res.status(200).json({
            message: 'Order status updated successfully',
            order
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get Order by ID (Customer and Admin)
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const order = await orderModel.findById(id)
            .populate('user_id', 'name email phone')
            .populate('items.product_id', 'name image price')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        // Check if customer can view their order
        if (req.user.role === 'customer' && order.user_id._id.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        return res.status(200).json({
            message: 'Order fetched successfully',
            order
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get Dashboard Stats (Admin)
exports.getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments()
        const pendingOrders = await orderModel.countDocuments({ status: 'Pending' })
        const deliveredOrders = await orderModel.countDocuments({ status: 'Delivered' })

        const totalRevenue = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$total_amount' }
                }
            }
        ])

        return res.status(200).json({
            message: 'Dashboard stats fetched successfully',
            stats: {
                totalOrders,
                pendingOrders,
                deliveredOrders,
                totalRevenue: totalRevenue[0]?.total || 0
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
