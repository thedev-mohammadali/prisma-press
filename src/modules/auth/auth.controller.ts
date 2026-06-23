import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { ILoginPayload } from "./auth.interface";
import { authService } from "./auth.service";

const loginUser = catchAsync(
  async (
    req: Request<{}, {}, ILoginPayload>,
    res: Response,
    next: NextFunction,
  ) => {
    const loginResult = await authService.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Login succesfull",
      data: loginResult,
    });
  },
);

export const authController = {
  loginUser,
};
