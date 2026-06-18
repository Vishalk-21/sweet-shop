/**
 * Auth Validator
 * Validation schemas for authentication
 */

const { isValidEmail } = require('../../utils/validators');

const validateRegister = (data) => {
  const errors = {};

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

module.exports = {
  validateRegister,
  validateLogin,
};
