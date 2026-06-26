import { prisma } from "../../lib/prisma";
import type { ICreatePostPayload } from "./post.interface";

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
};

const getPostsStats = async () => {};

const getMyPosts = async () => {};

const getPostById = async () => {};

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  return await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
};

const updatePost = async () => {};

const deletePost = async () => {};

export const postService = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsStats,
  getMyPosts,
};
