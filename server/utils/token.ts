import { sign, verify } from "jsonwebtoken";

export const createAccessToken = (user: any) => {
  return sign({ ...user }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (user: any) => {
  return sign({ ...user }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "14d",
  });
};

export const verifyAccessToken = (token: string): any => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string): any => {
  return verify(token, process.env.REFRESH_TOKEN_SECRET as string);
};
