import { addTeacherToClass } from "~/server/queries/class";
import { addSubjectToTeacher } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const subjectName = body.subject_name;
    const teacherId = body.teacher_id;

    if (!subjectName || !teacherId) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    await addSubjectToTeacher({
      id: teacherId,
      subjectName,
    });

    return {
      msg: "Subject added successfully",
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
