import { getTeacherById } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);

    const teacherDB = await getTeacherById(teacher.id);

    return {
      msg: "Teacher fetched successfully",
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
