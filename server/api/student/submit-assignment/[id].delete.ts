import { deleteSubmmitedAssignment } from "~/server/queries/studentAssingment";

export default defineEventHandler(async (event) => {
  try {
    await isStudentServer(event);

    const params = getRouterParams(event);
    const assignmentId = params.id;

    const submittedAssignmentDB = await deleteSubmmitedAssignment(assignmentId);

    return {
      msg: "Submitted Assignment deleted successfully",
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
