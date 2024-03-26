import { sign, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../configs/env";

export const createAccessToken = (user: any) => {
  return sign({ ...user }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (user: any) => {
  return sign({ ...user }, REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
};

export const verifyAccessToken = (token: string): any => {
  return verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string): any => {
  return verify(token, REFRESH_TOKEN_SECRET);
};
