import { getSubjectByIdForStudent } from "~/server/queries/subject";

export default defineEventHandler(async (event) => {
  try {
    await isStudentServer(event);

    const params = getRouterParams(event);
    const subjectId = params.id;

    const subjectDB = await getSubjectByIdForStudent(subjectId);

    return {
      msg: "Subject fetched successfully",
      data: subjectDB,
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
