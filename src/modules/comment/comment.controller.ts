import type { Request, Response } from "express";
import status from "http-status";
import type { CommentStatus } from "../../generated/prisma/enums";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { ICommentPayload } from "./comment.interface";
import { commentService } from "./comment.service";

const getCommentsByAuthorId = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.getCommentsByAuthorId(
      req.params.authorId as string,
    );

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Comments retrieved successfully",
      data: result,
    });
  },
);

const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.getCommentById(
    req.params.commentId as string,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Comment retrieved successfully",
    data: result,
  });
});

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

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;

  const comment = await commentService.getCommentById(commentId);

  if (comment.authorId !== req.user?.id && req.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const content = req.body.content;

  const result = await commentService.updateComment(content, commentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;

  const comment = await commentService.getCommentById(commentId);

  if (comment.authorId !== req.user?.id && req.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  await commentService.deleteComment(commentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment deleted successfully",
    data: [],
  });
});

const changeCommentStatus = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const commentStatus = req.body.status;

  await commentService.getCommentById(commentId);

  const result = await commentService.changeCommentStatus(
    commentId,
    commentStatus as CommentStatus,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment status updated successfully",
    data: result,
  });
});

export const commentController = {
  changeCommentStatus,
  deleteComment,
  updateComment,
  createComment,
  getCommentById,
  getCommentsByAuthorId,
};
