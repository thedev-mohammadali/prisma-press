import { CommentStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { ICommentPayload } from "./comment.interface";

const getCommentsByAuthorId = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
  });
};

const getCommentById = async (commentId: string) => {
  return prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });
};

const createComment = async (payload: ICommentPayload, authorId: string) => {
  const { content, postId } = payload;
  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
    select: {
      id: true,
      content: true,
      authorId: true,
      postId: true,
      status: true,
    },
  });
};

const updateComment = async (content: string, commentId: string) => {
  return prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
};

const deleteComment = async (commentId: string) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

const changeCommentStatus = async (
  commentId: string,
  status: CommentStatus,
) => {
  return prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      status,
    },
  });
};

export const commentService = {
  changeCommentStatus,
  deleteComment,
  updateComment,
  createComment,
  getCommentById,
  getCommentsByAuthorId,
};
