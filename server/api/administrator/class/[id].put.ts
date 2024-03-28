import { updateClass } from "~/server/queries/class";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);

    const params = getRouterParams(event);
    const body = await readBody(event);

    const id = params.id;
    const name = body.name;
    const major = body.major;

    if (!name || !major) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const createdClass = await updateClass({ id, name, major });

    return {
      msg: "Class updated successfully",
      data: createdClass,
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
