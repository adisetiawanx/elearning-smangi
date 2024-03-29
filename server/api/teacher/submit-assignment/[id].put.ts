import { updateAssignment } from "~/server/queries/assignment";
import { updateSubmmitedAssignmentForTeacher } from "~/server/queries/studentAssingment";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);
    const params = getRouterParams(event);

    const body = await readBody(event);

    const assignmentId = params.id;
    const grade = body.grade;

    if (!grade) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }
    const submittedAssignment = await updateSubmmitedAssignmentForTeacher(
      assignmentId,
      grade
    );

    return {
      msg: "Material updated successfully",
      data: submittedAssignment,
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
