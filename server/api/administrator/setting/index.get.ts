import { getAdministratorById } from "~/server/queries/administrator";

export default defineEventHandler(async (event) => {
  try {
    const administrator = await isAdministratorServer(event);

    const administratorDB = await getAdministratorById(administrator.id);

    return {
      msg: "Administrator fetched successfully",
      data: administratorDB,
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
