import { handleUploadAnything } from "~/configs/cloudinary";
import multer from "multer";
import { callNodeListener } from "h3";
import { addMediaFile } from "~/server/queries/media-file";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

export default defineEventHandler(async (event) => {
  try {
    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.array("files", 10),
      event.node.req,
      event.node.res
    );

    //@ts-expect-error
    const files = event.node.req.files;

    if (!files || files.length === 0) {
      throw new ErrorWithCode(400, "File is required!");
    }

    let filesUploaded: any = [];

    await Promise.all(
      files.map(async (file: any) => {
        let originalFileName = file.originalname;
        const fileFormat = file.originalname.split(".").pop();

        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const cldRes = await handleUploadAnything(dataURI, fileFormat);

        const fileDB = await addMediaFile({
          name: originalFileName,
          url: cldRes.url,
        });

        filesUploaded.push({
          id: fileDB.id,
          name: originalFileName,
          url: cldRes.url,
        });
      })
    );

    return {
      msg: "Files uploaded successfully",
      data: filesUploaded,
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
