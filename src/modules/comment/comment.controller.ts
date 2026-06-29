import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { ICommentPayload } from "./comment.interface";
import { commentService } from "./comment.service";

const getCommentsByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getCommentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const createComment = catchAsync(
  async (req: Request<{}, {}, ICommentPayload>, res) => {
    const result = await commentService.createComment(
      req.body,
      req.user?.id as string,
    );

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  },
);

const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const changeCommentStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentController = {
  changeCommentStatus,
  deleteComment,
  updateComment,
  createComment,
  getCommentById,
  getCommentsByAuthorId,
};
