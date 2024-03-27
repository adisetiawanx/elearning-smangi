import { handleUploadImage } from "~/configs/cloudinary";
import multer from "multer";
import { callNodeListener } from "h3";
import { addMediaFile } from "~/server/queries/media-file";

let originalFileName = "";
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    originalFileName = file.originalname;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export default defineEventHandler(async (event) => {
  try {
    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.single("file"),
      event.node.req,
      event.node.res
    );

    //@ts-expect-error
    const file = event.node.req.file || "";

    if (!file) {
      throw new ErrorWithCode(400, "File is required!");
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUploadImage(dataURI);

    await addMediaFile({
      name: originalFileName,
      url: cldRes.url,
    });

    return {
      msg: "File uploaded successfully",
      data: {
        url: cldRes.url,
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
