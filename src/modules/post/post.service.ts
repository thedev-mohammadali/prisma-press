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

const getMyPosts = async (authorId: string) => {
  return await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
};

const getPostById = async (postId: string) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatedPost;
};

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
