import Prisma from "~/configs/db";

export const addMediaFile = async (mediaFile: {
  name: string;
  url: string;
}) => {
  return await Prisma.mediaFile.create({
    data: {
      name: mediaFile.name,
      url: mediaFile.url,
    },
  });
};
