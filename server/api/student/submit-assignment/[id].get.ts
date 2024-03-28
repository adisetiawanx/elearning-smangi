import { getSubmmitedAssignment } from "~/server/queries/studentAssingment";

export default defineEventHandler(async (event) => {
  try {
    const student = await isStudentServer(event);

    const params = getRouterParams(event);
    const assignmentId = params.id;
    const studentId = student.id;

    const submittedAssignmentDB = await getSubmmitedAssignment({
      student_id: studentId,
      assigment_id: assignmentId,
    });

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
