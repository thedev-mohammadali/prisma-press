import { prisma } from "../../lib/prisma";
import type { ICommentPayload } from "./comment.interface";

const getCommentsByAuthorId = async () => {};

const getCommentById = async () => {};

const createComment = async (payload: ICommentPayload, authorId: string) => {
  const { content, postId } = payload;
  const result = await prisma.comment.create({
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

  if (!result) {
    throw new Error("Something Went wrong creating comment");
  }

  return result;
};

const updateComment = async () => {};

const deleteComment = async () => {};

const changeCommentStatus = async () => {};

export const commentService = {
  changeCommentStatus,
  deleteComment,
  updateComment,
  createComment,
  getCommentById,
  getCommentsByAuthorId,
};
