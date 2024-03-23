import { getMaterials } from "~/server/queries/material";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const materials = await getMaterials({
      take: Number(query.take) || undefined,
      skip: Number(query.skip) || undefined,
    });

    return {
      msg: "Materials fetched successfully",
      data: materials,
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
