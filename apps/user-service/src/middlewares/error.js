import ErrorHandler from "../utils/ErrorHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
  // Agar err already ErrorHandler ka instance nahi hai, wrap karo
  if (!(err instanceof ErrorHandler)) {
    let message = err.message || "Internal server Error";
    let statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
      message = `Resource Not Found. Invalid: ${err.path}`;
      statusCode = 400;
    }
    if (err.code === 11000) {
      message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      statusCode = 400;
    }
    if (err.name === "JsonWebTokenError") {
      message = `Json web token is Invalid, Try Again`;
      statusCode = 400;
    }
    if (err.name === "TokenExpiredError") {
      message = `Json web token is expired, Try Again`;
      statusCode = 400;
    }

    err = new ErrorHandler(message, statusCode);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
