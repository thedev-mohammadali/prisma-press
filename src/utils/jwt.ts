import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const jwtUtils = {
  createToken,
};
