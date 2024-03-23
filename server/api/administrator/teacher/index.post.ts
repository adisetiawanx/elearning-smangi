import { addTeacher } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const email = body.email;
    const name = body.name;
    const nuptk = body.nuptk;
    const phone = body.phone;
    const profile_url = body.profile_url;
    const password = body.password;

    if (!email || !password || !name || !nuptk || !phone || !profile_url) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const teacherDB = await addTeacher({
      email,
      name,
      nuptk,
      phone,
      profile_url,
      password,
    });

    return {
      msg: "Student added successfully",
      data: {
        teacher_email: teacherDB.email,
        teacher_name: teacherDB.name,
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
