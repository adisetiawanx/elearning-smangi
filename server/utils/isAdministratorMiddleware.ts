import { H3Event } from "h3";
import { verifyAccessToken } from "./token";

export const isAdministratorServer = async (event: H3Event) => {
  const accessToken = event.node.req.headers.authorization?.split(" ")[1] || "";
  const user = verifyAccessToken(accessToken);
  if (user.role !== "administrator") {
    throw new ErrorWithCode(401, "Unauthorized access. Administrator only.");
  }
  return user;
};
