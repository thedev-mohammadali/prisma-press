import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import status from "http-status";

export const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: status.INTERNAL_SERVER_ERROR,
    message: error.message,
    error: error.stack,
  });
};
