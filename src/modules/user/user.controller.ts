import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { jwtUtils } from "../../utils/jwt";
import sendResponse from "../../utils/sendResponse";
import type { IUserRegistrationPayload } from "./user.interface";
import { userService } from "./user.service";

const registerUser = catchAsync(
  async (
    req: Request<{}, {}, IUserRegistrationPayload>,
    res: Response,
    next: NextFunction,
  ) => {
    const Payload: IUserRegistrationPayload = req.body;
    const userData = await userService.registerUserIntoDB(Payload);
    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "User registered successfully",
      data: {
        userData,
      },
    });
  },
);

const getMyProfile = catchAsync(
  async (
    req: Request<{}, {}, IUserRegistrationPayload>,
    res: Response,
    next: NextFunction,
  ) => {
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const userProfile = await userService.getProfileFromDB(verifiedToken.id);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User profile fetched successfully",
      data: {
        userProfile,
      },
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
};
