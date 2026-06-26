import { Router } from "express";
import { Role } from "../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { commentController } from "./comment.controller";

const router = Router();

const {
  changeCommentStatus,
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByAuthorId,
  updateComment,
} = commentController;

const { ADMIN, USER } = Role;

router.get("/author/:authorId", getCommentsByAuthorId);
router.get("/:commentId", getCommentById);
router.post("/", auth(USER, ADMIN), createComment);
router.patch("/:commentId", auth(USER, ADMIN), updateComment);
router.delete("/:commentId", auth(USER, ADMIN), deleteComment);
router.patch("/:commentId/moderate", auth(ADMIN), changeCommentStatus);

export const commentRoutes: Router = router;
