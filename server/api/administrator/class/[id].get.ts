import { getClassById } from "~/server/queries/class";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);

    const params = getRouterParams(event);
    const classId = params.id;

    const classDB = await getClassById(classId);

    return {
      msg: "Class fetched successfully",
      data: classDB,
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
