/**
 * Service Base Class
 * Common service functionality
 */

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.find(query).sort(sort).limit(limit).skip(skip),
      this.model.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseService;
