import { addSubject } from "~/server/queries/subject";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);

    const body = await readBody(event);
    const name = body.name;
    const teacherId = body.teacher_id;
    const classId = body.class_id;

    if (!name) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const createdSubject = await addSubject({
      name: name,
      teacherId: teacherId,
      classId: classId,
    });

    return {
      msg: "Subject created successfully",
      data: {
        name: createdSubject.name,
      },
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
