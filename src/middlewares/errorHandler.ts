import { ErrorRequestHandler } from 'express';
import logger, { errorLogger } from '../utils/logger';
import ErrorResponse from '../utils/errorResponse';

const errorHandler: ErrorRequestHandler = async (err, req, res, _next) => {
  const error: ErrorResponse = new ErrorResponse(
    err.message || 'Internal server error',
    err.statusCode || 200,
    []
  );

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(', ');
    const data = Object.values(err.errors).map((e: any) => e.message);
    errorLogger('VALIDATION_ERROR', req.url, data);
    error.message = message;
    error.data = data;
  }

  if (err.name === 'CastError') {
    const { kind, path, value } = err;
    error.message = `CastError path: ${path} is of type: ${kind} and recieved a value of ${value}`;
  }

  if (err.code === 11000) {
    error.message = err.message;
  }

  errorLogger('GENERAL_ERROR', req.url, error.message);

  return res.status(200).json({
    success: false,
    error: error.message || 'Internal server error',
    data: error.data || [],
  });
};

export default errorHandler;
