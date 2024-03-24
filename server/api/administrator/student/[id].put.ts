import { addStudent, updateStudent } from "~/server/queries/student";

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const body = await readBody(event);

    const id = params.id;

    const email = body.email;
    const name = body.name;
    const nis = body.nis;
    const phone = body.phone;
    const kelas = body.kelas;
    const profile_url = body.profile_url;
    const password = body.password;

    if (
      !email ||
      !password ||
      !name ||
      !nis ||
      !phone ||
      !kelas ||
      !profile_url
    ) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const studentDB = await updateStudent({
      id,
      email,
      name,
      nis,
      phone,
      kelas,
      profile_url,
      password,
    });

    return {
      msg: "Student update successfully",
      data: studentDB,
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
