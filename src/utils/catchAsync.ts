import type { NextFunction, Request, RequestHandler, Response } from "express";
import status from "http-status";
const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
        error: (error as Error).message,
        errorStack: (error as Error).stack,
      });
    }
  };
};

export default catchAsync;
