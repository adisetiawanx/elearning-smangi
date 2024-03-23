import Prisma from "~/configs/db";

export const getSubject = async ({
  take,
  skip,
}: {
  take: number | undefined;
  skip: number | undefined;
}) => {
  return await Prisma.subject.findMany({
    take: take,
    skip: skip,
  });
};

export const getSubjectById = async (id: string) => {
  return await Prisma.subject.findUnique({
    where: {
      id: id,
    },
    include: {
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      Teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const addSubject = async ({ name }: { name: string }) => {
  return await Prisma.subject.create({
    data: {
      name: name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};
