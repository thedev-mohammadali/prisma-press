import { Router } from "express";
import { Role } from "../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { postController } from "./post.controller";

const router = Router();

const {
  getAllPosts,
  createPost,
  deletePost,
  getMyPosts,
  getPostById,
  getPostsStats,
  updatePost,
} = postController;
const { ADMIN, AUTHOR, USER } = Role;

router.get("/", getAllPosts);
router.get("/stats", auth(ADMIN), getPostsStats);
router.get("/my-posts", auth(ADMIN, USER), getMyPosts);
router.get("/:postId", getPostById);
router.post("/", auth(ADMIN, USER, AUTHOR), createPost);
router.patch("/:postId", auth(USER, ADMIN), updatePost);
router.delete("/:postId", auth(USER, ADMIN), deletePost);

export const postRoutes: Router = router;
