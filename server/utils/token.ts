import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../configs/env";

export const createAccessToken = (user: any) => {
  return sign({ ...user }, ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 2,
  });
};

export const createRefreshToken = (user: any) => {
  return sign({ ...user }, REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 14,
  });
};
