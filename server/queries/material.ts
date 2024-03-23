import Prisma from "~/configs/db";

export const getMaterials = async ({
  take,
  skip,
}: {
  take: number | undefined;
  skip: number | undefined;
}) => {
  return await Prisma.material.findMany({
    take: take,
    skip: skip,
  });
};
