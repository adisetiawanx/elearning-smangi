import { getStudents } from "~/server/queries/student";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const students = await getStudents({
      take: Number(query.take || 20),
      skip: Number(query.skip || 0),
    });

    return {
      msg: "Classes fetched successfully",
      data: students,
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
