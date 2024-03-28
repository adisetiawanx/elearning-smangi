import { submitAssignmentForStudent } from "~/server/queries/studentAssingment";

export default defineEventHandler(async (event) => {
  try {
    const student = await isStudentServer(event);

    const body = await readBody(event);
    const params = getRouterParams(event);
    const assignmentId = params.id;

    const studentId = student.id;
    const description = body.description;
    const proof_image = body.proof_image;
    const files = body.files;

    if (!proof_image) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    await submitAssignmentForStudent({
      studentId,
      description,
      proof_image,
      files,
      assignmentId,
    });

    return {
      msg: "Assignment submited successfully",
      data: {},
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
