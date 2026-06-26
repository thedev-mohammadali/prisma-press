import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { ICreatePostPayload } from "./post.interface";
import { postService } from "./post.service";

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPosts();

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Posts retrieved successfully",
      data: result,
    });
  },
);

const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("Post Id required in params");
    }

    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Post retrieved successfully",
      data: result,
    });
  },
);

const createPost = catchAsync(
  async (
    req: Request<{}, {}, ICreatePostPayload>,
    res: Response,
    next: NextFunction,
  ) => {
    const id = req.user?.id;

    const payload = req.body;

    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Post created successfully",
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const postController = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsStats,
  getMyPosts,
};
