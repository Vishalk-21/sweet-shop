/**
 * API Response Helper
 * Standardized API response format
 */

const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

const sendError = (res, message = 'Error', statusCode = 400, errors = null) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors && { errors }),
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
