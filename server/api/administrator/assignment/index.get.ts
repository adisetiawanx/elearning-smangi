import { getAssignments } from "~/server/queries/assignment";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const assignments = await getAssignments({
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
    });

    return {
      msg: "Assignments fetched successfully",
      data: assignments,
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
