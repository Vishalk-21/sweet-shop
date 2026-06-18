/**
 * Validation Utilities
 * Common validation functions used across the application
 */

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidMongoId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const isValidPhone = (phone) => {
  return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '');
  }
  return input;
};

module.exports = {
  isValidEmail,
  isValidMongoId,
  isValidPhone,
  sanitizeInput,
};
