import { getAssignmentsForTeacher } from "~/server/queries/assignment";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);

    const query = getQuery(event);

    const subjects = await getAssignmentsForTeacher({
      teacher_id: teacher.id,
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
      search: String(query.search) || undefined,
    });

    return {
      msg: "Assignments fetched successfully",
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
