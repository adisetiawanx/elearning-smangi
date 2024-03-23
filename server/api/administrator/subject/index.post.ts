import { addSubject } from "~/server/queries/subject";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const name = body.name;

    if (!name) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    const createdSubject = await addSubject({
      name: name,
    });

    return {
      mag: "Subject created successfully",
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
