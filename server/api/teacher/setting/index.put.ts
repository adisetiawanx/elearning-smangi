import { updateTeacher } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    const teacher = await isTeacherServer(event);

    const body = await readBody(event);

    const id = teacher.id;
    const name = body.name;
    const nuptk = body.nuptk;
    const email = body.email;
    const password = body.password;
    const phone = body.phone;
    const profile_url = body.profile_url;

    if (!id || !name || !email || !phone || !profile_url || !password) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const teacherDB = await updateTeacher({
      id,
      name,
      email,
      phone,
      profile_url,
      password,
      nuptk,
    });

    return {
      msg: "Teacher updated successfully",
      data: teacherDB,
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
