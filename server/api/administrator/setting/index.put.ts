import { updateAdministrator } from "~/server/queries/administrator";

export default defineEventHandler(async (event) => {
  try {
    const administrator = await isAdministratorServer(event);

    const body = await readBody(event);

    const id = administrator.id;
    const name = body.name;
    const email = body.email;
    const phone = body.phone;
    const profile_image = body.profile_url;

    if (!id || !name || !email || !phone || !profile_image) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const administratorDB = await updateAdministrator({
      id,
      name,
      email,
      phone,
      profile_image,
    });

    return {
      mag: "Administrator updated successfully",
      data: administratorDB,
    };
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      return createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
      });
    } else {
      console.info("Error: ", error);
      return createError({
        statusCode: 500,
        statusMessage: "Something went wrong.",
      });
    }
  }
});
