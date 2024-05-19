class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.statusText = statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
  }
}

export default AppError;
