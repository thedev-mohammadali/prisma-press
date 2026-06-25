import { Router } from "express";
import { Role } from "../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);

router.get(
  "/me",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  userController.getMyProfile,
);

export const userRoutes: Router = router;
