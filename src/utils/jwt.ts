import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error: any) {
    console.log("Token verificaiton failed: ", error);
    throw new Error(error.message);
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
