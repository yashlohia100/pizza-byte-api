const globalErrorHandler = (err, req, res, next) => {
  // Some errors may not contain these properties
  // For example, errors coming from mongoose
  err.statusCode = err.statusCode || 500;
  err.statusText = err.statusText || 'error';

  res.status(err.statusCode).json({
    status: err.statusText,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

export default globalErrorHandler;
