import {
  loginAsAdministrator,
  loginAsStudent,
  loginAsTeacher,
} from "~/server/utils/loginType";
import { createAccessToken, createRefreshToken } from "~/server/utils/token";

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, loginType } = body;

    if (!email || !password || !loginType) {
      throw new ErrorWithCode(
        400,
        "Email, password, and loginType must be provided"
      );
    }

    let userDB;
    switch (loginType) {
      case "administrator":
        userDB = await loginAsAdministrator(email, password);
        userDB = {
          ...userDB,
          role: "administrator",
        };
        break;
      case "teacher":
        userDB = await loginAsTeacher(email, password);
        userDB = {
          ...userDB,
          role: "teacher",
        };
        break;
      case "student":
        userDB = await loginAsStudent(email, password);
        userDB = {
          ...userDB,
          role: "student",
        };
        break;
      default:
        throw new ErrorWithCode(400, "Invalid loginType");
    }

    const accessToken = createAccessToken(userDB);
    const refreshToken = createRefreshToken(userDB);

    return {
      user: userDB,
      token: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      return sendError(
        event,
        createError({
          statusCode: error.statusCode,
          statusMessage: error.message,
        })
      );
    }
  }
});
