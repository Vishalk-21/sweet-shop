/**
 * Validation Utilities
 */

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 number
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
};

export const isValidPhone = (phone) => {
  return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
};

export const validateForm = (data, schema) => {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const validator = schema[field];
    if (!validator(data[field])) {
      errors[field] = `Invalid ${field}`;
    }
  });
  return Object.keys(errors).length === 0 ? null : errors;
};
