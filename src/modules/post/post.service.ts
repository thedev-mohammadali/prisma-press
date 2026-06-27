import { CommentStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

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

const getPostsStats = async () => {
  const txResult = await prisma.$transaction(async (tx) => {
    const [
      totalPosts,
      totalPublishedPosts,
      totalDraftPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      aggregation,
    ] = await Promise.all([
      await tx.post.count(),

      await tx.post.count({
        where: {
          status: "PUBLISHED",
        },
      }),
      await tx.post.count({
        where: {
          status: "ARCHIVED",
        },
      }),
      await tx.post.count({
        where: {
          status: "DRAFT",
        },
      }),

      await tx.comment.count(),
      await tx.comment.count({
        where: {
          status: "APPROVED",
        },
      }),
      await tx.comment.count({
        where: {
          status: "REJECTED",
        },
      }),

      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPosts,
      totalPublishedPosts,
      totalDraftPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViews: aggregation._sum.views,
    };
  });

  return txResult;
};

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
  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: {
        id: postId,
      },
    });

    const post = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comments: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },

        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  });

  return transactionResult;
};

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  return await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }

  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
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

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return null;
};

export const postService = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsStats,
  getMyPosts,
};
