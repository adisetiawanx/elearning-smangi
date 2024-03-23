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

export const getClasses = async ({
  take,
  skip,
}: {
  take: number | undefined;
  skip: number | undefined;
}) => {
  return await Prisma.class.findMany({
    take: take,
    skip: skip,
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

export const addTeacherToClass = async ({
  name,
  teacherId,
}: {
  name: string;
  teacherId: string;
}) => {
  return await Prisma.class.update({
    where: {
      name: name,
    },
    data: {
      Teacher: {
        connect: {
          id: teacherId,
        },
      },
    },
  });
};

export const addSubjectToClass = async ({
  id,
  subjectName,
}: {
  id: string;
  subjectName: string;
}) => {
  return await Prisma.class.update({
    where: {
      id: id,
    },
    data: {
      Subject: {
        connect: {
          name: subjectName,
        },
      },
    },
  });
};
