import { getTeachers } from "~/server/queries/teacher";

export default defineEventHandler(async (event) => {
  try {
    await isAdministratorServer(event);
    const query = getQuery(event);

    const teachers = await getTeachers({
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
      search: String(query.search) || undefined,
    });

    return {
      msg: "Teachers fetched successfully",
      data: teachers,
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
