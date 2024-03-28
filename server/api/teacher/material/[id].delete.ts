import { deleteMaterial } from "~/server/queries/material";

export default defineEventHandler(async (event) => {
  try {
    await isTeacherServer(event);

    const params = getRouterParams(event);

    const id = params.id;

    if (!id) {
      throw new ErrorWithCode(400, "Please fill all the fields");
    }

    await deleteMaterial(id);

    return {
      msg: "Material delete successfully",
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
