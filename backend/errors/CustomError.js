function CustomError(message, statusCode) {
  return {
    message,
    statusCode,
  };
}

module.exports = CustomError;
