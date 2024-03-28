import { getSubjectForStudent } from "~/server/queries/subject";

export default defineEventHandler(async (event) => {
  try {
    const student = await isStudentServer(event);

    const query = getQuery(event);

    const subjects = await getSubjectForStudent({
      classId: student.class_id,
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
      search: String(query.search) || undefined,
    });

    return {
      msg: "Subjects fetched successfully",
      data: subjects,
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
