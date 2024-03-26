import { getTeacherByIdWithPassword } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);
    const params = getRouterParams(event);

    const teacherDB = await getTeacherByIdWithPassword(params.id);

    return {
      msg: "Teacher data retrieved successfully.",
      data: teacherDB,
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
