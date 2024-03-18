import { addStudent } from "~/server/queries/student";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const email = body.email;
    const name = body.name;
    const nip = body.nip;
    const phone = body.phone;
    const kelas = body.kelas;
    const profile_url = body.profile_url;
    const password = body.password;

    if (
      !email ||
      !password ||
      !name ||
      !nip ||
      !phone ||
      !kelas ||
      !profile_url
    ) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    await addStudent({
      email,
      name,
      nip,
      phone,
      kelas,
      profile_url,
      password,
    });
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
