import { addAssignment } from "~/server/queries/assignment";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);
    const body = await readBody(event);

    const teacherId = teacher.id;
    const title = body.title;
    const content = body.content;
    const classId = body.class_id;
    const files = body.files;
    const subjectId = body.subject_id;
    const deadline = new Date(body.deadline);

    if (!title || !content || !classId || !deadline) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const assignment = await addAssignment({
      teacherId,
      title,
      content,
      classId,
      files,
      subjectId,
      deadline,
    });

    return {
      msg: "Assignment created successfully",
      data: assignment,
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
