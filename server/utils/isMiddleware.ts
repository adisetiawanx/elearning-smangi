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

export const isTeacherServer = async (event: H3Event) => {
  const accessToken = event.node.req.headers.authorization?.split(" ")[1] || "";
  const user = verifyAccessToken(accessToken);
  if (user.role !== "teacher") {
    throw new ErrorWithCode(401, "Unauthorized access. teacher only.");
  }
  return user;
};

export const isStudentServer = async (event: H3Event) => {
  const accessToken = event.node.req.headers.authorization?.split(" ")[1] || "";
  const user = verifyAccessToken(accessToken);
  if (user.role !== "student") {
    throw new ErrorWithCode(401, "Unauthorized access. student only.");
  }
  return user;
};
