import { updateAssignment } from "~/server/queries/assignment";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);
    const params = getRouterParams(event);

    const body = await readBody(event);

    const materialId = params.id;
    const teacherId = teacher.id;
    const title = body.title;
    const content = body.content;
    const deadline = new Date(body.deadline);
    const classId = body.class_id;
    const files = body.files;
    const subjectId = body.subject_id;

    if (!title || !content || !classId || !deadline) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const material = await updateAssignment({
      id: materialId,
      teacherId,
      title,
      content,
      deadline,
      classId,
      files,
      subjectId,
    });

    return {
      msg: "Material updated successfully",
      data: material,
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
