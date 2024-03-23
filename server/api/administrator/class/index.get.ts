import { getClasses } from "~/server/queries/class";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const classes = await getClasses({
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
    });

    return {
      msg: "Classes fetched successfully",
      data: classes,
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
