import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
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
    const userProfile = await userService.getProfileFromDB(
      req.user?.id as string,
    );

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

const updateMyProfile = catchAsync(
  async (
    req: Request<{}, {}, IUserRegistrationPayload>,
    res: Response,
    next: NextFunction,
  ) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const updatedProfile = await userService.updateProfileIntoDB(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User profile updated successfully",
      data: {
        updatedProfile,
      },
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
};
