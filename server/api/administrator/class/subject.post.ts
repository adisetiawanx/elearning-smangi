import { addSubjectToClass } from "~/server/queries/class";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const classId = body.class_id;
    const subjectName = body.subject_name;

    if (!classId || !subjectName) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    console.log("classId: ", classId);
    console.log("subjectName: ", subjectName);

    await addSubjectToClass({
      id: classId,
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
