import { updateSubject } from "~/server/queries/subject";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);

    const params = getRouterParams(event);
    const body = await readBody(event);

    const id = params.id;
    const name = body.name;
    const teacherId = body.teacher_id;
    const classId = body.class_id;

    if (!name || !teacherId || !classId) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const createdClass = await updateSubject({ id, name, classId, teacherId });

    return {
      msg: "Subject updated successfully",
      data: createdClass,
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
