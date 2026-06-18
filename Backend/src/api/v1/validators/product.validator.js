/**
 * Product Validator
 * Validation schemas for products
 */

const validateCreateProduct = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Product name is required (min 2 chars)';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Description is required (min 10 chars)';
  }

  if (!data.price || data.price <= 0) {
    errors.price = 'Valid price is required';
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

const validateUpdateProduct = (data) => {
  return validateCreateProduct(data);
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};
