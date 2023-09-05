import { ErrorRequestHandler } from "express";

const globalError: ErrorRequestHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    success: false,
    message: error.message
  });
};

export default globalError;
