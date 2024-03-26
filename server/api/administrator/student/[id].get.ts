import { getStudentByIdWithPassword } from "~/server/queries/student";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);
    const params = getRouterParams(event);

    const studentDB = await getStudentByIdWithPassword(params.id);

    return {
      msg: "Student data retrieved successfully.",
      data: studentDB,
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
