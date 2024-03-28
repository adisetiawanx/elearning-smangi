import { getMaterialById } from "~/server/queries/material";

export default defineEventHandler(async (event) => {
  try {
    await isStudentServer(event);

    const params = getRouterParams(event);
    const materialId = params.id;

    const materialDB = await getMaterialById(materialId);

    return {
      msg: "Material fetched successfully",
      data: materialDB,
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
