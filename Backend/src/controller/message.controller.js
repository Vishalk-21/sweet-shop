const messageModel = require('../model/message.model')

// Create Message (Customer)
exports.createMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' })
        }

        const newMessage = new messageModel({
            name,
            email,
            phone,
            message
        })

        await newMessage.save()

        return res.status(201).json({
            message: 'Message sent successfully',
            data: newMessage
        })
    } catch (error) {
        console.error('Error creating message:', error)
        return res.status(500).json({ message: 'Failed to send message', error: error.message })
    }
}

// Get All Messages (Admin)
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.find().sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Messages fetched successfully',
            messages,
            count: messages.length
        })
    } catch (error) {
        console.error('Error fetching messages:', error)
        return res.status(500).json({ message: 'Failed to fetch messages', error: error.message })
    }
}

// Get Message by ID (Admin)
exports.getMessageById = async (req, res) => {
    try {
        const { id } = req.params
        const message = await messageModel.findById(id)

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        // Mark as read
        if (message.status === 'unread') {
            message.status = 'read'
            await message.save()
        }

        return res.status(200).json({
            message: 'Message fetched successfully',
            data: message
        })
    } catch (error) {
        console.error('Error fetching message:', error)
        return res.status(500).json({ message: 'Failed to fetch message', error: error.message })
    }
}

// Update Message Status (Admin)
exports.updateMessageStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const validStatuses = ['unread', 'read', 'replied']

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        const message = await messageModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        return res.status(200).json({
            message: 'Message status updated successfully',
            data: message
        })
    } catch (error) {
        console.error('Error updating message:', error)
        return res.status(500).json({ message: 'Failed to update message', error: error.message })
    }
}

// Delete Message (Admin)
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await messageModel.findByIdAndDelete(id)

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        return res.status(200).json({
            message: 'Message deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting message:', error)
        return res.status(500).json({ message: 'Failed to delete message', error: error.message })
    }
}

// Get Dashboard Message Stats (Admin)
exports.getMessageStats = async (req, res) => {
    try {
        const totalMessages = await messageModel.countDocuments()
        const unreadMessages = await messageModel.countDocuments({ status: 'unread' })
        const readMessages = await messageModel.countDocuments({ status: 'read' })
        const repliedMessages = await messageModel.countDocuments({ status: 'replied' })

        return res.status(200).json({
            message: 'Message stats fetched successfully',
            stats: {
                totalMessages,
                unreadMessages,
                readMessages,
                repliedMessages
            }
        })
    } catch (error) {
        console.error('Error fetching message stats:', error)
        return res.status(500).json({ message: 'Failed to fetch message stats', error: error.message })
    }
}
