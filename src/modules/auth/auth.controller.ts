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
    const { accessToken, refreshToken } = await authService.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Login succesfull",
      data: { accessToken, refreshToken },
    });
  },
);

export const authController = {
  loginUser,
};
