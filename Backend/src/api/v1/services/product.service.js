/**
 * Product Service
 * Business logic for products
 */

const Product = require('../../model/product.model');
const BaseService = require('./BaseService');

class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  async getProductsByCategory(category, options = {}) {
    const query = { category };
    return this.findAll(query, options);
  }

  async searchProducts(searchTerm, options = {}) {
    const query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    };
    return this.findAll(query, options);
  }

  async getPopularProducts(limit = 10) {
    return this.model.find().sort({ rating: -1 }).limit(limit);
  }
}

module.exports = new ProductService();
