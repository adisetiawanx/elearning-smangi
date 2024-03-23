import { addTeacherToClass } from "~/server/queries/class";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const name = body.name;
    const teacher_id = body.teacher_id;

    if (!name || !teacher_id) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    await addTeacherToClass({
      name: name,
      teacherId: teacher_id,
    });

    return {
      msg: "Student added successfully",
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
