// Catch-all for routes that don't exist
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const responseBody = {
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  // If the error message is a stringified JSON (from validation middleware), parse it
  if (err.message && err.message.startsWith('{"message":')) {
    try {
      const parsed = JSON.parse(err.message);
      responseBody.message = parsed.message;
      responseBody.errors = parsed.errors;
    } catch (e) {
      // fallback to original error details
    }
  }

  res.json(responseBody);
};
