export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Safely extract validation issues from Zod
    const issues = error.errors || error.issues;
    
    if (issues && Array.isArray(issues)) {
      res.status(400);
      const errors = issues.map((err) => ({
        field: Array.isArray(err.path) ? err.path.join(".") : "",
        message: err.message,
      }));
      
      // Return a clean structured JSON-stringified error list
      return next(new Error(JSON.stringify({ message: "Validation failed", errors })));
    }
    
    next(error);
  }
};
