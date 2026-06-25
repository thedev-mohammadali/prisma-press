import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config";
import type { Role } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization);

    if (!token) {
      throw new Error("Login to access");
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { email, id, name, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("Forbidden!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.activeStatus === "BLOCKED") {
      throw new Error("You are blocked.");
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  });
};
