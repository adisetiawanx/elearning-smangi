import { getAssignmentById } from "~/server/queries/assignment";

export default defineEventHandler(async (event) => {
  try {
    await isTeacherServer(event);

    const params = getRouterParams(event);
    const assignmentId = params.id;

    const materialDB = await getAssignmentById(assignmentId);

    return {
      msg: "Assignment fetched successfully",
      data: materialDB,
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
