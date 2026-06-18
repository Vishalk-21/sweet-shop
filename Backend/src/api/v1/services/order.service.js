/**
 * Order Service
 * Business logic for orders
 */

const Order = require('../../model/order.model');
const BaseService = require('./BaseService');

class OrderService extends BaseService {
  constructor() {
    super(Order);
  }

  async getUserOrders(userId, options = {}) {
    const query = { userId };
    return this.findAll(query, options);
  }

  async getOrderStats() {
    const stats = await this.model.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          averageOrderValue: { $avg: '$totalAmount' },
        },
      },
    ]);
    return stats[0] || {};
  }

  async getOrdersByStatus(status) {
    return this.model.find({ status }).sort({ createdAt: -1 });
  }
}

module.exports = new OrderService();
