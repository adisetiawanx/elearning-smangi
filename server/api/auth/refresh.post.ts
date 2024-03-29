import { verify } from "jsonwebtoken";

interface UserJWTPayload {
  id: string;
  email: string;
  name: string;
  profile_image: string;
  phone: string;
  role: string;
}

export default eventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, no refreshToken in payload",
    });
  }

  const decoded = verify(
    body.refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as UserJWTPayload | undefined;

  if (!decoded) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, refreshToken can`t be verified",
    });
  }

  const user = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    profile_image: decoded.profile_image,
    phone: decoded.phone,
    role: decoded.role,
  };

  const accessToken = createAccessToken(user);

  return {
    token: {
      accessToken,
    },
  };
});
