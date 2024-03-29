import { getSubmmitedAssignmentById } from "~/server/queries/studentAssingment";

export default defineEventHandler(async (event) => {
  try {
    await isTeacherServer(event);

    const params = getRouterParams(event);
    const submittedAssignmentId = params.id;

    const submittedAssignmentDB = await getSubmmitedAssignmentById(
      submittedAssignmentId
    );

    return {
      msg: "Submitted Assignment fetched successfully",
      data: submittedAssignmentDB,
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
