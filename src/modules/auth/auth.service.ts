import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import type { ILoginPayload } from "./auth.interface";

const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  return user;
};

export const authService = {
  loginUser,
};
