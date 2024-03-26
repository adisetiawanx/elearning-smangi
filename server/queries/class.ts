import Prisma from "~/configs/db";

export const addClass = async (classData: {
  name: string;
  major: "IPA" | "IPS" | "BAHASA";
}) => {
  return await Prisma.class.create({
    data: {
      name: classData.name,
      major: classData.major,
    },
    select: {
      name: true,
    },
  });
};

export const updateClass = async (classData: {
  id: string;
  name: string;
  major: "IPA" | "IPS" | "BAHASA";
}) => {
  return await Prisma.class.update({
    where: {
      id: classData.id,
    },
    data: {
      name: classData.name,
      major: classData.major,
    },
    include: {
      Subject: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
};

export const deleteClass = async (id: string) => {
  return Prisma.class.delete({
    where: {
      id,
    },
  });
};

export const getClasses = async ({
  take,
  skip,
  search,
}: {
  take: number | undefined;
  skip: number | undefined;
  search?: string | undefined;
}) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          name: {
            contains: search,
          },
        },
      ],
    };
  }

  return await Prisma.class.findMany({
    take: take,
    skip: skip,
    where,
  });
};

export const getClassById = async (id: string) => {
  return await Prisma.class.findUnique({
    where: {
      id: id,
    },
    include: {
      Subject: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
};
