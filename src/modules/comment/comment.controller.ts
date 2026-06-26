import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const getCommentsByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getCommentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
